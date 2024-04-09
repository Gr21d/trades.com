// pages/PortfolioPageinfo.tsx
import InfoButton from '../components/InfoButton';
import styles from './PortfolioPageinfo.module.css'; 

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


