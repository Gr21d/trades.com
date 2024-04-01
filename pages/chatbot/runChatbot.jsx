import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

import config from './bot/config.js';
import MessageParser from './bot/MessageParser.jsx';
import ActionProvider from './bot/ActionProvider.jsx';

const MyComponent = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChatbot(!showChatbot)}>
        {showChatbot ? 'Hide Chatbot' : 'Show Chatbot'}
      </button>
      {showChatbot && (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      )}
    </div>
  );
};

export default MyComponent;