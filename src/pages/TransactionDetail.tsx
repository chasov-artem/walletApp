import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./TransactionDetail.module.css";
import { IoIosArrowBack } from "react-icons/io";
import MobileBar from "../components/MobileBar";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  const hour = d.getHours().toString().padStart(2, "0");
  const min = d.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year}, ${hour}:${min},`;
}

const TransactionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const transaction = useSelector((state: any) =>
    state.transactions.transactions.find((t: any) => t.id === id)
  );

  if (!transaction)
    return <div style={{ padding: 28, textAlign: "center" }}>Not found</div>;

  const statusText = transaction.pending ? "Pending" : "Approved";
  return (
    <div className={styles.pageBg}>
      <div className={styles.centerWrap}>
        <div className={styles.detailCard}>
          <div className={styles.backBtnWrap}>
            <button
              onClick={() => navigate(-1)}
              className={styles.backBtn}
              title="Back"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <IoIosArrowBack size={29} color="#346bfb" />
            </button>
          </div>
          <div style={{ height: 36 }}></div>
          <div className={styles.amount}>${transaction.amount.toFixed(2)}</div>
          <div className={styles.transName}>{transaction.name}</div>
          <div className={styles.transDate}>{formatDate(transaction.date)}</div>
          {/* detailInfo доповнить status/total як білий card */}
          <div className={styles.detailInfo}>
            <div className={styles.statusRow}>
              Status:
              <span className={styles.statusValue}>{statusText}</span>
            </div>
            <div className={styles.description}>{transaction.description}</div>
            {transaction.authorizedUser ? (
              <div className={styles.authUser}>
                Authorized by: <b>{transaction.authorizedUser}</b>
              </div>
            ) : null}
            <hr className={styles.divider} />
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>
                ${transaction.amount.toFixed(2)}
              </span>
            </div>
          </div>
          <MobileBar
            position="bottom"
            color="#181818"
            className="mobileBarDetail"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
