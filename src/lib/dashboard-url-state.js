const STAGE_MODE_ALIASES = new Set(["stage", "presentation", "kiosk"]);
const LANDING_VIEWS = new Set(["operator", "resident", "leaderboard"]);
const LANDING_LANGS = new Set(["es", "en"]);

const readSearchParams = (search = "") => new URLSearchParams(String(search).replace(/^\?/, ""));

const normalizeZipOptions = (zipOptions = []) =>
  new Set(zipOptions.map((zip) => String(zip ?? "").trim()).filter(Boolean));

export const resolveTrackerState = ({ search = "", zipOptions = [], fallbackZip = "" } = {}) => {
  const params = readSearchParams(search);
  const requestedMode = params.get("mode")?.trim().toLowerCase() ?? "";
  const requestedZip = params.get("zip")?.trim() ?? "";
  const validZips = normalizeZipOptions(zipOptions);

  return {
    mode: STAGE_MODE_ALIASES.has(requestedMode) ? "stage" : "exhibit",
    zip: validZips.has(requestedZip) ? requestedZip : fallbackZip
  };
};

export const resolveLandingState = (search = "") => {
  const params = readSearchParams(search);
  const requestedView = params.get("view")?.trim().toLowerCase() ?? "";
  const requestedLang = params.get("lang")?.trim().toLowerCase() ?? "";

  return {
    view: LANDING_VIEWS.has(requestedView) ? requestedView : "operator",
    lang: LANDING_LANGS.has(requestedLang) ? requestedLang : "es"
  };
};

export const applySearchState = (currentUrl, patch = {}) => {
  const url = new URL(currentUrl, "https://streetcartkc.test");

  if (Object.hasOwn(patch, "mode")) {
    if (patch.mode === "stage") {
      url.searchParams.set("mode", "stage");
    } else {
      url.searchParams.delete("mode");
    }
  }

  if (Object.hasOwn(patch, "zip")) {
    if (patch.zip) {
      url.searchParams.set("zip", patch.zip);
    } else {
      url.searchParams.delete("zip");
    }
  }

  if (Object.hasOwn(patch, "view")) {
    if (patch.view) {
      url.searchParams.set("view", patch.view);
    } else {
      url.searchParams.delete("view");
    }
  }

  if (Object.hasOwn(patch, "lang")) {
    if (patch.lang) {
      url.searchParams.set("lang", patch.lang);
    } else {
      url.searchParams.delete("lang");
    }
  }

  const search = url.searchParams.toString();
  return `${url.pathname}${search ? `?${search}` : ""}${url.hash}`;
};
