const artworks = [
  1, 2, 3, 4, 5, 6, 7
].map(num => ({
  title: `Work ${num}`,
  date: "2024",
  description: "Detailed description of this artwork goes here.",
  images: [
    `images/work${num}/img1.jpg`,
    `images/work${num}/img2.jpg`,
    `images/work${num}/img3.jpg`
  ]
}));

const gallery = document.getElementById("gallery");
const detailView = document.getElementById("detail-view");
const imagesContainer = detailView.querySelector(".images");
const descriptionContainer = detailView.querySelector(".description");

const closeButton = document.getElementById("close-detail");

closeButton.onclick = closeDetail;

function closeDetail() {
  detailView.classList.add("hidden");
  gallery.classList.remove("hidden");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !detailView.classList.contains("hidden")) {
    closeDetail();
  }
});

let currentIndex = 0;

/* BUILD GRID */
artworks.forEach((art, index) => {
  const item = document.createElement("div");
  item.className = "grid-item";
  item.innerHTML = `
    <img src="${art.images[0]}" alt="${art.title}">
    <div class="meta">
      <div>${art.title}</div>
      <div>${art.date}</div>
    </div>
  `;
  item.onclick = () => openDetail(index);
  gallery.appendChild(item);
});

/* OPEN DETAIL VIEW */
function openDetail(index) {
  currentIndex = index;
  gallery.classList.add("hidden");
  detailView.classList.remove("hidden");
  renderDetail();
}

/* RENDER DETAIL CONTENT */
function renderDetail() {
  const art = artworks[currentIndex];

  imagesContainer.innerHTML = "";
  art.images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    imagesContainer.appendChild(img);
  });

  descriptionContainer.innerHTML = `
    <h2>${art.title}</h2>
    <p><em>${art.date}</em></p>
    <p>${art.description}</p>
  `;
}

/* NAVIGATION */
document.querySelector(".prev").onclick = () => {
  currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
  renderDetail();
};

document.querySelector(".next").onclick = () => {
  currentIndex = (currentIndex + 1) % artworks.length;
  renderDetail();
};

