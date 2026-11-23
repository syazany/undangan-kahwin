import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import en from "./en.json";
import ms from "./bm.json";
import Card from "./Card";
import Toolbar from "./Toolbar";
import Envelope from "./Envelope";
import "./fonts.css";
import "./stage.css";
import "./card.css";
import "./envelope.css";
import "./app.css";

const query = new URLSearchParams(location.search);
const bm = query.get("lang") === "bm";
const language = bm ? ms : en;
const event = Object.hasOwn(language.variants, query.get("acara"))
  ? query.get("acara")
  : "resepsi";
const t = { ...language, ...language.variants[event] };
document.documentElement.lang = bm ? "ms" : "en";
document.title =
  (bm ? "Daun Mutiara" : "Pearl Leaves") + " · " + t.title + " Rayyan & Sofea";
function App() {
  const [names, setNames] = useState(() => {
    try {
      const n = JSON.parse(localStorage.getItem("pearl-leaves:names"));
      if (n?.length === 2 && n.every((s) => typeof s === "string" && s.trim()))
        return n;
    } catch {}
    return ["Rayyan", "Sofea"];
  });
  const [phase, setPhase] = useState("sealed"),
    [playing, setPlaying] = useState(false);
  const audio = useRef(null),
    progress = useRef(null);
  const opened = phase === "reveal" || phase === "open";
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    function scroll() {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.current.style.transform =
        "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
    }
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (phase === "opening" || phase === "reveal") {
      const timer = setTimeout(
        () => setPhase(phase === "opening" ? "reveal" : "open"),
        phase === "opening" ? (reduced ? 500 : 7450) : reduced ? 0 : 1300,
      );
      return () => clearTimeout(timer);
    }
  }, [phase]);
  function play() {
    audio.current.play().catch(() => setPlaying(false));
  }
  return (
    <>
      <Toolbar
        {...{ bm, event, opened, names }}
        onNames={(next) => {
          setNames(next);
          try {
            localStorage.setItem("pearl-leaves:names", JSON.stringify(next));
          } catch {}
        }}
      />
      <div className="cgv cgv-lacecard cgv-toile cgv-plate">
        <div className="cgv-stage">
          <aside className="cgv-side" aria-hidden="true">
            <img src="/media/hero.webp" alt="" />
            <div className="cgv-side-brand">
              <div className="cgv-s1">{t.title}</div>
              <div className="cgv-s2">
                <span className="cgv-nl cgv-nl-stacked">
                  <span className="cgv-nl-n">{names[0]}</span>
                  <span className="cgv-nl-amp">&amp;</span>
                  <span className="cgv-nl-n">{names[1]}</span>
                </span>
              </div>
            </div>
          </aside>
          <main className="cgv-invite">
            <div className="cgv-progress">
              <i ref={progress} />
            </div>
            {phase !== "open" && (
              <Envelope
                {...{ phase, names, bm }}
                onOpen={() => {
                  play();
                  setPhase("opening");
                }}
              />
            )}
            <Card {...{ t, names, bm, event }} open={opened} />
          </main>
        </div>
        <audio
          ref={audio}
          loop
          preload="none"
          src="/media/pufino-sentimental.mp3"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {opened && (
          <button
            className="cgv-disc cgv-show"
            aria-label={bm ? "Togol muzik" : "Toggle music"}
            aria-pressed={playing}
            onClick={() => (playing ? audio.current.pause() : play())}
          />
        )}
      </div>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
