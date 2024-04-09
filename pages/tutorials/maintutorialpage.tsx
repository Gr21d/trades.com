import React from 'react';
import Link from 'next/link';

const Page1 = () => {
  const leftContainerStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #FFF, #FFF)', 
    color: 'white',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100vh',
    width: '50%',
    float: 'left',
  };

  const rightImageContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '50%',
    height: '100vh',
    overflow: 'hidden', 
  };
  
  const rightImageStyle: React.CSSProperties = {
    width: '100%', 
    height: 'auto', 
    position: 'relative', 
  };
  

  const contentBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '15px',
    padding: '20px',
    margin: '0 0 20px 0',
    width: 'fit-content',
  };

  const nextButtonStyle: React.CSSProperties = {
    backgroundColor: '#004400',
    padding: '10px 10px',
    borderRadius: '5px',
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
    marginTop: '20px', 
  };


  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={leftContainerStyle}>
        <div style={contentBoxStyle}>
        <h2>Tutorials</h2>
        <h2>Portfolio Page Tutorial</h2>
          <Link href="/tutorials/portfoliopagetutorial/page1" passHref>
            <span style={nextButtonStyle}>Learn about the Portfolio Page</span>
          </Link>
          <h2>Crypto Dashboard Page Tutorial</h2>
          <Link href="/tutorials/dashboardpagetutorial/page1" passHref>
            <span style={nextButtonStyle}>Learn about the Crypto Dashboard Page</span>
          </Link>
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
  );
};

export default Page1;
