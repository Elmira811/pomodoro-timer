const timer = document.querySelector('#pomodoro-time');
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const pomodoroBtn = document.querySelector('#pomodoro');
const breakBtn = document.querySelector('#break');

let totalTime;
let isStarted = false;
let pomodoroTimerId;
let currentMode;

pomodoroBtn.addEventListener('click', function() {
  
  currentMode = 'pomodoro';

  pomodoroBtn.classList.add('active');
  breakBtn.classList.remove('active');

  stopTimer(); 
  resetTimer();
});

breakBtn.addEventListener('click', function() {
  
  currentMode = 'break';

  breakBtn.classList.add('active');
  pomodoroBtn.classList.remove('active');

  stopTimer(); 
  resetTimer();
});

startBtn.addEventListener('click', function() {
  if (isStarted) {
    stopTimer();
  } else {  
    isStarted = true;

    startBtn.textContent = 'stop';

    pomodoroTimerId = setInterval(() => {
      totalTime --;
    
      updateTimer();
    
      if (totalTime <= 0) {
        stopTimer();
        resetTimer();
      }
    
    }, 10);
  }
})

resetBtn.addEventListener('click', function() {
  stopTimer();
  resetTimer();
});

function updateTimer() {
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  timer.textContent = `${format(minutes)}:${format(seconds)}`;
}

function format(val) {
  if (val < 10) {
    return `0${val}`;
  }

  return val;
}

function stopTimer() {
  clearInterval(pomodoroTimerId);

  isStarted = false;

  startBtn.textContent = 'start';
}

function resetTimer() {
  totalTime = currentMode === 'pomodoro' ? 1500 : 300;
  updateTimer();
}
