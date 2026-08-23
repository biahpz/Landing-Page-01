"use strict";

/* =========================================================
   DREAM • AMOR NO AR
   SCRIPT.JS FINAL
   MOONLIGHT EDITION
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const $ = (
    selector,
    parent = document
) =>
    parent.querySelector(
        selector
    );


const $$ = (
    selector,
    parent = document
) =>
    [
        ...parent.querySelectorAll(
            selector
        )
    ];


const body =
    document.body;


const root =
    document.documentElement;


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

    if (
        !loader
    ) {

        return;

    }


    loader.classList.add(
        "hide"
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


if (
    document.readyState ===
    "complete"
) {

    setTimeout(
        hideLoader,
        650
    );

}


/* segurança para nunca ficar preso */

setTimeout(
    hideLoader,
    3500
);


/* =========================================================
   TOAST
========================================================= */

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
            2300
        );

}


/* =========================================================
   SCROLL
========================================================= */

function updateScroll() {

    const top =
        window.scrollY;


    const total =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const percent =
        total > 0
            ? (
                top /
                total
            ) *
            100
            : 0;


    if (
        scrollProgress
    ) {

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


$$(
    ".menu a"
).forEach(
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
   BARRAS DE PERFIL
========================================================= */

const meterElements =
    $$(
        "[data-meter]"
    );


function animateMeter(
    element,
    attribute
) {

    const value =
        Math.max(
            0,
            Math.min(
                100,
                Number(
                    element.dataset[
                        attribute
                    ] ||
                    0
                )
            )
        );


    element.style.width =
        `${value}%`;

}


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


                        animateMeter(
                            entry.target,
                            "meter"
                        );


                        meterObserver.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.3
            }
        );


    meterElements.forEach(
        element => {

            meterObserver.observe(
                element
            );

        }
    );

} else {

    meterElements.forEach(
        element => {

            animateMeter(
                element,
                "meter"
            );

        }
    );

}


/* =========================================================
   FEELING METERS
========================================================= */

const feelingMeters =
    $$(
        ".feeling-meter-fill"
    );


