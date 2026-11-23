import type en from "./en.json";
import type ms from "./bm.json";
type Language = typeof en | typeof ms;
export type Occasion = keyof Language["variants"];
export type Invitation = ReturnType<typeof invitation>;
export type Phase = "sealed" | "opening" | "reveal" | "open";
export const wedding = {
  couple: [
    { name: "Syazany", fullName: "Muhammad Syazany bin Shuhaimi" },
    { name: "Atiqah", fullName: "Nur Atiqah Binti Adinan Isa" },
  ],
  date: "2027-04-17",
  start: "19:30",
  end: "22:30",
  offset: "+08:00",
  venue: "Grand Hall Dokoh Ratna",
  occasion: { en: "Bersanding Reception", bm: "Majlis Sanding" },
  guests: 500,
};
export const names = wedding.couple.map((person) => person.name);
export const displayDate = wedding.date.split("-").reverse().join(".");
const instant = (time: string) =>
  new Date(wedding.date + "T" + time + ":00" + wedding.offset);
export const startsAt = instant(wedding.start);
const stamp = (time: string) =>
  instant(time).toISOString().replace(/[-:]/g, "").replace(".000", "");

export function invitation(language: Language, event: Occasion, bm: boolean) {
  const t = { ...language, ...language.variants[event] };
  const date = startsAt.toLocaleDateString(bm ? "ms-MY" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kuala_Lumpur",
  });
  const title = wedding.occasion[bm ? "bm" : "en"];
  const query = encodeURIComponent(wedding.venue);
  const events = t.events.map((item) => {
    const details = [...item.details];
    details[0] = date + " · " + details[0].split(" · ").pop();
    if (event !== "resepsi" || item !== t.events.at(-1))
      return { ...item, details };
    const clock = (time: string) =>
      instant(time).toLocaleTimeString("en-US", {
        timeZone: "Asia/Kuala_Lumpur",
        hour: "numeric",
        minute: "2-digit",
      });
    return {
      ...item,
      name: title,
      venue: wedding.venue,
      city: "",
      details: [
        date + " · " + clock(wedding.start) + " — " + clock(wedding.end),
        wedding.guests + " " + (bm ? "tetamu" : "guests"),
      ],
      links: item.links.map((link, i) => ({
        ...link,
        url: i
          ? "https://waze.com/ul?q=" + query
          : "https://www.google.com/maps/search/?api=1&query=" + query,
      })),
    };
  });
  const venue = event === "resepsi" ? wedding.venue : t.venue;
  const calendar = new URL(t.calendar.url);
  calendar.searchParams.set(
    "dates",
    stamp(wedding.start) + "/" + stamp(wedding.end),
  );
  calendar.searchParams.set("location", venue);
  return {
    ...t,
    events,
    venue,
    city: event === "resepsi" ? title : t.city,
    calendar: { ...t.calendar, url: calendar.href },
  };
}
