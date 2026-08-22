/* =========================================================
   DREAM AMOR NO AR
   SCRIPT.JS COMPLETO
========================================================= */

"use strict";


/* =========================================================
   ATALHOS
========================================================= */

const $ = (selector, context = document) =>
    context.querySelector(selector);

const $$ = (selector, context = document) =>
    [...context.querySelectorAll(selector)];


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

const particles = $("#particles");
const cursorGlow = $("#cursorGlow");

const heroProduct = $("#heroProduct");
const mainBottle = $("#mainBottle");

const sprayButton = $("#sprayButton");
const sprayArea = $("#sprayArea");

const settingsButton = $("#settingsButton");
const settingsPanel = $("#settingsPanel");
const closeSettings = $("#closeSettings");

const toast = $("#toast");

const sectionIndicator = $("#sectionIndicator");

const themeButton = $("#themeButton");


/* =========================================================
   UTILIDADES
========================================================= */

function clamp(value, min, max) {

    return Math.min(
        Math.max(value, min),
        max
    );

}


function random(min, max) {

    return Math.random() *
        (max - min) +
        min;

}


function randomItem(array) {

    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message = "Dream ♡") {

    if (!toast) return;

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2600);

}


/* =========================================================
   LOADING
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader?.classList.add("hide");

        revealElements();

        animateMeters();

    }, 900);

});


/* =========================================================
   SCROLL
========================================================= */

function handleScroll() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (
                scrollTop /
                documentHeight
            ) * 100
            : 0;

    if (scrollProgress) {

        scrollProgress.style.width =
            `${progress}%`;

    }


    if (header) {

        header.classList.toggle(
            "scrolled",
            scrollTop > 30
        );

    }


    if (backTop) {

        backTop.classList.toggle(
            "show",
            scrollTop > 600
        );

    }


    updateCurrentSection();

}

window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);

handleScroll();


/* =========================================================
   VOLTAR AO TOPO
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

        menuMobile.textContent =
            menu?.classList.contains("open")
                ? "×"
                : "☰";

    }
);


$$(".menu a").forEach(link => {

    link.addEventListener(
        "click",
        () => {

            menu?.classList.remove("open");

            if (menuMobile) {

                menuMobile.textContent = "☰";

            }

        }
    );

});


document.addEventListener(
    "click",
    event => {

        if (
            menu &&
            menuMobile &&
            !menu.contains(event.target) &&
            !menuMobile.contains(event.target)
        ) {

            menu.classList.remove("open");

            menuMobile.textContent = "☰";

        }

    }
);


/* =========================================================
   REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

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


function revealElements() {

    $$(".reveal").forEach(element => {

        revealObserver.observe(element);

    });

}


/* =========================================================
   INDICADOR DE SEÇÃO
========================================================= */

function updateCurrentSection() {

    const sections =
        $$(".section-track");

    let current = null;

    sections.forEach(section => {

        const rect =
            section.getBoundingClientRect();

        if (
            rect.top <=
            window.innerHeight * 0.45
        ) {

            current = section;

        }

    });


    if (!current) return;


    const index =
        sections.indexOf(current) + 1;

    const name =
        current.dataset.sectionName ||
        "Dream";


    if (sectionIndicator) {

        sectionIndicator.innerHTML = `

            <span>
                ${String(index).padStart(2, "0")}
            </span>

            ${name}

        `;

    }


    $$(".menu a").forEach(link => {

        const href =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            href ===
            `#${current.id}`
        );

    });

}


/* =========================================================
   PARTÍCULAS
========================================================= */

const particleSymbols = [
    "♡",
    "✦",
    "✿",
    "·",
    "♡",
    "✧"
];


function createParticles(
    amount = 25
) {

    if (!particles) return;

    particles.innerHTML = "";

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "particle";

        particle.textContent =
            randomItem(
                particleSymbols
            );

        particle.style.left =
            `${random(0, 100)}%`;

        particle.style.fontSize =
            `${random(10, 25)}px`;

        particle.style.setProperty(
            "--duration",
            `${random(11, 25)}s`
        );

        particle.style.setProperty(
            "--delay",
            `${random(-20, 0)}s`
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

document.addEventListener(
    "mousemove",
    event => {

        if (!cursorGlow) return;

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    }
);


/* =========================================================
   EFEITO 3D NO FRASCO
========================================================= */

heroProduct?.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth < 800 ||
            body.classList.contains(
                "no-animations"
            )
        ) {

            return;

        }

        const rect =
            heroProduct
                .getBoundingClientRect();

        const x =
            (
                event.clientX -
                rect.left
            ) / rect.width;

        const y =
            (
                event.clientY -
                rect.top
            ) / rect.height;

        const moveX =
            (x - 0.5) * 14;

        const moveY =
            (y - 0.5) * 10;

        const rotateY =
            (x - 0.5) * 8;

        const rotateX =
            -(y - 0.5) * 6;

        heroProduct.style.setProperty(
            "--mouse-x",
            `${moveX}px`
        );

        heroProduct.style.setProperty(
            "--mouse-y",
            `${moveY}px`
        );

        heroProduct.style.setProperty(
            "--mouse-rx",
            `${rotateX}deg`
        );

        heroProduct.style.setProperty(
            "--mouse-ry",
            `${rotateY}deg`
        );

    }
);


heroProduct?.addEventListener(
    "mouseleave",
    () => {

        heroProduct.style.setProperty(
            "--mouse-x",
            "0px"
        );

        heroProduct.style.setProperty(
            "--mouse-y",
            "0px"
        );

        heroProduct.style.setProperty(
            "--mouse-rx",
            "0deg"
        );

        heroProduct.style.setProperty(
            "--mouse-ry",
            "0deg"
        );

    }
);


/* =========================================================
   BORRIFAR
========================================================= */

function sprayPerfume() {

    if (!sprayArea) return;

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "spray-particle";

        particle.style.left =
            "65%";

        particle.style.top =
            "31%";

        particle.style.setProperty(
            "--size",
            `${random(3, 9)}px`
        );

        particle.style.setProperty(
            "--x",
            `${random(30, 180)}px`
        );

        particle.style.setProperty(
            "--y",
            `${random(-110, 120)}px`
        );

        sprayArea.appendChild(
            particle
        );

        setTimeout(() => {

            particle.remove();

        }, 1500);

    }

    mainBottle?.animate(
        [
            {
                transform:
                    "translateY(0)"
            },
            {
                transform:
                    "translateY(5px)"
            },
            {
                transform:
                    "translateY(0)"
            }
        ],
        {
            duration: 300
        }
    );

    showToast(
        "Amor no ar ♡"
    );

}


