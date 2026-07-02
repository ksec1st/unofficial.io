/* ==========================
   FADE IN
========================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(".fade").forEach(el=>{

    observer.observe(el);

});


/* ==========================
   OPEN CAMPUS SCHEDULE
========================== */

async function loadSchedule(){

    try{

        const response = await fetch("schedule.json");
        const events = await response.json();

        const today = new Date();
        today.setHours(0,0,0,0);


        /* ==========================
           NEXT EVENT
        ========================== */

        const nextEvent = events.find(event=>{

            const d = new Date(event.date);
            d.setHours(0,0,0,0);

            return d >= today;

        });

        if(nextEvent){

            const d = new Date(nextEvent.date);

            const option={

                month:"long",
                day:"numeric",
                weekday:"short"

            };

            const nextDate=document.getElementById("next-date");
            const nextTitle=document.getElementById("next-title");
            const nextTime=document.getElementById("next-time");
            const countdown=document.getElementById("countdown");

            if(nextDate){

                nextDate.textContent=
                d.toLocaleDateString("ja-JP",option);

            }

            if(nextTitle){

                nextTitle.textContent=
                nextEvent.title;

            }

            if(nextTime){

                nextTime.textContent=
                nextEvent.time;

            }

            const diff=Math.ceil(

                (d-today)/(1000*60*60*24)

            );

            if(countdown){

                countdown.textContent=
                "開催まで あと "+diff+"日";

            }

        }


        /* ==========================
           SCHEDULE LIST
        ========================== */

        const list=
        document.getElementById("schedule-list");

        if(!list) return;

        list.innerHTML="";

        events.forEach(event=>{

            const eventDate=new Date(event.date);
            eventDate.setHours(0,0,0,0);

            const diff=Math.ceil(

                (eventDate-today)/(1000*60*60*24)

            );

            const week=[
                "日",
                "月",
                "火",
                "水",
                "木",
                "金",
                "土"
            ];

            const weekDay=
            week[eventDate.getDay()];

            let status="";
            let badgeClass="";
            let cardClass="";

            if(diff<0){

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

                cardClass+=" night";

            }


            let countText="";

            if(diff>0){

                countText=
                "開催まで あと "+diff+"日";

            }

            else if(diff===0){

                countText=
                "本日開催";

            }

            else{

                countText=
                "開催終了";

            }


            list.innerHTML+=`

            <div class="campus-card ${cardClass}">

                <span class="status ${badgeClass}">
                    ${status}
                </span>

                <div class="campus-date">
                    ${eventDate.getMonth()+1}/${eventDate.getDate()}（${weekDay}）
                </div>

                <strong>
                    ${event.title}
                </strong>

                <div>
                    ${event.time}
                </div>

                <div class="countdown">
                    ${countText}
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
