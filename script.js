"use strict";

/* =========================================================
   DREAM AMOR NO AR — SCRIPT.JS
   ========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

const root = document.documentElement;
const body = document.body;


/* =========================================================
   STORAGE SEGURO
========================================================= */

function storageGet(key, fallback = null) {

    try {

        const value = localStorage.getItem(key);

        return value === null
            ? fallback
            : value;

    } catch {

        return fallback;

    }

}


function storageSet(key, value) {

    try {

        localStorage.setItem(key, value);

    } catch {

        // Ignora erro de armazenamento.

    }

}


function storageRemove(key) {

    try {

        localStorage.removeItem(key);

    } catch {

        // Ignora erro.

    }

}


function getJSON(key, fallback) {

    try {

        const value = storageGet(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);

    } catch {

        return fallback;

    }

}


function setJSON(key, value) {

    storageSet(
        key,
        JSON.stringify(value)
    );

}


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

const cursorGlow =
    $("#cursorGlow");

const particles =
    $("#particles");

const toast =
    $("#toast");

const backTop =
    $("#backTop");

const sectionIndicator =
    $("#sectionIndicator");

const mainBottle =
    $("#mainBottle");

const heroProduct =
    $("#heroProduct");

const sprayButton =
    $("#sprayButton");

const sprayArea =
    $("#sprayArea");


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    if (!toast) {
        return;
    }

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2300);

}


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader?.classList.add("hide");

        setTimeout(() => {

            if (loader) {
                loader.style.display = "none";
            }

        }, 700);

    }, 650);

});


/* =========================================================
   SCROLL
========================================================= */

function updateScroll() {

    const scrollTop =
        window.scrollY;

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percent =
        maxScroll > 0
            ? (scrollTop / maxScroll) * 100
            : 0;


    if (scrollProgress) {

        scrollProgress.style.width =
            `${percent}%`;

    }


    header?.classList.toggle(
        "scrolled",
        scrollTop > 30
    );


    backTop?.classList.toggle(
        "show",
        scrollTop > 500
    );

}


window.addEventListener(
    "scroll",
    updateScroll,
    { passive: true }
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
            behavior: "smooth"
        });

    }
);


/* =========================================================
   MENU MOBILE
========================================================= */

menuMobile?.addEventListener(
    "click",
    () => {

        menu?.classList.toggle("open");

    }
);


$$(".menu a").forEach(link => {

    link.addEventListener(
        "click",
        () => {

            menu?.classList.remove("open");

        }
    );

});


document.addEventListener(
    "click",
    event => {

        if (
            menu?.classList.contains("open") &&
            !menu.contains(event.target) &&
            !menuMobile?.contains(event.target)
        ) {

            menu.classList.remove("open");

        }

    }
);


/* =========================================================
   REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add("visible");

                    revealObserver
                        .unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


$$(".reveal").forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   MENU ATIVO + INDICADOR
========================================================= */

const trackedSections =
    $$(".section-track");


const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id =
                    entry.target.id;

                const name =
                    entry.target.dataset.sectionName ||
                    id;


                $$(".menu a").forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") ===
                        `#${id}`
                    );

                });


                const index =
                    trackedSections
                        .indexOf(entry.target) + 1;


                if (sectionIndicator) {

                    sectionIndicator.innerHTML = `
                        <span>
                            ${String(index).padStart(2, "0")}
                        </span>

                        ${name}
                    `;

                }


                if (
                    body.classList
                        .contains("focus-mode")
                ) {

                    trackedSections.forEach(section => {

                        section.classList.remove(
                            "focus-active"
                        );

                    });

                    entry.target.classList.add(
                        "focus-active"
                    );

                }

            });

        },

        {
            rootMargin:
                "-35% 0px -50% 0px",

            threshold: 0
        }

    );


trackedSections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   CURSOR GLOW
========================================================= */

document.addEventListener(
    "mousemove",
    event => {

        if (!cursorGlow) {
            return;
        }

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    }
);


/* =========================================================
   PARTÍCULAS
========================================================= */

function createParticles() {

    if (!particles) {
        return;
    }

    particles.innerHTML = "";

    const symbols =
        ["♡", "✦", "·", "✿"];


    for (
        let i = 0;
        i < 28;
        i++
    ) {

        const particle =
            document.createElement("span");

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
            `${8 + Math.random() * 15}px`;

        particle.style.setProperty(
            "--duration",
            `${10 + Math.random() * 16}s`
        );

        particle.style.setProperty(
            "--delay",
            `${-Math.random() * 15}s`
        );

        particles.appendChild(
            particle
        );

    }

}


createParticles();


/* =========================================================
   CORES
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


function hexToRgb(hex) {

    let value =
        String(hex)
            .replace("#", "")
            .trim();


    if (value.length === 3) {

        value =
            value
                .split("")
                .map(char => char + char)
                .join("");

    }


    const number =
        Number.parseInt(value, 16);


    if (Number.isNaN(number)) {

        return "223, 118, 168";

    }


    return [
        (number >> 16) & 255,
        (number >> 8) & 255,
        number & 255
    ].join(", ");

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

    root.style.setProperty(
        "--primary-rgb",
        hexToRgb(primary)
    );

    root.style.setProperty(
        "--secondary-rgb",
        hexToRgb(secondary)
    );


    const primaryInput =
        $("#primaryColor");

    const secondaryInput =
        $("#secondaryColor");


    if (primaryInput) {

        primaryInput.value =
            primary;

    }


    if (secondaryInput) {

        secondaryInput.value =
            secondary;

    }


    if (save) {

        storageSet(
            "dreamPrimary",
            primary
        );

        storageSet(
            "dreamSecondary",
            secondary
        );

    }

}


function setPalette(
    name,
    notify = true
) {

    const palette =
        palettes[name];

    if (!palette) {
        return;
    }


    applyColors(
        palette.primary,
        palette.secondary
    );


    $$(".palette").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.palette === name
        );

    });


    storageSet(
        "dreamPalette",
        name
    );


    if (notify) {

        showToast(
            `Paleta ${name} ativada ✦`
        );

    }

}


$$(".palette").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            setPalette(
                button.dataset.palette
            );

        }
    );

});


$("#primaryColor")
    ?.addEventListener(
        "input",
        event => {

            const secondary =
                getComputedStyle(root)
                    .getPropertyValue(
                        "--secondary"
                    )
                    .trim();

            applyColors(
                event.target.value,
                secondary
            );

            $$(".palette")
                .forEach(button =>
                    button.classList.remove(
                        "active"
                    )
                );

        }
    );


$("#secondaryColor")
    ?.addEventListener(
        "input",
        event => {

            const primary =
                getComputedStyle(root)
                    .getPropertyValue(
                        "--primary"
                    )
                    .trim();

            applyColors(
                primary,
                event.target.value
            );

            $$(".palette")
                .forEach(button =>
                    button.classList.remove(
                        "active"
                    )
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


function applyDarkMode(
    enabled,
    save = true
) {

    body.classList.toggle(
        "dark",
        enabled
    );


    if (darkToggle) {

        darkToggle.checked =
            enabled;

    }


    if (themeButton) {

        themeButton.textContent =
            enabled
                ? "☀"
                : "☾";

    }


    if (save) {

        storageSet(
            "dreamDark",
            enabled ? "1" : "0"
        );

        storageSet(
            "dreamAutoTheme",
            "0"
        );

    }

}


themeButton?.addEventListener(
    "click",
    () => {

        applyDarkMode(
            !body.classList.contains(
                "dark"
            )
        );

    }
);


darkToggle?.addEventListener(
    "change",
    event => {

        applyDarkMode(
            event.target.checked
        );

    }
);


/* =========================================================
   TEMA AUTOMÁTICO
========================================================= */

let autoTheme =
    storageGet(
        "dreamAutoTheme",
        "0"
    ) === "1";


const autoThemeButton =
    $("#autoThemeButton");


function systemDark() {

    return window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

}


function updateAutoTheme() {

    if (!autoTheme) {
        return;
    }

    applyDarkMode(
        systemDark(),
        false
    );

}


