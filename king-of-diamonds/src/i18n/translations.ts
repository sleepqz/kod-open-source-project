export type LangCode = "fr" | "en" | "pl" | "es" | "ru" | "ar";

export interface T {
  dir: "ltr" | "rtl";
  langName: string;
  home: {
    title: string;
    subtitle: string;
    play: string;
    connecting: string;
    archivedNotice: string;
    viewGithub: string;
    copyright: string;
  };
  botLobby: {
    title: string;
    desc: string;
    nickname: string;
    nicknamePlaceholder: string;
    botCount: string;
    difficulty: string;
    threshold: string;
    start: string;
    back: string;
    easy: string; easyDesc: string;
    medium: string; mediumDesc: string;
    hard: string; hardDesc: string;
    fast: string; standard: string; long: string; marathon: string;
    summary: (bots: number, diff: string, t: number) => string;
  };
  lobby: {
    preparing: string;
    ready: string;
    botsWaiting: (n: number) => string;
    rulesLoading: string;
    connected: string;
    you: string;
    bot: string;
    waitingFor: (n: number) => string;
    starting: string;
    lobbyCode: string;
    clickToCopy: string;
    copied: string;
    players: string;
  };
  game: {
    round: string;
    choose: string;
    yourChoice: string;
    lock: string;
    locked: string;
    spectatorMode: string;
    spectatorDesc: string;
    submitted: (a: number, b: number) => string;
    leave: string;
    critical: string;
    sped: string;
    lives: string;
    eliminated: string;
  };
  roundResult: {
    survived: string;
    lifeLost: string;
    average: string;
    target: string;
    myChoice: string;
    rankByDistance: string;
    you: string;
    nextRound: string;
    victory: string;
  };
  gameOver: {
    won: string;
    died: string;
    wonDesc: string;
    lostDesc: (winner: string) => string;
    nashNote: string;
    nashText: (eq: string, avg: string, target: string) => string;
    backToMenu: string;
    victory: string;
  };
  wasted: {
    title: string;
    subtitle: string;
    spectate: string;
    quit: string;
  };
  rules: string[];
}

