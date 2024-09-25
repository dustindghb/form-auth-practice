'use client'

import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

import React, { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from './firebaseConfig'; // Make sure this path is correct

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [authAttempted, setAuthAttempted] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const signIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in:", user);
        setUser(user);
      } catch (error) {
        console.error("Error signing in:", error.message);
      } finally {
        setAuthAttempted(true);
      }
    };

    // Delay the sign-in attempt by 2 seconds
    const timer = setTimeout(() => {
      signIn();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleManualSignIn = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
      });
  };

  if (user) {
    return <div>Welcome, {user.displayName}!</div>;
  }

  if (!authAttempted) {
    return <div>Preparing to sign in...</div>;
  }

  return (
    <div>
      <p>Sign-in was unsuccessful or cancelled.</p>
      <button onClick={handleManualSignIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleAuth;