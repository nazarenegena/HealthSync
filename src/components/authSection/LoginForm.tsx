"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../ModeToggle";
import { useAuth } from "@/contexts/AuthenticationContext";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { logIn } = useAuth();
  const router = useRouter();
  const labelStyles =
    "lg:mt-6 mt-2 text-md  mb-3 text-muted-foreground font-medium tracking-wide";
  const inputStyles =
    "lg:h-10 h-8  lg:w-80 w-60 px-2 border border-neutral text-sm font-medium rounded-md outline-none focus:ring-primary/80 focus:border-primary/80";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      router.push("/dashboard");
      setEmail("");
      setPassword("");
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
        onSubmit={handleLogin}
        className="flex flex-col lg:px-48  px-24 justify-center"
      >
        <p className="text-2xl mb-4 tracking-wider font-semibold text-muted-foreground">
          Login{" "}
        </p>
        <label htmlFor="email" className={`${labelStyles}`}>
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={`${inputStyles}`}
        />
        <label htmlFor="password" className={`${labelStyles}`}>
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={`${inputStyles}`}
        />
        <div className="mt-12 ">
          <button className="text-md lg:h-10 h-8 lg:w-80 w-60 rounded-md bg-primary/30 hover:bg-primary/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60">
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