const fr: T = {
  dir: "ltr",
  langName: "Français",
  home: {
    title: "Roi de Carreau",
    subtitle: "Le jeu des ⅔ de la moyenne",
    play: "Jouer vs Bots",
    connecting: "Connexion…",
    archivedNotice: "Multijoueur archivé · ",
    viewGithub: "Voir sur GitHub ↗",
    copyright: "slept",
  },
  botLobby: {
    title: "Partie solo",
    desc: "Configurez votre partie contre les bots",
    nickname: "Votre pseudo",
    nicknamePlaceholder: "Joueur",
    botCount: "Nombre de bots",
    difficulty: "Difficulté des bots",
    threshold: "Seuil d'élimination",
    start: "Lancer la partie",
    back: "← Retour",
    easy: "Facile", easyDesc: "Bots aléatoires",
    medium: "Moyen", mediumDesc: "Stratégie mixte",
    hard: "Difficile", hardDesc: "Adaptatifs",
    fast: "Rapide", standard: "Standard", long: "Long", marathon: "Marathon",
    summary: (b, d, t) => `${b} bot${b > 1 ? "s" : ""} · ${d} · Élimination à ${t}`,
  },
  lobby: {
    preparing: "Préparation",
    ready: "Votre partie est prête",
    botsWaiting: (n) => `${n} bot${n > 1 ? "s" : ""} vous attendent`,
    rulesLoading: "Chargement des règles",
    connected: "connecté",
    you: "vous",
    bot: "bot",
    waitingFor: (n) => `En attente de ${n} joueur${n > 1 ? "s" : ""}`,
    starting: "Démarrage en cours",
    lobbyCode: "Code du salon",
    clickToCopy: "Cliquer pour copier",
    copied: "✓ Copié",
    players: "joueurs",
  },
  game: {
    round: "Manche",
    choose: "Choisissez un nombre · Cible = ⅔ × moyenne",
    yourChoice: "Votre choix",
    lock: "Verrouiller",
    locked: "✓ Verrouillé",
    spectatorMode: "Mode spectateur",
    spectatorDesc: "Vous observez la partie. La manche continue sans vous.",
    submitted: (a, b) => `${a} / ${b} soumis`,
    leave: "Quitter la partie",
    critical: "⚡ Critique",
    sped: "↑ Accéléré",
    lives: "Vies",
    eliminated: "Éliminé",
  },
  roundResult: {
    survived: "Survécu ✓",
    lifeLost: "Vie perdue",
    average: "Moyenne",
    target: "Cible ⅔",
    myChoice: "Mon choix",
    rankByDistance: "Classement par distance",
    you: "vous",
    nextRound: "Prochaine manche dans un moment…",
    victory: "★ Victoire",
  },
  gameOver: {
    won: "Réussi",
    died: "Mort",
    wonDesc: "Vous avez survécu au Roi de Carreau",
    lostDesc: (w) => `Vainqueur : ${w}`,
    nashNote: "Note de théorie des jeux",
    nashText: (eq, avg, tgt) =>
      `L'équilibre de Nash de ce jeu est ${eq}. Une itération infinie pousse la cible vers zéro. Mais les humains ne raisonnent pas infiniment — une moyenne typique se situe autour de ${avg}, donnant une cible d'environ ${tgt}. La clé : modélisez vos adversaires, pas les mathématiques.`,
    backToMenu: "Retour au menu",
    victory: "★ Victoire",
  },
  wasted: {
    title: "WASTED",
    subtitle: "Vous avez été éliminé",
    spectate: "Spectater la partie",
    quit: "Quitter",
  },
  rules: [
    "Bienvenue dans le Roi de Carreau.",
    "Un jeu de pur intellect.",
    "À chaque manche, vous choisissez un nombre.",
    "N'importe quel nombre de 0 à 100.",
    "La cible est calculée ainsi :",
    "⅔ × la moyenne de tous les choix.",
    "Celui le plus proche de la cible — gagne.",
    "Les perdants perdent une vie.",
    "Atteindre −5 : vous êtes éliminé.",
    "Le dernier survivant remporte la partie.",
    "…",
    "Ne pensez pas à ce qui est correct.",
    "Pensez à ce que les autres vont choisir.",
    "La partie commence.",
  ],
};

