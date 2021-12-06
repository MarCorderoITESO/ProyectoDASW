"use strict";

require("dotenv").config();

const datahandler = require('../../app/controllers/handler');
const jwt = require('jsonwebtoken');


let token = datahandler.getAccessT();

console.log(token);

async function changeProfileDisplay(){
    getProfile(token).then(profile => {
        console.log(profile);
        let myUser = jwt.decode(token)
        profMail.innerText = "Correo: "+ myUser._email;
        profQtyVid.innerText = "Videos subidos: " + myUser._postedVideos;

    })
}

changeProfileDisplay();