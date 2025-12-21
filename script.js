const artworks = [
  {
    title: "Untitled #1",
    date: "2024",
    description: "This work explores texture and repetition...",
    images: [
      "images/work1/img1.jpg",
      "images/work1/img2.jpg",
      "images/work1/img3.jpg"
    ]
  },
  {
    title: "Blue Study",
    date: "2023",
    description: "An investigation into blue pigment and light.",
    images: [
      "images/work2/img1.jpg",
      "images/work2/img2.jpg"
    ]
  }
];

const gallery = document.getElementById("gallery");
const detailView = document.getElementById("detail-view");
const imagesContainer = detailView.querySelector(".images");
const descriptionContainer = detailView.querySelector(".description");

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
