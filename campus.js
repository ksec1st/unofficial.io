/* ==========================
   FADE IN
========================== */

const observer =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document
.querySelectorAll(".fade")
.forEach(el=>observer.observe(el));

/* ==========================
   SMOOTH SCROLL
========================== */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/* ==========================
   FAQ OPEN ANIMATION
========================== */

document
.querySelectorAll(".faq details")
.forEach(item=>{

    item.addEventListener("toggle",()=>{

        if(item.open){

            item.style.boxShadow =
            "0 0 25px rgba(46,168,230,.3)";

        }else{

            item.style.boxShadow =
            "none";

        }

    });

});

/* ==========================
   PAGE LOADED
========================== */

console.log("Open Campus Loaded 🎮");

/* ==========================
   Date
========================== */

async function loadSchedule(){

    const response = await fetch("schedule.json");

    const events = await response.json();

    const today = new Date();

    today.setHours(0,0,0,0);

    const next = events.find(event=>{

        return new Date(event.date)>=today;

    });

    if(next){

        const d = new Date(next.date);

        document.getElementById("next-date").textContent =
            `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;

        document.getElementById("next-title").textContent =
            next.title;

        document.getElementById("next-time").textContent =
            next.time;

    }

    const list =
    document.getElementById("schedule-list");

    list.innerHTML="";

    events.forEach(event=>{

        const d =
        new Date(event.date);

        list.innerHTML += `

        <div class="campus-card">

            <span class="campus-date">

                ${d.getMonth()+1}/${d.getDate()}

            </span>

            <div>

                <strong>${event.title}</strong><br>

                ${event.time}

            </div>

        </div>

        `;

    });

}

loadSchedule();
