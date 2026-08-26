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


    /* =========================================================
       TRADUÇÕES COMPLEMENTARES
       Mantém todos os textos do HTML sincronizados nos 2 idiomas.
    ========================================================= */

    Object.assign(
        translations["pt-BR"],
        {
            "dreamMoment.button": "Novo momento",
            "dreamMoment.defaultText": "Toque no botão para receber uma pequena mensagem Dream.",
            "dreamMoment.defaultTitle": "Seu momento começa aqui.",
            "experience.evolutionLower": "evolução",
            "experience.feelIntro": "Escolha uma atmosfera para transformar o visual da página.",
            "experience.moodHint": "A identidade visual muda automaticamente com o mood.",
            "experience.personalityIntro": "Uma leitura visual das principais sensações de Dream.",
            "feeling.amorNoAr": "AMOR NO AR",
            "feeling.bigTitle": "Delicado sem passar despercebido.",
            "feeling.description": "Uma representação visual do equilíbrio de Dream Amor no Ar.",
            "feeling.eyebrow": "SENSAÇÃO DA FRAGRÂNCIA",
            "feeling.profile": "PERFIL SENSORIAL",
            "feeling.text": "Dream equilibra um coração romântico com uma base confortável, criando uma presença suave.",
            "feeling.title1": "Entre leveza e",
            "feeling.title2": "presença.",
            "final.description": "Explore as notas, encontre seu mood e crie sua própria experiência Dream.",
            "final.eyebrow": "DREAM • AMOR NO AR",
            "final.title1": "Deixe seu momento",
            "final.title2": "no ar.",
            "footer.developed": "DESENVOLVIDO POR",
            "footer.subtitle": "Amor no Ar • 350 ml",
            "gallery.explore": "explorar ↗",
            "gallery.item1": "Dream World",
            "gallery.item2": "Amor no Ar",
            "gallery.item3": "Romance Dream",
            "lightbox.label": "DREAM GALLERY",
            "loader.loading": "preparando sua experiência",
            "loader.subtitle": "Amor no Ar",
            "meter.comfort": "Confortável",
            "meter.floral": "Floral",
            "meter.intensity": "Intensidade",
            "meter.presence": "Presença",
            "meter.romantic": "Romântico",
            "modal.comfortable": "☁ Confortável",
            "modal.experience": "EXPERIÊNCIA",
            "modal.experienceValue": "Leve e envolvente",
            "modal.floral": "✿ Floral",
            "modal.noteLabel": "NOTA DREAM",
            "modal.productDescription": "Uma fragrância floral, romântica e envolvente.",
            "modal.productEyebrow": "DREAM AMOR NO AR",
            "modal.profile": "PERFIL",
            "modal.profileValue": "Floral amadeirado",
            "modal.romantic": "♡ Romântico",
            "moments.card1Text": "Para começar o dia com uma sensação fresca, delicada e confortável.",
            "moments.card1Title": "Rotina leve",
            "moments.card2Text": "Uma atmosfera delicada para encontros e ocasiões especiais.",
            "moments.card2Title": "Momento romântico",
            "moments.card3Text": "Para quando você quer uma presença suave, envolvente e elegante.",
            "moments.card3Title": "Noite Dream",
            "moments.card4Text": "Alguns momentos não precisam de ocasião. Basta serem seus.",
            "moments.card4Title": "Seu momento",
            "moments.date": "ENCONTRO",
            "moments.day": "DIA",
            "moments.description": "Escolha o cenário que mais combina com a sua experiência.",
            "moments.eyebrow": "QUANDO USAR",
            "moments.night": "NOITE",
            "moments.special": "ESPECIAL",
            "moments.tagLight": "leve",
            "moments.tagNight": "noturno",
            "moments.tagRomantic": "romântico",
            "moments.tagSpecial": "especial",
            "moments.title1": "Um Dream para cada",
            "moments.title2": "momento.",
            "mood.comfortable": "confortável",
            "mood.delicate": "delicado",
            "mood.description": "Cada mood muda a identidade visual da experiência.",
            "mood.eyebrow": "ESCOLHA SEU MOOD",
            "mood.intense": "intenso",
            "mood.light": "leve",
            "mood.mysterious": "misterioso",
            "mood.title1": "Qual é o seu",
            "mood.title2": "Dream de hoje?",
            "music.playing": "TOCANDO AGORA",
            "note.amber": "Âmbar",
            "note.apple": "Maçã",
            "note.bergamot": "Bergamota",
            "note.freesia": "Frésia",
            "note.gardenia": "Gardênia",
            "note.lemon": "Limão",
            "note.linden": "Tília",
            "note.lotus": "Flor de Lótus",
            "note.mandarin": "Mandarina",
            "note.orange": "Laranja",
            "note.peach": "Pêssego",
            "note.rose": "Rosa",
            "note.sandalwood": "Sândalo",
            "note.vanilla": "Baunilha",
            "notes.card1Text": "A primeira impressão da fragrância: luminosa, fresca e vibrante.",
            "notes.card1Title": "Frescor frutado",
            "notes.card2Text": "O lado romântico, delicado e elegante de Amor no Ar.",
            "notes.card2Title": "Coração floral",
            "notes.card3Text": "As notas que permanecem e deixam a assinatura final da fragrância.",
            "notes.card3Title": "Conforto envolvente",
            "quiz.questionLabel": "DREAM QUESTION",
            "quiz.resultLabel": "SEU RESULTADO",
            "quote.end": "o amor no ar.",
            "quote.start": "Feito para deixar",
            "scene.delicate": "delicado",
            "scene.description": "Mude o cenário e descubra diferentes lados de Dream.",
            "scene.dreamy": "sonhador",
            "scene.energy": "Energia",
            "scene.flowers": "Flores",
            "scene.intense": "intenso",
            "scene.romance": "Romance",
            "scene.romantic": "romântico",
            "scene.sky": "Céu",
            "scene.title1": "Escolha sua",
            "scene.title2": "atmosfera.",
            "studio.animationsDesc": "Transições da experiência",
            "studio.backgroundMusicDesc": "Ativar ou pausar Moonlight",
            "studio.cleanDesc": "Experiência mais minimalista",
            "studio.cursorDesc": "Iluminação que acompanha o mouse",
            "studio.darkDesc": "Alternar tema",
            "studio.glassDesc": "Transparência e desfoque",
            "studio.hapticDesc": "Feedback em aparelhos compatíveis",
            "studio.motionDesc": "Profundidade do frasco",
            "studio.particlesDesc": "Elementos flutuantes",
            "studio.performanceDesc": "Reduz efeitos mais pesados",
            "studio.spraySoundDesc": "Reproduzir efeito ao borrifar",
            "ticker.delicate": "☁ Delicado",
            "ticker.floral": "✿ Floral Amadeirado",
            "ticker.love": "♡ Amor no Ar",
            "ticker.romantic": "☾ Romântico"
        }
    );


    Object.assign(
        translations["en-US"],
        {
            "dreamMoment.button": "New moment",
            "dreamMoment.defaultText": "Tap the button to receive a little Dream message.",
            "dreamMoment.defaultTitle": "Your moment starts here.",
            "experience.evolutionLower": "evolution",
            "experience.feelIntro": "Choose an atmosphere to transform the page.",
            "experience.moodHint": "The visual identity automatically changes with your mood.",
            "experience.personalityIntro": "A visual reading of Dream's main sensations.",
            "feeling.amorNoAr": "LOVE IN THE AIR",
            "feeling.bigTitle": "Delicate without going unnoticed.",
            "feeling.description": "A visual representation of the balance of Dream Love in the Air.",
            "feeling.eyebrow": "FRAGRANCE FEELING",
            "feeling.profile": "SENSORY PROFILE",
            "feeling.text": "Dream balances a romantic heart with a comfortable base, creating a soft presence.",
            "feeling.title1": "Between softness and",
            "feeling.title2": "presence.",
            "final.description": "Explore the notes, find your mood and create your own Dream experience.",
            "final.eyebrow": "DREAM • LOVE IN THE AIR",
            "final.title1": "Leave your moment",
            "final.title2": "in the air.",
            "footer.developed": "DEVELOPED BY",
            "footer.subtitle": "Love in the Air • 350 ml",
            "gallery.explore": "explore ↗",
            "gallery.item1": "Dream World",
            "gallery.item2": "Love in the Air",
            "gallery.item3": "Dream Romance",
            "lightbox.label": "DREAM GALLERY",
            "loader.loading": "preparing your experience",
            "loader.subtitle": "Love in the Air",
            "meter.comfort": "Comfortable",
            "meter.floral": "Floral",
            "meter.intensity": "Intensity",
            "meter.presence": "Presence",
            "meter.romantic": "Romantic",
            "modal.comfortable": "☁ Comfortable",
            "modal.experience": "EXPERIENCE",
            "modal.experienceValue": "Light and enveloping",
            "modal.floral": "✿ Floral",
            "modal.noteLabel": "DREAM NOTE",
            "modal.productDescription": "A floral, romantic and enveloping fragrance.",
            "modal.productEyebrow": "DREAM LOVE IN THE AIR",
            "modal.profile": "PROFILE",
            "modal.profileValue": "Floral woody",
            "modal.romantic": "♡ Romantic",
            "moments.card1Text": "To start the day with a fresh, delicate and comfortable feeling.",
            "moments.card1Title": "Light routine",
            "moments.card2Text": "A delicate atmosphere for dates and special occasions.",
            "moments.card2Title": "Romantic moment",
            "moments.card3Text": "For when you want a soft, enveloping and elegant presence.",
            "moments.card3Title": "Dream night",
            "moments.card4Text": "Some moments do not need an occasion. They just need to be yours.",
            "moments.card4Title": "Your moment",
            "moments.date": "DATE",
            "moments.day": "DAY",
            "moments.description": "Choose the setting that best matches your experience.",
            "moments.eyebrow": "WHEN TO WEAR",
            "moments.night": "NIGHT",
            "moments.special": "SPECIAL",
            "moments.tagLight": "light",
            "moments.tagNight": "night",
            "moments.tagRomantic": "romantic",
            "moments.tagSpecial": "special",
            "moments.title1": "A Dream for every",
            "moments.title2": "moment.",
            "mood.comfortable": "comfortable",
            "mood.delicate": "delicate",
            "mood.description": "Each mood changes the visual identity of the experience.",
            "mood.eyebrow": "CHOOSE YOUR MOOD",
            "mood.intense": "intense",
            "mood.light": "light",
            "mood.mysterious": "mysterious",
            "mood.title1": "What is your",
            "mood.title2": "Dream today?",
            "music.playing": "NOW PLAYING",
            "note.amber": "Amber",
            "note.apple": "Apple",
            "note.bergamot": "Bergamot",
            "note.freesia": "Freesia",
            "note.gardenia": "Gardenia",
            "note.lemon": "Lemon",
            "note.linden": "Linden",
            "note.lotus": "Lotus Flower",
            "note.mandarin": "Mandarin",
            "note.orange": "Orange",
            "note.peach": "Peach",
            "note.rose": "Rose",
            "note.sandalwood": "Sandalwood",
            "note.vanilla": "Vanilla",
            "notes.card1Text": "The fragrance's first impression: bright, fresh and vibrant.",
            "notes.card1Title": "Fruity freshness",
            "notes.card2Text": "The romantic, delicate and elegant side of Love in the Air.",
            "notes.card2Title": "Floral heart",
            "notes.card3Text": "The notes that remain and create the fragrance's final signature.",
            "notes.card3Title": "Enveloping comfort",
            "quiz.questionLabel": "DREAM QUESTION",
            "quiz.resultLabel": "YOUR RESULT",
            "quote.end": "love in the air.",
            "quote.start": "Made to leave",
            "scene.delicate": "delicate",
            "scene.description": "Change the setting and discover different sides of Dream.",
            "scene.dreamy": "dreamy",
            "scene.energy": "Energy",
            "scene.flowers": "Flowers",
            "scene.intense": "intense",
            "scene.romance": "Romance",
            "scene.romantic": "romantic",
            "scene.sky": "Sky",
            "scene.title1": "Choose your",
            "scene.title2": "atmosphere.",
            "studio.animationsDesc": "Experience transitions",
            "studio.backgroundMusicDesc": "Play or pause Moonlight",
            "studio.cleanDesc": "A more minimal experience",
            "studio.cursorDesc": "Light that follows the mouse",
            "studio.darkDesc": "Switch theme",
            "studio.glassDesc": "Transparency and blur",
            "studio.hapticDesc": "Feedback on supported devices",
            "studio.motionDesc": "Bottle depth effect",
            "studio.particlesDesc": "Floating elements",
            "studio.performanceDesc": "Reduces heavier effects",
            "studio.spraySoundDesc": "Play an effect when spraying",
            "ticker.delicate": "☁ Delicate",
            "ticker.floral": "✿ Floral Woody",
            "ticker.love": "♡ Love in the Air",
            "ticker.romantic": "☾ Romantic"
        }
    );


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


        const themeMeta =
            document.querySelector(
                'meta[name="theme-color"]'
            );


        if (themeMeta) {

            themeMeta.setAttribute(
                "content",
                primary
            );

        }


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
       PRESETS / ESTILOS RÁPIDOS
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

    const favoriteModalButton =
        $("#favoriteModal");

    let productFavorite =
        storage.get(
            "dreamFavorite",
            "false"
        ) === "true";


    function setFavoriteButtonState(
        button
    ) {

        if (!button) {
            return;
        }

        button.classList.toggle(
            "active",
            productFavorite
        );

        button.setAttribute(
            "aria-pressed",
            String(productFavorite)
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
            button.querySelector(
                "[data-favorite-text]"
            );

        if (textElement) {
            textElement.textContent =
                favoriteText;
        } else {
            button.textContent =
                favoriteText;
        }

    }


    function updateFavorite() {

        setFavoriteButtonState(
            favoriteButton
        );

        setFavoriteButtonState(
            favoriteModalButton
        );

    }


    function toggleFavorite(
        event
    ) {

        event?.preventDefault?.();

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


    favoriteButton?.addEventListener(
        "click",
        toggleFavorite
    );

    favoriteModalButton?.addEventListener(
        "click",
        toggleFavorite
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
       BORRIFADOR — EFEITO COMPLETO
    ========================================================= */

    const heroProduct =
        $("#heroProduct") ||
        $(".hero-product");

    const sprayButton =
        $("#sprayButton") ||
        $(".spray-button") ||
        $("[data-spray]");

    const sprayCountElement =
        $("#sprayCounter") ||
        $("#sprayCount") ||
        $("#sprayCounterValue") ||
        $("[data-spray-count]");

    const sprayCounterCard =
        $(".spray-counter-card");

    const sprayArea =
        $("#sprayArea") ||
        $(".spray-area");

    const sprayWave =
        $("#sprayWave") ||
        $(".spray-wave");

    const sprayGlow =
        $("#sprayGlow") ||
        $(".spray-glow");

    const productHalo =
        $("#productHalo") ||
        $(".product-halo");

    const perfumeBottle =
        $("#mainBottle") ||
        $(".main-bottle") ||
        $("#perfumeBottle") ||
        $(".perfume-bottle") ||
        $(".hero-bottle");

    let spraying = false;

    let sprayCount =
        Number(
            storage.get(
                "dreamSprayCount",
                0
            )
        ) || 0;


    function updateSprayCounter() {

        if (!sprayCountElement) {
            return;
        }

        sprayCountElement.textContent =
            sprayCount;

    }


    updateSprayCounter();


    /* =========================================================
       ÁUDIO DO BORRIFADOR
       Usa ./audio/spray.mp3 e toca somente a primeira borrifada
       caso o arquivo possua várias borrifadas juntas.
    ========================================================= */

    let sprayAudio = null;
    let sprayAudioStopTimer = null;


    function createSprayAudio() {

        if (sprayAudio) {
            return sprayAudio;
        }

        sprayAudio =
            $("#sprayAudio");

        if (!sprayAudio) {

            sprayAudio =
                new Audio(
                    "./audio/spray.mp3"
                );

        }

        sprayAudio.preload =
            "auto";

        sprayAudio.volume =
            0.78;

        return sprayAudio;

    }


    function isSpraySoundEnabled() {

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


    function playSpraySound() {

        if (!isSpraySoundEnabled()) {
            return;
        }

        const audio =
            createSprayAudio();

        if (!audio) {
            return;
        }

        clearTimeout(
            sprayAudioStopTimer
        );

        try {

            audio.pause();
            audio.currentTime = 0;
            audio.volume = 0.78;

            const playPromise =
                audio.play();

            playPromise?.catch?.(
                () => {}
            );

            sprayAudioStopTimer =
                setTimeout(
                    () => {

                        try {
                            audio.pause();
                            audio.currentTime = 0;
                        } catch {}

                    },
                    430
                );

        } catch {}

    }


    document.addEventListener(
        "pointerdown",
        () => {
            createSprayAudio()?.load?.();
        },
        {
            once: true
        }
    );


    function restartSprayAnimation(
        element,
        className = "active"
    ) {

        if (!element) {
            return;
        }

        element.classList.remove(
            className
        );

        void element.offsetWidth;

        element.classList.add(
            className
        );

    }


    function currentSprayFactor() {

        return clamp(
            $("#sprayIntensityRange")?.value ||
            storage.get(
                "dreamSprayIntensity",
                100
            ),
            40,
            160
        ) / 100;

    }


    function createSprayFlash() {

        if (!sprayArea) {
            return;
        }

        const flash =
            document.createElement(
                "span"
            );

        flash.className =
            "spray-flash active";

        sprayArea.appendChild(
            flash
        );

        setTimeout(
            () => flash.remove(),
            700
        );

    }


    function createSprayMist() {

        if (!sprayArea) {
            return;
        }

        const factor =
            currentSprayFactor();

        const baseAmount =
            window.innerWidth <= 650
                ? 28
                : 52;

        const amount =
            Math.round(
                baseAmount * factor
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

            const x =
                (
                    Math.random() - 0.5
                ) *
                340 *
                factor;

            const y =
                -(
                    20 +
                    Math.random() * 230
                ) *
                factor;

            const size =
                (
                    3 +
                    Math.random() * 10
                ) *
                Math.max(
                    0.8,
                    factor
                );

            const blur =
                1 +
                Math.random() * 3;

            const duration =
                0.72 +
                Math.random() * 0.72;

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
                `${Math.random() * 0.09}s`;

            sprayArea.appendChild(
                mist
            );

            setTimeout(
                () => mist.remove(),
                1800
            );

        }

    }


    function createSpraySymbols() {

        if (!sprayArea) {
            return;
        }

        const factor =
            currentSprayFactor();

        const symbols = [
            "♡",
            "✦",
            "✧"
        ];

        const amount =
            Math.round(
                (
                    window.innerWidth <= 650
                        ? 5
                        : 9
                ) *
                Math.max(
                    0.75,
                    factor
                )
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
                "spray-symbol-particle";

            particle.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];

            particle.style.fontSize =
                `${8 + Math.random() * 12}px`;

            particle.style.setProperty(
                "--symbol-x",
                `${(
                    Math.random() - 0.5
                ) * 240 * factor}px`
            );

            particle.style.setProperty(
                "--symbol-y",
                `${-
                    50 -
                    Math.random() * 150 * factor
                }px`
            );

            particle.style.setProperty(
                "--symbol-rotate",
                `${-90 + Math.random() * 180}deg`
            );

            sprayArea.appendChild(
                particle
            );

            setTimeout(
                () => particle.remove(),
                1600
            );

        }

    }


    function pulseSprayUI() {

        restartSprayAnimation(
            sprayWave
        );

        restartSprayAnimation(
            sprayGlow
        );

        heroProduct?.classList.remove(
            "spraying"
        );

        sprayButton?.classList.remove(
            "spraying"
        );

        sprayCounterCard?.classList.remove(
            "pulse"
        );

        productHalo?.classList.remove(
            "spraying"
        );

        void heroProduct?.offsetWidth;

        heroProduct?.classList.add(
            "spraying"
        );

        sprayButton?.classList.add(
            "spraying"
        );

        sprayCounterCard?.classList.add(
            "pulse"
        );

        productHalo?.classList.add(
            "spraying"
        );

    }


    async function sprayDream(
        event = null
    ) {

        event?.preventDefault?.();

        if (
            spraying ||
            !sprayArea
        ) {
            return;
        }

        spraying = true;

        sprayButton?.setAttribute(
            "aria-busy",
            "true"
        );

        pulseSprayUI();

        createSprayFlash();
        createSprayMist();
        createSpraySymbols();
        playSpraySound();

        sprayCount++;

        storage.set(
            "dreamSprayCount",
            sprayCount
        );

        updateSprayCounter();

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
                [18, 20, 10]
            );
        }

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    720
                )
        );

        heroProduct?.classList.remove(
            "spraying"
        );

        sprayButton?.classList.remove(
            "spraying"
        );

        sprayCounterCard?.classList.remove(
            "pulse"
        );

        productHalo?.classList.remove(
            "spraying"
        );

        sprayButton?.removeAttribute(
            "aria-busy"
        );

        spraying = false;

    }


    sprayButton?.addEventListener(
        "click",
        sprayDream
    );


    $$('[data-spray]').forEach(
        button => {

            if (button === sprayButton) {
                return;
            }

            button.addEventListener(
                "click",
                sprayDream
            );

        }
    );


    /* =========================================================
       NOTAS OLFATIVAS
    ========================================================= */

    const noteData = {

        bergamota: {
            icon: "🍊",
            ptTitle: "Bergamota",
            enTitle: "Bergamot",
            ptText: "Uma nota cítrica, luminosa e fresca que traz sensação de abertura e energia.",
            enText: "A bright, fresh citrus note that brings an energetic opening sensation."
        },

        laranja: {
            icon: "🍊",
            ptTitle: "Laranja",
            enTitle: "Orange",
            ptText: "Cítrica e suculenta, acrescenta brilho e uma doçura frutada à abertura.",
            enText: "Citrusy and juicy, adding brightness and a fruity sweetness to the opening."
        },

        mandarina: {
            icon: "🍊",
            ptTitle: "Mandarina",
            enTitle: "Mandarin",
            ptText: "Uma faceta cítrica macia e alegre, com frescor levemente adocicado.",
            enText: "A soft, cheerful citrus facet with a lightly sweet freshness."
        },

        limao: {
            icon: "🍋",
            ptTitle: "Limão",
            enTitle: "Lemon",
            ptText: "Traz um frescor vibrante e limpo que deixa a saída mais luminosa.",
            enText: "Adds a vibrant, clean freshness that makes the opening feel brighter."
        },

        cassis: {
            icon: "🫐",
            ptTitle: "Cassis",
            enTitle: "Blackcurrant",
            ptText: "Frutado intenso, com contraste entre doçura e uma nuance levemente ácida.",
            enText: "An intense fruity note balancing sweetness with a slightly tart nuance."
        },

        maca: {
            icon: "🍎",
            ptTitle: "Maçã",
            enTitle: "Apple",
            ptText: "Uma nota frutada crocante e delicada que reforça a sensação de frescor.",
            enText: "A crisp, delicate fruity note that reinforces the feeling of freshness."
        },

        rosa: {
            icon: "🌹",
            ptTitle: "Rosa",
            enTitle: "Rose",
            ptText: "Floral romântico e elegante, trazendo suavidade ao coração da fragrância.",
            enText: "A romantic, elegant floral note that brings softness to the fragrance heart."
        },

        tilia: {
            icon: "🌼",
            ptTitle: "Tília",
            enTitle: "Linden",
            ptText: "Uma nuance floral macia e confortável, com sensação leve e arejada.",
            enText: "A soft, comfortable floral nuance with a light and airy feeling."
        },

        freesia: {
            icon: "🌸",
            ptTitle: "Frésia",
            enTitle: "Freesia",
            ptText: "Floral transparente e delicado, ajudando a criar um coração leve e luminoso.",
            enText: "A transparent, delicate floral note that keeps the heart light and bright."
        },

        lotus: {
            icon: "🪷",
            ptTitle: "Flor de Lótus",
            enTitle: "Lotus Flower",
            ptText: "Uma impressão floral aquosa e serena que deixa a composição mais suave.",
            enText: "A serene, watery floral impression that makes the composition feel softer."
        },

        gardenia: {
            icon: "🌼",
            ptTitle: "Gardênia",
            enTitle: "Gardenia",
            ptText: "Floral cremoso e elegante que adiciona presença sem perder a delicadeza.",
            enText: "A creamy, elegant floral note that adds presence while remaining delicate."
        },

        pessego: {
            icon: "🍑",
            ptTitle: "Pêssego",
            enTitle: "Peach",
            ptText: "Frutado macio e aveludado, trazendo uma doçura confortável ao coração.",
            enText: "A soft, velvety fruity note that brings comfortable sweetness to the heart."
        },

        ambar: {
            icon: "✦",
            ptTitle: "Âmbar",
            enTitle: "Amber",
            ptText: "Quente e envolvente, ajuda a criar profundidade e sensação de conforto.",
            enText: "Warm and enveloping, helping create depth and a sense of comfort."
        },

        sandalo: {
            icon: "🪵",
            ptTitle: "Sândalo",
            enTitle: "Sandalwood",
            ptText: "Amadeirado cremoso e macio que sustenta a base com elegância.",
            enText: "A creamy, soft woody note that supports the base with elegance."
        },

        baunilha: {
            icon: "☁",
            ptTitle: "Baunilha",
            enTitle: "Vanilla",
            ptText: "Doce e confortável, arredonda a base com uma sensação macia e acolhedora.",
            enText: "Sweet and comforting, rounding out the base with a soft, cozy feeling."
        },

        tonka: {
            icon: "♡",
            ptTitle: "Fava Tonka",
            enTitle: "Tonka Bean",
            ptText: "Uma nuance quente, adocicada e cremosa que reforça o lado envolvente.",
            enText: "A warm, sweet and creamy nuance that reinforces the enveloping character."
        },

        musk: {
            icon: "☾",
            ptTitle: "Musk",
            enTitle: "Musk",
            ptText: "Macio e confortável, cria uma assinatura limpa e delicada na base.",
            enText: "Soft and comfortable, creating a clean and delicate signature in the base."
        },

        top: {
            icon: "✦",
            ptTitle: "Notas de saída",
            enTitle: "Top notes",
            ptText: "A abertura traz uma sensação fresca, luminosa e delicadamente frutada.",
            enText: "The opening brings a fresh, bright and delicately fruity sensation."
        },

        heart: {
            icon: "♡",
            ptTitle: "Notas de corpo",
            enTitle: "Heart notes",
            ptText: "O coração revela o lado floral, romântico e elegante de Dream Amor no Ar.",
            enText: "The heart reveals the floral, romantic and elegant side of Dream Love in the Air."
        },

        base: {
            icon: "☾",
            ptTitle: "Notas de fundo",
            enTitle: "Base notes",
            ptText: "A base traz conforto e profundidade, deixando uma assinatura suave e envolvente.",
            enText: "The base brings comfort and depth, leaving a soft and enveloping signature."
        }

    };

    let activeNoteKey = null;


    function renderNoteModal(
        noteKey
    ) {

        const data =
            noteData[noteKey];

        if (
            !data ||
            !noteModal
        ) {
            return false;
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

        return true;

    }


    function openNoteModal(
        noteKey
    ) {

        if (
            !renderNoteModal(
                noteKey
            )
        ) {
            return;
        }

        activeNoteKey =
            noteKey;

        openLayer(
            noteModal
        );

    }


    $$('[data-note]').forEach(
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

                    activeNoteKey =
                        null;

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

                activeNoteKey =
                    null;

            }

        }
    );


    window.addEventListener(
        "dream-language-change",
        () => {

            if (activeNoteKey) {
                renderNoteModal(
                    activeNoteKey
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
            max: 1,

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
            max: 3,

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
            max: 6,

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
            max: Infinity,

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
                timelineStages.length - 1
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
                value - min
            ) /
            (
                max - min
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