import React from "react";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import Link from "next/link";
import HeroSection from "./HeroSection";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Button asChild>
        <Link href="/dashboard">Get Started</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
