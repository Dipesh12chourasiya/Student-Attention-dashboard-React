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
      try {
        setLoading(true);

        const [usersData, sessionsData] =
          await Promise.all([
            getAllUsers(),
            getAllSessions(),
          ]);

        setUsers(usersData || []);
        setSessionsMap(sessionsData || {});
      } catch (error) {
        console.error("Admin fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  // Merge user + analytics
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
      [...userSessions].sort(
        (a, b) =>
          new Date(b.dateTime) -
          new Date(a.dateTime)
      )[0];

    const lastActive = lastSession?.dateTime || null;

    return {
      ...user,
      totalSessions,
      avgAttention,
      lastActive,
      status: user.disabled
        ? "Inactive"
        : "Active",
    };
  });

  return children({
    loading,
    users: enrichedUsers,
    totalUsers: users.length,
    activeUsers: enrichedUsers.filter(
      (u) => u.status === "Active"
    ).length,
    newUsers: users.length,
  });
};

export default AdminContainer;