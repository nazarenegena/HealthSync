"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "@/contexts/UserContextProvider";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../ModeToggle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { login } from "@/app/action";

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
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginUserSchemaType>({
    resolver: zodResolver(LoginUserSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { loading, setLoading } = useUser();
  const router = useRouter();

  const handlePasswordToggle = () => setIsPasswordVisible(!isPasswordVisible);

  const handleLogin = async (data: LoginUserSchemaType) => {
    try {
      setLoading(true);
      const result = await login({
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error(result.error);

        if (result.error.toLowerCase().includes("email")) {
          setError("email", { message: "Invalid email address" });
        } else if (result.error.toLowerCase().includes("password")) {
          setError("password", { message: "Invalid password" });
        }
      } else if (result?.success) {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const errorTextStyle = "text-red-500 text-sm font-medium mt-1";
  const labelStyles =
    "lg:mt-6 mt-2 text-md mb-3 text-muted-foreground font-medium tracking-wide";
  const inputStyles =
    "lg:h-10 h-8 lg:w-80 w-60 px-2 border border-neutral text-sm font-medium rounded-md outline-none focus:ring-primary/80 focus:border-primary/80";

  return (
    <div className="flex flex-col justify-center relative">
      <div className="absolute lg:top-10 top-0 lg:right-14 right-0 lg:text-lg">
        <ModeToggle />
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col lg:px-48 px-24 justify-center"
      >
        <p className="text-2xl mb-4 tracking-wider font-semibold text-muted-foreground">
          Login
        </p>

        {/* Email Field */}
        <label htmlFor="email" className={labelStyles}>
          Email:
        </label>
        <input
          placeholder="enter email address"
          id="email"
          type="email"
          {...register("email")}
          className={inputStyles}
          autoComplete="username"
        />
        {errors.email && (
          <p className={errorTextStyle}>{errors.email.message}</p>
        )}

        {/* Password Field */}
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
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="cursor-pointer absolute right-20 top-3"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? (
              <IoMdEyeOff size={20} />
            ) : (
              <IoMdEye size={20} />
            )}
          </button>
        </div>
        {errors.password && (
          <p className={errorTextStyle}>{errors.password.message}</p>
        )}

        <div className="mt-12">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting && loading && (
              <Loader className="animate-spin mr-2" />
            )}
            Log in
          </Button>

          <div className="flex mt-10 justify-center items-center">
            <p className="mr-3 text-sm">{`Don't have an account?`}</p>
            <Link
              href="/signup"
              className="text-primary/80 font-medium cursor-pointer text-sm hover:underline"
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
