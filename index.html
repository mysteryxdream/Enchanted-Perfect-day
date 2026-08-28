```javascript
alert("SCRIPT WORKING!");

let coins = Number(localStorage.getItem("coins")) || 100;
let level = Number(localStorage.getItem("level")) || 1;
let crowns = Number(localStorage.getItem("crowns")) || 0;

let timeLeft = 1440;
let timer = null;
let dayStarted = false;
let activities = 0;

let playerX = 50;
let playerY = 50;

function updateStats() {
  document.getElementById("coins").textContent = coins;
  document.getElementById("level").textContent = level;
  document.getElementById("crowns").textContent = crowns;
}

function saveGame() {
  localStorage.setItem("coins", coins);
  localStorage.setItem("level", level);
  localStorage.setItem("crowns", crowns);
}

function startGame() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("ending").classList.add("hidden");
  document.getElementById("place").classList.add("hidden");
  document.getElementById("world").classList.remove("hidden");

  timeLeft = 1440;
  activities = 0;
  dayStarted = true;

  playerX = 50;
  playerY = 50;

  updatePlayer();
  updateStats();
  updateTimerDisplay();

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!dayStarted) return;

  timeLeft--;

  updateTimerDisplay();

  if (timeLeft <= 0) {
    endDay();
  }
}

function updateTimerDisplay() {
  let hours = Math.floor(timeLeft / 60);
  let minutes = timeLeft % 60;

  document.getElementById("timer").textContent =
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0");
}

function endDay() {
  clearInterval(timer);
  timer = null;
  dayStarted = false;

  let score = Math.min(100, 40 + activities * 10);

  if (score >= 80) {
    crowns++;
  }

  saveGame();
  updateStats();

  document.getElementById("world").classList.add("hidden");
  document.getElementById("ending").classList.remove("hidden");

  document.getElementById("summary").innerHTML =
    "You completed " + activities +
    " activities today! ✨<br><br>" +
    "🌸 Perfect Day Score: <strong>" + score +
    "%</strong><br>" +
    "🪙 Coins: <strong>" + coins +
    "</strong><br>" +
    "⭐ Level: <strong>" + level +
    "</strong><br>" +
    "👑 Crowns: <strong>" + crowns +
    "</strong>";
}

function move(direction) {
  if (!dayStarted) return;

  let step = 4;

  if (direction === "up") playerY -= step;
  if (direction === "down") playerY += step;
  if (direction === "left") playerX -= step;
  if (direction === "right") playerX += step;

  playerX = Math.max(5, Math.min(95, playerX));
  playerY = Math.max(8, Math.min(92, playerY));

  updatePlayer();
}

function updatePlayer() {
  let player = document.getElementById("player");

  if (!player) return;

  player.style.left = playerX + "%";
  player.style.top = playerY + "%";
}

document.addEventListener("keydown", function(event) {
  let key = event.key.toLowerCase();

  if (key === "arrowup" || key === "w") move("up");
  if (key === "arrowdown" || key === "s") move("down");
  if (key === "arrowleft" || key === "a") move("left");
  if (key === "arrowright" || key === "d") move("right");
});

function openPlace(place) {
  if (!dayStarted) return;

  document.getElementById("world").classList.add("hidden");
  document.getElementById("place").classList.remove("hidden");

  let content = document.getElementById("placeContent");

  if (place === "academy") {
    content.innerHTML = `
      <div class="place-icon">🏫</div>
      <h2>Enchanted Academy</h2>
      <p>Choose a magical challenge!</p>

      <div class="game-card">
        <h3>🗝️ Lost Keys</h3>
        <p>Find the magical key!</p>
        <button onclick="lostKeys()">Play</button>
      </div>

      <div class="game-card">
        <h3>🧪 Potion Lab</h3>
        <p>Make the correct potion!</p>
        <button onclick="potionLab()">Play</button>
      </div>

      <div class="game-card">
        <h3>🧠 Memory Garden</h3>
        <p>Test your memory!</p>
        <button onclick="memoryGarden()">Play</button>
      </div>
    `;
  }

  if (place === "cafe") {
    content.innerHTML = `
      <div class="place-icon">☕</div>
      <h2>Enchanted Café</h2>
      <p>Make a magical treat!</p>
      <button onclick="cafeGame()">🍰 Play Café Game</button>
      <div id="miniGame"></div>
    `;
  }

  if (place === "art") {
    content.innerHTML = `
      <div class="place-icon">🎨</div>
      <h2>Art Studio</h2>
      <p>Create your dream artwork!</p>
      <input id="artPrompt" placeholder="A pink fairy cottage...">
      <br>
      <button onclick="createArt()">✨ Create</button>
      <div id="miniGame"></div>
    `;
  }

  if (place === "boutique") {
    content.innerHTML = `
      <div class="place-icon">👗</div>
      <h2>Fairy Boutique</h2>

      <div class="game-card">
        🎀 Pink Bow — 40 🪙
        <br>
        <button onclick="buyItem('Pink Bow',40)">Buy</button>
      </div>

      <div class="game-card">
        🪽 Fairy Wings — 80 🪙
        <br>
        <button onclick="buyItem('Fairy Wings',80)">Buy</button>
      </div>

      <div class="game-card">
        👑 Crown — 120 🪙
        <br>
        <button onclick="buyItem('Crown',120)">Buy</button>
      </div>
    `;
  }

  if (place === "dorm") {
    content.innerHTML = `
      <div class="place-icon">🛏️</div>
      <h2>My Magical Dorm</h2>
      <p>Your cozy pre-designed dorm. 🌸</p>
      <button onclick="completeActivity(10)">🌙 Rest</button>
    `;
  }

  if (place === "garden") {
    content.innerHTML = `
      <div class="place-icon">🌷</div>
      <h2>Enchanted Garden</h2>

      <div class="game-card">
        🌸 Collect flowers
        <br>
        <button onclick="gardenActivity('flower')">Collect</button>
      </div>

      <div class="game-card">
        🦋 Find butterflies
        <br>
        <button onclick="gardenActivity('butterfly')">Find</button>
      </div>

      <div class="game-card">
        🪙 Collect coins
        <br>
        <button onclick="gardenActivity('coin')">Collect</button>
      </div>
    `;
  }
}

function backToWorld() {
  document.getElementById("place").classList.add("hidden");
  document.getElementById("world").classList.remove("hidden");
}

function reward(amount) {
  coins += amount;
  activities++;

  if (activities % 3 === 0) {
    level++;
  }

  saveGame();
  updateStats();

  alert("✨ +" + amount + " coins!");
}

function completeActivity(amount) {
  reward(amount);
}

function lostKeys() {
  let answer = prompt(
    "🗝️ Which key is magical?\n\n1. 🔑\n2. 🗝️\n3. 🔐"
  );

  if (answer === "2") {
    reward(30);
    alert("🎉 You found the magical key!");
  } else {
    alert("Not quite! Try again. 🗝️");
  }
}

function potionLab() {
  let answer = prompt(
    "🧪 Which ingredient makes the potion glow?\n\n1. 🌸 Rose Petal\n2. 🪨 Stone\n3. 🍂 Leaf"
  );

  if (answer === "1") {
    reward(35);
    alert("✨ Perfect potion!");
  } else {
    alert("Try again! 🧪");
  }
}

function memoryGarden() {
  alert("Remember:\n\n🌸 🦋 ⭐");

  let answer = prompt(
    "Type: flower, butterfly, star"
  );

  if (
    answer &&
    answer.toLowerCase().replaceAll(" ", "") ===
    "flower,butterfly,star"
  ) {
    reward(40);
    alert("🧠 Amazing memory!");
  } else {
    alert("Not quite! Try again.");
  }
}

function cafeGame() {
  let answer = prompt(
    "☕ Make a Fairy Latte!\n\n1. Milk → Stardust → Rose Syrup\n2. Stone → Milk → Leaf\n3. Leaf → Stone → Stardust"
  );

  if (answer === "1") {
    reward(25);
    alert("☕✨ Perfect!");
  } else {
    alert("Try again!");
  }
}

function createArt() {
  let input = document.getElementById("artPrompt");
  let result = document.getElementById("miniGame");

  let text = input.value.trim();

  if (!text) {
    result.innerHTML =
      "<p>🌸 Tell me what you want to create!</p>";
    return;
  }

  result.innerHTML = `
    <div class="game-card">
      <h3>🎨 Your Artwork</h3>
      <p>${escapeHTML(text)}</p>
      <p>✨ Artwork complete!</p>
    </div>
  `;

  reward(20);
}

function escapeHTML(text) {
  let div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function buyItem(item, price) {
  if (coins < price) {
    alert("You need more coins! 🪙");
    return;
  }

  coins -= price;
  saveGame();
  updateStats();

  alert("🎀 You bought " + item + "!");
}

function gardenActivity(type) {
  if (type === "flower") {
    reward(15);
    alert("🌸 Flower collected!");
  }

  if (type === "butterfly") {
    reward(20);
    alert("🦋 Butterfly found!");
  }

  if (type === "coin") {
    reward(25);
    alert("🪙 Coins collected!");
  }
}

updateStats();
```