function updateAutoThemeButton() {

    autoThemeButton?.classList.toggle(
        "active",
        autoTheme
    );

    if (autoThemeButton) {

        autoThemeButton.textContent =
            autoTheme
                ? "◐ Tema auto ON"
                : "◐ Tema automático";

    }

}


autoThemeButton?.addEventListener(
    "click",
    () => {

        autoTheme =
            !autoTheme;

        storageSet(
            "dreamAutoTheme",
            autoTheme ? "1" : "0"
        );

        updateAutoThemeButton();


        if (autoTheme) {

            updateAutoTheme();

            showToast(
                "Tema automático ativado"
            );

        } else {

            showToast(
                "Tema automático desativado"
            );

        }

    }
);


if (window.matchMedia) {

    const media =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );


    media.addEventListener?.(
        "change",
        updateAutoTheme
    );

}


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const settingsPanel =
    $("#settingsPanel");


$("#settingsButton")
    ?.addEventListener(
        "click",
        () => {

            settingsPanel
                ?.classList
                .add("open");

        }
    );


$("#closeSettings")
    ?.addEventListener(
        "click",
        () => {

            settingsPanel
                ?.classList
                .remove("open");

        }
    );


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


function applyToggle(
    input,
    className,
    storageKey,
    inverted = false
) {

    if (!input) {
        return;
    }


    const saved =
        storageGet(
            storageKey,
            "1"
        ) === "1";


    input.checked =
        saved;


    body.classList.toggle(
        className,
        inverted
            ? saved
            : !saved
    );


    input.addEventListener(
        "change",
        () => {

            const enabled =
                input.checked;

            storageSet(
                storageKey,
                enabled ? "1" : "0"
            );

            body.classList.toggle(
                className,
                inverted
                    ? enabled
                    : !enabled
            );

        }
    );

}


applyToggle(
    particlesToggle,
    "no-particles",
    "dreamParticles"
);

applyToggle(
    animationsToggle,
    "no-animations",
    "dreamAnimations"
);

applyToggle(
    glassToggle,
    "no-glass",
    "dreamGlass"
);

applyToggle(
    cursorToggle,
    "no-cursor",
    "dreamCursor"
);


/* =========================================================
   TAMANHO DO TEXTO
========================================================= */

function applyFontSize(
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


    $$("[data-font-size]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.fontSize ===
                size
            );

        });


    if (save) {

        storageSet(
            "dreamFontSize",
            size
        );

    }

}


$$("[data-font-size]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                applyFontSize(
                    button.dataset.fontSize
                );

            }
        );

    });


/* =========================================================
   RESET DAS CONFIGURAÇÕES
========================================================= */

$("#resetSettings")
    ?.addEventListener(
        "click",
        () => {

            [
                "dreamPrimary",
                "dreamSecondary",
                "dreamPalette",
                "dreamDark",
                "dreamAutoTheme",
                "dreamParticles",
                "dreamAnimations",
                "dreamGlass",
                "dreamCursor",
                "dreamFontSize",
                "dreamIntensity",
                "dreamBottleSize"
            ].forEach(storageRemove);


            autoTheme = false;

            updateAutoThemeButton();


            applyColors(
                "#df76a8",
                "#9562dc",
                false
            );


            $$(".palette").forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.palette ===
                        "dream"
                    );

                }
            );


            applyDarkMode(
                false,
                false
            );


            body.classList.remove(
                "no-particles",
                "no-animations",
                "no-glass",
                "no-cursor",
                "font-small",
                "font-large",
                "high-contrast",
                "reading-mode",
                "focus-mode",
                "galaxy-mode",
                "crystal-mode"
            );


            body.classList.add(
                "font-normal"
            );


            if (particlesToggle) {
                particlesToggle.checked = true;
            }

            if (animationsToggle) {
                animationsToggle.checked = true;
            }

            if (glassToggle) {
                glassToggle.checked = true;
            }

            if (cursorToggle) {
                cursorToggle.checked = true;
            }


            applyFontSize(
                "normal",
                false
            );


            setIntensity(
                70,
                false
            );


            setBottleSize(
                100,
                false
            );


            showToast(
                "Configurações restauradas ♡"
            );

        }
    );


/* =========================================================
   MODAIS
========================================================= */

function openModal(element) {

    if (!element) {
        return;
    }

    element.classList.add("open");

    element.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeModal(element) {

    if (!element) {
        return;
    }

    element.classList.remove(
        "open"
    );

    element.setAttribute(
        "aria-hidden",
        "true"
    );


    if (
        !$(".modal.open") &&
        !$(".lightbox.open")
    ) {

        body.classList.remove(
            "modal-open"
        );

    }

}


function closeEverything() {

    $$(".modal.open")
        .forEach(closeModal);

    $$(".lightbox.open")
        .forEach(closeModal);

    settingsPanel
        ?.classList
        .remove("open");

    menu
        ?.classList
        .remove("open");

}


/* =========================================================
   PRODUTO
========================================================= */

const productModal =
    $("#productModal");


$$(".open-product")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openModal(
                    productModal
                );

            }
        );

    });


$$(".close-product")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(
                    productModal
                );

            }
        );

    });


/* =========================================================
   FAVORITO
========================================================= */

let favorite =
    storageGet(
        "dreamFavorite",
        "0"
    ) === "1";


function updateFavoriteButtons() {

    const text =
        favorite
            ? "♥ Favoritado"
            : "♡ Favoritar";


    [
        $("#favoriteButton"),
        $("#favoriteModal")
    ].forEach(button => {

        if (!button) {
            return;
        }

        button.textContent =
            text;

        button.classList.toggle(
            "active",
            favorite
        );

    });

}


