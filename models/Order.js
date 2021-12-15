const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,


        
    },
    quantity: {
        type: Number,
        required: true
    },
    attendees:[],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('order', OrderSchema);
