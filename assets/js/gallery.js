const cdnLinks = [
    "ZzPW1tsN/Studio-27.jpg",
    "Kk9nBv6/Studio-26.jpg",
    "cXcWy1mk/Studio-36.jpg",
    "tPCxWfkj/Studio-35.jpg",
    "0pNvY1Vh/Studio-34.jpg",
    "BVnxkLZP/Studio-33.jpg",
    "1tyL0fSp/Studio-32.jpg",
    "YFrPCcHs/Studio-31.jpg",
    "bj4LCqc4/Studio-29.jpg",
    "Y4sgtLG8/Studio-30.jpg",
    "Xx9d536x/Studio-28.jpg",
    "MyqWBRLy/Studio-25.jpg",
    "SX8L88Sy/Studio-6.jpg",
    "LzpmMrbc/Studio-18.jpg",
    "nqWqRH27/Studio-7.jpg",
    "0Rmj75bH/Studio-11.jpg",
    "mFc6MjVW/Studio-20.jpg",
    "PZQd1JnJ/Studio-15.jpg",
    "gL8gtMLY/Studio-8.jpg",
    "5hVVSqnB/Studio-10.jpg",
    "20ZkkbdJ/Studio-14.jpg",
    "9HssQWgx/Studio-12.jpg",
    "Dg6WHb3W/Studio-24.jpg",
    "0jDjZ0yj/Studio-2.jpg",
    "1f5MkK8m/Studio-21.jpg",
    "qFMB8q8J/Studio-3.jpg",
    "mVWqf2k6/Studio-22.jpg",
    "tMg86CPC/Studio-4.jpg",
    "LXPqrb4x/Studio-16.jpg",
    "60QXqYYx/Studio-13.jpg",
    "YBw3fx4j/Studio-23.jpg",
    "39Dq72kX/Studio-1.jpg",
    "xtzdtrXv/Studio-5.jpg",
    "JwKfCRcB/Studio-9.jpg",
    "fYc61kVg/Studio-17.jpg",
    "gMrKQp4f/Studio-19.jpg"];
// order by studio-number
const sortedCdnLinks = cdnLinks.sort((a, b) => {
    const numA = parseInt(a.match(/Studio-(\d+)\.jpg/)[1]);
    const numB = parseInt(b.match(/Studio-(\d+)\.jpg/)[1]);
    return numA - numB;
}
);

const cdnBaseUrl = "https://i.ibb.co/";
const cdnUrls = sortedCdnLinks.map((link) => `${cdnBaseUrl}${link}`);


const photos = Array.from(
    { length: cdnUrls.length },
    (_, i) => cdnUrls[i],
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

    // check for url, only create if in home.html
   
        // Desktop gallery images
        const galleryImg = document.createElement("img");
        galleryImg.src = photo;
        galleryImg.alt = `Gallery Photo ${index + 1}`;
        galleryImg.loading = "lazy";
    if (galleryDiv) {
        galleryDiv.appendChild(galleryImg);
    }
  
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
