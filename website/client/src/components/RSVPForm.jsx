//Percy Focazio-Moran

import { useState } from "react";
import styles from "./RSVPForm.module.css";

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
        `http://localhost:1818/api/guestlist/${encodeURIComponent(formData.name)}`,
      );

      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setMaxGuests(data.maxGuests);
      setVerified(true);
    } catch (err) {
      setStatus("not-found");
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
        ? `http://localhost:1818/api/rsvp/${guestId}`
        : "http://localhost:1818/api/rsvp";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit :( ");
      const data = await res.json();
      setGuestId(data.guest._id);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  const handleEdit = () => {
    setStatus(null);
  };

  if (!verified) {
    return (
      <form onSubmit={handleLookup}>
        <label>
          Enter your Name
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Find My Invite</button>
        {status === "not-found" && (
          <p>Sorry, we couldn't find that name on the guest list.</p>
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
