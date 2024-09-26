'use client'
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebaseConfig';  // Adjust this path if necessary

const GoogleAuth = ({ onAuthentication }) => {
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    
    try {
      // Force re-authentication
      await auth.signOut();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, provider);
      
      if (result.user.email.endsWith('@scu.edu')) {
        onAuthentication(result.user);
      } else {
        await auth.signOut();
        throw new Error('Please use an @scu.edu email address to sign in.');
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError(error.message);
      onAuthentication(null);
    }
  };

  return (
    <div>
      <button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign in with Google
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default GoogleAuth;