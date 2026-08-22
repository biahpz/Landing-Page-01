document.documentElement.classList.add("js");


/* =============================
   LOADER
============================= */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        if (loader) {
            loader.classList.add("sumir");
        }

    }, 1200);

});


/* =============================
   MENU MOBILE
============================= */

const menuMobile =
    document.getElementById("menuMobile");

const menu =
    document.getElementById("menu");


if (menuMobile && menu) {

    menuMobile.addEventListener("click", () => {

        menu.classList.toggle("ativo");

        menuMobile.textContent =
            menu.classList.contains("ativo")
                ? "✕"
                : "☰";

    });


    document
        .querySelectorAll(".menu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                menu.classList.remove("ativo");

                menuMobile.textContent = "☰";

            });

        });

}


/* =============================
   HEADER
============================= */

const header =
    document.getElementById("header");


window.addEventListener("scroll", () => {

    if (!header) return;


    header.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );

});


/* =============================
   BARRA DE PROGRESSO
============================= */

const barraProgresso =
    document.getElementById(
        "barraProgresso"
    );


function atualizarProgresso() {

    const alturaDocumento =
        document.documentElement
            .scrollHeight
        -
        window.innerHeight;


    const porcentagem =
        alturaDocumento > 0
            ?
            (
                window.scrollY /
                alturaDocumento
            ) * 100
            :
            0;


    barraProgresso.style.width =
        porcentagem + "%";

}


window.addEventListener(
    "scroll",
    atualizarProgresso
);


/* =============================
   REVELAR ELEMENTOS
============================= */

const elementos =
    document.querySelectorAll(
        ".revelar"
    );


if ("IntersectionObserver" in window) {

    const observador =
        new IntersectionObserver(

            entradas => {

                entradas.forEach(
                    entrada => {

                        if (
                            entrada
                                .isIntersecting
                        ) {

                            entrada.target
                                .classList
                                .add(
                                    "visivel"
                                );

                            observador
                                .unobserve(
                                    entrada.target
                                );

                        }

                    }
                );

            },

            {
                threshold: 0.1
            }

        );


    elementos.forEach(elemento => {

        observador.observe(elemento);

    });

} else {

    elementos.forEach(elemento => {

        elemento.classList.add("visivel");

    });

}


/* =============================
   MEDIDORES
============================= */

const medidores =
    document.querySelectorAll(
        ".barra div"
    );


const observadorMedidores =
    new IntersectionObserver(

        entradas => {

            entradas.forEach(entrada => {

                if (
                    entrada.isIntersecting
                ) {

                    const valor =
                        entrada.target
                            .dataset.valor;

                    entrada.target
                        .style.width =
                            valor + "%";

                }

            });

        },

        {
            threshold: 0.4
        }

    );


medidores.forEach(medidor => {

    observadorMedidores.observe(
        medidor
    );

});


/* =============================
   PARTÍCULAS
============================= */

const particulas =
    document.getElementById(
        "particulas"
    );


const simbolos =
    ["♡", "✦", "✿"];


function criarParticula() {

    if (!particulas) return;


    const item =
        document.createElement("span");


    item.className =
        "particula";


    item.textContent =
        simbolos[
            Math.floor(
                Math.random() *
                simbolos.length
            )
        ];


    item.style.left =
        Math.random() *
        100 +
        "vw";


    item.style.fontSize =
        (
            9 +
            Math.random() * 16
        )
        +
        "px";


    item.style.animationDuration =
        (
            8 +
            Math.random() * 9
        )
        +
        "s";


    particulas.appendChild(
        item
    );


    setTimeout(() => {

        item.remove();

    }, 18000);

}


setInterval(
    criarParticula,
    900
);


/* =============================
   FRASCO 3D
============================= */

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


            const centroX =
                area.width / 2;


            const centroY =
                area.height / 2;


            const rotacaoY =
                (
                    x -
                    centroX
                ) / 30;


            const rotacaoX =
                -(
                    y -
                    centroY
                ) / 30;


            frasco.style.transform =
                `
                perspective(900px)
                rotateX(${rotacaoX}deg)
                rotateY(${rotacaoY}deg)
                translateY(-8px)
                scale(1.03)
                `;


            if (brilho) {

                brilho.style.left =
                    x -
                    100 +
                    "px";


                brilho.style.top =
                    y -
                    100 +
                    "px";

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


/* =============================
   CARROSSEL
============================= */

const carrossel =
    document.getElementById(
        "carrossel"
    );

const anterior =
    document.getElementById(
        "anterior"
    );

const proximo =
    document.getElementById(
        "proximo"
    );

const pontos =
    document.getElementById(
        "pontos"
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
                    indice ===
                    slideAtual
                );

            }
        );

}


