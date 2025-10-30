import React from "react";
import styles from "./NoPaymentDue.module.css";
import { FaCheck } from "react-icons/fa6";

const NoPaymentDue: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={styles.noPaymentDue + (className ? ` ${className}` : "")}>
      <div className={styles.colLeft}>
        <div className={styles.head}>No Payment Due</div>
        <div className={styles.desc}>You've paid your September balance.</div>
      </div>
      <div className={styles.colRight}>
        <div className={styles.okCircle}>
          <FaCheck size={32} color="#222" />
        </div>
      </div>
    </div>
  );
};

export default NoPaymentDue;
