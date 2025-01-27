// common.js

function loadFooter() {
    data = `<footer id="footer">
        <ul class="copyright">
            <li>&copy; eunseoya</li>
        </ul>
    </footer>`
    document.getElementById('footer-placeholder').innerHTML = data;
}
document.addEventListener('DOMContentLoaded', loadFooter);