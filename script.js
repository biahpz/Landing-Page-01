document.body.classList.add("js-ativo");


/* =========================================
   STORAGE
========================================= */

function salvar(chave, valor) {

    try {

        localStorage.setItem(
            chave,
            valor
        );

    } catch (erro) {}

}


function ler(chave) {

    try {

        return localStorage.getItem(
            chave
        );

    } catch (erro) {

        return null;

    }

}


/* =========================================
   TOAST
========================================= */

const toast =
    document.getElementById(
        "toast"
    );


let toastTimer;


function mostrarToast(texto) {

    if (!toast) return;


    toast.textContent =
        texto;


    toast.classList.add(
        "mostrar"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "mostrar"
                );

            },

            2200
        );

}


/* =========================================
   LOADER
========================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                const loader =
                    document.getElementById(
                        "loader"
                    );


                if (loader) {

                    loader.classList.add(
                        "sumir"
                    );

                }

            },

            900
        );

    }
);


/* =========================================
   MENU MOBILE
========================================= */

const menu =
    document.getElementById(
        "menu"
    );


const menuMobile =
    document.getElementById(
        "menuMobile"
    );


if (menuMobile && menu) {

    menuMobile.addEventListener(
        "click",
        () => {

            menu.classList.toggle(
                "ativo"
            );


            menuMobile.textContent =
                menu.classList.contains(
                    "ativo"
                )
                    ? "✕"
                    : "☰";

        }
    );


    document
        .querySelectorAll(
            ".menu a"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        menu.classList.remove(
                            "ativo"
                        );


                        menuMobile.textContent =
                            "☰";

                    }
                );

            }
        );

}


/* =========================================
   SCROLL
========================================= */

const header =
    document.getElementById(
        "header"
    );


const barraProgresso =
    document.getElementById(
        "barraProgresso"
    );


const voltarTopo =
    document.getElementById(
        "voltarTopo"
    );


function atualizarScroll() {

    const scroll =
        window.scrollY;


    if (header) {

        header.classList.toggle(
            "scrolled",
            scroll > 40
        );

    }


    if (voltarTopo) {

        voltarTopo.classList.toggle(
            "mostrar",
            scroll > 600
        );

    }


    if (barraProgresso) {

        const total =
            document.documentElement
                .scrollHeight
            -
            window.innerHeight;


        barraProgresso.style.width =
            total > 0
                ?
                (
                    scroll /
                    total
                )
                *
                100
                +
                "%"
                :
                "0%";

    }

}


window.addEventListener(
    "scroll",
    atualizarScroll,
    {
        passive: true
    }
);


atualizarScroll();


if (voltarTopo) {

    voltarTopo.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================
   REVEAL
========================================= */

const revelar =
    document.querySelectorAll(
        ".revelar"
    );


if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(

            entradas => {

                entradas.forEach(
                    entrada => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target
                                .classList
                                .add(
                                    "visivel"
                                );


                            observer.unobserve(
                                entrada.target
                            );

                        }

                    }
                );

            },

            {
                threshold: .08
            }

        );


    revelar.forEach(
        elemento => {

            observer.observe(
                elemento
            );

        }
    );

} else {

    revelar.forEach(
        elemento => {

            elemento.classList.add(
                "visivel"
            );

        }
    );

}


/* =========================================
   MEDIDORES
========================================= */

const medidores =
    document.querySelectorAll(
        ".barra div"
    );


if (
    "IntersectionObserver"
    in window
) {

    const observerMedidor =
        new IntersectionObserver(

            entradas => {

                entradas.forEach(
                    entrada => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target
                                .style
                                .width =
                                entrada.target
                                    .dataset
                                    .valor
                                +
                                "%";


                            observerMedidor
                                .unobserve(
                                    entrada.target
                                );

                        }

                    }
                );

            },

            {
                threshold: .3
            }

        );


    medidores.forEach(
        medidor => {

            observerMedidor.observe(
                medidor
            );

        }
    );

}


/* =========================================
   PARTÍCULAS
========================================= */

const particulas =
    document.getElementById(
        "particulas"
    );


function criarParticula() {

    if (
        !particulas ||
        document.body.classList
            .contains(
                "sem-particulas"
            )
    ) {
        return;
    }


    const simbolos =
        ["♡", "✦", "✿"];


    const elemento =
        document.createElement(
            "span"
        );


    elemento.className =
        "particula";


    elemento.textContent =
        simbolos[
            Math.floor(
                Math.random()
                *
                simbolos.length
            )
        ];


    elemento.style.left =
        Math.random()
        *
        100
        +
        "vw";


    elemento.style.fontSize =
        9
        +
        Math.random()
        *
        16
        +
        "px";


    elemento.style.animationDuration =
        8
        +
        Math.random()
        *
        9
        +
        "s";


    particulas.appendChild(
        elemento
    );


    setTimeout(
        () => elemento.remove(),
        18000
    );

}


setInterval(
    criarParticula,
    900
);


/* =========================================
   CURSOR
========================================= */

const cursorDream =
    document.getElementById(
        "cursorDream"
    );


document.addEventListener(
    "mousemove",
    evento => {

        if (
            !cursorDream ||
            window.innerWidth < 900
        ) {
            return;
        }


        cursorDream.style.left =
            evento.clientX
            +
            "px";


        cursorDream.style.top =
            evento.clientY
            +
            "px";

    }
);


/* =========================================
   FRASCO 3D
========================================= */

const heroProduto =
    document.getElementById(
        "heroProduto"
    );


const frasco =
    document.getElementById(
        "frascoPrincipal"
    );


