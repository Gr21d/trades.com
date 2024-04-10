
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openBot, setOpenBot] = useState(false);

  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handleButtonClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    setButtonPosition({ x: rect.x, y: rect.y + rect.height });
    setModalIsOpen(true);
    setOpenBot(true);
  };
  
  // ...
  
  return (
    <div className='App'>
      <img src={robotPNG} onClick={handleButtonClick} style={{
        height:"35px",
        width:"35px",
        marginRight:"0.5rem",
        marginBottom:"2rem",
    
      }}/>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Chatbot Modal"
        style={{
          content: {
            position: 'fixed',
            top: `${buttonPosition.y}px`,
            left: `${buttonPosition.x}px`,
            right: 'auto',
            bottom: 'auto',
            width: 'fit-content',
            height: 'fit-content'
          }
        }}
      >
        {openBot && (
          <Chatbot
            config={config}
            actionProvider={actionProvider}
            messageHistory={loadMessages}
            messageParser={messageParser}
            saveMessages={saveMessages}
          />
        )}
      </Modal>
    </div>
  );
}


export default MyComponent;