/* ===============================
   DREAM AMOR NO AR
=============================== */


/* LOADER */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        if (loader) {
            loader.classList.add("sumir");
        }

    }, 1500);

});


/* MENU MOBILE */

const menuMobile =
    document.getElementById("menuMobile");

const menu =
    document.getElementById("menu");


if (menuMobile && menu) {

    menuMobile.addEventListener(
        "click",
        () => {

            menu.classList.toggle("ativo");

            menuMobile.textContent =
                menu.classList.contains("ativo")
                ? "✕"
                : "☰";

        }
    );


    document
        .querySelectorAll(".menu a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    menu.classList.remove("ativo");

                    menuMobile.textContent = "☰";

                }
            );

        });

}


/* HEADER */

const header =
    document.getElementById("header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* ANIMAÇÕES AO ROLAR */

const revelar =
    document.querySelectorAll(".revelar");


const observer =
    new IntersectionObserver(

        entradas => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    entrada.target
                        .classList
                        .add("visivel");

                }

            });

        },

        {
            threshold: 0.1
        }

    );


revelar.forEach(elemento => {

    observer.observe(elemento);

});


/* PARTÍCULAS */

const particulas =
    document.getElementById("particulas");


const simbolos =
    ["♡", "✦", "✿", "·"];


function criarParticula() {

    if (!particulas) return;


    const elemento =
        document.createElement("span");


    elemento.className =
        "particula";


    elemento.textContent =
        simbolos[
            Math.floor(
                Math.random() *
                simbolos.length
            )
        ];


    elemento.style.left =
        Math.random() * 100 + "vw";


    elemento.style.fontSize =
        10 +
        Math.random() * 18 +
        "px";


    elemento.style.animationDuration =
        8 +
        Math.random() * 10 +
        "s";


    elemento.style.opacity =
        0.1 +
        Math.random() * 0.3;


    particulas.appendChild(elemento);


    setTimeout(() => {

        elemento.remove();

    }, 18000);

}


setInterval(
    criarParticula,
    650
);


/* PARALLAX / EFEITO 3D */

const heroProduto =
    document.getElementById("heroProduto");

const frasco =
    document.getElementById("frascoPrincipal");

const brilho =
    document.getElementById("brilhoMouse");


