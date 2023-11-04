import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import ModerationComponent from './ModerationComponent';
function App() {
  return (
    <div className="App">
      <h1>OpenAI Moderation Example</h1>
      <ModerationComponent />
    </div>
  );
}

export default App;