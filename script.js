/* =========================================================
   DREAM AMOR NO AR
   70+ INTERAÇÕES + EASTER EGGS
========================================================= */


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.documentElement.classList.add(
    "js"
);


/* =========================================================
   ATALHOS DE DOM
========================================================= */

const $ = (
    seletor,
    raiz = document
) => {

    return raiz.querySelector(
        seletor
    );

};


const $$ = (
    seletor,
    raiz = document
) => {

    return [
        ...raiz.querySelectorAll(
            seletor
        )
    ];

};


const clamp = (
    numero,
    minimo,
    maximo
) => {

    return Math.max(
        minimo,
        Math.min(
            maximo,
            numero
        )
    );

};


const pick = array => {

    return array[
        Math.floor(
            Math.random()
            *
            array.length
        )
    ];

};


/* =========================================================
   LOCAL STORAGE
========================================================= */

function save(
    chave,
    valor
) {

    try {

        localStorage.setItem(
            chave,
            String(
                valor
            )
        );

    }

    catch (erro) {}

}


function load(
    chave,
    fallback = null
) {

    try {

        const valor =
            localStorage.getItem(
                chave
            );


        return valor === null
            ?
            fallback
            :
            valor;

    }

    catch (erro) {

        return fallback;

    }

}


function removeSaved(
    chave
) {

    try {

        localStorage.removeItem(
            chave
        );

    }

    catch (erro) {}

}


/* =========================================================
   COPIAR TEXTO
========================================================= */

function copyText(
    texto
) {

    if (
        navigator.clipboard
        ?.writeText
    ) {

        return navigator.clipboard
            .writeText(
                texto
            );

    }


    return new Promise(
        (
            resolve,
            reject
        ) => {

            try {

                const textarea =
                    document.createElement(
                        "textarea"
                    );


                textarea.value =
                    texto;


                textarea.style.position =
                    "fixed";


                textarea.style.opacity =
                    "0";


                document.body.appendChild(
                    textarea
                );


                textarea.select();


                document.execCommand(
                    "copy"
                );


                textarea.remove();


                resolve();

            }

            catch (erro) {

                reject(
                    erro
                );

            }

        }
    );

}


/* =========================================================
   TOAST
========================================================= */

const toast =
    $("#toast");


let toastTimer;


function showToast(
    texto
) {

    if (!toast) {
        return;
    }


    toast.textContent =
        texto;


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
   MODAIS
========================================================= */

function syncBodyLock() {

    const algumAberto =
        $(
            ".modal.open, .lightbox.open"
        );


    document.body.classList.toggle(
        "modal-open",
        Boolean(
            algumAberto
        )
    );

}


function openLayer(
    elemento
) {

    if (!elemento) {
        return;
    }


    elemento.classList.add(
        "open"
    );


    elemento.setAttribute(
        "aria-hidden",
        "false"
    );


    syncBodyLock();

}


function closeLayer(
    elemento
) {

    if (!elemento) {
        return;
    }


    elemento.classList.remove(
        "open"
    );


    elemento.setAttribute(
        "aria-hidden",
        "true"
    );


    syncBodyLock();

}


function closeEverything() {

    $$(
        ".modal.open, .lightbox.open"
    )
    .forEach(
        elemento => {

            closeLayer(
                elemento
            );

        }
    );


    $("#settingsPanel")
        ?.classList
        .remove(
            "open"
        );

}


/* =========================================================
   01 - LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                $("#loader")
                    ?.classList
                    .add(
                        "hide"
                    );

            },
            850
        );

    }
);


/* =========================================================
   02 / 03 - SCROLL
========================================================= */

const progress =
    $("#scrollProgress");


const header =
    $("#header");


const backTop =
    $("#backTop");


function updateScrollUi() {

    const y =
        scrollY;


    const total =
        document.documentElement
            .scrollHeight
        -
        innerHeight;


    if (progress) {

        const porcentagem =
            total > 0
                ?
                y
                /
                total
                *
                100
                :
                0;


        progress.style.width =
            porcentagem
            +
            "%";

    }


    header
        ?.classList
        .toggle(
            "scrolled",
            y > 35
        );


    backTop
        ?.classList
        .toggle(
            "show",
            y > 650
        );

}


addEventListener(
    "scroll",
    updateScrollUi,
    {
        passive: true
    }
);


updateScrollUi();


backTop
    ?.addEventListener(
        "click",
        () => {

            scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });

        }
    );


/* =========================================================
   04 - MENU MOBILE
========================================================= */

const menu =
    $("#menu");


const menuMobile =
    $("#menuMobile");


menuMobile
    ?.addEventListener(
        "click",
        () => {

            menu
                ?.classList
                .toggle(
                    "open"
                );


            menuMobile.textContent =
                menu
                    ?.classList
                    .contains(
                        "open"
                    )
                    ?
                    "✕"
                    :
                    "☰";

        }
    );


$$(
    ".menu a"
)
.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                menu
                    ?.classList
                    .remove(
                        "open"
                    );


                if (
                    menuMobile
                ) {

                    menuMobile.textContent =
                        "☰";

                }

            }
        );

    }
);


/* =========================================================
   05 - SCROLL SPY
========================================================= */

const tracked =
    $$(".section-track");


const sectionIndicator =
    $("#sectionIndicator");


const explored =
    new Set();


if (
    "IntersectionObserver"
    in
    window
) {

    const spy =
        new IntersectionObserver(

            entradas => {

                entradas.forEach(
                    entrada => {

                        if (
                            !entrada.isIntersecting
                        ) {
                            return;
                        }


                        const id =
                            entrada.target.id;


                        const nome =
                            entrada.target
                                .dataset
                                .sectionName
                            ||
                            id;


                        const indice =
                            tracked.indexOf(
                                entrada.target
                            )
                            +
                            1;


                        if (
                            sectionIndicator
                        ) {

                            sectionIndicator.innerHTML =
                                `
                                <span>
                                    ${String(indice).padStart(2,"0")}
                                </span>
                                ${nome}
                                `;

                        }


                        $$(
                            ".menu a"
                        )
                        .forEach(
                            link => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    )
                                    ===
                                    "#"
                                    +
                                    id
                                );

                            }
                        );


                        explored.add(
                            id
                        );


                        if (
                            explored.size
                            >=
                            8
                        ) {

                            unlockAchievement(
                                "explorer"
                            );

                        }

                    }
                );

            },

            {
                rootMargin:
                    "-38% 0px -52% 0px"
            }

        );


    tracked.forEach(
        secao => {

            spy.observe(
                secao
            );

        }
    );

}


/* =========================================================
   06 - REVEAL E MEDIDORES
========================================================= */

if (
    "IntersectionObserver"
    in
    window
) {

    const revealObserver =
        new IntersectionObserver(

            entradas => {

                entradas.forEach(
                    entrada => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target
                                .classList
                                .add(
                                    "visible"
                                );


                            revealObserver
                                .unobserve(
                                    entrada.target
                                );

                        }

                    }
                );

            },

            {
                threshold:
                    .07
            }

        );


    $$(".reveal")
        .forEach(
            elemento => {

                revealObserver.observe(
                    elemento
                );

            }
        );


    const meterObserver =
        new IntersectionObserver(

            entradas => {

                entradas.forEach(
                    entrada => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target.style.width =
                                entrada.target
                                    .dataset
                                    .meter
                                +
                                "%";


                            meterObserver
                                .unobserve(
                                    entrada.target
                                );

                        }

                    }
                );

            },

            {
                threshold:
                    .35
            }

        );


    $$(
        "[data-meter]"
    )
    .forEach(
        medidor => {

            meterObserver.observe(
                medidor
            );

        }
    );

}

else {

    $$(".reveal")
        .forEach(
            elemento => {

                elemento.classList.add(
                    "visible"
                );

            }
        );


    $$(
        "[data-meter]"
    )
    .forEach(
        medidor => {

            medidor.style.width =
                medidor.dataset.meter
                +
                "%";

        }
    );

}


/* =========================================================
   07 - PARTÍCULAS
========================================================= */

const particles =
    $("#particles");


function createParticle() {

    if (
        !particles
        ||
        document.body
            .classList
            .contains(
                "no-particles"
            )
    ) {

        return;

    }


    const particle =
        document.createElement(
            "span"
        );


    particle.className =
        "particle";


    particle.textContent =
        pick(
            [
                "♡",
                "✦",
                "✿",
                "·"
            ]
        );


    particle.style.left =
        Math.random()
        *
        100
        +
        "vw";


    particle.style.fontSize =
        8
        +
        Math.random()
        *
        18
        +
        "px";


    particle.style.animationDuration =
        8
        +
        Math.random()
        *
        9
        +
        "s";


    particles.appendChild(
        particle
    );


    setTimeout(
        () => {

            particle.remove();

        },
        18000
    );

}


setInterval(
    createParticle,
    850
);


/* =========================================================
   08 - CURSOR GLOW
========================================================= */

const cursorGlow =
    $("#cursorGlow");


addEventListener(
    "mousemove",
    evento => {

        if (
            !cursorGlow
            ||
            innerWidth
            <
            900
        ) {

            return;

        }


        cursorGlow.style.left =
            evento.clientX
            +
            "px";


        cursorGlow.style.top =
            evento.clientY
            +
            "px";

    }
);


/* =========================================================
   09 - PARALLAX
========================================================= */

const campaignImage =
    $("#campaignImage");


