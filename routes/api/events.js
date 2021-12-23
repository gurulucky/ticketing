const express = require('express');
const router = express.Router();

const Event = require('../../models/Event');
const Category = require('../../models/Category');
const Venue = require('../../models/Venue');

const COUNT = 4;

router.get('/home', async (req, res) => {
    try {
        const categories = await Category.find();
        let homeEvents = [];
        for (let i = 0; i < categories.length; i++) {
            const events = await Event.find({ category: categories[i].name }).limit(COUNT);
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
        // let events = await Event.find({ start: { $gt: from, $lt: to }, category: { $in: categories } })
        // .populate('venue', ['address']);
        // let events = await Event.aggregate([{$match:{ start: { $gt: from, $lt: to }, category: { $in: categories } }}]).lookup({from:'venues', localField:'venue',foreignField:'_id', as:'venues'});
        let match = {};
        if (!to) {
            match['start'] = { $gt: from };
        } else {
            match['start'] = { $gt: from, $lt: to };
        }
        // console.log(categories);
        if (categories) {

            if (categories.length) {
                match["category"] = { $in: categories }
            }
        }
        if (location !== "ALL" && location) {
            // match["venue.address"] = { $regex: location }
            if (searchData) {
                match['name'] = { $regex: searchData , $options:'i'}
            }
            match['$or'] = [{ 'venue.address': { $regex: location , $options:'i'} }, { 'venue.name': { $regex: location , $options:'i'} }];
        } else if (searchData) {
            match['$or'] = [{ 'venue.name': { $regex: searchData, $options:'i' } }, { 'name': { $regex: searchData, $options:'i' } }];
        }

        let pipeline = [
            {
                "$lookup": {
                    "from": "venues",
                    "as": "venue",
                    "localField": "venue",
                    "foreignField": "_id"
                }
            },
            {
                "$match": match
            },
            {
                "$skip": 0
            },
            {
                "$limit": 20
            }
        ]
        // console.log(match);
        let events = await Event.aggregate(pipeline);
        // console.log(events);
        res.json(events);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Sever Error');
    }
})

router.get('/', async (req, res) => {
    try {
        let event = await Event.findById(req.query.id).populate('venue');
        // console.log(event);
        res.json(event);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Sever Error');
    }
})

module.exports = router;