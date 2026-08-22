"use strict";


/* =========================================================
   DREAM • AMOR NO AR
   SCRIPT.JS
   UPDATE 3.0
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


/* =========================================================
   LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                loader?.classList.add(
                    "hide"
                );

            },
            650
        );

    }
);


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
            ? top / total * 100
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


    updateSectionIndicator();

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
                "smooth"

        });

    }
);


/* =========================================================
   MENU MOBILE
========================================================= */

menuMobile?.addEventListener(
    "click",
    () => {

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


/* =========================================================
   FECHAR MENU CLICANDO FORA
========================================================= */

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
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

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
   METERS
========================================================= */

const meterElements =
    $$(
        "[data-meter]"
    );


if (
    "IntersectionObserver" in window
) {

    const meterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const value =
                                Number(
                                    entry.target.dataset.meter ||
                                    0
                                );


                            entry.target.style.width =
                                `${Math.min(
                                    100,
                                    Math.max(
                                        0,
                                        value
                                    )
                                )}%`;


                            meterObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.35
            }

        );


    meterElements.forEach(
        meter => {

            meterObserver.observe(
                meter
            );

        }
    );

} else {

    meterElements.forEach(
        meter => {

            meter.style.width =
                `${
                    Number(
                        meter.dataset.meter ||
                        0
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


let cursorX =
    window.innerWidth / 2;


let cursorY =
    window.innerHeight / 2;


let glowX =
    cursorX;


let glowY =
    cursorY;


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

    }


    requestAnimationFrame(
        animateCursorGlow
    );

}


animateCursorGlow();


/* =========================================================
   BORRIFADOR PREMIUM
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


let spraying =
    false;


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


    /* =====================================================
       ONDA
    ===================================================== */

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


    /* =====================================================
       FLASH
    ===================================================== */

    const flash =
        document.createElement(
            "span"
        );


    flash.className =
        "spray-flash active";


    sprayArea.appendChild(
        flash
    );


    /* =====================================================
       NÉVOA
    ===================================================== */

    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const mist =
            document.createElement(
                "span"
            );


        mist.className =
            "spray-mist";


        const x =
            (
                Math.random() -
                0.5
            ) *
            430;


        const y =
            (
                Math.random() -
                0.65
            ) *
            360;


        const size =
            3 +
            Math.random() *
            13;


        const blur =
            Math.random() *
            3;


        const duration =
            0.8 +
            Math.random() *
            0.9;


        mist.style.setProperty(
            "--mist-x",
            `${x}px`
        );


        mist.style.setProperty(
            "--mist-y",
            `${y}px`
        );


        mist.style.setProperty(
            "--mist-size",
            `${size}px`
        );


        mist.style.setProperty(
            "--mist-blur",
            `${blur}px`
        );


        mist.style.setProperty(
            "--mist-duration",
            `${duration}s`
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


    /* =====================================================
       CORAÇÕES E ESTRELAS
    ===================================================== */

    const symbols = [
        "♡",
        "✦",
        "♡",
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
   FRASCO 3D
========================================================= */

heroProduct?.addEventListener(
    "mousemove",
    event => {

        if (
            spraying ||
            !mainBottle
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
            16;


        const rotateX =
            (
                0.5 -
                y
            ) *
            12;


        mainBottle.style.transform = `

            translate3d(
                ${
                    (
                        x -
                        0.5
                    ) *
                    15
                }px,

                ${
                    (
                        y -
                        0.5
                    ) *
                    8
                }px,

                30px
            )

            rotateX(
                ${rotateX}deg
            )

            rotateY(
                ${rotateY}deg
            )

        `;


        if (
            productHalo
        ) {

            productHalo.style.transform = `

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
            !spraying &&
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

    }
);


/* =========================================================
   PRODUTO MODAL
========================================================= */

const productModal =
    $("#productModal");


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

const notes = {

    bergamota: [
        "🍊",
        "Bergamota",
        "Cítrica, fresca e luminosa."
    ],

    laranja: [
        "🍊",
        "Laranja",
        "Uma sensação cítrica alegre e confortável."
    ],

    mandarina: [
        "🍊",
        "Mandarina",
        "Frutada, vibrante e delicada."
    ],

    limao: [
        "🍋",
        "Limão",
        "Traz brilho e frescor."
    ],

    cassis: [
        "🫐",
        "Cassis",
        "Frutado com leve acidez."
    ],

    maca: [
        "🍎",
        "Maçã",
        "Fresca e suavemente adocicada."
    ],

    rosa: [
        "🌹",
        "Rosa",
        "Floral romântico e clássico."
    ],

    tilia: [
        "🌼",
        "Tília",
        "Floral delicado e confortável."
    ],

    freesia: [
        "🌸",
        "Frésia",
        "Floral leve e luminoso."
    ],

    lotus: [
        "🪷",
        "Flor de Lótus",
        "Floral suave e aquático."
    ],

    gardenia: [
        "🌼",
        "Gardênia",
        "Floral cremoso e sofisticado."
    ],

    pessego: [
        "🍑",
        "Pêssego",
        "Frutado macio e confortável."
    ],

    ambar: [
        "✨",
        "Âmbar",
        "Quente e envolvente."
    ],

    sandalo: [
        "🪵",
        "Sândalo",
        "Madeira cremosa e suave."
    ],

    baunilha: [
        "🤍",
        "Baunilha",
        "Doce, cremosa e aconchegante."
    ],

    tonka: [
        "✨",
        "Tonka",
        "Quente e levemente adocicada."
    ],

    musk: [
        "☁",
        "Musk",
        "Macio, confortável e envolvente."
    ]

};


const noteModal =
    $("#noteModal");


$$(
    ".note-chip"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const note =
                    notes[
                        button.dataset.note
                    ];


                if (
                    !note
                ) {

                    return;
                                    }


                const icon =
                    $("#noteModalIcon");


                const title =
                    $("#noteModalTitle");


                const text =
                    $("#noteModalText");


                if (
                    icon
                ) {

                    icon.textContent =
                        note[0];

                }


                if (
                    title
                ) {

                    title.textContent =
                        note[1];

                }


                if (
                    text
                ) {

                    text.textContent =
                        note[2];

                }


                noteModal?.classList.add(
                    "open"
                );


                body.classList.add(
                    "modal-open"
                );

            }
        );

    }
);


