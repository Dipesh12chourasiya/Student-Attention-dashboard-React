import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { subscribeToSessions } from "../services/sessionService";

export const useSessions = (userId) => {
  const { user } = useAuth();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // decide which UID to use
    const uid = userId || user?.uid;

    if (!uid) return;

    setLoading(true);

    const unsubscribe = subscribeToSessions(uid, (data) => {
      setSessions(data || []);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId, user]);

  return { sessions, loading };
};