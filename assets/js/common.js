// common.js
function loadFooter() {
    fetch('../assets/html/footer.html') 
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

function loadHeader() {
    fetch('../assets/html/header.html') 
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-placeholder')
        console.log("nav loaded");
    });
}

document.addEventListener('DOMContentLoaded', loadFooter);
document.addEventListener('DOMContentLoaded', loadHeader);