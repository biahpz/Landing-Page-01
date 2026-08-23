"use strict";

/* =========================================================
   DREAM • AMOR NO AR
   SCRIPT.JS FINAL CORRIGIDO
========================================================= */


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
   ELEMENTOS GERAIS
========================================================= */

const loader = $("#loader");
const header = $("#header");
const menu = $("#menu");
const menuMobile = $("#menuMobile");
const scrollProgress = $("#scrollProgress");
const backTop = $("#backTop");
const toast = $("#toast");

let toastTimer;


/* =========================================================
   LOADER
========================================================= */

function hideLoader() {

    if (!loader) return;

    loader.classList.add("hide");

    setTimeout(() => {
        loader.style.display = "none";
    }, 700);

}

window.addEventListener("load", () => {
    setTimeout(hideLoader, 700);
});

setTimeout(hideLoader, 3500);


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);

}


/* =========================================================
   SCROLL
========================================================= */

function updateScroll() {

    const current = window.scrollY;

    const total =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        total > 0
            ? (current / total) * 100
            : 0;

    if (scrollProgress) {
        scrollProgress.style.width =
            `${percentage}%`;
    }

    header?.classList.toggle(
        "scrolled",
        current > 30
    );

    backTop?.classList.toggle(
        "show",
        current > 450
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
            behavior:
                body.classList.contains("no-animations")
                    ? "auto"
                    : "smooth"
        });

    }
);


/* =========================================================
   MENU MOBILE
========================================================= */

menuMobile?.addEventListener(
    "click",
    event => {

        event.stopPropagation();

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

        if (!menu || !menuMobile) return;

        if (
            menu.contains(event.target) ||
            menuMobile.contains(event.target)
        ) {
            return;
        }

        menu.classList.remove("open");

    }
);


/* =========================================================
   REVEAL
========================================================= */

const revealElements =
    $$(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

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
   BARRAS
========================================================= */

function setMeterWidth(element, key) {

    const value =
        Math.max(
            0,
            Math.min(
                100,
                Number(
                    element.dataset[key] || 0
                )
            )
        );

    element.style.width =
        `${value}%`;

}


const animatedMeters = [
    ...$$("[data-meter]"),
    ...$$("[data-feeling]")
];


if ("IntersectionObserver" in window) {

    const meterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element =
                        entry.target;

                    if (element.dataset.meter) {

                        setMeterWidth(
                            element,
                            "meter"
                        );

                    } else if (
                        element.dataset.feeling
                    ) {

                        setMeterWidth(
                            element,
                            "feeling"
                        );

                    }

                    meterObserver.unobserve(
                        element
                    );

                });

            },
            {
                threshold: 0.25
            }
        );

    animatedMeters.forEach(element => {
        meterObserver.observe(element);
    });

}


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    $("#cursorGlow");

let cursorX =
    window.innerWidth / 2;

let cursorY =
    window.innerHeight / 2;

let glowX = cursorX;
let glowY = cursorY;

let cursorGlowIntensity = 1;


document.addEventListener(
    "mousemove",
    event => {

        cursorX = event.clientX;
        cursorY = event.clientY;

    }
);


function animateCursorGlow() {

    if (
        cursorGlow &&
        !body.classList.contains("no-cursor")
    ) {

        glowX +=
            (cursorX - glowX) * 0.12;

        glowY +=
            (cursorY - glowY) * 0.12;

        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;

        cursorGlow.style.opacity =
            String(
                Math.min(
                    0.75,
                    0.42 *
                    cursorGlowIntensity
                )
            );

        cursorGlow.style.transform =
            `translate(-50%, -50%)
             scale(${cursorGlowIntensity})`;

    }

    requestAnimationFrame(
        animateCursorGlow
    );

}

animateCursorGlow();


/* =========================================================
   PARTÍCULAS
========================================================= */

let particleIntensity = 1;


function generateParticles() {

    const container =
        $("#particles");

    if (!container) return;

    container.innerHTML = "";

    if (particleIntensity <= 0) {
        return;
    }

    const symbols = [
        "♡",
        "✦",
        "·",
        "✿"
    ];

    const amount =
        Math.max(
            4,
            Math.round(
                25 *
                particleIntensity
            )
        );

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
            `${8 + Math.random() * 17}px`;

        particle.style.setProperty(
            "--duration",
            `${8 + Math.random() * 12}s`
        );

        particle.style.setProperty(
            "--delay",
            `${-Math.random() * 15}s`
        );

        container.appendChild(
            particle
        );

    }

}

generateParticles();


/* =========================================================
   PRODUTO / SPRAY
========================================================= */

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


let spraying = false;

let sprayIntensity = 1;

let spraySoundEnabled = false;

let motion3dEnabled = true;

let motion3dIntensity = 1;


/* =========================================================
   SOM REAL DO BORRIFADOR
========================================================= */

const sprayAudio = new Audio("./audio/spray.mp3?v=2");

sprayAudio.preload = "auto";
sprayAudio.volume = 0.30;


function playSpraySound() {

    if (!spraySoundEnabled) {
        return;
    }

    try {

        sprayAudio.pause();

        sprayAudio.currentTime = 0;

        const promise =
            sprayAudio.play();

        if (promise) {

            promise.catch(error => {

                console.warn(
                    "Não foi possível tocar o spray:",
                    error
                );

            });

        }

    } catch (error) {

        console.warn(
            "Erro no áudio do spray:",
            error
        );

    }

}


