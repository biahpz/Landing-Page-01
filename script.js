/* =========================================
   INÍCIO
========================================= */

document.body.classList.add(
    "js-ativo"
);


/* =========================================
   STORAGE
========================================= */

function salvar(
    chave,
    valor
) {

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

                document
                    .getElementById(
                        "loader"
                    )
                    ?.classList
                    .add(
                        "sumir"
                    );

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


if (
    menu &&
    menuMobile
) {

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
                    ?
                    "✕"
                    :
                    "☰";

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


    header?.classList.toggle(
        "scrolled",
        scroll > 40
    );


    voltarTopo?.classList.toggle(
        "mostrar",
        scroll > 600
    );


    if (barraProgresso) {

        const total =
            document.documentElement
                .scrollHeight
            -
            window.innerHeight;


        const porcentagem =
            total > 0

                ?
                scroll / total * 100

                :
                0;


        barraProgresso.style.width =
            porcentagem
            +
            "%";

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


voltarTopo?.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior:
                "smooth"

        });

    }
);


/* =========================================
   REVEAL
========================================= */

const elementosReveal =
    document.querySelectorAll(
        ".revelar"
    );


if (
    "IntersectionObserver"
    in window
) {

    const observerReveal =
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


                            observerReveal
                                .unobserve(
                                    entrada.target
                                );

                        }

                    }
                );

            },

            {
                threshold: 0.08
            }

        );


    elementosReveal.forEach(
        elemento => {

            observerReveal.observe(
                elemento
            );

        }
    );

} else {

    elementosReveal.forEach(
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
                threshold: 0.3
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


const simbolosParticulas =
    [
        "♡",
        "✦",
        "✿"
    ];


function criarParticula() {

    if (
        !particulas
        ||
        document.body
            .classList
            .contains(
                "sem-particulas"
            )
    ) {

        return;

    }


    const elemento =
        document.createElement(
            "span"
        );


    elemento.className =
        "particula";


    elemento.textContent =
        simbolosParticulas[
            Math.floor(
                Math.random()
                *
                simbolosParticulas.length
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
        () => {

            elemento.remove();

        },

        18000
    );

}


setInterval(
    criarParticula,
    900
);


/* =========================================
   CURSOR DREAM
========================================= */

const cursorDream =
    document.getElementById(
        "cursorDream"
    );


document.addEventListener(
    "mousemove",
    evento => {

        if (
            !cursorDream
            ||
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


const frascoPrincipal =
    document.getElementById(
        "frascoPrincipal"
    );


const brilhoProduto =
    document.getElementById(
        "brilhoProduto"
    );


if (
    heroProduto
    &&
    frascoPrincipal
) {

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


            const rotacaoX =
                -(
                    y
                    -
                    area.height / 2
                )
                /
                30;


            const rotacaoY =
                (
                    x
                    -
                    area.width / 2
                )
                /
                30;


            frascoPrincipal
                .style
                .transform =
                `
                perspective(900px)
                rotateX(${rotacaoX}deg)
                rotateY(${rotacaoY}deg)
                `;


            if (brilhoProduto) {

                brilhoProduto.style.left =
                    x
                    -
                    100
                    +
                    "px";


                brilhoProduto.style.top =
                    y
                    -
                    100
                    +
                    "px";

            }

        }
    );


    heroProduto.addEventListener(
        "mouseleave",
        () => {

            frascoPrincipal
                .style
                .transform =
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


        gota.style.animationDelay =
            Math.random()
            *
            0.12
            +
            "s";


        sprayArea.appendChild(
            gota
        );


        setTimeout(
            () => {

                gota.remove();

            },

            1200
        );

    }


    mostrarToast(
        "Dream Amor no Ar ✦"
    );

}


botaoSpray?.addEventListener(
    "click",
    fazerSpray
);


/* =========================================
   FAVORITO
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
        ler(
            "dreamFavorito"
        )
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
                    ?
                    "♥"
                    :
                    "♡";

        }


        if (texto) {

            texto.textContent =
                ativo
                    ?
                    "Favoritado"
                    :
                    "Favoritar";

        }

    }


    if (favoritarModal) {

        favoritarModal.textContent =
            ativo
                ?
                "♥ Favoritado"
                :
                "♡ Favoritar";

    }

}


function alternarFavorito() {

    const novoEstado =
        !estaFavoritado();


    salvar(
        "dreamFavorito",
        novoEstado
            ?
            "sim"
            :
            "nao"
    );


    atualizarFavorito();


    mostrarToast(
        novoEstado
            ?
            "Adicionado aos favoritos ♡"
            :
            "Removido dos favoritos"
    );

}


favoritar?.addEventListener(
    "click",
    alternarFavorito
);


favoritarModal?.addEventListener(
    "click",
    alternarFavorito
);


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
                    window.location.href

            });

            return;

        }


        await navigator.clipboard
            .writeText(
                window.location.href
            );


        mostrarToast(
            "Link copiado!"
        );

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


function atualizarBloqueioBody() {

    const aberto =
        document.querySelector(
            ".modal.ativo, .lightbox.ativo, .modal-atalhos.ativo"
        );


    document.body
        .classList
        .toggle(
            "modal-aberto",
            Boolean(aberto)
        );

}


function abrirProduto() {

    modalProduto
        ?.classList
        .add(
            "ativo"
        );


    atualizarBloqueioBody();

}


function fecharProduto() {

    modalProduto
        ?.classList
        .remove(
            "ativo"
        );


    atualizarBloqueioBody();

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


                    const titulo =
                        document.getElementById(
                            "notaTitulo"
                        );


                    const icone =
                        document.getElementById(
                            "notaIcone"
                        );


                    const descricao =
                        document.getElementById(
                            "notaDescricao"
                        );


                    if (titulo) {

                        titulo.textContent =
                            dados[0];

                    }


                    if (icone) {

                        icone.textContent =
                            dados[1];

                    }


                    if (descricao) {

                        descricao.textContent =
                            dados[2];

                    }


                    modalNota
                        ?.classList
                        .add(
                            "ativo"
                        );


                    atualizarBloqueioBody();

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


    atualizarBloqueioBody();

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


const pontos =
    document.getElementById(
        "pontos"
    );


let slideAtual =
    0;


let autoCarrossel =
    null;


let autoGaleriaAtivo =
    ler(
        "dreamAutoGaleria"
    )
    !==
    "off";


let tempoGaleria =
    Number(
        ler(
            "dreamVelocidadeGaleria"
        )
        ||
        6000
    );


function atualizarCarrossel() {

    if (!carrossel) return;


    carrossel.style.transform =
        `translateX(-${slideAtual * 100}%)`;


    document
        .querySelectorAll(
            ".pontos button"
        )
        .forEach(
            (
                ponto,
                indice
            ) => {

                ponto.classList.toggle(
                    "ativo",
                    indice === slideAtual
                );

            }
        );

}


slides.forEach(
    (
        _,
        indice
    ) => {

        const ponto =
            document.createElement(
                "button"
            );


        ponto.type =
            "button";


        if (
            indice ===
            0
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

                reiniciarAutoGaleria();

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
            slideAtual
            +
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
            slideAtual
            -
            1
            +
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
        () => {

            proximoSlide();

            reiniciarAutoGaleria();

        }
    );


document
    .getElementById(
        "anterior"
    )
    ?.addEventListener(
        "click",
        () => {

            slideAnterior();

            reiniciarAutoGaleria();

        }
    );


/* =========================================
   AUTOPLAY / VELOCIDADE
========================================= */

const autoGaleria =
    document.getElementById(
        "autoGaleria"
    );


const velocidadeGaleria =
    document.getElementById(
        "velocidadeGaleria"
    );


function atualizarAutoGaleriaUI() {

    if (!autoGaleria) return;


    autoGaleria.classList.toggle(
        "ativo",
        autoGaleriaAtivo
    );


    autoGaleria.textContent =
        autoGaleriaAtivo
            ?
            "❚❚ Automático: ON"
            :
            "▶ Automático: OFF";

}


function reiniciarAutoGaleria() {

    clearInterval(
        autoCarrossel
    );


    autoCarrossel =
        null;


    if (
        !autoGaleriaAtivo
        ||
        slides.length <=
        1
    ) {

        return;

    }


    autoCarrossel =
        setInterval(
            proximoSlide,
            tempoGaleria
        );

}


if (velocidadeGaleria) {

    velocidadeGaleria.value =
        String(
            tempoGaleria
        );


    velocidadeGaleria.addEventListener(
        "change",
        () => {

            tempoGaleria =
                Number(
                    velocidadeGaleria.value
                );


            salvar(
                "dreamVelocidadeGaleria",
                String(
                    tempoGaleria
                )
            );


            reiniciarAutoGaleria();


            mostrarToast(
                "Velocidade alterada ✦"
            );

        }
    );

}


autoGaleria?.addEventListener(
    "click",
    () => {

        autoGaleriaAtivo =
            !autoGaleriaAtivo;


        salvar(
            "dreamAutoGaleria",
            autoGaleriaAtivo
                ?
                "on"
                :
                "off"
        );


        atualizarAutoGaleriaUI();

        reiniciarAutoGaleria();


        mostrarToast(
            autoGaleriaAtivo
                ?
                "Galeria automática ativada"
                :
                "Galeria automática pausada"
        );

    }
);


const areaCarrossel =
    document.querySelector(
        ".carrossel"
    );


areaCarrossel?.addEventListener(
    "mouseenter",
    () => {

        clearInterval(
            autoCarrossel
        );

    }
);


areaCarrossel?.addEventListener(
    "mouseleave",
    reiniciarAutoGaleria
);


atualizarAutoGaleriaUI();

reiniciarAutoGaleria();


/* =========================================
   SWIPE
========================================= */

const janelaCarrossel =
    document.querySelector(
        ".carrossel-janela"
    );


let toqueInicio =
    0;


janelaCarrossel?.addEventListener(
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


janelaCarrossel?.addEventListener(
    "touchend",
    evento => {

        const fim =
            evento.changedTouches[0]
                .clientX;


        const diferenca =
            toqueInicio
            -
            fim;


        if (
            Math.abs(
                diferenca
            )
            <
            45
        ) {

            return;

        }


        if (
            diferenca >
            0
        ) {

            proximoSlide();

        } else {

            slideAnterior();

        }


        reiniciarAutoGaleria();

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

                    if (
                        !lightbox
                        ||
                        !lightboxImagem
                    ) {

                        return;

                    }


                    lightboxImagem.src =
                        imagem.src;


                    lightboxImagem.alt =
                        imagem.alt;


                    lightbox.classList.add(
                        "ativo"
                    );


                    atualizarBloqueioBody();

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


    atualizarBloqueioBody();

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


function selecionarMood(
    mood
) {

    const dados =
        moods[
            mood
        ];


    if (!dados) return;


    document
        .querySelectorAll(
            ".mood-botao"
        )
        .forEach(
            botao => {

                botao.classList.toggle(
                    "ativo",
                    botao.dataset.mood
                    ===
                    mood
                );

            }
        );


    const card =
        document.getElementById(
            "moodCard"
        );


    if (card) {

        card.classList.remove(
            "romantico",
            "delicado",
            "noturno"
        );


        card.classList.add(
            mood
        );

    }


    const icone =
        document.getElementById(
            "moodIcone"
        );


    const titulo =
        document.getElementById(
            "moodTitulo"
        );


    const texto =
        document.getElementById(
            "moodTexto"
        );


    if (icone) {

        icone.textContent =
            dados[0];

    }


    if (titulo) {

        titulo.textContent =
            dados[1];

    }


    if (texto) {

        texto.textContent =
            dados[2];

    }

}


document
    .querySelectorAll(
        ".mood-botao"
    )
    .forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    selecionarMood(
                        botao.dataset.mood
                    );

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


const respostasQuiz = {

    romantico: 0,

    leve: 0,

    elegante: 0

};


const perguntasQuiz = [

    {

        texto:
            "Qual clima combina mais com você?",

        opcoes: [

            [
                "♡ Romântico",
                "romantico"
            ],

            [
                "☀ Leve",
                "leve"
            ],

            [
                "✦ Elegante",
                "elegante"
            ]

        ]

    },

    {

        texto:
            "Qual momento você prefere?",

        opcoes: [

            [
                "♡ Um encontro",
                "romantico"
            ],

            [
                "☀ Depois do banho",
                "leve"
            ],

            [
                "☾ Sair à noite",
                "elegante"
            ]

        ]

    },

    {

        texto:
            "Como você gosta de se sentir?",

        opcoes: [

            [
                "♡ Apaixonada",
                "romantico"
            ],

            [
                "☁ Confortável",
                "leve"
            ],

            [
                "✦ Marcante",
                "elegante"
            ]

        ]

    }

];


function mostrarPergunta() {

    if (!quizCard) return;


    const atual =
        perguntasQuiz[
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

                ${atual.opcoes
                    .map(
                        opcao => `

                        <button
                            type="button"
                            data-resposta="${opcao[1]}"
                        >
                            ${opcao[0]}
                        </button>

                        `
                    )
                    .join("")}

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

                        respostasQuiz[
                            botao.dataset.resposta
                        ]++;


                        perguntaAtual++;


                        if (
                            perguntaAtual
                            <
                            perguntasQuiz.length
                        ) {

                            mostrarPergunta();

                        } else {

                            mostrarResultadoQuiz();

                        }

                    }
                );

            }
        );

}


function mostrarResultadoQuiz() {

    let resultado =
        "romantico";


    Object
        .keys(
            respostasQuiz
        )
        .forEach(
            chave => {

                if (
                    respostasQuiz[
                        chave
                    ]
                    >
                    respostasQuiz[
                        resultado
                    ]
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

            <span>
                ${r[0]}
            </span>

            <h3>
                ${r[1]}
            </h3>

            <p>
                ${r[2]}
            </p>

            <button
                class="quiz-reiniciar"
                id="reiniciarQuiz"
                type="button"
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


                respostasQuiz.romantico =
                    0;


                respostasQuiz.leve =
                    0;


                respostasQuiz.elegante =
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


                    if (!item) return;


                    item.classList.toggle(
                        "ativo"
                    );

                }
            );

        }
    );


const buscarFaq =
    document.getElementById(
        "buscarFaq"
    );


buscarFaq?.addEventListener(
    "input",
    () => {

        const busca =
            buscarFaq.value
                .toLowerCase()
                .trim();


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
                            ?
                            ""
                            :
                            "none";


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


document
    .getElementById(
        "abrirTodosFaq"
    )
    ?.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(
                    ".faq-item"
                )
                .forEach(
                    item => {

                        if (
                            item.style.display
                            !==
                            "none"
                        ) {

                            item.classList.add(
                                "ativo"
                            );

                        }

                    }
                );

        }
    );


document
    .getElementById(
        "fecharTodosFaq"
    )
    ?.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(
                    ".faq-item"
                )
                .forEach(
                    item => {

                        item.classList.remove(
                            "ativo"
                        );

                    }
                );

        }
    );


/* =========================================
   PALETAS
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
    intensidade = 0.86
) {

    let hex =
        cor.replace(
            "#",
            ""
        );


    if (
        hex.length ===
        3
    ) {

        hex =
            hex
                .split("")
                .map(
                    letra =>
                        letra
                        +
                        letra
                )
                .join("");

    }


    const numero =
        parseInt(
            hex,
            16
        );


    const r =
        numero >>
        16;


    const g =
        numero >>
        8
        &
        255;


    const b =
        numero
        &
        255;


    const mix =
        valor =>

            Math.round(

                valor
                +
                (
                    255
                    -
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
    secundaria,
    salvarCores = true
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


    const inputPrincipal =
        document.getElementById(
            "corPrincipal"
        );


    const inputSecundaria =
        document.getElementById(
            "corSecundaria"
        );


    if (inputPrincipal) {

        inputPrincipal.value =
            principal;

    }


    if (inputSecundaria) {

        inputSecundaria.value =
            secundaria;

    }


    if (salvarCores) {

        salvar(
            "dreamCorPrincipal",
            principal
        );


        salvar(
            "dreamCorSecundaria",
            secundaria
        );

    }

}


/* =========================================
   PERSONALIZAÇÃO
========================================= */

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

            painel?.classList.toggle(
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

            painel?.classList.remove(
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
                        paletasDream[
                            nome
                        ];


                    if (!cores) return;


                    aplicarCores(
                        cores[0],
                        cores[1]
                    );


                    document
                        .querySelectorAll(
                            ".paleta"
                        )
                        .forEach(
                            outro => {

                                outro.classList.toggle(
                                    "ativo",
                                    outro === botao
                                );

                            }
                        );


                    salvar(
                        "dreamPaleta",
                        nome
                    );


                    mostrarToast(
                        "Paleta alterada ✦"
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


function aplicarCorManual() {

    if (
        !corPrincipal
        ||
        !corSecundaria
    ) {

        return;

    }


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


corPrincipal?.addEventListener(
    "input",
    aplicarCorManual
);


corSecundaria?.addEventListener(
    "input",
    aplicarCorManual
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
        document.body
            .classList
            .contains(
                "tema-escuro"
            );


    if (botaoTema) {

        botaoTema.textContent =
            escuro
                ?
                "☀"
                :
                "☾";

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

    document.body
        .classList
        .toggle(
            "tema-escuro",
            escuro
        );


    if (salvarTema) {

        salvar(
            "dreamTema",
            escuro
                ?
                "escuro"
                :
                "claro"
        );

    }


    atualizarTemaUI();

}


function desativarTemaAutomatico() {

    salvar(
        "dreamTemaAutomatico",
        "nao"
    );


    atualizarTemaAutoUI();

}


botaoTema?.addEventListener(
    "click",
    () => {

        desativarTemaAutomatico();


        aplicarTema(
            !document.body
                .classList
                .contains(
                    "tema-escuro"
                )
        );

    }
);


configEscuro?.addEventListener(
    "change",
    () => {

        desativarTemaAutomatico();


        aplicarTema(
            configEscuro.checked
        );

    }
);


/* =========================================
   CONFIG SWITCHES
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


configParticulas?.addEventListener(
    "change",
    () => {

        document.body
            .classList
            .toggle(
                "sem-particulas",
                !configParticulas.checked
            );


        salvar(
            "dreamParticulas",
            configParticulas.checked
                ?
                "on"
                :
                "off"
        );

    }
);


configAnimacoes?.addEventListener(
    "change",
    () => {

        document.body
            .classList
            .toggle(
                "sem-animacoes",
                !configAnimacoes.checked
            );


        salvar(
            "dreamAnimacoes",
            configAnimacoes.checked
                ?
                "on"
                :
                "off"
        );

    }
);


configGlass?.addEventListener(
    "change",
    () => {

        document.body
            .classList
            .toggle(
                "sem-glass",
                !configGlass.checked
            );


        salvar(
            "dreamGlass",
            configGlass.checked
                ?
                "on"
                :
                "off"
        );

    }
);


/* =========================================
   TAMANHO TEXTO
========================================= */

function aplicarTamanho(
    tamanho,
    salvarValor = true
) {

    document.body.classList.remove(
        "texto-pequeno",
        "texto-grande"
    );


    if (
        tamanho ===
        "pequeno"
    ) {

        document.body
            .classList
            .add(
                "texto-pequeno"
            );

    }


    if (
        tamanho ===
        "grande"
    ) {

        document.body
            .classList
            .add(
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


    if (salvarValor) {

        salvar(
            "dreamTamanho",
            tamanho
        );

    }

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
   SAUDAÇÃO
========================================= */

function atualizarSaudacao() {

    const hora =
        new Date()
            .getHours();


    let titulo =
        "Olá ♡";


    let texto =
        "Aproveite o universo Dream.";


    if (
        hora >= 5
        &&
        hora < 12
    ) {

        titulo =
            "Bom dia ♡";


        texto =
            "Comece o dia com leveza e Dream.";

    } else if (
        hora >= 12
        &&
        hora < 18
    ) {

        titulo =
            "Boa tarde ✿";


        texto =
            "Um ótimo momento para renovar sua fragrância.";

    } else {

        titulo =
            "Boa noite ☾";


        texto =
            "Deixe o amor no ar durante sua noite.";

    }


    const tituloElemento =
        document.getElementById(
            "saudacaoDream"
        );


    const textoElemento =
        document.getElementById(
            "textoSaudacaoDream"
        );


    if (tituloElemento) {

        tituloElemento.textContent =
            titulo;

    }


    if (textoElemento) {

        textoElemento.textContent =
            texto;

    }

}


atualizarSaudacao();


/* =========================================
   VISITAS
========================================= */

let visitas =
    Number(
        ler(
            "dreamVisitas"
        )
        ||
        0
    );


visitas++;


salvar(
    "dreamVisitas",
    String(visitas)
);


const contadorVisitas =
    document.getElementById(
        "contadorVisitas"
    );


if (contadorVisitas) {

    contadorVisitas.textContent =
        visitas;

}


/* =========================================
   INTENSIDADE
========================================= */

const intensidadeDream =
    document.getElementById(
        "intensidadeDream"
    );


function atualizarIntensidade() {

    if (!intensidadeDream) return;


    const valor =
        Number(
            intensidadeDream.value
        );


    let nome;
    let texto;


    if (valor <= 33) {

        nome =
            "Suave";


        texto =
            "Uma experiência leve e delicada.";

    } else if (
        valor <= 66
    ) {

        nome =
            "Equilibrado";


        texto =
            "Equilíbrio entre leveza e presença.";

    } else {

        nome =
            "Marcante";


        texto =
            "Uma experiência mais presente e intensa.";

    }


    const numero =
        document.getElementById(
            "intensidadeNumero"
        );


    const nomeElemento =
        document.getElementById(
            "intensidadeNome"
        );


    const textoElemento =
        document.getElementById(
            "intensidadeTexto"
        );


    if (numero) {

        numero.textContent =
            valor
            +
            "%";

    }


    if (nomeElemento) {

        nomeElemento.textContent =
            nome;

    }


    if (textoElemento) {

        textoElemento.textContent =
            texto;

    }


    salvar(
        "dreamIntensidade",
        String(valor)
    );

}


if (intensidadeDream) {

    const salvo =
        ler(
            "dreamIntensidade"
        );


    if (salvo) {

        intensidadeDream.value =
            salvo;

    }


    intensidadeDream.addEventListener(
        "input",
        atualizarIntensidade
    );


    atualizarIntensidade();

}


/* =========================================
   ROTINA
========================================= */

const rotinasDream = {

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


                    const resultado =
                        document.getElementById(
                            "rotinaResultado"
                        );


                    if (resultado) {

                        resultado.textContent =
                            rotinasDream[
                                botao.dataset.rotina
                            ];

                    }

                }
            );

        }
    );


/* =========================================
   ZOOM FRASCOS
========================================= */

const zoomFrasco =
    document.getElementById(
        "zoomFrasco"
    );


const zoomNumero =
    document.getElementById(
        "zoomNumero"
    );


function aplicarZoomFrasco(
    valor
) {

    const zoom =
        Number(
            valor
        );


    document.documentElement
        .style
        .setProperty(
            "--zoom-frascos",
            zoom / 100
        );


    if (zoomNumero) {

        zoomNumero.textContent =
            zoom
            +
            "%";

    }


    salvar(
        "dreamZoomFrasco",
        String(
            zoom
        )
    );

}


if (zoomFrasco) {

    const salvo =
        Number(
            ler(
                "dreamZoomFrasco"
            )
            ||
            100
        );


    zoomFrasco.value =
        String(
            salvo
        );


    aplicarZoomFrasco(
        salvo
    );


    zoomFrasco.addEventListener(
        "input",
        () => {

            aplicarZoomFrasco(
                zoomFrasco.value
            );

        }
    );

}


/* =========================================
   NOTA ALEATÓRIA
========================================= */

document
    .getElementById(
        "notaAleatoria"
    )
    ?.addEventListener(
        "click",
        () => {

            const nomes =
                Object.keys(
                    dadosNotas
                );


            const chave =
                nomes[
                    Math.floor(
                        Math.random()
                        *
                        nomes.length
                    )
                ];


            const nota =
                dadosNotas[
                    chave
                ];


            const icone =
                document.getElementById(
                    "notaMomentoIcone"
                );


            const titulo =
                document.getElementById(
                    "notaMomentoTitulo"
                );


            const texto =
                document.getElementById(
                    "notaMomentoTexto"
                );


            if (icone) {

                icone.textContent =
                    nota[1];

            }


            if (titulo) {

                titulo.textContent =
                    nota[0];

            }


            if (texto) {

                texto.textContent =
                    nota[2];

            }


            mostrarToast(
                "Sua nota é "
                +
                nota[0]
                +
                " ✦"
            );

        }
    );


/* =========================================
   SALVAR MOOD
========================================= */

document
    .getElementById(
        "salvarMood"
    )
    ?.addEventListener(
        "click",
        () => {

            const ativo =
                document.querySelector(
                    ".mood-botao.ativo"
                );


            if (!ativo) return;


            salvar(
                "dreamMoodFavorito",
                ativo.dataset.mood
            );


            mostrarToast(
                "Mood salvo ♡"
            );

        }
    );


document
    .getElementById(
        "carregarMood"
    )
    ?.addEventListener(
        "click",
        () => {

            const mood =
                ler(
                    "dreamMoodFavorito"
                );


            if (!mood) {

                mostrarToast(
                    "Nenhum Mood salvo"
                );

                return;

            }


            selecionarMood(
                mood
            );


            document
                .getElementById(
                    "mood"
                )
                ?.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });


            mostrarToast(
                "Mood restaurado ♡"
            );

        }
    );


/* =========================================
   CORAÇÕES AO CLICAR
========================================= */

const coracoesClique =
    document.getElementById(
        "coracoesClique"
    );


let coracoesCliqueAtivo =
    ler(
        "dreamCoracoesClique"
    )
    ===
    "on";


function atualizarCoracoesCliqueUI() {

    if (!coracoesClique) return;


    coracoesClique.classList.toggle(
        "ativo",
        coracoesCliqueAtivo
    );


    coracoesClique.textContent =
        coracoesCliqueAtivo
            ?
            "♥ Corações: ON"
            :
            "♥ Corações: OFF";

}


function criarCoracoesNoClique(
    x,
    y
) {

    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const coracao =
            document.createElement(
                "span"
            );


        coracao.className =
            "coracao-clique";


        coracao.textContent =
            Math.random() >
            0.5
                ?
                "♡"
                :
                "♥";


        coracao.style.left =
            x
            +
            "px";


        coracao.style.top =
            y
            +
            "px";


        coracao.style.setProperty(
            "--x",
            Math.random()
            *
            90
            -
            45
            +
            "px"
        );


        coracao.style.setProperty(
            "--y",
            -(
                30
                +
                Math.random()
                *
                80
            )
            +
            "px"
        );


        coracao.style.setProperty(
            "--rotacao",
            Math.random()
            *
            180
            -
            90
            +
            "deg"
        );


        document.body.appendChild(
            coracao
        );


        setTimeout(
            () => {

                coracao.remove();

            },

            1000
        );

    }

}


coracoesClique?.addEventListener(
    "click",
    () => {

        coracoesCliqueAtivo =
            !coracoesCliqueAtivo;


        salvar(
            "dreamCoracoesClique",
            coracoesCliqueAtivo
                ?
                "on"
                :
                "off"
        );


        atualizarCoracoesCliqueUI();

    }
);


document.addEventListener(
    "click",
    evento => {

        if (
            !coracoesCliqueAtivo
        ) {

            return;

        }


        if (
            evento.target.closest(
                "button, a, input, select, textarea, label"
            )
        ) {

            return;

        }


        criarCoracoesNoClique(
            evento.clientX,
            evento.clientY
        );

    }
);


atualizarCoracoesCliqueUI();


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

                await navigator
                    .clipboard
                    .writeText(
                        texto
                    );


                mostrarToast(
                    "Informações copiadas ♡"
                );

            } catch (erro) {

                mostrarToast(
                    "Não foi possível copiar"
                );

            }

        }
    );


/* =========================================
   COPIAR PALETA
========================================= */

document
    .getElementById(
        "copiarPaleta"
    )
    ?.addEventListener(
        "click",
        async () => {

            const estilo =
                getComputedStyle(
                    document.documentElement
                );


            const principal =
                estilo
                    .getPropertyValue(
                        "--rosa"
                    )
                    .trim();


            const secundaria =
                estilo
                    .getPropertyValue(
                        "--lilas"
                    )
                    .trim();


            const texto =
                `Dream Palette: ${principal} + ${secundaria}`;


            try {

                await navigator
                    .clipboard
                    .writeText(
                        texto
                    );


                mostrarToast(
                    "Cores copiadas ◈"
                );

            } catch (erro) {

                mostrarToast(
                    texto
                );

            }

        }
    );


/* =========================================
   SURPRESA
========================================= */

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
            Math.random() >
            0.5
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
            () => {

                coracao.remove();

            },

            3000
        );

    }

}


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
                paletasDream[
                    nome
                ];


            aplicarCores(
                cores[0],
                cores[1]
            );


            salvar(
                "dreamPaleta",
                nome
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


            const nomesMood =
                Object.keys(
                    moods
                );


            selecionarMood(
                nomesMood[
                    Math.floor(
                        Math.random()
                        *
                        nomesMood.length
                    )
                ]
            );


            chuvaDeCoracoes();


            mostrarToast(
                "Dream reinventado ✦"
            );

        }
    );


