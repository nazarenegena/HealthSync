"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthenticationContext";
import { useRouter } from "next/navigation";
import { db } from "@/config/firebase.config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UnitSwitch from "../UpdateProfile/UnitSwitch";
import { GiBodyHeight } from "react-icons/gi";
import { IoScaleOutline } from "react-icons/io5";
import { GiLifeInTheBalance } from "react-icons/gi";
import { ModeToggle } from "../ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface IUserProfile {
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

const AnthropometricUserSchema = z.object({
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(10, { message: "Age below limit (10 yrs)" })
    .max(80, { message: "Above age limit, seek geriatric care" }),

  height: z.number({
    required_error: "Height is required",
    invalid_type_error: "Height must be a number",
  }),

  heightUnit: z.enum(["cm", "feet"], { required_error: "Select height unit" }),

  weight: z.number({
    required_error: "Weight is required",
    invalid_type_error: "Weight must be a number",
  }),

  weightUnit: z.enum(["kg", "lbs"], { required_error: "Select weight unit" }),
});

type AnthropometricUserSchemaType = z.infer<typeof AnthropometricUserSchema>;

const convertWeight = (weight: number, unit: "kg" | "lbs"): number => {
  if (unit === "lbs") {
    return weight * 2.20462;
  } else {
    return weight / 2.20462;
  }
};

// Converts height to the desired unit and rounds it to an appropriate decimal place
const convertHeight = (height: number, unit: "cm" | "feet"): number => {
  if (unit === "cm") {
    return parseFloat((height * 30.48).toFixed(1));
  } else {
    return parseFloat((height / 30.48).toFixed(1));
  }
};

const AnthropometricsView = () => {
  const [frequency, setFrequency] = useState("");
  const { user } = useAuth();
  const [weight, setWeight] = useState<number>(0);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  const [height, setHeight] = useState<number>(0);
  const [heightUnit, setHeightUnit] = useState<"cm" | "feet">("cm");

  const router = useRouter();

  const errorTextStyle = "text-red-500 text-sm font-medium mt-1";

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AnthropometricUserSchemaType>({
    resolver: zodResolver(AnthropometricUserSchema),
    defaultValues: {
      height: 0,
      heightUnit: "cm",
      weight: 0,
      weightUnit: "kg",
      age: 0,
    },
  });

  // Handle the weight unit toggle
  const handleWeightToggle = (checked: boolean) => {
    const newUnit = checked ? "lbs" : "kg";
    const convertedWeight = convertWeight(weight, newUnit);

    setWeight(convertedWeight);
    setWeightUnit(newUnit);

    // Sync React Hook Form values
    setValue("weight", convertedWeight);
    setValue("weightUnit", newUnit);
  };

  // Handle height unit toggle
  const handleHeightToggle = (checked: boolean) => {
    const newUnit = checked ? "feet" : "cm";
    const convertedHeight = convertHeight(height, newUnit);

    setHeight(convertedHeight);
    setHeightUnit(newUnit);

    setValue("height", convertedHeight);
    setValue("heightUnit", newUnit);
  };

  // update the profile
  const handleUpdateProfile = async (data: AnthropometricUserSchemaType) => {
    if (!user?.uid) return;

    const profileRef = doc(db, "users", user.uid);
    const updatedData = {
      isNewUser: false,
      age: data.age,
      height: { value: data.height, unit: data.heightUnit },
      weight: { value: data.weight, unit: data.weightUnit },
    };
    router.push("/dashboard");
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
    <div>
      <ModeToggle />
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="mt-20 flex flex-col justify-center items-center"
      >
        <p className="text-2xl mb-4 tracking-wider font-semibold text-muted-foreground">
          Create Your Profile
        </p>

        <div className="flex items-center  mt-20">
          <GiLifeInTheBalance size={24} color="#a462af" />

          <Input
            type="number"
            placeholder="Age"
            {...register("age", { valueAsNumber: true })}
            className="flex h-10 w-40 border-b border-b-muted/70 bg-transparent transition duration-300 ease px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.age && <p className={errorTextStyle}>{errors.age.message}</p>}
        </div>

        <div className="flex items-center  mt-16">
          <GiBodyHeight size={28} color="#a462af" />
          <Input
            type="text"
            placeholder="Height"
            value={height || ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);

              // Prevent NaN issues
              setHeight(isNaN(value) ? 0 : value);
              setValue("height", isNaN(value) ? 0 : value);
            }}
          />
          <UnitSwitch
            label1="cm"
            label2="feet"
            checked={heightUnit === "feet"}
            onToggleChange={(checked) => handleHeightToggle(checked)}
          />
        </div>

        <div className="flex items-center mt-16">
          <IoScaleOutline size={28} color="#a462af" />
          <Input
            type="text"
            placeholder="Weight"
            value={weight || ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);

              // Prevent NaN issues
              setWeight(isNaN(value) ? 0 : value);
              setValue("weight", isNaN(value) ? 0 : value);
            }}
          />
          <UnitSwitch
            label1="kg"
            label2="lbs"
            checked={weightUnit === "lbs"}
            onToggleChange={(checked) => handleWeightToggle(checked)}
          />
        </div>
        <div className="mt-12">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select Workout Frequency</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={frequency}
                onValueChange={setFrequency}
              >
                <DropdownMenuRadioItem value="beginner">
                  Beginner
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="intermediate">
                  Intermediate
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="advanced">
                  Advanced
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>{" "}
        </div>
        <Button type="submit" variant="primary" className="mt-14">
          Add Profile
        </Button>
      </form>
    </div>
  );
};

export default AnthropometricsView;