/* =========================================================
   BORRIFAR
========================================================= */

function sprayDream() {

    if (
        spraying ||
        !sprayArea
    ) {
        return;
    }

    spraying = true;

    heroProduct?.classList.add(
        "spraying"
    );

    playSpraySound();

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


    const amount =
        Math.max(
            25,
            Math.round(
                65 *
                sprayIntensity
            )
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
                420 *
                sprayIntensity
            }px`
        );

        mist.style.setProperty(
            "--mist-y",
            `${
                (
                    Math.random() -
                    0.65
                ) *
                350 *
                sprayIntensity
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
            () => mist.remove(),
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
        i < 10;
        i++
    ) {

        const symbol =
            document.createElement(
                "span"
            );

        symbol.className =
            "spray-symbol-particle";

        symbol.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        symbol.style.setProperty(
            "--symbol-x",
            `${
                (
                    Math.random() -
                    0.5
                ) *
                360
            }px`
        );

        symbol.style.setProperty(
            "--symbol-y",
            `${
                -80 -
                Math.random() *
                240
            }px`
        );

        symbol.style.setProperty(
            "--symbol-rotate",
            `${
                (
                    Math.random() -
                    0.5
                ) *
                450
            }deg`
        );

        sprayArea.appendChild(
            symbol
        );

        setTimeout(
            () => symbol.remove(),
            1800
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

            spraying = false;

        },
        1000
    );

}


sprayButton?.addEventListener(
    "click",
    sprayDream
);


/* =========================================================
   3D DO FRASCO
========================================================= */

heroProduct?.addEventListener(
    "mousemove",
    event => {

        if (
            !motion3dEnabled ||
            !mainBottle ||
            spraying
        ) {
            return;
        }

        if (
            window.matchMedia(
                "(pointer: coarse)"
            ).matches
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
            ) /
            rect.width;


        const y =
            (
                event.clientY -
                rect.top
            ) /
            rect.height;


        const rotateY =
            (
                x -
                0.5
            ) *
            16 *
            motion3dIntensity;


        const rotateX =
            (
                0.5 -
                y
            ) *
            12 *
            motion3dIntensity;


        mainBottle.style.transform =
            `
            translate3d(
                ${
                    (
                        x -
                        0.5
                    ) *
                    15 *
                    motion3dIntensity
                }px,
                ${
                    (
                        y -
                        0.5
                    ) *
                    8 *
                    motion3dIntensity
                }px,
                ${
                    30 *
                    motion3dIntensity
                }px
            )
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            `;


        if (productHalo) {

            productHalo.style.transform =
                `
                translate(
                    ${
                        (
                            x -
                            0.5
                        ) *
                        -25
                    }px,
                    ${
                        (
                            y -
                            0.5
                        ) *
                        -20
                    }px
                )
                `;

        }

    }
);


heroProduct?.addEventListener(
    "mouseleave",
    () => {

        if (mainBottle) {
            mainBottle.style.transform = "";
        }

        if (productHalo) {
            productHalo.style.transform = "";
        }

    }
);


/* =========================================================
   CARDS 3D
========================================================= */

