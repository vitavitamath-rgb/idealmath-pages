(() => {
  const lightbox = document.querySelector(".gallery-lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const closeButton = lightbox?.querySelector(".gallery-lightbox-close");

  if (!lightbox || !lightboxImage || !closeButton) {
    return;
  }

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    lightboxImage.removeAttribute("alt");
    document.body.classList.remove("lightbox-open");
  };

  document.querySelectorAll(".gallery-grid a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      lightboxImage.src = link.href;
      lightboxImage.alt = link.querySelector("img")?.alt || "확대된 갤러리 사진";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    });
  });

  lightbox.addEventListener("click", closeLightbox);
  closeButton.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
