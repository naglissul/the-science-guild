// Fills every <div id="photos-<id>"> with thumbnails of images/<id>-<order>.jpg
// (order starts at 1 and stops at the first missing file) and opens a
// lightbox with prev/next navigation on click.

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function findPhotos(id) {
  const photos = [];
  for (let order = 1; ; order++) {
    const src = `images/${id}-${order}.jpg`;
    if (!(await loadImage(src))) break;
    photos.push(src);
  }
  return photos;
}

function createLightbox() {
  const modal = document.createElement("div");
  modal.className = "lightbox";
  modal.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous">&#10094;</button>
    <img class="lightbox-image" alt="" />
    <button class="lightbox-next" aria-label="Next">&#10095;</button>
    <div class="lightbox-counter"></div>
  `;
  document.body.appendChild(modal);

  const image = modal.querySelector(".lightbox-image");
  const counter = modal.querySelector(".lightbox-counter");
  let photos = [];
  let index = 0;

  function show(i) {
    index = (i + photos.length) % photos.length;
    image.src = photos[index];
    counter.textContent = `${index + 1} / ${photos.length}`;
    const single = photos.length < 2;
    modal.querySelector(".lightbox-prev").hidden = single;
    modal.querySelector(".lightbox-next").hidden = single;
  }

  function close() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  modal.querySelector(".lightbox-prev").addEventListener("click", () => show(index - 1));
  modal.querySelector(".lightbox-next").addEventListener("click", () => show(index + 1));
  modal.querySelector(".lightbox-close").addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
  });

  return {
    open(list, i) {
      photos = list;
      show(i);
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    },
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll('[id^="photos-"]');
  if (!containers.length) return;
  const lightbox = createLightbox();

  containers.forEach(async (container) => {
    const id = container.id.slice("photos-".length);
    const photos = await findPhotos(id);
    if (!photos.length) return;

    container.classList.add("photo-gallery");
    photos.forEach((src, i) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = `Photo ${i + 1}`;
      thumb.loading = "lazy";
      thumb.className = "photo-thumb";
      thumb.addEventListener("click", () => lightbox.open(photos, i));
      container.appendChild(thumb);
    });
  });
});