const en: T = {
  dir: "ltr",
  langName: "English",
  home: {
    title: "King of Diamonds",
    subtitle: "The 2/3 of average game",
    play: "Play vs Bots",
    connecting: "Connecting…",
    archivedNotice: "Multiplayer archived · ",
    viewGithub: "View on GitHub ↗",
    copyright: "slept",
  },
  botLobby: {
    title: "Solo game",
    desc: "Configure your game against bots",
    nickname: "Your nickname",
    nicknamePlaceholder: "Player",
    botCount: "Number of bots",
    difficulty: "Bot difficulty",
    threshold: "Elimination threshold",
    start: "Start game",
    back: "← Back",
    easy: "Easy", easyDesc: "Random bots",
    medium: "Medium", mediumDesc: "Mixed strategy",
    hard: "Hard", hardDesc: "Adaptive",
    fast: "Quick", standard: "Standard", long: "Long", marathon: "Marathon",
    summary: (b, d, t) => `${b} bot${b > 1 ? "s" : ""} · ${d} · Elimination at ${t}`,
  },
  lobby: {
    preparing: "Preparing",
    ready: "Your game is ready",
    botsWaiting: (n) => `${n} bot${n > 1 ? "s are" : " is"} waiting for you`,
    rulesLoading: "Loading rules",
    connected: "connected",
    you: "you",
    bot: "bot",
    waitingFor: (n) => `Waiting for ${n} player${n > 1 ? "s" : ""}`,
    starting: "Starting",
    lobbyCode: "Lobby code",
    clickToCopy: "Click to copy",
    copied: "✓ Copied",
    players: "players",
  },
  game: {
    round: "Round",
    choose: "Pick a number · Target = ⅔ × average",
    yourChoice: "Your pick",
    lock: "Lock in",
    locked: "✓ Locked",
    spectatorMode: "Spectator mode",
    spectatorDesc: "You are watching the game. The round continues without you.",
    submitted: (a, b) => `${a} / ${b} submitted`,
    leave: "Leave game",
    critical: "⚡ Critical",
    sped: "↑ Sped up",
    lives: "Lives",
    eliminated: "Eliminated",
  },
  roundResult: {
    survived: "Survived ✓",
    lifeLost: "Life lost",
    average: "Average",
    target: "Target ⅔",
    myChoice: "My pick",
    rankByDistance: "Ranked by distance",
    you: "you",
    nextRound: "Next round in a moment…",
    victory: "★ Win",
  },
  gameOver: {
    won: "Victory",
    died: "Dead",
    wonDesc: "You survived the King of Diamonds",
    lostDesc: (w) => `Winner: ${w}`,
    nashNote: "Game theory note",
    nashText: (eq, avg, tgt) =>
      `The Nash equilibrium of this game is ${eq}. Infinite iteration drives the target toward zero. But humans don't reason infinitely — a typical average lands around ${avg}, giving a target of about ${tgt}. The key: model your opponents, not the math.`,
    backToMenu: "Back to menu",
    victory: "★ Victory",
  },
  wasted: {
    title: "WASTED",
    subtitle: "You have been eliminated",
    spectate: "Spectate",
    quit: "Quit",
  },
  rules: [
    "Welcome to King of Diamonds.",
    "A game of pure intellect.",
    "Each round, you choose a number.",
    "Any number from 0 to 100.",
    "The target is calculated like this:",
    "⅔ × the average of all picks.",
    "The one closest to the target — wins.",
    "Losers lose a life.",
    "Reach −5: you are eliminated.",
    "The last survivor wins.",
    "…",
    "Don't think about what's correct.",
    "Think about what others will choose.",
    "The game begins.",
  ],
};

