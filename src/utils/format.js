export const formatDuration = (seconds) => {
  const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
  const minutes = Math.floor(safeSeconds / 60);
  const rest = safeSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
};

export const makeRecordDate = () => {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('.');
};
