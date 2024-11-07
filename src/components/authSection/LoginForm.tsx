"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../ModeToggle";
import { useAuth } from "@/contexts/AuthenticationContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

const LoginUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter an email address" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Please enter a password" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchemaType>({
    resolver: zodResolver(LoginUserSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePasswordToggle = () => setIsPasswordVisible(!isPasswordVisible);
  const { logIn } = useAuth();
  const router = useRouter();

  const errorTextStyle = "text-red-500 text-sm font-medium mt-1";

  const labelStyles =
    "lg:mt-6 mt-2 text-md  mb-3 text-muted-foreground font-medium tracking-wide";
  const inputStyles =
    "lg:h-10 h-8  lg:w-80 w-60 px-2 border border-neutral text-sm font-medium rounded-md outline-none focus:ring-primary/80 focus:border-primary/80";

  const handleLogin = async (data: LoginUserSchemaType) => {
    try {
      const user = await logIn(data.email, data.password, data);

      if (user.isNewUser) {
        router.push("/anthropometrics");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  return (
    <div className="flex flex-col justify-center relative">
      <div className="absolute  lg:top-10 top-0 lg:right-14 right-0 lg:text-lg">
        <ModeToggle />
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col lg:px-48  px-24 justify-center"
      >
        <p className="text-2xl mb-4 tracking-wider font-semibold text-muted-foreground">
          Login{" "}
        </p>
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

        <div className="mt-12 ">
          <button
            className="text-md lg:h-10 h-8 lg:w-80 w-60 rounded-md bg-primary/30 hover:bg-primary/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
            type="submit"
          >
            Log in
          </button>
          <div className="flex mt-10 justify-center">
            <p className="mr-3">{`don't have an account ?`}</p>
            <Link
              href="/signup"
              className="text-primary/80 font-medium cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
