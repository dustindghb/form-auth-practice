'use client';

import React, { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import { db } from '../firebaseConfig';
import TextField from '@mui/material/TextField';

async function addDataToFireStore(name, email, message) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      message: message,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document:", error);
    return false;
  }
}

export default function FirebaseForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Email is now handled by Firebase
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser) {
      setIsAuthenticated(true);
      setEmail(auth.currentUser.email);  // Automatically set the email
      alert("You are logged in as " + auth.currentUser.displayName);
    } else {
      alert("You are not logged in! Please log in to submit the form.");
    }
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("No email found, please log in.");
      return;
    }
    const added = await addDataToFireStore(name, email, message);
    if (added) {
      setName("");
      setMessage("");
      alert("Data added to Firestore successfully");
    } else {
      alert("Failed to add data. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-md'>
      <div className='mb-4'>
        <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
          Name:
        </label>
        <TextField
          id="outlined-basic"
          label="Enter name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='message' className='block text-gray-700 font-bold mb-2'>
          Message:
        </label>
        <TextField
          id="standard-multiline-flexible"
          label="Enter message"
          multiline
          maxRows={16}
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className='text-center'>
        <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'>
          Submit
        </button>
      </div>
    </form>
  );
}