const pl: T = {
  dir: "ltr",
  langName: "Polski",
  home: {
    title: "Król Karo",
    subtitle: "Gra ⅔ średniej",
    play: "Graj z botami",
    connecting: "Łączenie…",
    archivedNotice: "Multiplayer zarchiwizowany · ",
    viewGithub: "Zobacz na GitHub ↗",
    copyright: "slept",
  },
  botLobby: {
    title: "Gra solo",
    desc: "Skonfiguruj grę przeciwko botom",
    nickname: "Twój nick",
    nicknamePlaceholder: "Gracz",
    botCount: "Liczba botów",
    difficulty: "Poziom trudności",
    threshold: "Próg eliminacji",
    start: "Rozpocznij grę",
    back: "← Wróć",
    easy: "Łatwy", easyDesc: "Losowe boty",
    medium: "Średni", mediumDesc: "Mieszana strategia",
    hard: "Trudny", hardDesc: "Adaptacyjne",
    fast: "Szybko", standard: "Standard", long: "Długo", marathon: "Maraton",
    summary: (b, d, t) => `${b} bot${b > 1 ? "y" : ""} · ${d} · Eliminacja przy ${t}`,
  },
  lobby: {
    preparing: "Przygotowanie",
    ready: "Twoja gra jest gotowa",
    botsWaiting: (n) => `${n} bot${n > 1 ? "y czekają" : " czeka"} na ciebie`,
    rulesLoading: "Ładowanie zasad",
    connected: "połączony",
    you: "ty",
    bot: "bot",
    waitingFor: (n) => `Czekanie na ${n} gracza${n > 1 ? "ch" : ""}`,
    starting: "Uruchamianie",
    lobbyCode: "Kod pokoju",
    clickToCopy: "Kliknij by skopiować",
    copied: "✓ Skopiowano",
    players: "graczy",
  },
  game: {
    round: "Runda",
    choose: "Wybierz liczbę · Cel = ⅔ × średnia",
    yourChoice: "Twój wybór",
    lock: "Zatwierdź",
    locked: "✓ Zatwierdzone",
    spectatorMode: "Tryb widza",
    spectatorDesc: "Obserwujesz grę. Runda trwa bez ciebie.",
    submitted: (a, b) => `${a} / ${b} przesłano`,
    leave: "Opuść grę",
    critical: "⚡ Krytyczny",
    sped: "↑ Przyspieszony",
    lives: "Życia",
    eliminated: "Wyeliminowany",
  },
  roundResult: {
    survived: "Przeżył ✓",
    lifeLost: "Utracono życie",
    average: "Średnia",
    target: "Cel ⅔",
    myChoice: "Mój wybór",
    rankByDistance: "Ranking według odległości",
    you: "ty",
    nextRound: "Następna runda za chwilę…",
    victory: "★ Wygrana",
  },
  gameOver: {
    won: "Wygrana",
    died: "Śmierć",
    wonDesc: "Przeżyłeś Króla Karo",
    lostDesc: (w) => `Zwycięzca: ${w}`,
    nashNote: "Notatka z teorii gier",
    nashText: (eq, avg, tgt) =>
      `Równowaga Nasha tej gry wynosi ${eq}. Nieskończona iteracja spycha cel do zera. Ale ludzie nie rozumują nieskończenie — typowa średnia to około ${avg}, co daje cel około ${tgt}. Klucz: modeluj przeciwników, nie matematykę.`,
    backToMenu: "Powrót do menu",
    victory: "★ Zwycięstwo",
  },
  wasted: {
    title: "WASTED",
    subtitle: "Zostałeś wyeliminowany",
    spectate: "Oglądaj grę",
    quit: "Wyjdź",
  },
  rules: [
    "Witaj w Królu Karo.",
    "Gra czystego intelektu.",
    "W każdej rundzie wybierasz liczbę.",
    "Dowolna liczba od 0 do 100.",
    "Cel jest obliczany w następujący sposób:",
    "⅔ × średnia wszystkich wyborów.",
    "Kto jest najbliżej celu — wygrywa.",
    "Przegrani tracą życie.",
    "Osiągnięcie −5: zostaniesz wyeliminowany.",
    "Ostatni ocalały wygrywa.",
    "…",
    "Nie myśl o tym, co jest prawidłowe.",
    "Myśl o tym, co wybiorą inni.",
    "Gra się zaczyna.",
  ],
};

