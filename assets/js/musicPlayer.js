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

        // Add page visibility handling
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        
        // Add mobile-specific event listeners
        this.handlePageHide = this.handlePageHide.bind(this);
        window.addEventListener('pagehide', this.handlePageHide);
        window.addEventListener('beforeunload', this.handlePageHide);
        
        // Add mobile blur/focus handlers
        window.addEventListener('blur', () => this.pauseAudio());
        window.addEventListener('freeze', () => this.pauseAudio());

        // Add resume state tracking
        this.wasPlaying = localStorage.getItem('musicWasPlaying') === 'true';
        this.lastPosition = parseFloat(localStorage.getItem('musicPosition')) || 0;
        
        // Handle page return visibility
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.wasPlaying) {
                this.resumeAudio();
            }
        });

        // Handle page focus
        window.addEventListener('focus', () => {
            if (this.wasPlaying) {
                this.resumeAudio();
            }
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
            this.pauseAudio();
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

    handleVisibilityChange() {
        if (document.hidden) {
            this.pauseAudio();
        }
    }

    handlePageHide() {
        this.pauseAudio();
        // Don't clear audio source anymore so we can resume
        // this.audio.src = '';
        // this.audio.load();
    }

    pauseAudio() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            this.button.innerHTML = '⏵︎';
            // Store state before pausing
            this.wasPlaying = true;
            this.lastPosition = this.audio.currentTime;
            localStorage.setItem('musicWasPlaying', 'true');
            localStorage.setItem('musicPosition', this.audio.currentTime);
        }
    }

    resumeAudio() {
        // Only resume if we were playing before
        if (this.wasPlaying) {
            // Set the time to where we left off
            this.audio.currentTime = this.lastPosition;
            this.audio.play()
                .then(() => {
                    this.isPlaying = true;
                    this.button.innerHTML = '⏸︎';
                    // Clear stored state after successful resume
                    this.wasPlaying = false;
                    localStorage.removeItem('musicWasPlaying');
                    localStorage.removeItem('musicPosition');
                })
                .catch(error => {
                    console.error("Resume playback failed:", error);
                });
        }
    }

    cleanup() {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        window.removeEventListener('pagehide', this.handlePageHide);
        window.removeEventListener('beforeunload', this.handlePageHide);
        this.pauseAudio();
        if (this.isPlaying) {
            this.pauseAudio(); // This will store the state
        }
    }
}

let musicPlayer;
document.addEventListener("DOMContentLoaded", function () {
    musicPlayer = new MusicPlayer();
});

window.addEventListener('unload', () => {
    if (musicPlayer) {
        musicPlayer.cleanup();
    }
});