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

            const d = new Date(event.date);
            d.setHours(0,0,0,0);

            return d >= today;

        });

        if(nextEvent){

            const d = new Date(nextEvent.date);

            const option = {

                month:"long",
                day:"numeric",
                weekday:"short"

            };

            document.getElementById("next-date").textContent =
            d.toLocaleDateString("ja-JP",option);

            document.getElementById("next-title").textContent =
            nextEvent.title;

            document.getElementById("next-time").textContent =
            nextEvent.time;

            const diff = Math.ceil(

                (d - today) /

                (1000*60*60*24)

            );

            document.getElementById("countdown").textContent =

            `開催まで あと ${diff} 日`;

        }

        /* ==========================
           全日程
        ========================== */

        const list =
        document.getElementById("schedule-list");

        if(!list) return;

        list.innerHTML="";

        events.forEach(event=>{

            const eventDate = new Date(event.date);
            eventDate.setHours(0,0,0,0);

            const diff = Math.ceil(

                (eventDate - today)

                /(1000*60*60*24)

            );

            let status="";
            let badgeClass="";
            let cardClass="";

            // =====================
            // ステータス
            // =====================

            if(diff < 0){

                status="終了";
                badgeClass="finished-badge";
                cardClass="finished";

            }

            else if(diff===0){

                status="本日開催";
                badgeClass="today-badge";
                cardClass="today";

            }

            else if(diff<=30){

                status="受付中";
                badgeClass="accept-badge";
                cardClass="coming";

            }

            else{

                status="準備中";
                badgeClass="prepare-badge";
                cardClass="prepare";

            }

            if(event.type==="ナイト"){

                cardClass += " night";

            }

            const badge =

            `<span class="status ${badgeClass}">
                ${status}
            </span>`;

            const week =

            ["日","月","火","水","木","金","土"];

            list.innerHTML +=

            `
            <div class="campus-card ${cardClass}">

                ${badge}

                <span class="campus-date">

                    ${eventDate.getMonth()+1}月
                    ${eventDate.getDate()}日
                    (${week[eventDate.getDay()]})

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

    catch(error){

        console.error(error);

    }

}

loadSchedule();
