import React from "react";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      <Navbar />
      <p>Welcome to HealthSync</p>
      <Button asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
