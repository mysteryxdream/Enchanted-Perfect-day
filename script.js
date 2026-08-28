```javascript
let coins = Number(localStorage.getItem("coins")) || 100;
let level = Number(localStorage.getItem("level")) || 1;
let crowns = Number(localStorage.getItem("crowns")) || 0;

let timeLeft = 24 * 60;
let timer;
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
  document.getElementById("world").classList.remove("hidden");

  timeLeft = 24 * 60;
  activities = 0;
  dayStarted = true;

  playerX = 50;
  playerY = 50;

  updatePlayer();
  updateStats();

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!dayStarted) return;

  timeLeft--;

  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  document.getElementById("timer").textContent =
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");

  if (timeLeft <= 0) {
    endDay();
  }
}

function endDay() {
  clearInterval(timer);
  dayStarted = false;

  let score = Math.min(100, 40 + activities * 10);

  if (score >= 80) {
    crowns++;
    saveGame();
  }

  document.getElementById("world").classList.add("hidden");
  document.getElementById("ending").classList.remove("hidden");

  document.getElementById("summary").innerHTML =
    "You completed " + activities + " activities today! ✨<br><br>" +
    "🌸 Perfect Day Score: <strong>" + score + "%</strong><br>" +
    "🪙 Coins: <strong>" + coins + "</strong><br>" +
    "⭐ Level: <strong>" + level + "</strong><br>" +
    "👑 Crowns: <strong>" + crowns + "</strong>";
}

function move(direction) {
  if (!dayStarted) return;

  const step = 4;

  if (direction === "up") playerY -= step;
  if (direction === "down") playerY += step;
  if (direction === "left") playerX -= step;
  if (direction === "right") playerX += step;

  playerX = Math.max(5, Math.min(95, playerX));
  playerY = Math.max(8, Math.min(92, playerY));

  updatePlayer();
}

function updatePlayer() {
  const player = document.getElementById("player");

  player.style.left = playerX + "%";
  player.style.top = playerY + "%";
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
    move("up");
  }

  if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
    move("down");
  }

  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    move("left");
  }

  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    move("right");
  }
});

function openPlace(place) {
  if (!dayStarted) return;

  document.getElementById("world").classList.add("hidden");
  document.getElementById("place").classList.remove("hidden");

  const content = document.getElementById("placeContent");

  if (place === "academy") {
    content.innerHTML = `
      <div class="place-icon">🏫</div>
      <h2>Enchanted Academy</h2>
      <p>Choose a magical challenge!</p>

      <div class="game-card">
        <h3>🗝️ Lost Keys</h3>
        <p>Find the correct magical key!</p>
        <button onclick="lostKeys()">Play</button>
      </div>

      <div class="game-card">
        <h3>🧪 Potion Lab</h3>
        <p>Choose the correct potion ingredient.</p>
        <button onclick="potionLab()">Play</button>
      </div>

      <div class="game-card">
        <h3>🧠 Memory Garden</h3>
        <p>Test your magical memory!</p>
        <button onclick="memoryGarden()">Play</button>
      </div>

      <div id="miniGame"></div>
    `;
  }

  if (place === "cafe") {
    content.innerHTML = `
      <div class="place-icon">☕</div>
      <h2>Enchanted Café</h2>
      <p>Make a magical treat!</p>
      <div id="miniGame"></div>
      <button onclick="cafeGame()">🍰 Start Café Game</button>
    `;
  }

  if (place === "art") {
    content.innerHTML = `
      <div class="place-icon">🎨</div>
      <h2>AI Art Studio</h2>
      <p>Describe your dream artwork.</p>
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
      <p>Spend your coins on cute items!</p>

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

      <div id="miniGame"></div>
    `;
  }

  if (place === "dorm") {
    content.innerHTML = `
      <div class="place-icon">🛏️</div>
      <h2>My Magical Dorm</h2>
      <p>Your cozy little room at the academy. 🌸</p>
      <p>Take a rest and enjoy your perfect space! ✨</p>
      <button onclick="completeActivity(10)">🌙 Rest</button>
    `;
  }

  if (place === "garden") {
    content.innerHTML = `
      <div class="place-icon">🌷</div>
      <h2>Enchanted Garden</h2>
      <p>Explore the magical garden!</p>

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

  alert("✨ You earned " + amount + " coins!");
}

function completeActivity(amount) {
  reward(amount);
}

function lostKeys() {
  const answer = prompt(
    "🗝️ Three keys are here: 🔑 🔑 🔑\n\nWhich key is magical?\nType 1, 2 or 3."
  );

  if (answer === "2") {
    reward(30);
    alert("🎉 You found the magical key!");
  } else {
    alert("Not quite! Try again. 🗝️");
  }
}

function potionLab() {
  const answer = prompt(
    "🧪 Potion Lab!\n\nWhich ingredient makes the fairy potion glow?\n\n1. 🌸 Rose Petal\n2. 🪨 Stone\n3. 🍂 Leaf"
  );

  if (answer === "1") {
    reward(35);
    alert("✨ Perfect potion!");
  } else {
    alert("Oops! That wasn't the right ingredient. 🧪");
  }
}

function memoryGarden() {
  const sequence = "🌸 🦋 ⭐";

  alert("Remember this sequence:\n\n" + sequence);

  const answer = prompt(
    "Now type the symbols in order using:\nflower, butterfly, star"
  );

  if (
    answer &&
    answer.toLowerCase().replaceAll(" ", "") ===
    "flower,butterfly,star"
  ) {
    reward(40);
    alert("🧠 Amazing memory!");
  } else {
    alert("Not quite! Try again. 🌷");
  }
}

function cafeGame() {
  const answer = prompt(
    "☕ A customer wants a Fairy Latte!\n\nChoose the correct order:\n\n1. Milk → Stardust → Rose Syrup\n2. Stardust → Stone → Milk\n3. Rose Syrup → Leaf → Stone"
  );

  if (answer === "1") {
    reward(25);
    alert("☕✨ Perfect Fairy Latte!");
  } else {
    alert("Oops! The customer wanted something else.");
  }
}

function createArt() {
  const promptText = document.getElementById("artPrompt").value.trim();
  const result = document.getElementById("miniGame");

  if (!promptText) {
    result.innerHTML = "<p>🌸 Tell me what you want to create first!</p>";
    return;
  }

  result.innerHTML = `
    <div class="game-card">
      <h3>🎨 Your Artwork</h3>
      <p>${escapeHTML(promptText)}</p>
      <p>✨ A magical artwork was created!</p>
    </div>
  `;

  reward(20);
}

function escapeHTML(text) {
  const div = document.createElement("div");
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
    alert("🌸 You collected a beautiful magical flower!");
  }

  if (type === "butterfly") {
    reward(20);
    alert("🦋 You found a lovely butterfly!");
  }

  if (type === "coin") {
    reward(25);
    alert("🪙 You found some coins!");
  }
}

updateStats();
```
