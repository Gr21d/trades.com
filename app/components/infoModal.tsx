import React, { ReactElement } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  section: string;
  onClose: () => void;
}

const InfoModal = ({ isOpen, section, onClose }: InfoModalProps): ReactElement | null => {
  if (!isOpen) return null;

  const getInfoContent = (section: string): string => {
    // The same switch case as in your InfoPage
    // Define your content based on the section
  };

  return (
    <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -20%)', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
      <div>{getInfoContent(section)}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default InfoModal;
