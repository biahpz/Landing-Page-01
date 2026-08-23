"use strict";

/* =========================================================
   DREAM • AMOR NO AR
   SCRIPT.JS v60
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const $ = (
    selector,
    parent = document
) => parent.querySelector(selector);

const $$ = (
    selector,
    parent = document
) => [...parent.querySelectorAll(selector)];

const body =
    document.body;

const root =
    document.documentElement;


/* =========================================================
   ELEMENTOS GERAIS
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

let toastTimer;


/* =========================================================
   I18N
========================================================= */

const translations = {

    "pt-BR": {

        "loader.subtitle":
            "Amor no Ar",

        "loader.loading":
            "preparando sua experiência",


        "nav.home":
            "Início",

        "nav.product":
            "Produto",

        "nav.campaign":
            "Campanha",

        "nav.notes":
            "Notas",

        "nav.experience":
            "Experiência",

        "nav.feel":
            "Sensação",

        "nav.moments":
            "Momentos",

        "nav.gallery":
            "Galeria",

        "nav.mood":
            "Mood",

        "nav.quiz":
            "Quiz",

        "nav.discover":
            "Conhecer",


        "music.playing":
            "TOCANDO AGORA",


        "hero.status":
            "experiência interativa",

        "hero.eyebrow":
            "O BOTICÁRIO • DREAM",

        "hero.title2":
            "Amor no Ar",

        "hero.description":
            "Uma fragrância delicada, romântica e envolvente para transformar pequenos momentos em lembranças especiais.",

        "hero.discover":
            "Descobrir o Dream",

        "hero.viewProduct":
            "Ver produto",

        "hero.fact1":
            "Body Splash",

        "hero.fact2Title":
            "Floral",

        "hero.fact2":
            "Amadeirado",

        "hero.fact3":
            "Amor no Ar",

        "hero.tip":
            "Toque em borrifar para ativar o efeito, áudio e animação.",

        "hero.productName":
            "Amor no Ar",

        "hero.bodySplash":
            "Body Splash",


        "spray.button":
            "Borrifar",

        "spray.experience":
            "experimentar",

        "spray.counter":
            "BORRIFADAS",


        "ticker.floral":
            "✿ Floral Amadeirado",

        "ticker.love":
            "♡ Amor no Ar",

        "ticker.delicate":
            "☁ Delicado",

        "ticker.romantic":
            "☾ Romântico",


        "section.home":
            "Início",

        "section.product":
            "Produto",

        "section.campaign":
            "Campanha",

        "section.notes":
            "Notas",

        "section.experience":
            "Experiência",

        "section.dreamMoment":
            "Dream Moment",

        "section.feeling":
            "Sensação",

        "section.moments":
            "Momentos",

        "section.scene":
            "Dream Scene",

        "section.gallery":
            "Galeria",

        "section.mood":
            "Mood",

        "section.quiz":
            "Quiz",


        "product.collection":
            "DREAM COLLECTION",

        "product.eyebrow":
            "DREAM AMOR NO AR",

        "product.title1":
            "Um toque de",

        "product.title2":
            "amor",

        "product.title3":
            "na sua rotina.",

        "product.description":
            "Dream Amor no Ar combina delicadeza, romantismo e personalidade em uma fragrância confortável para diferentes momentos.",

        "product.point1Title":
            "Floral delicado",

        "product.point1Text":
            "Uma assinatura leve, elegante e romântica.",

        "product.point2Title":
            "Sensação confortável",

        "product.point2Text":
            "Para usar de forma leve durante o dia.",

        "product.point3Title":
            "Frasco de 350 ml",

        "product.point3Text":
            "Um Dream para acompanhar sua rotina.",

        "product.details":
            "Ver detalhes",

        "product.favorite":
            "♡ Favoritar",

        "product.favorited":
            "♥ Favoritado",


        "campaign.mini":
            "DREAM • AMOR NO AR",

        "campaign.title1":
            "O amor está",

        "campaign.title2":
            "nos detalhes.",

        "campaign.description":
            "Uma atmosfera romântica, sofisticada e cheia de personalidade.",

        "campaign.explore":
            "Explorar universo Dream",

        "campaign.product":
            "Conhecer produto",


        "notes.eyebrow":
            "PIRÂMIDE OLFATIVA",

        "notes.title1":
            "Descubra cada",

        "notes.title2":
            "nota.",

        "notes.description":
            "Explore as diferentes camadas e descubra como a fragrância evolui.",

        "notes.top":
            "saída",

        "notes.heart":
            "corpo",

        "notes.base":
            "fundo",

        "notes.card1Title":
            "Frescor frutado",

        "notes.card1Text":
            "A primeira impressão da fragrância: luminosa, fresca e vibrante.",

        "notes.card2Title":
            "Coração floral",

        "notes.card2Text":
            "O lado romântico, delicado e elegante de Amor no Ar.",

        "notes.card3Title":
            "Conforto envolvente",

        "notes.card3Text":
            "As notas que permanecem e deixam a assinatura final da fragrância.",


        "note.bergamot":
            "Bergamota",

        "note.orange":
            "Laranja",

        "note.mandarin":
            "Mandarina",

        "note.lemon":
            "Limão",

        "note.apple":
            "Maçã",

        "note.rose":
            "Rosa",

        "note.linden":
            "Tília",

        "note.freesia":
            "Frésia",

        "note.lotus":
            "Flor de Lótus",

        "note.gardenia":
            "Gardênia",

        "note.peach":
            "Pêssego",

        "note.amber":
            "Âmbar",

        "note.sandalwood":
            "Sândalo",

        "note.vanilla":
            "Baunilha",


        "experience.eyebrow":
            "SINTA A FRAGRÂNCIA",

        "experience.title1":
            "Explore o Dream de",

        "experience.title2":
            "outro jeito.",

        "experience.description":
            "Descubra a evolução da fragrância, compare sensações e personalize a experiência.",

        "experience.evolution":
            "EVOLUÇÃO",

        "experience.timelineTitle":
            "Timeline da fragrância",

        "experience.timelineIntro":
            "Arraste para acompanhar a evolução ao longo das horas.",

        "experience.evolutionLower":
            "evolução",

        "experience.profile":
            "PERFIL",

        "experience.personality":
            "Personalidade",

        "experience.personalityIntro":
            "Uma leitura visual das principais sensações de Dream.",

        "experience.moment":
            "MOMENTO",

        "experience.feelQuestion":
            "Como você quer se sentir?",

        "experience.feelIntro":
            "Escolha uma atmosfera para transformar o visual da página.",

        "experience.moodHint":
            "A identidade visual muda automaticamente com o mood.",


        "meter.floral":
            "Floral",

        "meter.romantic":
            "Romântico",

        "meter.comfort":
            "Confortável",

        "meter.presence":
            "Presença",

        "meter.intensity":
            "Intensidade",


        "dreamMoment.defaultTitle":
            "Seu momento começa aqui.",

        "dreamMoment.defaultText":
            "Toque no botão para receber uma pequena mensagem Dream.",

        "dreamMoment.button":
            "Novo momento",


        "feeling.eyebrow":
            "SENSAÇÃO DA FRAGRÂNCIA",

        "feeling.title1":
            "Entre leveza e",

        "feeling.title2":
            "presença.",

        "feeling.description":
            "Uma representação visual do equilíbrio de Dream Amor no Ar.",

        "feeling.amorNoAr":
            "AMOR NO AR",

        "feeling.profile":
            "PERFIL SENSORIAL",

        "feeling.bigTitle":
            "Delicado sem passar despercebido.",

        "feeling.text":
            "Dream equilibra um coração romântico com uma base confortável, criando uma presença suave.",


        "moments.eyebrow":
            "QUANDO USAR",

        "moments.title1":
            "Um Dream para cada",

        "moments.title2":
            "momento.",

        "moments.description":
            "Escolha o cenário que mais combina com a sua experiência.",

        "moments.day":
            "DIA",

        "moments.date":
            "ENCONTRO",

        "moments.night":
            "NOITE",

        "moments.special":
            "ESPECIAL",

        "moments.card1Title":
            "Rotina leve",

        "moments.card1Text":
            "Para começar o dia com uma sensação fresca, delicada e confortável.",

        "moments.card2Title":
            "Momento romântico",

        "moments.card2Text":
            "Uma atmosfera delicada para encontros e ocasiões especiais.",

        "moments.card3Title":
            "Noite Dream",

        "moments.card3Text":
            "Para quando você quer uma presença suave, envolvente e elegante.",

        "moments.card4Title":
            "Seu momento",

        "moments.card4Text":
            "Alguns momentos não precisam de ocasião. Basta serem seus.",

        "moments.tagLight":
            "leve",

        "moments.tagRomantic":
            "romântico",

        "moments.tagNight":
            "noturno",

        "moments.tagSpecial":
            "especial",


        "scene.title1":
            "Escolha sua",

        "scene.title2":
            "atmosfera.",

        "scene.description":
            "Mude o cenário e descubra diferentes lados de Dream.",

        "scene.romance":
            "Romance",

        "scene.delicate":
            "delicado",

        "scene.sky":
            "Céu",

        "scene.dreamy":
            "sonhador",

        "scene.flowers":
            "Flores",

        "scene.romantic":
            "romântico",

        "scene.energy":
            "Energia",

        "scene.intense":
            "intenso",


        "quote.start":
            "Feito para deixar",

        "quote.end":
            "o amor no ar.",


        "gallery.eyebrow":
            "GALERIA DREAM",

        "gallery.title1":
            "Entre no universo",

        "gallery.title2":
            "Dream.",

        "gallery.description":
            "Arraste com o mouse, deslize no celular ou use as setas.",

        "gallery.item1":
            "Dream World",

        "gallery.item2":
            "Amor no Ar",

        "gallery.item3":
            "Romance Dream",

        "gallery.explore":
            "explorar ↗",

        "gallery.autoplay":
            "▶ Autoplay",

        "gallery.pause":
            "❚❚ Pausar",


        "mood.eyebrow":
            "ESCOLHA SEU MOOD",

        "mood.title1":
            "Qual é o seu",

        "mood.title2":
            "Dream de hoje?",

        "mood.description":
            "Cada mood muda a identidade visual da experiência.",

        "mood.romantic":
            "Romântico",

        "mood.dreamy":
            "Sonhador",

        "mood.night":
            "Noturno",

        "mood.energy":
            "Energia",

        "mood.calm":
            "Calmo",

        "mood.delicate":
            "delicado",

        "mood.light":
            "leve",

        "mood.mysterious":
            "misterioso",

        "mood.intense":
            "intenso",

        "mood.comfortable":
            "confortável",


        "quiz.title":
            "Qual é o seu Dream?",

        "quiz.description":
            "Responda quatro perguntas e descubra qual atmosfera combina mais com você.",

        "quiz.start":
            "Começar quiz",

        "quiz.questionLabel":
            "DREAM QUESTION",

        "quiz.resultLabel":
            "SEU RESULTADO",

        "quiz.restart":
            "Refazer quiz",

        "quiz.applyMood":
            "Aplicar meu mood",

        "quiz.share":
            "Compartilhar",


        "final.eyebrow":
            "DREAM • AMOR NO AR",

        "final.title1":
            "Deixe seu momento",

        "final.title2":
            "no ar.",

        "final.description":
            "Explore as notas, encontre seu mood e crie sua própria experiência Dream.",

        "final.product":
            "Ver produto",

        "final.share":
            "Compartilhar",

        "final.fullscreen":
            "⛶ Tela cheia",

        "final.exitFullscreen":
            "⤢ Sair da tela cheia",


        "modal.productEyebrow":
            "DREAM AMOR NO AR",

        "modal.productDescription":
            "Uma fragrância floral, romântica e envolvente, pensada para acompanhar momentos leves e especiais.",

        "modal.floral":
            "✿ Floral",

        "modal.romantic":
            "♡ Romântico",

        "modal.comfortable":
            "☁ Confortável",

        "modal.profile":
            "PERFIL",

        "modal.profileValue":
            "Floral amadeirado",

        "modal.experience":
            "EXPERIÊNCIA",

        "modal.experienceValue":
            "Leve e envolvente",

        "modal.noteLabel":
            "NOTA DREAM",


        "lightbox.label":
            "DREAM GALLERY",


        "studio.title":
            "Sua experiência, do seu jeito.",

        "studio.description":
            "Personalize visual, áudio e movimento.",

        "studio.language":
            "Idioma",

        "studio.presets":
            "Estilos rápidos",

        "studio.appearance":
            "Aparência",

        "studio.dark":
            "Modo escuro",

        "studio.darkDesc":
            "Alternar tema",

        "studio.glassDesc":
            "Transparência e desfoque",

        "studio.clean":
            "Modo clean",

        "studio.cleanDesc":
            "Experiência mais minimalista",

        "studio.performance":
            "Modo performance",

        "studio.performanceDesc":
            "Reduz efeitos mais pesados",

        "studio.palettes":
            "Paletas",

        "studio.customColors":
            "Cores personalizadas",

        "studio.primary":
            "Principal",

        "studio.secondary":
            "Secundária",

        "studio.effects":
            "Efeitos",

        "studio.particles":
            "Partículas",

        "studio.particlesDesc":
            "Elementos flutuantes",

        "studio.animations":
            "Animações",

        "studio.animationsDesc":
            "Transições da experiência",

        "studio.cursorDesc":
            "Iluminação que acompanha o mouse",

        "studio.motion":
            "Movimento 3D",

        "studio.motionDesc":
            "Profundidade do frasco",

        "studio.haptic":
            "Vibração do spray",

        "studio.hapticDesc":
            "Feedback em aparelhos compatíveis",

        "studio.spraySound":
            "Som do borrifador",

        "studio.spraySoundDesc":
            "Reproduzir efeito ao borrifar",

        "studio.music":
            "Música",

        "studio.backgroundMusic":
            "Música de fundo",

        "studio.backgroundMusicDesc":
            "Ativar ou pausar Moonlight",

        "studio.volume":
            "Volume",

        "studio.movement":
            "Movimento",

        "studio.speed":
            "Velocidade",

        "studio.motionIntensity":
            "Intensidade 3D",

        "studio.particleIntensity":
            "Partículas",

        "studio.sprayIntensity":
            "Borrifador",

        "studio.reading":
            "Leitura",

        "studio.contrast":
            "Contraste",

        "studio.textSize":
            "Tamanho do texto",

        "studio.reset":
            "↻ Restaurar padrão",


        "footer.subtitle":
            "Amor no Ar • 350 ml",

        "footer.developed":
            "DESENVOLVIDO POR",


        "toast.spray":
            "Dream está no ar ♡",

        "toast.favorite":
            "Dream favoritado ♡",

        "toast.unfavorite":
            "Removido dos favoritos",

        "toast.linkCopied":
            "Link copiado ♡",

        "toast.newMoment":
            "Novo Dream Moment ✦",

        "toast.moodApplied":
            "Seu mood foi aplicado ♡",

        "toast.musicPlaying":
            "Moonlight tocando ♫",

        "toast.performanceOn":
            "Modo performance ativado ⚡",

        "toast.performanceOff":
            "Modo performance desligado",

        "toast.spraySoundOn":
            "Som do borrifador ativado ✦",

        "toast.spraySoundOff":
            "Som do borrifador desligado",

        "toast.reset":
            "Dream Studio restaurado ♡"

    },


    "en-US": {

        "loader.subtitle":
            "Love in the Air",

        "loader.loading":
            "preparing your experience",


        "nav.home":
            "Home",

        "nav.product":
            "Product",

        "nav.campaign":
            "Campaign",

        "nav.notes":
            "Notes",

        "nav.experience":
            "Experience",

        "nav.feel":
            "Feeling",

        "nav.moments":
            "Moments",

        "nav.gallery":
            "Gallery",

        "nav.mood":
            "Mood",

        "nav.quiz":
            "Quiz",

        "nav.discover":
            "Discover",


        "music.playing":
            "NOW PLAYING",


        "hero.status":
            "interactive experience",

        "hero.eyebrow":
            "O BOTICÁRIO • DREAM",

        "hero.title2":
            "Love in the Air",

        "hero.description":
            "A delicate, romantic and enveloping fragrance designed to turn small moments into special memories.",

        "hero.discover":
            "Discover Dream",

        "hero.viewProduct":
            "View product",

        "hero.fact1":
            "Body Splash",

        "hero.fact2Title":
            "Floral",

        "hero.fact2":
            "Woody",

        "hero.fact3":
            "Love in the Air",

        "hero.tip":
            "Tap Spray to activate the effect, sound and animation.",

        "hero.productName":
            "Love in the Air",

        "hero.bodySplash":
            "Body Splash",


        "spray.button":
            "Spray",

        "spray.experience":
            "experience",

        "spray.counter":
            "SPRAYS",


        "ticker.floral":
            "✿ Floral Woody",

        "ticker.love":
            "♡ Love in the Air",

        "ticker.delicate":
            "☁ Delicate",

        "ticker.romantic":
            "☾ Romantic",


        "section.home":
            "Home",

        "section.product":
            "Product",

        "section.campaign":
            "Campaign",

        "section.notes":
            "Notes",

        "section.experience":
            "Experience",

        "section.dreamMoment":
            "Dream Moment",

        "section.feeling":
            "Feeling",

        "section.moments":
            "Moments",

        "section.scene":
            "Dream Scene",

        "section.gallery":
            "Gallery",

        "section.mood":
            "Mood",

        "section.quiz":
            "Quiz",


        "product.collection":
            "DREAM COLLECTION",

        "product.eyebrow":
            "DREAM LOVE IN THE AIR",

        "product.title1":
            "A touch of",

        "product.title2":
            "love",

        "product.title3":
            "in your routine.",

        "product.description":
            "Dream Love in the Air combines delicacy, romance and personality in a comfortable fragrance for different moments.",

        "product.point1Title":
            "Delicate floral",

        "product.point1Text":
            "A light, elegant and romantic signature.",

        "product.point2Title":
            "Comforting feeling",

        "product.point2Text":
            "Made for a light and easy daytime experience.",

        "product.point3Title":
            "350 ml bottle",

        "product.point3Text":
            "A Dream made to follow your routine.",

        "product.details":
            "View details",

        "product.favorite":
            "♡ Favorite",

        "product.favorited":
            "♥ Favorited",


        "campaign.mini":
            "DREAM • LOVE IN THE AIR",

        "campaign.title1":
            "Love lives",

        "campaign.title2":
            "in the details.",

        "campaign.description":
            "A romantic, sophisticated atmosphere full of personality.",

        "campaign.explore":
            "Explore the Dream universe",

        "campaign.product":
            "Discover product",


        "notes.eyebrow":
            "OLFACTORY PYRAMID",

        "notes.title1":
            "Discover every",

        "notes.title2":
            "note.",

        "notes.description":
            "Explore the different layers and discover how the fragrance evolves.",

        "notes.top":
            "top",

        "notes.heart":
            "heart",

        "notes.base":
            "base",

        "notes.card1Title":
            "Fruity freshness",

        "notes.card1Text":
            "The fragrance opens bright, fresh and vibrant.",

        "notes.card2Title":
            "Floral heart",

        "notes.card2Text":
            "The romantic, delicate and elegant side of Love in the Air.",

        "notes.card3Title":
            "Enveloping comfort",

        "notes.card3Text":
            "The notes that linger and create the fragrance's final signature.",


        "note.bergamot":
            "Bergamot",

        "note.orange":
            "Orange",

        "note.mandarin":
            "Mandarin",

        "note.lemon":
            "Lemon",

        "note.apple":
            "Apple",

        "note.rose":
            "Rose",

        "note.linden":
            "Linden",

        "note.freesia":
            "Freesia",

        "note.lotus":
            "Lotus Flower",

        "note.gardenia":
            "Gardenia",

        "note.peach":
            "Peach",

        "note.amber":
            "Amber",

        "note.sandalwood":
            "Sandalwood",

        "note.vanilla":
            "Vanilla",


        "experience.eyebrow":
            "FEEL THE FRAGRANCE",

        "experience.title1":
            "Explore Dream in",

        "experience.title2":
            "a new way.",

        "experience.description":
            "Discover how the fragrance evolves, compare sensations and personalize the experience.",

        "experience.evolution":
            "EVOLUTION",

        "experience.timelineTitle":
            "Fragrance timeline",

        "experience.timelineIntro":
            "Drag to follow the fragrance throughout the hours.",

        "experience.evolutionLower":
            "evolution",

        "experience.profile":
            "PROFILE",

        "experience.personality":
            "Personality",

        "experience.personalityIntro":
            "A visual reading of Dream's main sensations.",

        "experience.moment":
            "MOMENT",

        "experience.feelQuestion":
            "How do you want to feel?",

        "experience.feelIntro":
            "Choose an atmosphere to transform the page.",

        "experience.moodHint":
            "The visual identity changes automatically with your mood.",


        "meter.floral":
            "Floral",

        "meter.romantic":
            "Romantic",

        "meter.comfort":
            "Comfort",

        "meter.presence":
            "Presence",

        "meter.intensity":
            "Intensity",


        "dreamMoment.defaultTitle":
            "Your moment starts here.",

        "dreamMoment.defaultText":
            "Tap the button to receive a small Dream message.",

        "dreamMoment.button":
            "New moment",


        "feeling.eyebrow":
            "FRAGRANCE FEELING",

        "feeling.title1":
            "Between softness and",

        "feeling.title2":
            "presence.",

        "feeling.description":
            "A visual representation of the balance behind Dream Love in the Air.",

        "feeling.amorNoAr":
            "LOVE IN THE AIR",

        "feeling.profile":
            "SENSORY PROFILE",

        "feeling.bigTitle":
            "Delicate without going unnoticed.",

        "feeling.text":
            "Dream balances a romantic heart with a comforting base, creating a soft presence.",


        "moments.eyebrow":
            "WHEN TO WEAR",

        "moments.title1":
            "A Dream for every",

        "moments.title2":
            "moment.",

        "moments.description":
            "Choose the setting that best matches your experience.",

        "moments.day":
            "DAY",

        "moments.date":
            "DATE",

        "moments.night":
            "NIGHT",

        "moments.special":
            "SPECIAL",

        "moments.card1Title":
            "Light routine",

        "moments.card1Text":
            "Start your day with a fresh, delicate and comfortable feeling.",

        "moments.card2Title":
            "Romantic moment",

        "moments.card2Text":
            "A delicate atmosphere for dates and special occasions.",

        "moments.card3Title":
            "Dream night",

        "moments.card3Text":
            "For moments when you want a soft, enveloping and elegant presence.",

        "moments.card4Title":
            "Your moment",

        "moments.card4Text":
            "Some moments do not need an occasion. They only need to be yours.",

        "moments.tagLight":
            "light",

        "moments.tagRomantic":
            "romantic",

        "moments.tagNight":
            "night",

        "moments.tagSpecial":
            "special",


        "scene.title1":
            "Choose your",

        "scene.title2":
            "atmosphere.",

        "scene.description":
            "Change the scene and discover different sides of Dream.",

        "scene.romance":
            "Romance",

        "scene.delicate":
            "delicate",

        "scene.sky":
            "Sky",

        "scene.dreamy":
            "dreamy",

        "scene.flowers":
            "Flowers",

        "scene.romantic":
            "romantic",

        "scene.energy":
            "Energy",

        "scene.intense":
            "intense",


        "quote.start":
            "Made to leave",

        "quote.end":
            "love in the air.",


        "gallery.eyebrow":
            "DREAM GALLERY",

        "gallery.title1":
            "Enter the",

        "gallery.title2":
            "Dream universe.",

        "gallery.description":
            "Drag with your mouse, swipe on mobile or use the arrows.",

        "gallery.item1":
            "Dream World",

        "gallery.item2":
            "Love in the Air",

        "gallery.item3":
            "Romance Dream",

        "gallery.explore":
            "explore ↗",

        "gallery.autoplay":
            "▶ Autoplay",

        "gallery.pause":
            "❚❚ Pause",


        "mood.eyebrow":
            "CHOOSE YOUR MOOD",

        "mood.title1":
            "What's your",

        "mood.title2":
            "Dream today?",

        "mood.description":
            "Each mood changes the visual identity of the experience.",

        "mood.romantic":
            "Romantic",

        "mood.dreamy":
            "Dreamy",

        "mood.night":
            "Night",

        "mood.energy":
            "Energy",

        "mood.calm":
            "Calm",

        "mood.delicate":
            "delicate",

        "mood.light":
            "light",

        "mood.mysterious":
            "mysterious",

        "mood.intense":
            "intense",

        "mood.comfortable":
            "comfortable",


        "quiz.title":
            "What's your Dream?",

        "quiz.description":
            "Answer four questions and discover which atmosphere matches you best.",

        "quiz.start":
            "Start quiz",

        "quiz.questionLabel":
            "DREAM QUESTION",

        "quiz.resultLabel":
            "YOUR RESULT",

        "quiz.restart":
            "Restart quiz",

        "quiz.applyMood":
            "Apply my mood",

        "quiz.share":
            "Share",


        "final.eyebrow":
            "DREAM • LOVE IN THE AIR",

        "final.title1":
            "Leave your moment",

        "final.title2":
            "in the air.",

        "final.description":
            "Explore the notes, find your mood and create your own Dream experience.",

        "final.product":
            "View product",

        "final.share":
            "Share",

        "final.fullscreen":
            "⛶ Fullscreen",

        "final.exitFullscreen":
            "⤢ Exit fullscreen",


        "modal.productEyebrow":
            "DREAM LOVE IN THE AIR",

        "modal.productDescription":
            "A floral, romantic and enveloping fragrance designed for light and special moments.",

        "modal.floral":
            "✿ Floral",

        "modal.romantic":
            "♡ Romantic",

        "modal.comfortable":
            "☁ Comfortable",

        "modal.profile":
            "PROFILE",

        "modal.profileValue":
            "Floral woody",

        "modal.experience":
            "EXPERIENCE",

        "modal.experienceValue":
            "Light and enveloping",

        "modal.noteLabel":
            "DREAM NOTE",


        "lightbox.label":
            "DREAM GALLERY",


        "studio.title":
            "Your experience, your way.",

        "studio.description":
            "Customize visuals, audio and motion.",

        "studio.language":
            "Language",

        "studio.presets":
            "Quick styles",

        "studio.appearance":
            "Appearance",

        "studio.dark":
            "Dark mode",

        "studio.darkDesc":
            "Switch theme",

        "studio.glassDesc":
            "Transparency and blur",

        "studio.clean":
            "Clean mode",

        "studio.cleanDesc":
            "A more minimal experience",

        "studio.performance":
            "Performance mode",

        "studio.performanceDesc":
            "Reduces heavier effects",

        "studio.palettes":
            "Palettes",

        "studio.customColors":
            "Custom colors",

        "studio.primary":
            "Primary",

        "studio.secondary":
            "Secondary",

        "studio.effects":
            "Effects",

        "studio.particles":
            "Particles",

        "studio.particlesDesc":
            "Floating elements",

        "studio.animations":
            "Animations",

        "studio.animationsDesc":
            "Experience transitions",

        "studio.cursorDesc":
            "Glow that follows the mouse",

        "studio.motion":
            "3D motion",

        "studio.motionDesc":
            "Bottle depth effect",

        "studio.haptic":
            "Spray vibration",

        "studio.hapticDesc":
            "Feedback on supported devices",

        "studio.spraySound":
            "Spray sound",

        "studio.spraySoundDesc":
            "Play an effect when spraying",

        "studio.music":
            "Music",

        "studio.backgroundMusic":
            "Background music",

        "studio.backgroundMusicDesc":
            "Play or pause Moonlight",

        "studio.volume":
            "Volume",

        "studio.movement":
            "Motion",

        "studio.speed":
            "Speed",

        "studio.motionIntensity":
            "3D intensity",

        "studio.particleIntensity":
            "Particles",

        "studio.sprayIntensity":
            "Spray",

        "studio.reading":
            "Reading",

        "studio.contrast":
            "Contrast",

        "studio.textSize":
            "Text size",

        "studio.reset":
            "↻ Restore default",


        "footer.subtitle":
            "Love in the Air • 350 ml",

        "footer.developed":
            "DEVELOPED BY",


        "toast.spray":
            "Dream is in the air ♡",

        "toast.favorite":
            "Dream added to favorites ♡",

        "toast.unfavorite":
            "Removed from favorites",

        "toast.linkCopied":
            "Link copied ♡",

        "toast.newMoment":
            "New Dream Moment ✦",

        "toast.moodApplied":
            "Your mood has been applied ♡",

        "toast.musicPlaying":
            "Moonlight is playing ♫",

        "toast.performanceOn":
            "Performance mode enabled ⚡",

        "toast.performanceOff":
            "Performance mode disabled",

        "toast.spraySoundOn":
            "Spray sound enabled ✦",

        "toast.spraySoundOff":
            "Spray sound disabled",

        "toast.reset":
            "Dream Studio restored ♡"

    }

};


