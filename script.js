/* =========================================================
   DREAM • AMOR NO AR
   SCRIPT.JS
========================================================= */

"use strict";


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

const body = document.body;
const root = document.documentElement;


/* =========================================================
   ELEMENTOS PRINCIPAIS
========================================================= */

const loader = $("#loader");
const header = $("#header");

const menu = $("#menu");
const menuMobile = $("#menuMobile");

const scrollProgress = $("#scrollProgress");

const mainBottle = $("#mainBottle");
const heroProduct = $("#heroProduct");

const sprayButton = $("#sprayButton");
const sprayArea = $("#sprayArea");

const particles = $("#particles");
const cursorGlow = $("#cursorGlow");

const productModal = $("#productModal");
const noteModal = $("#noteModal");

const lightbox = $("#lightbox");
const lightboxImage = $("#lightboxImage");

const settingsButton = $("#settingsButton");
const settingsPanel = $("#settingsPanel");
const closeSettings = $("#closeSettings");

const toast = $("#toast");
const backTop = $("#backTop");

const sectionIndicator = $("#sectionIndicator");


/* =========================================================
   ESTADO
========================================================= */

const state = {

    particles: true,
    animations: true,
    glass: true,
    cursor: true,

    petals: false,
    stars: false,
    hearts: false,

    aurora: false,
    gradient: false,

    autoRotate: false,
    reflection: false,

    ultimate: false,

    particleAmount: 25,
    animationSpeed: 1,
    glowStrength: 1,

    bottleScale: 1,
    bottleBrightness: 1,
    bottleRotation: 0,

    glassBlur: 20,
    pageBrightness: 1,

    timelineAuto: false,

    interactions: 0,
    maxScroll: 0,

    achievements: new Set(),

    favoriteNote: null

};


/* =========================================================
   LOADING
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader?.classList.add("hide");

    }, 700);

});


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2600);

}


/* =========================================================
   CONTADOR DE INTERAÇÕES
========================================================= */

document.addEventListener("click", () => {

    state.interactions++;

    updateStats();

    if (state.interactions >= 10) {

        unlockAchievement(
            "Curioso Dream"
        );

    }

    if (state.interactions >= 30) {

        unlockAchievement(
            "Explorador Dream"
        );

    }

});


/* =========================================================
   SCROLL
========================================================= */

function updateScroll() {

    const scrollTop =
        window.scrollY;

    const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percent =
        height > 0
            ? (scrollTop / height) * 100
            : 0;

    if (scrollProgress) {

        scrollProgress.style.width =
            `${percent}%`;

    }

    state.maxScroll =
        Math.max(
            state.maxScroll,
            percent
        );

    header?.classList.toggle(
        "scrolled",
        scrollTop > 40
    );

    backTop?.classList.toggle(
        "show",
        scrollTop > 500
    );

    if (state.maxScroll >= 95) {

        unlockAchievement(
            "Até o Fim ♡"
        );

    }

    updateStats();

}

window.addEventListener(
    "scroll",
    updateScroll,
    { passive: true }
);

updateScroll();


/* =========================================================
   BACK TOP
========================================================= */

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


/* =========================================================
   MENU ATIVO
========================================================= */

const sections =
    $$(".section-track");

const menuLinks =
    $$(".menu a");

