import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    backgroundColor: '#FFF', 
    fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '50%',
  };

  const contentBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '0',
    padding: '20px',
    width: 'fit-content',
    color: 'white', 
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
    <>
      <Header />
      <div style={pageContainerStyle}>
        <div style={contentContainerStyle}>
          <div style={leftContainerStyle}>
            <div style={contentBoxStyle}>
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
                  src="/images/page2image-2.png"
                  alt=" "
                  width={500} 
                  height={200} 
                  layout="intrinsic"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Link href="/tutorials/dashboardpagetutorial/page1" passHref>
                  <span style={buttonStyle}>Back</span> 
                </Link>
                <Link href="/tutorials/dashboardpagetutorial/page3" passHref>
                  <span style={buttonStyle}>Next</span> 
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

export default Page2;
