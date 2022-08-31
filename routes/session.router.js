const express = require('express');
const router = express.Router();
const userService = require('../model/Users');

router.post('/login', async (req, res) => {
    const { name } = req.body;
    if(!name) res.status(400).send({error: 'Valores incompletos!'});
    try {
        const user = await userService.findOne({name: req.body.name});
        // Si no existe se crea el usuario
        if(!user) {
            let newUser = { name };
            let result = await userService.create(newUser);
            req.session.user = result;
            res.send({
                status: 'success',
                payload: result
            });
        } else {
            // Inica sesion el usuario
            req.session.user = user;
            res.send({
                status: 'success',
                payload: user
            });
        }
    } catch (err) {
        res.status(500).send({err});
    }
});

router.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({err});
        res.send({status: 'Logged out!'});
    });
});


module.exports = router;