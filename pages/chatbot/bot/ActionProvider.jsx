// in ActionProvider.jsx
import React from 'react';
import { useEffect } from 'react';
import SendQuery from "../../support/supportQueryPage";
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import config from './config';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

//   useEffect(() => {
//     if(localStorage.getItem("botMsg")){
//       const botMessage = JSON.parse(localStorage.getItem("botMsg"));

//       setState((prev) => ({
//         ...prev,
//         messages: [...prev.messages, botMessage],
//       }));
//     }
//   }, []);

  // const()

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
  
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleBye = () => {
    const botMessage = createChatBotMessage('Goodbye. Have a nice day.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleAccountIssues = () => {
    const botMessage = createChatBotMessage(
      <span>
        {'What issue are you experiencing with your account?'}
        <br />
        <br />
        {"Unable to Log In"}
        <br />
        {"Account Locked"}
        <br />
        {"Update Account Information"}
      </span>
    );

    localStorage.setItem("botMsg", JSON.stringify(botMessage));
    // console.log(JSON.parse(localStorage.getItem("botMsg")));

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleULoginIn = () => {
    const botMessage = createChatBotMessage(<span>{'Reset Password through login page.'} <br /> {'If you need more help please write "more help".'}</span>);
    console.log(JSON.parse(localStorage.getItem("botMsg")));
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  };

  const handleAccountLocked = () => {
    const botMessage = createChatBotMessage(<span>{'If locked, one of our staff will be with you after review your account.'} <br /> {'If you need more help please write "more help".'}</span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  };

  const handleUpdateAccountInfo = () => {
    const botMessage = createChatBotMessage(<span>{'You can update account in the profile settings.'} <br /> {'If you need more help please write "more help".'}</span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  };

  const handleHelpSendQuery = () => {
    const botMessage = createChatBotMessage(<span>{'Please summarise your problem and a staff member will contact you with help.'}</span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  };

  const handleTradingSupport = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'What can I help you with regarding trading?'} 
      <br /> 
      <br />
      {"How to Place an Order"}
      <br />
      {"Order Types"}
      <br />
      {"Trading Fees"}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleHowToPlaceOrder = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'To Place an order you must go to the specific Crytpo you would like and choose an option such as buy on the page.'} 
      <br /> 
      <br />
      {"If you need more help please enter 'More Help'."}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleOrderTypes = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'Currently there are Market Orders, we are implementing other types of orders soon.'} 
      <br /> 
      <br />
      {"If you need more help please enter 'More Help'."}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleTradingFees = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'Currently our fees are at a minimum at a 0.5% spot fee.'} 
      <br /> 
      <br />
      {"If you need more help please enter 'More Help'."}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleDW = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'Are you having issues with deposits or withdrawals?'} 
      <br /> 
      <br />
      {"Deposits"}
      <br />
      {"Withdrawals"}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleDeposits = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'What issue are you experiencing with your deposit?'} 
      <br /> 
      <br />
      {"Not Showing Up"}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleNotShowingUp = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'If a deposit is not showing up please wait up to 5 minutes for it to show.'} 
      <br /> 
      <br />
      {"If it has been 5 minutes please write 'More Help', and a staff member will contact you shortly."}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleWithdrawls = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'What issue are you experiencing with your withdrawal?'} 
      <br /> 
      <br />
      {"Delayed"}
      <br />
      {"Failed"}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleWDelayed = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'Please wait up to 48 hours, it usually takes much shorter but at least 48 hours if there are any extra checks we need to do from our side to keep your account safe.'} 
      <br /> 
      <br />
      {"If you need more help please enter 'More Help'."}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleWFailed = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'If a withdrawal has failed, please make sure details are correct on the withdrawal.'} 
      <br /> 
      <br />
      {"If you details are correct or need more help please enter 'More Help'."}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleSecurityConcerns = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'What security concerns do you have?'} 
      <br /> 
      <br />
      {"Account Security"}
      <br />
      {"Suspicious Activity"}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleAccountSecurity = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'We make sure as a trading platform keep up to date on security vulnerabilities.'} 
      <br /> 
      <br />
      {"If you need any  more help please enter 'More Help'."}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleSuspiciousActivity = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'Please reset your password.'} 
      <br /> 
      <br />
      {"If you have any other worries or need any more help please enter 'More Help'."}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleLearnCrypto = () => {
    const botMessage = createChatBotMessage(
    <span>
      {'We have a dedicated page to learn about Crypto and our platform.'} 
      <br /> 
      <br />
      {"If you need any more help please enter 'More Help'."}
      </span>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }




  const [decodedToken, setDecodedToken] = useState(null);
  const handleSendQuery = (textMessage) => {
    // console.log(textMessage);
    

    

    // useEffect(() => {
    //   const getToken = () => {
    //     if(typeof window !== 'undefined' && window.localStorage) {
    //       return localStorage.getItem("token");
    //     }
    //     return null;
    //   };

    //   const token = getToken();
    //   if(token){
    //     setDecodedToken(jwtDecode(token));
    //   }
    //   else {
    //     console.log("Token not found");
    //   }
    // }, []);

    const getToken = () => {
      if(typeof window !== 'undefined' && window.localStorage) {
        // console.log("in");
        return localStorage.getItem("token");
      }
      return null;
    };

    const token = getToken();
    let decoded;
    if(token){
      // setDecodedToken(jwtDecode(token));
      decoded = jwtDecode(token);
    }
    else {
      console.log("Token not found");
    }

  
    const submitSupportQuery = async () => {
      // const content = JSON.parse(localStorage.getItem('chat_messages'));
      // console.log(JSON.parse(localStorage.getItem('chat_messages')));
      const content = textMessage; //need to make it so sends content of chatbot text
      let investorId;
      if(decoded){
        // investorId = decodedToken.userId;
        investorId = decoded.userId;
        // console.log(investorId);
      }
      
      // const adminId = target.adminId.value ? parseInt(target.adminId.value, 10) : null;
  
      // const response = await fetch('/api/supportQuery/addSupportQuery', {
      const response = await fetch('/api/supportQuery/addSupportQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          investorId,
          // adminId,
        }),
      });
  
      if (response.ok) {
        console.log('Support Query added');
        const botMessage = createChatBotMessage("Sent message, please be patient as these matter can take time to solve, thank you.");

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));

        localStorage.setItem("botMsg", JSON.stringify(botMessage));

        if(localStorage.getItem("botMsg") !== null){
          console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
          try{
      
            const insertMsg = makeMsg();
            config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
          }
          catch(error){
            console.error("Error parsing botMsg from localStorage:", error);
          }
          
        }
        
      } else {
        console.error('Error adding support query');
        
      }
    };

    submitSupportQuery();
    // console.log("in");

  };

  const handleRepeat = () => {
    const botMessage = createChatBotMessage(
      <span>
        {'Please write an option.'} 
      </span>
    );
  
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(botMessage));

    if(localStorage.getItem("botMsg") !== null){
      console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(<span>{insertMsg}</span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }
  }

  const handleGoBack = () => {
    // let index = (JSON.parse(localStorage.getItem('chat_messages'))).length;
    
    const botMessage = createChatBotMessage(
      <span>
      {`Hi! I'm ${config.botName}, please write in one of the following:`}
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
    );

    // const botMessage = 
  
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    localStorage.setItem("botMsg", JSON.stringify(null));

    if(JSON.parse(localStorage.getItem("botMsg")) === null){
      // console.log("localStorage = " , JSON.parse(localStorage.getItem("botMsg")));
      try{
  
        // const insertMsg = makeMsg();
        config.initialMessages = [createChatBotMessage(
        <span>
          {`Hi! I'm ${config.botName}, please write in one of the following:`}
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
        </span>)];
      }
      catch(error){
        console.error("Error parsing botMsg from localStorage:", error);
      }
      
    }

    // console.log(JSON.parse(localStorage.getItem('chat_messages')));
  }


  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleBye,
            handleAccountIssues,
            handleULoginIn,
            handleAccountLocked,
            handleUpdateAccountInfo,
            handleHelpSendQuery,
            handleSendQuery,
            handleTradingSupport,
            handleHowToPlaceOrder,
            handleOrderTypes,
            handleTradingFees,
            handleDW,
            handleDeposits,
            handleNotShowingUp,
            handleWithdrawls,
            handleWDelayed,
            handleWFailed,
            handleSecurityConcerns,
            handleAccountSecurity,
            handleSuspiciousActivity,
            handleLearnCrypto,
            handleRepeat,
            handleGoBack,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;