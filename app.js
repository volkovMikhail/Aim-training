const startBtn = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
let time = 0;
let score = 0;

startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
    if (e.target.classList.contains("time-btn")) {
        time = +e.target.getAttribute("data-time");
        screens[1].classList.add("up");
        startGame();
    }
});

board.addEventListener("click", (e) => {
    if (e.target.classList.contains("circle")) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    setTime(time);
    createRandomCircle();
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        setTime(--time);
    }
}

function setTime(val) {
    let current = val;
    if (current < 10) {
        current = `00:0${current}`;
    } else {
        let mins = Math.floor(current / 60);
        let secs = current - mins * 60;
        if (mins < 10) {
            mins = `0${mins}`;
        }
        if (secs < 10) {
            secs = `0${secs}`;
        }
        current = `${mins}:${secs}`;
    }
    
    timeEl.innerHTML = current;
}

function finishGame() {
    timeEl.parentNode.classList.add("hide");
    board.innerHTML =
        //html
        `<h1>Ваш счёт: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.background = getRandomColor();
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.style.height = `${size}px`;
    circle.style.width = `${size}px`;
    circle.style.left = `${y}px`;
    circle.style.top = `${x}px`;
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor(){
    let color = `#`;
    for (let i = 0; i < 6; i++) {
        color += getRandomNumber(0,15).toString(16);
    }
    return color;
}