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

    element.classList.add("open");

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
   CONHECER / VER PRODUTO
========================================================= */

function openProductModal() {

    if (!productModal) {

        console.error(
            "Dream: #productModal não encontrado."
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
        "active",
        "visible"
    );

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


function bindProductButtons() {

    $$(".open-product, [data-open-product]").forEach(
        button => {

            if (
                button.dataset.dreamProductBound ===
                "true"
            ) {
                return;
            }

            button.dataset.dreamProductBound =
                "true";

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


    $$(".close-product, [data-close-product]").forEach(
        button => {

            if (
                button.dataset.dreamProductCloseBound ===
                "true"
            ) {
                return;
            }

            button.dataset.dreamProductCloseBound =
                "true";

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

}


bindProductButtons();


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

const favoriteButton =
    $("#favoriteButton");

const favoriteModalButton =
    $("#favoriteModal");

let productFavorite =
    storage.get(
        "dreamFavorite",
        "false"
    ) === "true";


function favoriteLabel() {

    if (productFavorite) {

        return currentLanguage === "pt-BR"
            ? "♥ Favoritado"
            : "♥ Favorited";

    }

    return currentLanguage === "pt-BR"
        ? "♡ Favoritar"
        : "♡ Favorite";

}


function applyFavoriteState(
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

    button.textContent =
        favoriteLabel();

}


function updateFavoriteButtons() {

    applyFavoriteState(
        favoriteButton
    );

    applyFavoriteState(
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

    updateFavoriteButtons();

    showToast(
        productFavorite
            ? (
                currentLanguage === "pt-BR"
                    ? "Produto favoritado ♡"
                    : "Product favorited ♡"
            )
            : (
                currentLanguage === "pt-BR"
                    ? "Removido dos favoritos"
                    : "Removed from favorites"
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

updateFavoriteButtons();


window.addEventListener(
    "dream-language-change",
    updateFavoriteButtons
);


/* =========================================================
   COMPARTILHAR MODAL
========================================================= */

$("#shareModal")?.addEventListener(
    "click",
    async event => {

        event.preventDefault();

        const shareData = {

            title:
                "Dream Amor no Ar",

            text:
                currentLanguage === "pt-BR"
                    ? "Conheça Dream Amor no Ar ♡"
                    : "Discover Dream Love in the Air ♡",

            url:
                location.href

        };

        try {

            if (
                navigator.share
            ) {

                await navigator.share(
                    shareData
                );

            } else {

                await navigator.clipboard.writeText(
                    location.href
                );

                showToast(
                    currentLanguage === "pt-BR"
                        ? "Link copiado ♡"
                        : "Link copied ♡"
                );

            }

        } catch {}

    }
);


/* =========================================================
   DREAM STUDIO — CLIQUE FORA
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !settingsPanel ||
            !settingsPanel.classList.contains(
                "open"
            )
        ) {
            return;
        }

        if (
            settingsPanel.contains(
                event.target
            ) ||
            $("#settingsButton")?.contains(
                event.target
            )
        ) {
            return;
        }

        closeStudio();

    }
);


/* =========================================================
   BORRIFADOR
========================================================= */

const heroProduct =
    $("#heroProduct");

const sprayButton =
    $("#sprayButton");

const sprayCounter =
    $("#sprayCounter");

const sprayCounterCard =
    $(".spray-counter-card");

const sprayArea =
    $("#sprayArea");

const sprayWave =
    $("#sprayWave");

const sprayGlow =
    $("#sprayGlow") ||
    $(".spray-glow");

const perfumeBottle =
    $("#mainBottle");

const productHalo =
    $("#productHalo");

let sprayBusy =
    false;

let sprayCount =
    Number(
        storage.get(
            "dreamSprayCount",
            0
        )
    ) || 0;


function updateSprayCounter() {

    if (!sprayCounter) {
        return;
    }

    sprayCounter.textContent =
        String(sprayCount);

}


updateSprayCounter();


/* =========================================================
   SOM DO BORRIFADOR
========================================================= */

let sprayAudio =
    null;

let sprayStopTimer =
    null;


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
        .78;

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


function playSpraySound() {

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

    clearTimeout(
        sprayStopTimer
    );

    try {

        audio.pause();

        audio.currentTime =
            0;

        audio.volume =
            .78;

        const promise =
            audio.play();

        promise?.catch?.(
            () => {}
        );

        /*
           Para o efeito não tocar um arquivo
           excessivamente longo.
        */

        sprayStopTimer =
            setTimeout(
                () => {

                    try {

                        audio.pause();

                        audio.currentTime =
                            0;

                    } catch {}

                },
                450
            );

    } catch {}

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
   EFEITOS DO SPRAY
========================================================= */

function sprayIntensity() {

    return clamp(
        $("#sprayIntensityRange")
            ?.value ||
        storage.get(
            "dreamSprayIntensity",
            100
        ),
        40,
        160
    ) / 100;

}


function restartAnimation(
    element,
    className
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
        () => {

            flash.remove();

        },
        700
    );

}


function createSprayMist() {

    if (!sprayArea) {
        return;
    }

    const factor =
        sprayIntensity();

    const amount =
        Math.round(
            (
                window.innerWidth <= 650
                    ? 27
                    : 52
            ) *
            factor
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
                Math.random() -
                .5
            ) *
            340 *
            factor;


        const y =
            -(
                28 +
                Math.random() *
                235
            ) *
            factor;


        const size =
            (
                3 +
                Math.random() *
                10
            ) *
            Math.max(
                .8,
                factor
            );


        const blur =
            1 +
            Math.random() *
            3;


        const duration =
            .72 +
            Math.random() *
            .72;


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
            `${Math.random() * .09}s`;


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


function createSpraySymbols() {

    if (!sprayArea) {
        return;
    }

    const symbols = [
        "♡",
        "✦",
        "✧"
    ];

    const factor =
        sprayIntensity();

    const amount =
        Math.round(
            (
                window.innerWidth <= 650
                    ? 5
                    : 9
            ) *
            Math.max(
                .75,
                factor
            )
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const symbol =
            document.createElement(
                "span"
            );

        symbol.className =
            "spray-symbol-particle";

        symbol.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        symbol.style.fontSize =
            `${
                8 +
                Math.random() *
                12
            }px`;


        symbol.style.setProperty(
            "--symbol-x",
            `${
                (
                    Math.random() -
                    .5
                ) *
                240 *
                factor
            }px`
        );


        symbol.style.setProperty(
            "--symbol-y",
            `${
                -50 -
                Math.random() *
                150 *
                factor
            }px`
        );


        symbol.style.setProperty(
            "--symbol-rotate",
            `${
                -90 +
                Math.random() *
                180
            }deg`
        );


        sprayArea.appendChild(
            symbol
        );


        setTimeout(
            () => {

                symbol.remove();

            },
            1600
        );

    }

}


function triggerSprayUI() {

    restartAnimation(
        sprayWave,
        "active"
    );

    restartAnimation(
        sprayGlow,
        "active"
    );

    restartAnimation(
        heroProduct,
        "spraying"
    );

    restartAnimation(
        sprayButton,
        "spraying"
    );

    restartAnimation(
        sprayCounterCard,
        "pulse"
    );

    restartAnimation(
        productHalo,
        "spraying"
    );

}


async function sprayDream(
    event = null
) {

    event?.preventDefault?.();

    if (
        sprayBusy ||
        !sprayArea
    ) {
        return;
    }

    sprayBusy =
        true;

    sprayButton?.setAttribute(
        "aria-busy",
        "true"
    );


    triggerSprayUI();

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


    const haptic =
        $("#hapticToggle");


    const hapticEnabled =
        haptic
            ? haptic.checked
            : storage.get(
                "dreamHaptic",
                "true"
            ) !== "false";


    if (
        hapticEnabled &&
        navigator.vibrate
    ) {

        navigator.vibrate(
            [
                18,
                18,
                12
            ]
        );

    }


    await new Promise(
        resolve => {

            setTimeout(
                resolve,
                760
            );

        }
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


    sprayBusy =
        false;

}


sprayButton?.addEventListener(
    "click",
    sprayDream
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

        ptText:
            "A bergamota abre a fragrância com um frescor cítrico, luminoso e elegante.",

        enText:
            "Bergamot opens the fragrance with a fresh, bright and elegant citrus touch."

    },


    laranja: {

        icon: "🍊",

        ptTitle: "Laranja",

        enTitle: "Orange",

        ptText:
            "A laranja traz uma saída suculenta, leve e vibrante.",

        enText:
            "Orange brings a juicy, light and vibrant opening."

    },


    mandarina: {

        icon: "🍊",

        ptTitle: "Mandarina",

        enTitle: "Mandarin",

        ptText:
            "A mandarina adiciona uma sensação cítrica doce, delicada e alegre.",

        enText:
            "Mandarin adds a sweet, delicate and cheerful citrus sensation."

    },


    limao: {

        icon: "🍋",

        ptTitle: "Limão",

        enTitle: "Lemon",

        ptText:
            "O limão reforça a sensação de frescor e luminosidade da abertura.",

        enText:
            "Lemon reinforces the fresh and bright feeling of the opening."

    },


    cassis: {

        icon: "🫐",

        ptTitle: "Cassis",

        enTitle: "Blackcurrant",

        ptText:
            "O cassis acrescenta um toque frutado mais marcante e levemente adocicado.",

        enText:
            "Blackcurrant adds a richer and slightly sweet fruity touch."

    },


    maca: {

        icon: "🍎",

        ptTitle: "Maçã",

        enTitle: "Apple",

        ptText:
            "A maçã acrescenta uma faceta frutada, crocante e confortável.",

        enText:
            "Apple adds a fruity, crisp and comfortable facet."

    },


    rosa: {

        icon: "🌹",

        ptTitle: "Rosa",

        enTitle: "Rose",

        ptText:
            "A rosa revela a personalidade romântica e delicada da fragrância.",

        enText:
            "Rose reveals the romantic and delicate personality of the fragrance."

    },


    tilia: {

        icon: "🌼",

        ptTitle: "Tília",

        enTitle: "Linden",

        ptText:
            "A tília reforça a suavidade floral com uma sensação luminosa e confortável.",

        enText:
            "Linden reinforces the floral softness with a bright and comfortable feeling."

    },


    freesia: {

        icon: "🌸",

        ptTitle: "Frésia",

        enTitle: "Freesia",

        ptText:
            "A frésia entrega um floral limpo, delicado e levemente arejado.",

        enText:
            "Freesia delivers a clean, delicate and lightly airy floral note."

    },


    lotus: {

        icon: "🪷",

        ptTitle: "Flor de Lótus",

        enTitle: "Lotus Flower",

        ptText:
            "A flor de lótus adiciona leveza aquosa e uma sensação suave ao coração.",

        enText:
            "Lotus flower adds an airy aquatic softness to the heart."

    },


    gardenia: {

        icon: "🌼",

        ptTitle: "Gardênia",

        enTitle: "Gardenia",

        ptText:
            "A gardênia deixa o coração mais cremoso, elegante e envolvente.",

        enText:
            "Gardenia makes the heart creamier, elegant and enveloping."

    },


    pessego: {

        icon: "🍑",

        ptTitle: "Pêssego",

        enTitle: "Peach",

        ptText:
            "O pêssego traz maciez frutada e uma doçura confortável.",

        enText:
            "Peach brings fruity softness and a comfortable sweetness."

    },


    ambar: {

        icon: "✨",

        ptTitle: "Âmbar",

        enTitle: "Amber",

        ptText:
            "O âmbar acrescenta calor e profundidade à assinatura final de Dream.",

        enText:
            "Amber adds warmth and depth to Dream's final signature."

    },


    sandalo: {

        icon: "🪵",

        ptTitle: "Sândalo",

        enTitle: "Sandalwood",

        ptText:
            "O sândalo cria uma base cremosa, macia e levemente amadeirada.",

        enText:
            "Sandalwood creates a creamy, soft and lightly woody base."

    },


    baunilha: {

        icon: "🤍",

        ptTitle: "Baunilha",

        enTitle: "Vanilla",

        ptText:
            "A baunilha envolve a fragrância com uma doçura suave e confortável.",

        enText:
            "Vanilla wraps the fragrance in a soft and comfortable sweetness."

    },


    tonka: {

        icon: "✦",

        ptTitle: "Fava Tonka",

        enTitle: "Tonka Bean",

        ptText:
            "A fava tonka acrescenta uma doçura quente, cremosa e sofisticada.",

        enText:
            "Tonka bean adds a warm, creamy and sophisticated sweetness."

    },


    musk: {

        icon: "☁",

        ptTitle: "Musk",

        enTitle: "Musk",

        ptText:
            "O musk finaliza a fragrância com uma sensação limpa, macia e confortável.",

        enText:
            "Musk finishes the fragrance with a clean, soft and comfortable sensation."

    }

};


/* =========================================================
   MODAL DAS NOTAS
========================================================= */

const noteModalIcon =
    $("#noteModalIcon");

const noteModalTitle =
    $("#noteModalTitle");

const noteModalText =
    $("#noteModalText");


function openNoteModal(
    name
) {

    const note =
        noteData[name];

    if (
        !note ||
        !noteModal
    ) {
        return;
    }


    if (noteModalIcon) {

        noteModalIcon.textContent =
            note.icon;

    }


    if (noteModalTitle) {

        noteModalTitle.textContent =
            currentLanguage === "pt-BR"
                ? note.ptTitle
                : note.enTitle;

    }


    if (noteModalText) {

        noteModalText.textContent =
            currentLanguage === "pt-BR"
                ? note.ptText
                : note.enText;

    }


    noteModal.dataset.note =
        name;


    openLayer(
        noteModal
    );

}


function closeNoteModal() {

    closeLayer(
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


$$(".close-note").forEach(
    button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                closeNoteModal();

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

            closeNoteModal();

        }

    }
);


window.addEventListener(
    "dream-language-change",
    () => {

        if (
            !noteModal ||
            !noteModal.classList.contains(
                "open"
            )
        ) {
            return;
        }

        openNoteModal(
            noteModal.dataset.note
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
        hour: "0h",

        icon: "🍊",

        ptTitle:
            "Abertura fresca",

        enTitle:
            "Fresh opening",

        ptText:
            "Cítricos e frutas aparecem primeiro.",

        enText:
            "Citrus and fruits appear first."
    },


    {
        hour: "1h",

        icon: "🍑",

        ptTitle:
            "Frutado delicado",

        enTitle:
            "Delicate fruitiness",

        ptText:
            "As frutas ficam mais suaves e confortáveis.",

        enText:
            "The fruity notes become softer and more comfortable."
    },


    {
        hour: "2h",

        icon: "🌸",

        ptTitle:
            "Flores surgindo",

        enTitle:
            "Flowers emerging",

        ptText:
            "O coração floral começa a ganhar espaço.",

        enText:
            "The floral heart starts to take over."
    },


    {
        hour: "3h",

        icon: "🌹",

        ptTitle:
            "Coração romântico",

        enTitle:
            "Romantic heart",

        ptText:
            "Rosa, frésia e flores revelam o lado romântico.",

        enText:
            "Rose, freesia and flowers reveal the romantic side."
    },


    {
        hour: "4h",

        icon: "♡",

        ptTitle:
            "Dream em equilíbrio",

        enTitle:
            "Dream in balance",

        ptText:
            "Flores e fundo confortável se encontram.",

        enText:
            "Florals and the comfortable base meet."
    },


    {
        hour: "5h",

        icon: "✨",

        ptTitle:
            "Base envolvente",

        enTitle:
            "Enveloping base",

        ptText:
            "Âmbar e madeiras começam a aparecer.",

        enText:
            "Amber and woods begin to emerge."
    },


    {
        hour: "6h",

        icon: "🤍",

        ptTitle:
            "Doçura suave",

        enTitle:
            "Soft sweetness",

        ptText:
            "Baunilha e tonka deixam a fragrância mais aconchegante.",

        enText:
            "Vanilla and tonka make the fragrance cozier."
    },


    {
        hour: "7h",

        icon: "☁",

        ptTitle:
            "Conforto",

        enTitle:
            "Comfort",

        ptText:
            "O perfume fica mais macio e próximo da pele.",

        enText:
            "The fragrance becomes softer and closer to the skin."
    },


    {
        hour: "8h",

        icon: "☾",

        ptTitle:
            "Assinatura Dream",

        enTitle:
            "Dream signature",

        ptText:
            "Uma presença delicada, cremosa e confortável permanece.",

        enText:
            "A delicate, creamy and comfortable presence remains."
    }

];


function updateTimeline() {

    if (!timelineSlider) {
        return;
    }

    const index =
        clamp(
            timelineSlider.value,
            0,
            timelineStages.length - 1
        );


    const stage =
        timelineStages[index];


    if (timelineHour) {

        timelineHour.textContent =
            stage.hour;

    }


    if (timelineIcon) {

        timelineIcon.textContent =
            stage.icon;

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


timelineSlider?.addEventListener(
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

        dark:
            false
    },


    sonhador: {

        primary:
            "#b993e8",

        secondary:
            "#739ce8",

        dark:
            false
    },


    noturno: {

        primary:
            "#b16ad9",

        secondary:
            "#4338ca",

        dark:
            true
    },


    energia: {

        primary:
            "#f05f91",

        secondary:
            "#8b5cf6",

        dark:
            false
    },


    calmo: {

        primary:
            "#5bc4b1",

        secondary:
            "#7297d8",

        dark:
            false
    }

};


let currentMood =
    storage.get(
        "dreamMood",
        "romantico"
    );


function applyMood(
    moodName,
    notify = true
) {

    const mood =
        moods[moodName];

    if (!mood) {
        return;
    }


    currentMood =
        moodName;


    storage.set(
        "dreamMood",
        moodName
    );


    applyColors(
        mood.primary,
        mood.secondary
    );


    setDark(
        mood.dark
    );


    $$("[data-mood]").forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.mood ===
                moodName
            );

        }
    );


    if (notify) {

        showToast(
            currentLanguage === "pt-BR"
                ? "Mood aplicado ✦"
                : "Mood applied ✦"
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

const dreamMomentTitle =
    $("#dreamMomentTitle");

const dreamMomentText =
    $("#dreamMomentText");

const dreamMomentButton =
    $("#newDreamMoment");


const dreamMoments = [

    {
        ptTitle:
            "Deixe o momento acontecer.",

        enTitle:
            "Let the moment happen.",

        ptText:
            "Nem toda lembrança especial precisa ser planejada.",

        enText:
            "Not every special memory needs to be planned."
    },


    {
        ptTitle:
            "O amor mora nos detalhes.",

        enTitle:
            "Love lives in the details.",

        ptText:
            "Às vezes, um pequeno gesto muda completamente o dia.",

        enText:
            "Sometimes a small gesture can completely change your day."
    },


    {
        ptTitle:
            "Guarde essa sensação.",

        enTitle:
            "Keep this feeling.",

        ptText:
            "Alguns momentos ficam na memória pela forma como fizeram você se sentir.",

        enText:
            "Some moments stay in your memory because of the way they made you feel."
    },


    {
        ptTitle:
            "Seu Dream, seu momento.",

        enTitle:
            "Your Dream, your moment.",

        ptText:
            "Transforme algo simples em uma lembrança que vale guardar.",

        enText:
            "Turn something simple into a memory worth keeping."
    },


    {
        ptTitle:
            "Deixe o amor no ar.",

        enTitle:
            "Leave love in the air.",

        ptText:
            "Uma fragrância também pode fazer parte de uma história.",

        enText:
            "A fragrance can become part of a story too."
    }

];


let lastDreamMoment =
    -1;


function generateDreamMoment() {

    if (
        !dreamMomentTitle ||
        !dreamMomentText
    ) {
        return;
    }


    let index =
        Math.floor(
            Math.random() *
            dreamMoments.length
        );


    if (
        dreamMoments.length > 1 &&
        index === lastDreamMoment
    ) {

        index =
            (
                index + 1
            ) %
            dreamMoments.length;

    }


    lastDreamMoment =
        index;


    const moment =
        dreamMoments[index];


    dreamMomentTitle.textContent =
        currentLanguage === "pt-BR"
            ? moment.ptTitle
            : moment.enTitle;


    dreamMomentText.textContent =
        currentLanguage === "pt-BR"
            ? moment.ptText
            : moment.enText;


    dreamMomentTitle.animate?.(
        [
            {
                opacity: 0,
                transform: "translateY(5px)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],
        {
            duration: 350,
            easing: "ease"
        }
    );

}


dreamMomentButton?.addEventListener(
    "click",
    event => {

        event.preventDefault();

        generateDreamMoment();

    }
);


/* =========================================================
   CARDS 3D
========================================================= */

const motionCards =
    $$(".moment-card");


function motion3dEnabled() {

    const toggle =
        $("#motion3dToggle");

    if (toggle) {

        return toggle.checked;

    }

    return storage.get(
        "dreamMotion3D",
        "true"
    ) !== "false";

}


function motionIntensity() {

    return clamp(
        $("#motion3dRange")?.value ||
        storage.get(
            "dreamMotion3DIntensity",
            100
        ),
        0,
        150
    ) / 100;

}


motionCards.forEach(
    card => {

        card.addEventListener(
            "pointermove",
            event => {

                if (
                    !motion3dEnabled() ||
                    window.innerWidth <= 900
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
                    .5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    .5;


                const strength =
                    8 *
                    motionIntensity();


                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(${-
                        y *
                        strength
                    }deg)
                    rotateY(${
                        x *
                        strength
                    }deg)
                    translateY(-4px)
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
   3D DO FRASCO
========================================================= */

heroProduct?.addEventListener(
    "pointermove",
    event => {

        if (
            !motion3dEnabled() ||
            window.innerWidth <= 900 ||
            !perfumeBottle
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
            .5;


        const y =
            (
                event.clientY -
                rect.top
            ) /
            rect.height -
            .5;


        const strength =
            10 *
            motionIntensity();


        perfumeBottle.style.transform =
            `
            rotateX(${-
                y *
                strength
            }deg)
            rotateY(${
                x *
                strength
            }deg)
            translate3d(
                ${x * 5}px,
                ${y * 5}px,
                18px
            )
            `;

    }
);


heroProduct?.addEventListener(
    "pointerleave",
    () => {

        if (perfumeBottle) {

            perfumeBottle.style.transform =
                "";

        }

    }
);


/* =========================================================
   CENÁRIOS
========================================================= */

const dreamScene =
    $("#dream-scene");

const sceneBackground =
    $(".dream-scene-bg");

const sceneResultIcon =
    $("#sceneResultIcon");

const sceneResultMini =
    $("#sceneResultMini");

const sceneResultTitle =
    $("#sceneResultTitle");

const sceneResultText =
    $("#sceneResultText");


const scenes = {

    romance: {

        icon:
            "♡",

        ptMini:
            "ROMANCE DREAM",

        enMini:
            "DREAM ROMANCE",

        ptTitle:
            "Amor está no ar.",

        enTitle:
            "Love is in the air.",

        ptText:
            "Uma atmosfera delicada, rosa e envolvente.",

        enText:
            "A delicate, pink and enveloping atmosphere.",

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

        ptMini:
            "CÉU DREAM",

        enMini:
            "DREAM SKY",

        ptTitle:
            "Sonhe mais alto.",

        enTitle:
            "Dream higher.",

        ptText:
            "Azul, lilás e luz para uma atmosfera tranquila e sonhadora.",

        enText:
            "Blue, lilac and light for a calm, dreamy atmosphere.",

        background:
            `
            radial-gradient(
                circle at 25% 30%,
                rgba(93,173,226,.42),
                transparent 38%
            ),
            radial-gradient(
                circle at 78% 48%,
                rgba(135,111,217,.40),
                transparent 42%
            ),
            linear-gradient(
                135deg,
                #11162f,
                #241744
            )
            `

    },


    flores: {

        icon:
            "✿",

        ptMini:
            "FLORES DREAM",

        enMini:
            "DREAM FLOWERS",

        ptTitle:
            "Flores em todos os detalhes.",

        enTitle:
            "Flowers in every detail.",

        ptText:
            "Uma atmosfera floral, luminosa e romântica.",

        enText:
            "A floral, bright and romantic atmosphere.",

        background:
            `
            radial-gradient(
                circle at 20% 45%,
                rgba(246,148,181,.48),
                transparent 38%
            ),
            radial-gradient(
                circle at 75% 35%,
                rgba(241,196,211,.28),
                transparent 40%
            ),
            linear-gradient(
                135deg,
                #2e1523,
                #49203b
            )
            `

    },


    energia: {

        icon:
            "✦",

        ptMini:
            "ENERGIA DREAM",

        enMini:
            "DREAM ENERGY",

        ptTitle:
            "Faça o momento acontecer.",

        enTitle:
            "Make the moment happen.",

        ptText:
            "Uma atmosfera vibrante, intensa e cheia de personalidade.",

        enText:
            "A vibrant, intense atmosphere full of personality.",

        background:
            `
            radial-gradient(
                circle at 18% 40%,
                rgba(244,63,94,.45),
                transparent 38%
            ),
            radial-gradient(
                circle at 82% 42%,
                rgba(124,58,237,.45),
                transparent 42%
            ),
            linear-gradient(
                135deg,
                #240d1e,
                #221450
            )
            `

    }

};


let currentScene =
    "romance";


function applyScene(
    name
) {

    const scene =
        scenes[name];

    if (!scene) {
        return;
    }


    currentScene =
        name;


    $$("[data-scene]").forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.scene ===
                name
            );

        }
    );


    if (sceneResultIcon) {

        sceneResultIcon.textContent =
            scene.icon;

    }


    if (sceneResultMini) {

        sceneResultMini.textContent =
            currentLanguage === "pt-BR"
                ? scene.ptMini
                : scene.enMini;

    }


    if (sceneResultTitle) {

        sceneResultTitle.textContent =
            currentLanguage === "pt-BR"
                ? scene.ptTitle
                : scene.enTitle;

    }


    if (sceneResultText) {

        sceneResultText.textContent =
            currentLanguage === "pt-BR"
                ? scene.ptText
                : scene.enText;

    }


    if (sceneBackground) {

        sceneBackground.style.background =
            scene.background;

    }

}


$$("[data-scene]").forEach(
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

        applyScene(
            currentScene
        );

    }
);


applyScene(
    currentScene
);


/* =========================================================
   GALERIA
========================================================= */

const galleryTrack =
    $("#galleryTrack");

const galleryItems =
    galleryTrack
        ? $$(".gallery-item", galleryTrack)
        : [];

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

const galleryAutoplayProgress =
    $("#galleryAutoplayProgress");


let galleryIndex =
    0;

let galleryTimer =
    null;

let galleryProgressTimer =
    null;

let galleryAutoplayEnabled =
    false;

let galleryDrag =
    false;

let galleryStartX =
    0;

let galleryStartScroll =
    0;


function galleryNumber(
    number
) {

    return String(
        number
    ).padStart(
        2,
        "0"
    );

}


function updateGalleryUI() {

    if (galleryCurrent) {

        galleryCurrent.textContent =
            galleryNumber(
                galleryIndex + 1
            );

    }


    if (galleryTotal) {

        galleryTotal.textContent =
            galleryNumber(
                galleryItems.length
            );

    }


    $$(".gallery-dot").forEach(
        (
            dot,
            index
        ) => {

            dot.classList.toggle(
                "active",
                index === galleryIndex
            );

        }
    );

}


function scrollGalleryTo(
    index,
    smooth = true
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
        galleryItems[galleryIndex];


    galleryTrack.scrollTo({

        left:
            item.offsetLeft -
            (
                galleryTrack.clientWidth -
                item.clientWidth
            ) / 2,

        behavior:
            smooth &&
            !body.classList.contains(
                "no-animations"
            )
                ? "smooth"
                : "auto"

    });


    updateGalleryUI();

}


function nextGallery() {

    scrollGalleryTo(
        galleryIndex + 1
    );

}


function previousGallery() {

    scrollGalleryTo(
        galleryIndex - 1
    );

}


galleryPrev?.addEventListener(
    "click",
    event => {

        event.preventDefault();

        previousGallery();

        restartGalleryAutoplay();

    }
);


galleryNext?.addEventListener(
    "click",
    event => {

        event.preventDefault();

        nextGallery();

        restartGalleryAutoplay();

    }
);


/* =========================================================
   DOTS DA GALERIA
========================================================= */

function createGalleryDots() {

    if (!galleryDots) {
        return;
    }


    galleryDots.innerHTML =
        "";


    galleryItems.forEach(
        (
            item,
            index
        ) => {

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
                `Slide ${index + 1}`
            );


            button.addEventListener(
                "click",
                () => {

                    scrollGalleryTo(
                        index
                    );

                    restartGalleryAutoplay();

                }
            );


            galleryDots.appendChild(
                button
            );

        }
    );


    updateGalleryUI();

}


createGalleryDots();


/* =========================================================
   DRAG DA GALERIA
========================================================= */

galleryTrack?.addEventListener(
    "pointerdown",
    event => {

        if (
            event.pointerType ===
            "touch"
        ) {
            return;
        }


        galleryDrag =
            true;


        galleryStartX =
            event.clientX;


        galleryStartScroll =
            galleryTrack.scrollLeft;


        galleryTrack.classList.add(
            "dragging"
        );


        galleryTrack.setPointerCapture?.(
            event.pointerId
        );

    }
);


galleryTrack?.addEventListener(
    "pointermove",
    event => {

        if (!galleryDrag) {
            return;
        }


        const distance =
            event.clientX -
            galleryStartX;


        galleryTrack.scrollLeft =
            galleryStartScroll -
            distance;

    }
);


function finishGalleryDrag() {

    if (!galleryDrag) {
        return;
    }


    galleryDrag =
        false;


    galleryTrack?.classList.remove(
        "dragging"
    );


    updateGalleryIndexFromScroll();

}


galleryTrack?.addEventListener(
    "pointerup",
    finishGalleryDrag
);


galleryTrack?.addEventListener(
    "pointercancel",
    finishGalleryDrag
);


galleryTrack?.addEventListener(
    "pointerleave",
    () => {

        if (galleryDrag) {

            finishGalleryDrag();

        }

    }
);


/* =========================================================
   INDEX DA GALERIA
========================================================= */

function updateGalleryIndexFromScroll() {

    if (
        !galleryTrack ||
        !galleryItems.length
    ) {
        return;
    }


    const center =
        galleryTrack.scrollLeft +
        galleryTrack.clientWidth /
        2;


    let closestIndex =
        0;

    let closestDistance =
        Infinity;


    galleryItems.forEach(
        (
            item,
            index
        ) => {

            const itemCenter =
                item.offsetLeft +
                item.clientWidth /
                2;


            const distance =
                Math.abs(
                    center -
                    itemCenter
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
                updateGalleryIndexFromScroll,
                80
            );

    },
    {
        passive: true
    }
);


/* =========================================================
   AUTOPLAY DA GALERIA
========================================================= */

function resetGalleryProgress() {

    if (!galleryAutoplayProgress) {
        return;
    }


    galleryAutoplayProgress.style.transition =
        "none";


    galleryAutoplayProgress.style.width =
        "0%";


    void galleryAutoplayProgress.offsetWidth;


    if (
        !galleryAutoplayEnabled
    ) {
        return;
    }


    galleryAutoplayProgress.style.transition =
        "width 4.5s linear";


    galleryAutoplayProgress.style.width =
        "100%";

}


function stopGalleryAutoplay() {

    galleryAutoplayEnabled =
        false;


    clearInterval(
        galleryTimer
    );


    clearTimeout(
        galleryProgressTimer
    );


    galleryTimer =
        null;


    if (galleryAutoplay) {

        galleryAutoplay.textContent =
            currentLanguage === "pt-BR"
                ? "▶ Autoplay"
                : "▶ Autoplay";

    }


    if (galleryAutoplayProgress) {

        galleryAutoplayProgress.style.transition =
            "none";

        galleryAutoplayProgress.style.width =
            "0%";

    }

}


function startGalleryAutoplay() {

    if (
        galleryItems.length <= 1
    ) {
        return;
    }


    galleryAutoplayEnabled =
        true;


    clearInterval(
        galleryTimer
    );


    if (galleryAutoplay) {

        galleryAutoplay.textContent =
            currentLanguage === "pt-BR"
                ? "❚❚ Pausar"
                : "❚❚ Pause";

    }


    resetGalleryProgress();


    galleryTimer =
        setInterval(
            () => {

                nextGallery();

                resetGalleryProgress();

            },
            4500
        );

}


function restartGalleryAutoplay() {

    if (
        !galleryAutoplayEnabled
    ) {
        return;
    }


    startGalleryAutoplay();

}


galleryAutoplay?.addEventListener(
    "click",
    event => {

        event.preventDefault();


        if (
            galleryAutoplayEnabled
        ) {

            stopGalleryAutoplay();

        } else {

            startGalleryAutoplay();

        }

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

const lightboxBackdrop =
    $("#lightboxBackdrop");

const lightboxPrev =
    $("#lightboxPrev");

const lightboxNext =
    $("#lightboxNext");


let lightboxIndex =
    0;


function galleryItemTitle(
    item
) {

    const title =
        item.querySelector(
            "h3"
        );


    return title
        ?.textContent
        ?.trim() ||
        "Dream";

}


function updateLightbox() {

    const item =
        galleryItems[
            lightboxIndex
        ];


    if (!item) {
        return;
    }


    const image =
        item.querySelector(
            "img"
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
            "Dream";

    }


    if (lightboxTitle) {

        lightboxTitle.textContent =
            galleryItemTitle(
                item
            );

    }


    if (lightboxCounter) {

        lightboxCounter.textContent =
            `${
                galleryNumber(
                    lightboxIndex + 1
                )
            } / ${
                galleryNumber(
                    galleryItems.length
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


function previousLightbox() {

    lightboxIndex =
        (
            lightboxIndex -
            1 +
            galleryItems.length
        ) %
        galleryItems.length;


    updateLightbox();

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


galleryItems.forEach(
    (
        item,
        index
    ) => {

        item.addEventListener(
            "click",
            event => {

                /*
                   Evita abrir quando o usuário
                   acabou de arrastar a galeria.
                */

                if (galleryDrag) {
                    return;
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

        previousLightbox();

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
   FIM DA PARTE 2
========================================================= */
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
    $("#restartQuiz");

const applyQuizMoodButton =
    $("#applyQuizMood");

const shareQuizButton =
    $("#shareQuizResult");


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


    if (quizStart) {

        quizStart.hidden =
            true;

    }


    if (quizQuestionsContainer) {

        quizQuestionsContainer.hidden =
            false;

    }


    if (quizResult) {

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


    if (!question) {

        finishQuiz();

        return;

    }


    if (quizQuestion) {

        quizQuestion.textContent =
            currentLanguage === "pt-BR"
                ? question.pt
                : question.en;

    }


    if (quizStep) {

        quizStep.textContent =
            `${quizIndex + 1} / ${quizQuestions.length}`;

    }


    if (quizProgressBar) {

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


    if (!quizOptions) {
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

    if (quizQuestionsContainer) {

        quizQuestionsContainer.hidden =
            true;

    }


    if (quizResult) {

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


    if (!result) {
        return;
    }


    if (quizResultIcon) {

        quizResultIcon.textContent =
            result.icon;

    }


    if (quizResultTitle) {

        quizResultTitle.textContent =
            currentLanguage === "pt-BR"
                ? result.titlePt
                : result.titleEn;

    }


    if (quizResultText) {

        quizResultText.textContent =
            currentLanguage === "pt-BR"
                ? result.textPt
                : result.textEn;

    }


    quizResult?.animate?.(
        [
            {
                opacity:
                    0,

                transform:
                    "translateY(10px)"
            },

            {
                opacity:
                    1,

                transform:
                    "translateY(0)"
            }
        ],
        {
            duration:
                420,

            easing:
                "ease"
        }
    );

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


        if (!quizWinner) {
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


        if (!quizWinner) {
            return;
        }


        const result =
            quizResults[
                quizWinner
            ];


        if (!result) {
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

            if (navigator.share) {

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
   QUIZ + TROCA DE IDIOMA
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


            if (!result) {
                return;
            }


            if (quizResultTitle) {

                quizResultTitle.textContent =
                    currentLanguage === "pt-BR"
                        ? result.titlePt
                        : result.titleEn;

            }


            if (quizResultText) {

                quizResultText.textContent =
                    currentLanguage === "pt-BR"
                        ? result.textPt
                        : result.textEn;

            }

        }


        if (
            galleryAutoplayEnabled &&
            galleryAutoplay
        ) {

            galleryAutoplay.textContent =
                currentLanguage === "pt-BR"
                    ? "❚❚ Pausar"
                    : "❚❚ Pause";

        }


        if (
            lightbox?.classList.contains(
                "open"
            )
        ) {

            updateLightbox();

        }

    }
);


/* =========================================================
   SALVAR CENÁRIO
========================================================= */

$$("[data-scene]").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                storage.set(
                    "dreamScene",
                    button.dataset.scene
                );

            }
        );

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

const dreamMusicPlayer =
    $("#dreamMusicPlayer");


function formatTime(seconds) {

    if (
        !Number.isFinite(
            seconds
        )
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


    dreamMusicPlayer?.classList.toggle(
        "playing",
        playing
    );


    if (dreamMusicButton) {

        dreamMusicButton.textContent =
            playing
                ? "❚❚"
                : "▶";


        dreamMusicButton.setAttribute(
            "aria-label",
            playing
                ? (
                    currentLanguage === "pt-BR"
                        ? "Pausar Moonlight"
                        : "Pause Moonlight"
                )
                : (
                    currentLanguage === "pt-BR"
                        ? "Tocar Moonlight"
                        : "Play Moonlight"
                )
        );

    }


    if (musicToggle) {

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

        if (musicDuration) {

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


        musicMuteButton.textContent =
            dreamMusic.muted
                ? "🔇"
                : "🔊";


        musicMuteButton.setAttribute(
            "aria-label",
            dreamMusic.muted
                ? (
                    currentLanguage === "pt-BR"
                        ? "Ativar som"
                        : "Unmute"
                )
                : (
                    currentLanguage === "pt-BR"
                        ? "Silenciar música"
                        : "Mute music"
                )
        );

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

        if (navigator.share) {

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


        showToast(
            currentLanguage === "pt-BR"
                ? "Tela cheia indisponível neste navegador."
                : "Fullscreen is unavailable in this browser."
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

        "dream-moment":
            "Dream Moment",

        sensacao:
            "Sensação",

        "quando-usar":
            "Momentos",

        "dream-scene":
            "Dream Scene",

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

        "dream-moment":
            "Dream Moment",

        sensacao:
            "Feeling",

        "quando-usar":
            "Moments",

        "dream-scene":
            "Dream Scene",

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


    /* =====================================================
       PARTÍCULAS
    ===================================================== */

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


    /* =====================================================
       ANIMAÇÕES
    ===================================================== */

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


    /* =====================================================
       CURSOR
    ===================================================== */

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


    /* =====================================================
       GLASS
    ===================================================== */

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


    /* =====================================================
       CLEAN
    ===================================================== */

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


    /* =====================================================
       PERFORMANCE
    ===================================================== */

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


    /* =====================================================
       MOVIMENTO 3D
    ===================================================== */

    setToggleState(
        "#motion3dToggle",
        readBool(
            "dreamMotion3D",
            true
        )
    );


    /* =====================================================
       HAPTIC
    ===================================================== */

    setToggleState(
        "#hapticToggle",
        readBool(
            "dreamHaptic",
            true
        )
    );


    /* =====================================================
       SPRAY SOUND
    ===================================================== */

    setToggleState(
        "#spraySoundToggle",
        readBool(
            "dreamSpraySound",
            true
        )
    );


    /* =====================================================
       FONT
    ===================================================== */

    setFontSize(
        storage.get(
            "dreamFontSize",
            "normal"
        ),
        false
    );


    /* =====================================================
       MUSIC VOLUME
    ===================================================== */

    setMusicVolume(
        storage.get(
            "dreamMusicVolume",
            35
        ),
        false
    );


    /* =====================================================
       PALETA ATIVA
    ===================================================== */

    const savedPalette =
        storage.get(
            "dreamPalette",
            null
        );


    if (savedPalette) {

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


    /* =====================================================
       MOOD
    ===================================================== */

    const savedMood =
        storage.get(
            "dreamMood",
            "romantico"
        );


    if (
        savedMood &&
        moods[savedMood]
    ) {

        currentMood =
            savedMood;


        $$("[data-mood]").forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.mood ===
                    savedMood
                );

            }
        );

    }


    /* =====================================================
       CENÁRIO
    ===================================================== */

    const savedScene =
        storage.get(
            "dreamScene",
            "romance"
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

    updateFavoriteButtons();

    updateSprayCounter();

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
   TECLADO
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


        /* =====================================================
           ESC
        ===================================================== */

        if (
            event.key ===
            "Escape"
        ) {

            closeProductModal();

            closeNoteModal();

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


        /* =====================================================
           LIGHTBOX
        ===================================================== */

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

                previousLightbox();

                return;

            }

        }


        /* =====================================================
           ATALHOS
        ===================================================== */

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
   VISIBILIDADE DA PÁGINA
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            galleryAutoplayEnabled
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

                    updateGalleryIndexFromScroll();

                    generateParticles();


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

                },
                160
            );

    },
    {
        passive:
            true
    }
);


/* =========================================================
   PROTEÇÃO CONTRA LINKS #
========================================================= */

document.addEventListener(
    "click",
    event => {

        const anchor =
            event.target.closest?.(
                'a[href="#"]'
            );


        if (!anchor) {
            return;
        }


        event.preventDefault();

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

loadSettings();


updateScroll();

updateTimeline();

updateSectionIndicator();

updateGalleryUI();

updateFavoriteButtons();

updateSprayCounter();


setLanguage(
    currentLanguage,
    false
);


/* =========================================================
   ARIA INICIAL
========================================================= */

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


/* =========================================================
   API GLOBAL DREAM
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


    setScene:
        applyScene,


    startQuiz:
        startQuiz,


    share:
        sharePage,


    playMusic:
        playMusic,


    pauseMusic:
        pauseMusic

};


/* =========================================================
   DIAGNÓSTICO
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

        sprayArea:
            Boolean(
                sprayArea
            ),

        sprayWave:
            Boolean(
                sprayWave
            ),

        sprayGlow:
            Boolean(
                sprayGlow
            ),

        notes:
            document.querySelectorAll(
                "[data-note]"
            ).length,

        gallery:
            galleryItems.length,

        quiz:
            Boolean(
                startQuizButton
            ),

        music:
            Boolean(
                dreamMusic
            ),

        languages:
            document.querySelectorAll(
                "[data-lang]"
            ).length

    };


    console.log(
        "Dream diagnostics:",
        tests
    );


    if (!productModal) {

        console.warn(
            "Dream: falta #productModal no HTML."
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


    if (!settingsPanel) {

        console.warn(
            "Dream: falta #settingsPanel no HTML."
        );

    }


    if (!sprayButton) {

        console.warn(
            "Dream: botão #sprayButton não encontrado."
        );

    }


    if (!sprayArea) {

        console.warn(
            "Dream: área #sprayArea não encontrada."
        );

    }


    if (
        tests.notes !==
        Object.keys(
            noteData
        ).length
    ) {

        console.info(
            `Dream: ${tests.notes} chips de notas encontrados.`
        );

    }

}


dreamDiagnostics();


/* =========================================================
   LOADER FINAL
========================================================= */

setTimeout(
    closeLoader,
    900
);


/* =========================================================
   DREAM READY
========================================================= */

body.classList.add(
    "dream-loaded"
);


window.dispatchEvent(
    new CustomEvent(
        "dream-ready"
    )
);


console.log(
    "%cDream carregado ✓",
    "color:#df76a8;font-size:17px;font-weight:800;"
);


/* =========================================================
   FIM
========================================================= */

}); // FIM DO DOMContentLoaded