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
        const name = document.getElementById("message-name").value.trim();
        const messageContent = document.getElementById("message-content").value.trim();
        const password = document.getElementById("message-password").value.trim();

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

    function appendMessageToDOM(message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.id = message.id;

        messageElement.innerHTML = `
            <div class="message-header">
                <strong>${message.name}</strong>
                <div>
                    <button class="edit-button" data-id="${message.id}" data-password="${message.password}">Edit</button>
                    <button class="delete-button" data-id="${message.id}" data-password="${message.password}">Delete</button>
                </div>
            </div>
            <p class="message-text">${message.content}</p>
        `;

        // Add the new message to the messages container
        messagesContainer.appendChild(messageElement);
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
            try {
                // Delete the message from Firestore
                await deleteDoc(doc(db, "messages", messageId));

                // Remove the message from the DOM
                const messageElement = document.getElementById(messageId);
                messageElement.remove();
            } catch (error) {
                console.error("Error deleting message:", error);
                alert("Failed to delete message. Please try again.");
            }
        } else {
            alert("Incorrect password. You cannot delete this message.");
        }
    }
});

