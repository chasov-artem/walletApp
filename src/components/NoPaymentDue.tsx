import React from 'react';
import styles from './NoPaymentDue.module.css';

const NoPaymentDue: React.FC = () => {
  return (
    <div className={styles.noPaymentDue}>
      <div className={styles.colLeft}>
        <div className={styles.head}>No Payment Due</div>
        <div className={styles.desc}>You've paid your September balance.</div>
      </div>
      <div className={styles.colRight}>
        <div className={styles.okCircle}><span style={{fontSize:24, color:'#222'}}>✔</span></div>
      </div>
    </div>
  );
};

export default NoPaymentDue;