function updateActiveSection() {

    let current = sections[0];

    sections.forEach(section => {

        const rect =
            section.getBoundingClientRect();

        if (rect.top <= 220) {

            current = section;

        }

    });

    if (!current) return;

    const id = current.id;

    menuLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
        );

    });

    const index =
        sections.indexOf(current) + 1;

    const name =
        current.dataset.sectionName ||
        current.id;

    if (sectionIndicator) {

        sectionIndicator.innerHTML = `
            <span>
                ${String(index).padStart(2, "0")}
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

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );

$$(".reveal").forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   METERS
========================================================= */

const meterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const meter =
                    entry.target;

                const value =
                    meter.dataset.meter || 0;

                meter.style.width =
                    `${value}%`;

            });

        },

        {
            threshold: 0.4
        }

    );

$$("[data-meter]").forEach(meter => {

    meterObserver.observe(meter);

});


/* =========================================================
   CURSOR GLOW
========================================================= */

document.addEventListener(
    "mousemove",
    event => {

        if (
            !cursorGlow ||
            !state.cursor
        ) {
            return;
        }

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    }
);


/* =========================================================
   FRASCO 3D
========================================================= */

heroProduct?.addEventListener(
    "mousemove",
    event => {

        if (
            !mainBottle ||
            !state.animations
        ) {
            return;
        }

        if (state.autoRotate) {
            return;
        }

        const rect =
            heroProduct.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left;

        const y =
            event.clientY -
            rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateY =
            ((x - centerX) /
                centerX) * 8;

        const rotateX =
            -((y - centerY) /
                centerY) * 6;

        const moveX =
            ((x - centerX) /
                centerX) * 8;

        const moveY =
            ((y - centerY) /
                centerY) * 5;

        root.style.setProperty(
            "--mouse-x",
            `${moveX}px`
        );

        root.style.setProperty(
            "--mouse-y",
            `${moveY}px`
        );

        root.style.setProperty(
            "--mouse-rx",
            `${rotateX}deg`
        );

        root.style.setProperty(
            "--mouse-ry",
            `${rotateY}deg`
        );

    }
);


heroProduct?.addEventListener(
    "mouseleave",
    resetBottleMouse
);


function resetBottleMouse() {

    root.style.setProperty(
        "--mouse-x",
        "0px"
    );

    root.style.setProperty(
        "--mouse-y",
        "0px"
    );

    root.style.setProperty(
        "--mouse-rx",
        "0deg"
    );

    root.style.setProperty(
        "--mouse-ry",
        "0deg"
    );

}


/* =========================================================
   7 CLIQUES NO FRASCO
========================================================= */

let bottleClicks = 0;
let bottleClickTimer;

mainBottle?.addEventListener(
    "click",
    () => {

        bottleClicks++;

        clearTimeout(
            bottleClickTimer
        );

        bottleClickTimer =
            setTimeout(() => {

                bottleClicks = 0;

            }, 2500);

        if (bottleClicks >= 7) {

            bottleClicks = 0;

            activateLoveExplosion();

            unlockAchievement(
                "Segredo do Frasco"
            );

            showToast(
                "Você descobriu o segredo do Dream! ♡"
            );

        }

    }
);


/* =========================================================
   SPRAY
========================================================= */

sprayButton?.addEventListener(
    "click",
    spray
);


function spray() {

    if (!sprayArea) return;

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );

        particle.className =
            "spray-particle";

        const size =
            3 + Math.random() * 8;

        const x =
            (Math.random() - 0.5) *
            330;

        const y =
            -60 -
            Math.random() * 250;

        particle.style.setProperty(
            "--size",
            `${size}px`
        );

        particle.style.setProperty(
            "--x",
            `${x}px`
        );

        particle.style.setProperty(
            "--y",
            `${y}px`
        );

        particle.style.left =
            `${45 + Math.random() * 10}%`;

        particle.style.top =
            `${45 + Math.random() * 10}%`;

        sprayArea.appendChild(
            particle
        );

        setTimeout(
            () => particle.remove(),
            1600
        );

    }

    if (
        navigator.vibrate
    ) {

        navigator.vibrate(25);

    }

    showToast(
        "Dream está no ar ✦"
    );

    unlockAchievement(
        "Primeiro Borrifo"
    );

}


/* =========================================================
   MODAL PRODUTO
========================================================= */

function openProductModal() {

    productModal?.classList.add(
        "open"
    );

    productModal?.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add(
        "modal-open"
    );

}

function closeProductModal() {

    productModal?.classList.remove(
        "open"
    );

    productModal?.setAttribute(
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

const favoriteButtons = [
    $("#favoriteButton"),
    $("#favoriteModal")
].filter(Boolean);

let favorite =
    localStorage.getItem(
        "dreamFavorite"
    ) === "true";


function updateFavorite() {

    favoriteButtons.forEach(button => {

        button.innerHTML =
            favorite
                ? "♥ Favoritado"
                : "♡ Favoritar";

    });

}

favoriteButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            favorite =
                !favorite;

            localStorage.setItem(
                "dreamFavorite",
                favorite
            );

            updateFavorite();

            showToast(
                favorite
                    ? "Adicionado aos favoritos ♡"
                    : "Removido dos favoritos"
            );

            if (favorite) {

                unlockAchievement(
                    "Dream Lover"
                );

            }

        }
    );

});

updateFavorite();


/* =========================================================
   COMPARTILHAR
========================================================= */

async function shareDream() {

    const data = {

        title:
            "Dream Amor no Ar",

        text:
            "Conheça Dream Amor no Ar ♡",

        url:
            window.location.href

    };

    try {

        if (
            navigator.share
        ) {

            await navigator.share(
                data
            );

        } else {

            await navigator.clipboard.writeText(
                window.location.href
            );

            showToast(
                "Link copiado ♡"
            );

        }

    } catch (error) {

        console.log(
            "Compartilhamento cancelado."
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
   NOTAS
========================================================= */

const notesData = {

    bergamota: {
        title: "Bergamota",
        icon: "🍊",
        text:
            "Uma nota cítrica luminosa que traz frescor para a abertura da fragrância."
    },

    laranja: {
        title: "Laranja",
        icon: "🍊",
        text:
            "Traz uma sensação cítrica, alegre e confortável."
    },

    mandarina: {
        title: "Mandarina",
        icon: "🍊",
        text:
            "Uma faceta frutada e vibrante para a primeira impressão."
    },

    limao: {
        title: "Limão",
        icon: "🍋",
        text:
            "Acrescenta brilho e uma sensação fresca."
    },

    cassis: {
        title: "Cassis",
        icon: "🫐",
        text:
            "Uma nota frutada com personalidade e leve acidez."
    },

    maca: {
        title: "Maçã",
        icon: "🍎",
        text:
            "Uma sensação frutada, fresca e delicadamente adocicada."
    },

    rosa: {
        title: "Rosa",
        icon: "🌹",
        text:
            "Um dos símbolos clássicos da perfumaria floral e romântica."
    },

    tilia: {
        title: "Tília",
        icon: "🌼",
        text:
            "Uma nota floral delicada que reforça a suavidade da composição."
    },

    freesia: {
        title: "Frésia",
        icon: "🌸",
        text:
            "Floral leve, luminoso e delicado."
    },

    lotus: {
        title: "Flor de Lótus",
        icon: "🪷",
        text:
            "Traz uma sensação floral aquática, limpa e suave."
    },

    gardenia: {
        title: "Gardênia",
        icon: "🌼",
        text:
            "Floral cremoso e sofisticado."
    },

    pessego: {
        title: "Pêssego",
        icon: "🍑",
        text:
            "Acrescenta uma nuance frutada macia e confortável."
    },

    ambar: {
        title: "Âmbar",
        icon: "✨",
        text:
            "Quente e envolvente, ajuda a criar profundidade."
    },

    sandalo: {
        title: "Sândalo",
        icon: "🪵",
        text:
            "Madeira cremosa que adiciona conforto e suavidade."
    },

    baunilha: {
        title: "Baunilha",
        icon: "🤍",
        text:
            "Uma sensação doce, cremosa e aconchegante."
    },

    tonka: {
        title: "Tonka",
        icon: "✨",
        text:
            "Uma nuance quente, adocicada e confortável."
    },

    musk: {
        title: "Musk",
        icon: "☁",
        text:
            "Traz uma sensação macia, limpa e envolvente."
    }

};


$$(".note-chip").forEach(chip => {

    chip.addEventListener(
        "click",
        () => {

            const note =
                notesData[
                    chip.dataset.note
                ];

            if (!note) return;

            $("#noteModalIcon").textContent =
                note.icon;

            $("#noteModalTitle").textContent =
                note.title;

            $("#noteModalText").textContent =
                note.text;

            noteModal?.classList.add(
                "open"
            );

            noteModal?.setAttribute(
                "aria-hidden",
                "false"
            );

            body.classList.add(
                "modal-open"
            );

            state.favoriteNote =
                chip.dataset.note;

            localStorage.setItem(
                "dreamFavoriteNote",
                state.favoriteNote
            );

            unlockAchievement(
                "Perfumista"
            );

        }
    );

});


function closeNoteModal() {

    noteModal?.classList.remove(
        "open"
    );

    noteModal?.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove(
        "modal-open"
    );

}

$$(".close-note").forEach(button => {

    button.addEventListener(
        "click",
        closeNoteModal
    );

});


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeProductModal();
            closeNoteModal();

            lightbox?.classList.remove(
                "open"
            );

            settingsPanel?.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   TIMELINE
========================================================= */

const timelineSlider =
    $("#timelineSlider");

const timelineHour =
    $("#timelineHour");

const timelineIcon =
    $("#timelineIcon");

const timelineTitle =
    $("#timelineTitle");

const timelineText =
    $("#timelineText");


const timelineStages = [

    {
        max: 1,
        icon: "🍊",
        title:
            "Abertura fresca",
        text:
            "Cítricos e frutas aparecem primeiro."
    },

    {
        max: 3,
        icon: "🌸",
        title:
            "Coração floral",
        text:
            "As flores assumem o centro da fragrância."
    },

    {
        max: 5,
        icon: "♡",
        title:
            "Romântico e confortável",
        text:
            "O floral fica mais macio e envolvente."
    },

    {
        max: 8,
        icon: "✨",
        title:
            "Fundo aconchegante",
        text:
            "Âmbar, madeiras e notas doces permanecem."
    }

];


function updateTimeline() {

    if (!timelineSlider) {
        return;
    }

    const value =
        Number(
            timelineSlider.value
        );

    if (timelineHour) {

        timelineHour.textContent =
            `${value}h`;

    }

    const stage =
        timelineStages.find(
            item =>
                value <= item.max
        ) ||
        timelineStages[
            timelineStages.length - 1
        ];

    if (timelineIcon) {

        timelineIcon.textContent =
            stage.icon;

    }

    if (timelineTitle) {

        timelineTitle.textContent =
            stage.title;

    }

    if (timelineText) {

        timelineText.textContent =
            stage.text;

    }

}

timelineSlider?.addEventListener(
    "input",
    updateTimeline
);

updateTimeline();


/* =========================================================
   TIMELINE AUTOMÁTICA
========================================================= */

let timelineInterval = null;

function toggleTimelineAuto() {

    state.timelineAuto =
        !state.timelineAuto;

    if (
        state.timelineAuto
    ) {

        if (!timelineSlider) {
            return;
        }

        timelineSlider.value = 0;

        updateTimeline();

        timelineInterval =
            setInterval(() => {

                let value =
                    Number(
                        timelineSlider.value
                    );

                value++;

                if (value > 8) {

                    value = 0;

                }

                timelineSlider.value =
                    value;

                updateTimeline();

            }, 1000);

        showToast(
            "Timeline automática ativada"
        );

    } else {

        clearInterval(
            timelineInterval
        );

        timelineInterval = null;

        showToast(
            "Timeline automática desativada"
        );

    }

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

let galleryTimer = null;


function galleryMove(direction) {

    if (!galleryTrack) return;

    const item =
        $(".gallery-item", galleryTrack);

    if (!item) return;

    galleryTrack.scrollBy({

        left:
            direction *
            (item.offsetWidth + 18),

        behavior:
            "smooth"

    });

}


galleryPrev?.addEventListener(
    "click",
    () => galleryMove(-1)
);

galleryNext?.addEventListener(
    "click",
    () => galleryMove(1)
);


galleryAutoplay?.addEventListener(
    "click",
    () => {

        if (galleryTimer) {

            clearInterval(
                galleryTimer
            );

            galleryTimer = null;

            galleryAutoplay.textContent =
                "▶ Autoplay";

            showToast(
                "Autoplay pausado"
            );

            return;

        }

        galleryTimer =
            setInterval(() => {

                if (!galleryTrack) {
                    return;
                }

                const max =
                    galleryTrack.scrollWidth -
                    galleryTrack.clientWidth;

                if (
                    galleryTrack.scrollLeft >=
                    max - 20
                ) {

                    galleryTrack.scrollTo({

                        left: 0,
                        behavior: "smooth"

                    });

                } else {

                    galleryMove(1);

                }

            }, 3500);

        galleryAutoplay.textContent =
            "❚❚ Pausar";

        showToast(
            "Autoplay ativado"
        );

    }
);


/* =========================================================
   LIGHTBOX
========================================================= */

$$(".gallery-item img").forEach(image => {

    image.addEventListener(
        "click",
        () => {

            if (
                !lightbox ||
                !lightboxImage
            ) {
                return;
            }

            lightboxImage.src =
                image.src;

            lightbox.classList.add(
                "open"
            );

        }
    );

});


function closeLightbox() {

    lightbox?.classList.remove(
        "open"
    );

}

$("#lightboxClose")?.addEventListener(
    "click",
    closeLightbox
);

$("#lightboxBackdrop")?.addEventListener(
    "click",
    closeLightbox
);


/* =========================================================
   MOODS
========================================================= */

const moods = {

    romantico: {
        primary: "#df76a8",
        secondary: "#9562dc"
    },

    sonhador: {
        primary: "#a78bfa",
        secondary: "#60a5fa"
    },

    noturno: {
        primary: "#7c3aed",
        secondary: "#312e81"
    },

    energia: {
        primary: "#fb7185",
        secondary: "#f59e0b"
    },

    calmo: {
        primary: "#5eead4",
        secondary: "#60a5fa"
    }

};


$$(".mood-button").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            $$(".mood-button")
                .forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

            button.classList.add(
                "active"
            );

            const mood =
                moods[
                    button.dataset.mood
                ];

            if (!mood) return;

            applyColors(
                mood.primary,
                mood.secondary
            );

            showToast(
                `Mood ${
                    button.textContent.trim()
                } ativado`
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

const quizQuestion =
    $("#quizQuestion");

const quizOptions =
    $("#quizOptions");

const quizStep =
    $("#quizStep");

const quizProgressBar =
    $("#quizProgressBar");


const quizData = [

    {
        question:
            "Qual momento combina mais com você?",

        options: [

            {
                text:
                    "Um encontro romântico ♡",
                type:
                    "romantico"
            },

            {
                text:
                    "Uma noite olhando o céu ☾",
                type:
                    "sonhador"
            },

            {
                text:
                    "Uma festa ✦",
                type:
                    "energia"
            },

            {
                text:
                    "Um momento tranquilo ☁",
                type:
                    "calmo"
            }

        ]
    },

    {
        question:
            "Escolha uma sensação.",

        options: [

            {
                text:
                    "Romance",
                type:
                    "romantico"
            },

            {
                text:
                    "Liberdade",
                type:
                    "sonhador"
            },

            {
                text:
                    "Intensidade",
                type:
                    "energia"
            },

            {
                text:
                    "Conforto",
                type:
                    "calmo"
            }

        ]
    },

    {
        question:
            "Qual símbolo você escolheria?",

        options: [

            {
                text:
                    "♡ Coração",
                type:
                    "romantico"
            },

            {
                text:
                    "☾ Lua",
                type:
                    "sonhador"
            },

            {
                text:
                    "✦ Estrela",
                type:
                    "energia"
            },

            {
                text:
                    "☁ Nuvem",
                type:
                    "calmo"
            }

        ]
    },

    {
        question:
            "Escolha seu cenário Dream.",

        options: [

            {
                text:
                    "Jardim florido",
                type:
                    "romantico"
            },

            {
                text:
                    "Céu estrelado",
                type:
                    "sonhador"
            },

            {
                text:
                    "Cidade iluminada",
                type:
                    "energia"
            },

            {
                text:
                    "Fim de tarde",
                type:
                    "calmo"
            }

        ]
    }

];


const quizResults = {

    romantico: {
        icon: "♡",
        title:
            "Dream Lover",
        text:
            "Seu perfil é romântico, delicado e apaixonado pelos pequenos detalhes."
    },

    sonhador: {
        icon: "☾",
        title:
            "Dreamer",
        text:
            "Você gosta de imaginar, criar e transformar momentos em lembranças."
    },

    energia: {
        icon: "✦",
        title:
            "Dream Energy",
        text:
            "Você tem uma personalidade vibrante, marcante e cheia de energia."
    },

    calmo: {
        icon: "☁",
        title:
            "Soft Dream",
        text:
            "Você valoriza conforto, tranquilidade e momentos leves."
    }

};


let quizIndex = 0;

let quizScore = {};


function startQuiz() {

    quizIndex = 0;

    quizScore = {
        romantico: 0,
        sonhador: 0,
        energia: 0,
        calmo: 0
    };

    quizStart.hidden = true;
    quizResult.hidden = true;
    quizQuestions.hidden = false;

    renderQuiz();

}


function renderQuiz() {

    const item =
        quizData[quizIndex];

    quizQuestion.textContent =
        item.question;

    quizStep.textContent =
        `${quizIndex + 1} / ${quizData.length}`;

    quizProgressBar.style.width =
        `${
            ((quizIndex + 1) /
            quizData.length) *
            100
        }%`;

    quizOptions.innerHTML = "";

    item.options.forEach(option => {

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

                quizScore[
                    option.type
                ]++;

                quizIndex++;

                if (
                    quizIndex >=
                    quizData.length
                ) {

                    finishQuiz();

                } else {

                    renderQuiz();

                }

            }
        );

        quizOptions.appendChild(
            button
        );

    });

}


function finishQuiz() {

    quizQuestions.hidden = true;
    quizResult.hidden = false;

    const winner =
        Object.entries(
            quizScore
        )
        .sort(
            (a, b) =>
                b[1] - a[1]
        )[0][0];

    const result =
        quizResults[winner];

    $("#quizResultIcon").textContent =
        result.icon;

    $("#quizResultTitle").textContent =
        result.title;

    $("#quizResultText").textContent =
        result.text;

    localStorage.setItem(
        "dreamQuizResult",
        winner
    );

    unlockAchievement(
        "Perfil Descoberto"
    );

    createConfetti();

}


$("#startQuiz")?.addEventListener(
    "click",
    startQuiz
);

$("#restartQuiz")?.addEventListener(
    "click",
    startQuiz
);


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        setTimeout(() => {

            createClickHeart(

                Math.random() *
                    window.innerWidth,

                window.innerHeight *
                    (
                        0.25 +
                        Math.random() *
                        0.5
                    )

            );

        }, i * 25);

    }

}


/* =========================================================
   SETTINGS
========================================================= */

settingsButton?.addEventListener(
    "click",
    () => {

        settingsPanel?.classList.add(
            "open"
        );

    }
);

closeSettings?.addEventListener(
    "click",
    () => {

        settingsPanel?.classList.remove(
            "open"
        );

    }
);


/* =========================================================
   CORES
========================================================= */

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

    let value =
        hex.replace(
            "#",
            ""
        );

    if (
        value.length === 3
    ) {

        value =
            value
                .split("")
                .map(
                    char =>
                        char + char
                )
                .join("");

    }

    const number =
        parseInt(
            value,
            16
        );

    return {

        r:
            (number >> 16) &
            255,

        g:
            (number >> 8) &
            255,

        b:
            number & 255

    };

}


function applyColors(
    primary,
    secondary,
    save = true
) {

    root.style.setProperty(
        "--primary",
        primary
    );

    root.style.setProperty(
        "--secondary",
        secondary
    );

    const p =
        hexToRgb(primary);

    const s =
        hexToRgb(secondary);

    root.style.setProperty(
        "--primary-rgb",
        `${p.r}, ${p.g}, ${p.b}`
    );

    root.style.setProperty(
        "--secondary-rgb",
        `${s.r}, ${s.g}, ${s.b}`
    );

    const primaryInput =
        $("#primaryColor");

    const secondaryInput =
        $("#secondaryColor");

    if (primaryInput) {

        primaryInput.value =
            primary;

    }

    if (secondaryInput) {

        secondaryInput.value =
            secondary;

    }

    if (save) {

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


$$(".palette").forEach(button => {

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

            $$(".palette")
                .forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

            button.classList.add(
                "active"
            );

            applyColors(
                palette[0],
                palette[1]
            );

        }
    );

});


$("#primaryColor")?.addEventListener(
    "input",
    event => {

        applyColors(
            event.target.value,
            $("#secondaryColor").value
        );

    }
);


$("#secondaryColor")?.addEventListener(
    "input",
    event => {

        applyColors(
            $("#primaryColor").value,
            event.target.value
        );

    }
);


/* =========================================================
   DARK MODE
========================================================= */

const darkToggle =
    $("#darkToggle");

const themeButton =
    $("#themeButton");


function setDark(
    active,
    save = true
) {

    body.classList.toggle(
        "dark",
        active
    );

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

        localStorage.setItem(
            "dreamDark",
            active
        );

    }

}


darkToggle?.addEventListener(
    "change",
    () => {

        setDark(
            darkToggle.checked
        );

    }
);


themeButton?.addEventListener(
    "click",
    () => {

        setDark(
            !body.classList.contains(
                "dark"
            )
        );

    }
);


/* =========================================================
   SWITCHES ANTIGOS
========================================================= */

const particlesToggle =
    $("#particlesToggle");

const animationsToggle =
    $("#animationsToggle");

const glassToggle =
    $("#glassToggle");

const cursorToggle =
    $("#cursorToggle");


particlesToggle?.addEventListener(
    "change",
    () => {

        state.particles =
            particlesToggle.checked;

        body.classList.toggle(
            "no-particles",
            !state.particles
        );

        saveState();

    }
);


animationsToggle?.addEventListener(
    "change",
    () => {

        state.animations =
            animationsToggle.checked;

        body.classList.toggle(
            "no-animations",
            !state.animations
        );

        saveState();

    }
);


glassToggle?.addEventListener(
    "change",
    () => {

        state.glass =
            glassToggle.checked;

        body.classList.toggle(
            "no-glass",
            !state.glass
        );

        saveState();

    }
);


cursorToggle?.addEventListener(
    "change",
    () => {

        state.cursor =
            cursorToggle.checked;

        body.classList.toggle(
            "no-cursor",
            !state.cursor
        );

        saveState();

    }
);


/* =========================================================
   FONT SIZE
========================================================= */

$$("[data-font-size]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                $$("[data-font-size]")
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });

                button.classList.add(
                    "active"
                );

                body.classList.remove(
                    "font-small",
                    "font-normal",
                    "font-large"
                );

                const size =
                    button.dataset.fontSize;

                body.classList.add(
                    `font-${size}`
                );

                localStorage.setItem(
                    "dreamFont",
                    size
                );

            }
        );

    });


/* =========================================================
   PARTÍCULAS
========================================================= */

function generateParticles() {

    if (!particles) return;

    particles.innerHTML = "";

    const symbols = [
        "♡",
        "✦",
        "·",
        "✿"
    ];

    for (
        let i = 0;
        i < state.particleAmount;
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
                Math.random() * 17
            }px`;

        particle.style.setProperty(
            "--duration",
            `${
                8 +
                Math.random() * 12
            }s`
        );

        particle.style.setProperty(
            "--delay",
            `${
                -Math.random() * 15
            }s`
        );

        particles.appendChild(
            particle
        );

    }

}

