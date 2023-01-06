import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        async function fetchDeck(){
            let deckResult = await axios.get(`${BASE_URL}/new/shuffle`);
            setDeck(deckResult.data);
        }
        fetchDeck();
    }, [setDeck]);

    useEffect(() => {
        async function fetchCard(){
            let deck_id = deck.deck_id;

            try {
                let cardResult = await axios.get(`${BASE_URL}/${deck_id}/draw`);

                if (cardResult.data.remaining === 0) {
                    setAutoDraw(false);
                    throw new Error("Error: no cards remaining!")
                }

                const card = cardResult.data.cards[0];

                setDrawn(d => [
                    ...d, 
                    {
                        id: card.code,
                        name: `${card.suit} ${card.value}`,
                        image: card.image
                    }
                ]);
            } catch (err){
                alert(err);
            }
        }

        if (autoDraw && !timerRef.current){
            timerRef.current = setInterval(async ()=>{
                await fetchCard();
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };
        
    }, [autoDraw, setAutoDraw, deck]);

    const toggleAutoDraw = () =>{
        setAutoDraw(auto => !auto);
    }

    const cards = drawn.map(c => (
        <Card 
            key={c.id}
            name={c.name}
            image={c.image} />
    ));

    return (
        <div className="Deck">
            {deck ? (
                <button className="Deck-draw" onClick={toggleAutoDraw}>
                    {autoDraw ? "Stop" : null} Auto-Draw
                </button>
            ) : null}
            <div className="Deck-result">{cards}</div>
        </div>
    );
};

export default Deck;