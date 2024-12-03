"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { db } from "@/config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { IoScaleOutline } from "react-icons/io5";
import { GiBodyHeight } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthenticationContext";
import UnitSwitch from "@/components/UpdateProfile/UnitSwitch";

interface IFormInput {
  firstName?: string;
  lastName?: string;
  age?: number;
  weight: {
    value: number;
    unit: "kg" | "lbs";
  };
  height: {
    value: number;
    unit: "cm" | "feet";
  };
}

export default function Page() {
  const { user } = useAuth();
  const divStyle = "flex justify-between py-8 ";
  const titleStyle =
    "tracking-wider font-semibold text-muted-foreground mr-10 w-36";
  const textStyle =
    "text-muted-foreground tracking-wider text-end font-light ml-10";
  const [weight, setWeight] = useState<number>(user?.weight?.value || 0);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">(
    user?.weight?.unit || "kg"
  );
  const [height, setHeight] = useState<number>(user?.height?.value || 0);
  const [heightUnit, setHeightUnit] = useState<"cm" | "feet">(
    user?.height?.unit || "cm"
  );

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: user?.name || "",
      lastName: user?.lastName || "",
      age: user?.age || 0,
      height: user?.height?.value || 0,
      weight: {
        value: user?.weight?.value || 0,
        unit: user?.weight?.unit || "kg",
      },
    },
  });

  useEffect(() => {
    if (!user?.uid) return;
    reset({
      firstName: user?.name,
      lastName: user?.lastName,
      age: user?.age,
      height: user?.height,
      weight: user?.weight,
    });
  }, [reset, user]);

  // Converts weight
  const convertWeight = (weight: number, unit: "kg" | "lbs"): number => {
    if (unit === "lbs") {
      return weight * 2.20462;
    } else {
      return weight / 2.20462;
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

  const handleEditProfile = async (data: IFormInput) => {
    if (!user?.uid) return;

    const editProfileRef = doc(db, "users", user?.uid);
    const editedData = {
      name: data.firstName,
      lastName: data.lastName,
      age: data.age,
      height: { value: data.height.value, unit: data.height.unit },
      weight: { value: data.weight.value, unit: data.weight.unit },
    };

    // Proceed with saving the updated data
    await setDoc(editProfileRef, editedData);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl mb-4 tracking-wider font-semibold text-muted-foreground">
        Personal Info
      </p>
      <form className="w-1/2 mt-10" onSubmit={handleSubmit(handleEditProfile)}>
        <div className={`${divStyle}`}>
          <p className={`${titleStyle}`}>First Name</p>
          <Input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            className={`${textStyle}`}
          />
        </div>
        <div className={`${divStyle}`}>
          <p className={`${titleStyle}`}>Last Name</p>
          <Input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            className={`${textStyle}`}
          />
        </div>
        <div className={`${divStyle}`}>
          <p className={`${titleStyle}`}>Age</p>
          <Input
            type="number"
            placeholder="Age"
            {...register("age")}
            className={`${textStyle}`}
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
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                setWeight(value);
                setValue("weight", { value, unit: weightUnit });
              }
            }}
            className="mx-8"
          />
          <UnitSwitch
            label1="kg"
            label2="lbs"
            checked={weightUnit === "lbs"}
            onToggleChange={(checked) => handleWeightToggle(checked)}
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
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                setHeight(value);
                setValue("height", { value, unit: heightUnit });
              }
            }}
            className="mx-8"
          />
          <UnitSwitch
            label1="cm"
            label2="feet"
            checked={heightUnit === "feet"}
            onToggleChange={(checked) => handleHeightToggle(checked)}
          />
        </div>

        <Button className="mt-12 w-36 h-10 bg-teal-600/25 rounded-md shadow-sm hover:border hover:border-teal-600/80 text-sm text-muted-foreground">
          Update Profile
        </Button>
      </form>
    </div>
  );
}