/* =========================================
   MODO FOCO
========================================= */

const modoFoco =
    document.getElementById(
        "modoFoco"
    );


modoFoco?.addEventListener(
    "click",
    () => {

        document.body
            .classList
            .toggle(
                "modo-foco"
            );


        const ativo =
            document.body
                .classList
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

    }
);


/* =========================================
   TELA CHEIA
========================================= */

const telaCheia =
    document.getElementById(
        "telaCheia"
    );


telaCheia?.addEventListener(
    "click",
    async () => {

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

    if (!temaAutoAtivo()) return;


    const hora =
        new Date()
            .getHours();


    aplicarTema(
        hora >= 18
        ||
        hora < 6,
        false
    );

}


temaAutomatico?.addEventListener(
    "click",
    () => {

        const novo =
            !temaAutoAtivo();


        salvar(
            "dreamTemaAutomatico",
            novo
                ?
                "sim"
                :
                "nao"
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
   WHATSAPP
========================================= */

document
    .getElementById(
        "compartilharWhatsApp"
    )
    ?.addEventListener(
        "click",
        () => {

            const mensagem =
                "Conheça Dream Amor no Ar 350ml ♡ "
                +
                window.location.href;


            const destino =
                "https://wa.me/?text="
                +
                encodeURIComponent(
                    mensagem
                );


            window.open(
                destino,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );


/* =========================================
   BAIXAR FICHA
========================================= */

document
    .getElementById(
        "baixarFicha"
    )
    ?.addEventListener(
        "click",
        () => {

            const conteudo =
`DREAM AMOR NO AR

Volume: 350 ml
Tipo: Body Splash
Família: Floral Amadeirado

Notas de saída:
Bergamota, Cassis, Mandarina e Maçã.

Notas de corpo:
Rosa, Flor de Lótus, Frésia e Pêssego.

Notas de fundo:
Âmbar, Sândalo, Baunilha e Musk.

Projeto demonstrativo não oficial.
`;


            const arquivo =
                new Blob(
                    [
                        conteudo
                    ],
                    {
                        type:
                            "text/plain;charset=utf-8"
                    }
                );


            const url =
                URL.createObjectURL(
                    arquivo
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                "dream-amor-no-ar-350ml.txt";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            URL.revokeObjectURL(
                url
            );


            mostrarToast(
                "Ficha Dream criada ↓"
            );

        }
    );


/* =========================================
   MODAL ATALHOS
========================================= */

const modalAtalhos =
    document.getElementById(
        "modalAtalhos"
    );


function abrirAtalhos() {

    modalAtalhos
        ?.classList
        .add(
            "ativo"
        );


    atualizarBloqueioBody();

}


function fecharAtalhos() {

    modalAtalhos
        ?.classList
        .remove(
            "ativo"
        );


    atualizarBloqueioBody();

}


document
    .getElementById(
        "atalhosDream"
    )
    ?.addEventListener(
        "click",
        abrirAtalhos
    );


document
    .getElementById(
        "fecharAtalhos"
    )
    ?.addEventListener(
        "click",
        fecharAtalhos
    );


document
    .getElementById(
        "fecharAtalhosFundo"
    )
    ?.addEventListener(
        "click",
        fecharAtalhos
    );


/* =========================================
   ATALHOS + SETAS
========================================= */

document.addEventListener(
    "keydown",
    evento => {

        const elemento =
            document.activeElement;


        const digitando =
            elemento
            &&
            (
                elemento.tagName ===
                "INPUT"
                ||
                elemento.tagName ===
                "TEXTAREA"
                ||
                elemento.tagName ===
                "SELECT"
            );


        if (
            evento.key ===
            "Escape"
        ) {

            fecharProduto();

            fecharNota();

            fecharLightbox();

            fecharAtalhos();


            painel?.classList.remove(
                "ativo"
            );


            return;

        }


        if (digitando) return;


        if (
            evento.key ===
            "ArrowRight"
        ) {

            proximoSlide();

            reiniciarAutoGaleria();

            return;

        }


        if (
            evento.key ===
            "ArrowLeft"
        ) {

            slideAnterior();

            reiniciarAutoGaleria();

            return;

        }


        const tecla =
            evento.key
                .toLowerCase();


        if (tecla === "p") {

            painel?.classList.toggle(
                "ativo"
            );

        }


        if (tecla === "m") {

            botaoTema?.click();

        }


        if (tecla === "g") {

            document
                .getElementById(
                    "galeria"
                )
                ?.scrollIntoView({
                    behavior:
                        "smooth"
                });

        }


        if (tecla === "q") {

            document
                .getElementById(
                    "quiz"
                )
                ?.scrollIntoView({
                    behavior:
                        "smooth"
                });

        }


        if (tecla === "l") {

            document
                .getElementById(
                    "dreamLab"
                )
                ?.scrollIntoView({
                    behavior:
                        "smooth"
                });

        }


        if (tecla === "s") {

            fazerSpray();

        }


        if (
            evento.key ===
            "?"
        ) {

            abrirAtalhos();

        }

    }
);


/* =========================================
   INDICADOR + MENU ATIVO
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
                            indicador
                            &&
                            nomesSecoes[
                                id
                            ]
                        ) {

                            indicador.textContent =
                                nomesSecoes[
                                    id
                                ];

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
                    "-35% 0px -55% 0px",

                threshold:
                    0
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


/* =========================================
   RESTAURAR CONFIGURAÇÕES
========================================= */

document
    .getElementById(
        "restaurarConfig"
    )
    ?.addEventListener(
        "click",
        () => {

            const chaves =
            [
                "dreamCorPrincipal",
                "dreamCorSecundaria",
                "dreamPaleta",
                "dreamParticulas",
                "dreamAnimacoes",
                "dreamGlass",
                "dreamTamanho",
                "dreamTema",
                "dreamTemaAutomatico",
                "dreamZoomFrasco",
                "dreamAutoGaleria",
                "dreamVelocidadeGaleria",
                "dreamCoracoesClique"
            ];


            chaves.forEach(
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
                "tema-escuro",
                "modo-foco"
            );


            if (configParticulas) {

                configParticulas.checked =
                    true;

            }


            if (configAnimacoes) {

                configAnimacoes.checked =
                    true;

            }


            if (configGlass) {

                configGlass.checked =
                    true;

            }


            aplicarCores(
                "#df76a8",
                "#9562dc",
                false
            );


            aplicarTamanho(
                "normal",
                false
            );


            aplicarZoomFrasco(
                100
            );


            if (zoomFrasco) {

                zoomFrasco.value =
                    "100";

            }


            autoGaleriaAtivo =
                true;


            tempoGaleria =
                6000;


            if (velocidadeGaleria) {

                velocidadeGaleria.value =
                    "6000";

            }


            coracoesCliqueAtivo =
                false;


            atualizarCoracoesCliqueUI();

            atualizarAutoGaleriaUI();

            reiniciarAutoGaleria();

            atualizarTemaUI();

            atualizarTemaAutoUI();


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


            mostrarToast(
                "Configurações restauradas ♡"
            );

        }
    );


/* =========================================
   CARREGAR CONFIGURAÇÕES
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
    corSalva
    &&
    secundariaSalva
) {

    aplicarCores(
        corSalva,
        secundariaSalva,
        false
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


/* PARTÍCULAS */

if (
    ler(
        "dreamParticulas"
    )
    ===
    "off"
) {

    document.body.classList.add(
        "sem-particulas"
    );


    if (configParticulas) {

        configParticulas.checked =
            false;

    }

}


/* ANIMAÇÕES */

if (
    ler(
        "dreamAnimacoes"
    )
    ===
    "off"
) {

    document.body.classList.add(
        "sem-animacoes"
    );


    if (configAnimacoes) {

        configAnimacoes.checked =
            false;

    }

}


/* GLASS */

if (
    ler(
        "dreamGlass"
    )
    ===
    "off"
) {

    document.body.classList.add(
        "sem-glass"
    );


    if (configGlass) {

        configGlass.checked =
            false;

    }

}


/* TAMANHO */

aplicarTamanho(
    ler(
        "dreamTamanho"
    )
    ||
    "normal",
    false
);


/* TEMA */

if (temaAutoAtivo()) {

    aplicarTemaAutomatico();

} else {

    aplicarTema(
        ler(
            "dreamTema"
        )
        ===
        "escuro",
        false
    );

}


atualizarTemaAutoUI();

atualizarAutoGaleriaUI();

atualizarCoracoesCliqueUI();

atualizarCarrossel();