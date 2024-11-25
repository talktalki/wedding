// common.js
function loadFooter() {
    data = `<footer id="footer">
        <ul class="icons">
            <li><a href="https://www.instagram.com/talktalki/" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
        </ul>
        <ul class="copyright">
            <li>&copy; talktalki</li>
        </ul>
    </footer>`
    document.getElementById('footer-placeholder').innerHTML = data;
}
document.addEventListener('DOMContentLoaded', loadFooter);