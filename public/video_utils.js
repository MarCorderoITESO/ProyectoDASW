"use strict";
let lastID = sessionStorage.lastVisited;

async function changeVideoDisplay() {
    getVideo(lastID).then(video => {
        titleText.innerText = video._title;
        vidContain.setAttribute("src", video._url);
        vidDesc.innerText = video._description;
        console.log(video._url);
    });
}

changeVideoDisplay();