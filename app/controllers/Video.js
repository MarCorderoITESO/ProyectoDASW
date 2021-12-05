"use strict";

const idGen = require('../controllers/idGen');

class VideoException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Video {
    constructor(title, description, img, category, owner, url) {
        this._id = idGen.generateID();
        this.title = title;
        this.description = description;
        this.img = img;
        this.category = category;
        this.owner = owner;
        this.url = url;
    }
    
    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }
    
    get description() {
        return this._description;
    }

    get img() {
        return this._img;
    }

    get category() {
        return this._category;
    }

    get owner() {
        return this._owner.email;
    }

    get url() {
        return this._url;
    }

    set id(val) {
        throw new VideoException("Video id is auto-generated");
    }

    set title(val) {
        if(typeof val !== "string" || val == ''){
            throw new VideoException("title video cannot be empty payasitos");
        }
        this._title = val;
    }
    
    set description(val) {
        if (typeof val !==  "string" || val.length < 15 || val === '') {
            throw new UserException("Invalid video description");
        }

        this._description = val;
    }

    set img(val) {
        if(typeof val !== "string"){
            throw new VideoException("Invalid Url for the image");
        }
        this._img = val;
    }
    
    set category(val) {
        if(typeof val !== "string"){
            throw new VideoException("Invalid type of category");
        }
        
        this._category = val;
    }

    set owner(val) {
        if(typeof val !== "string"){
            throw new VideoException("Invalid owner");
        }

        this._owner = val;
    }

    set url(val) {
        if(typeof val !== "string"){
            throw new VideoException("Invalid url");
        }

        this._url = val;
    }

    static createFromObject(obj) {
        let newVideo = {};
        Object.assign(newVideo, obj); // Object validation and clone
        Video.cleanObject(newVideo);

        let video = new Video(
            newVideo.title,
            newVideo.description,
            newVideo.img,
            newVideo.category,
            newVideo.owner,
            newVideo.url
        );
        //newVideo

        return video;
    }

    static cleanObject(obj) {
        let properties = ["title", "description", "img", "category", "owner", "url"];

        for (let key in obj) {
            if (!(key in properties)) {
                delete obj.key;
            }
        }

        return obj;
    }
}

module.exports = Video;