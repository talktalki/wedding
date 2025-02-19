document.addEventListener('DOMContentLoaded', function() {
    const stories = Array.from({ length: 18 }, (_, i) => ({
        image: `images/ourstory_${i}.webp`,
        text: 'First time we met'
    }));
    const storyContainer = document.querySelector('.story-container');
    const storyContent = document.querySelector('.story-content');
    const progressContainer = document.querySelector('.story-progress');
    
    let currentStory = 0;
    let storyTimeout;
    const STORY_DURATION = 5000;

    // Initialize stories
    function initStories() {
        console.log('Initializing stories...'); // Debug
        stories.forEach((story, index) => {
            // Create progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressContainer.appendChild(progressBar);
            console.log(`Added progress bar ${index}`); // Debug

            // Create story
            const storyElement = document.createElement('div');
            storyElement.className = 'story';
            storyElement.style.backgroundImage = `url(${story.image})`;
            storyContent.appendChild(storyElement);
            console.log(`Added story ${index}: ${story.image}`); // Debug
        });

        showStory(0);
    }

    function showStory(index) {
        console.log(`Showing story ${index}`); // Debug
        clearTimeout(storyTimeout);
        
        document.querySelectorAll('.story').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.progress-bar').forEach(p => p.classList.remove('active'));
        
        const stories = document.querySelectorAll('.story');
        const progressBars = document.querySelectorAll('.progress-bar');
        
        if (stories[index]) {
            stories[index].classList.add('active');
            progressBars[index].classList.add('active');
            
            storyTimeout = setTimeout(() => {
                if (currentStory < stories.length - 1) {
                    nextStory();
                }
            }, STORY_DURATION);
        }
    }

    function nextStory() {
        console.log('Next story'); // Debug
        if (currentStory < stories.length - 1) {
            currentStory++;
            showStory(currentStory);
        }
    }

    function previousStory() {
        console.log('Previous story'); // Debug
        if (currentStory > 0) {
            currentStory--;
            showStory(currentStory);
        }
    }

    // Navigation
    document.querySelector('.nav-left').addEventListener('click', (e) => {
        console.log('Left click'); // Debug
        e.stopPropagation();
        previousStory();
    });

    document.querySelector('.nav-right').addEventListener('click', (e) => {
        console.log('Right click'); // Debug
        e.stopPropagation();
        nextStory();
    });

    // Initialize
    console.log('Starting initialization...'); // Debug
    initStories();
});