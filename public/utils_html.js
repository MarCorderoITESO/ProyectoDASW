const videosUrl = 'https://xvideos-dasw.herokuapp.com/video/list';
// const videosUrl = 'http://localhost:8080/video/list';
const usersUrl = 'https://xvideos-dasw.herokuapp.com/user';
// const usersUrl = 'https://localhost:8080/user';
const upperLimit = document.querySelectorAll('.pagination > li').length - 2;

try {
    document.querySelector('.pagination').onclick = (event) => {
        event.preventDefault();
    
        if (event.target.tagName == 'UL') return;
    
        let clicked = event.target.textContent;
    
        if (!(isNaN(clicked)) && event.target.tagName != 'SPAN') { // Click en los números
            let oldPage = document.querySelector('.pagination > li.active');
            oldPage.innerHTML = '<a class="page-link" href="#">' + oldPage.textContent + '</a>';
            oldPage.classList.remove('active');
    
            let newPage = document.querySelector(`.pagination > li:nth-of-type(${Number(clicked) + 1})`);
            newPage.innerHTML = '<span class="page-link">' + clicked + '</span>';
            newPage.classList.add('active');
    
            if (clicked == 1) {
                document.querySelector(".pagination > li:first-child").classList.add('disabled');
                document.querySelector(".pagination > li:last-child").classList.remove('disabled');
            } else if (clicked == upperLimit) {
                document.querySelector(".pagination > li:last-child").classList.add('disabled');
                document.querySelector(".pagination > li:first-child").classList.remove('disabled');
            } else {
                document.querySelector(".pagination > li:first-child").classList.remove('disabled');
                document.querySelector(".pagination > li:last-child").classList.remove('disabled');
            }
        } else if (event.target.tagName != 'LI') { // Click en botones
            let oldPage = document.querySelector('.pagination > li.active');
            oldPage.innerHTML = '<a class="page-link" href="#">' + oldPage.textContent + '</a>';
            oldPage.classList.remove('active');
    
            if (clicked == 'Siguiente') {
                document.querySelector('.pagination > li').classList.remove('disabled');
    
                let newPage = document.querySelector(`.pagination > li:nth-of-type(${Number(oldPage.textContent) + 2})`);
                newPage.innerHTML = '<span class="page-link">' + newPage.textContent + '</span>';
                newPage.classList.add('active');
    
                if (newPage.innerText == upperLimit) event.target.parentElement.classList.add('disabled');
            } else {
                document.querySelector('.pagination > li:last-child').classList.remove('disabled');
    
                let newPage = document.querySelector(`.pagination > li:nth-of-type(${Number(oldPage.textContent)})`);
                newPage.innerHTML = '<span class="page-link">' + newPage.textContent + '</span>';
                newPage.classList.add('active');
    
                if (newPage.innerText == 1) event.target.parentElement.classList.add('disabled');
            }
        }
    
        changeVideoDisplay();
    };
} catch(er) {
    ;
}

function redirectToVid(videoID) {
    sessionStorage.setItem("lastVisited",videoID);
    window.location.href = '/video/' + videoID;
}