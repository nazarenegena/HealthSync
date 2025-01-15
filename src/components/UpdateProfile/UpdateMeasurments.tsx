"use client";

import React, { useEffect, useState } from "react";
import UnitSwitch from "./UnitSwitch";
import { Input } from "@/components/ui/input";
import { IoScaleOutline } from "react-icons/io5";
import { GiBodyHeight } from "react-icons/gi";
import { useAuth } from "@/contexts/AuthenticationContext";
import { db } from "@/config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { IUserProfile } from "../anthropometricsSection/AnthropometricsView";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

type Props = {};

import { IFormInput } from "@/app/dashboard/settings/editprofile/page";
export default function UpdateMeasurements(props: Props) {
  const { user } = useAuth();
  const [weight, setWeight] = useState<number>(user?.weight?.value || 0);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">(
    user?.weight?.unit || "kg"
  );
  const [height, setHeight] = useState<number>(user?.height?.value || 0);
  const [heightUnit, setHeightUnit] = useState<"cm" | "feet">(
    user?.height?.unit || "cm"
  );
  const errorTextStyle = "text-red-500 text-sm font-medium mt-1";

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      height: {
        value: user?.height?.value || 0,
        unit: user?.height?.unit || "cm",
      },
      weight: {
        value: user?.weight?.value || 0,
        unit: user?.weight?.unit || "kg",
      },
    },
  });

  useEffect(() => {
    if (!user.uid) return;
    reset({
      height: user?.height,
      weight: user?.weight,
    });
  }, [reset, user]);

  // Converts weight
  const convertWeight = (weight: number, unit: "kg" | "lbs"): number => {
    if (unit === "lbs") {
      return parseFloat((weight * 2.20462).toFixed(1));
    } else {
      return parseFloat((weight / 2.20462).toFixed(1));
    }
  };

  // Converts height
  const convertHeight = (height: number, unit: "cm" | "feet"): number => {
    if (unit === "cm") {
      return parseFloat((height * 30.48).toFixed(1));
    } else {
      return parseFloat((height / 30.48).toFixed(1));
    }
  };

  const handleWeightToggle = (checked: boolean) => {
    const newUnit = checked ? "lbs" : "kg";
    const convertedWeight = convertWeight(weight, newUnit);

    setWeight(convertedWeight);
    setWeightUnit(newUnit);

    // Sync the weight field with both value and unit
    setValue("weight", { value: convertedWeight, unit: newUnit });
  };

  const handleHeightToggle = (checked: boolean) => {
    const newUnit = checked ? "feet" : "cm";
    const convertedHeight = convertHeight(height, newUnit);

    setHeight(convertedHeight);
    setHeightUnit(newUnit);

    // Sync height field with both value and unit
    setValue("height", { value: convertedHeight, unit: newUnit });
  };

  // update the profile

  const handleUpdateProfile = async () => {
    if (!user?.uid) return;

    const profileRef = doc(db, "users", user.uid);
    const updatedData: IUserProfile = {
      weight: { value: weight, unit: weightUnit },
      height: { value: height, unit: heightUnit },
    };

    try {
      await setDoc(profileRef, updatedData, { merge: true });
      toast.success("weight & height updated successfully");
    } catch (error) {
      toast.error("unable to update weight & height");
    }
  };

  return (
    <div className="w-[45rem] mt-10">
      <p className="font-bold text-2xl mt-5 mb-3">Unit</p>
      <div className="flex items-center py-5">
        <IoScaleOutline size={28} color="#a462af" />
        <Input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
              setWeight(value);
              setValue("weight", { value, unit: weightUnit });
            }
          }}
          className="mx-8"
        />
        {errors.height && (
          <p className={errorTextStyle}>{errors.weight?.message}</p>
        )}

        <UnitSwitch
          label1="kg"
          label2="lbs"
          checked={weightUnit === "lbs"}
          onToggleChange={(checked) => handleWeightToggle(checked)}
        />
      </div>
      <div className="flex items-center">
        <GiBodyHeight size={28} color="#a462af" />
        <Input
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
              setHeight(value);
              setValue("height", { value, unit: heightUnit });
            }
          }}
          className="mx-8"
        />

        {errors.height && (
          <p className={errorTextStyle}>{errors.height.message}</p>
        )}

        <UnitSwitch
          label1="cm"
          label2="feet"
          checked={heightUnit === "feet"}
          onToggleChange={(checked) => handleHeightToggle(checked)}
        />
      </div>

      <button
        onClick={handleUpdateProfile}
        className="mt-10 w-36 h-10  bg-teal-600/25 rounded-md shadow-sm hover:border hover:border-teal-600/80 text-sm text-muted-foreground"
      >
        Update
      </button>
    </div>
  );
}
