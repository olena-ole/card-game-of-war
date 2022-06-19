'use strict';

let deckId;
const newDeckBtn = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw');

function getNewDeck() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => deckId = data.deck_id);
};

function drawNewCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => console.log(data));
}

newDeckBtn.addEventListener('click', getNewDeck);
drawBtn.addEventListener('click', drawNewCards);