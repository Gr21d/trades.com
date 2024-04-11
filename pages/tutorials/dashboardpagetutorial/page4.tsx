import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Image from 'next/image';

const VideoComponent = () => {
  return (
    <video width="620" height="440" controls>
      <source src="/videotutorial2.mp4" type="video/mp4" />
    </video>
  );
};

const Page4 = (props) => {
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
    width:"100%",
    height:"100%",
  };

  const contentBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '0',
    padding: '20px',
    width: 'fit-content',
    color: 'white', 
  };
  
  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#013220',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    margin: '10px',
    display: 'inline-block',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  return (
    <>
      <Header type="tutorial"/> 
      <div style={pageContainerStyle}>
        <div style={contentContainerStyle}>
          <div style={leftContainerStyle}>
            <div style={contentBoxStyle}>
              <h1 style={{ color: 'white' }}><strong>Educational Tutorial Video</strong></h1>
              <VideoComponent />
              <div style={{ marginTop: '20px' }}>
                <Link href="/tutorials/dashboardpagetutorial/page3" passHref>
                  <span style={buttonStyle}>Back</span> 
                </Link>
                <Link href="/tutorials/maintutorialpage" passHref>
                  <span style={buttonStyle}>Tutorial Main</span> 
                </Link>
              </div>
            </div>
          </div>
          <div style={rightImageContainerStyle}>
          <Image src="/images/Project.jpg" alt="Background" style={rightImageStyle} width={100} height={100}/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page4;
