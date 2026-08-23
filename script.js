"use strict";

/* =========================================================
   DREAM • AMOR NO AR
   SCRIPT.JS FINAL
   MOONLIGHT + SPRAY 1 BORRIFADA
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

let toastTimer;


/* =========================================================
   LOADER
========================================================= */

function hideLoader() {

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
            hideLoader,
            650
        );

    }
);


/* segurança */

setTimeout(
    hideLoader,
    3500
);


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent =
        message;

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


/* =========================================================
   SCROLL
========================================================= */

function updateScroll() {

    const current =
        window.scrollY;

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
    {
        passive: true
    }
);


updateScroll();


/* =========================================================
   VOLTAR AO TOPO
========================================================= */

backTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior:
                body.classList.contains(
                    "no-animations"
                )
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

        menu?.classList.toggle(
            "open"
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
            menu.contains(
                event.target
            ) ||
            menuMobile.contains(
                event.target
            )
        ) {
            return;
        }

        menu.classList.remove(
            "open"
        );

    }
);


/* =========================================================
   REVEAL
========================================================= */

const revealElements =
    $$(".reveal");


if (
    "IntersectionObserver" in
    window
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


/* =========================================================
   BARRAS
========================================================= */

function setMeterWidth(
    element,
    key
) {

    const value =
        Math.max(
            0,
            Math.min(
                100,
                Number(
                    element.dataset[key] ||
                    0
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


if (
    "IntersectionObserver" in
    window
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

                        const element =
                            entry.target;

                        if (
                            element.dataset.meter
                        ) {

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

                    }
                );

            },
            {
                threshold: 0.25
            }
        );


    animatedMeters.forEach(
        element => {

            meterObserver.observe(
                element
            );

        }
    );

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

let glowX =
    cursorX;

let glowY =
    cursorY;

let cursorGlowIntensity =
    1;


document.addEventListener(
    "mousemove",
    event => {

        cursorX =
            event.clientX;

        cursorY =
            event.clientY;

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

        cursorGlow.style.opacity =
            String(
                Math.min(
                    0.75,
                    0.42 *
                    cursorGlowIntensity
                )
            );

        cursorGlow.style.transform =
            `
            translate(-50%, -50%)
            scale(${cursorGlowIntensity})
            `;

    }

    requestAnimationFrame(
        animateCursorGlow
    );

}


animateCursorGlow();


/* =========================================================
   PARTÍCULAS DO SITE
========================================================= */

let particleIntensity =
    1;


function generateParticles() {

    const container =
        $("#particles");

    if (!container) {
        return;
    }

    container.innerHTML =
        "";

    if (
        particleIntensity <=
        0
    ) {
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


/* =========================================================
   PRODUTO
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

const sprayGlow =
    $(".spray-glow");


let spraying =
    false;

let sprayIntensity =
    1;

let spraySoundEnabled =
    false;

let motion3dEnabled =
    true;

let motion3dIntensity =
    1;


/* =========================================================
   ÁUDIO REAL DO SPRAY
   1 ARQUIVO = 1 BORRIFADA
========================================================= */

const sprayAudio =
    new Audio(
        "./audio/spray.mp3?v=2"
    );


sprayAudio.preload =
    "auto";


sprayAudio.volume =
    0.45;


/* =========================================================
   REINICIAR EFEITOS DO SPRAY
========================================================= */

function restartSprayEffects() {

    /*
       BRILHO
    */

    if (sprayGlow) {

        sprayGlow.classList.remove(
            "active"
        );

        void sprayGlow.offsetWidth;

        sprayGlow.classList.add(
            "active"
        );

    }


    /*
       ONDA
    */

    if (sprayWave) {

        sprayWave.classList.remove(
            "active"
        );

        void sprayWave.offsetWidth;

        sprayWave.classList.add(
            "active"
        );

    }

}


/* =========================================================
   TOCAR UMA BORRIFADA
========================================================= */

function playSpraySound() {

    if (
        !spraySoundEnabled
    ) {
        return;
    }


    try {

        /*
           Nunca deixa dois sprays
           tocarem ao mesmo tempo.
        */

        sprayAudio.pause();

        sprayAudio.currentTime =
            0;


        const promise =
            sprayAudio.play();


        if (
            promise &&
            typeof promise.catch ===
            "function"
        ) {

            promise.catch(
                error => {

                    console.warn(
                        "Não foi possível tocar o spray:",
                        error
                    );

                }
            );

        }

    } catch (
        error
    ) {

        console.warn(
            "Erro no áudio do spray:",
            error
        );

    }

}


/* =========================================================
   NÉVOA
========================================================= */

function createSprayMist() {

    if (!sprayArea) {
        return;
    }


    const amount =
        Math.max(
            20,
            Math.round(
                60 *
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
                0.75 +
                Math.random() *
                0.7
            }s`
        );


        sprayArea.appendChild(
            mist
        );


        setTimeout(
            () => {

                mist.remove();

            },
            1700
        );

    }

}


/* =========================================================
   PARTÍCULAS DO SPRAY
========================================================= */

function createSpraySymbols() {

    if (!sprayArea) {
        return;
    }


    const symbols = [

        "♡",
        "✦",
        "✧"

    ];


    const amount =
        Math.max(
            5,
            Math.round(
                10 *
                sprayIntensity
            )
        );


    for (
        let i = 0;
        i < amount;
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
                360 *
                sprayIntensity
            }px`
        );


        symbol.style.setProperty(
            "--symbol-y",
            `${
                (
                    -70 -
                    Math.random() *
                    230
                ) *
                sprayIntensity
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
            () => {

                symbol.remove();

            },
            1600
        );

    }

}


/* =========================================================
   BORRIFADA COMPLETA
========================================================= */

function sprayDream() {

    /*
       Bloqueia spam enquanto
       a borrifada principal acontece.
    */

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


    /*
       TUDO COMEÇA JUNTO:
       áudio + brilho + onda + névoa
    */

    restartSprayEffects();

    playSpraySound();

    createSprayMist();

    createSpraySymbols();


    /*
       FLASH
    */

    const flash =
        document.createElement(
            "span"
        );


    flash.className =
        "spray-flash active";


    sprayArea.appendChild(
        flash
    );


    /*
       CONTADOR
    */

    const sprayCount =
        Number(
            localStorage.getItem(
                "dreamSprayCount"
            ) ||
            0
        ) +
        1;


    localStorage.setItem(
        "dreamSprayCount",
        String(
            sprayCount
        )
    );


    showToast(
        "Dream está no ar ♡"
    );


    /*
       Libera a próxima borrifada
       depois do efeito.
    */

    setTimeout(
        () => {

            flash.remove();

            heroProduct?.classList.remove(
                "spraying"
            );

            spraying =
                false;

        },
        850
    );

}


/* =========================================================
   BOTÃO BORRIFAR
========================================================= */

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


        const translateX =
            (
                x -
                0.5
            ) *
            15 *
            motion3dIntensity;


        const translateY =
            (
                y -
                0.5
            ) *
            8 *
            motion3dIntensity;


        mainBottle.style.transform =
            `
            translate3d(
                ${translateX}px,
                ${translateY}px,
                ${
                    30 *
                    motion3dIntensity
                }px
            )
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            `;


        if (
            productHalo
        ) {

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

        if (
            mainBottle &&
            !spraying
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


/* =========================================================
   CARDS 3D
========================================================= */

$$(".moment-card").forEach(
    card => {

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


                const rotateX =
                    (
                        0.5 -
                        y
                    ) *
                    7 *
                    motion3dIntensity;


                const rotateY =
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
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
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
        Boolean(
            opened
        )
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


/* =========================================================
   FAVORITO
========================================================= */

let favorite =
    localStorage.getItem(
        "dreamFavorite"
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


/* =========================================================
   COMPARTILHAR
========================================================= */

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
            "Copie o link do navegador"
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
        text: "Cítrica, fresca e luminosa."
    },

    laranja: {
        icon: "🍊",
        title: "Laranja",
        text: "Cítrica, alegre e confortável."
    },

    mandarina: {
        icon: "🍊",
        title: "Mandarina",
        text: "Frutada e delicadamente adocicada."
    },

    limao: {
        icon: "🍋",
        title: "Limão",
        text: "Traz brilho e frescor à abertura."
    },

    cassis: {
        icon: "🫐",
        title: "Cassis",
        text: "Frutado com leve acidez."
    },

    maca: {
        icon: "🍎",
        title: "Maçã",
        text: "Fresca, suculenta e suavemente doce."
    },

    rosa: {
        icon: "🌹",
        title: "Rosa",
        text: "Floral clássico, elegante e romântico."
    },

    tilia: {
        icon: "🌼",
        title: "Tília",
        text: "Floral delicado e confortável."
    },

    freesia: {
        icon: "🌸",
        title: "Frésia",
        text: "Floral leve e luminoso."
    },

    lotus: {
        icon: "🪷",
        title: "Flor de Lótus",
        text: "Suave, limpa e levemente aquática."
    },

    gardenia: {
        icon: "🌼",
        title: "Gardênia",
        text: "Floral cremoso e sofisticado."
    },

    pessego: {
        icon: "🍑",
        title: "Pêssego",
        text: "Frutado macio e delicadamente doce."
    },

    ambar: {
        icon: "✨",
        title: "Âmbar",
        text: "Quente e envolvente."
    },

    sandalo: {
        icon: "🪵",
        title: "Sândalo",
        text: "Madeira cremosa e confortável."
    },

    baunilha: {
        icon: "🤍",
        title: "Baunilha",
        text: "Doce, cremosa e aconchegante."
    },

    tonka: {
        icon: "✨",
        title: "Tonka",
        text: "Quente e suavemente adocicada."
    },

    musk: {
        icon: "☁",
        title: "Musk",
        text: "Macio, confortável e envolvente."
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


$$(".note-chip").forEach(
    chip => {

        chip.addEventListener(
            "click",
            () => {

                openNoteModal(
                    chip.dataset.note
                );

            }
        );

    }
);


$$(".close-note").forEach(
    button => {

        button.addEventListener(
            "click",
            closeNoteModal
        );

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


function updateTimeline() {

    if (!timelineSlider) {
        return;
    }


    const hour =
        Number(
            timelineSlider.value
        );


    let stage;


    if (hour <= 1) {

        stage = {
            icon: "🍊",
            title: "Abertura fresca",
            text: "Cítricos e frutas aparecem primeiro."
        };

    } else if (hour <= 3) {

        stage = {
            icon: "🌸",
            title: "Coração floral",
            text: "As flores assumem o centro da fragrância."
        };

    } else if (hour <= 5) {

        stage = {
            icon: "♡",
            title: "Romântico e confortável",
            text: "O floral fica mais macio e envolvente."
        };

    } else {

        stage = {
            icon: "✨",
            title: "Fundo aconchegante",
            text: "Madeiras e notas doces permanecem."
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
        mini: "ROMANCE DREAM",
        title: "Amor está no ar.",
        text: "Uma atmosfera delicada, rosa e envolvente.",
        background: `
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
        mini: "DREAM SKY",
        title: "Sonhe mais alto.",
        text: "Uma atmosfera noturna e tranquila.",
        background: `
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
        mini: "FLOWER DREAM",
        title: "Flores no ar.",
        text: "Uma atmosfera floral e delicada.",
        background: `
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
        mini: "ENERGY DREAM",
        title: "Brilhe do seu jeito.",
        text: "Uma atmosfera intensa e vibrante.",
        background: `
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
        sceneData[
            sceneName
        ];

    if (!scene) {
        return;
    }


    $$(".scene-button").forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.scene ===
                sceneName
            );

        }
    );


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


$$(".scene-button").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                setScene(
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


let galleryIndex =
    0;

let galleryPlaying =
    false;

let galleryTimer =
    null;

const galleryDelay =
    4500;


if (galleryTotal) {

    galleryTotal.textContent =
        String(
            galleryItems.length
        ).padStart(
            2,
            "0"
        );

}


/* =========================================================
   DOTS
========================================================= */

function createGalleryDots() {

    if (!galleryDots) {
        return;
    }


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

                    goToGallery(
                        index
                    );

                    restartGalleryAutoplay();

                }
            );


            galleryDots.appendChild(
                dot
            );

        }
    );

}


createGalleryDots();


/* =========================================================
   ATUALIZAR GALERIA
========================================================= */

function updateGalleryUI() {

    if (
        galleryItems.length ===
        0
    ) {
        return;
    }


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


    $$(".gallery-dot").forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index ===
                galleryIndex
            );

        }
    );

}


/* =========================================================
   IR PARA IMAGEM
========================================================= */

function goToGallery(
    index,
    behavior = "smooth"
) {

    if (
        galleryItems.length ===
        0
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

            behavior

        });

    }


    updateGalleryUI();

}


/* =========================================================
   SETAS GALERIA
========================================================= */

galleryPrev?.addEventListener(
    "click",
    () => {

        goToGallery(
            galleryIndex - 1
        );

        restartGalleryAutoplay();

    }
);


galleryNext?.addEventListener(
    "click",
    () => {

        goToGallery(
            galleryIndex + 1
        );

        restartGalleryAutoplay();

    }
);


/* =========================================================
   AUTOPLAY GALERIA
========================================================= */

function stopGalleryAutoplay() {

    galleryPlaying =
        false;


    clearTimeout(
        galleryTimer
    );


    if (
        galleryAutoplayProgress
    ) {

        galleryAutoplayProgress.style.transition =
            "none";

        galleryAutoplayProgress.style.width =
            "0%";

    }


    if (
        galleryAutoplay
    ) {

        galleryAutoplay.textContent =
            "▶ Autoplay";

    }

}


function scheduleGalleryAutoplay() {

    clearTimeout(
        galleryTimer
    );


    if (
        !galleryPlaying
    ) {
        return;
    }


    if (
        galleryAutoplayProgress
    ) {

        galleryAutoplayProgress.style.transition =
            "none";

        galleryAutoplayProgress.style.width =
            "0%";


        void galleryAutoplayProgress.offsetWidth;


        galleryAutoplayProgress.style.transition =
            `width ${galleryDelay}ms linear`;

        galleryAutoplayProgress.style.width =
            "100%";

    }


    galleryTimer =
        setTimeout(
            () => {

                if (
                    !galleryPlaying
                ) {
                    return;
                }


                goToGallery(
                    galleryIndex + 1
                );


                scheduleGalleryAutoplay();

            },
            galleryDelay
        );

}


function startGalleryAutoplay() {

    if (
        galleryItems.length <
        2
    ) {
        return;
    }


    galleryPlaying =
        true;


    if (
        galleryAutoplay
    ) {

        galleryAutoplay.textContent =
            "❚❚ Pausar";

    }


    scheduleGalleryAutoplay();

}


function restartGalleryAutoplay() {

    if (
        galleryPlaying
    ) {

        scheduleGalleryAutoplay();

    }

}


galleryAutoplay?.addEventListener(
    "click",
    () => {

        if (
            galleryPlaying
        ) {

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


let lightboxIndex =
    0;


function updateLightbox() {

    if (
        galleryItems.length ===
        0
    ) {
        return;
    }


    lightboxIndex =
        (
            lightboxIndex +
            galleryItems.length
        ) %
        galleryItems.length;


    const item =
        galleryItems[
            lightboxIndex
        ];


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
            image.alt ||
            "Dream";

    }


    if (
        lightboxTitle
    ) {

        lightboxTitle.textContent =
            title?.textContent ||
            "Dream";

    }


    if (
        lightboxCounter
    ) {

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


function openLightbox(
    index
) {

    if (
        !lightbox
    ) {
        return;
    }


    lightboxIndex =
        index;


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

                openLightbox(
                    index
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
   SWIPE LIGHTBOX
========================================================= */

let lightboxTouchStartX =
    0;


lightbox?.addEventListener(
    "touchstart",
    event => {

        lightboxTouchStartX =
            event.changedTouches[
                0
            ].screenX;

    },
    {
        passive: true
    }
);


lightbox?.addEventListener(
    "touchend",
    event => {

        const endX =
            event.changedTouches[
                0
            ].screenX;


        const distance =
            endX -
            lightboxTouchStartX;


        if (
            Math.abs(
                distance
            ) <
            50
        ) {
            return;
        }


        if (
            distance <
            0
        ) {

            lightboxIndex++;

        } else {

            lightboxIndex--;

        }


        updateLightbox();

    },
    {
        passive: true
    }
);


/* =========================================================
   CORES
========================================================= */

function hexToRgb(hex) {

    let clean =
        String(hex)
            .replace(
                "#",
                ""
            )
            .trim();


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


    if (
        clean.length !==
        6
    ) {

        return {
            r: 223,
            g: 118,
            b: 168
        };

    }


    const value =
        Number.parseInt(
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
            (
                value >>
                16
            ) &
            255,

        g:
            (
                value >>
                8
            ) &
            255,

        b:
            value &
            255

    };

}


function setThemeColors(
    primary,
    secondary,
    save = true
) {

    const primaryRgb =
        hexToRgb(
            primary
        );


    const secondaryRgb =
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
        `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`
    );


    root.style.setProperty(
        "--secondary-rgb",
        `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`
    );


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


/* =========================================================
   MOODS
========================================================= */

const moodData = {

    romantico: {
        primary:
            "#df76a8",
        secondary:
            "#9562dc"
    },

    sonhador: {
        primary:
            "#b678d6",
        secondary:
            "#7588e8"
    },

    noturno: {
        primary:
            "#7259c7",
        secondary:
            "#354a8d"
    },

    energia: {
        primary:
            "#ee6494",
        secondary:
            "#9853db"
    },

    calmo: {
        primary:
            "#7bbdb6",
        secondary:
            "#8798cf"
    }

};


function setMood(
    mood,
    save = true
) {

    const data =
        moodData[
            mood
        ];


    if (
        !data
    ) {
        return;
    }


    $$(".mood-button").forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.mood ===
                mood
            );

        }
    );


    setThemeColors(
        data.primary,
        data.secondary
    );


    if (
        save
    ) {

        localStorage.setItem(
            "dreamMood",
            mood
        );

    }

}


$$(".mood-button").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                setMood(
                    button.dataset.mood
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


let quizIndex =
    0;


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
        quizData[
            quizIndex
        ];


    if (
        quizStep
    ) {

        quizStep.textContent =
            `${quizIndex + 1} / ${quizData.length}`;

    }


    if (
        quizProgressBar
    ) {

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


    if (
        quizQuestion
    ) {

        quizQuestion.textContent =
            current.question;

    }


    if (
        !quizOptions
    ) {
        return;
    }


    quizOptions.innerHTML =
        "";


    current.answers.forEach(
        ([text, type]) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                text;


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
        )
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )[0][0];


    const result =
        quizResults[
            winner
        ];


    if (
        quizQuestions
    ) {

        quizQuestions.hidden =
            true;

    }


    if (
        quizResult
    ) {

        quizResult.hidden =
            false;

    }


    if (
        quizResultIcon
    ) {

        quizResultIcon.textContent =
            result[0];

    }


    if (
        quizResultTitle
    ) {

        quizResultTitle.textContent =
            result[1];

    }


    if (
        quizResultText
    ) {

        quizResultText.textContent =
            result[2];

    }

}


function beginQuiz() {

    quizIndex =
        0;


    quizScores = {

        lover: 0,
        dreamer: 0,
        night: 0,
        soft: 0

    };


    if (
        quizStart
    ) {

        quizStart.hidden =
            true;

    }


    if (
        quizResult
    ) {

        quizResult.hidden =
            true;

    }


    if (
        quizQuestions
    ) {

        quizQuestions.hidden =
            false;

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
   ABRIR / FECHAR DREAM STUDIO
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


document.addEventListener(
    "click",
    event => {

        if (
            !settingsPanel ||
            !settingsPanel.classList.contains(
                "open"
            )
        ) {
            return;
        }


        if (
            settingsPanel.contains(
                event.target
            ) ||
            settingsButton?.contains(
                event.target
            )
        ) {
            return;
        }


        settingsPanel.classList.remove(
            "open"
        );

    }
);


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


function setPalette(
    name,
    save = true
) {

    const palette =
        palettes[name];


    if (!palette) {
        return;
    }


    setThemeColors(
        palette.primary,
        palette.secondary,
        save
    );


    if (primaryColor) {
        primaryColor.value =
            palette.primary;
    }


    if (secondaryColor) {
        secondaryColor.value =
            palette.secondary;
    }


    $$(".palette").forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.palette ===
                name
            );

        }
    );


    if (save) {

        localStorage.setItem(
            "dreamPalette",
            name
        );

    }

}


$$(".palette").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                setPalette(
                    button.dataset.palette
                );

            }
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


        localStorage.removeItem(
            "dreamPalette"
        );


        $$(".palette").forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
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


        localStorage.removeItem(
            "dreamPalette"
        );


        $$(".palette").forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
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
            String(
                enabled
            )
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
   GLASS
========================================================= */

function setGlass(
    enabled,
    save = true
) {

    body.classList.toggle(
        "no-glass",
        !enabled
    );


    if (glassToggle) {

        glassToggle.checked =
            enabled;

    }


    if (save) {

        localStorage.setItem(
            "dreamGlass",
            String(
                enabled
            )
        );

    }

}


glassToggle?.addEventListener(
    "change",
    () => {

        setGlass(
            glassToggle.checked
        );

    }
);


/* =========================================================
   CLEAN MODE
========================================================= */

function setCleanMode(
    enabled,
    save = true
) {

    body.classList.toggle(
        "clean-mode",
        enabled
    );


    if (cleanModeToggle) {

        cleanModeToggle.checked =
            enabled;

    }


    if (save) {

        localStorage.setItem(
            "dreamClean",
            String(
                enabled
            )
        );

    }

}


cleanModeToggle?.addEventListener(
    "change",
    () => {

        setCleanMode(
            cleanModeToggle.checked
        );

    }
);


/* =========================================================
   PARTÍCULAS
========================================================= */

function setParticles(
    enabled,
    save = true
) {

    body.classList.toggle(
        "no-particles",
        !enabled
    );


    if (particlesToggle) {

        particlesToggle.checked =
            enabled;

    }


    if (save) {

        localStorage.setItem(
            "dreamParticles",
            String(
                enabled
            )
        );

    }

}


particlesToggle?.addEventListener(
    "change",
    () => {

        setParticles(
            particlesToggle.checked
        );

    }
);


/* =========================================================
   ANIMAÇÕES
========================================================= */

function setAnimations(
    enabled,
    save = true
) {

    body.classList.toggle(
        "no-animations",
        !enabled
    );


    if (animationsToggle) {

        animationsToggle.checked =
            enabled;

    }


    if (save) {

        localStorage.setItem(
            "dreamAnimations",
            String(
                enabled
            )
        );

    }

}


animationsToggle?.addEventListener(
    "change",
    () => {

        setAnimations(
            animationsToggle.checked
        );

    }
);


/* =========================================================
   CURSOR GLOW
========================================================= */

function setCursorGlow(
    enabled,
    save = true
) {

    body.classList.toggle(
        "no-cursor",
        !enabled
    );


    if (cursorToggle) {

        cursorToggle.checked =
            enabled;

    }


    if (save) {

        localStorage.setItem(
            "dreamCursor",
            String(
                enabled
            )
        );

    }

}


cursorToggle?.addEventListener(
    "change",
    () => {

        setCursorGlow(
            cursorToggle.checked
        );

    }
);


/* =========================================================
   MOVIMENTO 3D
========================================================= */

function setMotion3d(
    enabled,
    save = true
) {

    motion3dEnabled =
        Boolean(
            enabled
        );


    if (motion3dToggle) {

        motion3dToggle.checked =
            motion3dEnabled;

    }


    if (
        !motion3dEnabled
    ) {

        if (mainBottle) {

            mainBottle.style.transform =
                "";

        }


        if (productHalo) {

            productHalo.style.transform =
                "";

        }


        $$(".moment-card").forEach(
            card => {

                card.style.transform =
                    "";

            }
        );

    }


    if (save) {

        localStorage.setItem(
            "dreamMotion3d",
            String(
                motion3dEnabled
            )
        );

    }

}


motion3dToggle?.addEventListener(
    "change",
    () => {

        setMotion3d(
            motion3dToggle.checked
        );

    }
);


/* =========================================================
   SOM DO BORRIFADOR
========================================================= */

function setSpraySound(
    enabled,
    save = true
) {

    spraySoundEnabled =
        Boolean(
            enabled
        );


    if (spraySoundToggle) {

        spraySoundToggle.checked =
            spraySoundEnabled;

    }


    if (save) {

        localStorage.setItem(
            "dreamSpraySound",
            String(
                spraySoundEnabled
            )
        );

    }

}


spraySoundToggle?.addEventListener(
    "change",
    () => {

        setSpraySound(
            spraySoundToggle.checked
        );


        showToast(
            spraySoundEnabled
                ? "Som do borrifador ativado ✦"
                : "Som do borrifador desligado"
        );

    }
);


/* =========================================================
   VELOCIDADE DAS ANIMAÇÕES
========================================================= */

function setAnimationSpeed(
    value,
    save = true
) {

    const safe =
        Math.max(
            40,
            Math.min(
                160,
                Number(
                    value
                ) ||
                100
            )
        );


    root.style.setProperty(
        "--animation-speed",
        100 / safe
    );


    if (animationSpeed) {

        animationSpeed.value =
            safe;

    }


    if (animationSpeedValue) {

        animationSpeedValue.textContent =
            `${safe}%`;

    }


    if (save) {

        localStorage.setItem(
            "dreamAnimationSpeed",
            String(
                safe
            )
        );

    }

}


animationSpeed?.addEventListener(
    "input",
    () => {

        setAnimationSpeed(
            animationSpeed.value
        );

    }
);


/* =========================================================
   INTENSIDADE 3D
========================================================= */

function setMotion3dIntensity(
    value,
    save = true
) {

    const safe =
        Math.max(
            0,
            Math.min(
                150,
                Number(
                    value
                ) ||
                0
            )
        );


    motion3dIntensity =
        safe / 100;


    if (motion3dRange) {

        motion3dRange.value =
            safe;

    }


    if (motion3dValue) {

        motion3dValue.textContent =
            `${safe}%`;

    }


    if (save) {

        localStorage.setItem(
            "dreamMotion3dIntensity",
            String(
                safe
            )
        );

    }

}


motion3dRange?.addEventListener(
    "input",
    () => {

        setMotion3dIntensity(
            motion3dRange.value
        );

    }
);


/* =========================================================
   INTENSIDADE CURSOR
========================================================= */

function setCursorGlowIntensity(
    value,
    save = true
) {

    const safe =
        Math.max(
            0,
            Math.min(
                150,
                Number(
                    value
                ) ||
                0
            )
        );


    cursorGlowIntensity =
        safe / 100;


    if (cursorGlowRange) {

        cursorGlowRange.value =
            safe;

    }


    if (cursorGlowValue) {

        cursorGlowValue.textContent =
            `${safe}%`;

    }


    if (save) {

        localStorage.setItem(
            "dreamCursorGlowIntensity",
            String(
                safe
            )
        );

    }

}


cursorGlowRange?.addEventListener(
    "input",
    () => {

        setCursorGlowIntensity(
            cursorGlowRange.value
        );

    }
);


/* =========================================================
   INTENSIDADE PARTÍCULAS
========================================================= */

let particleTimer;


function setParticleIntensity(
    value,
    save = true
) {

    const safe =
        Math.max(
            0,
            Math.min(
                150,
                Number(
                    value
                ) ||
                0
            )
        );


    particleIntensity =
        safe / 100;


    if (particleIntensityRange) {

        particleIntensityRange.value =
            safe;

    }


    if (particleIntensityValue) {

        particleIntensityValue.textContent =
            `${safe}%`;

    }


    clearTimeout(
        particleTimer
    );


    particleTimer =
        setTimeout(
            generateParticles,
            80
        );


    if (save) {

        localStorage.setItem(
            "dreamParticleIntensity",
            String(
                safe
            )
        );

    }

}


particleIntensityRange?.addEventListener(
    "input",
    () => {

        setParticleIntensity(
            particleIntensityRange.value
        );

    }
);


/* =========================================================
   INTENSIDADE DO SPRAY
========================================================= */

function setSprayIntensity(
    value,
    save = true
) {

    const safe =
        Math.max(
            40,
            Math.min(
                160,
                Number(
                    value
                ) ||
                100
            )
        );


    sprayIntensity =
        safe / 100;


    if (sprayIntensityRange) {

        sprayIntensityRange.value =
            safe;

    }


    if (sprayIntensityValue) {

        sprayIntensityValue.textContent =
            `${safe}%`;

    }


    if (save) {

        localStorage.setItem(
            "dreamSprayIntensity",
            String(
                safe
            )
        );

    }

}


sprayIntensityRange?.addEventListener(
    "input",
    () => {

        setSprayIntensity(
            sprayIntensityRange.value
        );

    }
);


/* =========================================================
   CONTRASTE
========================================================= */

function setContrast(
    value,
    save = true
) {

    const safe =
        Math.max(
            80,
            Math.min(
                130,
                Number(
                    value
                ) ||
                100
            )
        );


    root.style.filter =
        safe === 100
            ? ""
            : `contrast(${safe / 100})`;


    if (contrastControl) {

        contrastControl.value =
            safe;

    }


    if (contrastValue) {

        contrastValue.textContent =
            `${safe}%`;

    }


    if (save) {

        localStorage.setItem(
            "dreamContrast",
            String(
                safe
            )
        );

    }

}


contrastControl?.addEventListener(
    "input",
    () => {

        setContrast(
            contrastControl.value
        );

    }
);


/* =========================================================
   TAMANHO DO TEXTO
========================================================= */

function setFontSize(
    size,
    save = true
) {

    const allowed = [

        "small",
        "normal",
        "large"

    ];


    const finalSize =
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
        `font-${finalSize}`
    );


    $$("[data-font-size]").forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.fontSize ===
                finalSize
            );

        }
    );


    if (save) {

        localStorage.setItem(
            "dreamFontSize",
            finalSize
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


let dreamMusicPlaying =
    false;


/* =========================================================
   UI DA MÚSICA
========================================================= */

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


        dreamMusicButton.setAttribute(
            "aria-label",
            dreamMusicPlaying
                ? "Pausar Moonlight"
                : "Tocar Moonlight"
        );

    }


    if (musicToggle) {

        musicToggle.checked =
            dreamMusicPlaying;

    }

}


/* =========================================================
   PLAY
========================================================= */

async function playDreamMusic() {

    if (!dreamMusic) {
        return;
    }


    try {

        await dreamMusic.play();


        dreamMusicPlaying =
            true;


        localStorage.setItem(
            "dreamMusicEnabled",
            "true"
        );


        updateMusicUI();


        showToast(
            "Moonlight tocando ♫"
        );

    } catch (
        error
    ) {

        dreamMusicPlaying =
            false;


        updateMusicUI();


        console.warn(
            "Áudio bloqueado pelo navegador:",
            error
        );

    }

}


/* =========================================================
   PAUSE
========================================================= */

function pauseDreamMusic(
    save = true
) {

    if (!dreamMusic) {
        return;
    }


    dreamMusic.pause();


    dreamMusicPlaying =
        false;


    if (save) {

        localStorage.setItem(
            "dreamMusicEnabled",
            "false"
        );

    }


    updateMusicUI();

}


/* =========================================================
   TOGGLE
========================================================= */

function toggleDreamMusic() {

    if (
        dreamMusicPlaying
    ) {

        pauseDreamMusic();

    } else {

        playDreamMusic();

    }

}


dreamMusicButton?.addEventListener(
    "click",
    toggleDreamMusic
);


musicToggle?.addEventListener(
    "change",
    () => {

        if (
            musicToggle.checked
        ) {

            playDreamMusic();

        } else {

            pauseDreamMusic();

        }

    }
);


/* =========================================================
   VOLUME MOONLIGHT
========================================================= */

function setDreamMusicVolume(
    value,
    save = true
) {

    const safe =
        Math.max(
            0,
            Math.min(
                100,
                Number(
                    value
                ) ||
                0
            )
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
            `${safe}%`;

    }


    if (save) {

        localStorage.setItem(
            "dreamMusicVolume",
            String(
                safe
            )
        );

    }

}


musicVolumeRange?.addEventListener(
    "input",
    () => {

        setDreamMusicVolume(
            musicVolumeRange.value
        );

    }
);


dreamMusic?.addEventListener(
    "play",
    () => {

        dreamMusicPlaying =
            true;

        updateMusicUI();

    }
);


dreamMusic?.addEventListener(
    "pause",
    () => {

        dreamMusicPlaying =
            false;

        updateMusicUI();

    }
);


/* =========================================================
   BOOLEAN SETTINGS
========================================================= */

function readBooleanSetting(
    key,
    defaultValue
) {

    const value =
        localStorage.getItem(
            key
        );


    if (
        value ===
        null
    ) {

        return defaultValue;

    }


    return value ===
        "true";

}


/* =========================================================
   CARREGAR CONFIGURAÇÕES
========================================================= */

function loadSettings() {

    const savedPalette =
        localStorage.getItem(
            "dreamPalette"
        );


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


    if (
        savedPalette &&
        palettes[
            savedPalette
        ]
    ) {

        setPalette(
            savedPalette,
            false
        );

    } else {

        setThemeColors(
            savedPrimary,
            savedSecondary,
            false
        );


        if (primaryColor) {
            primaryColor.value =
                savedPrimary;
        }


        if (secondaryColor) {
            secondaryColor.value =
                savedSecondary;
        }

    }


    setDarkMode(
        readBooleanSetting(
            "dreamDark",
            false
        ),
        false
    );


    setGlass(
        readBooleanSetting(
            "dreamGlass",
            true
        ),
        false
    );


    setCleanMode(
        readBooleanSetting(
            "dreamClean",
            false
        ),
        false
    );


    setParticles(
        readBooleanSetting(
            "dreamParticles",
            true
        ),
        false
    );


    setAnimations(
        readBooleanSetting(
            "dreamAnimations",
            true
        ),
        false
    );


    setCursorGlow(
        readBooleanSetting(
            "dreamCursor",
            true
        ),
        false
    );


    setMotion3d(
        readBooleanSetting(
            "dreamMotion3d",
            true
        ),
        false
    );


    setSpraySound(
        readBooleanSetting(
            "dreamSpraySound",
            false
        ),
        false
    );


    setAnimationSpeed(
        Number(
            localStorage.getItem(
                "dreamAnimationSpeed"
            ) ||
            100
        ),
        false
    );


    setMotion3dIntensity(
        Number(
            localStorage.getItem(
                "dreamMotion3dIntensity"
            ) ||
            100
        ),
        false
    );


    setCursorGlowIntensity(
        Number(
            localStorage.getItem(
                "dreamCursorGlowIntensity"
            ) ||
            100
        ),
        false
    );


    setParticleIntensity(
        Number(
            localStorage.getItem(
                "dreamParticleIntensity"
            ) ||
            100
        ),
        false
    );


    setSprayIntensity(
        Number(
            localStorage.getItem(
                "dreamSprayIntensity"
            ) ||
            100
        ),
        false
    );


    setContrast(
        Number(
            localStorage.getItem(
                "dreamContrast"
            ) ||
            100
        ),
        false
    );


    setFontSize(
        localStorage.getItem(
            "dreamFontSize"
        ) ||
        "normal",
        false
    );


    setDreamMusicVolume(
        Number(
            localStorage.getItem(
                "dreamMusicVolume"
            ) ||
            35
        ),
        false
    );


    const savedScene =
        localStorage.getItem(
            "dreamScene"
        );


    setScene(
        savedScene &&
        sceneData[
            savedScene
        ]
            ? savedScene
            : "romance",
        false
    );


    const savedMood =
        localStorage.getItem(
            "dreamMood"
        );


    if (
        savedMood &&
        moodData[
            savedMood
        ]
    ) {

        $$(".mood-button").forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.mood ===
                    savedMood
                );

            }
        );

    }

}


/* =========================================================
   RESET DREAM STUDIO
========================================================= */

resetSettings?.addEventListener(
    "click",
    () => {

        const keys = [

            "dreamPrimary",
            "dreamSecondary",
            "dreamPalette",

            "dreamDark",
            "dreamGlass",
            "dreamClean",

            "dreamParticles",
            "dreamAnimations",
            "dreamCursor",

            "dreamMotion3d",
            "dreamMotion3dIntensity",

            "dreamSpraySound",
            "dreamSprayIntensity",

            "dreamCursorGlowIntensity",
            "dreamParticleIntensity",

            "dreamAnimationSpeed",
            "dreamContrast",
            "dreamFontSize",

            "dreamScene",
            "dreamMood",

            "dreamMusicVolume",
            "dreamMusicEnabled"

        ];


        keys.forEach(
            key => {

                localStorage.removeItem(
                    key
                );

            }
        );


        setPalette(
            "dream",
            false
        );


        setDarkMode(
            false,
            false
        );


        setGlass(
            true,
            false
        );


        setCleanMode(
            false,
            false
        );


        setParticles(
            true,
            false
        );


        setAnimations(
            true,
            false
        );


        setCursorGlow(
            true,
            false
        );


        setMotion3d(
            true,
            false
        );


        setSpraySound(
            false,
            false
        );


        setAnimationSpeed(
            100,
            false
        );


        setMotion3dIntensity(
            100,
            false
        );


        setCursorGlowIntensity(
            100,
            false
        );


        setParticleIntensity(
            100,
            false
        );


        setSprayIntensity(
            100,
            false
        );


        setContrast(
            100,
            false
        );


        setFontSize(
            "normal",
            false
        );


        setScene(
            "romance",
            false
        );


        setDreamMusicVolume(
            35,
            false
        );


        pauseDreamMusic(
            false
        );


        showToast(
            "Dream Studio restaurado ♡"
        );

    }
);


/* =========================================================
   INDICADOR DE SEÇÃO
========================================================= */

const sectionIndicator =
    $("#sectionIndicator");

const trackedSections =
    $$(".section-track[id]");


function updateSectionIndicator() {

    if (
        !sectionIndicator ||
        trackedSections.length ===
        0
    ) {
        return;
    }


    const position =
        window.scrollY +
        window.innerHeight *
        0.4;


    let current =
        trackedSections[0];


    trackedSections.forEach(
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
        trackedSections.indexOf(
            current
        );


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


/* =========================================================
   SMOOTH SCROLL
========================================================= */

$$('a[href^="#"]').forEach(
    anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const href =
                    anchor.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    href ===
                    "#"
                ) {
                    return;
                }


                let target;


                try {

                    target =
                        document.querySelector(
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


                event.preventDefault();


                const offset =
                    (
                        header?.offsetHeight ||
                        0
                    ) +
                    12;


                const targetTop =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset;


                window.scrollTo({

                    top:
                        targetTop,

                    behavior:
                        body.classList.contains(
                            "no-animations"
                        )
                            ? "auto"
                            : "smooth"

                });

            }
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


        const typing =
            target instanceof
            HTMLElement &&
            target.matches(
                "input, textarea, select, [contenteditable='true']"
            );


        if (
            typing
        ) {
            return;
        }


        /* ESC */

        if (
            event.key ===
            "Escape"
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


        /* S = BORRIFAR */

        if (
            event.key.toLowerCase() ===
            "s"
        ) {

            sprayDream();

            return;

        }


        /* D = DARK */

        if (
            event.key.toLowerCase() ===
            "d"
        ) {

            setDarkMode(
                !body.classList.contains(
                    "dark"
                )
            );

            return;

        }


        /* G = STUDIO */

        if (
            event.key.toLowerCase() ===
            "g"
        ) {

            settingsPanel?.classList.toggle(
                "open"
            );

            return;

        }


        /* GALERIA / LIGHTBOX */

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

                restartGalleryAutoplay();

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

                restartGalleryAutoplay();

            }

        }

    }
);


/* =========================================================
   ABA OCULTA
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            if (
                galleryPlaying
            ) {

                clearTimeout(
                    galleryTimer
                );

            }


            return;

        }


        if (
            galleryPlaying
        ) {

            scheduleGalleryAutoplay();

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


/* =========================================================
   INICIALIZAÇÃO FINAL
========================================================= */

try {

    loadSettings();


    updateTimeline();


    updateGalleryUI();


    updateScroll();


    updateSectionIndicator();


    updateMusicUI();


    /*
       Garante que elementos já visíveis
       apareçam mesmo antes do observer.
    */

    setTimeout(
        () => {

            $$(".reveal").forEach(
                element => {

                    const rect =
                        element
                            .getBoundingClientRect();


                    if (
                        rect.top <
                        window.innerHeight *
                        1.1
                    ) {

                        element.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        100
    );


    console.log(
        "Dream carregado com sucesso ♡"
    );


    console.log(
        "Spray sincronizado: 1 áudio + 1 brilho + 1 efeito ✦"
    );

} catch (
    error
) {

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