# HBN Leeds — Site Backlog
> Audited 2026-06-17. 41 HTML pages checked. Issues grouped by priority.

---

## P1 — Broken (visible failures right now)

### BUG-01 · Showcase panellists: all 6 photos broken
**File:** `events/conferences/hbn-showcase-2026.html`
The HTML references a `panellists/` subfolder that does not exist. The photos ARE in the showcase root but under different filenames with no subfolder.

HTML references → actual files that exist:
| Referenced | Actual file in showcase root |
|---|---|
| `panellists/doug.jpg` | `Douglas-Booker-2.jpg` |
| `panellists/abigail.jpg` | `abigail-hathway.jpg` |
| `panellists/bruno.jpg` | `bruno-fraga.jpg` |
| `panellists/dejan.jpg` | `dejan_mumovic.jpeg` |
| `panellists/prashant.jpg` | `prashant-kumar.jpg` |
| `panellists/rajat.jpg` | `rajat-gupta-p0020979-large.jpg` |

**Fix options:** Create the `panellists/` subfolder and move/rename the files there, OR update the HTML to use the actual filenames. Latter is quicker.

---

### BUG-02 · Showcase: 2 more missing images (no fallback)
**File:** `events/conferences/hbn-showcase-2026.html`
- `../../assets/images/events/showcase/suparna.jpeg` — file does not exist (Dr Suparna Mitra's project card)
- `../../assets/images/events/showcase/projects/passivehouse.jpg` — `projects/` subfolder does not exist; the passive house image is likely to be something in the assets tree

**Fix:** Add the missing photos, or update src to an existing image as a placeholder.

---

### BUG-03 · `blog_sarah_price.html` — footer nav links wrong depth
**File:** `blog/blog_sarah_price.html`
Footer links use bare filenames (`href="index.html"`, `href="about.html"`, etc.) instead of `../index.html`. Every footer link on this page is a 404.

**Fix:** Prefix all footer links with `../`.

---

### BUG-04 · `whose_power.html` — CSS and favicon paths wrong depth
**File:** `events/workshops/whose_power.html`
Page is at depth `events/workshops/` so assets need `../../`. The nav links correctly use `../../` but the `<head>` uses `../`:
- `<link rel="stylesheet" href="../assets/css/style.css">` → should be `../../assets/css/style.css`
- `<link rel="icon" href="../assets/images/hbn_fav.ico">` → should be `../../assets/images/hbn_fav.ico`

**Fix:** Change both to `../../`.

---

### BUG-05 · `air-quality-workshop.html` — nav links one level too deep
**File:** `events/workshops/air-quality-workshop.html`
Page is in `events/workshops/` (2 levels deep) but nav links use `../../../` (3 levels). Every nav link is broken.

**Fix:** Replace all `../../../` with `../../` in nav and footer links.

---

### BUG-06 · `events_qmra_workshop.html` — nav links one level too shallow
**File:** `events/workshops/events_qmra_workshop.html`
Page is in `events/workshops/` (2 levels deep) but nav uses `../` (1 level). Every nav link broken.

**Fix:** Replace all `../` nav/footer links with `../../`.

---

### BUG-07 · Sonic workshop card image missing on events.html
**File:** `events.html` line ~250
References `events/workshops/sonic/images/lujin-guzheng.jpg` — the `images/` subfolder does not exist in the sonic workshop folder.

**Fix:** Either create the subfolder and add the image, or update the src to the existing `guzheng.jpg` in the showcase folder, or another appropriate image.

---

## P2 — Significant content/SEO issues

### CONTENT-01 · `blog_chuck.html` missing from blog listing
**File:** `blog.html`
`blog/blog_chuck.html` exists and is a full post (Chuck Gerba seminar) but has no card on `blog.html`, so it is completely undiscoverable. It also has no OG/canonical tags.

**Fix:** Add a `.blog-post` card to `blog.html` for the Chuck Gerba seminar.

---

### CONTENT-02 · `whose_power.html` and `louis.html` orphaned — not on events.html
**Files:** `events/workshops/whose_power.html`, `events/seminars/louis/louis.html`
Both are complete event pages but not linked from `events.html`. Users landing on `events.html` cannot find them.

**Fix:** Add past-event cards for "Whose Power? Energy, Housing & Health" and the Louis Platman Museum of the Home seminar to `events.html`.

---

### CONTENT-03 · `blog/rethinking_design_process.html` doesn't exist
**Files linking to it:** `blog/biophilic.html`, `blog/louis-platman.html`, `blog/pete-apps-grenfell.html`, `blog/social_sciences.html`
All four posts have a "Related Posts" or footer link to this page which was never created.

**Fix:** Either create the page, or remove the links from all four posts.

---

### CONTENT-04 · Living in Clover project page missing — two links broken
- `project-map.html` links to `projects/living-in-clover.html` (doesn't exist; the page is `projects/clover.html`)
- `blog/pump-priming-progress.html` links to `../projects/living-in-clover.html`
- `project-map.html` also links to `projects/cloverleaf.html` (doesn't exist)
- `projects/clover.html` itself has a related-projects link to `cloverleaf.html` (same page?)

**Fix:** Update all links to `projects/clover.html` and remove/fix the `cloverleaf.html` references.

---

### CONTENT-05 · `events.html` past-count stat says 22 but only 14 past cards
**File:** `events.html` line 167
`<div id="past-count">22</div>` — only 14 `data-status="past"` event cards exist on the page. The count is wrong.

**Fix:** Update to `14`, or add the missing past event cards (Whose Power, Louis seminar, and others not yet added).

---

### CONTENT-06 · 25 pages still show copyright 2025 in footer
A global footer find-and-replace is needed: `© 2025 Healthy Buildings` → `© 2026 Healthy Buildings`

Pages affected include all blog sub-pages, all project sub-pages, news/launch_2024.html, and event sub-pages.

---

### CONTENT-07 · Clear the Air (18 June) needs post-event update
**Deadline: 19 June 2026**
After tomorrow's event:
1. Move Clear the Air card in `events.html` from upcoming to past section, set `data-status="past"`
2. Update `#upcoming-count` to `1` (only Showcase remains upcoming)
3. Update `#past-count` to `15`
4. Update `events.html` hero "Next Event" box to show HBN Showcase (2 July)
5. Update `index.html` announcement bar to the Showcase event

---

### SEO-01 · hbn-showcase-2026.html missing OG/Twitter/canonical tags
**File:** `events/conferences/hbn-showcase-2026.html`
This is the highest-traffic page right now (linked from announcements, registration) but has no OG or canonical meta tags. Every share on social posts an ugly unfurled link.

**Fix:** Add OG/Twitter Card/canonical block to `<head>` matching the pattern used on main pages.

---

### SEO-02 · All blog sub-pages missing OG/canonical (14 pages)
All pages under `blog/` are missing `og:title`, `og:description`, `og:url`, and `<link rel="canonical">`. They do have Article JSON-LD (added previously) but social sharing is unoptimised.

**Fix:** Batch-add OG/canonical to all 14 blog pages. Can be scripted.

---

### SEO-03 · All event and project sub-pages missing OG/canonical
Pages in `events/workshops/`, `events/seminars/`, `events/conferences/`, `projects/` all lack OG tags.

---

## P3 — Missing assets, incomplete pages, minor breaks

### BUG-08 · `biophilic.html` broken image ref — wrong extension
**File:** `blog/biophilic.html`
References `../assets/images/blogs/biophilic.jpeg` — the file is `biophilic.jpg` (`.jpg` not `.jpeg`).

**Fix:** Change to `biophilic.jpg`.

---

### BUG-09 · Multiple blog posts reference non-existent images
Mostly generic placeholder images that were never added:

| File | Missing image |
|---|---|
| `blog/biophilic.html` | `design_process.jpg`, `team_zhang.jpg` |
| `blog/blog_chuck.html` | `../events/seminars/gerba/khalid_iljaz_quote.jpg` |
| `blog/blog_jacobo.html` | `jacobo/jacobo_profile.jpg` |
| `blog/interview_marco.html` | `hospital_ventilation.jpg` |
| `blog/interview_martin.html` | `blog_industry_partner.jpg`, `team_lopez.jpg` |
| `blog/pete-apps-grenfell.html` | `events/seminars/grenfell/grenfelltower1112.jpg` |
| `blog/pump-priming-progress.html` | `blog_air_purification.jpg`, `blog_thermal_comfort.jpg`, `team_king.jpg` |
| `blog/social_sciences.html` | `arts_engineering_collaboration.jpg` |
| `blog/louis-platman.html` | `design_process.jpg` |

**Fix:** Source or create appropriate images, or remove broken `<img>` tags.

---

### BUG-10 · membership.html testimonial images missing
**File:** `membership.html`
References `assets/images/testimonial_engineer.jpg` and `assets/images/testimonial_prof.jpg` — neither exists.

**Fix:** Add real testimonial photos or remove the testimonial section.

---

### BUG-11 · project-map.html missing placeholder feature images
**File:** `project-map.html`
References `assets/images/featured_project_1/2/3.jpg` — none exist.

---

### BUG-12 · `UKIEG2025.html` — all 8 images broken (img/mockup/* paths)
**File:** `events/conferences/UKIEG2025.html`
All image paths reference `/img/mockup/` which does not exist. This is a mockup-stage page that was never properly finished.

---

### BUG-13 · `apple-touch-icon.png` missing
**File:** `index.html` line 82
`<link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png">` — file does not exist.

**Fix:** Create a 180×180 apple-touch-icon from the HBN logo, or remove the tag.

---

### CONTENT-08 · Old/duplicate showcase page: `HBN_showcase.html`
**File:** `events/conferences/HBN_showcase.html`
A legacy Bootstrap-based draft that says the event is on "1 July" (wrong — it's 2 July), uses a completely different design, has no nav, and is not linked from anywhere. Confusing if indexed.

**Fix:** Delete the file. Add it to an `.htaccess` or `_redirects` rule if needed.

---

### CONTENT-09 · `test.html` still exists (duplicate of `project-map.html`)
Per CLAUDE.md, `test.html` should not be linked to. It still exists and shows in `git`. It also has broken image links.

**Fix:** Delete `test.html`.

---

### CONTENT-10 · `blog/info.html` — orphaned HTML fragment, no page structure
**File:** `blog/info.html`
An HTML fragment (no `<html>`, `<head>`, `<body>`) with a universities/housing infographic. Not linked anywhere. Appears to be a discarded concept.

**Fix:** Delete, or integrate content into a proper page if the idea is still relevant.

---

### CONTENT-11 · `blog/ukieg-conference-preview.html` — orphaned, no structure
**File:** `blog/ukieg-conference-preview.html`
Exists but has no h1, no OG tags, and is not linked from `blog.html` or anywhere else.

**Fix:** Either add a card to `blog.html` for this post, or delete it.

---

### CONTENT-12 · Device-generated filenames still in showcase folder
**File:** `assets/images/events/showcase/`
The following files have device-generated names and can't be used meaningfully without renaming:
`1517549163578.jpeg`, `1701531327395.jpeg`, `1733391725626.jpeg`, `1764933784831.jpeg`, `IMG_2191.jpeg`, `RJ.jpg`, `scene_simon.jpg`, `rajat-gupta-p0020979-large.jpg`

**Fix:** Identify what each photo shows and rename accordingly.

---

### SITEMAP-01 · sitemap.xml missing index.html and several sub-pages
`index.html` itself is not in `sitemap.xml`. Also missing: event sub-pages (sonic, whose_power, microbiome workshop) and the showcase page.

---

## P4 — Polish / minor

### POLISH-01 · `blog/louis-platman.html` has 2 `<h1>` tags
Two `<h1>` headings on one page — accessibility and SEO issue.

### POLISH-02 · `blog/air-quality-workshop.html` has 0 `<h1>` tags
Also misfiled in `blog/` but is really an event page.

### POLISH-03 · Showcase page: 8 project card images missing `alt` text
**File:** `events/conferences/hbn-showcase-2026.html`
The 8 project images (Gleb Yakubov, ThermoAge, Alexa, Passive House, Guzheng, Child Friendly, undraw SVG, Suparna) have the `alt` attribute present but as a split across tag lines — checker sees them as missing. Verify and consolidate.

### POLISH-04 · `index.html` has one intentionally-empty `alt` on non-decorative image
`building_roger.jpg` has `alt=""` — if it communicates content (hero background), it needs descriptive alt text. If purely decorative, this is fine.

### POLISH-05 · `HBN_showcase.html` and `UKIEG2025.html` have no mobile menu
Legacy pages that use Bootstrap-based layout rather than the HBN nav component.

### POLISH-06 · Footer `<script src="assets/js/script.js">` wrong path in 3 pages
**Files:** `blog/healthy-buildings-definition.html`, `projects/clover.html`, `projects/thermoage.html`
The `src` path doesn't have the correct relative depth prefix — these pages won't run the shared scroll/menu JS.

---

## Future enhancements

- **Missing project pages:** No dedicated pages for the 4 ECR projects (Sonic Belonging, Child-Friendly, Infection Transmission, Microbiome). `projects/clover.html`, `projects/thermoage.html`, `projects/indoor-outdoor-air.html`, and `projects/human-centered-housing.html` exist for PP projects only.
- **Blog post gap:** No posts covering the ECR-led workshops from Spring 2026 (infection transmission symposium, microbiome workshop, child-friendly seminar, sonic belonging workshop)
- **Whose Power recap post:** `events/workshops/whose_power.html` exists but no blog recap has been written
- **Post-showcase content:** After 2 July, the showcase page and about.html timeline will need updating
- **Tailwind CLI build:** `package.json` and `tailwind.config.js` are set up but CDN is still in use — running `npm install && npm run build:css` and swapping tags would eliminate the CDN dependency
- **UKIEG2025 page:** Currently broken with all images missing; either restore properly or redirect to the blog post recap
