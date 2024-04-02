// in config.js
import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import '../assets/chatbot.css';

const botName = 'CryptoBot';

import MyAvatar from '../assets/myAvatar.jsx';

// import myAvatarSrc from '../assets/iconBull.png';

// const MyAvatar = (props) => <img src={myAvatarSrc} alt="avatar" {...props} />;

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}, how may I assist you today?`)],
  botName: botName,

  customComponents: {
    botAvatar: (props) => <MyAvatar {...props} />,

  },

};

export default config;