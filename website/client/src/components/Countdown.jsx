//Percy
//Live "X days to go" counter to the wedding day.

import { useEffect, useState } from "react";
import styles from "./Countdown.module.css";

const WEDDING_DAY = new Date("2027-09-18T00:00:00");
function daysUntilWedding() {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(0, Math.ceil((WEDDING_DAY - new Date()) / msPerDay));
}

function Countdown() {
  //Seed once, then refresh each minute so it stays current
  const [daysLeft, setDaysLeft] = useState(daysUntilWedding);
  useEffect(() => {
    const id = setInterval(() => setDaysLeft(daysUntilWedding()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={styles.countdown}>
      {daysLeft} {daysLeft === 1 ? "day" : "days"} to go!
    </p>
  );
}

export default Countdown;
