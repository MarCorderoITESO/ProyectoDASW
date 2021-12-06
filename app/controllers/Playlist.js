"use strict";

class PlaylistException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Playlist {
    constructor(videos) {
        this.videos = videos;
    }

    get videos() {
        return this._videos;
    }

    set videos(val) {
        this._videos = [];
        if (typeof val === "string") {
            val = JSON.parse(val); // Returns JSON object with products
        }

        if (Array.isArray(val)) {
            for (let elem of val) {
                this._videos.push(Video.createFromObject(elem)); // List of videos
            }
        } else this._videos.push(Video.createFromObject(val)); // Single video
    }

    addVideo(videoID) {
        for (let i = 0; i < this._videos.length; i++) {
            if (this._videos[i] == videoID) {
                throw new PlaylistException("Video already in playlist!");
            }
        }

        this._videos.push(videoID);
    }

    removeItem(videoID) {
        for (let i = 0; i < this._videos.length; i++) {
            if (this._videos[i] == videoID) {
                this._video.splice(i, 1);
                break;
            }
        }
    }
}