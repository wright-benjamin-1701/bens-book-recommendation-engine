import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookRatings from './components/BookRatings';

const shuffle = (array: number[]) => { 
  return array.sort(() => Math.random() - 0.5); 
}; 

function App() {
  const arr = [];
  for (let i = 0; i < 90; i++) {
    arr.push(i);
  }
  return (
    <div className="App">
      <header className="App-header">Ben's Book Recommendations</header>
      <BookRatings indices = {shuffle(arr).slice(0,15)} />
    </div>
  );
}

export default App;