sprayButton?.addEventListener(
    "click",
    sprayPerfume
);


/* =========================================================
   MODAL PRODUTO
========================================================= */

const productModal =
    $("#productModal");


function openModal(modal) {

    if (!modal) return;

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    if (
        !$(".modal.open") &&
        !$("#lightbox")?.classList.contains(
            "open"
        )
    ) {

        body.classList.remove(
            "modal-open"
        );

    }

}


$$(".open-product").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                openModal(
                    productModal
                );

            }
        );

    }
);


$$(".close-product").forEach(
    element => {

        element.addEventListener(
            "click",
            () => {

                closeModal(
                    productModal
                );

            }
        );

    }
);


/* =========================================================
   FAVORITO
========================================================= */

const favoriteButton =
    $("#favoriteButton");

const favoriteModal =
    $("#favoriteModal");


let favorite =
    localStorage.getItem(
        "dreamFavorite"
    ) === "true";


function updateFavorite() {

    [
        favoriteButton,
        favoriteModal
    ].forEach(button => {

        if (!button) return;

        button.textContent =
            favorite
                ? "♥ Favoritado"
                : "♡ Favoritar";

    });

}


function toggleFavorite() {

    favorite = !favorite;

    localStorage.setItem(
        "dreamFavorite",
        favorite
    );

    updateFavorite();

    showToast(
        favorite
            ? "Adicionado aos favoritos ♥"
            : "Removido dos favoritos"
    );

}


favoriteButton?.addEventListener(
    "click",
    toggleFavorite
);

favoriteModal?.addEventListener(
    "click",
    toggleFavorite
);

updateFavorite();


/* =========================================================
   COMPARTILHAR
========================================================= */

async function shareDream() {

    const shareData = {

        title:
            "Dream Amor no Ar",

        text:
            "Dream Amor no Ar • 350 ml",

        url:
            window.location.href

    };


    try {

        if (
            navigator.share
        ) {

            await navigator.share(
                shareData
            );

        } else {

            await navigator.clipboard
                .writeText(
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


$("#shareButton")
    ?.addEventListener(
        "click",
        shareDream
    );

$("#shareModal")
    ?.addEventListener(
        "click",
        shareDream
    );


/* =========================================================
   NOTAS OLFATIVAS
========================================================= */

const noteModal =
    $("#noteModal");

const noteModalIcon =
    $("#noteModalIcon");

const noteModalTitle =
    $("#noteModalTitle");

const noteModalText =
    $("#noteModalText");


const noteData = {

    bergamota: {
        title: "Bergamota",
        icon: "🍊",
        text:
            "Uma nota cítrica luminosa, fresca e elegante."
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
            "Frutada, vibrante e levemente adocicada."
    },

    limao: {
        title: "Limão",
        icon: "🍋",
        text:
            "Acrescenta brilho e frescor à abertura."
    },

    cassis: {
        title: "Cassis",
        icon: "🫐",
        text:
            "Um toque frutado marcante, levemente ácido e sofisticado."
    },

    maca: {
        title: "Maçã",
        icon: "🍎",
        text:
            "Frutada, fresca e delicadamente doce."
    },

    rosa: {
        title: "Rosa",
        icon: "🌹",
        text:
            "Clássica, romântica e elegante."
    },

    tilia: {
        title: "Tília",
        icon: "🌼",
        text:
            "Uma nuance floral delicada, macia e confortável."
    },

    freesia: {
        title: "Frésia",
        icon: "🌸",
        text:
            "Floral leve, transparente e luminoso."
    },

    lotus: {
        title: "Flor de Lótus",
        icon: "🪷",
        text:
            "Uma sensação floral aquática, delicada e serena."
    },

    gardenia: {
        title: "Gardênia",
        icon: "🌼",
        text:
            "Floral branco cremoso e envolvente."
    },

    pessego: {
        title: "Pêssego",
        icon: "🍑",
        text:
            "Frutado macio e suavemente adocicado."
    },

    ambar: {
        title: "Âmbar",
        icon: "✨",
        text:
            "Quente, confortável e envolvente."
    },

    sandalo: {
        title: "Sândalo",
        icon: "🪵",
        text:
            "Amadeirado cremoso que traz profundidade."
    },

    baunilha: {
        title: "Baunilha",
        icon: "🤍",
        text:
            "Doce, cremosa e acolhedora."
    },

    tonka: {
        title: "Tonka",
        icon: "✨",
        text:
            "Um toque quente, adocicado e sofisticado."
    },

    musk: {
        title: "Musk",
        icon: "☁",
        text:
            "Maciez e sensação confortável no fundo da fragrância."
    }

};


$$(".note-chip").forEach(
    chip => {

        chip.addEventListener(
            "click",
            () => {

                const key =
                    chip.dataset.note;

                const data =
                    noteData[key];

                if (!data) return;

                noteModalIcon.textContent =
                    data.icon;

                noteModalTitle.textContent =
                    data.title;

                noteModalText.textContent =
                    data.text;

                openModal(
                    noteModal
                );

            }
        );

    }
);


$$(".close-note").forEach(
    element => {

        element.addEventListener(
            "click",
            () => {

                closeModal(
                    noteModal
                );

            }
        );

    }
);


/* =========================================================
   ESC FECHA MODAIS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            $$(".modal.open").forEach(
                modal => {

                    closeModal(modal);

                }
            );

            closeLightbox();

            settingsPanel
                ?.classList
                .remove("open");

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
            "As flores ganham destaque e deixam a fragrância romântica."
    },

    {
        max: 5,
        icon: "♡",
        title:
            "Doçura delicada",
        text:
            "O lado macio e confortável começa a aparecer."
    },

    {
        max: 8,
        icon: "✨",
        title:
            "Fundo envolvente",
        text:
            "Madeiras, âmbar e notas confortáveis permanecem."
    }

];


function updateTimeline() {

    if (!timelineSlider) return;

    const value =
        Number(
            timelineSlider.value
        );

    timelineHour.textContent =
        `${value}h`;

    const stage =
        timelineStages.find(
            item =>
                value <= item.max
        ) ||
        timelineStages[
            timelineStages.length - 1
        ];

    timelineIcon.textContent =
        stage.icon;

    timelineTitle.textContent =
        stage.title;

    timelineText.textContent =
        stage.text;

}


timelineSlider?.addEventListener(
    "input",
    updateTimeline
);

updateTimeline();


/* =========================================================
   METERS
========================================================= */

let metersAnimated = false;


function animateMeters() {

    if (metersAnimated) return;

    const meters =
        $$("[data-meter]");

    if (!meters.length) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const meter =
                                entry.target;

                            meter.style.width =
                                `${meter.dataset.meter}%`;

                            observer.unobserve(
                                meter
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.3
            }
        );

    meters.forEach(
        meter =>
            observer.observe(meter)
    );

    metersAnimated = true;

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


function galleryScrollAmount() {

    const item =
        $(".gallery-item");

    if (!item) {

        return 500;

    }

    return (
        item.getBoundingClientRect()
            .width +
        18
    );

}


galleryNext?.addEventListener(
    "click",
    () => {

        galleryTrack?.scrollBy({

            left:
                galleryScrollAmount(),

            behavior:
                "smooth"

        });

    }
);


galleryPrev?.addEventListener(
    "click",
    () => {

        galleryTrack?.scrollBy({

            left:
                -galleryScrollAmount(),

            behavior:
                "smooth"

        });

    }
);


/* =========================================================
   AUTOPLAY GALERIA
========================================================= */

let galleryAutoTimer = null;


function stopGalleryAutoplay() {

    if (galleryAutoTimer) {

        clearInterval(
            galleryAutoTimer
        );

        galleryAutoTimer = null;

    }

    if (galleryAutoplay) {

        galleryAutoplay.textContent =
            "▶ Autoplay";

    }

}


function startGalleryAutoplay() {

    if (!galleryTrack) return;

    stopGalleryAutoplay();

    galleryAutoTimer =
        setInterval(
            () => {

                const maxScroll =
                    galleryTrack.scrollWidth -
                    galleryTrack.clientWidth;

                if (
                    galleryTrack.scrollLeft >=
                    maxScroll - 20
                ) {

                    galleryTrack.scrollTo({

                        left: 0,
                        behavior: "smooth"

                    });

                } else {

                    galleryTrack.scrollBy({

                        left:
                            galleryScrollAmount(),

                        behavior: "smooth"

                    });

                }

            },
            3500
        );

    if (galleryAutoplay) {

        galleryAutoplay.textContent =
            "■ Parar autoplay";

    }

}


galleryAutoplay?.addEventListener(
    "click",
    () => {

        if (galleryAutoTimer) {

            stopGalleryAutoplay();

            showToast(
                "Autoplay pausado"
            );

        } else {

            startGalleryAutoplay();

            showToast(
                "Autoplay ativado ✦"
            );

        }

    }
);


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
    ) return;

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

    if (!lightbox) return;

    lightbox.classList.remove(
        "open"
    );

    if (
        !$(".modal.open")
    ) {

        body.classList.remove(
            "modal-open"
        );

    }

}


$$(".gallery-item img").forEach(
    image => {

        image.addEventListener(
            "click",
            () => {

                openLightbox(
                    image.src,
                    image.alt
                );

            }
        );

    }
);


lightboxClose?.addEventListener(
    "click",
    closeLightbox
);

lightboxBackdrop?.addEventListener(
    "click",
    closeLightbox
);


/* =========================================================
   MOODS
========================================================= */

const moods = {

    romantico: {
        primary: "#df76a8",
        secondary: "#9562dc",
        message:
            "Mood Romântico ♡"
    },

    sonhador: {
        primary: "#b788e8",
        secondary: "#7ca9dc",
        message:
            "Mood Sonhador ☁"
    },

    noturno: {
        primary: "#6c5ce7",
        secondary: "#352f7c",
        message:
            "Mood Noturno ☾"
    },

    energia: {
        primary: "#ff758c",
        secondary: "#ff9f43",
        message:
            "Mood Energia ✦"
    },

    calmo: {
        primary: "#65c9b5",
        secondary: "#799ed6",
        message:
            "Mood Calmo ☁"
    }

};


$$(".mood-button").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const mood =
                    moods[
                        button.dataset.mood
                    ];

                if (!mood) return;

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

                showToast(
                    mood.message
                );

            }
        );

    }
);


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

