// pages/PortfolioPageinfo.tsx
import InfoButton from '../components/InfoButton';
import styles from './PortfolioPageinfo.module.css'; // Your CSS module for styling

// ... other imports and setup

const CryptoRow = ({ symbol, name, ownedAmount, currentPrice, value }) => {
  return (
    <tr className={styles.cryptoRow}>
      <td>{symbol} <InfoButton section="crypto-symbol" /></td>
      <td>{name} <InfoButton section="crypto-name" /></td>
      <td>{ownedAmount} <InfoButton section="owned-amount" /></td>
      <td>{currentPrice} <InfoButton section="current-price" /></td>
      <td>{value} <InfoButton section="value" /></td>
      <td><button className={styles.sellButton}>Sell</button></td>
    </tr>
  );
};

// ... the rest of your page component
