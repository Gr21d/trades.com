// pages/info/[section].tsx
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

const InfoPage = (): ReactElement => {
  const router = useRouter();
  const { section } = router.query;

  const getInfoContent = (section: string | string[] | undefined): string => {
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

  return (
    <div>
      <h1>Information</h1>
      <p>{getInfoContent(section)}</p>
    </div>
  );
};

export default InfoPage;
