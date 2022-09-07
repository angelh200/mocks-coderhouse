const express = require('express');
const router = express.Router();
const userService = require('../model/Users');
const { createHash, isValidPassword } = require('../util');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email||!password) res.status(400).send({status: 'error', error: 'Valores incompletos!'});
        const user = await userService.findOne({ email });
        if(!user) {
            // Si no existe se crea el usuario
            console.log('El usuario no existe!');
            return res.status(400).send({
                status: 'error',
                error: 'El usuario no existe'
            });
        }
        if(!isValidPassword(user,password)) {
            return res.status(400).send({
                status: 'error',
                error: 'La contraseña es incorrecta!'
            });
        }
        req.session.user = user;
        return res.send({
            status: 'success',
            payload: user
        });
    } catch (err) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
});

router.post('/register', async(req, res) => {
    try {
        const { email, password } = req.body;
        if(!email||!password) {
            console.log('error');
            return res.status(400).send({
                status: 'error',
                error: 'Valores incompletos!'
            });
        }
        let exists = await userService.findOne({email});
        if(exists) {
            return res.status(400).send({
                status: 'error',
                error: 'El usuario ya existe!'
            });
        }
        let result = await userService.create({
            email,
            password: createHash(password)
        });
        res.send({
            status: 'Success',
            payload: result._id
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
        
    }
});

router.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({err});
        res.send({status: 'Logged out!'});
    });
});


module.exports = router;