$$(".moment-card").forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                !motion3dEnabled ||
                window.matchMedia(
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


            const rx =
                (
                    0.5 -
                    y
                ) *
                7 *
                motion3dIntensity;


            const ry =
                (
                    x -
                    0.5
                ) *
                7 *
                motion3dIntensity;


            card.style.transform =
                `
                perspective(800px)
                translateY(-7px)
                rotateX(${rx}deg)
                rotateY(${ry}deg)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   MODAIS
========================================================= */

const productModal =
    $("#productModal");

const noteModal =
    $("#noteModal");

const lightbox =
    $("#lightbox");


function updateModalBodyState() {

    const opened =
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
        Boolean(opened)
    );

}


/* =========================================================
   MODAL PRODUTO
========================================================= */

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


$$(".open-product").forEach(button => {

    button.addEventListener(
        "click",
        openProduct
    );

});


$$(".close-product").forEach(button => {

    button.addEventListener(
        "click",
        closeProduct
    );

});


/* =========================================================
   FAVORITOS
========================================================= */

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

    favoriteButtons.forEach(button => {

        button.textContent =
            favorite
                ? "♥ Favoritado"
                : "♡ Favoritar";

        button.classList.toggle(
            "active",
            favorite
        );

    });

}


favoriteButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            favorite = !favorite;

            localStorage.setItem(
                "dreamFavorite",
                String(favorite)
            );

            updateFavorite();

            showToast(
                favorite
                    ? "Adicionado aos favoritos ♡"
                    : "Removido dos favoritos"
            );

        }
    );

});

updateFavorite();


/* =========================================================
   COMPARTILHAR
========================================================= */

async function shareDream() {

    try {

        if (navigator.share) {

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


        if (navigator.clipboard) {

            await navigator.clipboard
                .writeText(
                    location.href
                );

            showToast(
                "Link copiado ♡"
            );

            return;
        }


        showToast(
            "Copie o endereço do navegador"
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
/* =========================================================
   NOTAS
========================================================= */

const noteModalIcon =
    $("#noteModalIcon");

const noteModalTitle =
    $("#noteModalTitle");

const noteModalText =
    $("#noteModalText");


const noteData = {

    bergamota: {
        icon: "🍊",
        title: "Bergamota",
        text:
            "Cítrica, fresca e luminosa."
    },

    laranja: {
        icon: "🍊",
        title: "Laranja",
        text:
            "Cítrica, alegre e confortável."
    },

    mandarina: {
        icon: "🍊",
        title: "Mandarina",
        text:
            "Frutada e delicadamente adocicada."
    },

    limao: {
        icon: "🍋",
        title: "Limão",
        text:
            "Traz brilho e frescor à abertura."
    },

    cassis: {
        icon: "🫐",
        title: "Cassis",
        text:
            "Frutado com leve acidez."
    },

    maca: {
        icon: "🍎",
        title: "Maçã",
        text:
            "Fresca, suculenta e suavemente doce."
    },

    rosa: {
        icon: "🌹",
        title: "Rosa",
        text:
            "Floral clássico, elegante e romântico."
    },

    tilia: {
        icon: "🌼",
        title: "Tília",
        text:
            "Floral delicado e confortável."
    },

    freesia: {
        icon: "🌸",
        title: "Frésia",
        text:
            "Floral leve e luminoso."
    },

    lotus: {
        icon: "🪷",
        title: "Flor de Lótus",
        text:
            "Suave, limpa e levemente aquática."
    },

    gardenia: {
        icon: "🌼",
        title: "Gardênia",
        text:
            "Floral cremoso e sofisticado."
    },

    pessego: {
        icon: "🍑",
        title: "Pêssego",
        text:
            "Frutado macio e delicadamente doce."
    },

    ambar: {
        icon: "✨",
        title: "Âmbar",
        text:
            "Quente e envolvente."
    },

    sandalo: {
        icon: "🪵",
        title: "Sândalo",
        text:
            "Madeira cremosa e confortável."
    },

    baunilha: {
        icon: "🤍",
        title: "Baunilha",
        text:
            "Doce, cremosa e aconchegante."
    },

    tonka: {
        icon: "✨",
        title: "Tonka",
        text:
            "Quente e suavemente adocicada."
    },

    musk: {
        icon: "☁",
        title: "Musk",
        text:
            "Macio, confortável e envolvente."
    }

};


function openNoteModal(key) {

    const note =
        noteData[key];

    if (
        !note ||
        !noteModal
    ) {
        return;
    }

    if (noteModalIcon) {
        noteModalIcon.textContent =
            note.icon;
    }

    if (noteModalTitle) {
        noteModalTitle.textContent =
            note.title;
    }

    if (noteModalText) {
        noteModalText.textContent =
            note.text;
    }

    noteModal.classList.add(
        "open"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeNoteModal() {

    noteModal?.classList.remove(
        "open"
    );

    updateModalBodyState();

}


$$(".note-chip").forEach(chip => {

    chip.addEventListener(
        "click",
        () => {

            openNoteModal(
                chip.dataset.note
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


function updateTimeline() {

    if (!timelineSlider) return;

    const hour =
        Number(
            timelineSlider.value
        );

    let stage;

    if (hour <= 1) {

        stage = {
            icon: "🍊",
            title:
                "Abertura fresca",
            text:
                "Cítricos e frutas aparecem primeiro."
        };

    } else if (hour <= 3) {

        stage = {
            icon: "🌸",
            title:
                "Coração floral",
            text:
                "As flores assumem o centro da fragrância."
        };

    } else if (hour <= 5) {

        stage = {
            icon: "♡",
            title:
                "Romântico e confortável",
            text:
                "O floral fica mais macio e envolvente."
        };

    } else {

        stage = {
            icon: "✨",
            title:
                "Fundo aconchegante",
            text:
                "Madeiras e notas doces permanecem."
        };

    }


    if (timelineHour) {
        timelineHour.textContent =
            `${hour}h`;
    }

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
   DREAM SCENE
========================================================= */

const sceneBackground =
    $(".dream-scene-bg");

const sceneResultIcon =
    $("#sceneResultIcon");

const sceneResultMini =
    $("#sceneResultMini");

const sceneResultTitle =
    $("#sceneResultTitle");

const sceneResultText =
    $("#sceneResultText");


const sceneData = {

    romance: {
        icon: "♡",
        mini:
            "ROMANCE DREAM",
        title:
            "Amor está no ar.",
        text:
            "Uma atmosfera delicada, rosa e envolvente.",
        background:
            `
            radial-gradient(
                circle at 20% 50%,
                rgba(255,111,169,.46),
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
        icon: "☾",
        mini:
            "DREAM SKY",
        title:
            "Sonhe mais alto.",
        text:
            "Uma atmosfera noturna e tranquila.",
        background:
            `
            radial-gradient(
                circle at 70% 20%,
                rgba(112,142,255,.38),
                transparent 35%
            ),
            linear-gradient(
                135deg,
                #090c20,
                #1d1d49
            )
            `
    },

    flores: {
        icon: "✿",
        mini:
            "FLOWER DREAM",
        title:
            "Flores no ar.",
        text:
            "Uma atmosfera floral e delicada.",
        background:
            `
            radial-gradient(
                circle at 20% 40%,
                rgba(255,164,198,.42),
                transparent 37%
            ),
            linear-gradient(
                135deg,
                #28121f,
                #5a2941
            )
            `
    },

    energia: {
        icon: "✦",
        mini:
            "ENERGY DREAM",
        title:
            "Brilhe do seu jeito.",
        text:
            "Uma atmosfera intensa e vibrante.",
        background:
            `
            radial-gradient(
                circle at 20% 50%,
                rgba(255,80,158,.45),
                transparent 38%
            ),
            linear-gradient(
                135deg,
                #170b1c,
                #3b164e
            )
            `
    }

};


