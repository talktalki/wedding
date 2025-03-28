document.addEventListener("DOMContentLoaded", function () {
  let containers = document.querySelectorAll(
    ".grid-container-a, .grid-container-b",
  );
  containers.forEach((container) => {
    for (let i = 0; i < 20; i++) {
      const square = document.createElement("div");
      container.appendChild(square);
    }
  });

  containers = document.querySelectorAll(
    ".grid-container-c, .grid-container-d",
  );
  containers.forEach((container) => {
    for (let i = 0; i < 4; i++) {
      const square = document.createElement("div");
      container.appendChild(square);
    }
  });

  containers = document.querySelectorAll(".checkerboard");
  containers.forEach((container) => {
    const rows = 6,
      cols = 6;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const square = document.createElement("div");
        square.classList.add("square");
        if ((row + col) % 2 === 0) {
          square.style.backgroundColor = "#FEFCE7";
        } else {
          square.style.backgroundColor = "#276A34";
        }
        container.appendChild(square);
      }
    }
  });
});
