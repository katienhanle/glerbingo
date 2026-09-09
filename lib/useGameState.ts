"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { GameState, loadState, saveState } from "./storage";
import { prizesForState, PrizeTier } from "./lines";
import { fileToCompressedDataUrl } from "./image";

export const PRIZE_INFO: Record<
  PrizeTier,
  { title: string; body: string; emoji: string }
> = {
  candy1: {
    title: "You've received your first prize!",
    body: "A candy ticket. Go show Lucas and Katie to redeem your prize.",
    emoji: "🍬",
  },
  candy2: {
    title: "You've received another prize!",
    body: "A second candy ticket. Go show Lucas and Katie to redeem your prize.",
    emoji: "🍬",
  },
  sticker: {
    title: "GLERBINGO! Full card complete!",
    body: "You've won a sticker exclusive to the GLERB. Go show Lucas and Katie to redeem your prize.",
    emoji: "✨",
  },
};

export function useGameState() {
  const [state, setState] = useState<GameState | null>(null);
  const [prizeQueue, setPrizeQueue] = useState<PrizeTier[]>([]);

  useEffect(() => {
    setState(loadState());
  }, []);

  useEffect(() => {
    if (state) saveState(state);
  }, [state]);

  const filledIds = useMemo(
    () => new Set(Object.keys(state?.photos ?? {}).map(Number)),
    [state]
  );

  const prizes = useMemo(() => prizesForState(filledIds), [filledIds]);

  const addPhoto = useCallback(async (squareId: number, file: File) => {
    const dataUrl = await fileToCompressedDataUrl(file);
    setState((prev) => {
      const base = prev ?? { photos: {}, shownPrizes: {} };
      const nextPhotos = { ...base.photos, [squareId]: dataUrl };
      const nextFilled = new Set(Object.keys(nextPhotos).map(Number));
      const nextPrizes = prizesForState(nextFilled);

      const newlyUnlocked = (Object.keys(nextPrizes) as PrizeTier[]).filter(
        (tier) => nextPrizes[tier] && !base.shownPrizes[tier]
      );

      if (newlyUnlocked.length > 0) {
        setPrizeQueue((prev) => [...prev, ...newlyUnlocked]);
      }

      return {
        photos: nextPhotos,
        shownPrizes: newlyUnlocked.length
          ? {
              ...base.shownPrizes,
              ...Object.fromEntries(newlyUnlocked.map((t) => [t, true])),
            }
          : base.shownPrizes,
      };
    });
  }, []);

  const dismissPrizePopup = useCallback(
    () => setPrizeQueue((prev) => prev.slice(1)),
    []
  );

  return {
    ready: state !== null,
    photos: state?.photos ?? {},
    prizes,
    addPhoto,
    activePrizePopup: prizeQueue[0] ?? null,
    dismissPrizePopup,
  };
}