const quizStep =
    $("#quizStep");

const quizProgressBar =
    $("#quizProgressBar");

const quizQuestion =
    $("#quizQuestion");

const quizOptions =
    $("#quizOptions");

const quizResultIcon =
    $("#quizResultIcon");

const quizResultTitle =
    $("#quizResultTitle");

const quizResultText =
    $("#quizResultText");


const quizData = [

    {
        question:
            "Qual clima combina mais com você?",

        options: [

            {
                text:
                    "Romântico",
                type:
                    "romantico"
            },

            {
                text:
                    "Sonhador",
                type:
                    "sonhador"
            },

            {
                text:
                    "Intenso",
                type:
                    "intenso"
            },

            {
                text:
                    "Tranquilo",
                type:
                    "calmo"
            }

        ]

    },

    {
        question:
            "Qual momento você prefere?",

        options: [

            {
                text:
                    "Encontro especial",
                type:
                    "romantico"
            },

            {
                text:
                    "Fim de tarde",
                type:
                    "sonhador"
            },

            {
                text:
                    "Noite",
                type:
                    "intenso"
            },

            {
                text:
                    "Manhã tranquila",
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
                    "Paixão",
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
                    "Mistério",
                type:
                    "intenso"
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
            "Escolha um símbolo Dream.",

        options: [

            {
                text:
                    "♡ Coração",
                type:
                    "romantico"
            },

            {
                text:
                    "☁ Nuvem",
                type:
                    "sonhador"
            },

            {
                text:
                    "☾ Lua",
                type:
                    "intenso"
            },

            {
                text:
                    "✿ Flor",
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
            "Você é romântico, delicado e valoriza os pequenos detalhes."
    },

    sonhador: {
        icon: "☁",
        title:
            "Dreamer",
        text:
            "Você tem um lado criativo, leve e vive imaginando novas possibilidades."
    },

    intenso: {
        icon: "☾",
        title:
            "Midnight Dream",
        text:
            "Você gosta de personalidade, mistério e experiências marcantes."
    },

    calmo: {
        icon: "✿",
        title:
            "Soft Dream",
        text:
            "Você prefere equilíbrio, conforto e momentos tranquilos."
    }

};


let quizIndex = 0;

let quizScores = {};


function resetQuizScores() {

    quizScores = {

        romantico: 0,
        sonhador: 0,
        intenso: 0,
        calmo: 0

    };

}


function renderQuizQuestion() {

    const current =
        quizData[quizIndex];

    if (!current) {

        finishQuiz();

        return;

    }


    quizStep.textContent =
        `${quizIndex + 1} / ${quizData.length}`;

    quizProgressBar.style.width =
        `${
            (
                (quizIndex + 1) /
                quizData.length
            ) * 100
        }%`;

    quizQuestion.textContent =
        current.question;

    quizOptions.innerHTML = "";


    current.options.forEach(
        option => {

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

                    quizIndex++;

                    renderQuizQuestion();

                }
            );

            quizOptions.appendChild(
                button
            );

        }
    );

}


function finishQuiz() {

    quizQuestions.hidden = true;

    quizResult.hidden = false;


    const winner =
        Object.entries(
            quizScores
        ).sort(
            (a, b) =>
                b[1] - a[1]
        )[0][0];


    const result =
        quizResults[winner];


    quizResultIcon.textContent =
        result.icon;

    quizResultTitle.textContent =
        result.title;

    quizResultText.textContent =
        result.text;


    localStorage.setItem(
        "dreamQuizResult",
        winner
    );


    showToast(
        `Seu perfil: ${result.title} ♡`
    );

}


function beginQuiz() {

    quizIndex = 0;

    resetQuizScores();

    quizStart.hidden = true;
    quizResult.hidden = true;
    quizQuestions.hidden = false;

    renderQuizQuestion();

}


startQuiz?.addEventListener(
    "click",
    beginQuiz
);

restartQuiz?.addEventListener(
    "click",
    beginQuiz
);


/* =========================================================
   CONFIGURAÇÕES
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
   CONVERSÃO DE HEX PARA RGB
========================================================= */

function hexToRgb(hex) {

    let clean =
        hex.replace("#", "");

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

    const number =
        parseInt(clean, 16);

    return {

        r:
            (number >> 16) & 255,

        g:
            (number >> 8) & 255,

        b:
            number & 255

    };

}


/* =========================================================
   ALTERAR CORES
========================================================= */

function setColors(
    primary,
    secondary,
    save = true
) {

    const root =
        document.documentElement;

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


    const themeMeta =
        $(
            'meta[name="theme-color"]'
        );

    themeMeta?.setAttribute(
        "content",
        primary
    );


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


/* =========================================================
   PALETAS
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


$$(".palette").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const palette =
                    palettes[
                        button.dataset.palette
                    ];

                if (!palette) return;


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


                setColors(
                    palette[0],
                    palette[1]
                );


                localStorage.setItem(
                    "dreamPalette",
                    button.dataset.palette
                );


                showToast(
                    `Paleta ${button.textContent.trim()} aplicada`
                );

            }
        );

    }
);


/* =========================================================
   CORES MANUAIS
========================================================= */

$("#primaryColor")
    ?.addEventListener(
        "input",
        event => {

            const secondary =
                getComputedStyle(
                    document.documentElement
                )
                .getPropertyValue(
                    "--secondary"
                )
                .trim();

            setColors(
                event.target.value,
                secondary
            );

            clearPaletteActive();

        }
    );


$("#secondaryColor")
    ?.addEventListener(
        "input",
        event => {

            const primary =
                getComputedStyle(
                    document.documentElement
                )
                .getPropertyValue(
                    "--primary"
                )
                .trim();

            setColors(
                primary,
                event.target.value
            );

            clearPaletteActive();

        }
    );


function clearPaletteActive() {

    $$(".palette").forEach(
        item => {

            item.classList.remove(
                "active"
            );

        }
    );

    localStorage.removeItem(
        "dreamPalette"
    );

}


/* =========================================================
   DARK MODE
========================================================= */

const darkToggle =
    $("#darkToggle");


function setDarkMode(
    enabled,
    save = true
) {

    body.classList.toggle(
        "dark",
        enabled
    );

    if (darkToggle) {

        darkToggle.checked =
            enabled;

    }

    if (themeButton) {

        themeButton.textContent =
            enabled
                ? "☀"
                : "☾";

    }

    if (save) {

        localStorage.setItem(
            "dreamDark",
            enabled
        );

    }

}


darkToggle?.addEventListener(
    "change",
    event => {

        setDarkMode(
            event.target.checked
        );

    }
);


themeButton?.addEventListener(
    "click",
    () => {

        setDarkMode(
            !body.classList.contains(
                "dark"
            )
        );

    }
);


/* =========================================================
   PARTÍCULAS ON/OFF
========================================================= */

const particlesToggle =
    $("#particlesToggle");


particlesToggle?.addEventListener(
    "change",
    event => {

        body.classList.toggle(
            "no-particles",
            !event.target.checked
        );

        localStorage.setItem(
            "dreamParticles",
            event.target.checked
        );

    }
);


/* =========================================================
   ANIMAÇÕES ON/OFF
========================================================= */

const animationsToggle =
    $("#animationsToggle");


animationsToggle?.addEventListener(
    "change",
    event => {

        body.classList.toggle(
            "no-animations",
            !event.target.checked
        );

        localStorage.setItem(
            "dreamAnimations",
            event.target.checked
        );

    }
);


/* =========================================================
   GLASS ON/OFF
========================================================= */

const glassToggle =
    $("#glassToggle");


glassToggle?.addEventListener(
    "change",
    event => {

        body.classList.toggle(
            "no-glass",
            !event.target.checked
        );

        localStorage.setItem(
            "dreamGlass",
            event.target.checked
        );

    }
);


/* =========================================================
   CURSOR GLOW ON/OFF
========================================================= */

const cursorToggle =
    $("#cursorToggle");


cursorToggle?.addEventListener(
    "change",
    event => {

        body.classList.toggle(
            "no-cursor",
            !event.target.checked
        );

        localStorage.setItem(
            "dreamCursor",
            event.target.checked
        );

    }
);


/* =========================================================
   TAMANHO DO TEXTO
========================================================= */

$$("[data-font-size]").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const size =
                    button.dataset.fontSize;

                setFontSize(size);

            }
        );

    }
);


