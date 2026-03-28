import { startTransition, useEffect, useEffectEvent, useState } from "react";

import dashboardData from "../../data/streetcart-kc.json";
import { applySearchState, resolveTrackerState } from "../lib/dashboard-url-state.js";
import {
  advanceSimulation,
  buildBudgetBars,
  buildPresentationStats,
  buildZipHeatRows,
  createSimulationState,
  sortTeamsByPoints
} from "../lib/streetcart-dashboard.js";

const formatInteger = (value) => new Intl.NumberFormat("en-US").format(value);

const formatPercent = (value) =>
  `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1
  }).format(value)}%`;

const formatCompactMoney = (value) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }

  return `$${Math.round(value / 1000)}K`;
};

const ALERT_TONES = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Urgent: "urgent"
};

const DASHBOARD_DATA = dashboardData;
const ZIP_ROWS = buildZipHeatRows(DASHBOARD_DATA);
const BUDGET_BARS = buildBudgetBars(DASHBOARD_DATA.budget);
const TRACKER_ZIP_OPTIONS = ZIP_ROWS.map((zip) => zip.zip);
const TRACKER_FALLBACK_ZIP = ZIP_ROWS[0]?.zip ?? "";

const SectionHeader = ({ label, title, detail }) => (
  <header className="panel-header">
    <div>
      <p>{label}</p>
      <h2>{title}</h2>
    </div>
    {detail ? <span>{detail}</span> : null}
  </header>
);

const AlertCard = ({ alert }) => (
  <article className={`alert-card alert-card--${ALERT_TONES[alert.severity] ?? "medium"}`}>
    <div className="alert-card__head">
      <strong>{alert.title}</strong>
      <span>{alert.severity}</span>
    </div>
    <p>{alert.detail}</p>
    {alert.impactedZips?.length ? (
      <div className="alert-card__chips">
        {alert.impactedZips.map((zip) => (
          <span key={zip}>{zip}</span>
        ))}
      </div>
    ) : null}
  </article>
);

const KpiCard = ({ kpi }) => (
  <article className="metric-card">
    <p>{kpi.label}</p>
    <strong>{kpi.value}</strong>
    <span>{kpi.detail}</span>
  </article>
);

const HubCard = ({ hub }) => (
  <article className="hub-card">
    <div className="hub-card__top">
      <div>
        <p>{hub.type}</p>
        <h3>{hub.name}</h3>
      </div>
      <span>{hub.schedule}</span>
    </div>
    <p className="hub-card__body">{hub.purpose}</p>
    <dl className="hub-card__meta">
      <div>
        <dt>Partners</dt>
        <dd>{hub.partners.join(" + ")}</dd>
      </div>
      <div>
        <dt>Serves</dt>
        <dd>{hub.serves.join(", ")}</dd>
      </div>
      <div>
        <dt>Mode</dt>
        <dd>{hub.mode}</dd>
      </div>
    </dl>
  </article>
);

const ScoreboardRow = ({ team, leadPoints }) => (
  <article className="scoreboard-row">
    <div className="scoreboard-row__main">
      <div className="scoreboard-row__team">
        <span className="team-swatch" style={{ backgroundColor: team.color }} />
        <div>
          <strong>{team.name}</strong>
          <span>{team.status}</span>
        </div>
      </div>
      <div className="scoreboard-row__score">
        <div className="scoreboard-row__numbers">
          <span>{team.deliveries} del</span>
          <span>{team.households} hh</span>
          <span>{formatInteger(team.pounds)} lbs</span>
        </div>
        <strong>{formatInteger(team.points)}</strong>
      </div>
    </div>
    <div className="scoreboard-row__bar">
      <span
        style={{
          width: leadPoints === 0 ? "0%" : `${(team.points / leadPoints) * 100}%`,
          backgroundColor: team.color
        }}
      />
    </div>
  </article>
);

const StageMetric = ({ label, value }) => (
  <article className="stage-metric">
    <p>{label}</p>
    <strong>{value}</strong>
  </article>
);

