"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthenticationContext";
import { ModeToggle } from "../ModeToggle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

const RegisterUserSchema = z
  .object({
    firstname: z.string().min(1, { message: "Please enter a first name" }),
    lastname: z.string().min(1, { message: "Please enter a last name" }),
    email: z
      .string()
      .min(1, { message: "Please enter an email address" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(1, { message: "Please enter a password" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" })
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;

function SignupForm() {
  const { signUp, loading, setLoading } = useAuth();
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handlePasswordToggle = () => setIsPasswordVisible(!isPasswordVisible);
  const handleConfirmPasswordToggle = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const handleSignUp = async (data: RegisterUserSchemaType) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, data);
      toast.success("Registration Successful");
      router.push("/login");
    } catch (error) {
      //@ts-expect-error msg not part of axios error
      toast.error(error?.message as string);
    } finally {
      setLoading(false);
    }
  };

  const labelStyles =
    "lg:mt-6 mt-2 text-sm mb-3 text-muted-foreground font-medium tracking-wide";
  const inputStyles =
    "lg:h-10 h-8 lg:w-80 w-60 px-2 border border-neutral text-sm rounded-md font-medium outline-none focus:ring-primary/80 focus:border-primary/80";
  const errorTextStyle = "text-red-500 text-sm font-medium mt-1";

  return (
    <div className="flex flex-col justify-center relative">
      <div className="absolute lg:top-10 top-0 lg:right-14 right-0 lg:text-lg">
        <ModeToggle />
      </div>

      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex flex-col lg:px-48 px-24 justify-center"
      >
        <p className="text-2xl mb-4 tracking-wider font-semibold text-muted-foreground">
          Sign Up
        </p>

        {/* First Name */}
        <label htmlFor="firstname" className={labelStyles}>
          First Name:
        </label>
        <input
          placeholder="enter first name"
          id="firstname"
          type="text"
          {...register("firstname")}
          className={inputStyles}
        />
        {errors.firstname && (
          <p className={errorTextStyle}>{errors.firstname.message}</p>
        )}

        {/* Last Name */}
        <label htmlFor="lastname" className={labelStyles}>
          Last Name:
        </label>
        <input
          placeholder="enter last name"
          id="lastname"
          type="text"
          {...register("lastname")}
          className={inputStyles}
        />
        {errors.lastname && (
          <p className={errorTextStyle}>{errors.lastname.message}</p>
        )}

        {/* Email */}
        <label htmlFor="email" className={labelStyles}>
          Email:
        </label>
        <input
          placeholder="enter email address"
          id="email"
          type="email"
          {...register("email")}
          className={inputStyles}
        />
        {errors.email && (
          <p className={errorTextStyle}>{errors.email.message}</p>
        )}

        {/* Password */}
        <label htmlFor="password" className={labelStyles}>
          Password:
        </label>
        <div className="relative">
          <input
            placeholder="enter password"
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            {...register("password")}
            className={inputStyles}
          />
          <div
            onClick={handlePasswordToggle}
            className="cursor-pointer absolute right-20 top-3"
          >
            {isPasswordVisible ? (
              <IoMdEyeOff size={20} />
            ) : (
              <IoMdEye size={20} />
            )}
          </div>
        </div>
        {errors.password && (
          <p className={errorTextStyle}>{errors.password.message}</p>
        )}

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className={labelStyles}>
          Confirm Password:
        </label>
        <div className="relative">
          <input
            placeholder="confirm password"
            id="confirmPassword"
            type={isConfirmPasswordVisible ? "text" : "password"}
            {...register("confirmPassword")}
            className={inputStyles}
          />
          <div
            onClick={handleConfirmPasswordToggle}
            className="cursor-pointer absolute right-20 top-3"
          >
            {isConfirmPasswordVisible ? (
              <IoMdEyeOff size={20} />
            ) : (
              <IoMdEye size={20} />
            )}
          </div>
        </div>
        {errors.confirmPassword && (
          <p className={errorTextStyle}>{errors.confirmPassword.message}</p>
        )}

        {/* Submit Button */}
        <div className="mt-12">
          <Button type="submit" variant={"primary"}>
            {" "}
            {loading && <Loader className="animate-spin mr-6 text-white/70" />}
            Sign Up
          </Button>

          <div className="flex mt-10 justify-center">
            <p className="mr-3">already have an account?</p>
            <Link
              href="/login"
              className="text-primary/80 font-medium cursor-pointer"
            >
              Log in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
