const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Event = require('../../models').Event;
const Category = require('../../models').Category;
const Venue = require('../../models').Venue;
const Ticket = require('../../models').Ticket;
const Op = require('../../models').Sequelize.Op;
const sequelize = require('../../models').sequelize;
const { QueryTypes } = require('sequelize');

const { getDateTimeString } = require('./myUtils');

const COUNT = 4;

router.get('/home', async (req, res) => {
    try {
        const categories = await Category.findAll();
        let homeEvents = [];
        for (let i = 0; i < categories.length; i++) {
            const events = await Event.findAll({
                where: { categoryId: categories[i].id },
                order: [['start', 'DESC']],
                limit: COUNT
            });
            if (events.length) {
                homeEvents.push({ category: categories[i].name, events });
            } else {
                homeEvents.push({ category: categories[i].name, events: [] });
            }
        }
        // console.log(homeEvents);
        return res.json(homeEvents);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Sever Error');
    }
});

router.get('/search', async (req, res) => {
    try {
        let searchData = req.query.searchData;
        let location = req.query.location;
        let from = req.query.from ? new Date(req.query.from) : new Date();
        from.setUTCHours(0); from.setUTCMinutes(0); from.setUTCSeconds(0);
        let to = req.query.to ? new Date(req.query.to) : null;
        if (to) {
            to.setUTCHours(23); to.setUTCMinutes(59); to.setUTCSeconds(59);
        }
        let categories = req.query.categories;

        let query = "SELECT events.id, events.name, events.image, events.start,events.description, categories.name as category, venues.name as venue FROM events, venues, categories WHERE events.categoryId=categories.id AND events.venueId=venues.id";

        let where = {};
        let include = [];

        if (!to) {
            query += ` AND events.start >= '${from}'`;
        } else {
            query += ` AND (events.start BETWEEN '${getDateTimeString(from)}' AND   '${getDateTimeString(to)}')`;
        };
        if (categories) {
            if (categories.length) {
                query += ' AND categories.name IN ('
                for (let i = 0; i < categories.length; i++) {
                    if (i === 0) {
                        query += `'${categories[i]}'`
                    } else {
                        query += `,'${categories[i]}'`
                    }
                    if (i === categories.length - 1) {
                        query += `)`
                    }
                }
            }
        }
        if (location !== "ALL" && location) {
            if (searchData) {
                query += ` AND events.name LIKE '%${searchData}%'`
            }
            include.push({
                model: Venue,
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: '%' + location + '%' } },
                        { address: { [Op.like]: '%' + location + '%' } }
                    ]
                }
            })
            query += ` AND (venues.name LIKE '%${location}%' OR venues.address LIKE '%${location}%')`;
        } else if (searchData) {
            where[Op.or] = [{ name: { [Op.like]: '%' + searchData + '%' } }];
            query += ` AND (events.name LIKE '%${searchData}%' OR venues.name LIKE '%${searchData}%')`
        }
        let events = await sequelize.query(query, { type: QueryTypes.SELECT });
        // console.log(events);
        res.json(events);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/byuser', auth, async (req, res) => {
    try {
        let userId = req.user.id;
        let searchData = req.query.searchData;
        let orderBy = req.query.orderBy;
        let order = req.query.order;
        // console.log(categories);
        let query = 
        `SELECT events.id, events.name, events.image, events.start,events.description, categories.name as category, venues.id as venueId, venues.name as venueName, venues.address as venueAddress, tickets.sold, tickets.available 
        FROM events, venues, categories, (
            SELECT eventId, SUM(sold) as sold, (SUM(quantity)-SUM(sold)) as available
            FROM tickets
            GROUP BY tickets.eventId
        ) as tickets
        WHERE events.categoryId = categories.id AND events.venueId = venues.id AND tickets.eventId = events.id`;
        query += ` AND events.ownerId = ${userId}`

        if (searchData) {
            query += ` AND (venues.name LIKE '%${searchData}%' OR events.name LIKE '%${searchData}%')`;
        }
        query += ` ORDER BY ${orderBy} ${order}`;
        query += ` LIMIT 20`;
        let events = await sequelize.query(query, { type: QueryTypes.SELECT });
        // for (let i = 0; i < events.length; i++) {
        //     let sold = await Ticket.sum('sold', { where: { eventId: events[i].id } });
        //     let available = await Ticket.sum('quantity', { where: { eventId: events[i].id } });
        //     events[i] = { ...events[i], sold, available };
        // }
        // console.log(events.length);
        res.json(events);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/', async (req, res) => {
    try {
        let query = "SELECT events.id, events.name, events.image, events.start,events.description, categories.name as category, venues.id as venueId, venues.name as venueName, venues.address as venueAddress FROM events, venues, categories WHERE events.categoryId=categories.id AND events.venueId=venues.id";
        query += ` AND events.id=${req.query.id}`;
        let event = await sequelize.query(query, { type: QueryTypes.SELECT });
        // console.log(event);
        res.json(event[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Sever Error');
    }
})

module.exports = router;