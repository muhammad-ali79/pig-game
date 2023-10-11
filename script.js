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
// const players = document.querySelectorAll('.player');
const rollBtn = document.querySelector('.btn--roll');

let activePlayer, currentScore, scores, playing;

// init the game
const inint = function () {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;

  firstPlayerScore.textContent = 0;
  secondPlayerScore.textContent = 0;
  firstPlayerCurrent.textContent = 0;
  secondPlayerCurrent.textContent = 0;

  dice.classList.add('hidden');
  firstPlayer.classList.remove('player--winner');
  secondPlayer.classList.remove('player--winner');
  firstPlayer.classList.add('player--active');
  secondPlayer.classList.remove('player--active');

  rollBtn.addEventListener('click', roll);
  holdBtn.addEventListener('click', hold);
};
inint();

// roll the dice
function roll() {
  console.log(playing);
  if (playing) {
    // Generate The Random Number between 1 and 6 (6 is execulde)
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    // Show the Dice
    dice.classList.remove('hidden');
    // change the dice according to Random Number
    dice.src = `dice-${randomNumber}.png`;

    // reset all the current score to zero whenever the Random Number is 0
    if (randomNumber === 1) {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      hold();
    } else {
      // store the Random on the current Score
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
}

// switch the functionalities
function hold() {
  console.log(playing);
  if (playing) {
    firstPlayer.classList.toggle('player--active');
    secondPlayer.classList.toggle('player--active');

    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    playing = false;
    // is original score is greater or equal than 100 add winner class and remove eventlisteners
    if (scores[activePlayer] >= 10) {
      // playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      dice.classList.add('hidden');
      // remove the click btn
      // rollBtn.removeEventListener('click', roll);
      // holdBtn.removeEventListener('click', hold);
    }
    activePlayer = activePlayer === 0 ? 1 : 0;
  }
}

holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', inint);
rollBtn.addEventListener('click', roll);
