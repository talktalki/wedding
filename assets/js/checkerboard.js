document.addEventListener('DOMContentLoaded', function() {
    let containers = document.querySelectorAll('.grid-container-a, .grid-container-b');
    containers.forEach(container => {
        for (let i = 0; i < 20; i++) {
            const square = document.createElement('div');
            container.appendChild(square);
        }
    });

    containers = document.querySelectorAll('.grid-container-c, .grid-container-d');
    containers.forEach(container => {
        for (let i = 0; i < 4; i++) {
            const square = document.createElement('div');
            container.appendChild(square);
        }
    });
    //if mobile handle grid differently
    if (window.innerWidth < 768) {
        let containers = document.querySelectorAll('.image-grid-container');

        containers.forEach(container => {
            for (let i = 0; i < 16; i++) {
                const square = document.createElement('div');
                square.className = `square ${(i + Math.floor(i/6)) % 3? 'yellow' : 'green'}`;
                container.appendChild(square);
            }
        });
    } else {
   

    containers = document.querySelectorAll('.image-grid-container');
    containers.forEach(container => {
        for (let i = 0; i < 48; i++) {
            const square = document.createElement('div');
            square.className = `square ${(i + Math.floor(i/6)) % 2 ? 'yellow' : 'green'}`;
            container.appendChild(square);
        }
    });

}   
});