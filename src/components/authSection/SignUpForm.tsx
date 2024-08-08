"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthenticationContext";
import { ModeToggle } from "../ModeToggle";

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

function SignupForm() {
  const [formData, setFormData] = useState<ISignUpFormState>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const { signUp } = useAuth();
  const router = useRouter();
  const labelStyles =
    "lg:mt-6 mt-2 text-sm  mb-3 text-muted-foreground font-medium tracking-wide";
  const inputStyles =
    "lg:h-10 h-8  lg:w-80 w-60 px-2 border border-neutral text-sm rounded-md font-medium outline-none focus:ring-primary/80 focus:border-primary/80";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userDetails: IUserDetails = {
      firstname: formData.firstname,
      lastname: formData.lastname,
    };

    try {
      await signUp(formData.email, formData.password, userDetails);
      router.push("/login");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center relative">
      <div className="absolute  lg:top-10 top-0 lg:right-14 right-0 lg:text-lg">
        <ModeToggle />
      </div>

      <form
        onSubmit={handleSignUp}
        className="flex flex-col lg:px-48  px-24 justify-center"
      >
        <p className="text-2xl mb-4 tracking-wider font-semibold text-muted-foreground">
          Sign Up{" "}
        </p>
        <label htmlFor="firstname" className={`${labelStyles}`}>
          First Name:
        </label>
        <input
          placeholder="enter first name"
          id="firstname"
          name="firstname"
          type="text"
          required
          onChange={handleInputChange}
          value={formData.firstname}
          className={`${inputStyles}`}
        />
        <label htmlFor="lastname" className={`${labelStyles}`}>
          Last Name:
        </label>
        <input
          placeholder="enter last name"
          id="lastname"
          name="lastname"
          type="text"
          required
          onChange={handleInputChange}
          value={formData.lastname}
          className={`${inputStyles}`}
        />
        <label htmlFor="email" className={`${labelStyles}`}>
          Email:
        </label>
        <input
          placeholder="enter email address"
          id="email"
          name="email"
          type="email"
          required
          onChange={handleInputChange}
          value={formData.email}
          className={`${inputStyles}`}
        />
        <label htmlFor="password" className={`${labelStyles}`}>
          Password:
        </label>
        <input
          placeholder="enter password"
          id="password"
          name="password"
          type="password"
          required
          onChange={handleInputChange}
          value={formData.password}
          className={`${inputStyles}`}
        />
        <div className="mt-12 ">
          <button className="text-md lg:h-10 h-8 lg:w-80 w-60 rounded-md bg-primary/30 hover:bg-primary/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60">
            Sign Up
          </button>
          <div className="flex mt-10 justify-center">
            <p className="mr-3">{`already have an account?`}</p>
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
