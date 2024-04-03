// components/InfoButton.tsx
import Link from 'next/link';
import { ReactElement } from 'react';
import styles from './InfoButton.module.css'; 

interface InfoButtonProps {
  section: string;
}

const InfoButton = ({ section }: InfoButtonProps): ReactElement => {
  return (
    <Link href={`/info/${section}`}>
      <a className={styles.infoButton} title="Learn more" aria-label={`Learn more about ${section}`}>
        ?
      </a>
    </Link>
  );
};

export default InfoButton;
