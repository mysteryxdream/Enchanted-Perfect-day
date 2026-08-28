// 🌸 MY PERFECT DAY — Main Game Logic

let coins = Number(localStorage.getItem("coins")) || 100;
let level = Number(localStorage.getItem("level")) || 1;
let crowns = Number(localStorage.getItem("crowns")) || 0;

let collection =
    JSON.parse(localStorage.getItem("collection")) || [];

function saveGame() {
    localStorage.setItem("coins", coins);
    localStorage.setItem("level", level);
    localStorage.setItem("crowns", crowns);
    localStorage.setItem("collection", JSON.stringify(collection));
}

function updateStats() {
    document.getElementById("coins").textContent = coins;
    document.getElementById("level").textContent = level;
    document.getElementById("crowns").textContent = crowns;

    saveGame();
}

function show(section) {
    document.querySelectorAll(".panel").forEach(panel => {
        panel.classList.add("hidden");
    });

    const selected = document.getElementById(section);

    if (selected) {
        selected.classList.remove("hidden");
    }
}

function earn(amount, message) {
    coins += amount;

    alert("✨ " + message + "\n\n🪙 +" + amount + " coins!");

    checkLevel();
    updateStats();
}

function checkLevel() {
    const newLevel = Math.floor(coins / 200) + 1;

    if (newLevel > level) {
        level = newLevel;
        alert("🌟 LEVEL UP!\n\nYou are now Level " + level + "!");
    }
}

function buy(item, price) {
    if (collection.includes(item)) {
        alert("🎀 You already own " + item + "!");
        return;
    }

    if (coins < price) {
        alert("💗 You need " + (price - coins) + " more coins!");
        return;
    }

    coins -= price;
    collection.push(item);

    updateCollection();

    alert("✨ You bought " + item + "!");
    updateStats();
}

function updateCollection() {
    const closet = document.getElementById("closet");

    if (!closet) return;

    if (collection.length === 0) {
        closet.textContent = "Your collection is empty.";
    } else {
        closet.innerHTML =
            "🎀 Your collection:<br>" +
            collection.join(" · ");
    }
}

function play(type) {
    const game = document.getElementById("game");

    if (type === "keys") {
        game.innerHTML = `
            <div class="mini-game">
                <h3>🗝️ Lost Keys</h3>
                <p>Which key opens the magical academy?</p>

                <button onclick="winGame(30)">🔑 Pink Key</button>
                <button onclick="wrongKey()">🔑 Blue Key</button>
                <button onclick="wrongKey()">🔑 Golden Key</button>
            </div>
        `;
    }

    if (type === "potion") {
        game.innerHTML = `
            <div class="mini-game">
                <h3>🧪 Potion Lab</h3>
                <p>Which ingredient makes a healing potion?</p>

                <button onclick="wrongPotion()">🌙 Moon Dust</button>
                <button onclick="winGame(40)">🌿 Healing Herb</button>
                <button onclick="wrongPotion()">✨ Stardust</button>
            </div>
        `;
    }

    if (type === "memory") {
        game.innerHTML = `
            <div class="mini-game">
                <h3>🧠 Memory Garden</h3>
                <p>Remember this sequence:</p>
                <h2>🌸 🦋 ⭐ 🌙</h2>

                <button onclick="memoryCorrect()">🌸 🦋 ⭐ 🌙</button>
                <button onclick="memoryWrong()">🌙 ⭐ 🦋 🌸</button>
                <button onclick="memoryWrong()">⭐ 🌸 🌙 🦋</button>
            </div>
        `;
    }
}

function winGame(reward) {
    coins += reward;

    alert(
        "🎉 You completed the challenge!\n\n" +
        "🪙 +" + reward + " coins!"
    );

    checkLevel();
    updateStats();

    document.getElementById("game").innerHTML = `
        <h3>✨ Challenge Complete!</h3>
        <p>Great job! Choose another activity. 🌸</p>
    `;
}

function wrongKey() {
    alert("❌ Not this key! Try again.");
}

function wrongPotion() {
    alert("🧪 That's not the right ingredient!");
}

function memoryCorrect() {
    winGame(50);
}

function memoryWrong() {
    alert("🧠 Not quite! Try again!");
}

function generateArt() {
    const prompt = document.getElementById("prompt").value.trim();
    const result = document.getElementById("artResult");

    if (!prompt) {
        result.innerHTML = "<p>🌸 Tell me what you want to create first!</p>";
        return;
    }

    result.innerHTML = `
        <div class="art-card">
            <h3>🎨 Your Dream Artwork</h3>
            <p>✨ "${prompt}"</p>
            <p>🤖 AI artwork generation will be connected here!</p>
        </div>
    `;

    earn(20, "You created a new piece of artwork!");
}

function newDay() {
    show("activities");

    document.getElementById("game").innerHTML = "";

    alert("🌅 A brand new perfect day begins!");
}

document.addEventListener("DOMContentLoaded", () => {
    updateStats();
    updateCollection();
});