function setScene(
    sceneName,
    save = true
) {

    const scene =
        sceneData[sceneName];

    if (!scene) return;


    $$(".scene-button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.scene ===
                sceneName
            );

        });


    if (sceneResultIcon) {
        sceneResultIcon.textContent =
            scene.icon;
    }

    if (sceneResultMini) {
        sceneResultMini.textContent =
            scene.mini;
    }

    if (sceneResultTitle) {
        sceneResultTitle.textContent =
            scene.title;
    }

    if (sceneResultText) {
        sceneResultText.textContent =
            scene.text;
    }

    if (sceneBackground) {
        sceneBackground.style.background =
            scene.background;
    }


    if (save) {

        localStorage.setItem(
            "dreamScene",
            sceneName
        );

    }

}


$$(".scene-button").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            setScene(
                button.dataset.scene
            );

        }
    );

});


/* =========================================================
   GALERIA
========================================================= */

const galleryTrack =
    $("#galleryTrack");

const galleryItems =
    $$(".gallery-item");

const galleryPrev =
    $("#galleryPrev");

const galleryNext =
    $("#galleryNext");

const galleryCurrent =
    $("#galleryCurrent");

const galleryTotal =
    $("#galleryTotal");

const galleryDots =
    $("#galleryDots");

const galleryAutoplay =
    $("#galleryAutoplay");

const galleryAutoplayProgress =
    $("#galleryAutoplayProgress");


let galleryIndex = 0;

let galleryPlaying = false;

let galleryTimer = null;

const galleryDelay = 4500;


if (galleryTotal) {

    galleryTotal.textContent =
        String(
            galleryItems.length
        ).padStart(
            2,
            "0"
        );

}


function createGalleryDots() {

    if (!galleryDots) return;

    galleryDots.innerHTML = "";


    galleryItems.forEach(
        (_, index) => {

            const dot =
                document.createElement(
                    "button"
                );

            dot.type = "button";

            dot.className =
                "gallery-dot";

            dot.addEventListener(
                "click",
                () => {

                    goToGallery(index);

                }
            );

            galleryDots.appendChild(dot);

        }
    );

}


createGalleryDots();


function updateGalleryUI() {

    if (!galleryItems.length) return;

    galleryIndex =
        (
            galleryIndex +
            galleryItems.length
        ) %
        galleryItems.length;


    if (galleryCurrent) {

        galleryCurrent.textContent =
            String(
                galleryIndex + 1
            ).padStart(
                2,
                "0"
            );

    }


    $$(".gallery-dot")
        .forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === galleryIndex
                );

            }
        );

}


function goToGallery(index) {

    if (!galleryItems.length) return;

    galleryIndex =
        (
            index +
            galleryItems.length
        ) %
        galleryItems.length;


    const item =
        galleryItems[galleryIndex];


    if (
        galleryTrack &&
        item
    ) {

        const left =
            item.offsetLeft -
            (
                galleryTrack.clientWidth -
                item.clientWidth
            ) /
            2;


        galleryTrack.scrollTo({
            left:
                Math.max(
                    0,
                    left
                ),
            behavior: "smooth"
        });

    }


    updateGalleryUI();

}


galleryPrev?.addEventListener(
    "click",
    () => {

        goToGallery(
            galleryIndex - 1
        );

    }
);


galleryNext?.addEventListener(
    "click",
    () => {

        goToGallery(
            galleryIndex + 1
        );

    }
);


/* =========================================================
   AUTOPLAY GALERIA
========================================================= */

function stopGalleryAutoplay() {

    galleryPlaying = false;

    clearTimeout(galleryTimer);

    if (galleryAutoplayProgress) {
        galleryAutoplayProgress.style.width =
            "0%";
    }

    if (galleryAutoplay) {
        galleryAutoplay.textContent =
            "▶ Autoplay";
    }

}


function scheduleGalleryAutoplay() {

    clearTimeout(galleryTimer);

    if (!galleryPlaying) return;


    if (galleryAutoplayProgress) {

        galleryAutoplayProgress.style.transition =
            "none";

        galleryAutoplayProgress.style.width =
            "0%";

        requestAnimationFrame(() => {

            galleryAutoplayProgress.style.transition =
                `width ${galleryDelay}ms linear`;

            galleryAutoplayProgress.style.width =
                "100%";

        });

    }


    galleryTimer =
        setTimeout(
            () => {

                goToGallery(
                    galleryIndex + 1
                );

                scheduleGalleryAutoplay();

            },
            galleryDelay
        );

}


function startGalleryAutoplay() {

    if (galleryItems.length < 2) {
        return;
    }

    galleryPlaying = true;

    if (galleryAutoplay) {
        galleryAutoplay.textContent =
            "❚❚ Pausar";
    }

    scheduleGalleryAutoplay();

}


galleryAutoplay?.addEventListener(
    "click",
    () => {

        if (galleryPlaying) {

            stopGalleryAutoplay();

        } else {

            startGalleryAutoplay();

        }

    }
);


updateGalleryUI();


/* =========================================================
   LIGHTBOX
========================================================= */

const lightboxImage =
    $("#lightboxImage");

const lightboxTitle =
    $("#lightboxTitle");

const lightboxCounter =
    $("#lightboxCounter");

const lightboxClose =
    $("#lightboxClose");