addEventListener(
    "scroll",
    () => {

        if (
            !campaignImage
            ||
            document.body
                .classList
                .contains(
                    "no-animations"
                )
        ) {

            return;

        }


        const rect =
            $("#campanha")
                ?.getBoundingClientRect();


        if (
            rect
            &&
            rect.bottom > 0
            &&
            rect.top < innerHeight
        ) {

            const offset =
                (
                    innerHeight / 2
                    -
                    (
                        rect.top
                        +
                        rect.height / 2
                    )
                )
                *
                .045;


            campaignImage.style.transform =
                `
                translateY(${offset}px)
                scale(1.03)
                `;

        }

    },
    {
        passive:
            true
    }
);


/* =========================================================
   10 - FRASCO 3D
========================================================= */

const heroProduct =
    $("#heroProduct");


const mainBottle =
    $("#mainBottle");


const productLight =
    $("#productLight");


heroProduct
    ?.addEventListener(
        "mousemove",
        evento => {

            if (
                innerWidth
                <
                900
                ||
                document.body
                    .classList
                    .contains(
                        "no-animations"
                    )
            ) {

                return;

            }


            const area =
                heroProduct
                    .getBoundingClientRect();


            const x =
                evento.clientX
                -
                area.left;


            const y =
                evento.clientY
                -
                area.top;


            const rotacaoX =
                -(
                    y
                    -
                    area.height / 2
                )
                /
                30;


            const rotacaoY =
                (
                    x
                    -
                    area.width / 2
                )
                /
                30;


            if (
                mainBottle
            ) {

                mainBottle.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotacaoX}deg)
                    rotateY(${rotacaoY}deg)
                    `;

            }


            if (
                productLight
            ) {

                productLight.style.left =
                    x
                    -
                    95
                    +
                    "px";


                productLight.style.top =
                    y
                    -
                    95
                    +
                    "px";

            }

        }
    );


heroProduct
    ?.addEventListener(
        "mouseleave",
        () => {

            if (
                mainBottle
            ) {

                mainBottle.style.transform =
                    "";

            }

        }
    );


/* =========================================================
   11 / 12 - SPRAY
========================================================= */

let sprayCount =
    Number(
        load(
            "dreamSprayCount",
            "0"
        )
    );


const sprayArea =
    $("#sprayArea");


function doSpray() {

    if (
        !sprayArea
    ) {
        return;
    }


    for (
        let i = 0;
        i < 30;
        i++
    ) {

        const dot =
            document.createElement(
                "span"
            );


        dot.className =
            "spray-dot";


        dot.style.setProperty(
            "--x",
            (
                Math.random()
                *
                190
                -
                95
            )
            +
            "px"
        );


        dot.style.setProperty(
            "--y",
            -(
                35
                +
                Math.random()
                *
                165
            )
            +
            "px"
        );


        dot.style.animationDelay =
            Math.random()
            *
            .1
            +
            "s";


        sprayArea.appendChild(
            dot
        );


        setTimeout(
            () => {

                dot.remove();

            },
            1200
        );

    }


    sprayCount++;


    save(
        "dreamSprayCount",
        sprayCount
    );


    showToast(
        `Dream no ar ✦ • spray ${sprayCount}`
    );


    playChime(
        720,
        .07
    );


    if (
        sprayCount
        >=
        10
    ) {

        unlockAchievement(
            "sprayMaster"
        );

    }

}


$("#sprayButton")
    ?.addEventListener(
        "click",
        doSpray
    );


/* =========================================================
   13 - FAVORITOS
========================================================= */

function isFavorite() {

    return (
        load(
            "dreamFavorite",
            "no"
        )
        ===
        "yes"
    );

}


function updateFavoriteUI() {

    const favorito =
        isFavorite();


    const texto =
        favorito
            ?
            "♥ Favoritado"
            :
            "♡ Favoritar";


    if (
        $("#favoriteButton")
    ) {

        $("#favoriteButton").textContent =
            texto;

    }


    if (
        $("#favoriteModal")
    ) {

        $("#favoriteModal").textContent =
            texto;

    }


    $("#favoriteButton")
        ?.classList
        .toggle(
            "active",
            favorito
        );

}


function toggleFavorite() {

    const favorito =
        !isFavorite();


    save(
        "dreamFavorite",
        favorito
            ?
            "yes"
            :
            "no"
    );


    updateFavoriteUI();


    showToast(
        favorito
            ?
            "Adicionado aos favoritos ♡"
            :
            "Removido dos favoritos"
    );


    if (
        favorito
    ) {

        unlockAchievement(
            "collector"
        );

    }

}


$("#favoriteButton")
    ?.addEventListener(
        "click",
        toggleFavorite
    );


$("#favoriteModal")
    ?.addEventListener(
        "click",
        toggleFavorite
    );


updateFavoriteUI();


/* =========================================================
   14 - COMPARTILHAR
========================================================= */

async function shareSite() {

    try {

        if (
            navigator.share
        ) {

            await navigator.share({

                title:
                    "Dream Amor no Ar",

                text:
                    "Conheça Dream Amor no Ar 350 ml ♡",

                url:
                    location.href

            });

        }

        else {

            await copyText(
                location.href
            );


            showToast(
                "Link copiado!"
            );

        }

    }

    catch (erro) {}

}


$("#shareButton")
    ?.addEventListener(
        "click",
        shareSite
    );


$("#shareModal")
    ?.addEventListener(
        "click",
        shareSite
    );


/* =========================================================
   15 - WHATSAPP
========================================================= */

$("#whatsappShare")
    ?.addEventListener(
        "click",
        () => {

            const mensagem =
                "Conheça Dream Amor no Ar 350 ml ♡ "
                +
                location.href;


            const url =
                "https://wa.me/?text="
                +
                encodeURIComponent(
                    mensagem
                );


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );


/* =========================================================
   16 / 17 / 18 / 19 - COPIAR
========================================================= */

$("#copyProduct")
    ?.addEventListener(
        "click",
        async () => {

            await copyText(
                "Dream Amor no Ar • 350 ml • Body Splash • Floral Amadeirado"
            );


            showToast(
                "Informações copiadas ♡"
            );

        }
    );


$("#copyPalette")
    ?.addEventListener(
        "click",
        async () => {

            const style =
                getComputedStyle(
                    document.documentElement
                );


            const primary =
                style
                    .getPropertyValue(
                        "--primary"
                    )
                    .trim();


            const secondary =
                style
                    .getPropertyValue(
                        "--secondary"
                    )
                    .trim();


            await copyText(
                `Dream Palette: ${primary} + ${secondary}`
            );


            showToast(
                "Paleta copiada ◈"
            );

        }
    );


$("#copyPageLink")
    ?.addEventListener(
        "click",
        async () => {

            await copyText(
                location.href
            );


            showToast(
                "Link da página copiado"
            );

        }
    );


$("#copySectionLink")
    ?.addEventListener(
        "click",
        async () => {

            const visible =
                tracked.find(
                    section => {

                        const rect =
                            section
                                .getBoundingClientRect();


                        return (
                            rect.top
                            <=
                            innerHeight * .5
                            &&
                            rect.bottom
                            >=
                            innerHeight * .5
                        );

                    }
                )
                ||
                $("#produto");


            const url =
                location.href.split(
                    "#"
                )[0]
                +
                "#"
                +
                visible.id;


            await copyText(
                url
            );


            showToast(
                "Link desta seção copiado"
            );

        }
    );


/* =========================================================
   20 - MODAL PRODUTO
========================================================= */

const productModal =
    $("#productModal");


$$(
    ".open-product"
)
.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                openLayer(
                    productModal
                );

            }
        );

    }
);


$$(
    ".close-product"
)
.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                closeLayer(
                    productModal
                );

            }
        );

    }
);


/* =========================================================
   21 / 22 - NOTAS
========================================================= */

const noteData = {

    bergamota: [
        "Bergamota",
        "🍋",
        "Cítrica, fresca e luminosa."
    ],

    laranja: [
        "Laranja",
        "🍊",
        "Cítrica, alegre e suculenta."
    ],

    mandarina: [
        "Mandarina",
        "🍊",
        "Doce, cítrica e vibrante."
    ],

    limao: [
        "Limão",
        "🍋",
        "Traz brilho e frescor."
    ],

    cassis: [
        "Cassis",
        "🫐",
        "Frutado marcante e levemente ácido."
    ],

    maca: [
        "Maçã",
        "🍎",
        "Fresca, frutada e suculenta."
    ],

    rosa: [
        "Rosa",
        "🌹",
        "Floral clássico e romântico."
    ],

    tilia: [
        "Tília",
        "🌼",
        "Floral suave e confortável."
    ],

    freesia: [
        "Frésia",
        "💐",
        "Floral fresco e luminoso."
    ],

    lotus: [
        "Flor de Lótus",
        "🌸",
        "Delicada, aquática e suave."
    ],

    ameixa: [
        "Ameixa",
        "🟣",
        "Frutada, macia e adocicada."
    ],

    gardenia: [
        "Gardênia",
        "🤍",
        "Floral cremoso e elegante."
    ],

    pessego: [
        "Pêssego",
        "🍑",
        "Macio, frutado e doce."
    ],

    ambar: [
        "Âmbar",
        "✨",
        "Quente e envolvente."
    ],

    sandalo: [
        "Sândalo",
        "🪵",
        "Madeira cremosa e confortável."
    ],

    baunilha: [
        "Baunilha",
        "🍦",
        "Doçura macia e aconchegante."
    ],

    tonka: [
        "Fava Tonka",
        "🫘",
        "Adocicada, cremosa e quente."
    ],

    musk: [
        "Musk",
        "☁",
        "Sensação limpa e confortável."
    ]

};


const noteModal =
    $("#noteModal");


let noteClicks =
    0;


function showNote(
    key
) {

    const data =
        noteData[
            key
        ];


    if (!data) {
        return;
    }


    $("#noteModalTitle").textContent =
        data[0];


    $("#noteModalIcon").textContent =
        data[1];


    $("#noteModalText").textContent =
        data[2];


    openLayer(
        noteModal
    );


    noteClicks++;


    if (
        noteClicks
        >=
        6
    ) {

        unlockAchievement(
            "perfumer"
        );

    }

}


$$(
    ".note-chip"
)
.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                showNote(
                    botao.dataset.note
                );

            }
        );

    }
);


$$(
    ".close-note"
)
.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                closeLayer(
                    noteModal
                );

            }
        );

    }
);


function randomNote() {

    const key =
        pick(
            Object.keys(
                noteData
            )
        );


    const data =
        noteData[
            key
        ];


    $("#randomNoteIcon").textContent =
        data[1];


    $("#randomNoteTitle").textContent =
        data[0];


    $("#randomNoteText").textContent =
        data[2];


    showToast(
        "Sua nota é "
        +
        data[0]
        +
        " ✦"
    );


    return key;

}


$("#randomNoteButton")
    ?.addEventListener(
        "click",
        randomNote
    );


/* =========================================================
   23 - RODA OLFATIVA
========================================================= */

const wheelData = {

    floral: [
        "Floral",
        "Romântico e delicado",
        "90%"
    ],

    frutado: [
        "Frutado",
        "Suculento e alegre",
        "72%"
    ],

    citrico: [
        "Cítrico",
        "Fresco e luminoso",
        "68%"
    ],

    doce: [
        "Doce",
        "Macio e confortável",
        "65%"
    ],

    amadeirado: [
        "Amadeirado",
        "Cremoso e elegante",
        "55%"
    ],

    ambarado: [
        "Âmbar",
        "Quente e envolvente",
        "52%"
    ]

};


$$(
    "[data-wheel]"
)
.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                $$(
                    "[data-wheel]"
                )
                .forEach(
                    outro => {

                        outro.classList.remove(
                            "active"
                        );

                    }
                );


                botao.classList.add(
                    "active"
                );


                const data =
                    wheelData[
                        botao.dataset.wheel
                    ];


                $("#wheelTitle").textContent =
                    data[0];


                $("#wheelText").textContent =
                    data[1];


                $("#wheelPercent").textContent =
                    data[2];


                playChime(
                    540,
                    .05
                );

            }
        );

    }
);


$(
    '[data-wheel="floral"]'
)
?.classList
.add(
    "active"
);


/* =========================================================
   24 - TIMELINE
========================================================= */

const timeline =
    $("#timelineSlider");


function updateTimeline() {

    if (!timeline) {
        return;
    }


    const hora =
        Number(
            timeline.value
        );


    $("#timelineHour").textContent =
        hora
        +
        "h";


    let data;


    if (
        hora <= 1
    ) {

        data = [

            "🍊",

            "Abertura fresca",

            "Cítricos e frutas aparecem primeiro."

        ];

    }

    else if (
        hora <= 4
    ) {

        data = [

            "🌸",

            "Coração floral",

            "Rosa, flores e frutas ganham destaque."

        ];

    }

    else {

        data = [

            "✨",

            "Fundo confortável",

            "Âmbar, sândalo, baunilha, tonka e musk encerram a evolução."

        ];

    }


    $("#timelineIcon").textContent =
        data[0];


    $("#timelineTitle").textContent =
        data[1];


    $("#timelineText").textContent =
        data[2];

}


timeline
    ?.addEventListener(
        "input",
        updateTimeline
    );


updateTimeline();


/* =========================================================
   26 - RECOMENDAÇÃO
========================================================= */

const routineMessages = {

    "rotina-manha":
        "☀ Um começo leve: use após o banho e renove se quiser.",

    "rotina-tarde":
        "✿ Uma pausa Dream: reaplique para renovar a sensação.",

    "rotina-noite":
        "☾ Para fechar o dia: um toque confortável antes de relaxar.",

    "encontro-manha":
        "♡ Encontro de dia: mantenha a aplicação leve e delicada.",

    "encontro-tarde":
        "♡ Tarde especial: floral e romântico em destaque.",

    "encontro-noite":
        "♡ Noite especial: reaplique antes de sair.",

    "festa-manha":
        "✦ Dia animado: use uma aplicação leve.",

    "festa-tarde":
        "✦ Tarde marcante: renove antes do evento.",

    "festa-noite":
        "✦ Festa à noite: escolha uma aplicação mais presente.",

    "relax-manha":
        "☁ Manhã tranquila: use depois do banho.",

    "relax-tarde":
        "☁ Tarde de descanso: um toque confortável.",

    "relax-noite":
        "☁ Noite calma: finalize a rotina com leveza."

};


$("#generateRoutine")
    ?.addEventListener(
        "click",
        () => {

            const key =
                $("#occasionSelect").value
                +
                "-"
                +
                $("#periodSelect").value;


            $("#recommendation").textContent =
                routineMessages[
                    key
                ]
                ||
                "Seu momento Dream está pronto ♡";


            playChime(
                600,
                .05
            );

        }
    );


/* =========================================================
   27 - 35 CARROSSEL
========================================================= */

const track =
    $("#carouselTrack");


const slides =
    $$(".slide");


const dots =
    $("#carouselDots");


const autoplayButton =
    $("#autoplayButton");


const speedSelect =
    $("#carouselSpeed");


let slideIndex =
    0;


let carouselTimer =
    null;


let autoplay =
    load(
        "dreamAutoplay",
        "on"
    )
    !==
    "off";


let carouselSpeed =
    Number(
        load(
            "dreamCarouselSpeed",
            "6000"
        )
    );


function updateCarousel() {

    if (
        track
    ) {

        track.style.transform =
            `translateX(-${slideIndex * 100}%)`;

    }


    $$(
        ".carousel-dots button"
    )
    .forEach(
        (
            dot,
            index
        ) => {

            dot.classList.toggle(
                "active",
                index === slideIndex
            );

        }
    );

}


slides.forEach(
    (
        slide,
        index
    ) => {

        const button =
            document.createElement(
                "button"
            );


        button.setAttribute(
            "aria-label",
            "Ir para imagem "
            +
            (
                index + 1
            )
        );


        if (
            index === 0
        ) {

            button.classList.add(
                "active"
            );

        }


        button.onclick =
            () => {

                slideIndex =
                    index;


                updateCarousel();


                restartCarousel();

            };


        dots
            ?.appendChild(
                button
            );

    }
);


function nextSlide() {

    if (
        !slides.length
    ) {
        return;
    }


    slideIndex =
        (
            slideIndex
            +
            1
        )
        %
        slides.length;


    updateCarousel();

}


function prevSlide() {

    if (
        !slides.length
    ) {
        return;
    }


    slideIndex =
        (
            slideIndex
            -
            1
            +
            slides.length
        )
        %
        slides.length;


    updateCarousel();

}


function updateAutoplayUI() {

    if (
        !autoplayButton
    ) {
        return;
    }


    autoplayButton.classList.toggle(
        "active",
        autoplay
    );


    autoplayButton.textContent =
        autoplay
            ?
            "❚❚ Autoplay ON"
            :
            "▶ Autoplay OFF";

}


function restartCarousel() {

    clearInterval(
        carouselTimer
    );


    carouselTimer =
        null;


    if (
        autoplay
        &&
        slides.length > 1
    ) {

        carouselTimer =
            setInterval(
                nextSlide,
                carouselSpeed
            );

    }

}


$("#nextSlide")
    ?.addEventListener(
        "click",
        () => {

            nextSlide();

            restartCarousel();

        }
    );


$("#prevSlide")
    ?.addEventListener(
        "click",
        () => {

            prevSlide();

            restartCarousel();

        }
    );


autoplayButton
    ?.addEventListener(
        "click",
        () => {

            autoplay =
                !autoplay;


            save(
                "dreamAutoplay",
                autoplay
                    ?
                    "on"
                    :
                    "off"
            );


            updateAutoplayUI();


            restartCarousel();

        }
    );


if (
    speedSelect
) {

    speedSelect.value =
        String(
            carouselSpeed
        );


    speedSelect.addEventListener(
        "change",
        () => {

            carouselSpeed =
                Number(
                    speedSelect.value
                );


            save(
                "dreamCarouselSpeed",
                carouselSpeed
            );


            restartCarousel();


            showToast(
                "Velocidade alterada"
            );

        }
    );

}


$("#carouselArea")
    ?.addEventListener(
        "mouseenter",
        () => {

            clearInterval(
                carouselTimer
            );

        }
    );


$("#carouselArea")
    ?.addEventListener(
        "mouseleave",
        restartCarousel
    );


let touchStart =
    0;


$(".carousel-window")
    ?.addEventListener(
        "touchstart",
        evento => {

            touchStart =
                evento.touches[0]
                    .clientX;

        },
        {
            passive: true
        }
    );


$(".carousel-window")
    ?.addEventListener(
        "touchend",
        evento => {

            const diferenca =
                touchStart
                -
                evento.changedTouches[0]
                    .clientX;


            if (
                Math.abs(
                    diferenca
                )
                >
                45
            ) {

                if (
                    diferenca > 0
                ) {

                    nextSlide();

                }

                else {

                    prevSlide();

                }


                restartCarousel();

            }

        },
        {
            passive: true
        }
    );


$("#galleryRandom")
    ?.addEventListener(
        "click",
        () => {

            if (
                slides.length < 2
            ) {
                return;
            }


            let random =
                slideIndex;


            while (
                random === slideIndex
            ) {

                random =
                    Math.floor(
                        Math.random()
                        *
                        slides.length
                    );

            }


            slideIndex =
                random;


            updateCarousel();


            restartCarousel();

        }
    );


updateAutoplayUI();

updateCarousel();

restartCarousel();


/* =========================================================
   35 - LIGHTBOX
========================================================= */

const lightbox =
    $("#lightbox");


const lightboxImage =
    $("#lightboxImage");


$$(
    ".slide img"
)
.forEach(
    imagem => {

        imagem.addEventListener(
            "click",
            () => {

                lightboxImage.src =
                    imagem.src;


                lightboxImage.alt =
                    imagem.alt;


                openLayer(
                    lightbox
                );


                unlockAchievement(
                    "galleryStar"
                );

            }
        );

    }
);


$("#lightboxClose")
    ?.addEventListener(
        "click",
        () => {

            closeLayer(
                lightbox
            );

        }
    );


$("#lightboxBackdrop")
    ?.addEventListener(
        "click",
        () => {

            closeLayer(
                lightbox
            );

        }
    );


/* =========================================================
   36 - 39 MOOD
========================================================= */

const moods = {

    romantico: [

        "♡",

        "Amor no Ar",

        "Um clima romântico, delicado e especial.",

        "mood-romantico"

    ],


    delicado: [

        "✿",

        "Leve & Delicado",

        "Uma atmosfera suave e confortável.",

        "mood-delicado"

    ],


    noturno: [

        "☾",

        "Dream After Dark",

        "Mais intensidade para a noite.",

        "mood-noturno"

    ],


    sonhador: [

        "☁",

        "Dreamy Clouds",

        "Um clima leve, imaginativo e calmo.",

        "mood-sonhador"

    ],


    radiante: [

        "☀",

        "Dream Sunshine",

        "Alegria, luz e energia.",

        "mood-radiante"

    ]

};


let currentMood =
    "romantico";


function setMood(
    key
) {

    const data =
        moods[
            key
        ];


    if (
        !data
    ) {
        return;
    }


    currentMood =
        key;


    $$(
        ".mood-button"
    )
    .forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.mood
                ===
                key
            );

        }
    );


    const card =
        $("#moodCard");


    card.className =
        "mood-card "
        +
        data[3];


    $("#moodIcon").textContent =
        data[0];


    $("#moodTitle").textContent =
        data[1];


    $("#moodText").textContent =
        data[2];


    playChime(
        500,
        .05
    );

}


$$(
    ".mood-button"
)
.forEach(
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


$("#saveMood")
    ?.addEventListener(
        "click",
        () => {

            save(
                "dreamMood",
                currentMood
            );


            showToast(
                "Mood salvo ♡"
            );

        }
    );


$("#loadMood")
    ?.addEventListener(
        "click",
        () => {

            const mood =
                load(
                    "dreamMood"
                );


            if (
                mood
            ) {

                setMood(
                    mood
                );


                showToast(
                    "Mood restaurado"
                );

            }

            else {

                showToast(
                    "Nenhum Mood salvo"
                );

            }

        }
    );


$("#randomMood")
    ?.addEventListener(
        "click",
        () => {

            setMood(
                pick(
                    Object.keys(
                        moods
                    )
                )
            );

        }
    );


/* =========================================================
   40 - 42 QUIZ
========================================================= */

const quizCard =
    $("#quizCard");


const quizQuestions = [

    [

        "Qual clima combina mais com você?",

        [

            [
                "♡ Romântico",
                "romantico"
            ],

            [
                "☀ Leve",
                "leve"
            ],

            [
                "✦ Elegante",
                "elegante"
            ]

        ]

    ],


    [

        "Qual momento você prefere?",

        [

            [
                "♡ Encontro",
                "romantico"
            ],

            [
                "☁ Pós-banho",
                "leve"
            ],

            [
                "☾ Sair à noite",
                "elegante"
            ]

        ]

    ],


    [

        "Qual sensação você procura?",

        [

            [
                "♡ Apaixonante",
                "romantico"
            ],

            [
                "☀ Confortável",
                "leve"
            ],

            [
                "✦ Marcante",
                "elegante"
            ]

        ]

    ],


    [

        "Escolha um cenário",

        [

            [
                "🌸 Jardim",
                "romantico"
            ],

            [
                "☁ Quarto aconchegante",
                "leve"
            ],

            [
                "✨ Noite iluminada",
                "elegante"
            ]

        ]

    ]

];


const quizResults = {

    romantico: [

        "♡",

        "Dream Romântico",

        "Você combina com detalhes especiais, flores e uma atmosfera apaixonante."

    ],


    leve: [

        "☀",

        "Dream Leve",

        "Seu Dream é confortável, tranquilo e perfeito para a rotina."

    ],


    elegante: [

        "✦",

        "Dream Elegante",

        "Você gosta de presença, personalidade e momentos marcantes."

    ]

};


let quizStep =
    0;


let quizScore = {

    romantico:
        0,

    leve:
        0,

    elegante:
        0

};


let lastQuizResult =
    null;


function renderQuiz() {

    if (
        !quizCard
    ) {
        return;
    }


    const pergunta =
        quizQuestions[
            quizStep
        ];


    const opcoes =
        pergunta[1]
            .map(
                opcao => {

                    return `
                        <button
                            data-score="${opcao[1]}"
                        >
                            ${opcao[0]}
                        </button>
                    `;

                }
            )
            .join(
                ""
            );


    quizCard.innerHTML =
        `

        <div>

            <span class="quiz-step">
                0${quizStep + 1}
                /
                0${quizQuestions.length}
            </span>

            <h3>
                ${pergunta[0]}
            </h3>

            <div class="quiz-options">
                ${opcoes}
            </div>

        </div>

        `;


    $$(
        ".quiz-options button",
        quizCard
    )
    .forEach(
        button => {

            button.onclick =
                () => {

                    quizScore[
                        button.dataset.score
                    ]++;


                    quizStep++;


                    if (
                        quizStep
                        <
                        quizQuestions.length
                    ) {

                        renderQuiz();

                    }

                    else {

                        renderQuizResult();

                    }

                };

        }
    );

}


function renderQuizResult() {

    const key =
        Object.keys(
            quizScore
        )
        .sort(
            (
                a,
                b
            ) => {

                return (
                    quizScore[b]
                    -
                    quizScore[a]
                );

            }
        )[0];


    const result =
        quizResults[
            key
        ];


    lastQuizResult = {

        key:
            key,

        icon:
            result[0],

        title:
            result[1],

        text:
            result[2]

    };


    quizCard.innerHTML =
        `

        <div class="quiz-result">

            <span>
                ${result[0]}
            </span>

            <h3>
                ${result[1]}
            </h3>

            <p>
                ${result[2]}
            </p>

            <div class="action-row">

                <button
                    class="primary-btn"
                    id="quizAgain"
                >
                    Fazer novamente
                </button>

                <button
                    class="outline-btn"
                    id="quizShare"
                >
                    Criar cartão
                </button>

            </div>

        </div>

        `;


    $("#quizAgain").onclick =
        resetQuiz;


    $("#quizShare").onclick =
        openQuizShare;


    unlockAchievement(
        "quizDreamer"
    );

}


function resetQuiz() {

    quizStep =
        0;


    quizScore = {

        romantico:
            0,

        leve:
            0,

        elegante:
            0

    };


    lastQuizResult =
        null;


    renderQuiz();

}


renderQuiz();


/* =========================================================
   CARTÃO DO QUIZ
========================================================= */

const quizShareModal =
    $("#quizShareModal");


const quizCanvas =
    $("#quizCanvas");


function openQuizShare() {

    if (
        !lastQuizResult
        ||
        !quizCanvas
    ) {

        return;

    }


    const context =
        quizCanvas.getContext(
            "2d"
        );


    const width =
        quizCanvas.width;


    const height =
        quizCanvas.height;


    const style =
        getComputedStyle(
            document.documentElement
        );


    const primary =
        style
            .getPropertyValue(
                "--primary"
            )
            .trim()
        ||
        "#df76a8";


    const secondary =
        style
            .getPropertyValue(
                "--secondary"
            )
            .trim()
        ||
        "#9562dc";


    const gradient =
        context.createLinearGradient(
            0,
            0,
            width,
            height
        );


    gradient.addColorStop(
        0,
        primary
    );


    gradient.addColorStop(
        1,
        secondary
    );


    context.fillStyle =
        gradient;


    context.fillRect(
        0,
        0,
        width,
        height
    );


    context.fillStyle =
        "rgba(255,255,255,.13)";


    context.beginPath();


    context.arc(
        860,
        230,
        260,
        0,
        Math.PI * 2
    );


    context.fill();


    context.beginPath();


    context.arc(
        160,
        1120,
        190,
        0,
        Math.PI * 2
    );


    context.fill();


    context.fillStyle =
        "#ffffff";


    context.textAlign =
        "center";


    context.font =
        "900 64px Arial";


    context.fillText(
        "DREAM • AMOR NO AR",
        width / 2,
        150
    );


    context.font =
        "130px Arial";


    context.fillText(
        lastQuizResult.icon,
        width / 2,
        420
    );


    context.font =
        "900 84px Arial";


    wrapCanvasText(
        context,
        lastQuizResult.title,
        width / 2,
        570,
        820,
        95
    );


    context.font =
        "38px Arial";


    wrapCanvasText(
        context,
        lastQuizResult.text,
        width / 2,
        790,
        760,
        54
    );


    context.font =
        "700 34px Arial";


    context.fillText(
        "350 ml • Meu resultado Dream",
        width / 2,
        1190
    );


    context.font =
        "28px Arial";


    context.fillText(
        "Projeto demonstrativo não oficial",
        width / 2,
        1260
    );


    openLayer(
        quizShareModal
    );

}


function wrapCanvasText(
    context,
    texto,
    x,
    y,
    maxWidth,
    lineHeight
) {

    const palavras =
        texto.split(
            " "
        );


    let linha =
        "";


    const linhas =
        [];


    for (
        const palavra
        of
        palavras
    ) {

        const teste =
            linha
            +
            palavra
            +
            " ";


        if (
            context
                .measureText(
                    teste
                )
                .width
            >
            maxWidth
            &&
            linha
        ) {

            linhas.push(
                linha.trim()
            );


            linha =
                palavra
                +
                " ";

        }

        else {

            linha =
                teste;

        }

    }


    linhas.push(
        linha.trim()
    );


    linhas.forEach(
        (
            linhaAtual,
            index
        ) => {

            context.fillText(
                linhaAtual,
                x,
                y
                +
                index
                *
                lineHeight
            );

        }
    );


    return linhas.length;

}


$$(
    ".close-quiz-share"
)
.forEach(
    button => {

        button.onclick =
            () => {

                closeLayer(
                    quizShareModal
                );

            };

    }
);


$("#downloadQuizCard")
    ?.addEventListener(
        "click",
        () => {

            const link =
                document.createElement(
                    "a"
                );


            link.download =
                "meu-dream-mood.png";


            link.href =
                quizCanvas.toDataURL(
                    "image/png"
                );


            link.click();


            showToast(
                "Cartão Dream criado ↓"
            );

        }
    );


/* =========================================================
   43 - SAUDAÇÃO
========================================================= */

function updateGreeting() {

    const hora =
        new Date()
            .getHours();


    let titulo;

    let texto;


    if (
        hora >= 5
        &&
        hora < 12
    ) {

        titulo =
            "Bom dia ♡";


        texto =
            "Comece o dia com leveza e Dream.";

    }

    else if (
        hora >= 12
        &&
        hora < 18
    ) {

        titulo =
            "Boa tarde ✿";


        texto =
            "Um ótimo momento para renovar a fragrância.";

    }

    else {

        titulo =
            "Boa noite ☾";


        texto =
            "Deixe o amor no ar durante sua noite.";

    }


    if (
        $("#greetingTitle")
    ) {

        $("#greetingTitle").textContent =
            titulo;

    }


    if (
        $("#greetingText")
    ) {

        $("#greetingText").textContent =
            texto;

    }


    if (
        hora < 5
    ) {

        unlockAchievement(
            "nightOwl"
        );

    }

}


updateGreeting();


/* =========================================================
   44 - VISITAS
========================================================= */

let visits =
    Number(
        load(
            "dreamVisits",
            "0"
        )
    )
    +
    1;


save(
    "dreamVisits",
    visits
);


if (
    $("#visitCount")
) {

    $("#visitCount").textContent =
        visits;

}


/* =========================================================
   45 - TEMPO DE SESSÃO
========================================================= */

const sessionStart =
    Date.now();


setInterval(
    () => {

        const segundos =
            Math.floor(
                (
                    Date.now()
                    -
                    sessionStart
                )
                /
                1000
            );


        const minutos =
            Math.floor(
                segundos
                /
                60
            );


        const segundosRestantes =
            segundos
            %
            60;


        if (
            $("#sessionTime")
        ) {

            $("#sessionTime").textContent =
                String(
                    minutos
                )
                .padStart(
                    2,
                    "0"
                )
                +
                ":"
                +
                String(
                    segundosRestantes
                )
                .padStart(
                    2,
                    "0"
                );

        }


        if (
            segundos >= 180
        ) {

            unlockAchievement(
                "stayedAwhile"
            );

        }

    },
    1000
);


/* =========================================================
   46 - INTENSIDADE
========================================================= */

const intensity =
    $("#intensitySlider");


function updateIntensity() {

    if (
        !intensity
    ) {
        return;
    }


    const valor =
        Number(
            intensity.value
        );


    $("#intensityValue").textContent =
        valor
        +
        "%";


    let nome;

    let texto;


    if (
        valor <= 33
    ) {

        nome =
            "Suave";


        texto =
            "Uma experiência leve e delicada.";

    }

    else if (
        valor <= 66
    ) {

        nome =
            "Equilibrado";


        texto =
            "Equilíbrio entre leveza e presença.";

    }

    else {

        nome =
            "Marcante";


        texto =
            "Uma experiência mais presente e intensa.";

    }


    $("#intensityName").textContent =
        nome;


    $("#intensityText").textContent =
        texto;


    save(
        "dreamIntensity",
        valor
    );

}


if (
    intensity
) {

    intensity.value =
        load(
            "dreamIntensity",
            "50"
        );


    intensity.addEventListener(
        "input",
        updateIntensity
    );


    updateIntensity();

}


/* =========================================================
   47 - ZOOM DO FRASCO
========================================================= */

const bottleZoom =
    $("#bottleZoom");


function setBottleZoom(
    valor
) {

    valor =
        clamp(
            Number(
                valor
            ),
            80,
            125
        );


    document.documentElement
        .style
        .setProperty(
            "--bottle-scale",
            valor
            /
            100
        );


    $("#bottleZoomValue").textContent =
        valor
        +
        "%";


    save(
        "dreamBottleZoom",
        valor
    );

}


if (
    bottleZoom
) {

    bottleZoom.value =
        load(
            "dreamBottleZoom",
            "100"
        );


    bottleZoom.addEventListener(
        "input",
        () => {

            setBottleZoom(
                bottleZoom.value
            );

        }
    );


    setBottleZoom(
        bottleZoom.value
    );

}


/* =========================================================
   48 - 51 FAQ
========================================================= */

$$(
    ".faq-question"
)
.forEach(
    question => {

        question.addEventListener(
            "click",
            () => {

                question.closest(
                    ".faq-item"
                )
                ?.classList
                .toggle(
                    "open"
                );

            }
        );

    }
);


$("#faqSearch")
    ?.addEventListener(
        "input",
        evento => {

            const busca =
                evento.target.value
                    .toLowerCase()
                    .trim();


            let encontrados =
                0;


            $$(
                ".faq-item"
            )
            .forEach(
                item => {

                    const mostrar =
                        item.textContent
                            .toLowerCase()
                            .includes(
                                busca
                            );


                    item.style.display =
                        mostrar
                            ?
                            ""
                            :
                            "none";


                    if (
                        mostrar
                    ) {

                        encontrados++;

                    }

                }
            );


            $("#faqEmpty")
                ?.classList
                .toggle(
                    "show",
                    encontrados === 0
                );

        }
    );


$("#openAllFaq")
    ?.addEventListener(
        "click",
        () => {

            $$(
                ".faq-item"
            )
            .forEach(
                item => {

                    if (
                        item.style.display
                        !==
                        "none"
                    ) {

                        item.classList.add(
                            "open"
                        );

                    }

                }
            );

        }
    );


$("#closeAllFaq")
    ?.addEventListener(
        "click",
        () => {

            $$(
                ".faq-item"
            )
            .forEach(
                item => {

                    item.classList.remove(
                        "open"
                    );

                }
            );

        }
    );


/* =========================================================
   52 - TEMA
========================================================= */

const themeButton =
    $("#themeButton");


const darkToggle =
    $("#darkToggle");


function setDark(
    ativo,
    persistir = true
) {

    document.body.classList.toggle(
        "dark",
        ativo
    );


    if (
        themeButton
    ) {

        themeButton.textContent =
            ativo
                ?
                "☀"
                :
                "☾";

    }


    if (
        darkToggle
    ) {

        darkToggle.checked =
            ativo;

    }


    if (
        persistir
    ) {

        save(
            "dreamTheme",
            ativo
                ?
                "dark"
                :
                "light"
        );

    }

}


function disableAutoTheme() {

    save(
        "dreamAutoTheme",
        "off"
    );


    updateAutoThemeButton();

}


themeButton
    ?.addEventListener(
        "click",
        () => {

            disableAutoTheme();


            setDark(
                !document.body
                    .classList
                    .contains(
                        "dark"
                    )
            );

        }
    );


darkToggle
    ?.addEventListener(
        "change",
        () => {

            disableAutoTheme();


            setDark(
                darkToggle.checked
            );

        }
    );


/* =========================================================
   53 - TEMA AUTOMÁTICO
========================================================= */

const autoThemeButton =
    $("#autoThemeButton");


function autoThemeOn() {

    return (
        load(
            "dreamAutoTheme",
            "off"
        )
        ===
        "on"
    );

}


function applyAutoTheme() {

    if (
        !autoThemeOn()
    ) {
        return;
    }


    const hora =
        new Date()
            .getHours();


    setDark(
        hora >= 18
        ||
        hora < 6,
        false
    );

}


function updateAutoThemeButton() {

    const ativo =
        autoThemeOn();


    autoThemeButton
        ?.classList
        .toggle(
            "active",
            ativo
        );


    if (
        autoThemeButton
    ) {

        autoThemeButton.textContent =
            ativo
                ?
                "◐ Tema auto ON"
                :
                "◐ Tema automático";

    }

}


autoThemeButton
    ?.addEventListener(
        "click",
        () => {

            save(
                "dreamAutoTheme",
                autoThemeOn()
                    ?
                    "off"
                    :
                    "on"
            );


            updateAutoThemeButton();


            applyAutoTheme();


            showToast(
                autoThemeOn()
                    ?
                    "Tema automático ativado"
                    :
                    "Tema automático desativado"
            );

        }
    );


/* =========================================================
   54 - 56 PALETAS
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


function lighten(
    hex,
    fator = .84
) {

    hex =
        hex.replace(
            "#",
            ""
        );


    if (
        hex.length === 3
    ) {

        hex =
            hex
                .split(
                    ""
                )
                .map(
                    letra => {

                        return letra
                            +
                            letra;

                    }
                )
                .join(
                    ""
                );

    }


    const numero =
        parseInt(
            hex,
            16
        );


    const red =
        numero
        >>
        16;


    const green =
        numero
        >>
        8
        &
        255;


    const blue =
        numero
        &
        255;


    const misturar =
        valor => {

            return Math.round(

                valor
                +
                (
                    255
                    -
                    valor
                )
                *
                fator

            );

        };


    return (
        "#"
        +
        [
            misturar(red),
            misturar(green),
            misturar(blue)
        ]
        .map(
            valor => {

                return valor
                    .toString(
                        16
                    )
                    .padStart(
                        2,
                        "0"
                    );

            }
        )
        .join(
            ""
        )
    );

}


function applyColors(
    primary,
    secondary,
    persistir = true
) {

    const root =
        document.documentElement;


    root.style.setProperty(
        "--primary",
        primary
    );


    root.style.setProperty(
        "--secondary",
        secondary
    );


    root.style.setProperty(
        "--primary-soft",
        lighten(
            primary
        )
    );


    root.style.setProperty(
        "--secondary-soft",
        lighten(
            secondary
        )
    );


    if (
        $("#primaryColor")
    ) {

        $("#primaryColor").value =
            primary;

    }


    if (
        $("#secondaryColor")
    ) {

        $("#secondaryColor").value =
            secondary;

    }


    $(
        'meta[name="theme-color"]'
    )
    ?.setAttribute(
        "content",
        primary
    );


    if (
        persistir
    ) {

        save(
            "dreamPrimary",
            primary
        );


        save(
            "dreamSecondary",
            secondary
        );

    }

}


$$(
    ".palette"
)
.forEach(
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


                applyColors(
                    ...palette
                );


                save(
                    "dreamPalette",
                    button.dataset.palette
                );


                $$(
                    ".palette"
                )
                .forEach(
                    outro => {

                        outro.classList.toggle(
                            "active",
                            outro === button
                        );

                    }
                );


                unlockAchievement(
                    "painter"
                );


                showToast(
                    "Paleta alterada ✦"
                );

            }
        );

    }
);


function manualColors() {

    const primary =
        $("#primaryColor")
            ?.value;


    const secondary =
        $("#secondaryColor")
            ?.value;


    if (
        !primary
        ||
        !secondary
    ) {
        return;
    }


    applyColors(
        primary,
        secondary
    );


    save(
        "dreamPalette",
        "custom"
    );


    $$(
        ".palette"
    )
    .forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    unlockAchievement(
        "painter"
    );

}


$("#primaryColor")
    ?.addEventListener(
        "input",
        manualColors
    );


$("#secondaryColor")
    ?.addEventListener(
        "input",
        manualColors
    );


function randomHex() {

    return (
        "#"
        +
        Math.floor(
            Math.random()
            *
            0xffffff
        )
        .toString(
            16
        )
        .padStart(
            6,
            "0"
        )
    );

}


function randomPalette() {

    const primary =
        randomHex();


    const secondary =
        randomHex();


    applyColors(
        primary,
        secondary
    );


    save(
        "dreamPalette",
        "custom"
    );


    $$(
        ".palette"
    )
    .forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    showToast(
        "Paleta surpresa 🎨"
    );


    unlockAchievement(
        "painter"
    );

}


$("#randomPaletteButton")
    ?.addEventListener(
        "click",
        randomPalette
    );


/* =========================================================
   PAINEL
========================================================= */

$("#settingsButton")
    ?.addEventListener(
        "click",
        () => {

            $("#settingsPanel")
                ?.classList
                .toggle(
                    "open"
                );

        }
    );


$("#closeSettings")
    ?.addEventListener(
        "click",
        () => {

            $("#settingsPanel")
                ?.classList
                .remove(
                    "open"
                );

        }
    );


/* =========================================================
   57 - 61 TOGGLES
========================================================= */

const particlesToggle =
    $("#particlesToggle");


const animationsToggle =
    $("#animationsToggle");


const glassToggle =
    $("#glassToggle");


const cursorToggle =
    $("#cursorToggle");


function bindBodyToggle(
    input,
    classe,
    chave
) {

    if (
        !input
    ) {
        return;
    }


    const salvo =
        load(
            chave,
            input.checked
                ?
                "on"
                :
                "off"
        );


    input.checked =
        salvo !== "off";


    document.body.classList.toggle(
        classe,
        !input.checked
    );


    input.addEventListener(
        "change",
        () => {

            document.body.classList.toggle(
                classe,
                !input.checked
            );


            save(
                chave,
                input.checked
                    ?
                    "on"
                    :
                    "off"
            );

        }
    );

}


bindBodyToggle(
    particlesToggle,
    "no-particles",
    "dreamParticles"
);


bindBodyToggle(
    animationsToggle,
    "no-animations",
    "dreamAnimations"
);


bindBodyToggle(
    glassToggle,
    "no-glass",
    "dreamGlass"
);


bindBodyToggle(
    cursorToggle,
    "no-cursor",
    "dreamCursor"
);


/* =========================================================
   TAMANHO DO TEXTO
========================================================= */

function setFontSize(
    tamanho,
    persistir = true
) {

    document.body.classList.remove(
        "font-small",
        "font-large"
    );


    if (
        tamanho ===
        "small"
    ) {

        document.body.classList.add(
            "font-small"
        );

    }


    if (
        tamanho ===
        "large"
    ) {

        document.body.classList.add(
            "font-large"
        );

    }


    $$(
        "[data-font-size]"
    )
    .forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.fontSize
                ===
                tamanho
            );

        }
    );


    if (
        persistir
    ) {

        save(
            "dreamFontSize",
            tamanho
        );

    }

}


$$(
    "[data-font-size]"
)
.forEach(
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
   62 - MODO FOCO
========================================================= */

$("#focusMode")
    ?.addEventListener(
        "click",
        evento => {

            document.body.classList.toggle(
                "focus-mode"
            );


            const ativo =
                document.body
                    .classList
                    .contains(
                        "focus-mode"
                    );


            evento.currentTarget
                .classList
                .toggle(
                    "active",
                    ativo
                );


            evento.currentTarget.textContent =
                ativo
                    ?
                    "◉ Sair do foco"
                    :
                    "◉ Modo foco";

        }
    );


/* =========================================================
   63 - TELA CHEIA
========================================================= */

$("#fullscreenButton")
    ?.addEventListener(
        "click",
        async () => {

            try {

                if (
                    document.fullscreenElement
                ) {

                    await document
                        .exitFullscreen();

                }

                else {

                    await document
                        .documentElement
                        .requestFullscreen();

                }

            }

            catch (erro) {

                showToast(
                    "Tela cheia indisponível"
                );

            }

        }
    );


document.addEventListener(
    "fullscreenchange",
    () => {

        if (
            $("#fullscreenButton")
        ) {

            $("#fullscreenButton").textContent =
                document.fullscreenElement
                    ?
                    "⛶ Sair da tela cheia"
                    :
                    "⛶ Tela cheia";

        }

    }
);


/* =========================================================
   64 - APRESENTAÇÃO
========================================================= */

let presentationTimer =
    null;


let presentationIndex =
    0;


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


function startPresentation() {

    stopPresentation();


    presentationIndex =
        0;


    $("#presentationBadge")
        ?.classList
        .add(
            "show"
        );


    tracked[0]
        ?.scrollIntoView({

            behavior:
                "smooth"

        });


    presentationTimer =
        setInterval(
            () => {

                presentationIndex++;


                if (
                    presentationIndex
                    >=
                    tracked.length
                ) {

                    stopPresentation();


                    showToast(
                        "Apresentação concluída ♡"
                    );


                    return;

                }


                tracked[
                    presentationIndex
                ]
                .scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            },
            6000
        );

}


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


/* =========================================================
   65 - CONTRASTE
========================================================= */

const highContrastButton =
    $("#highContrastButton");


function setHighContrast(
    ativo
) {

    document.body.classList.toggle(
        "high-contrast",
        ativo
    );


    highContrastButton
        ?.classList
        .toggle(
            "active",
            ativo
        );


    save(
        "dreamHighContrast",
        ativo
            ?
            "on"
            :
            "off"
    );

}


highContrastButton
    ?.addEventListener(
        "click",
        () => {

            setHighContrast(
                !document.body
                    .classList
                    .contains(
                        "high-contrast"
                    )
            );

        }
    );


/* =========================================================
   66 - MODO LEITURA
========================================================= */

const readingButton =
    $("#readingModeButton");


function setReading(
    ativo
) {

    document.body.classList.toggle(
        "reading-mode",
        ativo
    );


    readingButton
        ?.classList
        .toggle(
            "active",
            ativo
        );


    save(
        "dreamReading",
        ativo
            ?
            "on"
            :
            "off"
    );

}


readingButton
    ?.addEventListener(
        "click",
        () => {

            setReading(
                !document.body
                    .classList
                    .contains(
                        "reading-mode"
                    )
            );

        }
    );


/* =========================================================
   67 - VIBRAÇÃO
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
                        80,
                        40,
                        80
                    ]
                );


                showToast(
                    "Vibração Dream 〰"
                );

            }

            else {

                showToast(
                    "Vibração não disponível neste dispositivo"
                );

            }

        }
    );


/* =========================================================
   68 - SOM
========================================================= */

let audioCtx =
    null;


let soundTimer =
    null;


let soundOn =
    false;


function playChime(
    frequencia = 660,
    duracao = .09
) {

    if (
        !soundOn
    ) {
        return;
    }


    try {

        audioCtx =
            audioCtx
            ||
            new (
                window.AudioContext
                ||
                window.webkitAudioContext
            )();


        const oscillator =
            audioCtx
                .createOscillator();


        const gain =
            audioCtx
                .createGain();


        oscillator.type =
            "sine";


        oscillator.frequency.value =
            frequencia;


        gain.gain.setValueAtTime(
            .025,
            audioCtx.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            .0001,
            audioCtx.currentTime
            +
            duracao
        );


        oscillator.connect(
            gain
        );


        gain.connect(
            audioCtx.destination
        );


        oscillator.start();


        oscillator.stop(
            audioCtx.currentTime
            +
            duracao
        );

    }

    catch (erro) {}

}


function setSound(
    ativo
) {

    soundOn =
        ativo;


    save(
        "dreamSound",
        ativo
            ?
            "on"
            :
            "off"
    );


    $("#ambientSoundButton")
        ?.classList
        .toggle(
            "active",
            ativo
        );


    if (
        $("#ambientSoundButton")
    ) {

        $("#ambientSoundButton").textContent =
            ativo
                ?
                "♫ Som ON"
                :
                "♫ Som OFF";

    }


    clearInterval(
        soundTimer
    );


    if (
        ativo
    ) {

        playChime(
            660,
            .1
        );


        soundTimer =
            setInterval(
                () => {

                    playChime(
                        pick(
                            [
                                440,
                                523,
                                659
                            ]
                        ),
                        .14
                    );

                },
                12000
            );

    }

}


$("#ambientSoundButton")
    ?.addEventListener(
        "click",
        () => {

            setSound(
                !soundOn
            );

        }
    );


/* =========================================================
   69 - CORAÇÕES AO CLICAR
========================================================= */

let clickHearts =
    load(
        "dreamClickHearts",
        "off"
    )
    ===
    "on";


function updateHeartsButton() {

    const button =
        $("#clickHeartsButton");


    button
        ?.classList
        .toggle(
            "active",
            clickHearts
        );


    if (
        button
    ) {

        button.textContent =
            clickHearts
                ?
                "♥ Corações ON"
                :
                "♥ Corações OFF";

    }

}


function heartBurstAt(
    x,
    y,
    quantidade = 6
) {

    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const heart =
            document.createElement(
                "span"
            );


        heart.className =
            "click-heart";


        heart.textContent =
            Math.random()
            >
            .5
                ?
                "♡"
                :
                "♥";


        heart.style.left =
            x
            +
            "px";


        heart.style.top =
            y
            +
            "px";


        heart.style.setProperty(
            "--x",
            (
                Math.random()
                *
                90
                -
                45
            )
            +
            "px"
        );


        heart.style.setProperty(
            "--y",
            -(
                30
                +
                Math.random()
                *
                85
            )
            +
            "px"
        );


        heart.style.setProperty(
            "--rot",
            (
                Math.random()
                *
                180
                -
                90
            )
            +
            "deg"
        );


        document.body.appendChild(
            heart
        );


        setTimeout(
            () => {

                heart.remove();

            },
            1000
        );

    }

}


$("#clickHeartsButton")
    ?.addEventListener(
        "click",
        () => {

            clickHearts =
                !clickHearts;


            save(
                "dreamClickHearts",
                clickHearts
                    ?
                    "on"
                    :
                    "off"
            );


            updateHeartsButton();

        }
    );


document.addEventListener(
    "click",
    evento => {

        if (
            clickHearts
            &&
            !evento.target.closest(
                "button, a, input, select, textarea, label"
            )
        ) {

            heartBurstAt(
                evento.clientX,
                evento.clientY
            );

        }

    }
);


updateHeartsButton();


/* =========================================================
   70 - CONQUISTAS
========================================================= */

const achievementDefs = {

    collector: [

        "♡",

        "Colecionador",

        "Favoritou o Dream."

    ],


    sprayMaster: [

        "✦",

        "Spray Master",

        "Borrifou 10 vezes."

    ],


    perfumer: [

        "✿",

        "Mini Perfumista",

        "Explorou várias notas."

    ],


    galleryStar: [

        "▣",

        "Gallery Star",

        "Abriu uma imagem da galeria."

    ],


    quizDreamer: [

        "☁",

        "Dreamer",

        "Concluiu o Quiz Dream."

    ],


    painter: [

        "🎨",

        "Dream Designer",

        "Mudou a paleta do site."

    ],


    explorer: [

        "🧭",

        "Explorer",

        "Visitou 8 seções."

    ],


    nightOwl: [

        "☾",

        "Night Dreamer",

        "Visitou o Dream de madrugada."

    ],


    dreamLover: [

        "♥",

        "Dream Lover",

        "Descobriu o segredo do logo."

    ],


    konami: [

        "★",

        "Galaxy Dream",

        "Ativou o código secreto."

    ],


    secretWord: [

        "∞",

        "Amor no Código",

        "Digitou a palavra secreta."

    ],


    bottleSecret: [

        "💎",

        "Crystal Dream",

        "Descobriu o segredo do frasco."

    ],


    stayedAwhile: [

        "◷",

        "Sem pressa",

        "Passou 3 minutos no Dream."

    ]

};


function unlockedSet() {

    return new Set(
        JSON.parse(
            load(
                "dreamAchievements",
                "[]"
            )
        )
    );

}


function saveUnlocked(
    set
) {

    save(
        "dreamAchievements",
        JSON.stringify(
            [
                ...set
            ]
        )
    );

}


function unlockAchievement(
    key
) {

    if (
        !achievementDefs[
            key
        ]
    ) {

        return;

    }


    const set =
        unlockedSet();


    if (
        set.has(
            key
        )
    ) {

        return;

    }


    set.add(
        key
    );


    saveUnlocked(
        set
    );


    updateAchievementCount();


    $("#achievementToastText").textContent =
        achievementDefs[
            key
        ][1];


    $("#achievementToast")
        ?.classList
        .add(
            "show"
        );


    setTimeout(
        () => {

            $("#achievementToast")
                ?.classList
                .remove(
                    "show"
                );

        },
        3200
    );


    playChime(
        880,
        .14
    );

}


function updateAchievementCount() {

    if (
        $("#achievementCount")
    ) {

        $("#achievementCount").textContent =
            unlockedSet()
                .size;

    }

}


function renderAchievements() {

    const set =
        unlockedSet();


    $("#achievementsList").innerHTML =
        Object.entries(
            achievementDefs
        )
        .map(
            (
                [
                    key,
                    data
                ]
            ) => {

                const bloqueada =
                    !set.has(
                        key
                    );


                return `

                    <div
                        class="achievement-item ${bloqueada ? "locked" : ""}"
                    >

                        <span>
                            ${data[0]}
                        </span>

                        <div>

                            <strong>
                                ${data[1]}
                            </strong>

                            <small>
                                ${
                                    bloqueada
                                        ?
                                        "Ainda bloqueada"
                                        :
                                        data[2]
                                }
                            </small>

                        </div>

                    </div>

                `;

            }
        )
        .join(
            ""
        );

}


const achievementsModal =
    $("#achievementsModal");


$("#openAchievements")
    ?.addEventListener(
        "click",
        () => {

            renderAchievements();


            openLayer(
                achievementsModal
            );

        }
    );


$$(
    ".close-achievements"
)
.forEach(
    button => {

        button.onclick =
            () => {

                closeLayer(
                    achievementsModal
                );

            };

    }
);


updateAchievementCount();


/* =========================================================
   SEÇÃO ALEATÓRIA
========================================================= */

function goRandomSection() {

    const candidates =
        tracked.filter(
            section => {

                return (
                    section.id
                    !==
                    "inicio"
                );

            }
        );


    if (
        !candidates.length
    ) {

        return;

    }


    pick(
        candidates
    )
    .scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}


$("#randomSection")
    ?.addEventListener(
        "click",
        goRandomSection
    );


$("#randomSectionLab")
    ?.addEventListener(
        "click",
        goRandomSection
    );


/* =========================================================
   BOTÃO ME SURPREENDA
========================================================= */

$("#surpriseButton")
    ?.addEventListener(
        "click",
        () => {

            randomPalette();


            const moodsDisponiveis =
                Object.keys(
                    moods
                );


            setMood(
                pick(
                    moodsDisponiveis
                )
            );


            randomNote();


            heartRain();


            showToast(
                "Dream surpresa ativado ✦"
            );

        }
    );


/* =========================================================
   BAIXAR FICHA
========================================================= */

$("#downloadSheet")
    ?.addEventListener(
        "click",
        () => {

            const texto =
`DREAM AMOR NO AR

Volume: 350 ml
Tipo: Body Splash
Família: Floral Amadeirado

NOTAS DE SAÍDA
Bergamota
Laranja
Mandarina
Limão
Cassis
Maçã

NOTAS DE CORPO
Rosa
Tília
Frésia
Flor de Lótus
Ameixa
Gardênia
Pêssego

NOTAS DE FUNDO
Âmbar
Sândalo
Baunilha
Fava Tonka
Musk

Projeto demonstrativo não oficial.
`;


            const blob =
                new Blob(
                    [
                        texto
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
                "dream-amor-no-ar-350ml.txt";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            URL.revokeObjectURL(
                url
            );


            showToast(
                "Ficha Dream baixada ↓"
            );

        }
    );


/* =========================================================
   RESET
========================================================= */

$("#resetSettings")
    ?.addEventListener(
        "click",
        () => {

            [

                "dreamPrimary",

                "dreamSecondary",

                "dreamPalette",

                "dreamTheme",

                "dreamAutoTheme",

                "dreamParticles",

                "dreamAnimations",

                "dreamGlass",

                "dreamCursor",

                "dreamFontSize",

                "dreamHighContrast",

                "dreamReading",

                "dreamBottleZoom",

                "dreamIntensity",

                "dreamClickHearts",

                "dreamSound"

            ]
            .forEach(
                chave => {

                    removeSaved(
                        chave
                    );

                }
            );


            applyColors(
                "#df76a8",
                "#9562dc",
                false
            );


            $$(
                ".palette"
            )
            .forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.palette
                        ===
                        "dream"
                    );

                }
            );


            setDark(
                false,
                false
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


            document.body.classList.remove(

                "no-particles",

                "no-animations",

                "no-glass",

                "no-cursor",

                "high-contrast",

                "reading-mode",

                "focus-mode",

                "font-small",

                "font-large",

                "secret-galaxy"

            );


            setFontSize(
                "normal",
                false
            );


            setHighContrast(
                false
            );


            setReading(
                false
            );


            clickHearts =
                false;


            updateHeartsButton();


            setSound(
                false
            );


            if (
                bottleZoom
            ) {

                bottleZoom.value =
                    "100";


                setBottleZoom(
                    100
                );

            }


            if (
                intensity
            ) {

                intensity.value =
                    "50";


                updateIntensity();

            }


            updateAutoThemeButton();


            showToast(
                "Configurações restauradas ♡"
            );

        }
    );


/* =========================================================
   EASTER EGG 1
   5 CLIQUES NO LOGO
========================================================= */

let logoClicks =
    0;


let logoTimer;


function heartRain() {

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const heart =
            document.createElement(
                "span"
            );


        heart.className =
            "heart-rain";


        heart.textContent =
            Math.random()
            >
            .5
                ?
                "♡"
                :
                "♥";


        heart.style.left =
            Math.random()
            *
            100
            +
            "vw";


        heart.style.fontSize =
            12
            +
            Math.random()
            *
            28
            +
            "px";


        heart.style.setProperty(
            "--x",
            (
                Math.random()
                *
                200
                -
                100
            )
            +
            "px"
        );


        document.body.appendChild(
            heart
        );


        setTimeout(
            () => {

                heart.remove();

            },
            3000
        );

    }

}


$$(
    "[data-easter-logo]"
)
.forEach(
    logo => {

        logo.addEventListener(
            "click",
            () => {

                logoClicks++;


                clearTimeout(
                    logoTimer
                );


                logoTimer =
                    setTimeout(
                        () => {

                            logoClicks =
                                0;

                        },
                        2400
                    );


                if (
                    logoClicks
                    >=
                    5
                ) {

                    logoClicks =
                        0;


                    heartRain();


                    showToast(
                        "Love is in the air ♡"
                    );


                    unlockAchievement(
                        "dreamLover"
                    );

                }

            }
        );

    }
);


/* =========================================================
   EASTER EGG 2
   KONAMI CODE
========================================================= */

const konami = [

    "ArrowUp",

    "ArrowUp",

    "ArrowDown",

    "ArrowDown",

    "ArrowLeft",

    "ArrowRight",

    "ArrowLeft",

    "ArrowRight",

    "b",

    "a"

];


let konamiPos =
    0;


function toggleGalaxy() {

    document.body.classList.toggle(
        "secret-galaxy"
    );


    heartRain();


    showToast(
        document.body
            .classList
            .contains(
                "secret-galaxy"
            )
            ?
            "GALAXY DREAM ATIVADO ★"
            :
            "Galaxy Dream desativado"
    );

}


/* =========================================================
   EASTER EGG 3
   DIGITAR DREAM
========================================================= */

let typedSecret =
    "";


function handleSecretTyping(
    key
) {

    if (
        key.length !== 1
    ) {

        return;

    }


    typedSecret =
        (
            typedSecret
            +
            key.toLowerCase()
        )
        .slice(
            -5
        );


    if (
        typedSecret
        ===
        "dream"
    ) {

        toggleGalaxy();


        unlockAchievement(
            "secretWord"
        );


        typedSecret =
            "";

    }

}


/* =========================================================
   EASTER EGG 4
   CLIQUE DUPLO NO FRASCO
========================================================= */

mainBottle
    ?.addEventListener(
        "dblclick",
        () => {

            mainBottle.animate(

                [

                    {
                        filter:
                            "drop-shadow(0 0 0 transparent)"
                    },

                    {
                        filter:
                            "drop-shadow(0 0 35px var(--primary))"
                    },

                    {
                        filter:
                            "drop-shadow(0 30px 28px rgba(65,25,60,.18))"
                    }

                ],

                {
                    duration:
                        1300
                }

            );


            heartRain();


            unlockAchievement(
                "bottleSecret"
            );


            showToast(
                "Crystal Dream desbloqueado 💎"
            );

        }
    );


/* =========================================================
   ATALHOS
========================================================= */

const shortcutsModal =
    $("#shortcutsModal");


$("#shortcutsButton")
    ?.addEventListener(
        "click",
        () => {

            openLayer(
                shortcutsModal
            );

        }
    );


$$(
    ".close-shortcuts"
)
.forEach(
    button => {

        button.onclick =
            () => {

                closeLayer(
                    shortcutsModal
                );

            };

    }
);


document.addEventListener(
    "keydown",
    evento => {

        const tag =
            document.activeElement
                ?.tagName;


        const digitando = [

            "INPUT",

            "TEXTAREA",

            "SELECT"

        ]
        .includes(
            tag
        );


        /*
           KONAMI
        */

        if (
            evento.key
            ===
            konami[
                konamiPos
            ]
        ) {

            konamiPos++;


            if (
                konamiPos
                ===
                konami.length
            ) {

                konamiPos =
                    0;


                toggleGalaxy();


                unlockAchievement(
                    "konami"
                );

            }

        }

        else {

            konamiPos =
                evento.key
                ===
                konami[0]
                    ?
                    1
                    :
                    0;

        }


        /*
           PALAVRA DREAM
        */

        if (
            !digitando
        ) {

            handleSecretTyping(
                evento.key
            );

        }


        /*
           ESC
        */

        if (
            evento.key
            ===
            "Escape"
        ) {

            closeEverything();


            stopPresentation();


            return;

        }


        if (
            digitando
        ) {
            return;
        }


        /*
           GALERIA
        */

        if (
            evento.key
            ===
            "ArrowRight"
        ) {

            nextSlide();


            restartCarousel();


            return;

        }


        if (
            evento.key
            ===
            "ArrowLeft"
        ) {

            prevSlide();


            restartCarousel();


            return;

        }


        const key =
            evento.key
                .toLowerCase();


        /*
           P = PERSONALIZAÇÃO
        */

        if (
            key === "p"
        ) {

            $("#settingsPanel")
                ?.classList
                .toggle(
                    "open"
                );

        }


        /*
           M = DARK MODE
        */

        if (
            key === "m"
        ) {

            themeButton
                ?.click();

        }


        /*
           G = GALERIA
        */

        if (
            key === "g"
        ) {

            $("#galeria")
                ?.scrollIntoView({

                    behavior:
                        "smooth"

                });

        }


        /*
           Q = QUIZ
        */

        if (
            key === "q"
        ) {

            $("#quiz")
                ?.scrollIntoView({

                    behavior:
                        "smooth"

                });

        }


        /*
           L = LAB
        */

        if (
            key === "l"
        ) {

            $("#lab")
                ?.scrollIntoView({

                    behavior:
                        "smooth"

                });

        }


        /*
           S = SPRAY
        */

        if (
            key === "s"
        ) {

            doSpray();

        }


        /*
           R = SEÇÃO ALEATÓRIA
        */

        if (
            key === "r"
        ) {

            goRandomSection();

        }


        /*
           ? = ATALHOS
        */

        if (
            evento.key
            ===
            "?"
        ) {

            openLayer(
                shortcutsModal
            );

        }

    }
);


/* =========================================================
   CARREGAR CONFIGURAÇÕES SALVAS
========================================================= */

(function initSaved() {

    const primary =
        load(
            "dreamPrimary"
        );


    const secondary =
        load(
            "dreamSecondary"
        );


    if (
        primary
        &&
        secondary
    ) {

        applyColors(
            primary,
            secondary,
            false
        );

    }


    const palette =
        load(
            "dreamPalette",
            "dream"
        );


    $$(
        ".palette"
    )
    .forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.palette
                ===
                palette
            );

        }
    );


    setFontSize(
        load(
            "dreamFontSize",
            "normal"
        ),
        false
    );


    setHighContrast(
        load(
            "dreamHighContrast",
            "off"
        )
        ===
        "on"
    );


    setReading(
        load(
            "dreamReading",
            "off"
        )
        ===
        "on"
    );


    const reduzMovimento =
        window.matchMedia
            ?.(
                "(prefers-reduced-motion: reduce)"
            )
            .matches;


    if (
        reduzMovimento
        &&
        load(
            "dreamAnimations",
            null
        )
        ===
        null
    ) {

        document.body.classList.add(
            "no-animations"
        );


        if (
            animationsToggle
        ) {

            animationsToggle.checked =
                false;

        }

    }


    if (
        autoThemeOn()
    ) {

        applyAutoTheme();

    }

    else {

        setDark(
            load(
                "dreamTheme",
                "light"
            )
            ===
            "dark",
            false
        );

    }


    updateAutoThemeButton();


    setSound(
        load(
            "dreamSound",
            "off"
        )
        ===
        "on"
    );

})();


/* =========================================================
   VISIBILIDADE DA ABA
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            clearInterval(
                carouselTimer
            );

        }

        else {

            restartCarousel();

        }

    }
);