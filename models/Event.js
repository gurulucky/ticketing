const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
    },
    venue: {
        type: Schema.Types.ObjectId,
        ref: "venue"
    },
    category: [
        {
            type: String
        }
    ],
    tickets: [
        {
            type: Schema.Types.ObjectId,
            ref: "ticket"
        }
    ],
    image: "",
    status: ""
});

module.exports = mongoose.model('event', EventSchema);
