"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/handler');

router.route('/')
    .get((req, res) => {
        res.sendFile('admin.html', {root: "app/views"});
    });

module.exports = router;