if (
    "IntersectionObserver" in
    window
) {

    const feelingObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        animateMeter(
                            entry.target,
                            "feeling"
                        );


                        feelingObserver.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.25
            }
        );


    feelingMeters.forEach(
        element => {

            feelingObserver.observe(
                element
            );

        }
    );

} else {

    feelingMeters.forEach(
        element => {

            animateMeter(
                element,
                "feeling"
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
    window.innerWidth /
    2;


let cursorY =
    window.innerHeight /
    2;


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


    if (
        !container
    ) {

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


/* =========================================================
   PRODUTO / 3D
========================================================= */

const heroProduct =
    $("#heroProduct");


const mainBottle =
    $("#mainBottle");


const productHalo =
    $("#productHalo");


const feelingOrbit =
    $(".feeling-orbit");


const feelingCenter =
    $(".feeling-center");


let motion3dEnabled =
    true;


let motion3dIntensity =
    1;


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
                ${30 * motion3dIntensity}px
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
                        -25 *
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
   3D DA SENSAÇÃO
========================================================= */

feelingOrbit?.addEventListener(
    "mousemove",
    event => {

        if (
            !motion3dEnabled ||
            !feelingCenter ||
            body.classList.contains(
                "no-animations"
            )
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
            feelingOrbit.getBoundingClientRect();


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
                    12 *
                    motion3dIntensity
                }px,
                ${
                    y *
                    12 *
                    motion3dIntensity
                }px,
                ${
                    30 *
                    motion3dIntensity
                }px
            )
            rotateX(
                ${
                    y *
                    -6 *
                    motion3dIntensity
                }deg
            )
            rotateY(
                ${
                    x *
                    6 *
                    motion3dIntensity
                }deg
            )
            `;

    }
);


feelingOrbit?.addEventListener(
    "mouseleave",
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
   CARDS 3D
========================================================= */

$$(
    ".moment-card"
).forEach(
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
   BORRIFADOR
========================================================= */

const sprayArea =
    $("#sprayArea");


const sprayButton =
    $("#sprayButton");


const sprayWave =
    $("#sprayWave");


let spraying =
    false;


let sprayIntensity =
    1;


let spraySoundEnabled =
    false;


/* =========================================================
   SOM DO BORRIFADOR
========================================================= */

function playSpraySound() {

    if (
        !spraySoundEnabled
    ) {

        return;

    }


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


        const duration =
            0.16;


        const frameCount =
            Math.floor(
                context.sampleRate *
                duration
            );


        const buffer =
            context.createBuffer(
                1,
                frameCount,
                context.sampleRate
            );


        const data =
            buffer.getChannelData(
                0
            );


        for (
            let i = 0;
            i < frameCount;
            i++
        ) {

            const progress =
                i /
                frameCount;


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
                0.18;

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
            1600;


        gain.gain.value =
            0.65;


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

        /* efeito opcional */

    }

}


/* =========================================================
   EXECUTAR SPRAY
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


    playSpraySound();


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


    const mistAmount =
        Math.max(
            25,
            Math.round(
                70 *
                sprayIntensity
            )
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
                430 *
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
                360 *
                sprayIntensity
            }px`
        );


        mist.style.setProperty(
            "--mist-size",
            `${
                3 +
                Math.random() *
                13 *
                sprayIntensity
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


    const symbolAmount =
        Math.max(
            5,
            Math.round(
                14 *
                sprayIntensity
            )
        );


    for (
        let i = 0;
        i < symbolAmount;
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
                400 *
                sprayIntensity
            }px`
        );


        particle.style.setProperty(
            "--symbol-y",
            `${
                (
                    -60 -
                    Math.random() *
                    280
                ) *
                sprayIntensity
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


/* =========================================================
   PRODUTO MODAL
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


$$(
    ".open-product"
).forEach(
    button => {

        button.addEventListener(
            "click",
            openProduct
        );

    }
);


$$(
    ".close-product"
).forEach(
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
        icon:
            "🍊",
        title:
            "Bergamota",
        text:
            "Cítrica, fresca e luminosa. Ajuda a criar uma abertura vibrante."
    },

    laranja: {
        icon:
            "🍊",
        title:
            "Laranja",
        text:
            "Uma nota cítrica alegre, fresca e confortável."
    },

    mandarina: {
        icon:
            "🍊",
        title:
            "Mandarina",
        text:
            "Frutada, cítrica e delicadamente adocicada."
    },

    limao: {
        icon:
            "🍋",
        title:
            "Limão",
        text:
            "Traz brilho, energia e sensação de frescor à abertura."
    },

    cassis: {
        icon:
            "🫐",
        title:
            "Cassis",
        text:
            "Frutado com uma leve acidez que adiciona personalidade."
    },

    maca: {
        icon:
            "🍎",
        title:
            "Maçã",
        text:
            "Fresca, suculenta e suavemente adocicada."
    },

    rosa: {
        icon:
            "🌹",
        title:
            "Rosa",
        text:
            "Floral clássico, elegante e naturalmente romântico."
    },

    tilia: {
        icon:
            "🌼",
        title:
            "Tília",
        text:
            "Uma nota floral delicada, macia e confortável."
    },

    freesia: {
        icon:
            "🌸",
        title:
            "Frésia",
        text:
            "Floral leve e luminoso que reforça a delicadeza da composição."
    },

    lotus: {
        icon:
            "🪷",
        title:
            "Flor de Lótus",
        text:
            "Floral suave com uma sensação limpa, leve e aquática."
    },

    gardenia: {
        icon:
            "🌼",
        title:
            "Gardênia",
        text:
            "Floral cremoso, elegante e sofisticado."
    },

    pessego: {
        icon:
            "🍑",
        title:
            "Pêssego",
        text:
            "Frutado macio, confortável e delicadamente doce."
    },

    ambar: {
        icon:
            "✨",
        title:
            "Âmbar",
        text:
            "Uma nota quente e envolvente que adiciona profundidade."
    },

    sandalo: {
        icon:
            "🪵",
        title:
            "Sândalo",
        text:
            "Madeira cremosa, suave e confortável."
    },

    baunilha: {
        icon:
            "🤍",
        title:
            "Baunilha",
        text:
            "Doce, cremosa e aconchegante, trazendo conforto ao fundo."
    },

    tonka: {
        icon:
            "✨",
        title:
            "Tonka",
        text:
            "Quente, macia e levemente adocicada."
    },

    musk: {
        icon:
            "☁",
        title:
            "Musk",
        text:
            "Macio, confortável e envolvente, deixando uma assinatura suave."
    }

};


function openNoteModal(
    key
) {

    const note =
        noteData[
            key
        ];


    if (
        !noteModal ||
        !note
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


$$(
    ".note-chip"
).forEach(
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


$$(
    ".close-note"
).forEach(
    element => {

        element.addEventListener(
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

            icon:
                "🍊",

            title:
                "Abertura fresca",

            text:
                "Cítricos e frutas aparecem primeiro."

        };

    } else if (
        hour <= 3
    ) {

        stage = {

            icon:
                "🌸",

            title:
                "Coração floral",

            text:
                "As flores assumem o centro da fragrância."

        };

    } else if (
        hour <= 5
    ) {

        stage = {

            icon:
                "♡",

            title:
                "Romântico e confortável",

            text:
                "O floral fica mais macio e envolvente."

        };

    } else {

        stage = {

            icon:
                "✨",

            title:
                "Fundo aconchegante",

            text:
                "Madeiras e notas doces permanecem."

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

        icon:
            "♡",

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

        icon:
            "☾",

        mini:
            "DREAM SKY",

        title:
            "Sonhe mais alto.",

        text:
            "Uma atmosfera noturna, tranquila e cheia de profundidade.",

        background:
            `
            radial-gradient(
                circle at 70% 20%,
                rgba(112,142,255,.38),
                transparent 35%
            ),
            radial-gradient(
                circle at 25% 65%,
                rgba(142,92,221,.25),
                transparent 42%
            ),
            linear-gradient(
                135deg,
                #090c20,
                #1d1d49
            )
            `
    },

    flores: {

        icon:
            "✿",

        mini:
            "FLOWER DREAM",

        title:
            "Flores no ar.",

        text:
            "Um cenário leve, floral e delicado inspirado no coração de Dream.",

        background:
            `
            radial-gradient(
                circle at 20% 40%,
                rgba(255,164,198,.42),
                transparent 37%
            ),
            radial-gradient(
                circle at 75% 55%,
                rgba(255,207,224,.22),
                transparent 40%
            ),
            linear-gradient(
                135deg,
                #28121f,
                #5a2941
            )
            `
    },

    energia: {

        icon:
            "✦",

        mini:
            "ENERGY DREAM",

        title:
            "Brilhe do seu jeito.",

        text:
            "Uma atmosfera mais intensa, viva e cheia de personalidade.",

        background:
            `
            radial-gradient(
                circle at 20% 50%,
                rgba(255,80,158,.45),
                transparent 38%
            ),
            radial-gradient(
                circle at 80% 35%,
                rgba(119,69,255,.43),
                transparent 40%
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


    if (
        !scene
    ) {

        return;

    }


    $$(
        ".scene-button"
    ).forEach(
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


$$(
    ".scene-button"
).forEach(
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


let galleryAutoplayTimer =
    null;


let galleryProgressFrame =
    null;


let galleryProgressStart =
    0;


const galleryDelay =
    4500;


/* =========================================================
   TOTAL
========================================================= */

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
   DOTS
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
                `Ir para imagem ${
                    index +
                    1
                }`
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
   UI GALERIA
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


    $$(
        ".gallery-dot",
        galleryDots ||
        document
    ).forEach(
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

        const targetLeft =
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
                    targetLeft
                ),

            behavior

        });

    }


    updateGalleryUI();

}


/* =========================================================
   SETAS
========================================================= */

galleryPrev?.addEventListener(
    "click",
    () => {

        goToGallery(
            galleryIndex -
            1
        );


        restartGalleryAutoplay();

    }
);


galleryNext?.addEventListener(
    "click",
    () => {

        goToGallery(
            galleryIndex +
            1
        );


        restartGalleryAutoplay();

    }
);


/* =========================================================
   SCROLL DA GALERIA
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

                },
                80
            );

    },
    {
        passive: true
    }
);


/* =========================================================
   DRAG / TOUCH
========================================================= */

let galleryDragging =
    false;


let galleryDragStartX =
    0;


let galleryDragScrollLeft =
    0;


galleryTrack?.addEventListener(
    "pointerdown",
    event => {

        if (
            event.pointerType ===
            "mouse" &&
            event.button !==
            0
        ) {

            return;

        }


        galleryDragging =
            true;


        galleryDragStartX =
            event.clientX;


        galleryDragScrollLeft =
            galleryTrack.scrollLeft;


        galleryTrack.classList.add(
            "dragging"
        );


        galleryTrack.setPointerCapture?.(
            event.pointerId
        );

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


        galleryTrack.scrollLeft =
            galleryDragScrollLeft -
            distance;

    }
);


function stopGalleryDrag() {

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


    restartGalleryAutoplay();

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
   AUTOPLAY
========================================================= */

function updateGalleryProgress() {

    if (
        !galleryPlaying
    ) {

        return;

    }


    const elapsed =
        performance.now() -
        galleryProgressStart;


    const percent =
        Math.min(
            100,
            (
                elapsed /
                galleryDelay
            ) *
            100
        );


    if (
        galleryAutoplayProgress
    ) {

        galleryAutoplayProgress.style.width =
            `${percent}%`;

    }


    if (
        percent <
        100
    ) {

        galleryProgressFrame =
            requestAnimationFrame(
                updateGalleryProgress
            );

    }

}


function scheduleGalleryAutoplay() {

    clearTimeout(
        galleryAutoplayTimer
    );


    cancelAnimationFrame(
        galleryProgressFrame
    );


    galleryProgressStart =
        performance.now();


    if (
        galleryAutoplayProgress
    ) {

        galleryAutoplayProgress.style.width =
            "0%";

    }


    galleryProgressFrame =
        requestAnimationFrame(
            updateGalleryProgress
        );


    galleryAutoplayTimer =
        setTimeout(
            () => {

                if (
                    !galleryPlaying
                ) {

                    return;

                }


                goToGallery(
                    galleryIndex +
                    1
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


function stopGalleryAutoplay() {

    galleryPlaying =
        false;


    clearTimeout(
        galleryAutoplayTimer
    );


    cancelAnimationFrame(
        galleryProgressFrame
    );


    if (
        galleryAutoplayProgress
    ) {

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


/* =========================================================
   ATUALIZAR LIGHTBOX
========================================================= */

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


/* =========================================================
   ABRIR LIGHTBOX
========================================================= */

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


/* =========================================================
   FECHAR LIGHTBOX
========================================================= */

function closeLightbox() {

    lightbox?.classList.remove(
        "open"
    );


    updateModalBodyState();

}


/* =========================================================
   CLIQUE NAS IMAGENS
========================================================= */

galleryItems.forEach(
    (
        item,
        index
    ) => {

        let pointerStartX =
            0;


        item.addEventListener(
            "pointerdown",
            event => {

                pointerStartX =
                    event.clientX;

            }
        );


        item.addEventListener(
            "pointerup",
            event => {

                const moved =
                    Math.abs(
                        event.clientX -
                        pointerStartX
                    );


                if (
                    moved <
                    8
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
   CORES / MOODS
========================================================= */

function hexToRgb(
    hex
) {

    let value =
        String(
            hex
        )
        .replace(
            "#",
            ""
        )
        .trim();


    if (
        value.length ===
        3
    ) {

        value =
            value
            .split(
                ""
            )
            .map(
                character =>
                    character +
                    character
            )
            .join(
                ""
            );

    }


    const number =
        Number.parseInt(
            value,
            16
        );


    if (
        Number.isNaN(
            number
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
                number >>
                16
            ) &
            255,

        g:
            (
                number >>
                8
            ) &
            255,

        b:
            number &
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
        `${
            primaryRgb.r
        }, ${
            primaryRgb.g
        }, ${
            primaryRgb.b
        }`
    );


    root.style.setProperty(
        "--secondary-rgb",
        `${
            secondaryRgb.r
        }, ${
            secondaryRgb.g
        }, ${
            secondaryRgb.b
        }`
    );


    const themeMeta =
        document.querySelector(
            'meta[name="theme-color"]'
        );


    themeMeta?.setAttribute(
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


const moodData = {

    romantico: {

        primary:
            "#df76a8",

        secondary:
            "#9562dc",

        message:
            "Mood Romântico ativado ♡"

    },

    sonhador: {

        primary:
            "#b678d6",

        secondary:
            "#7588e8",

        message:
            "Mood Sonhador ativado ☾"

    },

    noturno: {

        primary:
            "#7259c7",

        secondary:
            "#354a8d",

        message:
            "Mood Noturno ativado ✦"

    },

    energia: {

        primary:
            "#ee6494",

        secondary:
            "#9853db",

        message:
            "Mood Energia ativado ⚡"

    },

    calmo: {

        primary:
            "#7bbdb6",

        secondary:
            "#8798cf",

        message:
            "Mood Calmo ativado ☁"

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


    $$(
        ".mood-button"
    ).forEach(
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


    showToast(
        data.message
    );

}


$$(
    ".mood-button"
).forEach(
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


const quizQuestionsData = [

    {
        question:
            "Qual atmosfera combina mais com você?",

        answers: [

            {
                text:
                    "♡ Romântica",
                type:
                    "lover"
            },

            {
                text:
                    "☾ Sonhadora",
                type:
                    "dreamer"
            },

            {
                text:
                    "✦ Marcante",
                type:
                    "night"
            },

            {
                text:
                    "☁ Tranquila",
                type:
                    "soft"
            }

        ]
    },

    {
        question:
            "Qual momento você mais gosta?",

        answers: [

            {
                text:
                    "Um encontro especial",
                type:
                    "lover"
            },

            {
                text:
                    "Fim de tarde",
                type:
                    "dreamer"
            },

            {
                text:
                    "Uma noite inesquecível",
                type:
                    "night"
            },

            {
                text:
                    "Um momento só meu",
                type:
                    "soft"
            }

        ]
    },

    {
        question:
            "O que uma fragrância deve transmitir?",

        answers: [

            {
                text:
                    "Delicadeza",
                type:
                    "lover"
            },

            {
                text:
                    "Imaginação",
                type:
                    "dreamer"
            },

            {
                text:
                    "Personalidade",
                type:
                    "night"
            },

            {
                text:
                    "Conforto",
                type:
                    "soft"
            }

        ]
    },

    {
        question:
            "Escolha um símbolo Dream.",

        answers: [

            {
                text:
                    "♡ Coração",
                type:
                    "lover"
            },

            {
                text:
                    "☾ Lua",
                type:
                    "dreamer"
            },

            {
                text:
                    "✦ Estrela",
                type:
                    "night"
            },

            {
                text:
                    "☁ Nuvem",
                type:
                    "soft"
            }

        ]
    }

];


const quizResults = {

    lover: {

        icon:
            "♡",

        title:
            "Dream Lover",

        text:
            "Seu Dream é romântico, delicado e envolvente. Você combina com momentos especiais e uma atmosfera cheia de carinho."

    },

    dreamer: {

        icon:
            "☾",

        title:
            "Dreamer",

        text:
            "Seu Dream é leve, criativo e sonhador. Você gosta de atmosferas que fazem a imaginação ir mais longe."

    },

    night: {

        icon:
            "✦",

        title:
            "Night Dream",

        text:
            "Seu Dream tem presença e personalidade. Você combina com noites marcantes e uma atmosfera mais intensa."

    },

    soft: {

        icon:
            "☁",

        title:
            "Soft Dream",

        text:
            "Seu Dream é confortável e tranquilo. Você valoriza leveza, equilíbrio e momentos que fazem bem."

    }

};


let quizIndex =
    0;


let quizScores =
    {};


/* =========================================================
   RESET QUIZ
========================================================= */

function resetQuizData() {

    quizIndex =
        0;


    quizScores = {

        lover: 0,
        dreamer: 0,
        night: 0,
        soft: 0

    };

}


/* =========================================================
   PERGUNTA
========================================================= */

function renderQuizQuestion() {

    const data =
        quizQuestionsData[
            quizIndex
        ];


    if (
        !data
    ) {

        finishQuiz();


        return;

    }


    if (
        quizStep
    ) {

        quizStep.textContent =
            `${
                quizIndex +
                1
            } / ${
                quizQuestionsData.length
            }`;

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
                    quizQuestionsData.length
                ) *
                100
            }%`;

    }


    if (
        quizQuestion
    ) {

        quizQuestion.textContent =
            data.question;

    }


    if (
        !quizOptions
    ) {

        return;

    }


    quizOptions.innerHTML =
        "";


    data.answers.forEach(
        answer => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                answer.text;


            button.addEventListener(
                "click",
                () => {

                    quizScores[
                        answer.type
                    ] =
                        (
                            quizScores[
                                answer.type
                            ] ||
                            0
                        ) +
                        1;


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
            result.icon;

    }


    if (
        quizResultTitle
    ) {

        quizResultTitle.textContent =
            result.title;

    }


    if (
        quizResultText
    ) {

        quizResultText.textContent =
            result.text;

    }

}


/* =========================================================
   COMEÇAR QUIZ
========================================================= */

function beginQuiz() {

    resetQuizData();


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
   PALETAS
========================================================= */

const palettes = {

    dream: {
        primary:
            "#df76a8",
        secondary:
            "#9562dc"
    },

    roxo: {
        primary:
            "#a855f7",
        secondary:
            "#6d28d9"
    },

    azul: {
        primary:
            "#38bdf8",
        secondary:
            "#6366f1"
    },

    cherry: {
        primary:
            "#fb7185",
        secondary:
            "#db2777"
    },

    gold: {
        primary:
            "#d6a84b",
        secondary:
            "#9a6b21"
    },

    menta: {
        primary:
            "#45c4aa",
        secondary:
            "#5285c5"
    }

};


/* =========================================================
   ABRIR / FECHAR STUDIO
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
   PALETA
========================================================= */

function setPalette(
    name,
    save = true
) {

    const palette =
        palettes[
            name
        ];

    if (
        !palette
    ) {

        return;

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

    if (
        save
    ) {

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
   SOM BORRIFADOR
========================================================= */

function setSpraySound(
    enabled,
    save = true
) {

    spraySoundEnabled =
        Boolean(
            enabled
        );

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
                Number(
                    value
                ) ||
                100
            )
        );

    const multiplier =
        100 /
        safe;

    root.style.setProperty(
        "--animation-speed",
        multiplier
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
   CURSOR INTENSIDADE
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
        particleTimer
    );

    particleTimer =
        setTimeout(
            generateParticles,
            80
        );

    if (
        save
    ) {

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
                Number(
                    value
                ) ||
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
        safe ===
        100
            ? ""
            : `contrast(${
                safe /
                100
            })`;

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
   FONT SIZE
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

    $$(
        "[data-font-size]"
    ).forEach(
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

$$(
    "[data-font-size]"
).forEach(
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
   UI MÚSICA
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

}


/* =========================================================
   PLAY
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

    } catch {

        dreamMusicPlaying =
            false;

        updateMusicUI();

        showToast(
            "Toque novamente para iniciar a música ♫"
        );

    }

}


/* =========================================================
   PAUSE
========================================================= */

function pauseDreamMusic() {

    if (
        !dreamMusic
    ) {

        return;

    }

    dreamMusic.pause();

    dreamMusicPlaying =
        false;

    localStorage.setItem(
        "dreamMusicEnabled",
        "false"
    );

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
   VOLUME
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
            `${safe}%`;

    }

    if (
        save
    ) {

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

dreamMusic?.addEventListener(
    "error",
    () => {

        dreamMusicPlaying =
            false;

        updateMusicUI();

        showToast(
            "Moonlight.wav não encontrada"
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
        0.38;

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
                    index +
                    1
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

$$(
    'a[href^="#"]'
).forEach(
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

                const offset =
                    (
                        header?.offsetHeight ||
                        0
                    ) +
                    15;

                const top =
                    target.getBoundingClientRect().top +
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
   TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const typing =
            event.target instanceof
            HTMLElement &&
            event.target.matches(
                'input, textarea, select, [contenteditable="true"]'
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

            settingsPanel?.classList.toggle(
                "open"
            );

            return;

        }

        if (
            lightbox?.classList.contains(
                "open"
            )
        ) {

            if (
                event.key ===
                "ArrowLeft"
            ) {

                lightboxIndex--;

                updateLightbox();

                return;

            }

            if (
                event.key ===
                "ArrowRight"
            ) {

                lightboxIndex++;

                updateLightbox();

                return;

            }

        }

        if (
            event.key ===
            "ArrowLeft"
        ) {

            goToGallery(
                galleryIndex -
                1
            );

        }

        if (
            event.key ===
            "ArrowRight"
        ) {

            goToGallery(
                galleryIndex +
                1
            );

        }

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

    const savedMusic =
        localStorage.getItem(
            "dreamMusicEnabled"
        ) ===
        "true";

    if (
        musicToggle
    ) {

        musicToggle.checked =
            savedMusic;

    }

}


/* =========================================================
   RESTAURAR CONFIGURAÇÕES
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
            "dreamSpraySound",
            "dreamAnimationSpeed",
            "dreamMotion3dIntensity",
            "dreamCursorGlowIntensity",
            "dreamParticleIntensity",
            "dreamSprayIntensity",
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

        pauseDreamMusic();

        showToast(
            "Dream Studio restaurado ♡"
        );

    }
);


/* =========================================================
   REABRIR MÚSICA APÓS INTERAÇÃO
========================================================= */

const savedMusicEnabled =
    localStorage.getItem(
        "dreamMusicEnabled"
    ) ===
    "true";

if (
    savedMusicEnabled
) {

    const resumeSavedMusic =
        async () => {

            await playDreamMusic();

            document.removeEventListener(
                "pointerdown",
                resumeSavedMusic
            );

            document.removeEventListener(
                "keydown",
                resumeSavedMusic
            );

        };

    document.addEventListener(
        "pointerdown",
        resumeSavedMusic,
        {
            once: true
        }
    );

    document.addEventListener(
        "keydown",
        resumeSavedMusic,
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

                    if (
                        window.innerWidth >
                        920
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
   ABA OCULTA
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            galleryPlaying
        ) {

            clearTimeout(
                galleryAutoplayTimer
            );

            cancelAnimationFrame(
                galleryProgressFrame
            );

        } else if (
            galleryPlaying
        ) {

            scheduleGalleryAutoplay();

        }

    }
);


/* =========================================================
   SEGURANÇA LOADER
========================================================= */

window.addEventListener(
    "error",
    () => {

        hideLoader();

    }
);

window.addEventListener(
    "unhandledrejection",
    () => {

        hideLoader();

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

try {

    loadSettings();

    updateMusicUI();

    updateScroll();

    updateTimeline();

    updateGalleryUI();

    updateSectionIndicator();

    setTimeout(
        () => {

            $$(".reveal").forEach(
                element => {

                    const rect =
                        element.getBoundingClientRect();

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
        120
    );

} catch (
    error
) {

    console.error(
        "Erro ao iniciar Dream:",
        error
    );

    hideLoader();

}


/* =========================================================
   FINAL
========================================================= */

console.log(
    "%cDream • Amor no Ar ♡",
    `
    color:#df76a8;
    font-size:20px;
    font-weight:900;
    `
);

console.log(
    "%cMoonlight Edition carregada ♫",
    `
    color:#9562dc;
    font-size:12px;
    font-weight:800;
    `
);