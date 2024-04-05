import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '/tutorials/dashboardpagetutorial/TutorialBox.css'; 

const Page3 = () => {
    const backgroundStyle = {
        backgroundImage: 'url("/tutorials/dashboardpagetutorial/backgroundimage.png")',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        height: '100vh', 
      };
  return (
    <div style={backgroundStyle}>
    <div className="tutorial-box">
      <h2>Trading Information</h2>
      <p>On this page, you can view detailed trading information:</p>
      <ul>
        <li><strong>Market Cap:</strong> The total market value of the cryptocurrency's circulating supply.</li>
        <li><strong>Volume (24h):</strong> The total value of all transactions for this cryptocurrency over the past 24 hours.</li>
        <li><strong>Circulating Supply:</strong> The amount of cryptocurrency that is currently circulating in the market and available to the public.</li>
        <li><strong>Change 7d:</strong> The percentage change in the cryptocurrency's price over the last week.</li>
        <li><strong>Stop Loss/Take Profit:</strong> Fields where you can set your stop loss and take profit levels when trading.</li>
      </ul>
      <Image
        src="/tutorials/dashboardpagetutorial/page3image-1.png" 
        alt="Description of Image"
        width={500} 
        height={300} 
        layout="responsive" 
      />
      <Link href="/tutorials/dashboardpagetutorial/page4">
        <span className="next-button">Next</span>
      </Link>
      <Link href="/tutorials/dashboardpagetutorial/page2">
        <span className="back-button">Back</span>
      </Link>
    </div>
    </div>
  );
};

export default Page3;
