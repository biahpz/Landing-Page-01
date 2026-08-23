"use strict";

/* =========================================================
   DREAM • AMOR NO AR
   SCRIPT.JS v50
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const $ = (
    selector,
    parent = document
) => parent.querySelector(selector);

const $$ = (
    selector,
    parent = document
) => [...parent.querySelectorAll(selector)];

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

const sectionIndicator =
    $("#sectionIndicator");

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
            600
        );

    }
);

setTimeout(
    hideLoader,
    5000
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
   MENU MOBILE
========================================================= */

function setMenuOpen(open) {

    menu?.classList.toggle(
        "open",
        open
    );

    menuMobile?.setAttribute(
        "aria-expanded",
        String(open)
    );

}

menuMobile?.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        setMenuOpen(
            !menu?.classList.contains(
                "open"
            )
        );

    }
);

$$(".menu a").forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                setMenuOpen(
                    false
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

        setMenuOpen(
            false
        );

    }
);


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
            ? current / total * 100
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

function animateMeter(
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

const meterElements = [

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

                            animateMeter(
                                element,
                                "meter"
                            );

                        }

                        if (
                            element.dataset.feeling
                        ) {

                            animateMeter(
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
                threshold: 0.2
            }
        );

    meterElements.forEach(
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
    "pointermove",
    event => {

        if (
            event.pointerType ===
            "touch"
        ) {
            return;
        }

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
                    0.8,
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
   PARTÍCULAS
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

    const performanceMode =
        body.classList.contains(
            "performance-mode"
        );

    const mobile =
        window.innerWidth <
        650;

    let baseAmount =
        mobile
            ? 12
            : 25;

    if (
        performanceMode
    ) {

        baseAmount =
            Math.min(
                baseAmount,
                7
            );

    }

    const amount =
        Math.max(
            2,
            Math.round(
                baseAmount *
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

        container.appendChild(
            particle
        );

    }

}

generateParticles();


/* =========================================================
   SHINE DOS CARDS
========================================================= */

let shineEnabled =
    true;

function bindShineCards() {

    $$(".shine-card").forEach(
        card => {

            card.addEventListener(
                "pointermove",
                event => {

                    if (
                        !shineEnabled ||
                        event.pointerType ===
                        "touch"
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
                        rect.width *
                        100;

                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height *
                        100;

                    card.style.setProperty(
                        "--shine-x",
                        `${x}%`
                    );

                    card.style.setProperty(
                        "--shine-y",
                        `${y}%`
                    );

                }
            );

        }
    );

}

bindShineCards();


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

function bindMagneticButtons() {

    $$(".magnetic").forEach(
        element => {

            element.addEventListener(
                "pointermove",
                event => {

                    if (
                        event.pointerType ===
                        "touch" ||
                        body.classList.contains(
                            "performance-mode"
                        )
                    ) {
                        return;
                    }

                    const rect =
                        element
                            .getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    element.style.transform =
                        `
                        translate(
                            ${x * 0.08}px,
                            ${y * 0.08}px
                        )
                        `;

                }
            );

            element.addEventListener(
                "pointerleave",
                () => {

                    element.style.transform =
                        "";

                }
            );

        }
    );

}

bindMagneticButtons();


/* =========================================================
   PRODUTO PRINCIPAL
========================================================= */

const heroProduct =
    $("#heroProduct");

const mainBottle =
    $("#mainBottle");

const productHalo =
    $("#productHalo");

const productShine =
    $("#productShine");

let motion3dEnabled =
    true;

let motion3dIntensity =
    1;


/* =========================================================
   SPRAY
========================================================= */

const sprayArea =
    $("#sprayArea");

const sprayButton =
    $("#sprayButton");

const sprayWave =
    $("#sprayWave");

const sprayGlow =
    $(".spray-glow");

const sprayCounter =
    $("#sprayCounter");

let spraying =
    false;

let sprayIntensity =
    1;

let spraySoundEnabled =
    false;

let hapticEnabled =
    true;


/* =========================================================
   ÁUDIO SPRAY
========================================================= */

const sprayAudio =
    new Audio(
        "./audio/spray.mp3?v=4"
    );

sprayAudio.preload =
    "auto";

sprayAudio.volume =
    0.48;


/* =========================================================
   CONTADOR
========================================================= */

function getSprayCount() {

    return Number(
        localStorage.getItem(
            "dreamSprayCount"
        ) ||
        0
    );

}

function updateSprayCounter() {

    if (!sprayCounter) {
        return;
    }

    sprayCounter.textContent =
        String(
            getSprayCount()
        );

}

function incrementSprayCounter() {

    const next =
        getSprayCount() +
        1;

    localStorage.setItem(
        "dreamSprayCount",
        String(next)
    );

    updateSprayCounter();

    sprayCounter?.animate(
        [
            {
                transform:
                    "scale(1)"
            },
            {
                transform:
                    "scale(1.42)"
            },
            {
                transform:
                    "scale(1)"
            }
        ],
        {
            duration:
                330,

            easing:
                "ease-out"
        }
    );

}

updateSprayCounter();


/* =========================================================
   SPRAY FX RESET
========================================================= */

function restartSprayEffects() {

    if (
        sprayGlow
    ) {

        sprayGlow.classList.remove(
            "active"
        );

        void sprayGlow.offsetWidth;

        sprayGlow.classList.add(
            "active"
        );

    }

    if (
        sprayWave
    ) {

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
   SPRAY SOUND
========================================================= */

function playSpraySound() {

    if (
        !spraySoundEnabled
    ) {
        return;
    }

    try {

        sprayAudio.pause();

        sprayAudio.currentTime =
            0;

        const promise =
            sprayAudio.play();

        promise?.catch?.(
            error => {

                console.warn(
                    "Não foi possível tocar o spray:",
                    error
                );

            }
        );

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
   VIBRAÇÃO
========================================================= */

function triggerSprayHaptic() {

    if (
        !hapticEnabled ||
        !navigator.vibrate
    ) {
        return;
    }

    try {

        navigator.vibrate(
            28
        );

    } catch {
        /* silencioso */
    }

}


/* =========================================================
   SPRAY MIST
========================================================= */

function createSprayMist() {

    if (!sprayArea) {
        return;
    }

    const performanceMode =
        body.classList.contains(
            "performance-mode"
        );

    const mobile =
        window.innerWidth <
        650;

    let base =
        mobile
            ? 30
            : 56;

    if (
        performanceMode
    ) {

        base =
            Math.min(
                base,
                18
            );

    }

    const amount =
        Math.max(
            12,
            Math.round(
                base *
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

        const spreadX =
            (
                Math.random() -
                0.5
            ) *
            430 *
            sprayIntensity;

        const spreadY =
            (
                Math.random() -
                0.74
            ) *
            350 *
            sprayIntensity;

        mist.style.setProperty(
            "--mist-x",
            `${spreadX}px`
        );

        mist.style.setProperty(
            "--mist-y",
            `${spreadY}px`
        );

        mist.style.setProperty(
            "--mist-size",
            `${
                3 +
                Math.random() *
                10
            }px`
        );

        mist.style.setProperty(
            "--mist-blur",
            `${
                Math.random() *
                2.7
            }px`
        );

        mist.style.setProperty(
            "--mist-duration",
            `${
                0.7 +
                Math.random() *
                0.65
            }s`
        );

        sprayArea.appendChild(
            mist
        );

        setTimeout(
            () => {

                mist.remove();

            },
            1600
        );

    }

}


/* =========================================================
   SPRAY SYMBOLS
========================================================= */

function createSpraySymbols() {

    if (!sprayArea) {
        return;
    }

    if (
        body.classList.contains(
            "performance-mode"
        )
    ) {
        return;
    }

    const symbols = [
        "♡",
        "✦",
        "✧"
    ];

    const amount =
        Math.max(
            4,
            Math.round(
                9 *
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

        symbol.style.fontSize =
            `${
                9 +
                Math.random() *
                11
            }px`;

        symbol.style.setProperty(
            "--symbol-x",
            `${
                (
                    Math.random() -
                    0.5
                ) *
                350 *
                sprayIntensity
            }px`
        );

        symbol.style.setProperty(
            "--symbol-y",
            `${
                (
                    -70 -
                    Math.random() *
                    220
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
            1500
        );

    }

}


/* =========================================================
   SPRAY FLASH
========================================================= */

function createSprayFlash() {

    if (!sprayArea) {
        return null;
    }

    const flash =
        document.createElement(
            "span"
        );

    flash.className =
        "spray-flash active";

    sprayArea.appendChild(
        flash
    );

    return flash;

}


/* =========================================================
   BORRIFADA
========================================================= */

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

    restartSprayEffects();

    playSpraySound();

    triggerSprayHaptic();

    createSprayMist();

    createSpraySymbols();

    const flash =
        createSprayFlash();

    incrementSprayCounter();

    showToast(
        "Dream está no ar ♡"
    );

    setTimeout(
        () => {

            flash?.remove();

            heroProduct?.classList.remove(
                "spraying"
            );

            spraying =
                false;

        },
        850
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
    event => {

        if (
            !motion3dEnabled ||
            !mainBottle ||
            spraying ||
            event.pointerType ===
            "touch" ||
            body.classList.contains(
                "performance-mode"
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
            9 *
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
                        -26 *
                        motion3dIntensity
                    }px,
                    ${
                        (
                            y -
                            0.5
                        ) *
                        -20 *
                        motion3dIntensity
                    }px
                )
                `;

        }

        if (
            productShine
        ) {

            productShine.style.left =
                `${30 + x * 40}%`;

        }

    }
);

heroProduct?.addEventListener(
    "pointerleave",
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

        if (
            productShine
        ) {

            productShine.style.left =
                "50%";

        }

    }
);


/* =========================================================
   MOMENT CARDS 3D
========================================================= */

$$(".moment-card").forEach(
    card => {

        card.addEventListener(
            "pointermove",
            event => {

                if (
                    !motion3dEnabled ||
                    event.pointerType ===
                    "touch" ||
                    body.classList.contains(
                        "performance-mode"
                    )
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
                    perspective(900px)
                    translateY(-7px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
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
   FEELING 3D
========================================================= */

const feelingOrbit =
    $(".feeling-orbit");

const feelingCenter =
    $(".feeling-center");

feelingOrbit?.addEventListener(
    "pointermove",
    event => {

        if (
            !motion3dEnabled ||
            !feelingCenter ||
            event.pointerType ===
            "touch" ||
            body.classList.contains(
                "performance-mode"
            )
        ) {
            return;
        }

        const rect =
            feelingOrbit
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

        feelingCenter.style.transform =
            `
            translate3d(
                ${
                    x *
                    13 *
                    motion3dIntensity
                }px,
                ${
                    y *
                    13 *
                    motion3dIntensity
                }px,
                ${
                    25 *
                    motion3dIntensity
                }px
            )
            rotateX(
                ${
                    y *
                    -7 *
                    motion3dIntensity
                }deg
            )
            rotateY(
                ${
                    x *
                    7 *
                    motion3dIntensity
                }deg
            )
            `;

    }
);

feelingOrbit?.addEventListener(
    "pointerleave",
    () => {

        if (
            feelingCenter
        ) {

            feelingCenter.style.transform =
                "";

        }

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

    if (
        productModal
    ) {

        body.classList.add(
            "modal-open"
        );

    }

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


function toggleFavorite() {

    favorite =
        !favorite;

    localStorage.setItem(
        "dreamFavorite",
        String(favorite)
    );

    updateFavorite();

    showToast(
        favorite
            ? "Dream favoritado ♡"
            : "Removido dos favoritos"
    );

}


favoriteButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            toggleFavorite
        );

    }
);


updateFavorite();


/* =========================================================
   COMPARTILHAR
========================================================= */

async function shareDream(
    customText = null
) {

    const text =
        customText ||
        "Conheça Dream Amor no Ar ♡";

    try {

        if (
            navigator.share
        ) {

            await navigator.share({

                title:
                    "Dream Amor no Ar",

                text,

                url:
                    location.href

            });

            return;

        }

        if (
            navigator.clipboard
        ) {

            await navigator.clipboard.writeText(
                `${text} ${location.href}`
            );

            showToast(
                "Link copiado ♡"
            );

            return;

        }

        showToast(
            "Compartilhamento indisponível"
        );

    } catch (
        error
    ) {

        if (
            error?.name !==
            "AbortError"
        ) {

            console.warn(
                "Erro ao compartilhar:",
                error
            );

        }

    }

}


$("#shareButton")?.addEventListener(
    "click",
    () => {

        shareDream();

    }
);


$("#shareModal")?.addEventListener(
    "click",
    () => {

        shareDream();

    }
);


/* =========================================================
   TELA CHEIA
========================================================= */

const fullscreenButton =
    $("#fullscreenButton");


function updateFullscreenButton() {

    if (
        !fullscreenButton
    ) {
        return;
    }

    fullscreenButton.textContent =
        document.fullscreenElement
            ? "⤢ Sair da tela cheia"
            : "⛶ Tela cheia";

}


fullscreenButton?.addEventListener(
    "click",
    async () => {

        try {

            if (
                document.fullscreenElement
            ) {

                await document.exitFullscreen();

            } else {

                await document.documentElement.requestFullscreen();

            }

        } catch (
            error
        ) {

            console.warn(
                "Tela cheia indisponível:",
                error
            );

            showToast(
                "Tela cheia indisponível"
            );

        }

    }
);


document.addEventListener(
    "fullscreenchange",
    updateFullscreenButton
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


function openNoteModal(
    key
) {

    const note =
        noteData[key];

    if (
        !note ||
        !noteModal
    ) {
        return;
    }

    if (
        noteModalIcon
    ) {

        noteModalIcon.textContent =
            note.icon;

    }

    if (
        noteModalTitle
    ) {

        noteModalTitle.textContent =
            note.title;

    }

    if (
        noteModalText
    ) {

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

    if (
        !timelineSlider
    ) {
        return;
    }

    const hour =
        Number(
            timelineSlider.value
        );

    let stage;

    if (
        hour <= 1
    ) {

        stage = {
            icon: "🍊",
            title: "Abertura fresca",
            text: "Cítricos e frutas aparecem primeiro."
        };

    } else if (
        hour <= 3
    ) {

        stage = {
            icon: "🌸",
            title: "Coração floral",
            text: "As flores assumem o centro da fragrância."
        };

    } else if (
        hour <= 5
    ) {

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

    if (
        timelineHour
    ) {

        timelineHour.textContent =
            `${hour}h`;

    }

    if (
        timelineIcon
    ) {

        timelineIcon.textContent =
            stage.icon;

    }

    if (
        timelineTitle
    ) {

        timelineTitle.textContent =
            stage.title;

    }

    if (
        timelineText
    ) {

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
   DREAM MOMENT
========================================================= */

const dreamMomentTitle =
    $("#dreamMomentTitle");

const dreamMomentText =
    $("#dreamMomentText");

const newDreamMoment =
    $("#newDreamMoment");


const dreamMoments = [

    {
        title:
            "Hoje combina com leveza.",

        text:
            "Escolha um detalhe simples do seu dia e transforme em uma lembrança especial."
    },

    {
        title:
            "Deixe o amor no ar.",

        text:
            "Um pequeno gesto pode mudar completamente a atmosfera de um momento."
    },

    {
        title:
            "Seu Dream pode começar agora.",

        text:
            "Coloque sua música favorita, escolha seu mood e aproveite alguns minutos só seus."
    },

    {
        title:
            "Romantize os detalhes.",

        text:
            "Nem todo momento especial precisa ser planejado."
    },

    {
        title:
            "Brilhe do seu jeito.",

        text:
            "A melhor atmosfera é aquela que combina com quem você é hoje."
    },

    {
        title:
            "Um pouco de calma também é Dream.",

        text:
            "Desacelere por alguns minutos e aproveite o que está acontecendo agora."
    }

];


let lastDreamMoment =
    -1;


function generateDreamMoment() {

    if (
        dreamMoments.length ===
        0
    ) {
        return;
    }

    let index;

    do {

        index =
            Math.floor(
                Math.random() *
                dreamMoments.length
            );

    } while (
        dreamMoments.length > 1 &&
        index === lastDreamMoment
    );

    lastDreamMoment =
        index;

    const moment =
        dreamMoments[index];

    if (
        dreamMomentTitle
    ) {

        dreamMomentTitle.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(8px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 350,
                easing: "ease-out"
            }
        );

        dreamMomentTitle.textContent =
            moment.title;

    }

    if (
        dreamMomentText
    ) {

        dreamMomentText.textContent =
            moment.text;

    }

    showToast(
        "Novo Dream Moment ✦"
    );

}


newDreamMoment?.addEventListener(
    "click",
    generateDreamMoment
);


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

        mini: "DREAM SKY",

        title: "Sonhe mais alto.",

        text:
            "Uma atmosfera noturna, calma e sonhadora.",

        background:
            `
            radial-gradient(
                circle at 70% 20%,
                rgba(112,142,255,.40),
                transparent 35%
            ),
            radial-gradient(
                circle at 20% 70%,
                rgba(131,95,212,.22),
                transparent 40%
            ),
            linear-gradient(
                135deg,
                #080b1f,
                #1c1f52
            )
            `

    },

    flores: {

        icon: "✿",

        mini: "FLOWER DREAM",

        title: "Flores no ar.",

        text:
            "Uma atmosfera floral, leve e delicada.",

        background:
            `
            radial-gradient(
                circle at 20% 40%,
                rgba(255,164,198,.43),
                transparent 37%
            ),
            radial-gradient(
                circle at 78% 62%,
                rgba(255,219,232,.13),
                transparent 38%
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

        text:
            "Uma atmosfera intensa, viva e cheia de personalidade.",

        background:
            `
            radial-gradient(
                circle at 20% 50%,
                rgba(255,80,158,.45),
                transparent 38%
            ),
            radial-gradient(
                circle at 82% 30%,
                rgba(119,69,255,.42),
                transparent 39%
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

    if (
        !scene
    ) {
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

    if (
        sceneResultIcon
    ) {

        sceneResultIcon.textContent =
            scene.icon;

    }

    if (
        sceneResultMini
    ) {

        sceneResultMini.textContent =
            scene.mini;

    }

    if (
        sceneResultTitle
    ) {

        sceneResultTitle.textContent =
            scene.title;

    }

    if (
        sceneResultText
    ) {

        sceneResultText.textContent =
            scene.text;

    }

    if (
        sceneBackground
    ) {

        sceneBackground.style.background =
            scene.background;

    }

    if (
        save
    ) {

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


/* =========================================================
   DOTS GALERIA
========================================================= */

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
            item,
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
   GALERIA UI
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

}


/* =========================================================
   IR PARA ITEM
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
   DRAG REAL GALERIA
========================================================= */

let galleryDragging =
    false;

let galleryDragStartX =
    0;

let galleryDragStartScroll =
    0;

let galleryDraggedDistance =
    0;


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

        galleryDragStartX =
            event.clientX;

        galleryDragStartScroll =
            galleryTrack.scrollLeft;

        galleryDraggedDistance =
            0;

        galleryTrack.classList.add(
            "dragging"
        );

        galleryTrack.setPointerCapture?.(
            event.pointerId
        );

        stopGalleryAutoplay();

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
            galleryDragStartX;

        galleryDraggedDistance =
            Math.max(
                galleryDraggedDistance,
                Math.abs(distance)
            );

        galleryTrack.scrollLeft =
            galleryDragStartScroll -
            distance;

    }
);


function finishGalleryDrag() {

    if (
        !galleryDragging
    ) {
        return;
    }

    galleryDragging =
        false;

    galleryTrack?.classList.remove(
        "dragging"
    );

    updateGalleryFromScroll();

}


galleryTrack?.addEventListener(
    "pointerup",
    finishGalleryDrag
);


galleryTrack?.addEventListener(
    "pointercancel",
    finishGalleryDrag
);


galleryTrack?.addEventListener(
    "pointerleave",
    event => {

        if (
            event.buttons ===
            0
        ) {

            finishGalleryDrag();

        }

    }
);


/* impedir lightbox ao arrastar */

galleryItems.forEach(
    item => {

        item.addEventListener(
            "click",
            event => {

                if (
                    galleryDraggedDistance >
                    12
                ) {

                    event.preventDefault();
                    event.stopImmediatePropagation();

                }

            },
            true
        );

    }
);


/* =========================================================
   ÍNDICE PELO SCROLL
========================================================= */

let galleryScrollTimer;


function updateGalleryFromScroll() {

    if (
        !galleryTrack ||
        galleryItems.length ===
        0
    ) {
        return;
    }

    const center =
        galleryTrack.scrollLeft +
        galleryTrack.clientWidth /
        2;

    let closestIndex =
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
                item.clientWidth /
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

                closestIndex =
                    index;

            }

        }
    );

    galleryIndex =
        closestIndex;

    updateGalleryUI();

}


galleryTrack?.addEventListener(
    "scroll",
    () => {

        clearTimeout(
            galleryScrollTimer
        );

        galleryScrollTimer =
            setTimeout(
                updateGalleryFromScroll,
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
            image.currentSrc ||
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
    (
        item,
        index
    ) => {

        item.addEventListener(
            "click",
            () => {

                if (
                    galleryDraggedDistance <=
                    12
                ) {

                    openLightbox(
                        index
                    );

                }

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
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


lightbox?.addEventListener(
    "touchend",
    event => {

        const distance =
            event.changedTouches[0]
                .screenX -
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

function hexToRgb(
    hex
) {

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
                    char =>
                        char + char
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

    document
        .querySelector(
            'meta[name="theme-color"]'
        )
        ?.setAttribute(
            "content",
            primary
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


function setMood(
    mood,
    save = true
) {

    const data =
        moodData[mood];

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
        data.secondary,
        save
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

const shareQuizResult =
    $("#shareQuizResult");

const applyQuizMood =
    $("#applyQuizMood");

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
            "Escolha um símbolo Dream.",

        answers: [

            ["♡ Coração", "lover"],
            ["☾ Lua", "dreamer"],
            ["✦ Estrela", "night"],
            ["☁ Nuvem", "soft"]

        ]

    }

];


const quizResults = {

    lover: {

        icon: "♡",

        title:
            "Dream Lover",

        text:
            "Seu Dream é romântico, delicado e envolvente.",

        mood:
            "romantico"

    },

    dreamer: {

        icon: "☾",

        title:
            "Dreamer",

        text:
            "Seu Dream é leve, criativo e sonhador.",

        mood:
            "sonhador"

    },

    night: {

        icon: "✦",

        title:
            "Night Dream",

        text:
            "Seu Dream tem presença e personalidade.",

        mood:
            "noturno"

    },

    soft: {

        icon: "☁",

        title:
            "Soft Dream",

        text:
            "Seu Dream é confortável, leve e tranquilo.",

        mood:
            "calmo"

    }

};


let quizIndex =
    0;

let quizScores = {

    lover: 0,
    dreamer: 0,
    night: 0,
    soft: 0

};

let lastQuizResult =
    null;


/* =========================================================
   RENDER QUIZ
========================================================= */

function renderQuizQuestion() {

    const current =
        quizData[
            quizIndex
        ];

    if (
        !current
    ) {

        finishQuiz();

        return;

    }

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
                        quizIndex +
                        1
                    ) /
                    quizData.length
                ) *
                100
            }%`;

    }

    if (
        quizQuestion
    ) {

        quizQuestion.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(8px)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateY(0)"
                }
            ],
            {
                duration: 280,
                easing: "ease-out"
            }
        );

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
        (
            [
                text,
                type
            ],
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.textContent =
                text;

            button.style.animationDelay =
                `${index * 55}ms`;

            button.addEventListener(
                "click",
                () => {

                    quizScores[type]++;

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


/* =========================================================
   RESULTADO
========================================================= */

function finishQuiz() {

    const winner =
        Object.entries(
            quizScores
        )
            .sort(
                (
                    a,
                    b
                ) =>
                    b[1] -
                    a[1]
            )[0]?.[0] ||
        "lover";

    lastQuizResult =
        quizResults[winner];

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

        quizResult.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "scale(.96)"
                },
                {
                    opacity: 1,
                    transform:
                        "scale(1)"
                }
            ],
            {
                duration: 420,
                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }
        );

    }

    if (
        quizResultIcon
    ) {

        quizResultIcon.textContent =
            lastQuizResult.icon;

    }

    if (
        quizResultTitle
    ) {

        quizResultTitle.textContent =
            lastQuizResult.title;

    }

    if (
        quizResultText
    ) {

        quizResultText.textContent =
            lastQuizResult.text;

    }

    localStorage.setItem(
        "dreamQuizResult",
        winner
    );

    showToast(
        `Seu resultado: ${lastQuizResult.title} ♡`
    );

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

    lastQuizResult =
        null;

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
   APLICAR MOOD DO QUIZ
========================================================= */

applyQuizMood?.addEventListener(
    "click",
    () => {

        if (
            !lastQuizResult
        ) {

            showToast(
                "Faça o quiz primeiro ✦"
            );

            return;

        }

        setMood(
            lastQuizResult.mood
        );

        showToast(
            "Seu mood foi aplicado ♡"
        );

    }
);


/* =========================================================
   COMPARTILHAR RESULTADO
========================================================= */

shareQuizResult?.addEventListener(
    "click",
    () => {

        if (
            !lastQuizResult
        ) {

            shareDream(
                "Descubra qual é o seu Dream ♡"
            );

            return;

        }

        shareDream(
            `Meu resultado no Dream Quiz foi ${lastQuizResult.title} ✦`
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


let dreamMusicPlaying =
    false;

let previousMusicVolume =
    0.35;


/* =========================================================
   FORMATAR TEMPO
========================================================= */

function formatMusicTime(
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

    const remainingSeconds =
        Math.floor(
            seconds %
            60
        );

    return `${minutes}:${String(remainingSeconds).padStart(2,"0")}`;

}


/* =========================================================
   MUSIC UI
========================================================= */

function updateMusicUI() {

    dreamMusicPlayer?.classList.toggle(
        "playing",
        dreamMusicPlaying
    );

    if (
        dreamMusicButton
    ) {

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

    if (
        musicToggle
    ) {

        musicToggle.checked =
            dreamMusicPlaying;

    }

    if (
        musicMuteButton &&
        dreamMusic
    ) {

        musicMuteButton.textContent =
            dreamMusic.muted ||
            dreamMusic.volume === 0
                ? "🔇"
                : "🔊";

    }

}


/* =========================================================
   PLAY / PAUSE
========================================================= */

async function playDreamMusic() {

    if (
        !dreamMusic
    ) {
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
            "Moonlight bloqueada:",
            error
        );

    }

}


function pauseDreamMusic(
    save = true
) {

    if (
        !dreamMusic
    ) {
        return;
    }

    dreamMusic.pause();

    dreamMusicPlaying =
        false;

    if (
        save
    ) {

        localStorage.setItem(
            "dreamMusicEnabled",
            "false"
        );

    }

    updateMusicUI();

}


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
   PROGRESSO MÚSICA
========================================================= */

function updateMusicProgress() {

    if (
        !dreamMusic
    ) {
        return;
    }

    const current =
        dreamMusic.currentTime ||
        0;

    const duration =
        dreamMusic.duration ||
        0;

    if (
        musicCurrentTime
    ) {

        musicCurrentTime.textContent =
            formatMusicTime(
                current
            );

    }

    if (
        musicDuration
    ) {

        musicDuration.textContent =
            formatMusicTime(
                duration
            );

    }

    if (
        musicProgress &&
        duration >
        0
    ) {

        musicProgress.value =
            String(
                current /
                duration *
                100
            );

    }

}


dreamMusic?.addEventListener(
    "timeupdate",
    updateMusicProgress
);


dreamMusic?.addEventListener(
    "loadedmetadata",
    updateMusicProgress
);


musicProgress?.addEventListener(
    "input",
    () => {

        if (
            !dreamMusic ||
            !Number.isFinite(
                dreamMusic.duration
            )
        ) {
            return;
        }

        dreamMusic.currentTime =
            Number(
                musicProgress.value
            ) /
            100 *
            dreamMusic.duration;

    }
);


/* =========================================================
   VOLUME MÚSICA
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
                Number(value) ||
                0
            )
        );

    if (
        dreamMusic
    ) {

        dreamMusic.volume =
            safe /
            100;

        if (
            safe >
            0
        ) {

            dreamMusic.muted =
                false;

            previousMusicVolume =
                safe /
                100;

        }

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
            `${safe}%`;

    }

    updateMusicUI();

    if (
        save
    ) {

        localStorage.setItem(
            "dreamMusicVolume",
            String(safe)
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


/* =========================================================
   MUTE
========================================================= */

musicMuteButton?.addEventListener(
    "click",
    () => {

        if (
            !dreamMusic
        ) {
            return;
        }

        if (
            dreamMusic.muted ||
            dreamMusic.volume === 0
        ) {

            dreamMusic.muted =
                false;

            if (
                dreamMusic.volume ===
                0
            ) {

                const volume =
                    Math.max(
                        0.05,
                        previousMusicVolume
                    );

                dreamMusic.volume =
                    volume;

                setDreamMusicVolume(
                    Math.round(
                        volume *
                        100
                    )
                );

            }

        } else {

            previousMusicVolume =
                dreamMusic.volume;

            dreamMusic.muted =
                true;

        }

        updateMusicUI();

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

const performanceToggle =
    $("#performanceToggle");

const particlesToggle =
    $("#particlesToggle");

const animationsToggle =
    $("#animationsToggle");

const cursorToggle =
    $("#cursorToggle");

const motion3dToggle =
    $("#motion3dToggle");

const shineToggle =
    $("#shineToggle");

const hapticToggle =
    $("#hapticToggle");

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
   ABRIR / FECHAR STUDIO
========================================================= */

function setSettingsOpen(
    open
) {

    settingsPanel?.classList.toggle(
        "open",
        open
    );

}


settingsButton?.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        setSettingsOpen(
            !settingsPanel?.classList.contains(
                "open"
            )
        );

    }
);


closeSettings?.addEventListener(
    "click",
    () => {

        setSettingsOpen(
            false
        );

    }
);


document.addEventListener(
    "click",
    event => {

        if (
            !settingsPanel?.classList.contains(
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

        setSettingsOpen(
            false
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

    if (
        !palette
    ) {
        return;
    }

    setThemeColors(
        palette.primary,
        palette.secondary,
        save
    );

    if (
        primaryColor
    ) {

        primaryColor.value =
            palette.primary;

    }

    if (
        secondaryColor
    ) {

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

    if (
        save
    ) {

        localStorage.setItem(
            "dreamPalette",
            name
        );

        localStorage.removeItem(
            "dreamMood"
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

                clearActivePreset();

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

        localStorage.removeItem(
            "dreamMood"
        );

        $$(".palette").forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
        );

        clearActivePreset();

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

        localStorage.removeItem(
            "dreamMood"
        );

        $$(".palette").forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
        );

        clearActivePreset();

    }
);


/* =========================================================
   MODO ESCURO
========================================================= */

function setDarkMode(
    enabled,
    save = true
) {

    body.classList.toggle(
        "dark",
        enabled
    );

    if (
        darkToggle
    ) {

        darkToggle.checked =
            enabled;

    }

    if (
        themeButton
    ) {

        themeButton.textContent =
            enabled
                ? "☀"
                : "☾";

    }

    if (
        save
    ) {

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

        clearActivePreset();

    }
);


darkToggle?.addEventListener(
    "change",
    () => {

        setDarkMode(
            darkToggle.checked
        );

        clearActivePreset();

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

    if (
        glassToggle
    ) {

        glassToggle.checked =
            enabled;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamGlass",
            String(enabled)
        );

    }

}


glassToggle?.addEventListener(
    "change",
    () => {

        setGlass(
            glassToggle.checked
        );

        clearActivePreset();

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

    if (
        cleanModeToggle
    ) {

        cleanModeToggle.checked =
            enabled;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamClean",
            String(enabled)
        );

    }

}


cleanModeToggle?.addEventListener(
    "change",
    () => {

        setCleanMode(
            cleanModeToggle.checked
        );

        clearActivePreset();

    }
);


/* =========================================================
   PERFORMANCE MODE
========================================================= */

function setPerformanceMode(
    enabled,
    save = true
) {

    body.classList.toggle(
        "performance-mode",
        enabled
    );

    if (
        performanceToggle
    ) {

        performanceToggle.checked =
            enabled;

    }

    if (
        enabled
    ) {

        setMotion3d(
            false,
            false
        );

        setCursorGlow(
            false,
            false
        );

        setShine(
            false,
            false
        );

        particleIntensity =
            Math.min(
                particleIntensity,
                0.5
            );

    }

    generateParticles();

    if (
        save
    ) {

        localStorage.setItem(
            "dreamPerformance",
            String(enabled)
        );

    }

}


performanceToggle?.addEventListener(
    "change",
    () => {

        setPerformanceMode(
            performanceToggle.checked
        );

        clearActivePreset();

        showToast(
            performanceToggle.checked
                ? "Modo performance ativado ⚡"
                : "Modo performance desligado"
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

    if (
        particlesToggle
    ) {

        particlesToggle.checked =
            enabled;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamParticles",
            String(enabled)
        );

    }

}


particlesToggle?.addEventListener(
    "change",
    () => {

        setParticles(
            particlesToggle.checked
        );

        clearActivePreset();

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

    if (
        animationsToggle
    ) {

        animationsToggle.checked =
            enabled;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamAnimations",
            String(enabled)
        );

    }

}


animationsToggle?.addEventListener(
    "change",
    () => {

        setAnimations(
            animationsToggle.checked
        );

        clearActivePreset();

    }
);


/* =========================================================
   CURSOR
========================================================= */

function setCursorGlow(
    enabled,
    save = true
) {

    body.classList.toggle(
        "no-cursor",
        !enabled
    );

    if (
        cursorToggle
    ) {

        cursorToggle.checked =
            enabled;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamCursor",
            String(enabled)
        );

    }

}


cursorToggle?.addEventListener(
    "change",
    () => {

        setCursorGlow(
            cursorToggle.checked
        );

        clearActivePreset();

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
        Boolean(enabled);

    if (
        motion3dToggle
    ) {

        motion3dToggle.checked =
            motion3dEnabled;

    }

    if (
        !motion3dEnabled
    ) {

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
            feelingCenter
        ) {

            feelingCenter.style.transform =
                "";

        }

        $$(".moment-card").forEach(
            card => {

                card.style.transform =
                    "";

            }
        );

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamMotion3d",
            String(motion3dEnabled)
        );

    }

}


motion3dToggle?.addEventListener(
    "change",
    () => {

        setMotion3d(
            motion3dToggle.checked
        );

        clearActivePreset();

    }
);


/* =========================================================
   SHINE
========================================================= */

function setShine(
    enabled,
    save = true
) {

    shineEnabled =
        Boolean(enabled);

    body.classList.toggle(
        "no-shine",
        !shineEnabled
    );

    if (
        shineToggle
    ) {

        shineToggle.checked =
            shineEnabled;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamShine",
            String(shineEnabled)
        );

    }

}


shineToggle?.addEventListener(
    "change",
    () => {

        setShine(
            shineToggle.checked
        );

        clearActivePreset();

    }
);


/* =========================================================
   HAPTIC
========================================================= */

function setHaptic(
    enabled,
    save = true
) {

    hapticEnabled =
        Boolean(enabled);

    if (
        hapticToggle
    ) {

        hapticToggle.checked =
            hapticEnabled;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamHaptic",
            String(hapticEnabled)
        );

    }

}


hapticToggle?.addEventListener(
    "change",
    () => {

        setHaptic(
            hapticToggle.checked
        );

        clearActivePreset();

    }
);


/* =========================================================
   SOM SPRAY
========================================================= */

function setSpraySound(
    enabled,
    save = true
) {

    spraySoundEnabled =
        Boolean(enabled);

    if (
        spraySoundToggle
    ) {

        spraySoundToggle.checked =
            spraySoundEnabled;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamSpraySound",
            String(spraySoundEnabled)
        );

    }

}


spraySoundToggle?.addEventListener(
    "change",
    () => {

        setSpraySound(
            spraySoundToggle.checked
        );

        clearActivePreset();

        showToast(
            spraySoundEnabled
                ? "Som do borrifador ativado ✦"
                : "Som do borrifador desligado"
        );

    }
);


/* =========================================================
   VELOCIDADE
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
                Number(value) ||
                100
            )
        );

    root.style.setProperty(
        "--animation-speed",
        100 / safe
    );

    if (
        animationSpeed
    ) {

        animationSpeed.value =
            safe;

    }

    if (
        animationSpeedValue
    ) {

        animationSpeedValue.textContent =
            `${safe}%`;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamAnimationSpeed",
            String(safe)
        );

    }

}


animationSpeed?.addEventListener(
    "input",
    () => {

        setAnimationSpeed(
            animationSpeed.value
        );

        clearActivePreset();

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
                Number(value) ||
                0
            )
        );

    motion3dIntensity =
        safe /
        100;

    if (
        motion3dRange
    ) {

        motion3dRange.value =
            safe;

    }

    if (
        motion3dValue
    ) {

        motion3dValue.textContent =
            `${safe}%`;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamMotion3dIntensity",
            String(safe)
        );

    }

}


motion3dRange?.addEventListener(
    "input",
    () => {

        setMotion3dIntensity(
            motion3dRange.value
        );

        clearActivePreset();

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
                Number(value) ||
                0
            )
        );

    cursorGlowIntensity =
        safe /
        100;

    if (
        cursorGlowRange
    ) {

        cursorGlowRange.value =
            safe;

    }

    if (
        cursorGlowValue
    ) {

        cursorGlowValue.textContent =
            `${safe}%`;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamCursorGlowIntensity",
            String(safe)
        );

    }

}


cursorGlowRange?.addEventListener(
    "input",
    () => {

        setCursorGlowIntensity(
            cursorGlowRange.value
        );

        clearActivePreset();

    }
);


/* =========================================================
   INTENSIDADE PARTÍCULAS
========================================================= */

let particleUpdateTimer;


function setParticleIntensity(
    value,
    save = true
) {

    const safe =
        Math.max(
            0,
            Math.min(
                150,
                Number(value) ||
                0
            )
        );

    particleIntensity =
        safe /
        100;

    if (
        particleIntensityRange
    ) {

        particleIntensityRange.value =
            safe;

    }

    if (
        particleIntensityValue
    ) {

        particleIntensityValue.textContent =
            `${safe}%`;

    }

    clearTimeout(
        particleUpdateTimer
    );

    particleUpdateTimer =
        setTimeout(
            generateParticles,
            80
        );

    if (
        save
    ) {

        localStorage.setItem(
            "dreamParticleIntensity",
            String(safe)
        );

    }

}


particleIntensityRange?.addEventListener(
    "input",
    () => {

        setParticleIntensity(
            particleIntensityRange.value
        );

        clearActivePreset();

    }
);


/* =========================================================
   INTENSIDADE SPRAY
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
                Number(value) ||
                100
            )
        );

    sprayIntensity =
        safe /
        100;

    if (
        sprayIntensityRange
    ) {

        sprayIntensityRange.value =
            safe;

    }

    if (
        sprayIntensityValue
    ) {

        sprayIntensityValue.textContent =
            `${safe}%`;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamSprayIntensity",
            String(safe)
        );

    }

}


sprayIntensityRange?.addEventListener(
    "input",
    () => {

        setSprayIntensity(
            sprayIntensityRange.value
        );

        clearActivePreset();

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
                Number(value) ||
                100
            )
        );

    root.style.filter =
        safe === 100
            ? ""
            : `contrast(${safe / 100})`;

    if (
        contrastControl
    ) {

        contrastControl.value =
            safe;

    }

    if (
        contrastValue
    ) {

        contrastValue.textContent =
            `${safe}%`;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamContrast",
            String(safe)
        );

    }

}


contrastControl?.addEventListener(
    "input",
    () => {

        setContrast(
            contrastControl.value
        );

        clearActivePreset();

    }
);


/* =========================================================
   TAMANHO TEXTO
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

    if (
        save
    ) {

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

                clearActivePreset();

            }
        );

    }
);


/* =========================================================
   PRESETS
========================================================= */

const presetButtons =
    $$(".preset-button");


function clearActivePreset() {

    presetButtons.forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );

}


function markPreset(
    preset
) {

    presetButtons.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.preset ===
                preset
            );

        }
    );

}


function applyPreset(
    preset,
    save = true
) {

    switch (
        preset
    ) {

        case "dream":

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

            setPerformanceMode(
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

            setShine(
                true,
                false
            );

            setHaptic(
                true,
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

            break;


        case "cinematic":

            setPalette(
                "cherry",
                false
            );

            setDarkMode(
                true,
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

            setPerformanceMode(
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

            setShine(
                true,
                false
            );

            setAnimationSpeed(
                85,
                false
            );

            setMotion3dIntensity(
                125,
                false
            );

            setCursorGlowIntensity(
                125,
                false
            );

            setParticleIntensity(
                120,
                false
            );

            break;


        case "soft":

            setPalette(
                "menta",
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

            setPerformanceMode(
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

            setShine(
                true,
                false
            );

            setAnimationSpeed(
                115,
                false
            );

            setMotion3dIntensity(
                65,
                false
            );

            setCursorGlowIntensity(
                70,
                false
            );

            setParticleIntensity(
                65,
                false
            );

            break;


        case "performance":

            setPalette(
                "dream",
                false
            );

            setDarkMode(
                false,
                false
            );

            setGlass(
                false,
                false
            );

            setCleanMode(
                true,
                false
            );

            setPerformanceMode(
                true,
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
                false,
                false
            );

            setMotion3d(
                false,
                false
            );

            setShine(
                false,
                false
            );

            setParticleIntensity(
                35,
                false
            );

            break;


        default:
            return;

    }

    markPreset(
        preset
    );

    generateParticles();

    if (
        save
    ) {

        localStorage.setItem(
            "dreamPreset",
            preset
        );

    }

    showToast(
        `Preset ${preset} aplicado ✦`
    );

}


presetButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                applyPreset(
                    button.dataset.preset
                );

            }
        );

    }
);


/* =========================================================
   SETTINGS HELPERS
========================================================= */

function readBooleanSetting(
    key,
    fallback
) {

    const value =
        localStorage.getItem(
            key
        );

    if (
        value === null
    ) {
        return fallback;
    }

    return value ===
        "true";

}


/* =========================================================
   AUTO PERFORMANCE MOBILE
========================================================= */

function shouldUseAutoPerformance() {

    const manualSetting =
        localStorage.getItem(
            "dreamPerformance"
        );

    if (
        manualSetting !==
        null
    ) {

        return manualSetting ===
            "true";

    }

    const lowMemory =
        typeof navigator.deviceMemory ===
        "number" &&
        navigator.deviceMemory <=
        4;

    const lowCpu =
        typeof navigator.hardwareConcurrency ===
        "number" &&
        navigator.hardwareConcurrency <=
        4;

    const narrowScreen =
        window.innerWidth <=
        520;

    return (
        narrowScreen &&
        (
            lowMemory ||
            lowCpu
        )
    );

}


/* =========================================================
   CARREGAR SETTINGS
========================================================= */

function loadSettings() {

    const savedPreset =
        localStorage.getItem(
            "dreamPreset"
        );

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
        palettes[savedPalette]
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

        if (
            primaryColor
        ) {

            primaryColor.value =
                savedPrimary;

        }

        if (
            secondaryColor
        ) {

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

    setShine(
        readBooleanSetting(
            "dreamShine",
            true
        ),
        false
    );

    setHaptic(
        readBooleanSetting(
            "dreamHaptic",
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


    const autoPerformance =
        shouldUseAutoPerformance();

    setPerformanceMode(
        autoPerformance,
        false
    );


    const savedScene =
        localStorage.getItem(
            "dreamScene"
        );

    setScene(
        savedScene &&
        sceneData[savedScene]
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
        moodData[savedMood]
    ) {

        setMood(
            savedMood,
            false
        );

    }


    if (
        savedPreset
    ) {

        markPreset(
            savedPreset
        );

    } else {

        clearActivePreset();

    }


    updateSprayCounter();

}


/* =========================================================
   RESET SETTINGS
========================================================= */

resetSettings?.addEventListener(
    "click",
    () => {

        const keys = [

            "dreamPrimary",
            "dreamSecondary",
            "dreamPalette",
            "dreamPreset",

            "dreamDark",
            "dreamGlass",
            "dreamClean",
            "dreamPerformance",

            "dreamParticles",
            "dreamAnimations",
            "dreamCursor",

            "dreamMotion3d",
            "dreamMotion3dIntensity",

            "dreamShine",
            "dreamHaptic",

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

        applyPreset(
            "dream",
            false
        );

        setSpraySound(
            false,
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

        markPreset(
            "dream"
        );

        showToast(
            "Dream Studio restaurado ♡"
        );

    }
);


/* =========================================================
   INDICADOR DE SEÇÃO
========================================================= */

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


window.addEventListener(
    "scroll",
    updateSectionIndicator,
    {
        passive: true
    }
);


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
                    href === "#"
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

                const top =
                    target
                        .getBoundingClientRect()
                        .top +
                    window.scrollY -
                    offset;

                window.scrollTo({

                    top,

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
            target instanceof HTMLElement &&
            target.matches(
                "input, textarea, select, [contenteditable='true']"
            );

        if (
            typing
        ) {
            return;
        }


        if (
            event.key ===
            "Escape"
        ) {

            closeProduct();

            closeNoteModal();

            closeLightbox();

            setMenuOpen(
                false
            );

            setSettingsOpen(
                false
            );

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
            "m"
        ) {

            toggleDreamMusic();

            return;

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

            return;

        }


        if (
            event.key.toLowerCase() ===
            "g"
        ) {

            setSettingsOpen(
                !settingsPanel?.classList.contains(
                    "open"
                )
            );

            return;

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

            clearTimeout(
                galleryTimer
            );

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
   RETOMAR MÚSICA SALVA
========================================================= */

function bindMusicResumeGesture() {

    const shouldResume =
        localStorage.getItem(
            "dreamMusicEnabled"
        ) ===
        "true";

    if (
        !shouldResume
    ) {
        return;
    }

    const resume =
        () => {

            playDreamMusic();

            document.removeEventListener(
                "pointerdown",
                resume
            );

            document.removeEventListener(
                "keydown",
                resume
            );

        };

    document.addEventListener(
        "pointerdown",
        resume,
        {
            once: true
        }
    );

    document.addEventListener(
        "keydown",
        resume,
        {
            once: true
        }
    );

}


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

                    generateParticles();

                    if (
                        window.innerWidth >
                        920
                    ) {

                        setMenuOpen(
                            false
                        );

                    }

                },
                130
            );

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

try {

    loadSettings();

    updateTimeline();

    updateGalleryUI();

    updateScroll();

    updateSectionIndicator();

    updateMusicUI();

    updateMusicProgress();

    updateFullscreenButton();

    bindMusicResumeGesture();


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
        "Dream v50 carregado ♡"
    );

    console.log(
        "Moonlight, spray, presets e performance ativos ✦"
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