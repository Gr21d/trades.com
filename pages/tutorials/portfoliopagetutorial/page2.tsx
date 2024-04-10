import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const Page2 = () => {
  const pageContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', 
  };

  const contentContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexGrow: 1, 
    padding: '50px',
    alignItems: 'center',
    justifyContent: 'space-between', 
  };

  const leftContainerStyle: React.CSSProperties = {
    background: '#fff',
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
              <h3>Understanding the Interface</h3>
              <p><strong>Crypto Symbol:</strong> This is the ticker symbol of the cryptocurrency (e.g., 'BTC' for Bitcoin).</p>
              <p><strong>Crypto Name:</strong> The full name of the cryptocurrency.</p>
              <p><strong>Owned Amount:</strong> The quantity of the cryptocurrency that you currently own.</p>
              <p><strong>Current Price:</strong> The current market price of the cryptocurrency.</p>
              <p><strong>Value:</strong> The total value of your holdings in that cryptocurrency (Owned Amount multiplied by the Current Price).</p>
              <p><strong>Sell Button:</strong> A button to initiate the selling process for the chosen cryptocurrency.</p>
              <Link href="/tutorials/portfoliopagetutorial/page1" passHref>
                <span style={buttonStyle}>Back</span> 
              </Link>
              <Link href="/tutorials/portfoliopagetutorial/page3" passHref>
                <span style={buttonStyle}>Next</span> 
              </Link>
            </div>
          </div>
          <div style={rightImageContainerStyle}>
            <img
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

export default Page2;