const lightboxBackdrop =
    $("#lightboxBackdrop");

const lightboxPrev =
    $("#lightboxPrev");

const lightboxNext =
    $("#lightboxNext");


let lightboxIndex = 0;


function updateLightbox() {

    if (!galleryItems.length) return;

    lightboxIndex =
        (
            lightboxIndex +
            galleryItems.length
        ) %
        galleryItems.length;


    const item =
        galleryItems[lightboxIndex];

    const image =
        $("img", item);

    const title =
        $("h3", item);


    if (
        lightboxImage &&
        image
    ) {

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt || "Dream";

    }


    if (lightboxTitle) {

        lightboxTitle.textContent =
            title?.textContent ||
            "Dream";

    }


    if (lightboxCounter) {

        lightboxCounter.textContent =
            `${
                String(
                    lightboxIndex + 1
                ).padStart(2, "0")
            } / ${
                String(
                    galleryItems.length
                ).padStart(2, "0")
            }`;

    }

}


function openLightbox(index) {

    if (!lightbox) return;

    lightboxIndex = index;

    updateLightbox();

    stopGalleryAutoplay();

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


galleryItems.forEach(
    (item, index) => {

        item.addEventListener(
            "click",
            () => {

                openLightbox(index);

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


lightboxPrev?.addEventListener(
    "click",
    () => {

        lightboxIndex--;

        updateLightbox();

    }
);


lightboxNext?.addEventListener(
    "click",
    () => {

        lightboxIndex++;

        updateLightbox();

    }
);


/* =========================================================
   CORES
========================================================= */

function hexToRgb(hex) {

    const clean =
        String(hex)
            .replace("#", "")
            .trim();


    if (clean.length !== 6) {

        return {
            r: 223,
            g: 118,
            b: 168
        };

    }


    const value =
        parseInt(clean, 16);


    return {
        r:
            (value >> 16) & 255,
        g:
            (value >> 8) & 255,
        b:
            value & 255
    };

}


function setThemeColors(
    primary,
    secondary,
    save = true
) {

    const p =
        hexToRgb(primary);

    const s =
        hexToRgb(secondary);


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
   MOODS
========================================================= */

const moodData = {

    romantico: {
        primary: "#df76a8",
        secondary: "#9562dc"
    },

    sonhador: {
        primary: "#b678d6",
        secondary: "#7588e8"
    },

    noturno: {
        primary: "#7259c7",
        secondary: "#354a8d"
    },

    energia: {
        primary: "#ee6494",
        secondary: "#9853db"
    },

    calmo: {
        primary: "#7bbdb6",
        secondary: "#8798cf"
    }

};


function setMood(mood) {

    const data =
        moodData[mood];

    if (!data) return;


    $$(".mood-button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.mood ===
                mood
            );

        });


    setThemeColors(
        data.primary,
        data.secondary
    );


    localStorage.setItem(
        "dreamMood",
        mood
    );

}


$$(".mood-button").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            setMood(
                button.dataset.mood
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
            "Qual atmosfera combina mais com você?",
        answers: [
            ["♡ Romântica", "lover"],
            ["☾ Sonhadora", "dreamer"],
            ["✦ Marcante", "night"],
            ["☁ Tranquila", "soft"]
        ]
    },

    {
        question:
            "Qual momento você prefere?",
        answers: [
            ["Encontro especial", "lover"],
            ["Fim de tarde", "dreamer"],
            ["Noite inesquecível", "night"],
            ["Momento só meu", "soft"]
        ]
    },

    {
        question:
            "O que uma fragrância deve transmitir?",
        answers: [
            ["Delicadeza", "lover"],
            ["Imaginação", "dreamer"],
            ["Personalidade", "night"],
            ["Conforto", "soft"]
        ]
    },

    {
        question:
            "Escolha um símbolo.",
        answers: [
            ["♡ Coração", "lover"],
            ["☾ Lua", "dreamer"],
            ["✦ Estrela", "night"],
            ["☁ Nuvem", "soft"]
        ]
    }

];


const quizResults = {

    lover: [
        "♡",
        "Dream Lover",
        "Seu Dream é romântico, delicado e envolvente."
    ],

    dreamer: [
        "☾",
        "Dreamer",
        "Seu Dream é leve, criativo e sonhador."
    ],

    night: [
        "✦",
        "Night Dream",
        "Seu Dream tem presença e personalidade."
    ],

    soft: [
        "☁",
        "Soft Dream",
        "Seu Dream é confortável e tranquilo."
    ]

};


let quizIndex = 0;

let quizScores = {
    lover: 0,
    dreamer: 0,
    night: 0,
    soft: 0
};


function renderQuiz() {

    if (
        quizIndex >=
        quizData.length
    ) {

        finishQuiz();

        return;

    }


    const current =
        quizData[quizIndex];


    if (quizStep) {

        quizStep.textContent =
            `${
                quizIndex + 1
            } / ${
                quizData.length
            }`;

    }


    if (quizProgressBar) {

        quizProgressBar.style.width =
            `${
                (
                    (
                        quizIndex + 1
                    ) /
                    quizData.length
                ) *
                100
            }%`;

    }


    if (quizQuestion) {

        quizQuestion.textContent =
            current.question;

    }


    if (!quizOptions) return;


    quizOptions.innerHTML = "";


    current.answers.forEach(
        ([text, type]) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type = "button";

            button.textContent = text;


            button.addEventListener(
                "click",
                () => {

                    quizScores[type]++;

                    quizIndex++;

                    renderQuiz();

                }
            );


            quizOptions.appendChild(
                button
            );

        }
    );

}


function finishQuiz() {

    const winner =
        Object.entries(
            quizScores
        ).sort(
            (a, b) =>
                b[1] - a[1]
        )[0][0];


    const result =
        quizResults[winner];


    if (quizQuestions) {
        quizQuestions.hidden = true;
    }

    if (quizResult) {
        quizResult.hidden = false;
    }

    if (quizResultIcon) {
        quizResultIcon.textContent =
            result[0];
    }

    if (quizResultTitle) {
        quizResultTitle.textContent =
            result[1];
    }

    if (quizResultText) {
        quizResultText.textContent =
            result[2];
    }

}


function beginQuiz() {

    quizIndex = 0;

    quizScores = {
        lover: 0,
        dreamer: 0,
        night: 0,
        soft: 0
    };


    if (quizStart) {
        quizStart.hidden = true;
    }

    if (quizResult) {
        quizResult.hidden = true;
    }

    if (quizQuestions) {
        quizQuestions.hidden = false;
    }


    renderQuiz();

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
   DREAM STUDIO
========================================================= */

const settingsPanel =
    $("#settingsPanel");

const settingsButton =
    $("#settingsButton");

const closeSettings =
    $("#closeSettings");

const themeButton =
    $("#themeButton");

const darkToggle =
    $("#darkToggle");

const glassToggle =
    $("#glassToggle");

const cleanModeToggle =
    $("#cleanModeToggle");

const particlesToggle =
    $("#particlesToggle");

const animationsToggle =
    $("#animationsToggle");

const cursorToggle =
    $("#cursorToggle");

const motion3dToggle =
    $("#motion3dToggle");

const spraySoundToggle =
    $("#spraySoundToggle");

const primaryColor =
    $("#primaryColor");

const secondaryColor =
    $("#secondaryColor");

const animationSpeed =
    $("#animationSpeed");

const animationSpeedValue =
    $("#animationSpeedValue");

const motion3dRange =
    $("#motion3dRange");

const motion3dValue =
    $("#motion3dValue");

const cursorGlowRange =
    $("#cursorGlowRange");

const cursorGlowValue =
    $("#cursorGlowValue");

const particleIntensityRange =
    $("#particleIntensityRange");

const particleIntensityValue =
    $("#particleIntensityValue");

const sprayIntensityRange =
    $("#sprayIntensityRange");

const sprayIntensityValue =
    $("#sprayIntensityValue");

const contrastControl =
    $("#contrastControl");

const contrastValue =
    $("#contrastValue");

const resetSettings =
    $("#resetSettings");


/* =========================================================
   PAINEL
========================================================= */

settingsButton?.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        settingsPanel?.classList.toggle(
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
   DARK MODE
========================================================= */

function setDarkMode(
    enabled,
    save = true
) {

    body.classList.toggle(
        "dark",
        enabled
    );


    if (darkToggle) {
        darkToggle.checked = enabled;
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
            String(enabled)
        );

    }

}


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


darkToggle?.addEventListener(
    "change",
    () => {

        setDarkMode(
            darkToggle.checked
        );

    }
);


/* =========================================================
   TOGGLES
========================================================= */

glassToggle?.addEventListener(
    "change",
    () => {

        body.classList.toggle(
            "no-glass",
            !glassToggle.checked
        );

        localStorage.setItem(
            "dreamGlass",
            String(
                glassToggle.checked
            )
        );

    }
);


cleanModeToggle?.addEventListener(
    "change",
    () => {

        body.classList.toggle(
            "clean-mode",
            cleanModeToggle.checked
        );

        localStorage.setItem(
            "dreamClean",
            String(
                cleanModeToggle.checked
            )
        );

    }
);


particlesToggle?.addEventListener(
    "change",
    () => {

        body.classList.toggle(
            "no-particles",
            !particlesToggle.checked
        );

        localStorage.setItem(
            "dreamParticles",
            String(
                particlesToggle.checked
            )
        );

    }
);


animationsToggle?.addEventListener(
    "change",
    () => {

        body.classList.toggle(
            "no-animations",
            !animationsToggle.checked
        );

        localStorage.setItem(
            "dreamAnimations",
            String(
                animationsToggle.checked
            )
        );

    }
);


cursorToggle?.addEventListener(
    "change",
    () => {

        body.classList.toggle(
            "no-cursor",
            !cursorToggle.checked
        );

        localStorage.setItem(
            "dreamCursor",
            String(
                cursorToggle.checked
            )
        );

    }
);


motion3dToggle?.addEventListener(
    "change",
    () => {

        motion3dEnabled =
            motion3dToggle.checked;

        localStorage.setItem(
            "dreamMotion3d",
            String(
                motion3dEnabled
            )
        );

    }
);


spraySoundToggle?.addEventListener(
    "change",
    () => {

        spraySoundEnabled =
            spraySoundToggle.checked;

        localStorage.setItem(
            "dreamSpraySound",
            String(
                spraySoundEnabled
            )
        );

        showToast(
            spraySoundEnabled
                ? "Som do spray ativado ✦"
                : "Som do spray desligado"
        );

    }
);


/* =========================================================
   CORES PERSONALIZADAS
========================================================= */

primaryColor?.addEventListener(
    "input",
    () => {

        setThemeColors(
            primaryColor.value,
            secondaryColor?.value ||
            "#9562dc"
        );

    }
);


secondaryColor?.addEventListener(
    "input",
    () => {

        setThemeColors(
            primaryColor?.value ||
            "#df76a8",
            secondaryColor.value
        );

    }
);


/* =========================================================
   PALETAS
========================================================= */

const palettes = {

    dream:
        ["#df76a8", "#9562dc"],

    roxo:
        ["#a855f7", "#6d28d9"],

    azul:
        ["#38bdf8", "#6366f1"],

    cherry:
        ["#fb7185", "#db2777"],

    gold:
        ["#d6a84b", "#9a6b21"],

    menta:
        ["#45c4aa", "#5285c5"]

};


$$(".palette").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const data =
                palettes[
                    button.dataset.palette
                ];

            if (!data) return;


            setThemeColors(
                data[0],
                data[1]
            );


            if (primaryColor) {
                primaryColor.value =
                    data[0];
            }

            if (secondaryColor) {
                secondaryColor.value =
                    data[1];
            }


            $$(".palette").forEach(item => {

                item.classList.toggle(
                    "active",
                    item === button
                );

            });

        }
    );

});


