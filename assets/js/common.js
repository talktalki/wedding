// common.js

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

document.addEventListener("DOMContentLoaded", function() {
    loadFooter();
});

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

    const feedback = document.querySelector('.copy-feedback');

    // only show text content if user is on index.html, not home.html
    if (window.location.pathname.endsWith('index.html')) {
        feedback.textContent = message;
    }

    feedback.style.opacity = '1';

    setTimeout(() => {

        feedback.style.opacity = '0';

    }, 2000);

}


