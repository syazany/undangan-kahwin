import React, { useEffect, useRef, useState } from "react";

export default function ScratchPhoto({ bm }) {
  const canvas = useRef(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const surface = canvas.current,
      ctx = surface.getContext("2d", { willReadFrequently: true });
    const cover = new Image();
    cover.onload = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(cover, 0, 0, surface.width, surface.height);
      ctx.globalCompositeOperation = "destination-out";
    };
    cover.src = "/media/scratch-" + (bm ? "bm" : "en") + ".webp";
    return () => {
      cover.onload = null;
    };
  }, [bm]);
  function erase(e) {
    const c = e.currentTarget,
      ctx = c.getContext("2d"),
      r = c.getBoundingClientRect();
    const x = ((e.clientX - r.left) * c.width) / r.width,
      y = ((e.clientY - r.top) * c.height) / r.height;
    ctx.beginPath();
    ctx.arc(x, y, 44, 0, 2 * Math.PI);
    ctx.fill();
  }
  function finish(e) {
    const c = e.currentTarget,
      pixels = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
    let clear = 0,
      total = 0;
    for (let y = 0; y < c.height; y += 12)
      for (let x = 0; x < c.width; x += 12) {
        if (
          ((x / c.width - 0.5) * 2) ** 2 + ((y / c.height - 0.5) * 2) ** 2 >
          1
        )
          continue;
        total++;
        if (pixels[4 * (y * c.width + x) + 3] < 30) clear++;
      }
    if (clear / total > 0.42) setRevealed(true);
  }
  return (
    <section className="lc-sec lc-scratch">
      <div className="lc-scratch-oval lc-rv">
        <img
          src="/media/couple.webp"
          alt={bm ? "Pasangan pengantin" : "The couple"}
        />
        {!revealed && (
          <canvas
            ref={canvas}
            width="444"
            height="592"
            role="button"
            tabIndex="0"
            aria-label={bm ? "Gosok untuk melihat" : "Scratch to reveal"}
            onKeyDown={(e) => {
              if ([" ", "Enter"].includes(e.key)) {
                e.preventDefault();
                setRevealed(true);
              }
            }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              erase(e);
            }}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId)) erase(e);
            }}
            onPointerUp={finish}
          />
        )}
      </div>
    </section>
  );
}
