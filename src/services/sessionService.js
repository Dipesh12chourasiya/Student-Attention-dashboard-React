import { ref, onValue, off, remove } from "firebase/database";
import { db } from "./firebase";

//  Get all sessions (realtime)
export const subscribeToSessions = (userId, callback) => {
  if (!userId) return;

  const sessionsRef = ref(db, `AllSessions/${userId}`);

  const unsubscribe = onValue(sessionsRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      callback([]);
      return;
    }

    // convert object → array
    const sessions = Object.values(data);

    callback(sessions);
  });

  // cleanup
  return () => off(sessionsRef);
};

//  Delete single session
export const deleteSession = async (userId, sessionId) => {
  if (!userId || !sessionId) return;

  const sessionRef = ref(db, `AllSessions/${userId}/${sessionId}`);
  await remove(sessionRef);
};

//  Delete all sessions
export const deleteAllSessions = async (userId) => {
  if (!userId) return;

  const sessionsRef = ref(db, `AllSessions/${userId}`);
  await remove(sessionsRef);
};