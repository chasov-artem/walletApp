import React from "react";
import styles from "./DailyPoints.module.css";

function getPoints(): string {
  // Приклад (основа — autumn, починається 1 вересня)
  const date = new Date();
  const seasonStart = new Date(date.getFullYear(), 8, 1); // 1.09 поточного року
  const dayOfSeason =
    Math.floor(
      (date.getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
  let points = 0;
  if (dayOfSeason === 1) points = 2;
  else if (dayOfSeason === 2) points = 3;
  else if (dayOfSeason >= 3) {
    let prev = 3;
    let prevPrev = 2;
    for (let i = 3; i <= dayOfSeason; ++i) {
      points = Math.round(prev + prevPrev * 0.6);
      prevPrev = prev;
      prev = points;
    }
  }
  // Округлення та форматування суми
  if (points >= 1000) return Math.round(points / 1000) + "K";
  return points ? points.toString() : "0";
}

const DailyPoints: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={styles.dailyPoints + (className ? ` ${className}` : "")}>
      <div className={styles.headline}>Daily Points</div>
      <div className={styles.pointsValue}>{getPoints()}</div>
    </div>
  );
};

export default DailyPoints;
