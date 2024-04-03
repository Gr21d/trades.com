import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';


import config from './bot/config.js';
import messageParser from './bot/MessageParser.jsx';
import actionProvider from './bot/ActionProvider.jsx';

function MyComponent() {
  const [showBot, toggleBot] = useState(false);

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
    console.log(JSON.parse(localStorage.getItem('chat_messages')));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

  return (
    <div className='App'>
      {showBot && (
        <Chatbot
          config={config}
          actionProvider={actionProvider}
          messageHistory={loadMessages}
          messageParser={messageParser}
          saveMessages={saveMessages}
        />
      )}
      <button onClick={() => toggleBot((prev) => !prev)}>Bot</button>
    </div>
  );

  // useEffect(() => {
  //   console.log(loadMessages());
  // }, []);



}

export default MyComponent;