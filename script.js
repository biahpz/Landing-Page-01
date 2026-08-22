/* =========================================================
   DREAM AMOR NO AR — SCRIPT.JS
   Versão anterior às 50 funções extras
========================================================= */

"use strict";


/* =========================================================
   ATALHOS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   ELEMENTOS PRINCIPAIS
========================================================= */

const body = document.body;

const loader = $("#loader");
const header = $("#header");

const menu = $("#menu");
const menuMobile = $("#menuMobile");

const scrollProgress = $("#scrollProgress");
const backTop = $("#backTop");

const toast = $("#toast");

const cursorGlow = $("#cursorGlow");
const particles = $("#particles");

const mainBottle = $("#mainBottle");
const heroProduct = $("#heroProduct");

const sprayButton = $("#sprayButton");
const sprayArea = $("#sprayArea");

const productModal = $("#productModal");
const noteModal = $("#noteModal");

const settingsButton = $("#settingsButton");
const settingsPanel = $("#settingsPanel");
const closeSettings = $("#closeSettings");

const sectionIndicator = $("#sectionIndicator");


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const STORAGE_KEY = "dream-amor-no-ar-settings";

const defaultSettings = {

    primary: "#df76a8",
    secondary: "#9562dc",

    palette: "dream",

    dark: false,
    particles: true,
    animations: true,
    glass: true,
    cursor: true,

    fontSize: "normal"

};


let settings = {
    ...defaultSettings
};


/* =========================================================
   PALETAS
========================================================= */

const palettes = {

    dream: {
        primary: "#df76a8",
        secondary: "#9562dc"
    },

    roxo: {
        primary: "#a855f7",
        secondary: "#6d28d9"
    },

    azul: {
        primary: "#38bdf8",
        secondary: "#6366f1"
    },

    cherry: {
        primary: "#fb7185",
        secondary: "#db2777"
    },

    gold: {
        primary: "#d6a84b",
        secondary: "#9a6b21"
    },

    menta: {
        primary: "#45c4aa",
        secondary: "#5285c5"
    }

};


/* =========================================================
   HEX PARA RGB
========================================================= */

function hexToRgb(hex) {

    let value = hex.replace("#", "");

    if (value.length === 3) {

        value =
            value[0] + value[0] +
            value[1] + value[1] +
            value[2] + value[2];

    }

    const number = parseInt(value, 16);

    return {

        r: (number >> 16) & 255,

        g: (number >> 8) & 255,

        b: number & 255

    };

}


/* =========================================================
   ALTERAR CORES
========================================================= */

function setColors(primary, secondary) {

    settings.primary = primary;
    settings.secondary = secondary;

    const rgbPrimary =
        hexToRgb(primary);

    const rgbSecondary =
        hexToRgb(secondary);

    document.documentElement.style.setProperty(
        "--primary",
        primary
    );

    document.documentElement.style.setProperty(
        "--secondary",
        secondary
    );

    document.documentElement.style.setProperty(
        "--primary-rgb",
        `${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}`
    );

    document.documentElement.style.setProperty(
        "--secondary-rgb",
        `${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}`
    );


    const primaryInput =
        $("#primaryColor");

    const secondaryInput =
        $("#secondaryColor");


    if (primaryInput) {
        primaryInput.value = primary;
    }

    if (secondaryInput) {
        secondaryInput.value = secondary;
    }

}


/* =========================================================
   SALVAR CONFIGURAÇÕES
========================================================= */

function saveSettings() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(settings)
        );

    } catch (error) {

        console.warn(
            "Não foi possível salvar as configurações.",
            error
        );

    }

}


/* =========================================================
   CARREGAR CONFIGURAÇÕES
========================================================= */

function loadSettings() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return;
        }

        const parsed =
            JSON.parse(saved);

        settings = {
            ...defaultSettings,
            ...parsed
        };

    } catch (error) {

        settings = {
            ...defaultSettings
        };

    }

}


/* =========================================================
   APLICAR CONFIGURAÇÕES
========================================================= */

