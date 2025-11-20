// common.js

function loadFooter() {
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadFooter();
});

function copyToClipboard(text, element) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showCopyFeedback(element, "✓");
      })
      .catch(() => {
        showCopyFeedback(element, ":(");
      });
  } else {
    // Fallback for mobile

    const textArea = document.createElement("textarea");

    textArea.value = text;

    textArea.style.position = "fixed";

    textArea.style.left = "-999999px";

    document.body.appendChild(textArea);

    textArea.focus();

    textArea.select();

    try {
      document.execCommand("copy");

      showCopyFeedback(element, "✓");
    } catch (err) {
      showCopyFeedback(element, ":(");
    }

    document.body.removeChild(textArea);
  }
}

function showCopyFeedback(element, message) {
  const feedback = document.querySelector(".copy-feedback");

  // only show text content if user is on index.html, not home.html
  if (window.location.pathname.endsWith("index.html")) {
    feedback.textContent = message;
  }

  feedback.style.opacity = "1";

  setTimeout(() => {
    feedback.style.opacity = "0";
  }, 2000);
}

function createHeartShower() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML =
      '<svg class="countdown-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#F6DCD0"/></svg>';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDelay = Math.random() * 1.5 + "s"; // Reduced from 2s to 0.5s
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000); // Reduced from 3000ms to 1500ms
  }
}

function copyAccount(text, element) {
  // Create a temporary input element
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);

  // Select and copy the text
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  // Show feedback
  alert("복사 완료!");
}
function toggleDropdown(dropdownLabel) {
  var dropdownItem = dropdownLabel.nextElementSibling;
  if (
    dropdownItem.style.display === "none" ||
    dropdownItem.style.display === ""
  ) {
    dropdownItem.style.display = "block";
  } else {
    dropdownItem.style.display = "none";
  }
}

document.querySelectorAll(".dropdown-label").forEach(function (dropdownLabel) {
  var dropdownItem = dropdownLabel.nextElementSibling;
  dropdownItem.style.display = "none"; // Initially set to none
  dropdownLabel.addEventListener("click", function () {
    toggleDropdown(dropdownLabel);
  });
});
