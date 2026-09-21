# Volvo Cars Card for Home Assistant

A custom Lovelace card for one or more Volvo vehicles connected through Home Assistant's **official `Volvo` integration** (Volvo Cars API — supports both electric/plug-in hybrid and combustion vehicles).

Unlike many custom cards, this one requires no external dependencies — no charting library, no map library. Everything is rendered with native SVG and plain HTML, and it reads your vehicles' data by auto-discovering entities from the HA **device** you pick for each car, instead of asking you to hand-pick 15+ individual entity IDs.

![](screenshots/overview.svg)

---

## Features

- **Auto-discovery** — pick each vehicle's HA device once; the card finds its battery/fuel, range, lock, door/window, charging, location and consumption entities on its own
- **Battery or fuel overview** — a range/charge ring for electric and plug-in hybrid vehicles, a plain range readout for combustion vehicles (no fake gauge when there's no real percentage to show)
- **Doors & windows** — a top-down diagram highlighting only the open door/window/hood/tailgate, plus a plain-text summary
- **Quick actions with confirm** — lock/unlock, climatization on/off, and horn/lights (offered separately as Horn, Lights, or Horn & lights) all call the vehicle's real Home Assistant services, but only after an extra confirm tap — the first tap just reveals the choice, nothing happens until you tap again
- **Charging status** (electric/plug-in hybrid only) — status, power, time left, target level; the whole section is simply absent for a combustion-only vehicle, not just hidden
- **Engine start/stop** (combustion/PHEV only) — same tap-to-confirm flow as the other actions
- **Service & health** — odometer, distance/time/engine-hours to service, and a curated set of fluid and tire-pressure warnings; collapsed to a one-line summary ("All good" or an issue count), expands to full detail on tap
- **Trip data** — trip meter and average speed for both the manual and automatic trip counters, collapsed to a one-line header by default
- **Vehicle photo** — an optional picture shown above the name (`picture` config option)
- **Location** — an "open in map" link from the vehicle's device tracker
- **Consumption trend** — a small sparkline built from Home Assistant's own History API (average energy or fuel consumption over a configurable window); automatically falls back between the integration's different sensor variants depending on which one your vehicle actually exposes
- **Distance driven** — a 7-day bar chart derived from odometer history (day-over-day distance, not a fake trip list)
- **Lease mileage budget** (optional) — set an annual km limit and your lease's start date, and the card shows how much you have left, whether you're on pace, and an annual usage chart with a projection at your current driving rate. The odometer baseline can be typed in or auto-detected from Home Assistant's own long-term statistics.
- **Multiple vehicles** in one card, each configured independently
- Visual (GUI) editor — no YAML required to get started
- UI auto-translates to your Home Assistant language — English or Swedish (falls back to English)
- Theme-aware — uses Home Assistant's own CSS variables, matches your light or dark theme automatically
- Registers with `window.customCards` for the HA card picker

---

## Requirements

- Home Assistant's own **[Volvo integration](https://www.home-assistant.io/integrations/volvo)** must already be set up for your vehicle(s). This card does not talk to Volvo's API itself — it only reads the entities that integration creates.
- Not every vehicle exposes every entity (varies by model/market). The card simply hides a section or field it can't find data for.

---

## Installation

### Via HACS (custom repository)

This card isn't in the HACS default catalog yet. Add it as a custom repository:

1. HACS → ⋮ → **Custom repositories**
2. Repository: `https://github.com/johro897/volvo-cars-card`, Category: **Dashboard**
3. Install **Volvo Cars Card**, then reload your browser.

### Manual install

1. Copy `volvo-cars-card.js` to `/config/www/volvo-cars-card.js`
2. Add the resource in `configuration.yaml`:

```yaml
lovelace:
  resources:
    - url: /local/volvo-cars-card.js
      type: module
```

Or via the UI: **Settings → Dashboards → ⋮ → Resources → Add resource**

3. Restart Home Assistant (or reload resources).

---

## Configuration

Use the visual editor (**Edit dashboard → Add card → Volvo Cars Card**) to add each vehicle by picking its HA device — no YAML required.

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `vehicles` | list | **required**, at least one | Each entry: `device_id` (required, the HA device for that Volvo), `name` (optional display name override), `icon` (optional, e.g. `mdi:car-electric`, shown next to the name), `picture` (optional image URL shown above the name, e.g. `/local/xc60.jpg`), `lease_annual_limit_km` (optional, enables the Lease budget section, e.g. `20000`), `lease_start_date` (required if the limit is set, `YYYY-MM-DD` — the lease's anniversary date, recomputed every year), `lease_start_odometer_km` (optional but recommended — the odometer reading at the start of the *current* lease year; if omitted, the card tries to auto-detect it from Home Assistant's long-term statistics for the odometer sensor), `lease_pace_tolerance_pct` (optional, default `3` — how many percent of the annual limit counts as "on pace" before the status flips to over/under), `lease_pace_basis` (optional, default `"today"` — `"today"` compares usage-so-far to a proportional target, `"projected"` compares the extrapolated year-end total to the limit instead, `"remaining_rate"` compares your actual recent daily average to the recalculated remaining daily budget) |
| `show_stats` | boolean | `true` | Show the consumption sparkline section |
| `stats_history_hours` | integer | `168` (7 days) | How far back the consumption sparkline looks |
| `layout` | string | `"auto"` | `"auto"` wraps to a single column when the dashboard column is too narrow; `"horizontal"` forces one column per vehicle, side by side, regardless of width; `"vertical"` always stacks vehicles in one column |
| `title` | string | *(none — auto-translated, "Volvo Cars"/"Volvo Cars")* | Card header text. Set to an empty string to hide the header row entirely. |

```yaml
type: custom:volvo-cars-card
vehicles:
  - device_id: "01abc..."
    name: XC60
  - device_id: "01def..."
    name: V60
show_stats: true
```

---

## Not included (yet)

- **An embedded map** instead of an "open in map" link — no map library is used in this project; a real embedded map would be a separate, larger decision.
- **A real street address** instead of coordinates/"Home" — would require an external reverse-geocoding service (e.g. OpenStreetMap Nominatim), which would be this project's first dependency outside Home Assistant's own API. Not pursued without an explicit decision to accept that tradeoff.
- **Individual window/sunroof remote control**, **exact tire pressure (PSI/kPa)**, and **charge scheduling** — none of these are exposed as controllable/available data by the Volvo integration as far as verified; not a card limitation.
- **Trip-by-trip history** (individual trips with date/distance/route, like Volvo's own app) — deliberately not built. Home Assistant's official `Volvo` integration only exposes cumulative trip-meter and average-speed sensors, not a per-trip list; the old `volvooncall` integration that did expose trip data is deprecated and known to over-poll Volvo's API. The distance-driven trend above is the closest honest substitute.
- Only a curated subset of the integration's warning sensors are shown (fluids, tire pressure) — the dozen individual light-bulb-failure warnings aren't included yet.

---

## Troubleshooting

**A section or field is missing.** The card only shows what it can actually find under the device you picked. If your vehicle doesn't have that entity (e.g. no `sunroof` binary sensor, no charging sensors on a combustion car), the card hides that part rather than showing an empty placeholder.

**A vehicle shows "Waiting for data…" in place of the battery/fuel ring.** The card couldn't find a battery-percentage or fuel-amount sensor under that device yet. Give Home Assistant's Volvo integration a moment after setup, or check **Developer Tools → States** for that device's entities.

**Nothing shows up at all.** Make sure you picked the right HA **device** (not entity) in the editor — one device per vehicle, as created by the official Volvo integration.

**No consumption stat/sparkline shows up even though I have a Volvo EV/combustion car.** The integration only creates a sensor at all if Volvo's API actually returns that specific field for your vehicle, and there are several variants of the consumption sensor. The card tries all of them, so if you still see nothing, check **Developer Tools → States** for any entity under your car's device whose name contains "average energy consumption" or "average fuel consumption" — if none exist at all, your vehicle simply doesn't expose this data via the integration.

**The vehicle icon (`icon:` config option) doesn't show up.** It's rendered with Home Assistant's own `<ha-icon>` element, which — unlike the custom `<select>` this card builds for the device picker — is not something built ourselves, so it's a (much lower-risk, but not zero-risk) assumption that it's always available. If it doesn't render, leave `icon` unset; nothing else depends on it.

**The Lease budget section shows "Collecting data…" and never resolves.** This means the card couldn't establish a baseline: no `lease_start_odometer_km` was set, and no long-term statistics were found for the odometer sensor going back to your lease's anniversary date. The most common cause is that Home Assistant simply hasn't been tracking the vehicle that far back yet. Fix: set `lease_start_odometer_km` manually — it's optional but recommended anyway, since the auto-detected value is only as precise as the nearest weekly statistics point.

---

## Changelog

### 0.9.1 (2026-09-21)

Fixes two real points of confusion reported right after 0.9.0 shipped:

- The annual usage chart's projection label now states the over/under delta directly ("~22630 km at this rate (+2630 km vs. target)") instead of a lone total the reader had to subtract from the target themselves to connect to the summary line's own "X km over pace" figure.
- The `"projected"` pace basis (and the "rest days needed" figure, which shares the same year-to-date extrapolation) now waits until at least 21 days into the lease year before it drives the status — a deviation this early gets amplified by a large multiplier and produced a dramatic, unreliable number (47 "rest days needed" after only ~10 days, in the reported case). Before day 21, the summary falls back to the `"today"` comparison and shows *"Collecting more data before projecting (day N of 365)"* instead, so the fallback isn't silently different from what was configured.

### 0.9.0 (2026-09-21)

- The Lease budget's over/under-pace status is now configurable per vehicle instead of a fixed rule, after a real report that "On pace" and the annual usage chart's own projection could disagree early in a lease year:
  - `lease_pace_tolerance_pct` — how wide the ± band is before pace counts as over/under (default `3`, matching the previous fixed behavior).
  - `lease_pace_basis` — which comparison decides the status: `"today"` (default, unchanged — usage-so-far vs. a proportional target), `"projected"` (the extrapolated year-end total vs. the limit — catches an early-year trend the default basis can miss), or `"remaining_rate"` (your actual recent daily average vs. the recalculated remaining daily budget — reacts to current driving without a single rested week masking a bad year-long trend, or a projection-style formula dividing by a rate that can hit exactly 0).
  - The "rest days needed" note/tile (0.8.2) is hidden under `"remaining_rate"`, since that basis already answers the same question directly via the rate comparison itself.

### 0.8.2 (2026-09-20)

- The Lease budget section now shows how many rest (0 km) days are needed to land back on budget, whenever you're over pace: inline in the collapsed summary ("64 km over pace · 2 rest days needed") and as its own stat tile once expanded. Uses the year-to-date average pace (the same basis the existing pace/projection numbers already use), not a short recent window — a 7-day average can hit exactly 0 after a single rested week and make the number swing to "nothing needed" overnight even though the year-long picture hasn't really changed. Closes #8.

### 0.8.1 (2026-09-20)

- Bar charts (Distance driven, Lease budget's "Last 7 days") now show a hover tooltip with the exact day and value, instead of only a height to eyeball against the axis scale (closes #7).

### 0.8.0 (2026-09-13)

- All four charts (consumption sparkline, Distance driven bars, Lease budget's annual usage chart, and its "Last 7 days" bars) now stretch to the card's full width instead of being squeezed into a narrow, centered strip — the two lease charts were missing `preserveAspectRatio="none"` entirely (closes #6), unlike the other two charts which already had it (but had no labels — see below).
- Added real axis values to the consumption sparkline and Distance driven bars: a y-axis min/max (or scale) label and, respectively, start/end date labels or a weekday label per bar — previously these two charts were just a bare trend shape with no way to read an actual number off them (closes #1).
- All chart text (axis values, weekday/date labels, budget/projection annotations) is now plain HTML positioned around/over the chart instead of inline SVG `<text>` — necessary once the charts stretch non-uniformly to fill the full width, since SVG text (and the old circle "today" marker, now a short line) would otherwise visibly distort under that stretch.

### 0.7.1 (2026-09-13)

- Fixed a real gap in the Lease budget section: the daily distance chart ("Last 7 days") shown in the reviewed design was missing from the actual `0.7.0` release — only the separate, pre-existing Distance driven section existed. Added a dedicated 7-day bar chart, colored per day against the lease's own daily budget (annual limit ÷ 365), so it's visible whenever a vehicle has lease tracking configured, even with `show_stats: false`.

### 0.7.0 (2026-09-13)

- Added an optional **Lease mileage budget** section (closes #2): set an annual km limit and lease start date, get a countdown, a pace status, and an annual usage chart with a projection at your current rate. The odometer baseline can be entered manually or auto-detected from Home Assistant's long-term statistics.

### 0.6.2 (2026-09-12)

- Added a `title` config option — the header was previously a hardcoded, non-configurable "Volvo Cars" string with no way to change or hide it

### 0.6.1 (2026-09-12)

- Added a Trip data section (trip meter + average speed, manual and automatic)
- Added a `picture` config option to show a photo of the vehicle
- Charging section now also shows connection status, charging type, and current limit
- The battery ring now draws a marker at the configured charge target level

### 0.6.0 (2026-09-12)

- **Fixed a real bug**: the average energy/fuel consumption stat was missing for vehicles that only expose a non-default sensor variant (`_automatic` or `_charge`) rather than the base one — the card now tries all variants
- Added a **Service & health** section: odometer, distance/time/engine-hours to service, and fluid/tire-pressure warnings, collapsed to a one-line summary by default
- Added **engine start/stop** as a fourth quick action (combustion/PHEV vehicles only)
- Added a **distance-driven** 7-day bar chart derived from odometer history
- Extended the door/window diagram with sunroof, tank/charge flap, and rear window zones
- Wired up the previously-unused `icon` config option into the vehicle header

### 0.5.5 (2026-09-12)

- Every action (lock, climate, horn/lights) now requires an extra confirm tap instead of firing immediately — the icon arms a confirm chip, and only tapping that chip actually calls the service
- Horn/lights now offers three separate choices (Horn, Lights, Horn & lights) using the integration's separate button entities, instead of always firing both together

### 0.5.4 (2026-09-12)

- Added a `layout` option (`auto` / `horizontal` / `vertical`) so vehicles can be forced side by side even in a narrow dashboard column, instead of always wrapping to a single column

### 0.5.3 (2026-09-12)

- Fixed the visual editor re-rendering its entire DOM on every `hass` update — in a live Home Assistant instance this happens continuously, so opening the device dropdown and trying to pick an option closed it instantly. The editor now only re-renders when the device list or language actually changes.

### 0.5.2 (2026-09-12)

- Fixed the visual editor dropping `type` from the card config on every edit (e.g. clicking "+ Add vehicle"), which made Home Assistant's edit dialog report "No card type configured" even though the card itself was configured correctly
- Added a regression test asserting `type` survives editor round-trips

### 0.5.1 (2026-09-12)

Found by the owner testing `0.5.0` against real vehicles for the first time:

- The device picker in the visual editor never appeared at all — replaced with a self-built dropdown (`hass.devices`, filtered to Volvo devices) instead of relying on `ha-device-picker`, which doesn't reliably load in every Home Assistant frontend session
- "+ Add vehicle" updated the editor's own view but never saved the change, so the card kept reporting a configuration error even after adding a vehicle row
- Also fixes two bugs caught in self-review before the report above: an invalid CSS value that made the quick-action buttons' tinted backgrounds invisible, and a checkbox/number field in the editor that silently ignored changes
- Added a checked-in, dependency-free test suite (`test/volvo-cars-card.test.html`) covering both regressions and the core rendering/action behavior

### 0.5.0 (2026-09-12)

Initial early release — feedback and tweaks expected before a `1.0.0`.

- Auto-discovery of vehicle entities from a picked HA device (verified against the official `Volvo` integration's source)
- Battery/fuel overview, doors & windows diagram, lock/climate/horn quick actions, charging status, location link, consumption sparkline
- Multi-vehicle support, visual editor, EN/SV translations, theme-aware styling

---

## License

MIT — see [LICENSE](LICENSE).
