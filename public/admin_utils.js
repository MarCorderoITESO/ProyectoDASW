"use strict";

let userContainer = document.getElementById("userContainer");

function userLine(user) {
    return `
            <h3 data-reviews="${user._reviews.length}" data-videos="${user._videos.length}">${user._email}</h3>
    `;
}

function userListToHTML(userList) {
    let convertedUsers = userList.map(userLine), stringUsers = '';

    for(let user of convertedUsers) stringUsers += user;
    
    userContainer.innerHTML = stringUsers;
}

function displayUserData(event) {
    selectedUser.innerText = event.target.innerText;
    retrievedReviews.innerText = event.target.dataset.reviews;
    retrievedVideos.innerText = event.target.dataset.videos;
}

function bind(){
    for (let tag of document.querySelectorAll("h3")) {
        tag.addEventListener('click', displayUserData);
    }
}

loadUsers(usersUrl).then(users => {
    userListToHTML(users);
    bind();
});