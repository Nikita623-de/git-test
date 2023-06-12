const cards = document.querySelectorAll(".card-item");
const time = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");
const restartBtn = document.querySelector(".restart");

let maxTime = 60;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
  if (timeLeft <= 0) {
    return clearInterval(timer);
  }
  timeLeft--;
  time.innerText = timeLeft;
}

function flipCard(e) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
  }
  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
    flips++;
    flipsTag.innerText = flips;
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return cardOne = clickedCard;
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 12 && timeLeft > 0) {
      return clearInterval(timer);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return disableDeck = false;
  }

  setTimeout(() => {
    cardOne.classList.add("false");
    cardTwo.classList.add("false");
  }, 300);

  setTimeout(() => {
    cardOne.classList.remove("false", "flip");
    cardTwo.classList.remove("false", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 800);
}

function shuffleCard() {
  timeLeft = maxTime;
  flips = matchedCard = 0;
  cardOne = cardTwo = "";
  clearInterval(timer);
  time.innerText = timeLeft;
  flipsTag.innerText = flips;
  disableDeck = isPlaying = false;

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  arr.sort(() => Math.random() > 0.5 ? 1 : -1);

  cards.forEach((cardItem, index) => {
    cardItem.classList.remove("flip");
    let img = cardItem.querySelector(".back-view img");
    setTimeout(() => {
      img.src = `images/${arr[index]}.png`;
    }, 500);
    cardItem.addEventListener("click", flipCard);
  });
}

shuffleCard();

restartBtn.addEventListener("click", shuffleCard);

cards.forEach(cardItem => {
  cardItem.addEventListener("click", flipCard);
});