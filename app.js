const WORK_TIME = 25 * 60; // in seconds
const SHORT_BREAK_TIME = 5 * 60; // in seconds
const LONG_BREAK_TIME = 15 * 60; // in seconds
const WORK_PHASE = "Work";
const SHORT_BREAK_PHASE = "Short Break";
const LONG_BREAK_PHASE = "Long Break";

let timerDisplay = document.getElementById("timer-display");
let startButton = document.getElementById("start-button");
let resetButton = document.getElementById("reset-button");
let audio = new Audio("notification.mp3");

let timer;
let timeLeft = WORK_TIME;
let phase = WORK_PHASE;
let pomodoroCount = 0;

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

function startTimer() {
  timer = setInterval(updateTimer, 1000); // update timer every second
  startButton.disabled = true;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = WORK_TIME;
  phase = WORK_PHASE;
  pomodoroCount = 0;
  updateTimerDisplay();
  startButton.disabled = false;
}

function updateTimer() {
  timeLeft--;
  if (timeLeft === 0) {
    clearInterval(timer);
    if (phase === WORK_PHASE) {
      pomodoroCount++;
      if (pomodoroCount % 4 === 0) {
        timeLeft = LONG_BREAK_TIME;
        phase = LONG_BREAK_PHASE;
      } else {
        timeLeft = SHORT_BREAK_TIME;
        phase = SHORT_BREAK_PHASE;
      }
      audio.play(); // play notification sound
    } else {
      timeLeft = WORK_TIME;
      phase = WORK_PHASE;
      audio.play(); // play notification sound
    }
    updateTimerDisplay();
    startButton.disabled = false;
  } else if (timeLeft === 60) {
    audio.play(); // play notification sound
    updateTimerDisplay();
  } else {
    updateTimerDisplay();
  }
}

function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.innerHTML = `${phase}: ${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}
