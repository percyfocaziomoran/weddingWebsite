//Percy

import styles from "./Schedule.module.css";
import AddToCalendar from "./AddToCalendar";

//Edit this list as you finalise the day: change the time, title, and detail
//for each event, add new ones, or remove any you don't need.
const events = [
  { time: "1:00PM", title: "Ceremony", detail: "TBD" },
  { time: "2:00PM", title: "Drinks Reception", detail: "TBD" },
  { time: "5:00PM", title: "Dinner", detail: "TBD" },
  { time: "7:30PM", title: "Reception", detail: "TBD" },
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
      <img src="/percy.png" className={styles.eli1Right} alt="" />
    </section>
  );
}

export default Schedule;