generateParticles();


/* =========================================================
   CRIAR CONTROLES NOVOS
========================================================= */

function createAdvancedSettings() {

    if (!settingsPanel) {
        return;
    }

    if (
        $("#dreamAdvancedSettings")
    ) {
        return;
    }

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.id =
        "dreamAdvancedSettings";

    wrapper.innerHTML = `

        <div class="settings-group">

            <span class="settings-title">
                Efeitos Dream
            </span>

            <div class="settings-button-grid">

                <button
                    class="settings-action"
                    id="petalsButton"
                    type="button"
                >
                    <span>🌸</span>
                    <strong>Pétalas</strong>
                </button>

                <button
                    class="settings-action"
                    id="starsButton"
                    type="button"
                >
                    <span>✦</span>
                    <strong>Estrelas</strong>
                </button>

                <button
                    class="settings-action"
                    id="heartsButton"
                    type="button"
                >
                    <span>♡</span>
                    <strong>Corações</strong>
                </button>

                <button
                    class="settings-action"
                    id="auroraButton"
                    type="button"
                >
                    <span>🌈</span>
                    <strong>Aurora</strong>
                </button>

                <button
                    class="settings-action"
                    id="gradientButton"
                    type="button"
                >
                    <span>🎨</span>
                    <strong>Gradiente</strong>
                </button>

                <button
                    class="settings-action"
                    id="ultimateButton"
                    type="button"
                >
                    <span>👑</span>
                    <strong>Ultimate</strong>
                </button>

            </div>

        </div>


        <div class="settings-group">

            <span class="settings-title">
                Frasco
            </span>

            <div class="settings-button-grid">

                <button
                    class="settings-action"
                    id="autoRotateButton"
                    type="button"
                >
                    <span>↻</span>
                    <strong>Rotação automática</strong>
                </button>

                <button
                    class="settings-action"
                    id="reflectionButton"
                    type="button"
                >
                    <span>✨</span>
                    <strong>Reflexo</strong>
                </button>

                <button
                    class="settings-action"
                    id="spinBottleButton"
                    type="button"
                >
                    <span>🔄</span>
                    <strong>Girar agora</strong>
                </button>

                <button
                    class="settings-action"
                    id="spraySettingsButton"
                    type="button"
                >
                    <span>💨</span>
                    <strong>Borrifar</strong>
                </button>

            </div>


            <div class="range-setting">

                <div>
                    <strong>
                        Tamanho
                    </strong>

                    <span id="bottleScaleValue">
                        100%
                    </span>
                </div>

                <input
                    type="range"
                    id="bottleScaleRange"
                    min="70"
                    max="135"
                    value="100"
                >

            </div>


            <div class="range-setting">

                <div>
                    <strong>
                        Brilho
                    </strong>

                    <span id="bottleBrightnessValue">
                        100%
                    </span>
                </div>

                <input
                    type="range"
                    id="bottleBrightnessRange"
                    min="60"
                    max="150"
                    value="100"
                >

            </div>


            <div class="range-setting">

                <div>
                    <strong>
                        Rotação
                    </strong>

                    <span id="bottleRotationValue">
                        0°
                    </span>
                </div>

                <input
                    type="range"
                    id="bottleRotationRange"
                    min="-20"
                    max="20"
                    value="0"
                >

            </div>

        </div>


        <div class="settings-group">

            <span class="settings-title">
                Intensidade
            </span>


            <div class="range-setting">

                <div>
                    <strong>
                        Partículas
                    </strong>

                    <span id="particleAmountValue">
                        25
                    </span>
                </div>

                <input
                    type="range"
                    id="particleAmountRange"
                    min="5"
                    max="80"
                    value="25"
                >

            </div>


            <div class="range-setting">

                <div>
                    <strong>
                        Glow
                    </strong>

                    <span id="glowValue">
                        100%
                    </span>
                </div>

                <input
                    type="range"
                    id="glowRange"
                    min="50"
                    max="160"
                    value="100"
                >

            </div>


            <div class="range-setting">

                <div>
                    <strong>
                        Glass Blur
                    </strong>

                    <span id="blurValue">
                        20px
                    </span>
                </div>

                <input
                    type="range"
                    id="blurRange"
                    min="0"
                    max="45"
                    value="20"
                >

            </div>


            <div class="range-setting">

                <div>
                    <strong>
                        Brilho da página
                    </strong>

                    <span id="pageBrightnessValue">
                        100%
                    </span>
                </div>

                <input
                    type="range"
                    id="pageBrightnessRange"
                    min="70"
                    max="125"
                    value="100"
                >

            </div>

        </div>


        <div class="settings-group">

            <span class="settings-title">
                Extras
            </span>

            <div class="settings-button-grid">

                <button
                    class="settings-action"
                    id="timelineAutoButton"
                    type="button"
                >
                    <span>⏱</span>
                    <strong>Timeline automática</strong>
                </button>

                <button
                    class="settings-action"
                    id="randomPaletteButton"
                    type="button"
                >
                    <span>🎲</span>
                    <strong>Paleta aleatória</strong>
                </button>

                <button
                    class="settings-action"
                    id="focusModeButton"
                    type="button"
                >
                    <span>◎</span>
                    <strong>Modo foco</strong>
                </button>

                <button
                    class="settings-action"
                    id="photoModeButton"
                    type="button"
                >
                    <span>📷</span>
                    <strong>Modo foto</strong>
                </button>

                <button
                    class="settings-action"
                    id="surpriseButton"
                    type="button"
                >
                    <span>🎁</span>
                    <strong>Surpresa Dream</strong>
                </button>

                <button
                    class="settings-action"
                    id="disableEffectsButton"
                    type="button"
                >
                    <span>○</span>
                    <strong>Desligar efeitos</strong>
                </button>

            </div>

        </div>

    `;

    const resetButton =
        $("#resetSettings");

    if (resetButton) {

        settingsPanel.insertBefore(
            wrapper,
            resetButton
        );

    } else {

        settingsPanel.appendChild(
            wrapper
        );

    }

    bindAdvancedSettings();

}


