import { applySearchState, resolveLandingState } from "../src/lib/dashboard-url-state.js";

const loadData = async () => {
  const response = await fetch("data/streetcart-kc.json");
  if (!response.ok) throw new Error(`Failed to load data: ${response.status}`);
  return response.json();
};

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return replacements[character];
  });

const formatPercent = (value) => `${value.toFixed(1)}%`;

const renderListItems = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

const replaceUrlState = (patch) => {
  window.history.replaceState({}, "", applySearchState(window.location.href, patch));
};

const initRevealMotion = () => {
  const targets = [...document.querySelectorAll("[data-reveal]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
  });

  if (reduceMotion) {
    targets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px"
  });

  targets.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
    observer.observe(element);
  });
};

const renderCurveball = (module) => {
  document.getElementById("curveball-title").textContent = module.title;
  document.getElementById("curveball-body").textContent = module.body;

  const vote = module.communityVote;
  document.getElementById("curveball-vote").innerHTML = `
    <p class="curveball-tag">Community vote • ${escapeHtml(vote.window)}</p>
    <h4>${escapeHtml(vote.title)}</h4>
    <p>${escapeHtml(vote.summary)}</p>
    <p class="curveball-hotline">${escapeHtml(vote.hotlineLabel)}</p>
    <ul class="curveball-list">${renderListItems(vote.tactics)}</ul>
    <p class="curveball-note">Spanish first. Community-led. ${escapeHtml(vote.bracketTeam)} gives KCK a local lane in the bracket.</p>
  `;

  const produce = module.produceSurge;
  document.getElementById("curveball-produce").innerHTML = `
    <p class="curveball-tag">Produce surge • ${escapeHtml(produce.window)}</p>
    <h4>${escapeHtml(produce.title)}</h4>
    <p>${escapeHtml(produce.summary)}</p>
    <ul class="curveball-list">${renderListItems(
      produce.allocations.map((allocation) => `${allocation.lbs} lbs -> ${allocation.destination}`)
    )}</ul>
    <p class="curveball-note">Day 0 / Day 1 / Day 2 flow keeps the timing abstract while the cold-chain logic stays concrete.</p>
  `;

  const budgetImpact = module.budgetImpact;
  document.getElementById("curveball-footer").innerHTML = `
    <p>${escapeHtml(module.architectureProof)}</p>
    <div class="curveball-metrics">
      <span>${escapeHtml(budgetImpact.voteSupport)}</span>
      <span>${escapeHtml(budgetImpact.produceMove)}</span>
    </div>
    <p class="curveball-note">${escapeHtml(budgetImpact.detail)}</p>
  `;
};

const BUDGET_COLORS = ["#c53e37", "#5972e3", "#2e7d64", "#e3a23b", "#9b59b6"];

const renderAlerts = (data) => {
  const strip = document.getElementById("alert-strip");
  const alerts = data.supplyAlerts ?? [];
  if (alerts.length === 0) return;

  strip.hidden = false;
  strip.innerHTML = alerts.map((alert) =>
    `<span class="alert-chip" data-severity="${escapeHtml(alert.severity)}">` +
    `<span class="alert-dot"></span>${escapeHtml(alert.title)}</span>`
  ).join("");
};

const renderBudget = (data) => {
  const bar = document.getElementById("budget-bar");
  const legend = document.getElementById("budget-legend");
  const budget = data.budget ?? [];
  const total = budget.reduce((sum, item) => sum + item.amount, 0);
  if (total === 0) return;

  bar.innerHTML = budget.map((item, i) => {
    const pct = ((item.amount / total) * 100).toFixed(1);
    return `<div class="budget-segment" style="flex-basis:${pct}%;background:${BUDGET_COLORS[i % BUDGET_COLORS.length]}">${item.percent}%</div>`;
  }).join("");

  legend.innerHTML = budget.map((item, i) =>
    `<span class="budget-legend-item"><span class="budget-legend-swatch" style="background:${BUDGET_COLORS[i % BUDGET_COLORS.length]}"></span>$${Math.round(item.amount / 1000)}K ${escapeHtml(item.category)}</span>`
  ).join("");
};

