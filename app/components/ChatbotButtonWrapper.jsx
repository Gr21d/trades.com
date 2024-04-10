// ChatbotButtonWrapper.jsx

import React from 'react';
import MyComponent from '../../pages/chatbot/runChatbot'; // adjust the path as needed

const ChatbotButtonWrapper = (props) => {
  return (
    <div>
      <MyComponent {...props} />
    </div>
  );
};

export default ChatbotButtonWrapper;