/* =========================================================
   ADVANCED SETTINGS
========================================================= */

function bindAdvancedSettings() {

    $("#petalsButton")
        ?.addEventListener(
            "click",
            togglePetals
        );

    $("#starsButton")
        ?.addEventListener(
            "click",
            toggleStars
        );

    $("#heartsButton")
        ?.addEventListener(
            "click",
            () => {

                state.hearts =
                    !state.hearts;

                showToast(
                    state.hearts
                        ? "Corações no clique ativados ♡"
                        : "Corações no clique desativados"
                );

                saveState();

            }
        );

    $("#auroraButton")
        ?.addEventListener(
            "click",
            () => {

                state.aurora =
                    !state.aurora;

                body.classList.toggle(
                    "aurora-mode",
                    state.aurora
                );

                showToast(
                    state.aurora
                        ? "Aurora Dream ativada 🌈"
                        : "Aurora desativada"
                );

                saveState();

            }
        );

    $("#gradientButton")
        ?.addEventListener(
            "click",
            () => {

                state.gradient =
                    !state.gradient;

                body.classList.toggle(
                    "animated-gradient",
                    state.gradient
                );

                showToast(
                    state.gradient
                        ? "Gradiente animado ativado"
                        : "Gradiente animado desativado"
                );

                saveState();

            }
        );

    $("#ultimateButton")
        ?.addEventListener(
            "click",
            toggleUltimate
        );

    $("#autoRotateButton")
        ?.addEventListener(
            "click",
            () => {

                state.autoRotate =
                    !state.autoRotate;

                body.classList.toggle(
                    "auto-rotate",
                    state.autoRotate
                );

                resetBottleMouse();

                showToast(
                    state.autoRotate
                        ? "Rotação automática ativada"
                        : "Rotação automática desativada"
                );

                saveState();

            }
        );

    $("#reflectionButton")
        ?.addEventListener(
            "click",
            () => {

                state.reflection =
                    !state.reflection;

                body.classList.toggle(
                    "bottle-reflection",
                    state.reflection
                );

                showToast(
                    state.reflection
                        ? "Reflexo ativado ✨"
                        : "Reflexo desativado"
                );

                saveState();

            }
        );

    $("#spinBottleButton")
        ?.addEventListener(
            "click",
            spinBottle
        );

    $("#spraySettingsButton")
        ?.addEventListener(
            "click",
            spray
        );

    $("#timelineAutoButton")
        ?.addEventListener(
            "click",
            toggleTimelineAuto
        );

    $("#randomPaletteButton")
        ?.addEventListener(
            "click",
            randomPalette
        );

    $("#focusModeButton")
        ?.addEventListener(
            "click",
            () => {

                body.classList.toggle(
                    "focus-mode"
                );

                showToast(
                    body.classList.contains(
                        "focus-mode"
                    )
                        ? "Modo foco ativado"
                        : "Modo foco desativado"
                );

            }
        );

    $("#photoModeButton")
        ?.addEventListener(
            "click",
            activatePhotoMode
        );

    $("#surpriseButton")
        ?.addEventListener(
            "click",
            surpriseDream
        );

    $("#disableEffectsButton")
        ?.addEventListener(
            "click",
            disableEffects
        );

    bindRange(
        "#bottleScaleRange",
        "#bottleScaleValue",
        value => {

            state.bottleScale =
                value / 100;

            root.style.setProperty(
                "--bottle-scale",
                state.bottleScale
            );

            return `${value}%`;

        }
    );

    bindRange(
        "#bottleBrightnessRange",
        "#bottleBrightnessValue",
        value => {

            state.bottleBrightness =
                value / 100;

            root.style.setProperty(
                "--bottle-brightness",
                state.bottleBrightness
            );

            return `${value}%`;

        }
    );

    bindRange(
        "#bottleRotationRange",
        "#bottleRotationValue",
        value => {

            state.bottleRotation =
                value;

            root.style.setProperty(
                "--bottle-rotation",
                `${value}deg`
            );

            return `${value}°`;

        }
    );

    bindRange(
        "#particleAmountRange",
        "#particleAmountValue",
        value => {

            state.particleAmount =
                value;

            generateParticles();

            return value;

        }
    );

    bindRange(
        "#glowRange",
        "#glowValue",
        value => {

            state.glowStrength =
                value / 100;

            root.style.setProperty(
                "--glow-strength",
                state.glowStrength
            );

            return `${value}%`;

        }
    );

    bindRange(
        "#blurRange",
        "#blurValue",
        value => {

            state.glassBlur =
                value;

            root.style.setProperty(
                "--glass-blur",
                `${value}px`
            );

            return `${value}px`;

        }
    );

    bindRange(
        "#pageBrightnessRange",
        "#pageBrightnessValue",
        value => {

            state.pageBrightness =
                value / 100;

            root.style.setProperty(
                "--page-brightness",
                state.pageBrightness
            );

            return `${value}%`;

        }
    );

}


