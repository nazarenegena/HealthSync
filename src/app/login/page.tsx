"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthenticationContext";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { logIn } = useAuth();
  const router = useRouter();

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
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button>Log in</button>
      <button>
        {" "}
        <Link href={"/signup"}>Sign Up</Link>
      </button>
    </form>
  );
}
