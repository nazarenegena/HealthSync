// `app/page.tsx` is the UI for the `/` URL
"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthenticationContext";
import { CgProfile } from "react-icons/cg";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GrBook } from "react-icons/gr";
import { MdOutlineRedeem } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaHome } from "react-icons/fa";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import UnitSwitch from "@/components/UpdateProfile/UnitSwitch";
import UpdateMeasurments from "@/components/UpdateProfile/UpdateMeasurments";
import HelpChart from "@/components/HelpSection/helpChart";

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const { user } = useAuth();
  console.log(user, "settings");

  return (
    <div className="bg-muted/15 h-full flex flex-col items-center relative">
      <p className="mt-10 mb-8 font-bold text-md text-center">SETTINGS</p>
      {/* Account */}
      <div className="w-[45rem]">
        <p className="font-bold text-2xl mb-5">Account</p>

        <div className=" flex justify-between py-5">
          <div className="flex justify-between">
            <CgProfile size={22} color="#a462af" />
            <Link
              href="/dashboard/settings/editprofile"
              className="cursor-pointer ml-5 text-sm text-muted-foreground"
            >
              Edit Profile
            </Link>
          </div>

          <CiEdit size={22} strokeWidth={0.2} />
        </div>
        <hr />

        <div className=" flex justify-between py-5">
          <div className="flex items-center">
            <GiWeightLiftingUp size={22} color="#a462af" />
            <Link
              href="/dashboard/settings/workoutpreference"
              className="cursor-pointer ml-5 text-sm text-muted-foreground"
            >
              Workout Preference
            </Link>
          </div>
          <CiEdit size={22} strokeWidth={0.2} />
        </div>
        <hr />
      </div>

      {/* Unit */}
      <UpdateMeasurments />

      {/* Help */}
      <div className="w-[45rem] mt-10">
        <p className="font-bold text-2xl mt-5 mb-3">Help</p>

        <div className=" flex justify-between py-5">
          <div className="flex items-center">
            <GrBook size={28} color="#a462af" />
            <p className="ml-5 text-sm text-muted-foreground">
              Help Center
            </p>{" "}
          </div>
          <CiEdit
            size={22}
            strokeWidth={0.2}
            className="cursor-pointer hover:text-primary"
            onClick={() => setIsOpen(true)}
          />
        </div>
        <hr />

        <div className=" flex justify-between py-5">
          <div className="flex items-center">
            <MdOutlineRedeem size={28} color="#a462af" />
            <p className="ml-5 text-sm text-muted-foreground">Redeem Promo</p>
          </div>
          <CiEdit
            size={22}
            strokeWidth={0.2}
            className="cursor-pointer hover:text-primary"
          />
        </div>
        <hr />
      </div>
      {isOpen ? <HelpChart onClose={handleModalClose} /> : null}
    </div>
  );
}
