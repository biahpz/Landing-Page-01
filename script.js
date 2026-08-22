/* =========================================================
   DREAM • AMOR NO AR
   SCRIPT.JS
========================================================= */

"use strict";


/* =========================================================
   HELPERS
========================================================= */

const $ = (
    selector,
    parent = document
) => {
    return parent.querySelector(
        selector
    );
};


const $$ = (
    selector,
    parent = document
) => {
    return [
        ...parent.querySelectorAll(
            selector
        )
    ];
};


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


const mainBottle =
    $("#mainBottle");


const heroProduct =
    $("#heroProduct");


const sprayButton =
    $("#sprayButton");


const sprayArea =
    $("#sprayArea");


const particles =
    $("#particles");


const cursorGlow =
    $("#cursorGlow");


const productModal =
    $("#productModal");


const noteModal =
    $("#noteModal");


const lightbox =
    $("#lightbox");


const lightboxImage =
    $("#lightboxImage");


const settingsButton =
    $("#settingsButton");


const settingsPanel =
    $("#settingsPanel");


const closeSettings =
    $("#closeSettings");


const toast =
    $("#toast");


const backTop =
    $("#backTop");


const sectionIndicator =
    $("#sectionIndicator");



/* =========================================================
   ESTADO GLOBAL
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

    achievements:
        new Set(),

    favoriteNote:
        null

};



/* =========================================================
   LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                loader
                    ?.classList
                    .add(
                        "hide"
                    );

            },
            700
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
            2600
        );

}



/* =========================================================
   CONTADOR DE INTERAÇÕES
========================================================= */

document.addEventListener(
    "click",
    () => {

        state.interactions++;


        updateStats();


        if (
            state.interactions >=
            10
        ) {

            unlockAchievement(
                "Curioso Dream"
            );

        }


        if (
            state.interactions >=
            30
        ) {

            unlockAchievement(
                "Explorador Dream"
            );

        }

    }
);



/* =========================================================
   SCROLL
========================================================= */

