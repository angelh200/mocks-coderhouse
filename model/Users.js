const mongoose = require('mongoose');

const collection = 'Users';
const schema = mongoose.Schema({
    name: String
}, {timestamps: true});

const userService = mongoose.model(collection, schema);

module.exports = userService;