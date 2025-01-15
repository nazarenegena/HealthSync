"use client";

import React, { useEffect, useState } from "react";
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
import { Loader } from "lucide-react";

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
      message: "age is required",
    })
    .min(10, { message: "Age below limit (10 yrs)" })
    .max(80, { message: "Above age limit, seek geriatric care" }),

  height: z
    .number({
      message: "Height is required",
    })
    .min(1, { message: "height cant be less than 0" }),
  heightUnit: z.enum(["cm", "feet"], { required_error: "Select height unit" }),

  weight: z
    .number({
      message: "Weight is required",
    })
    .min(1, { message: "weight cant be less than 0" }),
  weightUnit: z.enum(["kg", "lbs"], { required_error: "Select weight unit" }),
});

type AnthropometricUserSchemaType = z.infer<typeof AnthropometricUserSchema>;

const convertWeight = (weight: number, unit: "kg" | "lbs"): number => {
  if (unit === "lbs") {
    return parseFloat((weight * 2.20462).toFixed(1));
  } else {
    return parseFloat((weight / 2.20462).toFixed(1));
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
  const { user, loading, setLoading } = useAuth();
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
      heightUnit: "cm",
      weightUnit: "kg",
    },
  });
  const heightValue = watch("height");
  const weightValue = watch("weight");

  // Handle the weight unit toggle
  const handleWeightToggle = (checked: boolean) => {
    const newUnit = checked ? "lbs" : "kg";
    const convertedWeight = convertWeight(weightValue, newUnit);

    setWeight(convertedWeight);
    setWeightUnit(newUnit);

    // Sync React Hook Form values
    setValue("weight", convertedWeight);
    setValue("weightUnit", newUnit);
  };

  // Handle height unit toggle
  const handleHeightToggle = (checked: boolean) => {
    const newUnit = checked ? "feet" : "cm";
    const convertedHeight = convertHeight(heightValue, newUnit);
    setHeight(isNaN(heightValue) ? 0 : heightValue);
    setValue("height", isNaN(heightValue) ? 0 : heightValue);

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
    setLoading(true);
    try {
      await setDoc(profileRef, updatedData, { merge: true });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      //@ts-expect-error msg not part of axios error
      toast.error(error?.message as string);
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
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
            step="any"
            type="number"
            placeholder="Height"
            {...register("height", { valueAsNumber: true, required: true })}
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

        <div className="flex items-center mt-16">
          <IoScaleOutline size={28} color="#a462af" />
          <Input
            type="text"
            placeholder="Weight"
            {...register("weight", { valueAsNumber: true, required: true })}
          />
          {errors.height && (
            <p className={errorTextStyle}>{errors.weight?.message}</p>
          )}
          {/* <Input
            type="text"
            placeholder="Weight"
            value={weight || ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);

              // Prevent NaN issues
              setWeight(isNaN(value) ? 0 : value);
              setValue("weight", isNaN(value) ? 0 : value);
            }}
          /> */}
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
          {loading && <Loader className="animate-spin mr-6 text-white/70" />}
          Add Profile
        </Button>
      </form>
    </div>
  );
};

export default AnthropometricsView;
