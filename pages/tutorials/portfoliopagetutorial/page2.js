import React from 'react';
import Link from 'next/link';
import '/tutorials/portfoliopagetutorial/TutorialBox.css'; 


const Page2 = () => {
  return (
    <div className="tutorial-box">
      <h3>Understanding the Interface</h3>
      <p><strong>Crypto Symbol:</strong> This is the ticker symbol of the cryptocurrency (e.g., 'BTC' for Bitcoin).</p>
      <p><strong>Crypto Name:</strong> The full name of the cryptocurrency.</p>
      <p><strong>Owned Amount:</strong> The quantity of the cryptocurrency that you currently own.</p>
      <p><strong>Current Price:</strong> The current market price of the cryptocurrency.</p>
      <p><strong>Value:</strong> The total value of your holdings in that cryptocurrency (Owned Amount multiplied by the Current Price).</p>
      <p><strong>Sell Button:</strong> A button to initiate the selling process for the chosen cryptocurrency.</p>
      <img src="#" className="center-image" alt="" />
      <Link href="/tutorials/portfoliopagetutorial/page3">
        <span className="next-button">Next</span>
      </Link>
      <Link href="/tutorials/portfoliopagetutorial/page1">
        <span className="back-button">Back</span>
      </Link>
    </div>
  );
};

export default Page2;

