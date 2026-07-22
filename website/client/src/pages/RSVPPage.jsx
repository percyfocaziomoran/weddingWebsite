//

import RSVPForm from "../components/RSVPForm";

//Same patterned endpaper background as the inside of the book cover
const pageStyle = {
  minHeight: "80vh",
  backgroundColor: "var(--cream)",
  backgroundImage: 'url("/endpaper.svg")',
  backgroundRepeat: "repeat",
  backgroundSize: "60px 60px",
  padding: "2.5rem 1rem",
};

function RSVPPage() {
  return (
    <div style={pageStyle}>
      <RSVPForm />
    </div>
  );
}

export default RSVPPage;
