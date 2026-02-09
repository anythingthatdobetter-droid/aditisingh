// SVG HEART ANIMATION USING d3 and GSAP
var paper = d3.select("#canvas");
var wsvg = $("#canvas").width();
var hsvg = $("#canvas").height();

var d = Math.ceil((Math.floor(Math.random() * 700) + 100) / 10) * 10;
var count = 0;

function rNumTime() {
  d = Math.ceil((Math.floor(Math.random() * 600) + 100) / 10) * 10;
}

setInterval(function () {
  count++;
  var x = Math.floor(Math.random() * (wsvg - 100)) + 50;
  var y = Math.floor(Math.random() * (hsvg - 100)) + 50;

  paper
    .append("use")
    .attr("xlink:href", "#heart")
    .attr("id", "h" + count)
    .attr("transform", "translate(" + x + ", " + y + ")");

  setTimeLine();
  rNumTime();
}, d);

function setTimeLine() {
  var s = (Math.random() * (0.7 - 0.2) + 0.5).toFixed(1);
  var heart = $("#h" + count);

  var tl = new TimelineMax({ repeat: 1, yoyo: true });

  tl.from(heart, 0.7, { scale: 0, transformOrigin: "50% 50%" })
    .to(heart, 0.7, { scale: s, transformOrigin: "50% 50%" })
    .to(heart, 0.3, { scale: 1, transformOrigin: "50% 50%", opacity: 0 });

  setTimeout(function () {
    remove(heart);
  }, 1700);
}

function remove(h) {
  h.remove();
}

$(window).on("resize", function () {
  wsvg = $("#canvas").width();
  hsvg = $("#canvas").height();
});

// BUTTON LOGIC (No runs away, Yes grows)
document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn  = document.getElementById("noBtn");

  const topMedia  = document.getElementById("topMedia");
  const gifWrap   = document.getElementById("gifWrap");
  const smallText = document.getElementById("smallText");

  if (!yesBtn || !noBtn) return;

  let noHoverCount = 0;
  let tenorLoaded = false;

  function loadTenorScriptOnce(){
    if (tenorLoaded) return;
    tenorLoaded = true;

    const s = document.createElement("script");
    s.src = "https://tenor.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }

  function moveNoButton(){
    const padding = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const x = Math.random() * (maxX - padding) + padding;
    const y = Math.random() * (maxY - padding) + padding;

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top  = y + "px";
    noBtn.style.zIndex = "2000";
    yesBtn.style.zIndex = "2000";
  }

  function makeYesBigger(){
    const current = parseFloat(getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (current + 2) + "px";
  }

  function triggerGifMode(){
    // hide the top image and show gif + small text
    if (topMedia) topMedia.style.display = "none";
    if (gifWrap) gifWrap.style.display = "block";
    if (smallText) smallText.style.display = "inline-block";

    loadTenorScriptOnce();
  }

  // Use mouseenter so it triggers reliably
  noBtn.addEventListener("mouseenter", () => {
    noHoverCount++;

    moveNoButton();
    makeYesBigger();

    if (noHoverCount >= 2) {
      triggerGifMode();
    }
  });
});

const yesBtn = document.getElementById("yesBtn");
const yesSound = document.getElementById("yesSound");
const reactionImg = document.getElementById("reactionImg");

yesBtn.addEventListener("click", () => {

    // play sound
    yesSound.currentTime = 0;
    yesSound.play();

    // show new image
    reactionImg.style.display = "block";

    // continuous flying hearts
    for(let i=0;i<40;i++){
        setTimeout(createHeart, i*120);
    }
});

function createHeart(){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";

    heart.style.left = Math.random()*100 + "vw";
    heart.style.fontSize = (20 + Math.random()*30) + "px";

    document.body.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },5000);
}