if (pontos) {

    slides.forEach(
        (_, indice) => {

            const ponto =
                document
                    .createElement(
                        "button"
                    );


            ponto.setAttribute(
                "aria-label",
                `Ir para imagem ${indice + 1}`
            );


            if (indice === 0) {

                ponto.classList
                    .add("ativo");

            }


            ponto.addEventListener(
                "click",
                () => {

                    slideAtual =
                        indice;

                    atualizarCarrossel();

                }
            );


            pontos.appendChild(
                ponto
            );

        }
    );

}


if (proximo) {

    proximo.addEventListener(
        "click",
        () => {

            slideAtual =
                (
                    slideAtual +
                    1
                )
                %
                slides.length;


            atualizarCarrossel();

        }
    );

}


if (anterior) {

    anterior.addEventListener(
        "click",
        () => {

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
    );

}


/* AUTOMÁTICO */

let carrosselAutomatico =
    setInterval(() => {

        if (!slides.length) return;


        slideAtual =
            (
                slideAtual +
                1
            )
            %
            slides.length;


        atualizarCarrossel();

    }, 6000);


/* PAUSAR COM MOUSE */

const carrosselArea =
    document.querySelector(
        ".carrossel"
    );


if (carrosselArea) {

    carrosselArea.addEventListener(
        "mouseenter",
        () => {

            clearInterval(
                carrosselAutomatico
            );

        }
    );

}


/* =============================
   QUIZ
============================= */

const quizCard =
    document.getElementById(
        "quizCard"
    );


let perguntaAtual = 0;


const respostas = {
    romantico: 0,
    leve: 0,
    elegante: 0
};


const perguntas = [

    {
        numero:
            "01 / 03",

        pergunta:
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
        numero:
            "02 / 03",

        pergunta:
            "Qual é seu momento favorito?",

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
        numero:
            "03 / 03",

        pergunta:
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
        perguntas[
            perguntaAtual
        ];


    quizCard.innerHTML = `

        <div>

            <span
                class="quiz-numero"
            >
                ${atual.numero}
            </span>

            <h3>
                ${atual.pergunta}
            </h3>

            <div
                class="quiz-opcoes"
            >

                ${atual.opcoes
                    .map(
                        opcao => `

                        <button
                            data-pontos="${opcao[1]}"
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
        .forEach(botao => {

            botao
                .addEventListener(
                    "click",
                    () => {

                        respostas[
                            botao
                                .dataset
                                .pontos
                        ]++;


                        perguntaAtual++;


                        if (
                            perguntaAtual
                            <
                            perguntas.length
                        ) {

                            mostrarPergunta();

                        } else {

                            mostrarResultado();

                        }

                    }
                );

        });

}


function mostrarResultado() {

    let resultado =
        "romantico";


    if (
        respostas.leve
        >
        respostas[resultado]
    ) {

        resultado =
            "leve";

    }


    if (
        respostas.elegante
        >
        respostas[resultado]
    ) {

        resultado =
            "elegante";

    }


    const resultados = {

        romantico: {

            icone: "♡",

            titulo:
                "Seu momento é Romântico",

            texto:
                "Você combina com encontros, detalhes especiais e uma atmosfera cheia de amor."

        },

        leve: {

            icone: "☀",

            titulo:
                "Seu momento é Leve",

            texto:
                "Você combina com dias tranquilos, pós-banho e aquela sensação confortável."

        },

        elegante: {

            icone: "✦",

            titulo:
                "Seu momento é Elegante",

            texto:
                "Você gosta de personalidade, presença e momentos em que cada detalhe faz diferença."

        }

    };


    const r =
        resultados[
            resultado
        ];


    quizCard.innerHTML = `

        <div
            class="quiz-resultado"
        >

            <span>
                ${r.icone}
            </span>

            <h3>
                ${r.titulo}
            </h3>

            <p>
                ${r.texto}
            </p>

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
        .addEventListener(
            "click",
            reiniciarQuiz
        );

}


function reiniciarQuiz() {

    perguntaAtual = 0;

    respostas.romantico = 0;
    respostas.leve = 0;
    respostas.elegante = 0;

    mostrarPergunta();

}


mostrarPergunta();


/* =============================
   FAQ
============================= */

document
    .querySelectorAll(
        ".faq-pergunta"
    )
    .forEach(pergunta => {

        pergunta.addEventListener(
            "click",
            () => {

                const item =
                    pergunta.closest(
                        ".faq-item"
                    );


                const estavaAberto =
                    item.classList
                        .contains(
                            "ativo"
                        );


                document
                    .querySelectorAll(
                        ".faq-item"
                    )
                    .forEach(
                        outro => {

                            outro.classList
                                .remove(
                                    "ativo"
                                );

                        }
                    );


                if (!estavaAberto) {

                    item.classList
                        .add(
                            "ativo"
                        );

                }

            }
        );

    });


/* =============================
   VOLTAR AO TOPO
============================= */

const voltarTopo =
    document.getElementById(
        "voltarTopo"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!voltarTopo) return;


        voltarTopo.classList.toggle(
            "mostrar",
            window.scrollY > 600
        );

    }
);


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