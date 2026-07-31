/* ==========================================================
                    CONFIG
========================================================== */

const CONFIG = {
  pin: "111111",

  birthday: "2026-07-29T00:00:00",

  typingSpeed: 35,

  letter: `

halloo sayangkuu happppy girlfriend dayyyy yaaaaaaa 💝💐 akuu mau bilang kalau aku bersyukur bangettt punya kamuu, kamuu orang baik yang bisaa menerima akuuu, 
padahal kitaa baruu kenall tanpaa sengaja tapii udaaa bikin kamu kesel, nangis, pokoknya kamu terbaik, maapin aku yaaa ga bisa apaaa" 
buatt kamu tapi gapapa aku akan usahain teruss untuk bisa bahagiain kamu aku pasti bisaa, pokoknya aku udaa bisaa bersyukur dengan apa 
yang kamu kasih ke aku mauu apapun ituu akuu senang poll bisaa kenal sama kamu 🩷🫶 maapp yaaa kalau aku adaa salah sama kamuu sering buat 
kamuu ngga mood, and apapun keadaan nya jangan jadiin alasan buat kita berpisah, okeyyyy.semogaa kedepannya kitaa bisaa Samaa-samaa teruss yaaa, 
membuat kamu bahagia and ga akan ngecewain kamu, mauuu ngucapin terimakasih poll udahh hadir di hidup nyaa akuu🫶,happy girlfriend day sayangg kuuu🫶🤍🤍

Happy Birthday ❤️

    `,

  playlist: [
    // lagu 1
    {
      title: "Shape Of My Heart",

      artist: "Sting",

      cover: "assets/images/pict 2.jpg",

      src: "assets/music/of my heart.mp3",
    },
  ],
};

// ==========================================================
//                    OPTIMASI HP
// ==========================================================

const isMobile = window.innerWidth <= 768;

if (isMobile) {
  document.documentElement.style.scrollBehavior = "smooth";
}

/* ==========================================================
                    DOM
========================================================== */

const loader = document.querySelector(".loader");

const pinPage = document.querySelector(".pin-page");

const pinDots = document.querySelectorAll(".pin-dots span");

const pinPad = document.getElementById("pinPad");

const pinError = document.getElementById("pinError");

const app = document.getElementById("app");

const audio = document.getElementById("audioPlayer");

const playBtn = document.getElementById("play");

const cover = document.getElementById("cover");

const songTitle = document.getElementById("songTitle");

const songArtist = document.getElementById("songArtist");

const progressFill = document.getElementById("progressFill");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const typingText = document.getElementById("typingText");

const envelope = document.getElementById("envelope");

const openEnvelope = document.getElementById("openEnvelope");

/* ==========================================================
                    LOADER
========================================================== */

window.addEventListener("load", () => {
  document.body.classList.add("lock");

  app.style.display = "none";

  pinPage.style.display = "none";

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.remove();

      pinPage.style.display = "flex";

      requestAnimationFrame(() => {
        pinPage.classList.add("show");
      });
    }, 600);
  }, 2200);
});

/* ==========================================================
                    PIN
========================================================== */

let pinValue = "";

const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"];

buttons.forEach((item) => {
  const btn = document.createElement("button");

  btn.textContent = item;

  pinPad.appendChild(btn);
});

pinPad.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const value = e.target.textContent;

  if (value === "") return;

  if (value === "⌫") {
    pinValue = pinValue.slice(0, -1);
  } else if (pinValue.length < 6) {
    pinValue += value;
  }

  updateDots();
});

function updateDots() {
  pinDots.forEach((dot, index) => {
    dot.style.background = index < pinValue.length ? "white" : "rgba(255,255,255,.15)";
  });

  if (pinValue.length === 6) {
    checkPin();
  }
}

function checkPin() {
  if (pinValue === CONFIG.pin) {
    successEffect();
  } else {
    pinError.style.opacity = "1";

    pinPage.classList.add("shake");

    navigator.vibrate?.(250);

    setTimeout(() => {
      pinValue = "";

      updateDots();

      pinError.style.opacity = "0";

      pinPage.classList.remove("shake");
    }, 700);
  }
}

