/* ==========================================================================
   EVERYTHING PERSONAL LIVES IN THIS FILE.
   Change text here; you never need to touch app.js or style.css.

   PHOTOS: put files in assets/photos/ with exactly the names used below
           (.jpg). A missing photo shows a pink "[ ADD PHOTO ]" box.
   SONGS:  put mp3 files in assets/audio/ with the names used in `music`.
   ========================================================================== */

window.VIDU = {

  her: "Vidu",
  him: "Abhi",
  age: 20,
  birthday: "08 · 10 · 2026",

  /* TOP_SECRET passcode (first "first" date, 6 July). Both orders accepted. */
  passcodes: ["0607", "0706"],

  /* how many stars (apps opened) unlock the letter + present. There are 10. */
  starsToUnlock: 7,

  /* ---------- 1. boot screen ---------- */
  boot: [
    "loading vidu's world…",
    "sprinkling glitter…",
    "applying lip gloss…",
    "wrapping headphones around the handbag…",
    "running on schedule. no last-minute changes…",
    "tonight's the night…",
    "almost ready…"
  ],

  /* ---------- 2. incoming call ---------- */
  call: {
    sub: "your boyfriend. your favourite person. calling.",
    declined: [
      "nice try.",
      "you can't decline your own boyfriend.",
      "VIDU. PICK UP.",
      "the decline button is being a gendu. pick up."
    ],
    lines: [
      "is that my baby talking??",
      "IS IT MY BABY???",
      "…okay, that's your line.",
      "but it's your birthday, so today YOU get babied. awlelele.",
      "i made you something. go look."
    ]
  },

  /* ---------- 3. wallpaper ---------- */
  wall: {
    photo: "hero.jpg",
    caption: "the birthday girl",
    hello: "hello,<br>kitten!",
    marquee: [
      "MAIN CHARACTER", "BIRTHDAY GIRL", "20 & GLITTERY", "PIÑA COLADA PRINCESS",
      "ABHI'S FAVOURITE", "NEVER LATE"
    ]
  },

  /* ---------- 4. home screen ---------- */
  home: {
    hello: "hi Vidu",
    hint: "open everything. collect stars. unlock your letter.",
    foot: "ViduOS 20.0 · every joke on this phone was written by Abhi",
    /* tap the footer: she "takes credit", you take it back */
    footStolen: "ViduOS 20.0 · every joke on this phone was written by Vidu ✓",
    footBack: "nice try. credit stolen back. — abhi",
    /* after 10:30 pm (until 5 am) a moon appears next to the clock */
    eepy: {
      title: "🌙 eepy o'clock",
      body: "it's past 10:30.<br>vidu.exe is officially <b>eepy</b>.<br><br>birthday girls are allowed to stay up. just this once.",
      toastOn: "status: eepy. (it's past 10:30.)",
      toastOff: "status: awake. eepy o'clock is 10:30 pm sharp."
    },
    /* the one butterfly that doesn't match */
    butterfly: {
      title: "psst.",
      body: "you found the odd one out.<br><br>the TOP_SECRET folder opens with the day of our <b>first</b> first date.<br>four digits. you know the day."
    },
    hinge: {
      title: "Hinge",
      body: "this app was deleted on purpose.<br><br><i>“designed to be deleted.”</i><br>it did its job. i found you."
    },
    patience: {
      title: "⚠ LOW PATIENCE",
      body: "vidu's patience is at 3%.<br>likely cause: someone was late, or someone changed the plan last minute.<br><br>deploy the emergency kit?",
      button: "SLICE + MILKYBAR",
      done: "patience restored. the plan is back on schedule."
    },
    capsOn: "CAPS LOCK ON — EXCITED VIDU MODE",
    capsOff: "caps lock off. (she's calm. for now.)"
  },

  /* ---------- VIDU.exe ---------- */
  profile: {
    photo: "vidu-profile.jpg",
    handle: "xX_ViDu_Xx",
    quote: "“we're so in sync.”<br>“but the sink is in the bathroom.”",
    rows: [
      ["age", "20 (as of today)"],
      ["mood", "birthday"],
      ["status", "taken. extremely. by Abhi."],
      ["aka", "Vivi · my kitten"]
    ],
    about: "Hi, I'm Vidu. I'm from Lucknow and I'm going to be an international lawyer. I dance with Vilakshan and I'm very good at it. I take every photo on Dazz Cam. I love being babied by Abhi. I love Abhi the most.",
    aboutNote: "(this profile was written by Abhi. it is 100% accurate.)",
    top8: [
      ["💗", "Abhi"],
      ["😌", "Abhi (again)"],
      ["🖤", "BLACKPINK"],
      ["🎤", "Olivia Rodrigo"],
      ["🏎️", "Max Verstappen"],
      ["⚡", "Harry Potter nights"],
      ["🔎", "The Mentalist"],
      ["👑", "Abhi (deserved)"]
    ],
    /* buddy list: [group name, [names], optional note shown beside the first name] */
    buddies: [
      ["boyfriend", ["Abhi"], "always online for you"],
      ["lucknow", ["Kavya", "Gauri", "Tashbeeb"]],
      ["law school", ["Vanshika", "Gayathri", "Sameeksha", "Kavya", "Shivani"]]
    ],
    poll: {
      q: "official poll: who's funnier?",
      a: "Abhi", b: "Vidu",
      pickedA: "correct. thank you for your honesty.",
      pickedB: "vote counted… for Abhi. (the voting machine was built by Abhi.)"
    },
    stickers: [
      ["lily", "lilies", "your flower. every lily on this phone was drawn for you."],
      ["👜", "the handbag", "the handbag with the headphones wrapped around it. i'd spot it across any campus."],
      ["👕", "my shirt", "every date, you make me bring a shirt for you to take back to the hostel. i'm running out of shirts. keep going."],
      ["📸", "dazz cam", "it didn't happen unless it's on dazz cam."],
      ["🌙", "10:30 pm", "the clock strikes 10:30 and you turn eepy. instantly. like a spell."],
      ["🫵", "gendu", "your favourite insult. sarcastic. affectionate. usually deserved."],
      ["🍹", "piña colada", "your drink. noted, filed, memorised."],
      ["🥭", "slice + milkybar", "a bottle of slice and a milkybar: the official comfort kit."],
      ["🍗", "t1", "chicken crispy and biryani from t1. (or ruchi.) nobody orders with more conviction."],
      ["🍢", "tunde kebab", "tunde kebab, your mum's mutton, and that one biryani shop in old lucknow. home."],
      ["🌯", "cali b", "i introduced you to california burrito. you thank me by leaving all the beans and vegetables."],
      ["🧃", "pineapple mosambi", "the canteen's pineapple mosambi juice. elite. no notes."]
    ]
  },

  /* ---------- OUR_MEMORIES ---------- */
  memories: {
    intro: "dazz cam approved. tap a photo to turn it over.",
    list: [
      {
        photo: "first-date.jpg", title: "the first first date", date: "6 july 2025", stamp: "'25 07 06",
        front: "pancakes vs. eggs benedict",
        back: "you ordered pancakes, couldn't finish them, and handed me the plate. i'd ordered eggs benedict and hated it. your leftovers were the best thing i ate that day."
      },
      {
        photo: "seven-sisters.jpg", title: "7 sisters", date: "",
        front: "our first dinner",
        back: "we're lunch-date people. so the first time it was dinner, it felt like a big deal. it was."
      },
      {
        photo: "urban-nemo.jpg", title: "urban nemo → hussain sagar", date: "",
        front: "café, then the lake",
        back: "urban nemo first, then the park by hussain sagar. you, the lake, and nowhere else to be."
      },
      {
        photo: "sattva.jpg", title: "sattva knowledge park", date: "",
        front: "the day we couldn't stop laughing",
        back: "we laughed until we couldn't stop. uncontrollably. in public. nobody makes me laugh like you do."
      },
      {
        photo: "mirame.jpg", title: "mirame", date: "",
        front: "lunch, then ice cream",
        back: "lunch at mirame, then ice cream together. a perfect date has two courses and you in it."
      },
      {
        photo: "chilis.jpg", title: "chili's", date: "",
        front: "and then it rained",
        back: "it started raining outside and everything looked beautiful. the rain was nice too."
      },
      {
        /* no photo on purpose: leave photo empty and the card shows the emoji instead */
        photo: "", emoji: "📞", title: "the call", date: "",
        front: "the night you called",
        back: "we weren't even talking. you called anyway, because i was the one you wanted to talk to. best call i have ever picked up."
      },
      {
        photo: "cali-b.jpg", title: "california burrito", date: "",
        front: "the fight (and the make-up)",
        back: "we had an actual fight inside a cali b. then we made up and had a great time anyway. that's us."
      },
      {
        photo: "harry-potter.jpg", title: "harry potter on gmeet", date: "",
        front: "hogwarts, via google meet",
        back: "two screens, one film, you on the other side of a gmeet. one of my favourite places to be."
      }
    ],
    wallTitle: "the wall",
    /* extra photos for the collage: [file, caption]. Add or remove freely. */
    wall: [
      ["wall-01.jpg", "us"],
      ["wall-02.jpg", "this face"],
      ["wall-03.jpg", "mine"],
      ["wall-04.jpg", "tiny vidu"],
      ["wall-05.jpg", "caught you"],
      ["wall-06.jpg", "favourite"]
    ]
  },

  /* ---------- VIDU_LORE ---------- */
  lore: {
    tagline: "the free encyclopedia that only Abhi can edit",
    summary: "<b>Vidu</b> (born 8 October 2006; full name Vidushi; also <i>Vivi</i>, <i>my kitten</i>) is a law student from Lucknow, a dancer, and the main character. She is best known for being Abhi's girlfriend, a role critics have called “her finest work”.",
    rows: [
      ["Species", "kitten (classification by Abhi)"],
      ["Habitat", "Lucknow → Symbiosis Law School, Hyderabad"],
      ["Occupation", "law student. future international lawyer."],
      ["Also", "dancer with Vilakshan. very good. knows it."],
      ["Language", "English. SWITCHES TO ALL CAPS WHEN EXCITED. also: “awlelele”."],
      ["Bedtime", "becomes eepy at exactly 10:30 pm"],
      ["Diet", "pesto pasta, pizza, and anything her mum cooks"],
      ["Pet peeves", "lateness. last-minute changes of plan. not being in charge of the schedule."],
      ["Fandoms", "BLACKPINK, Olivia Rodrigo, The Mentalist, Harry Potter"],
      ["Movement", "does not walk unless holding Abhi's hand. very stubborn about this."],
      ["Customs duty", "one of Abhi's shirts per date, exported to her hostel"],
      ["Dependents", "one hostel cat (currently expecting)"],
      ["Identifying marks", "handbag with headphones wrapped around it; a smile visible from any distance"],
      ["Favourite person", "Abhi. she may deny this. she is lying."]
    ],
    seasons: [
      ["Season 1", "premiered 6 July 2025"],
      ["Season 2", "renewed March 2026, after one late-night phone call"],
      ["Season 3+", "renewed forever"]
    ],
    controversies: [
      ["Authorship of jokes", "When one party makes a very good joke, the other immediately claims to have made it. No joke in this relationship has a confirmed author."],
      ["“We're so in sync”", "Vidu: “we're so in sync.” Abhi: “but the sink is in the bathroom.” Jointly authored. Listed as a protected heritage joke."],
      ["Lewis Hamilton", "Vidu has ruled that he is not the GOAT. Grounds cited: Kim Kardashian. The ruling is final."]
    ],
    babyPhoto: "vidu-baby.jpg",
    babyCaption: "fig. 1 — early Vidu. already the main character.",
    receipt: {
      head: "FIRST DATE",
      date: "06/07/2025 · table for 2",
      lines: [
        ["1 × PANCAKES (Vidu)", "unfinished"],
        ["   ↳ transferred to Abhi", ""],
        ["1 × EGGS BENEDICT (Abhi)", "0/10"],
        ["   ↳ never again", ""],
        ["1 × HINGE MATCH", "used"],
        ["1 × GIRL OF MY DREAMS", "priceless"]
      ],
      total: "worth it",
      foot: "THANK YOU — COME AGAIN (we did)"
    }
  },

  /* ---------- TOP_SECRET ---------- */
  secret: {
    hints: [
      "",
      "wrong. objection sustained.",
      "hint: one butterfly on the home screen doesn't match the others.",
      "fine. the day of our first first date. DDMM."
    ],
    dept: "MIAMI METRO HOMICIDE · HYDERABAD DIVISION",
    caseNo: "CASE № 0607-ITK",
    title: "The Ice Truck Killer Misinformation Incident",
    rows: [
      ["VICTIM", "Vidu (a.k.a. Vivi, a.k.a. Kitten)"],
      ["SUSPECT", "Abhi"],
      ["CHARGE", "gaslighting in the first degree"],
      ["COUNSEL", "Adv. Vidu, future international lawyer — representing herself, obviously"]
    ],
    summary: "While watching Dexter, the suspect looked the victim in the eye and told her the Ice Truck Killer was <b>definitely not</b> the guy Debra was dating. The victim believed him. Completely.",
    evidence: [
      "Exhibit A — the victim's trusting little face.",
      "Exhibit B — the guy Debra was dating.",
      "Exhibit C — the suspect has shown no remorse and is, in fact, still laughing."
    ],
    statement: "“I stand by it. Rudy seemed like a really nice guy.”",
    verdict: "GUILTY",
    sentence: "Life. With Vidu. No parole. (The suspect was seen smiling as the sentence was read.)",
    sign: "Abhi"
  },

  /* ---------- SLIDE BOX (reasons) ---------- */
  slides: {
    intro: "dexter kept slides. so do i. these are mine — one for every reason. pull one out.",
    list: [
      "You make me laugh. Properly. Sattva-Knowledge-Park, can't-stop, people-are-staring laugh.",
      "The way you pick up my calls: “is that my baby talking, is it my baby???” I would call you just to hear it. I do call you just to hear it.",
      "When I'm too anxious to sleep, you pick up, you calm me down, and you fall asleep on the call with me. You have no idea what that does for me.",
      "The card you made for my birthday made me tear up. This whole phone is me trying to get even.",
      "You are so ambitious. International lawyer. I believe every word of it, and it makes me want to keep up.",
      "Your moral compass. You stand on your principles, even when it would be easier not to.",
      "You're honest. Always. I never have to wonder where I stand with you.",
      "You dance, you're very good at it, and you're proud of it. Watching you be proud of something is one of my favourite things.",
      "Your smile. I would recognise it anywhere, in any crowd.",
      "You love being babied. I love babying you. You're my kitten. That's it. That's the reason."
    ]
  },

  /* ---------- RACE CONTROL ---------- */
  race: {
    radio: "“Vidu, this is Abhi. Box, box. Box for cuddles. Also, George Russell is a very good driver. Over.”",
    idle: "tap to start. react when the lights go out.",
    wait: "wait for it…",
    go: "GO GO GO!",
    jump: "JUMP START! penalty: 5 extra kisses, payable to Abhi.",
    results: [
      [230, "SIMPLY LOVELY. max is nervous."],
      [330, "that's a front-row start."],
      [500, "solid launch. red bull wants your number. they can't have it."],
      [99999, "slow start… you still win. the steward is biased."]
    ],
    standingsTitle: "WORLD CHAMPIONSHIP OF THINGS VIDU LOVES",
    standings: [
      ["1", "ABHI", "Team Boyfriend", "LEADER"],
      ["2", "BLACKPINK", "in your area", "+4.0"],
      ["3", "MAX VERSTAPPEN", "Red Bull Racing", "+33.0"],
      ["4", "TUNDE KEBAB", "Scuderia Lucknow", "+41.2"],
      ["5", "OLIVIA RODRIGO", "good 4 u", "+58.7"],
      ["6", "PESTO PASTA", "Scuderia Carbs", "+1 LAP"],
      ["DNF", "BEANS & VEGETABLES", "left in the burrito bowl", ""],
      ["DSQ", "GEORGE RUSSELL", "entered by Abhi · verdict: gendu", ""]
    ],
    steward: "stewards' note: results are final. the steward is Abhi."
  },

  /* ---------- KITTEN CAM ---------- */
  cat: {
    name: "the hostel cat",
    photo: "cat.jpg",
    status: "expecting ✦ kittens loading…",
    pet: ["purrrr.", "she leans into your hand.", "slow blink. that means i love you.", "she's eating for several now.", "more.", "motor: ON.", "she has chosen you."],
    feed: ["nom.", "she'd like seconds. she's earned it.", "fish accepted.", "that's for the kittens."],
    petsNeeded: 9,
    secret: "nine pets — one for each life.<br><br>she's the hostel's cat.<br><b>you're my kitten.</b><br>— abhi"
  },

  /* ---------- MESSAGES ---------- */
  messages: {
    thread: [
      "happy birthday vidu 💗",
      "i made you an entire phone.",
      "remember when you said “we're so in sync”",
      "and i said “but the sink is in the bathroom”",
      "best joke i ever made. all me."
    ],
    chips: ["I MADE THAT JOKE", "WE MADE THAT JOKE"],
    reply: "awlelele. sure you did 😌",
    after: "one more thing.",
    request: {
      title: "contact update",
      body: "<b>Abhi</b> would like to change his contact name to:<br><span class='dd'>Daddy 😌</span>",
      yes: "ACCEPT",
      no: "never",
      later: "ask me later",
      dodge: ["nope.", "too slow.", "that button is broken. so sad.", "it's almost like it doesn't want to be pressed."],
      accepted: ["FINALLY.", "screenshot taken. this is legally binding."],
      postponed: ["fine.", "one day, vidu. ONE day."]
    }
  },

  /* ---------- iPod ----------
     file: mp3 inside assets/audio/   link: opened if the file isn't there */
  music: {
    autoplayOnCall: true,
    tracks: [
      { title: "Thinkin Bout You", artist: "Frank Ocean", file: "thinkin-bout-you.mp3",
        link: "https://open.spotify.com/search/Thinkin%20Bout%20You%20Frank%20Ocean", note: "ours." },
      { title: "Tere Liye", artist: "", file: "tere-liye.mp3",
        link: "https://open.spotify.com/search/Tere%20Liye", note: "also ours." }
    ]
  },

  /* ---------- CAKE ---------- */
  cake: {
    prompt: "20 candles. swipe across them (or tap) to blow them out.",
    blowAll: "blow 💨",
    done: "20 looks good on you.",
    wish: "wish made? it was about me. that's fine — it already came true."
  },

  /* ---------- THE LETTER ----------
     One string per paragraph. Write it yourself. */
  letter: {
    greeting: "Dear Vidu,",
    body: [
      " Happy Birthday my sweet angel. You deserve everything, and i'm gonna give you exactly that. You should know you are the most important girl in my life, and you mean everything to me.",
      " Hope you have the best 20th b'day (mein hoon so its easy)!!!.  "
    ],
    signoff: "yours (you're stuck with me),",
    name: "Abhi"
  },

  /* ---------- THE PRESENT ---------- */
  present: {
    lead: "one last thing.",
    hold: "i know you don't walk anywhere without holding my hand.<br>so hold it. don't let go.",
    holding: ["hold on…", "don't let go…", "almost…"],
    letGo: "you let go?? hold my hand, vidu.",
    photo: "final.jpg",
    big: ["Happy Birthday,", "Vidu."],
    love: "I love you.",
    ps: "p.s. thinkin bout you. always. — your Abhi"
  }
};
