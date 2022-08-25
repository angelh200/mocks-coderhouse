const { commerce, random } = require('faker');
const express = require('express');
const testRouter = express.Router();

testRouter.get('/api/productos-test', (req, res) => {
    let lista = [];
    for (let i = 0; i < 5; i++) {
        lista.push({
            title: commerce.productName(),
            price: commerce.price(),
            thumbnail: random.image()
        });
    }
    res.json(lista);
});

module.exports = testRouter;
