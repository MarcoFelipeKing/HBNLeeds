# CLAUDE.md — Healthy Buildings Network Leeds

Static website for the Healthy Buildings Network (HBN) at the University of Leeds.
Live at: **https://healthybuildingsnetwork.leeds.ac.uk**
Hosted on GitHub Pages. No build step, no backend, no CMS.

---

## Tech stack

- **HTML/CSS/JS** — fully static, no framework
- **Tailwind CSS** — currently loaded via CDN (`<script src="https://cdn.tailwindcss.com">`). A CLI build is configured but not yet compiled (see below).
- **Google Fonts** — Poppins (300/400/600/700) and Shadows Into Light
- **Custom CSS** — `assets/css/style.css` (layout helpers, timeline, gallery, scroll-to-top)
- **Shared JS** — `assets/js/script.js` (event filters, gallery slider, scroll-to-top, form helpers)

### Tailwind CLI (ready but not yet run)
`package.json`, `tailwind.config.js`, and `assets/css/tailwind-input.css` are configured.
To compile: `npm install && npm run build:css`
Then replace every `<script src="https://cdn.tailwindcss.com">` with `<link rel="stylesheet" href="/assets/css/tailwind.css">`.

---

## Brand colours

| Name | Hex | Tailwind class |
|---|---|---|
| hbnGreen | `#4e9317` | `text-hbnGreen`, `bg-hbnGreen` |
| hbnGreenDark | `#3d7412` | `text-hbnGreenDark` |
| hbnPurple | `#8360a9` | `text-hbnPurple` |
| hbnGray | `#808184` | `text-hbnGray` |
| hbnYellow | `#ffca29` | `text-hbnYellow` |
| hbnBlue | `#3e95dd` | `text-hbnBlue` |

Font classes: `font-poppins`, `font-shadows`

---

## Site structure

```
/
├── index.html          — Homepage
├── about.html          — About / Our Story timeline / Founders
├── blog.html           — Blog listing page (all posts as .blog-post cards)
├── events.html         — Events listing + calendar + filter
├── projects.html       — Funded projects (pump-priming + ECR)
├── membership.html     — Join the network
├── contact.html        — Contact (email + MS Forms, no form element)
├── project-map.html    — Leaflet.js interactive project map (was test.html)
├── sitemap.xml
├── robots.txt
├── blog/               — Individual blog post pages
├── events/
│   ├── workshops/
│   └── conferences/
├── projects/           — Individual project pages (clover, thermoage, etc.)
├── news/
└── assets/
    ├── css/style.css
    ├── js/script.js
    └── images/
```

---

## Key content facts

**Network directors / co-founders:**
- Martín López-García (School of Mathematics) — matml.github.io
- Irene Mussio (Business School, behavioural economics) — LinkedIn: irene-mussio
- Marco-Felipe King (Civil Engineering, human behaviour in built environment)

**Contact email:** `healthy_buildings_network@leeds.ac.uk`
**MS Forms contact link:** `https://forms.office.com/pages/responsepage.aspx?id=qO3qvR3IzkWGPlIypTW3y85tfjWzrVpCiHHCV7XeHnVURUJJRVRWSkhSS0pRMzk5QUhXUUM5RlVDUSQlQCN0PWcu&route=shorturl`

**Funded projects — two rounds:**
- Round 1 (pump-priming, £3,000 each): Living in Clover, ThermoAge, Human-Centred Housing Design, Indoor/Outdoor Air
- Round 2 (ECR-led, £1,500 each): Child-Friendly Futures, Home Microbiomes, Sonic Belonging, Infection Transmission

**Current upcoming events (as of June 2026):**
- Clear the Air workshop — 18 June 2026, Imagine Leeds, 9 Blenheim Terrace (Free)
- HBN Showcase — 2 July 2026, University of Leeds

---

## JavaScript conventions

### `assets/js/script.js`
- `initEventFilters()` — filters `.event-card` elements by `data-category` and `data-status="upcoming|past"`
- `updateCounts()` — updates `#upcoming-count` and `#past-count` in events.html stats section
- Gallery slider — targets `.gallery-slide` elements and `[data-slide]` dot buttons
- Scroll-to-top — `#scrollToTopBtn`
- Mobile menu — `#mobile-menu-button` toggles `#mobile-menu`

### Blog search (inline in blog.html)
Searches `.blog-post` elements. The search string combines:
- `data-title` attribute (keyword tags)
- `<h3>` text content
- `<p class="text-gray-600 mb-4...">` text content

Category filter uses `data-category` attribute. Both can be active simultaneously.
`hidden-post` CSS class (defined in blog.html `<style>`) applies `display: none`.

### Events filter (inline in events.html)
Filters `.event-card` by `data-category` (seminar/workshop/conference) and `data-status` (upcoming/past).

---

## SEO / meta

- `index.html` has full OG, Twitter Card, JSON-LD (Organization + Event schemas), canonical tag.
- All other main pages have OG, Twitter Card, and canonical tags.
- Blog sub-pages have Article schema (JSON-LD).
- Event sub-pages have Event schema (JSON-LD) on the clean-air and showcase pages.
- `sitemap.xml` and `robots.txt` exist at the root.

---

## Patterns to follow

**Adding a new blog post:**
1. Create `blog/my-post.html` (copy an existing one for structure)
2. Add Article JSON-LD to the `<head>`
3. Add a `.blog-post` card to `blog.html` with `data-category` and `data-title` (include keywords relevant to the topic, not just the title)
4. Add to `sitemap.xml`

**Adding a new event:**
1. Create the event page under `events/workshops/` or `events/conferences/`
2. Add Event JSON-LD to the `<head>`
3. Update `events.html`: add an `.event-card` in the upcoming section and a calendar entry
4. Update `index.html` upcoming events section if it's the next event
5. Update the hero "Next Event" box on `events.html`
6. Add to `sitemap.xml`

**When an event passes:**
1. Move its `.event-card` in `events.html` from the upcoming section to the Past Events grid
2. Update `data-status="past"`
3. Update the `#upcoming-count` and `#past-count` stat numbers
4. Update the hero "Next Event" box to the next upcoming event
5. Update the announcement bar on `index.html` if needed

---

## Things to avoid

- Do not add a `<form>` element to `contact.html` — contact is handled by email and the MS Forms link only.
- Do not use `events-archive.html` — it doesn't exist; use `events.html#calendar` instead.
- Do not use `privacy.html` — it doesn't exist; the cookie banner links to the University of Leeds privacy policy URL.
- `test.html` is a legacy file (duplicate of `project-map.html`) — do not link to it.
- Funding section on `projects.html` is deliberately evergreen (no specific round dates) — do not add specific future dates.
