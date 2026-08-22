"use strict";


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);


const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


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

let toastTimer;


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
            2500
        );

}


/* =========================================================
   SCROLL
========================================================= */

function updateScroll() {

    const scrollTop =
        window.scrollY;


    const height =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const percent =
        height > 0
            ? (scrollTop / height) * 100
            : 0;


    if (scrollProgress) {

        scrollProgress.style.width =
            `${percent}%`;

    }


    header?.classList.toggle(
        "scrolled",
        scrollTop > 40
    );


    backTop?.classList.toggle(
        "show",
        scrollTop > 500
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
   MENU ATIVO + INDICADOR
========================================================= */

const sections =
    $$(".section-track");


const menuLinks =
    $$(".menu a");


function updateActiveSection() {

    if (!sections.length) {
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


    const id =
        current.id;


    menuLinks.forEach(
        link => {

            link.classList.toggle(

                "active",

                link.getAttribute(
                    "href"
                ) ===
                `#${id}`

            );

        }
    );


    const index =
        sections.indexOf(
            current
        ) + 1;


    const name =
        current.dataset.sectionName ||
        current.id;


    if (
        sectionIndicator
    ) {

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


                    const value =
                        meter.dataset.meter ||
                        0;


                    meter.style.width =
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
   MOVIMENTO DO FRASCO
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
            heroProduct.getBoundingClientRect();


        const x =
            event.clientX -
            rect.left;


        const y =
            event.clientY -
            rect.top;


        const centerX =
            rect.width / 2;


        const centerY =
            rect.height / 2;


        const moveX =
            (
                (
                    x -
                    centerX
                ) /
                centerX
            ) * 10;


        const moveY =
            (
                (
                    y -
                    centerY
                ) /
                centerY
            ) * 7;


        const rotateY =
            (
                (
                    x -
                    centerX
                ) /
                centerX
            ) * 6;


        const rotateX =
            -(
                (
                    y -
                    centerY
                ) /
                centerY
            ) * 5;


        mainBottle.style.transform = `

            translate(
                ${moveX}px,
                ${moveY}px
            )

            rotateX(
                ${rotateX}deg
            )

            rotateY(
                ${rotateY}deg
            )

        `;

    }
);


heroProduct?.addEventListener(
    "mouseleave",
    () => {

        if (
            !mainBottle
        ) {

            return;

        }


        mainBottle.style.transform =
            "";

    }
);


/* =========================================================
   BORRIFAR
========================================================= */

function spray() {

    if (
        !sprayArea
    ) {

        return;

    }


    for (
        let i = 0;
        i < 34;
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
            320;


        const y =
            -60 -
            Math.random() *
            250;


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
                43 +
                Math.random() *
                8
            }%`;


        /*
            IMPORTANTE:
            seu CSS usa --spray-x e --spray-y.
        */

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
            1500
        );

    }


    showToast(
        "Dream está no ar ✦"
    );

}


sprayButton?.addEventListener(
    "click",
    spray
);


/* =========================================================
   PRODUTO MODAL
========================================================= */

function openProductModal() {

    productModal?.classList.add(
        "open"
    );


    productModal?.setAttribute(
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
   FAVORITO
========================================================= */

const favoriteButtons = [

    $("#favoriteButton"),

    $("#favoriteModal")

].filter(
    Boolean
);


let favorite =
    localStorage.getItem(
        "dreamFavorite"
    ) ===
    "true";


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
            "Compartilhamento não disponível"
        );

    } catch {

        console.log(
            "Compartilhamento cancelado."
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
            "Uma nota floral romântica, delicada e clássica."

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
   ABRIR NOTA
========================================================= */

$$(
    ".note-chip"
).forEach(
    chip => {

        chip.addEventListener(
            "click",
            () => {

                const key =
                    chip.dataset.note;


                const note =
                    notesData[
                        key
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


/* =========================================================
   FECHAR NOTA
========================================================= */

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
                value <= item.max
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


let galleryTimer =
    null;


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


galleryPrev?.addEventListener(
    "click",
    () => {

        galleryMove(
            -1
        );

    }
);


galleryNext?.addEventListener(
    "click",
    () => {

        galleryMove(
            1
        );

    }
);


galleryAutoplay?.addEventListener(
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
                        galleryTrack.scrollWidth -
                        galleryTrack.clientWidth;


                    if (
                        galleryTrack.scrollLeft >=
                        max - 20
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
                    image.alt;


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
        );

    }
);


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

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const mood =
                    moods[
                        button.dataset.mood
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
                    `Mood ${button.textContent.trim()} ativado`
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


let quizIndex =
    0;


let quizScore =
    {};


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


function renderQuiz() {

    const item =
        quizData[
            quizIndex
        ];


    if (
        !item ||
        !quizQuestion ||
        !quizOptions ||
        !quizStep ||
        !quizProgressBar
    ) {

        return;

    }


    quizQuestion.textContent =
        item.question;


    quizStep.textContent =
        `${quizIndex + 1} / ${quizData.length}`;


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
            (a, b) =>
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


function hexToRgb(hex) {

    let value =
        hex.replace(
            "#",
            ""
        );


    if (
        value.length === 3
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
            (number >> 16) &
            255,

        g:
            (number >> 8) &
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

const darkToggle =
    $("#darkToggle");


const themeButton =
    $("#themeButton");


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
            String(active)
        );

    }

}


darkToggle?.addEventListener(
    "change",
    () => {

        setDark(
            darkToggle.checked
        );

    }
);


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


/* =========================================================
   PARTÍCULAS
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


        particles.appendChild(
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
   TAMANHO DA FONTE
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


    const dark =
        localStorage.getItem(
            "dreamDark"
        ) ===
        "true";


    setDark(
        dark,
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


        if (
            particlesToggle
        ) {

            particlesToggle.checked =
                active;

        }


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


        if (
            animationsToggle
        ) {

            animationsToggle.checked =
                active;

        }


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


        if (
            glassToggle
        ) {

            glassToggle.checked =
                active;

        }


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


        if (
            cursorToggle
        ) {

            cursorToggle.checked =
                active;

        }


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


        setDark(
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
            item => {

                item.classList.toggle(

                    "active",

                    item.dataset.palette ===
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

    }
);


/* =========================================================
   RESPONSIVIDADE DO MENU
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
    `
        color: #df76a8;
        font-size: 22px;
        font-weight: 900;
    `
);