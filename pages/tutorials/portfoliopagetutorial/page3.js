import React from 'react';
import Link from 'next/link';
import '/tutorials/portfoliopagetutorial/TutorialBox.css'; 

const Page3 = () => {
  return (
    <div className="tutorial-box">
      <h3>Using the Selling Feature</h3>
      <p>To use the selling feature, follow these steps:</p>
    <ol>
        <li>Select a Cryptocurrency to Sell: Locate the cryptocurrency you wish to sell on your portfolio list. The corresponding row will display the owned amount and its current value.</li>
        <li>Initiate the Sell Process: Click the 'Sell' button next to the cryptocurrency you want to sell. A modal window titled "Sell Crypto" will appear.</li>
        <li>Enter Sell Details: 
            <ul>
                <li>Select Coin: If you have multiple currencies, ensure the correct one is chosen from the dropdown menu in the modal.</li>
                <li>Enter Amount: Type in the quantity of the cryptocurrency you want to sell.</li>
                <li>Destination Number: Enter the destination account, wallet number, or identifier where the sale proceeds will be transferred.</li>
            </ul>
        </li>
        <li>Confirm the Sale: Review all the information to make sure it's correct. Click the 'Sell' button within the modal to execute the sale.</li>
        <li>Wait for Confirmation: The system will process your sale. Wait for an on-screen confirmation message that your transaction has been successful.</li>
        <li>Verify the Transaction: Check your updated portfolio to ensure that the sold amount has been deducted. Confirm that the sale proceeds have been credited to your specified destination.</li>
    </ol>
      <Link href="/tutorials/portfoliopagetutorial/page4">
        <span className="next-button">Next</span>
      </Link>
      <Link href="/tutorials/portfoliopagetutorial/page2">
        <span className="back-button">Back</span>
      </Link>
    </div>
  );
};

export default Page3;
