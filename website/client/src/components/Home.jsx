//Percy

import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.Home}>
      <h1 className={styles.names}> Elliott & Percy </h1>
      <p className={styles.dates}> 18 September 2027 </p>
      <p className={styles.location}> Cork, Ireland </p>
    </section>
  );
}

export default Home;
