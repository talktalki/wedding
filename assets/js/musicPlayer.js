class MusicPlayer {
    constructor() {
        this.audio = new Audio('assets/music/davichi-fanfare.mp3'); // Replace with your actual music URL
        this.isPlaying = false;
        this.createPlayer();
        this.autoplay(); // Autoplay the music when the player is created
    }

    createPlayer() {
        const toggleButton = document.createElement('button');
        // make button size smaller
        toggleButton.innerHTML = '⏵︎';
        toggleButton.className = 'reset-style';

        toggleButton.addEventListener('click', () => this.togglePlay());
        const nav = document.getElementById('nav');
        const ul = nav.querySelector('ul');
        const li = document.createElement('li');
        li.appendChild(toggleButton);
        ul.prepend(li);

        this.button = toggleButton; // Set this.button to the toggleButton element
        this.audio.loop = true;
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            this.button.innerHTML = '⏵︎';
        } else {
            this.audio.play();
            this.isPlaying = true;
            this.button.innerHTML = '⏸︎';
        }
    }

    autoplay() {
        this.audio.play().then(() => {
            this.isPlaying = true;
        }).catch(error => {
            console.error("Autoplay failed:", error);
        });
    }
}

// Initialize the music player when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    new MusicPlayer();
});