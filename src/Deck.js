import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/"

const Deck = () => {
    const [deck, setDeck] = useState();
    const [card, setCard] = useState();

    // const startNewDeck = () => {

    // };

    // const newCard = card => {
    //     let newCard = {...card, id:uuid()};
    //     setCard(cards => [...cards, newCard]);
    // };

    useEffect(() => {
        async function fetchCard(){
            const cardResult = await axios.get(`${BASE_URL}`);
            // add remaining url for get request here
            setCard(cardResult.data);
        }
        fetchCard();
    }, [card]);

    useEffect(() => {
        async function fetchDeck(){
            const deckResult = await axios.get(`${BASE_URL}`);
            // add remaining url for get request here
            setDeck(deckResult.data);
        }
        fetchDeck();
    }, [deck]);

    return (
        <div className="Deck">
            <Card />
            {deck ? deck : ''}
        </div>
    );
};

export default Deck;

// no deck is displayed on load
// first button click loads new deck with first card
// following button clicks load same deck with new cards