"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { IoScaleOutline } from "react-icons/io5";
import { GiBodyHeight } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import UnitSwitch from "@/components/UpdateProfile/UnitSwitch";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { useUser } from "@/contexts/UserContextProvider";
import { updateProfile, updateUser } from "@/app/action";
import { IProfileFormData } from "@/lib/types";

export default function ProfileUpdatePage() {
  const { user, loading, setLoading, setUser, profile, setProfile } = useUser();
  const [weight, setWeight] = useState<number>(profile?.weight || 0);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">(
    profile?.weight_unit || "kg"
  );
  const [height, setHeight] = useState<number>(profile?.height || 0);
  const [heightUnit, setHeightUnit] = useState<"cm" | "feet">(
    profile?.height_unit || "cm"
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileFormData>({
    defaultValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      age: profile?.age || 0,
      height: profile?.height || 0,
      weight: profile?.weight || 0,
      height_unit: profile?.height_unit || "cm",
      weight_unit: profile?.weight_unit || "kg",
    },
  });

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

  const handleEditProfile = async (data: IProfileFormData) => {
    if (!user?.uid) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);

    try {
      const result = await updateProfile({
        user_id: user.uid,
        age: data.age || 0,
        height: data.height || 0,
        height_unit: data.height_unit || "cm",
        weight: data.weight || 0,
        weight_unit: data.weight_unit || "kg",
      });
      setProfile({
        ...profile,
        age: data.age || 0,
        height: data.height || 0,
        height_unit: data.height_unit || "cm",
        weight: data.weight || 0,
        weight_unit: data.weight_unit || "kg",
      });

      if (result?.error) {
        toast.error(result.error);
      }

      const updatedUser = await updateUser({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
      });
      setUser({
        ...user,
        firstname: data.firstname || "",
        lastname: data.lastname || "",
      });
      if (updatedUser?.error) {
        toast.error(updatedUser.error);
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
    setWeight(profile.weight);
    setWeightUnit(profile.weight_unit);
    setHeight(profile.height);
    setHeightUnit(profile.height_unit);
  };

  const divStyle = "flex justify-between py-8";
  const titleStyle =
    "tracking-wider font-semibold text-muted-foreground mr-10 w-36";
  const textStyle =
    "text-primary tracking-wider text-end font-semibold text-lg ml-10";

  return (
    <div className="flex flex-col items-center justify-center relative">
      <p className="text-2xl mb-4 tracking-wider font-semibold text-muted-foreground">
        Personal Info
      </p>

      <form className="w-1/2 mt-10" onSubmit={handleSubmit(handleEditProfile)}>
        {/* First Name */}
        <div className={divStyle}>
          <p className={titleStyle}>First Name</p>
          <Input
            type="text"
            placeholder="First Name"
            {...register("firstname")}
            className={textStyle}
          />
        </div>

        {/* Last Name */}
        <div className={divStyle}>
          <p className={titleStyle}>Last Name</p>
          <Input
            type="text"
            placeholder="Last Name"
            {...register("lastname")}
            className={textStyle}
          />
        </div>

        {/* Age */}
        <div className={divStyle}>
          <p className={titleStyle}>Age</p>
          <Input
            type="number"
            placeholder="Age"
            {...register("age", { valueAsNumber: true })}
            className={textStyle}
          />
        </div>

        {/* Weight */}
        <div className="flex items-center mt-16">
          <IoScaleOutline size={28} color="#a462af" />
          <Input
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              setWeight(value);
              setValue("weight", value);
            }}
            className="mx-8"
            step="0.1"
          />
          <UnitSwitch
            label1="kg"
            label2="lbs"
            checked={weightUnit === "lbs"}
            onToggleChange={handleWeightToggle}
          />
        </div>

        {/* Height */}
        <div className="flex items-center mt-16">
          <GiBodyHeight size={28} color="#a462af" />
          <Input
            type="number"
            placeholder="Height"
            value={height}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              setHeight(value);
              setValue("height", value);
            }}
            className="mx-8"
            step="0.1"
          />
          <UnitSwitch
            label1="cm"
            label2="feet"
            checked={heightUnit === "feet"}
            onToggleChange={handleHeightToggle}
          />
        </div>

        <Button
          type="submit"
          className="mt-12 w-40 h-12 bg-highlight hover:bg-highlight/90"
          disabled={loading}
        >
          {loading && <Loader className="animate-spin mr-2" />}
          Update Profile
        </Button>
      </form>

      <Link
        href="/dashboard/settings"
        className="mt-12 text-muted-foreground font-medium text-base hover:text-primary hover:underline flex items-center"
      >
        <IoIosArrowRoundBack size={28} />
        Back
      </Link>
    </div>
  );
}
