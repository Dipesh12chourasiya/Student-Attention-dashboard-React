import { getDateString, parseCustomDate } from "./dateUtils";

//  VALID SESSIONS (safe guard)
const getValidSessions = (sessions) => {
  return (sessions || []).filter(
    (s) => s && s.dateTime && parseCustomDate(s.dateTime)
  );
};

// STUDY STREAK (FIXED)
export const getStreak = (sessions) => {
  const valid = getValidSessions(sessions);

  if (!valid.length) return 0;

  const uniqueDates = [
    ...new Set(valid.map((s) => getDateString(s.dateTime))),
  ]
    .filter(Boolean)
    .sort(); // YYYY-MM-DD safe sort

  let streak = 1;

  for (let i = uniqueDates.length - 1; i > 0; i--) {
    const current = new Date(uniqueDates[i]);
    const prev = new Date(uniqueDates[i - 1]);

    const diff =
      (current - prev) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

//  BEST FOCUS TIME (FIXED)
export const getBestFocusTime = (sessions) => {
  const valid = getValidSessions(sessions);

  if (!valid.length) return null;

  const buckets = {
    morning: [],
    afternoon: [],
    evening: [],
    night: [],
  };

  valid.forEach((s) => {
    const date = parseCustomDate(s.dateTime);
    if (!date) return;

    const hour = date.getHours();
    const score = s.attentionPercent || 0;

    if (hour >= 6 && hour < 12) buckets.morning.push(score);
    else if (hour >= 12 && hour < 17) buckets.afternoon.push(score);
    else if (hour >= 17 && hour < 21) buckets.evening.push(score);
    else buckets.night.push(score);
  });

  const avg = (arr) =>
    arr.length
      ? arr.reduce((a, b) => a + b, 0) / arr.length
      : 0;

  const result = Object.entries(buckets).map(
    ([time, values]) => ({
      time,
      avg: avg(values),
    })
  );

  return result.sort((a, b) => b.avg - a.avg)[0];
};

//  DAILY TREND (FIXED + SORTED)
export const getDailyTrend = (sessions) => {
  const valid = getValidSessions(sessions);
  const map = {};

  valid.forEach((s) => {
    const date = getDateString(s.dateTime);
    if (!date) return;

    if (!map[date]) map[date] = [];

    map[date].push(s.attentionPercent || 0);
  });

  return Object.keys(map)
    .sort() //  IMPORTANT for line chart
    .map((date) => {
      const scores = map[date];

      const avg =
        scores.reduce((a, b) => a + b, 0) / scores.length;

      return {
        date,
        attention: Math.round(avg),
      };
    });
};

// AVERAGE ATTENTION
export const getAverageAttention = (sessions) => {
  const valid = getValidSessions(sessions);

  if (!valid.length) return 0;

  const total = valid.reduce(
    (sum, s) => sum + (s.attentionPercent || 0),
    0
  );

  return Math.round(total / valid.length);
};

//  SUBJECT STATS (FIXED)
export const getSubjectStats = (sessions) => {
  const map = {};

  sessions.forEach((s) => {
    if (!s.title) return;

    //  Normalize subject
    let subject = s.title.toLowerCase().trim();

    if (subject.includes("dsa")) subject = "DSA";
    else if (subject.includes("aptitude")) subject = "Aptitude";
    else if (subject.includes("dbms")) subject = "DBMS";
    else if (subject.includes("os")) subject = "OS";
    else if (subject.includes("java")) subject = "Java";
    else if (subject.includes("english")) subject = "English";
    else if (subject.includes("japanese")) subject = "Japanese";
    else subject = "Other";

    if (!map[subject]) map[subject] = [];

    map[subject].push(s.attentionPercent || 0);
  });

  return Object.keys(map).map((subject) => {
    const scores = map[subject];

    const avg =
      scores.reduce((a, b) => a + b, 0) / scores.length;

    return {
      subject,
      avg: Math.round(avg),
    };
  });
};

//  WEAKEST SUBJECT
export const getWeakestSubject = (sessions) => {
  const stats = getSubjectStats(sessions);

  if (!stats.length) return null;

  return stats.sort((a, b) => a.avg - b.avg)[0];
};