var sequence = [];
var userSequence = [];
var scoreCount = 0;
var green = document.getElementById("green");
var red = document.getElementById("red");
var yellow = document.getElementById("yellow");
var blue = document.getElementById("blue");
var score = document.getElementById("score");
var state = document.createElement("p");
state.id = "state";
var btnContainer = document.querySelector(".btnContainer");

function handleDivClick(event) {
  const div = event.target;
  const color = div.id;

  userSequence.push(color);
  checkUserSequence();

  switch (color) {
    case 'blue':
      playAudio('wav/blue.wav');
      highlightColor(blue, 'rgba(0, 0, 255, 0.7)');
      break;
    case 'red':
      playAudio('wav/red.wav');
      highlightColor(red, 'rgba(255, 0, 0, 0.7)');
      break;
    case 'green':
      playAudio('wav/green.wav');
      highlightColor(green, 'rgba(0, 255, 0, 0.7)');
      break;
    case 'yellow':
      playAudio('wav/yellow.wav');
      highlightColor(yellow, 'rgba(255, 255, 0, 0.7)');
      break;
  }
}

function highlightColor(div, color) {
  div.style.boxShadow = `0 0 15px 10px ${color}`;
  setTimeout(() => {
    div.style.boxShadow = '';
  }, 500);
}

function playAudio(audioFile) {
  const audio = new Audio(audioFile);
  audio.currentTime = 0;
  audio.play();
}

document.querySelectorAll('.colors').forEach(div => {
  div.addEventListener('click', handleDivClick);
});

function randomKey() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function gameKey() {
  let key = randomKey();
  sequence.push(key);
  userSequence = [];
  state.innerText = "";
  playSequence();
}

function playSequence() {
  sequence.forEach((color, index) => {
    setTimeout(() => {
      switch (color) {
        case 'blue':
          highlightColor(blue, 'rgba(0, 0, 255, 0.7)');
          playAudio('wav/blue.wav');
          break;
        case 'red':
          highlightColor(red, 'rgba(255, 0, 0, 0.7)');
          playAudio('wav/red.wav');
          break;
        case 'green':
          highlightColor(green, 'rgba(0, 255, 0, 0.7)');
          playAudio('wav/green.wav');
          break;
        case 'yellow':
          highlightColor(yellow, 'rgba(255, 255, 0, 0.7)');
          playAudio('wav/yellow.wav');
          break;
      }
    }, index * 1000);
  });
}

function checkUserSequence() {
  const currentIndex = userSequence.length - 1;

  if (userSequence[currentIndex] !== sequence[currentIndex]) {
    state.style.backgroundColor = "red";
    state.innerText = "Wrong sequence! Try again.";
    btnContainer.appendChild(state);
    setTimeout(() => {
      state.remove();
      resetGame();
    }, 2000);

  } else if (userSequence.length === sequence.length) {
    scoreCount += 10;
    score.innerText = scoreCount;
    state.style.backgroundColor = "green";
    state.innerText = "Correct! Get ready for the next round.";
    btnContainer.appendChild(state);
    setTimeout(() => {
      state.remove();
      gameKey();
    }, 2000);
  }
}

function resetGame() {
  sequence = [];
  userSequence = [];
  scoreCount = 0;
  score.innerText = "0";
}