let currentLanguage =
    localStorage.getItem(
        "dreamLanguage"
    ) ||
    "pt-BR";


function t(
    key
) {

    return (
        translations[currentLanguage]?.[key] ??
        translations["pt-BR"]?.[key] ??
        key
    );

}


/* =========================================================
   TROCAR IDIOMA
========================================================= */

function setLanguage(
    language,
    save = true
) {

    if (
        !translations[language]
    ) {
        return;
    }

    currentLanguage =
        language;

    document.documentElement.lang =
        language;

    $$("[data-i18n]").forEach(
        element => {

            const key =
                element.dataset.i18n;

            const value =
                t(key);

            if (
                value !== undefined
            ) {

                element.textContent =
                    value;

            }

        }
    );


    $$("[data-lang]").forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.lang ===
                currentLanguage
            );

        }
    );


    updateFavorite();

    updateTimeline();

    updateGalleryUI();

    updateSectionIndicator();

    updateFullscreenButton();

    updateDynamicLanguageContent();


    if (
        save
    ) {

        localStorage.setItem(
            "dreamLanguage",
            currentLanguage
        );

    }

}


$$("[data-lang]").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                setLanguage(
                    button.dataset.lang
                );

            }
        );

    }
);


/* =========================================================
   LOADER
========================================================= */