function updateScroll() {

    const scrollTop =
        window.scrollY;


    const height =
        document
            .documentElement
            .scrollHeight -
        window.innerHeight;


    const percent =
        height > 0
            ? (
                scrollTop /
                height
            ) * 100
            : 0;


    if (
        scrollProgress
    ) {

        scrollProgress
            .style
            .width =
                `${percent}%`;

    }


    state.maxScroll =
        Math.max(
            state.maxScroll,
            percent
        );


    header
        ?.classList
        .toggle(
            "scrolled",
            scrollTop > 40
        );


    backTop
        ?.classList
        .toggle(
            "show",
            scrollTop > 500
        );


    if (
        state.maxScroll >=
        95
    ) {

        unlockAchievement(
            "Até o Fim ♡"
        );

    }


    updateStats();

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

backTop
    ?.addEventListener(
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

menuMobile
    ?.addEventListener(
        "click",
        () => {

            menu
                ?.classList
                .toggle(
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

                menu
                    ?.classList
                    .remove(
                        "open"
                    );

            }
        );

    }
);



/* =========================================================
   MENU ATIVO
========================================================= */

const sections =
    $$(
        ".section-track"
    );


const menuLinks =
    $$(
        ".menu a"
    );


function updateActiveSection() {

    let current =
        sections[0];


    sections.forEach(
        section => {

            const rect =
                section
                    .getBoundingClientRect();


            if (
                rect.top <=
                220
            ) {

                current =
                    section;

            }

        }
    );


    if (!current) {
        return;
    }


    const id =
        current.id;


    menuLinks.forEach(
        link => {

            link
                .classList
                .toggle(
                    "active",

                    link
                        .getAttribute(
                            "href"
                        ) ===
                        `#${id}`
                );

        }
    );


    const index =
        sections
            .indexOf(
                current
            ) + 1;


    const name =
        current
            .dataset
            .sectionName ||
        current.id;


    if (
        sectionIndicator
    ) {

        sectionIndicator.innerHTML = `

            <span>
                ${
                    String(
                        index
                    )
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
                        entry
                            .isIntersecting
                    ) {

                        entry
                            .target
                            .classList
                            .add(
                                "visible"
                            );

                    }

                }
            );

        },

        {
            threshold:
                0.12
        }

    );


$$(
    ".reveal"
).forEach(
    element => {

        revealObserver
            .observe(
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
                        !entry
                            .isIntersecting
                    ) {

                        return;

                    }


                    const meter =
                        entry.target;


                    const value =
                        meter
                            .dataset
                            .meter ||
                        0;


                    meter
                        .style
                        .width =
                            `${value}%`;

                }
            );

        },

        {
            threshold:
                0.4
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
            !cursorGlow ||
            !state.cursor
        ) {

            return;

        }


        cursorGlow
            .style
            .left =
                `${event.clientX}px`;


        cursorGlow
            .style
            .top =
                `${event.clientY}px`;

    }
);



/* =========================================================
   FRASCO 3D
========================================================= */

heroProduct
    ?.addEventListener(
        "mousemove",
        event => {

            if (
                !mainBottle ||
                !state.animations
            ) {

                return;

            }


            if (
                state.autoRotate
            ) {

                return;

            }


            const rect =
                heroProduct
                    .getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width /
                2;


            const centerY =
                rect.height /
                2;


            const rotateY =
                (
                    (
                        x -
                        centerX
                    ) /
                    centerX
                ) * 8;


            const rotateX =
                -(
                    (
                        y -
                        centerY
                    ) /
                    centerY
                ) * 6;


            const moveX =
                (
                    (
                        x -
                        centerX
                    ) /
                    centerX
                ) * 8;


            const moveY =
                (
                    (
                        y -
                        centerY
                    ) /
                    centerY
                ) * 5;


            root
                .style
                .setProperty(
                    "--mouse-x",
                    `${moveX}px`
                );


            root
                .style
                .setProperty(
                    "--mouse-y",
                    `${moveY}px`
                );


            root
                .style
                .setProperty(
                    "--mouse-rx",
                    `${rotateX}deg`
                );


            root
                .style
                .setProperty(
                    "--mouse-ry",
                    `${rotateY}deg`
                );

        }
    );


heroProduct
    ?.addEventListener(
        "mouseleave",
        resetBottleMouse
    );



/* =========================================================
   RESET MOVIMENTO DO FRASCO
========================================================= */

function resetBottleMouse() {

    root
        .style
        .setProperty(
            "--mouse-x",
            "0px"
        );


    root
        .style
        .setProperty(
            "--mouse-y",
            "0px"
        );


    root
        .style
        .setProperty(
            "--mouse-rx",
            "0deg"
        );


    root
        .style
        .setProperty(
            "--mouse-ry",
            "0deg"
        );

}



/* =========================================================
   EASTER EGG
   7 CLIQUES NO FRASCO
========================================================= */

let bottleClicks =
    0;


let bottleClickTimer;


mainBottle
    ?.addEventListener(
        "click",
        () => {

            bottleClicks++;


            clearTimeout(
                bottleClickTimer
            );


            bottleClickTimer =
                setTimeout(
                    () => {

                        bottleClicks =
                            0;

                    },
                    2500
                );


            if (
                bottleClicks >=
                7
            ) {

                bottleClicks =
                    0;


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

sprayButton
    ?.addEventListener(
        "click",
        spray
    );


function spray() {

    if (
        !sprayArea
    ) {

        return;

    }


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document
                .createElement(
                    "span"
                );


        particle.className =
            "spray-particle";


        const size =
            3 +
            Math.random() *
            8;


        const x =
            (
                Math.random() -
                0.5
            ) *
            330;


        const y =
            -60 -
            Math.random() *
            250;


        particle
            .style
            .setProperty(
                "--size",
                `${size}px`
            );


        particle
            .style
            .setProperty(
                "--x",
                `${x}px`
            );


        particle
            .style
            .setProperty(
                "--y",
                `${y}px`
            );


        particle
            .style
            .left =
                `${
                    45 +
                    Math.random() *
                    10
                }%`;


        particle
            .style
            .top =
                `${
                    45 +
                    Math.random() *
                    10
                }%`;


        sprayArea.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            1600
        );

    }


    if (
        navigator.vibrate
    ) {

        navigator.vibrate(
            25
        );

    }


    showToast(
        "Dream está no ar ✦"
    );


    unlockAchievement(
        "Primeiro Borrifo"
    );

}



/* =========================================================
   MODAL DO PRODUTO
========================================================= */

function openProductModal() {

    productModal
        ?.classList
        .add(
            "open"
        );


    productModal
        ?.setAttribute(
            "aria-hidden",
            "false"
        );


    body
        .classList
        .add(
            "modal-open"
        );

}


function closeProductModal() {

    productModal
        ?.classList
        .remove(
            "open"
        );


    productModal
        ?.setAttribute(
            "aria-hidden",
            "true"
        );


    body
        .classList
        .remove(
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

const favoriteButtons = [

    $("#favoriteButton"),

    $("#favoriteModal")

].filter(
    Boolean
);


let favorite =
    localStorage
        .getItem(
            "dreamFavorite"
        ) ===
        "true";


function updateFavorite() {

    favoriteButtons.forEach(
        button => {

            button.innerHTML =
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
                    favorite
                );


                updateFavorite();


                showToast(

                    favorite
                        ? "Adicionado aos favoritos ♡"
                        : "Removido dos favoritos"

                );


                if (
                    favorite
                ) {

                    unlockAchievement(
                        "Dream Lover"
                    );

                }

            }
        );

    }
);


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

            await navigator
                .clipboard
                .writeText(
                    window
                        .location
                        .href
                );


            showToast(
                "Link copiado ♡"
            );

        }

    } catch (
        error
    ) {

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
   DADOS DAS NOTAS
========================================================= */

const notesData = {

    bergamota: {

        title:
            "Bergamota",

        icon:
            "🍊",

        text:
            "Uma nota cítrica luminosa que traz frescor para a abertura da fragrância."

    },


    laranja: {

        title:
            "Laranja",

        icon:
            "🍊",

        text:
            "Traz uma sensação cítrica, alegre e confortável."

    },


    mandarina: {

        title:
            "Mandarina",

        icon:
            "🍊",

        text:
            "Uma faceta frutada e vibrante para a primeira impressão."

    },


    limao: {

        title:
            "Limão",

        icon:
            "🍋",

        text:
            "Acrescenta brilho e uma sensação fresca."

    },


    cassis: {

        title:
            "Cassis",

        icon:
            "🫐",

        text:
            "Uma nota frutada com personalidade e leve acidez."

    },


    maca: {

        title:
            "Maçã",

        icon:
            "🍎",

        text:
            "Uma sensação frutada, fresca e delicadamente adocicada."

    },


    rosa: {

        title:
            "Rosa",

        icon:
            "🌹",

        text:
            "Um dos símbolos clássicos da perfumaria floral e romântica."

    },


    tilia: {

        title:
            "Tília",

        icon:
            "🌼",

        text:
            "Uma nota floral delicada que reforça a suavidade da composição."

    },


    freesia: {

        title:
            "Frésia",

        icon:
            "🌸",

        text:
            "Floral leve, luminoso e delicado."

    },


    lotus: {

        title:
            "Flor de Lótus",

        icon:
            "🪷",

        text:
            "Traz uma sensação floral aquática, limpa e suave."

    },


    gardenia: {

        title:
            "Gardênia",

        icon:
            "🌼",

        text:
            "Floral cremoso e sofisticado."

    },


    pessego: {

        title:
            "Pêssego",

        icon:
            "🍑",

        text:
            "Acrescenta uma nuance frutada macia e confortável."

    },


    ambar: {

        title:
            "Âmbar",

        icon:
            "✨",

        text:
            "Quente e envolvente, ajuda a criar profundidade."

    },


    sandalo: {

        title:
            "Sândalo",

        icon:
            "🪵",

        text:
            "Madeira cremosa que adiciona conforto e suavidade."

    },


    baunilha: {

        title:
            "Baunilha",

        icon:
            "🤍",

        text:
            "Uma sensação doce, cremosa e aconchegante."

    },


    tonka: {

        title:
            "Tonka",

        icon:
            "✨",

        text:
            "Uma nuance quente, adocicada e confortável."

    },


    musk: {

        title:
            "Musk",

        icon:
            "☁",

        text:
            "Traz uma sensação macia, limpa e envolvente."

    }

};
/* =========================================================
   CLIQUES NAS NOTAS
========================================================= */

$$(
    ".note-chip"
).forEach(
    chip => {

        chip.addEventListener(
            "click",
            () => {

                const key =
                    chip
                        .dataset
                        .note;


                const note =
                    notesData[
                        key
                    ];


                if (
                    !note
                ) {

                    return;

                }


                const modalIcon =
                    $("#noteModalIcon");


                const modalTitle =
                    $("#noteModalTitle");


                const modalText =
                    $("#noteModalText");


                if (
                    modalIcon
                ) {

                    modalIcon.textContent =
                        note.icon;

                }


                if (
                    modalTitle
                ) {

                    modalTitle.textContent =
                        note.title;

                }


                if (
                    modalText
                ) {

                    modalText.textContent =
                        note.text;

                }


                noteModal
                    ?.classList
                    .add(
                        "open"
                    );


                noteModal
                    ?.setAttribute(
                        "aria-hidden",
                        "false"
                    );


                body
                    .classList
                    .add(
                        "modal-open"
                    );


                state.favoriteNote =
                    key;


                localStorage.setItem(
                    "dreamFavoriteNote",
                    key
                );


                unlockAchievement(
                    "Perfumista"
                );

            }
        );

    }
);



/* =========================================================
   FECHAR MODAL DAS NOTAS
========================================================= */

function closeNoteModal() {

    noteModal
        ?.classList
        .remove(
            "open"
        );


    noteModal
        ?.setAttribute(
            "aria-hidden",
            "true"
        );


    if (
        !productModal
            ?.classList
            .contains(
                "open"
            )
    ) {

        body
            .classList
            .remove(
                "modal-open"
            );

    }

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
   ESC FECHA JANELAS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        closeProductModal();


        closeNoteModal();


        closeLightbox();


        settingsPanel
            ?.classList
            .remove(
                "open"
            );


        closeShortcutsModal();


        closeAchievementsModal();


        stopPhotoMode();

    }
);



/* =========================================================
   RODA OLFATIVA
========================================================= */

const wheelData = {

    floral: {

        title:
            "Floral",

        text:
            "Romântico e delicado",

        percent:
            "90%"

    },


    frutado: {

        title:
            "Frutado",

        text:
            "Leve, alegre e suculento",

        percent:
            "75%"

    },


    citrico: {

        title:
            "Cítrico",

        text:
            "Fresco e luminoso",

        percent:
            "70%"

    },


    doce: {

        title:
            "Doce",

        text:
            "Macio e confortável",

        percent:
            "65%"

    },


    amadeirado: {

        title:
            "Amadeirado",

        text:
            "Elegante e envolvente",

        percent:
            "55%"

    },


    ambarado: {

        title:
            "Âmbar",

        text:
            "Quente e aconchegante",

        percent:
            "60%"

    }

};


$$(
    "[data-wheel]"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const key =
                    button
                        .dataset
                        .wheel;


                const data =
                    wheelData[
                        key
                    ];


                if (
                    !data
                ) {

                    return;

                }


                $$(
                    "[data-wheel]"
                ).forEach(
                    item => {

                        item
                            .classList
                            .remove(
                                "active"
                            );

                    }
                );


                button
                    .classList
                    .add(
                        "active"
                    );


                const title =
                    $("#wheelTitle");


                const text =
                    $("#wheelText");


                const percent =
                    $("#wheelPercent");


                if (
                    title
                ) {

                    title.textContent =
                        data.title;

                }


                if (
                    text
                ) {

                    text.textContent =
                        data.text;

                }


                if (
                    percent
                ) {

                    percent.textContent =
                        data.percent;

                }


                showToast(
                    `Acorde ${data.title}`
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

        icon:
            "🍊",

        title:
            "Abertura fresca",

        text:
            "Cítricos e frutas aparecem primeiro."

    },


    {

        max: 3,

        icon:
            "🌸",

        title:
            "Coração floral",

        text:
            "As flores assumem o centro da fragrância."

    },


    {

        max: 5,

        icon:
            "♡",

        title:
            "Romântico e confortável",

        text:
            "O floral fica mais macio e envolvente."

    },


    {

        max: 8,

        icon:
            "✨",

        title:
            "Fundo aconchegante",

        text:
            "Âmbar, madeiras e notas doces permanecem."

    }

];



/* =========================================================
   ATUALIZAR TIMELINE
========================================================= */

function updateTimeline() {

    if (
        !timelineSlider
    ) {

        return;

    }


    const value =
        Number(
            timelineSlider
                .value
        );


    if (
        timelineHour
    ) {

        timelineHour.textContent =
            `${value}h`;

    }


    const stage =
        timelineStages.find(
            item => {

                return (
                    value <=
                    item.max
                );

            }
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


timelineSlider
    ?.addEventListener(
        "input",
        updateTimeline
    );


updateTimeline();



/* =========================================================
   TIMELINE AUTOMÁTICA
========================================================= */

let timelineInterval =
    null;


function toggleTimelineAuto() {

    state.timelineAuto =
        !state.timelineAuto;


    if (
        state.timelineAuto
    ) {

        if (
            !timelineSlider
        ) {

            return;

        }


        timelineSlider.value =
            0;


        updateTimeline();


        timelineInterval =
            setInterval(
                () => {

                    let value =
                        Number(
                            timelineSlider
                                .value
                        );


                    value++;


                    if (
                        value >
                        8
                    ) {

                        value =
                            0;

                    }


                    timelineSlider.value =
                        value;


                    updateTimeline();

                },
                1000
            );


        showToast(
            "Timeline automática ativada"
        );

    } else {

        clearInterval(
            timelineInterval
        );


        timelineInterval =
            null;


        showToast(
            "Timeline automática desativada"
        );

    }


    saveState();

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


let galleryTimer =
    null;



/* =========================================================
   MOVIMENTAR GALERIA
========================================================= */

function galleryMove(
    direction
) {

    if (
        !galleryTrack
    ) {

        return;

    }


    const item =
        $(
            ".gallery-item",
            galleryTrack
        );


    if (
        !item
    ) {

        return;

    }


    galleryTrack.scrollBy({

        left:
            direction *
            (
                item.offsetWidth +
                18
            ),

        behavior:
            "smooth"

    });

}



/* =========================================================
   SETAS GALERIA
========================================================= */

galleryPrev
    ?.addEventListener(
        "click",
        () => {

            galleryMove(
                -1
            );

        }
    );


galleryNext
    ?.addEventListener(
        "click",
        () => {

            galleryMove(
                1
            );

        }
    );



/* =========================================================
   AUTOPLAY GALERIA
========================================================= */

galleryAutoplay
    ?.addEventListener(
        "click",
        () => {

            if (
                galleryTimer
            ) {

                clearInterval(
                    galleryTimer
                );


                galleryTimer =
                    null;


                galleryAutoplay.textContent =
                    "▶ Autoplay";


                showToast(
                    "Autoplay pausado"
                );


                return;

            }


            galleryTimer =
                setInterval(
                    () => {

                        if (
                            !galleryTrack
                        ) {

                            return;

                        }


                        const max =
                            galleryTrack
                                .scrollWidth -
                            galleryTrack
                                .clientWidth;


                        if (
                            galleryTrack
                                .scrollLeft >=
                            max -
                            20
                        ) {

                            galleryTrack.scrollTo({

                                left:
                                    0,

                                behavior:
                                    "smooth"

                            });

                        } else {

                            galleryMove(
                                1
                            );

                        }

                    },
                    3500
                );


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

$$(
    ".gallery-item img"
).forEach(
    image => {

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


                lightboxImage.alt =
                    image.alt ||
                    "Imagem Dream";


                lightbox
                    .classList
                    .add(
                        "open"
                    );


                lightbox
                    .setAttribute(
                        "aria-hidden",
                        "false"
                    );


                body
                    .classList
                    .add(
                        "modal-open"
                    );

            }
        );

    }
);



/* =========================================================
   FECHAR LIGHTBOX
========================================================= */

function closeLightbox() {

    lightbox
        ?.classList
        .remove(
            "open"
        );


    lightbox
        ?.setAttribute(
            "aria-hidden",
            "true"
        );


    if (
        !productModal
            ?.classList
            .contains(
                "open"
            ) &&
        !noteModal
            ?.classList
            .contains(
                "open"
            )
    ) {

        body
            .classList
            .remove(
                "modal-open"
            );

    }

}


$("#lightboxClose")
    ?.addEventListener(
        "click",
        closeLightbox
    );


$("#lightboxBackdrop")
    ?.addEventListener(
        "click",
        closeLightbox
    );



/* =========================================================
   MOODS
========================================================= */

const moods = {

    romantico: {

        primary:
            "#df76a8",

        secondary:
            "#9562dc"

    },


    sonhador: {

        primary:
            "#a78bfa",

        secondary:
            "#60a5fa"

    },


    noturno: {

        primary:
            "#7c3aed",

        secondary:
            "#312e81"

    },


    energia: {

        primary:
            "#fb7185",

        secondary:
            "#f59e0b"

    },


    calmo: {

        primary:
            "#5eead4",

        secondary:
            "#60a5fa"

    }

};



/* =========================================================
   APLICAR MOOD
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
                    item => {

                        item
                            .classList
                            .remove(
                                "active"
                            );

                    }
                );


                button
                    .classList
                    .add(
                        "active"
                    );


                const mood =
                    moods[
                        button
                            .dataset
                            .mood
                    ];


                if (
                    !mood
                ) {

                    return;

                }


                applyColors(
                    mood.primary,
                    mood.secondary
                );


                showToast(
                    `Mood ${
                        button
                            .textContent
                            .trim()
                    } ativado`
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


const quizQuestion =
    $("#quizQuestion");


const quizOptions =
    $("#quizOptions");


const quizStep =
    $("#quizStep");


const quizProgressBar =
    $("#quizProgressBar");



/* =========================================================
   PERGUNTAS DO QUIZ
========================================================= */

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



/* =========================================================
   RESULTADOS DO QUIZ
========================================================= */

const quizResults = {

    romantico: {

        icon:
            "♡",

        title:
            "Dream Lover",

        text:
            "Seu perfil é romântico, delicado e apaixonado pelos pequenos detalhes."

    },


    sonhador: {

        icon:
            "☾",

        title:
            "Dreamer",

        text:
            "Você gosta de imaginar, criar e transformar momentos em lembranças."

    },


    energia: {

        icon:
            "✦",

        title:
            "Dream Energy",

        text:
            "Você tem uma personalidade vibrante, marcante e cheia de energia."

    },


    calmo: {

        icon:
            "☁",

        title:
            "Soft Dream",

        text:
            "Você valoriza conforto, tranquilidade e momentos leves."

    }

};



/* =========================================================
   ESTADO DO QUIZ
========================================================= */

let quizIndex =
    0;


let quizScore =
    {};



/* =========================================================
   INICIAR QUIZ
========================================================= */

function startQuizGame() {

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

    const item =
        quizData[
            quizIndex
        ];


    if (
        !item ||
        !quizQuestion ||
        !quizStep ||
        !quizProgressBar ||
        !quizOptions
    ) {

        return;

    }


    quizQuestion.textContent =
        item.question;


    quizStep.textContent =
        `${
            quizIndex +
            1
        } / ${
            quizData.length
        }`;


    quizProgressBar
        .style
        .width =
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


    quizOptions.innerHTML =
        "";


    item.options.forEach(
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
            ) => {

                return (
                    b[1] -
                    a[1]
                );

            }
        )[0][0];


    const result =
        quizResults[
            winner
        ];


    const resultIcon =
        $("#quizResultIcon");


    const resultTitle =
        $("#quizResultTitle");


    const resultText =
        $("#quizResultText");


    if (
        resultIcon
    ) {

        resultIcon.textContent =
            result.icon;

    }


    if (
        resultTitle
    ) {

        resultTitle.textContent =
            result.title;

    }


    if (
        resultText
    ) {

        resultText.textContent =
            result.text;

    }


    localStorage.setItem(
        "dreamQuizResult",
        winner
    );


    unlockAchievement(
        "Perfil Descoberto"
    );


    createConfetti();


    showToast(
        `Seu perfil: ${result.title}`
    );

}



/* =========================================================
   BOTÕES DO QUIZ
========================================================= */

$("#startQuiz")
    ?.addEventListener(
        "click",
        startQuizGame
    );


$("#restartQuiz")
    ?.addEventListener(
        "click",
        startQuizGame
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

        setTimeout(
            () => {

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

            },
            i * 25
        );

    }

}
/* =========================================================
   DREAM STUDIO
========================================================= */

settingsButton
    ?.addEventListener(
        "click",
        () => {

            settingsPanel
                ?.classList
                .add(
                    "open"
                );

        }
    );


closeSettings
    ?.addEventListener(
        "click",
        () => {

            settingsPanel
                ?.classList
                .remove(
                    "open"
                );

        }
    );



/* =========================================================
   FECHAR DREAM STUDIO AO CLICAR FORA
========================================================= */

document.addEventListener(
    "mousedown",
    event => {

        if (
            !settingsPanel ||
            !settingsButton
        ) {

            return;

        }


        if (
            !settingsPanel
                .classList
                .contains(
                    "open"
                )
        ) {

            return;

        }


        if (
            settingsPanel
                .contains(
                    event.target
                )
        ) {

            return;

        }


        if (
            settingsButton
                .contains(
                    event.target
                )
        ) {

            return;

        }


        settingsPanel
            .classList
            .remove(
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



/* =========================================================
   HEX PARA RGB
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
                    char => {

                        return (
                            char +
                            char
                        );

                    }
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


    const metaTheme =
        $(
            'meta[name="theme-color"]'
        );


    metaTheme
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
   PALETAS
========================================================= */

$$(
    ".palette"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const palette =
                    palettes[
                        button
                            .dataset
                            .palette
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

                        item
                            .classList
                            .remove(
                                "active"
                            );

                    }
                );


                button
                    .classList
                    .add(
                        "active"
                    );


                applyColors(
                    palette[0],
                    palette[1]
                );


                localStorage.setItem(
                    "dreamPalette",
                    button
                        .dataset
                        .palette
                );


                showToast(
                    `Paleta ${
                        button
                            .textContent
                            .trim()
                    } aplicada`
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
                $("#secondaryColor")
                    ?.value ||
                "#9562dc";


            applyColors(
                event.target.value,
                secondary
            );


            clearPaletteSelection();

        }
    );


$("#secondaryColor")
    ?.addEventListener(
        "input",
        event => {

            const primary =
                $("#primaryColor")
                    ?.value ||
                "#df76a8";


            applyColors(
                primary,
                event.target.value
            );


            clearPaletteSelection();

        }
    );


function clearPaletteSelection() {

    $$(
        ".palette"
    ).forEach(
        item => {

            item
                .classList
                .remove(
                    "active"
                );

        }
    );


    localStorage.removeItem(
        "dreamPalette"
    );

}



/* =========================================================
   MODO ESCURO
========================================================= */

const darkToggle =
    $("#darkToggle");


const themeButton =
    $("#themeButton");


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


darkToggle
    ?.addEventListener(
        "change",
        event => {

            setDarkMode(
                event
                    .target
                    .checked
            );

        }
    );


themeButton
    ?.addEventListener(
        "click",
        () => {

            setDarkMode(
                !body
                    .classList
                    .contains(
                        "dark"
                    )
            );

        }
    );



/* =========================================================
   PARTÍCULAS
========================================================= */

const particlesToggle =
    $("#particlesToggle");


function setParticlesEnabled(
    enabled,
    save = true
) {

    state.particles =
        enabled;


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

        saveState();

    }

}


particlesToggle
    ?.addEventListener(
        "change",
        event => {

            setParticlesEnabled(
                event
                    .target
                    .checked
            );

        }
    );



/* =========================================================
   ANIMAÇÕES
========================================================= */

const animationsToggle =
    $("#animationsToggle");


function setAnimationsEnabled(
    enabled,
    save = true
) {

    state.animations =
        enabled;


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

        saveState();

    }

}


animationsToggle
    ?.addEventListener(
        "change",
        event => {

            setAnimationsEnabled(
                event
                    .target
                    .checked
            );

        }
    );



/* =========================================================
   GLASS
========================================================= */

const glassToggle =
    $("#glassToggle");


function setGlassEnabled(
    enabled,
    save = true
) {

    state.glass =
        enabled;


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

        saveState();

    }

}


glassToggle
    ?.addEventListener(
        "change",
        event => {

            setGlassEnabled(
                event
                    .target
                    .checked
            );

        }
    );



/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorToggle =
    $("#cursorToggle");


function setCursorEnabled(
    enabled,
    save = true
) {

    state.cursor =
        enabled;


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

        saveState();

    }

}


cursorToggle
    ?.addEventListener(
        "change",
        event => {

            setCursorEnabled(
                event
                    .target
                    .checked
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

            button
                .classList
                .toggle(
                    "active",

                    button
                        .dataset
                        .fontSize ===
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
                    button
                        .dataset
                        .fontSize
                );

            }
        );

    }
);



/* =========================================================
   GERAR PARTÍCULAS
========================================================= */

function generateParticles() {

    if (
        !particles
    ) {

        return;

    }


    particles.innerHTML =
        "";


    const symbols = [

        "♡",

        "✦",

        "·",

        "✿",

        "✧"

    ];


    for (
        let i = 0;
        i <
        state.particleAmount;
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


        particles.appendChild(
            particle
        );

    }

}


generateParticles();



/* =========================================================
   CRIAR CONTROLES AVANÇADOS
========================================================= */

function createAdvancedSettings() {

    if (
        !settingsPanel
    ) {

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
                    id="randomPaletteSettingsButton"
                    type="button"
                >
                    <span>🎲</span>
                    <strong>Paleta aleatória</strong>
                </button>


                <button
                    class="settings-action"
                    id="focusModeSettingsButton"
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
                    id="surpriseSettingsButton"
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


    if (
        resetButton
    ) {

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
   HELPER PARA SLIDERS
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


            const output =
                callback(
                    value
                );


            label.textContent =
                output;


            saveState();

        }
    );

}



/* =========================================================
   CONECTAR CONTROLES AVANÇADOS
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
            toggleClickHearts
        );


    $("#auroraButton")
        ?.addEventListener(
            "click",
            toggleAurora
        );


    $("#gradientButton")
        ?.addEventListener(
            "click",
            toggleAnimatedGradient
        );


    $("#ultimateButton")
        ?.addEventListener(
            "click",
            toggleUltimate
        );


    $("#autoRotateButton")
        ?.addEventListener(
            "click",
            toggleAutoRotate
        );


    $("#reflectionButton")
        ?.addEventListener(
            "click",
            toggleReflection
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


    $("#randomPaletteSettingsButton")
        ?.addEventListener(
            "click",
            randomPalette
        );


    $("#focusModeSettingsButton")
        ?.addEventListener(
            "click",
            toggleFocusMode
        );


    $("#photoModeButton")
        ?.addEventListener(
            "click",
            activatePhotoMode
        );


    $("#surpriseSettingsButton")
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
                value /
                100;


            root.style.setProperty(
                "--bottle-scale",
                state.bottleScale
            );


            return (
                `${value}%`
            );

        }

    );


    bindRange(

        "#bottleBrightnessRange",

        "#bottleBrightnessValue",

        value => {

            state.bottleBrightness =
                value /
                100;


            root.style.setProperty(
                "--bottle-brightness",
                state.bottleBrightness
            );


            return (
                `${value}%`
            );

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


            return (
                `${value}°`
            );

        }

    );


    bindRange(

        "#particleAmountRange",

        "#particleAmountValue",

        value => {

            state.particleAmount =
                value;


            generateParticles();


            return (
                String(
                    value
                )
            );

        }

    );


    bindRange(

        "#glowRange",

        "#glowValue",

        value => {

            state.glowStrength =
                value /
                100;


            root.style.setProperty(
                "--glow-strength",
                state.glowStrength
            );


            return (
                `${value}%`
            );

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


            return (
                `${value}px`
            );

        }

    );


    bindRange(

        "#pageBrightnessRange",

        "#pageBrightnessValue",

        value => {

            state.pageBrightness =
                value /
                100;


            root.style.setProperty(
                "--page-brightness",
                state.pageBrightness
            );


            return (
                `${value}%`
            );

        }

    );

}



/* =========================================================
   ATUALIZAR BOTÕES DE EFEITO
========================================================= */

function updateAdvancedButtons() {

    const map = [

        [
            "#petalsButton",
            state.petals
        ],

        [
            "#starsButton",
            state.stars
        ],

        [
            "#heartsButton",
            state.hearts
        ],

        [
            "#auroraButton",
            state.aurora
        ],

        [
            "#gradientButton",
            state.gradient
        ],

        [
            "#ultimateButton",
            state.ultimate
        ],

        [
            "#autoRotateButton",
            state.autoRotate
        ],

        [
            "#reflectionButton",
            state.reflection
        ]

    ];


    map.forEach(
        item => {

            const button =
                $(
                    item[0]
                );


            button
                ?.classList
                .toggle(
                    "active",
                    item[1]
                );

        }
    );

}



/* =========================================================
   PÉTALAS
========================================================= */

let petalsInterval =
    null;


function togglePetals() {

    state.petals =
        !state.petals;


    if (
        state.petals
    ) {

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


    updateAdvancedButtons();


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


    body.appendChild(
        layer
    );


    petalsInterval =
        setInterval(
            createPetal,
            350
        );


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        setTimeout(
            createPetal,
            i * 120
        );

    }

}


function createPetal() {

    const layer =
        $(".petals-layer");


    if (
        !layer
    ) {

        return;

    }


    const petal =
        document.createElement(
            "span"
        );


    petal.className =
        "dream-petal";


    petal.style.left =
        `${
            Math.random() *
            100
        }%`;


    petal.style.setProperty(
        "--petal-duration",

        `${
            5 +
            Math.random() *
            5
        }s`
    );


    petal.style.setProperty(
        "--petal-x",

        `${
            -100 +
            Math.random() *
            200
        }px`
    );


    layer.appendChild(
        petal
    );


    setTimeout(
        () => {

            petal.remove();

        },
        11000
    );

}


function stopPetals() {

    clearInterval(
        petalsInterval
    );


    petalsInterval =
        null;


    $(".petals-layer")
        ?.remove();

}



/* =========================================================
   ESTRELAS
========================================================= */

function toggleStars() {

    state.stars =
        !state.stars;


    if (
        state.stars
    ) {

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


    updateAdvancedButtons();


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
            `${
                Math.random() *
                100
            }%`;


        star.style.top =
            `${
                Math.random() *
                100
            }%`;


        star.style.setProperty(
            "--star-size",

            `${
                1 +
                Math.random() *
                3
            }px`
        );


        star.style.setProperty(
            "--star-speed",

            `${
                1 +
                Math.random() *
                4
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
   CORAÇÕES NO CLIQUE
========================================================= */

function toggleClickHearts() {

    state.hearts =
        !state.hearts;


    updateClickHeartsButton();


    updateAdvancedButtons();


    saveState();


    showToast(
        state.hearts
            ? "Corações no clique ativados ♡"
            : "Corações no clique desativados"
    );

}


function updateClickHeartsButton() {

    const labButton =
        $("#clickHeartsButton");


    if (
        labButton
    ) {

        labButton.textContent =
            state.hearts
                ? "♥ Corações ON"
                : "♥ Corações OFF";

    }

}


document.addEventListener(
    "click",
    event => {

        if (
            !state.hearts
        ) {

            return;

        }


        if (
            event
                .target
                .closest(
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
        Math.random() >
        0.5
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
        () => {

            heart.remove();

        },
        1000
    );

}



/* =========================================================
   AURORA
========================================================= */

function toggleAurora() {

    state.aurora =
        !state.aurora;


    body.classList.toggle(
        "aurora-mode",
        state.aurora
    );


    updateAdvancedButtons();


    saveState();


    showToast(
        state.aurora
            ? "Aurora Dream ativada 🌈"
            : "Aurora desativada"
    );

}



/* =========================================================
   GRADIENTE ANIMADO
========================================================= */

function toggleAnimatedGradient() {

    state.gradient =
        !state.gradient;


    body.classList.toggle(
        "animated-gradient",
        state.gradient
    );


    updateAdvancedButtons();


    saveState();


    showToast(
        state.gradient
            ? "Gradiente animado ativado ✦"
            : "Gradiente animado desativado"
    );

}



/* =========================================================
   ROTAÇÃO AUTOMÁTICA
========================================================= */

function toggleAutoRotate() {

    state.autoRotate =
        !state.autoRotate;


    body.classList.toggle(
        "auto-rotate",
        state.autoRotate
    );


    resetBottleMouse();


    updateAdvancedButtons();


    saveState();


    showToast(
        state.autoRotate
            ? "Rotação automática ativada"
            : "Rotação automática desativada"
    );

}



/* =========================================================
   REFLEXO DO FRASCO
========================================================= */

function toggleReflection() {

    state.reflection =
        !state.reflection;


    body.classList.toggle(
        "bottle-reflection",
        state.reflection
    );


    updateAdvancedButtons();


    saveState();


    showToast(
        state.reflection
            ? "Reflexo ativado ✨"
            : "Reflexo desativado"
    );

}



/* =========================================================
   GIRAR FRASCO AGORA
========================================================= */

function spinBottle() {

    if (
        !mainBottle
    ) {

        return;

    }


    mainBottle
        .classList
        .remove(
            "spinning"
        );


    void mainBottle.offsetWidth;


    mainBottle
        .classList
        .add(
            "spinning"
        );


    setTimeout(
        () => {

            mainBottle
                .classList
                .remove(
                    "spinning"
                );

        },
        1100
    );

}



/* =========================================================
   EXPLOSÃO DE CORAÇÕES
========================================================= */

function activateLoveExplosion(
    amount = 70
) {

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
        i < amount;
        i++
    ) {

        setTimeout(
            () => {

                const heart =
                    document.createElement(
                        "span"
                    );


                heart.className =
                    "heart-rain";


                heart.textContent =
                    Math.random() >
                    0.5
                        ? "♡"
                        : "♥";


                heart.style.left =
                    `${
                        Math.random() *
                        100
                    }%`;


                heart.style.fontSize =
                    `${
                        15 +
                        Math.random() *
                        35
                    }px`;


                heart.style.setProperty(
                    "--heart-duration",

                    `${
                        3 +
                        Math.random() *
                        4
                    }s`
                );


                layer.appendChild(
                    heart
                );

            },
            i * 35
        );

    }


    setTimeout(
        () => {

            layer.remove();

        },
        8000
    );

}



/* =========================================================
   DREAM ULTIMATE
========================================================= */

function toggleUltimate() {

    state.ultimate =
        !state.ultimate;


    body.classList.toggle(
        "dream-ultimate",
        state.ultimate
    );


    if (
        state.ultimate
    ) {

        state.aurora =
            true;


        state.gradient =
            true;


        state.hearts =
            true;


        state.reflection =
            true;


        body.classList.add(
            "aurora-mode",
            "animated-gradient",
            "bottle-reflection"
        );


        if (
            !state.petals
        ) {

            state.petals =
                true;


            startPetals();

        }


        if (
            !state.stars
        ) {

            state.stars =
                true;


            startStars();

        }


        activateLoveExplosion(
            100
        );


        unlockAchievement(
            "Dream Ultimate"
        );


        showToast(
            "DREAM ULTIMATE ATIVADO 👑"
        );

    } else {

        body.classList.remove(
            "dream-ultimate"
        );


        showToast(
            "Dream Ultimate desativado"
        );

    }


    updateClickHeartsButton();


    updateAdvancedButtons();


    saveState();

}



/* =========================================================
   PALETA ALEATÓRIA
========================================================= */

function randomColor() {

    return (
        "#" +
        Math
            .floor(
                Math.random() *
                16777215
            )
            .toString(16)
            .padStart(
                6,
                "0"
            )
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


    const one =
        $("#randomColorOne");


    const two =
        $("#randomColorTwo");


    if (
        one
    ) {

        one.style.background =
            primary;

    }


    if (
        two
    ) {

        two.style.background =
            secondary;

    }


    showToast(
        "Nova paleta Dream 🎨"
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
        body
            .classList
            .contains(
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

function activatePhotoMode() {

    body.classList.add(
        "photo-mode"
    );


    settingsPanel
        ?.classList
        .remove(
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


    button.type =
        "button";


    button.textContent =
        "Sair do modo foto";


    button.addEventListener(
        "click",
        stopPhotoMode
    );


    body.appendChild(
        button
    );

}


function stopPhotoMode() {

    body.classList.remove(
        "photo-mode"
    );


    $("#exitPhotoMode")
        ?.remove();

}



/* =========================================================
   SURPRESA DREAM
========================================================= */

function surpriseDream() {

    const surprises = [

        () => {

            randomPalette();

        },

        () => {

            activateLoveExplosion();

        },

        () => {

            spinBottle();

            spray();

        },

        () => {

            if (
                !state.aurora
            ) {

                state.aurora =
                    true;


                body.classList.add(
                    "aurora-mode"
                );

            }


            showToast(
                "Aurora surpresa 🌈"
            );

        },

        () => {

            if (
                !state.petals
            ) {

                state.petals =
                    true;


                startPetals();

            }


            showToast(
                "Chuva de pétalas 🌸"
            );

        },

        () => {

            if (
                !state.stars
            ) {

                state.stars =
                    true;


                startStars();

            }


            showToast(
                "Um céu apareceu ✦"
            );

        }

    ];


    const surprise =
        surprises[
            Math.floor(
                Math.random() *
                surprises.length
            )
        ];


    surprise();


    updateAdvancedButtons();


    saveState();

}



/* =========================================================
   DESLIGAR EFEITOS EXTRAS
========================================================= */

function disableEffects() {

    state.petals =
        false;


    state.stars =
        false;


    state.hearts =
        false;


    state.aurora =
        false;


    state.gradient =
        false;


    state.autoRotate =
        false;


    state.reflection =
        false;


    state.ultimate =
        false;


    stopPetals();


    stopStars();


    body.classList.remove(
        "aurora-mode",
        "animated-gradient",
        "auto-rotate",
        "bottle-reflection",
        "dream-ultimate"
    );


    updateClickHeartsButton();


    updateAdvancedButtons();


    saveState();


    showToast(
        "Efeitos extras desligados"
    );

}



/* =========================================================
   CRIAR DREAM STUDIO AVANÇADO
========================================================= */

createAdvancedSettings();
/* =========================================================
   DREAM LAB
========================================================= */

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


/* =========================================================
   BOTÃO SURPRESA DO LAB
========================================================= */

$("#surpriseButton")
    ?.addEventListener(
        "click",
        () => {

            surpriseDream();

            unlockAchievement(
                "Dream Surprise"
            );

        }
    );


$("#surpriseSettingsButton")
    ?.addEventListener(
        "click",
        () => {

            surpriseDream();

        }
    );


/* =========================================================
   COPIAR PRODUTO
========================================================= */

$("#copyProduct")
    ?.addEventListener(
        "click",
        async () => {

            const text =
                "Dream Amor no Ar • Body Splash • 350 ml";


            try {

                await navigator
                    .clipboard
                    .writeText(
                        text
                    );


                showToast(
                    "Produto copiado ♡"
                );

            } catch {

                showToast(
                    text
                );

            }

        }
    );


/* =========================================================
   COPIAR PALETA
========================================================= */

$("#copyPalette")
    ?.addEventListener(
        "click",
        async () => {

            const styles =
                getComputedStyle(
                    root
                );


            const primary =
                styles
                    .getPropertyValue(
                        "--primary"
                    )
                    .trim();


            const secondary =
                styles
                    .getPropertyValue(
                        "--secondary"
                    )
                    .trim();


            const text =
                `${primary} • ${secondary}`;


            try {

                await navigator
                    .clipboard
                    .writeText(
                        text
                    );


                showToast(
                    "Cores copiadas 🎨"
                );

            } catch {

                showToast(
                    text
                );

            }

        }
    );


/* =========================================================
   WHATSAPP
========================================================= */

$("#whatsappShare")
    ?.addEventListener(
        "click",
        () => {

            const text =
                encodeURIComponent(
                    "Dream Amor no Ar ♡ " +
                    window.location.href
                );


            const url =
                `https://wa.me/?text=${text}`;


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );


/* =========================================================
   BAIXAR FICHA DO PRODUTO
========================================================= */

$("#downloadSheet")
    ?.addEventListener(
        "click",
        () => {

            const content = `
DREAM AMOR NO AR

Produto:
Body Splash

Volume:
350 ml

Perfil:
Floral Amadeirado

Notas de saída:
Bergamota
Laranja
Mandarina
Limão
Cassis
Maçã

Notas de corpo:
Rosa
Tília
Frésia
Flor de Lótus
Gardênia
Pêssego

Notas de fundo:
Âmbar
Sândalo
Baunilha
Tonka
Musk

Projeto demonstrativo não oficial.
`;


            const blob =
                new Blob(
                    [
                        content
                    ],
                    {
                        type:
                            "text/plain;charset=utf-8"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                "dream-amor-no-ar-ficha.txt";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            URL.revokeObjectURL(
                url
            );


            showToast(
                "Ficha criada ↓"
            );


            unlockAchievement(
                "Colecionador Dream"
            );

        }
    );


/* =========================================================
   MODO FOCO NO LAB
========================================================= */

$("#focusMode")
    ?.addEventListener(
        "click",
        toggleFocusMode
    );


/* =========================================================
   TELA CHEIA
========================================================= */

$("#fullscreenButton")
    ?.addEventListener(
        "click",
        toggleFullscreen
    );


async function toggleFullscreen() {

    try {

        if (
            !document.fullscreenElement
        ) {

            await document
                .documentElement
                .requestFullscreen();


            showToast(
                "Tela cheia ativada"
            );

        } else {

            await document
                .exitFullscreen();


            showToast(
                "Tela cheia desativada"
            );

        }

    } catch {

        showToast(
            "Tela cheia não disponível"
        );

    }

}


/* =========================================================
   TEMA AUTOMÁTICO
========================================================= */

let autoTheme =
    false;


let autoThemeTimer =
    null;


$("#autoThemeButton")
    ?.addEventListener(
        "click",
        toggleAutoTheme
    );


function toggleAutoTheme() {

    autoTheme =
        !autoTheme;


    const button =
        $("#autoThemeButton");


    if (
        button
    ) {

        button.textContent =
            autoTheme
                ? "◐ Tema auto ON"
                : "◐ Tema automático";

    }


    if (
        autoTheme
    ) {

        applyAutomaticTheme();


        autoThemeTimer =
            setInterval(
                applyAutomaticTheme,
                60000
            );


        showToast(
            "Tema automático ativado"
        );

    } else {

        clearInterval(
            autoThemeTimer
        );


        autoThemeTimer =
            null;


        showToast(
            "Tema automático desativado"
        );

    }

}


function applyAutomaticTheme() {

    const hour =
        new Date()
            .getHours();


    const dark =
        hour >= 18 ||
        hour < 7;


    setDarkMode(
        dark
    );

}


/* =========================================================
   MODAL DE ATALHOS
========================================================= */

const shortcutsModal =
    $("#shortcutsModal");


$("#shortcutsButton")
    ?.addEventListener(
        "click",
        openShortcutsModal
    );


function openShortcutsModal() {

    shortcutsModal
        ?.classList
        .add(
            "open"
        );


    shortcutsModal
        ?.setAttribute(
            "aria-hidden",
            "false"
        );


    body.classList.add(
        "modal-open"
    );

}


function closeShortcutsModal() {

    shortcutsModal
        ?.classList
        .remove(
            "open"
        );


    shortcutsModal
        ?.setAttribute(
            "aria-hidden",
            "true"
        );


    if (
        !$(
            ".modal.open"
        )
    ) {

        body.classList.remove(
            "modal-open"
        );

    }

}


$$(
    ".close-shortcuts"
).forEach(
    button => {

        button.addEventListener(
            "click",
            closeShortcutsModal
        );

    }
);


/* =========================================================
   CORAÇÕES NO CLIQUE PELO LAB
========================================================= */

$("#clickHeartsButton")
    ?.addEventListener(
        "click",
        toggleClickHearts
    );


/* =========================================================
   SOM AMBIENTE
========================================================= */

let audioContext =
    null;


let ambientOscillator =
    null;


let ambientGain =
    null;


let ambientSound =
    false;


$("#ambientSoundButton")
    ?.addEventListener(
        "click",
        toggleAmbientSound
    );


function toggleAmbientSound() {

    if (
        ambientSound
    ) {

        stopAmbientSound();

        return;

    }


    try {

        audioContext =
            audioContext ||
            new AudioContext();


        ambientOscillator =
            audioContext
                .createOscillator();


        ambientGain =
            audioContext
                .createGain();


        ambientOscillator.type =
            "sine";


        ambientOscillator.frequency.value =
            196;


        ambientGain.gain.value =
            0.015;


        ambientOscillator.connect(
            ambientGain
        );


        ambientGain.connect(
            audioContext.destination
        );


        ambientOscillator.start();


        ambientSound =
            true;


        const button =
            $("#ambientSoundButton");


        if (
            button
        ) {

            button.textContent =
                "♫ Som ON";

        }


        showToast(
            "Som ambiente ativado ♫"
        );

    } catch {

        showToast(
            "Som ambiente não disponível"
        );

    }

}


function stopAmbientSound() {

    if (
        ambientOscillator
    ) {

        try {

            ambientOscillator.stop();

        } catch {}

    }


    ambientOscillator =
        null;


    ambientGain =
        null;


    ambientSound =
        false;


    const button =
        $("#ambientSoundButton");


    if (
        button
    ) {

        button.textContent =
            "♫ Som OFF";

    }


    showToast(
        "Som ambiente desativado"
    );

}


/* =========================================================
   ALTO CONTRASTE
========================================================= */

$("#highContrastButton")
    ?.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "high-contrast"
            );


            showToast(
                body
                    .classList
                    .contains(
                        "high-contrast"
                    )
                    ? "Alto contraste ativado"
                    : "Alto contraste desativado"
            );

        }
    );


/* =========================================================
   MODO LEITURA
========================================================= */

$("#readingModeButton")
    ?.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "reading-mode"
            );


            showToast(
                body
                    .classList
                    .contains(
                        "reading-mode"
                    )
                    ? "Modo leitura ativado"
                    : "Modo leitura desativado"
            );

        }
    );


/* =========================================================
   PALETA ALEATÓRIA DO LAB
========================================================= */

$("#randomPaletteButton")
    ?.addEventListener(
        "click",
        randomPalette
    );


/* =========================================================
   NOTA ALEATÓRIA
========================================================= */

$("#randomNoteButton")
    ?.addEventListener(
        "click",
        randomNote
    );


function randomNote() {

    const entries =
        Object.entries(
            notesData
        );


    if (
        !entries.length
    ) {

        return;

    }


    const [
        key,
        note
    ] =
        entries[
            Math.floor(
                Math.random() *
                entries.length
            )
        ];


    const icon =
        $("#randomNoteIcon");


    const title =
        $("#randomNoteTitle");


    const text =
        $("#randomNoteText");


    if (
        icon
    ) {

        icon.textContent =
            note.icon;

    }


    if (
        title
    ) {

        title.textContent =
            note.title;

    }


    if (
        text
    ) {

        text.textContent =
            note.text;

    }


    state.favoriteNote =
        key;


    showToast(
        `Nota sorteada: ${note.title}`
    );


    unlockAchievement(
        "Descobridor de Notas"
    );

}


/* =========================================================
   SEÇÃO ALEATÓRIA
========================================================= */

$("#randomSection")
    ?.addEventListener(
        "click",
        goToRandomSection
    );


$("#randomSectionLab")
    ?.addEventListener(
        "click",
        goToRandomSection
    );


function goToRandomSection() {

    const available =
        $$(
            ".section-track"
        ).filter(
            section => {

                return (
                    section.id !==
                    "inicio"
                );

            }
        );


    if (
        !available.length
    ) {

        return;

    }


    const section =
        available[
            Math.floor(
                Math.random() *
                available.length
            )
        ];


    section.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });


    showToast(
        `Indo para ${section.dataset.sectionName || section.id} ✦`
    );

}


/* =========================================================
   COPIAR LINK DA PÁGINA
========================================================= */

$("#copyPageLink")
    ?.addEventListener(
        "click",
        async () => {

            try {

                await navigator
                    .clipboard
                    .writeText(
                        window.location.href
                    );


                showToast(
                    "Link copiado 🔗"
                );

            } catch {

                showToast(
                    "Não foi possível copiar"
                );

            }

        }
    );


/* =========================================================
   COPIAR LINK DA SEÇÃO
========================================================= */

$("#copySectionLink")
    ?.addEventListener(
        "click",
        async () => {

            const url =
                `${window.location.origin}${window.location.pathname}#produto`;


            try {

                await navigator
                    .clipboard
                    .writeText(
                        url
                    );


                showToast(
                    "Link da seção copiado"
                );

            } catch {

                showToast(
                    url
                );

            }

        }
    );


/* =========================================================
   VIBRAÇÃO
========================================================= */

$("#vibrateButton")
    ?.addEventListener(
        "click",
        () => {

            if (
                navigator.vibrate
            ) {

                navigator.vibrate(
                    [
                        30,
                        40,
                        30,
                        40,
                        70
                    ]
                );


                showToast(
                    "Vibração Dream 〰"
                );

            } else {

                showToast(
                    "Vibração não disponível"
                );

            }

        }
    );


/* =========================================================
   FAQ
========================================================= */

$$(
    ".faq-question"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const item =
                    button.closest(
                        ".faq-item"
                    );


                if (
                    !item
                ) {

                    return;

                }


                toggleFaqItem(
                    item
                );

            }
        );

    }
);


function toggleFaqItem(
    item,
    force
) {

    const answer =
        $(".faq-answer", item);


    if (
        !answer
    ) {

        return;

    }


    const shouldOpen =
        typeof force ===
        "boolean"
            ? force
            : !item
                .classList
                .contains(
                    "open"
                );


    item.classList.toggle(
        "open",
        shouldOpen
    );


    if (
        shouldOpen
    ) {

        answer.style.maxHeight =
            `${
                answer.scrollHeight
            }px`;

    } else {

        answer.style.maxHeight =
            "0px";

    }

}


/* =========================================================
   ABRIR TODAS AS FAQS
========================================================= */

$("#openAllFaq")
    ?.addEventListener(
        "click",
        () => {

            $$(
                ".faq-item:not(.hidden)"
            ).forEach(
                item => {

                    toggleFaqItem(
                        item,
                        true
                    );

                }
            );

        }
    );


/* =========================================================
   FECHAR TODAS AS FAQS
========================================================= */

$("#closeAllFaq")
    ?.addEventListener(
        "click",
        () => {

            $$(
                ".faq-item"
            ).forEach(
                item => {

                    toggleFaqItem(
                        item,
                        false
                    );

                }
            );

        }
    );


/* =========================================================
   BUSCA FAQ
========================================================= */

$("#faqSearch")
    ?.addEventListener(
        "input",
        event => {

            const query =
                event
                    .target
                    .value
                    .trim()
                    .toLowerCase();


            let visible =
                0;


            $$(
                ".faq-item"
            ).forEach(
                item => {

                    const text =
                        item
                            .textContent
                            .toLowerCase();


                    const match =
                        text.includes(
                            query
                        );


                    item
                        .classList
                        .toggle(
                            "hidden",
                            !match
                        );


                    if (
                        match
                    ) {

                        visible++;

                    }

                }
            );


            const empty =
                $("#faqEmpty");


            empty
                ?.classList
                .toggle(
                    "show",
                    visible === 0
                );

        }
    );


/* =========================================================
   CONQUISTAS
========================================================= */

const achievementDefinitions = {

    "Curioso Dream": {
        icon: "✦",
        text:
            "Faça 10 interações."
    },

    "Explorador Dream": {
        icon: "🧭",
        text:
            "Faça 30 interações."
    },

    "Até o Fim ♡": {
        icon: "↓",
        text:
            "Explore praticamente toda a página."
    },

    "Primeiro Borrifo": {
        icon: "💨",
        text:
            "Use o borrifador."
    },

    "Dream Lover": {
        icon: "♡",
        text:
            "Favorite o produto."
    },

    "Perfumista": {
        icon: "✿",
        text:
            "Explore uma nota olfativa."
    },

    "Perfil Descoberto": {
        icon: "◉",
        text:
            "Finalize o quiz."
    },

    "Segredo do Frasco": {
        icon: "🧴",
        text:
            "Descubra o segredo escondido no frasco."
    },

    "Dream Ultimate": {
        icon: "👑",
        text:
            "Ative o Dream Ultimate."
    },

    "Dream Secret": {
        icon: "♡",
        text:
            "Descubra o código DREAM."
    },

    "Love Secret": {
        icon: "♥",
        text:
            "Descubra o código LOVE."
    },

    "350 Secret": {
        icon: "350",
        text:
            "Descubra o segredo 350."
    },

    "Dream Surprise": {
        icon: "🎁",
        text:
            "Use a surpresa Dream."
    },

    "Colecionador Dream": {
        icon: "↓",
        text:
            "Baixe a ficha Dream."
    },

    "Descobridor de Notas": {
        icon: "🌸",
        text:
            "Sorteie uma nota."
    }

};


/* =========================================================
   DESBLOQUEAR CONQUISTA
========================================================= */

function unlockAchievement(
    name
) {

    if (
        state
            .achievements
            .has(
                name
            )
    ) {

        return;

    }


    state
        .achievements
        .add(
            name
        );


    localStorage.setItem(
        "dreamAchievements",

        JSON.stringify(
            [
                ...state
                    .achievements
            ]
        )
    );


    showAchievementToast(
        name
    );


    renderAchievements();

}


/* =========================================================
   TOAST DE CONQUISTA
========================================================= */

let achievementToastTimer =
    null;


function showAchievementToast(
    name
) {

    const element =
        $("#achievementToast");


    const text =
        $("#achievementToastText");


    if (
        !element ||
        !text
    ) {

        showToast(
            `🏆 ${name}`
        );

        return;

    }


    text.textContent =
        name;


    element
        .classList
        .add(
            "show"
        );


    clearTimeout(
        achievementToastTimer
    );


    achievementToastTimer =
        setTimeout(
            () => {

                element
                    .classList
                    .remove(
                        "show"
                    );

            },
            3500
        );

}


/* =========================================================
   MODAL DE CONQUISTAS
========================================================= */

const achievementsModal =
    $("#achievementsModal");


function openAchievementsModal() {

    renderAchievements();


    achievementsModal
        ?.classList
        .add(
            "open"
        );


    achievementsModal
        ?.setAttribute(
            "aria-hidden",
            "false"
        );


    body.classList.add(
        "modal-open"
    );

}


function closeAchievementsModal() {

    achievementsModal
        ?.classList
        .remove(
            "open"
        );


    achievementsModal
        ?.setAttribute(
            "aria-hidden",
            "true"
        );


    if (
        !$(
            ".modal.open"
        )
    ) {

        body.classList.remove(
            "modal-open"
        );

    }

}


$$(
    ".close-achievements"
).forEach(
    button => {

        button.addEventListener(
            "click",
            closeAchievementsModal
        );

    }
);


/* =========================================================
   RENDERIZAR CONQUISTAS
========================================================= */

function renderAchievements() {

    const list =
        $("#achievementsList");


    if (
        !list
    ) {

        return;

    }


    list.innerHTML =
        "";


    Object.entries(
        achievementDefinitions
    ).forEach(
        (
            [
                name,
                data
            ]
        ) => {

            const unlocked =
                state
                    .achievements
                    .has(
                        name
                    );


            const item =
                document
                    .createElement(
                        "div"
                    );


            item.className =
                "achievement-item";


            item.style.opacity =
                unlocked
                    ? "1"
                    : "0.35";


            item.innerHTML = `

                <span>
                    ${unlocked ? data.icon : "🔒"}
                </span>

                <div>

                    <strong>
                        ${name}
                    </strong>

                    <small>
                        ${data.text}
                    </small>

                </div>

            `;


            list.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   ATALHO PARA CONQUISTAS
========================================================= */

$("#achievementButton")
    ?.addEventListener(
        "click",
        openAchievementsModal
    );


/* =========================================================
   ESTATÍSTICAS DA SESSÃO
========================================================= */

const sessionStart =
    Date.now();


function createStats() {

    const grid =
        $(".experience-grid");


    if (
        !grid ||
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

                <span>
                    ⏱
                </span>

                <strong id="sessionTime">
                    0:00
                </strong>

                <small>
                    no Dream
                </small>

            </div>

            <div class="session-stat">

                <span>
                    ♡
                </span>

                <strong id="interactionCount">
                    0
                </strong>

                <small>
                    interações
                </small>

            </div>

            <div class="session-stat">

                <span>
                    ↕
                </span>

                <strong id="explorePercent">
                    0%
                </strong>

                <small>
                    explorado
                </small>

            </div>

        </div>

    `;


    grid.appendChild(
        card
    );

}


/* =========================================================
   ATUALIZAR ESTATÍSTICAS
========================================================= */

function updateStats() {

    const elapsed =
        Math.floor(
            (
                Date.now() -
                sessionStart
            ) /
            1000
        );


    const minutes =
        Math.floor(
            elapsed /
            60
        );


    const seconds =
        String(
            elapsed %
            60
        ).padStart(
            2,
            "0"
        );


    const time =
        $("#sessionTime");


    const interactions =
        $("#interactionCount");


    const explored =
        $("#explorePercent");


    if (
        time
    ) {

        time.textContent =
            `${minutes}:${seconds}`;

    }


    if (
        interactions
    ) {

        interactions.textContent =
            state.interactions;

    }


    if (
        explored
    ) {

        explored.textContent =
            `${Math.round(state.maxScroll)}%`;

    }

}


createStats();


setInterval(
    updateStats,
    1000
);


/* =========================================================
   APRESENTAÇÃO AUTOMÁTICA
========================================================= */

let presentationTimer =
    null;


let presentationIndex =
    0;


$("#presentationButton")
    ?.addEventListener(
        "click",
        startPresentation
    );


$("#stopPresentation")
    ?.addEventListener(
        "click",
        stopPresentation
    );


function startPresentation() {

    stopPresentation();


    const available =
        $$(
            ".section-track"
        );


    if (
        !available.length
    ) {

        return;

    }


    presentationIndex =
        0;


    $("#presentationBadge")
        ?.classList
        .add(
            "show"
        );


    available[0]
        .scrollIntoView({

            behavior:
                "smooth"

        });


    presentationTimer =
        setInterval(
            () => {

                presentationIndex++;


                if (
                    presentationIndex >=
                    available.length
                ) {

                    presentationIndex =
                        0;

                }


                available[
                    presentationIndex
                ]
                    .scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

            },
            7000
        );


    showToast(
        "Modo apresentação iniciado ▶"
    );

}


/* =========================================================
   PARAR APRESENTAÇÃO
========================================================= */

function stopPresentation() {

    clearInterval(
        presentationTimer
    );


    presentationTimer =
        null;


    $("#presentationBadge")
        ?.classList
        .remove(
            "show"
        );

}


/* =========================================================
   EASTER EGGS DO TECLADO
========================================================= */

let typedSequence =
    "";


document.addEventListener(
    "keydown",
    event => {

        if (
            event
                .target
                .matches(
                    "input, textarea, select"
                )
        ) {

            return;

        }


        if (
            event.key.length ===
            1
        ) {

            typedSequence +=
                event.key
                    .toUpperCase();


            typedSequence =
                typedSequence
                    .slice(
                        -15
                    );

        }


        if (
            typedSequence
                .endsWith(
                    "DREAM"
                )
        ) {

            typedSequence =
                "";


            activateSecret(
                "♡"
            );


            activateLoveExplosion(
                100
            );


            unlockAchievement(
                "Dream Secret"
            );

        }


        if (
            typedSequence
                .endsWith(
                    "LOVE"
                )
        ) {

            typedSequence =
                "";


            activateSecret(
                "♥"
            );


            activateLoveExplosion(
                120
            );


            showToast(
                "LOVE MODE ♡"
            );


            unlockAchievement(
                "Love Secret"
            );

        }


        if (
            typedSequence
                .endsWith(
                    "350"
                )
        ) {

            typedSequence =
                "";


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


/* =========================================================
   TELA DO EASTER EGG
========================================================= */

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

            secret
                .classList
                .add(
                    "active"
                );

        }
    );


    setTimeout(
        () => {

            secret
                .classList
                .remove(
                    "active"
                );

        },
        900
    );


    setTimeout(
        () => {

            secret.remove();

        },
        1500
    );

}


/* =========================================================
   EASTER EGG DO LOGO
========================================================= */

let logoClicks =
    0;


let logoClickTimer =
    null;


$$(
    "[data-easter-logo]"
).forEach(
    logo => {

        logo.addEventListener(
            "click",
            () => {

                logoClicks++;


                clearTimeout(
                    logoClickTimer
                );


                logoClickTimer =
                    setTimeout(
                        () => {

                            logoClicks =
                                0;

                        },
                        1700
                    );


                if (
                    logoClicks >=
                    5
                ) {

                    logoClicks =
                        0;


                    randomPalette();


                    activateLoveExplosion(
                        80
                    );


                    spinBottle();


                    showToast(
                        "Dream Secret desbloqueado ♡"
                    );

                }

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

        if (
            event
                .target
                .matches(
                    "input, textarea, select"
                )
        ) {

            return;

        }


        const key =
            event.key
                .toLowerCase();


        if (
            key ===
            "p"
        ) {

            settingsPanel
                ?.classList
                .toggle(
                    "open"
                );

        }


        if (
            key ===
            "m"
        ) {

            setDarkMode(
                !body
                    .classList
                    .contains(
                        "dark"
                    )
            );

        }


        if (
            key ===
            "g"
        ) {

            $("#galeria")
                ?.scrollIntoView({

                    behavior:
                        "smooth"

                });

        }


        if (
            key ===
            "q"
        ) {

            $("#quiz")
                ?.scrollIntoView({

                    behavior:
                        "smooth"

                });

        }


        if (
            key ===
            "l"
        ) {

            $("#lab")
                ?.scrollIntoView({

                    behavior:
                        "smooth"

                });

        }


        if (
            key ===
            "s"
        ) {

            spray();

        }


        if (
            key ===
            "r"
        ) {

            goToRandomSection();

        }


        if (
            event.key ===
            "?"
        ) {

            openShortcutsModal();

        }

    }
);
/* =========================================================
   CORREÇÃO DA NOTA AMEIXA
========================================================= */

notesData.ameixa = {

    title:
        "Ameixa",

    icon:
        "🟣",

    text:
        "Uma nota frutada suculenta, macia e levemente adocicada."

};



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

        ultimate:
            state.ultimate,

        particleAmount:
            state.particleAmount,

        animationSpeed:
            state.animationSpeed,

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
            state.pageBrightness,

        timelineAuto:
            state.timelineAuto,

        favoriteNote:
            state.favoriteNote

    };


    localStorage.setItem(
        "dreamState",
        JSON.stringify(
            data
        )
    );

}



/* =========================================================
   CARREGAR CONQUISTAS
========================================================= */

function loadAchievements() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "dreamAchievements"
                )
            );


        if (
            Array.isArray(
                saved
            )
        ) {

            state.achievements =
                new Set(
                    saved
                );

        }

    } catch {

        state.achievements =
            new Set();

    }

}



/* =========================================================
   CARREGAR ESTADO
========================================================= */

function loadState() {

    /* -----------------------------------------------------
       CORES
    ----------------------------------------------------- */

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



    /* -----------------------------------------------------
       PALETA ATIVA
    ----------------------------------------------------- */

    const savedPalette =
        localStorage.getItem(
            "dreamPalette"
        );


    if (
        savedPalette
    ) {

        $$(
            ".palette"
        ).forEach(
            button => {

                button.classList.toggle(
                    "active",

                    button
                        .dataset
                        .palette ===
                        savedPalette
                );

            }
        );

    }



    /* -----------------------------------------------------
       DARK MODE
    ----------------------------------------------------- */

    const savedDark =
        localStorage.getItem(
            "dreamDark"
        );


    if (
        savedDark !==
        null
    ) {

        setDarkMode(
            savedDark ===
                "true",
            false
        );

    }



    /* -----------------------------------------------------
       TAMANHO DA FONTE
    ----------------------------------------------------- */

    const savedFont =
        localStorage.getItem(
            "dreamFont"
        );


    if (
        savedFont
    ) {

        setFontSize(
            savedFont,
            false
        );

    }



    /* -----------------------------------------------------
       ESTADO PRINCIPAL
    ----------------------------------------------------- */

    try {

        const savedState =
            JSON.parse(
                localStorage.getItem(
                    "dreamState"
                )
            );


        if (
            savedState &&
            typeof savedState ===
                "object"
        ) {

            Object.assign(
                state,
                savedState
            );

        }

    } catch {

        console.warn(
            "Não foi possível carregar as configurações Dream."
        );

    }



    /* -----------------------------------------------------
       NOTA FAVORITA
    ----------------------------------------------------- */

    const savedNote =
        localStorage.getItem(
            "dreamFavoriteNote"
        );


    if (
        savedNote
    ) {

        state.favoriteNote =
            savedNote;

    }



    loadAchievements();


    applyLoadedState();

}



/* =========================================================
   APLICAR ESTADO CARREGADO
========================================================= */

function applyLoadedState() {

    /* -----------------------------------------------------
       SWITCHES PRINCIPAIS
    ----------------------------------------------------- */

    setParticlesEnabled(
        state.particles,
        false
    );


    setAnimationsEnabled(
        state.animations,
        false
    );


    setGlassEnabled(
        state.glass,
        false
    );


    setCursorEnabled(
        state.cursor,
        false
    );



    /* -----------------------------------------------------
       EFEITOS DE FUNDO
    ----------------------------------------------------- */

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


    body.classList.toggle(
        "dream-ultimate",
        state.ultimate
    );



    /* -----------------------------------------------------
       FRASCO
    ----------------------------------------------------- */

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



    /* -----------------------------------------------------
       INTENSIDADE
    ----------------------------------------------------- */

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


    root.style.setProperty(
        "--animation-speed",
        state.animationSpeed
    );



    /* -----------------------------------------------------
       PÉTALAS
    ----------------------------------------------------- */

    if (
        state.petals
    ) {

        startPetals();

    } else {

        stopPetals();

    }



    /* -----------------------------------------------------
       ESTRELAS
    ----------------------------------------------------- */

    if (
        state.stars
    ) {

        startStars();

    } else {

        stopStars();

    }



    /* -----------------------------------------------------
       PARTÍCULAS
    ----------------------------------------------------- */

    generateParticles();



    /* -----------------------------------------------------
       BOTÕES
    ----------------------------------------------------- */

    updateClickHeartsButton();


    updateAdvancedButtons();


    updateAdvancedControls();



    /* -----------------------------------------------------
       CONQUISTAS
    ----------------------------------------------------- */

    renderAchievements();

}



/* =========================================================
   ATUALIZAR SLIDERS DO DREAM STUDIO
========================================================= */

function updateAdvancedControls() {

    const scaleRange =
        $("#bottleScaleRange");


    const scaleValue =
        $("#bottleScaleValue");


    if (
        scaleRange
    ) {

        scaleRange.value =
            Math.round(
                state.bottleScale *
                100
            );

    }


    if (
        scaleValue
    ) {

        scaleValue.textContent =
            `${
                Math.round(
                    state.bottleScale *
                    100
                )
            }%`;

    }



    /* -----------------------------------------------------
       BRILHO DO FRASCO
    ----------------------------------------------------- */

    const brightnessRange =
        $("#bottleBrightnessRange");


    const brightnessValue =
        $("#bottleBrightnessValue");


    if (
        brightnessRange
    ) {

        brightnessRange.value =
            Math.round(
                state.bottleBrightness *
                100
            );

    }


    if (
        brightnessValue
    ) {

        brightnessValue.textContent =
            `${
                Math.round(
                    state.bottleBrightness *
                    100
                )
            }%`;

    }



    /* -----------------------------------------------------
       ROTAÇÃO
    ----------------------------------------------------- */

    const rotationRange =
        $("#bottleRotationRange");


    const rotationValue =
        $("#bottleRotationValue");


    if (
        rotationRange
    ) {

        rotationRange.value =
            state.bottleRotation;

    }


    if (
        rotationValue
    ) {

        rotationValue.textContent =
            `${state.bottleRotation}°`;

    }



    /* -----------------------------------------------------
       QUANTIDADE DE PARTÍCULAS
    ----------------------------------------------------- */

    const particleRange =
        $("#particleAmountRange");


    const particleValue =
        $("#particleAmountValue");


    if (
        particleRange
    ) {

        particleRange.value =
            state.particleAmount;

    }


    if (
        particleValue
    ) {

        particleValue.textContent =
            state.particleAmount;

    }



    /* -----------------------------------------------------
       GLOW
    ----------------------------------------------------- */

    const glowRange =
        $("#glowRange");


    const glowValue =
        $("#glowValue");


    if (
        glowRange
    ) {

        glowRange.value =
            Math.round(
                state.glowStrength *
                100
            );

    }


    if (
        glowValue
    ) {

        glowValue.textContent =
            `${
                Math.round(
                    state.glowStrength *
                    100
                )
            }%`;

    }



    /* -----------------------------------------------------
       GLASS BLUR
    ----------------------------------------------------- */

    const blurRange =
        $("#blurRange");


    const blurValue =
        $("#blurValue");


    if (
        blurRange
    ) {

        blurRange.value =
            state.glassBlur;

    }


    if (
        blurValue
    ) {

        blurValue.textContent =
            `${state.glassBlur}px`;

    }



    /* -----------------------------------------------------
       BRILHO DA PÁGINA
    ----------------------------------------------------- */

    const pageBrightnessRange =
        $("#pageBrightnessRange");


    const pageBrightnessValue =
        $("#pageBrightnessValue");


    if (
        pageBrightnessRange
    ) {

        pageBrightnessRange.value =
            Math.round(
                state.pageBrightness *
                100
            );

    }


    if (
        pageBrightnessValue
    ) {

        pageBrightnessValue.textContent =
            `${
                Math.round(
                    state.pageBrightness *
                    100
                )
            }%`;

    }

}



/* =========================================================
   RESET COMPLETO
========================================================= */

function resetDreamSettings() {

    /* -----------------------------------------------------
       PARAR INTERVALOS
    ----------------------------------------------------- */

    clearInterval(
        timelineInterval
    );


    timelineInterval =
        null;


    state.timelineAuto =
        false;


    clearInterval(
        galleryTimer
    );


    galleryTimer =
        null;


    if (
        galleryAutoplay
    ) {

        galleryAutoplay.textContent =
            "▶ Autoplay";

    }


    stopPresentation();


    stopPetals();


    stopStars();


    stopAmbientSound();


    clearInterval(
        autoThemeTimer
    );


    autoThemeTimer =
        null;


    autoTheme =
        false;



    /* -----------------------------------------------------
       ESTADO PADRÃO
    ----------------------------------------------------- */

    state.particles =
        true;


    state.animations =
        true;


    state.glass =
        true;


    state.cursor =
        true;


    state.petals =
        false;


    state.stars =
        false;


    state.hearts =
        false;


    state.aurora =
        false;


    state.gradient =
        false;


    state.autoRotate =
        false;


    state.reflection =
        false;


    state.ultimate =
        false;


    state.particleAmount =
        25;


    state.animationSpeed =
        1;


    state.glowStrength =
        1;


    state.bottleScale =
        1;


    state.bottleBrightness =
        1;


    state.bottleRotation =
        0;


    state.glassBlur =
        20;


    state.pageBrightness =
        1;


    state.favoriteNote =
        null;



    /* -----------------------------------------------------
       REMOVER CLASSES
    ----------------------------------------------------- */

    body.classList.remove(

        "dark",

        "no-particles",

        "no-animations",

        "no-glass",

        "no-cursor",

        "aurora-mode",

        "animated-gradient",

        "auto-rotate",

        "bottle-reflection",

        "dream-ultimate",

        "focus-mode",

        "photo-mode",

        "high-contrast",

        "reading-mode",

        "font-small",

        "font-large"

    );


    body.classList.add(
        "font-normal"
    );



    /* -----------------------------------------------------
       VARIÁVEIS CSS
    ----------------------------------------------------- */

    root.style.setProperty(
        "--bottle-scale",
        "1"
    );


    root.style.setProperty(
        "--bottle-brightness",
        "1"
    );


    root.style.setProperty(
        "--bottle-rotation",
        "0deg"
    );


    root.style.setProperty(
        "--glow-strength",
        "1"
    );


    root.style.setProperty(
        "--glass-blur",
        "20px"
    );


    root.style.setProperty(
        "--page-brightness",
        "1"
    );


    root.style.setProperty(
        "--animation-speed",
        "1"
    );


    resetBottleMouse();



    /* -----------------------------------------------------
       CORES
    ----------------------------------------------------- */

    applyColors(
        "#df76a8",
        "#9562dc",
        false
    );



    /* -----------------------------------------------------
       PALETA DREAM
    ----------------------------------------------------- */

    $$(
        ".palette"
    ).forEach(
        button => {

            button.classList.toggle(
                "active",

                button
                    .dataset
                    .palette ===
                    "dream"
            );

        }
    );



    /* -----------------------------------------------------
       SWITCHES
    ----------------------------------------------------- */

    setDarkMode(
        false,
        false
    );


    setParticlesEnabled(
        true,
        false
    );


    setAnimationsEnabled(
        true,
        false
    );


    setGlassEnabled(
        true,
        false
    );


    setCursorEnabled(
        true,
        false
    );


    setFontSize(
        "normal",
        false
    );



    /* -----------------------------------------------------
       FOTO
    ----------------------------------------------------- */

    stopPhotoMode();



    /* -----------------------------------------------------
       BOTÕES
    ----------------------------------------------------- */

    updateClickHeartsButton();


    updateAdvancedButtons();


    updateAdvancedControls();



    /* -----------------------------------------------------
       PARTÍCULAS
    ----------------------------------------------------- */

    generateParticles();



    /* -----------------------------------------------------
       LOCAL STORAGE
    ----------------------------------------------------- */

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
        "dreamPalette"
    );


    localStorage.removeItem(
        "dreamDark"
    );


    localStorage.removeItem(
        "dreamFont"
    );


    localStorage.removeItem(
        "dreamFavoriteNote"
    );



    showToast(
        "Configurações restauradas ♡"
    );

}



/* =========================================================
   BOTÃO RESET
========================================================= */

$("#resetSettings")
    ?.addEventListener(
        "click",
        resetDreamSettings
    );



/* =========================================================
   FAVORITO DA NOTA
========================================================= */

function highlightFavoriteNote() {

    $$(
        ".note-chip"
    ).forEach(
        chip => {

            const active =
                chip
                    .dataset
                    .note ===
                state.favoriteNote;


            chip.classList.toggle(
                "favorite-note",
                active
            );

        }
    );

}



/* =========================================================
   DUPLO CLIQUE NO FRASCO
========================================================= */

mainBottle
    ?.addEventListener(
        "dblclick",
        () => {

            spinBottle();


            showToast(
                "Dream Spin ✦"
            );

        }
    );



/* =========================================================
   REDIMENSIONAMENTO
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            1100
        ) {

            menu
                ?.classList
                .remove(
                    "open"
                );

        }



        $$(
            ".faq-item.open"
        ).forEach(
            item => {

                const answer =
                    $(
                        ".faq-answer",
                        item
                    );


                if (
                    answer
                ) {

                    answer.style.maxHeight =
                        `${
                            answer.scrollHeight
                        }px`;

                }

            }
        );

    }
);



/* =========================================================
   REDUCED MOTION
========================================================= */

function applyReducedMotionPreference() {

    const media =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        media.matches &&
        localStorage.getItem(
            "dreamState"
        ) ===
        null
    ) {

        state.animations =
            false;


        setAnimationsEnabled(
            false,
            false
        );

    }

}



/* =========================================================
   PREVENIR LINKS #
========================================================= */

$$(
    'a[href="#"]'
).forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    }
);



/* =========================================================
   SINCRONIZAR FAQ INICIAL
========================================================= */

function initializeFaq() {

    $$(
        ".faq-item"
    ).forEach(
        item => {

            const answer =
                $(
                    ".faq-answer",
                    item
                );


            if (
                answer
            ) {

                answer.style.maxHeight =
                    "0px";

            }

        }
    );

}



/* =========================================================
   INICIALIZAR RODA OLFATIVA
========================================================= */

function initializeWheel() {

    const first =
        $(
            '[data-wheel="floral"]'
        );


    first
        ?.classList
        .add(
            "active"
        );

}



/* =========================================================
   INICIALIZAR CORES DO LAB
========================================================= */

function updateLabPalettePreview() {

    const styles =
        getComputedStyle(
            root
        );


    const primary =
        styles
            .getPropertyValue(
                "--primary"
            )
            .trim();


    const secondary =
        styles
            .getPropertyValue(
                "--secondary"
            )
            .trim();


    const one =
        $("#randomColorOne");


    const two =
        $("#randomColorTwo");


    if (
        one
    ) {

        one.style.background =
            primary;

    }


    if (
        two
    ) {

        two.style.background =
            secondary;

    }

}



/* =========================================================
   OBSERVAR MUDANÇAS DAS CORES
========================================================= */

const colorObserver =
    new MutationObserver(
        () => {

            updateLabPalettePreview();

        }
    );


colorObserver.observe(
    root,
    {
        attributes: true,

        attributeFilter: [
            "style"
        ]
    }
);



/* =========================================================
   SEGURANÇA DOS MODAIS
========================================================= */

function closeAllModals() {

    $$(
        ".modal.open"
    ).forEach(
        modal => {

            modal.classList.remove(
                "open"
            );


            modal.setAttribute(
                "aria-hidden",
                "true"
            );

        }
    );


    closeLightbox();


    body.classList.remove(
        "modal-open"
    );

}



/* =========================================================
   FECHAR AO CLICAR EM BACKDROP
========================================================= */

$$(
    ".modal-backdrop"
).forEach(
    backdrop => {

        backdrop.addEventListener(
            "click",
            () => {

                const modal =
                    backdrop.closest(
                        ".modal"
                    );


                modal
                    ?.classList
                    .remove(
                        "open"
                    );


                modal
                    ?.setAttribute(
                        "aria-hidden",
                        "true"
                    );


                if (
                    !$(
                        ".modal.open"
                    ) &&
                    !lightbox
                        ?.classList
                        .contains(
                            "open"
                        )
                ) {

                    body.classList.remove(
                        "modal-open"
                    );

                }

            }
        );

    }
);



/* =========================================================
   INICIALIZAÇÃO FINAL
========================================================= */

function initializeDream() {

    /*
        1. Preferência de movimento
    */

    applyReducedMotionPreference();



    /*
        2. Estado salvo
    */

    loadState();



    /*
        3. FAQ
    */

    initializeFaq();



    /*
        4. Roda olfativa
    */

    initializeWheel();



    /*
        5. Timeline
    */

    updateTimeline();



    /*
        6. Preview das cores
    */

    updateLabPalettePreview();



    /*
        7. Nota favorita
    */

    highlightFavoriteNote();



    /*
        8. Estatísticas
    */

    updateStats();



    /*
        9. Menu
    */

    updateActiveSection();



    /*
        10. Scroll
    */

    updateScroll();



    /*
        11. Botões avançados
    */

    updateAdvancedButtons();



    /*
        12. Sliders
    */

    updateAdvancedControls();



    /*
        13. Botão de corações
    */

    updateClickHeartsButton();



    /*
        14. Conquistas
    */

    renderAchievements();



    console.log(
        "%cDREAM ♡ AMOR NO AR",

        `
            font-size: 24px;
            font-weight: 900;
            color: #df76a8;
        `
    );


    console.log(
        "%cSegredos: DREAM • LOVE • 350",

        `
            font-size: 13px;
            color: #9562dc;
        `
    );


    console.log(
        "%cDica: clique 7 vezes no frasco 👀",

        `
            font-size: 12px;
            color: #df76a8;
        `
    );

}



/* =========================================================
   DOM READY
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeDream
    );

} else {

    initializeDream();

}



/* =========================================================
   FIM
========================================================= */