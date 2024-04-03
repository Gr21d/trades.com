// in config.js
import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import '../assets/chatbot.css';

const botName = 'CryptoBot';

import MyAvatar from '../assets/myAvatar.jsx';

// import myAvatarSrc from '../assets/iconBull.png';

// const MyAvatar = (props) => <img src={myAvatarSrc} alt="avatar" {...props} />;

let config = {
  
  initialMessages: [createChatBotMessage(
    <span>
      {`Hi! I'm ${botName}, please write in one of the following:`}
      <br />
      <br />
      {`Account Issues`}
      <br />
      {`Trading Support`}
      <br />
      {`Deposits & Withdrawals`}
      <br />
      {`Security Concerns`}
      <br />
      {`Learn About Crypto`}
      <br />
      {`Other`}
      <br />
      <br />
      {"Write Reset to come back to this page"}
    </span>
  )],
  botName: botName,

  customComponents: {
    botAvatar: (props) => <MyAvatar {...props} />,

  },

};

const makeMsg = () => {
  const objectMsg = JSON.parse(localStorage.getItem("botMsg"));
  let textString = "";

  // for(let i=0; i<objectMsg.message.props.children)
  
  for (const item of objectMsg.message.props.children) {
    if (typeof item === 'string') {
      textString += " " + item + " ";
      // textString += item + "\n";
    }
  }
  // textString += "</span>";

  return textString;
}

if(typeof window !== "undefined"){
  if(localStorage.getItem("botMsg") !== null){
    console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
    try{
      // const msgSet = JSON.parse(localStorage.getItem("botMsg"));
      // const msgSet = createChatBotMessage("test");
      // config.initialMessages = [createChatBotMessage(msgSet.message.props.children[0])];
      // config.initialMessages = msgSet;
      // console.log("initial msg = ", config.initialMessages);

      const insertMsg = makeMsg();
      config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
    }
    catch(error){
      console.error("Error parsing botMsg from localStorage:", error);
    }
    
  }
}



export default config;