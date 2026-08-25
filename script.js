"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     HELPERS
  ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const body =
    document.body;

  const root =
    document.documentElement;

  const clamp = (value, min, max) =>
    Math.min(
      max,
      Math.max(
        min,
        value
      )
    );


  /* =========================================================
     STORAGE
  ========================================================= */

  const storage = {

    get(key, fallback = null) {

      try {

        const value =
          localStorage.getItem(key);

        return value === null
          ? fallback
          : value;

      } catch {

        return fallback;

      }

    },


    set(key, value) {

      try {

        localStorage.setItem(
          key,
          String(value)
        );

      } catch {}

    },


    remove(key) {

      try {

        localStorage.removeItem(key);

      } catch {}

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

  const settingsPanel =
    $("#settingsPanel");

  const productModal =
    $("#productModal");

  const noteModal =
    $("#noteModal");

  const lightbox =
    $("#lightbox");


  /* =========================================================
     TOAST
  ========================================================= */

  let toastTimer;


  function showToast(message) {

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
        2200
      );

  }


  window.showToast =
    showToast;


  /* =========================================================
     LOADER
  ========================================================= */

  function closeLoader() {

    if (!loader) {
      return;
    }


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
        closeLoader,
        350
      );

    }
  );


  setTimeout(
    closeLoader,
    4500
  );


  /* =========================================================
     IDIOMAS
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

      "modal.productEyebrow":
        "DREAM AMOR NO AR",

      "modal.productDescription":
        "Uma fragrância floral, romântica e envolvente.",

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

      "footer.subtitle":
        "Amor no Ar • 350 ml",

      "footer.developed":
        "DESENVOLVIDO POR",

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
        "↻ Restaurar padrão"

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
        "A delicate, romantic and captivating fragrance designed to turn little moments into special memories.",

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
        "Press spray to activate the effect, sound and animation.",

      "hero.productName":
        "Love in the Air",

      "hero.bodySplash":
        "Body Splash",

      "spray.button":
        "Spray",

      "spray.experience":
        "try it",

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
        "Comfortable feeling",

      "product.point2Text":
        "Perfect for light everyday wear.",

      "product.point3Title":
        "350 ml bottle",

      "product.point3Text":
        "A Dream to accompany your routine.",

      "product.details":
        "View details",

      "product.favorite":
        "♡ Favorite",

      "campaign.mini":
        "DREAM • LOVE IN THE AIR",

      "campaign.title1":
        "Love is",

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
        "The fragrance's first impression: bright, fresh and vibrant.",

      "notes.card2Title":
        "Floral heart",

      "notes.card2Text":
        "The romantic, delicate and elegant side of Love in the Air.",

      "notes.card3Title":
        "Enveloping comfort",

      "notes.card3Text":
        "The notes that remain and create the fragrance's final signature.",

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
        "Discover how the fragrance evolves, compare sensations and personalize your experience.",

      "experience.evolution":
        "EVOLUTION",

      "experience.timelineTitle":
        "Fragrance timeline",

      "experience.timelineIntro":
        "Drag to follow the fragrance evolution throughout the hours.",

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
        "The visual identity automatically changes with your mood.",

      "meter.floral":
        "Floral",

      "meter.romantic":
        "Romantic",

      "meter.comfort":
        "Comfortable",

      "meter.presence":
        "Presence",

      "meter.intensity":
        "Intensity",

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

      "dreamMoment.defaultTitle":
        "Your moment starts here.",

      "dreamMoment.defaultText":
        "Tap the button to receive a little Dream message.",

      "dreamMoment.button":
        "New moment",

      "feeling.eyebrow":
        "FRAGRANCE FEELING",

      "feeling.title1":
        "Between softness and",

      "feeling.title2":
        "presence.",

      "feeling.description":
        "A visual representation of the balance of Dream Love in the Air.",

      "feeling.amorNoAr":
        "LOVE IN THE AIR",

      "feeling.profile":
        "SENSORY PROFILE",

      "feeling.bigTitle":
        "Delicate without going unnoticed.",

      "feeling.text":
        "Dream balances a romantic heart with a comfortable base, creating a soft presence.",

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
        "For moments when you want a soft, captivating and elegant presence.",

      "moments.card4Title":
        "Your moment",

      "moments.card4Text":
        "Some moments need no occasion. They just need to be yours.",

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
        "Change the setting and discover different sides of Dream.",

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
        "Dream Romance",

      "gallery.explore":
        "explore ↗",

      "gallery.autoplay":
        "▶ Autoplay",

      "quiz.title":
        "What is your Dream?",

      "quiz.description":
        "Answer four questions and discover which atmosphere suits you best.",

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

      "modal.productEyebrow":
        "DREAM LOVE IN THE AIR",

      "modal.productDescription":
        "A floral, romantic and captivating fragrance.",

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
        "Light and captivating",

      "modal.noteLabel":
        "DREAM NOTE",

      "lightbox.label":
        "DREAM GALLERY",

      "footer.subtitle":
        "Love in the Air • 350 ml",

      "footer.developed":
        "DEVELOPED BY",

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
        "Light that follows the mouse",

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
        "↻ Reset settings"

    }

  };


  let currentLanguage =
    storage.get(
      "dreamLanguage",
      "pt-BR"
    );


  if (
    !translations[
      currentLanguage
    ]
  ) {

    currentLanguage =
      "pt-BR";

  }


  function setLanguage(
    language,
    notify = false
  ) {

    if (
      !translations[
        language
      ]
    ) {

      return;

    }


    currentLanguage =
      language;


    storage.set(
      "dreamLanguage",
      language
    );


    root.lang =
      language;


    document.title =
      language ===
      "pt-BR"
        ? "Dream Amor no Ar • 350 ml"
        : "Dream Love in the Air • 350 ml";


    $$(
      "[data-i18n]"
    ).forEach(
      element => {

        const key =
          element.dataset.i18n;


        const translation =
          translations[
            language
          ][key];


        if (
          translation !==
          undefined
        ) {

          element.textContent =
            translation;

        }

      }
    );


    $$(
      "[data-lang]"
    ).forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.lang ===
            language
        );

      }
    );


    if (
      notify
    ) {

      showToast(

        language ===
        "pt-BR"
          ? "Idioma alterado para Português 🇧🇷"
          : "Language changed to English 🇺🇸"

      );

    }

  }


  $$(
    "[data-lang]"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();


          setLanguage(
            button.dataset.lang,
            true
          );

        }
      );

    }
  );


  setLanguage(
    currentLanguage,
    false
  );


  /* =========================================================
     SCROLL
  ========================================================= */

  function updateScroll() {

    const top =
      window.scrollY ||
      document.documentElement.scrollTop ||
      0;


    const total =
      document.documentElement.scrollHeight -
      window.innerHeight;


    const percent =
      total > 0
        ? clamp(
            (
              top /
              total
            ) *
            100,
            0,
            100
          )
        : 0;


    if (
      scrollProgress
    ) {

      scrollProgress.style.width =
        `${percent}%`;

    }


    header?.classList.toggle(
      "scrolled",
      top > 30
    );


    backTop?.classList.toggle(
      "show",
      top > 450
    );

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

        behavior:
          "smooth"

      });

    }
  );


  /* =========================================================
     MENU MOBILE
  ========================================================= */

  menuMobile?.addEventListener(
    "click",
    event => {

      event.stopPropagation();


      const open =
        menu?.classList.toggle(
          "open"
        );


      menuMobile.setAttribute(
        "aria-expanded",
        String(
          Boolean(open)
        )
      );

    }
  );


  $$(
    ".menu a"
  ).forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          menu?.classList.remove(
            "open"
          );


          menuMobile?.setAttribute(
            "aria-expanded",
            "false"
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


      menu.classList.remove(
        "open"
      );


      menuMobile.setAttribute(
        "aria-expanded",
        "false"
      );

    }
  );


  /* =========================================================
     REVEAL
  ========================================================= */

  const reveals =
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
          threshold: 0.1
        }

      );


    reveals.forEach(
      element => {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    reveals.forEach(
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

  const meters =
    $$(
      "[data-meter], [data-feeling]"
    );


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


              const value =
                Number(
                  entry.target.dataset.meter ??
                  entry.target.dataset.feeling ??
                  0
                );


              entry.target.style.width =
                `${
                  clamp(
                    value,
                    0,
                    100
                  )
                }%`;


              meterObserver.unobserve(
                entry.target
              );

            }
          );

        },

        {
          threshold: 0.25
        }

      );


    meters.forEach(
      element => {

        meterObserver.observe(
          element
        );

      }
    );

  }


  /* =========================================================
     MODAIS
  ========================================================= */

  function openLayer(
    element
  ) {

    if (
      !element
    ) {

      return;

    }


    element.classList.add(
      "open"
    );


    element.setAttribute(
      "aria-hidden",
      "false"
    );


    body.classList.add(
      "modal-open"
    );

  }


  function closeLayer(
    element
  ) {

    if (
      !element
    ) {

      return;

    }


    element.classList.remove(
      "open"
    );


    element.setAttribute(
      "aria-hidden",
      "true"
    );


    if (
      !$(".product-modal.open") &&
      !$(".note-modal.open") &&
      !$(".lightbox.open")
    ) {

      body.classList.remove(
        "modal-open"
      );

    }

  }


  /* =========================================================
     PRODUTO
  ========================================================= */

  const productOpenButtons =
    $$(
      ".open-product, #productDetailsButton, #viewProductButton, [data-open-product]"
    );


  productOpenButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          event.stopPropagation();


          if (
            !productModal
          ) {

            console.error(
              "#productModal não encontrado."
            );


            showToast(
              "Produto indisponível"
            );


            return;

          }


          openLayer(
            productModal
          );

        }
      );

    }
  );


  $$(
    ".close-product"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          event.stopPropagation();


          closeLayer(
            productModal
          );

        }
      );

    }
  );


  /* =========================================================
     FAVORITOS
  ========================================================= */

  let favorite =
    storage.get(
      "dreamFavorite",
      "false"
    ) ===
    "true";


  const favoriteButtons = [

    $("#favoriteButton"),

    $("#favoriteModal")

  ].filter(Boolean);


  function updateFavorite() {

    favoriteButtons.forEach(
      button => {

        button.classList.toggle(
          "active",
          favorite
        );


        button.textContent =
          favorite
            ? "♥ Favoritado"
            : translations[
                currentLanguage
              ][
                "product.favorite"
              ];

      }
    );

  }


  favoriteButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();


          favorite =
            !favorite;


          storage.set(
            "dreamFavorite",
            favorite
          );


          updateFavorite();


          showToast(

            favorite
              ? currentLanguage ===
                "pt-BR"
                ? "Adicionado aos favoritos ♡"
                : "Added to favorites ♡"
              : currentLanguage ===
                "pt-BR"
                ? "Removido dos favoritos"
                : "Removed from favorites"

          );

        }
      );

    }
  );


  updateFavorite();


  /* =========================================================
     SPRAY MP3 REAL
  ========================================================= */

  const sprayAudio =
    new Audio(
      "./audio/spray.mp3"
    );


  sprayAudio.preload =
    "auto";


  sprayAudio.volume =
    0.78;


  let sprayAudioStopTimer =
    null;


  function playSprayAudio() {

    if (
      $("#spraySoundToggle")
        ?.checked ===
        false
    ) {

      return;

    }


    clearTimeout(
      sprayAudioStopTimer
    );


    try {

      sprayAudio.pause();


      sprayAudio.currentTime =
        0;


      sprayAudio.volume =
        0.78;


      const promise =
        sprayAudio.play();


      if (
        promise &&
        typeof promise.catch ===
          "function"
      ) {

        promise.catch(
          error => {

            console.warn(
              "spray.mp3 não pôde tocar:",
              error
            );

          }
        );

      }


      sprayAudioStopTimer =
        setTimeout(
          () => {

            sprayAudio.pause();


            try {

              sprayAudio.currentTime =
                0;

            } catch {}

          },
          430
        );

    } catch (error) {

      console.warn(
        "Erro ao reproduzir spray.mp3:",
        error
      );

    }

  }


  /* =========================================================
     SPRAY
  ========================================================= */

  const sprayButton =
    $("#sprayButton");

  const sprayArea =
    $("#sprayArea");

  const sprayWave =
    $("#sprayWave");

  const heroProduct =
    $("#heroProduct");

  const mainBottle =
    $("#mainBottle");

  const productHalo =
    $("#productHalo");

  const productShine =
    $("#productShine");

  const sprayCounter =
    $("#sprayCounter");


  let spraying =
    false;


  let sprayCount =
    Number(
      storage.get(
        "dreamSprayCount",
        0
      )
    ) ||
    0;


  if (
    sprayCounter
  ) {

    sprayCounter.textContent =
      sprayCount;

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


    playSprayAudio();


    sprayCount++;


    storage.set(
      "dreamSprayCount",
      sprayCount
    );


    if (
      sprayCounter
    ) {

      sprayCounter.textContent =
        sprayCount;

    }


    heroProduct?.classList.add(
      "spraying"
    );


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


    const flash =
      document.createElement(
        "span"
      );


    flash.className =
      "spray-flash active";


    sprayArea.appendChild(
      flash
    );


    for (
      let i = 0;
      i < 60;
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
            0.5
          ) *
          430
        }px`
      );


      mist.style.setProperty(
        "--mist-y",
        `${
          (
            Math.random() -
            0.65
          ) *
          360
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
          0.9
        }s`
      );


      sprayArea.appendChild(
        mist
      );


      setTimeout(
        () => {

          mist.remove();

        },
        1900
      );

    }


    const symbols = [
      "♡",
      "✦",
      "✧"
    ];


    for (
      let i = 0;
      i < 14;
      i++
    ) {

      const particle =
        document.createElement(
          "span"
        );


      particle.className =
        "spray-symbol-particle";


      particle.textContent =
        symbols[
          Math.floor(
            Math.random() *
            symbols.length
          )
        ];


      particle.style.setProperty(
        "--symbol-x",
        `${
          (
            Math.random() -
            0.5
          ) *
          400
        }px`
      );


      particle.style.setProperty(
        "--symbol-y",
        `${
          -60 -
          Math.random() *
          280
        }px`
      );


      particle.style.setProperty(
        "--symbol-rotate",
        `${
          (
            Math.random() -
            0.5
          ) *
          500
        }deg`
      );


      sprayArea.appendChild(
        particle
      );


      setTimeout(
        () => {

          particle.remove();

        },
        1900
      );

    }


    if (
      navigator.vibrate &&
      $("#hapticToggle")
        ?.checked !==
        false
    ) {

      navigator.vibrate(
        30
      );

    }


    showToast(

      currentLanguage ===
      "pt-BR"
        ? "Dream está no ar ♡"
        : "Dream is in the air ♡"

    );


    setTimeout(
      () => {

        flash.remove();


        heroProduct?.classList.remove(
          "spraying"
        );


        spraying =
          false;

      },
      950
    );

  }


  sprayButton?.addEventListener(
    "click",
    sprayDream
  );
    /* =========================================================
     CURSOR GLOW
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


  document.addEventListener(
    "pointermove",
    event => {

      cursorX =
        event.clientX;

      cursorY =
        event.clientY;

    },
    {
      passive: true
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
        0.12;


      glowY +=
        (
          cursorY -
          glowY
        ) *
        0.12;


      cursorGlow.style.left =
        `${glowX}px`;


      cursorGlow.style.top =
        `${glowY}px`;

    }


    requestAnimationFrame(
      animateCursorGlow
    );

  }


  animateCursorGlow();


  /* =========================================================
     PARTÍCULAS
  ========================================================= */

  const particlesContainer =
    $("#particles");


  function generateParticles() {

    if (
      !particlesContainer
    ) {

      return;

    }


    particlesContainer.innerHTML =
      "";


    const intensity =
      Number(
        $("#particleIntensityRange")
          ?.value ||
        100
      );


    const amount =
      Math.max(
        0,
        Math.round(
          25 *
          intensity /
          100
        )
      );


    const symbols = [
      "♡",
      "✦",
      "·",
      "✿",
      "✧"
    ];


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
        `${
          Math.random() *
          100
        }%`;


      particle.style.fontSize =
        `${
          8 +
          Math.random() *
          16
        }px`;


      particle.style.setProperty(
        "--duration",
        `${
          8 +
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


      particlesContainer.appendChild(
        particle
      );

    }

  }


  generateParticles();


  /* =========================================================
     FRASCO 3D
  ========================================================= */

  heroProduct?.addEventListener(
    "pointermove",
    event => {

      if (
        !mainBottle ||
        spraying
      ) {

        return;

      }


      if (
        $("#motion3dToggle")
          ?.checked ===
        false
      ) {

        return;

      }


      if (
        !window.matchMedia(
          "(pointer: fine)"
        ).matches
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
        Number(
          $("#motion3dRange")
            ?.value ||
          100
        ) /
        100;


      mainBottle.style.transform =
        `
        rotateY(${x * 16 * intensity}deg)
        rotateX(${y * -12 * intensity}deg)
        translate3d(
          ${x * 15 * intensity}px,
          ${y * 8 * intensity}px,
          ${30 * intensity}px
        )
        `;


      if (
        productHalo
      ) {

        productHalo.style.transform =
          `
          translate(
            ${x * -25 * intensity}px,
            ${y * -20 * intensity}px
          )
          `;

      }


      if (
        productShine
      ) {

        productShine.style.transform =
          `
          translate(
            ${x * 35}px,
            ${y * 25}px
          )
          `;

      }

    }
  );


  heroProduct?.addEventListener(
    "pointerleave",
    () => {

      if (
        mainBottle
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

        productShine.style.transform =
          "";

      }

    }
  );


  /* =========================================================
     NOTAS
  ========================================================= */

  const noteData = {

    bergamota: [
      "🍊",
      "Bergamota",
      "Cítrica, fresca e luminosa."
    ],

    laranja: [
      "🍊",
      "Laranja",
      "Alegre, cítrica e suculenta."
    ],

    mandarina: [
      "🍊",
      "Mandarina",
      "Doce, cítrica e vibrante."
    ],

    limao: [
      "🍋",
      "Limão",
      "Fresco, limpo e brilhante."
    ],

    cassis: [
      "●",
      "Cassis",
      "Frutado marcante e levemente ácido."
    ],

    maca: [
      "🍎",
      "Maçã",
      "Fresca, frutada e delicada."
    ],

    rosa: [
      "🌹",
      "Rosa",
      "Floral clássico, elegante e romântico."
    ],

    tilia: [
      "✿",
      "Tília",
      "Floral suave e confortável."
    ],

    freesia: [
      "🌸",
      "Frésia",
      "Floral leve, transparente e moderno."
    ],

    lotus: [
      "🪷",
      "Flor de Lótus",
      "Aquática, delicada e leve."
    ],

    gardenia: [
      "✿",
      "Gardênia",
      "Floral branco, cremoso e envolvente."
    ],

    pessego: [
      "🍑",
      "Pêssego",
      "Frutado macio e aveludado."
    ],

    ambar: [
      "✦",
      "Âmbar",
      "Quente, confortável e envolvente."
    ],

    sandalo: [
      "☾",
      "Sândalo",
      "Madeira cremosa, macia e elegante."
    ],

    baunilha: [
      "♡",
      "Baunilha",
      "Doce, cremosa e aconchegante."
    ],

    tonka: [
      "✧",
      "Tonka",
      "Quente, adocicada e confortável."
    ],

    musk: [
      "☁",
      "Musk",
      "Limpo, macio e próximo da pele."
    ]

  };


  $$(
    ".note-chip"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const note =
            noteData[
              button.dataset.note
            ];


          if (
            !note
          ) {

            return;

          }


          if (
            $("#noteModalIcon")
          ) {

            $("#noteModalIcon").textContent =
              note[0];

          }


          if (
            $("#noteModalTitle")
          ) {

            $("#noteModalTitle").textContent =
              note[1];

          }


          if (
            $("#noteModalText")
          ) {

            $("#noteModalText").textContent =
              note[2];

          }


          openLayer(
            noteModal
          );

        }
      );

    }
  );


  $$(
    ".close-note"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();


          closeLayer(
            noteModal
          );

        }
      );

    }
  );


  /* =========================================================
     TIMELINE
  ========================================================= */

  const timelineSlider =
    $("#timelineSlider");


  const timelineStages = [

    [
      1,
      "🍊",
      "Abertura fresca",
      "Cítricos e frutas aparecem primeiro."
    ],

    [
      3,
      "🌸",
      "Coração floral",
      "As flores assumem o centro da fragrância."
    ],

    [
      5,
      "♡",
      "Romântico e confortável",
      "O floral fica mais macio."
    ],

    [
      8,
      "✨",
      "Fundo aconchegante",
      "Madeiras e notas doces permanecem."
    ]

  ];


  function updateTimeline() {

    if (
      !timelineSlider
    ) {

      return;

    }


    const value =
      Number(
        timelineSlider.value ||
        0
      );


    if (
      $("#timelineHour")
    ) {

      $("#timelineHour").textContent =
        `${value}h`;

    }


    const stage =
      timelineStages.find(
        item =>
          value <= item[0]
      ) ||
      timelineStages[
        timelineStages.length -
        1
      ];


    if (
      $("#timelineIcon")
    ) {

      $("#timelineIcon").textContent =
        stage[1];

    }


    if (
      $("#timelineTitle")
    ) {

      $("#timelineTitle").textContent =
        stage[2];

    }


    if (
      $("#timelineText")
    ) {

      $("#timelineText").textContent =
        stage[3];

    }

  }


  timelineSlider?.addEventListener(
    "input",
    updateTimeline
  );


  updateTimeline();


  /* =========================================================
     GALERIA
  ========================================================= */

  const galleryTrack =
    $("#galleryTrack");


  const galleryItems =
    $$(".gallery-item");


  const galleryDots =
    $("#galleryDots");


  let galleryIndex =
    0;


  function updateGalleryUI() {

    $$(
      ".gallery-dot"
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


    if (
      $("#galleryCurrent")
    ) {

      $("#galleryCurrent").textContent =
        String(
          galleryIndex +
          1
        ).padStart(
          2,
          "0"
        );

    }


    if (
      $("#galleryTotal")
    ) {

      $("#galleryTotal").textContent =
        String(
          galleryItems.length
        ).padStart(
          2,
          "0"
        );

    }

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
      clamp(
        index,
        0,
        galleryItems.length -
        1
      );


    const item =
      galleryItems[
        galleryIndex
      ];


    galleryTrack.scrollTo({

      left:
        item.offsetLeft -
        galleryTrack.offsetLeft,

      behavior:
        "smooth"

    });


    updateGalleryUI();

  }


  if (
    galleryDots
  ) {

    galleryDots.innerHTML =
      "";


    galleryItems.forEach(
      (
        _,
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

            goGallery(
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


  $("#galleryNext")?.addEventListener(
    "click",
    () => {

      if (
        !galleryItems.length
      ) {

        return;

      }


      goGallery(

        galleryIndex >=
        galleryItems.length - 1
          ? 0
          : galleryIndex + 1

      );

    }
  );


  $("#galleryPrev")?.addEventListener(
    "click",
    () => {

      if (
        !galleryItems.length
      ) {

        return;

      }


      goGallery(

        galleryIndex <= 0
          ? galleryItems.length - 1
          : galleryIndex - 1

      );

    }
  );


  updateGalleryUI();


  /* =========================================================
     DRAG GALERIA
  ========================================================= */

  let galleryDragging =
    false;


  let galleryMoved =
    false;


  let galleryStartX =
    0;


  let galleryStartScroll =
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


      galleryMoved =
        false;


      galleryStartX =
        event.clientX;


      galleryStartScroll =
        galleryTrack.scrollLeft;


      galleryTrack.classList.add(
        "dragging"
      );


      galleryTrack.setPointerCapture?.(
        event.pointerId
      );

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


      const delta =
        event.clientX -
        galleryStartX;


      if (
        Math.abs(delta) >
        5
      ) {

        galleryMoved =
          true;

      }


      galleryTrack.scrollLeft =
        galleryStartScroll -
        delta;

    }
  );


  function endGalleryDrag() {

    galleryDragging =
      false;


    galleryTrack?.classList.remove(
      "dragging"
    );


    setTimeout(
      () => {

        galleryMoved =
          false;

      },
      80
    );

  }


  galleryTrack?.addEventListener(
    "pointerup",
    endGalleryDrag
  );


  galleryTrack?.addEventListener(
    "pointercancel",
    endGalleryDrag
  );


  /* =========================================================
     AUTOPLAY GALERIA
  ========================================================= */

  const galleryAutoplay =
    $("#galleryAutoplay");


  const galleryAutoplayProgress =
    $("#galleryAutoplayProgress") ||
    $(".gallery-autoplay-progress i");


  let galleryAutoplayTimer =
    null;


  function resetGalleryAutoplayProgress() {

    if (
      !galleryAutoplayProgress
    ) {

      return;

    }


    galleryAutoplayProgress.style.transition =
      "none";


    galleryAutoplayProgress.style.width =
      "0%";


    void galleryAutoplayProgress.offsetWidth;


    if (
      galleryAutoplayTimer
    ) {

      galleryAutoplayProgress.style.transition =
        "width 3.5s linear";


      galleryAutoplayProgress.style.width =
        "100%";

    }

  }


  function stopGalleryAutoplay() {

    if (
      galleryAutoplayTimer
    ) {

      clearInterval(
        galleryAutoplayTimer
      );

    }


    galleryAutoplayTimer =
      null;


    if (
      galleryAutoplay
    ) {

      galleryAutoplay.textContent =
        translations[
          currentLanguage
        ][
          "gallery.autoplay"
        ];

    }


    if (
      galleryAutoplayProgress
    ) {

      galleryAutoplayProgress.style.transition =
        "none";


      galleryAutoplayProgress.style.width =
        "0%";

    }

  }


  function startGalleryAutoplay() {

    if (
      galleryAutoplayTimer ||
      !galleryItems.length
    ) {

      return;

    }


    galleryAutoplayTimer =
      setInterval(
        () => {

          goGallery(

            galleryIndex >=
            galleryItems.length - 1
              ? 0
              : galleryIndex + 1

          );


          resetGalleryAutoplayProgress();

        },
        3500
      );


    if (
      galleryAutoplay
    ) {

      galleryAutoplay.textContent =
        currentLanguage ===
        "pt-BR"
          ? "❚❚ Pausar"
          : "❚❚ Pause";

    }


    resetGalleryAutoplayProgress();

  }


  galleryAutoplay?.addEventListener(
    "click",
    () => {

      if (
        galleryAutoplayTimer
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


    const image =
      $("img", item);


    const title =
      $("h3", item);


    if (
      $("#lightboxImage") &&
      image
    ) {

      $("#lightboxImage").src =
        image.currentSrc ||
        image.src;


      $("#lightboxImage").alt =
        image.alt ||
        "Dream";

    }


    if (
      $("#lightboxTitle")
    ) {

      $("#lightboxTitle").textContent =
        title?.textContent?.trim() ||
        "Dream";

    }


    if (
      $("#lightboxCounter")
    ) {

      $("#lightboxCounter").textContent =
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

    if (
      !lightbox ||
      !galleryItems.length
    ) {

      return;

    }


    lightboxIndex =
      clamp(
        index,
        0,
        galleryItems.length -
        1
      );


    updateLightbox();


    openLayer(
      lightbox
    );

  }


  function closeLightbox() {

    closeLayer(
      lightbox
    );

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


  function prevLightbox() {

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
        () => {

          if (
            galleryMoved
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


  $("#lightboxClose")?.addEventListener(
    "click",
    closeLightbox
  );


  $("#lightboxBackdrop")?.addEventListener(
    "click",
    closeLightbox
  );


  $("#lightboxNext")?.addEventListener(
    "click",
    nextLightbox
  );


  $("#lightboxPrev")?.addEventListener(
    "click",
    prevLightbox
  );


  /* =========================================================
     MOODS E PALETAS
  ========================================================= */

  const moods = {

    romantico: [
      "#df76a8",
      "#9562dc"
    ],

    sonhador: [
      "#a78bfa",
      "#60a5fa"
    ],

    noturno: [
      "#7c3aed",
      "#312e81"
    ],

    energia: [
      "#fb7185",
      "#f59e0b"
    ],

    calmo: [
      "#45c4aa",
      "#5285c5"
    ]

  };


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


  function hexToRgb(hex) {

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


    const value =
      parseInt(
        clean,
        16
      );


    if (
      Number.isNaN(value)
    ) {

      return {
        r: 223,
        g: 118,
        b: 168
      };

    }


    return {

      r:
        value >> 16 & 255,

      g:
        value >> 8 & 255,

      b:
        value & 255

    };

  }


  function applyColors(
    primary,
    secondary,
    save = true
  ) {

    const p =
      hexToRgb(
        primary
      );


    const s =
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
      `${p.r}, ${p.g}, ${p.b}`
    );


    root.style.setProperty(
      "--secondary-rgb",
      `${s.r}, ${s.g}, ${s.b}`
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


    if (
      save
    ) {

      storage.set(
        "dreamPrimary",
        primary
      );


      storage.set(
        "dreamSecondary",
        secondary
      );

    }

  }


  $$(
    ".mood-button"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          $$(
            ".mood-button"
          ).forEach(
            item => {

              item.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );


          const mood =
            moods[
              button.dataset.mood
            ];


          if (
            mood
          ) {

            applyColors(
              mood[0],
              mood[1]
            );

          }

        }
      );

    }
  );


  $$(
    ".palette"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          $$(
            ".palette"
          ).forEach(
            item => {

              item.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );


          const palette =
            palettes[
              button.dataset.palette
            ];


          if (
            palette
          ) {

            applyColors(
              palette[0],
              palette[1]
            );

          }

        }
      );

    }
  );


  $("#primaryColor")?.addEventListener(
    "input",
    event => {

      applyColors(

        event.target.value,

        $("#secondaryColor")
          ?.value ||
        "#9562dc"

      );

    }
  );


  $("#secondaryColor")?.addEventListener(
    "input",
    event => {

      applyColors(

        $("#primaryColor")
          ?.value ||
        "#df76a8",

        event.target.value

      );

    }
  );


  /* =========================================================
     DREAM STUDIO ABRIR / FECHAR
  ========================================================= */

  function openStudio() {

    settingsPanel?.classList.add(
      "open"
    );

  }


  function closeStudio() {

    settingsPanel?.classList.remove(
      "open"
    );

  }


  $("#settingsButton")?.addEventListener(
    "click",
    event => {

      event.preventDefault();


      settingsPanel?.classList.toggle(
        "open"
      );

    }
  );


  $("#closeSettings")?.addEventListener(
    "click",
    closeStudio
  );


  /* =========================================================
     TEMA
  ========================================================= */

  function setDark(
    active,
    save = true
  ) {

    body.classList.toggle(
      "dark",
      active
    );


    if (
      $("#darkToggle")
    ) {

      $("#darkToggle").checked =
        active;

    }


    if (
      $("#themeButton")
    ) {

      $("#themeButton").textContent =
        active
          ? "☀"
          : "☾";

    }


    if (
      save
    ) {

      storage.set(
        "dreamDark",
        active
      );

    }

  }


  $("#themeButton")?.addEventListener(
    "click",
    () => {

      setDark(
        !body.classList.contains(
          "dark"
        )
      );

    }
  );


  $("#darkToggle")?.addEventListener(
    "change",
    event => {

      setDark(
        event.target.checked
      );

    }
  );


  /* =========================================================
     TOGGLES DREAM STUDIO
  ========================================================= */

  $("#particlesToggle")?.addEventListener(
    "change",
    event => {

      body.classList.toggle(
        "no-particles",
        !event.target.checked
      );


      storage.set(
        "dreamParticles",
        event.target.checked
      );

    }
  );


  $("#animationsToggle")?.addEventListener(
    "change",
    event => {

      body.classList.toggle(
        "no-animations",
        !event.target.checked
      );


      storage.set(
        "dreamAnimations",
        event.target.checked
      );

    }
  );


  $("#cursorToggle")?.addEventListener(
    "change",
    event => {

      body.classList.toggle(
        "no-cursor",
        !event.target.checked
      );


      storage.set(
        "dreamCursor",
        event.target.checked
      );

    }
  );


  $("#glassToggle")?.addEventListener(
    "change",
    event => {

      body.classList.toggle(
        "no-glass",
        !event.target.checked
      );


      storage.set(
        "dreamGlass",
        event.target.checked
      );

    }
  );


  $("#cleanModeToggle")?.addEventListener(
    "change",
    event => {

      body.classList.toggle(
        "clean-mode",
        event.target.checked
      );


      storage.set(
        "dreamClean",
        event.target.checked
      );

    }
  );


  $("#motion3dToggle")?.addEventListener(
    "change",
    event => {

      storage.set(
        "dreamMotion3D",
        event.target.checked
      );


      if (
        !event.target.checked &&
        mainBottle
      ) {

        mainBottle.style.transform =
          "";

      }

    }
  );


  $("#hapticToggle")?.addEventListener(
    "change",
    event => {

      storage.set(
        "dreamHaptic",
        event.target.checked
      );

    }
  );


  $("#spraySoundToggle")?.addEventListener(
    "change",
    event => {

      storage.set(
        "dreamSpraySound",
        event.target.checked
      );

    }
  );


  /* =========================================================
     PERFORMANCE
  ========================================================= */

  function setPerformance(
    active,
    save = true
  ) {

    body.classList.toggle(
      "performance-mode",
      active
    );


    if (
      $("#performanceToggle")
    ) {

      $("#performanceToggle").checked =
        active;

    }


    if (
      save
    ) {

      storage.set(
        "dreamPerformance",
        active
      );

    }

  }


  $("#performanceToggle")?.addEventListener(
    "change",
    event => {

      setPerformance(
        event.target.checked
      );

    }
  );


  /* =========================================================
     RANGES
  ========================================================= */

  function applyRange(
    inputSelector,
    labelSelector,
    storageKey,
    value,
    min,
    max,
    callback
  ) {

    const safe =
      clamp(
        Number(value) ||
        0,
        min,
        max
      );


    const input =
      $(
        inputSelector
      );


    const label =
      $(
        labelSelector
      );


    if (
      input
    ) {

      input.value =
        safe;

    }


    if (
      label
    ) {

      label.textContent =
        `${Math.round(
          safe
        )}%`;

    }


    storage.set(
      storageKey,
      safe
    );


    callback?.(
      safe
    );

  }


  $("#animationSpeed")?.addEventListener(
    "input",
    event => {

      applyRange(
        "#animationSpeed",
        "#animationSpeedValue",
        "dreamAnimationSpeed",
        event.target.value,
        40,
        160,
        safe => {

          root.style.setProperty(
            "--animation-speed",
            safe /
            100
          );

        }
      );

    }
  );


  $("#motion3dRange")?.addEventListener(
    "input",
    event => {

      applyRange(
        "#motion3dRange",
        "#motion3dValue",
        "dreamMotion3DIntensity",
        event.target.value,
        0,
        150
      );

    }
  );


  $("#cursorGlowRange")?.addEventListener(
    "input",
    event => {

      applyRange(
        "#cursorGlowRange",
        "#cursorGlowValue",
        "dreamCursorGlowIntensity",
        event.target.value,
        0,
        150,
        safe => {

          root.style.setProperty(
            "--cursor-glow-intensity",
            safe /
            100
          );

        }
      );

    }
  );


  $("#particleIntensityRange")?.addEventListener(
    "input",
    event => {

      applyRange(
        "#particleIntensityRange",
        "#particleIntensityValue",
        "dreamParticleIntensity",
        event.target.value,
        0,
        150,
        () => {

          generateParticles();

        }
      );

    }
  );


  $("#sprayIntensityRange")?.addEventListener(
    "input",
    event => {

      applyRange(
        "#sprayIntensityRange",
        "#sprayIntensityValue",
        "dreamSprayIntensity",
        event.target.value,
        40,
        160,
        safe => {

          root.style.setProperty(
            "--spray-intensity",
            safe /
            100
          );

        }
      );

    }
  );


  $("#contrastControl")?.addEventListener(
    "input",
    event => {

      applyRange(
        "#contrastControl",
        "#contrastValue",
        "dreamContrast",
        event.target.value,
        80,
        130,
        safe => {

          body.style.filter =
            `contrast(${
              safe /
              100
            })`;

        }
      );

    }
  );


  /* =========================================================
     TAMANHO DA FONTE
  ========================================================= */

  const fontButtons =
    $$(
      "[data-font-size]"
    );


  function setFontSize(
    size
  ) {

    const allowed = [
      "small",
      "normal",
      "large"
    ];


    const safe =
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
      `font-${safe}`
    );


    fontButtons.forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.fontSize ===
            safe
        );

      }
    );


    storage.set(
      "dreamFontSize",
      safe
    );

  }


  fontButtons.forEach(
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
     QUIZ
  ========================================================= */

  const quizQuestions = [
    {
      pt: "Qual momento combina mais com você?",
      en: "Which moment suits you best?",
      answers: [
        ["Encontro romântico ♡", "Romantic date ♡", "romantico"],
        ["Noite olhando o céu ☾", "Night under the sky ☾", "sonhador"],
        ["Uma festa ✦", "A party ✦", "energia"],
        ["Momento tranquilo ☁", "A peaceful moment ☁", "calmo"]
      ]
    },

    {
      pt: "Escolha uma sensação.",
      en: "Choose a feeling.",
      answers: [
        ["Romance", "Romance", "romantico"],
        ["Liberdade", "Freedom", "sonhador"],
        ["Intensidade", "Intensity", "energia"],
        ["Conforto", "Comfort", "calmo"]
      ]
    },

    {
      pt: "Escolha um símbolo.",
      en: "Choose a symbol.",
      answers: [
        ["♡ Coração", "♡ Heart", "romantico"],
        ["☾ Lua", "☾ Moon", "sonhador"],
        ["✦ Estrela", "✦ Star", "energia"],
        ["☁ Nuvem", "☁ Cloud", "calmo"]
      ]
    },

    {
      pt: "Escolha seu cenário Dream.",
      en: "Choose your Dream setting.",
      answers: [
        ["Jardim florido", "Flower garden", "romantico"],
        ["Céu estrelado", "Starry sky", "sonhador"],
        ["Cidade iluminada", "City lights", "energia"],
        ["Fim de tarde", "Sunset", "calmo"]
      ]
    }
  ];


  const quizResults = {
    romantico: {
      icon: "♡",
      ptTitle: "Dream Lover",
      enTitle: "Dream Lover",
      ptText:
        "Romântico, delicado e apaixonado pelos pequenos detalhes.",
      enText:
        "Romantic, delicate and in love with the little details."
    },

    sonhador: {
      icon: "☾",
      ptTitle: "Dreamer",
      enTitle: "Dreamer",
      ptText:
        "Você gosta de imaginar e transformar momentos em lembranças.",
      enText:
        "You love imagining and turning moments into memories."
    },

    energia: {
      icon: "✦",
      ptTitle: "Dream Energy",
      enTitle: "Dream Energy",
      ptText:
        "Uma personalidade vibrante e cheia de energia.",
      enText:
        "A vibrant personality full of energy."
    },

    calmo: {
      icon: "☁",
      ptTitle: "Soft Dream",
      enTitle: "Soft Dream",
      ptText:
        "Você valoriza conforto, tranquilidade e leveza.",
      enText:
        "You value comfort, tranquility and softness."
    }
  };


  let quizIndex = 0;

  let quizScore = {};

  let quizWinner = null;


  function startQuiz() {

    quizIndex = 0;

    quizWinner = null;

    quizScore = {
      romantico: 0,
      sonhador: 0,
      energia: 0,
      calmo: 0
    };


    if (
      $("#quizStart")
    ) {

      $("#quizStart").hidden =
        true;

    }


    if (
      $("#quizQuestions")
    ) {

      $("#quizQuestions").hidden =
        false;

    }


    if (
      $("#quizResult")
    ) {

      $("#quizResult").hidden =
        true;

    }


    renderQuiz();

  }


  function renderQuiz() {

    const question =
      quizQuestions[
        quizIndex
      ];


    if (
      !question
    ) {

      return;

    }


    if (
      $("#quizQuestion")
    ) {

      $("#quizQuestion").textContent =
        currentLanguage ===
        "pt-BR"
          ? question.pt
          : question.en;

    }


    if (
      $("#quizStep")
    ) {

      $("#quizStep").textContent =
        `${
          quizIndex + 1
        } / ${
          quizQuestions.length
        }`;

    }


    if (
      $("#quizProgressBar")
    ) {

      $("#quizProgressBar").style.width =
        `${
          (
            (
              quizIndex + 1
            ) /
            quizQuestions.length
          ) *
          100
        }%`;

    }


    const options =
      $("#quizOptions");


    if (
      !options
    ) {

      return;

    }


    options.innerHTML =
      "";


    question.answers.forEach(
      answer => {

        const button =
          document.createElement(
            "button"
          );


        button.type =
          "button";


        button.textContent =
          currentLanguage ===
          "pt-BR"
            ? answer[0]
            : answer[1];


        button.addEventListener(
          "click",
          () => {

            quizScore[
              answer[2]
            ]++;


            quizIndex++;


            if (
              quizIndex >=
              quizQuestions.length
            ) {

              finishQuiz();

            } else {

              renderQuiz();

            }

          }
        );


        options.appendChild(
          button
        );

      }
    );

  }


  function finishQuiz() {

    if (
      $("#quizQuestions")
    ) {

      $("#quizQuestions").hidden =
        true;

    }


    if (
      $("#quizResult")
    ) {

      $("#quizResult").hidden =
        false;

    }


    quizWinner =
      Object.entries(
        quizScore
      )
      .sort(
        (
          a,
          b
        ) =>
          b[1] -
          a[1]
      )[0]?.[0] ||
      "romantico";


    const result =
      quizResults[
        quizWinner
      ];


    if (
      $("#quizResultIcon")
    ) {

      $("#quizResultIcon").textContent =
        result.icon;

    }


    if (
      $("#quizResultTitle")
    ) {

      $("#quizResultTitle").textContent =
        currentLanguage ===
        "pt-BR"
          ? result.ptTitle
          : result.enTitle;

    }


    if (
      $("#quizResultText")
    ) {

      $("#quizResultText").textContent =
        currentLanguage ===
        "pt-BR"
          ? result.ptText
          : result.enText;

    }

  }


  $("#startQuiz")?.addEventListener(
    "click",
    startQuiz
  );


  $("#restartQuiz")?.addEventListener(
    "click",
    startQuiz
  );


  $("#applyQuizMood")?.addEventListener(
    "click",
    () => {

      if (
        !quizWinner
      ) {

        return;

      }


      const mood =
        moods[
          quizWinner
        ];


      if (
        mood
      ) {

        applyColors(
          mood[0],
          mood[1]
        );


        showToast(
          currentLanguage ===
          "pt-BR"
            ? "Seu mood foi aplicado ♡"
            : "Your mood was applied ♡"
        );

      }

    }
  );


  $("#shareQuizResult")?.addEventListener(
    "click",
    async () => {

      if (
        !quizWinner
      ) {

        return;

      }


      const result =
        quizResults[
          quizWinner
        ];


      const resultTitle =
        currentLanguage ===
        "pt-BR"
          ? result.ptTitle
          : result.enTitle;


      const text =
        currentLanguage ===
        "pt-BR"
          ? `Meu resultado no Dream Quiz foi ${resultTitle} ♡`
          : `My Dream Quiz result is ${resultTitle} ♡`;


      try {

        if (
          navigator.share
        ) {

          await navigator.share({
            title:
              "Dream Quiz",

            text,

            url:
              location.href
          });

        } else if (
          navigator.clipboard
        ) {

          await navigator.clipboard.writeText(
            text
          );


          showToast(
            currentLanguage ===
            "pt-BR"
              ? "Resultado copiado ♡"
              : "Result copied ♡"
          );

        }

      } catch {

        showToast(
          currentLanguage ===
          "pt-BR"
            ? "Compartilhamento cancelado"
            : "Sharing cancelled"
        );

      }

    }
  );


  /* =========================================================
     DREAM SCENE
  ========================================================= */

  const scenes = {
    romance: {
      icon: "♡",

      ptTitle:
        "Amor está no ar.",

      enTitle:
        "Love is in the air.",

      ptText:
        "Uma atmosfera delicada, rosa e envolvente.",

      enText:
        "A delicate, romantic and captivating atmosphere.",

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
      icon: "☾",

      ptTitle:
        "Noite estrelada",

      enTitle:
        "Starry night",

      ptText:
        "Uma sensação misteriosa, sonhadora e cheia de possibilidades.",

      enText:
        "A mysterious, dreamy feeling full of possibilities.",

      background:
        `
        radial-gradient(
          circle at 25% 25%,
          rgba(111,95,255,.30),
          transparent 35%
        ),
        radial-gradient(
          circle at 75% 60%,
          rgba(73,133,255,.24),
          transparent 40%
        ),
        linear-gradient(
          135deg,
          #090b1e,
          #211346
        )
        `
    },

    flores: {
      icon: "✿",

      ptTitle:
        "Jardim Dream",

      enTitle:
        "Dream Garden",

      ptText:
        "Floral, romântico e delicado para deixar o momento mais especial.",

      enText:
        "Floral, romantic and delicate to make the moment more special.",

      background:
        `
        radial-gradient(
          circle at 20% 65%,
          rgba(251,113,133,.30),
          transparent 35%
        ),
        radial-gradient(
          circle at 80% 30%,
          rgba(245,158,11,.25),
          transparent 40%
        ),
        linear-gradient(
          135deg,
          #1a1018,
          #35211c
        )
        `
    },

    energia: {
      icon: "✦",

      ptTitle:
        "Dream Energy",

      enTitle:
        "Dream Energy",

      ptText:
        "Uma atmosfera mais vibrante, intensa e cheia de personalidade.",

      enText:
        "A more vibrant and intense atmosphere full of personality.",

      background:
        `
        radial-gradient(
          circle at 20% 50%,
          rgba(69,196,170,.28),
          transparent 38%
        ),
        radial-gradient(
          circle at 80% 40%,
          rgba(82,133,197,.28),
          transparent 42%
        ),
        linear-gradient(
          135deg,
          #101a1c,
          #172c35
        )
        `
    }
  };


  const dreamSceneBg =
    $(".dream-scene-bg");


  $$(
    ".scene-button"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const scene =
            scenes[
              button.dataset.scene
            ];


          if (
            !scene
          ) {

            return;

          }


          $$(
            ".scene-button"
          ).forEach(
            item => {

              item.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );


          if (
            dreamSceneBg
          ) {

            dreamSceneBg.style.background =
              scene.background;

          }


          if (
            $("#sceneResultIcon")
          ) {

            $("#sceneResultIcon").textContent =
              scene.icon;

          }


          if (
            $("#sceneResultTitle")
          ) {

            $("#sceneResultTitle").textContent =
              currentLanguage ===
              "pt-BR"
                ? scene.ptTitle
                : scene.enTitle;

          }


          if (
            $("#sceneResultText")
          ) {

            $("#sceneResultText").textContent =
              currentLanguage ===
              "pt-BR"
                ? scene.ptText
                : scene.enText;

          }

        }
      );

    }
  );


  /* =========================================================
     DREAM MOMENT
  ========================================================= */

  const dreamMoments = [
    {
      icon: "♡",
      ptTitle:
        "O amor mora nos detalhes.",
      enTitle:
        "Love lives in the details.",
      ptText:
        "Alguns momentos ficam especiais justamente porque parecem simples.",
      enText:
        "Some moments become special precisely because they seem simple."
    },

    {
      icon: "✦",
      ptTitle:
        "Transforme o comum.",
      enTitle:
        "Transform the ordinary.",
      ptText:
        "Uma fragrância pode fazer um instante comum virar uma lembrança.",
      enText:
        "A fragrance can turn an ordinary instant into a memory."
    },

    {
      icon: "☾",
      ptTitle:
        "Leve o Dream com você.",
      enTitle:
        "Take Dream with you.",
      ptText:
        "Crie sua própria atmosfera e deixe o momento falar por si.",
      enText:
        "Create your own atmosphere and let the moment speak for itself."
    },

    {
      icon: "☁",
      ptTitle:
        "Desacelere um pouco.",
      enTitle:
        "Slow down for a moment.",
      ptText:
        "Nem todo momento especial precisa ser planejado.",
      enText:
        "Not every special moment needs to be planned."
    },

    {
      icon: "✧",
      ptTitle:
        "Guarde o instante.",
      enTitle:
        "Keep the moment.",
      ptText:
        "Às vezes uma lembrança começa com um detalhe quase imperceptível.",
      enText:
        "Sometimes a memory begins with an almost imperceptible detail."
    }
  ];


  $("#newDreamMoment")?.addEventListener(
    "click",
    () => {

      const moment =
        dreamMoments[
          Math.floor(
            Math.random() *
            dreamMoments.length
          )
        ];


      if (
        $(".dream-moment-icon")
      ) {

        $(".dream-moment-icon").textContent =
          moment.icon;

      }


      if (
        $("#dreamMomentTitle")
      ) {

        $("#dreamMomentTitle").textContent =
          currentLanguage ===
          "pt-BR"
            ? moment.ptTitle
            : moment.enTitle;

      }


      if (
        $("#dreamMomentText")
      ) {

        $("#dreamMomentText").textContent =
          currentLanguage ===
          "pt-BR"
            ? moment.ptText
            : moment.enText;

      }


      showToast(
        currentLanguage ===
        "pt-BR"
          ? "Novo Dream Moment ✦"
          : "New Dream Moment ✦"
      );

    }
  );


  /* =========================================================
     CARDS 3D
  ========================================================= */

  $$(
    ".moment-card"
  ).forEach(
    card => {

      card.addEventListener(
        "pointermove",
        event => {

          if (
            !window.matchMedia(
              "(pointer:fine)"
            ).matches
          ) {

            return;

          }


          if (
            $("#motion3dToggle")
              ?.checked ===
            false
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


          const factor =
            Number(
              $("#motion3dRange")
                ?.value ||
              100
            ) /
            100;


          card.style.transform =
            `
            perspective(800px)
            translateY(-7px)
            rotateX(${y * -7 * factor}deg)
            rotateY(${x * 7 * factor}deg)
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


  /* =========================================================
     MÚSICA
  ========================================================= */

  const dreamMusic =
    $("#dreamMusic");


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


    const secs =
      Math.floor(
        seconds %
        60
      );


    return `${minutes}:${String(
      secs
    ).padStart(
      2,
      "0"
    )}`;

  }


  function updateMusicUI() {

    if (
      !dreamMusic
    ) {

      return;

    }


    const playing =
      !dreamMusic.paused;


    body.classList.toggle(
      "music-playing",
      playing
    );


    $("#dreamMusicPlayer")
      ?.classList.toggle(
        "playing",
        playing
      );


    if (
      dreamMusicButton
    ) {

      dreamMusicButton.textContent =
        playing
          ? "❚❚"
          : "▶";

    }


    if (
      musicToggle
    ) {

      musicToggle.checked =
        playing;

    }

  }


  async function playMusic() {

    if (
      !dreamMusic
    ) {

      return;

    }


    try {

      await dreamMusic.play();


      updateMusicUI();


      storage.set(
        "dreamMusicEnabled",
        true
      );

    } catch {

      showToast(
        currentLanguage ===
        "pt-BR"
          ? "Clique novamente para tocar a música"
          : "Click again to play the music"
      );

    }

  }


  function pauseMusic() {

    if (
      !dreamMusic
    ) {

      return;

    }


    dreamMusic.pause();


    updateMusicUI();


    storage.set(
      "dreamMusicEnabled",
      false
    );

  }


  dreamMusicButton?.addEventListener(
    "click",
    () => {

      if (
        !dreamMusic
      ) {

        return;

      }


      if (
        dreamMusic.paused
      ) {

        playMusic();

      } else {

        pauseMusic();

      }

    }
  );


  musicToggle?.addEventListener(
    "change",
    event => {

      if (
        event.target.checked
      ) {

        playMusic();

      } else {

        pauseMusic();

      }

    }
  );


  dreamMusic?.addEventListener(
    "play",
    updateMusicUI
  );


  dreamMusic?.addEventListener(
    "pause",
    updateMusicUI
  );


  dreamMusic?.addEventListener(
    "loadedmetadata",
    () => {

      if (
        musicDuration
      ) {

        musicDuration.textContent =
          formatTime(
            dreamMusic.duration
          );

      }

    }
  );


  dreamMusic?.addEventListener(
    "timeupdate",
    () => {

      if (
        musicCurrentTime
      ) {

        musicCurrentTime.textContent =
          formatTime(
            dreamMusic.currentTime
          );

      }


      if (
        musicProgress &&
        Number.isFinite(
          dreamMusic.duration
        ) &&
        dreamMusic.duration >
        0
      ) {

        musicProgress.value =
          (
            dreamMusic.currentTime /
            dreamMusic.duration
          ) *
          100;

      }

    }
  );


  musicProgress?.addEventListener(
    "input",
    event => {

      if (
        !dreamMusic ||
        !Number.isFinite(
          dreamMusic.duration
        ) ||
        dreamMusic.duration <=
        0
      ) {

        return;

      }


      dreamMusic.currentTime =
        (
          Number(
            event.target.value
          ) /
          100
        ) *
        dreamMusic.duration;

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


      dreamMusic.muted =
        !dreamMusic.muted;


      musicMuteButton.textContent =
        dreamMusic.muted
          ? "🔇"
          : "🔊";

    }
  );


  function setMusicVolume(
    value,
    save = true
  ) {

    const safe =
      clamp(
        Number(value) ||
        0,
        0,
        100
      );


    if (
      dreamMusic
    ) {

      dreamMusic.volume =
        safe /
        100;

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
        `${Math.round(
          safe
        )}%`;

    }


    if (
      save
    ) {

      storage.set(
        "dreamMusicVolume",
        safe
      );

    }

  }


  musicVolumeRange?.addEventListener(
    "input",
    event => {

      setMusicVolume(
        event.target.value
      );

    }
  );


  /* =========================================================
     PRESETS
  ========================================================= */

  const presets = {
    dream: {
      primary: "#df76a8",
      secondary: "#9562dc",
      dark: false,
      clean: false,
      performance: false
    },

    cinematic: {
      primary: "#a855f7",
      secondary: "#312e81",
      dark: true,
      clean: false,
      performance: false
    },

    soft: {
      primary: "#f2a6c8",
      secondary: "#a78bfa",
      dark: false,
      clean: true,
      performance: false
    },

    performance: {
      primary: "#df76a8",
      secondary: "#9562dc",
      dark: false,
      clean: false,
      performance: true
    }
  };


  $$(
    ".preset-button"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const preset =
            presets[
              button.dataset.preset
            ];


          if (
            !preset
          ) {

            return;

          }


          $$(
            ".preset-button"
          ).forEach(
            item => {

              item.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );


          applyColors(
            preset.primary,
            preset.secondary
          );


          setDark(
            preset.dark
          );


          body.classList.toggle(
            "clean-mode",
            preset.clean
          );


          if (
            $("#cleanModeToggle")
          ) {

            $("#cleanModeToggle").checked =
              preset.clean;

          }


          storage.set(
            "dreamClean",
            preset.clean
          );


          setPerformance(
            preset.performance
          );


          showToast(
            currentLanguage ===
            "pt-BR"
              ? "Estilo aplicado ✦"
              : "Style applied ✦"
          );

        }
      );

    }
  );


  /* =========================================================
     SECTION INDICATOR
  ========================================================= */

  const sectionIndicator =
    $("#sectionIndicator");


  const sections =
    $$(
      "main section[id]"
    );


  function updateSectionIndicator() {

    if (
      !sectionIndicator ||
      !sections.length
    ) {

      return;

    }


    const position =
      window.scrollY +
      window.innerHeight *
      0.35;


    let current =
      sections[0];


    sections.forEach(
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


    const number =
      sections.indexOf(
        current
      ) +
      1;


    let label =
      current.dataset.sectionName ||
      current.getAttribute(
        "aria-label"
      ) ||
      current.id;


    if (
      currentLanguage ===
      "en-US"
    ) {

      const sectionNames = {
        inicio: "Home",
        produto: "Product",
        campanha: "Campaign",
        notas: "Notes",
        experiencia: "Experience",
        sensacao: "Feeling",
        momentos: "Moments",
        galeria: "Gallery",
        mood: "Mood",
        quiz: "Quiz"
      };


      label =
        sectionNames[
          current.id
        ] ||
        label;

    }


    sectionIndicator.innerHTML =
      `
      <span>
        ${String(
          number
        ).padStart(
          2,
          "0"
        )}
      </span>
      ${label}
      `;

  }


  window.addEventListener(
    "scroll",
    updateSectionIndicator,
    {
      passive: true
    }
  );


  /* =========================================================
     CONFIGURAÇÕES SALVAS
  ========================================================= */

  function readBool(
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


  function loadSettings() {

    applyColors(
      storage.get(
        "dreamPrimary",
        "#df76a8"
      ),

      storage.get(
        "dreamSecondary",
        "#9562dc"
      ),

      false
    );


    setDark(
      readBool(
        "dreamDark",
        false
      ),
      false
    );


    const particlesEnabled =
      readBool(
        "dreamParticles",
        true
      );


    body.classList.toggle(
      "no-particles",
      !particlesEnabled
    );


    if (
      $("#particlesToggle")
    ) {

      $("#particlesToggle").checked =
        particlesEnabled;

    }


    const animationsEnabled =
      readBool(
        "dreamAnimations",
        true
      );


    body.classList.toggle(
      "no-animations",
      !animationsEnabled
    );


    if (
      $("#animationsToggle")
    ) {

      $("#animationsToggle").checked =
        animationsEnabled;

    }


    const cursorEnabled =
      readBool(
        "dreamCursor",
        true
      );


    body.classList.toggle(
      "no-cursor",
      !cursorEnabled
    );


    if (
      $("#cursorToggle")
    ) {

      $("#cursorToggle").checked =
        cursorEnabled;

    }


    const glassEnabled =
      readBool(
        "dreamGlass",
        true
      );


    body.classList.toggle(
      "no-glass",
      !glassEnabled
    );


    if (
      $("#glassToggle")
    ) {

      $("#glassToggle").checked =
        glassEnabled;

    }


    const cleanEnabled =
      readBool(
        "dreamClean",
        false
      );


    body.classList.toggle(
      "clean-mode",
      cleanEnabled
    );


    if (
      $("#cleanModeToggle")
    ) {

      $("#cleanModeToggle").checked =
        cleanEnabled;

    }


    setPerformance(
      readBool(
        "dreamPerformance",
        false
      ),
      false
    );


    if (
      $("#motion3dToggle")
    ) {

      $("#motion3dToggle").checked =
        readBool(
          "dreamMotion3D",
          true
        );

    }


    if (
      $("#hapticToggle")
    ) {

      $("#hapticToggle").checked =
        readBool(
          "dreamHaptic",
          true
        );

    }


    if (
      $("#spraySoundToggle")
    ) {

      $("#spraySoundToggle").checked =
        readBool(
          "dreamSpraySound",
          true
        );

    }


    applyRange(
      "#animationSpeed",
      "#animationSpeedValue",
      "dreamAnimationSpeed",
      Number(
        storage.get(
          "dreamAnimationSpeed",
          100
        )
      ),
      40,
      160,
      safe => {

        root.style.setProperty(
          "--animation-speed",
          safe / 100
        );

      }
    );


    applyRange(
      "#motion3dRange",
      "#motion3dValue",
      "dreamMotion3DIntensity",
      Number(
        storage.get(
          "dreamMotion3DIntensity",
          100
        )
      ),
      0,
      150
    );


    applyRange(
      "#cursorGlowRange",
      "#cursorGlowValue",
      "dreamCursorGlowIntensity",
      Number(
        storage.get(
          "dreamCursorGlowIntensity",
          100
        )
      ),
      0,
      150,
      safe => {

        root.style.setProperty(
          "--cursor-glow-intensity",
          safe / 100
        );

      }
    );


    applyRange(
      "#particleIntensityRange",
      "#particleIntensityValue",
      "dreamParticleIntensity",
      Number(
        storage.get(
          "dreamParticleIntensity",
          100
        )
      ),
      0,
      150
    );


    applyRange(
      "#sprayIntensityRange",
      "#sprayIntensityValue",
      "dreamSprayIntensity",
      Number(
        storage.get(
          "dreamSprayIntensity",
          100
        )
      ),
      40,
      160,
      safe => {

        root.style.setProperty(
          "--spray-intensity",
          safe / 100
        );

      }
    );


    applyRange(
      "#contrastControl",
      "#contrastValue",
      "dreamContrast",
      Number(
        storage.get(
          "dreamContrast",
          100
        )
      ),
      80,
      130,
      safe => {

        body.style.filter =
          `contrast(${safe / 100})`;

      }
    );


    setFontSize(
      storage.get(
        "dreamFontSize",
        "normal"
      )
    );


    setMusicVolume(
      Number(
        storage.get(
          "dreamMusicVolume",
          35
        )
      ),
      false
    );


    setLanguage(
      storage.get(
        "dreamLanguage",
        "pt-BR"
      ),
      false
    );


    generateParticles();


    updateMusicUI();

  }


  /* =========================================================
     RESET
  ========================================================= */

  $("#resetSettings")?.addEventListener(
    "click",
    () => {

      const keys = [
        "dreamPrimary",
        "dreamSecondary",
        "dreamDark",
        "dreamParticles",
        "dreamAnimations",
        "dreamCursor",
        "dreamGlass",
        "dreamClean",
        "dreamPerformance",
        "dreamMotion3D",
        "dreamHaptic",
        "dreamSpraySound",
        "dreamAnimationSpeed",
        "dreamMotion3DIntensity",
        "dreamCursorGlowIntensity",
        "dreamParticleIntensity",
        "dreamSprayIntensity",
        "dreamContrast",
        "dreamFontSize",
        "dreamMusicVolume"
      ];


      keys.forEach(
        key => {

          storage.remove(
            key
          );

        }
      );


      applyColors(
        "#df76a8",
        "#9562dc"
      );


      setDark(
        false
      );


      body.classList.remove(
        "no-particles",
        "no-animations",
        "no-cursor",
        "no-glass",
        "clean-mode",
        "performance-mode",
        "font-small",
        "font-large"
      );


      body.classList.add(
        "font-normal"
      );


      body.style.filter =
        "";


      const toggles = {
        particlesToggle: true,
        animationsToggle: true,
        cursorToggle: true,
        glassToggle: true,
        cleanModeToggle: false,
        performanceToggle: false,
        motion3dToggle: true,
        hapticToggle: true,
        spraySoundToggle: true
      };


      Object.entries(
        toggles
      ).forEach(
        ([id, value]) => {

          const element =
            document.getElementById(
              id
            );


          if (
            element
          ) {

            element.checked =
              value;

          }

        }
      );


      const ranges = {
        animationSpeed: 100,
        motion3dRange: 100,
        cursorGlowRange: 100,
        particleIntensityRange: 100,
        sprayIntensityRange: 100,
        contrastControl: 100
      };


      Object.entries(
        ranges
      ).forEach(
        ([id, value]) => {

          const element =
            document.getElementById(
              id
            );


          if (
            element
          ) {

            element.value =
              value;

          }

        }
      );


      const labels = {
        animationSpeedValue: "100%",
        motion3dValue: "100%",
        cursorGlowValue: "100%",
        particleIntensityValue: "100%",
        sprayIntensityValue: "100%",
        contrastValue: "100%"
      };


      Object.entries(
        labels
      ).forEach(
        ([id, value]) => {

          const element =
            document.getElementById(
              id
            );


          if (
            element
          ) {

            element.textContent =
              value;

          }

        }
      );


      root.style.setProperty(
        "--animation-speed",
        1
      );


      root.style.setProperty(
        "--cursor-glow-intensity",
        1
      );


      root.style.setProperty(
        "--spray-intensity",
        1
      );


      setFontSize(
        "normal"
      );


      setMusicVolume(
        35
      );


      generateParticles();


      showToast(
        currentLanguage ===
        "pt-BR"
          ? "Configurações restauradas ♡"
          : "Settings restored ♡"
      );

    }
  );


  /* =========================================================
     FECHAR MODAIS CLICANDO FORA
  ========================================================= */

  productModal?.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        productModal
      ) {

        closeLayer(
          productModal
        );

      }

    }
  );


  noteModal?.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        noteModal
      ) {

        closeLayer(
          noteModal
        );

      }

    }
  );


  /* =========================================================
     ATALHOS
  ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      const target =
        event.target;


      const typing =
        target instanceof HTMLElement &&
        target.matches(
          "input, textarea, select, [contenteditable='true']"
        );


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


        closeLightbox();


        closeStudio();


        menu?.classList.remove(
          "open"
        );


        menuMobile?.setAttribute(
          "aria-expanded",
          "false"
        );


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

          nextLightbox();

          return;

        }


        if (
          event.key ===
          "ArrowLeft"
        ) {

          prevLightbox();

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

          dreamMusicButton?.click();

          break;


        case "d":

          $("#themeButton")?.click();

          break;


        case "g":

          if (
            settingsPanel?.classList.contains(
              "open"
            )
          ) {

            closeStudio();

          } else {

            openStudio();

          }

          break;

      }

    }
  );


  /* =========================================================
     VISIBILITY
  ========================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden &&
        galleryAutoplayTimer
      ) {

        stopGalleryAutoplay();

      }

    }
  );


  /* =========================================================
     RESIZE
  ========================================================= */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(
          () => {

            updateScroll();


            updateSectionIndicator();


            if (
              window.innerWidth >
              900
            ) {

              menu?.classList.remove(
                "open"
              );


              menuMobile?.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          },
          120
        );

    }
  );


  /* =========================================================
     INICIALIZAÇÃO
  ========================================================= */

  loadSettings();


  updateGalleryUI();


  updateScroll();


  updateSectionIndicator();


  updateTimeline();


  console.log(
    "%cDream ♡ Amor no Ar",
    "color:#df76a8;font-size:22px;font-weight:900;"
  );


  console.log(
    "%cDream JS carregado com sucesso ✦",
    "color:#9562dc;font-size:12px;font-weight:700;"
  );


}); // FIM DO DOMContentLoaded