const renderLiveFeed = (data) => {
  const container = document.getElementById("live-feed");
  const entries = data.liveFeed?.initialEntries ?? [];
  if (entries.length === 0) return;

  entries.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "feed-entry";
    row.innerHTML =
      `<span class="feed-team">${escapeHtml(entry.team)}</span>` +
      `<span class="feed-action"><strong>${escapeHtml(entry.zip)}</strong> · ${escapeHtml(entry.action)}</span>` +
      `<span class="feed-time">${escapeHtml(entry.minutesAgo)}m ago</span>`;
    container.appendChild(row);
  });

  const queued = data.liveFeed?.queuedEvents ?? [];
  if (queued.length === 0) return;

  let qi = 0;
  const tickMs = data.liveFeed?.tickMs ?? 12000;
  setInterval(() => {
    const event = queued[qi % queued.length];
    qi += 1;
    const row = document.createElement("div");
    row.className = "feed-entry";
    row.innerHTML =
      `<span class="feed-team">${escapeHtml(event.team)}</span>` +
      `<span class="feed-action"><strong>${escapeHtml(event.zip)}</strong> · ${escapeHtml(event.action)}</span>` +
      `<span class="feed-time">just now</span>`;
    const firstEntry = container.querySelector(".feed-entry");
    if (firstEntry) {
      container.insertBefore(row, firstEntry);
    } else {
      container.appendChild(row);
    }
  }, tickMs);
};

const renderProof = (data) => {
  document.getElementById("thesis").textContent = data.thesis;

  const proofGrid = document.getElementById("proof-grid");
  proofGrid.innerHTML = "";
  data.problemProof.forEach((item) => {
    const card = document.createElement("article");
    card.className = "proof-card";
    card.dataset.reveal = "";
    card.innerHTML = `
      <p class="section-label">Problem proof</p>
      <div class="proof-value">${escapeHtml(item.value)}</div>
      <h3>${escapeHtml(item.label)}</h3>
      <p>${escapeHtml(item.detail)}</p>
    `;
    proofGrid.appendChild(card);
  });
};

const renderSidebar = (data) => {
  const list = document.getElementById("zip-list");
  list.innerHTML = "";
  data.priorityZips.forEach((zip) => {
    const li = document.createElement("li");
    li.className = "zip-card";
    li.innerHTML = `
      <strong>${escapeHtml(zip.zip)} • ${escapeHtml(zip.priority)}</strong>
      <span>${escapeHtml(formatPercent(zip.foodInsecurityRate))} food insecurity • ${escapeHtml(formatPercent(zip.noVehiclePct))} no vehicle</span>
    `;
    list.appendChild(li);
  });
  renderCurveball(data.curveballModule);
};

const renderOperator = (data) => {
  const kpiGrid = document.getElementById("kpi-grid");
  kpiGrid.innerHTML = "";
  data.kpis.forEach((kpi) => {
    const card = document.createElement("article");
    card.className = "kpi-card";
    card.innerHTML = `
      <div class="kpi-value">${escapeHtml(kpi.value)}</div>
      <div class="kpi-label">${escapeHtml(kpi.label)}</div>
      <p class="kpi-detail">${escapeHtml(kpi.detail)}</p>
    `;
    kpiGrid.appendChild(card);
  });

  const hubGrid = document.getElementById("hub-grid");
  hubGrid.innerHTML = "";
  data.hubs.forEach((hub) => {
    const card = document.createElement("article");
    card.className = "hub-card";
    card.innerHTML = `
      <div class="hub-header">
        <div>
          <h4>${escapeHtml(hub.name)}</h4>
          <div class="hub-schedule">${escapeHtml(hub.schedule)}</div>
        </div>
        <div class="hub-type">${escapeHtml(hub.type)}</div>
      </div>
      <p class="hub-meta"><strong>Partners:</strong> ${escapeHtml(hub.partners.join(" + "))}</p>
      <p class="hub-meta"><strong>Serves:</strong> ${escapeHtml(hub.serves.join(", "))}</p>
      <p class="hub-meta">${escapeHtml(hub.purpose)}</p>
      <p class="hub-meta"><strong>Mode:</strong> ${escapeHtml(hub.mode)}</p>
    `;
    hubGrid.appendChild(card);
  });
};

