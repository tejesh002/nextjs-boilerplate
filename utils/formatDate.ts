export function formatDate(date: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(typeof date === "string" || typeof date === "number" ? new Date(date) : date);
}


