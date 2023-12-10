document.addEventListener("DOMContentLoaded", function () {
  let timerValues = [
    { h: 0, m: 0, s: 5, timerId: null },
    { h: 0, m: 0, s: 30, timerId: null },
    { h: 5, m: 0, s: 0, timerId: null },
  ];
  let timerReset = [
    { h: 0, m: 1, s: 0, timerId: null },
    { h: 0, m: 0, s: 30, timerId: null },
    { h: 5, m: 0, s: 0, timerId: null },
  ];

  function addZero(value) {
    return value < 10 ? "0" + value : value;
  }

  function timerTick(index) {
    let timer = timerValues[index];
    if (timer.h === 0 && timer.m === 0 && timer.s === 0) {
      clearInterval(timer.timerId);
      timer.timerId = null;
      timerUpdate(index);
    } else {
      timer.s--;
      if (timer.s < 0) {
        timer.m--;
        timer.s = 59;
      }
      if (timer.m < 0) {
        timer.h--;
        timer.m = 59;
      }
      timerUpdate(index);
    }
  }

  function timerUpdate(index) {
    let timer = timerValues[index];
    let timerNewValue = {
      h: addZero(timer.h),
      m: addZero(timer.m),
      s: addZero(timer.s),
    };
    document
      .querySelectorAll(`.timer`)
      [index].querySelector(
        ".tablo"
      ).innerHTML = `${timerNewValue.h}:${timerNewValue.m}:${timerNewValue.s}`;
  }

  function resetTimer(index) {
    clearInterval(timerValues[index].timerId);
    timerValues[index] = {
      h: timerReset[index].h,
      m: timerReset[index].m,
      s: timerReset[index].s,
      timerId: null,
    };
    timerUpdate(index);
    document
      .querySelectorAll(`.timer`)
      [index].querySelector(".startButton")
      .removeAttribute("disabled");
    document
      .querySelectorAll(`.timer`)
      [index].querySelector(".stopButton")
      .setAttribute("disabled", "disabled");
  }

  document.documentElement.addEventListener("click", function (event) {
    let parentTimerDiv = event.target.closest(".timer");
    if (parentTimerDiv !== null) {
      let startButton = parentTimerDiv.querySelector(".startButton");
      let stopButton = parentTimerDiv.querySelector(".stopButton");
      let resetButton = parentTimerDiv.querySelector(".resetButton");
      let currentTimerIndex = Array.from(
        parentTimerDiv.parentElement.children
      ).indexOf(parentTimerDiv);

      if (event.target.classList.contains("startButton")) {
        if (timerValues[currentTimerIndex].timerId === null) {
          timerValues[currentTimerIndex].timerId = setInterval(
            () => timerTick(currentTimerIndex),
            1000
          );
          startButton.setAttribute("disabled", "disabled");
          stopButton.removeAttribute("disabled");
        }
      }
      if (event.target.classList.contains("stopButton")) {
        clearInterval(timerValues[currentTimerIndex].timerId);
        timerValues[currentTimerIndex].timerId = null;
        startButton.removeAttribute("disabled");
        stopButton.setAttribute("disabled", "disabled");
      }
      if (event.target.classList.contains("resetButton")) {
        resetTimer(currentTimerIndex);
      }
    }
  });

  timerValues.forEach((timer, index) => {
    timerUpdate(index);
  });
});
