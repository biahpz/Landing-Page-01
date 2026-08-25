"use strict";

/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

const body = document.body;
const root = document.documentElement;

const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);

const random = (min, max) =>
    Math.random() * (max - min) + min;

const storage = {
    get(key, fallback = null) {
        try {
            const value = localStorage.getItem(key);
            return value === null ? fallback : value;
        } catch {
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch {}
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch {}
    }
};


/* =========================================================
   ELEMENTOS PRINCIPAIS
========================================================= */

const loader = $("#loader");

const header = $("#header");
const menu = $("#menu");
const menuMobile = $("#menuMobile");

const scrollProgress = $("#scrollProgress");
const backTop = $("#backTop");

const toast = $("#toast");

const cursorGlow = $("#cursorGlow");
const particles = $("#particles");

const themeButton = $("#themeButton");

const sectionIndicator = $("#sectionIndicator");


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2400);
}


/* =========================================================
   LOADER
========================================================= */

function hideLoader() {

    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("hide");
    }, 500);

    setTimeout(() => {
        loader.remove();
    }, 1300);
}

if (document.readyState === "complete") {
    hideLoader();
} else {
    window.addEventListener("load", hideLoader);
}


/* =========================================================
   HEADER / SCROLL
========================================================= */

function updateScrollUI() {

    const y =
        window.scrollY ||
        document.documentElement.scrollTop;

    if (header) {
        header.classList.toggle(
            "scrolled",
            y > 20
        );
    }

    if (backTop) {
        backTop.classList.toggle(
            "show",
            y > 500
        );
    }

    if (scrollProgress) {

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            scrollHeight > 0
                ? (y / scrollHeight) * 100
                : 0;

        scrollProgress.style.width =
            `${clamp(percentage, 0, 100)}%`;
    }
}

window.addEventListener(
    "scroll",
    updateScrollUI,
    { passive: true }
);

updateScrollUI();


/* =========================================================
   VOLTAR AO TOPO
========================================================= */

backTop?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   MENU MOBILE
========================================================= */

function closeMobileMenu() {

    if (!menu || !menuMobile) return;

    menu.classList.remove("open");

    menuMobile.textContent = "☰";

    menuMobile.setAttribute(
        "aria-expanded",
        "false"
    );
}

menuMobile?.addEventListener("click", () => {

    if (!menu) return;

    const opened =
        menu.classList.toggle("open");

    menuMobile.textContent =
        opened ? "×" : "☰";

    menuMobile.setAttribute(
        "aria-expanded",
        String(opened)
    );
});

$$('#menu a').forEach(link => {

    link.addEventListener("click", () => {
        closeMobileMenu();
    });

});

document.addEventListener("click", event => {

    if (!menu || !menuMobile) return;

    if (
        window.innerWidth <= 1050 &&
        menu.classList.contains("open") &&
        !menu.contains(event.target) &&
        !menuMobile.contains(event.target)
    ) {
        closeMobileMenu();
    }

});


/* =========================================================
   REVEAL
========================================================= */

const revealElements = $$(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );
                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* =========================================================
   SECTION INDICATOR
========================================================= */

const trackedSections =
    $$("main section[id]");

function updateSectionIndicator() {

    if (!sectionIndicator) return;

    let current = trackedSections[0];

    trackedSections.forEach(section => {

        const rect =
            section.getBoundingClientRect();

        if (
            rect.top <= window.innerHeight * 0.45
        ) {
            current = section;
        }
    });

    if (!current) return;

    const index =
        trackedSections.indexOf(current) + 1;

    const nameMap = {
        inicio: "Início",
        produto: "Produto",
        campanha: "Campanha",
        notas: "Notas",
        experiencia: "Experiência",
        sensacao: "Sensação",
        galeria: "Galeria",
        quiz: "Quiz",
        "quando-usar": "Momentos"
    };

    sectionIndicator.innerHTML =
        `<span>${String(index).padStart(2, "0")}</span>
         ${nameMap[current.id] || current.id}`;
}

window.addEventListener(
    "scroll",
    updateSectionIndicator,
    { passive: true }
);

updateSectionIndicator();


/* =========================================================
   CURSOR GLOW
========================================================= */

let cursorEnabled =
    storage.get("dream_cursor", "true") !== "false";

function applyCursorState() {

    body.classList.toggle(
        "no-cursor",
        !cursorEnabled
    );

    if ($("#cursorToggle")) {
        $("#cursorToggle").checked =
            cursorEnabled;
    }
}

window.addEventListener(
    "pointermove",
    event => {

        if (
            !cursorGlow ||
            !cursorEnabled
        ) return;

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;
    },
    { passive: true }
);

applyCursorState();


/* =========================================================
   PARTÍCULAS
========================================================= */

let particlesEnabled =
    storage.get(
        "dream_particles",
        "true"
    ) !== "false";

let particleIntensity =
    Number(
        storage.get(
            "dream_particle_intensity",
            "100"
        )
    );

function createParticles() {

    if (!particles) return;

    particles.innerHTML = "";

    if (!particlesEnabled) return;

    const amount =
        Math.round(
            22 *
            clamp(
                particleIntensity,
                0,
                150
            ) /
            100
        );

    const symbols =
        ["♡", "✦", "·", "✧"];

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const element =
            document.createElement("span");

        element.className =
            "particle";

        element.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        element.style.left =
            `${random(0, 100)}%`;

        element.style.fontSize =
            `${random(8, 22)}px`;

        element.style.setProperty(
            "--duration",
            `${random(9, 19)}s`
        );

        element.style.setProperty(
            "--delay",
            `${random(-18, 0)}s`
        );

        particles.appendChild(element);
    }
}

function applyParticleState() {

    body.classList.toggle(
        "no-particles",
        !particlesEnabled
    );

    const toggle =
        $("#particlesToggle");

    if (toggle) {
        toggle.checked =
            particlesEnabled;
    }

    const range =
        $("#particleIntensityRange");

    if (range) {
        range.value =
            String(particleIntensity);
    }

    createParticles();
}

applyParticleState();


/* =========================================================
   TEMA
========================================================= */

let darkMode =
    storage.get(
        "dream_dark",
        "false"
    ) === "true";

function applyTheme() {

    body.classList.toggle(
        "dark",
        darkMode
    );

    if (themeButton) {
        themeButton.textContent =
            darkMode ? "☀" : "☾";
    }

    const darkToggle =
        $("#darkToggle");

    if (darkToggle) {
        darkToggle.checked =
            darkMode;
    }
}