function setFontSize(
    size,
    save = true
) {

    body.classList.remove(
        "font-small",
        "font-normal",
        "font-large"
    );

    body.classList.add(
        `font-${size}`
    );


    $$("[data-font-size]")
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.fontSize ===
                    size
                );

            }
        );


    if (save) {

        localStorage.setItem(
            "dreamFontSize",
            size
        );

    }

}


/* =========================================================
   FUNÇÕES EXTRAS
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

    setTimeout(() => {

        mainBottle.classList.remove(
            "spinning"
        );

    }, 1100);

}


function heartRain(
    amount = 40
) {

    let container =
        $(".heart-rain-container");

    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.className =
            "heart-rain-container";

        body.appendChild(
            container
        );

    }


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement(
                "span"
            );

        heart.className =
            "heart-rain";

        heart.textContent =
            randomItem(
                [
                    "♡",
                    "♥",
                    "✦",
                    "♡"
                ]
            );

        heart.style.left =
            `${random(0, 100)}vw`;

        heart.style.fontSize =
            `${random(15, 38)}px`;

        heart.style.opacity =
            random(0.3, 0.9);

        heart.style.setProperty(
            "--heart-duration",
            `${random(2.5, 5.5)}s`
        );

        container.appendChild(
            heart
        );

        setTimeout(() => {

            heart.remove();

        }, 6000);

    }

}


function randomizeColors() {

    const hue =
        Math.floor(
            random(0, 360)
        );

    const hue2 =
        (
            hue +
            Math.floor(
                random(35, 120)
            )
        ) % 360;


    const primary =
        hslToHex(
            hue,
            65,
            65
        );

    const secondary =
        hslToHex(
            hue2,
            60,
            58
        );


    setColors(
        primary,
        secondary
    );


    const colorOne =
        $("#randomColorOne");

    const colorTwo =
        $("#randomColorTwo");


    if (colorOne) {

        colorOne.style.background =
            primary;

    }

    if (colorTwo) {

        colorTwo.style.background =
            secondary;

    }


    showToast(
        "Nova combinação criada ✦"
    );

}


function hslToHex(
    h,
    s,
    l
) {

    s /= 100;
    l /= 100;

    const c =
        (1 - Math.abs(
            2 * l - 1
        )) * s;

    const x =
        c *
        (
            1 -
            Math.abs(
                (
                    h / 60
                ) % 2 -
                1
            )
        );

    const m =
        l - c / 2;


    let r = 0;
    let g = 0;
    let b = 0;


    if (h < 60) {

        r = c;
        g = x;

    } else if (h < 120) {

        r = x;
        g = c;

    } else if (h < 180) {

        g = c;
        b = x;

    } else if (h < 240) {

        g = x;
        b = c;

    } else if (h < 300) {

        r = x;
        b = c;

    } else {

        r = c;
        b = x;

    }


    const convert =
        value =>
            Math.round(
                (
                    value + m
                ) * 255
            )
            .toString(16)
            .padStart(2, "0");


    return (
        "#" +
        convert(r) +
        convert(g) +
        convert(b)
    );

}


/* =========================================================
   GRADIENTE ANIMADO
========================================================= */

