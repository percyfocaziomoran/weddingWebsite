import RSVPForm from "./components/RSVPForm";
import OurStory from "./components/OurStory";
import Home from "./components/Home";
import Schedule from "./components/Schedule";
import "./App.css";

function App() {
  return (
    <div>
      <nav>
        <a href="#story">Our Story</a>
        <a href="#schedule">Schedule</a>
        <a href="#rsvp">RSVP</a>
      </nav>
      <Home />
      <section id="story">
        <OurStory />
      </section>
      <section id="rsvp">
        <RSVPForm />
      </section>
      <section id="schedule">
        <Schedule />
      </section>
    </div>
  );
}

export default App;
