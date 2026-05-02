import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";
import { subscribeToSessions } from "../services/sessionService";

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribers = [];

    const fetchStudents = async () => {
      try {
        const users = await getAllUsers();

        if (!users.length) {
          setStudents([]);
          setLoading(false);
          return;
        }

        const studentsData = [];

        users.forEach((user) => {
          const unsubscribe = subscribeToSessions(user.uid, (sessions) => {

            const avg =
              sessions.length > 0
                ? Math.round(
                    sessions.reduce((sum, s) => sum + (s.attentionScore || 0), 0) /
                      sessions.length
                  )
                : 0;

            const studentObj = {
              ...user,
              sessionsCount: sessions.length,
              avgAttention: avg,
            };

            setStudents((prev) => {
              const filtered = prev.filter((s) => s.uid !== user.uid);
              return [...filtered, studentObj];
            });
          });

          unsubscribers.push(unsubscribe);
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchStudents();

    return () => {
      unsubscribers.forEach((unsub) => unsub && unsub());
    };
  }, []);

  return { students, loading };
};