/* =========================================================
   SLIDERS
========================================================= */

animationSpeed?.addEventListener(
    "input",
    () => {

        const value =
            Number(
                animationSpeed.value
            );

        root.style.setProperty(
            "--animation-speed",
            100 / value
        );


        if (animationSpeedValue) {

            animationSpeedValue.textContent =
                `${value}%`;

        }

    }
);


motion3dRange?.addEventListener(
    "input",
    () => {

        const value =
            Number(
                motion3dRange.value
            );

        motion3dIntensity =
            value / 100;


        if (motion3dValue) {

            motion3dValue.textContent =
                `${value}%`;

        }

    }
);


cursorGlowRange?.addEventListener(
    "input",
    () => {

        const value =
            Number(
                cursorGlowRange.value
            );

        cursorGlowIntensity =
            value / 100;


        if (cursorGlowValue) {

            cursorGlowValue.textContent =
                `${value}%`;

        }

    }
);


particleIntensityRange?.addEventListener(
    "input",
    () => {

        const value =
            Number(
                particleIntensityRange.value
            );

        particleIntensity =
            value / 100;

        generateParticles();


        if (particleIntensityValue) {

            particleIntensityValue.textContent =
                `${value}%`;

        }

    }
);


sprayIntensityRange?.addEventListener(
    "input",
    () => {

        const value =
            Number(
                sprayIntensityRange.value
            );

        sprayIntensity =
            value / 100;


        if (sprayIntensityValue) {

            sprayIntensityValue.textContent =
                `${value}%`;

        }

    }
);


