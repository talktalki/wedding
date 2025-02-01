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
            dateContainer.style.bottom = '20px';


        });

    }, {
        threshold: [0]
    });
    
    
    const events = [
        new Event("2018.4.1", "Went to the Cubs game with Toni + Brad. Yosep told Grace not to worry because they’re very down to earth!"),
        new Event("2018.6.3", "Started Dating - 한달간 떨어져 있다가 은지가 한국으로 온 그 다음 날, 고속터미널에서 "),
        new Event("2019.5.1", "Cambodia - 요셉이와 함께 캄보디아 가서 엄마아빠 만나기 + 아빠랑 같이 Zzz"),
        new Event("2020.5.11", "Graduation - 코로나 시절, 조용한 캠퍼스에 둘이 졸업. "),
        new Event("2021.2.26 ", "1000 Days - 요셉이가 한국으로 떠나고 롱디를 본격적으로 시작한 날. 이 날만큼은 펑펑 울었다. "),
        new Event("2021.8.25 ", "LDR Started"),
        new Event("2022.5.22", "Reunite after 9 months"),
        new Event("2022.8.1", "LDR Ended"),
        new Event("2024.5.13", "Engagement"),
        new Event("2025.5.3", "Wedding")
    ];

    // Set pictures for all events
    events[0].setPicture("url('../images/ring.jpg')");

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

        const textContent = document.createElement('div');
        textContent.className = 'timeline-text-content';

        const description = document.createElement('p');
        description.textContent = events[index].getDescription();
        const eventDate = document.createElement('p');
        eventDate.textContent = events[index].getDate();


        
        if (events[index].getPicture()) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'timeline-image';
            imageContainer.style.backgroundImage = events[index].getPicture();
            imageContainer.style.backgroundSize = 'cover';
            imageContainer.style.backgroundPosition = 'center';
            imageContainer.style.height = '200px';
            content.appendChild(imageContainer);
        }
        
        textContent.appendChild(eventDate);
        textContent.appendChild(description);
        textContent.style.margin = '20px 0 0 0';
        content.appendChild(textContent);
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