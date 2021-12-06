"use strict";

require("dotenv").config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const videoRouter = require('../routes/video');
const adminRouter = require('../routes/admin_marin');
const usrRouter = require('../routes/user');
const dataHandler = require('./handler');
const jwt = require('jsonwebtoken');

const views = {
    root: "public/views"
};

router.use('/video', videoRouter);
router.use('/admin', validateAdmin, adminRouter);
router.use('/user', usrRouter);

router.get('/', (req, res) => res.sendFile('login.html', views));
router.get('/login', (req, res) => res.sendFile('login.html', views));
router.get('/home', (req, res) => res.sendFile('main.html', views));
router.get('/profile', (req, res) => res.sendFile('profile.html', views));
router.get('/register', (req, res) => res.sendFile('register.html', views));
router.get('/member', (req, res) => res.sendFile('membership.html', views));
router.get('/newXV', (req, res) => res.sendFile('newVideo.html', views));
router.get('/search', (req, res) => res.sendFile('search.html', views));
router.get('/newVideo', (req, res) => res.sendFile('newVideo.html', views));
router.get('/adminTest', (req, res) => res.sendFile('admin.html', views));
router.get('/videoTest', (req, res) => res.sendFile('video.html', views));
router.get('*', (req, res) => res.sendFile('error.html', views));

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let users = dataHandler.getUserByMail(email);
    if (users) {
        bcrypt.compare(password, users._password, (err, rest) => {
            if (rest) {
                // const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);
                //console.log(jwt.decode(accessToken));
                res.status(200).redirect('/home');
                // authenticateToken(accessToken, user);
            } else {
                res.status(403).sendFile("loginError.html", views);
            }
        })
    } else {
        res.status(403).sendFile("loginError.html", views);
    }
});

function authenticateToken(token, usr){
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403);
    });
}

router.post('/register', validateData, hashPassword, (req, res) => {
    // esquema: user, pass, passConfirm, categories

    try {
        dataHandler.createUser({
            "email": req.body.user,
            "password": req.body.hashed,
            "categories": req.body.categories,
            "role": 0,
        });

        
        res.status(200).redirect('/login');
    } catch (e) {
        res.status(400).send(e.errorMessage);
    }
});

function validateData(req, res, next) {
    if (!(dataHandler.getUserByMail(req.body.user))
        && req.body.pass == req.body.passConfirm) next();
    else res.status(409).sendFile("errorRegister.html", views);
}

function hashPassword(req, res, next) {
    req.body.hashed = bcrypt.hashSync(req.body.pass, 5);
    next();
}

function validateAdmin(req, res, next) { // Validar x-auth;
    if ("x-auth" in req.headers && req.headers["x-auth"] === "admin") {
        next();
        return;
    }

    res.status(403)
        .type("text/plain")
        .send("Se requieren privilegios de administrador para procesar esta solicitud");
}

module.exports = router;