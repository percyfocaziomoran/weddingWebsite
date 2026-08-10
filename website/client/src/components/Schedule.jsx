//Percy

import styles from "./Schedule.module.css";
import AddToCalendar from "./AddToCalendar";

//Edit this list as you finalise the day: change the time, title, and detail
//for each event, add new ones, or remove any you don't need.
const events = [
  { time: "TBC", title: "Ceremony", detail: "Add the venue and details here." },
  { time: "TBC", title: "Drinks Reception", detail: "Add details here." },
  { time: "TBC", title: "Wedding Breakfast", detail: "Add details here." },
  { time: "TBC", title: "Speeches", detail: "Add details here." },
  { time: "TBC", title: "First Dance", detail: "Add details here." },
  { time: "TBC", title: "Evening Celebrations", detail: "Add details here." },
  { time: "TBC", title: "Carriages", detail: "Add details here." },
];

function Schedule() {
  return (
    <section className={styles.schedule}>
      <h1>Schedule</h1>
      <p className={styles.intro}>
        Here&apos;s how the day will unfold — details coming soon!
      </p>

      <AddToCalendar />

      <div className={styles.timeline}>
        {events.map((event, i) => (
          <div className={styles.event} key={i}>
            <div className={styles.time}>{event.time}</div>
            <div className={styles.card}>
              <h2 className={styles.eventTitle}>{event.title}</h2>
              <p className={styles.eventDetail}>{event.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <img src="/eli1.PNG" className={styles.eli1} alt="" />
      <img src="/eli1.PNG" className={styles.eli1Right} alt="" />
    </section>
  );
}

export default Schedule;
