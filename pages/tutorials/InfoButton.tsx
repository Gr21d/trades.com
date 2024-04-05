import { ReactElement } from 'react';
import styles from './InfoButton.module.css';

interface InfoButtonProps {
  section: string;
  onClick: (section: string) => void; // Adding an onClick handler prop
}

const InfoButton = ({ section, onClick }: InfoButtonProps): ReactElement => {
  return (
    <button
      className={styles.infoButton}
      title="Learn more"
      aria-label={`Learn more about ${section}`}
      onClick={() => onClick(section)} // Call the onClick prop with the section
    >
      ?
    </button>
  );
};

export default InfoButton;