const brilho =
    document.getElementById(
        "brilhoProduto"
    );


if (heroProduto && frasco) {

    heroProduto.addEventListener(
        "mousemove",
        evento => {

            if (
                window.innerWidth <
                900
            ) {
                return;
            }


            const area =
                heroProduto
                    .getBoundingClientRect();


            const x =
                evento.clientX
                -
                area.left;


            const y =
                evento.clientY
                -
                area.top;


            const rx =
                -(
                    y -
                    area.height / 2
                )
                /
                30;


            const ry =
                (
                    x -
                    area.width / 2
                )
                /
                30;


            frasco.style.transform =
                `
                perspective(900px)
                rotateX(${rx}deg)
                rotateY(${ry}deg)
                scale(1.03)
                `;


            if (brilho) {

                brilho.style.left =
                    x - 100 + "px";


                brilho.style.top =
                    y - 100 + "px";

            }

        }
    );


    heroProduto.addEventListener(
        "mouseleave",
        () => {

            frasco.style.transform =
                "";

        }
    );

}


/* =========================================
   SPRAY
========================================= */

const botaoSpray =
    document.getElementById(
        "botaoSpray"
    );


const sprayArea =
    document.getElementById(
        "sprayArea"
    );


function fazerSpray() {

    if (!sprayArea) return;


    for (
        let i = 0;
        i < 30;
        i++
    ) {

        const gota =
            document.createElement(
                "span"
            );


        gota.className =
            "spray-particula";


        gota.style.setProperty(
            "--x",
            Math.random()
            *
            190
            -
            95
            +
            "px"
        );


        gota.style.setProperty(
            "--y",
            -(
                35
                +
                Math.random()
                *
                160
            )
            +
            "px"
        );


        sprayArea.appendChild(
            gota
        );


        setTimeout(
            () => gota.remove(),
            1200
        );

    }


    mostrarToast(
        "Dream Amor no Ar ✦"
    );

}


if (botaoSpray) {

    botaoSpray.addEventListener(
        "click",
        fazerSpray
    );

}


/* =========================================
   FAVORITOS
========================================= */

const favoritar =
    document.getElementById(
        "favoritar"
    );


const favoritarModal =
    document.getElementById(
        "favoritarModal"
    );


function estaFavoritado() {

    return (
        ler("dreamFavorito")
        ===
        "sim"
    );

}


function atualizarFavorito() {

    const ativo =
        estaFavoritado();


    if (favoritar) {

        favoritar.classList.toggle(
            "favoritado",
            ativo
        );


        const coracao =
            favoritar.querySelector(
                ".coracao-favorito"
            );


        const texto =
            favoritar.querySelector(
                ".texto-favorito"
            );


        if (coracao) {

            coracao.textContent =
                ativo
                    ? "♥"
                    : "♡";

        }


        if (texto) {

            texto.textContent =
                ativo
                    ? "Favoritado"
                    : "Favoritar";

        }

    }


    if (favoritarModal) {

        favoritarModal.textContent =
            ativo
                ? "♥ Favoritado"
                : "♡ Favoritar";

    }

}


function alternarFavorito() {

    const estado =
        !estaFavoritado();


    salvar(
        "dreamFavorito",
        estado
            ? "sim"
            : "nao"
    );


    atualizarFavorito();


    mostrarToast(
        estado
            ?
            "Adicionado aos favoritos ♡"
            :
            "Removido dos favoritos"
    );

}


if (favoritar) {

    favoritar.addEventListener(
        "click",
        alternarFavorito
    );

}


if (favoritarModal) {

    favoritarModal.addEventListener(
        "click",
        alternarFavorito
    );

}


atualizarFavorito();


/* =========================================
   COMPARTILHAR
========================================= */

async function compartilharSite() {

    try {

        if (navigator.share) {

            await navigator.share({

                title:
                    "Dream Amor no Ar",

                text:
                    "Conheça Dream Amor no Ar 350ml.",

                url:
                    location.href

            });

        }

        else {

            await navigator.clipboard
                .writeText(
                    location.href
                );


            mostrarToast(
                "Link copiado!"
            );

        }

    } catch (erro) {}

}


document
    .getElementById(
        "compartilhar"
    )
    ?.addEventListener(
        "click",
        compartilharSite
    );


document
    .getElementById(
        "compartilharModal"
    )
    ?.addEventListener(
        "click",
        compartilharSite
    );


/* =========================================
   MODAIS
========================================= */

const modalProduto =
    document.getElementById(
        "modalProduto"
    );


const modalNota =
    document.getElementById(
        "modalNota"
    );


const lightbox =
    document.getElementById(
        "lightbox"
    );


function atualizarBloqueio() {

    const aberto =
        document.querySelector(
            ".modal.ativo, .lightbox.ativo"
        );


    document.body.classList.toggle(
        "modal-aberto",
        Boolean(aberto)
    );

}


function abrirProduto() {

    modalProduto?.classList.add(
        "ativo"
    );


    atualizarBloqueio();

}


function fecharProduto() {

    modalProduto?.classList.remove(
        "ativo"
    );


    atualizarBloqueio();

}


document
    .querySelectorAll(
        ".abrir-produto"
    )
    .forEach(
        botao => {

            botao.addEventListener(
                "click",
                abrirProduto
            );

        }
    );


document
    .querySelectorAll(
        ".fechar-modal"
    )
    .forEach(
        botao => {

            botao.addEventListener(
                "click",
                fecharProduto
            );

        }
    );


/* =========================================
   NOTAS
========================================= */

