'use strict';

let deckId;
const newDeckBtn = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw');
const cardsWrapper = document.getElementById('cards-wrapper');

function getNewDeck() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => deckId = data.deck_id);
};

function renderCards(arr) {
    let cardsHtml = '';
    for (let card of arr) {
        cardsHtml += `
            <img src="${card.image}" alt ="">
        `
    }
    cardsWrapper.innerHTML = cardsHtml;
}

function drawNewCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => renderCards(data.cards));
}

newDeckBtn.addEventListener('click', getNewDeck);
drawBtn.addEventListener('click', drawNewCards);