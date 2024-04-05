import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page4 = () => {
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

  const ButtonStyle: React.CSSProperties = {
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
        <h3>Tips for a Smooth Transaction</h3>
      <p>Always double-check the current price and the amount you wish to sell. Ensure that the destination number is accurate to avoid misdirecting funds.</p>
          <Link href="/tutorials/portfoliopagetutorial/page3" passHref>
            <span style={ButtonStyle}>Back</span>
          </Link>
          <Link href="/tutorials/maintutorialpage" passHref>
            <span style={ButtonStyle}>Tutorial Main</span>
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

export default Page4;