const dadosNotas = {

    bergamota: [
        "Bergamota",
        "🍋",
        "Uma nota cítrica fresca e luminosa."
    ],

    cassis: [
        "Cassis",
        "🫐",
        "Uma faceta frutada marcante e levemente ácida."
    ],

    mandarina: [
        "Mandarina",
        "🍊",
        "Frescor cítrico doce e alegre."
    ],

    maca: [
        "Maçã",
        "🍎",
        "Um toque frutado fresco e suculento."
    ],

    rosa: [
        "Rosa",
        "🌹",
        "Uma nota floral clássica e romântica."
    ],

    lotus: [
        "Flor de Lótus",
        "🌸",
        "Um floral leve, delicado e suave."
    ],

    freesia: [
        "Frésia",
        "💐",
        "Uma flor fresca e luminosa."
    ],

    pessego: [
        "Pêssego",
        "🍑",
        "Uma faceta macia, frutada e doce."
    ],

    ambar: [
        "Âmbar",
        "✨",
        "Traz calor e profundidade."
    ],

    sandalo: [
        "Sândalo",
        "🪵",
        "Uma madeira cremosa e confortável."
    ],

    baunilha: [
        "Baunilha",
        "🤍",
        "Um dulçor macio e envolvente."
    ],

    musk: [
        "Musk",
        "☁",
        "Traz uma sensação limpa e confortável."
    ]

};


document
    .querySelectorAll(
        ".nota-chip"
    )
    .forEach(
        chip => {

            chip.addEventListener(
                "click",
                () => {

                    const dados =
                        dadosNotas[
                            chip.dataset.nota
                        ];


                    if (!dados) return;


                    document
                        .getElementById(
                            "notaTitulo"
                        )
                        .textContent =
                        dados[0];


                    document
                        .getElementById(
                            "notaIcone"
                        )
                        .textContent =
                        dados[1];


                    document
                        .getElementById(
                            "notaDescricao"
                        )
                        .textContent =
                        dados[2];


                    modalNota
                        ?.classList
                        .add(
                            "ativo"
                        );


                    atualizarBloqueio();

                }
            );

        }
    );


function fecharNota() {

    modalNota
        ?.classList
        .remove(
            "ativo"
        );


    atualizarBloqueio();

}


document
    .querySelectorAll(
        ".fechar-nota"
    )
    .forEach(
        botao => {

            botao.addEventListener(
                "click",
                fecharNota
            );

        }
    );


/* =========================================
   CARROSSEL
========================================= */

const carrossel =
    document.getElementById(
        "carrossel"
    );


const slides =
    document.querySelectorAll(
        ".slide"
    );


let slideAtual = 0;


function atualizarCarrossel() {

    if (!carrossel) return;


    carrossel.style.transform =
        `translateX(-${slideAtual * 100}%)`;


    document
        .querySelectorAll(
            ".pontos button"
        )
        .forEach(
            (ponto, indice) => {

                ponto.classList.toggle(
                    "ativo",
                    indice === slideAtual
                );

            }
        );

}


const pontos =
    document.getElementById(
        "pontos"
    );


slides.forEach(
    (_, indice) => {

        const ponto =
            document.createElement(
                "button"
            );


        if (
            indice === 0
        ) {

            ponto.classList.add(
                "ativo"
            );

        }


        ponto.addEventListener(
            "click",
            () => {

                slideAtual =
                    indice;


                atualizarCarrossel();

            }
        );


        pontos?.appendChild(
            ponto
        );

    }
);


function proximoSlide() {

    if (!slides.length) return;


    slideAtual =
        (
            slideAtual +
            1
        )
        %
        slides.length;


    atualizarCarrossel();

}


function slideAnterior() {

    if (!slides.length) return;


    slideAtual =
        (
            slideAtual -
            1 +
            slides.length
        )
        %
        slides.length;


    atualizarCarrossel();

}


document
    .getElementById(
        "proximo"
    )
    ?.addEventListener(
        "click",
        proximoSlide
    );


document
    .getElementById(
        "anterior"
    )
    ?.addEventListener(
        "click",
        slideAnterior
    );


let autoCarrossel =
    setInterval(
        proximoSlide,
        6000
    );


/* =========================================
   SWIPE
========================================= */

const janelaCarrossel =
    document.querySelector(
        ".carrossel-janela"
    );


let toqueInicio =
    0;


janelaCarrossel
    ?.addEventListener(
        "touchstart",
        evento => {

            toqueInicio =
                evento.touches[0]
                    .clientX;

        },
        {
            passive: true
        }
    );


janelaCarrossel
    ?.addEventListener(
        "touchend",
        evento => {

            const fim =
                evento.changedTouches[0]
                    .clientX;


            const diferenca =
                toqueInicio -
                fim;


            if (
                Math.abs(diferenca)
                <
                45
            ) {
                return;
            }


            diferenca > 0
                ?
                proximoSlide()
                :
                slideAnterior();

        },
        {
            passive: true
        }
    );


/* =========================================
   LIGHTBOX
========================================= */

const lightboxImagem =
    document.getElementById(
        "lightboxImagem"
    );


document
    .querySelectorAll(
        ".slide img"
    )
    .forEach(
        imagem => {

            imagem.addEventListener(
                "click",
                () => {

                    lightboxImagem.src =
                        imagem.src;


                    lightboxImagem.alt =
                        imagem.alt;


                    lightbox.classList.add(
                        "ativo"
                    );


                    atualizarBloqueio();

                }
            );

        }
    );


