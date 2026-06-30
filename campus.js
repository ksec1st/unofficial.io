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

    const week = ["日","月","火","水","木","金","土"];

    const weekDay = week[eventDate.getDay()];

    let statusClass = "";
    let badge = "";

    if(diff < 0){

        statusClass = "finished";

        badge = `
        <span class="status finished-badge">
            終了
        </span>`;

    }

    else if(diff === 0){

        statusClass = "today";

        badge = `
        <span class="status today-badge">
            本日開催
        </span>`;

    }

    else if(diff <= 7){

        statusClass = "coming";

        badge = `
        <span class="status accept-badge">
            準備中
        </span>`;

    }

    else{

        badge = `
        <span class="status accept-badge">
            受付中
        </span>`;

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
