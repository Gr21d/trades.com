import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page2 = () => {
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
        <div style={contentBoxStyle}>
        <h3>Understanding the Interface</h3>
      <p><strong>Crypto Symbol:</strong> This is the ticker symbol of the cryptocurrency (e.g., 'BTC' for Bitcoin).</p>
      <p><strong>Crypto Name:</strong> The full name of the cryptocurrency.</p>
      <p><strong>Owned Amount:</strong> The quantity of the cryptocurrency that you currently own.</p>
      <p><strong>Current Price:</strong> The current market price of the cryptocurrency.</p>
      <p><strong>Value:</strong> The total value of your holdings in that cryptocurrency (Owned Amount multiplied by the Current Price).</p>
      <p><strong>Sell Button:</strong> A button to initiate the selling process for the chosen cryptocurrency.</p>
          <Link href="/tutorials/portfoliopagetutorial/page3" passHref>
            <span style={ButtonStyle}>Next</span>
          </Link>
          <Link href="/tutorials/portfoliopagetutorial/page1" passHref>
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
  );
};

export default Page2;
