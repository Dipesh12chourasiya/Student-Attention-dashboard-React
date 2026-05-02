import { ref, get, onValue } from "firebase/database";
import { db } from "./firebase";

//  Get current user profile
export const getUserProfile = async (userId) => {
  if (!userId) return null;

  const userRef = ref(db, `Users/${userId}`);

  try {
    const snapshot = await get(userRef);
    return snapshot.val();
  } catch (error) {
    throw new Error(error.message);
  }
};

//  Realtime user profile (optional)
export const subscribeToUserProfile = (userId, callback) => {
  if (!userId) return;

  const userRef = ref(db, `Users/${userId}`);

  onValue(userRef, (snapshot) => {
    callback(snapshot.val());
  });
};

// Get all users (ADMIN PANEL)
export const getAllUsers = async () => {
  const usersRef = ref(db, "Users");

  try {
    const snapshot = await get(usersRef);
    const data = snapshot.val();

    if (!data) return [];

    return Object.values(data);
  } catch (error) {
    throw new Error(error.message);
  }
};