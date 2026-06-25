export function formatDurationMinutes(durationMinutes) {
  const minutesValue = Number(durationMinutes);

  if (!Number.isFinite(minutesValue) || minutesValue <= 0) {
    return null;
  }

  const hours = Math.floor(minutesValue / 60);
  const minutes = minutesValue % 60;

  if (hours && minutes) {
    return `${hours}시간 ${minutes}분`;
  }

  if (hours) {
    return `${hours}시간`;
  }

  return `${minutes}분`;
}