contrastControl?.addEventListener(
    "input",
    () => {

        const value =
            Number(
                contrastControl.value
            );

        root.style.filter =
            value === 100
                ? ""
                : `contrast(${value / 100})`;


        if (contrastValue) {

            contrastValue.textContent =
                `${value}%`;

        }

    }
);


/* =========================================================
   TAMANHO TEXTO
========================================================= */

$$("[data-font-size]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

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


                $$("[data-font-size]")
                    .forEach(item => {

                        item.classList.toggle(
                            "active",
                            item === button
                        );

                    });

            }
        );

    });


/* =========================================================
   MOONLIGHT
========================================================= */

const dreamMusic =
    $("#dreamMusic");

const dreamMusicPlayer =
    $("#dreamMusicPlayer");

const dreamMusicButton =
    $("#dreamMusicButton");

const musicToggle =
    $("#musicToggle");

const musicVolumeRange =
    $("#musicVolumeRange");

const musicVolumeValue =
    $("#musicVolumeValue");

let dreamMusicPlaying = false;


function updateMusicUI() {

    dreamMusicPlayer?.classList.toggle(
        "playing",
        dreamMusicPlaying
    );


    if (dreamMusicButton) {

        dreamMusicButton.textContent =
            dreamMusicPlaying
                ? "❚❚"
                : "▶";

    }


    if (musicToggle) {

        musicToggle.checked =
            dreamMusicPlaying;

    }

}


async function playDreamMusic() {

    if (!dreamMusic) return;


    try {

        await dreamMusic.play();

        dreamMusicPlaying = true;

        updateMusicUI();

        localStorage.setItem(
            "dreamMusicEnabled",
            "true"
        );

    } catch (error) {

        console.warn(
            "Moonlight bloqueada:",
            error
        );

    }

}


function pauseDreamMusic() {

    if (!dreamMusic) return;

    dreamMusic.pause();

    dreamMusicPlaying = false;

    updateMusicUI();

    localStorage.setItem(
        "dreamMusicEnabled",
        "false"
    );

}


dreamMusicButton?.addEventListener(
    "click",
    () => {

        if (dreamMusicPlaying) {

            pauseDreamMusic();

        } else {

            playDreamMusic();

        }

    }
);


musicToggle?.addEventListener(
    "change",
    () => {

        if (musicToggle.checked) {

            playDreamMusic();

        } else {

            pauseDreamMusic();

        }

    }
);


musicVolumeRange?.addEventListener(
    "input",
    () => {

        const value =
            Number(
                musicVolumeRange.value
            );


        if (dreamMusic) {

            dreamMusic.volume =
                value / 100;

        }


        if (musicVolumeValue) {

            musicVolumeValue.textContent =
                `${value}%`;

        }


        localStorage.setItem(
            "dreamMusicVolume",
            String(value)
        );

    }
);


