"use client";

import { SquareDef } from "@/lib/squares";

type Props = {
  square: SquareDef;
  photo?: string;
  onTap: () => void;
  onRemove: () => void;
};

export default function Square({ square, photo, onTap, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative aspect-square w-full">
        <button
          type="button"
          onClick={onTap}
          className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-[var(--color-ink)] text-center shadow-sm active:scale-[0.97] transition-transform"
          style={{
            backgroundColor: "var(--color-square)",
          }}
        >
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- data URL from localStorage, not an optimizable asset
            <img
              src={photo}
              alt={square.label}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center p-1.5 text-[11px] leading-tight sm:text-sm"
              style={{ color: "var(--color-ink)" }}
            >
              {square.label}
            </span>
          )}
        </button>
        {photo && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              aria-label="Remove photo"
              className="absolute left-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm text-[var(--color-ink)] shadow"
            >
              ✕
            </button>
            <span className="absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm text-[var(--color-ink)] shadow">
              ✓
            </span>
          </>
        )}
      </div>
      <p
        className={`h-4 truncate text-center text-[10px] font-medium leading-4 sm:h-5 sm:text-xs sm:leading-5 ${
          photo ? "text-[var(--color-ink)]/80" : "invisible"
        }`}
      >
        {square.shortLabel}
      </p>
    </div>
  );
}