function applySettings() {

    setColors(
        settings.primary,
        settings.secondary
    );


    body.classList.toggle(
        "dark",
        settings.dark
    );

    body.classList.toggle(
        "no-particles",
        !settings.particles
    );

    body.classList.toggle(
        "no-animations",
        !settings.animations
    );

    body.classList.toggle(
        "no-glass",
        !settings.glass
    );

    body.classList.toggle(
        "no-cursor",
        !settings.cursor
    );


    body.classList.remove(
        "font-small",
        "font-normal",
        "font-large"
    );

    body.classList.add(
        `font-${settings.fontSize}`
    );


    const darkToggle =
        $("#darkToggle");

    const particlesToggle =
        $("#particlesToggle");

    const animationsToggle =
        $("#animationsToggle");

    const glassToggle =
        $("#glassToggle");

    const cursorToggle =
        $("#cursorToggle");


    if (darkToggle) {
        darkToggle.checked =
            settings.dark;
    }

    if (particlesToggle) {
        particlesToggle.checked =
            settings.particles;
    }

    if (animationsToggle) {
        animationsToggle.checked =
            settings.animations;
    }

    if (glassToggle) {
        glassToggle.checked =
            settings.glass;
    }

    if (cursorToggle) {
        cursorToggle.checked =
            settings.cursor;
    }


    $$(".palette").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.palette ===
            settings.palette
        );

    });


    $$("[data-font-size]").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.fontSize ===
            settings.fontSize
        );

    });


    updateThemeButton();

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hide");
        }

    }, 700);

});


/* =========================================================
   SCROLL
========================================================= */

function updateScroll() {

    const scrollTop =
        window.scrollY;

    const total =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percent =
        total > 0
            ? (scrollTop / total) * 100
            : 0;


    if (scrollProgress) {

        scrollProgress.style.width =
            `${percent}%`;

    }


    if (header) {

        header.classList.toggle(
            "scrolled",
            scrollTop > 20
        );

    }


    if (backTop) {

        backTop.classList.toggle(
            "show",
            scrollTop > 600
        );

    }

}


window.addEventListener(
    "scroll",
    updateScroll,
    { passive: true }
);


updateScroll();


/* =========================================================
   VOLTAR AO TOPO
========================================================= */

if (backTop) {

    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior:
                    settings.animations
                        ? "smooth"
                        : "auto"

            });

        }
    );

}


/* =========================================================
   MENU MOBILE
========================================================= */

if (menuMobile && menu) {

    menuMobile.addEventListener(
        "click",
        () => {

            menu.classList.toggle("open");

            menuMobile.textContent =
                menu.classList.contains("open")
                    ? "×"
                    : "☰";

        }
    );

}


$$(".menu a").forEach(link => {

    link.addEventListener(
        "click",
        () => {

            if (!menu) {
                return;
            }

            menu.classList.remove("open");

            if (menuMobile) {
                menuMobile.textContent = "☰";
            }

        }
    );

});


/* =========================================================
   MENU ATIVO + INDICADOR
========================================================= */

const trackedSections =
    $$(".section-track");


