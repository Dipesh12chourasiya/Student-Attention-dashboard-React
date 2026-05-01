import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { ref, set } from "firebase/database";
import { auth, db } from "./firebase";

//  LOGIN USER
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user; // contains uid, email
  } catch (error) {
    throw new Error(error.message);
  }
};

//  REGISTER USER (same as Android logic)
export const registerUser = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Save to Realtime DB (same structure as Android)
    await set(ref(db, `Users/${user.uid}`), {
      uid: user.uid,
      username: username,
      email: user.email,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//  LOGOUT
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};