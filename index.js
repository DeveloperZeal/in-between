const gameContainerEl = document.getElementById("game-container");
const messageEl = document.getElementById("message");
const startGameBtn = document.getElementById("start-game-btn");
const firstCardBtn = document.getElementById("firstCard-btn");
const secondCardBtn = document.getElementById("secondCard-btn");
const thirdCardBtn = document.getElementById("thirdCard-btn");
const firstCardEl = document.getElementById("firstCard-El");
const secondCardEl = document.getElementById("secondCard-El");
const possibleCardsContainerEl = document.getElementById("possible-cards-container");
const resetBtn = document.getElementById("reset-btn");
const betInput = document.getElementById("bet-input");

let firstCard = null;
let secondCard = null;
let thirdCard = null;
let gameActive = false;
let firstCardValue = null;
let secondCardValue = null;
let thirdCardValue = null;
let betAmount = 0;

let cardsDrawn = [];

const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

const cardValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 1,
}

const drawCard = () => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

function calculatePossibleCards() {
  firstCardValue > secondCardValue ? [firstCardValue, secondCardValue] = [secondCardValue, firstCardValue] : null;

  let possibleCardsInBetween = [];

  if (firstCardValue + 1 === secondCardValue) {
    possibleCardsContainerEl.textContent = `No possible cards in between ${firstCard} and ${secondCard}.`;
    return;
  }

  for (let i = firstCardValue+1; i < secondCardValue; i++) {
    possibleCardsInBetween.push(i);
  }

  possibleCardsContainerEl.textContent = `Possible cards in between: ${possibleCardsInBetween.join(", ")}`;
}

gameContainerEl.style.display = "none";

startGameBtn.addEventListener("click", () => {
  gameActive = true;
  gameContainerEl.style.display = "block";
  messageEl.textContent = "Game started! Draw the first card.";
  firstCardBtn.disabled = false;
  secondCardBtn.disabled = true;
  thirdCardBtn.disabled = true;
});

firstCardBtn.addEventListener("click", () => {
  if (!gameActive) return;
  firstCard = drawCard();
  firstCardValue = cardValues[firstCard];
  cardsDrawn.push(firstCard);
  firstCardEl.textContent = `${firstCard}`;
  firstCardBtn.disabled = true;
  secondCardBtn.disabled = false;
}
);

secondCardBtn.addEventListener("click", () => {
  if (!gameActive) return;
  secondCard = drawCard();
  secondCardValue = cardValues[secondCard];
  cardsDrawn.push(secondCard);
  secondCardEl.textContent = `${secondCard}`;
  secondCardBtn.disabled = true;
  thirdCardBtn.disabled = false;

  calculatePossibleCards();
});

thirdCardBtn.addEventListener("click", () => {
  if (!gameActive) return;
  thirdCard = drawCard();
  thirdCardValue = cardValues[thirdCard];
  // read and sanitize bet amount at the moment of evaluation
  betAmount = Number(betInput.value) || 0;
  if ( (thirdCardValue > Math.min(firstCardValue, secondCardValue)) && (thirdCardValue < Math.max(firstCardValue, secondCardValue)) ) {
    messageEl.textContent = `You drew ${thirdCard}. You win : ${betAmount*2}`;
  } else {
    messageEl.textContent = `You drew ${thirdCard}. You lose! It is not in between ${firstCard} and ${secondCard}.`;
  }
  thirdCardBtn.disabled = true;
  gameActive = false;
});

resetBtn.addEventListener("click", () => {
  firstCard = null;
  secondCard = null;
  thirdCard = null;
  firstCardValue = null;
  secondCardValue = null;
  thirdCardValue = null;
  cardsDrawn = [];
  firstCardEl.textContent = "?";
  secondCardEl.textContent = "?";
  possibleCardsContainerEl.textContent = "";
  messageEl.textContent = "Game reset! Click 'Start Game' to play again.";
  gameActive = false;
  gameContainerEl.style.display = "none";
});
