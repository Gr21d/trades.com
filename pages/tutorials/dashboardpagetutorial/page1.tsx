import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page1 = () => {
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

  const nextButtonStyle: React.CSSProperties = {
    backgroundColor: '#004400',
    padding: '10px 10px',
    borderRadius: '5px',
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
    marginTop: '20px', 
  };

  const listStyle: React.CSSProperties = {
    listStyle: 'none', 
    padding: 0, 
  };

  const listItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px', 
  };

  const arrowStyle: React.CSSProperties = {
    marginRight: '10px', 
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={leftContainerStyle}>
        <div style={contentBoxStyle}>
          <h2>Cryptocurrencies Overview</h2>
          <p>This page gives you a quick overview of various cryptocurrencies. Here's what each term means:</p>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <span style={arrowStyle}>→</span>
              <strong>Name:</strong> The name of the cryptocurrency, like Bitcoin or Ethereum.
            </li>
            <li style={listItemStyle}>
              <span style={arrowStyle}>→</span>
              <strong>Change 1h %:</strong> The percentage change in the price of the cryptocurrency over the last hour.
            </li>
            <li style={listItemStyle}>
              <span style={arrowStyle}>→</span>
              <strong>Change 24h %:</strong> The percentage change in the price of the cryptocurrency over the last 24 hours.
            </li>
          </ul>
          <Image
            src="/images/page1image-3.png"
            alt=" "
            width={150} 
            height={250} 
            layout="intrinsic"
          />
          <Link href="/tutorials/dashboardpagetutorial/page2" passHref>
            <span style={nextButtonStyle}>Next</span>
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

export default Page1;