const es: T = {
  dir: "ltr",
  langName: "Español",
  home: {
    title: "Rey de Diamantes",
    subtitle: "El juego de los ⅔ del promedio",
    play: "Jugar vs Bots",
    connecting: "Conectando…",
    archivedNotice: "Multijugador archivado · ",
    viewGithub: "Ver en GitHub ↗",
    copyright: "slept",
  },
  botLobby: {
    title: "Partida solo",
    desc: "Configura tu partida contra bots",
    nickname: "Tu apodo",
    nicknamePlaceholder: "Jugador",
    botCount: "Número de bots",
    difficulty: "Dificultad de bots",
    threshold: "Umbral de eliminación",
    start: "Iniciar partida",
    back: "← Atrás",
    easy: "Fácil", easyDesc: "Bots aleatorios",
    medium: "Medio", mediumDesc: "Estrategia mixta",
    hard: "Difícil", hardDesc: "Adaptativos",
    fast: "Rápido", standard: "Estándar", long: "Largo", marathon: "Maratón",
    summary: (b, d, t) => `${b} bot${b > 1 ? "s" : ""} · ${d} · Eliminación en ${t}`,
  },
  lobby: {
    preparing: "Preparando",
    ready: "Tu partida está lista",
    botsWaiting: (n) => `${n} bot${n > 1 ? "s" : ""} te esperan`,
    rulesLoading: "Cargando reglas",
    connected: "conectado",
    you: "tú",
    bot: "bot",
    waitingFor: (n) => `Esperando ${n} jugador${n > 1 ? "es" : ""}`,
    starting: "Iniciando",
    lobbyCode: "Código de sala",
    clickToCopy: "Clic para copiar",
    copied: "✓ Copiado",
    players: "jugadores",
  },
  game: {
    round: "Ronda",
    choose: "Elige un número · Objetivo = ⅔ × promedio",
    yourChoice: "Tu elección",
    lock: "Confirmar",
    locked: "✓ Confirmado",
    spectatorMode: "Modo espectador",
    spectatorDesc: "Estás observando. La ronda continúa sin ti.",
    submitted: (a, b) => `${a} / ${b} enviados`,
    leave: "Salir",
    critical: "⚡ Crítico",
    sped: "↑ Acelerado",
    lives: "Vidas",
    eliminated: "Eliminado",
  },
  roundResult: {
    survived: "Sobrevivió ✓",
    lifeLost: "Vida perdida",
    average: "Promedio",
    target: "Objetivo ⅔",
    myChoice: "Mi elección",
    rankByDistance: "Clasificación por distancia",
    you: "tú",
    nextRound: "Próxima ronda en un momento…",
    victory: "★ Victoria",
  },
  gameOver: {
    won: "Victoria",
    died: "Muerto",
    wonDesc: "Sobreviviste al Rey de Diamantes",
    lostDesc: (w) => `Ganador: ${w}`,
    nashNote: "Nota de teoría de juegos",
    nashText: (eq, avg, tgt) =>
      `El equilibrio de Nash es ${eq}. La iteración infinita lleva el objetivo a cero. Pero los humanos no razonan infinitamente — un promedio típico está alrededor de ${avg}, dando un objetivo de unos ${tgt}. Clave: modela a tus rivales, no las matemáticas.`,
    backToMenu: "Volver al menú",
    victory: "★ Victoria",
  },
  wasted: {
    title: "WASTED",
    subtitle: "Has sido eliminado",
    spectate: "Espectar",
    quit: "Salir",
  },
  rules: [
    "Bienvenido al Rey de Diamantes.",
    "Un juego de puro intelecto.",
    "Cada ronda, eliges un número.",
    "Cualquier número del 0 al 100.",
    "El objetivo se calcula así:",
    "⅔ × el promedio de todas las elecciones.",
    "El más cercano al objetivo — gana.",
    "Los perdedores pierden una vida.",
    "Llegar a −5: eres eliminado.",
    "El último superviviente gana.",
    "…",
    "No pienses en qué es correcto.",
    "Piensa en qué elegirán los demás.",
    "El juego comienza.",
  ],
};

