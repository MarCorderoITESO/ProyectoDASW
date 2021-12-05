"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/handler');
const views = {root: "public/views"};

router.route('/')
    .get((req, res) => {
        let query = req.query.query; // localhost:8080/video?query=Chambelan:Peru
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

router.route('/:id')
    .get((req, res) => {
        let videoID = dataHandler.getVideoById(req.params.id);
        
        if(videoID) {
            // res.set('Content-Type','text/html; charset=utf-8');
            // res.status(200).sendFile('video.html', views);
            res.sendFile('video.html', views);
        }
        // } else {
        //     res.type("text/html; charset=utf-8");
        //     res.status(404).sendFile("error.html", views);
        // }
    });

module.exports = router;