function hideLoader() {

    if (
        !loader
    ) {
        return;
    }

    loader.classList.add(
        "hide"
    );

    setTimeout(
        () => {

            loader.style.display =
                "none";

        },
        700
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


setTimeout(
    hideLoader,
    5000
);


/* =========================================================
   TOAST
========================================================= */

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
            2200
        );

}


/* =========================================================
   MENU
========================================================= */

function setMenuOpen(
    open
) {

    menu?.classList.toggle(
        "open",
        open
    );

    menuMobile?.setAttribute(
        "aria-expanded",
        String(open)
    );

}


menuMobile?.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        setMenuOpen(
            !menu?.classList.contains(
                "open"
            )
        );

    }
);


$$(".menu a").forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                setMenuOpen(
                    false
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

        setMenuOpen(
            false
        );

    }
);


/* =========================================================
   SCROLL
========================================================= */

function updateScroll() {

    const current =
        window.scrollY;

    const total =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        total > 0
            ? current / total * 100
            : 0;

    if (
        scrollProgress
    ) {

        scrollProgress.style.width =
            `${percentage}%`;

    }

    header?.classList.toggle(
        "scrolled",
        current > 30
    );

    backTop?.classList.toggle(
        "show",
        current > 450
    );

}


window.addEventListener(
    "scroll",
    updateScroll,
    {
        passive: true
    }
);


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


/* =========================================================
   REVEAL
========================================================= */

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
                threshold: 0.12
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


/* =========================================================
   METERS
========================================================= */

