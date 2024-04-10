import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const Page3 = () => {
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
    background: '#FFF',
    fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: 'white', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '50%',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '2',
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

  const contentBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '0',
    padding: '20px',
    margin: '0',
    width: 'fit-content',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#004400',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block',
    margin: '20px 10px 20px 0',
  };

  return (
    <>
      <Header />
      <div style={pageContainerStyle}>
        <div style={contentContainerStyle}>
          <div style={leftContainerStyle}>
            <div style={contentBoxStyle}>
              <h3 style={{ marginBottom: '16px', color: 'white' }}>Using the Selling Feature</h3>
          <p style={{ marginBottom: '20px' }}>To utilize the selling feature effectively, follow the step-by-step guide below:</p>
          <ol style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '14px' }}>
              <strong>Select a Cryptocurrency to Sell:</strong> Locate the cryptocurrency you wish to sell on your portfolio list. The corresponding row will display the owned amount and its current value.
            </li>
            <li style={{ marginBottom: '14px' }}>
              <strong>Initiate the Sell Process:</strong> Click the 'Sell' button next to the cryptocurrency you want to sell. A modal window titled "Sell Crypto" will appear.
            </li>
            <li style={{ marginBottom: '14px' }}>
              <strong>Enter Sell Details:</strong>
              <ul style={{ margin: '10px 0 10px 20px', padding: 0 }}>
                <li style={{ marginBottom: '8px' }}><strong>Select Coin:</strong> If you have multiple currencies, ensure the correct one is chosen from the dropdown menu in the modal.</li>
                <li style={{ marginBottom: '8px' }}><strong>Enter Amount:</strong> Type in the quantity of the cryptocurrency you want to sell.</li>
                <li style={{ marginBottom: '8px' }}><strong>Destination Number:</strong> Enter the destination account, wallet number, or identifier where the sale proceeds will be transferred.</li>
              </ul>
            </li>
            <li style={{ marginBottom: '14px' }}>
              <strong>Confirm the Sale:</strong> Review all the information to make sure it's correct. Click the 'Sell' button within the modal to execute the sale.
            </li>
            <li style={{ marginBottom: '14px' }}>
              <strong>Wait for Confirmation:</strong> The system will process your sale. Await an on-screen confirmation message that your transaction has been successful.
            </li>
            <li style={{ marginBottom: '14px' }}>
              <strong>Verify the Transaction:</strong> Check your updated portfolio to ensure that the sold amount has been deducted. Confirm that the sale proceeds have been credited to your specified destination.
            </li>
          </ol>
              <div style={{ ...textStyle, ...{ marginBottom: '20px' } }}> {/* Apply text style here */}</div>
              {/* ... */}
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Link href="/tutorials/portfoliopagetutorial/page2" passHref>
                  <span style={buttonStyle}>Back</span> {/* Change span to a for semantic purposes */}
                </Link>
                <Link href="/tutorials/portfoliopagetutorial/page4" passHref>
                  <span style={buttonStyle}>Next</span> {/* Change span to a for semantic purposes */}
                </Link>
              </div>
            </div>
          </div>
          <div style={rightImageContainerStyle}>
            <img
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

export default Page3;
