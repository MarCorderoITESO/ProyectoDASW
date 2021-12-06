"use strict";

class UserException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class UserReview {
    constructor(videoID, userMail, review) {
        this.videoID = videoID;
        this.userMail = userMail;
        this.review = review;
    }
}

class User {
    constructor(email, password, categories, role){
        this.email = email;
        this.password = password;
        this.categories = categories;
        this.role = role
        this._postedvideos = 0;
        this._videos = [];
        this._reviews = [];
    }

    get email() {
        return this._email;
    }

    get postedVideos() {
        return this._postedvideos;
    }

    get categories() {
        return this._categories;
    }

    get reviews() {
        return this._reviews;
    }

    get password() {
        return this._password;
    }

    get role() {
        return this._role;
    }

    set email(val) {
        if (typeof val !== "string" || val === '') {
            throw new UserException("Invalid user mail");
        }

        this._email = val;
    }

    set password(val) {
        if (typeof val !== "string" || val === '' || val.length < 6) {
            throw new UserException("Invalid password");
        }

        this._password = val;
    }

    set postedVideos(val) {
        if (isNaN(val) || val < 0 || val === '') {
            throw new UserException("Invalid video amount");
        }

        this._postedVideos = val;
    }
    
    set categories(val){
        if (typeof val !== "string" && !Array.isArray(val) || val === '') {
            throw new UserException("Brutal error adding categories");
        } else if (typeof val === "string") {
            this._categories = val.split(",");
        } else this._categories = val;
    }

    set role(val) {
        if (isNaN(val) || val < 0 || val === '') {
            throw new UserException("Invalid role");
        }

        this._role = val;
    }

    static createFromJson(jsonValue) {
        return Product.createFromObject(JSON.parse(jsonValue));
    }

    static createFromObject(obj) {
        let newUser = {};
        Object.assign(newUser, obj); // Object validation and clone
        User.cleanObject(newUser);

        let user = new User(
            newUser.email,
            newUser.password,
            newUser.categories,
            newUser.role
        );

        return user;
    }

    static cleanObject(obj) {
        let properties = ["email", "password", "categories", "role"];

        for (let key in obj) {
            if(key[0] == "_") {
                let holder = key.slice(1);
                obj[holder] = obj[key];
                delete obj[key];
                key = holder;
            }

            if (!(key in properties)) {
                delete obj.key;
            }
        }
        
        return obj;
    }
}

module.exports = User;