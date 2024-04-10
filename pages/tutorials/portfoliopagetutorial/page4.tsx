import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

import Image from 'next/image';

const Page4 = (props) => {
  const pageContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "Inter,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif",
  };

  const contentContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexGrow: 1,
    padding: '50px',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const leftContainerStyle: React.CSSProperties = {
    background: '#FFF',
    fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '50%',
  };

  const rightImageContainerStyle: React.CSSProperties = {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const rightImageStyle: React.CSSProperties = {
    maxWidth: '100%',
    height: 'auto',
  };

  const contentBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '0',
    padding: '20px',
    margin: '0',
    width: 'fit-content',
    color: 'white', // Ensuring text inside is visible
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#004400',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block',
    margin: '20px 10px 20px 0',
  };

  return (
    <>
      <Header />
      <div style={pageContainerStyle}>
        <div style={contentContainerStyle}>
          <div style={leftContainerStyle}>
            <div style={contentBoxStyle}>
              <h3>Tips for a Smooth Transaction</h3>
              <p>Always double-check the current price and the amount you wish to sell. Ensure that the destination number is accurate to avoid misdirecting funds.</p>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px' }}>
                <Link href="/tutorials/portfoliopagetutorial/page3" passHref>
                  <span style={buttonStyle}>Back</span>
                </Link>
                <Link href="/tutorials/maintutorialpage" passHref>
                  <span style={buttonStyle}>Tutorial Main</span> 
                </Link>
              </div>
            </div>
          </div>
          <div style={rightImageContainerStyle}>
            <Image
              src="/images/bull.png"
              alt="Bull market representation"
              style={rightImageStyle}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page4;
