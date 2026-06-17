/* ==========================
   HAMBURGER MENU
========================== */

const menuBtn =
document.getElementById("menuBtn");

const nav =
document.getElementById("nav");

menuBtn.addEventListener("click",()=>{

nav.classList.toggle("active");

});

/* ==========================
   LOGO GLOW ON SCROLL
========================== */

const logo =
document.querySelector(".glow-logo");

window.addEventListener("scroll",()=>{

if(window.scrollY > 100){

logo.classList.add("active");

}else{

logo.classList.remove("active");

}

});

/* ==========================
   FADE IN SECTIONS
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
   STAR GENERATOR
========================== */

const stars =
document.getElementById("stars");

for(let i=0;i<200;i++){

const star =
document.createElement("div");

star.classList.add("star");

const size =
Math.random()*3+1;

star.style.width =
size + "px";

star.style.height =
size + "px";

star.style.left =
Math.random()*100 + "vw";

star.style.top =
Math.random()*100 + "vh";

star.style.animationDelay =
Math.random()*5 + "s";

stars.appendChild(star);

}

/* ==========================
   HEX PARTICLES
========================== */

const particles =
document.getElementById("particles");

for(let i=0;i<25;i++){

const hex =
document.createElement("div");

hex.classList.add("hex");

hex.style.left =
Math.random()*100 + "vw";

hex.style.top =
Math.random()*100 + "vh";

hex.style.animationDuration =
(15 + Math.random()*15) + "s";

hex.style.transform =
`scale(${0.5 + Math.random()})`;

particles.appendChild(hex);

}

/* ==========================
   SHOOTING STAR
========================== */

function createShootingStar(){

const star =
document.createElement("div");

star.classList.add("shooting-star");

star.style.left =
(window.innerWidth + 200) + "px";

star.style.top =
Math.random()*300 + "px";

document.body.appendChild(star);

setTimeout(()=>{

star.remove();

},2000);

}

setInterval(
createShootingStar,
6000
);

/* ==========================
   CURSOR GLOW
========================== */

const glow =
document.getElementById("cursor-glow");

document.addEventListener(
"mousemove",
(e)=>{

glow.style.left =
e.clientX + "px";

glow.style.top =
e.clientY + "px";

});

/* ==========================
   COUNTER ANIMATION
========================== */

const counters =
document.querySelectorAll(".counter");

const counterObserver =
new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter =
entry.target;

const target =
+counter.dataset.target;

let current = 0;

const increment =
target / 80;

const updateCounter = ()=>{

if(current < target){

current += increment;

counter.innerText =
Math.ceil(current);

requestAnimationFrame(
updateCounter
);

}else{

counter.innerText =
target;

}

};

updateCounter();

counterObserver.unobserve(counter);

}

});

},{
threshold:0.5
});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/* ==========================
   AUTO CLOSE MOBILE NAV
========================== */

document
.querySelectorAll("nav a")
.forEach(link=>{

link.addEventListener("click",()=>{

nav.classList.remove("active");

});

});

/* ==========================
   PARALLAX HERO
========================== */

window.addEventListener("scroll",()=>{

const scrolled =
window.scrollY;

const heroLogo =
document.querySelector(".hero-logo");

if(heroLogo){

heroLogo.style.transform =
`translateY(${scrolled * 0.1}px)`;

}

});

/* ==========================
   OPTIONAL PRELOADER
========================== */

// 将来ローディング画面を入れる場合はここに追加
console.log("KSEC 1st Loaded 🚀");