const meterElements = [

    ...$$("[data-meter]"),
    ...$$("[data-feeling]")

];


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

                        const element =
                            entry.target;

                        const value =
                            Number(
                                element.dataset.meter ??
                                element.dataset.feeling ??
                                0
                            );

                        element.style.width =
                            `${Math.max(0, Math.min(100, value))}%`;

                        meterObserver.unobserve(
                            element
                        );

                    }
                );

            },
            {
                threshold: 0.2
            }
        );

    meterElements.forEach(
        element => {

            meterObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   CURSOR
========================================================= */

const cursorGlow =
    $("#cursorGlow");

let cursorX =
    window.innerWidth / 2;

let cursorY =
    window.innerHeight / 2;

let glowX =
    cursorX;

let glowY =
    cursorY;

let cursorGlowIntensity =
    1;


document.addEventListener(
    "pointermove",
    event => {

        if (
            event.pointerType ===
            "touch"
        ) {
            return;
        }

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
            .11;

        glowY +=
            (
                cursorY -
                glowY
            ) *
            .11;

        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;

        cursorGlow.style.transform =
            `
            translate(-50%, -50%)
            scale(${cursorGlowIntensity})
            `;

    }

    requestAnimationFrame(
        animateCursorGlow
    );

}


animateCursorGlow();


/* =========================================================
   PARTICLES
========================================================= */

let particleIntensity =
    1;


function generateParticles() {

    const container =
        $("#particles");

    if (
        !container
    ) {
        return;
    }

    container.innerHTML =
        "";

    if (
        particleIntensity <=
        0
    ) {
        return;
    }

    const symbols = [
        "♡",
        "✦",
        "·",
        "✿"
    ];

    const mobile =
        window.innerWidth <
        650;

    const performanceMode =
        body.classList.contains(
            "performance-mode"
        );

    let base =
        mobile
            ? 10
            : 20;

    if (
        performanceMode
    ) {

        base =
            Math.min(
                base,
                6
            );

    }

    const amount =
        Math.max(
            2,
            Math.round(
                base *
                particleIntensity
            )
        );

    for (
        let i = 0;
        i < amount;
        i++
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
                8 +
                Math.random() *
                14
            }px`;

        particle.style.setProperty(
            "--duration",
            `${
                9 +
                Math.random() *
                12
            }s`
        );

        particle.style.setProperty(
            "--delay",
            `${
                -Math.random() *
                15
            }s`
        );

        container.appendChild(
            particle
        );

    }

}


generateParticles();


/* =========================================================
   PRODUCT / 3D
========================================================= */

const heroProduct =
    $("#heroProduct");

const mainBottle =
    $("#mainBottle");

const productHalo =
    $("#productHalo");

const productShine =
    $("#productShine");

const feelingOrbit =
    $(".feeling-orbit");

const feelingCenter =
    $(".feeling-center");

let motion3dEnabled =
    true;

let motion3dIntensity =
    1;


/* =========================================================
   SPRAY
========================================================= */

const sprayArea =
    $("#sprayArea");

const sprayButton =
    $("#sprayButton");

const sprayWave =
    $("#sprayWave");

const sprayGlow =
    $(".spray-glow");

const sprayCounter =
    $("#sprayCounter");

let spraying =
    false;

let sprayIntensity =
    1;

let spraySoundEnabled =
    true;

let hapticEnabled =
    true;


const sprayAudio =
    new Audio(
        "./audio/spray.mp3?v=60"
    );

sprayAudio.preload =
    "auto";

sprayAudio.volume =
    0.48;


function getSprayCount() {

    return Number(
        localStorage.getItem(
            "dreamSprayCount"
        ) ||
        0
    );

}


function updateSprayCounter() {

    if (
        sprayCounter
    ) {

        sprayCounter.textContent =
            String(
                getSprayCount()
            );

    }

}


function incrementSprayCounter() {

    const next =
        getSprayCount() +
        1;

    localStorage.setItem(
        "dreamSprayCount",
        String(next)
    );

    updateSprayCounter();

    sprayCounter?.animate(
        [
            {
                transform:
                    "scale(1)"
            },
            {
                transform:
                    "scale(1.4)"
            },
            {
                transform:
                    "scale(1)"
            }
        ],
        {
            duration:
                320,

            easing:
                "ease-out"
        }
    );

}


function restartSprayEffects() {

    [
        sprayGlow,
        sprayWave
    ].forEach(
        element => {

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
    );

}


function playSpraySound() {

    if (
        !spraySoundEnabled
    ) {
        return;
    }

    try {

        sprayAudio.pause();

        sprayAudio.currentTime =
            0;

        sprayAudio
            .play()
            .catch(
                () => {}
            );

    } catch {
        /* silencioso */
    }

}


function createSprayMist() {

    if (
        !sprayArea
    ) {
        return;
    }

    const mobile =
        window.innerWidth <
        650;

    const performanceMode =
        body.classList.contains(
            "performance-mode"
        );

    let amount =
        mobile
            ? 27
            : 46;

    if (
        performanceMode
    ) {

        amount =
            16;

    }

    amount =
        Math.max(
            10,
            Math.round(
                amount *
                sprayIntensity
            )
        );

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
            "spray-mist";

        mist.style.setProperty(
            "--mist-x",
            `${
                (
                    Math.random() -
                    .5
                ) *
                390 *
                sprayIntensity
            }px`
        );

        mist.style.setProperty(
            "--mist-y",
            `${
                (
                    Math.random() -
                    .76
                ) *
                330 *
                sprayIntensity
            }px`
        );

        mist.style.setProperty(
            "--mist-size",
            `${
                3 +
                Math.random() *
                9
            }px`
        );

        mist.style.setProperty(
            "--mist-blur",
            `${
                Math.random() *
                2.5
            }px`
        );

        mist.style.setProperty(
            "--mist-duration",
            `${
                .7 +
                Math.random() *
                .55
            }s`
        );

        sprayArea.appendChild(
            mist
        );

        setTimeout(
            () => {

                mist.remove();

            },
            1500
        );

    }

}


function createSpraySymbols() {

    if (
        !sprayArea ||
        body.classList.contains(
            "performance-mode"
        )
    ) {
        return;
    }

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
                sprayIntensity
            )
        );

    for (
        let i = 0;
        i < amount;
        i++
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

        symbol.style.fontSize =
            `${
                9 +
                Math.random() *
                10
            }px`;

        symbol.style.setProperty(
            "--symbol-x",
            `${
                (
                    Math.random() -
                    .5
                ) *
                330 *
                sprayIntensity
            }px`
        );

        symbol.style.setProperty(
            "--symbol-y",
            `${
                (
                    -65 -
                    Math.random() *
                    210
                ) *
                sprayIntensity
            }px`
        );

        symbol.style.setProperty(
            "--symbol-rotate",
            `${
                (
                    Math.random() -
                    .5
                ) *
                420
            }deg`
        );

        sprayArea.appendChild(
            symbol
        );

        setTimeout(
            () => {

                symbol.remove();

            },
            1450
        );

    }

}


function createSprayFlash() {

    if (
        !sprayArea
    ) {
        return null;
    }

    const flash =
        document.createElement(
            "span"
        );

    flash.className =
        "spray-flash active";

    sprayArea.appendChild(
        flash
    );

    return flash;

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

    restartSprayEffects();

    playSpraySound();

    if (
        hapticEnabled &&
        navigator.vibrate
    ) {

        navigator.vibrate(
            25
        );

    }

    createSprayMist();

    createSpraySymbols();

    const flash =
        createSprayFlash();

    incrementSprayCounter();

    showToast(
        t(
            "toast.spray"
        )
    );

    setTimeout(
        () => {

            flash?.remove();

            heroProduct?.classList.remove(
                "spraying"
            );

            spraying =
                false;

        },
        820
    );

}


sprayButton?.addEventListener(
    "click",
    sprayDream
);


/* =========================================================
   HERO 3D
========================================================= */

heroProduct?.addEventListener(
    "pointermove",
    event => {

        if (
            !motion3dEnabled ||
            !mainBottle ||
            spraying ||
            event.pointerType ===
            "touch" ||
            body.classList.contains(
                "performance-mode"
            )
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

        const rotateY =
            (
                x -
                .5
            ) *
            13 *
            motion3dIntensity;

        const rotateX =
            (
                .5 -
                y
            ) *
            10 *
            motion3dIntensity;

        mainBottle.style.transform =
            `
            translate3d(
                ${
                    (
                        x -
                        .5
                    ) *
                    12 *
                    motion3dIntensity
                }px,
                ${
                    (
                        y -
                        .5
                    ) *
                    7 *
                    motion3dIntensity
                }px,
                ${
                    25 *
                    motion3dIntensity
                }px
            )
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
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
                            .5
                        ) *
                        -20
                    }px,
                    ${
                        (
                            y -
                            .5
                        ) *
                        -16
                    }px
                )
                `;

        }

        if (
            productShine
        ) {

            productShine.style.left =
                `${33 + x * 34}%`;

        }

    }
);


heroProduct?.addEventListener(
    "pointerleave",
    () => {

        if (
            mainBottle &&
            !spraying
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
            productShine
        ) {

            productShine.style.left =
                "50%";

        }

    }
);


/* =========================================================
   CARDS 3D
========================================================= */

$$(".moment-card").forEach(
    card => {

        card.addEventListener(
            "pointermove",
            event => {

                if (
                    !motion3dEnabled ||
                    event.pointerType ===
                    "touch" ||
                    body.classList.contains(
                        "performance-mode"
                    )
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

                card.style.transform =
                    `
                    perspective(900px)
                    translateY(-5px)
                    rotateX(${
                        (
                            .5 -
                            y
                        ) *
                        5 *
                        motion3dIntensity
                    }deg)
                    rotateY(${
                        (
                            x -
                            .5
                        ) *
                        5 *
                        motion3dIntensity
                    }deg)
                    `;

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


feelingOrbit?.addEventListener(
    "pointermove",
    event => {

        if (
            !motion3dEnabled ||
            !feelingCenter ||
            event.pointerType ===
            "touch"
        ) {
            return;
        }

        const rect =
            feelingOrbit.getBoundingClientRect();

        const x =
            (
                event.clientX -
                rect.left
            ) /
            rect.width -
            .5;

        const y =
            (
                event.clientY -
                rect.top
            ) /
            rect.height -
            .5;

        feelingCenter.style.transform =
            `
            translate3d(
                ${
                    x *
                    10 *
                    motion3dIntensity
                }px,
                ${
                    y *
                    10 *
                    motion3dIntensity
                }px,
                ${
                    20 *
                    motion3dIntensity
                }px
            )
            `;

    }
);


feelingOrbit?.addEventListener(
    "pointerleave",
    () => {

        if (
            feelingCenter
        ) {

            feelingCenter.style.transform =
                "";

        }

    }
);
/* =========================================================
   MODAIS
========================================================= */

const productModal =
    $("#productModal");

const noteModal =
    $("#noteModal");

const lightbox =
    $("#lightbox");


function updateModalBodyState() {

    const open =
        productModal?.classList.contains(
            "open"
        ) ||
        noteModal?.classList.contains(
            "open"
        ) ||
        lightbox?.classList.contains(
            "open"
        );

    body.classList.toggle(
        "modal-open",
        Boolean(open)
    );

}


function openProduct() {

    if (
        !productModal
    ) {
        return;
    }

    productModal.classList.add(
        "open"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeProduct() {

    productModal?.classList.remove(
        "open"
    );

    updateModalBodyState();

}


$$(".open-product").forEach(
    button => {

        button.addEventListener(
            "click",
            openProduct
        );

    }
);


$$(".close-product").forEach(
    button => {

        button.addEventListener(
            "click",
            closeProduct
        );

    }
);


/* =========================================================
   FAVORITO
========================================================= */

let favorite =
    localStorage.getItem(
        "dreamFavorite"
    ) ===
    "true";


const favoriteButtons = [

    $("#favoriteButton"),
    $("#favoriteModal")

].filter(Boolean);


function updateFavorite() {

    favoriteButtons.forEach(
        button => {

            button.textContent =
                favorite
                    ? t(
                        "product.favorited"
                    )
                    : t(
                        "product.favorite"
                    );

            button.classList.toggle(
                "active",
                favorite
            );

        }
    );

}


function toggleFavorite() {

    favorite =
        !favorite;

    localStorage.setItem(
        "dreamFavorite",
        String(favorite)
    );

    updateFavorite();

    showToast(
        favorite
            ? t("toast.favorite")
            : t("toast.unfavorite")
    );

}


favoriteButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            toggleFavorite
        );

    }
);


/* =========================================================
   SHARE
========================================================= */

async function shareDream(
    customText = null
) {

    const text =
        customText ||
        (
            currentLanguage ===
            "en-US"
                ? "Discover Dream Love in the Air ♡"
                : "Conheça Dream Amor no Ar ♡"
        );

    try {

        if (
            navigator.share
        ) {

            await navigator.share({

                title:
                    currentLanguage ===
                    "en-US"
                        ? "Dream Love in the Air"
                        : "Dream Amor no Ar",

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
                `${text} ${location.href}`
            );

            showToast(
                t(
                    "toast.linkCopied"
                )
            );

        }

    } catch (
        error
    ) {

        if (
            error?.name !==
            "AbortError"
        ) {

            console.warn(
                error
            );

        }

    }

}


$("#shareButton")?.addEventListener(
    "click",
    () => {

        shareDream();

    }
);


$("#shareModal")?.addEventListener(
    "click",
    () => {

        shareDream();

    }
);


/* =========================================================
   FULLSCREEN
========================================================= */

const fullscreenButton =
    $("#fullscreenButton");


function updateFullscreenButton() {

    if (
        !fullscreenButton
    ) {
        return;
    }

    fullscreenButton.textContent =
        document.fullscreenElement
            ? t(
                "final.exitFullscreen"
            )
            : t(
                "final.fullscreen"
            );

}


fullscreenButton?.addEventListener(
    "click",
    async () => {

        try {

            if (
                document.fullscreenElement
            ) {

                await document.exitFullscreen();

            } else {

                await document.documentElement.requestFullscreen();

            }

        } catch {
            /* browser sem suporte */
        }

    }
);


document.addEventListener(
    "fullscreenchange",
    updateFullscreenButton
);


/* =========================================================
   NOTE DATA
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
            "🍊",

        pt: [
            "Bergamota",
            "Cítrica, fresca e luminosa."
        ],

        en: [
            "Bergamot",
            "Citrusy, fresh and luminous."
        ]

    },

    laranja: {

        icon:
            "🍊",

        pt: [
            "Laranja",
            "Cítrica, alegre e confortável."
        ],

        en: [
            "Orange",
            "Citrusy, bright and comforting."
        ]

    },

    mandarina: {

        icon:
            "🍊",

        pt: [
            "Mandarina",
            "Frutada e delicadamente adocicada."
        ],

        en: [
            "Mandarin",
            "Fruity and delicately sweet."
        ]

    },

    limao: {

        icon:
            "🍋",

        pt: [
            "Limão",
            "Traz brilho e frescor à abertura."
        ],

        en: [
            "Lemon",
            "Adds brightness and freshness to the opening."
        ]

    },

    cassis: {

        icon:
            "🫐",

        pt: [
            "Cassis",
            "Frutado com leve acidez."
        ],

        en: [
            "Cassis",
            "Fruity with a slightly tart character."
        ]

    },

    maca: {

        icon:
            "🍎",

        pt: [
            "Maçã",
            "Fresca, suculenta e suavemente doce."
        ],

        en: [
            "Apple",
            "Fresh, juicy and softly sweet."
        ]

    },

    rosa: {

        icon:
            "🌹",

        pt: [
            "Rosa",
            "Floral clássico, elegante e romântico."
        ],

        en: [
            "Rose",
            "Classic, elegant and romantic floral."
        ]

    },

    tilia: {

        icon:
            "🌼",

        pt: [
            "Tília",
            "Floral delicado e confortável."
        ],

        en: [
            "Linden",
            "A delicate and comforting floral note."
        ]

    },

    freesia: {

        icon:
            "🌸",

        pt: [
            "Frésia",
            "Floral leve e luminoso."
        ],

        en: [
            "Freesia",
            "Light and luminous floral."
        ]

    },

    lotus: {

        icon:
            "🪷",

        pt: [
            "Flor de Lótus",
            "Suave, limpa e levemente aquática."
        ],

        en: [
            "Lotus Flower",
            "Soft, clean and subtly aquatic."
        ]

    },

    gardenia: {

        icon:
            "🌼",

        pt: [
            "Gardênia",
            "Floral cremoso e sofisticado."
        ],

        en: [
            "Gardenia",
            "Creamy and sophisticated floral."
        ]

    },

    pessego: {

        icon:
            "🍑",

        pt: [
            "Pêssego",
            "Frutado macio e delicadamente doce."
        ],

        en: [
            "Peach",
            "Soft, fruity and delicately sweet."
        ]

    },

    ambar: {

        icon:
            "✨",

        pt: [
            "Âmbar",
            "Quente e envolvente."
        ],

        en: [
            "Amber",
            "Warm and enveloping."
        ]

    },

    sandalo: {

        icon:
            "🪵",

        pt: [
            "Sândalo",
            "Madeira cremosa e confortável."
        ],

        en: [
            "Sandalwood",
            "Creamy and comforting wood."
        ]

    },

    baunilha: {

        icon:
            "🤍",

        pt: [
            "Baunilha",
            "Doce, cremosa e aconchegante."
        ],

        en: [
            "Vanilla",
            "Sweet, creamy and cozy."
        ]

    },

    tonka: {

        icon:
            "✨",

        pt: [
            "Tonka",
            "Quente e suavemente adocicada."
        ],

        en: [
            "Tonka",
            "Warm and softly sweet."
        ]

    },

    musk: {

        icon:
            "☁",

        pt: [
            "Musk",
            "Macio, confortável e envolvente."
        ],

        en: [
            "Musk",
            "Soft, comforting and enveloping."
        ]

    }

};


let currentNoteKey =
    null;


function renderNoteModal() {

    if (
        !currentNoteKey
    ) {
        return;
    }

    const note =
        noteData[currentNoteKey];

    if (
        !note
    ) {
        return;
    }

    const [
        title,
        text
    ] =
        currentLanguage ===
        "en-US"
            ? note.en
            : note.pt;

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
            title;

    }

    if (
        noteModalText
    ) {

        noteModalText.textContent =
            text;

    }

}


function openNoteModal(
    key
) {

    currentNoteKey =
        key;

    renderNoteModal();

    noteModal?.classList.add(
        "open"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeNoteModal() {

    noteModal?.classList.remove(
        "open"
    );

    updateModalBodyState();

}


$$(".note-chip").forEach(
    chip => {

        chip.addEventListener(
            "click",
            () => {

                openNoteModal(
                    chip.dataset.note
                );

            }
        );

    }
);


$$(".close-note").forEach(
    button => {

        button.addEventListener(
            "click",
            closeNoteModal
        );

    }
);


/* =========================================================
   TIMELINE
========================================================= */

const timelineSlider =
    $("#timelineSlider");

const timelineHour =
    $("#timelineHour");

const timelineIcon =
    $("#timelineIcon");

const timelineTitle =
    $("#timelineTitle");

const timelineText =
    $("#timelineText");


function updateTimeline() {

    if (
        !timelineSlider
    ) {
        return;
    }

    const hour =
        Number(
            timelineSlider.value
        );

    let stage;

    if (
        hour <=
        1
    ) {

        stage =
            currentLanguage ===
            "en-US"
                ? [
                    "🍊",
                    "Fresh opening",
                    "Citrus and fruit notes appear first."
                ]
                : [
                    "🍊",
                    "Abertura fresca",
                    "Cítricos e frutas aparecem primeiro."
                ];

    } else if (
        hour <=
        3
    ) {

        stage =
            currentLanguage ===
            "en-US"
                ? [
                    "🌸",
                    "Floral heart",
                    "The floral notes become the center of the fragrance."
                ]
                : [
                    "🌸",
                    "Coração floral",
                    "As flores assumem o centro da fragrância."
                ];

    } else if (
        hour <=
        5
    ) {

        stage =
            currentLanguage ===
            "en-US"
                ? [
                    "♡",
                    "Romantic and comfortable",
                    "The floral character becomes softer and more enveloping."
                ]
                : [
                    "♡",
                    "Romântico e confortável",
                    "O floral fica mais macio e envolvente."
                ];

    } else {

        stage =
            currentLanguage ===
            "en-US"
                ? [
                    "✨",
                    "Comforting drydown",
                    "Woody and sweet notes remain on the skin."
                ]
                : [
                    "✨",
                    "Fundo aconchegante",
                    "Madeiras e notas doces permanecem."
                ];

    }

    if (
        timelineHour
    ) {

        timelineHour.textContent =
            `${hour}h`;

    }

    if (
        timelineIcon
    ) {

        timelineIcon.textContent =
            stage[0];

    }

    if (
        timelineTitle
    ) {

        timelineTitle.textContent =
            stage[1];

    }

    if (
        timelineText
    ) {

        timelineText.textContent =
            stage[2];

    }

}


timelineSlider?.addEventListener(
    "input",
    updateTimeline
);


/* =========================================================
   DREAM MOMENT
========================================================= */

const dreamMomentTitle =
    $("#dreamMomentTitle");

const dreamMomentText =
    $("#dreamMomentText");

const newDreamMoment =
    $("#newDreamMoment");


const dreamMoments = {

    "pt-BR": [

        [
            "Hoje combina com leveza.",
            "Escolha um detalhe simples do seu dia e transforme em uma lembrança especial."
        ],

        [
            "Deixe o amor no ar.",
            "Um pequeno gesto pode mudar completamente a atmosfera de um momento."
        ],

        [
            "Seu Dream pode começar agora.",
            "Coloque sua música favorita, escolha seu mood e aproveite alguns minutos só seus."
        ],

        [
            "Romantize os detalhes.",
            "Nem todo momento especial precisa ser planejado."
        ],

        [
            "Brilhe do seu jeito.",
            "A melhor atmosfera é aquela que combina com quem você é hoje."
        ]

    ],

    "en-US": [

        [
            "Today calls for softness.",
            "Choose one simple detail from your day and turn it into a special memory."
        ],

        [
            "Leave love in the air.",
            "A small gesture can completely change the atmosphere of a moment."
        ],

        [
            "Your Dream can start now.",
            "Play your favorite song, choose your mood and enjoy a few minutes for yourself."
        ],

        [
            "Romanticize the details.",
            "Not every special moment needs to be planned."
        ],

        [
            "Shine your own way.",
            "The best atmosphere is the one that matches who you are today."
        ]

    ]

};


let lastDreamMoment =
    -1;


function generateDreamMoment() {

    const list =
        dreamMoments[currentLanguage];

    let index;

    do {

        index =
            Math.floor(
                Math.random() *
                list.length
            );

    } while (
        list.length > 1 &&
        index === lastDreamMoment
    );

    lastDreamMoment =
        index;

    const moment =
        list[index];

    if (
        dreamMomentTitle
    ) {

        dreamMomentTitle.textContent =
            moment[0];

    }

    if (
        dreamMomentText
    ) {

        dreamMomentText.textContent =
            moment[1];

    }

    showToast(
        t(
            "toast.newMoment"
        )
    );

}


newDreamMoment?.addEventListener(
    "click",
    generateDreamMoment
);


/* =========================================================
   SCENE
========================================================= */

const sceneBackground =
    $(".dream-scene-bg");

const sceneResultIcon =
    $("#sceneResultIcon");

const sceneResultMini =
    $("#sceneResultMini");

const sceneResultTitle =
    $("#sceneResultTitle");

const sceneResultText =
    $("#sceneResultText");


const sceneData = {

    romance: {

        icon:
            "♡",

        pt: [
            "ROMANCE DREAM",
            "Amor está no ar.",
            "Uma atmosfera delicada, rosa e envolvente."
        ],

        en: [
            "ROMANCE DREAM",
            "Love is in the air.",
            "A delicate, pink and enveloping atmosphere."
        ],

        background:
            `
            radial-gradient(circle at 20% 50%, rgba(255,111,169,.46), transparent 38%),
            radial-gradient(circle at 80% 40%, rgba(169,92,221,.30), transparent 42%),
            linear-gradient(135deg,#1c0d18,#35152c)
            `

    },

    ceu: {

        icon:
            "☾",

        pt: [
            "DREAM SKY",
            "Sonhe mais alto.",
            "Uma atmosfera noturna, calma e sonhadora."
        ],

        en: [
            "DREAM SKY",
            "Dream higher.",
            "A calm, dreamy nighttime atmosphere."
        ],

        background:
            `
            radial-gradient(circle at 70% 20%, rgba(112,142,255,.40), transparent 35%),
            radial-gradient(circle at 20% 70%, rgba(131,95,212,.22), transparent 40%),
            linear-gradient(135deg,#080b1f,#1c1f52)
            `

    },

    flores: {

        icon:
            "✿",

        pt: [
            "FLOWER DREAM",
            "Flores no ar.",
            "Uma atmosfera floral, leve e delicada."
        ],

        en: [
            "FLOWER DREAM",
            "Flowers in the air.",
            "A light and delicate floral atmosphere."
        ],

        background:
            `
            radial-gradient(circle at 20% 40%, rgba(255,164,198,.43), transparent 37%),
            radial-gradient(circle at 78% 62%, rgba(255,219,232,.13), transparent 38%),
            linear-gradient(135deg,#28121f,#5a2941)
            `

    },

    energia: {

        icon:
            "✦",

        pt: [
            "ENERGY DREAM",
            "Brilhe do seu jeito.",
            "Uma atmosfera intensa, viva e cheia de personalidade."
        ],

        en: [
            "ENERGY DREAM",
            "Shine your own way.",
            "A vivid, intense atmosphere full of personality."
        ],

        background:
            `
            radial-gradient(circle at 20% 50%, rgba(255,80,158,.45), transparent 38%),
            radial-gradient(circle at 82% 30%, rgba(119,69,255,.42), transparent 39%),
            linear-gradient(135deg,#170b1c,#3b164e)
            `

    }

};


let currentScene =
    localStorage.getItem(
        "dreamScene"
    ) ||
    "romance";


function setScene(
    sceneName,
    save = true
) {

    const scene =
        sceneData[sceneName];

    if (
        !scene
    ) {
        return;
    }

    currentScene =
        sceneName;

    $$(".scene-button").forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.scene ===
                sceneName
            );

        }
    );

    const content =
        currentLanguage ===
        "en-US"
            ? scene.en
            : scene.pt;

    if (
        sceneResultIcon
    ) {

        sceneResultIcon.textContent =
            scene.icon;

    }

    if (
        sceneResultMini
    ) {

        sceneResultMini.textContent =
            content[0];

    }

    if (
        sceneResultTitle
    ) {

        sceneResultTitle.textContent =
            content[1];

    }

    if (
        sceneResultText
    ) {

        sceneResultText.textContent =
            content[2];

    }

    if (
        sceneBackground
    ) {

        sceneBackground.style.background =
            scene.background;

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamScene",
            sceneName
        );

    }

}


$$(".scene-button").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                setScene(
                    button.dataset.scene
                );

            }
        );

    }
);


/* =========================================================
   GALLERY
========================================================= */

const galleryTrack =
    $("#galleryTrack");

const galleryItems =
    $$(".gallery-item");

const galleryPrev =
    $("#galleryPrev");

const galleryNext =
    $("#galleryNext");

const galleryCurrent =
    $("#galleryCurrent");

const galleryTotal =
    $("#galleryTotal");

const galleryDots =
    $("#galleryDots");

const galleryAutoplay =
    $("#galleryAutoplay");

const galleryAutoplayProgress =
    $("#galleryAutoplayProgress");


let galleryIndex =
    0;

let galleryPlaying =
    false;

let galleryTimer =
    null;

const galleryDelay =
    4500;


function createGalleryDots() {

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

            dot.addEventListener(
                "click",
                () => {

                    goToGallery(
                        index
                    );

                    restartGalleryAutoplay();

                }
            );

            galleryDots.appendChild(
                dot
            );

        }
    );

}


function updateGalleryUI() {

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

    if (
        galleryItems.length ===
        0
    ) {
        return;
    }

    galleryIndex =
        (
            galleryIndex +
            galleryItems.length
        ) %
        galleryItems.length;

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

    if (
        galleryAutoplay
    ) {

        galleryAutoplay.textContent =
            galleryPlaying
                ? t(
                    "gallery.pause"
                )
                : t(
                    "gallery.autoplay"
                );

    }

}


function goToGallery(
    index,
    behavior = "smooth"
) {

    if (
        galleryItems.length ===
        0
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
        galleryItems[galleryIndex];

    if (
        galleryTrack &&
        item
    ) {

        const left =
            item.offsetLeft -
            (
                galleryTrack.clientWidth -
                item.clientWidth
            ) /
            2;

        galleryTrack.scrollTo({

            left:
                Math.max(
                    0,
                    left
                ),

            behavior

        });

    }

    updateGalleryUI();

}


galleryPrev?.addEventListener(
    "click",
    () => {

        goToGallery(
            galleryIndex -
            1
        );

        restartGalleryAutoplay();

    }
);


galleryNext?.addEventListener(
    "click",
    () => {

        goToGallery(
            galleryIndex +
            1
        );

        restartGalleryAutoplay();

    }
);


/* DRAG */

let galleryDragging =
    false;

let galleryDragStartX =
    0;

let galleryDragStartScroll =
    0;

let galleryDraggedDistance =
    0;


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

        galleryDraggedDistance =
            0;

        galleryTrack.classList.add(
            "dragging"
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

        const distance =
            event.clientX -
            galleryDragStartX;

        galleryDraggedDistance =
            Math.max(
                galleryDraggedDistance,
                Math.abs(distance)
            );

        galleryTrack.scrollLeft =
            galleryDragStartScroll -
            distance;

    }
);


function finishGalleryDrag() {

    galleryDragging =
        false;

    galleryTrack?.classList.remove(
        "dragging"
    );

    updateGalleryFromScroll();

}


galleryTrack?.addEventListener(
    "pointerup",
    finishGalleryDrag
);


galleryTrack?.addEventListener(
    "pointercancel",
    finishGalleryDrag
);


let galleryScrollTimer;


function updateGalleryFromScroll() {

    if (
        !galleryTrack
    ) {
        return;
    }

    const center =
        galleryTrack.scrollLeft +
        galleryTrack.clientWidth /
        2;

    let nearest =
        0;

    let distance =
        Infinity;

    galleryItems.forEach(
        (
            item,
            index
        ) => {

            const itemCenter =
                item.offsetLeft +
                item.clientWidth /
                2;

            const currentDistance =
                Math.abs(
                    center -
                    itemCenter
                );

            if (
                currentDistance <
                distance
            ) {

                distance =
                    currentDistance;

                nearest =
                    index;

            }

        }
    );

    galleryIndex =
        nearest;

    updateGalleryUI();

}


galleryTrack?.addEventListener(
    "scroll",
    () => {

        clearTimeout(
            galleryScrollTimer
        );

        galleryScrollTimer =
            setTimeout(
                updateGalleryFromScroll,
                90
            );

    },
    {
        passive: true
    }
);


/* AUTOPLAY */

function stopGalleryAutoplay() {

    galleryPlaying =
        false;

    clearTimeout(
        galleryTimer
    );

    if (
        galleryAutoplayProgress
    ) {

        galleryAutoplayProgress.style.transition =
            "none";

        galleryAutoplayProgress.style.width =
            "0%";

    }

    updateGalleryUI();

}


function scheduleGalleryAutoplay() {

    clearTimeout(
        galleryTimer
    );

    if (
        !galleryPlaying
    ) {
        return;
    }

    if (
        galleryAutoplayProgress
    ) {

        galleryAutoplayProgress.style.transition =
            "none";

        galleryAutoplayProgress.style.width =
            "0%";

        void galleryAutoplayProgress.offsetWidth;

        galleryAutoplayProgress.style.transition =
            `width ${galleryDelay}ms linear`;

        galleryAutoplayProgress.style.width =
            "100%";

    }

    galleryTimer =
        setTimeout(
            () => {

                goToGallery(
                    galleryIndex +
                    1
                );

                scheduleGalleryAutoplay();

            },
            galleryDelay
        );

}


function startGalleryAutoplay() {

    if (
        galleryItems.length <
        2
    ) {
        return;
    }

    galleryPlaying =
        true;

    updateGalleryUI();

    scheduleGalleryAutoplay();

}


function restartGalleryAutoplay() {

    if (
        galleryPlaying
    ) {

        scheduleGalleryAutoplay();

    }

}


galleryAutoplay?.addEventListener(
    "click",
    () => {

        if (
            galleryPlaying
        ) {

            stopGalleryAutoplay();

        } else {

            startGalleryAutoplay();

        }

    }
);


/* =========================================================
   LIGHTBOX
========================================================= */

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

    const item =
        galleryItems[
            lightboxIndex
        ];

    if (
        !item
    ) {
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

    if (
        lightboxTitle
    ) {

        lightboxTitle.textContent =
            title?.textContent ||
            "Dream";

    }

    if (
        lightboxCounter
    ) {

        lightboxCounter.textContent =
            `${
                String(
                    lightboxIndex +
                    1
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

    lightboxIndex =
        index;

    updateLightbox();

    stopGalleryAutoplay();

    lightbox?.classList.add(
        "open"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeLightbox() {

    lightbox?.classList.remove(
        "open"
    );

    updateModalBodyState();

}


galleryItems.forEach(
    (
        item,
        index
    ) => {

        item.addEventListener(
            "click",
            () => {

                if (
                    galleryDraggedDistance <=
                    12
                ) {

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
    closeLightbox
);


lightboxBackdrop?.addEventListener(
    "click",
    closeLightbox
);


lightboxPrev?.addEventListener(
    "click",
    () => {

        lightboxIndex =
            (
                lightboxIndex -
                1 +
                galleryItems.length
            ) %
            galleryItems.length;

        updateLightbox();

    }
);


lightboxNext?.addEventListener(
    "click",
    () => {

        lightboxIndex =
            (
                lightboxIndex +
                1
            ) %
            galleryItems.length;

        updateLightbox();

    }
);


/* =========================================================
   COLORS / MOODS
========================================================= */

function hexToRgb(
    hex
) {

    const clean =
        String(hex)
            .replace(
                "#",
                ""
            )
            .trim();

    const value =
        Number.parseInt(
            clean,
            16
        );

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


function setThemeColors(
    primary,
    secondary,
    save = true
) {

    const a =
        hexToRgb(
            primary
        );

    const b =
        hexToRgb(
            secondary
        );

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
        `${a.r}, ${a.g}, ${a.b}`
    );

    root.style.setProperty(
        "--secondary-rgb",
        `${b.r}, ${b.g}, ${b.b}`
    );

    if (
        save
    ) {

        localStorage.setItem(
            "dreamPrimary",
            primary
        );

        localStorage.setItem(
            "dreamSecondary",
            secondary
        );

    }

}


const moodData = {

    romantico: [
        "#df76a8",
        "#9562dc"
    ],

    sonhador: [
        "#b678d6",
        "#7588e8"
    ],

    noturno: [
        "#7259c7",
        "#354a8d"
    ],

    energia: [
        "#ee6494",
        "#9853db"
    ],

    calmo: [
        "#7bbdb6",
        "#8798cf"
    ]

};


function setMood(
    mood,
    save = true
) {

    const data =
        moodData[mood];

    if (
        !data
    ) {
        return;
    }

    $$(".mood-button").forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.mood ===
                mood
            );

        }
    );

    setThemeColors(
        data[0],
        data[1],
        save
    );

    if (
        save
    ) {

        localStorage.setItem(
            "dreamMood",
            mood
        );

    }

}


$$(".mood-button").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                setMood(
                    button.dataset.mood
                );

            }
        );

    }
);


/* =========================================================
   QUIZ
========================================================= */

const quizStart =
    $("#quizStart");

const quizQuestions =
    $("#quizQuestions");

const quizResult =
    $("#quizResult");

const startQuiz =
    $("#startQuiz");

const restartQuiz =
    $("#restartQuiz");

const shareQuizResult =
    $("#shareQuizResult");

const applyQuizMood =
    $("#applyQuizMood");

const quizStep =
    $("#quizStep");

const quizProgressBar =
    $("#quizProgressBar");

const quizQuestion =
    $("#quizQuestion");

const quizOptions =
    $("#quizOptions");

const quizResultIcon =
    $("#quizResultIcon");

const quizResultTitle =
    $("#quizResultTitle");

const quizResultText =
    $("#quizResultText");


const quizData = {

    "pt-BR": [

        {
            q:
                "Qual atmosfera combina mais com você?",

            a: [
                ["♡ Romântica", "lover"],
                ["☾ Sonhadora", "dreamer"],
                ["✦ Marcante", "night"],
                ["☁ Tranquila", "soft"]
            ]
        },

        {
            q:
                "Qual momento você prefere?",

            a: [
                ["Encontro especial", "lover"],
                ["Fim de tarde", "dreamer"],
                ["Noite inesquecível", "night"],
                ["Momento só meu", "soft"]
            ]
        },

        {
            q:
                "O que uma fragrância deve transmitir?",

            a: [
                ["Delicadeza", "lover"],
                ["Imaginação", "dreamer"],
                ["Personalidade", "night"],
                ["Conforto", "soft"]
            ]
        },

        {
            q:
                "Escolha um símbolo Dream.",

            a: [
                ["♡ Coração", "lover"],
                ["☾ Lua", "dreamer"],
                ["✦ Estrela", "night"],
                ["☁ Nuvem", "soft"]
            ]
        }

    ],

    "en-US": [

        {
            q:
                "Which atmosphere matches you best?",

            a: [
                ["♡ Romantic", "lover"],
                ["☾ Dreamy", "dreamer"],
                ["✦ Striking", "night"],
                ["☁ Peaceful", "soft"]
            ]
        },

        {
            q:
                "Which moment do you prefer?",

            a: [
                ["Special date", "lover"],
                ["Late afternoon", "dreamer"],
                ["Unforgettable night", "night"],
                ["Time for myself", "soft"]
            ]
        },

        {
            q:
                "What should a fragrance express?",

            a: [
                ["Delicacy", "lover"],
                ["Imagination", "dreamer"],
                ["Personality", "night"],
                ["Comfort", "soft"]
            ]
        },

        {
            q:
                "Choose a Dream symbol.",

            a: [
                ["♡ Heart", "lover"],
                ["☾ Moon", "dreamer"],
                ["✦ Star", "night"],
                ["☁ Cloud", "soft"]
            ]
        }

    ]

};


const quizResults = {

    lover: {

        icon:
            "♡",

        mood:
            "romantico",

        pt: [
            "Dream Lover",
            "Seu Dream é romântico, delicado e envolvente."
        ],

        en: [
            "Dream Lover",
            "Your Dream is romantic, delicate and enveloping."
        ]

    },

    dreamer: {

        icon:
            "☾",

        mood:
            "sonhador",

        pt: [
            "Dreamer",
            "Seu Dream é leve, criativo e sonhador."
        ],

        en: [
            "Dreamer",
            "Your Dream is light, creative and dreamy."
        ]

    },

    night: {

        icon:
            "✦",

        mood:
            "noturno",

        pt: [
            "Night Dream",
            "Seu Dream tem presença e personalidade."
        ],

        en: [
            "Night Dream",
            "Your Dream has presence and personality."
        ]

    },

    soft: {

        icon:
            "☁",

        mood:
            "calmo",

        pt: [
            "Soft Dream",
            "Seu Dream é confortável, leve e tranquilo."
        ],

        en: [
            "Soft Dream",
            "Your Dream is comfortable, light and peaceful."
        ]

    }

};


let quizIndex =
    0;

let quizScores = {

    lover: 0,
    dreamer: 0,
    night: 0,
    soft: 0

};

let lastQuizWinner =
    null;


function renderQuizQuestion() {

    const data =
        quizData[currentLanguage];

    const current =
        data[quizIndex];

    if (
        !current
    ) {

        finishQuiz();

        return;

    }

    if (
        quizStep
    ) {

        quizStep.textContent =
            `${quizIndex + 1} / ${data.length}`;

    }

    if (
        quizProgressBar
    ) {

        quizProgressBar.style.width =
            `${
                (
                    (
                        quizIndex +
                        1
                    ) /
                    data.length
                ) *
                100
            }%`;

    }

    if (
        quizQuestion
    ) {

        quizQuestion.textContent =
            current.q;

    }

    if (
        !quizOptions
    ) {
        return;
    }

    quizOptions.innerHTML =
        "";

    current.a.forEach(
        (
            [
                text,
                type
            ]
        ) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.textContent =
                text;

            button.addEventListener(
                "click",
                () => {

                    quizScores[type]++;

                    quizIndex++;

                    renderQuizQuestion();

                }
            );

            quizOptions.appendChild(
                button
            );

        }
    );

}


function renderQuizResult() {

    if (
        !lastQuizWinner
    ) {
        return;
    }

    const result =
        quizResults[lastQuizWinner];

    const content =
        currentLanguage ===
        "en-US"
            ? result.en
            : result.pt;

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
            content[0];

    }

    if (
        quizResultText
    ) {

        quizResultText.textContent =
            content[1];

    }

}


function finishQuiz() {

    lastQuizWinner =
        Object.entries(
            quizScores
        )
            .sort(
                (
                    a,
                    b
                ) =>
                    b[1] -
                    a[1]
            )[0]?.[0] ||
        "lover";

    quizQuestions.hidden =
        true;

    quizResult.hidden =
        false;

    renderQuizResult();

}


function beginQuiz() {

    quizIndex =
        0;

    quizScores = {

        lover: 0,
        dreamer: 0,
        night: 0,
        soft: 0

    };

    lastQuizWinner =
        null;

    quizStart.hidden =
        true;

    quizResult.hidden =
        true;

    quizQuestions.hidden =
        false;

    renderQuizQuestion();

}


startQuiz?.addEventListener(
    "click",
    beginQuiz
);


restartQuiz?.addEventListener(
    "click",
    beginQuiz
);


applyQuizMood?.addEventListener(
    "click",
    () => {

        if (
            !lastQuizWinner
        ) {
            return;
        }

        setMood(
            quizResults[lastQuizWinner]
                .mood
        );

        showToast(
            t(
                "toast.moodApplied"
            )
        );

    }
);


shareQuizResult?.addEventListener(
    "click",
    () => {

        if (
            !lastQuizWinner
        ) {
            return;
        }

        const result =
            quizResults[lastQuizWinner];

        const title =
            (
                currentLanguage ===
                "en-US"
                    ? result.en
                    : result.pt
            )[0];

        shareDream(
            currentLanguage ===
            "en-US"
                ? `My Dream Quiz result is ${title} ✦`
                : `Meu resultado no Dream Quiz foi ${title} ✦`
        );

    }
);
/* =========================================================
   MUSIC
========================================================= */

const dreamMusic =
    $("#dreamMusic");

const dreamMusicPlayer =
    $("#dreamMusicPlayer");

const dreamMusicButton =
    $("#dreamMusicButton");

const musicMuteButton =
    $("#musicMuteButton");

const musicProgress =
    $("#musicProgress");

const musicCurrentTime =
    $("#musicCurrentTime");

const musicDuration =
    $("#musicDuration");

const musicToggle =
    $("#musicToggle");

const musicVolumeRange =
    $("#musicVolumeRange");

const musicVolumeValue =
    $("#musicVolumeValue");

let dreamMusicPlaying =
    false;

let previousMusicVolume =
    .35;


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

    const remaining =
        Math.floor(
            seconds %
            60
        );

    return `${minutes}:${String(remaining).padStart(2,"0")}`;

}


function updateMusicUI() {

    dreamMusicPlayer?.classList.toggle(
        "playing",
        dreamMusicPlaying
    );

    if (
        dreamMusicButton
    ) {

        dreamMusicButton.textContent =
            dreamMusicPlaying
                ? "❚❚"
                : "▶";

    }

    if (
        musicToggle
    ) {

        musicToggle.checked =
            dreamMusicPlaying;

    }

    if (
        musicMuteButton &&
        dreamMusic
    ) {

        musicMuteButton.textContent =
            dreamMusic.muted ||
            dreamMusic.volume ===
            0
                ? "🔇"
                : "🔊";

    }

}


async function playDreamMusic() {

    if (
        !dreamMusic
    ) {
        return;
    }

    try {

        await dreamMusic.play();

        dreamMusicPlaying =
            true;

        localStorage.setItem(
            "dreamMusicEnabled",
            "true"
        );

        updateMusicUI();

        showToast(
            t(
                "toast.musicPlaying"
            )
        );

    } catch {
        /* autoplay bloqueado */
    }

}


function pauseDreamMusic(
    save = true
) {

    dreamMusic?.pause();

    dreamMusicPlaying =
        false;

    if (
        save
    ) {

        localStorage.setItem(
            "dreamMusicEnabled",
            "false"
        );

    }

    updateMusicUI();

}


function toggleDreamMusic() {

    dreamMusicPlaying
        ? pauseDreamMusic()
        : playDreamMusic();

}


dreamMusicButton?.addEventListener(
    "click",
    toggleDreamMusic
);


musicToggle?.addEventListener(
    "change",
    () => {

        musicToggle.checked
            ? playDreamMusic()
            : pauseDreamMusic();

    }
);


function updateMusicProgress() {

    if (
        !dreamMusic
    ) {
        return;
    }

    const current =
        dreamMusic.currentTime ||
        0;

    const duration =
        dreamMusic.duration ||
        0;

    if (
        musicCurrentTime
    ) {

        musicCurrentTime.textContent =
            formatMusicTime(
                current
            );

    }

    if (
        musicDuration
    ) {

        musicDuration.textContent =
            formatMusicTime(
                duration
            );

    }

    if (
        musicProgress &&
        duration >
        0
    ) {

        musicProgress.value =
            String(
                current /
                duration *
                100
            );

    }

}


dreamMusic?.addEventListener(
    "timeupdate",
    updateMusicProgress
);


dreamMusic?.addEventListener(
    "loadedmetadata",
    updateMusicProgress
);


musicProgress?.addEventListener(
    "input",
    () => {

        if (
            !dreamMusic ||
            !Number.isFinite(
                dreamMusic.duration
            )
        ) {
            return;
        }

        dreamMusic.currentTime =
            Number(
                musicProgress.value
            ) /
            100 *
            dreamMusic.duration;

    }
);


function setDreamMusicVolume(
    value,
    save = true
) {

    const safe =
        Math.max(
            0,
            Math.min(
                100,
                Number(value) ||
                0
            )
        );

    if (
        dreamMusic
    ) {

        dreamMusic.volume =
            safe /
            100;

        if (
            safe >
            0
        ) {

            previousMusicVolume =
                dreamMusic.volume;

            dreamMusic.muted =
                false;

        }

    }

    if (
        musicVolumeRange
    ) {

        musicVolumeRange.value =
            safe;

    }

    if (
        musicVolumeValue
    ) {

        musicVolumeValue.textContent =
            `${safe}%`;

    }

    updateMusicUI();

    if (
        save
    ) {

        localStorage.setItem(
            "dreamMusicVolume",
            String(safe)
        );

    }

}


musicVolumeRange?.addEventListener(
    "input",
    () => {

        setDreamMusicVolume(
            musicVolumeRange.value
        );

    }
);


musicMuteButton?.addEventListener(
    "click",
    () => {

        if (
            !dreamMusic
        ) {
            return;
        }

        if (
            dreamMusic.muted ||
            dreamMusic.volume ===
            0
        ) {

            dreamMusic.muted =
                false;

            if (
                dreamMusic.volume ===
                0
            ) {

                setDreamMusicVolume(
                    Math.max(
                        5,
                        Math.round(
                            previousMusicVolume *
                            100
                        )
                    )
                );

            }

        } else {

            previousMusicVolume =
                dreamMusic.volume;

            dreamMusic.muted =
                true;

        }

        updateMusicUI();

    }
);


dreamMusic?.addEventListener(
    "play",
    () => {

        dreamMusicPlaying =
            true;

        updateMusicUI();

    }
);


dreamMusic?.addEventListener(
    "pause",
    () => {

        dreamMusicPlaying =
            false;

        updateMusicUI();

    }
);


/* =========================================================
   DREAM STUDIO
========================================================= */

const settingsPanel =
    $("#settingsPanel");

const settingsButton =
    $("#settingsButton");

const closeSettings =
    $("#closeSettings");

const themeButton =
    $("#themeButton");

const darkToggle =
    $("#darkToggle");

const glassToggle =
    $("#glassToggle");

const cleanModeToggle =
    $("#cleanModeToggle");

const performanceToggle =
    $("#performanceToggle");

const particlesToggle =
    $("#particlesToggle");

const animationsToggle =
    $("#animationsToggle");

const cursorToggle =
    $("#cursorToggle");

const motion3dToggle =
    $("#motion3dToggle");

const hapticToggle =
    $("#hapticToggle");

const spraySoundToggle =
    $("#spraySoundToggle");

const primaryColor =
    $("#primaryColor");

const secondaryColor =
    $("#secondaryColor");

const animationSpeed =
    $("#animationSpeed");

const animationSpeedValue =
    $("#animationSpeedValue");

const motion3dRange =
    $("#motion3dRange");

const motion3dValue =
    $("#motion3dValue");

const cursorGlowRange =
    $("#cursorGlowRange");

const cursorGlowValue =
    $("#cursorGlowValue");

const particleIntensityRange =
    $("#particleIntensityRange");

const particleIntensityValue =
    $("#particleIntensityValue");

const sprayIntensityRange =
    $("#sprayIntensityRange");

const sprayIntensityValue =
    $("#sprayIntensityValue");

const contrastControl =
    $("#contrastControl");

const contrastValue =
    $("#contrastValue");

const resetSettings =
    $("#resetSettings");


function setSettingsOpen(
    open
) {

    settingsPanel?.classList.toggle(
        "open",
        open
    );

}


settingsButton?.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        setSettingsOpen(
            !settingsPanel?.classList.contains(
                "open"
            )
        );

    }
);


