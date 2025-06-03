import React from 'react';
import './App.css';
import Scene from './components/Scene';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NASA Satellite Tracker</h1>
      </header>
      <main>
        <Scene />
      </main>
      <footer>
        <p>Data provided by NASA/GSFC Space Physics Data Facility (SPDF)</p>
      </footer>
    </div>
  );
}

export default App;
