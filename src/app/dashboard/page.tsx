"use client";

import { useAuth } from "@/contexts/AuthenticationContext";

export default function Dashboard() {
  const { user } = useAuth();
  console.log(user, "the first name");

  return <h1>Welcome, {user.name}</h1>;

  // return <h1>Welcome, {user?.firstname ? user.firstname : "Welcome here"}</h1>;
}
