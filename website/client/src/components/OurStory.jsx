//Percy Focazio-Moran

import styles from "./OurStory.module.css";

//Edit your milestones here: change the date, title, and detail, add new
//moments, or remove any you don't need. They appear top-to-bottom.
//To add a photo to a milestone, drop the file in client/public/ and add an
//"img" property, e.g. img: "/first-date.jpg". Leave it off for no photo.
const events = [
  {
    date: "22 Feb 2024",
    title: "Match!",
    detail:
      "Elliott made the first move: a flirty comment about the book on Percy's profile.",
    img: "",
  },
  {
    date: "18 March 2024",
    title: "Our first date",
    detail: "We met at the Marina Market, feeling nervecited.",
    img: "",
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
    img: "",
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
    detail: "Add details here.",
    img: "",
  },
  {
    date: "29 July 2026",
    title: "Percy's proposal",
    detail: "Add details here.",
    img: "",
  },
  {
    date: "18 Sep 2027",
    title: "We get married!",
    detail: "Venue",
    img: "",
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
