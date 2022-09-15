const express = require('express');
const router = express.Router();
const { fork } = require('child_process');
const path = require('path');

// Main route
router.get('/randoms', (req, res) => {
    let { cant } = req.query;
    const forked = fork( path.join(__dirname, '../helpers/rand.js'));
    forked.send(cant);
    forked.on('message', result => {
        res.json(result);
    });
});

module.exports = router;