import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '/tutorials/dashboardpagetutorial/TutorialBox.css'; 


const Page2 = () => {
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
      <h2>Chart Details</h2>
      <p>This page provides detailed chart information for a selected cryptocurrency:</p>
      <ul>
        <li><strong>Chart:</strong> A graphical representation of the cryptocurrency's price movement over time.</li>
        <li><strong>O:</strong> The opening price of the cryptocurrency in the selected time frame.</li>
        <li><strong>H:</strong> The highest price of the cryptocurrency in the selected time frame.</li>
        <li><strong>L:</strong> The lowest price of the cryptocurrency in the selected time frame.</li>
        <li><strong>C:</strong> The closing price of the cryptocurrency in the selected time frame.</li>
      </ul>
      <Image
        src="/tutorials/dashboardpagetutorial/page2image.png" 
        alt="Description of Image"
        width={500} 
        height={300} 
        layout="responsive" 
      />
      <Link href="/tutorials/dashboardpagetutorial/page2">
        <span className="next-button">Next</span>
      </Link>
      <Link href="/tutorials/dashboardpagetutorial/page1">
        <span className="back-button">Back</span>
      </Link>
    </div>
    </div>
  );
};

export default Page2;

