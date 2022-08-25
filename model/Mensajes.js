const Container = require('./Container');
const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
        author: {
            id: {type: String, required: true},
            nombre: String,
            apellido: String,
            edad: Number,
            alias: String,
            avatar: String
        },
        text: {type: String, required: true}
    },
    { timestamps: true}
);

const MessageModel = mongoose.model('Message', msgSchema);

const Mensajes = new Container(MessageModel);

module.exports = Mensajes;