# GLERBINGO

Housewarming bingo for your guests' phones. Tap a square, snap a photo as evidence,
fill a row or column to win candy, fill the whole card for the exclusive GLERB sticker.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000 — try it on your phone by visiting your computer's
local IP address on the same wifi (e.g. http://192.168.1.23:3000), so you can test the
photo capture flow with a real camera.

## How progress is saved

Each guest's photos and prize status are saved in their browser's `localStorage`,
scoped to whichever phone + browser they opened the link in. Refreshing or closing
the tab won't erase it. It WILL reset if they clear site data, use a private/incognito
tab, or open the link in a different browser app on the same phone.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import that repo.
3. Leave all settings default (Next.js is auto-detected) → Deploy.
4. Share the resulting `*.vercel.app` link (or a custom domain) with your guests —
   that's the link they open on their phones.

## Project structure

```
app/            # Next.js App Router: layout (fonts), page, global styles
components/     # BingoCard, Square, PhotoCaptureModal, PrizePopup, Mailbox
lib/            # squares (the 16 prompts), lines (win detection), storage,
                # image (photo compression), useGameState (the glue)
public/         # background.png
```

To change the 16 squares or their order, edit `lib/squares.ts`.