function toggleAnimatedGradient() {

    body.classList.toggle(
        "animated-gradient"
    );

    const enabled =
        body.classList.contains(
            "animated-gradient"
        );

    localStorage.setItem(
        "dreamAnimatedGradient",
        enabled
    );

    showToast(
        enabled
            ? "Gradiente animado ativado ✦"
            : "Gradiente animado desativado"
    );

}


/* =========================================================
   MODO FOCO
========================================================= */

function toggleFocusMode() {

    body.classList.toggle(
        "focus-mode"
    );

    const enabled =
        body.classList.contains(
            "focus-mode"
        );

    showToast(
        enabled
            ? "Modo foco ativado"
            : "Modo foco desativado"
    );

}


/* =========================================================
   MODO FOTO
========================================================= */

function togglePhotoMode() {

    body.classList.toggle(
        "photo-mode"
    );


    let exitButton =
        $("#exitPhotoMode");


    if (
        body.classList.contains(
            "photo-mode"
        )
    ) {

        if (!exitButton) {

            exitButton =
                document.createElement(
                    "button"
                );

            exitButton.id =
                "exitPhotoMode";

            exitButton.className =
                "exit-special-mode";

            exitButton.textContent =
                "Sair do modo foto";

            exitButton.addEventListener(
                "click",
                togglePhotoMode
            );

            body.appendChild(
                exitButton
            );

        }

    } else {

        exitButton?.remove();

    }

}


/* =========================================================
   TELA CHEIA
========================================================= */

async function toggleFullscreen() {

    try {

        if (
            !document.fullscreenElement
        ) {

            await document.documentElement
                .requestFullscreen();

            showToast(
                "Tela cheia ativada"
            );

        } else {

            await document
                .exitFullscreen();

        }

    } catch (error) {

        showToast(
            "Tela cheia não disponível"
        );

    }

}


/* =========================================================
   COPIAR NOME
========================================================= */

async function copyProductName() {

    const text =
        "Dream Amor no Ar • 350 ml";

    try {

        await navigator.clipboard
            .writeText(text);

        showToast(
            "Nome do produto copiado ♡"
        );

    } catch {

        showToast(
            text
        );

    }

}


/* =========================================================
   FRASES DREAM
========================================================= */

const dreamQuotes = [

    "O amor mora nos pequenos detalhes.",

    "Alguns momentos ficam no ar.",

    "Sonhar também é uma forma de sentir.",

    "Um toque de amor transforma o instante.",

    "Dream: leve como um sonho.",

    "Onde existe carinho, existe memória.",

    "Deixe o amor no ar.",

    "Há momentos que merecem virar lembrança."

];


function randomDreamQuote() {

    const quote =
        randomItem(
            dreamQuotes
        );

    showToast(quote);

}


/* =========================================================
   ESTATÍSTICAS
========================================================= */

const sessionStart =
    Date.now();

let interactions =
    Number(
        sessionStorage.getItem(
            "dreamInteractions"
        )
    ) || 0;


document.addEventListener(
    "click",
    event => {

        if (
            event.target.closest(
                "button, a, .note-chip, .gallery-item"
            )
        ) {

            interactions++;

            sessionStorage.setItem(
                "dreamInteractions",
                interactions
            );

            updateSessionStats();

        }

    }
);


function updateSessionStats() {

    const timeElement =
        $("#sessionTime");

    const interactionsElement =
        $("#sessionInteractions");

    const scrollElement =
        $("#sessionScroll");


    if (timeElement) {

        const seconds =
            Math.floor(
                (
                    Date.now() -
                    sessionStart
                ) / 1000
            );

        const minutes =
            Math.floor(
                seconds / 60
            );

        const remaining =
            seconds % 60;

        timeElement.textContent =
            `${minutes}:${String(
                remaining
            ).padStart(2, "0")}`;

    }


    if (interactionsElement) {

        interactionsElement.textContent =
            interactions;

    }


    if (scrollElement) {

        const max =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        const percentage =
            max > 0
                ? Math.round(
                    (
                        window.scrollY /
                        max
                    ) * 100
                )
                : 0;

        scrollElement.textContent =
            `${clamp(
                percentage,
                0,
                100
            )}%`;

    }

}


setInterval(
    updateSessionStats,
    1000
);


/* =========================================================
   SLIDESHOW CAMPANHA
========================================================= */

const campaign =
    $("#campanha");

const campaignImage =
    $(".campaign-image");


const campaignImages = [

    "./img/DREAM.png",

    "./img/DREAM (2).png",

    "./img/DREAM AMOR NO AR.png"

];


let campaignIndex = 0;

