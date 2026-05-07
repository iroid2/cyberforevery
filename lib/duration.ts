export function formatClock(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const secs = safeSeconds % 60;

  return [hours, minutes, secs]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

export function formatMinuteClock(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;

  return [minutes, secs]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

export function formatDurationLabel(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const totalMinutes = Math.floor(safeSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}hr ${minutes}min${minutes === 1 ? "" : "s"}`;
  }

  if (totalMinutes > 0) {
    return `${totalMinutes} minute${totalMinutes === 1 ? "" : "s"}`;
  }

  return `${safeSeconds} second${safeSeconds === 1 ? "" : "s"}`;
}
