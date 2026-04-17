//

import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/our-story">Our Story</Link>
      <Link to="/schedule">Schedule</Link>
      <Link to="/rsvp">RSVP</Link>
    </nav>
  );
}

export default Nav;
