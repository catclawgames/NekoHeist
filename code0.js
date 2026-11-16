gdjs.ManorCode = {};
gdjs.ManorCode.localVariables = [];
gdjs.ManorCode.idToCallbackMap = new Map();
gdjs.ManorCode.GDBackgroundObjects1= [];
gdjs.ManorCode.GDRoomObjects1= [];
gdjs.ManorCode.GDBalconyObjects1= [];
gdjs.ManorCode.GDRailObjects1= [];
gdjs.ManorCode.GDRoofObjects1= [];
gdjs.ManorCode.GDFoundationObjects1= [];
gdjs.ManorCode.GDCloudObjects1= [];
gdjs.ManorCode.GDParticleObjects1= [];
gdjs.ManorCode.GDEmoteObjects1= [];
gdjs.ManorCode.GDDogMeterObjects1= [];
gdjs.ManorCode.GDStarObjects1= [];
gdjs.ManorCode.GDSparkleObjects1= [];
gdjs.ManorCode.GDShojiObjects1= [];
gdjs.ManorCode.GDHideObjects1= [];
gdjs.ManorCode.GDOwlObjects1= [];
gdjs.ManorCode.GDGazeObjects1= [];
gdjs.ManorCode.GDSamuraiObjects1= [];
gdjs.ManorCode.GDNinjaObjects1= [];
gdjs.ManorCode.GDKomainuObjects1= [];
gdjs.ManorCode.GDSideLootObjects1= [];
gdjs.ManorCode.GDFishObjects1= [];
gdjs.ManorCode.GDGadgetObjects1= [];
gdjs.ManorCode.GDPointerObjects1= [];
gdjs.ManorCode.GDBossPortraitObjects1= [];
gdjs.ManorCode.GDHatIconObjects1= [];
gdjs.ManorCode.GDCatHatObjects1= [];
gdjs.ManorCode.GDPoofObjects1= [];
gdjs.ManorCode.GDSmokePuffObjects1= [];
gdjs.ManorCode.GDCrestObjects1= [];
gdjs.ManorCode.GDShutterObjects1= [];
gdjs.ManorCode.GDFogObjects1= [];
gdjs.ManorCode.GDVaultObjects1= [];
gdjs.ManorCode.GDTrapObjects1= [];
gdjs.ManorCode.GDDogObjects1= [];
gdjs.ManorCode.GDCatObjects1= [];
gdjs.ManorCode.GDLootObjects1= [];
gdjs.ManorCode.GDSelectorObjects1= [];
gdjs.ManorCode.GDRippleObjects1= [];
gdjs.ManorCode.GDPawObjects1= [];
gdjs.ManorCode.GDPortraitObjects1= [];
gdjs.ManorCode.GDPortraitRingObjects1= [];
gdjs.ManorCode.GDPryGlowObjects1= [];
gdjs.ManorCode.GDCaughtObjects1= [];
gdjs.ManorCode.GDLanternObjects1= [];
gdjs.ManorCode.GDActionBtnObjects1= [];
gdjs.ManorCode.GDPanelObjects1= [];
gdjs.ManorCode.GDLogoObjects1= [];
gdjs.ManorCode.GDButtonObjects1= [];
gdjs.ManorCode.GDSlotObjects1= [];
gdjs.ManorCode.GDKobanObjects1= [];
gdjs.ManorCode.GDTreasureObjects1= [];
gdjs.ManorCode.GDCageObjects1= [];
gdjs.ManorCode.GDToolObjects1= [];
gdjs.ManorCode.GDDimObjects1= [];
gdjs.ManorCode.GDSliderObjects1= [];
gdjs.ManorCode.GDSliderKnobObjects1= [];
gdjs.ManorCode.GDToastObjects1= [];
gdjs.ManorCode.GDRibbonObjects1= [];
gdjs.ManorCode.GDCardObjects1= [];
gdjs.ManorCode.GDMsgBoxObjects1= [];
gdjs.ManorCode.GDCheckObjects1= [];
gdjs.ManorCode.GDStampObjects1= [];
gdjs.ManorCode.GDResultIconObjects1= [];
gdjs.ManorCode.GDSoundBtnObjects1= [];
gdjs.ManorCode.GDHudTextObjects1= [];
gdjs.ManorCode.GDInfoTextObjects1= [];
gdjs.ManorCode.GDLabelObjects1= [];
gdjs.ManorCode.GDWorldTextObjects1= [];


gdjs.ManorCode.userFunc0x9a5b00 = function GDJSInlineCode(runtimeScene) {
"use strict";
// ===================================================================
//  NEKO HEIST (猫の大泥棒)
//  The whole game runs from this JavaScript event. Screens (menu, team,
//  shop, treasury, builder, help, heist) are built from the objects in
//  the scene's object list. Progress is saved in the browser/device
//  storage (localStorage). Tweak the CONFIG block to tune the game.
// ===================================================================
if (!runtimeScene.__neko) runtimeScene.__neko = (function (S) {
  // ================================================================= CONFIG
  const GX = 125, GY = 230;          // top-left of the 9x5 manor grid
  const CW = 150, CH = 120;          // room size
  const COLS = 9, ROWS = 5;
  const FLOOR = 104;                 // y of the floor inside a room
  const CAT_SCALE = 1.2;
  const CAT_W = 84 * CAT_SCALE, CAT_H = 64 * CAT_SCALE;
  const SAVE_KEY = 'nekoHeist.save.v1';
  const VERSION = 'v2.83';
  // Each league has its own look, dog count, trap mix, difficulty and pay.
  //   wake: a dog wakes when its noise meter reaches this.  dogStep: seconds between hunting steps.
  //   winsToNext: wins in this league needed to unlock the next one.
  const LEAGUES = [
    { n: 1, name: 'Bamboo League', short: 'Bamboo', place: 'a countryside manor', dogs: 7, wake: 3.0, dogStep: 0.85, koban: 1.0, winsForBoss: 8,
      boss: { name: "The Elder's Manor", grid: ['D.S.N.D', '.BSPN..', 'S.BV.SD', '..DNB.B', '.S...D.'] },
      traps: ['squeak', 'squeak', 'squeak', 'bell', 'bell', 'bell', 'net', 'net', 'net'],
      rooms: ['wave', 'shoji', 'scroll', 'bamboo', 'crane'], intro: 'Traps: nightingale floors, bell strings, nets.' },
    { n: 2, name: 'Sakura League', short: 'Sakura', place: "a merchant's spring estate", dogs: 8, wake: 2.8, dogStep: 0.75, koban: 1.6, winsForBoss: 9,
      boss: { name: "The Merchant Princess's Estate", grid: ['L.D.P.L', '.CLPL..', 'DSCVDCD', '..NDN..', 'B..O..S'] },
      traps: ['squeak', 'squeak', 'bell', 'bell', 'net', 'lantern', 'lantern', 'caltrops', 'caltrops', 'owl'],
      rooms: ['sakura', 'wisteria', 'shoji', 'scroll', 'wave'], intro: 'New: watch lanterns, caltrops and a watchful owl.' },
    { n: 3, name: 'Snow League', short: 'Snow', place: "the shogun's winter castle", dogs: 9, wake: 2.6, dogStep: 0.68, koban: 2.4, winsForBoss: 5,
      boss: { name: "The Shogun's Keep", grid: ['G.LVK.G', 'P.GPT.T', 'D.C.G.D', '.L.P.L.', 'S.D.D.S'] },
      winsToNext: 0,
      traps: ['squeak', 'squeak', 'bell', 'net', 'lantern', 'caltrops', 'gong', 'gong', 'trapdoor', 'trapdoor', 'owl'], samurai: 2,
      rooms: ['goldpine', 'armor', 'shoji', 'scroll', 'crane'], intro: 'New: gongs, trapdoors and samurai guards.' },
    { n: 4, name: 'Matsuri League', short: 'Matsuri', place: 'a summer-festival teahouse', dogs: 9, wake: 2.5, dogStep: 0.64, koban: 3.2, winsForBoss: 6,
      boss: { name: "The Festival Lord's Teahouse", grid: ['F.JCVLF', '.L.FPJ.', 'D.F.C.J', '.T.L.T.', 'S.J.D.B'] },
      traps: ['squeak', 'bell', 'net', 'lantern', 'caltrops', 'gong', 'trapdoor', 'owl', 'firecracker', 'firecracker', 'firecracker'], samurai: 1, ninja: 2,
      rooms: ['festival', 'goldfish', 'fireworks', 'shoji', 'wave'], intro: 'New: firecrackers and ninja who climb between floors.' },
    { n: 5, name: 'Golden League', short: 'Golden', place: 'the emperor\'s golden pavilion', dogs: 10, wake: 2.4, dogStep: 0.6, koban: 4.0, winsForBoss: 11,
      boss: { name: 'The Golden Pavilion', grid: ['O.WWVKF', 'J.TMPFL', 'K.F.W.K', '.O.L.J.', 'S.M.D.W'] },
      traps: ['squeak', 'bell', 'lantern', 'caltrops', 'gong', 'trapdoor', 'owl', 'firecracker', 'spinwall', 'spinwall', 'komainu', 'komainu'], samurai: 2, ninja: 2,
      rooms: ['maple', 'phoenix', 'goldwave', 'goldpine', 'scroll'], intro: 'New: spinning walls and watchful stone komainu.' },
  ];
  const NL = LEAGUES.length;
  const ENDLESS_ACH = 10;                         // Endless manors in one run for the Unstoppable achievement
  const LANTERN_ON = 1.6, LANTERN_CYCLE = 3.8;   // watch lantern: lit for 1.6s of every 3.8s
  const NIGHT_CHANCE = 0.3, NIGHT_PAY = 1.25;     // night heists: darker, rooms re-dim out of sight
  const LURE_COOLDOWN = 6, LURE_TIME = 5;         // a cat's lure meow
  const DAILY_PAY = 2;                            // first daily win of the day pays double
  const DAILY_REPLAY_PAY = 1 / 3;                 // ...and replaying it after that pays a third
  // Daily Heist: every day's manor comes with a twist that changes how you play. Winning on consecutive days
  // builds a streak that adds +10% pay per day (up to +100%).
  const TWISTS = [
    { id: 'sick',      name: 'Sick day',       desc: 'One of your cats is sick in bed, so the crew is a cat short.' },
    { id: 'samurai',   name: 'Samurai guard',  desc: 'Every guard dog has been swapped for a samurai.' },
    { id: 'onealarm',  name: 'Hair trigger',   desc: 'One alarm and the heist fails.' },
    { id: 'borrowed',  name: 'Borrowed crew',  desc: 'Your team has the day off: five random cats are on the job.' },
    { id: 'moonless',  name: 'Moonless night', desc: 'A pitch-dark night, and the guards wake more easily.' },
    { id: 'nogadgets', name: 'Empty pockets',  desc: 'No gadgets today.' },
    { id: 'creaky',    name: 'Creaky floors',  desc: 'Every sound carries further.' },
    { id: 'patrols',   name: 'Night watch',    desc: 'Two extra patrol dogs roam the manor.' },
  ];
  const STREAK_STEP = 0.1, STREAK_MAX = 10;
  function dayNum(d) { d = d || new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000); }
  function todayTwist() { return TWISTS[(dayNum() * 5 + 3) % TWISTS.length]; }      // cycles through all 8, never the same two days running
  function dailyStreak() {   // the streak still counts if your last daily win was today or yesterday
    const st = SV.dailyStreak || { day: 0, n: 0 };
    return st.day >= dayNum() - 1 ? st.n : 0;
  }
  // Endless Heist (unlocked by beating the final boss): manor after manor, each harder than the last.
  // Cats caught in a manor stay caged for the rest of the run; the run ends when a heist fails.
  const ENDLESS_TRAPS = ['squeak', 'bell', 'net', 'lantern', 'caltrops', 'gong', 'trapdoor', 'owl', 'firecracker', 'spinwall', 'komainu'];
  function endlessUnlocked() { return !!SV.bossBeaten[NL - 1]; }
  function endlessLG(round) {
    const d = round - 1, art = LEAGUES[d % NL];                       // the manor's look cycles Bamboo -> Golden, then around again
    const dogs = Math.min(10, 6 + Math.floor(d / 2));
    let samurai = d >= 2 ? Math.min(3, 1 + Math.floor((d - 2) / 4)) : 0, ninja = d >= 4 ? Math.min(3, 1 + Math.floor((d - 4) / 4)) : 0;
    while (samurai + ninja > dogs - 2) { if (ninja >= samurai && ninja) ninja--; else samurai--; }
    const nTraps = Math.min(13, 8 + Math.floor(d / 2));
    const own = art.traps.slice().sort(() => Math.random() - 0.5).slice(0, Math.ceil(nTraps / 2));   // half in the manor's own style...
    const traps = own.concat(Array.from({ length: nTraps - own.length }, () => ENDLESS_TRAPS[Math.floor(Math.random() * ENDLESS_TRAPS.length)]));   // ...half from anywhere
    for (let i = 0; i < Math.min(2, Math.floor(d / 6)); i++) traps.push('patrol');       // from manor 7, patrol dogs join in
    return Object.assign({}, art, { name: 'Endless manor ' + round, dogs: dogs, samurai: samurai, ninja: ninja, traps: traps,
      wake: Math.max(1.9, 3.0 - d * 0.06), dogStep: Math.max(0.5, 0.85 - d * 0.02), koban: Math.round((2 + d * 0.25) * 100) / 100 });
  }
  function startEndless() {
    SV.endless = { round: 1, out: [], koban: 0, team: SV.team.slice() };   // the team is locked in for the whole run
    save(); go('heist', { endless: true });
  }
  function endEndless() { SV.endless = null; save(); }
  // One upgrade per cat, bought in the Cat Shop's Upgrades tab.
  const UPGRADES = {
    kuro:  { price: 600, desc: 'Jumps are silent too.' },
    tora:  { price: 675, desc: 'Hiss recharges in 8s instead of 15s.' },
    mike:  { price: 750, desc: 'Cracks even faster and pries shutters silently.' },
    shiro: { price: 600, desc: 'Footsteps make half the noise.' },
    hai:   { price: 675, desc: 'Moves even faster.' },
    kin:   { price: 900, desc: '+100% koban instead of +50%.' },
    sora:  { price: 750, desc: 'Sees three rooms ahead.' },
    momo:  { price: 825, desc: 'Also frees caged cats in neighbouring rooms.' },
    goro:  { price: 900, desc: 'Breaks free twice per heist.' },
  };
  const SHARE_ABC = '.VDSBNLCGTPHOKFWJM', SHARE_OUT = 'ABCDEFGHIJKLMNOPQR';   // layout share codes
  // Gadgets: bought in the Cat Shop, carried into every heist until used.
  const GADGETS = {
    fish:  { name: 'Dried fish',     price: 50,  key: 'Q', desc: 'Thrown into the next room: awake dogs on that floor go and eat it for 6 seconds.' },
    rope:  { name: 'Grappling rope', price: 80,  key: 'R', desc: 'Arm it, and the next up or down jump climbs two floors at once.' },
    smoke: { name: 'Smoke bomb',     price: 120, key: 'auto', desc: 'Automatic: the next time a cat is caught, it vanishes in smoke to a balcony.' },
  };
  const GADGET_MAX = 99, GADGET_PER_HEIST = 3;   // own up to 99 of each, use at most 3 of each per heist
  // how many of a gadget can still be used in this heist (practice: unlimited fish/rope)
  function gadgetLeft(id) { return G.practice ? 99 : G.tw === 'nogadgets' ? 0 : Math.min(SV.gadgets[id] || 0, GADGET_PER_HEIST - ((G.gUsed && G.gUsed[id]) || 0)); }
  function gadgetUsed(id) { G.gUsed = G.gUsed || {}; G.gUsed[id] = (G.gUsed[id] || 0) + 1; }
  // Cosmetic hats, equipped per cat on the Team screen.
  const HATS = {
    kasa:    { name: 'Straw kasa',    price: 300, desc: 'A woven straw hat for travelling incognito. Good for rain, better for hiding your face.' },
    kitsune: { name: 'Fox mask',      price: 500, desc: 'A painted fox mask from a shrine festival. Nobody suspects a fox spirit.' },
    sakura:  { name: 'Blossom crown', price: 400, desc: 'A ring of cherry blossoms. Smells lovely; very bad for sneaking past dogs with allergies.' },
    knit:    { name: 'Knit cap',      price: 400, desc: 'A cosy striped cap for cold nights on castle rooftops.' },
    kabuto:  { name: 'Golden kabuto', price: 0, desc: 'The Shogun\'s own golden helmet, crest and all. Proof you robbed the Keep.', ach: 'shogun' },
    phoenix: { name: 'Phoenix crown', price: 25000, endgame: true, desc: 'A gold circlet crowned with real phoenix feathers. It glitters as you sneak - only the richest thief in Japan could afford it.' },
  };
  const HAT_ORDER = ['kasa', 'kitsune', 'sakura', 'knit', 'kabuto', 'phoenix'];
  const SIDE_LOOT = [{ id: 'pouch', name: 'coin pouch', value: 20 }, { id: 'scroll', name: 'scroll', value: 35 }, { id: 'sake', name: 'sake jar', value: 50 }];
  const SIDE_COUNT = 5, HIDE_COUNT = 4;           // side loot and hiding spots per random manor
  const PAY_SCALE = 0.2;                           // all koban rewards are 1/5 of the original tuning
  const TUT_PAY = 20;                              // one-time koban for finishing the training heist
  const OWL_CYCLE = 5.2, OWL_OPEN = 1.4;          // an owl opens its eyes for 1.4s of every 5.2s
  const KOMAINU_CYCLE = 4.5, KOMAINU_OPEN = 1.5;  // komainu: eyes glow 1.5s of every 4.5s, watching its room and the rooms beside it
  const BOSS_LINES = {
    1: { who: 'elder', line: 'My dogs have guarded this house for forty years. Cats? Hmph.' },
    2: { who: 'prince', line: 'Every lantern in my estate is watching, and every coin is counted.' },
    3: { who: 'shogun', line: 'No thief has ever left my keep. You will not be the first.' },
    4: { who: 'lord', line: 'Fireworks, drums, a thousand lanterns... and my ninja see in the dark.' },
    5: { who: 'emperor', line: 'The Golden Pavilion has stood for five hundred years. It will not fall to cats.' },
  };

  const CATDEFS = {
    kuro:  { name: 'Kuro',  title: 'the Shadow',   price: 0,   desc: 'Walks without making a sound.' },
    tora:  { name: 'Tora',  title: 'the Brave',    price: 0,   desc: 'Hisses an awake dog back to sleep (recharges in 15s).' },
    mike:  { name: 'Mike',  title: 'the Lockpick', price: 0,   desc: 'Cracks the vault 3x faster without tripping its alarm, and can pry shut shutters open.' },
    shiro: { name: 'Shiro', title: 'Light Paws',   price: 500,   desc: 'Disarms traps instead of setting them off. Trapdoors, spinning walls and firecrackers still get her.' },
    hai:   { name: 'Hai',   title: 'the Swift',    price: 0,   desc: 'Moves faster and lands jumps silently.' },
    kin:   { name: 'Kin',   title: 'the Lucky',    price: 300, desc: '+50% koban from every heist while on the team.' },
    sora:  { name: 'Sora',  title: 'the Lookout',  price: 0, desc: 'Sees two rooms ahead in every direction.' },
    momo:  { name: 'Momo',  title: 'the Rescuer',  price: 700, desc: 'Frees caged teammates by walking into their room.' },
    goro:  { name: 'Goro',  title: 'the Tough',    price: 900, desc: 'Breaks free the first time he is caught and flees to a balcony.' },
  };
  const CAT_ORDER = ['kuro', 'tora', 'mike', 'sora', 'hai', 'kin', 'shiro', 'momo', 'goro'];
  const TREASURES = [
    { id: 'teabowl', name: 'Raku Tea Bowl', w: 5 }, { id: 'fan', name: 'Silk Sensu Fan', w: 5 },
    { id: 'kokeshi', name: 'Kokeshi Doll', w: 5 }, { id: 'tsuba', name: 'Katana Tsuba', w: 4 },
    { id: 'maneki', name: 'Golden Maneki-neko', w: 3 }, { id: 'koi', name: 'Golden Koi', w: 3 },
    { id: 'jade', name: 'Jade Magatama', w: 2 }, { id: 'pearl', name: 'Moon Pearl', w: 1 },
  ];
  const ACHIEVEMENTS = [
    { id: 'first',     name: 'First Score',    desc: 'Win a heist' },
    { id: 'silent',    name: 'Silent Paws',    desc: 'Win without raising an alarm' },
    { id: 'flawless',  name: 'Nine Lives',     desc: 'Win without losing a cat' },
    { id: 'speed',     name: 'Swift Getaway',  desc: 'Win in under 60 seconds' },
    { id: 'collector', name: 'Collector',      desc: 'Find every treasure' },
    { id: 'architect', name: 'Architect',      desc: 'Save a custom manor' },
    { id: 'rich',      name: 'Fat Cat',        desc: 'Earn 2000 koban in total' },
    { id: 'roster',    name: 'Full Roster',    desc: 'Unlock every cat' },
    { id: 'perfect',   name: 'Perfect Heist',  desc: 'Win with no alarms and no cats caught' },
    { id: 'daily',     name: 'Daily Devotion', desc: 'Win a daily heist' },
    { id: 'shogun',    name: 'Shogun Slayer',  desc: "Beat the Shogun's Keep" },
    { id: 'legend',    name: 'Master Thief',   desc: 'Rob the Golden Pavilion' },
    { id: 'spender',   name: 'Big Spender',    desc: 'Buy every cat, upgrade and hat in the Cat Shop' },
    { id: 'endless',   name: 'Unstoppable',    desc: 'Clear ' + ENDLESS_ACH + ' manors in one Endless run' },
  ];
  const TRAP_NAMES = { squeak: 'nightingale floor', bell: 'bell string', net: 'net trap', lantern: 'watch lantern',
                       caltrops: 'caltrops', gong: 'gong', trapdoor: 'trapdoor', firecracker: 'firecrackers', spinwall: 'spinning wall' };
  const TRAP_CH = { squeak: 'S', bell: 'B', net: 'N', lantern: 'L', caltrops: 'C', gong: 'G', trapdoor: 'T', owl: 'O', hide: 'H',
                    firecracker: 'F', spinwall: 'W', komainu: 'M' };
  const CH_ITEM = { V: 'vault', D: 'dog', P: 'patrol', K: 'samurai', J: 'ninja', O: 'owl', M: 'komainu', H: 'hide', F: 'firecracker', W: 'spinwall', S: 'squeak', B: 'bell', N: 'net', L: 'lantern', C: 'caltrops', G: 'gong', T: 'trapdoor' };
  const TOOLS = [
    { ch: '.', anim: 'empty',  name: 'Empty room', league: 1 }, { ch: 'V', anim: 'vault', name: 'Vault (only one)', league: 1 },
    { ch: 'D', anim: 'dog',    name: 'Guard dog', league: 1 }, { ch: 'P', anim: 'patrol', name: 'Patrol dog', league: 2 },
    { ch: 'K', anim: 'samurai', name: 'Samurai', league: 3 }, { ch: 'O', anim: 'owl', name: 'Owl', league: 2 },
    { ch: 'H', anim: 'hide',   name: 'Hiding spot', league: 1 },
    { ch: 'J', anim: 'ninja',  name: 'Ninja', league: 4 },     { ch: 'F', anim: 'firecracker', name: 'Firecrackers', league: 4 },
    { ch: 'M', anim: 'komainu', name: 'Komainu', league: 5 },  { ch: 'W', anim: 'spinwall', name: 'Spinning wall', league: 5 },  { ch: 'S', anim: 'squeak', name: 'Nightingale floor', league: 1 },
    { ch: 'B', anim: 'bell',   name: 'Bell string', league: 1 }, { ch: 'N', anim: 'net',   name: 'Net trap', league: 1 },
    { ch: 'L', anim: 'lantern', name: 'Watch lantern', league: 2 }, { ch: 'C', anim: 'caltrops', name: 'Caltrops', league: 2 },
    { ch: 'G', anim: 'gong',   name: 'Gong', league: 3 },         { ch: 'T', anim: 'trapdoor', name: 'Trapdoor', league: 3 },
  ];
  const CHATTER = {
    kuro: ['...', 'Shh.', 'I was never here.'], tora: ['Bring on the dogs!', 'Grrr-meow!', 'Fear me!'],
    mike: ['Any lock, any time.', 'Click, click, open.', 'Nya-ha!'], shiro: ['Step where I step.', 'Traps? What traps?', 'Mrrp.'],
    hai: ['Too slow!', 'Zoom!', 'Catch me if you can!'], kin: ['Smells like koban!', 'Lucky day!', 'Shiny!'],
    sora: ['I see everything.', 'Two rooms ahead...', 'Look up!'], momo: ['Nobody gets left behind!', 'I have the key!', 'Nyaa~'],
    goro: ['Hmph.', 'Let them try.', 'Let\'s go.'],
  };
  const INK = '40;32;28', CREAM = '240;228;200';

  // ================================================================= helpers
  const im = S.getGame().getInputManager();
  const OBJS = [];                   // every object of the current screen
  let BTNS = [];
  const prevKeys = {};
  let mouseWas = false, pressX = 0, pressY = 0;
  let screen = null, scr = {};
  let G = null;                      // heist state

  function mk(name, x, y, z, layer) {
    const o = S.createObject(name);
    if (!o) throw new Error('Neko Heist: missing object "' + name + '"');
    if (layer) o.setLayer(layer);
    o.setPosition(x, y);
    o.setZOrder(z || 0);
    OBJS.push(o);
    return o;
  }
  const M = mk;
  function U(name, x, y, z) { return mk(name, x, y, z, 'UI'); }
  function kill(o) { if (!o) return; const i = OBJS.indexOf(o); if (i >= 0) { OBJS.splice(i, 1); o.deleteFromScene(S); } }
  function clearScreen() { while (OBJS.length) OBJS.pop().deleteFromScene(S); BTNS = []; }
  function anim(o, a) { if (o.getAnimationName && o.getAnimationName() === a) return; o.setAnimationName(a); }
  const LANG_JA = { "dict": {"\"My dogs have guarded this house for forty years.": "「わしの犬どもは四十年この家を守ってきた。", "My dogs have guarded this house for forty years.": "わしの犬どもは四十年この家を守ってきた。", "Cats?": "猫だと？", "Hmph.\"": "ふん。」", "Hmph.": "ふん。", "Every lantern in my estate is watching, and every coin is counted.": "わたくしの屋敷の灯籠はすべて見張っておりますの。小判も一枚残らず数えてありますわ。", "\"Every lantern in my estate is watching, and every coin is counted.\"": "「わたくしの屋敷の灯籠はすべて見張っておりますの。小判も一枚残らず数えてありますわ。」", "\"No thief has ever left my keep.": "「わが天守から逃げおおせた盗人はおらぬ。", "No thief has ever left my keep.": "わが天守から逃げおおせた盗人はおらぬ。", "You will not be the first.\"": "お前たちも同じだ。」", "You will not be the first.": "お前たちも同じだ。", "\"Fireworks, drums, a thousand lanterns...": "「花火に太鼓、千の提灯…", "Fireworks, drums, a thousand lanterns...": "花火に太鼓、千の提灯…", "and my ninja see in the dark.\"": "わしの忍者は闇でも見えるぞ。」", "and my ninja see in the dark.": "わしの忍者は闇でも見えるぞ。", "\"% has stood for five hundred years.": "「{t1}は五百年建ち続けてきた。", "% has stood for five hundred years.": "{t1}は五百年建ち続けてきた。", "It will not fall to cats.\"": "猫ごときに落とされはせぬ。」", "It will not fall to cats.": "猫ごときに落とされはせぬ。", "% falls silent behind you.": "背後で{t1}は静まり返った。", "Five small shadows slip across the golden rooftops at dusk, a green bundle of treasure bouncing between them.": "夕暮れの金色の屋根を、五つの小さな影が駆けていく。緑の風呂敷包みを弾ませながら。", "By morning, all of Japan is whispering about the cat burglars who robbed the Elder, the Merchant Prince, the Shogun, the Festival Lord and the Emperor himself, and never left a single paw print.": "翌朝には日本中がうわさしていた。長老、豪商、将軍、祭り殿、そして帝までも出し抜き、足跡ひとつ残さなかった猫の大泥棒たちのことを。", "Your crew is the greatest in Japan.": "あなたの一味は日本一だ。", "But there are always more manors, and the daily heist is waiting.": "だが屋敷はまだまだある。今日の盗みも待っている。", "Thank you for playing Neko Heist!": "猫の大泥棒を遊んでくれてありがとう！", "Made with GDevelop.": "GDevelopで制作。", "Epilogue": "エピローグ", "Back to the menu": "メニューに戻る", "The Emperor's treasure is yours.": "帝のお宝はあなたのものだ。", "You are the greatest cat burglars in Japan!": "あなたたちは日本一の猫の大泥棒だ！", "# alarm": "警報{n1}回", "# alarms": "警報{n1}回", "# cats": "{n1}匹", "# caught": "捕獲{n1}匹", "# guards": "番人{n1}", "#/# cats": "{n1}/{n2}匹", "#m": "{n1}分", "#s.": "{n1}秒。", "(# left)": "（残り{n1}）", "(# seconds)": "（{n1}秒）", "(* boss beaten)": "（＊ボス撃破）", "(none)": "（なし）", "(typing is not available on this device)": "（この端末では入力できません）", "+# side loot": "おまけのお宝 +{n1}", "no side loot": "おまけのお宝なし", "best!": "最速！", "not yet": "まだ", "∞": "∞", "Alarms #": "警報 {n1}", "Shutters #/#": "雨戸 {n1}/{n2}", "Guards #": "番人 {n1}", "Traps #": "罠 {n1}", "Vault NO": "金庫 なし", "Vault yes": "金庫 あり", "% - Night": "{t1}・夜", "BOSS": "ボス", "BOSS - Night": "ボス・夜", "Daily - Night": "日替わり・夜", "Practice": "練習", "Training": "訓練", "dark night": "闇夜", "a dark night": "闇夜", "Pay ×#": "報酬×{n1}", "League # of #": "リーグ {n1} / {n2}", "Slot #": "枠{n1}", "Upgrade #": "{n1}で強化", "Buy #": "{n1}で購入", "Owned: # / #": "所持: {n1} / {n2}", "Cracking #%": "解錠中 {n1}%", "Cracking #% x#": "解錠中 {n1}% ×{n2}", "Wins: # / # to open the boss manor": "勝利 {n1} / {n2} でボスの屋敷が開く", "Wins toward the boss": "ボスまでの勝利数", "Wins toward the boss: # / #": "ボスまでの勝利数: {n1} / {n2}", "Boss beaten!": "ボス撃破！", "Wins here: #": "このリーグの勝利: {n1}", "The boss awaits: %": "ボスが待っている: {t1}", "Win # more heists first!": "あと{n1}回勝とう！", "Win # more heist first!": "あと{n1}回勝とう！", "Rob %.": "{t1}に忍び込め。", "Rob %": "{t1}に盗みに入る", "Traps: nightingale floors, bell strings, nets.": "罠: 鶯張りの床、鈴の紐、網。", "New: watch lanterns, % and a watchful owl.": "新登場: 見張り灯籠、{t1}、目を光らせる梟。", "New: gongs, trapdoors and samurai guards.": "新登場: 銅鑼、落とし穴、侍の番人。", "New: % and ninja who climb between floors.": "新登場: {t1}と、階を行き来する忍者。", "New: spinning walls and watchful stone komainu.": "新登場: どんでん返しと、見張る石の狛犬。", "Start Heist": "盗みに出る", "Daily Heist": "日替わりの盗み", "Daily Heist (done)": "日替わりの盗み（済）", "Team": "仲間", "Cat Shop": "猫の店", "Treasury": "宝物庫", "Manor Builder": "屋敷づくり", "Info": "案内", "Settings": "設定", "Boss Manor": "ボスの屋敷", "Rematch Boss": "ボスに再挑戦", "Daily ranks": "日替わり順位", "Back": "戻る", "Menu": "メニュー", "Close": "閉じる", "Copy": "コピー", "Load": "読み込む", "Skip": "とばす", "Play": "遊ぶ", "Save": "保存", "Random": "おまかせ", "Clear": "消去", "Share": "共有", "Import": "取り込む", "Edit": "編集", "Edit manor": "屋敷を編集", "Play again": "もう一度", "Try again": "やり直す", "Next manor": "次の屋敷", "Train again": "もう一度訓練", "Change": "変更", "Turn on": "オンにする", "Turn off": "オフにする", "Reset...": "リセット…", "Tap again to ERASE": "もう一度タップで消去", "Take off hat": "帽子を外す", "On": "オン", "Off": "オフ", "Completed": "完了", "Not played": "未プレイ", "New to cat burglary?": "猫の泥棒は初めて？", "A short training heist shows you the ropes: sneaking, noise, hiding, and cracking the vault.": "短い訓練で基本を覚えよう。忍び足、物音、隠れ方、金庫破り。", "Play training heist": "訓練をする", "Play the training heist": "訓練をする", "Music volume": "音楽の音量", "Sound effects": "効果音", "Vibration": "振動", "Thief name": "泥棒の名前", "Training heist": "訓練", "Reset progress": "進行をリセット", "Language": "言語", "Controls": "操作", "choose a cat": "猫を選ぶ", "move": "移動", "move (touch)": "移動（タッチ）", "action": "行動", "throw fish": "魚を投げる", "arm rope": "縄を構える", "next cat": "次の猫", "mute": "消音", "menu": "メニュー", "swipe": "スワイプ", "Arrows/WASD": "矢印/WASD", "This erases koban, cats, treasures, wins, stats and saved manors.": "小判、猫、お宝、勝利、記録、保存した屋敷がすべて消えます。", "Progress erased.": "進行を消去しました。", "A fresh start!": "新たな門出だ！", "Your thief name": "あなたの泥棒の名前", "Shown on the daily leaderboard.": "日替わり順位表に表示されます。", "Midnight Paws": "真夜中の肉球", "Anonymous cat": "名無しの猫", "How to Play": "遊び方", "Guards": "番人", "Traps": "罠", "Cats & Gadgets": "猫と道具", "Stats": "記録", "All leagues": "全リーグ", "From the %": "{t1}から", "Sneak into the manor, find the hidden vault, crack it, and escape to a balcony with the loot.": "屋敷に忍び込み、隠された金庫を見つけて破り、お宝を持って縁側へ逃げよう。", "Choose a cat with #-# or by tapping its portrait, then press Left/Right or tap a balcony to send it in.": "{n1}〜{n2}キーか肖像のタップで猫を選び、左右キーか縁側のタップで送り込もう。", "Move with WASD, the arrow keys, or by swiping.": "WASD、矢印キー、スワイプで移動。", "Up and down jump between floors.": "上下で階を跳び移る。", "A cat can only move again once its walk or jump has finished.": "歩きや跳躍が終わるまで次の移動はできない。", "Space, E or the red button does the right thing for where you are: crack the vault, hide in a wardrobe, pry a shutter (@), or meow to lure dogs.": "スペース・E・赤いボタンで、その場に合った行動をする。金庫破り、箪笥に隠れる、雨戸をこじ開ける（{c1}）、鳴いて犬をおびき寄せる。", "Every step makes noise; enough wakes a dog, and each alarm slams a shutter shut.": "一歩ごとに物音が立つ。たまると犬が起き、警報のたびに雨戸が閉まる。", "Opening the vault sets off its alarm unless @ helps crack it.": "{c1}が金庫破りに加わらないと、金庫を開けたとき警報が鳴る。", "Escape with the loot to win the heist.": "お宝を持って逃げれば勝ち。", "Enough wins in a league unlock its boss manor; beat the boss to reach the next league.": "リーグで十分に勝つとボスの屋敷が開く。ボスを倒せば次のリーグへ。", "Sleeps until noise fills its bubble, then barks (a shutter slams) and hunts cats on its floor.": "吹き出しが物音で満ちるまで眠り、起きると吠えて（雨戸が閉まる）その階の猫を追う。", "Cannot jump floors.": "階は跳び移れない。", "Never sleeps: paces its floor back and forth.": "眠らない。階を行ったり来たりする。", "Found in boss manors and the Builder.": "ボスの屋敷と屋敷づくりに登場。", "Sleeps very deeply, but once awake he is fast, and @'s hiss does not scare him.": "ぐっすり眠るが、起きると素早く、{c1}の威嚇も効かない。", "Wakes like a dog, but hunts the nearest cat on ANY floor, leaping up and down between floors.": "犬のように目を覚ますが、どの階でも一番近い猫を追い、階を跳び移る。", "Hide to shake him off.": "隠れればまける。", "Opens its eyes every few seconds and watches its whole floor.": "数秒ごとに目を開け、階全体を見張る。", "Be hidden or off that floor.": "隠れるか、別の階にいよう。", "A stone lion-dog.": "石の獅子犬。", "Its eyes blaze every few seconds and it roars at cats in its room or the rooms beside it.": "数秒ごとに目が光り、同じ部屋と両隣の部屋の猫に吠える。", "Wardrobes and screens.": "箪笥と屏風。", "Press the action button to hide; nothing can see or catch you there.": "行動ボタンで隠れる。隠れている間は見つからず、捕まらない。", "Coin pouches, scrolls and sake jars worth bonus koban - paid only if the heist succeeds.": "小銭袋、巻物、酒瓶はおまけの小判になる。盗みが成功したときだけもらえる。", "Squeaks loudly every time a cat crosses it.": "猫が通るたびに大きく鳴る。", "It never runs out.": "いつまでも鳴り続ける。", "Rings the alarm once: a shutter slams shut.": "一度だけ警報を鳴らす。雨戸が閉まる。", "Holds the cat for # seconds.": "猫を{n1}秒間とらえる。", "Lit #s of every #s.": "{n2}秒ごとに{n1}秒灯る。", "Be in its room while lit and the alarm sounds.": "灯っている間にその部屋にいると警報が鳴る。", "The cat yowls and is stunned for # seconds.": "猫が悲鳴を上げ、{n1}秒間動けなくなる。", "An enormous BWONG that can wake every dog on the floor.": "階じゅうの犬を起こしかねない大音響。", "Drops the cat into the room below.": "猫を下の部屋に落とす。", "A huge bang, once.": "一度だけ大きな爆音。", "The noise spills into the rooms left, right, above and below.": "音は左右と上下の部屋にも広がる。", "The first cat through is spun straight back to the room it came from.": "最初に通った猫は元の部屋へくるりと戻される。", "After that it stays open.": "その後は開いたまま。", "Teamwork: any cat can MEOW (action button with nothing else to do) to lure awake dogs on its floor to its room for # seconds.": "チームワーク: どの猫も鳴ける（他にすることがないときの行動ボタン）。同じ階の起きた犬を{n1}秒間その部屋へおびき寄せる。", "Dogs will not step into a room where @ stands.": "{c1}のいる部屋には犬が入ってこない。", "Cats cracking a vault together add their speed, and boss vaults need two at once.": "一緒に金庫を破ると速くなる。ボスの金庫は二匹同時に必要。", "@ frees caged teammates.": "{c1}は檻の仲間を助け出す。", "Gadgets (Cat Shop): % (Q) is thrown into the next room and awake dogs on that floor go eat it.": "道具（猫の店）: {t1}（Q）は隣の部屋に投げ、その階の起きた犬が食べに行く。", "The % (R) makes your next up/down jump climb two floors.": "{t1}（R）を使うと次の上下の跳躍で二階分登れる。", "A % is used automatically to escape a capture.": "{t1}は捕まりそうなとき自動で使われる。", "Gadgets you own come on every heist until used.": "持っている道具は使うまで毎回持っていく。", "Upgrades (Cat Shop) give each cat one extra edge.": "強化（猫の店）で各猫に一つ特技が増える。", "Hats (Cat Shop, Wardrobe) are just for style: equip them on the Team screen.": "帽子（猫の店・衣装）はおしゃれ用。仲間の画面でかぶせよう。", "Noise bubbles: a bubble over a sleeping dog fills up and turns red as noise reaches it.": "物音の吹き出し: 眠る犬の上の吹き出しは、物音が届くと満ちて赤くなる。", "When it lifts its head and opens an eye, it is about to wake.": "頭を上げて片目を開けたら、もうすぐ起きる。", "Noise fades slowly, so waiting is often the safe move.": "物音はゆっくり消えるので、待つのが安全なことも多い。", "Heists": "盗み", "Loot": "戦利品", "Sneaking": "忍び", "Heists finished": "終えた盗み", "Wins": "勝利", "Losses": "敗北", "Perfect wins": "完璧な勝利", "Night wins": "夜の勝利", "Daily wins": "日替わりの勝利", "Boss wins": "ボスでの勝利", "Bosses beaten": "倒したボス", "Fastest heist": "最速の盗み", "Time played": "プレイ時間", "Koban now": "今の小判", "Koban earned": "稼いだ小判", "Best payout": "最高の稼ぎ", "Vaults cracked": "破った金庫", "Treasures found": "見つけたお宝", "Achievements": "実績", "Cats unlocked": "仲間にした猫", "Upgrades bought": "買った強化", "Rooms walked": "歩いた部屋", "Floors jumped": "跳んだ階", "Dogs woken": "起こした犬", "Alarms raised": "鳴らした警報", "Traps sprung": "かかった罠", "Traps disarmed": "外した罠", "Lure meows": "おびき寄せの鳴き声", "Hisses / escapes": "威嚇 / 脱出", "Caught / rescued": "捕獲 / 救出", "Favourite burglar": "お気に入りの泥棒", "Sent on # heist.": "{n1}回出撃。", "Sent on # heists.": "{n1}回出撃。", "Practice runs are not counted.": "練習は数えません。", "Play a heist to start collecting stats.": "盗みをすると記録がたまります。", "Summary": "まとめ", "Koban": "小判", "Total earned": "総獲得", "Cats caught": "捕まった猫", "Daily heist": "日替わりの盗み", "Wins per league": "リーグ別の勝利", "Treasures": "お宝", "Earn # koban in total": "小判を合計{n1}枚稼ぐ", "Win a heist": "盗みに成功する", "Win without raising an alarm": "警報を鳴らさずに勝つ", "Win without losing a cat": "一匹も捕まらずに勝つ", "Win in under # seconds": "{n1}秒以内に勝つ", "Find every treasure": "お宝をすべて見つける", "Save a custom manor": "自作の屋敷を保存する", "Unlock every cat": "猫を全員仲間にする", "Win with no alarms and no cats caught": "警報なし、捕獲なしで勝つ", "Win a daily heist": "日替わりの盗みに勝つ", "Beat %": "{t1}を倒す", "Your Team": "あなたの仲間", "Roster": "名簿", "Hats": "帽子", "Tap a cat or hat to read about it.": "猫や帽子をタップすると説明が読める。", "Drag a cat onto a team slot to add it.": "猫を仲間の枠へドラッグして加えよう。", "Drag a hat onto a cat to put it on.": "帽子を猫へドラッグしてかぶせよう。", "A cat you have not met yet": "まだ出会っていない猫", "Recruit in the Cat Shop for # koban.": "猫の店で小判{n1}枚で仲間にできる。", "On your team (slot #).": "仲間に入っている（枠{n1}）。", "In the roster: drag onto a team slot to bring them along.": "名簿にいる。仲間の枠へドラッグして連れて行こう。", "Upgrade: +#% koban instead of +#%.": "強化: 小判 +{n2}%ではなく+{n1}%。", "No hat.": "帽子なし。", "Drag one onto this cat.": "この猫へドラッグしてかぶせよう。", "Wearing the %.": "{t1}をかぶっている。", "In your wardrobe": "衣装棚にある", "Reward hat": "ごほうびの帽子", "Drag it onto any cat to put it on.": "どの猫にもドラッグしてかぶせられる。", "Drag a hat off a team cat to take it off.": "仲間の猫から帽子をドラッグして外せる。", "Earned by beating %.": "{t1}を倒すともらえる。", "Buy it in the Cat Shop (Wardrobe tab).": "猫の店（衣装）で買える。", "Hats are just for style.": "帽子はおしゃれ用。", "Worn by: ": "かぶっている猫: ", "@ joins the team!": "{c1}が仲間に加わった！", "@ moves to slot #": "{c1}は枠{n1}へ", "@ puts on the %!": "{c1}は{t1}をかぶった！", "@ takes off the hat.": "{c1}は帽子を外した。", "@ %": "{t1}の{c1}", "Recruit": "仲間集め", "Upgrades": "強化", "Gadgets": "道具", "Wardrobe": "衣装", "In your gang": "仲間入り済み", "Recruit first": "先に仲間にしよう", "Upgraded!": "強化済み！", "Owned - put it on in Team": "所持 - 仲間の画面でかぶせよう", "Reward: beat %": "ごほうび: {t1}を倒す", "Win heists to earn koban, then recruit new burglars here.": "盗みで小判を稼ぎ、ここで新しい泥棒を仲間にしよう。", "Each cat has one upgrade.": "各猫に強化が一つある。", "Gadgets come with you on every heist until they are used.": "道具は使うまで毎回持っていく。", "You need # more koban.": "小判があと{n1}枚足りない。", "You need # more koban for @.": "{c1}にはあと小判{n1}枚必要。", "You can carry at most #.": "最大{n1}個まで持てる。", "% added to your kit.": "{t1}を道具袋に入れた。", "% bought!": "{t1}を買った！", "Equip it on the Team screen.": "仲間の画面でかぶせよう。", "@ upgraded: Footsteps make half the noise.": "{c1}を強化: 足音が半分に。", "@ upgraded: Hiss recharges in #s instead of #s.": "{c1}を強化: 威嚇の再使用が{n2}秒から{n1}秒に。", "@ upgraded: Jumps are silent too.": "{c1}を強化: 跳躍も無音に。", "Key Q.": "Qキー。", "Key R.": "Rキー。", "Thrown into the next room: awake dogs on that floor go and eat it for # seconds.": "隣の部屋に投げる。その階の起きた犬が{n1}秒間食べに行く。", "Arm it, and the next up or down jump climbs two floors at once.": "構えると、次の上下の跳躍で二階分いっきに登れる。", "Automatic: the next time a cat is caught, it vanishes in smoke to a balcony.": "自動: 次に猫が捕まりそうになると、煙に紛れて縁側へ逃げる。", "A woven straw hat for travelling incognito.": "お忍びの旅にぴったりの編み笠。", "Good for rain, better for hiding your face.": "雨よけにも、顔を隠すのにも。", "A painted % from a shrine festival.": "神社の祭りで買った絵付けの{t1}。", "Nobody suspects a fox spirit.": "狐の精を疑う者はいない。", "A ring of cherry blossoms.": "桜の花の輪。", "Smells lovely; very bad for sneaking past dogs with allergies.": "いい香りだが、花粉症の犬の横を通るには最悪。", "A cosy striped cap for cold nights on castle rooftops.": "城の屋根の寒い夜に、ぬくぬくの縞模様の帽子。", "The Shogun's own golden helmet, crest and all.": "将軍自慢の金の兜、前立て付き。", "Proof you robbed the Keep.": "天守を荒らした証。", "Walks without making a sound.": "音を立てずに歩く。", "Hisses an awake dog back to sleep (recharges in #s).": "起きた犬を威嚇して眠らせる（{n1}秒で再使用）。", "Cracks the vault #x faster without tripping its alarm, and can pry shut shutters open.": "金庫を{n1}倍速く破り、警報も鳴らさない。閉じた雨戸もこじ開けられる。", "Never sets off traps.": "罠にかからない。", "Disarms them instead.": "代わりに外してしまう。", "Moves faster and lands jumps silently.": "足が速く、跳んでも音を立てない。", "+#% koban from every heist while on the team.": "仲間にいる間、盗みの小判が+{n1}%。", "Sees two rooms ahead in every direction.": "四方の二部屋先まで見通す。", "Frees caged teammates by walking into their room.": "檻の仲間の部屋に入ると助け出す。", "Breaks free the first time he is caught and flees to a balcony.": "初めて捕まったとき振りほどいて縁側へ逃げる。", "Jumps are silent too.": "跳躍も無音になる。", "Hiss recharges in #s instead of #s.": "威嚇の再使用が{n2}秒から{n1}秒に。", "Cracks even faster and pries shutters silently.": "さらに速く金庫を破り、雨戸も音なくこじ開ける。", "Footsteps make half the noise.": "足音が半分になる。", "Moves even faster.": "さらに速く動く。", "+#% koban instead of +#%.": "小判 +{n2}%ではなく+{n1}%。", "Sees three rooms ahead.": "三部屋先まで見通す。", "Also frees caged cats in neighbouring rooms.": "隣の部屋の檻の猫も助け出す。", "Breaks free twice per heist.": "一度の盗みで二回振りほどける。", "Upgrade: Breaks free twice per heist.": "強化: 一度の盗みで二回振りほどける。", "Upgrade: Cracks even faster and pries shutters silently.": "強化: さらに速く金庫を破り、雨戸も音なくこじ開ける。", "Upgrade: Footsteps make half the noise.": "強化: 足音が半分になる。", "Upgrade: Hiss recharges in #s instead of #s.": "強化: 威嚇の再使用が{n2}秒から{n1}秒に。", "Upgrade: Jumps are silent too.": "強化: 跳躍も無音になる。", "Upgrade: Moves even faster.": "強化: さらに速く動く。", "Upgrade: Sees three rooms ahead.": "強化: 三部屋先まで見通す。", "Upgraded: Footsteps make half the noise.": "強化済み: 足音が半分になる。", "Upgraded: Jumps are silent too.": "強化済み: 跳躍も無音になる。", "@ %: Walks without making a sound.": "{t1}の{c1}: 音を立てずに歩く。", "@ %: Hisses an awake dog back to sleep (recharges in #s).": "{t1}の{c1}: 起きた犬を威嚇して眠らせる（{n1}秒で再使用）。", "@ %: Cracks the vault #x faster without tripping its alarm, and can pry shut shutters open.": "{t1}の{c1}: 金庫を{n1}倍速く破り、警報も鳴らさない。閉じた雨戸もこじ開けられる。", "@ %: Never sets off traps.": "{t1}の{c1}: 罠にかからない。", "@ %: Moves faster and lands jumps silently.": "{t1}の{c1}: 足が速く、跳んでも音を立てない。", "...": "…", "Shh.": "しーっ。", "I was never here.": "私はここにいなかった。", "Bring on the dogs!": "犬でもなんでも来い！", "Grrr-meow!": "ぐるる、にゃー！", "Fear me!": "恐れよ！", "Any lock, any time.": "どんな錠でも、いつでも。", "Click, click, open.": "カチ、カチ、開いた。", "Nya-ha!": "にゃはっ！", "Step where I step.": "私の足跡をたどって。", "Traps?": "罠？", "What traps?": "どこに罠が？", "Mrrp.": "ぷるる。", "Mrrp?": "ぷるる？", "Too slow!": "おそいおそい！", "Zoom!": "びゅん！", "Catch me if you can!": "捕まえてごらん！", "Smells like koban!": "小判のにおいがする！", "Lucky day!": "ついてる日だ！", "Shiny!": "ぴかぴか！", "I see everything.": "すべて見えている。", "Two rooms ahead...": "二部屋先…", "Look up!": "上を見て！", "Nobody gets left behind!": "誰も置いていかない！", "I have the key!": "鍵はここ！", "Nyaa~": "にゃ〜", "Let them try.": "やれるものなら。", "Let's go.": "行こう。", "Nya!": "にゃっ！", "Pick a tool, then tap rooms.": "道具を選んで部屋をタップ。", "Practice only: no rewards.": "練習専用: 報酬なし。", "Slot # is empty.": "枠{n1}は空です。", "Editing slot #.": "枠{n1}を編集中。", "Back to editing slot #.": "枠{n1}の編集に戻った。", "Tool: %": "道具: {t1}", "Tool: Vault (only one)": "道具: 金庫（ひとつだけ）", "Vault (only one)": "金庫（ひとつだけ）", "Cleared.": "消去した。", "Random % layout.": "おまかせの{t1}の間取り。", "Saved to slot #.": "枠{n1}に保存した。", "Place a vault first!": "先に金庫を置こう！", "Trapdoors need a floor below them.": "落とし穴の下には階が必要。", "Unlock the % to use the %.": "{t2}を使うには{t1}を開放しよう。", "Share this manor": "この屋敷を共有", "Send this code to a friend.": "このコードを友達に送ろう。", "They can paste it with Import.": "取り込むで貼り付けられる。", "Copied!": "コピーした！", "Import a manor": "屋敷を取り込む", "Paste a code like NK#-ABCDE-...": "NK{n1}-ABCDE-… のようなコードを貼り付けて、", "and press Load.": "読み込むを押そう。", "That code does not look right.": "コードが正しくないようだ。", "Check it and try again.": "確かめてもう一度。", "Imported!": "取り込んだ！", "Save it to keep it in slot #.": "枠{n1}に残すには保存しよう。", "Leaderboards are not set up yet - see the README.": "順位表はまだ設定されていない（READMEを参照）。", "Could not open the leaderboard.": "順位表を開けなかった。", "Your own manor": "自作の屋敷", "Your own manor - no rewards": "自作の屋敷 - 報酬なし", "Practice Run": "練習", "Training Heist": "訓練", "Pick a cat: press #-# or tap a portrait.": "猫を選ぼう: {n1}〜{n2}キーか肖像をタップ。", "Pick a cat first: press #-# or tap a portrait.": "まず猫を選ぼう: {n1}〜{n2}キーか肖像をタップ。", "It is a dark night (x# pay).": "今夜は闇夜だ（報酬×{n1}）。", "Training heist.": "訓練。", "Practice run in your own manor (slot #) - no rewards.": "自作の屋敷で練習（枠{n1}） - 報酬なし。", "BOSS: %!": "ボス: {t1}！", "Patrol dogs never sleep, and the vault needs two cats cracking together.": "巡回犬は眠らず、金庫は二匹で同時に破る必要がある。", "Patrol dogs never sleep.": "巡回犬は眠らない。", "The vault needs two cats.": "金庫には二匹必要だ。", "And it is night.": "しかも夜だ。", "Daily Heist (#-#-#) - first win today pays double!": "日替わりの盗み（{n1}-{n2}-{n3}） - 今日の初勝利は報酬二倍！", "Daily Heist (#-#-#) - already won today, normal pay.": "日替わりの盗み（{n1}-{n2}-{n3}） - 今日は勝利済み、通常報酬。", "@ drops onto the balcony.": "{c1}が縁側に降り立った。", "Move with WASD / arrows / swipe.": "WASD・矢印・スワイプで移動。", "Select a cat in the manor first.": "まず屋敷の中の猫を選ぼう。", "That shutter is shut tight!": "その雨戸はぴったり閉まっている！", "@ is stuck!": "{c1}は動けない！", "@ is free to move again.": "{c1}はまた動けるようになった。", "A guard dog wakes up and barks!": "番犬が目を覚まして吠えた！", "The samurai wakes with a shout!": "侍が叫び声とともに目を覚ました！", "A ninja drops from the rafters - he can climb between floors!": "忍者が梁から降りてきた - 階を行き来するぞ！", "A shutter slams shut!": "雨戸がバタンと閉まった！", "(No more shutters close from this alarm.)": "（この警報ではもう雨戸は閉まらない。）", "(No more shutters close from this alarm.": "（この警報ではもう雨戸は閉まらない。", "Every shutter is shut!": "雨戸がすべて閉まった！", "Only @ can pry one open - send him in (press #), then press Space on the balcony.": "こじ開けられるのは{c1}だけ - 送り込んで（{n1}キー）、縁側でスペース。", "Only @ can pry one open - get him to a balcony and press Space.": "こじ開けられるのは{c1}だけ - 縁側へ連れて行ってスペース。", "Every shutter is shut.": "雨戸がすべて閉まった。", "There is no way in or out...": "出入りする道がない…", "Every shutter is shut, and @ has been caught.": "雨戸がすべて閉まり、{c1}も捕まった。", "All five cats were caught...": "五匹とも捕まった…", "@ was caught!": "{c1}が捕まった！", "@ was caught and caged!": "{c1}が捕まって檻に入れられた！", "@ can free them.": "{c1}なら助けられる。", "The loot drops to the floor.": "お宝が床に落ちた。", "@ was caught and caged! The loot drops to the floor.": "{c1}が捕まって檻に入れられた！お宝が床に落ちた。", "@ slips into the wardrobe.": "{c1}は箪笥にもぐりこんだ。", "@ slips into the folding screen.": "{c1}は屏風の陰にもぐりこんだ。", "Nothing can see or catch a hidden cat.": "隠れた猫は見つからず、捕まらない。", "Move or press the action button to come out.": "動くか行動ボタンで出てくる。", "Squeeze out": "出る", "The vault!": "金庫だ！", "Press Space or tap the red button to crack it.": "スペースか赤いボタンで破ろう。", "This one needs TWO cats cracking at once.": "これは二匹同時に破る必要がある。", "@ cracks the vault...": "{c1}が金庫を破っている…", "stay put!": "じっとしていて！", "@ cracks the vault with # helper!": "{c1}が{n1}匹の助けで金庫を破っている！", "@ cracks the vault with # helpers!": "{c1}が{n1}匹の助けで金庫を破っている！", "@ starts on the vault, but it needs a second cat cracking too!": "{c1}が金庫に取りかかったが、もう一匹必要だ！", "The vault swings open!": "金庫が開いた！", "The alarm sounds!": "警報が鳴る！", "@ grabs the loot!": "{c1}がお宝をつかんだ！", "@ grabs the loot.": "{c1}がお宝をつかんだ。", "Escape through an open shutter to a balcony!": "開いた雨戸から縁側へ逃げろ！", "(Bring @ to open vaults silently.)": "（{c1}を連れていけば金庫を静かに開けられる。）", "(Bring @ to open vaults silently.": "（{c1}を連れていけば金庫を静かに開けられる。", "@ slips the lock without a sound - no alarm!": "{c1}が音もなく錠を外した - 警報なし！", "Escape to a balcony!": "縁側へ逃げろ！", "@ can pry this shutter open: Space or the red button.": "{c1}ならこの雨戸をこじ開けられる: スペースか赤いボタン。", "@ pries the shutter open.": "{c1}が雨戸をこじ開けた。", "Creak...": "ギィ…", "@ meows loudly!": "{c1}が大きく鳴いた！", "Awake dogs on this floor come running here.": "この階の起きた犬がここへ走ってくる。", "Get out of the way!": "急いで離れろ！", "@ can meow again in #s.": "{c1}はあと{n1}秒で鳴ける。", "(Only @ can pry shutters.)": "（雨戸をこじ開けられるのは{c1}だけ。）", "(Only @ can pry shutters.": "（雨戸をこじ開けられるのは{c1}だけ。", "@ tosses a %.": "{c1}が{t1}を投げた。", "Awake dogs on this floor will go and eat it!": "この階の起きた犬が食べに行く！", "Rope ready: the next up or down jump climbs two floors.": "縄の用意よし: 次の上下の跳躍で二階分登る。", "Rope put away.": "縄をしまった。", "Smoke bombs work by themselves: the next time a cat is caught, it escapes.": "煙玉は自動: 次に猫が捕まりそうになると逃げる。", "You have #.": "{n1}個持っている。", "Smoke bombs are off on your own manors, so you can see whether your guards catch you.": "自作の屋敷では煙玉は使えない。番人が捕まえられるか確かめよう。", "No % left.": "{t1}がもうない。", "Buy more in the Cat Shop (Gadgets).": "猫の店（道具）で買い足そう。", "POOF!": "ドロン！", "A % - @ reappears on the balcony.": "{t1}だ - {c1}が縁側に現れた。", "@ shrugs off the dog and bolts out a window to the balcony!": "{c1}は犬を振り払い、窓から縁側へ逃げた！", "(one more escape left)": "（あと一回逃げられる）", "@ puffs up and HISSES!": "{c1}が毛を逆立てて威嚇した！", "The dog slinks back to sleep.": "犬はすごすごと眠りに戻った。", "The patrol dog freezes for a moment.": "巡回犬が一瞬固まった。", "@ hisses...": "{c1}が威嚇する…", "the samurai doesn't even blink!": "侍はまばたきもしない！", "@ HISSES!": "{c1}が威嚇した！", "@ stands her ground - the dog will not come into her room!": "{c1}は一歩も引かない - 犬は部屋に入ってこない！", "Mike slips the lock without a sound - no alarm!": "ミケが音もなく錠を外した - 警報なし！", "@ quietly disarms the %.": "{c1}はそっと{t1}を外した。", "SQUEAK!": "キュッ！", "The % sings under @'s paws...": "{c1}の足の下で{t1}が鳴いた…", "The % jingles!": "{t1}がチリンと鳴った！", "A net drops on @!": "{c1}に網が落ちてきた！", "Ow!": "いたっ！", "@ steps on % and yowls!": "{c1}が{t1}を踏んで悲鳴を上げた！", "BWONNNG!": "ゴォォォン！", "@ bumps the gong.": "{c1}が銅鑼にぶつかった。", "The whole floor hears it!": "階じゅうに響いた！", "A trapdoor!": "落とし穴だ！", "@ drops to the floor below!": "{c1}は下の階へ落ちた！", "BANG-BANG-BANG!": "パン、パン、パン！", "Firecrackers!": "爆竹だ！", "The noise carries into the rooms all around.": "音がまわりの部屋に響き渡る。", "Whoa!": "うわっ！", "A % flips @ right back where they came from.": "{t1}が{c1}を元の場所へくるりと戻した。", "It stays open now.": "もう開いたままだ。", "The % spots @!": "{t1}が{c1}を見つけた！", "The owl spots @!": "梟が{c1}を見つけた！", "Something with glowing eyes spots @ in the dark!": "暗闇で光る目が{c1}を見つけた！", "The stone komainu's eyes blaze - it roars at @!": "石の狛犬の目が光り、{c1}に吠えた！", "The watch lantern spots @!": "見張り灯籠が{c1}を照らした！", "@ pockets a % (+# koban if you get away).": "{c1}が{t1}をくすねた（逃げ切れば小判+{n1}）。", "@ pockets a scroll (+# koban if you get away).": "{c1}が巻物をくすねた（逃げ切れば小判+{n1}）。", "You have the loot!": "お宝を手に入れた！", "Escape: carry it out to a balcony through an open shutter.": "逃げろ: 開いた雨戸から縁側へ運び出そう。", "The left balcony is closest.": "左の縁側が一番近い。", "In training, only @ is on the job.": "訓練では{c1}だけが出動する。", "Press # or tap her portrait.": "{n1}キーか肖像をタップ。", "Swipe / press Left or Right, or tap a balcony, to send @ in.": "スワイプ、左右キー、縁側のタップで{c1}を送り込もう。", "Tap one of the balconies on the left or right edge.": "左右の端の縁側をタップしよう。", "Tap the left balcony.": "左の縁側をタップ。", "WOOF!": "ワン！", "Halt, thief!": "待て、盗人！", "Got you!": "捕まえた！", "Welcome, burglar!": "ようこそ、泥棒さん！", "First pick a cat: press # or tap @'s portrait (top left).": "まず猫を選ぼう: {n1}キーか{c1}の肖像（左上）をタップ。", "Send @ in: press Left, or tap the left balcony.": "{c1}を送り込もう: 左キーか左の縁側をタップ。", "Walk into the manor: press Right, D, or swipe right.": "屋敷に入ろう: 右キー、D、右スワイプ。", "A guard dog sleeps in the next room.": "隣の部屋で番犬が眠っている。", "Every step makes noise and fills the bubble over a sleeping dog.": "一歩ごとに物音が立ち、眠る犬の上の吹き出しがたまっていく。", "@ walks silently - sneak past it, two rooms to the right.": "{c1}は音を立てずに歩ける - 二部屋右へ忍び足で通り抜けよう。", "The next room has a squeaky %!": "次の部屋には鳴る{t1}がある！", "Go around it: from this room, jump up a floor with Up, W, or swipe up.": "回り道しよう: この部屋から上キー、W、上スワイプで一階上へ。", "Uh oh - the dog next door heard you!": "しまった、隣の犬に聞かれた！", "Hide in the wardrobe: press Space or tap the red button.": "箪笥に隠れよう: スペースか赤いボタン。", "Stay hidden.": "隠れていよう。", "Dogs cannot see or catch you in there.": "中にいれば犬に見つからず、捕まらない。", "Wait until it gives up and goes back to sleep...": "犬があきらめて眠るまで待とう…", "Safe!": "助かった！", "Now climb two floors: press Up twice (moving also brings you out of hiding).": "二階分登ろう: 上キーを二回（動くと隠れ場所から出る）。", "The vault is up there.": "金庫はその上だ。", "There it is!": "あった！", "Walk into the vault room and press Space to crack it.": "金庫の部屋に入ってスペースで破ろう。", "Stay still while it cracks - it is a little noisy.": "破っている間はじっと - 少し音が出る。", "Watch the bubbles over sleeping dogs.": "眠る犬の上の吹き出しに注意。", "When one turns red, stop and let the noise fade before moving on.": "赤くなったら止まって、物音が消えてから進もう。", "HEIST COMPLETE!": "盗み成功！", "BOSS DEFEATED!": "ボス撃破！", "TRAINING COMPLETE!": "訓練完了！", "PRACTICE COMPLETE": "練習完了", "THE HEIST FAILED": "盗み失敗", "THE BOSS WINS THIS TIME": "今回はボスの勝ち", "CAUGHT IN TRAINING": "訓練で捕まった", "Rewards": "報酬", "Total": "合計", "Heist pay": "盗みの報酬", "Dark night": "闇夜", "Boss bonus": "ボスのボーナス", "@'s luck": "{c1}の幸運", "Side loot": "おまけのお宝", "Training reward": "訓練の報酬", "NEW!": "新発見！", "PERFECT HEIST - no alarms, nobody caught!": "完璧な仕事 - 警報なし、捕獲なし！", "What happened": "何が起きた", "Tip: ": "ヒント: ", "Next, try a real heist from the menu.": "次はメニューから本番の盗みに挑もう。", "Meow to lure dogs (action button), buy gadgets in the Cat Shop, and win heists to face the boss.": "鳴いて犬をおびき寄せ（行動ボタン）、猫の店で道具を買い、勝ち進んでボスに挑もう。", "This was your own manor, so there are no rewards.": "自作の屋敷なので報酬はない。", "Tweak it in the editor and try again!": "屋敷づくりで手直ししてもう一度！", "No harm done - it was only practice.": "大丈夫、ただの練習だ。", "Try the training heist again.": "もう一度訓練しよう。", "Your own manor is tough!": "自作の屋敷は手強い！", "Try again, or tweak it in the editor.": "もう一度挑むか、屋敷づくりで手直ししよう。", "No loot this time, but nothing is lost: your koban, treasures and progress are safe.": "今回は収穫なし。でも何も失っていない。小判もお宝も進行も無事だ。", "Tip: Watch the bubbles over sleeping dogs.": "ヒント: 眠る犬の上の吹き出しに注意。", "Tip: A woken dog hunts its whole floor: jump to another floor or hide in a wardrobe.": "ヒント: 起きた犬は階じゅうを探す。別の階へ跳ぶか箪笥に隠れよう。", "A woken dog hunts its whole floor: jump to another floor or hide in a wardrobe.": "起きた犬は階じゅうを探す。別の階へ跳ぶか箪笥に隠れよう。", "@ can hiss a dog back to sleep, and a % saves one capture.": "{c1}は犬を威嚇して眠らせ、{t1}は一度だけ捕獲を防ぐ。", "Tip: @ can pry shut shutters open, so keep him safe - he is your way out.": "ヒント: {c1}は閉じた雨戸をこじ開けられる。彼を守ろう - 唯一の出口だ。", "@ can pry shut shutters open, so keep him safe - he is your way out.": "{c1}は閉じた雨戸をこじ開けられる。彼を守ろう - 唯一の出口だ。", "Move slowly, let noise fade, and hide when a dog wakes.": "ゆっくり動き、物音が消えるのを待ち、犬が起きたら隠れよう。", "Bring @ on your team: he can pry shut shutters open, so all the shutters closing is no longer the end.": "{c1}を仲間に入れよう。閉じた雨戸をこじ開けられるので、雨戸が全部閉まっても終わりではなくなる。", "Move slowly and let noise fade.": "ゆっくり動き、物音が消えるのを待とう。", "Boss vaults need TWO cats cracking at once, and patrol dogs never sleep.": "ボスの金庫は二匹同時に破る必要があり、巡回犬は眠らない。", "Time your moves between their steps.": "彼らの足取りの合間を狙って動こう。", "NEW LEAGUE UNLOCKED: the %!": "新リーグ開放: {t1}！", "The boss manor is open!": "ボスの屋敷が開いた！", "Challenge it from the league card on the menu.": "メニューのリーグ札から挑もう。", "Your time was sent to the daily leaderboard.": "タイムを日替わり順位表に送った。", "Achievement unlocked!": "実績解除！", "Achievement: %!": "実績: {t1}！", "Achievements  # / #": "実績  {n1} / {n2}", "Treasures  # / #": "お宝  {n1} / {n2}", "Boss manor: %": "ボスの屋敷: {t1}", "Daily heist  ": "日替わりの盗み  ", "Win": "勝ち", "Loss": "負け", "(Cat Shop, # koban)": "（猫の店、小判{n1}枚）", "off": "なし", "Worn by: @.": "かぶっている猫: {c1}。", "Worn by: @, @.": "かぶっている猫: {c1}、{c2}。", "Worn by: @, @, @.": "かぶっている猫: {c1}、{c2}、{c3}。", "Tip:": "ヒント:", "Space / E": "スペース / E", "auto": "自動", "Tip: Bring @ on your team: he can pry shut shutters open, so all the shutters closing is no longer the end.": "ヒント: {c1}を仲間に入れよう。閉じた雨戸をこじ開けられるので、雨戸が全部閉まっても終わりではなくなる。", "Tip: Boss vaults need TWO cats cracking at once, and patrol dogs never sleep.": "ヒント: ボスの金庫は二匹同時に破る必要があり、巡回犬は眠らない。", "That manor uses the %, which you have not reached yet.": "その屋敷は{t1}のもの。まだ到達していない。", "Select the code and copy it:": "コードを選んでコピーしよう:", "#-# / tap": "{n1}-{n2} / タップ", "But @ dropped the loot!": "しかし{c1}はお宝を落とした！", "Go back and grab it.": "戻って拾おう。", "Disarms floors, bells, nets, caltrops, trapdoors and spinning walls.": "床、鈴、網、撒菱、落とし穴、どんでん返しを外せる。", "Lanterns, gongs and firecrackers still get her.": "灯籠、銅鑼、爆竹には引っかかる。", "@ %: Disarms floors, bells, nets, caltrops, trapdoors and spinning walls.": "{t1}の{c1}: 床、鈴、網、撒菱、落とし穴、どんでん返しを外せる。", "Daily replay": "日替わりの再挑戦", "Daily Heist (#-#-#) - already won today, replays pay #/#.": "日替わりの盗み（{n1}-{n2}-{n3}） - 今日は勝利済み、再挑戦の報酬は{n4}/{n5}。", "The loot is too big to hide with - it stays on the floor.": "お宝は大きすぎて一緒に隠れられない - 床に置いていく。", "Disarms traps.": "罠を外せる。", "Trapdoors, spinning walls and firecrackers still get her.": "落とし穴、どんでん返し、爆竹には引っかかる。", "Trapdoors still get her.": "落とし穴には引っかかる。", "Trapdoors and spinning walls still get her.": "落とし穴とどんでん返しには引っかかる。", "@ %: Disarms traps.": "{t1}の{c1}: 罠を外せる。", "Disarms traps instead of setting them off.": "罠を作動させずに外せる。", "@ %: Disarms traps instead of setting them off.": "{t1}の{c1}: 罠を作動させずに外せる。", "Noise: every step makes noise, jumps more, and cracking or opening the vault a lot.": "物音: 一歩ごとに音が立ち、跳ぶともっと大きく、金庫を破ったり開けたりするとかなり響く。", "Each sleeping dog has a bubble that fills as noise reaches it - dogs close by hear most, dogs on other floors less.": "眠る犬にはそれぞれ吹き出しがあり、物音が届くとたまっていく。近くの犬ほどよく聞こえ、別の階の犬には届きにくい。", "A full bubble wakes the dog: it barks, which raises the alarm.": "吹き出しが満ちると犬が起きて吠え、警報が鳴る。", "Bubbles drain slowly, so waiting is often the safe move.": "吹き出しはゆっくり減るので、待つのが安全なことも多い。", "@ is almost silent.": "{c1}はほとんど音を立てない。", "Alarms slam shutters shut, but one alarm (anything going off within # seconds) closes at most #.": "警報が鳴ると雨戸が閉まる。ただし一度の警報（{n1}秒以内に続けて起きたもの）で閉まるのは最大{n2}枚。", "If every shutter is shut, only @ can pry one open - if he is caught too, the heist is over.": "雨戸がすべて閉まったら、こじ開けられるのは{c1}だけ。彼も捕まれば盗みは失敗だ。", "Escape with the loot to win.": "お宝を持って逃げれば勝ち。", "The loot: it is too big to hide with, so a cat carrying it drops it when it hides (it grabs it again on the way out).": "お宝: 大きすぎて一緒に隠れられないので、持った猫が隠れると床に置く（出るときにまた拾う）。", "A % or @'s escape also leaves it behind.": "{t1}や{c1}の脱出でも置いていってしまう。", "Any cat can pick it up by walking into that room.": "その部屋に入ればどの猫でも拾える。", "Boss manor unlocked!": "ボスの屋敷が開いた！", "Watch ending": "エンディングを見る", "@ stops cracking and keeps still.": "{c1}は手を止めてじっとしている。", "Press again to carry on - the progress is kept.": "もう一度押すと続きから。進み具合はそのまま。", "Paused #%": "一時停止 {n1}%", "By morning, all of Japan is whispering about the cat burglars who robbed the Elder, the Merchant Princess, the Shogun, the Festival Lord and the Emperor himself, and never left a single paw print.": "翌朝には日本中がうわさしていた。長老、豪商の姫君、将軍、祭り殿、そして帝までも出し抜き、足跡ひとつ残さなかった猫の大泥棒たちのことを。", "The cats stop cracking and keep still.": "猫たちは手を止めてじっとしている。", "Boss defeated bonus": "ボス撃破ボーナス", "Sleeps very deeply, but once awake he is fast, and @ cannot scare him off or hold him back.": "ぐっすり眠るが、起きると素早く、{c1}の威嚇も足止めも効かない。", "Dogs will not step into a room where @ stands (samurai will).": "{c1}のいる部屋には犬が入ってこない（侍は入ってくる）。", "Own up to # of each gadget.": "道具は各{n1}個まで持てる。", "Up to # of each can be used per heist.": "一度の盗みで使えるのは各{n1}個まで。", "You can own up to # of each gadget, and use up to # of each per heist.": "道具は各{n1}個まで持て、一度の盗みで各{n2}個まで使える。", "That's # % used this heist - the most you can use in one heist.": "この盗みで{t1}を{n1}個使った - 一度に使えるのはここまで。", "# left this heist.": "この盗みではあと{n1}個。", "(# left this heist)": "（この盗みではあと{n1}個）", "Endless Heist": "果てなき盗み", "Manor after manor, each tougher than the last.": "屋敷から屋敷へ、ひとつごとに手ごわくなる。", "Cats caught along the way stay caged for the whole run - how far can your crew get?": "途中で捕まった猫は挑戦が終わるまで檻の中。仲間とどこまで行ける？", "No runs yet": "まだ挑戦していない", "Start run": "挑戦開始", "Your current team goes in.": "今の仲間で挑む。", "Run in progress: manor #, # caged": "挑戦中：{n1}軒目、檻の中{n2}匹", "Run in progress: manor #": "挑戦中：{n1}軒目", "Continue run": "挑戦を続ける", "End run": "挑戦をやめる", "New run": "新しく挑戦", "Best streak: # manors": "最高記録：{n1}軒", "Manor #": "{n1}軒目", "# caged": "檻の中{n1}匹", "manor #": "{n1}軒目", "Endless #": "果てなき{n1}", "Endless # - Night": "果てなき{n1}・夜", "Endless Heist, manor #: # guards.": "果てなき盗み、{n1}軒目：番人{n2}。", "Cats caught here stay caged for the rest of the run.": "ここで捕まった猫は挑戦が終わるまで檻の中。", "@ was caught earlier in this run and sits this manor out.": "{c1}はこの挑戦ですでに捕まっていて、この屋敷には出られない。", "MANOR # CLEARED!": "{n1}軒目、制覇！", "Endless manor #": "果てなき{n1}軒目", "New best streak: # manors!": "最高記録更新：{n1}軒！", "Streak: # manors (best #).": "連続{n1}軒（最高{n2}軒）。", "Caught cats stay caged for the rest of the run.": "捕まった猫は挑戦が終わるまで檻の中。", "Nobody new was caught.": "新たに捕まった猫はいない。", "Nobody caught yet - keep it that way!": "まだ誰も捕まっていない。この調子で！", "Next: manor #, even tougher.": "次は{n1}軒目、さらに手ごわい。", "Leaving now ends your Endless run.": "今やめると果てなき盗みの挑戦は終わる。", "Tap Menu again to give up.": "あきらめるならもう一度メニューを押そう。", "THE RUN IS OVER": "挑戦終了", "Tip: Each manor is tougher than the last, and caught cats stay caged.": "ヒント：屋敷はひとつごとに手ごわくなり、捕まった猫は檻の中のまま。", "A smoke bomb or @ can save a cat before it is lost for the run.": "煙玉か{c1}なら、挑戦から外れる前に猫を救える。", "You cleared # manors (best #) and banked # koban this run.": "{n1}軒を制覇し（最高{n2}軒）、この挑戦で小判{n3}枚を稼いだ。", "Everything you earned is yours to keep.": "稼いだものはすべてあなたのもの。", "NEW PLAY OPTION: Endless Heist, on the main menu.": "新しい遊び方：メインメニューの「果てなき盗み」。", "A % or @ can save a cat before it is lost for the run.": "{t1}か{c1}なら、挑戦から外れる前に猫を救える。", "You cleared # manors (best #).": "{n1}軒を制覇した（最高{n2}軒）。", "Run total": "挑戦の合計", "A gold circlet crowned with real phoenix feathers.": "本物の鳳凰の羽をあしらった金の冠。", "It glitters as you sneak - only the richest thief in Japan could afford it.": "忍び歩くたびにきらめく。手が届くのは日本一の金持ち泥棒だけ。", "For sale once you beat the game": "ゲームをクリアすると買える", "Buy every cat, upgrade and hat in the Cat Shop": "猫の店の猫・強化・帽子をすべて買う", "Clear # manors in one Endless run": "果てなき盗みの一回の挑戦で{n1}軒制覇する", "@ %:": "{t1}の{c1}:", "Upgraded:": "強化済み:", "(bought!)": "（購入済み）", "%: %.": "{t1}: {t2}。", "Learn the ropes in a quiet country manor": "静かな田舎の屋敷で基本を学ぼう", "Every cat left in the run was caught...": "挑戦に残っていた猫が全員捕まった…", "Run haul": "挑戦の稼ぎ", "# koban": "小判{n1}枚", "Nothing banked": "稼ぎなし", "The arrow shows the closest one.": "矢印がいちばん近い出口を指している。", "Only @ can pry one open: press # or tap his portrait, then send him onto the balcony.": "こじ開けられるのは{c1}だけ。{n1}キーか肖像をタップして、縁側へ送り込もう。", "Walk @ next to a shut shutter (onto a balcony) and press Space to pry it open.": "{c1}を閉じた雨戸の隣（縁側）まで歩かせ、スペースでこじ開けよう。", "Then @ can escape!": "そうすれば{c1}が逃げられる！", "One of your cats is sick in bed, so the crew is a cat short.": "猫が一匹寝込んでいて、仲間が一匹足りない。", "Every guard dog has been swapped for a samurai.": "番犬がすべて侍に入れ替わっている。", "One alarm and the heist fails.": "警報が一度でも鳴れば失敗。", "Your team has the day off: five random cats are on the job.": "いつもの仲間は休み。ランダムな五匹で挑む。", "A pitch-dark night, and the guards wake more easily.": "真っ暗な夜で、番人が目を覚ましやすい。", "No gadgets today.": "今日は道具なし。", "Every sound carries further.": "どんな音も遠くまで響く。", "Two extra patrol dogs roam the manor.": "巡回犬が二匹多く屋敷を歩き回る。", "Daily: %": "日替わり: {t1}", "Daily Heist - today's twist: %.": "日替わりの盗み - 今日のお題: {t1}。", "@ is sick in bed today.": "{c1}は今日は寝込んでいる。", "Already won today: replays pay #/#.": "今日はもう勝った。再挑戦の報酬は{n1}/{n2}。", "First win today pays double, plus your streak bonus!": "今日の初勝利は報酬2倍、さらに連続ボーナス！", "First win today pays double!": "今日の初勝利は報酬2倍！", "Twist: %": "お題: {t1}", "Every cat on the job was caught...": "出動した猫が全員捕まった…", "The alarm went off - and today one alarm ends the heist.": "警報が鳴った。今日は一度の警報で失敗だ。", "% today: no gadgets in this heist.": "今日は{t1}。この盗みでは道具を使えない。", "Daily streak": "連続記録", "Today's twist beaten: %!": "今日のお題を突破: {t1}！", "Daily streak: # days.": "連続記録: {n1}日。", "Daily streak: # day.": "連続記録: {n1}日。", "Come back tomorrow for a new twist and a bigger streak bonus.": "明日また来れば新しいお題と、さらに大きな連続ボーナス。", "Come back tomorrow for a new twist.": "明日また来れば新しいお題。", "Daily heist: %": "日替わりの盗み: {t1}", "# days": "{n1}日", "# day": "{n1}日"}, "terms": {"Bamboo League": "竹リーグ", "Sakura League": "桜リーグ", "Snow League": "雪リーグ", "Matsuri League": "祭リーグ", "Golden League": "金閣リーグ", "Bamboo": "竹", "Sakura": "桜", "Snow": "雪", "Matsuri": "祭", "Golden": "金閣", "a countryside manor": "田舎の屋敷", "a merchant's spring estate": "商人の春の屋敷", "the shogun's winter castle": "将軍の冬の城", "a summer-festival teahouse": "夏祭りの茶屋", "the emperor's golden pavilion": "帝の金閣", "The Elder's Manor": "長老の屋敷", "The Merchant Prince's Estate": "豪商の御殿", "The Shogun's Keep": "将軍の天守", "the Shogun's Keep": "将軍の天守", "The Festival Lord's Teahouse": "祭り殿の茶屋", "The Golden Pavilion": "金閣", "the Golden Pavilion": "金閣", "Nightingale floor": "鶯張りの床", "nightingale floor": "鶯張りの床", "Bell string": "鈴の紐", "bell string": "鈴の紐", "Net trap": "網の罠", "net trap": "網の罠", "Watch lantern": "見張り灯籠", "watch lantern": "見張り灯籠", "Caltrops": "撒菱", "caltrops": "撒菱", "Gong": "銅鑼", "gong": "銅鑼", "Trapdoor": "落とし穴", "trapdoor": "落とし穴", "Firecrackers": "爆竹", "firecrackers": "爆竹", "Spinning wall": "どんでん返し", "spinning wall": "どんでん返し", "Guard dog": "番犬", "Patrol dog": "巡回犬", "Samurai": "侍", "Ninja": "忍者", "Owl": "梟", "Komainu": "狛犬", "Hiding spot": "隠れ場所", "Side loot": "おまけのお宝", "Empty room": "空き部屋", "Vault (only one)": "金庫（ひとつだけ）", "Straw kasa": "笠", "straw kasa": "笠", "Fox mask": "狐面", "fox mask": "狐面", "Blossom crown": "花冠", "blossom crown": "花冠", "Knit cap": "毛糸の帽子", "knit cap": "毛糸の帽子", "Golden kabuto": "金の兜", "golden kabuto": "金の兜", "Dried fish": "干し魚", "dried fish": "干し魚", "Grappling rope": "鉤縄", "grappling rope": "鉤縄", "Smoke bomb": "煙玉", "smoke bomb": "煙玉", "coin pouch": "小銭袋", "sake jar": "酒瓶", "Raku Tea Bowl": "楽焼の茶碗", "Silk Sensu Fan": "絹の扇子", "Kokeshi Doll": "こけし", "Katana Tsuba": "刀の鍔", "Golden Maneki-neko": "金の招き猫", "Golden Koi": "金の鯉", "Jade Magatama": "翡翠の勾玉", "Moon Pearl": "月の真珠", "First Score": "初仕事", "Silent Paws": "忍び足", "Nine Lives": "九つの命", "Swift Getaway": "電光石火", "Collector": "収集家", "Architect": "設計士", "Fat Cat": "大金持ち", "Full Roster": "全員集合", "Perfect Heist": "完璧な仕事", "Daily Devotion": "日々の精進", "Shogun Slayer": "将軍討ち", "Master Thief": "大泥棒", "the Shadow": "影", "the Brave": "勇者", "the Lockpick": "錠前破り", "Light Paws": "軽足", "the Swift": "韋駄天", "the Lucky": "招福", "the Lookout": "物見", "the Rescuer": "救い手", "the Tough": "剛の者", "The Merchant Princess's Estate": "豪商の姫君の御殿", "Phoenix crown": "鳳凰の冠", "phoenix crown": "鳳凰の冠", "Big Spender": "大散財", "Unstoppable": "破竹の勢い", "Sick day": "病欠", "Samurai guard": "侍の番", "Hair trigger": "一触即発", "Borrowed crew": "助っ人の仲間", "Moonless night": "月なき夜", "Empty pockets": "手ぶら", "Creaky floors": "きしむ床", "Night watch": "夜回り"}, "cats": {"Kuro": "クロ", "Tora": "トラ", "Mike": "ミケ", "Shiro": "シロ", "Hai": "ハイ", "Kin": "キン", "Sora": "ソラ", "Momo": "モモ", "Goro": "ゴロ"} };
  // ================================================================= language
  // Every string shown on screen goes through txt(), which translates it when a language other than English
  // is chosen. Text is split into lines, "  "-separated parts and sentences. Each sentence is normalised: cat
  // names -> @, numbers -> #, known names (leagues, traps, treasures, ...) -> %. The normalised key is looked up
  // in the language's table and the placeholders are filled back in ({c1} {n1} {t1}...). Anything without a
  // translation stays in English, so a missing line never breaks the game.
  const LANGS = { en: { name: 'English' }, ja: { name: '日本語', dict: LANG_JA.dict, terms: LANG_JA.terms, cats: LANG_JA.cats, join: '' } };
  const LANG_ORDER = ['en', 'ja'];
  const CAT_RE = /\b(Kuro|Tora|Mike|Shiro|Hai|Kin|Sora|Momo|Goro)\b/g;
  const trCache = {};
  let termRe = {};
  function i18nKey(sentence, L) {
    const a = { c: [], n: [], t: [] };
    if (!termRe[L.code]) {
      const keys = Object.keys(L.terms).sort((x, y) => y.length - x.length).map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      termRe[L.code] = new RegExp('\\b(' + keys.join('|') + ')\\b', 'g');
    }
    let k = sentence.replace(termRe[L.code], (m) => { a.t.push(m); return '\u0001'; });
    k = k.replace(CAT_RE, (m) => { a.c.push(m); return '@'; });
    k = k.replace(/\d+(?:[.,]\d+)?/g, (m) => { a.n.push(m); return '#'; });
    return { key: k.replace(/\u0001/g, '%'), a: a };
  }
  function trSentence(s, L) {
    const lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0], core = s.trim();
    if (!core) return s;
    const { key, a } = i18nKey(core, L);
    let out = key === '%' ? '{t1}' : key === '@' ? '{c1}' : key === '#' ? '{n1}' : L.dict[key];
    if (out == null) return null;
    out = out.replace(/\{([cnt])(\d)\}/g, (m, kind, i) => {
      const v = a[kind][i - 1];
      if (v == null) return '';
      return kind === 'c' ? (L.cats[v] || v) : kind === 't' ? (L.terms[v] || v) : v;
    });
    return lead + out + (L.join != null && trail ? L.join : trail);
  }
  function trSegment(seg, L) {
    const whole = trSentence(seg, L);
    if (whole != null) return whole;
    const parts = seg.match(/(?:[^.!?]|\.(?=\d))+[.!?]*\s*|[.!?]+\s*/g) || [seg];
    return parts.map((p) => { const t = trSentence(p, L); return t == null ? p : t; }).join('');
  }
  function tr(s) {
    if (typeof s !== 'string' || !SV || !SV.lang || SV.lang === 'en') return s;
    const L = LANGS[SV.lang];
    if (!L || !L.dict) return s;
    L.code = SV.lang;
    const C = trCache[SV.lang] = trCache[SV.lang] || new Map();
    if (C.has(s)) return C.get(s);
    let out = s.split('\n').map((line) => line.split(/(\s{2,})/).map((seg, i) => (i % 2 ? seg : trSegment(seg, L))).join('')).join('\n');
    // Japanese has no spaces, so add a hair space after CJK characters: the text engine can then wrap long lines
    if (SV.lang === 'ja') out = out.replace(/([\u3000-\u30ff\u4e00-\u9fff\uff00-\uffef])(?=[^\s])/g, '$1\u200A');
    if (C.size > 4000) C.clear();
    C.set(s, out);
    return out;
  }

  function txt(o, s) { s = tr(s); if (o.setText) o.setText(s); else o.setString(s); }
  function size(o, w, h) { o.setWidth(w); o.setHeight(h); }
  const cx = (c) => GX + c * CW, cy = (r) => GY + r * CH;
  const isBalc = (c) => c === 0 || c === COLS - 1;
  const lerp = (a, b, t) => a + (b - a) * t;
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function inside(p, x, y, w, h) { return p.x >= x && p.x <= x + w && p.y >= y && p.y <= y + h; }
  function outline(t, on) { if (t.setOutlineEnabled) { t.setOutlineEnabled(on); if (on) { t.setOutlineColor('24;20;26'); t.setOutlineThickness(4); } } }

  function label(s, x, y, sz, color, align, wrapW) {
    const t = U('Label', x, y, 150);
    if (t.setCharacterSize) t.setCharacterSize(sz || 24);
    if (t.setColor) t.setColor(color || INK);
    if (wrapW && t.setWrapping) { t.setWrapping(true); t.setWrappingWidth(wrapW); }
    if (color === CREAM) outline(t, true);
    txt(t, s);
    if (align === 'center' && wrapW) {
      // wrapped + centred: centre each line inside a box of width wrapW
      if (t.setTextAlignment) t.setTextAlignment('center');
      t.setX(x - wrapW / 2);
    } else if (align === 'center') t.setX(x - (t.getWidth() || s.length * sz * 0.5) / 2);
    return t;
  }

  function button(lbl, x, y, w, h, fn, opts) {
    opts = opts || {};
    const b = U('Button', x, y, 140);
    const shape = plaqueFor(w, h);
    anim(b, shape);
    size(b, w, h);
    const t = label(lbl, x + w / 2, y, opts.size || (h >= 70 ? 30 : 22), INK, 'center');
    t.setZOrder(141);
    t.setY(y + h / 2 - (t.getHeight() || 28) / 2 - 1);
    if (opts.coin) {   // a little koban coin after the price
      const cs = Math.round(h * 0.52), tw = t.getWidth() || lbl.length * 11;
      t.setX(x + w / 2 - (tw + 6 + cs * 0.75) / 2);
      const cn = U('Koban', t.getX() + tw + 6, y + h / 2 - cs / 2, 142); size(cn, cs * 0.75, cs);
      if (opts.dim) cn.setOpacity(150);
      opts.coinObj = cn;
    }
    const B = { x: x, y: y, w: w, h: h, fn: fn, b: b, t: t, on: opts.on, coin: opts.coinObj, shape: shape, ty: t.getY() };
    if (opts.dim) { b.setOpacity(130); t.setOpacity(150); }
    if (opts.on && b.setColor) b.setColor('255;205;160');
    BTNS.push(B);
    return B;
  }

  // paper plaques are drawn natively in several shapes; use the one closest to the button's proportions
  const PLAQUES = { sq: 64 / 52, short: 112 / 56, mid: 164 / 56, small: 220 / 56, long: 320 / 70, big: 400 / 76, wide: 400 / 60 };
  function plaqueFor(w, h) {
    const ar = w / h; let best = 'small', bd = 1e9;
    for (const k in PLAQUES) {
      if ((k === 'long' || k === 'big') !== (h >= 66)) continue;      // tall buttons use the tall plaques
      const d = Math.abs(Math.log(ar / PLAQUES[k]));
      if (d < bd) { bd = d; best = k; }
    }
    return best;
  }
  // pressed look: while the pointer is held down on a button it sinks into its plaque
  let pressedB = null;
  function updatePressed(ev) {
    const h = ev.down ? BTNS.find((B) => inside({ x: ev.mx, y: ev.my }, B.x, B.y, B.w, B.h)) : null;
    if (h === pressedB) return;
    if (pressedB && BTNS.includes(pressedB)) { anim(pressedB.b, pressedB.shape); pressedB.t.setY(pressedB.ty); if (pressedB.coin) pressedB.coin.setY(pressedB.coin.getY() - 2); }
    pressedB = h;
    if (h && h.shape) { anim(h.b, h.shape + '_down'); h.t.setY(h.ty + 2); if (h.coin) h.coin.setY(h.coin.getY() + 2); }
  }
  function panel(x, y, w, h) { const p = U('Panel', x, y, 100); size(p, w, h); return p; }
  // red lacquer ribbon pinned over the top of a scroll, carrying the screen's name
  function screenTitle(text) {
    const rb = U('Ribbon', 540, 70, 118); anim(rb, 'title'); size(rb, 520, 76);
    const t = label(text, 800, 86, 32, CREAM, 'center'); t.setZOrder(119);
    return rb;
  }
  // a lighter inset paper card that groups one item's picture, text and button
  function card(x, y, w, h) { const c = U('Card', x, y, 105); size(c, w, h); return c; }

  // ================================================================= save data
  function defaultSave() {
    return { koban: 0, totalKoban: 0, heists: 0, wins: 0, caught: 0, bestTime: 0,
             unlocked: ['kuro', 'tora', 'mike', 'sora', 'hai'], team: ['kuro', 'tora', 'mike', 'sora', 'hai'],
             treasures: {}, ach: {}, layouts: [null, null, null], muted: false,
             lang: (() => { try { return /^ja/i.test(navigator.language || '') ? 'ja' : 'en'; } catch (e) { return 'en'; } })(),
             league: 1, maxLeague: 1, leagueWins: [0, 0, 0, 0, 0], leagueStars: [0, 0, 0, 0, 0], bossBeaten: [false, false, false, false, false],
             upgrades: {}, daily: { date: '', won: false, stars: 0 }, dailyStreak: { day: 0, n: 0 }, stats: {}, catUse: {}, playTime: 0, seenTraps: {},
             gadgets: { fish: 1, rope: 1, smoke: 1 }, hatsOwned: [], hatsWorn: {}, tutorialDone: false, tutorialOffered: false,
             musicVol: 80, sfxVol: 100, vibrate: true };
  }
  let SV = defaultSave();
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(SAVE_KEY) : null;
    if (raw) SV = Object.assign(defaultSave(), JSON.parse(raw));
  } catch (e) { /* no storage available */ }
  // older saves stored a layout as a plain array of rows
  SV.layouts = SV.layouts.map((l) => (Array.isArray(l) ? { grid: l, league: 1 } : l));
  function stat(key, n) { SV.stats[key] = (SV.stats[key] || 0) + (n == null ? 1 : n); }
  // older saves knew three leagues: pad the per-league arrays out to the current count
  if (!SV.unlocked.includes('sora')) SV.unlocked.push('sora');   // Sora became a starter cat (Shiro is recruited now); old saves keep Shiro
  for (const k of ['leagueWins', 'leagueStars', 'bossBeaten']) while (SV[k].length < NL) SV[k].push(k === 'bossBeaten' ? false : 0);
  // a player who had already beaten the Shogun (the old final boss) gets the new league it now unlocks
  if (SV.bossBeaten[2] && SV.maxLeague < 4) SV.maxLeague = 4;
  function up(id) { return !!SV.upgrades[id]; }
  function todayStr() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function dailyDone() { return SV.daily.date === todayStr() && SV.daily.won; }
  function mulberry(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function layoutOf(i) { return SV.layouts[i] || null; }
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(SV)); } catch (e) { } }
  function unlockAch(id, list) { if (!SV.ach[id]) { SV.ach[id] = true; if (list) list.push(ACHIEVEMENTS.find((a) => a.id === id).name); } }
  function checkMetaAch(list) {
    if (TREASURES.every((t) => SV.treasures[t.id])) unlockAch('collector', list);
    if (SV.totalKoban >= 2000) unlockAch('rich', list);
    if (CAT_ORDER.every((c) => SV.unlocked.includes(c))) unlockAch('roster', list);
    if (SV.bossBeaten[2]) unlockAch('shogun', list);
    if (SV.bossBeaten[NL - 1]) unlockAch('legend', list);
    if (CAT_ORDER.every((c) => SV.unlocked.includes(c)) && Object.keys(UPGRADES).every((c) => SV.upgrades[c]) &&
        HAT_ORDER.every((h) => HATS[h].ach || SV.hatsOwned.includes(h))) unlockAch('spender', list);   // reward hats don't count
    if ((SV.endlessBest || 0) >= ENDLESS_ACH) unlockAch('endless', list);
    for (const h of HAT_ORDER) if (HATS[h].ach && SV.ach[HATS[h].ach] && !SV.hatsOwned.includes(h)) SV.hatsOwned.push(h);
  }

  // ================================================================= sound
  const SFX = 'assets/sfx/';
  let musicOn = false;
  function sfx(name, vol, pitchVar, pitch) {
    try {
      const p = (pitch || 1) * (1 + (Math.random() * 2 - 1) * (pitchVar || 0));
      gdjs.evtTools.sound.playSound(S, SFX + name + '.mp3', false, (vol == null ? 80 : vol) * SV.sfxVol / 100, p);
    } catch (e) { }
  }
  // Music: channel 1 plays the league's ambient loop, channel 2 a taiko tension layer faded in when dogs are awake.
  let musicTrack = '', tensionOn = false, tensionVol = 0;
  function startMusic() { musicOn = true; musicFor(scr.amb ? scr.amb.league : SV.league); }
  function musicFor(league) {
    if (!musicOn) return;
    const f = SFX + 'ambient_l' + league + '.mp3';
    if (f === musicTrack) return;
    musicTrack = f;
    try { gdjs.evtTools.sound.playMusicOnChannel(S, f, 1, true, 50 * SV.musicVol / 100, 1); } catch (e) { }
  }
  function applyMusicVol() { try { gdjs.evtTools.sound.setMusicOnChannelVolume(S, 1, 50 * SV.musicVol / 100); } catch (e) { } }
  function vibrate(ms) { if (!SV.vibrate) return; try { navigator.vibrate(ms); } catch (e) { } }
  function tension(on) {
    if (!musicOn) return;
    if (on && !tensionOn) { tensionOn = true; tensionVol = 0; try { gdjs.evtTools.sound.playMusicOnChannel(S, SFX + 'tension.mp3', 2, true, 0, 1); } catch (e) { } }
    if (!on && tensionOn) { tensionOn = false; try { gdjs.evtTools.sound.stopMusicOnChannel(S, 2); } catch (e) { } }
  }
  function tensionTo(target, dt) {
    if (!tensionOn) return;
    target = target * SV.musicVol / 100;
    const v = tensionVol + Math.sign(target - tensionVol) * Math.min(Math.abs(target - tensionVol), 60 * dt);
    if (Math.abs(v - tensionVol) > 0.5 || v === target) { tensionVol = v; try { gdjs.evtTools.sound.setMusicOnChannelVolume(S, 2, v); } catch (e) { } }
  }
  let unfocused = false;
  function applyMute() { try { gdjs.evtTools.sound.setGlobalVolume(S, SV.muted || unfocused ? 0 : 100); } catch (e) { } }
  // silence the game while its window or tab is in the background
  try {
    const setFocus = (f) => { if (unfocused !== !f) { unfocused = !f; applyMute(); } };
    window.addEventListener('blur', () => setFocus(false));
    window.addEventListener('focus', () => setFocus(true));
    document.addEventListener('visibilitychange', () => setFocus(!document.hidden));
    if (document.hidden || (document.hasFocus && !document.hasFocus())) unfocused = true;
  } catch (e) { /* no window (e.g. tests) */ }
  function toggleMute() { SV.muted = !SV.muted; applyMute(); save(); if (scr.soundBtn) anim(scr.soundBtn, SV.muted ? 'off' : 'on'); }

  // common widgets
  function soundButton() { scr.soundBtn = U('SoundBtn', 14, 826, 160); anim(scr.soundBtn, SV.muted ? 'off' : 'on'); }
  function kobanHud(x, y) {
    U('Koban', x, y, 160);
    scr.kobanText = label(String(SV.koban), x + 54, y + 8, 30, CREAM);
  }
  function backButton() { button('Back', 1380, 820, 180, 60, () => go('menu')); }

  // ================================================================= input
  function readInput() {
    const e = { dir: null, act: false, num: -1, enter: false, tab: false, esc: false, mute: false, tap: null, any: false };
    const hit = (id, codes) => { const d = codes.some((k) => im.isKeyPressed(k)); const w = prevKeys[id]; prevKeys[id] = d; return d && !w; };
    if (hit('L', [37, 65])) e.dir = 'L';
    if (hit('R', [39, 68])) e.dir = 'R';
    if (hit('U', [38, 87])) e.dir = 'U';
    if (hit('D', [40, 83])) e.dir = 'D';
    e.act = hit('A', [32, 69]);
    e.enter = hit('E', [13]);
    e.tab = hit('T', [9]);
    e.esc = hit('X', [27]);
    e.mute = hit('M', [77]);
    e.fish = hit('Q', [81]);
    e.rope = hit('RR', [82]);
    for (let i = 0; i < 5; i++) if (hit('N' + i, [49 + i, 97 + i])) e.num = i;
    const down = im.isMouseButtonPressed(0);
    const mx = im.getCursorX ? im.getCursorX() : im.getMouseX();
    const my = im.getCursorY ? im.getCursorY() : im.getMouseY();
    e.mx = mx; e.my = my; e.down = down; e.pressed = down && !mouseWas;
    if (down && !mouseWas) { pressX = mx; pressY = my; }
    if (!down && mouseWas) {
      const dx = mx - pressX, dy = my - pressY;
      if (Math.hypot(dx, dy) > 45) e.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U');
      else e.tap = { x: pressX, y: pressY };
    }
    mouseWas = down;
    e.any = !!(e.dir || e.act || e.enter || e.tap || e.num >= 0 || e.esc);
    return e;
  }

  // ================================================================= screens
  const SCREENS = {};
  function go(name, arg) {
    closeCodeBox();
    save();
    if (name !== 'heist') tension(false);
    try { S.getLayer('').setCameraX(800); S.getLayer('').setCameraY(450); } catch (e) { }
    clearScreen();
    pressedB = null;
    screen = name;
    scr = {};
    G = null;
    SCREENS[name].enter(arg || {});
  }

  // ----------------------------------------------------------------- shared manor drawing
  function drawBackground(league) { const b = M('Background', 0, 0, -100); anim(b, 'l' + league); ambient(league); musicFor(league); return b; }
  function drawManor(league, randomStyles, plain) {
    const L = 'l' + league + '_', rooms = LEAGUES[league - 1].rooms;
    drawBackground(league);
    for (let c = 0; c < COLS; c++) {
      anim(M('Roof', cx(c), GY - 130, 20), L + 'mid');
      // the end pieces are 20px wider: their wall is flush with the rooms at the top and flares out to the ground
      anim(M('Foundation', cx(c) - (c === 1 ? 20 : 0), GY + ROWS * CH, 10), L + (isBalc(c) ? 'balcony' : c === 1 ? 'room_l' : c === COLS - 2 ? 'room_r' : 'room'));
    }
    anim(M('Roof', GX - 110, GY - 130, 21), L + 'end_l');
    anim(M('Roof', cx(COLS), GY - 130, 21), L + 'end_r');
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      if (isBalc(c)) {
        anim(M('Balcony', cx(c), cy(r), 10), L + (c === 0 ? 'left' : 'right'));
        anim(M('Rail', cx(c), cy(r), 70), L + (c === 0 ? 'left' : 'right'));
      } else {
        const st = plain ? 'plain' : randomStyles ? rooms[Math.floor(Math.random() * rooms.length)] : rooms[(c * 7 + r * 13) % rooms.length];
        anim(M('Room', cx(c), cy(r), 10), L + st);
      }
    }
  }

  // ----------------------------------------------------------------- ambient: drifting clouds + falling leaves/petals/snow
  let lastAmb = null;   // clouds and particles carry on where they were when you change screens
  function ambient(league) {
    const prev = lastAmb && lastAmb.league === league ? lastAmb : null;
    const A = scr.amb = { clouds: [], parts: [], league: league };
    lastAmb = A;
    [[120, 96, 'a', 7], [1060, 52, 'b', 11], [620, 150, 'b', 5]].forEach(([x, y, k, v], i) => {
      const old = prev && prev.clouds[i];
      const cx0 = old ? old.x : x;
      const o = M('Cloud', cx0, y, -90); anim(o, 'l' + league + k);
      A.clouds.push({ o: o, x: cx0, y: y, v: v });
    });
    const n = league === 3 ? 60 : league === 4 ? 26 : 30;
    for (let i = 0; i < n; i++) {
      const o = M('Particle', 0, 0, -80); anim(o, 'l' + league);
      const old = prev && prev.parts[i];
      if (old) {
        old.o = o;
        if (o.setScale) o.setScale(old.scale || 1);
        o.setPosition(old.x, old.y); if (o.setAngle) o.setAngle(old.rot);
        A.parts.push(old);
      } else A.parts.push(resetPart({ o: o }, true));
    }
  }
  function resetPart(q, anywhere) {
    const L = scr.amb.league;
    q.x = Math.random() * 1700 - 100;
    q.y = anywhere ? Math.random() * 900 : -20;
    const drift = L === 3 || L === 4;            // snowflakes and fireflies float rather than tumble
    q.vy = L === 4 ? -6 + Math.random() * 14 : L === 3 ? 25 + Math.random() * 35 : 30 + Math.random() * 30;
    q.vx = drift ? -6 + Math.random() * 12 : 15 + Math.random() * 25;
    if (L === 4 && !anywhere) q.y = 300 + Math.random() * 550;
    q.sw = Math.random() * 6.28; q.rot = Math.random() * 360; q.vr = (Math.random() - 0.5) * (drift ? 0 : 160);
    q.scale = drift ? 0.6 + Math.random() * 0.9 : 0.8 + Math.random() * 0.5;
    if (q.o.setScale) q.o.setScale(q.scale);
    return q;
  }
  function updateAmbient(dt) {
    const A = scr.amb;
    if (!A) return;
    for (const c of A.clouds) { c.x += c.v * dt; if (c.x > 1650) c.x = -460; c.o.setX(c.x); }
    for (const q of A.parts) {
      q.sw += dt * 1.6; q.x += (q.vx + Math.sin(q.sw) * 18) * dt; q.y += q.vy * dt; q.rot += q.vr * dt;
      if (q.y > 910 || q.x > 1720 || q.y < -40 || q.x < -140) resetPart(q, false);
      if (A.league === 4) q.o.setOpacity(140 + 115 * Math.abs(Math.sin(q.sw * 1.7)));
      q.o.setPosition(q.x, q.y);
      if (q.o.setAngle) q.o.setAngle(q.rot);
    }
  }

  // ----------------------------------------------------------------- little effects shared by screens
  function emote(kind, x, y, follow) {
    const o = U('Emote', x, y, 170); anim(o, kind);
    (scr.fx = scr.fx || []).push({ kind: 'emote', o: o, t: 0, dur: 1.1, x: x, y: y, follow: follow });
  }
  function bubble(text, x, y) {
    const t = label(text, x, y, 22, CREAM, 'center');
    t.setZOrder(171);
    (scr.fx = scr.fx || []).push({ kind: 'bubble', o: t, t: 0, dur: 1.8, x: t.getX(), y: y });
  }
  function later(sec, fn) { (scr.timers = scr.timers || []).push({ t: sec, fn: fn }); }
  function updateScreenFx(dt) {
    if (scr.timers) for (let i = scr.timers.length - 1; i >= 0; i--) {
      const tm = scr.timers[i];
      tm.t -= dt;
      if (tm.t <= 0) { scr.timers.splice(i, 1); tm.fn(); if (!scr.timers) return; }
    }
    if (!scr.fx) return;
    for (let i = scr.fx.length - 1; i >= 0; i--) {
      const f = scr.fx[i];
      f.t += dt;
      const u = f.t / f.dur;
      if (f.kind === 'drop') {
        const e = Math.min(1, f.t / 0.35);
        const settle = Math.max(0, 1 - (f.t - 0.35) * 3);
        f.o.setY(lerp(f.y0, f.y1, e * e) - (e >= 1 ? Math.abs(Math.sin((f.t - 0.35) * 18)) * 6 * settle : 0));
        if (u >= 1) { f.o.setY(f.y1); scr.fx.splice(i, 1); }
        continue;
      }
      if (f.kind === 'toast') {
        const IN = 0.35, HOLD = 2.4, e = 1 - Math.pow(1 - (f.t < IN ? f.t / IN : f.t < IN + HOLD ? 1 : Math.max(0, 1 - (f.t - IN - HOLD) / 0.35)), 3);
        const y = lerp(-110, 16, e);
        f.bg.setY(y);
        for (const [o, dy] of f.parts) o.setY(y + dy - 4);
        if (u >= 1) { kill(f.bg); f.parts.forEach(([o]) => kill(o)); scr.fx.splice(i, 1); }
        continue;
      }
      if (u >= 1) { kill(f.o); scr.fx.splice(i, 1); continue; }
      if (f.kind === 'emote') {
        const bx = f.follow ? f.follow.getX() + 50 : f.x, by = f.follow ? f.follow.getY() - 40 : f.y;
        f.o.setPosition(bx, by - u * 18);
        f.o.setOpacity(u > 0.7 ? 255 * (1 - u) / 0.3 : 255);
      } else if (f.kind === 'bubble') {
        f.o.setPosition(f.x, f.y - u * 14);
        f.o.setOpacity(u > 0.75 ? 255 * (1 - u) / 0.25 : 255);
      } else if (f.kind === 'poof') {
        // sprite animation plays by itself; just removed when done
      }
    }
  }
  // landing from a floor jump: dust kicks out sideways from the paws, more for a louder landing
  function landFx(k, noise) {
    if (noise < 0.5) return;                       // Hai and an upgraded Kuro land like feathers
    const x = k.obj.getX() + CAT_W / 2, y = cy(k.r) + FLOOR - 6;
    const n = noise >= 1.5 ? 8 : 5, big = Math.min(1.3, noise / 1.6);
    for (let i = 0; i < n; i++) {
      const side = i % 2 ? 1 : -1, sp = (60 + Math.random() * 70) * big;
      const o = M('SmokePuff', x, y, 59); anim(o, 'b');
      G.fx.push({ kind: 'puff', o: o, t: 0, x: x + side * 8, y: y, vx: side * sp, vy: -10 - Math.random() * 25, s0: 0.12 * big, s1: (0.35 + Math.random() * 0.2) * big,
                  rot: Math.random() * 360, vr: side * 120, dur: 0.45 + Math.random() * 0.25 });
    }
    if (noise >= 1.5) G.shake = Math.max(G.shake || 0, 0.08);
  }
  // smoke-bomb cloud: puffs burst outwards, swell, drift up and thin out
  function smokeBurst(x, y, n, scale) {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + Math.random() * 0.5, sp = (50 + Math.random() * 90) * scale;
      const o = M('SmokePuff', x, y, 97); anim(o, Math.random() < 0.5 ? 'a' : 'b');
      G.fx.push({ kind: 'puff', o: o, t: -Math.random() * 0.08, x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * 0.6 - 20 * scale,
                  s0: (0.35 + Math.random() * 0.3) * scale, s1: (1.1 + Math.random() * 0.7) * scale, rot: Math.random() * 360, vr: (Math.random() - 0.5) * 90,
                  dur: 1.1 + Math.random() * 0.6 });
    }
  }
  function poofAt(x, y) {
    const o = M('Poof', x - 65, y - 55, 96);
    (scr.fx = scr.fx || []).push({ kind: 'poof', o: o, t: 0, dur: 0.45 });
  }
  function dogXY(c, r) { return { x: cx(c) + 22, y: cy(r) + FLOOR - 78 }; }
  function blankGrid() { const g = []; for (let r = 0; r < ROWS; r++) g.push('.......'); return g; }
  function gridSet(g, c, r, ch) { const row = g[r].split(''); row[c - 1] = ch; g[r] = row.join(''); }
  function gridGet(g, c, r) { return g[r][c - 1]; }
  function gridCount(g, ch) { return g.join('').split(ch).length - 1; }

  // ----------------------------------------------------------------- hats: an overlay sprite that follows a cat's animation frame
  function wearHat(id, catObj, scale) {
    const h = SV.hatsWorn[id];
    if (!h || !SV.hatsOwned.includes(h)) return null;
    const o = M('CatHat', catObj.getX(), catObj.getY() - HAT_PAD * scale, 61);
    o.setScale(scale);
    o.hatKind = h; o.hatScale = scale;
    return o;
  }
  const HAT_PAD = 20;               // px of headroom above the cat frame in every hat sprite (tools/hat_pad.py)
  // the loot bag rides on the cat's back: how far the back sits below its idle height in each pose (cat-frame px),
  // so the bag stays on a cat that is crouched in a net, arched in a startle or stretched in a jump
  const LOOT_DY = { idle: [0, 0], walk: [0, -1, 0, -1], jump: [-7, 1], startle: [-5, -6], struggle: [14, 15] };
  function lootDy(o) {
    const a = o.getAnimationName ? o.getAnimationName() : '';
    const t = LOOT_DY[a.slice(a.indexOf('_') + 1)];
    return t ? t[(o.getAnimationFrame ? o.getAnimationFrame() : 0) % t.length] || 0 : 0;
  }
  function syncHat(hat, catObj, face) {
    if (!hat) return;
    const a = catObj.getAnimationName ? catObj.getAnimationName() : '';
    const pose = a.slice(a.indexOf('_') + 1);
    anim(hat, hat.hatKind + '_' + pose);
    if (hat.setAnimationFrame && catObj.getAnimationFrame) hat.setAnimationFrame(catObj.getAnimationFrame());
    hat.setPosition(catObj.getX(), catObj.getY() - HAT_PAD * (hat.hatScale || 1));   // hat frames have headroom on top
    hat.flipX(face < 0);
    hat.hide(!!catObj.hiddenNow);
  }

  // ================================================================= MENU
  const menuCatMem = {};   // where each cat was standing in the garden, so returning to the menu doesn't reset them
  SCREENS.menu = {
    enter() {
      const L = LEAGUES[SV.league - 1];
      drawBackground(SV.league);
      scr.logo = U('Logo', 350, 6, 120);
      scr.logoT = 0;
      const items = [['Start Heist', () => go('heist', { league: SV.league })],
                     [dailyDone() ? 'Daily Heist (done)' : 'Daily: ' + todayTwist().name, () => go('heist', { daily: true })],
                     ['Team', () => go('team')], ['Cat Shop', () => go('shop')],
                     ['Treasury', () => go('treasury')], ['Manor Builder', () => go('builder')], ['Info', () => go('info')],
                     ['Settings', () => go('settings')]];
      items.forEach(([l, fn], i) => button(l, 600, 262 + i * 64, 400, 58, fn, { size: 26 }));
      scr.nMenu = items.length;
      scr.focus = 0;
      // league card: progress in wins, then the boss manor
      const card = U('Panel', 70, 262, 100); size(card, 470, 500);
      const cr = U('Crest', 245, 288, 120); anim(cr, 'l' + SV.league); size(cr, 120, 120);
      label(L.name, 305, 414, 28, INK, 'center');
      label('Rob ' + L.place + '.', 305, 446, 16, '120;70;50', 'center', 420);
      label(L.dogs + ' guards   -   Pay \u00d7' + L.koban, 305, 468, 16, '120;70;50', 'center', 420);
      label(L.intro, 305, 494, 15, INK, 'center', 410);
      const st = SV.leagueWins[SV.league - 1], beaten = SV.bossBeaten[SV.league - 1];
      let prog;
      if (beaten) prog = 'Boss beaten! Wins here: ' + st;
      else if (st >= L.winsForBoss) prog = 'The boss awaits: ' + L.boss.name;
      else prog = 'Wins: ' + st + ' / ' + L.winsForBoss + ' to open the boss manor';
      label(prog, 305, 540, 16, INK, 'center', 410);
      if (!beaten) {
        const n = Math.min(st, L.winsForBoss), tr = U('Slider', 150, 563, 121); anim(tr, 'track'); size(tr, 310, 22);
        if (n) { const fl = U('Slider', 150, 563, 122); anim(fl, 'fill'); size(fl, 9 + 292 * n / L.winsForBoss, 22); }
      }
      button(beaten ? 'Rematch Boss' : 'Boss Manor', 185, 596, 240, 56, () => {
        if (st < L.winsForBoss && !beaten) { const n = L.winsForBoss - st; sfx('thunk', 50); bubble('Win ' + n + ' more heist' + (n === 1 ? '' : 's') + ' first!', 305, 590); return; }
        go('heist', { boss: true, league: SV.league });
      }, { dim: st < L.winsForBoss && !beaten, size: 22 });
      // boss icon beside the button: faded while locked, bouncing with a "!" once the boss manor is open
      const open = st >= L.winsForBoss && !beaten;
      const bp = U('BossPortrait', 112, 590, 121); anim(bp, BOSS_LINES[L.n].who); size(bp, 64, 70);
      if (!open && !beaten) bp.setOpacity(80);
      if (beaten) { const ck = U('Check', 156, 636, 122); anim(ck, 'on'); size(ck, 26, 26); }
      if (open) {
        scr.bossIcon = { o: bp, alert: U('Emote', 150, 572, 123), t: 0 };
        anim(scr.bossIcon.alert, 'alert'); size(scr.bossIcon.alert, 34, 34);
        scr.bossBtn = BTNS[BTNS.length - 1];
      }
      button('<', 150, 662, 70, 52, () => switchLeague(-1), { dim: SV.league <= 1, size: 28 });
      button('>', 390, 662, 70, 52, () => switchLeague(1), { dim: SV.league >= SV.maxLeague, size: 28 });
      label('League ' + SV.league + ' of ' + NL, 305, 676, 18, INK, 'center');
      // the team hangs around in the garden
      scr.cats = SV.team.map((id, i) => {
        const o = M('Cat', 0, 0, 60);
        o.setScale(1.5);
        anim(o, id + '_idle');
        const m = menuCatMem[id];
        const c = { o: o, id: id, x: m ? m.x : 140 + i * 290, y: 900 - 64 * 1.5 - 8, face: m ? m.face : i >= 3 ? -1 : 1, state: 'idle', t: 1 + Math.random() * 3, tx: 0, hop: 0 };
        o.flipX(c.face < 0);
        o.setPosition(c.x, c.y);
        return c;
      });
      kobanHud(1380, 24);
      soundButton();
      label(VERSION, 1586 - VERSION.length * 9, 874, 16, CREAM);
      if (endlessUnlocked()) {
        // Endless Heist card, mirroring the league card on the left
        const ec = U('Panel', 1060, 262, 100); size(ec, 470, 500);
        label('Endless Heist', 1295, 296, 32, INK, 'center');
        const bag = U('Loot', 1240, 338, 120); size(bag, 110, 100);
        if (!SV.endlessPlayed) { const nw = label('NEW!', 1352, 340, 24, '200;48;36'); if (nw.setAngle) nw.setAngle(14); }
        label('Manor after manor, each tougher than the last. Cats caught along the way stay caged for the whole run - how far can your crew get?', 1295, 452, 16, INK, 'center', 410);
        label(SV.endlessBest ? 'Best streak: ' + SV.endlessBest + ' manors' : 'No runs yet', 1295, 530, 20, '120;70;50', 'center');
        const run = SV.endless;
        if (run) {
          label('Run in progress: manor ' + run.round + (run.out.length ? ', ' + run.out.length + ' caged' : ''), 1295, 562, 16, INK, 'center', 410);
          button('Continue run', 1145, 596, 300, 56, () => { SV.endlessPlayed = true; go('heist', { endless: true }); }, { size: 22 });
          button('End run', 1215, 662, 160, 52, () => { endEndless(); sfx('thunk', 50); go('menu'); }, { size: 20 });
        } else {
          button('Start run', 1145, 596, 300, 56, () => { SV.endlessPlayed = true; startEndless(); }, { size: 22 });
          label('Your current team goes in.', 1295, 676, 16, '120;70;50', 'center');
        }
      }
      scr.cats.forEach((c) => { c.hat = wearHat(c.id, c.o, 1.5); });
      if (!SV.tutorialOffered) {
        SV.tutorialOffered = true; save();
        const objs = [];
        const dim = U('Dim', 0, 0, 180); size(dim, 1600, 900); dim.setOpacity(150); dim.setZOrder(180); objs.push(dim);
        const pn = U('Panel', 380, 250, 181); size(pn, 840, 380); pn.setZOrder(181); objs.push(pn);
        const t1 = label('New to cat burglary?', 800, 310, 36, INK, 'center'); t1.setZOrder(182); objs.push(t1);
        const t2 = label('A short training heist shows you the ropes: sneaking, noise, hiding, and cracking the vault.', 800, 372, 20, INK, 'center', 700);
        t2.setZOrder(182); objs.push(t2);
        const close = () => { objs.forEach((o) => { if (o.b) { kill(o.b); kill(o.t); } else kill(o); }); BTNS = BTNS.filter((b) => !objs.includes(b)); scr.modal = false; };
        const b1 = button('Play training heist', 450, 480, 330, 70, () => { close(); go('heist', { tutorial: true }); });
        const b2 = button('Skip', 820, 480, 330, 70, () => close());
        for (const b of [b1, b2]) { b.b.setZOrder(183); b.t.setZOrder(184); objs.push(b); }
        scr.modal = objs;
      }
    },
    tap(p) {
      if (scr.modal) return;
      for (const c of scr.cats) {
        if (inside(p, c.x, c.y - 10, 126, 106)) { petCat(c); return; }
      }
      if (inside(p, 350, 6, 900, 250)) { scr.logoT = 0.8; sfx('alarm', 45, 0.05); }
    },
    update(ev, dt) {
      if (scr.lmx !== undefined && (ev.mx !== scr.lmx || ev.my !== scr.lmy)) {
        BTNS.forEach((B, i) => { if (i < scr.nMenu && inside({ x: ev.mx, y: ev.my }, B.x, B.y, B.w, B.h)) scr.focus = i; });
      }
      scr.lmx = ev.mx; scr.lmy = ev.my;
      if (ev.dir === 'U') scr.focus = (scr.focus + scr.nMenu - 1) % scr.nMenu;
      if (ev.dir === 'D') scr.focus = (scr.focus + 1) % scr.nMenu;
      if (ev.dir === 'L' && SV.league > 1) { switchLeague(-1); return; }
      if (ev.dir === 'R' && SV.league < SV.maxLeague) { switchLeague(1); return; }
      if (ev.dir === 'U' || ev.dir === 'D') sfx('select', 35, 0, 1 + scr.focus * 0.08);
      if (scr.modal) return;
      if (ev.enter || ev.act) { sfx('select', 60); BTNS[scr.focus].fn(); return; }
      BTNS.forEach((B, i) => { if (B.b.setColor && i < scr.nMenu) B.b.setColor(i === scr.focus ? '255;215;170' : '255;255;255'); });
      // logo wobble
      if (scr.bossIcon) {               // the open boss manor calls for attention
        const b = scr.bossIcon; b.t += dt;
        const hop = Math.abs(Math.sin(b.t * 3.2)) * 6;
        b.o.setY(590 - hop); b.alert.setY(572 - hop * 1.6);
        if (scr.bossBtn && scr.bossBtn.b.setColor) {
          const g = Math.round(205 + 50 * (0.5 + 0.5 * Math.sin(b.t * 4)));
          scr.bossBtn.b.setColor('255;' + g + ';' + Math.round(g * 0.75));
        }
      }
      if (scr.logoT > 0) { scr.logoT -= dt; if (scr.logo.setAngle) scr.logo.setAngle(Math.sin(scr.logoT * 30) * 4 * scr.logoT); }
      // wandering cats
      for (const c of scr.cats) {
        c.t -= dt;
        if (c.state === 'hop') {
          c.hop += dt;
          const u = Math.min(1, c.hop / 0.55);
          c.o.setPosition(c.x, c.y - Math.sin(Math.PI * u) * 70);
          if (u >= 1) { c.state = 'idle'; c.t = 1.5 + Math.random() * 2; anim(c.o, c.id + '_idle'); }
          continue;
        }
        if (c.state === 'walk') {
          const d = Math.sign(c.tx - c.x);
          c.x += d * 70 * dt;
          if (Math.abs(c.tx - c.x) < 3 || c.t <= 0) { c.state = 'idle'; c.t = 2 + Math.random() * 4; anim(c.o, c.id + '_idle'); }
        } else if (c.t <= 0) {
          const r = Math.random();
          if (scr.modal) { c.t = 1; continue; }
          if (r < 0.65) {
            c.tx = Math.max(20, Math.min(1450, c.x + (Math.random() < 0.5 ? -1 : 1) * (80 + Math.random() * 220)));
            c.face = c.tx > c.x ? 1 : -1; c.o.flipX(c.face < 0);
            c.state = 'walk'; c.t = 6; anim(c.o, c.id + '_walk');
          } else if (r < 0.8) { c.state = 'hop'; c.hop = 0; anim(c.o, c.id + '_jump'); }
          else { c.t = 2 + Math.random() * 3; c.face = -c.face; c.o.flipX(c.face < 0); }
        }
        c.o.setPosition(c.x, c.y);
      }
      scr.cats.forEach((c) => { syncHat(c.hat, c.o, c.face); menuCatMem[c.id] = { x: c.x, face: c.face }; });
    },
  };
  function petCat(c) {
    if (c.state === 'hop') return;
    c.state = 'hop'; c.hop = 0; anim(c.o, c.id + '_jump');
    sfx('meow', 75, 0.05, { kuro: 0.9, tora: 0.85, mike: 1.05, shiro: 1.15, hai: 1.0, kin: 1.1, sora: 1.2, momo: 1.25, goro: 0.75 }[c.id] || 1);
    emote(Math.random() < 0.5 ? 'heart' : 'note', c.x + 80, c.y - 70);
    const lines = CHATTER[c.id].concat(['Nya!', 'Mrrp?']);
    bubble(lines[Math.floor(Math.random() * lines.length)], c.x + 63, c.y - 40);
  }
  function switchLeague(d) {
    const n = SV.league + d;
    if (n < 1 || n > SV.maxLeague) { sfx('thunk', 50); return; }
    SV.league = n; save();
    sfx('select', 60, 0, 1 + n * 0.15);
    go('menu');
  }

  // ================================================================= HELP
  // Info: tabbed pages. Paragraphs are left unbroken so the text object's wrapping lays them out.
  const INFO_GUARDS = [
    { tool: 'dog', name: 'Guard dog', league: 1, desc: 'Sleeps until noise fills its bubble, then barks (a shutter slams) and hunts cats on its floor. Cannot jump floors.' },
    { tool: 'patrol', name: 'Patrol dog', league: 2, desc: 'Never sleeps: paces its floor back and forth. Found in boss manors and the Builder.' },
    { tool: 'samurai', name: 'Samurai', league: 3, desc: 'Sleeps very deeply, but once awake he is fast, and Tora cannot scare him off or hold him back.' },
    { tool: 'ninja', name: 'Ninja', league: 4, desc: 'Wakes like a dog, but hunts the nearest cat on ANY floor, leaping up and down between floors. Hide to shake him off.' },
    { tool: 'owl', name: 'Owl', league: 2, desc: 'Opens its eyes every few seconds and watches its whole floor. Be hidden or off that floor.' },
    { tool: 'komainu', name: 'Komainu', league: 5, desc: 'A stone lion-dog. Its eyes blaze every few seconds and it roars at cats in its room or the rooms beside it.' },
    { tool: 'hide', name: 'Hiding spot', league: 1, desc: 'Wardrobes and screens. Press the action button to hide; nothing can see or catch you there.' },
    { tool: 'loot', name: 'Side loot', league: 1, desc: 'Coin pouches, scrolls and sake jars worth bonus koban - paid only if the heist succeeds.' },
  ];
  const INFO_TRAPS = [
    { tool: 'squeak', name: 'Nightingale floor', league: 1, desc: 'Squeaks loudly every time a cat crosses it. It never runs out.' },
    { tool: 'bell', name: 'Bell string', league: 1, desc: 'Rings the alarm once: a shutter slams shut.' },
    { tool: 'net', name: 'Net trap', league: 1, desc: 'Holds the cat for 3 seconds.' },
    { tool: 'lantern', name: 'Watch lantern', league: 2, desc: 'Lit 1.6s of every 3.8s. Be in its room while lit and the alarm sounds.' },
    { tool: 'caltrops', name: 'Caltrops', league: 2, desc: 'The cat yowls and is stunned for 1.5 seconds.' },
    { tool: 'gong', name: 'Gong', league: 3, desc: 'An enormous BWONG that can wake every dog on the floor.' },
    { tool: 'trapdoor', name: 'Trapdoor', league: 3, desc: 'Drops the cat into the room below.' },
    { tool: 'firecracker', name: 'Firecrackers', league: 4, desc: 'A huge bang, once. The noise spills into the rooms left, right, above and below.' },
    { tool: 'spinwall', name: 'Spinning wall', league: 5, desc: 'The first cat through is spun straight back to the room it came from. After that it stays open.' },
  ];
  function infoGrid(entries) {
    entries = entries.filter((e) => e.league <= SV.maxLeague);
    entries.forEach((e, i) => {
      const x = 258 + (i % 3) * 372, y = 238 + Math.floor(i / 3) * 172;
      card(x - 12, y - 12, 360, 160);
      const sl = U('Slot', x, y, 120); anim(sl, 'normal'); size(sl, 80, 80);
      const ic = U('Tool', x - 5, y - 5, 121); anim(ic, e.tool);
      label(e.name, x + 90, y - 4, 20, INK);
      label(e.league === 1 ? 'All leagues' : 'From the ' + LEAGUES[e.league - 1].name, x + 90, y + 20, 14, '170;60;40');
      label(e.desc, x + 90, y + 40, 15, INK, null, 250);
    });
  }
  SCREENS.info = {
    enter(arg) {
      const page = arg.page || 0;
      drawBackground(SV.league);
      panel(200, 110, 1200, 700);
      screenTitle('Info');
      ['How to Play', 'Guards', 'Traps', 'Cats & Gadgets', 'Stats'].forEach((t, i) =>
        button(t, 268 + i * 216, 162, 206, 52, () => go('info', { page: i }), { on: page === i, size: 20 }));
      scr.page = page;
      if (page === 0) {
        label([
          'Sneak into the manor, find the hidden vault, crack it, and escape to a balcony with the loot.',
          'Choose a cat with 1-5 or by tapping its portrait, then press Left/Right or tap a balcony to send it in. Move with WASD, the arrow keys, or by swiping. Up and down jump between floors. A cat can only move again once its walk or jump has finished.',
          'Space, E or the red button does the right thing for where you are: crack the vault, hide in a wardrobe, pry a shutter (Mike), or meow to lure dogs. Opening the vault sets off its alarm unless Mike helps crack it.',
          'Noise: every step makes noise, jumps more, and cracking or opening the vault a lot. Each sleeping dog has a bubble that fills as noise reaches it - dogs close by hear most, dogs on other floors less. A full bubble wakes the dog: it barks, which raises the alarm. Bubbles drain slowly, so waiting is often the safe move. Kuro is almost silent.',
          'Alarms slam shutters shut, but one alarm (anything going off within 3 seconds) closes at most 3. If every shutter is shut, only Mike can pry one open - if he is caught too, the heist is over.',
          'Escape with the loot to win. Enough wins in a league unlock its boss manor; beat the boss to reach the next league.',
        ].join('\n\n'), 290, 232, 18, INK, null, 1020);
        button('Play the training heist', 600, 692, 400, 58, () => go('heist', { tutorial: true }), { size: 22 });
      } else if (page === 1) infoGrid(INFO_GUARDS);
      else if (page === 2) infoGrid(INFO_TRAPS);
      else if (page === 3) {
        label([
          'Teamwork: any cat can MEOW (action button with nothing else to do) to lure awake dogs on its floor to its room for 5 seconds. Dogs will not step into a room where Tora stands (samurai will). Cats cracking a vault together add their speed, and boss vaults need two at once. Momo frees caged teammates.',
          'The loot: it is too big to hide with, so a cat carrying it drops it when it hides (it grabs it again on the way out). A smoke bomb or Goro\'s escape also leaves it behind. Any cat can pick it up by walking into that room.',
          'Gadgets (Cat Shop): dried fish (Q) is thrown into the next room and awake dogs on that floor go eat it. The grappling rope (R) makes your next up/down jump climb two floors. A smoke bomb is used automatically to escape a capture. You can own up to 99 of each gadget, and use up to 3 of each per heist.',
          'Upgrades (Cat Shop) give each cat one extra edge. Hats (Cat Shop, Wardrobe) are just for style: equip them on the Team screen.',
          'Noise bubbles: a bubble over a sleeping dog fills up and turns red as noise reaches it. When it lifts its head and opens an eye, it is about to wake. Noise fades slowly, so waiting is often the safe move.',
        ].join('\n\n'), 290, 232, 18, INK, null, 1020);
      } else statsPage();
      backButton();
      soundButton();
    },
    update(ev) {
      if (ev.dir === 'L' && scr.page > 0) go('info', { page: scr.page - 1 });
      else if (ev.dir === 'R' && scr.page < 4) go('info', { page: scr.page + 1 });
    },
  };

  function statsPage() {
    const st = SV.stats, n = (k) => (st[k] || 0).toLocaleString ? (st[k] || 0).toLocaleString() : String(st[k] || 0);
    const mmss = (t) => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
    const hrs = SV.playTime >= 3600 ? Math.floor(SV.playTime / 3600) + 'h ' + Math.floor((SV.playTime % 3600) / 60) + 'm' : Math.floor(SV.playTime / 60) + 'm';
    const played = SV.wins + (st.losses || 0);
    const rate = played ? Math.round((SV.wins / played) * 100) + '%' : '-';
    const found = TREASURES.filter((t) => SV.treasures[t.id]).length;
    const achN = ACHIEVEMENTS.filter((a) => SV.ach[a.id]).length;
    const col = (title, rows, x) => {
      label(title, x, 232, 24, '170;60;40');
      label(rows.map((r) => r[0]).join('\n'), x, 270, 19, INK);
      label(rows.map((r) => r[1]).join('\n'), x + 215, 270, 19, INK);
    };
    col('Heists', [
      ['Heists finished', played], ['Wins', SV.wins + '  (' + rate + ')'], ['Losses', n('losses')],
      ['Perfect wins', n('perfect')], ['Night wins', n('nightWins')], ['Daily wins', n('dailyWins')],
      ['Boss wins', n('bossWins')], ['Bosses beaten', SV.bossBeaten.filter(Boolean).length + ' / ' + NL],
      ['Fastest heist', SV.bestTime ? mmss(SV.bestTime) : '-'], ['Time played', hrs],
    ], 262);
    col('Loot', [
      ['Koban now', SV.koban.toLocaleString()], ['Koban earned', SV.totalKoban.toLocaleString()],
      ['Best payout', n('mostKoban')], ['Vaults cracked', n('vaults')], ['Treasures found', found + ' / ' + TREASURES.length],
      ['Achievements', achN + ' / ' + ACHIEVEMENTS.length], ['Cats unlocked', SV.unlocked.length + ' / ' + CAT_ORDER.length],
      ['Upgrades bought', Object.keys(SV.upgrades).length + ' / ' + CAT_ORDER.length],
    ], 632);
    col('Sneaking', [
      ['Rooms walked', n('steps')], ['Floors jumped', n('jumps')], ['Dogs woken', n('dogsWoken')],
      ['Alarms raised', n('alarms')], ['Traps sprung', n('traps')], ['Traps disarmed', n('disarmed')],
      ['Lure meows', n('lures')], ['Hisses / escapes', n('hisses') + ' / ' + n('escapes')],
      ['Caught / rescued', SV.caught + ' / ' + n('rescues')],
    ], 1002);
    // favourite cat
    const fav = Object.keys(SV.catUse).sort((a, b) => SV.catUse[b] - SV.catUse[a])[0];
    if (fav) {
      const pp = U('Portrait', 600, 548, 121); anim(pp, fav); size(pp, 110, 110);
      label('Favourite burglar', 722, 556, 20, '170;60;40');
      label(CATDEFS[fav].name + ' ' + CATDEFS[fav].title, 722, 584, 24, INK);
      label('Sent on ' + SV.catUse[fav] + ' heist' + (SV.catUse[fav] === 1 ? '' : 's') + '. Practice runs are not counted.', 722, 620, 17, INK);
    } else label('Play a heist to start collecting stats. Practice runs are not counted.', 800, 580, 20, INK, 'center');
  }

  // ================================================================= ENDING (after the first win over the Shogun)
  SCREENS.ending = {
    enter() {
      drawBackground(NL);
      for (let c = 0; c < 11; c++) anim(M('Roof', -20 + c * 150, 640, 20), 'l' + NL + '_mid');
      const crew = SV.team.map((id, i) => {
        const o = M('Cat', 260 + i * 230, 640 - 64 * 1.6 + 16, 60);
        o.setScale(1.6); anim(o, id + '_idle'); o.flipX(i >= 3);
        o.baseY = o.getY();
        const h = o.hat = wearHat(id, o, 1.6); if (h) syncHat(h, o, i >= 3 ? -1 : 1);
        return o;
      });
      const lootO = M('Loot', 260 + 2 * 230 + 40, 640 - 40, 61); lootO.setScale(1.4);
      const pn = U('Panel', 240, 60, 100); size(pn, 1120, 440);
      label('Epilogue', 800, 100, 40, INK, 'center');
      label('The Golden Pavilion falls silent behind you. Five small shadows slip across the golden rooftops at dusk, a green bundle of treasure bouncing between them.\n\n' +
        'By morning, all of Japan is whispering about the cat burglars who robbed the Elder, the Merchant Princess, the Shogun, the Festival Lord and the Emperor himself, and never left a single paw print.\n\n' +
        'Your crew is the greatest in Japan. But there are always more manors, and the daily heist is waiting.', 300, 160, 21, INK, null, 1000);
      label('Thank you for playing Neko Heist!   Made with GDevelop.', 800, 430, 20, '170;60;40', 'center');
      button('Back to the menu', 600, 780, 400, 70, () => go('menu'));
      later(0.5, () => sfx('league', 80));
      scr.crew = crew;
      soundButton();
    },
    update(ev, dt) {
      (scr.crew || []).forEach((o, i) => {
        if (Math.random() < 0.004 && !o.hopT) { o.hopT = 0.5; anim(o, SV.team[i] + '_jump'); }
        if (o.hopT) {   // a little hop of joy (the hat rides along)
          o.hopT = Math.max(0, o.hopT - dt);
          o.setY(o.baseY - Math.sin(Math.PI * (1 - o.hopT / 0.5)) * 26);
          if (!o.hopT) anim(o, SV.team[i] + '_idle');
        }
        syncHat(o.hat, o, i >= 3 ? -1 : 1);
      });
    },
  };

  // ================================================================= SETTINGS
  SCREENS.settings = {
    enter(arg) {
      drawBackground(SV.league);
      panel(200, 110, 1200, 700);
      screenTitle('Settings');
      const row = (y, name, value, ctrls) => {
        label(name, 290, y + 14, 22, INK);
        if (value != null) label(value, 540, y + 16, 20, '170;60;40');
        ctrls.forEach(([l, fn, w, opts], i) => button(l, SL_X + i * 110 + (i && ctrls[0][2] > 100 ? ctrls[0][2] - 100 : 0), y, w || 100, 56, fn, Object.assign({ size: 22 }, opts || {})));
      };
      scr.sliders = [slider(222, 'Music volume', 'musicVol'), slider(292, 'Sound effects', 'sfxVol')];
      const nextLang = LANG_ORDER[(LANG_ORDER.indexOf(SV.lang || 'en') + 1) % LANG_ORDER.length];
      row(362, 'Language', LANGS[SV.lang || 'en'].name, [[LANGS[nextLang].name, () => { SV.lang = nextLang; save(); sfx('select', 70); go('settings'); }, 210]]);
      row(432, 'Vibration', SV.vibrate ? 'On' : 'Off', [[SV.vibrate ? 'Turn off' : 'Turn on', () => { SV.vibrate = !SV.vibrate; save(); vibrate(60); go('settings'); }, 210]]);
      row(502, 'Training heist', SV.tutorialDone ? 'Completed' : 'Not played', [['Play', () => go('heist', { tutorial: true }), 210]]);
      scr.resetArmed = arg.resetArmed || false;
      row(572, 'Reset progress', null, [[scr.resetArmed ? 'Tap again to ERASE' : 'Reset...', () => {
        if (!scr.resetArmed) { sfx('thunk', 60); go('settings', { resetArmed: true }); return; }
        const keep = { muted: SV.muted, musicVol: SV.musicVol, sfxVol: SV.sfxVol, vibrate: SV.vibrate, lang: SV.lang };
        SV = Object.assign(defaultSave(), keep, { tutorialOffered: true }); save();
        sfx('poof', 70); go('settings', { msg: 'Progress erased. A fresh start!' });
      }, 300]]);
      if (scr.resetArmed) label('This erases koban, cats, treasures, wins, stats and saved manors.', 290, 636, 18, '170;60;40');
      card(1090, 200, 252, 420);
      label('Controls', 1108, 212, 22, '170;60;40');
      const keys = [['1-5 / tap', 'choose a cat'], ['Arrows/WASD', 'move'], ['swipe', 'move (touch)'], ['Space / E', 'action'], ['Q', 'throw fish'],
                    ['R', 'arm rope'], ['Tab', 'next cat'], ['M', 'mute'], ['Esc', 'menu']];
      label(keys.map((k) => k[0]).join('\n'), 1106, 252, 15, INK);
      label(keys.map((k) => k[1]).join('\n'), 1234, 252, 15, '120;70;50');
      if (arg.msg) label(arg.msg, 800, 726, 20, '60;120;60', 'center');
      backButton();
      soundButton();
    },
    update(ev) {
      // drag a slider: grab the knob or anywhere on its track, release to keep the value
      if (scr.codeOpen) return;
      if (ev.pressed) scr.drag = scr.sliders.find((sl) => ev.mx >= SL_X - 24 && ev.mx <= SL_X + SL_W + 24 && Math.abs(ev.my - sl.cy) <= 28) || null;
      if (scr.drag && ev.down) setSlider(scr.drag, ev.mx);
      if (scr.drag && !ev.down) {
        if (scr.drag.key === 'sfxVol') sfx('select', 80);
        save(); scr.drag = null;
      }
    },
  };
  const SL_X = 700, SL_W = 320;      // settings slider track
  function slider(y, name, key) {
    label(name, 290, y + 14, 22, INK);
    const sl = { key: key, cy: y + 28 };
    sl.val = label('', 540, y + 16, 20, '170;60;40');
    sl.track = U('Slider', SL_X, y + 15, 120); anim(sl.track, 'track');
    sl.fill = U('Slider', SL_X, y + 15, 121); anim(sl.fill, 'fill');
    sl.knob = U('SliderKnob', 0, y + 6, 122);
    drawSlider(sl);
    return sl;
  }
  function drawSlider(sl) {
    const v = SV[sl.key];
    txt(sl.val, v + '%');
    const w = Math.max(1, (SL_W - 18) * v / 100);
    sl.fill.setPosition(SL_X, sl.fill.getY()); size(sl.fill, Math.max(1, 9 + w), 26);
    sl.fill.hide(v <= 0);
    sl.knob.setX(SL_X + 9 + w - 22);
  }
  function setSlider(sl, mx) {
    const v = Math.max(0, Math.min(100, Math.round(((mx - SL_X - 9) / (SL_W - 18)) * 100 / 5) * 5));
    if (v === SV[sl.key]) return;
    SV[sl.key] = v;
    if (sl.key === 'musicVol') applyMusicVol();
    drawSlider(sl);
  }

  // ================================================================= TEAM
  function catCard(id, x, y, state, sz) {
    sz = sz || 116;
    const sl = U('Slot', x, y, 120);
    anim(sl, state); size(sl, sz, sz);
    if (state !== 'locked') { const p = U('Portrait', x + sz * 0.07, y + sz * 0.07, 121); anim(p, id); size(p, sz * 0.86, sz * 0.86); }
    return sl;
  }
  // Team screen: tap anything to read about it; drag a cat onto a team slot to add it, drag a hat onto a cat to put it on.
  SCREENS.team = {
    enter(arg) {
      drawBackground(SV.league);
      panel(200, 110, 1200, 700);
      scr.sel = arg.sel || { kind: 'cat', id: SV.team[0] };
      scr.drops = []; scr.drags = [];
      screenTitle('Your Team');
      label('Tap a cat or hat to read about it.  Drag a cat onto a team slot to add it.  Drag a hat onto a cat to put it on.', 800, 198, 16, '120;70;50', 'center', 1100);
      // the five team slots
      SV.team.forEach((id, i) => {
        const x = 475 + i * 130, y = 232;
        const sl = catCard(id, x, y, isSel('cat', id) ? 'selected' : 'normal');
        label(CATDEFS[id].name, x + 58, y + 120, 20, INK, 'center');
        const drop = { x: x, y: y, w: 116, h: 116, slot: sl, team: i, cat: id };
        scr.drops.push(drop);
        scr.drags.push({ x: x, y: y, w: 116, h: 116, kind: 'cat', id: id, fromTeam: i });
        const h = SV.hatsWorn[id];
        if (h && SV.hatsOwned.includes(h)) {   // hat badge: drag it off to take the hat off
          const hb = U('HatIcon', x + 72, y - 14, 123); anim(hb, h); size(hb, 52, 52);
          scr.drags.unshift({ x: x + 72, y: y - 14, w: 52, h: 52, kind: 'hat', id: h, wornBy: id });
        }
      });
      // roster
      label('Roster', 520, 382, 24, INK, 'center');
      CAT_ORDER.forEach((id, j) => {
        const x = 248 + (j % 5) * 112, y = 418 + Math.floor(j / 5) * 126;
        const owned = SV.unlocked.includes(id);
        const sl = catCard(id, x, y, owned ? (isSel('cat', id) ? 'selected' : 'normal') : 'locked', 96);
        if (SV.team.includes(id)) sl.setOpacity(140);
        label(owned ? CATDEFS[id].name : '???', x + 48, y + 98, 16, INK, 'center');
        const h = SV.hatsWorn[id];
        if (owned && h && SV.hatsOwned.includes(h)) { const hb = U('HatIcon', x + 62, y - 8, 123); anim(hb, h); size(hb, 38, 38); }
        scr.drags.push({ x: x, y: y, w: 96, h: 96, kind: 'cat', id: id, locked: !owned });
        if (owned) scr.drops.push({ x: x, y: y, w: 96, h: 96, slot: sl, cat: id, rosterOnly: true });
      });
      // hats
      const hx0 = 520 - (78 + HAT_ORDER.length * 72 - 10) / 2;   // label + chips, centred under the roster
      label('Hats', hx0, 700, 22, INK);
      HAT_ORDER.forEach((h, i) => {
        const x = hx0 + 78 + i * 72, y = 684, owned = SV.hatsOwned.includes(h);
        const sl = U('Slot', x, y, 120); anim(sl, !owned ? 'locked' : isSel('hat', h) ? 'selected' : 'normal'); size(sl, 62, 62);
        if (owned) { const ic = U('HatIcon', x + 3, y + 3, 121); anim(ic, h); size(ic, 56, 56); }
        scr.drags.push({ x: x, y: y, w: 62, h: 62, kind: 'hat', id: h, locked: !owned });
      });
      // info card
      const card = U('Panel', 836, 384, 101); size(card, 520, 376); card.setColor && card.setColor('235;225;210');
      drawInfo();
      if (arg.msg) bubble(arg.msg, 800, 376);
      backButton();
      soundButton();
      kobanHud(1380, 24);
    },
    tap(p) {
      if (scr.drag && scr.drag.active) return;          // that was a drag, not a tap
      const d = scr.drags.find((q) => inside(p, q.x, q.y, q.w, q.h));
      if (!d) return;
      sfx('select', 50, 0, d.kind === 'hat' ? 1.5 : 1.2);
      go('team', { sel: { kind: d.kind, id: d.id } });
    },
    update(ev, dt) {
      if (ev.pressed) {
        const d = scr.drags.find((q) => inside({ x: ev.mx, y: ev.my }, q.x, q.y, q.w, q.h));
        scr.drag = d && !d.locked ? { src: d, x0: ev.mx, y0: ev.my, active: false } : null;
      }
      const D = scr.drag;
      if (!D) return;
      if (ev.down) {
        if (!D.active && Math.hypot(ev.mx - D.x0, ev.my - D.y0) > 12) {   // picked up
          D.active = true;
          D.ghost = U(D.src.kind === 'cat' ? 'Portrait' : 'HatIcon', 0, 0, 200);
          anim(D.ghost, D.src.id); size(D.ghost, 90, 90); D.ghost.setOpacity(215);
          sfx('select', 50, 0, 1.6);
        }
        if (D.active) {
          D.ghost.setPosition(ev.mx - 45, ev.my - 45);
          const t = dropAt(ev.mx, ev.my, D.src);
          for (const q of scr.drops) anim(q.slot, q === t ? 'selected' : isSel('cat', q.cat) ? 'selected' : 'normal');
          for (const q of scr.drops) if (q.slot.setColor) q.slot.setColor(q === t ? '255;235;150' : '255;255;255');
        }
        return;
      }
      // released
      scr.drag = null;
      if (!D.active) return;
      kill(D.ghost);
      const t = dropAt(ev.mx, ev.my, D.src), s = D.src;
      if (s.kind === 'cat') {
        if (!t) { sfx('thunk', 40); go('team', { sel: scr.sel }); return; }
        const j = t.team, k = SV.team.indexOf(s.id);
        if (k === j) { go('team', { sel: scr.sel }); return; }
        if (k >= 0) { SV.team[k] = SV.team[j]; SV.team[j] = s.id; }         // swap two team members
        else SV.team[j] = s.id;                                                // bring in from the roster
        save(); sfx('land', 70); sfx('select', 50, 0, 1.4);
        go('team', { sel: { kind: 'cat', id: s.id }, msg: CATDEFS[s.id].name + (k >= 0 ? ' moves to slot ' + (j + 1) : ' joins the team!') });
      } else {
        if (t) {
          SV.hatsWorn[t.cat] = s.id;
          if (s.wornBy && s.wornBy !== t.cat) delete SV.hatsWorn[s.wornBy];
          save(); sfx('select', 70, 0, 1.4); poofAt(ev.mx, ev.my);
          go('team', { sel: { kind: 'cat', id: t.cat }, msg: CATDEFS[t.cat].name + ' puts on the ' + HATS[s.id].name.toLowerCase() + '!' });
        } else if (s.wornBy) {
          delete SV.hatsWorn[s.wornBy]; save(); sfx('thunk', 50);
          go('team', { sel: { kind: 'cat', id: s.wornBy }, msg: CATDEFS[s.wornBy].name + ' takes off the hat.' });
        } else go('team', { sel: scr.sel });
      }
    },
  };
  function isSel(kind, id) { return scr.sel && scr.sel.kind === kind && scr.sel.id === id; }
  function dropAt(x, y, src) {
    // cats can only be dropped on team slots; hats on any cat you own
    return scr.drops.find((q) => (src.kind === 'hat' || !q.rosterOnly) && x >= q.x - 10 && x <= q.x + q.w + 10 && y >= q.y - 10 && y <= q.y + q.h + 10) || null;
  }
  function drawInfo() {
    const s = scr.sel, X = 866, Y = 412, TX = 1030, TW = 280;
    if (s.kind === 'cat') {
      const d = CATDEFS[s.id], owned = SV.unlocked.includes(s.id), u = UPGRADES[s.id];
      catCard(s.id, X, Y, owned ? 'normal' : 'locked', 140);
      const h = SV.hatsWorn[s.id];
      if (owned && h && SV.hatsOwned.includes(h)) { const hb = U('HatIcon', X + 92, Y - 18, 123); anim(hb, h); size(hb, 64, 64); }
      label(owned ? d.name : '???', TX, Y - 4, 30, INK);
      label(owned ? d.title : 'A cat you have not met yet', TX, Y + 34, 18, '170;60;40', null, TW);
      label(catDesc(s.id), TX, Y + 64, 18, INK, null, TW);
      const lines = [];
      if (!owned) lines.push('Recruit in the Cat Shop for ' + d.price + ' koban.');
      else if (SV.team.includes(s.id)) lines.push('On your team (slot ' + (SV.team.indexOf(s.id) + 1) + ').');
      else lines.push('In the roster: drag onto a team slot to bring them along.');
      if (u) lines.push('Upgrade: ' + u.desc + (up(s.id) ? '  (bought!)' : owned ? '  (Cat Shop, ' + u.price + ' koban)' : ''));
      if (owned) lines.push(h && SV.hatsOwned.includes(h) ? 'Wearing the ' + HATS[h].name.toLowerCase() + '.' : 'No hat. Drag one onto this cat.');
      if (owned && SV.catUse[s.id]) lines.push('Sent on ' + SV.catUse[s.id] + ' heist' + (SV.catUse[s.id] === 1 ? '' : 's') + '.');
      label(lines.join('\n'), X, Y + 170, 17, INK, null, 440);
      if (owned && h && SV.hatsOwned.includes(h)) button('Take off hat', 1140, 664, 180, 56, () => { delete SV.hatsWorn[s.id]; save(); go('team', { sel: s }); }, { size: 20 });
    } else {
      const hd = HATS[s.id], owned = SV.hatsOwned.includes(s.id);
      const sl = U('Slot', X, Y, 120); anim(sl, owned ? 'normal' : 'locked'); size(sl, 140, 140);
      if (owned) { const ic = U('HatIcon', X + 10, Y + 10, 121); anim(ic, s.id); size(ic, 120, 120); }
      label(hd.name, TX, Y - 4, 30, INK);
      label(owned ? 'In your wardrobe' : hd.ach ? 'Reward hat' : 'Wardrobe: ' + hd.price + ' koban', TX, Y + 34, 18, '170;60;40', null, TW);
      label(hd.desc, TX, Y + 64, 18, INK, null, TW);
      const by = Object.keys(SV.hatsWorn).filter((c) => SV.hatsWorn[c] === s.id && SV.unlocked.includes(c)).map((c) => CATDEFS[c].name);
      const lines = [owned ? 'Drag it onto any cat to put it on. Drag a hat off a team cat to take it off.'
                           : hd.ach ? 'Earned by beating the Shogun\'s Keep.' : 'Buy it in the Cat Shop (Wardrobe tab).'];
      if (by.length) lines.push('Worn by: ' + by.join(', ') + '.');
      lines.push('Hats are just for style.');
      label(lines.join('\n'), X, Y + 170, 17, INK, null, 440);
    }
  }

  // ================================================================= SHOP
  SCREENS.shop = {
    enter(arg) {
      drawBackground(SV.league);
      panel(200, 110, 1200, 700);
      const tab = arg.tab || 0;
      scr.tab = tab;
      screenTitle('Cat Shop');
      ['Recruit', 'Upgrades', 'Gadgets', 'Wardrobe'].forEach((t, i) =>
        button(t, 330 + i * 240, 162, 230, 52, () => go('shop', { tab: i }), { on: tab === i, size: 22 }));
      kobanHud(1380, 24);
      if (tab === 0) {
        CAT_ORDER.filter((id) => CATDEFS[id].price > 0).forEach((id, i) => {
          const d = CATDEFS[id];
          const x = 290 + (i % 2) * 520, y = 248 + Math.floor(i / 2) * 236;
          const owned = SV.unlocked.includes(id);
          card(x - 20, y - 16, 500, 220);
          catCard(id, x, y, 'normal');
          label(d.name + ' ' + d.title, x + 132, y, 26, INK);
          label(catDesc(id), x + 132, y + 38, 19, INK, null, 330);
          if (owned) label('In your gang', x + 132, y + 150, 20, '60;130;60');
          else button('Buy ' + d.price, x + 132, y + 136, 220, 58, () => buyCat(id), { dim: SV.koban < d.price, coin: true });
        });
      } else if (tab === 2) {
        Object.keys(GADGETS).forEach((id, i) => {
          const g = GADGETS[id], x = 290 + i * 352, y = 252;
          card(x - 20, y - 16, 330, 400);
          const sl = U('Slot', x, y, 120); anim(sl, 'normal');
          const ic = U('Gadget', x + 26, y + 26, 121); anim(ic, id);
          label(g.name, x + 130, y, 21, INK, null, 160);
          label('Owned: ' + (SV.gadgets[id] || 0) + ' / ' + GADGET_MAX, x + 130, y + 60, 18, '170;60;40');
          label((g.key === 'auto' ? '' : 'Key ' + g.key + '. ') + g.desc, x, y + 130, 17, INK, null, 290);
          button('Buy ' + g.price, x + 35, y + 300, 220, 58, () => buyGadget(id), { dim: SV.koban < g.price || (SV.gadgets[id] || 0) >= GADGET_MAX, coin: true });
        });
      } else if (tab === 3) {
        HAT_ORDER.forEach((id, i) => {
          const h = HATS[id], x = 270 + (i % 3) * 360, y = 248 + Math.floor(i / 3) * 236;
          const owned = SV.hatsOwned.includes(id);
          card(x - 16, y - 16, 340, 210);
          const sl = U('Slot', x, y, 120); anim(sl, owned ? 'selected' : 'normal');
          const ic = U('HatIcon', x + 13, y + 13, 121); anim(ic, id);
          label(h.name, x + 124, y + 4, 20, INK);
          label(h.desc, x, y + 122, 15, INK, null, 300);
          if (owned) label('Owned - put it on in Team', x + 130, y + 40, 16, '60;120;60', null, 180);
          else if (h.ach) label('Reward: beat the Shogun\'s Keep', x + 130, y + 40, 16, '170;60;40', null, 180);
          else if (h.endgame && !endlessUnlocked()) label('For sale once you beat the game', x + 130, y + 40, 16, '170;60;40', null, 180);
          else button('Buy ' + h.price, x + 124, y + 42, 186, 56, () => buyHat(id), { dim: SV.koban < h.price, size: 20, coin: true });
        });
      } else {
        CAT_ORDER.forEach((id, i) => {
          const u = UPGRADES[id], d = CATDEFS[id];
          const x = 262 + (i % 3) * 362, y = 240 + Math.floor(i / 3) * 160;
          const owned = SV.unlocked.includes(id);
          card(x - 12, y - 12, 346, 148);
          const sl = U('Slot', x, y, 120); anim(sl, owned ? 'normal' : 'locked'); size(sl, 90, 90);
          if (owned) { const pp = U('Portrait', x + 4, y + 4, 121); anim(pp, id); size(pp, 82, 82); }
          label(d.name, x + 100, y - 4, 21, INK);
          label(u.desc, x + 100, y + 22, 15, INK, null, 220);
          if (!owned) label('Recruit first', x + 100, y + 92, 16, '170;60;40');
          else if (up(id)) label('Upgraded!', x + 100, y + 92, 18, '60;120;60');
          else button('Upgrade ' + u.price, x + 100, y + 80, 214, 48, () => buyUpgrade(id), { size: 18, dim: SV.koban < u.price, coin: true });
        });
      }
      scr.info = label(arg.msg || ['Win heists to earn koban, then recruit new burglars here.', 'Each cat has one upgrade.',
        'Own up to 99 of each gadget. Up to 3 of each can be used per heist.', 'Hats are just for style.'][tab], 800, 726, 18, '120;70;50', 'center', 1000);
      backButton();
      soundButton();
    },
    update(ev) {
      if (ev.dir === 'L' && scr.tab > 0) go('shop', { tab: scr.tab - 1 });
      else if (ev.dir === 'R' && scr.tab < 3) go('shop', { tab: scr.tab + 1 });
    },
  };
  // after a purchase (on the freshly redrawn shop screen): pop a toast for any achievement it completed
  function shopAch() { const got = []; checkMetaAch(got); if (got.length) save(); got.forEach((nm, i) => later(0.3 + i * 3.1, () => achToast(nm))); }
  function buyGadget(id) {
    const g = GADGETS[id];
    if ((SV.gadgets[id] || 0) >= GADGET_MAX) { sfx('thunk', 60); txt(scr.info, 'You can carry at most ' + GADGET_MAX + '.'); return; }
    if (SV.koban < g.price) { sfx('thunk', 60); txt(scr.info, 'You need ' + (g.price - SV.koban) + ' more koban.'); return; }
    SV.koban -= g.price; SV.gadgets[id] = (SV.gadgets[id] || 0) + 1; save();
    sfx('coin', 80);
    go('shop', { tab: 2, msg: g.name + ' added to your kit.' });
  }
  function buyHat(id) {
    const h = HATS[id];
    if (h.endgame && !endlessUnlocked()) { sfx('thunk', 60); return; }
    if (SV.koban < h.price) { sfx('thunk', 60); txt(scr.info, 'You need ' + (h.price - SV.koban) + ' more koban.'); return; }
    SV.koban -= h.price; SV.hatsOwned.push(id); save();
    sfx('coin', 80); sfx('select', 60, 0, 1.5);
    go('shop', { tab: 3, msg: h.name + ' bought! Equip it on the Team screen.' });
    shopAch();
  }
  function buyUpgrade(id) {
    const u = UPGRADES[id];
    if (SV.koban < u.price) { sfx('thunk', 60); txt(scr.info, 'You need ' + (u.price - SV.koban) + ' more koban.'); return; }
    SV.koban -= u.price; SV.upgrades[id] = true; save();
    sfx('loot', 80); sfx('star', 60);
    go('shop', { tab: 1, msg: CATDEFS[id].name + ' upgraded: ' + u.desc });
    shopAch();
  }
  function buyCat(id) {
    const d = CATDEFS[id];
    if (SV.koban < d.price) { sfx('thunk', 60); txt(scr.info, 'You need ' + (d.price - SV.koban) + ' more koban for ' + d.name + '.'); return; }
    SV.koban -= d.price;
    SV.unlocked.push(id);
    save();
    sfx('loot', 80); sfx('select', 60, 0, 1.5);
    go('shop', { tab: 0, msg: d.name + ' joins your gang! Add them to your team on the Team screen.' });
    shopAch();
  }

  // ================================================================= TREASURY
  SCREENS.treasury = {
    enter() {
      drawBackground(SV.league);
      panel(200, 110, 1200, 700);
      screenTitle('Treasury');
      kobanHud(1380, 24);
      // summary card
      card(242, 170, 450, 330);
      label('Summary', 262, 184, 22, '170;60;40');
      const rows = [['Koban', SV.koban.toLocaleString ? SV.koban.toLocaleString() : SV.koban], ['Total earned', SV.totalKoban], ['Heists', SV.heists],
        ['Wins', SV.wins], ['Cats caught', SV.caught], ['Fastest heist', SV.bestTime ? mmss(SV.bestTime) : '-'],
        ['Bosses beaten', SV.bossBeaten.filter(Boolean).length + ' / ' + NL], ['Daily heist', dailyDone() ? 'done today' : 'not yet'], ['Daily streak', dailyStreak() + (dailyStreak() === 1 ? ' day' : ' days')]];
      label(rows.map((r) => r[0]).join('\n'), 262, 218, 18, INK);
      label(rows.map((r) => String(r[1])).join('\n'), 470, 218, 18, '120;70;50');
      // wins per league, with crests
      LEAGUES.forEach((L, i) => {
        const x = 258 + i * 86, open = i < SV.maxLeague;
        const cr = U('Crest', x, 418, 121); anim(cr, 'l' + (i + 1) + (open ? '' : '_locked')); size(cr, 46, 46);
        label(open ? String(SV.leagueWins[i]) + (SV.bossBeaten[i] ? ' *' : '') : '-', x + 54, 430, 18, INK);
      });
      label('Wins per league  (* boss beaten)', 262, 470, 14, '120;70;50');
      // treasures
      card(712, 170, 640, 330);
      const found = TREASURES.filter((t) => SV.treasures[t.id]).length;
      label('Treasures  ' + found + ' / ' + TREASURES.length, 732, 184, 22, '170;60;40');
      TREASURES.forEach((t, i) => {
        const x = 740 + (i % 4) * 152, y = 222 + Math.floor(i / 4) * 138;
        const n = SV.treasures[t.id] || 0;
        const sl = U('Slot', x, y, 120); anim(sl, n ? 'normal' : 'locked'); size(sl, 92, 92);
        if (n) { const ic = U('Treasure', x + 6, y + 6, 121); anim(ic, t.id); size(ic, 80, 80); }
        label(n ? t.name : '???', x + 46, y + 96, 14, INK, 'center', 140);
        if (n > 1) { const c = label('x' + n, x + 70, y + 2, 16, CREAM); c.setZOrder(122); }
      });
      // achievements
      card(242, 516, 1110, 236);
      const got = ACHIEVEMENTS.filter((a) => SV.ach[a.id]).length;
      label('Achievements  ' + got + ' / ' + ACHIEVEMENTS.length, 262, 528, 22, '170;60;40');
      if (SV.bossBeaten[NL - 1]) button('Watch ending', 1150, 820, 216, 60, () => go('ending'), { size: 22 });
      const per = Math.ceil(ACHIEVEMENTS.length / 2);
      ACHIEVEMENTS.forEach((a, i) => {
        const x = 262 + Math.floor(i / per) * 548, y = 562 + (i % per) * 26, on = !!SV.ach[a.id];
        const ck = U('Check', x, y - 2, 121); anim(ck, on ? 'on' : 'off'); size(ck, 24, 24);
        const t = label(a.name, x + 32, y, 16, on ? INK : '130;115;100');
        label(a.desc, x + 32 + 160, y + 2, 13, on ? '120;70;50' : '150;135;120');
      });
      backButton();
      soundButton();
    },
    update() { },
  };

  // ================================================================= BUILDER
  // Player-made manors are practice runs: they never pay koban, treasures or league wins.
  const TOOL_SZ = 70, TOOL_STEP = 76;    // builder palette: 2 rows of 9, reaching down over the roof
  SCREENS.builder = {
    enter(arg) {
      scr.slot = arg.slot != null ? arg.slot : 0;
      const saved = layoutOf(scr.slot);
      scr.grid = arg.grid ? arg.grid.slice() : (saved ? saved.grid.slice() : blankGrid());
      scr.league = arg.league || (saved ? saved.league : SV.league);
      scr.tool = arg.tool != null ? arg.tool : 2;
      scr.content = [];
      drawManor(scr.league, false, true);     // plain rooms in the editor, so the placed icons stand out
      for (let r = 0; r < ROWS; r++) {
        anim(M('Shutter', cx(1) - 15, cy(r) + 2, 85), 'open');
        anim(M('Shutter', cx(COLS - 1) - 15, cy(r) + 2, 85), 'open');
      }
      TOOLS.forEach((t, i) => {
        const x = 8 + (i % 9) * TOOL_STEP, y = 6 + Math.floor(i / 9) * TOOL_STEP;
        const locked = t.league > SV.maxLeague;
        const sl = U('Slot', x, y, 120); anim(sl, locked ? 'locked' : i === scr.tool ? 'selected' : 'normal'); size(sl, TOOL_SZ, TOOL_SZ);
        if (!locked) { const ic = U('Tool', x - 3, y - 3, 121); anim(ic, t.anim); size(ic, TOOL_SZ + 6, TOOL_SZ + 6); }
        scr['tool' + i] = { x: x, y: y };
      });
      const arg2 = (o) => Object.assign({ slot: scr.slot, tool: scr.tool, grid: scr.grid, league: scr.league }, o);
      button('Slot ' + (scr.slot + 1), 712, 20, 110, 56, () => go('builder', { slot: (scr.slot + 1) % 3, tool: scr.tool }), { size: 20 });
      button(LEAGUES[scr.league - 1].short, 830, 20, 134, 56, () => {
        const n = scr.league % SV.maxLeague + 1;
        go('builder', arg2({ league: n }));
      }, { size: 20 });
      button('Save', 972, 20, 104, 56, () => builderSave(), { size: 20 });
      button('Random', 1084, 20, 128, 56, () => builderRandom(), { size: 20 });
      button('Clear', 1220, 20, 104, 56, () => { scr.grid = blankGrid(); renderGrid(); builderInfo('Cleared.'); }, { size: 20 });
      button('Play', 1332, 20, 104, 56, () => builderPlay(), { size: 20 });
      button('Menu', 1444, 20, 120, 56, () => go('menu'), { size: 20 });
      const strip = U('Dim', 0, 826, 110); size(strip, 1600, 74); strip.setOpacity(120);
      button('Share', 1250, 836, 150, 52, () => { if (builderValid()) openCodeBox('share'); }, { size: 20 });
      button('Import', 1410, 836, 150, 52, () => openCodeBox('import'), { size: 20 });
      scr.info = label('', 100, 838, 17, CREAM, null, 1120);
      soundButton();
      renderGrid();
      builderInfo(arg.msg || (saved || arg.grid ? 'Editing slot ' + (scr.slot + 1) + '.' : 'Slot ' + (scr.slot + 1) + ' is empty. Pick a tool, then tap rooms.') +
        ' Practice only: no rewards.');
    },
    tap(p) {
      if (scr.codeOpen) return;
      for (let i = 0; i < TOOLS.length; i++) {
        const t = scr['tool' + i];
        if (!inside(p, t.x, t.y, TOOL_SZ, TOOL_SZ)) continue;
        if (TOOLS[i].league > SV.maxLeague) { sfx('thunk', 50); builderInfo('Unlock the ' + LEAGUES[TOOLS[i].league - 1].name + ' to use the ' + TOOLS[i].name + '.'); return; }
        sfx('select', 50, 0, 1 + i * 0.06);
        go('builder', { slot: scr.slot, tool: i, grid: scr.grid, league: scr.league });
        return;
      }
      const c = Math.floor((p.x - GX) / CW), r = Math.floor((p.y - GY) / CH);
      if (c < 1 || c > COLS - 2 || r < 0 || r >= ROWS) return;
      const ch = TOOLS[scr.tool].ch;
      if (ch === 'T' && r === ROWS - 1) { sfx('thunk', 50); builderInfo('Trapdoors need a floor below them.'); return; }
      if (ch === 'V') for (let rr = 0; rr < ROWS; rr++) for (let cc = 1; cc < COLS - 1; cc++) if (gridGet(scr.grid, cc, rr) === 'V') gridSet(scr.grid, cc, rr, '.');
      gridSet(scr.grid, c, r, gridGet(scr.grid, c, r) === ch && ch !== '.' ? '.' : ch);
      sfx(ch === '.' ? 'thunk' : 'land', 45, 0.1);
      renderGrid();
      builderInfo();
    },
    update() { },
  };
  // ----------------------------------------------------------------- share codes: NK<league>-XXXXX-XXXXX-... (35 rooms)
  function encodeLayout(grid, league) {
    const s = grid.join('').split('').map((ch) => SHARE_OUT[Math.max(0, SHARE_ABC.indexOf(ch))]).join('');
    return 'NK' + league + '-' + s.match(/.{1,5}/g).join('-');
  }
  function decodeLayout(code) {
    const t = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const m = t.match(/^NK([1-5])([A-R]{35})$/);
    if (!m) return null;
    const chars = m[2].split('').map((c) => SHARE_ABC[SHARE_OUT.indexOf(c)]).join('');
    const grid = [];
    for (let r = 0; r < ROWS; r++) grid.push(chars.slice(r * 7, r * 7 + 7));
    if (gridCount(grid, 'V') !== 1) return null;
    return { grid: grid, league: +m[1] };
  }
  let codeEl = null;
  function closeCodeBox() {
    if (codeEl) { try { codeEl.remove(); } catch (e) { } codeEl = null; }
    if (scr && scr.codeObjs) { scr.codeObjs.forEach((o) => kill(o.b || o)); scr.codeObjs.forEach((o) => { if (o.t) kill(o.t); }); BTNS = BTNS.filter((b) => !scr.codeObjs.includes(b)); scr.codeObjs = null; }
    if (scr) scr.codeOpen = false;
  }
  // Generic text box: an HTML <input> laid over the canvas (works on desktop and phones).
  // opt: { title, hint, value, placeholder, buttons: [[label, fn(value, setHint)], ...] }
  function textBox(opt) {
    closeCodeBox();
    scr.codeOpen = true;
    const objs = scr.codeObjs = [];
    const dim = U('Dim', 0, 0, 180); size(dim, 1600, 900); dim.setOpacity(150); dim.setZOrder(180); objs.push(dim);
    const pn = U('Panel', 330, 250, 181); size(pn, 940, 400); pn.setZOrder(181); objs.push(pn);
    const t1 = label(opt.title, 800, 300, 34, INK, 'center'); t1.setZOrder(182); objs.push(t1);
    const t2 = label(opt.hint, 800, 346, 19, INK, 'center', 820); t2.setZOrder(182); objs.push(t2);
    const setHint = (h) => { txt(t2, h); };
    try {
      const canvas = S.getGame().getRenderer().getCanvas();
      const rc = canvas.getBoundingClientRect(), k = rc.width / 1600;
      codeEl = document.createElement('input');
      codeEl.type = 'text';
      codeEl.value = opt.value || '';
      codeEl.placeholder = opt.placeholder || '';
      codeEl.maxLength = opt.maxLength || 60;
      Object.assign(codeEl.style, { position: 'fixed', left: (rc.left + 430 * k) + 'px', top: (rc.top + 400 * k) + 'px', width: (740 * k) + 'px',
        height: (52 * k) + 'px', fontSize: (26 * k) + 'px', textAlign: 'center', zIndex: 1000, border: '2px solid #282018', background: '#f8f0dc',
        fontFamily: 'monospace', borderRadius: '6px' });
      document.body.appendChild(codeEl);
      codeEl.focus();
      if (opt.select) codeEl.select();
    } catch (e) {
      codeEl = null;
      const shown = label(opt.value || '(typing is not available on this device)', 800, 410, 26, INK, 'center'); shown.setZOrder(182); objs.push(shown);
    }
    const bs = opt.buttons.concat([['Close', () => closeCodeBox()]]);
    const w = 260, gap = 30, x0 = 800 - (bs.length * w + (bs.length - 1) * gap) / 2;
    bs.forEach(([lbl, fn], i) => {
      const b = button(lbl, x0 + i * (w + gap), 520, w, 66, () => fn(codeEl ? codeEl.value : (opt.value || ''), setHint), { size: 22 });
      b.b.setZOrder(183); b.t.setZOrder(184); objs.push(b);
    });
  }
  function openCodeBox(mode) {
    const code = encodeLayout(scr.grid, scr.league);
    if (mode === 'share') textBox({ title: 'Share this manor', hint: 'Send this code to a friend. They can paste it with Import.', value: code, select: true,
      buttons: [['Copy', (v, hint) => { try { navigator.clipboard.writeText(code); hint('Copied! ' + code); } catch (e) { hint('Select the code and copy it: ' + code); } sfx('select', 60); }]] });
    else textBox({ title: 'Import a manor', hint: 'Paste a code like NK2-ABCDE-... and press Load.', placeholder: 'NK1-ABCDE-...',
      buttons: [['Load', (v, hint) => {
        const res = decodeLayout(v);
        if (!res) { sfx('thunk', 60); hint('That code does not look right. Check it and try again.'); return; }
        if (res.league > SV.maxLeague) { sfx('thunk', 60); hint('That manor uses the ' + LEAGUES[res.league - 1].name + ', which you have not reached yet.'); return; }
        sfx('loot', 70);
        go('builder', { slot: scr.slot, grid: res.grid, league: res.league, tool: scr.tool, msg: 'Imported! Save it to keep it in slot ' + (scr.slot + 1) + '.' });
      }]] });
  }

  // builder rooms show just a big tool icon for whatever is placed there (clearer than the real sprites)
  function renderGrid() {
    scr.content.forEach(kill);
    scr.content = [];
    for (let r = 0; r < ROWS; r++) for (let c = 1; c < COLS - 1; c++) {
      const tool = CH_ITEM[gridGet(scr.grid, c, r)] && TOOLS.find((t) => t.ch === gridGet(scr.grid, c, r));
      if (!tool) continue;
      const S = 96, bx = cx(c) + CW / 2 - S / 2, by = cy(r) + CH / 2 - S / 2 - 2;
      const bg = M('Slot', bx, by, 75); anim(bg, 'normal'); size(bg, S, S);
      const ic = M('Tool', bx - 3, by - 3, 76); anim(ic, tool.anim); size(ic, S + 6, S + 6);
      scr.content.push(bg, ic);
    }
  }
  function builderInfo(prefix) {
    const g = scr.grid;
    const traps = g.join('').replace(/[.VDPKJH]/g, '').length;
    txt(scr.info, (prefix ? prefix + '   ' : '') + 'Tool: ' + TOOLS[scr.tool].name + '  |  Guards ' + (gridCount(g, 'D') + gridCount(g, 'P') + gridCount(g, 'K') + gridCount(g, 'J')) +
      '  Traps ' + traps + '  Vault ' + (gridCount(g, 'V') ? 'yes' : 'NO'));
  }
  function builderValid() {
    if (!gridCount(scr.grid, 'V')) { sfx('thunk', 60); builderInfo('Place a vault first!'); return false; }
    return true;
  }
  function builderSave() {
    if (!builderValid()) return;
    SV.layouts[scr.slot] = { grid: scr.grid.slice(), league: scr.league };
    const got = [];
    unlockAch('architect', got);
    save();
    sfx('loot', 70);
    builderInfo('Saved to slot ' + (scr.slot + 1) + '.' + (got.length ? ' Achievement: ' + got[0] + '!' : ''));
  }
  function builderRandom() {
    const L = LEAGUES[scr.league - 1];
    const g = blankGrid();
    const pool = [];
    for (let r = 0; r < ROWS; r++) for (let c = 1; c < COLS - 1; c++) pool.push([c, r]);
    shuffle(pool);
    const vi = pool.findIndex(([c]) => c >= 3 && c <= 5);
    const [vc, vr] = pool.splice(vi, 1)[0];
    gridSet(g, vc, vr, 'V');
    // uses every guard and trap you have unlocked, not just this league's own set
    const have = (ch) => TOOLS.some((t) => t.ch === ch && t.league <= SV.maxLeague);
    const guards = ['D', 'D', 'P', 'K', 'J'].filter(have);
    const traps = ['S', 'B', 'N', 'L', 'C', 'G', 'T', 'O', 'F', 'W', 'M'].filter(have);
    for (let i = 0; i < L.dogs; i++) { const [c, r] = pool.pop(); gridSet(g, c, r, i < 3 ? 'D' : guards[Math.floor(Math.random() * guards.length)]); }
    shuffle(traps);                       // each unlocked trap type at least once (when there's room), then random extras
    const picks = [];
    for (let i = 0; i < L.traps.length; i++) picks.push(i < traps.length ? traps[i] : traps[Math.floor(Math.random() * traps.length)]);
    for (const ch of picks.concat(Array(HIDE_COUNT).fill('H'))) {
      const idx = pool.findIndex(([c, r]) => ch !== 'T' || r < ROWS - 1);
      if (idx < 0) continue;
      const [c, r] = pool.splice(idx, 1)[0];
      gridSet(g, c, r, ch);
    }
    scr.grid = g;
    renderGrid();
    builderInfo('Random ' + L.short + ' layout.');
  }
  function builderPlay() {
    if (!builderValid()) return;
    SV.layouts[scr.slot] = { grid: scr.grid.slice(), league: scr.league };
    save();
    go('heist', { grid: scr.grid.slice(), slot: scr.slot, league: scr.league });
  }

  // ================================================================= HEIST
  // Modes: 'normal' (random manor), 'daily' (seeded by today's date), 'boss' (handmade, two-cat vault,
  // patrol dogs; beating it promotes you) and 'practice' (your own layout, no rewards).
  // heist messages: each gets a kind (alert / good / stuck / info) that picks the icon and text colour
  const MSG_KINDS = {
    alert: { icon: 'alert', col: '255;178;160', tint: '255;140;120' },
    good:  { icon: 'heart', col: '200;238;180', tint: '170;230;150' },
    stuck: { icon: 'swirl', col: '255;214;150', tint: '255;200;120' },
    sleep: { icon: 'zzz',   col: '200;210;255', tint: '170;190;255' },
    info:  { icon: 'note',  col: CREAM,         tint: '255;255;255' },
  };
  function msgKind(m) {
    if (/alarm|wakes|woke|bark|spots?|caught|shout|roar|BANG|SQUEAK|BWON|jingles|shut tight|slam|ninja|hunt|samurai/i.test(m)) return 'alert';
    if (/stuck|net drops|caltrops|stunned|Ow!|spinning wall/i.test(m)) return 'stuck';
    if (/back to sleep|dozes|yawn|slinks/i.test(m)) return 'sleep';
    if (/loot|frees|freed|disarm|escape|pocket|crack|vault is open|hides|POOF|joins|tosses|lure|grabs/i.test(m)) return 'good';
    return 'info';
  }
  function say(m, kind) {
    if (!G) return;
    const same = m === G.msg;
    G.msg = m; G.msgT = same ? Math.min(G.msgT, 0.3) : 0; G.msgKind = kind || msgKind(m);
  }
  function catXY(k, c, r) { return { x: cx(c) + CW / 2 - CAT_W / 2 + (k.i - 2) * 7, y: cy(r) + FLOOR - CAT_H + 3 }; }
  function dogAt(c, r) { return G.dogs.find((d) => d.c === c && d.r === r) || null; }
  function active(k) { return k.deployed && !k.caught; }
  // Momo can still come to the rescue: she's on the team, not caged herself, and isn't the cat in the cage
  function momoCanFree(k) { return k.id !== 'momo' && G.cats.some((q) => q.id === 'momo' && !q.out && !q.caught); }
  function teamHas(id) { return G.cats.some((k) => k.id === id && !k.out); }
  function sight(k) { return k.id === 'sora' ? (up('sora') ? 3 : 2) : 1; }
  function toraGuards(c, r) { return G.cats.some((k) => k.id === 'tora' && active(k) && !k.moving && k.c === c && k.r === r); }
  function shutterSide(a, b) {
    const lo = Math.min(a, b), hi = Math.max(a, b);
    if (lo === 0 && hi === 1) return 'L';
    if (lo === COLS - 2 && hi === COLS - 1) return 'R';
    return null;
  }

  SCREENS.heist = {
    enter(arg) { newHeist(arg); },
    update(ev, dt) { heistUpdate(ev, dt); },
    tap(p) { heistTap(p); },
  };

  function newHeist(arg) {
    if (arg.endless && !SV.endless) SV.endless = { round: 1, out: [], koban: 0, team: SV.team.slice() };
    const mode = arg.tutorial ? 'tutorial' : arg.grid ? 'practice' : arg.boss ? 'boss' : arg.daily ? 'daily' : arg.endless ? 'endless' : 'normal';
    const run = mode === 'endless' ? SV.endless : null;
    const league = mode === 'daily' ? SV.maxLeague : mode === 'tutorial' ? 1 : run ? ((run.round - 1) % NL) + 1 : (arg.league || SV.league);
    let LG = run ? endlessLG(run.round) : LEAGUES[league - 1];
    const twist = mode === 'daily' ? todayTwist() : null, tw = twist ? twist.id : null;
    if (tw === 'moonless') LG = Object.assign({}, LG, { wake: LG.wake * 0.8 });
    const d = new Date();
    const rnd = mode === 'daily' ? mulberry(d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()) : Math.random;
    let night = mode === 'practice' || mode === 'tutorial' ? false : mode === 'boss' ? league >= 3 : run ? run.round % 3 === 0 : rnd() < NIGHT_CHANCE;
    if (tw === 'moonless') night = true;
    let team = mode === 'tutorial' ? ['kuro', 'mike', 'tora', 'sora', 'hai'] : run ? run.team : SV.team;
    if (tw === 'borrowed') { const pool = CAT_ORDER.slice(); for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; } team = pool.slice(0, 5); }
    G = { state: 'play', t: 0, alarm: 0, selected: -1, deploying: -1, msg: '', msgT: 0, endT: 0, mode: mode,
          cells: [], dogs: [], cats: [], shutters: { L: [], R: [] }, fx: [], grid: arg.grid || null, slot: arg.slot, league: league, LG: LG,
          practice: mode === 'practice' || mode === 'tutorial', night: night, vault: null, lootObj: null, lootFloor: null, paws: [], ui: {},
          lanterns: [], owls: [], hides: [], side: [], sideGot: 0, fish: null, ropeArmed: false,
          lure: null, shake: 0, glintT: 0, toraMsg: 0, team: team, run: run, round: run ? run.round : 0, twist: twist, tw: tw };
    if (!G.practice) { SV.heists++; save(); }
    drawManor(league, true);
    if (night) {
      tintAll(['Room', 'Balcony', 'Rail', 'Roof', 'Foundation'], '150;150;190');
      tintAll(['Background', 'Cloud', 'Particle'], '105;105;150');
    }
    for (let r = 0; r < ROWS; r++) {
      G.cells[r] = [];
      for (let c = 0; c < COLS; c++) G.cells[r][c] = { c: c, r: r, type: isBalc(c) ? 'balcony' : 'empty', revealed: isBalc(c), fog: null, fogA: 1, trap: null, trapObj: null, disarmed: false, hide: null };
      for (const side of ['L', 'R']) {
        const o = M('Shutter', (side === 'L' ? cx(1) : cx(COLS - 1)) - 15, cy(r) + 2, 85);   // above room fog and hiding spots
        anim(o, 'open');
        G.shutters[side][r] = { open: true, obj: o, shake: 0 };
      }
    }
    const place = (it, c, r) => {
      const cell = G.cells[r][c];
      if (it === 'vault') {
        cell.type = 'vault';
        G.vault = { c: c, r: r, prog: 0, open: false, noiseT: 0, needs: mode === 'boss' ? 2 : 1,
                    obj: M('Vault', cx(c), cy(r), 30), label: M('WorldText', cx(c) + 64, cy(r) + 24, 95) };
        anim(G.vault.obj, 'closed');
        txt(G.vault.label, G.vault.needs > 1 ? '2 cats' : '');
        G.vault.obj.hide(true); G.vault.label.hide(true);
      } else if (it === 'dog' || it === 'patrol' || it === 'samurai' || it === 'ninja') {
        cell.type = 'dog';
        const kind = it === 'samurai' || it === 'ninja' ? it : 'dog';
        const patrol = it === 'patrol';
        const dog = { c: c, r: r, homeC: c, homeR: r, tr: r, kind: kind, state: patrol ? 'patrol' : 'sleep', patrol: patrol, dir: rnd() < 0.5 ? -1 : 1, meter: 0,
                      awakeT: 0, alertT: 0, stepT: patrol ? 1.5 : 0, stunT: 0, eatT: 0, moving: false, mt: 0, tc: c, obj: null, meterObj: null };
        const p = gXY(dog, c, r);
        const o = dog.obj = M({ samurai: 'Samurai', ninja: 'Ninja' }[kind] || 'Dog', p.x, p.y, 50);
        anim(o, patrol ? 'run' : 'sleep');
        o.hide(true);
        if (patrol) tintPatrol(o);
        o.flipX(rnd() < 0.5);
        const tall = kind !== 'dog';
        if (!patrol) { dog.meterObj = M('DogMeter', p.x + (tall ? 56 : 60), p.y - (tall ? 0 : 16), 81); dog.meterObj.hide(true); }
        G.dogs.push(dog);
      } else if (it === 'owl') {
        cell.type = 'owl';
        const o = M('Owl', cx(c) + 6, cy(r) + 12, 32);
        anim(o, 'owl'); o.hide(true);
        G.owls.push({ c: c, r: r, obj: o, t: rnd() * OWL_CYCLE, open: false, seen: [], gaze: null, kind: 'owl' });
      } else if (it === 'komainu') {
        cell.type = 'owl';
        const o = M('Komainu', cx(c) + 4, cy(r) + FLOOR - 88, 32);
        anim(o, 'komainu'); o.hide(true);
        G.owls.push({ c: c, r: r, obj: o, t: rnd() * KOMAINU_CYCLE, open: false, seen: [], gaze: null, kind: 'komainu' });
      } else if (it === 'hide') {
        cell.type = 'hide';
        const kind = rnd() < 0.5 ? 'tansu' : 'byobu';
        const o = M('Hide', cx(c), cy(r), 33);
        anim(o, kind); o.hide(true);
        cell.hide = { obj: o, kind: kind };
        G.hides.push(cell);
      } else {
        cell.type = 'trap';
        cell.trap = it;
        cell.trapObj = M('Trap', cx(c), cy(r), 31);
        anim(cell.trapObj, it);
        cell.trapObj.hide(true);
        if (it === 'lantern') { cell.lt = rnd() * LANTERN_CYCLE; cell.lit = false; G.lanterns.push(cell); }
      }
    };
    const TUTORIAL_GRID = ['.......', '...V...', '.......', '..H.D..', '.D.S...'];
    const grid = mode === 'practice' ? arg.grid : mode === 'boss' ? LG.boss.grid : mode === 'tutorial' ? TUTORIAL_GRID : null;
    if (grid) {
      for (let r = 0; r < ROWS; r++) for (let c = 1; c < COLS - 1; c++) {
        const it = CH_ITEM[gridGet(grid, c, r)];
        if (it) place(it, c, r);
      }
      if (mode === 'tutorial') { const dg = G.dogs.find((q) => q.c === 5 && q.r === 3); if (dg) dg.tutorial = true; }
    } else {
      const pool = [];
      for (let r = 0; r < ROWS; r++) for (let c = 1; c < COLS - 1; c++) pool.push([c, r]);
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
      const vi = pool.findIndex(([c]) => c >= 3 && c <= 5);
      const [vc, vr] = pool.splice(vi, 1)[0];
      place('vault', vc, vr);
      const dogsPerFloor = [0, 0, 0, 0, 0];
      const special = (LG.samurai || 0) + (LG.ninja || 0);
      const items = Array(LG.samurai || 0).fill('samurai').concat(Array(LG.ninja || 0).fill('ninja'), Array(Math.max(0, LG.dogs - special - (tw === 'samurai' ? 2 : 0))).fill(tw === 'samurai' ? 'samurai' : 'dog'),   // samurai are fast: two fewer guards
                                                                   LG.traps, tw === 'patrols' ? ['patrol', 'patrol'] : [], Array(HIDE_COUNT).fill('hide'));
      for (const it of items) {
        const guard = it === 'dog' || it === 'samurai' || it === 'ninja';
        const idx = pool.findIndex(([c, r]) => (!guard || (c !== 1 && c !== COLS - 2 && dogsPerFloor[r] < 2)) && (it !== 'trapdoor' || r < ROWS - 1));
        if (idx < 0) continue;
        const [c, r] = pool.splice(idx, 1)[0];
        if (guard) dogsPerFloor[r]++;
        place(it, c, r);
      }
    }
    if (mode === 'boss') {   // boss manors get a couple of hiding spots in empty rooms
      let n = 0;
      for (let r = 0; r < ROWS && n < 2; r++) for (let c = 2; c < COLS - 2 && n < 2; c += 2) if (G.cells[r][c].type === 'empty') { place('hide', c, r); n++; }
    }
    // side loot in a few rooms (not in practice runs)
    if (mode !== 'practice') {
      const spots = [];
      for (let r = 0; r < ROWS; r++) for (let c = 1; c < COLS - 1; c++) if (['empty', 'trap'].includes(G.cells[r][c].type)) spots.push([c, r]);
      for (let i = spots.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [spots[i], spots[j]] = [spots[j], spots[i]]; }
      spots.slice(0, mode === 'tutorial' ? 2 : SIDE_COUNT).forEach(([c, r]) => {
        const L = SIDE_LOOT[Math.floor(rnd() * SIDE_LOOT.length)];
        const o = M('SideLoot', cx(c) + 98, cy(r) + FLOOR - 38, 34);
        anim(o, L.id); o.hide(true);
        G.side.push({ c: c, r: r, def: L, obj: o, taken: false });
      });
    }
    for (let r = 0; r < ROWS; r++) for (let c = 1; c < COLS - 1; c++) G.cells[r][c].fog = M('Fog', cx(c), cy(r), 80);
    G.cats = G.team.map((id, i) => Object.assign({ i: i, id: id, deployed: false, caught: false, c: 0, r: ROWS - 1, tc: 0, tr: 0,
      moving: false, mt: 0, mdur: 0, from: null, to: null, jump: false, drop: false, stuck: 0, hasLoot: false, hidden: false,
      cooldown: 0, lureCd: 0, cracking: false, face: 1, obj: null, hat: null, cage: null, escapes: id === 'goro' ? (up('goro') ? 2 : 1) : 0,
      netCell: null, animT: 0, fromTrapdoor: false }, CATDEFS[id]));
    if (run) G.cats.forEach((k) => { if (run.out.includes(k.id)) { k.caught = true; k.out = true; } });   // caged earlier in the run
    if (tw === 'sick') { const k = G.cats[Math.floor(rnd() * G.cats.length)]; k.caught = true; k.out = true; G.sick = k; }
    G.selector = M('Selector', 0, 0, 55); G.selector.hide(true);
    for (const c of [0, COLS - 1]) for (let r = 0; r < ROWS; r++) { const p = M('Paw', cx(c) + 43, cy(r) + 30, 85); p.hide(true); G.paws.push(p); }
    const ui = G.ui;
    ui.strip = U('Dim', 0, 0, 5); size(ui.strip, 1600, 112); ui.strip.setOpacity(110);
    ui.portraits = G.cats.map((k, i) => { const o = U('Portrait', 16 + i * 104, 4, 10); anim(o, k.id); return o; });
    if (mode === 'tutorial') ui.portraits.forEach((o, i) => { if (i) o.setOpacity(70); });
    ui.caught = G.cats.map((k, i) => { const o = U('Caught', 16 + i * 104, 4, 12); o.hide(true); return o; });
    ui.ring = U('PortraitRing', 0, 0, 11); ui.ring.hide(true);
    ui.lantern = U('Lantern', 1500, 6, 10);
    ui.hudBox = U('MsgBox', 1260, 8, 8); anim(ui.hudBox, 'hud');
    ui.hud = U('HudText', 1282, 16, 10); outline(ui.hud, true); if (ui.hud.setCharacterSize) ui.hud.setCharacterSize(19);
    ui.msgBox = U('MsgBox', 548, 8, 8); anim(ui.msgBox, 'msg');
    ui.msgIcon = U('Emote', 572, 30, 10); anim(ui.msgIcon, 'note');
    ui.info = U('InfoText', 632, 18, 10); outline(ui.info, true);
    if (ui.info.setCharacterSize) ui.info.setCharacterSize(19);
    if (ui.info.setWrapping) { ui.info.setWrapping(true); ui.info.setWrappingWidth(600); }
    ui.action = U('ActionBtn', 1452, 752, 10);
    // gadget bar (bottom right, next to the action button)
    ui.gadgets = ['fish', 'rope', 'smoke'].map((id, i) => {
      const x = 1146 + i * 76, y = 830;
      const sl = U('Slot', x, y, 10); size(sl, 66, 66);
      const ic = U('Gadget', x + 1, y + 1, 11); anim(ic, id);
      const n = U('Label', x + 50, y + 44, 12); if (n.setCharacterSize) n.setCharacterSize(18); if (n.setColor) n.setColor(CREAM); outline(n, true);
      const k = U('Label', x + 4, y + 2, 12); if (k.setCharacterSize) k.setCharacterSize(14); if (k.setColor) k.setColor(CREAM); outline(k, true);
      txt(k, GADGETS[id].key === 'auto' ? 'auto' : GADGETS[id].key);
      return { id: id, x: x, y: y, sl: sl, ic: ic, n: n };
    });
    soundButton();
    G.menuBtn = button('Menu', 90, 836, 120, 52, () => { sfx('thunk', 50); leaveHeist(); }, { size: 20 });
    if (mode === 'practice') G.editBtn = button('Edit', 218, 836, 120, 52, () => { sfx('thunk', 50); backToEditor(); }, { size: 20 });
    const intro = {
      tutorial: 'Training heist.',
      practice: 'Practice run in your own manor (slot ' + ((arg.slot || 0) + 1) + ') - no rewards.',
      boss: 'BOSS: ' + LG.boss.name + '! Patrol dogs never sleep, and the vault needs two cats cracking together.',
      daily: !twist ? '' : 'Daily Heist - today\'s twist: ' + twist.name + '. ' + (tw === 'sick' ? G.sick.name + ' is sick in bed today.' : twist.desc) +
             (dailyDone() ? ' Already won today: replays pay 1/3.' : ' First win today pays double' + (dailyStreak() ? ', plus your streak bonus!' : '!')),
      normal: LG.name + ': ' + LG.place + '. ' + LG.intro,
      endless: run ? 'Endless Heist, manor ' + run.round + ': ' + LG.dogs + ' guards. Cats caught here stay caged for the rest of the run.' : '',
    }[mode];
    say(intro + (night ? ' It is a dark night (x' + NIGHT_PAY + ' pay).' : '') + (mode === 'tutorial' ? '' : '\nPick a cat: press 1-5 or tap a portrait.'), 'info');
    sfx('start', 80);
    tension(true);
    heistIntro(mode, LG, night);
    if (mode === 'tutorial') tutorialStart();
  }
  // ----------------------------------------------------------------- tutorial: a scripted first heist
  function tutCell(c, r) { return { x: cx(c) + CW / 2, y: cy(r) + 46 }; }   // arrow tip ends inside the room
  const TUT_STEPS = [
    { text: "Welcome, burglar! First pick a cat: press 1 or tap Kuro's portrait (top left).",
      done: () => G.selected === 0, past: (k) => k.deployed, point: () => ({ x: 66, y: 108, up: true }) },
    { text: 'Send Kuro in: press Left, or tap the left balcony.',
      done: (k) => k.deployed && !k.moving, past: (k) => k.deployed && k.c >= 1, point: () => tutCell(0, 4) },
    { text: 'Walk into the manor: press Right, D, or swipe right.',
      done: (k) => k.c >= 1 && !k.moving, point: () => tutCell(1, 4) },
    { text: 'A guard dog sleeps in the next room. Every step makes noise and fills the bubble over a sleeping dog. Kuro walks silently - sneak past it, two rooms to the right.',
      done: (k) => k.c >= 3 && !k.moving, past: (k) => k.r < 4 || G.vault.open, point: () => tutCell(3, 4) },
    { text: 'The next room has a squeaky nightingale floor! Go around it: from this room, jump up a floor with Up, W, or swipe up.',
      done: (k) => k.c === 3 && k.r === 3 && !k.moving, past: (k) => (k.r < 4 && !(k.c === 3 && k.r === 3)) || G.vault.open, point: (k) => (k.r === 4 && k.c !== 3 ? tutCell(3, 4) : tutCell(3, 3)) },
    { text: 'Uh oh - the dog next door heard you! Hide in the wardrobe: press Space or tap the red button.',
      enter: () => { const d = G.dogs.find((q) => q.tutorial); if (d && d.state === 'sleep') { wakeDog(d); d.alertT = 3.5; d.awakeT = 3; } },
      done: (k) => k.hidden, past: (k) => !(k.c === 3 && k.r === 3) || G.vault.open, point: () => ({ x: 1522, y: 742 }) },
    { text: 'Stay hidden. Dogs cannot see or catch you in there. Wait until it gives up and goes back to sleep...',
      done: () => { const d = G.dogs.find((q) => q.tutorial); return !d || d.state === 'sleep'; }, past: (k) => !k.hidden || G.vault.open, point: () => null },
    { text: 'Safe! Now climb two floors: press Up twice (moving also brings you out of hiding). The vault is up there.',
      done: (k) => k.r <= 1 && !k.moving, past: () => G.vault.open, point: () => tutCell(3, 1) },
    { text: 'There it is! Walk into the vault room and press Space to crack it. Stay still while it cracks - it is a little noisy.',
      done: () => G.vault.open, point: (k) => (k.c === G.vault.c && k.r === G.vault.r ? (k.cracking ? null : { x: 1522, y: 742 }) : tutCell(G.vault.c, G.vault.r)) },
    { text: 'You have the loot! Escape: carry it out to a balcony through an open shutter. The arrow shows the closest one.',
      done: () => false, point: (k) => nearestExit(k) },
  ];
  // the closest balcony a cat can escape to (through an open shutter), or null when every shutter is shut
  function nearestExit(k) {
    let best = null, bd = 1e9;
    for (const side of ['L', 'R']) G.shutters[side].forEach((s, r) => {
      if (!s.open) return;
      const bc = side === 'L' ? 0 : COLS - 1, d = Math.abs(bc - k.c) + Math.abs(r - k.r) * 1.5;
      if (d < bd) { bd = d; best = tutCell(bc, r); }
    });
    return best;
  }
  // in training only Kuro is on the job - except Mike, who may step in to pry a shutter if every one is shut
  function tutMikeAllowed(k) { return k.id === 'mike' && (k.deployed || openShutters() === 0); }
  function tutorialStart() {
    G.tut = { step: -1, t: 0 };
    const pl = U('Button', 236, 828, 150); anim(pl, 'wide'); size(pl, 900, 66);
    const tx = label('', 256, 836, 18, INK, null, 860); tx.setZOrder(151);
    const ptr = U('Pointer', 0, 0, 160); ptr.hide(true);     // shown once the intro doors have opened
    G.tut.objs = { pl: pl, tx: tx, ptr: ptr };
    tutorialNext();
  }
  function tutorialNext() {
    const T = G.tut, k = G.cats[0];
    T.step++;
    // the player is free to do things in any order: jump over steps they've already gone past (or finished)
    while (TUT_STEPS[T.step] && TUT_STEPS[T.step + 1] && (TUT_STEPS[T.step].done(k) || (TUT_STEPS[T.step].past && TUT_STEPS[T.step].past(k)))) T.step++;
    T.t = 0;
    const st = TUT_STEPS[T.step];
    if (!st) return;
    T.text = (T.step + 1) + '/' + TUT_STEPS.length + '  ' + st.text; txt(T.objs.tx, T.text);
    if (T.step > 0) sfx('ding', 60);
    if (st.enter) st.enter();
  }
  function tutorialUpdate(dt) {
    const T = G.tut, st = TUT_STEPS[T.step];
    if (!st || G.state !== 'play') return;
    T.t += dt;
    const k = G.cats[0];
    if (st.done(k) || (st.past && st.past(k))) { tutorialNext(); return; }
    // failsafe: every shutter shut (too many alarms) - coach the player through letting Mike pry one open
    const mike = G.cats.find((q) => q.id === 'mike');
    const stuck = openShutters() === 0 && mike && !mike.caught;
    const want = !stuck ? (T.step + 1) + '/' + TUT_STEPS.length + '  ' + st.text
      : !mike.deployed ? 'Every shutter is shut! Only Mike can pry one open: press 2 or tap his portrait, then send him onto the balcony.'
      : 'Walk Mike next to a shut shutter (onto a balcony) and press Space to pry it open. Then Kuro can escape!';
    if (T.text !== want) { T.text = want; txt(T.objs.tx, want); if (stuck) sfx('ding', 60, 0, 0.8); }
    const pt = stuck ? null : st.point(k);      // Mike's own marker takes over while everything is shut
    T.objs.ptr.hide(!pt);
    if (pt) {
      const bob = Math.abs(Math.sin(T.t * 5)) * 10;
      if (T.objs.ptr.setAngle) T.objs.ptr.setAngle(pt.up ? 180 : 0);
      T.objs.ptr.setPosition(pt.x - 28, pt.up ? pt.y + bob : pt.y - 64 - bob);
    }
  }
  function tutorialEnd() { if (G.tut) { Object.values(G.tut.objs).forEach(kill); G.tut = null; } }

  // guard sprite position: dogs are 110x80, samurai 100x100 (feet on the floor either way)
  function gXY(d, c, r) { return d.kind !== 'dog' ? { x: cx(c) + 26, y: cy(r) + FLOOR - 96 } : { x: cx(c) + 22, y: cy(r) + FLOOR - 78 }; }
  // leaving mid-heist: in an Endless run that gives up the run, so it asks for a second tap first
  function leaveHeist() {
    if (G && G.mode === 'endless' && G.state === 'play') {
      if (!G.quitArmed) { G.quitArmed = true; later(3, () => { if (G) G.quitArmed = false; }); say('Leaving now ends your Endless run. Tap Menu again to give up.', 'alert'); return; }
      endEndless();
    }
    go('menu');
  }
  function heistIntro(mode, LG, night) {
    const I = G.intro = { t: 0, objs: [] };
    const add = (o) => { I.objs.push(o); return o; };
    I.left = add(U('Shoji', 0, 0, 300)); anim(I.left, 'left');
    I.right = add(U('Shoji', 800, 0, 300)); anim(I.right, 'right');
    if (mode === 'boss') {
      const B = BOSS_LINES[LG.n];
      const card = add(U('Panel', 300, 170, 301)); size(card, 1000, 460); card.setZOrder(301);
      const pt = add(U('BossPortrait', 370, 220, 302)); anim(pt, B.who); pt.setZOrder(302);
      const t1 = add(label(LG.boss.name, 900, 250, 40, INK, 'center')); t1.setZOrder(303);
      const t2 = add(label('"' + B.line + '"', 620, 320, 24, '120;70;50', null, 560)); t2.setZOrder(303);
      const t3 = add(label('Patrol dogs never sleep. The vault needs two cats.' + (night ? ' And it is night.' : ''), 620, 452, 25, INK, null, 600)); t3.setZOrder(303);
      I.texts = [card, pt, t1, t2, t3];
      I.hold = 2.6;
      return;
    }
    const card = add(U('Panel', 440, 190, 301)); size(card, 720, 400); card.setZOrder(301);
    const cr = add(U('Crest', 725, 240, 302)); anim(cr, 'l' + LG.n); size(cr, 150, 150); cr.setZOrder(302);
    const title = { boss: LG.boss.name, daily: 'Daily Heist', practice: 'Practice Run', normal: LG.name, tutorial: 'Training Heist', endless: 'Endless Heist' }[mode];
    const sub = { boss: 'Boss manor - ' + LG.name, daily: 'Twist: ' + (G.twist ? G.twist.name : ''), practice: 'Your own manor - no rewards', normal: 'Rob ' + LG.place,
                  endless: G.run ? 'Manor ' + G.run.round + '  -  ' + LG.dogs + ' guards' + (G.run.out.length ? '  -  ' + G.run.out.length + ' caged' : '') : '',
                  tutorial: 'Learn the ropes in a quiet country manor' }[mode] + (night ? '  -  a dark night' : '');
    const t1 = add(label(title, 800, 408, 46, INK, 'center')); t1.setZOrder(303);
    const t2 = add(label(sub, 800, 470, 22, '120;70;50', 'center', 640)); t2.setZOrder(303);
    I.texts = [card, cr, t1, t2];
  }
  function updateIntro(dt) {
    const I = G.intro;
    I.t += dt;
    const HOLD = I.hold || 1.0, OPEN = 0.75;
    if (I.t > HOLD - 0.25) I.texts.forEach((o) => o.setOpacity(255 * Math.max(0, 1 - (I.t - (HOLD - 0.25)) / 0.3)));
    if (I.t > HOLD) {
      if (!I.whoosh) { I.whoosh = true; sfx('jump', 45, 0, 0.6); }
      const u = Math.min(1, (I.t - HOLD) / OPEN), e = 1 - Math.pow(1 - u, 3);
      I.left.setX(-800 * e); I.right.setX(800 + 800 * e);
    }
    if (I.t >= HOLD + OPEN) { I.objs.forEach(kill); G.intro = null; }
  }
  function tintAll(names, col) { OBJS.forEach((o) => { if (o.setColor && names.includes(o.getName ? o.getName() : o.name)) o.setColor(col); }); }
  function tintPatrol(o) { if (o.setColor) o.setColor('255;160;140'); }

  function selectCat(i) {
    const k = G.cats[i];
    if (G.mode === 'tutorial' && i !== 0 && !tutMikeAllowed(k)) { sfx('thunk', 50); say('In training, only Kuro is on the job. Press 1 or tap her portrait.'); return; }
    if (k.out) { say(G.tw === 'sick' ? k.name + ' is sick in bed today.' : k.name + ' was caught earlier in this run and sits this manor out.'); return; }
    if (k.caught) { say(k.name + ' is caged' + (momoCanFree(k) ? ' - Momo can free them!' : '.')); return; }
    G.selected = i;
    sfx('select', 60, 0, [1, 1.122, 1.335, 1.498, 1.682][i]);
    // in Japanese, a double space splits the line into parts the translator handles one by one (name, description, upgrade)
    const sp = SV.lang === 'ja' ? '  ' : ' ';
    const upg = up(k.id) ? sp + 'Upgraded:' + sp + UPGRADES[k.id].desc : '';
    const head = k.name + ' ' + k.title + ':' + sp + catDesc(k.id) + upg;
    if (!k.deployed) {
      G.deploying = i;
      say(head + '\nSwipe / press Left or Right, or tap a balcony, to send ' + k.name + ' in.', 'info');
    } else {
      G.deploying = -1;
      say(head, 'info');
    }
  }
  function cycleCat() {
    for (let n = 1; n <= 5; n++) { const i = (G.selected + n + 5) % 5; if (!G.cats[i].caught) { selectCat(i); return; } }
  }

  function heistTap(p) {
    if (G.state !== 'play' || G.intro) return;
    for (let i = 0; i < 5; i++) if (inside(p, 16 + i * 104, 4, 100, 100)) { selectCat(i); return; }
    if (Math.hypot(p.x - 1522, p.y - 822) < 66) { doAction(); return; }
    for (const g of G.ui.gadgets) if (inside(p, g.x, g.y, 66, 66)) { useGadget(g.id); return; }
    const c = Math.floor((p.x - GX) / CW), r = Math.floor((p.y - GY) / CH);
    if (c < 0 || c >= COLS || r < 0 || r >= ROWS) return;
    if (G.deploying >= 0) {
      if (G.mode === 'tutorial') { if (isBalc(c)) deploy(G.deploying, 0, ROWS - 1); else say('Tap the left balcony.'); return; }
      if (isBalc(c)) deploy(G.deploying, c, r); else say('Tap one of the balconies on the left or right edge.');
      return;
    }
    const here = G.cats.filter((k) => active(k) && k.c === c && k.r === r);
    if (here.length) { const cur = here.findIndex((k) => k.i === G.selected); selectCat(here[(cur + 1) % here.length].i); return; }
    const k = G.cats[G.selected];
    if (k && active(k)) {
      const dc = c - k.c, dr = r - k.r;
      if (Math.abs(dc) + Math.abs(dr) === 1) tryMove(k, dc < 0 ? 'L' : dc > 0 ? 'R' : dr < 0 ? 'U' : 'D');
    }
  }

  function deploy(i, c, r) {
    const k = G.cats[i];
    k.deployed = true; k.c = c; k.r = r; k.face = c === 0 ? 1 : -1;
    const p = catXY(k, c, r);
    k.obj = M('Cat', p.x, p.y - 160, 60 + 2 * i);       // each cat gets its own layer: cat, then its loot bag, then its hat
    k.obj.setScale(CAT_SCALE);
    k.obj.flipX(k.face < 0);
    k.from = { x: p.x, y: p.y - 160 }; k.to = p; k.tc = c; k.tr = r;
    k.moving = true; k.mt = 0; k.mdur = 0.5; k.jump = true; k.drop = true;
    anim(k.obj, k.id + '_jump');
    k.hat = wearHat(k.id, k.obj, CAT_SCALE); if (k.hat) k.hat.setZOrder(61 + 2 * i);
    sfx('jump', 55, 0.1);
    if (!G.practice) { stat('deploys'); SV.catUse[k.id] = (SV.catUse[k.id] || 0) + 1; }
    G.deploying = -1;
    say(k.name + ' drops onto the balcony. Move with WASD / arrows / swipe.');
  }

  function tryMove(k, dir) {
    if (!active(k) || k.moving) return;          // locked until the transition animation is finished
    if (k.stuck > 0) { say(k.name + ' is stuck!'); return; }
    if (k.hidden) {
      if (!unhide(k)) return;
      // coming out of hiding in the room where the loot was left: grab it on the way out
      if (G.lootFloor && G.lootFloor.c === k.c && G.lootFloor.r === k.r) {
        G.lootFloor = null; k.hasLoot = true; sfx('loot', 75); say(k.name + ' grabs the loot! Escape through an open shutter to a balcony!', 'good');
      }
    }
    const dc = dir === 'L' ? -1 : dir === 'R' ? 1 : 0;
    let dr = dir === 'U' ? -1 : dir === 'D' ? 1 : 0;
    let roped = false;
    if (dr && G.ropeArmed && k.i === G.selected && k.r + dr * 2 >= 0 && k.r + dr * 2 < ROWS && gadgetLeft('rope') > 0) {
      dr *= 2; roped = true; G.ropeArmed = false;
      if (!G.practice) { SV.gadgets.rope--; gadgetUsed('rope'); save(); stat('ropes'); }
      sfx('rope', 80);
    }
    const nc = k.c + dc, nr = k.r + dr;
    if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) return;
    if (dc !== 0) {
      const side = shutterSide(k.c, nc);
      if (side && !G.shutters[side][k.r].open) { G.shutters[side][k.r].shake = 0.3; sfx('thunk', 60, 0.1); say('That shutter is shut tight!'); return; }
    }
    k.cracking = false;
    if (dc) k.face = dc;
    k.obj.flipX(k.face < 0);
    k.from = catXY(k, k.c, k.r); k.to = catXY(k, nc, nr);
    k.prev = { c: k.c, r: k.r };
    k.tc = nc; k.tr = nr; k.jump = dr !== 0; k.drop = false;
    k.mt = 0; k.moving = true;
    const fast = k.id === 'hai', faster = fast && up('hai');
    k.mdur = k.jump ? (faster ? 0.3 : fast ? 0.38 : 0.55) : (faster ? 0.22 : fast ? 0.28 : 0.42);
    k.roped = roped;
    if (roped) k.mdur = 0.75;
    anim(k.obj, k.id + (k.jump ? '_jump' : '_walk'));
    if (!G.practice) stat(k.jump ? 'jumps' : 'steps');
    if (k.jump) sfx('jump', fast || (k.id === 'kuro' && up('kuro')) ? 25 : 55, 0.12);
    else sfx('step', k.id === 'kuro' ? 18 : k.id === 'shiro' && up('shiro') ? 35 : 60, 0.12, fast ? 1.25 : 1);
  }

  function revealAround(c, r, radius) {
    for (let b = r - radius; b <= r + radius; b++) for (let a = c - radius; a <= c + radius; a++) {
      if (a < 1 || a > COLS - 2 || b < 0 || b >= ROWS) continue;
      if (Math.abs(a - c) + Math.abs(b - r) > radius) continue;
      G.cells[b][a].revealed = true;
    }
  }
  function inSight(c, r) { return G.cats.some((k) => active(k) && Math.abs(k.c - c) + Math.abs(k.r - r) <= sight(k)); }

  // A cat's description. Shiro's only lists the traps from leagues you've reached, so it never spoils later ones.
  function catDesc(id) {
    if (id !== 'shiro') return CATDEFS[id].desc;
    const seen = (ch) => TOOLS.some((t) => t.ch === ch && t.league <= SV.maxLeague);
    const ja = SV.lang === 'ja';
    const RISKY = [['L', 'watch lanterns', '\u898b\u5f35\u308a\u706f\u7c60'], ['T', 'trapdoors', '\u843d\u3068\u3057\u7a74'], ['W', 'spinning walls', '\u3069\u3093\u3067\u3093\u8fd4\u3057'], ['F', 'firecrackers', '\u7206\u7af9']]
      .filter((t) => !SHIRO_SAFE.includes(TRAP_OF[t[0]]) && seen(t[0])).map((t) => t[ja ? 2 : 1]);
    if (ja) return '\u7f60\u3092\u4f5c\u52d5\u3055\u305b\u305a\u306b\u5916\u305b\u308b\u3002' + (RISKY.length ? RISKY.join('\u3001') + '\u306b\u306f\u5f15\u3063\u304b\u304b\u308b\u3002' : '');
    const list = RISKY.length < 2 ? RISKY.join('') : RISKY.slice(0, -1).join(', ') + ' and ' + RISKY[RISKY.length - 1];
    return 'Disarms traps instead of setting them off.' + (list ? ' ' + list.charAt(0).toUpperCase() + list.slice(1) + ' still get her.' : '');
  }
  const TRAP_OF = { L: 'lantern', T: 'trapdoor', W: 'spinwall', F: 'firecracker' };
  // Shiro's light paws handle floors, bells, nets, lanterns, caltrops, gongs and firecrackers. Trapdoors and spinning walls still get her.
  const SHIRO_SAFE = ['squeak', 'bell', 'net', 'lantern', 'caltrops', 'gong', 'firecracker'];
  function startle(k, dur) {
    k.animT = dur || 0.7;
    anim(k.obj, k.id + '_startle');
    emote('alert', 0, 0, k.obj);
  }
  function spotted(k) {
    startle(k);
    sfx('lantern', 85);
    makeNoise(k.c, k.r, 2);
    raiseAlarm('The watch lantern spots ' + k.name + '!');
  }
  function startFall(k) {
    k.from = catXY(k, k.c, k.r); k.to = catXY(k, k.c, k.r + 1);
    k.tc = k.c; k.tr = k.r + 1; k.jump = false; k.drop = true;
    k.mt = 0; k.mdur = 0.4; k.moving = true; k.fromTrapdoor = true;
    anim(k.obj, k.id + '_startle');
  }

  function stepNoise(k) {
    if (k.drop) return k.fromTrapdoor ? 2 : 0.4;
    if (k.jump) return k.id === 'hai' || (k.id === 'kuro' && up('kuro')) ? 0.3 : 1.9;
    if (k.id === 'kuro') return 0.1;
    if (k.id === 'shiro' && up('shiro')) return 0.45;
    return 0.9;
  }

  function arrive(k) {
    revealAround(k.c, k.r, sight(k));
    const cell = G.cells[k.r][k.c];
    let noise = stepNoise(k);
    if (k.jump || k.drop) { sfx('land', k.id === 'hai' ? 20 : 60, 0.1); landFx(k, noise); }
    k.drop = false; k.fromTrapdoor = false;
    if (cell.type === 'trap' && !cell.disarmed) {
      const tr = cell.trap;
      const shiroSafe = k.id === 'shiro' && SHIRO_SAFE.includes(tr);
      if (!G.practice && !(tr === 'lantern' && !cell.lit)) stat(shiroSafe ? 'disarmed' : 'traps');
      if (shiroSafe) {
        cell.disarmed = true; anim(cell.trapObj, tr + '_off'); sfx('disarm', 70);
        say('Shiro quietly disarms the ' + TRAP_NAMES[tr] + '.');
      } else if (tr === 'squeak') {
        noise += 4.5; sfx('squeak', 90, 0.08); startle(k);
        say('SQUEAK! The nightingale floor sings under ' + k.name + "'s paws...");
      } else if (tr === 'bell') {
        cell.disarmed = true; anim(cell.trapObj, 'bell_off'); noise += 3; sfx('bell', 85); startle(k);
        raiseAlarm('The bell string jingles!');
      } else if (tr === 'net') {
        cell.disarmed = true; anim(cell.trapObj, 'net_sprung'); k.stuck = 3; noise += 1.2; sfx('net', 80);
        emote('swirl', 0, 0, k.obj);
        say('A net drops on ' + k.name + '! (3 seconds)');
        k.netCell = cell;
      } else if (tr === 'lantern') {
        if (cell.lit) spotted(k);
      } else if (tr === 'caltrops') {
        cell.disarmed = true; anim(cell.trapObj, 'caltrops_off'); k.stuck = 1.5; noise += 2.2; sfx('stun', 85, 0.05);
        emote('swirl', 0, 0, k.obj);
        say('Ow! ' + k.name + ' steps on caltrops and yowls! (1.5 seconds)');
      } else if (tr === 'gong') {
        cell.disarmed = true; noise += 7; sfx('gong', 95); startle(k, 0.9);
        anim(cell.trapObj, 'gong_ring');
        later(1.4, () => { if (cell.trapObj) anim(cell.trapObj, 'gong_off'); });
        say('BWONNNG! ' + k.name + ' bumps the gong. The whole floor hears it!');
      } else if (tr === 'firecracker') {
        cell.disarmed = true; anim(cell.trapObj, 'firecracker_off');
        sfx('firecracker', 95); startle(k, 0.9); G.shake = 0.3; vibrate(120);
        noise += 6;
        for (const [a, b] of [[k.c - 1, k.r], [k.c + 1, k.r], [k.c, k.r - 1], [k.c, k.r + 1]]) if (a >= 1 && a <= COLS - 2 && b >= 0 && b < ROWS) makeNoise(a, b, 3);
        say('BANG-BANG-BANG! Firecrackers! The noise carries into the rooms all around.');
      } else if (tr === 'spinwall' && k.prev) {
        cell.disarmed = true; anim(cell.trapObj, 'spinwall_spin'); sfx('spin', 85);
        later(0.7, () => { if (cell.trapObj) anim(cell.trapObj, 'spinwall_off'); });
        makeNoise(k.c, k.r, 1.2);
        say('Whoa! A spinning wall flips ' + k.name + ' right back where they came from. It stays open now.');
        const back = k.prev;
        k.from = catXY(k, k.c, k.r); k.to = catXY(k, back.c, back.r);
        k.tc = back.c; k.tr = back.r; k.jump = back.r !== k.r; k.drop = false; k.roped = false;
        k.mt = 0; k.mdur = 0.5; k.moving = true; k.prev = null;
        anim(k.obj, k.id + '_startle');
        return;
      } else if (tr === 'trapdoor') {
        cell.disarmed = true; anim(cell.trapObj, 'trapdoor_open'); sfx('trapdoor', 85);
        later(0.9, () => { if (cell.trapObj) anim(cell.trapObj, 'trapdoor_off'); });
        if (k.r < ROWS - 1) {
          say('A trapdoor! ' + k.name + ' drops to the floor below!');
          makeNoise(k.c, k.r, noise);
          startFall(k);
          return;
        }
      }
    }
    makeNoise(k.c, k.r, noise);
    const d = dogAt(k.c, k.r);
    if (d && d.state !== 'sleep' && d.stunT <= 0 && d.eatT <= 0) catchCat(k, d);
    if (k.caught) return;
    if (k.id === 'momo') {
      const rad = up('momo') ? 1 : 0;
      for (const q of G.cats) if (q.caught && q.cage && Math.abs(q.cage.c - k.c) + Math.abs(q.cage.r - k.r) <= rad) freeCat(q);
    }
    for (const sl of G.side) {
      if (sl.taken || sl.c !== k.c || sl.r !== k.r) continue;
      sl.taken = true; kill(sl.obj);
      const v = Math.max(1, Math.round(sl.def.value * G.LG.koban * PAY_SCALE));
      G.sideGot += v;
      sfx('coin', 80, 0.05);
      bubble('+' + v, cx(k.c) + 110, cy(k.r) + 40);
      say(k.name + ' pockets a ' + sl.def.name + ' (+' + v + ' koban if you get away).');
      if (!G.practice) stat('sideLoot');
    }
    if (G.lootFloor && G.lootFloor.c === k.c && G.lootFloor.r === k.r) {
      G.lootFloor = null; k.hasLoot = true; sfx('loot', 75); say(k.name + ' grabs the loot! Escape through an open shutter!');
    }
    if (cell.type === 'vault' && !G.vault.open) say('The vault! Press Space or tap the red button to crack it.' + (G.vault.needs > 1 ? ' This one needs TWO cats cracking at once.' : ''));
    if (isBalc(k.c) && k.hasLoot) { win(k); return; }
    if (k.id === 'mike' && adjacentClosedShutter(k)) say('Mike can pry this shutter open: Space or the red button.');
  }

  function adjacentClosedShutter(k) {
    const side = (k.c <= 1) ? 'L' : (k.c >= COLS - 2) ? 'R' : null;
    if (!side) return null;
    const s = G.shutters[side][k.r];
    return s.open ? null : s;
  }

  // ----------------------------------------------------------------- action button feedback
  const ACT_X = 1522, ACT_Y = 822;                       // centre of the red action button
  const ACT_TINT = { crack: '255;214;110', pry: '214;160;110', lure: '255;150;200' };
  function actionFx(kind) {
    G.btnFx = { t: 0, ok: !!kind };
    if (!kind) { sfx('thunk', 45, 0.08, 1.3); return; }
    sfx('pop', 70, 0.08);
    anim(G.ui.action, 'press');
    const ring = U('Ripple', ACT_X - 80, ACT_Y - 80, 12);
    if (ring.setColor) ring.setColor(ACT_TINT[kind]);
    G.fx.push({ kind: 'uiring', o: ring, t: 0, dur: 0.5 });
    const ring2 = U('Ripple', ACT_X - 80, ACT_Y - 80, 12);
    if (ring2.setColor) ring2.setColor('230;80;60');
    G.fx.push({ kind: 'uiring', o: ring2, t: -0.08, dur: 0.5, small: true });
    for (let i = 0; i < 9; i++) {
      const o = U('Sparkle', ACT_X, ACT_Y, 13);
      if (o.setColor) o.setColor(ACT_TINT[kind]);
      const a = (i / 9) * 6.28 + Math.random() * 0.4, sp = 160 + Math.random() * 120;
      G.fx.push({ kind: 'spark', o: o, t: 0, x: ACT_X + Math.cos(a) * 50, y: ACT_Y + Math.sin(a) * 50, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, dur: 0.45 });
    }
  }
  function updateActionFx(dt) {
    const f = G.btnFx, o = G.ui.action;
    if (!f) return;
    f.t += dt;
    let sc = 1, dx = 0;
    if (f.ok) {
      const t = f.t;
      sc = t < 0.07 ? lerp(1, 0.84, t / 0.07) : t < 0.18 ? lerp(0.84, 1.1, (t - 0.07) / 0.11) : t < 0.32 ? lerp(1.1, 1, (t - 0.18) / 0.14) : 1;
      if (t > 0.2) anim(o, 'default');
      if (t > 0.32) G.btnFx = null;
    } else {
      dx = Math.sin(f.t * 55) * 9 * Math.max(0, 1 - f.t / 0.32);
      if (f.t > 0.32) G.btnFx = null;
    }
    if (o.setScale) o.setScale(sc);
    o.setPosition(ACT_X - 70 * sc + dx, ACT_Y - 70 * sc);
  }

  function hideIn(k) {
    const cell = G.cells[k.r][k.c];
    if (k.hasLoot) { k.hasLoot = false; G.lootFloor = { c: k.c, r: k.r }; G.lootDropMsg = true; sfx('loot_drop', 80); }
    k.hidden = true; k.cracking = false;
    k.obj.hide(true); k.obj.hiddenNow = true;
    anim(cell.hide.obj, cell.hide.kind + '_full');
    sfx('hide', 80, 0.05);
    if (!G.practice) stat('hides');
    say(k.name + ' slips into the ' + (cell.hide.kind === 'tansu' ? 'wardrobe' : 'folding screen') + '. Nothing can see or catch a hidden cat. Move or press the action button to come out.');
    if (G.lootDropMsg) { G.lootDropMsg = false; say(G.msg + ' The loot is too big to hide with - it stays on the floor.', 'info'); }
  }
  function unhide(k) {
    const cell = G.cells[k.r][k.c];
    k.hidden = false;
    k.obj.hide(false); k.obj.hiddenNow = false;
    if (cell.hide && !G.cats.some((q) => q.hidden && q.c === k.c && q.r === k.r)) anim(cell.hide.obj, cell.hide.kind);
    sfx('hide', 60, 0.1, 1.2);
    const d = dogAt(k.c, k.r);
    if (d && d.state !== 'sleep' && d.stunT <= 0 && d.eatT <= 0) { catchCat(k, d); return false; }
    return true;
  }
  function doAction() {
    if (G.state !== 'play') return;
    const k = G.cats[G.selected];
    if (!k || !active(k)) { actionFx(null); say('Pick a cat first: press 1-5 or tap a portrait.'); return; }
    if (k.moving) { actionFx(null); return; }
    if (k.stuck > 0) { actionFx(null); say(k.name + ' is stuck!'); return; }
    if (k.c === G.vault.c && k.r === G.vault.r && !G.vault.open) {
      // every cat standing in the vault room joins in (or pauses) together
      const crew = G.cats.filter((q) => active(q) && !q.moving && !q.hidden && q.stuck <= 0 && q.c === k.c && q.r === k.r);
      if (k.cracking) {                    // pressing again pauses: no more cracking noise, progress is kept
        actionFx('crack');
        crew.forEach((q) => { q.cracking = false; });
        sfx('thunk', 45, 0, 1.2);
        say((crew.length > 1 ? 'The cats stop' : k.name + ' stops') + ' cracking and keep' + (crew.length > 1 ? '' : 's') + ' still. Press again to carry on - the progress is kept.', 'info');
        return;
      }
      actionFx('crack');
      crew.forEach((q) => { q.cracking = true; });
      sfx('tick', 60);
      const n = G.cats.filter((q) => q.cracking && active(q) && q.c === k.c && q.r === k.r).length;
      say(n >= G.vault.needs ? k.name + ' cracks the vault' + (n > 1 ? ' with ' + (n - 1) + ' helper' + (n > 2 ? 's' : '') + '!' : '... stay put!')
                             : k.name + ' starts on the vault, but it needs a second cat cracking too!');
      return;
    }
    const hcell = G.cells[k.r][k.c];
    if (k.hidden) { actionFx('lure'); unhide(k); return; }
    if (hcell.hide) { actionFx('pry'); hideIn(k); return; }
    const s = adjacentClosedShutter(k);
    if (s && k.id === 'mike') {
      actionFx('pry');
      s.open = true; anim(s.obj, 'open'); sfx('creak', up('mike') ? 30 : 80);
      if (!up('mike')) makeNoise(k.c, k.r, 2);
      say('Mike pries the shutter open.' + (up('mike') ? ' Not a sound.' : ' Creak...'));
      return;
    }
    // teamwork: a lure meow pulls awake dogs on this floor to this room
    if (k.lureCd > 0) { actionFx(null); say(k.name + ' can meow again in ' + Math.ceil(k.lureCd) + 's.' + (s ? ' (Only Mike can pry shutters.)' : '')); return; }
    actionFx('lure');
    k.lureCd = LURE_COOLDOWN;
    if (!G.practice) stat('lures');
    G.lure = { c: k.c, r: k.r, t: LURE_TIME };
    sfx('meow', 90, 0.05, 0.9);
    emote('note', 0, 0, k.obj);
    makeNoise(k.c, k.r, 2.2);
    say(k.name + ' meows loudly! Awake dogs on this floor come running here. Get out of the way!');
  }

  // a cat that escapes a capture (smoke bomb, Goro) leaves the loot behind in the room where it was grabbed
  function dropLoot(k, c, r) {
    if (!k.hasLoot) return;
    k.hasLoot = false; G.lootFloor = { c: c, r: r }; sfx('loot_drop', 80);
    say(G.msg + ' But ' + k.name + ' dropped the loot! Go back and grab it.', 'alert');
  }
  function catchCat(k, d) {
    if (G.state !== 'play') return;
    const cc = k.c, cr = k.r;
    if (k.id === 'tora' && k.cooldown <= 0 && d.kind === 'samurai') {
      if (G.t - (G.samuraiMsg || -9) > 3) { G.samuraiMsg = G.t; say("Tora hisses... the samurai doesn't even blink!"); }
    } else if (k.id === 'tora' && k.cooldown <= 0) {
      k.cooldown = up('tora') ? 8 : 15; sfx('hiss', 85);
      if (!G.practice) stat('hisses');
      if (d.patrol) { d.stunT = 4; anim(d.obj, 'awake'); say('Tora HISSES! The patrol dog freezes for a moment.'); }
      else { sleepDog(d); say('Tora puffs up and HISSES! The dog slinks back to sleep.'); }
      return;
    }
    if (k.id === 'goro' && k.escapes > 0) {
      k.escapes--; k.cracking = false;
      if (!G.practice) stat('escapes');
      const bc = k.c <= 4 ? 0 : COLS - 1;
      k.c = bc; k.tc = bc; k.moving = false;
      k.obj.setPosition(catXY(k, bc, k.r).x, catXY(k, bc, k.r).y);
      sfx('hiss', 70, 0, 0.8); sfx('jump', 60);
      say('Goro shrugs off the dog and bolts out a window to the balcony!' + (k.escapes ? ' (one more escape left)' : ''));
      dropLoot(k, cc, cr);
      return;
    }
    if (!G.practice && gadgetLeft('smoke') > 0) {
      SV.gadgets.smoke--; gadgetUsed('smoke'); save();
      const sx = k.obj.getX() + CAT_W / 2, sy = k.obj.getY() + CAT_H / 2;
      smokeBurst(sx, sy, 16, 1); poofAt(sx, sy); sfx('poof', 90); sfx('hiss', 40, 0, 1.6); vibrate([40, 30, 80]); G.shake = Math.max(G.shake || 0, 0.18);
      const bc = k.c <= 4 ? 0 : COLS - 1;
      k.cracking = false; k.c = bc; k.tc = bc; k.moving = false;
      k.obj.setPosition(catXY(k, bc, k.r).x, catXY(k, bc, k.r).y);
      k.obj.hide(true);                                  // ...and pops out of a second little cloud on the balcony
      later(0.25, () => { if (!G || k.caught) return; k.obj.hide(false); smokeBurst(k.obj.getX() + CAT_W / 2, k.obj.getY() + CAT_H / 2, 7, 0.6); startle(k, 0.6); sfx('poof', 55, 0, 1.3); });
      say('POOF! A smoke bomb - ' + k.name + ' reappears on the balcony. (' + gadgetLeft('smoke') + ' left this heist)');
      if (!G.practice) stat('smokes');
      dropLoot(k, cc, cr);
      return;
    }
    k.caught = true; k.cracking = false; k.moving = false; k.stuck = 0; k.animT = 0; k.hidden = false;
    guardCatch(d, k);
    vibrate([120, 60, 120]);
    anim(k.obj, k.id + '_startle');
    emote('alert', 0, 0, k.obj);
    sfx('bark', 70, 0.1); sfx('caught', 85);
    const cage = k.cage = { c: k.c, r: k.r, obj: null };
    later(0.6, () => {
      if (!G || !k.caught || k.cage !== cage) return;
      poofAt(k.obj.getX() + CAT_W / 2, k.obj.getY() + CAT_H / 2);
      sfx('poof', 70);
      k.obj.hide(true);
      const x = cx(cage.c) + 96 - (k.i % 2) * 70, y1 = cy(cage.r) + FLOOR - 70;
      cage.obj = M('Cage', x, y1 - 110, 52);
      (scr.fx = scr.fx || []).push({ kind: 'drop', o: cage.obj, t: 0, dur: 0.8, y0: y1 - 110, y1: y1 });
      later(0.35, () => sfx('thunk', 55));
    });
    if (k.hasLoot) { k.hasLoot = false; G.lootFloor = { c: k.c, r: k.r }; sfx('loot_drop', 80); say(k.name + ' was caught and caged! The loot drops to the floor.'); }
    else say(k.name + ' was caught and caged!' + (momoCanFree(k) ? ' Momo can free them.' : ''));
    if (G.selected === k.i) G.selected = -1;
  }

  // the guard's moment of triumph: it lunges at the cat, plays its catch pose and shouts, then carries on
  const CATCH_T = 1.3;
  function guardCatch(d, k) {
    if (!d || !d.obj) return;
    if (d.moving) { d.moving = false; d.c = d.tc; d.r = d.tr; }
    const p = gXY(d, d.c, d.r);
    d.obj.setPosition(p.x, p.y);
    d.catchT = CATCH_T;
    d.catchDir = k.obj.getX() + CAT_W / 2 >= p.x + (d.kind === 'dog' ? 55 : 50) ? 1 : -1;
    d.obj.flipX(d.catchDir < 0);
    if (d.obj.setAnimationSpeedScale) d.obj.setAnimationSpeedScale(1);
    anim(d.obj, 'catch');
    const shout = d.kind === 'samurai' ? 'Halt, thief!' : d.kind === 'ninja' ? 'Got you!' : 'WOOF!';
    if (d.kind === 'samurai') sfx('samurai', 70, 0.05);
    else if (d.kind === 'ninja') sfx('ninja', 70, 0.05);
    bubble(shout, p.x + 50, p.y - 26);
    emote('alert', p.x + 40, p.y - 50);
    G.shake = Math.max(G.shake || 0, 0.2);
  }
  function updateCatchPose(d, dt) {
    d.catchT -= dt;
    const t = CATCH_T - d.catchT, p = gXY(d, d.c, d.r);
    const lunge = t < 0.3 ? Math.sin(Math.PI * t / 0.3) * 16 : 0;          // a quick pounce toward the cat and back
    const hop = t < 0.3 ? Math.sin(Math.PI * t / 0.3) * 8 : 0;
    d.obj.setPosition(p.x + lunge * d.catchDir, p.y - hop);
    if (d.catchT <= 0) { d.catchT = 0; d.obj.setPosition(p.x, p.y); anim(d.obj, d.state === 'sleep' ? 'sleep' : 'run'); }
  }

  function freeCat(q) {
    q.caught = false; q.stuck = 0; q.animT = 0;
    if (!G.practice) stat('rescues');
    if (q.cage.obj) { if (scr.fx) scr.fx = scr.fx.filter((f) => f.o !== q.cage.obj); kill(q.cage.obj); }
    q.c = q.cage.c; q.r = q.cage.r; q.tc = q.c; q.tr = q.r;
    q.cage = null;
    q.obj.hide(false);
    anim(q.obj, q.id + '_idle');
    poofAt(q.obj.getX() + CAT_W / 2, q.obj.getY() + CAT_H / 2);
    emote('heart', 0, 0, q.obj);
    sfx('disarm', 70); sfx('select', 60, 0, 1.5);
    say('Momo slips the latch - ' + q.name + ' is free!');
  }

  function updateCats(dt) {
    for (const k of G.cats) {
      if (k.lureCd > 0) k.lureCd -= dt;
      if (!active(k)) continue;
      if (k.cooldown > 0) k.cooldown -= dt;
      if (k.stuck > 0) {
        k.stuck -= dt;
        if (!k.moving) anim(k.obj, k.id + '_struggle');
        if (k.stuck <= 0) {
          say(k.name + ' is free to move again.');
          anim(k.obj, k.id + '_idle');
          if (k.netCell) { anim(k.netCell.trapObj, 'net_off'); k.netCell = null; }
        }
      } else if (k.animT > 0 && !k.moving) {
        k.animT -= dt;
        if (k.animT <= 0) anim(k.obj, k.id + '_idle');
      }
      if (k.moving) {
        k.mt += dt;
        const t = Math.min(1, k.mt / k.mdur);
        const arc = k.drop ? 0 : k.jump ? Math.sin(Math.PI * t) * (k.roped ? 55 : 30) : 0;
        const e = k.drop ? t * t : t;
        k.obj.setPosition(lerp(k.from.x, k.to.x, e), lerp(k.from.y, k.to.y, e) - arc);
        if (t >= 1) { k.moving = false; k.c = k.tc; k.r = k.tr; anim(k.obj, k.id + '_idle'); arrive(k); }
      } else {
        const p = catXY(k, k.c, k.r);
        k.obj.setPosition(p.x, p.y);
      }
    }
    // loot lying on the floor is picked up by any cat standing in that room (not hidden, not mid-move)
    if (G.lootFloor && G.state === 'play') {
      const q = G.cats.find((c) => active(c) && !c.hidden && !c.moving && c.c === G.lootFloor.c && c.r === G.lootFloor.r);
      if (q) { G.lootFloor = null; q.hasLoot = true; sfx('loot', 75); say(q.name + ' grabs the loot! Escape through an open shutter to a balcony!', 'good'); }
    }
    for (const k of G.cats) if (k.hat) {
      k.obj.hiddenNow = k.hidden || (k.caught && k.obj.hidden); syncHat(k.hat, k.obj, k.face);
      // the phoenix crown glitters now and then
      if (k.hat.hatKind === 'phoenix' && !k.obj.hiddenNow && (k.sparkT = (k.sparkT || 0) - dt) <= 0) {
        k.sparkT = 0.5 + Math.random() * 0.6;
        const hx = k.obj.getX() + (k.face > 0 ? 0.6 : 0.4) * CAT_W, hy = k.obj.getY();
        sparkle(hx + (Math.random() - 0.5) * 40, hy - 6 + Math.random() * 20, 0);
      }
    }
    updateGadgetBar(dt);
    const carrier = G.cats.find((k) => k.hasLoot && active(k));
    if (carrier || G.lootFloor) {
      if (!G.lootObj) G.lootObj = M('Loot', 0, 0, 62);
      G.lootObj.setZOrder(carrier ? 60.5 + 2 * carrier.i : 59.5);   // held: just above its carrier; on the floor: behind every cat
      if (carrier) G.lootObj.setPosition(carrier.obj.getX() + (carrier.face > 0 ? 10 : CAT_W - 58), carrier.obj.getY() + 4 + lootDy(carrier.obj) * CAT_SCALE);
      else G.lootObj.setPosition(cx(G.lootFloor.c) + 52, cy(G.lootFloor.r) + FLOOR - 42);
      G.glintT -= dt;
      if (G.glintT <= 0) { G.glintT = 0.7; sparkle(G.lootObj.getX() + 10 + Math.random() * 28, G.lootObj.getY() + Math.random() * 30, 0); }
    }
  }

  function makeNoise(c, r, amt) {
    if (G.tw === 'creaky') amt *= 1.4;          // daily twist: every sound carries further
    if (amt <= 0.05) return;
    const o = M('Ripple', 0, 0, 90);
    G.fx.push({ kind: 'ripple', o: o, t: 0, x: cx(c) + CW / 2, y: cy(r) + 60, s: 0.5 + amt * 0.25 });
    for (const d of G.dogs) {
      if (d.patrol) continue;
      const dist = Math.abs(d.c - c) + 1.5 * Math.abs(d.r - r);
      if (d.state === 'sleep') { d.meter += amt / (1 + dist); if (d.meter >= wakeAt(d)) wakeDog(d); }
      else if (d.r === r) d.awakeT = Math.max(d.awakeT, 6 * awakeMul(d));
    }
  }

  // One alarm activation (a chain of alarms going off less than ALARM_GROUP seconds apart, like a firecracker
  // waking several dogs) can slam at most MAX_SHUT_PER_ALARM shutters. Every alarm still counts.
  const ALARM_GROUP = 3, MAX_SHUT_PER_ALARM = 3;
  function raiseAlarm(why) {
    if (G.t - (G.lastAlarmT == null ? -99 : G.lastAlarmT) >= ALARM_GROUP) G.shutThisAlarm = 0;   // a fresh activation
    G.lastAlarmT = G.t;
    G.alarm++;
    if (G.tw === 'onealarm' && !G.pendingLose) G.pendingLose = 'The alarm went off - and today one alarm ends the heist.';
    if (!G.practice) stat('alarms');
    if ((G.shutThisAlarm || 0) >= MAX_SHUT_PER_ALARM) {
      sfx('alarm', 50);
      say(why + ' (No more shutters close from this alarm.)');
      return;
    }
    const open = [];
    for (const side of ['L', 'R']) G.shutters[side].forEach((s) => { if (s.open) open.push(s); });
    if (open.length) {
      const s = open[Math.floor(Math.random() * open.length)];
      s.open = false; s.shake = 0.4; anim(s.obj, 'closed');
      G.shutThisAlarm = (G.shutThisAlarm || 0) + 1;
      sfx('slam', 85, 0.06); sfx('alarm', 60);
      G.shake = 0.35; vibrate(90);
      say(why + ' A shutter slams shut!');
    } else say(why);
  }

  function awakeMul(d) { return d.kind === 'samurai' || d.kind === 'ninja' ? 1.2 : 1; }   // they stay alert 1.2x longer than dogs
  function wakeAt(d) { return G.LG.wake * (d.kind === 'samurai' ? 2 : 1); }
  function wakeDog(d) {
    d.state = 'awake'; d.alertT = 0.9; d.awakeT = 9 * awakeMul(d); d.meter = 0; d.stepT = 0;
    if (!G.practice) stat('dogsWoken');
    anim(d.obj, 'awake');
    if (d.obj.setAnimationSpeedScale) d.obj.setAnimationSpeedScale(1);
    if (d.kind === 'samurai') { sfx('samurai', 90); raiseAlarm('The samurai wakes with a shout!'); }
    else if (d.kind === 'ninja') { sfx('ninja', 90); raiseAlarm('A ninja drops from the rafters - he can climb between floors!'); }
    else { sfx('bark', 85, 0.12); raiseAlarm('A guard dog wakes up and barks!'); }
    vibrate(80);
  }

  function sleepDog(d) {
    d.state = 'sleep'; d.meter = 0; d.awakeT = 0; d.moving = false;
    d.tr = d.r;
    const p = gXY(d, d.c, d.r); d.obj.setPosition(p.x, p.y);
    anim(d.obj, 'sleep');
    if (d.obj.setAnimationSpeedScale) d.obj.setAnimationSpeedScale(1);
  }

  function catsInCell(c, r) { return G.cats.filter((k) => active(k) && !k.moving && !k.hidden && k.c === c && k.r === r); }

  function dogCanEnter(d, nc, nr) {
    const r = nr == null ? d.r : nr;
    if (nc < 1 || nc > COLS - 2 || r < 0 || r >= ROWS || dogAt(nc, r)) return false;
    if (d.kind !== 'samurai' && toraGuards(nc, r)) {      // samurai aren't intimidated by Tora
      if (G.t - G.toraMsg > 4) { G.toraMsg = G.t; say('Tora stands her ground - the dog will not come into her room!'); }
      return false;
    }
    return true;
  }

  function moveDog(d, nc, slow, nr) {
    d.tc = nc; d.tr = nr == null ? d.r : nr; d.moving = true; d.mt = 0; d.slow = !!slow;
    if (nc !== d.c) d.obj.flipX(nc < d.c);
    if (d.tr !== d.r || Math.abs(nc - d.c) > 1) sfx('ninja', 45, 0.1);
    anim(d.obj, 'run');
    if (d.obj.setAnimationSpeedScale) d.obj.setAnimationSpeedScale(slow ? 0.45 : 1);
    sfx('dogstep', slow ? 22 : 40, 0.15);
  }

  function updateDogs(dt) {
    if (G.lure) { G.lure.t -= dt; if (G.lure.t <= 0) G.lure = null; }
    for (const d of G.dogs) {
      if (d.catchT > 0) { updateCatchPose(d, dt); continue; }
      if (d.state === 'sleep') {
        d.meter = Math.max(0, d.meter - 0.28 * dt);       // noise fades from a sleeping dog's bubble
        anim(d.obj, d.kind === 'dog' && d.meter > wakeAt(d) * 0.65 ? 'stir' : 'sleep');
        continue;
      }
      if (d.moving) {
        d.mt += dt;
        const leap = Math.abs(d.tc - d.c) > 1 || Math.abs(d.tr - d.r) > 1;    // a ninja vaulting over another guard
        const t = Math.min(1, d.mt / (d.slow ? 0.8 : leap ? 0.6 : d.kind === 'samurai' ? 0.35 : 0.45));   // samurai dash between rooms
        const a = gXY(d, d.c, d.r), b = gXY(d, d.tc, d.tr);
        const vert = d.tr !== d.r;
        d.obj.setPosition(lerp(a.x, b.x, t), lerp(a.y, b.y, t) - (leap ? Math.sin(Math.PI * t) * 48 : vert ? Math.sin(Math.PI * t) * 34 : Math.abs(Math.sin(t * Math.PI * 2)) * 3));
        if (t >= 1) { d.moving = false; d.c = d.tc; d.r = d.tr; } else continue;
      }
      if (d.stunT > 0) { d.stunT -= dt; if (d.stunT <= 0) anim(d.obj, 'run'); continue; }
      if (d.eatT > 0) {
        d.eatT -= dt; anim(d.obj, 'awake');
        if (d.eatT <= 0 && G.fish && G.fish.c === d.c && G.fish.r === d.r) { kill(G.fish.obj); G.fish = null; }
        continue;
      }
      if (G.fish && G.fish.r === d.r && d.state !== 'sleep') {
        if (G.fish.c === d.c) { d.eatT = 6; d.awakeT = Math.max(d.awakeT, 7 * awakeMul(d)); emote('heart', d.obj.getX() + 50, d.obj.getY() - 30); sfx('coin', 30, 0, 0.6); continue; }
        if (d.stepT - dt <= 0) { const nc = d.c + Math.sign(G.fish.c - d.c); d.stepT = G.LG.dogStep * 0.8; if (dogCanEnter(d, nc)) moveDog(d, nc); }
        d.stepT -= dt;
        continue;
      }
      if (d.alertT > 0) { d.alertT -= dt; if (d.alertT <= 0) anim(d.obj, 'run'); continue; }
      for (const k of catsInCell(d.c, d.r)) { catchCat(k, d); if (d.state === 'sleep' || d.stunT > 0) break; }
      if (d.catchT > 0) continue;              // just pounced: hold the catch pose
      if (d.state === 'sleep' || d.stunT > 0) continue;
      d.stepT -= dt;
      if (d.patrol) {
        // patrol dogs pace their floor forever, turning at walls, other dogs and Tora
        if (d.stepT <= 0) {
          d.stepT = G.LG.dogStep * 1.15;
          if (!dogCanEnter(d, d.c + d.dir)) d.dir = -d.dir;
          if (dogCanEnter(d, d.c + d.dir)) moveDog(d, d.c + d.dir);
        }
        continue;
      }
      d.awakeT -= dt;
      if (d.kind === 'ninja') { d.stepT -= dt * 0.5; ninjaStep(d, dt); continue; }   // ninjas step 1.5x as often as a dog
      const prey = G.cats.filter((k) => active(k) && !k.hidden && k.r === d.r && !isBalc(k.c));
      let goal = null, returning = false;
      if (G.lure && G.lure.r === d.r) { goal = G.lure.c; d.awakeT = Math.max(d.awakeT, 4 * awakeMul(d)); if (goal === d.c) G.lure = null; }
      else if (prey.length) {
        d.awakeT = Math.max(d.awakeT, 4 * awakeMul(d));
        prey.sort((p, q) => Math.abs(p.c - d.c) - Math.abs(q.c - d.c));
        goal = prey[0].c;
      } else if (d.awakeT <= 0) { goal = d.homeC; returning = true; }
      if (returning && goal === d.c) {
        sleepDog(d); emote('zzz', d.obj.getX() + 60, d.obj.getY() - 30); sfx('yawn', 45, 0.1);
        continue;
      }
      if (goal !== null && goal !== d.c && d.stepT <= 0) {
        const nc = d.c + Math.sign(goal - d.c);
        if (dogCanEnter(d, nc)) { moveDog(d, nc, returning); d.blockedT = 0; }
        else if (returning && (d.blockedT = (d.blockedT || 0) + 1.4) > 3) {
          // another guard is in the way home: settle down to sleep right here instead of standing about forever
          d.homeC = d.c; d.blockedT = 0;
          sleepDog(d); emote('zzz', d.obj.getX() + 60, d.obj.getY() - 30); sfx('yawn', 45, 0.1);
          continue;
        }
        d.stepT = returning ? 1.4 : G.LG.dogStep * (d.kind === 'samurai' ? 0.36 : 1);
      } else if (goal === null || goal === d.c) anim(d.obj, 'awake');
    }
  }

  // ----------------------------------------------------------------- gadgets
  function useGadget(id) {
    if (G.state !== 'play' || G.intro) return;
    const have = gadgetLeft(id);
    if (G.tw === 'nogadgets') { sfx('thunk', 50); say('Empty pockets today: no gadgets in this heist.'); return; }
    if (id === 'smoke' && G.practice) { say('Smoke bombs are off on your own manors, so you can see whether your guards catch you.'); return; }
    if (id === 'smoke') { say('Smoke bombs work by themselves: the next time a cat is caught, it escapes. ' + have + ' left this heist.'); return; }
    if (have <= 0) {
      sfx('thunk', 50);
      if ((SV.gadgets[id] || 0) > 0) say('That\'s ' + GADGET_PER_HEIST + ' ' + GADGETS[id].name.toLowerCase() + ' used this heist - the most you can use in one heist.');
      else say('No ' + GADGETS[id].name.toLowerCase() + ' left. Buy more in the Cat Shop (Gadgets).');
      return;
    }
    const k = G.cats[G.selected];
    if (id === 'rope') {
      G.ropeArmed = !G.ropeArmed;
      sfx(G.ropeArmed ? 'rope' : 'thunk', 50);
      say(G.ropeArmed ? 'Rope ready: the next up or down jump climbs two floors.' : 'Rope put away.');
      return;
    }
    if (!k || !active(k) || k.moving || k.hidden) { sfx('thunk', 50); say('Select a cat in the manor first.'); return; }
    let tc = k.c + k.face;
    if (tc < 1 || tc > COLS - 2) tc = isBalc(k.c) ? k.c + (k.c === 0 ? 1 : -1) : k.c;
    if (G.fish) kill(G.fish.obj);
    const o = M('Fish', cx(tc) + 52, cy(k.r) + FLOOR - 40, 34);
    G.fish = { c: tc, r: k.r, obj: o, t: 14 };
    G.cells[k.r][tc].revealed = true;
    if (!G.practice) { SV.gadgets.fish--; gadgetUsed('fish'); save(); stat('fish'); }
    sfx('fish', 85);
    makeNoise(tc, k.r, 1.2);
    say(k.name + ' tosses a dried fish. Awake dogs on this floor will go and eat it!');
  }
  function updateGadgetBar(dt) {
    for (const g of G.ui.gadgets) {
      const n = gadgetLeft(g.id);
      if (G.practice) {                      // your own manor: unlimited fish and rope; smoke bombs stay off so guards can still catch you
        txt(g.n, g.id === 'smoke' ? 'off' : '\u221e');
        g.ic.setOpacity(g.id === 'smoke' ? 90 : 255);
      } else {
        txt(g.n, String(n));
        g.ic.setOpacity(n > 0 ? 255 : 90);
      }
      anim(g.sl, g.id === 'rope' && G.ropeArmed ? 'selected' : 'normal');
    }
    if (G.fish) { G.fish.t -= dt; if (G.fish.t <= 0) { kill(G.fish.obj); G.fish = null; } }
  }

  // ----------------------------------------------------------------- owls: every few seconds they open their eyes and watch the whole floor
  function updateOwls(dt) {
    for (const ow of G.owls) {
      const komainu = ow.kind === 'komainu';
      const CYC = komainu ? KOMAINU_CYCLE : OWL_CYCLE, OPN = komainu ? KOMAINU_OPEN : OWL_OPEN;
      ow.t = (ow.t + dt) % CYC;
      const open = ow.t > CYC - OPN;
      const seen = G.cells[ow.r][ow.c].revealed;
      ow.obj.hide(!seen);
      if (open !== ow.open) {
        ow.open = open;
        anim(ow.obj, open ? (komainu ? 'komainu_watch' : 'owl_watch') : (komainu ? 'komainu' : 'owl'));
        if (open) {
          ow.seen = [];
          if (seen) {
            if (!komainu) sfx('owl', 55);
            const c0 = komainu ? Math.max(1, ow.c - 1) : 1, c1 = komainu ? Math.min(COLS - 2, ow.c + 1) : COLS - 2;
            ow.gaze = M('Gaze', cx(c0), cy(ow.r) + 8, 79);
            size(ow.gaze, CW * (c1 - c0 + 1), CH - 20); ow.gaze.setOpacity(komainu ? 70 : 55);
          }
        } else if (ow.gaze) { kill(ow.gaze); ow.gaze = null; }
      }
      if (!open) continue;
      for (const k of G.cats) {
        if (!active(k) || k.hidden || k.r !== ow.r || isBalc(k.c) || ow.seen.includes(k)) continue;
        if (komainu && Math.abs(k.c - ow.c) > 1) continue;
        ow.seen.push(k);
        startle(k);
        sfx(komainu ? 'roar' : 'owl', 80, 0, komainu ? 1 : 1.2);
        makeNoise(k.c, k.r, 1.5);
        raiseAlarm(komainu ? 'The stone komainu\'s eyes blaze - it roars at ' + k.name + '!'
                           : seen ? 'The owl spots ' + k.name + '!' : 'Something with glowing eyes spots ' + k.name + ' in the dark!');
        if (!G.practice) stat('owlSpots');
        if (G.state !== 'play') return;
      }
    }
  }

  // ninja: hunts the nearest cat anywhere in the manor, climbing between floors (floor first, then along it)
  function ninjaStep(d, dt) {
    const prey = G.cats.filter((k) => active(k) && !k.hidden && !isBalc(k.c));
    let gc, gr, returning = false;
    if (prey.length) {
      d.awakeT = Math.max(d.awakeT, 4 * awakeMul(d));
      prey.sort((p, q) => (Math.abs(p.c - d.c) + Math.abs(p.r - d.r)) - (Math.abs(q.c - d.c) + Math.abs(q.r - d.r)));
      gc = prey[0].c; gr = prey[0].r;
    } else if (d.awakeT <= 0) { gc = d.homeC; gr = d.homeR; returning = true; }
    else { anim(d.obj, 'awake'); return; }
    if (returning && gc === d.c && gr === d.r) {
      sleepDog(d); emote('zzz', d.obj.getX() + 50, d.obj.getY() - 20); sfx('yawn', 40, 0.1, 0.8);
      return;
    }
    if (d.stepT > 0) return;
    d.stepT = returning ? 1.2 : G.LG.dogStep * 0.8;
    // find the next room on a real path to the target (other guards and Tora's room block the way);
    // if the target can't be reached, head for the reachable room closest to it
    const step = ninjaPath(d, gc, gr);
    if (step) { d.blockedT = 0; if (dogCanEnter(d, step[0], step[1])) moveDog(d, step[0], returning, step[1]); return; }
    d.blockedT = (d.blockedT || 0) + d.stepT;
    if (returning && d.blockedT > 3) {            // can't get home: settle down to sleep right here instead
      d.homeC = d.c; d.homeR = d.r; d.blockedT = 0;
      sleepDog(d); emote('zzz', d.obj.getX() + 50, d.obj.getY() - 20); sfx('yawn', 40, 0.1, 0.8);
    }
  }
  function ninjaPath(d, gc, gr) {
    const inGrid = (c, r) => c >= 1 && c <= COLS - 2 && r >= 0 && r < ROWS;
    const guardAt = (c, r) => G.dogs.some((o) => o !== d && o.c === c && o.r === r);
    const key = (c, r) => r * 16 + c, free = (c, r) => inGrid(c, r) && !guardAt(c, r) && !toraGuards(c, r);
    const prev = new Map([[key(d.c, d.r), null]]), q = [[d.c, d.r]];
    let best = null, bestD = Math.abs(d.c - gc) + Math.abs(d.r - gr);
    while (q.length) {
      const [c, r] = q.shift();
      if (c === gc && r === gr) { best = [c, r]; bestD = 0; break; }
      const dd = Math.abs(c - gc) + Math.abs(r - gr);
      if (dd < bestD) { bestD = dd; best = [c, r]; }
      for (const [dc, dr] of [[0, Math.sign(gr - r) || 1], [Math.sign(gc - c) || 1, 0], [0, -(Math.sign(gr - r) || 1)], [-(Math.sign(gc - c) || 1), 0]]) {
        let nc = c + dc, nr = r + dr;
        // a guard in the way? the ninja leaps clean over it to the room beyond
        if (inGrid(nc, nr) && guardAt(nc, nr) && free(nc + dc, nr + dr)) { nc += dc; nr += dr; }
        if (prev.has(key(nc, nr)) || !free(nc, nr)) continue;
        prev.set(key(nc, nr), [c, r]); q.push([nc, nr]);
      }
    }
    if (!best || (best[0] === d.c && best[1] === d.r)) return null;
    let cur = best;
    while (prev.get(key(cur[0], cur[1])) && (prev.get(key(cur[0], cur[1]))[0] !== d.c || prev.get(key(cur[0], cur[1]))[1] !== d.r)) cur = prev.get(key(cur[0], cur[1]));
    return cur;
  }

  function updateLanterns(dt) {
    for (const cell of G.lanterns) {
      if (cell.disarmed) continue;
      cell.lt = (cell.lt + dt) % LANTERN_CYCLE;
      const lit = cell.lt < LANTERN_ON;
      if (lit !== cell.lit) {
        cell.lit = lit;
        anim(cell.trapObj, lit ? 'lantern_lit' : 'lantern');
        if (lit) for (const k of catsInCell(cell.c, cell.r)) { spotted(k); if (G.state !== 'play') return; }
      }
    }
  }

  function crackRate(k) { return k.id === 'mike' ? (up('mike') ? 1 / 0.9 : 1 / 1.5) : 1 / 4.5; }
  function updateVault(dt) {
    const v = G.vault;
    if (v.open) { txt(v.label, ''); return; }
    const crew = G.cats.filter((q) => q.cracking && active(q) && !q.moving && q.stuck <= 0 && q.c === v.c && q.r === v.r);
    if (crew.length < v.needs) {
      txt(v.label, (v.prog > 0 ? (crew.length ? '' : 'Paused ') + Math.floor(v.prog * 100) + '%' : '') + (v.needs > 1 ? (v.prog > 0 ? ' ' : '') + crew.length + '/2 cats' : ''));
      return;
    }
    v.prog += dt * crew.reduce((sum, q) => sum + crackRate(q), 0);
    v.noiseT += dt;
    if (v.noiseT >= 0.5) { v.noiseT = 0; makeNoise(v.c, v.r, 0.7); sfx('tick', 72, 0.1); }
    txt(v.label, 'Cracking ' + Math.min(99, Math.floor(v.prog * 100)) + '%' + (crew.length > 1 ? ' x' + crew.length : ''));
    if (v.prog >= 1) {
      const k = crew[0];
      v.open = true; anim(v.obj, 'open'); crew.forEach((q) => { q.cracking = false; }); k.hasLoot = true;
      if (!G.practice) stat('vaults');
      sfx('vault_open', 90); sfx('loot', 70); sfx('sparkle', 60); vibrate([60, 40, 60]);
      for (let i = 0; i < 16; i++) sparkle(cx(v.c) + 106, cy(v.r) + 70, 1);
      makeNoise(v.c, v.r, 3.2);                 // the vault door swinging open is loud
      // the vault has its own alarm bell - unless Mike the Lockpick is one of the cats cracking it
      if (crew.some((q) => q.id === 'mike')) say('Mike slips the lock without a sound - no alarm! ' + k.name + ' grabs the loot. Escape to a balcony!', 'good');
      else {
        raiseAlarm('The vault swings open! The alarm sounds!');
        say(k.name + ' grabs the loot! Escape through an open shutter to a balcony! (Bring Mike to open vaults silently.)');
      }
    }
  }

  function sparkle(x, y, burst) {
    const o = M('Sparkle', x, y, 97);
    const a = Math.random() * 6.28, sp = burst ? 60 + Math.random() * 120 : 8;
    G.fx.push({ kind: 'spark', o: o, t: 0, x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (burst ? 40 : 15), dur: burst ? 0.9 : 0.6 });
  }

  // a lacquer banner drops in from the top: "Achievement unlocked!"
  function achToast(name) {
    const a = ACHIEVEMENTS.find((x) => x.name === name) || { name: name, desc: '' };
    bannerToast('Achievement unlocked!', a.name, a.desc);
  }
  function bannerToast(head, name, desc) {
    const a = { name: name, desc: desc || '' };
    const x = 800 - 280;
    const bg = U('Toast', x, -110, 300);
    const t1 = label(head, x + 108, -100, 18, '230;190;90'); t1.setZOrder(301);
    const t2 = label(a.name, x + 108, -100, 26, CREAM); t2.setZOrder(301);
    const t3 = label(a.desc, x + 108, -100, 15, '220;210;190', null, 420); t3.setZOrder(301);
    sfx('star', 80, 0, 1.2); later(0.15, () => sfx('coin', 60, 0, 1.4));
    const f = { kind: 'toast', t: 0, bg: bg, parts: [[t1, 14], [t2, 34], [t3, 66]] };
    if (screen === 'heist' && G) G.fx.push(f); else (scr.fx = scr.fx || []).push(Object.assign(f, { dur: 3.1 }));   // menus run their own fx loop
  }
  function trapReveal(c, r, kind) {
    const x = cx(c) + CW / 2, y = cy(r) + CH / 2 + 6;
    const ring = M('Ripple', x - 80, y - 80, 94); if (ring.setColor) ring.setColor('255;214;120');
    const nm = TRAP_NAMES[kind] || kind;
    const t = M('WorldText', 0, 0, 96); txt(t, nm.charAt(0).toUpperCase() + nm.slice(1)); outline(t, true);
    if (t.setCharacterSize) t.setCharacterSize(20); if (t.setColor) t.setColor('255;226;150');
    t.setX(x - (t.getWidth() || nm.length * 10) / 2); t.setY(cy(r) + 6);
    for (let i = 0; i < 8; i++) sparkle(x, y, 1);
    sfx('ding', 70, 0, 1.2);
    G.fx.push({ kind: 'treveal', ring: ring, label: t, x: x, y: y, ly: cy(r) + 6, t: 0 });
  }
  function updateFx(dt) {
    for (let i = G.fx.length - 1; i >= 0; i--) {
      const f = G.fx[i];
      f.t += dt;
      if (f.kind === 'treveal') {           // soft golden glow pulsing twice, name floating above the trap
        const T = 2.8, u = (f.t % 0.8) / 0.8, sc = 0.45 + u * 0.7;
        f.ring.setScale && f.ring.setScale(sc);
        f.ring.setPosition(f.x - 80 * sc, f.y - 80 * sc);
        f.ring.setOpacity(f.t < 1.6 ? 230 * (1 - u) : 0);
        const a = f.t < 0.25 ? f.t / 0.25 : f.t > T - 0.6 ? Math.max(0, (T - f.t) / 0.6) : 1;
        f.label.setOpacity(255 * a); f.label.setY(f.ly - Math.min(1, f.t / 0.4) * 6);
        if (f.t >= T) { kill(f.ring); kill(f.label); G.fx.splice(i, 1); }
        continue;
      }
      if (f.kind === 'puff') {
        if (f.t < 0) { f.o.setOpacity(0); continue; }
        const u = f.t / f.dur;
        if (u >= 1) { kill(f.o); G.fx.splice(i, 1); continue; }
        const drag = Math.exp(-3 * f.t);
        f.x += f.vx * drag * dt; f.y += (f.vy * drag - 14) * dt; f.rot += f.vr * dt;
        const sc = f.s0 + (f.s1 - f.s0) * (1 - Math.pow(1 - Math.min(1, u * 1.6), 2));
        if (f.o.setScale) f.o.setScale(sc);
        f.o.setPosition(f.x - 36 * sc, f.y - 36 * sc);
        if (f.o.setAngle) f.o.setAngle(f.rot);
        f.o.setOpacity(255 * (u < 0.1 ? u / 0.1 : Math.pow(1 - (u - 0.1) / 0.9, 1.4)) * 0.95);
        continue;
      }
      if (f.kind === 'toast') {
        const IN = 0.35, HOLD = 2.4, OUT = 0.35, T = IN + HOLD + OUT;
        const u = f.t < IN ? f.t / IN : f.t < IN + HOLD ? 1 : Math.max(0, 1 - (f.t - IN - HOLD) / OUT);
        const e = 1 - Math.pow(1 - u, 3);
        const y = lerp(-110, 16, e);
        f.bg.setY(y);
        for (const [o, dy] of f.parts) o.setY(y + dy - 4);
        if (f.t >= T) { kill(f.bg); f.parts.forEach(([o]) => kill(o)); G.fx.splice(i, 1); }
        continue;
      }
      if (f.kind === 'stamp') {            // hanko seal: big and faint, then THUMP onto the scroll
        if (f.t < 0) continue;
        const u = Math.min(1, f.t / 0.22), sc = lerp(2.2, 0.85, u * u);
        if (f.o.setScale) f.o.setScale(sc);
        f.o.setPosition(f.x + 85 - 100 * sc, f.y + 85 - 100 * sc);
        f.o.setOpacity(80 + 175 * u);
        if (u >= 1 && !f.done) { f.done = true; sfx(f.won ? 'stamp' : 'thunk', 85); G.shake = 0.15; vibrate(40); }
        if (u >= 1) G.fx.splice(i, 1);
        continue;
      }
      if (f.kind === 'drop') {             // the title ribbon swings down
        const u = Math.min(1, f.t / 0.4), e = 1 - Math.pow(1 - u, 3);
        f.o.setY(f.y - (1 - e) * 60);
        if (f.o.setOpacity) f.o.setOpacity(255 * u);
        if (u >= 1) G.fx.splice(i, 1);
        continue;
      }
      if (f.kind === 'fade') {
        if (f.t < 0) continue;
        f.o.setOpacity(Math.min(255, 255 * f.t / 0.3));
        if (f.t >= 0.3) G.fx.splice(i, 1);
        continue;
      }
      if (f.kind === 'count') {            // koban total counts up, then a little coin shower
        if (f.t < 0) continue;
        const u = Math.min(1, f.t / 1.1), v = Math.round(f.to * (1 - Math.pow(1 - u, 2)));
        txt(f.o, '+' + v);
        f.tick -= dt;
        if (f.tick <= 0 && u < 1) { f.tick = 0.08; sfx('coin', 35, 0.1, 1 + u * 0.6); }
        if (u >= 1) {
          sfx('coin', 80, 0, 1.3);
          for (let n = 0; n < 12; n++) {
            const o = U('Koban', f.x, f.y, 137); size(o, 28, 28);
            const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.2, sp = 160 + Math.random() * 200;
            G.fx.push({ kind: 'coin', o: o, t: 0, x: f.x, y: f.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, dur: 1.1 });
          }
          G.fx.splice(i, 1);
        }
        continue;
      }
      if (f.kind === 'coin') {
        const u = f.t / f.dur;
        if (u >= 1) { kill(f.o); G.fx.splice(i, 1); continue; }
        f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 520 * dt;
        f.o.setPosition(f.x, f.y); f.o.setOpacity(255 * Math.min(1, 2 * (1 - u)));
        continue;
      }
      if (f.kind === 'verdict') {          // the WIN / LOSS stamp thumps down onto the scroll
        const u = Math.min(1, f.t / 0.3);
        if (f.o.setOpacity) f.o.setOpacity(255 * u);
        f.o.setY(f.y - (1 - u) * 30);
        if (u >= 1) { G.fx.splice(i, 1); sfx(G.state === 'won' ? 'star' : 'thunk', 70); }
        continue;
      }
      if (f.kind === 'starpop') {
        const u = Math.min(1, f.t / 0.35);
        const sc = u < 0.45 ? lerp(0.4, 1.35, u / 0.45) : lerp(1.35, 1, (u - 0.45) / 0.55);
        if (f.o.setScale) f.o.setScale(sc);
        f.o.setPosition(f.x - 42 * sc, f.y - 42 * sc);
        if (u >= 1) G.fx.splice(i, 1);
        continue;
      }
      if (f.kind === 'uiring') {
        if (f.t < 0) { f.o.setOpacity(0); continue; }
        const u = f.t / f.dur;
        if (u >= 1) { kill(f.o); G.fx.splice(i, 1); continue; }
        const sc = (f.small ? 0.5 : 0.6) + (f.small ? 0.6 : 1.1) * (1 - Math.pow(1 - u, 3));
        f.o.setScale(sc);
        f.o.setPosition(ACT_X - 80 * sc, ACT_Y - 80 * sc);
        f.o.setOpacity(255 * (1 - u));
        continue;
      }
      if (f.kind === 'spark') {
        const u = f.t / f.dur;
        if (u >= 1) { kill(f.o); G.fx.splice(i, 1); continue; }
        f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 60 * dt;
        f.o.setPosition(f.x - 14, f.y - 14);
        f.o.setOpacity(255 * (1 - u));
        if (f.o.setScale) f.o.setScale(0.6 + 0.6 * Math.sin(u * Math.PI));
        continue;
      }
      const t = f.t / 0.8;
      if (t >= 1) { kill(f.o); G.fx.splice(i, 1); continue; }
      const sc = f.s * (0.4 + 0.8 * t);
      f.o.setScale(sc);
      f.o.setPosition(f.x - 80 * sc, f.y - 80 * sc);
      f.o.setOpacity(255 * (1 - t));
    }
    // fog of war: at night, rooms nobody can see fade back into darkness
    for (let r = 0; r < ROWS; r++) for (let c = 1; c < COLS - 1; c++) {
      const cell = G.cells[r][c];
      if (!cell.fog) continue;
      const target = !cell.revealed ? 1 : (G.night && !G.revealAll && !inSight(c, r) ? 0.5 : 0);
      if (cell.fogA !== target) {
        cell.fogA += Math.sign(target - cell.fogA) * Math.min(Math.abs(target - cell.fogA), dt * 2.5);
        if (cell.fogA <= 0 && !G.night) { kill(cell.fog); cell.fog = null; } else cell.fog.setOpacity(255 * cell.fogA);
      }
    }
    // What's inside a room stays hidden until a cat discovers it. The fog itself is a see-through
    // ink wash, so the architecture shows faintly, but dogs, traps and the vault are not drawn.
    // Once discovered, a room's contents stay visible, including when it dims again at night.
    for (let r = 0; r < ROWS; r++) for (let c = 1; c < COLS - 1; c++) {
      const cell = G.cells[r][c];
      if (cell.trapObj) cell.trapObj.hide(!cell.revealed);
      // the first time you ever uncover a kind of trap, it glows and shows its name
      if (cell.trapObj && cell.revealed && cell.type === 'trap' && !G.revealAll && G.state === 'play') {
        SV.seenTraps = SV.seenTraps || {};
        if (!SV.seenTraps[cell.trap]) { SV.seenTraps[cell.trap] = true; save(); trapReveal(c, r, cell.trap); }
      }
    }
    for (const sl of G.side) if (!sl.taken) sl.obj.hide(!G.cells[sl.r][sl.c].revealed);
    for (const h of G.hides) h.hide.obj.hide(!h.revealed);
    const vcell = G.cells[G.vault.r][G.vault.c];
    G.vault.obj.hide(!vcell.revealed); G.vault.label.hide(!vcell.revealed);
    const dogSeen = (c, r) => c >= 1 && c <= COLS - 2 && G.cells[r][c].revealed;
    for (const d of G.dogs) {
      const vis = dogSeen(d.c, d.r) || (d.moving && dogSeen(d.tc, d.r));
      d.obj.hide(!vis);
      d.seen = vis;
    }
    // dog noise meters (only for dogs you can see)
    for (const d of G.dogs) {
      if (!d.meterObj) continue;
      const vis = d.seen && d.state === 'sleep' && d.meter > wakeAt(d) * 0.12;
      d.meterObj.hide(!vis);
      if (vis) {
        const lvl = Math.min(4, 1 + Math.floor((d.meter / wakeAt(d)) * 4));
        anim(d.meterObj, 'm' + lvl);
        const p = gXY(d, d.c, d.r), sam = d.kind !== 'dog';
        d.meterObj.setPosition(p.x + (sam ? 56 : 60), p.y - (sam ? 0 : 16) - (lvl === 4 ? Math.abs(Math.sin(G.t * 12)) * 3 : 0));
      }
    }
    for (const side of ['L', 'R']) for (let r = 0; r < ROWS; r++) {
      const s = G.shutters[side][r];
      const bx = (side === 'L' ? cx(1) : cx(COLS - 1)) - 15;
      if (s.shake > 0) { s.shake -= dt; s.obj.setX(bx + Math.sin(G.t * 70) * 3); } else s.obj.setX(bx);
    }
    // camera shake when a shutter slams
    if (G.shake > 0) {
      G.shake -= dt;
      const m = Math.max(0, G.shake) / 0.35 * 7;
      try { const L = S.getLayer(''); L.setCameraX(800 + (Math.random() - 0.5) * m); L.setCameraY(450 + (Math.random() - 0.5) * m); } catch (e) { }
      if (G.shake <= 0) { try { const L = S.getLayer(''); L.setCameraX(800); L.setCameraY(450); } catch (e) { } }
    }
  }

  function openShutters() { let n = 0; for (const side of ['L', 'R']) G.shutters[side].forEach((s) => { if (s.open) n++; }); return n; }

  function checkEnd() {
    if (G.state !== 'play') return;
    if (G.mode === 'tutorial' && G.cats[0].caught) { lose('Kuro was caught!'); return; }
    if (G.pendingLose) { lose(G.pendingLose); return; }
    if (G.cats.every((k) => k.caught)) { lose(G.mode === 'endless' && G.cats.some((k) => k.out) ? 'Every cat left in the run was caught...' : G.tw === 'sick' ? 'Every cat on the job was caught...' : 'All five cats were caught...'); return; }
    const mike = G.cats.find((k) => k.id === 'mike');
    if (openShutters() === 0) {
      // Mike can still pry a shutter open, even if he hasn't been sent in yet (he drops onto a balcony next to one)
      if (mike && !mike.caught) {
        if (!G.allShutWarned) { G.allShutWarned = true; say('Every shutter is shut! Only Mike can pry one open - ' + (mike.deployed ? 'get him to a balcony and press Space.' : 'send him in (press ' + (mike.i + 1) + '), then press Space on the balcony.'), 'alert'); }
      } else lose(mike ? 'Every shutter is shut, and Mike has been caught. There is no way in or out...' : 'Every shutter is shut. There is no way in or out...');
    } else G.allShutWarned = false;
  }

  function rollTreasure(league) {
    // higher leagues flatten the weights, so rare treasures turn up more often
    const w = TREASURES.map((t) => Math.pow(t.w, 1 / league));
    let x = Math.random() * w.reduce((a, b) => a + b, 0);
    for (let i = 0; i < TREASURES.length; i++) { x -= w[i]; if (x <= 0) return TREASURES[i]; }
    return TREASURES[0];
  }

  function win(k) {
    if (G.state !== 'play') return;          // only ever end a heist once
    G.state = 'won'; G.endT = 0;
    sfx('win', 90);
    const caught = G.cats.filter((q) => q.caught).length;
    const perfect = G.alarm === 0 && caught === 0;
    const res = { won: true, winner: k, sub: endSub(), rows: [], notes: [] };
    if (G.mode === 'tutorial') {
      const first = !SV.tutorialDone;
      SV.tutorialDone = true;
      if (first) { SV.koban += TUT_PAY; SV.totalKoban += TUT_PAY; }
      save();
      tutorialEnd();
      res.title = 'TRAINING COMPLETE!';
      if (first) { res.rows.push(['Training reward', '+' + TUT_PAY]); res.total = TUT_PAY; }
      res.info = 'Next, try a real heist from the menu. Meow to lure dogs (action button), buy gadgets in the Cat Shop, and win heists to face the boss.';
      showEnd(res);
      return;
    }
    if (G.practice) {
      res.title = 'PRACTICE COMPLETE';
      res.info = 'This was your own manor, so there are no rewards. Tweak it in the editor and try again!';
      showEnd(res);
      return;
    }
    const LG = G.LG, L = LG.n;
    let koban = (120 + Math.max(0, 60 - G.alarm * 15) + (5 - caught) * 15 + (G.t < 90 ? 40 : G.t < 150 ? 20 : 0)) * PAY_SCALE;
    const rows = res.rows;
    rows.push(['Heist pay', '' + Math.round(koban)]);
    if (LG.koban !== 1) { koban *= LG.koban; rows.push([LG.name, '×' + LG.koban]); }
    if (G.night) { koban *= NIGHT_PAY; rows.push(['Dark night', '×' + NIGHT_PAY]); }
    let rarity = G.mode === 'endless' ? Math.min(NL + 1, 1 + Math.floor(G.run.round / 2)) : L;
    res.title = 'HEIST COMPLETE!';
    if (G.mode === 'daily' && !dailyDone()) {
      koban *= DAILY_PAY; rows.push(['Daily heist', '×' + DAILY_PAY]); rarity = L + 1;
      SV.daily = { date: todayStr(), won: true };
      const n = dailyStreak() + 1;
      SV.dailyStreak = { day: dayNum(), n: n };
      const m = Math.round((1 + STREAK_STEP * (Math.min(n, STREAK_MAX + 1) - 1)) * 10) / 10;
      if (m > 1) { koban *= m; rows.push(['Daily streak', '×' + m]); }
      res.notes.push('Today\'s twist beaten: ' + G.twist.name + '! Daily streak: ' + n + (n === 1 ? ' day' : ' days') + '. Come back tomorrow for a new twist' + (n <= STREAK_MAX ? ' and a bigger streak bonus.' : '.'));
    } else if (G.mode === 'daily') {
      koban *= DAILY_REPLAY_PAY; rows.push(['Daily replay', '×1/3']);      // replays of today's manor pay a third
    }
    if (G.mode === 'boss') {
      const first = !SV.bossBeaten[L - 1];
      rarity = L + 1;
      // the bonus is paid once, for the first time you defeat each boss; rematches pay a normal heist
      if (first) { koban = koban * 2 + 200 * PAY_SCALE; rows.push(['Boss defeated bonus', '×2 +' + 200 * PAY_SCALE]); }
      SV.bossBeaten[L - 1] = true;
      if (first && L === NL) G.firstFinal = true;
      res.title = 'BOSS DEFEATED!';
      if (first && L < NL) {
        SV.maxLeague = Math.max(SV.maxLeague, L + 1); SV.league = L + 1;
        res.notes.push('NEW LEAGUE UNLOCKED: the ' + LEAGUES[L].name + '! ' + LEAGUES[L].intro);
        later(1.6, () => sfx('league', 90));
      } else if (first && L === NL) {
        res.notes.push('The Emperor\'s treasure is yours. You are the greatest cat burglars in Japan! NEW PLAY OPTION: Endless Heist, on the main menu.');
        later(1.6, () => sfx('league', 90));
      }
    }
    if (teamHas('kin')) { const m = up('kin') ? 2 : 1.5; koban *= m; rows.push(['Kin\'s luck', '×' + m]); }
    koban = Math.round(koban);
    if (G.sideGot) { koban += G.sideGot; rows.push(['Side loot', '+' + G.sideGot]); }
    res.total = koban;
    if (G.mode === 'endless') {
      const run = G.run;
      const newly = G.cats.filter((q) => q.caught && !q.out).length;
      G.cats.forEach((q) => { if (q.caught && !run.out.includes(q.id)) run.out.push(q.id); });
      run.koban += koban; res.cleared = run.round; run.round++;
      if (!SV.endlessBest || res.cleared > SV.endlessBest) { SV.endlessBest = res.cleared; res.newBest = true; }
      res.title = 'MANOR ' + res.cleared + ' CLEARED!';
      res.notes.push((res.newBest ? 'New best streak: ' + res.cleared + ' manors!' : 'Streak: ' + res.cleared + ' manors (best ' + SV.endlessBest + ').') + ' ' +
        (newly ? 'Caught cats stay caged for the rest of the run.' : run.out.length ? 'Nobody new was caught.' : 'Nobody caught yet - keep it that way!') +
        ' Next: manor ' + run.round + ', even tougher.');
    }
    const tr = rollTreasure(rarity);
    res.treasure = tr; res.isNew = !SV.treasures[tr.id];
    SV.treasures[tr.id] = (SV.treasures[tr.id] || 0) + 1;
    SV.koban += koban; SV.totalKoban += koban; SV.wins++; SV.caught += caught;
    if (G.mode !== 'endless') SV.leagueWins[L - 1]++;
    if (!SV.bestTime || G.t < SV.bestTime) { if (SV.bestTime) res.best = true; SV.bestTime = G.t; }
    if (!res.notes.length && !SV.bossBeaten[L - 1] && G.mode !== 'endless') {
      const st = SV.leagueWins[L - 1];
      if (st === LG.winsForBoss && G.mode !== 'boss') res.bossOpened = LG.boss.name;
      res.progress = [Math.min(st, LG.winsForBoss), LG.winsForBoss];
      res.notes.push(st >= LG.winsForBoss ? 'The boss manor is open! Challenge it from the league card on the menu.'
                                          : 'Wins toward the boss: ' + st + ' / ' + LG.winsForBoss);
    }
    const ach = [];
    unlockAch('first', ach);
    if (G.alarm === 0) unlockAch('silent', ach);
    if (caught === 0) unlockAch('flawless', ach);
    if (G.t < 60) unlockAch('speed', ach);
    if (perfect) { unlockAch('perfect', ach); stat('perfect'); res.perfect = true; }
    if (G.night) stat('nightWins');
    if (G.mode === 'daily') stat('dailyWins');
    if (G.mode === 'boss') stat('bossWins');
    if (!SV.stats.mostKoban || koban > SV.stats.mostKoban) SV.stats.mostKoban = koban;
    if (G.mode === 'daily') unlockAch('daily', ach);
    checkMetaAch(ach);
    save();
    res.ach = ach;
    showEnd(res);
  }

  function lose(why) {
    if (G.state !== 'play') return;
    G.state = 'lost'; G.endT = 0;
    sfx('lose', 90);
    if (!G.practice) { SV.caught += G.cats.filter((q) => q.caught).length; stat('losses'); save(); }
    const res = { won: false, why: why, sub: endSub(), rows: [], notes: [] };
    res.title = G.mode === 'tutorial' ? 'CAUGHT IN TRAINING' : G.mode === 'boss' ? 'THE BOSS WINS THIS TIME' : 'THE HEIST FAILED';
    const shut = /shutter/i.test(why);
    res.tip = G.mode === 'tutorial' ? 'Watch the bubbles over sleeping dogs. When one turns red, stop and let the noise fade before moving on.'
      : shut ? (teamHas('mike') ? 'Mike can pry shut shutters open, so keep him safe - he is your way out. Move slowly, let noise fade, and hide when a dog wakes.'
                                 : 'Bring Mike on your team: he can pry shut shutters open, so all the shutters closing is no longer the end. Move slowly and let noise fade.')
      : G.mode === 'endless' ? 'Each manor is tougher than the last, and caught cats stay caged. A smoke bomb or Momo can save a cat before it is lost for the run.'
      : G.mode === 'boss' ? 'Boss vaults need TWO cats cracking at once, and patrol dogs never sleep. Time your moves between their steps.'
      : 'A woken dog hunts its whole floor: jump to another floor or hide in a wardrobe. Tora can hiss a dog back to sleep, and a smoke bomb saves one capture.';
    res.info = G.mode === 'tutorial' ? 'No harm done - it was only practice. Try the training heist again.'
      : G.practice ? 'Your own manor is tough! Try again, or tweak it in the editor.'
      : G.mode === 'endless' ? 'You cleared ' + (G.run.round - 1) + ' manors (best ' + (SV.endlessBest || 0) + '). Everything you earned is yours to keep.'
      : 'No loot this time, but nothing is lost: your koban, treasures and progress are safe.';
    if (G.mode === 'endless') { res.title = 'THE RUN IS OVER'; res.runTotal = G.run.koban; res.runCleared = G.run.round - 1; endEndless(); }
    if (!G.practice && G.mode !== 'tutorial' && G.mode !== 'boss' && G.mode !== 'endless' && !SV.bossBeaten[G.league - 1]) {
      const st = SV.leagueWins[G.league - 1];
      res.progress = [Math.min(st, G.LG.winsForBoss), G.LG.winsForBoss];
    }
    showEnd(res);
  }

  function endSub() {
    if (G.mode === 'tutorial') return 'Training heist';
    if (G.practice) return 'Your own manor  -  slot ' + ((G.slot || 0) + 1);
    if (G.mode === 'boss') return 'Boss manor: ' + G.LG.boss.name;
    if (G.mode === 'endless') return 'Endless Heist  -  manor ' + G.round + '  -  ' + G.LG.place + (G.night ? '  -  dark night' : '');
    if (G.mode === 'daily') return 'Daily heist: ' + G.twist.name + '  -  ' + G.LG.name;      // the twist matters more than the place
    return G.LG.name + '  -  ' + G.LG.place + (G.night ? '  -  dark night' : '');
  }
  const mmss = (t) => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');

  function backToEditor() { if (!G.grid) { go('menu'); return; } go('builder', { slot: G.slot, grid: G.grid.slice(), league: G.league, msg: 'Back to editing slot ' + ((G.slot || 0) + 1) + '.' }); }

  // Results screen: ribbon title, hanko stamp, the crew (cats that got away / cats in cages), stats, then rewards or what went wrong.
  function showEnd(res) {
    tension(false);
    G.revealAll = true;                     // lift the fog so you can see where everything was hiding
    G.cells.forEach((row) => row.forEach((c) => { c.revealed = true; }));
    kill(G.menuBtn.b); kill(G.menuBtn.t);
    if (G.editBtn) { kill(G.editBtn.b); kill(G.editBtn.t); }
    BTNS = [];
    const won = res.won;
    const d = U('Dim', 0, 0, 90); size(d, 1600, 900); d.setOpacity(won ? 130 : 170);
    if (!won && d.setColor) d.setColor('150;150;190');
    panel(260, 96, 1080, 704);
    // title ribbon + subtitle
    const rb = U('Ribbon', 480, 104, 120); anim(rb, won ? 'win' : 'loss');
    const tt = label(res.title, 800, 120, 34, CREAM, 'center'); tt.setZOrder(121);
    G.fx.push({ kind: 'drop', o: rb, t: 0, y: 104, delay: 0 }, { kind: 'drop', o: tt, t: 0, y: 120, delay: 0 });
    label(res.sub, 800, 196, 18, '120;70;50', 'center', 860);
    // hanko stamp thumps down
    const st = U('Stamp', 1112, 112, 140); anim(st, won ? 'win' : 'loss'); st.setOpacity(0);
    if (st.setAngle) st.setAngle(won ? -12 : 9);
    G.fx.push({ kind: 'stamp', o: st, t: -0.45, x: 1112, y: 112, won: won });
    // the crew
    const crew = G.endCrew = [];
    G.cats.forEach((k, i) => {
      const x = 800 + (i - 2) * 124 - 55, y = 322 - 83;
      const o = U('Cat', x, y, 130); o.setScale(1.3);
      const free = !k.caught;
      anim(o, k.id + (free ? (won && k === res.winner ? '_jump' : won ? '_idle' : '_startle') : '_struggle'));
      o.flipX(i >= 3);
      if (!k.deployed && free) o.setOpacity(150);
      const h = wearHat(k.id, o, 1.3); if (h) { h.setLayer('UI'); h.setZOrder(131); }
      const c = { o: o, hat: h, k: k, x: x, y: y, face: i >= 3 ? -1 : 1, t: Math.random() * 3, hop: won && free ? i * 0.25 : -1 };
      if (k.caught) { const cg = U('Cage', x + 20, y + 14, 132); size(cg, 72, 72); }
      if (won && k === res.winner) { c.loot = U('Loot', x + 38, y - 22, 133); size(c.loot, 34, 31); }
      label(k.name, x + 55, 326, 16, k.caught ? '170;60;40' : INK, 'center');
      crew.push(c);
    });
    // stats chips
    const caughtN = G.cats.filter((q) => q.caught).length;
    const chip = (x, sprite, an, text, col) => {
      const ic = U(sprite, x, 356, 130); if (an) anim(ic, an); size(ic, 40, 40);
      label(text, x + 48, 364, 21, col || INK);
    };
    chip(440, 'ResultIcon', 'time', mmss(G.t) + (res.best ? '  best!' : ''), res.best ? '60;130;60' : null);
    chip(650, 'ResultIcon', 'alarm', G.alarm + (G.alarm === 1 ? ' alarm' : ' alarms'), G.alarm ? '170;60;40' : '60;130;60');
    chip(860, 'Cage', null, caughtN + ' caught', caughtN ? '170;60;40' : '60;130;60');
    chip(1050, 'Koban', null, G.sideGot && won ? '+' + G.sideGot + ' side loot' : 'no side loot', null);
    if (res.perfect) { const pf = label('PERFECT HEIST - no alarms, nobody caught!', 800, 404, 18, '200;120;30', 'center'); pf.setOpacity(0); G.fx.push({ kind: 'fade', o: pf, t: -1.2 }); }
    if (won) {
      // reward breakdown
      if (res.rows.length) {
        label('Rewards', 330, 432, 22, '170;60;40');
        res.rows.forEach((r, i) => {
          const y = 464 + i * 25;
          label(r[0], 330, y, 18, INK);
          const v = label(r[1], 0, y, 18, INK); v.setX(740 - (v.getWidth() || r[1].length * 10));
        });
      } else label(res.info || '', 330, 440, 19, INK, null, 440);
      if (res.total != null) {
        const ty = 432;
        label('Total', 860, ty, 22, '170;60;40');
        U('Koban', 860, ty + 32, 130);
        const tot = label('+0', 918, ty + 34, 40, '60;120;60');
        G.fx.push({ kind: 'count', o: tot, t: -0.7, to: res.total, tick: 0, x: 880, y: ty + 56 });
      }
      if (res.treasure) {
        const tx = 1086, ty = 432;
        const sl = U('Slot', tx, ty, 130); anim(sl, res.isNew ? 'selected' : 'normal');
        const ic = U('Treasure', tx + 10, ty + 10, 131); anim(ic, res.treasure.id);
        label(res.treasure.name, tx + 58, ty + 122, 17, INK, 'center');
        [sl, ic].forEach((o) => { o.setOpacity(0); G.fx.push({ kind: 'fade', o: o, t: -1.4 }); });
        later(1.5, () => { for (let i = 0; i < 10; i++) uiSparkle(tx + 58, ty + 58); sfx('loot', 70); });
        if (res.isNew) { const nw = label('NEW!', tx + 92, ty - 12, 22, '200;48;36'); if (nw.setAngle) nw.setAngle(14); nw.setOpacity(0); G.fx.push({ kind: 'fade', o: nw, t: -1.7 }); }
      }
      if (res.info && res.rows.length) label(res.info, 860, 520, 17, INK, null, 210);
    } else {
      label('What happened', 330, 432, 22, '170;60;40');
      label(res.why, 330, 462, 24, '150;40;30', null, 470);
      label('Tip: ' + res.tip, 330, 530, 18, INK, null, 470);
      if (res.runTotal != null) {
        // an Endless run's haul: one koban drops onto the pile per manor cleared, then the total settles in (no count-up)
        const ty = 432, n = Math.min(12, res.runCleared);
        label('Run haul', 860, ty, 22, '170;60;40');
        for (let i = 0; i < n; i++) {
          const x = 866 + i * 30, y = ty + 34 + (i % 2) * 6;
          later(0.6 + i * 0.12, () => {
            const c = U('Koban', x, y - 50, 130 + i); size(c, 40, 40);
            (scr.fx = scr.fx || []).push({ kind: 'drop', o: c, t: 0, dur: 0.6, y0: y - 50, y1: y });
            sfx('coin', 55, 0.05, 1 + i * 0.04);
          });
        }
        const tot = label(res.runTotal ? res.runTotal + ' koban' : 'Nothing banked', 860, ty + 88, 34, res.runTotal ? '60;120;60' : '150;40;30');
        tot.setOpacity(0); G.fx.push({ kind: 'fade', o: tot, t: -(0.9 + n * 0.12) });
        if (res.runTotal) later(1.0 + n * 0.12, () => { for (let i = 0; i < 8; i++) uiSparkle(900 + Math.random() * 160, ty + 104); sfx('loot', 60); });
        label(res.info, 860, 572, 17, INK, null, 420);
      } else label(res.info, 860, 432, 18, INK, null, 420);
    }
    // boss progress bar
    if (res.progress) {
      const [n, need] = res.progress, bx = 860, by = won ? 600 : 584, bw = 330;
      label('Wins toward the boss', bx, by - 28, 17, '170;60;40');
      const tr = U('Slider', bx, by, 130); anim(tr, 'track'); size(tr, bw, 26);
      if (n > 0) { const fl = U('Slider', bx, by, 131); anim(fl, 'fill'); size(fl, 9 + (bw - 18) * n / need, 26); }
      label(n + ' / ' + need, bx + bw + 10, by + 2, 18, INK);
      res.notes = res.notes.filter((t) => !/^Wins toward the boss/.test(t));
    }
    if (res.notes.length) label(res.notes.join('\n'), 800, 636, 18, '170;60;40', 'center', 960);
    let tq = 0;
    if (res.bossOpened) { later(1.1, () => { bannerToast('Boss manor unlocked!', res.bossOpened, 'Challenge it from the league card on the menu.'); sfx('league', 80); }); tq = 1; }
    (res.ach || []).forEach((nm, i) => later(1.1 + (i + tq) * 3.0, () => achToast(nm)));
    // buttons
    const again = () => go('heist', G.mode === 'practice' ? { grid: G.grid, slot: G.slot, league: G.league } : G.mode === 'tutorial' ? { tutorial: true }
      : G.mode === 'boss' ? { boss: true, league: G.league } : G.mode === 'daily' ? { daily: true } : { league: G.league });
    const BY = 690;
    if (G.mode === 'tutorial') {
      button(won ? 'Train again' : 'Try again', 420, BY, 340, 72, again);
      button('Menu', 840, BY, 340, 72, () => go('menu'));
    } else if (G.mode === 'boss' && G.league === NL && won && G.firstFinal) {
      button('Epilogue', 630, BY, 340, 72, () => go('ending'));     // the only way on: the ending screen leads back to the menu
    } else if (G.mode === 'endless') {
      if (won) {
        button('Next manor', 420, BY, 340, 72, () => go('heist', { endless: true }));
        button('End run', 840, BY, 340, 72, () => { endEndless(); go('menu'); });
      } else {
        button('New run', 420, BY, 340, 72, startEndless);
        button('Menu', 840, BY, 340, 72, () => go('menu'));
      }
    } else if (G.practice) {
      button('Play again', 330, BY, 290, 72, again);
      button('Edit manor', 655, BY, 290, 72, backToEditor);
      button('Menu', 980, BY, 290, 72, () => go('menu'));
    } else {
      button(!won ? 'Try again' : G.mode === 'normal' ? 'Next manor' : 'Play again', 420, BY, 340, 72, again);
      button('Menu', 840, BY, 340, 72, () => go('menu'));
    }
    scr.focus = 0;
  }
  function uiSparkle(x, y) {
    const o = U('Sparkle', x, y, 136);
    const a = Math.random() * 6.28, sp = 60 + Math.random() * 120;
    G.fx.push({ kind: 'spark', o: o, t: 0, x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40, dur: 0.9 });
  }
  function updateEndCrew(dt) {
    for (const c of G.endCrew || []) {
      c.t += dt;
      let y = c.y;
      if (c.hop >= 0 && !c.k.caught) {             // the free cats bounce for joy, one after another
        const ph = (c.t + c.hop) % 2.2;
        if (ph < 0.45) y -= Math.sin(Math.PI * ph / 0.45) * 22;
      }
      c.o.setY(y);
      if (c.loot) c.loot.setY(y - 22 + Math.sin(c.t * 4) * 2);
      if (c.hat) syncHat(c.hat, c.o, c.face);
    }
  }

  function updateHud(dt) {
    const ui = G.ui;
    for (let i = 0; i < 5; i++) {
      const k = G.cats[i];
      ui.caught[i].hide(!k.caught);
      ui.portraits[i].setOpacity(G.mode === 'tutorial' && i && !tutMikeAllowed(k) ? 70 : k.caught ? 150 : k.deployed ? 255 : 210);
    }
    if (G.selected >= 0 && G.state === 'play') { ui.ring.hide(false); ui.ring.setPosition(16 + G.selected * 104 - 8, -4); }
    else ui.ring.hide(true);
    // every shutter shut: point at Mike's portrait (he's the only one who can pry one open)
    const mike = G.cats.find((q) => q.id === 'mike');
    const needMike = G.state === 'play' && mike && !mike.caught && openShutters() === 0 && G.selected !== mike.i;   // hidden once you've picked him
    if (needMike && !ui.mikeMark) {
      ui.mikeMark = { ring: U('PortraitRing', 0, 0, 13), ptr: U('Pointer', 0, 0, 14) };
      if (ui.mikeMark.ring.setColor) ui.mikeMark.ring.setColor('255;160;60');
      if (ui.mikeMark.ptr.setAngle) ui.mikeMark.ptr.setAngle(180);
    }
    if (ui.mikeMark) {
      ui.mikeMark.ring.hide(!needMike); ui.mikeMark.ptr.hide(!needMike);
      if (needMike) {
        const t = G.t, x = 16 + mike.i * 104;
        ui.mikeMark.ring.setPosition(x - 8, -4);
        ui.mikeMark.ring.setOpacity(150 + 105 * Math.abs(Math.sin(t * 4)));
        const bob = Math.abs(Math.sin(t * 5)) * 10;
        if (mike.deployed && mike.obj) {           // he's in the manor: point down at Mike himself
          if (ui.mikeMark.ptr.setAngle) ui.mikeMark.ptr.setAngle(0);
          ui.mikeMark.ptr.setPosition(mike.obj.getX() + CAT_W / 2 - 28, mike.obj.getY() - 70 - bob);
        } else {                                   // not sent in yet: point up at his portrait
          if (ui.mikeMark.ptr.setAngle) ui.mikeMark.ptr.setAngle(180);
          ui.mikeMark.ptr.setPosition(x + 50 - 28, 104 + bob);
        }
      }
    }
    // every shutter shut and Mike selected next to one: point at the shutter he can pry open
    const pry = G.state === 'play' && openShutters() === 0 && mike && !mike.caught && mike.deployed && !mike.moving && !mike.hidden && G.selected === mike.i ? adjacentClosedShutter(mike) : null;
    if (pry && !ui.pryMark) ui.pryMark = M('PryGlow', 0, 0, 84);      // a pulsing halo framing the shutter, just behind it
    if (ui.pryMark) {
      ui.pryMark.hide(!pry);
      if (pry) { ui.pryMark.setPosition(pry.obj.getX() - 24, pry.obj.getY() - 24); ui.pryMark.setOpacity(120 + 135 * Math.abs(Math.sin(G.t * 3.5))); }
    }
    const tag = { boss: 'BOSS', daily: 'Daily', practice: 'Practice', tutorial: 'Training', normal: G.LG.short, endless: 'Endless ' + G.round }[G.mode] + (G.night ? ' - Night' : '');
    txt(ui.hud, tag + '\nShutters ' + openShutters() + '/10\nAlarms ' + G.alarm);
    const awake = G.dogs.some((d) => !d.patrol && d.state !== 'sleep');
    anim(ui.lantern, awake ? 'alert' : 'calm');
    tensionTo(G.state !== 'play' ? 0 : awake ? 60 : G.dogs.some((d) => d.patrol) ? 22 : 0, dt);
    G.msgT += dt;
    const show = G.state === 'play' && !!G.msg;
    const K = MSG_KINDS[G.msgKind] || MSG_KINDS.info;
    txt(ui.info, show ? G.msg : '');
    ui.msgBox.hide(!show); ui.msgIcon.hide(!show);
    if (show) {
      if (ui.info.setColor && ui.info.lastCol !== K.col) { ui.info.setColor(K.col); ui.info.lastCol = K.col; }
      anim(ui.msgIcon, K.icon);
      // new message: text slides in, the icon pops and the frame flashes the message's colour
      const u = Math.min(1, G.msgT / 0.22);
      const h = ui.info.getHeight ? ui.info.getHeight() : 24;
      ui.info.setY(8 + 46 - Math.min(h, 76) / 2 + (1 - u) * 10);
      const fade = G.msgT > 7 ? Math.max(110, 255 - (G.msgT - 7) * 200) : 255;
      ui.info.setOpacity(fade * u);
      const pop = G.msgT < 0.3 ? 1 + 0.35 * Math.sin(Math.PI * G.msgT / 0.3) : 1;
      if (ui.msgIcon.setScale) ui.msgIcon.setScale(pop);
      ui.msgIcon.setPosition(596 - 24 * pop, 54 - 24 * pop);
      ui.msgIcon.setOpacity(G.msgT > 7 ? 150 : 255);
      if (ui.msgBox.setColor) {
        const f = Math.max(0, 1 - G.msgT / 0.6), c = K.tint.split(';').map((v) => Math.round(255 + (v - 255) * f));
        ui.msgBox.setColor(c.join(';'));
      }
    }
    const k = G.cats[G.selected];
    let can = 110;
    if (k && active(k) && !k.moving) {
      if ((k.c === G.vault.c && k.r === G.vault.r && !G.vault.open) || (k.id === 'mike' && adjacentClosedShutter(k))) can = 255;
      else if (k.lureCd <= 0) can = 175;
    }
    ui.action.setOpacity(G.btnFx && G.btnFx.ok ? 255 : can);
    updateActionFx(dt);
    if (k && active(k) && G.state === 'play') {
      G.selector.hide(false);
      const p = catXY(k, k.c, k.r);
      const hideSpot = k.hidden && G.cells[k.r][k.c].hide;
      if (hideSpot) G.selector.setPosition(cx(k.c) + (hideSpot.kind === 'tansu' ? 33 : 44) - 48, p.y + CAT_H - 18);   // round the wardrobe / screen
      else G.selector.setPosition(k.obj.getX() + CAT_W / 2 - 48, (k.moving ? lerp(k.from.y, k.to.y, Math.min(1, k.mt / k.mdur)) : p.y) + CAT_H - 18);
    } else G.selector.hide(true);
    const blink = G.deploying >= 0 && Math.floor(G.t * 3) % 2 === 0;
    G.paws.forEach((p) => p.hide(!blink));
  }

  function heistUpdate(ev, dt) {
    if (G.state !== 'play') {
      G.endT += dt;
      updateFx(dt);
      updateEndCrew(dt);
      if (ev.dir === 'L' || ev.dir === 'R') scr.focus = ((scr.focus || 0) + (ev.dir === 'R' ? 1 : BTNS.length - 1)) % BTNS.length;
      BTNS.forEach((B, i) => { if (B.b.setColor) B.b.setColor(i === scr.focus ? '255;215;170' : '255;255;255'); });
      if (G.endT > 0.8 && (ev.enter || ev.act)) BTNS[scr.focus || 0].fn();
      return;
    }
    if (G.intro) { updateIntro(dt); if (G.intro) { updateHud(dt); return; } }   // doors still opening: no input yet
    G.t += dt;
    if (ev.num >= 0) selectCat(ev.num);
    if (ev.tab) cycleCat();
    if (ev.dir) {
      if (G.deploying >= 0) { if (ev.dir === 'L' || ev.dir === 'R') deploy(G.deploying, ev.dir === 'L' || G.mode === 'tutorial' ? 0 : COLS - 1, ROWS - 1); }
      else if (G.selected >= 0) {
        const k = G.cats[G.selected];
        // still walking or jumping? remember the move and do it the moment this one finishes
        if (k && active(k) && k.moving) G.moveBuf = { dir: ev.dir, i: G.selected, t: G.t };
        else tryMove(k, ev.dir);
      }
      else say('Pick a cat first: press 1-5 or tap a portrait.');
    }
    if (ev.act) doAction();
    if (ev.fish) useGadget('fish');
    if (ev.rope) useGadget('rope');
    updateCats(dt);
    if (G.moveBuf) {                      // buffered move: run it as soon as the cat lands (kept for 0.2 seconds)
      const b = G.moveBuf, k = G.cats[b.i];
      if (G.t - b.t > 0.2 || b.i !== G.selected || !active(k) || k.stuck > 0) G.moveBuf = null;
      else if (!k.moving) { G.moveBuf = null; tryMove(k, b.dir); }
    }
    updateDogs(dt);
    if (screen !== 'heist' || !G) return;
    updateLanterns(dt);
    updateOwls(dt);
    if (G.tut) tutorialUpdate(dt);
    updateVault(dt);
    updateFx(dt);
    checkEnd();
    if (screen === 'heist' && G) updateHud(dt);
  }

  // ================================================================= main loop
  function update() {
    const dt = Math.min(0.05, (S.getElapsedTime ? S.getElapsedTime() : S.getTimeManager().getElapsedTime()) / 1000);
    SV.playTime += dt;
    const ev = readInput();
    if (ev.any) startMusic();
    if (scr.codeOpen) { ev.mute = false; ev.dir = null; if (ev.esc) { closeCodeBox(); ev.esc = false; } }
    if (ev.mute) toggleMute();
    if (ev.esc && screen === 'heist' && G && G.mode === 'practice') { backToEditor(); return; }
    if (ev.esc && screen === 'heist' && G && G.mode === 'endless') { leaveHeist(); return; }
    if (ev.esc && screen !== 'menu') { go('menu'); return; }
    if (ev.tap) {
      if (inside(ev.tap, 10, 820, 72, 74) && scr.soundBtn) { toggleMute(); ev.tap = null; }
    }
    if (ev.tap) {
      const B = BTNS.find((b) => inside(ev.tap, b.x, b.y, b.w, b.h) && (!scr.codeOpen || (scr.codeObjs && scr.codeObjs.includes(b)))
                                  && (!scr.modal || scr.modal.includes(b)));
      if (B) {
        if (!(screen === 'heist' && G && G.state !== 'play' && G.endT < 0.8)) { sfx('select', 45, 0, 1.2); B.fn(); }
        return;
      }
      if (SCREENS[screen].tap) SCREENS[screen].tap(ev.tap);
      if (!SCREENS[screen]) return;
    }
    if (screen && SCREENS[screen].update) SCREENS[screen].update(ev, dt);
    updatePressed(ev);
    updateAmbient(dt);
    updateScreenFx(dt);
    // hover highlight for mouse users
    if (screen !== 'menu' && !(screen === 'heist' && G && G.state !== 'play')) {
      const h = { x: ev.mx, y: ev.my };
      BTNS.forEach((B) => { if (B.b.setColor && !B.on) B.b.setColor(inside(h, B.x, B.y, B.w, B.h) ? '255;225;190' : '255;255;255'); });
    }
  }

  applyMute();
  go('menu');
  return { update: update, debug: () => ({ G: G, SV: SV, screen: screen, scr: scr, BTNS: BTNS, arrive: arrive, makeNoise: makeNoise, ninjaPath: ninjaPath, tryMove: tryMove, wakeDog: wakeDog, encodeLayout: encodeLayout, decodeLayout: decodeLayout, endlessLG: endlessLG }), go: go };
})(runtimeScene);
runtimeScene.__neko.update();

};
gdjs.ManorCode.eventsList0 = function(runtimeScene) {

{


gdjs.ManorCode.userFunc0x9a5b00(runtimeScene);

}


};

gdjs.ManorCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.ManorCode.GDBackgroundObjects1.length = 0;
gdjs.ManorCode.GDRoomObjects1.length = 0;
gdjs.ManorCode.GDBalconyObjects1.length = 0;
gdjs.ManorCode.GDRailObjects1.length = 0;
gdjs.ManorCode.GDRoofObjects1.length = 0;
gdjs.ManorCode.GDFoundationObjects1.length = 0;
gdjs.ManorCode.GDCloudObjects1.length = 0;
gdjs.ManorCode.GDParticleObjects1.length = 0;
gdjs.ManorCode.GDEmoteObjects1.length = 0;
gdjs.ManorCode.GDDogMeterObjects1.length = 0;
gdjs.ManorCode.GDStarObjects1.length = 0;
gdjs.ManorCode.GDSparkleObjects1.length = 0;
gdjs.ManorCode.GDShojiObjects1.length = 0;
gdjs.ManorCode.GDHideObjects1.length = 0;
gdjs.ManorCode.GDOwlObjects1.length = 0;
gdjs.ManorCode.GDGazeObjects1.length = 0;
gdjs.ManorCode.GDSamuraiObjects1.length = 0;
gdjs.ManorCode.GDNinjaObjects1.length = 0;
gdjs.ManorCode.GDKomainuObjects1.length = 0;
gdjs.ManorCode.GDSideLootObjects1.length = 0;
gdjs.ManorCode.GDFishObjects1.length = 0;
gdjs.ManorCode.GDGadgetObjects1.length = 0;
gdjs.ManorCode.GDPointerObjects1.length = 0;
gdjs.ManorCode.GDBossPortraitObjects1.length = 0;
gdjs.ManorCode.GDHatIconObjects1.length = 0;
gdjs.ManorCode.GDCatHatObjects1.length = 0;
gdjs.ManorCode.GDPoofObjects1.length = 0;
gdjs.ManorCode.GDSmokePuffObjects1.length = 0;
gdjs.ManorCode.GDCrestObjects1.length = 0;
gdjs.ManorCode.GDShutterObjects1.length = 0;
gdjs.ManorCode.GDFogObjects1.length = 0;
gdjs.ManorCode.GDVaultObjects1.length = 0;
gdjs.ManorCode.GDTrapObjects1.length = 0;
gdjs.ManorCode.GDDogObjects1.length = 0;
gdjs.ManorCode.GDCatObjects1.length = 0;
gdjs.ManorCode.GDLootObjects1.length = 0;
gdjs.ManorCode.GDSelectorObjects1.length = 0;
gdjs.ManorCode.GDRippleObjects1.length = 0;
gdjs.ManorCode.GDPawObjects1.length = 0;
gdjs.ManorCode.GDPortraitObjects1.length = 0;
gdjs.ManorCode.GDPortraitRingObjects1.length = 0;
gdjs.ManorCode.GDPryGlowObjects1.length = 0;
gdjs.ManorCode.GDCaughtObjects1.length = 0;
gdjs.ManorCode.GDLanternObjects1.length = 0;
gdjs.ManorCode.GDActionBtnObjects1.length = 0;
gdjs.ManorCode.GDPanelObjects1.length = 0;
gdjs.ManorCode.GDLogoObjects1.length = 0;
gdjs.ManorCode.GDButtonObjects1.length = 0;
gdjs.ManorCode.GDSlotObjects1.length = 0;
gdjs.ManorCode.GDKobanObjects1.length = 0;
gdjs.ManorCode.GDTreasureObjects1.length = 0;
gdjs.ManorCode.GDCageObjects1.length = 0;
gdjs.ManorCode.GDToolObjects1.length = 0;
gdjs.ManorCode.GDDimObjects1.length = 0;
gdjs.ManorCode.GDSliderObjects1.length = 0;
gdjs.ManorCode.GDSliderKnobObjects1.length = 0;
gdjs.ManorCode.GDToastObjects1.length = 0;
gdjs.ManorCode.GDRibbonObjects1.length = 0;
gdjs.ManorCode.GDCardObjects1.length = 0;
gdjs.ManorCode.GDMsgBoxObjects1.length = 0;
gdjs.ManorCode.GDCheckObjects1.length = 0;
gdjs.ManorCode.GDStampObjects1.length = 0;
gdjs.ManorCode.GDResultIconObjects1.length = 0;
gdjs.ManorCode.GDSoundBtnObjects1.length = 0;
gdjs.ManorCode.GDHudTextObjects1.length = 0;
gdjs.ManorCode.GDInfoTextObjects1.length = 0;
gdjs.ManorCode.GDLabelObjects1.length = 0;
gdjs.ManorCode.GDWorldTextObjects1.length = 0;

gdjs.ManorCode.eventsList0(runtimeScene);
gdjs.ManorCode.GDBackgroundObjects1.length = 0;
gdjs.ManorCode.GDRoomObjects1.length = 0;
gdjs.ManorCode.GDBalconyObjects1.length = 0;
gdjs.ManorCode.GDRailObjects1.length = 0;
gdjs.ManorCode.GDRoofObjects1.length = 0;
gdjs.ManorCode.GDFoundationObjects1.length = 0;
gdjs.ManorCode.GDCloudObjects1.length = 0;
gdjs.ManorCode.GDParticleObjects1.length = 0;
gdjs.ManorCode.GDEmoteObjects1.length = 0;
gdjs.ManorCode.GDDogMeterObjects1.length = 0;
gdjs.ManorCode.GDStarObjects1.length = 0;
gdjs.ManorCode.GDSparkleObjects1.length = 0;
gdjs.ManorCode.GDShojiObjects1.length = 0;
gdjs.ManorCode.GDHideObjects1.length = 0;
gdjs.ManorCode.GDOwlObjects1.length = 0;
gdjs.ManorCode.GDGazeObjects1.length = 0;
gdjs.ManorCode.GDSamuraiObjects1.length = 0;
gdjs.ManorCode.GDNinjaObjects1.length = 0;
gdjs.ManorCode.GDKomainuObjects1.length = 0;
gdjs.ManorCode.GDSideLootObjects1.length = 0;
gdjs.ManorCode.GDFishObjects1.length = 0;
gdjs.ManorCode.GDGadgetObjects1.length = 0;
gdjs.ManorCode.GDPointerObjects1.length = 0;
gdjs.ManorCode.GDBossPortraitObjects1.length = 0;
gdjs.ManorCode.GDHatIconObjects1.length = 0;
gdjs.ManorCode.GDCatHatObjects1.length = 0;
gdjs.ManorCode.GDPoofObjects1.length = 0;
gdjs.ManorCode.GDSmokePuffObjects1.length = 0;
gdjs.ManorCode.GDCrestObjects1.length = 0;
gdjs.ManorCode.GDShutterObjects1.length = 0;
gdjs.ManorCode.GDFogObjects1.length = 0;
gdjs.ManorCode.GDVaultObjects1.length = 0;
gdjs.ManorCode.GDTrapObjects1.length = 0;
gdjs.ManorCode.GDDogObjects1.length = 0;
gdjs.ManorCode.GDCatObjects1.length = 0;
gdjs.ManorCode.GDLootObjects1.length = 0;
gdjs.ManorCode.GDSelectorObjects1.length = 0;
gdjs.ManorCode.GDRippleObjects1.length = 0;
gdjs.ManorCode.GDPawObjects1.length = 0;
gdjs.ManorCode.GDPortraitObjects1.length = 0;
gdjs.ManorCode.GDPortraitRingObjects1.length = 0;
gdjs.ManorCode.GDPryGlowObjects1.length = 0;
gdjs.ManorCode.GDCaughtObjects1.length = 0;
gdjs.ManorCode.GDLanternObjects1.length = 0;
gdjs.ManorCode.GDActionBtnObjects1.length = 0;
gdjs.ManorCode.GDPanelObjects1.length = 0;
gdjs.ManorCode.GDLogoObjects1.length = 0;
gdjs.ManorCode.GDButtonObjects1.length = 0;
gdjs.ManorCode.GDSlotObjects1.length = 0;
gdjs.ManorCode.GDKobanObjects1.length = 0;
gdjs.ManorCode.GDTreasureObjects1.length = 0;
gdjs.ManorCode.GDCageObjects1.length = 0;
gdjs.ManorCode.GDToolObjects1.length = 0;
gdjs.ManorCode.GDDimObjects1.length = 0;
gdjs.ManorCode.GDSliderObjects1.length = 0;
gdjs.ManorCode.GDSliderKnobObjects1.length = 0;
gdjs.ManorCode.GDToastObjects1.length = 0;
gdjs.ManorCode.GDRibbonObjects1.length = 0;
gdjs.ManorCode.GDCardObjects1.length = 0;
gdjs.ManorCode.GDMsgBoxObjects1.length = 0;
gdjs.ManorCode.GDCheckObjects1.length = 0;
gdjs.ManorCode.GDStampObjects1.length = 0;
gdjs.ManorCode.GDResultIconObjects1.length = 0;
gdjs.ManorCode.GDSoundBtnObjects1.length = 0;
gdjs.ManorCode.GDHudTextObjects1.length = 0;
gdjs.ManorCode.GDInfoTextObjects1.length = 0;
gdjs.ManorCode.GDLabelObjects1.length = 0;
gdjs.ManorCode.GDWorldTextObjects1.length = 0;


return;

}

gdjs['ManorCode'] = gdjs.ManorCode;