function toggleFavorite() {

    favorite =
        !favorite;

    storageSet(
        "dreamFavorite",
        favorite ? "1" : "0"
    );

    updateFavoriteButtons();


    showToast(
        favorite
            ? "Dream adicionado aos favoritos ♥"
            : "Dream removido dos favoritos"
    );


    if (favorite) {

        unlockAchievement(
            "lover"
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


/* =========================================================
   COMPARTILHAMENTO
========================================================= */

async function copyText(text) {

    try {

        await navigator.clipboard
            .writeText(text);

        return true;

    } catch {

        const textarea =
            document.createElement(
                "textarea"
            );

        textarea.value = text;

        textarea.style.position =
            "fixed";

        textarea.style.opacity =
            "0";

        document.body.appendChild(
            textarea
        );

        textarea.select();


        let result = false;


        try {

            result =
                document.execCommand(
                    "copy"
                );

        } catch {

            result = false;

        }


        textarea.remove();

        return result;

    }

}


async function shareDream() {

    const data = {

        title:
            "Dream Amor no Ar",

        text:
            "Dream Amor no Ar • Body Splash 350 ml",

        url:
            window.location.href

    };


    if (navigator.share) {

        try {

            await navigator.share(
                data
            );

            unlockAchievement(
                "social"
            );

            return;

        } catch (error) {

            if (
                error?.name ===
                "AbortError"
            ) {

                return;

            }

        }

    }


    const copied =
        await copyText(
            window.location.href
        );


    showToast(
        copied
            ? "Link copiado ♡"
            : "Não foi possível copiar"
    );


    if (copied) {

        unlockAchievement(
            "social"
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


$("#copyPageLink")
    ?.addEventListener(
        "click",
        async () => {

            const copied =
                await copyText(
                    window.location.href
                );

            showToast(
                copied
                    ? "Link copiado!"
                    : "Não foi possível copiar"
            );

        }
    );


$("#copySectionLink")
    ?.addEventListener(
        "click",
        async () => {

            const url =
                `${location.origin}${location.pathname}#produto`;

            const copied =
                await copyText(url);

            showToast(
                copied
                    ? "Link da seção copiado"
                    : "Não foi possível copiar"
            );

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
                    `Dream Amor no Ar • 350 ml\n${window.location.href}`
                );

            window.open(
                `https://wa.me/?text=${text}`,
                "_blank",
                "noopener,noreferrer"
            );

            unlockAchievement(
                "social"
            );

        }
    );


/* =========================================================
   COPIAR PRODUTO
========================================================= */

$("#copyProduct")
    ?.addEventListener(
        "click",
        async () => {

            const copied =
                await copyText(
                    "Dream Amor no Ar • Body Splash • 350 ml • Floral Amadeirado"
                );

            showToast(
                copied
                    ? "Informações copiadas"
                    : "Não foi possível copiar"
            );

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
                getComputedStyle(root);

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


            const copied =
                await copyText(
                    `Dream Palette: ${primary} / ${secondary}`
                );


            showToast(
                copied
                    ? "Paleta copiada 🎨"
                    : "Não foi possível copiar"
            );

        }
    );


/* =========================================================
   NOTAS
========================================================= */

const noteData = {

    bergamota: {
        icon: "🍊",
        title: "Bergamota",
        text:
            "Uma faceta cítrica luminosa que traz sensação de frescor à abertura."
    },

    laranja: {
        icon: "🍊",
        title: "Laranja",
        text:
            "Uma nota cítrica alegre, suculenta e confortável."
    },

    mandarina: {
        icon: "🍊",
        title: "Mandarina",
        text:
            "Traz um toque frutado, brilhante e levemente adocicado."
    },

    limao: {
        icon: "🍋",
        title: "Limão",
        text:
            "Acrescenta brilho e uma impressão cítrica refrescante."
    },

    cassis: {
        icon: "🫐",
        title: "Cassis",
        text:
            "Frutado intenso que adiciona contraste e personalidade."
    },

    maca: {
        icon: "🍎",
        title: "Maçã",
        text:
            "Uma faceta frutada crocante e delicadamente adocicada."
    },

    rosa: {
        icon: "🌹",
        title: "Rosa",
        text:
            "A rosa reforça o lado romântico, floral e elegante da experiência."
    },

    tilia: {
        icon: "🌼",
        title: "Tília",
        text:
            "Uma nuance floral suave que contribui para a sensação delicada."
    },

    freesia: {
        icon: "🌸",
        title: "Frésia",
        text:
            "Floral leve, limpo e luminoso."
    },

    lotus: {
        icon: "🪷",
        title: "Flor de Lótus",
        text:
            "Uma impressão floral aquosa e serena."
    },

    ameixa: {
        icon: "🍑",
        title: "Ameixa",
        text:
            "Uma faceta frutada macia e levemente doce."
    },

    gardenia: {
        icon: "🌺",
        title: "Gardênia",
        text:
            "Floral cremoso que adiciona riqueza ao coração da fragrância."
    },

    pessego: {
        icon: "🍑",
        title: "Pêssego",
        text:
            "Frutado macio, aveludado e confortável."
    },

    ambar: {
        icon: "✨",
        title: "Âmbar",
        text:
            "Traz calor, profundidade e uma sensação envolvente."
    },

    sandalo: {
        icon: "🪵",
        title: "Sândalo",
        text:
            "Madeira cremosa que ajuda a construir uma base confortável."
    },

    baunilha: {
        icon: "🍦",
        title: "Baunilha",
        text:
            "Adiciona uma doçura macia e aconchegante."
    },

    tonka: {
        icon: "🤎",
        title: "Tonka",
        text:
            "Uma faceta quente, doce e amendoada."
    },

    musk: {
        icon: "☁",
        title: "Musk",
        text:
            "Ajuda a criar uma sensação limpa, macia e confortável."
    }

};


const noteModal =
    $("#noteModal");


$$(".note-chip")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const data =
                    noteData[
                        button.dataset.note
                    ];

                if (!data) {
                    return;
                }


                $("#noteModalIcon")
                    .textContent =
                    data.icon;

                $("#noteModalTitle")
                    .textContent =
                    data.title;

                $("#noteModalText")
                    .textContent =
                    data.text;


                openModal(
                    noteModal
                );


                unlockAchievement(
                    "nose"
                );

            }
        );

    });


$$(".close-note")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(
                    noteModal
                );

            }
        );

    });


/* =========================================================
   RODA OLFATIVA
========================================================= */

const wheelData = {

    floral: {
        percent: "90%",
        title: "Floral",
        text: "Romântico e delicado"
    },

    frutado: {
        percent: "75%",
        title: "Frutado",
        text: "Suculento e luminoso"
    },

    citrico: {
        percent: "70%",
        title: "Cítrico",
        text: "Fresco e vibrante"
    },

    doce: {
        percent: "65%",
        title: "Doce",
        text: "Macio e confortável"
    },

    amadeirado: {
        percent: "60%",
        title: "Amadeirado",
        text: "Cremoso e envolvente"
    },

    ambarado: {
        percent: "55%",
        title: "Âmbar",
        text: "Quente e sofisticado"
    }

};


$$("[data-wheel]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const data =
                    wheelData[
                        button.dataset.wheel
                    ];

                if (!data) {
                    return;
                }


                $$("[data-wheel]")
                    .forEach(item =>
                        item.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                $("#wheelPercent")
                    .textContent =
                    data.percent;

                $("#wheelTitle")
                    .textContent =
                    data.title;

                $("#wheelText")
                    .textContent =
                    data.text;

            }
        );

    });


/* =========================================================
   TIMELINE
========================================================= */

const timelineSlider =
    $("#timelineSlider");


const timelineStages = [

    {
        max: 1,
        icon: "🍊",
        title: "Abertura fresca",
        text:
            "Cítricos e frutas aparecem primeiro."
    },

    {
        max: 3,
        icon: "🌸",
        title: "Coração floral",
        text:
            "O floral romântico começa a ganhar destaque."
    },

    {
        max: 5,
        icon: "🌹",
        title: "Flores envolventes",
        text:
            "O coração fica mais macio e elegante."
    },

    {
        max: 7,
        icon: "✨",
        title: "Base confortável",
        text:
            "Âmbar, madeiras e notas doces aparecem."
    },

    {
        max: 8,
        icon: "☁",
        title: "Rastro macio",
        text:
            "Uma sensação confortável permanece na experiência."
    }

];


function updateTimeline() {

    if (!timelineSlider) {
        return;
    }


    const value =
        Number(
            timelineSlider.value
        );


    const stage =
        timelineStages.find(
            item =>
                value <= item.max
        ) ||
        timelineStages[
            timelineStages.length - 1
        ];


    $("#timelineHour")
        .textContent =
        `${value}h`;

    $("#timelineIcon")
        .textContent =
        stage.icon;

    $("#timelineTitle")
        .textContent =
        stage.title;

    $("#timelineText")
        .textContent =
        stage.text;

}


timelineSlider?.addEventListener(
    "input",
    updateTimeline
);

updateTimeline();


/* =========================================================
   METERS
========================================================= */

const meterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                const value =
                    entry.target.dataset.meter;


                entry.target.style.width =
                    `${value}%`;


                meterObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.4
        }

    );


$$("[data-meter]")
    .forEach(meter => {

        meterObserver.observe(
            meter
        );

    });


/* =========================================================
   GALERIA
========================================================= */

const galleryTrack =
    $("#galleryTrack");

const galleryItems =
    $$(".gallery-item");


function galleryStep() {

    const first =
        galleryItems[0];

    if (!first) {
        return 500;
    }


    return (
        first.getBoundingClientRect()
            .width +
        18
    );

}


function galleryMove(direction) {

    galleryTrack?.scrollBy({

        left:
            galleryStep() *
            direction,

        behavior:
            "smooth"

    });

}


$("#galleryPrev")
    ?.addEventListener(
        "click",
        () => galleryMove(-1)
    );


$("#galleryNext")
    ?.addEventListener(
        "click",
        () => galleryMove(1)
    );


/* =========================================================
   AUTOPLAY GALERIA
========================================================= */

let galleryAutoplayTimer = null;

let galleryAutoplayEnabled = false;


const galleryAutoplay =
    $("#galleryAutoplay");


