var countDownDate = new Date("May 3, 2025 17:00:00").getTime();

// Function to add leading zeros
function padNumber(number) {
    return number.toString().padStart(2, '0');
}

// Function to update element with animation
function updateElement(elementId, value) {
    const element = document.getElementById(elementId);
    const currentValue = element.innerHTML;
    
    // Only animate if the value has changed
    if (currentValue !== value) {
        element.innerHTML = value;
        element.setAttribute('data-value', value);
        element.classList.add('changed');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            element.classList.remove('changed');
        }, 300);
    }
}

var countdown = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Add leading zeros and update with animation
    if (distance >= 0) {
        updateElement("countdown--days", padNumber(days));
        updateElement("countdown--hours", padNumber(hours));
        updateElement("countdown--minutes", padNumber(minutes));
    } else {
        clearInterval(countdown);
        updateElement("countdown--days", '🎉');
        updateElement("countdown--hours", '🎉');
        updateElement("countdown--minutes", '🎉');
    }
}, 1000);	