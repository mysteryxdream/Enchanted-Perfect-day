```javascript
let coins = 100;
let level = 1;
let crowns = 0;

let dayStarted = false;
let activities = 0;

let playerX = 50;
let playerY = 50;

let timeLeft = 1440;
let timer = null;


/* =========================
   START THE PERFECT DAY
========================= */

function startGame() {
  const home = document.getElementById("home");
  const world = document.getElementById("world");

  if (!home || !world) {
    alert("Game screen could not load.");
    return;
  }

  home.classList.add("hidden");
  world.classList.remove("hidden");

  dayStarted = true;
  activities = 0;

  playerX = 50;
  playerY = 50;

  updatePlayer();
  updateStats();
  updateTimer();

  clearInterval(timer);

  timer = setInterval(function () {
    if (!dayStarted) return;

    timeLeft--;

    if (timeLeft <= 0) {
      timeLeft = 0;
      endDay();
    }

    updateTimer();
  }, 1000);
}


/* =========================
   STATS
========================= */

function updateStats() {
  const coinsEl = document.getElementById("coins");
  const levelEl = document.getElementById("level");
  const crownsEl = document.getElementById("crowns");

  if (coinsEl) coinsEl.textContent = coins;
  if (levelEl) levelEl.textContent = level;
  if (crownsEl) crownsEl.textContent = crowns;
}


/* =========================
   TIMER
========================= */

function updateTimer() {
  const timerEl = document.getElementById("timer");

  if (!timerEl) return;

  const hours = Math.floor(timeLeft / 60);
  const minutes = timeLeft % 60;

  timerEl.textContent =
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0");
}


/* =========================
   END OF DAY
========================= */

function endDay() {
  clearInterval(timer);
  timer = null;

  dayStarted = false;

  const score = Math.min(100, 40 + activities * 10);

  if (score >= 80) {
    crowns++;
  }

  const world = document.getElementById("world");
  const ending = document.getElementById("ending");
  const summary = document.getElementById("summary");

  if (world) world.classList.add("hidden");
  if (ending) ending.classList.remove("hidden");

  if (summary) {
    summary.innerHTML =
      "You completed " +
      activities +
      " activities today! ✨<br><br>" +
      "🌸 Perfect Day Score: <strong>" +
      score +
      "%</strong><br>" +
      "🪙 Coins: <strong>" +
      coins +
      "</strong><br>" +
      "⭐ Level: <strong>" +
      level +
      "</strong><br>" +
      "👑 Crowns: <strong>" +
      crowns +
      "</strong>";
  }

  updateStats();
}


/* =========================
   FAIRY MOVEMENT
========================= */

function move(direction) {
  if (!dayStarted) return;

  const step = 4;

  if (direction === "up") {
    playerY -= step;
  }

  if (direction === "down") {
    playerY += step;
  }

  if (direction === "left") {
    playerX -= step;
  }

  if (direction === "right") {
    playerX += step;
  }

  playerX = Math.max(5, Math.min(95, playerX));
  playerY = Math.max(8, Math.min(92, playerY));

  updatePlayer();
  checkLocation();
}


function updatePlayer() {
  const player = document.getElementById("player");

  if (!player) return;

  player.style.left = playerX + "%";
  player.style.top = playerY + "%";
}


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", function (event) {

  if (event.key === "ArrowUp") {
    event.preventDefault();
    move("up");
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    move("down");
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    move("left");
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    move("right");
  }

});


/* =========================
   LOCATION DETECTION
========================= */

let lastLocation = null;

function checkLocation() {

  let location = null;

  /*
     These areas match the six locations
     on your map.
  */

  if (playerX <= 30 && playerY <= 38) {
    location = "academy";
  }

  else if (playerX >= 70 && playerY <= 38) {
    location = "cafe";
  }

  else if (
    playerX <= 30 &&
    playerY > 38 &&
    playerY < 70
  ) {
    location = "art";
  }

  else if (
    playerX >= 70 &&
    playerY > 38 &&
    playerY < 70
  ) {
    location = "boutique";
  }

  else if (
    playerX <= 30 &&
    playerY >= 70
  ) {
    location = "dorm";
  }

  else if (
    playerX >= 70 &&
    playerY >= 70
  ) {
    location = "garden";
  }


  if (location && location !== lastLocation) {

    lastLocation = location;

    openPlace(location);

  }

  if (!location) {
    lastLocation = null;
  }
}


/* =========================
   OPEN LOCATIONS
========================= */

function openPlace(place) {

  if (!dayStarted) return;

  const world = document.getElementById("world");
  const placeScreen = document.getElementById("place");
  const content = document.getElementById("placeContent");

  if (!world || !placeScreen || !content) {
    alert("Location screen is missing.");
    return;
  }

  world.classList.add("hidden");
  placeScreen.classList.remove("hidden");


  /* ACADEMY */

  if (place === "academy") {

    content.innerHTML = `
      <div class="place-icon">🏫</div>

      <h2>Enchanted Academy</h2>

      <p>Choose a magical mini-game! ✨</p>

      <div class="game-card">
        <h3>🗝️ Lost Keys</h3>
        <p>Find the magical key.</p>
        <button onclick="lostKeys()">Play</button>
      </div>

      <div class="game-card">
        <h3>🧪 Potion Lab</h3>
        <p>Create the perfect potion.</p>
        <button onclick="potionLab()">Play</button>
      </div>

      <div class="game-card">
        <h3>🌷 Memory Garden</h3>
        <p>Test your memory.</p>
        <button onclick="memoryGarden()">Play</button>
      </div>
    `;

  }


  /* CAFE */

  if (place === "cafe") {

    content.innerHTML = `
      <div class="place-icon">☕</div>

      <h2>Enchanted Café</h2>

      <p>Make a magical treat! 🍰</p>

      <button onclick="cafeGame()">
        🍰 Make a Treat
      </button>

      <div id="miniGame"></div>
    `;

  }


  /* ART */

  if (place === "art") {

    content.innerHTML = `
      <div class="place-icon">🎨</div>

      <h2>Art Studio</h2>

      <p>Create something for your Perfect Day! ✨</p>

      <input
        id="artPrompt"
        placeholder="A pink fairy cottage..."
      >

      <br>

      <button onclick="createArt()">
        ✨ Create Art
      </button>

      <div id="miniGame"></div>
    `;

  }


  /* BOUTIQUE */

  if (place === "boutique") {

    content.innerHTML = `
      <div class="place-icon">👗</div>

      <h2>Fairy Boutique</h2>

      <p>Choose something cute! 🎀</p>

      <div class="game-card">
        🎀 Pink Bow — 40 🪙
        <br>
        <button onclick="buyItem('Pink Bow', 40)">
          Buy
        </button>
      </div>

      <div class="game-card">
        🪽 Fairy Wings — 80 🪙
        <br>
        <button onclick="buyItem('Fairy Wings', 80)">
          Buy
        </button>
      </div>

      <div class="game-card">
        👑 Crown — 120 🪙
        <br>
        <button onclick="buyItem('Crown', 120)">
          Buy
        </button>
      </div>
    `;

  }


  /* DORM */

  if (place === "dorm") {

    content.innerHTML = `
      <div class="place-icon">🛏️</div>

      <h2>My Magical Dorm</h2>

      <p>Your cozy pre-decorated dorm. 🌸</p>

      <button onclick="rest()">
        🌙 Rest
      </button>
    `;

  }


  /* GARDEN */

  if (place === "garden") {

    content.innerHTML = `
      <div class="place-icon">🌷</div>

      <h2>Enchanted Garden</h2>

      <p>Spend some peaceful time in the garden. 🦋</p>

      <div class="game-card">
        🌸 Collect Flowers
        <br>
        <button onclick="gardenGame('flower')">
          Collect
        </button>
      </div>

      <div class="game-card">
        🦋 Find Butterflies
        <br>
        <button onclick="gardenGame('butterfly')">
          Find
        </button>
      </div>

      <div class="game-card">
        ✨ Explore
        <br>
        <button onclick="gardenGame('magic')">
          Explore
        </button>
      </div>
    `;

  }
}


/* =========================
   BACK BUTTON
========================= */

function backToWorld() {

  document.getElementById("place").classList.add("hidden");

  document.getElementById("world").classList.remove("hidden");

  lastLocation = null;
}


/* =========================
   REWARDS
========================= */

function reward(amount) {

  coins += amount;

  activities++;

  if (activities % 3 === 0) {
    level++;
  }

  updateStats();

  alert("✨ +" + amount + " coins!");

}


/* =========================
   LOST KEYS
========================= */

function lostKeys() {

  const answer = prompt(
    "🗝️ Which key is magical?\n\n" +
    "1. 🔑\n" +
    "2. 🗝️\n" +
    "3. 🔐"
  );

  if (answer === "2") {

    reward(30);

    alert("🎉 You found the magical key!");

  } else {

    alert("Not quite! Try again. 🗝️");

  }

}


/* =========================
   POTION LAB
========================= */

function potionLab() {

  const answer = prompt(
    "🧪 Which ingredient makes the potion glow?\n\n" +
    "1. 🌸 Rose Petal\n" +
    "2. 🪨 Stone\n" +
    "3. 🍂 Leaf"
  );

  if (answer === "1") {

    reward(35);

    alert("✨ Perfect potion!");

  } else {

    alert("Try again! 🧪");

  }

}


/* =========================
   MEMORY GARDEN
========================= */

function memoryGarden() {

  alert("Remember:\n\n🌸 🦋 ⭐");

  const answer = prompt(
    "Type:\nflower, butterfly, star"
  );

  if (
    answer &&
    answer.toLowerCase().replace(/\s/g, "") ===
    "flower,butterfly,star"
  ) {

    reward(40);

    alert("🧠 Amazing memory!");

  } else {

    alert("Not quite! Try again.");

  }

}


/* =========================
   CAFE
========================= */

function cafeGame() {

  const answer = prompt(
    "☕ Make a Fairy Latte!\n\n" +
    "1. Milk → Stardust → Rose Syrup\n" +
    "2. Stone → Milk → Leaf\n" +
    "3. Leaf → Stone → Stardust"
  );

  if (answer === "1") {

    reward(25);

    alert("☕✨ Perfect!");

  } else {

    alert("Try again!");

  }

}


/* =========================
   ART STUDIO
========================= */

function createArt() {

  const input = document.getElementById("artPrompt");

  const result = document.getElementById("miniGame");

  if (!input || !result) return;

  const text = input.value.trim();

  if (!text) {

    result.innerHTML =
      "<p>🌸 Tell me what you want to create!</p>";

    return;
  }

  result.innerHTML = `
    <div class="game-card">
      <h3>🎨 Artwork Complete!</h3>
      <p>${escapeHTML(text)}</p>
      <p>✨ Beautiful!</p>
    </div>
  `;

  reward(20);

}


/* =========================
   SAFE ART TEXT
========================= */

function escapeHTML(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


/* =========================
   BOUTIQUE
========================= */

function buyItem(item, price) {

  if (coins < price) {

    alert("You need more coins! 🪙");

    return;

  }

  coins -= price;

  updateStats();

  alert("🎀 You bought " + item + "!");

}


/* =========================
   DORM
========================= */

function rest() {

  reward(10);

  alert("🌙 You had a cozy rest in your dorm!");

}


/* =========================
   GARDEN
========================= */

function gardenGame(type) {

  if (type === "flower") {

    reward(15);

    alert("🌸 You found a beautiful flower!");

  }

  if (type === "butterfly") {

    reward(20);

    alert("🦋 You found a butterfly!");

  }

  if (type === "magic") {

    reward(25);

    alert("✨ The garden feels magical!");

  }

}


/* =========================
   INITIAL SETUP
========================= */

updateStats();
updateTimer();
```
