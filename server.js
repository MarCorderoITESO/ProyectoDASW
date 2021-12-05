"use strict";

const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const router = require('./app/controllers/routerRIP');

app.use(express.static('public')); //TONTO el que TOQUE o MODIFIQUE esta línea
app.use(express.static(__dirname + './public'));
app.use(express.json()); // Parsear peticiones en JSON
app.use('/', router);

app.listen(port, () => {
  console.log(`XVideos at ${port} KM/H`)
});

// "start": "nodemon server.js --config nodemon.json"