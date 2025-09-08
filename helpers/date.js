export function toKyivTime(d, options = {}) {
  if (!d) return "";

  const date = typeof d === "string" ? new Date(d) : d;

  return new Intl.DateTimeFormat("uk-Ua", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    ...options,
  }).format(date);
}

/**
 * Повертає тільки дату (дд.мм.рррр)
 */
export function formatOnlyDate(date) {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("uk-Ua", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/**
 * Повертає тільки час (год:хв)
 */
export function formatOnlyTime(date) {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}
