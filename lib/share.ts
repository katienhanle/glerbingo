// Uses the Web Share API to hand a photo to iOS/Android's native share sheet,
// where "Save Image" writes it straight to the camera roll. Returns false when
// the browser has no file-sharing support so the caller can fall back to
// telling the user to long-press the photo instead.
export async function shareImageFile(
  file: File,
  title?: string
): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.share) return false;

  const shareData = { files: [file], title };
  if (navigator.canShare && !navigator.canShare(shareData)) return false;

  try {
    await navigator.share(shareData);
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return true;
    throw err;
  }
  return true;
}
