function convertDate(date) {
    const [year, month, day] = date.split('.').map(Number);
    return new Date(year, month, day);
}

// d date should be D+N format until 2025/05/03
function getDdate(date) {
    const startDay = new Date(2018, 6, 3); // Month is 0-based, so 4 is May
    const eventDate = convertDate(date);
    const diffTime = eventDate.getTime() - startDay.getTime() ;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `D+${diffDays}` : `D${diffDays}`;
}

class Event {
    constructor(date, description) {
        this.date = date;
        this.ddate = getDdate(date);
        this.description = description;
        this.picture = null;
    }
    getPicture() {
        return this.picture;
    }
    setPicture(picture) {
        this.picture = picture;
    }
    getDate() {
        return this.date;
    }
    getDescription() {
        return this.description;
    }
    getDdate() {
        return this.ddate;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const dateContainer = document.getElementById("date-container");
    const dateDisplay = document.getElementById("date-display");
    dateContainer.style.opacity = "0";
    let isWithinTimeline = false;

    // Timeline container observer
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isWithinTimeline = entry.isIntersecting;

            dateContainer.style.opacity = isWithinTimeline ? "1" : "0";


        });

    }, {
        threshold: [0]
    });
    
    
    const events = [
        new Event("2018.4.1", "Cubs"),
        new Event("2018.6.3", "Started Dating"),
        new Event("2019.5.1", "Cambodia"),
        new Event("2020.5.11", "Graduation"),
        new Event("2021.2.26 ", "1000 Days"),
        new Event("2021.8.25 ", "LDR Started"),
        new Event("2022.5.22", "Reunite after 9 months"),
        new Event("2022.8.1", "LDR Ended"),
        new Event("2024.5.13", "Engagement"),
        new Event("2025.5.3", "Wedding")
    ];

    // Set pictures for all events
    events[0].setPicture("../../images/ring.jpg");

    const dates = events.map(event => event.getDdate());
    const ddates = events.map(event => event.getDdate());

    // Create timeline sections
    const timeline = document.createElement('div');
    timeline.className = 'timeline-container';
    timeline.appendChild(dateContainer);
    timelineObserver.observe(timeline);

    ddates.forEach((date, index) => {
        const section = document.createElement('section');
        section.className = 'timeline-section';
        section.id = `date-section-${index + 1}`;
        
        const dateMarker = document.createElement('div');
        dateMarker.className = 'date-marker';
        dateMarker.textContent = events[index].getDate();
        
        const content = document.createElement('div');
        content.className = 'timeline-content';
        if (events[index].getPicture()) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'timeline-image';
            
            const img = document.createElement('img');
            img.src = events[index].getPicture();
            img.alt = events[index].getDescription();
            img.onerror = () => {
                console.error(`Failed to load image for ${date}`);
                imageContainer.style.display = 'none';
            };

            // make the image smaller
            img.style.width = '100%';
            
            imageContainer.appendChild(img);
            content.appendChild(imageContainer);
        }
        const description = document.createElement('p');
        description.textContent = events[index].getDescription();
        const eventDate = document.createElement('p');
        eventDate.textContent = events[index].getDate();
        
        content.appendChild(eventDate);
        content.appendChild(description);
        
        // section.appendChild(dateMarker);
        section.appendChild(content);
        timeline.appendChild(section);

    });

    // Insert timeline into the page
    document.querySelector('.wrapper.style5 .inner').appendChild(timeline);

    // Intersection Observer for sections with better options
    let visibleSections = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const dateIndex = parseInt(sectionId.split('-')[2]) - 1;

            if (entry.isIntersecting) {
                visibleSections.add(dateIndex);
                entry.target.classList.add('active');
            } else {
                visibleSections.delete(dateIndex);
                entry.target.classList.remove('active');
            }

            if (isWithinTimeline) {
                const currentIndex = Math.max(...Array.from(visibleSections));
                dateDisplay.textContent = dates[currentIndex];
                dateContainer.style.opacity = "1";
            }
        });
    }, {
        threshold: [0]
    });

    // Observe all sections
    document.querySelectorAll('.timeline-section').forEach(section => {
        observer.observe(section);
    });
});