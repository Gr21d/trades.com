import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const VideoComponent = () => {
  return (
    <video width="620" height="440" controls>
      <source src="/videotutorial2.mp4" type="video/mp4" />
    </video>
  );
};

const Page4 = () => {
  const leftContainerStyle: React.CSSProperties = {
    backgroundColor: '#FFF',
    color: 'white',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100vh',
    width: '50%',
    position: 'absolute', 
    left: 0, 
  };

  const rightImageContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '50%',
    height: '100vh',
    overflow: 'hidden', 
  };

  const contentBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '15px',
    padding: '20px',
    margin: '0 0 20px 0',
    width: 'fit-content',
  };
  
  const rightImageStyle: React.CSSProperties = {
    width: '100%', 
    height: 'auto', 
    position: 'relative', 
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#013220',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    margin: '10px',
    display: 'inline-block',
    marginRight: '20px', 
    cursor: 'pointer',
    textDecoration: 'none',
  };

  

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={leftContainerStyle}>
      <div style={contentBoxStyle}>
      <h1><strong>Educational Tutorial Video</strong> </h1>
        <VideoComponent />
        <Link href="/tutorials/dashboardpagetutorial/page3" passHref>
        <span style={{ ...buttonStyle, marginRight: '20px' }}>Back</span>
        </Link>
        <Link href="/tutorials/maintutorialpage" passHref>
          <span style={buttonStyle}>Tutorial Main</span>
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

export default Page4;
