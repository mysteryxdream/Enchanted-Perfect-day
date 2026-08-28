// 🌸 MY PERFECT DAY — Game Logic

let coins = Number(localStorage.getItem("coins")) || 100;
let level = Number(localStorage.getItem("level")) || 1;

function updateStats() {
  const coinDisplay = document.getElementById("coins");
  const levelDisplay = document.getElementById("level");

  if (coinDisplay) coinDisplay.textContent = coins;
  if (levelDisplay) levelDisplay.textContent = level;

  localStorage.setItem("coins", coins);
  localStorage.setItem("level", level);
}

function earnCoins(amount) {
  coins += amount;

  if (coins >= level * 200) {
    level++;
    alert("✨ LEVEL UP! You are now Level " + level + "!");
  }

  updateStats();
}

function playTrial(name, reward) {
  alert("🎮 Welcome to " + name + "!");
  earnCoins(reward);
  alert("🪙 You earned " + reward + " coins!");
}

function openActivity(activity) {
  alert("✨ You opened " + activity + "!");
}

document.addEventListener("DOMContentLoaded", updateStats);
