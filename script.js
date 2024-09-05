const exercises = [
  { name: 'Polichinelo', duration: 60, isExercise: true },
  { name: 'Descanso', duration: 20, isExercise: false },
  { name: 'Flexões', duration: 40, isExercise: true },
  { name: 'Descanso', duration: 20, isExercise: false },
  { name: 'Agachamentos', duration: 40, isExercise: true },
  { name: 'Descanso', duration: 20, isExercise: false },
  { name: 'Prancha', duration: 30, isExercise: true },
  { name: 'Descanso', duration: 30, isExercise: false },
  { name: 'Afundos', duration: 40, isExercise: true },
  { name: 'Descanso', duration: 20, isExercise: false },
  { name: 'Mountain Climbers', duration: 40, isExercise: true },
  { name: 'Descanso', duration: 20, isExercise: false },
  { name: 'Superman', duration: 30, isExercise: true },
  { name: 'Descanso', duration: 30, isExercise: false }
];

let currentExercise = 0;
let timeLeft = exercises[currentExercise].duration;
let timerInterval;
let isPaused = true;

const exerciseNameElem = document.getElementById('exercise-name');
const timerElem = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const alarmSound = document.getElementById('alarm-sound');
const stopAlarmBtn = document.getElementById('stop-alarm-btn'); // Botão de parar alarme

function updateTimer() {
    timerElem.textContent = timeLeft;
}

function startTimer() {
    if (isPaused) {
        isPaused = false;
        alarmSound.load(); // Carrega o som do alarme
        timerInterval = setInterval(countdown, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
}

function resetTimer() {
    pauseTimer();
    currentExercise = 0;
    timeLeft = exercises[currentExercise].duration;
    exerciseNameElem.textContent = exercises[currentExercise].name;
    hideStopAlarmButton(); // Garante que o botão de parar alarme fique oculto
    updateTimer();
}

function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
    } else {
        playAlarm();
        nextExercise();
    }
}

function nextExercise() {
    currentExercise++;
    if (currentExercise < exercises.length) {
        timeLeft = exercises[currentExercise].duration;
        exerciseNameElem.textContent = exercises[currentExercise].name;
        updateTimer();

        if (exercises[currentExercise].isExercise) {
            pauseTimer(); // Pausa automaticamente entre exercícios
        }
    } else {
        resetTimer(); // Reinicia ao final do treino
    }
}

function playAlarm() {
    // Verifica se o som está carregado corretamente e o toca
    if (alarmSound.readyState >= 2) {
        alarmSound.play().catch((error) => {
            console.log("Erro ao tocar o som de alarme: " + error);
        });
        showStopAlarmButton(); // Mostra o botão de parar alarme quando o alarme tocar
    }
}

function stopAlarm() {
    alarmSound.pause(); // Para o som do alarme
    alarmSound.currentTime = 0; // Reseta o som para o início
    hideStopAlarmButton(); // Esconde o botão de parar alarme
}

function showStopAlarmButton() {
    stopAlarmBtn.style.display = "block"; // Mostra o botão de parar alarme
}

function hideStopAlarmButton() {
    stopAlarmBtn.style.display = "none"; // Esconde o botão de parar alarme
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
stopAlarmBtn.addEventListener('click', stopAlarm); // Para o alarme quando o botão for clicado


updateTimer();