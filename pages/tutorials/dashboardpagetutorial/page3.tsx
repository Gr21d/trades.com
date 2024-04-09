import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page3 = () => {
  const leftContainerStyle: React.CSSProperties = {
    backgroundColor: '#FFF', 
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

  const rightImageContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '50%',
    height: '100vh',
    overflow: 'hidden', 
  };
  
  const rightImageStyle: React.CSSProperties = {
    width: '100%', 
    height: 'auto', 
    position: 'relative', 
  };

  const contentBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '15px',
    padding: '20px',
    margin: '0 0 20px 0',
    width: 'fit-content',
  };

  const textStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    color: 'white',
    lineHeight: '2', 
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#013220', 
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    margin: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={leftContainerStyle}>
      <div style={contentBoxStyle}>
        <h2 style={textStyle}>Chart Details</h2>
        <p style={textStyle}>This page provides detailed chart information for a selected cryptocurrency:</p>
        <ul style={textStyle}>
        <li><strong>Market Cap:</strong> The total market value of the cryptocurrency's circulating supply.</li>
          <li><strong>Volume (24h):</strong> The total value of all transactions for this cryptocurrency over the past 24 hours.</li>
          <li><strong>Circulating Supply:</strong> The amount of cryptocurrency that is currently circulating in the market and available to the public.</li>
          <li><strong>Change 7d:</strong> The percentage change in the cryptocurrency's price over the last week.</li>
          <li><strong>Stop Loss/Take Profit:</strong> Conditional orders that automatically place a mark or limit order when the mark price reaches a trigger price specified by the trader. If the mark price reaches or exceeds the trigger price, the Stop-Loss/Take-Profit order will be converted to a live order and placed in the order book</li>
          <li><strong>Fully Diluted Valuation:</strong> The valuation of the cryptocurrency after assuming all tokens in the total supply are issued and in circulation.
Fully Diluted Valuation (FDV)=Maximum Supply x Current Price per Coin</li>
        </ul>
        <Image
          src="/images/page3image-1.png"
          alt="Trading Chart"
          width={200}
          height={100}
          layout="intrinsic"
        />
        <div>
          <Link href="/tutorials/dashboardpagetutorial/page2" passHref>
            <span style={buttonStyle}>Back</span>
          </Link>
          <Link href="/tutorials/dashboardpagetutorial/page4" passHref>
            <span style={buttonStyle}>Next</span>
          </Link>
        </div>
      </div>
      </div>
      <div style={rightImageContainerStyle}>
      <img
        src="/images/bull.png"
        alt="Background"
        style={rightImageStyle}
      />
      </div>
    </div>
  );
};

export default Page3;
