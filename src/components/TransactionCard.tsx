import React from 'react';
import styles from './TransactionCard.module.css';
import { useNavigate } from 'react-router-dom';

// TS type дубльований
// (можна винести глобально, якщо треба ще десь)
type Transaction = {
  id: string;
  type: 'payment' | 'credit';
  amount: number;
  name: string;
  description: string;
  date: string;
  pending?: boolean;
  authorizedUser?: string;
};

interface Props {
  transaction: Transaction;
  isLast?: boolean;
}

const iconByType = (type: string, name: string) => {
  // Підбираємо різні плюшки для імен і типів
  if (name.toLowerCase() === 'apple') return <div className={styles.iconApple}>🍎</div>;
  if (name.toLowerCase() === 'ikea') return <div className={styles.iconIkea}>🟨</div>;
  if (name.toLowerCase() === 'target') return <div className={styles.iconTarget}>🎯</div>;
  if (name.toLowerCase() === 'uber') return <div className={styles.iconUber}>🚗</div>;
  if (name.toLowerCase() === 'walmart') return <div className={styles.iconWalmart}>🏬</div>;
  if (name.toLowerCase() === 'best buy') return <div className={styles.iconBestBuy}>💻</div>;
  if (name.toLowerCase() === 'starbucks') return <div className={styles.iconStarbucks}>☕</div>;
  if (type === 'payment') return <div className={styles.iconPayment}>💸</div>;
  if (type === 'credit') return <div className={styles.iconCredit}>💳</div>;
  return <div className={styles.iconPayment}>💳</div>;
};

function formatAmount(type: string, amount: number) {
  return `${type === 'payment' ? '+' : '-'}$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDay(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 1) return 'Today';
  if (diff < 7) return d.toLocaleDateString(undefined, { weekday: 'long' });
  return d.toLocaleDateString();
}

const TransactionCard: React.FC<Props> = ({ transaction, isLast }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.card + (isLast ? ' ' + styles.last : '')}
      onClick={() => navigate(`/transaction/${transaction.id}`)}
      tabIndex={0}
      role="button"
      style={{ cursor: 'pointer' }}
    >
      <div className={
        styles.iconWrap + ' ' +
        (transaction.name.toLowerCase() === 'apple' ? styles.iconApple :
         transaction.name.toLowerCase() === 'ikea' ? styles.iconIkea :
         transaction.name.toLowerCase() === 'target' ? styles.iconTarget :
         transaction.name.toLowerCase() === 'uber' ? styles.iconUber :
         transaction.name.toLowerCase() === 'walmart' ? styles.iconWalmart :
         transaction.name.toLowerCase() === 'best buy' ? styles.iconBestBuy :
         transaction.name.toLowerCase() === 'starbucks' ? styles.iconStarbucks :
         transaction.type === 'payment' ? styles.iconPayment :
         transaction.type === 'credit' ? styles.iconCredit :
         styles.iconPayment
        )
      }>
        {iconByType(transaction.type, transaction.name)}
      </div>
      <div className={styles.details}>
        <div className={styles.name}>{transaction.name}</div>
        <div className={styles.subtitle}>
          {transaction.pending ? 'Pending • ' : ''}
          {transaction.description}
          {transaction.authorizedUser ? ` • ${transaction.authorizedUser}` : ''}
          {' • ' + formatDay(transaction.date)}
        </div>
      </div>
      <div className={styles.amount}>{formatAmount(transaction.type, transaction.amount)}</div>
      <span className={styles.arrow}>&#8250;</span>
    </div>
  );
};

export default TransactionCard;
