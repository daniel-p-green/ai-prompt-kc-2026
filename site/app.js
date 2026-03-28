const loadData = async () => {
  const response = await fetch("data/streetcart-kc.json");
  if (!response.ok) throw new Error(`Failed to load data: ${response.status}`);
  return response.json();
};

const formatPercent = (value) => `${value.toFixed(1)}%`;

const renderListItems = (items) => items.map((item) => `<li>${item}</li>`).join("");

const renderCurveball = (module) => {
  document.getElementById("curveball-title").textContent = module.title;
  document.getElementById("curveball-body").textContent = module.body;

  const vote = module.communityVote;
  document.getElementById("curveball-vote").innerHTML = `
    <p class="curveball-tag">Community vote • ${vote.window}</p>
    <h4>${vote.title}</h4>
    <p>${vote.summary}</p>
    <p class="curveball-hotline">${vote.hotlineLabel}</p>
    <ul class="curveball-list">${renderListItems(vote.tactics)}</ul>
    <p class="curveball-note">Spanish first. Community-led. ${vote.bracketTeam} gives KCK a local lane in the bracket.</p>
  `;

  const produce = module.produceSurge;
  document.getElementById("curveball-produce").innerHTML = `
    <p class="curveball-tag">Produce surge • ${produce.window}</p>
    <h4>${produce.title}</h4>
    <p>${produce.summary}</p>
    <ul class="curveball-list">${renderListItems(
      produce.allocations.map((allocation) => `${allocation.lbs} lbs -> ${allocation.destination}`)
    )}</ul>
    <p class="curveball-note">Day 0 / Day 1 / Day 2 flow keeps the timing abstract while the cold-chain logic stays concrete.</p>
  `;

  const budgetImpact = module.budgetImpact;
  document.getElementById("curveball-footer").innerHTML = `
    <p>${module.architectureProof}</p>
    <div class="curveball-metrics">
      <span>${budgetImpact.voteSupport}</span>
      <span>${budgetImpact.produceMove}</span>
    </div>
    <p class="curveball-note">${budgetImpact.detail}</p>
  `;
};

const renderProof = (data) => {
  document.getElementById("thesis").textContent = data.thesis;

  const proofGrid = document.getElementById("proof-grid");
  proofGrid.innerHTML = "";
  data.problemProof.forEach((item) => {
    const card = document.createElement("article");
    card.className = "proof-card";
    card.innerHTML = `
      <p class="section-label">Problem proof</p>
      <div class="proof-value">${item.value}</div>
      <h3>${item.label}</h3>
      <p>${item.detail}</p>
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
      <strong>${zip.zip} • ${zip.priority}</strong>
      <span>${formatPercent(zip.foodInsecurityRate)} food insecurity • ${formatPercent(zip.noVehiclePct)} no vehicle</span>
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
      <div class="kpi-value">${kpi.value}</div>
      <div class="kpi-label">${kpi.label}</div>
      <p class="kpi-detail">${kpi.detail}</p>
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
          <h4>${hub.name}</h4>
          <div class="hub-schedule">${hub.schedule}</div>
        </div>
        <div class="hub-type">${hub.type}</div>
      </div>
      <p class="hub-meta"><strong>Partners:</strong> ${hub.partners.join(" + ")}</p>
      <p class="hub-meta"><strong>Serves:</strong> ${hub.serves.join(", ")}</p>
      <p class="hub-meta">${hub.purpose}</p>
      <p class="hub-meta"><strong>Mode:</strong> ${hub.mode}</p>
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

  const applyLanguage = (lang) => {
    document.getElementById("resident-name").textContent = copy[lang].name;
    document.getElementById("resident-title").textContent = copy[lang].title;
    document.getElementById("resident-body").textContent = copy[lang].body;
    document.getElementById("resident-fallback").textContent = copy[lang].fallback;

    document.querySelectorAll(".lang").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.lang === lang);
    });
  };

  document.querySelectorAll(".lang").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });

  applyLanguage("es");
};

const renderLeaderboard = (data) => {
  const teamList = document.getElementById("team-list");
  teamList.innerHTML = "";
  data.teams.forEach((team) => {
    const row = document.createElement("div");
    row.className = "team-row";
    row.innerHTML = `
      <div>
        <strong>${team.name}</strong>
        <div class="team-meta">${team.verified} verified completions • ${team.status}</div>
      </div>
      <div class="team-score">${team.points}</div>
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

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextView = button.dataset.view;

      buttons.forEach((candidate) => {
        const selected = candidate === button;
        candidate.classList.toggle("is-active", selected);
        candidate.setAttribute("aria-selected", selected ? "true" : "false");
      });

      views.forEach((view) => {
        view.classList.toggle("is-active", view.id === `view-${nextView}`);
      });
    });
  });
};

const init = async () => {
  const data = await loadData();
  renderProof(data);
  renderSidebar(data);
  renderOperator(data);
  renderResident(data);
  renderLeaderboard(data);
  wireTabs();
};

init().catch((error) => {
  console.error(error);
  document.body.innerHTML = `
    <main style="padding: 2rem; font-family: system-ui;">
      <h1>StreetCart KC</h1>
      <p>Failed to load the live site data.</p>
      <pre>${error.message}</pre>
    </main>
  `;
});
