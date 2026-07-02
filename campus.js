/* ==========================
   FADE IN
========================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll(".fade").forEach(el => observer.observe(el));

/* ==========================
   LOAD OPEN CAMPUS SCHEDULE
========================== */

async function loadSchedule() {

    try {

        const response = await fetch("schedule.json");

        const events = await response.json();

        const today = new Date();

        today.setHours(0,0,0,0);

        /* ==========================
           次回開催
        ========================== */

        const nextEvent = events.find(event => {

            return new Date(event.date) >= today;

        });

        if(nextEvent){

            const d = new Date(nextEvent.date);

            const options = {
                month:"long",
                day:"numeric",
                weekday:"short"
            };

            const nextDate =
                document.getElementById("next-date");

            const nextTitle =
                document.getElementById("next-title");

            const nextTime =
                document.getElementById("next-time");

            if(nextDate){

                nextDate.textContent =
                d.toLocaleDateString("ja-JP",options);

            }

            if(nextTitle){

                nextTitle.textContent =
                nextEvent.title;

            }

            if(nextTime){

                nextTime.textContent =
                nextEvent.time;

            }

            /* ==========================
               あと何日
            ========================== */

            const diff =
            Math.ceil(

                (new Date(nextEvent.date)-today)

                /(1000*60*60*24)

            );

            const countdown =
            document.getElementById("countdown");

            if(countdown){

                countdown.textContent =
                `開催まで あと ${diff} 日`;

            }

        }

        /* ==========================
           全日程
        ========================== */

        const list =
        document.getElementById("schedule-list");

        if(list){

            list.innerHTML="";

            events.forEach(event=>{

    const eventDate = new Date(event.date);

    const diff = Math.ceil(

        (eventDate - today)

        /(1000*60*60*24)

    );

    const week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const weekDay = week[eventDate.getDay()];

// 開催日
const eventDate = new Date(event.date);
eventDate.setHours(0, 0, 0, 0);

// 今日
const today = new Date();
today.setHours(0, 0, 0, 0);

// 開催までの日数
const diff = Math.ceil(
    (eventDate - today) / (1000 * 60 * 60 * 24)
);

let status = "";
let badgeClass = "";
let cardClass = "";

// 開催終了
if (diff < 0) {

    status = "終了";
    badgeClass = "finished-badge";
    cardClass = "finished";

// 本日開催
} else if (diff === 0) {

    status = "本日開催";
    badgeClass = "today-badge";
    cardClass = "today";

// 開催30日前〜前日
} else if (diff <= 30) {

    status = "受付中";
    badgeClass = "accept-badge";
    cardClass = "coming";

// 開催31日前以上
} else {

    status = "準備中";
    badgeClass = "prepare-badge";
    cardClass = "prepare";

}

    if(event.type === "ナイト"){

        statusClass += " night";

    }

    list.innerHTML += `

    <div class="campus-card ${statusClass}">

        ${badge}

        <span class="campus-date">

            ${eventDate.getMonth()+1}/${eventDate.getDate()}
            （${weekDay}）

        </span>

        <div>

            <strong>

                ${event.title}

            </strong>

            <br>

            ${event.time}

        </div>

    </div>

    `;

});

        }

    }

    catch(error){

        console.error(error);

    }

}

loadSchedule();
