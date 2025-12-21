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

let currentIndex = 0;

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
}

function closeDetail() {
  history.pushState({}, "", "/");
  detailView.classList.add("hidden");
  gallery.classList.remove("hidden");
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
 * DEEP LINK SUPPORT
 ********************************/

window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  const index = artworks.findIndex(a => a.id === hash);
  if (index !== -1) openDetail(index);
});
