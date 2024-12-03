"use client";

import React, { useState } from "react";
import UnitSwitch from "./UnitSwitch";
import { Input } from "@/components/ui/input";
import { IoScaleOutline } from "react-icons/io5";
import { GiBodyHeight } from "react-icons/gi";
import { useAuth } from "@/contexts/AuthenticationContext";
import { db } from "@/config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { IUserProfile } from "../anthropometricsSection/AnthropometricsView";
import { Button } from "../ui/button";

type Props = {};

export default function UpdateMeasurements(props: Props) {
  const { user } = useAuth();
  const [weight, setWeight] = useState<number>(0);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  const [height, setHeight] = useState<number>(0);
  const [heightUnit, setHeightUnit] = useState<"cm" | "feet">("cm");

  // Handle the weight unit toggle
  const handleWeightToggle = (checked: boolean) => {
    if (checked) {
      // Convert kg to lbs
      setWeight(weight * 2.20462);
      setWeightUnit("lbs");
    } else {
      // Convert lbs to kg
      setWeight(weight / 2.20462);
      setWeightUnit("kg");
    }
  };

  // Handle height unit toggle
  const handleHeightToggle = (checked: boolean) => {
    console.log(checked, "c");

    if (checked) {
      // Convert cm to feet
      setHeight(height / 30.48);
      setHeightUnit("feet");
    } else {
      // Convert feet to cm
      setHeight(height * 30.48);
      setHeightUnit("cm");
    }
  };

  const handleUpdateProfile = async () => {
    if (!user?.uid) return;

    const profileRef = doc(db, "users", user.uid);
    const updatedData: IUserProfile = {
      weight: { value: weight, unit: weightUnit },
      height: { value: height, unit: heightUnit },
    };

    try {
      await setDoc(profileRef, updatedData, { merge: true });
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setWeight(0);
    setHeight(0);
  };

  return (
    <div className="w-[45rem] mt-10">
      <p className="font-bold text-2xl mt-5 mb-3">Unit</p>
      <div className="flex items-center py-5">
        <IoScaleOutline size={28} color="#a462af" />
        <Input
          type="text"
          placeholder="Weight"
          className="ml-7"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setWeight(isNaN(value) ? 0 : value); // Prevent NaN issues
          }}
        />
        <UnitSwitch
          label1="kg"
          label2="lbs"
          checked={weightUnit === "lbs"}
          onToggleChange={handleWeightToggle}
        />
      </div>
      <div className="flex items-center">
        <GiBodyHeight size={28} color="#a462af" />
        <Input
          type="text"
          placeholder="Height"
          className="ml-7"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setHeight(isNaN(value) ? 0 : value); // Prevent NaN issues
          }}
        />
        <UnitSwitch
          label1="cm"
          label2="feet"
          checked={heightUnit === "feet"}
          onToggleChange={handleHeightToggle}
        />
      </div>

      {/* Update the values in the database */}
      <button
        onClick={handleUpdateProfile}
        className="mt-10 w-36 h-10  bg-teal-600/25 rounded-md shadow-sm hover:border hover:border-teal-600/80 text-sm text-muted-foreground"
      >
        Update
      </button>
    </div>
  );
}
