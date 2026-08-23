"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const $ = (s, p = document) =>
    p.querySelector(s);

  const $$ = (s, p = document) =>
    [...p.querySelectorAll(s)];

  const body =
    document.body;

  const root =
    document.documentElement;

  const clamp = (n, a, b) =>
    Math.min(
      b,
      Math.max(a, n)
    );


  /* =========================================================
     STORAGE
  ========================================================= */

  const store = {

    get(k, d = null) {

      try {

        const v =
          localStorage.getItem(k);

        return v === null
          ? d
          : v;

      } catch {

        return d;

      }

    },


    set(k, v) {

      try {

        localStorage.setItem(
          k,
          String(v)
        );

      } catch {}

    },


    del(k) {

      try {

        localStorage.removeItem(k);

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

  let toastTimer;


  function showToast(
    message
  ) {

    if (
      !toast
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

  function closeLoader() {

    if (
      !loader
    ) {

      return;

    }


    loader.classList.add(
      "hide"
    );


    setTimeout(
      () => {

        if (
          loader
        ) {

          loader.style.display =
            "none";

        }

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
    4000
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


    const pct =
      total > 0
        ? clamp(
            (
              top /
              total
            ) *
            100,
            0,
            100
          )
        : 0;


    if (
      scrollProgress
    ) {

      scrollProgress.style.width =
        `${pct}%`;

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

        behavior:
          "smooth"

      });

    }
  );


  /* =========================================================
     MENU MOBILE
  ========================================================= */

  menuMobile?.addEventListener(
    "click",
    e => {

      e.stopPropagation();


      const open =
        menu?.classList.toggle(
          "open"
        );


      menuMobile.setAttribute(
        "aria-expanded",
        String(
          !!open
        )
      );

    }
  );


  $$(
    ".menu a"
  ).forEach(
    a => {

      a.addEventListener(
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
    e => {

      if (
        !menu ||
        !menuMobile
      ) {

        return;

      }


      if (
        menu.contains(
          e.target
        ) ||
        menuMobile.contains(
          e.target
        )
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
     LINKS SUAVES
  ========================================================= */

  $$(
    "a[href^='#']"
  ).forEach(
    a => {

      a.addEventListener(
        "click",
        e => {

          const href =
            a.getAttribute(
              "href"
            );


          if (
            !href ||
            href ===
              "#"
          ) {

            return;

          }


          let target =
            null;


          try {

            target =
              $(
                href
              );

          } catch {

            return;

          }


          if (
            !target
          ) {

            return;

          }


          e.preventDefault();


          const offset =
            (
              header?.offsetHeight ||
              0
            ) +
            14;


          window.scrollTo({

            top:
              target
                .getBoundingClientRect()
                .top +
              window.scrollY -
              offset,

            behavior:
              "smooth"

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
    "IntersectionObserver" in
    window
  ) {

    const io =
      new IntersectionObserver(

        entries =>
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


              io.unobserve(
                entry.target
              );

            }
          ),

        {
          threshold: 0.1
        }

      );


    reveals.forEach(
      el => {

        io.observe(
          el
        );

      }
    );

  } else {

    reveals.forEach(
      el => {

        el.classList.add(
          "visible"
        );

      }
    );

  }


  /* =========================================================
     METERS
  ========================================================= */

  const meters =
    $$(
      "[data-meter], [data-feeling]"
    );


  if (
    "IntersectionObserver" in
    window
  ) {

    const io =
      new IntersectionObserver(

        entries =>
          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              const v =
                Number(
                  entry.target.dataset.meter ??
                  entry.target.dataset.feeling ??
                  0
                );


              entry.target.style.width =
                `${
                  clamp(
                    v,
                    0,
                    100
                  )
                }%`;


              io.unobserve(
                entry.target
              );

            }
          ),

        {
          threshold: 0.25
        }

      );


    meters.forEach(
      el => {

        io.observe(
          el
        );

      }
    );

  } else {

    meters.forEach(
      el => {

        el.style.width =
          `${
            clamp(
              Number(
                el.dataset.meter ??
                el.dataset.feeling ??
                0
              ),
              0,
              100
            )
          }%`;

      }
    );

  }


  /* =========================================================
     CURSOR GLOW
  ========================================================= */

  const cursorGlow =
    $("#cursorGlow");


  let cx =
    innerWidth / 2;

  let cy =
    innerHeight / 2;

  let gx =
    cx;

  let gy =
    cy;


  document.addEventListener(
    "pointermove",
    e => {

      cx =
        e.clientX;

      cy =
        e.clientY;

    },
    {
      passive: true
    }
  );


  function cursorLoop() {

    if (
      cursorGlow &&
      !body.classList.contains(
        "no-cursor"
      )
    ) {

      gx +=
        (
          cx -
          gx
        ) *
        .12;


      gy +=
        (
          cy -
          gy
        ) *
        .12;


      cursorGlow.style.left =
        `${gx}px`;


      cursorGlow.style.top =
        `${gy}px`;

    }


    requestAnimationFrame(
      cursorLoop
    );

  }


  cursorLoop();


  /* =========================================================
     PARTÍCULAS
  ========================================================= */

  const particles =
    $("#particles");


  function generateParticles() {

    if (
      !particles
    ) {

      return;

    }


    particles.innerHTML =
      "";


    const amount =
      Math.round(

        25 *

        (
          Number(
            $("#particleIntensityRange")
              ?.value ||
            100
          ) /
          100
        )

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

      const p =
        document.createElement(
          "span"
        );


      p.className =
        "particle";


      p.textContent =
        symbols[
          Math.floor(
            Math.random() *
            symbols.length
          )
        ];


      p.style.left =
        `${
          Math.random() *
          100
        }%`;


      p.style.fontSize =
        `${
          8 +
          Math.random() *
          15
        }px`;


      p.style.setProperty(
        "--duration",
        `${
          9 +
          Math.random() *
          12
        }s`
      );


      p.style.setProperty(
        "--delay",
        `${
          -Math.random() *
          16
        }s`
      );


      particles.appendChild(
        p
      );

    }

  }


  generateParticles();


  /* =========================================================
     CAMADAS / MODAIS
  ========================================================= */

  function layerOpen(
    el
  ) {

    if (
      !el
    ) {

      return;

    }


    el.classList.add(
      "open"
    );


    el.setAttribute(
      "aria-hidden",
      "false"
    );


    body.classList.add(
      "modal-open"
    );

  }


  function layerClose(
    el
  ) {

    if (
      !el
    ) {

      return;

    }


    el.classList.remove(
      "open"
    );


    el.setAttribute(
      "aria-hidden",
      "true"
    );


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
     ABRIR PRODUTO
     FUNCIONA COM O INDEX NOVO E ANTIGO
  ========================================================= */

  $$(
    ".open-product, #productDetailsButton, #viewProductButton, [data-open-product]"
  ).forEach(
    btn => {

      btn.addEventListener(
        "click",
        e => {

          e.preventDefault();


          layerOpen(
            productModal
          );

        }
      );

    }
  );


  $$(
    ".close-product"
  ).forEach(
    btn => {

      btn.addEventListener(
        "click",
        () => {

          layerClose(
            productModal
          );

        }
      );

    }
  );


  /* =========================================================
     FAVORITOS
  ========================================================= */

  let favorite =
    store.get(
      "dreamFavorite",
      "false"
    ) ===
    "true";


  const favoriteButtons = [

    $("#favoriteButton"),

    $("#favoriteModal")

  ].filter(
    Boolean
  );


  function updateFavorite() {

    favoriteButtons.forEach(
      btn => {

        btn.classList.toggle(
          "active",
          favorite
        );


        btn.textContent =
          favorite
            ? "♥ Favoritado"
            : "♡ Favoritar";

      }
    );

  }


  favoriteButtons.forEach(
    btn => {

      btn.addEventListener(
        "click",
        e => {

          e.preventDefault();


          favorite =
            !favorite;


          store.set(
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
     COMPARTILHAR
  ========================================================= */

  async function shareDream() {

    try {

      if (
        navigator.share
      ) {

        return await navigator.share({

          title:
            "Dream Amor no Ar",

          text:
            "Conheça Dream Amor no Ar ♡",

          url:
            location.href

        });

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

      } else {

        showToast(
          "Copie o link do navegador ♡"
        );

      }

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

          await document
            .documentElement
            .requestFullscreen?.();

        } else {

          await document
            .exitFullscreen?.();

        }

      } catch {

        showToast(
          "Tela cheia indisponível"
        );

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


  $$(
    ".note-chip"
  ).forEach(
    btn => {

      btn.addEventListener(
        "click",
        () => {

          const n =
            noteData[
              btn.dataset.note
            ];


          if (
            !n
          ) {

            return;

          }


          if (
            $("#noteModalIcon")
          ) {

            $("#noteModalIcon").textContent =
              n[0];

          }


          if (
            $("#noteModalTitle")
          ) {

            $("#noteModalTitle").textContent =
              n[1];

          }


          if (
            $("#noteModalText")
          ) {

            $("#noteModalText").textContent =
              n[2];

          }


          layerOpen(
            noteModal
          );

        }
      );

    }
  );


  $$(
    ".close-note"
  ).forEach(
    btn => {

      btn.addEventListener(
        "click",
        () => {

          layerClose(
            noteModal
          );

        }
      );

    }
  );


  /* =========================================================
     TIMELINE
  ========================================================= */

  const timelineSlider =
    $("#timelineSlider");


  const stages = [

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


    const v =
      Number(
        timelineSlider.value ||
        0
      );


    if (
      $("#timelineHour")
    ) {

      $("#timelineHour").textContent =
        `${v}h`;

    }


    const s =
      stages.find(
        x =>
          v <= x[0]
      ) ||
      stages.at(-1);


    if (
      $("#timelineIcon")
    ) {

      $("#timelineIcon").textContent =
        s[1];

    }


    if (
      $("#timelineTitle")
    ) {

      $("#timelineTitle").textContent =
        s[2];

    }


    if (
      $("#timelineText")
    ) {

      $("#timelineText").textContent =
        s[3];

    }

  }


  timelineSlider?.addEventListener(
    "input",
    updateTimeline
  );


  updateTimeline();


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
      store.get(
        "dreamSprayCount",
        0
      )
    ) ||
    0;


  if (
    sprayCounter
  ) {

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


    sprayCount++;


    store.set(
      "dreamSprayCount",
      sprayCount
    );


    if (
      sprayCounter
    ) {

      sprayCounter.textContent =
        sprayCount;

    }


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
      i < 55;
      i++
    ) {

      const m =
        document.createElement(
          "span"
        );


      m.className =
        "spray-mist";


      m.style.setProperty(
        "--mist-x",
        `${
          (
            Math.random() -
            .5
          ) *
          430
        }px`
      );


      m.style.setProperty(
        "--mist-y",
        `${
          (
            Math.random() -
            .65
          ) *
          360
        }px`
      );


      m.style.setProperty(
        "--mist-size",
        `${
          3 +
          Math.random() *
          13
        }px`
      );


      m.style.setProperty(
        "--mist-blur",
        `${
          Math.random() *
          3
        }px`
      );


      m.style.setProperty(
        "--mist-duration",
        `${
          .8 +
          Math.random() *
          .9
        }s`
      );


      sprayArea.appendChild(
        m
      );


      setTimeout(
        () =>
          m.remove(),
        1900
      );

    }


    for (
      let i = 0;
      i < 12;
      i++
    ) {

      const p =
        document.createElement(
          "span"
        );


      p.className =
        "spray-symbol-particle";


      p.textContent =
        [
          "♡",
          "✦",
          "✧"
        ][
          Math.floor(
            Math.random() *
            3
          )
        ];


      p.style.setProperty(
        "--symbol-x",
        `${
          (
            Math.random() -
            .5
          ) *
          400
        }px`
      );


      p.style.setProperty(
        "--symbol-y",
        `${
          -60 -
          Math.random() *
          280
        }px`
      );


      p.style.setProperty(
        "--symbol-rotate",
        `${
          (
            Math.random() -
            .5
          ) *
          500
        }deg`
      );


      sprayArea.appendChild(
        p
      );


      setTimeout(
        () =>
          p.remove(),
        1900
      );

    }


    if (
      navigator.vibrate &&
      $("#hapticToggle")
        ?.checked !==
        false
    ) {

      navigator.vibrate(
        30
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
      900
    );

  }


  sprayButton?.addEventListener(
    "click",
    sprayDream
  );


  /* =========================================================
     FRASCO 3D
  ========================================================= */

  heroProduct?.addEventListener(
    "pointermove",
    e => {

      if (
        !mainBottle ||
        $("#motion3dToggle")
          ?.checked ===
          false ||
        !matchMedia(
          "(pointer:fine)"
        ).matches
      ) {

        return;

      }


      const r =
        heroProduct.getBoundingClientRect();


      const x =
        (
          e.clientX -
          r.left
        ) /
        r.width -
        .5;


      const y =
        (
          e.clientY -
          r.top
        ) /
        r.height -
        .5;


      const factor =
        Number(
          $("#motion3dRange")
            ?.value ||
          100
        ) /
        100;


      mainBottle.style.transform =
        `
          rotateY(${x * 16 * factor}deg)
          rotateX(${y * -12 * factor}deg)
          translate3d(
            ${x * 15 * factor}px,
            ${y * 8 * factor}px,
            ${30 * factor}px
          )
        `;


      if (
        productHalo
      ) {

        productHalo.style.transform =
          `translate(
            ${x * -25 * factor}px,
            ${y * -20 * factor}px
          )`;

      }


      if (
        productShine
      ) {

        productShine.style.transform =
          `translate(
            ${x * 35}px,
            ${y * 25}px
          )`;

      }

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


      if (
        productHalo
      ) {

        productHalo.style.transform =
          "";

      }


      if (
        productShine
      ) {

        productShine.style.transform =
          "";

      }

    }
  );


  /* PARTE 1 TERMINA AQUI */
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


  let galleryIndex =
    0;


  function updateGalleryUI() {

    const dots =
      $$(".gallery-dot");


    dots.forEach(
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
      galleryCurrent
    ) {

      galleryCurrent.textContent =
        String(
          galleryIndex +
          1
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
      clamp(
        index,
        0,
        galleryItems.length -
        1
      );


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


  if (
    galleryDots
  ) {

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

      if (
        !galleryItems.length
      ) {

        return;

      }


      goGallery(

        galleryIndex >=
        galleryItems.length - 1
          ? 0
          : galleryIndex + 1

      );

    }
  );


  $("#galleryPrev")?.addEventListener(
    "click",
    () => {

      if (
        !galleryItems.length
      ) {

        return;

      }


      goGallery(

        galleryIndex <= 0
          ? galleryItems.length - 1
          : galleryIndex - 1

      );

    }
  );


  updateGalleryUI();


  /* =========================================================
     DRAG GALERIA
  ========================================================= */

  let galleryDragging =
    false;


  let galleryMoved =
    false;


  let galleryStartX =
    0;


  let galleryStartScroll =
    0;


  galleryTrack?.addEventListener(
    "pointerdown",
    e => {

      if (
        e.pointerType ===
        "touch"
      ) {

        return;

      }


      galleryDragging =
        true;


      galleryMoved =
        false;


      galleryStartX =
        e.clientX;


      galleryStartScroll =
        galleryTrack.scrollLeft;


      galleryTrack.classList.add(
        "dragging"
      );


      galleryTrack.setPointerCapture?.(
        e.pointerId
      );

    }
  );


  galleryTrack?.addEventListener(
    "pointermove",
    e => {

      if (
        !galleryDragging
      ) {

        return;

      }


      const delta =
        e.clientX -
        galleryStartX;


      if (
        Math.abs(
          delta
        ) >
        5
      ) {

        galleryMoved =
          true;

      }


      galleryTrack.scrollLeft =
        galleryStartScroll -
        delta;

    }
  );


  function endGalleryDrag() {

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
    endGalleryDrag
  );


  galleryTrack?.addEventListener(
    "pointercancel",
    endGalleryDrag
  );


  /* =========================================================
     SINCRONIZAR GALERIA PELO SCROLL
  ========================================================= */

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


            let bestIndex =
              0;


            let bestDistance =
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
                  bestDistance
                ) {

                  bestDistance =
                    distance;


                  bestIndex =
                    index;

                }

              }
            );


            galleryIndex =
              bestIndex;


            updateGalleryUI();

          },
          90
        );

    },
    {
      passive: true
    }
  );


  /* =========================================================
     AUTOPLAY GALERIA
  ========================================================= */

  const galleryAutoplay =
    $("#galleryAutoplay");


  const galleryAutoplayProgress =
    $("#galleryAutoplayProgress") ||
    $(".gallery-autoplay-progress i");


  let autoplayTimer =
    null;


  function resetGalleryProgress() {

    if (
      !galleryAutoplayProgress
    ) {

      return;

    }


    galleryAutoplayProgress.style.transition =
      "none";


    galleryAutoplayProgress.style.width =
      "0%";


    void galleryAutoplayProgress.offsetWidth;


    if (
      autoplayTimer
    ) {

      galleryAutoplayProgress.style.transition =
        "width 3.5s linear";


      galleryAutoplayProgress.style.width =
        "100%";

    }

  }


  function stopGalleryAutoplay() {

    if (
      autoplayTimer
    ) {

      clearInterval(
        autoplayTimer
      );

    }


    autoplayTimer =
      null;


    if (
      galleryAutoplay
    ) {

      galleryAutoplay.textContent =
        "▶ Autoplay";

    }


    if (
      galleryAutoplayProgress
    ) {

      galleryAutoplayProgress.style.transition =
        "none";


      galleryAutoplayProgress.style.width =
        "0%";

    }

  }


  function startGalleryAutoplay() {

    if (
      autoplayTimer ||
      !galleryItems.length
    ) {

      return;

    }


    autoplayTimer =
      setInterval(
        () => {

          goGallery(

            galleryIndex >=
            galleryItems.length - 1
              ? 0
              : galleryIndex + 1

          );


          resetGalleryProgress();

        },
        3500
      );


    if (
      galleryAutoplay
    ) {

      galleryAutoplay.textContent =
        "❚❚ Pausar";

    }


    resetGalleryProgress();

  }


  galleryAutoplay?.addEventListener(
    "click",
    () => {

      if (
        autoplayTimer
      ) {

        stopGalleryAutoplay();

      } else {

        startGalleryAutoplay();

      }

    }
  );


  /* =========================================================
     LIGHTBOX
  ========================================================= */

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


    const img =
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
      img
    ) {

      lightboxImage.src =
        img.currentSrc ||
        img.src;


      lightboxImage.alt =
        img.alt ||
        "Dream Amor no Ar";

    }


    if (
      lightboxTitle
    ) {

      lightboxTitle.textContent =
        title?.textContent?.trim() ||
        "Dream";

    }


    if (
      lightboxCounter
    ) {

      lightboxCounter.textContent =
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
      clamp(
        index,
        0,
        galleryItems.length -
        1
      );


    updateLightbox();


    layerOpen(
      lightbox
    );

  }


  function closeLightbox() {

    layerClose(
      lightbox
    );

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
            galleryMoved
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


  /* =========================================================
     CORES / MOODS
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


  function hexToRgb(
    hex
  ) {

    let clean =
      String(
        hex
      )
      .replace(
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
            x =>
              x + x
          )
          .join("");

    }


    const value =
      parseInt(
        clean,
        16
      );


    if (
      Number.isNaN(
        value
      )
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

      store.set(
        "dreamPrimary",
        primary
      );


      store.set(
        "dreamSecondary",
        secondary
      );

    }

  }


  $$(
    ".mood-button"
  ).forEach(
    btn => {

      btn.addEventListener(
        "click",
        () => {

          $$(
            ".mood-button"
          ).forEach(
            b => {

              b.classList.remove(
                "active"
              );

            }
          );


          btn.classList.add(
            "active"
          );


          const mood =
            moods[
              btn.dataset.mood
            ];


          if (
            mood
          ) {

            applyColors(
              mood[0],
              mood[1]
            );

          }

        }
      );

    }
  );


  $$(
    ".palette"
  ).forEach(
    btn => {

      btn.addEventListener(
        "click",
        () => {

          $$(
            ".palette"
          ).forEach(
            b =>
              b.classList.remove(
                "active"
              )
          );


          btn.classList.add(
            "active"
          );


          const palette =
            palettes[
              btn.dataset.palette
            ];


          if (
            palette
          ) {

            applyColors(
              palette[0],
              palette[1]
            );

          }

        }
      );

    }
  );


  $("#primaryColor")?.addEventListener(
    "input",
    e => {

      applyColors(

        e.target.value,

        $("#secondaryColor")
          ?.value ||
        "#9562dc"

      );

    }
  );


  $("#secondaryColor")?.addEventListener(
    "input",
    e => {

      applyColors(

        $("#primaryColor")
          ?.value ||
        "#df76a8",

        e.target.value

      );

    }
  );


  /* =========================================================
     QUIZ
  ========================================================= */

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


  const quizResults = {

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
        `${
          quizIndex +
          1
        } / ${
          questions.length
        }`;

    }


    if (
      $("#quizProgressBar")
    ) {

      $("#quizProgressBar").style.width =
        `${
          (
            (
              quizIndex +
              1
            ) /
            questions.length
          ) *
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


    current.answers.forEach(
      answer => {

        const btn =
          document.createElement(
            "button"
          );


        btn.type =
          "button";


        btn.textContent =
          answer[0];


        btn.addEventListener(
          "click",
          () => {

            quizScore[
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


        options.appendChild(
          btn
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
        !quizWinner
      ) {

        return;

      }


      const mood =
        moods[
          quizWinner
        ];


      if (
        mood
      ) {

        applyColors(
          mood[0],
          mood[1]
        );


        showToast(
          "Seu mood foi aplicado ♡"
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
        `Meu resultado no Dream Quiz foi ${result[1]} ♡`;


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

        } else {

          await navigator.clipboard
            ?.writeText(
              text
            );


          showToast(
            "Resultado copiado ♡"
          );

        }

      } catch {

        showToast(
          "Compartilhamento cancelado"
        );

      }

    }
  );


  /* =========================================================
     DREAM STUDIO
  ========================================================= */

  function openStudio() {

    settingsPanel?.classList.add(
      "open"
    );

  }


  function closeStudio() {

    settingsPanel?.classList.remove(
      "open"
    );

  }


  $("#settingsButton")?.addEventListener(
    "click",
    e => {

      e.preventDefault();


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
    closeStudio
  );


  /* =========================================================
     DARK MODE
  ========================================================= */

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

      store.set(
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
    e => {

      setDark(
        e.target.checked
      );

    }
  );


  /* =========================================================
     TOGGLES VISUAIS
  ========================================================= */

  $("#particlesToggle")?.addEventListener(
    "change",
    e => {

      body.classList.toggle(
        "no-particles",
        !e.target.checked
      );


      store.set(
        "dreamParticles",
        e.target.checked
      );

    }
  );


  $("#animationsToggle")?.addEventListener(
    "change",
    e => {

      body.classList.toggle(
        "no-animations",
        !e.target.checked
      );


      store.set(
        "dreamAnimations",
        e.target.checked
      );

    }
  );


  $("#cursorToggle")?.addEventListener(
    "change",
    e => {

      body.classList.toggle(
        "no-cursor",
        !e.target.checked
      );


      store.set(
        "dreamCursor",
        e.target.checked
      );

    }
  );


  $("#glassToggle")?.addEventListener(
    "change",
    e => {

      body.classList.toggle(
        "no-glass",
        !e.target.checked
      );


      store.set(
        "dreamGlass",
        e.target.checked
      );

    }
  );


  $("#cleanModeToggle")?.addEventListener(
    "change",
    e => {

      body.classList.toggle(
        "clean-mode",
        e.target.checked
      );


      store.set(
        "dreamClean",
        e.target.checked
      );

    }
  );


  $("#motion3dToggle")?.addEventListener(
    "change",
    e => {

      store.set(
        "dreamMotion3D",
        e.target.checked
      );


      if (
        !e.target.checked &&
        mainBottle
      ) {

        mainBottle.style.transform =
          "";

      }

    }
  );


  $("#hapticToggle")?.addEventListener(
    "change",
    e => {

      store.set(
        "dreamHaptic",
        e.target.checked
      );

    }
  );


  $("#spraySoundToggle")?.addEventListener(
    "change",
    e => {

      store.set(
        "dreamSpraySound",
        e.target.checked
      );

    }
  );


  /* =========================================================
     PERFORMANCE MODE
  ========================================================= */

  function setPerformance(
    active,
    save = true
  ) {

    body.classList.toggle(
      "performance-mode",
      active
    );


    if (
      $("#performanceToggle")
    ) {

      $("#performanceToggle").checked =
        active;

    }


    if (
      save
    ) {

      store.set(
        "dreamPerformance",
        active
      );

    }

  }


  $("#performanceToggle")?.addEventListener(
    "change",
    e => {

      setPerformance(
        e.target.checked
      );

    }
  );


  /* =========================================================
     RANGES DO DREAM STUDIO
  ========================================================= */

  function setRangeValue(
    inputSelector,
    outputSelector,
    storageKey,
    value,
    min,
    max,
    callback
  ) {

    const safe =
      clamp(
        Number(value) ||
        0,
        min,
        max
      );


    const input =
      $(
        inputSelector
      );


    const output =
      $(
        outputSelector
      );


    if (
      input
    ) {

      input.value =
        safe;

    }


    if (
      output
    ) {

      output.textContent =
        `${Math.round(
          safe
        )}%`;

    }


    store.set(
      storageKey,
      safe
    );


    callback?.(
      safe
    );

  }


  $("#animationSpeed")?.addEventListener(
    "input",
    e => {

      setRangeValue(
        "#animationSpeed",
        "#animationSpeedValue",
        "dreamAnimationSpeed",
        e.target.value,
        40,
        160,
        safe => {

          root.style.setProperty(
            "--animation-speed",
            safe /
            100
          );

        }
      );

    }
  );


  $("#motion3dRange")?.addEventListener(
    "input",
    e => {

      setRangeValue(
        "#motion3dRange",
        "#motion3dValue",
        "dreamMotion3DIntensity",
        e.target.value,
        0,
        150
      );

    }
  );


  $("#cursorGlowRange")?.addEventListener(
    "input",
    e => {

      setRangeValue(
        "#cursorGlowRange",
        "#cursorGlowValue",
        "dreamCursorGlowIntensity",
        e.target.value,
        0,
        150,
        safe => {

          root.style.setProperty(
            "--cursor-glow-intensity",
            safe /
            100
          );

        }
      );

    }
  );


  $("#particleIntensityRange")?.addEventListener(
    "input",
    e => {

      setRangeValue(
        "#particleIntensityRange",
        "#particleIntensityValue",
        "dreamParticleIntensity",
        e.target.value,
        0,
        150,
        () => {

          generateParticles();

        }
      );

    }
  );


  $("#sprayIntensityRange")?.addEventListener(
    "input",
    e => {

      setRangeValue(
        "#sprayIntensityRange",
        "#sprayIntensityValue",
        "dreamSprayIntensity",
        e.target.value,
        40,
        160,
        safe => {

          root.style.setProperty(
            "--spray-intensity",
            safe /
            100
          );

        }
      );

    }
  );


  $("#contrastControl")?.addEventListener(
    "input",
    e => {

      setRangeValue(
        "#contrastControl",
        "#contrastValue",
        "dreamContrast",
        e.target.value,
        80,
        130,
        safe => {

          body.style.filter =
            `contrast(${
              safe /
              100
            })`;

        }
      );

    }
  );


  /* =========================================================
     TAMANHO DA FONTE
  ========================================================= */

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
      btn => {

        btn.classList.toggle(
          "active",
          btn.dataset.fontSize ===
            safe
        );

      }
    );


    store.set(
      "dreamFontSize",
      safe
    );

  }


  fontButtons.forEach(
    btn => {

      btn.addEventListener(
        "click",
        () => {

          setFontSize(
            btn.dataset.fontSize
          );

        }
      );

    }
  );


  /* PARTE 2 TERMINA AQUI */
    /* =========================================================
     DREAM SCENE
  ========================================================= */

  const scenes = {

    romance: {

      icon:
        "♡",

      title:
        "Amor está no ar.",

      text:
        "Uma atmosfera delicada, rosa e envolvente.",

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

      title:
        "Noite estrelada",

      text:
        "Uma sensação misteriosa, sonhadora e cheia de possibilidades.",

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

      title:
        "Jardim Dream",

      text:
        "Floral, romântico e delicado para deixar o momento mais especial.",

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

      title:
        "Dream Energy",

      text:
        "Uma atmosfera mais vibrante, intensa e cheia de personalidade.",

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


  $$(
    ".scene-button"
  ).forEach(
    btn => {

      btn.addEventListener(
        "click",
        () => {

          const scene =
            scenes[
              btn.dataset.scene
            ];


          if (
            !scene
          ) {

            return;

          }


          $$(
            ".scene-button"
          ).forEach(
            b => {

              b.classList.remove(
                "active"
              );

            }
          );


          btn.classList.add(
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


  /* =========================================================
     DREAM MOMENT
  ========================================================= */

  const dreamMoments = [

    [
      "♡",
      "O amor mora nos detalhes.",
      "Alguns momentos ficam especiais justamente porque parecem simples."
    ],

    [
      "✦",
      "Transforme o comum.",
      "Uma fragrância pode fazer um instante comum virar uma lembrança."
    ],

    [
      "☾",
      "Leve o Dream com você.",
      "Crie sua própria atmosfera e deixe o momento falar por si."
    ],

    [
      "☁",
      "Desacelere um pouco.",
      "Nem todo momento especial precisa ser planejado."
    ],

    [
      "✧",
      "Guarde o instante.",
      "Às vezes uma lembrança começa com um detalhe quase imperceptível."
    ]

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
          moment[1];

      }


      if (
        $("#dreamMomentText")
      ) {

        $("#dreamMomentText").textContent =
          moment[2];

      }


      showToast(
        "Novo Dream Moment ✦"
      );

    }
  );


  /* =========================================================
     MOMENT CARDS 3D
  ========================================================= */

  $$(
    ".moment-card"
  ).forEach(
    card => {

      card.addEventListener(
        "pointermove",
        e => {

          if (
            !matchMedia(
              "(pointer:fine)"
            ).matches
          ) {

            return;

          }


          if (
            $("#motion3dToggle")
              ?.checked ===
              false
          ) {

            return;

          }


          const rect =
            card.getBoundingClientRect();


          const x =
            (
              e.clientX -
              rect.left
            ) /
            rect.width -
            .5;


          const y =
            (
              e.clientY -
              rect.top
            ) /
            rect.height -
            .5;


          const factor =
            Number(
              $("#motion3dRange")
                ?.value ||
              100
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
     MUSIC PLAYER
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


    const minutes =
      Math.floor(
        seconds /
        60
      );


    const secs =
      Math.floor(
        seconds %
        60
      );


    return `${minutes}:${String(
      secs
    ).padStart(
      2,
      "0"
    )}`;

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
      ?.classList.toggle(
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


      store.set(
        "dreamMusicEnabled",
        true
      );

    } catch {

      showToast(
        "Clique novamente para tocar a música"
      );

    }

  }


  function pauseMusic() {

    if (
      !dreamMusic
    ) {

      return;

    }


    dreamMusic.pause();


    updateMusicUI();


    store.set(
      "dreamMusicEnabled",
      false
    );

  }


  dreamMusicButton?.addEventListener(
    "click",
    () => {

      if (
        !dreamMusic
      ) {

        return;

      }


      if (
        dreamMusic.paused
      ) {

        playMusic();

      } else {

        pauseMusic();

      }

    }
  );


  musicToggle?.addEventListener(
    "change",
    e => {

      if (
        e.target.checked
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
        Number.isFinite(
          dreamMusic.duration
        ) &&
        dreamMusic.duration >
        0
      ) {

        musicProgress.value =
          (
            dreamMusic.currentTime /
            dreamMusic.duration
          ) *
          100;

      }

    }
  );


  musicProgress?.addEventListener(
    "input",
    e => {

      if (
        !dreamMusic ||
        !Number.isFinite(
          dreamMusic.duration
        ) ||
        dreamMusic.duration <=
        0
      ) {

        return;

      }


      dreamMusic.currentTime =
        (
          Number(
            e.target.value
          ) /
          100
        ) *
        dreamMusic.duration;

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
        Number(
          value
        ) ||
        0,
        0,
        100
      );


    if (
      dreamMusic
    ) {

      dreamMusic.volume =
        safe /
        100;

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

      store.set(
        "dreamMusicVolume",
        safe
      );

    }

  }


  musicVolumeRange?.addEventListener(
    "input",
    e => {

      setMusicVolume(
        e.target.value
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


  $$(
    ".preset-button"
  ).forEach(
    btn => {

      btn.addEventListener(
        "click",
        () => {

          const preset =
            presets[
              btn.dataset.preset
            ];


          if (
            !preset
          ) {

            return;

          }


          $$(
            ".preset-button"
          ).forEach(
            b => {

              b.classList.remove(
                "active"
              );

            }
          );


          btn.classList.add(
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


          if (
            $("#cleanModeToggle")
          ) {

            $("#cleanModeToggle").checked =
              preset.clean;

          }


          setPerformance(
            preset.performance
          );


          showToast(
            "Estilo aplicado ✦"
          );

        }
      );

    }
  );


  /* =========================================================
     LANGUAGE
     Mantém a interface estável.
     Se houver traduções no HTML, sincroniza os botões.
  ========================================================= */

  const languageButtons =
    $$(
      "[data-lang]"
    );


  function setLanguage(
    language,
    save = true
  ) {

    const lang =
      language ===
      "en-US"
        ? "en-US"
        : "pt-BR";


    root.lang =
      lang;


    languageButtons.forEach(
      btn => {

        btn.classList.toggle(
          "active",
          btn.dataset.lang ===
            lang
        );

      }
    );


    if (
      save
    ) {

      store.set(
        "dreamLanguage",
        lang
      );

    }


    showToast(

      lang ===
      "pt-BR"
        ? "Idioma: Português 🇧🇷"
        : "Language: English 🇺🇸"

    );

  }


  languageButtons.forEach(
    btn => {

      btn.addEventListener(
        "click",
        () => {

          setLanguage(
            btn.dataset.lang
          );

        }
      );

    }
  );


  /* =========================================================
     SECTION INDICATOR
     DECLARADO ANTES DE SER CHAMADO
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
      .35;


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


  /* =========================================================
     RESET
  ========================================================= */

  $("#resetSettings")?.addEventListener(
    "click",
    () => {

      applyColors(
        "#df76a8",
        "#9562dc"
      );


      setDark(
        false
      );


      body.classList.remove(
        "no-particles",
        "no-animations",
        "no-cursor",
        "no-glass",
        "clean-mode",
        "performance-mode",
        "font-small",
        "font-large"
      );


      body.classList.add(
        "font-normal"
      );


      if (
        $("#particlesToggle")
      ) {

        $("#particlesToggle").checked =
          true;

      }


      if (
        $("#animationsToggle")
      ) {

        $("#animationsToggle").checked =
          true;

      }


      if (
        $("#cursorToggle")
      ) {

        $("#cursorToggle").checked =
          true;

      }


      if (
        $("#glassToggle")
      ) {

        $("#glassToggle").checked =
          true;

      }


      if (
        $("#cleanModeToggle")
      ) {

        $("#cleanModeToggle").checked =
          false;

      }


      if (
        $("#performanceToggle")
      ) {

        $("#performanceToggle").checked =
          false;

      }


      if (
        $("#motion3dToggle")
      ) {

        $("#motion3dToggle").checked =
          true;

      }


      if (
        $("#hapticToggle")
      ) {

        $("#hapticToggle").checked =
          true;

      }


      if (
        $("#spraySoundToggle")
      ) {

        $("#spraySoundToggle").checked =
          true;

      }


      setFontSize(
        "normal"
      );


      root.style.setProperty(
        "--animation-speed",
        1
      );


      root.style.setProperty(
        "--cursor-glow-intensity",
        1
      );


      root.style.setProperty(
        "--spray-intensity",
        1
      );


      if (
        $("#animationSpeed")
      ) {

        $("#animationSpeed").value =
          100;

      }


      if (
        $("#animationSpeedValue")
      ) {

        $("#animationSpeedValue").textContent =
          "100%";

      }


      if (
        $("#motion3dRange")
      ) {

        $("#motion3dRange").value =
          100;

      }


      if (
        $("#motion3dValue")
      ) {

        $("#motion3dValue").textContent =
          "100%";

      }


      if (
        $("#cursorGlowRange")
      ) {

        $("#cursorGlowRange").value =
          100;

      }


      if (
        $("#cursorGlowValue")
      ) {

        $("#cursorGlowValue").textContent =
          "100%";

      }


      if (
        $("#particleIntensityRange")
      ) {

        $("#particleIntensityRange").value =
          100;

      }


      if (
        $("#particleIntensityValue")
      ) {

        $("#particleIntensityValue").textContent =
          "100%";

      }


      if (
        $("#sprayIntensityRange")
      ) {

        $("#sprayIntensityRange").value =
          100;

      }


      if (
        $("#sprayIntensityValue")
      ) {

        $("#sprayIntensityValue").textContent =
          "100%";

      }


      if (
        $("#contrastControl")
      ) {

        $("#contrastControl").value =
          100;

      }


      if (
        $("#contrastValue")
      ) {

        $("#contrastValue").textContent =
          "100%";

      }


      body.style.filter =
        "";


      setMusicVolume(
        35
      );


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
        "dreamFontSize"
      ].forEach(
        key => {

          store.del(
            key
          );

        }
      );


      generateParticles();


      showToast(
        "Configurações restauradas ♡"
      );

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
      store.get(
        key,
        null
      );


    if (
      value ===
      null
    ) {

      return fallback;

    }


    return value ===
      "true";

  }


  function loadSettings() {

    applyColors(

      store.get(
        "dreamPrimary",
        "#df76a8"
      ),

      store.get(
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


    const particlesEnabled =
      readBool(
        "dreamParticles",
        true
      );


    body.classList.toggle(
      "no-particles",
      !particlesEnabled
    );


    if (
      $("#particlesToggle")
    ) {

      $("#particlesToggle").checked =
        particlesEnabled;

    }


    const animationsEnabled =
      readBool(
        "dreamAnimations",
        true
      );


    body.classList.toggle(
      "no-animations",
      !animationsEnabled
    );


    if (
      $("#animationsToggle")
    ) {

      $("#animationsToggle").checked =
        animationsEnabled;

    }


    const cursorEnabled =
      readBool(
        "dreamCursor",
        true
      );


    body.classList.toggle(
      "no-cursor",
      !cursorEnabled
    );


    if (
      $("#cursorToggle")
    ) {

      $("#cursorToggle").checked =
        cursorEnabled;

    }


    const glassEnabled =
      readBool(
        "dreamGlass",
        true
      );


    body.classList.toggle(
      "no-glass",
      !glassEnabled
    );


    if (
      $("#glassToggle")
    ) {

      $("#glassToggle").checked =
        glassEnabled;

    }


    const cleanEnabled =
      readBool(
        "dreamClean",
        false
      );


    body.classList.toggle(
      "clean-mode",
      cleanEnabled
    );


    if (
      $("#cleanModeToggle")
    ) {

      $("#cleanModeToggle").checked =
        cleanEnabled;

    }


    setPerformance(

      readBool(
        "dreamPerformance",
        false
      ),

      false

    );


    if (
      $("#motion3dToggle")
    ) {

      $("#motion3dToggle").checked =
        readBool(
          "dreamMotion3D",
          true
        );

    }


    if (
      $("#hapticToggle")
    ) {

      $("#hapticToggle").checked =
        readBool(
          "dreamHaptic",
          true
        );

    }


    if (
      $("#spraySoundToggle")
    ) {

      $("#spraySoundToggle").checked =
        readBool(
          "dreamSpraySound",
          true
        );

    }


    setRangeValue(
      "#animationSpeed",
      "#animationSpeedValue",
      "dreamAnimationSpeed",
      Number(
        store.get(
          "dreamAnimationSpeed",
          100
        )
      ),
      40,
      160,
      safe => {

        root.style.setProperty(
          "--animation-speed",
          safe /
          100
        );

      }
    );


    setRangeValue(
      "#motion3dRange",
      "#motion3dValue",
      "dreamMotion3DIntensity",
      Number(
        store.get(
          "dreamMotion3DIntensity",
          100
        )
      ),
      0,
      150
    );


    setRangeValue(
      "#cursorGlowRange",
      "#cursorGlowValue",
      "dreamCursorGlowIntensity",
      Number(
        store.get(
          "dreamCursorGlowIntensity",
          100
        )
      ),
      0,
      150,
      safe => {

        root.style.setProperty(
          "--cursor-glow-intensity",
          safe /
          100
        );

      }
    );


    setRangeValue(
      "#particleIntensityRange",
      "#particleIntensityValue",
      "dreamParticleIntensity",
      Number(
        store.get(
          "dreamParticleIntensity",
          100
        )
      ),
      0,
      150
    );


    setRangeValue(
      "#sprayIntensityRange",
      "#sprayIntensityValue",
      "dreamSprayIntensity",
      Number(
        store.get(
          "dreamSprayIntensity",
          100
        )
      ),
      40,
      160,
      safe => {

        root.style.setProperty(
          "--spray-intensity",
          safe /
          100
        );

      }
    );


    setRangeValue(
      "#contrastControl",
      "#contrastValue",
      "dreamContrast",
      Number(
        store.get(
          "dreamContrast",
          100
        )
      ),
      80,
      130,
      safe => {

        body.style.filter =
          `contrast(${
            safe /
            100
          })`;

      }
    );


    setFontSize(
      store.get(
        "dreamFontSize",
        "normal"
      )
    );


    setMusicVolume(

      Number(
        store.get(
          "dreamMusicVolume",
          35
        )
      ),

      false

    );


    setLanguage(

      store.get(
        "dreamLanguage",
        "pt-BR"
      ),

      false

    );


    generateParticles();


    updateMusicUI();

  }


  /* =========================================================
     ATALHOS
  ========================================================= */

  document.addEventListener(
    "keydown",
    e => {

      const target =
        e.target;


      const typing =
        target instanceof
          HTMLElement &&
        target.matches(
          "input, textarea, select, [contenteditable='true']"
        );


      if (
        e.key ===
        "Escape"
      ) {

        layerClose(
          productModal
        );


        layerClose(
          noteModal
        );


        closeLightbox();


        closeStudio();


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
        lightbox?.classList.contains(
          "open"
        )
      ) {

        if (
          e.key ===
          "ArrowRight"
        ) {

          nextLightbox();

          return;

        }


        if (
          e.key ===
          "ArrowLeft"
        ) {

          prevLightbox();

          return;

        }

      }


      switch (
        e.key.toLowerCase()
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
              ?.classList.contains(
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
        autoplayTimer
      ) {

        stopGalleryAutoplay();

      }

    }
  );


  /* =========================================================
     RESIZE
  ========================================================= */

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


            updateSectionIndicator();


            if (
              innerWidth >
              900
            ) {

              menu?.classList.remove(
                "open"
              );


              menuMobile
                ?.setAttribute(
                  "aria-expanded",
                  "false"
                );

            }

          },
          120
        );

    }
  );


  /* =========================================================
     INICIALIZAÇÃO FINAL
  ========================================================= */

  loadSettings();


  updateGalleryUI();


  updateScroll();


  updateSectionIndicator();


  updateTimeline();


  console.log(
    "%cDream ♡ Amor no Ar",
    "color:#df76a8;font-size:22px;font-weight:900;"
  );


  console.log(
    "%cJS FINAL carregado sem erro de sectionIndicator ✦",
    "color:#9562dc;font-size:12px;font-weight:700;"
  );


}); // FIM DO DOMContentLoaded