"use strict";

async function loadVideos(url) {
    // return await fetch('https://xvideos-dasw.herokuapp.com/video/list').then(function(response) {return response.json()})
    return await fetch('http://localhost:8080/video/list').then(function(response) {return response.json()})
}

async function loadUsers(url) {
    // return await fetch('https://xvideos-dasw.herokuapp.com/user').then(function(response) {return response.json()})
    return await fetch('http://localhost:8080/user').then(function(response) {return response.json()})
}

async function getVideo(ID) {
    return await fetch('http://localhost:8080/video/list/' + ID).then(function(response) {return response.json()})
}

// function loadPlaylist(url, productList, onSuccess, onError) {
//     let xhr = new XMLHttpRequest();

//     xhr.open('POST', url);
//     xhr.send(JSON.stringify(productList));
//     xhr.setRequestHeader("Content-Type","text/plain");
//     xhr.onload = () => {
//         if (xhr.status == 200) {
//             onSuccess(xhr.responseText);
//         } else {
//             onError(xhr.status + ": " + xhr.statusText);
//         }
//     }
// }

function searchQuery(event) {
    let query = document.getElementById("categorySearch").value + ":" + document.getElementById("titleSearch").value;
    let xhr = new XMLHttpRequest();
    // let url = 'https://xvideos-dasw.herokuapp.com/video?query=' + query;
    let url = 'http://localhost:8080/video?query=' + query;

    xhr.open('GET', url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            sessionStorage.setItem("currQuery", xhr.responseText);
            sessionStorage.setItem("queryString", query);
            window.location.href = '/search';
        } 
    }

    xhr.send(null);
}