const renderResident = (data) => {
  const resident = data.residentExample;
  const copy = {
    es: {
      name: `${resident.name} • ZIP ${resident.zip}`,
      title: resident.instructionTitle,
      body: resident.instructionBody,
      fallback: resident.fallback
    },
    en: {
      name: `${resident.name} • ZIP ${resident.zip}`,
      title: "Your next StreetCart KC pickup",
      body: "Wednesday · 11:00 AM to 2:00 PM · Cross-Lines Connector Hub. Bring a reusable bag. No ID required. Spanish-language help will be available on site through El Centro.",
      fallback: "If you cannot reach the hub, reply HELP to request priority delivery screening."
    }
  };

  const applyLanguage = (lang, { updateUrl = true } = {}) => {
    const nextLang = lang === "en" ? "en" : "es";

    document.getElementById("resident-name").textContent = copy[nextLang].name;
    document.getElementById("resident-title").textContent = copy[nextLang].title;
    document.getElementById("resident-body").textContent = copy[nextLang].body;
    document.getElementById("resident-fallback").textContent = copy[nextLang].fallback;

    document.querySelectorAll(".lang").forEach((button) => {
      const selected = button.dataset.lang === nextLang;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });

    if (updateUrl) {
      replaceUrlState({
        lang: nextLang
      });
    }
  };

  applyLanguage("es", {
    updateUrl: false
  });

  return applyLanguage;
};

const renderLeaderboard = (data) => {
  const teamList = document.getElementById("team-list");
  teamList.innerHTML = "";
  data.teams.forEach((team) => {
    const row = document.createElement("div");
    row.className = "team-row";
    row.innerHTML = `
      <div>
        <strong>${escapeHtml(team.name)}</strong>
        <div class="team-meta">${escapeHtml(team.verified)} verified completions • ${escapeHtml(team.status)}</div>
      </div>
      <div class="team-score">${escapeHtml(team.points)}</div>
    `;
    teamList.appendChild(row);
  });

  const renewalList = document.getElementById("renewal-list");
  renewalList.innerHTML = "";
  data.renewalCase.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    renewalList.appendChild(li);
  });

  const aiList = document.getElementById("ai-list");
  aiList.innerHTML = "";
  data.aiProcess.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    aiList.appendChild(li);
  });
};

const wireTabs = () => {
  const buttons = [...document.querySelectorAll(".tab")];
  const views = [...document.querySelectorAll(".view")];
  const resolveView = (view) => resolveLandingState(`?view=${encodeURIComponent(view ?? "")}`).view;

  const applyView = (nextView, { updateUrl = true } = {}) => {
    const resolvedView = resolveView(nextView);

    buttons.forEach((candidate) => {
      const selected = candidate.dataset.view === resolvedView;
      candidate.classList.toggle("is-active", selected);
      candidate.setAttribute("aria-selected", selected ? "true" : "false");
      candidate.tabIndex = selected ? 0 : -1;
    });

    views.forEach((view) => {
      const selected = view.id === `view-${resolvedView}`;
      view.classList.toggle("is-active", selected);
      view.hidden = !selected;
    });

    if (updateUrl) {
      replaceUrlState({
        view: resolvedView
      });
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyView(button.dataset.view));
  });

  applyView("operator", {
    updateUrl: false
  });

  return applyView;
};

const init = async () => {
  const data = await loadData();
  renderAlerts(data);
  renderProof(data);
  renderSidebar(data);
  renderOperator(data);
  renderBudget(data);
  const applyLanguage = renderResident(data);
  renderLeaderboard(data);
  renderLiveFeed(data);
  const applyView = wireTabs();

  document.querySelectorAll(".lang").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });

  initRevealMotion();

  const syncLandingState = () => {
    const state = resolveLandingState(window.location.search);
    applyView(state.view, { updateUrl: false });
    applyLanguage(state.lang, { updateUrl: false });
  };

  syncLandingState();
  window.addEventListener("popstate", syncLandingState);
};

init().catch((error) => {
  console.error(error);
  document.body.textContent = "";

  const main = document.createElement("main");
  main.style.padding = "2rem";
  main.style.fontFamily = "system-ui";

  const title = document.createElement("h1");
  title.textContent = "StreetCart KC";

  const message = document.createElement("p");
  message.textContent = "Failed to load the live site data.";

  const details = document.createElement("pre");
  details.textContent = error instanceof Error ? error.message : String(error);

  main.append(title, message, details);
  document.body.append(main);
});
