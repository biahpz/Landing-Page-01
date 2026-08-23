/* =========================================================
   DREAM AMOR NO AR — SCRIPT v61.1
========================================================= */

document.documentElement.classList.add("js");

const $ = (selector, root = document) =>
    root.querySelector(selector);

const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

const clamp = (number, min, max) =>
    Math.max(min, Math.min(max, number));

const pick = array =>
    array[Math.floor(Math.random() * array.length)];


/* =========================================================
   STORAGE
========================================================= */

function save(key, value) {

    try {

        localStorage.setItem(
            key,
            String(value)
        );

    } catch (_) {}
}


function load(key, fallback = null) {

    try {

        const value =
            localStorage.getItem(key);

        return value === null
            ? fallback
            : value;

    } catch (_) {

        return fallback;
    }
}


function removeSaved(key) {

    try {

        localStorage.removeItem(key);

    } catch (_) {}
}


/* =========================================================
   COPY
========================================================= */

function copyText(text) {

    if (
        navigator.clipboard?.writeText
    ) {

        return navigator.clipboard.writeText(
            text
        );
    }


    return new Promise(
        (resolve, reject) => {

            try {

                const textarea =
                    document.createElement(
                        "textarea"
                    );

                textarea.value =
                    text;

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

            } catch (error) {

                reject(error);
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


function showToast(text) {

    if (
        !toast
    ) {
        return;
    }


    toast.textContent =
        text;


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
   MODAL HELPERS
========================================================= */

function syncBodyLock() {

    document.body.classList.toggle(
        "modal-open",
        !!$(
            ".modal.open, .lightbox.open"
        )
    );
}


function openLayer(element) {

    if (
        !element
    ) {
        return;
    }


    element.classList.add(
        "open"
    );


    element.setAttribute(
        "aria-hidden",
        "false"
    );


    syncBodyLock();
}


function closeLayer(element) {

    if (
        !element
    ) {
        return;
    }


    element.classList.remove(
        "open"
    );


    element.setAttribute(
        "aria-hidden",
        "true"
    );


    syncBodyLock();
}


function closeEverything() {

    $$(
        ".modal.open, .lightbox.open"
    ).forEach(
        closeLayer
    );


    $("#settingsPanel")
        ?.classList
        .remove(
            "open"
        );
}


/* =========================================================
   LOADER
========================================================= */

const loader =
    $("#loader");


function closeLoader() {

    if (
        !loader
    ) {
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
            closeLoader,
            850
        );
    }
);


/*
   Segurança contra carregamento infinito.
*/

setTimeout(
    closeLoader,
    3500
);


/* =========================================================
   SCROLL
========================================================= */

const progress =
    $("#scrollProgress");

const header =
    $("#header");

const backTop =
    $("#backTop");


function updateScrollUi() {

    const y =
        window.scrollY;


    const total =
        document.documentElement
            .scrollHeight -
        window.innerHeight;


    if (
        progress
    ) {

        progress.style.width =
            (
                total > 0
                    ? y / total * 100
                    : 0
            ) + "%";
    }


    header?.classList.toggle(
        "scrolled",
        y > 35
    );


    backTop?.classList.toggle(
        "show",
        y > 650
    );
}


window.addEventListener(
    "scroll",
    updateScrollUi,
    {
        passive: true
    }
);


updateScrollUi();


backTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


/* =========================================================
   MENU MOBILE
========================================================= */

const menu =
    $("#menu");

const menuMobile =
    $("#menuMobile");


menuMobile?.addEventListener(
    "click",
    () => {

        menu?.classList.toggle(
            "open"
        );


        menuMobile.textContent =
            menu?.classList.contains(
                "open"
            )
                ? "✕"
                : "☰";
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
   SCROLL SPY
========================================================= */

const tracked =
    $$(".section-track");

const sectionIndicator =
    $("#sectionIndicator");

const explored =
    new Set();


if (
    "IntersectionObserver" in window
) {

    const spy =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const id =
                            entry.target.id;


                        const name =
                            entry.target
                                .dataset
                                .sectionName ||
                            id;


                        const index =
                            tracked.indexOf(
                                entry.target
                            ) + 1;


                        if (
                            sectionIndicator
                        ) {

                            sectionIndicator.innerHTML =
                                `<span>${String(index).padStart(2, "0")}</span> ${name}`;
                        }


                        $$(".menu a")
                            .forEach(
                                link => {

                                    link.classList.toggle(
                                        "active",
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                            "#" + id
                                    );
                                }
                            );


                        explored.add(
                            id
                        );


                        if (
                            explored.size >= 8
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
        section => {

            spy.observe(
                section
            );
        }
    );
}


/* =========================================================
   REVEAL
========================================================= */

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

                            entry.target
                                .classList
                                .add(
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
                threshold: .07
            }
        );


    $$(".reveal")
        .forEach(
            element => {

                revealObserver.observe(
                    element
                );
            }
        );


    const meterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.width =
                                entry.target
                                    .dataset
                                    .meter +
                                "%";


                            meterObserver.unobserve(
                                entry.target
                            );
                        }
                    }
                );
            },
            {
                threshold: .35
            }
        );


    $$("[data-meter]")
        .forEach(
            element => {

                meterObserver.observe(
                    element
                );
            }
        );

} else {

    $$(".reveal")
        .forEach(
            element => {

                element.classList.add(
                    "visible"
                );
            }
        );


    $$("[data-meter]")
        .forEach(
            element => {

                element.style.width =
                    element.dataset.meter +
                    "%";
            }
        );
}


/* =========================================================
   PARTICLES
========================================================= */

const particles =
    $("#particles");


