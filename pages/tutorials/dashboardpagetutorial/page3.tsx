import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const Page3 = (props) => {
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
    backgroundColor: '#FFF', 
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
    width: 'fit-content',
    color: 'white', 
  };

  const textStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    color: 'white', 
    lineHeight: '2', 
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
    <>
      <Header />
      <div style={pageContainerStyle}>
        <div style={contentContainerStyle}>
          <div style={leftContainerStyle}>
            <div style={contentBoxStyle}>
              <h2 style={textStyle}>Chart Details</h2>
        <p style={textStyle}>This page provides detailed chart information for a selected cryptocurrency:</p>
        <ul style={textStyle}>
        <li><strong>Market Cap:</strong> The total market value of the cryptocurrency's circulating supply.</li>
          <li><strong>Volume (24h):</strong> The total value of all transactions for this cryptocurrency over the past 24 hours.</li>
          <li><strong>Circulating Supply:</strong> The amount of cryptocurrency that is currently circulating in the market and available to the public.</li>
          <li><strong>Change 7d:</strong> The percentage change in the cryptocurrency's price over the last week.</li>
          <li><strong>Stop Loss/Take Profit:</strong> Conditional orders that automatically place a mark or limit order when the mark price reaches a trigger price specified by the trader. If the mark price reaches or exceeds the trigger price, the Stop-Loss/Take-Profit order will be converted to a live order and placed in the order book</li>
          <li><strong>Fully Diluted Valuation:</strong> The valuation of the cryptocurrency after assuming all tokens in the total supply are issued and in circulation.
Fully Diluted Valuation (FDV)=Maximum Supply x Current Price per Coin</li>
        </ul>
              <Image
                src="/images/page3image-1.png"
                alt="Trading Chart"
                width={200}
                height={100}
                layout="intrinsic"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Link href="/tutorials/dashboardpagetutorial/page2" passHref>
                  <span style={buttonStyle}>Back</span> {/* Changed span to a */}
                </Link>
                <Link href="/tutorials/dashboardpagetutorial/page4" passHref>
                  <span style={buttonStyle}>Next</span> {/* Changed span to a */}
                </Link>
              </div>
            </div>
          </div>
          <div style={rightImageContainerStyle}>
            <img
              src="/images/bull.png"
              alt="Background"
              style={rightImageStyle}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page3;
