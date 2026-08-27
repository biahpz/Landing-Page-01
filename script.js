"use strict";


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =========================================================
           HELPERS
        ========================================================= */

        const $ = (
            selector,
            parent = document
        ) =>
            parent.querySelector(
                selector
            );


        const $$ = (
            selector,
            parent = document
        ) =>
            [
                ...parent.querySelectorAll(
                    selector
                )
            ];


        const clamp = (
            value,
            min,
            max
        ) =>
            Math.min(
                Math.max(
                    value,
                    min
                ),
                max
            );


        const wait = (
            time
        ) =>
            new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        time
                    )
            );


        const body =
            document.body;


        const root =
            document.documentElement;


        /* =========================================================
           STORAGE
        ========================================================= */

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


                    if (
                        value ===
                        null
                    ) {

                        return fallback;
                    }


                    return JSON.parse(
                        value
                    );

                }

                catch (
                    error
                ) {

                    console.warn(
                        "[Dream] Erro ao ler configuração:",
                        key,
                        error
                    );


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
                        JSON.stringify(
                            value
                        )
                    );

                }

                catch (
                    error
                ) {

                    console.warn(
                        "[Dream] Erro ao salvar configuração:",
                        key,
                        error
                    );

                }

            },


            remove(
                key
            ) {

                try {

                    localStorage.removeItem(
                        key
                    );

                }

                catch (
                    error
                ) {

                    console.warn(
                        "[Dream] Erro ao remover configuração:",
                        key,
                        error
                    );

                }

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


        const sectionIndicator =
            $("#sectionIndicator");


        const settingsPanel =
            $("#settingsPanel");


        const productModal =
            $("#productModal");


        const noteModal =
            $("#noteModal");


        const lightbox =
            $("#lightbox");


        /* =========================================================
           ESTADO GLOBAL
        ========================================================= */

        const state = {

            toastTimer:
                null,


            sprayCount:
                Number(
                    storage.get(
                        "dream.sprayCount",
                        0
                    )
                ) ||
                0,


            favorite:
                Boolean(
                    storage.get(
                        "dream.favorite",
                        false
                    )
                ),


            currentMood:
                storage.get(
                    "dream.mood",
                    "romantico"
                ),


            currentLanguage:
                storage.get(
                    "dream.language",
                    "pt-BR"
                ),


            currentPreset:
                storage.get(
                    "dream.preset",
                    "dream"
                ),


            particleIntensity:
                Number(
                    storage.get(
                        "dream.particleIntensity",
                        5
                    )
                ) ||
                5,


            sprayIntensity:
                Number(
                    storage.get(
                        "dream.sprayIntensity",
                        5
                    )
                ) ||
                5,


            motionIntensity:
                Number(
                    storage.get(
                        "dream.motionIntensity",
                        5
                    )
                ) ||
                5,


            spraySound:
                storage.get(
                    "dream.spraySound",
                    true
                ),


            haptic:
                storage.get(
                    "dream.haptic",
                    true
                ),


            animations:
                storage.get(
                    "dream.animations",
                    true
                ),


            particles:
                storage.get(
                    "dream.particles",
                    true
                ),


            cursorGlow:
                storage.get(
                    "dream.cursorGlow",
                    true
                ),


            motion:
                storage.get(
                    "dream.motion",
                    true
                ),


            ambientGlow:
                storage.get(
                    "dream.ambientGlow",
                    true
                ),


            glass:
                storage.get(
                    "dream.glass",
                    true
                ),


            compact:
                storage.get(
                    "dream.compact",
                    false
                ),


            contrast:
                storage.get(
                    "dream.contrast",
                    false
                ),


            glowIntensity:
                Number(
                    storage.get(
                        "dream.glowIntensity",
                        6
                    )
                ) ||
                0,


            glassBlur:
                Number(
                    storage.get(
                        "dream.glassBlur",
                        14
                    )
                ) ||
                0,


            sprayExplosion:
                Number(
                    storage.get(
                        "dream.sprayExplosion",
                        7
                    )
                ) ||
                7

        };


        /* =========================================================
           TOAST
        ========================================================= */

        function showToast(
            message,
            duration = 2600
        ) {

            if (
                !toast ||
                !message
            ) {

                return;
            }


            window.clearTimeout(
                state.toastTimer
            );


            toast.textContent =
                message;


            toast.classList.add(
                "show"
            );


            state.toastTimer =
                window.setTimeout(
                    () => {

                        toast.classList.remove(
                            "show"
                        );

                    },
                    duration
                );

        }


        /* =========================================================
           LOADER
        ========================================================= */

        function hideLoader() {

            if (
                !loader ||
                loader.classList.contains(
                    "hide"
                )
            ) {

                return;
            }


            loader.classList.add(
                "hide"
            );


            window.setTimeout(
                () => {

                    if (
                        loader
                    ) {

                        loader.setAttribute(
                            "aria-hidden",
                            "true"
                        );

                    }

                },
                750
            );

        }


        window.addEventListener(
            "load",
            () => {

                window.setTimeout(
                    hideLoader,
                    350
                );

            }
        );


        window.setTimeout(
            hideLoader,
            3500
        );


        /* =========================================================
           SCROLL
        ========================================================= */

        const trackedSections =
            $$(".section-track");


        const navLinks =
            $$("[data-nav]");


        let activeSectionId =
            "inicio";


        function getScrollPercent() {

            const scrollTop =
                window.scrollY ||
                document.documentElement.scrollTop;


            const scrollHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;


            if (
                scrollHeight <=
                0
            ) {

                return 0;
            }


            return clamp(
                (
                    scrollTop /
                    scrollHeight
                ) *
                100,
                0,
                100
            );

        }


        function updateScrollProgress() {

            if (
                !scrollProgress
            ) {

                return;
            }


            scrollProgress.style.width =
                `${getScrollPercent()}%`;

        }


        function updateHeader() {

            if (
                !header
            ) {

                return;
            }


            header.classList.toggle(
                "scrolled",
                window.scrollY >
                    55
            );

        }


        function updateBackTop() {

            if (
                !backTop
            ) {

                return;
            }


            backTop.classList.toggle(
                "show",
                window.scrollY >
                    620
            );

        }


        function findActiveSection() {

            if (
                !trackedSections.length
            ) {

                return;
            }


            const reference =
                window.innerHeight *
                0.38;


            let current =
                trackedSections[
                    0
                ];


            trackedSections.forEach(
                section => {

                    const rect =
                        section.getBoundingClientRect();


                    if (
                        rect.top <=
                        reference
                    ) {

                        current =
                            section;
                    }

                }
            );


            if (
                !current
            ) {

                return;
            }


            const nextId =
                current.id;


            if (
                !nextId ||
                nextId ===
                    activeSectionId
            ) {

                return;
            }


            activeSectionId =
                nextId;


            navLinks.forEach(
                link => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    link.classList.toggle(
                        "active",
                        href ===
                            `#${nextId}`
                    );

                }
            );


            updateSectionIndicator(
                current
            );

        }


        function updateSectionIndicator(
            section
        ) {

            if (
                !sectionIndicator ||
                !section
            ) {

                return;
            }


            const name =
                section.dataset.sectionName ||
                section.id ||
                "Dream";


            sectionIndicator.innerHTML =
                `<span>●</span>${name}`;

        }


        function handleScroll() {

            updateScrollProgress();

            updateHeader();

            updateBackTop();

            findActiveSection();

        }


        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive:
                    true
            }
        );


        handleScroll();


        backTop?.addEventListener(
            "click",
            () => {

                window.scrollTo(
                    {
                        top:
                            0,

                        behavior:
                            state.animations
                                ? "smooth"
                                : "auto"
                    }
                );

            }
        );


        /* =========================================================
           MENU MOBILE
        ========================================================= */

        function openMobileMenu() {

            if (
                !menu ||
                !menuMobile
            ) {

                return;
            }


            menu.classList.add(
                "open"
            );


            menuMobile.setAttribute(
                "aria-expanded",
                "true"
            );


            menuMobile.textContent =
                "×";

        }


        function closeMobileMenu() {

            if (
                !menu ||
                !menuMobile
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


            menuMobile.textContent =
                "☰";

        }


        function toggleMobileMenu() {

            if (
                !menu
            ) {

                return;
            }


            if (
                menu.classList.contains(
                    "open"
                )
            ) {

                closeMobileMenu();

            }

            else {

                openMobileMenu();

            }

        }


        menuMobile?.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleMobileMenu();

            }
        );


        document.addEventListener(
            "click",
            event => {

                if (
                    !menu?.classList.contains(
                        "open"
                    )
                ) {

                    return;
                }


                if (
                    menu.contains(
                        event.target
                    ) ||
                    menuMobile?.contains(
                        event.target
                    )
                ) {

                    return;
                }


                closeMobileMenu();

            }
        );


        /* =========================================================
           LINKS INTERNOS
        ========================================================= */

        $$(
            'a[href^="#"]'
        ).forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId ===
                                "#"
                        ) {

                            return;
                        }


                        const target =
                            $(
                                targetId
                            );


                        if (
                            !target
                        ) {

                            return;
                        }


                        event.preventDefault();


                        closeMobileMenu();


                        target.scrollIntoView(
                            {
                                behavior:
                                    state.animations
                                        ? "smooth"
                                        : "auto",

                                block:
                                    "start"
                            }
                        );

                    }
                );

            }
        );


        /* =========================================================
           REVEAL
        ========================================================= */

        const revealElements =
            $$(".reveal");


        function showAllReveals() {

            revealElements.forEach(
                element =>
                    element.classList.add(
                        "visible"
                    )
            );

        }


        if (
            "IntersectionObserver"
            in window
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
                        threshold:
                            0.12,

                        rootMargin:
                            "0px 0px -35px 0px"
                    }
                );


            revealElements.forEach(
                element =>
                    revealObserver.observe(
                        element
                    )
            );

        }

        else {

            showAllReveals();

        }


        /* =========================================================
           METERS
        ========================================================= */

        const meterElements =
            $$("[data-meter]");


        function animateMeter(
            meter
        ) {

            if (
                !meter
            ) {

                return;
            }


            const value =
                clamp(
                    Number(
                        meter.dataset.meter
                    ) ||
                    0,
                    0,
                    100
                );


            meter.style.width =
                `${value}%`;

        }


        if (
            "IntersectionObserver"
            in window
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
                        threshold:
                            0.35
                    }
                );


            meterElements.forEach(
                meter =>
                    meterObserver.observe(
                        meter
                    )
            );

        }

        else {

            meterElements.forEach(
                animateMeter
            );

        }


        /* =========================================================
           MODAIS
        ========================================================= */

        function getOpenLayers() {

            return [
                ...$$(
                    ".modal.open"
                ),

                ...$$(
                    ".lightbox.open"
                )
            ];

        }


        function updateModalBodyState() {

            const hasOpenLayer =
                getOpenLayers().length >
                0;


            body.classList.toggle(
                "modal-open",
                hasOpenLayer
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


            const focusTarget =
                $(
                    ".modal-close, button, [href], input",
                    modal
                );


            window.setTimeout(
                () => {

                    focusTarget?.focus(
                        {
                            preventScroll:
                                true
                        }
                    );

                },
                120
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


            updateModalBodyState();

        }


        function closeAllModals() {

            $$(
                ".modal.open"
            ).forEach(
                closeModal
            );

        }


        function openProductModal() {

            openModal(
                productModal
            );

        }


        function closeProductModal() {

            closeModal(
                productModal
            );

        }


        document.addEventListener(
            "click",
            event => {

                const trigger =
                    event.target.closest(
                        "[data-modal-open]"
                    );


                if (
                    !trigger
                ) {

                    return;
                }


                const modalId =
                    trigger.dataset.modalOpen;


                if (
                    modalId !==
                    "productModal"
                ) {

                    return;
                }


                event.preventDefault();


                openProductModal();

            }
        );


        document.addEventListener(
            "click",
            event => {

                const closeTrigger =
                    event.target.closest(
                        "[data-modal-close]"
                    );


                if (
                    !closeTrigger
                ) {

                    return;
                }


                event.preventDefault();


                const modal =
                    closeTrigger.closest(
                        ".modal"
                    );


                closeModal(
                    modal
                );

            }
        );


        $$(
            ".modal"
        ).forEach(
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


        /* =========================================================
           FAVORITOS
        ========================================================= */

        const favoriteButton =
            $("#favoriteButton");


        const favoriteModal =
            $("#favoriteModal");


        function getFavoriteTexts() {

            const english =
                state.currentLanguage ===
                    "en-US";


            return {

                active:
                    english
                        ? "♥ Favorited"
                        : "♥ Favoritado",


                inactive:
                    english
                        ? "♡ Favorite"
                        : "♡ Favoritar",


                added:
                    english
                        ? "Dream added to favorites ♡"
                        : "Dream adicionado aos favoritos ♡",


                removed:
                    english
                        ? "Dream removed from favorites."
                        : "Dream removido dos favoritos."

            };

        }


        function renderFavorite() {

            const texts =
                getFavoriteTexts();


            [
                favoriteButton,
                favoriteModal
            ].forEach(
                button => {

                    if (
                        !button
                    ) {

                        return;
                    }


                    button.classList.toggle(
                        "active",
                        state.favorite
                    );


                    button.setAttribute(
                        "aria-pressed",
                        String(
                            state.favorite
                        )
                    );


                    button.textContent =
                        state.favorite
                            ? texts.active
                            : texts.inactive;

                }
            );

        }


        function toggleFavorite() {

            state.favorite =
                !state.favorite;


            storage.set(
                "dream.favorite",
                state.favorite
            );


            renderFavorite();


            const texts =
                getFavoriteTexts();


            showToast(
                state.favorite
                    ? texts.added
                    : texts.removed
            );

        }


        favoriteButton?.addEventListener(
            "click",
            toggleFavorite
        );


        favoriteModal?.addEventListener(
            "click",
            toggleFavorite
        );


        renderFavorite();


        /* =========================================================
           PARTÍCULAS DE FUNDO
        ========================================================= */

        const particlesContainer =
            $("#particles");


        const particleSymbols = [
            "♡",
            "✦",
            "·",
            "✿",
            "◌",
            "⋆"
        ];


        function clearBackgroundParticles() {

            if (
                particlesContainer
            ) {

                particlesContainer.innerHTML =
                    "";

            }

        }


        function getParticleAmount() {

            const base =
                Math.round(
                    7 +
                    state.particleIntensity *
                    3
                );


            if (
                window.innerWidth <=
                760
            ) {

                return Math.max(
                    7,
                    Math.round(
                        base *
                        0.55
                    )
                );

            }


            return base;

        }


        function createBackgroundParticles() {

            clearBackgroundParticles();


            if (
                !particlesContainer ||
                !state.particles ||
                body.classList.contains(
                    "no-particles"
                )
            ) {

                return;
            }


            const amount =
                getParticleAmount();


            for (
                let index = 0;
                index < amount;
                index += 1
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );


                particle.className =
                    "particle";


                particle.textContent =
                    particleSymbols[
                        Math.floor(
                            Math.random() *
                            particleSymbols.length
                        )
                    ];


                particle.style.left =
                    `${Math.random() * 100}%`;


                particle.style.fontSize =
                    `${
                        7 +
                        Math.random() *
                        13
                    }px`;


                particle.style.opacity =
                    String(
                        0.15 +
                        Math.random() *
                        0.35
                    );


                particle.style.setProperty(
                    "--particle-duration",
                    `${
                        10 +
                        Math.random() *
                        13
                    }s`
                );


                particle.style.setProperty(
                    "--particle-delay",
                    `${
                        -Math.random() *
                        15
                    }s`
                );


                particlesContainer.appendChild(
                    particle
                );

            }

        }


        createBackgroundParticles();


        /* =========================================================
           CURSOR GLOW
        ========================================================= */

        const cursorGlow =
            $("#cursorGlow");


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


        let glowAnimationFrame =
            null;


        function animateCursorGlow() {

            if (
                !cursorGlow ||
                !state.cursorGlow ||
                window.innerWidth <=
                    760
            ) {

                glowAnimationFrame =
                    null;


                return;
            }


            glowX +=
                (
                    cursorX -
                    glowX
                ) *
                0.1;


            glowY +=
                (
                    cursorY -
                    glowY
                ) *
                0.1;


            cursorGlow.style.left =
                `${glowX}px`;


            cursorGlow.style.top =
                `${glowY}px`;


            glowAnimationFrame =
                requestAnimationFrame(
                    animateCursorGlow
                );

        }


        function startCursorGlow() {

            if (
                glowAnimationFrame
            ) {

                return;
            }


            glowAnimationFrame =
                requestAnimationFrame(
                    animateCursorGlow
                );

        }


        function stopCursorGlow() {

            if (
                glowAnimationFrame
            ) {

                cancelAnimationFrame(
                    glowAnimationFrame
                );

            }


            glowAnimationFrame =
                null;

        }


        document.addEventListener(
            "pointermove",
            event => {

                cursorX =
                    event.clientX;


                cursorY =
                    event.clientY;

            },
            {
                passive:
                    true
            }
        );


        if (
            state.cursorGlow
        ) {

            startCursorGlow();

        }


        /* =========================================================
           BORRIFADOR
        ========================================================= */

        const heroProduct =
            $("#heroProduct");


        const sprayButton =
            $("#sprayButton");


        const sprayCounter =
            $("#sprayCounter");


        const sprayArea =
            $("#sprayArea");


        const sprayWave =
            $("#sprayWave");


        const sprayGlow =
            $("#sprayGlow");


        const productHalo =
            $("#productHalo");


        const sprayAudio =
            $("#sprayAudio");


        function renderSprayCounter() {

            if (
                sprayCounter
            ) {

                sprayCounter.textContent =
                    String(
                        state.sprayCount
                    );

            }

        }


        renderSprayCounter();


        function restartAnimation(
            element,
            className
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


        function createSprayMist() {

            if (
                !sprayArea
            ) {

                return;
            }


            const intensity =
                clamp(
                    state.sprayIntensity,
                    1,
                    10
                );


            const explosion =
                clamp(
                    state.sprayExplosion,
                    1,
                    10
                );


            const amount =
                Math.round(
                    18 +
                    intensity *
                    4 +
                    explosion *
                    3
                );


            for (
                let index = 0;
                index < amount;
                index += 1
            ) {

                const mist =
                    document.createElement(
                        "span"
                    );


                mist.className =
                    "spray-mist";


                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const distance =
                    65 +
                    explosion *
                    5 +
                    Math.random() *
                    (
                        105 +
                        intensity *
                        9 +
                        explosion *
                        15
                    );


                const x =
                    Math.cos(
                        angle
                    ) *
                    distance;


                const y =
                    Math.sin(
                        angle
                    ) *
                    distance -
                    (
                        40 +
                        explosion *
                        4 +
                        Math.random() *
                        (
                            90 +
                            explosion *
                            8
                        )
                    );


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
                    `${
                        4 +
                        Math.random() *
                        (
                            7 +
                            explosion *
                            0.75
                        )
                    }px`
                );


                mist.style.setProperty(
                    "--mist-blur",
                    `${
                        Math.random() *
                        2
                    }px`
                );


                mist.style.setProperty(
                    "--mist-duration",
                    `${
                        0.75 +
                        Math.random() *
                        0.65
                    }s`
                );


                sprayArea.appendChild(
                    mist
                );


                mist.addEventListener(
                    "animationend",
                    () =>
                        mist.remove(),
                    {
                        once:
                            true
                    }
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
                "✿"
            ];


            const explosion =
                clamp(
                    state.sprayExplosion,
                    1,
                    10
                );


            const amount =
                Math.round(
                    4 +
                    state.sprayIntensity /
                    2 +
                    explosion /
                    1.8
                );


            for (
                let index = 0;
                index < amount;
                index += 1
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


                const spreadX =
                    115 +
                    explosion *
                    15;


                const x =
                    -spreadX +
                    Math.random() *
                    spreadX *
                    2;


                const y =
                    -105 -
                    explosion *
                    7 -
                    Math.random() *
                    (
                        125 +
                        explosion *
                        10
                    );


                const rotation =
                    -50 +
                    Math.random() *
                    100;


                symbol.style.setProperty(
                    "--symbol-x",
                    `${x}px`
                );


                symbol.style.setProperty(
                    "--symbol-y",
                    `${y}px`
                );


                symbol.style.setProperty(
                    "--symbol-rotate",
                    `${rotation}deg`
                );


                sprayArea.appendChild(
                    symbol
                );


                symbol.addEventListener(
                    "animationend",
                    () =>
                        symbol.remove(),
                    {
                        once:
                            true
                    }
                );

            }

        }


        function createSprayBurst() {

            if (
                !sprayArea
            ) {

                return;
            }


            const explosion =
                clamp(
                    state.sprayExplosion,
                    1,
                    10
                );


            sprayArea.style.setProperty(
                "--spray-burst-scale",
                String(
                    5.2 +
                    explosion *
                    0.58
                )
            );


            [
                "spray-burst-a",
                "spray-burst-b"
            ].forEach(
                (
                    className,
                    index
                ) => {

                    const burst =
                        document.createElement(
                            "span"
                        );


                    burst.className =
                        `spray-burst ${className}`;


                    burst.style.setProperty(
                        "--burst-delay",
                        `${
                            index *
                            70
                        }ms`
                    );


                    sprayArea.appendChild(
                        burst
                    );


                    burst.addEventListener(
                        "animationend",
                        () =>
                            burst.remove(),
                        {
                            once:
                                true
                        }
                    );

                }
            );

        }


        async function playSpraySound() {

            if (
                !sprayAudio ||
                !state.spraySound
            ) {

                return;
            }


            try {

                sprayAudio.currentTime =
                    0;


                sprayAudio.volume =
                    0.45;


                await sprayAudio.play();

            }

            catch (
                error
            ) {

                /*
                    O navegador pode bloquear áudio
                    antes da primeira interação.
                */

            }

        }


        function vibrateSpray() {

            if (
                !state.haptic ||
                !(
                    "vibrate"
                    in navigator
                )
            ) {

                return;
            }


            try {

                navigator.vibrate(
                    24
                );

            }

            catch (
                error
            ) {

                /*
                    Vibração não disponível.
                */

            }

        }


        let spraying =
            false;


        async function sprayDream() {

            if (
                spraying
            ) {

                return;
            }


            spraying =
                true;


            state.sprayCount +=
                1;


            storage.set(
                "dream.sprayCount",
                state.sprayCount
            );


            renderSprayCounter();


            restartAnimation(
                sprayWave,
                "active"
            );


            restartAnimation(
                sprayGlow,
                "active"
            );


            restartAnimation(
                sprayButton,
                "spraying"
            );


            restartAnimation(
                $(".spray-counter-card"),
                "pulse"
            );


            heroProduct?.classList.add(
                "spraying"
            );


            if (
                productHalo
            ) {

                productHalo.style.transform =
                    `scale(${
                        1 +
                        state.sprayIntensity *
                        0.01 +
                        state.sprayExplosion *
                        0.012
                    })`;

            }


            createSprayBurst();

            createSprayMist();

            createSpraySymbols();

            playSpraySound();

            vibrateSpray();


            if (
                state.sprayCount ===
                10
            ) {

                showToast(
                    state.currentLanguage ===
                        "en-US"
                        ? "10 sprays ✦ Dream is in the air."
                        : "10 borrifadas ✦ Dream está no ar."
                );

            }


            if (
                state.sprayCount ===
                25
            ) {

                showToast(
                    state.currentLanguage ===
                        "en-US"
                        ? "25 sprays ♡ Love is definitely in the air."
                        : "25 borrifadas ♡ O amor definitivamente está no ar."
                );

            }


            await wait(
                650
            );


            heroProduct?.classList.remove(
                "spraying"
            );


            sprayWave?.classList.remove(
                "active"
            );


            sprayGlow?.classList.remove(
                "active"
            );


            sprayButton?.classList.remove(
                "spraying"
            );


            $(".spray-counter-card")
                ?.classList.remove(
                    "pulse"
                );


            if (
                productHalo
            ) {

                productHalo.style.transform =
                    "";

            }


            spraying =
                false;

        }


        sprayButton?.addEventListener(
            "click",
            sprayDream
        );


        /* =========================================================
           PRODUTO 3D
        ========================================================= */

        const productTilt =
            $("#productTilt");


        let productTiltFrame =
            null;


        let targetTiltX =
            0;


        let targetTiltY =
            0;


        let currentTiltX =
            0;


        let currentTiltY =
            0;


        function renderProductTilt() {

            if (
                !productTilt ||
                !state.motion ||
                window.innerWidth <=
                    760
            ) {

                productTiltFrame =
                    null;


                return;
            }


            currentTiltX +=
                (
                    targetTiltX -
                    currentTiltX
                ) *
                0.1;


            currentTiltY +=
                (
                    targetTiltY -
                    currentTiltY
                ) *
                0.1;


            productTilt.style.transform =
                `
                    rotateX(${currentTiltX}deg)
                    rotateY(${currentTiltY}deg)
                    translateZ(8px)
                `;


            if (
                Math.abs(
                    targetTiltX -
                    currentTiltX
                ) >
                    0.01 ||
                Math.abs(
                    targetTiltY -
                    currentTiltY
                ) >
                    0.01
            ) {

                productTiltFrame =
                    requestAnimationFrame(
                        renderProductTilt
                    );

            }

            else {

                productTiltFrame =
                    null;

            }

        }


        function requestProductTiltRender() {

            if (
                productTiltFrame
            ) {

                return;
            }


            productTiltFrame =
                requestAnimationFrame(
                    renderProductTilt
                );

        }


        heroProduct?.addEventListener(
            "pointermove",
            event => {

                if (
                    !state.motion ||
                    window.innerWidth <=
                        760
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
                    rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height;


                const strength =
                    clamp(
                        state.motionIntensity,
                        0,
                        10
                    );


                targetTiltY =
                    (
                        x -
                        0.5
                    ) *
                    strength *
                    1.4;


                targetTiltX =
                    (
                        0.5 -
                        y
                    ) *
                    strength *
                    1.15;


                requestProductTiltRender();

            }
        );


        heroProduct?.addEventListener(
            "pointerleave",
            () => {

                targetTiltX =
                    0;


                targetTiltY =
                    0;


                requestProductTiltRender();

            }
        );


        /* =========================================================
           DREAM APP
        ========================================================= */

        window.DreamApp = {

            showToast,

            openModal,

            closeModal,

            closeAllModals,

            openProductModal,

            closeProductModal,

            sprayDream,

            createBackgroundParticles

        };


        /* =========================================================
           NOTAS DA FRAGRÂNCIA
        ========================================================= */

        const noteModalIcon =
            $("#noteModalIcon");


        const noteModalTitle =
            $("#noteModalTitle");


        const noteModalText =
            $("#noteModalText");


        const noteData = {

            bergamota: {

                icon:
                    "🍋",

                title:
                    "Bergamota",

                text:
                    "Fresca, cítrica e luminosa. A bergamota ajuda a criar uma abertura vibrante e delicada para a fragrância."

            },


            laranja: {

                icon:
                    "🍊",

                title:
                    "Laranja",

                text:
                    "Uma nota cítrica alegre e suculenta que acrescenta luminosidade e uma sensação confortável à abertura."

            },


            mandarina: {

                icon:
                    "🍊",

                title:
                    "Mandarina",

                text:
                    "Leve e frutada, a mandarina reforça o frescor inicial com um toque doce e espontâneo."

            },


            limao: {

                icon:
                    "🍋",

                title:
                    "Limão",

                text:
                    "Cítrico e energizante, traz uma sensação limpa e brilhante para os primeiros momentos da fragrância."

            },


            cassis: {

                icon:
                    "●",

                title:
                    "Cassis",

                text:
                    "Frutado e levemente intenso, o cassis acrescenta contraste e personalidade ao início da composição."

            },


            maca: {

                icon:
                    "🍎",

                title:
                    "Maçã",

                text:
                    "Suculenta e delicadamente adocicada, adiciona uma sensação jovem e confortável ao conjunto."

            },


            rosa: {

                icon:
                    "🌹",

                title:
                    "Rosa",

                text:
                    "Romântica por natureza, a rosa ajuda a formar o coração floral e delicado de Dream Amor no Ar."

            },


            tilia: {

                icon:
                    "✿",

                title:
                    "Tília",

                text:
                    "Suave e floral, contribui para uma sensação delicada, confortável e quase aérea."

            },


            freesia: {

                icon:
                    "❀",

                title:
                    "Frésia",

                text:
                    "Uma flor leve e luminosa que reforça o lado fresco, delicado e contemporâneo da fragrância."

            },


            lotus: {

                icon:
                    "🪷",

                title:
                    "Lótus",

                text:
                    "Transparente e aquática, a flor de lótus traz leveza e uma sensação serena ao coração floral."

            },


            gardenia: {

                icon:
                    "✿",

                title:
                    "Gardênia",

                text:
                    "Floral e cremosa, acrescenta elegância e presença sem perder a suavidade característica do Dream."

            },


            pessego: {

                icon:
                    "🍑",

                title:
                    "Pêssego",

                text:
                    "Macio e frutado, acrescenta uma doçura confortável e aveludada ao coração da fragrância."

            },


            ambar: {

                icon:
                    "◆",

                title:
                    "Âmbar",

                text:
                    "Quente e envolvente, o âmbar ajuda a criar profundidade e uma sensação confortável na base."

            },


            sandalo: {

                icon:
                    "♢",

                title:
                    "Sândalo",

                text:
                    "Cremoso e amadeirado, adiciona suavidade, elegância e uma base mais aconchegante."

            },


            baunilha: {

                icon:
                    "✦",

                title:
                    "Baunilha",

                text:
                    "Doce e confortável, suaviza a composição e deixa uma sensação delicadamente envolvente."

            },


            tonka: {

                icon:
                    "◈",

                title:
                    "Tonka",

                text:
                    "A fava tonka adiciona profundidade adocicada, calor e um acabamento macio à fragrância."

            },


            musk: {

                icon:
                    "☁",

                title:
                    "Musk",

                text:
                    "Limpo, confortável e macio, o musk ajuda a prolongar a sensação delicada sobre a pele."

            }

        };


        let activeNoteKey =
            null;


        function openNote(
            key
        ) {

            const note =
                noteData[
                    key
                ];


            if (
                !note ||
                !noteModal
            ) {

                return;
            }


            activeNoteKey =
                key;


            if (
                noteModalIcon
            ) {

                noteModalIcon.textContent =
                    note.icon;

            }


            if (
                noteModalTitle
            ) {

                noteModalTitle.textContent =
                    note.title;

            }


            if (
                noteModalText
            ) {

                noteModalText.textContent =
                    note.text;

            }


            openModal(
                noteModal
            );

        }


        function closeNoteModal() {

            closeModal(
                noteModal
            );

        }


        document.addEventListener(
            "click",
            event => {

                const noteButton =
                    event.target.closest(
                        "[data-note]"
                    );


                if (
                    !noteButton
                ) {

                    return;
                }


                const key =
                    noteButton.dataset.note;


                openNote(
                    key
                );

            }
        );


        document.addEventListener(
            "click",
            event => {

                const closeButton =
                    event.target.closest(
                        "[data-note-close]"
                    );


                if (
                    !closeButton
                ) {

                    return;
                }


                event.preventDefault();


                closeNoteModal();

            }
        );


        /* =========================================================
           TIMELINE
        ========================================================= */

        const timelineRange =
            $("#timelineRange");


        const timelineHour =
            $("#timelineHour");


        const timelineTitle =
            $("#timelineTitle");


        const timelineText =
            $("#timelineText");


        const timelineStages = [

            {

                max:
                    19,

                hour:
                    "Agora",

                title:
                    "Comece leve.",

                text:
                    "Os primeiros instantes são mais luminosos, frescos e cheios de energia."

            },


            {

                max:
                    39,

                hour:
                    "+2h",

                title:
                    "O floral aparece.",

                text:
                    "A fragrância começa a revelar um coração mais floral, delicado e romântico."

            },


            {

                max:
                    59,

                hour:
                    "+4h",

                title:
                    "Amor no ar.",

                text:
                    "O lado romântico fica mais evidente e a sensação se torna confortável e envolvente."

            },


            {

                max:
                    79,

                hour:
                    "+6h",

                title:
                    "Mais aconchegante.",

                text:
                    "As notas de fundo ganham espaço e deixam a experiência mais macia e profunda."

            },


            {

                max:
                    100,

                hour:
                    "Final",

                title:
                    "Uma memória Dream.",

                text:
                    "O que permanece é uma assinatura suave, confortável e delicadamente envolvente."

            }

        ];


        function getTimelineStage(
            value
        ) {

            return (
                timelineStages.find(
                    stage =>
                        value <=
                        stage.max
                ) ||
                timelineStages[
                    timelineStages.length -
                    1
                ]
            );

        }


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
                    ) ||
                    0,
                    0,
                    100
                );


            timelineRange.style.setProperty(
                "--timeline-progress",
                `${value}%`
            );


            const stage =
                getTimelineStage(
                    value
                );


            if (
                timelineHour
            ) {

                timelineHour.textContent =
                    stage.hour;

            }


            if (
                timelineTitle
            ) {

                timelineTitle.textContent =
                    stage.title;

            }


            if (
                timelineText
            ) {

                timelineText.textContent =
                    stage.text;

            }

        }


        timelineRange?.addEventListener(
            "input",
            updateTimeline
        );


        updateTimeline();


        /* =========================================================
           CONTINUA NA PARTE 2/4
        ========================================================= */
                /* =====================================================
           MOODS
        ====================================================== */

        const moods = {

            romantico: {

                primary:
                    "#e786b3",

                secondary:
                    "#9c6ce0",

                name:
                    "Romântico",

                icon:
                    "♡"

            },


            sonhador: {

                primary:
                    "#a78bfa",

                secondary:
                    "#60a5fa",

                name:
                    "Sonhador",

                icon:
                    "☁"

            },


            noturno: {

                primary:
                    "#8b5cf6",

                secondary:
                    "#4338ca",

                name:
                    "Noturno",

                icon:
                    "☾"

            },


            energia: {

                primary:
                    "#fb7185",

                secondary:
                    "#f59e0b",

                name:
                    "Energia",

                icon:
                    "✦"

            },


            calmo: {

                primary:
                    "#45c4aa",

                secondary:
                    "#5285c5",

                name:
                    "Calmo",

                icon:
                    "◌"

            }

        };


        function hexToRgbString(
            hex
        ) {

            let clean =
                String(
                    hex
                )
                    .replace(
                        "#",
                        ""
                    )
                    .trim();


            if (
                clean.length ===
                3
            ) {

                clean =
                    clean
                        .split(
                            ""
                        )
                        .map(
                            char =>
                                char + char
                        )
                        .join(
                            ""
                        );

            }


            const number =
                Number.parseInt(
                    clean,
                    16
                );


            if (
                Number.isNaN(
                    number
                )
            ) {

                return "0, 0, 0";

            }


            return [
                (
                    number >>
                    16
                ) &
                255,

                (
                    number >>
                    8
                ) &
                255,

                number &
                255
            ].join(
                ", "
            );

        }


        function setRootColors(
            primary,
            secondary
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
                hexToRgbString(
                    primary
                )
            );


            root.style.setProperty(
                "--secondary-rgb",
                hexToRgbString(
                    secondary
                )
            );

        }


        const moodControlSelector =
            ".mood-button[data-mood], .mood-showcase-card[data-mood]";


        function renderMoodButtons(
            moodKey
        ) {

            $$(
                moodControlSelector
            ).forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.mood ===
                            moodKey
                    );

                }
            );

        }


        function applyMood(
            moodKey,
            save = true,
            notify = true
        ) {

            const mood =
                moods[
                    moodKey
                ];


            if (
                !mood
            ) {

                return;

            }


            state.currentMood =
                moodKey;


            body.dataset.mood =
                moodKey;


            setRootColors(
                mood.primary,
                mood.secondary
            );


            renderMoodButtons(
                moodKey
            );


            const primaryColor =
                $("#primaryColor");


            const secondaryColor =
                $("#secondaryColor");


            if (
                primaryColor
            ) {

                primaryColor.value =
                    mood.primary;

            }


            if (
                secondaryColor
            ) {

                secondaryColor.value =
                    mood.secondary;

            }


            if (
                save
            ) {

                clearPresetSelection(
                    false
                );


                storage.set(
                    "dream.mood",
                    moodKey
                );


                storage.remove(
                    "dream.palette"
                );


                storage.remove(
                    "dream.customColors"
                );


                storage.remove(
                    "dream.preset"
                );


                $$(
                    "[data-palette]"
                ).forEach(
                    button =>
                        button.classList.remove(
                            "active"
                        )
                );


                $$(
                    "[data-preset]"
                ).forEach(
                    button =>
                        button.classList.remove(
                            "active"
                        )
                );

            }


            if (
                notify
            ) {

                showToast(
                    state.currentLanguage ===
                        "en-US"
                        ? `${mood.name} mood applied ✦`
                        : `Mood ${mood.name} aplicado ✦`
                );

            }

        }


        document.addEventListener(
            "click",
            event => {

                const moodButton =
                    event.target.closest(
                        moodControlSelector
                    );


                if (
                    !moodButton
                ) {

                    return;

                }


                const moodKey =
                    moodButton.dataset.mood;


                applyMood(
                    moodKey
                );

            }
        );


        if (
            moods[
                state.currentMood
            ]
        ) {

            applyMood(
                state.currentMood,
                false,
                false
            );

        }

        else {

            state.currentMood =
                "romantico";


            state.currentPreset =
                "dream";


            applyMood(
                "romantico",
                false,
                false
            );

        }


        /* =====================================================
           DREAM MOMENT
        ====================================================== */

        const dreamMomentTitle =
            $("#dreamMomentTitle");


        const dreamMomentText =
            $("#dreamMomentText");


        const newDreamMoment =
            $("#newDreamMoment");


        const dreamMomentCard =
            $(".dream-moment-card");


        const dreamMoments = [

            {

                title:
                    "Coloque sua música favorita.",

                text:
                    "Escolha uma música que combine com o seu momento e transforme alguns minutos comuns em uma pequena memória."

            },


            {

                title:
                    "Olhe para o céu por um minuto.",

                text:
                    "Às vezes um instante simples, uma janela aberta e um pouco de silêncio já mudam o clima do dia."

            },


            {

                title:
                    "Envie uma mensagem especial.",

                text:
                    "Pense em alguém importante e diga algo que você normalmente deixaria para depois."

            },


            {

                title:
                    "Faça algo só por você.",

                text:
                    "Um banho tranquilo, uma música, um perfume ou alguns minutos sem pressa também podem virar um momento Dream."

            },


            {

                title:
                    "Guarde uma pequena lembrança.",

                text:
                    "Uma foto, uma frase ou uma música pode transformar um momento simples em algo que você vai lembrar depois."

            },


            {

                title:
                    "Deixe o celular por alguns minutos.",

                text:
                    "Dê espaço para perceber o ambiente, a música, o perfume e os detalhes que normalmente passam despercebidos."

            },


            {

                title:
                    "Crie sua própria atmosfera.",

                text:
                    "Luz mais baixa, música certa e um toque de Dream podem mudar completamente a sensação de um lugar."

            }

        ];


        let currentDreamMoment =
            -1;


        function getNextDreamMomentIndex() {

            if (
                dreamMoments.length <=
                1
            ) {

                return 0;

            }


            let next =
                Math.floor(
                    Math.random() *
                    dreamMoments.length
                );


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


            return next;

        }


        async function showNewDreamMoment() {

            if (
                !dreamMomentTitle ||
                !dreamMomentText
            ) {

                return;

            }


            currentDreamMoment =
                getNextDreamMomentIndex();


            const moment =
                dreamMoments[
                    currentDreamMoment
                ];


            dreamMomentCard
                ?.classList.add(
                    "moment-changing"
                );


            await wait(
                state.animations
                    ? 270
                    : 0
            );


            dreamMomentTitle.textContent =
                moment.title;


            dreamMomentText.textContent =
                moment.text;


            await wait(
                state.animations
                    ? 390
                    : 0
            );


            dreamMomentCard
                ?.classList.remove(
                    "moment-changing"
                );

        }


        newDreamMoment?.addEventListener(
            "click",
            showNewDreamMoment
        );


        /* =====================================================
           DREAM SCENES
        ====================================================== */

        const dreamSceneBackground =
            $("#dreamSceneBackground");


        const sceneResultIcon =
            $("#sceneResultIcon");


        const sceneResultTitle =
            $("#sceneResultTitle");


        const sceneResultText =
            $("#sceneResultText");


        const scenes = {

            romance: {

                icon:
                    "♡",

                title:
                    "Amor está no ar.",

                text:
                    "Uma atmosfera delicada, rosa e envolvente.",

                background:
                    `
                        radial-gradient(
                            circle at 20% 50%,
                            rgba(255, 111, 169, 0.40),
                            transparent 38%
                        ),
                        radial-gradient(
                            circle at 80% 40%,
                            rgba(169, 92, 221, 0.30),
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
                    "☁",

                title:
                    "Sonhe mais alto.",

                text:
                    "Azul, leve e sereno como uma noite olhando para o céu.",

                background:
                    `
                        radial-gradient(
                            circle at 25% 35%,
                            rgba(96, 165, 250, 0.40),
                            transparent 37%
                        ),
                        radial-gradient(
                            circle at 78% 45%,
                            rgba(167, 139, 250, 0.30),
                            transparent 43%
                        ),
                        linear-gradient(
                            135deg,
                            #0b1428,
                            #25214c
                        )
                    `

            },


            flores: {

                icon:
                    "✿",

                title:
                    "Flores por toda parte.",

                text:
                    "Uma cena suave, floral e romântica inspirada no coração do Dream.",

                background:
                    `
                        radial-gradient(
                            circle at 25% 38%,
                            rgba(244, 114, 182, 0.39),
                            transparent 38%
                        ),
                        radial-gradient(
                            circle at 78% 50%,
                            rgba(216, 180, 254, 0.28),
                            transparent 42%
                        ),
                        linear-gradient(
                            135deg,
                            #24101e,
                            #48243b
                        )
                    `

            },


            energia: {

                icon:
                    "✦",

                title:
                    "Faça o momento acontecer.",

                text:
                    "Mais quente, vibrante e intenso para quando você quer mudar a energia.",

                background:
                    `
                        radial-gradient(
                            circle at 20% 42%,
                            rgba(251, 113, 133, 0.44),
                            transparent 37%
                        ),
                        radial-gradient(
                            circle at 78% 42%,
                            rgba(245, 158, 11, 0.28),
                            transparent 42%
                        ),
                        linear-gradient(
                            135deg,
                            #26100f,
                            #4a1c26
                        )
                    `

            }

        };


        function applyScene(
            sceneKey,
            notify = false
        ) {

            const scene =
                scenes[
                    sceneKey
                ];


            if (
                !scene
            ) {

                return;

            }


            $$(
                "[data-scene]"
            ).forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.scene ===
                            sceneKey
                    );

                }
            );


            if (
                sceneResultIcon
            ) {

                sceneResultIcon.textContent =
                    scene.icon;

            }


            if (
                sceneResultTitle
            ) {

                sceneResultTitle.textContent =
                    scene.title;

            }


            if (
                sceneResultText
            ) {

                sceneResultText.textContent =
                    scene.text;

            }


            if (
                dreamSceneBackground
            ) {

                dreamSceneBackground.style.background =
                    scene.background;

            }


            if (
                notify
            ) {

                showToast(
                    `Dream Scene: ${scene.title}`
                );

            }

        }


        document.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-scene]"
                    );


                if (
                    !button
                ) {

                    return;

                }


                applyScene(
                    button.dataset.scene
                );

            }
        );


        applyScene(
            "romance"
        );


        /* =====================================================
           3D NOS CARDS
        ====================================================== */

        const tiltCards =
            $$("[data-tilt-card]");


        function resetCardTilt(
            card
        ) {

            card.style.transform =
                "";

        }


        tiltCards.forEach(
            card => {

                card.addEventListener(
                    "pointermove",
                    event => {

                        if (
                            !state.motion ||
                            window.innerWidth <=
                                760
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
                            rect.width;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height;


                        const strength =
                            clamp(
                                state.motionIntensity *
                                    0.55,
                                0,
                                6
                            );


                        const rotateY =
                            (
                                x -
                                0.5
                            ) *
                            strength;


                        const rotateX =
                            (
                                0.5 -
                                y
                            ) *
                            strength;


                        card.style.transform =
                            `
                                translateY(-7px)
                                rotateX(${rotateX}deg)
                                rotateY(${rotateY}deg)
                            `;

                    }
                );


                card.addEventListener(
                    "pointerleave",
                    () =>
                        resetCardTilt(
                            card
                        )
                );

            }
        );


        /* =====================================================
           GALERIA
        ====================================================== */

        const galleryTrack =
            $("#galleryTrack");


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


        const galleryItems =
            galleryTrack
                ? $$(
                    ".gallery-item",
                    galleryTrack
                )
                : [];


        let galleryIndex =
            0;


        let galleryAutoplayEnabled =
            storage.get(
                "dream.galleryAutoplay",
                true
            );


        let galleryAutoplayTimer =
            null;


        let galleryScrollTimer =
            null;


        let galleryDragging =
            false;


        let galleryDragStartX =
            0;


        let galleryDragStartScroll =
            0;


        function formatGalleryNumber(
            number
        ) {

            return String(
                number
            ).padStart(
                2,
                "0"
            );

        }


        function getGalleryItemPosition(
            index
        ) {

            const item =
                galleryItems[
                    index
                ];


            if (
                !item ||
                !galleryTrack
            ) {

                return 0;

            }


            const trackRect =
                galleryTrack
                    .getBoundingClientRect();


            const itemRect =
                item
                    .getBoundingClientRect();


            return (
                galleryTrack.scrollLeft +
                itemRect.left -
                trackRect.left
            );

        }


        function renderGalleryDots() {

            if (
                !galleryDots
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
                        `Ir para imagem ${
                            index +
                            1
                        }`
                    );


                    dot.classList.toggle(
                        "active",
                        index ===
                            galleryIndex
                    );


                    dot.addEventListener(
                        "click",
                        () => {

                            goToGallery(
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


        function updateGalleryUI() {

            const amount =
                galleryItems.length;


            if (
                galleryCurrent
            ) {

                galleryCurrent.textContent =
                    formatGalleryNumber(
                        galleryIndex +
                        1
                    );

            }


            if (
                galleryTotal
            ) {

                galleryTotal.textContent =
                    formatGalleryNumber(
                        amount
                    );

            }


            $$(
                ".gallery-dot",
                galleryDots
            ).forEach(
                (
                    dot,
                    index
                ) => {

                    dot.classList.toggle(
                        "active",
                        index ===
                            galleryIndex
                    );

                }
            );

        }


        function normalizeGalleryIndex(
            index
        ) {

            if (
                !galleryItems.length
            ) {

                return 0;

            }


            if (
                index <
                0
            ) {

                return (
                    galleryItems.length -
                    1
                );

            }


            if (
                index >=
                galleryItems.length
            ) {

                return 0;

            }


            return index;

        }


        function goToGallery(
            index,
            behavior = null
        ) {

            if (
                !galleryTrack ||
                !galleryItems.length
            ) {

                return;

            }


            galleryIndex =
                normalizeGalleryIndex(
                    index
                );


            galleryTrack.scrollTo(
                {

                    left:
                        getGalleryItemPosition(
                            galleryIndex
                        ),

                    behavior:
                        behavior ||
                        (
                            state.animations
                                ? "smooth"
                                : "auto"
                        )

                }
            );


            updateGalleryUI();

        }


        function nextGallery() {

            goToGallery(
                galleryIndex +
                1
            );

        }


        function previousGallery() {

            goToGallery(
                galleryIndex -
                1
            );

        }


        galleryPrev?.addEventListener(
            "click",
            () => {

                previousGallery();

                restartGalleryAutoplay();

            }
        );


        galleryNext?.addEventListener(
            "click",
            () => {

                nextGallery();

                restartGalleryAutoplay();

            }
        );


        function findNearestGalleryIndex() {

            if (
                !galleryTrack ||
                !galleryItems.length
            ) {

                return 0;

            }


            const scroll =
                galleryTrack.scrollLeft;


            let nearestIndex =
                0;


            let nearestDistance =
                Infinity;


            galleryItems.forEach(
                (
                    item,
                    index
                ) => {

                    const position =
                        getGalleryItemPosition(
                            index
                        );


                    const distance =
                        Math.abs(
                            position -
                            scroll
                        );


                    if (
                        distance <
                        nearestDistance
                    ) {

                        nearestDistance =
                            distance;


                        nearestIndex =
                            index;

                    }

                }
            );


            return nearestIndex;

        }


        galleryTrack?.addEventListener(
            "scroll",
            () => {

                window.clearTimeout(
                    galleryScrollTimer
                );


                galleryScrollTimer =
                    window.setTimeout(
                        () => {

                            galleryIndex =
                                findNearestGalleryIndex();


                            updateGalleryUI();

                        },
                        90
                    );

            },
            {
                passive:
                    true
            }
        );


        /* =====================================================
           DRAG DA GALERIA
        ====================================================== */

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


                galleryDragStartX =
                    event.clientX;


                galleryDragStartScroll =
                    galleryTrack.scrollLeft;


                galleryTrack.classList.add(
                    "dragging"
                );


                galleryTrack.setPointerCapture?.(
                    event.pointerId
                );


                stopGalleryAutoplay();

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


                const difference =
                    event.clientX -
                    galleryDragStartX;


                galleryTrack.scrollLeft =
                    galleryDragStartScroll -
                    difference;

            }
        );


        function finishGalleryDrag(
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

                try {

                    galleryTrack
                        ?.releasePointerCapture?.(
                            event.pointerId
                        );

                }

                catch (
                    error
                ) {

                    /*
                        O navegador pode ter liberado
                        o ponteiro automaticamente.
                    */

                }

            }


            galleryIndex =
                findNearestGalleryIndex();


            goToGallery(
                galleryIndex
            );


            restartGalleryAutoplay();

        }


        galleryTrack?.addEventListener(
            "pointerup",
            finishGalleryDrag
        );


        galleryTrack?.addEventListener(
            "pointercancel",
            finishGalleryDrag
        );


        /* =====================================================
           AUTOPLAY DA GALERIA
        ====================================================== */

        function updateGalleryAutoplayButton() {

            if (
                !galleryAutoplay
            ) {

                return;

            }


            galleryAutoplay.classList.toggle(
                "active",
                galleryAutoplayEnabled
            );


            galleryAutoplay.setAttribute(
                "aria-pressed",
                String(
                    galleryAutoplayEnabled
                )
            );


            galleryAutoplay.textContent =
                galleryAutoplayEnabled
                    ? "◉ Autoplay"
                    : "○ Autoplay";

        }


        function stopGalleryAutoplay() {

            window.clearInterval(
                galleryAutoplayTimer
            );


            galleryAutoplayTimer =
                null;

        }


        function startGalleryAutoplay() {

            stopGalleryAutoplay();


            if (
                !galleryAutoplayEnabled ||
                galleryItems.length <=
                    1 ||
                document.hidden
            ) {

                return;

            }


            galleryAutoplayTimer =
                window.setInterval(
                    () => {

                        nextGallery();

                    },
                    5200
                );

        }


        function restartGalleryAutoplay() {

            if (
                galleryAutoplayEnabled
            ) {

                startGalleryAutoplay();

            }

        }


        galleryAutoplay?.addEventListener(
            "click",
            () => {

                galleryAutoplayEnabled =
                    !galleryAutoplayEnabled;


                storage.set(
                    "dream.galleryAutoplay",
                    galleryAutoplayEnabled
                );


                if (
                    typeof galleryStudioToggle !==
                        "undefined" &&
                    galleryStudioToggle
                ) {

                    galleryStudioToggle.checked =
                        galleryAutoplayEnabled;

                }


                if (
                    typeof clearPresetSelection ===
                    "function"
                ) {

                    clearPresetSelection();

                }


                updateGalleryAutoplayButton();


                if (
                    galleryAutoplayEnabled
                ) {

                    startGalleryAutoplay();


                    showToast(
                        state.currentLanguage ===
                            "en-US"
                            ? "Gallery autoplay enabled."
                            : "Autoplay da galeria ativado."
                    );

                }

                else {

                    stopGalleryAutoplay();


                    showToast(
                        state.currentLanguage ===
                            "en-US"
                            ? "Gallery autoplay paused."
                            : "Autoplay da galeria pausado."
                    );

                }

            }
        );


        galleryTrack?.addEventListener(
            "mouseenter",
            () => {

                if (
                    galleryAutoplayEnabled
                ) {

                    stopGalleryAutoplay();

                }

            }
        );


        galleryTrack?.addEventListener(
            "mouseleave",
            () => {

                if (
                    galleryAutoplayEnabled &&
                    !galleryDragging
                ) {

                    startGalleryAutoplay();

                }

            }
        );


        /* =====================================================
           LIGHTBOX
        ====================================================== */

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


        function getGalleryData(
            index
        ) {

            const item =
                galleryItems[
                    normalizeGalleryIndex(
                        index
                    )
                ];


            if (
                !item
            ) {

                return null;

            }


            const image =
                $(
                    "img",
                    item
                );


            const title =
                $(
                    "h3",
                    item
                );


            return {

                src:
                    image?.getAttribute(
                        "src"
                    ) ||
                    "",


                alt:
                    image?.getAttribute(
                        "alt"
                    ) ||
                    "Dream",


                title:
                    title?.textContent.trim() ||
                    image?.alt ||
                    "Dream"

            };

        }


        function renderLightbox() {

            const data =
                getGalleryData(
                    lightboxIndex
                );


            if (
                !data
            ) {

                return;

            }


            if (
                lightboxImage
            ) {

                lightboxImage.src =
                    data.src;


                lightboxImage.alt =
                    data.alt;

            }


            if (
                lightboxTitle
            ) {

                lightboxTitle.textContent =
                    data.title;

            }


            if (
                lightboxCounter
            ) {

                lightboxCounter.textContent =
                    `${
                        formatGalleryNumber(
                            lightboxIndex +
                            1
                        )
                    } / ${
                        formatGalleryNumber(
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
                normalizeGalleryIndex(
                    index
                );


            renderLightbox();


            lightbox.classList.add(
                "open"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            updateModalBodyState();


            stopGalleryAutoplay();


            window.setTimeout(
                () => {

                    lightboxClose?.focus(
                        {
                            preventScroll:
                                true
                        }
                    );

                },
                100
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


            updateModalBodyState();


            if (
                galleryAutoplayEnabled
            ) {

                startGalleryAutoplay();

            }

        }


        function nextLightbox() {

            lightboxIndex =
                normalizeGalleryIndex(
                    lightboxIndex +
                    1
                );


            renderLightbox();

        }


        function previousLightbox() {

            lightboxIndex =
                normalizeGalleryIndex(
                    lightboxIndex -
                    1
                );


            renderLightbox();

        }


        galleryItems.forEach(
            (
                item,
                index
            ) => {

                item.addEventListener(
                    "click",
                    event => {

                        if (
                            galleryDragging
                        ) {

                            return;

                        }


                        const openButton =
                            event.target.closest(
                                ".gallery-open"
                            );


                        const clickedInteractive =
                            event.target.closest(
                                "button, a"
                            );


                        if (
                            clickedInteractive &&
                            !openButton
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


        lightboxBackdrop?.addEventListener(
            "click",
            closeLightbox
        );


        lightboxPrev?.addEventListener(
            "click",
            previousLightbox
        );


        lightboxNext?.addEventListener(
            "click",
            nextLightbox
        );


        /* =====================================================
           TECLADO DA GALERIA
        ====================================================== */

        galleryTrack?.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    event.preventDefault();


                    nextGallery();


                    restartGalleryAutoplay();

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    event.preventDefault();


                    previousGallery();


                    restartGalleryAutoplay();

                }

            }
        );


        /* =====================================================
           INICIALIZA GALERIA
        ====================================================== */

        if (
            galleryItems.length
        ) {

            galleryIndex =
                0;


            renderGalleryDots();


            updateGalleryUI();


            updateGalleryAutoplayButton();


            startGalleryAutoplay();

        }


        /* =====================================================
           VISIBILIDADE DA PÁGINA
        ====================================================== */

        document.addEventListener(
            "visibilitychange",
            () => {

                if (
                    document.hidden
                ) {

                    stopGalleryAutoplay();

                }

                else if (
                    galleryAutoplayEnabled
                ) {

                    startGalleryAutoplay();

                }

            }
        );


        /* =====================================================
           RESIZE
        ====================================================== */

        let partTwoResizeTimer =
            null;


        window.addEventListener(
            "resize",
            () => {

                window.clearTimeout(
                    partTwoResizeTimer
                );


                partTwoResizeTimer =
                    window.setTimeout(
                        () => {

                            if (
                                galleryItems.length
                            ) {

                                goToGallery(
                                    galleryIndex,
                                    "auto"
                                );

                            }


                            if (
                                window.innerWidth <=
                                760
                            ) {

                                tiltCards.forEach(
                                    resetCardTilt
                                );

                            }

                        },
                        120
                    );

            }
        );


        /* =====================================================
           DREAM APP • PARTE 2
        ====================================================== */

        window.DreamApp = {

            ...window.DreamApp,


            noteData,


            openNote,


            closeNoteModal,


            timelineStages,


            updateTimeline,


            moods,


            applyMood,


            setRootColors,


            hexToRgbString,


            dreamMoments,


            showNewDreamMoment,


            scenes,


            applyScene,


            goToGallery,


            nextGallery,


            previousGallery,


            openLightbox,


            closeLightbox,


            nextLightbox,


            previousLightbox

        };


        /* =====================================================
           NÃO FECHE O DOMContentLoaded

           A PARTE 3/4 CONTINUA ABAIXO
        ====================================================== */
                /* =====================================================
           QUIZ
        ====================================================== */

        const quizStart =
            $("#quizStart");


        const startQuiz =
            $("#startQuiz");


        const quizQuestionsBox =
            $("#quizQuestions");


        const quizStep =
            $("#quizStep");


        const quizProgressBar =
            $("#quizProgressBar");


        const quizQuestion =
            $("#quizQuestion");


        const quizOptions =
            $("#quizOptions");


        const quizResult =
            $("#quizResult");


        const quizResultIcon =
            $("#quizResultIcon");


        const quizResultTitle =
            $("#quizResultTitle");


        const quizResultText =
            $("#quizResultText");


        const applyQuizMoodButton =
            $("#applyQuizMood");


        const restartQuizButton =
            $("#restartQuiz");


        const shareQuizResultButton =
            $("#shareQuizResult");


        const quizQuestions = [

            {

                question:
                    "Qual atmosfera combina mais com você?",

                options: [

                    {

                        label:
                            "Um encontro romântico ♡",

                        mood:
                            "romantico"

                    },


                    {

                        label:
                            "Uma noite olhando o céu ☁",

                        mood:
                            "sonhador"

                    },


                    {

                        label:
                            "Uma cidade iluminada à noite ☾",

                        mood:
                            "noturno"

                    },


                    {

                        label:
                            "Um dia cheio de energia ✦",

                        mood:
                            "energia"

                    }

                ]

            },


            {

                question:
                    "Como seria o seu momento perfeito?",

                options: [

                    {

                        label:
                            "Perto de alguém especial",

                        mood:
                            "romantico"

                    },


                    {

                        label:
                            "Escutando música e imaginando",

                        mood:
                            "sonhador"

                    },


                    {

                        label:
                            "Em um lugar tranquilo",

                        mood:
                            "calmo"

                    },


                    {

                        label:
                            "Fazendo algo espontâneo",

                        mood:
                            "energia"

                    }

                ]

            },


            {

                question:
                    "Qual palavra mais combina com você agora?",

                options: [

                    {

                        label:
                            "Amor",

                        mood:
                            "romantico"

                    },


                    {

                        label:
                            "Sonho",

                        mood:
                            "sonhador"

                    },


                    {

                        label:
                            "Mistério",

                        mood:
                            "noturno"

                    },


                    {

                        label:
                            "Paz",

                        mood:
                            "calmo"

                    }

                ]

            },


            {

                question:
                    "Escolha um símbolo para terminar.",

                options: [

                    {

                        label:
                            "♡ Coração",

                        mood:
                            "romantico"

                    },


                    {

                        label:
                            "☁ Nuvem",

                        mood:
                            "sonhador"

                    },


                    {

                        label:
                            "☾ Lua",

                        mood:
                            "noturno"

                    },


                    {

                        label:
                            "✦ Estrela",

                        mood:
                            "energia"

                    },


                    {

                        label:
                            "◌ Círculo",

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

                title:
                    "Romântico",

                text:
                    "Seu Dream é delicado, envolvente e cheio de sentimento. Você combina com momentos especiais e uma atmosfera de amor no ar."

            },


            sonhador: {

                icon:
                    "☁",

                title:
                    "Sonhador",

                text:
                    "Seu Dream é leve, imaginativo e tranquilo. Você gosta de momentos que deixam a mente viajar e transformam o simples em especial."

            },


            noturno: {

                icon:
                    "☾",

                title:
                    "Noturno",

                text:
                    "Seu Dream tem um lado mais profundo, elegante e misterioso. A noite e suas atmosferas combinam com a sua personalidade."

            },


            energia: {

                icon:
                    "✦",

                title:
                    "Energia",

                text:
                    "Seu Dream é vibrante, espontâneo e cheio de movimento. Você gosta de transformar o momento e fazer as coisas acontecerem."

            },


            calmo: {

                icon:
                    "◌",

                title:
                    "Calmo",

                text:
                    "Seu Dream valoriza tranquilidade, conforto e leveza. Você combina com momentos simples que trazem uma sensação boa e serena."

            }

        };


        let quizCurrentQuestion =
            0;


        let quizFinalMood =
            "romantico";


        let quizScores =
            {};


        function resetQuizScores() {

            quizScores = {

                romantico:
                    0,

                sonhador:
                    0,

                noturno:
                    0,

                energia:
                    0,

                calmo:
                    0

            };

        }


        resetQuizScores();


        function showQuizScreen(
            screen
        ) {

            if (
                quizStart
            ) {

                quizStart.hidden =
                    screen !==
                    "start";

            }


            if (
                quizQuestionsBox
            ) {

                quizQuestionsBox.hidden =
                    screen !==
                    "questions";

            }


            if (
                quizResult
            ) {

                quizResult.hidden =
                    screen !==
                    "result";

            }

        }


        function renderQuizQuestion() {

            const item =
                quizQuestions[
                    quizCurrentQuestion
                ];


            if (
                !item
            ) {

                finishQuiz();

                return;

            }


            const total =
                quizQuestions.length;


            const current =
                quizCurrentQuestion +
                1;


            if (
                quizStep
            ) {

                quizStep.textContent =
                    `${
                        String(
                            current
                        ).padStart(
                            2,
                            "0"
                        )
                    } / ${
                        String(
                            total
                        ).padStart(
                            2,
                            "0"
                        )
                    }`;

            }


            if (
                quizProgressBar
            ) {

                quizProgressBar.style.width =
                    `${
                        (
                            current /
                            total
                        ) *
                        100
                    }%`;

            }


            if (
                quizQuestion
            ) {

                quizQuestion.textContent =
                    item.question;

            }


            if (
                !quizOptions
            ) {

                return;

            }


            quizOptions.innerHTML =
                "";


            item.options.forEach(
                (
                    option,
                    index
                ) => {

                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type =
                        "button";


                    button.className =
                        "quiz-option";


                    button.textContent =
                        option.label;


                    button.dataset.quizMood =
                        option.mood;


                    button.dataset.quizOption =
                        String(
                            index
                        );


                    quizOptions.appendChild(
                        button
                    );

                }
            );

        }


        function startQuizExperience() {

            quizCurrentQuestion =
                0;


            quizFinalMood =
                "romantico";


            resetQuizScores();


            showQuizScreen(
                "questions"
            );


            renderQuizQuestion();

        }


        function selectQuizAnswer(
            mood
        ) {

            if (
                !(
                    mood in
                    quizScores
                )
            ) {

                return;

            }


            quizScores[
                mood
            ] +=
                1;


            quizCurrentQuestion +=
                1;


            if (
                quizCurrentQuestion >=
                quizQuestions.length
            ) {

                finishQuiz();

                return;

            }


            if (
                quizQuestionsBox &&
                state.animations
            ) {

                quizQuestionsBox.animate(
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
                            320,

                        easing:
                            "ease"

                    }
                );

            }


            renderQuizQuestion();

        }


        function calculateQuizResult() {

            const entries =
                Object.entries(
                    quizScores
                );


            let winner =
                state.currentMood &&
                moods[
                    state.currentMood
                ]
                    ? state.currentMood
                    : "romantico";


            let highest =
                -1;


            entries.forEach(
                (
                    [
                        mood,
                        score
                    ]
                ) => {

                    if (
                        score >
                        highest
                    ) {

                        highest =
                            score;


                        winner =
                            mood;

                    }

                    else if (
                        score ===
                            highest &&
                        mood ===
                            state.currentMood
                    ) {

                        winner =
                            mood;

                    }

                }
            );


            return winner;

        }


        function finishQuiz() {

            quizFinalMood =
                calculateQuizResult();


            const result =
                quizResults[
                    quizFinalMood
                ] ||
                quizResults.romantico;


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
                    result.title;

            }


            if (
                quizResultText
            ) {

                quizResultText.textContent =
                    result.text;

            }


            showQuizScreen(
                "result"
            );

        }


        function restartQuiz() {

            quizCurrentQuestion =
                0;


            quizFinalMood =
                "romantico";


            resetQuizScores();


            showQuizScreen(
                "start"
            );

        }


        function applyQuizMood() {

            applyMood(
                quizFinalMood
            );


            showToast(
                state.currentLanguage ===
                    "en-US"
                    ? "Your Dream mood was applied ✦"
                    : "Seu Dream Mood foi aplicado ✦"
            );

        }


        async function shareQuizResult() {

            const result =
                quizResults[
                    quizFinalMood
                ] ||
                quizResults.romantico;


            const english =
                state.currentLanguage ===
                    "en-US";


            const text =
                english
                    ? `My Dream mood is ${result.title} ✦`
                    : `Meu Dream Mood é ${result.title} ✦`;


            try {

                if (
                    navigator.share
                ) {

                    await navigator.share(
                        {

                            title:
                                "Dream Amor no Ar",

                            text

                        }
                    );


                    return;

                }


                if (
                    navigator.clipboard
                ) {

                    await navigator.clipboard.writeText(
                        text
                    );


                    showToast(
                        english
                            ? "Result copied ✦"
                            : "Resultado copiado ✦"
                    );


                    return;

                }

            }

            catch (
                error
            ) {

                if (
                    error?.name ===
                    "AbortError"
                ) {

                    return;

                }

            }


            showToast(
                english
                    ? "Share your Dream mood ✦"
                    : "Compartilhe seu Dream Mood ✦"
            );

        }


        startQuiz?.addEventListener(
            "click",
            startQuizExperience
        );


        quizOptions?.addEventListener(
            "click",
            event => {

                const option =
                    event.target.closest(
                        "[data-quiz-mood]"
                    );


                if (
                    !option
                ) {

                    return;

                }


                selectQuizAnswer(
                    option.dataset.quizMood
                );

            }
        );


        restartQuizButton?.addEventListener(
            "click",
            restartQuiz
        );


        applyQuizMoodButton?.addEventListener(
            "click",
            applyQuizMood
        );


        shareQuizResultButton?.addEventListener(
            "click",
            shareQuizResult
        );


        /* =====================================================
           DREAM STUDIO
        ====================================================== */

        const settingsButton =
            $("#settingsButton");


        const closeSettingsButton =
            $("#closeSettings");


        function openSettings() {

            if (
                !settingsPanel
            ) {

                return;

            }


            settingsPanel.classList.add(
                "open"
            );


            settingsPanel.setAttribute(
                "aria-hidden",
                "false"
            );


            settingsButton?.setAttribute(
                "aria-expanded",
                "true"
            );


            window.setTimeout(
                () => {

                    closeSettingsButton
                        ?.focus(
                            {
                                preventScroll:
                                    true
                            }
                        );

                },
                120
            );

        }


        function closeSettings() {

            if (
                !settingsPanel
            ) {

                return;

            }


            settingsPanel.classList.remove(
                "open"
            );


            settingsPanel.setAttribute(
                "aria-hidden",
                "true"
            );


            settingsButton?.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        function toggleSettings() {

            if (
                settingsPanel?.classList.contains(
                    "open"
                )
            ) {

                closeSettings();

            }

            else {

                openSettings();

            }

        }


        settingsButton?.addEventListener(
            "click",
            toggleSettings
        );


        closeSettingsButton?.addEventListener(
            "click",
            closeSettings
        );


        /* =====================================================
           DARK MODE
        ====================================================== */

        const darkToggle =
            $("#darkToggle");


        const themeButton =
            $("#themeButton");


        function renderThemeButton() {

            if (
                !themeButton
            ) {

                return;

            }


            const dark =
                body.classList.contains(
                    "dark"
                );


            themeButton.textContent =
                dark
                    ? "☀"
                    : "☾";


            themeButton.setAttribute(
                "aria-label",
                dark
                    ? "Ativar tema claro"
                    : "Ativar tema escuro"
            );

        }


        function setDarkMode(
            enabled,
            save = true
        ) {

            const value =
                Boolean(
                    enabled
                );


            body.classList.toggle(
                "dark",
                value
            );


            if (
                darkToggle
            ) {

                darkToggle.checked =
                    value;

            }


            renderThemeButton();


            if (
                save
            ) {

                storage.set(
                    "dream.dark",
                    value
                );

            }

        }


        darkToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setDarkMode(
                    darkToggle.checked
                );

            }
        );


        themeButton?.addEventListener(
            "click",
            () => {

                clearPresetSelection();


                setDarkMode(
                    !body.classList.contains(
                        "dark"
                    )
                );

            }
        );


        /* =====================================================
           CLEAN MODE
        ====================================================== */

        const cleanToggle =
            $("#cleanToggle");


        function setCleanMode(
            enabled,
            save = true
        ) {

            const value =
                Boolean(
                    enabled
                );


            body.classList.toggle(
                "clean-mode",
                value
            );


            if (
                cleanToggle
            ) {

                cleanToggle.checked =
                    value;

            }


            if (
                save
            ) {

                storage.set(
                    "dream.clean",
                    value
                );

            }

        }


        cleanToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setCleanMode(
                    cleanToggle.checked
                );

            }
        );


        /* =====================================================
           PERFORMANCE MODE
        ====================================================== */

        const performanceToggle =
            $("#performanceToggle");


        function setPerformanceMode(
            enabled,
            save = true
        ) {

            const value =
                Boolean(
                    enabled
                );


            body.classList.toggle(
                "performance-mode",
                value
            );


            if (
                performanceToggle
            ) {

                performanceToggle.checked =
                    value;

            }


            if (
                save
            ) {

                storage.set(
                    "dream.performance",
                    value
                );

            }


            createBackgroundParticles();

        }


        performanceToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setPerformanceMode(
                    performanceToggle.checked
                );

            }
        );


        /* =====================================================
           PALETAS
        ====================================================== */

        const palettes = {

            dream: {

                primary:
                    "#e786b3",

                secondary:
                    "#9c6ce0"

            },


            violet: {

                primary:
                    "#a78bfa",

                secondary:
                    "#7c3aed"

            },


            sky: {

                primary:
                    "#60a5fa",

                secondary:
                    "#38bdf8"

            },


            rose: {

                primary:
                    "#fb7185",

                secondary:
                    "#e879f9"

            },


            aurora: {

                primary:
                    "#ff6fae",

                secondary:
                    "#7367f0"

            },


            pearl: {

                primary:
                    "#c67a9e",

                secondary:
                    "#8d82ad"

            }

        };


        function renderPaletteButtons(
            paletteName
        ) {

            $$(
                "[data-palette]"
            ).forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.palette ===
                            paletteName
                    );

                }
            );

        }


        function applyPalette(
            paletteName,
            save = true,
            notify = true
        ) {

            const palette =
                palettes[
                    paletteName
                ];


            if (
                !palette
            ) {

                return;

            }


            delete body.dataset.mood;


            setRootColors(
                palette.primary,
                palette.secondary
            );


            renderPaletteButtons(
                paletteName
            );


            const primaryInput =
                $("#primaryColor");


            const secondaryInput =
                $("#secondaryColor");


            if (
                primaryInput
            ) {

                primaryInput.value =
                    palette.primary;

            }


            if (
                secondaryInput
            ) {

                secondaryInput.value =
                    palette.secondary;

            }


            if (
                save
            ) {

                clearPresetSelection(
                    false
                );


                storage.set(
                    "dream.palette",
                    paletteName
                );


                storage.remove(
                    "dream.customColors"
                );

            }


            if (
                notify
            ) {

                showToast(
                    state.currentLanguage ===
                        "en-US"
                        ? "Color palette applied ✦"
                        : "Paleta aplicada ✦"
                );

            }

        }


        document.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-palette]"
                    );


                if (
                    !button
                ) {

                    return;

                }


                applyPalette(
                    button.dataset.palette
                );

            }
        );


        /* =====================================================
           CORES PERSONALIZADAS
        ====================================================== */

        const primaryColor =
            $("#primaryColor");


        const secondaryColor =
            $("#secondaryColor");


        function applyCustomColors(
            primary,
            secondary,
            save = true
        ) {

            if (
                !primary ||
                !secondary
            ) {

                return;

            }


            delete body.dataset.mood;


            setRootColors(
                primary,
                secondary
            );


            $$(
                "[data-palette]"
            ).forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );

                }
            );


            if (
                primaryColor
            ) {

                primaryColor.value =
                    primary;

            }


            if (
                secondaryColor
            ) {

                secondaryColor.value =
                    secondary;

            }


            if (
                save
            ) {

                clearPresetSelection(
                    false
                );


                storage.set(
                    "dream.customColors",
                    {

                        primary,

                        secondary

                    }
                );


                storage.remove(
                    "dream.palette"
                );

            }

        }


        primaryColor?.addEventListener(
            "input",
            () => {

                applyCustomColors(
                    primaryColor.value,
                    secondaryColor?.value ||
                        "#9c6ce0"
                );

            }
        );


        secondaryColor?.addEventListener(
            "input",
            () => {

                applyCustomColors(
                    primaryColor?.value ||
                        "#e786b3",
                    secondaryColor.value
                );

            }
        );


        /* =====================================================
           PARTÍCULAS
        ====================================================== */

        const particlesToggle =
            $("#particlesToggle");


        function setParticles(
            enabled,
            save = true
        ) {

            state.particles =
                Boolean(
                    enabled
                );


            body.classList.toggle(
                "no-particles",
                !state.particles
            );


            if (
                particlesToggle
            ) {

                particlesToggle.checked =
                    state.particles;

            }


            if (
                save
            ) {

                storage.set(
                    "dream.particles",
                    state.particles
                );

            }


            createBackgroundParticles();

        }


        particlesToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setParticles(
                    particlesToggle.checked
                );

            }
        );


        /* =====================================================
           ANIMAÇÕES
        ====================================================== */

        const animationsToggle =
            $("#animationsToggle");


        function setAnimations(
            enabled,
            save = true
        ) {

            state.animations =
                Boolean(
                    enabled
                );


            body.classList.toggle(
                "no-animations",
                !state.animations
            );


            if (
                animationsToggle
            ) {

                animationsToggle.checked =
                    state.animations;

            }


            if (
                save
            ) {

                storage.set(
                    "dream.animations",
                    state.animations
                );

            }

        }


        animationsToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setAnimations(
                    animationsToggle.checked
                );

            }
        );


        /* =====================================================
           CURSOR GLOW
        ====================================================== */

        const cursorGlowToggle =
            $("#cursorGlowToggle");


        function setCursorGlow(
            enabled,
            save = true
        ) {

            state.cursorGlow =
                Boolean(
                    enabled
                );


            body.classList.toggle(
                "no-cursor-glow",
                !state.cursorGlow
            );


            if (
                cursorGlowToggle
            ) {

                cursorGlowToggle.checked =
                    state.cursorGlow;

            }


            if (
                state.cursorGlow
            ) {

                startCursorGlow();

            }

            else {

                stopCursorGlow();

            }


            if (
                save
            ) {

                storage.set(
                    "dream.cursorGlow",
                    state.cursorGlow
                );

            }

        }


        cursorGlowToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setCursorGlow(
                    cursorGlowToggle.checked
                );

            }
        );


        /* =====================================================
           MOVIMENTO 3D
        ====================================================== */

        const motionToggle =
            $("#motionToggle");


        function setMotion(
            enabled,
            save = true
        ) {

            state.motion =
                Boolean(
                    enabled
                );


            body.classList.toggle(
                "no-motion",
                !state.motion
            );


            if (
                motionToggle
            ) {

                motionToggle.checked =
                    state.motion;

            }


            if (
                !state.motion
            ) {

                targetTiltX =
                    0;


                targetTiltY =
                    0;


                currentTiltX =
                    0;


                currentTiltY =
                    0;


                if (
                    productTilt
                ) {

                    productTilt.style.transform =
                        "";

                }


                tiltCards.forEach(
                    resetCardTilt
                );

            }


            if (
                save
            ) {

                storage.set(
                    "dream.motion",
                    state.motion
                );

            }

        }


        motionToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setMotion(
                    motionToggle.checked
                );

            }
        );


        /* =====================================================
           SOM DO SPRAY
        ====================================================== */

        const spraySoundToggle =
            $("#spraySoundToggle");


        function setSpraySound(
            enabled,
            save = true
        ) {

            state.spraySound =
                Boolean(
                    enabled
                );


            if (
                spraySoundToggle
            ) {

                spraySoundToggle.checked =
                    state.spraySound;

            }


            if (
                save
            ) {

                storage.set(
                    "dream.spraySound",
                    state.spraySound
                );

            }

        }


        spraySoundToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setSpraySound(
                    spraySoundToggle.checked
                );

            }
        );


        /* =====================================================
           VIBRAÇÃO
        ====================================================== */

        const hapticToggle =
            $("#hapticToggle");


        function setHaptic(
            enabled,
            save = true
        ) {

            state.haptic =
                Boolean(
                    enabled
                );


            if (
                hapticToggle
            ) {

                hapticToggle.checked =
                    state.haptic;

            }


            if (
                save
            ) {

                storage.set(
                    "dream.haptic",
                    state.haptic
                );

            }

        }


        hapticToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setHaptic(
                    hapticToggle.checked
                );

            }
        );


        /* =====================================================
           INTENSIDADE 3D
        ====================================================== */

        const motionRange =
            $("#motionRange");


        const motionValue =
            $("#motionValue");


        function setMotionIntensity(
            value,
            save = true
        ) {

            state.motionIntensity =
                clamp(
                    Number(
                        value
                    ) ||
                    0,
                    0,
                    10
                );


            if (
                motionRange
            ) {

                motionRange.value =
                    String(
                        state.motionIntensity
                    );

            }


            if (
                motionValue
            ) {

                motionValue.textContent =
                    String(
                        state.motionIntensity
                    );

            }


            if (
                save
            ) {

                storage.set(
                    "dream.motionIntensity",
                    state.motionIntensity
                );

            }

        }


        motionRange?.addEventListener(
            "input",
            () => {

                clearPresetSelection();


                setMotionIntensity(
                    motionRange.value
                );

            }
        );


        /* =====================================================
           INTENSIDADE DAS PARTÍCULAS
        ====================================================== */

        const particleRange =
            $("#particleRange");


        const particleValue =
            $("#particleValue");


        let particleUpdateTimer =
            null;


        function setParticleIntensity(
            value,
            save = true
        ) {

            state.particleIntensity =
                clamp(
                    Number(
                        value
                    ) ||
                    1,
                    1,
                    10
                );


            if (
                particleRange
            ) {

                particleRange.value =
                    String(
                        state.particleIntensity
                    );

            }


            if (
                particleValue
            ) {

                particleValue.textContent =
                    String(
                        state.particleIntensity
                    );

            }


            if (
                save
            ) {

                storage.set(
                    "dream.particleIntensity",
                    state.particleIntensity
                );

            }


            window.clearTimeout(
                particleUpdateTimer
            );


            particleUpdateTimer =
                window.setTimeout(
                    createBackgroundParticles,
                    80
                );

        }


        particleRange?.addEventListener(
            "input",
            () => {

                clearPresetSelection();


                setParticleIntensity(
                    particleRange.value
                );

            }
        );


        /* =====================================================
           INTENSIDADE DO BORRIFADOR
        ====================================================== */

        const sprayIntensityRange =
            $("#sprayIntensityRange");


        const sprayIntensityValue =
            $("#sprayIntensityValue");


        function setSprayIntensity(
            value,
            save = true
        ) {

            state.sprayIntensity =
                clamp(
                    Number(
                        value
                    ) ||
                    1,
                    1,
                    10
                );


            if (
                sprayIntensityRange
            ) {

                sprayIntensityRange.value =
                    String(
                        state.sprayIntensity
                    );

            }


            if (
                sprayIntensityValue
            ) {

                sprayIntensityValue.textContent =
                    String(
                        state.sprayIntensity
                    );

            }


            if (
                save
            ) {

                storage.set(
                    "dream.sprayIntensity",
                    state.sprayIntensity
                );

            }

        }


        sprayIntensityRange?.addEventListener(
            "input",
            () => {

                clearPresetSelection();


                setSprayIntensity(
                    sprayIntensityRange.value
                );

            }
        );


        /* =====================================================
           DREAM STUDIO • CONTROLES AVANÇADOS
        ====================================================== */

        const glassToggle =
            $("#glassToggle");


        const compactToggle =
            $("#compactToggle");


        const contrastToggle =
            $("#contrastToggle");


        const ambientGlowToggle =
            $("#ambientGlowToggle");


        const glowRange =
            $("#glowRange");


        const glowValue =
            $("#glowValue");


        const blurRange =
            $("#blurRange");


        const blurValue =
            $("#blurValue");


        const sprayExplosionRange =
            $("#sprayExplosionRange");


        const sprayExplosionValue =
            $("#sprayExplosionValue");


        const galleryStudioToggle =
            $("#galleryStudioToggle");


        function setGlass(
            enabled,
            save = true
        ) {

            state.glass =
                Boolean(
                    enabled
                );


            body.classList.toggle(
                "no-glass",
                !state.glass
            );


            if (
                glassToggle
            ) {

                glassToggle.checked =
                    state.glass;

            }


            if (
                save
            ) {

                storage.set(
                    "dream.glass",
                    state.glass
                );

            }

        }


        function setCompact(
            enabled,
            save = true
        ) {

            state.compact =
                Boolean(
                    enabled
                );


            body.classList.toggle(
                "compact-ui",
                state.compact
            );


            if (
                compactToggle
            ) {

                compactToggle.checked =
                    state.compact;

            }


            if (
                save
            ) {

                storage.set(
                    "dream.compact",
                    state.compact
                );

            }

        }


        function setContrast(
            enabled,
            save = true
        ) {

            state.contrast =
                Boolean(
                    enabled
                );


            body.classList.toggle(
                "high-contrast",
                state.contrast
            );


            if (
                contrastToggle
            ) {

                contrastToggle.checked =
                    state.contrast;

            }


            if (
                save
            ) {

                storage.set(
                    "dream.contrast",
                    state.contrast
                );

            }

        }


        function setAmbientGlow(
            enabled,
            save = true
        ) {

            state.ambientGlow =
                Boolean(
                    enabled
                );


            body.classList.toggle(
                "no-ambient-glow",
                !state.ambientGlow
            );


            if (
                ambientGlowToggle
            ) {

                ambientGlowToggle.checked =
                    state.ambientGlow;

            }


            if (
                save
            ) {

                storage.set(
                    "dream.ambientGlow",
                    state.ambientGlow
                );

            }

        }


        function setGlowIntensity(
            value,
            save = true
        ) {

            state.glowIntensity =
                clamp(
                    Number(
                        value
                    ) ||
                    0,
                    0,
                    10
                );


            root.style.setProperty(
                "--studio-glow-strength",
                String(
                    0.35 +
                    state.glowIntensity *
                    0.14
                )
            );


            if (
                glowRange
            ) {

                glowRange.value =
                    String(
                        state.glowIntensity
                    );

            }


            if (
                glowValue
            ) {

                glowValue.textContent =
                    String(
                        state.glowIntensity
                    );

            }


            if (
                save
            ) {

                storage.set(
                    "dream.glowIntensity",
                    state.glowIntensity
                );

            }

        }


        function setGlassBlur(
            value,
            save = true
        ) {

            state.glassBlur =
                clamp(
                    Number(
                        value
                    ) ||
                    0,
                    0,
                    28
                );


            root.style.setProperty(
                "--studio-glass-blur",
                `${state.glassBlur}px`
            );


            if (
                blurRange
            ) {

                blurRange.value =
                    String(
                        state.glassBlur
                    );

            }


            if (
                blurValue
            ) {

                blurValue.textContent =
                    String(
                        state.glassBlur
                    );

            }


            if (
                save
            ) {

                storage.set(
                    "dream.glassBlur",
                    state.glassBlur
                );

            }

        }


        function setSprayExplosion(
            value,
            save = true
        ) {

            state.sprayExplosion =
                clamp(
                    Number(
                        value
                    ) ||
                    1,
                    1,
                    10
                );


            root.style.setProperty(
                "--spray-explosion",
                String(
                    state.sprayExplosion
                )
            );


            if (
                sprayExplosionRange
            ) {

                sprayExplosionRange.value =
                    String(
                        state.sprayExplosion
                    );

            }


            if (
                sprayExplosionValue
            ) {

                sprayExplosionValue.textContent =
                    String(
                        state.sprayExplosion
                    );

            }


            if (
                save
            ) {

                storage.set(
                    "dream.sprayExplosion",
                    state.sprayExplosion
                );

            }

        }


        function setGalleryAutoplay(
            enabled,
            save = true
        ) {

            galleryAutoplayEnabled =
                Boolean(
                    enabled
                );


            if (
                galleryStudioToggle
            ) {

                galleryStudioToggle.checked =
                    galleryAutoplayEnabled;

            }


            updateGalleryAutoplayButton();


            if (
                galleryAutoplayEnabled
            ) {

                startGalleryAutoplay();

            }

            else {

                stopGalleryAutoplay();

            }


            if (
                save
            ) {

                storage.set(
                    "dream.galleryAutoplay",
                    galleryAutoplayEnabled
                );

            }

        }


        glassToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setGlass(
                    glassToggle.checked
                );

            }
        );


        compactToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setCompact(
                    compactToggle.checked
                );

            }
        );


        contrastToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setContrast(
                    contrastToggle.checked
                );

            }
        );


        ambientGlowToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setAmbientGlow(
                    ambientGlowToggle.checked
                );

            }
        );


        glowRange?.addEventListener(
            "input",
            () => {

                clearPresetSelection();


                setGlowIntensity(
                    glowRange.value
                );

            }
        );


        blurRange?.addEventListener(
            "input",
            () => {

                clearPresetSelection();


                setGlassBlur(
                    blurRange.value
                );

            }
        );


        sprayExplosionRange?.addEventListener(
            "input",
            () => {

                clearPresetSelection();


                setSprayExplosion(
                    sprayExplosionRange.value
                );

            }
        );


        galleryStudioToggle?.addEventListener(
            "change",
            () => {

                clearPresetSelection();


                setGalleryAutoplay(
                    galleryStudioToggle.checked
                );

            }
        );


        /* =====================================================
           TAMANHO DA FONTE
        ====================================================== */

        const fontSizes = [
            "small",
            "normal",
            "large"
        ];


        function renderFontSizeButtons(
            size
        ) {

            $$(
                "[data-font-size]"
            ).forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.fontSize ===
                            size
                    );

                }
            );

        }


        function setFontSize(
            size,
            save = true
        ) {

            const finalSize =
                fontSizes.includes(
                    size
                )
                    ? size
                    : "normal";


            fontSizes.forEach(
                item => {

                    body.classList.remove(
                        `font-${item}`
                    );

                }
            );


            body.classList.add(
                `font-${finalSize}`
            );


            renderFontSizeButtons(
                finalSize
            );


            if (
                save
            ) {

                storage.set(
                    "dream.fontSize",
                    finalSize
                );

            }

        }


        document.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-font-size]"
                    );


                if (
                    !button
                ) {

                    return;

                }


                clearPresetSelection();


                setFontSize(
                    button.dataset.fontSize
                );

            }
        );


        /* =====================================================
           PRESETS
        ====================================================== */

        const presets = {

            dream: {

                dark:
                    false,

                clean:
                    false,

                performance:
                    false,

                particles:
                    true,

                animations:
                    true,

                cursor:
                    true,

                motion:
                    true,

                motionIntensity:
                    5,

                particleIntensity:
                    5,

                sprayIntensity:
                    5,

                palette:
                    "dream",

                font:
                    "normal",

                glass:
                    true,

                compact:
                    false,

                contrast:
                    false,

                ambientGlow:
                    true,

                glowIntensity:
                    6,

                glassBlur:
                    14,

                sprayExplosion:
                    7,

                galleryAutoplay:
                    true

            },


            cinematic: {

                dark:
                    true,

                clean:
                    false,

                performance:
                    false,

                particles:
                    true,

                animations:
                    true,

                cursor:
                    true,

                motion:
                    true,

                motionIntensity:
                    9,

                particleIntensity:
                    7,

                sprayIntensity:
                    8,

                palette:
                    "violet",

                font:
                    "large",

                glass:
                    true,

                compact:
                    false,

                contrast:
                    true,

                ambientGlow:
                    true,

                glowIntensity:
                    10,

                glassBlur:
                    20,

                sprayExplosion:
                    10,

                galleryAutoplay:
                    true

            },


            soft: {

                dark:
                    false,

                clean:
                    false,

                performance:
                    false,

                particles:
                    true,

                animations:
                    true,

                cursor:
                    false,

                motion:
                    true,

                motionIntensity:
                    2,

                particleIntensity:
                    2,

                sprayIntensity:
                    3,

                palette:
                    "pearl",

                font:
                    "normal",

                glass:
                    true,

                compact:
                    false,

                contrast:
                    false,

                ambientGlow:
                    true,

                glowIntensity:
                    4,

                glassBlur:
                    24,

                sprayExplosion:
                    5,

                galleryAutoplay:
                    true

            },


            performance: {

                dark:
                    false,

                clean:
                    true,

                performance:
                    true,

                particles:
                    false,

                animations:
                    false,

                cursor:
                    false,

                motion:
                    false,

                motionIntensity:
                    0,

                particleIntensity:
                    1,

                sprayIntensity:
                    2,

                palette:
                    "dream",

                font:
                    "normal",

                glass:
                    false,

                compact:
                    true,

                contrast:
                    false,

                ambientGlow:
                    false,

                glowIntensity:
                    0,

                glassBlur:
                    0,

                sprayExplosion:
                    3,

                galleryAutoplay:
                    false

            },


            aurora: {

                dark:
                    false,

                clean:
                    false,

                performance:
                    false,

                particles:
                    true,

                animations:
                    true,

                cursor:
                    true,

                motion:
                    true,

                motionIntensity:
                    8,

                particleIntensity:
                    9,

                sprayIntensity:
                    9,

                palette:
                    "aurora",

                font:
                    "large",

                glass:
                    true,

                compact:
                    false,

                contrast:
                    false,

                ambientGlow:
                    true,

                glowIntensity:
                    10,

                glassBlur:
                    18,

                sprayExplosion:
                    10,

                galleryAutoplay:
                    true

            },


            minimal: {

                dark:
                    false,

                clean:
                    true,

                performance:
                    false,

                particles:
                    false,

                animations:
                    true,

                cursor:
                    false,

                motion:
                    false,

                motionIntensity:
                    0,

                particleIntensity:
                    1,

                sprayIntensity:
                    2,

                palette:
                    "pearl",

                font:
                    "small",

                glass:
                    false,

                compact:
                    true,

                contrast:
                    true,

                ambientGlow:
                    false,

                glowIntensity:
                    0,

                glassBlur:
                    0,

                sprayExplosion:
                    4,

                galleryAutoplay:
                    false

            }

        };


        const presetStatus =
            $("#presetStatus");


        const presetMeta = {

            dream: {

                pt:
                    "Dream • equilíbrio entre efeitos, cores e movimento.",

                en:
                    "Dream • balanced effects, colors and motion."

            },


            cinematic: {

                pt:
                    "Cinemático • contraste forte, profundidade e movimento intenso.",

                en:
                    "Cinematic • strong contrast, depth and intense motion."

            },


            soft: {

                pt:
                    "Suave • tons pastel, menos movimento e atmosfera delicada.",

                en:
                    "Soft • pastel tones, gentler motion and a delicate atmosphere."

            },


            performance: {

                pt:
                    "Performance • visual simplificado para máxima fluidez.",

                en:
                    "Performance • simplified visuals for maximum smoothness."

            },


            aurora: {

                pt:
                    "Aurora • cores vivas, brilho e efeitos mais intensos.",

                en:
                    "Aurora • vivid colors, glow and stronger effects."

            },


            minimal: {

                pt:
                    "Minimal • visual editorial, limpo e sem distrações.",

                en:
                    "Minimal • clean editorial visuals with fewer distractions."

            }

        };


        function renderPresetStatus(
            presetName = null
        ) {

            if (
                !presetStatus
            ) {

                return;

            }


            if (
                !presetName ||
                !presetMeta[
                    presetName
                ]
            ) {

                presetStatus.textContent =
                    state.currentLanguage ===
                        "en-US"
                        ? "Custom • your own combination of settings."
                        : "Personalizado • sua combinação de configurações.";


                return;

            }


            presetStatus.textContent =
                state.currentLanguage ===
                    "en-US"
                    ? presetMeta[
                        presetName
                    ].en
                    : presetMeta[
                        presetName
                    ].pt;

        }


        function clearPresetSelection(
            save = true
        ) {

            state.currentPreset =
                null;


            delete body.dataset.presetMode;


            $$(
                "[data-preset]"
            ).forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );


                    button.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                }
            );


            renderPresetStatus(
                null
            );


            if (
                save
            ) {

                storage.remove(
                    "dream.preset"
                );


                storage.set(
                    "dream.customized",
                    true
                );

            }

        }


        function renderPresetButtons(
            presetName
        ) {

            $$(
                "[data-preset]"
            ).forEach(
                button => {

                    const active =
                        button.dataset.preset ===
                        presetName;


                    button.classList.toggle(
                        "active",
                        active
                    );


                    button.setAttribute(
                        "aria-pressed",
                        String(
                            active
                        )
                    );

                }
            );


            renderPresetStatus(
                presetName
            );

        }


        function applyPreset(
            presetName,
            save = true,
            notify = true
        ) {

            const preset =
                presets[
                    presetName
                ];


            if (
                !preset
            ) {

                return;

            }


            state.currentPreset =
                presetName;


            body.dataset.presetMode =
                presetName;


            setDarkMode(
                preset.dark,
                false
            );


            setCleanMode(
                preset.clean,
                false
            );


            setPerformanceMode(
                preset.performance,
                false
            );


            setParticles(
                preset.particles,
                false
            );


            setAnimations(
                preset.animations,
                false
            );


            setCursorGlow(
                preset.cursor,
                false
            );


            setMotion(
                preset.motion,
                false
            );


            setMotionIntensity(
                preset.motionIntensity,
                false
            );


            setParticleIntensity(
                preset.particleIntensity,
                false
            );


            setSprayIntensity(
                preset.sprayIntensity,
                false
            );


            setFontSize(
                preset.font ||
                    "normal",
                false
            );


            setGlass(
                preset.glass,
                false
            );


            setCompact(
                preset.compact,
                false
            );


            setContrast(
                preset.contrast,
                false
            );


            setAmbientGlow(
                preset.ambientGlow,
                false
            );


            setGlowIntensity(
                preset.glowIntensity,
                false
            );


            setGlassBlur(
                preset.glassBlur,
                false
            );


            setSprayExplosion(
                preset.sprayExplosion,
                false
            );


            setGalleryAutoplay(
                preset.galleryAutoplay,
                false
            );


            applyPalette(
                preset.palette,
                false,
                false
            );


            renderPresetButtons(
                presetName
            );


            if (
                save
            ) {

                storage.set(
                    "dream.preset",
                    presetName
                );


                storage.set(
                    "dream.dark",
                    preset.dark
                );


                storage.set(
                    "dream.clean",
                    preset.clean
                );


                storage.set(
                    "dream.performance",
                    preset.performance
                );


                storage.set(
                    "dream.particles",
                    preset.particles
                );


                storage.set(
                    "dream.animations",
                    preset.animations
                );


                storage.set(
                    "dream.cursorGlow",
                    preset.cursor
                );


                storage.set(
                    "dream.motion",
                    preset.motion
                );


                storage.set(
                    "dream.motionIntensity",
                    preset.motionIntensity
                );


                storage.set(
                    "dream.particleIntensity",
                    preset.particleIntensity
                );


                storage.set(
                    "dream.sprayIntensity",
                    preset.sprayIntensity
                );


                storage.set(
                    "dream.fontSize",
                    preset.font ||
                        "normal"
                );


                storage.set(
                    "dream.glass",
                    preset.glass
                );


                storage.set(
                    "dream.compact",
                    preset.compact
                );


                storage.set(
                    "dream.contrast",
                    preset.contrast
                );


                storage.set(
                    "dream.ambientGlow",
                    preset.ambientGlow
                );


                storage.set(
                    "dream.glowIntensity",
                    preset.glowIntensity
                );


                storage.set(
                    "dream.glassBlur",
                    preset.glassBlur
                );


                storage.set(
                    "dream.sprayExplosion",
                    preset.sprayExplosion
                );


                storage.set(
                    "dream.galleryAutoplay",
                    preset.galleryAutoplay
                );


                storage.set(
                    "dream.palette",
                    preset.palette
                );


                storage.remove(
                    "dream.customColors"
                );


                storage.remove(
                    "dream.mood"
                );


                storage.remove(
                    "dream.customized"
                );

            }


            if (
                notify
            ) {

                const displayName =
                    $(
                        `[data-preset="${presetName}"] .preset-copy strong`
                    )
                        ?.textContent
                        ?.trim() ||
                    presetName;


                showToast(
                    state.currentLanguage ===
                        "en-US"
                        ? `${displayName} preset applied ✦`
                        : `Preset ${displayName} aplicado ✦`
                );

            }

        }


        document.addEventListener(
            "click",
            event => {

                const presetButton =
                    event.target.closest(
                        "[data-preset]"
                    );


                if (
                    !presetButton
                ) {

                    return;

                }


                applyPreset(
                    presetButton.dataset.preset
                );

            }
        );


        /* =====================================================
           CARREGAR CONFIGURAÇÕES
        ====================================================== */

        function loadSavedSettings() {

            const savedDark =
                storage.get(
                    "dream.dark",
                    false
                );


            const savedClean =
                storage.get(
                    "dream.clean",
                    false
                );


            const savedPerformance =
                storage.get(
                    "dream.performance",
                    false
                );


            const savedFont =
                storage.get(
                    "dream.fontSize",
                    "normal"
                );


            const savedPalette =
                storage.get(
                    "dream.palette",
                    null
                );


            const customColors =
                storage.get(
                    "dream.customColors",
                    null
                );


            const savedPreset =
                storage.get(
                    "dream.preset",
                    null
                );


            const savedCustomized =
                storage.get(
                    "dream.customized",
                    false
                );


            setDarkMode(
                savedDark,
                false
            );


            setCleanMode(
                savedClean,
                false
            );


            setPerformanceMode(
                savedPerformance,
                false
            );


            setParticles(
                state.particles,
                false
            );


            setAnimations(
                state.animations,
                false
            );


            setCursorGlow(
                state.cursorGlow,
                false
            );


            setMotion(
                state.motion,
                false
            );


            setSpraySound(
                state.spraySound,
                false
            );


            setHaptic(
                state.haptic,
                false
            );


            setGlass(
                state.glass,
                false
            );


            setCompact(
                state.compact,
                false
            );


            setContrast(
                state.contrast,
                false
            );


            setAmbientGlow(
                state.ambientGlow,
                false
            );


            setGlowIntensity(
                state.glowIntensity,
                false
            );


            setGlassBlur(
                state.glassBlur,
                false
            );


            setSprayExplosion(
                state.sprayExplosion,
                false
            );


            setGalleryAutoplay(
                galleryAutoplayEnabled,
                false
            );


            setMotionIntensity(
                state.motionIntensity,
                false
            );


            setParticleIntensity(
                state.particleIntensity,
                false
            );


            setSprayIntensity(
                state.sprayIntensity,
                false
            );


            setFontSize(
                savedFont,
                false
            );


            if (
                customColors?.primary &&
                customColors?.secondary
            ) {

                applyCustomColors(
                    customColors.primary,
                    customColors.secondary,
                    false
                );

            }

            else if (
                savedPalette &&
                palettes[
                    savedPalette
                ]
            ) {

                applyPalette(
                    savedPalette,
                    false,
                    false
                );

            }

            else if (
                moods[
                    state.currentMood
                ]
            ) {

                applyMood(
                    state.currentMood,
                    false,
                    false
                );

            }


            if (
                savedPreset &&
                presets[
                    savedPreset
                ]
            ) {

                applyPreset(
                    savedPreset,
                    false,
                    false
                );

            }

            else if (
                savedCustomized
            ) {

                clearPresetSelection(
                    false
                );

            }

            else {

                applyPreset(
                    "dream",
                    false,
                    false
                );

            }

        }


        /* =====================================================
           RESET DREAM STUDIO
        ====================================================== */

        const resetSettingsButton =
            $("#resetSettings");


        const dreamStorageKeys = [

            "dream.dark",

            "dream.clean",

            "dream.performance",

            "dream.palette",

            "dream.customColors",

            "dream.preset",

            "dream.customized",

            "dream.particles",

            "dream.animations",

            "dream.cursorGlow",

            "dream.motion",

            "dream.motionIntensity",

            "dream.particleIntensity",

            "dream.sprayIntensity",

            "dream.spraySound",

            "dream.haptic",

            "dream.glass",

            "dream.compact",

            "dream.contrast",

            "dream.ambientGlow",

            "dream.glowIntensity",

            "dream.glassBlur",

            "dream.sprayExplosion",

            "dream.galleryAutoplay",

            "dream.fontSize",

            "dream.mood"

        ];


        function resetSettings() {

            dreamStorageKeys.forEach(
                key => {

                    storage.remove(
                        key
                    );

                }
            );


            state.particles =
                true;


            state.animations =
                true;


            state.cursorGlow =
                true;


            state.motion =
                true;


            state.motionIntensity =
                5;


            state.particleIntensity =
                5;


            state.sprayIntensity =
                5;


            state.spraySound =
                true;


            state.haptic =
                true;


            state.glass =
                true;


            state.compact =
                false;


            state.contrast =
                false;


            state.ambientGlow =
                true;


            state.glowIntensity =
                6;


            state.glassBlur =
                14;


            state.sprayExplosion =
                7;


            galleryAutoplayEnabled =
                true;


            state.currentMood =
                "romantico";


            setDarkMode(
                false,
                false
            );


            setCleanMode(
                false,
                false
            );


            setPerformanceMode(
                false,
                false
            );


            setParticles(
                true,
                false
            );


            setAnimations(
                true,
                false
            );


            setCursorGlow(
                true,
                false
            );


            setMotion(
                true,
                false
            );


            setMotionIntensity(
                5,
                false
            );


            setParticleIntensity(
                5,
                false
            );


            setSprayIntensity(
                5,
                false
            );


            setSpraySound(
                true,
                false
            );


            setHaptic(
                true,
                false
            );


            setGlass(
                true,
                false
            );


            setCompact(
                false,
                false
            );


            setContrast(
                false,
                false
            );


            setAmbientGlow(
                true,
                false
            );


            setGlowIntensity(
                6,
                false
            );


            setGlassBlur(
                14,
                false
            );


            setSprayExplosion(
                7,
                false
            );


            setGalleryAutoplay(
                true,
                false
            );


            setFontSize(
                "normal",
                false
            );


            applyMood(
                "romantico",
                false,
                false
            );


            renderPaletteButtons(
                "dream"
            );


            state.currentPreset =
                "dream";


            body.dataset.presetMode =
                "dream";


            renderPresetButtons(
                "dream"
            );


            storage.set(
                "dream.preset",
                "dream"
            );


            storage.remove(
                "dream.customized"
            );


            storage.set(
                "dream.mood",
                "romantico"
            );


            storage.set(
                "dream.palette",
                "dream"
            );


            showToast(
                state.currentLanguage ===
                    "en-US"
                    ? "Dream Studio restored ✦"
                    : "Dream Studio restaurado ✦"
            );

        }


        resetSettingsButton?.addEventListener(
            "click",
            resetSettings
        );


        /* =====================================================
           INICIALIZA CONFIGURAÇÕES
        ====================================================== */

        loadSavedSettings();


        /* =====================================================
           DREAM APP • PARTE 3
        ====================================================== */

        window.DreamApp = {

            ...window.DreamApp,


            quizQuestions,


            quizResults,


            startQuizExperience,


            restartQuiz,


            finishQuiz,


            openSettings,


            closeSettings,


            toggleSettings,


            setDarkMode,


            setCleanMode,


            setPerformanceMode,


            palettes,


            applyPalette,


            applyCustomColors,


            setParticles,


            setAnimations,


            setCursorGlow,


            setMotion,


            setSpraySound,


            setHaptic,


            setGlass,


            setCompact,


            setContrast,


            setAmbientGlow,


            setGlowIntensity,


            setGlassBlur,


            setSprayExplosion,


            setGalleryAutoplay,


            setMotionIntensity,


            setParticleIntensity,


            setSprayIntensity,


            setFontSize,


            presets,


            applyPreset,


            clearPresetSelection,


            renderPresetStatus,


            loadSavedSettings,


            resetSettings

        };


        /* =====================================================
           NÃO FECHE O DOMContentLoaded

           A PARTE 4/4 FINAL CONTINUA ABAIXO
        ====================================================== */
                /* =====================================================
           IDIOMA • PT-BR / EN-US
        ====================================================== */

        const languageButtons =
            $$(
                "[data-language]"
            );


        const cloneData = (
            value
        ) =>
            JSON.parse(
                JSON.stringify(
                    value
                )
            );


        const noteDataPT =
            cloneData(
                noteData
            );


        const timelineStagesPT =
            cloneData(
                timelineStages
            );


        const dreamMomentsPT =
            cloneData(
                dreamMoments
            );


        const scenesPT =
            cloneData(
                scenes
            );


        const quizQuestionsPT =
            cloneData(
                quizQuestions
            );


        const quizResultsPT =
            cloneData(
                quizResults
            );


        /* =====================================================
           DADOS EM INGLÊS • NOTAS
        ====================================================== */

        const noteDataEN = {

            bergamota: {

                icon:
                    "🍋",

                title:
                    "Bergamot",

                text:
                    "Fresh, citrusy and luminous. Bergamot creates a vibrant and delicate opening for the fragrance."

            },


            laranja: {

                icon:
                    "🍊",

                title:
                    "Orange",

                text:
                    "A bright and juicy citrus note that adds luminosity and comfort to the opening."

            },


            mandarina: {

                icon:
                    "🍊",

                title:
                    "Mandarin",

                text:
                    "Light and fruity, mandarin reinforces the freshness with a soft and spontaneous sweetness."

            },


            limao: {

                icon:
                    "🍋",

                title:
                    "Lemon",

                text:
                    "Citrusy and energizing, it brings a clean and bright sensation to the first moments."

            },


            cassis: {

                icon:
                    "●",

                title:
                    "Cassis",

                text:
                    "Fruity and slightly intense, cassis adds contrast and personality to the opening."

            },


            maca: {

                icon:
                    "🍎",

                title:
                    "Apple",

                text:
                    "Juicy and delicately sweet, apple brings a youthful and comfortable feeling."

            },


            rosa: {

                icon:
                    "🌹",

                title:
                    "Rose",

                text:
                    "Naturally romantic, rose helps create the delicate floral heart of Dream Love in the Air."

            },


            tilia: {

                icon:
                    "✿",

                title:
                    "Linden Blossom",

                text:
                    "Soft and floral, it contributes to an airy, delicate and comfortable sensation."

            },


            freesia: {

                icon:
                    "❀",

                title:
                    "Freesia",

                text:
                    "A luminous flower that reinforces the fresh, delicate and contemporary personality."

            },


            lotus: {

                icon:
                    "🪷",

                title:
                    "Lotus",

                text:
                    "Transparent and aquatic, lotus brings lightness and serenity to the floral heart."

            },


            gardenia: {

                icon:
                    "✿",

                title:
                    "Gardenia",

                text:
                    "Floral and creamy, gardenia adds elegance and presence while maintaining softness."

            },


            pessego: {

                icon:
                    "🍑",

                title:
                    "Peach",

                text:
                    "Soft and fruity, peach adds a comfortable velvety sweetness to the fragrance."

            },


            ambar: {

                icon:
                    "◆",

                title:
                    "Amber",

                text:
                    "Warm and enveloping, amber adds depth and comfort to the base of the fragrance."

            },


            sandalo: {

                icon:
                    "♢",

                title:
                    "Sandalwood",

                text:
                    "Creamy and woody, sandalwood brings softness, elegance and a cozy base."

            },


            baunilha: {

                icon:
                    "✦",

                title:
                    "Vanilla",

                text:
                    "Sweet and comfortable, vanilla softens the composition and creates an enveloping sensation."

            },


            tonka: {

                icon:
                    "◈",

                title:
                    "Tonka Bean",

                text:
                    "Tonka bean adds sweet depth, warmth and a soft finish to the fragrance."

            },


            musk: {

                icon:
                    "☁",

                title:
                    "Musk",

                text:
                    "Clean, comfortable and soft, musk helps prolong the delicate sensation on the skin."

            }

        };


        /* =====================================================
           TIMELINE EM INGLÊS
        ====================================================== */

        const timelineStagesEN = [

            {

                max:
                    19,

                hour:
                    "Now",

                title:
                    "Start light.",

                text:
                    "The first moments feel luminous, fresh and full of energy."

            },


            {

                max:
                    39,

                hour:
                    "+2h",

                title:
                    "The florals appear.",

                text:
                    "The fragrance begins to reveal a more floral, delicate and romantic heart."

            },


            {

                max:
                    59,

                hour:
                    "+4h",

                title:
                    "Love in the air.",

                text:
                    "The romantic side becomes more noticeable and the feeling turns soft and enveloping."

            },


            {

                max:
                    79,

                hour:
                    "+6h",

                title:
                    "More comforting.",

                text:
                    "The base notes become stronger, creating a softer and deeper experience."

            },


            {

                max:
                    100,

                hour:
                    "Final",

                title:
                    "A Dream memory.",

                text:
                    "What remains is a soft, comfortable and delicately enveloping signature."

            }

        ];


        /* =====================================================
           DREAM MOMENTS EM INGLÊS
        ====================================================== */

        const dreamMomentsEN = [

            {

                title:
                    "Play your favorite song.",

                text:
                    "Choose a song that matches the moment and turn a few ordinary minutes into a small memory."

            },


            {

                title:
                    "Look at the sky for a minute.",

                text:
                    "Sometimes an open window, a quiet moment and the sky are enough to change the feeling of your day."

            },


            {

                title:
                    "Send a special message.",

                text:
                    "Think of someone important and say something you would normally leave for later."

            },


            {

                title:
                    "Do something just for you.",

                text:
                    "A peaceful shower, music, fragrance or a few minutes without rushing can become a Dream moment."

            },


            {

                title:
                    "Save a little memory.",

                text:
                    "A picture, a phrase or a song can turn a simple moment into something worth remembering."

            },


            {

                title:
                    "Put your phone away for a while.",

                text:
                    "Give yourself time to notice the environment, the music, the fragrance and the little details."

            },


            {

                title:
                    "Create your own atmosphere.",

                text:
                    "Lower lights, the right music and a touch of Dream can completely transform a place."

            }

        ];


        /* =====================================================
           DREAM SCENES EM INGLÊS
        ====================================================== */

        const scenesEN = {

            romance: {

                title:
                    "Love is in the air.",

                text:
                    "A delicate, pink and enveloping atmosphere."

            },


            ceu: {

                title:
                    "Dream higher.",

                text:
                    "Blue, light and peaceful like a night spent looking at the sky."

            },


            flores: {

                title:
                    "Flowers everywhere.",

                text:
                    "A soft, floral and romantic scene inspired by the heart of Dream."

            },


            energia: {

                title:
                    "Make the moment happen.",

                text:
                    "Warmer, brighter and more intense for moments when you want to change the energy."

            }

        };


        /* =====================================================
           QUIZ EM INGLÊS
        ====================================================== */

        const quizQuestionsEN = [

            {

                question:
                    "Which atmosphere feels most like you?",

                options: [

                    {

                        label:
                            "A romantic date ♡",

                        mood:
                            "romantico"

                    },


                    {

                        label:
                            "A night looking at the sky ☁",

                        mood:
                            "sonhador"

                    },


                    {

                        label:
                            "A city glowing at night ☾",

                        mood:
                            "noturno"

                    },


                    {

                        label:
                            "A day full of energy ✦",

                        mood:
                            "energia"

                    }

                ]

            },


            {

                question:
                    "What would your perfect moment look like?",

                options: [

                    {

                        label:
                            "Close to someone special",

                        mood:
                            "romantico"

                    },


                    {

                        label:
                            "Listening to music and dreaming",

                        mood:
                            "sonhador"

                    },


                    {

                        label:
                            "Somewhere peaceful",

                        mood:
                            "calmo"

                    },


                    {

                        label:
                            "Doing something spontaneous",

                        mood:
                            "energia"

                    }

                ]

            },


            {

                question:
                    "Which word matches you right now?",

                options: [

                    {

                        label:
                            "Love",

                        mood:
                            "romantico"

                    },


                    {

                        label:
                            "Dream",

                        mood:
                            "sonhador"

                    },


                    {

                        label:
                            "Mystery",

                        mood:
                            "noturno"

                    },


                    {

                        label:
                            "Peace",

                        mood:
                            "calmo"

                    }

                ]

            },


            {

                question:
                    "Choose a symbol to finish.",

                options: [

                    {

                        label:
                            "♡ Heart",

                        mood:
                            "romantico"

                    },


                    {

                        label:
                            "☁ Cloud",

                        mood:
                            "sonhador"

                    },


                    {

                        label:
                            "☾ Moon",

                        mood:
                            "noturno"

                    },


                    {

                        label:
                            "✦ Star",

                        mood:
                            "energia"

                    },


                    {

                        label:
                            "◌ Circle",

                        mood:
                            "calmo"

                    }

                ]

            }

        ];


        const quizResultsEN = {

            romantico: {

                icon:
                    "♡",

                title:
                    "Romantic",

                text:
                    "Your Dream is delicate, enveloping and full of feeling. Special moments and love in the air match your personality."

            },


            sonhador: {

                icon:
                    "☁",

                title:
                    "Dreamy",

                text:
                    "Your Dream is light, imaginative and peaceful. You enjoy moments that let your mind wander."

            },


            noturno: {

                icon:
                    "☾",

                title:
                    "Night",

                text:
                    "Your Dream has a deeper, elegant and mysterious side. Nighttime atmospheres match your personality."

            },


            energia: {

                icon:
                    "✦",

                title:
                    "Energy",

                text:
                    "Your Dream is vibrant, spontaneous and full of movement. You like making the moment happen."

            },


            calmo: {

                icon:
                    "◌",

                title:
                    "Calm",

                text:
                    "Your Dream values peace, comfort and lightness. Simple and serene moments suit you best."

            }

        };


        /* =====================================================
           NOMES DAS NOTAS
        ====================================================== */

        const noteLabelsPT = {

            bergamota:
                "Bergamota",

            laranja:
                "Laranja",

            mandarina:
                "Mandarina",

            limao:
                "Limão",

            cassis:
                "Cassis",

            maca:
                "Maçã",

            rosa:
                "Rosa",

            tilia:
                "Tília",

            freesia:
                "Frésia",

            lotus:
                "Lótus",

            gardenia:
                "Gardênia",

            pessego:
                "Pêssego",

            ambar:
                "Âmbar",

            sandalo:
                "Sândalo",

            baunilha:
                "Baunilha",

            tonka:
                "Tonka",

            musk:
                "Musk"

        };


        const noteLabelsEN = {

            bergamota:
                "Bergamot",

            laranja:
                "Orange",

            mandarina:
                "Mandarin",

            limao:
                "Lemon",

            cassis:
                "Cassis",

            maca:
                "Apple",

            rosa:
                "Rose",

            tilia:
                "Linden",

            freesia:
                "Freesia",

            lotus:
                "Lotus",

            gardenia:
                "Gardenia",

            pessego:
                "Peach",

            ambar:
                "Amber",

            sandalo:
                "Sandalwood",

            baunilha:
                "Vanilla",

            tonka:
                "Tonka",

            musk:
                "Musk"

        };


        /* =====================================================
           HELPERS DE TRADUÇÃO
        ====================================================== */

        function setText(
            selector,
            value
        ) {

            const element =
                $(
                    selector
                );


            if (
                element
            ) {

                element.textContent =
                    value;

            }

        }


        function setAllText(
            selector,
            values
        ) {

            $$(
                selector
            ).forEach(
                (
                    element,
                    index
                ) => {

                    if (
                        values[
                            index
                        ] !==
                        undefined
                    ) {

                        element.textContent =
                            values[
                                index
                            ];

                    }

                }
            );

        }


        function replaceArrayData(
            target,
            source
        ) {

            target.splice(
                0,
                target.length,
                ...cloneData(
                    source
                )
            );

        }


        function replaceObjectData(
            target,
            source
        ) {

            Object.keys(
                target
            ).forEach(
                key => {

                    if (
                        source[
                            key
                        ]
                    ) {

                        Object.assign(
                            target[
                                key
                            ],
                            cloneData(
                                source[
                                    key
                                ]
                            )
                        );

                    }

                }
            );

        }


        function setHeadingParts(
            element,
            first,
            emphasis,
            last = ""
        ) {

            if (
                !element
            ) {

                return;

            }


            const em =
                $(
                    "em",
                    element
                ) ||
                document.createElement(
                    "em"
                );


            em.textContent =
                emphasis;


            element.replaceChildren();


            element.append(
                document.createTextNode(
                    first
                )
            );


            element.appendChild(
                em
            );


            if (
                last
            ) {

                element.append(
                    document.createTextNode(
                        last
                    )
                );

            }

        }


        function setHeroEyebrow(
            text
        ) {

            const element =
                $(".hero .eyebrow");


            if (
                !element
            ) {

                return;

            }


            const dot =
                $(
                    ".eyebrow-dot",
                    element
                );


            element.replaceChildren();


            if (
                dot
            ) {

                element.appendChild(
                    dot
                );


                element.append(
                    document.createTextNode(
                        ` ${text}`
                    )
                );

            }

            else {

                element.textContent =
                    text;

            }

        }


        function setHeroScrollText(
            text
        ) {

            const element =
                $(".hero-scroll");


            if (
                !element
            ) {

                return;

            }


            const dot =
                $(
                    "span",
                    element
                );


            element.replaceChildren();


            if (
                dot
            ) {

                element.appendChild(
                    dot
                );

            }


            element.append(
                document.createTextNode(
                    ` ${text}`
                )
            );

        }


        function setButtonWithSymbol(
            element,
            text
        ) {

            if (
                !element
            ) {

                return;

            }


            const symbol =
                $(
                    "span",
                    element
                );


            element.replaceChildren();


            element.append(
                document.createTextNode(
                    `${text} `
                )
            );


            if (
                symbol
            ) {

                element.appendChild(
                    symbol
                );

            }

        }


        function setMoodButtonText(
            button,
            text
        ) {

            if (
                !button
            ) {

                return;

            }


            const icon =
                $(
                    "span",
                    button
                );


            button.replaceChildren();


            if (
                icon
            ) {

                button.appendChild(
                    icon
                );

            }


            button.append(
                document.createTextNode(
                    text
                )
            );

        }


        /* =====================================================
           TRADUÇÃO DO CONTEÚDO DINÂMICO
        ====================================================== */

        function setDynamicLanguage(
            language
        ) {

            const english =
                language ===
                    "en-US";


            replaceObjectData(
                noteData,
                english
                    ? noteDataEN
                    : noteDataPT
            );


            replaceArrayData(
                timelineStages,
                english
                    ? timelineStagesEN
                    : timelineStagesPT
            );


            replaceArrayData(
                dreamMoments,
                english
                    ? dreamMomentsEN
                    : dreamMomentsPT
            );


            replaceArrayData(
                quizQuestions,
                english
                    ? quizQuestionsEN
                    : quizQuestionsPT
            );


            replaceObjectData(
                quizResults,
                english
                    ? quizResultsEN
                    : quizResultsPT
            );


            Object.keys(
                scenes
            ).forEach(
                key => {

                    const source =
                        english
                            ? scenesEN[
                                key
                            ]
                            : scenesPT[
                                key
                            ];


                    if (
                        source
                    ) {

                        scenes[
                            key
                        ].title =
                            source.title;


                        scenes[
                            key
                        ].text =
                            source.text;

                    }

                }
            );


            moods.romantico.name =
                english
                    ? "Romantic"
                    : "Romântico";


            moods.sonhador.name =
                english
                    ? "Dreamy"
                    : "Sonhador";


            moods.noturno.name =
                english
                    ? "Night"
                    : "Noturno";


            moods.energia.name =
                english
                    ? "Energy"
                    : "Energia";


            moods.calmo.name =
                english
                    ? "Calm"
                    : "Calmo";


            const labels =
                english
                    ? noteLabelsEN
                    : noteLabelsPT;


            $$(
                "[data-note]"
            ).forEach(
                button => {

                    const key =
                        button.dataset.note;


                    if (
                        labels[
                            key
                        ]
                    ) {

                        button.textContent =
                            labels[
                                key
                            ];

                    }

                }
            );


            if (
                activeNoteKey &&
                noteModal?.classList.contains(
                    "open"
                )
            ) {

                const note =
                    noteData[
                        activeNoteKey
                    ];


                if (
                    note
                ) {

                    if (
                        noteModalIcon
                    ) {

                        noteModalIcon.textContent =
                            note.icon;

                    }


                    if (
                        noteModalTitle
                    ) {

                        noteModalTitle.textContent =
                            note.title;

                    }


                    if (
                        noteModalText
                    ) {

                        noteModalText.textContent =
                            note.text;

                    }

                }

            }


            updateTimeline();


            const activeScene =
                $(
                    "[data-scene].active"
                )
                    ?.dataset
                    .scene ||
                "romance";


            applyScene(
                activeScene
            );


            if (
                quizQuestionsBox &&
                !quizQuestionsBox.hidden
            ) {

                renderQuizQuestion();

            }


            if (
                quizResult &&
                !quizResult.hidden
            ) {

                const result =
                    quizResults[
                        quizFinalMood
                    ];


                if (
                    result
                ) {

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
                            result.title;

                    }


                    if (
                        quizResultText
                    ) {

                        quizResultText.textContent =
                            result.text;

                    }

                }

            }

        }


        /* =====================================================
           TRADUÇÃO DA INTERFACE
        ====================================================== */

        function translateInterface(
            language
        ) {

            const english =
                language ===
                    "en-US";


            document.documentElement.lang =
                english
                    ? "en"
                    : "pt-BR";


            document.title =
                english
                    ? "Dream Love in the Air • 350 ml"
                    : "Dream Amor no Ar • 350 ml";


            /* HEADER */

            setText(
                ".brand-sub",
                english
                    ? "Love in the Air"
                    : "Amor no Ar"
            );


            const navTranslation =
                english
                    ? {

                        "#inicio":
                            "Home",

                        "#produto":
                            "Product",

                        "#notas":
                            "Notes",

                        "#experiencia":
                            "Experience",

                        "#momentos":
                            "Moments",

                        "#galeria":
                            "Gallery",

                        "#quiz":
                            "Quiz"

                    }
                    : {

                        "#inicio":
                            "Início",

                        "#produto":
                            "Produto",

                        "#notas":
                            "Notas",

                        "#experiencia":
                            "Experiência",

                        "#momentos":
                            "Momentos",

                        "#galeria":
                            "Galeria",

                        "#quiz":
                            "Quiz"

                    };


            navLinks.forEach(
                link => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        navTranslation[
                            href
                        ]
                    ) {

                        link.textContent =
                            navTranslation[
                                href
                            ];

                    }

                }
            );


            setText(
                ".header .pill-btn",
                english
                    ? "Discover"
                    : "Conhecer"
            );


            /* HERO */

            setHeroEyebrow(
                "O BOTICÁRIO • DREAM"
            );


            const heroHeading =
                $(".hero h1");


            if (
                heroHeading
            ) {

                const loveSpan =
                    $(
                        "span",
                        heroHeading
                    );


                heroHeading.replaceChildren();


                heroHeading.append(
                    document.createTextNode(
                        english
                            ? "A touch of "
                            : "Um toque de "
                    )
                );


                if (
                    loveSpan
                ) {

                    loveSpan.textContent =
                        english
                            ? "love"
                            : "amor";


                    heroHeading.appendChild(
                        loveSpan
                    );

                }


                heroHeading.append(
                    document.createTextNode(
                        english
                            ? " in the air."
                            : " no ar."
                    )
                );

            }


            setText(
                ".hero-description",
                english
                    ? "An experience inspired by Dream Love in the Air: delicate, romantic and floral, made to turn simple moments into special memories."
                    : "Uma experiência inspirada em Dream Amor no Ar: delicada, romântica, floral e feita para transformar momentos simples em lembranças especiais."
            );


            setButtonWithSymbol(
                $(".hero-buttons .primary-btn"),
                english
                    ? "Discover Dream"
                    : "Descobrir o Dream"
            );


            setText(
                ".hero-buttons .secondary-btn",
                english
                    ? "View product"
                    : "Ver produto"
            );


            setAllText(
                ".hero-facts div > span",
                english
                    ? [
                        "Body Splash",
                        "Woody Floral",
                        "Love in the Air"
                    ]
                    : [
                        "Body Splash",
                        "Amadeirado",
                        "Amor no Ar"
                    ]
            );


            setHeroScrollText(
                english
                    ? "scroll to explore"
                    : "role para explorar"
            );


            setText(
                ".spray-button-copy strong",
                english
                    ? "Spray"
                    : "Borrifar"
            );


            setText(
                ".spray-button-copy small",
                english
                    ? "try it"
                    : "experimentar"
            );


            setText(
                ".spray-counter-card > span",
                english
                    ? "SPRAYS"
                    : "BORRIFADAS"
            );


            /* PRODUTO */

            setText(
                ".product-copy .section-eyebrow",
                "DREAM COLLECTION"
            );


            setHeadingParts(
                $(".product-copy h2"),
                english
                    ? "A touch of "
                    : "Um toque de ",
                english
                    ? "love"
                    : "amor",
                english
                    ? " in your routine."
                    : " na sua rotina."
            );


            setText(
                ".product-copy > p",
                english
                    ? "Dream Love in the Air combines delicacy, romance and personality in a light and enveloping experience."
                    : "Dream Amor no Ar combina delicadeza, romantismo e personalidade em uma experiência leve e envolvente."
            );


            setAllText(
                ".product-point h3",
                english
                    ? [
                        "Delicate floral",
                        "Comfortable feeling",
                        "350 ml bottle"
                    ]
                    : [
                        "Floral delicado",
                        "Sensação confortável",
                        "Frasco de 350 ml"
                    ]
            );


            setAllText(
                ".product-point p",
                english
                    ? [
                        "A light, elegant and romantic signature.",
                        "A soft presence for different moments.",
                        "A Dream to accompany your routine."
                    ]
                    : [
                        "Uma assinatura leve, elegante e romântica.",
                        "Uma presença suave para diferentes momentos.",
                        "Um Dream para acompanhar sua rotina."
                    ]
            );


            setText(
                ".product-actions .primary-btn",
                english
                    ? "View details"
                    : "Ver detalhes"
            );


            /* CAMPANHA */

            setHeadingParts(
                $(".campaign-copy h2"),
                english
                    ? "Love is "
                    : "O amor está ",
                english
                    ? "in the details."
                    : "nos detalhes."
            );


            setText(
                ".campaign-copy p",
                english
                    ? "A romantic, sophisticated atmosphere full of personality, inviting you into the Dream universe."
                    : "Uma atmosfera romântica, sofisticada e cheia de personalidade para você entrar no universo Dream."
            );


            setText(
                ".campaign-actions .primary-btn",
                english
                    ? "Explore the Dream universe"
                    : "Explorar universo Dream"
            );


            setText(
                ".campaign-actions .secondary-btn",
                english
                    ? "Discover product"
                    : "Conhecer produto"
            );


            /* NOTAS */

            setHeadingParts(
                $(".notes-section .section-heading h2"),
                english
                    ? "Discover every "
                    : "Descubra cada ",
                english
                    ? "detail."
                    : "detalhe."
            );


            setText(
                ".notes-section .section-heading > p",
                english
                    ? "Tap each note to discover more about the personality of Dream Love in the Air."
                    : "Toque em cada nota para conhecer um pouco mais da personalidade de Dream Amor no Ar."
            );


            setAllText(
                ".note-column-head h3",
                english
                    ? [
                        "Top notes",
                        "Heart notes",
                        "Base notes"
                    ]
                    : [
                        "Notas de saída",
                        "Notas de corpo",
                        "Notas de fundo"
                    ]
            );


            /* EXPERIÊNCIA */

            setHeadingParts(
                $(".experience-heading h2"),
                english
                    ? "One fragrance, "
                    : "Uma fragrância, ",
                english
                    ? "many moments."
                    : "vários momentos."
            );


            setText(
                ".experience-heading > p",
                english
                    ? "Explore how Dream Love in the Air can accompany different atmospheres throughout the day."
                    : "Explore como Dream Amor no Ar pode acompanhar diferentes atmosferas ao longo do dia."
            );


            setText(
                ".mood-picker-card h3",
                english
                    ? "What's your mood right now?"
                    : "Qual é o seu clima agora?"
            );


            setText(
                ".mood-picker-card > p",
                english
                    ? "Choose an atmosphere and watch the site change with you."
                    : "Escolha uma atmosfera e veja o site mudar com você."
            );


            const moodNames =
                english
                    ? {

                        romantico:
                            "Romantic",

                        sonhador:
                            "Dreamy",

                        noturno:
                            "Night",

                        energia:
                            "Energy",

                        calmo:
                            "Calm"

                    }
                    : {

                        romantico:
                            "Romântico",

                        sonhador:
                            "Sonhador",

                        noturno:
                            "Noturno",

                        energia:
                            "Energia",

                        calmo:
                            "Calmo"

                    };


            $$(".mood-button").forEach(
                button => {

                    setMoodButtonText(
                        button,
                        moodNames[
                            button.dataset.mood
                        ]
                    );

                }
            );


            setText(
                ".mood-hint",
                english
                    ? "Your choice also changes the colors in Dream Studio."
                    : "Sua escolha também altera as cores do Dream Studio."
            );


            /* DREAM MOMENT */

            if (
                currentDreamMoment >=
                    0 &&
                dreamMoments[
                    currentDreamMoment
                ]
            ) {

                if (
                    dreamMomentTitle
                ) {

                    dreamMomentTitle.textContent =
                        dreamMoments[
                            currentDreamMoment
                        ].title;

                }


                if (
                    dreamMomentText
                ) {

                    dreamMomentText.textContent =
                        dreamMoments[
                            currentDreamMoment
                        ].text;

                }

            }

            else {

                if (
                    dreamMomentTitle
                ) {

                    dreamMomentTitle.textContent =
                        english
                            ? "Your moment starts here."
                            : "Seu momento começa aqui.";

                }


                if (
                    dreamMomentText
                ) {

                    dreamMomentText.textContent =
                        english
                            ? "Tap the button and discover a small inspiration to make your day feel a little more Dream."
                            : "Toque no botão e descubra uma pequena inspiração para deixar seu dia mais Dream.";

                }

            }


            setText(
                "#newDreamMoment",
                english
                    ? "New moment ✦"
                    : "Novo momento ✦"
            );


            /* GALERIA */

            setHeadingParts(
                $(".gallery-header h2"),
                english
                    ? "Enter the "
                    : "Entre no universo ",
                english
                    ? "Dream universe."
                    : "Dream."
            );


            setText(
                ".gallery-header p",
                english
                    ? "Drag with your mouse, swipe on mobile or use the arrows to explore the images."
                    : "Arraste com o mouse, deslize no celular ou use as setas para explorar as imagens."
            );


            $$(".gallery-open").forEach(
                button => {

                    button.textContent =
                        english
                            ? "explore ↗"
                            : "explorar ↗";

                }
            );


            /* MOOD SHOWCASE */

            setHeadingParts(
                $(".mood-section .section-heading h2"),
                english
                    ? "Change the mood. "
                    : "Mude o clima. ",
                english
                    ? "Change the Dream."
                    : "Mude o Dream."
            );


            setText(
                ".mood-section .section-heading > p",
                english
                    ? "Each atmosphere transforms the colors and visual personality of the experience."
                    : "Cada atmosfera transforma as cores e a personalidade visual da experiência."
            );


            setAllText(
                ".mood-showcase-card strong",
                english
                    ? [
                        "Romantic",
                        "Dreamy",
                        "Night",
                        "Energy",
                        "Calm"
                    ]
                    : [
                        "Romântico",
                        "Sonhador",
                        "Noturno",
                        "Energia",
                        "Calmo"
                    ]
            );


            setAllText(
                ".mood-showcase-card p",
                english
                    ? [
                        "Pink, delicate and enveloping.",
                        "Light, blue and almost limitless.",
                        "Deep, mysterious and elegant.",
                        "Vibrant, warm and full of life.",
                        "Soft, peaceful and comfortable."
                    ]
                    : [
                        "Rosa, delicado e envolvente.",
                        "Leve, azul e quase sem limites.",
                        "Profundo, misterioso e elegante.",
                        "Vibrante, quente e cheio de vida.",
                        "Suave, tranquilo e confortável."
                    ]
            );


            /* QUIZ */

            setHeadingParts(
                $(".quiz-start h2"),
                english
                    ? "Which Dream "
                    : "Qual Dream ",
                english
                    ? "matches you?"
                    : "combina com você?"
            );


            setText(
                ".quiz-start p",
                english
                    ? "Answer a few quick questions and discover which atmosphere best represents your moment."
                    : "Responda algumas perguntas rápidas e descubra qual atmosfera representa melhor o seu momento."
            );


            setButtonWithSymbol(
                startQuiz,
                english
                    ? "Start quiz"
                    : "Começar quiz"
            );


            setText(
                "#applyQuizMood",
                english
                    ? "Apply my mood"
                    : "Aplicar meu mood"
            );


            setText(
                "#restartQuiz",
                english
                    ? "Restart"
                    : "Refazer"
            );


            setText(
                "#shareQuizResult",
                english
                    ? "Share"
                    : "Compartilhar"
            );


            /* FINAL */

            setHeadingParts(
                $(".final-content h2"),
                english
                    ? "Leave a little "
                    : "Deixe um pouco de ",
                english
                    ? "love in the air."
                    : "amor no ar."
            );


            setText(
                ".final-content > p",
                english
                    ? "Explore the fragrance, discover its notes, find your mood and turn the moment into Dream."
                    : "Explore a fragrância, descubra suas notas, encontre seu mood e transforme o momento em Dream."
            );


            setText(
                ".final-actions .primary-btn",
                english
                    ? "Discover Dream"
                    : "Conhecer Dream"
            );


            setText(
                "#shareButton",
                english
                    ? "Share"
                    : "Compartilhar"
            );


            setText(
                "#fullscreenButton",
                english
                    ? "Fullscreen"
                    : "Tela cheia"
            );


            /* MODAL PRODUTO */

            setText(
                ".product-modal-description",
                english
                    ? "A delicate, floral and enveloping fragrance created to add a special touch to every moment."
                    : "Uma fragrância delicada, floral e envolvente, criada para deixar um toque especial em cada momento."
            );


            setAllText(
                ".product-modal-info small",
                english
                    ? [
                        "VOLUME",
                        "LINE",
                        "PROFILE"
                    ]
                    : [
                        "VOLUME",
                        "LINHA",
                        "PERFIL"
                    ]
            );


            setAllText(
                ".product-modal-info strong",
                english
                    ? [
                        "350 ml",
                        "Dream",
                        "Woody Floral"
                    ]
                    : [
                        "350 ml",
                        "Dream",
                        "Floral Amadeirado"
                    ]
            );


            setText(
                "#shareModal",
                english
                    ? "Share"
                    : "Compartilhar"
            );


            /* DREAM STUDIO */

            setText(
                ".settings-head .section-eyebrow",
                english
                    ? "CUSTOMIZE"
                    : "PERSONALIZAR"
            );


            setText(
                ".settings-head p",
                english
                    ? "Customize your experience."
                    : "Personalize sua experiência."
            );


            setAllText(
                ".settings-group > h3",
                english
                    ? [
                        "Language",
                        "Presets",
                        "Appearance",
                        "Palette",
                        "Effects",
                        "Audio",
                        "Text size"
                    ]
                    : [
                        "Idioma",
                        "Presets",
                        "Aparência",
                        "Paleta",
                        "Efeitos",
                        "Áudio",
                        "Tamanho do texto"
                    ]
            );


            const settingStrongPT = [

                "Modo escuro",

                "Interface limpa",

                "Efeito vidro",

                "Interface compacta",

                "Contraste extra",

                "Performance",

                "Partículas",

                "Animações",

                "Brilho do cursor",

                "Brilho ambiente",

                "Movimento 3D",

                "Galeria automática",

                "Som do borrifador",

                "Vibração",

                "Música de fundo"

            ];


            const settingStrongEN = [

                "Dark mode",

                "Clean interface",

                "Glass effect",

                "Compact interface",

                "Extra contrast",

                "Performance",

                "Particles",

                "Animations",

                "Cursor glow",

                "Ambient glow",

                "3D motion",

                "Gallery autoplay",

                "Spray sound",

                "Vibration",

                "Background music"

            ];


            setAllText(
                ".setting-row strong",
                english
                    ? settingStrongEN
                    : settingStrongPT
            );


            setAllText(
                ".range-setting strong",
                english
                    ? [
                        "3D intensity",
                        "Glow intensity",
                        "Glass blur",
                        "Particles",
                        "Spray intensity",
                        "Spray explosion",
                        "Volume"
                    ]
                    : [
                        "Intensidade 3D",
                        "Intensidade do brilho",
                        "Desfoque do vidro",
                        "Partículas",
                        "Borrifador",
                        "Explosão do borrifador",
                        "Volume"
                    ]
            );


            setText(
                "#resetSettings",
                english
                    ? "Restore settings"
                    : "Restaurar configurações"
            );


            /* FOOTER */

            setText(
                ".footer-brand span",
                english
                    ? "LOVE IN THE AIR"
                    : "AMOR NO AR"
            );


            setText(
                ".footer-main > p",
                english
                    ? "An interactive experience inspired by Dream Love in the Air."
                    : "Uma experiência interativa inspirada em Dream Amor no Ar."
            );


            setText(
                ".footer-top-link",
                english
                    ? "Back to top ↑"
                    : "Voltar ao topo ↑"
            );


            setAllText(
                ".creator-info > span",
                english
                    ? [
                        "DEVELOPED BY",
                        "CREATED BY"
                    ]
                    : [
                        "DESENVOLVIDO POR",
                        "CRIADO POR"
                    ]
            );


            setAllText(
                ".creator-info > small",
                english
                    ? [
                        "Development",
                        "Creation"
                    ]
                    : [
                        "Desenvolvimento",
                        "Criação"
                    ]
            );


            renderFavorite();

        }


        /* =====================================================
           CONTROLE DO IDIOMA
        ====================================================== */

        function renderLanguageButtons() {

            languageButtons.forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.language ===
                            state.currentLanguage
                    );

                }
            );

        }


        function setLanguage(
            language,
            save = true,
            notify = true
        ) {

            const finalLanguage =
                language ===
                    "en-US"
                    ? "en-US"
                    : "pt-BR";


            state.currentLanguage =
                finalLanguage;


            setDynamicLanguage(
                finalLanguage
            );


            translateInterface(
                finalLanguage
            );


            renderLanguageButtons();


            const currentSection =
                $(
                    `#${activeSectionId}`
                );


            if (
                currentSection &&
                sectionIndicator
            ) {

                let name =
                    currentSection.dataset.sectionName ||
                    activeSectionId;


                if (
                    finalLanguage ===
                    "en-US"
                ) {

                    const names = {

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

                        "Sensação":
                            "Feeling",

                        "Momentos":
                            "Moments",

                        "Cenas":
                            "Scenes",

                        "Galeria":
                            "Gallery",

                        "Mood":
                            "Mood",

                        "Quiz":
                            "Quiz",

                        "Final":
                            "Final"

                    };


                    name =
                        names[
                            name
                        ] ||
                        name;

                }


                sectionIndicator.innerHTML =
                    `<span>●</span>${name}`;

            }


            if (
                save
            ) {

                storage.set(
                    "dream.language",
                    finalLanguage
                );

            }


            if (
                notify
            ) {

                showToast(
                    finalLanguage ===
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
                            button.dataset.language
                        );

                    }
                );

            }
        );


        /* =====================================================
           MÚSICA
        ====================================================== */

        const backgroundMusic =
            $("#backgroundMusic");


        const musicToggle =
            $("#musicToggle");


        const musicPlayer =
            $("#musicPlayer");


        const musicButton =
            $("#musicButton");


        const musicCurrentTime =
            $("#musicCurrentTime");


        const musicProgress =
            $("#musicProgress");


        const musicDuration =
            $("#musicDuration");


        const musicMute =
            $("#musicMute");


        const volumeRange =
            $("#volumeRange");


        const volumeValue =
            $("#volumeValue");


        let musicEnabled =
            Boolean(
                storage.get(
                    "dream.music",
                    false
                )
            );


        let musicMuted =
            Boolean(
                storage.get(
                    "dream.musicMuted",
                    false
                )
            );


        let musicVolume =
            clamp(
                Number(
                    storage.get(
                        "dream.volume",
                        35
                    )
                ) ||
                35,
                0,
                100
            );


        function formatTime(
            seconds
        ) {

            if (
                !Number.isFinite(
                    seconds
                )
            ) {

                return "0:00";

            }


            const minutes =
                Math.floor(
                    seconds /
                    60
                );


            const remaining =
                Math.floor(
                    seconds %
                    60
                );


            return `${
                minutes
            }:${
                String(
                    remaining
                ).padStart(
                    2,
                    "0"
                )
            }`;

        }


        function renderMusicState() {

            const playing =
                Boolean(
                    backgroundMusic &&
                    !backgroundMusic.paused
                );


            body.classList.toggle(
                "music-playing",
                playing
            );


            musicPlayer?.classList.toggle(
                "visible",
                musicEnabled
            );


            if (
                musicButton
            ) {

                musicButton.textContent =
                    playing
                        ? "❚❚"
                        : "▶";


                musicButton.setAttribute(
                    "aria-label",
                    playing
                        ? (
                            state.currentLanguage ===
                                "en-US"
                                ? "Pause music"
                                : "Pausar música"
                        )
                        : (
                            state.currentLanguage ===
                                "en-US"
                                ? "Play music"
                                : "Reproduzir música"
                        )
                );

            }


            if (
                musicToggle
            ) {

                musicToggle.checked =
                    musicEnabled;

            }


            if (
                musicMute
            ) {

                musicMute.textContent =
                    musicMuted
                        ? "🔇"
                        : "♫";

            }

        }


        function renderVolume() {

            if (
                !backgroundMusic
            ) {

                return;

            }


            backgroundMusic.volume =
                musicVolume /
                100;


            backgroundMusic.muted =
                musicMuted;


            if (
                volumeRange
            ) {

                volumeRange.value =
                    String(
                        musicVolume
                    );

            }


            if (
                volumeValue
            ) {

                volumeValue.textContent =
                    `${musicVolume}%`;

            }


            renderMusicState();

        }


        async function playMusic() {

            if (
                !backgroundMusic
            ) {

                return false;

            }


            try {

                await backgroundMusic.play();


                musicEnabled =
                    true;


                storage.set(
                    "dream.music",
                    true
                );


                renderMusicState();


                return true;

            }

            catch (
                error
            ) {

                renderMusicState();


                return false;

            }

        }


        function pauseMusic(
            disable = false
        ) {

            backgroundMusic?.pause();


            if (
                disable
            ) {

                musicEnabled =
                    false;


                storage.set(
                    "dream.music",
                    false
                );

            }


            renderMusicState();

        }


        async function setMusicEnabled(
            enabled
        ) {

            musicEnabled =
                Boolean(
                    enabled
                );


            storage.set(
                "dream.music",
                musicEnabled
            );


            if (
                musicEnabled
            ) {

                const success =
                    await playMusic();


                if (
                    !success
                ) {

                    showToast(
                        state.currentLanguage ===
                            "en-US"
                            ? "Press play to start Moonlight."
                            : "Clique em reproduzir para iniciar Moonlight."
                    );

                }

            }

            else {

                pauseMusic(
                    true
                );

            }


            renderMusicState();

        }


        musicToggle?.addEventListener(
            "change",
            () => {

                setMusicEnabled(
                    musicToggle.checked
                );

            }
        );


        musicButton?.addEventListener(
            "click",
            async () => {

                if (
                    !backgroundMusic
                ) {

                    return;

                }


                if (
                    backgroundMusic.paused
                ) {

                    musicEnabled =
                        true;


                    storage.set(
                        "dream.music",
                        true
                    );


                    await playMusic();

                }

                else {

                    backgroundMusic.pause();


                    renderMusicState();

                }

            }
        );


        volumeRange?.addEventListener(
            "input",
            () => {

                musicVolume =
                    clamp(
                        Number(
                            volumeRange.value
                        ),
                        0,
                        100
                    );


                storage.set(
                    "dream.volume",
                    musicVolume
                );


                if (
                    musicVolume >
                        0 &&
                    musicMuted
                ) {

                    musicMuted =
                        false;


                    storage.set(
                        "dream.musicMuted",
                        false
                    );

                }


                renderVolume();

            }
        );


        musicMute?.addEventListener(
            "click",
            () => {

                musicMuted =
                    !musicMuted;


                storage.set(
                    "dream.musicMuted",
                    musicMuted
                );


                renderVolume();

            }
        );


        backgroundMusic?.addEventListener(
            "loadedmetadata",
            () => {

                if (
                    musicDuration
                ) {

                    musicDuration.textContent =
                        formatTime(
                            backgroundMusic.duration
                        );

                }

            }
        );


        backgroundMusic?.addEventListener(
            "durationchange",
            () => {

                if (
                    musicDuration
                ) {

                    musicDuration.textContent =
                        formatTime(
                            backgroundMusic.duration
                        );

                }

            }
        );


        backgroundMusic?.addEventListener(
            "timeupdate",
            () => {

                if (
                    !backgroundMusic
                ) {

                    return;

                }


                if (
                    musicCurrentTime
                ) {

                    musicCurrentTime.textContent =
                        formatTime(
                            backgroundMusic.currentTime
                        );

                }


                if (
                    musicProgress &&
                    Number.isFinite(
                        backgroundMusic.duration
                    ) &&
                    backgroundMusic.duration >
                        0
                ) {

                    musicProgress.value =
                        String(
                            (
                                backgroundMusic.currentTime /
                                backgroundMusic.duration
                            ) *
                            100
                        );

                }

            }
        );


        musicProgress?.addEventListener(
            "input",
            () => {

                if (
                    !backgroundMusic ||
                    !Number.isFinite(
                        backgroundMusic.duration
                    )
                ) {

                    return;

                }


                const percent =
                    clamp(
                        Number(
                            musicProgress.value
                        ),
                        0,
                        100
                    );


                backgroundMusic.currentTime =
                    (
                        percent /
                        100
                    ) *
                    backgroundMusic.duration;

            }
        );


        backgroundMusic?.addEventListener(
            "play",
            renderMusicState
        );


        backgroundMusic?.addEventListener(
            "pause",
            renderMusicState
        );


        renderVolume();


        renderMusicState();


        if (
            musicEnabled
        ) {

            musicPlayer?.classList.add(
                "visible"
            );

        }


        /* =====================================================
           COMPARTILHAR
        ====================================================== */

        const shareButton =
            $("#shareButton");


        const shareModal =
            $("#shareModal");


        async function shareDream() {

            const english =
                state.currentLanguage ===
                    "en-US";


            const shareData = {

                title:
                    english
                        ? "Dream Love in the Air"
                        : "Dream Amor no Ar",


                text:
                    english
                        ? "Discover the Dream Love in the Air experience ✦"
                        : "Conheça a experiência Dream Amor no Ar ✦",


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


                    return;

                }


                if (
                    navigator.clipboard
                ) {

                    await navigator.clipboard.writeText(
                        window.location.href
                    );


                    showToast(
                        english
                            ? "Link copied ✦"
                            : "Link copiado ✦"
                    );


                    return;

                }

            }

            catch (
                error
            ) {

                if (
                    error?.name ===
                    "AbortError"
                ) {

                    return;

                }

            }


            showToast(
                english
                    ? "Unable to share automatically."
                    : "Não foi possível compartilhar automaticamente."
            );

        }


        shareButton?.addEventListener(
            "click",
            shareDream
        );


        shareModal?.addEventListener(
            "click",
            shareDream
        );


        /* =====================================================
           TELA CHEIA
        ====================================================== */

        const fullscreenButton =
            $("#fullscreenButton");


        function renderFullscreenButton() {

            if (
                !fullscreenButton
            ) {

                return;

            }


            const fullscreen =
                Boolean(
                    document.fullscreenElement
                );


            fullscreenButton.textContent =
                state.currentLanguage ===
                    "en-US"
                    ? (
                        fullscreen
                            ? "Exit fullscreen"
                            : "Fullscreen"
                    )
                    : (
                        fullscreen
                            ? "Sair da tela cheia"
                            : "Tela cheia"
                    );

        }


        async function toggleFullscreen() {

            try {

                if (
                    document.fullscreenElement
                ) {

                    await document.exitFullscreen();

                }

                else {

                    await document
                        .documentElement
                        .requestFullscreen();

                }

            }

            catch (
                error
            ) {

                showToast(
                    state.currentLanguage ===
                        "en-US"
                        ? "Fullscreen is unavailable."
                        : "Tela cheia não disponível."
                );

            }

        }


        fullscreenButton?.addEventListener(
            "click",
            toggleFullscreen
        );


        document.addEventListener(
            "fullscreenchange",
            renderFullscreenButton
        );


        /* =====================================================
           CORREÇÃO • CLIQUE APÓS ARRASTAR GALERIA
        ====================================================== */

        let galleryPointerStart =
            0;


        let galleryPointerMoved =
            false;


        galleryTrack?.addEventListener(
            "pointerdown",
            event => {

                galleryPointerStart =
                    event.clientX;


                galleryPointerMoved =
                    false;

            }
        );


        galleryTrack?.addEventListener(
            "pointermove",
            event => {

                if (
                    Math.abs(
                        event.clientX -
                        galleryPointerStart
                    ) >
                    7
                ) {

                    galleryPointerMoved =
                        true;

                }

            }
        );


        galleryTrack?.addEventListener(
            "click",
            event => {

                if (
                    !galleryPointerMoved
                ) {

                    return;

                }


                event.preventDefault();


                event.stopPropagation();


                galleryPointerMoved =
                    false;

            },
            true
        );


        /* =====================================================
           ESC / TECLADO
        ====================================================== */

        document.addEventListener(
            "keydown",
            event => {

                const target =
                    event.target;


                const typing =
                    target instanceof
                        HTMLInputElement ||
                    target instanceof
                        HTMLTextAreaElement ||
                    target instanceof
                        HTMLSelectElement ||
                    target?.isContentEditable;


                if (
                    event.key ===
                    "Escape"
                ) {

                    if (
                        lightbox?.classList.contains(
                            "open"
                        )
                    ) {

                        closeLightbox();


                        return;

                    }


                    const openedModal =
                        $(".modal.open");


                    if (
                        openedModal
                    ) {

                        closeModal(
                            openedModal
                        );


                        return;

                    }


                    if (
                        settingsPanel?.classList.contains(
                            "open"
                        )
                    ) {

                        closeSettings();


                        return;

                    }


                    if (
                        menu?.classList.contains(
                            "open"
                        )
                    ) {

                        closeMobileMenu();

                    }


                    return;

                }


                if (
                    typing
                ) {

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

                        event.preventDefault();


                        nextLightbox();

                    }


                    if (
                        event.key ===
                        "ArrowLeft"
                    ) {

                        event.preventDefault();


                        previousLightbox();

                    }


                    return;

                }


                if (
                    event.key.toLowerCase() ===
                    "s"
                ) {

                    toggleSettings();

                }


                if (
                    event.key.toLowerCase() ===
                    "m"
                ) {

                    if (
                        backgroundMusic?.paused
                    ) {

                        musicEnabled =
                            true;


                        storage.set(
                            "dream.music",
                            true
                        );


                        playMusic();

                    }

                    else {

                        backgroundMusic?.pause();

                    }

                }

            }
        );


        /* =====================================================
           SETTINGS • FECHAR AO CLICAR FORA
        ====================================================== */

        document.addEventListener(
            "pointerdown",
            event => {

                if (
                    !settingsPanel?.classList.contains(
                        "open"
                    )
                ) {

                    return;

                }


                if (
                    settingsPanel.contains(
                        event.target
                    ) ||
                    settingsButton?.contains(
                        event.target
                    )
                ) {

                    return;

                }


                closeSettings();

            }
        );


        /* =====================================================
           RESIZE FINAL
        ====================================================== */

        let finalResizeTimer =
            null;


        window.addEventListener(
            "resize",
            () => {

                window.clearTimeout(
                    finalResizeTimer
                );


                finalResizeTimer =
                    window.setTimeout(
                        () => {

                            createBackgroundParticles();


                            if (
                                window.innerWidth >
                                980
                            ) {

                                closeMobileMenu();

                            }


                            if (
                                window.innerWidth <=
                                760
                            ) {

                                stopCursorGlow();

                            }

                            else if (
                                state.cursorGlow
                            ) {

                                startCursorGlow();

                            }


                            updateScrollProgress();


                            findActiveSection();

                        },
                        160
                    );

            }
        );


        /* =====================================================
           RESET • COMPLEMENTO DE ÁUDIO
        ====================================================== */

        resetSettingsButton?.addEventListener(
            "click",
            () => {

                musicVolume =
                    35;


                musicMuted =
                    false;


                musicEnabled =
                    false;


                storage.remove(
                    "dream.music"
                );


                storage.remove(
                    "dream.musicMuted"
                );


                storage.remove(
                    "dream.volume"
                );


                backgroundMusic?.pause();


                if (
                    backgroundMusic
                ) {

                    backgroundMusic.currentTime =
                        0;

                }


                renderVolume();


                renderMusicState();

            }
        );


        /* =====================================================
           INICIALIZA IDIOMA
        ====================================================== */

        setLanguage(
            state.currentLanguage,
            false,
            false
        );


        renderFullscreenButton();


        /* =====================================================
           SECTION INDICATOR INICIAL
        ====================================================== */

        const initialSection =
            $("#inicio");


        if (
            initialSection
        ) {

            updateSectionIndicator(
                initialSection
            );

        }


        setLanguage(
            state.currentLanguage,
            false,
            false
        );


        /* =====================================================
           DREAM APP • FINAL
        ====================================================== */

        window.DreamApp = {

            ...window.DreamApp,


            state,


            storage,


            setLanguage,


            translateInterface,


            playMusic,


            pauseMusic,


            setMusicEnabled,


            shareDream,


            toggleFullscreen,


            setDarkMode,


            setCleanMode,


            setPerformanceMode,


            setParticles,


            setAnimations,


            setCursorGlow,


            setMotion,


            setMotionIntensity,


            setParticleIntensity,


            setSprayIntensity,


            setGlass,


            setCompact,


            setContrast,


            setAmbientGlow,


            setGlowIntensity,


            setGlassBlur,


            setSprayExplosion,


            setGalleryAutoplay,


            applyCustomColors

        };


        /* =====================================================
           SITE PRINCIPAL PRONTO
        ====================================================== */

        document.documentElement.classList.add(
            "dream-ready"
        );


        handleScroll();


        /* =====================================================
           FIM DO PRIMEIRO DOMContentLoaded
        ====================================================== */

    }
);


