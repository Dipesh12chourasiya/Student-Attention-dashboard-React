import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { subscribeToSessions } from "../services/sessionService";

export const useSessions = () => {
  const { user } = useAuth();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToSessions(user.uid, (data) => {
      setSessions(data);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return { sessions, loading };
};