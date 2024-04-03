import React, { useEffect, useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';


import config from './bot/config.js';
import messageParser from './bot/MessageParser.jsx';
import actionProvider from './bot/ActionProvider.jsx';
// import robotPNG from "../../../public/images/message.png";

function MyComponent() {
  const [showBot, toggleBot] = useState(null);

  const [previous, setPrevious] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("chatOpen")){
      console.log("ls start = " + localStorage.getItem("chatOpen"));
      toggleBot(JSON.parse(localStorage.getItem("chatOpen")));
      // const [showBot, toggleBot] = useState(localStorage.getItem("chatOpen"));
      setPrevious(true);
    }
  }, []);

  // useEffect(() => {
  //   if(previous === true){
      
  //   }
  // }, [previous]);

  useEffect(() => {
    // console.log("showBot = " + showBot);
    localStorage.setItem("chatOpen", JSON.stringify(showBot));
    console.log("showBot = " + localStorage.getItem("chatOpen"));
  }, [showBot]);
  
  const robotPNG = '/message.png';

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
    console.log(JSON.parse(localStorage.getItem('chat_messages')));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };
  // console.log(robotPNG);
  return (
    <div className='App'>
      <img src={robotPNG} onClick={() => toggleBot((prev) => !prev)} />
      {showBot === true && (
        <Chatbot
          config={config}
          actionProvider={actionProvider}
          messageHistory={loadMessages}
          messageParser={messageParser}
          saveMessages={saveMessages}
        />
      )}
      {/* <button onClick={() => toggleBot((prev) => !prev)}>Bot</button> */}
      
    </div>
  );

  // useEffect(() => {
  //   console.log(loadMessages());
  // }, []);



}

export default MyComponent;