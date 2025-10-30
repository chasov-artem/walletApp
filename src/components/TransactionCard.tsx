import React from "react";
import styles from "./TransactionCard.module.css";
import { useNavigate } from "react-router-dom";

type Transaction = {
  id: string;
  type: "payment" | "credit";
  amount: number;
  name: string;
  description: string;
  date: string;
  pending?: boolean;
  authorizedUser?: string;
};

function formatAmount(type: string, amount: number) {
  return `${type === "payment" ? "+" : "-"}$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDay(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff < 1) return "Today";
  if (diff < 7) return d.toLocaleDateString("en-US", { weekday: "long" });
  return d.toLocaleDateString();
}

function getPercent(transaction: Transaction) {
  if (transaction.name.toLowerCase() === "apple") return 3;
  if (transaction.name.toLowerCase().includes("payment")) return 2;
  return 1;
}

const iconByType = (type: string, name: string) => {
  if (name.toLowerCase() === "apple")
    return <div className={styles.iconApple}>🍎</div>;
  if (name.toLowerCase() === "ikea")
    return <div className={styles.iconIkea}>🟨</div>;
  if (name.toLowerCase() === "target")
    return <div className={styles.iconTarget}>🎯</div>;
  if (name.toLowerCase() === "uber")
    return <div className={styles.iconUber}>🚗</div>;
  if (name.toLowerCase() === "walmart")
    return <div className={styles.iconWalmart}>🏬</div>;
  if (name.toLowerCase() === "best buy")
    return <div className={styles.iconBestBuy}>💻</div>;
  if (name.toLowerCase() === "starbucks")
    return <div className={styles.iconStarbucks}>☕</div>;
  if (type === "payment") return <div className={styles.iconPayment}>💸</div>;
  if (type === "credit") return <div className={styles.iconCredit}>💳</div>;
  return <div className={styles.iconPayment}>💳</div>;
};

interface Props {
  transaction: Transaction;
  isLast?: boolean;
}

const TransactionCard: React.FC<Props> = ({ transaction, isLast }) => {
  const navigate = useNavigate();
  let displayName = transaction.name;
  if (
    transaction.name.toLowerCase().includes("jpmorgan") ||
    transaction.name.toLowerCase().includes("payment")
  ) {
    displayName = "Payment JP";
  }
  return (
    <div
      className={styles.card + (isLast ? " " + styles.last : "")}
      onClick={() => navigate(`/transaction/${transaction.id}`)}
      tabIndex={0}
      role="button"
      style={{ cursor: "pointer" }}
    >
      <div
        className={
          styles.iconWrap +
          " " +
          (transaction.name.toLowerCase() === "apple"
            ? styles.iconApple
            : transaction.name.toLowerCase() === "ikea"
            ? styles.iconIkea
            : transaction.name.toLowerCase() === "target"
            ? styles.iconTarget
            : transaction.name.toLowerCase() === "uber"
            ? styles.iconUber
            : transaction.name.toLowerCase() === "walmart"
            ? styles.iconWalmart
            : transaction.name.toLowerCase() === "best buy"
            ? styles.iconBestBuy
            : transaction.name.toLowerCase() === "starbucks"
            ? styles.iconStarbucks
            : transaction.type === "payment"
            ? styles.iconPayment
            : transaction.type === "credit"
            ? styles.iconCredit
            : styles.iconPayment)
        }
      >
        {iconByType(transaction.type, transaction.name)}
      </div>
      <div className={styles.details}>
        <div className={styles.rowFirstLine}>
          <div className={styles.name}>{displayName}</div>
          <div className={styles.amountRow}>
            <div className={styles.amount}>
              {formatAmount(transaction.type, transaction.amount)}
            </div>
            <span className={styles.arrow}>&#8250;</span>
          </div>
        </div>
        <div
          className={styles.subtitle}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            {transaction.pending ? "Pending • " : ""}
            {transaction.description}
            {transaction.authorizedUser
              ? ` • ${transaction.authorizedUser}`
              : ""}
            {" • " + formatDay(transaction.date)}
          </div>
          <span className={styles.percentBadge}>
            {getPercent(transaction)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