function createParticle() {

    if (
        !particles ||
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
        pick([
            "♡",
            "✦",
            "✿",
            "·"
        ]);


    particle.style.left =
        Math.random() *
        100 +
        "vw";


    particle.style.fontSize =
        8 +
        Math.random() *
        18 +
        "px";


    particle.style.animationDuration =
        8 +
        Math.random() *
        9 +
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
   CURSOR GLOW
========================================================= */

const cursorGlow =
    $("#cursorGlow");


window.addEventListener(
    "mousemove",
    event => {

        if (
            !cursorGlow ||
            window.innerWidth < 900
        ) {
            return;
        }


        cursorGlow.style.left =
            event.clientX +
            "px";


        cursorGlow.style.top =
            event.clientY +
            "px";
    }
);


/* =========================================================
   CAMPAIGN PARALLAX
========================================================= */

const campaignImage =
    $("#campaignImage");


window.addEventListener(
    "scroll",
    () => {

        if (
            !campaignImage ||
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
            rect &&
            rect.bottom > 0 &&
            rect.top <
                window.innerHeight
        ) {

            const offset =
                (
                    window.innerHeight /
                    2 -
                    (
                        rect.top +
                        rect.height /
                        2
                    )
                ) *
                .045;


            campaignImage.style.transform =
                `translateY(${offset}px) scale(1.03)`;
        }
    },
    {
        passive: true
    }
);


/* =========================================================
   PRODUCT 3D
========================================================= */

const heroProduct =
    $("#heroProduct");

const mainBottle =
    $("#mainBottle");

const productLight =
    $("#productLight");


heroProduct?.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth < 900 ||
            document.body
                .classList
                .contains(
                    "no-animations"
                )
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


        const rotateX =
            -(
                y -
                rect.height / 2
            ) /
            30;


        const rotateY =
            (
                x -
                rect.width / 2
            ) /
            30;


        if (
            mainBottle
        ) {

            mainBottle.style.transform =
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }


        if (
            productLight
        ) {

            productLight.style.left =
                x -
                95 +
                "px";


            productLight.style.top =
                y -
                95 +
                "px";
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
    }
);


/* =========================================================
   SPRAY
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


    /*
       Cada clique cria novamente
       todo o brilho / névoa.
    */

    for (
        let index = 0;
        index < 30;
        index++
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
                Math.random() *
                190 -
                95
            ) +
            "px"
        );


        dot.style.setProperty(
            "--y",
            -(
                35 +
                Math.random() *
                165
            ) +
            "px"
        );


        dot.style.animationDelay =
            Math.random() *
            .1 +
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
        sprayCount >= 10
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
   FAVORITO
========================================================= */

function isFavorite() {

    return load(
        "dreamFavorite",
        "no"
    ) ===
    "yes";
}


function updateFavoriteUI() {

    const yes =
        isFavorite();


    const text =
        yes
            ? "♥ Favoritado"
            : "♡ Favoritar";


    if (
        $("#favoriteButton")
    ) {

        $("#favoriteButton")
            .textContent =
            text;
    }


    if (
        $("#favoriteModal")
    ) {

        $("#favoriteModal")
            .textContent =
            text;
    }


    $("#favoriteButton")
        ?.classList
        .toggle(
            "active",
            yes
        );
}


function toggleFavorite() {

    const yes =
        !isFavorite();


    save(
        "dreamFavorite",
        yes
            ? "yes"
            : "no"
    );


    updateFavoriteUI();


    showToast(
        yes
            ? "Adicionado aos favoritos ♡"
            : "Removido dos favoritos"
    );


    if (
        yes
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
   SHARE
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

        } else {

            await copyText(
                location.href
            );


            showToast(
                "Link copiado!"
            );
        }

    } catch (_) {}
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
   WHATSAPP
========================================================= */

$("#whatsappShare")
    ?.addEventListener(
        "click",
        () => {

            window.open(
                "https://wa.me/?text=" +
                encodeURIComponent(
                    "Conheça Dream Amor no Ar 350 ml ♡ " +
                    location.href
                ),
                "_blank",
                "noopener,noreferrer"
            );
        }
    );


/* =========================================================
   COPY TOOLS
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
                            rect.top <=
                                innerHeight *
                                .5 &&
                            rect.bottom >=
                                innerHeight *
                                .5
                        );
                    }
                ) ||
                $("#produto");


            if (
                !visible
            ) {
                return;
            }


            const url =
                location.href
                    .split("#")[0] +
                "#" +
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
   PRODUCT MODAL
========================================================= */

const productModal =
    $("#productModal");


$$(".open-product")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    openLayer(
                        productModal
                    );
                }
            );
        }
    );


$$(".close-product")
    .forEach(
        button => {

            button.addEventListener(
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
   NOTES
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


function showNote(key) {

    const data =
        noteData[key];


    if (
        !data
    ) {
        return;
    }


    $("#noteModalTitle")
        .textContent =
        data[0];


    $("#noteModalIcon")
        .textContent =
        data[1];


    $("#noteModalText")
        .textContent =
        data[2];


    openLayer(
        noteModal
    );


    noteClicks++;


    if (
        noteClicks >= 6
    ) {

        unlockAchievement(
            "perfumer"
        );
    }
}


$$(".note-chip")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    showNote(
                        button.dataset.note
                    );
                }
            );
        }
    );


