//

import { Link } from "react-router-dom";

function Nav() {
  const rsvpd = localStorage.getItem("rsvpAttending") === "true";

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/our-story">Our Story</Link>
      {rsvpd && <Link to="/schedule">Schedule</Link>}
      <Link to="/rsvp">RSVP</Link>
      <Link to="/photogallery">Photo Gallery</Link>
      <Link to="/dogs">Our Dogs</Link>
    </nav>
  );
}

export default Nav;
