/* =========================================================
   DREAM • AMOR NO AR
   SCRIPT.JS v60.2
   PARTE 1/2
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const clamp = (value, min, max) =>
        Math.min(Math.max(value, min), max);

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


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const loader = $(".loader");
    const progressBar = $(".progress div");

    const header = $(".header");
    const menu = $(".menu");
    const menuMobile = $(".menu-mobile");

    const themeButton =
        $("#themeToggle") ||
        $("[data-theme-toggle]");

    const backTop = $(".back-top");

    const particlesContainer = $(".particles");
    const cursorGlow = $(".cursor-glow");

    const sprayButton = $(".spray-button");
    const heroProduct = $(".hero-product");
    const bottle = $(".main-bottle");

    const sprayArea = $(".spray-area");
    const sprayWave = $(".spray-wave");
    const sprayGlow = $(".spray-glow");
    const sprayFlash = $(".spray-flash");

    const sprayCounter =
        $("#sprayCounter") ||
        $(".spray-counter-card strong");

    const musicPlayer = $(".dream-music-player");

    const musicAudio =
        $("#dreamMusic") ||
        $("#musicAudio") ||
        $("audio[data-music]");

    const sprayAudio =
        $("#sprayAudio") ||
        $("audio[data-spray]");

    const musicButton =
        $(".dream-music-button");

    const muteButton =
        $(".music-mute-button");

    const musicProgress =
        $("#musicProgress");

    const musicCurrent =
        $("#musicCurrent");

    const musicDuration =
        $("#musicDuration");

    const settingsFab =
        $(".settings-fab");

    const settingsPanel =
        $(".settings-panel");

    const settingsClose =
        $(".settings-close");

    const toast =
        $(".toast");


    /* =====================================================
       LOADER
    ===================================================== */

    function hideLoader() {
        if (!loader) return;

        loader.classList.add("hide");

        setTimeout(() => {
            loader.style.display = "none";
        }, 700);
    }

    /*
       Evita carregamento infinito.

       Mesmo que uma imagem, fonte ou áudio dê erro,
       o site abre normalmente.
    */

    window.addEventListener("load", () => {
        setTimeout(hideLoader, 350);
    });

    setTimeout(hideLoader, 3000);


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer;

    function showToast(message) {
        if (!toast || !message) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }


    /* =====================================================
       TRANSLATIONS
    ===================================================== */

    const translations = {

        pt: {
            pageTitle: "Dream • Amor no Ar",

            home: "Início",
            product: "Produto",
            notes: "Notas",
            experience: "Experiência",
            gallery: "Galeria",
            quiz: "Descubra",
            developers: "Desenvolvedores",

            explore: "Explorar",
            discover: "Descobrir",

            available: "Uma fragrância feita para sentir",
            heroDescription:
                "Uma experiência delicada, envolvente e inesquecível. Dream transforma fragrância em sensação.",

            viewProduct: "Conhecer Dream",
            discoverNotes: "Descobrir notas",

            original: "Original",
            exclusive: "Exclusivo",
            experienceLabel: "Experiência",

            heroTip:
                "Clique no borrifador e experimente um momento Dream.",

            spray: "Borrifar",
            sprayHint: "ou pressione S",
            sprays: "borrifadas",

            productEyebrow: "A FRAGRÂNCIA",
            productTitle: "Feita para deixar uma lembrança.",
            productDescription:
                "Dream combina delicadeza, personalidade e presença em uma fragrância criada para acompanhar momentos especiais.",

            topNote: "Saída",
            heartNote: "Coração",
            baseNote: "Fundo",

            notesEyebrow: "PIRÂMIDE OLFATIVA",
            notesTitle: "Uma história em três momentos.",
            notesDescription:
                "Cada etapa revela uma sensação diferente e constrói a identidade de Dream.",

            experienceEyebrow: "EXPERIÊNCIA",
            experienceTitle: "Não é apenas perfume.",
            experienceDescription:
                "Explore Dream de uma forma interativa e descubra como cada detalhe muda a experiência.",

            momentEyebrow: "MOMENTOS",
            momentTitle: "Dream combina com você.",
            momentDescription:
                "Uma fragrância para diferentes momentos, emoções e histórias.",

            galleryEyebrow: "GALERIA",
            galleryTitle: "Entre no universo Dream.",
            galleryDescription:
                "Explore detalhes, atmosfera e momentos inspirados pela fragrância.",

            moodEyebrow: "SEU MOMENTO",
            moodTitle: "Como você quer se sentir?",
            moodDescription:
                "Escolha uma sensação e deixe Dream criar a atmosfera.",

            quizEyebrow: "DESCUBRA",
            quizTitle: "Qual é o seu momento Dream?",
            quizDescription:
                "Responda algumas perguntas rápidas e descubra qual lado de Dream combina mais com você.",

            startQuiz: "Começar",
            restartQuiz: "Refazer",

            finalTitle: "Deixe sua marca.",
            finalDescription:
                "Alguns momentos passam. Outros ficam na memória.",

            developedBy: "DESENVOLVIDO POR",

            studioTitle: "Dream Studio",
            studioDescription:
                "Personalize sua experiência.",

            language: "Idioma",
            appearance: "Aparência",
            colors: "Cores",
            effects: "Efeitos",
            sound: "Som",

            light: "Claro",
            dark: "Escuro",
            automatic: "Automático",

            animations: "Animações",
            particles: "Partículas",
            cursor: "Brilho do cursor",
            glass: "Efeito de vidro",
            cleanMode: "Modo limpo",
            performance: "Desempenho",

            reset: "Restaurar configurações",

            portuguese: "Português",
            english: "Inglês",

            languageChanged: "Idioma alterado para Português.",
            themeChanged: "Tema atualizado.",
            settingsReset: "Configurações restauradas.",
            favoriteAdded: "Dream foi adicionado aos favoritos.",
            favoriteRemoved: "Dream foi removido dos favoritos.",

            playing: "Reproduzindo",
            paused: "Pausado",

            sceneTitle: "Escolha uma atmosfera",
            sceneDescription:
                "Cada cenário revela um lado diferente da experiência Dream.",

            morning: "Manhã",
            afternoon: "Tarde",
            night: "Noite",
            date: "Encontro",

            romantic: "Romântico",
            confident: "Confiante",
            calm: "Leve",
            mysterious: "Misterioso",
            elegant: "Elegante"
        },


        en: {
            pageTitle: "Dream • Love in the Air",

            home: "Home",
            product: "Product",
            notes: "Notes",
            experience: "Experience",
            gallery: "Gallery",
            quiz: "Discover",
            developers: "Developers",

            explore: "Explore",
            discover: "Discover",

            available: "A fragrance made to be felt",
            heroDescription:
                "A delicate, captivating and unforgettable experience. Dream turns fragrance into emotion.",

            viewProduct: "Discover Dream",
            discoverNotes: "Discover notes",

            original: "Original",
            exclusive: "Exclusive",
            experienceLabel: "Experience",

            heroTip:
                "Press the spray button and experience a Dream moment.",

            spray: "Spray",
            sprayHint: "or press S",
            sprays: "sprays",

            productEyebrow: "THE FRAGRANCE",
            productTitle: "Made to leave a memory.",
            productDescription:
                "Dream combines delicacy, personality and presence in a fragrance created for special moments.",

            topNote: "Top",
            heartNote: "Heart",
            baseNote: "Base",

            notesEyebrow: "OLFACTORY PYRAMID",
            notesTitle: "A story in three moments.",
            notesDescription:
                "Each stage reveals a different sensation and builds Dream's identity.",

            experienceEyebrow: "EXPERIENCE",
            experienceTitle: "More than a fragrance.",
            experienceDescription:
                "Explore Dream interactively and discover how every detail changes the experience.",

            momentEyebrow: "MOMENTS",
            momentTitle: "Dream matches your moment.",
            momentDescription:
                "A fragrance for different moments, emotions and stories.",

            galleryEyebrow: "GALLERY",
            galleryTitle: "Enter the Dream universe.",
            galleryDescription:
                "Explore details, atmosphere and moments inspired by the fragrance.",

            moodEyebrow: "YOUR MOMENT",
            moodTitle: "How do you want to feel?",
            moodDescription:
                "Choose a feeling and let Dream create the atmosphere.",

            quizEyebrow: "DISCOVER",
            quizTitle: "What is your Dream moment?",
            quizDescription:
                "Answer a few quick questions and discover which side of Dream matches you.",

            startQuiz: "Start",
            restartQuiz: "Try again",

            finalTitle: "Leave your mark.",
            finalDescription:
                "Some moments pass. Others stay in your memory.",

            developedBy: "DEVELOPED BY",

            studioTitle: "Dream Studio",
            studioDescription:
                "Customize your experience.",

            language: "Language",
            appearance: "Appearance",
            colors: "Colors",
            effects: "Effects",
            sound: "Sound",

            light: "Light",
            dark: "Dark",
            automatic: "Automatic",

            animations: "Animations",
            particles: "Particles",
            cursor: "Cursor glow",
            glass: "Glass effect",
            cleanMode: "Clean mode",
            performance: "Performance",

            reset: "Reset settings",

            portuguese: "Portuguese",
            english: "English",

            languageChanged: "Language changed to English.",
            themeChanged: "Theme updated.",
            settingsReset: "Settings restored.",
            favoriteAdded: "Dream was added to favorites.",
            favoriteRemoved: "Dream was removed from favorites.",

            playing: "Playing",
            paused: "Paused",

            sceneTitle: "Choose an atmosphere",
            sceneDescription:
                "Each setting reveals a different side of the Dream experience.",

            morning: "Morning",
            afternoon: "Afternoon",
            night: "Night",
            date: "Date",

            romantic: "Romantic",
            confident: "Confident",
            calm: "Light",
            mysterious: "Mysterious",
            elegant: "Elegant"
        }
    };


    /* =====================================================
       LANGUAGE SYSTEM
    ===================================================== */

    let currentLanguage =
        storage.get("dream-language", "pt");

    if (!translations[currentLanguage]) {
        currentLanguage = "pt";
    }

    function translateElement(element, language) {
        const key = element.dataset.i18n;

        if (!key) return;

        const translation =
            translations[language]?.[key];

        if (translation === undefined) return;

        element.textContent = translation;
    }

    function translatePlaceholder(element, language) {
        const key =
            element.dataset.i18nPlaceholder;

        if (!key) return;

        const translation =
            translations[language]?.[key];

        if (translation === undefined) return;

        element.placeholder = translation;
    }

    function updateLanguageButtons(language) {

        $$(".language-button").forEach(button => {

            const buttonLanguage =
                button.dataset.lang;

            button.classList.toggle(
                "active",
                buttonLanguage === language
            );

            button.setAttribute(
                "aria-pressed",
                buttonLanguage === language
                    ? "true"
                    : "false"
            );
        });


        $$(".footer-lang").forEach(button => {

            const buttonLanguage =
                button.dataset.lang;

            button.classList.toggle(
                "active",
                buttonLanguage === language
            );
        });


        $$(".settings-language-button").forEach(button => {

            const buttonLanguage =
                button.dataset.lang;

            button.classList.toggle(
                "active",
                buttonLanguage === language
            );
        });
    }

    function applyLanguage(language, notify = false) {

        if (!translations[language]) {
            language = "pt";
        }

        currentLanguage = language;

        storage.set(
            "dream-language",
            language
        );

        document.documentElement.lang =
            language === "pt"
                ? "pt-BR"
                : "en";

        document.title =
            translations[language].pageTitle;


        $$("[data-i18n]").forEach(element => {
            translateElement(
                element,
                language
            );
        });


        $$("[data-i18n-placeholder]").forEach(element => {
            translatePlaceholder(
                element,
                language
            );
        });


        updateLanguageButtons(language);


        if (notify) {
            showToast(
                translations[language]
                    .languageChanged
            );
        }
    }


    document.addEventListener("click", event => {

        const languageButton =
            event.target.closest(
                ".language-button, .footer-lang, .settings-language-button"
            );

        if (!languageButton) return;

        const language =
            languageButton.dataset.lang;

        if (!language) return;

        applyLanguage(
            language,
            true
        );
    });


    applyLanguage(
        currentLanguage,
        false
    );


    /* =====================================================
       HEADER
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 25
        );
    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        if (!menu) return;

        menu.classList.remove("open");

        if (menuMobile) {
            menuMobile.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }

    if (menuMobile && menu) {

        menuMobile.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const open =
                    menu.classList.toggle(
                        "open"
                    );

                menuMobile.setAttribute(
                    "aria-expanded",
                    String(open)
                );
            }
        );


        menu.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest("a")
                ) {
                    closeMobileMenu();
                }
            }
        );


        document.addEventListener(
            "click",
            event => {

                if (
                    !menu.contains(event.target) &&
                    !menuMobile.contains(event.target)
                ) {
                    closeMobileMenu();
                }
            }
        );
    }


    /* =====================================================
       SMOOTH LINKS
    ===================================================== */

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute("href");

                if (!id || id === "#") return;

                const target =
                    $(id);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior:
                        body.classList.contains(
                            "no-animations"
                        )
                            ? "auto"
                            : "smooth",
                    block: "start"
                });
            }
        );
    });


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        if (!progressBar) return;

        const scrollable =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        const progress =
            scrollable <= 0
                ? 0
                : (
                    window.scrollY /
                    scrollable
                ) * 100;

        progressBar.style.width =
            `${clamp(progress, 0, 100)}%`;
    }

    updateScrollProgress();

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function updateBackTop() {

        if (!backTop) return;

        backTop.classList.toggle(
            "show",
            window.scrollY > 650
        );
    }

    updateBackTop();

    window.addEventListener(
        "scroll",
        updateBackTop,
        { passive: true }
    );

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

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) return;

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


    /* =====================================================
       PARTICLES
    ===================================================== */

    function createParticles() {

        if (!particlesContainer) return;

        particlesContainer.innerHTML = "";

        const symbols = [
            "✦",
            "♡",
            "·",
            "✧"
        ];

        const total =
            window.innerWidth < 650
                ? 10
                : 18;

        for (
            let index = 0;
            index < total;
            index++
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
                `${6 + Math.random() * 10}px`;

            particle.style.setProperty(
                "--duration",
                `${10 + Math.random() * 12}s`
            );

            particle.style.setProperty(
                "--delay",
                `${Math.random() * -15}s`
            );

            particlesContainer.appendChild(
                particle
            );
        }
    }

    createParticles();


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    let cursorX =
        window.innerWidth / 2;

    let cursorY =
        window.innerHeight / 2;

    let glowX = cursorX;
    let glowY = cursorY;

    document.addEventListener(
        "pointermove",
        event => {

            cursorX = event.clientX;
            cursorY = event.clientY;
        },
        { passive: true }
    );

    function animateCursorGlow() {

        if (cursorGlow) {

            glowX +=
                (cursorX - glowX) * 0.11;

            glowY +=
                (cursorY - glowY) * 0.11;

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


    /* =====================================================
       PRODUCT 3D
    ===================================================== */

    if (
        heroProduct &&
        bottle &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        heroProduct.addEventListener(
            "pointermove",
            event => {

                if (
                    heroProduct.classList.contains(
                        "spraying"
                    )
                ) return;

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

                bottle.style.transform =
                    `
                    rotateY(${x * 8}deg)
                    rotateX(${y * -6}deg)
                    translateY(${y * 4}px)
                    `;
            }
        );


        heroProduct.addEventListener(
            "pointerleave",
            () => {

                bottle.style.transform = "";
            }
        );
    }


    /* =====================================================
       SPRAY EFFECT
    ===================================================== */

    let sprayCount =
        Number(
            storage.get(
                "dream-spray-count",
                "0"
            )
        ) || 0;

    let sprayLocked = false;


    function updateSprayCounter() {

        if (!sprayCounter) return;

        sprayCounter.textContent =
            sprayCount;
    }

    updateSprayCounter();


    function restartClassAnimation(
        element,
        className
    ) {

        if (!element) return;

        element.classList.remove(
            className
        );

        void element.offsetWidth;

        element.classList.add(
            className
        );
    }


    function createSprayMist() {

        if (!sprayArea) return;

        const amount =
            window.innerWidth < 650
                ? 24
                : 38;

        for (
            let index = 0;
            index < amount;
            index++
        ) {

            const mist =
                document.createElement("i");

            mist.className =
                "spray-mist";

            const angle =
                (
                    Math.random() *
                    Math.PI
                ) - Math.PI / 2;

            const distance =
                55 +
                Math.random() * 145;

            const x =
                Math.cos(angle) *
                distance;

            const y =
                Math.sin(angle) *
                distance;

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
                `${3 + Math.random() * 8}px`
            );

            mist.style.setProperty(
                "--mist-blur",
                `${1 + Math.random() * 4}px`
            );

            mist.style.setProperty(
                "--mist-duration",
                `${0.55 + Math.random() * 0.5}s`
            );

            sprayArea.appendChild(mist);

            setTimeout(() => {
                mist.remove();
            }, 1200);
        }
    }


    function createSpraySymbols() {

        if (!sprayArea) return;

        const symbols = [
            "✦",
            "✧",
            "♡"
        ];

        const amount =
            window.innerWidth < 650
                ? 5
                : 8;

        for (
            let index = 0;
            index < amount;
            index++
        ) {

            const symbol =
                document.createElement("span");

            symbol.className =
                "spray-symbol-particle";

            symbol.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];

            const direction =
                Math.random() > 0.5
                    ? 1
                    : -1;

            symbol.style.setProperty(
                "--symbol-x",
                `${
                    direction *
                    (
                        30 +
                        Math.random() * 110
                    )
                }px`
            );

            symbol.style.setProperty(
                "--symbol-y",
                `${
                    -25 -
                    Math.random() * 120
                }px`
            );

            symbol.style.setProperty(
                "--symbol-rotate",
                `${
                    -90 +
                    Math.random() * 180
                }deg`
            );

            symbol.style.fontSize =
                `${7 + Math.random() * 9}px`;

            sprayArea.appendChild(
                symbol
            );

            setTimeout(() => {
                symbol.remove();
            }, 1500);
        }
    }


    function playSprayAudio() {

        if (!sprayAudio) return;

        try {

            /*
               IMPORTANTE:

               Seu MP3 possui várias borrifadas.
               Aqui usamos somente o começo do arquivo
               e paramos rapidamente.

               Assim:
               1 clique = 1 borrifada.
            */

            sprayAudio.pause();
            sprayAudio.currentTime = 0;

            const playPromise =
                sprayAudio.play();

            if (
                playPromise &&
                typeof playPromise.catch ===
                    "function"
            ) {
                playPromise.catch(() => {});
            }

            setTimeout(() => {

                sprayAudio.pause();

                try {
                    sprayAudio.currentTime = 0;
                } catch {}

            }, 430);

        } catch {}
    }


    function spray() {

        if (sprayLocked) return;

        sprayLocked = true;

        sprayCount++;

        storage.set(
            "dream-spray-count",
            String(sprayCount)
        );

        updateSprayCounter();


        if (heroProduct) {

            heroProduct.classList.remove(
                "spraying"
            );

            void heroProduct.offsetWidth;

            heroProduct.classList.add(
                "spraying"
            );
        }


        restartClassAnimation(
            sprayWave,
            "active"
        );

        restartClassAnimation(
            sprayGlow,
            "active"
        );

        restartClassAnimation(
            sprayFlash,
            "active"
        );


        createSprayMist();
        createSpraySymbols();

        playSprayAudio();


        if (
            navigator.vibrate &&
            window.innerWidth < 900
        ) {
            navigator.vibrate(18);
        }


        setTimeout(() => {

            heroProduct?.classList.remove(
                "spraying"
            );

            sprayLocked = false;

        }, 720);
    }


    sprayButton?.addEventListener(
        "click",
        spray
    );


    document.addEventListener(
        "keydown",
        event => {

            const active =
                document.activeElement;

            const typing =
                active &&
                (
                    active.tagName === "INPUT" ||
                    active.tagName === "TEXTAREA" ||
                    active.tagName === "SELECT" ||
                    active.isContentEditable
                );

            if (typing) return;

            if (
                event.key.toLowerCase() ===
                "s"
            ) {
                spray();
            }
        }
    );


    /* =====================================================
       MUSIC PLAYER
    ===================================================== */

    function formatTime(seconds) {

        if (
            !Number.isFinite(seconds)
        ) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remaining =
            Math.floor(seconds % 60)
                .toString()
                .padStart(2, "0");

        return `${minutes}:${remaining}`;
    }


    function updateMusicButton() {

        if (
            !musicButton ||
            !musicAudio
        ) return;

        const playing =
            !musicAudio.paused;

        musicPlayer?.classList.toggle(
            "playing",
            playing
        );

        musicButton.setAttribute(
            "aria-label",
            playing
                ? translations[
                    currentLanguage
                ].paused
                : translations[
                    currentLanguage
                ].playing
        );

        const icon =
            musicButton.querySelector(
                "span, i"
            );

        if (icon) {
            icon.textContent =
                playing
                    ? "❚❚"
                    : "▶";
        }
    }


    musicButton?.addEventListener(
        "click",
        async () => {

            if (!musicAudio) return;

            try {

                if (musicAudio.paused) {
                    await musicAudio.play();
                } else {
                    musicAudio.pause();
                }

            } catch {}

            updateMusicButton();
        }
    );


    musicAudio?.addEventListener(
        "play",
        updateMusicButton
    );

    musicAudio?.addEventListener(
        "pause",
        updateMusicButton
    );


    musicAudio?.addEventListener(
        "loadedmetadata",
        () => {

            if (musicDuration) {
                musicDuration.textContent =
                    formatTime(
                        musicAudio.duration
                    );
            }

            if (musicProgress) {
                musicProgress.max =
                    Math.max(
                        musicAudio.duration,
                        1
                    );
            }
        }
    );


    musicAudio?.addEventListener(
        "timeupdate",
        () => {

            if (musicCurrent) {
                musicCurrent.textContent =
                    formatTime(
                        musicAudio.currentTime
                    );
            }

            if (
                musicProgress &&
                !musicProgress.matches(
                    ":active"
                )
            ) {
                musicProgress.value =
                    musicAudio.currentTime;
            }
        }
    );


    musicProgress?.addEventListener(
        "input",
        () => {

            if (!musicAudio) return;

            musicAudio.currentTime =
                Number(
                    musicProgress.value
                );
        }
    );


    muteButton?.addEventListener(
        "click",
        () => {

            if (!musicAudio) return;

            musicAudio.muted =
                !musicAudio.muted;

            const icon =
                muteButton.querySelector(
                    "span, i"
                );

            if (icon) {
                icon.textContent =
                    musicAudio.muted
                        ? "🔇"
                        : "🔊";
            }
        }
    );


    updateMusicButton();


    /* =====================================================
       SETTINGS PANEL
    ===================================================== */

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


    function closeSettings() {

        if (!settingsPanel) return;

        settingsPanel.classList.remove(
            "open"
        );

        settingsPanel.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    settingsFab?.addEventListener(
        "click",
        () => {

            if (
                settingsPanel?.classList.contains(
                    "open"
                )
            ) {
                closeSettings();
            } else {
                openSettings();
            }
        }
    );


    settingsClose?.addEventListener(
        "click",
        closeSettings
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {
                closeSettings();
                closeMobileMenu();
            }
        }
    );


    /* =====================================================
       THEME
    ===================================================== */

    let theme =
        storage.get(
            "dream-theme",
            "light"
        );

    function applyTheme(
        selectedTheme,
        notify = false
    ) {

        theme = selectedTheme;

        storage.set(
            "dream-theme",
            selectedTheme
        );

        const systemDark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        const shouldBeDark =
            selectedTheme === "dark" ||
            (
                selectedTheme === "auto" &&
                systemDark
            );

        body.classList.toggle(
            "dark",
            shouldBeDark
        );


        $$("[data-theme]").forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.theme ===
                    selectedTheme
            );
        });


        if (themeButton) {

            const icon =
                themeButton.querySelector(
                    "span, i"
                );

            if (icon) {
                icon.textContent =
                    shouldBeDark
                        ? "☀"
                        : "☾";
            }
        }


        if (notify) {
            showToast(
                translations[
                    currentLanguage
                ].themeChanged
            );
        }
    }


    themeButton?.addEventListener(
        "click",
        () => {

            applyTheme(
                body.classList.contains(
                    "dark"
                )
                    ? "light"
                    : "dark",
                true
            );
        }
    );


    $$("[data-theme]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                applyTheme(
                    button.dataset.theme,
                    true
                );
            }
        );
    });


    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).addEventListener?.(
        "change",
        () => {

            if (theme === "auto") {
                applyTheme(
                    "auto",
                    false
                );
            }
        }
    );


    applyTheme(
        theme,
        false
    );


    /* =====================================================
       END PART 1
       Continue immediately with PART 2.
    ===================================================== */
        /* =====================================================
       SETTINGS — EFFECT TOGGLES
    ===================================================== */

    const settingMap = [
        {
            selector: '[data-setting="animations"]',
            storageKey: "dream-animations",
            bodyClass: "no-animations",
            inverted: true
        },
        {
            selector: '[data-setting="particles"]',
            storageKey: "dream-particles",
            bodyClass: "no-particles",
            inverted: true
        },
        {
            selector: '[data-setting="cursor"]',
            storageKey: "dream-cursor",
            bodyClass: "no-cursor-glow",
            inverted: true
        },
        {
            selector: '[data-setting="glass"]',
            storageKey: "dream-glass",
            bodyClass: "no-glass",
            inverted: true
        },
        {
            selector: '[data-setting="clean"]',
            storageKey: "dream-clean",
            bodyClass: "clean-mode",
            inverted: false
        },
        {
            selector: '[data-setting="performance"]',
            storageKey: "dream-performance",
            bodyClass: "performance-mode",
            inverted: false
        }
    ];


    function getBooleanSetting(key, fallback = true) {

        const value = storage.get(key);

        if (value === null) {
            return fallback;
        }

        return value === "true";
    }


    function applySetting(config, value) {

        const element =
            $(config.selector);

        storage.set(
            config.storageKey,
            String(value)
        );


        if (element) {

            if (
                element.type === "checkbox"
            ) {
                element.checked = value;
            }

            element.classList.toggle(
                "active",
                value
            );

            element.setAttribute(
                "aria-pressed",
                String(value)
            );
        }


        const classEnabled =
            config.inverted
                ? !value
                : value;

        body.classList.toggle(
            config.bodyClass,
            classEnabled
        );
    }


    settingMap.forEach(config => {

        const fallback =
            config.storageKey ===
            "dream-clean"
                ? false
                : config.storageKey ===
                  "dream-performance"
                    ? false
                    : true;

        const value =
            getBooleanSetting(
                config.storageKey,
                fallback
            );

        applySetting(
            config,
            value
        );


        const control =
            $(config.selector);

        if (!control) return;


        control.addEventListener(
            "change",
            () => {

                const newValue =
                    control.type ===
                    "checkbox"
                        ? control.checked
                        : !control.classList.contains(
                            "active"
                        );

                applySetting(
                    config,
                    newValue
                );
            }
        );


        if (
            control.type !==
            "checkbox"
        ) {

            control.addEventListener(
                "click",
                () => {

                    const newValue =
                        !control.classList.contains(
                            "active"
                        );

                    applySetting(
                        config,
                        newValue
                    );
                }
            );
        }
    });


    /* =====================================================
       PERFORMANCE MODE
    ===================================================== */

    function updatePerformanceMode() {

        const enabled =
            body.classList.contains(
                "performance-mode"
            );

        if (enabled) {

            body.classList.add(
                "no-cursor-glow"
            );

            if (particlesContainer) {
                particlesContainer.classList.add(
                    "performance-hidden"
                );
            }

        } else {

            const cursorEnabled =
                getBooleanSetting(
                    "dream-cursor",
                    true
                );

            body.classList.toggle(
                "no-cursor-glow",
                !cursorEnabled
            );

            particlesContainer?.classList.remove(
                "performance-hidden"
            );
        }
    }


    const performanceControl =
        $('[data-setting="performance"]');

    performanceControl?.addEventListener(
        "change",
        updatePerformanceMode
    );

    performanceControl?.addEventListener(
        "click",
        () => {
            setTimeout(
                updatePerformanceMode,
                0
            );
        }
    );

    updatePerformanceMode();


    /* =====================================================
       ACCENT / GRADIENT COLORS
    ===================================================== */

    const colorButtons =
        $$("[data-accent]");

    let currentAccent =
        storage.get(
            "dream-accent",
            "dream"
        );


    function applyAccent(accent) {

        currentAccent = accent;

        storage.set(
            "dream-accent",
            accent
        );

        body.dataset.accent =
            accent;


        colorButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.accent ===
                    accent
            );
        });
    }


    colorButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                applyAccent(
                    button.dataset.accent
                );
            }
        );
    });


    applyAccent(currentAccent);


    /* =====================================================
       SOUND SETTING
    ===================================================== */

    const soundControl =
        $('[data-setting="sound"]');

    let soundEnabled =
        getBooleanSetting(
            "dream-sound",
            true
        );


    function applySoundSetting(value) {

        soundEnabled = value;

        storage.set(
            "dream-sound",
            String(value)
        );

        if (soundControl) {

            if (
                soundControl.type ===
                "checkbox"
            ) {
                soundControl.checked =
                    value;
            }

            soundControl.classList.toggle(
                "active",
                value
            );
        }


        if (!value) {

            musicAudio?.pause();

            if (sprayAudio) {
                sprayAudio.pause();
            }

            updateMusicButton();
        }
    }


    if (soundControl) {

        applySoundSetting(
            soundEnabled
        );

        soundControl.addEventListener(
            "change",
            () => {

                applySoundSetting(
                    soundControl.checked
                );
            }
        );
    }


    /*
       Substitui a função de áudio da Parte 1
       para também respeitar a configuração
       de som.
    */

    playSprayAudio = function () {

        if (
            !sprayAudio ||
            !soundEnabled
        ) return;

        try {

            sprayAudio.pause();
            sprayAudio.currentTime = 0;

            const promise =
                sprayAudio.play();

            promise?.catch?.(() => {});


            /*
               O MP3 original possui aproximadamente
               5 borrifadas em 2 segundos.

               Cortamos o áudio após a PRIMEIRA.
            */

            setTimeout(() => {

                try {

                    sprayAudio.pause();
                    sprayAudio.currentTime = 0;

                } catch {}

            }, 430);

        } catch {}
    };


    /* =====================================================
       FAVORITE
    ===================================================== */

    const favoriteButtons =
        $$(
            ".favorite-button, [data-favorite]"
        );

    let favorite =
        getBooleanSetting(
            "dream-favorite",
            false
        );


    function updateFavorite(
        notify = false
    ) {

        storage.set(
            "dream-favorite",
            String(favorite)
        );


        favoriteButtons.forEach(button => {

            button.classList.toggle(
                "active",
                favorite
            );

            button.setAttribute(
                "aria-pressed",
                String(favorite)
            );


            const icon =
                button.querySelector(
                    ".favorite-icon"
                );

            if (icon) {
                icon.textContent =
                    favorite
                        ? "♥"
                        : "♡";
            }
        });


        if (notify) {

            showToast(
                favorite
                    ? translations[
                        currentLanguage
                    ].favoriteAdded
                    : translations[
                        currentLanguage
                    ].favoriteRemoved
            );
        }
    }


    favoriteButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                favorite =
                    !favorite;

                updateFavorite(true);
            }
        );
    });


    updateFavorite(false);


    /* =====================================================
       EXPERIENCE / MOMENT CARDS
    ===================================================== */

    const experienceCards =
        $$(
            ".experience-card, .moment-card, [data-scene]"
        );


    experienceCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                experienceCards.forEach(
                    item => {
                        item.classList.remove(
                            "active"
                        );
                    }
                );

                card.classList.add(
                    "active"
                );


                const scene =
                    card.dataset.scene;

                if (scene) {

                    body.dataset.scene =
                        scene;

                    storage.set(
                        "dream-scene",
                        scene
                    );
                }
            }
        );
    });


    const savedScene =
        storage.get(
            "dream-scene"
        );

    if (savedScene) {

        body.dataset.scene =
            savedScene;

        const savedCard =
            $(
                `[data-scene="${savedScene}"]`
            );

        savedCard?.classList.add(
            "active"
        );
    }


    /* =====================================================
       MOOD SELECTOR
    ===================================================== */

    const moodButtons =
        $$("[data-mood]");

    const moodDisplay =
        $(".mood-display");

    const moodText =
        $(".mood-display-text");


    function applyMood(
        mood,
        save = true
    ) {

        if (!mood) return;


        moodButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.mood ===
                    mood
            );
        });


        body.dataset.mood =
            mood;


        if (moodDisplay) {

            moodDisplay.dataset.mood =
                mood;

            restartClassAnimation(
                moodDisplay,
                "changing"
            );
        }


        if (moodText) {

            const translated =
                translations[
                    currentLanguage
                ][mood];

            if (translated) {
                moodText.textContent =
                    translated;
            }
        }


        if (save) {

            storage.set(
                "dream-mood",
                mood
            );
        }
    }


    moodButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                applyMood(
                    button.dataset.mood
                );
            }
        );
    });


    const savedMood =
        storage.get(
            "dream-mood"
        );

    if (savedMood) {
        applyMood(
            savedMood,
            false
        );
    }


    /* =====================================================
       GALLERY
    ===================================================== */

    const galleryItems =
        $$(".gallery-item");

    const galleryModal =
        $(".gallery-modal");

    const galleryModalImage =
        $(".gallery-modal img");

    const galleryModalClose =
        $(".gallery-modal-close");


    function openGalleryItem(item) {

        if (
            !galleryModal ||
            !galleryModalImage
        ) return;

        const image =
            $("img", item);

        if (!image) return;


        galleryModalImage.src =
            image.src;

        galleryModalImage.alt =
            image.alt || "Dream";


        galleryModal.classList.add(
            "open"
        );

        galleryModal.setAttribute(
            "aria-hidden",
            "false"
        );

        body.classList.add(
            "modal-open"
        );
    }


    function closeGallery() {

        if (!galleryModal) return;

        galleryModal.classList.remove(
            "open"
        );

        galleryModal.setAttribute(
            "aria-hidden",
            "true"
        );

        body.classList.remove(
            "modal-open"
        );
    }


    galleryItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {
                openGalleryItem(item);
            }
        );
    });


    galleryModalClose?.addEventListener(
        "click",
        closeGallery
    );


    galleryModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                galleryModal
            ) {
                closeGallery();
            }
        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {
                closeGallery();
            }
        }
    );


    /* =====================================================
       QUIZ
    ===================================================== */

    const quiz =
        $(".quiz");

    const quizStart =
        $(".quiz-start");

    const quizIntro =
        $(".quiz-intro");

    const quizQuestions =
        $$(".quiz-question");

    const quizResult =
        $(".quiz-result");

    const quizRestart =
        $(".quiz-restart");

    const quizResultTitle =
        $(".quiz-result-title");

    const quizResultText =
        $(".quiz-result-text");

    const quizProgress =
        $(".quiz-progress-fill");


    let currentQuestion = 0;

    const quizScores = {};


    function resetQuizScores() {

        Object.keys(
            quizScores
        ).forEach(key => {
            delete quizScores[key];
        });
    }


    function showQuizQuestion(index) {

        quizQuestions.forEach(
            (question, questionIndex) => {

                question.classList.toggle(
                    "active",
                    questionIndex === index
                );
            }
        );


        if (quizProgress) {

            const progress =
                (
                    index /
                    Math.max(
                        quizQuestions.length,
                        1
                    )
                ) * 100;

            quizProgress.style.width =
                `${progress}%`;
        }
    }


    function startQuiz() {

        currentQuestion = 0;

        resetQuizScores();

        quizIntro?.classList.add(
            "hidden"
        );

        quizResult?.classList.remove(
            "active"
        );

        quiz?.classList.add(
            "started"
        );

        showQuizQuestion(0);
    }


    function calculateQuizResult() {

        let result =
            "romantic";

        let highest =
            -Infinity;


        Object.entries(
            quizScores
        ).forEach(
            ([key, score]) => {

                if (score > highest) {

                    highest = score;
                    result = key;
                }
            }
        );


        return result;
    }


    function finishQuiz() {

        quizQuestions.forEach(
            question => {

                question.classList.remove(
                    "active"
                );
            }
        );


        const result =
            calculateQuizResult();


        const resultNames = {

            romantic: {
                pt: "Dream Romântico",
                en: "Romantic Dream"
            },

            elegant: {
                pt: "Dream Elegante",
                en: "Elegant Dream"
            },

            mysterious: {
                pt: "Dream Misterioso",
                en: "Mysterious Dream"
            },

            confident: {
                pt: "Dream Confiante",
                en: "Confident Dream"
            },

            calm: {
                pt: "Dream Leve",
                en: "Light Dream"
            }
        };


        const resultDescriptions = {

            romantic: {
                pt:
                    "Você valoriza conexão, detalhes e momentos que ficam na memória.",
                en:
                    "You value connection, details and moments that stay in your memory."
            },

            elegant: {
                pt:
                    "Seu estilo é marcante sem precisar exagerar. Presença e sofisticação combinam com você.",
                en:
                    "Your style stands out without trying too hard. Presence and sophistication match you."
            },

            mysterious: {
                pt:
                    "Você gosta de deixar um pouco de mistério no ar e ser lembrado pela sua presença.",
                en:
                    "You like leaving a little mystery in the air and being remembered for your presence."
            },

            confident: {
                pt:
                    "Você prefere entrar em um ambiente e deixar sua personalidade falar por você.",
                en:
                    "You prefer entering a room and letting your personality speak for you."
            },

            calm: {
                pt:
                    "Você combina com momentos leves, naturais e confortáveis.",
                en:
                    "You match light, natural and comfortable moments."
            }
        };


        if (quizResultTitle) {

            quizResultTitle.textContent =
                resultNames[result]?.[
                    currentLanguage
                ] ||
                resultNames.romantic[
                    currentLanguage
                ];
        }


        if (quizResultText) {

            quizResultText.textContent =
                resultDescriptions[
                    result
                ]?.[
                    currentLanguage
                ] ||
                resultDescriptions
                    .romantic[
                        currentLanguage
                    ];
        }


        quizResult?.classList.add(
            "active"
        );


        if (quizProgress) {
            quizProgress.style.width =
                "100%";
        }


        applyMood(
            result,
            false
        );
    }


    quizStart?.addEventListener(
        "click",
        startQuiz
    );


    quizRestart?.addEventListener(
        "click",
        startQuiz
    );


    quizQuestions.forEach(
        question => {

            const answers =
                $$(
                    ".quiz-answer",
                    question
                );


            answers.forEach(
                answer => {

                    answer.addEventListener(
                        "click",
                        () => {

                            const result =
                                answer.dataset.result ||
                                answer.dataset.mood ||
                                "romantic";

                            const value =
                                Number(
                                    answer.dataset.score
                                ) || 1;


                            quizScores[result] =
                                (
                                    quizScores[
                                        result
                                    ] || 0
                                ) + value;


                            answers.forEach(
                                button => {
                                    button.classList.remove(
                                        "selected"
                                    );
                                }
                            );

                            answer.classList.add(
                                "selected"
                            );


                            setTimeout(
                                () => {

                                    currentQuestion++;

                                    if (
                                        currentQuestion >=
                                        quizQuestions.length
                                    ) {
                                        finishQuiz();
                                    } else {
                                        showQuizQuestion(
                                            currentQuestion
                                        );
                                    }

                                },
                                280
                            );
                        }
                    );
                }
            );
        }
    );


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticElements =
        $$(
            ".magnetic, .primary-button, .spray-button"
        );


    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        magneticElements.forEach(
            element => {

                element.addEventListener(
                    "pointermove",
                    event => {

                        if (
                            body.classList.contains(
                                "performance-mode"
                            )
                        ) return;

                        const rect =
                            element.getBoundingClientRect();

                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;

                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;


                        element.style.transform =
                            `translate(${x * 0.08}px, ${y * 0.08}px)`;
                    }
                );


                element.addEventListener(
                    "pointerleave",
                    () => {

                        element.style.transform =
                            "";
                    }
                );
            }
        );
    }


    /* =====================================================
       CARD TILT
    ===================================================== */

    const tiltCards =
        $$("[data-tilt]");


    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    if (
                        body.classList.contains(
                            "performance-mode"
                        )
                    ) return;


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


                    card.style.transform =
                        `
                        perspective(900px)
                        rotateX(${y * -5}deg)
                        rotateY(${x * 7}deg)
                        translateY(-3px)
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
        });
    }


    /* =====================================================
       PARALLAX
    ===================================================== */

    const parallaxElements =
        $$("[data-parallax]");


    function updateParallax() {

        if (
            body.classList.contains(
                "performance-mode"
            )
        ) return;


        const viewportCenter =
            window.innerHeight / 2;


        parallaxElements.forEach(
            element => {

                const rect =
                    element.getBoundingClientRect();

                const center =
                    rect.top +
                    rect.height / 2;

                const difference =
                    center -
                    viewportCenter;

                const strength =
                    Number(
                        element.dataset.parallax
                    ) || 0.04;

                element.style.transform =
                    `translateY(${difference * strength}px)`;
            }
        );
    }


    if (
        parallaxElements.length
    ) {

        updateParallax();

        window.addEventListener(
            "scroll",
            updateParallax,
            { passive: true }
        );
    }


    /* =====================================================
       SECTION NAVIGATION ACTIVE STATE
    ===================================================== */

    const sections =
        $$("section[id]");

    const navLinks =
        $$('.menu a[href^="#"]');


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
                            ) return;


                            navLinks.forEach(
                                link => {

                                    link.classList.toggle(
                                        "active",
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                            `#${entry.target.id}`
                                    );
                                }
                            );
                        }
                    );
                },
                {
                    rootMargin:
                        "-40% 0px -50% 0px"
                }
            );


        sections.forEach(section => {
            sectionObserver.observe(
                section
            );
        });
    }


    /* =====================================================
       COPY / SHARE
    ===================================================== */

    const shareButton =
        $(
            ".share-button, [data-share]"
        );


    shareButton?.addEventListener(
        "click",
        async () => {

            const shareData = {

                title:
                    document.title,

                text:
                    currentLanguage === "pt"
                        ? "Conheça Dream — Amor no Ar."
                        : "Discover Dream — Love in the Air.",

                url:
                    window.location.href
            };


            try {

                if (
                    navigator.share
                ) {

                    await navigator.share(
                        shareData
                    );

                } else if (
                    navigator.clipboard
                ) {

                    await navigator.clipboard.writeText(
                        window.location.href
                    );

                    showToast(
                        currentLanguage ===
                        "pt"
                            ? "Link copiado."
                            : "Link copied."
                    );
                }

            } catch {}
        }
    );


    /* =====================================================
       RESET SETTINGS
    ===================================================== */

    const resetButton =
        $(
            ".settings-reset, [data-reset-settings]"
        );


    resetButton?.addEventListener(
        "click",
        () => {

            const keys = [
                "dream-language",
                "dream-theme",
                "dream-accent",
                "dream-animations",
                "dream-particles",
                "dream-cursor",
                "dream-glass",
                "dream-clean",
                "dream-performance",
                "dream-sound",
                "dream-scene",
                "dream-mood"
            ];


            keys.forEach(key => {
                storage.remove(key);
            });


            /*
               O contador de borrifadas
               e favorito NÃO são apagados.
            */


            applyLanguage(
                "pt",
                false
            );

            applyTheme(
                "light",
                false
            );

            applyAccent(
                "dream"
            );


            settingMap.forEach(
                config => {

                    const defaultValue =
                        config.storageKey ===
                            "dream-clean" ||
                        config.storageKey ===
                            "dream-performance"
                            ? false
                            : true;

                    applySetting(
                        config,
                        defaultValue
                    );
                }
            );


            applySoundSetting(
                true
            );


            body.removeAttribute(
                "data-scene"
            );

            body.removeAttribute(
                "data-mood"
            );


            experienceCards.forEach(
                card => {

                    card.classList.remove(
                        "active"
                    );
                }
            );


            moodButtons.forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );
                }
            );


            updatePerformanceMode();


            showToast(
                translations.pt
                    .settingsReset
            );
        }
    );


    /* =====================================================
       RESPONSIVE RESIZE
    ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        if (
                            window.innerWidth >
                            900
                        ) {
                            closeMobileMenu();
                        }

                        createParticles();
                        updateScrollProgress();

                    },
                    180
                );
        },
        { passive: true }
    );


    /* =====================================================
       ACCESSIBILITY — REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function applyReducedMotion() {

        body.classList.toggle(
            "system-reduced-motion",
            reducedMotion.matches
        );
    }


    applyReducedMotion();


    reducedMotion.addEventListener?.(
        "change",
        applyReducedMotion
    );


    /* =====================================================
       VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            /*
               Evita música tocando escondida
               quando o usuário sai da aba.
            */

            if (
                document.hidden &&
                musicAudio &&
                !musicAudio.paused
            ) {

                musicAudio.pause();
                updateMusicButton();
            }
        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateHeader();
    updateBackTop();
    updateScrollProgress();
    updateSprayCounter();
    updateFavorite(false);
    updateMusicButton();


    /*
       Mostra o conteúdo mesmo se algum recurso
       externo tiver falhado.
    */

    body.classList.add(
        "site-ready"
    );


    /* =====================================================
       FINAL SAFETY
    ===================================================== */

    /*
       Remove loader à força.
       Isso impede aquele problema anterior:
       "carregando infinitamente".
    */

    setTimeout(
        () => {

            if (loader) {

                loader.classList.add(
                    "hide"
                );

                setTimeout(
                    () => {

                        loader.style.display =
                            "none";

                    },
                    500
                );
            }

        },
        1200
    );


    console.log(
        "%cDREAM • v60.2",
        "font-size:16px;font-weight:bold;"
    );

    console.log(
        "Dream experience initialized."
    );


}); // FIM DO DOMContentLoaded