let campaignTimer = null;


function setupCampaignSlideshow() {

    if (
        !campaign ||
        !campaignImage
    ) return;


    let indicator =
        $(".campaign-slideshow-indicator");


    if (!indicator) {

        indicator =
            document.createElement(
                "div"
            );

        indicator.className =
            "campaign-slideshow-indicator";

        campaignImages.forEach(
            (_, index) => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.setAttribute(
                    "aria-label",
                    `Imagem ${index + 1}`
                );

                button.addEventListener(
                    "click",
                    () => {

                        showCampaignImage(
                            index
                        );

                        restartCampaignTimer();

                    }
                );

                indicator.appendChild(
                    button
                );

            }
        );

        campaign.appendChild(
            indicator
        );

    }


    updateCampaignDots();

    restartCampaignTimer();

}


function showCampaignImage(index) {

    if (!campaignImage) return;

    campaignIndex =
        (
            index +
            campaignImages.length
        ) %
        campaignImages.length;


    campaignImage.classList.add(
        "fade"
    );


    setTimeout(() => {

        campaignImage.src =
            campaignImages[
                campaignIndex
            ];

        campaignImage.classList.remove(
            "fade"
        );

        updateCampaignDots();

    }, 250);

}


function updateCampaignDots() {

    $$(".campaign-slideshow-indicator button")
        .forEach(
            (button, index) => {

                button.classList.toggle(
                    "active",
                    index ===
                    campaignIndex
                );

            }
        );

}


function restartCampaignTimer() {

    clearInterval(
        campaignTimer
    );

    campaignTimer =
        setInterval(
            () => {

                showCampaignImage(
                    campaignIndex + 1
                );

            },
            5000
        );

}


setupCampaignSlideshow();


/* =========================================================
   CONTROLES DINÂMICOS
========================================================= */

function createExtraControls() {

    if (!settingsPanel) return;


    const resetButton =
        $("#resetSettings");

    if (!resetButton) return;


    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "settings-group";

    wrapper.innerHTML = `

        <span class="settings-title">
            Dream Effects
        </span>

        <div class="settings-button-grid">

            <button
                class="settings-action"
                id="spinBottleSetting"
                type="button"
            >
                <span>↻</span>
                <strong>Girar frasco</strong>
            </button>

            <button
                class="settings-action"
                id="heartRainSetting"
                type="button"
            >
                <span>♡</span>
                <strong>Chuva de amor</strong>
            </button>

            <button
                class="settings-action"
                id="randomColorSetting"
                type="button"
            >
                <span>✦</span>
                <strong>Cores aleatórias</strong>
            </button>

            <button
                class="settings-action"
                id="gradientSetting"
                type="button"
            >
                <span>◒</span>
                <strong>Gradiente</strong>
            </button>

            <button
                class="settings-action"
                id="focusSetting"
                type="button"
            >
                <span>◎</span>
                <strong>Modo foco</strong>
            </button>

            <button
                class="settings-action"
                id="photoSetting"
                type="button"
            >
                <span>◉</span>
                <strong>Modo foto</strong>
            </button>

            <button
                class="settings-action"
                id="fullscreenSetting"
                type="button"
            >
                <span>⛶</span>
                <strong>Tela cheia</strong>
            </button>

            <button
                class="settings-action"
                id="quoteSetting"
                type="button"
            >
                <span>❝</span>
                <strong>Frase Dream</strong>
            </button>

            <button
                class="settings-action"
                id="copyNameSetting"
                type="button"
            >
                <span>▣</span>
                <strong>Copiar nome</strong>
            </button>

            <button
                class="settings-action"
                id="spraySetting"
                type="button"
            >
                <span>✧</span>
                <strong>Borrifar</strong>
            </button>

        </div>

    `;


    resetButton.before(
        wrapper
    );


    $("#spinBottleSetting")
        ?.addEventListener(
            "click",
            spinBottle
        );


    $("#heartRainSetting")
        ?.addEventListener(
            "click",
            () => {

                heartRain(55);

                showToast(
                    "Chuva de amor ♡"
                );

            }
        );


    $("#randomColorSetting")
        ?.addEventListener(
            "click",
            randomizeColors
        );


    $("#gradientSetting")
        ?.addEventListener(
            "click",
            toggleAnimatedGradient
        );


    $("#focusSetting")
        ?.addEventListener(
            "click",
            toggleFocusMode
        );


    $("#photoSetting")
        ?.addEventListener(
            "click",
            togglePhotoMode
        );


    $("#fullscreenSetting")
        ?.addEventListener(
            "click",
            toggleFullscreen
        );


    $("#quoteSetting")
        ?.addEventListener(
            "click",
            randomDreamQuote
        );


    $("#copyNameSetting")
        ?.addEventListener(
            "click",
            copyProductName
        );


    $("#spraySetting")
        ?.addEventListener(
            "click",
            sprayPerfume
        );

}


createExtraControls();


/* =========================================================
   CONTROLE DO FRASCO
========================================================= */

function createBottleControls() {

    if (!settingsPanel) return;


    const resetButton =
        $("#resetSettings");

    if (!resetButton) return;


    const group =
        document.createElement(
            "div"
        );

    group.className =
        "settings-group";

    group.innerHTML = `

        <span class="settings-title">
            Frasco
        </span>

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
                id="bottleScale"
                type="range"
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
                id="bottleBrightness"
                type="range"
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
                id="bottleRotation"
                type="range"
                min="-25"
                max="25"
                value="0"
            >

        </div>

    `;


    resetButton.before(
        group
    );


    $("#bottleScale")
        ?.addEventListener(
            "input",
            event => {

                const value =
                    Number(
                        event.target.value
                    );

                document.documentElement
                    .style
                    .setProperty(
                        "--bottle-scale",
                        value / 100
                    );

                $("#bottleScaleValue")
                    .textContent =
                    `${value}%`;

            }
        );


    $("#bottleBrightness")
        ?.addEventListener(
            "input",
            event => {

                const value =
                    Number(
                        event.target.value
                    );

                document.documentElement
                    .style
                    .setProperty(
                        "--bottle-brightness",
                        value / 100
                    );

                $("#bottleBrightnessValue")
                    .textContent =
                    `${value}%`;

            }
        );


    $("#bottleRotation")
        ?.addEventListener(
            "input",
            event => {

                const value =
                    Number(
                        event.target.value
                    );

                document.documentElement
                    .style
                    .setProperty(
                        "--bottle-rotation",
                        `${value}deg`
                    );

                $("#bottleRotationValue")
                    .textContent =
                    `${value}°`;

            }
        );

}


createBottleControls();


