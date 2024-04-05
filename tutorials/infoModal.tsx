import React, { ReactElement } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  section: string;
  onClose: () => void;
}

const InfoModal = ({ isOpen, section, onClose }: InfoModalProps): ReactElement | null => {
  if (!isOpen) return null;

  const getInfoContent = (section: string): string => {
    switch (section) {
      case 'crypto-symbol':
        return 'This is the unique ticker symbol representing the cryptocurrency. For example, BTC for Bitcoin or ETH for Ethereum.';
      case 'crypto-name':
        return 'This is the full name of the cryptocurrency that you are interested in or currently hold in your portfolio.';
      case 'owned-amount':
        return 'This indicates the total amount of cryptocurrency that you own. It reflects your current holdings for this specific cryptocurrency.';
      case 'current-price':
        return 'This is the current market price per unit of the cryptocurrency. It can fluctuate frequently due to market conditions.';
      case 'value':
        return 'This is the total value of your holdings for this cryptocurrency. It is calculated by multiplying the owned amount by the current price.';
      default:
        return 'This section of the information page is not defined. Please ensure you have selected a valid category from your portfolio.';
    }
  };
  };

  return (
    <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -20%)', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
      <div>{getInfoContent(section)}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );


export default InfoModal;
