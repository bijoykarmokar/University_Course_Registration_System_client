import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  // ✅ Register user with Firebase
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Sign in with Firebase
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Google login
  const googleWithSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Update user profile
  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  // ✅ Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ Listen to Firebase auth state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.email) {
        try {
          // fetch user info (with role) from backend
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${firebaseUser.email}`
          );

          setUser({
            ...firebaseUser,
            role: res.data.role, // 👈 attach role from backend
            _id: res.data._id,
          });
        } catch (err) {
          console.error("⚠️ Failed to fetch user role:", err.message);
          setUser(firebaseUser); // fallback without role
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  // ✅ Values available for whole app
  const authInfo = {
    createUser,
    signIn,
    logOut,
    user,
    loading,
    googleWithSignIn,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

