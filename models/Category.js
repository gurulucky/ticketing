const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: []
});

module.exports = mongoose.model('category', CategorySchema);