function closeNote() {

    noteModal?.classList.remove(
        "open"
    );


    updateModalBodyState();

}


$$(
    ".close-note"
).forEach(
    button => {

        button.addEventListener(
            "click",
            closeNote
        );

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


    const hour =
        $("#timelineHour");


    if (
        hour
    ) {

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


    const icon =
        $("#timelineIcon");


    const title =
        $("#timelineTitle");


    const text =
        $("#timelineText");


    if (
        icon
    ) {

        icon.textContent =
            stage[1];

    }


    if (
        title
    ) {

        title.textContent =
            stage[2];

    }


    if (
        text
    ) {

        text.textContent =
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


let galleryIndex =
    0;


function updateGalleryUI() {

    $$(".gallery-dot")
        .forEach(
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


    const current =
        $("#galleryCurrent");


    const total =
        $("#galleryTotal");


    if (
        current
    ) {

        current.textContent =
            String(
                galleryIndex +
                1
            ).padStart(
                2,
                "0"
            );

    }


    if (
        total
    ) {

        total.textContent =
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
        !galleryItems.length
    ) {

        return;

    }


    galleryIndex =
        Math.max(
            0,
            Math.min(
                index,
                galleryItems.length -
                1
            )
        );


    const item =
        galleryItems[
            galleryIndex
        ];


    if (
        galleryTrack &&
        item
    ) {

        galleryTrack.scrollTo({

            left:
                item.offsetLeft -
                galleryTrack.offsetLeft,

            behavior:
                "smooth"

        });

    }


    updateGalleryUI();

}


if (
    galleryDots
) {

    galleryDots.innerHTML =
        "";

}


galleryItems.forEach(
    (
        _,
        index
    ) => {

        const dot =
            document.createElement(
                "button"
            );


        dot.className =
            "gallery-dot";


        dot.type =
            "button";


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


        galleryDots?.appendChild(
            dot
        );

    }
);


updateGalleryUI();


$("#galleryNext")?.addEventListener(
    "click",
    () => {

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

        goGallery(

            galleryIndex <= 0
                ? galleryItems.length - 1
                : galleryIndex - 1

        );

    }
);


/* =========================================================
   ARRASTAR GALERIA
========================================================= */

let dragging =
    false;


let dragMoved =
    false;


let startX =
    0;


let startScroll =
    0;


galleryTrack?.addEventListener(
    "mousedown",
    event => {

        dragging =
            true;


        dragMoved =
            false;


        startX =
            event.pageX;


        startScroll =
            galleryTrack.scrollLeft;


        galleryTrack.classList.add(
            "dragging"
        );

    }
);


window.addEventListener(
    "mouseup",
    () => {

        if (
            dragging
        ) {

            dragging =
                false;


            galleryTrack?.classList.remove(
                "dragging"
            );


            setTimeout(
                () => {

                    dragMoved =
                        false;

                },
                50
            );

        }

    }
);


galleryTrack?.addEventListener(
    "mousemove",
    event => {

        if (
            !dragging
        ) {

            return;

        }


        const distance =
            event.pageX -
            startX;


        if (
            Math.abs(
                distance
            ) >
            5
        ) {

            dragMoved =
                true;

        }


        event.preventDefault();


        galleryTrack.scrollLeft =
            startScroll -
            distance;

    }
);


/* =========================================================
   SINCRONIZAR ÍNDICE DA GALERIA NO SCROLL
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


                    let closest =
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
                                item.offsetWidth /
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


                                closest =
                                    index;

                            }

                        }
                    );


                    galleryIndex =
                        closest;


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
   AUTOPLAY GALERIA
========================================================= */

let autoplay =
    null;


const autoplayButton =
    $("#galleryAutoplay");


const autoplayProgress =
    $(".gallery-autoplay-progress i");


function resetAutoplayProgress() {

    if (
        !autoplayProgress
    ) {

        return;

    }


    autoplayProgress.style.transition =
        "none";


    autoplayProgress.style.width =
        "0%";


    void autoplayProgress.offsetWidth;


    if (
        autoplay
    ) {

        autoplayProgress.style.transition =
            "width 3.5s linear";


        autoplayProgress.style.width =
            "100%";

    }

}


function autoplayNext() {

    goGallery(

        galleryIndex >=
        galleryItems.length - 1
            ? 0
            : galleryIndex + 1

    );


    resetAutoplayProgress();

}


function startGalleryAutoplay() {

    if (
        autoplay ||
        !galleryItems.length
    ) {

        return;

    }


    autoplay =
        setInterval(
            autoplayNext,
            3500
        );


    if (
        autoplayButton
    ) {

        autoplayButton.textContent =
            "❚❚ Pausar";

    }


    resetAutoplayProgress();

}


function stopGalleryAutoplay() {

    if (
        autoplay
    ) {

        clearInterval(
            autoplay
        );

    }


    autoplay =
        null;


    if (
        autoplayButton
    ) {

        autoplayButton.textContent =
            "▶ Autoplay";

    }


    if (
        autoplayProgress
    ) {

        autoplayProgress.style.transition =
            "none";


        autoplayProgress.style.width =
            "0%";

    }

}


autoplayButton?.addEventListener(
    "click",
    () => {

        if (
            autoplay
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

const lightbox =
    $("#lightbox");


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
            image.src;


        lightboxImage.alt =
            image.alt ||
            "Dream Amor no Ar";

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
        !lightbox ||
        !galleryItems.length
    ) {

        return;

    }


    lightboxIndex =
        index;


    updateLightbox();


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
                    dragMoved
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


$("#lightboxNext")?.addEventListener(
    "click",
    nextLightbox
);


$("#lightboxPrev")?.addEventListener(
    "click",
    prevLightbox
);


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
            "#7c3aed",
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


/* =========================================================
   HEX PARA RGB
========================================================= */

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
                .split(
                    ""
                )
                .map(
                    char =>
                        char +
                        char
                )
                .join(
                    ""
                );

    }


    const value =
        parseInt(
            clean,
            16
        );


    return {

        r:
            value >> 16 & 255,

        g:
            value >> 8 & 255,

        b:
            value & 255

    };

}


/* =========================================================
   APLICAR CORES
========================================================= */

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
        hexToRgb(
            primary
        );


    const s =
        hexToRgb(
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


    const primaryInput =
        $("#primaryColor");


    const secondaryInput =
        $("#secondaryColor");


    if (
        primaryInput
    ) {

        primaryInput.value =
            primary;

    }


    if (
        secondaryInput
    ) {

        secondaryInput.value =
            secondary;

    }


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
   MOOD BUTTONS
========================================================= */

$$(
    ".mood-button"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                $$(
                    ".mood-button"
                ).forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                const mood =
                    moods[
                        button.dataset.mood
                    ];


                if (
                    mood
                ) {

                    applyColors(
                        ...mood
                    );

                }

            }
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


const results = {

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


let score =
    {};


function startQuiz() {

    quizIndex =
        0;


    score = {

        romantico: 0,
        sonhador: 0,
        energia: 0,
        calmo: 0

    };


    const start =
        $("#quizStart");


    const result =
        $("#quizResult");


    const questionsBox =
        $("#quizQuestions");


    if (
        start
    ) {

        start.hidden =
            true;

    }


    if (
        result
    ) {

        result.hidden =
            true;

    }


    if (
        questionsBox
    ) {

        questionsBox.hidden =
            false;

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


    const question =
        $("#quizQuestion");


    const step =
        $("#quizStep");


    const progress =
        $("#quizProgressBar");


    if (
        question
    ) {

        question.textContent =
            current.q;

    }


    if (
        step
    ) {

        step.textContent =
            `${quizIndex + 1} / ${questions.length}`;

    }


    if (
        progress
    ) {

        progress.style.width =
            `${
                (
                    quizIndex +
                    1
                ) /
                questions.length *
                100
            }%`;

    }


    const container =
        $("#quizOptions");


    if (
        !container
    ) {

        return;

    }


    container.innerHTML =
        "";


    current.answers.forEach(
        answer => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                answer[0];


            button.addEventListener(
                "click",
                () => {

                    score[
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


            container.appendChild(
                button
            );

        }
    );

}


function finishQuiz() {

    const questionsBox =
        $("#quizQuestions");


    const resultBox =
        $("#quizResult");


    if (
        questionsBox
    ) {

        questionsBox.hidden =
            true;

    }


    if (
        resultBox
    ) {

        resultBox.hidden =
            false;

    }


    const winner =
        Object.entries(
            score
        )
        .sort(
            (
                a,
                b
            ) =>
                b[1] -
                a[1]
        )[0]?.[0];


    if (
        !winner
    ) {

        return;

    }


    const result =
        results[
            winner
        ];


    const icon =
        $("#quizResultIcon");


    const title =
        $("#quizResultTitle");


    const text =
        $("#quizResultText");


    if (
        icon
    ) {

        icon.textContent =
            result[0];

    }


    if (
        title
    ) {

        title.textContent =
            result[1];

    }


    if (
        text
    ) {

        text.textContent =
            result[2];

    }


    const mood =
        moods[
            winner
        ];


    if (
        mood
    ) {

        applyColors(
            ...mood
        );

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
/* =========================================================
   DREAM STUDIO
========================================================= */

const settingsPanel =
    $("#settingsPanel");


const settingsButton =
    $("#settingsButton");


const closeSettingsButton =
    $("#closeSettings");


settingsButton?.addEventListener(
    "click",
    () => {

        settingsPanel?.classList.add(
            "open"
        );

    }
);


closeSettingsButton?.addEventListener(
    "click",
    () => {

        settingsPanel?.classList.remove(
            "open"
        );

    }
);


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


$$(
    ".palette"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                $$(
                    ".palette"
                ).forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                const palette =
                    palettes[
                        button.dataset.palette
                    ];


                if (
                    palette
                ) {

                    applyColors(
                        ...palette
                    );

                }

            }
        );

    }
);


/* =========================================================
   CORES PERSONALIZADAS
========================================================= */

$("#primaryColor")?.addEventListener(
    "input",
    event => {

        applyColors(

            event.target.value,

            $("#secondaryColor")?.value ||
            "#9562dc"

        );

    }
);


$("#secondaryColor")?.addEventListener(
    "input",
    event => {

        applyColors(

            $("#primaryColor")?.value ||
            "#df76a8",

            event.target.value

        );

    }
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


    const toggle =
        $("#darkToggle");


    const themeButton =
        $("#themeButton");


    if (
        toggle
    ) {

        toggle.checked =
            active;

    }


    if (
        themeButton
    ) {

        themeButton.textContent =
            active
                ? "☀"
                : "☾";

    }


    if (
        save
    ) {

        localStorage.setItem(
            "dreamDark",
            String(
                active
            )
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
   PARTÍCULAS
========================================================= */

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


    const symbols = [
        "♡",
        "✦",
        "·",
        "✿"
    ];


    for (
        let i = 0;
        i < 25;
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
   TOGGLE PARTÍCULAS
========================================================= */

$("#particlesToggle")?.addEventListener(
    "change",
    event => {

        body.classList.toggle(
            "no-particles",
            !event.target.checked
        );


        localStorage.setItem(
            "dreamParticles",
            String(
                event.target.checked
            )
        );

    }
);


/* =========================================================
   TOGGLE ANIMAÇÕES
========================================================= */

$("#animationsToggle")?.addEventListener(
    "change",
    event => {

        body.classList.toggle(
            "no-animations",
            !event.target.checked
        );


        localStorage.setItem(
            "dreamAnimations",
            String(
                event.target.checked
            )
        );

    }
);


/* =========================================================
   TOGGLE CURSOR
========================================================= */

$("#cursorToggle")?.addEventListener(
    "change",
    event => {

        body.classList.toggle(
            "no-cursor",
            !event.target.checked
        );


        localStorage.setItem(
            "dreamCursor",
            String(
                event.target.checked
            )
        );

    }
);


/* =========================================================
   GLASS EFFECT
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
            String(
                event.target.checked
            )
        );

    }
);


/* =========================================================
   CLEAN MODE
========================================================= */

const cleanToggle =
    $("#cleanModeToggle");


cleanToggle?.addEventListener(
    "change",
    event => {

        body.classList.toggle(
            "clean-mode",
            event.target.checked
        );


        localStorage.setItem(
            "dreamClean",
            String(
                event.target.checked
            )
        );

    }
);


/* =========================================================
   VELOCIDADE DAS ANIMAÇÕES
========================================================= */

const animationSpeed =
    $("#animationSpeed");


function setAnimationSpeed(
    value
) {

    const numeric =
        Number(
            value
        );


    if (
        !Number.isFinite(
            numeric
        )
    ) {

        return;

    }


    const safe =
        Math.max(
            40,
            Math.min(
                numeric,
                160
            )
        );


    const cssSpeed =
        safe /
        100;


    root.style.setProperty(
        "--animation-speed",
        cssSpeed
    );


    const label =
        $("#animationSpeedValue");


    if (
        label
    ) {

        label.textContent =
            `${Math.round(
                safe
            )}%`;

    }


    if (
        animationSpeed
    ) {

        animationSpeed.value =
            safe;

    }


    localStorage.setItem(
        "dreamAnimationSpeed",
        String(
            safe
        )
    );

}


animationSpeed?.addEventListener(
    "input",
    event => {

        setAnimationSpeed(
            event.target.value
        );

    }
);


/* =========================================================
   CONTRASTE
========================================================= */

const contrastRange =
    $("#contrastControl");


function setContrast(
    value
) {

    const numeric =
        Number(
            value
        );


    if (
        !Number.isFinite(
            numeric
        )
    ) {

        return;

    }


    const safePercent =
        Math.max(
            80,
            Math.min(
                numeric,
                130
            )
        );


    const safe =
        safePercent /
        100;


    root.style.setProperty(
        "--contrast-level",
        safe
    );


    body.style.filter =
        `contrast(${safe})`;


    const label =
        $("#contrastValue");


    if (
        label
    ) {

        label.textContent =
            `${Math.round(
                safePercent
            )}%`;

    }


    if (
        contrastRange
    ) {

        contrastRange.value =
            safePercent;

    }


    localStorage.setItem(
        "dreamContrast",
        String(
            safePercent
        )
    );

}


contrastRange?.addEventListener(
    "input",
    event => {

        setContrast(
            event.target.value
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

    body.classList.remove(
        "font-small",
        "font-normal",
        "font-large"
    );


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


    body.classList.add(
        `font-${safe}`
    );


    fontButtons.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.fontSize ===
                    safe
            );

        }
    );


    localStorage.setItem(
        "dreamFontSize",
        safe
    );

}


fontButtons.forEach(
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
   DREAM SCENE
========================================================= */

const scenes = {

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
                rgba(255, 111, 169, 0.40),
                transparent 38%
            ),
            radial-gradient(
                circle at 80% 40%,
                rgba(169, 92, 221, 0.30),
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
            "Um céu profundo, misterioso e cheio de possibilidades.",

        background:
            `
            radial-gradient(
                circle at 25% 25%,
                rgba(111, 95, 255, 0.30),
                transparent 35%
            ),
            radial-gradient(
                circle at 75% 60%,
                rgba(73, 133, 255, 0.24),
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

        mini:
            "FLORAL DREAM",

        title:
            "Flores no ar.",

        text:
            "Um universo floral delicado, luminoso e romântico.",

        background:
            `
            radial-gradient(
                circle at 25% 65%,
                rgba(223, 118, 168, 0.38),
                transparent 36%
            ),
            radial-gradient(
                circle at 78% 30%,
                rgba(255, 190, 214, 0.30),
                transparent 42%
            ),
            linear-gradient(
                135deg,
                #1c1019,
                #39202f
            )
            `

    },


    energia: {

        icon:
            "✦",

        mini:
            "DREAM ENERGY",

        title:
            "Sinta a energia.",

        text:
            "Vibrante, intensa e cheia de personalidade.",

        background:
            `
            radial-gradient(
                circle at 20% 65%,
                rgba(251, 113, 133, 0.30),
                transparent 35%
            ),
            radial-gradient(
                circle at 80% 30%,
                rgba(245, 158, 11, 0.25),
                transparent 40%
            ),
            linear-gradient(
                135deg,
                #1a1018,
                #35211c
            )
            `

    }

};


const dreamSceneBg =
    $(".dream-scene-bg");


$$(
    ".scene-button"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const scene =
                    scenes[
                        button.dataset.scene
                    ];


                if (
                    !scene
                ) {

                    return;

                }


                $$(
                    ".scene-button"
                ).forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                if (
                    dreamSceneBg
                ) {

                    dreamSceneBg.style.background =
                        scene.background;

                }


                const icon =
                    $("#sceneResultIcon");


                const mini =
                    $("#sceneResultMini");


                const title =
                    $("#sceneResultTitle");


                const text =
                    $("#sceneResultText");


                if (
                    icon
                ) {

                    icon.textContent =
                        scene.icon;

                }


                if (
                    mini
                ) {

                    mini.textContent =
                        scene.mini;

                }


                if (
                    title
                ) {

                    title.textContent =
                        scene.title;

                }


                if (
                    text
                ) {

                    text.textContent =
                        scene.text;

                }

            }
        );

    }
);


/* =========================================================
   MOMENT CARDS
========================================================= */

$$(
    ".moment-card"
).forEach(
    card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
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
                    7;


                const rotateY =
                    (
                        x -
                        0.5
                    ) *
                    7;


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
            ${String(number).padStart(2, "0")}
        </span>

        ${label}
        `;

}


/* =========================================================
   MODAL BODY STATE
========================================================= */

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
   RESET DREAM STUDIO
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
            "font-small",
            "font-large"
        );


        body.classList.add(
            "font-normal"
        );


        const particlesToggle =
            $("#particlesToggle");


        const animationsToggle =
            $("#animationsToggle");


        const cursorToggle =
            $("#cursorToggle");


        const glass =
            $("#glassToggle");


        const clean =
            $("#cleanModeToggle");


        if (
            particlesToggle
        ) {

            particlesToggle.checked =
                true;

        }


        if (
            animationsToggle
        ) {

            animationsToggle.checked =
                true;

        }


        if (
            cursorToggle
        ) {

            cursorToggle.checked =
                true;

        }


        if (
            glass
        ) {

            glass.checked =
                true;

        }


        if (
            clean
        ) {

            clean.checked =
                false;

        }


        setAnimationSpeed(
            100
        );


        setContrast(
            100
        );


        setFontSize(
            "normal"
        );


        localStorage.removeItem(
            "dreamParticles"
        );


        localStorage.removeItem(
            "dreamAnimations"
        );


        localStorage.removeItem(
            "dreamCursor"
        );


        localStorage.removeItem(
            "dreamGlass"
        );


        localStorage.removeItem(
            "dreamClean"
        );


        localStorage.removeItem(
            "dreamAnimationSpeed"
        );


        localStorage.removeItem(
            "dreamContrast"
        );


        localStorage.removeItem(
            "dreamFontSize"
        );


        showToast(
            "Configurações restauradas ♡"
        );

    }
);
/* =========================================================
   CARREGAR CONFIGURAÇÕES
========================================================= */

function loadSettings() {

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


    applyColors(
        savedPrimary,
        savedSecondary,
        false
    );


    const dark =
        localStorage.getItem(
            "dreamDark"
        ) ===
        "true";


    setDark(
        dark,
        false
    );


    /* =====================================================
       PARTÍCULAS
    ===================================================== */

    const particles =
        localStorage.getItem(
            "dreamParticles"
        );


    const particlesEnabled =
        particles ===
        null
            ? true
            : particles ===
                "true";


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


    /* =====================================================
       ANIMAÇÕES
    ===================================================== */

    const animations =
        localStorage.getItem(
            "dreamAnimations"
        );


    const animationsEnabled =
        animations ===
        null
            ? true
            : animations ===
                "true";


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


    /* =====================================================
       CURSOR
    ===================================================== */

    const cursor =
        localStorage.getItem(
            "dreamCursor"
        );


    const cursorEnabled =
        cursor ===
        null
            ? true
            : cursor ===
                "true";


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


    /* =====================================================
       GLASS
    ===================================================== */

    const glass =
        localStorage.getItem(
            "dreamGlass"
        );


    const glassEnabled =
        glass ===
        null
            ? true
            : glass ===
                "true";


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


    /* =====================================================
       CLEAN MODE
    ===================================================== */

    const clean =
        localStorage.getItem(
            "dreamClean"
        ) ===
        "true";


    body.classList.toggle(
        "clean-mode",
        clean
    );


    if (
        $("#cleanModeToggle")
    ) {

        $("#cleanModeToggle").checked =
            clean;

    }


    /* =====================================================
       VELOCIDADE
    ===================================================== */

    const speed =
        Number(
            localStorage.getItem(
                "dreamAnimationSpeed"
            ) ||
            100
        );


    setAnimationSpeed(
        speed
    );


    /* =====================================================
       CONTRASTE
    ===================================================== */

    const contrast =
        Number(
            localStorage.getItem(
                "dreamContrast"
            ) ||
            100
        );


    setContrast(
        contrast
    );


    /* =====================================================
       FONTE
    ===================================================== */

    const fontSize =
        localStorage.getItem(
            "dreamFontSize"
        ) ||
        "normal";


    setFontSize(
        fontSize
    );

}


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


        const lightboxOpen =
            lightbox?.classList.contains(
                "open"
            );


        if (
            event.key ===
            "Escape"
        ) {

            closeProduct();


            closeNote();


            closeLightbox();


            settingsPanel?.classList.remove(
                "open"
            );


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
            lightboxOpen &&
            event.key ===
            "ArrowRight"
        ) {

            nextLightbox();


            return;

        }


        if (
            lightboxOpen &&
            event.key ===
            "ArrowLeft"
        ) {

            prevLightbox();


            return;

        }


        if (
            !lightboxOpen &&
            event.key ===
            "ArrowRight"
        ) {

            goGallery(

                Math.min(
                    galleryIndex + 1,
                    galleryItems.length - 1
                )

            );


            return;

        }


        if (
            !lightboxOpen &&
            event.key ===
            "ArrowLeft"
        ) {

            goGallery(

                Math.max(
                    galleryIndex - 1,
                    0
                )

            );


            return;

        }


        if (
            event.key.toLowerCase() ===
            "d"
        ) {

            $("#themeButton")?.click();


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
            "g"
        ) {

            settingsPanel?.classList.toggle(
                "open"
            );

        }

    }
);


/* =========================================================
   VISIBILIDADE DA PÁGINA
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            autoplay
        ) {

            clearInterval(
                autoplay
            );


            autoplay =
                null;


            if (
                autoplayButton
            ) {

                autoplayButton.textContent =
                    "▶ Autoplay";

            }


            if (
                autoplayProgress
            ) {

                autoplayProgress.style.transition =
                    "none";


                autoplayProgress.style.width =
                    "0%";

            }

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
   SMOOTH LINKS
========================================================= */

$$(
    'a[href^="#"]'
).forEach(
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


                const headerOffset =
                    header?.offsetHeight ||
                    0;


                const position =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerOffset -
                    15;


                window.scrollTo({

                    top:
                        position,

                    behavior:
                        "smooth"

                });

            }
        );

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

loadSettings();


updateTimeline();


updateGalleryUI();


updateSectionIndicator();


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cDream ♡ Amor no Ar",
    `
    color:#df76a8;
    font-size:22px;
    font-weight:900;
    `
);


console.log(
    "%cDream Update 3.0 carregado com sucesso ✦",
    `
    color:#9562dc;
    font-size:12px;
    font-weight:700;
    `
);


/* =========================================================
   FIM • DREAM UPDATE 3.0
========================================================= */