$$(".close-note")
    .forEach(
        button => {

            button.addEventListener(
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
        noteData[key];


    $("#randomNoteIcon")
        .textContent =
        data[1];


    $("#randomNoteTitle")
        .textContent =
        data[0];


    $("#randomNoteText")
        .textContent =
        data[2];


    showToast(
        "Sua nota é " +
        data[0] +
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
   SCENT WHEEL
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


$$("[data-wheel]")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    $$("[data-wheel]")
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );
                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    const data =
                        wheelData[
                            button.dataset.wheel
                        ];


                    $("#wheelTitle")
                        .textContent =
                        data[0];


                    $("#wheelText")
                        .textContent =
                        data[1];


                    $("#wheelPercent")
                        .textContent =
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
)?.classList.add(
    "active"
);


/* =========================================================
   TIMELINE
========================================================= */

const timeline =
    $("#timelineSlider");


function updateTimeline() {

    if (
        !timeline
    ) {
        return;
    }


    const hours =
        Number(
            timeline.value
        );


    $("#timelineHour")
        .textContent =
        hours +
        "h";


    let data;


    if (
        hours <= 1
    ) {

        data = [
            "🍊",
            "Abertura fresca",
            "Cítricos e frutas aparecem primeiro."
        ];

    } else if (
        hours <= 4
    ) {

        data = [
            "🌸",
            "Coração floral",
            "Rosa, flores e frutas ganham destaque."
        ];

    } else {

        data = [
            "✨",
            "Fundo confortável",
            "Âmbar, sândalo, baunilha, tonka e musk encerram a evolução."
        ];
    }


    $("#timelineIcon")
        .textContent =
        data[0];


    $("#timelineTitle")
        .textContent =
        data[1];


    $("#timelineText")
        .textContent =
        data[2];
}


timeline?.addEventListener(
    "input",
    updateTimeline
);


updateTimeline();


/* =========================================================
   RECOMMENDATION
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
                $("#occasionSelect")
                    .value +
                "-" +
                $("#periodSelect")
                    .value;


            $("#recommendation")
                .textContent =
                routineMessages[key] ||
                "Seu momento Dream está pronto ♡";


            playChime(
                600,
                .05
            );
        }
    );


/* =========================================================
   CAROUSEL
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
    ) !==
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


    $$(".carousel-dots button")
        .forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index ===
                        slideIndex
                );
            }
        );
}


slides.forEach(
    (_, index) => {

        const button =
            document.createElement(
                "button"
            );


        button.setAttribute(
            "aria-label",
            "Ir para imagem " +
            (
                index +
                1
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


        dots?.appendChild(
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
            slideIndex +
            1
        ) %
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
            slideIndex -
            1 +
            slides.length
        ) %
        slides.length;


    updateCarousel();
}


function updateAutoplayUI() {

    if (
        !autoplayButton
    ) {
        return;
    }


    autoplayButton
        .classList
        .toggle(
            "active",
            autoplay
        );


    autoplayButton.textContent =
        autoplay
            ? "❚❚ Autoplay ON"
            : "▶ Autoplay OFF";
}


function restartCarousel() {

    clearInterval(
        carouselTimer
    );


    carouselTimer =
        null;


    if (
        autoplay &&
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


autoplayButton?.addEventListener(
    "click",
    () => {

        autoplay =
            !autoplay;


        save(
            "dreamAutoplay",
            autoplay
                ? "on"
                : "off"
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
        event => {

            touchStart =
                event
                    .touches[0]
                    .clientX;
        },
        {
            passive: true
        }
    );


$(".carousel-window")
    ?.addEventListener(
        "touchend",
        event => {

            const difference =
                touchStart -
                event
                    .changedTouches[0]
                    .clientX;


            if (
                Math.abs(
                    difference
                ) >
                45
            ) {

                if (
                    difference > 0
                ) {

                    nextSlide();

                } else {

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


            let next =
                slideIndex;


            while (
                next === slideIndex
            ) {

                next =
                    Math.floor(
                        Math.random() *
                        slides.length
                    );
            }


            slideIndex =
                next;


            updateCarousel();

            restartCarousel();
        }
    );


updateAutoplayUI();

updateCarousel();

restartCarousel();


/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox =
    $("#lightbox");

const lightboxImage =
    $("#lightboxImage");


$$(".slide img")
    .forEach(
        image => {

            image.addEventListener(
                "click",
                () => {

                    lightboxImage.src =
                        image.src;


                    lightboxImage.alt =
                        image.alt;


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
   MOOD
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


function setMood(key) {

    const data =
        moods[key];


    if (
        !data
    ) {
        return;
    }


    currentMood =
        key;


    $$(".mood-button")
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.mood ===
                        key
                );
            }
        );


    const card =
        $("#moodCard");


    card.className =
        "mood-card " +
        data[3];


    $("#moodIcon")
        .textContent =
        data[0];


    $("#moodTitle")
        .textContent =
        data[1];


    $("#moodText")
        .textContent =
        data[2];


    playChime(
        500,
        .05
    );
}


$$(".mood-button")
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

            } else {

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
   QUIZ
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

    romantico: 0,
    leve: 0,
    elegante: 0
};


let lastQuizResult =
    null;


function renderQuiz() {

    if (
        !quizCard
    ) {
        return;
    }


    const question =
        quizQuestions[
            quizStep
        ];


    quizCard.innerHTML =
        `
        <div>

            <span class="quiz-step">
                0${quizStep + 1} / 0${quizQuestions.length}
            </span>

            <h3>
                ${question[0]}
            </h3>

            <div class="quiz-options">

                ${
                    question[1]
                        .map(
                            option =>
                                `
                                <button
                                    data-score="${option[1]}"
                                >
                                    ${option[0]}
                                </button>
                                `
                        )
                        .join("")
                }

            </div>

        </div>
        `;


    $$(".quiz-options button", quizCard)
        .forEach(
            button => {

                button.onclick =
                    () => {

                        quizScore[
                            button.dataset.score
                        ]++;


                        quizStep++;


                        if (
                            quizStep <
                            quizQuestions.length
                        ) {

                            renderQuiz();

                        } else {

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
            (a, b) =>
                quizScore[b] -
                quizScore[a]
        )[0];


    const result =
        quizResults[key];


    lastQuizResult = {

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

        romantico: 0,
        leve: 0,
        elegante: 0
    };


    lastQuizResult =
        null;


    renderQuiz();
}


renderQuiz();


/* =========================================================
   QUIZ SHARE CARD
========================================================= */

const quizShareModal =
    $("#quizShareModal");

const quizCanvas =
    $("#quizCanvas");


function openQuizShare() {

    if (
        !lastQuizResult ||
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
            .trim() ||
        "#df76a8";


    const secondary =
        style
            .getPropertyValue(
                "--secondary"
            )
            .trim() ||
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
        "#fff";


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
    text,
    x,
    y,
    maxWidth,
    lineHeight
) {

    const words =
        text.split(" ");


    let line =
        "";


    const lines =
        [];


    for (
        const word of words
    ) {

        const test =
            line +
            word +
            " ";


        if (
            context.measureText(
                test
            ).width >
                maxWidth &&
            line
        ) {

            lines.push(
                line.trim()
            );


            line =
                word +
                " ";

        } else {

            line =
                test;
        }
    }


    lines.push(
        line.trim()
    );


    lines.forEach(
        (currentLine, index) => {

            context.fillText(
                currentLine,
                x,
                y +
                index *
                lineHeight
            );
        }
    );


    return lines.length;
}


$$(".close-quiz-share")
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
   GREETING
========================================================= */

function updateGreeting() {

    const hour =
        new Date()
            .getHours();


    let title;

    let text;


    if (
        hour >= 5 &&
        hour < 12
    ) {

        title =
            "Bom dia ♡";


        text =
            "Comece o dia com leveza e Dream.";

    } else if (
        hour >= 12 &&
        hour < 18
    ) {

        title =
            "Boa tarde ✿";


        text =
            "Um ótimo momento para renovar a fragrância.";

    } else {

        title =
            "Boa noite ☾";


        text =
            "Deixe o amor no ar durante sua noite.";
    }


    if (
        $("#greetingTitle")
    ) {

        $("#greetingTitle")
            .textContent =
            title;
    }


    if (
        $("#greetingText")
    ) {

        $("#greetingText")
            .textContent =
            text;
    }


    if (
        hour < 5
    ) {

        unlockAchievement(
            "nightOwl"
        );
    }
}


updateGreeting();


/* =========================================================
   VISITS
========================================================= */

let visits =
    Number(
        load(
            "dreamVisits",
            "0"
        )
    ) +
    1;


save(
    "dreamVisits",
    visits
);


if (
    $("#visitCount")
) {

    $("#visitCount")
        .textContent =
        visits;
}


/* =========================================================
   SESSION TIMER
========================================================= */

const sessionStart =
    Date.now();


setInterval(
    () => {

        const seconds =
            Math.floor(
                (
                    Date.now() -
                    sessionStart
                ) /
                1000
            );


        const minutes =
            Math.floor(
                seconds /
                60
            );


        const remainingSeconds =
            seconds %
            60;


        if (
            $("#sessionTime")
        ) {

            $("#sessionTime")
                .textContent =
                String(
                    minutes
                )
                .padStart(
                    2,
                    "0"
                ) +
                ":" +
                String(
                    remainingSeconds
                )
                .padStart(
                    2,
                    "0"
                );
        }


        if (
            seconds >= 180
        ) {

            unlockAchievement(
                "stayedAwhile"
            );
        }

    },
    1000
);


/* =========================================================
   INTENSITY
========================================================= */

const intensity =
    $("#intensitySlider");


function updateIntensity() {

    if (
        !intensity
    ) {
        return;
    }


    const value =
        Number(
            intensity.value
        );


    $("#intensityValue")
        .textContent =
        value +
        "%";


    let name;

    let text;


    if (
        value <= 33
    ) {

        name =
            "Suave";


        text =
            "Uma experiência leve e delicada.";

    } else if (
        value <= 66
    ) {

        name =
            "Equilibrado";


        text =
            "Equilíbrio entre leveza e presença.";

    } else {

        name =
            "Marcante";


        text =
            "Uma experiência mais presente e intensa.";
    }


    $("#intensityName")
        .textContent =
        name;


    $("#intensityText")
        .textContent =
        text;


    save(
        "dreamIntensity",
        value
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
   BOTTLE ZOOM
========================================================= */

const bottleZoom =
    $("#bottleZoom");


function setBottleZoom(value) {

    value =
        clamp(
            Number(value),
            80,
            125
        );


    document.documentElement
        .style
        .setProperty(
            "--bottle-scale",
            value / 100
        );


    $("#bottleZoomValue")
        .textContent =
        value +
        "%";


    save(
        "dreamBottleZoom",
        value
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
   FAQ
========================================================= */

$$(".faq-question")
    .forEach(
        question => {

            question.addEventListener(
                "click",
                () => {

                    question
                        .closest(
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
        event => {

            const term =
                event.target
                    .value
                    .toLowerCase()
                    .trim();


            let count =
                0;


            $$(".faq-item")
                .forEach(
                    item => {

                        const show =
                            item
                                .textContent
                                .toLowerCase()
                                .includes(
                                    term
                                );


                        item.style.display =
                            show
                                ? ""
                                : "none";


                        if (
                            show
                        ) {

                            count++;
                        }
                    }
                );


            $("#faqEmpty")
                ?.classList
                .toggle(
                    "show",
                    count === 0
                );
        }
    );


$("#openAllFaq")
    ?.addEventListener(
        "click",
        () => {

            $$(".faq-item")
                .forEach(
                    item => {

                        if (
                            item.style.display !==
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

            $$(".faq-item")
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
   THEME
========================================================= */

const themeButton =
    $("#themeButton");

const darkToggle =
    $("#darkToggle");


function setDark(
    enabled,
    persist = true
) {

    document.body
        .classList
        .toggle(
            "dark",
            enabled
        );


    if (
        themeButton
    ) {

        themeButton.textContent =
            enabled
                ? "☀"
                : "☾";
    }


    if (
        darkToggle
    ) {

        darkToggle.checked =
            enabled;
    }


    if (
        persist
    ) {

        save(
            "dreamTheme",
            enabled
                ? "dark"
                : "light"
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


themeButton?.addEventListener(
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


darkToggle?.addEventListener(
    "change",
    () => {

        disableAutoTheme();


        setDark(
            darkToggle.checked
        );
    }
);


/* =========================================================
   AUTO THEME
========================================================= */

const autoThemeButton =
    $("#autoThemeButton");


function autoThemeOn() {

    return load(
        "dreamAutoTheme",
        "off"
    ) ===
    "on";
}


function applyAutoTheme() {

    if (
        autoThemeOn()
    ) {

        const hour =
            new Date()
                .getHours();


        setDark(
            hour >= 18 ||
            hour < 6,
            false
        );
    }
}


function updateAutoThemeButton() {

    const enabled =
        autoThemeOn();


    autoThemeButton
        ?.classList
        .toggle(
            "active",
            enabled
        );


    if (
        autoThemeButton
    ) {

        autoThemeButton.textContent =
            enabled
                ? "◐ Tema auto ON"
                : "◐ Tema automático";
    }
}


autoThemeButton?.addEventListener(
    "click",
    () => {

        save(
            "dreamAutoTheme",
            autoThemeOn()
                ? "off"
                : "on"
        );


        updateAutoThemeButton();

        applyAutoTheme();


        showToast(
            autoThemeOn()
                ? "Tema automático ativado"
                : "Tema automático desativado"
        );
    }
);


/* =========================================================
   PALETTES
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
    factor = .84
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
            hex,
            16
        );


    const red =
        number >>
        16;


    const green =
        number >>
        8 &
        255;


    const blue =
        number &
        255;


    const mix =
        value =>
            Math.round(
                value +
                (
                    255 -
                    value
                ) *
                factor
            );


    return (
        "#" +
        [
            mix(red),
            mix(green),
            mix(blue)
        ]
        .map(
            value =>
                value
                    .toString(16)
                    .padStart(
                        2,
                        "0"
                    )
        )
        .join("")
    );
}


function applyColors(
    primary,
    secondary,
    persist = true
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

        $("#primaryColor")
            .value =
            primary;
    }


    if (
        $("#secondaryColor")
    ) {

        $("#secondaryColor")
            .value =
            secondary;
    }


    $(
        'meta[name="theme-color"]'
    )?.setAttribute(
        "content",
        primary
    );


    if (
        persist
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


$$(".palette")
    .forEach(
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


                    applyColors(
                        ...palette
                    );


                    save(
                        "dreamPalette",
                        button
                            .dataset
                            .palette
                    );


                    $$(".palette")
                        .forEach(
                            item => {

                                item.classList.toggle(
                                    "active",
                                    item ===
                                        button
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
        !primary ||
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


    $$(".palette")
        .forEach(
            item => {

                item.classList.remove(
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
        "#" +
        Math.floor(
            Math.random() *
            0xffffff
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


    $$(".palette")
        .forEach(
            item => {

                item.classList.remove(
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
   SETTINGS PANEL
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
   APPEARANCE TOGGLES
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
    className,
    key
) {

    if (
        !input
    ) {
        return;
    }


    const saved =
        load(
            key,
            input.checked
                ? "on"
                : "off"
        );


    input.checked =
        saved !==
        "off";


    document.body
        .classList
        .toggle(
            className,
            !input.checked
        );


    input.addEventListener(
        "change",
        () => {

            document.body
                .classList
                .toggle(
                    className,
                    !input.checked
                );


            save(
                key,
                input.checked
                    ? "on"
                    : "off"
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
   FONT SIZE
========================================================= */

function setFontSize(
    size,
    persist = true
) {

    document.body
        .classList
        .remove(
            "font-small",
            "font-large"
        );


    if (
        size ===
        "small"
    ) {

        document.body
            .classList
            .add(
                "font-small"
            );
    }


    if (
        size ===
        "large"
    ) {

        document.body
            .classList
            .add(
                "font-large"
            );
    }


    $$("[data-font-size]")
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button
                        .dataset
                        .fontSize ===
                        size
                );
            }
        );


    if (
        persist
    ) {

        save(
            "dreamFontSize",
            size
        );
    }
}


$$("[data-font-size]")
    .forEach(
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
   FOCUS
========================================================= */

$("#focusMode")
    ?.addEventListener(
        "click",
        event => {

            document.body
                .classList
                .toggle(
                    "focus-mode"
                );


            const active =
                document.body
                    .classList
                    .contains(
                        "focus-mode"
                    );


            event.currentTarget
                .classList
                .toggle(
                    "active",
                    active
                );


            event.currentTarget
                .textContent =
                active
                    ? "◉ Sair do foco"
                    : "◉ Modo foco";
        }
    );


/* =========================================================
   FULLSCREEN
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

                } else {

                    await document
                        .documentElement
                        .requestFullscreen();
                }

            } catch (_) {

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

            $("#fullscreenButton")
                .textContent =
                document.fullscreenElement
                    ? "⛶ Sair da tela cheia"
                    : "⛶ Tela cheia";
        }
    }
);


/* =========================================================
   PRESENTATION
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
                    presentationIndex >=
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
   HIGH CONTRAST BUTTON
========================================================= */

const highContrastButton =
    $("#highContrastButton");


function setHighContrast(
    enabled
) {

    document.body
        .classList
        .toggle(
            "high-contrast",
            enabled
        );


    highContrastButton
        ?.classList
        .toggle(
            "active",
            enabled
        );


    save(
        "dreamHighContrast",
        enabled
            ? "on"
            : "off"
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
   READING MODE
========================================================= */

const readingButton =
    $("#readingModeButton");


function setReading(
    enabled
) {

    document.body
        .classList
        .toggle(
            "reading-mode",
            enabled
        );


    readingButton
        ?.classList
        .toggle(
            "active",
            enabled
        );


    save(
        "dreamReading",
        enabled
            ? "on"
            : "off"
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
   HAPTIC
========================================================= */

$("#vibrateButton")
    ?.addEventListener(
        "click",
        () => {

            if (
                navigator.vibrate
            ) {

                navigator.vibrate([
                    80,
                    40,
                    80
                ]);


                showToast(
                    "Vibração Dream 〰"
                );

            } else {

                showToast(
                    "Vibração não disponível neste dispositivo"
                );
            }
        }
    );


/* =========================================================
   OPTIONAL SOUND
========================================================= */

let audioCtx =
    null;


let soundTimer =
    null;


let soundOn =
    false;


function playChime(
    frequency = 660,
    duration = .09
) {

    if (
        !soundOn
    ) {
        return;
    }


    try {

        audioCtx =
            audioCtx ||
            new (
                window.AudioContext ||
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
            frequency;


        gain.gain
            .setValueAtTime(
                .025,
                audioCtx.currentTime
            );


        gain.gain
            .exponentialRampToValueAtTime(
                .0001,
                audioCtx.currentTime +
                duration
            );


        oscillator.connect(
            gain
        );


        gain.connect(
            audioCtx.destination
        );


        oscillator.start();


        oscillator.stop(
            audioCtx.currentTime +
            duration
        );

    } catch (_) {}
}


function setSound(
    enabled
) {

    soundOn =
        enabled;


    save(
        "dreamSound",
        enabled
            ? "on"
            : "off"
    );


    $("#ambientSoundButton")
        ?.classList
        .toggle(
            "active",
            enabled
        );


    if (
        $("#ambientSoundButton")
    ) {

        $("#ambientSoundButton")
            .textContent =
            enabled
                ? "♫ Som ON"
                : "♫ Som OFF";
    }


    clearInterval(
        soundTimer
    );


    if (
        enabled
    ) {

        playChime(
            660,
            .1
        );


        soundTimer =
            setInterval(
                () => {

                    playChime(
                        pick([
                            440,
                            523,
                            659
                        ]),
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
   CLICK HEARTS
========================================================= */

let clickHearts =
    load(
        "dreamClickHearts",
        "off"
    ) ===
    "on";


function updateHeartsButton() {

    const button =
        $("#clickHeartsButton");


    button?.classList.toggle(
        "active",
        clickHearts
    );


    if (
        button
    ) {

        button.textContent =
            clickHearts
                ? "♥ Corações ON"
                : "♥ Corações OFF";
    }
}


function heartBurstAt(
    x,
    y,
    count = 6
) {

    for (
        let index = 0;
        index < count;
        index++
    ) {

        const heart =
            document.createElement(
                "span"
            );


        heart.className =
            "click-heart";


        heart.textContent =
            Math.random() >
            .5
                ? "♡"
                : "♥";


        heart.style.left =
            x +
            "px";


        heart.style.top =
            y +
            "px";


        heart.style.setProperty(
            "--x",
            (
                Math.random() *
                90 -
                45
            ) +
            "px"
        );


        heart.style.setProperty(
            "--y",
            -(
                30 +
                Math.random() *
                85
            ) +
            "px"
        );


        heart.style.setProperty(
            "--rot",
            (
                Math.random() *
                180 -
                90
            ) +
            "deg"
        );


        document.body
            .appendChild(
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
                    ? "on"
                    : "off"
            );


            updateHeartsButton();
        }
    );


document.addEventListener(
    "click",
    event => {

        if (
            clickHearts &&
            !event.target.closest(
                "button,a,input,select,textarea,label"
            )
        ) {

            heartBurstAt(
                event.clientX,
                event.clientY
            );
        }
    }
);


updateHeartsButton();


/* =========================================================
   ACHIEVEMENTS
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


function saveUnlocked(set) {

    save(
        "dreamAchievements",
        JSON.stringify(
            [...set]
        )
    );
}


function unlockAchievement(key) {

    if (
        !achievementDefs[key]
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


    if (
        $("#achievementToastText")
    ) {

        $("#achievementToastText")
            .textContent =
            achievementDefs[key][1];
    }


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

        $("#achievementCount")
            .textContent =
            unlockedSet()
                .size;
    }
}


function renderAchievements() {

    const set =
        unlockedSet();


    const list =
        $("#achievementsList");


    if (
        !list
    ) {
        return;
    }


    list.innerHTML =
        Object.entries(
            achievementDefs
        )
        .map(
            ([key, data]) =>
                `
                <div class="achievement-item ${set.has(key) ? "" : "locked"}">

                    <span>
                        ${data[0]}
                    </span>

                    <div>

                        <strong>
                            ${data[1]}
                        </strong>

                        <small>
                            ${
                                set.has(key)
                                    ? data[2]
                                    : "Ainda bloqueada"
                            }
                        </small>

                    </div>

                </div>
                `
        )
        .join("");
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


$$(".close-achievements")
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
   RANDOM SECTION
========================================================= */

function goRandomSection() {

    const candidates =
        tracked.filter(
            section =>
                section.id !==
                "inicio"
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
   RESET SETTINGS
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
                "dreamSound",
                "dreamContrast"
            ]
            .forEach(
                removeSaved
            );


            applyColors(
                "#df76a8",
                "#9562dc",
                false
            );


            $$(".palette")
                .forEach(
                    button => {

                        button.classList.toggle(
                            "active",
                            button.dataset.palette ===
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


            document.body
                .classList
                .remove(
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


            /*
               CONTRASTE RETORNA A 100%.
            */

            setContrast(
                100,
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
   EASTER EGG — LOGO
========================================================= */

let logoClicks =
    0;


let logoTimer;


function heartRain() {

    for (
        let index = 0;
        index < 45;
        index++
    ) {

        const heart =
            document.createElement(
                "span"
            );


        heart.className =
            "heart-rain";


        heart.textContent =
            Math.random() >
            .5
                ? "♡"
                : "♥";


        heart.style.left =
            Math.random() *
            100 +
            "vw";


        heart.style.fontSize =
            12 +
            Math.random() *
            28 +
            "px";


        heart.style.setProperty(
            "--x",
            (
                Math.random() *
                200 -
                100
            ) +
            "px"
        );


        document.body
            .appendChild(
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


$$("[data-easter-logo]")
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
                        logoClicks >= 5
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
   KONAMI
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

    document.body
        .classList
        .toggle(
            "secret-galaxy"
        );


    heartRain();


    showToast(
        document.body
            .classList
            .contains(
                "secret-galaxy"
            )
            ? "GALAXY DREAM ATIVADO ★"
            : "Galaxy Dream desativado"
    );
}


/* =========================================================
   SECRET WORD DREAM
========================================================= */

let typedSecret =
    "";


function handleSecretTyping(key) {

    if (
        key.length !== 1
    ) {
        return;
    }


    typedSecret =
        (
            typedSecret +
            key.toLowerCase()
        )
        .slice(
            -5
        );


    if (
        typedSecret ===
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
   BOTTLE SECRET
========================================================= */

mainBottle?.addEventListener(
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
   SHORTCUTS
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


$$(".close-shortcuts")
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
    event => {

        const tag =
            document
                .activeElement
                ?.tagName;


        const typing =
            [
                "INPUT",
                "TEXTAREA",
                "SELECT"
            ]
            .includes(
                tag
            );


        if (
            event.key ===
            konami[
                konamiPos
            ]
        ) {

            konamiPos++;


            if (
                konamiPos ===
                konami.length
            ) {

                konamiPos =
                    0;


                toggleGalaxy();


                unlockAchievement(
                    "konami"
                );
            }

        } else {

            konamiPos =
                event.key ===
                konami[0]
                    ? 1
                    : 0;
        }


        if (
            !typing
        ) {

            handleSecretTyping(
                event.key
            );
        }


        if (
            event.key ===
            "Escape"
        ) {

            closeEverything();

            stopPresentation();

            return;
        }


        if (
            typing
        ) {
            return;
        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextSlide();

            restartCarousel();

            return;
        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            prevSlide();

            restartCarousel();

            return;
        }


        const key =
            event.key
                .toLowerCase();


        if (
            key === "p"
        ) {

            $("#settingsPanel")
                ?.classList
                .toggle(
                    "open"
                );
        }


        if (
            key === "m"
        ) {

            themeButton
                ?.click();
        }


        if (
            key === "g"
        ) {

            $("#galeria")
                ?.scrollIntoView({
                    behavior:
                        "smooth"
                });
        }


        if (
            key === "q"
        ) {

            $("#quiz")
                ?.scrollIntoView({
                    behavior:
                        "smooth"
                });
        }


        if (
            key === "l"
        ) {

            $("#lab")
                ?.scrollIntoView({
                    behavior:
                        "smooth"
                });
        }


        if (
            key === "s"
        ) {

            doSpray();
        }


        if (
            key === "r"
        ) {

            goRandomSection();
        }


        if (
            event.key === "?"
        ) {

            openLayer(
                shortcutsModal
            );
        }
    }
);


/* =========================================================
   IDIOMA PT / EN

   SOMENTE os botões [data-lang]
   que estão no HEADER existem no HTML.
========================================================= */

const languageButtons =
    $$("[data-lang]");


let currentLanguage =
    load(
        "dreamLanguage",
        "pt-BR"
    );


if (
    ![
        "pt-BR",
        "en-US"
    ]
    .includes(
        currentLanguage
    )
) {

    currentLanguage =
        "pt-BR";
}


/* =========================================================
   DICIONÁRIO
========================================================= */

const textDictionary = {

    "Início":
        "Home",

    "Produto":
        "Product",

    "Campanha":
        "Campaign",

    "Notas":
        "Notes",

    "Experiência":
        "Experience",

    "Galeria":
        "Gallery",

    "Mood":
        "Mood",

    "Quiz":
        "Quiz",

    "Lab":
        "Lab",

    "FAQ":
        "FAQ",

    "Conhecer":
        "Discover",

    "Descobrir o Dream":
        "Discover Dream",

    "Ver produto":
        "View product",

    "Me leve a algum lugar":
        "Take me somewhere",

    "Body Splash":
        "Body Splash",

    "Floral":
        "Floral",

    "Amadeirado":
        "Woody",

    "Amor no Ar":
        "Love in the Air",

    "Uma fragrância delicada, romântica e envolvente para transformar pequenos momentos em lembranças especiais.":
        "A delicate, romantic and captivating fragrance created to turn small moments into special memories.",

    "Floral Amadeirado":
        "Floral Woody",

    "Delicado":
        "Delicate",

    "Um toque de":
        "A touch of",

    "amor":
        "love",

    "na sua rotina.":
        "in your routine.",

    "Dream Amor no Ar combina um perfil floral romântico com uma sensação leve e confortável para diferentes momentos do dia.":
        "Dream Love in the Air combines a romantic floral profile with a light and comfortable feeling for different moments of the day.",

    "Delicado e romântico":
        "Delicate and romantic",

    "Ver detalhes":
        "View details",

    "Favoritar":
        "Favorite",

    "Compartilhar":
        "Share",

    "Copiar seção":
        "Copy section",

    "O amor está":
        "Love is",

    "nos detalhes.":
        "in the details.",

    "Uma atmosfera romântica, sofisticada e cheia de personalidade.":
        "A romantic, sophisticated atmosphere full of personality.",

    "Explorar universo Dream":
        "Explore the Dream universe",

    "Modo apresentação":
        "Presentation mode",

    "PIRÂMIDE OLFATIVA":
        "OLFACTORY PYRAMID",

    "Descubra cada":
        "Discover every",

    "nota.":
        "note.",

    "Clique nas notas para abrir detalhes.":
        "Click the notes to open details.",

    "SAÍDA":
        "TOP",

    "CORPO":
        "HEART",

    "FUNDO":
        "BASE",

    "Frescor frutado":
        "Fruity freshness",

    "A primeira impressão da fragrância.":
        "The first impression of the fragrance.",

    "Coração floral":
        "Floral heart",

    "O lado romântico de Amor no Ar.":
        "The romantic side of Love in the Air.",

    "Conforto envolvente":
        "Enveloping comfort",

    "As notas que permanecem na experiência.":
        "The notes that remain in the experience.",

    "SINTA A FRAGRÂNCIA":
        "FEEL THE FRAGRANCE",

    "Explore o Dream de":
        "Explore Dream in",

    "outro jeito.":
        "a new way.",

    "Roda olfativa, evolução da fragrância e perfil visual.":
        "Olfactory wheel, fragrance evolution and visual profile.",

    "RODA OLFATIVA":
        "OLFACTORY WHEEL",

    "Escolha um acorde":
        "Choose an accord",

    "EVOLUÇÃO":
        "EVOLUTION",

    "Timeline da fragrância":
        "Fragrance timeline",

    "PERFIL":
        "PROFILE",

    "Personalidade":
        "Personality",

    "Romântico":
        "Romantic",

    "Doce":
        "Sweet",

    "MOMENTO":
        "MOMENT",

    "Gerar combinação":
        "Generate combination",

    "Escolha as opções e gere seu momento Dream.":
        "Choose the options and generate your Dream moment.",

    "DREAM MOOD":
        "DREAM MOOD",

    "Escolha seu":
        "Choose your",

    "clima Dream.":
        "Dream mood.",

    "Salvar Mood":
        "Save Mood",

    "Restaurar Mood":
        "Restore Mood",

    "Mood aleatório":
        "Random Mood",

    "QUIZ DREAM":
        "DREAM QUIZ",

    "Qual é o seu":
        "What is your",

    "momento Dream?":
        "Dream moment?",

    "COMO USAR":
        "HOW TO USE",

    "Seu ritual":
        "Your",

    "Dream.":
        "Dream ritual.",

    "Depois do banho":
        "After showering",

    "Use sobre a pele limpa.":
        "Apply to clean skin.",

    "Pontos favoritos":
        "Favorite areas",

    "Borrife onde preferir.":
        "Spray wherever you prefer.",

    "Renove":
        "Refresh",

    "Reaplique ao longo do dia.":
        "Reapply throughout the day.",

    "DREAM TOOLS":
        "DREAM TOOLS",

    "Ferramentas rápidas":
        "Quick tools",

    "Me surpreenda":
        "Surprise me",

    "Copiar produto":
        "Copy product",

    "Copiar cores":
        "Copy colors",

    "Baixar ficha":
        "Download sheet",

    "Modo foco":
        "Focus mode",

    "Tela cheia":
        "Fullscreen",

    "Tema automático":
        "Auto theme",

    "Atalhos":
        "Shortcuts",

    "Corações OFF":
        "Hearts OFF",

    "Som OFF":
        "Sound OFF",

    "Contraste":
        "Contrast",

    "Leitura":
        "Reading",

    "Cor aleatória":
        "Random color",

    "Nota aleatória":
        "Random note",

    "Seção aleatória":
        "Random section",

    "Copiar link":
        "Copy link",

    "Vibrar":
        "Vibrate",

    "NOTA DO MOMENTO":
        "NOTE OF THE MOMENT",

    "Descubra uma nota":
        "Discover a note",

    "Sua nota aparecerá aqui":
        "Your note will appear here",

    "Use “Nota aleatória” para sortear.":
        "Use “Random note” to draw one.",

    "DÚVIDAS":
        "QUESTIONS",

    "Perguntas":
        "Frequently asked",

    "frequentes.":
        "questions.",

    "Nenhuma pergunta encontrada.":
        "No questions found.",

    "Abrir todas":
        "Open all",

    "Fechar todas":
        "Close all",

    "Deixe o":
        "Leave",

    "amor no ar.":
        "love in the air.",

    "Inspirada no universo Dream.":
        "Inspired by the Dream universe.",

    "Conhecer produto":
        "Discover product",

    "Visitar O Boticário ↗":
        "Visit O Boticário ↗",

    "Projeto demonstrativo não oficial • 2026":
        "Unofficial demo project • 2026",

    "DREAM STUDIO":
        "DREAM STUDIO",

    "Personalizar":
        "Customize",

    "Paleta":
        "Palette",

    "Cores manuais":
        "Custom colors",

    "Principal":
        "Primary",

    "Secundária":
        "Secondary",

    "Aparência":
        "Appearance",

    "Modo escuro":
        "Dark mode",

    "Alternar fundos":
        "Switch backgrounds",

    "Partículas":
        "Particles",

    "Elementos flutuantes":
        "Floating elements",

    "Animações":
        "Animations",

    "Transições e movimento":
        "Transitions and motion",

    "Glass":
        "Glass",

    "Blur translúcido":
        "Translucent blur",

    "Cursor glow":
        "Cursor glow",

    "Luz acompanhando mouse":
        "Light following the mouse",

    "Texto":
        "Text",

    "Contraste visual":
        "Visual contrast",

    "Restaurar padrão":
        "Reset defaults"
};


const reverseDictionary =
    Object.fromEntries(
        Object.entries(
            textDictionary
        )
        .map(
            ([portuguese, english]) =>
                [
                    english,
                    portuguese
                ]
        )
    );


/* =========================================================
   TRADUZ TEXTOS
========================================================= */

function translateTextNodes(
    language
) {

    const toEnglish =
        language ===
        "en-US";


    const dictionary =
        toEnglish
            ? textDictionary
            : reverseDictionary;


    const walker =
        document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );


    const nodes =
        [];


    while (
        walker.nextNode()
    ) {

        nodes.push(
            walker.currentNode
        );
    }


    nodes.forEach(
        node => {

            const parent =
                node.parentElement;


            if (
                !parent ||
                [
                    "SCRIPT",
                    "STYLE",
                    "NOSCRIPT"
                ]
                .includes(
                    parent.tagName
                )
            ) {
                return;
            }


            const raw =
                node.nodeValue;


            const trimmed =
                raw
                    .replace(
                        /\s+/g,
                        " "
                    )
                    .trim();


            if (
                !trimmed
            ) {
                return;
            }


            let translated =
                dictionary[
                    trimmed
                ];


            if (
                !translated
            ) {

                /*
                   Preserva símbolos
                   no começo dos botões.
                */

                const clean =
                    trimmed.replace(
                        /^[♡♥✦↗⧉◉↓◐⌨◩🎨✿↯🔗〰]+\s*/,
                        ""
                    );


                const index =
                    trimmed.indexOf(
                        clean
                    );


                const prefix =
                    index >= 0
                        ? trimmed.slice(
                            0,
                            index
                        )
                        : "";


                if (
                    dictionary[
                        clean
                    ]
                ) {

                    translated =
                        prefix +
                        dictionary[
                            clean
                        ];
                }
            }


            if (
                translated
            ) {

                const lead =
                    raw.match(
                        /^\s*/
                    )?.[0] ||
                    "";


                const tail =
                    raw.match(
                        /\s*$/
                    )?.[0] ||
                    "";


                node.nodeValue =
                    lead +
                    translated +
                    tail;
            }
        }
    );


    const search =
        $("#faqSearch");


    if (
        search
    ) {

        search.placeholder =
            language ===
            "en-US"
                ? "Search a question..."
                : "Pesquisar uma dúvida...";
    }
}


/* =========================================================
   SET LANGUAGE
========================================================= */

function setLanguage(
    language,
    notify = false
) {

    if (
        ![
            "pt-BR",
            "en-US"
        ]
        .includes(
            language
        )
    ) {

        language =
            "pt-BR";
    }


    if (
        language !==
        currentLanguage
    ) {

        translateTextNodes(
            language
        );
    }


    currentLanguage =
        language;


    document.documentElement.lang =
        language;


    save(
        "dreamLanguage",
        language
    );


    document.title =
        language ===
        "en-US"
            ? "Dream Love in the Air • 350 ml"
            : "Dream Amor no Ar • 350 ml";


    /*
       Como só existem data-lang
       no HEADER, apenas as bandeiras
       de cima são sincronizadas.
    */

    languageButtons.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.lang ===
                    language
            );


            button.setAttribute(
                "aria-pressed",
                button.dataset.lang ===
                    language
                    ? "true"
                    : "false"
            );
        }
    );


    if (
        notify
    ) {

        showToast(
            language ===
            "en-US"
                ? "Language changed to English 🇺🇸"
                : "Idioma alterado para Português 🇧🇷"
        );
    }
}


languageButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                setLanguage(
                    button.dataset.lang,
                    true
                );
            }
        );
    }
);


/* =========================================================
   CONTRASTE REAL — CORRIGIDO

   HTML:
   #contrastControl

   CSS:
   body {
       filter: contrast(var(--contrast-level));
   }
========================================================= */

const contrastControl =
    $("#contrastControl");

const contrastValue =
    $("#contrastValue");


function setContrast(
    value,
    shouldSave = true
) {

    let percent =
        Number(
            value
        );


    if (
        !Number.isFinite(
            percent
        )
    ) {

        percent =
            100;
    }


    percent =
        clamp(
            percent,
            80,
            130
        );


    /*
       80  => 0.8
       100 => 1
       130 => 1.3
    */

    document.documentElement
        .style
        .setProperty(
            "--contrast-level",
            String(
                percent /
                100
            )
        );


    if (
        contrastControl
    ) {

        contrastControl.value =
            String(
                percent
            );
    }


    if (
        contrastValue
    ) {

        contrastValue.textContent =
            `${Math.round(percent)}%`;
    }


    if (
        shouldSave
    ) {

        save(
            "dreamContrast",
            percent
        );
    }
}


contrastControl
    ?.addEventListener(
        "input",
        event => {

            setContrast(
                event.target.value,
                true
            );
        }
    );


/* =========================================================
   RESTORE SAVED SETTINGS
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
        primary &&
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


    $$(".palette")
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.palette ===
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
        ) ===
        "on"
    );


    setReading(
        load(
            "dreamReading",
            "off"
        ) ===
        "on"
    );


    if (
        window
            .matchMedia
            ?.(
                "(prefers-reduced-motion: reduce)"
            )
            .matches &&
        load(
            "dreamAnimations",
            null
        ) ===
        null
    ) {

        document.body
            .classList
            .add(
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

    } else {

        setDark(
            load(
                "dreamTheme",
                "light"
            ) ===
            "dark",
            false
        );
    }


    updateAutoThemeButton();


    setSound(
        load(
            "dreamSound",
            "off"
        ) ===
        "on"
    );


    /*
       RESTAURA O CONTRASTE.
    */

    setContrast(
        load(
            "dreamContrast",
            "100"
        ),
        false
    );


    /*
       RESTAURA O IDIOMA.

       Sempre parte do PT do HTML,
       depois traduz se necessário.
    */

    const savedLanguage =
        load(
            "dreamLanguage",
            "pt-BR"
        );


    currentLanguage =
        "pt-BR";


    setLanguage(
        savedLanguage,
        false
    );

})();


/* =========================================================
   VISIBILITY
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

        } else {

            restartCarousel();
        }
    }
);