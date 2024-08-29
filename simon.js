let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let highScore = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// any key prees to start

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

// flash the button

function autoFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 400);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 400);
}

//  level up

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // rendom color

  let randomIndex = Math.floor(Math.random() * 3);
  let randomColor = btns[randomIndex];
  let randomButton = document.querySelector(`.${randomColor}`);

  gameSeq.push(randomColor);
  autoFlash(randomButton);
}

// button press

function checkAns(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    score = level - 1;
    highScore.push(score);
    let highValue = Math.max(...highScore);
    // let highscoreDisplay = highScore.reduce((max, el) => {
    //   if (max < el) {
    //     return el;
    //   } else {
    //     return max;
    //   }
    // });
    h2.innerHTML = `Game Over ! <br><b>Your score : ${score}</b><br><b>Highscore : ${highValue}</b><br>Press Any Key to Start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 300);
    reset();
  }
}

function btnPress() {
  let x = this;
  userFlash(x);

  userColor = x.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
