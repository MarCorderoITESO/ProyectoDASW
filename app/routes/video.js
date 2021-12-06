"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/handler');
const views = {root: "public/views"};

router.route('/')
    .get((req, res) => {
        let query = req.query.query;
        if (query == undefined) {
            res.status(200).json(dataHandler.getVideos());
        } else {
            res.status(200).json(dataHandler.findVideo(query));
        }
    });

router.route('/list')
    .get((req, res) => {
        res.set('Content-Type','application/json');
        res.status(200).json(dataHandler.getVideos());
    });

router.route('/list/:id')
    .get((req, res) => {
        let videoID = dataHandler.getVideoById(req.params.id);

        if(videoID) {
            res.set('Content-Type','application/json');
            res.status(200).json(videoID);
        } else {
            res.type("text/plain; charset=utf-8");
            res.status(404).send("No encontrado");
        }
    });

router.route('/:id')
    .get((req, res) => {
        let videoID = dataHandler.getVideoById(req.params.id);
        
        if(videoID) {
            res.type("text/html; charset=utf-8");
            res.status(200).sendFile('video.html', views);
        } else {
            res.type("text/html; charset=utf-8");
            res.status(404).sendFile("errorVid.html", views);
        }
    });

module.exports = router;