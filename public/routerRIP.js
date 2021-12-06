"use strict";

const express = require('express');
const router = express.Router();
const videoRouter = require('../routes/video');
const adminRouter = require('../routes/admin_marin');
const usrRouter = require("../routes/user");
const views = {root: "app/views"};

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
router.get('/adminTest', (req, res) => res.sendFile('admin.html', views));
router.get('*', (req, res) => res.sendFile('error.html', views));

function validateAdmin(req, res, next) {
    // Validar x-auth;
    if("x-auth" in req.headers && req.headers["x-auth"] === "admin") {
        next();
        return;
    }
    
    res.status(403)
        .type("text/plain")
        .send("Se requieren privilegios de administrador para procesar esta solicitud");
}

module.exports = router;