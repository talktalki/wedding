import { db } from "./firebase.js";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    const messagesContainer = document.querySelector(".cards");
    const messagesRef = collection(db, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp", "desc"));

    // Load and display messages
    const loadMessages = () => {
        onSnapshot(messagesQuery, (snapshot) => {
            messagesContainer.innerHTML = ''; // Clear existing messages
            
            snapshot.forEach((doc) => {
                const message = { id: doc.id, ...doc.data() };
                const card = createMessageCard(message);
                messagesContainer.appendChild(card);
            });

            // Initialize card navigation after loading messages
            initializeCardNavigation();
            const currentCard = document.querySelectorAll('.card');
            
            currentCard.forEach(card => {
                const closeButton = document.createElement('span');
                closeButton.textContent = 'x';
                closeButton.className = 'close-button';
                closeButton.style.position = 'absolute';
                closeButton.style.top = '10px';
                closeButton.style.color = 'black';
                closeButton.style.right = '10px';
                closeButton.style.cursor = 'pointer';
                closeButton.addEventListener('click', () => {
                    handleDelete(card);
                });
                card.appendChild(closeButton);
            });
        });
    };

    function createMessageCard(message) {
        const card = document.createElement("li");
        card.className = "card";
        
        const langAttribute = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(message.content) ? 'ko' : 'en';
        const fontFamily = langAttribute === 'ko' ? 'Gowun Dodum, serif' : '';

        card.innerHTML = `
            <p style="font-family: ${fontFamily}">${message.content}</p>
            <h4 style="font-family: ${fontFamily}">${message.name}</h4>
        `;

        return card;
    }
    function initializeCardNavigation() {
        var $cards = $('.cards .card'),
            $current = $cards.filter('.card--current'),
            $next;

        // Initialize first card if none is current
        if (!$current.length) {
            $current = $cards.last();
            $cards.first().addClass('card--current');
        }

        $cards.on('click', function() {
            if (!$current.is(this)) {
                $cards.removeClass('card--current card--out card--next');
                $current.addClass('card--out');
                $current = $(this).addClass('card--current');
                $next = $current.next();
                $next = $next.length ? $next : $cards.first();
                $next.addClass('card--next');
            }
        });

        // Arrow button navigation
        $('#prev-card').off('click').on('click', function() {
            var $prev = $current.prev();
            if (!$prev.length) {
                $prev = $cards.last();
            }
            $prev.trigger('click');
        });

        $('#next-card').off('click').on('click', function() {
            var $next = $current.next();
            if (!$next.length) {
                $next = $cards.first();
            }
            $next.trigger('click');
        });

        $('.cards').addClass('cards--active');
    }

    // Add 'x' to the top of the current card

 



    // Handle form submission
    document.getElementById("submit-message").addEventListener("click", async function () {
        const name = document.getElementById("name").value.trim();
        const content = document.getElementById("message").value.trim();
        const password = document.getElementById("email").value.trim();

        if (!name || !content || !password) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            await addDoc(messagesRef, {
                name: name,
                content: content,
                password: password,
                timestamp: Date.now()
            });

            // Clear form
            document.getElementById("name").value = "";
            document.getElementById("message").value = "";
            document.getElementById("email").value = "";

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

    // Start loading messages
    loadMessages();


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



