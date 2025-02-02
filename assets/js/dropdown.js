const dropdownButtons = document.querySelectorAll('.dropdown-label');

// Add click event listeners to each question button
dropdownButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Toggle the visibility of the associated answer
        const answer = this.nextElementSibling;
        const arrow = this.querySelector('.arrow');

        // Toggle the display of the answer
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)'; // Arrow points down
        } else {
            answer.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)'; // Arrow points up
        }
    });
});

const questionButtons = document.querySelectorAll('.qa-question');

// Add click event listeners to each question button
questionButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Toggle the visibility of the associated answer
        const answer = this.nextElementSibling;
        const arrow = this.querySelector('.arrow');

        // Toggle the display of the answer
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)'; // Arrow points down
        } else {
            answer.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)'; // Arrow points up
        }
    });
});