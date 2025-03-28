document.addEventListener("DOMContentLoaded", function () {
  const questionButtons = document.querySelectorAll(".qa-question");

  // Add click event listeners to each question button
  questionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle the visibility of the associated answer
      const answer = this.nextElementSibling;
      const arrow = this.querySelector(".arrow");

      // Ensure the answer element exists before accessing its style
      if (answer) {
        if (answer.style.display === "block") {
          answer.style.display = "none";
        } else {
          answer.style.display = "block";
        }
      } else {
        console.error("Answer element not found for button:", button);
      }
    });
  });
});