const ru: T = {
  dir: "ltr",
  langName: "Русский",
  home: {
    title: "Король Бубей",
    subtitle: "Игра ⅔ среднего значения",
    play: "Играть с ботами",
    connecting: "Подключение…",
    archivedNotice: "Мультиплеер архивирован · ",
    viewGithub: "На GitHub ↗",
    copyright: "slept",
  },
  botLobby: {
    title: "Одиночная игра",
    desc: "Настройте игру против ботов",
    nickname: "Ваш никнейм",
    nicknamePlaceholder: "Игрок",
    botCount: "Количество ботов",
    difficulty: "Сложность ботов",
    threshold: "Порог выбывания",
    start: "Начать игру",
    back: "← Назад",
    easy: "Лёгкий", easyDesc: "Случайные боты",
    medium: "Средний", mediumDesc: "Смешанная стратегия",
    hard: "Сложный", hardDesc: "Адаптивные",
    fast: "Быстро", standard: "Стандарт", long: "Долго", marathon: "Марафон",
    summary: (b, d, t) => `${b} бот${b === 1 ? "" : b < 5 ? "а" : "ов"} · ${d} · Выбывание при ${t}`,
  },
  lobby: {
    preparing: "Подготовка",
    ready: "Ваша игра готова",
    botsWaiting: (n) => `${n} бот${n === 1 ? "" : n < 5 ? "а" : "ов"} ждут вас`,
    rulesLoading: "Загрузка правил",
    connected: "подключён",
    you: "вы",
    bot: "бот",
    waitingFor: (n) => `Ожидание ${n} игрок${n === 1 ? "а" : "ов"}`,
    starting: "Запуск",
    lobbyCode: "Код лобби",
    clickToCopy: "Нажмите для копирования",
    copied: "✓ Скопировано",
    players: "игроков",
  },
  game: {
    round: "Раунд",
    choose: "Выберите число · Цель = ⅔ × среднее",
    yourChoice: "Ваш выбор",
    lock: "Подтвердить",
    locked: "✓ Подтверждено",
    spectatorMode: "Режим наблюдателя",
    spectatorDesc: "Вы наблюдаете. Раунд продолжается без вас.",
    submitted: (a, b) => `${a} / ${b} отправлено`,
    leave: "Покинуть игру",
    critical: "⚡ Критично",
    sped: "↑ Ускорено",
    lives: "Жизни",
    eliminated: "Выбыл",
  },
  roundResult: {
    survived: "Выжил ✓",
    lifeLost: "Жизнь потеряна",
    average: "Среднее",
    target: "Цель ⅔",
    myChoice: "Мой выбор",
    rankByDistance: "Рейтинг по расстоянию",
    you: "вы",
    nextRound: "Следующий раунд через мгновение…",
    victory: "★ Победа",
  },
  gameOver: {
    won: "Победа",
    died: "Смерть",
    wonDesc: "Вы выжили в Короле Бубей",
    lostDesc: (w) => `Победитель: ${w}`,
    nashNote: "Заметка о теории игр",
    nashText: (eq, avg, tgt) =>
      `Равновесие Нэша этой игры — ${eq}. Бесконечная итерация тянет цель к нулю. Но люди не рассуждают бесконечно — типичное среднее около ${avg}, что даёт цель около ${tgt}. Ключ: моделируйте оппонентов, а не математику.`,
    backToMenu: "Вернуться в меню",
    victory: "★ Победа",
  },
  wasted: {
    title: "WASTED",
    subtitle: "Вы выбыли",
    spectate: "Наблюдать",
    quit: "Выйти",
  },
  rules: [
    "Добро пожаловать в Король Бубей.",
    "Игра чистого интеллекта.",
    "Каждый раунд вы выбираете число.",
    "Любое число от 0 до 100.",
    "Цель рассчитывается так:",
    "⅔ × среднее всех выборов.",
    "Ближайший к цели — побеждает.",
    "Проигравшие теряют жизнь.",
    "Достичь −5: вы выбываете.",
    "Последний выживший побеждает.",
    "…",
    "Не думайте о том, что правильно.",
    "Думайте о том, что выберут другие.",
    "Игра начинается.",
  ],
};

