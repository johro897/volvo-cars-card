(() => {
  const CARD_NAME = "volvo-cars-card";
  const EDITOR_NAME = "volvo-cars-card-editor";

  if (customElements.get(CARD_NAME)) return;

  const DEFAULT_LANG = "en";
  const TRANSLATIONS = {
    en: {
      title: "Volvo Cars",
      locked: "Locked",
      unlocked: "Unlocked",
      climate_on: "Climate on",
      doors_windows: "Doors & windows",
      all_closed: "All closed",
      open_suffix: "open",
      charging: "Charging",
      charging_status: "Status",
      charging_power: "Power",
      charging_time_left: "Time left",
      charging_target: "Target",
      charging_connection: "Connection",
      charging_type: "Type",
      charging_current_limit: "Current limit",
      trip_data: "Trip data",
      trip_manual: "Trip A",
      trip_speed_manual: "Trip A avg. speed",
      trip_automatic: "Trip B",
      trip_speed_automatic: "Trip B avg. speed",
      home: "Home",
      stats_avg: "Avg · {days}d",
      no_history: "No history yet",
      lock_action: "Lock / unlock",
      climate_action: "Climate",
      honk_action: "Horn & lights",
      confirm_lock: "Tap to lock",
      confirm_unlock: "Tap to unlock",
      confirm_climate_on: "Tap to start climate",
      confirm_climate_off: "Tap to stop climate",
      honk_horn: "Horn",
      honk_lights: "Lights",
      honk_both: "Horn & lights",
      engine_action: "Engine",
      confirm_engine_on: "Tap to start engine",
      confirm_engine_off: "Tap to stop engine",
      engine_on: "Engine running",
      service_health: "Service & health",
      service_ok: "All good",
      service_issues: "{count} issue(s)",
      no_warnings: "No active warnings",
      odometer: "Odometer",
      distance_to_service: "Distance to service",
      time_to_service: "Time to service",
      engine_time_to_service: "Engine hours to service",
      days_unit: "days",
      hours_unit: "hours",
      distance_trend: "Distance driven · last {days}d",
      lease_budget: "Lease budget",
      lease_waiting: "Collecting data…",
      lease_over_limit: "{km} km over the limit",
      lease_over_pace: "{km} km over pace",
      lease_under_pace: "{km} km under pace",
      lease_on_pace: "On pace",
      lease_km_left: "km left this year",
      lease_days_left: "days left in lease year",
      lease_chart_title: "Annual usage vs. budget",
      lease_target: "Target {km} km",
      lease_projection: "~{km} km at this rate",
      lease_start_label: "Start",
      lease_today_label: "Today",
      lease_end_label: "End",
      lease_legend: "Solid = driven · dashed grey = budget pace · dashed amber = projection at current rate",
      lease_baseline_auto: "Baseline: auto-detected from history",
      lease_baseline_manual: "Baseline: {km} km · manually entered",
      editor_lease_limit: "Annual lease limit (km, optional)",
      editor_lease_start_date: "Lease start date (YYYY-MM-DD, optional)",
      editor_lease_start_odometer: "Odometer at lease start (km, optional — recommended)",
      brake_fluid_level_warning: "Brake fluid low",
      coolant_level_warning: "Coolant level low",
      oil_level_warning: "Oil level warning",
      washer_fluid_level_warning: "Washer fluid low",
      tire_front_left: "Front left tire pressure",
      tire_front_right: "Front right tire pressure",
      tire_rear_left: "Rear left tire pressure",
      tire_rear_right: "Rear right tire pressure",
      door_front_left: "Front left door",
      door_front_right: "Front right door",
      door_rear_left: "Rear left door",
      door_rear_right: "Rear right door",
      hood: "Hood",
      tailgate: "Tailgate",
      tank_lid: "Fuel/charge flap",
      window_front_left: "Front left window",
      window_front_right: "Front right window",
      window_rear_left: "Rear left window",
      window_rear_right: "Rear right window",
      sunroof: "Sunroof",
      vehicles_required: "'vehicles' is required and must include at least one vehicle",
      vehicles_duplicate: "Duplicate device: {device}",
      vehicle_missing_device: "Each vehicle needs a device_id",
      editor_title: "Card title (optional)",
      editor_vehicles: "Vehicles",
      editor_add_vehicle: "+ Add vehicle",
      editor_remove: "Remove",
      editor_device: "Device",
      editor_name: "Name (optional)",
      editor_icon: "Icon (optional)",
      editor_picture: "Photo URL (optional)",
      editor_show_stats: "Show statistics",
      editor_stats_hours: "Statistics window (hours)",
      editor_select_device: "Select a device…",
      editor_layout: "Layout",
      layout_auto: "Auto (wrap when narrow)",
      layout_horizontal: "Horizontal (side by side)",
      layout_vertical: "Vertical (stacked)",
      waiting: "Waiting for data…",
    },
    sv: {
      title: "Volvo Cars",
      locked: "Låst",
      unlocked: "Olåst",
      climate_on: "Klimat på",
      doors_windows: "Dörrar & fönster",
      all_closed: "Allt stängt",
      open_suffix: "öppet",
      charging: "Laddning",
      charging_status: "Status",
      charging_power: "Effekt",
      charging_time_left: "Tid kvar",
      charging_target: "Mål",
      charging_connection: "Anslutning",
      charging_type: "Typ",
      charging_current_limit: "Strömgräns",
      trip_data: "Tripp-data",
      trip_manual: "Tripp A",
      trip_speed_manual: "Tripp A snitthastighet",
      trip_automatic: "Tripp B",
      trip_speed_automatic: "Tripp B snitthastighet",
      home: "Hemma",
      stats_avg: "Snitt · {days}d",
      no_history: "Ingen historik ännu",
      lock_action: "Lås / lås upp",
      climate_action: "Klimat",
      honk_action: "Signalhorn & blink",
      confirm_lock: "Tryck för att låsa",
      confirm_unlock: "Tryck för att låsa upp",
      confirm_climate_on: "Tryck för att starta klimat",
      confirm_climate_off: "Tryck för att stoppa klimat",
      honk_horn: "Signalhorn",
      honk_lights: "Blink",
      honk_both: "Signalhorn & blink",
      engine_action: "Motor",
      confirm_engine_on: "Tryck för att starta motorn",
      confirm_engine_off: "Tryck för att stoppa motorn",
      engine_on: "Motor igång",
      service_health: "Service & hälsa",
      service_ok: "Allt OK",
      service_issues: "{count} anmärkning(ar)",
      no_warnings: "Inga aktiva varningar",
      odometer: "Mätarställning",
      distance_to_service: "Till service",
      time_to_service: "Tid till service",
      engine_time_to_service: "Motortimmar till service",
      days_unit: "dagar",
      hours_unit: "timmar",
      distance_trend: "Körd sträcka · senaste {days}d",
      lease_budget: "Leasingbudget",
      lease_waiting: "Samlar data…",
      lease_over_limit: "{km} km över gränsen",
      lease_over_pace: "{km} km över takt",
      lease_under_pace: "{km} km under takt",
      lease_on_pace: "I takt",
      lease_km_left: "km kvar i år",
      lease_days_left: "dagar kvar av leasingår",
      lease_chart_title: "Årsförbrukning vs. budget",
      lease_target: "Mål {km} km",
      lease_projection: "~{km} km i denna takt",
      lease_start_label: "Start",
      lease_today_label: "Idag",
      lease_end_label: "Slut",
      lease_legend: "Heldragen = körd sträcka · streckad grå = budgettakt · streckad amber = prognos vid nuvarande takt",
      lease_baseline_auto: "Baslinje: automatiskt hittad från historik",
      lease_baseline_manual: "Baslinje: {km} km · manuellt angiven",
      editor_lease_limit: "Årlig leasinggräns (km, valfritt)",
      editor_lease_start_date: "Leasingårets startdatum (ÅÅÅÅ-MM-DD, valfritt)",
      editor_lease_start_odometer: "Mätarställning vid leasingstart (km, valfritt — rekommenderas)",
      brake_fluid_level_warning: "Bromsvätska låg",
      coolant_level_warning: "Kylarvätska låg",
      oil_level_warning: "Oljenivåvarning",
      washer_fluid_level_warning: "Spolarvätska låg",
      tire_front_left: "Däcktryck fram vänster",
      tire_front_right: "Däcktryck fram höger",
      tire_rear_left: "Däcktryck bak vänster",
      tire_rear_right: "Däcktryck bak höger",
      door_front_left: "Framdörr vänster",
      door_front_right: "Framdörr höger",
      door_rear_left: "Bakdörr vänster",
      door_rear_right: "Bakdörr höger",
      hood: "Motorhuv",
      tailgate: "Baklucka",
      tank_lid: "Tank-/laddlucka",
      window_front_left: "Fönster fram vänster",
      window_front_right: "Fönster fram höger",
      window_rear_left: "Fönster bak vänster",
      window_rear_right: "Fönster bak höger",
      sunroof: "Taklucka",
      vehicles_required: "'vehicles' krävs och måste innehålla minst ett fordon",
      vehicles_duplicate: "Dubblerad device: {device}",
      vehicle_missing_device: "Varje fordon behöver ett device_id",
      editor_title: "Kortets titel (valfritt)",
      editor_vehicles: "Fordon",
      editor_add_vehicle: "+ Lägg till fordon",
      editor_remove: "Ta bort",
      editor_device: "Enhet",
      editor_name: "Namn (valfritt)",
      editor_icon: "Ikon (valfritt)",
      editor_picture: "Bild-URL (valfritt)",
      editor_show_stats: "Visa statistik",
      editor_stats_hours: "Statistikfönster (timmar)",
      editor_select_device: "Välj en enhet…",
      editor_layout: "Layout",
      layout_auto: "Auto (radbryt vid smalt utrymme)",
      layout_horizontal: "Horisontell (sida vid sida)",
      layout_vertical: "Vertikal (staplat)",
      waiting: "Väntar på data…",
    },
  };

  function lang(hass) {
    const raw = (hass?.locale?.language || hass?.language || DEFAULT_LANG).toLowerCase();
    const primary = raw.split("-")[0];
    return TRANSLATIONS[primary] ? primary : DEFAULT_LANG;
  }

  function t(hass, key, replacements) {
    const dict = TRANSLATIONS[lang(hass)] || TRANSLATIONS[DEFAULT_LANG];
    const raw = dict[key] ?? TRANSLATIONS[DEFAULT_LANG][key] ?? key;
    if (!replacements) return raw;
    return raw.replace(/\{([^}]+)\}/g, (m, k) =>
      Object.prototype.hasOwnProperty.call(replacements, k) ? replacements[k] : m
    );
  }

  function escHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Verified against home-assistant/core's volvo integration source (dev branch).
  const SENSOR_KEYS = [
    "battery_charge_level",
    "distance_to_empty_battery",
    "distance_to_empty_tank",
    "fuel_amount",
    "odometer",
    "average_energy_consumption",
    "average_energy_consumption_automatic",
    "average_energy_consumption_charge",
    "average_fuel_consumption",
    "average_fuel_consumption_automatic",
    "charging_status",
    "charging_power",
    "estimated_charging_time",
    "target_battery_charge_level",
    "charger_connection_status",
    "charging_type",
    "charging_current_limit",
    "distance_to_service",
    "time_to_service",
    "engine_time_to_service",
    "service_warning",
    "trip_meter_automatic",
    "trip_meter_manual",
    "average_speed",
    "average_speed_automatic",
    "battery_capacity",
  ];
  const DOOR_WINDOW_KEYS = [
    "door_front_left", "door_front_right", "door_rear_left", "door_rear_right",
    "hood", "tailgate", "tank_lid",
    "window_front_left", "window_front_right", "window_rear_left", "window_rear_right",
    "sunroof",
  ];
  // A curated subset of the integration's ~30 warning binary_sensors — fluids
  // and tire pressure, not the dozen individual light-bulb-failure sensors
  // (too granular for a compact card; easy to extend later if asked).
  const HEALTH_KEYS = [
    "brake_fluid_level_warning", "coolant_level_warning", "oil_level_warning", "washer_fluid_level_warning",
    "tire_front_left", "tire_front_right", "tire_rear_left", "tire_rear_right",
  ];
  const BUTTON_KEYS = ["climatization_start", "climatization_stop", "honk", "flash", "honk_flash", "engine_start", "engine_stop"];
  const ARM_TIMEOUT_MS = 5000;
  // Entities are only created at all if the vehicle's API data actually
  // contains that field (verified in sensor.py's entity-creation loop) — so
  // a given car may expose only one of these three energy-consumption
  // variants (or one of the two fuel variants). Try each in order rather
  // than hardcoding the first one.
  const ENERGY_STAT_KEYS = ["average_energy_consumption", "average_energy_consumption_automatic", "average_energy_consumption_charge"];
  const FUEL_STAT_KEYS = ["average_fuel_consumption", "average_fuel_consumption_automatic"];
  const ODOMETER_DAYS = 7;
  const DAY_MS = 24 * 3600 * 1000;
  const LEASE_PACE_TOLERANCE = 0.03; // ±3% of the annual limit counts as "on pace"

  const SENSOR_KEY_SET = new Set(SENSOR_KEYS);
  const DOOR_WINDOW_KEY_SET = new Set(DOOR_WINDOW_KEYS);
  const HEALTH_KEY_SET = new Set(HEALTH_KEYS);
  const BUTTON_KEY_SET = new Set(BUTTON_KEYS);

  function humanize(str) {
    if (!str) return "";
    const s = String(str).replace(/_/g, " ");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  const TINT_SUCCESS = "rgba(76,175,80,0.18)";
  const TINT_ERROR = "rgba(239,83,80,0.18)";
  const TINT_INFO = "rgba(3,169,244,0.18)";
  const TINT_WARNING = "rgba(255,152,0,0.22)";

  const RING_RADIUS = 54;
  const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
  const HISTORY_MIN_REFRESH_MS = 5 * 60 * 1000;
  const HISTORY_BUCKETS = 40;
  const DEFAULT_STATS_HOURS = 168;
  const MAX_STATS_HOURS = 24 * 30;
  const LAYOUT_VALUES = ["auto", "horizontal", "vertical"];

  function localISO(date) {
    const p = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}` +
      `T${p(date.getHours())}:${p(date.getMinutes())}:${p(date.getSeconds())}`;
  }

  class VolvoCarsCard extends HTMLElement {
    static getConfigElement() {
      return document.createElement(EDITOR_NAME);
    }

    static getStubConfig() {
      return { vehicles: [], show_stats: true, layout: "auto" };
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._hass = null;
      this._config = null;
      this._history = new Map(); // deviceId -> { values, fetchedAt, fetching }
      this._odoHistory = new Map(); // deviceId -> { distances, fetchedAt, fetching }
      this._pulses = new Map(); // deviceId -> boolean (honk pulse)
      this._armed = new Map(); // deviceId -> "lock" | "climate" | "honk" | "engine" | undefined
      this._armTimers = new Map(); // deviceId -> setTimeout id, auto-dismisses an armed action
      this._expanded = new Map(); // "deviceId:section" -> boolean (service/trip expandable sections)
      this._leaseStats = new Map(); // deviceId -> { points, fetchedAt, fetching } (recorder/statistics_during_period)
      this.shadowRoot.addEventListener("click", (e) => this._onClick(e));
    }

    setConfig(config) {
      if (!config || !Array.isArray(config.vehicles) || config.vehicles.length === 0) {
        throw new Error(`volvo-cars-card: ${t(this._hass, "vehicles_required")}`);
      }
      const seen = new Set();
      for (const v of config.vehicles) {
        if (!v || !v.device_id) {
          throw new Error(`volvo-cars-card: ${t(this._hass, "vehicle_missing_device")}`);
        }
        if (seen.has(v.device_id)) {
          throw new Error(`volvo-cars-card: ${t(this._hass, "vehicles_duplicate", { device: v.device_id })}`);
        }
        seen.add(v.device_id);
      }
      this._config = {
        // null = use the translated default ("Volvo Cars"); "" hides the
        // header row entirely; anything else is shown verbatim.
        title: typeof config.title === "string" ? config.title : null,
        show_stats: config.show_stats !== false,
        stats_history_hours: Math.min(
          MAX_STATS_HOURS,
          Math.max(1, parseInt(config.stats_history_hours, 10) || DEFAULT_STATS_HOURS)
        ),
        layout: LAYOUT_VALUES.includes(config.layout) ? config.layout : "auto",
        vehicles: config.vehicles.map((v) => ({
          device_id: v.device_id,
          name: v.name || "",
          icon: v.icon || "",
          picture: v.picture || "",
          // Lease mileage budget (issue #2) — all optional; the section is
          // only shown when both lease_annual_limit_km and lease_start_date
          // are set. lease_start_odometer_km is an optional-but-recommended
          // manual baseline; when omitted the card tries to auto-detect it
          // from HA's long-term statistics for the odometer sensor.
          lease_annual_limit_km: v.lease_annual_limit_km ? Math.max(1, parseFloat(v.lease_annual_limit_km)) : null,
          lease_start_date: v.lease_start_date || "",
          lease_start_odometer_km: v.lease_start_odometer_km !== undefined && v.lease_start_odometer_km !== null && v.lease_start_odometer_km !== ""
            ? parseFloat(v.lease_start_odometer_km)
            : null,
        })),
      };
      if (this._hass) this._render();
    }

    getCardSize() {
      return 1 + (this._config?.vehicles?.length || 1) * 4;
    }

    _gridColumns() {
      const count = Math.max(1, this._config?.vehicles?.length || 1);
      if (this._config?.layout === "horizontal") return `repeat(${count}, minmax(0, 1fr))`;
      if (this._config?.layout === "vertical") return "1fr";
      return "repeat(auto-fit, minmax(280px, 1fr))";
    }

    set hass(hass) {
      const prevHass = this._hass;
      this._hass = hass;
      if (!this._config) return;
      if (this._isDirty(prevHass, hass)) this._render();
    }

    _isDirty(prevHass, hass) {
      if (!prevHass) return true;
      if (prevHass.entities !== hass.entities) return true;
      if (prevHass.language !== hass.language || prevHass.locale !== hass.locale) return true;
      for (const id of this._allWatchedEntityIds(hass)) {
        if (prevHass.states?.[id] !== hass.states?.[id]) return true;
      }
      return false;
    }

    _allWatchedEntityIds(hass) {
      const ids = new Set();
      for (const v of this._config.vehicles) {
        const d = this._discoverVehicle(v.device_id, hass);
        Object.values(d.sensors).forEach((id) => ids.add(id));
        Object.values(d.doors).forEach((id) => ids.add(id));
        Object.values(d.health).forEach((id) => ids.add(id));
        if (d.lock) ids.add(d.lock);
        if (d.tracker) ids.add(d.tracker);
      }
      return ids;
    }

    _discoverVehicle(deviceId, hass) {
      hass = hass || this._hass;
      const entities = hass?.entities || {};
      const states = hass?.states || {};
      const found = { sensors: {}, doors: {}, health: {}, lock: null, tracker: null, buttons: {} };
      for (const entityId in entities) {
        const entry = entities[entityId];
        if (!entry || entry.device_id !== deviceId) continue;
        const domain = entityId.split(".")[0];
        const key = entry.translation_key;
        if (domain === "sensor") {
          if (key && SENSOR_KEY_SET.has(key)) {
            found.sensors[key] = entityId;
          } else if (!key) {
            const st = states[entityId];
            if (st?.attributes?.device_class === "battery") {
              found.sensors.battery_charge_level = entityId;
            }
          }
        } else if (domain === "binary_sensor" && key) {
          if (DOOR_WINDOW_KEY_SET.has(key)) found.doors[key] = entityId;
          else if (HEALTH_KEY_SET.has(key)) found.health[key] = entityId;
        } else if (domain === "lock" && !found.lock) {
          found.lock = entityId;
        } else if (domain === "device_tracker" && !found.tracker) {
          found.tracker = entityId;
        } else if (domain === "button" && key && BUTTON_KEY_SET.has(key)) {
          found.buttons[key] = entityId;
        }
      }
      return found;
    }

    _pickStatKey(d, isEv) {
      const keys = isEv ? ENERGY_STAT_KEYS : FUEL_STAT_KEYS;
      return keys.find((k) => d.sensors[k]) || null;
    }

    _onClick(e) {
      const el = e.target.closest("[data-action]");
      if (!el) return;
      const action = el.dataset.action;
      const deviceId = el.dataset.device;
      if (action === "arm") {
        this._toggleArmed(deviceId, el.dataset.arm);
      } else if (action === "confirm-lock") {
        this._confirmLock(deviceId);
      } else if (action === "confirm-climate") {
        this._confirmClimate(deviceId);
      } else if (action === "confirm-engine") {
        this._confirmEngine(deviceId);
      } else if (action === "honk-horn" || action === "honk-lights" || action === "honk-both") {
        this._confirmHonk(deviceId, action);
      } else if (action === "toggle-section") {
        const key = `${deviceId}:${el.dataset.section}`;
        this._expanded.set(key, !this._expanded.get(key));
        this._render();
      }
    }

    // Every action (lock, climate, horn/lights) requires an extra tap: the
    // icon only "arms" a row of confirm chips — nothing actually happens
    // until one of those chips is tapped. Arming auto-dismisses after
    // ARM_TIMEOUT_MS so a stray tap doesn't leave a live action sitting
    // exposed indefinitely.
    _toggleArmed(deviceId, action) {
      const current = this._armed.get(deviceId);
      this._clearArmTimer(deviceId);
      if (current === action) {
        this._armed.delete(deviceId);
      } else {
        this._armed.set(deviceId, action);
        const timerId = setTimeout(() => {
          this._armed.delete(deviceId);
          this._armTimers.delete(deviceId);
          this._render();
        }, ARM_TIMEOUT_MS);
        this._armTimers.set(deviceId, timerId);
      }
      this._render();
    }

    _clearArmTimer(deviceId) {
      const timerId = this._armTimers.get(deviceId);
      if (timerId) {
        clearTimeout(timerId);
        this._armTimers.delete(deviceId);
      }
    }

    _disarm(deviceId) {
      this._clearArmTimer(deviceId);
      this._armed.delete(deviceId);
    }

    _confirmLock(deviceId) {
      const d = this._discoverVehicle(deviceId);
      this._disarm(deviceId);
      if (!d.lock || !this._hass) { this._render(); return; }
      const st = this._hass.states[d.lock];
      const isLocked = st?.state === "locked";
      this._hass
        .callService("lock", isLocked ? "unlock" : "lock", { entity_id: d.lock })
        .catch(() => {});
      this._render();
    }

    _confirmClimate(deviceId) {
      const d = this._discoverVehicle(deviceId);
      this._disarm(deviceId);
      const startId = d.buttons.climatization_start;
      const stopId = d.buttons.climatization_stop;
      if (!startId || !stopId || !this._hass) { this._render(); return; }
      const wasOn = this._climateState(deviceId);
      const target = wasOn ? stopId : startId;
      this._hass.callService("button", "press", { entity_id: target }).catch(() => {});
      this._climateLocal = this._climateLocal || new Map();
      this._climateLocal.set(deviceId, !wasOn);
      this._render();
    }

    _climateState(deviceId) {
      this._climateLocal = this._climateLocal || new Map();
      return this._climateLocal.get(deviceId) || false;
    }

    // Engine start/stop (pre-heat/pre-cool via the combustion engine, fuel
    // and PHEV vehicles only) has no confirmed status sensor either — same
    // optimistic-local-state approach as climate.
    _confirmEngine(deviceId) {
      const d = this._discoverVehicle(deviceId);
      this._disarm(deviceId);
      const startId = d.buttons.engine_start;
      const stopId = d.buttons.engine_stop;
      if (!startId || !stopId || !this._hass) { this._render(); return; }
      const wasOn = this._engineState(deviceId);
      const target = wasOn ? stopId : startId;
      this._hass.callService("button", "press", { entity_id: target }).catch(() => {});
      this._engineLocal = this._engineLocal || new Map();
      this._engineLocal.set(deviceId, !wasOn);
      this._render();
    }

    _engineState(deviceId) {
      this._engineLocal = this._engineLocal || new Map();
      return this._engineLocal.get(deviceId) || false;
    }

    _confirmHonk(deviceId, action) {
      const d = this._discoverVehicle(deviceId);
      this._disarm(deviceId);
      const id = action === "honk-horn" ? d.buttons.honk
        : action === "honk-lights" ? d.buttons.flash
        : d.buttons.honk_flash;
      if (!id || !this._hass) { this._render(); return; }
      this._hass.callService("button", "press", { entity_id: id }).catch(() => {});
      this._pulses.set(deviceId, true);
      this._render();
      setTimeout(() => {
        this._pulses.set(deviceId, false);
        this._render();
      }, 450);
    }

    _render() {
      if (!this._hass || !this._config) return;
      const hass = this._hass;
      const vehiclesHtml = this._config.vehicles
        .map((v) => this._renderVehicle(v, hass))
        .join("");
      const gridColumns = this._gridColumns();
      const titleText = this._config.title !== null ? this._config.title : t(hass, "title");
      const headerHtml = titleText
        ? `<div class="vc-header"><span class="vc-title">${escHtml(titleText)}</span></div>`
        : "";
      this.shadowRoot.innerHTML = `
        <style>${this._css()}</style>
        <div class="vc-card">
          ${headerHtml}
          <div class="vc-grid" style="grid-template-columns:${gridColumns};">${vehiclesHtml}</div>
        </div>
      `;
      if (this._config.show_stats) {
        for (const v of this._config.vehicles) {
          this._maybeRefreshHistory(v.device_id);
          this._maybeRefreshOdometerHistory(v.device_id);
        }
      }
      for (const v of this._config.vehicles) {
        if (v.lease_annual_limit_km && v.lease_start_date) {
          this._maybeRefreshLeaseStats(v);
        }
      }
    }

    _renderVehicle(vehicle, hass) {
      const d = this._discoverVehicle(vehicle.device_id, hass);
      const name = escHtml(vehicle.name || hass.devices?.[vehicle.device_id]?.name || vehicle.device_id);
      const state = (id) => (id ? hass.states[id] : undefined);

      const battery = state(d.sensors.battery_charge_level);
      const rangeBattery = state(d.sensors.distance_to_empty_battery);
      const fuel = state(d.sensors.fuel_amount);
      const rangeTank = state(d.sensors.distance_to_empty_tank);
      const isEv = !!d.sensors.battery_charge_level;
      const batteryKnown = !!battery && battery.state !== "unknown" && battery.state !== "unavailable";

      let heroValueHtml;
      let glowVar = "var(--warning-color)";
      if (isEv) {
        glowVar = "var(--success-color)";
        const pct = batteryKnown ? Math.max(0, Math.min(100, parseFloat(battery.state) || 0)) : 0;
        const offset = RING_CIRCUMFERENCE * (1 - pct / 100);
        const rangeText = rangeBattery && rangeBattery.state !== "unknown" && rangeBattery.state !== "unavailable"
          ? `${Math.round(parseFloat(rangeBattery.state))} km`
          : "—";
        const targetState = state(d.sensors.target_battery_charge_level);
        const targetKnown = !!targetState && targetState.state !== "unknown" && targetState.state !== "unavailable";
        const targetPct = targetKnown ? Math.max(0, Math.min(100, parseFloat(targetState.state))) : null;
        const targetMarker = targetPct !== null
          ? `<line x1="66" y1="${(66 - RING_RADIUS - 6).toFixed(1)}" x2="66" y2="${(66 - RING_RADIUS + 6).toFixed(1)}"
               stroke="var(--primary-text-color)" stroke-width="2.5" stroke-linecap="round"
               transform="rotate(${(targetPct / 100 * 360).toFixed(1)} 66 66)"/>`
          : "";
        heroValueHtml = `
          <div class="vc-ring-wrap">
            <svg width="136" height="136" viewBox="0 0 132 132">
              <defs>
                <linearGradient id="vc-grad-${escHtml(vehicle.device_id)}" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="var(--success-color)"/>
                  <stop offset="1" stop-color="var(--info-color, var(--primary-color))"/>
                </linearGradient>
              </defs>
              <circle cx="66" cy="66" r="${RING_RADIUS}" fill="none" stroke="var(--divider-color)" stroke-width="9"/>
              <circle cx="66" cy="66" r="${RING_RADIUS}" fill="none" stroke="url(#vc-grad-${escHtml(vehicle.device_id)})"
                stroke-width="9" stroke-linecap="round"
                stroke-dasharray="${RING_CIRCUMFERENCE.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"
                transform="rotate(-90 66 66)"/>
              ${targetMarker}
            </svg>
            <div class="vc-ring-text">
              <span class="vc-ring-big">${batteryKnown ? Math.round(pct) + "%" : "—"}</span>
              <span class="vc-ring-small">${rangeText}</span>
            </div>
          </div>`;
      } else if (fuel && fuel.state !== "unknown" && fuel.state !== "unavailable") {
        const rangeText = rangeTank && rangeTank.state !== "unknown" && rangeTank.state !== "unavailable"
          ? `${Math.round(parseFloat(rangeTank.state))} km`
          : "—";
        heroValueHtml = `
          <div class="vc-plain-wrap">
            <span class="vc-ring-big">${rangeText}</span>
            <span class="vc-ring-small">${Math.round(parseFloat(fuel.state))} L</span>
          </div>`;
      } else {
        heroValueHtml = `<div class="vc-plain-wrap"><span class="vc-ring-small">${escHtml(t(hass, "waiting"))}</span></div>`;
      }

      const lockState = state(d.lock);
      const isLocked = lockState?.state === "locked";
      const lockKnown = !!lockState && lockState.state !== "unknown" && lockState.state !== "unavailable";
      const lockColorVar = lockKnown ? (isLocked ? "var(--success-color)" : "var(--error-color)") : "var(--secondary-text-color)";
      const lockLabel = lockKnown ? (isLocked ? t(hass, "locked") : t(hass, "unlocked")) : "—";

      const climateAvailable = !!(d.buttons.climatization_start && d.buttons.climatization_stop);
      const climateOn = this._climateState(vehicle.device_id);
      const engineAvailable = !!(d.buttons.engine_start && d.buttons.engine_stop);
      const engineOn = this._engineState(vehicle.device_id);
      const honkAvailable = !!(d.buttons.honk || d.buttons.flash || d.buttons.honk_flash);
      const pulsing = this._pulses.get(vehicle.device_id);
      const armed = this._armed.get(vehicle.device_id);
      const armedRing = (key) => armed === key ? `box-shadow:0 0 0 2px var(--primary-color);` : "";
      const dev = escHtml(vehicle.device_id);

      const buttonsHtml = `
        <div class="vc-actions">
          ${d.lock ? `
            <button class="vc-action-btn" data-action="arm" data-arm="lock" data-device="${dev}"
              title="${escHtml(t(hass, "lock_action"))}"
              style="background:${lockKnown ? (isLocked ? TINT_SUCCESS : TINT_ERROR) : "var(--secondary-background-color)"};${armedRing("lock")}">
              ${isLocked ? this._iconLockClosed(lockColorVar) : this._iconLockOpen(lockColorVar)}
            </button>` : ""}
          ${climateAvailable ? `
            <button class="vc-action-btn" data-action="arm" data-arm="climate" data-device="${dev}"
              title="${escHtml(t(hass, "climate_action"))}"
              style="background:${climateOn ? TINT_INFO : "var(--secondary-background-color)"};${armedRing("climate")}">
              ${this._iconClimate(climateOn ? "var(--info-color, var(--primary-color))" : "var(--secondary-text-color)")}
            </button>` : ""}
          ${engineAvailable ? `
            <button class="vc-action-btn" data-action="arm" data-arm="engine" data-device="${dev}"
              title="${escHtml(t(hass, "engine_action"))}"
              style="background:${engineOn ? TINT_INFO : "var(--secondary-background-color)"};${armedRing("engine")}">
              ${this._iconEngine(engineOn ? "var(--info-color, var(--primary-color))" : "var(--secondary-text-color)")}
            </button>` : ""}
          ${honkAvailable ? `
            <button class="vc-action-btn" data-action="arm" data-arm="honk" data-device="${dev}"
              title="${escHtml(t(hass, "honk_action"))}"
              style="background:${pulsing ? TINT_WARNING : "var(--secondary-background-color)"};${armedRing("honk")}">
              ${this._iconHonk(pulsing ? "var(--warning-color)" : "var(--secondary-text-color)")}
            </button>` : ""}
        </div>
        ${armed === "lock" ? `
          <div class="vc-confirm-row">
            <button class="vc-confirm-chip" data-action="confirm-lock" data-device="${dev}">
              ${escHtml(isLocked ? t(hass, "confirm_unlock") : t(hass, "confirm_lock"))}
            </button>
          </div>` : ""}
        ${armed === "climate" ? `
          <div class="vc-confirm-row">
            <button class="vc-confirm-chip" data-action="confirm-climate" data-device="${dev}">
              ${escHtml(climateOn ? t(hass, "confirm_climate_off") : t(hass, "confirm_climate_on"))}
            </button>
          </div>` : ""}
        ${armed === "engine" ? `
          <div class="vc-confirm-row">
            <button class="vc-confirm-chip" data-action="confirm-engine" data-device="${dev}">
              ${escHtml(engineOn ? t(hass, "confirm_engine_off") : t(hass, "confirm_engine_on"))}
            </button>
          </div>` : ""}
        ${armed === "honk" ? `
          <div class="vc-confirm-row">
            ${d.buttons.honk ? `<button class="vc-confirm-chip" data-action="honk-horn" data-device="${dev}">${escHtml(t(hass, "honk_horn"))}</button>` : ""}
            ${d.buttons.flash ? `<button class="vc-confirm-chip" data-action="honk-lights" data-device="${dev}">${escHtml(t(hass, "honk_lights"))}</button>` : ""}
            ${d.buttons.honk_flash ? `<button class="vc-confirm-chip" data-action="honk-both" data-device="${dev}">${escHtml(t(hass, "honk_both"))}</button>` : ""}
          </div>` : ""}
        <div class="vc-status-line">
          <span style="color:${lockColorVar};">${escHtml(lockLabel)}</span>
          ${climateAvailable && climateOn ? `<span class="vc-status-sep">·</span><span style="color:var(--info-color, var(--primary-color));">${escHtml(t(hass, "climate_on"))}</span>` : ""}
          ${engineAvailable && engineOn ? `<span class="vc-status-sep">·</span><span style="color:var(--info-color, var(--primary-color));">${escHtml(t(hass, "engine_on"))}</span>` : ""}
        </div>`;

      const doorsHtml = this._renderDoors(d, hass, vehicle.device_id);
      const chargingHtml = this._renderCharging(d, hass);
      const serviceHtml = this._renderServiceHealth(d, hass, vehicle.device_id);
      const tripHtml = this._renderTripData(d, hass, vehicle.device_id);
      const positionHtml = this._renderPosition(d, hass);
      const statsHtml = this._config.show_stats ? this._renderStats(vehicle, d, hass, isEv) : "";
      const distanceTrendHtml = this._config.show_stats ? this._renderDistanceTrend(vehicle, d, hass) : "";
      const leaseHtml = this._renderLeaseBudget(vehicle, d, hass);
      const iconHtml = vehicle.icon
        ? `<ha-icon icon="${escHtml(vehicle.icon)}" style="color:var(--primary-text-color); --mdc-icon-size:18px;"></ha-icon>`
        : "";
      const pictureHtml = vehicle.picture
        ? `<img class="vc-picture" src="${escHtml(vehicle.picture)}" alt="${name}" />`
        : "";

      return `
        <div class="vc-vehicle">
          <div class="vc-hero" style="--vc-glow:${glowVar};">
            <div class="vc-glow"></div>
            ${pictureHtml}
            <div class="vc-hero-name">
              ${iconHtml}
              <span class="vc-vehicle-name">${name}</span>
              <span class="vc-type-pill">${isEv ? "EV" : (fuel ? "ICE" : "")}</span>
            </div>
            ${heroValueHtml}
            ${buttonsHtml}
          </div>
          ${doorsHtml}
          ${chargingHtml}
          ${serviceHtml}
          ${tripHtml}
          ${positionHtml}
          ${statsHtml}
          ${distanceTrendHtml}
          ${leaseHtml}
        </div>`;
    }

    _renderDoors(d, hass, deviceId) {
      const zoneKeys = ["door_front_left", "door_front_right", "door_rear_left", "door_rear_right", "hood", "tailgate"];
      const state = (id) => (id ? hass.states[id] : undefined);
      const isOpen = (key) => state(d.doors[key])?.state === "on";
      const anyZoneFound = zoneKeys.some((k) => d.doors[k]);

      const openItems = DOOR_WINDOW_KEYS.filter((k) => d.doors[k] && isOpen(k));

      if (!anyZoneFound && Object.keys(d.doors).length === 0) return "";

      const zoneColor = (key) => (d.doors[key] ? (isOpen(key) ? "var(--warning-color)" : "var(--secondary-background-color)") : "var(--secondary-background-color)");

      const diagram = anyZoneFound ? `
        <svg width="88" height="144" viewBox="0 0 120 196" class="vc-doors-svg">
          <rect x="22" y="14" width="76" height="168" rx="30" fill="none" stroke="var(--divider-color)" stroke-width="2.5"/>
          <line x1="30" y1="52" x2="90" y2="52" stroke="var(--divider-color)" stroke-width="1.5"/>
          <line x1="30" y1="144" x2="90" y2="144" stroke="var(--divider-color)" stroke-width="1.5"/>
          <rect x="34" y="16" width="52" height="22" rx="10" fill="${zoneColor("hood")}"/>
          <rect x="34" y="158" width="52" height="22" rx="10" fill="${zoneColor("tailgate")}"/>
          <rect x="10" y="58" width="20" height="42" rx="6" fill="${zoneColor("door_front_left")}"/>
          <rect x="10" y="58" width="20" height="11" rx="4" fill="${d.doors.window_front_left ? (isOpen("window_front_left") ? "var(--warning-color)" : "var(--secondary-background-color)") : zoneColor("door_front_left")}"/>
          <rect x="90" y="58" width="20" height="42" rx="6" fill="${zoneColor("door_front_right")}"/>
          <rect x="90" y="58" width="20" height="11" rx="4" fill="${d.doors.window_front_right ? (isOpen("window_front_right") ? "var(--warning-color)" : "var(--secondary-background-color)") : zoneColor("door_front_right")}"/>
          <rect x="10" y="102" width="20" height="42" rx="6" fill="${zoneColor("door_rear_left")}"/>
          <rect x="10" y="102" width="20" height="11" rx="4" fill="${d.doors.window_rear_left ? (isOpen("window_rear_left") ? "var(--warning-color)" : "var(--secondary-background-color)") : zoneColor("door_rear_left")}"/>
          <rect x="90" y="102" width="20" height="42" rx="6" fill="${zoneColor("door_rear_right")}"/>
          <rect x="90" y="102" width="20" height="11" rx="4" fill="${d.doors.window_rear_right ? (isOpen("window_rear_right") ? "var(--warning-color)" : "var(--secondary-background-color)") : zoneColor("door_rear_right")}"/>
          <rect x="44" y="41" width="32" height="13" rx="6" fill="${zoneColor("sunroof")}"/>
          <rect x="96" y="151" width="14" height="14" rx="4" fill="${zoneColor("tank_lid")}"/>
        </svg>` : "";

      const listHtml = openItems.length
        ? openItems.map((k) => `
            <div class="vc-door-row">
              <span class="vc-dot" style="background:var(--warning-color);"></span>
              <span>${escHtml(t(hass, k))} ${escHtml(t(hass, "open_suffix"))}</span>
            </div>`).join("")
        : `<div class="vc-door-row">
             <span class="vc-dot" style="background:var(--success-color);"></span>
             <span>${escHtml(t(hass, "all_closed"))}</span>
           </div>`;

      return `
        <div class="vc-section">
          <div class="vc-section-title">${escHtml(t(hass, "doors_windows"))}</div>
          <div class="vc-doors-row">
            ${diagram}
            <div class="vc-doors-list">${listHtml}</div>
          </div>
        </div>`;
    }

    _renderCharging(d, hass) {
      const state = (id) => (id ? hass.states[id] : undefined);
      const status = state(d.sensors.charging_status);
      const power = state(d.sensors.charging_power);
      const timeLeft = state(d.sensors.estimated_charging_time);
      const target = state(d.sensors.target_battery_charge_level);
      const connection = state(d.sensors.charger_connection_status);
      const type = state(d.sensors.charging_type);
      const currentLimit = state(d.sensors.charging_current_limit);
      if (!status && !power && !timeLeft && !target && !connection && !type && !currentLimit) return "";

      const row = (label, st, unit) => {
        if (!st) return "";
        const val = st.state === "unknown" || st.state === "unavailable" ? "—" : `${st.state}${unit ? " " + unit : ""}`;
        return `<div class="vc-kv"><span class="vc-kv-label">${escHtml(label)}</span><span class="vc-kv-val">${escHtml(val)}</span></div>`;
      };

      return `
        <div class="vc-section vc-charging">
          <div class="vc-section-title">${escHtml(t(hass, "charging"))}</div>
          <div class="vc-kv-grid">
            ${row(t(hass, "charging_status"), status, "")}
            ${row(t(hass, "charging_power"), power, power?.attributes?.unit_of_measurement || "")}
            ${row(t(hass, "charging_time_left"), timeLeft, timeLeft?.attributes?.unit_of_measurement || "")}
            ${row(t(hass, "charging_target"), target, "%")}
            ${row(t(hass, "charging_connection"), connection, "")}
            ${row(t(hass, "charging_type"), type, "")}
            ${row(t(hass, "charging_current_limit"), currentLimit, currentLimit?.attributes?.unit_of_measurement || "A")}
          </div>
        </div>`;
    }

    _renderServiceHealth(d, hass, deviceId) {
      const state = (id) => (id ? hass.states[id] : undefined);
      const odometer = state(d.sensors.odometer);
      const distService = state(d.sensors.distance_to_service);
      const timeService = state(d.sensors.time_to_service);
      const engineTimeService = state(d.sensors.engine_time_to_service);
      const serviceWarning = state(d.sensors.service_warning);
      const hasServiceData = !!(odometer || distService || timeService || engineTimeService || serviceWarning);
      const healthKeysFound = HEALTH_KEYS.filter((k) => d.health[k]);
      if (!hasServiceData && healthKeysFound.length === 0) return "";

      const isUnknown = (st) => !st || st.state === "unknown" || st.state === "unavailable";
      const activeWarnings = healthKeysFound.filter((k) => state(d.health[k])?.state === "on");
      const serviceWarningActive = serviceWarning && !isUnknown(serviceWarning) && serviceWarning.state !== "no_warning";
      const problemCount = activeWarnings.length + (serviceWarningActive ? 1 : 0);

      const expanded = !!this._expanded.get(`${deviceId}:service`);
      const summaryText = problemCount > 0 ? t(hass, "service_issues", { count: problemCount }) : t(hass, "service_ok");
      const summaryColor = problemCount > 0 ? "var(--warning-color)" : "var(--success-color)";

      const row = (label, st, unit) => {
        if (!st) return "";
        const val = isUnknown(st) ? "—" : `${Math.round(parseFloat(st.state))} ${unit}`;
        return `<div class="vc-kv"><span class="vc-kv-label">${escHtml(label)}</span><span class="vc-kv-val">${escHtml(val)}</span></div>`;
      };

      const warningRows = activeWarnings.map((k) => `
        <div class="vc-warning-row">
          <span class="vc-dot" style="background:var(--warning-color);"></span>
          <span>${escHtml(t(hass, k))}</span>
        </div>`).join("") + (serviceWarningActive ? `
        <div class="vc-warning-row">
          <span class="vc-dot" style="background:var(--warning-color);"></span>
          <span>${escHtml(humanize(serviceWarning.state))}</span>
        </div>` : "");

      const detailHtml = expanded ? `
        ${hasServiceData ? `
          <div class="vc-kv-grid" style="margin-top:8px;">
            ${row(t(hass, "odometer"), odometer, "km")}
            ${row(t(hass, "distance_to_service"), distService, "km")}
            ${row(t(hass, "time_to_service"), timeService, t(hass, "days_unit"))}
            ${row(t(hass, "engine_time_to_service"), engineTimeService, t(hass, "hours_unit"))}
          </div>` : ""}
        ${problemCount > 0 ? warningRows : `
          <div class="vc-warning-row">
            <span class="vc-dot" style="background:var(--success-color);"></span>
            <span>${escHtml(t(hass, "no_warnings"))}</span>
          </div>`}
      ` : "";

      return `
        <div class="vc-section">
          <button class="vc-expand-toggle" data-action="toggle-section" data-section="service" data-device="${escHtml(deviceId)}">
            <span class="vc-section-title">${escHtml(t(hass, "service_health"))}</span>
            <span class="vc-expand-summary" style="color:${summaryColor};">${escHtml(summaryText)}</span>
            <span class="vc-chevron" style="transform:rotate(${expanded ? 180 : 0}deg);">${this._iconChevron("var(--secondary-text-color)")}</span>
          </button>
          ${detailHtml}
        </div>`;
    }

    _renderTripData(d, hass, deviceId) {
      const state = (id) => (id ? hass.states[id] : undefined);
      const tripManual = state(d.sensors.trip_meter_manual);
      const tripAuto = state(d.sensors.trip_meter_automatic);
      const speedManual = state(d.sensors.average_speed);
      const speedAuto = state(d.sensors.average_speed_automatic);
      if (!tripManual && !tripAuto && !speedManual && !speedAuto) return "";

      const isUnknown = (st) => !st || st.state === "unknown" || st.state === "unavailable";
      const expanded = !!this._expanded.get(`${deviceId}:trip`);

      const row = (label, st, unit) => {
        if (!st) return "";
        const val = isUnknown(st) ? "—" : `${Math.round(parseFloat(st.state) * 10) / 10} ${unit}`;
        return `<div class="vc-kv"><span class="vc-kv-label">${escHtml(label)}</span><span class="vc-kv-val">${escHtml(val)}</span></div>`;
      };

      const detailHtml = expanded ? `
        <div class="vc-kv-grid" style="margin-top:8px;">
          ${row(t(hass, "trip_manual"), tripManual, "km")}
          ${row(t(hass, "trip_speed_manual"), speedManual, "km/h")}
          ${row(t(hass, "trip_automatic"), tripAuto, "km")}
          ${row(t(hass, "trip_speed_automatic"), speedAuto, "km/h")}
        </div>` : "";

      return `
        <div class="vc-section">
          <button class="vc-expand-toggle" data-action="toggle-section" data-section="trip" data-device="${escHtml(deviceId)}">
            <span class="vc-section-title">${escHtml(t(hass, "trip_data"))}</span>
            <span class="vc-chevron" style="margin-left:auto; transform:rotate(${expanded ? 180 : 0}deg);">${this._iconChevron("var(--secondary-text-color)")}</span>
          </button>
          ${detailHtml}
        </div>`;
    }

    _renderDistanceTrend(vehicle, d, hass) {
      if (!d.sensors.odometer) return "";
      const entry = this._odoHistory.get(vehicle.device_id);
      const distances = entry?.distances || [];
      return `
        <div class="vc-section">
          <div class="vc-section-title">${escHtml(t(hass, "distance_trend", { days: ODOMETER_DAYS }))}</div>
          ${this._renderDistanceBars(distances)}
        </div>`;
    }

    _renderDistanceBars(distances) {
      if (!distances.length || distances.every((v) => v === null)) {
        return `<svg viewBox="0 0 160 44" width="100%" height="40" class="vc-spark"></svg>`;
      }
      const max = Math.max(...distances.filter((v) => v !== null), 1);
      const n = distances.length;
      const gap = 160 / n;
      const barW = gap * 0.55;
      const bars = distances.map((v, i) => {
        if (v === null) return "";
        const x = i * gap + (gap - barW) / 2;
        const h = Math.max(2, (v / max) * 34);
        const y = 38 - h;
        return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="var(--info-color, var(--primary-color))"/>`;
      }).join("");
      return `<svg viewBox="0 0 160 44" width="100%" height="40" preserveAspectRatio="none" class="vc-spark">${bars}</svg>`;
    }

    _renderLeaseBudget(vehicle, d, hass) {
      if (!vehicle.lease_annual_limit_km || !vehicle.lease_start_date) return "";
      const lease = this._computeLease(vehicle, d, hass);
      if (!lease) return "";
      const deviceId = vehicle.device_id;
      const dev = escHtml(deviceId);
      const expanded = !!this._expanded.get(`${deviceId}:lease`);

      let summaryHtml;
      if (lease.status !== "ok") {
        summaryHtml = `<span class="vc-expand-summary" style="color:var(--secondary-text-color);">${escHtml(t(hass, "lease_waiting"))}</span>`;
      } else if (lease.overLimit) {
        summaryHtml = `<span class="vc-expand-summary" style="color:var(--error-color);">${escHtml(t(hass, "lease_over_limit", { km: Math.round(lease.used - lease.limit) }))}</span>`;
      } else if (lease.paceStatus === "over") {
        summaryHtml = `<span class="vc-expand-summary" style="color:var(--warning-color);">${escHtml(t(hass, "lease_over_pace", { km: Math.round(lease.overPaceKm) }))}</span>`;
      } else if (lease.paceStatus === "under") {
        summaryHtml = `<span class="vc-expand-summary" style="color:var(--success-color);">${escHtml(t(hass, "lease_under_pace", { km: Math.round(-lease.overPaceKm) }))}</span>`;
      } else {
        summaryHtml = `<span class="vc-expand-summary" style="color:var(--success-color);">${escHtml(t(hass, "lease_on_pace"))}</span>`;
      }

      let detailHtml = "";
      if (expanded && lease.status === "ok") {
        const baselineNote = lease.baselineSource === "manual"
          ? t(hass, "lease_baseline_manual", { km: Math.round(lease.baselineValue) })
          : t(hass, "lease_baseline_auto");
        detailHtml = `
          <div style="display:flex; gap:20px; margin-top:10px;">
            <div>
              <div style="font-size:20px; font-weight:800; color:var(--primary-text-color); line-height:1;">${escHtml(Math.round(lease.remaining))} km</div>
              <div style="font-size:11px; color:var(--secondary-text-color); margin-top:3px;">${escHtml(t(hass, "lease_km_left"))}</div>
            </div>
            <div>
              <div style="font-size:20px; font-weight:800; color:var(--primary-text-color); line-height:1;">${escHtml(lease.daysLeft)}</div>
              <div style="font-size:11px; color:var(--secondary-text-color); margin-top:3px;">${escHtml(t(hass, "lease_days_left"))}</div>
            </div>
          </div>
          <div style="margin-top:12px;">
            <div class="vc-section-title" style="margin-bottom:6px;">${escHtml(t(hass, "lease_chart_title"))}</div>
            ${this._renderLeaseChart(lease, hass)}
            <div style="font-size:10px; color:var(--secondary-text-color); margin-top:2px;">${escHtml(t(hass, "lease_legend"))}</div>
          </div>
          <div style="font-size:10.5px; color:var(--secondary-text-color); margin-top:10px;">${escHtml(baselineNote)}</div>
        `;
      } else if (expanded) {
        detailHtml = `<div style="margin-top:10px; font-size:12px; color:var(--secondary-text-color);">${escHtml(t(hass, "lease_waiting"))}</div>`;
      }

      return `
        <div class="vc-section">
          <button class="vc-expand-toggle" data-action="toggle-section" data-section="lease" data-device="${dev}">
            <span class="vc-section-title">${escHtml(t(hass, "lease_budget"))}</span>
            ${summaryHtml}
            <span class="vc-chevron" style="transform:rotate(${expanded ? 180 : 0}deg);">${this._iconChevron("var(--secondary-text-color)")}</span>
          </button>
          ${detailHtml}
        </div>`;
    }

    _renderLeaseChart(lease, hass) {
      const axisMax = Math.max(lease.limit, lease.projectedTotal, 1) * 1.1;
      const startMs = lease.anniversaryStart.getTime();
      const spanMs = lease.daysInYear * DAY_MS;
      const xAt = (t) => 10 + Math.max(0, Math.min(1, (t - startMs) / spanMs)) * 180;
      const yAt = (km) => 60 - (Math.max(0, km) / axisMax) * 50;

      const linePoints = [{ t: startMs, used: 0 }, ...lease.chartPoints];
      const pathStr = linePoints.map((p) => `${xAt(p.t).toFixed(1)},${yAt(p.used).toFixed(1)}`).join(" ");

      const todayX = xAt(Date.now());
      const todayY = yAt(lease.used);
      const budgetEndY = yAt(lease.limit);
      const projEndY = yAt(lease.projectedTotal);

      return `
        <svg viewBox="0 0 200 76" width="100%" height="68" style="display:block;">
          <line x1="10" y1="60" x2="190" y2="60" stroke="var(--divider-color)" stroke-width="1"/>
          <line x1="${todayX.toFixed(1)}" y1="10" x2="${todayX.toFixed(1)}" y2="60" stroke="var(--secondary-text-color)" stroke-width="1" stroke-dasharray="2,3" opacity="0.5"/>

          <line x1="10" y1="60" x2="190" y2="${budgetEndY.toFixed(1)}" stroke="var(--secondary-text-color)" stroke-width="1.3" stroke-dasharray="4,3" opacity="0.8"/>
          <text x="188" y="${Math.max(8, budgetEndY - 3).toFixed(1)}" font-size="6.5" fill="var(--secondary-text-color)" text-anchor="end">${escHtml(t(hass, "lease_target", { km: Math.round(lease.limit) }))}</text>

          <line x1="${todayX.toFixed(1)}" y1="${todayY.toFixed(1)}" x2="190" y2="${projEndY.toFixed(1)}" stroke="var(--warning-color)" stroke-width="1.6" stroke-dasharray="3,3"/>
          <text x="188" y="${Math.max(8, projEndY - 3).toFixed(1)}" font-size="6.5" fill="var(--warning-color)" text-anchor="end">${escHtml(t(hass, "lease_projection", { km: Math.round(lease.projectedTotal) }))}</text>

          <polyline points="${pathStr}" fill="none" stroke="var(--info-color, var(--primary-color))" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="${todayX.toFixed(1)}" cy="${todayY.toFixed(1)}" r="2.8" fill="var(--info-color, var(--primary-color))"/>

          <text x="10" y="70" font-size="7" fill="var(--secondary-text-color)" text-anchor="start">${escHtml(t(hass, "lease_start_label"))}</text>
          <text x="${todayX.toFixed(1)}" y="70" font-size="7" fill="var(--primary-text-color)" font-weight="700" text-anchor="middle">${escHtml(t(hass, "lease_today_label"))}</text>
          <text x="190" y="70" font-size="7" fill="var(--secondary-text-color)" text-anchor="end">${escHtml(t(hass, "lease_end_label"))}</text>
        </svg>`;
    }

    _renderPosition(d, hass) {
      if (!d.tracker) return "";
      const st = hass.states[d.tracker];
      if (!st) return "";
      const lat = st.attributes?.latitude;
      const lon = st.attributes?.longitude;
      if (lat === undefined || lon === undefined) return "";
      const label = st.state === "home" ? t(hass, "home") : `${Number(lat).toFixed(2)}°, ${Number(lon).toFixed(2)}°`;
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
      return `
        <a class="vc-position" href="${escHtml(url)}" target="_blank" rel="noopener noreferrer">
          <span class="vc-position-icon">${this._iconPin("var(--info-color, var(--primary-color))")}</span>
          <span>${escHtml(label)}</span>
        </a>`;
    }

    _renderStats(vehicle, d, hass, isEv) {
      const key = this._pickStatKey(d, isEv);
      const entityId = key ? d.sensors[key] : null;
      if (!entityId) return "";
      const st = hass.states[entityId];
      const unit = st?.attributes?.unit_of_measurement || "";
      const valueText = st && st.state !== "unknown" && st.state !== "unavailable" ? `${st.state} ${unit}` : "—";
      const days = Math.round(this._config.stats_history_hours / 24);
      const history = this._history.get(vehicle.device_id);
      const svg = this._renderSparkline(history, isEv);

      return `
        <div class="vc-section">
          <div class="vc-stats-head">
            <span class="vc-section-title">${escHtml(t(hass, "stats_avg", { days }))}</span>
            <span class="vc-stats-val">${escHtml(valueText)}</span>
          </div>
          ${svg}
        </div>`;
    }

    _renderSparkline(history, isEv) {
      const colorVar = isEv ? "var(--success-color)" : "var(--warning-color)";
      if (!history || !history.values || history.values.length === 0) {
        return `<svg viewBox="0 0 160 44" width="100%" height="40" class="vc-spark"></svg>`;
      }
      const values = history.values;
      const max = Math.max(...values, 0.0001);
      const min = Math.min(...values, 0);
      const range = Math.max(max - min, 0.0001);
      const n = values.length;
      const pts = values.map((v, i) => {
        const x = (i / (n - 1)) * 160;
        const y = 34 - ((v - min) / range) * 30;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });
      return `
        <svg viewBox="0 0 160 44" width="100%" height="40" preserveAspectRatio="none" class="vc-spark">
          <polyline points="${pts.join(" ")}" fill="none" stroke="${colorVar}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    _maybeRefreshHistory(deviceId) {
      const cached = this._history.get(deviceId);
      const now = Date.now();
      if (cached?.fetching) return;
      if (cached?.fetchedAt && now - cached.fetchedAt < HISTORY_MIN_REFRESH_MS) return;
      const d = this._discoverVehicle(deviceId);
      const isEv = !!d.sensors.battery_charge_level;
      const key = this._pickStatKey(d, isEv);
      const entityId = key ? d.sensors[key] : null;
      if (!entityId) return;

      this._history.set(deviceId, { ...(cached || {}), fetching: true, fetchedAt: now });

      const hours = this._config.stats_history_hours;
      const end = new Date();
      const start = new Date(end.getTime() - hours * 3600 * 1000);
      const path = `history/period/${localISO(start)}?filter_entity_id=${entityId}&end_time=${localISO(end)}&minimal_response=true&no_attributes=true`;

      this._hass
        .callApi("GET", path)
        .then((resp) => {
          const raw = resp?.[0] ?? [];
          const values = this._bucketize(raw, start.getTime(), end.getTime());
          this._history.set(deviceId, { values, fetchedAt: Date.now(), fetching: false });
          this._render();
        })
        .catch((err) => {
          console.warn("volvo-cars-card: history fetch failed", err);
          this._history.set(deviceId, { values: [], fetchedAt: Date.now(), fetching: false });
        });
    }

    _maybeRefreshOdometerHistory(deviceId) {
      const cached = this._odoHistory.get(deviceId);
      const now = Date.now();
      if (cached?.fetching) return;
      if (cached?.fetchedAt && now - cached.fetchedAt < HISTORY_MIN_REFRESH_MS) return;
      const d = this._discoverVehicle(deviceId);
      const entityId = d.sensors.odometer;
      if (!entityId) return;

      this._odoHistory.set(deviceId, { ...(cached || {}), fetching: true, fetchedAt: now });

      const end = new Date();
      // +1 day of margin so there's a baseline reading to diff day 0 against.
      const start = new Date(end.getTime() - (ODOMETER_DAYS + 1) * 24 * 3600 * 1000);
      const path = `history/period/${localISO(start)}?filter_entity_id=${entityId}&end_time=${localISO(end)}&minimal_response=true&no_attributes=true`;

      this._hass
        .callApi("GET", path)
        .then((resp) => {
          const raw = resp?.[0] ?? [];
          const distances = this._bucketizeDailyDistance(raw);
          this._odoHistory.set(deviceId, { distances, fetchedAt: Date.now(), fetching: false });
          this._render();
        })
        .catch((err) => {
          console.warn("volvo-cars-card: odometer history fetch failed", err);
          this._odoHistory.set(deviceId, { distances: [], fetchedAt: Date.now(), fetching: false });
        });
    }

    // Odometer readings never reset (unlike a power meter), so daily
    // distance is simply the difference between each day's last known
    // reading and the previous day's — no reset-aware accumulation needed.
    _bucketizeDailyDistance(raw) {
      const points = raw
        .map((s) => ({
          t: s.lu ? s.lu * 1000 : new Date(s.last_changed).getTime(),
          v: parseFloat(s.state),
        }))
        .filter((p) => Number.isFinite(p.t) && !isNaN(p.v))
        .sort((a, b) => a.t - b.t);
      if (points.length === 0) return [];

      const valueAtOrBefore = (t) => {
        let val = null;
        for (const p of points) {
          if (p.t <= t) val = p.v;
          else break;
        }
        return val;
      };

      const now = new Date();
      const dayEndValues = [];
      for (let i = ODOMETER_DAYS; i >= 0; i--) {
        const dayStart = new Date(now);
        dayStart.setHours(0, 0, 0, 0);
        dayStart.setDate(dayStart.getDate() - i);
        const dayEnd = i === 0 ? now : new Date(dayStart.getTime() + 24 * 3600 * 1000 - 1000);
        dayEndValues.push(valueAtOrBefore(dayEnd.getTime()));
      }

      const distances = [];
      for (let i = 1; i < dayEndValues.length; i++) {
        const prev = dayEndValues[i - 1];
        const cur = dayEndValues[i];
        distances.push(prev !== null && cur !== null ? Math.max(0, cur - prev) : null);
      }
      return distances;
    }

    // The most recent occurrence of lease_start_date's month/day that is
    // on or before `now` — a lease renews annually, so year 2+ needs the
    // CURRENT year's anniversary, not the original signing date.
    _leaseAnniversaryStart(dateStr, now = new Date()) {
      const parsed = new Date(dateStr + "T00:00:00");
      if (isNaN(parsed.getTime())) return null;
      const anniv = new Date(now.getFullYear(), parsed.getMonth(), parsed.getDate());
      if (anniv.getTime() > now.getTime()) anniv.setFullYear(anniv.getFullYear() - 1);
      return anniv;
    }

    _maybeRefreshLeaseStats(vehicle) {
      const deviceId = vehicle.device_id;
      const cached = this._leaseStats.get(deviceId);
      const now = Date.now();
      if (cached?.fetching) return;
      if (cached?.fetchedAt && now - cached.fetchedAt < HISTORY_MIN_REFRESH_MS) return;
      const d = this._discoverVehicle(deviceId);
      const entityId = d.sensors.odometer;
      if (!entityId || !this._hass) return;

      const anniversaryStart = this._leaseAnniversaryStart(vehicle.lease_start_date, new Date());
      if (!anniversaryStart) return;

      this._leaseStats.set(deviceId, { ...(cached || {}), fetching: true, fetchedAt: now });

      // callWS is a real, always-present method on a live HA `hass` object,
      // but guard with try/catch anyway (never trust an external call not
      // to throw synchronously) — same "never throw unhandled" discipline
      // as every other fetch in this file.
      try {
        Promise.resolve(
          this._hass.callWS({
            type: "recorder/statistics_during_period",
            statistic_ids: [entityId],
            start_time: anniversaryStart.toISOString(),
            end_time: new Date().toISOString(),
            period: "week",
          })
        )
          .then((resp) => {
            const points = (resp?.[entityId] || [])
              .map((p) => ({ t: p.start, v: p.state ?? p.sum }))
              .filter((p) => Number.isFinite(p.t) && typeof p.v === "number" && !isNaN(p.v))
              .sort((a, b) => a.t - b.t);
            this._leaseStats.set(deviceId, { points, fetchedAt: Date.now(), fetching: false });
            this._render();
          })
          .catch((err) => {
            console.warn("volvo-cars-card: lease statistics fetch failed", err);
            this._leaseStats.set(deviceId, { points: [], fetchedAt: Date.now(), fetching: false });
          });
      } catch (err) {
        console.warn("volvo-cars-card: lease statistics fetch failed", err);
        this._leaseStats.set(deviceId, { points: [], fetchedAt: Date.now(), fetching: false });
      }
    }

    // Returns null when the feature isn't configured/ready, or a full
    // computed snapshot (numbers + chart points) otherwise. Kept as one
    // pure-ish function (only reads hass/state) so it can be unit-tested
    // directly with synthetic input.
    _computeLease(vehicle, d, hass, now = new Date()) {
      if (!vehicle.lease_annual_limit_km || !vehicle.lease_start_date) return null;
      const odometerId = d.sensors.odometer;
      const odometerState = odometerId ? hass.states[odometerId] : undefined;
      if (!odometerState || isNaN(parseFloat(odometerState.state))) return { status: "waiting" };
      const currentOdometer = parseFloat(odometerState.state);

      const anniversaryStart = this._leaseAnniversaryStart(vehicle.lease_start_date, now);
      if (!anniversaryStart) return null;
      const anniversaryEnd = new Date(anniversaryStart);
      anniversaryEnd.setFullYear(anniversaryEnd.getFullYear() + 1);
      const daysInYear = Math.round((anniversaryEnd.getTime() - anniversaryStart.getTime()) / DAY_MS);
      const daysElapsed = Math.max(0, Math.min(daysInYear, Math.floor((now.getTime() - anniversaryStart.getTime()) / DAY_MS)));
      const daysLeft = daysInYear - daysElapsed;

      const stats = this._leaseStats.get(vehicle.device_id);
      const points = stats?.points || [];
      let baselineValue = null;
      let baselineSource = null;
      if (vehicle.lease_start_odometer_km !== null && !isNaN(vehicle.lease_start_odometer_km)) {
        baselineValue = vehicle.lease_start_odometer_km;
        baselineSource = "manual";
      } else if (points.length > 0) {
        baselineValue = points[0].v;
        baselineSource = "auto";
      }
      if (baselineValue === null) {
        return { status: stats?.fetching || !stats ? "waiting" : "no_baseline" };
      }

      const limit = vehicle.lease_annual_limit_km;
      const used = Math.max(0, currentOdometer - baselineValue);
      const remaining = limit - used;
      const expectedUsed = (daysElapsed / daysInYear) * limit;
      const overPaceKm = used - expectedUsed;
      const tolerance = limit * LEASE_PACE_TOLERANCE;
      const paceStatus = overPaceKm > tolerance ? "over" : overPaceKm < -tolerance ? "under" : "on";
      const overLimit = used > limit;

      // Chart points: cumulative km used since the anniversary, at each
      // fetched statistics timestamp, plus today's live reading as the
      // final point (statistics lag behind the live state by design).
      const chartPoints = points
        .map((p) => ({ t: p.t, used: Math.max(0, p.v - baselineValue) }))
        .filter((p) => p.t >= anniversaryStart.getTime());
      chartPoints.push({ t: now.getTime(), used });

      const projectedTotal = daysElapsed > 0 ? used * (daysInYear / daysElapsed) : used;

      return {
        status: "ok",
        baselineValue, baselineSource,
        limit, used, remaining, overLimit,
        daysInYear, daysElapsed, daysLeft,
        expectedUsed, overPaceKm, paceStatus,
        anniversaryStart, anniversaryEnd,
        chartPoints, projectedTotal,
      };
    }

    _bucketize(raw, startMs, endMs) {
      const points = raw
        .map((s) => ({
          t: s.lu ? s.lu * 1000 : new Date(s.last_changed).getTime(),
          v: parseFloat(s.state),
        }))
        .filter((p) => Number.isFinite(p.t) && !isNaN(p.v))
        .sort((a, b) => a.t - b.t);

      if (points.length === 0) return [];

      const span = endMs - startMs;
      const values = new Array(HISTORY_BUCKETS).fill(null);
      let carry = points[0].v;
      let pi = 0;
      for (let b = 0; b < HISTORY_BUCKETS; b++) {
        const bucketEnd = startMs + ((b + 1) / HISTORY_BUCKETS) * span;
        while (pi < points.length && points[pi].t <= bucketEnd) {
          carry = points[pi].v;
          pi++;
        }
        values[b] = carry;
      }
      return values;
    }

    _iconLockClosed(color) {
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;
    }
    _iconLockOpen(color) {
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 6.6-3.2"/></svg>`;
    }
    _iconClimate(color) {
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M4.5 6.5l15 11"/><path d="M19.5 6.5l-15 11"/><circle cx="12" cy="12" r="2.4" fill="${color}" stroke="none"/></svg>`;
    }
    _iconHonk(color) {
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-3a8 8 0 0 1 16 0v3"/><path d="M2 14h4v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3z"/><path d="M18 14h4v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3z"/><path d="M12 17v3"/></svg>`;
    }
    _iconPin(color) {
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
    }
    _iconEngine(color) {
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="${color}" stroke="none"><path d="M13 2 3 14h6l-1 8 10-12h-6z"/></svg>`;
    }
    _iconChevron(color) {
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
    }

    _css() {
      return `
        :host { display: block; }
        .vc-card {
          background: var(--ha-card-background, var(--card-background-color));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, none);
          border: 1px solid var(--divider-color);
          overflow: hidden;
          font-family: var(--paper-font-body1_-_font-family, inherit);
        }
        .vc-header {
          padding: 14px 16px 10px;
          border-bottom: 1px solid var(--divider-color);
        }
        .vc-title { font-size: 18px; font-weight: 600; color: var(--primary-text-color); }
        .vc-grid {
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .vc-vehicle { display: flex; flex-direction: column; gap: 12px; }
        .vc-hero {
          position: relative;
          border-radius: 16px;
          padding: 20px 14px 18px;
          background: var(--secondary-background-color);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .vc-glow {
          position: absolute;
          top: -60px; left: 50%; transform: translateX(-50%);
          width: 200px; height: 200px; border-radius: 50%;
          background: var(--vc-glow);
          opacity: 0.16;
          filter: blur(30px);
          pointer-events: none;
        }
        .vc-picture {
          position: relative; width: 100%; max-width: 220px; height: 84px;
          object-fit: cover; border-radius: 12px; display: block;
        }
        .vc-hero-name { position: relative; display: flex; align-items: center; gap: 8px; }
        .vc-vehicle-name { font-size: 15px; font-weight: 700; color: var(--primary-text-color); }
        .vc-type-pill {
          font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 10px;
          background: var(--divider-color); color: var(--secondary-text-color);
          text-transform: uppercase; letter-spacing: 0.04em;
        }
        .vc-ring-wrap { position: relative; width: 136px; height: 136px; }
        .vc-ring-text {
          position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .vc-ring-big { font-size: 28px; font-weight: 800; color: var(--primary-text-color); line-height: 1; }
        .vc-ring-small { font-size: 12px; color: var(--secondary-text-color); margin-top: 4px; }
        .vc-plain-wrap {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 100px; position: relative;
        }
        .vc-actions { position: relative; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .vc-action-btn {
          width: 44px; height: 44px; border-radius: 50%; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .vc-status-line { position: relative; display: flex; align-items: center; gap: 8px; font-size: 11.5px; font-weight: 700; }
        .vc-confirm-row { position: relative; display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; }
        .vc-confirm-chip {
          min-height: 44px; padding: 0 16px; border-radius: 22px; border: 1px solid var(--divider-color);
          background: var(--card-background-color); color: var(--primary-text-color);
          font-size: 12px; font-weight: 600; cursor: pointer;
        }
        .vc-status-sep { color: var(--secondary-text-color); }
        .vc-section { display: flex; flex-direction: column; gap: 8px; }
        .vc-section-title {
          font-size: 10.5px; font-weight: 700; color: var(--secondary-text-color);
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .vc-expand-toggle {
          display: flex; align-items: center; gap: 8px; width: 100%; min-height: 44px;
          background: none; border: none; padding: 0; margin: 0; cursor: pointer; text-align: left;
        }
        .vc-expand-summary { font-size: 12px; font-weight: 700; margin-left: auto; }
        .vc-chevron { flex: 0 0 auto; display: flex; transition: transform 0.15s ease; }
        .vc-warning-row { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--primary-text-color); margin-top: 6px; }
        .vc-doors-row { display: flex; gap: 16px; align-items: flex-start; }
        .vc-doors-svg { flex: 0 0 auto; }
        .vc-doors-list { display: flex; flex-direction: column; gap: 7px; padding-top: 6px; }
        .vc-door-row { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--primary-text-color); }
        .vc-dot { width: 8px; height: 8px; border-radius: 50%; flex: 0 0 auto; }
        .vc-charging { background: var(--secondary-background-color); border-radius: 12px; padding: 12px 14px; }
        .vc-kv-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 6px 14px; }
        .vc-kv { display: flex; justify-content: space-between; gap: 8px; }
        .vc-kv-label { font-size: 11.5px; color: var(--secondary-text-color); }
        .vc-kv-val { font-size: 11.5px; font-weight: 600; color: var(--primary-text-color); }
        .vc-position {
          display: flex; align-items: center; gap: 8px; min-height: 44px;
          text-decoration: none; color: var(--primary-text-color); font-size: 13px; font-weight: 600;
        }
        .vc-stats-head { display: flex; justify-content: space-between; align-items: baseline; }
        .vc-stats-val { font-size: 13px; font-weight: 700; color: var(--primary-text-color); }
        .vc-spark { display: block; }
      `;
    }
  }

  class VolvoCarsCardEditor extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._hass = null;
      this._config = { vehicles: [], show_stats: true, stats_history_hours: DEFAULT_STATS_HOURS };
      this.shadowRoot.addEventListener("click", (e) => this._onClick(e));
      this.shadowRoot.addEventListener("change", (e) => this._onFieldChange(e));
    }

    setConfig(config) {
      // Spread the incoming config FIRST so `type` (and anything else
      // Lovelace attaches) survives round-tripping through config-changed —
      // dropping it here breaks the edit-dialog preview with "No card type
      // configured", a real bug caught live against the owner's HA instance.
      this._config = {
        ...config,
        title: typeof config?.title === "string" ? config.title : null,
        show_stats: config?.show_stats !== false,
        stats_history_hours: config?.stats_history_hours || DEFAULT_STATS_HOURS,
        layout: LAYOUT_VALUES.includes(config?.layout) ? config.layout : "auto",
        vehicles: (config?.vehicles || []).map((v) => ({
          device_id: v.device_id || "",
          name: v.name || "",
          icon: v.icon || "",
          picture: v.picture || "",
          lease_annual_limit_km: v.lease_annual_limit_km ?? "",
          lease_start_date: v.lease_start_date || "",
          lease_start_odometer_km: v.lease_start_odometer_km ?? "",
        })),
      };
      this._render();
    }

    set hass(hass) {
      // A live HA instance reassigns `hass` continuously (any entity's state
      // changing anywhere triggers it) — re-rendering unconditionally on
      // every tick was destroying and recreating the whole DOM mid-
      // interaction, which force-closed an open <select> the instant a
      // viewer tried to pick a device (a real bug caught live). Only
      // rebuild when something the editor actually displays changed.
      const prevHass = this._hass;
      const dirty = !prevHass
        || prevHass.devices !== hass.devices
        || prevHass.language !== hass.language
        || prevHass.locale !== hass.locale;
      this._hass = hass;
      if (dirty) this._render();
    }

    _fireConfigChanged() {
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }));
    }

    _onClick(e) {
      const el = e.target.closest("[data-action]");
      if (!el) return;
      const action = el.dataset.action;
      if (action === "add-vehicle") {
        this._config.vehicles.push({ device_id: "", name: "", icon: "" });
        this._render();
        this._fireConfigChanged();
      } else if (action === "remove-vehicle") {
        const idx = Number(el.dataset.idx);
        this._config.vehicles.splice(idx, 1);
        this._render();
        this._fireConfigChanged();
      }
    }

    _onFieldChange(e) {
      const el = e.target;
      const field = el.dataset.field;
      if (!field) return;
      if (field === "title") {
        this._config.title = el.value;
      } else if (field === "show_stats") {
        this._config.show_stats = el.checked;
      } else if (field === "stats_history_hours") {
        this._config.stats_history_hours = parseInt(el.value, 10) || DEFAULT_STATS_HOURS;
      } else if (field === "layout") {
        this._config.layout = LAYOUT_VALUES.includes(el.value) ? el.value : "auto";
      } else {
        const idx = Number(el.dataset.idx);
        if (Number.isNaN(idx) || !this._config.vehicles[idx]) return;
        this._config.vehicles[idx][field] = el.value;
      }
      this._fireConfigChanged();
    }

    // Volvo integration devices always report manufacturer "Volvo"
    // (verified against homeassistant/components/volvo/const.py). Falls
    // back to listing every device if none match, so the editor never
    // shows an empty list for the user to get stuck on.
    _deviceOptions() {
      const devices = this._hass?.devices || {};
      const all = Object.values(devices);
      const volvoOnes = all.filter((d) => d.manufacturer === "Volvo");
      const list = volvoOnes.length ? volvoOnes : all;
      return list
        .map((d) => ({ id: d.id, label: d.name_by_user || d.name || d.id }))
        .sort((a, b) => a.label.localeCompare(b.label));
    }

    _render() {
      const hass = this._hass;
      const deviceOptions = this._deviceOptions();
      const rows = this._config.vehicles.map((v, idx) => `
        <div class="ed-vehicle-block">
          <div class="ed-row">
            <select class="ed-input ed-select" data-idx="${idx}" data-field="device_id">
              <option value="" ${v.device_id ? "" : "selected"}>${escHtml(t(hass, "editor_select_device"))}</option>
              ${deviceOptions.map((o) => `<option value="${escHtml(o.id)}" ${o.id === v.device_id ? "selected" : ""}>${escHtml(o.label)}</option>`).join("")}
            </select>
            <button class="ed-remove" type="button" data-action="remove-vehicle" data-idx="${idx}" title="${escHtml(t(hass, "editor_remove"))}">✕</button>
          </div>
          <div class="ed-row">
            <input class="ed-input" type="text" placeholder="${escHtml(t(hass, "editor_name"))}" data-idx="${idx}" data-field="name" value="${escHtml(v.name)}" />
            <input class="ed-input ed-icon" type="text" placeholder="${escHtml(t(hass, "editor_icon"))}" data-idx="${idx}" data-field="icon" value="${escHtml(v.icon)}" />
          </div>
          <div class="ed-row">
            <input class="ed-input" type="text" placeholder="${escHtml(t(hass, "editor_picture"))}" data-idx="${idx}" data-field="picture" value="${escHtml(v.picture)}" />
          </div>
          <div class="ed-row">
            <input class="ed-input" type="number" min="1" placeholder="${escHtml(t(hass, "editor_lease_limit"))}" data-idx="${idx}" data-field="lease_annual_limit_km" value="${escHtml(v.lease_annual_limit_km)}" />
            <input class="ed-input" type="text" placeholder="${escHtml(t(hass, "editor_lease_start_date"))}" data-idx="${idx}" data-field="lease_start_date" value="${escHtml(v.lease_start_date)}" />
          </div>
          <div class="ed-row">
            <input class="ed-input" type="number" min="0" placeholder="${escHtml(t(hass, "editor_lease_start_odometer"))}" data-idx="${idx}" data-field="lease_start_odometer_km" value="${escHtml(v.lease_start_odometer_km)}" />
          </div>
        </div>`).join("");

      this.shadowRoot.innerHTML = `
        <style>
          .ed-wrap { display: flex; flex-direction: column; gap: 10px; padding: 4px 0; }
          .ed-label { font-size: 12px; font-weight: 600; color: var(--secondary-text-color); }
          .ed-vehicle-block { display: flex; flex-direction: column; gap: 6px; padding: 8px; border: 1px solid var(--divider-color); border-radius: 8px; }
          .ed-row { display: flex; gap: 6px; align-items: center; }
          .ed-input { flex: 1 1 auto; min-width: 0; padding: 8px; border: 1px solid var(--divider-color); border-radius: 6px; background: var(--card-background-color); color: var(--primary-text-color); }
          .ed-select { flex: 1.4 1 auto; }
          .ed-icon { flex: 0 0 90px; }
          .ed-remove {
            flex: 0 0 auto; width: 32px; height: 32px; border-radius: 6px; border: 1px solid var(--divider-color);
            background: var(--card-background-color); color: var(--secondary-text-color); cursor: pointer;
          }
          .ed-add {
            align-self: flex-start; padding: 8px 14px; border-radius: 6px; border: 1px solid var(--divider-color);
            background: var(--card-background-color); color: var(--primary-color); cursor: pointer; font-weight: 600;
          }
          .ed-toggle-row { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
          .ed-hours { width: 90px; padding: 8px; border: 1px solid var(--divider-color); border-radius: 6px; background: var(--card-background-color); color: var(--primary-text-color); }
          .ed-layout { width: 160px; }
        </style>
        <div class="ed-wrap">
          <div class="ed-toggle-row" style="margin-top:0;">
            <span class="ed-label">${escHtml(t(hass, "editor_title"))}</span>
          </div>
          <input class="ed-input" type="text" placeholder="${escHtml(t(hass, "title"))}" data-field="title" value="${escHtml(this._config.title || "")}" />
          <span class="ed-label">${escHtml(t(hass, "editor_vehicles"))}</span>
          ${rows}
          <button class="ed-add" type="button" data-action="add-vehicle">${escHtml(t(hass, "editor_add_vehicle"))}</button>
          <div class="ed-toggle-row">
            <input type="checkbox" data-field="show_stats" ${this._config.show_stats ? "checked" : ""} />
            <span class="ed-label">${escHtml(t(hass, "editor_show_stats"))}</span>
          </div>
          <div class="ed-toggle-row">
            <span class="ed-label">${escHtml(t(hass, "editor_stats_hours"))}</span>
            <input class="ed-hours" type="number" min="1" data-field="stats_history_hours" value="${this._config.stats_history_hours}" />
          </div>
          <div class="ed-toggle-row">
            <span class="ed-label">${escHtml(t(hass, "editor_layout"))}</span>
            <select class="ed-hours ed-layout" data-field="layout">
              <option value="auto" ${this._config.layout === "auto" ? "selected" : ""}>${escHtml(t(hass, "layout_auto"))}</option>
              <option value="horizontal" ${this._config.layout === "horizontal" ? "selected" : ""}>${escHtml(t(hass, "layout_horizontal"))}</option>
              <option value="vertical" ${this._config.layout === "vertical" ? "selected" : ""}>${escHtml(t(hass, "layout_vertical"))}</option>
            </select>
          </div>
        </div>`;
    }
  }

  customElements.define(CARD_NAME, VolvoCarsCard);
  customElements.define(EDITOR_NAME, VolvoCarsCardEditor);

  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: "Volvo Cars Card",
    description: "Dashboard card for one or more Volvo vehicles connected via Home Assistant's official Volvo integration.",
    preview: false,
  });
})();
