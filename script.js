"use strict";

/* =========================================================
   DREAM AMOR NO AR
   SCRIPT.JS • NOVO PROJETO
   PARTE 1/4
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =====================================================
           HELPERS
        ====================================================== */

        const $ = (
            selector,
            parent = document
        ) => {

            return parent.querySelector(
                selector
            );

        };


        const $$ = (
            selector,
            parent = document
        ) => {

            return Array.from(
                parent.querySelectorAll(
                    selector
                )
            );

        };


        const body =
            document.body;


        const root =
            document.documentElement;


        const clamp = (
            value,
            min,
            max
        ) => {

            return Math.min(
                max,
                Math.max(
                    min,
                    Number(value) || 0
                )
            );

        };


        /* =====================================================
           STORAGE
        ====================================================== */

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

                } catch {}

            },


            remove(
                key
            ) {

                try {

                    localStorage.removeItem(
                        key
                    );

                } catch {}

            }

        };


        /* =====================================================
           ELEMENTOS GERAIS
        ====================================================== */

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


        /* =====================================================
           TOAST
        ====================================================== */

        let toastTimer =
            null;


        function showToast(
            message
        ) {

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
                    2400
                );

        }


        /* =====================================================
           LOADER
        ====================================================== */

        let loaderFinished =
            false;


        function finishLoader() {

            if (
                !loader ||
                loaderFinished
            ) {
                return;
            }


            loaderFinished =
                true;


            loader.classList.add(
                "hide"
            );


            setTimeout(
                () => {

                    if (loader) {

                        loader.style.display =
                            "none";

                    }

                },
                700
            );

        }


        window.addEventListener(
            "load",
            () => {

                setTimeout(
                    finishLoader,
                    350
                );

            }
        );


        /*
           Failsafe:
           o site nunca fica preso no loader.
        */

        setTimeout(
            finishLoader,
            3500
        );


        /* =====================================================
           SCROLL
        ====================================================== */

        function updateScrollUI() {

            const scrollTop =
                window.scrollY ||
                document.documentElement.scrollTop ||
                0;


            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;


            const progress =
                documentHeight > 0
                    ? clamp(
                        scrollTop /
                        documentHeight *
                        100,
                        0,
                        100
                    )
                    : 0;


            if (scrollProgress) {

                scrollProgress.style.width =
                    `${progress}%`;

            }


            header?.classList.toggle(
                "scrolled",
                scrollTop > 40
            );


            backTop?.classList.toggle(
                "show",
                scrollTop > 550
            );

        }


        window.addEventListener(
            "scroll",
            updateScrollUI,
            {
                passive: true
            }
        );


        updateScrollUI();


        /* =====================================================
           VOLTAR AO TOPO
        ====================================================== */

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
           MENU MOBILE
        ====================================================== */

        function closeMobileMenu() {

            menu?.classList.remove(
                "open"
            );


            menuMobile?.setAttribute(
                "aria-expanded",
                "false"
            );

        }


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
                    String(
                        Boolean(opened)
                    )
                );

            }
        );


        menu?.addEventListener(
            "click",
            event => {

                const link =
                    event.target.closest(
                        "a"
                    );


                if (!link) {
                    return;
                }


                closeMobileMenu();

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


                closeMobileMenu();

            }
        );


        /* =====================================================
           LINKS INTERNOS
        ====================================================== */

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
        ====================================================== */

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
                        threshold:
                            0.12,

                        rootMargin:
                            "0px 0px -45px 0px"
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
        ====================================================== */

        $$("[data-meter]").forEach(
            meter => {

                const targetValue =
                    clamp(
                        meter.dataset.meter,
                        0,
                        100
                    );


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


                                        meter.style.width =
                                            `${targetValue}%`;


                                        meterObserver.disconnect();

                                    }
                                );

                            },
                            {
                                threshold:
                                    0.3
                            }
                        );


                    meterObserver.observe(
                        meter
                    );

                } else {

                    meter.style.width =
                        `${targetValue}%`;

                }

            }
        );


        $$(
            "[data-feeling]"
        ).forEach(
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


        /* =====================================================
           MODAL ENGINE
        ====================================================== */

        let lastFocusedElement =
            null;


        function getOpenLayers() {

            return $$(
                ".modal.open, .lightbox.open"
            );

        }


        function updateModalBodyState() {

            body.classList.toggle(
                "modal-open",
                getOpenLayers().length > 0
            );

        }


        function openModal(
            modal
        ) {

            if (!modal) {

                console.error(
                    "Dream: modal não encontrado."
                );

                return;

            }


            lastFocusedElement =
                document.activeElement;


            modal.classList.add(
                "open"
            );


            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            updateModalBodyState();


            const closeButton =
                $(
                    "[data-modal-close], .modal-close",
                    modal
                );


            requestAnimationFrame(
                () => {

                    closeButton?.focus?.();

                }
            );

        }


        function closeModal(
            modal
        ) {

            if (!modal) {
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


            if (
                lastFocusedElement instanceof HTMLElement
            ) {

                lastFocusedElement.focus?.();

            }

        }


        function closeAllModals() {

            $$(".modal.open").forEach(
                modal => {

                    closeModal(
                        modal
                    );

                }
            );

        }


        /* =====================================================
           CONHECER / VER PRODUTO
           SISTEMA ÚNICO
        ====================================================== */

        function openProductModal() {

            if (!productModal) {

                console.error(
                    "Dream: #productModal não existe."
                );


                showToast(
                    "Não foi possível abrir o produto."
                );


                return;

            }


            openModal(
                productModal
            );

        }


        function closeProductModal() {

            closeModal(
                productModal
            );

        }


        /*
           Todos os botões do produto usam:
           data-modal-open="productModal"
        */

        document.addEventListener(
            "click",
            event => {

                const openTrigger =
                    event.target.closest(
                        "[data-modal-open]"
                    );


                if (!openTrigger) {
                    return;
                }


                const modalId =
                    openTrigger.dataset.modalOpen;


                if (!modalId) {
                    return;
                }


                const targetModal =
                    document.getElementById(
                        modalId
                    );


                if (!targetModal) {

                    console.error(
                        `Dream: #${modalId} não encontrado.`
                    );

                    return;

                }


                event.preventDefault();


                openModal(
                    targetModal
                );

            }
        );


        /*
           Fechamento pelo X e pelo fundo.
        */

        document.addEventListener(
            "click",
            event => {

                const closeTrigger =
                    event.target.closest(
                        "[data-modal-close]"
                    );


                if (!closeTrigger) {
                    return;
                }


                const modal =
                    closeTrigger.closest(
                        ".modal"
                    );


                if (!modal) {
                    return;
                }


                event.preventDefault();


                closeModal(
                    modal
                );

            }
        );


        /*
           Clique direto na área externa,
           caso exista espaço fora do card.
        */

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
           FAVORITO
        ====================================================== */

        const favoriteButton =
            $("#favoriteButton");


        const favoriteModal =
            $("#favoriteModal");


        let favorite =
            storage.get(
                "dream.favorite",
                "false"
            ) === "true";


        function renderFavorite() {

            const text =
                favorite
                    ? "♥ Favoritado"
                    : "♡ Favoritar";


            [
                favoriteButton,
                favoriteModal
            ].forEach(
                button => {

                    if (!button) {
                        return;
                    }


                    button.classList.toggle(
                        "active",
                        favorite
                    );


                    button.setAttribute(
                        "aria-pressed",
                        String(favorite)
                    );


                    button.textContent =
                        text;

                }
            );

        }


        function toggleFavorite() {

            favorite =
                !favorite;


            storage.set(
                "dream.favorite",
                favorite
            );


            renderFavorite();


            showToast(
                favorite
                    ? "Dream adicionado aos favoritos ♡"
                    : "Dream removido dos favoritos"
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


        /* =====================================================
           PARTÍCULAS DE FUNDO
        ====================================================== */

        const particles =
            $("#particles");


        function createBackgroundParticles() {

            if (!particles) {
                return;
            }


            particles.innerHTML =
                "";


            if (
                body.classList.contains(
                    "no-particles"
                )
            ) {
                return;
            }


            const range =
                $("#particleRange");


            const intensity =
                clamp(
                    range?.value ??
                    storage.get(
                        "dream.particleIntensity",
                        100
                    ),
                    0,
                    150
                );


            const baseCount =
                window.innerWidth <= 600
                    ? 11
                    : 23;


            const count =
                Math.round(
                    baseCount *
                    intensity /
                    100
                );


            const symbols = [
                "♡",
                "✦",
                "✧",
                "·"
            ];


            for (
                let index = 0;
                index < count;
                index++
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
                        7 +
                        Math.random() *
                        13
                    }px`;


                particle.style.setProperty(
                    "--particle-duration",
                    `${
                        9 +
                        Math.random() *
                        13
                    }s`
                );


                particle.style.setProperty(
                    "--particle-delay",
                    `${
                        -Math.random() *
                        18
                    }s`
                );


                particles.appendChild(
                    particle
                );

            }

        }


        createBackgroundParticles();


        /* =====================================================
           CURSOR GLOW
        ====================================================== */

        const cursorGlow =
            $("#cursorGlow");


        let targetCursorX =
            window.innerWidth / 2;


        let targetCursorY =
            window.innerHeight / 2;


        let cursorX =
            targetCursorX;


        let cursorY =
            targetCursorY;


        document.addEventListener(
            "pointermove",
            event => {

                targetCursorX =
                    event.clientX;


                targetCursorY =
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
                    "no-cursor-glow"
                )
            ) {

                cursorX +=
                    (
                        targetCursorX -
                        cursorX
                    ) *
                    0.1;


                cursorY +=
                    (
                        targetCursorY -
                        cursorY
                    ) *
                    0.1;


                cursorGlow.style.left =
                    `${cursorX}px`;


                cursorGlow.style.top =
                    `${cursorY}px`;

            }


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        /* =====================================================
           SPRAY
        ====================================================== */

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


        let sprayBusy =
            false;


        let sprayCount =
            Number(
                storage.get(
                    "dream.sprayCount",
                    0
                )
            ) || 0;


        function renderSprayCount() {

            if (sprayCounter) {

                sprayCounter.textContent =
                    sprayCount;

            }

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


        function getSprayIntensity() {

            return clamp(
                $("#sprayIntensityRange")?.value ??
                storage.get(
                    "dream.sprayIntensity",
                    100
                ),
                40,
                160
            ) / 100;

        }


        function createMist() {

            if (!sprayArea) {
                return;
            }


            const intensity =
                getSprayIntensity();


            const amount =
                Math.round(
                    (
                        window.innerWidth <= 600
                            ? 24
                            : 44
                    ) *
                    intensity
                );


            for (
                let index = 0;
                index < amount;
                index++
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );


                particle.className =
                    "spray-mist";


                const horizontal =
                    (
                        Math.random() -
                        0.5
                    ) *
                    310 *
                    intensity;


                const vertical =
                    -(
                        35 +
                        Math.random() *
                        220 *
                        intensity
                    );


                const size =
                    (
                        3 +
                        Math.random() *
                        9
                    ) *
                    Math.max(
                        0.75,
                        intensity
                    );


                particle.style.setProperty(
                    "--mist-x",
                    `${horizontal}px`
                );


                particle.style.setProperty(
                    "--mist-y",
                    `${vertical}px`
                );


                particle.style.setProperty(
                    "--mist-size",
                    `${size}px`
                );


                particle.style.setProperty(
                    "--mist-blur",
                    `${
                        0.7 +
                        Math.random() *
                        2.5
                    }px`
                );


                particle.style.setProperty(
                    "--mist-duration",
                    `${
                        0.75 +
                        Math.random() *
                        0.65
                    }s`
                );


                sprayArea.appendChild(
                    particle
                );


                setTimeout(
                    () => {

                        particle.remove();

                    },
                    1700
                );

            }

        }


        function createSpraySymbols() {

            if (!sprayArea) {
                return;
            }


            const intensity =
                getSprayIntensity();


            const symbols = [
                "♡",
                "✦",
                "✧"
            ];


            const amount =
                Math.max(
                    4,
                    Math.round(
                        7 *
                        intensity
                    )
                );


            for (
                let index = 0;
                index < amount;
                index++
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


                symbol.style.setProperty(
                    "--symbol-x",
                    `${
                        (
                            Math.random() -
                            0.5
                        ) *
                        210 *
                        intensity
                    }px`
                );


                symbol.style.setProperty(
                    "--symbol-y",
                    `${
                        -50 -
                        Math.random() *
                        145 *
                        intensity
                    }px`
                );


                symbol.style.setProperty(
                    "--symbol-rotate",
                    `${
                        -100 +
                        Math.random() *
                        200
                    }deg`
                );


                sprayArea.appendChild(
                    symbol
                );


                setTimeout(
                    () => {

                        symbol.remove();

                    },
                    1500
                );

            }

        }


        async function playSpraySound() {

            const enabled =
                $("#spraySoundToggle")
                    ?.checked ??
                true;


            if (
                !enabled ||
                !sprayAudio
            ) {
                return;
            }


            try {

                sprayAudio.pause();

                sprayAudio.currentTime =
                    0;


                sprayAudio.volume =
                    0.72;


                await sprayAudio.play();


                /*
                   Se o MP3 tiver mais de um spray,
                   corta rapidamente.
                */

                setTimeout(
                    () => {

                        try {

                            sprayAudio.pause();

                            sprayAudio.currentTime =
                                0;

                        } catch {}

                    },
                    500
                );

            } catch {}

        }


        function sprayHaptic() {

            const enabled =
                $("#hapticToggle")
                    ?.checked ??
                true;


            if (
                enabled &&
                navigator.vibrate
            ) {

                navigator.vibrate(
                    [
                        18,
                        18,
                        10
                    ]
                );

            }

        }


        async function sprayDream() {

            if (
                sprayBusy ||
                !sprayButton
            ) {
                return;
            }


            sprayBusy =
                true;


            sprayButton.setAttribute(
                "aria-busy",
                "true"
            );


            restartAnimation(
                sprayWave,
                "active"
            );


            restartAnimation(
                sprayGlow,
                "active"
            );


            heroProduct?.classList.remove(
                "spraying"
            );


            productHalo?.classList.remove(
                "spraying"
            );


            sprayButton.classList.remove(
                "spraying"
            );


            const counterCard =
                sprayCounter?.closest(
                    ".spray-counter-card"
                );


            counterCard?.classList.remove(
                "pulse"
            );


            void sprayButton.offsetWidth;


            heroProduct?.classList.add(
                "spraying"
            );


            productHalo?.classList.add(
                "spraying"
            );


            sprayButton.classList.add(
                "spraying"
            );


            counterCard?.classList.add(
                "pulse"
            );


            createMist();

            createSpraySymbols();

            playSpraySound();

            sprayHaptic();


            sprayCount++;


            storage.set(
                "dream.sprayCount",
                sprayCount
            );


            renderSprayCount();


            setTimeout(
                () => {

                    heroProduct?.classList.remove(
                        "spraying"
                    );


                    productHalo?.classList.remove(
                        "spraying"
                    );


                    sprayButton.classList.remove(
                        "spraying"
                    );


                    counterCard?.classList.remove(
                        "pulse"
                    );


                    sprayButton.removeAttribute(
                        "aria-busy"
                    );


                    sprayBusy =
                        false;

                },
                760
            );

        }


        sprayButton?.addEventListener(
            "click",
            sprayDream
        );


        renderSprayCount();


        /* =====================================================
           3D DO FRASCO
        ====================================================== */

        const productTilt =
            $("#productTilt");


        function resetProductTilt() {

            if (!productTilt) {
                return;
            }


            productTilt.style.transform =
                "";

        }


        productTilt?.addEventListener(
            "pointermove",
            event => {

                if (
                    body.classList.contains(
                        "no-motion"
                    ) ||
                    body.classList.contains(
                        "performance-mode"
                    )
                ) {
                    return;
                }


                if (
                    !window.matchMedia(
                        "(pointer:fine)"
                    ).matches
                ) {
                    return;
                }


                const rect =
                    productTilt.getBoundingClientRect();


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


                const intensity =
                    clamp(
                        $("#motionRange")?.value ??
                        storage.get(
                            "dream.motionIntensity",
                            100
                        ),
                        0,
                        150
                    ) / 100;


                productTilt.style.transform =
                    `
                        perspective(900px)
                        rotateX(${y * -9 * intensity}deg)
                        rotateY(${x * 11 * intensity}deg)
                        translateY(-4px)
                    `;

            }
        );


        productTilt?.addEventListener(
            "pointerleave",
            resetProductTilt
        );


        /* =====================================================
           NOTAS OLFATIVAS
        ====================================================== */

        const noteData = {

            bergamota: {

                icon:
                    "🍊",

                title:
                    "Bergamota",

                text:
                    "Uma abertura cítrica luminosa, fresca e vibrante."

            },


            laranja: {

                icon:
                    "🍊",

                title:
                    "Laranja",

                text:
                    "Uma nota cítrica suculenta que acrescenta brilho à saída."

            },


            mandarina: {

                icon:
                    "🍊",

                title:
                    "Mandarina",

                text:
                    "Fresca e levemente adocicada, deixa a abertura mais alegre."

            },


            limao: {

                icon:
                    "🍋",

                title:
                    "Limão",

                text:
                    "Uma faceta cítrica limpa e vibrante que reforça o frescor."

            },


            cassis: {

                icon:
                    "🫐",

                title:
                    "Cassis",

                text:
                    "Frutado intenso com contraste entre doçura e leve acidez."

            },


            maca: {

                icon:
                    "🍎",

                title:
                    "Maçã",

                text:
                    "Uma nota crocante e delicada que adiciona frescor frutado."

            },


            rosa: {

                icon:
                    "🌹",

                title:
                    "Rosa",

                text:
                    "Floral romântico e elegante que traz suavidade ao coração."

            },


            tilia: {

                icon:
                    "🌼",

                title:
                    "Tília",

                text:
                    "Uma nuance floral macia, confortável e delicadamente arejada."

            },


            freesia: {

                icon:
                    "🌸",

                title:
                    "Frésia",

                text:
                    "Floral transparente e delicado que ilumina o coração da fragrância."

            },


            lotus: {

                icon:
                    "🪷",

                title:
                    "Flor de Lótus",

                text:
                    "Uma impressão floral aquosa, calma e suave."

            },


            gardenia: {

                icon:
                    "🌼",

                title:
                    "Gardênia",

                text:
                    "Floral cremoso e elegante que acrescenta presença."

            },


            pessego: {

                icon:
                    "🍑",

                title:
                    "Pêssego",

                text:
                    "Frutado macio e aveludado que traz uma doçura confortável."

            },


            ambar: {

                icon:
                    "✦",

                title:
                    "Âmbar",

                text:
                    "Quente e envolvente, trazendo profundidade à base."

            },


            sandalo: {

                icon:
                    "🪵",

                title:
                    "Sândalo",

                text:
                    "Um amadeirado cremoso que sustenta a fragrância com elegância."

            },


            baunilha: {

                icon:
                    "☁",

                title:
                    "Baunilha",

                text:
                    "Doce e confortável, criando uma sensação macia e acolhedora."

            },


            tonka: {

                icon:
                    "♡",

                title:
                    "Fava Tonka",

                text:
                    "Uma nuance quente, adocicada e cremosa."

            },


            musk: {

                icon:
                    "☾",

                title:
                    "Musk",

                text:
                    "Macio e confortável, deixa uma assinatura limpa e delicada."

            }

        };


        function openNote(
            key
        ) {

            const note =
                noteData[key];


            if (
                !note ||
                !noteModal
            ) {
                return;
            }


            const icon =
                $("#noteModalIcon");


            const title =
                $("#noteModalTitle");


            const text =
                $("#noteModalText");


            if (icon) {

                icon.textContent =
                    note.icon;

            }


            if (title) {

                title.textContent =
                    note.title;

            }


            if (text) {

                text.textContent =
                    note.text;

            }


            openModal(
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


                if (!noteButton) {
                    return;
                }


                event.preventDefault();


                openNote(
                    noteButton.dataset.note
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


                if (!closeButton) {
                    return;
                }


                event.preventDefault();


                closeModal(
                    noteModal
                );

            }
        );


        /* =====================================================
           TIMELINE
        ====================================================== */

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
                    1,

                title:
                    "Primeiros minutos",

                text:
                    "Uma abertura fresca, luminosa e delicada."

            },


            {

                max:
                    3,

                title:
                    "Coração floral",

                text:
                    "O lado floral começa a ganhar destaque e deixa a fragrância mais romântica."

            },


            {

                max:
                    6,

                title:
                    "Conforto envolvente",

                text:
                    "A fragrância fica mais macia, confortável e envolvente."

            },


            {

                max:
                    Infinity,

                title:
                    "Assinatura final",

                text:
                    "Uma presença suave permanece na pele com um toque delicado."

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
                    timelineStages.length -
                    1
                ];


            if (timelineHour) {

                timelineHour.textContent =
                    value === 0
                        ? "Agora"
                        : `${value}h`;

            }


            if (timelineTitle) {

                timelineTitle.textContent =
                    stage.title;

            }


            if (timelineText) {

                timelineText.textContent =
                    stage.text;

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


        updateTimeline();


        /* =====================================================
           EXPOSIÇÃO SEGURA PARA PRÓXIMAS PARTES
        ====================================================== */

        window.DreamApp = {

            $,
            $$,

            storage,

            clamp,

            showToast,

            openModal,

            closeModal,

            openProductModal,

            closeProductModal,

            closeAllModals,

            createBackgroundParticles,

            sprayDream

        };
                /* =====================================================
           MOODS
        ====================================================== */

        const moods = {

            romantico: {

                primary:
                    "#e786b3",

                secondary:
                    "#9c6ce0",

                primaryRgb:
                    "231, 134, 179",

                secondaryRgb:
                    "156, 108, 224",

                toast:
                    "Mood Romântico aplicado ♡"

            },


            sonhador: {

                primary:
                    "#a78bfa",

                secondary:
                    "#60a5fa",

                primaryRgb:
                    "167, 139, 250",

                secondaryRgb:
                    "96, 165, 250",

                toast:
                    "Mood Sonhador aplicado ☾"

            },


            noturno: {

                primary:
                    "#8b5cf6",

                secondary:
                    "#4338ca",

                primaryRgb:
                    "139, 92, 246",

                secondaryRgb:
                    "67, 56, 202",

                toast:
                    "Mood Noturno aplicado ✧"

            },


            energia: {

                primary:
                    "#fb7185",

                secondary:
                    "#f59e0b",

                primaryRgb:
                    "251, 113, 133",

                secondaryRgb:
                    "245, 158, 11",

                toast:
                    "Mood Energia aplicado ✦"

            },


            calmo: {

                primary:
                    "#45c4aa",

                secondary:
                    "#5285c5",

                primaryRgb:
                    "69, 196, 170",

                secondaryRgb:
                    "82, 133, 197",

                toast:
                    "Mood Calmo aplicado ☁"

            }

        };


        function setRootColors(
            primary,
            secondary,
            primaryRgb,
            secondaryRgb
        ) {

            root.style.setProperty(
                "--primary",
                primary
            );


            root.style.setProperty(
                "--secondary",
                secondary
            );


            if (primaryRgb) {

                root.style.setProperty(
                    "--primary-rgb",
                    primaryRgb
                );

            }


            if (secondaryRgb) {

                root.style.setProperty(
                    "--secondary-rgb",
                    secondaryRgb
                );

            }


            const themeMeta =
                $(
                    'meta[name="theme-color"]'
                );


            themeMeta?.setAttribute(
                "content",
                primary
            );

        }


        function hexToRgbString(
            hex
        ) {

            let clean =
                String(hex)
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
                        .split("")
                        .map(
                            char =>
                                char + char
                        )
                        .join("");

            }


            if (
                !/^[0-9a-f]{6}$/i.test(
                    clean
                )
            ) {

                return null;

            }


            const number =
                parseInt(
                    clean,
                    16
                );


            const red =
                number >> 16;


            const green =
                number >> 8 &
                255;


            const blue =
                number &
                255;


            return `${red}, ${green}, ${blue}`;

        }


        function applyMood(
            moodName,
            notify = true,
            save = true
        ) {

            const mood =
                moods[
                    moodName
                ];


            if (!mood) {
                return;
            }


            body.dataset.mood =
                moodName;


            setRootColors(
                mood.primary,
                mood.secondary,
                mood.primaryRgb,
                mood.secondaryRgb
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


            if (
                $("#primaryColor")
            ) {

                $("#primaryColor").value =
                    mood.primary;

            }


            if (
                $("#secondaryColor")
            ) {

                $("#secondaryColor").value =
                    mood.secondary;

            }


            if (save) {

                storage.set(
                    "dream.mood",
                    moodName
                );


                storage.set(
                    "dream.primary",
                    mood.primary
                );


                storage.set(
                    "dream.secondary",
                    mood.secondary
                );

            }


            if (notify) {

                showToast(
                    mood.toast
                );

            }

        }


        document.addEventListener(
            "click",
            event => {

                const moodButton =
                    event.target.closest(
                        "[data-mood]"
                    );


                if (!moodButton) {
                    return;
                }


                event.preventDefault();


                applyMood(
                    moodButton.dataset.mood
                );

            }
        );


        /* =====================================================
           DREAM MOMENT
        ====================================================== */

        const dreamMomentTitle =
            $("#dreamMomentTitle");


        const dreamMomentText =
            $("#dreamMomentText");


        const dreamMomentIcon =
            $(".dream-moment-icon");


        const newDreamMoment =
            $("#newDreamMoment");


        const dreamMoments = [

            {

                icon:
                    "♡",

                title:
                    "O amor mora nos detalhes.",

                text:
                    "Alguns momentos ficam especiais justamente porque parecem simples."

            },


            {

                icon:
                    "✦",

                title:
                    "Transforme o comum.",

                text:
                    "Uma fragrância pode fazer um instante comum virar uma lembrança."

            },


            {

                icon:
                    "☾",

                title:
                    "Leve o Dream com você.",

                text:
                    "Crie sua própria atmosfera e deixe o momento falar por si."

            },


            {

                icon:
                    "☁",

                title:
                    "Desacelere um pouco.",

                text:
                    "Nem todo momento especial precisa ser planejado."

            },


            {

                icon:
                    "✿",

                title:
                    "Faça do momento algo seu.",

                text:
                    "Uma pequena escolha pode mudar completamente a sensação de um dia."

            },


            {

                icon:
                    "♡",

                title:
                    "Deixe uma lembrança no ar.",

                text:
                    "Algumas memórias começam com uma sensação que a gente não esquece."

            }

        ];


        let currentDreamMoment =
            -1;


        function renderDreamMoment(
            index
        ) {

            const moment =
                dreamMoments[
                    index
                ];


            if (!moment) {
                return;
            }


            if (dreamMomentIcon) {

                dreamMomentIcon.textContent =
                    moment.icon;

            }


            if (dreamMomentTitle) {

                dreamMomentTitle.textContent =
                    moment.title;

            }


            if (dreamMomentText) {

                dreamMomentText.textContent =
                    moment.text;

            }


            const card =
                dreamMomentTitle?.closest(
                    ".dream-moment-card"
                );


            if (card) {

                card.classList.remove(
                    "moment-changing"
                );


                void card.offsetWidth;


                card.classList.add(
                    "moment-changing"
                );


                setTimeout(
                    () => {

                        card.classList.remove(
                            "moment-changing"
                        );

                    },
                    650
                );

            }

        }


        function nextDreamMoment() {

            if (
                !dreamMoments.length
            ) {
                return;
            }


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

            } else {

                next =
                    0;

            }


            currentDreamMoment =
                next;


            renderDreamMoment(
                currentDreamMoment
            );

        }


        newDreamMoment?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                nextDreamMoment();

            }
        );


        /* =====================================================
           CENÁRIOS
        ====================================================== */

        const dreamSceneBg =
            $(".dream-scene-bg");


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

                title:
                    "Noite estrelada.",

                text:
                    "Uma atmosfera sonhadora, misteriosa e cheia de possibilidades.",

                background:
                    `
                    radial-gradient(
                        circle at 18% 30%,
                        rgba(104,119,255,.38),
                        transparent 38%
                    ),
                    radial-gradient(
                        circle at 78% 65%,
                        rgba(145,89,255,.28),
                        transparent 42%
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

                title:
                    "Jardim Dream.",

                text:
                    "Floral, romântico e delicado para deixar o momento ainda mais especial.",

                background:
                    `
                    radial-gradient(
                        circle at 20% 65%,
                        rgba(251,113,133,.32),
                        transparent 38%
                    ),
                    radial-gradient(
                        circle at 80% 30%,
                        rgba(245,158,11,.23),
                        transparent 42%
                    ),
                    linear-gradient(
                        135deg,
                        #1b1019,
                        #39211e
                    )
                    `

            },


            energia: {

                icon:
                    "✦",

                title:
                    "Dream Energy.",

                text:
                    "Uma atmosfera vibrante, intensa e cheia de personalidade.",

                background:
                    `
                    radial-gradient(
                        circle at 20% 50%,
                        rgba(69,196,170,.30),
                        transparent 40%
                    ),
                    radial-gradient(
                        circle at 80% 40%,
                        rgba(82,133,197,.32),
                        transparent 42%
                    ),
                    linear-gradient(
                        135deg,
                        #101a1c,
                        #172d35
                    )
                    `

            }

        };


        function applyScene(
            sceneName,
            save = true
        ) {

            const scene =
                scenes[
                    sceneName
                ];


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


            if (sceneResultIcon) {

                sceneResultIcon.textContent =
                    scene.icon;

            }


            if (sceneResultTitle) {

                sceneResultTitle.textContent =
                    scene.title;

            }


            if (sceneResultText) {

                sceneResultText.textContent =
                    scene.text;

            }


            if (save) {

                storage.set(
                    "dream.scene",
                    sceneName
                );

            }

        }


        document.addEventListener(
            "click",
            event => {

                const sceneButton =
                    event.target.closest(
                        "[data-scene]"
                    );


                if (!sceneButton) {
                    return;
                }


                event.preventDefault();


                applyScene(
                    sceneButton.dataset.scene
                );

            }
        );


        /* =====================================================
           3D DOS CARDS
        ====================================================== */

        const motionCards =
            $$(
                ".moment-card, .mood-showcase-card"
            );


        function applyCardTilt(
            card,
            event
        ) {

            if (
                body.classList.contains(
                    "no-motion"
                ) ||
                body.classList.contains(
                    "performance-mode"
                )
            ) {
                return;
            }


            if (
                !window.matchMedia(
                    "(pointer:fine)"
                ).matches
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


            const intensity =
                clamp(
                    $("#motionRange")?.value ??
                    storage.get(
                        "dream.motionIntensity",
                        100
                    ),
                    0,
                    150
                ) /
                100;


            card.style.transform =
                `
                perspective(800px)
                translateY(-5px)
                rotateX(${y * -5 * intensity}deg)
                rotateY(${x * 6 * intensity}deg)
                `;

        }


        motionCards.forEach(
            card => {

                card.addEventListener(
                    "pointermove",
                    event => {

                        applyCardTilt(
                            card,
                            event
                        );

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


        /* =====================================================
           GALERIA
        ====================================================== */

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


        let galleryDragging =
            false;


        let galleryMoved =
            false;


        let galleryStartX =
            0;


        let galleryStartScroll =
            0;


        let galleryScrollTimer =
            null;


        function updateGalleryCounter() {

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

        }


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
                        `Ir para imagem ${index + 1}`
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


        function updateGalleryDots() {

            $$(".gallery-dot").forEach(
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


        function getGalleryItemLeft(
            item
        ) {

            if (
                !galleryTrack ||
                !item
            ) {
                return 0;
            }


            return item.offsetLeft -
                galleryTrack.offsetLeft;

        }


        function goToGallery(
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
                galleryItems[
                    galleryIndex
                ];


            galleryTrack.scrollTo({

                left:
                    getGalleryItemLeft(
                        item
                    ),

                behavior:
                    smooth &&
                    !body.classList.contains(
                        "no-animations"
                    )
                        ? "smooth"
                        : "auto"

            });


            updateGalleryCounter();

            updateGalleryDots();

        }


        function detectGalleryIndex() {

            if (
                !galleryTrack ||
                !galleryItems.length
            ) {
                return;
            }


            const scrollLeft =
                galleryTrack.scrollLeft;


            let closestIndex =
                0;


            let closestDistance =
                Infinity;


            galleryItems.forEach(
                (
                    item,
                    index
                ) => {

                    const distance =
                        Math.abs(
                            getGalleryItemLeft(
                                item
                            ) -
                            scrollLeft
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


        galleryPrev?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                goToGallery(
                    galleryIndex - 1
                );

            }
        );


        galleryNext?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                goToGallery(
                    galleryIndex + 1
                );

            }
        );


        galleryTrack?.addEventListener(
            "scroll",
            () => {

                clearTimeout(
                    galleryScrollTimer
                );


                galleryScrollTimer =
                    setTimeout(
                        detectGalleryIndex,
                        90
                    );

            },
            {
                passive: true
            }
        );


        /* =====================================================
           ARRASTAR GALERIA COM MOUSE
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


                const difference =
                    event.clientX -
                    galleryStartX;


                if (
                    Math.abs(
                        difference
                    ) >
                    5
                ) {

                    galleryMoved =
                        true;

                }


                galleryTrack.scrollLeft =
                    galleryStartScroll -
                    difference;

            }
        );


        function finishGalleryDrag() {

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


            detectGalleryIndex();


            if (
                galleryItems.length
            ) {

                goToGallery(
                    galleryIndex
                );

            }


            setTimeout(
                () => {

                    galleryMoved =
                        false;

                },
                120
            );

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
           AUTOPLAY GALERIA
        ====================================================== */

        function renderGalleryAutoplay() {

            if (!galleryAutoplay) {
                return;
            }


            const active =
                Boolean(
                    galleryTimer
                );


            galleryAutoplay.classList.toggle(
                "active",
                active
            );


            galleryAutoplay.textContent =
                active
                    ? "❚❚ Pausar"
                    : "▶ Autoplay";

        }


        function stopGalleryAutoplay() {

            if (galleryTimer) {

                clearInterval(
                    galleryTimer
                );

            }


            galleryTimer =
                null;


            renderGalleryAutoplay();

        }


        function startGalleryAutoplay() {

            if (
                galleryTimer ||
                galleryItems.length <=
                1
            ) {
                return;
            }


            galleryTimer =
                setInterval(
                    () => {

                        goToGallery(
                            galleryIndex + 1
                        );

                    },
                    3800
                );


            renderGalleryAutoplay();

        }


        galleryAutoplay?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                if (galleryTimer) {

                    stopGalleryAutoplay();

                } else {

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


            if (!item) {
                return;
            }


            const image =
                $("img", item);


            const title =
                $("h3", item);


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
                    title?.textContent?.trim() ||
                    image?.alt ||
                    "Dream";

            }


            if (lightboxCounter) {

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


            lastFocusedElement =
                document.activeElement;


            lightbox.classList.add(
                "open"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            updateModalBodyState();


            requestAnimationFrame(
                () => {

                    lightboxClose?.focus?.();

                }
            );

        }


        function closeLightbox() {

            if (!lightbox) {
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
                lastFocusedElement instanceof
                HTMLElement
            ) {

                lastFocusedElement.focus?.();

            }

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


        function previousLightbox() {

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
            (
                item,
                index
            ) => {

                item.addEventListener(
                    "click",
                    event => {

                        if (
                            galleryMoved
                        ) {
                            return;
                        }


                        const trigger =
                            event.target.closest(
                                ".gallery-open"
                            );


                        /*
                           Clique no botão explorar
                           ou diretamente na imagem/card.
                        */

                        if (
                            trigger ||
                            event.target.closest(
                                ".gallery-item"
                            )
                        ) {

                            event.preventDefault();


                            openLightbox(
                                index
                            );

                        }

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
            event => {

                event.preventDefault();


                closeLightbox();

            }
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


        /* =====================================================
           INICIALIZA GALERIA
        ====================================================== */

        createGalleryDots();

        updateGalleryCounter();

        updateGalleryDots();

        renderGalleryAutoplay();


        /* =====================================================
           SECTION INDICATOR
        ====================================================== */

        const trackedSections =
            $$(".section-track[id]");


        function updateSectionIndicator() {

            if (
                !sectionIndicator ||
                !trackedSections.length
            ) {
                return;
            }


            const position =
                window.scrollY +
                window.innerHeight *
                0.38;


            let currentSection =
                trackedSections[0];


            trackedSections.forEach(
                section => {

                    if (
                        section.offsetTop <=
                        position
                    ) {

                        currentSection =
                            section;

                    }

                }
            );


            const index =
                trackedSections.indexOf(
                    currentSection
                );


            const name =
                currentSection.dataset
                    .sectionName ||
                currentSection.id;


            sectionIndicator.innerHTML =
                `
                    <span>
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    ${name}
                `;


            $$("[data-nav]").forEach(
                link => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    link.classList.toggle(
                        "active",
                        href ===
                        `#${currentSection.id}`
                    );

                }
            );

        }


        window.addEventListener(
            "scroll",
            updateSectionIndicator,
            {
                passive: true
            }
        );


        updateSectionIndicator();


        /* =====================================================
           EXTENDE API GLOBAL
        ====================================================== */

        Object.assign(
            window.DreamApp,
            {

                moods,

                applyMood,

                scenes,

                applyScene,

                nextDreamMoment,

                goToGallery,

                startGalleryAutoplay,

                stopGalleryAutoplay,

                openLightbox,

                closeLightbox

            }
        );
                /* =====================================================
           QUIZ
        ====================================================== */

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

        const shareQuizResult =
            $("#shareQuizResult");


        const quizQuestions = [

            {

                question:
                    "Qual momento combina mais com você?",

                options: [

                    {
                        text:
                            "♡ Um encontro romântico",
                        mood:
                            "romantico"
                    },

                    {
                        text:
                            "☾ Uma noite olhando o céu",
                        mood:
                            "sonhador"
                    },

                    {
                        text:
                            "✦ Uma festa cheia de energia",
                        mood:
                            "energia"
                    },

                    {
                        text:
                            "☁ Um momento tranquilo",
                        mood:
                            "calmo"
                    }

                ]

            },


            {

                question:
                    "Qual sensação você procura?",

                options: [

                    {
                        text:
                            "♡ Romance",
                        mood:
                            "romantico"
                    },

                    {
                        text:
                            "☾ Imaginação",
                        mood:
                            "sonhador"
                    },

                    {
                        text:
                            "✦ Intensidade",
                        mood:
                            "energia"
                    },

                    {
                        text:
                            "☁ Conforto",
                        mood:
                            "calmo"
                    }

                ]

            },


            {

                question:
                    "Escolha um símbolo Dream.",

                options: [

                    {
                        text:
                            "♡ Coração",
                        mood:
                            "romantico"
                    },

                    {
                        text:
                            "☾ Lua",
                        mood:
                            "sonhador"
                    },

                    {
                        text:
                            "✦ Estrela",
                        mood:
                            "energia"
                    },

                    {
                        text:
                            "☁ Nuvem",
                        mood:
                            "calmo"
                    }

                ]

            },


            {

                question:
                    "Qual cenário você escolheria agora?",

                options: [

                    {
                        text:
                            "✿ Jardim florido",
                        mood:
                            "romantico"
                    },

                    {
                        text:
                            "☾ Céu estrelado",
                        mood:
                            "sonhador"
                    },

                    {
                        text:
                            "✦ Cidade iluminada",
                        mood:
                            "energia"
                    },

                    {
                        text:
                            "☁ Fim de tarde tranquilo",
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
                    "Dream Lover",

                text:
                    "Seu Dream é romântico, delicado e apaixonado pelos pequenos detalhes."

            },


            sonhador: {

                icon:
                    "☾",

                title:
                    "Dreamer",

                text:
                    "Seu Dream é criativo, sonhador e transforma pequenos momentos em grandes lembranças."

            },


            energia: {

                icon:
                    "✦",

                title:
                    "Dream Energy",

                text:
                    "Seu Dream é vibrante, intenso e cheio de personalidade."

            },


            calmo: {

                icon:
                    "☁",

                title:
                    "Soft Dream",

                text:
                    "Seu Dream valoriza conforto, tranquilidade e uma presença leve."

            }

        };


        let quizIndex =
            0;


        let quizWinner =
            null;


        let quizScores = {

            romantico:
                0,

            sonhador:
                0,

            energia:
                0,

            calmo:
                0

        };


        function resetQuizScores() {

            quizScores = {

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


            resetQuizScores();


            if (quizStart) {

                quizStart.hidden =
                    true;

            }


            if (quizResult) {

                quizResult.hidden =
                    true;

            }


            if (quizQuestionsContainer) {

                quizQuestionsContainer.hidden =
                    false;

            }


            renderQuizQuestion();

        }


        function renderQuizQuestion() {

            const data =
                quizQuestions[
                    quizIndex
                ];


            if (!data) {

                finishQuiz();

                return;

            }


            if (quizQuestion) {

                quizQuestion.textContent =
                    data.question;

            }


            if (quizStep) {

                quizStep.textContent =
                    `${quizIndex + 1} / ${quizQuestions.length}`;

            }


            if (quizProgressBar) {

                quizProgressBar.style.width =
                    `${
                        (
                            (
                                quizIndex +
                                1
                            ) /
                            quizQuestions.length
                        ) *
                        100
                    }%`;

            }


            if (!quizOptions) {
                return;
            }


            quizOptions.innerHTML =
                "";


            data.options.forEach(
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

                            if (
                                quizScores[
                                    option.mood
                                ] !==
                                undefined
                            ) {

                                quizScores[
                                    option.mood
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


        function finishQuiz() {

            if (quizQuestionsContainer) {

                quizQuestionsContainer.hidden =
                    true;

            }


            if (quizResult) {

                quizResult.hidden =
                    false;

            }


            const ranking =
                Object.entries(
                    quizScores
                ).sort(
                    (
                        a,
                        b
                    ) =>
                        b[1] -
                        a[1]
                );


            quizWinner =
                ranking[0]?.[0] ||
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
                    result.title;

            }


            if (quizResultText) {

                quizResultText.textContent =
                    result.text;

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


        applyQuizMoodButton?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                if (!quizWinner) {

                    showToast(
                        "Faça o quiz primeiro."
                    );

                    return;

                }


                applyMood(
                    quizWinner
                );

            }
        );


        shareQuizResult?.addEventListener(
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


                const message =
                    `Meu resultado no Dream Quiz foi ${result.title} ${result.icon}`;


                try {

                    if (
                        navigator.share
                    ) {

                        await navigator.share({

                            title:
                                "Dream Quiz",

                            text:
                                message,

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
                            `${message}\n${window.location.href}`
                        );


                        showToast(
                            "Resultado copiado ♡"
                        );


                        return;

                    }


                    window.prompt(
                        "Copie seu resultado:",
                        `${message}\n${window.location.href}`
                    );

                } catch {}

            }
        );


        /* =====================================================
           DREAM STUDIO
        ====================================================== */

        const settingsButton =
            $("#settingsButton");


        const closeSettingsButton =
            $("#closeSettings");


        function openSettings() {

            if (!settingsPanel) {
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

        }


        function closeSettings() {

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


            settingsButton?.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        settingsButton?.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();


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


        closeSettingsButton?.addEventListener(
            "click",
            event => {

                event.preventDefault();

                closeSettings();

            }
        );


        /* =====================================================
           TEMA
        ====================================================== */

        const themeButton =
            $("#themeButton");


        const darkToggle =
            $("#darkToggle");


        function setDarkMode(
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

                storage.set(
                    "dream.dark",
                    enabled
                );

            }

        }


        themeButton?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                setDarkMode(
                    !body.classList.contains(
                        "dark"
                    )
                );

            }
        );


        darkToggle?.addEventListener(
            "change",
            event => {

                setDarkMode(
                    event.target.checked
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
                    "#b65cff",

                secondary:
                    "#6f52ed"

            },


            sky: {

                primary:
                    "#56b8ef",

                secondary:
                    "#6969e8"

            },


            rose: {

                primary:
                    "#fb7185",

                secondary:
                    "#db4d8b"

            }

        };


        function applyCustomColors(
            primary,
            secondary,
            save = true
        ) {

            const primaryRgb =
                hexToRgbString(
                    primary
                );


            const secondaryRgb =
                hexToRgbString(
                    secondary
                );


            if (
                !primaryRgb ||
                !secondaryRgb
            ) {
                return;
            }


            /*
               Remove o mood para impedir
               que as regras body[data-mood]
               sobrescrevam a paleta.
            */

            delete body.dataset.mood;


            setRootColors(
                primary,
                secondary,
                primaryRgb,
                secondaryRgb
            );


            if ($("#primaryColor")) {

                $("#primaryColor").value =
                    primary;

            }


            if ($("#secondaryColor")) {

                $("#secondaryColor").value =
                    secondary;

            }


            if (save) {

                storage.set(
                    "dream.primary",
                    primary
                );


                storage.set(
                    "dream.secondary",
                    secondary
                );


                storage.remove(
                    "dream.mood"
                );

            }

        }


        function applyPalette(
            paletteName,
            notify = true
        ) {

            const palette =
                palettes[
                    paletteName
                ];


            if (!palette) {
                return;
            }


            applyCustomColors(
                palette.primary,
                palette.secondary
            );


            $$(".palette-button").forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.palette ===
                        paletteName
                    );

                }
            );


            storage.set(
                "dream.palette",
                paletteName
            );


            if (notify) {

                showToast(
                    `Paleta ${paletteName} aplicada ✦`
                );

            }

        }


        document.addEventListener(
            "click",
            event => {

                const paletteButton =
                    event.target.closest(
                        "[data-palette]"
                    );


                if (!paletteButton) {
                    return;
                }


                event.preventDefault();


                applyPalette(
                    paletteButton.dataset.palette
                );

            }
        );


        const primaryColor =
            $("#primaryColor");


        const secondaryColor =
            $("#secondaryColor");


        function updateCustomColorInputs() {

            const primary =
                primaryColor?.value ||
                "#e786b3";


            const secondary =
                secondaryColor?.value ||
                "#9c6ce0";


            $$(".palette-button").forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );

                }
            );


            storage.remove(
                "dream.palette"
            );


            applyCustomColors(
                primary,
                secondary
            );

        }


        primaryColor?.addEventListener(
            "input",
            updateCustomColorInputs
        );


        secondaryColor?.addEventListener(
            "input",
            updateCustomColorInputs
        );


        /* =====================================================
           TOGGLES DO DREAM STUDIO
        ====================================================== */

        const cleanToggle =
            $("#cleanToggle");


        const performanceToggle =
            $("#performanceToggle");


        const particlesToggle =
            $("#particlesToggle");


        const animationsToggle =
            $("#animationsToggle");


        const cursorGlowToggle =
            $("#cursorGlowToggle");


        const motionToggle =
            $("#motionToggle");


        const spraySoundToggle =
            $("#spraySoundToggle");


        const hapticToggle =
            $("#hapticToggle");


        function setCleanMode(
            enabled,
            save = true
        ) {

            body.classList.toggle(
                "clean-mode",
                enabled
            );


            if (cleanToggle) {

                cleanToggle.checked =
                    enabled;

            }


            if (save) {

                storage.set(
                    "dream.clean",
                    enabled
                );

            }

        }


        function setPerformanceMode(
            enabled,
            save = true
        ) {

            body.classList.toggle(
                "performance-mode",
                enabled
            );


            if (performanceToggle) {

                performanceToggle.checked =
                    enabled;

            }


            if (save) {

                storage.set(
                    "dream.performance",
                    enabled
                );

            }


            createBackgroundParticles();

        }


        function setParticles(
            enabled,
            save = true
        ) {

            body.classList.toggle(
                "no-particles",
                !enabled
            );


            if (particlesToggle) {

                particlesToggle.checked =
                    enabled;

            }


            if (save) {

                storage.set(
                    "dream.particles",
                    enabled
                );

            }


            createBackgroundParticles();

        }


        function setAnimations(
            enabled,
            save = true
        ) {

            body.classList.toggle(
                "no-animations",
                !enabled
            );


            if (animationsToggle) {

                animationsToggle.checked =
                    enabled;

            }


            if (save) {

                storage.set(
                    "dream.animations",
                    enabled
                );

            }

        }


        function setCursorGlow(
            enabled,
            save = true
        ) {

            body.classList.toggle(
                "no-cursor-glow",
                !enabled
            );


            if (cursorGlowToggle) {

                cursorGlowToggle.checked =
                    enabled;

            }


            if (save) {

                storage.set(
                    "dream.cursorGlow",
                    enabled
                );

            }

        }


        function setMotion(
            enabled,
            save = true
        ) {

            body.classList.toggle(
                "no-motion",
                !enabled
            );


            if (motionToggle) {

                motionToggle.checked =
                    enabled;

            }


            if (!enabled) {

                resetProductTilt();


                motionCards.forEach(
                    card => {

                        card.style.transform =
                            "";

                    }
                );

            }


            if (save) {

                storage.set(
                    "dream.motion",
                    enabled
                );

            }

        }


        cleanToggle?.addEventListener(
            "change",
            event => {

                setCleanMode(
                    event.target.checked
                );

            }
        );


        performanceToggle?.addEventListener(
            "change",
            event => {

                setPerformanceMode(
                    event.target.checked
                );

            }
        );


        particlesToggle?.addEventListener(
            "change",
            event => {

                setParticles(
                    event.target.checked
                );

            }
        );


        animationsToggle?.addEventListener(
            "change",
            event => {

                setAnimations(
                    event.target.checked
                );

            }
        );


        cursorGlowToggle?.addEventListener(
            "change",
            event => {

                setCursorGlow(
                    event.target.checked
                );

            }
        );


        motionToggle?.addEventListener(
            "change",
            event => {

                setMotion(
                    event.target.checked
                );

            }
        );


        spraySoundToggle?.addEventListener(
            "change",
            event => {

                storage.set(
                    "dream.spraySound",
                    event.target.checked
                );

            }
        );


        hapticToggle?.addEventListener(
            "change",
            event => {

                storage.set(
                    "dream.haptic",
                    event.target.checked
                );

            }
        );


        /* =====================================================
           RANGES
        ====================================================== */

        const motionRange =
            $("#motionRange");


        const motionValue =
            $("#motionValue");


        const particleRange =
            $("#particleRange");


        const particleValue =
            $("#particleValue");


        const sprayIntensityRange =
            $("#sprayIntensityRange");


        const sprayIntensityValue =
            $("#sprayIntensityValue");


        function updateRangeLabel(
            output,
            value
        ) {

            if (output) {

                output.textContent =
                    `${Math.round(value)}%`;

            }

        }


        function setMotionIntensity(
            value,
            save = true
        ) {

            const safe =
                clamp(
                    value,
                    0,
                    150
                );


            if (motionRange) {

                motionRange.value =
                    safe;

            }


            updateRangeLabel(
                motionValue,
                safe
            );


            if (save) {

                storage.set(
                    "dream.motionIntensity",
                    safe
                );

            }

        }


        function setParticleIntensity(
            value,
            save = true
        ) {

            const safe =
                clamp(
                    value,
                    0,
                    150
                );


            if (particleRange) {

                particleRange.value =
                    safe;

            }


            updateRangeLabel(
                particleValue,
                safe
            );


            if (save) {

                storage.set(
                    "dream.particleIntensity",
                    safe
                );

            }


            createBackgroundParticles();

        }


        function setSprayIntensity(
            value,
            save = true
        ) {

            const safe =
                clamp(
                    value,
                    40,
                    160
                );


            if (sprayIntensityRange) {

                sprayIntensityRange.value =
                    safe;

            }


            updateRangeLabel(
                sprayIntensityValue,
                safe
            );


            if (save) {

                storage.set(
                    "dream.sprayIntensity",
                    safe
                );

            }

        }


        motionRange?.addEventListener(
            "input",
            event => {

                setMotionIntensity(
                    event.target.value
                );

            }
        );


        particleRange?.addEventListener(
            "input",
            event => {

                setParticleIntensity(
                    event.target.value
                );

            }
        );


        sprayIntensityRange?.addEventListener(
            "input",
            event => {

                setSprayIntensity(
                    event.target.value
                );

            }
        );


        /* =====================================================
           TAMANHO DO TEXTO
        ====================================================== */

        function setFontSize(
            size,
            save = true
        ) {

            const allowed = [
                "small",
                "normal",
                "large"
            ];


            const finalSize =
                allowed.includes(
                    size
                )
                    ? size
                    : "normal";


            body.classList.remove(
                "font-small",
                "font-normal",
                "font-large"
            );


            body.classList.add(
                `font-${finalSize}`
            );


            $$("[data-font-size]").forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.fontSize ===
                        finalSize
                    );

                }
            );


            if (save) {

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


                if (!button) {
                    return;
                }


                event.preventDefault();


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

                primary:
                    "#e786b3",

                secondary:
                    "#9c6ce0",

                dark:
                    false,

                clean:
                    false,

                performance:
                    false,

                particles:
                    true,

                motion:
                    true

            },


            cinematic: {

                primary:
                    "#a855f7",

                secondary:
                    "#4338ca",

                dark:
                    true,

                clean:
                    false,

                performance:
                    false,

                particles:
                    true,

                motion:
                    true

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
                    false,

                particles:
                    true,

                motion:
                    false

            },


            performance: {

                primary:
                    "#e786b3",

                secondary:
                    "#9c6ce0",

                dark:
                    false,

                clean:
                    true,

                performance:
                    true,

                particles:
                    false,

                motion:
                    false

            }

        };


        function applyPreset(
            presetName
        ) {

            const preset =
                presets[
                    presetName
                ];


            if (!preset) {
                return;
            }


            applyCustomColors(
                preset.primary,
                preset.secondary
            );


            setDarkMode(
                preset.dark
            );


            setCleanMode(
                preset.clean
            );


            setPerformanceMode(
                preset.performance
            );


            setParticles(
                preset.particles
            );


            setMotion(
                preset.motion
            );


            $$(".preset-button").forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.preset ===
                        presetName
                    );

                }
            );


            storage.set(
                "dream.preset",
                presetName
            );


            showToast(
                `Estilo ${presetName} aplicado ✦`
            );

        }


        document.addEventListener(
            "click",
            event => {

                const presetButton =
                    event.target.closest(
                        "[data-preset]"
                    );


                if (!presetButton) {
                    return;
                }


                event.preventDefault();


                applyPreset(
                    presetButton.dataset.preset
                );

            }
        );


        /* =====================================================
           LEITURA BOOLEANA DO STORAGE
        ====================================================== */

        function getStoredBoolean(
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


        /* =====================================================
           CARREGAR CONFIGURAÇÕES
        ====================================================== */

        function loadSavedSettings() {

            setDarkMode(
                getStoredBoolean(
                    "dream.dark",
                    false
                ),
                false
            );


            setCleanMode(
                getStoredBoolean(
                    "dream.clean",
                    false
                ),
                false
            );


            setPerformanceMode(
                getStoredBoolean(
                    "dream.performance",
                    false
                ),
                false
            );


            setParticles(
                getStoredBoolean(
                    "dream.particles",
                    true
                ),
                false
            );


            setAnimations(
                getStoredBoolean(
                    "dream.animations",
                    true
                ),
                false
            );


            setCursorGlow(
                getStoredBoolean(
                    "dream.cursorGlow",
                    true
                ),
                false
            );


            setMotion(
                getStoredBoolean(
                    "dream.motion",
                    true
                ),
                false
            );


            if (spraySoundToggle) {

                spraySoundToggle.checked =
                    getStoredBoolean(
                        "dream.spraySound",
                        true
                    );

            }


            if (hapticToggle) {

                hapticToggle.checked =
                    getStoredBoolean(
                        "dream.haptic",
                        true
                    );

            }


            setMotionIntensity(
                storage.get(
                    "dream.motionIntensity",
                    100
                ),
                false
            );


            setParticleIntensity(
                storage.get(
                    "dream.particleIntensity",
                    100
                ),
                false
            );


            setSprayIntensity(
                storage.get(
                    "dream.sprayIntensity",
                    100
                ),
                false
            );


            setFontSize(
                storage.get(
                    "dream.fontSize",
                    "normal"
                ),
                false
            );


            const savedScene =
                storage.get(
                    "dream.scene",
                    "romance"
                );


            if (
                scenes[
                    savedScene
                ]
            ) {

                applyScene(
                    savedScene,
                    false
                );

            }


            const savedMood =
                storage.get(
                    "dream.mood",
                    null
                );


            const savedPrimary =
                storage.get(
                    "dream.primary",
                    null
                );


            const savedSecondary =
                storage.get(
                    "dream.secondary",
                    null
                );


            if (
                savedMood &&
                moods[
                    savedMood
                ]
            ) {

                applyMood(
                    savedMood,
                    false,
                    false
                );

            } else if (
                savedPrimary &&
                savedSecondary
            ) {

                applyCustomColors(
                    savedPrimary,
                    savedSecondary,
                    false
                );

            }


            const savedPalette =
                storage.get(
                    "dream.palette",
                    null
                );


            $$(".palette-button").forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.palette ===
                        savedPalette
                    );

                }
            );


            const savedPreset =
                storage.get(
                    "dream.preset",
                    null
                );


            $$(".preset-button").forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.preset ===
                        savedPreset
                    );

                }
            );

        }


        /* =====================================================
           RESET DREAM STUDIO
        ====================================================== */

        const resetSettings =
            $("#resetSettings");


        resetSettings?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const keys = [

                    "dream.dark",
                    "dream.clean",
                    "dream.performance",
                    "dream.particles",
                    "dream.animations",
                    "dream.cursorGlow",
                    "dream.motion",
                    "dream.motionIntensity",
                    "dream.particleIntensity",
                    "dream.sprayIntensity",
                    "dream.spraySound",
                    "dream.haptic",
                    "dream.fontSize",
                    "dream.palette",
                    "dream.preset",
                    "dream.primary",
                    "dream.secondary",
                    "dream.mood",
                    "dream.scene",
                    "dream.musicVolume"

                ];


                keys.forEach(
                    key => {

                        storage.remove(
                            key
                        );

                    }
                );


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
                    100,
                    false
                );


                setParticleIntensity(
                    100,
                    false
                );


                setSprayIntensity(
                    100,
                    false
                );


                setFontSize(
                    "normal",
                    false
                );


                if (spraySoundToggle) {

                    spraySoundToggle.checked =
                        true;

                }


                if (hapticToggle) {

                    hapticToggle.checked =
                        true;

                }


                applyCustomColors(
                    "#e786b3",
                    "#9c6ce0",
                    false
                );


                body.dataset.mood =
                    "romantico";


                applyScene(
                    "romance",
                    false
                );


                $$(".palette-button").forEach(
                    button => {

                        button.classList.toggle(
                            "active",
                            button.dataset.palette ===
                            "dream"
                        );

                    }
                );


                $$(".preset-button").forEach(
                    button => {

                        button.classList.toggle(
                            "active",
                            button.dataset.preset ===
                            "dream"
                        );

                    }
                );


                showToast(
                    "Configurações restauradas ♡"
                );

            }
        );


        /* =====================================================
           CARREGA AS CONFIGURAÇÕES
        ====================================================== */

        loadSavedSettings();


        /* =====================================================
           EXTENDE API
        ====================================================== */

        Object.assign(
            window.DreamApp,
            {

                startQuiz,

                applyPreset,

                applyPalette,

                applyCustomColors,

                setDarkMode,

                setCleanMode,

                setPerformanceMode,

                setParticles,

                setAnimations,

                setCursorGlow,

                setMotion,

                setFontSize,

                openSettings,

                closeSettings

            }
        );
                /* =====================================================
           IDIOMA • PT-BR / EN-US
        ====================================================== */

        const languageButtons =
            $$("[data-language]");


        let currentLanguage =
            storage.get(
                "dream.language",
                "pt-BR"
            );


        if (
            currentLanguage !== "pt-BR" &&
            currentLanguage !== "en-US"
        ) {

            currentLanguage =
                "pt-BR";

        }


        /*
           Guardamos os textos originais dos elementos
           dinâmicos para podermos alternar PT / EN.
        */

        const originalDynamicData = {

            notes:
                Object.fromEntries(
                    Object.entries(
                        noteData
                    ).map(
                        ([key, value]) => [
                            key,
                            {
                                ...value
                            }
                        ]
                    )
                ),


            timeline:
                timelineStages.map(
                    item => ({
                        ...item
                    })
                ),


            moments:
                dreamMoments.map(
                    item => ({
                        ...item
                    })
                ),


            scenes:
                Object.fromEntries(
                    Object.entries(
                        scenes
                    ).map(
                        ([key, value]) => [
                            key,
                            {
                                ...value
                            }
                        ]
                    )
                ),


            quizQuestions:
                quizQuestions.map(
                    item => ({

                        question:
                            item.question,

                        options:
                            item.options.map(
                                option => ({
                                    ...option
                                })
                            )

                    })
                ),


            quizResults:
                Object.fromEntries(
                    Object.entries(
                        quizResults
                    ).map(
                        ([key, value]) => [
                            key,
                            {
                                ...value
                            }
                        ]
                    )
                )

        };


        /* =====================================================
           TRADUÇÕES DINÂMICAS
        ====================================================== */

        const englishNotes = {

            bergamota: {
                title: "Bergamot",
                text: "A bright, fresh and vibrant citrus opening."
            },

            laranja: {
                title: "Orange",
                text: "A juicy citrus note that adds brightness to the opening."
            },

            mandarina: {
                title: "Mandarin",
                text: "Fresh and lightly sweet, making the opening feel more cheerful."
            },

            limao: {
                title: "Lemon",
                text: "A clean and vibrant citrus facet that reinforces freshness."
            },

            cassis: {
                title: "Blackcurrant",
                text: "An intense fruity note balancing sweetness and subtle tartness."
            },

            maca: {
                title: "Apple",
                text: "A crisp and delicate fruity note that adds freshness."
            },

            rosa: {
                title: "Rose",
                text: "A romantic and elegant floral note that softens the heart."
            },

            tilia: {
                title: "Linden",
                text: "A soft, comfortable and delicately airy floral nuance."
            },

            freesia: {
                title: "Freesia",
                text: "A transparent and delicate floral note that brightens the fragrance."
            },

            lotus: {
                title: "Lotus Flower",
                text: "A calm, soft and watery floral impression."
            },

            gardenia: {
                title: "Gardenia",
                text: "A creamy and elegant floral note that adds presence."
            },

            pessego: {
                title: "Peach",
                text: "A soft and velvety fruity note with comfortable sweetness."
            },

            ambar: {
                title: "Amber",
                text: "Warm and enveloping, bringing depth to the base."
            },

            sandalo: {
                title: "Sandalwood",
                text: "A creamy woody note that supports the fragrance with elegance."
            },

            baunilha: {
                title: "Vanilla",
                text: "Sweet and comforting, creating a soft and cozy sensation."
            },

            tonka: {
                title: "Tonka Bean",
                text: "A warm, sweet and creamy nuance."
            },

            musk: {
                title: "Musk",
                text: "Soft and comfortable, leaving a clean and delicate signature."
            }

        };


        const englishTimeline = [

            {
                title:
                    "First minutes",

                text:
                    "A fresh, bright and delicate opening."
            },

            {
                title:
                    "Floral heart",

                text:
                    "Floral notes begin to stand out, making the fragrance more romantic."
            },

            {
                title:
                    "Enveloping comfort",

                text:
                    "The fragrance becomes softer, more comfortable and enveloping."
            },

            {
                title:
                    "Final signature",

                text:
                    "A soft presence remains on the skin with a delicate touch."
            }

        ];


        const englishMoments = [

            {
                title:
                    "Love lives in the details.",

                text:
                    "Some moments become special precisely because they seem simple."
            },

            {
                title:
                    "Transform the ordinary.",

                text:
                    "A fragrance can turn an ordinary instant into a memory."
            },

            {
                title:
                    "Take Dream with you.",

                text:
                    "Create your own atmosphere and let the moment speak for itself."
            },

            {
                title:
                    "Slow down for a moment.",

                text:
                    "Not every special moment needs to be planned."
            },

            {
                title:
                    "Make the moment yours.",

                text:
                    "A small choice can completely change the feeling of a day."
            },

            {
                title:
                    "Leave a memory in the air.",

                text:
                    "Some memories begin with a feeling we never forget."
            }

        ];


        const englishScenes = {

            romance: {

                title:
                    "Love is in the air.",

                text:
                    "A delicate, pink and enveloping atmosphere."

            },


            ceu: {

                title:
                    "Starry night.",

                text:
                    "A dreamy and mysterious atmosphere full of possibilities."

            },


            flores: {

                title:
                    "Dream Garden.",

                text:
                    "Floral, romantic and delicate to make the moment even more special."

            },


            energia: {

                title:
                    "Dream Energy.",

                text:
                    "A vibrant and intense atmosphere full of personality."

            }

        };


        const englishQuizQuestions = [

            {

                question:
                    "Which moment suits you best?",

                options: [

                    "♡ A romantic date",

                    "☾ A night under the stars",

                    "✦ An energetic party",

                    "☁ A peaceful moment"

                ]

            },


            {

                question:
                    "Which feeling are you looking for?",

                options: [

                    "♡ Romance",

                    "☾ Imagination",

                    "✦ Intensity",

                    "☁ Comfort"

                ]

            },


            {

                question:
                    "Choose a Dream symbol.",

                options: [

                    "♡ Heart",

                    "☾ Moon",

                    "✦ Star",

                    "☁ Cloud"

                ]

            },


            {

                question:
                    "Which setting would you choose now?",

                options: [

                    "✿ Flower garden",

                    "☾ Starry sky",

                    "✦ City lights",

                    "☁ Peaceful sunset"

                ]

            }

        ];


        const englishQuizResults = {

            romantico: {

                title:
                    "Dream Lover",

                text:
                    "Your Dream is romantic, delicate and in love with the little details."

            },


            sonhador: {

                title:
                    "Dreamer",

                text:
                    "Your Dream is creative, dreamy and turns small moments into great memories."

            },


            energia: {

                title:
                    "Dream Energy",

                text:
                    "Your Dream is vibrant, intense and full of personality."

            },


            calmo: {

                title:
                    "Soft Dream",

                text:
                    "Your Dream values comfort, tranquility and a soft presence."

            }

        };


        /* =====================================================
           HELPERS DE TRADUÇÃO
        ====================================================== */

        function setText(
            selector,
            value
        ) {

            const element =
                $(selector);


            if (
                element &&
                value !== undefined
            ) {

                element.textContent =
                    value;

            }

        }


        function setHTML(
            selector,
            value
        ) {

            const element =
                $(selector);


            if (
                element &&
                value !== undefined
            ) {

                element.innerHTML =
                    value;

            }

        }


        function setAllText(
            selector,
            values
        ) {

            $$(selector).forEach(
                (
                    element,
                    index
                ) => {

                    if (
                        values[index] !==
                        undefined
                    ) {

                        element.textContent =
                            values[index];

                    }

                }
            );

        }


        /* =====================================================
           TEXTOS ESTÁTICOS
        ====================================================== */

        function applyStaticLanguage(
            language
        ) {

            const english =
                language ===
                "en-US";


            root.lang =
                language;


            document.title =
                english
                    ? "Dream Love in the Air • 350 ml"
                    : "Dream Amor no Ar • 350 ml";


            /* =========================
               HEADER
            ========================== */

            setText(
                '.menu a[href="#inicio"]',
                english
                    ? "Home"
                    : "Início"
            );


            setText(
                '.menu a[href="#produto"]',
                english
                    ? "Product"
                    : "Produto"
            );


            setText(
                '.menu a[href="#notas"]',
                english
                    ? "Notes"
                    : "Notas"
            );


            setText(
                '.menu a[href="#experiencia"]',
                english
                    ? "Experience"
                    : "Experiência"
            );


            setText(
                '.menu a[href="#momentos"]',
                english
                    ? "Moments"
                    : "Momentos"
            );


            setText(
                '.menu a[href="#galeria"]',
                english
                    ? "Gallery"
                    : "Galeria"
            );


            setText(
                '.menu a[href="#quiz"]',
                "Quiz"
            );


            setText(
                '.header [data-modal-open="productModal"]',
                english
                    ? "Discover"
                    : "Conhecer"
            );


            /* =========================
               HERO
            ========================== */

            setText(
                ".hero .eyebrow",
                english
                    ? "● O BOTICÁRIO • DREAM"
                    : "● O BOTICÁRIO • DREAM"
            );


            setHTML(
                ".hero h1",
                english
                    ? `
                        A touch of
                        <span class="gradient-text">
                            love
                        </span>
                        in the air.
                    `
                    : `
                        Um toque de
                        <span class="gradient-text">
                            amor
                        </span>
                        no ar.
                    `
            );


            setText(
                ".hero-description",
                english
                    ? "An experience inspired by Dream Love in the Air: delicate, romantic, floral and created to transform simple moments into special memories."
                    : "Uma experiência inspirada em Dream Amor no Ar: delicada, romântica, floral e feita para transformar momentos simples em lembranças especiais."
            );


            setHTML(
                '.hero-buttons a[href="#produto"]',
                english
                    ? `
                        Discover Dream
                        <span>↓</span>
                    `
                    : `
                        Descobrir o Dream
                        <span>↓</span>
                    `
            );


            setText(
                '.hero-buttons [data-modal-open="productModal"]',
                english
                    ? "View product"
                    : "Ver produto"
            );


            setAllText(
                ".hero-facts div span",
                english
                    ? [
                        "Body Splash",
                        "Woody",
                        "Love in the Air"
                    ]
                    : [
                        "Body Splash",
                        "Amadeirado",
                        "Amor no Ar"
                    ]
            );


            setText(
                ".hero-scroll",
                english
                    ? "• scroll to explore"
                    : "• role para explorar"
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
                ".spray-counter-card span",
                english
                    ? "SPRAYS"
                    : "BORRIFADAS"
            );


            /* =========================
               TICKER
            ========================== */

            const tickerValues =
                english
                    ? [
                        "♡ Love in the Air",
                        "✿ Floral Woody",
                        "☁ Delicate",
                        "☾ Romantic",
                        "✦ Dream",
                        "♡ Love in the Air",
                        "✿ Floral Woody",
                        "☁ Delicate",
                        "☾ Romantic",
                        "✦ Dream"
                    ]
                    : [
                        "♡ Amor no Ar",
                        "✿ Floral Amadeirado",
                        "☁ Delicado",
                        "☾ Romântico",
                        "✦ Dream",
                        "♡ Amor no Ar",
                        "✿ Floral Amadeirado",
                        "☁ Delicado",
                        "☾ Romântico",
                        "✦ Dream"
                    ];


            setAllText(
                ".ticker-track span",
                tickerValues
            );


            /* =========================
               PRODUTO
            ========================== */

            setText(
                ".product-copy .section-eyebrow",
                "DREAM COLLECTION"
            );


            setHTML(
                ".product-copy h2",
                english
                    ? `
                        A touch of
                        <em>love</em>
                        in your routine.
                    `
                    : `
                        Um toque de
                        <em>amor</em>
                        na sua rotina.
                    `
            );


            setText(
                ".product-copy > p",
                english
                    ? "Dream Love in the Air combines delicacy, romance and personality in a light and enveloping experience."
                    : "Dream Amor no Ar combina delicadeza, romantismo e personalidade em uma experiência leve e envolvente."
            );


            const productPointTitles =
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
                    ];


            const productPointTexts =
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
                    ];


            setAllText(
                ".product-point h3",
                productPointTitles
            );


            setAllText(
                ".product-point p",
                productPointTexts
            );


            setText(
                '.product-actions [data-modal-open="productModal"]',
                english
                    ? "View details"
                    : "Ver detalhes"
            );


            /* =========================
               CAMPANHA
            ========================== */

            setHTML(
                ".campaign-copy h2",
                english
                    ? `
                        Love is
                        <em>in the details.</em>
                    `
                    : `
                        O amor está
                        <em>nos detalhes.</em>
                    `
            );


            setText(
                ".campaign-copy > p",
                english
                    ? "A romantic, sophisticated atmosphere full of personality to enter the Dream universe."
                    : "Uma atmosfera romântica, sofisticada e cheia de personalidade para você entrar no universo Dream."
            );


            setText(
                '.campaign-actions a[href="#experiencia"]',
                english
                    ? "Explore Dream universe"
                    : "Explorar universo Dream"
            );


            setText(
                '.campaign-actions [data-modal-open="productModal"]',
                english
                    ? "Discover product"
                    : "Conhecer produto"
            );


            /* =========================
               NOTAS
            ========================== */

            setText(
                ".notes-section .section-heading .section-eyebrow",
                english
                    ? "OLFACTORY PYRAMID"
                    : "PIRÂMIDE OLFATIVA"
            );


            setHTML(
                ".notes-section .section-heading h2",
                english
                    ? `
                        Discover every
                        <em>note.</em>
                    `
                    : `
                        Descubra cada
                        <em>nota.</em>
                    `
            );


            setText(
                ".notes-section .section-heading > p",
                english
                    ? "Explore the different layers of the fragrance and discover how it evolves."
                    : "Explore as diferentes camadas da fragrância e descubra como ela evolui."
            );


            setAllText(
                ".note-column-head small",
                english
                    ? [
                        "TOP",
                        "HEART",
                        "BASE"
                    ]
                    : [
                        "SAÍDA",
                        "CORPO",
                        "FUNDO"
                    ]
            );


            setAllText(
                ".note-column-head h3",
                english
                    ? [
                        "Fruity freshness",
                        "Floral heart",
                        "Enveloping comfort"
                    ]
                    : [
                        "Frescor frutado",
                        "Coração floral",
                        "Conforto envolvente"
                    ]
            );


            setAllText(
                ".note-column > p",
                english
                    ? [
                        "The fragrance's first impression: bright, fresh and vibrant.",
                        "The romantic, delicate and elegant side of Love in the Air.",
                        "The notes that remain and create the final signature."
                    ]
                    : [
                        "A primeira impressão da fragrância: luminosa, fresca e vibrante.",
                        "O lado romântico, delicado e elegante de Amor no Ar.",
                        "As notas que permanecem e deixam a assinatura final."
                    ]
            );


            /* =========================
               EXPERIÊNCIA
            ========================== */

            setText(
                ".experience-heading .section-eyebrow",
                english
                    ? "FEEL THE FRAGRANCE"
                    : "SINTA A FRAGRÂNCIA"
            );


            setHTML(
                ".experience-heading h2",
                english
                    ? `
                        Explore Dream in
                        <em>a new way.</em>
                    `
                    : `
                        Explore o Dream de
                        <em>outro jeito.</em>
                    `
            );


            setText(
                ".experience-heading > p",
                english
                    ? "Discover the fragrance evolution, personalize the visual experience and choose the atmosphere that suits you."
                    : "Descubra a evolução da fragrância, personalize o visual e escolha a atmosfera que combina com você."
            );


            setAllText(
                ".card-label",
                english
                    ? [
                        "EVOLUTION",
                        "PROFILE",
                        "MOMENT"
                    ]
                    : [
                        "EVOLUÇÃO",
                        "PERFIL",
                        "MOMENTO"
                    ]
            );


            setText(
                ".timeline-card .card-heading small",
                english
                    ? "fragrance"
                    : "fragrância"
            );


            setText(
                ".timeline-card .card-heading h3",
                english
                    ? "Fragrance timeline"
                    : "Timeline da fragrância"
            );


            setText(
                ".timeline-intro",
                english
                    ? "Drag to follow the fragrance evolution throughout the hours."
                    : "Arraste para acompanhar a evolução ao longo das horas."
            );


            setText(
                ".profile-card h3",
                english
                    ? "Personality"
                    : "Personalidade"
            );


            setText(
                ".profile-card > p",
                english
                    ? "A visual reading of Dream's main sensations."
                    : "Uma leitura visual das principais sensações de Dream."
            );


            setAllText(
                ".profile-meter-head span",
                english
                    ? [
                        "Floral",
                        "Romantic",
                        "Comfortable",
                        "Presence"
                    ]
                    : [
                        "Floral",
                        "Romântico",
                        "Confortável",
                        "Presença"
                    ]
            );


            setText(
                ".mood-picker-card h3",
                english
                    ? "How do you want to feel?"
                    : "Como você quer se sentir?"
            );


            setText(
                ".mood-picker-card > p",
                english
                    ? "Choose an atmosphere to transform the page."
                    : "Escolha uma atmosfera para transformar o visual da página."
            );


            setAllText(
                ".mood-button",
                english
                    ? [
                        "♡ Romantic",
                        "☾ Dreamy",
                        "✧ Night",
                        "✦ Energy",
                        "☁ Calm"
                    ]
                    : [
                        "♡ Romântico",
                        "☾ Sonhador",
                        "✧ Noturno",
                        "✦ Energia",
                        "☁ Calmo"
                    ]
            );


            setText(
                ".mood-hint",
                english
                    ? "The visual identity automatically changes with your mood."
                    : "A identidade visual muda automaticamente com o mood."
            );


            /* =========================
               DREAM MOMENT
            ========================== */

            setText(
                "#newDreamMoment",
                english
                    ? "New moment"
                    : "Novo momento"
            );


            /* =========================
               SENSAÇÃO
            ========================== */

            setText(
                ".feeling-copy .section-eyebrow",
                english
                    ? "FRAGRANCE FEELING"
                    : "SENSAÇÃO DA FRAGRÂNCIA"
            );


            setHTML(
                ".feeling-copy h2",
                english
                    ? `
                        Between softness and
                        <em>presence.</em>
                    `
                    : `
                        Entre leveza e
                        <em>presença.</em>
                    `
            );


            setText(
                ".feeling-copy > p",
                english
                    ? "Dream balances a romantic heart with a comfortable base, creating a soft presence."
                    : "Dream equilibra um coração romântico com uma base confortável, criando uma presença suave."
            );


            setAllText(
                ".feeling-tags span",
                english
                    ? [
                        "♡ romantic",
                        "✿ floral",
                        "☁ comfortable"
                    ]
                    : [
                        "♡ romântico",
                        "✿ floral",
                        "☁ confortável"
                    ]
            );


            setText(
                ".feeling-circle-content small",
                english
                    ? "LOVE IN THE AIR"
                    : "AMOR NO AR"
            );


            setText(
                ".feeling-circle-content strong",
                english
                    ? "Delicate"
                    : "Delicado"
            );


            setText(
                ".feeling-circle-content span",
                english
                    ? "without going unnoticed"
                    : "sem passar despercebido"
            );


            setAllText(
                ".feeling-meter-card > div:first-child span",
                english
                    ? [
                        "Softness",
                        "Intensity"
                    ]
                    : [
                        "Leveza",
                        "Intensidade"
                    ]
            );


            /* =========================
               MOMENTOS
            ========================== */

            setText(
                ".moments-section .section-heading .section-eyebrow",
                english
                    ? "WHEN TO WEAR"
                    : "QUANDO USAR"
            );


            setHTML(
                ".moments-section .section-heading h2",
                english
                    ? `
                        A Dream for every
                        <em>moment.</em>
                    `
                    : `
                        Um Dream para cada
                        <em>momento.</em>
                    `
            );


            setText(
                ".moments-section .section-heading > p",
                english
                    ? "Choose the setting that best matches your experience."
                    : "Escolha o cenário que mais combina com a sua experiência."
            );


            setAllText(
                ".moment-time",
                english
                    ? [
                        "DAY",
                        "DATE",
                        "NIGHT",
                        "SPECIAL"
                    ]
                    : [
                        "DIA",
                        "ENCONTRO",
                        "NOITE",
                        "ESPECIAL"
                    ]
            );


            setAllText(
                ".moment-card h3",
                english
                    ? [
                        "Light routine",
                        "Romantic moment",
                        "Dream night",
                        "Your moment"
                    ]
                    : [
                        "Rotina leve",
                        "Momento romântico",
                        "Noite Dream",
                        "Seu momento"
                    ]
            );


            setAllText(
                ".moment-card > p",
                english
                    ? [
                        "Start the day with a fresh, delicate and comfortable feeling.",
                        "A delicate atmosphere for dates and special occasions.",
                        "For when you want a soft, enveloping and elegant presence.",
                        "Some moments do not need an occasion. They just need to be yours."
                    ]
                    : [
                        "Para começar o dia com uma sensação fresca, delicada e confortável.",
                        "Uma atmosfera delicada para encontros e ocasiões especiais.",
                        "Para quando você quer uma presença suave, envolvente e elegante.",
                        "Alguns momentos não precisam de ocasião. Basta serem seus."
                    ]
            );


            /* =========================
               CENAS
            ========================== */

            setText(
                ".scene-copy .section-eyebrow",
                "DREAM SCENE"
            );


            setHTML(
                ".scene-copy h2",
                english
                    ? `
                        Choose your
                        <em>atmosphere.</em>
                    `
                    : `
                        Escolha sua
                        <em>atmosfera.</em>
                    `
            );


            setText(
                ".scene-copy > p",
                english
                    ? "Change the setting and discover different sides of Dream."
                    : "Mude o cenário e descubra diferentes lados de Dream."
            );


            setAllText(
                ".scene-button",
                english
                    ? [
                        "♡ Romance",
                        "☾ Sky",
                        "✿ Flowers",
                        "✦ Energy"
                    ]
                    : [
                        "♡ Romance",
                        "☾ Céu",
                        "✿ Flores",
                        "✦ Energia"
                    ]
            );


            /* =========================
               QUOTE
            ========================== */

            setHTML(
                ".quote-card p",
                english
                    ? `
                        Made to leave
                        <strong>
                            love in the air.
                        </strong>
                    `
                    : `
                        Feito para deixar
                        <strong>
                            o amor no ar.
                        </strong>
                    `
            );


            /* =========================
               GALERIA
            ========================== */

            setText(
                ".gallery-header .section-eyebrow",
                english
                    ? "DREAM GALLERY"
                    : "GALERIA DREAM"
            );


            setHTML(
                ".gallery-header h2",
                english
                    ? `
                        Enter the
                        <em>Dream universe.</em>
                    `
                    : `
                        Entre no universo
                        <em>Dream.</em>
                    `
            );


            setText(
                ".gallery-header p",
                english
                    ? "Drag with your mouse, swipe on mobile or use the arrows."
                    : "Arraste com o mouse, deslize no celular ou use as setas."
            );


            setAllText(
                ".gallery-open",
                english
                    ? [
                        "explore ↗",
                        "explore ↗",
                        "explore ↗"
                    ]
                    : [
                        "explorar ↗",
                        "explorar ↗",
                        "explorar ↗"
                    ]
            );


            /* =========================
               MOOD
            ========================== */

            setText(
                ".mood-section .section-heading .section-eyebrow",
                english
                    ? "CHOOSE YOUR MOOD"
                    : "ESCOLHA SEU MOOD"
            );


            setHTML(
                ".mood-section .section-heading h2",
                english
                    ? `
                        What is your
                        <em>Dream today?</em>
                    `
                    : `
                        Qual é o seu
                        <em>Dream de hoje?</em>
                    `
            );


            setText(
                ".mood-section .section-heading > p",
                english
                    ? "Each mood transforms the visual identity of the experience."
                    : "Cada mood transforma a identidade visual da experiência."
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
                        "delicate",
                        "light",
                        "mysterious",
                        "intense",
                        "comfortable"
                    ]
                    : [
                        "delicado",
                        "leve",
                        "misterioso",
                        "intenso",
                        "confortável"
                    ]
            );


            /* =========================
               QUIZ
            ========================== */

            setText(
                ".quiz-start .section-eyebrow",
                "DREAM QUIZ"
            );


            setText(
                ".quiz-start h2",
                english
                    ? "What is your Dream?"
                    : "Qual é o seu Dream?"
            );


            setText(
                ".quiz-start p",
                english
                    ? "Answer four questions and discover which atmosphere suits you best."
                    : "Responda quatro perguntas e descubra qual atmosfera combina mais com você."
            );


            setText(
                "#startQuiz",
                english
                    ? "Start quiz"
                    : "Começar quiz"
            );


            setText(
                "#restartQuiz",
                english
                    ? "Restart quiz"
                    : "Refazer quiz"
            );


            setText(
                "#applyQuizMood",
                english
                    ? "Apply my mood"
                    : "Aplicar meu mood"
            );


            setText(
                "#shareQuizResult",
                english
                    ? "Share"
                    : "Compartilhar"
            );


            setText(
                ".quiz-result .section-eyebrow",
                english
                    ? "YOUR RESULT"
                    : "SEU RESULTADO"
            );


            /* =========================
               FINAL
            ========================== */

            setText(
                ".final-content .section-eyebrow",
                english
                    ? "DREAM • LOVE IN THE AIR"
                    : "DREAM • AMOR NO AR"
            );


            setHTML(
                ".final-content h2",
                english
                    ? `
                        Leave your moment
                        <em>in the air.</em>
                    `
                    : `
                        Deixe seu momento
                        <em>no ar.</em>
                    `
            );


            setText(
                ".final-content > p",
                english
                    ? "Explore the notes, find your mood and create your own Dream experience."
                    : "Explore as notas, encontre seu mood e crie sua própria experiência Dream."
            );


            setText(
                '.final-actions [data-modal-open="productModal"]',
                english
                    ? "View product"
                    : "Ver produto"
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
                    ? "⛶ Fullscreen"
                    : "⛶ Tela cheia"
            );


            /* =========================
               PRODUCT MODAL
            ========================== */

            setText(
                ".product-modal-copy .section-eyebrow",
                english
                    ? "DREAM LOVE IN THE AIR"
                    : "DREAM AMOR NO AR"
            );


            setText(
                "#productModalTitle",
                english
                    ? "Love in the Air"
                    : "Amor no Ar"
            );


            setText(
                ".product-modal-description",
                english
                    ? "A floral, romantic and enveloping fragrance in a 350 ml body splash."
                    : "Uma fragrância floral, romântica e envolvente em um body splash de 350 ml."
            );


            setAllText(
                ".product-modal-tags span",
                english
                    ? [
                        "✿ Floral",
                        "♡ Romantic",
                        "☁ Comfortable"
                    ]
                    : [
                        "✿ Floral",
                        "♡ Romântico",
                        "☁ Confortável"
                    ]
            );


            setAllText(
                ".product-modal-info small",
                english
                    ? [
                        "PROFILE",
                        "VOLUME",
                        "EXPERIENCE"
                    ]
                    : [
                        "PERFIL",
                        "VOLUME",
                        "EXPERIÊNCIA"
                    ]
            );


            setAllText(
                ".product-modal-info strong",
                english
                    ? [
                        "Floral woody",
                        "350 ml",
                        "Light and enveloping"
                    ]
                    : [
                        "Floral amadeirado",
                        "350 ml",
                        "Leve e envolvente"
                    ]
            );


            setText(
                "#shareModal",
                english
                    ? "Share"
                    : "Compartilhar"
            );


            /* =========================
               NOTE MODAL
            ========================== */

            setText(
                ".note-modal-card .section-eyebrow",
                english
                    ? "DREAM NOTE"
                    : "NOTA DREAM"
            );


            /* =========================
               DREAM STUDIO
            ========================== */

            setText(
                ".settings-head .section-eyebrow",
                "DREAM STUDIO"
            );


            setText(
                ".settings-head h2",
                english
                    ? "Your experience, your way."
                    : "Sua experiência, do seu jeito."
            );


            setText(
                ".settings-head p",
                english
                    ? "Customize visuals, audio and motion."
                    : "Personalize visual, áudio e movimento."
            );


            const settingsTitles =
                english
                    ? [
                        "Language",
                        "Quick styles",
                        "Appearance",
                        "Palettes",
                        "Effects",
                        "Audio",
                        "Reading"
                    ]
                    : [
                        "Idioma",
                        "Estilos rápidos",
                        "Aparência",
                        "Paletas",
                        "Efeitos",
                        "Áudio",
                        "Leitura"
                    ];


            setAllText(
                ".settings-group > h3",
                settingsTitles
            );


            const settingStrongTexts =
                english
                    ? [
                        "Dark mode",
                        "Clean mode",
                        "Performance",
                        "Particles",
                        "Animations",
                        "Cursor glow",
                        "3D motion",
                        "Spray sound",
                        "Vibration",
                        "Background music"
                    ]
                    : [
                        "Modo escuro",
                        "Modo clean",
                        "Performance",
                        "Partículas",
                        "Animações",
                        "Cursor glow",
                        "Movimento 3D",
                        "Som do borrifador",
                        "Vibração",
                        "Música de fundo"
                    ];


            setAllText(
                ".setting-row strong",
                settingStrongTexts
            );


            const settingSmallTexts =
                english
                    ? [
                        "Switch theme",
                        "More minimal visual",
                        "Reduces heavier effects",
                        "Floating elements",
                        "Experience transitions",
                        "Light that follows the mouse",
                        "Depth on bottle and cards",
                        "Effect when using the spray",
                        "On supported devices",
                        "Moonlight"
                    ]
                    : [
                        "Alternar tema",
                        "Visual mais minimalista",
                        "Reduz efeitos mais pesados",
                        "Elementos flutuantes",
                        "Transições da experiência",
                        "Luz que acompanha o mouse",
                        "Profundidade no frasco e cards",
                        "Efeito ao usar o spray",
                        "Em dispositivos compatíveis",
                        "Moonlight"
                    ];


            setAllText(
                ".setting-row small",
                settingSmallTexts
            );


            setText(
                "#resetSettings",
                english
                    ? "↻ Reset settings"
                    : "↻ Restaurar padrão"
            );


            /* =========================
               MUSIC
            ========================== */

            setText(
                ".music-player-copy small",
                english
                    ? "NOW PLAYING"
                    : "TOCANDO AGORA"
            );


            /* =========================
               FOOTER
            ========================== */

            setText(
                ".footer-brand span",
                english
                    ? "Love in the Air • 350 ml"
                    : "Amor no Ar • 350 ml"
            );


            setText(
                ".footer-main > p",
                english
                    ? "A conceptual experience inspired by the Dream universe."
                    : "Experiência conceitual inspirada no universo Dream."
            );


            setText(
                ".footer-top-link",
                english
                    ? "back to top ↑"
                    : "voltar ao topo ↑"
            );


            setText(
                ".footer-bottom span",
                english
                    ? "DEVELOPED BY"
                    : "DESENVOLVIDO POR"
            );

        }


        /* =====================================================
           ATUALIZAR DADOS DINÂMICOS NO IDIOMA
        ====================================================== */

        let activeNoteKey =
            null;


        document.addEventListener(
            "click",
            event => {

                const noteButton =
                    event.target.closest(
                        "[data-note]"
                    );


                if (!noteButton) {
                    return;
                }


                activeNoteKey =
                    noteButton.dataset.note;


                requestAnimationFrame(
                    () => {

                        renderActiveNoteLanguage();

                    }
                );

            }
        );


        function applyDynamicLanguage(
            language
        ) {

            const english =
                language ===
                    "en-US";


            /* NOTAS */

            Object.keys(
                noteData
            ).forEach(
                key => {

                    if (
                        english &&
                        englishNotes[key]
                    ) {

                        noteData[key].title =
                            englishNotes[key].title;


                        noteData[key].text =
                            englishNotes[key].text;

                    } else {

                        noteData[key].title =
                            originalDynamicData
                                .notes[key]
                                .title;


                        noteData[key].text =
                            originalDynamicData
                                .notes[key]
                                .text;

                    }

                }
            );


            /* TIMELINE */

            timelineStages.forEach(
                (
                    stage,
                    index
                ) => {

                    if (
                        english &&
                        englishTimeline[index]
                    ) {

                        stage.title =
                            englishTimeline[index]
                                .title;


                        stage.text =
                            englishTimeline[index]
                                .text;

                    } else {

                        stage.title =
                            originalDynamicData
                                .timeline[index]
                                .title;


                        stage.text =
                            originalDynamicData
                                .timeline[index]
                                .text;

                    }

                }
            );


            /* DREAM MOMENT */

            dreamMoments.forEach(
                (
                    moment,
                    index
                ) => {

                    if (
                        english &&
                        englishMoments[index]
                    ) {

                        moment.title =
                            englishMoments[index]
                                .title;


                        moment.text =
                            englishMoments[index]
                                .text;

                    } else {

                        moment.title =
                            originalDynamicData
                                .moments[index]
                                .title;


                        moment.text =
                            originalDynamicData
                                .moments[index]
                                .text;

                    }

                }
            );


            /* CENAS */

            Object.keys(
                scenes
            ).forEach(
                key => {

                    if (
                        english &&
                        englishScenes[key]
                    ) {

                        scenes[key].title =
                            englishScenes[key].title;


                        scenes[key].text =
                            englishScenes[key].text;

                    } else {

                        scenes[key].title =
                            originalDynamicData
                                .scenes[key]
                                .title;


                        scenes[key].text =
                            originalDynamicData
                                .scenes[key]
                                .text;

                    }

                }
            );


            /* QUIZ */

            quizQuestions.forEach(
                (
                    question,
                    questionIndex
                ) => {

                    if (
                        english &&
                        englishQuizQuestions[
                            questionIndex
                        ]
                    ) {

                        question.question =
                            englishQuizQuestions[
                                questionIndex
                            ].question;


                        question.options.forEach(
                            (
                                option,
                                optionIndex
                            ) => {

                                option.text =
                                    englishQuizQuestions[
                                        questionIndex
                                    ]
                                    .options[
                                        optionIndex
                                    ];

                            }
                        );

                    } else {

                        question.question =
                            originalDynamicData
                                .quizQuestions[
                                    questionIndex
                                ]
                                .question;


                        question.options.forEach(
                            (
                                option,
                                optionIndex
                            ) => {

                                option.text =
                                    originalDynamicData
                                        .quizQuestions[
                                            questionIndex
                                        ]
                                        .options[
                                            optionIndex
                                        ]
                                        .text;

                            }
                        );

                    }

                }
            );


            Object.keys(
                quizResults
            ).forEach(
                key => {

                    if (
                        english &&
                        englishQuizResults[key]
                    ) {

                        quizResults[key].title =
                            englishQuizResults[key]
                                .title;


                        quizResults[key].text =
                            englishQuizResults[key]
                                .text;

                    } else {

                        quizResults[key].title =
                            originalDynamicData
                                .quizResults[key]
                                .title;


                        quizResults[key].text =
                            originalDynamicData
                                .quizResults[key]
                                .text;

                    }

                }
            );

        }


        function renderActiveNoteLanguage() {

            if (
                !activeNoteKey ||
                !noteData[
                    activeNoteKey
                ]
            ) {
                return;
            }


            const data =
                noteData[
                    activeNoteKey
                ];


            setText(
                "#noteModalIcon",
                data.icon
            );


            setText(
                "#noteModalTitle",
                data.title
            );


            setText(
                "#noteModalText",
                data.text
            );

        }


        function renderDynamicLanguage() {

            updateTimeline();


            if (
                timelineHour &&
                Number(
                    timelineRange?.value
                ) === 0
            ) {

                timelineHour.textContent =
                    currentLanguage ===
                    "en-US"
                        ? "Now"
                        : "Agora";

            }


            if (
                currentDreamMoment >=
                0
            ) {

                renderDreamMoment(
                    currentDreamMoment
                );

            }


            const activeScene =
                $(".scene-button.active");


            if (
                activeScene?.dataset.scene
            ) {

                applyScene(
                    activeScene.dataset.scene,
                    false
                );

            }


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


                if (result) {

                    setText(
                        "#quizResultIcon",
                        result.icon
                    );


                    setText(
                        "#quizResultTitle",
                        result.title
                    );


                    setText(
                        "#quizResultText",
                        result.text
                    );

                }

            }


            renderActiveNoteLanguage();

            renderFavoriteLanguage();

            renderGalleryAutoplayLanguage();

            updateLocalizedSectionIndicator();

        }


        /* =====================================================
           FAVORITO POR IDIOMA
        ====================================================== */

        function renderFavoriteLanguage() {

            const text =
                favorite
                    ? (
                        currentLanguage ===
                        "en-US"
                            ? "♥ Favorited"
                            : "♥ Favoritado"
                    )
                    : (
                        currentLanguage ===
                        "en-US"
                            ? "♡ Favorite"
                            : "♡ Favoritar"
                    );


            [
                favoriteButton,
                favoriteModal
            ].forEach(
                button => {

                    if (!button) {
                        return;
                    }


                    button.textContent =
                        text;

                }
            );

        }


        /*
           O renderFavorite original controla
           classes e aria-pressed.

           Este listener apenas atualiza o texto
           novamente no idioma atual.
        */

        favoriteButton?.addEventListener(
            "click",
            () => {

                requestAnimationFrame(
                    renderFavoriteLanguage
                );

            }
        );


        favoriteModal?.addEventListener(
            "click",
            () => {

                requestAnimationFrame(
                    renderFavoriteLanguage
                );

            }
        );


        /* =====================================================
           AUTOPLAY GALERIA POR IDIOMA
        ====================================================== */

        function renderGalleryAutoplayLanguage() {

            if (!galleryAutoplay) {
                return;
            }


            galleryAutoplay.textContent =
                galleryTimer
                    ? (
                        currentLanguage ===
                        "en-US"
                            ? "❚❚ Pause"
                            : "❚❚ Pausar"
                    )
                    : "▶ Autoplay";

        }


        galleryAutoplay?.addEventListener(
            "click",
            () => {

                requestAnimationFrame(
                    renderGalleryAutoplayLanguage
                );

            }
        );


        /* =====================================================
           SECTION INDICATOR • IDIOMA
        ====================================================== */

        const localizedSectionNames = {

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

                cenas:
                    "Cenas",

                galeria:
                    "Galeria",

                mood:
                    "Mood",

                quiz:
                    "Quiz",

                final:
                    "Final"

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

                cenas:
                    "Scenes",

                galeria:
                    "Gallery",

                mood:
                    "Mood",

                quiz:
                    "Quiz",

                final:
                    "Final"

            }

        };


        function updateLocalizedSectionIndicator() {

            if (
                !sectionIndicator ||
                !trackedSections.length
            ) {
                return;
            }


            const position =
                window.scrollY +
                window.innerHeight *
                0.38;


            let currentSection =
                trackedSections[0];


            trackedSections.forEach(
                section => {

                    if (
                        section.offsetTop <=
                        position
                    ) {

                        currentSection =
                            section;

                    }

                }
            );


            const index =
                trackedSections.indexOf(
                    currentSection
                );


            const name =
                localizedSectionNames[
                    currentLanguage
                ]?.[
                    currentSection.id
                ] ||
                currentSection.dataset
                    .sectionName ||
                currentSection.id;


            sectionIndicator.innerHTML =
                `
                    <span>
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    ${name}
                `;

        }


        window.addEventListener(
            "scroll",
            updateLocalizedSectionIndicator,
            {
                passive: true
            }
        );


        /* =====================================================
           DEFINIR IDIOMA
        ====================================================== */

        function setLanguage(
            language,
            notify = true
        ) {

            if (
                language !== "pt-BR" &&
                language !== "en-US"
            ) {
                return;
            }


            currentLanguage =
                language;


            storage.set(
                "dream.language",
                language
            );


            languageButtons.forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.language ===
                        language
                    );

                }
            );


            applyDynamicLanguage(
                language
            );


            applyStaticLanguage(
                language
            );


            renderDynamicLanguage();


            if (notify) {

                showToast(
                    language ===
                    "pt-BR"
                        ? "Português selecionado 🇧🇷"
                        : "English selected 🇺🇸"
                );

            }

        }


        languageButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


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


        const musicPlayer =
            $("#musicPlayer");


        const musicButton =
            $("#musicButton");


        const musicMute =
            $("#musicMute");


        const musicProgress =
            $("#musicProgress");


        const musicCurrentTime =
            $("#musicCurrentTime");


        const musicDuration =
            $("#musicDuration");


        const musicToggle =
            $("#musicToggle");


        const volumeRange =
            $("#volumeRange");


        const volumeValue =
            $("#volumeValue");


        let musicPlayerUnlocked =
            false;


        function formatMusicTime(
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


            const remainingSeconds =
                Math.floor(
                    seconds %
                    60
                );


            return `${
                minutes
            }:${
                String(
                    remainingSeconds
                ).padStart(
                    2,
                    "0"
                )
            }`;

        }


        function unlockMusicPlayer() {

            musicPlayerUnlocked =
                true;


            musicPlayer?.classList.add(
                "visible"
            );

        }


        function updateMusicUI() {

            if (!backgroundMusic) {
                return;
            }


            const playing =
                !backgroundMusic.paused;


            body.classList.toggle(
                "music-playing",
                playing
            );


            if (
                musicPlayerUnlocked
            ) {

                musicPlayer?.classList.add(
                    "visible"
                );

            }


            if (musicButton) {

                musicButton.textContent =
                    playing
                        ? "❚❚"
                        : "▶";


                musicButton.setAttribute(
                    "aria-label",
                    playing
                        ? (
                            currentLanguage ===
                            "en-US"
                                ? "Pause music"
                                : "Pausar música"
                        )
                        : (
                            currentLanguage ===
                            "en-US"
                                ? "Play music"
                                : "Tocar música"
                        )
                );

            }


            if (musicToggle) {

                musicToggle.checked =
                    playing;

            }

        }


        async function playMusic() {

            if (!backgroundMusic) {

                showToast(
                    currentLanguage ===
                    "en-US"
                        ? "Music file not found."
                        : "Arquivo da música não encontrado."
                );


                return;

            }


            unlockMusicPlayer();


            try {

                await backgroundMusic.play();


                updateMusicUI();

            } catch (error) {

                console.warn(
                    "Dream: música não iniciou.",
                    error
                );


                if (musicToggle) {

                    musicToggle.checked =
                        false;

                }


                showToast(
                    currentLanguage ===
                    "en-US"
                        ? "The browser blocked automatic audio. Try again."
                        : "O navegador bloqueou o áudio. Tente novamente."
                );

            }

        }


        function pauseMusic() {

            if (!backgroundMusic) {
                return;
            }


            backgroundMusic.pause();


            unlockMusicPlayer();

            updateMusicUI();

        }


        function toggleMusic() {

            if (!backgroundMusic) {
                return;
            }


            if (
                backgroundMusic.paused
            ) {

                playMusic();

            } else {

                pauseMusic();

            }

        }


        musicButton?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                toggleMusic();

            }
        );


        musicToggle?.addEventListener(
            "change",
            event => {

                unlockMusicPlayer();


                if (
                    event.target.checked
                ) {

                    playMusic();

                } else {

                    pauseMusic();

                }

            }
        );


        backgroundMusic?.addEventListener(
            "play",
            updateMusicUI
        );


        backgroundMusic?.addEventListener(
            "pause",
            updateMusicUI
        );


        backgroundMusic?.addEventListener(
            "ended",
            updateMusicUI
        );


        backgroundMusic?.addEventListener(
            "loadedmetadata",
            () => {

                if (musicDuration) {

                    musicDuration.textContent =
                        formatMusicTime(
                            backgroundMusic.duration
                        );

                }

            }
        );


        backgroundMusic?.addEventListener(
            "durationchange",
            () => {

                if (musicDuration) {

                    musicDuration.textContent =
                        formatMusicTime(
                            backgroundMusic.duration
                        );

                }

            }
        );


        backgroundMusic?.addEventListener(
            "timeupdate",
            () => {

                if (musicCurrentTime) {

                    musicCurrentTime.textContent =
                        formatMusicTime(
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
                        backgroundMusic.currentTime /
                        backgroundMusic.duration *
                        100;

                }

            }
        );


        musicProgress?.addEventListener(
            "input",
            event => {

                if (
                    !backgroundMusic ||
                    !Number.isFinite(
                        backgroundMusic.duration
                    ) ||
                    backgroundMusic.duration <=
                    0
                ) {
                    return;
                }


                backgroundMusic.currentTime =
                    Number(
                        event.target.value
                    ) /
                    100 *
                    backgroundMusic.duration;

            }
        );


        musicMute?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                if (!backgroundMusic) {
                    return;
                }


                backgroundMusic.muted =
                    !backgroundMusic.muted;


                musicMute.textContent =
                    backgroundMusic.muted
                        ? "🔇"
                        : "🔊";


                musicMute.setAttribute(
                    "aria-label",
                    backgroundMusic.muted
                        ? (
                            currentLanguage ===
                            "en-US"
                                ? "Unmute music"
                                : "Ativar som"
                        )
                        : (
                            currentLanguage ===
                            "en-US"
                                ? "Mute music"
                                : "Silenciar música"
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


            if (backgroundMusic) {

                backgroundMusic.volume =
                    safe /
                    100;

            }


            if (volumeRange) {

                volumeRange.value =
                    safe;

            }


            if (volumeValue) {

                volumeValue.textContent =
                    `${Math.round(safe)}%`;

            }


            if (save) {

                storage.set(
                    "dream.musicVolume",
                    safe
                );

            }

        }


        volumeRange?.addEventListener(
            "input",
            event => {

                setMusicVolume(
                    event.target.value
                );

            }
        );


        /* =====================================================
           COMPARTILHAR
        ====================================================== */

        async function sharePage() {

            const data = {

                title:
                    document.title,

                text:
                    currentLanguage ===
                    "en-US"
                        ? "Discover Dream Love in the Air ♡"
                        : "Conheça Dream Amor no Ar ♡",

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
                        currentLanguage ===
                        "en-US"
                            ? "Link copied ♡"
                            : "Link copiado ♡"
                    );


                    return;

                }


                window.prompt(
                    currentLanguage ===
                    "en-US"
                        ? "Copy the link:"
                        : "Copie o link:",
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


        /* =====================================================
           FULLSCREEN
        ====================================================== */

        const fullscreenButton =
            $("#fullscreenButton");


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
                    currentLanguage ===
                    "en-US"
                        ? "Fullscreen is unavailable."
                        : "Tela cheia indisponível."
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
                    HTMLElement &&
                    target.matches(
                        `
                        input,
                        textarea,
                        select,
                        [contenteditable="true"]
                        `
                    );


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeAllModals();

                    closeLightbox();

                    closeSettings();

                    closeMobileMenu();


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

                        previousLightbox();

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

                        toggleMusic();

                        break;


                    case "d":

                        setDarkMode(
                            !body.classList.contains(
                                "dark"
                            )
                        );

                        break;


                    case "g":

                        if (
                            settingsPanel
                                ?.classList
                                .contains(
                                    "open"
                                )
                        ) {

                            closeSettings();

                        } else {

                            openSettings();

                        }

                        break;

                }

            }
        );


        /* =====================================================
           RESIZE
        ====================================================== */

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

                            updateScrollUI();

                            updateSectionIndicator();

                            updateLocalizedSectionIndicator();

                            detectGalleryIndex();

                            createBackgroundParticles();


                            if (
                                window.innerWidth >
                                980
                            ) {

                                closeMobileMenu();

                            }

                        },
                        160
                    );

            },
            {
                passive: true
            }
        );


        /* =====================================================
           VISIBILITY
        ====================================================== */

        document.addEventListener(
            "visibilitychange",
            () => {

                if (
                    document.hidden &&
                    galleryTimer
                ) {

                    stopGalleryAutoplay();

                }

            }
        );


        /* =====================================================
           INICIALIZAÇÃO FINAL
        ====================================================== */

        setMusicVolume(
            storage.get(
                "dream.musicVolume",
                35
            ),
            false
        );


        setLanguage(
            currentLanguage,
            false
        );


        updateScrollUI();

        updateTimeline();

        updateSectionIndicator();

        updateLocalizedSectionIndicator();

        updateGalleryCounter();

        updateGalleryDots();

        renderGalleryAutoplayLanguage();

        renderSprayCount();

        renderFavorite();

        renderFavoriteLanguage();

        updateMusicUI();


        /*
           Estado inicial dos modais.
        */

        $$(".modal").forEach(
            modal => {

                if (
                    !modal.classList.contains(
                        "open"
                    )
                ) {

                    modal.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            }
        );


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


        /* =====================================================
           API FINAL
        ====================================================== */

        Object.assign(
            window.DreamApp,
            {

                setLanguage,

                playMusic,

                pauseMusic,

                toggleMusic,

                setMusicVolume,

                sharePage,

                toggleFullscreen

            }
        );


        /* =====================================================
           DIAGNÓSTICO
        ====================================================== */

        const diagnostics = {

            productModal:
                Boolean(
                    productModal
                ),

            productButtons:
                $$(
                    '[data-modal-open="productModal"]'
                ).length,

            noteButtons:
                $$("[data-note]")
                    .length,

            sprayButton:
                Boolean(
                    sprayButton
                ),

            settingsPanel:
                Boolean(
                    settingsPanel
                ),

            galleryItems:
                galleryItems.length,

            quiz:
                Boolean(
                    startQuizButton
                ),

            backgroundMusic:
                Boolean(
                    backgroundMusic
                ),

            sprayAudio:
                Boolean(
                    sprayAudio
                )

        };


        console.log(
            "Dream diagnostics:",
            diagnostics
        );


        if (
            !diagnostics.productModal
        ) {

            console.error(
                "Dream: #productModal não encontrado."
            );

        }


        if (
            diagnostics.productButtons <
            1
        ) {

            console.error(
                "Dream: nenhum botão do produto encontrado."
            );

        }


        if (
            !diagnostics.sprayButton
        ) {

            console.warn(
                "Dream: #sprayButton não encontrado."
            );

        }


        if (
            !diagnostics.settingsPanel
        ) {

            console.warn(
                "Dream: #settingsPanel não encontrado."
            );

        }


        /* =====================================================
           FIM
        ====================================================== */

        console.log(
            "%cDREAM AMOR NO AR ✓",
            `
                color:#e786b3;
                font-size:18px;
                font-weight:800;
            `
        );


    }
); // FIM DO DOMContentLoaded