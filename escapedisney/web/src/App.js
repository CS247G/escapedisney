import React from 'react';
import './App.css';
import LogoFinder from './components/toontown/LogoFinder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Disney Escape Room</h1>
      </header>
      <main>
        <LogoFinder />
      </main>
      <footer>
        <p>Disney Escape Room Team - 2025</p>
      </footer>
    </div>
  );
}

export default App;