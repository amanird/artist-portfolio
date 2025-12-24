/********************************
 * ARTWORK DATA
 ********************************/

const artworks = [
  {
    id: "work1",
    title: "Work One",
    date: "2024",
    description: "Description for Work One.",
    images: ["img1.jpg", "img2.jpg", "img3.jpg"]
  },
  {
    id: "work2",
    title: "Work Two",
    date: "2024",
    description: "Description for Work Two.",
    images: ["img1.jpg", "img2.jpg", "img3.jpg"]
  },
  {
    id: "work3",
    title: "Work Three",
    date: "2023",
    description: "Description for Work Three.",
    images: ["img1.jpg", "img2.jpg", "img3.jpg"]
  },
  {
    id: "work4",
    title: "Work Four",
    date: "2023",
    description: "Description for Work Four.",
    images: ["img1.jpg", "img2.jpg", "img3.jpg"]
  },
  {
    id: "work5",
    title: "Work Five",
    date: "2022",
    description: "Description for Work Five.",
    images: ["img1.jpg", "img2.jpg", "img3.jpg"]
  },
  {
    id: "work6",
    title: "Work Six",
    date: "2022",
    description: "Description for Work Six.",
    images: ["img1.jpg", "img2.jpg", "img3.jpg"]
  },
  {
    id: "work7",
    title: "Work Seven",
    date: "2021",
    description: "Description for Work Seven.",
    images: ["img1.jpg", "img2.jpg", "img3.jpg"]
  }
];

/********************************
 * DOM REFERENCES
 ********************************/

const gallery = document.getElementById("gallery");
const detailView = document.getElementById("detail-view");
const imagesContainer = document.querySelector(".detail-content .images");
const descriptionContainer = document.querySelector(".detail-content .description");
const closeButton = document.getElementById("close-detail");

const modeBtn = document.getElementById("mode-btn");
const modeMenu = document.getElementById("mode-menu");

let currentIndex = 0;

/* Absurd mode state */
let currentMode = "light";
let rainInterval = null;
let rainCount = 0;

/********************************
 * BUILD GALLERY GRID
 ********************************/

artworks.forEach((art, index) => {
  const item = document.createElement("figure");
  item.className = "grid-item";

  item.innerHTML = `
    <img src="images/${art.id}/${art.images[0]}" alt="${art.title}">
    <figcaption class="meta">
      <strong>${art.title}</strong><br>
      <span>${art.date}</span>
    </figcaption>
  `;

  item.addEventListener("click", () => openDetail(index));
  gallery.appendChild(item);
});

/********************************
 * DETAIL VIEW LOGIC
 ********************************/

function openDetail(index) {
  currentIndex = index;
  history.pushState({}, "", `#${artworks[index].id}`);

  gallery.classList.add("hidden");
  detailView.classList.remove("hidden");

  renderDetail();
  updateHomeState();
}

function closeDetail() {
  history.pushState({}, "", "/");

  detailView.classList.add("hidden");
  gallery.classList.remove("hidden");

  updateHomeState();
}

function renderDetail() {
  const art = artworks[currentIndex];

  imagesContainer.innerHTML = "";

  art.images.forEach(filename => {
    const img = document.createElement("img");
    img.src = `images/${art.id}/${filename}`;
    img.onload = () => img.classList.add("loaded");
    imagesContainer.appendChild(img);
  });

  descriptionContainer.innerHTML = `
    <h2>${art.title}</h2>
    <p><em>${art.date}</em></p>
    <p>${art.description}</p>
  `;
}

/********************************
 * NAVIGATION
 ********************************/

document.querySelector(".prev").onclick = () => {
  currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
  renderDetail();
};

document.querySelector(".next").onclick = () => {
  currentIndex = (currentIndex + 1) % artworks.length;
  renderDetail();
};

closeButton.onclick = closeDetail;

/********************************
 * KEYBOARD CONTROLS
 ********************************/

document.addEventListener("keydown", e => {
  if (detailView.classList.contains("hidden")) return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % artworks.length;
    renderDetail();
  }

  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    renderDetail();
  }

  if (e.key === "Escape") {
    closeDetail();
  }
});

/********************************
 * HOME STATE DETECTION
 ********************************/