const ar: T = {
  dir: "rtl",
  langName: "العربية",
  home: {
    title: "ملك الديامانت",
    subtitle: "لعبة ⅔ المتوسط",
    play: "العب ضد البوتات",
    connecting: "جارٍ الاتصال…",
    archivedNotice: "اللعب الجماعي مؤرشف · ",
    viewGithub: "عرض على GitHub ↗",
    copyright: "slept",
  },
  botLobby: {
    title: "لعبة منفردة",
    desc: "هيّئ لعبتك ضد البوتات",
    nickname: "اسمك",
    nicknamePlaceholder: "لاعب",
    botCount: "عدد البوتات",
    difficulty: "صعوبة البوتات",
    threshold: "عتبة الإقصاء",
    start: "ابدأ اللعبة",
    back: "رجوع →",
    easy: "سهل", easyDesc: "بوتات عشوائية",
    medium: "متوسط", mediumDesc: "استراتيجية مختلطة",
    hard: "صعب", hardDesc: "تكيّفية",
    fast: "سريع", standard: "عادي", long: "طويل", marathon: "ماراثون",
    summary: (b, d, t) => `${b} بوت · ${d} · الإقصاء عند ${t}`,
  },
  lobby: {
    preparing: "تحضير",
    ready: "لعبتك جاهزة",
    botsWaiting: (n) => `${n} بوت ينتظرك`,
    rulesLoading: "تحميل القواعد",
    connected: "متصل",
    you: "أنت",
    bot: "بوت",
    waitingFor: (n) => `انتظار ${n} لاعب`,
    starting: "جارٍ البدء",
    lobbyCode: "رمز الغرفة",
    clickToCopy: "انقر للنسخ",
    copied: "✓ تم النسخ",
    players: "لاعبون",
  },
  game: {
    round: "جولة",
    choose: "اختر رقماً · الهدف = ⅔ × المتوسط",
    yourChoice: "اختيارك",
    lock: "تأكيد",
    locked: "✓ مؤكد",
    spectatorMode: "وضع المتفرج",
    spectatorDesc: "أنت تراقب اللعبة. الجولة مستمرة بدونك.",
    submitted: (a, b) => `${a} / ${b} أُرسل`,
    leave: "مغادرة اللعبة",
    critical: "⚡ حرج",
    sped: "↑ مسرّع",
    lives: "الأرواح",
    eliminated: "مُقصى",
  },
  roundResult: {
    survived: "نجا ✓",
    lifeLost: "روح ضائعة",
    average: "المتوسط",
    target: "الهدف ⅔",
    myChoice: "اختياري",
    rankByDistance: "ترتيب حسب المسافة",
    you: "أنت",
    nextRound: "الجولة القادمة بعد لحظة…",
    victory: "★ فوز",
  },
  gameOver: {
    won: "فوز",
    died: "وفاة",
    wonDesc: "لقد نجوت من ملك الديامانت",
    lostDesc: (w) => `الفائز: ${w}`,
    nashNote: "ملاحظة نظرية اللعبة",
    nashText: (eq, avg, tgt) =>
      `توازن ناش لهذه اللعبة هو ${eq}. التكرار اللانهائي يدفع الهدف نحو الصفر. لكن البشر لا يفكرون بلا حدود — المتوسط الاعتيادي نحو ${avg}، مما يعطي هدفاً نحو ${tgt}. المفتاح: نمذجة خصومك، وليس الرياضيات.`,
    backToMenu: "العودة للقائمة",
    victory: "★ فوز",
  },
  wasted: {
    title: "خُسرت",
    subtitle: "لقد تم إقصاؤك",
    spectate: "مشاهدة اللعبة",
    quit: "خروج",
  },
  rules: [
    "مرحباً بك في ملك الديامانت.",
    "لعبة العقل الصافي.",
    "في كل جولة، تختار رقماً.",
    "أي رقم من 0 إلى 100.",
    "يُحسب الهدف على النحو التالي:",
    "⅔ × متوسط جميع الاختيارات.",
    "الأقرب إلى الهدف — يفوز.",
    "الخاسرون يفقدون روحاً.",
    "بلوغ −5: تُقصى.",
    "الناجي الأخير يفوز.",
    "…",
    "لا تفكر فيما هو صحيح.",
    "فكر فيما سيختاره الآخرون.",
    "تبدأ اللعبة.",
  ],
};

export const TRANSLATIONS: Record<LangCode, T> = { fr, en, pl, es, ru, ar };

export const LANG_OPTIONS: { code: LangCode; label: string; flag: string }[] = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "pl", label: "PL", flag: "🇵🇱" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
  { code: "ar", label: "AR", flag: "🇸🇦" },
];
