import React from 'react';
import Link from 'next/link';
import '/tutorials/portfoliopagetutorial/TutorialBox.css'; 

const Page1 = () => {
  return (
    <div className="tutorial-box">
      <h2>User Guide: Cryptocurrency Portfolio Page with Selling Feature</h2>
       <Link href="/tutorials/portfoliopagetutorial/page2" passHref>
        <span className="next-button">Next</span>
      </Link>
    </div>
  );
};

export default Page1;
