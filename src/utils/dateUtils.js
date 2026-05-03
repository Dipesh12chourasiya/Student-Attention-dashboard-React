

//  Convert → YYYY-MM-DD
export const getDateString = (dateInput) => {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return "";

  //  LOCAL date (no timezone bug)
  return date.toLocaleDateString("en-CA");
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

export const parseCustomDate = (dateStr) => {
  if (!dateStr) return null;

  try {
    const [datePart, timePart] = dateStr.split(", ");

    const [day, month, year] = datePart.split(" ");
    const time = timePart.toUpperCase();

    const formatted = `${day} ${month} ${year} ${time}`;
    const parsed = new Date(formatted);

    return isNaN(parsed.getTime()) ? null : parsed;
  } catch {
    return null;
  }
};