closeSettings?.addEventListener(
    "click",
    () => {

        setSettingsOpen(
            false
        );

    }
);


/* =========================================================
   PALETTES
========================================================= */

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


function setPalette(
    name,
    save = true
) {

    const data =
        palettes[name];

    if (
        !data
    ) {
        return;
    }

    setThemeColors(
        data[0],
        data[1],
        save
    );

    if (
        primaryColor
    ) {

        primaryColor.value =
            data[0];

    }

    if (
        secondaryColor
    ) {

        secondaryColor.value =
            data[1];

    }

    $$(".palette").forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.palette ===
                name
            );

        }
    );

    if (
        save
    ) {

        localStorage.setItem(
            "dreamPalette",
            name
        );

    }

}


$$(".palette").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                setPalette(
                    button.dataset.palette
                );

            }
        );

    }
);


primaryColor?.addEventListener(
    "input",
    () => {

        setThemeColors(
            primaryColor.value,
            secondaryColor.value
        );

    }
);


secondaryColor?.addEventListener(
    "input",
    () => {

        setThemeColors(
            primaryColor.value,
            secondaryColor.value
        );

    }
);


/* =========================================================
   MODES
========================================================= */

function setDarkMode(
    enabled,
    save = true
) {

    body.classList.toggle(
        "dark",
        enabled
    );

    if (
        darkToggle
    ) {

        darkToggle.checked =
            enabled;

    }

    if (
        themeButton
    ) {

        themeButton.textContent =
            enabled
                ? "☀"
                : "☾";

    }

    if (
        save
    ) {

        localStorage.setItem(
            "dreamDark",
            String(enabled)
        );

    }

}


