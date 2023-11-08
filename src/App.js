import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import ModerationComponent from './ModerationComponent';
//this is the main app component i only added the ModerationComponent to it
function App() {
  return (
    <div className="App">
      <h1>OpenAI Moderation Example</h1>
      
      <ModerationComponent />
     
    </div>
  );
}

export default App;