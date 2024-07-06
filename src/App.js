import React from 'react';
import './App.css';
import Joke from './components/Joke';

function App() {
  return (
    <div className="App">
      <h2>Random Joke Generator</h2>
      <Joke />
    </div>
  );
}

export default App;