/* =========================================================
   DREAM LAB DINÂMICO
========================================================= */

function createDreamLab() {

    if ($("#dreamLab")) return;


    const quoteStrip =
        $(".quote-strip");

    if (!quoteStrip) return;


    const section =
        document.createElement(
            "section"
        );

    section.id =
        "dreamLab";

    section.className =
        "dream-lab section-track";

    section.dataset.sectionName =
        "Dream Lab";


    section.innerHTML = `

        <div class="section-title reveal">

            <span class="eyebrow">
                DREAM LAB
            </span>

            <h2>
                Brinque com a
                <span>
                    experiência.
                </span>
            </h2>

            <p>
                Explore efeitos especiais
                e personalize o universo Dream.
            </p>

        </div>


        <div class="dream-lab-grid">


            <article class="lab-card lab-card-featured reveal">

                <div class="lab-icon">
                    ♡
                </div>

                <small>
                    DREAM EFFECT
                </small>

                <h3>
                    Chuva de amor
                </h3>

                <p>
                    Espalhe corações pela tela.
                </p>

                <button
                    class="primary-btn"
                    id="labHeartRain"
                    type="button"
                >
                    Ativar efeito
                </button>

            </article>


            <article class="lab-card reveal">

                <div class="lab-icon">
                    ✦
                </div>

                <small>
                    CORES
                </small>

                <h3>
                    Dream Generator
                </h3>

                <p>
                    Gere uma combinação de cores
                    diferente para todo o site.
                </p>

                <div class="random-colors">

                    <i id="randomColorOne"></i>

                    <i id="randomColorTwo"></i>

                </div>

                <button
                    class="outline-btn"
                    id="labRandomColors"
                    type="button"
                >
                    Gerar cores
                </button>

            </article>


            <article class="lab-card reveal">

                <div class="lab-icon">
                    ❝
                </div>

                <small>
                    DREAM MESSAGE
                </small>

                <h3>
                    Frase do momento
                </h3>

                <blockquote id="dreamQuoteText">
                    “Deixe o amor no ar.”
                </blockquote>

                <button
                    class="outline-btn"
                    id="newDreamQuote"
                    type="button"
                >
                    Nova frase
                </button>

            </article>


            <article class="lab-card reveal">

                <div class="lab-icon">
                    ◉
                </div>

                <small>
                    EXPERIÊNCIA
                </small>

                <h3>
                    Modos especiais
                </h3>

                <p>
                    Mude rapidamente a forma
                    de visualizar o projeto.
                </p>

                <div class="lab-actions">

                    <button
                        class="outline-btn"
                        id="labFocusMode"
                        type="button"
                    >
                        ◎ Foco
                    </button>

                    <button
                        class="outline-btn"
                        id="labPhotoMode"
                        type="button"
                    >
                        ◉ Foto
                    </button>

                    <button
                        class="outline-btn"
                        id="labFullscreen"
                        type="button"
                    >
                        ⛶ Tela cheia
                    </button>

                </div>

            </article>


        </div>

    `;


    quoteStrip.before(
        section
    );


    $("#labHeartRain")
        ?.addEventListener(
            "click",
            () => {

                heartRain(70);

                showToast(
                    "O amor está no ar ♡"
                );

            }
        );


    $("#labRandomColors")
        ?.addEventListener(
            "click",
            randomizeColors
        );


    $("#newDreamQuote")
        ?.addEventListener(
            "click",
            () => {

                const quote =
                    randomItem(
                        dreamQuotes
                    );

                $("#dreamQuoteText")
                    .textContent =
                    `“${quote}”`;

            }
        );


    $("#labFocusMode")
        ?.addEventListener(
            "click",
            toggleFocusMode
        );


    $("#labPhotoMode")
        ?.addEventListener(
            "click",
            togglePhotoMode
        );


    $("#labFullscreen")
        ?.addEventListener(
            "click",
            toggleFullscreen
        );


    revealElements();

}


createDreamLab();


/* =========================================================
   ESTATÍSTICAS DINÂMICAS
========================================================= */

function createStats() {

    const grid =
        $(".experience-grid");

    if (!grid) return;

    if (
        $(".experience-stats")
    ) return;


    const card =
        document.createElement(
            "article"
        );

    card.className =
        "experience-card experience-stats reveal";


    card.innerHTML = `

        <small>
            SUA EXPERIÊNCIA
        </small>

        <h3>
            Dream Session
        </h3>


        <div class="session-stats">


            <div class="session-stat">

                <span>
                    ◷
                </span>

                <strong id="sessionTime">
                    0:00
                </strong>

                <small>
                    Tempo no Dream
                </small>

            </div>


            <div class="session-stat">

                <span>
                    ✦
                </span>

                <strong id="sessionInteractions">
                    0
                </strong>

                <small>
                    Interações
                </small>

            </div>


            <div class="session-stat">

                <span>
                    ↓
                </span>

                <strong id="sessionScroll">
                    0%
                </strong>

                <small>
                    Explorado
                </small>

            </div>


        </div>

    `;


    grid.appendChild(
        card
    );


    revealElements();

    updateSessionStats();

}


createStats();


/* =========================================================
   EASTER EGG
   DIGITE: DREAM
========================================================= */

let secretSequence = "";


document.addEventListener(
    "keydown",
    event => {

        if (
            event.target.matches(
                "input, textarea, select"
            )
        ) {

            return;

        }


        secretSequence +=
            event.key
                .toLowerCase();


        secretSequence =
            secretSequence.slice(-5);


        if (
            secretSequence ===
            "dream"
        ) {

            triggerDreamSecret();

            secretSequence = "";

        }

    }
);


function triggerDreamSecret() {

    let secret =
        $(".keyboard-secret");


    if (!secret) {

        secret =
            document.createElement(
                "div"
            );

        secret.className =
            "keyboard-secret";

        secret.textContent =
            "♡";

        body.appendChild(
            secret
        );

    }


    secret.classList.remove(
        "active"
    );

    void secret.offsetWidth;

    secret.classList.add(
        "active"
    );


    heartRain(100);

    spinBottle();

    showToast(
        "Easter Egg Dream desbloqueado ♡"
    );


    setTimeout(() => {

        secret.classList.remove(
            "active"
        );

    }, 1800);

}


/* =========================================================
   EASTER EGG NO LOGO
   5 CLIQUES
========================================================= */

let logoClicks = 0;

let logoTimer;


$$(".logo").forEach(
    logo => {

        logo.addEventListener(
            "click",
            () => {

                logoClicks++;

                clearTimeout(
                    logoTimer
                );

                logoTimer =
                    setTimeout(
                        () => {

                            logoClicks = 0;

                        },
                        1500
                    );


                if (
                    logoClicks >= 5
                ) {

                    logoClicks = 0;

                    heartRain(80);

                    randomizeColors();

                    showToast(
                        "Dream Secret ♡"
                    );

                }

            }
        );

    }
);


