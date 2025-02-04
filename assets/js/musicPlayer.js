const musicList = [
    'assets/music/sothisislove.m4a'
]

class MusicPlayer {
    constructor() {
        this.currentTrackIndex = 0;
        this.audio = new Audio(musicList[this.currentTrackIndex]);
        this.isPlaying = false;
        this.createPlayer();
        this.autoplay();

        this.audio.addEventListener('ended', () => {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % musicList.length;
            this.audio.src = musicList[this.currentTrackIndex];
            this.audio.play();
        });
    }

    createPlayer() {
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '⏵︎';
        toggleButton.className = 'reset-style';

        toggleButton.addEventListener('click', () => this.togglePlay());
        const nav = document.getElementById('nav');
        const ul = nav.querySelector('ul');
        const li = document.createElement('li');
        li.appendChild(toggleButton);
        ul.prepend(li);

        this.button = toggleButton;
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
            this.button.innerHTML = '⏸︎';
        }).catch(error => {
            console.error("Autoplay failed:", error);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    new MusicPlayer();
});