/* =========================================================
   CONFIGURAÇÕES SALVAS
========================================================= */

function savedBoolean(
    key,
    fallback
) {

    const value =
        localStorage.getItem(key);

    if (value === null) {
        return fallback;
    }

    return value === "true";

}


function loadSavedSettings() {

    setDarkMode(
        savedBoolean(
            "dreamDark",
            false
        ),
        false
    );


    spraySoundEnabled =
        savedBoolean(
            "dreamSpraySound",
            false
        );


    if (spraySoundToggle) {

        spraySoundToggle.checked =
            spraySoundEnabled;

    }


    const musicVolume =
        Number(
            localStorage.getItem(
                "dreamMusicVolume"
            ) ||
            35
        );


    if (dreamMusic) {

        dreamMusic.volume =
            musicVolume / 100;

    }


    if (musicVolumeRange) {

        musicVolumeRange.value =
            musicVolume;

    }


    if (musicVolumeValue) {

        musicVolumeValue.textContent =
            `${musicVolume}%`;

    }


    const scene =
        localStorage.getItem(
            "dreamScene"
        ) ||
        "romance";


    setScene(
        scene,
        false
    );


    const mood =
        localStorage.getItem(
            "dreamMood"
        );


    if (
        mood &&
        moodData[mood]
    ) {

        $$(".mood-button")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.mood ===
                    mood
                );

            });

    }

}


/* =========================================================
   RESET
========================================================= */

resetSettings?.addEventListener(
    "click",
    () => {

        const keys = [
            "dreamDark",
            "dreamGlass",
            "dreamClean",
            "dreamParticles",
            "dreamAnimations",
            "dreamCursor",
            "dreamMotion3d",
            "dreamSpraySound",
            "dreamPrimary",
            "dreamSecondary",
            "dreamScene",
            "dreamMood",
            "dreamMusicEnabled",
            "dreamMusicVolume"
        ];


        keys.forEach(key => {

            localStorage.removeItem(
                key
            );

        });


        setDarkMode(
            false,
            false
        );


        spraySoundEnabled = false;


        if (spraySoundToggle) {

            spraySoundToggle.checked =
                false;

        }


        setThemeColors(
            "#df76a8",
            "#9562dc",
            false
        );


        pauseDreamMusic();


        if (dreamMusic) {
            dreamMusic.volume = 0.35;
        }


        if (musicVolumeRange) {
            musicVolumeRange.value = 35;
        }


        if (musicVolumeValue) {
            musicVolumeValue.textContent =
                "35%";
        }


        setScene(
            "romance",
            false
        );


        showToast(
            "Dream Studio restaurado ♡"
        );

    }
);


/* =========================================================
   ATALHOS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const target =
            event.target;


        if (
            target instanceof HTMLElement &&
            target.matches(
                "input, textarea, select, [contenteditable='true']"
            )
        ) {
            return;
        }


        if (
            event.key === "Escape"
        ) {

            closeProduct();
            closeNoteModal();
            closeLightbox();

            menu?.classList.remove(
                "open"
            );

            settingsPanel?.classList.remove(
                "open"
            );

            return;
        }


        if (
            event.key.toLowerCase() ===
            "s"
        ) {

            sprayDream();

        }


        if (
            event.key.toLowerCase() ===
            "d"
        ) {

            setDarkMode(
                !body.classList.contains(
                    "dark"
                )
            );

        }


        if (
            event.key.toLowerCase() ===
            "g"
        ) {

            settingsPanel?.classList.toggle(
                "open"
            );

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            if (
                lightbox?.classList.contains(
                    "open"
                )
            ) {

                lightboxIndex--;
                updateLightbox();

            } else {

                goToGallery(
                    galleryIndex - 1
                );

            }

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            if (
                lightbox?.classList.contains(
                    "open"
                )
            ) {

                lightboxIndex++;
                updateLightbox();

            } else {

                goToGallery(
                    galleryIndex + 1
                );

            }

        }

    }
);


/* =========================================================
   INDICADOR DE SEÇÃO
========================================================= */

const sectionIndicator =
    $("#sectionIndicator");

const sections =
    $$(".section-track[id]");


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
        0.4;


    let current =
        sections[0];


    sections.forEach(section => {

        if (
            section.offsetTop <=
            position
        ) {

            current = section;

        }

    });


    const index =
        sections.indexOf(current);


    sectionIndicator.innerHTML =
        `
        <span>
            ${
                String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                )
            }
        </span>
        ${
            current.dataset.sectionName ||
            current.id
        }
        `;

}


window.addEventListener(
    "scroll",
    updateSectionIndicator,
    { passive: true }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

$$('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const href =
                    anchor.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) return;


                event.preventDefault();


                const offset =
                    (
                        header?.offsetHeight ||
                        0
                    ) +
                    12;


                window.scrollTo({
                    top:
                        target.offsetTop -
                        offset,
                    behavior: "smooth"
                });

            }
        );

    });


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

try {

    loadSavedSettings();

    updateTimeline();

    updateGalleryUI();

    updateScroll();

    updateSectionIndicator();

    updateMusicUI();

    console.log(
        "Dream carregado com sucesso ♡"
    );

} catch (error) {

    console.error(
        "Erro ao iniciar Dream:",
        error
    );

} finally {

    setTimeout(
        hideLoader,
        300
    );

}