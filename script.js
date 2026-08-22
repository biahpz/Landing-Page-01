"use strict";

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const body = document.body;
const root = document.documentElement;
const loader = $("#loader");
const header = $("#header");
const menu = $("#menu");
const menuMobile = $("#menuMobile");
const scrollProgress = $("#scrollProgress");
const backTop = $("#backTop");
const toast = $("#toast");
let toastTimer;

function hideLoader() {
  loader?.classList.add("hide");
}

window.addEventListener("load", () => setTimeout(hideLoader, 650));

if (document.readyState === "complete") {
  setTimeout(hideLoader, 650);
}

setTimeout(hideLoader, 3000);

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

function updateScroll() {
  const top = window.scrollY;
  const total =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const percent =
    total > 0
      ? (top / total) * 100
      : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${percent}%`;
  }

  header?.classList.toggle(
    "scrolled",
    top > 30
  );

  backTop?.classList.toggle(
    "show",
    top > 450
  );
}

window.addEventListener(
  "scroll",
  updateScroll,
  { passive: true }
);

updateScroll();

backTop?.addEventListener(
  "click",
  () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);

menuMobile?.addEventListener(
  "click",
  () => {
    menu?.classList.toggle("open");
  }
);

$$(".menu a").forEach(link => {
  link.addEventListener(
    "click",
    () => {
      menu?.classList.remove("open");
    }
  );
});

document.addEventListener(
  "click",
  event => {
    if (
      !menu ||
      !menuMobile
    ) {
      return;
    }

    if (
      menu.contains(event.target) ||
      menuMobile.contains(event.target)
    ) {
      return;
    }

    menu.classList.remove("open");
  }
);

const revealElements =
  $$(".reveal");

if (
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      entries => {
        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );
            }
          }
        );
      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach(
    element => {
      revealObserver.observe(
        element
      );
    }
  );

} else {

  revealElements.forEach(
    element => {
      element.classList.add(
        "visible"
      );
    }
  );

}

const meters =
  $$("[data-meter]");

if (
  "IntersectionObserver" in window
) {

  const meterObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }

            const value =
              Math.max(
                0,
                Math.min(
                  100,
                  Number(
                    entry.target.dataset.meter ||
                    0
                  )
                )
              );

            entry.target.style.width =
              `${value}%`;

            meterObserver.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold: 0.35
      }
    );

  meters.forEach(
    meter => {
      meterObserver.observe(
        meter
      );
    }
  );

} else {

  meters.forEach(
    meter => {
      meter.style.width =
        `${
          Number(
            meter.dataset.meter ||
            0
          )
        }%`;
    }
  );

}

const cursorGlow =
  $("#cursorGlow");

let cursorX =
  innerWidth / 2;

let cursorY =
  innerHeight / 2;

let glowX =
  cursorX;

let glowY =
  cursorY;

document.addEventListener(
  "mousemove",
  event => {

    cursorX =
      event.clientX;

    cursorY =
      event.clientY;
  }
);

(function animateGlow() {

  if (
    cursorGlow &&
    !body.classList.contains(
      "no-cursor"
    )
  ) {

    glowX +=
      (
        cursorX -
        glowX
      ) *
      0.12;

    glowY +=
      (
        cursorY -
        glowY
      ) *
      0.12;

    cursorGlow.style.left =
      `${glowX}px`;

    cursorGlow.style.top =
      `${glowY}px`;
  }

  requestAnimationFrame(
    animateGlow
  );

})();

const heroProduct =
  $("#heroProduct");

const mainBottle =
  $("#mainBottle");

const productHalo =
  $("#productHalo");

const sprayArea =
  $("#sprayArea");

const sprayButton =
  $("#sprayButton");

const sprayWave =
  $("#sprayWave");

let spraying =
  false;

function sprayDream() {

  if (
    spraying ||
    !sprayArea
  ) {
    return;
  }

  spraying =
    true;

  heroProduct?.classList.add(
    "spraying"
  );

  sprayWave?.classList.remove(
    "active"
  );

  if (
    sprayWave
  ) {
    void sprayWave.offsetWidth;
  }

  sprayWave?.classList.add(
    "active"
  );

  const flash =
    document.createElement(
      "span"
    );

  flash.className =
    "spray-flash active";

  sprayArea.appendChild(
    flash
  );

  for (
    let i = 0;
    i < 70;
    i++
  ) {

    const mist =
      document.createElement(
        "span"
      );

    mist.className =
      "spray-mist";

    mist.style.setProperty(
      "--mist-x",
      `${
        (
          Math.random() -
          0.5
        ) *
        430
      }px`
    );

    mist.style.setProperty(
      "--mist-y",
      `${
        (
          Math.random() -
          0.65
        ) *
        360
      }px`
    );

    mist.style.setProperty(
      "--mist-size",
      `${
        3 +
        Math.random() *
        13
      }px`
    );

    mist.style.setProperty(
      "--mist-blur",
      `${
        Math.random() *
        3
      }px`
    );

    mist.style.setProperty(
      "--mist-duration",
      `${
        0.8 +
        Math.random() *
        0.9
      }s`
    );

    mist.style.animationDelay =
      `${
        Math.random() *
        0.13
      }s`;

    sprayArea.appendChild(
      mist
    );

    setTimeout(
      () => {
        mist.remove();
      },
      2000
    );
  }

  const symbols = [
    "♡",
    "✦",
    "♡",
    "✧"
  ];

  for (
    let i = 0;
    i < 14;
    i++
  ) {

    const particle =
      document.createElement(
        "span"
      );

    particle.className =
      "spray-symbol-particle";

    particle.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    particle.style.fontSize =
      `${
        9 +
        Math.random() *
        14
      }px`;

    particle.style.setProperty(
      "--symbol-x",
      `${
        (
          Math.random() -
          0.5
        ) *
        400
      }px`
    );

    particle.style.setProperty(
      "--symbol-y",
      `${
        -60 -
        Math.random() *
        280
      }px`
    );

    particle.style.setProperty(
      "--symbol-rotate",
      `${
        (
          Math.random() -
          0.5
        ) *
        500
      }deg`
    );

    particle.style.animationDelay =
      `${
        Math.random() *
        0.2
      }s`;

    sprayArea.appendChild(
      particle
    );

    setTimeout(
      () => {
        particle.remove();
      },
      2000
    );
  }

  showToast(
    "Dream está no ar ♡"
  );

  setTimeout(
    () => {

      flash.remove();

      heroProduct?.classList.remove(
        "spraying"
      );

      spraying =
        false;
    },
    1000
  );
}

sprayButton?.addEventListener(
  "click",
  sprayDream
);

heroProduct?.addEventListener(
  "mousemove",
  event => {

    if (
      spraying ||
      !mainBottle ||
      matchMedia(
        "(pointer: coarse)"
      ).matches
    ) {
      return;
    }

    const rect =
      heroProduct.getBoundingClientRect();

    const x =
      (
        event.clientX -
        rect.left
      ) /
      rect.width;

    const y =
      (
        event.clientY -
        rect.top
      ) /
      rect.height;

    mainBottle.style.transform =
      `
      translate3d(
        ${(x - 0.5) * 15}px,
        ${(y - 0.5) * 8}px,
        30px
      )
      rotateX(
        ${(0.5 - y) * 12}deg
      )
      rotateY(
        ${(x - 0.5) * 16}deg
      )
      `;

    if (
      productHalo
    ) {

      productHalo.style.transform =
        `
        translate(
          ${(x - 0.5) * -25}px,
          ${(y - 0.5) * -20}px
        )
        `;
    }
  }
);

heroProduct?.addEventListener(
  "mouseleave",
  () => {

    if (
      !spraying &&
      mainBottle
    ) {
      mainBottle.style.transform =
        "";
    }

    if (
      productHalo
    ) {
      productHalo.style.transform =
        "";
    }
  }
);

const productModal =
  $("#productModal");

const noteModal =
  $("#noteModal");

const lightbox =
  $("#lightbox");

function updateModalBodyState() {

  const anyOpen =
    productModal?.classList.contains(
      "open"
    ) ||
    noteModal?.classList.contains(
      "open"
    ) ||
    lightbox?.classList.contains(
      "open"
    );

  body.classList.toggle(
    "modal-open",
    Boolean(
      anyOpen
    )
  );
}

function openProduct() {

  productModal?.classList.add(
    "open"
  );

  body.classList.add(
    "modal-open"
  );
}

function closeProduct() {

  productModal?.classList.remove(
    "open"
  );

  updateModalBodyState();
}

$$(".open-product").forEach(
  button => {

    button.addEventListener(
      "click",
      openProduct
    );
  }
);

$$(".close-product").forEach(
  button => {

    button.addEventListener(
      "click",
      closeProduct
    );
  }
);

let favorite =
  localStorage.getItem(
    "dreamFavorite"
  ) ===
  "true";

const favoriteButtons = [
  $("#favoriteButton"),
  $("#favoriteModal")
].filter(Boolean);

function updateFavorite() {

  favoriteButtons.forEach(
    button => {

      button.textContent =
        favorite
          ? "♥ Favoritado"
          : "♡ Favoritar";

      button.classList.toggle(
        "active",
        favorite
      );
    }
  );
}

favoriteButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        favorite =
          !favorite;

        localStorage.setItem(
          "dreamFavorite",
          String(
            favorite
          )
        );

        updateFavorite();

        showToast(
          favorite
            ? "Adicionado aos favoritos ♡"
            : "Removido dos favoritos"
        );
      }
    );
  }
);

updateFavorite();

async function shareDream() {

  try {

    if (
      navigator.share
    ) {

      await navigator.share({
        title:
          "Dream Amor no Ar",

        text:
          "Conheça Dream Amor no Ar ♡",

        url:
          location.href
      });

      return;
    }

    if (
      navigator.clipboard
    ) {

      await navigator.clipboard.writeText(
        location.href
      );

      showToast(
        "Link copiado ♡"
      );

      return;
    }

    showToast(
      "Copie o link do navegador ♡"
    );

  } catch {

    showToast(
      "Compartilhamento cancelado"
    );
  }
}

$("#shareButton")?.addEventListener(
  "click",
  shareDream
);

$("#shareModal")?.addEventListener(
  "click",
  shareDream
);

const notes = {

  bergamota: [
    "🍊",
    "Bergamota",
    "Cítrica, fresca e luminosa."
  ],

  laranja: [
    "🍊",
    "Laranja",
    "Uma sensação cítrica alegre e confortável."
  ],

  mandarina: [
    "🍊",
    "Mandarina",
    "Frutada, vibrante e delicada."
  ],

  limao: [
    "🍋",
    "Limão",
    "Traz brilho e frescor."
  ],

  cassis: [
    "🫐",
    "Cassis",
    "Frutado com leve acidez."
  ],

  maca: [
    "🍎",
    "Maçã",
    "Fresca e suavemente adocicada."
  ],

  rosa: [
    "🌹",
    "Rosa",
    "Floral romântico e clássico."
  ],

  tilia: [
    "🌼",
    "Tília",
    "Floral delicado e confortável."
  ],

  freesia: [
    "🌸",
    "Frésia",
    "Floral leve e luminoso."
  ],

  lotus: [
    "🪷",
    "Flor de Lótus",
    "Floral suave e aquático."
  ],

  gardenia: [
    "🌼",
    "Gardênia",
    "Floral cremoso e sofisticado."
  ],

  pessego: [
    "🍑",
    "Pêssego",
    "Frutado macio e confortável."
  ],

  ambar: [
    "✨",
    "Âmbar",
    "Quente e envolvente."
  ],

  sandalo: [
    "🪵",
    "Sândalo",
    "Madeira cremosa e suave."
  ],

  baunilha: [
    "🤍",
    "Baunilha",
    "Doce, cremosa e aconchegante."
  ],

  tonka: [
    "✨",
    "Tonka",
    "Quente e levemente adocicada."
  ],

  musk: [
    "☁",
    "Musk",
    "Macio, confortável e envolvente."
  ]

};

$$(".note-chip").forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        const note =
          notes[
            button.dataset.note
          ];

        if (
          !note
        ) {
          return;
        }

        const icon =
          $("#noteModalIcon");

        const title =
          $("#noteModalTitle");

        const text =
          $("#noteModalText");

        if (
          icon
        ) {
          icon.textContent =
            note[0];
        }

        if (
          title
        ) {
          title.textContent =
            note[1];
        }

        if (
          text
        ) {
          text.textContent =
            note[2];
        }

        noteModal?.classList.add(
          "open"
        );

        body.classList.add(
          "modal-open"
        );
      }
    );
  }
);

function closeNote() {

  noteModal?.classList.remove(
    "open"
  );

  updateModalBodyState();
}

$$(".close-note").forEach(
  button => {

    button.addEventListener(
      "click",
      closeNote
    );
  }
);

const timelineSlider =
  $("#timelineSlider");

const timelineStages = [

  [
    1,
    "🍊",
    "Abertura fresca",
    "Cítricos e frutas aparecem primeiro."
  ],

  [
    3,
    "🌸",
    "Coração floral",
    "As flores assumem o centro da fragrância."
  ],

  [
    5,
    "♡",
    "Romântico e confortável",
    "O floral fica mais macio."
  ],

  [
    8,
    "✨",
    "Fundo aconchegante",
    "Madeiras e notas doces permanecem."
  ]

];

function updateTimeline() {

  if (
    !timelineSlider
  ) {
    return;
  }

  const value =
    Number(
      timelineSlider.value ||
      0
    );

  const stage =
    timelineStages.find(
      item =>
        value <=
        item[0]
    ) ||
    timelineStages.at(-1);

  if (
    $("#timelineHour")
  ) {
    $("#timelineHour").textContent =
      `${value}h`;
  }

  if (
    $("#timelineIcon")
  ) {
    $("#timelineIcon").textContent =
      stage[1];
  }

  if (
    $("#timelineTitle")
  ) {
    $("#timelineTitle").textContent =
      stage[2];
  }

  if (
    $("#timelineText")
  ) {
    $("#timelineText").textContent =
      stage[3];
  }
}

timelineSlider?.addEventListener(
  "input",
  updateTimeline
);

updateTimeline();

const galleryTrack =
  $("#galleryTrack");

const galleryItems =
  $$(".gallery-item");

const galleryDots =
  $("#galleryDots");

let galleryIndex =
  0;

function updateGalleryUI() {

  $$(".gallery-dot").forEach(
    (
      dot,
      index
    ) => {

      dot.classList.toggle(
        "active",
        index ===
          galleryIndex
      );
    }
  );

  if (
    $("#galleryCurrent")
  ) {

    $("#galleryCurrent").textContent =
      String(
        galleryIndex +
        1
      ).padStart(
        2,
        "0"
      );
  }

  if (
    $("#galleryTotal")
  ) {

    $("#galleryTotal").textContent =
      String(
        galleryItems.length
      ).padStart(
        2,
        "0"
      );
  }
}

function goGallery(
  index
) {

  if (
    !galleryItems.length
  ) {
    return;
  }

  galleryIndex =
    Math.max(
      0,
      Math.min(
        index,
        galleryItems.length -
        1
      )
    );

  const item =
    galleryItems[
      galleryIndex
    ];

  if (
    galleryTrack &&
    item
  ) {

    galleryTrack.scrollTo({
      left:
        item.offsetLeft -
        galleryTrack.offsetLeft,

      behavior:
        "smooth"
    });
  }

  updateGalleryUI();
}

if (
  galleryDots
) {
  galleryDots.innerHTML =
    "";
}

galleryItems.forEach(
  (
    _,
    index
  ) => {

    const dot =
      document.createElement(
        "button"
      );

    dot.className =
      "gallery-dot";

    dot.type =
      "button";

    dot.setAttribute(
      "aria-label",
      `Ir para imagem ${index + 1}`
    );

    dot.addEventListener(
      "click",
      () => {
        goGallery(
          index
        );
      }
    );

    galleryDots?.appendChild(
      dot
    );
  }
);

updateGalleryUI();

$("#galleryNext")?.addEventListener(
  "click",
  () => {

    goGallery(
      galleryIndex >=
      galleryItems.length -
      1
        ? 0
        : galleryIndex +
          1
    );
  }
);

$("#galleryPrev")?.addEventListener(
  "click",
  () => {

    goGallery(
      galleryIndex <= 0
        ? galleryItems.length -
          1
        : galleryIndex -
          1
    );
  }
);

let dragging =
  false;

let dragMoved =
  false;

let startX =
  0;

let startScroll =
  0;

galleryTrack?.addEventListener(
  "mousedown",
  event => {

    dragging =
      true;

    dragMoved =
      false;

    startX =
      event.pageX;

    startScroll =
      galleryTrack.scrollLeft;

    galleryTrack.classList.add(
      "dragging"
    );
  }
);

window.addEventListener(
  "mouseup",
  () => {

    if (
      !dragging
    ) {
      return;
    }

    dragging =
      false;

    galleryTrack?.classList.remove(
      "dragging"
    );

    setTimeout(
      () => {
        dragMoved =
          false;
      },
      50
    );
  }
);

galleryTrack?.addEventListener(
  "mousemove",
  event => {

    if (
      !dragging
    ) {
      return;
    }

    const distance =
      event.pageX -
      startX;

    if (
      Math.abs(
        distance
      ) >
      5
    ) {
      dragMoved =
        true;
    }

    event.preventDefault();

    galleryTrack.scrollLeft =
      startScroll -
      distance;
  }
);

let galleryScrollTimer;

galleryTrack?.addEventListener(
  "scroll",
  () => {

    clearTimeout(
      galleryScrollTimer
    );

    galleryScrollTimer =
      setTimeout(
        () => {

          if (
            !galleryTrack ||
            !galleryItems.length
          ) {
            return;
          }

          const center =
            galleryTrack.scrollLeft +
            galleryTrack.clientWidth /
            2;

          let closest =
            0;

          let closestDistance =
            Infinity;

          galleryItems.forEach(
            (
              item,
              index
            ) => {

              const itemCenter =
                item.offsetLeft +
                item.offsetWidth /
                2;

              const distance =
                Math.abs(
                  center -
                  itemCenter
                );

              if (
                distance <
                closestDistance
              ) {

                closestDistance =
                  distance;

                closest =
                  index;
              }
            }
          );

          galleryIndex =
            closest;

          updateGalleryUI();
        },
        80
      );
  },
  {
    passive: true
  }
);

let autoplay =
  null;

const autoplayButton =
  $("#galleryAutoplay");

const autoplayProgress =
  $(".gallery-autoplay-progress i");

function resetAutoplayProgress() {

  if (
    !autoplayProgress
  ) {
    return;
  }

  autoplayProgress.style.transition =
    "none";

  autoplayProgress.style.width =
    "0%";

  void autoplayProgress.offsetWidth;

  if (
    autoplay
  ) {

    autoplayProgress.style.transition =
      "width 3.5s linear";

    autoplayProgress.style.width =
      "100%";
  }
}

function autoplayNext() {

  goGallery(
    galleryIndex >=
    galleryItems.length -
    1
      ? 0
      : galleryIndex +
        1
  );

  resetAutoplayProgress();
}

function startGalleryAutoplay() {

  if (
    autoplay ||
    !galleryItems.length
  ) {
    return;
  }

  autoplay =
    setInterval(
      autoplayNext,
      3500
    );

  if (
    autoplayButton
  ) {
    autoplayButton.textContent =
      "❚❚ Pausar";
  }

  resetAutoplayProgress();
}

function stopGalleryAutoplay() {

  if (
    autoplay
  ) {
    clearInterval(
      autoplay
    );
  }

  autoplay =
    null;

  if (
    autoplayButton
  ) {
    autoplayButton.textContent =
      "▶ Autoplay";
  }

  if (
    autoplayProgress
  ) {

    autoplayProgress.style.transition =
      "none";

    autoplayProgress.style.width =
      "0%";
  }
}

autoplayButton?.addEventListener(
  "click",
  () => {

    if (
      autoplay
    ) {
      stopGalleryAutoplay();
    } else {
      startGalleryAutoplay();
    }
  }
);

let lightboxIndex =
  0;

function updateLightbox() {

  if (
    !galleryItems.length
  ) {
    return;
  }

  const item =
    galleryItems[
      lightboxIndex
    ];

  const image =
    $("img", item);

  const title =
    $("h3", item);

  if (
    $("#lightboxImage") &&
    image
  ) {

    $("#lightboxImage").src =
      image.src;

    $("#lightboxImage").alt =
      image.alt ||
      "Dream Amor no Ar";
  }

  if (
    $("#lightboxTitle")
  ) {

    $("#lightboxTitle").textContent =
      title?.textContent ||
      "Dream";
  }

  if (
    $("#lightboxCounter")
  ) {

    $("#lightboxCounter").textContent =
      `${
        String(
          lightboxIndex +
          1
        ).padStart(
          2,
          "0"
        )
      } / ${
        String(
          galleryItems.length
        ).padStart(
          2,
          "0"
        )
      }`;
  }
}

function openLightbox(
  index
) {

  if (
    !lightbox ||
    !galleryItems.length
  ) {
    return;
  }

  lightboxIndex =
    index;

  updateLightbox();

  lightbox.classList.add(
    "open"
  );

  body.classList.add(
    "modal-open"
  );
}

function closeLightbox() {

  lightbox?.classList.remove(
    "open"
  );

  updateModalBodyState();
}

function nextLightbox() {

  if (
    !galleryItems.length
  ) {
    return;
  }

  lightboxIndex =
    (
      lightboxIndex +
      1
    ) %
    galleryItems.length;

  updateLightbox();
}

function prevLightbox() {

  if (
    !galleryItems.length
  ) {
    return;
  }

  lightboxIndex =
    (
      lightboxIndex -
      1 +
      galleryItems.length
    ) %
    galleryItems.length;

  updateLightbox();
}

galleryItems.forEach(
  (
    item,
    index
  ) => {

    item.addEventListener(
      "click",
      () => {

        if (
          dragMoved
        ) {
          return;
        }

        openLightbox(
          index
        );
      }
    );
  }
);

$("#lightboxNext")?.addEventListener(
  "click",
  nextLightbox
);

$("#lightboxPrev")?.addEventListener(
  "click",
  prevLightbox
);

$("#lightboxClose")?.addEventListener(
  "click",
  closeLightbox
);

$("#lightboxBackdrop")?.addEventListener(
  "click",
  closeLightbox
);

const moods = {

  romantico: [
    "#df76a8",
    "#9562dc"
  ],

  sonhador: [
    "#a78bfa",
    "#60a5fa"
  ],

  noturno: [
    "#7c3aed",
    "#312e81"
  ],

  energia: [
    "#fb7185",
    "#f59e0b"
  ],

  calmo: [
    "#45c4aa",
    "#5285c5"
  ]

};

function hexToRgb(
  hex
) {

  let clean =
    String(
      hex
    ).replace(
      "#",
      ""
    );

  if (
    clean.length ===
    3
  ) {

    clean =
      clean
        .split("")
        .map(
          character =>
            character +
            character
        )
        .join("");
  }

  const value =
    parseInt(
      clean,
      16
    );

  return {
    r:
      value >>
      16 &
      255,

    g:
      value >>
      8 &
      255,

    b:
      value &
      255
  };
}

function applyColors(
  primary,
  secondary,
  save = true
) {

  const p =
    hexToRgb(
      primary
    );

  const s =
    hexToRgb(
      secondary
    );

  root.style.setProperty(
    "--primary",
    primary
  );

  root.style.setProperty(
    "--secondary",
    secondary
  );

  root.style.setProperty(
    "--primary-rgb",
    `${p.r}, ${p.g}, ${p.b}`
  );

  root.style.setProperty(
    "--secondary-rgb",
    `${s.r}, ${s.g}, ${s.b}`
  );

  if (
    $("#primaryColor")
  ) {
    $("#primaryColor").value =
      primary;
  }

  if (
    $("#secondaryColor")
  ) {
    $("#secondaryColor").value =
      secondary;
  }

  if (
    save
  ) {

    localStorage.setItem(
      "dreamPrimary",
      primary
    );

    localStorage.setItem(
      "dreamSecondary",
      secondary
    );
  }
}

$$(".mood-button").forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        $$(".mood-button").forEach(
          item => {
            item.classList.remove(
              "active"
            );
          }
        );

        button.classList.add(
          "active"
        );

        const mood =
          moods[
            button.dataset.mood
          ];

        if (
          mood
        ) {
          applyColors(
            ...mood
          );
        }
      }
    );
  }
);

const questions = [

  {
    q:
      "Qual momento combina mais com você?",

    answers: [
      [
        "Encontro romântico ♡",
        "romantico"
      ],
      [
        "Noite olhando o céu ☾",
        "sonhador"
      ],
      [
        "Uma festa ✦",
        "energia"
      ],
      [
        "Momento tranquilo ☁",
        "calmo"
      ]
    ]
  },

  {
    q:
      "Escolha uma sensação.",

    answers: [
      [
        "Romance",
        "romantico"
      ],
      [
        "Liberdade",
        "sonhador"
      ],
      [
        "Intensidade",
        "energia"
      ],
      [
        "Conforto",
        "calmo"
      ]
    ]
  },

  {
    q:
      "Escolha um símbolo.",

    answers: [
      [
        "♡ Coração",
        "romantico"
      ],
      [
        "☾ Lua",
        "sonhador"
      ],
      [
        "✦ Estrela",
        "energia"
      ],
      [
        "☁ Nuvem",
        "calmo"
      ]
    ]
  },

  {
    q:
      "Escolha seu cenário Dream.",

    answers: [
      [
        "Jardim florido",
        "romantico"
      ],
      [
        "Céu estrelado",
        "sonhador"
      ],
      [
        "Cidade iluminada",
        "energia"
      ],
      [
        "Fim de tarde",
        "calmo"
      ]
    ]
  }

];

const results = {

  romantico: [
    "♡",
    "Dream Lover",
    "Romântico, delicado e apaixonado pelos pequenos detalhes."
  ],

  sonhador: [
    "☾",
    "Dreamer",
    "Você gosta de imaginar e transformar momentos em lembranças."
  ],

  energia: [
    "✦",
    "Dream Energy",
    "Uma personalidade vibrante e cheia de energia."
  ],

  calmo: [
    "☁",
    "Soft Dream",
    "Você valoriza conforto, tranquilidade e leveza."
  ]

};

let quizIndex =
  0;

let score =
  {};

function startQuiz() {

  quizIndex =
    0;

  score = {
    romantico: 0,
    sonhador: 0,
    energia: 0,
    calmo: 0
  };

  if (
    $("#quizStart")
  ) {
    $("#quizStart").hidden =
      true;
  }

  if (
    $("#quizResult")
  ) {
    $("#quizResult").hidden =
      true;
  }

  if (
    $("#quizQuestions")
  ) {
    $("#quizQuestions").hidden =
      false;
  }

  renderQuiz();
}

function renderQuiz() {

  const current =
    questions[
      quizIndex
    ];

  if (
    !current
  ) {
    return;
  }

  if (
    $("#quizQuestion")
  ) {
    $("#quizQuestion").textContent =
      current.q;
  }

  if (
    $("#quizStep")
  ) {

    $("#quizStep").textContent =
      `${quizIndex + 1} / ${questions.length}`;
  }

  if (
    $("#quizProgressBar")
  ) {

    $("#quizProgressBar").style.width =
      `${
        (
          quizIndex +
          1
        ) /
        questions.length *
        100
      }%`;
  }

  const container =
    $("#quizOptions");

  if (
    !container
  ) {
    return;
  }

  container.innerHTML =
    "";

  current.answers.forEach(
    answer => {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.textContent =
        answer[0];

      button.addEventListener(
        "click",
        () => {

          score[
            answer[1]
          ]++;

          quizIndex++;

          if (
            quizIndex >=
            questions.length
          ) {

            finishQuiz();

          } else {

            renderQuiz();
          }
        }
      );

      container.appendChild(
        button
      );
    }
  );
}

function finishQuiz() {

  if (
    $("#quizQuestions")
  ) {
    $("#quizQuestions").hidden =
      true;
  }

  if (
    $("#quizResult")
  ) {
    $("#quizResult").hidden =
      false;
  }

  const winner =
    Object.entries(
      score
    ).sort(
      (
        a,
        b
      ) =>
        b[1] -
        a[1]
    )[0]?.[0];

  if (
    !winner
  ) {
    return;
  }

  const result =
    results[
      winner
    ];

  if (
    $("#quizResultIcon")
  ) {
    $("#quizResultIcon").textContent =
      result[0];
  }

  if (
    $("#quizResultTitle")
  ) {
    $("#quizResultTitle").textContent =
      result[1];
  }

  if (
    $("#quizResultText")
  ) {
    $("#quizResultText").textContent =
      result[2];
  }

  if (
    moods[
      winner
    ]
  ) {
    applyColors(
      ...moods[
        winner
      ]
    );
  }
}

$("#startQuiz")?.addEventListener(
  "click",
  startQuiz
);

$("#restartQuiz")?.addEventListener(
  "click",
  startQuiz
);

const settingsPanel =
  $("#settingsPanel");

$("#settingsButton")?.addEventListener(
  "click",
  () => {

    settingsPanel?.classList.add(
      "open"
    );
  }
);

$("#closeSettings")?.addEventListener(
  "click",
  () => {

    settingsPanel?.classList.remove(
      "open"
    );
  }
);

const palettes = {

  dream: [
    "#df76a8",
    "#9562dc"
  ],

  roxo: [
    "#a855f7",
    "#6d28d9"
  ],

  azul: [
    "#38bdf8",
    "#6366f1"
  ],

  cherry: [
    "#fb7185",
    "#db2777"
  ],

  gold: [
    "#d6a84b",
    "#9a6b21"
  ],

  menta: [
    "#45c4aa",
    "#5285c5"
  ]

};

$$(".palette").forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        $$(".palette").forEach(
          item => {
            item.classList.remove(
              "active"
            );
          }
        );

        button.classList.add(
          "active"
        );

        const palette =
          palettes[
            button.dataset.palette
          ];

        if (
          palette
        ) {
          applyColors(
            ...palette
          );
        }
      }
    );
  }
);

$("#primaryColor")?.addEventListener(
  "input",
  event => {

    applyColors(
      event.target.value,
      $("#secondaryColor")?.value ||
      "#9562dc"
    );
  }
);

$("#secondaryColor")?.addEventListener(
  "input",
  event => {

    applyColors(
      $("#primaryColor")?.value ||
      "#df76a8",
      event.target.value
    );
  }
);

function setDark(
  active,
  save = true
) {

  body.classList.toggle(
    "dark",
    active
  );

  if (
    $("#darkToggle")
  ) {
    $("#darkToggle").checked =
      active;
  }

  if (
    $("#themeButton")
  ) {

    $("#themeButton").textContent =
      active
        ? "☀"
        : "☾";
  }

  if (
    save
  ) {

    localStorage.setItem(
      "dreamDark",
      String(
        active
      )
    );
  }
}

$("#themeButton")?.addEventListener(
  "click",
  () => {

    setDark(
      !body.classList.contains(
        "dark"
      )
    );
  }
);

$("#darkToggle")?.addEventListener(
  "change",
  event => {

    setDark(
      event.target.checked
    );
  }
);

function generateParticles() {

  const container =
    $("#particles");

  if (
    !container
  ) {
    return;
  }

  container.innerHTML =
    "";

  const symbols = [
    "♡",
    "✦",
    "·",
    "✿"
  ];

  for (
    let i = 0;
    i < 25;
    i++
  ) {

    const particle =
      document.createElement(
        "span"
      );

    particle.className =
      "particle";

    particle.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    particle.style.left =
      `${
        Math.random() *
        100
      }%`;

    particle.style.fontSize =
      `${
        8 +
        Math.random() *
        17
      }px`;

    particle.style.setProperty(
      "--duration",
      `${
        8 +
        Math.random() *
        12
      }s`
    );

    particle.style.setProperty(
      "--delay",
      `${
        -Math.random() *
        15
      }s`
    );

    container.appendChild(
      particle
    );
  }
}

generateParticles();

function bindToggle(
  selector,
  className,
  storageKey,
  inverted = true
) {

  $(selector)?.addEventListener(
    "change",
    event => {

      body.classList.toggle(
        className,
        inverted
          ? !event.target.checked
          : event.target.checked
      );

      localStorage.setItem(
        storageKey,
        String(
          event.target.checked
        )
      );
    }
  );
}

bindToggle(
  "#particlesToggle",
  "no-particles",
  "dreamParticles"
);

bindToggle(
  "#animationsToggle",
  "no-animations",
  "dreamAnimations"
);

bindToggle(
  "#cursorToggle",
  "no-cursor",
  "dreamCursor"
);

bindToggle(
  "#glassToggle",
  "no-glass",
  "dreamGlass"
);

bindToggle(
  "#cleanModeToggle",
  "clean-mode",
  "dreamClean",
  false
);

const animationSpeed =
  $("#animationSpeed");

const contrastRange =
  $("#contrastControl");

function setAnimationSpeed(
  value
) {

  const numeric =
    Number(
      value
    );

  const safe =
    Math.max(
      40,
      Math.min(
        Number.isFinite(
          numeric
        )
          ? numeric
          : 100,
        160
      )
    );

  root.style.setProperty(
    "--animation-speed",
    safe /
    100
  );

  if (
    $("#animationSpeedValue")
  ) {

    $("#animationSpeedValue").textContent =
      `${Math.round(
        safe
      )}%`;
  }

  if (
    animationSpeed
  ) {
    animationSpeed.value =
      safe;
  }

  localStorage.setItem(
    "dreamAnimationSpeed",
    String(
      safe
    )
  );
}

function setContrast(
  value
) {

  const numeric =
    Number(
      value
    );

  const safe =
    Math.max(
      80,
      Math.min(
        Number.isFinite(
          numeric
        )
          ? numeric
          : 100,
        130
      )
    );

  root.style.setProperty(
    "--contrast-level",
    safe /
    100
  );

  body.style.filter =
    `contrast(${safe / 100})`;

  if (
    $("#contrastValue")
  ) {

    $("#contrastValue").textContent =
      `${Math.round(
        safe
      )}%`;
  }

  if (
    contrastRange
  ) {
    contrastRange.value =
      safe;
  }

  localStorage.setItem(
    "dreamContrast",
    String(
      safe
    )
  );
}

animationSpeed?.addEventListener(
  "input",
  event => {

    setAnimationSpeed(
      event.target.value
    );
  }
);

contrastRange?.addEventListener(
  "input",
  event => {

    setContrast(
      event.target.value
    );
  }
);

const fontButtons =
  $$(
    "[data-font-size]"
  );

function setFontSize(
  size
) {

  const safe =
    [
      "small",
      "normal",
      "large"
    ].includes(
      size
    )
      ? size
      : "normal";

  body.classList.remove(
    "font-small",
    "font-normal",
    "font-large"
  );

  body.classList.add(
    `font-${safe}`
  );

  fontButtons.forEach(
    button => {

      button.classList.toggle(
        "active",
        button.dataset.fontSize ===
        safe
      );
    }
  );

  localStorage.setItem(
    "dreamFontSize",
    safe
  );
}

fontButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        setFontSize(
          button.dataset.fontSize
        );
      }
    );
  }
);

const scenes = {

  romance: {
    icon:
      "♡",

    mini:
      "ROMANCE DREAM",

    title:
      "Amor está no ar.",

    text:
      "Uma atmosfera delicada, rosa e envolvente.",

    background:
      "radial-gradient(circle at 20% 50%,rgba(255,111,169,.40),transparent 38%),radial-gradient(circle at 80% 40%,rgba(169,92,221,.30),transparent 42%),linear-gradient(135deg,#1c0d18,#35152c)"
  },

  ceu: {
    icon:
      "☾",

    mini:
      "DREAM SKY",

    title:
      "Sonhe mais alto.",

    text:
      "Um céu profundo, misterioso e cheio de possibilidades.",

    background:
      "radial-gradient(circle at 25% 25%,rgba(111,95,255,.30),transparent 35%),radial-gradient(circle at 75% 60%,rgba(73,133,255,.24),transparent 40%),linear-gradient(135deg,#090b1e,#211346)"
  },

  flores: {
    icon:
      "✿",

    mini:
      "FLORAL DREAM",

    title:
      "Flores no ar.",

    text:
      "Um universo floral delicado, luminoso e romântico.",

    background:
      "radial-gradient(circle at 25% 65%,rgba(223,118,168,.38),transparent 36%),radial-gradient(circle at 78% 30%,rgba(255,190,214,.30),transparent 42%),linear-gradient(135deg,#1c1019,#39202f)"
  },

  energia: {
    icon:
      "✦",

    mini:
      "DREAM ENERGY",

    title:
      "Sinta a energia.",

    text:
      "Vibrante, intensa e cheia de personalidade.",

    background:
      "radial-gradient(circle at 20% 65%,rgba(251,113,133,.30),transparent 35%),radial-gradient(circle at 80% 30%,rgba(245,158,11,.25),transparent 40%),linear-gradient(135deg,#1a1018,#35211c)"
  }

};

const dreamSceneBg =
  $(".dream-scene-bg");

$$(".scene-button").forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        const scene =
          scenes[
            button.dataset.scene
          ];

        if (
          !scene
        ) {
          return;
        }

        $$(".scene-button").forEach(
          item => {
            item.classList.remove(
              "active"
            );
          }
        );

        button.classList.add(
          "active"
        );

        if (
          dreamSceneBg
        ) {
          dreamSceneBg.style.background =
            scene.background;
        }

        if (
          $("#sceneResultIcon")
        ) {
          $("#sceneResultIcon").textContent =
            scene.icon;
        }

        if (
          $("#sceneResultMini")
        ) {
          $("#sceneResultMini").textContent =
            scene.mini;
        }

        if (
          $("#sceneResultTitle")
        ) {
          $("#sceneResultTitle").textContent =
            scene.title;
        }

        if (
          $("#sceneResultText")
        ) {
          $("#sceneResultText").textContent =
            scene.text;
        }
      }
    );
  }
);

$$(".moment-card").forEach(
  card => {

    card.addEventListener(
      "mousemove",
      event => {

        if (
          matchMedia(
            "(pointer: coarse)"
          ).matches
        ) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width;

        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height;

        card.style.transform =
          `
          perspective(800px)
          translateY(-7px)
          rotateX(${(0.5 - y) * 7}deg)
          rotateY(${(x - 0.5) * 7}deg)
          `;
      }
    );

    card.addEventListener(
      "mouseleave",
      () => {
        card.style.transform =
          "";
      }
    );
  }
);

const sectionIndicator =
  $("#sectionIndicator");

const sections =
  $$(
    "main section[id]"
  );

function updateSectionIndicator() {

  if (
    !sectionIndicator ||
    !sections.length
  ) {
    return;
  }

  const position =
    window.scrollY +
    window.innerHeight *
    0.35;

  let current =
    sections[0];

  sections.forEach(
    section => {

      if (
        section.offsetTop <=
        position
      ) {
        current =
          section;
      }
    }
  );

  const label =
    current.dataset.sectionName ||
    current.getAttribute(
      "aria-label"
    ) ||
    current.id;

  const number =
    sections.indexOf(
      current
    ) +
    1;

  sectionIndicator.innerHTML =
    `
    <span>
      ${String(
        number
      ).padStart(
        2,
        "0"
      )}
    </span>
    ${label}
    `;
}

window.addEventListener(
  "scroll",
  updateSectionIndicator,
  {
    passive: true
  }
);

function loadSettings() {

  const savedPrimary =
    localStorage.getItem(
      "dreamPrimary"
    ) ||
    "#df76a8";

  const savedSecondary =
    localStorage.getItem(
      "dreamSecondary"
    ) ||
    "#9562dc";

  applyColors(
    savedPrimary,
    savedSecondary,
    false
  );

  setDark(
    localStorage.getItem(
      "dreamDark"
    ) ===
    "true",
    false
  );

  const settings = [

    [
      "dreamParticles",
      "#particlesToggle",
      "no-particles",
      true
    ],

    [
      "dreamAnimations",
      "#animationsToggle",
      "no-animations",
      true
    ],

    [
      "dreamCursor",
      "#cursorToggle",
      "no-cursor",
      true
    ],

    [
      "dreamGlass",
      "#glassToggle",
      "no-glass",
      true
    ],

    [
      "dreamClean",
      "#cleanModeToggle",
      "clean-mode",
      false
    ]

  ];

  settings.forEach(
    (
      [
        key,
        selector,
        className,
        inverted
      ]
    ) => {

      const stored =
        localStorage.getItem(
          key
        );

      const enabled =
        stored ===
        null
          ? key !==
            "dreamClean"
          : stored ===
            "true";

      if (
        $(selector)
      ) {
        $(selector).checked =
          enabled;
      }

      body.classList.toggle(
        className,
        inverted
          ? !enabled
          : enabled
      );
    }
  );

  setAnimationSpeed(
    Number(
      localStorage.getItem(
        "dreamAnimationSpeed"
      ) ||
      100
    )
  );

  setContrast(
    Number(
      localStorage.getItem(
        "dreamContrast"
      ) ||
      100
    )
  );

  setFontSize(
    localStorage.getItem(
      "dreamFontSize"
    ) ||
    "normal"
  );
}

$("#resetSettings")?.addEventListener(
  "click",
  () => {

    [
      "dreamPrimary",
      "dreamSecondary",
      "dreamDark",
      "dreamParticles",
      "dreamAnimations",
      "dreamCursor",
      "dreamGlass",
      "dreamClean",
      "dreamAnimationSpeed",
      "dreamContrast",
      "dreamFontSize"
    ].forEach(
      key => {
        localStorage.removeItem(
          key
        );
      }
    );

    location.reload();
  }
);

document.addEventListener(
  "keydown",
  event => {

    const typing =
      event.target instanceof
      HTMLElement &&
      event.target.matches(
        "input, textarea, select, [contenteditable='true']"
      );

    const lightboxOpen =
      lightbox?.classList.contains(
        "open"
      );

    if (
      event.key ===
      "Escape"
    ) {

      closeProduct();
      closeNote();
      closeLightbox();

      settingsPanel?.classList.remove(
        "open"
      );

      menu?.classList.remove(
        "open"
      );

      return;
    }

    if (
      typing
    ) {
      return;
    }

    if (
      lightboxOpen &&
      event.key ===
      "ArrowRight"
    ) {

      nextLightbox();

      return;
    }

    if (
      lightboxOpen &&
      event.key ===
      "ArrowLeft"
    ) {

      prevLightbox();

      return;
    }

    if (
      event.key ===
      "ArrowRight"
    ) {

      goGallery(
        Math.min(
          galleryIndex +
          1,
          galleryItems.length -
          1
        )
      );

      return;
    }

    if (
      event.key ===
      "ArrowLeft"
    ) {

      goGallery(
        Math.max(
          galleryIndex -
          1,
          0
        )
      );

      return;
    }

    if (
      event.key.toLowerCase() ===
      "d"
    ) {

      $("#themeButton")?.click();

      return;
    }

    if (
      event.key.toLowerCase() ===
      "s"
    ) {

      sprayDream();

      return;
    }

    if (
      event.key.toLowerCase() ===
      "g"
    ) {

      settingsPanel?.classList.toggle(
        "open"
      );
    }
  }
);

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.hidden &&
      autoplay
    ) {
      stopGalleryAutoplay();
    }
  }
);

let resizeTimer;

window.addEventListener(
  "resize",
  () => {

    clearTimeout(
      resizeTimer
    );

    resizeTimer =
      setTimeout(
        () => {

          updateScroll();

          if (
            window.innerWidth >
            900
          ) {
            menu?.classList.remove(
              "open"
            );
          }
        },
        120
      );
  }
);

$$(
  'a[href^="#"]'
).forEach(
  link => {

    link.addEventListener(
      "click",
      event => {

        const href =
          link.getAttribute(
            "href"
          );

        if (
          !href ||
          href ===
          "#"
        ) {
          return;
        }

        const target =
          document.querySelector(
            href
          );

        if (
          !target
        ) {
          return;
        }

        event.preventDefault();

        const position =
          target.getBoundingClientRect().top +
          window.scrollY -
          (
            header?.offsetHeight ||
            0
          ) -
          15;

        window.scrollTo({
          top:
            position,

          behavior:
            "smooth"
        });
      }
    );
  }
);

loadSettings();

updateTimeline();

updateGalleryUI();

updateSectionIndicator();

console.log(
  "Dream Update 3.0 carregado com sucesso ✦"
);
/* =========================================================
   DREAM UPDATE 3.1
   ADICIONAR NO FINAL DO SCRIPT.JS
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       EVITAR CARREGAR DUAS VEZES
    ===================================================== */

    if (
        window.DREAM_UPDATE_31
    ) {

        return;

    }


    window.DREAM_UPDATE_31 =
        true;


    /* =====================================================
       HELPERS 3.1
    ===================================================== */

    const d31 = (
        selector,
        parent = document
    ) =>
        parent.querySelector(
            selector
        );


    const d31All = (
        selector,
        parent = document
    ) =>
        [
            ...parent.querySelectorAll(
                selector
            )
        ];


    const d31Body =
        document.body;


    const d31Root =
        document.documentElement;


    /* =====================================================
       CSS DO UPDATE 3.1
    ===================================================== */

    const dream31Style =
        document.createElement(
            "style"
        );


    dream31Style.id =
        "dreamUpdate31Style";


    dream31Style.textContent = `

        :root {
            --dream31-intensity: 1;
        }


        .dream31-floating {
            position: fixed;

            left: 22px;
            bottom: 22px;

            z-index: 9000;

            display: flex;
            gap: 10px;
            align-items: center;
        }


        .dream31-surprise {
            border: 1px solid rgba(255,255,255,.2);

            border-radius: 999px;

            padding: 13px 18px;

            background:
                linear-gradient(
                    135deg,
                    rgba(var(--primary-rgb), .95),
                    rgba(var(--secondary-rgb), .95)
                );

            color: #fff;

            font: inherit;
            font-weight: 800;

            cursor: pointer;

            box-shadow:
                0 15px 45px
                rgba(var(--primary-rgb), .25);

            backdrop-filter:
                blur(16px);

            transition:
                transform .25s ease,
                box-shadow .25s ease;
        }


        .dream31-surprise:hover {
            transform:
                translateY(-3px)
                scale(1.03);

            box-shadow:
                0 20px 55px
                rgba(var(--primary-rgb), .38);
        }


        .dream31-panel {
            position: fixed;

            right: 22px;
            bottom: 90px;

            width:
                min(
                    330px,
                    calc(100vw - 32px)
                );

            max-height:
                min(
                    650px,
                    calc(100vh - 130px)
                );

            overflow-y: auto;

            z-index: 9001;

            padding: 22px;

            border:
                1px solid
                rgba(255,255,255,.16);

            border-radius: 26px;

            background:
                rgba(20,20,28,.86);

            color: #fff;

            backdrop-filter:
                blur(25px);

            box-shadow:
                0 25px 80px
                rgba(0,0,0,.30);

            transform:
                translateY(20px)
                scale(.96);

            opacity: 0;

            pointer-events: none;

            transition:
                opacity .25s ease,
                transform .25s ease;
        }


        .dream31-panel.open {
            opacity: 1;

            pointer-events: auto;

            transform:
                translateY(0)
                scale(1);
        }


        .dream31-panel h3 {
            margin:
                0 0 6px;

            font-size: 25px;
        }


        .dream31-panel > p {
            margin:
                0 0 20px;

            opacity: .7;

            font-size: 13px;
        }


        .dream31-block {
            margin-top: 18px;

            padding-top: 18px;

            border-top:
                1px solid
                rgba(255,255,255,.10);
        }


        .dream31-label {
            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 15px;

            margin-bottom: 10px;

            font-size: 13px;
            font-weight: 700;
        }


        .dream31-toggle {
            appearance: none;

            width: 46px;
            height: 25px;

            border-radius: 999px;

            background:
                rgba(255,255,255,.14);

            position: relative;

            cursor: pointer;

            transition:
                .25s ease;
        }


        .dream31-toggle::before {
            content: "";

            position: absolute;

            top: 4px;
            left: 4px;

            width: 17px;
            height: 17px;

            border-radius: 50%;

            background: #fff;

            transition:
                .25s ease;
        }


        .dream31-toggle:checked {
            background:
                linear-gradient(
                    90deg,
                    var(--primary),
                    var(--secondary)
                );
        }


        .dream31-toggle:checked::before {
            transform:
                translateX(21px);
        }


        .dream31-range {
            width: 100%;

            accent-color:
                var(--primary);
        }


        .dream31-stats {
            display: grid;

            grid-template-columns:
                1fr 1fr;

            gap: 10px;
        }


        .dream31-stat {
            padding: 15px;

            border-radius: 17px;

            background:
                rgba(255,255,255,.07);

            text-align: center;
        }


        .dream31-stat strong {
            display: block;

            font-size: 25px;
        }


        .dream31-stat small {
            opacity: .6;

            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }


        .dream31-phrase {
            position: fixed;

            left: 50%;
            bottom: 100px;

            z-index: 9500;

            width:
                min(
                    520px,
                    calc(100vw - 40px)
                );

            padding:
                18px 24px;

            border-radius:
                22px;

            background:
                rgba(15,15,23,.88);

            border:
                1px solid
                rgba(255,255,255,.12);

            color: #fff;

            text-align: center;

            backdrop-filter:
                blur(18px);

            transform:
                translate(
                    -50%,
                    30px
                );

            opacity: 0;

            pointer-events: none;

            transition:
                opacity .35s ease,
                transform .35s ease;
        }


        .dream31-phrase.show {
            opacity: 1;

            transform:
                translate(
                    -50%,
                    0
                );
        }


        .dream31-phrase small {
            display: block;

            margin-bottom: 5px;

            opacity: .55;

            letter-spacing: 2px;

            font-size: 9px;
        }


        .dream31-phrase strong {
            font-size:
                clamp(
                    16px,
                    3vw,
                    21px
                );
        }


        .dream31-mixer-notes {
            display: flex;
            flex-wrap: wrap;

            gap: 7px;
        }


        .dream31-note {
            border:
                1px solid
                rgba(255,255,255,.13);

            border-radius:
                999px;

            padding:
                8px 11px;

            color: #fff;

            background:
                rgba(255,255,255,.06);

            cursor: pointer;

            font-size: 11px;

            transition:
                .2s ease;
        }


        .dream31-note.active {
            background:
                linear-gradient(
                    135deg,
                    var(--primary),
                    var(--secondary)
                );

            border-color:
                transparent;
        }


        .dream31-mix-button {
            width: 100%;

            margin-top: 12px;

            padding:
                12px;

            border: 0;

            border-radius:
                14px;

            color: #fff;

            background:
                linear-gradient(
                    135deg,
                    var(--primary),
                    var(--secondary)
                );

            font-weight: 800;

            cursor: pointer;
        }


        .dream31-mix-result {
            display: none;

            margin-top: 12px;

            padding:
                14px;

            border-radius:
                15px;

            background:
                rgba(255,255,255,.06);
        }


        .dream31-mix-result.show {
            display: block;
        }


        .dream31-mix-result strong {
            display: block;

            margin-bottom: 6px;

            font-size: 17px;
        }


        .dream31-mix-result p {
            margin: 0;

            opacity: .72;

            font-size: 12px;

            line-height: 1.5;
        }


        .dream31-open-panel {
            position: fixed;

            right: 22px;
            bottom: 22px;

            z-index: 9002;

            width: 54px;
            height: 54px;

            border: 0;

            border-radius: 50%;

            color: #fff;

            background:
                linear-gradient(
                    135deg,
                    var(--primary),
                    var(--secondary)
                );

            font-size: 20px;

            cursor: pointer;

            box-shadow:
                0 15px 45px
                rgba(var(--primary-rgb), .3);
        }


        body.dream31-cinema-mode header,
        body.dream31-cinema-mode footer,
        body.dream31-cinema-mode .settings-fab,
        body.dream31-cinema-mode .back-top,
        body.dream31-cinema-mode #sectionIndicator,
        body.dream31-cinema-mode .dream31-floating,
        body.dream31-cinema-mode .dream31-open-panel,
        body.dream31-cinema-mode .dream31-panel {
            opacity: 0 !important;

            pointer-events: none !important;
        }


        body.dream31-cinema-mode {
            cursor: none;
        }


        body.dream31-cinema-mode::after {
            content: "Pressione ESC para sair do modo cinema";

            position: fixed;

            left: 50%;
            bottom: 22px;

            z-index: 99999;

            transform:
                translateX(-50%);

            padding:
                9px 14px;

            border-radius:
                999px;

            background:
                rgba(0,0,0,.45);

            color:
                rgba(255,255,255,.7);

            font-size: 10px;

            pointer-events: none;

            animation:
                dream31CinemaMessage
                4s forwards;
        }


        @keyframes dream31CinemaMessage {

            0%,
            70% {
                opacity: 1;
            }

            100% {
                opacity: 0;
            }

        }


        .spray-mist,
        .spray-symbol-particle,
        .particle {
            opacity:
                calc(
                    .65 *
                    var(--dream31-intensity)
                );
        }


        #cursorGlow {
            transform:
                translate(-50%,-50%)
                scale(
                    var(--dream31-intensity)
                );
        }


        @media (
            max-width: 600px
        ) {

            .dream31-floating {
                left: 15px;
                bottom: 15px;
            }


            .dream31-surprise {
                padding:
                    11px 14px;

                font-size: 12px;
            }


            .dream31-open-panel {
                right: 15px;
                bottom: 15px;

                width: 49px;
                height: 49px;
            }


            .dream31-panel {
                right: 15px;
                bottom: 78px;

                width:
                    calc(100vw - 30px);
            }

        }

    `;


    document.head.appendChild(
        dream31Style
    );


    /* =====================================================
       ELEMENTOS DO UPDATE
    ===================================================== */

    const floating =
        document.createElement(
            "div"
        );


    floating.className =
        "dream31-floating";


    floating.innerHTML = `

        <button
            type="button"
            class="dream31-surprise"
            id="dream31Surprise"
        >
            ✦ Surpreenda-me
        </button>

    `;


    d31Body.appendChild(
        floating
    );


    const openPanel =
        document.createElement(
            "button"
        );


    openPanel.type =
        "button";


    openPanel.className =
        "dream31-open-panel";


    openPanel.id =
        "dream31OpenPanel";


    openPanel.innerHTML =
        "✧";


    openPanel.setAttribute(
        "aria-label",
        "Abrir Dream 3.1"
    );


    d31Body.appendChild(
        openPanel
    );


    const phraseBox =
        document.createElement(
            "div"
        );


    phraseBox.className =
        "dream31-phrase";


    phraseBox.id =
        "dream31Phrase";


    phraseBox.innerHTML = `

        <small>
            DREAM MOMENT
        </small>

        <strong
            id="dream31PhraseText"
        ></strong>

    `;


    d31Body.appendChild(
        phraseBox
    );


    /* =====================================================
       PAINEL
    ===================================================== */

    const panel =
        document.createElement(
            "aside"
        );


    panel.className =
        "dream31-panel";


    panel.id =
        "dream31Panel";


    panel.innerHTML = `

        <h3>
            Dream 3.1 ✦
        </h3>

        <p>
            Novas experiências e personalizações.
        </p>


        <div
            class="dream31-block"
        >

            <label
                class="dream31-label"
            >

                <span>
                    🔊 Som do borrifador
                </span>

                <input
                    type="checkbox"
                    class="dream31-toggle"
                    id="dream31Sound"
                >

            </label>

        </div>


        <div
            class="dream31-block"
        >

            <div
                class="dream31-label"
            >

                <span>
                    ✨ Intensidade
                </span>

                <strong
                    id="dream31IntensityValue"
                >
                    100%
                </strong>

            </div>

            <input
                type="range"
                min="40"
                max="160"
                value="100"
                class="dream31-range"
                id="dream31Intensity"
            >

        </div>


        <div
            class="dream31-block"
        >

            <div
                class="dream31-stats"
            >

                <div
                    class="dream31-stat"
                >

                    <strong
                        id="dream31SprayCount"
                    >
                        0
                    </strong>

                    <small>
                        sprays
                    </small>

                </div>


                <div
                    class="dream31-stat"
                >

                    <strong
                        id="dream31SurpriseCount"
                    >
                        0
                    </strong>

                    <small>
                        surpresas
                    </small>

                </div>

            </div>

        </div>


        <div
            class="dream31-block"
        >

            <label
                class="dream31-label"
            >

                <span>
                    🎬 Modo cinema
                </span>

                <input
                    type="checkbox"
                    class="dream31-toggle"
                    id="dream31Cinema"
                >

            </label>

        </div>


        <div
            class="dream31-block"
        >

            <div
                class="dream31-label"
            >

                <span>
                    🧪 Dream Mixer
                </span>

                <span>
                    3 notas
                </span>

            </div>


            <div
                class="dream31-mixer-notes"
                id="dream31MixerNotes"
            >

                <button
                    class="dream31-note"
                    data-mixer-note="Bergamota"
                >
                    🍊 Bergamota
                </button>

                <button
                    class="dream31-note"
                    data-mixer-note="Rosa"
                >
                    🌹 Rosa
                </button>

                <button
                    class="dream31-note"
                    data-mixer-note="Baunilha"
                >
                    🤍 Baunilha
                </button>

                <button
                    class="dream31-note"
                    data-mixer-note="Musk"
                >
                    ☁ Musk
                </button>

                <button
                    class="dream31-note"
                    data-mixer-note="Sândalo"
                >
                    🪵 Sândalo
                </button>

                <button
                    class="dream31-note"
                    data-mixer-note="Mandarina"
                >
                    🍊 Mandarina
                </button>

                <button
                    class="dream31-note"
                    data-mixer-note="Gardênia"
                >
                    🌼 Gardênia
                </button>

                <button
                    class="dream31-note"
                    data-mixer-note="Pêssego"
                >
                    🍑 Pêssego
                </button>

            </div>


            <button
                type="button"
                class="dream31-mix-button"
                id="dream31Mix"
            >
                Criar meu Dream
            </button>


            <div
                class="dream31-mix-result"
                id="dream31MixResult"
            >

                <strong
                    id="dream31MixTitle"
                ></strong>

                <p
                    id="dream31MixText"
                ></p>

            </div>

        </div>

    `;


    d31Body.appendChild(
        panel
    );


    /* =====================================================
       ABRIR / FECHAR PAINEL
    ===================================================== */

    openPanel.addEventListener(
        "click",
        () => {

            panel.classList.toggle(
                "open"
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !panel.classList.contains(
                    "open"
                )
            ) {

                return;

            }


            if (
                panel.contains(
                    event.target
                ) ||
                openPanel.contains(
                    event.target
                )
            ) {

                return;

            }


            panel.classList.remove(
                "open"
            );

        }
    );


    /* =====================================================
       FRASES
    ===================================================== */

    const dream31Phrases = [

        "Alguns momentos não precisam durar para serem inesquecíveis.",

        "O extraordinário começa nos pequenos detalhes.",

        "Deixe um pouco de sonho por onde você passar.",

        "Algumas memórias têm cheiro, cor e sentimento.",

        "O amor também mora nos detalhes que ninguém percebe.",

        "Nem todo sonho acontece dormindo.",

        "Seu momento merece uma atmosfera só dele.",

        "Às vezes, tudo que falta é deixar o inesperado acontecer.",

        "Colecione sensações, não apenas momentos.",

        "Onde existe sentimento, sempre existe algo para lembrar."

    ];


    let dream31PhraseTimer;


    function dream31ShowPhrase(
        phrase
    ) {

        const text =
            d31(
                "#dream31PhraseText"
            );


        if (
            !text
        ) {

            return;

        }


        text.textContent =
            phrase;


        phraseBox.classList.add(
            "show"
        );


        clearTimeout(
            dream31PhraseTimer
        );


        dream31PhraseTimer =
            setTimeout(
                () => {

                    phraseBox.classList.remove(
                        "show"
                    );

                },
                4500
            );

    }


    function dream31RandomPhrase() {

        const phrase =
            dream31Phrases[
                Math.floor(
                    Math.random() *
                    dream31Phrases.length
                )
            ];


        dream31ShowPhrase(
            phrase
        );

    }


    /* =====================================================
       CONTADOR DE SPRAYS
    ===================================================== */

    let dream31Sprays =
        Number(
            localStorage.getItem(
                "dream31Sprays"
            ) ||
            0
        );


    function dream31UpdateSprayCount() {

        const element =
            d31(
                "#dream31SprayCount"
            );


        if (
            element
        ) {

            element.textContent =
                dream31Sprays;

        }

    }


    dream31UpdateSprayCount();


    const originalSprayButton =
        d31(
            "#sprayButton"
        );


    originalSprayButton?.addEventListener(
        "click",
        () => {

            dream31Sprays++;


            localStorage.setItem(
                "dream31Sprays",
                String(
                    dream31Sprays
                )
            );


            dream31UpdateSprayCount();


            if (
                d31(
                    "#dream31Sound"
                )?.checked
            ) {

                dream31PlaySpraySound();

            }

        }
    );


    /* =====================================================
       SOM DO SPRAY
    ===================================================== */

    const soundToggle =
        d31(
            "#dream31Sound"
        );


    const savedSound =
        localStorage.getItem(
            "dream31Sound"
        ) ===
        "true";


    soundToggle.checked =
        savedSound;


    soundToggle.addEventListener(
        "change",
        event => {

            localStorage.setItem(
                "dream31Sound",
                String(
                    event.target.checked
                )
            );

        }
    );


    function dream31PlaySpraySound() {

        try {

            const AudioContextClass =
                window.AudioContext ||
                window.webkitAudioContext;


            if (
                !AudioContextClass
            ) {

                return;

            }


            const context =
                new AudioContextClass();


            const bufferSize =
                context.sampleRate *
                0.18;


            const buffer =
                context.createBuffer(
                    1,
                    bufferSize,
                    context.sampleRate
                );


            const data =
                buffer.getChannelData(
                    0
                );


            for (
                let i = 0;
                i < bufferSize;
                i++
            ) {

                const progress =
                    i /
                    bufferSize;


                data[i] =
                    (
                        Math.random() *
                        2 -
                        1
                    ) *
                    (
                        1 -
                        progress
                    ) *
                    0.20;

            }


            const source =
                context.createBufferSource();


            const filter =
                context.createBiquadFilter();


            const gain =
                context.createGain();


            source.buffer =
                buffer;


            filter.type =
                "highpass";


            filter.frequency.value =
                1800;


            gain.gain.value =
                0.7;


            source.connect(
                filter
            );


            filter.connect(
                gain
            );


            gain.connect(
                context.destination
            );


            source.start();


            source.onended =
                () => {

                    context.close();

                };

        } catch {

            /* som opcional */

        }

    }


    /* =====================================================
       INTENSIDADE
    ===================================================== */

    const intensity =
        d31(
            "#dream31Intensity"
        );


    const intensityValue =
        d31(
            "#dream31IntensityValue"
        );


    const savedIntensity =
        Number(
            localStorage.getItem(
                "dream31Intensity"
            ) ||
            100
        );


    function dream31SetIntensity(
        value
    ) {

        const safe =
            Math.max(
                40,
                Math.min(
                    Number(
                        value
                    ),
                    160
                )
            );


        intensity.value =
            safe;


        intensityValue.textContent =
            `${safe}%`;


        d31Root.style.setProperty(
            "--dream31-intensity",
            safe /
            100
        );


        localStorage.setItem(
            "dream31Intensity",
            String(
                safe
            )
        );

    }


    intensity.addEventListener(
        "input",
        event => {

            dream31SetIntensity(
                event.target.value
            );

        }
    );


    dream31SetIntensity(
        savedIntensity
    );


    /* =====================================================
       SALVAR CENÁRIO
    ===================================================== */

    d31All(
        ".scene-button"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const scene =
                        button.dataset.scene;


                    if (
                        scene
                    ) {

                        localStorage.setItem(
                            "dream31Scene",
                            scene
                        );

                    }

                }
            );

        }
    );


    const savedScene =
        localStorage.getItem(
            "dream31Scene"
        );


    if (
        savedScene
    ) {

        setTimeout(
            () => {

                d31(
                    `.scene-button[data-scene="${savedScene}"]`
                )?.click();

            },
            300
        );

    }


    /* =====================================================
       SURPREENDA-ME
    ===================================================== */

    let dream31Surprises =
        Number(
            localStorage.getItem(
                "dream31Surprises"
            ) ||
            0
        );


    function dream31UpdateSurpriseCount() {

        const element =
            d31(
                "#dream31SurpriseCount"
            );


        if (
            element
        ) {

            element.textContent =
                dream31Surprises;

        }

    }


    dream31UpdateSurpriseCount();


    d31(
        "#dream31Surprise"
    )?.addEventListener(
        "click",
        () => {

            dream31Surprises++;


            localStorage.setItem(
                "dream31Surprises",
                String(
                    dream31Surprises
                )
            );


            dream31UpdateSurpriseCount();


            /* PALETA */

            const palettes =
                d31All(
                    ".palette"
                );


            if (
                palettes.length
            ) {

                palettes[
                    Math.floor(
                        Math.random() *
                        palettes.length
                    )
                ].click();

            }


            /* CENÁRIO */

            const sceneButtons =
                d31All(
                    ".scene-button"
                );


            if (
                sceneButtons.length
            ) {

                sceneButtons[
                    Math.floor(
                        Math.random() *
                        sceneButtons.length
                    )
                ].click();

            }


            /* FRASE */

            dream31RandomPhrase();


            /* SPRAY */

            if (
                originalSprayButton
            ) {

                setTimeout(
                    () => {

                        originalSprayButton.click();

                    },
                    250
                );

            }


            /* PEQUENO EFEITO */

            d31Body.animate(
                [
                    {
                        filter:
                            "brightness(1)"
                    },

                    {
                        filter:
                            "brightness(1.12)"
                    },

                    {
                        filter:
                            "brightness(1)"
                    }
                ],
                {
                    duration:
                        700,

                    easing:
                        "ease"
                }
            );

        }
    );


    /* =====================================================
       MODO CINEMA
    ===================================================== */

    const cinemaToggle =
        d31(
            "#dream31Cinema"
        );


    function dream31SetCinema(
        active
    ) {

        d31Body.classList.toggle(
            "dream31-cinema-mode",
            active
        );


        cinemaToggle.checked =
            active;

    }


    cinemaToggle.addEventListener(
        "change",
        event => {

            dream31SetCinema(
                event.target.checked
            );

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape" &&
                d31Body.classList.contains(
                    "dream31-cinema-mode"
                )
            ) {

                dream31SetCinema(
                    false
                );

            }

        }
    );


    /* =====================================================
       DREAM MIXER
    ===================================================== */

    let dream31MixerSelection =
        [];


    d31All(
        ".dream31-note"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const note =
                        button.dataset.mixerNote;


                    if (
                        dream31MixerSelection.includes(
                            note
                        )
                    ) {

                        dream31MixerSelection =
                            dream31MixerSelection.filter(
                                item =>
                                    item !==
                                    note
                            );


                        button.classList.remove(
                            "active"
                        );


                        return;

                    }


                    if (
                        dream31MixerSelection.length >=
                        3
                    ) {

                        dream31ShowPhrase(
                            "Escolha no máximo 3 notas."
                        );


                        return;

                    }


                    dream31MixerSelection.push(
                        note
                    );


                    button.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    const mixerNames = [

        "Dream Aura",

        "Dream Bloom",

        "Dream Secret",

        "Dream Kiss",

        "Dream Moon",

        "Dream Velvet",

        "Dream Desire",

        "Dream Memories",

        "Dream Infinity",

        "Dream Whisper"

    ];


    d31(
        "#dream31Mix"
    )?.addEventListener(
        "click",
        () => {

            if (
                dream31MixerSelection.length !==
                3
            ) {

                dream31ShowPhrase(
                    "Escolha exatamente 3 notas para criar seu Dream."
                );


                return;

            }


            const title =
                mixerNames[
                    Math.floor(
                        Math.random() *
                        mixerNames.length
                    )
                ];


            const [
                first,
                second,
                third
            ] =
                dream31MixerSelection;


            const description =
                `${first} abre a composição, ${second} cria o coração da experiência e ${third} deixa uma assinatura confortável e marcante.`;


            d31(
                "#dream31MixTitle"
            ).textContent =
                title;


            d31(
                "#dream31MixText"
            ).textContent =
                description;


            d31(
                "#dream31MixResult"
            ).classList.add(
                "show"
            );


            dream31ShowPhrase(
                `${title} foi criado ✦`
            );

        }
    );


    /* =====================================================
       FRASE AUTOMÁTICA AO ENTRAR
    ===================================================== */

    setTimeout(
        () => {

            if (
                !sessionStorage.getItem(
                    "dream31Welcome"
                )
            ) {

                dream31RandomPhrase();


                sessionStorage.setItem(
                    "dream31Welcome",
                    "true"
                );

            }

        },
        3500
    );


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%cDream Update 3.1 carregado ✦",
        `
        color:#df76a8;
        font-weight:900;
        font-size:14px;
        `
    );


})();
/* =========================================================
   DREAM UPDATE 3.2
   MELHORIAS PREMIUM + NOVAS FUNÇÕES
   COLAR NO FINAL DO SCRIPT.JS
========================================================= */

(() => {

    "use strict";

    if (window.DREAM_UPDATE_32) {
        return;
    }

    window.DREAM_UPDATE_32 = true;

    const $32 = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$32 = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const body32 = document.body;
    const root32 = document.documentElement;

    /* =====================================================
       CSS 3.2
    ===================================================== */

    const style32 = document.createElement("style");

    style32.id = "dreamUpdate32Style";

    style32.textContent = `
        .dream32-status {
            position: fixed;
            top: 95px;
            right: 20px;
            z-index: 8500;
            padding: 10px 14px;
            border-radius: 999px;
            background: rgba(18,18,26,.78);
            border: 1px solid rgba(255,255,255,.12);
            color: #fff;
            backdrop-filter: blur(16px);
            font-size: 10px;
            font-weight: 700;
            opacity: .85;
            pointer-events: none;
        }

        .dream32-achievement {
            position: fixed;
            top: 22px;
            left: 50%;
            z-index: 99999;
            width: min(420px, calc(100vw - 30px));
            padding: 16px 20px;
            border-radius: 20px;
            background:
                linear-gradient(
                    135deg,
                    rgba(var(--primary-rgb), .95),
                    rgba(var(--secondary-rgb), .95)
                );
            color: #fff;
            box-shadow: 0 20px 70px rgba(0,0,0,.28);
            transform: translate(-50%, -30px) scale(.95);
            opacity: 0;
            pointer-events: none;
            transition:
                opacity .35s ease,
                transform .35s ease;
            text-align: center;
        }

        .dream32-achievement.show {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
        }

        .dream32-achievement small {
            display: block;
            margin-bottom: 4px;
            opacity: .75;
            letter-spacing: 2px;
            font-size: 8px;
        }

        .dream32-achievement strong {
            font-size: 18px;
        }

        .dream32-history {
            position: fixed;
            left: 20px;
            top: 95px;
            z-index: 8400;
            width: min(290px, calc(100vw - 40px));
            padding: 15px;
            border-radius: 20px;
            background: rgba(18,18,26,.80);
            border: 1px solid rgba(255,255,255,.10);
            color: #fff;
            backdrop-filter: blur(18px);
            box-shadow: 0 20px 60px rgba(0,0,0,.20);
            opacity: 0;
            transform: translateY(-10px);
            pointer-events: none;
            transition: .25s ease;
        }

        .dream32-history.open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        .dream32-history h4 {
            margin: 0 0 12px;
            font-size: 15px;
        }

        .dream32-history-item {
            padding: 10px;
            border-radius: 12px;
            background: rgba(255,255,255,.06);
            margin-bottom: 8px;
            font-size: 10px;
            line-height: 1.4;
        }

        .dream32-history-item:last-child {
            margin-bottom: 0;
        }

        .dream32-history-button {
            position: fixed;
            left: 20px;
            top: 44px;
            z-index: 8501;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,.12);
            background: rgba(18,18,26,.8);
            color: #fff;
            cursor: pointer;
            backdrop-filter: blur(15px);
        }

        .dream32-preset-row {
            display: grid;
            grid-template-columns: repeat(2,1fr);
            gap: 8px;
            margin-top: 10px;
        }

        .dream32-preset {
            padding: 10px 8px;
            border: 1px solid rgba(255,255,255,.10);
            border-radius: 12px;
            background: rgba(255,255,255,.06);
            color: #fff;
            cursor: pointer;
            font-size: 10px;
            font-weight: 700;
            transition: .2s ease;
        }

        .dream32-preset:hover {
            transform: translateY(-2px);
            background: rgba(255,255,255,.11);
        }

        .dream32-auto-active {
            box-shadow:
                0 0 0 2px rgba(var(--primary-rgb),.25),
                0 15px 45px rgba(var(--primary-rgb),.20);
        }

        .dream32-spray-cooldown {
            opacity: .55 !important;
            pointer-events: none !important;
        }

        .dream32-flash {
            position: fixed;
            inset: 0;
            z-index: 99998;
            pointer-events: none;
            background:
                radial-gradient(
                    circle at center,
                    rgba(var(--primary-rgb), .18),
                    transparent 65%
                );
            opacity: 0;
            animation: dream32Flash .65s ease;
        }

        @keyframes dream32Flash {
            0% { opacity: 0; }
            35% { opacity: 1; }
            100% { opacity: 0; }
        }

        body.dream32-auto-mode .dream31-open-panel {
            box-shadow:
                0 0 0 3px rgba(var(--primary-rgb),.15),
                0 15px 55px rgba(var(--primary-rgb),.4);
        }

        @media(max-width:700px) {
            .dream32-status {
                display: none;
            }

            .dream32-history {
                left: 15px;
                right: 15px;
                width: auto;
            }

            .dream32-history-button {
                left: 15px;
            }
        }
    `;

    document.head.appendChild(style32);

    /* =====================================================
       STATUS ATUAL
    ===================================================== */

    const status32 = document.createElement("div");
    status32.className = "dream32-status";
    status32.id = "dream32Status";
    status32.textContent = "Dream 3.2 ativo";
    body32.appendChild(status32);

    function updateStatus32() {
        const activeScene =
            $32(".scene-button.active")?.dataset.scene ||
            localStorage.getItem("dream31Scene") ||
            "dream";

        const activePalette =
            $32(".palette.active")?.dataset.palette ||
            "dream";

        status32.textContent =
            `✦ ${activeScene} • ${activePalette}`;
    }

    /* =====================================================
       HISTÓRICO
    ===================================================== */

    const historyButton32 = document.createElement("button");
    historyButton32.type = "button";
    historyButton32.className = "dream32-history-button";
    historyButton32.textContent = "☰";
    historyButton32.setAttribute("aria-label", "Histórico Dream");

    const historyPanel32 = document.createElement("div");
    historyPanel32.className = "dream32-history";
    historyPanel32.innerHTML = `
        <h4>Últimas experiências</h4>
        <div id="dream32HistoryList"></div>
    `;

    body32.appendChild(historyButton32);
    body32.appendChild(historyPanel32);

    historyButton32.addEventListener("click", () => {
        historyPanel32.classList.toggle("open");
    });

    let history32 = [];

    try {
        history32 =
            JSON.parse(
                localStorage.getItem("dream32History") ||
                "[]"
            );
    } catch {
        history32 = [];
    }

    function saveHistory32(type, text) {
        history32.unshift({
            type,
            text,
            time: Date.now()
        });

        history32 = history32.slice(0, 8);

        localStorage.setItem(
            "dream32History",
            JSON.stringify(history32)
        );

        renderHistory32();
    }

    function renderHistory32() {
        const list = $32("#dream32HistoryList");

        if (!list) {
            return;
        }

        if (!history32.length) {
            list.innerHTML = `
                <div class="dream32-history-item">
                    Nenhuma experiência ainda.
                </div>
            `;
            return;
        }

        list.innerHTML = history32.map(item => {
            const date = new Date(item.time);

            return `
                <div class="dream32-history-item">
                    <strong>${item.type}</strong><br>
                    ${item.text}<br>
                    <small>
                        ${date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </small>
                </div>
            `;
        }).join("");
    }

    renderHistory32();

    /* =====================================================
       CONQUISTAS
    ===================================================== */

    const achievement32 =
        document.createElement("div");

    achievement32.className =
        "dream32-achievement";

    achievement32.innerHTML = `
        <small>CONQUISTA DESBLOQUEADA</small>
        <strong id="dream32AchievementText"></strong>
    `;

    body32.appendChild(achievement32);

    let achievementTimer32;

    function showAchievement32(text, key) {
        const unlocked =
            JSON.parse(
                localStorage.getItem(
                    "dream32Achievements"
                ) ||
                "[]"
            );

        if (unlocked.includes(key)) {
            return;
        }

        unlocked.push(key);

        localStorage.setItem(
            "dream32Achievements",
            JSON.stringify(unlocked)
        );

        const textElement =
            $32("#dream32AchievementText");

        if (textElement) {
            textElement.textContent =
                text;
        }

        achievement32.classList.add(
            "show"
        );

        clearTimeout(
            achievementTimer32
        );

        achievementTimer32 =
            setTimeout(
                () => {
                    achievement32.classList.remove(
                        "show"
                    );
                },
                3500
            );
    }

    function checkAchievements32() {
        const sprays =
            Number(
                localStorage.getItem(
                    "dream31Sprays"
                ) ||
                0
            );

        const surprises =
            Number(
                localStorage.getItem(
                    "dream31Surprises"
                ) ||
                0
            );

        const mixes =
            Number(
                localStorage.getItem(
                    "dream32MixCount"
                ) ||
                0
            );

        if (sprays >= 10) {
            showAchievement32(
                "10 sprays realizados ✦",
                "spray10"
            );
        }

        if (sprays >= 50) {
            showAchievement32(
                "Mestre do Dream • 50 sprays",
                "spray50"
            );
        }

        if (surprises >= 5) {
            showAchievement32(
                "5 experiências surpresa",
                "surprise5"
            );
        }

        if (mixes >= 3) {
            showAchievement32(
                "Criador de fragrâncias",
                "mix3"
            );
        }
    }

    /* =====================================================
       SPRAY MELHORADO
    ===================================================== */

    const sprayButton32 =
        $32("#sprayButton");

    let sprayCooldown32 =
        false;

    sprayButton32?.addEventListener(
        "click",
        () => {
            if (sprayCooldown32) {
                return;
            }

            sprayCooldown32 = true;

            sprayButton32.classList.add(
                "dream32-spray-cooldown"
            );

            const flash =
                document.createElement(
                    "div"
                );

            flash.className =
                "dream32-flash";

            body32.appendChild(
                flash
            );

            setTimeout(
                () => {
                    flash.remove();
                },
                700
            );

            saveHistory32(
                "Spray",
                "Dream borrifado"
            );

            checkAchievements32();

            setTimeout(
                () => {
                    sprayCooldown32 =
                        false;

                    sprayButton32.classList.remove(
                        "dream32-spray-cooldown"
                    );
                },
                600
            );
        },
        true
    );

    /* =====================================================
       DREAM MIXER MELHORADO
    ===================================================== */

    const noteCategories32 = {
        Bergamota: "cítrico",
        Mandarina: "cítrico",
        Rosa: "floral",
        Gardênia: "floral",
        Baunilha: "doce",
        Pêssego: "frutado",
        Musk: "almiscarado",
        Sândalo: "amadeirado"
    };

    function getMixProfile32(notes) {
        const categories =
            notes.map(
                note =>
                    noteCategories32[note] ||
                    "especial"
            );

        if (
            categories.includes("floral") &&
            categories.includes("doce")
        ) {
            return {
                title:
                    "Romântico e envolvente",

                text:
                    "Uma criação floral com fundo adocicado e assinatura confortável."
            };
        }

        if (
            categories.includes("cítrico") &&
            categories.includes("frutado")
        ) {
            return {
                title:
                    "Fresco e luminoso",

                text:
                    "Uma combinação vibrante, alegre e cheia de energia."
            };
        }

        if (
            categories.includes("amadeirado") &&
            categories.includes("almiscarado")
        ) {
            return {
                title:
                    "Elegante e marcante",

                text:
                    "Um perfil profundo, macio e sofisticado."
            };
        }

        return {
            title:
                "Dream Signature",

            text:
                "Uma mistura equilibrada, única e feita para deixar uma assinatura pessoal."
        };
    }

    $32("#dream31Mix")?.addEventListener(
        "click",
        () => {
            setTimeout(
                () => {
                    const selected =
                        $$32(
                            ".dream31-note.active"
                        )
                        .map(
                            item =>
                                item.dataset.mixerNote
                        );

                    if (
                        selected.length !==
                        3
                    ) {
                        return;
                    }

                    const profile =
                        getMixProfile32(
                            selected
                        );

                    const title =
                        $32(
                            "#dream31MixTitle"
                        );

                    const text =
                        $32(
                            "#dream31MixText"
                        );

                    if (title) {
                        title.textContent =
                            `${profile.title} ✦`;
                    }

                    if (text) {
                        text.textContent =
                            `${selected.join(" + ")}. ${profile.text}`;
                    }

                    const count =
                        Number(
                            localStorage.getItem(
                                "dream32MixCount"
                            ) ||
                            0
                        ) +
                        1;

                    localStorage.setItem(
                        "dream32MixCount",
                        String(count)
                    );

                    saveHistory32(
                        "Dream Mixer",
                        selected.join(" + ")
                    );

                    checkAchievements32();
                },
                50
            );
        }
    );

    /* =====================================================
       SURPREENDA-ME MELHORADO
    ===================================================== */

    $32("#dream31Surprise")?.addEventListener(
        "click",
        () => {
            setTimeout(
                () => {
                    const activeScene =
                        $32(
                            ".scene-button.active"
                        )?.dataset.scene ||
                        "dream";

                    const activePalette =
                        $32(
                            ".palette.active"
                        )?.dataset.palette ||
                        "dream";

                    saveHistory32(
                        "Surpresa",
                        `${activeScene} • ${activePalette}`
                    );

                    updateStatus32();

                    checkAchievements32();
                },
                350
            );
        }
    );

    /* =====================================================
       PRESETS
    ===================================================== */

    const panel31 =
        $32("#dream31Panel");

    if (panel31) {
        const block =
            document.createElement("div");

        block.className =
            "dream31-block";

        block.innerHTML = `
            <div class="dream31-label">
                <span>🎨 Presets rápidos</span>
            </div>

            <div class="dream32-preset-row">
                <button class="dream32-preset" data-preset32="romantico">
                    ♡ Romântico
                </button>

                <button class="dream32-preset" data-preset32="noturno">
                    ☾ Noturno
                </button>

                <button class="dream32-preset" data-preset32="suave">
                    ☁ Suave
                </button>

                <button class="dream32-preset" data-preset32="intenso">
                    ✦ Intenso
                </button>
            </div>
        `;

        panel31.appendChild(
            block
        );
    }

    const presets32 = {
        romantico: {
            scene: "romance",
            palette: "dream",
            intensity: 100
        },

        noturno: {
            scene: "ceu",
            palette: "roxo",
            intensity: 85
        },

        suave: {
            scene: "flores",
            palette: "menta",
            intensity: 70
        },

        intenso: {
            scene: "energia",
            palette: "cherry",
            intensity: 150
        }
    };

    $$32(
        ".dream32-preset"
    ).forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    const preset =
                        presets32[
                            button.dataset.preset32
                        ];

                    if (!preset) {
                        return;
                    }

                    $32(
                        `.scene-button[data-scene="${preset.scene}"]`
                    )?.click();

                    $32(
                        `.palette[data-palette="${preset.palette}"]`
                    )?.click();

                    const intensity =
                        $32(
                            "#dream31Intensity"
                        );

                    if (intensity) {
                        intensity.value =
                            preset.intensity;

                        intensity.dispatchEvent(
                            new Event(
                                "input",
                                {
                                    bubbles: true
                                }
                            )
                        );
                    }

                    saveHistory32(
                        "Preset",
                        button.textContent.trim()
                    );

                    updateStatus32();
                }
            );
        }
    );

    /* =====================================================
       DREAM AUTO
    ===================================================== */

    let auto32 =
        null;

    if (panel31) {
        const autoBlock =
            document.createElement(
                "div"
            );

        autoBlock.className =
            "dream31-block";

        autoBlock.innerHTML = `
            <label class="dream31-label">
                <span>∞ Dream Auto</span>

                <input
                    type="checkbox"
                    class="dream31-toggle"
                    id="dream32Auto"
                >
            </label>

            <p style="
                margin:5px 0 0;
                opacity:.55;
                font-size:10px;
            ">
                Troca automaticamente a atmosfera.
            </p>
        `;

        panel31.appendChild(
            autoBlock
        );
    }

    function runAuto32() {
        const scenes =
            $$32(
                ".scene-button"
            );

        const palettes =
            $$32(
                ".palette"
            );

        if (scenes.length) {
            scenes[
                Math.floor(
                    Math.random() *
                    scenes.length
                )
            ].click();
        }

        if (palettes.length) {
            palettes[
                Math.floor(
                    Math.random() *
                    palettes.length
                )
            ].click();
        }

        if (
            Math.random() >
            0.5
        ) {
            $32(
                "#sprayButton"
            )?.click();
        }

        updateStatus32();
    }

    $32("#dream32Auto")?.addEventListener(
        "change",
        event => {
            if (
                event.target.checked
            ) {
                body32.classList.add(
                    "dream32-auto-mode"
                );

                runAuto32();

                auto32 =
                    setInterval(
                        runAuto32,
                        9000
                    );

                saveHistory32(
                    "Dream Auto",
                    "Ativado"
                );
            } else {
                body32.classList.remove(
                    "dream32-auto-mode"
                );

                clearInterval(
                    auto32
                );

                auto32 =
                    null;

                saveHistory32(
                    "Dream Auto",
                    "Desativado"
                );
            }
        }
    );

    /* =====================================================
       DREAM DO DIA
    ===================================================== */

    function dreamOfDay32() {
        const key =
            new Date()
                .toISOString()
                .slice(
                    0,
                    10
                );

        let hash = 0;

        for (
            let i = 0;
            i < key.length;
            i++
        ) {
            hash =
                (
                    hash *
                    31 +
                    key.charCodeAt(i)
                ) >>> 0;
        }

        const scenes =
            [
                "romance",
                "ceu",
                "flores",
                "energia"
            ];

        const palettes =
            [
                "dream",
                "roxo",
                "azul",
                "cherry",
                "gold",
                "menta"
            ];

        return {
            scene:
                scenes[
                    hash %
                    scenes.length
                ],

            palette:
                palettes[
                    hash %
                    palettes.length
                ]
        };
    }

    const day32 =
        dreamOfDay32();

    localStorage.setItem(
        "dream32DayScene",
        day32.scene
    );

    localStorage.setItem(
        "dream32DayPalette",
        day32.palette
    );

    /* =====================================================
       CLIQUE EM CENAS E PALETAS
    ===================================================== */

    $$32(
        ".scene-button"
    ).forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    updateStatus32();

                    saveHistory32(
                        "Cenário",
                        button.dataset.scene ||
                        "Dream"
                    );
                }
            );
        }
    );

    $$32(
        ".palette"
    ).forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    updateStatus32();

                    saveHistory32(
                        "Paleta",
                        button.dataset.palette ||
                        "Dream"
                    );
                }
            );
        }
    );

    /* =====================================================
       MODO CINEMA MELHORADO
    ===================================================== */

    const cinema32 =
        $32(
            "#dream31Cinema"
        );

    cinema32?.addEventListener(
        "change",
        event => {
            if (
                event.target.checked
            ) {
                body32.animate(
                    [
                        {
                            opacity: .94
                        },
                        {
                            opacity: 1
                        }
                    ],
                    {
                        duration:
                            500,
                        easing:
                            "ease"
                    }
                );

                saveHistory32(
                    "Cinema",
                    "Modo cinema ativado"
                );
            }
        }
    );

    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    updateStatus32();

    checkAchievements32();

    console.log(
        "%cDream Update 3.2 carregado ✦",
        `
        color:#df76a8;
        font-size:14px;
        font-weight:900;
        `
    );

})();