import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '/tutorials/dashboardpagetutorial/TutorialBox.css'; 

const Page1 = () => {
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
      <h2>Cryptocurrencies Overview</h2>
      <p>This page gives you a quick overview of various cryptocurrencies. Here's what each term means:</p>
      <ul>
        <li><strong>Name:</strong> The name of the cryptocurrency, like Bitcoin or Ethereum.</li>
        <li><strong>Change 1h %:</strong> The percentage change in the price of the cryptocurrency over the last hour.</li>
        <li><strong>Change 24h %:</strong> The percentage change in the price of the cryptocurrency over the last 24 hours.</li>
      </ul>
      <Image
        src="/tutorials/dashboardpagetutorial/page1image.png" 
        alt="Description of Image"
        width={500} 
        height={300} 
        layout="responsive" 
      />
       <Link href="/tutorials/dashboardpagetutorial/page2" passHref>
        <span className="next-button">Next</span>
      </Link>
    </div>
    </div>
  );
};

export default Page1;