if (heroProduto && frasco) {

    heroProduto.addEventListener(
        "mousemove",
        evento => {

            if (window.innerWidth < 900) {
                return;
            }


            const area =
                heroProduto
                    .getBoundingClientRect();


            const x =
                evento.clientX -
                area.left;

            const y =
                evento.clientY -
                area.top;


            const centroX =
                area.width / 2;

            const centroY =
                area.height / 2;


            const rotateY =
                (x - centroX) / 30;

            const rotateX =
                -(y - centroY) / 30;


            frasco.style.transform =
                `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
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

            frasco.style.transform = "";

        }
    );

}


/* PARALLAX NO SCROLL */

window.addEventListener("scroll", () => {

    if (!frasco) return;

    if (window.innerWidth < 900) {
        return;
    }


    const deslocamento =
        window.scrollY * 0.04;


    if (
        !frasco.style.transform
            .includes("rotate")
    ) {

        frasco.style.transform =
            `translateY(${deslocamento}px)`;

    }

});


/* CARROSSEL */

const carrossel =
    document.getElementById("carrossel");

const anterior =
    document.getElementById("anterior");

const proximo =
    document.getElementById("proximo");

const pontosContainer =
    document.getElementById("pontos");


let slideAtual = 0;


const slides =
    document.querySelectorAll(".slide");


function atualizarCarrossel() {

    if (!carrossel) return;


    carrossel.style.transform =
        `translateX(-${slideAtual * 100}%)`;


    document
        .querySelectorAll(
            ".carrossel-pontos button"
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


if (pontosContainer) {

    slides.forEach(
        (_, indice) => {

            const ponto =
                document.createElement("button");


            if (indice === 0) {

                ponto.classList.add("ativo");

            }


            ponto.addEventListener(
                "click",
                () => {

                    slideAtual = indice;

                    atualizarCarrossel();

                }
            );


            pontosContainer.appendChild(
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
                (slideAtual + 1)
                % slides.length;


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
                % slides.length;


            atualizarCarrossel();

        }
    );

}


/* CARROSSEL AUTOMÁTICO */

setInterval(() => {

    if (!slides.length) return;


    slideAtual =
        (slideAtual + 1)
        % slides.length;


    atualizarCarrossel();

}, 6000);


/* ===============================
   QUIZ
=============================== */

const quizCard =
    document.getElementById("quizCard");


let perguntaAtual = 0;


const respostas = {
    romantico: 0,
    leve: 0,
    elegante: 0
};


const perguntas = [

    {
        numero: "01 / 03",

        pergunta:
            "Qual clima você prefere?",

        opcoes: [
            ["♡ Romântico", "romantico"],
            ["☀ Leve", "leve"],
            ["✦ Elegante", "elegante"]
        ]
    },

    {
        numero: "02 / 03",

        pergunta:
            "Qual é o seu momento favorito?",

        opcoes: [
            ["♡ Um encontro", "romantico"],
            ["☀ Depois do banho", "leve"],
            ["☾ Sair à noite", "elegante"]
        ]
    },

    {
        numero: "03 / 03",

        pergunta:
            "Como você quer se sentir?",

        opcoes: [
            ["♡ Apaixonada", "romantico"],
            ["☁ Confortável", "leve"],
            ["✦ Marcante", "elegante"]
        ]
    }

];


function mostrarPergunta() {

    const atual =
        perguntas[perguntaAtual];


    quizCard.innerHTML = `

        <div>

            <span class="quiz-numero">
                ${atual.numero}
            </span>

            <h3>
                ${atual.pergunta}
            </h3>

            <div class="quiz-opcoes">

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

            botao.addEventListener(
                "click",
                () => {

                    respostas[
                        botao.dataset.pontos
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
        respostas.leve >
        respostas[resultado]
    ) {

        resultado = "leve";

    }


    if (
        respostas.elegante >
        respostas[resultado]
    ) {

        resultado = "elegante";

    }


    const resultados = {

        romantico: {
            icone: "♡",
            titulo:
                "Seu momento é Romântico",
            texto:
                "Você combina com momentos especiais, encontros e aquela sensação de amor no ar."
        },

        leve: {
            icone: "☀",
            titulo:
                "Seu momento é Leve",
            texto:
                "Você combina com uma rotina tranquila, pós-banho e uma fragrância confortável para o dia."
        },

        elegante: {
            icone: "✦",
            titulo:
                "Seu momento é Elegante",
            texto:
                "Você gosta de presença, personalidade e momentos em que cada detalhe faz diferença."
        }

    };


    const r =
        resultados[resultado];


    quizCard.innerHTML = `

        <div class="quiz-resultado">

            <div class="resultado-icone">
                ${r.icone}
            </div>

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


/* COMEÇAR QUIZ */

if (quizCard) {
    mostrarPergunta();
}


/* FAQ */

document
    .querySelectorAll(
        ".faq-pergunta"
    )
    .forEach(pergunta => {

        pergunta.addEventListener(
            "click",
            () => {

                const item =
                    pergunta
                        .closest(
                            ".faq-item"
                        );


                const aberto =
                    item.classList
                        .contains("ativo");


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


                if (!aberto) {

                    item.classList
                        .add("ativo");

                }

            }
        );

    });


/* VOLTAR AO TOPO */

const voltarTopo =
    document.getElementById(
        "voltarTopo"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 600) {

            voltarTopo.classList
                .add("mostrar");

        } else {

            voltarTopo.classList
                .remove("mostrar");

        }

    }
);


voltarTopo.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);