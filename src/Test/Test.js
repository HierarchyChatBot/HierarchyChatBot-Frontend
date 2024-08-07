// Test.js

import React, { useState } from 'react';

const Test = () => {
  const [inputString, setInputString] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const handleInputChange = (e) => {
    setInputString(e.target.value);
  };

  // Function to compress the entire message history into a single string
  const compressMessages = (messages) => {
    return messages.map(message => `${message.sender}: ${message.text}`).join(' | ');
  };

  const handleSubmit = async () => {
    if (!inputString.trim() || isLoading) {
      // Avoid sending empty messages or submitting while already loading
      return;
    }

    // Set loading to true before making the request
    setIsLoading(true);

    // Add the user's message to the message list
    const newMessages = [
      ...messages,
      { sender: 'user', text: inputString },
    ];

    // Clear the input field
    setInputString('');

    // Compress the entire message history into a single string
    const compressedHistory = compressMessages(newMessages);

    try {
      // Make a POST request to the Flask backend with the compressed conversation history
      const response = await fetch('http://localhost:5030/process-string', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_string: compressedHistory }), // Send compressed string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Add the backend's response to the message list
      setMessages([
        ...newMessages,
        { sender: 'bot', text: data.result },
      ]);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);

      // Optionally add an error message to the chat
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'There was an error processing your request.' },
      ]);
    } finally {
      // Set loading to false regardless of the request outcome
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Chatbot Interface</h1>
      <div style={styles.chatContainer}>
        <div style={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: message.sender === 'user' ? '#e0f7fa' : '#e8eaf6',
              }}
            >
              <strong>{message.sender === 'user' ? 'You' : 'Bot'}: </strong>
              {message.text}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputString}
          onChange={handleInputChange}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button 
          onClick={handleSubmit} 
          style={{ ...styles.button, backgroundColor: isLoading ? '#b0bec5' : '#6200ea' }}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
  },
  chatContainer: {
    width: '100%',
    height: '400px',
    overflowY: 'scroll',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  message: {
    padding: '10px',
    borderRadius: '8px',
    maxWidth: '80%',
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
    gap: '10px',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Test;
