// Test.js

import React, { useState } from 'react';

const Test = () => {
  const [inputString, setInputString] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    setInputString(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Make a POST request to the Flask backend
      const response = await fetch('http://localhost:5030/process-string', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_string: inputString }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is the Test page. Welcome!</p>

      <div>
        <label>
          Enter a string:
          <input type="text" value={inputString} onChange={handleInputChange} />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {result && (
        <div>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Test;
