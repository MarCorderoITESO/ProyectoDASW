"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/handler');
const views = {
    root: "public/views"
};

router.route('/')
    .get((req, res) => {
        res.status(200).json(dataHandler.getUsers());
    })
    .delete((req, res) => {
        let email = req.body;
        res.type("text/plain; charset=utf-8");

        try {
            for (let user of dataHandler.getUsers()) {
                if (user.email == req.body.email) {
                    email = dataHandler.deleteUser(req.body.email);
                    res.status(201).send(`El usuario "${req.body.email}" ha sido eliminado de la mejor página de quinceañeras del mundo.`);
                    return;
                }
            }

            res.status(400).send('El usuario no existe.');
        } catch (e) {
            res.status(400).send(e.errorMessage);
        }
    });

module.exports = router;