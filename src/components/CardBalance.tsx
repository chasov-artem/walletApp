import React from "react";
import styles from "./CardBalance.module.css";
import { useSelector } from "react-redux";
// import type { RootState } from '../store';

const maxLimit = 1500;

const CardBalance: React.FC<{ className?: string }> = ({ className }) => {
  const { transactions } = useSelector((state: any) => state.transactions);

  const balance = transactions.reduce(
    (sum, t) => (t.type === "payment" ? sum + t.amount : sum - t.amount),
    0
  );
  const available = maxLimit - balance;
  return (
    <div className={styles.cardBalance + (className ? ` ${className}` : "")}>
      <div className={styles.headline}>Card Balance</div>
      <div className={styles.balance}>${balance.toFixed(2)}</div>
      <div className={styles.available}>
        ${available.toLocaleString()} Available
      </div>
    </div>
  );
};

export default CardBalance;
