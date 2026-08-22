"use strict";


/* =========================================================
   =========================================================
   DREAM • AMOR NO AR
   SCRIPT COMPLETO
   =========================================================
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


const sectionIndicator =
    $("#sectionIndicator");


const cursorGlow =
    $("#cursorGlow");


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

let toastTimer =
    null;


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
   SEÇÃO ATIVA
========================================================= */

const sections =
    $$(".section-track");


const menuLinks =
    $$(".menu a");


function updateActiveSection() {

    if (
        !sections.length
    ) {

        return;

    }


    let current =
        sections[0];


    sections.forEach(
        section => {

            const rect =
                section.getBoundingClientRect();


            if (
                rect.top <= 220
            ) {

                current =
                    section;

            }

        }
    );


    const currentId =
        current.id;


    menuLinks.forEach(
        link => {

            link.classList.toggle(

                "active",

                link.getAttribute(
                    "href"
                ) ===
                `#${currentId}`

            );

        }
    );


    if (
        sectionIndicator
    ) {

        const index =
            sections.indexOf(
                current
            ) + 1;


        const name =
            current.dataset.sectionName ||
            currentId;


        sectionIndicator.innerHTML = `

            <span>
                ${
                    String(index)
                        .padStart(
                            2,
                            "0"
                        )
                }
            </span>

            ${name}

        `;

    }

}


window.addEventListener(
    "scroll",
    updateActiveSection,
    {
        passive: true
    }
);


updateActiveSection();


/* =========================================================
   REVEAL
========================================================= */

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

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


$$(
    ".reveal"
).forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   METERS
========================================================= */

const meterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const value =
                            entry.target.dataset.meter ||
                            0;


                        entry.target.style.width =
                            `${value}%`;

                    }

                }
            );

        },

        {
            threshold: 0.35
        }

    );


$$(
    "[data-meter]"
).forEach(
    meter => {

        meterObserver.observe(
            meter
        );

    }
);


/* =========================================================
   CURSOR GLOW
========================================================= */

