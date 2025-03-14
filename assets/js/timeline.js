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
    
    const events = [
        new Event("2018년 2월", "저희는 대학교 2학년 때 처음 만났어요. 교회도 기숙사도 같다 보니 자연스럽게 친해졌어요. 그러다가 서로의 마음을 확인하고 여름방학부터 연애를 시작했어요."),
        new Event("2019년 5월", "연애한 지 1년 됐을 때쯤, 요셉이가 은지네 집인 캄보디아에 방문했어요. 은지네 가족도 만나고, 캄보디아도 여행하고, 여러모로 소중한 시간이었어요."),
        new Event("2020년 5월", "코로나가 한창 심했던 시절, 다 집에 가고 아무도 없는 캠퍼스에서 둘이 졸업을 축하했어요. 함께 있었기에 외롭지 않았고, 서로에게 많이 의지했던 시기였죠."),
        new Event("2021년 8월", "졸업 후, 각자 사회인으로서 1년을 열심히 살아내고, 요셉이가 군복무로 한국에 돌아가게 됐어요. 공항에서 헤어질 때, 참 많이 울었어요. 한국-미국 롱디 시작!"),
        new Event("2022년 5월", "입대 후, 9개월 만에 다시 만났어요! 여름 내내 면회도 많이 가고 휴가도 나오고 함께 시간을 알차게 보냈어요. 비가 많이 쏟아지던 날에 상견례도 했답니다 😊"),
        new Event("2024년 5월", "그렇게 롱디로 2년을 더 보내고,, 드디어! 요셉이가 은지에게, 은지의 27번째 생일날 프러포즈를 했어요! 이 긴 연애 끝에 결실을 맺게 되어서 너무 행복하고 감사한 마음 가득이에요.")
    ];

    // Set pictures for all events
    events[0].setPicture("2018.jpg");
    events[1].setPicture("2019.jpg");
    events[2].setPicture("2020.jpg");
    events[3].setPicture("2021.jpg");
    events[4].setPicture("2022.jpg");
    events[5].setPicture("ring.jpg");


    const dates = events.map(event => event.getDdate());
    const ddates = events.map(event => event.getDdate());

    // Create timeline sections
    const timeline = document.createElement('div');
    timeline.className = 'timeline-container';

    ddates.forEach((date, index) => {
        const section = document.createElement('section');
        section.className = 'timeline-section';
        section.id = `date-section-${index + 1}`;
    
        const leftContent = document.createElement('div');
        const rightContent = document.createElement('div');
    
        leftContent.className = `timeline-content left`;
        rightContent.className = `timeline-content right`;
    
        const description = document.createElement('p');
        description.textContent = events[index].getDescription();
        const eventDate = document.createElement('p');
        eventDate.textContent = events[index].getDate();
    
        let imageContainer = null;
        if (events[index].getPicture()) {
            imageContainer = document.createElement('div');
            imageContainer.className = 'timeline-image';
            imageContainer.style.backgroundImage =`url("../images/${events[index].getPicture()}")`;

            imageContainer.style.backgroundSize = 'cover';
            imageContainer.style.backgroundPosition = 'center';
            imageContainer.style.height = '200px';
        }
    
        // Swap image and text positions for every alternate index
        if (index % 2 === 0) {
            if (imageContainer) leftContent.appendChild(imageContainer);
            rightContent.appendChild(eventDate);
            rightContent.appendChild(description);
        } else {
            if (imageContainer) rightContent.appendChild(imageContainer);
            leftContent.appendChild(eventDate);
            leftContent.appendChild(description);
        }
    
        section.appendChild(leftContent);
        section.appendChild(rightContent);
        timeline.appendChild(section);
    });
    
    
    // Insert timeline into the page
    document.querySelector('.wrapper.style5').appendChild(dateContainer);
    document.querySelector('.wrapper.style5 .inner').appendChild(timeline);
});
