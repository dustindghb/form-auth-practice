'use client'

import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';
import TextField from '@mui/material/TextField';

async function addDataToFireStore(name, email, message) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      message: message,
      timestamp: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  }  catch (error) {
    console.error("Error adding document", error);
    return false;
  }
}

export default function FirebaseForm() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const added = await addDataToFireStore(name, email, message);
    if (added) {
      setName("");
      setEmail("");
      setMessage("");
      alert("Data added to firestore db")
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
        <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
          Email:
        </label>
        <TextField
          id="outlined-basic"
          label="Enter email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='message' className='block text-gray-700 font-bold mb-2'>
          Message:
        </label>
        <TextField
          id="standard-multiline-flexible"
          label="Enter answer"
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