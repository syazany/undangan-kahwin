# Daun Mutiara · Pearl Leaves

A React and Vite recreation of the [Pearl Leaves wedding invitation](https://undangankahwin.com/concierge-templates/cg-daun-mutiara?lang=en&acara=resepsi).

## Run locally

Use Node.js 22.12 or newer. Run `npm ci` and `npm run dev`. Use `npm run build` for the static production site in `dist/`, or `npm run preview` to serve that build.

The default page opens the English reception invitation. The toolbar switches between English and Bahasa Melayu and between engagement, akad nikah and reception. For a Malay reception link, use `/?lang=bm&acara=resepsi`.

## Replace the reference media

The invitation serves its artwork, fonts, video and soundtrack locally. Replace files in `public/media/` using their existing names to preserve the layout.

| Files | Where they appear |
| --- | --- |
| `paper.webp`, `pocket.webp`, `inside.webp` | Top flap, lower pocket and envelope lining |
| `paper_glint.webp`, `pocket_glint.webp`, `nacre-*.webp` | Iridescent highlights |
| `seal_wax.webp` | Gold seal beneath the live initials |
| `ribbon.mp4`, `ribbon_poster.webp` | Opening film and its still frame |
| `hero.webp`, `venue.webp`, `drapes.webp`, `gift_frame.webp` | Card and event artwork |
| `couple.webp`, `scratch-en.webp`, `scratch-bm.webp` | Scratch-to-reveal portrait and covers |
| `midnight*.webp` | Gallery photographs |
| `rsvp_env.webp` | RSVP envelope |
| `pufino-sentimental.mp3` | Looping background music |

The opening film is a 1080 × 1920 H.264 MP4 lasting 7.7 seconds. Tapping the seal starts the film and the flap animation together. The invitation begins fading in at 7.45 seconds. A replacement clip of a different length needs corresponding timing changes in `src/main.tsx` and `src/envelope.css`.

## Invitation details

Edit the couple, Sanding venue, guest count, date and reception hours in `src/wedding.ts`. Both languages use those details for the card, countdown, maps and calendar. The language files contain translated copy and template defaults. The name preview updates the initials and names on the device.

RSVP responses and wishes are stored in the guest's browser. Collecting responses across devices requires a shared backend. Catalogue navigation, adjacent designs and the order button link to the reference provider.
