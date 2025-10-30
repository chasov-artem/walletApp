import React from "react";
import CardBalance from "../components/CardBalance";
import NoPaymentDue from "../components/NoPaymentDue";
import DailyPoints from "../components/DailyPoints";
import LatestTransactions from "../components/LatestTransactions";
import styles from "./TransactionsList.module.css";
import MobileBar from "../components/MobileBar";

const TransactionsList: React.FC = () => {
  return (
    <div className={styles.pageBg}>
      <div className={styles.wrapper}>
        <div className={styles.topBlocks}>
          <CardBalance className={styles.cardBalanceGrid} />
          <DailyPoints className={styles.dailyPointsGrid} />
          <NoPaymentDue className={styles.noPaymentDueGrid} />
        </div>
        <div className={styles.headlineTransactions}>Latest Transactions</div>
        <div className={styles.scrollableList}>
          <LatestTransactions />
        </div>
        <MobileBar position="bottom" color="#181818" className="mobileBarList" />
      </div>
    </div>
  );
};

export default TransactionsList;
