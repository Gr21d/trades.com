import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Image from 'next/image';


const Page1 = (props) => {
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
    color: 'white', 
    fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
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

  const nextButtonStyle: React.CSSProperties = {
    backgroundColor: '#004400',
    padding: '10px 20px', 
    borderRadius: '5px',
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block', 
  };

  return (
    <>
      <Header />
      <div style={pageContainerStyle}>
        <div style={contentContainerStyle}>
          <div style={leftContainerStyle}>
            <div style={contentBoxStyle}>
              <h2>User Guide: Cryptocurrency Portfolio Page with Selling Feature</h2>
              <Link href="/tutorials/portfoliopagetutorial/page2" passHref>
                <span style={nextButtonStyle}>Next</span> 
              </Link>
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

export default Page1;
