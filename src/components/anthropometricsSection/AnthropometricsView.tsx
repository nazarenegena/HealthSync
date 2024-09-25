"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthenticationContext";
import { db } from "@/config/firebase.config";
import { doc, setDoc } from "firebase/firestore";

interface IUserProfile {
  age: string;
  height: string;
  weight: string;
}

const AnthropometricsView = () => {
  const { user } = useAuth();
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setUserProfiles([...userProfiles, { age, height, weight }]);

    const docRef = doc(db, "users", user.uid);

    try {
      setDoc(
        docRef,
        { isNewUser: false, age: age, height: height, weight: weight },
        { merge: true }
      );

      console.log("Updated isNewUser to false for UID:", user.uid);
    } catch (error) {
      console.error("Error updating user document:", error);
    }

    setAge("");
    setHeight("");
    setWeight("");
  };

  console.log(userProfiles, "the profile");
  return (
    <div>
      <h2>AnthropometricsView</h2>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Handle form submission */}
        <label>Age</label>
        <input
          type="text"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Height</label>
        <input
          type="text"
          placeholder="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <label>Weight</label>
        <input
          type="text"
          placeholder="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button type="submit">Add</button> {/* Submits the form */}
      </form>
    </div>
  );
};

export default AnthropometricsView;