function toggleTheme() {

    darkMode = !darkMode;

    storage.set(
        "dream_dark",
        String(darkMode)
    );

    applyTheme();
}

themeButton?.addEventListener(
    "click",
    toggleTheme
);

applyTheme();


/* =========================================================
   IDIOMAS
========================================================= */

const translations = {

    "pt-BR": {

        loader:
            "preparando sua experiência",

        home:
            "Início",

        product:
            "Produto",

        notes:
            "Notas",

        experience:
            "Experiência",

        gallery:
            "Galeria",

        quiz:
            "Quiz",

        discover:
            "Conhecer",

        heroText:
            "Uma fragrância delicada, romântica e envolvente para transformar pequenos momentos em lembranças especiais.",

        discoverDream:
            "Descobrir o Dream",

        viewProduct:
            "Ver produto",

        floral:
            "Floral",

        woody:
            "Amadeirado",

        spray:
            "Borrifar",

        sprays:
            "BORRIFADAS",

        touch:
            "Um toque de",

        love:
            "amor",

        routine:
            "na sua rotina.",

        productText:
            "Dream Amor no Ar combina delicadeza, romantismo e personalidade em uma fragrância confortável para diferentes momentos.",

        delicateFloral:
            "Floral delicado",

        delicateFloralText:
            "Uma assinatura leve, elegante e romântica.",

        comfortable:
            "Sensação confortável",

        comfortableText:
            "Para usar de forma leve durante o dia.",

        routineDream:
            "Um Dream para acompanhar sua rotina.",

        details:
            "Ver detalhes",

        favorite:
            "♡ Favoritar",

        detailsLove:
            "O amor está nos detalhes.",

        campaignText:
            "Uma atmosfera romântica, sofisticada e cheia de personalidade.",

        knowProduct:
            "Conhecer produto",

        discoverNotes:
            "Descubra cada nota.",

        notesText:
            "Clique nas notas para conhecer um pouco mais da fragrância.",

        topNotes:
            "Notas de saída",

        heartNotes:
            "Notas de corpo",

        baseNotes:
            "Notas de fundo",

        exploreDifferent:
            "Explore o Dream de outro jeito.",

        timeline:
            "Timeline da fragrância",

        howFeel:
            "Como você quer se sentir?",

        dreamUniverse:
            "Entre no universo Dream.",

        yourDream:
            "Qual é o seu Dream?",

        quizDescription:
            "Responda quatro perguntas e descubra qual atmosfera mais combina com você."
    },


    "en-US": {

        loader:
            "preparing your experience",

        home:
            "Home",

        product:
            "Product",

        notes:
            "Notes",

        experience:
            "Experience",

        gallery:
            "Gallery",

        quiz:
            "Quiz",

        discover:
            "Discover",

        heroText:
            "A delicate, romantic and captivating fragrance created to turn small moments into special memories.",

        discoverDream:
            "Discover Dream",

        viewProduct:
            "View product",

        floral:
            "Floral",

        woody:
            "Woody",

        spray:
            "Spray",

        sprays:
            "SPRAYS",

        touch:
            "A touch of",

        love:
            "love",

        routine:
            "in your routine.",

        productText:
            "Dream Amor no Ar combines delicacy, romance and personality in a comfortable fragrance for different moments.",

        delicateFloral:
            "Delicate floral",

        delicateFloralText:
            "A light, elegant and romantic signature.",

        comfortable:
            "Comfortable feeling",

        comfortableText:
            "Made for light everyday wear.",

        routineDream:
            "A Dream to accompany your routine.",

        details:
            "View details",

        favorite:
            "♡ Favorite",

        detailsLove:
            "Love is in the details.",

        campaignText:
            "A romantic, sophisticated atmosphere full of personality.",

        knowProduct:
            "Discover product",

        discoverNotes:
            "Discover every note.",

        notesText:
            "Click the notes to learn more about the fragrance.",

        topNotes:
            "Top notes",

        heartNotes:
            "Heart notes",

        baseNotes:
            "Base notes",

        exploreDifferent:
            "Explore Dream in another way.",

        timeline:
            "Fragrance timeline",

        howFeel:
            "How do you want to feel?",

        dreamUniverse:
            "Enter the Dream universe.",

        yourDream:
            "What is your Dream?",

        quizDescription:
            "Answer four questions and discover which atmosphere suits you best."
    }
};

let currentLanguage =
    storage.get(
        "dream_language",
        "pt-BR"
    );

if (!translations[currentLanguage]) {
    currentLanguage = "pt-BR";
}

function applyLanguage(language) {

    if (!translations[language]) return;

    currentLanguage = language;

    storage.set(
        "dream_language",
        language
    );

    document.documentElement.lang =
        language;

    $$("[data-i18n]").forEach(element => {

        const key =
            element.dataset.i18n;

        const value =
            translations[language][key];

        if (value !== undefined) {
            element.textContent = value;
        }
    });

    $$("[data-lang]").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.lang === language
        );
    });

    updateGalleryAutoplayButton();
}

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-lang]"
            );

        if (!button) return;

        applyLanguage(
            button.dataset.lang
        );
    }
);

applyLanguage(currentLanguage);


/* =========================================================
   PRODUTO MODAL
========================================================= */

const productModal =
    $("#productModal");

function openProductModal() {

    if (!productModal) return;

    productModal.classList.add("open");

    productModal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add(
        "modal-open"
    );
}

function closeProductModal() {

    if (!productModal) return;

    productModal.classList.remove("open");

    productModal.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove(
        "modal-open"
    );
}

document.addEventListener(
    "click",
    event => {

        if (
            event.target.closest(
                ".open-product"
            )
        ) {
            openProductModal();
            return;
        }

        if (
            event.target.closest(
                ".close-product"
            )
        ) {
            closeProductModal();
        }
    }
);


/* =========================================================
   FAVORITOS
========================================================= */

let favorite =
    storage.get(
        "dream_favorite",
        "false"
    ) === "true";

const favoriteButtons = [
    $("#favoriteButton"),
    $("#favoriteModal")
].filter(Boolean);

function updateFavoriteButtons() {

    favoriteButtons.forEach(button => {

        button.textContent =
            favorite
                ? "♥ Favoritado"
                : "♡ Favoritar";

        button.classList.toggle(
            "active",
            favorite
        );
    });
}

function toggleFavorite() {

    favorite = !favorite;

    storage.set(
        "dream_favorite",
        String(favorite)
    );

    updateFavoriteButtons();

    showToast(
        favorite
            ? "Dream adicionado aos favoritos ♡"
            : "Dream removido dos favoritos"
    );
}

