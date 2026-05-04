import { useEffect, useState } from "react";
import {
  getAllUsers,
  getAllSessions,
} from "../../services/adminService";

const AdminContainer = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [sessionsMap, setSessionsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [usersData, sessionsData] = await Promise.all([
        getAllUsers(),
        getAllSessions(),
      ]);

      setUsers(usersData);
      setSessionsMap(sessionsData || {});
      setLoading(false);
    };

    fetchData();
  }, []);

  //  Merge user + analytics
  const enrichedUsers = users.map((user) => {
    const userSessions =
      sessionsMap[user.uid]
        ? Object.values(sessionsMap[user.uid])
        : [];

    const totalSessions = userSessions.length;

    const avgAttention =
      totalSessions === 0
        ? 0
        : Math.round(
            userSessions.reduce(
              (sum, s) => sum + (s.attentionPercent || 0),
              0
            ) / totalSessions
          );

    const lastSession =
      userSessions.sort(
        (a, b) =>
          new Date(b.dateTime) - new Date(a.dateTime)
      )[0];

    const lastActive = lastSession?.dateTime || null;

    return {
      ...user,
      totalSessions,
      avgAttention,
      lastActive,
      status: user.disabled ? "Inactive" : "Active",
    };
  });

  //  Stats
  const totalUsers = users.length;

  const activeUsers = enrichedUsers.filter(
    (u) => u.status === "Active"
  ).length;

  const newUsers = users.filter((u) => {
    // simple logic: created recently (optional improve later)
    return true;
  }).length;

  return children({
    loading,
    users: enrichedUsers,
    totalUsers,
    activeUsers,
    newUsers,
  });
};

export default AdminContainer;