function fecharLightbox() {

    lightbox
        ?.classList
        .remove(
            "ativo"
        );


    atualizarBloqueio();

}


document
    .getElementById(
        "lightboxFechar"
    )
    ?.addEventListener(
        "click",
        fecharLightbox
    );


document
    .getElementById(
        "fecharLightbox"
    )
    ?.addEventListener(
        "click",
        fecharLightbox
    );


/* =========================================
   TECLADO
========================================= */

document.addEventListener(
    "keydown",
    evento => {

        const tag =
            document.activeElement
                ?.tagName;


        if (
            tag === "INPUT" ||
            tag === "TEXTAREA"
        ) {
            return;
        }


        if (
            evento.key ===
            "ArrowRight"
        ) {

            proximoSlide();

        }


        if (
            evento.key ===
            "ArrowLeft"
        ) {

            slideAnterior();

        }


        if (
            evento.key ===
            "Escape"
        ) {

            fecharProduto();

            fecharNota();

            fecharLightbox();

        }

    }
);


/* =========================================
   MOOD
========================================= */

const moods = {

    romantico: [
        "♡",
        "Amor no Ar",
        "Um clima romântico, delicado e especial."
    ],

    delicado: [
        "✿",
        "Leve & Delicado",
        "Uma atmosfera suave e confortável."
    ],

    noturno: [
        "☾",
        "Dream After Dark",
        "Uma atmosfera mais intensa para a noite."
    ]

};


document
    .querySelectorAll(
        ".mood-botao"
    )
    .forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    const mood =
                        botao.dataset.mood;


                    const dados =
                        moods[mood];


                    document
                        .querySelectorAll(
                            ".mood-botao"
                        )
                        .forEach(
                            outro => {

                                outro.classList.remove(
                                    "ativo"
                                );

                            }
                        );


                    botao.classList.add(
                        "ativo"
                    );


                    const card =
                        document.getElementById(
                            "moodCard"
                        );


                    card.className =
                        "mood-card "
                        +
                        mood;


                    document
                        .getElementById(
                            "moodIcone"
                        )
                        .textContent =
                        dados[0];


                    document
                        .getElementById(
                            "moodTitulo"
                        )
                        .textContent =
                        dados[1];


                    document
                        .getElementById(
                            "moodTexto"
                        )
                        .textContent =
                        dados[2];

                }
            );

        }
    );


/* =========================================
   QUIZ
========================================= */

const quizCard =
    document.getElementById(
        "quizCard"
    );


let perguntaAtual =
    0;


const respostas = {

    romantico: 0,
    leve: 0,
    elegante: 0

};


const perguntas = [

    {

        texto:
            "Qual clima combina mais com você?",

        opcoes: [

            ["♡ Romântico", "romantico"],
            ["☀ Leve", "leve"],
            ["✦ Elegante", "elegante"]

        ]

    },

    {

        texto:
            "Qual momento você prefere?",

        opcoes: [

            ["♡ Um encontro", "romantico"],
            ["☀ Depois do banho", "leve"],
            ["☾ Sair à noite", "elegante"]

        ]

    },

    {

        texto:
            "Como você gosta de se sentir?",

        opcoes: [

            ["♡ Apaixonada", "romantico"],
            ["☁ Confortável", "leve"],
            ["✦ Marcante", "elegante"]

        ]

    }

];


function mostrarPergunta() {

    if (!quizCard) return;


    const atual =
        perguntas[
            perguntaAtual
        ];


    quizCard.innerHTML =
        `

        <div>

            <span class="quiz-numero">
                0${perguntaAtual + 1} / 03
            </span>

            <h3>
                ${atual.texto}
            </h3>

            <div class="quiz-opcoes">

                ${atual.opcoes.map(
                    opcao =>
                    `
                    <button
                        data-resposta="${opcao[1]}"
                    >
                        ${opcao[0]}
                    </button>
                    `
                ).join("")}

            </div>

        </div>

        `;


    quizCard
        .querySelectorAll(
            ".quiz-opcoes button"
        )
        .forEach(
            botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        respostas[
                            botao.dataset.resposta
                        ]++;


                        perguntaAtual++;


                        perguntaAtual
                        <
                        perguntas.length
                            ?
                            mostrarPergunta()
                            :
                            mostrarResultado();

                    }
                );

            }
        );

}


function mostrarResultado() {

    let resultado =
        "romantico";


    Object
        .keys(respostas)
        .forEach(
            chave => {

                if (
                    respostas[chave]
                    >
                    respostas[resultado]
                ) {

                    resultado =
                        chave;

                }

            }
        );


    const resultados = {

        romantico: [
            "♡",
            "Seu momento é Romântico",
            "Você combina com encontros e momentos especiais."
        ],

        leve: [
            "☀",
            "Seu momento é Leve",
            "Você combina com uma rotina tranquila e confortável."
        ],

        elegante: [
            "✦",
            "Seu momento é Elegante",
            "Você gosta de presença e personalidade."
        ]

    };


    const r =
        resultados[
            resultado
        ];


    quizCard.innerHTML =
        `

        <div class="quiz-resultado">

            <span>${r[0]}</span>

            <h3>${r[1]}</h3>

            <p>${r[2]}</p>

            <button
                class="quiz-reiniciar"
                id="reiniciarQuiz"
            >
                Fazer novamente
            </button>

        </div>

        `;


    document
        .getElementById(
            "reiniciarQuiz"
        )
        ?.addEventListener(
            "click",
            () => {

                perguntaAtual =
                    0;


                respostas.romantico =
                    0;


                respostas.leve =
                    0;


                respostas.elegante =
                    0;


                mostrarPergunta();

            }
        );

}


