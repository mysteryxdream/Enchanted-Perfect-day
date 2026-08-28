function startGame() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("world").classList.remove("hidden");
}

function openPlace(place) {
  document.getElementById("world").classList.add("hidden");
  document.getElementById("place").classList.remove("hidden");

  document.getElementById("placeContent").innerHTML =
    "<h2>✨ " + place.toUpperCase() + " ✨</h2>" +
    "<p>You entered the magical " + place + "!</p>" +
    "<button onclick=\"backToWorld()\">← Back</button>";
}

function backToWorld() {
  document.getElementById("place").classList.add("hidden");
  document.getElementById("world").classList.remove("hidden");
}

let playerX = 50;
let playerY = 50;

function move(direction) {
  const player = document.getElementById("player");

  if (direction === "up") playerY -= 4;
  if (direction === "down") playerY += 4;
  if (direction === "left") playerX -= 4;
  if (direction === "right") playerX += 4;

  playerX = Math.max(5, Math.min(95, playerX));
  playerY = Math.max(8, Math.min(92, playerY));

  player.style.left = playerX + "%";
  player.style.top = playerY + "%";
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") move("up");
  if (event.key === "ArrowDown") move("down");
  if (event.key === "ArrowLeft") move("left");
  if (event.key === "ArrowRight") move("right");
});
