import React from 'react';
import dynamic from 'next/dynamic'

const FirebaseForm = dynamic(() => import('./FirebaseForm'), { ssr: false })
const GoogleAuth = dynamic(() => import('./GoogleAuth'), { ssr: false })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <GoogleAuth />
      <h1 className="text-5xl font-bold m-10">
        Add Data to Firestore Database
      </h1>
      <FirebaseForm />
    </main>
  );
}