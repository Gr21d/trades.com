import React from 'react';
import Link from 'next/link';
import '../../../styles/TutorialBox.css'; 

const Page1 = () => {
  return (
    <div className="tutorial-box">
      <h2>User Guide: Cryptocurrency Portfolio Page with Selling Feature</h2>
      <Link href="/tutorials/profilepagetutorial/page2">
        <a className="next-button">Next</a>
      </Link>
    </div>
  );
};

export default Page1;
