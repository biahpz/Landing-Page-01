"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];

    const body = document.body;
    const root = document.documentElement;

    const clamp = (n, a, b) =>
        Math.max(a, Math.min(b, n));

    const load = (k, d = null) => {
        try {
            const v = localStorage.getItem(k);
            return v === null ? d : v;
        } catch {
            return d;
        }
    };

    const save = (k, v) => {
        try {
            localStorage.setItem(k, String(v));
        } catch {}
    };


    /* =====================================================
       TOAST
    ===================================================== */

    const toast = $("#toast");

    let toastTimer;

    function showToast(text) {

        if (!toast) return;

        toast.textContent = text;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }


    /* =====================================================
       LOADER + REVEAL
    ===================================================== */

    const loader = $("#loader");

    function showAllReveals() {

        $$(".reveal").forEach(el => {
            el.classList.add("visible");
        });
    }


    function hideLoader() {

        loader?.classList.add("hide");

        setTimeout(() => {

            if (loader) {
                loader.style.display = "none";
            }

        }, 700);
    }


    window.addEventListener("load", () => {

        setTimeout(
            hideLoader,
            500
        );

    });


    setTimeout(() => {

        hideLoader();

        showAllReveals();

    }, 5000);


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.08
                }
            );


        $$(".reveal").forEach(el => {
            observer.observe(el);
        });

    } else {

        showAllReveals();
    }


    /* =====================================================
       SCROLL
    ===================================================== */

    const header = $("#header");

    const progress =
        $("#scrollProgress");

    const backTop =
        $("#backTop");

    const indicator =
        $("#sectionIndicator");

    const sections =
        $$("main section[id]");


    function updateScroll() {

        const y =
            window.scrollY;

        const total =
            root.scrollHeight -
            window.innerHeight;


        if (progress) {

            progress.style.width =
                `${
                    total > 0
                        ? y / total * 100
                        : 0
                }%`;
        }


        header?.classList.toggle(
            "scrolled",
            y > 30
        );


        backTop?.classList.toggle(
            "show",
            y > 500
        );


        let current =
            sections[0];


        sections.forEach(section => {

            if (
                section.getBoundingClientRect().top <=
                innerHeight * 0.38
            ) {

                current =
                    section;
            }

        });


        if (
            indicator &&
            current
        ) {

            const index =
                Math.max(
                    0,
                    sections.indexOf(current)
                ) + 1;


            indicator.innerHTML =
                `<span>${
                    String(index)
                        .padStart(2, "0")
                }</span> ${
                    current.dataset.sectionName ||
                    current.id
                }`;


            $$(".menu a").forEach(a => {

                a.classList.toggle(
                    "active",
                    a.getAttribute("href") ===
                    `#${current.id}`
                );

            });
        }
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


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menu =
        $("#menu");

    const menuMobile =
        $("#menuMobile");


    menuMobile?.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            const open =
                menu?.classList.toggle(
                    "open"
                );


            menuMobile.classList.toggle(
                "active",
                !!open
            );


            menuMobile.setAttribute(
                "aria-expanded",
                String(!!open)
            );

        }
    );


    $$(".menu a").forEach(a => {

        a.addEventListener(
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

    });


    document.addEventListener(
        "click",
        event => {

            if (
                menu?.classList.contains("open") &&
                !menu.contains(event.target) &&
                !menuMobile?.contains(event.target)
            ) {

                menu.classList.remove(
                    "open"
                );
            }

        }
    );


    /* =====================================================
       IDIOMA
    ===================================================== */

    const languageButtons =
        $$("[data-lang]");


    let language =
        load(
            "dreamLanguage",
            "pt-BR"
        );


    if (
        ![
            "pt-BR",
            "en-US"
        ].includes(language)
    ) {

        language =
            "pt-BR";
    }


    const dictionary = {

        "Início": "Home",
        "Produto": "Product",
        "Campanha": "Campaign",
        "Notas": "Notes",
        "Experiência": "Experience",
        "Sensação": "Feeling",
        "Momentos": "Moments",
        "Galeria": "Gallery",
        "Mood": "Mood",
        "Quiz": "Quiz",
        "Conhecer": "Discover",

        "Amor no Ar":
            "Love in the Air",

        "preparando sua experiência":
            "preparing your experience",

        "experiência interativa":
            "interactive experience",

        "Uma fragrância delicada, romântica e envolvente para transformar pequenos momentos em lembranças especiais.":
            "A delicate, romantic and captivating fragrance created to turn small moments into special memories.",

        "Descobrir o Dream":
            "Discover Dream",

        "Ver produto":
            "View product",

        "Floral":
            "Floral",

        "Amadeirado":
            "Woody",

        "Toque em borrifar para ativar o efeito, áudio e animação.":
            "Tap spray to activate the effect, audio and animation.",

        "Borrifar":
            "Spray",

        "experimentar":
            "experience",

        "BORRIFADAS":
            "SPRAYS",

        "Floral Amadeirado":
            "Floral Woody",

        "Delicado":
            "Delicate",

        "Romântico":
            "Romantic",

        "Um toque de":
            "A touch of",

        "amor":
            "love",

        "na sua rotina.":
            "in your routine.",

        "Ver detalhes":
            "View details",

        "Favoritar":
            "Favorite",

        "Compartilhar":
            "Share",

        "O amor está":
            "Love is",

        "nos detalhes.":
            "in the details.",

        "PIRÂMIDE OLFATIVA":
            "OLFACTORY PYRAMID",

        "Descubra cada":
            "Discover every",

        "nota.":
            "note.",

        "SINTA A FRAGRÂNCIA":
            "FEEL THE FRAGRANCE",

        "Explore o Dream de":
            "Explore Dream in",

        "outro jeito.":
            "a new way.",

        "SEU MOMENTO":
            "YOUR MOMENT",

        "Um Dream para":
            "A Dream for",

        "cada momento.":
            "every moment.",

        "Durante o dia":
            "During the day",

        "À noite":
            "At night",

        "Encontro":
            "Date",

        "Escola & faculdade":
            "School & college",

        "Arraste para explorar":
            "Drag to explore",

        "Começar quiz":
            "Start quiz",

        "DESENVOLVIDO POR":
            "DEVELOPED BY",

        "Sua experiência, do seu jeito.":
            "Your experience, your way.",

        "Personalize visual, áudio e movimento.":
            "Customize visuals, audio and motion.",

        "Idioma":
            "Language",

        "Estilos rápidos":
            "Quick styles",

        "Aparência":
            "Appearance",

        "Modo escuro":
            "Dark mode",

        "Modo clean":
            "Clean mode",

        "Modo performance":
            "Performance mode",

        "Paletas":
            "Palettes",

        "Cores personalizadas":
            "Custom colors",

        "Principal":
            "Primary",

        "Secundária":
            "Secondary",

        "Efeitos":
            "Effects",

        "Partículas":
            "Particles",

        "Animações":
            "Animations",

        "Movimento 3D":
            "3D motion",

        "Som do borrifador":
            "Spray sound",

        "Música":
            "Music",

        "Música de fundo":
            "Background music",

        "Volume":
            "Volume",

        "Movimento":
            "Motion",

        "Velocidade":
            "Speed",

        "Intensidade 3D":
            "3D intensity",

        "Leitura":
            "Reading",

        "Contraste":
            "Contrast",

        "Tamanho do texto":
            "Text size",

        "Restaurar padrão":
            "Reset defaults"

    };


    const reverseDictionary =
        Object.fromEntries(
            Object.entries(dictionary)
                .map(
                    ([pt, en]) =>
                        [en, pt]
                )
        );


    function translateTextNodes(to) {

        const map =
            to === "en-US"
                ? dictionary
                : reverseDictionary;


        const walker =
            document.createTreeWalker(
                body,
                NodeFilter.SHOW_TEXT
            );


        const nodes = [];


        while (
            walker.nextNode()
        ) {

            nodes.push(
                walker.currentNode
            );
        }


        nodes.forEach(node => {

            const parent =
                node.parentElement;


            if (
                !parent ||
                [
                    "SCRIPT",
                    "STYLE",
                    "NOSCRIPT"
                ].includes(
                    parent.tagName
                )
            ) {

                return;
            }


            const raw =
                node.nodeValue;


            const text =
                raw
                    .replace(
                        /\s+/g,
                        " "
                    )
                    .trim();


            if (!text) {
                return;
            }


            const prefixMatch =
                text.match(
                    /^([♡♥✦✿☾☁⚡◉↻▶]+)\s*/
                );


            const prefix =
                prefixMatch?.[0] ||
                "";


            const clean =
                prefix
                    ? text.slice(
                        prefix.length
                    )
                    : text;


            const translated =
                map[text] ||
                (
                    map[clean]
                        ? prefix +
                          map[clean]
                        : null
                );


            if (
                translated
            ) {

                node.nodeValue =
                    (
                        raw.match(
                            /^\s*/
                        )?.[0] ||
                        ""
                    ) +
                    translated +
                    (
                        raw.match(
                            /\s*$/
                        )?.[0] ||
                        ""
                    );
            }

        });

    }


    function setLanguage(
        next,
        notify = false
    ) {

        if (
            ![
                "pt-BR",
                "en-US"
            ].includes(next)
        ) {

            return;
        }


        if (
            next !==
            language
        ) {

            translateTextNodes(
                next
            );
        }


        language =
            next;


        save(
            "dreamLanguage",
            next
        );


        document.documentElement.lang =
            next === "pt-BR"
                ? "pt-BR"
                : "en";


        document.title =
            next === "en-US"
                ? "Dream Love in the Air • 350 ml"
                : "Dream Amor no Ar • 350 ml";


        languageButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.lang ===
                        next
                );

            }
        );


        if (
            notify
        ) {

            showToast(
                next === "en-US"
                    ? "Language changed 🇺🇸"
                    : "Idioma alterado 🇧🇷"
            );
        }
    }


    languageButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    setLanguage(
                        button.dataset.lang,
                        true
                    );

                }
            );

        }
    );


    const initialLanguage =
        language;


    language =
        "pt-BR";


    setLanguage(
        initialLanguage
    );


    /* =====================================================
       TEMA
    ===================================================== */

    const themeButton =
        $("#themeButton");

    const darkToggle =
        $("#darkToggle");


    let dark =
        load(
            "dreamDarkMode",
            "false"
        ) ===
        "true";


    function applyTheme() {

        body.classList.toggle(
            "dark",
            dark
        );


        if (
            themeButton
        ) {

            themeButton.textContent =
                dark
                    ? "☀"
                    : "☾";
        }


        if (
            darkToggle
        ) {

            darkToggle.checked =
                dark;
        }


        save(
            "dreamDarkMode",
            dark
        );
    }


    themeButton?.addEventListener(
        "click",
        () => {

            dark =
                !dark;

            applyTheme();

        }
    );


    darkToggle?.addEventListener(
        "change",
        () => {

            dark =
                darkToggle.checked;

            applyTheme();

        }
    );


    applyTheme();


    /* =====================================================
       MÚSICA
    ===================================================== */

    const audio =
        $("#dreamMusic");

    const musicButton =
        $("#dreamMusicButton");

    const musicMute =
        $("#musicMuteButton");

    const musicProgress =
        $("#musicProgress");

    const musicCurrent =
        $("#musicCurrentTime");

    const musicDuration =
        $("#musicDuration");

    const musicToggle =
        $("#musicToggle");

    const volume =
        $("#musicVolumeRange");

    const volumeValue =
        $("#musicVolumeValue");


    function formatTime(seconds) {

        if (
            !Number.isFinite(
                seconds
            )
        ) {

            return "0:00";
        }


        return `${
            Math.floor(
                seconds / 60
            )
        }:${
            String(
                Math.floor(
                    seconds % 60
                )
            ).padStart(
                2,
                "0"
            )
        }`;
    }


    function syncMusic() {

        if (!audio) return;


        if (
            musicButton
        ) {

            musicButton.textContent =
                audio.paused
                    ? "▶"
                    : "❚❚";
        }


        if (
            musicToggle
        ) {

            musicToggle.checked =
                !audio.paused;
        }


        if (
            musicMute
        ) {

            musicMute.textContent =
                audio.muted
                    ? "🔇"
                    : "🔊";
        }
    }


    async function toggleMusic() {

        if (!audio) return;


        try {

            if (
                audio.paused
            ) {

                await audio.play();

            } else {

                audio.pause();
            }


            syncMusic();

        } catch {

            showToast(
                language === "en-US"
                    ? "Could not play audio"
                    : "Não foi possível tocar o áudio"
            );
        }
    }


    musicButton?.addEventListener(
        "click",
        toggleMusic
    );


    musicToggle?.addEventListener(
        "change",
        () => {

            if (
                musicToggle.checked
            ) {

                audio?.play()
                    .catch(
                        () => {}
                    );

            } else {

                audio?.pause();
            }

        }
    );


    musicMute?.addEventListener(
        "click",
        () => {

            if (!audio) return;


            audio.muted =
                !audio.muted;


            syncMusic();

        }
    );


    if (
        audio
    ) {

        const savedVolume =
            clamp(
                Number(
                    load(
                        "dreamMusicVolume",
                        35
                    )
                ),
                0,
                100
            );


        audio.volume =
            savedVolume / 100;


        if (
            volume
        ) {

            volume.value =
                savedVolume;
        }


        if (
            volumeValue
        ) {

            volumeValue.textContent =
                `${savedVolume}%`;
        }


        audio.addEventListener(
            "loadedmetadata",
            () => {

                if (
                    musicDuration
                ) {

                    musicDuration.textContent =
                        formatTime(
                            audio.duration
                        );
                }

            }
        );


        audio.addEventListener(
            "timeupdate",
            () => {

                if (
                    musicCurrent
                ) {

                    musicCurrent.textContent =
                        formatTime(
                            audio.currentTime
                        );
                }


                if (
                    musicProgress &&
                    audio.duration
                ) {

                    musicProgress.value =
                        audio.currentTime /
                        audio.duration *
                        100;
                }

            }
        );


        audio.addEventListener(
            "play",
            syncMusic
        );


        audio.addEventListener(
            "pause",
            syncMusic
        );
    }


    musicProgress?.addEventListener(
        "input",
        () => {

            if (
                audio?.duration
            ) {

                audio.currentTime =
                    audio.duration *
                    Number(
                        musicProgress.value
                    ) /
                    100;
            }

        }
    );


    volume?.addEventListener(
        "input",
        () => {

            if (!audio) return;


            const value =
                clamp(
                    Number(
                        volume.value
                    ),
                    0,
                    100
                );


            audio.volume =
                value / 100;


            if (
                volumeValue
            ) {

                volumeValue.textContent =
                    `${value}%`;
            }


            save(
                "dreamMusicVolume",
                value
            );

        }
    );


    syncMusic();


    /* =====================================================
       PARTÍCULAS + CURSOR
    ===================================================== */

    const particles =
        $("#particles");

    const cursorGlow =
        $("#cursorGlow");


    let particlesEnabled =
        load(
            "dreamParticles",
            "true"
        ) !==
        "false";


    let particleTimer;


    function createParticle() {

        if (
            !particles ||
            !particlesEnabled ||
            body.classList.contains(
                "performance-mode"
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


        const symbols = [
            "♡",
            "✦",
            "✿",
            "·"
        ];


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
                18
            }px`;


        particle.style.setProperty(
            "--duration",
            `${
                8 +
                Math.random() *
                10
            }s`
        );


        particle.style.setProperty(
            "--delay",
            "0s"
        );


        particles.appendChild(
            particle
        );


        setTimeout(
            () => particle.remove(),
            19000
        );
    }


    function restartParticles() {

        clearInterval(
            particleTimer
        );


        if (
            particlesEnabled
        ) {

            particleTimer =
                setInterval(
                    createParticle,
                    850
                );
        }
    }


    restartParticles();


    window.addEventListener(
        "mousemove",
        event => {

            if (
                cursorGlow &&
                !body.classList.contains(
                    "no-cursor"
                )
            ) {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;
            }

        }
    );


    /* =====================================================
       FRASCO 3D + BORRIFADOR
    ===================================================== */

    const hero =
        $("#heroProduct");

    const bottle =
        $("#mainBottle");

    const halo =
        $("#productHalo");

    const sprayArea =
        $("#sprayArea");

    const sprayWave =
        $("#sprayWave");

    const sprayCounter =
        $("#sprayCounter");


    let sprayCount =
        Number(
            load(
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


    let motion3d =
        1;


    hero?.addEventListener(
        "mousemove",
        event => {

            if (
                !bottle ||
                innerWidth < 850 ||
                body.classList.contains(
                    "performance-mode"
                )
            ) {

                return;
            }


            const rect =
                hero.getBoundingClientRect();


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
                `perspective(900px)
                 rotateX(${
                    -y *
                    12 *
                    motion3d
                 }deg)
                 rotateY(${
                    x *
                    16 *
                    motion3d
                 }deg)`;


            if (
                halo
            ) {

                halo.style.transform =
                    `translate(
                        ${x * -30}px,
                        ${y * -20}px
                    )`;
            }

        }
    );


    hero?.addEventListener(
        "mouseleave",
        () => {

            if (
                bottle
            ) {

                bottle.style.transform =
                    "";
            }


            if (
                halo
            ) {

                halo.style.transform =
                    "";
            }

        }
    );


    function doSpray() {

        if (
            !sprayArea
        ) {

            return;
        }


        sprayWave?.classList.remove(
            "active"
        );


        if (
            sprayWave
        ) {

            void sprayWave.offsetWidth;
        }


        sprayWave?.classList.add(
            "active"
        );


        for (
            let i = 0;
            i < 50;
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
                    Math.random() *
                    440 -
                    220
                }px`
            );


            mist.style.setProperty(
                "--mist-y",
                `${
                    Math.random() *
                    400 -
                    320
                }px`
            );


            mist.style.setProperty(
                "--mist-size",
                `${
                    3 +
                    Math.random() *
                    13
                }px`
            );


            mist.style.setProperty(
                "--mist-blur",
                `${
                    Math.random() *
                    3
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
                () => mist.remove(),
                1900
            );
        }


        for (
            let i = 0;
            i < 12;
            i++
        ) {

            const symbol =
                document.createElement(
                    "span"
                );


            symbol.className =
                "spray-symbol-particle";


            symbol.textContent =
                Math.random() > 0.5
                    ? "♡"
                    : "✦";


            symbol.style.setProperty(
                "--symbol-x",
                `${
                    Math.random() *
                    360 -
                    180
                }px`
            );


            symbol.style.setProperty(
                "--symbol-y",
                `${
                    -60 -
                    Math.random() *
                    270
                }px`
            );


            symbol.style.setProperty(
                "--symbol-rotate",
                `${
                    Math.random() *
                    400 -
                    200
                }deg`
            );


            sprayArea.appendChild(
                symbol
            );


            setTimeout(
                () => symbol.remove(),
                1700
            );
        }


        sprayCount++;


        save(
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
            $("#hapticToggle")?.checked &&
            navigator.vibrate
        ) {

            navigator.vibrate(
                [
                    15,
                    10,
                    25
                ]
            );
        }


        showToast(
            language === "en-US"
                ? "Dream is in the air ♡"
                : "Dream está no ar ♡"
        );
    }


    $("#sprayButton")
        ?.addEventListener(
            "click",
            doSpray
        );


    /* =====================================================
       FAVORITOS + COMPARTILHAR
    ===================================================== */

    let favorite =
        load(
            "dreamFavorite",
            "false"
        ) ===
        "true";


    const favoriteButtons =
        [
            $("#favoriteButton"),
            $("#favoriteModal")
        ].filter(Boolean);


    function syncFavorite() {

        favoriteButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    favorite
                );


                button.textContent =
                    favorite
                        ? "♥ Favoritado"
                        : "♡ Favoritar";

            }
        );


        save(
            "dreamFavorite",
            favorite
        );
    }


    favoriteButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    favorite =
                        !favorite;


                    syncFavorite();


                    showToast(
                        favorite
                            ? "Adicionado aos favoritos ♡"
                            : "Removido dos favoritos"
                    );

                }
            );

        }
    );


    syncFavorite();


    async function shareDream() {

        try {

            if (
                navigator.share
            ) {

                await navigator.share({

                    title:
                        "Dream Amor no Ar",

                    text:
                        "Dream Amor no Ar ♡",

                    url:
                        location.href

                });

            } else {

                await navigator.clipboard
                    .writeText(
                        location.href
                    );


                showToast(
                    language ===
                        "en-US"
                        ? "Link copied"
                        : "Link copiado"
                );
            }

        } catch {}
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


    /* =====================================================
       MODAIS
    ===================================================== */

    const productModal =
        $("#productModal");

    const noteModal =
        $("#noteModal");


    function openLayer(
        element
    ) {

        if (!element) return;


        element.classList.add(
            "open"
        );


        body.classList.add(
            "modal-open"
        );
    }


    function closeLayer(
        element
    ) {

        if (!element) return;


        element.classList.remove(
            "open"
        );


        if (
            !$(
                ".product-modal.open, .note-modal.open, .lightbox.open"
            )
        ) {

            body.classList.remove(
                "modal-open"
            );
        }
    }


    $$(".open-product")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        openLayer(
                            productModal
                        );

                    }
                );

            }
        );


    $$(".close-product")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        closeLayer(
                            productModal
                        );

                    }
                );

            }
        );


    /* =====================================================
       NOTAS
    ===================================================== */

    const notes = {

        bergamota: [
            "Bergamota",
            "🍊",
            "Cítrica, fresca e luminosa."
        ],

        laranja: [
            "Laranja",
            "🍊",
            "Alegre, cítrica e suculenta."
        ],

        mandarina: [
            "Mandarina",
            "🍊",
            "Doce, cítrica e vibrante."
        ],

        limao: [
            "Limão",
            "🍋",
            "Fresco e brilhante."
        ],

        cassis: [
            "Cassis",
            "●",
            "Frutado marcante e levemente ácido."
        ],

        maca: [
            "Maçã",
            "🍎",
            "Fresca e frutada."
        ],

        rosa: [
            "Rosa",
            "🌹",
            "Floral clássico e romântico."
        ],

        tilia: [
            "Tília",
            "✿",
            "Floral suave e confortável."
        ],

        freesia: [
            "Frésia",
            "🌸",
            "Floral leve e moderno."
        ],

        lotus: [
            "Flor de Lótus",
            "🪷",
            "Aquática e delicada."
        ],

        gardenia: [
            "Gardênia",
            "✿",
            "Floral cremoso e elegante."
        ],

        pessego: [
            "Pêssego",
            "🍑",
            "Macio e adocicado."
        ],

        ambar: [
            "Âmbar",
            "✦",
            "Quente e envolvente."
        ],

        sandalo: [
            "Sândalo",
            "☾",
            "Madeira cremosa e confortável."
        ],

        baunilha: [
            "Baunilha",
            "♡",
            "Doce e aconchegante."
        ],

        tonka: [
            "Tonka",
            "✧",
            "Quente e cremosa."
        ],

        musk: [
            "Musk",
            "☁",
            "Limpo e confortável."
        ]

    };


    $$(".note-chip")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const data =
                            notes[
                                button.dataset.note
                            ];


                        if (
                            !data
                        ) {

                            return;
                        }


                        $("#noteModalTitle")
                            .textContent =
                            data[0];


                        $("#noteModalIcon")
                            .textContent =
                            data[1];


                        $("#noteModalText")
                            .textContent =
                            data[2];


                        openLayer(
                            noteModal
                        );

                    }
                );

            }
        );


    $$(".close-note")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        closeLayer(
                            noteModal
                        );

                    }
                );

            }
        );


    /* =====================================================
       TIMELINE
    ===================================================== */

    const timeline =
        $("#timelineSlider");


    function updateTimeline() {

        if (
            !timeline
        ) {

            return;
        }


        const hour =
            Number(
                timeline.value
            );


        let data;


        if (
            hour <= 1
        ) {

            data = [
                "🍊",
                "Abertura fresca",
                "Cítricos e frutas aparecem primeiro."
            ];

        } else if (
            hour <= 4
        ) {

            data = [
                "🌸",
                "Coração floral",
                "Flores ganham destaque."
            ];

        } else {

            data = [
                "✦",
                "Fundo envolvente",
                "Notas quentes ficam mais próximas da pele."
            ];
        }


        $("#timelineHour")
            .textContent =
            `${hour}h`;


        $("#timelineIcon")
            .textContent =
            data[0];


        $("#timelineTitle")
            .textContent =
            data[1];


        $("#timelineText")
            .textContent =
            data[2];
    }


    timeline?.addEventListener(
        "input",
        updateTimeline
    );


    updateTimeline();


    /* =====================================================
       DREAM MOMENT
    ===================================================== */

    const moments = [

        [
            "Um detalhe pode mudar tudo.",
            "Uma lembrança pode começar com uma fragrância."
        ],

        [
            "Deixe sua presença ficar.",
            "Alguns momentos passam. Outros ficam na memória."
        ],

        [
            "Leveza também marca.",
            "Você não precisa exagerar para ser lembrado."
        ]

    ];


    $("#newDreamMoment")
        ?.addEventListener(
            "click",
            () => {

                const data =
                    moments[
                        Math.floor(
                            Math.random() *
                            moments.length
                        )
                    ];


                $("#dreamMomentTitle")
                    .textContent =
                    data[0];


                $("#dreamMomentText")
                    .textContent =
                    data[1];

            }
        );


    /* =====================================================
       CENAS
    ===================================================== */

    const scenes = {

        romance: [
            "♡",
            "ROMANCE DREAM",
            "Amor está no ar.",
            "Uma atmosfera delicada, rosa e envolvente."
        ],

        ceu: [
            "☾",
            "DREAM SKY",
            "Um universo para sonhar.",
            "Tons suaves e uma sensação celestial."
        ],

        flores: [
            "✿",
            "DREAM FLOWERS",
            "Flores em movimento.",
            "Um lado floral e delicado."
        ],

        energia: [
            "✦",
            "DREAM ENERGY",
            "Brilhe do seu jeito.",
            "Mais movimento, presença e energia."
        ]

    };


    $$(".scene-button")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const data =
                            scenes[
                                button.dataset.scene
                            ];


                        if (
                            !data
                        ) {

                            return;
                        }


                        $$(".scene-button")
                            .forEach(
                                item => {

                                    item.classList.toggle(
                                        "active",
                                        item ===
                                        button
                                    );

                                }
                            );


                        $("#sceneResultIcon")
                            .textContent =
                            data[0];


                        $("#sceneResultMini")
                            .textContent =
                            data[1];


                        $("#sceneResultTitle")
                            .textContent =
                            data[2];


                        $("#sceneResultText")
                            .textContent =
                            data[3];

                    }
                );

            }
        );


    /* =====================================================
       GALERIA
    ===================================================== */

    const galleryTrack =
        $("#galleryTrack");

    const galleryItems =
        $$(".gallery-item");

    const galleryDots =
        $("#galleryDots");


    let galleryIndex =
        0;

    let autoplayTimer =
        null;

    let autoplayOn =
        false;


    function syncGallery() {

        galleryIndex =
            clamp(
                galleryIndex,
                0,
                Math.max(
                    0,
                    galleryItems.length -
                    1
                )
            );


        if (
            $("#galleryCurrent")
        ) {

            $("#galleryCurrent")
                .textContent =
                String(
                    galleryIndex + 1
                ).padStart(
                    2,
                    "0"
                );
        }


        if (
            $("#galleryTotal")
        ) {

            $("#galleryTotal")
                .textContent =
                String(
                    galleryItems.length
                ).padStart(
                    2,
                    "0"
                );
        }


        $$(".gallery-dot",
            galleryDots ||
            document
        ).forEach(
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


        galleryTrack.scrollTo({

            left:
                galleryItems[
                    galleryIndex
                ].offsetLeft,

            behavior:
                "smooth"

        });


        syncGallery();
    }


    if (
        galleryDots
    ) {

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


    $("#galleryPrev")
        ?.addEventListener(
            "click",
            () => {

                goGallery(
                    galleryIndex - 1
                );

            }
        );


    $("#galleryNext")
        ?.addEventListener(
            "click",
            () => {

                goGallery(
                    galleryIndex + 1
                );

            }
        );


    galleryTrack?.addEventListener(
        "scroll",
        () => {

            clearTimeout(
                galleryTrack._timer
            );


            galleryTrack._timer =
                setTimeout(
                    () => {

                        const center =
                            galleryTrack.scrollLeft +
                            galleryTrack.clientWidth /
                            2;


                        let best =
                            0;

                        let distance =
                            Infinity;


                        galleryItems.forEach(
                            (item, index) => {

                                const currentDistance =
                                    Math.abs(
                                        center -
                                        (
                                            item.offsetLeft +
                                            item.offsetWidth /
                                            2
                                        )
                                    );


                                if (
                                    currentDistance <
                                    distance
                                ) {

                                    distance =
                                        currentDistance;

                                    best =
                                        index;
                                }

                            }
                        );


                        galleryIndex =
                            best;


                        syncGallery();

                    },
                    80
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    const lightbox =
        $("#lightbox");

    const lightboxImage =
        $("#lightboxImage");

    const lightboxCounter =
        $("#lightboxCounter");

    const lightboxTitle =
        $("#lightboxTitle");


    function openLightbox(
        index
    ) {

        const image =
            $("img",
                galleryItems[
                    index
                ]
            );


        if (
            !image ||
            !lightbox
        ) {

            return;
        }


        galleryIndex =
            index;


        lightboxImage.src =
            image.currentSrc ||
            image.src;


        lightboxImage.alt =
            image.alt ||
            "Dream";


        if (
            lightboxCounter
        ) {

            lightboxCounter.textContent =
                `${
                    String(index + 1)
                        .padStart(2, "0")
                } / ${
                    String(
                        galleryItems.length
                    ).padStart(2, "0")
                }`;
        }


        if (
            lightboxTitle
        ) {

            lightboxTitle.textContent =
                image.alt ||
                "Dream";
        }


        openLayer(
            lightbox
        );
    }


    galleryItems.forEach(
        (item, index) => {

            $("img", item)
                ?.addEventListener(
                    "click",
                    () => {

                        openLightbox(
                            index
                        );

                    }
                );

        }
    );


    $("#lightboxClose")
        ?.addEventListener(
            "click",
            () => {

                closeLayer(
                    lightbox
                );

            }
        );


    $("#lightboxBackdrop")
        ?.addEventListener(
            "click",
            () => {

                closeLayer(
                    lightbox
                );

            }
        );


    $("#lightboxPrev")
        ?.addEventListener(
            "click",
            () => {

                galleryIndex =
                    (
                        galleryIndex -
                        1 +
                        galleryItems.length
                    ) %
                    galleryItems.length;


                openLightbox(
                    galleryIndex
                );

            }
        );


    $("#lightboxNext")
        ?.addEventListener(
            "click",
            () => {

                galleryIndex =
                    (
                        galleryIndex +
                        1
                    ) %
                    galleryItems.length;


                openLightbox(
                    galleryIndex
                );

            }
        );


    /* =====================================================
       AUTOPLAY
    ===================================================== */

    function autoplay(
        stop = false
    ) {

        clearInterval(
            autoplayTimer
        );


        if (
            stop
        ) {

            autoplayOn =
                false;

        } else {

            autoplayOn =
                true;


            autoplayTimer =
                setInterval(
                    () => {

                        goGallery(
                            galleryIndex +
                            1
                        );

                    },
                    4000
                );
        }


        const button =
            $("#galleryAutoplay");


        if (
            button
        ) {

            button.textContent =
                autoplayOn
                    ? "❚❚ Pausar"
                    : "▶ Autoplay";
        }
    }


    $("#galleryAutoplay")
        ?.addEventListener(
            "click",
            () => {

                autoplay(
                    autoplayOn
                );

            }
        );


    syncGallery();


    /* =====================================================
       MOOD
    ===================================================== */

    $$(".mood-button")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const mood =
                            button.dataset.mood;


                        $$(".mood-button")
                            .forEach(
                                item => {

                                    item.classList.toggle(
                                        "active",
                                        item.dataset.mood ===
                                        mood
                                    );

                                }
                            );


                        body.dataset.mood =
                            mood;


                        save(
                            "dreamMood",
                            mood
                        );


                        showToast(
                            "Mood Dream aplicado ♡"
                        );

                    }
                );

            }
        );


    /* =====================================================
       QUIZ
    ===================================================== */

    const quizQuestions = [

        [
            "Qual momento combina mais com você?",
            [
                [
                    "Um encontro especial",
                    "romantic"
                ],
                [
                    "Uma noite tranquila",
                    "dream"
                ],
                [
                    "Um momento só meu",
                    "soft"
                ]
            ]
        ],

        [
            "Qual sensação você prefere?",
            [
                [
                    "Romântica e marcante",
                    "romantic"
                ],
                [
                    "Misteriosa e envolvente",
                    "dream"
                ],
                [
                    "Leve e confortável",
                    "soft"
                ]
            ]
        ],

        [
            "Como você gostaria de ser lembrado?",
            [
                [
                    "Pela intensidade",
                    "romantic"
                ],
                [
                    "Pelo mistério",
                    "dream"
                ],
                [
                    "Pela delicadeza",
                    "soft"
                ]
            ]
        ]

    ];


    const quizResults = {

        romantic: [
            "♡",
            "Seu Dream é Romântico",
            "Você combina com momentos intensos e especiais."
        ],

        dream: [
            "✦",
            "Seu Dream é Envolvente",
            "Você gosta de experiências marcantes e misteriosas."
        ],

        soft: [
            "✧",
            "Seu Dream é Delicado",
            "Você valoriza leveza, conforto e pequenos detalhes."
        ]

    };


    let quizIndex =
        0;


    let quizScore = {

        romantic: 0,
        dream: 0,
        soft: 0

    };


    function renderQuiz() {

        const start =
            $("#quizStart");

        const panel =
            $("#quizQuestions");

        const result =
            $("#quizResult");


        if (
            start
        ) {

            start.hidden =
                true;
        }


        if (
            panel
        ) {

            panel.hidden =
                false;
        }


        if (
            result
        ) {

            result.hidden =
                true;
        }


        if (
            quizIndex >=
            quizQuestions.length
        ) {

            const winner =
                Object.keys(
                    quizScore
                ).sort(
                    (a, b) =>
                        quizScore[b] -
                        quizScore[a]
                )[0];


            const data =
                quizResults[
                    winner
                ];


            if (
                panel
            ) {

                panel.hidden =
                    true;
            }


            if (
                result
            ) {

                result.hidden =
                    false;
            }


            $("#quizResultIcon")
                .textContent =
                data[0];


            $("#quizResultTitle")
                .textContent =
                data[1];


            $("#quizResultText")
                .textContent =
                data[2];


            $("#quizProgressBar")
                .style.width =
                "100%";


            return;
        }


        const question =
            quizQuestions[
                quizIndex
            ];


        $("#quizQuestion")
            .textContent =
            question[0];


        const options =
            $("#quizOptions");


        options.innerHTML =
            "";


        question[1]
            .forEach(
                ([text, type]) => {

                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type =
                        "button";


                    button.className =
                        "quiz-option";


                    button.textContent =
                        text;


                    button.addEventListener(
                        "click",
                        () => {

                            quizScore[
                                type
                            ]++;


                            quizIndex++;


                            renderQuiz();

                        }
                    );


                    options.appendChild(
                        button
                    );

                }
            );


        $("#quizStep")
            .textContent =
            `${
                quizIndex + 1
            } / ${
                quizQuestions.length
            }`;


        $("#quizProgressBar")
            .style.width =
            `${
                quizIndex /
                quizQuestions.length *
                100
            }%`;
    }


    function startQuiz() {

        quizIndex =
            0;


        quizScore = {

            romantic: 0,
            dream: 0,
            soft: 0

        };


        renderQuiz();
    }


    $("#startQuiz")
        ?.addEventListener(
            "click",
            startQuiz
        );


    $("#restartQuiz")
        ?.addEventListener(
            "click",
            startQuiz
        );


    /* =====================================================
       DREAM STUDIO
    ===================================================== */

    const settings =
        $("#settingsPanel");


    $("#settingsButton")
        ?.addEventListener(
            "click",
            () => {

                settings?.classList.toggle(
                    "open"
                );

            }
        );


    $("#closeSettings")
        ?.addEventListener(
            "click",
            () => {

                settings?.classList.remove(
                    "open"
                );

            }
        );


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


    function hexRgb(
        hex
    ) {

        const number =
            parseInt(
                hex.replace(
                    "#",
                    ""
                ),
                16
            );


        return `${
            number >> 16 & 255
        }, ${
            number >> 8 & 255
        }, ${
            number & 255
        }`;
    }


    function applyColors(
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
            hexRgb(primary)
        );


        root.style.setProperty(
            "--secondary-rgb",
            hexRgb(secondary)
        );


        save(
            "dreamPrimary",
            primary
        );


        save(
            "dreamSecondary",
            secondary
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
    }


    $$(".palette")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const palette =
                            palettes[
                                button.dataset.palette
                            ];


                        if (
                            !palette
                        ) {

                            return;
                        }


                        applyColors(
                            palette[0],
                            palette[1]
                        );


                        $$(".palette")
                            .forEach(
                                item => {

                                    item.classList.toggle(
                                        "active",
                                        item ===
                                        button
                                    );

                                }
                            );

                    }
                );

            }
        );


    const primaryColor =
        $("#primaryColor");

    const secondaryColor =
        $("#secondaryColor");


    function manualColors() {

        if (
            primaryColor &&
            secondaryColor
        ) {

            applyColors(
                primaryColor.value,
                secondaryColor.value
            );
        }
    }


    primaryColor?.addEventListener(
        "input",
        manualColors
    );


    secondaryColor?.addEventListener(
        "input",
        manualColors
    );


    const savedPrimary =
        load(
            "dreamPrimary"
        );


    const savedSecondary =
        load(
            "dreamSecondary"
        );


    if (
        savedPrimary &&
        savedSecondary
    ) {

        applyColors(
            savedPrimary,
            savedSecondary
        );
    }


    /* =====================================================
       SETTINGS TOGGLES
    ===================================================== */

    function bindToggle(
        id,
        className,
        key
    ) {

        const element =
            $(id);


        if (
            !element
        ) {

            return;
        }


        element.checked =
            load(
                key,
                element.checked
                    ? "true"
                    : "false"
            ) !==
            "false";


        body.classList.toggle(
            className,
            !element.checked
        );


        element.addEventListener(
            "change",
            () => {

                body.classList.toggle(
                    className,
                    !element.checked
                );


                save(
                    key,
                    element.checked
                );

            }
        );
    }


    bindToggle(
        "#glassToggle",
        "no-glass",
        "dreamGlass"
    );


    bindToggle(
        "#animationsToggle",
        "no-animations",
        "dreamAnimations"
    );


    bindToggle(
        "#cursorToggle",
        "no-cursor",
        "dreamCursor"
    );


    /* PARTICLES */

    const particlesToggle =
        $("#particlesToggle");


    if (
        particlesToggle
    ) {

        particlesToggle.checked =
            particlesEnabled;


        particlesToggle.addEventListener(
            "change",
            () => {

                particlesEnabled =
                    particlesToggle.checked;


                body.classList.toggle(
                    "no-particles",
                    !particlesEnabled
                );


                save(
                    "dreamParticles",
                    particlesEnabled
                );


                if (
                    !particlesEnabled &&
                    particles
                ) {

                    particles.innerHTML =
                        "";
                }


                restartParticles();

            }
        );
    }


    /* CLEAN */

    const cleanToggle =
        $("#cleanModeToggle");


    if (
        cleanToggle
    ) {

        cleanToggle.checked =
            load(
                "dreamClean",
                "false"
            ) ===
            "true";


        body.classList.toggle(
            "clean-mode",
            cleanToggle.checked
        );


        cleanToggle.addEventListener(
            "change",
            () => {

                body.classList.toggle(
                    "clean-mode",
                    cleanToggle.checked
                );


                save(
                    "dreamClean",
                    cleanToggle.checked
                );

            }
        );
    }


    /* PERFORMANCE */

    const performanceToggle =
        $("#performanceToggle");


    if (
        performanceToggle
    ) {

        performanceToggle.checked =
            load(
                "dreamPerformance",
                "false"
            ) ===
            "true";


        body.classList.toggle(
            "performance-mode",
            performanceToggle.checked
        );


        performanceToggle.addEventListener(
            "change",
            () => {

                body.classList.toggle(
                    "performance-mode",
                    performanceToggle.checked
                );


                save(
                    "dreamPerformance",
                    performanceToggle.checked
                );


                restartParticles();

            }
        );
    }


    /* 3D */

    const motionToggle =
        $("#motion3dToggle");

    const motionRange =
        $("#motion3dRange");

    const motionValue =
        $("#motion3dValue");


    let motionEnabled =
        load(
            "dreamMotion3d",
            "true"
        ) !==
        "false";


    if (
        motionToggle
    ) {

        motionToggle.checked =
            motionEnabled;


        motionToggle.addEventListener(
            "change",
            () => {

                motionEnabled =
                    motionToggle.checked;


                save(
                    "dreamMotion3d",
                    motionEnabled
                );


                motion3d =
                    motionEnabled
                        ? Number(
                            motionRange?.value ||
                            100
                        ) /
                        100
                        : 0;

            }
        );
    }


    if (
        motionRange
    ) {

        motionRange.value =
            load(
                "dreamMotion3dValue",
                100
            );


        const update =
            () => {

                motion3d =
                    motionEnabled
                        ? Number(
                            motionRange.value
                        ) /
                        100
                        : 0;


                if (
                    motionValue
                ) {

                    motionValue.textContent =
                        `${motionRange.value}%`;
                }


                save(
                    "dreamMotion3dValue",
                    motionRange.value
                );

            };


        motionRange.addEventListener(
            "input",
            update
        );


        update();
    }


    /* CURSOR GLOW INTENSITY */

    const cursorRange =
        $("#cursorGlowRange");

    const cursorValue =
        $("#cursorGlowValue");


    if (
        cursorRange
    ) {

        cursorRange.value =
            load(
                "dreamCursorGlow",
                100
            );


        const update =
            () => {

                if (
                    cursorGlow
                ) {

                    cursorGlow.style.opacity =
                        String(
                            Number(
                                cursorRange.value
                            ) /
                            285
                        );
                }


                if (
                    cursorValue
                ) {

                    cursorValue.textContent =
                        `${cursorRange.value}%`;
                }


                save(
                    "dreamCursorGlow",
                    cursorRange.value
                );

            };


        cursorRange.addEventListener(
            "input",
            update
        );


        update();
    }


    /* SPEED */

    const speed =
        $("#animationSpeed");

    const speedValue =
        $("#animationSpeedValue");


    if (
        speed
    ) {

        speed.value =
            load(
                "dreamAnimationSpeed",
                100
            );


        const update =
            () => {

                root.style.setProperty(
                    "--animation-speed",
                    Number(
                        speed.value
                    ) /
                    100
                );


                if (
                    speedValue
                ) {

                    speedValue.textContent =
                        `${speed.value}%`;
                }


                save(
                    "dreamAnimationSpeed",
                    speed.value
                );

            };


        speed.addEventListener(
            "input",
            update
        );


        update();
    }


    /* CONTRAST */

    const contrast =
        $("#contrastControl");

    const contrastValue =
        $("#contrastValue");


    if (
        contrast
    ) {

        contrast.value =
            load(
                "dreamContrast",
                100
            );


        const update =
            () => {

                root.style.setProperty(
                    "--site-contrast",
                    Number(
                        contrast.value
                    ) /
                    100
                );


                if (
                    contrastValue
                ) {

                    contrastValue.textContent =
                        `${contrast.value}%`;
                }


                save(
                    "dreamContrast",
                    contrast.value
                );

            };


        contrast.addEventListener(
            "input",
            update
        );


        update();
    }


    /* FONT SIZE */

    $("[data-font-size]");


    $$(".font-size-setting button")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        body.classList.remove(
                            "font-small",
                            "font-normal",
                            "font-large"
                        );


                        body.classList.add(
                            `font-${
                                button.dataset.fontSize
                            }`
                        );


                        $$(".font-size-setting button")
                            .forEach(
                                item => {

                                    item.classList.toggle(
                                        "active",
                                        item ===
                                        button
                                    );

                                }
                            );


                        save(
                            "dreamFontSize",
                            button.dataset.fontSize
                        );

                    }
                );

            }
        );


    const savedFont =
        load(
            "dreamFontSize",
            "normal"
        );


    $(
        `[data-font-size="${savedFont}"]`
    )?.click();


    /* PRESETS */

    $$(".preset-button")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const preset =
                            button.dataset.preset;


                        $$(".preset-button")
                            .forEach(
                                item => {

                                    item.classList.toggle(
                                        "active",
                                        item ===
                                        button
                                    );

                                }
                            );


                        if (
                            preset ===
                            "dream"
                        ) {

                            applyColors(
                                ...palettes.dream
                            );


                            body.classList.remove(
                                "clean-mode",
                                "performance-mode"
                            );


                            dark =
                                false;

                        } else if (
                            preset ===
                            "cinematic"
                        ) {

                            dark =
                                true;

                        } else if (
                            preset ===
                            "soft"
                        ) {

                            body.classList.add(
                                "clean-mode"
                            );

                        } else if (
                            preset ===
                            "performance"
                        ) {

                            body.classList.add(
                                "performance-mode"
                            );
                        }


                        applyTheme();

                    }
                );

            }
        );


    /* FULLSCREEN */

    $("#fullscreenButton")
        ?.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        document.fullscreenElement
                    ) {

                        await document
                            .exitFullscreen();

                    } else {

                        await root
                            .requestFullscreen();
                    }

                } catch {

                    showToast(
                        "Tela cheia indisponível"
                    );
                }

            }
        );


    /* RESET */

    $("#resetSettings")
        ?.addEventListener(
            "click",
            () => {

                [
                    "dreamPrimary",
                    "dreamSecondary",
                    "dreamDarkMode",
                    "dreamGlass",
                    "dreamAnimations",
                    "dreamCursor",
                    "dreamParticles",
                    "dreamClean",
                    "dreamPerformance",
                    "dreamMotion3d",
                    "dreamMotion3dValue",
                    "dreamCursorGlow",
                    "dreamAnimationSpeed",
                    "dreamContrast",
                    "dreamFontSize"
                ].forEach(
                    key => {

                        try {

                            localStorage.removeItem(
                                key
                            );

                        } catch {}

                    }
                );


                location.reload();

            }
        );


    /* =====================================================
       TECLADO
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const tag =
                document.activeElement
                    ?.tagName;


            if (
                [
                    "INPUT",
                    "TEXTAREA",
                    "SELECT"
                ].includes(tag)
            ) {

                return;
            }


            if (
                event.key ===
                "Escape"
            ) {

                closeLayer(
                    productModal
                );


                closeLayer(
                    noteModal
                );


                closeLayer(
                    lightbox
                );


                settings?.classList.remove(
                    "open"
                );


                menu?.classList.remove(
                    "open"
                );
            }


            if (
                event.key.toLowerCase() ===
                "s"
            ) {

                doSpray();
            }


            if (
                event.key.toLowerCase() ===
                "m"
            ) {

                toggleMusic();
            }


            if (
                event.key.toLowerCase() ===
                "d"
            ) {

                dark =
                    !dark;

                applyTheme();
            }


            if (
                event.key.toLowerCase() ===
                "g"
            ) {

                settings?.classList.toggle(
                    "open"
                );
            }

        }
    );


    /* =====================================================
       FINAL
    ===================================================== */

    body.classList.add(
        "ready"
    );

});