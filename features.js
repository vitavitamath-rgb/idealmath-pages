(() => {
  const extraMedia = {
    "AI 활용": [
      "https://sepia-slip-ca2.notion.site/image/attachment%3A2ff9b01a-723e-405f-8f14-3970012601f5%3Aimage.png?table=block&id=3930a2ad-6a3f-8066-86f7-e2e719be8775&spaceId=9cc23e06-1dd8-43ae-a433-98a7680ca253&width=660&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl",
      "https://sepia-slip-ca2.notion.site/image/attachment%3Ab2a26f9c-ab87-4167-9953-b7fb1a4b7f11%3Aimage.png?table=block&id=3940a2ad-6a3f-80d0-90f1-c31154f7199f&spaceId=9cc23e06-1dd8-43ae-a433-98a7680ca253&width=660&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
    ],
    "변형 문제": [
      "https://sepia-slip-ca2.notion.site/image/attachment%3A8c39023e-ac1e-47e4-a5cb-c4b1a6e45cd7%3Aimage.png?table=block&id=3940a2ad-6a3f-8034-80a0-f0b88e3cf130&spaceId=9cc23e06-1dd8-43ae-a433-98a7680ca253&width=750&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl",
      "https://sepia-slip-ca2.notion.site/image/attachment%3A1c4da75f-b8a2-4bd6-9cdb-adafac1ae3c6%3Aimage.png?table=block&id=3940a2ad-6a3f-80b4-8bf0-d076c0a3513c&spaceId=9cc23e06-1dd8-43ae-a433-98a7680ca253&width=580&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
    ],
    "오답 관리": [
      "https://sepia-slip-ca2.notion.site/image/attachment%3Ad207650f-439e-4d7b-9e3f-310f74af24f9%3Aimage.png?table=block&id=3940a2ad-6a3f-807d-a107-c7418a15b29e&spaceId=9cc23e06-1dd8-43ae-a433-98a7680ca253&width=660&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl",
      "https://sepia-slip-ca2.notion.site/image/attachment%3A379fadc8-1a9e-4257-89cc-3651686ed311%3Aimage.png?table=block&id=3940a2ad-6a3f-801e-8c66-d0356d78e8a3&spaceId=9cc23e06-1dd8-43ae-a433-98a7680ca253&width=660&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
    ],
    "일러스트레이터 / 프리미어프로활용": [
      "https://sepia-slip-ca2.notion.site/image/attachment%3A035f443a-5ece-4a29-9653-798bf48de495%3Aimage.png?table=block&id=3940a2ad-6a3f-80e4-b435-cdeceb7beb17&spaceId=9cc23e06-1dd8-43ae-a433-98a7680ca253&width=660&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl",
      "https://sepia-slip-ca2.notion.site/image/attachment%3Ac75c7cb7-8a3f-45d9-b917-dcee7eaafa90%3Aimage.png?table=block&id=3940a2ad-6a3f-80cf-bce7-d1172ae5d80f&spaceId=9cc23e06-1dd8-43ae-a433-98a7680ca253&width=660&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
    ],
    "칠판 판서": [
      "https://sepia-slip-ca2.notion.site/image/attachment%3A6de7abdf-801c-4456-a66a-8dfa02f782ed%3Aimage.png?table=block&id=3940a2ad-6a3f-8096-8cb1-fb8a44017418&spaceId=9cc23e06-1dd8-43ae-a433-98a7680ca253&width=1420&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
    ]
  };

  const buildMediaLink = (url, title, index) => {
    const link = document.createElement("a");
    const image = document.createElement("img");
    link.href = url;
    image.src = url;
    image.alt = `${title} 예시 ${index + 1}`;
    image.loading = "lazy";
    image.referrerPolicy = "no-referrer";
    image.addEventListener("error", () => {
      const row = link.closest(".image-row");
      link.remove();
      if (row && !row.querySelector("a")) {
        row.remove();
      }
    });
    link.append(image);
    return link;
  };

  document.querySelectorAll(".feature-card").forEach((card) => {
    const title = card.querySelector("h2")?.textContent.trim();
    const urls = extraMedia[title];
    if (!urls) {
      return;
    }

    let row = card.querySelector(".image-row");
    if (!row) {
      row = document.createElement("div");
      row.className = urls.length === 2 ? "image-row two" : "image-row";
      card.append(row);
    }
    if (row.children.length + urls.length !== 2) {
      row.classList.remove("two");
    }
    const startIndex = row.children.length;
    urls.forEach((url, index) => row.append(buildMediaLink(url, title, startIndex + index)));
  });

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

  document.querySelectorAll(".image-row a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      lightboxImage.src = link.href;
      lightboxImage.alt = link.querySelector("img")?.alt || "확대된 수업 특징 이미지";
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
