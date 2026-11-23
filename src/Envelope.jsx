import React, { useRef } from "react";
import Flaps from "./Flaps";

export default function Envelope({ phase, onOpen, names, bm }) {
  const video = useRef(null);
  const label = bm ? "Sentuh meterai untuk membuka" : "Tap the seal to open";
  function unseal() {
    if (phase !== "sealed") return;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
      video.current.play().catch(() => {});
    onOpen();
  }
  return (
    <div className="cgv-cover cgv-fe-host">
      <div
        className={`cgv-fe fe-nacre ${phase !== "sealed" ? "fe-go" : ""} ${phase === "reveal" ? "fe-opened" : ""}`}
      >
        <div className="fe-card" aria-hidden="true">
          <video
            ref={video}
            className="fe-film"
            playsInline
            muted
            preload="auto"
            poster="/media/ribbon_poster.webp"
            src="/media/ribbon.mp4"
          />
          <span className="fe-sun" />
        </div>
        <Flaps />
        <button
          className="fe-seal"
          type="button"
          aria-label={label}
          title={label}
          disabled={phase !== "sealed"}
          onClick={unseal}
        >
          <span className="fe-half fe-half-l" aria-hidden="true">
            <img src="/media/seal_wax.webp" alt="" />
            <svg
              className="fe-relief"
              viewBox="0 0 128 156"
              style={{ maskImage: "url(/media/seal_wax.webp)" }}
            >
              <g filter="url(#feWaxReliefGold)">
                <text x="56" y="61">
                  {Array.from(names[0])[0]}
                </text>
                <text className="fe-relief-i" x="66" y="80">
                  &amp;
                </text>
                <text x="76" y="93">
                  {Array.from(names[1])[0]}
                </text>
              </g>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