themeButton?.addEventListener(
    "click",
    () => {

        setDarkMode(
            !body.classList.contains(
                "dark"
            )
        );

    }
);


darkToggle?.addEventListener(
    "change",
    () => {

        setDarkMode(
            darkToggle.checked
        );

    }
);


function bindBooleanToggle(
    element,
    className,
    key,
    invert = false
) {

    element?.addEventListener(
        "change",
        () => {

            const enabled =
                element.checked;

            body.classList.toggle(
                className,
                invert
                    ? !enabled
                    : enabled
            );

            localStorage.setItem(
                key,
                String(enabled)
            );

        }
    );

}


bindBooleanToggle(
    glassToggle,
    "no-glass",
    "dreamGlass",
    true
);

bindBooleanToggle(
    cleanModeToggle,
    "clean-mode",
    "dreamClean"
);

bindBooleanToggle(
    particlesToggle,
    "no-particles",
    "dreamParticles",
    true
);

bindBooleanToggle(
    animationsToggle,
    "no-animations",
    "dreamAnimations",
    true
);

bindBooleanToggle(
    cursorToggle,
    "no-cursor",
    "dreamCursor",
    true
);


performanceToggle?.addEventListener(
    "change",
    () => {

        body.classList.toggle(
            "performance-mode",
            performanceToggle.checked
        );

        localStorage.setItem(
            "dreamPerformance",
            String(
                performanceToggle.checked
            )
        );

        generateParticles();

        showToast(
            performanceToggle.checked
                ? t(
                    "toast.performanceOn"
                )
                : t(
                    "toast.performanceOff"
                )
        );

    }
);


