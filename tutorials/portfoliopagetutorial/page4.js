// Page4.js
import React from 'react';
import Link from 'next/link';
import './TutorialBox.css';

const Page4 = () => {
  return (
    <div className="tutorial-box">
      <h3>Tips for a Smooth Transaction</h3>
      <p>Always double-check the current price and the amount you wish to sell. Ensure that the destination number is accurate to avoid misdirecting funds.</p>
      <Link href="/page3">
        <a className="back-button">Back</a>
      </Link>
    </div>
  );
};

export default Page4;
