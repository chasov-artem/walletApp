import React from 'react';
import styles from './CardBalance.module.css';
import { useSelector } from 'react-redux';
// import type { RootState } from '../store';

const maxLimit = 1500;

const CardBalance: React.FC = () => {
  const { transactions } = useSelector((state: any) => state.transactions);
  // Баланс = всі payment (додаємо) мінус усі credit (віднімаємо)
  const balance = transactions.reduce((sum, t) => (
    t.type === 'payment' ? sum + t.amount : sum - t.amount
  ), 0);
  const available = maxLimit - balance;
  return (
    <div className={styles.cardBalance}>
      <div className={styles.headline}>Card Balance</div>
      <div className={styles.balance}>${balance.toFixed(2)}</div>
      <div className={styles.available}>${available.toLocaleString()} Available</div>
      <div className={styles.limit}>Limit: ${maxLimit.toLocaleString()}</div>
    </div>
  );
};

export default CardBalance;
