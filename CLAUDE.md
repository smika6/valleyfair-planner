# Valleyfair Day Trip Planner

## What This Is
A single-page Vite + React app for planning a Valleyfair amusement park day trip in Shakopee, MN. Jacob and Taylor are going when the weather is nice. This is a trip planner — rides, logistics, food, weather, budget, etc.

## Prior Art — Force Fields Planner
This project is modeled after `c:\Users\Jacob\Repo\force-fields-planner`, a festival planner built in the same stack. Reference that project for patterns, but this is a fresh build for a different kind of trip (day trip to a theme park, not a multi-day camping festival).

## Tech Stack & Architecture
- **Vite + React** — single-file `src/App.jsx` containing all components
- **No CSS files** — all styles are inline JSX `style={{}}` objects
- **Dark theme** — deep purple/space aesthetic with glassmorphism cards (can adapt for Valleyfair branding)
- **PWA** — `public/manifest.json` + `public/sw.js` (network-first caching strategy)
- **Print-to-PDF** — hidden `print-only` div renders all tabs for `window.print()`, with `@media print` styles in `index.html`

## Deployment
- **GitHub Pages** via `gh-pages` npm package
- Repo owner: `smika6` on GitHub
- Deploy command: `npm run build && npx gh-pages -d dist`
- Custom domain available via IONOS DNS — Jacob owns `jacobhopkins.me`
  - Force Fields uses `planner.jacobhopkins.me` — pick a different subdomain like `valleyfair.jacobhopkins.me`
  - Set CNAME record in IONOS pointing subdomain to `smika6.github.io`
  - Add `CNAME` file in `public/` folder with the subdomain
  - Configure custom domain in GitHub repo Settings → Pages

## Cloud Sync (Cloudflare Workers + KV)
The force-fields project uses a Cloudflare Worker + KV namespace for cross-device sync:
- Worker URL pattern: `https://<worker-name>.smikahopkins.workers.dev`
- KV namespace bound as `FF_DATA` (use a different binding name for this project)
- Worker code (reusable pattern):
```js
export default {
  async fetch(request, env) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers });
    const key = "shared-state";
    if (request.method === "GET") {
      const data = await env.KV_BINDING.get(key);
      return new Response(data || "{}", { headers });
    }
    if (request.method === "PUT") {
      const body = await request.text();
      await env.KV_BINDING.put(key, body);
      return new Response(JSON.stringify({ ok: true }), { headers });
    }
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
  },
};
```
- **Dual persistence**: localStorage for instant offline access, cloud sync (debounced 2s) for cross-device
- Jacob will need to create a new Worker + KV namespace in his Cloudflare dashboard for this project
- IMPORTANT: When creating the worker in Cloudflare, use "Hello World" Worker template (NOT static assets / Pages). The worker must be a proper Worker with code, not a Pages deployment. Previous mistake: choosing the wrong template caused the worker to serve a website instead of an API.
- After creating the worker, go to Settings → Bindings (NOT Variables and Secrets) to add the KV namespace binding.

## Git Config (local to repos)
- Email: smikahopkins@gmail.com
- Name: smika6
- Default branch: `main` (use `git branch -M main` if git defaults to `master`)

## Weather API
- **Open-Meteo** — free, no API key, CORS-enabled
- Valleyfair coordinates: 44.5983, -93.4591 (Shakopee, MN)
- Only returns forecast for ~16 days out; show static averages when trip date is further out

## People
- **Jacob** — the user, planning the trip. Phone: 763-291-8151, Email: smikahopkins@gmail.com, Emergency contact: Finley Hopkins — 763-377-3444
- **Taylor** — Jacob's partner, going on the trip

## Key Lessons from Force Fields Build
1. **Build and deploy frequently** — the user likes to see changes live after each feature
2. **localStorage keys** — prefix all keys with a project identifier (e.g., `vf-` for Valleyfair) to avoid collisions
3. **The `syncFromCloud` function must handle empty `{}` responses gracefully** — when KV has no data yet, `data.lastUpdated` will be undefined. Don't set syncStatus to "error" for this case.
4. **Budget items** — support fixed vs optional items, paid toggle, ability to add/remove custom items
5. **Packing/checklist** — use a stable key map so indices don't shift when items are deleted
6. **Crew contacts** — let anyone add their contact info (name, phone, emergency contact) via a form, synced to cloud
7. **Status/comms system** — quick status buttons + sender identification + status log with per-entry delete
8. **Tab-based navigation** — horizontal scrollable tab bar works well on mobile
9. **Print view** — render ALL tab content in a hidden div, not just the current tab
10. **Service worker** — keep `CACHE_NAME` versioned so updates propagate; use network-first strategy

## Valleyfair-Specific Content to Include
- Ride list with categories (thrill, family, water park, kids)
- Height requirements for rides
- Park hours / seasonal schedule
- Food options and dining plans
- Ticket pricing and deals
- Parking info
- Location: 1 Valleyfair Drive, Shakopee, MN 55379
- Weather-dependent planning (pick a nice day)
- What to bring checklist (sunscreen, comfortable shoes, etc.)
- Budget tracker
- Map / layout reference
