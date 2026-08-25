"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  const body = document.body;
  const root = document.documentElement;

  const clamp = (v, min, max) =>
    Math.min(
      max,
      Math.max(
        min,
        Number(v) || 0
      )
    );


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

        localStorage.removeItem(
          key
        );

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

  const sectionIndicator =
    $("#sectionIndicator");


  /* =========================================================
     TOAST
  ========================================================= */

  let toastTimer =
    null;


  function showToast(message) {

    if (
      !toast ||
      !message
    ) {

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

  let loaderClosed =
    false;


  function closeLoader() {

    if (
      !loader ||
      loaderClosed
    ) {

      return;

    }


    loaderClosed =
      true;


    loader.classList.add(
      "hide"
    );


    body.classList.add(
      "site-ready"
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
        300
      );

    }
  );


  setTimeout(
    closeLoader,
    4500
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


  backTop?.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  updateScroll();


  /* =========================================================
     MENU
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


      menu.classList.remove(
        "open"
      );


      menuMobile.setAttribute(
        "aria-expanded",
        "false"
      );

    }
  );


  /* =========================================================
     LINKS INTERNOS
  ========================================================= */

  $$('a[href^="#"]').forEach(
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
            href === "#"
          ) {

            return;

          }


          let target =
            null;


          try {

            target =
              document.querySelector(
                href
              );

          } catch {

            return;

          }


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({

            behavior:
              body.classList.contains(
                "no-animations"
              )
                ? "auto"
                : "smooth",

            block:
              "start"

          });

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

    const observer =
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


              observer.unobserve(
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

        observer.observe(
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
     METERS
  ========================================================= */

  $$("[data-meter]").forEach(
    meter => {

      const value =
        clamp(
          meter.dataset.meter,
          0,
          100
        );


      meter.style.width =
        `${value}%`;

    }
  );


  $$(".feeling-meter-fill").forEach(
    meter => {

      const value =
        clamp(
          meter.dataset.feeling,
          0,
          100
        );


      meter.style.width =
        `${value}%`;

    }
  );


  /* =========================================================
     CURSOR
  ========================================================= */

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


  function animateCursor() {

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
      animateCursor
    );

  }


  animateCursor();


  /* =========================================================
     PARTÍCULAS
  ========================================================= */

  const particlesContainer =
    $("#particles");


  function generateParticles() {

    if (
      !particlesContainer
    ) {

      return;

    }


    particlesContainer.innerHTML =
      "";


    const intensity =
      clamp(
        $("#particleIntensityRange")
          ?.value ||
        storage.get(
          "dreamParticleIntensity",
          100
        ),
        0,
        150
      );


    const base =
      innerWidth <= 650
        ? 12
        : 25;


    const amount =
      Math.round(
        base *
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
          15
        }px`;


      particle.style.setProperty(
        "--duration",
        `${
          9 +
          Math.random() *
          12
        }s`
      );


      particle.style.setProperty(
        "--delay",
        `${
          -Math.random() *
          16
        }s`
      );


      particlesContainer.appendChild(
        particle
      );

    }

  }


  generateParticles();


  /* =========================================================
     IDIOMA
  ========================================================= */

  const ptOriginal =
    new Map();


  $$("[data-i18n]").forEach(
    element => {

      ptOriginal.set(
        element.dataset.i18n,
        element.textContent.trim()
      );

    }
  );


  const en = {

    "loader.subtitle":
      "Love in the Air",

    "loader.loading":
      "preparing your experience",

    "nav.home":
      "Home",

    "nav.product":
      "Product",

    "nav.campaign":
      "Campaign",

    "nav.notes":
      "Notes",

    "nav.experience":
      "Experience",

    "nav.feel":
      "Feeling",

    "nav.moments":
      "Moments",

    "nav.gallery":
      "Gallery",

    "nav.mood":
      "Mood",

    "nav.quiz":
      "Quiz",

    "nav.discover":
      "Discover",

    "music.playing":
      "NOW PLAYING",

    "hero.status":
      "interactive experience",

    "hero.title2":
      "Love in the Air",

    "hero.description":
      "A delicate, romantic and captivating fragrance designed to turn little moments into special memories.",

    "hero.discover":
      "Discover Dream",

    "hero.viewProduct":
      "View product",

    "hero.fact2":
      "Woody",

    "hero.fact3":
      "Love in the Air",

    "hero.tip":
      "Press spray to activate the effect, sound and animation.",

    "hero.productName":
      "Love in the Air",

    "spray.button":
      "Spray",

    "spray.experience":
      "try it",

    "spray.counter":
      "SPRAYS",

    "ticker.floral":
      "✿ Floral Woody",

    "ticker.love":
      "♡ Love in the Air",

    "ticker.delicate":
      "☁ Delicate",

    "ticker.romantic":
      "☾ Romantic",

    "product.eyebrow":
      "DREAM LOVE IN THE AIR",

    "product.title1":
      "A touch of",

    "product.title2":
      "love",

    "product.title3":
      "in your routine.",

    "product.description":
      "Dream Love in the Air combines delicacy, romance and personality in a comfortable fragrance for different moments.",

    "product.point1Title":
      "Delicate floral",

    "product.point1Text":
      "A light, elegant and romantic signature.",

    "product.point2Title":
      "Comfortable feeling",

    "product.point2Text":
      "Perfect for light everyday wear.",

    "product.point3Title":
      "350 ml bottle",

    "product.point3Text":
      "A Dream to accompany your routine.",

    "product.details":
      "View details",

    "product.favorite":
      "♡ Favorite",

    "campaign.mini":
      "DREAM • LOVE IN THE AIR",

    "campaign.title1":
      "Love is",

    "campaign.title2":
      "in the details.",

    "campaign.description":
      "A romantic, sophisticated atmosphere full of personality.",

    "campaign.explore":
      "Explore the Dream universe",

    "campaign.product":
      "Discover product",

    "notes.eyebrow":
      "OLFACTORY PYRAMID",

    "notes.title1":
      "Discover every",

    "notes.title2":
      "note.",

    "notes.description":
      "Explore the different layers and discover how the fragrance evolves.",

    "notes.top":
      "top",

    "notes.heart":
      "heart",

    "notes.base":
      "base",

    "experience.eyebrow":
      "FEEL THE FRAGRANCE",

    "experience.title1":
      "Explore Dream in",

    "experience.title2":
      "a new way.",

    "experience.description":
      "Discover how the fragrance evolves, compare sensations and personalize your experience.",

    "experience.timelineTitle":
      "Fragrance timeline",

    "experience.timelineIntro":
      "Drag to follow the fragrance evolution throughout the hours.",

    "experience.personality":
      "Personality",

    "experience.feelQuestion":
      "How do you want to feel?",

    "experience.feelIntro":
      "Choose an atmosphere to transform the page.",

    "experience.moodHint":
      "The visual identity changes automatically with your mood.",

    "meter.romantic":
      "Romantic",

    "meter.comfort":
      "Comfortable",

    "meter.presence":
      "Presence",

    "meter.intensity":
      "Intensity",

    "mood.romantic":
      "Romantic",

    "mood.dreamy":
      "Dreamy",

    "mood.night":
      "Night",

    "mood.energy":
      "Energy",

    "mood.calm":
      "Calm",

    "dreamMoment.defaultTitle":
      "Your moment starts here.",

    "dreamMoment.defaultText":
      "Tap the button to receive a little Dream message.",

    "dreamMoment.button":
      "New moment",

    "feeling.eyebrow":
      "FRAGRANCE FEELING",

    "feeling.title1":
      "Between softness and",

    "feeling.title2":
      "presence.",

    "feeling.description":
      "A visual representation of the balance of Dream Love in the Air.",

    "feeling.amorNoAr":
      "LOVE IN THE AIR",

    "feeling.profile":
      "SENSORY PROFILE",

    "feeling.bigTitle":
      "Delicate without going unnoticed.",

    "feeling.text":
      "Dream balances a romantic heart with a comfortable base, creating a soft presence.",

    "moments.eyebrow":
      "WHEN TO WEAR",

    "moments.title1":
      "A Dream for every",

    "moments.title2":
      "moment.",

    "moments.description":
      "Choose the setting that best matches your experience.",

    "gallery.eyebrow":
      "DREAM GALLERY",

    "gallery.title1":
      "Enter the",

    "gallery.title2":
      "Dream universe.",

    "gallery.description":
      "Drag with your mouse, swipe on mobile or use the arrows.",

    "gallery.explore":
      "explore ↗",

    "gallery.autoplay":
      "▶ Autoplay",

    "quiz.title":
      "What is your Dream?",

    "quiz.description":
      "Answer four questions and discover which atmosphere suits you best.",

    "quiz.start":
      "Start quiz",

    "quiz.restart":
      "Restart quiz",

    "quiz.applyMood":
      "Apply my mood",

    "quiz.share":
      "Share",

    "final.product":
      "View product",

    "final.share":
      "Share",

    "final.fullscreen":
      "⛶ Fullscreen",

    "footer.developed":
      "DEVELOPED BY",

    "modal.productEyebrow":
      "DREAM LOVE IN THE AIR",

    "modal.productDescription":
      "A floral, romantic and captivating fragrance.",

    "modal.floral":
      "✿ Floral",

    "modal.romantic":
      "♡ Romantic",

    "modal.comfortable":
      "☁ Comfortable",

    "modal.profile":
      "PROFILE",

    "modal.profileValue":
      "Floral woody",

    "modal.experience":
      "EXPERIENCE",

    "modal.experienceValue":
      "Light and captivating",

    "studio.title":
      "Your experience, your way.",

    "studio.description":
      "Customize visuals, audio and motion.",

    "studio.language":
      "Language",

    "studio.presets":
      "Quick styles",

    "studio.appearance":
      "Appearance",

    "studio.dark":
      "Dark mode",

    "studio.clean":
      "Clean mode",

    "studio.performance":
      "Performance mode",

    "studio.palettes":
      "Palettes",

    "studio.customColors":
      "Custom colors",

    "studio.primary":
      "Primary",

    "studio.secondary":
      "Secondary",

    "studio.effects":
      "Effects",

    "studio.particles":
      "Particles",

    "studio.animations":
      "Animations",

    "studio.motion":
      "3D motion",

    "studio.haptic":
      "Spray vibration",

    "studio.spraySound":
      "Spray sound",

    "studio.music":
      "Music",

    "studio.backgroundMusic":
      "Background music",

    "studio.volume":
      "Volume",

    "studio.movement":
      "Motion",

    "studio.speed":
      "Speed",

    "studio.motionIntensity":
      "3D intensity",

    "studio.particleIntensity":
      "Particles",

    "studio.sprayIntensity":
      "Spray",

    "studio.reading":
      "Reading",

    "studio.contrast":
      "Contrast",

    "studio.textSize":
      "Text size",

    "studio.reset":
      "↻ Reset settings"

  };


  let currentLanguage =
    storage.get(
      "dreamLanguage",
      "pt-BR"
    );


  if (
    ![
      "pt-BR",
      "en-US"
    ].includes(
      currentLanguage
    )
  ) {

    currentLanguage =
      "pt-BR";

  }


  function setLanguage(
    language,
    notify = false
  ) {

    if (
      ![
        "pt-BR",
        "en-US"
      ].includes(
        language
      )
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


    $$("[data-i18n]").forEach(
      element => {

        const key =
          element.dataset.i18n;


        if (
          language === "pt-BR"
        ) {

          if (
            ptOriginal.has(key)
          ) {

            element.textContent =
              ptOriginal.get(key);

          }

        } else if (
          en[key] !== undefined
        ) {

          element.textContent =
            en[key];

        }

      }
    );


    $$("[data-lang]").forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.lang ===
          language
        );

      }
    );


    document.title =
      language === "pt-BR"
        ? "Dream Amor no Ar • 350 ml"
        : "Dream Love in the Air • 350 ml";


    if (notify) {

      showToast(
        language === "pt-BR"
          ? "Português selecionado 🇧🇷"
          : "English selected 🇺🇸"
      );

    }


    window.dispatchEvent(
      new CustomEvent(
        "dream-language-change",
        {
          detail: {
            language
          }
        }
      )
    );

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


  /* =========================================================
     CORES
  ========================================================= */

  function hexToRgb(hex) {

    let value =
      String(hex)
        .replace(
          "#",
          ""
        )
        .trim();


    if (
      value.length === 3
    ) {

      value =
        value
          .split("")
          .map(
            char =>
              char +
              char
          )
          .join("");

    }


    if (
      value.length !== 6
    ) {

      return null;

    }


    const number =
      parseInt(
        value,
        16
      );


    if (
      Number.isNaN(
        number
      )
    ) {

      return null;

    }


    return {

      r:
        number >> 16,

      g:
        number >> 8 &
        255,

      b:
        number &
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


    if (p) {

      root.style.setProperty(
        "--primary-rgb",
        `${p.r}, ${p.g}, ${p.b}`
      );

    }


    if (s) {

      root.style.setProperty(
        "--secondary-rgb",
        `${s.r}, ${s.g}, ${s.b}`
      );

    }


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


  const palettes = {

    dream:
      [
        "#df76a8",
        "#9562dc"
      ],

    roxo:
      [
        "#a855f7",
        "#6d28d9"
      ],

    azul:
      [
        "#38bdf8",
        "#6366f1"
      ],

    cherry:
      [
        "#fb7185",
        "#db2777"
      ],

    gold:
      [
        "#d6a84b",
        "#9a6b21"
      ],

    menta:
      [
        "#45c4aa",
        "#5285c5"
      ]

  };


  $$(".palette").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const palette =
            palettes[
              button.dataset.palette
            ];


          if (
            !palette
          ) {

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
     DARK MODE
  ========================================================= */

  function setDark(
    enabled,
    save = true
  ) {

    body.classList.toggle(
      "dark",
      enabled
    );


    if (
      $("#darkToggle")
    ) {

      $("#darkToggle").checked =
        enabled;

    }


    if (
      $("#themeButton")
    ) {

      $("#themeButton").textContent =
        enabled
          ? "☀"
          : "☾";

    }


    if (save) {

      storage.set(
        "dreamDark",
        enabled
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
     MODAIS
  ========================================================= */

  function openLayer(
    element
  ) {

    if (
      !element
    ) {

      return;

    }


    element.classList.add(
      "open"
    );


    element.setAttribute(
      "aria-hidden",
      "false"
    );


    body.classList.add(
      "modal-open"
    );

  }


  function closeLayer(
    element
  ) {

    if (
      !element
    ) {

      return;

    }


    element.classList.remove(
      "open",
      "active",
      "visible"
    );


    element.setAttribute(
      "aria-hidden",
      "true"
    );


    element.style.removeProperty(
      "visibility"
    );


    element.style.removeProperty(
      "opacity"
    );


    element.style.removeProperty(
      "pointer-events"
    );


    element.style.removeProperty(
      "display"
    );


    if (
      !document.querySelector(
        ".product-modal.open,.note-modal.open,.lightbox.open"
      )
    ) {

      body.classList.remove(
        "modal-open"
      );

    }

  }


  /* =========================================================
     PRODUTO
  ========================================================= */

  function openProductModal() {

    if (
      !productModal
    ) {

      console.error(
        "Dream: #productModal não encontrado."
      );

      return;

    }


    openLayer(
      productModal
    );


    productModal.style.visibility =
      "visible";


    productModal.style.opacity =
      "1";


    productModal.style.pointerEvents =
      "auto";

  }


  function closeProductModal() {

    closeLayer(
      productModal
    );

  }


  document.addEventListener(
    "click",
    event => {

      const openButton =
        event.target.closest(
          ".open-product,[data-open-product]"
        );


      if (
        openButton
      ) {

        event.preventDefault();
        event.stopPropagation();


        openProductModal();


        return;

      }


      const closeButton =
        event.target.closest(
          ".close-product,[data-close-product]"
        );


      if (
        closeButton &&
        productModal?.contains(
          closeButton
        )
      ) {

        event.preventDefault();
        event.stopPropagation();


        closeProductModal();

      }

    },
    true
  );


  productModal?.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        productModal
      ) {

        closeProductModal();

      }

    }
  );


  /* =========================================================
     FAVORITO
  ========================================================= */

  const favoriteButtons = [

    $("#favoriteButton"),

    $("#favoriteModal")

  ].filter(
    Boolean
  );


  let favorite =
    storage.get(
      "dreamFavorite",
      "false"
    ) === "true";


  function updateFavorite() {

    favoriteButtons.forEach(
      button => {

        button.classList.toggle(
          "active",
          favorite
        );


        button.textContent =
          favorite
            ? (
                currentLanguage === "pt-BR"
                  ? "♥ Favoritado"
                  : "♥ Favorited"
              )
            : (
                currentLanguage === "pt-BR"
                  ? "♡ Favoritar"
                  : "♡ Favorite"
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


          storage.set(
            "dreamFavorite",
            favorite
          );


          updateFavorite();

        }
      );

    }
  );


  /* =========================================================
     DREAM STUDIO
  ========================================================= */

  function openStudio() {

    if (
      !settingsPanel
    ) {

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


    settingsPanel.style.transform =
      "translateX(0)";


    settingsPanel.style.visibility =
      "visible";


    settingsPanel.style.pointerEvents =
      "auto";


    body.classList.add(
      "studio-open"
    );

  }


  function closeStudio() {

    if (
      !settingsPanel
    ) {

      return;

    }


    settingsPanel.classList.remove(
      "open"
    );


    settingsPanel.setAttribute(
      "aria-hidden",
      "true"
    );


    settingsPanel.style.removeProperty(
      "transform"
    );


    settingsPanel.style.removeProperty(
      "visibility"
    );


    settingsPanel.style.removeProperty(
      "pointer-events"
    );


    body.classList.remove(
      "studio-open"
    );

  }


  $("#settingsButton")?.addEventListener(
    "click",
    event => {

      event.preventDefault();
      event.stopPropagation();


      if (
        settingsPanel
          ?.classList
          .contains(
            "open"
          )
      ) {

        closeStudio();

      } else {

        openStudio();

      }

    },
    true
  );


  $("#closeSettings")?.addEventListener(
    "click",
    event => {

      event.preventDefault();


      closeStudio();

    }
  );


  /* =========================================================
     TOGGLES
  ========================================================= */

  function bindToggle(
    selector,
    key,
    bodyClass,
    invert = false
  ) {

    const element =
      $(selector);


    if (
      !element
    ) {

      return;

    }


    element.addEventListener(
      "change",
      event => {

        const checked =
          event.target.checked;


        if (
          bodyClass
        ) {

          body.classList.toggle(
            bodyClass,
            invert
              ? !checked
              : checked
          );

        }


        storage.set(
          key,
          checked
        );

      }
    );

  }


  bindToggle(
    "#particlesToggle",
    "dreamParticles",
    "no-particles",
    true
  );


  bindToggle(
    "#animationsToggle",
    "dreamAnimations",
    "no-animations",
    true
  );


  bindToggle(
    "#cursorToggle",
    "dreamCursor",
    "no-cursor",
    true
  );


  bindToggle(
    "#glassToggle",
    "dreamGlass",
    "no-glass",
    true
  );


  bindToggle(
    "#cleanModeToggle",
    "dreamClean",
    "clean-mode"
  );


  bindToggle(
    "#performanceToggle",
    "dreamPerformance",
    "performance-mode"
  );


  bindToggle(
    "#motion3dToggle",
    "dreamMotion3D"
  );


  bindToggle(
    "#hapticToggle",
    "dreamHaptic"
  );


  bindToggle(
    "#spraySoundToggle",
    "dreamSpraySound"
  );


  /* =========================================================
     RANGES
  ========================================================= */

  function bindRange(
    inputId,
    outputId,
    key,
    min,
    max,
    callback
  ) {

    const input =
      $(`#${inputId}`);


    const output =
      $(`#${outputId}`);


    if (
      !input
    ) {

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


      if (
        output
      ) {

        output.textContent =
          `${Math.round(
            safe
          )}%`;

      }


      callback?.(
        safe
      );


      if (
        save
      ) {

        storage.set(
          key,
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
        key,
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
    generateParticles
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
     FONT
  ========================================================= */

  function setFontSize(
    size,
    save = true
  ) {

    if (
      ![
        "small",
        "normal",
        "large"
      ].includes(
        size
      )
    ) {

      size =
        "normal";

    }


    body.classList.remove(
      "font-small",
      "font-normal",
      "font-large"
    );


    body.classList.add(
      `font-${size}`
    );


    $$("[data-font-size]").forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.fontSize ===
          size
        );

      }
    );


    if (
      save
    ) {

      storage.set(
        "dreamFontSize",
        size
      );

    }

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
     PRESETS
  ========================================================= */

  const presets = {

    dream: {
      primary: "#df76a8",
      secondary: "#9562dc",
      dark: false,
      clean: false,
      performance: false
    },

    cinematic: {
      primary: "#a855f7",
      secondary: "#312e81",
      dark: true,
      clean: false,
      performance: false
    },

    soft: {
      primary: "#f2a6c8",
      secondary: "#a78bfa",
      dark: false,
      clean: true,
      performance: false
    },

    performance: {
      primary: "#df76a8",
      secondary: "#9562dc",
      dark: false,
      clean: false,
      performance: true
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


          if (
            !preset
          ) {

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


          body.classList.toggle(
            "performance-mode",
            preset.performance
          );


          if (
            $("#cleanModeToggle")
          ) {

            $("#cleanModeToggle").checked =
              preset.clean;

          }


          if (
            $("#performanceToggle")
          ) {

            $("#performanceToggle").checked =
              preset.performance;

          }


          storage.set(
            "dreamClean",
            preset.clean
          );


          storage.set(
            "dreamPerformance",
            preset.performance
          );

        }
      );

    }
  );


  /* =========================================================
     SPRAY
  ========================================================= */

  const sprayButton =
    $("#sprayButton");

  const sprayArea =
    $("#sprayArea");

  const mainBottle =
    $("#mainBottle");

  const heroProduct =
    $("#heroProduct");

  const sprayWave =
    $("#sprayWave");

  const sprayCounter =
    $("#sprayCounter");


  let sprayCount =
    Number(
      storage.get(
        "dreamSprayCount",
        0
      )
    ) ||
    0;


  let spraying =
    false;


  function updateSprayCounter() {

    if (
      sprayCounter
    ) {

      sprayCounter.textContent =
        sprayCount;

    }

  }


  const sprayAudio =
    new Audio(
      "./audio/spray.mp3"
    );


  sprayAudio.preload =
    "auto";


  sprayAudio.volume =
    0.8;


  function spraySoundEnabled() {

    return $("#spraySoundToggle")
      ? $("#spraySoundToggle").checked
      : storage.get(
          "dreamSpraySound",
          "true"
        ) !== "false";

  }


  async function playSpraySound() {

    if (
      !spraySoundEnabled()
    ) {

      return;

    }


    try {

      sprayAudio.pause();


      sprayAudio.currentTime =
        0;


      await sprayAudio.play();

    } catch (error) {

      console.warn(
        "Erro ao tocar ./audio/spray.mp3",
        error
      );

    }

  }


  function sprayDream() {

    if (
      spraying
    ) {

      return;

    }


    spraying =
      true;


    sprayCount++;


    storage.set(
      "dreamSprayCount",
      sprayCount
    );


    updateSprayCounter();


    playSpraySound();


    if (
      navigator.vibrate &&
      $("#hapticToggle")
        ?.checked !== false
    ) {

      navigator.vibrate(
        30
      );

    }


    heroProduct?.classList.add(
      "spraying"
    );


    mainBottle?.classList.add(
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


    if (
      sprayArea
    ) {

      const intensity =
        clamp(
          $("#sprayIntensityRange")
            ?.value ||
          100,
          40,
          160
        ) /
        100;


      const amount =
        Math.round(
          50 *
          intensity
        );


      for (
        let i = 0;
        i < amount;
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
            420
          }px`
        );


        mist.style.setProperty(
          "--mist-y",
          `${
            (
              Math.random() -
              0.65
            ) *
            340
          }px`
        );


        mist.style.setProperty(
          "--mist-size",
          `${
            3 +
            Math.random() *
            12
          }px`
        );


        mist.style.setProperty(
          "--mist-duration",
          `${
            0.8 +
            Math.random() *
            0.8
          }s`
        );


        sprayArea.appendChild(
          mist
        );


        setTimeout(
          () => {

            mist.remove();

          },
          1800
        );

      }

    }


    showToast(
      currentLanguage === "pt-BR"
        ? "Dream está no ar ♡"
        : "Dream is in the air ♡"
    );


    setTimeout(
      () => {

        heroProduct?.classList.remove(
          "spraying"
        );


        mainBottle?.classList.remove(
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
     FRASCO 3D
  ========================================================= */

  heroProduct?.addEventListener(
    "pointermove",
    event => {

      if (
        !mainBottle ||
        spraying ||
        $("#motion3dToggle")
          ?.checked === false ||
        !matchMedia(
          "(pointer:fine)"
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


      const amount =
        clamp(
          $("#motion3dRange")
            ?.value ||
          100,
          0,
          150
        ) /
        100;


      mainBottle.style.transform =
        `
        rotateY(${x * 16 * amount}deg)
        rotateX(${y * -12 * amount}deg)
        translate3d(
          ${x * 14 * amount}px,
          ${y * 8 * amount}px,
          25px
        )
        `;

    }
  );


  heroProduct?.addEventListener(
    "pointerleave",
    () => {

      if (
        mainBottle
      ) {

        mainBottle.style.transform =
          "";

      }

    }
  );


  /* =========================================================
     NOTAS
  ========================================================= */

  const noteData = {

    bergamota:
      [
        "🍊",
        "Bergamota",
        "Cítrica, fresca e luminosa."
      ],

    laranja:
      [
        "🍊",
        "Laranja",
        "Alegre, cítrica e suculenta."
      ],

    mandarina:
      [
        "🍊",
        "Mandarina",
        "Doce, cítrica e vibrante."
      ],

    limao:
      [
        "🍋",
        "Limão",
        "Fresco, limpo e brilhante."
      ],

    cassis:
      [
        "●",
        "Cassis",
        "Frutado marcante e levemente ácido."
      ],

    maca:
      [
        "🍎",
        "Maçã",
        "Fresca, frutada e delicada."
      ],

    rosa:
      [
        "🌹",
        "Rosa",
        "Floral clássico, elegante e romântico."
      ],

    tilia:
      [
        "✿",
        "Tília",
        "Floral suave e confortável."
      ],

    freesia:
      [
        "🌸",
        "Frésia",
        "Floral leve, transparente e moderno."
      ],

    lotus:
      [
        "🪷",
        "Flor de Lótus",
        "Aquática, delicada e leve."
      ],

    gardenia:
      [
        "✿",
        "Gardênia",
        "Floral branco, cremoso e envolvente."
      ],

    pessego:
      [
        "🍑",
        "Pêssego",
        "Frutado macio e aveludado."
      ],

    ambar:
      [
        "✦",
        "Âmbar",
        "Quente, confortável e envolvente."
      ],

    sandalo:
      [
        "☾",
        "Sândalo",
        "Madeira cremosa, macia e elegante."
      ],

    baunilha:
      [
        "♡",
        "Baunilha",
        "Doce, cremosa e aconchegante."
      ],

    tonka:
      [
        "✧",
        "Tonka",
        "Quente, adocicada e confortável."
      ],

    musk:
      [
        "☁",
        "Musk",
        "Limpo, macio e próximo da pele."
      ]

  };


  $$("[data-note]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const note =
            noteData[
              button.dataset.note
            ];


          if (
            !note ||
            !noteModal
          ) {

            return;

          }


          if (
            $("#noteModalIcon")
          ) {

            $("#noteModalIcon").textContent =
              note[0];

          }


          if (
            $("#noteModalTitle")
          ) {

            $("#noteModalTitle").textContent =
              note[1];

          }


          if (
            $("#noteModalText")
          ) {

            $("#noteModalText").textContent =
              note[2];

          }


          openLayer(
            noteModal
          );

        }
      );

    }
  );


  $$(
    ".close-note,[data-close-note]"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

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
        event.target ===
        noteModal
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
      timelineStages[
        timelineStages.length -
        1
      ];


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


  /* =========================================================
     MOODS
  ========================================================= */

  const moods = {

    romantico:
      [
        "#df76a8",
        "#9562dc"
      ],

    sonhador:
      [
        "#a78bfa",
        "#60a5fa"
      ],

    noturno:
      [
        "#8b5cf6",
        "#312e81"
      ],

    energia:
      [
        "#fb7185",
        "#f59e0b"
      ],

    calmo:
      [
        "#45c4aa",
        "#5285c5"
      ]

  };


  function applyMood(
    name,
    notify = true
  ) {

    const mood =
      moods[name];


    if (
      !mood
    ) {

      return;

    }


    applyColors(
      mood[0],
      mood[1]
    );


    body.dataset.mood =
      name;


    $$("[data-mood]").forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.mood ===
          name
        );

      }
    );


    storage.set(
      "dreamMood",
      name
    );


    if (
      notify
    ) {

      showToast(
        currentLanguage === "pt-BR"
          ? "Mood aplicado ♡"
          : "Mood applied ♡"
      );

    }

  }


  $$("[data-mood]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          applyMood(
            button.dataset.mood
          );

        }
      );

    }
  );


  /* =========================================================
     DREAM MOMENT
  ========================================================= */

  const dreamMoments = [

    [
      "♡",
      "O amor mora nos detalhes.",
      "Love lives in the details.",
      "Alguns momentos ficam especiais justamente porque parecem simples.",
      "Some moments become special precisely because they seem simple."
    ],

    [
      "✦",
      "Transforme o comum.",
      "Transform the ordinary.",
      "Uma fragrância pode transformar um instante comum em lembrança.",
      "A fragrance can turn an ordinary instant into a memory."
    ],

    [
      "☾",
      "Leve o Dream com você.",
      "Take Dream with you.",
      "Crie sua própria atmosfera.",
      "Create your own atmosphere."
    ],

    [
      "☁",
      "Desacelere um pouco.",
      "Slow down for a moment.",
      "Nem todo momento especial precisa ser planejado.",
      "Not every special moment needs to be planned."
    ]

  ];


  let currentMoment =
    0;


  function renderDreamMoment(
    index
  ) {

    const moment =
      dreamMoments[index];


    if (
      !moment
    ) {

      return;

    }


    const icon =
      $(".dream-moment-icon");


    if (
      icon
    ) {

      icon.textContent =
        moment[0];

    }


    if (
      $("#dreamMomentTitle")
    ) {

      $("#dreamMomentTitle").textContent =
        currentLanguage === "pt-BR"
          ? moment[1]
          : moment[2];

    }


    if (
      $("#dreamMomentText")
    ) {

      $("#dreamMomentText").textContent =
        currentLanguage === "pt-BR"
          ? moment[3]
          : moment[4];

    }

  }


  $("#newDreamMoment")?.addEventListener(
    "click",
    () => {

      let next =
        currentMoment;


      while (
        dreamMoments.length > 1 &&
        next === currentMoment
      ) {

        next =
          Math.floor(
            Math.random() *
            dreamMoments.length
          );

      }


      currentMoment =
        next;


      renderDreamMoment(
        currentMoment
      );

    }
  );


  /* =========================================================
     SCENES
  ========================================================= */

  const scenes = {

    romance: {
      icon: "♡",
      pt: "Amor está no ar.",
      en: "Love is in the air.",
      ptText:
        "Uma atmosfera delicada, rosa e envolvente.",
      enText:
        "A delicate, romantic and captivating atmosphere.",
      bg:
        "radial-gradient(circle at 20% 50%,rgba(255,111,169,.40),transparent 38%),radial-gradient(circle at 80% 40%,rgba(169,92,221,.30),transparent 42%),linear-gradient(135deg,#1c0d18,#35152c)"
    },

    ceu: {
      icon: "☾",
      pt: "Noite estrelada",
      en: "Starry night",
      ptText:
        "Uma sensação misteriosa, sonhadora e cheia de possibilidades.",
      enText:
        "A mysterious, dreamy feeling full of possibilities.",
      bg:
        "radial-gradient(circle at 25% 25%,rgba(111,95,255,.30),transparent 35%),radial-gradient(circle at 75% 60%,rgba(73,133,255,.24),transparent 40%),linear-gradient(135deg,#090b1e,#211346)"
    },

    flores: {
      icon: "✿",
      pt: "Jardim Dream",
      en: "Dream Garden",
      ptText:
        "Floral, romântico e delicado para deixar o momento mais especial.",
      enText:
        "Floral, romantic and delicate to make the moment more special.",
      bg:
        "radial-gradient(circle at 20% 65%,rgba(251,113,133,.30),transparent 35%),radial-gradient(circle at 80% 30%,rgba(245,158,11,.25),transparent 40%),linear-gradient(135deg,#1a1018,#35211c)"
    },

    energia: {
      icon: "✦",
      pt: "Dream Energy",
      en: "Dream Energy",
      ptText:
        "Uma atmosfera mais vibrante, intensa e cheia de personalidade.",
      enText:
        "A more vibrant and intense atmosphere full of personality.",
      bg:
        "radial-gradient(circle at 20% 50%,rgba(69,196,170,.28),transparent 38%),radial-gradient(circle at 80% 40%,rgba(82,133,197,.28),transparent 42%),linear-gradient(135deg,#101a1c,#172c35)"
    }

  };


  const dreamSceneBg =
    $(".dream-scene-bg");


  function applyScene(
    name
  ) {

    const scene =
      scenes[name];


    if (
      !scene
    ) {

      return;

    }


    $$(
      ".scene-button,[data-scene]"
    ).forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.scene ===
          name
        );

      }
    );


    if (
      dreamSceneBg
    ) {

      dreamSceneBg.style.background =
        scene.bg;

    }


    if (
      $("#sceneResultIcon")
    ) {

      $("#sceneResultIcon").textContent =
        scene.icon;

    }


    if (
      $("#sceneResultTitle")
    ) {

      $("#sceneResultTitle").textContent =
        currentLanguage === "pt-BR"
          ? scene.pt
          : scene.en;

    }


    if (
      $("#sceneResultText")
    ) {

      $("#sceneResultText").textContent =
        currentLanguage === "pt-BR"
          ? scene.ptText
          : scene.enText;

    }


    storage.set(
      "dreamScene",
      name
    );

  }


  $$("[data-scene]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          applyScene(
            button.dataset.scene
          );

        }
      );

    }
  );


  /* =========================================================
     GALERIA
  ========================================================= */

  const galleryTrack =
    $("#galleryTrack");

  const galleryItems =
    $$(".gallery-item");

  const galleryDots =
    $("#galleryDots");

  const galleryCurrent =
    $("#galleryCurrent");

  const galleryTotal =
    $("#galleryTotal");

  const galleryAutoplay =
    $("#galleryAutoplay");

  const galleryAutoplayProgress =
    $("#galleryAutoplayProgress");


  let galleryIndex =
    0;

  let galleryTimer =
    null;

  let galleryDragging =
    false;

  let galleryMoved =
    false;

  let galleryStartX =
    0;

  let galleryStartScroll =
    0;


  function updateGalleryUI() {

    if (
      galleryCurrent
    ) {

      galleryCurrent.textContent =
        String(
          galleryIndex + 1
        ).padStart(
          2,
          "0"
        );

    }


    if (
      galleryTotal
    ) {

      galleryTotal.textContent =
        String(
          galleryItems.length
        ).padStart(
          2,
          "0"
        );

    }


    $$(".gallery-dot").forEach(
      (
        dot,
        index
      ) => {

        dot.classList.toggle(
          "active",
          index === galleryIndex
        );

      }
    );

  }


  function createGalleryDots() {

    if (
      !galleryDots
    ) {

      return;

    }


    galleryDots.innerHTML =
      "";


    galleryItems.forEach(
      (
        _,
        index
      ) => {

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
          `Imagem ${index + 1}`
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


  function goGallery(
    index
  ) {

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
        body.classList.contains(
          "no-animations"
        )
          ? "auto"
          : "smooth"

    });


    updateGalleryUI();

  }


  /* =========================================================
     AUTOPLAY — CORRIGIDO
  ========================================================= */

  function updateGalleryAutoplayButton() {

    if (
      !galleryAutoplay
    ) {

      return;

    }


    galleryAutoplay.classList.toggle(
      "active",
      Boolean(
        galleryTimer
      )
    );


    galleryAutoplay.textContent =
      galleryTimer
        ? (
            currentLanguage === "pt-BR"
              ? "❚❚ Pausar"
              : "❚❚ Pause"
          )
        : "▶ Autoplay";


    if (
      galleryAutoplayProgress
    ) {

      galleryAutoplayProgress.style.transition =
        "none";


      galleryAutoplayProgress.style.width =
        "0%";


      void galleryAutoplayProgress.offsetWidth;


      if (
        galleryTimer
      ) {

        galleryAutoplayProgress.style.transition =
          "width 3.5s linear";


        galleryAutoplayProgress.style.width =
          "100%";

      }

    }

  }


  function stopGalleryAutoplay() {

    if (
      galleryTimer
    ) {

      clearInterval(
        galleryTimer
      );

    }


    galleryTimer =
      null;


    updateGalleryAutoplayButton();

  }


  function startGalleryAutoplay() {

    if (
      galleryTimer ||
      !galleryItems.length
    ) {

      return;

    }


    galleryTimer =
      setInterval(
        () => {

          goGallery(
            galleryIndex + 1
          );


          updateGalleryAutoplayButton();

        },
        3500
      );


    updateGalleryAutoplayButton();

  }


  $("#galleryPrev")?.addEventListener(
    "click",
    () => {

      goGallery(
        galleryIndex - 1
      );

    }
  );


  $("#galleryNext")?.addEventListener(
    "click",
    () => {

      goGallery(
        galleryIndex + 1
      );

    }
  );


  galleryAutoplay?.addEventListener(
    "click",
    () => {

      if (
        galleryTimer
      ) {

        stopGalleryAutoplay();

      } else {

        startGalleryAutoplay();

      }

    }
  );


  galleryTrack?.addEventListener(
    "pointerdown",
    event => {

      if (
        event.pointerType ===
        "touch"
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


  galleryTrack?.addEventListener(
    "pointermove",
    event => {

      if (
        !galleryDragging
      ) {

        return;

      }


      const distance =
        event.clientX -
        galleryStartX;


      if (
        Math.abs(
          distance
        ) >
        5
      ) {

        galleryMoved =
          true;

      }


      galleryTrack.scrollLeft =
        galleryStartScroll -
        distance;

    }
  );


  function stopGalleryDrag() {

    galleryDragging =
      false;


    galleryTrack?.classList.remove(
      "dragging"
    );


    setTimeout(
      () => {

        galleryMoved =
          false;

      },
      80
    );

  }


  galleryTrack?.addEventListener(
    "pointerup",
    stopGalleryDrag
  );


  galleryTrack?.addEventListener(
    "pointercancel",
    stopGalleryDrag
  );


  /* =========================================================
     LIGHTBOX
  ========================================================= */

  let lightboxIndex =
    0;


  function updateLightbox() {

    const item =
      galleryItems[
        lightboxIndex
      ];


    if (
      !item
    ) {

      return;

    }


    const image =
      $("img", item);


    const title =
      $("h3", item) ||
      $(".gallery-title", item);


    if (
      $("#lightboxImage") &&
      image
    ) {

      $("#lightboxImage").src =
        image.currentSrc ||
        image.src;


      $("#lightboxImage").alt =
        image.alt ||
        "Dream";

    }


    if (
      $("#lightboxTitle")
    ) {

      $("#lightboxTitle").textContent =
        title
          ?.textContent
          ?.trim() ||
        image?.alt ||
        "Dream";

    }


    if (
      $("#lightboxCounter")
    ) {

      $("#lightboxCounter").textContent =
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
    (
      item,
      index
    ) => {

      item.addEventListener(
        "click",
        event => {

          if (
            galleryMoved
          ) {

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


  $("#lightboxPrev")?.addEventListener(
    "click",
    prevLightbox
  );


  $("#lightboxNext")?.addEventListener(
    "click",
    nextLightbox
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
        "Qual sensação você procura?",

      en:
        "Which feeling are you looking for?",

      answers: [

        [
          "Romance",
          "Romance",
          "romantico"
        ],

        [
          "Imaginação",
          "Imagination",
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
      icon: "♡",
      title: "Dream Lover",
      pt:
        "Romântico, delicado e apaixonado pelos pequenos detalhes.",
      en:
        "Romantic, delicate and in love with the little details."
    },

    sonhador: {
      icon: "☾",
      title: "Dreamer",
      pt:
        "Criativo, sonhador e cheio de imaginação.",
      en:
        "Creative, dreamy and full of imagination."
    },

    energia: {
      icon: "✦",
      title: "Dream Energy",
      pt:
        "Vibrante, intenso e cheio de personalidade.",
      en:
        "Vibrant, intense and full of personality."
    },

    calmo: {
      icon: "☁",
      title: "Soft Dream",
      pt:
        "Leve, confortável e tranquilo.",
      en:
        "Soft, comfortable and calm."
    }

  };


  let quizIndex =
    0;

  let quizWinner =
    null;

  let quizScore =
    {};


  function startQuiz() {

    quizIndex =
      0;


    quizWinner =
      null;


    quizScore = {
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
      $("#quizQuestions")
    ) {

      $("#quizQuestions").hidden =
        false;

    }


    if (
      $("#quizResult")
    ) {

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


    if (
      !question
    ) {

      finishQuiz();

      return;

    }


    if (
      $("#quizQuestion")
    ) {

      $("#quizQuestion").textContent =
        currentLanguage === "pt-BR"
          ? question.pt
          : question.en;

    }


    if (
      $("#quizStep")
    ) {

      $("#quizStep").textContent =
        `${
          quizIndex + 1
        } / ${
          quizQuestions.length
        }`;

    }


    if (
      $("#quizProgressBar")
    ) {

      $("#quizProgressBar").style.width =
        `${
          (
            quizIndex + 1
          ) /
          quizQuestions.length *
          100
        }%`;

    }


    const options =
      $("#quizOptions");


    if (
      !options
    ) {

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


        button.className =
          "quiz-option";


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


    quizWinner =
      Object.entries(
        quizScore
      )
      .sort(
        (
          a,
          b
        ) =>
          b[1] -
          a[1]
      )[0]?.[0] ||
      "romantico";


    const result =
      quizResults[
        quizWinner
      ];


    if (
      $("#quizResultIcon")
    ) {

      $("#quizResultIcon").textContent =
        result.icon;

    }


    if (
      $("#quizResultTitle")
    ) {

      $("#quizResultTitle").textContent =
        result.title;

    }


    if (
      $("#quizResultText")
    ) {

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


  $("#applyQuizMood")?.addEventListener(
    "click",
    () => {

      if (
        quizWinner
      ) {

        applyMood(
          quizWinner
        );

      }

    }
  );


  $("#shareQuizResult")?.addEventListener(
    "click",
    async () => {

      if (
        !quizWinner
      ) {

        return;

      }


      const result =
        quizResults[
          quizWinner
        ];


      const text =
        currentLanguage === "pt-BR"
          ? `Meu resultado no Dream Quiz foi ${result.title} ${result.icon}`
          : `My Dream Quiz result is ${result.title} ${result.icon}`;


      try {

        if (
          navigator.share
        ) {

          await navigator.share({

            title:
              "Dream Quiz",

            text,

            url:
              location.href

          });

        } else if (
          navigator.clipboard
        ) {

          await navigator.clipboard.writeText(
            `${text}\n${location.href}`
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
     MUSIC
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


  function formatTime(
    seconds
  ) {

    if (
      !Number.isFinite(
        seconds
      )
    ) {

      return "0:00";

    }


    return `${
      Math.floor(
        seconds / 60
      )
    }:${
      String(
        Math.floor(
          seconds % 60
        )
      ).padStart(
        2,
        "0"
      )
    }`;

  }


  function updateMusicUI() {

    if (
      !dreamMusic
    ) {

      return;

    }


    const playing =
      !dreamMusic.paused;


    body.classList.toggle(
      "music-playing",
      playing
    );


    $("#dreamMusicPlayer")
      ?.classList
      .toggle(
        "playing",
        playing
      );


    if (
      dreamMusicButton
    ) {

      dreamMusicButton.textContent =
        playing
          ? "❚❚"
          : "▶";

    }


    if (
      musicToggle
    ) {

      musicToggle.checked =
        playing;

    }

  }


  async function playMusic() {

    if (
      !dreamMusic
    ) {

      return;

    }


    try {

      await dreamMusic.play();


      updateMusicUI();

    } catch (error) {

      console.warn(
        "Erro ao iniciar música",
        error
      );


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

      if (
        dreamMusic?.paused
      ) {

        playMusic();

      } else {

        pauseMusic();

      }

    }
  );


  musicToggle?.addEventListener(
    "change",
    event => {

      if (
        event.target.checked
      ) {

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

      if (
        musicDuration
      ) {

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

      if (
        musicCurrentTime
      ) {

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
        dreamMusic?.duration
      ) {

        dreamMusic.currentTime =
          Number(
            event.target.value
          ) /
          100 *
          dreamMusic.duration;

      }

    }
  );


  musicMuteButton?.addEventListener(
    "click",
    () => {

      if (
        !dreamMusic
      ) {

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


    if (
      dreamMusic
    ) {

      dreamMusic.volume =
        safe / 100;

    }


    if (
      musicVolumeRange
    ) {

      musicVolumeRange.value =
        safe;

    }


    if (
      musicVolumeValue
    ) {

      musicVolumeValue.textContent =
        `${Math.round(
          safe
        )}%`;

    }


    if (
      save
    ) {

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
     SHARE
  ========================================================= */

  async function sharePage() {

    try {

      if (
        navigator.share
      ) {

        await navigator.share({

          title:
            document.title,

          text:
            currentLanguage === "pt-BR"
              ? "Conheça Dream Amor no Ar ♡"
              : "Discover Dream Love in the Air ♡",

          url:
            location.href

        });


        return;

      }


      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {

        await navigator.clipboard.writeText(
          location.href
        );


        showToast(
          currentLanguage === "pt-BR"
            ? "Link copiado ♡"
            : "Link copied ♡"
        );


        return;

      }


      window.prompt(
        currentLanguage === "pt-BR"
          ? "Copie o link:"
          : "Copy the link:",
        location.href
      );

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
     FULLSCREEN
  ========================================================= */

  $("#fullscreenButton")?.addEventListener(
    "click",
    async () => {

      try {

        if (
          document.fullscreenElement
        ) {

          await document.exitFullscreen();

        } else {

          await document.documentElement
            .requestFullscreen();

        }

      } catch {}

    }
  );


  /* =========================================================
     SECTION INDICATOR
  ========================================================= */

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
      scrollY +
      innerHeight *
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


    const index =
      sections.indexOf(
        current
      ) +
      1;


    sectionIndicator.innerHTML =
      `
      <span>
        ${String(index).padStart(2, "0")}
      </span>
      ${current.dataset.sectionName || current.id}
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
     LOAD SETTINGS
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


    return value === null
      ? fallback
      : value === "true";

  }


  function setToggle(
    selector,
    value
  ) {

    const element =
      $(selector);


    if (
      element
    ) {

      element.checked =
        value;

    }

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


    const animationState =
      readBool(
        "dreamAnimations",
        true
      );


    const cursorState =
      readBool(
        "dreamCursor",
        true
      );


    const glassState =
      readBool(
        "dreamGlass",
        true
      );


    const cleanState =
      readBool(
        "dreamClean",
        false
      );


    const performanceState =
      readBool(
        "dreamPerformance",
        false
      );


    setToggle(
      "#particlesToggle",
      particleState
    );


    body.classList.toggle(
      "no-particles",
      !particleState
    );


    setToggle(
      "#animationsToggle",
      animationState
    );


    body.classList.toggle(
      "no-animations",
      !animationState
    );


    setToggle(
      "#cursorToggle",
      cursorState
    );


    body.classList.toggle(
      "no-cursor",
      !cursorState
    );


    setToggle(
      "#glassToggle",
      glassState
    );


    body.classList.toggle(
      "no-glass",
      !glassState
    );


    setToggle(
      "#cleanModeToggle",
      cleanState
    );


    body.classList.toggle(
      "clean-mode",
      cleanState
    );


    setToggle(
      "#performanceToggle",
      performanceState
    );


    body.classList.toggle(
      "performance-mode",
      performanceState
    );


    setToggle(
      "#motion3dToggle",
      readBool(
        "dreamMotion3D",
        true
      )
    );


    setToggle(
      "#hapticToggle",
      readBool(
        "dreamHaptic",
        true
      )
    );


    setToggle(
      "#spraySoundToggle",
      readBool(
        "dreamSpraySound",
        true
      )
    );


    setFontSize(
      storage.get(
        "dreamFontSize",
        "normal"
      ),
      false
    );


    setMusicVolume(
      storage.get(
        "dreamMusicVolume",
        35
      ),
      false
    );


    const savedMood =
      storage.get(
        "dreamMood",
        null
      );


    if (
      savedMood &&
      moods[savedMood]
    ) {

      applyMood(
        savedMood,
        false
      );

    }


    const savedScene =
      storage.get(
        "dreamScene",
        null
      );


    if (
      savedScene &&
      scenes[savedScene]
    ) {

      applyScene(
        savedScene
      );

    }


    generateParticles();


    updateMusicUI();

  }


  /* =========================================================
     RESET
  ========================================================= */

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
        "dreamMusicVolume",
        "dreamMood",
        "dreamScene"

      ].forEach(
        key => {

          storage.remove(
            key
          );

        }
      );


      location.reload();

    }
  );


  /* =========================================================
     KEYBOARD
  ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      const typing =
        event.target instanceof HTMLElement &&
        event.target.matches(
          "input,textarea,select,[contenteditable='true']"
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


      if (
        typing
      ) {

        return;

      }


      if (
        lightbox
          ?.classList
          .contains(
            "open"
          )
      ) {

        if (
          event.key === "ArrowRight"
        ) {

          nextLightbox();

          return;

        }


        if (
          event.key === "ArrowLeft"
        ) {

          prevLightbox();

          return;

        }

      }


      switch (
        event.key.toLowerCase()
      ) {

        case "s":

          sprayDream();

          break;


        case "m":

          dreamMusicButton
            ?.click();

          break;


        case "d":

          $("#themeButton")
            ?.click();

          break;


        case "g":

          if (
            settingsPanel
              ?.classList
              .contains(
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
        galleryTimer
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


            generateParticles();


            if (
              innerWidth > 900
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
          150
        );

    },
    {
      passive: true
    }
  );


  /* =========================================================
     LANGUAGE UPDATE
  ========================================================= */

  window.addEventListener(
    "dream-language-change",
    () => {

      updateFavorite();


      updateTimeline();


      renderDreamMoment(
        currentMoment
      );


      const activeScene =
        $(
          "[data-scene].active"
        );


      if (
        activeScene
      ) {

        applyScene(
          activeScene.dataset.scene
        );

      }


      updateGalleryAutoplayButton();


      if (
        $("#quizQuestions") &&
        !$("#quizQuestions").hidden &&
        quizIndex <
        quizQuestions.length
      ) {

        renderQuiz();

      }


      if (
        $("#quizResult") &&
        !$("#quizResult").hidden &&
        quizWinner
      ) {

        finishQuiz();

      }

    }
  );


  /* =========================================================
     API
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
          galleryIndex
        );

      },

    applyMood,

    share:
      sharePage

  };


  /* =========================================================
     INIT
  ========================================================= */

  loadSettings();


  setLanguage(
    currentLanguage,
    false
  );


  updateScroll();


  updateTimeline();


  updateFavorite();


  updateSprayCounter();


  createGalleryDots();


  updateGalleryUI();


  updateGalleryAutoplayButton();


  updateSectionIndicator();


  console.log(
    "%cDream carregado ✓",
    "color:#df76a8;font-size:17px;font-weight:800;"
  );


  console.log(
    "Dream diagnostics",
    {

      productModal:
        Boolean(
          productModal
        ),

      productButtons:
        document.querySelectorAll(
          ".open-product"
        ).length,

      settingsPanel:
        Boolean(
          settingsPanel
        ),

      sprayButton:
        Boolean(
          sprayButton
        ),

      gallery:
        galleryItems.length,

      quiz:
        Boolean(
          $("#startQuiz")
        ),

      sprayAudio:
        "./audio/spray.mp3"

    }
  );

});