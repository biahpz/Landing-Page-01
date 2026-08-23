/* =========================================================
   DREAM • AMOR NO AR
   SCRIPT.JS v61
   PARTE 1/2

   NOVO DO ZERO
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));

    const body = document.body;
    const root = document.documentElement;

    const clamp = (value, min, max) =>
        Math.min(Math.max(value, min), max);

    const sleep = ms =>
        new Promise(resolve => setTimeout(resolve, ms));


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


    /* =====================================================
       ELEMENTOS PRINCIPAIS
    ===================================================== */

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

    const sectionIndicator =
        $("#sectionIndicator");


    /* =====================================================
       LOADER
    ===================================================== */

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
                350
            );
        }
    );


    /*
       FAILSAFE

       Mesmo que uma imagem,
       áudio ou recurso falhe,
       o site NÃO fica carregando infinito.
    */

    setTimeout(
        closeLoader,
        3500
    );


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer = null;


    function showToast(message) {

        if (
            !toast ||
            !message
        ) {
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
                2100
            );
    }


    window.showToast =
        showToast;


    /* =====================================================
       SCROLL
    ===================================================== */

    function updateScroll() {

        const top =
            window.scrollY ||
            document.documentElement.scrollTop;


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
                    body.classList.contains(
                        "no-animations"
                    )
                        ? "auto"
                        : "smooth"
            });
        }
    );


    /* =====================================================
       MENU
    ===================================================== */

    menuMobile?.addEventListener(
        "click",
        event => {

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


    /* =====================================================
       LINKS SUAVES
    ===================================================== */

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


                    if (
                        !target
                    ) {
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


    /* =====================================================
       REVEAL
    ===================================================== */

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
                    threshold: 0.12
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


    /* =====================================================
       METERS
    ===================================================== */

    const meters =
        $$("[data-meter]");


    function animateMeter(element) {

        const value =
            clamp(
                Number(
                    element.dataset.meter ||
                    0
                ),
                0,
                100
            );


        element.style.width =
            `${value}%`;
    }


    if (
        "IntersectionObserver" in window
    ) {

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


                            animateMeter(
                                entry.target
                            );


                            meterObserver.unobserve(
                                entry.target
                            );
                        }
                    );
                },
                {
                    threshold: 0.3
                }
            );


        meters.forEach(
            meter => {

                meterObserver.observe(
                    meter
                );
            }
        );

    } else {

        meters.forEach(
            animateMeter
        );
    }


    /* =====================================================
       FEELING METERS
    ===================================================== */

    const feelingMeters =
        $$(".feeling-meter-fill");


    if (
        feelingMeters.length
    ) {

        const feelingObserver =
            "IntersectionObserver" in window
                ? new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                const value =
                                    clamp(
                                        Number(
                                            entry.target.dataset.feeling ||
                                            0
                                        ),
                                        0,
                                        100
                                    );


                                entry.target.style.width =
                                    `${value}%`;


                                feelingObserver.unobserve(
                                    entry.target
                                );
                            }
                        );
                    },
                    {
                        threshold: 0.25
                    }
                )
                : null;


        feelingMeters.forEach(
            element => {

                if (
                    feelingObserver
                ) {

                    feelingObserver.observe(
                        element
                    );

                } else {

                    element.style.width =
                        `${clamp(
                            Number(
                                element.dataset.feeling ||
                                0
                            ),
                            0,
                            100
                        )}%`;
                }
            }
        );
    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

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
                ) * 0.12;


            glowY +=
                (
                    cursorY -
                    glowY
                ) * 0.12;


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


    /* =====================================================
       PARTÍCULAS DE FUNDO
    ===================================================== */

    const particlesContainer =
        $("#particles");


    function generateParticles() {

        if (
            !particlesContainer
        ) {
            return;
        }


        particlesContainer.innerHTML =
            "";


        const symbols = [
            "♡",
            "✦",
            "·",
            "✿",
            "✧"
        ];


        const amount =
            window.innerWidth <= 650
                ? 12
                : 25;


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
                    Math.random() * 15
                }px`;


            particle.style.setProperty(
                "--duration",
                `${
                    9 +
                    Math.random() * 12
                }s`
            );


            particle.style.setProperty(
                "--delay",
                `${
                    -Math.random() * 16
                }s`
            );


            particlesContainer.appendChild(
                particle
            );
        }
    }


    generateParticles();


    /* =====================================================
       IDIOMA
    ===================================================== */

    const translations = {

        "pt-BR": {

            "loader.subtitle":
                "Amor no Ar",

            "loader.loading":
                "preparando sua experiência",

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

            "music.playing":
                "TOCANDO AGORA",

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

            "ticker.floral":
                "✿ Floral Amadeirado",

            "ticker.love":
                "♡ Amor no Ar",

            "ticker.delicate":
                "☁ Delicado",

            "ticker.romantic":
                "☾ Romântico",

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

            "notes.card1Title":
                "Frescor frutado",

            "notes.card1Text":
                "A primeira impressão da fragrância: luminosa, fresca e vibrante.",

            "notes.card2Title":
                "Coração floral",

            "notes.card2Text":
                "O lado romântico, delicado e elegante de Amor no Ar.",

            "notes.card3Title":
                "Conforto envolvente",

            "notes.card3Text":
                "As notas que permanecem e deixam a assinatura final da fragrância.",

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

            "experience.evolutionLower":
                "evolução",

            "experience.profile":
                "PERFIL",

            "experience.personality":
                "Personalidade",

            "experience.personalityIntro":
                "Uma leitura visual das principais sensações de Dream.",

            "experience.moment":
                "MOMENTO",

            "experience.feelQuestion":
                "Como você quer se sentir?",

            "experience.feelIntro":
                "Escolha uma atmosfera para transformar o visual da página.",

            "experience.moodHint":
                "A identidade visual muda automaticamente com o mood.",

            "meter.floral":
                "Floral",

            "meter.romantic":
                "Romântico",

            "meter.comfort":
                "Confortável",

            "meter.presence":
                "Presença",

            "meter.intensity":
                "Intensidade",

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

            "dreamMoment.defaultTitle":
                "Seu momento começa aqui.",

            "dreamMoment.defaultText":
                "Toque no botão para receber uma pequena mensagem Dream.",

            "dreamMoment.button":
                "Novo momento",

            "feeling.eyebrow":
                "SENSAÇÃO DA FRAGRÂNCIA",

            "feeling.title1":
                "Entre leveza e",

            "feeling.title2":
                "presença.",

            "feeling.description":
                "Uma representação visual do equilíbrio de Dream Amor no Ar.",

            "feeling.amorNoAr":
                "AMOR NO AR",

            "feeling.profile":
                "PERFIL SENSORIAL",

            "feeling.bigTitle":
                "Delicado sem passar despercebido.",

            "feeling.text":
                "Dream equilibra um coração romântico com uma base confortável, criando uma presença suave.",

            "moments.eyebrow":
                "QUANDO USAR",

            "moments.title1":
                "Um Dream para cada",

            "moments.title2":
                "momento.",

            "moments.description":
                "Escolha o cenário que mais combina com a sua experiência.",

            "gallery.eyebrow":
                "GALERIA DREAM",

            "gallery.title1":
                "Entre no universo",

            "gallery.title2":
                "Dream.",

            "gallery.description":
                "Arraste com o mouse, deslize no celular ou use as setas.",

            "gallery.explore":
                "explorar ↗",

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

            "footer.developed":
                "DESENVOLVIDO POR",

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

            "studio.darkDesc":
                "Alternar tema",

            "studio.glassDesc":
                "Transparência e desfoque",

            "studio.clean":
                "Modo clean",

            "studio.cleanDesc":
                "Experiência mais minimalista",

            "studio.performance":
                "Modo performance",

            "studio.performanceDesc":
                "Reduz efeitos mais pesados",

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

            "studio.particlesDesc":
                "Elementos flutuantes",

            "studio.animations":
                "Animações",

            "studio.animationsDesc":
                "Transições da experiência",

            "studio.cursorDesc":
                "Iluminação que acompanha o mouse",

            "studio.motion":
                "Movimento 3D",

            "studio.motionDesc":
                "Profundidade do frasco",

            "studio.haptic":
                "Vibração do spray",

            "studio.hapticDesc":
                "Feedback em aparelhos compatíveis",

            "studio.spraySound":
                "Som do borrifador",

            "studio.spraySoundDesc":
                "Reproduzir efeito ao borrifar",

            "studio.music":
                "Música",

            "studio.backgroundMusic":
                "Música de fundo",

            "studio.backgroundMusicDesc":
                "Ativar ou pausar Moonlight",

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


        /* =================================================
           ENGLISH
        ================================================= */

        "en-US": {

            "loader.subtitle":
                "Love in the Air",

            "loader.loading":
                "preparing your experience",

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

            "music.playing":
                "NOW PLAYING",

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

            "ticker.floral":
                "✿ Floral Woody",

            "ticker.love":
                "♡ Love in the Air",

            "ticker.delicate":
                "☁ Delicate",

            "ticker.romantic":
                "☾ Romantic",

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

            "notes.card1Title":
                "Fruity freshness",

            "notes.card1Text":
                "The fragrance's first impression: bright, fresh and vibrant.",

            "notes.card2Title":
                "Floral heart",

            "notes.card2Text":
                "The romantic, delicate and elegant side of Love in the Air.",

            "notes.card3Title":
                "Enveloping comfort",

            "notes.card3Text":
                "The notes that remain and create the fragrance's final signature.",

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

            "experience.evolutionLower":
                "evolution",

            "experience.profile":
                "PROFILE",

            "experience.personality":
                "Personality",

            "experience.personalityIntro":
                "A visual reading of Dream's main sensations.",

            "experience.moment":
                "MOMENT",

            "experience.feelQuestion":
                "How do you want to feel?",

            "experience.feelIntro":
                "Choose an atmosphere to transform the page.",

            "experience.moodHint":
                "The visual identity automatically changes with your mood.",

            "meter.floral":
                "Floral",

            "meter.romantic":
                "Romantic",

            "meter.comfort":
                "Comfortable",

            "meter.presence":
                "Presence",

            "meter.intensity":
                "Intensity",

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

            "dreamMoment.defaultTitle":
                "Your moment starts here.",

            "dreamMoment.defaultText":
                "Tap the button to receive a little Dream message.",

            "dreamMoment.button":
                "New moment",

            "feeling.eyebrow":
                "FRAGRANCE FEELING",

            "feeling.title1":
                "Between softness and",

            "feeling.title2":
                "presence.",

            "feeling.description":
                "A visual representation of the balance of Dream Love in the Air.",

            "feeling.amorNoAr":
                "LOVE IN THE AIR",

            "feeling.profile":
                "SENSORY PROFILE",

            "feeling.bigTitle":
                "Delicate without going unnoticed.",

            "feeling.text":
                "Dream balances a romantic heart with a comfortable base, creating a soft presence.",

            "moments.eyebrow":
                "WHEN TO WEAR",

            "moments.title1":
                "A Dream for every",

            "moments.title2":
                "moment.",

            "moments.description":
                "Choose the setting that best matches your experience.",

            "gallery.eyebrow":
                "DREAM GALLERY",

            "gallery.title1":
                "Enter the",

            "gallery.title2":
                "Dream universe.",

            "gallery.description":
                "Drag with your mouse, swipe on mobile or use the arrows.",

            "gallery.explore":
                "explore ↗",

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

            "footer.developed":
                "DEVELOPED BY",

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

            "studio.darkDesc":
                "Switch theme",

            "studio.glassDesc":
                "Transparency and blur",

            "studio.clean":
                "Clean mode",

            "studio.cleanDesc":
                "A more minimal experience",

            "studio.performance":
                "Performance mode",

            "studio.performanceDesc":
                "Reduces heavier effects",

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

            "studio.particlesDesc":
                "Floating elements",

            "studio.animations":
                "Animations",

            "studio.animationsDesc":
                "Experience transitions",

            "studio.cursorDesc":
                "Light that follows the mouse",

            "studio.motion":
                "3D motion",

            "studio.motionDesc":
                "Bottle depth effect",

            "studio.haptic":
                "Spray vibration",

            "studio.hapticDesc":
                "Feedback on supported devices",

            "studio.spraySound":
                "Spray sound",

            "studio.spraySoundDesc":
                "Play an effect when spraying",

            "studio.music":
                "Music",

            "studio.backgroundMusic":
                "Background music",

            "studio.backgroundMusicDesc":
                "Play or pause Moonlight",

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
        !translations[
            currentLanguage
        ]
    ) {

        currentLanguage =
            "pt-BR";
    }


    function setLanguage(
        language,
        notify = false
    ) {

        if (
            !translations[
                language
            ]
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


        document.title =
            language === "pt-BR"
                ? "Dream Amor no Ar • 350 ml"
                : "Dream Love in the Air • 350 ml";


        $$("[data-i18n]").forEach(
            element => {

                const key =
                    element.dataset.i18n;


                const translation =
                    translations[
                        language
                    ][key];


                if (
                    translation !==
                    undefined
                ) {

                    element.textContent =
                        translation;
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


        if (
            notify
        ) {

            showToast(
                language === "pt-BR"
                    ? "Idioma alterado para Português 🇧🇷"
                    : "Language changed to English 🇺🇸"
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


    /* =====================================================
       RGB CONVERTER
    ===================================================== */

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


        const number =
            parseInt(
                clean,
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


    /* =====================================================
       CORES
    ===================================================== */

    function applyColors(
        primary,
        secondary,
        save = true
    ) {

        const primaryRgb =
            hexToRgb(
                primary
            );


        const secondaryRgb =
            hexToRgb(
                secondary
            );


        root.style.setProperty(
            "--primary",
            primary
        );


        root.style.setProperty(
            "--secondary",
            secondary
        );


        if (
            primaryRgb
        ) {

            root.style.setProperty(
                "--primary-rgb",
                `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`
            );
        }


        if (
            secondaryRgb
        ) {

            root.style.setProperty(
                "--secondary-rgb",
                `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`
            );
        }


        if (
            save
        ) {

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


    /* =====================================================
       PALETAS
    ===================================================== */

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

                    const paletteName =
                        button.dataset.palette;


                    const palette =
                        palettes[
                            paletteName
                        ];


                    if (
                        !palette
                    ) {
                        return;
                    }


                    $$(".palette").forEach(
                        element => {

                            element.classList.remove(
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


                    const primaryInput =
                        $("#primaryColor");


                    const secondaryInput =
                        $("#secondaryColor");


                    if (
                        primaryInput
                    ) {

                        primaryInput.value =
                            palette[0];
                    }


                    if (
                        secondaryInput
                    ) {

                        secondaryInput.value =
                            palette[1];
                    }


                    storage.set(
                        "dreamPalette",
                        paletteName
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


    /* =====================================================
       DARK MODE
    ===================================================== */

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


        const button =
            $("#themeButton");


        if (
            toggle
        ) {

            toggle.checked =
                enabled;
        }


        if (
            button
        ) {

            button.textContent =
                enabled
                    ? "☀"
                    : "☾";
        }


        if (
            save
        ) {

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


    /* =====================================================
       DREAM STUDIO
    ===================================================== */

    const settingsPanel =
        $("#settingsPanel");


    $("#settingsButton")?.addEventListener(
        "click",
        () => {

            settingsPanel?.classList.toggle(
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


    /* =====================================================
       GLASS
    ===================================================== */

    $("#glassToggle")?.addEventListener(
        "change",
        event => {

            body.classList.toggle(
                "no-glass",
                !event.target.checked
            );


            storage.set(
                "dreamGlass",
                event.target.checked
            );
        }
    );


    /* =====================================================
       CLEAN MODE
    ===================================================== */

    $("#cleanModeToggle")?.addEventListener(
        "change",
        event => {

            body.classList.toggle(
                "clean-mode",
                event.target.checked
            );


            storage.set(
                "dreamClean",
                event.target.checked
            );
        }
    );


    /* =====================================================
       PERFORMANCE
    ===================================================== */

    $("#performanceToggle")?.addEventListener(
        "change",
        event => {

            body.classList.toggle(
                "performance-mode",
                event.target.checked
            );


            storage.set(
                "dreamPerformance",
                event.target.checked
            );
        }
    );


    /* =====================================================
       PARTICLES
    ===================================================== */

    $("#particlesToggle")?.addEventListener(
        "change",
        event => {

            body.classList.toggle(
                "no-particles",
                !event.target.checked
            );


            storage.set(
                "dreamParticles",
                event.target.checked
            );
        }
    );


    /* =====================================================
       ANIMATIONS
    ===================================================== */

    $("#animationsToggle")?.addEventListener(
        "change",
        event => {

            body.classList.toggle(
                "no-animations",
                !event.target.checked
            );


            storage.set(
                "dreamAnimations",
                event.target.checked
            );
        }
    );


    /* =====================================================
       CURSOR
    ===================================================== */

    $("#cursorToggle")?.addEventListener(
        "change",
        event => {

            body.classList.toggle(
                "no-cursor",
                !event.target.checked
            );


            storage.set(
                "dreamCursor",
                event.target.checked
            );
        }
    );


    /* =====================================================
       3D
    ===================================================== */

    let motion3dEnabled =
        storage.get(
            "dreamMotion3d",
            "true"
        ) !== "false";


    $("#motion3dToggle")?.addEventListener(
        "change",
        event => {

            motion3dEnabled =
                event.target.checked;


            storage.set(
                "dreamMotion3d",
                motion3dEnabled
            );
        }
    );


    let motionIntensity =
        Number(
            storage.get(
                "dreamMotionIntensity",
                100
            )
        );


    $("#motion3dRange")?.addEventListener(
        "input",
        event => {

            motionIntensity =
                Number(
                    event.target.value
                );


            const label =
                $("#motion3dValue");


            if (
                label
            ) {

                label.textContent =
                    `${motionIntensity}%`;
            }


            storage.set(
                "dreamMotionIntensity",
                motionIntensity
            );
        }
    );


    /* =====================================================
       PRODUCT 3D
    ===================================================== */

    const heroProduct =
        $("#heroProduct");

    const mainBottle =
        $("#mainBottle");


    heroProduct?.addEventListener(
        "pointermove",
        event => {

            if (
                !motion3dEnabled ||
                !mainBottle ||
                body.classList.contains(
                    "performance-mode"
                ) ||
                !window.matchMedia(
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


            const factor =
                motionIntensity /
                100;


            mainBottle.style.transform =
                `
                    rotateY(${x * 10 * factor}deg)
                    rotateX(${y * -7 * factor}deg)
                    translate3d(
                        ${x * 6 * factor}px,
                        ${y * 4 * factor}px,
                        0
                    )
                `;
        }
    );


    heroProduct?.addEventListener(
        "pointerleave",
        () => {

            if (
                mainBottle
            ) {

                mainBottle.style.transform =
                    "";
            }
        }
    );


    /* =====================================================
       SPRAY
    ===================================================== */

    const sprayButton =
        $("#sprayButton");

    const sprayArea =
        $("#sprayArea");

    const sprayWave =
        $("#sprayWave");

    const sprayGlow =
        $("#sprayGlow");

    const sprayCounter =
        $("#sprayCounter");


    let spraying = false;


    let sprayCount =
        Number(
            storage.get(
                "dreamSprayCount",
                0
            )
        ) || 0;


    if (
        sprayCounter
    ) {

        sprayCounter.textContent =
            sprayCount;
    }


    let spraySoundEnabled =
        storage.get(
            "dreamSpraySound",
            "true"
        ) !== "false";


    let hapticEnabled =
        storage.get(
            "dreamHaptic",
            "true"
        ) !== "false";


    let sprayIntensity =
        Number(
            storage.get(
                "dreamSprayIntensity",
                100
            )
        ) || 100;


    /* =====================================================
       ÁUDIO DO BORRIFADOR

       PRIMEIRO tenta achar:
       <audio id="sprayAudio">

       Se não existir, cria usando:
       ./audio/spray.mp3

       Então coloque seu MP3 nessa pasta com
       o nome spray.mp3.
    ===================================================== */

    const sprayAudio =
        $("#sprayAudio") ||
        (() => {

            const audio =
                new Audio(
                    "./audio/spray.mp3"
                );


            audio.preload =
                "auto";


            audio.volume =
                0.78;


            return audio;
        })();


    let sprayAudioTimer =
        null;


    function playSprayAudio() {

        if (
            !spraySoundEnabled ||
            !sprayAudio
        ) {
            return;
        }


        clearTimeout(
            sprayAudioTimer
        );


        try {

            sprayAudio.pause();


            sprayAudio.currentTime =
                0;


            sprayAudio.volume =
                0.78;


            const promise =
                sprayAudio.play();


            if (
                promise &&
                typeof promise.catch ===
                    "function"
            ) {

                promise.catch(
                    () => {}
                );
            }


            sprayAudioTimer =
                setTimeout(
                    () => {

                        try {

                            sprayAudio.pause();


                            sprayAudio.currentTime =
                                0;

                        } catch {}
                    },
                    390
                );

        } catch {}
    }


    function restartAnimation(
        element,
        className = "active"
    ) {

        if (
            !element
        ) {
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


    function createMist() {

        if (
            !sprayArea
        ) {
            return;
        }


        const factor =
            clamp(
                sprayIntensity /
                100,
                0.4,
                1.6
            );


        const amount =
            Math.round(
                (
                    window.innerWidth <= 650
                        ? 28
                        : 55
                ) * factor
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
                    0.5
                ) *
                380 *
                factor;


            const y =
                (
                    Math.random() -
                    0.68
                ) *
                320 *
                factor;


            const size =
                (
                    3 +
                    Math.random() *
                    11
                ) *
                factor;


            const blur =
                1 +
                Math.random() *
                3;


            const duration =
                0.7 +
                Math.random() *
                0.75;


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
                    0.08
                }s`;


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

        if (
            !sprayArea
        ) {
            return;
        }


        const symbols = [
            "♡",
            "✦",
            "✧"
        ];


        const amount =
            window.innerWidth <= 650
                ? 6
                : 11;


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
                `${
                    8 +
                    Math.random() *
                    13
                }px`;


            particle.style.setProperty(
                "--symbol-x",
                `${
                    (
                        Math.random() -
                        0.5
                    ) *
                    240
                }px`
            );


            particle.style.setProperty(
                "--symbol-y",
                `${
                    -45 -
                    Math.random() *
                    150
                }px`
            );


            particle.style.setProperty(
                "--symbol-rotate",
                `${
                    -90 +
                    Math.random() *
                    180
                }deg`
            );


            sprayArea.appendChild(
                particle
            );


            setTimeout(
                () => {

                    particle.remove();

                },
                1600
            );
        }
    }


    function createSprayFlash() {

        if (
            !sprayArea
        ) {
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
            650
        );
    }


    async function sprayDream() {

        if (
            spraying ||
            !sprayArea
        ) {
            return;
        }


        spraying =
            true;


        heroProduct?.classList.remove(
            "spraying"
        );


        void heroProduct?.offsetWidth;


        heroProduct?.classList.add(
            "spraying"
        );


        restartAnimation(
            sprayWave
        );


        restartAnimation(
            sprayGlow
        );


        createSprayFlash();

        createMist();

        createSpraySymbols();

        playSprayAudio();


        sprayCount++;


        storage.set(
            "dreamSprayCount",
            sprayCount
        );


        if (
            sprayCounter
        ) {

            sprayCounter.textContent =
                sprayCount;
        }


        if (
            hapticEnabled &&
            navigator.vibrate
        ) {

            navigator.vibrate(
                18
            );
        }


        await sleep(
            700
        );


        heroProduct?.classList.remove(
            "spraying"
        );


        spraying =
            false;
    }


    sprayButton?.addEventListener(
        "click",
        sprayDream
    );


    /* =====================================================
       SPRAY STUDIO
    ===================================================== */

    $("#spraySoundToggle")?.addEventListener(
        "change",
        event => {

            spraySoundEnabled =
                event.target.checked;


            storage.set(
                "dreamSpraySound",
                spraySoundEnabled
            );
        }
    );


    $("#hapticToggle")?.addEventListener(
        "change",
        event => {

            hapticEnabled =
                event.target.checked;


            storage.set(
                "dreamHaptic",
                hapticEnabled
            );
        }
    );


    $("#sprayIntensityRange")?.addEventListener(
        "input",
        event => {

            sprayIntensity =
                Number(
                    event.target.value
                );


            const label =
                $("#sprayIntensityValue");


            if (
                label
            ) {

                label.textContent =
                    `${sprayIntensity}%`;
            }


            storage.set(
                "dreamSprayIntensity",
                sprayIntensity
            );
        }
    );


    /* =====================================================
       MÚSICA
    ===================================================== */

    const dreamMusic =
        $("#dreamMusic");


    const dreamMusicPlayer =
        $("#dreamMusicPlayer");


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


        const remaining =
            Math.floor(
                seconds % 60
            )
                .toString()
                .padStart(
                    2,
                    "0"
                );


        return `${minutes}:${remaining}`;
    }


    function updateMusicState() {

        if (
            !dreamMusic
        ) {
            return;
        }


        const playing =
            !dreamMusic.paused;


        dreamMusicPlayer?.classList.toggle(
            "playing",
            playing
        );


        if (
            dreamMusicButton
        ) {

            dreamMusicButton.textContent =
                playing
                    ? "❚❚"
                    : "▶";
        }
    }


    dreamMusicButton?.addEventListener(
        "click",
        async () => {

            if (
                !dreamMusic
            ) {
                return;
            }


            try {

                if (
                    dreamMusic.paused
                ) {

                    await dreamMusic.play();

                } else {

                    dreamMusic.pause();
                }

            } catch {}


            updateMusicState();
        }
    );


    dreamMusic?.addEventListener(
        "play",
        updateMusicState
    );


    dreamMusic?.addEventListener(
        "pause",
        updateMusicState
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


            if (
                musicProgress
            ) {

                musicProgress.max =
                    100;
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
                musicDuration
            ) {

                musicDuration.textContent =
                    formatTime(
                        dreamMusic.duration
                    );
            }


            if (
                musicProgress &&
                Number.isFinite(
                    dreamMusic.duration
                ) &&
                dreamMusic.duration >
                    0
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
                !Number.isFinite(
                    dreamMusic.duration
                )
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

            if (
                !dreamMusic
            ) {
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


    let musicVolume =
        Number(
            storage.get(
                "dreamMusicVolume",
                35
            )
        );


    musicVolume =
        clamp(
            musicVolume,
            0,
            100
        );


    if (
        dreamMusic
    ) {

        dreamMusic.volume =
            musicVolume /
            100;
    }


    if (
        $("#musicVolumeRange")
    ) {

        $("#musicVolumeRange").value =
            musicVolume;
    }


    if (
        $("#musicVolumeValue")
    ) {

        $("#musicVolumeValue").textContent =
            `${musicVolume}%`;
    }


    $("#musicVolumeRange")?.addEventListener(
        "input",
        event => {

            const volume =
                clamp(
                    Number(
                        event.target.value
                    ),
                    0,
                    100
                );


            if (
                dreamMusic
            ) {

                dreamMusic.volume =
                    volume /
                    100;
            }


            const label =
                $("#musicVolumeValue");


            if (
                label
            ) {

                label.textContent =
                    `${volume}%`;
            }


            storage.set(
                "dreamMusicVolume",
                volume
            );
        }
    );


    $("#musicToggle")?.addEventListener(
        "change",
        async event => {

            if (
                !dreamMusic
            ) {
                return;
            }


            try {

                if (
                    event.target.checked
                ) {

                    await dreamMusic.play();

                } else {

                    dreamMusic.pause();
                }

            } catch {}


            updateMusicState();
        }
    );


    updateMusicState();


    /* =====================================================
       CONTINUA NA PARTE 2
    ===================================================== */


    /* =====================================================
       DREAM MOMENT
    ===================================================== */

    const dreamMomentButton =
        $("#dreamMomentButton");

    const dreamMomentTitle =
        $("#dreamMomentTitle");

    const dreamMomentText =
        $("#dreamMomentText");


    const dreamMoments = {

        "pt-BR": [
            {
                title: "Um detalhe pode mudar tudo.",
                text: "Às vezes, uma lembrança começa com algo tão simples quanto uma fragrância."
            },
            {
                title: "Deixe sua presença ficar.",
                text: "Alguns momentos passam. Outros permanecem na memória."
            },
            {
                title: "Amor no Ar ♡",
                text: "Transforme um momento comum em algo que vale a pena lembrar."
            },
            {
                title: "Seu momento. Seu Dream.",
                text: "A melhor atmosfera é aquela que combina com você."
            },
            {
                title: "Leveza também marca.",
                text: "Você não precisa exagerar para ser lembrado."
            }
        ],

        "en-US": [
            {
                title: "A detail can change everything.",
                text: "Sometimes a memory begins with something as simple as a fragrance."
            },
            {
                title: "Let your presence remain.",
                text: "Some moments pass. Others stay in our memory."
            },
            {
                title: "Love in the Air ♡",
                text: "Turn an ordinary moment into something worth remembering."
            },
            {
                title: "Your moment. Your Dream.",
                text: "The best atmosphere is the one that feels like you."
            },
            {
                title: "Softness can leave a mark.",
                text: "You don't need to overdo it to be remembered."
            }
        ]
    };


    dreamMomentButton?.addEventListener(
        "click",
        () => {

            const list =
                dreamMoments[
                    currentLanguage
                ] ||
                dreamMoments["pt-BR"];


            const moment =
                list[
                    Math.floor(
                        Math.random() *
                        list.length
                    )
                ];


            if (
                dreamMomentTitle
            ) {

                dreamMomentTitle.textContent =
                    moment.title;
            }


            if (
                dreamMomentText
            ) {

                dreamMomentText.textContent =
                    moment.text;
            }


            const card =
                dreamMomentTitle?.closest(
                    ".dream-moment-card"
                ) ||
                dreamMomentText?.parentElement;


            if (
                card
            ) {

                card.classList.remove(
                    "changing"
                );

                void card.offsetWidth;


                card.classList.add(
                    "changing"
                );
            }
        }
    );


    /* =====================================================
       MOODS
    ===================================================== */

    const moodButtons =
        $$("[data-mood]");


    let currentMood =
        storage.get(
            "dreamMood",
            "romantic"
        );


    function applyMood(
        mood,
        save = true
    ) {

        if (
            !mood
        ) {
            return;
        }


        currentMood =
            mood;


        body.dataset.mood =
            mood;


        moodButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.mood ===
                        mood
                );
            }
        );


        if (
            save
        ) {

            storage.set(
                "dreamMood",
                mood
            );
        }
    }


    moodButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    applyMood(
                        button.dataset.mood
                    );


                    showToast(
                        currentLanguage ===
                            "pt-BR"
                            ? `Mood ${button.textContent.trim()} ativado`
                            : `${button.textContent.trim()} mood activated`
                    );
                }
            );
        }
    );


    applyMood(
        currentMood,
        false
    );


    /* =====================================================
       TIMELINE DA FRAGRÂNCIA
    ===================================================== */

    const timelineRange =
        $("#timelineRange");

    const timelineProgress =
        $("#timelineProgress");

    const timelineTime =
        $("#timelineTime");

    const timelineTitle =
        $("#timelineTitle");

    const timelineDescription =
        $("#timelineDescription");


    const timelineData = {

        "pt-BR": [
            {
                max: 20,
                time: "0h",
                title: "Primeiro contato",
                description:
                    "A fragrância começa fresca, luminosa e delicada."
            },
            {
                max: 45,
                time: "1h",
                title: "Coração floral",
                description:
                    "As notas florais aparecem com mais destaque e romantismo."
            },
            {
                max: 70,
                time: "3h",
                title: "Mais envolvente",
                description:
                    "A fragrância ganha conforto e uma presença mais macia."
            },
            {
                max: 100,
                time: "6h+",
                title: "Assinatura final",
                description:
                    "As notas de fundo permanecem mais próximas da pele."
            }
        ],

        "en-US": [
            {
                max: 20,
                time: "0h",
                title: "First impression",
                description:
                    "The fragrance begins fresh, bright and delicate."
            },
            {
                max: 45,
                time: "1h",
                title: "Floral heart",
                description:
                    "The floral notes become more noticeable and romantic."
            },
            {
                max: 70,
                time: "3h",
                title: "More enveloping",
                description:
                    "The fragrance becomes softer, warmer and more comfortable."
            },
            {
                max: 100,
                time: "6h+",
                title: "Final signature",
                description:
                    "The base notes remain closer to the skin."
            }
        ]
    };


    function updateTimeline() {

        if (
            !timelineRange
        ) {
            return;
        }


        const value =
            clamp(
                Number(
                    timelineRange.value
                ),
                0,
                100
            );


        if (
            timelineProgress
        ) {

            timelineProgress.style.width =
                `${value}%`;
        }


        const data =
            timelineData[
                currentLanguage
            ] ||
            timelineData["pt-BR"];


        const state =
            data.find(
                item =>
                    value <= item.max
            ) ||
            data[
                data.length - 1
            ];


        if (
            timelineTime
        ) {

            timelineTime.textContent =
                state.time;
        }


        if (
            timelineTitle
        ) {

            timelineTitle.textContent =
                state.title;
        }


        if (
            timelineDescription
        ) {

            timelineDescription.textContent =
                state.description;
        }
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


    /* =====================================================
       MOMENT CARDS
    ===================================================== */

    const momentCards =
        $$(
            ".moment-card, [data-moment]"
        );


    momentCards.forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    momentCards.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );
                        }
                    );


                    card.classList.add(
                        "active"
                    );


                    const mood =
                        card.dataset.mood;


                    if (
                        mood
                    ) {

                        applyMood(
                            mood
                        );
                    }
                }
            );
        }
    );


    /* =====================================================
       FAVORITO
    ===================================================== */

    const favoriteButton =
        $("#favoriteButton");


    const favoriteModal =
        $("#favoriteModal");


    let favorite =
        storage.get(
            "dreamFavorite",
            "false"
        ) === "true";


    function updateFavorite(
        notify = false
    ) {

        if (
            favoriteButton
        ) {

            favoriteButton.classList.toggle(
                "active",
                favorite
            );


            const icon =
                $(".favorite-icon", favoriteButton);


            if (
                icon
            ) {

                icon.textContent =
                    favorite
                        ? "♥"
                        : "♡";
            }


            favoriteButton.setAttribute(
                "aria-pressed",
                String(favorite)
            );
        }


        storage.set(
            "dreamFavorite",
            favorite
        );


        if (
            notify
        ) {

            showToast(
                currentLanguage ===
                    "pt-BR"
                    ? (
                        favorite
                            ? "Dream adicionado aos favoritos ♡"
                            : "Dream removido dos favoritos"
                    )
                    : (
                        favorite
                            ? "Dream added to favorites ♡"
                            : "Dream removed from favorites"
                    )
            );
        }
    }


    favoriteButton?.addEventListener(
        "click",
        () => {

            favorite =
                !favorite;


            updateFavorite(
                true
            );


            if (
                favorite &&
                favoriteModal
            ) {

                favoriteModal.classList.add(
                    "open"
                );


                favoriteModal.setAttribute(
                    "aria-hidden",
                    "false"
                );
            }
        }
    );


    updateFavorite();


    /* =====================================================
       MODAIS
    ===================================================== */

    function openModal(
        modal
    ) {

        if (
            !modal
        ) {
            return;
        }


        modal.classList.add(
            "open"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        body.classList.add(
            "modal-open"
        );
    }


    function closeModal(
        modal
    ) {

        if (
            !modal
        ) {
            return;
        }


        modal.classList.remove(
            "open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        if (
            !$(".modal.open")
        ) {

            body.classList.remove(
                "modal-open"
            );
        }
    }


    const productModal =
        $("#productModal");
            $$(
        "#productDetailsButton, #viewProductButton, [data-open-product]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    openModal(
                        productModal
                    );
                }
            );
        }
    );


    $$(
        ".modal-close, [data-close-modal]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.closest(
                            ".modal"
                        )
                    );
                }
            );
        }
    );


    $$(".modal").forEach(
        modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        modal
                    ) {

                        closeModal(
                            modal
                        );
                    }
                }
            );
        }
    );


    /* =====================================================
       GALERIA
    ===================================================== */

    const galleryTrack =
        $("#galleryTrack");

    const galleryPrev =
        $("#galleryPrev");

    const galleryNext =
        $("#galleryNext");

    const galleryAutoplay =
        $("#galleryAutoplay");


    let galleryAutoTimer =
        null;

    let galleryAutoActive =
        false;


    function galleryScrollAmount() {

        if (
            !galleryTrack
        ) {

            return 300;
        }


        const item =
            $(".gallery-item", galleryTrack);


        if (
            !item
        ) {

            return Math.min(
                galleryTrack.clientWidth *
                    0.75,
                500
            );
        }


        const style =
            getComputedStyle(
                galleryTrack
            );


        const gap =
            parseFloat(
                style.columnGap ||
                style.gap ||
                0
            );


        return (
            item.getBoundingClientRect()
                .width +
            gap
        );
    }


    function galleryMove(
        direction
    ) {

        galleryTrack?.scrollBy({
            left:
                galleryScrollAmount() *
                direction,

            behavior:
                body.classList.contains(
                    "no-animations"
                )
                    ? "auto"
                    : "smooth"
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


    function stopGalleryAutoplay() {

        galleryAutoActive =
            false;


        clearInterval(
            galleryAutoTimer
        );


        galleryAutoTimer =
            null;


        galleryAutoplay?.classList.remove(
            "active"
        );


        if (
            galleryAutoplay
        ) {

            galleryAutoplay.textContent =
                currentLanguage ===
                    "pt-BR"
                    ? "▶ Autoplay"
                    : "▶ Autoplay";
        }
    }


    function startGalleryAutoplay() {

        if (
            !galleryTrack
        ) {
            return;
        }


        galleryAutoActive =
            true;


        galleryAutoplay?.classList.add(
            "active"
        );


        if (
            galleryAutoplay
        ) {

            galleryAutoplay.textContent =
                currentLanguage ===
                    "pt-BR"
                    ? "❚❚ Pausar"
                    : "❚❚ Pause";
        }


        clearInterval(
            galleryAutoTimer
        );


        galleryAutoTimer =
            setInterval(
                () => {

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

                        galleryMove(
                            1
                        );
                    }

                },
                3200
            );
    }


    galleryAutoplay?.addEventListener(
        "click",
        () => {

            if (
                galleryAutoActive
            ) {

                stopGalleryAutoplay();

            } else {

                startGalleryAutoplay();
            }
        }
    );


    /* =====================================================
       DRAG GALERIA
    ===================================================== */

    if (
        galleryTrack
    ) {

        let dragging =
            false;

        let dragStartX =
            0;

        let dragScrollLeft =
            0;


        galleryTrack.addEventListener(
            "pointerdown",
            event => {

                dragging =
                    true;


                dragStartX =
                    event.clientX;


                dragScrollLeft =
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


        galleryTrack.addEventListener(
            "pointermove",
            event => {

                if (
                    !dragging
                ) {
                    return;
                }


                const distance =
                    event.clientX -
                    dragStartX;


                galleryTrack.scrollLeft =
                    dragScrollLeft -
                    distance;
            }
        );


        const stopDragging =
            () => {

                dragging =
                    false;


                galleryTrack.classList.remove(
                    "dragging"
                );
            };


        galleryTrack.addEventListener(
            "pointerup",
            stopDragging
        );


        galleryTrack.addEventListener(
            "pointercancel",
            stopDragging
        );
    }


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    const lightbox =
        $("#lightbox");

    const lightboxImage =
        $("#lightboxImage");

    const lightboxClose =
        $("#lightboxClose");

    const lightboxPrev =
        $("#lightboxPrev");

    const lightboxNext =
        $("#lightboxNext");


    const galleryItems =
        $$(".gallery-item");


    let lightboxIndex =
        0;


    function updateLightbox() {

        const item =
            galleryItems[
                lightboxIndex
            ];


        if (
            !item ||
            !lightboxImage
        ) {
            return;
        }


        const image =
            $("img", item);


        if (
            !image
        ) {
            return;
        }


        lightboxImage.src =
            image.currentSrc ||
            image.src;


        lightboxImage.alt =
            image.alt ||
            "Dream";
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

        if (
            !lightbox
        ) {
            return;
        }


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

                    /*
                       Evita abrir ao terminar
                       um drag grande.
                    */

                    if (
                        galleryTrack?.classList.contains(
                            "dragging"
                        )
                    ) {
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
        closeLightbox
    );


    lightboxPrev?.addEventListener(
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


    lightboxNext?.addEventListener(
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


    /* =====================================================
       QUIZ
    ===================================================== */

    const quizStart =
        $("#quizStart");

    const quizIntro =
        $("#quizIntro");

    const quizQuestions =
        $("#quizQuestions");

    const quizQuestion =
        $("#quizQuestion");

    const quizOptions =
        $("#quizOptions");

    const quizProgress =
        $("#quizProgress");

    const quizCounter =
        $("#quizCounter");

    const quizResult =
        $("#quizResult");

    const quizResultTitle =
        $("#quizResultTitle");

    const quizResultText =
        $("#quizResultText");

    const quizRestart =
        $("#quizRestart");

    const quizApplyMood =
        $("#quizApplyMood");


    const quizData = {

        "pt-BR": [
            {
                question:
                    "Qual atmosfera mais combina com você?",

                options: [
                    {
                        text: "Romântica",
                        mood: "romantic"
                    },
                    {
                        text: "Sonhadora",
                        mood: "dreamy"
                    },
                    {
                        text: "Noturna",
                        mood: "night"
                    },
                    {
                        text: "Energética",
                        mood: "energy"
                    }
                ]
            },

            {
                question:
                    "Qual momento você prefere?",

                options: [
                    {
                        text: "Um encontro especial",
                        mood: "romantic"
                    },
                    {
                        text: "Uma tarde tranquila",
                        mood: "dreamy"
                    },
                    {
                        text: "Uma noite marcante",
                        mood: "night"
                    },
                    {
                        text: "Sair com os amigos",
                        mood: "energy"
                    }
                ]
            },

            {
                question:
                    "Como você gosta de ser lembrado?",

                options: [
                    {
                        text: "Pelo carinho",
                        mood: "romantic"
                    },
                    {
                        text: "Pela delicadeza",
                        mood: "dreamy"
                    },
                    {
                        text: "Pelo mistério",
                        mood: "night"
                    },
                    {
                        text: "Pela presença",
                        mood: "energy"
                    }
                ]
            },

            {
                question:
                    "Escolha uma palavra.",

                options: [
                    {
                        text: "Amor",
                        mood: "romantic"
                    },
                    {
                        text: "Sonho",
                        mood: "dreamy"
                    },
                    {
                        text: "Lua",
                        mood: "night"
                    },
                    {
                        text: "Brilho",
                        mood: "energy"
                    }
                ]
            }
        ],


        "en-US": [
            {
                question:
                    "Which atmosphere fits you best?",

                options: [
                    {
                        text: "Romantic",
                        mood: "romantic"
                    },
                    {
                        text: "Dreamy",
                        mood: "dreamy"
                    },
                    {
                        text: "Night",
                        mood: "night"
                    },
                    {
                        text: "Energetic",
                        mood: "energy"
                    }
                ]
            },

            {
                question:
                    "Which moment do you prefer?",

                options: [
                    {
                        text: "A special date",
                        mood: "romantic"
                    },
                    {
                        text: "A peaceful afternoon",
                        mood: "dreamy"
                    },
                    {
                        text: "A memorable night",
                        mood: "night"
                    },
                    {
                        text: "Going out with friends",
                        mood: "energy"
                    }
                ]
            },

            {
                question:
                    "How would you like to be remembered?",

                options: [
                    {
                        text: "For affection",
                        mood: "romantic"
                    },
                    {
                        text: "For delicacy",
                        mood: "dreamy"
                    },
                    {
                        text: "For mystery",
                        mood: "night"
                    },
                    {
                        text: "For presence",
                        mood: "energy"
                    }
                ]
            },

            {
                question:
                    "Choose one word.",

                options: [
                    {
                        text: "Love",
                        mood: "romantic"
                    },
                    {
                        text: "Dream",
                        mood: "dreamy"
                    },
                    {
                        text: "Moon",
                        mood: "night"
                    },
                    {
                        text: "Glow",
                        mood: "energy"
                    }
                ]
            }
        ]
    };


    const quizResults = {

        romantic: {
            "pt-BR": {
                title:
                    "Seu Dream é Romântico ♡",

                text:
                    "Você combina com momentos delicados, conexões especiais e uma presença suave que fica na memória."
            },

            "en-US": {
                title:
                    "Your Dream is Romantic ♡",

                text:
                    "You match delicate moments, special connections and a soft presence that stays in people's memories."
            }
        },


        dreamy: {
            "pt-BR": {
                title:
                    "Seu Dream é Sonhador ✦",

                text:
                    "Você gosta de leveza, imaginação e de transformar momentos simples em algo especial."
            },

            "en-US": {
                title:
                    "Your Dream is Dreamy ✦",

                text:
                    "You enjoy softness, imagination and turning simple moments into something special."
            }
        },


        night: {
            "pt-BR": {
                title:
                    "Seu Dream é Noturno ☾",

                text:
                    "Mistério, elegância e uma presença envolvente combinam com a sua atmosfera."
            },

            "en-US": {
                title:
                    "Your Dream is Night ☾",

                text:
                    "Mystery, elegance and a captivating presence match your atmosphere."
            }
        },


        energy: {
            "pt-BR": {
                title:
                    "Seu Dream é Energia ✧",

                text:
                    "Você combina com movimento, personalidade e momentos que chamam atenção naturalmente."
            },

            "en-US": {
                title:
                    "Your Dream is Energy ✧",

                text:
                    "You match movement, personality and moments that naturally stand out."
            }
        }
    };


    let quizIndex =
        0;

    let quizScores =
        {};

    let quizFinalMood =
        "romantic";


    function resetQuiz() {

        quizIndex =
            0;


        quizScores = {
            romantic: 0,
            dreamy: 0,
            night: 0,
            energy: 0
        };


        quizFinalMood =
            "romantic";


        quizResult?.classList.remove(
            "active"
        );


        quizQuestions?.classList.remove(
            "hidden"
        );


        renderQuizQuestion();
    }


    function renderQuizQuestion() {

        const data =
            quizData[
                currentLanguage
            ] ||
            quizData["pt-BR"];


        const question =
            data[
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
                question.question;
        }


        if (
            quizCounter
        ) {

            quizCounter.textContent =
                `${quizIndex + 1}/${data.length}`;
        }


        if (
            quizProgress
        ) {

            quizProgress.style.width =
                `${
                    (
                        quizIndex /
                        data.length
                    ) *
                    100
                }%`;
        }


        if (
            !quizOptions
        ) {
            return;
        }


        quizOptions.innerHTML =
            "";


        question.options.forEach(
            option => {

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

                        $$(".quiz-option", quizOptions)
                            .forEach(
                                item => {

                                    item.disabled =
                                        true;
                                }
                            );


                        button.classList.add(
                            "selected"
                        );


                        quizScores[
                            option.mood
                        ]++;


                        setTimeout(
                            () => {

                                quizIndex++;


                                if (
                                    quizIndex >=
                                    data.length
                                ) {

                                    finishQuiz();

                                } else {

                                    renderQuizQuestion();
                                }

                            },
                            260
                        );
                    }
                );


                quizOptions.appendChild(
                    button
                );
            }
        );
    }


    function finishQuiz() {

        const entries =
            Object.entries(
                quizScores
            );


        entries.sort(
            (a, b) =>
                b[1] -
                a[1]
        );


        quizFinalMood =
            entries[0]?.[0] ||
            "romantic";


        const result =
            quizResults[
                quizFinalMood
            ][
                currentLanguage
            ];


        quizQuestions?.classList.add(
            "hidden"
        );


        if (
            quizProgress
        ) {

            quizProgress.style.width =
                "100%";
        }


        if (
            quizResultTitle
        ) {

            quizResultTitle.textContent =
                result.title;
        }


        if (
            quizResultText
        ) {

            quizResultText.textContent =
                result.text;
        }


        quizResult?.classList.add(
            "active"
        );
    }


    quizStart?.addEventListener(
        "click",
        () => {

            quizIntro?.classList.add(
                "hidden"
            );


            quizQuestions?.classList.remove(
                "hidden"
            );


            resetQuiz();
        }
    );


    quizRestart?.addEventListener(
        "click",
        resetQuiz
    );


    quizApplyMood?.addEventListener(
        "click",
        () => {

            applyMood(
                quizFinalMood
            );


            showToast(
                currentLanguage ===
                    "pt-BR"
                    ? "Seu mood foi aplicado ♡"
                    : "Your mood has been applied ♡"
            );
        }
    );


    /* =====================================================
       SHARE
    ===================================================== */

    async function shareDream() {

        const data = {

            title:
                document.title,

            text:
                currentLanguage ===
                    "pt-BR"
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
                navigator.clipboard
            ) {

                await navigator.clipboard.writeText(
                    window.location.href
                );


                showToast(
                    currentLanguage ===
                        "pt-BR"
                        ? "Link copiado ♡"
                        : "Link copied ♡"
                );
            }

        } catch {}
    }


    $$(
        "#shareButton, #quizShare, [data-share]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                shareDream
            );
        }
    );


    /* =====================================================
       FULLSCREEN
    ===================================================== */

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


    /* =====================================================
       SETTINGS — TEXT SIZE
    ===================================================== */

    $("#textSizeRange")?.addEventListener(
        "input",
        event => {

            const value =
                Number(
                    event.target.value
                );


            root.style.setProperty(
                "--text-scale",
                value / 100
            );


            body.style.fontSize =
                `${value}%`;


            const label =
                $("#textSizeValue");


            if (
                label
            ) {

                label.textContent =
                    `${value}%`;
            }


            storage.set(
                "dreamTextSize",
                value
            );
        }
    );


    /* =====================================================
       CONTRAST
    ===================================================== */

    $("#contrastRange")?.addEventListener(
        "input",
        event => {

            const value =
                Number(
                    event.target.value
                );


            root.style.setProperty(
                "--contrast",
                value / 100
            );


            const label =
                $("#contrastValue");


            if (
                label
            ) {

                label.textContent =
                    `${value}%`;
            }


            storage.set(
                "dreamContrast",
                value
            );
        }
    );


    /* =====================================================
       PARTICLE INTENSITY
    ===================================================== */

    $("#particleIntensityRange")?.addEventListener(
        "input",
        event => {

            const value =
                Number(
                    event.target.value
                );


            root.style.setProperty(
                "--particle-intensity",
                value / 100
            );


            const label =
                $("#particleIntensityValue");


            if (
                label
            ) {

                label.textContent =
                    `${value}%`;
            }


            storage.set(
                "dreamParticleIntensity",
                value
            );
        }
    );


    /* =====================================================
       MOTION SPEED
    ===================================================== */

    $("#motionSpeedRange")?.addEventListener(
        "input",
        event => {

            const value =
                Number(
                    event.target.value
                );


            root.style.setProperty(
                "--motion-speed",
                value / 100
            );


            const label =
                $("#motionSpeedValue");


            if (
                label
            ) {

                label.textContent =
                    `${value}%`;
            }


            storage.set(
                "dreamMotionSpeed",
                value
            );
        }
    );


    /* =====================================================
       PRESETS
    ===================================================== */

    $$("[data-preset]").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const preset =
                        button.dataset.preset;


                    switch (
                        preset
                    ) {

                        case "romantic":

                            setDark(
                                false
                            );

                            applyColors(
                                "#df76a8",
                                "#9562dc"
                            );

                            applyMood(
                                "romantic"
                            );

                            break;


                        case "night":

                            setDark(
                                true
                            );

                            applyColors(
                                "#9b67e6",
                                "#db5f9d"
                            );

                            applyMood(
                                "night"
                            );

                            break;


                        case "clean":

                            body.classList.add(
                                "clean-mode"
                            );


                            if (
                                $("#cleanModeToggle")
                            ) {

                                $("#cleanModeToggle").checked =
                                    true;
                            }


                            storage.set(
                                "dreamClean",
                                true
                            );

                            break;


                        case "performance":

                            body.classList.add(
                                "performance-mode"
                            );


                            if (
                                $("#performanceToggle")
                            ) {

                                $("#performanceToggle").checked =
                                    true;
                            }


                            storage.set(
                                "dreamPerformance",
                                true
                            );

                            break;
                    }


                    showToast(
                        currentLanguage ===
                            "pt-BR"
                            ? "Estilo aplicado"
                            : "Style applied"
                    );
                }
            );
        }
    );


    /* =====================================================
       RESTAURAR CONFIGURAÇÕES
    ===================================================== */

    $("#resetSettings")?.addEventListener(
        "click",
        () => {

            const keys = [
                "dreamDark",
                "dreamGlass",
                "dreamClean",
                "dreamPerformance",
                "dreamParticles",
                "dreamAnimations",
                "dreamCursor",
                "dreamMotion3d",
                "dreamMotionIntensity",
                "dreamSpraySound",
                "dreamHaptic",
                "dreamSprayIntensity",
                "dreamMusicVolume",
                "dreamPrimary",
                "dreamSecondary",
                "dreamPalette",
                "dreamTextSize",
                "dreamContrast",
                "dreamParticleIntensity",
                "dreamMotionSpeed",
                "dreamMood"
            ];


            keys.forEach(
                key => {

                    storage.remove(
                        key
                    );
                }
            );


            setDark(
                false
            );


            body.classList.remove(
                "no-glass",
                "clean-mode",
                "performance-mode",
                "no-particles",
                "no-animations",
                "no-cursor"
            );


            applyColors(
                "#df76a8",
                "#9562dc"
            );


            applyMood(
                "romantic"
            );


            const defaults = {

                glassToggle: true,
                cleanModeToggle: false,
                performanceToggle: false,
                particlesToggle: true,
                animationsToggle: true,
                cursorToggle: true,
                motion3dToggle: true,
                hapticToggle: true,
                spraySoundToggle: true
            };


            Object.entries(
                defaults
            ).forEach(
                ([id, value]) => {

                    const element =
                        document.getElementById(
                            id
                        );


                    if (
                        element
                    ) {

                        element.checked =
                            value;
                    }
                }
            );


            motion3dEnabled =
                true;


            hapticEnabled =
                true;


            spraySoundEnabled =
                true;


            motionIntensity =
                100;


            sprayIntensity =
                100;


            if (
                $("#motion3dRange")
            ) {

                $("#motion3dRange").value =
                    100;
            }


            if (
                $("#motion3dValue")
            ) {

                $("#motion3dValue").textContent =
                    "100%";
            }


            if (
                $("#sprayIntensityRange")
            ) {

                $("#sprayIntensityRange").value =
                    100;
            }


            if (
                $("#sprayIntensityValue")
            ) {

                $("#sprayIntensityValue").textContent =
                    "100%";
            }


            showToast(
                currentLanguage ===
                    "pt-BR"
                    ? "Configurações restauradas"
                    : "Settings restored"
            );
        }
    );


    /* =====================================================
       RESTAURAR CONFIGURAÇÕES SALVAS
    ===================================================== */

    function restoreSettings() {

        /* DARK */

        const dark =
            storage.get(
                "dreamDark",
                "false"
            ) === "true";


        setDark(
            dark,
            false
        );


        /* GLASS */

        const glass =
            storage.get(
                "dreamGlass",
                "true"
            ) !== "false";


        body.classList.toggle(
            "no-glass",
            !glass
        );


        if (
            $("#glassToggle")
        ) {

            $("#glassToggle").checked =
                glass;
        }


        /* CLEAN */

        const clean =
            storage.get(
                "dreamClean",
                "false"
            ) === "true";


        body.classList.toggle(
            "clean-mode",
            clean
        );


        if (
            $("#cleanModeToggle")
        ) {

            $("#cleanModeToggle").checked =
                clean;
        }


        /* PERFORMANCE */

        const performance =
            storage.get(
                "dreamPerformance",
                "false"
            ) === "true";


        body.classList.toggle(
            "performance-mode",
            performance
        );


        if (
            $("#performanceToggle")
        ) {

            $("#performanceToggle").checked =
                performance;
        }


        /* PARTICLES */

        const particles =
            storage.get(
                "dreamParticles",
                "true"
            ) !== "false";


        body.classList.toggle(
            "no-particles",
            !particles
        );


        if (
            $("#particlesToggle")
        ) {

            $("#particlesToggle").checked =
                particles;
        }


        /* ANIMATIONS */

        const animations =
            storage.get(
                "dreamAnimations",
                "true"
            ) !== "false";


        body.classList.toggle(
            "no-animations",
            !animations
        );


        if (
            $("#animationsToggle")
        ) {

            $("#animationsToggle").checked =
                animations;
        }


        /* CURSOR */

        const cursor =
            storage.get(
                "dreamCursor",
                "true"
            ) !== "false";


        body.classList.toggle(
            "no-cursor",
            !cursor
        );


        if (
            $("#cursorToggle")
        ) {

            $("#cursorToggle").checked =
                cursor;
        }


        /* 3D */

        motion3dEnabled =
            storage.get(
                "dreamMotion3d",
                "true"
            ) !== "false";


        if (
            $("#motion3dToggle")
        ) {

            $("#motion3dToggle").checked =
                motion3dEnabled;
        }


        motionIntensity =
            Number(
                storage.get(
                    "dreamMotionIntensity",
                    100
                )
            );


        if (
            $("#motion3dRange")
        ) {

            $("#motion3dRange").value =
                motionIntensity;
        }


        if (
            $("#motion3dValue")
        ) {

            $("#motion3dValue").textContent =
                `${motionIntensity}%`;
        }


        /* SPRAY */

        spraySoundEnabled =
            storage.get(
                "dreamSpraySound",
                "true"
            ) !== "false";


        if (
            $("#spraySoundToggle")
        ) {

            $("#spraySoundToggle").checked =
                spraySoundEnabled;
        }


        hapticEnabled =
            storage.get(
                "dreamHaptic",
                "true"
            ) !== "false";


        if (
            $("#hapticToggle")
        ) {

            $("#hapticToggle").checked =
                hapticEnabled;
        }


        sprayIntensity =
            Number(
                storage.get(
                    "dreamSprayIntensity",
                    100
                )
            );


        if (
            $("#sprayIntensityRange")
        ) {

            $("#sprayIntensityRange").value =
                sprayIntensity;
        }


        if (
            $("#sprayIntensityValue")
        ) {

            $("#sprayIntensityValue").textContent =
                `${sprayIntensity}%`;
        }


        /* COLORS */

        const primary =
            storage.get(
                "dreamPrimary",
                "#df76a8"
            );


        const secondary =
            storage.get(
                "dreamSecondary",
                "#9562dc"
            );


        applyColors(
            primary,
            secondary,
            false
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


        const palette =
            storage.get(
                "dreamPalette",
                "dream"
            );


        $$(".palette").forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.palette ===
                        palette
                );
            }
        );


        /* TEXT */

        const textSize =
            Number(
                storage.get(
                    "dreamTextSize",
                    100
                )
            );


        body.style.fontSize =
            `${textSize}%`;


        if (
            $("#textSizeRange")
        ) {

            $("#textSizeRange").value =
                textSize;
        }


        if (
            $("#textSizeValue")
        ) {

            $("#textSizeValue").textContent =
                `${textSize}%`;
        }


        /* CONTRAST */

        const contrast =
            Number(
                storage.get(
                    "dreamContrast",
                    100
                )
            );


        root.style.setProperty(
            "--contrast",
            contrast / 100
        );


        if (
            $("#contrastRange")
        ) {

            $("#contrastRange").value =
                contrast;
        }


        if (
            $("#contrastValue")
        ) {

            $("#contrastValue").textContent =
                `${contrast}%`;
        }


        /* PARTICLE INTENSITY */

        const particleIntensity =
            Number(
                storage.get(
                    "dreamParticleIntensity",
                    100
                )
            );


        root.style.setProperty(
            "--particle-intensity",
            particleIntensity / 100
        );


        if (
            $("#particleIntensityRange")
        ) {

            $("#particleIntensityRange").value =
                particleIntensity;
        }


        if (
            $("#particleIntensityValue")
        ) {

            $("#particleIntensityValue").textContent =
                `${particleIntensity}%`;
        }


        /* MOTION SPEED */

        const motionSpeed =
            Number(
                storage.get(
                    "dreamMotionSpeed",
                    100
                )
            );


        root.style.setProperty(
            "--motion-speed",
            motionSpeed / 100
        );


        if (
            $("#motionSpeedRange")
        ) {

            $("#motionSpeedRange").value =
                motionSpeed;
        }


        if (
            $("#motionSpeedValue")
        ) {

            $("#motionSpeedValue").textContent =
                `${motionSpeed}%`;
        }
    }


    restoreSettings();


    /* =====================================================
       SEÇÃO ATIVA
    ===================================================== */

    const sections =
        $$("section[id]");


    const navLinks =
        $$(
            '.menu a[href^="#"]'
        );


    if (
        sections.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
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


                            navLinks.forEach(
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


                            if (
                                sectionIndicator
                            ) {

                                const activeLink =
                                    navLinks.find(
                                        link =>
                                            link.getAttribute(
                                                "href"
                                            ) ===
                                                `#${id}`
                                    );


                                if (
                                    activeLink
                                ) {

                                    sectionIndicator.textContent =
                                        activeLink.textContent.trim();
                                }
                            }
                        }
                    );
                },
                {
                    rootMargin:
                        "-42% 0px -48% 0px",

                    threshold:
                        0
                }
            );


        sections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );
            }
        );
    }


    /* =====================================================
       TECLADO
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const target =
                event.target;


            if (
                target instanceof
                    HTMLInputElement ||
                target instanceof
                    HTMLTextAreaElement ||
                target?.isContentEditable
            ) {
                return;
            }


            /*
               ESC
            */

            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();


                $$(".modal.open").forEach(
                    closeModal
                );


                settingsPanel?.classList.remove(
                    "open"
                );


                menu?.classList.remove(
                    "open"
                );


                return;
            }


            /*
               S = SPRAY
            */

            if (
                event.key.toLowerCase() ===
                "s"
            ) {

                event.preventDefault();

                sprayDream();

                return;
            }


            /*
               M = MUSIC
            */

            if (
                event.key.toLowerCase() ===
                "m"
            ) {

                event.preventDefault();

                dreamMusicButton?.click();

                return;
            }


            /*
               D = DARK
            */

            if (
                event.key.toLowerCase() ===
                "d"
            ) {

                event.preventDefault();

                $("#themeButton")?.click();

                return;
            }


            /*
               G = GALLERY
            */

            if (
                event.key.toLowerCase() ===
                    "g" &&
                galleryItems.length
            ) {

                event.preventDefault();

                openLightbox(
                    0
                );
            }


            /*
               LIGHTBOX ARROWS
            */

            if (
                lightbox?.classList.contains(
                    "open"
                )
            ) {

                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    lightboxPrev?.click();
                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    lightboxNext?.click();
                }
            }
        }
    );


    /* =====================================================
       MOBILE / RESIZE
    ===================================================== */

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
                    150
                );
        },
        {
            passive: true
        }
    );


    /* =====================================================
       VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden &&
                galleryAutoActive
            ) {

                clearInterval(
                    galleryAutoTimer
                );

            } else if (
                !document.hidden &&
                galleryAutoActive
            ) {

                startGalleryAutoplay();
            }
        }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function updateReducedMotion() {

        body.classList.toggle(
            "system-reduced-motion",
            reducedMotion.matches
        );
    }


    updateReducedMotion();


    reducedMotion.addEventListener?.(
        "change",
        updateReducedMotion
    );


    /* =====================================================
       INICIALIZAÇÃO FINAL
    ===================================================== */

    updateScroll();

    updateMusicState();

    updateTimeline();

    updateFavorite();


    /*
       Libera funções úteis globalmente.
    */

    window.Dream = {

        spray:
            sprayDream,

        setLanguage,

        setMood:
            applyMood,

        setDark,

        showToast,

        openProduct:
            () =>
                openModal(
                    productModal
                ),

        openGallery:
            () =>
                openLightbox(
                    0
                )
    };


    /*
       Se o DOM já terminou de carregar
       e o loader ainda estiver presente,
       ele será removido.
    */

    if (
        document.readyState ===
            "complete"
    ) {

        setTimeout(
            closeLoader,
            300
        );
    }


    console.log(
        "%cDREAM v61",
        "font-size:18px;font-weight:800;"
    );


    console.log(
        "Dream experience initialized."
    );


}); // FIM DO DOMContentLoaded