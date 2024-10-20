import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookRatings from './components/BookRatings';



function App() {
  const arr = [];
  for (let i = 0; i < 90; i++) {
    arr.push(i);
  }
  return (
    <div className="App">
      <header className="App-header">Ben's Book Recommendations</header>
      <BookRatings  />
    </div>
  );
}

export default App;
