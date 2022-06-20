'use strict';

let deckId;
const newDeckBtn = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw');
const cardSlots = document.querySelectorAll('.card-slot');

function getNewDeck() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => deckId = data.deck_id);
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
        console.log('Computer wins!');
    } else if (card2 > card1) {
        console.log('You win!');
    } else {
        console.log('A Draw!');
    };
};

function drawNewCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            defineWinner(data.cards);
            renderCards(data.cards);
        });
};

newDeckBtn.addEventListener('click', getNewDeck);
drawBtn.addEventListener('click', drawNewCards);