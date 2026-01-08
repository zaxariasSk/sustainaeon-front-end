import { useState } from "react";

const API = process.env.REACT_APP_SERVER_URL;

export default function ConsultationRequestPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    preferredDate: "",
    message: "",
    website: "",
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/consultations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    
    if (res.ok) setSent(true);
  };

  if (sent) return <p>Thank you! We’ll contact you soon.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="website"
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
        onChange={(e) => setForm({ ...form, website: e.target.value })}
      />

      <input
        placeholder="Your name"
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Your email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="date"
        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
      />

      <textarea
        placeholder="Message (optional)"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button type="submit">Book Free Consultation</button>
    </form>
  );
}