mostrarPergunta();


/* =========================================
   FAQ
========================================= */

document
    .querySelectorAll(
        ".faq-pergunta"
    )
    .forEach(
        pergunta => {

            pergunta.addEventListener(
                "click",
                () => {

                    const item =
                        pergunta.closest(
                            ".faq-item"
                        );


                    const aberto =
                        item.classList.contains(
                            "ativo"
                        );


                    document
                        .querySelectorAll(
                            ".faq-item"
                        )
                        .forEach(
                            outro => {

                                outro.classList.remove(
                                    "ativo"
                                );

                            }
                        );


                    if (!aberto) {

                        item.classList.add(
                            "ativo"
                        );

                    }

                }
            );

        }
    );


/* BUSCA FAQ */

const buscarFaq =
    document.getElementById(
        "buscarFaq"
    );


buscarFaq
    ?.addEventListener(
        "input",
        () => {

            const busca =
                buscarFaq.value
                    .toLowerCase();


            let encontrados =
                0;


            document
                .querySelectorAll(
                    ".faq-item"
                )
                .forEach(
                    item => {

                        const mostrar =
                            item.textContent
                                .toLowerCase()
                                .includes(
                                    busca
                                );


                        item.style.display =
                            mostrar
                                ? ""
                                : "none";


                        if (mostrar) {

                            encontrados++;

                        }

                    }
                );


            document
                .getElementById(
                    "faqSemResultado"
                )
                ?.classList
                .toggle(
                    "mostrar",
                    encontrados === 0
                );

        }
    );


/* =========================================
   PERSONALIZAÇÃO
========================================= */

const paletasDream = {

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


function clarearCor(
    cor,
    intensidade = .86
) {

    let hex =
        cor.replace(
            "#",
            ""
        );


    const numero =
        parseInt(
            hex,
            16
        );


    const r =
        numero >> 16;


    const g =
        numero >> 8 & 255;


    const b =
        numero & 255;


    const mix =
        valor =>
            Math.round(
                valor
                +
                (
                    255 -
                    valor
                )
                *
                intensidade
            );


    return (
        "#"
        +
        [
            mix(r),
            mix(g),
            mix(b)
        ]
        .map(
            valor =>
                valor
                    .toString(16)
                    .padStart(
                        2,
                        "0"
                    )
        )
        .join("")
    );

}


function aplicarCores(
    principal,
    secundaria
) {

    const raiz =
        document.documentElement;


    raiz.style.setProperty(
        "--rosa",
        principal
    );


    raiz.style.setProperty(
        "--rosa2",
        principal
    );


    raiz.style.setProperty(
        "--rosa-claro",
        clarearCor(
            principal
        )
    );


    raiz.style.setProperty(
        "--lilas",
        secundaria
    );


    raiz.style.setProperty(
        "--lilas2",
        secundaria
    );


    raiz.style.setProperty(
        "--lilas-claro",
        clarearCor(
            secundaria
        )
    );


    document
        .getElementById(
            "corPrincipal"
        )
        .value =
        principal;


    document
        .getElementById(
            "corSecundaria"
        )
        .value =
        secundaria;


    salvar(
        "dreamCorPrincipal",
        principal
    );


    salvar(
        "dreamCorSecundaria",
        secundaria
    );

}


const painel =
    document.getElementById(
        "painelPersonalizacao"
    );


document
    .getElementById(
        "abrirPersonalizacao"
    )
    ?.addEventListener(
        "click",
        () => {

            painel.classList.toggle(
                "ativo"
            );

        }
    );


document
    .getElementById(
        "fecharPersonalizacao"
    )
    ?.addEventListener(
        "click",
        () => {

            painel.classList.remove(
                "ativo"
            );

        }
    );


document
    .querySelectorAll(
        ".paleta"
    )
    .forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    const nome =
                        botao.dataset.paleta;


                    const cores =
                        paletasDream[nome];


                    aplicarCores(
                        cores[0],
                        cores[1]
                    );


                    document
                        .querySelectorAll(
                            ".paleta"
                        )
                        .forEach(
                            p => {

                                p.classList.remove(
                                    "ativo"
                                );

                            }
                        );


                    botao.classList.add(
                        "ativo"
                    );


                    salvar(
                        "dreamPaleta",
                        nome
                    );


                    mostrarToast(
                        "Cor alterada ✦"
                    );

                }
            );

        }
    );


const corPrincipal =
    document.getElementById(
        "corPrincipal"
    );


const corSecundaria =
    document.getElementById(
        "corSecundaria"
    );


function aplicarManual() {

    document
        .querySelectorAll(
            ".paleta"
        )
        .forEach(
            botao => {

                botao.classList.remove(
                    "ativo"
                );

            }
        );


    aplicarCores(
        corPrincipal.value,
        corSecundaria.value
    );


    salvar(
        "dreamPaleta",
        "personalizada"
    );

}


corPrincipal
    ?.addEventListener(
        "input",
        aplicarManual
    );


corSecundaria
    ?.addEventListener(
        "input",
        aplicarManual
    );


/* =========================================
   TEMA
========================================= */

const botaoTema =
    document.getElementById(
        "botaoTema"
    );


const configEscuro =
    document.getElementById(
        "configEscuro"
    );


function atualizarTemaUI() {

    const escuro =
        document.body.classList
            .contains(
                "tema-escuro"
            );


    if (botaoTema) {

        botaoTema.textContent =
            escuro
                ? "☀"
                : "☾";

    }


    if (configEscuro) {

        configEscuro.checked =
            escuro;

    }

}