/* =========================================================
   DREAM AMOR NO AR • V4
   LOGIN POR NOME + PERFIL + EXPERIÊNCIA
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        "use strict";


        /* =====================================================
           HELPERS V4
        ====================================================== */

        const $v4 = (
            selector,
            parent = document
        ) =>
            parent.querySelector(
                selector
            );


        const $$v4 = (
            selector,
            parent = document
        ) =>
            [
                ...parent.querySelectorAll(
                    selector
                )
            ];


        const bodyV4 =
            document.body;


        const rootV4 =
            document.documentElement;


        const app = () =>
            window.DreamApp ||
            {};


        /* =====================================================
           STORAGE V4
        ====================================================== */

        const safeStorage = {

            get(
                key,
                fallback = null
            ) {

                try {

                    const value =
                        localStorage.getItem(
                            key
                        );


                    return value ===
                        null
                        ? fallback
                        : JSON.parse(
                            value
                        );

                }

                catch (
                    error
                ) {

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
                        JSON.stringify(
                            value
                        )
                    );


                    return true;

                }

                catch (
                    error
                ) {

                    return false;

                }

            },


            remove(
                key
            ) {

                try {

                    localStorage.removeItem(
                        key
                    );

                }

                catch (
                    error
                ) {

                    /*
                        Storage opcional.
                    */

                }

            }

        };


        /* =====================================================
           PERFORMANCE AUTOMÁTICA
        ====================================================== */

        const connection =
            navigator.connection ||
            navigator.mozConnection ||
            navigator.webkitConnection;


        const lowHardware =
            (
                Number(
                    navigator.hardwareConcurrency
                ) >
                    0 &&
                Number(
                    navigator.hardwareConcurrency
                ) <=
                    4
            ) ||
            (
                Number(
                    navigator.deviceMemory
                ) >
                    0 &&
                Number(
                    navigator.deviceMemory
                ) <=
                    4
            ) ||
            Boolean(
                connection?.saveData
            );


        if (
            lowHardware
        ) {

            bodyV4.classList.add(
                "v4-lite"
            );

        }


        /* =====================================================
           ENTRADA PELO NOME
        ====================================================== */

        const entry =
            $v4(
                "#dreamEntry"
            );


        const entryForm =
            $v4(
                "#dreamEntryForm"
            );


        const nameInput =
            $v4(
                "#dreamNameInput"
            );


        const entryError =
            $v4(
                "#dreamEntryError"
            );


        const entryStars =
            $v4(
                "#dreamEntryStars"
            );


        const userRoot =
            $v4(
                "#dreamUser"
            );


        const userButton =
            $v4(
                "#dreamUserButton"
            );


        const userMenu =
            $v4(
                "#dreamUserMenu"
            );


        const userNameElement =
            $v4(
                "#dreamUserName"
            );


        const userInitial =
            $v4(
                "#dreamUserInitial"
            );


        const changeNameButton =
            $v4(
                "#dreamChangeName"
            );


        const logoutButton =
            $v4(
                "#dreamLogout"
            );


        let currentUserName =
            "";


        function normalizeName(
            value
        ) {

            return String(
                value ||
                ""
            )
                .replace(
                    /\s+/g,
                    " "
                )
                .trim()
                .slice(
                    0,
                    24
                );

        }


        function firstName(
            value
        ) {

            return (
                normalizeName(
                    value
                )
                    .split(
                        " "
                    )[
                        0
                    ] ||
                "Dreamer"
            );

        }


        function updateUserUI(
            name
        ) {

            currentUserName =
                normalizeName(
                    name
                );


            if (
                userNameElement
            ) {

                userNameElement.textContent =
                    firstName(
                        currentUserName
                    );

            }


            if (
                userInitial
            ) {

                userInitial.textContent =
                    currentUserName
                        ? currentUserName
                            .charAt(
                                0
                            )
                            .toLocaleUpperCase(
                                "pt-BR"
                            )
                        : "D";

            }


            const heroCopy =
                $v4(
                    ".hero-copy"
                );


            let welcome =
                $v4(
                    "#dreamPersonalWelcome"
                );


            if (
                heroCopy &&
                !welcome
            ) {

                welcome =
                    document.createElement(
                        "p"
                    );


                welcome.id =
                    "dreamPersonalWelcome";


                welcome.className =
                    "dream-personal-welcome";


                const heading =
                    $v4(
                        "h1",
                        heroCopy
                    );


                heroCopy.insertBefore(
                    welcome,
                    heading ||
                    heroCopy.firstChild
                );

            }


            if (
                welcome
            ) {

                const english =
                    app().state
                        ?.currentLanguage ===
                    "en-US";


                welcome.textContent =
                    currentUserName
                        ? (
                            english
                                ? `Welcome, ${firstName(currentUserName)} ♡`
                                : `Olá, ${firstName(currentUserName)} ♡`
                        )
                        : "";

            }

        }


        function buildEntryStars() {

            if (
                !entryStars ||
                entryStars.childElementCount
            ) {

                return;

            }


            const amount =
                bodyV4.classList.contains(
                    "v4-lite"
                )
                    ? 0
                    : 24;


            for (
                let index = 0;
                index < amount;
                index += 1
            ) {

                const star =
                    document.createElement(
                        "span"
                    );


                star.className =
                    "dream-entry-star";


                star.style.left =
                    `${
                        Math.random() *
                        100
                    }%`;


                star.style.top =
                    `${
                        Math.random() *
                        100
                    }%`;


                star.style.setProperty(
                    "--size",
                    `${
                        2 +
                        Math.random() *
                        5
                    }px`
                );


                star.style.setProperty(
                    "--opacity",
                    String(
                        0.2 +
                        Math.random() *
                        0.6
                    )
                );


                star.style.setProperty(
                    "--duration",
                    `${
                        6 +
                        Math.random() *
                        8
                    }s`
                );


                star.style.setProperty(
                    "--delay",
                    `${
                        Math.random() *
                        -7
                    }s`
                );


                entryStars.appendChild(
                    star
                );

            }

        }


        function openEntry(
            prefill = currentUserName
        ) {

            if (
                !entry
            ) {

                return;

            }


            closeUserMenu();


            entry.hidden =
                false;


            entry.classList.remove(
                "leaving"
            );


            bodyV4.classList.add(
                "dream-entry-open"
            );


            entry.setAttribute(
                "aria-hidden",
                "false"
            );


            if (
                nameInput
            ) {

                nameInput.value =
                    normalizeName(
                        prefill
                    );


                window.setTimeout(
                    () => {

                        nameInput.focus(
                            {
                                preventScroll:
                                    true
                            }
                        );


                        nameInput.select();

                    },
                    160
                );

            }

        }


        function closeEntry() {

            if (
                !entry
            ) {

                return;

            }


            entry.classList.add(
                "leaving"
            );


            bodyV4.classList.remove(
                "dream-entry-open"
            );


            entry.setAttribute(
                "aria-hidden",
                "true"
            );


            window.setTimeout(
                () => {

                    entry.hidden =
                        true;


                    entry.classList.remove(
                        "leaving"
                    );

                },
                540
            );

        }


        function saveName(
            name
        ) {

            const finalName =
                normalizeName(
                    name
                );


            if (
                finalName.length <
                2
            ) {

                if (
                    entryError
                ) {

                    entryError.textContent =
                        app().state
                            ?.currentLanguage ===
                            "en-US"
                            ? "Enter at least 2 characters."
                            : "Digite pelo menos 2 caracteres.";

                }


                nameInput?.focus();


                return false;

            }


            safeStorage.set(
                "dream.userName",
                finalName
            );


            updateUserUI(
                finalName
            );


            if (
                entryError
            ) {

                entryError.textContent =
                    "";

            }


            closeEntry();


            unlockAchievement(
                "welcome",
                {

                    pt:
                        `Bem-vindo ao Dream, ${firstName(finalName)} ♡`,


                    en:
                        `Welcome to Dream, ${firstName(finalName)} ♡`

                }
            );


            return true;

        }


        entryForm?.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                saveName(
                    nameInput?.value
                );

            }
        );


        nameInput?.addEventListener(
            "input",
            () => {

                if (
                    entryError
                ) {

                    entryError.textContent =
                        "";

                }

            }
        );


        /* =====================================================
           PERFIL
        ====================================================== */

        function openUserMenu() {

            if (
                !userRoot ||
                !userMenu ||
                !userButton
            ) {

                return;

            }


            userRoot.classList.add(
                "open"
            );


            userMenu.setAttribute(
                "aria-hidden",
                "false"
            );


            userButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        function closeUserMenu() {

            if (
                !userRoot ||
                !userMenu ||
                !userButton
            ) {

                return;

            }


            userRoot.classList.remove(
                "open"
            );


            userMenu.setAttribute(
                "aria-hidden",
                "true"
            );


            userButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        userButton?.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                if (
                    userRoot?.classList.contains(
                        "open"
                    )
                ) {

                    closeUserMenu();

                }

                else {

                    openUserMenu();

                }

            }
        );


        changeNameButton?.addEventListener(
            "click",
            () => {

                openEntry(
                    currentUserName
                );

            }
        );


        logoutButton?.addEventListener(
            "click",
            () => {

                safeStorage.remove(
                    "dream.userName"
                );


                currentUserName =
                    "";


                updateUserUI(
                    ""
                );


                openEntry(
                    ""
                );

            }
        );


        document.addEventListener(
            "pointerdown",
            event => {

                if (
                    !userRoot?.contains(
                        event.target
                    )
                ) {

                    closeUserMenu();

                }

            }
        );


        /* =====================================================
           MODO IMERSIVO
        ====================================================== */

        const immersiveButton =
            $v4(
                "#immersiveButton"
            );


        let immersive =
            false;


        function syncImmersiveButton() {

            if (
                !immersiveButton
            ) {

                return;

            }


            const english =
                app().state
                    ?.currentLanguage ===
                "en-US";


            immersiveButton.setAttribute(
                "aria-pressed",
                String(
                    immersive
                )
            );


            immersiveButton.title =
                immersive
                    ? (
                        english
                            ? "Exit immersive mode"
                            : "Sair do modo imersivo"
                    )
                    : (
                        english
                            ? "Enable immersive mode"
                            : "Ativar modo imersivo"
                    );


            const strong =
                immersiveButton.querySelector(
                    "strong"
                );


            if (
                strong
            ) {

                strong.textContent =
                    immersive
                        ? (
                            english
                                ? "Exit"
                                : "Sair"
                        )
                        : (
                            english
                                ? "Immersive"
                                : "Imersivo"
                        );

            }

        }


        function setImmersive(
            enabled
        ) {

            immersive =
                Boolean(
                    enabled
                );


            bodyV4.classList.toggle(
                "immersive-v4",
                immersive
            );


            syncImmersiveButton();


            if (
                immersive
            ) {

                closeUserMenu();

            }

        }


        immersiveButton?.addEventListener(
            "click",
            () => {

                setImmersive(
                    !immersive
                );

            }
        );


        /* =====================================================
           REFLEXO DINÂMICO DO PRODUTO
        ====================================================== */

        const heroProductV4 =
            $v4(
                "#heroProduct"
            );


        if (
            heroProductV4
        ) {

            const shine =
                document.createElement(
                    "div"
                );


            shine.className =
                "v4-product-shine";


            shine.setAttribute(
                "aria-hidden",
                "true"
            );


            heroProductV4.appendChild(
                shine
            );


            heroProductV4.addEventListener(
                "pointermove",
                event => {

                    if (
                        bodyV4.classList.contains(
                            "v4-lite"
                        )
                    ) {

                        return;

                    }


                    const rect =
                        heroProductV4
                            .getBoundingClientRect();


                    const x =
                        (
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width
                        ) *
                        100;


                    const y =
                        (
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height
                        ) *
                        100;


                    heroProductV4.style.setProperty(
                        "--v4-shine-x",
                        `${x}%`
                    );


                    heroProductV4.style.setProperty(
                        "--v4-shine-y",
                        `${y}%`
                    );

                }
            );

        }


        /* =====================================================
           SPRAY V4
        ====================================================== */

        const sprayButtonV4 =
            $v4(
                "#sprayButton"
            );


        function createV4SprayCloud() {

            if (
                !heroProductV4 ||
                bodyV4.classList.contains(
                    "v4-lite"
                )
            ) {

                return;

            }


            const cloud =
                document.createElement(
                    "div"
                );


            cloud.className =
                "v4-spray-cloud";


            cloud.setAttribute(
                "aria-hidden",
                "true"
            );


            const intensity =
                Number(
                    app().state
                        ?.sprayIntensity
                ) ||
                5;


            const amount =
                Math.min(
                    34,
                    16 +
                    intensity *
                    2
                );


            for (
                let index = 0;
                index < amount;
                index += 1
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );


                particle.className =
                    "v4-spray-particle";


                const angle =
                    (
                        -145 +
                        Math.random() *
                        110
                    ) *
                    (
                        Math.PI /
                        180
                    );


                const distance =
                    70 +
                    Math.random() *
                    (
                        90 +
                        intensity *
                        8
                    );


                const x =
                    Math.cos(
                        angle
                    ) *
                    distance;


                const y =
                    Math.sin(
                        angle
                    ) *
                    distance;


                particle.style.setProperty(
                    "--v4-x",
                    `${x}px`
                );


                particle.style.setProperty(
                    "--v4-y",
                    `${y}px`
                );


                particle.style.setProperty(
                    "--v4-size",
                    `${
                        4 +
                        Math.random() *
                        10
                    }px`
                );


                particle.style.setProperty(
                    "--v4-delay",
                    `${
                        Math.random() *
                        120
                    }ms`
                );


                particle.style.setProperty(
                    "--v4-duration",
                    `${
                        760 +
                        Math.random() *
                        520
                    }ms`
                );


                particle.style.setProperty(
                    "--v4-scale",
                    String(
                        0.7 +
                        Math.random() *
                        1.5
                    )
                );


                cloud.appendChild(
                    particle
                );

            }


            heroProductV4.appendChild(
                cloud
            );


            window.setTimeout(
                () => {

                    cloud.remove();

                },
                1600
            );

        }


        sprayButtonV4?.addEventListener(
            "click",
            () => {

                createV4SprayCloud();


                window.setTimeout(
                    () => {

                        const sprays =
                            Number(
                                app().state
                                    ?.sprayCount
                            ) ||
                            0;


                        if (
                            sprays >=
                            50
                        ) {

                            unlockAchievement(
                                "sprays-50",
                                {

                                    pt:
                                        "50 borrifadas • Dream sem limites ✦",


                                    en:
                                        "50 sprays • Unlimited Dream ✦"

                                }
                            );

                        }

                    },
                    60
                );

            }
        );


        /* =====================================================
           GALERIA 3D V4
        ====================================================== */

        $$v4(
            ".gallery-item"
        ).forEach(
            card => {

                card.addEventListener(
                    "pointermove",
                    event => {

                        if (
                            bodyV4.classList.contains(
                                "v4-lite"
                            ) ||
                            window.innerWidth <=
                                760 ||
                            event.pointerType ===
                                "touch"
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
                            7;


                        const rotateX =
                            (
                                0.5 -
                                y
                            ) *
                            6;


                        card.style.setProperty(
                            "--v4-card-x",
                            `${rotateX}deg`
                        );


                        card.style.setProperty(
                            "--v4-card-y",
                            `${rotateY}deg`
                        );


                        card.classList.add(
                            "v4-tilting"
                        );

                    }
                );


                card.addEventListener(
                    "pointerleave",
                    () => {

                        card.classList.remove(
                            "v4-tilting"
                        );


                        card.style.removeProperty(
                            "--v4-card-x"
                        );


                        card.style.removeProperty(
                            "--v4-card-y"
                        );

                    }
                );

            }
        );


        /* =====================================================
           RIPPLE
        ====================================================== */

        const rippleSelector = [

            ".primary-btn",

            ".secondary-btn",

            ".pill-btn",

            ".preset-button",

            ".mood-button",

            ".gallery-open",

            ".studio-fab",

            ".immersive-fab",

            ".dream-entry-button"

        ].join(
            ","
        );


        document.addEventListener(
            "pointerdown",
            event => {

                const button =
                    event.target.closest(
                        rippleSelector
                    );


                if (
                    !button
                ) {

                    return;

                }


                const rect =
                    button.getBoundingClientRect();


                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.className =
                    "v4-ripple";


                ripple.style.left =
                    `${
                        event.clientX -
                        rect.left
                    }px`;


                ripple.style.top =
                    `${
                        event.clientY -
                        rect.top
                    }px`;


                button.classList.add(
                    "v4-ripple-host"
                );


                button.appendChild(
                    ripple
                );


                window.setTimeout(
                    () => {

                        ripple.remove();

                    },
                    680
                );

            }
        );


        /* =====================================================
           SCENES • CONTROLE GLOBAL V4
        ====================================================== */

        const visitedScenes =
            new Set(
                safeStorage.get(
                    "dream.v4.visitedScenes",
                    []
                )
            );


        document.addEventListener(
            "click",
            event => {

                const sceneButton =
                    event.target.closest(
                        "[data-scene]"
                    );


                if (
                    !sceneButton
                ) {

                    return;

                }


                const scene =
                    sceneButton.dataset.scene;


                bodyV4.dataset.v4Scene =
                    scene;


                visitedScenes.add(
                    scene
                );


                safeStorage.set(
                    "dream.v4.visitedScenes",
                    [
                        ...visitedScenes
                    ]
                );


                if (
                    visitedScenes.size >=
                    4
                ) {

                    unlockAchievement(
                        "all-scenes",
                        {

                            pt:
                                "Todas as Dream Scenes descobertas ◌",


                            en:
                                "All Dream Scenes discovered ◌"

                        }
                    );

                }

            }
        );


        /* =====================================================
           CONQUISTAS
        ====================================================== */

        let achievementTimer =
            null;


        function unlockAchievement(
            key,
            copy
        ) {

            const unlocked =
                new Set(
                    safeStorage.get(
                        "dream.v4.achievements",
                        []
                    )
                );


            if (
                unlocked.has(
                    key
                )
            ) {

                return;

            }


            unlocked.add(
                key
            );


            safeStorage.set(
                "dream.v4.achievements",
                [
                    ...unlocked
                ]
            );


            const english =
                app().state
                    ?.currentLanguage ===
                "en-US";


            const achievement =
                document.createElement(
                    "div"
                );


            achievement.className =
                "dream-achievement";


            achievement.setAttribute(
                "role",
                "status"
            );


            achievement.setAttribute(
                "aria-live",
                "polite"
            );


            achievement.innerHTML =
                `
                    <span
                        class="dream-achievement-icon"
                        aria-hidden="true"
                    >
                        ✦
                    </span>

                    <span>

                        <small>
                            ${
                                english
                                    ? "Achievement"
                                    : "Conquista"
                            }
                        </small>

                        <strong>
                            ${
                                english
                                    ? copy.en
                                    : copy.pt
                            }
                        </strong>

                    </span>
                `;


            document
                .querySelector(
                    ".dream-achievement"
                )
                ?.remove();


            document.body.appendChild(
                achievement
            );


            requestAnimationFrame(
                () => {

                    achievement.classList.add(
                        "show"
                    );

                }
            );


            window.clearTimeout(
                achievementTimer
            );


            achievementTimer =
                window.setTimeout(
                    () => {

                        achievement.classList.remove(
                            "show"
                        );


                        window.setTimeout(
                            () => {

                                achievement.remove();

                            },
                            320
                        );

                    },
                    3200
                );

        }


        /* =====================================================
           DREAM STUDIO • FERRAMENTAS V4
        ====================================================== */

        const resetButtonV4 =
            $v4(
                "#resetSettings"
            );


        function injectStudioV4Tools() {

            if (
                !resetButtonV4 ||
                $v4(
                    "#v4StudioTools"
                )
            ) {

                return;

            }


            const tools =
                document.createElement(
                    "div"
                );


            tools.id =
                "v4StudioTools";


            tools.className =
                "v4-studio-tools";


            tools.innerHTML =
                `
                    <button
                        type="button"
                        id="v4SavePreset"
                    >
                        Salvar meu Dream
                    </button>


                    <button
                        type="button"
                        id="v4ApplyPreset"
                    >
                        Aplicar meu Dream
                    </button>


                    <button
                        type="button"
                        class="v4-randomize"
                        id="v4Randomize"
                    >
                        ✦ Randomizar Dream
                    </button>
                `;


            resetButtonV4.before(
                tools
            );


            $v4(
                "#v4SavePreset"
            )?.addEventListener(
                "click",
                saveCustomV4Preset
            );


            $v4(
                "#v4ApplyPreset"
            )?.addEventListener(
                "click",
                applyCustomV4Preset
            );


            $v4(
                "#v4Randomize"
            )?.addEventListener(
                "click",
                randomizeDreamV4
            );

        }


        function captureV4Preset() {

            const currentState =
                app().state ||
                {};


            return {

                dark:
                    bodyV4.classList.contains(
                        "dark"
                    ),


                clean:
                    bodyV4.classList.contains(
                        "clean-mode"
                    ),


                performance:
                    bodyV4.classList.contains(
                        "performance-mode"
                    ),


                particles:
                    currentState.particles !==
                    false,


                animations:
                    currentState.animations !==
                    false,


                cursorGlow:
                    currentState.cursorGlow !==
                    false,


                motion:
                    currentState.motion !==
                    false,


                motionIntensity:
                    Number(
                        currentState.motionIntensity
                    ) ||
                    0,


                particleIntensity:
                    Number(
                        currentState.particleIntensity
                    ) ||
                    1,


                sprayIntensity:
                    Number(
                        currentState.sprayIntensity
                    ) ||
                    1,


                glass:
                    currentState.glass !==
                    false,


                compact:
                    Boolean(
                        currentState.compact
                    ),


                contrast:
                    Boolean(
                        currentState.contrast
                    ),


                ambientGlow:
                    currentState.ambientGlow !==
                    false,


                glowIntensity:
                    Number(
                        currentState.glowIntensity
                    ) ||
                    0,


                glassBlur:
                    Number(
                        currentState.glassBlur
                    ) ||
                    0,


                sprayExplosion:
                    Number(
                        currentState.sprayExplosion
                    ) ||
                    1,


                primary:
                    getComputedStyle(
                        rootV4
                    )
                        .getPropertyValue(
                            "--primary"
                        )
                        .trim(),


                secondary:
                    getComputedStyle(
                        rootV4
                    )
                        .getPropertyValue(
                            "--secondary"
                        )
                        .trim()

            };

        }


        function saveCustomV4Preset() {

            safeStorage.set(
                "dream.v4.customPreset",
                captureV4Preset()
            );


            unlockAchievement(
                "custom-preset",
                {

                    pt:
                        "Seu primeiro Dream personalizado foi salvo ♡",


                    en:
                        "Your first custom Dream was saved ♡"

                }
            );


            const button =
                $v4(
                    "#v4SavePreset"
                );


            if (
                button
            ) {

                const old =
                    button.textContent;


                button.textContent =
                    app().state
                        ?.currentLanguage ===
                        "en-US"
                        ? "Saved ✓"
                        : "Salvo ✓";


                window.setTimeout(
                    () => {

                        button.textContent =
                            old;

                    },
                    1200
                );

            }

        }


        function applyCustomV4Preset() {

            const preset =
                safeStorage.get(
                    "dream.v4.customPreset",
                    null
                );


            const api =
                app();


            if (
                !preset
            ) {

                const button =
                    $v4(
                        "#v4ApplyPreset"
                    );


                if (
                    button
                ) {

                    const old =
                        button.textContent;


                    button.textContent =
                        api.state
                            ?.currentLanguage ===
                            "en-US"
                            ? "Save one first"
                            : "Salve um primeiro";


                    window.setTimeout(
                        () => {

                            button.textContent =
                                old;

                        },
                        1400
                    );

                }


                return;

            }


            api.setDarkMode?.(
                preset.dark
            );


            api.setCleanMode?.(
                preset.clean
            );


            api.setPerformanceMode?.(
                preset.performance
            );


            api.setParticles?.(
                preset.particles
            );


            api.setAnimations?.(
                preset.animations
            );


            api.setCursorGlow?.(
                preset.cursorGlow
            );


            api.setMotion?.(
                preset.motion
            );


            api.setMotionIntensity?.(
                preset.motionIntensity
            );


            api.setParticleIntensity?.(
                preset.particleIntensity
            );


            api.setSprayIntensity?.(
                preset.sprayIntensity
            );


            api.setGlass?.(
                preset.glass
            );


            api.setCompact?.(
                preset.compact
            );


            api.setContrast?.(
                preset.contrast
            );


            api.setAmbientGlow?.(
                preset.ambientGlow
            );


            api.setGlowIntensity?.(
                preset.glowIntensity
            );


            api.setGlassBlur?.(
                preset.glassBlur
            );


            api.setSprayExplosion?.(
                preset.sprayExplosion
            );


            api.applyCustomColors?.(
                preset.primary,
                preset.secondary
            );


            const button =
                $v4(
                    "#v4ApplyPreset"
                );


            if (
                button
            ) {

                const old =
                    button.textContent;


                button.textContent =
                    api.state
                        ?.currentLanguage ===
                        "en-US"
                        ? "Applied ✓"
                        : "Aplicado ✓";


                window.setTimeout(
                    () => {

                        button.textContent =
                            old;

                    },
                    1200
                );

            }

        }


        function randomizeDreamV4() {

            const api =
                app();


            const moodList = [

                "romantico",

                "sonhador",

                "noturno",

                "energia",

                "calmo"

            ];


            const mood =
                moodList[
                    Math.floor(
                        Math.random() *
                        moodList.length
                    )
                ];


            api.applyMood?.(
                mood
            );


            api.setAnimations?.(
                true
            );


            api.setMotion?.(
                true
            );


            api.setParticles?.(
                true
            );


            api.setMotionIntensity?.(
                2 +
                Math.floor(
                    Math.random() *
                    9
                )
            );


            api.setParticleIntensity?.(
                2 +
                Math.floor(
                    Math.random() *
                    9
                )
            );


            api.setSprayIntensity?.(
                3 +
                Math.floor(
                    Math.random() *
                    8
                )
            );


            api.setGlowIntensity?.(
                3 +
                Math.floor(
                    Math.random() *
                    8
                )
            );


            unlockAchievement(
                "random-dream",
                {

                    pt:
                        "O acaso escolheu um novo Dream ✦",


                    en:
                        "Chance chose a new Dream ✦"

                }
            );

        }


        injectStudioV4Tools();


        /* =====================================================
           QUIZ • CONQUISTA
        ====================================================== */

        const quizResultV4 =
            $v4(
                "#quizResult"
            );


        if (
            quizResultV4
        ) {

            const observer =
                new MutationObserver(
                    () => {

                        if (
                            !quizResultV4.hidden
                        ) {

                            unlockAchievement(
                                "quiz",
                                {

                                    pt:
                                        "Você descobriu o seu Dream Mood ♡",


                                    en:
                                        "You discovered your Dream Mood ♡"

                                }
                            );

                        }

                    }
                );


            observer.observe(
                quizResultV4,
                {

                    attributes:
                        true,


                    attributeFilter: [
                        "hidden"
                    ]

                }
            );

        }


        /* =====================================================
           IDIOMA V4
        ====================================================== */

        function syncV4Language() {

            const english =
                app().state
                    ?.currentLanguage ===
                "en-US";


            const title =
                $v4(
                    "#dreamEntryTitle"
                );


            const description =
                $v4(
                    "#dreamEntryDescription"
                );


            const privacy =
                $v4(
                    ".dream-entry-privacy"
                );


            const enterCopy =
                $v4(
                    "#dreamEnterButton span"
                );


            const userLabel =
                $v4(
                    "#dreamUserLabel"
                );


            const changeCopy =
                $v4(
                    "#dreamChangeName span:last-child"
                );


            const logoutCopy =
                $v4(
                    "#dreamLogout span:last-child"
                );


            const savePreset =
                $v4(
                    "#v4SavePreset"
                );


            const applyPreset =
                $v4(
                    "#v4ApplyPreset"
                );


            const randomPreset =
                $v4(
                    "#v4Randomize"
                );


            if (
                title
            ) {

                title.innerHTML =
                    english
                        ? "Your moment starts <em>here.</em>"
                        : "Seu momento começa <em>aqui.</em>";

            }


            if (
                description
            ) {

                description.textContent =
                    english
                        ? "What should we call you in this experience?"
                        : "Como podemos chamar você nesta experiência?";

            }


            if (
                nameInput
            ) {

                nameInput.placeholder =
                    english
                        ? "Type your name"
                        : "Digite seu nome";

            }


            if (
                enterCopy
            ) {

                enterCopy.textContent =
                    english
                        ? "Enter Dream"
                        : "Entrar no Dream";

            }


            if (
                privacy
            ) {

                privacy.textContent =
                    english
                        ? "Your name is stored only in this browser."
                        : "Seu nome fica salvo somente neste navegador.";

            }


            if (
                userLabel
            ) {

                userLabel.textContent =
                    "Dreamer";

            }


            if (
                changeCopy
            ) {

                changeCopy.textContent =
                    english
                        ? "Change name"
                        : "Trocar nome";

            }


            if (
                logoutCopy
            ) {

                logoutCopy.textContent =
                    english
                        ? "Exit"
                        : "Sair";

            }


            if (
                savePreset
            ) {

                savePreset.textContent =
                    english
                        ? "Save my Dream"
                        : "Salvar meu Dream";

            }


            if (
                applyPreset
            ) {

                applyPreset.textContent =
                    english
                        ? "Apply my Dream"
                        : "Aplicar meu Dream";

            }


            if (
                randomPreset
            ) {

                randomPreset.textContent =
                    english
                        ? "✦ Randomize Dream"
                        : "✦ Randomizar Dream";

            }


            updateUserUI(
                currentUserName
            );


            syncImmersiveButton();

        }


        $$v4(
            "[data-language]"
        ).forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        window.setTimeout(
                            syncV4Language,
                            0
                        );

                    }
                );

            }
        );


        /* =====================================================
           TECLADO / ACESSIBILIDADE V4
        ====================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    if (
                        userRoot?.classList.contains(
                            "open"
                        )
                    ) {

                        closeUserMenu();


                        return;

                    }


                    if (
                        immersive
                    ) {

                        setImmersive(
                            false
                        );


                        return;

                    }

                }


                if (
                    event.key ===
                        "Tab" &&
                    entry &&
                    !entry.hidden
                ) {

                    const focusables =
                        $$v4(
                            `
                                input,
                                button,
                                [href],
                                [tabindex]:not([tabindex="-1"])
                            `,
                            entry
                        ).filter(
                            element =>
                                !element.disabled &&
                                element.offsetParent !==
                                    null
                        );


                    if (
                        !focusables.length
                    ) {

                        return;

                    }


                    const first =
                        focusables[
                            0
                        ];


                    const last =
                        focusables[
                            focusables.length -
                            1
                        ];


                    if (
                        event.shiftKey &&
                        document.activeElement ===
                            first
                    ) {

                        event.preventDefault();


                        last.focus();

                    }

                    else if (
                        !event.shiftKey &&
                        document.activeElement ===
                            last
                    ) {

                        event.preventDefault();


                        first.focus();

                    }

                }

            }
        );


        /* =====================================================
           INICIALIZAÇÃO V4
        ====================================================== */

        buildEntryStars();


        const savedName =
            normalizeName(
                safeStorage.get(
                    "dream.userName",
                    ""
                )
            );


        if (
            savedName
        ) {

            updateUserUI(
                savedName
            );


            entry?.setAttribute(
                "aria-hidden",
                "true"
            );


            if (
                entry
            ) {

                entry.hidden =
                    true;

            }


            bodyV4.classList.remove(
                "dream-entry-open"
            );

        }

        else {

            updateUserUI(
                ""
            );


            openEntry(
                ""
            );

        }


        syncV4Language();


        rootV4.classList.add(
            "dream-v4-ready"
        );


        /* =====================================================
           DREAM V4 API
        ====================================================== */

        window.DreamV4 = {

            version:
                "4.0",


            openEntry,


            closeEntry,


            setImmersive,


            saveCustomPreset:
                saveCustomV4Preset,


            applyCustomPreset:
                applyCustomV4Preset,


            randomize:
                randomizeDreamV4,


            getUserName:
                () =>
                    currentUserName

        };


    }
);


/* =========================================================
   FIM • DREAM AMOR NO AR V4
========================================================= */