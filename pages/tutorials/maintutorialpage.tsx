import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page1 = () => {
  const leftContainerStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #000000, #000000)', 
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

  const rightImageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '50%',
    height: '112.3vh',
    zIndex: -1,
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
      <div style={rightImageStyle}>
        <Image
          src="/images/backgroundimage.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  );
};

export default Page1;