function aplicarTema(
    escuro,
    salvarTema = true
) {

    document.body.classList.toggle(
        "tema-escuro",
        escuro
    );


    if (salvarTema) {

        salvar(
            "dreamTema",
            escuro
                ? "escuro"
                : "claro"
        );

    }


    atualizarTemaUI();

}


botaoTema
    ?.addEventListener(
        "click",
        () => {

            salvar(
                "dreamTemaAutomatico",
                "nao"
            );


            atualizarTemaAutoUI();


            aplicarTema(
                !document.body
                    .classList
                    .contains(
                        "tema-escuro"
                    )
            );

        }
    );


configEscuro
    ?.addEventListener(
        "change",
        () => {

            salvar(
                "dreamTemaAutomatico",
                "nao"
            );


            atualizarTemaAutoUI();


            aplicarTema(
                configEscuro.checked
            );

        }
    );


/* =========================================
   CONFIGURAÇÕES
========================================= */

const configParticulas =
    document.getElementById(
        "configParticulas"
    );


const configAnimacoes =
    document.getElementById(
        "configAnimacoes"
    );


const configGlass =
    document.getElementById(
        "configGlass"
    );


function aplicarSwitchesSalvos() {

    const part =
        ler("dreamParticulas");


    const anima =
        ler("dreamAnimacoes");


    const glass =
        ler("dreamGlass");


    if (part === "off") {

        configParticulas.checked =
            false;


        document.body.classList.add(
            "sem-particulas"
        );

    }


    if (anima === "off") {

        configAnimacoes.checked =
            false;


        document.body.classList.add(
            "sem-animacoes"
        );

    }


    if (glass === "off") {

        configGlass.checked =
            false;


        document.body.classList.add(
            "sem-glass"
        );

    }

}


configParticulas
    ?.addEventListener(
        "change",
        () => {

            document.body.classList.toggle(
                "sem-particulas",
                !configParticulas.checked
            );


            salvar(
                "dreamParticulas",
                configParticulas.checked
                    ? "on"
                    : "off"
            );

        }
    );


configAnimacoes
    ?.addEventListener(
        "change",
        () => {

            document.body.classList.toggle(
                "sem-animacoes",
                !configAnimacoes.checked
            );


            salvar(
                "dreamAnimacoes",
                configAnimacoes.checked
                    ? "on"
                    : "off"
            );

        }
    );


configGlass
    ?.addEventListener(
        "change",
        () => {

            document.body.classList.toggle(
                "sem-glass",
                !configGlass.checked
            );


            salvar(
                "dreamGlass",
                configGlass.checked
                    ? "on"
                    : "off"
            );

        }
    );


/* TAMANHO */

function aplicarTamanho(
    tamanho
) {

    document.body.classList.remove(
        "texto-pequeno",
        "texto-grande"
    );


    if (
        tamanho ===
        "pequeno"
    ) {

        document.body.classList.add(
            "texto-pequeno"
        );

    }


    if (
        tamanho ===
        "grande"
    ) {

        document.body.classList.add(
            "texto-grande"
        );

    }


    document
        .querySelectorAll(
            ".seletor-tamanho button"
        )
        .forEach(
            botao => {

                botao.classList.toggle(
                    "ativo",
                    botao.dataset.tamanho
                    ===
                    tamanho
                );

            }
        );


    salvar(
        "dreamTamanho",
        tamanho
    );

}


document
    .querySelectorAll(
        ".seletor-tamanho button"
    )
    .forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    aplicarTamanho(
                        botao.dataset.tamanho
                    );

                }
            );

        }
    );


/* =========================================
   DREAM LAB
========================================= */

/* SAUDAÇÃO */

function atualizarSaudacao() {

    const hora =
        new Date().getHours();


    let titulo;
    let texto;


    if (
        hora >= 5 &&
        hora < 12
    ) {

        titulo =
            "Bom dia ♡";


        texto =
            "Comece o dia com leveza e Dream.";

    }

    else if (
        hora >= 12 &&
        hora < 18
    ) {

        titulo =
            "Boa tarde ✿";


        texto =
            "Um ótimo momento para renovar sua fragrância.";

    }

    else {

        titulo =
            "Boa noite ☾";


        texto =
            "Deixe o amor no ar durante sua noite.";

    }


    document
        .getElementById(
            "saudacaoDream"
        )
        .textContent =
        titulo;


    document
        .getElementById(
            "textoSaudacaoDream"
        )
        .textContent =
        texto;

}


atualizarSaudacao();


/* VISITAS */

let visitas =
    Number(
        ler("dreamVisitas")
        ||
        0
    );


visitas++;


salvar(
    "dreamVisitas",
    visitas
);


document
    .getElementById(
        "contadorVisitas"
    )
    .textContent =
    visitas;


/* INTENSIDADE */

const intensidade =
    document.getElementById(
        "intensidadeDream"
    );


function atualizarIntensidade() {

    const valor =
        Number(
            intensidade.value
        );


    document
        .getElementById(
            "intensidadeNumero"
        )
        .textContent =
        valor
        +
        "%";


    let nome;
    let texto;


    if (valor <= 33) {

        nome =
            "Suave";


        texto =
            "Uma experiência leve e delicada.";

    }

    else if (valor <= 66) {

        nome =
            "Equilibrado";


        texto =
            "Equilíbrio entre leveza e presença.";

    }

    else {

        nome =
            "Marcante";


        texto =
            "Uma experiência mais presente e intensa.";

    }


    document
        .getElementById(
            "intensidadeNome"
        )
        .textContent =
        nome;


    document
        .getElementById(
            "intensidadeTexto"
        )
        .textContent =
        texto;


    salvar(
        "dreamIntensidade",
        valor
    );

}