/* =========================================================
   CLIQUE DUPLO NO FRASCO
========================================================= */

mainBottle?.addEventListener(
    "dblclick",
    () => {

        spinBottle();

        showToast(
            "Dream Spin ✦"
        );

    }
);


/* =========================================================
   RESET
========================================================= */

const resetSettings =
    $("#resetSettings");


resetSettings?.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "dreamPrimary"
        );

        localStorage.removeItem(
            "dreamSecondary"
        );

        localStorage.removeItem(
            "dreamPalette"
        );

        localStorage.removeItem(
            "dreamDark"
        );

        localStorage.removeItem(
            "dreamParticles"
        );

        localStorage.removeItem(
            "dreamAnimations"
        );

        localStorage.removeItem(
            "dreamGlass"
        );

        localStorage.removeItem(
            "dreamCursor"
        );

        localStorage.removeItem(
            "dreamFontSize"
        );

        localStorage.removeItem(
            "dreamAnimatedGradient"
        );


        setColors(
            "#df76a8",
            "#9562dc",
            false
        );


        setDarkMode(
            false,
            false
        );


        body.classList.remove(
            "no-particles",
            "no-animations",
            "no-glass",
            "no-cursor",
            "animated-gradient",
            "focus-mode",
            "photo-mode"
        );


        if (particlesToggle) {

            particlesToggle.checked =
                true;

        }

        if (animationsToggle) {

            animationsToggle.checked =
                true;

        }

        if (glassToggle) {

            glassToggle.checked =
                true;

        }

        if (cursorToggle) {

            cursorToggle.checked =
                true;

        }


        setFontSize(
            "normal",
            false
        );


        $$(".palette")
            .forEach(
                item => {

                    item.classList.toggle(
                        "active",
                        item.dataset.palette ===
                        "dream"
                    );

                }
            );


        document.documentElement
            .style
            .setProperty(
                "--bottle-scale",
                "1"
            );

        document.documentElement
            .style
            .setProperty(
                "--bottle-brightness",
                "1"
            );

        document.documentElement
            .style
            .setProperty(
                "--bottle-rotation",
                "0deg"
            );


        if ($("#bottleScale")) {

            $("#bottleScale").value =
                100;

            $("#bottleScaleValue")
                .textContent =
                "100%";

        }


        if ($("#bottleBrightness")) {

            $("#bottleBrightness").value =
                100;

            $("#bottleBrightnessValue")
                .textContent =
                "100%";

        }


        if ($("#bottleRotation")) {

            $("#bottleRotation").value =
                0;

            $("#bottleRotationValue")
                .textContent =
                "0°";

        }


        $("#exitPhotoMode")
            ?.remove();


        showToast(
            "Configurações restauradas ♡"
        );

    }
);


/* =========================================================
   CARREGAR CONFIGURAÇÕES SALVAS
========================================================= */

function loadSettings() {

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

        setColors(
            savedPrimary,
            savedSecondary,
            false
        );

    }


    const savedPalette =
        localStorage.getItem(
            "dreamPalette"
        );


    if (savedPalette) {

        $$(".palette")
            .forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.palette ===
                        savedPalette
                    );

                }
            );

    }


    const dark =
        localStorage.getItem(
            "dreamDark"
        ) === "true";


    setDarkMode(
        dark,
        false
    );


    const savedParticles =
        localStorage.getItem(
            "dreamParticles"
        );


    const particlesEnabled =
        savedParticles === null
            ? true
            : savedParticles ===
                "true";


    body.classList.toggle(
        "no-particles",
        !particlesEnabled
    );


    if (particlesToggle) {

        particlesToggle.checked =
            particlesEnabled;

    }


    const savedAnimations =
        localStorage.getItem(
            "dreamAnimations"
        );


    const animationsEnabled =
        savedAnimations === null
            ? true
            : savedAnimations ===
                "true";


    body.classList.toggle(
        "no-animations",
        !animationsEnabled
    );


    if (animationsToggle) {

        animationsToggle.checked =
            animationsEnabled;

    }


    const savedGlass =
        localStorage.getItem(
            "dreamGlass"
        );


    const glassEnabled =
        savedGlass === null
            ? true
            : savedGlass ===
                "true";


    body.classList.toggle(
        "no-glass",
        !glassEnabled
    );


    if (glassToggle) {

        glassToggle.checked =
            glassEnabled;

    }


    const savedCursor =
        localStorage.getItem(
            "dreamCursor"
        );


    const cursorEnabled =
        savedCursor === null
            ? true
            : savedCursor ===
                "true";


    body.classList.toggle(
        "no-cursor",
        !cursorEnabled
    );


    if (cursorToggle) {

        cursorToggle.checked =
            cursorEnabled;

    }


    const savedFont =
        localStorage.getItem(
            "dreamFontSize"
        ) || "normal";


    setFontSize(
        savedFont,
        false
    );


    const animatedGradient =
        localStorage.getItem(
            "dreamAnimatedGradient"
        ) === "true";


    body.classList.toggle(
        "animated-gradient",
        animatedGradient
    );

}


loadSettings();


/* =========================================================
   CLIQUE FORA DO SETTINGS
========================================================= */

document.addEventListener(
    "mousedown",
    event => {

        if (
            !settingsPanel ||
            !settingsButton
        ) return;


        if (
            settingsPanel.classList
                .contains("open") &&
            !settingsPanel.contains(
                event.target
            ) &&
            !settingsButton.contains(
                event.target
            )
        ) {

            settingsPanel.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   ACESSIBILIDADE
========================================================= */

const reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    reduceMotion.matches &&
    localStorage.getItem(
        "dreamAnimations"
    ) === null
) {

    body.classList.add(
        "no-animations"
    );

    if (animationsToggle) {

        animationsToggle.checked =
            false;

    }

}


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            1100
        ) {

            menu?.classList.remove(
                "open"
            );

            if (menuMobile) {

                menuMobile.textContent =
                    "☰";

            }

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO FINAL
========================================================= */

function initDream() {

    revealElements();

    animateMeters();

    updateCurrentSection();

    updateSessionStats();

    console.log(
        "%cDREAM ♡ AMOR NO AR",
        `
        font-size:22px;
        font-weight:bold;
        color:#df76a8;
        `
    );

    console.log(
        "%cDica: digite DREAM 👀",
        `
        font-size:12px;
        color:#9562dc;
        `
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initDream
);