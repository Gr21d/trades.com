import React, { useState } from 'react';

interface InfoButtonProps {
  section: string;
  onClick: (section: string) => void;
}

const InfoButton: React.FC<InfoButtonProps> = ({ section, onClick }) => {
  return (
    <button onClick={() => onClick(section)}>
      ?
    </button>
  );
};

interface InfoModalProps {
  isOpen: boolean;
  section: string;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, section, onClose }) => {
  if (!isOpen) return null;

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
    backgroundColor: 'white',
    padding: '20px',
    zIndex: 100,
  };

  const getInfoContent = (section: string): string => {
    switch (section) {
      case 'crypto-symbol':
        return 'This is the unique ticker symbol representing the cryptocurrency. For example, BTC for Bitcoin or ETH for Ethereum.';
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

  return (
    <div style={modalStyle}>
      <div>{getInfoContent(section)}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('');

  const handleInfoButtonClick = (section: string) => {
    setCurrentSection(section);
    setIsModalOpen(true);
  };

  return (
    <div>
      <span>Crypto Symbol: </span>
        <InfoButton section="crypto-symbol" onClick={handleInfoButtonClick} />
      <span>Owned Amount: </span>
        <InfoButton section="owned-amount" onClick={handleInfoButtonClick} />
      <span>Current Price: </span>
        <InfoButton section="current-price" onClick={handleInfoButtonClick} />
      <span>Value: </span>
        <InfoButton section="value" onClick={handleInfoButtonClick} />
      {/* InfoModal to be reused for different sections */}
      <InfoModal
        isOpen={isModalOpen}
        section={currentSection}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ParentComponent;
