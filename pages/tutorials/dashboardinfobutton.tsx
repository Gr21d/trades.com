import React, { useState } from 'react';

// InfoButton component
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

// InfoModal component
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
      case 'open':
        return 'The opening price at the beginning of the trading period.';
      case 'high':
        return 'The highest price reached during the trading period.';
      case 'low':
        return 'The lowest price reached during the trading period.';
      case 'close':
        return 'The closing price at the end of the trading period.';
      case 'market-cap':
        return 'The total market value of the cryptocurrencys circulating supply.';
      case 'volume':
        return 'The total volume of the cryptocurrency traded in the last 24 hours.';
      case 'circulating-supply':
        return 'The amount of cryptocurrency that is in circulation and available to the public.';
      case 'total-supply':
        return 'The total amount of cryptocurrency that is in existence right now (minus any coins that have been verifiably burned).';
      case 'change-7d':
        return 'The percentage change in price over the last 7 days.';
      case 'fully-diluted-valuation':
        return 'The valuation of the cryptocurrency after assuming all tokens in the total supply are issued and in circulation.';
      default:
        return 'Information not available.';
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

  // Rendered InfoButtons and InfoModals for each term
  return (
    <div>
      <div>
        <span>Open: </span>
        <InfoButton section="open" onClick={handleInfoButtonClick} />
      </div>
      <div>
        <span>High: </span>
        <InfoButton section="high" onClick={handleInfoButtonClick} />
      </div>
      <div>
        <span>Low: </span>
        <InfoButton section="low" onClick={handleInfoButtonClick} />
      </div>
      <div>
        <span>Close: </span>
        <InfoButton section="close" onClick={handleInfoButtonClick} />
      </div>
      <div>
        <span>Market Cap: </span>
        <InfoButton section="market-cap" onClick={handleInfoButtonClick} />
      </div>
      <div>
        <span>Volume (24h): </span>
        <InfoButton section="volume" onClick={handleInfoButtonClick} />
      </div>
      <div>
        <span>Circulating Supply: </span>
        <InfoButton section="circulating-supply" onClick={handleInfoButtonClick} />
      </div>
      <div>
        <span>Total Supply: </span>
        <InfoButton section="total-supply" onClick={handleInfoButtonClick} />
      </div>
      <div>
        <span>Change 7d: </span>
        <InfoButton section="change-7d" onClick={handleInfoButtonClick} />
      </div>
      <div>
        <span>Fully Diluted Value: </span>
        <InfoButton section="fully-diluted-valuation" onClick={handleInfoButtonClick} />
      </div>
      
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
