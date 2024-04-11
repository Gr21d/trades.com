import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const Page1 = (props) => {
  // Styles for the main layout container
  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'centre',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "Inter,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif",
  };

  // Styles for the main content area
  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '1rem',
  };

  // Styles for the left-side container
  const leftContainerStyle: React.CSSProperties = {
    flex: 1,
    color: 'black',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '50%',
  };

  const rightImageStyle: React.CSSProperties = {
    maxWidth: '100%', 
    width:"100%",
    height:"100%",
  };

  // Styles for the right-side container
  const rightContainerStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '50%',
  };

  // Styles for the content box within the left-side container
  const contentBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: '0',
    padding: '20px',
    width: 'fit-content',
  };

  // Styles for the 'Next' button
  const nextButtonStyle: React.CSSProperties = {
    backgroundColor: '#004400',
    padding: '10px 10px',
    borderRadius: '0',
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
    marginTop: '20px',
  };

  return (
    <div style={layoutStyle}>
      <Header type="tutorial"/> 
      <div style={contentStyle}>
        <div style={leftContainerStyle}>
          <div style={contentBoxStyle}>
            <h2>Cryptocurrencies Overview</h2>
            <p>This page gives you a quick overview of various cryptocurrencies. Here's what each term means:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '20px' }}>
                <strong>Name:</strong> The name of the cryptocurrency, like Bitcoin or Ethereum.
              </li>
              <li style={{ marginBottom: '20px' }}>
                <strong>Change 1h %:</strong> The percentage change in the price of the cryptocurrency over the last hour.
              </li>
              <li style={{ marginBottom: '20px' }}>
                <strong>Change 24h %:</strong> The percentage change in the price of the cryptocurrency over the last 24 hours.
              </li>
            </ul>
            <Image
            src="/images/page1image-3.png"
            alt=" "
            width={150} 
            height={100} 
            layout="intrinsic"
          />
            <Link href="/tutorials/dashboardpagetutorial/page2" passHref>
              <span style={nextButtonStyle}>Next</span>
            </Link>
          </div>
        </div>
        <div style={rightContainerStyle}>
        <Image src="/images/Project.jpg" alt="Background" style={rightImageStyle} width={100} height={100}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page1;
