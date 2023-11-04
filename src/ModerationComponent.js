// src/components/ModerationComponent.js

import React, { useState } from 'react';

const ModerationComponent = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
      },
      body: JSON.stringify({ input: text })
    });

    const data = await response.json();
    setResults(data.results[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={handleInputChange} />
        <button type="submit">Check Moderation</button>
      </form>

      {results && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ModerationComponent;