function updateHomeState() {
  const onHome =
    detailView.classList.contains("hidden") &&
    !window.location.hash;

  document.body.classList.toggle("home", onHome);
}

/********************************
 * MODE MENU
 ********************************/

modeBtn.onclick = () => {
  modeMenu.classList.toggle("hidden");
};

document.addEventListener("click", e => {
  if (!modeBtn.contains(e.target)) {
    modeMenu.classList.add("hidden");
  }
});

document.querySelectorAll("[data-mode]").forEach(btn => {
  btn.onclick = () => setMode(btn.dataset.mode);
});

/********************************
 * MODE HANDLING
 ********************************/

function setMode(mode) {
  clearAbsurd();
  document.body.classList.remove("dark", "absurd");

  if (mode === "dark") {
    document.body.classList.add("dark");
  }

  if (mode === "absurd") {
    startAbsurdMode();
  }

  currentMode = mode;
}

/********************************
 * ABSURD MODE
 ********************************/

function startAbsurdMode() {
  document.body.classList.add("absurd");
  startRain();
  createAbsurdText();
}

function startRain() {
  const rainLayer = document.createElement("div");
  rainLayer.className = "absurd-rain";
  rainLayer.id = "absurd-rain";
  document.body.appendChild(rainLayer);

  rainCount = 0;

  rainInterval = setInterval(() => {
    spawnRaindrop(rainLayer);
    rainCount++;

    if (rainCount > 20) {
      document.body.classList.add("dark");
    }

    if (rainCount > 35) {
      clearInterval(rainInterval);
    }
  }, 150);
}

function spawnRaindrop(layer) {
  const drop = document.createElement("div");
  drop.className = "raindrop";

  drop.style.left = Math.random() * 100 + "vw";
  drop.style.top = Math.random() * 100 + "vh";

  layer.appendChild(drop);

  drop.addEventListener("animationend", () => drop.remove());
}

function createAbsurdText() {
  const layer = document.createElement("div");
  layer.className = "absurd-layer";
  layer.id = "absurd-layer";

  const phrases = [
    "You are absurd.",
    "You are not well.",
    "This feels familiar.",
    "You already noticed.",
    "Nothing is wrong.",
    "Why are you still here?",
    "أنت سخيف",
    "أنت لست بخير.",
    "هذا يبدو مألوفا.",
    "لقد لاحظت ذلك بالفعل.",
    "لا يوجد شيء خاطئ.",
    "لماذا ما زلت هنا؟",
    "Почему ты всё ещё здесь?",
    "Всё в порядке.",
    "Ты уже заметил.",
    "Это кажется знакомым.",
    "Ты плохо себя чувствуешь",
    "Ты абсурден.",
    "Du bist absurd.",
    "Dir geht es nicht gut.",
    "Das kommt mir bekannt vor.",
    "Du wirst bemerkt.",
    "Es ist alles in Ordnung.",
    "Warum bist du noch hier?",
    "お前は馬鹿げている。",
    "お前は正気じゃない。",
    "この感覚、どこかで覚えている。",
    "お前は気づかれている。",
    "何も問題はない。",
    "なぜまだここにいる？",
    "Você é absurdo.",
    "Você não está bem.",
    "Isso parece familiar. ",
    "Você está a ser observado.",
    "Não há nada de errado.",
    "Por que ainda está aqui?",
    "你荒謬至極。",
    "你状态不佳。",
    "这感觉似曾相识。",
    "你已被察觉。",
    "一切正常。",
    "你为何仍在此处？",
    "Tu es absurde.",
    "Tu ne vas pas bien.",
    "Cela me semble familier. ",
    "On t'a remarqué.",
    "Tout va bien.",
    "Pourquoi es-tu encore là ?",
    "Katawa-tawa ka.",
    "Hindi ka ayos.",
    "Pamilyar ang pakiramdam na ito.",
    "Napapansin ka.",
    "Walang mali.",
    "Bakit ka pa rin nandito?",
    "Ти абсурдний.",
    "Ти не в порядку.",
    "Це здається знайомим. ",
    "Нічого страшного.",
    "Чому ти все ще тут?"
  ];

  for (let i = 0; i < 100; i++) {
    const span = document.createElement("div");
    span.className = "absurd-text";
    span.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    span.style.top = Math.random() * 100 + "vh";
    span.style.fontSize = 0.7 + Math.random() * 1.4 + "rem";
    span.style.animationDuration = 10 + Math.random() * 5 + "s";
    layer.appendChild(span);
  }

  document.body.appendChild(layer);
}