function stopGalleryAutoplay() {

    clearInterval(
        galleryAutoplayTimer
    );

    galleryAutoplayTimer =
        null;

    galleryAutoplayEnabled =
        false;


    if (galleryAutoplay) {

        galleryAutoplay.textContent =
            "▶ Autoplay";

        galleryAutoplay
            .classList
            .remove("active");

    }

}


function startGalleryAutoplay() {

    stopGalleryAutoplay();

    galleryAutoplayEnabled =
        true;


    if (galleryAutoplay) {

        galleryAutoplay.textContent =
            "❚❚ Parar autoplay";

        galleryAutoplay
            .classList
            .add("active");

    }


    galleryAutoplayTimer =
        setInterval(() => {

            if (!galleryTrack) {
                return;
            }


            const max =
                galleryTrack.scrollWidth -
                galleryTrack.clientWidth;


            if (
                galleryTrack.scrollLeft >=
                max - 10
            ) {

                galleryTrack.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });

            } else {

                galleryMove(1);

            }

        }, 3500);

}


galleryAutoplay?.addEventListener(
    "click",
    () => {

        if (galleryAutoplayEnabled) {

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

const lightboxImage =
    $("#lightboxImage");


galleryItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const image =
                $("img", item);

            if (!image) {
                return;
            }


            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt;


            openModal(
                lightbox
            );


            unlockAchievement(
                "gallery"
            );

        }
    );

});


$("#lightboxBackdrop")
    ?.addEventListener(
        "click",
        () => {

            closeModal(
                lightbox
            );

        }
    );


$("#lightboxClose")
    ?.addEventListener(
        "click",
        () => {

            closeModal(
                lightbox
            );

        }
    );


/* =========================================================
   MOODS
========================================================= */

const moodPalettes = {

    romantico: {
        primary: "#df76a8",
        secondary: "#9562dc",
        dark: false
    },

    sonhador: {
        primary: "#c084fc",
        secondary: "#60a5fa",
        dark: false
    },

    noturno: {
        primary: "#9d72ff",
        secondary: "#e879f9",
        dark: true
    },

    energia: {
        primary: "#ff718e",
        secondary: "#ffad5b",
        dark: false
    },

    calmo: {
        primary: "#5fc8b5",
        secondary: "#7997d8",
        dark: false
    }

};


$$("[data-mood]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const mood =
                    moodPalettes[
                        button.dataset.mood
                    ];

                if (!mood) {
                    return;
                }


                $$("[data-mood]")
                    .forEach(item =>
                        item.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                applyColors(
                    mood.primary,
                    mood.secondary
                );


                applyDarkMode(
                    mood.dark
                );


                showToast(
                    `Mood ${button.dataset.mood} ativado`
                );


                unlockAchievement(
                    "mood"
                );

            }
        );

    });


/* =========================================================
   QUIZ
========================================================= */

const quizQuestionsData = [

    {
        question:
            "Qual cenário combina mais com você?",

        options: [

            {
                text:
                    "Um encontro romântico ♡",

                type:
                    "romantic"
            },

            {
                text:
                    "Uma noite sob as estrelas ☾",

                type:
                    "dreamer"
            },

            {
                text:
                    "Um passeio cheio de energia ✦",

                type:
                    "energy"
            },

            {
                text:
                    "Um momento tranquilo ☁",

                type:
                    "calm"
            }

        ]
    },

    {
        question:
            "Qual sensação você prefere?",

        options: [

            {
                text:
                    "Romance",

                type:
                    "romantic"
            },

            {
                text:
                    "Mistério",

                type:
                    "dreamer"
            },

            {
                text:
                    "Alegria",

                type:
                    "energy"
            },

            {
                text:
                    "Conforto",

                type:
                    "calm"
            }

        ]
    },

    {
        question:
            "Escolha um símbolo:",

        options: [

            {
                text:
                    "♡ Coração",

                type:
                    "romantic"
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
                    "energy"
            },

            {
                text:
                    "☁ Nuvem",

                type:
                    "calm"
            }

        ]
    },

    {
        question:
            "Qual palavra combina mais com você?",

        options: [

            {
                text:
                    "Apaixonante",

                type:
                    "romantic"
            },

            {
                text:
                    "Sonhador",

                type:
                    "dreamer"
            },

            {
                text:
                    "Vibrante",

                type:
                    "energy"
            },

            {
                text:
                    "Sereno",

                type:
                    "calm"
            }

        ]
    }

];


const quizResults = {

    romantic: {
        icon: "♡",
        title: "Dream Lover",
        text:
            "Seu perfil é romântico, delicado e apaixonante. Você encontra beleza nos pequenos detalhes."
    },

    dreamer: {
        icon: "☾",
        title: "Dreamer",
        text:
            "Você gosta de mistério, imaginação e momentos que parecem pertencer a outro universo."
    },

    energy: {
        icon: "✦",
        title: "Dream Spark",
        text:
            "Seu perfil é luminoso, divertido e cheio de energia."
    },

    calm: {
        icon: "☁",
        title: "Soft Dream",
        text:
            "Você prefere conforto, tranquilidade e experiências delicadas."
    }

};


let quizIndex = 0;

let quizScores = {

    romantic: 0,
    dreamer: 0,
    energy: 0,
    calm: 0

};

let currentQuizResult =
    null;


function resetQuizScores() {

    quizScores = {

        romantic: 0,
        dreamer: 0,
        energy: 0,
        calm: 0

    };

}


function showQuizQuestion() {

    const data =
        quizQuestionsData[
            quizIndex
        ];

    if (!data) {

        finishQuiz();

        return;

    }


    $("#quizStep")
        .textContent =
        `${quizIndex + 1} / ${quizQuestionsData.length}`;


    $("#quizProgressBar")
        .style.width =
        `${
            (
                (quizIndex + 1) /
                quizQuestionsData.length
            ) * 100
        }%`;


    $("#quizQuestion")
        .textContent =
        data.question;


    const options =
        $("#quizOptions");

    options.innerHTML = "";


    data.options.forEach(option => {

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

                quizScores[
                    option.type
                ]++;

                quizIndex++;

                showQuizQuestion();

            }
        );


        options.appendChild(
            button
        );

    });

}


function startQuiz() {

    quizIndex = 0;

    resetQuizScores();


    $("#quizStart").hidden =
        true;

    $("#quizResult").hidden =
        true;

    $("#quizQuestions").hidden =
        false;


    showQuizQuestion();

}


function finishQuiz() {

    $("#quizQuestions").hidden =
        true;

    $("#quizResult").hidden =
        false;


    const winner =
        Object.entries(
            quizScores
        ).sort(
            (a, b) =>
                b[1] - a[1]
        )[0][0];


    currentQuizResult =
        quizResults[winner];


    $("#quizResultIcon")
        .textContent =
        currentQuizResult.icon;

    $("#quizResultTitle")
        .textContent =
        currentQuizResult.title;

    $("#quizResultText")
        .textContent =
        currentQuizResult.text;


    unlockAchievement(
        "quiz"
    );

}


$("#startQuiz")
    ?.addEventListener(
        "click",
        startQuiz
    );


$("#restartQuiz")
    ?.addEventListener(
        "click",
        startQuiz
    );


/* =========================================================
   CARTÃO DO QUIZ
========================================================= */

const quizShareModal =
    $("#quizShareModal");

const quizCanvas =
    $("#quizCanvas");


