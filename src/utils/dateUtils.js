//  Parse your custom date format safely
export const parseCustomDate = (dateStr) => {
  if (!dateStr) return null;

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;

  return date;
};

//  Convert → YYYY-MM-DD
export const getDateString = (dateStr) => {
  const date = parseCustomDate(dateStr);
  if (!date) return "";

  return date.toISOString().split("T")[0];
};

//  Format time
export const formatTime = (dateStr) => {
  const date = parseCustomDate(dateStr);
  if (!date) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

//  Format date
export const formatDate = (dateStr) => {
  const date = parseCustomDate(dateStr);
  if (!date) return "";

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};