/* =========================================================
   RANGE HELPER
========================================================= */

function bindRange(
    rangeSelector,
    valueSelector,
    callback
) {

    const range =
        $(rangeSelector);

    const label =
        $(valueSelector);

    if (
        !range ||
        !label
    ) {
        return;
    }

    range.addEventListener(
        "input",
        () => {

            const value =
                Number(
                    range.value
                );

            label.textContent =
                callback(value);

            saveState();

        }
    );

}


/* =========================================================
   GIRAR FRASCO
========================================================= */

function spinBottle() {

    if (!mainBottle) return;

    mainBottle.classList.remove(
        "spinning"
    );

    void mainBottle.offsetWidth;

    mainBottle.classList.add(
        "spinning"
    );

    setTimeout(
        () => {

            mainBottle.classList.remove(
                "spinning"
            );

        },
        1100
    );

}


/* =========================================================
   PÉTALAS
========================================================= */

let petalsInterval = null;


function togglePetals() {

    state.petals =
        !state.petals;

    if (state.petals) {

        startPetals();

        showToast(
            "Pétalas ativadas 🌸"
        );

    } else {

        stopPetals();

        showToast(
            "Pétalas desativadas"
        );

    }

    saveState();

}


function startPetals() {

    if (
        $(".petals-layer")
    ) {
        return;
    }

    const layer =
        document.createElement(
            "div"
        );

    layer.className =
        "petals-layer";

    body.appendChild(layer);

    petalsInterval =
        setInterval(
            createPetal,
            350
        );

}


