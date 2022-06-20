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

function drawNewCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards);
            renderCards(data.cards);
        });
}

newDeckBtn.addEventListener('click', getNewDeck);
drawBtn.addEventListener('click', drawNewCards);