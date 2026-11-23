import React, { useState } from "react";

const host = "https://undangankahwin.com";
export default function Toolbar({ bm, event, opened, names, onNames }) {
  const [editing, setEditing] = useState(false);
  const lang = bm ? "bm" : "en",
    query = (l, e) => "?lang=" + l + "&acara=" + e;
  const label = bm ? "Cuba nama anda" : "Try your names";
  const types = {
    tunang: bm ? "Bertunang" : "Engagement",
    nikah: "Nikah",
    resepsi: bm ? "Resepsi" : "Reception",
  };
  return (
    <header className={"preview-tools" + (opened ? " opened" : "")}>
      <nav aria-label="Design" className="design-bar pill">
        <a href={host + "/catalogue"} aria-label="Catalogue">
          ≡
        </a>
        <a
          href={
            host + "/concierge-templates/cg-renda-mutiara" + query(lang, event)
          }
          aria-label="Previous design"
        >
          ‹
        </a>
        <strong>{bm ? "Daun Mutiara" : "Pearl Leaves"}</strong>
        <a
          href={
            host +
            "/concierge-templates/cg-selendang-mutiara" +
            query(lang, event)
          }
          aria-label="Next design"
        >
          ›
        </a>
        <span>·</span>
        {["bm", "en"].map((l) => (
          <a
            aria-current={l === lang ? "page" : undefined}
            key={l}
            href={query(l, event)}
          >
            {l.toUpperCase()}
          </a>
        ))}
      </nav>
      <div className="name-tools">
        <button
          className="try"
          aria-expanded={editing}
          aria-label={label}
          onClick={() => setEditing(!editing)}
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m3 16-1 6 6-2L21 7q3-3 0-5t-5 1zM15 5l5 5" />
          </svg>
          {!opened && label}
        </button>
        {editing && (
          <form
            className="name-panel"
            onSubmit={(e) => {
              e.preventDefault();
              const d = new FormData(e.currentTarget);
              onNames([
                String(d.get("groom")).trim() || "Rayyan",
                String(d.get("bride")).trim() || "Sofea",
              ]);
              setEditing(false);
            }}
          >
            <strong>
              {bm
                ? "Tengok design ni dengan nama anda"
                : "See this design with your names"}
            </strong>
            {["groom", "bride"].map((key, i) => (
              <label key={key}>
                {
                  (bm
                    ? ["Nama pengantin lelaki", "Nama pengantin perempuan"]
                    : ["Groom’s name", "Bride’s name"])[i]
                }
                <input name={key} maxLength="40" defaultValue={names[i]} />
              </label>
            ))}
            <button>{bm ? "Tunjuk" : "Preview"}</button>
            <small>
              {bm
                ? "Untuk pratonton sahaja. Nama disimpan dalam browser anda."
                : "For preview only. Names are saved in your browser."}
            </small>
          </form>
        )}
      </div>
      <nav className="occasion pill" aria-label="Occasion">
        {Object.entries(types).map(([key, value]) => (
          <a
            aria-current={key === event ? "page" : undefined}
            key={key}
            href={query(lang, key)}
          >
            {value}
          </a>
        ))}
      </nav>
      <a
        className="order"
        href={host + "/order/cg-daun-mutiara?acara=" + event}
      >
        {bm ? "Tempah" : "Order"} {opened ? "·" : "—"} RM199 →
      </a>
    </header>
  );
}
