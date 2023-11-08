import React, { useState } from 'react';
import './App.css';
const ModerationComponent = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);


  const handleInputChange = (e) => {
    setText(e.target.value);
    const newHeight = e.target.scrollHeight > 30 ? '90px' : '30px'; // Adjust the heights as needed
    e.target.style.height = newHeight;
  };

//this is the function that calls the api when "Check Moderation" is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      //please change the api key haha
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
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
      <div className="searchbox">
        <form onSubmit={handleSubmit}>
          <textarea className='userInput' placeholder="write a sentence for program to detect" value={text} onChange={handleInputChange}  />
          <button type="submit" className='submit-btn'>Check Moderation</button>
        </form>
      </div>

      {results && (
        <div>
          <div>
            <h2>Results:</h2>
            <h3>Moderation Message:</h3>
            <p>{getCategoryMessage()}</p>
              <div className="reder_result">
                {/*render the JSON as string format*/}
                <pre>{JSON.stringify(results, null, 2)}</pre>
              </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ModerationComponent;
