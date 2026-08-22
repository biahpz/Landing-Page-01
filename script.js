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
            700
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

    const scrollTop =
        window.scrollY;


    const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const percentage =
        scrollHeight > 0
            ? (
                scrollTop /
                scrollHeight
            ) * 100
            : 0;


    if (
        scrollProgress
    ) {

        scrollProgress.style.width =
            `${percentage}%`;

    }


    header?.classList.toggle(
        "scrolled",
        scrollTop > 30
    );


    backTop?.classList.toggle(
        "show",
        scrollTop > 450
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
   MENU ATIVO
========================================================= */

const sections =
    $$(".section-track");


const menuLinks =
    $$(".menu a");


function updateCurrentSection() {

    if (
        !sections.length
    ) {

        return;

    }


    let activeSection =
        sections[0];


    sections.forEach(
        section => {

            const rect =
                section.getBoundingClientRect();


            if (
                rect.top <= 220
            ) {

                activeSection =
                    section;

            }

        }
    );


    const activeId =
        activeSection.id;


    menuLinks.forEach(
        link => {

            const href =
                link.getAttribute(
                    "href"
                );


            link.classList.toggle(

                "active",

                href ===
                `#${activeId}`

            );

        }
    );


    if (
        sectionIndicator
    ) {

        const index =
            sections.indexOf(
                activeSection
            ) + 1;


        const name =
            activeSection.dataset.sectionName ||
            activeId;


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
    updateCurrentSection,
    {
        passive: true
    }
);


updateCurrentSection();


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
            threshold:
                0.12
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
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const meter =
                        entry.target;


                    meter.style.width =
                        `${
                            meter.dataset.meter ||
                            0
                        }%`;

                }
            );

        },

        {
            threshold:
                0.35
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
   PRODUTO PRINCIPAL
========================================================= */

const heroProduct =
    $("#heroProduct");


const mainBottle =
    $("#mainBottle");


const productLight =
    $("#productLight");


const productHalo =
    $(".product-halo");


/* =========================================================
   FRASCO INTERATIVO
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


        const rect =
            heroProduct
                .getBoundingClientRect();


        const mouseX =
            event.clientX -
            rect.left;


        const mouseY =
            event.clientY -
            rect.top;


        const x =
            (
                mouseX /
                rect.width
            ) -
            0.5;


        const y =
            (
                mouseY /
                rect.height
            ) -
            0.5;


        const moveX =
            x * 18;


        const moveY =
            y * 10;


        const rotateY =
            x * 10;


        const rotateX =
            y * -8;


        mainBottle.style.transform = `

            translate3d(
                ${moveX}px,
                ${moveY}px,
                20px
            )

            rotateX(
                ${rotateX}deg
            )

            rotateY(
                ${rotateY}deg
            )

        `;


        if (
            productLight
        ) {

            productLight.style.transform = `

                translate(
                    ${x * 50}px,
                    ${y * 35}px
                )

            `;

        }


        if (
            productHalo
        ) {

            productHalo.style.transform = `

                translate(
                    ${x * -18}px,
                    ${y * -15}px
                )

            `;

        }

    }
);


heroProduct?.addEventListener(
    "mouseleave",
    () => {

        if (
            mainBottle
        ) {

            mainBottle.style.transform =
                "";

        }


        if (
            productLight
        ) {

            productLight.style.transform =
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
   BORRIFAR
========================================================= */

const sprayButton =
    $("#sprayButton");


const sprayArea =
    $("#sprayArea");


function sprayDream() {

    if (
        !sprayArea
    ) {

        return;

    }


    for (
        let i = 0;
        i < 38;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "spray-particle";


        const size =
            3 +
            Math.random() *
            7;


        const x =
            (
                Math.random() -
                0.5
            ) *
            330;


        const y =
            -40 -
            Math.random() *
            260;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        particle.style.left =
            `${
                45 +
                Math.random() *
                10
            }%`;


        particle.style.top =
            `${
                38 +
                Math.random() *
                10
            }%`;


        particle.style.setProperty(
            "--spray-x",
            `${x}px`
        );


        particle.style.setProperty(
            "--spray-y",
            `${y}px`
        );


        sprayArea.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            1400
        );

    }


    if (
        mainBottle &&
        !body.classList.contains(
            "no-animations"
        )
    ) {

        mainBottle.animate(

            [

                {
                    transform:
                        "translateY(0) scale(1)"
                },

                {
                    transform:
                        "translateY(5px) scale(0.97)"
                },

                {
                    transform:
                        "translateY(-10px) scale(1.04)"
                },

                {
                    transform:
                        "translateY(0) scale(1)"
                }

            ],

            {

                duration:
                    550,

                easing:
                    "ease-out"

            }

        );

    }


    showToast(
        "Dream está no ar ♡"
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
            "Copie o link do navegador para compartilhar"
        );

    } catch (
        error
    ) {

        console.log(
            error
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

const notesData = {

    bergamota: {

        icon:
            "🍊",

        title:
            "Bergamota",

        text:
            "Cítrica, fresca e luminosa."

    },


    laranja: {

        icon:
            "🍊",

        title:
            "Laranja",

        text:
            "Uma sensação cítrica alegre e confortável."

    },


    mandarina: {

        icon:
            "🍊",

        title:
            "Mandarina",

        text:
            "Frutada, vibrante e delicada."

    },


    limao: {

        icon:
            "🍋",

        title:
            "Limão",

        text:
            "Traz brilho e frescor para a fragrância."

    },


    cassis: {

        icon:
            "🫐",

        title:
            "Cassis",

        text:
            "Frutado com uma leve sensação ácida."

    },


    maca: {

        icon:
            "🍎",

        title:
            "Maçã",

        text:
            "Fresca e suavemente adocicada."

    },


    rosa: {

        icon:
            "🌹",

        title:
            "Rosa",

        text:
            "Floral romântico, delicado e clássico."

    },


    tilia: {

        icon:
            "🌼",

        title:
            "Tília",

        text:
            "Floral suave e confortável."

    },


    freesia: {

        icon:
            "🌸",

        title:
            "Frésia",

        text:
            "Floral leve e luminoso."

    },


    lotus: {

        icon:
            "🪷",

        title:
            "Flor de Lótus",

        text:
            "Floral suave com uma sensação aquática."

    },


    gardenia: {

        icon:
            "🌼",

        title:
            "Gardênia",

        text:
            "Floral cremoso e sofisticado."

    },


    pessego: {

        icon:
            "🍑",

        title:
            "Pêssego",

        text:
            "Frutado macio e confortável."

    },


    ambar: {

        icon:
            "✨",

        title:
            "Âmbar",

        text:
            "Quente e envolvente."

    },


    sandalo: {

        icon:
            "🪵",

        title:
            "Sândalo",

        text:
            "Madeira cremosa e suave."

    },


    baunilha: {

        icon:
            "🤍",

        title:
            "Baunilha",

        text:
            "Doce, cremosa e aconchegante."

    },


    tonka: {

        icon:
            "✨",

        title:
            "Tonka",

        text:
            "Quente e levemente adocicada."

    },


    musk: {

        icon:
            "☁",

        title:
            "Musk",

        text:
            "Macio, confortável e envolvente."

    }

};


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
                    notesData[
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
            "Âmbar, madeiras e notas doces permanecem."

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


function getGalleryMoveAmount() {

    if (
        !galleryTrack
    ) {

        return 0;

    }


    const item =
        $(".gallery-item", galleryTrack);


    if (
        !item
    ) {

        return 0;

    }


    return (
        item.offsetWidth +
        18
    );

}


function moveGallery(
    direction
) {

    if (
        !galleryTrack
    ) {

        return;

    }


    galleryTrack.scrollBy({

        left:
            getGalleryMoveAmount() *
            direction,

        behavior:
            "smooth"

    });

}


galleryPrev?.addEventListener(
    "click",
    () => {

        moveGallery(
            -1
        );

    }
);


galleryNext?.addEventListener(
    "click",
    () => {

        moveGallery(
            1
        );

    }
);


/* =========================================================
   AUTOPLAY DA GALERIA
========================================================= */

let galleryTimer =
    null;


function stopGalleryAutoplay() {

    if (
        !galleryTimer
    ) {

        return;

    }


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


            return;

        }


        galleryAutoplay.textContent =
            "❚❚ Pausar";


        galleryTimer =
            setInterval(
                () => {

                    if (
                        !galleryTrack
                    ) {

                        return;

                    }


                    const maxScroll =
                        galleryTrack.scrollWidth -
                        galleryTrack.clientWidth;


                    if (
                        galleryTrack.scrollLeft >=
                        maxScroll - 30
                    ) {

                        galleryTrack.scrollTo({

                            left: 0,

                            behavior:
                                "smooth"

                        });

                    } else {

                        moveGallery(
                            1
                        );

                    }

                },
                3500
            );


        showToast(
            "Autoplay ativado"
        );

    }
);


/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox =
    $("#lightbox");


const lightboxImage =
    $("#lightboxImage");


function openLightbox(
    image
) {

    if (
        !lightbox ||
        !lightboxImage
    ) {

        return;

    }


    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt;


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


    body.classList.remove(
        "modal-open"
    );

}


$$(
    ".gallery-item img"
).forEach(
    image => {

        image.addEventListener(
            "click",
            () => {

                openLightbox(
                    image
                );

            }
        );

    }
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
                    char =>
                        char +
                        char
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


function applyColors(
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
                    `Mood ${button.textContent.trim()}`
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


const quizData = [

    {

        question:
            "Qual momento combina mais com você?",

        options: [

            [
                "Um encontro romântico ♡",
                "romantico"
            ],

            [
                "Uma noite olhando o céu ☾",
                "sonhador"
            ],

            [
                "Uma festa ✦",
                "energia"
            ],

            [
                "Um momento tranquilo ☁",
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


function startQuiz() {

    quizIndex =
        0;


    quizScore = {

        romantico: 0,

        sonhador: 0,

        energia: 0,

        calmo: 0

    };


    if (
        quizStart
    ) {

        quizStart.hidden =
            true;

    }


    if (
        quizQuestions
    ) {

        quizQuestions.hidden =
            false;

    }


    if (
        quizResult
    ) {

        quizResult.hidden =
            true;

    }


    renderQuiz();

}


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


    showToast(
        `Seu perfil: ${result.title}`
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
   DREAM STUDIO
========================================================= */

const settingsPanel =
    $("#settingsPanel");


$("#settingsButton")?.addEventListener(
    "click",
    () => {

        settingsPanel?.classList.add(
            "open"
        );

    }
);


$("#closeSettings")?.addEventListener(
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


function setDarkMode(
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
   PARTÍCULAS
========================================================= */

const particlesContainer =
    $("#particles");


function generateParticles() {

    if (
        !particlesContainer
    ) {

        return;

    }


    particlesContainer.innerHTML =
        "";


    const symbols = [

        "♡",

        "✦",

        "✿",

        "·"

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
                15
            }px`;


        particle.style.animationDuration =
            `${
                8 +
                Math.random() *
                12
            }s`;


        particle.style.animationDelay =
            `${
                -Math.random() *
                15
            }s`;


        particlesContainer.appendChild(
            particle
        );

    }

}


generateParticles();


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


    setDarkMode(

        savedDark ===
        "true",

        false

    );


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

    } else {

        setFontSize(
            "normal",
            false
        );

    }


    const savedParticles =
        localStorage.getItem(
            "dreamParticles"
        );


    if (
        savedParticles !==
        null
    ) {

        const active =
            savedParticles ===
            "true";


        particlesToggle.checked =
            active;


        body.classList.toggle(
            "no-particles",
            !active
        );

    }


    const savedAnimations =
        localStorage.getItem(
            "dreamAnimations"
        );


    if (
        savedAnimations !==
        null
    ) {

        const active =
            savedAnimations ===
            "true";


        animationsToggle.checked =
            active;


        body.classList.toggle(
            "no-animations",
            !active
        );

    }


    const savedGlass =
        localStorage.getItem(
            "dreamGlass"
        );


    if (
        savedGlass !==
        null
    ) {

        const active =
            savedGlass ===
            "true";


        glassToggle.checked =
            active;


        body.classList.toggle(
            "no-glass",
            !active
        );

    }


    const savedCursor =
        localStorage.getItem(
            "dreamCursor"
        );


    if (
        savedCursor !==
        null
    ) {

        const active =
            savedCursor ===
            "true";


        cursorToggle.checked =
            active;


        body.classList.toggle(
            "no-cursor",
            !active
        );

    }

}


loadSettings();


/* =========================================================
   RESET SETTINGS
========================================================= */

$("#resetSettings")?.addEventListener(
    "click",
    () => {

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


        applyColors(

            "#df76a8",

            "#9562dc",

            false

        );


        setDarkMode(
            false,
            false
        );


        setFontSize(
            "normal",
            false
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


        showToast(
            "Configurações restauradas ♡"
        );

    }
);


/* =========================================================
   ESC
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


        settingsPanel?.classList.remove(
            "open"
        );


        menu?.classList.remove(
            "open"
        );

    }
);


/* =========================================================
   RESPONSIVO
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

    }
);


/* =========================================================
   FINAL
========================================================= */

console.log(
    "%cDream ♡ Amor no Ar",
    "color:#df76a8;font-size:22px;font-weight:900"
);