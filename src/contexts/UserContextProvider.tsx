"use client";
import { createClient } from "@/utils/supabase/client";
import { IUser, IProfile } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "@/app/action";

const UserContext = createContext({});

export const useUser = () => useContext<any>(UserContext);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = createClient();
  const [user, setUser] = useState<IUser>({
    email: null,
    uid: null,
    firstname: null,
    lastname: null,
    isNewUser: false,
    name: null,
  });
  const [profile, setProfile] = useState<IProfile>({
    user_id: "",
    age: null,
    height: null,
    height_unit: null,
    weight: null,
    weight_unit: null,
  });
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user } = data;
      setUser({
        email: user?.email ?? null,
        uid: user?.id ?? null,
        name: user?.user_metadata?.firstname ?? null,
        firstname: user?.user_metadata?.firstname ?? null,
        lastname: user?.user_metadata?.lastname ?? null,
        isNewUser: user?.user_metadata?.isNewUser ?? false,
      });
      const userProfile = await getProfile(user?.id ?? undefined);
      if (userProfile) {
        setProfile({
          user_id: user?.id ?? "",
          age: userProfile.age ?? null,
          height: userProfile.height ?? null,
          height_unit: userProfile.height_unit ?? null,
          weight: userProfile.weight ?? null,
          weight_unit: userProfile.weight_unit ?? null,
        });
      }
    };
    fetchUser();
  }, [supabase.auth]);

  useEffect(() => {
    getProfile(user.uid as string);
  }, [user.uid]);
  return (
    <UserContext.Provider
      value={{ user, loading, setLoading, profile, setUser, setProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};
