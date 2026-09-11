//Percy Focazio-Moran

import styles from "./OurStory.module.css";

const events = [
  {
    date: "22 Feb 2024",
    title: "Match!",
    detail:
      "Elliott made the first move: a flirty comment about the book on Percy's profile.",
    img: "Hinge.png",
  },
  {
    date: "18 March 2024",
    title: "Our first date",
    detail: "We met at the Marina Market, feeling nervecited.",
    img: "/marinamarket.jpg",
  },
  {
    date: "18 April 2024",
    title: "Made it official",
    detail: "Percy asked Elliott to be their partner, and Eli said yes!",
    img: "",
  },
  {
    date: "28 August 2024",
    title: "Our first holiday",
    detail: "Travelled to Edinburgh together",
    img: "/polaroid1.PNG",
  },
  {
    date: "18 April 2025",
    title: "Our first anniversary",
    detail: "Celebrated in Amsterdam, surrounded by tulips.",
    img: "amsterdam.jpeg",
  },
  {
    date: "14 February 2026",
    title: "Engagement rings",
    detail: "We made our rings together in a Dublin jewellery shop.",
    img: "",
  },
  {
    date: "29 July 2026",
    title: "Eli's proposal",
    detail:
      "Eli took Percy night kayaking in a bioluminescent lake before getting down on one knee.",
    img: "/loughhyne2.jpg",
  },
  {
    date: "18 August 2026",
    title: "Percy's proposal",
    detail:
      "Percy took Eli on a scavenger hunt across Cork before proposing in middle of an outdoor feast in a fern garden.",
    img: "/marrymedistant.jpg",
  },
  {
    date: "29 August 2026",
    title: "Engagement Dinner",
    detail: "Close family meetup to celebrate",
    img: "",
  },
  {
    date: "17 Sep 2027",
    title: "Rehearsal Dinner",
    detail: "",
    img: "",
  },
  {
    date: "18 Sep 2027",
    title: "We get married!",
    detail: "Cork, Ireland",
    img: "/sticker10.jpg",
  },
];

function OurStory() {
  return (
    <section className={styles.OurStory}>
      <h1 className={styles.headStory}>Our Story</h1>

      <div className={styles.timeline}>
        {events.map((event, i) => (
          <div className={styles.item} key={i}>
            <span className={styles.date}>{event.date}</span>
            <div className={styles.card}>
              {event.img && (
                <img
                  src={event.img}
                  alt={event.title}
                  className={styles.eventPhoto}
                />
              )}
              <h2 className={styles.eventTitle}>{event.title}</h2>
              <p className={styles.eventDetail}>{event.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <img src="/sticker3.PNG" className={styles.sticker3} alt="" />
      <img src="/sticker1.PNG" className={styles.sticker1} alt="" />
      <img src="/sticker4.PNG" className={styles.sticker4} alt="" />
      <img src="/sticker2.PNG" className={styles.sticker2} alt="" />
      <img src="/sticker5.PNG" className={styles.sticker5} alt="" />
      <img src="/sticker6.PNG" className={styles.sticker6} alt="" />
      <img src="/sticker7.png" className={styles.sticker7} alt="" />
      <img src="/sticker8.PNG" className={styles.sticker8} alt="" />
    </section>
  );
}

export default OurStory;