function createPetal() {

    const layer =
        $(".petals-layer");

    if (!layer) return;

    const petal =
        document.createElement(
            "span"
        );

    petal.className =
        "dream-petal";

    petal.style.left =
        `${Math.random() * 100}%`;

    petal.style.setProperty(
        "--petal-duration",
        `${
            5 +
            Math.random() * 5
        }s`
    );

    petal.style.setProperty(
        "--petal-x",
        `${
            -100 +
            Math.random() * 200
        }px`
    );

    layer.appendChild(
        petal
    );

    setTimeout(
        () => petal.remove(),
        11000
    );

}


function stopPetals() {

    clearInterval(
        petalsInterval
    );

    petalsInterval = null;

    $(".petals-layer")
        ?.remove();

}


/* =========================================================
   ESTRELAS
========================================================= */

function toggleStars() {

    state.stars =
        !state.stars;

    if (state.stars) {

        startStars();

        showToast(
            "Céu Dream ativado ✦"
        );

    } else {

        stopStars();

        showToast(
            "Estrelas desativadas"
        );

    }

    saveState();

}


function startStars() {

    if (
        $(".stars-layer")
    ) {
        return;
    }

    const layer =
        document.createElement(
            "div"
        );

    layer.className =
        "stars-layer";

    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );

        star.className =
            "dream-star";

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.setProperty(
            "--star-size",
            `${
                1 +
                Math.random() * 3
            }px`
        );

        star.style.setProperty(
            "--star-speed",
            `${
                1 +
                Math.random() * 4
            }s`
        );

        layer.appendChild(
            star
        );

    }

    body.appendChild(
        layer
    );

}


function stopStars() {

    $(".stars-layer")
        ?.remove();

}


/* =========================================================
   CORAÇÃO NO CLIQUE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (!state.hearts) {
            return;
        }

        if (
            event.target.closest(
                ".settings-panel"
            )
        ) {
            return;
        }

        createClickHeart(
            event.clientX,
            event.clientY
        );

    }
);


function createClickHeart(
    x,
    y
) {

    const heart =
        document.createElement(
            "span"
        );

    heart.className =
        "click-heart";

    heart.textContent =
        Math.random() > 0.5
            ? "♡"
            : "♥";

    heart.style.left =
        `${x}px`;

    heart.style.top =
        `${y}px`;

    body.appendChild(
        heart
    );

    setTimeout(
        () => heart.remove(),
        1000
    );

}


/* =========================================================
   LOVE EXPLOSION
========================================================= */

function activateLoveExplosion() {

    const layer =
        document.createElement(
            "div"
        );

    layer.className =
        "heart-rain-container";

    body.appendChild(
        layer
    );

    for (
        let i = 0;
        i < 70;
        i++
    ) {

        setTimeout(() => {

            const heart =
                document.createElement(
                    "span"
                );

            heart.className =
                "heart-rain";

            heart.textContent =
                Math.random() > 0.5
                    ? "♡"
                    : "♥";

            heart.style.left =
                `${Math.random() * 100}%`;

            heart.style.fontSize =
                `${
                    15 +
                    Math.random() * 35
                }px`;

            heart.style.setProperty(
                "--heart-duration",
                `${
                    3 +
                    Math.random() * 4
                }s`
            );

            layer.appendChild(
                heart
            );

        }, i * 35);

    }

    setTimeout(
        () => layer.remove(),
        8000
    );

}


/* =========================================================
   ULTIMATE MODE
========================================================= */

function toggleUltimate() {

    state.ultimate =
        !state.ultimate;

    body.classList.toggle(
        "dream-ultimate",
        state.ultimate
    );

    if (state.ultimate) {

        state.aurora = true;
        state.gradient = true;
        state.hearts = true;
        state.reflection = true;

        body.classList.add(
            "aurora-mode",
            "animated-gradient",
            "bottle-reflection"
        );

        if (!state.petals) {

            state.petals = true;
            startPetals();

        }

        if (!state.stars) {

            state.stars = true;
            startStars();

        }

        activateLoveExplosion();

        showToast(
            "DREAM ULTIMATE ATIVADO 👑"
        );

        unlockAchievement(
            "Dream Ultimate"
        );

    } else {

        body.classList.remove(
            "dream-ultimate"
        );

        showToast(
            "Dream Ultimate desativado"
        );

    }

    saveState();

}


/* =========================================================
   RANDOM PALETTE
========================================================= */

function randomColor() {

    return (
        "#" +
        Math.floor(
            Math.random() *
            16777215
        )
        .toString(16)
        .padStart(6, "0")
    );

}


function randomPalette() {

    const primary =
        randomColor();

    const secondary =
        randomColor();

    applyColors(
        primary,
        secondary
    );

    showToast(
        "Nova paleta Dream 🎨"
    );

}


/* =========================================================
   SURPRESA
========================================================= */

function surpriseDream() {

    const surprises = [

        () => randomPalette(),

        () => activateLoveExplosion(),

        () => {
            spinBottle();
            spray();
        },

        () => {
            state.aurora = true;

            body.classList.add(
                "aurora-mode"
            );

            showToast(
                "Aurora surpresa 🌈"
            );
        },

        () => {
            if (!state.petals) {
                state.petals = true;
                startPetals();
            }

            showToast(
                "Chuva de pétalas 🌸"
            );
        },

        () => {
            if (!state.stars) {
                state.stars = true;
                startStars();
            }

            showToast(
                "Um céu apareceu ✦"
            );
        }

    ];

    surprises[
        Math.floor(
            Math.random() *
            surprises.length
        )
    ]();

}


/* =========================================================
   DESLIGAR EFEITOS
========================================================= */

function disableEffects() {

    state.petals = false;
    state.stars = false;
    state.hearts = false;

    state.aurora = false;
    state.gradient = false;

    state.autoRotate = false;
    state.reflection = false;

    state.ultimate = false;

    stopPetals();
    stopStars();

    body.classList.remove(
        "aurora-mode",
        "animated-gradient",
        "auto-rotate",
        "bottle-reflection",
        "dream-ultimate"
    );

    showToast(
        "Efeitos extras desligados"
    );

    saveState();

}


/* =========================================================
   PHOTO MODE
========================================================= */

function activatePhotoMode() {

    body.classList.add(
        "photo-mode"
    );

    settingsPanel?.classList.remove(
        "open"
    );

    if (
        $("#exitPhotoMode")
    ) {
        return;
    }

    const button =
        document.createElement(
            "button"
        );

    button.id =
        "exitPhotoMode";

    button.className =
        "exit-special-mode";

    button.textContent =
        "Sair do modo foto";

    button.addEventListener(
        "click",
        () => {

            body.classList.remove(
                "photo-mode"
            );

            button.remove();

        }
    );

    body.appendChild(
        button
    );

}


