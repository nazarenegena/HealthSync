"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthenticationContext";

// Define the IUserDetails interface
interface IUserDetails {
  firstname: string;
  lastname: string;
}

interface ISignUpFormState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<ISignUpFormState>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { signUp } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData, "the data");

    const userDetails: IUserDetails = {
      firstname: formData.firstname,
      lastname: formData.lastname,
    };

    try {
      await signUp(formData.email, formData.password, userDetails);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <label htmlFor="firstname">First Name:</label>
      <input
        id="firstname"
        name="firstname"
        type="text"
        required
        onChange={handleInputChange}
        value={formData.firstname}
      />
      <label htmlFor="lastname">Last Name:</label>
      <input
        id="lastname"
        name="lastname"
        type="text"
        required
        onChange={handleInputChange}
        value={formData.lastname}
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        onChange={handleInputChange}
        value={formData.email}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        onChange={handleInputChange}
        value={formData.password}
      />
      <button type="submit">Sign Up</button>
      <button type="button">
        <Link href="/login">Log in</Link>
      </button>
    </form>
  );
}
