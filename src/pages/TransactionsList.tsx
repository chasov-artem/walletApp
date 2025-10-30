import React from 'react';
import CardBalance from '../components/CardBalance';
import NoPaymentDue from '../components/NoPaymentDue';
import DailyPoints from '../components/DailyPoints';
import LatestTransactions from '../components/LatestTransactions';
import styles from './TransactionsList.module.css';

const TransactionsList: React.FC = () => {
  return (
    <div className={styles.pageBg}>
      <div className={styles.wrapper}>
        <div className={styles.topBlocks}>
          <div className={styles.leftBlock}>
            <CardBalance />
            <DailyPoints />
          </div>
          <div className={styles.rightBlock}>
            <NoPaymentDue />
          </div>
        </div>
        <LatestTransactions />
      </div>
    </div>
  );
};

export default TransactionsList;
