# ViduOS — Vidu's 20th birthday

A static site (plain HTML, CSS and JavaScript; nothing to install or build). It is designed for a phone;
on a laptop it shows the same phone in the middle of the screen.

```
index.html          the page and the drawn decorations (stars, lilies, butterflies, bows)
js/content.js       EVERY piece of text, photo name and song name — the only file you edit
js/app.js           behaviour
css/style.css       look
assets/photos/      your photos go here
assets/audio/       your two mp3 files go here
```

## Before you send it

### 1. Write the letter

Open `js/content.js`, find `letter:` near the bottom and replace the two placeholder lines in `body`.
One quoted string per paragraph, separated by commas:

```js
body: [
  "First paragraph.",
  "Second paragraph."
],
```

If a paragraph contains a double quote, write it as `\"`.

### 2. Add the photos

Save each photo as a `.jpg` with exactly this name in `assets/photos/`. A missing photo shows a pink
"[ ADD PHOTO ]" box with the file name it expects, so nothing breaks while you fill them in.

| File | Where it appears |
|---|---|
| `hero.jpg` | first screen, the polaroid under her name (her best solo photo) |
| `abhi.jpg` | you — incoming-call screen and the Messages header (shown as a circle) |
| `vidu-profile.jpg` | VIDU.exe profile picture (square crop) |
| `first-date.jpg` | OUR_MEMORIES 01 — the first first date |
| `seven-sisters.jpg` | OUR_MEMORIES 02 — 7 Sisters dinner |
| `urban-nemo.jpg` | OUR_MEMORIES 03 — Urban Nemo / Hussain Sagar |
| `sattva.jpg` | OUR_MEMORIES 04 — Sattva Knowledge Park |
| `mirame.jpg` | OUR_MEMORIES 05 — Mirame and ice cream |
| `chilis.jpg` | OUR_MEMORIES 06 — Chili's in the rain |
| `cali-b.jpg` | OUR_MEMORIES 08 — California Burrito |
| `harry-potter.jpg` | OUR_MEMORIES 09 — Harry Potter on GMeet (a screenshot works) |
| `wall-01.jpg` … `wall-06.jpg` | OUR_MEMORIES, "the wall" collage (any photos; captions are in `memories.wall`) |
| `vidu-baby.jpg` | VIDU_LORE — a childhood photo |
| `cat.jpg` | KITTEN_CAM — the real hostel cat |
| `final.jpg` | the present, at the very end (the two of you) |

- iPhone photos are often `.heic`, which browsers cannot show. Export or convert them to JPEG first.
- Shrink them to about 1400 px on the long side; full-size phone photos make the site slow on mobile data.
- To add or remove wall photos or memories, edit the lists in `memories` in `js/content.js`. A memory with
  `photo: ""` shows its `emoji` instead of a photo (memory 07, "the call", is set up that way). A memory
  with a `stamp` gets an orange camera date stamp on the photo.

### 3. Add the songs

Put two mp3 files in `assets/audio/`:

- `thinkin-bout-you.mp3`
- `tere-liye.mp3`

The first song starts when she picks up the call. If a file is missing, the iPod shows a link that opens
the song in Spotify instead. Fill in the artist for "Tere Liye" under `music` in `js/content.js`.

### 4. Read every line once

All the jokes and captions are in `js/content.js`, written from what you told me. Change anything that
does not sound like you.

## Preview

Double-click `index.html`, or to see it on your own phone (same Wi-Fi as the laptop):

```bash
cd ~/vidu-birthday
python3 -m http.server 8000
# then open http://<laptop-ip>:8000 on the phone
```

Add these to the address while checking (they are for you, not for her):

| Address ending | Effect |
|---|---|
| `?reset` | forget all progress and start from the boot screen |
| `?skip` | go straight to the home screen |
| `?skip&app=memories` | open one app directly (`profile`, `memories`, `lore`, `secret`, `slides`, `race`, `cat`, `messages`, `ipod`, `cake`, `letter`) |
| `?skip&stars=all&app=letter` | open the letter without collecting stars |
| `?skip&stars=all&app=letter&demo=reveal` | jump to the final present screen |
| `?skip&eepy` | show the after-10:30 "eepy" mode at any time of day |

## Put it online

The folder is the whole site; any static host works. The simplest is Netlify: create a free account,
then drag the `vidu-birthday` folder onto <https://app.netlify.com/drop>. It gives you a link to send.

Anyone who has the link can see the photos. The page asks search engines not to list it, but it is not
password-protected.

## How she gets through it (spoilers)

1. Boot screen, then your incoming call. Declining does not work.
2. Slide to unlock.
3. Each app gives a star the first time she opens it. Two need finishing: TOP_SECRET (enter the
   passcode) and CAKE (blow out all 20 candles).
4. TOP_SECRET passcode: `0607` (`0706` also works). Hints appear after wrong tries; the one lavender
   butterfly on the home screen gives the hint too.
5. At 7 stars (`starsToUnlock` in `content.js`) FOR_YOU unlocks: your letter, then she presses and holds
   the hand for about three seconds to open the present.

Hidden extras: the lavender butterfly; the CAPS LOCK label in the status bar; the "patience 3%" battery
(tap it three times); the greyed-out Hinge icon; petting the cat nine times; the "Daddy" contact request
at the end of MESSAGES, where the "never" button runs away four times; examining all ten slides; the
clock (after 10:30 pm it grows a moon and announces that she is eepy); the footer line about who wrote
the jokes (tap it); the "who's funnier" poll in VIDU.exe.

## Fonts

Loaded from Google Fonts, so the phone needs to be online: Pacifico (script), Bagel Fat One (chunky
headings), Pixelify Sans and Silkscreen digits (pixel text), Caveat (handwriting), Playfair Display
(magazine serif). No other outside libraries.
