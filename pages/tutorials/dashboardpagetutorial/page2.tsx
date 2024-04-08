import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page2 = () => {
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
          <li><strong>Chart:</strong> A graphical representation of the cryptocurrency's price movement over time.</li>
          <li><strong>O:</strong> The opening price of the cryptocurrency in the selected time frame.</li>
          <li><strong>H:</strong> The highest price of the cryptocurrency in the selected time frame.</li>
          <li><strong>L:</strong> The lowest price of the cryptocurrency in the selected time frame.</li>
          <li><strong>C:</strong> The closing price of the cryptocurrency in the selected time frame.</li>
        </ul>
        <Image
            src="/images/page2image.png"
            alt=" "
            width={500} 
            height={200} 
            layout="intrinsic"
          />
        <div>
          <Link href="/tutorials/dashboardpagetutorial/page3" passHref>
            <span style={buttonStyle}>Next</span>
          </Link>
          <Link href="/tutorials/dashboardpagetutorial/page1" passHref>
            <span style={buttonStyle}>Back</span>
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