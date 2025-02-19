import { db } from "./firebase.js"; // Import Firestore instance
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", function () {
    const messagesContainer = document.getElementById("messages-container");
    const messagesRef = collection(db, "messages"); // Reference Firestore "messages" collection
    // Create a Firestore query to order messages by timestamp
    const messagesQuery = query(messagesRef, orderBy("timestamp"));
    // Load messages from Firestore in real-time
    const loadMessages = () => {
        onSnapshot(messagesQuery, (snapshot) => {
            const messagesContainer = document.getElementById("messages-container");
            messagesContainer.innerHTML = ""; // Clear the container
    
            // Loop through each document in the snapshot and append the message to the DOM
            snapshot.forEach((doc) => {
                const message = { id: doc.id, ...doc.data() };
                appendMessageToDOM(message);
            });
        });
    };
    
    loadMessages(); // Start listening for changes

    // Handle Submit
    document.getElementById("submit-message").addEventListener("click", async function () {
        // Get input values
        const messageNameInput = document.getElementById("message-name");
        const messageContentInput = document.getElementById("message-content");
        const messagePasswordInput = document.getElementById("message-password");

        const name = messageNameInput.value.trim();
        const messageContent = messageContentInput.value.trim();
        const password = messagePasswordInput.value.trim();

        // Validate inputs
        if (name === "" || messageContent === "" || password === "") {
            alert("Please fill out all fields, including the password.");
            return;
        }

        try {
            // Add a new message to Firestore
            await addDoc(messagesRef, {
                name: name,
                content: messageContent,
                password: password,
                timestamp: Date.now(), // Add a timestamp for sorting if needed
            });

            // Clear inputs
            document.getElementById("message-name").value = "";
            document.getElementById("message-content").value = "";
            document.getElementById("message-password").value = "";
            // Trigger confetti effect
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } catch (error) {
            console.error("Error adding message:", error);
            alert("Failed to send message. Please try again.");
        }
    });

    // Handle Edit and Delete using event delegation
    messagesContainer.addEventListener("click", async function (event) {
        const target = event.target;

        if (target.classList.contains("edit-button")) {
            handleEdit(target);
        } else if (target.classList.contains("save-button")) {
            handleSave(target);
        } else if (target.classList.contains("delete-button")) {
            handleDelete(target);
        }
    });

    let visibleMessageCount = 3;

function appendMessageToDOM(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.id = message.id;

    const langAttribute = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(message.content) ? 'ko' : 'en';
    messageElement.innerHTML = `
        <div class="message-header">
            <strong>${message.name}</strong>
            <div class="message-actions">
                <button class="delete-button" data-id="${message.id}" data-password="${message.password}">x</button>
            </div>
        </div>
        <p class="message-text">${message.content}</p>
    `;
    const messageText = messageElement.querySelector(".message-header strong");
    const messageName =  messageElement.querySelector(".message-text");
    messageText.style.fontFamily = langAttribute === 'ko' ? 'Gowun Dodum, serif' : 'Noto Sans, sans-serif';
    messageName.style.fontFamily = langAttribute === 'ko' ? 'Gowun Dodum, serif' : 'Noto Sans, sans-serif';
    // Add message but hide if beyond visible count
    messageElement.style.display = messagesContainer.children.length >= visibleMessageCount ? 'none' : 'block';
    messagesContainer.appendChild(messageElement);

    // Add or update "Show More" button
    updateShowMoreButton();
}
let isExpanded = false;
function updateShowMoreButton() {
    let showMoreButton = document.getElementById('show-more-button');
    const showMoreTextKo = '더보기';
    const showLessTextKo = '줄이기';

    if (!showMoreButton) {
        showMoreButton = document.createElement('button');
        showMoreButton.type = 'button';
        showMoreButton.id = 'show-more-button';
        showMoreButton.classList.add('primary');
        messagesContainer.after(showMoreButton);
    }

    const totalMessages = messagesContainer.children.length;
    showMoreButton.style.display = totalMessages > 3 ? 'block' : 'none';

    showMoreButton.textContent = isExpanded ? showLessTextKo : showMoreTextKo;
    showMoreButton.setAttribute('data-ko', isExpanded ? showLessTextKo : showMoreTextKo);

    showMoreButton.onclick = () => {
        const messages = Array.from(messagesContainer.children);
        if (isExpanded) {
            // Show only first 3 messages
            messages.forEach((msg, index) => {
                msg.style.display = index < 3 ? 'block' : 'none';
            });
            visibleMessageCount = 3;
        } else {
            // Show all messages
            messages.forEach(msg => {
                msg.style.display = 'block';
            });
            visibleMessageCount = messages.length;
        }
        isExpanded = !isExpanded;
        updateShowMoreButton();
    };
}
    async function handleEdit(button) {
        const messageId = button.dataset.id;
        const enteredPassword = prompt("Enter the password to edit this message:");

        // Check if the user pressed "Cancel" (enteredPassword will be null)
        if (enteredPassword === null) {
            // If Cancel is clicked, simply return without doing anything
            return;
        }
        if (enteredPassword === button.dataset.password) {
            const messageElement = document.getElementById(messageId);
            const messageText = messageElement.querySelector(".message-text");

            // Make the message text editable
            messageText.contentEditable = true;
            messageText.focus();

            // Change the edit button to a "Save" button
            button.textContent = "Save";
            button.classList.remove("edit-button");
            button.classList.add("save-button");
        } else {
            alert("Incorrect password. You cannot edit this message.");
        }
    }

    async function handleSave(button) {
        const messageId = button.dataset.id;
        const messageElement = document.getElementById(messageId);
        const messageText = messageElement.querySelector(".message-text");

        try {
            // Save the updated content to Firestore
            await updateDoc(doc(db, "messages", messageId), {
                content: messageText.textContent.trim(),
            });

            // Make the text non-editable
            messageText.contentEditable = false;

            // Change the button back to "Edit"
            button.textContent = "Edit";
            button.classList.remove("save-button");
            button.classList.add("edit-button");
        } catch (error) {
            console.error("Error updating message:", error);
            alert("Failed to update message. Please try again.");
        }
    }

    async function handleDelete(button) {
        const messageId = button.dataset.id;
        const enteredPassword = prompt("Enter the password to delete this message:");

        // Check if the user pressed "Cancel" (enteredPassword will be null)
        if (enteredPassword === null) {
            // If Cancel is clicked, simply return without doing anything
            return;
        }
        if (enteredPassword === button.dataset.password) {
            // Delete the message from Firestore
            await deleteDoc(doc(db, "messages", messageId));

            // Remove the message from the DOM
            const messageElement = document.getElementById(messageId);
            messageElement.remove();
        } else {
            alert("Incorrect password. You cannot delete this message.");
        }
    }
});



// const params = new URLSearchParams(window.location.search);
// const location = params.get('location');

// if (location === 'y') {
//     document.getElementById('y-details').style.display = 'block';
//     document.getElementById('g-details').style.display = 'none';
// } else if (location === 'g') {
//     document.getElementById('y-details').style.display = 'none';
//     document.getElementById('g-details').style.display = 'block';
// }
