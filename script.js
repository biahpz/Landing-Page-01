/* =========================================
   DREAM AMOR NO AR
   JAVASCRIPT
========================================= */


/* =========================================
   MENU MOBILE
========================================= */

const menuMobile = document.getElementById("menuMobile");
const menu = document.getElementById("menu");

if (menuMobile && menu) {

    menuMobile.addEventListener("click", () => {

        menu.classList.toggle("ativo");

        if (menu.classList.contains("ativo")) {
            menuMobile.textContent = "✕";
        } else {
            menuMobile.textContent = "☰";
        }

    });


    document.querySelectorAll(".menu a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("ativo");

            menuMobile.textContent = "☰";

        });

    });

}


/* =========================================
   FAQ
========================================= */

const perguntas = document.querySelectorAll(".faq-pergunta");

perguntas.forEach(pergunta => {

    pergunta.addEventListener("click", () => {

        const item = pergunta.closest(".faq-item");

        const estavaAberto =
            item.classList.contains("ativo");


        document
            .querySelectorAll(".faq-item")
            .forEach(outroItem => {

                outroItem.classList.remove("ativo");

            });


        if (!estavaAberto) {

            item.classList.add("ativo");

        }

    });

});


/* =========================================
   ANIMAÇÃO AO ROLAR
========================================= */

const elementosRevelar =
    document.querySelectorAll(".revelar");


if ("IntersectionObserver" in window) {

    const observador =
        new IntersectionObserver(

            entradas => {

                entradas.forEach(entrada => {

                    if (entrada.isIntersecting) {

                        entrada.target
                            .classList
                            .add("visivel");

                        observador.unobserve(
                            entrada.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    elementosRevelar.forEach(elemento => {

        observador.observe(elemento);

    });

} else {

    elementosRevelar.forEach(elemento => {

        elemento.classList.add("visivel");

    });

}


/* =========================================
   HEADER AO ROLAR
========================================= */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (!header) return;


    if (window.scrollY > 40) {

        header.classList.add("header-scroll");

    } else {

        header.classList.remove("header-scroll");

    }

});


/* =========================================
   MENU ATIVO CONFORME A SEÇÃO
========================================= */

const secoes =
    document.querySelectorAll("main section[id]");

const linksMenu =
    document.querySelectorAll(".menu a");


function atualizarMenu() {

    let atual = "";

    secoes.forEach(secao => {

        const topo =
            secao.offsetTop - 150;

        const altura =
            secao.offsetHeight;


        if (
            window.scrollY >= topo &&
            window.scrollY <
            topo + altura
        ) {

            atual = secao.id;

        }

    });


    linksMenu.forEach(link => {

        link.classList.remove("ativo-link");

        if (
            link.getAttribute("href") ===
            "#" + atual
        ) {

            link.classList.add("ativo-link");

        }

    });

}


window.addEventListener(
    "scroll",
    atualizarMenu
);


/* =========================================
   EFEITO 3D NO FRASCO
========================================= */

const heroProduto =
    document.querySelector(".hero-produto");

const imagemPrincipal =
    document.querySelector(".imagem-principal");


if (heroProduto && imagemPrincipal) {

    heroProduto.addEventListener(
        "mousemove",
        evento => {

            if (window.innerWidth < 900) {
                return;
            }


            const area =
                heroProduto.getBoundingClientRect();


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


            const rotacaoY =
                (x - centroX) / 35;

            const rotacaoX =
                -(y - centroY) / 35;


            imagemPrincipal.style.transform =
                `
                perspective(900px)
                rotateX(${rotacaoX}deg)
                rotateY(${rotacaoY}deg)
                translateY(-8px)
                scale(1.03)
                `;

        }
    );


    heroProduto.addEventListener(
        "mouseleave",
        () => {

            imagemPrincipal.style.transform = "";

        }
    );

}


/* =========================================
   DEGRADÊ INTERATIVO NO HERO
========================================= */

const hero =
    document.querySelector(".hero");


if (hero) {

    hero.addEventListener(
        "mousemove",
        evento => {

            if (window.innerWidth < 800) {
                return;
            }


            const area =
                hero.getBoundingClientRect();


            const x =
                ((evento.clientX - area.left)
                / area.width) * 100;

            const y =
                ((evento.clientY - area.top)
                / area.height) * 100;


            hero.style.background = `
                radial-gradient(
                    circle at ${x}% ${y}%,
                    rgba(255,255,255,0.95) 0%,
                    rgba(255,226,239,0.85) 28%,
                    rgba(237,219,255,0.80) 60%,
                    rgba(220,198,255,0.85) 100%
                )
            `;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            hero.style.background = "";

        }
    );

}


/* =========================================
   BOTÕES COM EFEITO DE LUZ
========================================= */

const botoes =
    document.querySelectorAll(
        ".botao-principal, .botao-header, .botao-cta, .botao-flutuante"
    );


botoes.forEach(botao => {

    botao.addEventListener(
        "mousemove",
        evento => {

            const area =
                botao.getBoundingClientRect();


            const x =
                evento.clientX -
                area.left;

            const y =
                evento.clientY -
                area.top;


            botao.style.setProperty(
                "--mouse-x",
                x + "px"
            );

            botao.style.setProperty(
                "--mouse-y",
                y + "px"
            );

        }
    );

});


/* =========================================
   SUAVIZAR LINKS INTERNOS
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            evento => {

                const destino =
                    link.getAttribute("href");


                if (
                    destino === "#" ||
                    destino.length <= 1
                ) {
                    return;
                }


                const elemento =
                    document.querySelector(destino);


                if (elemento) {

                    evento.preventDefault();


                    elemento.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    });


/* =========================================
   BOTÃO VOLTAR AO TOPO
========================================= */

const botaoTopo =
    document.createElement("button");


botaoTopo.innerHTML = "↑";

botaoTopo.className =
    "botao-topo";

botaoTopo.setAttribute(
    "aria-label",
    "Voltar ao topo"
);

document.body.appendChild(
    botaoTopo
);


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 600) {

            botaoTopo.classList.add(
                "mostrar"
            );

        } else {

            botaoTopo.classList.remove(
                "mostrar"
            );

        }

    }
);


botaoTopo.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================
   PEQUENO EFEITO NOS CARDS
========================================= */

const cards =
    document.querySelectorAll(
        ".nota-card, .momento, .experiencia-card, .review"
    );


cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        evento => {

            if (window.innerWidth < 900) {
                return;
            }


            const area =
                card.getBoundingClientRect();


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
                (x - centroX) / 40;

            const rotateX =
                -(y - centroY) / 40;


            card.style.transform =
                `
                perspective(700px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================
   CARREGAMENTO
========================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "site-carregado"
        );

        atualizarMenu();

    }
);