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

function copyToClipboard(text, element) {

    if (navigator.clipboard && window.isSecureContext) {

        navigator.clipboard.writeText(text).then(() => {

            showCopyFeedback(element, '✓');

        }).catch(() => {

            showCopyFeedback(element, ':(');

        });

    } else {

        // Fallback for mobile

        const textArea = document.createElement('textarea');

        textArea.value = text;

        textArea.style.position = 'fixed';

        textArea.style.left = '-999999px';

        document.body.appendChild(textArea);

        textArea.focus();

        textArea.select();

        try {

            document.execCommand('copy');

            showCopyFeedback(element, '✓');

        } catch (err) {

            showCopyFeedback(element, ':(');

        }

        document.body.removeChild(textArea);

    }

}



function showCopyFeedback(element, message) {

    const feedback = element.querySelector('.copy-feedback');

    feedback.textContent = message;

    feedback.style.opacity = '1';

    setTimeout(() => {

        feedback.style.opacity = '0';

    }, 2000);

}