document.addEventListener(
    "mousemove",
    event => {

        if (
            !cursorGlow
        ) {

            return;

        }


        if (
            body.classList.contains(
                "no-cursor"
            )
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
   HERO
========================================================= */

const heroProduct =
    $("#heroProduct");


const mainBottle =
    $("#mainBottle");


const productHalo =
    $("#productHalo");


const productLight =
    $("#productLight");


let motionIntensity =
    60;


/* =========================================================
   MOVIMENTO 3D DO FRASCO
========================================================= */

heroProduct?.addEventListener(
    "mousemove",
    event => {

        if (
            !mainBottle
        ) {

            return;

        }


        if (
            body.classList.contains(
                "no-animations"
            )
        ) {

            return;

        }


        if (
            heroProduct.classList.contains(
                "spraying"
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
            rect.width -
            0.5;


        const y =
            (
                event.clientY -
                rect.top
            ) /
            rect.height -
            0.5;


        const power =
            motionIntensity /
            100;


        const moveX =
            x *
            22 *
            power;


        const moveY =
            y *
            14 *
            power;


        const rotateY =
            x *
            18 *
            power;


        const rotateX =
            y *
            -13 *
            power;


        mainBottle.style.transform = `

            translate3d(
                ${moveX}px,
                ${moveY}px,
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
                    ${x * -28 * power}px,
                    ${y * -24 * power}px
                )

            `;

        }


        if (
            productLight
        ) {

            productLight.style.transform = `

                translate(
                    ${x * 55 * power}px,
                    ${y * 38 * power}px
                )

            `;

        }

    }
);


/* =========================================================
   RESET 3D
========================================================= */

heroProduct?.addEventListener(
    "mouseleave",
    () => {

        if (
            mainBottle &&
            !heroProduct.classList.contains(
                "spraying"
            )
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
            productLight
        ) {

            productLight.style.transform =
                "";

        }

    }
);


/* =========================================================
   BORRIFADOR PREMIUM 2.0
========================================================= */

const sprayButton =
    $("#sprayButton");


const sprayArea =
    $("#sprayArea");


const sprayWave =
    $("#sprayWave");


const sprayGlow =
    $("#sprayGlow");


let spraying =
    false;


/* =========================================================
   CRIAR NÉVOA
========================================================= */

function createMist() {

    if (
        !sprayArea
    ) {

        return;

    }


    const mist =
        document.createElement(
            "span"
        );


    mist.className =
        "dream-mist";


    const x =
        (
            Math.random() -
            0.5
        ) *
        430;


    const y =
        -40 -
        Math.random() *
        300;


    const size =
        3 +
        Math.random() *
        12;


    const blur =
        Math.random() *
        3;


    const duration =
        0.85 +
        Math.random() *
        0.85;


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


/* =========================================================
   CRIAR SÍMBOLO
========================================================= */

function createSpraySymbol() {

    if (
        !sprayArea
    ) {

        return;

    }


    const symbols = [

        "♡",

        "✦",

        "✧",

        "♡",

        "✦"

    ];


    const symbol =
        document.createElement(
            "span"
        );


    symbol.className =
        "dream-spray-symbol";


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
            390
        }px`
    );


    symbol.style.setProperty(
        "--symbol-y",
        `${
            -70 -
            Math.random() *
            270
        }px`
    );


    symbol.style.setProperty(
        "--symbol-rotate",
        `${
            (
                Math.random() -
                0.5
            ) *
            500
        }deg`
    );


    symbol.style.setProperty(
        "--symbol-size",
        `${
            10 +
            Math.random() *
            14
        }px`
    );


    symbol.style.animationDelay =
        `${
            Math.random() *
            0.15
        }s`;


    sprayArea.appendChild(
        symbol
    );


    setTimeout(
        () => {

            symbol.remove();

        },
        1900
    );

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


    spraying =
        true;


    heroProduct?.classList.add(
        "spraying"
    );


    sprayWave?.classList.remove(
        "active"
    );


    sprayGlow?.classList.remove(
        "active"
    );


    if (
        sprayWave
    ) {

        void sprayWave.offsetWidth;

    }


    if (
        sprayGlow
    ) {

        void sprayGlow.offsetWidth;

    }


    sprayWave?.classList.add(
        "active"
    );


    sprayGlow?.classList.add(
        "active"
    );


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        createMist();

    }


    for (
        let i = 0;
        i < 15;
        i++
    ) {

        createSpraySymbol();

    }


    showToast(
        "Dream está no ar ♡"
    );


    setTimeout(
        () => {

            sprayWave?.classList.remove(
                "active"
            );


            sprayGlow?.classList.remove(
                "active"
            );


            heroProduct?.classList.remove(
                "spraying"
            );


            if (
                mainBottle
            ) {

                mainBottle.style.transform =
                    "";

            }


            spraying =
                false;

        },
        1100
    );

}


sprayButton?.addEventListener(
    "click",
    sprayDream
);


/* =========================================================
   MODAL DO PRODUTO
========================================================= */

const productModal =
    $("#productModal");


function openProductModal() {

    if (
        !productModal
    ) {

        return;

    }


    productModal.classList.add(
        "open"
    );


    productModal.setAttribute(
        "aria-hidden",
        "false"
    );


    body.classList.add(
        "modal-open"
    );

}


function closeProductModal() {

    if (
        !productModal
    ) {

        return;

    }


    productModal.classList.remove(
        "open"
    );


    productModal.setAttribute(
        "aria-hidden",
        "true"
    );


    body.classList.remove(
        "modal-open"
    );

}


$$(
    ".open-product"
).forEach(
    button => {

        button.addEventListener(
            "click",
            openProductModal
        );

    }
);


$$(
    ".close-product"
).forEach(
    button => {

        button.addEventListener(
            "click",
            closeProductModal
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


function updateFavoriteButtons() {

    favoriteButtons.forEach(
        button => {

            button.textContent =
                favorite
                    ? "♥ Favoritado"
                    : "♡ Favoritar";

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


                updateFavoriteButtons();


                showToast(

                    favorite
                        ? "Adicionado aos favoritos ♡"
                        : "Removido dos favoritos"

                );

            }
        );

    }
);


updateFavoriteButtons();


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
                    window.location.href

            });


            return;

        }


        if (
            navigator.clipboard
        ) {

            await navigator.clipboard.writeText(
                window.location.href
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
   NOTAS OLFATIVAS
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

        "Traz brilho e frescor para a fragrância."

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

        "Floral romântico, delicado e clássico."

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


/* =========================================================
   MODAL DAS NOTAS
========================================================= */

const noteModal =
    $("#noteModal");


const noteModalIcon =
    $("#noteModalIcon");


const noteModalTitle =
    $("#noteModalTitle");


const noteModalText =
    $("#noteModalText");


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


                if (
                    noteModalIcon
                ) {

                    noteModalIcon.textContent =
                        note[0];

                }


                if (
                    noteModalTitle
                ) {

                    noteModalTitle.textContent =
                        note[1];

                }


                if (
                    noteModalText
                ) {

                    noteModalText.textContent =
                        note[2];

                }


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

            }
        );

    }
);


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


$$(
    ".close-note"
).forEach(
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


const timelineStages = [

    {

        max:
            1,

        icon:
            "🍊",

        title:
            "Abertura fresca",

        text:
            "Cítricos e frutas aparecem primeiro."

    },


    {

        max:
            3,

        icon:
            "🌸",

        title:
            "Coração floral",

        text:
            "As flores assumem o centro da fragrância."

    },


    {

        max:
            5,

        icon:
            "♡",

        title:
            "Romântico e confortável",

        text:
            "O floral fica mais macio e envolvente."

    },


    {

        max:
            8,

        icon:
            "✨",

        title:
            "Fundo aconchegante",

        text:
            "Madeiras e notas doces permanecem."

    }

];


function updateTimeline() {

    if (
        !timelineSlider
    ) {

        return;

    }


    const value =
        Number(
            timelineSlider.value
        );


    if (
        timelineHour
    ) {

        timelineHour.textContent =
            `${value}h`;

    }


    const stage =
        timelineStages.find(
            item =>
                value <=
                item.max
        ) ||
        timelineStages[
            timelineStages.length -
            1
        ];


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
   =========================================================
   GALERIA PREMIUM
   =========================================================
   ========================================================= */

const galleryTrack =
    $("#galleryTrack");


const galleryItems =
    $$(".gallery-item");


const galleryPrev =
    $("#galleryPrev");


const galleryNext =
    $("#galleryNext");


const galleryDots =
    $("#galleryDots");


const galleryCurrent =
    $("#galleryCurrent");


const galleryTotal =
    $("#galleryTotal");


const galleryAutoplay =
    $("#galleryAutoplay");


let galleryIndex =
    0;


let galleryTimer =
    null;


let dragging =
    false;


let dragMoved =
    false;


let dragStartX =
    0;


let dragStartScroll =
    0;


/* =========================================================
   ATUALIZAR UI DA GALERIA
========================================================= */

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


/* =========================================================
   CRIAR DOTS
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


    updateGalleryUI();

}


/* =========================================================
   IR PARA SLIDE
========================================================= */

function goGallery(
    index
) {

    if (
        !galleryTrack ||
        !galleryItems.length
    ) {

        return;

    }


    if (
        index < 0
    ) {

        index =
            galleryItems.length -
            1;

    }


    if (
        index >=
        galleryItems.length
    ) {

        index =
            0;

    }


    galleryIndex =
        index;


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


/* =========================================================
   SETAS DA GALERIA
========================================================= */

galleryNext?.addEventListener(
    "click",
    () => {

        goGallery(
            galleryIndex + 1
        );

    }
);


galleryPrev?.addEventListener(
    "click",
    () => {

        goGallery(
            galleryIndex - 1
        );

    }
);


/* =========================================================
   DETECTAR SLIDE ATUAL
========================================================= */

function detectGallerySlide() {

    if (
        !galleryTrack
    ) {

        return;

    }


    const center =
        galleryTrack.scrollLeft +
        galleryTrack.clientWidth /
        2;


    let nearestIndex =
        0;


    let nearestDistance =
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
                nearestDistance
            ) {

                nearestDistance =
                    distance;


                nearestIndex =
                    index;

            }

        }
    );


    galleryIndex =
        nearestIndex;


    updateGalleryUI();

}


galleryTrack?.addEventListener(
    "scroll",
    detectGallerySlide,
    {
        passive: true
    }
);


/* =========================================================
   ARRASTAR GALERIA
========================================================= */

galleryTrack?.addEventListener(
    "mousedown",
    event => {

        dragging =
            true;


        dragMoved =
            false;


        dragStartX =
            event.pageX;


        dragStartScroll =
            galleryTrack.scrollLeft;


        galleryTrack.classList.add(
            "dragging"
        );

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


        event.preventDefault();


        const distance =
            event.pageX -
            dragStartX;


        if (
            Math.abs(
                distance
            ) >
            5
        ) {

            dragMoved =
                true;

        }


        galleryTrack.scrollLeft =
            dragStartScroll -
            distance;

    }
);


function stopGalleryDragging() {

    if (
        !dragging
    ) {

        return;

    }


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
        80
    );

}


window.addEventListener(
    "mouseup",
    stopGalleryDragging
);


galleryTrack?.addEventListener(
    "mouseleave",
    stopGalleryDragging
);


/* =========================================================
   AUTOPLAY
========================================================= */

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


    if (
        galleryAutoplay
    ) {

        galleryAutoplay.textContent =
            "▶ Autoplay";

    }

}


function startGalleryAutoplay() {

    stopGalleryAutoplay();


    galleryTimer =
        setInterval(
            () => {

                goGallery(
                    galleryIndex +
                    1
                );

            },
            3500
        );


    if (
        galleryAutoplay
    ) {

        galleryAutoplay.textContent =
            "❚❚ Pausar";

    }

}


galleryAutoplay?.addEventListener(
    "click",
    () => {

        if (
            galleryTimer
        ) {

            stopGalleryAutoplay();


            showToast(
                "Autoplay pausado"
            );

        } else {

            startGalleryAutoplay();


            showToast(
                "Autoplay ativado"
            );

        }

    }
);


/* =========================================================
   PAUSAR AUTOPLAY AO INTERAGIR
========================================================= */

galleryTrack?.addEventListener(
    "mouseenter",
    () => {

        if (
            galleryTimer
        ) {

            clearInterval(
                galleryTimer
            );

        }

    }
);


galleryTrack?.addEventListener(
    "mouseleave",
    () => {

        if (
            galleryTimer
        ) {

            galleryTimer =
                setInterval(
                    () => {

                        goGallery(
                            galleryIndex +
                            1
                        );

                    },
                    3500
                );

        }

    }
);


/* =========================================================
   LIGHTBOX PREMIUM
========================================================= */

const lightbox =
    $("#lightbox");


const lightboxImage =
    $("#lightboxImage");


const lightboxTitle =
    $("#lightboxTitle");


const lightboxCounter =
    $("#lightboxCounter");


const lightboxPrev =
    $("#lightboxPrev");


const lightboxNext =
    $("#lightboxNext");


const lightboxClose =
    $("#lightboxClose");


const lightboxBackdrop =
    $("#lightboxBackdrop");


let lightboxIndex =
    0;


/* =========================================================
   ATUALIZAR LIGHTBOX
========================================================= */

function updateLightbox() {

    if (
        !galleryItems.length ||
        !lightboxImage
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


    if (
        !image
    ) {

        return;

    }


    lightboxImage.classList.add(
        "lightbox-image-changing"
    );


    setTimeout(
        () => {

            lightboxImage.src =
                image.src;


            lightboxImage.alt =
                image.alt;


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
                        )
                        .padStart(
                            2,
                            "0"
                        )
                    } / ${
                        String(
                            galleryItems.length
                        )
                        .padStart(
                            2,
                            "0"
                        )
                    }`;

            }


            lightboxImage.classList.remove(
                "lightbox-image-changing"
            );

        },
        120
    );

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


    lightbox.classList.add(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
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


    lightbox?.setAttribute(
        "aria-hidden",
        "true"
    );


    body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   PRÓXIMA IMAGEM
========================================================= */

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


/* =========================================================
   IMAGEM ANTERIOR
========================================================= */

function previousLightbox() {

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


/* =========================================================
   ABRIR AO CLICAR NA GALERIA
========================================================= */

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


/* =========================================================
   BOTÕES LIGHTBOX
========================================================= */

lightboxNext?.addEventListener(
    "click",
    nextLightbox
);


lightboxPrev?.addEventListener(
    "click",
    previousLightbox
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
   CRIAR GALERIA
========================================================= */

createGalleryDots();


/* =========================================================
   CORES
========================================================= */

function hexToRgb(
    hex
) {

    let value =
        hex.replace(
            "#",
            ""
        );


    if (
        value.length ===
        3
    ) {

        value =
            value
                .split("")
                .map(
                    character =>
                        character +
                        character
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


    const primaryRgb =
        hexToRgb(
            primary
        );


    const secondaryRgb =
        hexToRgb(
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


    const primaryColor =
        $("#primaryColor");


    const secondaryColor =
        $("#secondaryColor");


    if (
        primaryColor
    ) {

        primaryColor.value =
            primary;

    }


    if (
        secondaryColor
    ) {

        secondaryColor.value =
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
   MOODS
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


$$(
    ".mood-button"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const mood =
                    moods[
                        button.dataset.mood
                    ];


                if (
                    !mood
                ) {

                    return;

                }


                $$(
                    ".mood-button"
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


                applyColors(
                    mood[0],
                    mood[1]
                );


                showToast(
                    `Mood ${button.textContent.trim()} ativado`
                );

            }
        );

    }
);


/* =========================================================
   =========================================================
   QUIZ
   =========================================================
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

        question:
            "Escolha uma sensação.",

        options: [

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

        question:
            "Escolha um símbolo.",

        options: [

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

        question:
            "Escolha seu cenário Dream.",

        options: [

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

    romantico: {

        icon:
            "♡",

        title:
            "Dream Lover",

        text:
            "Romântico, delicado e apaixonado pelos pequenos detalhes."

    },


    sonhador: {

        icon:
            "☾",

        title:
            "Dreamer",

        text:
            "Você gosta de imaginar e transformar momentos em lembranças."

    },


    energia: {

        icon:
            "✦",

        title:
            "Dream Energy",

        text:
            "Uma personalidade vibrante e cheia de energia."

    },


    calmo: {

        icon:
            "☁",

        title:
            "Soft Dream",

        text:
            "Você valoriza conforto, tranquilidade e leveza."

    }

};


let quizIndex =
    0;


let quizScore =
    {};


/* =========================================================
   COMEÇAR QUIZ
========================================================= */

function startQuiz() {

    quizIndex =
        0;


    quizScore = {

        romantico:
            0,

        sonhador:
            0,

        energia:
            0,

        calmo:
            0

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


/* =========================================================
   RENDERIZAR QUIZ
========================================================= */

function renderQuiz() {

    const current =
        quizData[
            quizIndex
        ];


    if (
        !current ||
        !quizQuestion ||
        !quizOptions
    ) {

        return;

    }


    quizQuestion.textContent =
        current.question;


    if (
        quizStep
    ) {

        quizStep.textContent =
            `${
                quizIndex + 1
            } / ${
                quizData.length
            }`;

    }


    if (
        quizProgressBar
    ) {

        quizProgressBar.style.width =
            `${
                (
                    quizIndex +
                    1
                ) /
                quizData.length *
                100
            }%`;

    }


    quizOptions.innerHTML =
        "";


    current.options.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                option[0];


            button.addEventListener(
                "click",
                () => {

                    quizScore[
                        option[1]
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

        }
    );

}


/* =========================================================
   FINALIZAR QUIZ
========================================================= */

function finishQuiz() {

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


    const winner =
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
        )[0][0];


    const result =
        quizResults[
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
            result.icon;

    }


    if (
        title
    ) {

        title.textContent =
            result.title;

    }


    if (
        text
    ) {

        text.textContent =
            result.text;

    }


    showToast(
        `Seu perfil: ${result.title} ♡`
    );

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
   =========================================================
   DREAM STUDIO
   =========================================================
   ========================================================= */

const settingsPanel =
    $("#settingsPanel");


const settingsButton =
    $("#settingsButton");


const closeSettings =
    $("#closeSettings");


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

                const palette =
                    palettes[
                        button.dataset.palette
                    ];


                if (
                    !palette
                ) {

                    return;

                }


                $$(
                    ".palette"
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


                applyColors(
                    palette[0],
                    palette[1]
                );


                showToast(
                    `Paleta ${button.textContent.trim()} ativada`
                );

            }
        );

    }
);


/* =========================================================
   CORES MANUAIS
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

const themeButton =
    $("#themeButton");


const darkToggle =
    $("#darkToggle");


function setDark(
    active,
    save = true
) {

    body.classList.toggle(
        "dark",
        active
    );


    if (
        darkToggle
    ) {

        darkToggle.checked =
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


darkToggle?.addEventListener(
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

const particlesContainer =
    $("#particles");


let particleIntensity =
    60;


function generateParticles() {

    if (
        !particlesContainer
    ) {

        return;

    }


    particlesContainer.innerHTML =
        "";


    const quantity =
        Math.max(

            5,

            Math.round(
                particleIntensity /
                2.5
            )

        );


    const symbols = [

        "♡",

        "✦",

        "·",

        "✿"

    ];


    for (
        let i = 0;
        i < quantity;
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


        particlesContainer.appendChild(
            particle
        );

    }

}


/* =========================================================
   SWITCHES
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


animationsToggle?.addEventListener(
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


cursorToggle?.addEventListener(
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
   CONTROLES DE INTENSIDADE
========================================================= */

const particleIntensityInput =
    $("#particleIntensity");


const particleIntensityValue =
    $("#particleIntensityValue");


const motionIntensityInput =
    $("#motionIntensity");


const motionIntensityValue =
    $("#motionIntensityValue");


const glowIntensityInput =
    $("#glowIntensity");


const glowIntensityValue =
    $("#glowIntensityValue");


/* =========================================================
   INTENSIDADE DAS PARTÍCULAS
========================================================= */

particleIntensityInput?.addEventListener(
    "input",
    event => {

        particleIntensity =
            Number(
                event.target.value
            );


        if (
            particleIntensityValue
        ) {

            particleIntensityValue.textContent =
                `${particleIntensity}%`;

        }


        localStorage.setItem(
            "dreamParticleIntensity",
            String(
                particleIntensity
            )
        );


        generateParticles();

    }
);


/* =========================================================
   INTENSIDADE 3D
========================================================= */

motionIntensityInput?.addEventListener(
    "input",
    event => {

        motionIntensity =
            Number(
                event.target.value
            );


        if (
            motionIntensityValue
        ) {

            motionIntensityValue.textContent =
                `${motionIntensity}%`;

        }


        root.style.setProperty(
            "--dream-motion",
            motionIntensity /
            100
        );


        localStorage.setItem(
            "dreamMotionIntensity",
            String(
                motionIntensity
            )
        );

    }
);


/* =========================================================
   INTENSIDADE DO GLOW
========================================================= */

glowIntensityInput?.addEventListener(
    "input",
    event => {

        const value =
            Number(
                event.target.value
            );


        if (
            glowIntensityValue
        ) {

            glowIntensityValue.textContent =
                `${value}%`;

        }


        root.style.setProperty(
            "--dream-glow",
            value /
            100
        );


        if (
            cursorGlow
        ) {

            cursorGlow.style.opacity =
                String(
                    Math.max(
                        0,
                        Math.min(
                            1,
                            value /
                            180
                        )
                    )
                );

        }


        localStorage.setItem(
            "dreamGlowIntensity",
            String(
                value
            )
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

    body.classList.remove(

        "font-small",

        "font-normal",

        "font-large"

    );


    body.classList.add(
        `font-${size}`
    );


    $$(
        "[data-font-size]"
    ).forEach(
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

        localStorage.setItem(
            "dreamFont",
            size
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
   CARREGAR CONFIGURAÇÕES
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

        applyColors(

            savedPrimary,

            savedSecondary,

            false

        );

    }


    const savedDark =
        localStorage.getItem(
            "dreamDark"
        );


    setDark(

        savedDark ===
        "true",

        false

    );


    const savedFont =
        localStorage.getItem(
            "dreamFont"
        ) ||
        "normal";


    setFontSize(
        savedFont,
        false
    );


    const savedParticles =
        localStorage.getItem(
            "dreamParticles"
        );


    if (
        savedParticles !==
        null &&
        particlesToggle
    ) {

        const enabled =
            savedParticles ===
            "true";


        particlesToggle.checked =
            enabled;


        body.classList.toggle(
            "no-particles",
            !enabled
        );

    }


    const savedAnimations =
        localStorage.getItem(
            "dreamAnimations"
        );


    if (
        savedAnimations !==
        null &&
        animationsToggle
    ) {

        const enabled =
            savedAnimations ===
            "true";


        animationsToggle.checked =
            enabled;


        body.classList.toggle(
            "no-animations",
            !enabled
        );

    }


    const savedGlass =
        localStorage.getItem(
            "dreamGlass"
        );


    if (
        savedGlass !==
        null &&
        glassToggle
    ) {

        const enabled =
            savedGlass ===
            "true";


        glassToggle.checked =
            enabled;


        body.classList.toggle(
            "no-glass",
            !enabled
        );

    }


    const savedCursor =
        localStorage.getItem(
            "dreamCursor"
        );


    if (
        savedCursor !==
        null &&
        cursorToggle
    ) {

        const enabled =
            savedCursor ===
            "true";


        cursorToggle.checked =
            enabled;


        body.classList.toggle(
            "no-cursor",
            !enabled
        );

    }


    particleIntensity =
        Number(
            localStorage.getItem(
                "dreamParticleIntensity"
            ) ||
            60
        );


    motionIntensity =
        Number(
            localStorage.getItem(
                "dreamMotionIntensity"
            ) ||
            60
        );


    const glowIntensity =
        Number(
            localStorage.getItem(
                "dreamGlowIntensity"
            ) ||
            60
        );


    if (
        particleIntensityInput
    ) {

        particleIntensityInput.value =
            particleIntensity;

    }


    if (
        particleIntensityValue
    ) {

        particleIntensityValue.textContent =
            `${particleIntensity}%`;

    }


    if (
        motionIntensityInput
    ) {

        motionIntensityInput.value =
            motionIntensity;

    }


    if (
        motionIntensityValue
    ) {

        motionIntensityValue.textContent =
            `${motionIntensity}%`;

    }


    if (
        glowIntensityInput
    ) {

        glowIntensityInput.value =
            glowIntensity;

    }


    if (
        glowIntensityValue
    ) {

        glowIntensityValue.textContent =
            `${glowIntensity}%`;

    }


    root.style.setProperty(
        "--dream-motion",
        motionIntensity /
        100
    );


    root.style.setProperty(
        "--dream-glow",
        glowIntensity /
        100
    );


    if (
        cursorGlow
    ) {

        cursorGlow.style.opacity =
            String(
                glowIntensity /
                180
            );

    }


    generateParticles();

}


loadSettings();


/* =========================================================
   RESET DAS CONFIGURAÇÕES
========================================================= */

$("#resetSettings")?.addEventListener(
    "click",
    () => {

        const keys = [

            "dreamPrimary",

            "dreamSecondary",

            "dreamDark",

            "dreamFont",

            "dreamParticles",

            "dreamAnimations",

            "dreamGlass",

            "dreamCursor",

            "dreamParticleIntensity",

            "dreamMotionIntensity",

            "dreamGlowIntensity"

        ];


        keys.forEach(
            key => {

                localStorage.removeItem(
                    key
                );

            }
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


        setFontSize(
            "normal",
            false
        );


        particleIntensity =
            60;


        motionIntensity =
            60;


        if (
            particleIntensityInput
        ) {

            particleIntensityInput.value =
                60;

        }


        if (
            motionIntensityInput
        ) {

            motionIntensityInput.value =
                60;

        }


        if (
            glowIntensityInput
        ) {

            glowIntensityInput.value =
                60;

        }


        if (
            particleIntensityValue
        ) {

            particleIntensityValue.textContent =
                "60%";

        }


        if (
            motionIntensityValue
        ) {

            motionIntensityValue.textContent =
                "60%";

        }


        if (
            glowIntensityValue
        ) {

            glowIntensityValue.textContent =
                "60%";

        }


        root.style.setProperty(
            "--dream-motion",
            "0.60"
        );


        root.style.setProperty(
            "--dream-glow",
            "0.60"
        );


        body.classList.remove(

            "no-particles",

            "no-animations",

            "no-glass",

            "no-cursor"

        );


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
            glassToggle
        ) {

            glassToggle.checked =
                true;

        }


        if (
            cursorToggle
        ) {

            cursorToggle.checked =
                true;

        }


        $$(
            ".palette"
        ).forEach(
            button => {

                button.classList.toggle(

                    "active",

                    button.dataset.palette ===
                    "dream"

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
   ATALHOS DO TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const typing =
            event.target.matches(
                "input, textarea, select"
            );


        const lightboxOpen =
            lightbox?.classList.contains(
                "open"
            );


        /* =========================================
           ESC
        ========================================= */

        if (
            event.key ===
            "Escape"
        ) {

            closeProductModal();

            closeNoteModal();

            closeLightbox();


            settingsPanel?.classList.remove(
                "open"
            );


            menu?.classList.remove(
                "open"
            );


            return;

        }


        /* =========================================
           LIGHTBOX
        ========================================= */

        if (
            lightboxOpen
        ) {

            if (
                event.key ===
                "ArrowRight"
            ) {

                nextLightbox();

                return;

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousLightbox();

                return;

            }

        }


        if (
            typing
        ) {

            return;

        }


        /* =========================================
           GALERIA
        ========================================= */

        if (
            event.key ===
            "ArrowRight"
        ) {

            goGallery(
                galleryIndex +
                1
            );

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            goGallery(
                galleryIndex -
                1
            );

        }


        /* =========================================
           DARK MODE
        ========================================= */

        if (
            event.key.toLowerCase() ===
            "d"
        ) {

            themeButton?.click();

        }


        /* =========================================
           BORRIFAR
        ========================================= */

        if (
            event.key.toLowerCase() ===
            "s"
        ) {

            sprayDream();

        }

    }
);


/* =========================================================
   RESPONSIVIDADE
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

        }


        detectGallerySlide();

    }
);


/* =========================================================
   IMPEDIR DRAG NATIVO DAS IMAGENS
========================================================= */

$$(
    "img"
).forEach(
    image => {

        image.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    }
);


/* =========================================================
   FINAL
========================================================= */

console.log(

    "%cDream ♡ Amor no Ar",

    `
        color: #df76a8;
        font-size: 22px;
        font-weight: 900;
    `

);


console.log(

    "%cDesenvolvido por BAYERLEE",

    `
        color: #9562dc;
        font-size: 13px;
        font-weight: 800;
    `

);
/* =========================================================
   =========================================================
   DREAM • AMOR NO AR
   JAVASCRIPT UPDATE 3.0
   COLE NO FINAL DO SCRIPT.JS
   =========================================================
   ========================================================= */

(() => {

    "use strict";


    /* =====================================================
       HELPERS DO UPDATE 3.0
    ===================================================== */

    const dream3$ = (
        selector,
        parent = document
    ) => {

        return parent.querySelector(
            selector
        );

    };


    const dream3$$ = (
        selector,
        parent = document
    ) => {

        return [
            ...parent.querySelectorAll(
                selector
            )
        ];

    };


    const dream3Body =
        document.body;


    const dream3Root =
        document.documentElement;


    /* =====================================================
       CONFIGURAÇÕES PADRÃO
    ===================================================== */

    const DREAM3_DEFAULTS = {

        animationSpeed:
            100,

        sprayIntensity:
            70,

        contrast:
            100,

        spraySound:
            true,

        cleanMode:
            false

    };


    /* =====================================================
       ESTADO
    ===================================================== */

    let dream3AnimationSpeed =
        Number(
            localStorage.getItem(
                "dreamAnimationSpeed"
            ) ||
            DREAM3_DEFAULTS.animationSpeed
        );


    let dream3SprayIntensity =
        Number(
            localStorage.getItem(
                "dreamSprayIntensity"
            ) ||
            DREAM3_DEFAULTS.sprayIntensity
        );


    let dream3Contrast =
        Number(
            localStorage.getItem(
                "dreamContrast"
            ) ||
            DREAM3_DEFAULTS.contrast
        );


    let dream3SpraySound =
        localStorage.getItem(
            "dreamSpraySound"
        );


    dream3SpraySound =
        dream3SpraySound === null
            ? DREAM3_DEFAULTS.spraySound
            : dream3SpraySound ===
                "true";


    let dream3CleanMode =
        localStorage.getItem(
            "dreamCleanMode"
        ) ===
        "true";


    /* =====================================================
       ELEMENTOS DO DREAM STUDIO 3.0
    ===================================================== */

    const dream3AnimationSpeedInput =
        dream3$(
            "#animationSpeed"
        );


    const dream3AnimationSpeedValue =
        dream3$(
            "#animationSpeedValue"
        );


    const dream3SprayIntensityInput =
        dream3$(
            "#sprayIntensity"
        );


    const dream3SprayIntensityValue =
        dream3$(
            "#sprayIntensityValue"
        );


    const dream3ContrastInput =
        dream3$(
            "#contrastControl"
        );


    const dream3ContrastValue =
        dream3$(
            "#contrastValue"
        );


    const dream3SpraySoundToggle =
        dream3$(
            "#spraySoundToggle"
        );


    const dream3CleanModeToggle =
        dream3$(
            "#cleanModeToggle"
        );


    /* =====================================================
       TOAST SEGURO
    ===================================================== */

    function dream3Toast(
        message
    ) {

        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                message
            );


            return;

        }


        const toastElement =
            dream3$(
                "#toast"
            );


        if (
            !toastElement
        ) {

            return;

        }


        toastElement.textContent =
            message;


        toastElement.classList.add(
            "show"
        );


        setTimeout(
            () => {

                toastElement.classList.remove(
                    "show"
                );

            },
            2200
        );

    }


    /* =====================================================
       =====================================================
       HERO CINEMATOGRÁFICO
       =====================================================
       ===================================================== */

    const dream3Hero =
        dream3$(
            "#inicio"
        );


    const dream3HeroCopy =
        dream3$(
            ".hero-copy"
        );


    const dream3OrbOne =
        dream3$(
            ".orb-one"
        );


    const dream3OrbTwo =
        dream3$(
            ".orb-two"
        );


    const dream3HeroDreamText =
        dream3$(
            ".dream-bg"
        );


    const dream3HeroProduct =
        dream3$(
            "#heroProduct"
        );


    /* =====================================================
       PARALLAX DO HERO
    ===================================================== */

    dream3Hero?.addEventListener(
        "mousemove",
        event => {

            if (
                dream3Body.classList.contains(
                    "no-animations"
                )
            ) {

                return;

            }


            const rect =
                dream3Hero
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


            const intensity =
                dream3AnimationSpeed /
                100;


            if (
                dream3HeroCopy
            ) {

                dream3HeroCopy.style.transform = `

                    translate3d(
                        ${
                            x *
                            -8 *
                            intensity
                        }px,

                        ${
                            y *
                            -5 *
                            intensity
                        }px,

                        0
                    )

                `;

            }


            if (
                dream3OrbOne
            ) {

                dream3OrbOne.style.transform = `

                    translate(
                        ${
                            x *
                            38 *
                            intensity
                        }px,

                        ${
                            y *
                            28 *
                            intensity
                        }px
                    )

                `;

            }


            if (
                dream3OrbTwo
            ) {

                dream3OrbTwo.style.transform = `

                    translate(
                        ${
                            x *
                            -45 *
                            intensity
                        }px,

                        ${
                            y *
                            -35 *
                            intensity
                        }px
                    )

                `;

            }


            if (
                dream3HeroDreamText
            ) {

                dream3HeroDreamText.style.transform = `

                    translate(
                        ${
                            x *
                            -25 *
                            intensity
                        }px,

                        ${
                            y *
                            -15 *
                            intensity
                        }px
                    )

                `;

            }

        }
    );


    /* =====================================================
       RESET PARALLAX
    ===================================================== */

    dream3Hero?.addEventListener(
        "mouseleave",
        () => {

            if (
                dream3HeroCopy
            ) {

                dream3HeroCopy.style.transform =
                    "";

            }


            if (
                dream3OrbOne
            ) {

                dream3OrbOne.style.transform =
                    "";

            }


            if (
                dream3OrbTwo
            ) {

                dream3OrbTwo.style.transform =
                    "";

            }


            if (
                dream3HeroDreamText
            ) {

                dream3HeroDreamText.style.transform =
                    "";

            }

        }
    );


    /* =====================================================
       =====================================================
       SENSAÇÃO DA FRAGRÂNCIA
       =====================================================
       ===================================================== */

    const dream3FeelingMeters =
        dream3$$(
            ".feeling-meter-fill"
        );


    if (
        dream3FeelingMeters.length
    ) {

        const dream3FeelingObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const value =
                                Number(
                                    entry
                                        .target
                                        .dataset
                                        .feeling ||
                                    0
                                );


                            entry.target.style.width =
                                `${value}%`;


                            dream3FeelingObserver
                                .unobserve(
                                    entry.target
                                );

                        }
                    );

                },

                {
                    threshold:
                        0.25
                }

            );


        dream3FeelingMeters.forEach(
            meter => {

                dream3FeelingObserver
                    .observe(
                        meter
                    );

            }
        );

    }


    /* =====================================================
       ORBITA INTERATIVA
    ===================================================== */

    const dream3FeelingOrbit =
        dream3$(
            ".feeling-orbit"
        );


    dream3FeelingOrbit?.addEventListener(
        "mousemove",
        event => {

            if (
                dream3Body.classList.contains(
                    "no-animations"
                )
            ) {

                return;

            }


            const rect =
                dream3FeelingOrbit
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


            const center =
                dream3$(
                    ".feeling-center",
                    dream3FeelingOrbit
                );


            if (
                center
            ) {

                center.style.transform = `

                    translate3d(
                        ${x * 12}px,
                        ${y * 12}px,
                        30px
                    )

                    rotateX(
                        ${y * -6}deg
                    )

                    rotateY(
                        ${x * 6}deg
                    )

                `;

            }

        }
    );


    dream3FeelingOrbit?.addEventListener(
        "mouseleave",
        () => {

            const center =
                dream3$(
                    ".feeling-center",
                    dream3FeelingOrbit
                );


            if (
                center
            ) {

                center.style.transform =
                    "";

            }

        }
    );


    /* =====================================================
       =====================================================
       CARDS "QUANDO USAR"
       =====================================================
       ===================================================== */

    const dream3MomentCards =
        dream3$$(
            ".moment-card"
        );


    /* =====================================================
       TILT 3D DOS CARDS
    ===================================================== */

    dream3MomentCards.forEach(
        card => {

            card.addEventListener(
                "mousemove",
                event => {

                    if (
                        dream3Body
                            .classList
                            .contains(
                                "no-animations"
                            )
                    ) {

                        return;

                    }


                    const rect =
                        card
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


                    card.style.transform = `

                        perspective(
                            900px
                        )

                        rotateX(
                            ${y * -8}deg
                        )

                        rotateY(
                            ${x * 10}deg
                        )

                        translateY(
                            -6px
                        )

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


    /* =====================================================
       RESPOSTAS DOS MOMENTOS
    ===================================================== */

    const dream3MomentMessages = {

        dia: {

            icon:
                "☀",

            title:
                "Dream durante o dia",

            text:
                "Leve, confortável e delicado para acompanhar a rotina."

        },


        noite: {

            icon:
                "☾",

            title:
                "Dream à noite",

            text:
                "O lado envolvente ganha ainda mais destaque à noite."

        },


        encontro: {

            icon:
                "♡",

            title:
                "Dream no encontro",

            text:
                "Um clima romântico e delicado para momentos especiais."

        },


        estudo: {

            icon:
                "✎",

            title:
                "Dream na rotina",

            text:
                "Uma presença leve para escola, faculdade e compromissos."

        },


        role: {

            icon:
                "✦",

            title:
                "Dream no rolê",

            text:
                "Mais personalidade e energia para acompanhar seu momento."

        },


        banho: {

            icon:
                "◌",

            title:
                "Dream pós-banho",

            text:
                "Frescor e conforto para completar a sensação de cuidado."

        }

    };


    dream3MomentCards.forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    const moment =
                        dream3MomentMessages[
                            card.dataset.moment
                        ];


                    if (
                        !moment
                    ) {

                        return;

                    }


                    dream3MomentCards.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    card.classList.add(
                        "active"
                    );


                    dream3Toast(
                        `${
                            moment.icon
                        } ${
                            moment.title
                        }`
                    );

                }
            );

        }
    );


    /* =====================================================
       =====================================================
       UNIVERSOS DREAM
       =====================================================
       ===================================================== */

    const dream3SceneButtons =
        dream3$$(
            ".scene-button"
        );


    const dream3SceneResultIcon =
        dream3$(
            "#sceneResultIcon"
        );


    const dream3SceneResultMini =
        dream3$(
            "#sceneResultMini"
        );


    const dream3SceneResultTitle =
        dream3$(
            "#sceneResultTitle"
        );


    const dream3SceneResultText =
        dream3$(
            "#sceneResultText"
        );


    const dream3SceneSection =
        dream3$(
            "#dream-scene"
        );


    const dream3SceneBackground =
        dream3$(
            ".dream-scene-bg"
        );


    const dream3SceneData = {

        romance: {

            icon:
                "♡",

            mini:
                "ROMANCE DREAM",

            title:
                "Amor está no ar.",

            text:
                "Uma atmosfera delicada, rosa e envolvente.",

            primary:
                "#df76a8",

            secondary:
                "#9562dc",

            background: `

                radial-gradient(
                    circle at 25% 40%,
                    rgba(
                        223,
                        118,
                        168,
                        .25
                    ),
                    transparent 45%
                ),

                radial-gradient(
                    circle at 75% 65%,
                    rgba(
                        149,
                        98,
                        220,
                        .20
                    ),
                    transparent 45%
                )

            `

        },


        ceu: {

            icon:
                "☾",

            mini:
                "DREAM SKY",

            title:
                "Sonhe um pouco mais.",

            text:
                "Um universo noturno, calmo e cheio de possibilidades.",

            primary:
                "#818cf8",

            secondary:
                "#6d28d9",

            background: `

                radial-gradient(
                    circle at 25% 35%,
                    rgba(
                        129,
                        140,
                        248,
                        .27
                    ),
                    transparent 45%
                ),

                radial-gradient(
                    circle at 75% 70%,
                    rgba(
                        109,
                        40,
                        217,
                        .24
                    ),
                    transparent 45%
                )

            `

        },


        flores: {

            icon:
                "✿",

            mini:
                "FLOWER DREAM",

            title:
                "Um jardim no ar.",

            text:
                "Flores, delicadeza e uma atmosfera luminosa.",

            primary:
                "#f472b6",

            secondary:
                "#c084fc",

            background: `

                radial-gradient(
                    circle at 30% 40%,
                    rgba(
                        244,
                        114,
                        182,
                        .26
                    ),
                    transparent 45%
                ),

                radial-gradient(
                    circle at 75% 65%,
                    rgba(
                        192,
                        132,
                        252,
                        .20
                    ),
                    transparent 45%
                )

            `

        },


        energia: {

            icon:
                "✦",

            mini:
                "DREAM ENERGY",

            title:
                "Faça o momento brilhar.",

            text:
                "Mais cor, movimento e energia para o universo Dream.",

            primary:
                "#fb7185",

            secondary:
                "#f59e0b",

            background: `

                radial-gradient(
                    circle at 25% 35%,
                    rgba(
                        251,
                        113,
                        133,
                        .26
                    ),
                    transparent 45%
                ),

                radial-gradient(
                    circle at 75% 65%,
                    rgba(
                        245,
                        158,
                        11,
                        .22
                    ),
                    transparent 45%
                )

            `

        }

    };


    /* =====================================================
       APLICAR CENA
    ===================================================== */

    function dream3ApplyScene(
        sceneName
    ) {

        const scene =
            dream3SceneData[
                sceneName
            ];


        if (
            !scene
        ) {

            return;

        }


        dream3SceneButtons.forEach(
            button => {

                button.classList.toggle(

                    "active",

                    button.dataset.scene ===
                    sceneName

                );

            }
        );


        if (
            dream3SceneResultIcon
        ) {

            dream3SceneResultIcon.textContent =
                scene.icon;

        }


        if (
            dream3SceneResultMini
        ) {

            dream3SceneResultMini.textContent =
                scene.mini;

        }


        if (
            dream3SceneResultTitle
        ) {

            dream3SceneResultTitle.textContent =
                scene.title;

        }


        if (
            dream3SceneResultText
        ) {

            dream3SceneResultText.textContent =
                scene.text;

        }


        if (
            dream3SceneBackground
        ) {

            dream3SceneBackground.style.background =
                scene.background;

        }


        /*
            APROVEITA A FUNÇÃO DE CORES
            QUE JÁ EXISTE NO SCRIPT ANTIGO
        */

        if (
            typeof applyColors ===
            "function"
        ) {

            applyColors(

                scene.primary,

                scene.secondary

            );

        }


        localStorage.setItem(
            "dreamScene",
            sceneName
        );


        dream3CreateSceneParticles(
            scene
        );

    }


    dream3SceneButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    dream3ApplyScene(
                        button.dataset.scene
                    );

                }
            );

        }
    );


    /* =====================================================
       PARTÍCULAS AO TROCAR UNIVERSO
    ===================================================== */

    function dream3CreateSceneParticles(
        scene
    ) {

        if (
            !dream3SceneSection
        ) {

            return;

        }


        if (
            dream3Body.classList.contains(
                "no-particles"
            )
        ) {

            return;

        }


        const symbols = [

            scene.icon,

            "✦",

            "·",

            scene.icon

        ];


        for (
            let i = 0;
            i < 20;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );


            particle.className =
                "dream-scene-particle";


            particle.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            particle.style.position =
                "absolute";


            particle.style.left =
                `${
                    Math.random() *
                    100
                }%`;


            particle.style.top =
                `${
                    20 +
                    Math.random() *
                    70
                }%`;


            particle.style.zIndex =
                "1";


            particle.style.pointerEvents =
                "none";


            particle.style.color =
                scene.primary;


            particle.style.fontSize =
                `${
                    8 +
                    Math.random() *
                    14
                }px`;


            particle.style.opacity =
                "0";


            particle.animate(

                [

                    {

                        opacity:
                            0,

                        transform:
                            "translateY(20px) scale(.5)"

                    },

                    {

                        opacity:
                            0.8,

                        offset:
                            0.2

                    },

                    {

                        opacity:
                            0,

                        transform:
                            `translateY(${
                                -80 -
                                Math.random() *
                                100
                            }px) rotate(${
                                Math.random() *
                                280
                            }deg) scale(1.3)`

                    }

                ],

                {

                    duration:
                        1200 +
                        Math.random() *
                        900,

                    easing:
                        "ease-out"

                }

            );


            dream3SceneSection.appendChild(
                particle
            );


            setTimeout(
                () => {

                    particle.remove();

                },
                2300
            );

        }

    }


    /* =====================================================
       RESTAURAR UNIVERSO SALVO
    ===================================================== */

    const dream3SavedScene =
        localStorage.getItem(
            "dreamScene"
        );


    if (
        dream3SavedScene &&
        dream3SceneData[
            dream3SavedScene
        ]
    ) {

        dream3ApplyScene(
            dream3SavedScene
        );

    }


    /* =====================================================
       =====================================================
       GALERIA • PROGRESSO DO AUTOPLAY
       =====================================================
       ===================================================== */

    const dream3GalleryProgress =
        dream3$(
            "#galleryAutoplayProgress"
        );


    const dream3GalleryAutoplayButton =
        dream3$(
            "#galleryAutoplay"
        );


    const dream3GalleryTrack =
        dream3$(
            "#galleryTrack"
        );


    let dream3GalleryProgressTimer =
        null;


    /* =====================================================
       RESETAR BARRA
    ===================================================== */

    function dream3ResetGalleryProgress() {

        if (
            !dream3GalleryProgress
        ) {

            return;

        }


        dream3GalleryProgress
            .classList
            .remove(
                "running"
            );


        dream3GalleryProgress.style.width =
            "0%";


        void dream3GalleryProgress
            .offsetWidth;


        dream3GalleryProgress
            .classList
            .add(
                "running"
            );

    }


    /* =====================================================
       PARAR BARRA
    ===================================================== */

    function dream3StopGalleryProgress() {

        if (
            dream3GalleryProgressTimer
        ) {

            clearInterval(
                dream3GalleryProgressTimer
            );

        }


        dream3GalleryProgressTimer =
            null;


        if (
            dream3GalleryProgress
        ) {

            dream3GalleryProgress
                .classList
                .remove(
                    "running"
                );


            dream3GalleryProgress.style.width =
                "0%";

        }

    }


    /* =====================================================
       INICIAR PROGRESSO MANUAL
    ===================================================== */

    function dream3StartGalleryProgress() {

        dream3StopGalleryProgress();


        if (
            !dream3GalleryProgress
        ) {

            return;

        }


        let elapsed =
            0;


        const total =
            3500;


        const interval =
            50;


        dream3GalleryProgressTimer =
            setInterval(
                () => {

                    elapsed +=
                        interval;


                    const percent =
                        Math.min(
                            100,
                            elapsed /
                            total *
                            100
                        );


                    dream3GalleryProgress.style.width =
                        `${percent}%`;


                    if (
                        percent >=
                        100
                    ) {

                        elapsed =
                            0;


                        dream3GalleryProgress.style.width =
                            "0%";

                    }

                },
                interval
            );

    }


    /* =====================================================
       SINCRONIZAR AUTOPLAY ANTIGO
    ===================================================== */

    dream3GalleryAutoplayButton?.addEventListener(
        "click",
        () => {

            setTimeout(
                () => {

                    /*
                        galleryTimer pertence
                        ao script antigo.
                    */

                    if (
                        typeof galleryTimer !==
                        "undefined" &&
                        galleryTimer
                    ) {

                        dream3StartGalleryProgress();

                    } else {

                        dream3StopGalleryProgress();

                    }

                },
                50
            );

        }
    );


    /* =====================================================
       RESETAR PROGRESSO NAS SETAS
    ===================================================== */

    dream3$(
        "#galleryNext"
    )?.addEventListener(
        "click",
        () => {

            if (
                dream3GalleryProgressTimer
            ) {

                dream3StartGalleryProgress();

            }

        }
    );


    dream3$(
        "#galleryPrev"
    )?.addEventListener(
        "click",
        () => {

            if (
                dream3GalleryProgressTimer
            ) {

                dream3StartGalleryProgress();

            }

        }
    );


    /* =====================================================
       PAUSAR NO HOVER
    ===================================================== */

    dream3GalleryTrack?.addEventListener(
        "mouseenter",
        () => {

            if (
                dream3GalleryProgressTimer
            ) {

                clearInterval(
                    dream3GalleryProgressTimer
                );

            }

        }
    );


    dream3GalleryTrack?.addEventListener(
        "mouseleave",
        () => {

            if (
                typeof galleryTimer !==
                "undefined" &&
                galleryTimer
            ) {

                dream3StartGalleryProgress();

            }

        }
    );


    /* =====================================================
       =====================================================
       DREAM STUDIO 3.0
       =====================================================
       ===================================================== */


    /* =====================================================
       VELOCIDADE DAS ANIMAÇÕES
    ===================================================== */

    function dream3SetAnimationSpeed(
        value,
        save = true
    ) {

        dream3AnimationSpeed =
            Number(
                value
            );


        const multiplier =
            dream3AnimationSpeed /
            100;


        dream3Root.style.setProperty(
            "--animation-speed",
            multiplier
        );


        if (
            dream3AnimationSpeedInput
        ) {

            dream3AnimationSpeedInput.value =
                dream3AnimationSpeed;

        }


        if (
            dream3AnimationSpeedValue
        ) {

            dream3AnimationSpeedValue.textContent =
                `${dream3AnimationSpeed}%`;

        }


        if (
            save
        ) {

            localStorage.setItem(
                "dreamAnimationSpeed",
                String(
                    dream3AnimationSpeed
                )
            );

        }

    }


    dream3AnimationSpeedInput?.addEventListener(
        "input",
        event => {

            dream3SetAnimationSpeed(
                event.target.value
            );

        }
    );


    /* =====================================================
       CONTRASTE
    ===================================================== */

    function dream3SetContrast(
        value,
        save = true
    ) {

        dream3Contrast =
            Number(
                value
            );


        dream3Root.style.setProperty(
            "--site-contrast",
            dream3Contrast /
            100
        );


        if (
            dream3ContrastInput
        ) {

            dream3ContrastInput.value =
                dream3Contrast;

        }


        if (
            dream3ContrastValue
        ) {

            dream3ContrastValue.textContent =
                `${dream3Contrast}%`;

        }


        if (
            save
        ) {

            localStorage.setItem(
                "dreamContrast",
                String(
                    dream3Contrast
                )
            );

        }

    }


    dream3ContrastInput?.addEventListener(
        "input",
        event => {

            dream3SetContrast(
                event.target.value
            );

        }
    );


    /* =====================================================
       INTENSIDADE DO BORRIFO
    ===================================================== */

    function dream3SetSprayIntensity(
        value,
        save = true
    ) {

        dream3SprayIntensity =
            Number(
                value
            );


        if (
            dream3SprayIntensityInput
        ) {

            dream3SprayIntensityInput.value =
                dream3SprayIntensity;

        }


        if (
            dream3SprayIntensityValue
        ) {

            dream3SprayIntensityValue.textContent =
                `${dream3SprayIntensity}%`;

        }


        if (
            save
        ) {

            localStorage.setItem(
                "dreamSprayIntensity",
                String(
                    dream3SprayIntensity
                )
            );

        }

    }


    dream3SprayIntensityInput?.addEventListener(
        "input",
        event => {

            dream3SetSprayIntensity(
                event.target.value
            );

        }
    );


    /* =====================================================
       MODO CLEAN
    ===================================================== */

    function dream3SetCleanMode(
        active,
        save = true
    ) {

        dream3CleanMode =
            Boolean(
                active
            );


        dream3Body.classList.toggle(
            "clean-mode",
            dream3CleanMode
        );


        if (
            dream3CleanModeToggle
        ) {

            dream3CleanModeToggle.checked =
                dream3CleanMode;

        }


        if (
            save
        ) {

            localStorage.setItem(
                "dreamCleanMode",
                String(
                    dream3CleanMode
                )
            );

        }


        if (
            dream3CleanMode
        ) {

            dream3Toast(
                "Modo Clean ativado ✦"
            );

        }

    }


    dream3CleanModeToggle?.addEventListener(
        "change",
        event => {

            dream3SetCleanMode(
                event.target.checked
            );

        }
    );


    /* =====================================================
       SOM DO BORRIFADOR
    ===================================================== */

    dream3SpraySoundToggle?.addEventListener(
        "change",
        event => {

            dream3SpraySound =
                event.target.checked;


            localStorage.setItem(
                "dreamSpraySound",
                String(
                    dream3SpraySound
                )
            );

        }
    );


    /* =====================================================
       CRIAR SOM DE SPRAY
    ===================================================== */

    function dream3PlaySpraySound() {

        if (
            !dream3SpraySound
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
                0.22;


            const buffer =
                context.createBuffer(

                    1,

                    Math.floor(
                        context.sampleRate *
                        duration
                    ),

                    context.sampleRate

                );


            const data =
                buffer.getChannelData(
                    0
                );


            for (
                let i = 0;
                i < data.length;
                i++
            ) {

                const progress =
                    i /
                    data.length;


                const fade =
                    Math.pow(
                        1 -
                        progress,
                        2
                    );


                data[i] =
                    (
                        Math.random() *
                        2 -
                        1
                    ) *
                    fade *
                    0.23;

            }


            const source =
                context
                    .createBufferSource();


            const highPass =
                context
                    .createBiquadFilter();


            const lowPass =
                context
                    .createBiquadFilter();


            const gain =
                context
                    .createGain();


            source.buffer =
                buffer;


            highPass.type =
                "highpass";


            highPass.frequency.value =
                1200;


            lowPass.type =
                "lowpass";


            lowPass.frequency.value =
                7000;


            gain.gain.setValueAtTime(
                0.35,
                context.currentTime
            );


            gain.gain.exponentialRampToValueAtTime(
                0.01,
                context.currentTime +
                duration
            );


            source.connect(
                highPass
            );


            highPass.connect(
                lowPass
            );


            lowPass.connect(
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

        } catch (
            error
        ) {

            console.log(
                "Dream Spray Sound:",
                error
            );

        }

    }


    /* =====================================================
       =====================================================
       INTENSIDADE REAL DO BORRIFO
       =====================================================
       ===================================================== */

    const dream3SprayButton =
        dream3$(
            "#sprayButton"
        );


    const dream3SprayArea =
        dream3$(
            "#sprayArea"
        );


    /* =====================================================
       NÉVOA EXTRA DE ACORDO COM O SLIDER
    ===================================================== */

    function dream3CreateExtraSpray() {

        if (
            !dream3SprayArea
        ) {

            return;

        }


        const power =
            dream3SprayIntensity /
            100;


        /*
            Quanto maior a intensidade,
            mais partículas extras.
        */

        const mistAmount =
            Math.round(
                8 +
                35 *
                power
            );


        const symbolAmount =
            Math.round(
                2 +
                10 *
                power
            );


        /* =========================================
           NÉVOA
        ========================================= */

        for (
            let i = 0;
            i < mistAmount;
            i++
        ) {

            const mist =
                document.createElement(
                    "span"
                );


            /*
                Compatível com o CSS
                do Update 2.0.
            */

            mist.className =
                "dream-mist";


            const directionPower =
                180 +
                280 *
                power;


            const x =
                (
                    Math.random() -
                    0.5
                ) *
                directionPower;


            const y =
                -50 -
                Math.random() *
                (
                    160 +
                    220 *
                    power
                );


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
                `${
                    3 +
                    Math.random() *
                    (
                        5 +
                        9 *
                        power
                    )
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
                    0.7 +
                    Math.random() *
                    0.8
                }s`
            );


            mist.style.animationDelay =
                `${
                    Math.random() *
                    0.15
                }s`;


            dream3SprayArea.appendChild(
                mist
            );


            setTimeout(
                () => {

                    mist.remove();

                },
                1900
            );

        }


        /* =========================================
           SÍMBOLOS
        ========================================= */

        const symbols = [

            "♡",

            "✦",

            "✧",

            "♡"

        ];


        for (
            let i = 0;
            i < symbolAmount;
            i++
        ) {

            const symbol =
                document.createElement(
                    "span"
                );


            symbol.className =
                "dream-spray-symbol";


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
                    (
                        230 +
                        250 *
                        power
                    )
                }px`
            );


            symbol.style.setProperty(
                "--symbol-y",
                `${
                    -70 -
                    Math.random() *
                    (
                        160 +
                        190 *
                        power
                    )
                }px`
            );


            symbol.style.setProperty(
                "--symbol-rotate",
                `${
                    (
                        Math.random() -
                        0.5
                    ) *
                    500
                }deg`
            );


            symbol.style.setProperty(
                "--symbol-size",
                `${
                    9 +
                    Math.random() *
                    14
                }px`
            );


            symbol.style.animationDelay =
                `${
                    Math.random() *
                    0.15
                }s`;


            dream3SprayArea.appendChild(
                symbol
            );


            setTimeout(
                () => {

                    symbol.remove();

                },
                1900
            );

        }

    }


    /* =====================================================
       CONECTAR AO BORRIFADOR ANTIGO
    ===================================================== */

    dream3SprayButton?.addEventListener(
        "click",
        () => {

            dream3CreateExtraSpray();

            dream3PlaySpraySound();

        }
    );


    /* =====================================================
       =====================================================
       MICROINTERAÇÕES
       =====================================================
       ===================================================== */

    const dream3InteractiveCards =
        dream3$$(

            ".note-card, " +
            ".experience-card, " +
            ".quiz-card"

        );


    dream3InteractiveCards.forEach(
        card => {

            card.addEventListener(
                "mousemove",
                event => {

                    if (
                        dream3Body
                            .classList
                            .contains(
                                "no-animations"
                            )
                    ) {

                        return;

                    }


                    const rect =
                        card
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


                    card.style.setProperty(
                        "--mouse-x",
                        `${x * 100}%`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${y * 100}%`
                    );

                }
            );

        }
    );


    /* =====================================================
       =====================================================
       DEVELOPER CREDIT
       =====================================================
       ===================================================== */

    const dream3Developer =
        dream3$(
            ".developer-credit"
        );


    dream3Developer?.addEventListener(
        "click",
        () => {

            dream3Toast(
                "Desenvolvido por BAYERLEE ✦"
            );

        }
    );


    /* =====================================================
       =====================================================
       CARREGAR CONFIGURAÇÕES
       =====================================================
       ===================================================== */

    function dream3LoadSettings() {

        dream3SetAnimationSpeed(
            dream3AnimationSpeed,
            false
        );


        dream3SetSprayIntensity(
            dream3SprayIntensity,
            false
        );


        dream3SetContrast(
            dream3Contrast,
            false
        );


        dream3SetCleanMode(
            dream3CleanMode,
            false
        );


        if (
            dream3SpraySoundToggle
        ) {

            dream3SpraySoundToggle.checked =
                dream3SpraySound;

        }

    }


    dream3LoadSettings();


    /* =====================================================
       =====================================================
       RESET 3.0
       =====================================================
       ===================================================== */

    const dream3ResetButton =
        dream3$(
            "#resetSettings"
        );


    dream3ResetButton?.addEventListener(
        "click",
        () => {

            /*
                O reset antigo continua
                funcionando normalmente.

                Este segundo listener limpa
                apenas as opções do Update 3.0.
            */

            localStorage.removeItem(
                "dreamAnimationSpeed"
            );


            localStorage.removeItem(
                "dreamSprayIntensity"
            );


            localStorage.removeItem(
                "dreamContrast"
            );


            localStorage.removeItem(
                "dreamCleanMode"
            );


            localStorage.removeItem(
                "dreamSpraySound"
            );


            localStorage.removeItem(
                "dreamScene"
            );


            dream3AnimationSpeed =
                DREAM3_DEFAULTS
                    .animationSpeed;


            dream3SprayIntensity =
                DREAM3_DEFAULTS
                    .sprayIntensity;


            dream3Contrast =
                DREAM3_DEFAULTS
                    .contrast;


            dream3SpraySound =
                DREAM3_DEFAULTS
                    .spraySound;


            dream3CleanMode =
                DREAM3_DEFAULTS
                    .cleanMode;


            dream3SetAnimationSpeed(
                dream3AnimationSpeed,
                false
            );


            dream3SetSprayIntensity(
                dream3SprayIntensity,
                false
            );


            dream3SetContrast(
                dream3Contrast,
                false
            );


            dream3SetCleanMode(
                dream3CleanMode,
                false
            );


            if (
                dream3SpraySoundToggle
            ) {

                dream3SpraySoundToggle.checked =
                    true;

            }


            /*
                Retorna o universo Dream
                para Romance.
            */

            if (
                dream3SceneData.romance
            ) {

                dream3ApplyScene(
                    "romance"
                );

            }

        }
    );


    /* =====================================================
       =====================================================
       MOBILE • TOUCH EFFECT
       =====================================================
       ===================================================== */

    dream3MomentCards.forEach(
        card => {

            card.addEventListener(
                "touchstart",
                () => {

                    card.classList.add(
                        "touch-active"
                    );

                },
                {
                    passive:
                        true
                }
            );


            card.addEventListener(
                "touchend",
                () => {

                    setTimeout(
                        () => {

                            card.classList.remove(
                                "touch-active"
                            );

                        },
                        180
                    );

                },
                {
                    passive:
                        true
                }
            );

        }
    );


    /* =====================================================
       =====================================================
       PERFORMANCE
       =====================================================
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            /*
                Evita desperdiçar processamento
                com o progresso da galeria quando
                a aba estiver em segundo plano.
            */

            if (
                document.hidden
            ) {

                if (
                    dream3GalleryProgressTimer
                ) {

                    clearInterval(
                        dream3GalleryProgressTimer
                    );

                }

            } else {

                if (
                    typeof galleryTimer !==
                    "undefined" &&
                    galleryTimer
                ) {

                    dream3StartGalleryProgress();

                }

            }

        }
    );


    /* =====================================================
       =====================================================
       FINAL DO UPDATE
       =====================================================
       ===================================================== */

    console.log(

        "%cDream Update 3.0 ♡",

        `
            color: #df76a8;
            font-size: 18px;
            font-weight: 900;
        `

    );


    console.log(

        "%cSensação • Momentos • Universos • Studio 3.0",

        `
            color: #9562dc;
            font-size: 11px;
            font-weight: 700;
        `

    );


})();
