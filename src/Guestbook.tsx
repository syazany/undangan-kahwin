import type { Invitation, Occasion } from "./wedding";
import React, { useState } from "react";

export default function Guestbook({
  t,
  bm,
  event,
}: {
  t: Invitation;
  bm: boolean;
  event: Occasion;
}) {
  const key = "pearl-leaves:rsvp:" + event;
  const [open, setOpen] = useState(false);
  const [entry, setEntry] = useState<Record<string, string> | null>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "null");
    } catch {
      return null;
    }
  });
  const [message, setMessage] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(
      Array.from(
        new FormData(e.currentTarget),
        ([key, value]) => [key, String(value)] as const,
      ),
    );
    if (data.attendance === "no") data.guests = "0";
    try {
      localStorage.setItem(key, JSON.stringify(data));
      setEntry(data);
      setMessage(
        bm
          ? "Terima kasih. RSVP disimpan pada peranti ini."
          : "Thank you. Your RSVP is saved on this device.",
      );
    } catch {
      setMessage(bm ? "RSVP gagal disimpan." : "Your RSVP could not be saved.");
    }
  }
  return (
    <section id="rsvp" className="lc-sec lc-wine lc-rsvp">
      <div className="lc-wine-in">
        <h2 className="lc-title lc-rv">RSVP</h2>
        <p className="lc-caps lc-rv">{t.deadline}</p>
        <button
          className="lc-env lc-rv"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <img alt="" src="/media/rsvp_env.webp" />
          <span className="lc-caps">{t.tap}</span>
        </button>
        {open && (
          <form className="lc-form" onSubmit={submit}>
            <label>
              <span className="lc-caps">{t.form[0]}</span>
              <input
                name="name"
                maxLength={60}
                required
                defaultValue={entry?.name}
              />
            </label>
            <div className="lc-row2">
              <label>
                <span className="lc-caps">{t.form[1]}</span>
                <select
                  name="attendance"
                  defaultValue={entry?.attendance || "yes"}
                >
                  <option value="yes">{t.attendance[0]}</option>
                  <option value="no">{t.attendance[1]}</option>
                </select>
              </label>
              <label>
                <span className="lc-caps">{t.form[2]}</span>
                <select name="guests" defaultValue={Number(entry?.guests) || 2}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              <span className="lc-caps">{t.form[3]}</span>
              <textarea
                name="wish"
                rows={3}
                maxLength={300}
                defaultValue={entry?.wish}
              />
            </label>
            <button className="lc-btn lc-btn-light">{t.submit}</button>
            <p className="lc-sent" role="status">
              {message}
            </p>
          </form>
        )}
        <div className="lc-wishes">
          {(entry?.wish
            ? [[`“${entry.wish}”`, entry.name], ...t.wishes]
            : t.wishes
          ).map(([wish, author], i) => (
            <blockquote key={i}>
              <p>{wish}</p>
              <cite>{author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