motion3dToggle?.addEventListener(
    "change",
    () => {

        motion3dEnabled =
            motion3dToggle.checked;

        localStorage.setItem(
            "dreamMotion3d",
            String(
                motion3dEnabled
            )
        );

    }
);


hapticToggle?.addEventListener(
    "change",
    () => {

        hapticEnabled =
            hapticToggle.checked;

        localStorage.setItem(
            "dreamHaptic",
            String(
                hapticEnabled
            )
        );

    }
);


spraySoundToggle?.addEventListener(
    "change",
    () => {

        spraySoundEnabled =
            spraySoundToggle.checked;

        localStorage.setItem(
            "dreamSpraySound",
            String(
                spraySoundEnabled
            )
        );

        showToast(
            spraySoundEnabled
                ? t(
                    "toast.spraySoundOn"
                )
                : t(
                    "toast.spraySoundOff"
                )
        );

    }
);


/* =========================================================
   RANGES
========================================================= */

function bindRange(
    input,
    label,
    key,
    callback
) {

    input?.addEventListener(
        "input",
        () => {

            const value =
                Number(
                    input.value
                );

            if (
                label
            ) {

                label.textContent =
                    `${value}%`;

            }

            callback(
                value
            );

            localStorage.setItem(
                key,
                String(value)
            );

        }
    );

}


bindRange(
    animationSpeed,
    animationSpeedValue,
    "dreamAnimationSpeed",
    value => {

        root.style.setProperty(
            "--animation-speed",
            100 /
            value
        );

    }
);


