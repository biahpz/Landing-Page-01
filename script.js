"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     HELPERS
  ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const body = document.body;
  const root = document.documentElement;

  const clamp = (value, min, max) =>
    Math.min(max, Math.max(min, Number(value) || 0));


  /* =========================================================
     STORAGE
  ========================================================= */

  const storage = {

    get(key, fallback = null) {

      try {

        const value =
          localStorage.getItem(key);

        return value === null
          ? fallback
          : value;

      } catch {

        return fallback;

      }

    },

    set(key, value) {

      try {

        localStorage.setItem(
          key,
          String(value)
        );

      } catch {}

    },

    remove(key) {

      try {

        localStorage.removeItem(key);

      } catch {}

    }

  };


  /* =========================================================
     ELEMENTOS PRINCIPAIS
  ========================================================= */

  const loader =
    $("#loader");

  const header =
    $("#header");

  const menu =
    $("#menu");

  const menuMobile =
    $("#menuMobile");

  const scrollProgress =
    $("#scrollProgress");

  const backTop =
    $("#backTop");

  const toast =
    $("#toast");

  const settingsPanel =
    $("#settingsPanel");

  const productModal =
    $("#productModal");

  const noteModal =
    $("#noteModal");

  const lightbox =
    $("#lightbox");


  /* =========================================================
     TOAST
  ========================================================= */

  let toastTimer = null;


  function showToast(message) {

    if (!toast) {
      return;
    }

    toast.textContent =
      message;

    toast.classList.remove(
      "show"
    );

    void toast.offsetWidth;

    toast.classList.add(
      "show"
    );

    clearTimeout(
      toastTimer
    );

    toastTimer =
      setTimeout(
        () => {

          toast.classList.remove(
            "show"
          );

        },
        2200
      );

  }


  window.showToast =
    showToast;


  /* =========================================================
     LOADER
  ========================================================= */

  function closeLoader() {

    if (!loader) {
      return;
    }

    loader.classList.add(
      "hide"
    );

    setTimeout(
      () => {

        loader.style.display =
          "none";

      },
      700
    );

  }


  window.addEventListener(
    "load",
    () => {

      setTimeout(
        closeLoader,
        350
      );

    }
  );


  setTimeout(
    closeLoader,
    4500
  );


  /* =========================================================
     IDIOMA
  ========================================================= */

  let currentLanguage =
    storage.get(
      "dreamLanguage",
      "pt-BR"
    );


  function setLanguage(
    language,
    notify = false
  ) {

    if (
      language !== "pt-BR" &&
      language !== "en-US"
    ) {

      language =
        "pt-BR";

    }


    currentLanguage =
      language;


    storage.set(
      "dreamLanguage",
      language
    );


    root.lang =
      language;


    /*
      IMPORTANTE:
      isso NÃO usa tradução automática do navegador.
      Apenas altera elementos que possuem traduções
      cadastradas no próprio site.
    */


    $$("[data-lang]").forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.lang === language
        );

      }
    );


    if (notify) {

      showToast(

        language === "pt-BR"
          ? "Português selecionado 🇧🇷"
          : "English selected 🇺🇸"

      );

    }

  }


  $$("[data-lang]").forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();
          event.stopPropagation();

          setLanguage(
            button.dataset.lang,
            true
          );

        }
      );

    }
  );


  setLanguage(
    currentLanguage
  );


  /* =========================================================
     SCROLL
  ========================================================= */

  function updateScroll() {

    const top =
      window.scrollY ||
      document.documentElement.scrollTop ||
      0;


    const total =
      document.documentElement.scrollHeight -
      window.innerHeight;


    const percent =
      total > 0
        ? clamp(
            top / total * 100,
            0,
            100
          )
        : 0;


    if (scrollProgress) {

      scrollProgress.style.width =
        `${percent}%`;

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
    {
      passive: true
    }
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


  /* =========================================================
     MENU MOBILE
  ========================================================= */

  menuMobile?.addEventListener(
    "click",
    event => {

      event.preventDefault();
      event.stopPropagation();


      const open =
        menu?.classList.toggle(
          "open"
        );


      menuMobile.setAttribute(
        "aria-expanded",
        String(
          Boolean(open)
        )
      );

    }
  );


  $$(".menu a").forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          menu?.classList.remove(
            "open"
          );


          menuMobile?.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    }
  );


  /* =========================================================
     REVEAL
  ========================================================= */

  const reveals =
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
                !entry.isIntersecting
              ) {

                return;

              }


              entry.target.classList.add(
                "visible"
              );


              revealObserver.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.1
        }
      );


    reveals.forEach(
      element => {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    reveals.forEach(
      element => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =========================================================
     MODAIS
  ========================================================= */

  function openLayer(element) {

    if (!element) {
      return;
    }


    element.classList.add(
      "open"
    );


    element.setAttribute(
      "aria-hidden",
      "false"
    );


    /*
      Garantia extra para o modal aparecer
      mesmo se alguma regra antiga do CSS
      estiver interferindo.
    */

    element.style.visibility =
      "visible";

    element.style.opacity =
      "1";

    element.style.pointerEvents =
      "auto";


    body.classList.add(
      "modal-open"
    );

  }


  function closeLayer(element) {

    if (!element) {
      return;
    }


    element.classList.remove(
      "open"
    );


    element.setAttribute(
      "aria-hidden",
      "true"
    );


    element.style.visibility =
      "";

    element.style.opacity =
      "";

    element.style.pointerEvents =
      "";


    if (
      !$(".product-modal.open") &&
      !$(".note-modal.open") &&
      !$(".lightbox.open")
    ) {

      body.classList.remove(
        "modal-open"
      );

    }

  }


  /* =========================================================
     VER PRODUTO / CONHECER PRODUTO
  ========================================================= */

  function openProductModal() {

    if (!productModal) {

      console.error(
        "Dream: #productModal não foi encontrado no index.html."
      );


      showToast(
        "Não foi possível abrir o produto."
      );


      return;

    }


    openLayer(
      productModal
    );

  }


  function closeProductModal() {

    closeLayer(
      productModal
    );

  }


  /*
    EVENT DELEGATION EM CAPTURE.

    Essa parte é importante.

    Ela permite que TODOS estes botões funcionem:

    - Conhecer
    - Ver produto
    - Ver detalhes
    - Conhecer produto
    - Botão final Ver produto

    desde que possuam:

    class="open-product"

    ou:

    data-open-product
  */

  document.addEventListener(
    "click",
    event => {

      const openButton =
        event.target.closest(
          ".open-product, [data-open-product]"
        );


      if (openButton) {

        event.preventDefault();
        event.stopPropagation();


        openProductModal();


        return;

      }


      const closeButton =
        event.target.closest(
          ".close-product"
        );


      if (closeButton) {

        event.preventDefault();
        event.stopPropagation();


        closeProductModal();

      }

    },
    true
  );


  /*
    Também adicionamos listener direto
    como segunda camada de segurança.
  */

  $$(".open-product").forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();


          openProductModal();

        }
      );

    }
  );


  $$(".close-product").forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();


          closeProductModal();

        }
      );

    }
  );


  productModal?.addEventListener(
    "click",
    event => {

      if (
        event.target === productModal ||
        event.target.classList.contains(
          "product-modal-backdrop"
        )
      ) {

        closeProductModal();

      }

    }
  );


  /* =========================================================
     FAVORITO
  ========================================================= */

  let favorite =
    storage.get(
      "dreamFavorite",
      "false"
    ) === "true";


  const favoriteButtons = [
    $("#favoriteButton"),
    $("#favoriteModal")
  ].filter(Boolean);


  function updateFavorite() {

    favoriteButtons.forEach(
      button => {

        button.classList.toggle(
          "active",
          favorite
        );


        button.textContent =
          favorite
            ? "♥ Favoritado"
            : "♡ Favoritar";

      }
    );

  }


  favoriteButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();


          favorite =
            !favorite;


          storage.set(
            "dreamFavorite",
            favorite
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


  /* =========================================================
     SPRAY — ÁUDIO
  ========================================================= */

  const sprayAudio =
    new Audio(
      "./audio/spray.mp3"
    );


  sprayAudio.preload =
    "auto";


  sprayAudio.volume =
    0.8;


  let sprayAudioStopTimer =
    null;


  function playSprayAudio() {

    const soundToggle =
      $("#spraySoundToggle");


    if (
      soundToggle &&
      soundToggle.checked === false
    ) {

      return;

    }


    clearTimeout(
      sprayAudioStopTimer
    );


    try {

      sprayAudio.pause();

      sprayAudio.currentTime =
        0;


      const promise =
        sprayAudio.play();


      if (
        promise &&
        typeof promise.catch === "function"
      ) {

        promise.catch(
          error => {

            console.warn(
              "Dream: não foi possível tocar ./audio/spray.mp3",
              error
            );

          }
        );

      }


      sprayAudioStopTimer =
        setTimeout(
          () => {

            try {

              sprayAudio.pause();

              sprayAudio.currentTime =
                0;

            } catch {}

          },
          500
        );

    } catch (error) {

      console.warn(
        "Dream: erro no áudio do borrifador.",
        error
      );

    }

  }


  /* =========================================================
     SPRAY
  ========================================================= */

  const sprayButton =
    $("#sprayButton");

  const sprayArea =
    $("#sprayArea");

  const sprayWave =
    $("#sprayWave");

  const heroProduct =
    $("#heroProduct");

  const mainBottle =
    $("#mainBottle");

  const productHalo =
    $("#productHalo");

  const productShine =
    $("#productShine");

  const sprayCounter =
    $("#sprayCounter");


  let spraying =
    false;


  let sprayCount =
    Number(
      storage.get(
        "dreamSprayCount",
        0
      )
    ) || 0;


  if (sprayCounter) {

    sprayCounter.textContent =
      sprayCount;

  }


  function sprayDream() {

    if (
      spraying ||
      !sprayArea
    ) {

      return;

    }


    spraying =
      true;


    playSprayAudio();


    sprayCount++;


    storage.set(
      "dreamSprayCount",
      sprayCount
    );


    if (sprayCounter) {

      sprayCounter.textContent =
        sprayCount;

    }


    heroProduct?.classList.add(
      "spraying"
    );


    sprayWave?.classList.remove(
      "active"
    );


    if (sprayWave) {

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


    const intensity =
      clamp(
        $("#sprayIntensityRange")
          ?.value || 100,
        40,
        160
      ) / 100;


    const mistAmount =
      Math.round(
        60 * intensity
      );


    for (
      let i = 0;
      i < mistAmount;
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


      sprayArea.appendChild(
        mist
      );


      setTimeout(
        () => {

          mist.remove();

        },
        1900
      );

    }


    const symbols = [
      "♡",
      "✦",
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


      sprayArea.appendChild(
        particle
      );


      setTimeout(
        () => {

          particle.remove();

        },
        1900
      );

    }


    if (
      navigator.vibrate &&
      $("#hapticToggle")
        ?.checked !== false
    ) {

      navigator.vibrate(
        30
      );

    }


    showToast(
      currentLanguage === "pt-BR"
        ? "Dream está no ar ♡"
        : "Dream is in the air ♡"
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
      950
    );

  }


  sprayButton?.addEventListener(
    "click",
    event => {

      event.preventDefault();


      sprayDream();

    }
  );


  /* =========================================================
     DREAM STUDIO — ABRIR / FECHAR
  ========================================================= */

  function openStudio() {

    if (!settingsPanel) {

      console.error(
        "Dream: #settingsPanel não encontrado."
      );

      return;

    }


    settingsPanel.classList.add(
      "open"
    );


    settingsPanel.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  function closeStudio() {

    if (!settingsPanel) {
      return;
    }


    settingsPanel.classList.remove(
      "open"
    );


    settingsPanel.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  $("#settingsButton")?.addEventListener(
    "click",
    event => {

      event.preventDefault();
      event.stopPropagation();


      if (
        settingsPanel?.classList.contains(
          "open"
        )
      ) {

        closeStudio();

      } else {

        openStudio();

      }

    }
  );


  $("#closeSettings")?.addEventListener(
    "click",
    event => {

      event.preventDefault();


      closeStudio();

    }
  );


  /* =========================================================
     CURSOR GLOW
  ========================================================= */

  const cursorGlow =
    $("#cursorGlow");


  let cursorX =
    window.innerWidth / 2;

  let cursorY =
    window.innerHeight / 2;

  let glowX =
    cursorX;

  let glowY =
    cursorY;


  document.addEventListener(
    "pointermove",
    event => {

      cursorX =
        event.clientX;

      cursorY =
        event.clientY;

    },
    {
      passive: true
    }
  );


  function animateCursorGlow() {

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
      animateCursorGlow
    );

  }


  animateCursorGlow();


  /* =========================================================
     PARTÍCULAS
  ========================================================= */

  const particlesContainer =
    $("#particles");


  function generateParticles() {

    if (!particlesContainer) {
      return;
    }


    particlesContainer.innerHTML =
      "";


    const intensity =
      clamp(
        $("#particleIntensityRange")
          ?.value || 100,
        0,
        150
      );


    const amount =
      Math.round(
        25 *
        intensity /
        100
      );


    const symbols = [
      "♡",
      "✦",
      "·",
      "✿",
      "✧"
    ];


    for (
      let i = 0;
      i < amount;
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
        `${Math.random() * 100}%`;


      particle.style.fontSize =
        `${
          8 +
          Math.random() *
          16
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


      particlesContainer.appendChild(
        particle
      );

    }

  }


  generateParticles();


  /* =========================================================
     FRASCO 3D
  ========================================================= */

  heroProduct?.addEventListener(
    "pointermove",
    event => {

      if (
        !mainBottle ||
        spraying
      ) {

        return;

      }


      if (
        $("#motion3dToggle")
          ?.checked === false
      ) {

        return;

      }


      if (
        !window.matchMedia(
          "(pointer: fine)"
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
        rect.width -
        0.5;


      const y =
        (
          event.clientY -
          rect.top
        ) /
        rect.height -
        0.5;


      const intensity =
        clamp(
          $("#motion3dRange")
            ?.value || 100,
          0,
          150
        ) / 100;


      mainBottle.style.transform =
        `
        rotateY(${x * 16 * intensity}deg)
        rotateX(${y * -12 * intensity}deg)
        translate3d(
          ${x * 15 * intensity}px,
          ${y * 8 * intensity}px,
          ${30 * intensity}px
        )
        `;


      if (productHalo) {

        productHalo.style.transform =
          `
          translate(
            ${x * -25 * intensity}px,
            ${y * -20 * intensity}px
          )
          `;

      }


      if (productShine) {

        productShine.style.transform =
          `
          translate(
            ${x * 35}px,
            ${y * 25}px
          )
          `;

      }

    }
  );


  heroProduct?.addEventListener(
    "pointerleave",
    () => {

      if (mainBottle) {
        mainBottle.style.transform = "";
      }

      if (productHalo) {
        productHalo.style.transform = "";
      }

      if (productShine) {
        productShine.style.transform = "";
      }

    }
  );


  /* =========================================================
     NOTAS
  ========================================================= */

  const noteData = {

    bergamota: [
      "🍊",
      "Bergamota",
      "Cítrica, fresca e luminosa."
    ],

    laranja: [
      "🍊",
      "Laranja",
      "Alegre, cítrica e suculenta."
    ],

    mandarina: [
      "🍊",
      "Mandarina",
      "Doce, cítrica e vibrante."
    ],

    limao: [
      "🍋",
      "Limão",
      "Fresco, limpo e brilhante."
    ],

    cassis: [
      "●",
      "Cassis",
      "Frutado marcante e levemente ácido."
    ],

    maca: [
      "🍎",
      "Maçã",
      "Fresca, frutada e delicada."
    ],

    rosa: [
      "🌹",
      "Rosa",
      "Floral clássico, elegante e romântico."
    ],

    tilia: [
      "✿",
      "Tília",
      "Floral suave e confortável."
    ],

    freesia: [
      "🌸",
      "Frésia",
      "Floral leve, transparente e moderno."
    ],

    lotus: [
      "🪷",
      "Flor de Lótus",
      "Aquática, delicada e leve."
    ],

    gardenia: [
      "✿",
      "Gardênia",
      "Floral branco, cremoso e envolvente."
    ],

    pessego: [
      "🍑",
      "Pêssego",
      "Frutado macio e aveludado."
    ],

    ambar: [
      "✦",
      "Âmbar",
      "Quente, confortável e envolvente."
    ],

    sandalo: [
      "☾",
      "Sândalo",
      "Madeira cremosa, macia e elegante."
    ],

    baunilha: [
      "♡",
      "Baunilha",
      "Doce, cremosa e aconchegante."
    ],

    tonka: [
      "✧",
      "Tonka",
      "Quente, adocicada e confortável."
    ],

    musk: [
      "☁",
      "Musk",
      "Limpo, macio e próximo da pele."
    ]

  };


  $$(".note-chip").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const note =
            noteData[
              button.dataset.note
            ];


          if (!note) {
            return;
          }


          const icon =
            $("#noteModalIcon");

          const title =
            $("#noteModalTitle");

          const text =
            $("#noteModalText");


          if (icon) {
            icon.textContent = note[0];
          }

          if (title) {
            title.textContent = note[1];
          }

          if (text) {
            text.textContent = note[2];
          }


          openLayer(
            noteModal
          );

        }
      );

    }
  );


  $$(".close-note").forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();


          closeLayer(
            noteModal
          );

        }
      );

    }
  );


  noteModal?.addEventListener(
    "click",
    event => {

      if (
        event.target === noteModal
      ) {

        closeLayer(
          noteModal
        );

      }

    }
  );


  /* =========================================================
     TIMELINE
  ========================================================= */

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

    if (!timelineSlider) {
      return;
    }


    const value =
      Number(
        timelineSlider.value ||
        0
      );


    const hour =
      $("#timelineHour");


    if (hour) {

      hour.textContent =
        `${value}h`;

    }


    const stage =
      timelineStages.find(
        item =>
          value <= item[0]
      ) ||
      timelineStages[
        timelineStages.length -
        1
      ];


    if ($("#timelineIcon")) {

      $("#timelineIcon").textContent =
        stage[1];

    }


    if ($("#timelineTitle")) {

      $("#timelineTitle").textContent =
        stage[2];

    }


    if ($("#timelineText")) {

      $("#timelineText").textContent =
        stage[3];

    }

  }


  timelineSlider?.addEventListener(
    "input",
    updateTimeline
  );


  updateTimeline();
    /* =========================================================
     GALERIA
  ========================================================= */

  const galleryTrack =
    $("#galleryTrack");

  const galleryItems =
    $$(".gallery-item");

  const galleryDots =
    $("#galleryDots");

  const galleryAutoplay =
    $("#galleryAutoplay");

  const galleryAutoplayProgress =
    $("#galleryAutoplayProgress") ||
    $(".gallery-autoplay-progress i");


  let galleryIndex =
    0;

  let galleryDragging =
    false;

  let galleryMoved =
    false;

  let galleryStartX =
    0;

  let galleryStartScroll =
    0;

  let galleryAutoplayTimer =
    null;


  function updateGalleryUI() {

    $$(".gallery-dot").forEach(
      (dot, index) => {

        dot.classList.toggle(
          "active",
          index === galleryIndex
        );

      }
    );


    const current =
      $("#galleryCurrent");

    const total =
      $("#galleryTotal");


    if (current) {

      current.textContent =
        String(
          galleryIndex + 1
        ).padStart(
          2,
          "0"
        );

    }


    if (total) {

      total.textContent =
        String(
          galleryItems.length
        ).padStart(
          2,
          "0"
        );

    }

  }


  function goGallery(index) {

    if (
      !galleryTrack ||
      !galleryItems.length
    ) {

      return;

    }


    galleryIndex =
      (
        index +
        galleryItems.length
      ) %
      galleryItems.length;


    const item =
      galleryItems[
        galleryIndex
      ];


    galleryTrack.scrollTo({

      left:
        item.offsetLeft -
        galleryTrack.offsetLeft,

      behavior:
        "smooth"

    });


    updateGalleryUI();

  }


  if (galleryDots) {

    galleryDots.innerHTML =
      "";


    galleryItems.forEach(
      (_, index) => {

        const dot =
          document.createElement(
            "button"
          );


        dot.type =
          "button";


        dot.className =
          "gallery-dot";


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


        galleryDots.appendChild(
          dot
        );

      }
    );

  }


  $("#galleryNext")?.addEventListener(
    "click",
    () => {

      goGallery(
        galleryIndex + 1
      );

    }
  );


  $("#galleryPrev")?.addEventListener(
    "click",
    () => {

      goGallery(
        galleryIndex - 1
      );

    }
  );


  if (galleryTrack) {

    galleryTrack.addEventListener(
      "pointerdown",
      event => {

        if (
          event.pointerType === "touch"
        ) {

          return;

        }


        galleryDragging =
          true;

        galleryMoved =
          false;

        galleryStartX =
          event.clientX;

        galleryStartScroll =
          galleryTrack.scrollLeft;


        galleryTrack.classList.add(
          "dragging"
        );


        try {

          galleryTrack.setPointerCapture(
            event.pointerId
          );

        } catch {}

      }
    );


    galleryTrack.addEventListener(
      "pointermove",
      event => {

        if (!galleryDragging) {
          return;
        }


        const distance =
          event.clientX -
          galleryStartX;


        if (
          Math.abs(distance) > 5
        ) {

          galleryMoved =
            true;

        }


        galleryTrack.scrollLeft =
          galleryStartScroll -
          distance;

      }
    );


    const stopGalleryDrag =
      () => {

        galleryDragging =
          false;


        galleryTrack.classList.remove(
          "dragging"
        );


        setTimeout(
          () => {

            galleryMoved =
              false;

          },
          80
        );

      };


    galleryTrack.addEventListener(
      "pointerup",
      stopGalleryDrag
    );


    galleryTrack.addEventListener(
      "pointercancel",
      stopGalleryDrag
    );

  }


  function updateGalleryAutoplayLabel() {

    if (!galleryAutoplay) {
      return;
    }


    if (galleryAutoplayTimer) {

      galleryAutoplay.textContent =
        currentLanguage === "pt-BR"
          ? "❚❚ Pausar"
          : "❚❚ Pause";

    } else {

      galleryAutoplay.textContent =
        "▶ Autoplay";

    }

  }


  function resetGalleryAutoplayProgress() {

    if (!galleryAutoplayProgress) {
      return;
    }


    galleryAutoplayProgress.style.transition =
      "none";


    galleryAutoplayProgress.style.width =
      "0%";


    void galleryAutoplayProgress.offsetWidth;


    if (galleryAutoplayTimer) {

      galleryAutoplayProgress.style.transition =
        "width 3.5s linear";


      galleryAutoplayProgress.style.width =
        "100%";

    }

  }


  function stopGalleryAutoplay() {

    if (galleryAutoplayTimer) {

      clearInterval(
        galleryAutoplayTimer
      );

    }


    galleryAutoplayTimer =
      null;


    updateGalleryAutoplayLabel();


    resetGalleryAutoplayProgress();

  }


  function startGalleryAutoplay() {

    if (
      galleryAutoplayTimer ||
      !galleryItems.length
    ) {

      return;

    }


    galleryAutoplayTimer =
      setInterval(
        () => {

          goGallery(
            galleryIndex + 1
          );


          resetGalleryAutoplayProgress();

        },
        3500
      );


    updateGalleryAutoplayLabel();


    resetGalleryAutoplayProgress();

  }


  galleryAutoplay?.addEventListener(
    "click",
    () => {

      if (galleryAutoplayTimer) {

        stopGalleryAutoplay();

      } else {

        startGalleryAutoplay();

      }

    }
  );


  updateGalleryUI();

  updateGalleryAutoplayLabel();


  /* =========================================================
     LIGHTBOX
  ========================================================= */

  let lightboxIndex =
    0;


  function updateLightbox() {

    if (!galleryItems.length) {
      return;
    }


    const item =
      galleryItems[
        lightboxIndex
      ];


    if (!item) {
      return;
    }


    const image =
      $("img", item);

    const title =
      $("h3", item);


    const lightboxImage =
      $("#lightboxImage");

    const lightboxTitle =
      $("#lightboxTitle");

    const lightboxCounter =
      $("#lightboxCounter");


    if (
      lightboxImage &&
      image
    ) {

      lightboxImage.src =
        image.currentSrc ||
        image.src;


      lightboxImage.alt =
        image.alt ||
        "Dream Amor no Ar";

    }


    if (lightboxTitle) {

      lightboxTitle.textContent =
        title?.textContent?.trim() ||
        "Dream";

    }


    if (lightboxCounter) {

      lightboxCounter.textContent =
        `${
          String(
            lightboxIndex + 1
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


  function openLightbox(index) {

    if (
      !lightbox ||
      !galleryItems.length
    ) {

      return;

    }


    lightboxIndex =
      (
        index +
        galleryItems.length
      ) %
      galleryItems.length;


    updateLightbox();


    openLayer(
      lightbox
    );

  }


  function closeLightbox() {

    closeLayer(
      lightbox
    );

  }


  function nextLightbox() {

    openLightbox(
      lightboxIndex + 1
    );

  }


  function prevLightbox() {

    openLightbox(
      lightboxIndex - 1
    );

  }


  galleryItems.forEach(
    (item, index) => {

      item.addEventListener(
        "click",
        event => {

          if (galleryMoved) {
            return;
          }


          event.preventDefault();


          openLightbox(
            index
          );

        }
      );

    }
  );


  $("#lightboxClose")?.addEventListener(
    "click",
    closeLightbox
  );


  $("#lightboxBackdrop")?.addEventListener(
    "click",
    closeLightbox
  );


  $("#lightboxNext")?.addEventListener(
    "click",
    nextLightbox
  );


  $("#lightboxPrev")?.addEventListener(
    "click",
    prevLightbox
  );


  lightbox?.addEventListener(
    "click",
    event => {

      if (
        event.target === lightbox
      ) {

        closeLightbox();

      }

    }
  );


  /* =========================================================
     MOODS
  ========================================================= */

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


  function hexToRgb(hex) {

    let clean =
      String(hex)
        .replace(
          "#",
          ""
        )
        .trim();


    if (
      clean.length === 3
    ) {

      clean =
        clean
          .split("")
          .map(
            char =>
              char + char
          )
          .join("");

    }


    const value =
      parseInt(
        clean,
        16
      );


    if (
      Number.isNaN(value)
    ) {

      return {
        r: 223,
        g: 118,
        b: 168
      };

    }


    return {

      r:
        value >> 16 & 255,

      g:
        value >> 8 & 255,

      b:
        value & 255

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


    if ($("#primaryColor")) {

      $("#primaryColor").value =
        primary;

    }


    if ($("#secondaryColor")) {

      $("#secondaryColor").value =
        secondary;

    }


    if (save) {

      storage.set(
        "dreamPrimary",
        primary
      );


      storage.set(
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

          const mood =
            moods[
              button.dataset.mood
            ];


          if (!mood) {
            return;
          }


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


          applyColors(
            mood[0],
            mood[1]
          );

        }
      );

    }
  );


  $$(".palette").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const palette =
            palettes[
              button.dataset.palette
            ];


          if (!palette) {
            return;
          }


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


          applyColors(
            palette[0],
            palette[1]
          );

        }
      );

    }
  );


  $("#primaryColor")?.addEventListener(
    "input",
    event => {

      applyColors(

        event.target.value,

        $("#secondaryColor")
          ?.value ||
        "#9562dc"

      );

    }
  );


  $("#secondaryColor")?.addEventListener(
    "input",
    event => {

      applyColors(

        $("#primaryColor")
          ?.value ||
        "#df76a8",

        event.target.value

      );

    }
  );


  /* =========================================================
     TEMA
  ========================================================= */

  function setDark(
    active,
    save = true
  ) {

    body.classList.toggle(
      "dark",
      active
    );


    const darkToggle =
      $("#darkToggle");


    const themeButton =
      $("#themeButton");


    if (darkToggle) {

      darkToggle.checked =
        active;

    }


    if (themeButton) {

      themeButton.textContent =
        active
          ? "☀"
          : "☾";

    }


    if (save) {

      storage.set(
        "dreamDark",
        active
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


  /* =========================================================
     TOGGLES
  ========================================================= */

  $("#particlesToggle")?.addEventListener(
    "change",
    event => {

      body.classList.toggle(
        "no-particles",
        !event.target.checked
      );


      storage.set(
        "dreamParticles",
        event.target.checked
      );

    }
  );


  $("#animationsToggle")?.addEventListener(
    "change",
    event => {

      body.classList.toggle(
        "no-animations",
        !event.target.checked
      );


      storage.set(
        "dreamAnimations",
        event.target.checked
      );

    }
  );


  $("#cursorToggle")?.addEventListener(
    "change",
    event => {

      body.classList.toggle(
        "no-cursor",
        !event.target.checked
      );


      storage.set(
        "dreamCursor",
        event.target.checked
      );

    }
  );


  $("#glassToggle")?.addEventListener(
    "change",
    event => {

      body.classList.toggle(
        "no-glass",
        !event.target.checked
      );


      storage.set(
        "dreamGlass",
        event.target.checked
      );

    }
  );


  $("#cleanModeToggle")?.addEventListener(
    "change",
    event => {

      body.classList.toggle(
        "clean-mode",
        event.target.checked
      );


      storage.set(
        "dreamClean",
        event.target.checked
      );

    }
  );


  $("#motion3dToggle")?.addEventListener(
    "change",
    event => {

      storage.set(
        "dreamMotion3D",
        event.target.checked
      );


      if (
        !event.target.checked &&
        mainBottle
      ) {

        mainBottle.style.transform =
          "";

      }

    }
  );


  $("#hapticToggle")?.addEventListener(
    "change",
    event => {

      storage.set(
        "dreamHaptic",
        event.target.checked
      );

    }
  );


  $("#spraySoundToggle")?.addEventListener(
    "change",
    event => {

      storage.set(
        "dreamSpraySound",
        event.target.checked
      );

    }
  );


  /* =========================================================
     PERFORMANCE
  ========================================================= */

  function setPerformance(
    active,
    save = true
  ) {

    body.classList.toggle(
      "performance-mode",
      active
    );


    const toggle =
      $("#performanceToggle");


    if (toggle) {

      toggle.checked =
        active;

    }


    if (save) {

      storage.set(
        "dreamPerformance",
        active
      );

    }

  }


  $("#performanceToggle")?.addEventListener(
    "change",
    event => {

      setPerformance(
        event.target.checked
      );

    }
  );


  /* =========================================================
     RANGES
  ========================================================= */

  function bindRange(
    inputId,
    valueId,
    storageKey,
    min,
    max,
    callback
  ) {

    const input =
      $(`#${inputId}`);

    const output =
      $(`#${valueId}`);


    if (!input) {
      return;
    }


    function apply(
      value,
      save = true
    ) {

      const safe =
        clamp(
          value,
          min,
          max
        );


      input.value =
        safe;


      if (output) {

        output.textContent =
          `${Math.round(safe)}%`;

      }


      if (save) {

        storage.set(
          storageKey,
          safe
        );

      }


      if (callback) {

        callback(
          safe
        );

      }

    }


    input.addEventListener(
      "input",
      event => {

        apply(
          event.target.value
        );

      }
    );


    apply(
      storage.get(
        storageKey,
        input.value
      ),
      false
    );

  }


  bindRange(
    "animationSpeed",
    "animationSpeedValue",
    "dreamAnimationSpeed",
    40,
    160,
    value => {

      root.style.setProperty(
        "--animation-speed",
        value / 100
      );

    }
  );


  bindRange(
    "motion3dRange",
    "motion3dValue",
    "dreamMotion3DIntensity",
    0,
    150
  );


  bindRange(
    "cursorGlowRange",
    "cursorGlowValue",
    "dreamCursorGlowIntensity",
    0,
    150,
    value => {

      root.style.setProperty(
        "--cursor-glow-intensity",
        value / 100
      );

    }
  );


  bindRange(
    "particleIntensityRange",
    "particleIntensityValue",
    "dreamParticleIntensity",
    0,
    150,
    () => {

      generateParticles();

    }
  );


  bindRange(
    "sprayIntensityRange",
    "sprayIntensityValue",
    "dreamSprayIntensity",
    40,
    160,
    value => {

      root.style.setProperty(
        "--spray-intensity",
        value / 100
      );

    }
  );


  bindRange(
    "contrastControl",
    "contrastValue",
    "dreamContrast",
    80,
    130,
    value => {

      body.style.filter =
        `contrast(${value / 100})`;

    }
  );


  /* =========================================================
     TAMANHO DA FONTE
  ========================================================= */

  function setFontSize(size) {

    const allowed = [
      "small",
      "normal",
      "large"
    ];


    const safe =
      allowed.includes(
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


    $$("[data-font-size]").forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.fontSize === safe
        );

      }
    );


    storage.set(
      "dreamFontSize",
      safe
    );

  }


  $$("[data-font-size]").forEach(
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
    /* =========================================================
     QUIZ
  ========================================================= */

  const quizQuestions = [

    {
      pt:
        "Qual momento combina mais com você?",

      en:
        "Which moment suits you best?",

      answers: [

        [
          "Encontro romântico ♡",
          "Romantic date ♡",
          "romantico"
        ],

        [
          "Noite olhando o céu ☾",
          "Night under the sky ☾",
          "sonhador"
        ],

        [
          "Uma festa ✦",
          "A party ✦",
          "energia"
        ],

        [
          "Momento tranquilo ☁",
          "A peaceful moment ☁",
          "calmo"
        ]

      ]

    },

    {
      pt:
        "Escolha uma sensação.",

      en:
        "Choose a feeling.",

      answers: [

        [
          "Romance",
          "Romance",
          "romantico"
        ],

        [
          "Liberdade",
          "Freedom",
          "sonhador"
        ],

        [
          "Intensidade",
          "Intensity",
          "energia"
        ],

        [
          "Conforto",
          "Comfort",
          "calmo"
        ]

      ]

    },

    {
      pt:
        "Escolha um símbolo.",

      en:
        "Choose a symbol.",

      answers: [

        [
          "♡ Coração",
          "♡ Heart",
          "romantico"
        ],

        [
          "☾ Lua",
          "☾ Moon",
          "sonhador"
        ],

        [
          "✦ Estrela",
          "✦ Star",
          "energia"
        ],

        [
          "☁ Nuvem",
          "☁ Cloud",
          "calmo"
        ]

      ]

    },

    {
      pt:
        "Escolha seu cenário Dream.",

      en:
        "Choose your Dream setting.",

      answers: [

        [
          "Jardim florido",
          "Flower garden",
          "romantico"
        ],

        [
          "Céu estrelado",
          "Starry sky",
          "sonhador"
        ],

        [
          "Cidade iluminada",
          "City lights",
          "energia"
        ],

        [
          "Fim de tarde",
          "Sunset",
          "calmo"
        ]

      ]

    }

  ];


  const quizResults = {

    romantico: {

      icon:
        "♡",

      title:
        "Dream Lover",

      pt:
        "Romântico, delicado e apaixonado pelos pequenos detalhes.",

      en:
        "Romantic, delicate and in love with the little details."

    },

    sonhador: {

      icon:
        "☾",

      title:
        "Dreamer",

      pt:
        "Você gosta de imaginar e transformar momentos em lembranças.",

      en:
        "You love imagining and turning moments into memories."

    },

    energia: {

      icon:
        "✦",

      title:
        "Dream Energy",

      pt:
        "Uma personalidade vibrante e cheia de energia.",

      en:
        "A vibrant personality full of energy."

    },

    calmo: {

      icon:
        "☁",

      title:
        "Soft Dream",

      pt:
        "Você valoriza conforto, tranquilidade e leveza.",

      en:
        "You value comfort, tranquility and softness."

    }

  };


  let quizIndex =
    0;

  let quizScore =
    {};

  let quizWinner =
    null;


  function startQuiz() {

    quizIndex =
      0;


    quizWinner =
      null;


    quizScore = {

      romantico:
        0,

      sonhador:
        0,

      energia:
        0,

      calmo:
        0

    };


    if ($("#quizStart")) {

      $("#quizStart").hidden =
        true;

    }


    if ($("#quizQuestions")) {

      $("#quizQuestions").hidden =
        false;

    }


    if ($("#quizResult")) {

      $("#quizResult").hidden =
        true;

    }


    renderQuiz();

  }


  function renderQuiz() {

    const question =
      quizQuestions[
        quizIndex
      ];


    if (!question) {
      return;
    }


    const questionElement =
      $("#quizQuestion");


    if (questionElement) {

      questionElement.textContent =
        currentLanguage === "pt-BR"
          ? question.pt
          : question.en;

    }


    const step =
      $("#quizStep") ||
      $("#quizCounter");


    if (step) {

      step.textContent =
        `${
          quizIndex + 1
        } / ${
          quizQuestions.length
        }`;

    }


    const progress =
      $("#quizProgressBar") ||
      $("#quizProgress");


    if (progress) {

      const percent =
        (
          (
            quizIndex + 1
          ) /
          quizQuestions.length
        ) *
        100;


      if (
        progress.tagName === "PROGRESS"
      ) {

        progress.value =
          percent;

      } else {

        progress.style.width =
          `${percent}%`;

      }

    }


    const options =
      $("#quizOptions");


    if (!options) {
      return;
    }


    options.innerHTML =
      "";


    question.answers.forEach(
      answer => {

        const button =
          document.createElement(
            "button"
          );


        button.type =
          "button";


        button.textContent =
          currentLanguage === "pt-BR"
            ? answer[0]
            : answer[1];


        button.addEventListener(
          "click",
          () => {

            quizScore[
              answer[2]
            ]++;


            quizIndex++;


            if (
              quizIndex >=
              quizQuestions.length
            ) {

              finishQuiz();

            } else {

              renderQuiz();

            }

          }
        );


        options.appendChild(
          button
        );

      }
    );

  }


  function finishQuiz() {

    if ($("#quizQuestions")) {

      $("#quizQuestions").hidden =
        true;

    }


    if ($("#quizResult")) {

      $("#quizResult").hidden =
        false;

    }


    quizWinner =
      Object.entries(
        quizScore
      )
      .sort(
        (a, b) =>
          b[1] -
          a[1]
      )[0]?.[0] ||
      "romantico";


    const result =
      quizResults[
        quizWinner
      ];


    if ($("#quizResultIcon")) {

      $("#quizResultIcon").textContent =
        result.icon;

    }


    if ($("#quizResultTitle")) {

      $("#quizResultTitle").textContent =
        result.title;

    }


    if ($("#quizResultText")) {

      $("#quizResultText").textContent =
        currentLanguage === "pt-BR"
          ? result.pt
          : result.en;

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


  $("#quizRestart")?.addEventListener(
    "click",
    startQuiz
  );


  $("#applyQuizMood")?.addEventListener(
    "click",
    () => {

      if (
        !quizWinner ||
        !moods[
          quizWinner
        ]
      ) {

        return;

      }


      const mood =
        moods[
          quizWinner
        ];


      applyColors(
        mood[0],
        mood[1]
      );


      showToast(
        currentLanguage === "pt-BR"
          ? "Seu mood foi aplicado ♡"
          : "Your mood was applied ♡"
      );

    }
  );


  $("#quizApplyMood")?.addEventListener(
    "click",
    () => {

      $("#applyQuizMood")?.click();

    }
  );


  $("#shareQuizResult")?.addEventListener(
    "click",
    async () => {

      if (!quizWinner) {
        return;
      }


      const result =
        quizResults[
          quizWinner
        ];


      const text =
        currentLanguage === "pt-BR"
          ? `Meu resultado no Dream Quiz foi ${result.title} ♡`
          : `My Dream Quiz result is ${result.title} ♡`;


      try {

        if (navigator.share) {

          await navigator.share({

            title:
              "Dream Quiz",

            text,

            url:
              window.location.href

          });

        } else if (
          navigator.clipboard
        ) {

          await navigator.clipboard.writeText(
            text
          );


          showToast(
            currentLanguage === "pt-BR"
              ? "Resultado copiado ♡"
              : "Result copied ♡"
          );

        }

      } catch {}

    }
  );


  /* =========================================================
     CENÁRIOS
  ========================================================= */

  const scenes = {

    romance: {

      icon:
        "♡",

      ptTitle:
        "Amor está no ar.",

      enTitle:
        "Love is in the air.",

      ptText:
        "Uma atmosfera delicada, rosa e envolvente.",

      enText:
        "A delicate, romantic and captivating atmosphere.",

      background:
        `
        radial-gradient(
          circle at 20% 50%,
          rgba(255,111,169,.40),
          transparent 38%
        ),
        radial-gradient(
          circle at 80% 40%,
          rgba(169,92,221,.30),
          transparent 42%
        ),
        linear-gradient(
          135deg,
          #1c0d18,
          #35152c
        )
        `

    },

    ceu: {

      icon:
        "☾",

      ptTitle:
        "Noite estrelada",

      enTitle:
        "Starry night",

      ptText:
        "Uma sensação misteriosa, sonhadora e cheia de possibilidades.",

      enText:
        "A mysterious, dreamy feeling full of possibilities.",

      background:
        `
        radial-gradient(
          circle at 25% 25%,
          rgba(111,95,255,.30),
          transparent 35%
        ),
        radial-gradient(
          circle at 75% 60%,
          rgba(73,133,255,.24),
          transparent 40%
        ),
        linear-gradient(
          135deg,
          #090b1e,
          #211346
        )
        `

    },

    flores: {

      icon:
        "✿",

      ptTitle:
        "Jardim Dream",

      enTitle:
        "Dream Garden",

      ptText:
        "Floral, romântico e delicado para deixar o momento mais especial.",

      enText:
        "Floral, romantic and delicate to make the moment more special.",

      background:
        `
        radial-gradient(
          circle at 20% 65%,
          rgba(251,113,133,.30),
          transparent 35%
        ),
        radial-gradient(
          circle at 80% 30%,
          rgba(245,158,11,.25),
          transparent 40%
        ),
        linear-gradient(
          135deg,
          #1a1018,
          #35211c
        )
        `

    },

    energia: {

      icon:
        "✦",

      ptTitle:
        "Dream Energy",

      enTitle:
        "Dream Energy",

      ptText:
        "Uma atmosfera mais vibrante, intensa e cheia de personalidade.",

      enText:
        "A more vibrant and intense atmosphere full of personality.",

      background:
        `
        radial-gradient(
          circle at 20% 50%,
          rgba(69,196,170,.28),
          transparent 38%
        ),
        radial-gradient(
          circle at 80% 40%,
          rgba(82,133,197,.28),
          transparent 42%
        ),
        linear-gradient(
          135deg,
          #101a1c,
          #172c35
        )
        `

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


          if (!scene) {
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


          if (dreamSceneBg) {

            dreamSceneBg.style.background =
              scene.background;

          }


          if ($("#sceneResultIcon")) {

            $("#sceneResultIcon").textContent =
              scene.icon;

          }


          if ($("#sceneResultTitle")) {

            $("#sceneResultTitle").textContent =
              currentLanguage === "pt-BR"
                ? scene.ptTitle
                : scene.enTitle;

          }


          if ($("#sceneResultText")) {

            $("#sceneResultText").textContent =
              currentLanguage === "pt-BR"
                ? scene.ptText
                : scene.enText;

          }

        }
      );

    }
  );


  /* =========================================================
     DREAM MOMENT
  ========================================================= */

  const dreamMoments = [

    {
      icon:
        "♡",

      ptTitle:
        "O amor mora nos detalhes.",

      enTitle:
        "Love lives in the details.",

      ptText:
        "Alguns momentos ficam especiais justamente porque parecem simples.",

      enText:
        "Some moments become special precisely because they seem simple."
    },

    {
      icon:
        "✦",

      ptTitle:
        "Transforme o comum.",

      enTitle:
        "Transform the ordinary.",

      ptText:
        "Uma fragrância pode fazer um instante comum virar uma lembrança.",

      enText:
        "A fragrance can turn an ordinary instant into a memory."
    },

    {
      icon:
        "☾",

      ptTitle:
        "Leve o Dream com você.",

      enTitle:
        "Take Dream with you.",

      ptText:
        "Crie sua própria atmosfera e deixe o momento falar por si.",

      enText:
        "Create your own atmosphere and let the moment speak for itself."
    },

    {
      icon:
        "☁",

      ptTitle:
        "Desacelere um pouco.",

      enTitle:
        "Slow down for a moment.",

      ptText:
        "Nem todo momento especial precisa ser planejado.",

      enText:
        "Not every special moment needs to be planned."
    }

  ];


  $("#newDreamMoment")?.addEventListener(
    "click",
    () => {

      const moment =
        dreamMoments[
          Math.floor(
            Math.random() *
            dreamMoments.length
          )
        ];


      if ($(".dream-moment-icon")) {

        $(".dream-moment-icon").textContent =
          moment.icon;

      }


      if ($("#dreamMomentTitle")) {

        $("#dreamMomentTitle").textContent =
          currentLanguage === "pt-BR"
            ? moment.ptTitle
            : moment.enTitle;

      }


      if ($("#dreamMomentText")) {

        $("#dreamMomentText").textContent =
          currentLanguage === "pt-BR"
            ? moment.ptText
            : moment.enText;

      }

    }
  );


  /* =========================================================
     CARDS 3D
  ========================================================= */

  $$(".moment-card").forEach(
    card => {

      card.addEventListener(
        "pointermove",
        event => {

          if (
            !window.matchMedia(
              "(pointer:fine)"
            ).matches
          ) {

            return;

          }


          if (
            $("#motion3dToggle")
              ?.checked === false
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
            rect.width -
            0.5;


          const y =
            (
              event.clientY -
              rect.top
            ) /
            rect.height -
            0.5;


          const factor =
            clamp(
              $("#motion3dRange")
                ?.value || 100,
              0,
              150
            ) /
            100;


          card.style.transform =
            `
            perspective(800px)
            translateY(-7px)
            rotateX(${y * -7 * factor}deg)
            rotateY(${x * 7 * factor}deg)
            `;

        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.transform =
            "";

        }
      );

    }
  );


  /* =========================================================
     MÚSICA
  ========================================================= */

  const dreamMusic =
    $("#dreamMusic");

  const dreamMusicButton =
    $("#dreamMusicButton");

  const musicMuteButton =
    $("#musicMuteButton");

  const musicProgress =
    $("#musicProgress");

  const musicCurrentTime =
    $("#musicCurrentTime");

  const musicDuration =
    $("#musicDuration");

  const musicToggle =
    $("#musicToggle");

  const musicVolumeRange =
    $("#musicVolumeRange");

  const musicVolumeValue =
    $("#musicVolumeValue");


  function formatTime(seconds) {

    if (
      !Number.isFinite(
        seconds
      )
    ) {

      return "0:00";

    }


    const minutes =
      Math.floor(
        seconds / 60
      );


    const secs =
      Math.floor(
        seconds % 60
      );


    return `${minutes}:${String(
      secs
    ).padStart(
      2,
      "0"
    )}`;

  }


  function updateMusicUI() {

    if (!dreamMusic) {
      return;
    }


    const playing =
      !dreamMusic.paused;


    body.classList.toggle(
      "music-playing",
      playing
    );


    $("#dreamMusicPlayer")
      ?.classList.toggle(
        "playing",
        playing
      );


    if (dreamMusicButton) {

      dreamMusicButton.textContent =
        playing
          ? "❚❚"
          : "▶";

    }


    if (musicToggle) {

      musicToggle.checked =
        playing;

    }

  }


  async function playMusic() {

    if (!dreamMusic) {
      return;
    }


    try {

      await dreamMusic.play();


      updateMusicUI();

    } catch {

      showToast(
        currentLanguage === "pt-BR"
          ? "Clique novamente para tocar a música"
          : "Click again to play the music"
      );

    }

  }


  function pauseMusic() {

    dreamMusic?.pause();


    updateMusicUI();

  }


  dreamMusicButton?.addEventListener(
    "click",
    () => {

      if (!dreamMusic) {
        return;
      }


      if (dreamMusic.paused) {

        playMusic();

      } else {

        pauseMusic();

      }

    }
  );


  musicToggle?.addEventListener(
    "change",
    event => {

      if (event.target.checked) {

        playMusic();

      } else {

        pauseMusic();

      }

    }
  );


  dreamMusic?.addEventListener(
    "play",
    updateMusicUI
  );


  dreamMusic?.addEventListener(
    "pause",
    updateMusicUI
  );


  dreamMusic?.addEventListener(
    "loadedmetadata",
    () => {

      if (musicDuration) {

        musicDuration.textContent =
          formatTime(
            dreamMusic.duration
          );

      }

    }
  );


  dreamMusic?.addEventListener(
    "timeupdate",
    () => {

      if (musicCurrentTime) {

        musicCurrentTime.textContent =
          formatTime(
            dreamMusic.currentTime
          );

      }


      if (
        musicProgress &&
        dreamMusic.duration
      ) {

        musicProgress.value =
          dreamMusic.currentTime /
          dreamMusic.duration *
          100;

      }

    }
  );


  musicProgress?.addEventListener(
    "input",
    event => {

      if (
        !dreamMusic ||
        !dreamMusic.duration
      ) {

        return;

      }


      dreamMusic.currentTime =
        Number(
          event.target.value
        ) /
        100 *
        dreamMusic.duration;

    }
  );


  musicMuteButton?.addEventListener(
    "click",
    () => {

      if (!dreamMusic) {
        return;
      }


      dreamMusic.muted =
        !dreamMusic.muted;


      musicMuteButton.textContent =
        dreamMusic.muted
          ? "🔇"
          : "🔊";

    }
  );


  function setMusicVolume(
    value,
    save = true
  ) {

    const safe =
      clamp(
        value,
        0,
        100
      );


    if (dreamMusic) {

      dreamMusic.volume =
        safe / 100;

    }


    if (musicVolumeRange) {

      musicVolumeRange.value =
        safe;

    }


    if (musicVolumeValue) {

      musicVolumeValue.textContent =
        `${Math.round(
          safe
        )}%`;

    }


    if (save) {

      storage.set(
        "dreamMusicVolume",
        safe
      );

    }

  }


  musicVolumeRange?.addEventListener(
    "input",
    event => {

      setMusicVolume(
        event.target.value
      );

    }
  );


  /* =========================================================
     PRESETS
  ========================================================= */

  const presets = {

    dream: {

      primary:
        "#df76a8",

      secondary:
        "#9562dc",

      dark:
        false,

      clean:
        false,

      performance:
        false

    },

    cinematic: {

      primary:
        "#a855f7",

      secondary:
        "#312e81",

      dark:
        true,

      clean:
        false,

      performance:
        false

    },

    soft: {

      primary:
        "#f2a6c8",

      secondary:
        "#a78bfa",

      dark:
        false,

      clean:
        true,

      performance:
        false

    },

    performance: {

      primary:
        "#df76a8",

      secondary:
        "#9562dc",

      dark:
        false,

      clean:
        false,

      performance:
        true

    }

  };


  $$(".preset-button").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const preset =
            presets[
              button.dataset.preset
            ];


          if (!preset) {
            return;
          }


          $$(".preset-button").forEach(
            item => {

              item.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );


          applyColors(
            preset.primary,
            preset.secondary
          );


          setDark(
            preset.dark
          );


          body.classList.toggle(
            "clean-mode",
            preset.clean
          );


          if ($("#cleanModeToggle")) {

            $("#cleanModeToggle").checked =
              preset.clean;

          }


          storage.set(
            "dreamClean",
            preset.clean
          );


          setPerformance(
            preset.performance
          );

        }
      );

    }
  );


  /* =========================================================
     COMPARTILHAR
  ========================================================= */

  async function sharePage() {

    const data = {

      title:
        document.title,

      text:
        currentLanguage === "pt-BR"
          ? "Dream Amor no Ar"
          : "Dream Love in the Air",

      url:
        window.location.href

    };


    try {

      if (navigator.share) {

        await navigator.share(
          data
        );

      } else if (
        navigator.clipboard &&
        window.isSecureContext
      ) {

        await navigator.clipboard.writeText(
          window.location.href
        );


        showToast(
          currentLanguage === "pt-BR"
            ? "Link copiado ♡"
            : "Link copied ♡"
        );

      } else {

        window.prompt(
          currentLanguage === "pt-BR"
            ? "Copie o link:"
            : "Copy the link:",
          window.location.href
        );

      }

    } catch {}

  }


  $("#shareButton")?.addEventListener(
    "click",
    sharePage
  );


  $("#shareModal")?.addEventListener(
    "click",
    sharePage
  );


  /* =========================================================
     TELA CHEIA
  ========================================================= */

  $("#fullscreenButton")?.addEventListener(
    "click",
    async () => {

      try {

        if (
          !document.fullscreenElement
        ) {

          await document.documentElement
            .requestFullscreen();

        } else {

          await document.exitFullscreen();

        }

      } catch {}

    }
  );


  /* =========================================================
     SECTION INDICATOR
  ========================================================= */

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


    const number =
      sections.indexOf(
        current
      ) +
      1;


    let label =
      current.dataset.sectionName ||
      current.id;


    if (
      currentLanguage === "en-US"
    ) {

      const names = {

        inicio:
          "Home",

        produto:
          "Product",

        campanha:
          "Campaign",

        notas:
          "Notes",

        experiencia:
          "Experience",

        sensacao:
          "Feeling",

        "quando-usar":
          "Moments",

        momentos:
          "Moments",

        galeria:
          "Gallery",

        mood:
          "Mood",

        quiz:
          "Quiz"

      };


      label =
        names[
          current.id
        ] ||
        label;

    }


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


  /* =========================================================
     CARREGAR CONFIGURAÇÕES
  ========================================================= */

  function readBool(
    key,
    fallback
  ) {

    const value =
      storage.get(
        key,
        null
      );


    if (value === null) {
      return fallback;
    }


    return value === "true";

  }


  function loadSettings() {

    applyColors(

      storage.get(
        "dreamPrimary",
        "#df76a8"
      ),

      storage.get(
        "dreamSecondary",
        "#9562dc"
      ),

      false

    );


    setDark(
      readBool(
        "dreamDark",
        false
      ),
      false
    );


    const particleState =
      readBool(
        "dreamParticles",
        true
      );


    if ($("#particlesToggle")) {

      $("#particlesToggle").checked =
        particleState;

    }


    body.classList.toggle(
      "no-particles",
      !particleState
    );


    const animationsState =
      readBool(
        "dreamAnimations",
        true
      );


    if ($("#animationsToggle")) {

      $("#animationsToggle").checked =
        animationsState;

    }


    body.classList.toggle(
      "no-animations",
      !animationsState
    );


    const cursorState =
      readBool(
        "dreamCursor",
        true
      );


    if ($("#cursorToggle")) {

      $("#cursorToggle").checked =
        cursorState;

    }


    body.classList.toggle(
      "no-cursor",
      !cursorState
    );


    const glassState =
      readBool(
        "dreamGlass",
        true
      );


    if ($("#glassToggle")) {

      $("#glassToggle").checked =
        glassState;

    }


    body.classList.toggle(
      "no-glass",
      !glassState
    );


    const cleanState =
      readBool(
        "dreamClean",
        false
      );


    if ($("#cleanModeToggle")) {

      $("#cleanModeToggle").checked =
        cleanState;

    }


    body.classList.toggle(
      "clean-mode",
      cleanState
    );


    setPerformance(
      readBool(
        "dreamPerformance",
        false
      ),
      false
    );


    if ($("#motion3dToggle")) {

      $("#motion3dToggle").checked =
        readBool(
          "dreamMotion3D",
          true
        );

    }


    if ($("#hapticToggle")) {

      $("#hapticToggle").checked =
        readBool(
          "dreamHaptic",
          true
        );

    }


    if ($("#spraySoundToggle")) {

      $("#spraySoundToggle").checked =
        readBool(
          "dreamSpraySound",
          true
        );

    }


    setFontSize(
      storage.get(
        "dreamFontSize",
        "normal"
      )
    );


    setMusicVolume(
      storage.get(
        "dreamMusicVolume",
        35
      ),
      false
    );


    generateParticles();


    updateMusicUI();

  }


  /* =========================================================
     RESET
  ========================================================= */

  $("#resetSettings")?.addEventListener(
    "click",
    () => {

      const keys = [

        "dreamPrimary",
        "dreamSecondary",
        "dreamDark",
        "dreamParticles",
        "dreamAnimations",
        "dreamCursor",
        "dreamGlass",
        "dreamClean",
        "dreamPerformance",
        "dreamMotion3D",
        "dreamHaptic",
        "dreamSpraySound",
        "dreamAnimationSpeed",
        "dreamMotion3DIntensity",
        "dreamCursorGlowIntensity",
        "dreamParticleIntensity",
        "dreamSprayIntensity",
        "dreamContrast",
        "dreamFontSize",
        "dreamMusicVolume"

      ];


      keys.forEach(
        key => {

          storage.remove(
            key
          );

        }
      );


      showToast(
        currentLanguage === "pt-BR"
          ? "Configurações restauradas ♡"
          : "Settings restored ♡"
      );


      setTimeout(
        () => {

          window.location.reload();

        },
        500
      );

    }
  );


  /* =========================================================
     TECLADO
  ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      const target =
        event.target;


      const typing =
        target instanceof HTMLElement &&
        target.matches(
          "input, textarea, select, [contenteditable='true']"
        );


      if (
        event.key === "Escape"
      ) {

        closeProductModal();

        closeLayer(
          noteModal
        );

        closeLightbox();

        closeStudio();

        menu?.classList.remove(
          "open"
        );


        menuMobile?.setAttribute(
          "aria-expanded",
          "false"
        );


        return;

      }


      if (typing) {
        return;
      }


      if (
        lightbox?.classList.contains(
          "open"
        )
      ) {

        if (
          event.key === "ArrowRight"
        ) {

          nextLightbox();

        }


        if (
          event.key === "ArrowLeft"
        ) {

          prevLightbox();

        }

      }


      switch (
        event.key.toLowerCase()
      ) {

        case "s":

          sprayDream();

          break;


        case "m":

          dreamMusicButton?.click();

          break;


        case "d":

          $("#themeButton")?.click();

          break;


        case "g":

          if (
            settingsPanel?.classList.contains(
              "open"
            )
          ) {

            closeStudio();

          } else {

            openStudio();

          }

          break;

      }

    }
  );


  /* =========================================================
     VISIBILITY
  ========================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden &&
        galleryAutoplayTimer
      ) {

        stopGalleryAutoplay();

      }

    }
  );


  /* =========================================================
     RESIZE
  ========================================================= */

  let resizeTimer =
    null;


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

            updateSectionIndicator();


            if (
              window.innerWidth > 900
            ) {

              menu?.classList.remove(
                "open"
              );


              menuMobile?.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          },
          120
        );

    },
    {
      passive: true
    }
  );


  /* =========================================================
     API GLOBAL / TESTE
  ========================================================= */

  window.Dream = {

    spray:
      sprayDream,

    setLanguage,

    setDark,

    showToast,

    openProduct:
      openProductModal,

    closeProduct:
      closeProductModal,

    openStudio,

    closeStudio,

    openGallery:
      () => {

        openLightbox(
          0
        );

      }

  };


  /* =========================================================
     INICIALIZAÇÃO
  ========================================================= */

  loadSettings();

  updateScroll();

  updateTimeline();

  updateGalleryUI();

  updateSectionIndicator();

  updateFavorite();


  console.log(
    "%cDream JS carregado ✓",
    "color:#df76a8;font-size:17px;font-weight:800;"
  );


  console.log(
    "Botões .open-product encontrados:",
    document.querySelectorAll(
      ".open-product"
    ).length
  );


  console.log(
    "productModal encontrado:",
    Boolean(
      productModal
    )
  );


}); // FIM DO DOMContentLoaded