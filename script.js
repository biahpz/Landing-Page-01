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
        [...parent.querySelectorAll(selector)];

    const body =
        document.body;

    const root =
        document.documentElement;


    function clamp(
        value,
        min,
        max
    ) {

        return Math.min(
            Math.max(
                value,
                min
            ),
            max
        );
    }


    function random(
        min,
        max
    ) {

        return (
            Math.random() *
            (
                max -
                min
            ) +
            min
        );
    }


    function randomItem(
        array
    ) {

        return array[
            Math.floor(
                Math.random() *
                array.length
            )
        ];
    }


    function debounce(
        fn,
        wait = 150
    ) {

        let timeout;


        return (
            ...args
        ) => {

            clearTimeout(
                timeout
            );


            timeout =
                setTimeout(
                    () => {

                        fn(
                            ...args
                        );

                    },
                    wait
                );
        };
    }


    function safeJSONParse(
        value,
        fallback
    ) {

        try {

            return JSON.parse(
                value
            );

        } catch {

            return fallback;
        }
    }


    const storage = {

        get(
            key,
            fallback = null
        ) {

            try {

                const value =
                    localStorage.getItem(
                        key
                    );


                return value === null
                    ? fallback
                    : value;

            } catch {

                return fallback;
            }
        },


        set(
            key,
            value
        ) {

            try {

                localStorage.setItem(
                    key,
                    String(value)
                );

            } catch {

                /* ignore */
            }
        },


        remove(
            key
        ) {

            try {

                localStorage.removeItem(
                    key
                );

            } catch {

                /* ignore */
            }
        }

    };


    /* =====================================================
       ELEMENTOS GERAIS
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

    const cursorGlow =
        $("#cursorGlow");

    const particlesContainer =
        $("#particles");


    /* =====================================================
       IDIOMA
    ===================================================== */

    let currentLanguage =
        storage.get(
            "dreamLanguage",
            "pt-BR"
        );


    if (
        currentLanguage !==
            "pt-BR" &&
        currentLanguage !==
            "en-US"
    ) {

        currentLanguage =
            "pt-BR";
    }


    const translations = {

        "pt-BR": {

            pageTitle:
                "Dream • Amor no Ar",

            menuHome:
                "Início",

            menuProduct:
                "Produto",

            menuNotes:
                "Notas",

            menuGallery:
                "Galeria",

            menuQuiz:
                "Quiz",

            menuExperience:
                "Experiência",

            heroEyebrow:
                "UMA FRAGRÂNCIA PARA SENTIR",

            heroTitle:
                "Dream",

            heroTitleAccent:
                "Amor no Ar",

            heroDescription:
                "Uma experiência delicada, romântica e envolvente criada para transformar pequenos momentos em lembranças.",

            heroPrimary:
                "Conhecer Dream",

            heroSecondary:
                "Ver experiência",

            heroFactOne:
                "Romântico",

            heroFactTwo:
                "Delicado",

            heroFactThree:
                "Marcante",

            sprayButton:
                "BORRIFAR",

            productEyebrow:
                "A FRAGRÂNCIA",

            productTitle:
                "Um toque de",

            productTitleAccent:
                "Dream",

            productDescription:
                "Uma fragrância criada para envolver, marcar presença e deixar no ar uma sensação leve, elegante e inesquecível.",

            favorite:
                "Favoritar",

            favorited:
                "Favoritado",

            share:
                "Compartilhar",

            details:
                "Ver detalhes",

            notesEyebrow:
                "NOTAS",

            notesTitle:
                "Uma composição",

            notesTitleAccent:
                "envolvente",

            galleryEyebrow:
                "GALERIA",

            galleryTitle:
                "Descubra o universo",

            galleryTitleAccent:
                "Dream",

            galleryHelp:
                "Arraste para explorar",

            quizEyebrow:
                "DESCUBRA",

            quizTitle:
                "Qual é o seu",

            quizTitleAccent:
                "Dream?",

            quizDescription:
                "Responda algumas perguntas e descubra qual sensação combina mais com você.",

            quizStart:
                "Começar quiz",

            experienceEyebrow:
                "EXPERIÊNCIA",

            experienceTitle:
                "Sinta cada",

            experienceTitleAccent:
                "momento",

            footerText:
                "Dream • Amor no Ar",

            developedBy:
                "Desenvolvido por",

            copied:
                "Link copiado ♡",

            favoriteAdded:
                "Dream adicionado aos favoritos ♡",

            favoriteRemoved:
                "Dream removido dos favoritos",

            sprayToast:
                "Dream está no ar ♡",

            darkMode:
                "Modo escuro",

            lightMode:
                "Modo claro"
        },


        "en-US": {

            pageTitle:
                "Dream • Love in the Air",

            menuHome:
                "Home",

            menuProduct:
                "Product",

            menuNotes:
                "Notes",

            menuGallery:
                "Gallery",

            menuQuiz:
                "Quiz",

            menuExperience:
                "Experience",

            heroEyebrow:
                "A FRAGRANCE TO FEEL",

            heroTitle:
                "Dream",

            heroTitleAccent:
                "Love in the Air",

            heroDescription:
                "A delicate, romantic and immersive experience created to turn small moments into memories.",

            heroPrimary:
                "Discover Dream",

            heroSecondary:
                "View experience",

            heroFactOne:
                "Romantic",

            heroFactTwo:
                "Delicate",

            heroFactThree:
                "Memorable",

            sprayButton:
                "SPRAY",

            productEyebrow:
                "THE FRAGRANCE",

            productTitle:
                "A touch of",

            productTitleAccent:
                "Dream",

            productDescription:
                "A fragrance created to surround you, make a statement and leave a light, elegant and unforgettable feeling in the air.",

            favorite:
                "Favorite",

            favorited:
                "Favorited",

            share:
                "Share",

            details:
                "View details",

            notesEyebrow:
                "NOTES",

            notesTitle:
                "An",

            notesTitleAccent:
                "enchanting composition",

            galleryEyebrow:
                "GALLERY",

            galleryTitle:
                "Discover the",

            galleryTitleAccent:
                "Dream universe",

            galleryHelp:
                "Drag to explore",

            quizEyebrow:
                "DISCOVER",

            quizTitle:
                "What is your",

            quizTitleAccent:
                "Dream?",

            quizDescription:
                "Answer a few questions and discover which feeling matches you best.",

            quizStart:
                "Start quiz",

            experienceEyebrow:
                "EXPERIENCE",

            experienceTitle:
                "Feel every",

            experienceTitleAccent:
                "moment",

            footerText:
                "Dream • Love in the Air",

            developedBy:
                "Developed by",

            copied:
                "Link copied ♡",

            favoriteAdded:
                "Dream added to favorites ♡",

            favoriteRemoved:
                "Dream removed from favorites",

            sprayToast:
                "Dream is in the air ♡",

            darkMode:
                "Dark mode",

            lightMode:
                "Light mode"
        }

    };


    function translatePage(
        language
    ) {

        currentLanguage =
            language;


        storage.set(
            "dreamLanguage",
            language
        );


        document.documentElement.lang =
            language === "pt-BR"
                ? "pt-BR"
                : "en";


        const dictionary =
            translations[
                language
            ] ||
            translations[
                "pt-BR"
            ];


        $$(
            "[data-i18n]"
        ).forEach(
            element => {

                const key =
                    element.dataset.i18n;


                if (
                    dictionary[
                        key
                    ] !==
                    undefined
                ) {

                    element.textContent =
                        dictionary[
                            key
                        ];
                }
            }
        );


        $$(
            "[data-i18n-placeholder]"
        ).forEach(
            element => {

                const key =
                    element.dataset
                        .i18nPlaceholder;


                if (
                    dictionary[
                        key
                    ] !==
                    undefined
                ) {

                    element.placeholder =
                        dictionary[
                            key
                        ];
                }
            }
        );


        $$(
            "[data-language]"
        ).forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.language ===
                        language
                );


                button.setAttribute(
                    "aria-pressed",
                    String(
                        button.dataset.language ===
                            language
                    )
                );
            }
        );


        document.title =
            dictionary.pageTitle;


        updateFavorite(
            false
        );


        updateThemeButton();

    }


    $$(
        "[data-language]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    translatePage(
                        button.dataset.language
                    );

                }
            );
        }
    );


    /* =====================================================
       LOADER
    ===================================================== */

    function hideLoader() {

        if (
            !loader
        ) {

            return;
        }


        loader.classList.add(
            "hide"
        );
    }


    window.addEventListener(
        "load",
        () => {

            setTimeout(
                hideLoader,
                500
            );
        }
    );


    if (
        document.readyState ===
        "complete"
    ) {

        setTimeout(
            hideLoader,
            500
        );
    }


    setTimeout(
        hideLoader,
        3000
    );


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer;


    function showToast(
        message
    ) {

        if (
            !toast
        ) {

            return;
        }


        toast.textContent =
            message;


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
                2300
            );
    }


    /* =====================================================
       SCROLL
    ===================================================== */

    function updateScroll() {

        const top =
            window.scrollY;


        const maxScroll =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const progress =
            maxScroll > 0
                ? (
                    top /
                    maxScroll
                ) *
                100
                : 0;


        if (
            scrollProgress
        ) {

            scrollProgress.style.width =
                `${progress}%`;
        }


        header?.classList.toggle(
            "scrolled",
            top > 25
        );


        backTop?.classList.toggle(
            "show",
            top > 450
        );


        updateSectionIndicator();
    }


    window.addEventListener(
        "scroll",
        updateScroll,
        {
            passive: true
        }
    );


    updateScroll();


    /* =====================================================
       VOLTAR AO TOPO
    ===================================================== */

    backTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });
        }
    );


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    menuMobile?.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            menu?.classList.toggle(
                "open"
            );


            menuMobile.classList.toggle(
                "active"
            );
        }
    );


    $$(
        ".menu a"
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    menu?.classList.remove(
                        "open"
                    );


                    menuMobile?.classList.remove(
                        "active"
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
                menu.contains(
                    event.target
                ) ||
                menuMobile.contains(
                    event.target
                )
            ) {

                return;
            }


            menu.classList.remove(
                "open"
            );


            menuMobile.classList.remove(
                "active"
            );
        }
    );


    /* =====================================================
       SECTION INDICATOR
    ===================================================== */

    const indicatorSections =
        $$(
            "main section[id]"
        );


    function updateSectionIndicator() {

        if (
            !sectionIndicator ||
            !indicatorSections.length
        ) {

            return;
        }


        let currentSection =
            indicatorSections[
                0
            ];


        const offset =
            window.innerHeight *
            0.35;


        indicatorSections.forEach(
            section => {

                const rect =
                    section.getBoundingClientRect();


                if (
                    rect.top <=
                    offset
                ) {

                    currentSection =
                        section;
                }
            }
        );


        const label =
            currentSection.dataset
                .sectionName ||
            currentSection.dataset
                .i18nSection ||
            currentSection.id;


        const span =
            $("span", sectionIndicator);


        if (
            span
        ) {

            span.textContent =
                label;
        }
    }


    /* =====================================================
       REVEAL
    ===================================================== */

    const revealElements =
        $$(".reveal");


    if (
        "IntersectionObserver" in
        window
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


                                revealObserver
                                    .unobserve(
                                        entry.target
                                    );
                            }
                        }
                    );
                },

                {
                    threshold:
                        0.1,

                    rootMargin:
                        "0px 0px -40px 0px"
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
        $$(
            "[data-meter]"
        );


    if (
        "IntersectionObserver" in
        window
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


                            const value =
                                clamp(
                                    Number(
                                        entry.target
                                            .dataset
                                            .meter ||
                                        0
                                    ),
                                    0,
                                    100
                                );


                            entry.target.style.width =
                                `${value}%`;


                            meterObserver.unobserve(
                                entry.target
                            );
                        }
                    );
                },

                {
                    threshold:
                        0.3
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
            meter => {

                meter.style.width =
                    `${
                        clamp(
                            Number(
                                meter.dataset
                                    .meter ||
                                0
                            ),
                            0,
                            100
                        )
                    }%`;
            }
        );
    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    let cursorX =
        window.innerWidth /
        2;

    let cursorY =
        window.innerHeight /
        2;

    let glowX =
        cursorX;

    let glowY =
        cursorY;


    document.addEventListener(
        "mousemove",
        event => {

            cursorX =
                event.clientX;

            cursorY =
                event.clientY;
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
                0.11;


            glowY +=
                (
                    cursorY -
                    glowY
                ) *
                0.11;


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
       PARTÍCULAS
    ===================================================== */

    let particleInterval =
        null;


    function createParticle() {

        if (
            !particlesContainer ||
            body.classList.contains(
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
            randomItem([
                "♡",
                "✦",
                "✧",
                "·"
            ]);


        particle.style.left =
            `${random(0, 100)}%`;


        particle.style.fontSize =
            `${random(8, 20)}px`;


        particle.style.setProperty(
            "--duration",
            `${random(8, 18)}s`
        );


        particle.style.setProperty(
            "--delay",
            "0s"
        );


        particlesContainer.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            19000
        );
    }


    function startParticles() {

        clearInterval(
            particleInterval
        );


        particleInterval =
            setInterval(
                createParticle,
                850
            );
    }


    startParticles();


    /* =====================================================
       HERO 3D
    ===================================================== */

    const heroProduct =
        $("#heroProduct");

    const mainBottle =
        $("#mainBottle");

    const productHalo =
        $("#productHalo");

    const productLight =
        $("#productLight");


    let spraying =
        false;


    heroProduct?.addEventListener(
        "mousemove",
        event => {

            if (
                spraying ||
                !mainBottle
            ) {

                return;
            }


            if (
                window.matchMedia(
                    "(pointer: coarse)"
                ).matches
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
                rect.width;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height;


            const rotateY =
                (
                    x -
                    0.5
                ) *
                16;


            const rotateX =
                (
                    0.5 -
                    y
                ) *
                12;


            mainBottle.style.transform =
                `
                translate3d(
                    ${
                        (
                            x -
                            0.5
                        ) *
                        15
                    }px,
                    ${
                        (
                            y -
                            0.5
                        ) *
                        8
                    }px,
                    30px
                )
                rotateX(
                    ${rotateX}deg
                )
                rotateY(
                    ${rotateY}deg
                )
                `;


            if (
                productHalo
            ) {

                productHalo.style.transform =
                    `
                    translate(
                        ${
                            (
                                x -
                                0.5
                            ) *
                            -25
                        }px,
                        ${
                            (
                                y -
                                0.5
                            ) *
                            -20
                        }px
                    )
                    `;
            }


            if (
                productLight
            ) {

                productLight.style.transform =
                    `
                    translate(
                        ${
                            (
                                x -
                                0.5
                            ) *
                            20
                        }px,
                        ${
                            (
                                y -
                                0.5
                            ) *
                            15
                        }px
                    )
                    `;
            }
        }
    );


    heroProduct?.addEventListener(
        "mouseleave",
        () => {

            if (
                !spraying &&
                mainBottle
            ) {

                mainBottle.style.transform =
                    "";
            }


            if (
                productHalo
            ) {

                productHalo.style.transform =
                    "";
            }


            if (
                productLight
            ) {

                productLight.style.transform =
                    "";
            }
        }
    );


    /* =====================================================
       BORRIFADOR
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


    function restartAnimation(
        element
    ) {

        if (
            !element
        ) {

            return;
        }


        element.classList.remove(
            "active"
        );


        void element.offsetWidth;


        element.classList.add(
            "active"
        );
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
            "spray-flash";


        sprayArea.appendChild(
            flash
        );


        requestAnimationFrame(
            () => {

                flash.classList.add(
                    "active"
                );
            }
        );


        setTimeout(
            () => {

                flash.remove();

            },
            1000
        );
    }


    function createMist() {

        if (
            !sprayArea
        ) {

            return;
        }


        const amount =
            window.innerWidth <
                600
                ? 38
                : 70;


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
                "dream-mist";


            mist.style.setProperty(
                "--mist-x",
                `${random(
                    -220,
                    220
                )}px`
            );


            mist.style.setProperty(
                "--mist-y",
                `${random(
                    -310,
                    90
                )}px`
            );


            mist.style.setProperty(
                "--mist-size",
                `${random(
                    3,
                    16
                )}px`
            );


            mist.style.setProperty(
                "--mist-blur",
                `${random(
                    0,
                    3
                )}px`
            );


            mist.style.setProperty(
                "--mist-duration",
                `${random(
                    0.8,
                    1.7
                )}s`
            );


            mist.style.animationDelay =
                `${random(
                    0,
                    0.14
                )}s`;


            sprayArea.appendChild(
                mist
            );


            setTimeout(
                () => {

                    mist.remove();

                },
                2100
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
            "♡",
            "✧"
        ];


        for (
            let i = 0;
            i < 14;
            i++
        ) {

            const symbol =
                document.createElement(
                    "span"
                );


            symbol.className =
                "dream-spray-symbol";


            symbol.textContent =
                randomItem(
                    symbols
                );


            symbol.style.setProperty(
                "--symbol-size",
                `${random(
                    9,
                    23
                )}px`
            );


            symbol.style.setProperty(
                "--symbol-x",
                `${random(
                    -200,
                    200
                )}px`
            );


            symbol.style.setProperty(
                "--symbol-y",
                `${random(
                    -330,
                    -60
                )}px`
            );


            symbol.style.setProperty(
                "--symbol-rotate",
                `${random(
                    -250,
                    250
                )}deg`
            );


            symbol.style.animationDelay =
                `${random(
                    0,
                    0.2
                )}s`;


            sprayArea.appendChild(
                symbol
            );


            setTimeout(
                () => {

                    symbol.remove();

                },
                2100
            );
        }
    }


    /* =====================================================
       ÁUDIO DO BORRIFO
    ===================================================== */

    let sprayAudioContext =
        null;


    function playSprayAudio() {

        if (
            body.classList.contains(
                "sound-disabled"
            )
        ) {

            return;
        }


        try {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;


            if (
                !AudioContext
            ) {

                return;
            }


            if (
                !sprayAudioContext
            ) {

                sprayAudioContext =
                    new AudioContext();
            }


            const context =
                sprayAudioContext;


            const duration =
                0.23;


            const buffer =
                context.createBuffer(
                    1,
                    context.sampleRate *
                        duration,
                    context.sampleRate
                );


            const data =
                buffer.getChannelData(
                    0
                );


            for (
                let i = 0;
                i < data.length;
                i++
            ) {

                const fade =
                    1 -
                    i /
                    data.length;


                data[i] =
                    (
                        Math.random() *
                        2 -
                        1
                    ) *
                    fade *
                    0.13;
            }


            const source =
                context.createBufferSource();


            source.buffer =
                buffer;


            const gain =
                context.createGain();


            gain.gain.setValueAtTime(
                0.6,
                context.currentTime
            );


            gain.gain.exponentialRampToValueAtTime(
                0.01,
                context.currentTime +
                    duration
            );


            source.connect(
                gain
            );


            gain.connect(
                context.destination
            );


            source.start();

        } catch {

            /* áudio opcional */
        }
    }


    function sprayDream() {

        if (
            spraying ||
            !sprayArea
        ) {

            return;
        }


        spraying =
            true;


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


        showToast(
            translations[
                currentLanguage
            ].sprayToast
        );


        setTimeout(
            () => {

                heroProduct?.classList.remove(
                    "spraying"
                );


                spraying =
                    false;

            },
            900
        );
    }


    sprayButton?.addEventListener(
        "click",
        sprayDream
    );


    /* =====================================================
       TECLA S = BORRIFAR
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.target.matches(
                    "input, textarea, select"
                )
            ) {

                return;
            }


            if (
                event.key.toLowerCase() ===
                "s"
            ) {

                sprayDream();
            }
        }
    );


    /* =====================================================
       TEMA
    ===================================================== */

    const themeButton =
        $("#themeButton");


    let darkMode =
        storage.get(
            "dreamDarkMode",
            "false"
        ) ===
        "true";


    function updateThemeButton() {

        if (
            !themeButton
        ) {

            return;
        }


        const dictionary =
            translations[
                currentLanguage
            ];


        themeButton.setAttribute(
            "aria-label",
            darkMode
                ? dictionary.lightMode
                : dictionary.darkMode
        );


        const icon =
            $(".theme-icon", themeButton);


        if (
            icon
        ) {

            icon.textContent =
                darkMode
                    ? "☀"
                    : "☾";
        }
    }


    function applyTheme() {

        body.classList.toggle(
            "dark",
            darkMode
        );


        storage.set(
            "dreamDarkMode",
            darkMode
        );


        updateThemeButton();
    }


    themeButton?.addEventListener(
        "click",
        () => {

            darkMode =
                !darkMode;


            applyTheme();
        }
    );


    applyTheme();


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
            }
        }
    );


    updateFavorite();


    /* =====================================================
       COMPARTILHAR
    ===================================================== */

    const shareButtons =
        $$(
            "[data-share], #shareButton"
        );


    async function shareDream() {

        const title =
            currentLanguage ===
                "pt-BR"
                ? "Dream • Amor no Ar"
                : "Dream • Love in the Air";


        const text =
            currentLanguage ===
                "pt-BR"
                ? "Conheça Dream Amor no Ar ♡"
                : "Discover Dream Love in the Air ♡";


        try {

            if (
                navigator.share
            ) {

                await navigator.share({

                    title,

                    text,

                    url:
                        location.href

                });


                return;
            }


            if (
                navigator.clipboard
            ) {

                await navigator.clipboard.writeText(
                    location.href
                );


                showToast(
                    translations[
                        currentLanguage
                    ].copied
                );


                return;
            }


            showToast(
                currentLanguage ===
                    "pt-BR"
                    ? "Copie o link do navegador ♡"
                    : "Copy the browser link ♡"
            );

        } catch {

            /* cancelado */
        }
    }


    shareButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                shareDream
            );
        }
    );


    /* =====================================================
       MODAIS
    ===================================================== */

    function updateModalBodyState() {

        const hasOpenModal =
            !!$(
                ".modal.open, .lightbox.open"
            );


        body.classList.toggle(
            "modal-open",
            hasOpenModal
        );
    }


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


        updateModalBodyState();
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


        updateModalBodyState();
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


    $$(
        ".modal-backdrop"
    ).forEach(
        backdrop => {

            backdrop.addEventListener(
                "click",
                () => {

                    closeModal(
                        backdrop.closest(
                            ".modal"
                        )
                    );
                }
            );
        }
    );


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
                title:
                    "Um detalhe pode mudar tudo.",

                text:
                    "Às vezes, uma lembrança começa com algo tão simples quanto uma fragrância."
            },

            {
                title:
                    "Deixe sua presença ficar.",

                text:
                    "Alguns momentos passam. Outros permanecem na memória."
            },

            {
                title:
                    "Leveza também marca.",

                text:
                    "Você não precisa exagerar para ser lembrado."
            }

        ],


        "en-US": [

            {
                title:
                    "One detail can change everything.",

                text:
                    "Sometimes a memory begins with something as simple as a fragrance."
            },

            {
                title:
                    "Let your presence stay.",

                text:
                    "Some moments pass. Others remain in memory."
            },

            {
                title:
                    "Softness can leave a mark.",

                text:
                    "You don't need to overdo it to be remembered."
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
                dreamMoments[
                    "pt-BR"
                ];


            const moment =
                randomItem(
                    list
                );


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
        }
    );


    /* =====================================================
       TIMELINE / EXPERIÊNCIA
    ===================================================== */

    const timelineRange =
        $("#timelineSlider") ||
        $("#timelineRange");

    const timelineHour =
        $("#timelineHour");

    const timelineStage =
        $("#timelineStage");


    const timelineData = {

        "pt-BR": [

            {
                hour:
                    "08:00",

                title:
                    "Começo leve",

                text:
                    "Uma sensação delicada para iniciar o dia."
            },

            {
                hour:
                    "12:00",

                title:
                    "Presença",

                text:
                    "O aroma ganha personalidade sem perder a suavidade."
            },

            {
                hour:
                    "18:00",

                title:
                    "Encontro",

                text:
                    "O lado romântico de Dream aparece com mais intensidade."
            },

            {
                hour:
                    "22:00",

                title:
                    "Memória",

                text:
                    "Um rastro confortável para encerrar o dia."
            }

        ],


        "en-US": [

            {
                hour:
                    "08:00",

                title:
                    "Soft beginning",

                text:
                    "A delicate feeling to start the day."
            },

            {
                hour:
                    "12:00",

                title:
                    "Presence",

                text:
                    "The fragrance gains personality without losing its softness."
            },

            {
                hour:
                    "18:00",

                title:
                    "Encounter",

                text:
                    "Dream's romantic side becomes more noticeable."
            },

            {
                hour:
                    "22:00",

                title:
                    "Memory",

                text:
                    "A comforting trail to end the day."
            }

        ]

    };


    function updateTimeline() {

        if (
            !timelineRange
        ) {

            return;
        }


        const list =
            timelineData[
                currentLanguage
            ] ||
            timelineData[
                "pt-BR"
            ];


        const rawValue =
            Number(
                timelineRange.value ||
                0
            );


        const max =
            Number(
                timelineRange.max ||
                100
            );


        const ratio =
            max > 0
                ? rawValue /
                    max
                : 0;


        const index =
            clamp(
                Math.round(
                    ratio *
                    (
                        list.length -
                        1
                    )
                ),
                0,
                list.length -
                    1
            );


        const item =
            list[
                index
            ];


        if (
            timelineHour
        ) {

            timelineHour.textContent =
                item.hour;
        }


        if (
            timelineStage
        ) {

            const title =
                $(
                    "strong",
                    timelineStage
                );


            const text =
                $(
                    "p",
                    timelineStage
                );


            if (
                title
            ) {

                title.textContent =
                    item.title;
            }


            if (
                text
            ) {

                text.textContent =
                    item.text;
            }
        }
    }


    timelineRange?.addEventListener(
        "input",
        updateTimeline
    );


    /* =====================================================
       MÚSICA
    ===================================================== */

    const dreamMusic =
        $("#dreamMusic");

    const musicToggle =
        $("#musicToggle");

    const musicProgress =
        $("#musicProgress");

    const musicVolumeRange =
        $("#musicVolumeRange");

    const musicVolumeValue =
        $("#musicVolumeValue");


    let musicVolume =
        clamp(
            Number(
                storage.get(
                    "dreamMusicVolume",
                    60
                )
            ),
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
        musicVolumeRange
    ) {

        musicVolumeRange.value =
            musicVolume;
    }


    if (
        musicVolumeValue
    ) {

        musicVolumeValue.textContent =
            `${musicVolume}%`;
    }


    musicVolumeRange?.addEventListener(
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


            musicVolume =
                volume;


            storage.set(
                "dreamMusicVolume",
                volume
            );


            if (
                dreamMusic
            ) {

                dreamMusic.volume =
                    volume /
                    100;
            }


            if (
                musicVolumeValue
            ) {

                musicVolumeValue.textContent =
                    `${volume}%`;
            }
        }
    );


    function updateMusicButton() {

        if (
            !musicToggle ||
            !dreamMusic
        ) {

            return;
        }


        musicToggle.classList.toggle(
            "playing",
            !dreamMusic.paused
        );


        const icon =
            $(".music-icon", musicToggle);


        if (
            icon
        ) {

            icon.textContent =
                dreamMusic.paused
                    ? "▶"
                    : "❚❚";
        }
    }


    musicToggle?.addEventListener(
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


                updateMusicButton();

            } catch {

                showToast(
                    currentLanguage ===
                        "pt-BR"
                        ? "Não foi possível iniciar a música."
                        : "Unable to start the music."
                );
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
        "timeupdate",
        () => {

            if (
                musicProgress &&
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


            const value =
                clamp(
                    Number(
                        event.target.value
                    ),
                    0,
                    100
                );


            dreamMusic.currentTime =
                dreamMusic.duration *
                (
                    value /
                    100
                );
        }
    );


    /* =====================================================
       GALERIA
    ===================================================== */

    const galleryTrack =
        $("#galleryTrack");

    const galleryItems =
        $$(
            ".gallery-item",
            galleryTrack ||
                document
        );

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

    const galleryProgressBar =
        $("#galleryProgressBar");


    let galleryIndex =
        0;


    function getGalleryStep() {

        if (
            !galleryTrack ||
            !galleryItems.length
        ) {

            return 0;
        }


        const first =
            galleryItems[
                0
            ];


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
            first.getBoundingClientRect()
                .width +
            gap
        );
    }


    function updateGalleryUI() {

        if (
            !galleryItems.length
        ) {

            return;
        }


        galleryIndex =
            clamp(
                galleryIndex,
                0,
                galleryItems.length -
                    1
            );


        if (
            galleryCurrent
        ) {

            galleryCurrent.textContent =
                String(
                    galleryIndex +
                    1
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


        $$(
            ".gallery-dot",
            galleryDots ||
                document
        ).forEach(
            (
                dot,
                index
            ) => {

                const active =
                    index ===
                    galleryIndex;


                dot.classList.toggle(
                    "active",
                    active
                );


                dot.setAttribute(
                    "aria-current",
                    active
                        ? "true"
                        : "false"
                );
            }
        );


        if (
            galleryProgressBar
        ) {

            galleryProgressBar.style.width =
                `${
                    (
                        (
                            galleryIndex +
                            1
                        ) /
                        galleryItems.length
                    ) *
                    100
                }%`;
        }
    }


    function scrollGalleryTo(
        index,
        behavior = "smooth"
    ) {

        if (
            !galleryTrack ||
            !galleryItems.length
        ) {

            return;
        }


        galleryIndex =
            clamp(
                index,
                0,
                galleryItems.length -
                    1
            );


        const item =
            galleryItems[
                galleryIndex
            ];


        galleryTrack.scrollTo({

            left:
                item.offsetLeft,

            behavior

        });


        updateGalleryUI();
    }


    function createGalleryDots() {

        if (
            !galleryDots ||
            !galleryItems.length
        ) {

            return;
        }


        galleryDots.innerHTML =
            "";


        galleryItems.forEach(
            (
                item,
                index
            ) => {

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
                    `${
                        currentLanguage ===
                            "pt-BR"
                            ? "Ir para imagem"
                            : "Go to image"
                    } ${
                        index +
                        1
                    }`
                );


                dot.addEventListener(
                    "click",
                    () => {

                        scrollGalleryTo(
                            index
                        );
                    }
                );


                galleryDots.appendChild(
                    dot
                );
            }
        );


        updateGalleryUI();
    }


    galleryPrev?.addEventListener(
        "click",
        () => {

            scrollGalleryTo(
                galleryIndex -
                    1
            );
        }
    );


    galleryNext?.addEventListener(
        "click",
        () => {

            scrollGalleryTo(
                galleryIndex +
                    1
            );
        }
    );


    const syncGalleryFromScroll =
        debounce(
            () => {

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
                            item.offsetWidth /
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

            },
            80
        );


    galleryTrack?.addEventListener(
        "scroll",
        syncGalleryFromScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       ARRASTAR GALERIA
    ===================================================== */

    let galleryDragging =
        false;

    let galleryStartX =
        0;

    let galleryStartScroll =
        0;


    galleryTrack?.addEventListener(
        "pointerdown",
        event => {

            if (
                event.pointerType ===
                    "mouse" &&
                event.button !==
                    0
            ) {

                return;
            }


            galleryDragging =
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

            if (
                !galleryDragging
            ) {

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


    function stopGalleryDrag(
        event
    ) {

        if (
            !galleryDragging
        ) {

            return;
        }


        galleryDragging =
            false;


        galleryTrack?.classList.remove(
            "dragging"
        );


        if (
            event?.pointerId !==
            undefined
        ) {

            galleryTrack?.releasePointerCapture?.(
                event.pointerId
            );
        }


        syncGalleryFromScroll();
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
                galleryDragging &&
                event.pointerType ===
                    "mouse"
            ) {

                stopGalleryDrag(
                    event
                );
            }
        }
    );


    createGalleryDots();


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

    const lightboxCurrent =
        $("#lightboxCurrent");

    const lightboxTotal =
        $("#lightboxTotal");


    let lightboxIndex =
        0;


    const galleryImages =
        galleryItems
            .map(
                item =>
                    $(
                        "img",
                        item
                    )
            )
            .filter(
                Boolean
            );


    function updateLightbox() {

        if (
            !lightboxImage ||
            !galleryImages.length
        ) {

            return;
        }


        lightboxIndex =
            (
                lightboxIndex +
                galleryImages.length
            ) %
            galleryImages.length;


        const sourceImage =
            galleryImages[
                lightboxIndex
            ];


        lightboxImage.classList.add(
            "lightbox-image-changing"
        );


        setTimeout(
            () => {

                lightboxImage.src =
                    sourceImage.currentSrc ||
                    sourceImage.src;


                lightboxImage.alt =
                    sourceImage.alt ||
                    "Dream";


                lightboxImage.classList.remove(
                    "lightbox-image-changing"
                );

            },
            120
        );


        if (
            lightboxCurrent
        ) {

            lightboxCurrent.textContent =
                String(
                    lightboxIndex +
                    1
                ).padStart(
                    2,
                    "0"
                );
        }


        if (
            lightboxTotal
        ) {

            lightboxTotal.textContent =
                String(
                    galleryImages.length
                ).padStart(
                    2,
                    "0"
                );
        }
    }


    function openLightbox(
        index
    ) {

        if (
            !lightbox ||
            !galleryImages.length
        ) {

            return;
        }


        lightboxIndex =
            index;


        updateLightbox();


        lightbox.classList.add(
            "open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        updateModalBodyState();
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


        updateModalBodyState();
    }


    galleryImages.forEach(
        (
            image,
            index
        ) => {

            image.addEventListener(
                "click",
                () => {

                    if (
                        galleryDragging
                    ) {

                        return;
                    }


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

            lightboxIndex--;


            updateLightbox();
        }
    );


    lightboxNext?.addEventListener(
        "click",
        () => {

            lightboxIndex++;


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

    const quizQuestion =
        $("#quizQuestion");

    const quizOptions =
        $("#quizOptions");

    const quizResult =
        $("#quizResult");

    const quizRestart =
        $("#quizRestart");

    const quizProgress =
        $("#quizProgress");

    const quizStep =
        $("#quizStep");


    const quizData = {

        "pt-BR": [

            {
                question:
                    "Qual momento combina mais com você?",

                options: [

                    {
                        text:
                            "Um encontro especial",

                        type:
                            "romantic"
                    },

                    {
                        text:
                            "Uma noite tranquila",

                        type:
                            "dream"
                    },

                    {
                        text:
                            "Um momento só meu",

                        type:
                            "soft"
                    }

                ]
            },

            {
                question:
                    "Qual sensação você prefere?",

                options: [

                    {
                        text:
                            "Romântica e marcante",

                        type:
                            "romantic"
                    },

                    {
                        text:
                            "Misteriosa e envolvente",

                        type:
                            "dream"
                    },

                    {
                        text:
                            "Leve e confortável",

                        type:
                            "soft"
                    }

                ]
            },

            {
                question:
                    "Como você gostaria de ser lembrado?",

                options: [

                    {
                        text:
                            "Pela intensidade",

                        type:
                            "romantic"
                    },

                    {
                        text:
                            "Pelo mistério",

                        type:
                            "dream"
                    },

                    {
                        text:
                            "Pela delicadeza",

                        type:
                            "soft"
                    }

                ]
            }

        ],


        "en-US": [

            {
                question:
                    "Which moment suits you best?",

                options: [

                    {
                        text:
                            "A special date",

                        type:
                            "romantic"
                    },

                    {
                        text:
                            "A peaceful night",

                        type:
                            "dream"
                    },

                    {
                        text:
                            "A moment for myself",

                        type:
                            "soft"
                    }

                ]
            },

            {
                question:
                    "Which feeling do you prefer?",

                options: [

                    {
                        text:
                            "Romantic and memorable",

                        type:
                            "romantic"
                    },

                    {
                        text:
                            "Mysterious and immersive",

                        type:
                            "dream"
                    },

                    {
                        text:
                            "Soft and comfortable",

                        type:
                            "soft"
                    }

                ]
            },

            {
                question:
                    "How would you like to be remembered?",

                options: [

                    {
                        text:
                            "For intensity",

                        type:
                            "romantic"
                    },

                    {
                        text:
                            "For mystery",

                        type:
                            "dream"
                    },

                    {
                        text:
                            "For delicacy",

                        type:
                            "soft"
                    }

                ]
            }

        ]

    };


    const quizResults = {

        "pt-BR": {

            romantic: {

                title:
                    "Seu Dream é Romântico ♡",

                text:
                    "Você combina com momentos intensos, especiais e cheios de significado."
            },


            dream: {

                title:
                    "Seu Dream é Envolvente ✦",

                text:
                    "Você gosta de experiências marcantes, misteriosas e cheias de personalidade."
            },


            soft: {

                title:
                    "Seu Dream é Delicado ✧",

                text:
                    "Você valoriza leveza, conforto e pequenos detalhes que ficam na memória."
            }

        },


        "en-US": {

            romantic: {

                title:
                    "Your Dream is Romantic ♡",

                text:
                    "You match intense, special moments filled with meaning."
            },


            dream: {

                title:
                    "Your Dream is Enchanting ✦",

                text:
                    "You enjoy memorable, mysterious experiences full of personality."
            },


            soft: {

                title:
                    "Your Dream is Delicate ✧",

                text:
                    "You value softness, comfort and small details that remain in memory."
            }

        }

    };


    let quizIndex =
        0;


    let quizScores = {

        romantic:
            0,

        dream:
            0,

        soft:
            0

    };


    function resetQuiz() {

        quizIndex =
            0;


        quizScores = {

            romantic:
                0,

            dream:
                0,

            soft:
                0

        };


        quizResult?.classList.remove(
            "show"
        );


        if (
            quizResult
        ) {

            quizResult.innerHTML =
                "";
        }


        renderQuizQuestion();
    }


    function renderQuizQuestion() {

        if (
            !quizQuestion ||
            !quizOptions
        ) {

            return;
        }


        const questions =
            quizData[
                currentLanguage
            ] ||
            quizData[
                "pt-BR"
            ];


        if (
            quizIndex >=
            questions.length
        ) {

            showQuizResult();

            return;
        }


        const question =
            questions[
                quizIndex
            ];


        quizQuestion.textContent =
            question.question;


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


                button.textContent =
                    option.text;


                button.addEventListener(
                    "click",
                    () => {

                        quizScores[
                            option.type
                        ]++;


                        quizIndex++;


                        renderQuizQuestion();
                    }
                );


                quizOptions.appendChild(
                    button
                );
            }
        );


        if (
            quizStep
        ) {

            quizStep.textContent =
                `${quizIndex + 1}/${questions.length}`;
        }


        if (
            quizProgress
        ) {

            quizProgress.style.width =
                `${
                    (
                        quizIndex /
                        questions.length
                    ) *
                    100
                }%`;
        }
    }


    function showQuizResult() {

        const scores =
            Object.entries(
                quizScores
            );


        scores.sort(
            (
                a,
                b
            ) =>
                b[1] -
                a[1]
        );


        const winner =
            scores[
                0
            ][
                0
            ];


        const result =
            quizResults[
                currentLanguage
            ][
                winner
            ];


        if (
            quizQuestion
        ) {

            quizQuestion.textContent =
                result.title;
        }


        if (
            quizOptions
        ) {

            quizOptions.innerHTML =
                "";
        }


        if (
            quizResult
        ) {

            quizResult.innerHTML =
                `<p>${result.text}</p>`;


            quizResult.classList.add(
                "show"
            );
        }


        if (
            quizProgress
        ) {

            quizProgress.style.width =
                "100%";
        }
    }


    quizStart?.addEventListener(
        "click",
        resetQuiz
    );


    quizRestart?.addEventListener(
        "click",
        resetQuiz
    );


    /* =====================================================
       UNIVERSOS
    ===================================================== */

    const universeCards =
        $$(
            ".universe-card"
        );


    universeCards.forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    universeCards.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );
                        }
                    );


                    card.classList.add(
                        "active"
                    );


                    const universe =
                        card.dataset.universe;


                    if (
                        universe
                    ) {

                        body.dataset.universe =
                            universe;


                        storage.set(
                            "dreamUniverse",
                            universe
                        );
                    }
                }
            );
        }
    );


    const savedUniverse =
        storage.get(
            "dreamUniverse",
            ""
        );


    if (
        savedUniverse
    ) {

        const savedCard =
            $(
                `.universe-card[data-universe="${savedUniverse}"]`
            );


        if (
            savedCard
        ) {

            savedCard.click();
        }
    }


    /* =====================================================
       DREAM STUDIO
    ===================================================== */

    const settingsFab =
        $("#settingsFab");

    const settingsPanel =
        $("#settingsPanel");

    const settingsClose =
        $("#settingsClose");


    settingsFab?.addEventListener(
        "click",
        () => {

            settingsPanel?.classList.toggle(
                "open"
            );
        }
    );


    settingsClose?.addEventListener(
        "click",
        () => {

            settingsPanel?.classList.remove(
                "open"
            );
        }
    );


    /* =====================================================
       CORES
    ===================================================== */

    const primaryInput =
        $("#primaryColor");

    const secondaryInput =
        $("#secondaryColor");


    function hexToRgb(
        hex
    ) {

        const normalized =
            hex.replace(
                "#",
                ""
            );


        if (
            normalized.length !==
            6
        ) {

            return null;
        }


        const value =
            Number.parseInt(
                normalized,
                16
            );


        if (
            Number.isNaN(
                value
            )
        ) {

            return null;
        }


        return {

            r:
                (
                    value >>
                    16
                ) &
                255,

            g:
                (
                    value >>
                    8
                ) &
                255,

            b:
                value &
                255

        };
    }


    function setThemeColor(
        type,
        value
    ) {

        const rgb =
            hexToRgb(
                value
            );


        if (
            !rgb
        ) {

            return;
        }


        root.style.setProperty(
            `--${type}`,
            value
        );


        root.style.setProperty(
            `--${type}-rgb`,
            `${rgb.r}, ${rgb.g}, ${rgb.b}`
        );


        storage.set(
            `dream${type}`,
            value
        );
    }


    const savedPrimary =
        storage.get(
            "dreamprimary",
            ""
        );


    const savedSecondary =
        storage.get(
            "dreamsecondary",
            ""
        );


    if (
        savedPrimary
    ) {

        setThemeColor(
            "primary",
            savedPrimary
        );


        if (
            primaryInput
        ) {

            primaryInput.value =
                savedPrimary;
        }
    }


    if (
        savedSecondary
    ) {

        setThemeColor(
            "secondary",
            savedSecondary
        );


        if (
            secondaryInput
        ) {

            secondaryInput.value =
                savedSecondary;
        }
    }


    primaryInput?.addEventListener(
        "input",
        event => {

            setThemeColor(
                "primary",
                event.target.value
            );
        }
    );


    secondaryInput?.addEventListener(
        "input",
        event => {

            setThemeColor(
                "secondary",
                event.target.value
            );
        }
    );


    /* =====================================================
       CONTRASTE
    ===================================================== */

    const contrastRange =
        $("#contrastControl") ||
        $("#contrastRange");

    const contrastValue =
        $("#contrastValue");


    let contrast =
        clamp(
            Number(
                storage.get(
                    "dreamContrast",
                    100
                )
            ),
            70,
            140
        );


    function applyContrast() {

        root.style.setProperty(
            "--site-contrast",
            contrast /
                100
        );


        if (
            contrastRange
        ) {

            contrastRange.value =
                contrast;
        }


        if (
            contrastValue
        ) {

            contrastValue.textContent =
                `${contrast}%`;
        }


        storage.set(
            "dreamContrast",
            contrast
        );
    }


    contrastRange?.addEventListener(
        "input",
        event => {

            contrast =
                clamp(
                    Number(
                        event.target.value
                    ),
                    70,
                    140
                );


            applyContrast();
        }
    );


    applyContrast();


    /* =====================================================
       GLASS
    ===================================================== */

    const glassToggle =
        $("#glassToggle");


    let glassEnabled =
        storage.get(
            "dreamGlass",
            "true"
        ) !==
        "false";


    function applyGlass() {

        body.classList.toggle(
            "no-glass",
            !glassEnabled
        );


        if (
            glassToggle
        ) {

            glassToggle.checked =
                glassEnabled;
        }


        storage.set(
            "dreamGlass",
            glassEnabled
        );
    }


    glassToggle?.addEventListener(
        "change",
        event => {

            glassEnabled =
                event.target.checked;


            applyGlass();
        }
    );


    applyGlass();


    /* =====================================================
       ANIMAÇÕES
    ===================================================== */

    const animationsToggle =
        $("#animationsToggle");


    let animationsEnabled =
        storage.get(
            "dreamAnimations",
            "true"
        ) !==
        "false";


    function applyAnimations() {

        body.classList.toggle(
            "no-animations",
            !animationsEnabled
        );


        if (
            animationsToggle
        ) {

            animationsToggle.checked =
                animationsEnabled;
        }


        storage.set(
            "dreamAnimations",
            animationsEnabled
        );
    }


    animationsToggle?.addEventListener(
        "change",
        event => {

            animationsEnabled =
                event.target.checked;


            applyAnimations();
        }
    );


    applyAnimations();


    /* =====================================================
       PARTÍCULAS ON/OFF
    ===================================================== */

    const particlesToggle =
        $("#particlesToggle");


    let particlesEnabled =
        storage.get(
            "dreamParticles",
            "true"
        ) !==
        "false";


    function applyParticles() {

        body.classList.toggle(
            "no-particles",
            !particlesEnabled
        );


        if (
            particlesToggle
        ) {

            particlesToggle.checked =
                particlesEnabled;
        }


        if (
            !particlesEnabled
        ) {

            if (
                particlesContainer
            ) {

                particlesContainer.innerHTML =
                    "";
            }

        } else {

            createParticle();
        }


        storage.set(
            "dreamParticles",
            particlesEnabled
        );
    }


    particlesToggle?.addEventListener(
        "change",
        event => {

            particlesEnabled =
                event.target.checked;


            applyParticles();
        }
    );


    applyParticles();


    /* =====================================================
       CURSOR ON/OFF
    ===================================================== */

    const cursorToggle =
        $("#cursorToggle");


    let cursorEnabled =
        storage.get(
            "dreamCursor",
            "true"
        ) !==
        "false";


    function applyCursor() {

        body.classList.toggle(
            "no-cursor",
            !cursorEnabled
        );


        if (
            cursorToggle
        ) {

            cursorToggle.checked =
                cursorEnabled;
        }


        storage.set(
            "dreamCursor",
            cursorEnabled
        );
    }


    cursorToggle?.addEventListener(
        "change",
        event => {

            cursorEnabled =
                event.target.checked;


            applyCursor();
        }
    );


    applyCursor();


    /* =====================================================
       SOM ON/OFF
    ===================================================== */

    const soundToggle =
        $("#soundToggle");


    let soundEnabled =
        storage.get(
            "dreamSound",
            "true"
        ) !==
        "false";


    function applySound() {

        body.classList.toggle(
            "sound-disabled",
            !soundEnabled
        );


        if (
            soundToggle
        ) {

            soundToggle.checked =
                soundEnabled;
        }


        if (
            dreamMusic
        ) {

            dreamMusic.muted =
                !soundEnabled;
        }


        storage.set(
            "dreamSound",
            soundEnabled
        );
    }


    soundToggle?.addEventListener(
        "change",
        event => {

            soundEnabled =
                event.target.checked;


            applySound();
        }
    );


    applySound();


    /* =====================================================
       CLEAN MODE
    ===================================================== */

    const cleanModeToggle =
        $("#cleanModeToggle");


    let cleanMode =
        storage.get(
            "dreamCleanMode",
            "false"
        ) ===
        "true";


    function applyCleanMode() {

        body.classList.toggle(
            "clean-mode",
            cleanMode
        );


        if (
            cleanModeToggle
        ) {

            cleanModeToggle.checked =
                cleanMode;
        }


        storage.set(
            "dreamCleanMode",
            cleanMode
        );
    }


    cleanModeToggle?.addEventListener(
        "change",
        event => {

            cleanMode =
                event.target.checked;


            applyCleanMode();
        }
    );


    applyCleanMode();


    /* =====================================================
       FOCUS MODE
    ===================================================== */

    const focusModeToggle =
        $("#focusModeToggle");


    let focusMode =
        storage.get(
            "dreamFocusMode",
            "false"
        ) ===
        "true";


    function applyFocusMode() {

        body.classList.toggle(
            "focus-mode",
            focusMode
        );


        if (
            focusModeToggle
        ) {

            focusModeToggle.checked =
                focusMode;
        }


        storage.set(
            "dreamFocusMode",
            focusMode
        );
    }


    focusModeToggle?.addEventListener(
        "change",
        event => {

            focusMode =
                event.target.checked;


            applyFocusMode();
        }
    );


    applyFocusMode();


    /* =====================================================
       RESET DREAM STUDIO
    ===================================================== */

    const resetSettings =
        $("#resetSettings");


    resetSettings?.addEventListener(
        "click",
        () => {

            [
                "dreamContrast",
                "dreamGlass",
                "dreamAnimations",
                "dreamParticles",
                "dreamCursor",
                "dreamSound",
                "dreamCleanMode",
                "dreamFocusMode",
                "dreamprimary",
                "dreamsecondary"
            ].forEach(
                key => {

                    storage.remove(
                        key
                    );
                }
            );


            contrast =
                100;


            glassEnabled =
                true;


            animationsEnabled =
                true;


            particlesEnabled =
                true;


            cursorEnabled =
                true;


            soundEnabled =
                true;


            cleanMode =
                false;


            focusMode =
                false;


            root.style.removeProperty(
                "--primary"
            );


            root.style.removeProperty(
                "--primary-rgb"
            );


            root.style.removeProperty(
                "--secondary"
            );


            root.style.removeProperty(
                "--secondary-rgb"
            );


            if (
                primaryInput
            ) {

                primaryInput.value =
                    "#d86ba5";
            }


            if (
                secondaryInput
            ) {

                secondaryInput.value =
                    "#9b78d0";
            }


            applyContrast();

            applyGlass();

            applyAnimations();

            applyParticles();

            applyCursor();

            applySound();

            applyCleanMode();

            applyFocusMode();


            showToast(
                currentLanguage ===
                    "pt-BR"
                    ? "Configurações restauradas ♡"
                    : "Settings restored ♡"
            );
        }
    );


    /* =====================================================
       TECLADO
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.target.matches(
                    "input, textarea, select"
                )
            ) {

                return;
            }


            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();


                $$(
                    ".modal.open"
                ).forEach(
                    modal => {

                        closeModal(
                            modal
                        );
                    }
                );


                settingsPanel?.classList.remove(
                    "open"
                );


                menu?.classList.remove(
                    "open"
                );


                menuMobile?.classList.remove(
                    "active"
                );
            }


            if (
                lightbox?.classList.contains(
                    "open"
                )
            ) {

                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    lightboxIndex--;

                    updateLightbox();
                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    lightboxIndex++;

                    updateLightbox();
                }
            }
        }
    );


    /* =====================================================
       REDIMENSIONAMENTO
    ===================================================== */

    window.addEventListener(
        "resize",
        debounce(
            () => {

                updateScroll();

                updateGalleryUI();

            },
            120
        )
    );


    /* =====================================================
       INICIALIZAÇÃO FINAL
    ===================================================== */

    translatePage(
        currentLanguage
    );


    updateTimeline();

    updateGalleryUI();

    updateMusicButton();

    updateSectionIndicator();


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


    /* =====================================================
       GARANTIA FINAL DO LOADER
    ===================================================== */

    requestAnimationFrame(
        () => {

            body.classList.add(
                "ready"
            );
        }
    );

});