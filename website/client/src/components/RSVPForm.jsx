//Percy Focazio-Moran

import { useState } from "react";
import styles from "./RSVPForm.module.css";

//Empty in dev (Vite proxy handles /api); set VITE_API_URL in prod if the API lives elsewhere
const API_URL = import.meta.env.VITE_API_URL || "";

function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: true,
    amountAttending: "",
    food: "",
    dietary: "",
  });

  const [status, setStatus] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [verified, setVerified] = useState(false);
  const [maxGuests, setMaxGuests] = useState(1);

  const handleLookup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_URL}/api/guestlist/${encodeURIComponent(formData.email)}`,
      );

      //404 = the email really isn't on the list. Anything else = a server problem.
      if (res.status === 404) {
        setStatus("not-found");
        return;
      }
      if (!res.ok) {
        setStatus("server-error");
        return;
      }
      const data = await res.json();
      setMaxGuests(data.maxGuests);
      setStatus(null);
      setVerified(true);
    } catch {
      //fetch threw = couldn't reach the server at all
      setStatus("server-error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "attending" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEditing = !!guestId;
      const url = isEditing
        ? `${API_URL}/api/rsvp/${guestId}`
        : `${API_URL}/api/rsvp`;
      const method = isEditing ? "PUT" : "POST";

      //Send amountAttending as a number (schema expects Number); omit if blank
      const payload = {
        ...formData,
        amountAttending:
          formData.amountAttending === ""
            ? undefined
            : Number(formData.amountAttending),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit :( ");
      const data = await res.json();
      setGuestId(data.guest._id);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleEdit = () => {
    setStatus(null);
  };

  if (!verified) {
    return (
      <form onSubmit={handleLookup} className={styles.form}>
        <label>
          Enter your Email
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className={styles.button}>
          Find My Invite
        </button>
        {status === "not-found" && (
          <p>Sorry, we couldn't find that email on the guest list.</p>
        )}
        {status === "server-error" && (
          <p>
            Something went wrong on our end and we couldn&apos;t check the list.
            Please try again in a moment.
          </p>
        )}
      </form>
    );
  }
  //if verified, it continues...

  if (status === "success")
    return (
      <div>
        <p>Thank you for your RSVP! We look forward to seeing you :P </p>
        <button onClick={handleEdit}>Edit RSVP</button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Name
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Attending?
        <select
          name="attending"
          value={formData.attending}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>

      <label>
        Amount Attending
        <input
          name="amountAttending"
          type="number"
          min="1"
          max={maxGuests}
          value={formData.amountAttending}
          onChange={handleChange}
        />
        <span>Max: {maxGuests}</span>
      </label>

      <label>
        Food Option
        <select name="food" value={formData.food} onChange={handleChange}>
          <option value="">Choose...</option>
          <option value="choice1">choice1</option>
          <option value="choice2">choice2</option>
          <option value="choice3">choice3</option>
        </select>
      </label>

      <label>
        Dietary Needs
        <input
          name="dietary"
          value={formData.dietary}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className={styles.button}>
        Submit RSVP
      </button>
      {status === "error" && <p>Something went wrong. Please try again.</p>}
    </form>
  );
}

export default RSVPForm;
