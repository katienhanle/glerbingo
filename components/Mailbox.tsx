"use client";

import { useState } from "react";
import { PrizeTier } from "@/lib/lines";
import { PRIZE_INFO } from "@/lib/useGameState";

type Props = {
  prizes: Record<PrizeTier, boolean>;
};

const TIER_ORDER: PrizeTier[] = ["candy1", "candy2", "sticker"];

export default function Mailbox({ prizes }: Props) {
  const [open, setOpen] = useState(false);
  const earnedCount = TIER_ORDER.filter((t) => prizes[t]).length;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Show my redeemed prizes"
        className="fixed right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-card)] text-xl shadow-md"
      >
        📬
        {earnedCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--color-card)] bg-red-500 text-[11px] font-bold text-white">
            {earnedCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-card)] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-center text-lg"
              style={{ fontFamily: "var(--font-bungee)" }}
            >
              My Prizes
            </h2>

            {earnedCount === 0 ? (
              <p className="mt-4 text-center text-sm text-[var(--color-ink)]/70">
                Complete a row or column to earn your first prize!
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {TIER_ORDER.filter((t) => prizes[t]).map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 rounded-xl border-2 border-[var(--color-ink)] bg-[var(--color-square)] p-3"
                  >
                    <span className="text-2xl">{PRIZE_INFO[t].emoji}</span>
                    <span className="text-sm font-medium">
                      {PRIZE_INFO[t].body}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 w-full rounded-full border-2 border-[var(--color-ink)] py-2.5 text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
