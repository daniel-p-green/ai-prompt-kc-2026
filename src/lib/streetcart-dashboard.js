import { resolveTrackerState } from "./dashboard-url-state.js";

const PRIORITY_RANK = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Lower: 3
};

const ACTIVE_ALERT_LEVELS = new Set(["High", "Critical", "Urgent"]);

export const sortTeamsByPoints = (teams) =>
  [...teams].toSorted((left, right) => {
    if (right.points !== left.points) {
      return right.points - left.points;
    }

    return right.verified - left.verified;
  });

export const buildBudgetBars = (budget) => {
  const total = budget.reduce((sum, item) => sum + item.amount, 0);

  return budget.map((item) => ({
    ...item,
    share: total === 0 ? 0 : item.amount / total
  }));
};

export const buildZipHeatRows = (data) => {
  const harvestByZip = new Map((data.harvestRoutes ?? []).map((route) => [route.zip, route]));
  const pantriesByZip = new Map();
  const transitByZip = new Map();
  const closuresByZip = new Map();

  (data.pantryNetwork ?? []).forEach((pantry) => {
    const current = pantriesByZip.get(pantry.zip) ?? [];
    current.push(pantry);
    pantriesByZip.set(pantry.zip, current);
  });

  (data.transitStops ?? []).forEach((stop) => {
    const current = transitByZip.get(stop.zip) ?? [];
    current.push(stop);
    transitByZip.set(stop.zip, current);
  });

  (data.storeClosures ?? []).forEach((closure) => {
    const current = closuresByZip.get(closure.zip) ?? [];
    current.push(closure);
    closuresByZip.set(closure.zip, current);
  });

  return (data.zipDemographics ?? []).map((zip) => {
    const impactedByAlert = (data.supplyAlerts ?? []).filter(
      (alert) =>
        ACTIVE_ALERT_LEVELS.has(alert.severity) &&
        Array.isArray(alert.impactedZips) &&
        alert.impactedZips.includes(zip.zip)
    );

    return {
      ...zip,
      harvestRoute: harvestByZip.get(zip.zip) ?? null,
      pantries: pantriesByZip.get(zip.zip) ?? [],
      transitStops: transitByZip.get(zip.zip) ?? [],
      closures: closuresByZip.get(zip.zip) ?? [],
      alertCount: impactedByAlert.length
    };
  }).toSorted((left, right) => {
    const leftRank = PRIORITY_RANK[left.priority] ?? Number.MAX_SAFE_INTEGER;
    const rightRank = PRIORITY_RANK[right.priority] ?? Number.MAX_SAFE_INTEGER;

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }

    if (right.foodInsecurityRate !== left.foodInsecurityRate) {
      return right.foodInsecurityRate - left.foodInsecurityRate;
    }

    return right.population - left.population;
  });
};

export const createSimulationState = (data) => ({
  teams: sortTeamsByPoints(
    (data.teams ?? []).map((team) => ({
      ...team
    }))
  ),
  feedEntries: (data.liveFeed?.initialEntries ?? []).map((entry) => ({
    ...entry
  })),
  queuedEvents: (data.liveFeed?.queuedEvents ?? []).map((entry) => ({
    ...entry
  })),
  step: 0
});

export const resolveDashboardMode = (search = "") => {
  return resolveTrackerState({ search }).mode;
};

export const buildPresentationStats = ({ teams, zipRows }) => ({
  totalDeliveries: teams.reduce((sum, team) => sum + team.deliveries, 0),
  totalHouseholds: teams.reduce((sum, team) => sum + team.households, 0),
  totalPounds: teams.reduce((sum, team) => sum + team.pounds, 0),
  priorityRoutePounds: zipRows
    .filter((zip) => zip.priority === "Critical" || zip.priority === "High")
    .reduce((sum, zip) => sum + (zip.harvestRoute?.weeklyLbs ?? 0), 0),
  priorityZips: zipRows
    .filter((zip) => zip.priority === "Critical" || zip.priority === "High")
    .map((zip) => zip.zip)
});

export const advanceSimulation = (state) => {
  if (!state.queuedEvents.length) {
    return state;
  }

  const event = state.queuedEvents[state.step % state.queuedEvents.length];
  const agedFeed = state.feedEntries.map((entry) => ({
    ...entry,
    minutesAgo: entry.minutesAgo + 6
  }));
  const nextFeedEntry = {
    ...event,
    id: `${event.id}-${state.step + 1}`,
    minutesAgo: 0
  };

  return {
    ...state,
    teams: sortTeamsByPoints(
      state.teams.map((team) =>
        team.name === event.team
          ? {
              ...team,
              points: team.points + event.points,
              verified: team.verified + event.deliveries,
              deliveries: team.deliveries + event.deliveries,
              households: team.households + event.households,
              pounds: team.pounds + event.pounds
            }
          : team
      )
    ),
    feedEntries: [nextFeedEntry, ...agedFeed].slice(0, 8),
    step: state.step + 1
  };
};
