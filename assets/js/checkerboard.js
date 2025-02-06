document.addEventListener('DOMContentLoaded', function() {
    let containers = document.querySelectorAll('.grid-container-a, .grid-container-b');
    containers.forEach(container => {
        for (let i = 0; i < 20; i++) {
            const square = document.createElement('div');
            container.appendChild(square);
        }
    });
});