const intensidadeSalva =
    ler("dreamIntensidade");


if (intensidadeSalva) {

    intensidade.value =
        intensidadeSalva;

}


intensidade
    ?.addEventListener(
        "input",
        atualizarIntensidade
    );


atualizarIntensidade();


/* ROTINA */

const rotinas = {

    manha:
        "☀ Depois do banho, comece o dia com uma sensação leve.",

    tarde:
        "✿ Renove a fragrância durante a tarde.",

    noite:
        "☾ Reaplique antes de sair ou de um momento especial.",

    encontro:
        "♡ Um toque romântico para acompanhar encontros especiais."

};


document
    .querySelectorAll(
        ".rotina-botoes button"
    )
    .forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".rotina-botoes button"
                        )
                        .forEach(
                            outro => {

                                outro.classList.remove(
                                    "ativo"
                                );

                            }
                        );


                    botao.classList.add(
                        "ativo"
                    );


                    document
                        .getElementById(
                            "rotinaResultado"
                        )
                        .textContent =
                        rotinas[
                            botao.dataset.rotina
                        ];

                }
            );

        }
    );


/* =========================================
   ME SURPREENDA
========================================= */

document
    .getElementById(
        "dreamSurpresa"
    )
    ?.addEventListener(
        "click",
        () => {

            const nomes =
                Object.keys(
                    paletasDream
                );


            const nome =
                nomes[
                    Math.floor(
                        Math.random()
                        *
                        nomes.length
                    )
                ];


            const cores =
                paletasDream[nome];


            aplicarCores(
                cores[0],
                cores[1]
            );


            document
                .querySelectorAll(
                    ".paleta"
                )
                .forEach(
                    botao => {

                        botao.classList.toggle(
                            "ativo",
                            botao.dataset.paleta
                            ===
                            nome
                        );

                    }
                );


            const moods =
                document.querySelectorAll(
                    ".mood-botao"
                );


            moods[
                Math.floor(
                    Math.random()
                    *
                    moods.length
                )
            ]
            ?.click();


            chuvaDeCoracoes();


            mostrarToast(
                "Dream reinventado ✦"
            );

        }
    );


/* =========================================
   COPIAR PRODUTO
========================================= */

document
    .getElementById(
        "copiarProduto"
    )
    ?.addEventListener(
        "click",
        async () => {

            const texto =
                "Dream Amor no Ar • 350 ml • Body Splash • Floral Amadeirado";


            try {

                await navigator.clipboard
                    .writeText(
                        texto
                    );


                mostrarToast(
                    "Informações copiadas ♡"
                );

            } catch (erro) {}

        }
    );


/* =========================================
   MODO FOCO
========================================= */

const modoFoco =
    document.getElementById(
        "modoFoco"
    );


modoFoco
    ?.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "modo-foco"
            );


            const ativo =
                document.body.classList
                    .contains(
                        "modo-foco"
                    );


            modoFoco.classList.toggle(
                "ativo",
                ativo
            );


            modoFoco.textContent =
                ativo
                    ?
                    "◉ Sair do foco"
                    :
                    "◉ Modo foco";


            mostrarToast(
                ativo
                    ?
                    "Modo foco ativado"
                    :
                    "Modo foco desativado"
            );

        }
    );


/* =========================================
   TELA CHEIA
========================================= */

const telaCheia =
    document.getElementById(
        "telaCheia"
    );


telaCheia
    ?.addEventListener(
        "click",
        async () => {

            try {

                if (
                    !document.fullscreenElement
                ) {

                    await document
                        .documentElement
                        .requestFullscreen();

                }

                else {

                    await document
                        .exitFullscreen();

                }

            } catch (erro) {

                mostrarToast(
                    "Tela cheia indisponível"
                );

            }

        }
    );


document.addEventListener(
    "fullscreenchange",
    () => {

        if (!telaCheia) return;


        telaCheia.textContent =
            document.fullscreenElement
                ?
                "⛶ Sair da tela cheia"
                :
                "⛶ Tela cheia";

    }
);


/* =========================================
   TEMA AUTOMÁTICO
========================================= */

const temaAutomatico =
    document.getElementById(
        "temaAutomatico"
    );


function temaAutoAtivo() {

    return (
        ler(
            "dreamTemaAutomatico"
        )
        ===
        "sim"
    );

}


function atualizarTemaAutoUI() {

    if (!temaAutomatico) return;


    const ativo =
        temaAutoAtivo();


    temaAutomatico.classList.toggle(
        "ativo",
        ativo
    );


    temaAutomatico.textContent =
        ativo
            ?
            "◐ Tema auto: ON"
            :
            "◐ Tema automático";

}


function aplicarTemaAutomatico() {

    if (!temaAutoAtivo()) {

        return;

    }


    const hora =
        new Date().getHours();


    aplicarTema(
        hora >= 18 ||
        hora < 6,
        false
    );

}


temaAutomatico
    ?.addEventListener(
        "click",
        () => {

            const novo =
                !temaAutoAtivo();


            salvar(
                "dreamTemaAutomatico",
                novo
                    ? "sim"
                    : "nao"
            );


            atualizarTemaAutoUI();


            if (novo) {

                aplicarTemaAutomatico();

            }


            mostrarToast(
                novo
                    ?
                    "Tema automático ativado"
                    :
                    "Tema automático desativado"
            );

        }
    );


