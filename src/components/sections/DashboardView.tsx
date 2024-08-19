"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthenticationContext";

type Props = {};

const DashboardView = (props: Props) => {
  const { user } = useAuth();

  return (
    <div>
      Welcome, {user.name}
      <p>The dashboard view</p>
    </div>
  );
};

export default DashboardView;
