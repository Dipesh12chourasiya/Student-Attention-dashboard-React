import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

import { auth, db } from "../services/firebase";
import { logoutUser } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);          // firebase auth user
  const [userData, setUserData] = useState(null);  // db user (username, email)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setError(null);

      try {
        if (firebaseUser) {
          setUser(firebaseUser);

          //  fetch user data from DB
          const snapshot = await get(
            ref(db, `Users/${firebaseUser.uid}`)
          );

          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            setUserData(null);
          }
        } else {
          setUser(null);
          setUserData(null);
        }
      } catch (err) {
        console.error("Auth error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  //  Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setUserData(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        error,
        logout: handleLogout,
        isAuthenticated: !!user, //  useful flag
      }}
    >
      {/*  Prevent UI flicker */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

//  Safe hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};