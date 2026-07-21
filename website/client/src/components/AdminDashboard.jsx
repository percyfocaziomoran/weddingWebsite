//Percy Focazio-Moran
//Admin-only view of all RSVPs. Not linked from the nav; reachable at /admin.

import { useState } from "react";
import styles from "./AdminDashboard.module.css";

//Empty in dev (Vite proxy handles /api); set VITE_API_URL in prod if the API lives elsewhere
const API_URL = import.meta.env.VITE_API_URL || "";

function AdminDashboard() {
  const [secret, setSecret] = useState("");
  const [guests, setGuests] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadGuests = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/rsvp`, {
        headers: { "x-admin-secret": secret },
      });
      if (res.status === 401) throw new Error("Wrong password.");
      if (!res.ok) throw new Error("Failed to load RSVPs.");
      setGuests(await res.json());
    } catch (err) {
      setError(err.message);
      setGuests(null);
    } finally {
      setLoading(false);
    }
  };

  const deleteGuest = async (id, name) => {
    if (!window.confirm(`Delete the RSVP from ${name}?`)) return;
    try {
      const res = await fetch(`${API_URL}/api/rsvp/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });
      if (!res.ok) throw new Error("Failed to delete.");
      //Remove it from the table without a full reload
      setGuests((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  //Password gate
  if (!guests) {
    return (
      <form onSubmit={loadGuests} className={`${styles.card} ${styles.gate}`}>
        <h2 className={styles.heading}>Admin</h2>
        <label>
          Password
          <input
            type="password"
            className={styles.input}
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Loading..." : "View RSVPs"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    );
  }

  //Summary counts
  const attendingGuests = guests.filter((g) => g.attending);
  const headcount = attendingGuests.reduce(
    (sum, g) => sum + (g.amountAttending || 1),
    0,
  );

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>RSVPs</h2>
      <p className={styles.summary}>
        {guests.length} responses · {attendingGuests.length} attending ·{" "}
        {headcount} total guests coming
      </p>
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Attending</th>
            <th>Party</th>
            <th>Meal</th>
            <th>Dietary</th>
            <th>Submitted</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {guests.map((g) => (
            <tr key={g._id}>
              <td>{g.name}</td>
              <td>{g.email}</td>
              <td>{g.attending ? "Yes" : "No"}</td>
              <td>{g.attending ? g.amountAttending || 1 : "-"}</td>
              <td>{g.food || "-"}</td>
              <td>{g.dietary || "-"}</td>
              <td>
                {g.submittedAt
                  ? new Date(g.submittedAt).toLocaleDateString()
                  : "-"}
              </td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteGuest(g._id, g.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
