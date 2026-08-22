"use strict";


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
   ELEMENTOS
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

}


window.addEventListener(
    "scroll",
    updateScroll,
    {
        passive: true
    }
);


updateScroll();


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
   MENU
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

                        entry.target.style.width =
                            `${
                                entry.target.dataset.meter
                            }%`;

                    }

                }
            );

        },

        {
            threshold: 0.4
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
   CURSOR
========================================================= */

const cursorGlow =
    $("#cursorGlow");


document.addEventListener(
    "mousemove",
    event => {

        if (
            !cursorGlow ||
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


    /* ONDA */

    sprayWave?.classList.remove(
        "active"
    );


    void sprayWave?.offsetWidth;


    sprayWave?.classList.add(
        "active"
    );


    /* FLASH */

    const flash =
        document.createElement(
            "span"
        );


    flash.className =
        "spray-flash active";


    sprayArea.appendChild(
        flash
    );


    /* NÉVOA */

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


    /* CORAÇÕES E ESTRELAS */

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


        await navigator.clipboard.writeText(
            location.href
        );


        showToast(
            "Link copiado ♡"
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


                $("#noteModalIcon").textContent =
                    note[0];


                $("#noteModalTitle").textContent =
                    note[1];


                $("#noteModalText").textContent =
                    note[2];


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


$$(
    ".close-note"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                noteModal?.classList.remove(
                    "open"
                );


                body.classList.remove(
                    "modal-open"
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

    const value =
        Number(
            timelineSlider?.value ||
            0
        );


    $("#timelineHour").textContent =
        `${value}h`;


    const stage =
        timelineStages.find(
            item =>
                value <= item[0]
        ) ||
        timelineStages.at(-1);


    $("#timelineIcon").textContent =
        stage[1];


    $("#timelineTitle").textContent =
        stage[2];


    $("#timelineText").textContent =
        stage[3];

}


timelineSlider?.addEventListener(
    "input",
    updateTimeline
);


updateTimeline();


/* =========================================================
   CARROSSEL PREMIUM
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


    $("#galleryCurrent").textContent =
        String(
            galleryIndex +
            1
        ).padStart(
            2,
            "0"
        );


    $("#galleryTotal").textContent =
        String(
            galleryItems.length
        ).padStart(
            2,
            "0"
        );

}


function goGallery(
    index
) {

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


    galleryTrack?.scrollTo({

        left:
            item.offsetLeft -
            galleryTrack.offsetLeft,

        behavior:
            "smooth"

    });


    updateGalleryUI();

}


galleryItems.forEach(
    (_, index) => {

        const dot =
            document.createElement(
                "button"
            );


        dot.className =
            "gallery-dot";


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


let startX =
    0;


let startScroll =
    0;


galleryTrack?.addEventListener(
    "mousedown",
    event => {

        dragging =
            true;


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

        dragging =
            false;


        galleryTrack?.classList.remove(
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


        galleryTrack.scrollLeft =
            startScroll -
            (
                event.pageX -
                startX
            );

    }
);


/* =========================================================
   AUTOPLAY
========================================================= */

let autoplay =
    null;


$("#galleryAutoplay")?.addEventListener(
    "click",
    event => {

        if (
            autoplay
        ) {

            clearInterval(
                autoplay
            );


            autoplay =
                null;


            event.currentTarget.textContent =
                "▶ Autoplay";


            return;

        }


        autoplay =
            setInterval(
                () => {

                    goGallery(

                        galleryIndex >=
                        galleryItems.length -
                        1
                            ? 0
                            : galleryIndex +
                            1

                    );

                },
                3500
            );


        event.currentTarget.textContent =
            "❚❚ Pausar";

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

    const item =
        galleryItems[
            lightboxIndex
        ];


    const image =
        $("img", item);


    const title =
        $("h3", item);


    $("#lightboxImage").src =
        image.src;


    $("#lightboxTitle").textContent =
        title?.textContent ||
        "Dream";


    $("#lightboxCounter").textContent =
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


function openLightbox(
    index
) {

    lightboxIndex =
        index;


    updateLightbox();


    lightbox?.classList.add(
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


function nextLightbox() {

    lightboxIndex =
        (
            lightboxIndex +
            1
        ) %
        galleryItems.length;


    updateLightbox();

}


function prevLightbox() {

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
            event => {

                if (
                    dragging
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


function hexToRgb(
    hex
) {

    const value =
        parseInt(
            hex.replace(
                "#",
                ""
            ),
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


function applyColors(
    primary,
    secondary
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


    $("#primaryColor").value =
        primary;


    $("#secondaryColor").value =
        secondary;

}


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


                applyColors(
                    ...moods[
                        button.dataset.mood
                    ]
                );

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


    $("#quizStart").hidden =
        true;


    $("#quizResult").hidden =
        true;


    $("#quizQuestions").hidden =
        false;


    renderQuiz();

}


function renderQuiz() {

    const current =
        questions[
            quizIndex
        ];


    $("#quizQuestion").textContent =
        current.q;


    $("#quizStep").textContent =
        `${quizIndex + 1} / ${questions.length}`;


    $("#quizProgressBar").style.width =
        `${
            (
                quizIndex +
                1
            ) /
            questions.length *
            100
        }%`;


    const container =
        $("#quizOptions");


    container.innerHTML =
        "";


    current.answers.forEach(
        answer => {

            const button =
                document.createElement(
                    "button"
                );


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

    $("#quizQuestions").hidden =
        true;


    $("#quizResult").hidden =
        false;


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
        )[0][0];


    const result =
        results[
            winner
        ];


    $("#quizResultIcon").textContent =
        result[0];


    $("#quizResultTitle").textContent =
        result[1];


    $("#quizResultText").textContent =
        result[2];

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


                applyColors(
                    ...palettes[
                        button.dataset.palette
                    ]
                );

            }
        );

    }
);


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

function setDark(
    active
) {

    body.classList.toggle(
        "dark",
        active
    );


    $("#darkToggle").checked =
        active;


    $("#themeButton").textContent =
        active
            ? "☀"
            : "☾";


    localStorage.setItem(
        "dreamDark",
        active
    );

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


$("#particlesToggle")?.addEventListener(
    "change",
    event => {

        body.classList.toggle(
            "no-particles",
            !event.target.checked
        );

    }
);


$("#animationsToggle")?.addEventListener(
    "change",
    event => {

        body.classList.toggle(
            "no-animations",
            !event.target.checked
        );

    }
);


$("#cursorToggle")?.addEventListener(
    "change",
    event => {

        body.classList.toggle(
            "no-cursor",
            !event.target.checked
        );

    }
);


/* =========================================================
   RESET
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
            "no-cursor"
        );


        $("#particlesToggle").checked =
            true;


        $("#animationsToggle").checked =
            true;


        $("#cursorToggle").checked =
            true;


        showToast(
            "Configurações restauradas ♡"
        );

    }
);


/* =========================================================
   ATALHOS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const lightboxOpen =
            lightbox?.classList.contains(
                "open"
            );


        if (
            event.key ===
            "Escape"
        ) {

            closeProduct();


            noteModal?.classList.remove(
                "open"
            );


            closeLightbox();


            settingsPanel?.classList.remove(
                "open"
            );

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

        }


        if (
            event.key.toLowerCase() ===
            "d" &&
            !event.target.matches(
                "input, textarea"
            )
        ) {

            $("#themeButton")?.click();

        }


        if (
            event.key.toLowerCase() ===
            "s" &&
            !event.target.matches(
                "input, textarea"
            )
        ) {

            sprayDream();

        }

    }
);


/* =========================================================
   CARREGAR DARK MODE
========================================================= */

setDark(
    localStorage.getItem(
        "dreamDark"
    ) ===
    "true"
);


console.log(
    "%cDream ♡ Amor no Ar",
    "color:#df76a8;font-size:22px;font-weight:900"
);