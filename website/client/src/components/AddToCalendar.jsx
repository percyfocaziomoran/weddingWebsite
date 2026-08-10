//Percy
//A button that adds the wedding to the guest's calendar.
//- "Download .ics" works for Apple Calendar, Outlook, and most apps.
//- "Google Calendar" opens a prefilled event in the browser.

import styles from "./AddToCalendar.module.css";

//All-day event on 18 Sep 2027. All-day dates use YYYYMMDD, and the END date
//is the day AFTER (calendars treat the end as exclusive).
const EVENT = {
  title: "Elliott & Percy's Wedding",
  location: "Cork, Ireland",
  description: "We're getting married! More details at our website.",
  start: "20270918",
  end: "20270919",
};

function icsContent() {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Elliott and Percy//Wedding//EN",
    "BEGIN:VEVENT",
    "UID:wedding-2027@focazio-moran.com",
    `DTSTART;VALUE=DATE:${EVENT.start}`,
    `DTEND;VALUE=DATE:${EVENT.end}`,
    `SUMMARY:${EVENT.title}`,
    `LOCATION:${EVENT.location}`,
    `DESCRIPTION:${EVENT.description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadIcs() {
  //Turn the text into a downloadable file and click a temporary link
  const blob = new Blob([icsContent()], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "elliott-and-percy-wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}

const googleUrl =
  "https://www.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(EVENT.title)}` +
  `&dates=${EVENT.start}/${EVENT.end}` +
  `&location=${encodeURIComponent(EVENT.location)}` +
  `&details=${encodeURIComponent(EVENT.description)}`;

function AddToCalendar() {
  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.button} onClick={downloadIcs}>
        Add to calendar (.ics)
      </button>
      <a
        className={styles.button}
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Google Calendar
      </a>
    </div>
  );
}

export default AddToCalendar;