function createQuizCard() {

    if (
        !quizCanvas ||
        !currentQuizResult
    ) {

        return;

    }


    const ctx =
        quizCanvas.getContext(
            "2d"
        );


    const styles =
        getComputedStyle(root);

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


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            1080,
            1350
        );

    gradient.addColorStop(
        0,
        primary
    );

    gradient.addColorStop(
        1,
        secondary
    );


    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        1080,
        1350
    );


    ctx.fillStyle =
        "rgba(255,255,255,.10)";

    ctx.beginPath();

    ctx.arc(
        200,
        200,
        330,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        930,
        1120,
        430,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        "rgba(255,255,255,.75)";

    ctx.font =
        "700 28px Arial";

    ctx.fillText(
        "DREAM • AMOR NO AR",
        540,
        190
    );


    ctx.fillStyle =
        "#ffffff";

    ctx.font =
        "100 170px Arial";

    ctx.fillText(
        currentQuizResult.icon,
        540,
        440
    );


    ctx.font =
        "900 82px Arial";

    ctx.fillText(
        currentQuizResult.title,
        540,
        600
    );


    ctx.font =
        "600 31px Arial";


    wrapCanvasText(
        ctx,
        currentQuizResult.text,
        540,
        700,
        750,
        48
    );


    ctx.font =
        "800 32px Arial";

    ctx.fillText(
        "Dream Amor no Ar • 350 ml",
        540,
        1140
    );


    ctx.font =
        "500 22px Arial";

    ctx.fillStyle =
        "rgba(255,255,255,.70)";

    ctx.fillText(
        "Qual é o seu perfil Dream?",
        540,
        1190
    );


    openModal(
        quizShareModal
    );

}


function wrapCanvasText(
    ctx,
    text,
    x,
    y,
    maxWidth,
    lineHeight
) {

    const words =
        text.split(" ");

    let line = "";

    let currentY =
        y;


    for (
        let i = 0;
        i < words.length;
        i++
    ) {

        const testLine =
            `${line}${words[i]} `;

        const width =
            ctx.measureText(
                testLine
            ).width;


        if (
            width > maxWidth &&
            i > 0
        ) {

            ctx.fillText(
                line,
                x,
                currentY
            );

            line =
                `${words[i]} `;

            currentY +=
                lineHeight;

        } else {

            line =
                testLine;

        }

    }


    ctx.fillText(
        line,
        x,
        currentY
    );

}


$("#shareQuizResult")
    ?.addEventListener(
        "click",
        createQuizCard
    );


$$(".close-quiz-share")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(
                    quizShareModal
                );

            }
        );

    });


$("#downloadQuizCard")
    ?.addEventListener(
        "click",
        () => {

            if (!quizCanvas) {
                return;
            }


            const link =
                document.createElement(
                    "a"
                );

            link.download =
                "meu-perfil-dream.png";

            link.href =
                quizCanvas.toDataURL(
                    "image/png"
                );

            link.click();


            showToast(
                "Cartão criado ♡"
            );

        }
    );


/* =========================================================
   INTENSIDADE
========================================================= */

const intensitySlider =
    $("#intensitySlider");


function setIntensity(
    value,
    save = true
) {

    const number =
        Math.max(
            0,
            Math.min(
                100,
                Number(value)
            )
        );


    root.style.setProperty(
        "--intensity",
        number / 100
    );


    if (intensitySlider) {

        intensitySlider.value =
            number;

    }


    let label =
        "Equilibrado";


    if (number < 30) {

        label =
            "Suave";

    } else if (number > 80) {

        label =
            "Intenso";

    }


    if ($("#intensityLabel")) {

        $("#intensityLabel")
            .textContent =
            `${number}% • ${label}`;

    }


    if (save) {

        storageSet(
            "dreamIntensity",
            String(number)
        );

    }

}


intensitySlider?.addEventListener(
    "input",
    event => {

        setIntensity(
            event.target.value
        );

    }
);


/* =========================================================
   TAMANHO DO FRASCO
========================================================= */

const bottleSizeSlider =
    $("#bottleSizeSlider");


function setBottleSize(
    value,
    save = true
) {

    const number =
        Math.max(
            75,
            Math.min(
                125,
                Number(value)
            )
        );


    root.style.setProperty(
        "--bottle-scale",
        number / 100
    );


    if (bottleSizeSlider) {

        bottleSizeSlider.value =
            number;

    }


    if ($("#bottleSizeLabel")) {

        $("#bottleSizeLabel")
            .textContent =
            `${number}%`;

    }


    if (save) {

        storageSet(
            "dreamBottleSize",
            String(number)
        );

    }

}


bottleSizeSlider?.addEventListener(
    "input",
    event => {

        setBottleSize(
            event.target.value
        );

    }
);


/* =========================================================
   VISITAS
========================================================= */

let visits =
    Number(
        storageGet(
            "dreamVisits",
            "0"
        )
    );


if (
    !Number.isFinite(visits) ||
    visits < 0
) {

    visits = 0;

}


visits++;

storageSet(
    "dreamVisits",
    String(visits)
);


if ($("#visitCounter")) {

    $("#visitCounter")
        .textContent =
        visits;

}


/* =========================================================
   TEMPO NO SITE
========================================================= */

const sessionStart =
    Date.now();


