let startTime;
let updatedTime;
let difference = 0;
let timerInterval;
let isRunning = false;
let laps = [];

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

function updateDisplay() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(difference / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % 1000));

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds = milliseconds.toString().padStart(3, "0");

  display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(updateDisplay, 10);
  }
});

pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
  difference = 0;
  display.textContent = "00:00:00:000";
  laps = [];
  lapsList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    laps.push(display.textContent);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${laps.length}: ${display.textContent}`;
    lapsList.appendChild(lapItem);
  }
});
