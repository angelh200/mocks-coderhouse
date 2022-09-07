const mongoose = require('mongoose');

const collection = 'Users';

const schema = mongoose.Schema({
    email: String,
    password: String
}, {timestamps: true});

const userService = mongoose.model(collection, schema);

module.exports = userService;