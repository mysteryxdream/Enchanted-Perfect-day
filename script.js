```javascript
let playerX = 50;
let playerY = 50;

function startGame() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("world").classList.remove("hidden");

  playerX = 50;
  playerY = 50;
  updatePlayer();
}

function move(direction) {
  const player = document.getElementById("player");

  if (!player) return;

  const step = 4;

  if (direction === "up") playerY -= step;
  if (direction === "down") playerY += step;
  if (direction === "left") playerX -= step;
  if (direction === "right") playerX += step;

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

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") move("up");
  if (event.key === "ArrowDown") move("down");
  if (event.key === "ArrowLeft") move("left");
  if (event.key === "ArrowRight") move("right");
});

function checkLocation() {
  let location = null;

  // Academy
  if (playerX < 30 && playerY < 40) {
    location = "academy";
  }

  // Cafe
  else if (playerX > 70 && playerY < 40) {
    location = "cafe";
  }

  // Art Studio
  else if (playerX < 30 && playerY >= 40 && playerY < 70) {
    location = "art";
  }

  // Boutique
  else if (playerX > 70 && playerY >= 40 && playerY < 70) {
    location = "boutique";
  }

  // Dorm
  else if (playerX < 30 && playerY >= 70) {
    location = "dorm";
  }

  // Garden
  else if (playerX > 70 && playerY >= 70) {
    location = "garden";
  }

  if (location) {
    openPlace(location);
  }
}

function openPlace(place) {
  document.getElementById("world").classList.add("hidden");
  document.getElementById("place").classList.remove("hidden");

  const content = document.getElementById("placeContent");

  if (place === "academy") {
    content.innerHTML = `
      <div class="place-icon">🏫</div>
      <h2>Enchanted Academy</h2>
      <p>Choose a magical challenge! ✨</p>

      <div class="game-card">
        <h3>🗝️ Lost Keys</h3>
        <p>Find the magical key!</p>
        <button onclick="lostKeys()">Play</button>
      </div>

      <div class="game-card">
        <h3>🧪 Potion Lab</h3>
        <p>Make the perfect potion!</p>
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
      <p>Make a magical treat! 🍰</p>
      <button onclick="cafeGame()">🍰 Make a Treat</button>
      <div id="miniGame"></div>
    `;
  }

  if (place === "art") {
    content.innerHTML = `
      <div class="place-icon">🎨</div>
      <h2>Art Studio</h2>
      <p>Create something magical! ✨</p>

      <input id="artPrompt" placeholder="A pink fairy cottage...">
      <br>

      <button onclick="createArt()">🎨 Create</button>

      <div id="miniGame"></div>
    `;
  }

  if (place === "boutique") {
    content.innerHTML = `
      <div class="place-icon">👗</div>
      <h2>Fairy Boutique</h2>
      <p>Choose something cute! 🎀</p>

      <div class="game-card">
        🎀 Pink Bow
        <br>
        <button onclick="chooseItem('Pink Bow')">Choose</button>
      </div>

      <div class="game-card">
        🪽 Fairy Wings
        <br>
        <button onclick="chooseItem('Fairy Wings')">Choose</button>
      </div>

      <div class="game-card">
        👑 Tiny Crown
        <br>
        <button onclick="chooseItem('Tiny Crown')">Choose</button>
      </div>
    `;
  }

  if (place === "dorm") {
    content.innerHTML = `
      <div class="place-icon">🛏️</div>
      <h2>My Magical Dorm</h2>
      <p>Your cozy pre-decorated dorm. 🌸</p>

      <button onclick="rest()">🌙 Rest</button>
    `;
  }

  if (place === "garden") {
    content.innerHTML = `
      <div class="place-icon">🌷</div>
      <h2>Enchanted Garden</h2>
      <p>A peaceful magical garden. 🦋</p>

      <div class="game-card">
        🌸 Collect Flowers
        <br>
        <button onclick="gardenGame('flower')">Collect</button>
      </div>

      <div class="game-card">
        🦋 Find Butterflies
        <br>
        <button onclick="gardenGame('butterfly')">Find</button>
      </div>

      <div class="game-card">
        ✨ Find Something Magical
        <br>
        <button onclick="gardenGame('magic')">Explore</button>
      </div>
    `;
  }
}

function backToWorld() {
  document.getElementById("place").classList.add("hidden");
  document.getElementById("world").classList.remove("hidden");
}

function lostKeys() {
  const answer = prompt(
    "🗝️ Which key is magical?\n\n1. 🔑\n2. 🗝️\n3. 🔐"
  );

  if (answer === "2") {
    alert("🎉 You found the magical key!");
  } else {
    alert("Not quite! Try again 🗝️");
  }
}

function potionLab() {
  const answer = prompt(
    "🧪 Which ingredient makes the potion sparkle?\n\n1. 🌸 Rose Petal\n2. 🪨 Stone\n3. 🍂 Leaf"
  );

  if (answer === "1") {
    alert("✨ Perfect potion!");
  } else {
    alert("Try again! 🧪");
  }
}

function memoryGarden() {
  alert("Remember:\n\n🌸 🦋 ⭐");

  const answer = prompt(
    "Type: flower, butterfly, star"
  );

  if (
    answer &&
    answer.toLowerCase().replace(/\s/g, "") ===
    "flower,butterfly,star"
  ) {
    alert("🧠 Amazing memory!");
  } else {
    alert("Not quite! Try again 🌷");
  }
}

function cafeGame() {
  const answer = prompt(
    "☕ Which treat should you make?\n\n1. 🧁 Fairy Cupcake\n2. 🍎 Apple\n3. 🥪 Sandwich"
  );

  if (answer === "1") {
    alert("🧁✨ Perfect fairy cupcake!");
  } else {
    alert("Try the fairy cupcake! 🎀");
  }
}

function createArt() {
  const input = document.getElementById("artPrompt");
  const result = document.getElementById("miniGame");

  if (!input.value.trim()) {
    result.innerHTML = "<p>🌸 Tell me what you want to create!</p>";
    return;
  }

  result.innerHTML = `
    <div class="game-card">
      <h3>🎨 Artwork Complete!</h3>
      <p>${input.value}</p>
      <p>✨ Your art is part of your Perfect Day!</p>
    </div>
  `;
}

function chooseItem(item) {
  alert("🎀 You chose the " + item + "!");
}

function rest() {
  alert("🛏️ You had a cozy rest. ✨");
}

function gardenGame(type) {
  if (type === "flower") {
    alert("🌸 You found a beautiful flower!");
  }

  if (type === "butterfly") {
    alert("🦋 A butterfly fluttered by!");
  }

  if (type === "magic") {
    alert("✨ The garden feels extra magical today!");
  }
}
```
