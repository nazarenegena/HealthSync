import React from "react";
import Navbar from "./Navbar";

import HeroSection from "./HeroSection";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default LandingPage;