function updateActiveSection() {

    if (!trackedSections.length) {
        return;
    }

    let currentIndex = 0;

    trackedSections.forEach(
        (section, index) => {

            const rect =
                section.getBoundingClientRect();

            if (
                rect.top <=
                window.innerHeight * 0.45
            ) {

                currentIndex = index;

            }

        }
    );


    const current =
        trackedSections[currentIndex];

    const id =
        current?.id;

    const name =
        current?.dataset.sectionName ||
        "Dream";


    $$(".menu a").forEach(link => {

        const href =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${id}`
        );

    });


    if (sectionIndicator) {

        sectionIndicator.innerHTML = `
            <span>
                ${String(currentIndex + 1).padStart(2, "0")}
            </span>
            ${name}
        `;

    }

}


window.addEventListener(
    "scroll",
    updateActiveSection,
    { passive: true }
);


updateActiveSection();


/* =========================================================
   REVEAL
========================================================= */

const revealElements =
    $$(".reveal");


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* =========================================================
   PARTÍCULAS
========================================================= */

function createParticles() {

    if (!particles) {
        return;
    }

    particles.innerHTML = "";

    const symbols = [
        "♡",
        "✦",
        "·",
        "✿"
    ];


    for (
        let i = 0;
        i < 24;
        i++
    ) {

        const particle =
            document.createElement("span");

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
            `${8 + Math.random() * 15}px`;

        particle.style.setProperty(
            "--duration",
            `${12 + Math.random() * 16}s`
        );

        particle.style.setProperty(
            "--delay",
            `${-Math.random() * 20}s`
        );


        particles.appendChild(
            particle
        );

    }

}


createParticles();


/* =========================================================
   CURSOR GLOW
========================================================= */

window.addEventListener(
    "mousemove",
    event => {

        if (
            !cursorGlow ||
            !settings.cursor
        ) {
            return;
        }

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    },
    {
        passive: true
    }
);


/* =========================================================
   MOVIMENTO DO FRASCO
========================================================= */

if (
    heroProduct &&
    mainBottle
) {

    heroProduct.addEventListener(
        "mousemove",
        event => {

            if (!settings.animations) {
                return;
            }

            const rect =
                heroProduct
                    .getBoundingClientRect();

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


            mainBottle.style.transform = `
                scale(var(--bottle-scale))
                rotateY(${x * 8}deg)
                rotateX(${-y * 7}deg)
                translate(
                    ${x * 10}px,
                    ${y * 8}px
                )
            `;

        }
    );


    heroProduct.addEventListener(
        "mouseleave",
        () => {

            mainBottle.style.transform = "";

        }
    );

}


/* =========================================================
   SPRAY
========================================================= */

function sprayPerfume() {

    if (!sprayArea) {
        return;
    }


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const drop =
            document.createElement("span");

        drop.className =
            "spray-particle";


        const size =
            3 + Math.random() * 7;

        const x =
            (
                Math.random() * 260
            ) - 130;

        const y =
            -(
                100 +
                Math.random() * 250
            );


        drop.style.setProperty(
            "--size",
            `${size}px`
        );

        drop.style.setProperty(
            "--x",
            `${x}px`
        );

        drop.style.setProperty(
            "--y",
            `${y}px`
        );


        drop.style.left =
            `${45 + Math.random() * 10}%`;

        drop.style.top =
            `${35 + Math.random() * 10}%`;


        sprayArea.appendChild(drop);


        setTimeout(() => {

            drop.remove();

        }, 1300);

    }


    showToast(
        "Dream Amor no Ar borrifado ✦"
    );

}


if (sprayButton) {

    sprayButton.addEventListener(
        "click",
        sprayPerfume
    );

}


/* =========================================================
   MODAL PRODUTO
========================================================= */

function openProductModal() {

    if (!productModal) {
        return;
    }

    productModal.classList.add("open");

    productModal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeProductModal() {

    if (!productModal) {
        return;
    }

    productModal.classList.remove("open");

    productModal.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove(
        "modal-open"
    );

}


$$(".open-product").forEach(button => {

    button.addEventListener(
        "click",
        openProductModal
    );

});


$$(".close-product").forEach(button => {

    button.addEventListener(
        "click",
        closeProductModal
    );

});


/* =========================================================
   FAVORITO
========================================================= */

let favorite =
    localStorage.getItem(
        "dream-favorite"
    ) === "true";


function updateFavoriteButtons() {

    const buttons = [
        $("#favoriteButton"),
        $("#favoriteModal")
    ];


    buttons.forEach(button => {

        if (!button) {
            return;
        }

        button.classList.toggle(
            "active",
            favorite
        );

        button.innerHTML =
            favorite
                ? "♥ Favoritado"
                : "♡ Favoritar";

    });

}


function toggleFavorite() {

    favorite = !favorite;

    localStorage.setItem(
        "dream-favorite",
        favorite
    );


    updateFavoriteButtons();


    showToast(
        favorite
            ? "Adicionado aos favoritos ♥"
            : "Removido dos favoritos"
    );

}


[
    $("#favoriteButton"),
    $("#favoriteModal")
]
    .filter(Boolean)
    .forEach(button => {

        button.addEventListener(
            "click",
            toggleFavorite
        );

    });


updateFavoriteButtons();


/* =========================================================
   COMPARTILHAR
========================================================= */

async function shareDream() {

    const data = {

        title:
            "Dream Amor no Ar",

        text:
            "Dream Amor no Ar • 350 ml",

        url:
            window.location.href

    };


    try {

        if (navigator.share) {

            await navigator.share(data);

            return;

        }


        await navigator.clipboard.writeText(
            window.location.href
        );


        showToast(
            "Link copiado para a área de transferência ↗"
        );

    } catch (error) {

        if (
            error.name !== "AbortError"
        ) {

            showToast(
                "Não foi possível compartilhar."
            );

        }

    }

}


[
    $("#shareButton"),
    $("#shareModal")
]
    .filter(Boolean)
    .forEach(button => {

        button.addEventListener(
            "click",
            shareDream
        );

    });


/* =========================================================
   NOTAS OLFATIVAS
========================================================= */

const noteData = {

    bergamota: {
        title: "Bergamota",
        icon: "🍋",
        text:
            "Uma nota cítrica luminosa, fresca e elegante que ajuda a criar uma abertura vibrante."
    },

    laranja: {
        title: "Laranja",
        icon: "🍊",
        text:
            "Traz um toque cítrico alegre, suculento e confortável para a abertura."
    },

    mandarina: {
        title: "Mandarina",
        icon: "🍊",
        text:
            "Uma sensação cítrica levemente adocicada e cheia de energia."
    },

    limao: {
        title: "Limão",
        icon: "🍋",
        text:
            "Adiciona frescor, brilho e uma sensação limpa à fragrância."
    },

    cassis: {
        title: "Cassis",
        icon: "🫐",
        text:
            "Uma nuance frutada intensa que adiciona personalidade e contraste."
    },

    maca: {
        title: "Maçã",
        icon: "🍎",
        text:
            "Uma faceta frutada fresca, jovem e delicadamente adocicada."
    },

    rosa: {
        title: "Rosa",
        icon: "🌹",
        text:
            "Clássica e romântica, reforça o coração floral e delicado da fragrância."
    },

    tilia: {
        title: "Tília",
        icon: "🌼",
        text:
            "Uma nota floral suave que acrescenta delicadeza e sensação de conforto."
    },

    freesia: {
        title: "Frésia",
        icon: "🌸",
        text:
            "Floral leve e luminoso, trazendo uma sensação delicada e moderna."
    },

    lotus: {
        title: "Flor de Lótus",
        icon: "🪷",
        text:
            "Uma nota floral aquática e delicada que transmite leveza."
    },

    gardenia: {
        title: "Gardênia",
        icon: "🌺",
        text:
            "Floral cremoso e elegante que deixa o coração mais sofisticado."
    },

    pessego: {
        title: "Pêssego",
        icon: "🍑",
        text:
            "Uma faceta frutada macia e aveludada que adiciona doçura."
    },

    ambar: {
        title: "Âmbar",
        icon: "✨",
        text:
            "Quente e envolvente, ajuda a criar profundidade e sensação de conforto."
    },

    sandalo: {
        title: "Sândalo",
        icon: "🪵",
        text:
            "Madeira cremosa e macia que adiciona elegância e aconchego."
    },

    baunilha: {
        title: "Baunilha",
        icon: "🌼",
        text:
            "Doce, cremosa e confortável, trazendo uma sensação acolhedora."
    },

    tonka: {
        title: "Tonka",
        icon: "🤎",
        text:
            "Uma nota quente e adocicada com aspecto cremoso e envolvente."
    },

    musk: {
        title: "Musk",
        icon: "☁",
        text:
            "Suave e confortável, ajuda a prolongar a sensação limpa e delicada."
    }

};


function openNoteModal(noteName) {

    if (!noteModal) {
        return;
    }


    const data =
        noteData[noteName];

    if (!data) {
        return;
    }


    const title =
        $("#noteModalTitle");

    const text =
        $("#noteModalText");

    const icon =
        $("#noteModalIcon");


    if (title) {
        title.textContent =
            data.title;
    }

    if (text) {
        text.textContent =
            data.text;
    }

    if (icon) {
        icon.textContent =
            data.icon;
    }


    noteModal.classList.add("open");

    noteModal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeNoteModal() {

    if (!noteModal) {
        return;
    }

    noteModal.classList.remove("open");

    noteModal.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove(
        "modal-open"
    );

}


$$(".note-chip").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            openNoteModal(
                button.dataset.note
            );

        }
    );

});


$$(".close-note").forEach(button => {

    button.addEventListener(
        "click",
        closeNoteModal
    );

});


/* =========================================================
   ESC FECHA MODAIS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        closeProductModal();
        closeNoteModal();
        closeLightbox();

        if (settingsPanel) {
            settingsPanel.classList.remove(
                "open"
            );
        }

    }
);


/* =========================================================
   TIMELINE DA FRAGRÂNCIA
========================================================= */

const timelineData = [

    {
        hour: "0h",
        icon: "🍊",
        title: "Abertura fresca",
        text:
            "Cítricos e frutas aparecem primeiro."
    },

    {
        hour: "1h",
        icon: "🍋",
        title: "Brilho cítrico",
        text:
            "O frescor continua luminoso e delicado."
    },

    {
        hour: "2h",
        icon: "🌸",
        title: "Flores surgem",
        text:
            "O coração floral começa a ganhar espaço."
    },

    {
        hour: "3h",
        icon: "🌹",
        title: "Coração romântico",
        text:
            "Rosa e flores deixam a fragrância mais romântica."
    },

    {
        hour: "4h",
        icon: "🪷",
        title: "Floral delicado",
        text:
            "As flores ficam suaves e confortáveis."
    },

    {
        hour: "5h",
        icon: "✨",
        title: "Fundo quente",
        text:
            "O âmbar começa a trazer uma sensação envolvente."
    },

    {
        hour: "6h",
        icon: "🪵",
        title: "Madeiras macias",
        text:
            "O sândalo adiciona cremosidade."
    },

    {
        hour: "7h",
        icon: "☁",
        title: "Conforto",
        text:
            "Musk e notas doces deixam um rastro suave."
    },

    {
        hour: "8h",
        icon: "♡",
        title: "Rastro Dream",
        text:
            "Um final confortável, delicado e romântico."
    }

];


const timelineSlider =
    $("#timelineSlider");


function updateTimeline() {

    if (!timelineSlider) {
        return;
    }


    const index =
        Number(timelineSlider.value);

    const data =
        timelineData[index];


    $("#timelineHour").textContent =
        data.hour;

    $("#timelineIcon").textContent =
        data.icon;

    $("#timelineTitle").textContent =
        data.title;

    $("#timelineText").textContent =
        data.text;

}


if (timelineSlider) {

    timelineSlider.addEventListener(
        "input",
        updateTimeline
    );

    updateTimeline();

}


/* =========================================================
   MEDIDORES
========================================================= */

const meterElements =
    $$("[data-meter]");


if (
    meterElements.length &&
    "IntersectionObserver" in window
) {

    const meterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }

                    const meter =
                        entry.target;

                    meter.style.width =
                        `${meter.dataset.meter}%`;

                    meterObserver.unobserve(
                        meter
                    );

                });

            },
            {
                threshold: 0.4
            }
        );


    meterElements.forEach(meter => {

        meterObserver.observe(meter);

    });

} else {

    meterElements.forEach(meter => {

        meter.style.width =
            `${meter.dataset.meter}%`;

    });

}


/* =========================================================
   GALERIA
========================================================= */

const galleryTrack =
    $("#galleryTrack");

const galleryPrev =
    $("#galleryPrev");

const galleryNext =
    $("#galleryNext");

const galleryAutoplay =
    $("#galleryAutoplay");


function galleryScroll(direction) {

    if (!galleryTrack) {
        return;
    }


    const item =
        $(".gallery-item", galleryTrack);

    const distance =
        item
            ? item.offsetWidth + 18
            : 500;


    galleryTrack.scrollBy({

        left:
            distance * direction,

        behavior:
            settings.animations
                ? "smooth"
                : "auto"

    });

}


if (galleryPrev) {

    galleryPrev.addEventListener(
        "click",
        () => galleryScroll(-1)
    );

}


if (galleryNext) {

    galleryNext.addEventListener(
        "click",
        () => galleryScroll(1)
    );

}


/* =========================================================
   AUTOPLAY GALERIA
========================================================= */

let galleryInterval = null;


function stopGalleryAutoplay() {

    if (galleryInterval) {

        clearInterval(
            galleryInterval
        );

        galleryInterval = null;

    }


    if (galleryAutoplay) {

        galleryAutoplay.textContent =
            "▶ Autoplay";

        galleryAutoplay.classList.remove(
            "active"
        );

    }

}


function startGalleryAutoplay() {

    if (!galleryTrack) {
        return;
    }


    stopGalleryAutoplay();


    galleryInterval =
        setInterval(() => {

            const max =
                galleryTrack.scrollWidth -
                galleryTrack.clientWidth;


            if (
                galleryTrack.scrollLeft >=
                max - 30
            ) {

                galleryTrack.scrollTo({

                    left: 0,

                    behavior:
                        settings.animations
                            ? "smooth"
                            : "auto"

                });

            } else {

                galleryScroll(1);

            }

        }, 3200);


    if (galleryAutoplay) {

        galleryAutoplay.textContent =
            "■ Parar autoplay";

        galleryAutoplay.classList.add(
            "active"
        );

    }

}


if (galleryAutoplay) {

    galleryAutoplay.addEventListener(
        "click",
        () => {

            if (galleryInterval) {

                stopGalleryAutoplay();

            } else {

                startGalleryAutoplay();

            }

        }
    );

}


/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox =
    $("#lightbox");

const lightboxImage =
    $("#lightboxImage");

const lightboxClose =
    $("#lightboxClose");

const lightboxBackdrop =
    $("#lightboxBackdrop");


function openLightbox(src, alt) {

    if (
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    lightboxImage.src = src;

    lightboxImage.alt =
        alt || "Dream";


    lightbox.classList.add(
        "open"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeLightbox() {

    if (!lightbox) {
        return;
    }


    lightbox.classList.remove(
        "open"
    );

    body.classList.remove(
        "modal-open"
    );

}


$$(".gallery-item img").forEach(image => {

    image.addEventListener(
        "click",
        () => {

            openLightbox(
                image.src,
                image.alt
            );

        }
    );

});


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightboxBackdrop) {

    lightboxBackdrop.addEventListener(
        "click",
        closeLightbox
    );

}


/* =========================================================
   MOODS
========================================================= */

const moods = {

    romantico: {
        primary: "#df76a8",
        secondary: "#9562dc",
        message: "Mood Romântico ativado ♡"
    },

    sonhador: {
        primary: "#ba8be8",
        secondary: "#7d8ee8",
        message: "Mood Sonhador ativado ☁"
    },

    noturno: {
        primary: "#7355b7",
        secondary: "#30245c",
        message: "Mood Noturno ativado ☾"
    },

    energia: {
        primary: "#ef7a91",
        secondary: "#f0a85b",
        message: "Mood Energia ativado ✦"
    },

    calmo: {
        primary: "#65bdb0",
        secondary: "#7b91ce",
        message: "Mood Calmo ativado ☁"
    }

};


$$(".mood-button").forEach(button => {

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


            $$(".mood-button")
                .forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


            button.classList.add(
                "active"
            );


            setColors(
                mood.primary,
                mood.secondary
            );


            settings.palette =
                "custom";

            saveSettings();


            $$(".palette").forEach(
                palette => {

                    palette.classList.remove(
                        "active"
                    );

                }
            );


            showToast(
                mood.message
            );

        }
    );

});


/* =========================================================
   QUIZ
========================================================= */

const quizStart =
    $("#quizStart");

const quizQuestions =
    $("#quizQuestions");

const quizResult =
    $("#quizResult");

const startQuiz =
    $("#startQuiz");

const restartQuiz =
    $("#restartQuiz");

const quizQuestion =
    $("#quizQuestion");

const quizOptions =
    $("#quizOptions");

const quizStep =
    $("#quizStep");

const quizProgressBar =
    $("#quizProgressBar");


const quizQuestionsData = [

    {
        question:
            "Qual clima combina mais com você?",

        options: [

            {
                text: "Romântico ♡",
                type: "lover"
            },

            {
                text: "Sonhador ☁",
                type: "dreamer"
            },

            {
                text: "Elegante ✦",
                type: "elegant"
            },

            {
                text: "Tranquilo 🌸",
                type: "soft"
            }

        ]
    },

    {
        question:
            "Qual momento você prefere?",

        options: [

            {
                text: "Um encontro especial",
                type: "lover"
            },

            {
                text: "Olhar o céu",
                type: "dreamer"
            },

            {
                text: "Uma noite sofisticada",
                type: "elegant"
            },

            {
                text: "Um dia relaxante",
                type: "soft"
            }

        ]
    },

    {
        question:
            "Escolha uma sensação:",

        options: [

            {
                text: "Paixão",
                type: "lover"
            },

            {
                text: "Liberdade",
                type: "dreamer"
            },

            {
                text: "Confiança",
                type: "elegant"
            },

            {
                text: "Conforto",
                type: "soft"
            }

        ]
    },

    {
        question:
            "Qual nota chama mais sua atenção?",

        options: [

            {
                text: "Rosa 🌹",
                type: "lover"
            },

            {
                text: "Flor de Lótus 🪷",
                type: "dreamer"
            },

            {
                text: "Sândalo 🪵",
                type: "elegant"
            },

            {
                text: "Baunilha ☁",
                type: "soft"
            }

        ]
    }

];


const quizResults = {

    lover: {

        icon: "♡",

        title:
            "Dream Lover",

        text:
            "Você combina com o lado mais romântico, intenso e apaixonante do universo Dream."

    },

    dreamer: {

        icon: "☁",

        title:
            "Dreamer",

        text:
            "Seu perfil é leve, imaginativo e sonhador. Você transforma pequenos momentos em memórias."

    },

    elegant: {

        icon: "✦",

        title:
            "Dream Elegant",

        text:
            "Você combina com uma atmosfera sofisticada, marcante e cheia de personalidade."

    },

    soft: {

        icon: "🌸",

        title:
            "Dream Soft",

        text:
            "Seu estilo é delicado, confortável e tranquilo, com um toque floral e acolhedor."

    }

};


let currentQuizQuestion = 0;

let quizScores = {};


function resetQuizScores() {

    quizScores = {

        lover: 0,
        dreamer: 0,
        elegant: 0,
        soft: 0

    };

}


function showQuizQuestion() {

    const data =
        quizQuestionsData[
            currentQuizQuestion
        ];


    if (!data) {

        finishQuiz();

        return;

    }


    if (quizStep) {

        quizStep.textContent =
            `${currentQuizQuestion + 1} / ${quizQuestionsData.length}`;

    }


    if (quizProgressBar) {

        quizProgressBar.style.width =
            `${
                (
                    (
                        currentQuizQuestion +
                        1
                    ) /
                    quizQuestionsData.length
                ) *
                100
            }%`;

    }


    if (quizQuestion) {

        quizQuestion.textContent =
            data.question;

    }


    if (quizOptions) {

        quizOptions.innerHTML = "";


        data.options.forEach(option => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.textContent =
                option.text;


            button.addEventListener(
                "click",
                () => {

                    quizScores[
                        option.type
                    ]++;


                    currentQuizQuestion++;


                    showQuizQuestion();

                }
            );


            quizOptions.appendChild(
                button
            );

        });

    }

}


function startQuizGame() {

    currentQuizQuestion = 0;

    resetQuizScores();


    if (quizStart) {
        quizStart.hidden = true;
    }

    if (quizResult) {
        quizResult.hidden = true;
    }

    if (quizQuestions) {
        quizQuestions.hidden = false;
    }


    showQuizQuestion();

}


function finishQuiz() {

    if (quizQuestions) {
        quizQuestions.hidden = true;
    }

    if (quizResult) {
        quizResult.hidden = false;
    }


    const winner =
        Object.entries(quizScores)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )[0][0];


    const result =
        quizResults[winner];


    const icon =
        $("#quizResultIcon");

    const title =
        $("#quizResultTitle");

    const text =
        $("#quizResultText");


    if (icon) {
        icon.textContent =
            result.icon;
    }

    if (title) {
        title.textContent =
            result.title;
    }

    if (text) {
        text.textContent =
            result.text;
    }


    showToast(
        `Seu perfil: ${result.title} ♡`
    );

}


if (startQuiz) {

    startQuiz.addEventListener(
        "click",
        startQuizGame
    );

}


if (restartQuiz) {

    restartQuiz.addEventListener(
        "click",
        startQuizGame
    );

}


/* =========================================================
   PAINEL DE CONFIGURAÇÕES
========================================================= */

if (
    settingsButton &&
    settingsPanel
) {

    settingsButton.addEventListener(
        "click",
        () => {

            settingsPanel.classList.toggle(
                "open"
            );

        }
    );

}


if (
    closeSettings &&
    settingsPanel
) {

    closeSettings.addEventListener(
        "click",
        () => {

            settingsPanel.classList.remove(
                "open"
            );

        }
    );

}


/* =========================================================
   PALETAS
========================================================= */

$$(".palette").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const paletteName =
                button.dataset.palette;

            const palette =
                palettes[paletteName];


            if (!palette) {
                return;
            }


            settings.palette =
                paletteName;


            setColors(
                palette.primary,
                palette.secondary
            );


            $$(".palette").forEach(item => {

                item.classList.toggle(
                    "active",
                    item === button
                );

            });


            saveSettings();


            showToast(
                `Paleta ${button.textContent.trim()} aplicada ✦`
            );

        }
    );

});


/* =========================================================
   CORES PERSONALIZADAS
========================================================= */

const primaryColor =
    $("#primaryColor");

const secondaryColor =
    $("#secondaryColor");


function applyCustomColors() {

    if (
        !primaryColor ||
        !secondaryColor
    ) {
        return;
    }


    settings.palette =
        "custom";


    setColors(
        primaryColor.value,
        secondaryColor.value
    );


    $$(".palette").forEach(button => {

        button.classList.remove(
            "active"
        );

    });


    saveSettings();

}


if (primaryColor) {

    primaryColor.addEventListener(
        "input",
        applyCustomColors
    );

}


if (secondaryColor) {

    secondaryColor.addEventListener(
        "input",
        applyCustomColors
    );

}


/* =========================================================
   DARK MODE
========================================================= */

const darkToggle =
    $("#darkToggle");

const themeButton =
    $("#themeButton");


function updateThemeButton() {

    if (!themeButton) {
        return;
    }


    themeButton.textContent =
        settings.dark
            ? "☀"
            : "☾";

}


function setDarkMode(enabled) {

    settings.dark =
        enabled;


    body.classList.toggle(
        "dark",
        enabled
    );


    if (darkToggle) {

        darkToggle.checked =
            enabled;

    }


    updateThemeButton();

    saveSettings();

}


if (darkToggle) {

    darkToggle.addEventListener(
        "change",
        () => {

            setDarkMode(
                darkToggle.checked
            );

        }
    );

}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            setDarkMode(
                !settings.dark
            );

        }
    );

}


/* =========================================================
   PARTÍCULAS ON/OFF
========================================================= */

const particlesToggle =
    $("#particlesToggle");


if (particlesToggle) {

    particlesToggle.addEventListener(
        "change",
        () => {

            settings.particles =
                particlesToggle.checked;


            body.classList.toggle(
                "no-particles",
                !settings.particles
            );


            saveSettings();


            showToast(
                settings.particles
                    ? "Partículas ativadas ✦"
                    : "Partículas desativadas"
            );

        }
    );

}


/* =========================================================
   ANIMAÇÕES ON/OFF
========================================================= */

const animationsToggle =
    $("#animationsToggle");


if (animationsToggle) {

    animationsToggle.addEventListener(
        "change",
        () => {

            settings.animations =
                animationsToggle.checked;


            body.classList.toggle(
                "no-animations",
                !settings.animations
            );


            saveSettings();


            showToast(
                settings.animations
                    ? "Animações ativadas"
                    : "Animações reduzidas"
            );

        }
    );

}


/* =========================================================
   GLASS ON/OFF
========================================================= */

const glassToggle =
    $("#glassToggle");


if (glassToggle) {

    glassToggle.addEventListener(
        "change",
        () => {

            settings.glass =
                glassToggle.checked;


            body.classList.toggle(
                "no-glass",
                !settings.glass
            );


            saveSettings();


            showToast(
                settings.glass
                    ? "Efeito Glass ativado"
                    : "Efeito Glass desativado"
            );

        }
    );

}


/* =========================================================
   CURSOR GLOW ON/OFF
========================================================= */

const cursorToggle =
    $("#cursorToggle");


if (cursorToggle) {

    cursorToggle.addEventListener(
        "change",
        () => {

            settings.cursor =
                cursorToggle.checked;


            body.classList.toggle(
                "no-cursor",
                !settings.cursor
            );


            saveSettings();


            showToast(
                settings.cursor
                    ? "Cursor Glow ativado ✦"
                    : "Cursor Glow desativado"
            );

        }
    );

}


/* =========================================================
   TAMANHO DA FONTE
========================================================= */

$$("[data-font-size]").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const size =
                button.dataset.fontSize;


            settings.fontSize =
                size;


            body.classList.remove(
                "font-small",
                "font-normal",
                "font-large"
            );


            body.classList.add(
                `font-${size}`
            );


            $$("[data-font-size]")
                .forEach(item => {

                    item.classList.toggle(
                        "active",
                        item === button
                    );

                });


            saveSettings();


            showToast(
                "Tamanho do texto alterado"
            );

        }
    );

});


/* =========================================================
   RESTAURAR CONFIGURAÇÕES
========================================================= */

const resetSettings =
    $("#resetSettings");


if (resetSettings) {

    resetSettings.addEventListener(
        "click",
        () => {

            settings = {
                ...defaultSettings
            };


            applySettings();

            saveSettings();


            $$(".mood-button")
                .forEach(
                    (button, index) => {

                        button.classList.toggle(
                            "active",
                            index === 0
                        );

                    }
                );


            showToast(
                "Configurações restauradas ♡"
            );

        }
    );

}


/* =========================================================
   FECHAR PAINEL CLICANDO FORA
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !settingsPanel ||
            !settingsButton
        ) {
            return;
        }


        if (
            !settingsPanel.classList
                .contains("open")
        ) {
            return;
        }


        const clickedInside =
            settingsPanel.contains(
                event.target
            );

        const clickedButton =
            settingsButton.contains(
                event.target
            );


        if (
            !clickedInside &&
            !clickedButton
        ) {

            settingsPanel.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   EASTER EGG SIMPLES
========================================================= */

let logoClicks = 0;

let logoTimer = null;


$$(".logo").forEach(logo => {

    logo.addEventListener(
        "click",
        () => {

            logoClicks++;


            clearTimeout(
                logoTimer
            );


            logoTimer =
                setTimeout(() => {

                    logoClicks = 0;

                }, 1800);


            if (
                logoClicks >= 5
            ) {

                logoClicks = 0;


                showToast(
                    "Dream Mode secreto desbloqueado ♡✦"
                );


                for (
                    let i = 0;
                    i < 45;
                    i++
                ) {

                    setTimeout(() => {

                        createHeartBurst();

                    }, i * 30);

                }

            }

        }
    );

});


function createHeartBurst() {

    const heart =
        document.createElement(
            "span"
        );


    heart.textContent =
        Math.random() > 0.5
            ? "♡"
            : "✦";


    Object.assign(
        heart.style,
        {

            position: "fixed",

            zIndex: "20000",

            left:
                `${Math.random() * 100}vw`,

            top:
                `${Math.random() * 100}vh`,

            color:
                "var(--primary)",

            fontSize:
                `${12 + Math.random() * 28}px`,

            pointerEvents:
                "none",

            transition:
                "all 1.4s ease",

            opacity:
                "1"

        }
    );


    document.body.appendChild(
        heart
    );


    requestAnimationFrame(() => {

        heart.style.transform =
            `
                translateY(-100px)
                rotate(
                    ${Math.random() * 180}deg
                )
                scale(1.5)
            `;

        heart.style.opacity =
            "0";

    });


    setTimeout(() => {

        heart.remove();

    }, 1500);

}


/* =========================================================
   CLIQUE DUPLO NO FRASCO
========================================================= */

if (mainBottle) {

    mainBottle.addEventListener(
        "dblclick",
        () => {

            sprayPerfume();

            showToast(
                "Você encontrou um segredo do Dream ♡"
            );

        }
    );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function init() {

    loadSettings();

    applySettings();

    createParticles();

    updateScroll();

    updateActiveSection();

    updateFavoriteButtons();

    updateTimeline();

}


/* =========================================================
   EXECUTAR
========================================================= */

init();


console.log(
    "%cDream Amor no Ar ♡",
    `
        color: #df76a8;
        font-size: 20px;
        font-weight: bold;
    `
);

console.log(
    "%c350 ml • Dream Experience",
    `
        color: #9562dc;
        font-size: 12px;
    `
);