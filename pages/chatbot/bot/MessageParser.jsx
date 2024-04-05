// in MessageParser.js
import React from 'react';
import { useState } from 'react';

const MessageParser = ({ children, actions }) => {

  const [questionAmount, setQuestionAmount] = useState(0);
  const [boolSendQuery, setBoolSendQuery] = useState(false);

  const parse = (message) => {

    message = message.toLowerCase();
    // if(localStorage.getItem("botMsg")){
    //   actions.handleSetBase();
    // }

    if (message.includes('hello')) {
      actions.handleHello();
      setQuestionAmount(prev => prev + 1);
    }
    else if (message.includes('bye')) {
      actions.handleBye();
      setQuestionAmount(prev => prev + 1);
    }

    //Account Issues

    else if(message === "account issues"){
      actions.handleAccountIssues();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("unable to log in")){
      actions.handleULoginIn();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("account locked")){
      actions.handleAccountLocked();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("update account information")){
      actions.handleUpdateAccountInfo();
      setQuestionAmount(prev => prev + 1);
    }

    //Trading SUpport
    else if(message.includes("trading support")){
      actions.handleTradingSupport();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("how to place an order")){
      actions.handleHowToPlaceOrder();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("order types")){
      actions.handleOrderTypes();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("trading fees")){
      actions.handleTradingFees();
      setQuestionAmount(prev => prev + 1);
    }

    //Deposits & Withdrwals
    else if(message.includes("deposits & withdrawls")){
      actions.handleDW();
      setQuestionAmount(prev => prev + 1);
    }
    //deposits
    else if(message.includes("deposits")){
      actions.handleDeposits();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("not showing up")){
      actions.handleNotShowingUp();
      setQuestionAmount(prev => prev + 1);
    }
    //withdrawls
    else if(message.includes("withdrawls")){
      actions.handleWithdrawls();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("delayed")){
      actions.handleWDelayed();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("failed")){
      actions.handleWFailed();
      setQuestionAmount(prev => prev + 1);
    }
    
    //Security Concerns
    else if(message.includes("security concerns")){
      actions.handleSecurityConcerns();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("account security")){
      actions.handleAccountSecurity();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("suspicious activity")){
      actions.handleSuspiciousActivity();
      setQuestionAmount(prev => prev + 1);
    }

    //learn about cryptocurrency
    else if(message.includes("learn about crypto")){
      actions.handleLearnCrypto();
      setQuestionAmount(prev => prev + 1);
    }
    else if(message.includes("more help")){
      actions.handleHelpSendQuery();
      setQuestionAmount(prev => prev + 1);
      setBoolSendQuery(true);
    }
    else if(message.includes("other")){
      actions.handleHelpSendQuery();
      setQuestionAmount(prev => prev + 1);
      setBoolSendQuery(true);
    }
    else if(boolSendQuery === true){
      actions.handleSendQuery(message);
      setQuestionAmount(prev => prev + 1);
      setBoolSendQuery(false);
    }
    else if(message.includes("reset")){
      actions.handleGoBack();
    }
    else{
      actions.handleRepeat();
    }
    


  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;