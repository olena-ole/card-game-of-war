'use strict';

let deckId;
const newDeckBtn = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw');
const cardSlots = document.querySelectorAll('.card-slot');
const resultTitle = document.getElementById('result-tite');
const remainingCards = document.getElementById('remaining-cards')

function getNewDeck() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id;
            remainingCards.textContent = `Remaining cards: ${data.remaining}`;
            drawBtn.disabled = false;
        });
};

function renderCards(arr) {
    for (let i = 0; i < cardSlots.length; i++) {
        cardSlots[i].innerHTML = `
            <img src="${arr[i].image}" alt ="">
        `;
    };
};

function stringToNum(str) {
    switch (str) {
        case "ACE":
            return 14;
        case "KING":
            return 13;
        case "QUEEN":
            return 12;
        case "JACK":
            return 11;
        default:
            return +str;
    };
};

function defineWinner(arr) {
    const card1 = stringToNum(arr[0].value);
    const card2 = stringToNum(arr[1].value);
    if (card1 > card2) {
        resultTitle.textContent = 'Computer wins!';
    } else if (card2 > card1) {
        resultTitle.textContent = 'You win!';
    } else {
        resultTitle.textContent = "War!";
    };
};

function drawNewCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            defineWinner(data.cards);
            renderCards(data.cards);
            remainingCards.textContent = `Remaining cards: ${data.remaining}`;

            if (data.remaining === 0) {
                drawBtn.disabled = true;
            }
        });
};

newDeckBtn.addEventListener('click', getNewDeck);
drawBtn.addEventListener('click', drawNewCards);