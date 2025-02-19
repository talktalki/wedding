const musicList = window.location.pathname.includes('home.html') ? 
    ['assets/music/bettertogether.m4a'] : 
    ['assets/music/sothisislove.m4a'];

class MusicPlayer {
    constructor() {
        this.currentTrackIndex = 0;
        this.audio = new Audio(musicList[this.currentTrackIndex]);
        this.isPlaying = false;
        this.createPlayer();
        this.setupAutoplayForIOS();
        this.attemptAutoplay();

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

    setupAutoplayForIOS() {
        if (this.isIOS()) {
            const startAudio = () => {
                this.audio.play()
                    .then(() => {
                        this.isPlaying = true;
                        this.button.innerHTML = '⏸︎';
                        document.removeEventListener('touchstart', startAudio);
                        document.removeEventListener('click', startAudio);
                    })
                    .catch(error => {
                        console.error("Playback failed:", error);
                    });
            };

            document.addEventListener('touchstart', startAudio);
            document.addEventListener('click', startAudio);
        }
    }

    isIOS() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    }

    attemptAutoplay() {
        if (!this.isIOS()) {
            this.audio.play()
                .then(() => {
                    this.isPlaying = true;
                    this.button.innerHTML = '⏸︎';
                })
                .catch(error => {
                    console.error("Autoplay failed:", error);
                });
        }
    }

    autoplay() {
        // This method is now deprecated, using attemptAutoplay instead
    }
}

document.addEventListener("DOMContentLoaded", function () {
    new MusicPlayer();
});