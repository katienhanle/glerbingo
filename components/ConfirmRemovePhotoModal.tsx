"use client";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmRemovePhotoModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-xs rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-card)] p-5 text-center">
        <p className="text-sm font-medium">
          Are you sure you want to remove this photo?
        </p>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border-2 border-[var(--color-ink)] py-2.5 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-ink)] py-2.5 text-sm font-medium text-white"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