function successEffect() {
  const flash = document.createElement("div");

  flash.className = "success-flash";

  document.body.appendChild(flash);

  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");

    heart.className = "heart-particle";

    heart.innerHTML = "❤";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.setProperty(
      "--x",

      Math.random() * 300 - 150 + "px",
    );

    heart.style.animationDelay = Math.random() * 0.6 + "s";

    heart.style.fontSize = 18 + Math.random() * 18 + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }

  setTimeout(() => {
    flash.remove();
  }, 700);

  pinPage.classList.add("hide");

  pinPage.classList.remove("show");

  setTimeout(() => {
    pinPage.style.display = "none";

    document.body.classList.remove("lock");

    app.style.display = "block";

    requestAnimationFrame(() => {
      app.classList.add("show");
    });
  }, 700);
}

/* ==========================================================
                    MUSIC
========================================================== */

let currentSong = 0;

audio.src = CONFIG.playlist[currentSong].src;

cover.src = CONFIG.playlist[currentSong].cover;

songTitle.textContent = CONFIG.playlist[currentSong].title;

songArtist.textContent = CONFIG.playlist[currentSong].artist;

let playing = false;

playBtn.onclick = () => {
  if (!playing) {
    audio.play();

    playing = true;

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

    cover.style.animation = "spin 12s linear infinite";
  } else {
    audio.pause();

    playing = false;

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

    cover.style.animation = "";
  }
};

/* ==========================================================
                    PROGRESS
========================================================== */

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;

  progressFill.style.width = percent + "%";

  currentTime.textContent = format(audio.currentTime);

  duration.textContent = format(audio.duration);
});

function format(time) {
  if (isNaN(time)) return "00:00";

  const min = Math.floor(time / 60);

  const sec = Math.floor(time % 60);

  return String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
}

/* ==========================================================
                    LETTER
========================================================== */

openEnvelope.onclick = () => {
  envelope.classList.add("open");

  typeLetter();
};

let typed = false;

function typeLetter() {
  if (typed) return;

  typed = true;

  let i = 0;

  const interval = setInterval(() => {
    typingText.innerHTML += CONFIG.letter.charAt(i);

    i++;

    if (i >= CONFIG.letter.length) {
      clearInterval(interval);
    }
  }, CONFIG.typingSpeed);
}
/* ==========================================================
                    COUNTDOWN
========================================================== */

const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

function updateCountdown() {
  const target = new Date(CONFIG.birthday).getTime();

  const now = Date.now();

  const distance = target - now;

  if (distance <= 0) {
    dayEl.textContent = "00";
    hourEl.textContent = "00";
    minuteEl.textContent = "00";
    secondEl.textContent = "00";

    launchConfetti();

    return;
  }

  const days = Math.floor(distance / 86400000);

  const hours = Math.floor((distance % 86400000) / 3600000);

  const minutes = Math.floor((distance % 3600000) / 60000);

  const seconds = Math.floor((distance % 60000) / 1000);

  dayEl.textContent = String(days).padStart(2, "0");
  hourEl.textContent = String(hours).padStart(2, "0");
  minuteEl.textContent = String(minutes).padStart(2, "0");
  secondEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);

/* ==========================================================
                    LIGHTBOX
========================================================== */

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");

const nextImage = document.getElementById("nextImage");

const prevImage = document.getElementById("prevImage");

const photos = [...document.querySelectorAll(".polaroid img")];

let currentImage = 0;

photos.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentImage = index;

    showImage();
  });
});

function showImage() {
  lightbox.classList.add("active");

  lightboxImage.src = photos[currentImage].src;
}

closeLightbox.onclick = () => {
  lightbox.classList.remove("active");
};

nextImage.onclick = () => {
  currentImage++;

  if (currentImage >= photos.length) {
    currentImage = 0;
  }

  showImage();
};