// function createAbsurdText() {
//   const layer = document.createElement("div");
//   layer.className = "absurd-layer";
//   layer.id = "absurd-layer";

//   const fonts = [
//     "Archivo Black",
//     "IBM Plex Mono",
//     "Libre Baskerville",
//     "Orbitron",
//     "Playfair Display",
//     "Rubik Glitch",
//     "Space Grotesk",
//     "VT323",
//     "Zilla Slab"
//   ];

//   const phrases = [
//     "You are absurd.",
//     "You are not well.",
//     "This feels familiar.",
//     "You already noticed.",
//     "Nothing is wrong.",
//     "Why are you still here?",
//     "أنت سخيف",
//     "أنت لست بخير.",
//     "هذا يبدو مألوفا.",
//     "لقد لاحظت ذلك بالفعل.",
//     "لا يوجد شيء خاطئ.",
//     "لماذا ما زلت هنا؟",
//     "Почему ты всё ещё здесь?",
//     "Всё в порядке.",
//     "Ты уже заметил.",
//     "Это кажется знакомым.",
//     "Ты плохо себя чувствуешь",
//     "Ты абсурден.",
//     "Du bist absurd.",
//     "Dir geht es nicht gut.",
//     "Das kommt mir bekannt vor.",
//     "Du wirst bemerkt.",
//     "Es ist alles in Ordnung.",
//     "Warum bist du noch hier?",
//     "お前は馬鹿げている。",
//     "お前は正気じゃない。",
//     "この感覚、どこかで覚えている。",
//     "お前は気づかれている。",
//     "何も問題はない。",
//     "なぜまだここにいる？",
//     "Você é absurdo.",
//     "Você não está bem.",
//     "Isso parece familiar. ",
//     "Você está a ser observado.",
//     "Não há nada de errado.",
//     "Por que ainda está aqui?",
//     "你荒謬至極。",
//     "你状态不佳。",
//     "这感觉似曾相识。",
//     "你已被察觉。",
//     "一切正常。",
//     "你为何仍在此处？",
//     "Tu es absurde.",
//     "Tu ne vas pas bien.",
//     "Cela me semble familier. ",
//     "On t'a remarqué.",
//     "Tout va bien.",
//     "Pourquoi es-tu encore là ?",
//     "Katawa-tawa ka.",
//     "Hindi ka ayos.",
//     "Pamilyar ang pakiramdam na ito.",
//     "Napapansin ka.",
//     "Walang mali.",
//     "Bakit ka pa rin nandito?",
//     "Ти абсурдний.",
//     "Ти не в порядку.",
//     "Це здається знайомим. ",
//     "Нічого страшного.",
//     "Чому ти все ще тут?"
//   ];

//   const count = 100;

//   for (let i = 0; i < count; i++) {
//     const span = document.createElement("div");
//     span.className = "absurd-text";
//     span.style.transform = `translateZ(${Math.random() * -300}px)`;
    
//     span.textContent =
//       phrases[Math.floor(Math.random() * phrases.length)];

//     span.style.top = Math.random() * 100 + "vh";
//     span.style.fontFamily =
//       fonts[Math.floor(Math.random() * fonts.length)];

//     span.style.fontSize =
//       0.8 + Math.random() * 1.2 + "rem";

//     span.style.animationDuration =
//        + Math.random() * 40 + "s";

//     span.style.animationDelay =
//       -Math.random() * 40 + "s";

//     layer.appendChild(span);
//   }

//   document.body.appendChild(layer);
// }


function clearAbsurd() {
  clearInterval(rainInterval);

  const rain = document.getElementById("absurd-rain");
  if (rain) rain.remove();

  const text = document.getElementById("absurd-layer");
  if (text) text.remove();

  document.body.classList.remove("absurd", "dark");
}

/********************************
 * DEEP LINK SUPPORT
 ********************************/

window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  const index = artworks.findIndex(a => a.id === hash);
  if (index !== -1) openDetail(index);
});

/********************************
 * GLOBAL EVENT SYNC
 ********************************/

window.addEventListener("popstate", updateHomeState);
window.addEventListener("load", updateHomeState);
