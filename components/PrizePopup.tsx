"use client";

import { PrizeTier } from "@/lib/lines";
import { PRIZE_INFO } from "@/lib/useGameState";

type Props = {
  tier: PrizeTier;
  onClose: () => void;
};

export default function PrizePopup({ tier, onClose }: Props) {
  const info = PRIZE_INFO[tier];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-sm rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-card)] p-6 text-center">
        <div className="text-5xl">{info.emoji}</div>
        <h2
          className="mt-3 text-xl leading-snug"
          style={{ fontFamily: "var(--font-bungee)" }}
        >
          {info.title}
        </h2>
        <p className="mt-3 text-sm">{info.body}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-ink)] py-2.5 text-sm font-medium text-white"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
