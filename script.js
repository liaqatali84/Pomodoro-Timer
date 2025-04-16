/ script.js
let workTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = workTime;
let isRunning = false;
let isWorkSession = true;
let timerInterval;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');
const applySettingsBtn = document.getElementById('applySettings');
const statusText = document.getElementById('status');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimer() {
    timerDisplay.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isWorkSession = !isWorkSession;
        timeLeft = isWorkSession ? workTime : breakTime;
        statusText.textContent = isWorkSession ? 'Work Session' : 'Break Session';
        timerDisplay.textContent = formatTime(timeLeft);
        startTimer();
    }
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
}

function resetTimer() {
    pauseTimer();
    isWorkSession = true;
    timeLeft = workTime;
    statusText.textContent = 'Work Session';
    timerDisplay.textContent = formatTime(timeLeft);
}

function applySettings() {
    const newWorkTime = parseInt(workTimeInput.value) * 60;
    const newBreakTime = parseInt(breakTimeInput.value) * 60;
    if (newWorkTime > 0 && newBreakTime > 0) {
        workTime = newWorkTime;
        breakTime = newBreakTime;
        if (isWorkSession) {
            timeLeft = workTime;
        } else {
            timeLeft = breakTime;
        }
        resetTimer();
    } else {
        alert('Please enter valid time values.');
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
applySettingsBtn.addEventListener('click', applySettings);

timerDisplay.textContent = formatTime(timeLeft);
