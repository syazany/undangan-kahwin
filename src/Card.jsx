import React, { Fragment, useEffect, useRef, useState } from "react";
import Guestbook from "./Guestbook";
import ScratchPhoto from "./ScratchPhoto";

const gallery = [
  "midnight",
  "midnight-bride",
  "midnight-groom",
  "midnight-garden",
  "midnight-lake",
];
const palette = [
  "#8A9A7B",
  "#B3C0A4",
  "#EDE7D9",
  "#B4694F",
  "#DCA79A",
  "#EFDDD1",
];
const media = (name) => "/media/" + name + ".webp";
function Art({ name, ...props }) {
  return <img alt="" src={media(name)} {...props} />;
}
function Heading({ children }) {
  return <h2 className="lc-title lc-rv">{children}</h2>;
}
function Countdown({ t }) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const seconds = Math.max(
    0,
    Math.floor((Date.parse("2027-01-23T19:30:00+08:00") - now) / 1000),
  );
  const digits = [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];
  return (
    <section className="lc-sec lc-wine lc-countdown">
      <div className="lc-wine-in">
        <Heading>{t.countdown}</Heading>
        <div className="lc-count lc-rv">
          {digits.map((n, i) => (
            <div key={t.units[i]}>
              <b>{n}</b>
              <small>{t.units[i]}</small>
            </div>
          ))}
        </div>
        <p className="lc-script lc-soon lc-rv">{t.soon}</p>
      </div>
    </section>
  );
}
function Gift({ t, bm, personalize }) {
  const [status, setStatus] = useState("");
  return (
    <section className="lc-sec lc-gift">
      <div className="lc-gift-card lc-rv">
        <h2 className="lc-script lc-script-title">{t.gift[0]}</h2>
        <p className="lc-lead">{t.gift[1]}</p>
        <p className="lc-p">{t.gift[2]}</p>
        {t.banks.map(([bank, number, name, copy]) => (
          <div className="lc-acct" key={bank}>
            <span className="lc-caps">{bank}</span>
            <b>{number}</b>
            <span>{personalize(name)}</span>
            <button
              className="lc-btn lc-btn-sm"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    number.replaceAll(" ", ""),
                  );
                  setStatus(bank);
                } catch {
                  setStatus(number);
                }
              }}
            >
              {status === bank ? (bm ? "Disalin" : "Copied") : copy}
            </button>
            {status === number && <output>{number}</output>}
          </div>
        ))}
      </div>
    </section>
  );
}
export default function Card({ t, names, open, bm, event }) {
  const card = useRef(null);
  useEffect(() => {
    if (!open) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("lc-in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.05 },
    );
    card.current.querySelectorAll(".lc-rv").forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [open]);
  const personalize = (text) =>
    text.replace(/Rayyan|Sofea/g, (match) => names[match === "Rayyan" ? 0 : 1]);
  const calendar = new URL(t.calendar.url);
  calendar.searchParams.set(
    "text",
    personalize(calendar.searchParams.get("text")),
  );
  return (
    <article
      ref={card}
      inert={!open}
      className={"lc lc-nacre" + (open ? " lc-open" : "")}
    >
      <section className="lc-hero" id="home">
        <Art name="hero" className="lc-hero-bg" />
        <div className="lc-hero-in">
          <p className="lc-together lc-h1">{t.title}</p>
          <h1 className="lc-names lc-h2">
            <span className="lc-n1">{names[0]}</span>
            <span className="lc-amp">&amp;</span>
            <span className="lc-n2">{names[1]}</span>
          </h1>
          <p className="lc-date lc-h3">23.01.2027</p>
          <Art className="lc-venue-sk lc-h4" name="venue" />
          <div className="lc-h5">
            <p className="lc-venue">{t.venue}</p>
            <p className="lc-caps lc-place">{t.city}</p>
          </div>
        </div>
      </section>
      <section className="lc-sec lc-intro">
        <Art name="sprig" className="lc-sk lc-sk-swans lc-rv" />
        <p className="lc-bism lc-rv" dir="rtl" lang="ar">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
        <p className="lc-caps lc-salam-caps lc-rv">{t.greeting}</p>
        <p className="lc-p lc-p-own lc-rv">{t.intro}</p>
        <div className="lc-verse lc-rv">
          <p className="lc-italic">{t.verse}</p>
          <p className="lc-caps">{t.verseSource}</p>
        </div>
      </section>
      <section className="lc-sec lc-couple-sec" id="couple">
        <Heading>{t.couple}</Heading>
        <div className="lc-family">
          {t.family.map((p, i) => (
            <Fragment key={p.role}>
              {i === 1 && <p className="lc-script lc-fam-amp lc-rv">&amp;</p>}
              <div className="lc-fam lc-rv">
                <p className="lc-caps lc-fam-role">{p.role}</p>
                <p className="lc-fam-name">{personalize(p.fullName)}</p>
                <p className="lc-fam-par">
                  {p.parents[0]}
                  <br />
                  {p.parents[1]}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
      <section className="lc-sec lc-loc" id="events">
        <Heading>{t.eventsHeading}</Heading>
        {t.events.map((v, i) => (
          <div className="lc-ev lc-rv" key={v.name}>
            <p className="lc-caps lc-ev-name">{v.name}</p>
            <p className="lc-script" style={{ fontSize: i ? 30 : 35 }}>
              {v.venue}
            </p>
            <p className="lc-caps">{v.city}</p>
            <p className="lc-p">
              {v.details[0]}
              <br />
              {v.details[1]}
            </p>
            {v.illustrated && <Art name="venue" className="lc-venue-wc" />}
            {v.links.map((link, i) => (
              <a
                key={link.url}
                className={"lc-btn" + (i ? " lc-btn-waze" : "")}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
        <a
          className="lc-btn lc-btn-cal lc-rv"
          target="_blank"
          rel="noreferrer"
          href={calendar.href}
        >
          {t.calendar.label}
        </a>
      </section>
      <Countdown t={t} />
      <ScratchPhoto bm={bm} />
      <section className="lc-sec lc-day">
        <Heading>{t.day}</Heading>
        <p className="lc-sub lc-rv">{t.dayIntro}</p>
        <ol className="lc-tl">
          {t.schedule.map(([time, label, note]) => (
            <li className="lc-rv" key={time}>
              <div className="lc-tl-l">
                <span>{time}</span>
              </div>
              <i aria-hidden="true" />
              <div className="lc-tl-r">
                <b className="lc-caps">{label}</b>
                {note && <p>{note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="lc-sec lc-dress">
        <div className="lc-dress-arch lc-rv">
          <h2 className="lc-title">{t.dress[0]}</h2>
          <p className="lc-script lc-dress-sub">{t.dress[1]}</p>
          <Art name="dress" className="lc-sk lc-sk-dress" />
          <p className="lc-p">{t.dress[2]}</p>
          <div className="lc-swatches">
            {palette.map((color) => (
              <span key={color} style={{ background: color }} />
            ))}
          </div>
          <Art name="seal" className="lc-dress-seal" />
        </div>
      </section>
      <section className="lc-sec lc-photos" id="gallery">
        <Heading>{t.gallery}</Heading>
        <figure className="lc-ph lc-ph-wide lc-rv">
          <Art name={gallery[0]} loading="lazy" />
        </figure>
        <div className="lc-ph-pair">
          {gallery.slice(1).map((name) => (
            <figure className="lc-ph lc-ph-arch lc-rv" key={name}>
              <Art name={name} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>
      <Gift t={t} bm={bm} personalize={personalize} />
      <Guestbook t={t} bm={bm} event={event} />
      <section className="lc-sec lc-close">
        <p className="lc-italic lc-rv">{t.closing}</p>
        <p className="lc-script lc-rv">
          <span className="lc-cn">{names[0]}</span>
          <span className="lc-camp"> &amp; </span>
          <span className="lc-cn">{names[1]}</span>
        </p>
        <p className="lc-date lc-rv">23.01.2027</p>
        <p className="lc-foot">
          <a href="https://undangankahwin.com" target="_blank" rel="noreferrer">
            undangankahwin.com
          </a>
        </p>
      </section>
    </article>
  );
}
