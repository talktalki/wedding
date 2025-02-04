document.addEventListener('DOMContentLoaded', function () {
    const dropdownButtons = document.querySelectorAll('.dropdown-label');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Toggle the visibility of the associated answer
            const answer = this.nextElementSibling;
            // const arrow = this.querySelector('.arrow');

            // Ensure the answer element exists before accessing its style
            if (answer) {
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    // arrow.style.transform = 'rotate(0deg)'; // Arrow points down
                } else {
                    answer.style.display = 'block';
                    // arrow.style.transform = 'rotate(180deg)'; // Arrow points up
                }
            } else {
                console.error('Answer element not found for button:', button);
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

            // Ensure the answer element exists before accessing its style
            if (answer) {
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                } else {
                    answer.style.display = 'block';
                }
            } else {
                console.error('Answer element not found for button:', button);
            }
        });
    });
});