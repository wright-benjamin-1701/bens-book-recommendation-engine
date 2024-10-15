import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookRatings from './components/BookRatings';

const shuffle = (array: number[]) => { 
  return array.sort(() => Math.random() - 0.5); 
}; 

function App() {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(i);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and saves to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <BookRatings indeces = {shuffle(arr).slice(0,15)} />
    </div>
  );
}

export default App;
