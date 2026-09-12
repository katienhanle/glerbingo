"use client";

import { useState } from "react";
import { SQUARES } from "@/lib/squares";
import { useGameState } from "@/lib/useGameState";
import Square from "./Square";
import PhotoCaptureModal from "./PhotoCaptureModal";
import PrizePopup from "./PrizePopup";
import Mailbox from "./Mailbox";

export default function BingoCard() {
  const {
    ready,
    photos,
    prizes,
    addPhoto,
    removePhoto,
    activePrizePopup,
    dismissPrizePopup,
  } = useGameState();
  const [activeSquareId, setActiveSquareId] = useState<number | null>(null);

  const activeSquare = SQUARES.find((s) => s.id === activeSquareId) ?? null;

  if (!ready) return null;

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pb-8 pt-20">
      <Mailbox prizes={prizes} />

      <h1
        className="text-center text-6xl sm:text-7xl"
        style={{ fontFamily: "var(--font-bungee)", color: "var(--color-ink)" }}
      >
        GLERBINGO
      </h1>

      <div className="mt-6 w-full max-w-lg rounded-3xl border-2 border-[var(--color-ink)] bg-[var(--color-card)] p-5 shadow-lg">
        <p className="text-center text-sm italic sm:text-base">
          MUST TAKE PHOTO FOR EACH SQUARE AS EVIDENCE!
        </p>
        <p className="mt-1.5 text-center text-xs sm:text-sm">
          1 row = candy &nbsp; 2 rows = another candy &nbsp; whole card = glerb sticker
        </p>

        <div className="mt-5 grid grid-cols-4 gap-2.5 sm:gap-3.5">
          {SQUARES.map((square) => (
            <Square
              key={square.id}
              square={square}
              photo={photos[square.id]}
              onTap={() => setActiveSquareId(square.id)}
            />
          ))}
        </div>
      </div>

      {activeSquare && (
        <PhotoCaptureModal
          square={activeSquare}
          existingPhoto={photos[activeSquare.id]}
          onSave={(file) => addPhoto(activeSquare.id, file)}
          onRemove={() => removePhoto(activeSquare.id)}
          onClose={() => setActiveSquareId(null)}
        />
      )}

      {activePrizePopup && (
        <PrizePopup tier={activePrizePopup} onClose={dismissPrizePopup} />
      )}
    </main>
  );
}
