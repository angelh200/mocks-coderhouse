const Container = require('./Container');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        title: {type: String, required: true},
        thumbnail: String,
        price: {type: Number, required: true},
        stock: Number
    },
    { timestamps: true}
);

const ProductModel = mongoose.model('Product', productSchema);

const Productos = new Container(ProductModel);

module.exports = Productos;