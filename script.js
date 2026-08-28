// 🌸 ENCHANTED PERFECT DAY — Game Logic

let coins = Number(localStorage.getItem("coins")) || 100;
let level = Number(localStorage.getItem("level")) || 1;
let crowns = Number(localStorage.getItem("crowns")) || 0;

let collection = JSON.parse(localStorage.getItem("collection")) || [];

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

function hideAllScreens() {
    document.querySelectorAll(".screen").forEach(function(screen) {
        screen.classList.add("hidden");
    });
}

function enterAcademy() {
    hideAllScreens();
    document.getElementById("academy").classList.remove("hidden");
}

function backToAcademy() {
    hideAllScreens();
    document.getElementById("academy").classList.remove("hidden");
}

function openLocation(location) {
    hideAllScreens();

    const screen = document.getElementById(location);

    if (screen) {
        screen.classList.remove("hidden");
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

        alert(
            "🌟 LEVEL UP!\n\n" +
            "You are now Level " + level + "!"
        );
    }
}

function buy(item, price) {
    if (collection.includes(item)) {
        alert("🎀 You already own " + item + "!");
        return;
    }

    if (coins < price) {
        alert(
            "💗 You need " +
            (price - coins) +
            " more coins!"
        );

        return;
    }

    coins -= price;
    collection.push(item);

    updateCollection();
    updateStats();

    alert("✨ You bought " + item + "!");
}

function updateCollection() {
    const closet = document.getElementById("closet");

    if (!closet) {
        return;
    }

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

    if (!game) {
        return;
    }

    if (type === "keys") {
        game.innerHTML = `
            <div class="mini-game">
                <h2>🗝️ Lost Keys</h2>
                <p>Which key opens the magical academy?</p>

                <button onclick="winGame(30)">
                    🔑 Pink Key
                </button>

                <button onclick="wrongAnswer()">
                    🔑 Blue Key
                </button>

                <button onclick="wrongAnswer()">
                    🔑 Golden Key
                </button>
            </div>
        `;
    }

    if (type === "potion") {
        game.innerHTML = `
            <div class="mini-game">
                <h2>🧪 Potion Lab</h2>
                <p>Which ingredient makes a healing potion?</p>

                <button onclick="wrongAnswer()">
                    🌙 Moon Dust
                </button>

                <button onclick="winGame(40)">
                    🌿 Healing Herb
                </button>

                <button onclick="wrongAnswer()">
                    ✨ Stardust
                </button>
            </div>
        `;
    }

    if (type === "memory") {
        game.innerHTML = `
            <div class="mini-game">
                <h2>🧠 Memory Garden</h2>
                <p>Remember this magical sequence:</p>

                <h1>🌸 🦋 ⭐ 🌙</h1>

                <button onclick="winGame(50)">
                    🌸 🦋 ⭐ 🌙
                </button>

                <button onclick="wrongAnswer()">
                    🌙 ⭐ 🦋 🌸
                </button>

                <button onclick="wrongAnswer()">
                    ⭐ 🌸 🌙 🦋
                </button>
            </div>
        `;
    }
}

function winGame(reward) {
    coins += reward;

    crowns += 1;

    alert(
        "🎉 Challenge Complete!\n\n" +
        "🪙 +" + reward + " coins!\n" +
        "👑 +1 crown!"
    );

    checkLevel();
    updateStats();

    document.getElementById("game").innerHTML = `
        <div class="mini-game">
            <h2>✨ You did it!</h2>
            <p>Challenge complete! 🌸</p>

            <button onclick="openLocation('activities')">
                🎮 Play Again
            </button>

            <button onclick="backToAcademy()">
                🏰 Academy Map
            </button>
        </div>
    `;
}

function wrongAnswer() {
    alert("❌ Not quite! Try again! ✨");
}

function generateArt() {
    const input = document.getElementById("prompt");
    const result = document.getElementById("artResult");

    if (!input || !result) {
        return;
    }

    const prompt = input.value.trim();

    if (!prompt) {
        result.innerHTML =
            "<p>🌸 Describe your magical artwork first!</p>";

        return;
    }

    result.innerHTML = `
        <div class="mini-game">
            <h3>🎨 Your Dream Artwork</h3>
            <p>✨ ${prompt}</p>
            <p>🌟 Your magical artwork idea has been created!</p>
        </div>
    `;

    earn(20, "You created a new piece of artwork!");
}

function newDay() {
    coins += 10;

    updateStats();

    alert(
        "🌅 A brand new perfect day begins!\n\n" +
        "🪙 +10 welcome coins!"
    );

    enterAcademy();
}

document.addEventListener("DOMContentLoaded", function() {
    updateStats();
    updateCollection();
});
