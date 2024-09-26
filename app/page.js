
'use client'
import { useState } from 'react';
import dynamic from 'next/dynamic';

const GoogleAuth = dynamic(() => import('./components/GoogleAuth'), { ssr: false });
const FirebaseForm = dynamic(() => import('./components/FirebaseForm'), { ssr: false });

function LandingPage({ onAuthentication }) {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-10">Welcome to Our App</h1>
      <p className="text-xl mb-10">Please sign in with your SCU email to continue</p>
      <GoogleAuth onAuthentication={onAuthentication} />
    </div>
  );
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleAuthentication = (authenticatedUser) => {
    if (authenticatedUser.email.endsWith('@scu.edu')) {
      setUser(authenticatedUser);
      setError(null);
    } else {
      setUser(null);
      setError('Please use an @scu.edu email address to sign in.');
    }
  };

  const handleSignOut = async () => {
    const { getAuth } = await import('firebase/auth');
    const { app } = await import('./firebaseConfig');
    const auth = getAuth(app);
    await auth.signOut();
    setUser(null);
    setError(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {!user ? (
        <>
          <LandingPage onAuthentication={handleAuthentication} />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </>
      ) : (
        <>
          <h1 className="text-5xl font-bold m-10">Add Data to Firestore Database</h1>
          <FirebaseForm />
        </>
      )}
    </main>
  );
}