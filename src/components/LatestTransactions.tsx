import React, { useEffect } from "react";
import styles from "./LatestTransactions.module.css";
import TransactionCard from "./TransactionCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transactionsSlice";

const LatestTransactions: React.FC = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(
    (state: any) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions() as any);
  }, [dispatch]);

  if (loading)
    return <div className={styles.latestTransactions}>Loading...</div>;
  if (error)
    return <div className={styles.latestTransactions}>Error: {error}</div>;

  return (
    <div className={styles.latestTransactions}>
      {transactions.slice(0, 10).map((t: any, i: number) => (
        <TransactionCard key={t.id} transaction={t} isLast={i === 9} />
      ))}
    </div>
  );
};

export default LatestTransactions;
