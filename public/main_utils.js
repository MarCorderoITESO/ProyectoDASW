"use strict";

let videoRows = document.querySelectorAll("div[data-row]");

function videoToHTML(video) {
    return `
            <div class="card border mx-5" onclick="redirectToVid('${video._id}')">
                <span class="d-none">${video._id}</span>
                <div class="card-body">
                    <img class="card-img-top"
                    src="${video._img}" alt="${video._title}">
                    <p class="card-text">${video._title}</p>
                </div>
            </div>
    `;
}

function videoListToHTML(videoList) {
    let convertedVideos = videoList.map(videoToHTML), stringVideos = '', currRow = 0;
    for (let i = 0; i <= 9; i++) {
        if(i%3 == 0 && i != 0) {
            videoRows[currRow].innerHTML = stringVideos;
            currRow++;
            stringVideos = '';
        }

        stringVideos += convertedVideos[i];
    }
}

async function changeVideoDisplay() {
    loadVideos(videosUrl).then(videos => {
        let page = document.querySelector('.pagination > li.active').innerText;
        videoListToHTML(videos.slice(9 * (page - 1), 9 * page));
    });
}

changeVideoDisplay();