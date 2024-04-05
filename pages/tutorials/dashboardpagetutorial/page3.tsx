import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page3 = () => {
  const leftContainerStyle: React.CSSProperties = {
    backgroundColor: '#000000', 
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

  const rightImageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '50%',
    height: '112.3vh',
    zIndex: -1,
  };

  const textStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
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
        <h2 style={textStyle}>Chart Details</h2>
        <p style={textStyle}>This page provides detailed chart information for a selected cryptocurrency:</p>
        <ul style={textStyle}>
        <li><strong>Market Cap:</strong> The total market value of the cryptocurrency's circulating supply.</li>
          <li><strong>Volume (24h):</strong> The total value of all transactions for this cryptocurrency over the past 24 hours.</li>
          <li><strong>Circulating Supply:</strong> The amount of cryptocurrency that is currently circulating in the market and available to the public.</li>
          <li><strong>Change 7d:</strong> The percentage change in the cryptocurrency's price over the last week.</li>
          <li><strong>Stop Loss/Take Profit:</strong> Stop-Loss and Take-Profit are conditional orders that automatically place a mark or limit order when the mark price reaches a trigger price specified by the trader. If the mark price reaches or exceeds the trigger price, the Stop-Loss/Take-Profit order will be converted to a live order and placed in the order book</li>

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
          <Link href="/tutorials/maintutorialpage" passHref>
            <span style={buttonStyle}>Tutorial Main</span>
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
  );
};

export default Page3;
