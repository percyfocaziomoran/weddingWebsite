//Percy Focazio-Moran

import styles from "./OurStory.module.css";

function OurStory() {
  return (
    <section className={styles.OurStory}>
      <img src="/polaroid1.PNG" className={styles.polaroid} alt="" />
      <h1 className={styles.headStory}>Our Story</h1>
      <img src="/sticker3.PNG" className={styles.sticker3} alt="" />
      <p className={styles.meeting}>
        Elliott and Percy matched on Hinge on February 22nd, 2024...........
      </p>
      <img src="/sticker1.PNG" className={styles.sticker1} alt="" />
      <p className={styles.lorem}>
        Lorem Ipsum "Neque porro quisquam est qui dolorem ipsum quia dolor sit
        amet, consectetur, adipisci velit..." "There is no one who loves pain
        itself, who seeks after it and wants to have it, simply because it is
        pain..." What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has
        survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the
        1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus
        PageMaker including versions of Lorem Ipsum. Why do we use it? It is a
        long established fact that a reader will be distracted by the readable
        content of a page when looking at its layout. The point of using Lorem
        Ipsum is that it has a more-or-less normal distribution of letters, as
        opposed to using 'Content here, content here', making it look like
        readable English. Many desktop publishing packages and web page editors
        now use Lorem Ipsum as their default model text, and a search for 'lorem
        ipsum' will uncover many web sites still in their infancy. Various
        versions have evolved over the years, sometimes by accident, sometimes
        on purpose (injected humour and the like).{" "}
      </p>
      <img src="/sticker4.PNG" className={styles.sticker4} alt="" />
      <img src="/sticker2.PNG" className={styles.sticker2} alt="" />
    </section>
  );
}

export default OurStory;
