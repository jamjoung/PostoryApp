import React from 'react'
import locations from './locations.jsx'
import { db } from '.././firebaseServices.tsx'
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default async function AddPin(inputMessage, lat, lng, tagInput) {
    // locations.push({name: `Location ${locationNum}`, message: inputMessage, location: {lat: latitude , lng: longitude}})
    
    try {
        const docRef = await addDoc(collection(db, "pins"), {
          latitude: lat,
          longitude: lng,
          message: inputMessage,
          tag: tagInput
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}