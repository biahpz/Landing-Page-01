/* =========================================
   INICIAR
========================================= */

document.body.classList.add("js-ativo");


/* =========================================
   FUNÇÕES AUXILIARES
========================================= */

function salvarLocal(chave, valor) {

    try {

        localStorage.setItem(
            chave,
            valor
        );

    } catch (erro) {

        console.log(
            "Não foi possível salvar no navegador."
        );

    }

}


function lerLocal(chave) {

    try {

        return localStorage.getItem(
            chave
        );

    } catch (erro) {

        return null;

    }

}


/* =========================================
   LOADER
========================================= */

window.addEventListener(
    "load",
    () => {

        const loader =
            document.getElementById(
                "loader"
            );


        setTimeout(
            () => {

                if (loader) {

                    loader.classList.add(
                        "sumir"
                    );

                }

            },

            1000
        );

    }
);


/* =========================================
   TOAST
========================================= */

const toast =
    document.getElementById(
        "toast"
    );


let timerToast;


function mostrarToast(texto) {

    if (!toast) return;


    toast.textContent =
        texto;


    toast.classList.add(
        "mostrar"
    );


    clearTimeout(
        timerToast
    );


    timerToast =
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
   MENU MOBILE
========================================= */

const menuMobile =
    document.getElementById(
        "menuMobile"
    );


const menu =
    document.getElementById(
        "menu"
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
   HEADER + PROGRESSO
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

            document
                .documentElement
                .scrollHeight

            -

            window.innerHeight;


        const porcentagem =

            total > 0

                ?

                (
                    scroll /
                    total
                ) * 100

                :

                0;


        barraProgresso.style.width =
            porcentagem + "%";

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
   REVEAL AO ROLAR
========================================= */

const revelar =
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


    revelar.forEach(
        elemento => {

            observerReveal.observe(
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

    const observerMedidores =
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


                            observerMedidores
                                .unobserve(
                                    entrada.target
                                );

                        }

                    }
                );

            },

            {
                threshold: 0.25
            }

        );


    medidores.forEach(
        medidor => {

            observerMedidores.observe(
                medidor
            );

        }
    );

} else {

    medidores.forEach(
        medidor => {

            medidor.style.width =
                medidor.dataset.valor
                +
                "%";

        }
    );

}


/* =========================================
   PARTÍCULAS DO FUNDO
========================================= */

const particulas =
    document.getElementById(
        "particulas"
    );


const simbolos =
    [
        "♡",
        "✦",
        "✿"
    ];


