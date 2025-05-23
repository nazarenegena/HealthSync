"use client";

import React, { useEffect, useState } from "react";
import UnitSwitch from "./UnitSwitch";
import { Input } from "@/components/ui/input";
import { IoScaleOutline } from "react-icons/io5";
import { GiBodyHeight } from "react-icons/gi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContextProvider";
import { updateProfile } from "@/app/action";
import { IProfileFormData } from "@/lib/types";

export default function UpdateMeasurements() {
  const { user, profile, setProfile } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const [weight, setWeight] = useState<number>(profile?.weight || 0);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">(
    profile?.weight_unit || "kg"
  );
  const [height, setHeight] = useState<number>(profile?.height || 0);
  const [heightUnit, setHeightUnit] = useState<"cm" | "feet">(
    profile?.height_unit || "cm"
  );

  const {
    setValue,
    formState: { errors },
  } = useForm<IProfileFormData>({
    defaultValues: {
      height: profile?.height || 0,
      weight: profile?.weight || 0,
      height_unit: profile?.height_unit || "cm",
      weight_unit: profile?.weight_unit || "kg",
    },
  });

  useEffect(() => {
    if (profile) {
      setWeight(profile?.weight || 0);
      setWeightUnit(profile?.height_unit || "kg");
      setHeight(profile?.height || 0);
      setHeightUnit(profile?.height_unit || "cm");

      setValue("weight", profile?.weight || 0);
      setValue("weight_unit", profile?.height_unit || "kg");
      setValue("height", profile?.height || 0);
      setValue("height_unit", profile?.height_unit || "cm");
    }
  }, [profile, setValue]);

  // Convert weight between units
  const convertWeight = (weight: number, unit: "kg" | "lbs"): number => {
    return unit === "lbs"
      ? parseFloat((weight * 2.20462).toFixed(1))
      : parseFloat((weight / 2.20462).toFixed(1));
  };

  // Convert height between units
  const convertHeight = (height: number, unit: "cm" | "feet"): number => {
    return unit === "cm"
      ? parseFloat((height * 30.48).toFixed(1))
      : parseFloat((height / 30.48).toFixed(1));
  };

  const handleWeightToggle = (checked: boolean) => {
    const newUnit = checked ? "lbs" : "kg";
    const convertedWeight = convertWeight(weight, newUnit);

    setWeight(convertedWeight);
    setWeightUnit(newUnit);
    setValue("weight", convertedWeight);
    setValue("weight_unit", newUnit);
  };

  const handleHeightToggle = (checked: boolean) => {
    const newUnit = checked ? "feet" : "cm";
    const convertedHeight = convertHeight(height, newUnit);

    setHeight(convertedHeight);
    setHeightUnit(newUnit);
    setValue("height", convertedHeight);
    setValue("height_unit", newUnit);
  };

  const handleUpdateProfile = async () => {
    if (!user?.uid) {
      toast.error("User not authenticated");
      return;
    }

    setIsLoading(true);

    try {
      const result = await updateProfile({
        user_id: user.uid,
        height: height,
        height_unit: heightUnit,
        weight: weight,
        weight_unit: weightUnit,
      });

      setProfile({
        user_id: user.uid,
        age: profile?.age,
        height: height,
        height_unit: heightUnit,
        weight: weight,
        weight_unit: weightUnit,
      });

      if (result?.error) {
        toast.error(result.error);
      }

      toast.success("Measurements updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update measurements"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[45rem] mt-10">
      <p className="font-bold text-2xl mt-5 mb-3">Unit</p>

      {/* Weight Input */}
      <div className="flex items-center py-5">
        <IoScaleOutline size={28} color="#a462af" />
        <Input
          type="number"
          placeholder="Weight"
          value={weight || ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
              setWeight(value);
              setValue("weight", value);
            }
          }}
          className="mx-8"
          step="0.1"
          min="0"
        />
        {errors.weight && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.weight.message}
          </p>
        )}
        <UnitSwitch
          label1="kg"
          label2="lbs"
          checked={weightUnit === "lbs"}
          onToggleChange={handleWeightToggle}
        />
      </div>

      {/* Height Input */}
      <div className="flex items-center">
        <GiBodyHeight size={28} color="#a462af" />
        <Input
          type="number"
          placeholder="Height"
          value={height || ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
              setHeight(value);
              setValue("height", value);
            }
          }}
          className="mx-8"
          step="0.1"
          min="0"
        />
        {errors.height && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.height.message}
          </p>
        )}
        <UnitSwitch
          label1="cm"
          label2="feet"
          checked={heightUnit === "feet"}
          onToggleChange={handleHeightToggle}
        />
      </div>

      <Button
        onClick={handleUpdateProfile}
        className="mt-10 w-36 h-10 bg-highlight hover:bg-highlight/90"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </div>
  );
}