prevImage.onclick = () => {
  currentImage--;

  if (currentImage < 0) {
    currentImage = photos.length - 1;
  }

  showImage();
};

lightbox.onclick = (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
};

/* ==========================================================
                    SCROLL REVEAL
========================================================== */

const revealItems = document.querySelectorAll(".hero,.music,.letter,.timeline,.gallery,.reasons,.countdown,.ending");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealItems.forEach((item) => {
  item.classList.add("hidden");

  observer.observe(item);
});

/* ==========================================================
                    MOBILE MENU
========================================================== */

const menuButton = document.getElementById("menu");

const navMenu = document.querySelector(".navbar ul");

menuButton.onclick = () => {
  navMenu.classList.toggle("active");
};

/* ==========================================================
                    SMOOTH NAVIGATION
========================================================== */

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }

    navMenu.classList.remove("active");
  });
});

/* ==========================================================
                    FLOATING PARALLAX
========================================================== */

if (!isMobile) {
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;

    const y = e.clientY / window.innerHeight;

    document.querySelectorAll(".orb").forEach((orb, index) => {
      const speed = (index + 1) * 20;

      orb.style.transform = `translate(${x * speed}px,${y * speed}px)`;
    });
  });
}

/* ==========================================================
                    MUSIC NEXT / PREV
========================================================== */

const nextSong = document.getElementById("next");

const prevSong = document.getElementById("prev");

function loadSong(index) {
  currentSong = index;

  const song = CONFIG.playlist[currentSong];

  audio.src = song.src;

  cover.src = song.cover;

  songTitle.textContent = song.title;

  songArtist.textContent = song.artist;

  if (playing) {
    audio.play();
  }
}

nextSong.onclick = () => {
  currentSong++;

  if (currentSong >= CONFIG.playlist.length) {
    currentSong = 0;
  }

  loadSong(currentSong);
};

prevSong.onclick = () => {
  currentSong--;

  if (currentSong < 0) {
    currentSong = CONFIG.playlist.length - 1;
  }

  loadSong(currentSong);
};

audio.onended = () => {
  nextSong.click();
};

/* ==========================================================
                    CONFETTI
========================================================== */

function launchConfetti() {
  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("span");

    confetti.className = "confetti";

    confetti.style.left = Math.random() * 100 + "vw";

    confetti.style.animationDelay = Math.random() * 3 + "s";

    confetti.style.background = `hsl(${Math.random() * 360},90%,75%)`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 7000);
  }
}

/* ==========================================================
                    HERO IMAGE EFFECT
========================================================== */

const heroImage = document.querySelector(".photo-frame");

if (!isMobile) {
  window.addEventListener("mousemove", (e) => {
    const rotateY = (e.clientX / window.innerWidth - 0.5) * 12;

    const rotateX = (e.clientY / window.innerHeight - 0.5) * -12;

    heroImage.style.transform = `perspective(1200px)

        rotateX(${rotateX}deg)

        rotateY(${rotateY}deg)`;
  });
}

/* ==========================================================
                    KEYBOARD PIN
========================================================== */

document.addEventListener("keydown", (e) => {
  if (!pinPage) return;

  if (/[0-9]/.test(e.key)) {
    if (pinValue.length < 6) {
      pinValue += e.key;

      updateDots();
    }
  }

  if (e.key === "Backspace") {
    pinValue = pinValue.slice(0, -1);

    updateDots();
  }
});

/* ==========================================================
                    COPYRIGHT
========================================================== */

console.clear();

console.log(
  "%cMade with ❤️",

  "font-size:22px;color:#ff8fb8;font-weight:bold",
);

console.log("Birthday Website - Premium Edition");

/* ==========================================================
                MOUSE GLOW EFFECT
========================================================== */

const blobs = document.querySelectorAll(".blob");

if (!isMobile) {
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;

    const y = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 25;

      blob.style.transform = `translate(

            ${x * speed}px,

            ${y * speed}px

            )`;
    });
  });
}