/* =========================================================
   CONQUISTAS
========================================================= */

function unlockAchievement(
    name
) {

    if (
        state.achievements.has(
            name
        )
    ) {
        return;
    }

    state.achievements.add(
        name
    );

    localStorage.setItem(
        "dreamAchievements",
        JSON.stringify(
            [...state.achievements]
        )
    );

    showToast(
        `🏆 Conquista: ${name}`
    );

}


/* =========================================================
   STATS
========================================================= */

const sessionStart =
    Date.now();


function createStats() {

    const experienceGrid =
        $(".experience-grid");

    if (
        !experienceGrid ||
        $("#dreamSessionStats")
    ) {
        return;
    }

    const card =
        document.createElement(
            "article"
        );

    card.id =
        "dreamSessionStats";

    card.className =
        "experience-card experience-stats reveal visible";

    card.innerHTML = `

        <small>
            SUA EXPERIÊNCIA
        </small>

        <h3>
            Dream Session
        </h3>

        <div class="session-stats">

            <div class="session-stat">

                <span>⏱</span>

                <strong id="sessionTime">
                    0:00
                </strong>

                <small>
                    no Dream
                </small>

            </div>

            <div class="session-stat">

                <span>♡</span>

                <strong id="interactionCount">
                    0
                </strong>

                <small>
                    interações
                </small>

            </div>

            <div class="session-stat">

                <span>↕</span>

                <strong id="explorePercent">
                    0%
                </strong>

                <small>
                    explorado
                </small>

            </div>

        </div>

    `;

    experienceGrid.appendChild(
        card
    );

}


function updateStats() {

    const time =
        Math.floor(
            (
                Date.now() -
                sessionStart
            ) / 1000
        );

    const minutes =
        Math.floor(
            time / 60
        );

    const seconds =
        String(
            time % 60
        ).padStart(
            2,
            "0"
        );

    const sessionTime =
        $("#sessionTime");

    const interactionCount =
        $("#interactionCount");

    const explorePercent =
        $("#explorePercent");

    if (sessionTime) {

        sessionTime.textContent =
            `${minutes}:${seconds}`;

    }

    if (interactionCount) {

        interactionCount.textContent =
            state.interactions;

    }

    if (explorePercent) {

        explorePercent.textContent =
            `${Math.round(
                state.maxScroll
            )}%`;

    }

}

createStats();

setInterval(
    updateStats,
    1000
);


/* =========================================================
   DREAM LAB
========================================================= */

function createDreamLab() {

    if (
        $("#dreamLab")
    ) {
        return;
    }

    const finalSection =
        $("#final");

    if (!finalSection) {
        return;
    }

    const lab =
        document.createElement(
            "section"
        );

    lab.id =
        "dreamLab";

    lab.className =
        "dream-lab section-track";

    lab.dataset.sectionName =
        "Dream Lab";

    lab.innerHTML = `

        <div class="section-title reveal visible">

            <span class="eyebrow">
                DREAM LAB
            </span>

            <h2>
                Crie seu próprio
                <span>
                    universo.
                </span>
            </h2>

            <p>
                Experimente cores, frases
                e pequenos efeitos Dream.
            </p>

        </div>


        <div class="dream-lab-grid">

            <article class="lab-card">

                <div class="lab-icon">
                    ♡
                </div>

                <small>
                    DREAM MESSAGE
                </small>

                <h3>
                    Frase do momento
                </h3>

                <blockquote id="dreamQuote">
                    O amor mora nos detalhes.
                </blockquote>

                <div class="lab-actions">

                    <button
                        class="primary-btn"
                        id="newQuoteButton"
                        type="button"
                    >
                        Nova frase
                    </button>

                    <button
                        class="outline-btn"
                        id="copyQuoteButton"
                        type="button"
                    >
                        Copiar
                    </button>

                </div>

            </article>


            <article class="lab-card lab-card-featured">

                <div class="lab-icon">
                    🎨
                </div>

                <small>
                    DREAM COLORS
                </small>

                <h3>
                    Paleta surpresa
                </h3>

                <p>
                    Gere uma combinação
                    exclusiva para o site.
                </p>

                <div class="random-colors">

                    <i id="randomColorOne"></i>

                    <i id="randomColorTwo"></i>

                </div>

                <button
                    class="primary-btn"
                    id="labRandomPalette"
                    type="button"
                >
                    Gerar paleta
                </button>

            </article>


            <article class="lab-card">

                <div class="lab-icon">
                    ✦
                </div>

                <small>
                    DREAM EFFECT
                </small>

                <h3>
                    Momento mágico
                </h3>

                <p>
                    Ative uma pequena
                    surpresa visual.
                </p>

                <button
                    class="primary-btn"
                    id="magicButton"
                    type="button"
                >
                    Criar magia
                </button>

            </article>


            <article class="lab-card">

                <div class="lab-icon">
                    🏆
                </div>

                <small>
                    CONQUISTAS
                </small>

                <h3>
                    Seu progresso
                </h3>

                <p id="achievementText">
                    Explore o site para
                    desbloquear conquistas.
                </p>

                <button
                    class="outline-btn"
                    id="achievementButton"
                    type="button"
                >
                    Ver conquistas
                </button>

            </article>

        </div>

    `;

    finalSection.before(
        lab
    );

    bindDreamLab();

}


const dreamQuotes = [

    "O amor mora nos detalhes.",

    "Alguns momentos merecem ficar no ar.",

    "Sonhar também é uma forma de sentir.",

    "Deixe sua presença virar lembrança.",

    "Todo sonho começa com um pequeno instante.",

    "Há sentimentos que não precisam de palavras.",

    "O extraordinário pode morar em um momento simples.",

    "Leve um pouco de sonho por onde você passar.",

    "Algumas memórias começam com uma fragrância.",

    "Dream ♡ Amor no Ar."

];


function bindDreamLab() {

    $("#newQuoteButton")
        ?.addEventListener(
            "click",
            () => {

                const quote =
                    dreamQuotes[
                        Math.floor(
                            Math.random() *
                            dreamQuotes.length
                        )
                    ];

                $("#dreamQuote").textContent =
                    quote;

            }
        );

    $("#copyQuoteButton")
        ?.addEventListener(
            "click",
            async () => {

                const quote =
                    $("#dreamQuote")
                        ?.textContent;

                if (!quote) return;

                try {

                    await navigator.clipboard
                        .writeText(
                            quote
                        );

                    showToast(
                        "Frase copiada ♡"
                    );

                } catch {

                    showToast(
                        "Não foi possível copiar"
                    );

                }

            }
        );

    $("#labRandomPalette")
        ?.addEventListener(
            "click",
            () => {

                randomPalette();

                const primary =
                    getComputedStyle(root)
                        .getPropertyValue(
                            "--primary"
                        );

                const secondary =
                    getComputedStyle(root)
                        .getPropertyValue(
                            "--secondary"
                        );

                $("#randomColorOne")
                    .style.background =
                        primary;

                $("#randomColorTwo")
                    .style.background =
                        secondary;

            }
        );

    $("#magicButton")
        ?.addEventListener(
            "click",
            () => {

                activateLoveExplosion();
                spinBottle();

                unlockAchievement(
                    "Dream Magic"
                );

            }
        );

    $("#achievementButton")
        ?.addEventListener(
            "click",
            () => {

                if (
                    state.achievements.size === 0
                ) {

                    showToast(
                        "Nenhuma conquista ainda"
                    );

                    return;
                }

                showToast(
                    [...state.achievements]
                        .join(" • ")
                );

            }
        );

}

createDreamLab();


/* =========================================================
   EASTER EGGS
========================================================= */

let typedSequence = "";