bindRange(
    motion3dRange,
    motion3dValue,
    "dreamMotion3dIntensity",
    value => {

        motion3dIntensity =
            value /
            100;

    }
);


bindRange(
    cursorGlowRange,
    cursorGlowValue,
    "dreamCursorGlowIntensity",
    value => {

        cursorGlowIntensity =
            value /
            100;

    }
);


bindRange(
    particleIntensityRange,
    particleIntensityValue,
    "dreamParticleIntensity",
    value => {

        particleIntensity =
            value /
            100;

        generateParticles();

    }
);


bindRange(
    sprayIntensityRange,
    sprayIntensityValue,
    "dreamSprayIntensity",
    value => {

        sprayIntensity =
            value /
            100;

    }
);


bindRange(
    contrastControl,
    contrastValue,
    "dreamContrast",
    value => {

        root.style.filter =
            value ===
            100
                ? ""
                : `contrast(${value / 100})`;

    }
);


/* =========================================================
   FONT SIZE
========================================================= */

function setFontSize(
    size
) {

    body.classList.remove(
        "font-small",
        "font-normal",
        "font-large"
    );

    body.classList.add(
        `font-${size}`
    );

    $$("[data-font-size]").forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.fontSize ===
                size
            );

        }
    );

    localStorage.setItem(
        "dreamFontSize",
        size
    );

}


$$("[data-font-size]").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                setFontSize(
                    button.dataset.fontSize
                );

            }
        );

    }
);


/* =========================================================
   PRESETS
========================================================= */

$$(".preset-button").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const preset =
                    button.dataset.preset;

                $$(".preset-button").forEach(
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

                    setPalette(
                        "dream"
                    );

                    setDarkMode(
                        false
                    );

                    performanceToggle.checked =
                        false;

                    body.classList.remove(
                        "performance-mode"
                    );

                }

                if (
                    preset ===
                    "cinematic"
                ) {

                    setPalette(
                        "cherry"
                    );

                    setDarkMode(
                        true
                    );

                    motion3dEnabled =
                        true;

                }

                if (
                    preset ===
                    "soft"
                ) {

                    setPalette(
                        "menta"
                    );

                    setDarkMode(
                        false
                    );

                    particleIntensity =
                        .55;

                    generateParticles();

                }

                if (
                    preset ===
                    "performance"
                ) {

                    performanceToggle.checked =
                        true;

                    body.classList.add(
                        "performance-mode"
                    );

                    motion3dEnabled =
                        false;

                    particleIntensity =
                        .3;

                    generateParticles();

                }

            }
        );

    }
);


/* =========================================================
   RESET
========================================================= */

resetSettings?.addEventListener(
    "click",
    () => {

        const language =
            currentLanguage;

        Object.keys(
            localStorage
        ).forEach(
            key => {

                if (
                    key.startsWith(
                        "dream"
                    ) &&
                    key !==
                    "dreamLanguage" &&
                    key !==
                    "dreamSprayCount"
                ) {

                    localStorage.removeItem(
                        key
                    );

                }

            }
        );

        setThemeColors(
            "#df76a8",
            "#9562dc",
            false
        );

        setDarkMode(
            false,
            false
        );

        body.className =
            "font-normal";

        particleIntensity =
            1;

        sprayIntensity =
            1;

        motion3dIntensity =
            1;

        cursorGlowIntensity =
            1;

        motion3dEnabled =
            true;

        hapticEnabled =
            true;

        spraySoundEnabled =
            true;

        generateParticles();

        setLanguage(
            language,
            false
        );

        showToast(
            t(
                "toast.reset"
            )
        );

    }
);


/* =========================================================
   SECTION INDICATOR
========================================================= */

const trackedSections =
    $$(".section-track[id]");


function updateSectionIndicator() {

    if (
        !sectionIndicator ||
        trackedSections.length ===
        0
    ) {
        return;
    }

    const position =
        window.scrollY +
        window.innerHeight *
        .4;

    let current =
        trackedSections[0];

    trackedSections.forEach(
        section => {

            if (
                section.offsetTop <=
                position
            ) {

                current =
                    section;

            }

        }
    );

    const index =
        trackedSections.indexOf(
            current
        );

    const key =
        current.dataset
            .sectionI18n;

    const name =
        key
            ? t(key)
            : current.dataset.sectionName;

    sectionIndicator.innerHTML =
        `
        <span>
            ${
                String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                )
            }
        </span>
        ${name}
        `;

}


/* =========================================================
   DYNAMIC LANGUAGE CONTENT
========================================================= */

function updateDynamicLanguageContent() {

    renderNoteModal();

    setScene(
        currentScene,
        false
    );

    if (
        quizQuestions &&
        !quizQuestions.hidden
    ) {

        renderQuizQuestion();

    }

    if (
        quizResult &&
        !quizResult.hidden
    ) {

        renderQuizResult();

    }

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

$$('a[href^="#"]').forEach(
    anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const href =
                    anchor.getAttribute(
                        "href"
                    );

                if (
                    !href ||
                    href ===
                    "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        href
                    );

                if (
                    !target
                ) {
                    return;
                }

                event.preventDefault();

                const offset =
                    (
                        header?.offsetHeight ||
                        0
                    ) +
                    12;

                window.scrollTo({

                    top:
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        offset,

                    behavior:
                        body.classList.contains(
                            "no-animations"
                        )
                            ? "auto"
                            : "smooth"

                });

            }
        );

    }
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const typing =
            event.target instanceof
            HTMLElement &&
            event.target.matches(
                "input, textarea, select, [contenteditable='true']"
            );

        if (
            typing
        ) {
            return;
        }

        const key =
            event.key.toLowerCase();

        if (
            event.key ===
            "Escape"
        ) {

            closeProduct();

            closeNoteModal();

            closeLightbox();

            setMenuOpen(
                false
            );

            setSettingsOpen(
                false
            );

        }

        if (
            key ===
            "s"
        ) {

            sprayDream();

        }

        if (
            key ===
            "m"
        ) {

            toggleDreamMusic();

        }

        if (
            key ===
            "d"
        ) {

            setDarkMode(
                !body.classList.contains(
                    "dark"
                )
            );

        }

        if (
            key ===
            "g"
        ) {

            setSettingsOpen(
                !settingsPanel?.classList.contains(
                    "open"
                )
            );

        }

    }
);


/* =========================================================
   LOAD SAVED SETTINGS
========================================================= */

function readBool(
    key,
    fallback
) {

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

    return value ===
        "true";

}


function loadSettings() {

    const savedPalette =
        localStorage.getItem(
            "dreamPalette"
        );

    if (
        savedPalette &&
        palettes[savedPalette]
    ) {

        setPalette(
            savedPalette,
            false
        );

    } else {

        setThemeColors(
            localStorage.getItem(
                "dreamPrimary"
            ) ||
            "#df76a8",

            localStorage.getItem(
                "dreamSecondary"
            ) ||
            "#9562dc",

            false
        );

    }


    setDarkMode(
        readBool(
            "dreamDark",
            false
        ),
        false
    );


    const glass =
        readBool(
            "dreamGlass",
            true
        );

    glassToggle.checked =
        glass;

    body.classList.toggle(
        "no-glass",
        !glass
    );


    const clean =
        readBool(
            "dreamClean",
            false
        );

    cleanModeToggle.checked =
        clean;

    body.classList.toggle(
        "clean-mode",
        clean
    );


    const performance =
        readBool(
            "dreamPerformance",
            false
        );

    performanceToggle.checked =
        performance;

    body.classList.toggle(
        "performance-mode",
        performance
    );


    const particles =
        readBool(
            "dreamParticles",
            true
        );

    particlesToggle.checked =
        particles;

    body.classList.toggle(
        "no-particles",
        !particles
    );


    const animations =
        readBool(
            "dreamAnimations",
            true
        );

    animationsToggle.checked =
        animations;

    body.classList.toggle(
        "no-animations",
        !animations
    );


    const cursor =
        readBool(
            "dreamCursor",
            true
        );

    cursorToggle.checked =
        cursor;

    body.classList.toggle(
        "no-cursor",
        !cursor
    );


    motion3dEnabled =
        readBool(
            "dreamMotion3d",
            true
        );

    motion3dToggle.checked =
        motion3dEnabled;


    hapticEnabled =
        readBool(
            "dreamHaptic",
            true
        );

    hapticToggle.checked =
        hapticEnabled;


    spraySoundEnabled =
        readBool(
            "dreamSpraySound",
            true
        );

    spraySoundToggle.checked =
        spraySoundEnabled;


    const animationValue =
        Number(
            localStorage.getItem(
                "dreamAnimationSpeed"
            ) ||
            100
        );

    animationSpeed.value =
        animationValue;

    animationSpeedValue.textContent =
        `${animationValue}%`;

    root.style.setProperty(
        "--animation-speed",
        100 /
        animationValue
    );


    const motionValue =
        Number(
            localStorage.getItem(
                "dreamMotion3dIntensity"
            ) ||
            100
        );

    motion3dRange.value =
        motionValue;

    motion3dValue.textContent =
        `${motionValue}%`;

    motion3dIntensity =
        motionValue /
        100;


    const cursorValue =
        Number(
            localStorage.getItem(
                "dreamCursorGlowIntensity"
            ) ||
            100
        );

    cursorGlowRange.value =
        cursorValue;

    cursorGlowValue.textContent =
        `${cursorValue}%`;

    cursorGlowIntensity =
        cursorValue /
        100;


    const particleValue =
        Number(
            localStorage.getItem(
                "dreamParticleIntensity"
            ) ||
            100
        );

    particleIntensityRange.value =
        particleValue;

    particleIntensityValue.textContent =
        `${particleValue}%`;

    particleIntensity =
        particleValue /
        100;


    const sprayValue =
        Number(
            localStorage.getItem(
                "dreamSprayIntensity"
            ) ||
            100
        );

    sprayIntensityRange.value =
        sprayValue;

    sprayIntensityValue.textContent =
        `${sprayValue}%`;

    sprayIntensity =
        sprayValue /
        100;


    const contrast =
        Number(
            localStorage.getItem(
                "dreamContrast"
            ) ||
            100
        );

    contrastControl.value =
        contrast;

    contrastValue.textContent =
        `${contrast}%`;


    setFontSize(
        localStorage.getItem(
            "dreamFontSize"
        ) ||
        "normal"
    );


    setDreamMusicVolume(
        Number(
            localStorage.getItem(
                "dreamMusicVolume"
            ) ||
            35
        ),
        false
    );


    currentScene =
        localStorage.getItem(
            "dreamScene"
        ) ||
        "romance";

    setScene(
        currentScene,
        false
    );


    const savedMood =
        localStorage.getItem(
            "dreamMood"
        );

    if (
        savedMood &&
        moodData[savedMood]
    ) {

        setMood(
            savedMood,
            false
        );

    }


    generateParticles();

}


/* =========================================================
   RESUME MUSIC
========================================================= */

function bindMusicResumeGesture() {

    if (
        localStorage.getItem(
            "dreamMusicEnabled"
        ) !==
        "true"
    ) {
        return;
    }

    const resume =
        () => {

            playDreamMusic();

        };

    document.addEventListener(
        "pointerdown",
        resume,
        {
            once: true
        }
    );

}


/* =========================================================
   RESIZE / VISIBILITY
========================================================= */

window.addEventListener(
    "resize",
    () => {

        updateScroll();

        updateSectionIndicator();

        generateParticles();

    }
);


document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            clearTimeout(
                galleryTimer
            );

        } else if (
            galleryPlaying
        ) {

            scheduleGalleryAutoplay();

        }

    }
);


/* =========================================================
   INIT
========================================================= */

try {

    createGalleryDots();

    loadSettings();

    setLanguage(
        currentLanguage,
        false
    );

    updateSprayCounter();

    updateScroll();

    updateSectionIndicator();

    updateTimeline();

    updateGalleryUI();

    updateMusicUI();

    updateMusicProgress();

    updateFullscreenButton();

    bindMusicResumeGesture();


    setTimeout(
        () => {

            $$(".reveal").forEach(
                element => {

                    if (
                        element
                            .getBoundingClientRect()
                            .top <
                        window.innerHeight *
                        1.1
                    ) {

                        element.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        100
    );


    console.log(
        "Dream v60 carregado ♡"
    );

} catch (
    error
) {

    console.error(
        "Erro ao iniciar Dream v60:",
        error
    );

} finally {

    setTimeout(
        hideLoader,
        300
    );

}