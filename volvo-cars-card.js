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
      home: "Home",
      stats_avg: "Avg · {days}d",
      no_history: "No history yet",
      lock_action: "Lock / unlock",
      climate_action: "Climate",
      honk_action: "Horn & lights",
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
      editor_vehicles: "Vehicles",
      editor_add_vehicle: "+ Add vehicle",
      editor_remove: "Remove",
      editor_device: "Device",
      editor_name: "Name (optional)",
      editor_icon: "Icon (optional)",
      editor_show_stats: "Show statistics",
      editor_stats_hours: "Statistics window (hours)",
      editor_select_device: "Select a device…",
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
      home: "Hemma",
      stats_avg: "Snitt · {days}d",
      no_history: "Ingen historik ännu",
      lock_action: "Lås / lås upp",
      climate_action: "Klimat",
      honk_action: "Signalhorn & blink",
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
      editor_vehicles: "Fordon",
      editor_add_vehicle: "+ Lägg till fordon",
      editor_remove: "Ta bort",
      editor_device: "Enhet",
      editor_name: "Namn (valfritt)",
      editor_icon: "Ikon (valfritt)",
      editor_show_stats: "Visa statistik",
      editor_stats_hours: "Statistikfönster (timmar)",
      editor_select_device: "Välj en enhet…",
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
    "average_energy_consumption",
    "average_fuel_consumption",
    "charging_status",
    "charging_power",
    "estimated_charging_time",
    "target_battery_charge_level",
  ];
  const DOOR_WINDOW_KEYS = [
    "door_front_left", "door_front_right", "door_rear_left", "door_rear_right",
    "hood", "tailgate", "tank_lid",
    "window_front_left", "window_front_right", "window_rear_left", "window_rear_right",
    "sunroof",
  ];
  const BUTTON_KEYS = ["climatization_start", "climatization_stop", "honk_flash"];

  const SENSOR_KEY_SET = new Set(SENSOR_KEYS);
  const DOOR_WINDOW_KEY_SET = new Set(DOOR_WINDOW_KEYS);
  const BUTTON_KEY_SET = new Set(BUTTON_KEYS);

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
      return { vehicles: [], show_stats: true };
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._hass = null;
      this._config = null;
      this._history = new Map(); // deviceId -> { values, fetchedAt, fetching }
      this._pulses = new Map(); // deviceId -> boolean (honk pulse)
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
        show_stats: config.show_stats !== false,
        stats_history_hours: Math.min(
          MAX_STATS_HOURS,
          Math.max(1, parseInt(config.stats_history_hours, 10) || DEFAULT_STATS_HOURS)
        ),
        vehicles: config.vehicles.map((v) => ({
          device_id: v.device_id,
          name: v.name || "",
          icon: v.icon || "",
        })),
      };
      if (this._hass) this._render();
    }

    getCardSize() {
      return 1 + (this._config?.vehicles?.length || 1) * 4;
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
        if (d.lock) ids.add(d.lock);
        if (d.tracker) ids.add(d.tracker);
      }
      return ids;
    }

    _discoverVehicle(deviceId, hass) {
      hass = hass || this._hass;
      const entities = hass?.entities || {};
      const states = hass?.states || {};
      const found = { sensors: {}, doors: {}, lock: null, tracker: null, buttons: {} };
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
        } else if (domain === "binary_sensor" && key && DOOR_WINDOW_KEY_SET.has(key)) {
          found.doors[key] = entityId;
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

    _onClick(e) {
      const el = e.target.closest("[data-action]");
      if (!el) return;
      const action = el.dataset.action;
      const deviceId = el.dataset.device;
      if (action === "toggle-lock") {
        this._toggleLock(deviceId);
      } else if (action === "toggle-climate") {
        this._toggleClimate(deviceId);
      } else if (action === "honk") {
        this._honk(deviceId);
      }
    }

    _toggleLock(deviceId) {
      const d = this._discoverVehicle(deviceId);
      if (!d.lock || !this._hass) return;
      const st = this._hass.states[d.lock];
      const isLocked = st?.state === "locked";
      this._hass
        .callService("lock", isLocked ? "unlock" : "lock", { entity_id: d.lock })
        .catch(() => {});
    }

    _toggleClimate(deviceId) {
      const d = this._discoverVehicle(deviceId);
      const startId = d.buttons.climatization_start;
      const stopId = d.buttons.climatization_stop;
      if (!startId || !stopId || !this._hass) return;
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

    _honk(deviceId) {
      const d = this._discoverVehicle(deviceId);
      const id = d.buttons.honk_flash;
      if (!id || !this._hass) return;
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
      this.shadowRoot.innerHTML = `
        <style>${this._css()}</style>
        <div class="vc-card">
          <div class="vc-header">
            <span class="vc-title">${escHtml(t(hass, "title"))}</span>
          </div>
          <div class="vc-grid">${vehiclesHtml}</div>
        </div>
      `;
      if (this._config.show_stats) {
        for (const v of this._config.vehicles) {
          this._maybeRefreshHistory(v.device_id);
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
      const honkAvailable = !!d.buttons.honk_flash;
      const pulsing = this._pulses.get(vehicle.device_id);

      const buttonsHtml = `
        <div class="vc-actions">
          ${d.lock ? `
            <button class="vc-action-btn" data-action="toggle-lock" data-device="${escHtml(vehicle.device_id)}"
              title="${escHtml(t(hass, "lock_action"))}"
              style="background:${lockKnown ? (isLocked ? TINT_SUCCESS : TINT_ERROR) : "var(--secondary-background-color)"};">
              ${isLocked ? this._iconLockClosed(lockColorVar) : this._iconLockOpen(lockColorVar)}
            </button>` : ""}
          ${climateAvailable ? `
            <button class="vc-action-btn" data-action="toggle-climate" data-device="${escHtml(vehicle.device_id)}"
              title="${escHtml(t(hass, "climate_action"))}"
              style="background:${climateOn ? TINT_INFO : "var(--secondary-background-color)"};">
              ${this._iconClimate(climateOn ? "var(--info-color, var(--primary-color))" : "var(--secondary-text-color)")}
            </button>` : ""}
          ${honkAvailable ? `
            <button class="vc-action-btn" data-action="honk" data-device="${escHtml(vehicle.device_id)}"
              title="${escHtml(t(hass, "honk_action"))}"
              style="background:${pulsing ? TINT_WARNING : "var(--secondary-background-color)"};">
              ${this._iconHonk(pulsing ? "var(--warning-color)" : "var(--secondary-text-color)")}
            </button>` : ""}
        </div>
        <div class="vc-status-line">
          <span style="color:${lockColorVar};">${escHtml(lockLabel)}</span>
          ${climateAvailable && climateOn ? `<span class="vc-status-sep">·</span><span style="color:var(--info-color, var(--primary-color));">${escHtml(t(hass, "climate_on"))}</span>` : ""}
        </div>`;

      const doorsHtml = this._renderDoors(d, hass, vehicle.device_id);
      const chargingHtml = this._renderCharging(d, hass);
      const positionHtml = this._renderPosition(d, hass);
      const statsHtml = this._config.show_stats ? this._renderStats(vehicle, d, hass, isEv) : "";

      return `
        <div class="vc-vehicle">
          <div class="vc-hero" style="--vc-glow:${glowVar};">
            <div class="vc-glow"></div>
            <div class="vc-hero-name">
              <span class="vc-vehicle-name">${name}</span>
              <span class="vc-type-pill">${isEv ? "EV" : (fuel ? "ICE" : "")}</span>
            </div>
            ${heroValueHtml}
            ${buttonsHtml}
          </div>
          ${doorsHtml}
          ${chargingHtml}
          ${positionHtml}
          ${statsHtml}
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
          <rect x="90" y="102" width="20" height="42" rx="6" fill="${zoneColor("door_rear_right")}"/>
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
      if (!status && !power && !timeLeft && !target) return "";

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
          </div>
        </div>`;
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
      const key = isEv ? "average_energy_consumption" : "average_fuel_consumption";
      const entityId = d.sensors[key];
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
      const entityId = d.sensors.average_energy_consumption || d.sensors.average_fuel_consumption;
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
        .vc-status-sep { color: var(--secondary-text-color); }
        .vc-section { display: flex; flex-direction: column; gap: 8px; }
        .vc-section-title {
          font-size: 10.5px; font-weight: 700; color: var(--secondary-text-color);
          text-transform: uppercase; letter-spacing: 0.05em;
        }
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
      this._config = {
        show_stats: config?.show_stats !== false,
        stats_history_hours: config?.stats_history_hours || DEFAULT_STATS_HOURS,
        vehicles: (config?.vehicles || []).map((v) => ({
          device_id: v.device_id || "",
          name: v.name || "",
          icon: v.icon || "",
        })),
      };
      this._render();
    }

    set hass(hass) {
      this._hass = hass;
      this._render();
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
      if (field === "show_stats") {
        this._config.show_stats = el.checked;
      } else if (field === "stats_history_hours") {
        this._config.stats_history_hours = parseInt(el.value, 10) || DEFAULT_STATS_HOURS;
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
        <div class="ed-row">
          <select class="ed-input ed-select" data-idx="${idx}" data-field="device_id">
            <option value="" ${v.device_id ? "" : "selected"}>${escHtml(t(hass, "editor_select_device"))}</option>
            ${deviceOptions.map((o) => `<option value="${escHtml(o.id)}" ${o.id === v.device_id ? "selected" : ""}>${escHtml(o.label)}</option>`).join("")}
          </select>
          <input class="ed-input" type="text" placeholder="${escHtml(t(hass, "editor_name"))}" data-idx="${idx}" data-field="name" value="${escHtml(v.name)}" />
          <input class="ed-input ed-icon" type="text" placeholder="${escHtml(t(hass, "editor_icon"))}" data-idx="${idx}" data-field="icon" value="${escHtml(v.icon)}" />
          <button class="ed-remove" type="button" data-action="remove-vehicle" data-idx="${idx}" title="${escHtml(t(hass, "editor_remove"))}">✕</button>
        </div>`).join("");

      this.shadowRoot.innerHTML = `
        <style>
          .ed-wrap { display: flex; flex-direction: column; gap: 10px; padding: 4px 0; }
          .ed-label { font-size: 12px; font-weight: 600; color: var(--secondary-text-color); }
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
        </style>
        <div class="ed-wrap">
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
