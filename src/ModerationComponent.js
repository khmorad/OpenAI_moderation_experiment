import React, { useState } from 'react';

const ModerationComponent = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);


  //just used to get the text from the input box
  const handleInputChange = (e) => {
    setText(e.target.value);
  };


//this is the function that calls the api when "Check Moderation" is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      //please change the api key haha
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer API_KEY_HERE'
      },
      body: JSON.stringify({ input: text })
    });

    const data = await response.json();
    setResults(data.results[0]);
  };


  //displays message if they are flagged
  const getCategoryMessage = () => {
    const categories = results.categories;
    //use Object.entries to take the object and return array of its key value pairs as arrays
    //and used map to iterate over each array
    
    const messages = Object.entries(categories).map(([category, flagged]) => {
      if (flagged) {
        return <p key={category}>This comment is considered to be {category}</p>;
      }
      // make the none flag categories null
      return null; 
    });
  
    return messages;
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
           {/*render the JSON as string format*/}
          <pre>{JSON.stringify(results, null, 2)}</pre>
          <h3>Moderation Message:</h3>
          <p>{getCategoryMessage()}</p>
        </div>
      )}
    </div>
  );
};

export default ModerationComponent;