function criarParticula() {

    if (!particulas) return;


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
        (
            9
            +
            Math.random()
            *
            16
        )
        +
        "px";


    elemento.style.animationDuration =
        (
            8
            +
            Math.random()
            *
            9
        )
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
    1000
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


if (
    heroProduto &&
    frasco
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


            const centroX =
                area.width / 2;


            const centroY =
                area.height / 2;


            const rotacaoY =
                (
                    x -
                    centroX
                )
                /
                30;


            const rotacaoX =
                -(
                    y -
                    centroY
                )
                /
                30;


            frasco.style.transform =
                `
                perspective(900px)
                rotateX(${rotacaoX}deg)
                rotateY(${rotacaoY}deg)
                scale(1.03)
                `;


            if (brilho) {

                brilho.style.left =
                    x -
                    100
                    +
                    "px";


                brilho.style.top =
                    y -
                    100
                    +
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


        const x =
            Math.random()
            *
            190
            -
            95;


        const y =
            -(
                35
                +
                Math.random()
                *
                160
            );


        gota.style.setProperty(
            "--x",
            x + "px"
        );


        gota.style.setProperty(
            "--y",
            y + "px"
        );


        gota.style.animationDelay =
            Math.random()
            *
            0.15
            +
            "s";


        const tamanho =
            3
            +
            Math.random()
            *
            5;


        gota.style.width =
            tamanho
            +
            "px";


        gota.style.height =
            tamanho
            +
            "px";


        sprayArea.appendChild(
            gota
        );


        setTimeout(
            () => {

                gota.remove();

            },

            1300
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
        lerLocal(
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

    const novoEstado =
        !estaFavoritado();


    salvarLocal(
        "dreamFavorito",
        novoEstado
            ? "sim"
            : "nao"
    );


    atualizarFavorito();


    mostrarToast(

        novoEstado

            ? "Adicionado aos favoritos ♡"

            : "Removido dos favoritos"

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

const compartilhar =
    document.getElementById(
        "compartilhar"
    );


const compartilharModal =
    document.getElementById(
        "compartilharModal"
    );


async function compartilharSite() {

    const dados = {

        title:
            "Dream Amor no Ar 350ml",

        text:
            "Conheça Dream Amor no Ar.",

        url:
            window.location.href

    };


    try {

        if (
            navigator.share
        ) {

            await navigator.share(
                dados
            );

            return;

        }


        if (
            navigator.clipboard &&
            navigator.clipboard.writeText
        ) {

            await navigator.clipboard
                .writeText(
                    window.location.href
                );


            mostrarToast(
                "Link copiado!"
            );


            return;

        }


        const campo =
            document.createElement(
                "textarea"
            );


        campo.value =
            window.location.href;


        document.body.appendChild(
            campo
        );


        campo.select();


        document.execCommand(
            "copy"
        );


        campo.remove();


        mostrarToast(
            "Link copiado!"
        );

    } catch (erro) {

        console.log(
            "Compartilhamento cancelado."
        );

    }

}


if (compartilhar) {

    compartilhar.addEventListener(
        "click",
        compartilharSite
    );

}


if (compartilharModal) {

    compartilharModal.addEventListener(
        "click",
        compartilharSite
    );

}


/* =========================================
   BLOQUEIO DO BODY PARA MODAIS
========================================= */

function atualizarBloqueioBody() {

    const algumAberto =

        document.querySelector(
            ".modal.ativo, .lightbox.ativo"
        );


    document.body.classList.toggle(
        "modal-aberto",
        Boolean(algumAberto)
    );

}


/* =========================================
   MODAL PRODUTO
========================================= */

const modalProduto =
    document.getElementById(
        "modalProduto"
    );


const botoesAbrirProduto =
    document.querySelectorAll(
        ".abrir-produto"
    );


function abrirModalProduto() {

    if (!modalProduto) return;


    modalProduto.classList.add(
        "ativo"
    );


    modalProduto.setAttribute(
        "aria-hidden",
        "false"
    );


    atualizarBloqueioBody();

}


function fecharModalProduto() {

    if (!modalProduto) return;


    modalProduto.classList.remove(
        "ativo"
    );


    modalProduto.setAttribute(
        "aria-hidden",
        "true"
    );


    atualizarBloqueioBody();

}


botoesAbrirProduto.forEach(
    botao => {

        botao.addEventListener(
            "click",
            abrirModalProduto
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
                fecharModalProduto
            );

        }
    );


/* =========================================
   NOTAS CLICÁVEIS
========================================= */

const modalNota =
    document.getElementById(
        "modalNota"
    );


const notaTitulo =
    document.getElementById(
        "notaTitulo"
    );


const notaDescricao =
    document.getElementById(
        "notaDescricao"
    );


const notaIcone =
    document.getElementById(
        "notaIcone"
    );


const dadosNotas = {

    bergamota: {

        titulo:
            "Bergamota",

        icone:
            "🍋",

        descricao:
            "Traz uma sensação cítrica, fresca e luminosa para a abertura da fragrância."

    },

    cassis: {

        titulo:
            "Cassis",

        icone:
            "🫐",

        descricao:
            "Uma nota frutada de perfil marcante e levemente ácido."

    },

    mandarina: {

        titulo:
            "Mandarina",

        icone:
            "🍊",

        descricao:
            "Adiciona um frescor cítrico mais doce e alegre."

    },

    maca: {

        titulo:
            "Maçã",

        icone:
            "🍎",

        descricao:
            "Contribui com um toque frutado fresco, suave e suculento."

    },

    rosa: {

        titulo:
            "Rosa",

        icone:
            "🌹",

        descricao:
            "Uma nota floral clássica que reforça o lado romântico e delicado."

    },

    lotus: {

        titulo:
            "Flor de Lótus",

        icone:
            "🌸",

        descricao:
            "Traz uma sensação floral leve, suave e delicada."

    },

    freesia: {

        titulo:
            "Frésia",

        icone:
            "💐",

        descricao:
            "Uma flor de perfil fresco e luminoso."

    },

    pessego: {

        titulo:
            "Pêssego",

        icone:
            "🍑",

        descricao:
            "Adiciona uma faceta frutada macia, doce e confortável."

    },

    ambar: {

        titulo:
            "Âmbar",

        icone:
            "✨",

        descricao:
            "Traz calor e profundidade para a base da fragrância."

    },

    sandalo: {

        titulo:
            "Sândalo",

        icone:
            "🪵",

        descricao:
            "Uma nota amadeirada cremosa que aumenta a sensação de conforto."

    },

    baunilha: {

        titulo:
            "Baunilha",

        icone:
            "🤍",

        descricao:
            "Acrescenta um dulçor macio, envolvente e aconchegante."

    },

    musk: {

        titulo:
            "Musk",

        icone:
            "☁",

        descricao:
            "Ajuda a criar uma sensação limpa, macia e confortável."

    }

};


function abrirNota(nome) {

    const nota =
        dadosNotas[
            nome
        ];


    if (
        !nota ||
        !modalNota
    ) {
        return;
    }


    if (notaTitulo) {

        notaTitulo.textContent =
            nota.titulo;

    }


    if (notaDescricao) {

        notaDescricao.textContent =
            nota.descricao;

    }


    if (notaIcone) {

        notaIcone.textContent =
            nota.icone;

    }


    modalNota.classList.add(
        "ativo"
    );


    modalNota.setAttribute(
        "aria-hidden",
        "false"
    );


    atualizarBloqueioBody();

}


function fecharNota() {

    if (!modalNota) return;


    modalNota.classList.remove(
        "ativo"
    );


    modalNota.setAttribute(
        "aria-hidden",
        "true"
    );


    atualizarBloqueioBody();

}


document
    .querySelectorAll(
        ".nota-chip"
    )
    .forEach(
        chip => {

            chip.addEventListener(
                "click",
                () => {

                    abrirNota(
                        chip.dataset.nota
                    );

                }
            );

        }
    );


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


let slideAtual = 0;

let autoCarrossel;


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


if (pontos) {

    slides.forEach(
        (_, indice) => {

            const ponto =
                document.createElement(
                    "button"
                );


            ponto.type =
                "button";


            ponto.setAttribute(
                "aria-label",
                `Ir para imagem ${indice + 1}`
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


            pontos.appendChild(
                ponto
            );

        }
    );

}


if (
    proximo &&
    slides.length
) {

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


if (
    anterior &&
    slides.length
) {

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


function iniciarCarrossel() {

    clearInterval(
        autoCarrossel
    );


    if (
        slides.length <=
        1
    ) {
        return;
    }


    autoCarrossel =
        setInterval(
            () => {

                slideAtual =
                    (
                        slideAtual +
                        1
                    )
                    %
                    slides.length;


                atualizarCarrossel();

            },

            6000
        );

}


const areaCarrossel =
    document.querySelector(
        ".carrossel"
    );


if (areaCarrossel) {

    areaCarrossel.addEventListener(
        "mouseenter",
        () => {

            clearInterval(
                autoCarrossel
            );

        }
    );


    areaCarrossel.addEventListener(
        "mouseleave",
        iniciarCarrossel
    );

}


iniciarCarrossel();


/* =========================================
   LIGHTBOX
========================================= */

const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImagem =
    document.getElementById(
        "lightboxImagem"
    );


const lightboxFechar =
    document.getElementById(
        "lightboxFechar"
    );


const fecharLightboxFundo =
    document.getElementById(
        "fecharLightbox"
    );


function abrirGaleriaGrande(imagem) {

    if (
        !lightbox ||
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


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    atualizarBloqueioBody();

}


function fecharGaleriaGrande() {

    if (!lightbox) return;


    lightbox.classList.remove(
        "ativo"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    atualizarBloqueioBody();

}


document
    .querySelectorAll(
        ".slide img"
    )
    .forEach(
        imagem => {

            imagem.addEventListener(
                "click",
                () => {

                    abrirGaleriaGrande(
                        imagem
                    );

                }
            );

        }
    );


if (lightboxFechar) {

    lightboxFechar.addEventListener(
        "click",
        fecharGaleriaGrande
    );

}


if (fecharLightboxFundo) {

    fecharLightboxFundo.addEventListener(
        "click",
        fecharGaleriaGrande
    );

}


/* =========================================
   DREAM MOOD
========================================= */

const moodBotoes =
    document.querySelectorAll(
        ".mood-botao"
    );


const moodCard =
    document.getElementById(
        "moodCard"
    );


const moodIcone =
    document.getElementById(
        "moodIcone"
    );


const moodTitulo =
    document.getElementById(
        "moodTitulo"
    );


const moodTexto =
    document.getElementById(
        "moodTexto"
    );


const moods = {

    romantico: {

        icone:
            "♡",

        titulo:
            "Amor no Ar",

        texto:
            "Um clima romântico, delicado e cheio de pequenos momentos especiais."

    },


    delicado: {

        icone:
            "✿",

        titulo:
            "Leve & Delicado",

        texto:
            "Uma atmosfera suave para dias tranquilos e cheios de leveza."

    },


    noturno: {

        icone:
            "☾",

        titulo:
            "Dream After Dark",

        texto:
            "Uma atmosfera mais intensa e envolvente para momentos especiais à noite."

    }

};


moodBotoes.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                const mood =
                    botao.dataset.mood;


                const dados =
                    moods[mood];


                if (
                    !dados ||
                    !moodCard
                ) {
                    return;
                }


                moodBotoes.forEach(
                    outro => {

                        outro.classList.remove(
                            "ativo"
                        );

                    }
                );


                botao.classList.add(
                    "ativo"
                );


                moodCard.classList.remove(
                    "romantico",
                    "delicado",
                    "noturno"
                );


                moodCard.classList.add(
                    mood
                );


                if (moodIcone) {

                    moodIcone.textContent =
                        dados.icone;

                }


                if (moodTitulo) {

                    moodTitulo.textContent =
                        dados.titulo;

                }


                if (moodTexto) {

                    moodTexto.textContent =
                        dados.texto;

                }

            }
        );

    }
);


/* =========================================
   MODO ESCURO
========================================= */

const botaoTema =
    document.getElementById(
        "botaoTema"
    );


function atualizarBotaoTema() {

    if (!botaoTema) return;


    const escuro =
        document.body
            .classList
            .contains(
                "tema-escuro"
            );


    botaoTema.textContent =
        escuro
            ? "☀"
            : "☾";

}


const temaSalvo =
    lerLocal(
        "dreamTema"
    );


if (
    temaSalvo ===
    "escuro"
) {

    document.body.classList.add(
        "tema-escuro"
    );

}


atualizarBotaoTema();


if (botaoTema) {

    botaoTema.addEventListener(
        "click",
        () => {

            document.body
                .classList
                .toggle(
                    "tema-escuro"
                );


            const escuro =
                document.body
                    .classList
                    .contains(
                        "tema-escuro"
                    );


            salvarLocal(
                "dreamTema",
                escuro
                    ? "escuro"
                    : "claro"
            );


            atualizarBotaoTema();


            mostrarToast(
                escuro
                    ? "Modo noturno ativado ☾"
                    : "Modo claro ativado ☀"
            );

        }
    );

}


/* =========================================
   MENU MOSTRA SEÇÃO ATUAL
========================================= */

const secoesMenu =
    document.querySelectorAll(
        "main section[id]"
    );


const linksMenu =
    document.querySelectorAll(
        ".menu a"
    );


if (
    "IntersectionObserver"
    in window
) {

    const observerMenu =
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


                        linksMenu.forEach(
                            link => {

                                link.classList.remove(
                                    "menu-ativo"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    )
                                    ===
                                    "#" + id
                                ) {

                                    link.classList.add(
                                        "menu-ativo"
                                    );

                                }

                            }
                        );

                    }
                );

            },

            {
                rootMargin:
                    "-30% 0px -55% 0px",

                threshold:
                    0
            }

        );


    secoesMenu.forEach(
        secao => {

            observerMenu.observe(
                secao
            );

        }
    );

}


/* =========================================
   QUIZ
========================================= */

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

        pergunta:
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


    const pergunta =
        perguntas[
            perguntaAtual
        ];


    quizCard.innerHTML = `

        <div>

            <span class="quiz-numero">
                0${perguntaAtual + 1} / 03
            </span>

            <h3>
                ${pergunta.pergunta}
            </h3>

            <div class="quiz-opcoes">

                ${pergunta.opcoes
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

                        respostas[
                            botao
                                .dataset
                                .resposta
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

            }
        );

}


function mostrarResultado() {

    let resultado =
        "romantico";


    Object
        .keys(
            respostas
        )
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

        romantico: {

            icone:
                "♡",

            titulo:
                "Seu momento é Romântico",

            texto:
                "Você combina com detalhes especiais, encontros e uma atmosfera cheia de amor."

        },


        leve: {

            icone:
                "☀",

            titulo:
                "Seu momento é Leve",

            texto:
                "Você combina com dias tranquilos, pós-banho e aquela sensação confortável."

        },


        elegante: {

            icone:
                "✦",

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

        <div class="quiz-resultado">

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
                type="button"
                class="quiz-reiniciar"
                id="reiniciarQuiz"
            >
                Fazer novamente
            </button>

        </div>

    `;


    const reiniciar =
        document.getElementById(
            "reiniciarQuiz"
        );


    if (reiniciar) {

        reiniciar.addEventListener(
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

}


if (quizCard) {

    mostrarPergunta();

}


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


                    const aberto =
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


/* =========================================
   EASTER EGG DO LOGO
   5 CLIQUES = CHUVA DE CORAÇÕES
========================================= */

const logos =
    document.querySelectorAll(
        ".logo"
    );


let cliquesLogo = 0;

let timerLogo;


logos.forEach(
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

                ? "♡"

                : "♥";


        coracao.style.left =
            Math.random()
            *
            100
            +
            "vw";


        coracao.style.bottom =
            (
                -20
                +
                Math.random()
                *
                80
            )
            +
            "px";


        coracao.style.fontSize =
            (
                12
                +
                Math.random()
                *
                28
            )
            +
            "px";


        coracao.style.setProperty(
            "--movimento",

            (
                Math.random()
                *
                200
                -
                100
            )
            +
            "px"
        );


        coracao.style.animationDelay =
            Math.random()
            *
            .5
            +
            "s";


        document.body.appendChild(
            coracao
        );


        setTimeout(
            () => {

                coracao.remove();

            },

            3200
        );

    }

}


/* =========================================
   ESC FECHA TUDO
========================================= */

document.addEventListener(
    "keydown",
    evento => {

        if (
            evento.key !==
            "Escape"
        ) {
            return;
        }


        fecharNota();

        fecharModalProduto();

        fecharGaleriaGrande();

    }
);