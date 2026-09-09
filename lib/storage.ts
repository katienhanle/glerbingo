import { PrizeTier } from "./lines";

export type GameState = {
  photos: Record<number, string>; // squareId -> data URL
  shownPrizes: Partial<Record<PrizeTier, boolean>>;
};

const STORAGE_KEY = "glerbingo-state-v1";

export function loadState(): GameState {
  if (typeof window === "undefined") {
    return { photos: {}, shownPrizes: {} };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { photos: {}, shownPrizes: {} };
    const parsed = JSON.parse(raw);
    return {
      photos: parsed.photos ?? {},
      shownPrizes: parsed.shownPrizes ?? {},
    };
  } catch {
    return { photos: {}, shownPrizes: {} };
  }
}

export function saveState(state: GameState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Could not save GLERBINGO progress", err);
  }
}
