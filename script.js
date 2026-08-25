"use strict";

document.addEventListener("DOMContentLoaded", () => {

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
        Math.min(max, Math.max(min, Number(value) || 0));


    /* =========================================================
       STORAGE
    ========================================================= */

    const storage = {

        get(key, fallback = null) {

            try {

                const value =
                    localStorage.getItem(key);

                return value === null
                    ? fallback
                    : value;

            } catch {

                return fallback;

            }

        },

        set(key, value) {

            try {

                localStorage.setItem(
                    key,
                    String(value)
                );

            } catch {}

        },

        remove(key) {

            try {

                localStorage.removeItem(key);

            } catch {}

        }

    };


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

    const settingsPanel =
        $("#settingsPanel");

    const productModal =
        $("#productModal");

    const noteModal =
        $("#noteModal");

    const lightbox =
        $("#lightbox");

    const sectionIndicator =
        $("#sectionIndicator");


    /* =========================================================
       TOAST
    ========================================================= */

    let toastTimer = null;

    function showToast(message) {

        if (!toast) {
            return;
        }

        toast.textContent =
            message;

        toast.classList.remove(
            "show"
        );

        void toast.offsetWidth;

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

    window.showToast =
        showToast;


    /* =========================================================
       LOADER
    ========================================================= */

    let loaderClosed =
        false;

    function closeLoader() {

        if (
            !loader ||
            loaderClosed
        ) {

            return;

        }

        loaderClosed =
            true;

        loader.classList.add(
            "hide"
        );

        body.classList.add(
            "site-ready"
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
                300
            );

        }
    );

    setTimeout(
        closeLoader,
        4500
    );


    /* =========================================================
       SCROLL
    ========================================================= */

    function updateScroll() {

        const top =
            window.scrollY ||
            document.documentElement.scrollTop ||
            0;

        const total =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent =
            total > 0
                ? clamp(
                    top / total * 100,
                    0,
                    100
                )
                : 0;

        if (scrollProgress) {

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
                behavior: "smooth"
            });

        }
    );


    /* =========================================================
       MENU MOBILE
    ========================================================= */

    menuMobile?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            const open =
                menu?.classList.toggle(
                    "open"
                );

            menuMobile.setAttribute(
                "aria-expanded",
                String(Boolean(open))
            );

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

                    menuMobile?.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );


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
                menu.contains(event.target) ||
                menuMobile.contains(event.target)
            ) {

                return;

            }

            menu.classList.remove(
                "open"
            );

            menuMobile.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );


    /* =========================================================
       LINKS INTERNOS
    ========================================================= */

    $$('a[href^="#"]').forEach(
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
                        href === "#"
                    ) {

                        return;

                    }

                    let target;

                    try {

                        target =
                            document.querySelector(
                                href
                            );

                    } catch {

                        return;

                    }

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


    /* =========================================================
       REVEAL
    ========================================================= */

    const reveals =
        $$(".reveal");

    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.1
                }
            );

        reveals.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        reveals.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =========================================================
       CURSOR GLOW
    ========================================================= */

    const cursorGlow =
        $("#cursorGlow");

    let cursorX =
        innerWidth / 2;

    let cursorY =
        innerHeight / 2;

    let glowX =
        cursorX;

    let glowY =
        cursorY;

    document.addEventListener(
        "pointermove",
        event => {

            cursorX =
                event.clientX;

            cursorY =
                event.clientY;

        },
        {
            passive: true
        }
    );

    function animateCursor() {

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
            animateCursor
        );

    }

    animateCursor();


    /* =========================================================
       PARTÍCULAS
    ========================================================= */

    const particles =
        $("#particles");

    function generateParticles() {

        if (!particles) {
            return;
        }

        particles.innerHTML =
            "";

        const intensity =
            clamp(
                $("#particleIntensityRange")
                    ?.value || 100,
                0,
                150
            );

        const base =
            innerWidth <= 650
                ? 12
                : 25;

        const amount =
            Math.round(
                base *
                intensity /
                100
            );

        const symbols = [
            "♡",
            "✦",
            "·",
            "✿",
            "✧"
        ];

        for (
            let i = 0;
            i < amount;
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
                `${Math.random() * 100}%`;

            particle.style.fontSize =
                `${
                    8 +
                    Math.random() *
                    15
                }px`;

            particle.style.setProperty(
                "--duration",
                `${
                    9 +
                    Math.random() *
                    12
                }s`
            );

            particle.style.setProperty(
                "--delay",
                `${
                    -Math.random() *
                    16
                }s`
            );

            particles.appendChild(
                particle
            );

        }

    }

    generateParticles();


    /* =========================================================
       IDIOMA
    ========================================================= */

    let currentLanguage =
        storage.get(
            "dreamLanguage",
            "pt-BR"
        );

    if (
        currentLanguage !== "pt-BR" &&
        currentLanguage !== "en-US"
    ) {

        currentLanguage =
            "pt-BR";

    }


    const translations = {

        "pt-BR": {

            "nav.home": "Início",
            "nav.product": "Produto",
            "nav.campaign": "Campanha",
            "nav.notes": "Notas",
            "nav.experience": "Experiência",
            "nav.feel": "Sensação",
            "nav.moments": "Momentos",
            "nav.gallery": "Galeria",
            "nav.mood": "Mood",
            "nav.quiz": "Quiz",
            "nav.discover": "Conhecer",

            "hero.status": "experiência interativa",
            "hero.eyebrow": "O BOTICÁRIO • DREAM",
            "hero.title2": "Amor no Ar",
            "hero.description":
                "Uma fragrância delicada, romântica e envolvente para transformar pequenos momentos em lembranças especiais.",
            "hero.discover": "Descobrir o Dream",
            "hero.viewProduct": "Ver produto",
            "hero.fact1": "Body Splash",
            "hero.fact2Title": "Floral",
            "hero.fact2": "Amadeirado",
            "hero.fact3": "Amor no Ar",
            "hero.tip":
                "Toque em borrifar para ativar o efeito, áudio e animação.",
            "hero.productName": "Amor no Ar",
            "hero.bodySplash": "Body Splash",

            "spray.button": "Borrifar",
            "spray.experience": "experimentar",
            "spray.counter": "BORRIFADAS",

            "product.collection": "DREAM COLLECTION",
            "product.eyebrow": "DREAM AMOR NO AR",
            "product.title1": "Um toque de",
            "product.title2": "amor",
            "product.title3": "na sua rotina.",
            "product.description":
                "Dream Amor no Ar combina delicadeza, romantismo e personalidade em uma fragrância confortável para diferentes momentos.",
            "product.point1Title": "Floral delicado",
            "product.point1Text":
                "Uma assinatura leve, elegante e romântica.",
            "product.point2Title": "Sensação confortável",
            "product.point2Text":
                "Para usar de forma leve durante o dia.",
            "product.point3Title": "Frasco de 350 ml",
            "product.point3Text":
                "Um Dream para acompanhar sua rotina.",
            "product.details": "Ver detalhes",
            "product.favorite": "♡ Favoritar",

            "campaign.mini": "DREAM • AMOR NO AR",
            "campaign.title1": "O amor está",
            "campaign.title2": "nos detalhes.",
            "campaign.description":
                "Uma atmosfera romântica, sofisticada e cheia de personalidade.",
            "campaign.explore": "Explorar universo Dream",
            "campaign.product": "Conhecer produto",

            "notes.eyebrow": "PIRÂMIDE OLFATIVA",
            "notes.title1": "Descubra cada",
            "notes.title2": "nota.",
            "notes.description":
                "Explore as diferentes camadas e descubra como a fragrância evolui.",
            "notes.top": "saída",
            "notes.heart": "corpo",
            "notes.base": "fundo",

            "experience.eyebrow": "SINTA A FRAGRÂNCIA",
            "experience.title1": "Explore o Dream de",
            "experience.title2": "outro jeito.",
            "experience.description":
                "Descubra a evolução da fragrância, compare sensações e personalize a experiência.",
            "experience.evolution": "EVOLUÇÃO",
            "experience.timelineTitle":
                "Timeline da fragrância",
            "experience.timelineIntro":
                "Arraste para acompanhar a evolução ao longo das horas.",
            "experience.profile": "PERFIL",
            "experience.personality": "Personalidade",
            "experience.moment": "MOMENTO",
            "experience.feelQuestion":
                "Como você quer se sentir?",

            "mood.romantic": "Romântico",
            "mood.dreamy": "Sonhador",
            "mood.night": "Noturno",
            "mood.energy": "Energia",
            "mood.calm": "Calmo",

            "gallery.eyebrow": "GALERIA DREAM",
            "gallery.title1": "Entre no universo",
            "gallery.title2": "Dream.",
            "gallery.description":
                "Arraste com o mouse, deslize no celular ou use as setas.",
            "gallery.autoplay": "▶ Autoplay",

            "quiz.title": "Qual é o seu Dream?",
            "quiz.description":
                "Responda quatro perguntas e descubra qual atmosfera combina mais com você.",
            "quiz.start": "Começar quiz",
            "quiz.restart": "Refazer quiz",
            "quiz.applyMood": "Aplicar meu mood",
            "quiz.share": "Compartilhar",

            "final.product": "Ver produto",
            "final.share": "Compartilhar",
            "final.fullscreen": "⛶ Tela cheia",

            "studio.title":
                "Sua experiência, do seu jeito.",
            "studio.description":
                "Personalize visual, áudio e movimento.",
            "studio.language": "Idioma",
            "studio.presets": "Estilos rápidos",
            "studio.appearance": "Aparência",
            "studio.dark": "Modo escuro",
            "studio.clean": "Modo clean",
            "studio.performance": "Modo performance",
            "studio.palettes": "Paletas",
            "studio.customColors":
                "Cores personalizadas",
            "studio.primary": "Principal",
            "studio.secondary": "Secundária",
            "studio.effects": "Efeitos",
            "studio.particles": "Partículas",
            "studio.animations": "Animações",
            "studio.motion": "Movimento 3D",
            "studio.haptic": "Vibração do spray",
            "studio.spraySound": "Som do borrifador",
            "studio.music": "Música",
            "studio.backgroundMusic":
                "Música de fundo",
            "studio.volume": "Volume",
            "studio.movement": "Movimento",
            "studio.speed": "Velocidade",
            "studio.motionIntensity":
                "Intensidade 3D",
            "studio.particleIntensity": "Partículas",
            "studio.sprayIntensity": "Borrifador",
            "studio.reading": "Leitura",
            "studio.contrast": "Contraste",
            "studio.textSize": "Tamanho do texto",
            "studio.reset": "↻ Restaurar padrão"

        },


        "en-US": {

            "nav.home": "Home",
            "nav.product": "Product",
            "nav.campaign": "Campaign",
            "nav.notes": "Notes",
            "nav.experience": "Experience",
            "nav.feel": "Feeling",
            "nav.moments": "Moments",
            "nav.gallery": "Gallery",
            "nav.mood": "Mood",
            "nav.quiz": "Quiz",
            "nav.discover": "Discover",

            "hero.status": "interactive experience",
            "hero.eyebrow": "O BOTICÁRIO • DREAM",
            "hero.title2": "Love in the Air",
            "hero.description":
                "A delicate, romantic and captivating fragrance designed to turn little moments into special memories.",
            "hero.discover": "Discover Dream",
            "hero.viewProduct": "View product",
            "hero.fact1": "Body Splash",
            "hero.fact2Title": "Floral",
            "hero.fact2": "Woody",
            "hero.fact3": "Love in the Air",
            "hero.tip":
                "Press spray to activate the effect, sound and animation.",
            "hero.productName": "Love in the Air",
            "hero.bodySplash": "Body Splash",

            "spray.button": "Spray",
            "spray.experience": "try it",
            "spray.counter": "SPRAYS",

            "product.collection": "DREAM COLLECTION",
            "product.eyebrow": "DREAM LOVE IN THE AIR",
            "product.title1": "A touch of",
            "product.title2": "love",
            "product.title3": "in your routine.",
            "product.description":
                "Dream Love in the Air combines delicacy, romance and personality in a comfortable fragrance for different moments.",
            "product.point1Title": "Delicate floral",
            "product.point1Text":
                "A light, elegant and romantic signature.",
            "product.point2Title": "Comfortable feeling",
            "product.point2Text":
                "Perfect for light everyday wear.",
            "product.point3Title": "350 ml bottle",
            "product.point3Text":
                "A Dream to accompany your routine.",
            "product.details": "View details",
            "product.favorite": "♡ Favorite",

            "campaign.mini": "DREAM • LOVE IN THE AIR",
            "campaign.title1": "Love is",
            "campaign.title2": "in the details.",
            "campaign.description":
                "A romantic, sophisticated atmosphere full of personality.",
            "campaign.explore":
                "Explore the Dream universe",
            "campaign.product": "Discover product",

            "notes.eyebrow": "OLFACTORY PYRAMID",
            "notes.title1": "Discover every",
            "notes.title2": "note.",
            "notes.description":
                "Explore the different layers and discover how the fragrance evolves.",
            "notes.top": "top",
            "notes.heart": "heart",
            "notes.base": "base",

            "experience.eyebrow": "FEEL THE FRAGRANCE",
            "experience.title1": "Explore Dream in",
            "experience.title2": "a new way.",
            "experience.description":
                "Discover how the fragrance evolves, compare sensations and personalize your experience.",
            "experience.evolution": "EVOLUTION",
            "experience.timelineTitle":
                "Fragrance timeline",
            "experience.timelineIntro":
                "Drag to follow the fragrance evolution throughout the hours.",
            "experience.profile": "PROFILE",
            "experience.personality": "Personality",
            "experience.moment": "MOMENT",
            "experience.feelQuestion":
                "How do you want to feel?",

            "mood.romantic": "Romantic",
            "mood.dreamy": "Dreamy",
            "mood.night": "Night",
            "mood.energy": "Energy",
            "mood.calm": "Calm",

            "gallery.eyebrow": "DREAM GALLERY",
            "gallery.title1": "Enter the",
            "gallery.title2": "Dream universe.",
            "gallery.description":
                "Drag with your mouse, swipe on mobile or use the arrows.",
            "gallery.autoplay": "▶ Autoplay",

            "quiz.title": "What is your Dream?",
            "quiz.description":
                "Answer four questions and discover which atmosphere suits you best.",
            "quiz.start": "Start quiz",
            "quiz.restart": "Restart quiz",
            "quiz.applyMood": "Apply my mood",
            "quiz.share": "Share",

            "final.product": "View product",
            "final.share": "Share",
            "final.fullscreen": "⛶ Fullscreen",

            "studio.title":
                "Your experience, your way.",
            "studio.description":
                "Customize visuals, audio and motion.",
            "studio.language": "Language",
            "studio.presets": "Quick styles",
            "studio.appearance": "Appearance",
            "studio.dark": "Dark mode",
            "studio.clean": "Clean mode",
            "studio.performance": "Performance mode",
            "studio.palettes": "Palettes",
            "studio.customColors": "Custom colors",
            "studio.primary": "Primary",
            "studio.secondary": "Secondary",
            "studio.effects": "Effects",
            "studio.particles": "Particles",
            "studio.animations": "Animations",
            "studio.motion": "3D motion",
            "studio.haptic": "Spray vibration",
            "studio.spraySound": "Spray sound",
            "studio.music": "Music",
            "studio.backgroundMusic":
                "Background music",
            "studio.volume": "Volume",
            "studio.movement": "Motion",
            "studio.speed": "Speed",
            "studio.motionIntensity": "3D intensity",
            "studio.particleIntensity": "Particles",
            "studio.sprayIntensity": "Spray",
            "studio.reading": "Reading",
            "studio.contrast": "Contrast",
            "studio.textSize": "Text size",
            "studio.reset": "↻ Reset settings"

        }

    };


    function setLanguage(
        language,
        notify = false
    ) {

        if (
            !translations[language]
        ) {

            language =
                "pt-BR";

        }

        currentLanguage =
            language;

        storage.set(
            "dreamLanguage",
            language
        );

        root.lang =
            language;

        $$("[data-i18n]").forEach(
            element => {

                const key =
                    element.dataset.i18n;

                const value =
                    translations[
                        language
                    ][key];

                if (
                    value !== undefined
                ) {

                    element.textContent =
                        value;

                }

            }
        );

        $$("[data-lang]").forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.lang ===
                    language
                );

            }
        );

        document.title =
            language === "pt-BR"
                ? "Dream Amor no Ar • 350 ml"
                : "Dream Love in the Air • 350 ml";

        if (notify) {

            showToast(
                language === "pt-BR"
                    ? "Português selecionado 🇧🇷"
                    : "English selected 🇺🇸"
            );

        }

        window.dispatchEvent(
            new CustomEvent(
                "dream-language-change",
                {
                    detail: {
                        language
                    }
                }
            )
        );

    }


    $$("[data-lang]").forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    setLanguage(
                        button.dataset.lang,
                        true
                    );

                }
            );

        }
    );


    setLanguage(
        currentLanguage
    );


    /* =========================================================
       CORES
    ========================================================= */

    function hexToRgb(hex) {

        let value =
            String(hex)
                .replace("#", "")
                .trim();

        if (
            value.length === 3
        ) {

            value =
                value
                    .split("")
                    .map(
                        c => c + c
                    )
                    .join("");

        }

        if (
            value.length !== 6
        ) {

            return null;

        }

        const number =
            parseInt(
                value,
                16
            );

        if (
            Number.isNaN(number)
        ) {

            return null;

        }

        return {

            r:
                number >> 16,

            g:
                number >> 8 & 255,

            b:
                number & 255

        };

    }


    function applyColors(
        primary,
        secondary,
        save = true
    ) {

        const p =
            hexToRgb(primary);

        const s =
            hexToRgb(secondary);

        root.style.setProperty(
            "--primary",
            primary
        );

        root.style.setProperty(
            "--secondary",
            secondary
        );

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

        if (save) {

            storage.set(
                "dreamPrimary",
                primary
            );

            storage.set(
                "dreamSecondary",
                secondary
            );

        }

    }


    const palettes = {

        dream:
            ["#df76a8", "#9562dc"],

        roxo:
            ["#a855f7", "#6d28d9"],

        azul:
            ["#38bdf8", "#6366f1"],

        cherry:
            ["#fb7185", "#db2777"],

        gold:
            ["#d6a84b", "#9a6b21"],

        menta:
            ["#45c4aa", "#5285c5"]

    };


    $$(".palette").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const palette =
                        palettes[
                            button.dataset.palette
                        ];

                    if (!palette) {
                        return;
                    }

                    $$(".palette").forEach(
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

    function setDark(
        enabled,
        save = true
    ) {

        body.classList.toggle(
            "dark",
            enabled
        );

        if (
            $("#darkToggle")
        ) {

            $("#darkToggle").checked =
                enabled;

        }

        if (
            $("#themeButton")
        ) {

            $("#themeButton").textContent =
                enabled
                    ? "☀"
                    : "☾";

        }

        if (save) {

            storage.set(
                "dreamDark",
                enabled
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
       MODAL BASE
    ========================================================= */

    function openLayer(element) {

        if (!element) {
            return;
        }

        element.classList.add(
            "open"
        );

        element.setAttribute(
            "aria-hidden",
            "false"
        );

        body.classList.add(
            "modal-open"
        );

    }


    function closeLayer(element) {

        if (!element) {
            return;
        }

        element.classList.remove(
            "open",
            "active",
            "visible"
        );

        element.setAttribute(
            "aria-hidden",
            "true"
        );

        element.style.visibility =
            "";

        element.style.opacity =
            "";

        element.style.pointerEvents =
            "";

        element.style.display =
            "";

        if (
            !document.querySelector(
                ".product-modal.open, .note-modal.open, .lightbox.open"
            )
        ) {

            body.classList.remove(
                "modal-open"
            );

        }

    }


    /* =========================================================
       PRODUTO — CORREÇÃO PRINCIPAL
    ========================================================= */

    function openProductModal() {

        if (!productModal) {

            console.error(
                "Dream: #productModal não encontrado."
            );

            return;

        }

        productModal.classList.add(
            "open"
        );

        productModal.setAttribute(
            "aria-hidden",
            "false"
        );

        /*
           Seu CSS já usa .product-modal.open.
           Estes styles são apenas um failsafe.
        */

        productModal.style.visibility =
            "visible";

        productModal.style.opacity =
            "1";

        productModal.style.pointerEvents =
            "auto";

        body.classList.add(
            "modal-open"
        );

    }


    function closeProductModal() {

        closeLayer(
            productModal
        );

    }


    /*
       CAPTURE = evita outro clique do site bloquear
       Conhecer / Ver produto / Ver detalhes.
    */

    document.addEventListener(
        "click",
        event => {

            const openButton =
                event.target.closest(
                    ".open-product, [data-open-product]"
                );

            if (openButton) {

                event.preventDefault();
                event.stopPropagation();

                openProductModal();

                return;

            }

            const closeButton =
                event.target.closest(
                    ".close-product, [data-close-product]"
                );

            if (
                closeButton &&
                productModal?.contains(
                    closeButton
                )
            ) {

                event.preventDefault();
                event.stopPropagation();

                closeProductModal();

            }

        },
        true
    );


    productModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                productModal
            ) {

                closeProductModal();

            }

        }
    );


    /* =========================================================
       FAVORITO
    ========================================================= */

    const favoriteButtons =
        [
            $("#favoriteButton"),
            $("#favoriteModal")
        ].filter(Boolean);

    let favorite =
        storage.get(
            "dreamFavorite",
            "false"
        ) === "true";


    function updateFavorite() {

        favoriteButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    favorite
                );

                button.textContent =
                    favorite
                        ? (
                            currentLanguage === "pt-BR"
                                ? "♥ Favoritado"
                                : "♥ Favorited"
                        )
                        : (
                            currentLanguage === "pt-BR"
                                ? "♡ Favoritar"
                                : "♡ Favorite"
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

                    storage.set(
                        "dreamFavorite",
                        favorite
                    );

                    updateFavorite();

                }
            );

        }
    );


    /* =========================================================
       DREAM STUDIO
    ========================================================= */

    function openStudio() {

        if (!settingsPanel) {

            console.error(
                "Dream: #settingsPanel não encontrado."
            );

            return;

        }

        settingsPanel.classList.add(
            "open"
        );

        settingsPanel.setAttribute(
            "aria-hidden",
            "false"
        );

        /*
           CSS usa translateX.
           Failsafe garante que apareça.
        */

        settingsPanel.style.transform =
            "translateX(0)";

        settingsPanel.style.visibility =
            "visible";

        settingsPanel.style.pointerEvents =
            "auto";

        body.classList.add(
            "studio-open"
        );

    }


    function closeStudio() {

        if (!settingsPanel) {
            return;
        }

        settingsPanel.classList.remove(
            "open"
        );

        settingsPanel.setAttribute(
            "aria-hidden",
            "true"
        );

        settingsPanel.style.transform =
            "";

        settingsPanel.style.visibility =
            "";

        settingsPanel.style.pointerEvents =
            "";

        body.classList.remove(
            "studio-open"
        );

    }


    $("#settingsButton")?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            if (
                settingsPanel?.classList.contains(
                    "open"
                )
            ) {

                closeStudio();

            } else {

                openStudio();

            }

        },
        true
    );


    $("#closeSettings")?.addEventListener(
        "click",
        event => {

            event.preventDefault();

            closeStudio();

        }
    );


    /* =========================================================
       TOGGLES
    ========================================================= */

    function bindToggle(
        selector,
        storageKey,
        bodyClass,
        inverted = false
    ) {

        const toggle =
            $(selector);

        if (!toggle) {
            return;
        }

        toggle.addEventListener(
            "change",
            event => {

                const enabled =
                    event.target.checked;

                if (bodyClass) {

                    body.classList.toggle(
                        bodyClass,
                        inverted
                            ? !enabled
                            : enabled
                    );

                }

                storage.set(
                    storageKey,
                    enabled
                );

            }
        );

    }


    bindToggle(
        "#particlesToggle",
        "dreamParticles",
        "no-particles",
        true
    );

    bindToggle(
        "#animationsToggle",
        "dreamAnimations",
        "no-animations",
        true
    );

    bindToggle(
        "#cursorToggle",
        "dreamCursor",
        "no-cursor",
        true
    );

    bindToggle(
        "#glassToggle",
        "dreamGlass",
        "no-glass",
        true
    );

    bindToggle(
        "#cleanModeToggle",
        "dreamClean",
        "clean-mode"
    );

    bindToggle(
        "#performanceToggle",
        "dreamPerformance",
        "performance-mode"
    );

    bindToggle(
        "#motion3dToggle",
        "dreamMotion3D"
    );

    bindToggle(
        "#hapticToggle",
        "dreamHaptic"
    );

    bindToggle(
        "#spraySoundToggle",
        "dreamSpraySound"
    );


    /* =========================================================
       RANGES
    ========================================================= */

    function bindRange(
        inputId,
        outputId,
        storageKey,
        min,
        max,
        callback
    ) {

        const input =
            $(`#${inputId}`);

        const output =
            $(`#${outputId}`);

        if (!input) {
            return;
        }

        function apply(
            value,
            save = true
        ) {

            const safe =
                clamp(
                    value,
                    min,
                    max
                );

            input.value =
                safe;

            if (output) {

                output.textContent =
                    `${Math.round(safe)}%`;

            }

            callback?.(
                safe
            );

            if (save) {

                storage.set(
                    storageKey,
                    safe
                );

            }

        }

        input.addEventListener(
            "input",
            event => {

                apply(
                    event.target.value
                );

            }
        );

        apply(
            storage.get(
                storageKey,
                input.value
            ),
            false
        );

    }


    bindRange(
        "animationSpeed",
        "animationSpeedValue",
        "dreamAnimationSpeed",
        40,
        160,
        value => {

            root.style.setProperty(
                "--animation-speed",
                value / 100
            );

        }
    );


    bindRange(
        "motion3dRange",
        "motion3dValue",
        "dreamMotion3DIntensity",
        0,
        150
    );


    bindRange(
        "cursorGlowRange",
        "cursorGlowValue",
        "dreamCursorGlowIntensity",
        0,
        150,
        value => {

            root.style.setProperty(
                "--cursor-glow-intensity",
                value / 100
            );

        }
    );


    bindRange(
        "particleIntensityRange",
        "particleIntensityValue",
        "dreamParticleIntensity",
        0,
        150,
        generateParticles
    );


    bindRange(
        "sprayIntensityRange",
        "sprayIntensityValue",
        "dreamSprayIntensity",
        40,
        160,
        value => {

            root.style.setProperty(
                "--spray-intensity",
                value / 100
            );

        }
    );


    /* =========================================================
       BORRIFADOR — IDs REAIS DO INDEX
    ========================================================= */

    const sprayButton =
        $("#sprayButton");

    const sprayArea =
        $("#sprayArea");

    const mainBottle =
        $("#mainBottle");

    const heroProduct =
        $("#heroProduct");

    const sprayWave =
        $("#sprayWave");

    const sprayCounter =
        $("#sprayCounter");


    let sprayCount =
        Number(
            storage.get(
                "dreamSprayCount",
                0
            )
        ) || 0;


    function updateSprayCounter() {

        if (sprayCounter) {

            sprayCounter.textContent =
                sprayCount;

        }

    }


    updateSprayCounter();


    /* =========================================================
       ÁUDIO spray.mp3
    ========================================================= */

    const sprayAudio =
        new Audio(
            "./audio/spray.mp3"
        );

    sprayAudio.preload =
        "auto";

    sprayAudio.volume =
        0.8;


    function spraySoundEnabled() {

        const toggle =
            $("#spraySoundToggle");

        if (toggle) {

            return toggle.checked;

        }

        return storage.get(
            "dreamSpraySound",
            "true"
        ) !== "false";

    }


    async function playSpraySound() {

        if (
            !spraySoundEnabled()
        ) {

            return;

        }

        try {

            sprayAudio.pause();

            sprayAudio.currentTime =
                0;

            await sprayAudio.play();

        } catch (error) {

            console.warn(
                "Erro ao tocar ./audio/spray.mp3:",
                error
            );

        }

    }


    /* =========================================================
       EFEITO DO SPRAY
    ========================================================= */

    let spraying =
        false;


    function sprayDream() {

        if (spraying) {
            return;
        }

        spraying =
            true;

        sprayCount++;

        storage.set(
            "dreamSprayCount",
            sprayCount
        );

        updateSprayCounter();

        playSpraySound();


        if (
            navigator.vibrate &&
            $("#hapticToggle")
                ?.checked !== false
        ) {

            navigator.vibrate(
                30
            );

        }


        heroProduct?.classList.add(
            "spraying"
        );

        mainBottle?.classList.add(
            "spraying"
        );


        sprayWave?.classList.remove(
            "active"
        );

        if (sprayWave) {

            void sprayWave.offsetWidth;

        }

        sprayWave?.classList.add(
            "active"
        );


        if (sprayArea) {

            const intensity =
                clamp(
                    $("#sprayIntensityRange")
                        ?.value || 100,
                    40,
                    160
                ) / 100;

            const amount =
                Math.round(
                    50 *
                    intensity
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
                    "--mist-x",
                    `${
                        (
                            Math.random() -
                            0.5
                        ) *
                        420
                    }px`
                );

                mist.style.setProperty(
                    "--mist-y",
                    `${
                        (
                            Math.random() -
                            0.65
                        ) *
                        340
                    }px`
                );

                mist.style.setProperty(
                    "--mist-size",
                    `${
                        3 +
                        Math.random() *
                        12
                    }px`
                );

                mist.style.setProperty(
                    "--mist-duration",
                    `${
                        0.8 +
                        Math.random() *
                        0.8
                    }s`
                );

                sprayArea.appendChild(
                    mist
                );

                setTimeout(
                    () => {

                        mist.remove();

                    },
                    1800
                );

            }

        }


        showToast(
            currentLanguage === "pt-BR"
                ? "Dream está no ar ♡"
                : "Dream is in the air ♡"
        );


        setTimeout(
            () => {

                heroProduct?.classList.remove(
                    "spraying"
                );

                mainBottle?.classList.remove(
                    "spraying"
                );

                spraying =
                    false;

            },
            950
        );

    }


    sprayButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();

            sprayDream();

        }
    );


    /* =========================================================
       FRASCO 3D
    ========================================================= */

    heroProduct?.addEventListener(
        "pointermove",
        event => {

            if (
                !mainBottle ||
                spraying
            ) {

                return;

            }

            if (
                $("#motion3dToggle")
                    ?.checked === false
            ) {

                return;

            }

            if (
                !matchMedia(
                    "(pointer:fine)"
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
                rect.width -
                0.5;

            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height -
                0.5;

            const amount =
                clamp(
                    $("#motion3dRange")
                        ?.value || 100,
                    0,
                    150
                ) /
                100;

            mainBottle.style.transform =
                `
                rotateY(${x * 16 * amount}deg)
                rotateX(${y * -12 * amount}deg)
                translate3d(
                    ${x * 14 * amount}px,
                    ${y * 8 * amount}px,
                    25px
                )
                `;

        }
    );


    heroProduct?.addEventListener(
        "pointerleave",
        () => {

            if (mainBottle) {

                mainBottle.style.transform =
                    "";

            }

        }
    );


    /* =========================================================
       PARTE 2/2 CONTINUA EXATAMENTE DAQUI
       NOTAS + TIMELINE + MOODS + GALERIA + QUIZ +
       MÚSICA + SHARE + RESET + INICIALIZAÇÃO
    ========================================================= */
        /* =========================================================
       NOTAS OLFATIVAS
    ========================================================= */

    const noteData = {

        top: {
            icon: "✦",
            ptTitle: "Notas de saída",
            enTitle: "Top notes",
            ptText:
                "A abertura traz uma sensação fresca, luminosa e delicadamente frutada.",
            enText:
                "The opening brings a fresh, bright and delicately fruity sensation."
        },

        heart: {
            icon: "♡",
            ptTitle: "Notas de corpo",
            enTitle: "Heart notes",
            ptText:
                "O coração revela o lado floral, romântico e elegante de Dream Amor no Ar.",
            enText:
                "The heart reveals the floral, romantic and elegant side of Dream Love in the Air."
        },

        base: {
            icon: "☾",
            ptTitle: "Notas de fundo",
            enTitle: "Base notes",
            ptText:
                "A base traz conforto, profundidade e uma assinatura suave.",
            enText:
                "The base brings comfort, depth and a soft signature."
        }

    };


    function openNoteModal(type) {

        const data =
            noteData[type];

        if (
            !data ||
            !noteModal
        ) {
            return;
        }

        const icon =
            $("#noteModalIcon") ||
            $(".note-modal-icon", noteModal);

        const title =
            $("#noteModalTitle") ||
            $(".note-modal-title", noteModal);

        const text =
            $("#noteModalText") ||
            $(".note-modal-text", noteModal);

        if (icon) {
            icon.textContent =
                data.icon;
        }

        if (title) {
            title.textContent =
                currentLanguage === "pt-BR"
                    ? data.ptTitle
                    : data.enTitle;
        }

        if (text) {
            text.textContent =
                currentLanguage === "pt-BR"
                    ? data.ptText
                    : data.enText;
        }

        openLayer(
            noteModal
        );

    }


    $$("[data-note]").forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    openNoteModal(
                        button.dataset.note
                    );

                }
            );

        }
    );


    $$(".close-note, [data-close-note]").forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    closeLayer(
                        noteModal
                    );

                }
            );

        }
    );


    noteModal?.addEventListener(
        "click",
        event => {

            if (
                event.target === noteModal
            ) {

                closeLayer(
                    noteModal
                );

            }

        }
    );


    /* =========================================================
       TIMELINE
    ========================================================= */

    const timelineRange =
        $("#timelineRange") ||
        $("#timelineSlider") ||
        $("#fragranceTimeline");

    const timelineHour =
        $("#timelineHour");

    const timelineTitle =
        $("#timelineStageTitle") ||
        $("#timelineTitle");

    const timelineText =
        $("#timelineStageText") ||
        $("#timelineText");


    const timelineStages = [

        {
            max: 1,
            ptTitle: "Primeiros minutos",
            enTitle: "First minutes",
            ptText:
                "Uma abertura fresca, luminosa e delicada.",
            enText:
                "A fresh, bright and delicate opening."
        },

        {
            max: 3,
            ptTitle: "Coração floral",
            enTitle: "Floral heart",
            ptText:
                "As notas florais começam a ganhar destaque.",
            enText:
                "Floral notes begin to stand out."
        },

        {
            max: 6,
            ptTitle: "Conforto",
            enTitle: "Comfort",
            ptText:
                "A fragrância fica mais confortável e envolvente.",
            enText:
                "The fragrance becomes softer and more enveloping."
        },

        {
            max: Infinity,
            ptTitle: "Assinatura final",
            enTitle: "Final signature",
            ptText:
                "Uma presença suave permanece na pele.",
            enText:
                "A soft presence remains on the skin."
        }

    ];


    function updateTimeline() {

        if (!timelineRange) {
            return;
        }

        const value =
            Number(
                timelineRange.value
            ) || 0;

        const stage =
            timelineStages.find(
                item =>
                    value <=
                    item.max
            ) ||
            timelineStages[
                timelineStages.length - 1
            ];

        if (timelineHour) {

            timelineHour.textContent =
                value === 0
                    ? (
                        currentLanguage === "pt-BR"
                            ? "Agora"
                            : "Now"
                    )
                    : `${value}h`;

        }

        if (timelineTitle) {

            timelineTitle.textContent =
                currentLanguage === "pt-BR"
                    ? stage.ptTitle
                    : stage.enTitle;

        }

        if (timelineText) {

            timelineText.textContent =
                currentLanguage === "pt-BR"
                    ? stage.ptText
                    : stage.enText;

        }

    }


    timelineRange?.addEventListener(
        "input",
        updateTimeline
    );


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
            "#8b5cf6",
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


    function applyMood(
        name,
        notify = true
    ) {

        const mood =
            moods[name];

        if (!mood) {
            return;
        }

        applyColors(
            mood[0],
            mood[1]
        );

        body.dataset.mood =
            name;

        $$("[data-mood]").forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.mood === name
                );

            }
        );

        storage.set(
            "dreamMood",
            name
        );

        if (notify) {

            showToast(
                currentLanguage === "pt-BR"
                    ? "Mood aplicado ♡"
                    : "Mood applied ♡"
            );

        }

    }


    $$("[data-mood]").forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    applyMood(
                        button.dataset.mood
                    );

                }
            );

        }
    );


    /* =========================================================
       DREAM MOMENT
    ========================================================= */

    const dreamMoments = [

        {
            icon: "♡",
            ptTitle:
                "O amor mora nos detalhes.",
            enTitle:
                "Love lives in the details.",
            ptText:
                "Alguns momentos ficam especiais justamente porque parecem simples.",
            enText:
                "Some moments become special precisely because they seem simple."
        },

        {
            icon: "✦",
            ptTitle:
                "Transforme o comum.",
            enTitle:
                "Transform the ordinary.",
            ptText:
                "Uma fragrância pode transformar um instante comum em lembrança.",
            enText:
                "A fragrance can turn an ordinary instant into a memory."
        },

        {
            icon: "☾",
            ptTitle:
                "Leve o Dream com você.",
            enTitle:
                "Take Dream with you.",
            ptText:
                "Crie sua própria atmosfera.",
            enText:
                "Create your own atmosphere."
        }

    ];


    $("#newDreamMoment")?.addEventListener(
        "click",
        () => {

            const moment =
                dreamMoments[
                    Math.floor(
                        Math.random() *
                        dreamMoments.length
                    )
                ];

            const icon =
                $(".dream-moment-icon");

            const title =
                $("#dreamMomentTitle");

            const text =
                $("#dreamMomentText");

            if (icon) {
                icon.textContent =
                    moment.icon;
            }

            if (title) {
                title.textContent =
                    currentLanguage === "pt-BR"
                        ? moment.ptTitle
                        : moment.enTitle;
            }

            if (text) {
                text.textContent =
                    currentLanguage === "pt-BR"
                        ? moment.ptText
                        : moment.enText;
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


    function updateGalleryUI() {

        if (galleryCurrent) {

            galleryCurrent.textContent =
                String(
                    galleryIndex + 1
                ).padStart(
                    2,
                    "0"
                );

        }

        if (galleryTotal) {

            galleryTotal.textContent =
                String(
                    galleryItems.length
                ).padStart(
                    2,
                    "0"
                );

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


    function createGalleryDots() {

        if (!galleryDots) {
            return;
        }

        galleryDots.innerHTML =
            "";

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

                button.addEventListener(
                    "click",
                    () => {

                        goGallery(
                            index
                        );

                    }
                );

                galleryDots.appendChild(
                    button
                );

            }
        );

    }


    function goGallery(index) {

        if (
            !galleryTrack ||
            !galleryItems.length
        ) {
            return;
        }

        galleryIndex =
            (
                index +
                galleryItems.length
            ) %
            galleryItems.length;

        const item =
            galleryItems[
                galleryIndex
            ];

        galleryTrack.scrollTo({
            left:
                item.offsetLeft -
                galleryTrack.offsetLeft,
            behavior: "smooth"
        });

        updateGalleryUI();

    }


    galleryPrev?.addEventListener(
        "click",
        () => {

            goGallery(
                galleryIndex - 1
            );

        }
    );


    galleryNext?.addEventListener(
        "click",
        () => {

            goGallery(
                galleryIndex + 1
            );

        }
    );


    function stopGalleryAutoplay() {

        clearInterval(
            galleryTimer
        );

        galleryTimer =
            null;

        if (galleryAutoplay) {

            galleryAutoplay.textContent =
                "▶ Autoplay";

        }

    }


    function startGalleryAutoplay() {

        if (
            galleryTimer ||
            !galleryItems.length
        ) {
            return;
        }

        galleryTimer =
            setInterval(
                () => {

                    goGallery(
                        galleryIndex + 1
                    );

                },
                3500
            );

        if (galleryAutoplay) {

            galleryAutoplay.textContent =
                currentLanguage === "pt-BR"
                    ? "❚❚ Pausar"
                    : "❚❚ Pause";

        }

    }


    galleryAutoplay?.addEventListener(
        "click",
        () => {

            if (galleryTimer) {

                stopGalleryAutoplay();

            } else {

                startGalleryAutoplay();

            }

        }
    );


    /* =========================================================
       LIGHTBOX
    ========================================================= */

    let lightboxIndex =
        0;


    function updateLightbox() {

        const item =
            galleryItems[
                lightboxIndex
            ];

        if (!item) {
            return;
        }

        const image =
            $("img", item);

        const title =
            $("h3", item);

        const targetImage =
            $("#lightboxImage");

        const targetTitle =
            $("#lightboxTitle");

        const counter =
            $("#lightboxCounter");

        if (
            image &&
            targetImage
        ) {

            targetImage.src =
                image.currentSrc ||
                image.src;

            targetImage.alt =
                image.alt ||
                "Dream";

        }

        if (targetTitle) {

            targetTitle.textContent =
                title?.textContent ||
                image?.alt ||
                "Dream";

        }

        if (counter) {

            counter.textContent =
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


    function openLightbox(index) {

        if (
            !lightbox ||
            !galleryItems.length
        ) {
            return;
        }

        lightboxIndex =
            (
                index +
                galleryItems.length
            ) %
            galleryItems.length;

        updateLightbox();

        openLayer(
            lightbox
        );

    }


    function closeLightbox() {

        closeLayer(
            lightbox
        );

    }


    function nextLightbox() {

        openLightbox(
            lightboxIndex + 1
        );

    }


    function prevLightbox() {

        openLightbox(
            lightboxIndex - 1
        );

    }


    galleryItems.forEach(
        (item, index) => {

            item.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    openLightbox(
                        index
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

    $("#lightboxPrev")?.addEventListener(
        "click",
        prevLightbox
    );

    $("#lightboxNext")?.addEventListener(
        "click",
        nextLightbox
    );


    /* =========================================================
       QUIZ
    ========================================================= */

    const quizQuestions = [

        {
            pt:
                "Qual momento combina mais com você?",
            en:
                "Which moment suits you best?",
            answers: [
                ["Encontro romântico ♡", "Romantic date ♡", "romantico"],
                ["Noite olhando o céu ☾", "Night under the sky ☾", "sonhador"],
                ["Uma festa ✦", "A party ✦", "energia"],
                ["Momento tranquilo ☁", "A peaceful moment ☁", "calmo"]
            ]
        },

        {
            pt:
                "Qual sensação você procura?",
            en:
                "Which feeling are you looking for?",
            answers: [
                ["Romance", "Romance", "romantico"],
                ["Imaginação", "Imagination", "sonhador"],
                ["Intensidade", "Intensity", "energia"],
                ["Conforto", "Comfort", "calmo"]
            ]
        },

        {
            pt:
                "Escolha um símbolo.",
            en:
                "Choose a symbol.",
            answers: [
                ["♡ Coração", "♡ Heart", "romantico"],
                ["☾ Lua", "☾ Moon", "sonhador"],
                ["✦ Estrela", "✦ Star", "energia"],
                ["☁ Nuvem", "☁ Cloud", "calmo"]
            ]
        },

        {
            pt:
                "Escolha seu cenário Dream.",
            en:
                "Choose your Dream setting.",
            answers: [
                ["Jardim florido", "Flower garden", "romantico"],
                ["Céu estrelado", "Starry sky", "sonhador"],
                ["Cidade iluminada", "City lights", "energia"],
                ["Fim de tarde", "Sunset", "calmo"]
            ]
        }

    ];


    const quizResults = {

        romantico: {
            icon: "♡",
            title: "Dream Lover",
            pt:
                "Romântico, delicado e apaixonado pelos pequenos detalhes.",
            en:
                "Romantic, delicate and in love with the little details."
        },

        sonhador: {
            icon: "☾",
            title: "Dreamer",
            pt:
                "Criativo, sonhador e cheio de imaginação.",
            en:
                "Creative, dreamy and full of imagination."
        },

        energia: {
            icon: "✦",
            title: "Dream Energy",
            pt:
                "Vibrante, intenso e cheio de personalidade.",
            en:
                "Vibrant, intense and full of personality."
        },

        calmo: {
            icon: "☁",
            title: "Soft Dream",
            pt:
                "Leve, confortável e tranquilo.",
            en:
                "Soft, comfortable and calm."
        }

    };


    let quizIndex =
        0;

    let quizWinner =
        null;

    let quizScore =
        {};


    function startQuiz() {

        quizIndex =
            0;

        quizWinner =
            null;

        quizScore = {
            romantico: 0,
            sonhador: 0,
            energia: 0,
            calmo: 0
        };

        if ($("#quizStart")) {
            $("#quizStart").hidden =
                true;
        }

        if ($("#quizQuestions")) {
            $("#quizQuestions").hidden =
                false;
        }

        if ($("#quizResult")) {
            $("#quizResult").hidden =
                true;
        }

        renderQuiz();

    }


    function renderQuiz() {

        const question =
            quizQuestions[
                quizIndex
            ];

        if (!question) {
            finishQuiz();
            return;
        }

        const title =
            $("#quizQuestion");

        const options =
            $("#quizOptions");

        const step =
            $("#quizStep");

        const progress =
            $("#quizProgressBar");

        if (title) {

            title.textContent =
                currentLanguage === "pt-BR"
                    ? question.pt
                    : question.en;

        }

        if (step) {

            step.textContent =
                `${
                    quizIndex + 1
                } / ${
                    quizQuestions.length
                }`;

        }

        if (progress) {

            progress.style.width =
                `${
                    (
                        quizIndex + 1
                    ) /
                    quizQuestions.length *
                    100
                }%`;

        }

        if (!options) {
            return;
        }

        options.innerHTML =
            "";

        question.answers.forEach(
            answer => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.className =
                    "quiz-option";

                button.textContent =
                    currentLanguage === "pt-BR"
                        ? answer[0]
                        : answer[1];

                button.addEventListener(
                    "click",
                    () => {

                        quizScore[
                            answer[2]
                        ]++;

                        quizIndex++;

                        if (
                            quizIndex >=
                            quizQuestions.length
                        ) {

                            finishQuiz();

                        } else {

                            renderQuiz();

                        }

                    }
                );

                options.appendChild(
                    button
                );

            }
        );

    }


    function finishQuiz() {

        $("#quizQuestions") &&
        (
            $("#quizQuestions").hidden =
                true
        );

        $("#quizResult") &&
        (
            $("#quizResult").hidden =
                false
        );

        quizWinner =
            Object.entries(
                quizScore
            )
            .sort(
                (a, b) =>
                    b[1] -
                    a[1]
            )[0]?.[0] ||
            "romantico";

        const result =
            quizResults[
                quizWinner
            ];

        if ($("#quizResultIcon")) {

            $("#quizResultIcon").textContent =
                result.icon;

        }

        if ($("#quizResultTitle")) {

            $("#quizResultTitle").textContent =
                result.title;

        }

        if ($("#quizResultText")) {

            $("#quizResultText").textContent =
                currentLanguage === "pt-BR"
                    ? result.pt
                    : result.en;

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

    $("#quizRestart")?.addEventListener(
        "click",
        startQuiz
    );


    $("#applyQuizMood")?.addEventListener(
        "click",
        () => {

            if (quizWinner) {

                applyMood(
                    quizWinner
                );

            }

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

        const secs =
            Math.floor(
                seconds % 60
            );

        return `${minutes}:${String(
            secs
        ).padStart(
            2,
            "0"
        )}`;

    }


    function updateMusicUI() {

        if (!dreamMusic) {
            return;
        }

        const playing =
            !dreamMusic.paused;

        body.classList.toggle(
            "music-playing",
            playing
        );

        $("#dreamMusicPlayer")
            ?.classList.toggle(
                "playing",
                playing
            );

        if (dreamMusicButton) {

            dreamMusicButton.textContent =
                playing
                    ? "❚❚"
                    : "▶";

        }

        if (musicToggle) {

            musicToggle.checked =
                playing;

        }

    }


    async function playMusic() {

        if (!dreamMusic) {
            return;
        }

        try {

            await dreamMusic.play();

            updateMusicUI();

        } catch (error) {

            console.warn(
                "Erro ao iniciar música:",
                error
            );

        }

    }


    function pauseMusic() {

        dreamMusic?.pause();

        updateMusicUI();

    }


    dreamMusicButton?.addEventListener(
        "click",
        () => {

            if (!dreamMusic) {
                return;
            }

            dreamMusic.paused
                ? playMusic()
                : pauseMusic();

        }
    );


    musicToggle?.addEventListener(
        "change",
        event => {

            event.target.checked
                ? playMusic()
                : pauseMusic();

        }
    );


    dreamMusic?.addEventListener(
        "timeupdate",
        () => {

            if (musicCurrentTime) {

                musicCurrentTime.textContent =
                    formatTime(
                        dreamMusic.currentTime
                    );

            }

            if (
                musicProgress &&
                dreamMusic.duration
            ) {

                musicProgress.value =
                    dreamMusic.currentTime /
                    dreamMusic.duration *
                    100;

            }

        }
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


    musicProgress?.addEventListener(
        "input",
        event => {

            if (
                !dreamMusic ||
                !dreamMusic.duration
            ) {
                return;
            }

            dreamMusic.currentTime =
                Number(
                    event.target.value
                ) /
                100 *
                dreamMusic.duration;

        }
    );


    musicMuteButton?.addEventListener(
        "click",
        () => {

            if (!dreamMusic) {
                return;
            }

            dreamMusic.muted =
                !dreamMusic.muted;

            musicMuteButton.textContent =
                dreamMusic.muted
                    ? "🔇"
                    : "🔊";

        }
    );


    function setMusicVolume(
        value,
        save = true
    ) {

        const safe =
            clamp(
                value,
                0,
                100
            );

        if (dreamMusic) {

            dreamMusic.volume =
                safe / 100;

        }

        if (musicVolumeRange) {

            musicVolumeRange.value =
                safe;

        }

        if (musicVolumeValue) {

            musicVolumeValue.textContent =
                `${Math.round(safe)}%`;

        }

        if (save) {

            storage.set(
                "dreamMusicVolume",
                safe
            );

        }

    }


    musicVolumeRange?.addEventListener(
        "input",
        event => {

            setMusicVolume(
                event.target.value
            );

        }
    );


    /* =========================================================
       SHARE
    ========================================================= */

    async function sharePage() {

        try {

            if (navigator.share) {

                await navigator.share({
                    title:
                        document.title,
                    text:
                        "Dream Amor no Ar",
                    url:
                        location.href
                });

                return;

            }

            if (
                navigator.clipboard &&
                isSecureContext
            ) {

                await navigator.clipboard.writeText(
                    location.href
                );

                showToast(
                    currentLanguage === "pt-BR"
                        ? "Link copiado ♡"
                        : "Link copied ♡"
                );

                return;

            }

            window.prompt(
                "Copie o link:",
                location.href
            );

        } catch {}

    }


    $("#shareButton")?.addEventListener(
        "click",
        sharePage
    );

    $("#shareModal")?.addEventListener(
        "click",
        sharePage
    );


    /* =========================================================
       FULLSCREEN
    ========================================================= */

    $("#fullscreenButton")?.addEventListener(
        "click",
        async () => {

            try {

                if (
                    !document.fullscreenElement
                ) {

                    await document.documentElement
                        .requestFullscreen();

                } else {

                    await document.exitFullscreen();

                }

            } catch {}

        }
    );


    /* =========================================================
       TAMANHO DA FONTE
    ========================================================= */

    function setFontSize(
        size,
        save = true
    ) {

        const valid = [
            "small",
            "normal",
            "large"
        ];

        if (
            !valid.includes(size)
        ) {
            size =
                "normal";
        }

        body.classList.remove(
            "font-small",
            "font-normal",
            "font-large"
        );

        body.classList.add(
            `font-${size}`
        );

        $$("[data-font-size]").forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.fontSize === size
                );

            }
        );

        if (save) {

            storage.set(
                "dreamFontSize",
                size
            );

        }

    }


    $$("[data-font-size]").forEach(
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

    function readBool(
        key,
        fallback
    ) {

        const value =
            storage.get(
                key,
                null
            );

        if (
            value === null
        ) {
            return fallback;
        }

        return value === "true";

    }


    function loadSettings() {

        applyColors(
            storage.get(
                "dreamPrimary",
                "#df76a8"
            ),
            storage.get(
                "dreamSecondary",
                "#9562dc"
            ),
            false
        );

        setDark(
            readBool(
                "dreamDark",
                false
            ),
            false
        );

        const particlesEnabled =
            readBool(
                "dreamParticles",
                true
            );

        if ($("#particlesToggle")) {
            $("#particlesToggle").checked =
                particlesEnabled;
        }

        body.classList.toggle(
            "no-particles",
            !particlesEnabled
        );


        const animationsEnabled =
            readBool(
                "dreamAnimations",
                true
            );

        if ($("#animationsToggle")) {
            $("#animationsToggle").checked =
                animationsEnabled;
        }

        body.classList.toggle(
            "no-animations",
            !animationsEnabled
        );


        const cursorEnabled =
            readBool(
                "dreamCursor",
                true
            );

        if ($("#cursorToggle")) {
            $("#cursorToggle").checked =
                cursorEnabled;
        }

        body.classList.toggle(
            "no-cursor",
            !cursorEnabled
        );


        if ($("#motion3dToggle")) {

            $("#motion3dToggle").checked =
                readBool(
                    "dreamMotion3D",
                    true
                );

        }


        if ($("#hapticToggle")) {

            $("#hapticToggle").checked =
                readBool(
                    "dreamHaptic",
                    true
                );

        }


        if ($("#spraySoundToggle")) {

            $("#spraySoundToggle").checked =
                readBool(
                    "dreamSpraySound",
                    true
                );

        }


        setMusicVolume(
            storage.get(
                "dreamMusicVolume",
                35
            ),
            false
        );


        setFontSize(
            storage.get(
                "dreamFontSize",
                "normal"
            ),
            false
        );


        const savedMood =
            storage.get(
                "dreamMood",
                null
            );

        if (
            savedMood &&
            moods[savedMood]
        ) {

            applyMood(
                savedMood,
                false
            );

        }

    }


    /* =========================================================
       RESET
    ========================================================= */

    $("#resetSettings")?.addEventListener(
        "click",
        () => {

            const keys = [

                "dreamPrimary",
                "dreamSecondary",
                "dreamDark",
                "dreamParticles",
                "dreamAnimations",
                "dreamCursor",
                "dreamGlass",
                "dreamClean",
                "dreamPerformance",
                "dreamMotion3D",
                "dreamHaptic",
                "dreamSpraySound",
                "dreamAnimationSpeed",
                "dreamMotion3DIntensity",
                "dreamCursorGlowIntensity",
                "dreamParticleIntensity",
                "dreamSprayIntensity",
                "dreamFontSize",
                "dreamMusicVolume",
                "dreamMood"

            ];

            keys.forEach(
                key => {

                    storage.remove(
                        key
                    );

                }
            );

            location.reload();

        }
    );


    /* =========================================================
       ESC + ATALHOS
    ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            const target =
                event.target;

            const typing =
                target instanceof HTMLElement &&
                target.matches(
                    "input,textarea,select,[contenteditable='true']"
                );

            if (
                event.key === "Escape"
            ) {

                closeProductModal();

                closeLayer(
                    noteModal
                );

                closeLightbox();

                closeStudio();

                return;

            }

            if (typing) {
                return;
            }

            if (
                lightbox?.classList.contains(
                    "open"
                )
            ) {

                if (
                    event.key === "ArrowRight"
                ) {

                    nextLightbox();

                    return;

                }

                if (
                    event.key === "ArrowLeft"
                ) {

                    prevLightbox();

                    return;

                }

            }

            switch (
                event.key.toLowerCase()
            ) {

                case "s":
                    sprayDream();
                    break;

                case "m":
                    dreamMusicButton?.click();
                    break;

                case "d":
                    $("#themeButton")?.click();
                    break;

                case "g":

                    if (
                        settingsPanel?.classList.contains(
                            "open"
                        )
                    ) {

                        closeStudio();

                    } else {

                        openStudio();

                    }

                    break;

            }

        }
    );


    /* =========================================================
       SECTION INDICATOR
    ========================================================= */

    const sections =
        $$("main section[id]");


    function updateSectionIndicator() {

        if (
            !sectionIndicator ||
            !sections.length
        ) {
            return;
        }

        const position =
            scrollY +
            innerHeight *
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

        const index =
            sections.indexOf(
                current
            ) + 1;

        sectionIndicator.innerHTML =
            `
            <span>${String(index).padStart(2, "0")}</span>
            ${current.dataset.sectionName || current.id}
            `;

    }


    window.addEventListener(
        "scroll",
        updateSectionIndicator,
        {
            passive: true
        }
    );


    /* =========================================================
       RESIZE
    ========================================================= */

    let resizeTimer =
        null;


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

                        updateSectionIndicator();

                        generateParticles();

                        if (
                            innerWidth > 900
                        ) {

                            menu?.classList.remove(
                                "open"
                            );

                            menuMobile?.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    },
                    150
                );

        },
        {
            passive: true
        }
    );


    /* =========================================================
       API GLOBAL
    ========================================================= */

    window.Dream = {

        spray:
            sprayDream,

        openProduct:
            openProductModal,

        closeProduct:
            closeProductModal,

        openStudio,

        closeStudio,

        setLanguage,

        setDark,

        applyMood,

        showToast

    };


    /* =========================================================
       INICIALIZAÇÃO
    ========================================================= */

    loadSettings();

    updateScroll();

    updateTimeline();

    updateFavorite();

    updateSprayCounter();

    createGalleryDots();

    updateGalleryUI();

    updateGalleryAutoplayButton?.();

    updateMusicUI();

    updateSectionIndicator();

    setLanguage(
        currentLanguage,
        false
    );


    console.log(
        "%cDream carregado ✓",
        "color:#df76a8;font-weight:900;font-size:16px"
    );


    console.log(
        "open-product encontrados:",
        document.querySelectorAll(
            ".open-product"
        ).length
    );


    console.log(
        "productModal:",
        Boolean(productModal)
    );


    console.log(
        "settingsPanel:",
        Boolean(settingsPanel)
    );


    console.log(
        "sprayButton:",
        Boolean(sprayButton)
    );


}); // FIM DO DOMContentLoaded