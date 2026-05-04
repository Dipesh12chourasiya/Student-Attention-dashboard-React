import { ref, get, remove, update } from "firebase/database";
import { db } from "./firebase";

//  Get all users
export const getAllUsers = async () => {
  const snapshot = await get(ref(db, "Users"));

  if (!snapshot.exists()) return [];

  const usersObj = snapshot.val();

  return Object.values(usersObj);
};

//  Get all sessions
export const getAllSessions = async () => {
  const snapshot = await get(ref(db, "AllSessions"));

  if (!snapshot.exists()) return {};

  return snapshot.val(); // { userId: { sessionId: {} } }
};

//  Delete user
export const deleteUser = async (uid) => {
  await remove(ref(db, `Users/${uid}`));
};

//  Disable user
export const disableUser = async (uid) => {
  await update(ref(db, `Users/${uid}`), {
    disabled: true,
  });
};