/* =========================================
   SEÇÕES / MENU
========================================= */

const indicador =
    document.getElementById(
        "secaoIndicador"
    );


const nomesSecoes = {

    inicio:
        "Início",

    produto:
        "Produto",

    campanha:
        "Campanha",

    notas:
        "Notas",

    galeria:
        "Galeria",

    mood:
        "Dream Mood",

    quiz:
        "Quiz",

    dreamLab:
        "Dream Lab",

    faq:
        "FAQ",

    final:
        "Dream"

};


if (
    "IntersectionObserver"
    in window
) {

    const observerSecoes =
        new IntersectionObserver(

            entradas => {

                entradas.forEach(
                    entrada => {

                        if (
                            !entrada.isIntersecting
                        ) {
                            return;
                        }


                        const id =
                            entrada.target.id;


                        if (
                            indicador &&
                            nomesSecoes[id]
                        ) {

                            indicador.textContent =
                                nomesSecoes[id];

                        }


                        document
                            .querySelectorAll(
                                ".menu a"
                            )
                            .forEach(
                                link => {

                                    link.classList.toggle(
                                        "menu-ativo",
                                        link.getAttribute(
                                            "href"
                                        )
                                        ===
                                        "#"
                                        +
                                        id
                                    );

                                }
                            );

                    }
                );

            },

            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }

        );


    document
        .querySelectorAll(
            "main section[id]"
        )
        .forEach(
            secao => {

                observerSecoes.observe(
                    secao
                );

            }
        );

}


/* =========================================
   EASTER EGG
========================================= */

let cliquesLogo =
    0;


let timerLogo;


document
    .querySelectorAll(
        ".logo"
    )
    .forEach(
        logo => {

            logo.addEventListener(
                "click",
                () => {

                    cliquesLogo++;


                    clearTimeout(
                        timerLogo
                    );


                    timerLogo =
                        setTimeout(
                            () => {

                                cliquesLogo =
                                    0;

                            },

                            2500
                        );


                    if (
                        cliquesLogo >=
                        5
                    ) {

                        cliquesLogo =
                            0;


                        chuvaDeCoracoes();


                        mostrarToast(
                            "Love is in the air ♡"
                        );

                    }

                }
            );

        }
    );


function chuvaDeCoracoes() {

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const coracao =
            document.createElement(
                "span"
            );


        coracao.className =
            "coracao-explosao";


        coracao.textContent =
            Math.random()
            >
            .5
                ?
                "♡"
                :
                "♥";


        coracao.style.left =
            Math.random()
            *
            100
            +
            "vw";


        coracao.style.bottom =
            Math.random()
            *
            70
            -
            20
            +
            "px";


        coracao.style.fontSize =
            12
            +
            Math.random()
            *
            28
            +
            "px";


        coracao.style.setProperty(
            "--movimento",
            Math.random()
            *
            200
            -
            100
            +
            "px"
        );


        document.body.appendChild(
            coracao
        );


        setTimeout(
            () => coracao.remove(),
            3000
        );

    }

}


/* =========================================
   RESTAURAR PERSONALIZAÇÃO
========================================= */

document
    .getElementById(
        "restaurarConfig"
    )
    ?.addEventListener(
        "click",
        () => {

            [
                "dreamCorPrincipal",
                "dreamCorSecundaria",
                "dreamPaleta",
                "dreamParticulas",
                "dreamAnimacoes",
                "dreamGlass",
                "dreamTamanho",
                "dreamTema",
                "dreamTemaAutomatico"
            ]
            .forEach(
                chave => {

                    localStorage.removeItem(
                        chave
                    );

                }
            );


            document.body.classList.remove(
                "sem-particulas",
                "sem-animacoes",
                "sem-glass",
                "texto-pequeno",
                "texto-grande",
                "tema-escuro"
            );


            configParticulas.checked =
                true;


            configAnimacoes.checked =
                true;


            configGlass.checked =
                true;


            aplicarCores(
                "#df76a8",
                "#9562dc"
            );


            aplicarTamanho(
                "normal"
            );


            document
                .querySelectorAll(
                    ".paleta"
                )
                .forEach(
                    botao => {

                        botao.classList.toggle(
                            "ativo",
                            botao.dataset.paleta
                            ===
                            "dream"
                        );

                    }
                );


            atualizarTemaUI();

            atualizarTemaAutoUI();


            mostrarToast(
                "Configurações restauradas ♡"
            );

        }
    );


/* =========================================
   CARREGAR PREFERÊNCIAS
========================================= */

const corSalva =
    ler(
        "dreamCorPrincipal"
    );


const secundariaSalva =
    ler(
        "dreamCorSecundaria"
    );


if (
    corSalva &&
    secundariaSalva
) {

    aplicarCores(
        corSalva,
        secundariaSalva
    );

}


const paletaSalva =
    ler(
        "dreamPaleta"
    );


if (paletaSalva) {

    document
        .querySelectorAll(
            ".paleta"
        )
        .forEach(
            botao => {

                botao.classList.toggle(
                    "ativo",
                    botao.dataset.paleta
                    ===
                    paletaSalva
                );

            }
        );

}


aplicarSwitchesSalvos();


aplicarTamanho(
    ler("dreamTamanho")
    ||
    "normal"
);


if (temaAutoAtivo()) {

    aplicarTemaAutomatico();

}

else {

    aplicarTema(
        ler("dreamTema")
        ===
        "escuro",
        false
    );

}


atualizarTemaAutoUI();