import { useState } from "react";
import "./consulation.css";
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
    <main
      role="main"
      aria-labelledby="consultation-title"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <header>
        <h1 id="consultation-title" itemProp="name">
          Book a Free Consultation
        </h1>

        <p id="consultation-intro" itemProp="description">
          Share your details and preferred date. We’ll get back to you shortly.
        </p>
      </header>

      <section
        aria-labelledby="consultation-title"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        <form
          onSubmit={handleSubmit}
          aria-describedby="consultation-intro form-privacy"
          aria-label="Free consultation booking form"
          noValidate
          itemScope
          itemType="https://schema.org/ContactPoint"
        >
          {/* Honeypot (anti-bot). Hidden from users + assistive tech */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: 1,
              height: 1,
            }}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />

          <div>
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              required
              aria-required="true"
              aria-label="Your full name"
              itemProp="name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email">Your email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              autoComplete="email"
              inputMode="email"
              required
              aria-required="true"
              aria-label="Your email address"
              itemProp="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="preferredDate">Preferred date</label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              autoComplete="off"
              aria-label="Preferred consultation date"
              itemProp="availableFrom"
              onChange={(e) =>
                setForm({ ...form, preferredDate: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="message">Message (optional)</label>
            <textarea
              id="message"
              name="message"
              placeholder="Message (optional)"
              autoComplete="off"
              aria-label="Optional message"
              itemProp="description"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <p id="form-privacy" className="sr-only">
            By submitting this form, you agree that we may contact you via email
            about your consultation request.
          </p>

          <button
            type="submit"
            aria-label="Submit consultation request"
            itemProp="potentialAction"
          >
            Book Free Consultation
          </button>
        </form>

        {/* If you render your success message here instead of early-return,
          this aria-live region will announce it properly */}
        {sent ? (
          <p role="status" aria-live="polite" aria-atomic="true">
            Thank you! We’ll contact you soon.
          </p>
        ) : null}
      </section>
    </main>
  );
}
