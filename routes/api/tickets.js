const express = require('express');
const router = express.Router();

const Ticket = require('../../models/Ticket');

router.get('/', async (req, res) => {
    try {
        let eventId = req.query.eventId;
        const tickets = await Ticket.find({ eventId });
        res.json(tickets);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;