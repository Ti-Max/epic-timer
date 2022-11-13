const timer = document.getElementById("timer");
const waitMargin = 0.3;

let time = 0.0;

// timers
let timerInterval;
let readyTimeout;

let isRunning = false;
let isWaited = false;
let isTouched = false;

document.addEventListener("keydown", (event) => {
  if (event.keyCode !== 32) return;

  if (isRunning) {
    // Stop timer
    clearInterval(timerInterval);
    timer.innerText = formatTime(time, 2);
    isTouched = false;
    isWaited = false;
    timer.style.color = "red";

    //Send solve to the database
    if (!event.repeat) commitSolve();
  } else if (!isTouched) {
    // Timer touched
    isTouched = true;
    timer.style.color = "red";

    readyTimeout = setTimeout(function () {
      // Timer ready
      timer.innerText = "0.00";
      timer.style.color = "green";
      isWaited = true;
    }, waitMargin * 1000);
  }
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode !== 32) return;

  // Check if timer is running
  if (isRunning === false) {
    if (!isWaited) {
      // Waited not long enough!
      clearTimeout(readyTimeout);
      timer.style.color = textColor;
      isTouched = false;
      return;
    }

    // Start timer!
    time = 0;
    timerInterval = setInterval(tick, 10);
    isRunning = true;
    timer.style.color = textColor;
  } else {
    // Timer button released after timer stop
    timer.style.color = textColor;
    isRunning = false;
  }
});

function commitSolve() {
  updateScramble();

  fetch("/commitSolve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      time: time.toFixed(2),
      category: "overall",
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      document.getElementById("solves").insertAdjacentHTML(
        "afterbegin",
        `
      <div class="flex" id="containerSolve${response.id}">
        <img src="./images/trashbin.svg" class="w-7 opacity-0 transition-all hover:cursor-pointer" id="trashbin${
          response.id
        }" onclick="deleteSelectedSolves()">
        <input type="checkbox" id="checkboxSolve${
          response.id
        }" class="hidden" onchange="selectSolve(${response.id})">
        <label for="checkboxSolve${
          response.id
        }" class="flex p-1 pl-2 pr-2 m-1 rounded-md bg-tertiary  justify-between hover:bg-secondaryAlt hover:cursor-pointer" id="boxSolve${
          response.id
        }">
          <div class="text-xs align-text-top text-secondary">#${
            document.getElementById("solves").childElementCount + 1
          }</div>
          <div class="text-base ml-1">${formatTime(time, 2)}</div>
        </label>
      </div>
      `
      );
      document.getElementById("ao5").innerText =
        response.ao5 !== 0 ? response.ao5.toFixed(2) : "-";
      document.getElementById("ao12").innerText =
        response.ao12 !== 0 ? response.ao12.toFixed(2) : "-";
    })
    .catch((err) => console.log(err));
}

function tick() {
  time += 0.01;
  timer.innerText = formatTime(time, 1);
}

function formatTime(time, toFixed) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - minutes * 60 - hours * 3600;

  // seconds
  let text = seconds.toFixed(toFixed);

  // minutes
  if (minutes > 0) {
    if (seconds < 10) {
      text = "0" + text;
    }

    text = minutes + ":" + text;
  }

  // hours
  if (hours > 0) {
    if (minutes < 10) {
      text = "0" + text;
    }

    text = hours + ":" + text;
  }

  return text;
}

const selectedSolves = [];
let firstSelectedSolve;

function selectSolve(id) {
  const solve = document.getElementById("checkboxSolve" + id);
  const boxSolve = document.getElementById("boxSolve" + id);
  console.log("here");
  // remove solve from selected
  if (solve.checked === false) {
    unCheck();

    // Unchecked all
    if (selectedSolves.length === 0) {
      document.getElementById("trashbin" + firstSelectedSolve).style.opacity =
        "0%";
      return;
    }
  } else {
    // first selected solve
    if (selectedSolves.length === 0) {
      firstSelectedSolve = id;
      document.getElementById("trashbin" + id).style.opacity = "100%";
    }

    // select this solve border-text border-2 bg-secondaryAlt
    check(id);
  }

  function check(id) {
    selectedSolves.push(id);
    boxSolve.classList.add("selected-solve");
  }

  function unCheck(id) {
    const index = selectedSolves.indexOf(id);
    selectedSolves.splice(index, 1);
    boxSolve.classList.remove("selected-solve");
  }
}

function deleteSelectedSolves() {
  // Remove from database
  fetch("/deleteSolves", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      solves: selectedSolves,
      category: "overall",
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      document.getElementById("ao5").innerText =
        response.ao5 !== undefined && response.ao5 !== 0
          ? response.ao5.toFixed(2)
          : "-";
      document.getElementById("ao12").innerText =
        response.ao12 !== undefined && response.ao12 !== 0
          ? response.ao12.toFixed(2)
          : "-";
    })
    .catch((err) => console.log(err));

  // Remove from HTML
  for (let i = 0; i < selectedSolves.length; i++) {
    const elem = document.getElementById("containerSolve" + selectedSolves[i]);
    elem.parentNode.removeChild(elem);
  }

  selectedSolves.length = 0;
}