favoriteButtons.forEach(button => {

    button.addEventListener(
        "click",
        toggleFavorite
    );

});

updateFavoriteButtons();


/* =========================================================
   COMPARTILHAMENTO
========================================================= */

async function shareDream() {

    const shareData = {
        title:
            "Dream Amor no Ar",
        text:
            "Conheça Dream Amor no Ar ♡",
        url:
            window.location.href
    };

    try {

        if (navigator.share) {

            await navigator.share(
                shareData
            );

            return;
        }

        if (
            navigator.clipboard &&
            window.isSecureContext
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
            "Copie o endereço do navegador para compartilhar."
        );

    } catch (error) {

        if (
            error?.name !==
            "AbortError"
        ) {
            showToast(
                "Não foi possível compartilhar."
            );
        }
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
   NOTAS
========================================================= */

const noteModal =
    $("#noteModal");

const noteModalIcon =
    $("#noteModalIcon");

const noteModalTitle =
    $("#noteModalTitle");

const noteModalText =
    $("#noteModalText");

const noteInformation = {

    bergamota: {
        icon: "🍊",
        title: "Bergamota",
        text:
            "Uma abertura cítrica, luminosa e fresca."
    },

    laranja: {
        icon: "🍊",
        title: "Laranja",
        text:
            "Traz brilho, leveza e uma sensação alegre."
    },

    mandarina: {
        icon: "🍊",
        title: "Mandarina",
        text:
            "Uma faceta cítrica doce e vibrante."
    },

    limao: {
        icon: "🍋",
        title: "Limão",
        text:
            "Acrescenta frescor e energia à abertura."
    },

    cassis: {
        icon: "🫐",
        title: "Cassis",
        text:
            "Uma nuance frutada intensa e levemente adocicada."
    },

    maca: {
        icon: "🍎",
        title: "Maçã",
        text:
            "Traz um toque frutado fresco e confortável."
    },

    rosa: {
        icon: "🌹",
        title: "Rosa",
        text:
            "O lado romântico e floral da fragrância."
    },

    tilia: {
        icon: "🌼",
        title: "Tília",
        text:
            "Uma nota floral delicada, suave e confortável."
    },

    freesia: {
        icon: "🌸",
        title: "Frésia",
        text:
            "Floral transparente, leve e elegante."
    },

    lotus: {
        icon: "🪷",
        title: "Flor de Lótus",
        text:
            "Uma sensação floral aquosa e delicada."
    },

    gardenia: {
        icon: "🌼",
        title: "Gardênia",
        text:
            "Floral cremoso que adiciona sofisticação."
    },

    pessego: {
        icon: "🍑",
        title: "Pêssego",
        text:
            "Uma nuance frutada macia e aveludada."
    },

    ambar: {
        icon: "✨",
        title: "Âmbar",
        text:
            "Traz calor, profundidade e envolvimento."
    },

    sandalo: {
        icon: "🪵",
        title: "Sândalo",
        text:
            "Madeira cremosa que deixa o fundo confortável."
    },

    baunilha: {
        icon: "🤍",
        title: "Baunilha",
        text:
            "Uma doçura macia e acolhedora."
    },

    tonka: {
        icon: "🌰",
        title: "Tonka",
        text:
            "Adiciona uma sensação quente e levemente adocicada."
    },

    musk: {
        icon: "☁",
        title: "Musk",
        text:
            "Um acabamento limpo, macio e confortável."
    }
};

function openNoteModal(note) {

    const data =
        noteInformation[note];

    if (
        !data ||
        !noteModal
    ) return;

    if (noteModalIcon) {
        noteModalIcon.textContent =
            data.icon;
    }

    if (noteModalTitle) {
        noteModalTitle.textContent =
            data.title;
    }

    if (noteModalText) {
        noteModalText.textContent =
            data.text;
    }

    noteModal.classList.add(
        "open"
    );

    noteModal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add(
        "modal-open"
    );
}

function closeNoteModal() {

    if (!noteModal) return;

    noteModal.classList.remove(
        "open"
    );

    noteModal.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove(
        "modal-open"
    );
}

document.addEventListener(
    "click",
    event => {

        const noteButton =
            event.target.closest(
                "[data-note]"
            );

        if (noteButton) {

            openNoteModal(
                noteButton.dataset.note
            );

            return;
        }

        if (
            event.target.closest(
                ".close-note"
            )
        ) {
            closeNoteModal();
        }
    }
);


/* =========================================================
   BORRIFADOR
========================================================= */

const sprayButton =
    $("#sprayButton");

const sprayCounter =
    $("#sprayCounter");

const sprayArea =
    $("#sprayArea");

const sprayWave =
    $("#sprayWave");

const mainBottle =
    $("#mainBottle");

let sprayCount =
    Number(
        storage.get(
            "dream_sprays",
            "0"
        )
    ) || 0;

let sprayIntensity =
    Number(
        storage.get(
            "dream_spray_intensity",
            "100"
        )
    );

let spraySoundEnabled =
    storage.get(
        "dream_spray_sound",
        "true"
    ) !== "false";

let hapticEnabled =
    storage.get(
        "dream_haptic",
        "true"
    ) !== "false";

let sprayAudio = null;

try {

    sprayAudio =
        new Audio(
            "./audio/spray.mp3"
        );

    sprayAudio.preload =
        "auto";

} catch {}


function updateSprayCounter() {

    if (sprayCounter) {
        sprayCounter.textContent =
            String(sprayCount);
    }
}

function createSprayMist() {

    if (!sprayArea) return;

    const amount =
        Math.round(
            18 *
            clamp(
                sprayIntensity,
                40,
                160
            ) /
            100
        );

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const mist =
            document.createElement(
                "span"
            );

        mist.className =
            "spray-mist";

        mist.style.setProperty(
            "--mist-size",
            `${random(3, 9)}px`
        );

        mist.style.setProperty(
            "--mist-x",
            `${random(-180, 180)}px`
        );

        mist.style.setProperty(
            "--mist-y",
            `${random(-210, 70)}px`
        );

        mist.style.setProperty(
            "--mist-duration",
            `${random(0.7, 1.5)}s`
        );

        sprayArea.appendChild(
            mist
        );

        setTimeout(
            () => mist.remove(),
            1700
        );
    }
}

function spray() {

    sprayCount++;

    storage.set(
        "dream_sprays",
        String(sprayCount)
    );

    updateSprayCounter();

    createSprayMist();

    if (mainBottle) {

        mainBottle.classList.remove(
            "spraying"
        );

        void mainBottle.offsetWidth;

        mainBottle.classList.add(
            "spraying"
        );
    }

    if (sprayWave) {

        sprayWave.classList.remove(
            "active"
        );

        void sprayWave.offsetWidth;

        sprayWave.classList.add(
            "active"
        );
    }

    if (
        spraySoundEnabled &&
        sprayAudio
    ) {

        try {

            sprayAudio.currentTime = 0;

            sprayAudio.play()
                .catch(() => {});

        } catch {}
    }

    if (
        hapticEnabled &&
        navigator.vibrate
    ) {
        navigator.vibrate(30);
    }

    if (sprayCount === 1) {

        showToast(
            "Seu primeiro Dream no ar ♡"
        );

    } else if (
        sprayCount % 10 === 0
    ) {

        showToast(
            `${sprayCount} borrifadas Dream ✦`
        );
    }
}

sprayButton?.addEventListener(
    "click",
    spray
);

updateSprayCounter();


/* =========================================================
   MOVIMENTO 3D
========================================================= */

const heroProduct =
    $("#heroProduct");

let motion3dEnabled =
    storage.get(
        "dream_motion3d",
        "true"
    ) !== "false";

let motion3dIntensity =
    Number(
        storage.get(
            "dream_motion3d_intensity",
            "100"
        )
    );

heroProduct?.addEventListener(
    "pointermove",
    event => {

        if (
            !motion3dEnabled ||
            !mainBottle
        ) return;

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

        const intensity =
            12 *
            clamp(
                motion3dIntensity,
                0,
                150
            ) /
            100;

        const rotateY =
            (x - 0.5) *
            intensity;

        const rotateX =
            (0.5 - y) *
            intensity;

        mainBottle.style.transform =
            `rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;
    }
);

heroProduct?.addEventListener(
    "pointerleave",
    () => {

        if (!mainBottle) return;

        mainBottle.style.transform = "";
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

const timelineData = [

    {
        hour: "0h",
        icon: "🍊",
        title: "Abertura fresca",
        text:
            "Cítricos e frutas aparecem primeiro."
    },

    {
        hour: "1h",
        icon: "🍎",
        title: "Frutado delicado",
        text:
            "A abertura ganha uma sensação macia e alegre."
    },

    {
        hour: "2h",
        icon: "🌸",
        title: "Coração floral",
        text:
            "As flores começam a assumir o centro da fragrância."
    },

    {
        hour: "3h",
        icon: "🌹",
        title: "Romantismo",
        text:
            "Rosa e flores delicadas criam uma atmosfera romântica."
    },

    {
        hour: "4h",
        icon: "🪷",
        title: "Floral confortável",
        text:
            "O coração fica mais suave, elegante e confortável."
    },

    {
        hour: "5h",
        icon: "✨",
        title: "Calor",
        text:
            "O âmbar começa a trazer profundidade."
    },

    {
        hour: "6h",
        icon: "🪵",
        title: "Fundo amadeirado",
        text:
            "O sândalo aparece com uma sensação cremosa."
    },

    {
        hour: "7h",
        icon: "🤍",
        title: "Doçura suave",
        text:
            "Baunilha e tonka deixam o fundo macio."
    },

    {
        hour: "8h",
        icon: "☁",
        title: "Dream na pele",
        text:
            "Musk, madeiras e notas quentes permanecem suavemente."
    }
];

function updateTimeline() {

    if (!timelineSlider) return;

    const index =
        clamp(
            Number(
                timelineSlider.value
            ),
            0,
            timelineData.length - 1
        );

    const data =
        timelineData[index];

    if (timelineHour) {
        timelineHour.textContent =
            data.hour;
    }

    if (timelineIcon) {
        timelineIcon.textContent =
            data.icon;
    }

    if (timelineTitle) {
        timelineTitle.textContent =
            data.title;
    }

    if (timelineText) {
        timelineText.textContent =
            data.text;
    }
}

timelineSlider?.addEventListener(
    "input",
    updateTimeline
);

updateTimeline();


/* =========================================================
   MOOD
========================================================= */

const moodData = {

    romantico: {
        title:
            "Um momento romântico ♡",
        text:
            "Delicadeza, carinho e uma atmosfera feita para guardar na memória."
    },

    sonhador: {
        title:
            "Deixe a imaginação ir longe ☾",
        text:
            "Um Dream leve para acompanhar pensamentos, planos e pequenos sonhos."
    },

    noturno: {
        title:
            "Dream depois do pôr do sol ✦",
        text:
            "Uma atmosfera mais envolvente para momentos especiais à noite."
    },

    energia: {
        title:
            "Seu momento de energia ⚡",
        text:
            "Comece com brilho, movimento e uma sensação positiva."
    },

    calmo: {
        title:
            "Um instante só seu ☁",
        text:
            "Respire, desacelere e aproveite uma sensação confortável."
    }
};

let selectedMood =
    storage.get(
        "dream_mood",
        ""
    );

function applyMood(mood) {

    if (!moodData[mood]) return;

    selectedMood = mood;

    storage.set(
        "dream_mood",
        mood
    );

    $$("[data-mood]").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.mood === mood
        );
    });

    const title =
        $("#dreamMomentTitle");

    const text =
        $("#dreamMomentText");

    if (title) {
        title.textContent =
            moodData[mood].title;
    }

    if (text) {
        text.textContent =
            moodData[mood].text;
    }
}

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-mood]"
            );

        if (!button) return;

        applyMood(
            button.dataset.mood
        );

        $("#sensacao")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
    }
);

if (
    selectedMood &&
    moodData[selectedMood]
) {
    applyMood(selectedMood);
}


/* =========================================================
   DREAM MOMENT
========================================================= */

const dreamMoments = [

    {
        title:
            "Seu momento começa aqui ♡",
        text:
            "Alguns segundos podem virar uma lembrança especial."
    },

    {
        title:
            "Leve o Dream com você ✦",
        text:
            "Um detalhe delicado pode mudar completamente a atmosfera."
    },

    {
        title:
            "Romance também mora no cotidiano.",
        text:
            "Não precisa existir uma ocasião especial para criar um momento especial."
    },

    {
        title:
            "Faça o momento ficar na memória ☾",
        text:
            "Fragrâncias também podem guardar histórias."
    },

    {
        title:
            "Amor no Ar.",
        text:
            "Leve, confortável e com aquele toque que faz você querer sentir de novo."
    }
];

$("#newDreamMoment")
    ?.addEventListener(
        "click",
        () => {

            const moment =
                dreamMoments[
                    Math.floor(
                        Math.random() *
                        dreamMoments.length
                    )
                ];

            const title =
                $("#dreamMomentTitle");

            const text =
                $("#dreamMomentText");

            if (title) {
                title.textContent =
                    moment.title;
            }

            if (text) {
                text.textContent =
                    moment.text;
            }
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

let galleryIndex = 0;

let galleryAutoplayEnabled = false;

let galleryAutoplayTimer = null;


function updateGalleryAutoplayButton() {

    if (!galleryAutoplay) return;

    const isEnglish =
        currentLanguage === "en-US";

    if (galleryAutoplayEnabled) {

        galleryAutoplay.textContent =
            isEnglish
                ? "❚❚ Pause"
                : "❚❚ Pausar";

    } else {

        galleryAutoplay.textContent =
            "▶ Autoplay";
    }
}


function buildGalleryDots() {

    if (!galleryDots) return;

    galleryDots.innerHTML = "";

    galleryItems.forEach(
        (_, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "gallery-dot";

            button.setAttribute(
                "aria-label",
                `Imagem ${index + 1}`
            );

            button.addEventListener(
                "click",
                () => {
                    goToGallery(index);
                }
            );

            galleryDots.appendChild(
                button
            );
        }
    );
}


function updateGalleryUI() {

    if (galleryCurrent) {

        galleryCurrent.textContent =
            String(
                galleryIndex + 1
            ).padStart(2, "0");
    }

    if (galleryTotal) {

        galleryTotal.textContent =
            String(
                galleryItems.length
            ).padStart(2, "0");
    }

    $$(".gallery-dot").forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === galleryIndex
            );
        }
    );
}


function goToGallery(index) {

    if (
        !galleryTrack ||
        !galleryItems.length
    ) return;

    galleryIndex =
        (
            index +
            galleryItems.length
        ) %
        galleryItems.length;

    galleryItems[
        galleryIndex
    ].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
    });

    updateGalleryUI();
}


galleryPrev?.addEventListener(
    "click",
    () => {

        goToGallery(
            galleryIndex - 1
        );
    }
);


galleryNext?.addEventListener(
    "click",
    () => {

        goToGallery(
            galleryIndex + 1
        );
    }
);


function stopGalleryAutoplay() {

    galleryAutoplayEnabled =
        false;

    clearInterval(
        galleryAutoplayTimer
    );

    galleryAutoplayTimer =
        null;

    updateGalleryAutoplayButton();
}


function startGalleryAutoplay() {

    galleryAutoplayEnabled =
        true;

    clearInterval(
        galleryAutoplayTimer
    );

    galleryAutoplayTimer =
        setInterval(
            () => {

                goToGallery(
                    galleryIndex + 1
                );

            },
            4000
        );

    updateGalleryAutoplayButton();
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


galleryTrack?.addEventListener(
    "scroll",
    () => {

        if (!galleryItems.length) {
            return;
        }

        let closestIndex = 0;
        let closestDistance =
            Infinity;

        galleryItems.forEach(
            (item, index) => {

                const distance =
                    Math.abs(
                        item.offsetLeft -
                        galleryTrack.scrollLeft
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
    { passive: true }
);


buildGalleryDots();
updateGalleryUI();
updateGalleryAutoplayButton();


/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox =
    $("#lightbox");

const lightboxImage =
    $("#lightboxImage");

const lightboxTitle =
    $("#lightboxTitle");

const lightboxCounter =
    $("#lightboxCounter");

let lightboxIndex = 0;


function updateLightbox() {

    const item =
        galleryItems[
            lightboxIndex
        ];

    if (!item) return;

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
            image.alt;
    }

    if (lightboxTitle) {

        lightboxTitle.textContent =
            title?.textContent ||
            "Dream";
    }

    if (lightboxCounter) {

        lightboxCounter.textContent =
            `${String(
                lightboxIndex + 1
            ).padStart(2, "0")}
             /
             ${String(
                galleryItems.length
            ).padStart(2, "0")}`;
    }
}


function openLightbox(index) {

    if (!lightbox) return;

    lightboxIndex = index;

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


function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove(
        "open"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove(
        "modal-open"
    );
}


galleryItems.forEach(
    (item, index) => {

        item.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        "button"
                    )
                ) return;

                openLightbox(index);
            }
        );
    }
);


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


$("#lightboxPrev")
    ?.addEventListener(
        "click",
        () => {

            lightboxIndex =
                (
                    lightboxIndex -
                    1 +
                    galleryItems.length
                ) %
                galleryItems.length;

            updateLightbox();
        }
    );


$("#lightboxNext")
    ?.addEventListener(
        "click",
        () => {

            lightboxIndex =
                (
                    lightboxIndex +
                    1
                ) %
                galleryItems.length;

            updateLightbox();
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


const quizData = [

    {
        question:
            "Qual momento combina mais com você?",

        options: [

            {
                text:
                    "Um encontro especial ♡",
                value:
                    "romantico"
            },

            {
                text:
                    "Uma noite tranquila ☾",
                value:
                    "calmo"
            },

            {
                text:
                    "Sair e aproveitar ✦",
                value:
                    "noturno"
            },

            {
                text:
                    "Criar e imaginar ☁",
                value:
                    "sonhador"
            }
        ]
    },


    {
        question:
            "Escolha uma atmosfera.",

        options: [

            {
                text:
                    "Romântica",
                value:
                    "romantico"
            },

            {
                text:
                    "Aconchegante",
                value:
                    "calmo"
            },

            {
                text:
                    "Marcante",
                value:
                    "noturno"
            },

            {
                text:
                    "Inspiradora",
                value:
                    "sonhador"
            }
        ]
    },


    {
        question:
            "Qual detalhe chama mais sua atenção?",

        options: [

            {
                text:
                    "Flores 🌸",
                value:
                    "romantico"
            },

            {
                text:
                    "Nuvens ☁",
                value:
                    "calmo"
            },

            {
                text:
                    "Luzes ✦",
                value:
                    "noturno"
            },

            {
                text:
                    "Lua ☾",
                value:
                    "sonhador"
            }
        ]
    },


    {
        question:
            "Como você quer que seu Dream seja lembrado?",

        options: [

            {
                text:
                    "Apaixonante",
                value:
                    "romantico"
            },

            {
                text:
                    "Confortável",
                value:
                    "calmo"
            },

            {
                text:
                    "Envolvente",
                value:
                    "noturno"
            },

            {
                text:
                    "Inesquecível",
                value:
                    "sonhador"
            }
        ]
    }
];


const quizResults = {

    romantico: {
        icon: "♡",
        title:
            "Dream Lover",
        text:
            "Seu Dream é romântico, delicado e cheio de pequenos detalhes especiais."
    },

    calmo: {
        icon: "☁",
        title:
            "Dream Soft",
        text:
            "Seu Dream combina conforto, tranquilidade e momentos leves."
    },

    noturno: {
        icon: "✦",
        title:
            "Dream Night",
        text:
            "Seu Dream é envolvente, marcante e perfeito para criar memórias."
    },

    sonhador: {
        icon: "☾",
        title:
            "Dreamer",
        text:
            "Seu Dream vive entre imaginação, criatividade e novos horizontes."
    }
};


let quizIndex = 0;

let quizAnswers = [];

let lastQuizResult = null;


function renderQuizQuestion() {

    const data =
        quizData[quizIndex];

    if (!data) return;

    if (quizStep) {

        quizStep.textContent =
            `${quizIndex + 1} / ${quizData.length}`;
    }

    if (quizProgressBar) {

        quizProgressBar.style.width =
            `${
                (
                    (quizIndex + 1) /
                    quizData.length
                ) *
                100
            }%`;
    }

    if (quizQuestion) {

        quizQuestion.textContent =
            data.question;
    }

    if (!quizOptions) return;

    quizOptions.innerHTML = "";

    data.options.forEach(option => {

        const button =
            document.createElement(
                "button"
            );

        button.type =
            "button";

        button.className =
            "quiz-option";

        button.textContent =
            option.text;

        button.addEventListener(
            "click",
            () => {

                quizAnswers.push(
                    option.value
                );

                quizIndex++;

                if (
                    quizIndex <
                    quizData.length
                ) {

                    renderQuizQuestion();

                } else {

                    finishQuiz();
                }
            }
        );

        quizOptions.appendChild(
            button
        );
    });
}


function beginQuiz() {

    quizIndex = 0;
    quizAnswers = [];

    if (quizStart) {
        quizStart.hidden = true;
    }

    if (quizResult) {
        quizResult.hidden = true;
    }

    if (quizQuestions) {
        quizQuestions.hidden = false;
    }

    renderQuizQuestion();
}


function calculateQuizResult() {

    const scores = {};

    quizAnswers.forEach(answer => {

        scores[answer] =
            (scores[answer] || 0) + 1;
    });

    let winner =
        "romantico";

    let bestScore = -1;

    Object.entries(scores)
        .forEach(
            ([key, value]) => {

                if (
                    value >
                    bestScore
                ) {

                    winner = key;
                    bestScore = value;
                }
            }
        );

    return winner;
}


function finishQuiz() {

    const winner =
        calculateQuizResult();

    lastQuizResult =
        winner;

    const result =
        quizResults[winner];

    if (quizQuestions) {
        quizQuestions.hidden = true;
    }

    if (quizResult) {
        quizResult.hidden = false;
    }

    if (quizResultIcon) {
        quizResultIcon.textContent =
            result.icon;
    }

    if (quizResultTitle) {
        quizResultTitle.textContent =
            result.title;
    }

    if (quizResultText) {
        quizResultText.textContent =
            result.text;
    }
}


startQuiz?.addEventListener(
    "click",
    beginQuiz
);


$("#restartQuiz")
    ?.addEventListener(
        "click",
        beginQuiz
    );


$("#applyQuizMood")
    ?.addEventListener(
        "click",
        () => {

            if (!lastQuizResult) {
                return;
            }

            applyMood(
                lastQuizResult
            );

            $("#sensacao")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
        }
    );


$("#shareQuizResult")
    ?.addEventListener(
        "click",
        async () => {

            if (!lastQuizResult) {
                return;
            }

            const result =
                quizResults[
                    lastQuizResult
                ];

            const text =
                `Meu resultado no Dream Quiz foi ${result.title} ♡`;

            try {

                if (navigator.share) {

                    await navigator.share({
                        title:
                            "Dream Quiz",
                        text,
                        url:
                            window.location.href
                    });

                } else if (
                    navigator.clipboard &&
                    window.isSecureContext
                ) {

                    await navigator.clipboard.writeText(
                        `${text} ${window.location.href}`
                    );

                    showToast(
                        "Resultado copiado ♡"
                    );
                }

            } catch {}
        }
    );


/* =========================================================
   MÚSICA
========================================================= */

const dreamMusic =
    $("#dreamMusic");

const dreamMusicButton =
    $("#dreamMusicButton");

const musicMuteButton =
    $("#musicMuteButton");

const musicProgress =
    $("#musicProgress");

const musicCurrentTime =
    $("#musicCurrentTime");

const musicDuration =
    $("#musicDuration");

const musicToggle =
    $("#musicToggle");

const musicVolumeRange =
    $("#musicVolumeRange");

const musicVolumeValue =
    $("#musicVolumeValue");


let musicVolume =
    Number(
        storage.get(
            "dream_music_volume",
            "35"
        )
    );


function formatTime(seconds) {

    if (
        !Number.isFinite(seconds)
    ) {
        return "0:00";
    }

    const minutes =
        Math.floor(
            seconds / 60
        );

    const remaining =
        Math.floor(
            seconds % 60
        );

    return (
        `${minutes}:` +
        String(remaining)
            .padStart(2, "0")
    );
}


function applyMusicVolume() {

    musicVolume =
        clamp(
            Number(musicVolume),
            0,
            100
        );

    if (dreamMusic) {

        dreamMusic.volume =
            musicVolume / 100;
    }

    if (musicVolumeRange) {

        musicVolumeRange.value =
            String(musicVolume);
    }

    if (musicVolumeValue) {

        musicVolumeValue.textContent =
            `${musicVolume}%`;
    }
}


function updateMusicButton() {

    if (!dreamMusicButton) return;

    dreamMusicButton.textContent =
        dreamMusic &&
        !dreamMusic.paused
            ? "❚❚"
            : "▶";

    if (musicToggle) {

        musicToggle.checked =
            Boolean(
                dreamMusic &&
                !dreamMusic.paused
            );
    }
}


async function playMusic() {

    if (!dreamMusic) return;

    try {

        await dreamMusic.play();

        updateMusicButton();

    } catch {

        showToast(
            "Clique novamente para iniciar a música."
        );
    }
}


function pauseMusic() {

    if (!dreamMusic) return;

    dreamMusic.pause();

    updateMusicButton();
}


dreamMusicButton
    ?.addEventListener(
        "click",
        () => {

            if (!dreamMusic) return;

            if (dreamMusic.paused) {
                playMusic();
            } else {
                pauseMusic();
            }
        }
    );


musicToggle?.addEventListener(
    "change",
    event => {

        if (event.target.checked) {
            playMusic();
        } else {
            pauseMusic();
        }
    }
);


dreamMusic?.addEventListener(
    "play",
    updateMusicButton
);


dreamMusic?.addEventListener(
    "pause",
    updateMusicButton
);


dreamMusic?.addEventListener(
    "loadedmetadata",
    () => {

        if (musicDuration) {

            musicDuration.textContent =
                formatTime(
                    dreamMusic.duration
                );
        }
    }
);


dreamMusic?.addEventListener(
    "timeupdate",
    () => {

        if (!dreamMusic) return;

        if (musicCurrentTime) {

            musicCurrentTime.textContent =
                formatTime(
                    dreamMusic.currentTime
                );
        }

        if (
            musicProgress &&
            Number.isFinite(
                dreamMusic.duration
            ) &&
            dreamMusic.duration > 0
        ) {

            musicProgress.value =
                String(
                    (
                        dreamMusic.currentTime /
                        dreamMusic.duration
                    ) *
                    100
                );
        }
    }
);


musicProgress?.addEventListener(
    "input",
    event => {

        if (
            !dreamMusic ||
            !Number.isFinite(
                dreamMusic.duration
            )
        ) return;

        dreamMusic.currentTime =
            (
                Number(
                    event.target.value
                ) /
                100
            ) *
            dreamMusic.duration;
    }
);


musicMuteButton
    ?.addEventListener(
        "click",
        () => {

            if (!dreamMusic) return;

            dreamMusic.muted =
                !dreamMusic.muted;

            musicMuteButton.textContent =
                dreamMusic.muted
                    ? "🔇"
                    : "🔊";
        }
    );


musicVolumeRange
    ?.addEventListener(
        "input",
        event => {

            musicVolume =
                Number(
                    event.target.value
                );

            storage.set(
                "dream_music_volume",
                String(musicVolume)
            );

            applyMusicVolume();
        }
    );


applyMusicVolume();
updateMusicButton();


/* =========================================================
   FULLSCREEN
========================================================= */

$("#fullscreenButton")
    ?.addEventListener(
        "click",
        async () => {

            try {

                if (
                    !document.fullscreenElement
                ) {

                    await document.documentElement
                        .requestFullscreen();

                } else {

                    await document
                        .exitFullscreen();
                }

            } catch {

                showToast(
                    "Tela cheia não disponível."
                );
            }
        }
    );


/* =========================================================
   DREAM STUDIO
========================================================= */

const settingsButton =
    $("#settingsButton");

const settingsPanel =
    $("#settingsPanel");

const closeSettings =
    $("#closeSettings");


function openSettings() {

    if (!settingsPanel) return;

    settingsPanel.classList.add(
        "open"
    );

    settingsPanel.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeSettingsPanel() {

    if (!settingsPanel) return;

    settingsPanel.classList.remove(
        "open"
    );

    settingsPanel.setAttribute(
        "aria-hidden",
        "true"
    );
}


settingsButton?.addEventListener(
    "click",
    () => {

        if (
            settingsPanel
                ?.classList
                .contains("open")
        ) {

            closeSettingsPanel();

        } else {

            openSettings();
        }
    }
);


closeSettings?.addEventListener(
    "click",
    closeSettingsPanel
);


/* =========================================================
   SETTINGS — DARK
========================================================= */

$("#darkToggle")
    ?.addEventListener(
        "change",
        event => {

            darkMode =
                event.target.checked;

            storage.set(
                "dream_dark",
                String(darkMode)
            );

            applyTheme();
        }
    );


/* =========================================================
   SETTINGS — PARTICLES
========================================================= */

$("#particlesToggle")
    ?.addEventListener(
        "change",
        event => {

            particlesEnabled =
                event.target.checked;

            storage.set(
                "dream_particles",
                String(
                    particlesEnabled
                )
            );

            applyParticleState();
        }
    );


$("#particleIntensityRange")
    ?.addEventListener(
        "input",
        event => {

            particleIntensity =
                Number(
                    event.target.value
                );

            storage.set(
                "dream_particle_intensity",
                String(
                    particleIntensity
                )
            );

            createParticles();
        }
    );


/* =========================================================
   SETTINGS — CURSOR
========================================================= */

$("#cursorToggle")
    ?.addEventListener(
        "change",
        event => {

            cursorEnabled =
                event.target.checked;

            storage.set(
                "dream_cursor",
                String(
                    cursorEnabled
                )
            );

            applyCursorState();
        }
    );


/* =========================================================
   SETTINGS — ANIMAÇÕES
========================================================= */

let animationsEnabled =
    storage.get(
        "dream_animations",
        "true"
    ) !== "false";


function applyAnimationState() {

    body.classList.toggle(
        "no-animations",
        !animationsEnabled
    );

    const toggle =
        $("#animationsToggle");

    if (toggle) {

        toggle.checked =
            animationsEnabled;
    }
}


$("#animationsToggle")
    ?.addEventListener(
        "change",
        event => {

            animationsEnabled =
                event.target.checked;

            storage.set(
                "dream_animations",
                String(
                    animationsEnabled
                )
            );

            applyAnimationState();
        }
    );


applyAnimationState();


/* =========================================================
   SETTINGS — MOVIMENTO 3D
========================================================= */

function applyMotionSettings() {

    const toggle =
        $("#motion3dToggle");

    const range =
        $("#motion3dRange");

    if (toggle) {

        toggle.checked =
            motion3dEnabled;
    }

    if (range) {

        range.value =
            String(
                motion3dIntensity
            );
    }
}


$("#motion3dToggle")
    ?.addEventListener(
        "change",
        event => {

            motion3dEnabled =
                event.target.checked;

            storage.set(
                "dream_motion3d",
                String(
                    motion3dEnabled
                )
            );

            if (
                !motion3dEnabled &&
                mainBottle
            ) {

                mainBottle.style.transform =
                    "";
            }
        }
    );


$("#motion3dRange")
    ?.addEventListener(
        "input",
        event => {

            motion3dIntensity =
                Number(
                    event.target.value
                );

            storage.set(
                "dream_motion3d_intensity",
                String(
                    motion3dIntensity
                )
            );
        }
    );


applyMotionSettings();


/* =========================================================
   SETTINGS — HAPTIC
========================================================= */

function applyHapticSettings() {

    const toggle =
        $("#hapticToggle");

    if (toggle) {

        toggle.checked =
            hapticEnabled;
    }
}


$("#hapticToggle")
    ?.addEventListener(
        "change",
        event => {

            hapticEnabled =
                event.target.checked;

            storage.set(
                "dream_haptic",
                String(
                    hapticEnabled
                )
            );
        }
    );


applyHapticSettings();


/* =========================================================
   SETTINGS — SPRAY
========================================================= */

function applySpraySettings() {

    const soundToggle =
        $("#spraySoundToggle");

    const intensityRange =
        $("#sprayIntensityRange");

    if (soundToggle) {

        soundToggle.checked =
            spraySoundEnabled;
    }

    if (intensityRange) {

        intensityRange.value =
            String(
                sprayIntensity
            );
    }
}


$("#spraySoundToggle")
    ?.addEventListener(
        "change",
        event => {

            spraySoundEnabled =
                event.target.checked;

            storage.set(
                "dream_spray_sound",
                String(
                    spraySoundEnabled
                )
            );
        }
    );


$("#sprayIntensityRange")
    ?.addEventListener(
        "input",
        event => {

            sprayIntensity =
                Number(
                    event.target.value
                );

            storage.set(
                "dream_spray_intensity",
                String(
                    sprayIntensity
                )
            );
        }
    );


applySpraySettings();


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
            "#a66cff",
        secondary:
            "#6339d8"
    },

    azul: {
        primary:
            "#6597ff",
        secondary:
            "#705ce8"
    },

    cherry: {
        primary:
            "#ed5d87",
        secondary:
            "#a82e5c"
    },

    menta: {
        primary:
            "#56c9ac",
        secondary:
            "#4d9dd8"
    }
};


let activePalette =
    storage.get(
        "dream_palette",
        "dream"
    );


function hexToRgb(hex) {

    const clean =
        hex.replace("#", "");

    if (
        !/^[0-9a-f]{6}$/i
            .test(clean)
    ) {
        return null;
    }

    return {
        r:
            parseInt(
                clean.slice(0, 2),
                16
            ),

        g:
            parseInt(
                clean.slice(2, 4),
                16
            ),

        b:
            parseInt(
                clean.slice(4, 6),
                16
            )
    };
}


function setColors(
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
        hexToRgb(primary);

    const s =
        hexToRgb(secondary);

    if (p) {

        root.style.setProperty(
            "--primary-rgb",
            `${p.r}, ${p.g}, ${p.b}`
        );
    }

    if (s) {

        root.style.setProperty(
            "--secondary-rgb",
            `${s.r}, ${s.g}, ${s.b}`
        );
    }

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

        storage.set(
            "dream_primary",
            primary
        );

        storage.set(
            "dream_secondary",
            secondary
        );
    }
}


function applyPalette(name) {

    const palette =
        palettes[name];

    if (!palette) return;

    activePalette = name;

    storage.set(
        "dream_palette",
        name
    );

    setColors(
        palette.primary,
        palette.secondary
    );

    $$("[data-palette]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.palette ===
                    name
            );
        });
}


document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-palette]"
            );

        if (!button) return;

        applyPalette(
            button.dataset.palette
        );
    }
);


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

            setColors(
                event.target.value,
                secondary
            );

            activePalette =
                "custom";

            storage.set(
                "dream_palette",
                "custom"
            );

            $$("[data-palette]")
                .forEach(button => {

                    button.classList.remove(
                        "active"
                    );
                });
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

            setColors(
                primary,
                event.target.value
            );

            activePalette =
                "custom";

            storage.set(
                "dream_palette",
                "custom"
            );

            $$("[data-palette]")
                .forEach(button => {

                    button.classList.remove(
                        "active"
                    );
                });
        }
    );


if (
    activePalette !== "custom" &&
    palettes[activePalette]
) {

    applyPalette(
        activePalette
    );

} else {

    const savedPrimary =
        storage.get(
            "dream_primary",
            "#df76a8"
        );

    const savedSecondary =
        storage.get(
            "dream_secondary",
            "#9562dc"
        );

    setColors(
        savedPrimary,
        savedSecondary,
        false
    );
}


/* =========================================================
   RESET DREAM STUDIO
========================================================= */

$("#resetSettings")
    ?.addEventListener(
        "click",
        () => {

            const keys = [

                "dream_dark",
                "dream_particles",
                "dream_particle_intensity",
                "dream_cursor",
                "dream_animations",
                "dream_motion3d",
                "dream_motion3d_intensity",
                "dream_haptic",
                "dream_spray_sound",
                "dream_spray_intensity",
                "dream_music_volume",
                "dream_palette",
                "dream_primary",
                "dream_secondary",
                "dream_language",
                "dream_mood"
            ];

            keys.forEach(key => {
                storage.remove(key);
            });


            darkMode = false;

            particlesEnabled = true;
            particleIntensity = 100;

            cursorEnabled = true;

            animationsEnabled = true;

            motion3dEnabled = true;
            motion3dIntensity = 100;

            hapticEnabled = true;

            spraySoundEnabled = true;
            sprayIntensity = 100;

            musicVolume = 35;

            selectedMood = "";

            applyTheme();

            applyParticleState();

            applyCursorState();

            applyAnimationState();

            applyMotionSettings();

            applyHapticSettings();

            applySpraySettings();

            applyMusicVolume();

            applyPalette("dream");

            applyLanguage("pt-BR");

            showToast(
                "Dream Studio restaurado ♡"
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
            event.key !== "Escape"
        ) return;

        closeProductModal();

        closeNoteModal();

        closeLightbox();

        closeSettingsPanel();

        closeMobileMenu();
    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            1050
        ) {
            closeMobileMenu();
        }
    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function init() {

    updateScrollUI();

    updateSectionIndicator();

    updateFavoriteButtons();

    updateSprayCounter();

    updateTimeline();

    updateGalleryUI();

    updateGalleryAutoplayButton();

    applyTheme();

    applyParticleState();

    applyCursorState();

    applyAnimationState();

    applyMotionSettings();

    applyHapticSettings();

    applySpraySettings();

    applyMusicVolume();

    applyLanguage(
        currentLanguage
    );

    requestAnimationFrame(
        () => {

            $$(".reveal")
                .forEach(element => {

                    const rect =
                        element
                            .getBoundingClientRect();

                    if (
                        rect.top <
                        window.innerHeight *
                        0.92
                    ) {

                        element
                            .classList
                            .add(
                                "visible"
                            );
                    }
                });
        }
    );
}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init,
        { once: true }
    );

} else {

    init();
}