export function App() {
  const data = DASHBOARD_DATA;
  const budgetBars = BUDGET_BARS;
  const zipRows = ZIP_ROWS;
  const initialTrackerState = resolveTrackerState({
    search: typeof window === "undefined" ? "" : window.location.search,
    zipOptions: TRACKER_ZIP_OPTIONS,
    fallbackZip: TRACKER_FALLBACK_ZIP
  });
  const [selectedZip, setSelectedZip] = useState(() => initialTrackerState.zip);
  const [displayMode, setDisplayMode] = useState(() => initialTrackerState.mode);
  const [simulation, setSimulation] = useState(() => createSimulationState(data));

  const runSimulationTick = useEffectEvent(() => {
    setSimulation((current) => advanceSimulation(current));
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      runSimulationTick();
    }, data.liveFeed.tickMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [data.liveFeed.tickMs, runSimulationTick]);

  useEffect(() => {
    const syncTrackerState = () => {
      const nextState = resolveTrackerState({
        search: window.location.search,
        zipOptions: TRACKER_ZIP_OPTIONS,
        fallbackZip: TRACKER_FALLBACK_ZIP
      });

      startTransition(() => {
        setDisplayMode(nextState.mode);
        setSelectedZip(nextState.zip);
      });
    };

    window.addEventListener("popstate", syncTrackerState);

    return () => {
      window.removeEventListener("popstate", syncTrackerState);
    };
  }, []);

  const replaceTrackerUrlState = (patch) => {
    window.history.replaceState({}, "", applySearchState(window.location.href, patch));
  };

  const applyDisplayMode = (nextMode) => {
    startTransition(() => {
      setDisplayMode(nextMode);
    });

    replaceTrackerUrlState({
      mode: nextMode
    });
  };

  const applySelectedZip = (nextZip) => {
    startTransition(() => {
      setSelectedZip(nextZip);
    });

    replaceTrackerUrlState({
      zip: nextZip
    });
  };

  const teams = sortTeamsByPoints(simulation.teams);
  const leadTeam = teams[0];
  const feedEntries = simulation.feedEntries;
  const selectedZipRow = zipRows.find((zip) => zip.zip === selectedZip) ?? zipRows[0] ?? null;
  const presentationStats = buildPresentationStats({
    teams,
    zipRows
  });
  const stagePriorityZips = zipRows.filter((zip) => zip.priority === "Critical" || zip.priority === "High").slice(0, 3);
  const stageAlerts = data.supplyAlerts.filter((alert) => alert.severity !== "Medium").slice(0, 2);
  const heroFacts = [
    {
      label: "Pilot contract",
      value: formatCompactMoney(data.dashboard.contractValue),
      detail: "60-day city pilot"
    },
    {
      label: "Public spine",
      value: `${data.dashboard.corridorMiles} mi`,
      detail: `${data.dashboard.stops} stops • fare-free`
    },
    {
      label: "Daily audience",
      value: `${formatInteger(data.dashboard.weekdayRiders)}+`,
      detail: `weekday riders • ${data.dashboard.kiosks}+ kiosks`
    },
    {
      label: "Cost per box",
      value: data.budgetTracker.costPerBoxCurrent,
      detail: `target ${data.budgetTracker.costPerBoxTarget}`
    }
  ];
  const brandStyles = {
    "--brand-blue": data.brand.colors.blue,
    "--brand-navy": data.brand.colors.navy,
    "--route-blue": data.brand.colors.route,
    "--brand-gold": data.brand.colors.gold,
    "--ink-strong": data.brand.colors.charcoal,
    "--surface-muted": data.brand.colors.gray
  };

  if (displayMode === "stage") {
    return (
      <main className="dashboard-page dashboard-page--stage" style={brandStyles}>
        <a className="skip-link" href="#stage-main">
          Skip to live presentation panels
        </a>
        <div className="stage-shell">
          <header className="stage-topbar">
            <div>
              <p>StreetCart KC • Live presentation mode</p>
              <h1>Feed your block. Rep your team.</h1>
            </div>
            <div className="stage-topbar__actions">
              <span>{data.dashboard.scoreboardWindow}</span>
              <button
                type="button"
                className="mode-button mode-button--stage"
                onClick={() => applyDisplayMode("exhibit")}
              >
                Back to exhibit
              </button>
            </div>
          </header>

          <section className="stage-hero">
            <div className="stage-hero__lead">
              <p>Current leader</p>
              <h2>{leadTeam.name}</h2>
              <strong>{formatInteger(leadTeam.points)} pts</strong>
              <span>
                {leadTeam.deliveries} deliveries • {leadTeam.households} households •{" "}
                {formatInteger(leadTeam.pounds)} lbs
              </span>
            </div>

            <div className="stage-hero__scoreboard">
              {teams.slice(0, 4).map((team) => (
                <div key={team.name} className="stage-team-row">
                  <div className="stage-team-row__name">
                    <span style={{ backgroundColor: team.color }} />
                    <div>
                      <strong>{team.name}</strong>
                      <span>{team.status}</span>
                    </div>
                  </div>
                  <div className="stage-team-row__score">
                    <span>{team.deliveries} del</span>
                    <strong>{formatInteger(team.points)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="stage-metrics-grid">
            <StageMetric label="Bracket deliveries" value={formatInteger(presentationStats.totalDeliveries)} />
            <StageMetric label="Households touched" value={formatInteger(presentationStats.totalHouseholds)} />
            <StageMetric label="Pounds moved" value={formatInteger(presentationStats.totalPounds)} />
            <StageMetric
              label="Priority-route lbs / week"
              value={formatInteger(presentationStats.priorityRoutePounds)}
            />
          </section>

          <section id="stage-main" className="stage-bottom">
            <article className="stage-panel">
              <p>Pressure ZIPs</p>
              <h3>Where the pilot has to prove itself</h3>
              <div className="stage-zip-list">
                {stagePriorityZips.map((zip) => (
                  <div key={zip.zip} className="stage-zip-row">
                    <strong>{zip.zip}</strong>
                    <span>{zip.priority}</span>
                    <em>{formatPercent(zip.foodInsecurityRate)} food insecurity</em>
                  </div>
                ))}
              </div>
              <div className="stage-alert-stack">
                {stageAlerts.map((alert) => (
                  <div key={alert.title} className={`stage-alert stage-alert--${ALERT_TONES[alert.severity] ?? "medium"}`}>
                    <strong>{alert.title}</strong>
                    <span>{alert.detail}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="stage-panel">
              <p>Latest verified wins</p>
              <h3>Live proof for the room</h3>
              <div className="stage-feed">
                {feedEntries.slice(0, 4).map((entry) => (
                  <div key={entry.id} className="stage-feed__row">
                    <span>{entry.minutesAgo} min</span>
                    <div>
                      <strong>{entry.team}</strong>
                      <p>{entry.action}</p>
                    </div>
                    <em>
                      {entry.zip} • {entry.deliveries} del
                    </em>
                  </div>
                ))}
              </div>
            </article>

            <article className="stage-cta">
              <p>Public call to action</p>
              <h3>{data.dashboard.kioskCta}</h3>
              <span>{data.renewalCase[0]}</span>
              <div className="stage-cta__proof">
                <strong>One data spine</strong>
                <p>{data.aiProcess[2]}</p>
              </div>
            </article>
          </section>
        </div>
      </main>
    );
  }

  return (
      <main className="dashboard-page" style={brandStyles}>
      <a className="skip-link" href="#mission-grid">
        Skip to dashboard panels
      </a>
      <div className="dashboard-shell">
        <header className="app-topbar">
          <div className="app-topbar__brand">
            <p>StreetCart KC</p>
            <span>Architect deliverable • public exhibit mode</span>
          </div>
          <div className="app-topbar__actions">
            <span>{data.dashboard.scoreboardWindow}</span>
            <button
              type="button"
              className="mode-button"
              onClick={() => applyDisplayMode("stage")}
            >
              Open stage mode
            </button>
            <a href="/" className="secondary-link">
              Open narrative site
            </a>
          </div>
        </header>

        <section className="hero-canvas">
          <div className="hero-canvas__copy">
            <p className="eyebrow">Science fair exhibit • civic utility with tournament energy</p>
            <div className="route-line" aria-hidden="true" />
            <h1>{data.dashboard.title}</h1>
            <p className="hero-canvas__subtitle">{data.thesis}</p>
            <p className="hero-canvas__detail">{data.dashboard.subtitle}</p>
            <div className="hero-canvas__actions">
              <button
                type="button"
                className="mode-button mode-button--light"
                onClick={() => applyDisplayMode("stage")}
              >
                Launch stage mode
              </button>
              <a href="#mission-grid" className="secondary-link secondary-link--light">
                Jump to proof
              </a>
            </div>
          </div>

          <div className="hero-canvas__brief">
            <p className="eyebrow eyebrow--dark">Judge scan</p>
            <h2>One visible corridor, partner-run reach, and renewal math that can survive scrutiny.</h2>
            <ul className="bullet-list">
              {data.renewalCase.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="hero-facts">
              {heroFacts.map((fact) => (
                <article key={fact.label}>
                  <p>{fact.label}</p>
                  <strong>{fact.value}</strong>
                  <span>{fact.detail}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="proof-band" aria-label="Problem proof">
          {data.problemProof.map((item) => (
            <article key={item.label} className="proof-card">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </section>

        <section className="operations-band">
          <SectionHeader
            label="Operating loop"
            title="Streetcar visibility in front. Partner logistics underneath."
            detail="Four hubs show how the pilot actually runs in public"
          />
          <div className="hub-grid">
            {data.hubs.map((hub) => (
              <HubCard key={hub.name} hub={hub} />
            ))}
          </div>
        </section>

        <div id="mission-grid" className="mission-grid">
          <div className="mission-grid__main">
            <section className="panel">
              <SectionHeader
                label="Tournament scoreboard"
                title={data.dashboard.scoreboardWindow}
                detail={data.dashboard.refreshCadence}
              />
              <div className="scoreboard-lead">
                <div>
                  <p>Current leader</p>
                  <h3>{leadTeam.name}</h3>
                  <span>{leadTeam.status}</span>
                </div>
                <div className="scoreboard-lead__metrics">
                  <strong>{formatInteger(leadTeam.points)}</strong>
                  <span>
                    {leadTeam.deliveries} deliveries • {formatInteger(leadTeam.pounds)} lbs
                  </span>
                </div>
              </div>
              <div className="scoreboard-list">
                {teams.map((team) => (
                  <ScoreboardRow key={team.name} team={team} leadPoints={leadTeam.points} />
                ))}
              </div>
            </section>

            <section className="panel">
              <SectionHeader
                label="ZIP pressure board"
                title="Priority neighborhoods and route pressure"
                detail="Tap a ZIP for demographics, partners, transit connectors, and closures"
              />
              <div className="zip-grid">
                {zipRows.map((zip) => (
                  <button
                    key={zip.zip}
                    type="button"
                    className={`zip-tile zip-tile--${zip.priority.toLowerCase()}${selectedZipRow?.zip === zip.zip ? " is-active" : ""}`}
                    aria-pressed={selectedZipRow?.zip === zip.zip}
                    onClick={() => {
                      applySelectedZip(zip.zip);
                    }}
                  >
                    <div className="zip-tile__head">
                      <strong>{zip.zip}</strong>
                      <span>{zip.priority}</span>
                    </div>
                    <div className="zip-tile__stats">
                      <span>{formatPercent(zip.foodInsecurityRate)} food insecure</span>
                      <span>{formatPercent(zip.noVehiclePct)} no car</span>
                    </div>
                    <div className="zip-tile__footer">
                      <span>
                        {zip.harvestRoute
                          ? `${formatInteger(zip.harvestRoute.weeklyLbs)} lbs / week`
                          : "No recurring route yet"}
                      </span>
                      {zip.alertCount > 0 ? <span>{zip.alertCount} live alerts</span> : null}
                    </div>
                  </button>
                ))}
              </div>

              {selectedZipRow ? (
                <article className="zip-detail">
                  <header className="zip-detail__header">
                    <div>
                      <p>Selected ZIP</p>
                      <h3>{selectedZipRow.zip}</h3>
                      <span>{selectedZipRow.priority} priority</span>
                    </div>
                    <div className="zip-detail__tag">
                      <strong>{formatInteger(selectedZipRow.population)}</strong>
                      <span>residents</span>
                    </div>
                  </header>

                  <div className="zip-detail__metrics">
                    <article>
                      <p>Poverty</p>
                      <strong>{formatPercent(selectedZipRow.povertyRate)}</strong>
                    </article>
                    <article>
                      <p>SNAP</p>
                      <strong>{formatPercent(selectedZipRow.snapPct)}</strong>
                    </article>
                    <article>
                      <p>Child poverty</p>
                      <strong>{formatPercent(selectedZipRow.childPovertyPct)}</strong>
                    </article>
                    <article>
                      <p>Alerts</p>
                      <strong>{selectedZipRow.alertCount}</strong>
                    </article>
                  </div>

                  <div className="zip-detail__lists">
                    <div>
                      <h4>Harvest route</h4>
                      <ul>
                        <li>
                          {selectedZipRow.harvestRoute
                            ? `${formatInteger(selectedZipRow.harvestRoute.weeklyLbs)} lbs / week • ${selectedZipRow.harvestRoute.schedule}`
                            : "No recurring route scheduled yet."}
                        </li>
                        {selectedZipRow.harvestRoute?.agencies.map((agency) => (
                          <li key={agency}>{agency}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>Pantry anchors</h4>
                      <ul>
                        {selectedZipRow.pantries.length > 0 ? (
                          selectedZipRow.pantries.map((pantry) => (
                            <li key={pantry.name}>
                              {pantry.name} • {pantry.languages.join(", ")} • {pantry.coldStorage}
                            </li>
                          ))
                        ) : (
                          <li>No pantry is located in this ZIP. Feeder partners must bridge the gap.</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4>Transit connectors</h4>
                      <ul>
                        {selectedZipRow.transitStops.length > 0 ? (
                          selectedZipRow.transitStops.map((stop) => (
                            <li key={stop.route}>
                              {stop.route} • {stop.nearPantry} • {stop.walkMin} min walk
                            </li>
                          ))
                        ) : (
                          <li>No named pantry-adjacent connector route in the challenge brief.</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4>Closure markers</h4>
                      <ul>
                        {selectedZipRow.closures.length > 0 ? (
                          selectedZipRow.closures.map((closure) => (
                            <li key={closure.name}>
                              {closure.name} • {closure.closed} • {formatInteger(closure.impactedPopulation)} residents
                            </li>
                          ))
                        ) : (
                          <li>No 2024-2025 grocery closure recorded for this ZIP.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </article>
              ) : null}
            </section>

            <section className="panel">
              <SectionHeader
                label="Budget tracker"
                title="Spend against the $500K pilot"
                detail={`Forecast ${formatCompactMoney(data.budgetTracker.forecast)}`}
              />
              <div className="budget-summary">
                <article>
                  <p>Spent to date</p>
                  <strong>{formatCompactMoney(data.budgetTracker.spent)}</strong>
                </article>
                <article>
                  <p>Forecast</p>
                  <strong>{formatCompactMoney(data.budgetTracker.forecast)}</strong>
                </article>
                <article>
                  <p>Current cost / box</p>
                  <strong>{data.budgetTracker.costPerBoxCurrent}</strong>
                </article>
              </div>
              <div className="budget-list">
                {budgetBars.map((item) => (
                  <article key={item.category} className="budget-row">
                    <div className="budget-row__head">
                      <strong>{item.category}</strong>
                      <span>
                        {formatCompactMoney(item.amount)} • {item.percent}%
                      </span>
                    </div>
                    <div className="budget-row__bar">
                      <span style={{ width: `${item.share * 100}%` }} />
                    </div>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel">
              <SectionHeader
                label="Partner network"
                title="Cold-chain coverage and neighborhood reality"
                detail={`${data.pantryNetwork.length} agencies in the pilot data`}
              />
              <div className="partner-grid">
                {data.pantryNetwork.map((pantry) => (
                  <article key={pantry.name} className="partner-card">
                    <div className="partner-card__head">
                      <strong>{pantry.name}</strong>
                      <span>{pantry.type}</span>
                    </div>
                    <p>ZIP {pantry.zip}</p>
                    <p>{pantry.languages.join(", ")}</p>
                    <p>Cold storage: {pantry.coldStorage}</p>
                    <p>ID required: {pantry.idRequired}</p>
                    <p>Capacity: {pantry.monthlyCapacity}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="mission-grid__side">
            <section className="panel">
              <SectionHeader
                label="Supply alerts"
                title="Post-curveball constraints in the same surface"
                detail="No side memo needed"
              />
              <div className="alerts-grid">
                {data.supplyAlerts.map((alert) => (
                  <AlertCard key={alert.title} alert={alert} />
                ))}
              </div>
            </section>

            <section className="panel">
              <SectionHeader
                label="Renewal metrics"
                title="What the city buys back"
                detail={`${formatPercent(70)} priority ZIP share target`}
              />
              <div className="kpi-grid">
                {data.kpis.map((kpi) => (
                  <KpiCard key={kpi.label} kpi={kpi} />
                ))}
              </div>
              <div className="kpi-summary">
                <article>
                  <p>Bracket deliveries</p>
                  <strong>{formatInteger(presentationStats.totalDeliveries)}</strong>
                </article>
                <article>
                  <p>Households touched</p>
                  <strong>{formatInteger(presentationStats.totalHouseholds)}</strong>
                </article>
                <article>
                  <p>Pounds moved</p>
                  <strong>{formatInteger(presentationStats.totalPounds)}</strong>
                </article>
              </div>
            </section>

            <section className="panel">
              <SectionHeader
                label="Live feed"
                title="Rolling verified completions"
                detail="Simulated real-time updates for demo mode"
              />
              <div className="feed-list" aria-live="polite">
                {feedEntries.map((entry) => (
                  <article key={entry.id} className="feed-row">
                    <div className="feed-row__time">{entry.minutesAgo} min ago</div>
                    <div className="feed-row__body">
                      <strong>{entry.team}</strong>
                      <p>{entry.action}</p>
                      <span>
                        {entry.zip} • {entry.hub} • {entry.deliveries} deliveries •{" "}
                        {formatInteger(entry.pounds)} lbs
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel">
              <SectionHeader
                label="Resident proof"
                title={data.residentExample.instructionTitle}
                detail={`${data.residentExample.name} • ZIP ${data.residentExample.zip}`}
              />
              <article className="resident-card">
                <p>{data.residentExample.language}</p>
                <strong>{data.residentExample.name}</strong>
                <span>{data.residentExample.instructionBody}</span>
                <em>{data.residentExample.fallback}</em>
              </article>
            </section>

            <section className="panel">
              <SectionHeader
                label="AI mastery"
                title="One reasoning spine across Oracle, Muse, and Architect"
                detail="Visible process, not hidden polish"
              />
              <ul className="bullet-list bullet-list--dense">
                {data.aiProcess.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <footer className="source-footer">
          <p>Sources</p>
          <ul>
            {data.sourceNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </footer>
      </div>
    </main>
  );
}
