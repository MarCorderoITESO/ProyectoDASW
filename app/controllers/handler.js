"use strict";

const fs = require('fs');
const Video = require('./Video');
const User = require('./User');
const {
    MongoClient
} = require('mongodb');
const conURL = "mongodb+srv://AdminXV:quinceIlusiones@cluster0.9ysgm.mongodb.net/test?authSource=admin&replicaSet=atlas-thva97-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const parsHit = {
    useNewUrlParser: true
};
var users;

MongoClient.connect(conURL, parsHit, (err, client) => {
    if (err) {
        console.log('No se pudo conectar al servidor de MongoDB');
        return;
    }
    console.log('Connected to MongoDB server')
    const db = client.db("Users");
    db.collection('Registered_Users').find().toArray().then(function(data){
        try {
            users = data.map(User.createFromObject);
            console.log(users);
            // client.close();
        } catch (e) {
            console.log(e);
        }
    });

    console.log(users);
});

const videos = JSON.parse(fs.readFileSync('./app/data/videos.json')).map(Video.createFromObject);
// const users = JSON.parse(fs.readFileSync('./app/data/users.json')).map(User.createFromObject);
// const reviews = [];

function appendToFile(elem, fileName) {
    let contentFile = fs.readFileSync('./app/data/' + fileName + '.json');
    let toWrite = JSON.stringify(JSON.parse(contentFile)).split("]")[0] + ", " + JSON.stringify(elem) + ']';
    fs.writeFileSync("./app/data/" + fileName + ".json", toWrite);
}

function updateFile(content, fileName) {
    let toWrite = JSON.stringify(content);
    fs.writeFileSync("./app/data/" + fileName + ".json", toWrite);
}

function modifyElemInFile(index, modifiedProperties, fileName) {
    let toWrite = JSON.parse(fs.readFileSync('./app/data/' + fileName + '.json'));

    for (let property in toWrite[index]) {
        for (let modProperty in modifiedProperties) {
            if (property == modProperty) {
                toWrite[index][property] = modifiedProperties[modProperty];
                break;
            }
        }
    }

    fs.writeFileSync("./app/data/" + fileName + ".json", JSON.stringify(toWrite));
}


/* ---- PARTE DE USUARIOS ---- */
function getUsers() {
    // return users;
    MongoClient.connect(conURL, parsHit, (err, client) => {
        if (err) {
            console.log('No se pudo conectar al servidor de MongoDB');
            return;
        }
        console.log('Connected to MongoDB server')
        const db = client.db("Users");
        db.collection('Registered_Users').find().toArray().then(function(data){
            try {
                return data.map(User.createFromObject);
                // client.close();
            } catch (e) {
                console.log(e);
            }
        });
    });
}

function createUser(newUser) { // Create
    if (typeof newUser === "string") users.push(User.createFromJSON(newUser));
    else users.push(User.createFromObject(newUser));
    appendToFile(newUser, "users");
}

function deleteUser(email) { // Delete
    for (let i = 0; i < users.length; i++) {
        if (users[i]._email == email) {
            users.splice(i, 1);
            updateFile(users, "users");
            return;
        }
    }
}


/* ---- PARTE DE VIDEOS ---- */
function createVideo(video) { // Create
    if (typeof video === "string") videos.push(Video.createFromJSON(video));
    else videos.push(Video.createFromObject(video));
}

function getVideos() { // Read
    return videos;
}

function getVideoById(ID) { // Read
    return videos.find(video => video._id == ID);
}

function updateVideo(ID, updatedVideo) { // Update
    // updatedVideo is an object that only holds attributes to be changed
    updatedVideo = Video.cleanObject(updatedVideo);

    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id == ID) {
            for (let property in updatedVideo) {
                videos[i][property] = updatedVideo[property];
            }
            return;
        }
    }
}

function deleteVideo(ID) { // Delete
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id == ID) {
            videos.splice(i, 1);
            return;
        }
    }
}

function findVideo(query) { // Read
    if (query.length == 0 || typeof query !== "string") return "Invalid query";
    let filteredVideos = [...videos];

    query = query.split(":");

    switch (query.length) {
        case 1: // Only title
            filteredVideos = filteredVideos.filter(item => item.title.includes(query));
            break;
        case 2:
            if (query[1].length == 0) { // Only category
                filteredVideos = filteredVideos.filter(item => item.category.includes(query[0]));
            } else { // Both
                filteredVideos = filteredVideos.filter(item => item.category.includes(query[0]));
                filteredVideos = filteredVideos.filter(item => item.title.includes(query[1]));
            }
            break;
    }

    return filteredVideos;
}

function addUserReview(videoID, email, review) {}

function deleteUserReview(VideoID, email) { // Delete bullshit
}


exports.getUsers = getUsers;
exports.createUser = createUser;
exports.deleteUser = deleteUser;

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
exports.findVideo = findVideo;