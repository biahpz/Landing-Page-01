"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       HELPERS
    ========================================================= */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));

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

    let loaderClosed = false;


    function closeLoader() {

        if (
            !loader ||
            loaderClosed
        ) {

            return;

        }


        loaderClosed = true;


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


    /*
       Segurança:
       mesmo se alguma imagem ou áudio demorar,
       o loader não fica preso.
    */

    setTimeout(
        closeLoader,
        4000
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
        event => {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior:
                    body.classList.contains(
                        "no-animations"
                    )
                        ? "auto"
                        : "smooth"

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


            const opened =
                menu?.classList.toggle(
                    "open"
                );


            menuMobile.setAttribute(
                "aria-expanded",
                String(Boolean(opened))
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


                    let target = null;


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

                        behavior:
                            body.classList.contains(
                                "no-animations"
                            )
                                ? "auto"
                                : "smooth",

                        block:
                            "start"

                    });

                }
            );

        }
    );


    /* =========================================================
       REVEAL
    ========================================================= */

    const revealElements =
        $$(".reveal");


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
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


                            revealObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.1
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =========================================================
       BARRAS / METERS
    ========================================================= */

    $$("[data-meter]").forEach(
        meter => {

            const value =
                clamp(
                    meter.dataset.meter,
                    0,
                    100
                );


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


                                    meter.style.width =
                                        `${value}%`;


                                    observer.disconnect();

                                }
                            );

                        },
                        {
                            threshold: 0.25
                        }
                    );


                observer.observe(
                    meter
                );

            } else {

                meter.style.width =
                    `${value}%`;

            }

        }
    );


    $$(".feeling-meter-fill").forEach(
        meter => {

            const value =
                clamp(
                    meter.dataset.feeling,
                    0,
                    100
                );


            meter.style.setProperty(
                "--feeling-value",
                `${value}%`
            );

        }
    );


    /* =========================================================
       CURSOR GLOW
    ========================================================= */

    const cursorGlow =
        $("#cursorGlow");


    let cursorX =
        window.innerWidth / 2;

    let cursorY =
        window.innerHeight / 2;

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


    function animateCursorGlow() {

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
            animateCursorGlow
        );

    }


    animateCursorGlow();


    /* =========================================================
       PARTÍCULAS
    ========================================================= */

    const particlesContainer =
        $("#particles");


    function generateParticles() {

        if (!particlesContainer) {
            return;
        }


        particlesContainer.innerHTML =
            "";


        const intensity =
            clamp(
                $("#particleIntensityRange")
                    ?.value || 100,
                0,
                150
            );


        const baseAmount =
            window.innerWidth <= 650
                ? 12
                : 25;


        const amount =
            Math.round(
                baseAmount *
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


            particlesContainer.appendChild(
                particle
            );

        }

    }


    generateParticles();


    /* =========================================================
       IDIOMA
    ========================================================= */

    const translations = {

        "pt-BR": {

            "nav.home":
                "Início",

            "nav.product":
                "Produto",

            "nav.campaign":
                "Campanha",

            "nav.notes":
                "Notas",

            "nav.experience":
                "Experiência",

            "nav.feel":
                "Sensação",

            "nav.moments":
                "Momentos",

            "nav.gallery":
                "Galeria",

            "nav.mood":
                "Mood",

            "nav.quiz":
                "Quiz",

            "nav.discover":
                "Conhecer",

            "hero.status":
                "experiência interativa",

            "hero.eyebrow":
                "O BOTICÁRIO • DREAM",

            "hero.title2":
                "Amor no Ar",

            "hero.description":
                "Uma fragrância delicada, romântica e envolvente para transformar pequenos momentos em lembranças especiais.",

            "hero.discover":
                "Descobrir o Dream",

            "hero.viewProduct":
                "Ver produto",

            "hero.fact1":
                "Body Splash",

            "hero.fact2Title":
                "Floral",

            "hero.fact2":
                "Amadeirado",

            "hero.fact3":
                "Amor no Ar",

            "hero.tip":
                "Toque em borrifar para ativar o efeito, áudio e animação.",

            "hero.productName":
                "Amor no Ar",

            "hero.bodySplash":
                "Body Splash",

            "spray.button":
                "Borrifar",

            "spray.experience":
                "experimentar",

            "spray.counter":
                "BORRIFADAS",

            "product.collection":
                "DREAM COLLECTION",

            "product.eyebrow":
                "DREAM AMOR NO AR",

            "product.title1":
                "Um toque de",

            "product.title2":
                "amor",

            "product.title3":
                "na sua rotina.",

            "product.description":
                "Dream Amor no Ar combina delicadeza, romantismo e personalidade em uma fragrância confortável para diferentes momentos.",

            "product.point1Title":
                "Floral delicado",

            "product.point1Text":
                "Uma assinatura leve, elegante e romântica.",

            "product.point2Title":
                "Sensação confortável",

            "product.point2Text":
                "Para usar de forma leve durante o dia.",

            "product.point3Title":
                "Frasco de 350 ml",

            "product.point3Text":
                "Um Dream para acompanhar sua rotina.",

            "product.details":
                "Ver detalhes",

            "product.favorite":
                "♡ Favoritar",

            "campaign.mini":
                "DREAM • AMOR NO AR",

            "campaign.title1":
                "O amor está",

            "campaign.title2":
                "nos detalhes.",

            "campaign.description":
                "Uma atmosfera romântica, sofisticada e cheia de personalidade.",

            "campaign.explore":
                "Explorar universo Dream",

            "campaign.product":
                "Conhecer produto",

            "notes.eyebrow":
                "PIRÂMIDE OLFATIVA",

            "notes.title1":
                "Descubra cada",

            "notes.title2":
                "nota.",

            "notes.description":
                "Explore as diferentes camadas e descubra como a fragrância evolui.",

            "notes.top":
                "saída",

            "notes.heart":
                "corpo",

            "notes.base":
                "fundo",

            "experience.eyebrow":
                "SINTA A FRAGRÂNCIA",

            "experience.title1":
                "Explore o Dream de",

            "experience.title2":
                "outro jeito.",

            "experience.description":
                "Descubra a evolução da fragrância, compare sensações e personalize a experiência.",

            "experience.evolution":
                "EVOLUÇÃO",

            "experience.timelineTitle":
                "Timeline da fragrância",

            "experience.timelineIntro":
                "Arraste para acompanhar a evolução ao longo das horas.",

            "experience.profile":
                "PERFIL",

            "experience.personality":
                "Personalidade",

            "experience.moment":
                "MOMENTO",

            "experience.feelQuestion":
                "Como você quer se sentir?",

            "mood.romantic":
                "Romântico",

            "mood.dreamy":
                "Sonhador",

            "mood.night":
                "Noturno",

            "mood.energy":
                "Energia",

            "mood.calm":
                "Calmo",

            "gallery.eyebrow":
                "GALERIA DREAM",

            "gallery.title1":
                "Entre no universo",

            "gallery.title2":
                "Dream.",

            "gallery.description":
                "Arraste com o mouse, deslize no celular ou use as setas.",

            "gallery.autoplay":
                "▶ Autoplay",

            "quiz.title":
                "Qual é o seu Dream?",

            "quiz.description":
                "Responda quatro perguntas e descubra qual atmosfera combina mais com você.",

            "quiz.start":
                "Começar quiz",

            "quiz.restart":
                "Refazer quiz",

            "quiz.applyMood":
                "Aplicar meu mood",

            "quiz.share":
                "Compartilhar",

            "final.product":
                "Ver produto",

            "final.share":
                "Compartilhar",

            "final.fullscreen":
                "⛶ Tela cheia",

            "studio.title":
                "Sua experiência, do seu jeito.",

            "studio.description":
                "Personalize visual, áudio e movimento.",

            "studio.language":
                "Idioma",

            "studio.presets":
                "Estilos rápidos",

            "studio.appearance":
                "Aparência",

            "studio.dark":
                "Modo escuro",

            "studio.clean":
                "Modo clean",

            "studio.performance":
                "Modo performance",

            "studio.palettes":
                "Paletas",

            "studio.customColors":
                "Cores personalizadas",

            "studio.primary":
                "Principal",

            "studio.secondary":
                "Secundária",

            "studio.effects":
                "Efeitos",

            "studio.particles":
                "Partículas",

            "studio.animations":
                "Animações",

            "studio.motion":
                "Movimento 3D",

            "studio.haptic":
                "Vibração do spray",

            "studio.spraySound":
                "Som do borrifador",

            "studio.music":
                "Música",

            "studio.backgroundMusic":
                "Música de fundo",

            "studio.volume":
                "Volume",

            "studio.movement":
                "Movimento",

            "studio.speed":
                "Velocidade",

            "studio.motionIntensity":
                "Intensidade 3D",

            "studio.particleIntensity":
                "Partículas",

            "studio.sprayIntensity":
                "Borrifador",

            "studio.reading":
                "Leitura",

            "studio.contrast":
                "Contraste",

            "studio.textSize":
                "Tamanho do texto",

            "studio.reset":
                "↻ Restaurar padrão"

        },


        "en-US": {

            "nav.home":
                "Home",

            "nav.product":
                "Product",

            "nav.campaign":
                "Campaign",

            "nav.notes":
                "Notes",

            "nav.experience":
                "Experience",

            "nav.feel":
                "Feeling",

            "nav.moments":
                "Moments",

            "nav.gallery":
                "Gallery",

            "nav.mood":
                "Mood",

            "nav.quiz":
                "Quiz",

            "nav.discover":
                "Discover",

            "hero.status":
                "interactive experience",

            "hero.eyebrow":
                "O BOTICÁRIO • DREAM",

            "hero.title2":
                "Love in the Air",

            "hero.description":
                "A delicate, romantic and captivating fragrance designed to turn little moments into special memories.",

            "hero.discover":
                "Discover Dream",

            "hero.viewProduct":
                "View product",

            "hero.fact1":
                "Body Splash",

            "hero.fact2Title":
                "Floral",

            "hero.fact2":
                "Woody",

            "hero.fact3":
                "Love in the Air",

            "hero.tip":
                "Press spray to activate the effect, sound and animation.",

            "hero.productName":
                "Love in the Air",

            "hero.bodySplash":
                "Body Splash",

            "spray.button":
                "Spray",

            "spray.experience":
                "try it",

            "spray.counter":
                "SPRAYS",

            "product.collection":
                "DREAM COLLECTION",

            "product.eyebrow":
                "DREAM LOVE IN THE AIR",

            "product.title1":
                "A touch of",

            "product.title2":
                "love",

            "product.title3":
                "in your routine.",

            "product.description":
                "Dream Love in the Air combines delicacy, romance and personality in a comfortable fragrance for different moments.",

            "product.point1Title":
                "Delicate floral",

            "product.point1Text":
                "A light, elegant and romantic signature.",

            "product.point2Title":
                "Comfortable feeling",

            "product.point2Text":
                "Perfect for light everyday wear.",

            "product.point3Title":
                "350 ml bottle",

            "product.point3Text":
                "A Dream to accompany your routine.",

            "product.details":
                "View details",

            "product.favorite":
                "♡ Favorite",

            "campaign.mini":
                "DREAM • LOVE IN THE AIR",

            "campaign.title1":
                "Love is",

            "campaign.title2":
                "in the details.",

            "campaign.description":
                "A romantic, sophisticated atmosphere full of personality.",

            "campaign.explore":
                "Explore the Dream universe",

            "campaign.product":
                "Discover product",

            "notes.eyebrow":
                "OLFACTORY PYRAMID",

            "notes.title1":
                "Discover every",

            "notes.title2":
                "note.",

            "notes.description":
                "Explore the different layers and discover how the fragrance evolves.",

            "notes.top":
                "top",

            "notes.heart":
                "heart",

            "notes.base":
                "base",

            "experience.eyebrow":
                "FEEL THE FRAGRANCE",

            "experience.title1":
                "Explore Dream in",

            "experience.title2":
                "a new way.",

            "experience.description":
                "Discover how the fragrance evolves, compare sensations and personalize your experience.",

            "experience.evolution":
                "EVOLUTION",

            "experience.timelineTitle":
                "Fragrance timeline",

            "experience.timelineIntro":
                "Drag to follow the fragrance evolution throughout the hours.",

            "experience.profile":
                "PROFILE",

            "experience.personality":
                "Personality",

            "experience.moment":
                "MOMENT",

            "experience.feelQuestion":
                "How do you want to feel?",

            "mood.romantic":
                "Romantic",

            "mood.dreamy":
                "Dreamy",

            "mood.night":
                "Night",

            "mood.energy":
                "Energy",

            "mood.calm":
                "Calm",

            "gallery.eyebrow":
                "DREAM GALLERY",

            "gallery.title1":
                "Enter the",

            "gallery.title2":
                "Dream universe.",

            "gallery.description":
                "Drag with your mouse, swipe on mobile or use the arrows.",

            "gallery.autoplay":
                "▶ Autoplay",

            "quiz.title":
                "What is your Dream?",

            "quiz.description":
                "Answer four questions and discover which atmosphere suits you best.",

            "quiz.start":
                "Start quiz",

            "quiz.restart":
                "Restart quiz",

            "quiz.applyMood":
                "Apply my mood",

            "quiz.share":
                "Share",

            "final.product":
                "View product",

            "final.share":
                "Share",

            "final.fullscreen":
                "⛶ Fullscreen",

            "studio.title":
                "Your experience, your way.",

            "studio.description":
                "Customize visuals, audio and motion.",

            "studio.language":
                "Language",

            "studio.presets":
                "Quick styles",

            "studio.appearance":
                "Appearance",

            "studio.dark":
                "Dark mode",

            "studio.clean":
                "Clean mode",

            "studio.performance":
                "Performance mode",

            "studio.palettes":
                "Palettes",

            "studio.customColors":
                "Custom colors",

            "studio.primary":
                "Primary",

            "studio.secondary":
                "Secondary",

            "studio.effects":
                "Effects",

            "studio.particles":
                "Particles",

            "studio.animations":
                "Animations",

            "studio.motion":
                "3D motion",

            "studio.haptic":
                "Spray vibration",

            "studio.spraySound":
                "Spray sound",

            "studio.music":
                "Music",

            "studio.backgroundMusic":
                "Background music",

            "studio.volume":
                "Volume",

            "studio.movement":
                "Motion",

            "studio.speed":
                "Speed",

            "studio.motionIntensity":
                "3D intensity",

            "studio.particleIntensity":
                "Particles",

            "studio.sprayIntensity":
                "Spray",

            "studio.reading":
                "Reading",

            "studio.contrast":
                "Contrast",

            "studio.textSize":
                "Text size",

            "studio.reset":
                "↻ Reset settings"

        }

    };


    let currentLanguage =
        storage.get(
            "dreamLanguage",
            "pt-BR"
        );


    if (
        !translations[currentLanguage]
    ) {

        currentLanguage =
            "pt-BR";

    }


    function setLanguage(
        language,
        notify = false
    ) {

        if (
            !translations[language]
        ) {

            return;

        }


        currentLanguage =
            language;


        storage.set(
            "dreamLanguage",
            language
        );


        root.lang =
            language;


        /*
           IMPORTANTE:
           não chama Google Translate nem tradução
           automática do navegador.

           Somente elementos do próprio site que tenham
           data-i18n serão alterados.
        */

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
        currentLanguage,
        false
    );


    /* =========================================================
       CORES
    ========================================================= */

    function hexToRgb(hex) {

        let clean =
            String(hex)
                .replace("#", "")
                .trim();


        if (
            clean.length === 3
        ) {

            clean =
                clean
                    .split("")
                    .map(
                        char =>
                            char + char
                    )
                    .join("");

        }


        if (
            clean.length !== 6
        ) {

            return null;

        }


        const value =
            parseInt(
                clean,
                16
            );


        if (
            Number.isNaN(value)
        ) {

            return null;

        }


        return {

            r:
                value >> 16,

            g:
                value >> 8 & 255,

            b:
                value & 255

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


                    storage.set(
                        "dreamPalette",
                        button.dataset.palette
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

                $("#secondaryColor")
                    ?.value ||
                "#9562dc"

            );

        }
    );


    $("#secondaryColor")?.addEventListener(
        "input",
        event => {

            applyColors(

                $("#primaryColor")
                    ?.value ||
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


        const toggle =
            $("#darkToggle");


        const themeButton =
            $("#themeButton");


        if (toggle) {

            toggle.checked =
                enabled;

        }


        if (themeButton) {

            themeButton.textContent =
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
        event => {

            event.preventDefault();


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
       DREAM STUDIO — BASE
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

        }
    );


    $("#closeSettings")?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            closeStudio();

        }
    );


    /* =========================================================
       TOGGLES DO DREAM STUDIO
    ========================================================= */

    function bindToggle(
        selector,
        storageKey,
        bodyClass,
        invert = false
    ) {

        const element =
            $(selector);


        if (!element) {
            return;
        }


        element.addEventListener(
            "change",
            event => {

                const checked =
                    event.target.checked;


                if (bodyClass) {

                    body.classList.toggle(
                        bodyClass,
                        invert
                            ? !checked
                            : checked
                    );

                }


                storage.set(
                    storageKey,
                    checked
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
        valueId,
        storageKey,
        min,
        max,
        callback
    ) {

        const input =
            $(`#${inputId}`);


        const output =
            $(`#${valueId}`);


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


            if (save) {

                storage.set(
                    storageKey,
                    safe
                );

            }


            callback?.(
                safe
            );

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
        () => {

            generateParticles();

        }
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


    bindRange(
        "contrastControl",
        "contrastValue",
        "dreamContrast",
        80,
        130,
        value => {

            root.style.setProperty(
                "--dream-contrast",
                value / 100
            );


            body.style.filter =
                `contrast(${value / 100})`;

        }
    );


    /* =========================================================
       TAMANHO DO TEXTO
    ========================================================= */

    function setFontSize(
        size,
        save = true
    ) {

        const allowed = [
            "small",
            "normal",
            "large"
        ];


        const selected =
            allowed.includes(size)
                ? size
                : "normal";


        body.classList.remove(
            "font-small",
            "font-normal",
            "font-large"
        );


        body.classList.add(
            `font-${selected}`
        );


        $$("[data-font-size]").forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.fontSize ===
                    selected
                );

            }
        );


        if (save) {

            storage.set(
                "dreamFontSize",
                selected
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
       PRESETS
    ========================================================= */

    const presets = {

        dream: {

            primary:
                "#df76a8",

            secondary:
                "#9562dc",

            dark:
                false,

            clean:
                false,

            performance:
                false

        },


        cinematic: {

            primary:
                "#a855f7",

            secondary:
                "#312e81",

            dark:
                true,

            clean:
                false,

            performance:
                false

        },


        soft: {

            primary:
                "#f2a6c8",

            secondary:
                "#a78bfa",

            dark:
                false,

            clean:
                true,

            performance:
                false

        },


        performance: {

            primary:
                "#df76a8",

            secondary:
                "#9562dc",

            dark:
                false,

            clean:
                false,

            performance:
                true

        }

    };


    $$(".preset-button").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const preset =
                        presets[
                            button.dataset.preset
                        ];


                    if (!preset) {
                        return;
                    }


                    $$(".preset-button").forEach(
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
                        preset.primary,
                        preset.secondary
                    );


                    setDark(
                        preset.dark
                    );


                    body.classList.toggle(
                        "clean-mode",
                        preset.clean
                    );


                    body.classList.toggle(
                        "performance-mode",
                        preset.performance
                    );


                    if (
                        $("#cleanModeToggle")
                    ) {

                        $("#cleanModeToggle").checked =
                            preset.clean;

                    }


                    if (
                        $("#performanceToggle")
                    ) {

                        $("#performanceToggle").checked =
                            preset.performance;

                    }


                    storage.set(
                        "dreamClean",
                        preset.clean
                    );


                    storage.set(
                        "dreamPerformance",
                        preset.performance
                    );

                }
            );

        }
    );


    /* =========================================================
       MODAL BASE

       A PARTE 2 CONTINUA EXATAMENTE DAQUI.
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
            "open"
        );


        element.setAttribute(
            "aria-hidden",
            "true"
        );


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
       VER PRODUTO / CONHECER
    ========================================================= */

    function openProductModal() {

        if (!productModal) {

            console.error(
                "Dream: #productModal não encontrado no HTML."
            );

            showToast(
                currentLanguage === "pt-BR"
                    ? "Não foi possível abrir o produto."
                    : "Unable to open the product."
            );

            return;

        }


        openLayer(
            productModal
        );


        productModal.classList.add(
            "active"
        );


        productModal.style.display =
            "";


        requestAnimationFrame(
            () => {

                productModal.classList.add(
                    "visible"
                );

            }
        );


        const modalContent =
            productModal.querySelector(
                ".product-modal-content, .modal-content, .product-modal-card"
            );


        modalContent?.focus?.();

    }


    function closeProductModal() {

        if (!productModal) {
            return;
        }


        productModal.classList.remove(
            "active",
            "visible"
        );


        closeLayer(
            productModal
        );

    }


    $$(".open-product").forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    openProductModal();

                }
            );

        }
    );


    $$(
        "[data-open-product], #viewProductButton, #productDetailsButton"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    openProductModal();

                }
            );

        }
    );


    $$(".close-product").forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    closeProductModal();

                }
            );

        }
    );


    productModal
        ?.querySelectorAll(
            "[data-close-product], .modal-close, .product-modal-close"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        closeProductModal();

                    }
                );

            }
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
       DELEGAÇÃO DE EVENTOS DO PRODUTO
    ========================================================= */

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

        }
    );


    /* =========================================================
       FAVORITO
    ========================================================= */

    const favoriteButton =
        $("#favoriteButton") ||
        $(".favorite-button") ||
        $("[data-favorite]");


    let productFavorite =
        storage.get(
            "dreamFavorite",
            "false"
        ) === "true";


    function updateFavorite() {

        if (!favoriteButton) {
            return;
        }


        favoriteButton.classList.toggle(
            "active",
            productFavorite
        );


        favoriteButton.setAttribute(
            "aria-pressed",
            String(
                productFavorite
            )
        );


        const favoriteText =
            productFavorite
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


        const textElement =
            favoriteButton.querySelector(
                "[data-favorite-text]"
            );


        if (textElement) {

            textElement.textContent =
                favoriteText;

        } else {

            if (
                favoriteButton.children.length ===
                0
            ) {

                favoriteButton.textContent =
                    favoriteText;

            }

        }

    }


    favoriteButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            productFavorite =
                !productFavorite;


            storage.set(
                "dreamFavorite",
                productFavorite
            );


            updateFavorite();


            showToast(

                productFavorite
                    ? (
                        currentLanguage === "pt-BR"
                            ? "Produto favoritado ♡"
                            : "Product added to favorites ♡"
                    )
                    : (
                        currentLanguage === "pt-BR"
                            ? "Produto removido dos favoritos"
                            : "Product removed from favorites"
                    )

            );

        }
    );


    window.addEventListener(
        "dream-language-change",
        updateFavorite
    );


    /* =========================================================
       DREAM STUDIO — ABERTURA EXTRA
    ========================================================= */

    $$(
        ".open-settings, .open-studio, [data-open-settings], [data-open-studio]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    openStudio();

                }
            );

        }
    );


    $$(
        ".close-settings, .close-studio, [data-close-settings], [data-close-studio]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    closeStudio();

                }
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            const openButton =
                event.target.closest(
                    ".open-settings, .open-studio, [data-open-settings], [data-open-studio]"
                );


            if (openButton) {

                event.preventDefault();

                openStudio();


                return;

            }


            const closeButton =
                event.target.closest(
                    ".close-settings, .close-studio, [data-close-settings], [data-close-studio]"
                );


            if (closeButton) {

                event.preventDefault();

                closeStudio();

            }

        }
    );


    /* =========================================================
       BORRIFADOR
    ========================================================= */

    const sprayButton =
        $("#sprayButton") ||
        $(".spray-button") ||
        $("[data-spray]");


    const sprayCountElement =
        $("#sprayCounter") ||
        $("#sprayCount") ||
        $("#sprayCounterValue") ||
        $("[data-spray-count]");


    const sprayArea =
        $("#sprayArea") ||
        $(".spray-area") ||
        $(".hero-product");


    const perfumeBottle =
        $("#mainBottle") ||
        $(".main-bottle") ||
        $("#perfumeBottle") ||
        $(".perfume-bottle") ||
        $(".hero-bottle");


    let sprayCount =
        Number(
            storage.get(
                "dreamSprayCount",
                0
            )
        ) || 0;


    function updateSprayCounter() {

        if (
            sprayCountElement
        ) {

            sprayCountElement.textContent =
                sprayCount;

        }

    }


    updateSprayCounter();


    /* =========================================================
       ÁUDIO DO BORRIFADOR
    ========================================================= */

    let sprayAudio = null;


    function createSprayAudio() {

        if (sprayAudio) {

            return sprayAudio;

        }


        sprayAudio =
            $("#sprayAudio");


        if (!sprayAudio) {

            sprayAudio =
                new Audio(
                    "audio/spray.mp3"
                );


            sprayAudio.preload =
                "auto";

        }


        return sprayAudio;

    }


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


        const audio =
            createSprayAudio();


        if (!audio) {
            return;
        }


        try {

            audio.pause();


            audio.currentTime =
                0;


            audio.volume =
                0.75;


            await audio.play();

        } catch (error) {

            console.warn(
                "Dream: não foi possível reproduzir audio/spray.mp3",
                error
            );

        }

    }


    document.addEventListener(
        "pointerdown",
        () => {

            createSprayAudio()
                ?.load?.();

        },
        {
            once: true
        }
    );


    /* =========================================================
       PARTÍCULAS DO SPRAY
    ========================================================= */

    function createSprayParticles(
        originX,
        originY
    ) {

        const intensity =
            clamp(
                $("#sprayIntensityRange")
                    ?.value ||
                storage.get(
                    "dreamSprayIntensity",
                    100
                ),
                40,
                160
            );


        const amount =
            Math.round(
                18 *
                intensity /
                100
            );


        const container =
            document.createElement(
                "div"
            );


        container.className =
            "spray-particles";


        container.style.position =
            "fixed";


        container.style.left =
            `${originX}px`;


        container.style.top =
            `${originY}px`;


        container.style.pointerEvents =
            "none";


        container.style.zIndex =
            "9999";


        document.body.appendChild(
            container
        );


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
                160;


            const y =
                -(
                    40 +
                    Math.random() *
                    150
                );


            const rotation =
                (
                    Math.random() -
                    0.5
                ) *
                180;


            particle.style.width =
                `${size}px`;


            particle.style.height =
                `${size}px`;


            particle.style.position =
                "absolute";


            particle.style.borderRadius =
                "999px";


            particle.style.background =
                "rgba(255,255,255,.8)";


            particle.style.boxShadow =
                "0 0 12px rgba(255,255,255,.65)";


            particle.style.transform =
                "translate(-50%, -50%)";


            particle.style.opacity =
                "0";


            container.appendChild(
                particle
            );


            particle.animate(
                [

                    {
                        transform:
                            "translate(-50%, -50%) scale(.2)",

                        opacity:
                            0
                    },

                    {
                        opacity:
                            0.9,

                        offset:
                            0.15
                    },

                    {
                        transform:
                            `translate(
                                calc(-50% + ${x}px),
                                calc(-50% + ${y}px)
                            )
                            rotate(${rotation}deg)
                            scale(1.2)`,

                        opacity:
                            0
                    }

                ],
                {

                    duration:
                        650 +
                        Math.random() *
                        550,

                    easing:
                        "cubic-bezier(.2,.8,.2,1)",

                    fill:
                        "forwards"

                }
            );

        }


        setTimeout(
            () => {

                container.remove();

            },
            1500
        );

    }


    /* =========================================================
       SPRAY PRINCIPAL
    ========================================================= */

    function sprayDream(
        event = null
    ) {

        sprayCount++;


        storage.set(
            "dreamSprayCount",
            sprayCount
        );


        updateSprayCounter();


        playSpraySound();


        const hapticToggle =
            $("#hapticToggle");


        const hapticEnabled =
            hapticToggle
                ? hapticToggle.checked
                : storage.get(
                    "dreamHaptic",
                    "true"
                ) !== "false";


        if (
            hapticEnabled &&
            navigator.vibrate
        ) {

            navigator.vibrate(
                35
            );

        }


        perfumeBottle?.classList.remove(
            "spraying"
        );


        void perfumeBottle?.offsetWidth;


        perfumeBottle?.classList.add(
            "spraying"
        );


        sprayArea?.classList.remove(
            "spraying"
        );


        void sprayArea?.offsetWidth;


        sprayArea?.classList.add(
            "spraying"
        );


        let x =
            window.innerWidth /
            2;


        let y =
            window.innerHeight /
            2;


        if (
            event &&
            Number.isFinite(
                event.clientX
            )
        ) {

            x =
                event.clientX;


            y =
                event.clientY;

        } else if (
            sprayButton
        ) {

            const rect =
                sprayButton
                    .getBoundingClientRect();


            x =
                rect.left +
                rect.width /
                2;


            y =
                rect.top +
                rect.height /
                2;

        }


        createSprayParticles(
            x,
            y
        );


        setTimeout(
            () => {

                perfumeBottle?.classList.remove(
                    "spraying"
                );


                sprayArea?.classList.remove(
                    "spraying"
                );

            },
            850
        );

    }


    sprayButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            sprayDream(
                event
            );

        }
    );


    $$("[data-spray]").forEach(
        button => {

            if (
                button ===
                sprayButton
            ) {

                return;

            }


            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    sprayDream(
                        event
                    );

                }
            );

        }
    );


    /* =========================================================
       NOTAS OLFATIVAS
    ========================================================= */

    const noteData = {

        top: {

            icon:
                "✦",

            ptTitle:
                "Notas de saída",

            enTitle:
                "Top notes",

            ptText:
                "A abertura traz uma sensação fresca, luminosa e delicadamente frutada.",

            enText:
                "The opening brings a fresh, bright and delicately fruity sensation."

        },


        heart: {

            icon:
                "♡",

            ptTitle:
                "Notas de corpo",

            enTitle:
                "Heart notes",

            ptText:
                "O coração revela o lado floral, romântico e elegante de Dream Amor no Ar.",

            enText:
                "The heart reveals the floral, romantic and elegant side of Dream Love in the Air."

        },


        base: {

            icon:
                "☾",

            ptTitle:
                "Notas de fundo",

            enTitle:
                "Base notes",

            ptText:
                "A base traz conforto e profundidade, deixando uma assinatura suave e envolvente.",

            enText:
                "The base brings comfort and depth, leaving a soft and enveloping signature."

        }

    };


    function openNoteModal(
        type
    ) {

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
            noteModal.querySelector(
                ".note-modal-icon"
            );


        const title =
            $("#noteModalTitle") ||
            noteModal.querySelector(
                ".note-modal-title"
            );


        const text =
            $("#noteModalText") ||
            noteModal.querySelector(
                ".note-modal-text"
            );


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


    $$(
        "[data-note]"
    ).forEach(
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


    $$(
        ".close-note, [data-close-note]"
    ).forEach(
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
                event.target ===
                noteModal
            ) {

                closeLayer(
                    noteModal
                );

            }

        }
    );


    /* =========================================================
       TIMELINE DA FRAGRÂNCIA
    ========================================================= */

    const timelineRange =
        $("#timelineSlider") ||
        $("#timelineRange") ||
        $("#fragranceTimeline");


    const timelineHour =
        $("#timelineHour");


    const timelineTitle =
        $("#timelineTitle") ||
        $("#timelineStageTitle");


    const timelineText =
        $("#timelineText") ||
        $("#timelineStageText");


    const timelineStages = [

        {

            max:
                1,

            ptTitle:
                "Primeiros minutos",

            enTitle:
                "First minutes",

            ptText:
                "Uma abertura fresca, luminosa e delicada.",

            enText:
                "A fresh, bright and delicate opening."

        },


        {

            max:
                3,

            ptTitle:
                "Coração floral",

            enTitle:
                "Floral heart",

            ptText:
                "As notas florais começam a ganhar destaque e deixam a fragrância mais romântica.",

            enText:
                "Floral notes begin to stand out, making the fragrance more romantic."

        },


        {

            max:
                6,

            ptTitle:
                "Conforto",

            enTitle:
                "Comfort",

            ptText:
                "A fragrância fica mais confortável, macia e envolvente.",

            enText:
                "The fragrance becomes softer, more comfortable and enveloping."

        },


        {

            max:
                Infinity,

            ptTitle:
                "Assinatura final",

            enTitle:
                "Final signature",

            ptText:
                "Uma presença suave permanece na pele com um toque delicado.",

            enText:
                "A soft presence remains on the skin with a delicate touch."

        }

    ];


    function updateTimeline() {

        if (
            !timelineRange
        ) {

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
                timelineStages.length -
                1
            ];


        if (
            timelineHour
        ) {

            timelineHour.textContent =
                value === 0
                    ? (
                        currentLanguage === "pt-BR"
                            ? "Agora"
                            : "Now"
                    )
                    : `${value}h`;

        }


        if (
            timelineTitle
        ) {

            timelineTitle.textContent =
                currentLanguage === "pt-BR"
                    ? stage.ptTitle
                    : stage.enTitle;

        }


        if (
            timelineText
        ) {

            timelineText.textContent =
                currentLanguage === "pt-BR"
                    ? stage.ptText
                    : stage.enText;

        }


        const min =
            Number(
                timelineRange.min
            ) || 0;


        const max =
            Number(
                timelineRange.max
            ) || 8;


        const progress =
            (
                value -
                min
            ) /
            (
                max -
                min
            ) *
            100;


        timelineRange.style.setProperty(
            "--timeline-progress",
            `${progress}%`
        );

    }


    timelineRange?.addEventListener(
        "input",
        updateTimeline
    );


    window.addEventListener(
        "dream-language-change",
        updateTimeline
    );


    updateTimeline();


    /* =========================================================
       MOODS
    ========================================================= */

    const moods = {

        romantico: {

            primary:
                "#df76a8",

            secondary:
                "#9562dc",

            namePt:
                "Romântico",

            nameEn:
                "Romantic"

        },


        sonhador: {

            primary:
                "#a78bfa",

            secondary:
                "#60a5fa",

            namePt:
                "Sonhador",

            nameEn:
                "Dreamy"

        },


        noturno: {

            primary:
                "#8b5cf6",

            secondary:
                "#312e81",

            namePt:
                "Noturno",

            nameEn:
                "Night"

        },


        energia: {

            primary:
                "#fb7185",

            secondary:
                "#f59e0b",

            namePt:
                "Energia",

            nameEn:
                "Energy"

        },


        calmo: {

            primary:
                "#45c4aa",

            secondary:
                "#5285c5",

            namePt:
                "Calmo",

            nameEn:
                "Calm"

        }

    };


    function applyMood(
        moodName,
        notify = true
    ) {

        const mood =
            moods[moodName];


        if (!mood) {
            return;
        }


        applyColors(
            mood.primary,
            mood.secondary
        );


        body.dataset.mood =
            moodName;


        $$(".mood-button, [data-mood]").forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.mood ===
                    moodName
                );

            }
        );


        storage.set(
            "dreamMood",
            moodName
        );


        if (notify) {

            const name =
                currentLanguage === "pt-BR"
                    ? mood.namePt
                    : mood.nameEn;


            showToast(

                currentLanguage === "pt-BR"
                                    ? `Mood ${name} aplicado ♡`
                    : `${name} mood applied ♡`

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

            icon:
                "♡",

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

            icon:
                "✦",

            ptTitle:
                "Transforme o comum.",

            enTitle:
                "Transform the ordinary.",

            ptText:
                "Uma fragrância pode fazer um instante comum virar uma lembrança.",

            enText:
                "A fragrance can turn an ordinary instant into a memory."

        },


        {

            icon:
                "☾",

            ptTitle:
                "Leve o Dream com você.",

            enTitle:
                "Take Dream with you.",

            ptText:
                "Crie sua própria atmosfera e deixe o momento falar por si.",

            enText:
                "Create your own atmosphere and let the moment speak for itself."

        },


        {

            icon:
                "☁",

            ptTitle:
                "Desacelere um pouco.",

            enTitle:
                "Slow down for a moment.",

            ptText:
                "Nem todo momento especial precisa ser planejado.",

            enText:
                "Not every special moment needs to be planned."

        }

    ];


    let currentDreamMoment =
        0;


    function renderDreamMoment(
        index
    ) {

        const moment =
            dreamMoments[index];


        if (!moment) {
            return;
        }


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


    $("#newDreamMoment")?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            let next =
                currentDreamMoment;


            if (
                dreamMoments.length >
                1
            ) {

                while (
                    next ===
                    currentDreamMoment
                ) {

                    next =
                        Math.floor(
                            Math.random() *
                            dreamMoments.length
                        );

                }

            }


            currentDreamMoment =
                next;


            renderDreamMoment(
                currentDreamMoment
            );

        }
    );


    window.addEventListener(
        "dream-language-change",
        () => {

            renderDreamMoment(
                currentDreamMoment
            );

        }
    );


    /* =========================================================
       CARDS 3D
    ========================================================= */

    $$(".moment-card, .product-card-3d").forEach(
        card => {

            card.addEventListener(
                "pointermove",
                event => {

                    if (
                        !window.matchMedia(
                            "(pointer:fine)"
                        ).matches
                    ) {

                        return;

                    }


                    const motionToggle =
                        $("#motion3dToggle");


                    if (
                        motionToggle &&
                        !motionToggle.checked
                    ) {

                        return;

                    }


                    if (
                        body.classList.contains(
                            "performance-mode"
                        )
                    ) {

                        return;

                    }


                    const rect =
                        card.getBoundingClientRect();


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


                    const factor =
                        clamp(
                            $("#motion3dRange")
                                ?.value ||
                            storage.get(
                                "dreamMotion3DIntensity",
                                100
                            ),
                            0,
                            150
                        ) /
                        100;


                    card.style.transform =
                        `
                        perspective(900px)
                        translateY(-5px)
                        rotateX(${y * -7 * factor}deg)
                        rotateY(${x * 7 * factor}deg)
                        `;

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );


    /* =========================================================
       CENÁRIOS
    ========================================================= */

    const scenes = {

        romance: {

            icon:
                "♡",

            ptTitle:
                "Amor está no ar.",

            enTitle:
                "Love is in the air.",

            ptText:
                "Uma atmosfera delicada, rosa e envolvente.",

            enText:
                "A delicate, romantic and captivating atmosphere.",

            background:
                `
                radial-gradient(
                    circle at 20% 50%,
                    rgba(255,111,169,.40),
                    transparent 38%
                ),
                radial-gradient(
                    circle at 80% 40%,
                    rgba(169,92,221,.30),
                    transparent 42%
                ),
                linear-gradient(
                    135deg,
                    #1c0d18,
                    #35152c
                )
                `

        },


        ceu: {

            icon:
                "☾",

            ptTitle:
                "Noite estrelada",

            enTitle:
                "Starry night",

            ptText:
                "Uma sensação misteriosa, sonhadora e cheia de possibilidades.",

            enText:
                "A mysterious, dreamy feeling full of possibilities.",

            background:
                `
                radial-gradient(
                    circle at 25% 25%,
                    rgba(111,95,255,.30),
                    transparent 35%
                ),
                radial-gradient(
                    circle at 75% 60%,
                    rgba(73,133,255,.24),
                    transparent 40%
                ),
                linear-gradient(
                    135deg,
                    #090b1e,
                    #211346
                )
                `

        },


        flores: {

            icon:
                "✿",

            ptTitle:
                "Jardim Dream",

            enTitle:
                "Dream Garden",

            ptText:
                "Floral, romântico e delicado para deixar o momento mais especial.",

            enText:
                "Floral, romantic and delicate to make the moment more special.",

            background:
                `
                radial-gradient(
                    circle at 20% 65%,
                    rgba(251,113,133,.30),
                    transparent 35%
                ),
                radial-gradient(
                    circle at 80% 30%,
                    rgba(245,158,11,.25),
                    transparent 40%
                ),
                linear-gradient(
                    135deg,
                    #1a1018,
                    #35211c
                )
                `

        },


        energia: {

            icon:
                "✦",

            ptTitle:
                "Dream Energy",

            enTitle:
                "Dream Energy",

            ptText:
                "Uma atmosfera mais vibrante, intensa e cheia de personalidade.",

            enText:
                "A more vibrant and intense atmosphere full of personality.",

            background:
                `
                radial-gradient(
                    circle at 20% 50%,
                    rgba(69,196,170,.28),
                    transparent 38%
                ),
                radial-gradient(
                    circle at 80% 40%,
                    rgba(82,133,197,.28),
                    transparent 42%
                ),
                linear-gradient(
                    135deg,
                    #101a1c,
                    #172c35
                )
                `

        }

    };


    const dreamSceneBg =
        $(".dream-scene-bg");


    function applyScene(
        sceneName
    ) {

        const scene =
            scenes[sceneName];


        if (!scene) {
            return;
        }


        $$(".scene-button").forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.scene ===
                    sceneName
                );

            }
        );


        if (dreamSceneBg) {

            dreamSceneBg.style.background =
                scene.background;

        }


        const icon =
            $("#sceneResultIcon");


        const title =
            $("#sceneResultTitle");


        const text =
            $("#sceneResultText");


        if (icon) {

            icon.textContent =
                scene.icon;

        }


        if (title) {

            title.textContent =
                currentLanguage === "pt-BR"
                    ? scene.ptTitle
                    : scene.enTitle;

        }


        if (text) {

            text.textContent =
                currentLanguage === "pt-BR"
                    ? scene.ptText
                    : scene.enText;

        }


        storage.set(
            "dreamScene",
            sceneName
        );

    }


    $$(".scene-button").forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    applyScene(
                        button.dataset.scene
                    );

                }
            );

        }
    );


    window.addEventListener(
        "dream-language-change",
        () => {

            const active =
                $(".scene-button.active");


            if (active) {

                applyScene(
                    active.dataset.scene
                );

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


    let galleryAutoplayTimer =
        null;


    let galleryDragging =
        false;


    let galleryMoved =
        false;


    let galleryStartX =
        0;


    let galleryStartScroll =
        0;


    function updateGalleryCounter() {

        if (
            galleryCurrent
        ) {

            galleryCurrent.textContent =
                String(
                    galleryIndex + 1
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


    function createGalleryDots() {

        if (
            !galleryDots
        ) {

            return;

        }


        galleryDots.innerHTML =
            "";


        galleryItems.forEach(
            (_, index) => {

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
                    currentLanguage === "pt-BR"
                        ? `Ir para imagem ${index + 1}`
                        : `Go to image ${index + 1}`
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

    }


    function updateGalleryDots() {

        $$(".gallery-dot").forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index ===
                    galleryIndex
                );

            }
        );

    }


    function goGallery(
        index
    ) {

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


        if (
            !item
        ) {

            return;

        }


        const targetLeft =
            item.offsetLeft -
            galleryTrack.offsetLeft;


        galleryTrack.scrollTo({

            left:
                targetLeft,

            behavior:
                body.classList.contains(
                    "no-animations"
                )
                    ? "auto"
                    : "smooth"

        });


        updateGalleryCounter();

        updateGalleryDots();

    }


    galleryPrev?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            goGallery(
                galleryIndex - 1
            );

        }
    );


    galleryNext?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            goGallery(
                galleryIndex + 1
            );

        }
    );


    function detectGalleryIndex() {

        if (
            !galleryTrack ||
            !galleryItems.length
        ) {

            return;

        }


        const currentScroll =
            galleryTrack.scrollLeft;


        let closestIndex =
            0;


        let closestDistance =
            Infinity;


        galleryItems.forEach(
            (item, index) => {

                const itemLeft =
                    item.offsetLeft -
                    galleryTrack.offsetLeft;


                const distance =
                    Math.abs(
                        itemLeft -
                        currentScroll
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


        updateGalleryCounter();

        updateGalleryDots();

    }


    let galleryScrollTimer =
        null;


    galleryTrack?.addEventListener(
        "scroll",
        () => {

            clearTimeout(
                galleryScrollTimer
            );


            galleryScrollTimer =
                setTimeout(
                    detectGalleryIndex,
                    100
                );

        },
        {
            passive: true
        }
    );


    galleryTrack?.addEventListener(
        "pointerdown",
        event => {

            if (
                event.pointerType ===
                "touch"
            ) {

                return;

            }


            galleryDragging =
                true;


            galleryMoved =
                false;


            galleryStartX =
                event.clientX;


            galleryStartScroll =
                galleryTrack.scrollLeft;


            galleryTrack.classList.add(
                "dragging"
            );


            try {

                galleryTrack.setPointerCapture(
                    event.pointerId
                );

            } catch {}

        }
    );


    galleryTrack?.addEventListener(
        "pointermove",
        event => {

            if (
                !galleryDragging
            ) {

                return;

            }


            const delta =
                event.clientX -
                galleryStartX;


            if (
                Math.abs(delta) >
                5
            ) {

                galleryMoved =
                    true;

            }


            galleryTrack.scrollLeft =
                galleryStartScroll -
                delta;

        }
    );


    function stopGalleryDrag() {

        galleryDragging =
            false;


        galleryTrack?.classList.remove(
            "dragging"
        );


        detectGalleryIndex();


        setTimeout(
            () => {

                galleryMoved =
                    false;

            },
            100
        );

    }


    galleryTrack?.addEventListener(
        "pointerup",
        stopGalleryDrag
    );


    galleryTrack?.addEventListener(
        "pointercancel",
        stopGalleryDrag
    );


    galleryTrack?.addEventListener(
        "pointerleave",
        event => {

            if (
                event.buttons ===
                0
            ) {

                stopGalleryDrag();

            }

        }
    );


    function updateGalleryAutoplayButton() {

        if (
            !galleryAutoplay
        ) {

            return;

        }


        galleryAutoplay.classList.toggle(
            "active",
            Boolean(
                galleryAutoplayTimer
            )
        );


        galleryAutoplay.textContent =
            galleryAutoplayTimer
                ? (
                    currentLanguage === "pt-BR"
                        ? "❚❚ Pausar"
                        : "❚❚ Pause"
                )
                : "▶ Autoplay";

    }


    function stopGalleryAutoplay() {

        if (
            galleryAutoplayTimer
        ) {

            clearInterval(
                galleryAutoplayTimer
            );

        }


        galleryAutoplayTimer =
            null;


        updateGalleryAutoplayButton();

    }


    function startGalleryAutoplay() {

        if (
            !galleryItems.length ||
            galleryAutoplayTimer
        ) {

            return;

        }


        galleryAutoplayTimer =
            setInterval(
                () => {

                    goGallery(
                        galleryIndex + 1
                    );

                },
                3500
            );


        updateGalleryAutoplayButton();

    }


    galleryAutoplay?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            if (
                galleryAutoplayTimer
            ) {

                stopGalleryAutoplay();

            } else {

                startGalleryAutoplay();

            }

        }
    );


    window.addEventListener(
        "dream-language-change",
        () => {

            updateGalleryAutoplayButton();

            createGalleryDots();

            updateGalleryDots();

        }
    );


    /* =========================================================
       LIGHTBOX
    ========================================================= */

    const lightboxImage =
        $("#lightboxImage");


    const lightboxTitle =
        $("#lightboxTitle");


    const lightboxCounter =
        $("#lightboxCounter");


    const lightboxClose =
        $("#lightboxClose");


    const lightboxPrev =
        $("#lightboxPrev");


    const lightboxNext =
        $("#lightboxNext");


    const lightboxBackdrop =
        $("#lightboxBackdrop");


    let lightboxIndex =
        0;


    function updateLightbox() {

        if (
            !galleryItems.length
        ) {

            return;

        }


        const item =
            galleryItems[
                lightboxIndex
            ];


        if (
            !item
        ) {

            return;

        }


        const image =
            $("img", item);


        const title =
            $("h3", item) ||
            $(
                ".gallery-title",
                item
            );


        if (
            lightboxImage &&
            image
        ) {

            lightboxImage.src =
                image.currentSrc ||
                image.src;


            lightboxImage.alt =
                image.alt ||
                "Dream Amor no Ar";

        }


        if (
            lightboxTitle
        ) {

            lightboxTitle.textContent =
                title?.textContent?.trim() ||
                image?.alt ||
                "Dream";

        }


        if (
            lightboxCounter
        ) {

            lightboxCounter.textContent =
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


    function openLightbox(
        index
    ) {

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


    function prevLightbox() {

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


    galleryItems.forEach(
        (item, index) => {

            item.addEventListener(
                "click",
                event => {

                    if (
                        galleryMoved
                    ) {

                        return;

                    }


                    const exploreButton =
                        event.target.closest(
                            "a"
                        );


                    if (
                        exploreButton &&
                        !exploreButton
                            .classList
                            .contains(
                                "gallery-open"
                            )
                    ) {

                        const href =
                            exploreButton
                                .getAttribute(
                                    "href"
                                );


                        if (
                            href &&
                            href !== "#"
                        ) {

                            return;

                        }

                    }


                    event.preventDefault();


                    openLightbox(
                        index
                    );

                }
            );

        }
    );


    lightboxClose?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            closeLightbox();

        }
    );


    lightboxBackdrop?.addEventListener(
        "click",
        closeLightbox
    );


    lightboxPrev?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            prevLightbox();

        }
    );


    lightboxNext?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            nextLightbox();

        }
    );


    lightbox?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /* =========================================================
       QUIZ
    ========================================================= */

    const quizStart =
        $("#quizStart");


    const quizQuestionsContainer =
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


    const quizResultIcon =
        $("#quizResultIcon");


    const quizResultTitle =
        $("#quizResultTitle");


    const quizResultText =
        $("#quizResultText");


    const startQuizButton =
        $("#startQuiz");


    const restartQuizButton =
        $("#restartQuiz") ||
        $("#quizRestart");


    const applyQuizMoodButton =
        $("#applyQuizMood") ||
        $("#quizApplyMood");


    const shareQuizButton =
        $("#shareQuizResult") ||
        $("#quizShare");


    const quizQuestions = [

        {

            pt:
                "Qual momento combina mais com você?",

            en:
                "Which moment suits you best?",

            answers: [

                {

                    pt:
                        "Encontro romântico ♡",

                    en:
                        "Romantic date ♡",

                    mood:
                        "romantico"

                },


                {

                    pt:
                        "Noite olhando o céu ☾",

                    en:
                        "Night under the sky ☾",

                    mood:
                        "sonhador"

                },


                {

                    pt:
                        "Uma festa ✦",

                    en:
                        "A party ✦",

                    mood:
                        "energia"

                },


                {

                    pt:
                        "Momento tranquilo ☁",

                    en:
                        "A peaceful moment ☁",

                    mood:
                        "calmo"

                }

            ]

        },


        {

            pt:
                "Qual sensação você procura?",

            en:
                "Which feeling are you looking for?",

            answers: [

                {

                    pt:
                        "Romance",

                    en:
                        "Romance",

                    mood:
                        "romantico"

                },


                {

                    pt:
                        "Imaginação",

                    en:
                        "Imagination",

                    mood:
                        "sonhador"

                },


                {

                    pt:
                        "Intensidade",

                    en:
                        "Intensity",

                    mood:
                        "energia"

                },


                {

                    pt:
                        "Conforto",

                    en:
                        "Comfort",

                    mood:
                        "calmo"

                }

            ]

        },


        {

            pt:
                "Escolha um símbolo.",

            en:
                "Choose a symbol.",

            answers: [

                {

                    pt:
                        "♡ Coração",

                    en:
                        "♡ Heart",

                    mood:
                        "romantico"

                },


                {

                    pt:
                        "☾ Lua",

                    en:
                        "☾ Moon",

                    mood:
                        "sonhador"

                },


                {

                    pt:
                        "✦ Estrela",

                    en:
                        "✦ Star",

                    mood:
                        "energia"

                },


                {

                    pt:
                        "☁ Nuvem",

                    en:
                        "☁ Cloud",

                    mood:
                        "calmo"

                }

            ]

        },


        {

            pt:
                "Escolha seu cenário Dream.",

            en:
                "Choose your Dream setting.",

            answers: [

                {

                    pt:
                        "Jardim florido",

                    en:
                        "Flower garden",

                    mood:
                        "romantico"

                },


                {

                    pt:
                        "Céu estrelado",

                    en:
                        "Starry sky",

                    mood:
                        "sonhador"

                },


                {

                    pt:
                        "Cidade iluminada",

                    en:
                        "City lights",

                    mood:
                        "energia"

                },


                {

                    pt:
                        "Fim de tarde",

                    en:
                        "Sunset",

                    mood:
                        "calmo"

                }

            ]

        }

    ];


    const quizResults = {

        romantico: {

            icon:
                "♡",

            titlePt:
                "Dream Lover",

            titleEn:
                "Dream Lover",

            textPt:
                "Seu Dream é romântico, delicado e apaixonado pelos pequenos detalhes.",

            textEn:
                "Your Dream is romantic, delicate and in love with the little details."

        },


        sonhador: {

            icon:
                "☾",

            titlePt:
                "Dreamer",

            titleEn:
                "Dreamer",

            textPt:
                "Seu Dream é criativo, sonhador e transforma pequenos momentos em grandes lembranças.",

            textEn:
                "Your Dream is creative, dreamy and turns small moments into great memories."

        },


        energia: {

            icon:
                "✦",

            titlePt:
                "Dream Energy",

            titleEn:
                "Dream Energy",

            textPt:
                "Seu Dream é vibrante, intenso e cheio de personalidade.",

            textEn:
                "Your Dream is vibrant, intense and full of personality."

        },


        calmo: {

            icon:
                "☁",

            titlePt:
                "Soft Dream",

            titleEn:
                "Soft Dream",

            textPt:
                "Seu Dream valoriza conforto, tranquilidade e uma presença leve.",

            textEn:
                "Your Dream values comfort, tranquility and a soft presence."

        }

    };


    let quizIndex =
        0;


    let quizWinner =
        null;


    let quizScore = {

        romantico:
            0,

        sonhador:
            0,

        energia:
            0,

        calmo:
            0

    };


    function resetQuizScore() {

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

    }


    function startQuiz() {

        quizIndex =
            0;


        quizWinner =
            null;


        resetQuizScore();


        if (
            quizStart
        ) {

            quizStart.hidden =
                true;

        }


        if (
            quizQuestionsContainer
        ) {

            quizQuestionsContainer.hidden =
                false;

        }


        if (
            quizResult
        ) {

            quizResult.hidden =
                true;

        }


        renderQuizQuestion();

    }


    function renderQuizQuestion() {

        const question =
            quizQuestions[
                quizIndex
            ];


        if (
            !question
        ) {

            finishQuiz();

            return;

        }


        if (
            quizQuestion
        ) {

            quizQuestion.textContent =
                currentLanguage === "pt-BR"
                    ? question.pt
                    : question.en;

        }


        if (
            quizStep
        ) {

            quizStep.textContent =
                `${quizIndex + 1} / ${quizQuestions.length}`;

        }


        if (
            quizProgressBar
        ) {

            const progress =
                (
                    (
                        quizIndex +
                        1
                    ) /
                    quizQuestions.length
                ) *
                100;


            quizProgressBar.style.width =
                `${progress}%`;

        }


        if (
            !quizOptions
        ) {

            return;
                    }


        quizOptions.innerHTML =
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
                        ? answer.pt
                        : answer.en;


                button.addEventListener(
                    "click",
                    () => {

                        if (
                            quizScore[
                                answer.mood
                            ] !==
                            undefined
                        ) {

                            quizScore[
                                answer.mood
                            ]++;

                        }


                        quizIndex++;


                        if (
                            quizIndex >=
                            quizQuestions.length
                        ) {

                            finishQuiz();

                        } else {

                            renderQuizQuestion();

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
            quizQuestionsContainer
        ) {

            quizQuestionsContainer.hidden =
                true;

        }


        if (
            quizResult
        ) {

            quizResult.hidden =
                false;

        }


        const ordered =
            Object.entries(
                quizScore
            ).sort(
                (a, b) =>
                    b[1] -
                    a[1]
            );


        quizWinner =
            ordered[0]?.[0] ||
            "romantico";


        const result =
            quizResults[
                quizWinner
            ];


        if (
            !result
        ) {

            return;

        }


        if (
            quizResultIcon
        ) {

            quizResultIcon.textContent =
                result.icon;

        }


        if (
            quizResultTitle
        ) {

            quizResultTitle.textContent =
                currentLanguage === "pt-BR"
                    ? result.titlePt
                    : result.titleEn;

        }


        if (
            quizResultText
        ) {

            quizResultText.textContent =
                currentLanguage === "pt-BR"
                    ? result.textPt
                    : result.textEn;

        }

    }


    startQuizButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            startQuiz();

        }
    );


    restartQuizButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            startQuiz();

        }
    );


    /* =========================================================
       APLICAR MOOD DO QUIZ
    ========================================================= */

    applyQuizMoodButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            if (
                !quizWinner
            ) {

                return;

            }


            applyMood(
                quizWinner,
                false
            );


            showToast(

                currentLanguage === "pt-BR"
                    ? "Seu mood do Quiz foi aplicado ♡"
                    : "Your Quiz mood was applied ♡"

            );

        }
    );


    /* =========================================================
       COMPARTILHAR RESULTADO
    ========================================================= */

    shareQuizButton?.addEventListener(
        "click",
        async event => {

            event.preventDefault();


            if (
                !quizWinner
            ) {

                return;

            }


            const result =
                quizResults[
                    quizWinner
                ];


            if (
                !result
            ) {

                return;

            }


            const resultName =
                currentLanguage === "pt-BR"
                    ? result.titlePt
                    : result.titleEn;


            const shareText =
                currentLanguage === "pt-BR"
                    ? `Meu resultado no Dream Quiz foi ${resultName} ${result.icon}`
                    : `My Dream Quiz result is ${resultName} ${result.icon}`;


            try {

                if (
                    navigator.share
                ) {

                    await navigator.share({

                        title:
                            "Dream Quiz",

                        text:
                            shareText,

                        url:
                            window.location.href

                    });


                    return;

                }


                if (
                    navigator.clipboard &&
                    window.isSecureContext
                ) {

                    await navigator.clipboard.writeText(
                        `${shareText}\n${window.location.href}`
                    );


                    showToast(

                        currentLanguage === "pt-BR"
                            ? "Resultado copiado ♡"
                            : "Result copied ♡"

                    );


                    return;

                }


                window.prompt(

                    currentLanguage === "pt-BR"
                        ? "Copie seu resultado:"
                        : "Copy your result:",

                    `${shareText}\n${window.location.href}`

                );

            } catch {}

        }
    );


    /* =========================================================
       ATUALIZAR QUIZ QUANDO TROCAR IDIOMA
    ========================================================= */

    window.addEventListener(
        "dream-language-change",
        () => {

            if (
                quizQuestionsContainer &&
                !quizQuestionsContainer.hidden &&
                quizIndex <
                quizQuestions.length
            ) {

                renderQuizQuestion();

            }


            if (
                quizResult &&
                !quizResult.hidden &&
                quizWinner
            ) {

                const result =
                    quizResults[
                        quizWinner
                    ];


                if (
                    quizResultTitle &&
                    result
                ) {

                    quizResultTitle.textContent =
                        currentLanguage === "pt-BR"
                            ? result.titlePt
                            : result.titleEn;

                }


                if (
                    quizResultText &&
                    result
                ) {

                    quizResultText.textContent =
                        currentLanguage === "pt-BR"
                            ? result.textPt
                            : result.textEn;

                }

            }

        }
    );


    /* =========================================================
       INICIALIZAÇÃO DA GALERIA
    ========================================================= */

    createGalleryDots();

    updateGalleryCounter();

    updateGalleryDots();

    updateGalleryAutoplayButton();


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


        if (
            dreamMusicButton
        ) {

            const icon =
                dreamMusicButton.querySelector(
                    "[data-music-icon]"
                );


            if (icon) {

                icon.textContent =
                    playing
                        ? "❚❚"
                        : "▶";

            } else if (
                dreamMusicButton.children.length ===
                0
            ) {

                dreamMusicButton.textContent =
                    playing
                        ? "❚❚"
                        : "▶";

            }

        }


        if (
            musicToggle
        ) {

            musicToggle.checked =
                playing;

        }

    }


    async function playMusic() {

        if (!dreamMusic) {

            showToast(
                currentLanguage === "pt-BR"
                    ? "Áudio da música não encontrado."
                    : "Music audio not found."
            );

            return;

        }


        try {

            await dreamMusic.play();


            updateMusicUI();

        } catch (error) {

            console.warn(
                "Dream: música não iniciou.",
                error
            );


            showToast(
                currentLanguage === "pt-BR"
                    ? "Clique novamente para tocar a música."
                    : "Click again to play the music."
            );

        }

    }


    function pauseMusic() {

        if (!dreamMusic) {
            return;
        }


        dreamMusic.pause();


        updateMusicUI();

    }


    dreamMusicButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            if (!dreamMusic) {
                return;
            }


            if (
                dreamMusic.paused
            ) {

                playMusic();

            } else {

                pauseMusic();

            }

        }
    );


    musicToggle?.addEventListener(
        "change",
        event => {

            if (
                event.target.checked
            ) {

                playMusic();

            } else {

                pauseMusic();

            }

        }
    );


    dreamMusic?.addEventListener(
        "play",
        updateMusicUI
    );


    dreamMusic?.addEventListener(
        "pause",
        updateMusicUI
    );


    dreamMusic?.addEventListener(
        "ended",
        updateMusicUI
    );


    dreamMusic?.addEventListener(
        "loadedmetadata",
        () => {

            if (
                musicDuration
            ) {

                musicDuration.textContent =
                    formatTime(
                        dreamMusic.duration
                    );

            }

        }
    );


    dreamMusic?.addEventListener(
        "durationchange",
        () => {

            if (
                musicDuration
            ) {

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

            if (
                musicCurrentTime
            ) {

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
        event => {

            event.preventDefault();


            if (!dreamMusic) {
                return;
            }


            dreamMusic.muted =
                !dreamMusic.muted;


            const icon =
                musicMuteButton.querySelector(
                    "[data-mute-icon]"
                );


            if (icon) {

                icon.textContent =
                    dreamMusic.muted
                        ? "🔇"
                        : "🔊";

            } else if (
                musicMuteButton.children.length ===
                0
            ) {

                musicMuteButton.textContent =
                    dreamMusic.muted
                        ? "🔇"
                        : "🔊";

            }

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


        if (
            dreamMusic
        ) {

            dreamMusic.volume =
                safe / 100;

        }


        if (
            musicVolumeRange
        ) {

            musicVolumeRange.value =
                safe;

        }


        if (
            musicVolumeValue
        ) {

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
       COMPARTILHAR PÁGINA
    ========================================================= */

    async function sharePage() {

        const data = {

            title:
                document.title,

            text:
                currentLanguage === "pt-BR"
                    ? "Conheça Dream Amor no Ar ♡"
                    : "Discover Dream Love in the Air ♡",

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
                    currentLanguage === "pt-BR"
                        ? "Link copiado ♡"
                        : "Link copied ♡"
                );


                return;

            }


            window.prompt(
                currentLanguage === "pt-BR"
                    ? "Copie o link:"
                    : "Copy the link:",
                window.location.href
            );

        } catch {}

    }


    $("#shareButton")?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            sharePage();

        }
    );


    $("#shareModal")?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            sharePage();

        }
    );


    $$("[data-share-page]").forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    sharePage();

                }
            );

        }
    );


    /* =========================================================
       TELA CHEIA
    ========================================================= */

    const fullscreenButton =
        $("#fullscreenButton") ||
        $("[data-fullscreen]");


    async function toggleFullscreen() {

        try {

            if (
                !document.fullscreenElement
            ) {

                await document
                    .documentElement
                    .requestFullscreen();

            } else {

                await document
                    .exitFullscreen();

            }

        } catch (error) {

            console.warn(
                "Dream: fullscreen indisponível.",
                error
            );

        }

    }


    fullscreenButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            toggleFullscreen();

        }
    );


    /* =========================================================
       SECTION INDICATOR
    ========================================================= */

    const sections =
        $$("main section[id]");


    const sectionNames = {

        "pt-BR": {

            inicio:
                "Início",

            produto:
                "Produto",

            campanha:
                "Campanha",

            notas:
                "Notas",

            experiencia:
                "Experiência",

            sensacao:
                "Sensação",

            momentos:
                "Momentos",

            galeria:
                "Galeria",

            mood:
                "Mood",

            quiz:
                "Quiz"

        },


        "en-US": {

            inicio:
                "Home",

            produto:
                "Product",

            campanha:
                "Campaign",

            notas:
                "Notes",

            experiencia:
                "Experience",

            sensacao:
                "Feeling",

            momentos:
                "Moments",

            galeria:
                "Gallery",

            mood:
                "Mood",

            quiz:
                "Quiz"

        }

    };


    function updateSectionIndicator() {

        if (
            !sectionIndicator ||
            !sections.length
        ) {

            return;

        }


        const position =
            window.scrollY +
            window.innerHeight *
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
            );


        const number =
            index + 1;


        const customName =
            current.dataset
                .sectionName;


        const translatedName =
            sectionNames[
                currentLanguage
            ]?.[
                current.id
            ];


        const name =
            translatedName ||
            customName ||
            current.id;


        sectionIndicator.innerHTML =
            `
                <span>
                    ${String(number).padStart(2, "0")}
                </span>
                ${name}
            `;

    }


    window.addEventListener(
        "scroll",
        updateSectionIndicator,
        {
            passive: true
        }
    );


    window.addEventListener(
        "dream-language-change",
        updateSectionIndicator
    );


    /* =========================================================
       CONFIGURAÇÕES SALVAS
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


        return value ===
            "true";

    }


    function setToggleState(
        selector,
        value
    ) {

        const toggle =
            $(selector);


        if (toggle) {

            toggle.checked =
                value;

        }

    }


    function loadSettings() {

        const savedPrimary =
            storage.get(
                "dreamPrimary",
                "#df76a8"
            );


        const savedSecondary =
            storage.get(
                "dreamSecondary",
                "#9562dc"
            );


        applyColors(
            savedPrimary,
            savedSecondary,
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


        setToggleState(
            "#particlesToggle",
            particlesEnabled
        );


        body.classList.toggle(
            "no-particles",
            !particlesEnabled
        );


        const animationsEnabled =
            readBool(
                "dreamAnimations",
                true
            );


        setToggleState(
            "#animationsToggle",
            animationsEnabled
        );


        body.classList.toggle(
            "no-animations",
            !animationsEnabled
        );


        const cursorEnabled =
            readBool(
                "dreamCursor",
                true
            );


        setToggleState(
            "#cursorToggle",
            cursorEnabled
        );


        body.classList.toggle(
            "no-cursor",
            !cursorEnabled
        );


        const glassEnabled =
            readBool(
                "dreamGlass",
                true
            );


        setToggleState(
            "#glassToggle",
            glassEnabled
        );


        body.classList.toggle(
            "no-glass",
            !glassEnabled
        );


        const cleanEnabled =
            readBool(
                "dreamClean",
                false
            );


        setToggleState(
            "#cleanModeToggle",
            cleanEnabled
        );


        body.classList.toggle(
            "clean-mode",
            cleanEnabled
        );


        const performanceEnabled =
            readBool(
                "dreamPerformance",
                false
            );


        setToggleState(
            "#performanceToggle",
            performanceEnabled
        );


        body.classList.toggle(
            "performance-mode",
            performanceEnabled
        );


        setToggleState(
            "#motion3dToggle",
            readBool(
                "dreamMotion3D",
                true
            )
        );


        setToggleState(
            "#hapticToggle",
            readBool(
                "dreamHaptic",
                true
            )
        );


        setToggleState(
            "#spraySoundToggle",
            readBool(
                "dreamSpraySound",
                true
            )
        );


        setFontSize(
            storage.get(
                "dreamFontSize",
                "normal"
            ),
            false
        );


        setMusicVolume(
            storage.get(
                "dreamMusicVolume",
                35
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

            body.dataset.mood =
                savedMood;


            $$(
                "[data-mood]"
            ).forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.mood ===
                        savedMood
                    );

                }
            );

        }


        const savedScene =
            storage.get(
                "dreamScene",
                null
            );


        if (
            savedScene &&
            scenes[savedScene]
        ) {

            applyScene(
                savedScene
            );

        }


        generateParticles();

        updateMusicUI();

        updateFavorite();

    }


    /* =========================================================
       RESET CONFIGURAÇÕES
    ========================================================= */

    $("#resetSettings")?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            const keys = [

                "dreamPrimary",

                "dreamSecondary",

                "dreamPalette",

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

                "dreamContrast",

                "dreamFontSize",

                "dreamMusicVolume",

                "dreamMood",

                "dreamScene"

            ];


            keys.forEach(
                key => {

                    storage.remove(
                        key
                    );

                }
            );


            showToast(
                currentLanguage === "pt-BR"
                    ? "Configurações restauradas ♡"
                    : "Settings restored ♡"
            );


            setTimeout(
                () => {

                    window.location.reload();

                },
                450
            );

        }
    );


    /* =========================================================
       ESC / TECLADO
    ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            const target =
                event.target;


            const typing =
                target instanceof HTMLElement &&
                target.matches(
                    "input, textarea, select, [contenteditable='true']"
                );


            if (
                event.key ===
                "Escape"
            ) {

                closeProductModal();

                closeLayer(
                    noteModal
                );

                closeLightbox();

                closeStudio();


                menu?.classList.remove(
                    "open"
                );


                menuMobile?.setAttribute(
                    "aria-expanded",
                    "false"
                );


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

                    dreamMusicButton
                        ?.click();

                    break;


                case "d":

                    $("#themeButton")
                        ?.click();

                    break;


                case "g":

                    if (
                        settingsPanel
                            ?.classList
                            .contains(
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
       VISIBILIDADE
    ========================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden &&
                galleryAutoplayTimer
            ) {

                stopGalleryAutoplay();

            }

        }
    );


    /* =========================================================
       RESPONSIVIDADE
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

                        detectGalleryIndex();


                        if (
                            window.innerWidth >
                            900
                        ) {

                            menu?.classList.remove(
                                "open"
                            );


                            menuMobile?.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }


                        generateParticles();

                    },
                    160
                );

        },
        {
            passive: true
        }
    );


    /* =========================================================
       PROTEÇÃO CONTRA LINKS #
    ========================================================= */

    document.addEventListener(
        "click",
        event => {

            const anchor =
                event.target.closest(
                    'a[href="#"]'
                );


            if (
                !anchor
            ) {

                return;

            }


            event.preventDefault();

        }
    );


    /* =========================================================
       API GLOBAL
    ========================================================= */

    window.Dream = {

        spray:
            sprayDream,


        setLanguage:
            setLanguage,


        setDark:
            setDark,


        showToast:
            showToast,


        openProduct:
            openProductModal,


        closeProduct:
            closeProductModal,


        openStudio:
            openStudio,


        closeStudio:
            closeStudio,


        openGallery() {

            openLightbox(
                galleryIndex
            );

        },


        applyMood:
            applyMood,


        share:
            sharePage

    };


    /* =========================================================
       TESTE DOS ELEMENTOS IMPORTANTES
    ========================================================= */

    function dreamDiagnostics() {

        const tests = {

            productModal:
                Boolean(
                    productModal
                ),

            productButtons:
                document.querySelectorAll(
                    ".open-product"
                ).length,

            settingsPanel:
                Boolean(
                    settingsPanel
                ),

            sprayButton:
                Boolean(
                    sprayButton
                ),

            gallery:
                galleryItems.length,

            quiz:
                Boolean(
                    startQuizButton
                ),

            sprayAudioPath:
                "audio/spray.mp3"

        };


        console.log(
            "Dream diagnostics:",
            tests
        );


        if (
            !productModal
        ) {

            console.warn(
                "Dream: falta #productModal no INDEX."
            );

        }


        if (
            tests.productButtons ===
            0
        ) {

            console.warn(
                "Dream: nenhum botão .open-product encontrado."
            );

        }


        if (
            !settingsPanel
        ) {

            console.warn(
                "Dream: falta #settingsPanel no INDEX."
            );

        }


        if (
            !sprayButton
        ) {

            console.warn(
                "Dream: botão do borrifador não encontrado."
            );

        }

    }


    /* =========================================================
       INICIALIZAÇÃO
    ========================================================= */

    loadSettings();


    updateScroll();


    updateTimeline();


    updateSectionIndicator();


    updateGalleryCounter();


    updateGalleryDots();


    updateGalleryAutoplayButton();


    updateFavorite();


    updateSprayCounter();


    setLanguage(
        currentLanguage,
        false
    );


    if (
        productModal &&
        !productModal.classList.contains(
            "open"
        )
    ) {

        productModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (
        noteModal &&
        !noteModal.classList.contains(
            "open"
        )
    ) {

        noteModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (
        lightbox &&
        !lightbox.classList.contains(
            "open"
        )
    ) {

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (
        settingsPanel &&
        !settingsPanel.classList.contains(
            "open"
        )
    ) {

        settingsPanel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    dreamDiagnostics();


    console.log(
        "%cDream carregado ✓",
        "color:#df76a8;font-size:17px;font-weight:800;"
    );


}); // FIM DO DOMContentLoaded