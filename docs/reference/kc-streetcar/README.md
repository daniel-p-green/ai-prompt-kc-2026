# KC Streetcar Resource Bundle

Fetched: 2026-03-28
Source site: `https://kcstreetcar.org`

This folder is a local Streetcar reference pack for the public Kansas City Streetcar website. It pulls the stable public pages into local markdown snapshots, downloads linked public files, and captures the live arrival-display endpoints that KC Streetcar publishes for screens and signage.

Current bundle counts:

- `207` page/FAQ/location snapshots
- `410` post snapshots
- `337` downloaded public files
- `18` published arrival-display endpoints

## What is here

- `pages/`: local markdown snapshots of the public `page`, `faq`, and `location` sitemap content
- `posts/`: local markdown snapshots of the public `post` sitemap content
- `downloads/`: public PDFs, images, and other linked files discovered from Streetcar rider/resource pages
- `arrivals/arrival-display-endpoints.csv`: the stop-specific arrival-display URLs published on the Streetcar arrivals page
- `manifests/all-urls.txt`: all public URLs found in the Streetcar sitemap index at fetch time
- `manifests/summary.json`: current snapshot counts and the main files called out below

## Start here

- Route map: `downloads/2978_KCSA_PylonMap_RUN-122025.pdf`
- Arrival display endpoints: `arrivals/arrival-display-endpoints.csv`
- Arrival instructions snapshot: `pages/how-to-ride/arrival-times/index.md`
- Streetcar tracker snapshot: `pages/how-to-ride/streetcar-tracker/index.md`
- Rider entry page: `pages/how-to-ride/index.md`
- Route page: `pages/route/index.md`
- Hours of operation: `pages/route/hours-of-operation/index.md`
- Accessibility: `pages/how-to-ride/accessibility/index.md`
- ADA: `pages/how-to-ride/ada-compliance/index.md`
- Title VI: `pages/how-to-ride/title-vi/index.md`
- Code of conduct: `pages/how-to-ride/code-of-conduct/index.md`
- Safety: `pages/how-to-ride/safety/index.md`

## Wrap and printable design resources

- Wrap media kit: `downloads/KCStreetcarWrap-MediaKit-Digital-2026.pdf`
- Wrap design guidelines: `downloads/Streetcar-Wrap-Guidelines-2025.pdf`
- Printable wrap eligibility/categories guide: `downloads/KC-Streetcar-Wrap-Categories-Design-Guidelines-2023_Finals.pdf`
- Wrap page snapshot: `pages/sponsorship-advertising/streetcar-wraps/index.md`

## Broader project and planning resources

- About KC Streetcar: `pages/about-streetcar/index.md`
- FAQs landing page: `pages/about-streetcar/faqs/index.md`
- Individual FAQ snapshots: `pages/faq/`
- News and history archive snapshots: `posts/`
- Ridership resources: `pages/ridership/index.md` and files in `downloads/`
- Rider surveys: `pages/rider-surveys/index.md` and files in `downloads/`
- Meetings: `pages/meetings/index.md`
- Resource archive landing page: `pages/resourcesarchives/index.md`

## Notes

- The arrival-display links are live services. The URLs are archived locally, but the timing data itself still depends on the live Streetcar arrivals system.
- This bundle includes the full public `page`, `faq`, `location`, and `post` sitemap content as markdown snapshots.
- `manifests/all-urls.txt` keeps the full public sitemap inventory if you want to pull more of the site later.
