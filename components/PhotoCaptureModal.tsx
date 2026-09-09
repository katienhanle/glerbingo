"use client";

import { useRef, useState } from "react";
import { SquareDef } from "@/lib/squares";

type Props = {
  square: SquareDef;
  existingPhoto?: string;
  onSave: (file: File) => Promise<void>;
  onClose: () => void;
};

export default function PhotoCaptureModal({
  square,
  existingPhoto,
  onSave,
  onClose,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0];
    if (!chosen) return;
    setFile(chosen);
    setPreview(URL.createObjectURL(chosen));
  };

  const handleSave = async () => {
    if (!file) return;
    setSaving(true);
    await onSave(file);
    setSaving(false);
    onClose();
  };

  const displayPhoto = preview ?? existingPhoto;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-card)] p-5">
        <h2 className="text-center text-base font-bold leading-snug">
          {square.label}
        </h2>

        <div className="mt-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[var(--color-ink)]/40 bg-black/5">
          {displayPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displayPhoto}
              alt="Evidence preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="px-6 text-center text-sm text-[var(--color-ink)]/60">
              Take or choose a photo as evidence
            </span>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-square)] py-2.5 text-sm font-medium"
          >
            {displayPhoto ? "Retake photo" : "Take photo"}
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border-2 border-[var(--color-ink)] py-2.5 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!file || saving}
              onClick={handleSave}
              className="flex-1 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-ink)] py-2.5 text-sm font-medium text-white disabled:opacity-40"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
