import { startTransition, useEffect, useEffectEvent, useState } from "react";

import trackerData from "../../data/kc-streetcar-tracker.json";
import { mergeStopGroupsWithArrivals } from "../lib/tracker.js";
import { fetchLiveStopGroups, LIVE_POLL_INTERVAL_MS } from "./live.js";

const FOOD_FILTERS = [
  { id: "all", label: "All food access" },
  { id: "pantry", label: "Pantries" },
  { id: "grocery", label: "Groceries" },
  { id: "farmers_market", label: "Farmers markets" },
  { id: "food_retailer", label: "Food retailers" }
];

const FOOD_LABELS = {
  pantry: "Pantry",
  grocery: "Grocery",
  farmers_market: "Farmers market",
  food_retailer: "Food retailer"
};

const OCCUPANCY_LABELS = {
  MANY_SEATS_AVAILABLE: "Seats available",
  FEW_SEATS_AVAILABLE: "Limited seats",
  STANDING_ROOM_ONLY: "Standing room",
  CRUSHED_STANDING_ROOM_ONLY: "Crowded"
};

const formatTime = (value) => {
  if (!value) {
    return "Waiting for feed";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
};

const formatStopLabel = (value) => value.replace(/\s+Stops?$/u, "");

const shortDirection = (value) => {
  if (value === "Northbound") {
    return "NB";
  }

  if (value === "Southbound") {
    return "SB";
  }

  return value;
};

const getStopStatus = (stopGroup) => {
  const statuses = stopGroup.directions
    .map((direction) => direction.live.arrivals[0]?.countdown)
    .filter(Boolean);

  if (statuses.length === 0) {
    return "Live ETAs loading";
  }

  return stopGroup.directions
    .map((direction) => {
      const countdown = direction.live.arrivals[0]?.countdown;
      if (!countdown) {
        return null;
      }

      return `${shortDirection(direction.label)} ${countdown}`;
    })
    .filter(Boolean)
    .join(" • ");
};

const collectUniqueRouteFood = (stopGroups) => {
  const seenIds = new Set();
  const places = [];

  stopGroups.forEach((stopGroup) => {
    stopGroup.nearbyFood.forEach((place) => {
      if (seenIds.has(place.id)) {
        return;
      }

      seenIds.add(place.id);
      places.push(place);
    });
  });

  return places;
};

const countByCategory = (places) =>
  places.reduce((counts, place) => {
    counts[place.category] = (counts[place.category] ?? 0) + 1;
    return counts;
  }, {});

const renderAlertText = (alert, index) => {
  if (typeof alert === "string") {
    return alert;
  }

  if (alert?.title && alert?.message) {
    return `${alert.title}: ${alert.message}`;
  }

  if (alert?.message) {
    return alert.message;
  }

  if (alert?.description) {
    return alert.description;
  }

  return `Service alert ${index + 1}`;
};

const StatCard = ({ label, value, tone = "default" }) => (
  <div className={`stat-card stat-card--${tone}`}>
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

const ArrivalDirectionCard = ({ direction }) => (
  <article className="arrival-direction-card">
    <header>
      <div>
        <p>{direction.label}</p>
        <h3>{direction.stopName}</h3>
      </div>
      <span>{direction.live.arrivals[0]?.countdown ?? "No ETA"}</span>
    </header>
    <ul className="arrival-list">
      {direction.live.arrivals.length > 0 ? (
        direction.live.arrivals.map((arrival, index) => (
          <li key={`${direction.code}-${arrival.vehicleId ?? index}`}>
            <div>
              <strong>{arrival.countdown}</strong>
              <span>{arrival.headsign}</span>
            </div>
            <div className="arrival-meta">
              <span>{arrival.time ?? "Live"}</span>
              {arrival.occupancyStatus ? (
                <span className={`occupancy occupancy--${arrival.occupancyStatus.toLowerCase()}`}>
                  {OCCUPANCY_LABELS[arrival.occupancyStatus] ?? "Live load"}
                </span>
              ) : null}
            </div>
          </li>
        ))
      ) : (
        <li className="arrival-list__empty">No current prediction for this direction.</li>
      )}
    </ul>
  </article>
);

const FoodPlaceCard = ({ place }) => (
  <article className="food-place-card">
    <div className="food-place-card__header">
      <span className={`category-badge category-badge--${place.category}`}>{FOOD_LABELS[place.category]}</span>
      <strong>{place.distanceMiles.toFixed(2)} mi</strong>
    </div>
    <h3>{place.name}</h3>
    <p>{place.address ?? "Address not published in the source feed."}</p>
    <small>{place.source}</small>
  </article>
);

export function App() {
  const dataset = trackerData;
  const [selectedStopId, setSelectedStopId] = useState(() => trackerData.stopGroups[0]?.id ?? "");
  const [foodFilter, setFoodFilter] = useState("all");
  const [liveEndpoints, setLiveEndpoints] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [liveState, setLiveState] = useState({ loading: true, error: "", fetchedAt: "" });

  const refreshLiveArrivals = useEffectEvent(async () => {
    try {
      const snapshot = await fetchLiveStopGroups(dataset.stopGroups);
      setAlerts(snapshot.alerts);
      setLiveEndpoints(snapshot.endpoints);
      setLiveState({
        loading: false,
        error: "",
        fetchedAt: snapshot.fetchedAt
      });
    } catch (error) {
      setLiveState((current) => ({
        ...current,
        loading: false,
        error: error instanceof Error ? error.message : "Unable to refresh live arrivals."
      }));
    }
  });

  useEffect(() => {
    setLiveState((current) => ({ ...current, loading: true, error: "" }));
    refreshLiveArrivals();

    const intervalId = window.setInterval(() => {
      refreshLiveArrivals();
    }, LIVE_POLL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [dataset]);

  const stopGroups = mergeStopGroupsWithArrivals(dataset.stopGroups, liveEndpoints);
  const selectedStop = stopGroups.find((stopGroup) => stopGroup.id === selectedStopId) ?? stopGroups[0] ?? null;
  const visibleFood =
    selectedStop?.nearbyFood.filter((place) => foodFilter === "all" || place.category === foodFilter) ?? [];
  const uniqueRouteFood = collectUniqueRouteFood(dataset.stopGroups);
  const routeFoodCounts = countByCategory(uniqueRouteFood);

  return (
    <main
      className="tracker-page"
      style={{
        "--brand-blue": dataset.brand.colors.blue,
        "--brand-navy": dataset.brand.colors.navy,
        "--route-blue": dataset.brand.colors.route
      }}
    >
      <div className="tracker-shell">
        <header className="tracker-hero">
          <div className="tracker-hero__content">
            <div className="brand-lockup">
              <img
                src="https://kcstreetcar.org/wp-content/themes/kcsc/images/favicon.png"
                alt=""
                width="36"
                height="36"
              />
              <div>
                <p>KC Streetcar</p>
                <h1>Food Access Tracker</h1>
              </div>
            </div>
            <p className="tracker-hero__subtitle">
              Real-time arrivals plus pantries, grocery stores, farmers markets, and food retailers within one mile
              of every stop on the line.
            </p>
            <div className="tracker-hero__actions">
              <a href="https://kcstreetcar.org/" target="_blank" rel="noreferrer">
                Official site
              </a>
              <a href={selectedStop?.arrivalsUrl ?? "https://arrivals.kcstreetcar.org/rmn"} target="_blank" rel="noreferrer">
                Arrival signage
              </a>
            </div>
          </div>
          <div className="tracker-hero__stats">
            <StatCard label="Stops monitored" value={stopGroups.length} />
            <StatCard label="Food access points" value={uniqueRouteFood.length} tone="accent" />
            <StatCard label="Pantries on corridor" value={routeFoodCounts.pantry ?? 0} />
            <StatCard label="Last live refresh" value={formatTime(liveState.fetchedAt)} />
          </div>
        </header>

        {alerts.length > 0 ? (
          <section className="alert-strip" aria-label="Service alerts">
            {alerts.map((alert, index) => (
              <p key={`alert-${index}`}>{renderAlertText(alert, index)}</p>
            ))}
          </section>
        ) : null}

        {liveState.error ? (
          <section className="feed-warning" aria-live="polite">
            <p>{liveState.error}</p>
          </section>
        ) : null}

        <div className="tracker-layout">
          <aside className="route-rail" aria-label="Streetcar stops">
            <div className="route-rail__header">
              <p>Route 601</p>
              <strong>North to south corridor</strong>
            </div>
            <div className="route-stop-list">
              {stopGroups.map((stopGroup) => (
                <button
                  key={stopGroup.id}
                  type="button"
                  className={`route-stop-card${selectedStop?.id === stopGroup.id ? " is-active" : ""}`}
                  onClick={() => {
                    startTransition(() => {
                      setSelectedStopId(stopGroup.id);
                    });
                  }}
                >
                  <div className="route-stop-card__head">
                    <span>{stopGroup.order + 1}</span>
                    <strong>{formatStopLabel(stopGroup.label)}</strong>
                  </div>
                  <p>{getStopStatus(stopGroup)}</p>
                  <small>{stopGroup.nearbyFood.length} food access points within 1 mile</small>
                </button>
              ))}
            </div>
          </aside>

          {selectedStop ? (
            <section className="tracker-main">
              <header className="stop-summary">
                <div>
                  <p>Selected stop</p>
                  <h2>{formatStopLabel(selectedStop.label)}</h2>
                  <span>{selectedStop.directions.map((direction) => direction.stopName).join(" • ")}</span>
                </div>
                <div className="stop-summary__badges">
                  <span>{selectedStop.nearbyFood.length} places within 1 mile</span>
                  <span>{liveState.loading ? "Refreshing live ETAs…" : `Updated ${formatTime(liveState.fetchedAt)}`}</span>
                </div>
              </header>

              <div className="summary-grid">
                {FOOD_FILTERS.slice(1).map((filter) => (
                  <StatCard
                    key={filter.id}
                    label={filter.label}
                    value={selectedStop.categoryCounts[filter.id] ?? 0}
                    tone={foodFilter === filter.id ? "accent" : "default"}
                  />
                ))}
              </div>

              <div className="content-grid">
                <section className="panel">
                  <div className="panel__header">
                    <div>
                      <p>Live arrivals</p>
                      <h3>Next streetcars</h3>
                    </div>
                    <span>{selectedStop.directions.length} live direction{selectedStop.directions.length === 1 ? "" : "s"}</span>
                  </div>
                  <div className="arrival-direction-grid">
                    {selectedStop.directions.map((direction) => (
                      <ArrivalDirectionCard key={direction.code} direction={direction} />
                    ))}
                  </div>
                </section>

                <section className="panel">
                  <div className="panel__header">
                    <div>
                      <p>Food access</p>
                      <h3>Walkable and short-hop options</h3>
                    </div>
                    <span>Within 1.0 mile of the stop</span>
                  </div>
                  <div className="filter-row" role="tablist" aria-label="Food access filters">
                    {FOOD_FILTERS.map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        className={`filter-pill${foodFilter === filter.id ? " is-active" : ""}`}
                        onClick={() => {
                          startTransition(() => {
                            setFoodFilter(filter.id);
                          });
                        }}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  <div className="food-place-grid">
                    {visibleFood.length > 0 ? (
                      visibleFood.map((place) => <FoodPlaceCard key={place.id} place={place} />)
                    ) : (
                      <div className="food-empty-state">
                        No food access points matched this filter within one mile of the stop.
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </section>
          ) : null}
        </div>

        <footer className="tracker-footer">
          <p>
            Live arrivals are sourced from the public KC Streetcar signage feed. Food access is built from OpenStreetMap
            and curated pantry records, refreshed from the corridor data snapshot in this repo.
          </p>
        </footer>
      </div>
    </main>
  );
}
