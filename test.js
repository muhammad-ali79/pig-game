'use strict';
const firstPlayer = document.querySelector('.player--0');
const secondPlayer = document.querySelector('.player--1');
const firstPlayerCurrent = document.querySelector('#current--0');
const secondPlayerCurrent = document.querySelector('#current--1');
const firstPlayerScore = document.querySelector('#score--0');
const secondPlayerScore = document.querySelector('#score--1');

const dice = document.querySelector('.dice');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');

let player1 = {
  current: 0,
  score: 0,
};
let player2 = {
  current: 0,
  score: 0,
};
let playing = true;
function activePlayer() {
  // here i take the player1 and 2 based on the player--active class each btn is click this condtion is checked
  let score = firstPlayer.classList.contains('player--active')
    ? player1
    : player2;

  // update current on Ui
  let currentUi = firstPlayer.classList.contains('player--active')
    ? firstPlayerCurrent
    : secondPlayerCurrent;

  // update current on Ui
  let scoreUi = firstPlayer.classList.contains('player--active')
    ? firstPlayerScore
    : secondPlayerScore;

  let currentPlayer = firstPlayer.classList.contains('player--active')
    ? firstPlayer
    : secondPlayer;

  return { score, currentUi, scoreUi, currentPlayer };
}

const inint = function () {
  player1 = {
    current: 0,
    score: 0,
  };
  player2 = {
    current: 0,
    score: 0,
  };

  playing = true;

  firstPlayerScore.textContent = 0;
  secondPlayerScore.textContent = 0;

  dice.classList.add('hidden');
  firstPlayer.classList.remove('player--winner');
  secondPlayer.classList.remove('player--winner');
  firstPlayer.classList.add('player--active');
  secondPlayer.classList.remove('player--active');
};
inint();

// roll the dice
function roll() {
  if (playing) {
    let { score, currentUi } = activePlayer();
    // Generate The Random Number between 1 and 6 (6 is execulde)
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    // Show the Dice
    dice.classList.remove('hidden');
    // change the dice according to Random Number
    dice.src = `dice-${randomNumber}.png`;

    // reset all the current score to zero whenever the Random Number is 0
    if (randomNumber === 1) {
      score.current = 0;
      currentUi.textContent = 0;
      hold();
    } else {
      // store the Random on the current Score
      score.current += randomNumber;
      currentUi.textContent = score.current;
    }
  }
}

// switch the functionalities
function hold() {
  if (playing) {
    let { score, currentUi, scoreUi, currentPlayer } = activePlayer();

    score.score += score.current;
    scoreUi.textContent = score.score;

    score.current = 0;
    currentUi.textContent = 0;

    firstPlayer.classList.toggle('player--active');
    secondPlayer.classList.toggle('player--active');

    // is original score is greater or equal than 100 add winner class and remove eventlisteners
    if (score.score >= 10) {
      currentPlayer.classList.add('player--winner');
      dice.classList.add('hidden');
      playing = false;
    }
  }
}

holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', inint);
rollBtn.addEventListener('click', roll);
