import React from 'react';
import './App.css';
import Deck from './Deck';

function App() {
  return (
    <div className="App">
      <div>
        <button>New Card</button>
      </div>
      <div>
        <Deck />
      </div>
    </div>
  );
}

export default App;