function updateTimeOnSite() {

    const seconds =
        Math.floor(
            (
                Date.now() -
                sessionStart
            ) / 1000
        );


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        seconds % 60;


    if ($("#timeOnSite")) {

        $("#timeOnSite")
            .textContent =
            `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;

    }

}


setInterval(
    updateTimeOnSite,
    1000
);

updateTimeOnSite();


/* =========================================================
   TILT 3D
========================================================= */

const tiltToggle =
    $("#tiltToggle");


function resetBottleTilt() {

    if (!mainBottle) {
        return;
    }

    mainBottle.style.transform =
        `scale(var(--bottle-scale))`;

}


heroProduct?.addEventListener(
    "mousemove",
    event => {

        if (
            !tiltToggle?.checked ||
            !mainBottle
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


        mainBottle.style.transform =
            `
                scale(var(--bottle-scale))
                rotateY(${x * 15}deg)
                rotateX(${y * -11}deg)
                translateY(-4px)
            `;

    }
);


heroProduct?.addEventListener(
    "mouseleave",
    resetBottleTilt
);


tiltToggle?.addEventListener(
    "change",
    () => {

        if (!tiltToggle.checked) {

            resetBottleTilt();

        }

    }
);


/* =========================================================
   SPRAY
========================================================= */

let sprayCount = 0;


function sprayDream() {

    if (
        !sprayArea ||
        !sprayButton
    ) {

        return;

    }


    const areaRect =
        sprayArea
            .getBoundingClientRect();

    const buttonRect =
        sprayButton
            .getBoundingClientRect();


    const startX =
        buttonRect.left -
        areaRect.left +
        buttonRect.width / 2;

    const startY =
        buttonRect.top -
        areaRect.top +
        buttonRect.height / 2;


    for (
        let i = 0;
        i < 32;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );

        particle.className =
            "spray-particle";


        particle.style.left =
            `${startX}px`;

        particle.style.top =
            `${startY}px`;


        particle.style.setProperty(
            "--size",
            `${3 + Math.random() * 7}px`
        );


        particle.style.setProperty(
            "--x",
            `${
                70 +
                Math.random() * 220
            }px`
        );


        particle.style.setProperty(
            "--y",
            `${
                -140 +
                Math.random() * 280
            }px`
        );


        sprayArea.appendChild(
            particle
        );


        setTimeout(
            () => particle.remove(),
            1300
        );

    }


    sprayCount++;


    showToast(
        `Dream no ar ✦ ${sprayCount} borrifada${sprayCount === 1 ? "" : "s"}`
    );


    if (sprayCount >= 5) {

        unlockAchievement(
            "spray"
        );

    }


    playTone(
        680,
        0.08,
        0.035
    );

}


sprayButton?.addEventListener(
    "click",
    sprayDream
);


/* =========================================================
   SOM
========================================================= */

let audioContext = null;

let ambientEnabled = false;

let ambientTimer = null;


function getAudioContext() {

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContext) {

        return null;

    }


    if (!audioContext) {

        audioContext =
            new AudioContext();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume()
            .catch(() => {});

    }


    return audioContext;

}


function playTone(
    frequency = 440,
    duration = 0.1,
    volume = 0.025
) {

    if (!ambientEnabled) {
        return;
    }


    const context =
        getAudioContext();

    if (!context) {
        return;
    }


    try {

        const oscillator =
            context.createOscillator();

        const gain =
            context.createGain();


        oscillator.type =
            "sine";

        oscillator.frequency.value =
            frequency;


        gain.gain.setValueAtTime(
            volume,
            context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            context.currentTime +
            duration
        );


        oscillator.connect(
            gain
        );

        gain.connect(
            context.destination
        );


        oscillator.start();

        oscillator.stop(
            context.currentTime +
            duration
        );

    } catch {

        // Navegador sem suporte.

    }

}


function startAmbient() {

    ambientEnabled = true;


    getAudioContext();


    clearInterval(
        ambientTimer
    );


    ambientTimer =
        setInterval(() => {

            const notes =
                [
                    392,
                    440,
                    523.25,
                    659.25
                ];


            const note =
                notes[
                    Math.floor(
                        Math.random() *
                        notes.length
                    )
                ];


            playTone(
                note,
                1.8,
                0.008
            );

        }, 2800);


    const button =
        $("#ambientSoundButton");


    if (button) {

        button.textContent =
            "♫ Som ON";

        button.classList.add(
            "active"
        );

    }


    showToast(
        "Som ambiente ativado ♫"
    );

}


function stopAmbient() {

    ambientEnabled = false;

    clearInterval(
        ambientTimer
    );


    const button =
        $("#ambientSoundButton");


    if (button) {

        button.textContent =
            "♫ Som OFF";

        button.classList.remove(
            "active"
        );

    }


    showToast(
        "Som ambiente desativado"
    );

}


$("#ambientSoundButton")
    ?.addEventListener(
        "click",
        () => {

            if (ambientEnabled) {

                stopAmbient();

            } else {

                startAmbient();

            }

        }
    );


/* =========================================================
   MODO FOCO
========================================================= */

let focusEnabled = false;


$("#focusMode")
    ?.addEventListener(
        "click",
        () => {

            focusEnabled =
                !focusEnabled;


            body.classList.toggle(
                "focus-mode",
                focusEnabled
            );


            $("#focusMode")
                ?.classList
                .toggle(
                    "active",
                    focusEnabled
                );


            if (focusEnabled) {

                const visible =
                    trackedSections.find(
                        section => {

                            const rect =
                                section
                                    .getBoundingClientRect();

                            return (
                                rect.top <
                                    window.innerHeight *
                                    0.6 &&
                                rect.bottom >
                                    window.innerHeight *
                                    0.4
                            );

                        }
                    ) ||
                    trackedSections[0];


                trackedSections
                    .forEach(section =>
                        section.classList.remove(
                            "focus-active"
                        )
                    );


                visible?.classList.add(
                    "focus-active"
                );

            } else {

                trackedSections
                    .forEach(section =>
                        section.classList.remove(
                            "focus-active"
                        )
                    );

            }


            showToast(
                focusEnabled
                    ? "Modo foco ativado"
                    : "Modo foco desativado"
            );

        }
    );


/* =========================================================
   CONTRASTE
========================================================= */

$("#highContrastButton")
    ?.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "high-contrast"
            );


            const enabled =
                body.classList.contains(
                    "high-contrast"
                );


            $("#highContrastButton")
                ?.classList
                .toggle(
                    "active",
                    enabled
                );


            showToast(
                enabled
                    ? "Alto contraste ativado"
                    : "Alto contraste desativado"
            );

        }
    );


/* =========================================================
   LEITURA
========================================================= */

$("#readingModeButton")
    ?.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "reading-mode"
            );


            const enabled =
                body.classList.contains(
                    "reading-mode"
                );


            $("#readingModeButton")
                ?.classList
                .toggle(
                    "active",
                    enabled
                );


            showToast(
                enabled
                    ? "Modo leitura ativado"
                    : "Modo leitura desativado"
            );

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

                if (!document.fullscreenElement) {

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
    );


/* =========================================================
   VIBRAR
========================================================= */

$("#vibrateButton")
    ?.addEventListener(
        "click",
        () => {

            if ("vibrate" in navigator) {

                navigator.vibrate(
                    [80, 40, 100]
                );

                showToast(
                    "Vibração ativada 〰"
                );

            } else {

                showToast(
                    "Vibração não disponível neste dispositivo"
                );

            }

        }
    );


/* =========================================================
   PALETA ALEATÓRIA
========================================================= */

function randomHex() {

    const hue =
        Math.floor(
            Math.random() * 360
        );


    return hslToHex(
        hue,
        65,
        65
    );

}


function hslToHex(
    h,
    s,
    l
) {

    s /= 100;
    l /= 100;


    const c =
        (1 - Math.abs(2 * l - 1)) *
        s;

    const x =
        c *
        (
            1 -
            Math.abs(
                (
                    h / 60
                ) %
                2 -
                1
            )
        );

    const m =
        l - c / 2;


    let r = 0;
    let g = 0;
    let b = 0;


    if (h < 60) {

        r = c;
        g = x;

    } else if (h < 120) {

        r = x;
        g = c;

    } else if (h < 180) {

        g = c;
        b = x;

    } else if (h < 240) {

        g = x;
        b = c;

    } else if (h < 300) {

        r = x;
        b = c;

    } else {

        r = c;
        b = x;

    }


    const convert =
        value => {

            return Math.round(
                (value + m) * 255
            )
                .toString(16)
                .padStart(2, "0");

        };


    return (
        "#" +
        convert(r) +
        convert(g) +
        convert(b)
    );

}


$("#randomPaletteButton")
    ?.addEventListener(
        "click",
        () => {

            const first =
                randomHex();

            const second =
                randomHex();


            applyColors(
                first,
                second
            );


            $$(".palette")
                .forEach(button =>
                    button.classList.remove(
                        "active"
                    )
                );


            showToast(
                "Nova paleta criada 🎨"
            );

        }
    );


/* =========================================================
   NOTA ALEATÓRIA
========================================================= */

function showRandomNote() {

    const values =
        Object.values(
            noteData
        );


    const data =
        values[
            Math.floor(
                Math.random() *
                values.length
            )
        ];


    if (!data) {
        return;
    }


    $("#randomNoteIcon")
        .textContent =
        data.icon;

    $("#randomNoteTitle")
        .textContent =
        data.title;

    $("#randomNoteText")
        .textContent =
        data.text;


    showToast(
        `Sua nota: ${data.title}`
    );

}


$("#randomNoteButton")
    ?.addEventListener(
        "click",
        showRandomNote
    );


/* =========================================================
   SEÇÃO ALEATÓRIA
========================================================= */

function randomSection() {

    const available =
        trackedSections.filter(
            section =>
                section.id !== "inicio"
        );


    const section =
        available[
            Math.floor(
                Math.random() *
                available.length
            )
        ];


    section?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    if (section) {

        showToast(
            `Destino: ${section.dataset.sectionName || section.id} ✦`
        );

    }

}


$("#randomSection")
    ?.addEventListener(
        "click",
        randomSection
    );


$("#randomSectionLab")
    ?.addEventListener(
        "click",
        randomSection
    );


/* =========================================================
   ME SURPREENDA
========================================================= */

$("#surpriseButton")
    ?.addEventListener(
        "click",
        () => {

            const actions = [

                () => randomSection(),

                () => showRandomNote(),

                () => {

                    const keys =
                        Object.keys(
                            palettes
                        );

                    const palette =
                        keys[
                            Math.floor(
                                Math.random() *
                                keys.length
                            )
                        ];

                    setPalette(
                        palette,
                        false
                    );

                    showToast(
                        `Surpresa: paleta ${palette} 🎨`
                    );

                },

                () => {

                    sprayDream();

                    setTimeout(
                        sprayDream,
                        180
                    );

                    setTimeout(
                        sprayDream,
                        360
                    );

                },

                () => {

                    createHeartRain(
                        35
                    );

                    showToast(
                        "Chuva de amor ♡"
                    );

                },

                () => {

                    const moods =
                        $$("[data-mood]");

                    const mood =
                        moods[
                            Math.floor(
                                Math.random() *
                                moods.length
                            )
                        ];

                    mood?.click();

                }

            ];


            const action =
                actions[
                    Math.floor(
                        Math.random() *
                        actions.length
                    )
                ];


            action();


            unlockAchievement(
                "surprise"
            );

        }
    );


/* =========================================================
   DOWNLOAD DA FICHA
========================================================= */

$("#downloadSheet")
    ?.addEventListener(
        "click",
        () => {

            const content = `
DREAM AMOR NO AR
Body Splash • 350 ml

Família apresentada:
Floral Amadeirado

SAÍDA
• Bergamota
• Laranja
• Mandarina
• Limão
• Cassis
• Maçã

CORPO
• Rosa
• Tília
• Frésia
• Flor de Lótus
• Ameixa
• Gardênia
• Pêssego

FUNDO
• Âmbar
• Sândalo
• Baunilha
• Tonka
• Musk

Projeto demonstrativo não oficial.
            `.trim();


            const blob =
                new Blob(
                    [content],
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


            setTimeout(
                () =>
                    URL.revokeObjectURL(
                        url
                    ),
                1000
            );


            showToast(
                "Ficha baixada ↓"
            );


            unlockAchievement(
                "collector"
            );

        }
    );


/* =========================================================
   FAQ
========================================================= */

const faqItems =
    $$(".faq-item");


faqItems.forEach(item => {

    const button =
        $(".faq-question", item);


    button?.addEventListener(
        "click",
        () => {

            item.classList.toggle(
                "open"
            );

        }
    );

});


$("#openAllFaq")
    ?.addEventListener(
        "click",
        () => {

            faqItems.forEach(item => {

                if (
                    item.style.display !==
                    "none"
                ) {

                    item.classList.add(
                        "open"
                    );

                }

            });

        }
    );


$("#closeAllFaq")
    ?.addEventListener(
        "click",
        () => {

            faqItems.forEach(item => {

                item.classList.remove(
                    "open"
                );

            });

        }
    );


$("#faqSearch")
    ?.addEventListener(
        "input",
        event => {

            const query =
                event.target.value
                    .trim()
                    .toLowerCase();


            let visibleCount = 0;


            faqItems.forEach(item => {

                const text =
                    item.textContent
                        .toLowerCase();


                const visible =
                    text.includes(
                        query
                    );


                item.style.display =
                    visible
                        ? ""
                        : "none";


                if (visible) {

                    visibleCount++;

                }

            });


            if ($("#faqEmpty")) {

                $("#faqEmpty")
                    .style.display =
                    visibleCount === 0
                        ? "block"
                        : "none";

            }

        }
    );


/* =========================================================
   APRESENTAÇÃO AUTOMÁTICA
========================================================= */

let presentationTimer = null;

let presentationIndex = 0;


const presentationBadge =
    $("#presentationBadge");


function stopPresentation() {

    clearInterval(
        presentationTimer
    );

    presentationTimer =
        null;

    presentationBadge
        ?.classList
        .remove("show");

}


function startPresentation() {

    stopPresentation();

    presentationIndex = 0;


    presentationBadge
        ?.classList
        .add("show");


    trackedSections[0]
        ?.scrollIntoView({
            behavior: "smooth"
        });


    presentationTimer =
        setInterval(() => {

            presentationIndex++;


            if (
                presentationIndex >=
                trackedSections.length
            ) {

                stopPresentation();

                showToast(
                    "Apresentação finalizada ♡"
                );

                return;

            }


            trackedSections[
                presentationIndex
            ]?.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }, 5200);


    showToast(
        "Modo apresentação iniciado ▶"
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
   CORAÇÕES AO CLICAR
========================================================= */

let clickHeartsEnabled = false;


$("#clickHeartsButton")
    ?.addEventListener(
        "click",
        () => {

            clickHeartsEnabled =
                !clickHeartsEnabled;


            const button =
                $("#clickHeartsButton");


            if (button) {

                button.textContent =
                    clickHeartsEnabled
                        ? "♥ Corações ON"
                        : "♥ Corações OFF";

                button.classList.toggle(
                    "active",
                    clickHeartsEnabled
                );

            }


            showToast(
                clickHeartsEnabled
                    ? "Corações ativados ♥"
                    : "Corações desativados"
            );

        }
    );


document.addEventListener(
    "click",
    event => {

        if (!clickHeartsEnabled) {
            return;
        }


        if (
            event.target.closest(
                ".settings-panel"
            ) ||
            event.target.closest(
                ".modal"
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
        "♡";

    heart.style.left =
        `${x}px`;

    heart.style.top =
        `${y}px`;


    document.body.appendChild(
        heart
    );


    setTimeout(
        () => heart.remove(),
        1300
    );

}


/* =========================================================
   CHUVA DE CORAÇÕES
========================================================= */

function createHeartRain(
    amount = 45
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(() => {

            const heart =
                document.createElement(
                    "span"
                );

            heart.className =
                "particle";

            heart.textContent =
                Math.random() > 0.5
                    ? "♡"
                    : "♥";


            heart.style.position =
                "fixed";

            heart.style.zIndex =
                "25000";

            heart.style.left =
                `${Math.random() * 100}%`;

            heart.style.bottom =
                "-30px";

            heart.style.fontSize =
                `${12 + Math.random() * 24}px`;

            heart.style.color =
                "var(--primary)";

            heart.style.pointerEvents =
                "none";

            heart.style.setProperty(
                "--duration",
                `${4 + Math.random() * 4}s`
            );


            document.body.appendChild(
                heart
            );


            setTimeout(
                () => heart.remove(),
                8500
            );

        }, i * 55);

    }

}


/* =========================================================
   CONQUISTAS
========================================================= */

const achievements = {

    lover: {
        icon: "♥",
        title: "Dream Lover",
        text:
            "Favoritou Dream Amor no Ar."
    },

    nose: {
        icon: "✿",
        title: "Nariz Curioso",
        text:
            "Explorou uma nota olfativa."
    },

    spray: {
        icon: "✦",
        title: "Amor no Ar",
        text:
            "Borrifou Dream cinco vezes."
    },

    gallery: {
        icon: "▣",
        title: "Dream Gallery",
        text:
            "Abriu uma imagem da galeria."
    },

    mood: {
        icon: "☁",
        title: "Mood Maker",
        text:
            "Experimentou um Dream Mood."
    },

    quiz: {
        icon: "?",
        title: "Dream Profile",
        text:
            "Terminou o quiz."
    },

    social: {
        icon: "↗",
        title: "Spread Love",
        text:
            "Compartilhou a experiência."
    },

    collector: {
        icon: "↓",
        title: "Dream Collector",
        text:
            "Baixou a ficha da fragrância."
    },

    surprise: {
        icon: "★",
        title: "Surpresa!",
        text:
            "Usou o botão Me surpreenda."
    },

    logo: {
        icon: "♡",
        title: "Love Rain",
        text:
            "Descobriu o segredo do logo."
    },

    konami: {
        icon: "✧",
        title: "Galaxy Dream",
        text:
            "Descobriu o código secreto."
    },

    dreamcode: {
        icon: "D",
        title: "Dream Secret",
        text:
            "Digitou a palavra secreta."
    },

    crystal: {
        icon: "◇",
        title: "Crystal Dream",
        text:
            "Descobriu o segredo do frasco."
    }

};


let unlockedAchievements =
    getJSON(
        "dreamAchievements",
        []
    );


if (
    !Array.isArray(
        unlockedAchievements
    )
) {

    unlockedAchievements =
        [];

}


unlockedAchievements =
    unlockedAchievements.filter(
        id =>
            Object.prototype
                .hasOwnProperty
                .call(
                    achievements,
                    id
                )
    );


function unlockAchievement(id) {

    if (!achievements[id]) {
        return;
    }


    if (
        unlockedAchievements
            .includes(id)
    ) {

        return;
    }


    unlockedAchievements.push(
        id
    );


    setJSON(
        "dreamAchievements",
        unlockedAchievements
    );


    const toastElement =
        $("#achievementToast");

    const text =
        $("#achievementToastText");


    if (text) {

        text.textContent =
            achievements[id].title;

    }


    toastElement
        ?.classList
        .add("show");


    setTimeout(
        () => {

            toastElement
                ?.classList
                .remove("show");

        },
        3500
    );


    renderAchievements();

}


function renderAchievements() {

    const list =
        $("#achievementsList");

    if (!list) {
        return;
    }


    list.innerHTML = "";


    Object.entries(
        achievements
    ).forEach(
        ([id, achievement]) => {

            const unlocked =
                unlockedAchievements
                    .includes(id);


            const item =
                document.createElement(
                    "div"
                );

            item.className =
                `achievement-item ${
                    unlocked
                        ? ""
                        : "locked"
                }`;


            item.innerHTML = `

                <span>
                    ${
                        unlocked
                            ? achievement.icon
                            : "?"
                    }
                </span>

                <div>

                    <strong>
                        ${
                            unlocked
                                ? achievement.title
                                : "???"
                        }
                    </strong>

                    <small>
                        ${
                            unlocked
                                ? achievement.text
                                : "Conquista ainda bloqueada."
                        }
                    </small>

                </div>

            `;


            list.appendChild(
                item
            );

        }
    );

}


const achievementsModal =
    $("#achievementsModal");


$("#achievementsButton")
    ?.addEventListener(
        "click",
        () => {

            renderAchievements();

            openModal(
                achievementsModal
            );

        }
    );


$$(".close-achievements")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(
                    achievementsModal
                );

            }
        );

    });


/* =========================================================
   EASTER EGG — 5 CLIQUES NO LOGO
========================================================= */

let logoClicks = 0;

let logoClickTimer = null;


$$("[data-easter-logo]")
    .forEach(logo => {

        logo.addEventListener(
            "click",
            event => {

                logoClicks++;


                clearTimeout(
                    logoClickTimer
                );


                logoClickTimer =
                    setTimeout(() => {

                        logoClicks = 0;

                    }, 1600);


                if (logoClicks >= 5) {

                    event.preventDefault();

                    logoClicks = 0;

                    createHeartRain(
                        60
                    );

                    showToast(
                        "LOVE IS IN THE AIR ♡"
                    );

                    unlockAchievement(
                        "logo"
                    );

                }

            }
        );

    });


/* =========================================================
   EASTER EGG — KONAMI
========================================================= */

const konamiCode = [

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


let konamiIndex = 0;


document.addEventListener(
    "keydown",
    event => {

        const expected =
            konamiCode[
                konamiIndex
            ];


        const key =
            event.key.length === 1
                ? event.key.toLowerCase()
                : event.key;


        if (key === expected) {

            konamiIndex++;


            if (
                konamiIndex ===
                konamiCode.length
            ) {

                konamiIndex = 0;

                body.classList.toggle(
                    "galaxy-mode"
                );


                showToast(
                    "GALAXY DREAM desbloqueado ✧"
                );


                createHeartRain(
                    70
                );


                unlockAchievement(
                    "konami"
                );

            }

        } else {

            konamiIndex = 0;

        }

    }
);


/* =========================================================
   EASTER EGG — DIGITAR DREAM
========================================================= */

let typedSecret = "";


document.addEventListener(
    "keydown",
    event => {

        if (
            event.target.matches(
                "input, textarea"
            )
        ) {

            return;

        }


        if (
            event.key.length !== 1
        ) {

            return;

        }


        typedSecret +=
            event.key.toUpperCase();


        typedSecret =
            typedSecret.slice(-5);


        if (
            typedSecret ===
            "DREAM"
        ) {

            createHeartRain(
                80
            );


            showToast(
                "DREAM MODE ♡"
            );


            applyColors(
                "#ff83bd",
                "#9270ff"
            );


            unlockAchievement(
                "dreamcode"
            );


            typedSecret = "";

        }

    }
);


/* =========================================================
   EASTER EGG — DUPLO CLIQUE NO FRASCO
========================================================= */

mainBottle?.addEventListener(
    "dblclick",
    () => {

        body.classList.toggle(
            "crystal-mode"
        );


        const enabled =
            body.classList.contains(
                "crystal-mode"
            );


        showToast(
            enabled
                ? "CRYSTAL DREAM desbloqueado ◇"
                : "Crystal Dream desativado"
        );


        if (enabled) {

            unlockAchievement(
                "crystal"
            );

        }

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

            openModal(
                shortcutsModal
            );

        }
    );


$$(".close-shortcuts")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(
                    shortcutsModal
                );

            }
        );

    });


document.addEventListener(
    "keydown",
    event => {

        if (
            event.target.matches(
                "input, textarea"
            )
        ) {

            if (
                event.key ===
                "Escape"
            ) {

                closeEverything();

            }

            return;

        }


        if (
            event.ctrlKey ||
            event.metaKey ||
            event.altKey
        ) {

            return;

        }


        const key =
            event.key.toLowerCase();


        if (
            key ===
            "escape"
        ) {

            closeEverything();

            return;

        }


        if (key === "p") {

            settingsPanel
                ?.classList
                .toggle("open");

        }


        if (key === "m") {

            themeButton?.click();

        }


        if (key === "g") {

            $("#galeria")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }


        if (key === "q") {

            $("#quiz")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }


        if (key === "l") {

            $("#lab")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }


        if (key === "s") {

            sprayDream();

        }


        if (key === "r") {

            randomSection();

        }


        if (
            event.key === "?"
        ) {

            openModal(
                shortcutsModal
            );

        }

    }
);


/* =========================================================
   SWIPE DA GALERIA
========================================================= */

let galleryTouchStart = 0;


galleryTrack?.addEventListener(
    "touchstart",
    event => {

        galleryTouchStart =
            event.touches[0]
                .clientX;

    },

    {
        passive: true
    }
);


galleryTrack?.addEventListener(
    "touchend",
    event => {

        const end =
            event.changedTouches[0]
                .clientX;


        const difference =
            galleryTouchStart -
            end;


        if (
            Math.abs(difference) <
            50
        ) {

            return;

        }


        galleryMove(
            difference > 0
                ? 1
                : -1
        );

    },

    {
        passive: true
    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function initialize() {

    /*
        Cores
    */

    const savedPrimary =
        storageGet(
            "dreamPrimary",
            "#df76a8"
        );

    const savedSecondary =
        storageGet(
            "dreamSecondary",
            "#9562dc"
        );


    applyColors(
        savedPrimary,
        savedSecondary,
        false
    );


    const savedPalette =
        storageGet(
            "dreamPalette",
            ""
        );


    if (
        savedPalette &&
        palettes[savedPalette]
    ) {

        $$(".palette").forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.palette ===
                    savedPalette
                );

            }
        );

    }


    /*
        Tema
    */

    if (autoTheme) {

        updateAutoTheme();

    } else {

        const dark =
            storageGet(
                "dreamDark",
                "0"
            ) === "1";


        applyDarkMode(
            dark,
            false
        );

    }


    updateAutoThemeButton();


    /*
        Fonte
    */

    const font =
        storageGet(
            "dreamFontSize",
            "normal"
        );


    applyFontSize(
        [
            "small",
            "normal",
            "large"
        ].includes(font)
            ? font
            : "normal",
        false
    );


    /*
        Intensidade
    */

    const intensity =
        Number(
            storageGet(
                "dreamIntensity",
                "70"
            )
        );


    setIntensity(
        Number.isFinite(intensity)
            ? intensity
            : 70,
        false
    );


    /*
        Tamanho
    */

    const bottleSize =
        Number(
            storageGet(
                "dreamBottleSize",
                "100"
            )
        );


    setBottleSize(
        Number.isFinite(bottleSize)
            ? bottleSize
            : 100,
        false
    );


    /*
        Favorito
    */

    updateFavoriteButtons();


    /*
        Conquistas
    */

    renderAchievements();


    /*
        Primeira nota da roda
    */

    const firstWheel =
        $('[data-wheel="floral"]');

    firstWheel?.classList.add(
        "active"
    );


    /*
        Garantir reveal inicial
    */

    setTimeout(() => {

        $$(".reveal")
            .forEach(element => {

                const rect =
                    element
                        .getBoundingClientRect();


                if (
                    rect.top <
                    window.innerHeight *
                    0.95
                ) {

                    element.classList.add(
                        "visible"
                    );

                }

            });

    }, 100);

}


initialize();