document.addEventListener(
    "keydown",
    event => {

        if (
            event.target.matches(
                "input, textarea"
            )
        ) {
            return;
        }

        if (
            event.key.length === 1
        ) {

            typedSequence +=
                event.key.toUpperCase();

            typedSequence =
                typedSequence.slice(-15);

        }


        if (
            typedSequence.endsWith(
                "DREAM"
            )
        ) {

            typedSequence = "";

            activateSecret(
                "♡"
            );

            activateLoveExplosion();

            unlockAchievement(
                "Dream Secret"
            );

        }


        if (
            typedSequence.endsWith(
                "LOVE"
            )
        ) {

            typedSequence = "";

            activateSecret(
                "♥"
            );

            activateLoveExplosion();

            showToast(
                "LOVE MODE ♡"
            );

            unlockAchievement(
                "Love Secret"
            );

        }


        if (
            typedSequence.endsWith(
                "350"
            )
        ) {

            typedSequence = "";

            spinBottle();
            spray();

            showToast(
                "350 ML SECRET ✦"
            );

            unlockAchievement(
                "350 Secret"
            );

        }

    }
);


function activateSecret(
    symbol
) {

    const secret =
        document.createElement(
            "div"
        );

    secret.className =
        "keyboard-secret";

    secret.textContent =
        symbol;

    body.appendChild(
        secret
    );

    requestAnimationFrame(
        () => {

            secret.classList.add(
                "active"
            );

        }
    );

    setTimeout(
        () => {

            secret.classList.remove(
                "active"
            );

        },
        900
    );

    setTimeout(
        () => secret.remove(),
        1400
    );

}


/* =========================================================
   ATALHOS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.target.matches(
                "input, textarea"
            )
        ) {
            return;
        }

        const key =
            event.key.toLowerCase();

        if (key === "g") {

            $("#galeria")
                ?.scrollIntoView({
                    behavior:
                        "smooth"
                });

        }

        if (key === "q") {

            $("#quiz")
                ?.scrollIntoView({
                    behavior:
                        "smooth"
                });

        }

        if (key === "p") {

            settingsPanel?.classList.toggle(
                "open"
            );

        }

        if (key === "s") {

            spray();

        }

    }
);


/* =========================================================
   SALVAR ESTADO
========================================================= */

function saveState() {

    const data = {

        particles:
            state.particles,

        animations:
            state.animations,

        glass:
            state.glass,

        cursor:
            state.cursor,

        petals:
            state.petals,

        stars:
            state.stars,

        hearts:
            state.hearts,

        aurora:
            state.aurora,

        gradient:
            state.gradient,

        autoRotate:
            state.autoRotate,

        reflection:
            state.reflection,

        particleAmount:
            state.particleAmount,

        glowStrength:
            state.glowStrength,

        bottleScale:
            state.bottleScale,

        bottleBrightness:
            state.bottleBrightness,

        bottleRotation:
            state.bottleRotation,

        glassBlur:
            state.glassBlur,

        pageBrightness:
            state.pageBrightness

    };

    localStorage.setItem(
        "dreamState",
        JSON.stringify(data)
    );

}


/* =========================================================
   CARREGAR ESTADO
========================================================= */

function loadState() {

    const savedPrimary =
        localStorage.getItem(
            "dreamPrimary"
        );

    const savedSecondary =
        localStorage.getItem(
            "dreamSecondary"
        );

    if (
        savedPrimary &&
        savedSecondary
    ) {

        applyColors(
            savedPrimary,
            savedSecondary,
            false
        );

    }


    const savedDark =
        localStorage.getItem(
            "dreamDark"
        ) === "true";

    setDark(
        savedDark,
        false
    );


    const savedFont =
        localStorage.getItem(
            "dreamFont"
        );

    if (savedFont) {

        body.classList.remove(
            "font-small",
            "font-normal",
            "font-large"
        );

        body.classList.add(
            `font-${savedFont}`
        );

        $$("[data-font-size]")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.fontSize ===
                    savedFont
                );

            });

    }


    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "dreamState"
                )
            );

        if (saved) {

            Object.assign(
                state,
                saved
            );

        }

    } catch {

        console.log(
            "Estado Dream não encontrado."
        );

    }


    try {

        const achievements =
            JSON.parse(
                localStorage.getItem(
                    "dreamAchievements"
                )
            );

        if (
            Array.isArray(
                achievements
            )
        ) {

            state.achievements =
                new Set(
                    achievements
                );

        }

    } catch {

        state.achievements =
            new Set();

    }


    state.favoriteNote =
        localStorage.getItem(
            "dreamFavoriteNote"
        );


    applyLoadedState();

}


/* =========================================================
   APLICAR ESTADO
========================================================= */

function applyLoadedState() {

    body.classList.toggle(
        "no-particles",
        !state.particles
    );

    body.classList.toggle(
        "no-animations",
        !state.animations
    );

    body.classList.toggle(
        "no-glass",
        !state.glass
    );

    body.classList.toggle(
        "no-cursor",
        !state.cursor
    );

    body.classList.toggle(
        "aurora-mode",
        state.aurora
    );

    body.classList.toggle(
        "animated-gradient",
        state.gradient
    );

    body.classList.toggle(
        "auto-rotate",
        state.autoRotate
    );

    body.classList.toggle(
        "bottle-reflection",
        state.reflection
    );


    if (particlesToggle) {

        particlesToggle.checked =
            state.particles;

    }

    if (animationsToggle) {

        animationsToggle.checked =
            state.animations;

    }

    if (glassToggle) {

        glassToggle.checked =
            state.glass;

    }

    if (cursorToggle) {

        cursorToggle.checked =
            state.cursor;

    }


    root.style.setProperty(
        "--bottle-scale",
        state.bottleScale
    );

    root.style.setProperty(
        "--bottle-brightness",
        state.bottleBrightness
    );

    root.style.setProperty(
        "--bottle-rotation",
        `${state.bottleRotation}deg`
    );

    root.style.setProperty(
        "--glow-strength",
        state.glowStrength
    );

    root.style.setProperty(
        "--glass-blur",
        `${state.glassBlur}px`
    );

    root.style.setProperty(
        "--page-brightness",
        state.pageBrightness
    );


    if (state.petals) {

        startPetals();

    }

    if (state.stars) {

        startStars();

    }


    generateParticles();

}


/* =========================================================
   RESTAURAR
========================================================= */

$("#resetSettings")
    ?.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "dreamState"
            );

            localStorage.removeItem(
                "dreamPrimary"
            );

            localStorage.removeItem(
                "dreamSecondary"
            );

            localStorage.removeItem(
                "dreamDark"
            );

            localStorage.removeItem(
                "dreamFont"
            );

            state.particles = true;
            state.animations = true;
            state.glass = true;
            state.cursor = true;

            state.petals = false;
            state.stars = false;
            state.hearts = false;

            state.aurora = false;
            state.gradient = false;

            state.autoRotate = false;
            state.reflection = false;

            state.ultimate = false;

            state.particleAmount = 25;

            state.glowStrength = 1;

            state.bottleScale = 1;
            state.bottleBrightness = 1;
            state.bottleRotation = 0;

            state.glassBlur = 20;
            state.pageBrightness = 1;

            stopPetals();
            stopStars();

            body.className = "";

            root.removeAttribute(
                "style"
            );

            applyColors(
                "#df76a8",
                "#9562dc",
                false
            );

            setDark(
                false,
                false
            );

            location.reload();

        }
    );


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

createAdvancedSettings();

loadState();

updateStats();


console.log(
    "%cDream ♡ Amor no Ar",
    `
        font-size:24px;
        font-weight:bold;
        color:#df76a8;
    `
);

console.log(
    "%cSegredos: DREAM • LOVE • 350",
    `
        color:#9562dc;
        font-size:13px;
    `
);