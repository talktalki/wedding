const photos = Array.from(
  { length: 36 },
  (_, i) => `images/Studio-${i + 1}.webp`,
);
let currentIndex = 0;

// Generate thumbnails and gallery images
const thumbnailsDiv = document.querySelector(".thumbnails");
const galleryDiv = document.querySelector(".grid-gallery");

photos.forEach((photo, index) => {
  // Thumbnails for mobile
  const thumbImg = document.createElement("img");
  thumbImg.src = photo;
  thumbImg.alt = `Thumbnail ${index + 1}`;
  thumbImg.loading = "lazy";
  thumbImg.onclick = () => showPhoto(index);
  if (index === 0) thumbImg.classList.add("active");
  thumbnailsDiv.appendChild(thumbImg);

  // Desktop gallery images
  const galleryImg = document.createElement("img");
  galleryImg.src = photo;
  galleryImg.alt = `Gallery Photo ${index + 1}`;
  galleryImg.loading = "lazy";
  galleryDiv.appendChild(galleryImg);
});

// Show photo in mobile gallery
function showPhoto(index) {
  const mainPhoto = document.getElementById("current-photo");
  const thumbnails = document.querySelectorAll(".thumbnails img");

  currentIndex = index;
  mainPhoto.src = photos[index];
  thumbnails.forEach((thumb, i) =>
    thumb.classList.toggle("active", i === index),
  );
}

// Change photo in mobile gallery
function changePhoto(direction) {
  currentIndex = (currentIndex + direction + photos.length) % photos.length;
  showPhoto(currentIndex);
}

// Preload images for caching
function preloadImages() {
  photos.forEach((photo) => {
    const img = new Image();
    img.src = photo;
  });
}

// Preload images on window load
window.onload = preloadImages;
