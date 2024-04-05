import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page3 = () => {
  const leftContainerStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #000000, #000000)', 
    color: 'white',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100vh',
    width: '50%',
    float: 'left',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '2', 
    color: 'white',
  };

  const rightImageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '50%',
    height: '112.3vh',
    zIndex: -1,
  };

  const contentBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '15px',
    padding: '20px',
    margin: '0 0 20px 0',
    width: 'fit-content',
  };

  const ButtonStyle: React.CSSProperties = {
    backgroundColor: '#004400',
    padding: '10px 10px',
    borderRadius: '5px',
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
    marginTop: '20px', 
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={leftContainerStyle}>
      <div style={textStyle}>
        <div style={contentBoxStyle}>
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
          <Link href="/tutorials/portfoliopagetutorial/page4" passHref>
            <span style={ButtonStyle}>Next</span>
          </Link>
          <Link href="/tutorials/portfoliopagetutorial/page2" passHref>
            <span style={ButtonStyle}>Back</span>
          </Link>
        </div>
      </div>
    
      <div style={rightImageStyle}>
        <Image
          src="/images/backgroundimage.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
    </div>
  );
};

export default Page3;
