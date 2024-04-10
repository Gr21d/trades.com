import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';


const overrideHeaderStyle: React.CSSProperties = {
  backgroundRepeat: 'no-repeat',
};

const Page1 = (props) => {

  const pageLayoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', 
    fontFamily: "Inter,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif",
  };

 
  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex', 
  };

  const leftContainerStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #FFF, #FFF)', 
    color: 'black',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',
  };

  <Header style={{
    width: '100%', 
    overflowX: 'visible' 
  }} />

  const rightImageContainerStyle: React.CSSProperties = {
    width: '50%',
  };

  const rightImageStyle: React.CSSProperties = {
    width: '100%',
    height: 'auto', 
  };

  const contentBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: '0',
    padding: '20px',
    margin: '0 0 20px 0',
    width: 'fit-content',
  };

  const nextButtonStyle: React.CSSProperties = {
    backgroundColor: '#004400',
    padding: '10px 10px',
    borderRadius: '0',
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
    marginTop: '20px', 
  };
  const headerStyle: React.CSSProperties = {
    width: '100%', 
    overflowX: 'visible', 
  };

  <div className="header-content" style={{
    width: 'auto', 
    gap: '0', 
  }}></div>
  
  return (
    <div style={pageLayoutStyle}>
      <Header style={headerStyle} /> 
      <div style={overrideHeaderStyle}>
      </div>
      <main style={mainContentStyle}>
        <div style={leftContainerStyle}>
          <div style={contentBoxStyle}>
            <p style={{fontSize: "40px"}}>Tutorials</p>
            <p style={{fontSize: "32px"}}>Portfolio Page Tutorial</p>
            <Link href="/tutorials/portfoliopagetutorial/page1" passHref>
              <span style={nextButtonStyle}>Learn about the Portfolio Page</span>
            </Link>
            <p style={{fontSize: "32px"}}>Crypto Dashboard Page Tutorial</p>
            <Link href="/tutorials/dashboardpagetutorial/page1" passHref>
              <span style={nextButtonStyle}>Learn about the Crypto Dashboard Page</span>
            </Link>
          </div>
        </div>
        <div style={rightImageContainerStyle}>
          <img src="/images/Project.jpg" alt="Background" style={rightImageStyle} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page1;


