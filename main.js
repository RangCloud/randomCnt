let number = 0;
let playButton = document.getElementById("startBtn"); // 시작버튼
let resetButton = document.getElementById("resetBtn"); // 리셋버튼
let userInput = document.querySelector("#user-input"); // 유져 입력
let resultText = document.querySelector("#result-text"); // 눌렀을 때 나오는 말
let chanceArea = document.getElementById("chance-area");
let gameOver = false; // 초기 게임오버 아닌 상태
let ctn = 5; // 남은 기회
let userValueList = []; // 유저가 입력한 숫자들 리스트

chanceArea.innerHTML = `Count : ${ctn}`;
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", focusInput);

function pickRandomNumber() {
  // 랜덤숫자 뽑기

  number = Math.floor(Math.random() * 100) + 1;
  console.log("정답", number);
}

let imgDisplay1 = document.getElementById("up-yellow");
let imgDisplay2 = document.getElementById("down-yellow");

function play() {
  // 숫자 추측하기
  const userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
    resultText.textContent = "only 1 ~ 100";
    return;
  }

  if (userValueList.includes(userValue)) {
    resultText.textContent = "Number already entered.";
    return;
  }

  ctn--;
  chanceArea.innerHTML = `Count : ${ctn}`;
  userValueList.push(userValue);

  if (userValue < number) {
    imgDisplay1.style.display = "block";
    imgDisplay2.style.display = "none";
    resultText.textContent = "Up!"; // 낮을 때
  } else if (userValue > number) {
    imgDisplay1.style.display = "none";
    imgDisplay2.style.display = "block";
    resultText.textContent = "Down!"; // 높을 때
  } else {
    resultText.textContent = "Good!";
    imgDisplay1.style.display = "none";
    imgDisplay2.style.display = "none";
    gameOver = true; // 정답
  }

  if (ctn == 0) {
    gameOver = true;
    resultText.textContent = "Again..";
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function focusInput() {
  userInput.value = ""; // 입력한 숫자 없애기
}

function reset() {
  //리셋
  pickRandomNumber();
  userInput.value = "";
  resultText.textContent = "only 1 ~ 100 Good Luck!";
  gameOver = false;
  playButton.disabled = false;
  imgDisplay2.style.display = "none";
  imgDisplay1.style.display = "none";
  ctn = 5;
  chanceArea.innerHTML = `Count : ${ctn}`;
  userValueList = [];
}

pickRandomNumber();
