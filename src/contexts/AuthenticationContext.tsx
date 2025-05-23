"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { db } from "@/config/firebase.config";
import { IUser } from "@/lib/types";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

// user data interface

// create auth context
const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // defining the constants for the user and loading state
  const [user, setUser] = useState<IUser>({
    email: null,
    uid: null,
    firstname: null,
    lastname: null,
    isNewUser: false,
  });
  const [loading, setLoading] = useState<Boolean>(false);

  // login the user
  const logIn = async (email: string, password: string) => {
    const { user: authObject } = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (authObject) {
      let userObj = {};
      const userRef = collection(db, "users");
      const q = query(userRef, where("uid", "==", authObject?.uid));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userObj = {
          ...userData,
          name: userData.name,
          lastname: userData.lastName,
          email: authObject.email,
          uid: authObject.uid,
        };
      });
      return userObj;
    }
    return null;
  };

  // sign up the user
  // change cloud firestore database  rules to true

  const signUp = async (
    email: string,
    password: string,
    userDetails: IUser
  ) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = res.user;
    const docData = {
      uid: newUser.uid,
      isNewUser: true,
      name: userDetails.firstname,
      lastName: userDetails.lastname,
      authProvider: "local",
      email,
    };
    await setDoc(doc(db, "users", newUser.uid), docData);
  };

  // logout the user
  const logOut = async () => {
    setUser({
      email: null,
      uid: null,
      firstname: null,
      lastname: null,
    });
    return await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = collection(db, "users");
        const q = query(userRef, where("uid", "==", currentUser.uid));
        try {
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            console.log("No matching documents.");
          } else {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setUser({
                ...userData,
                name: userData.name,
                lastname: userData.lastName,
                email: currentUser.email,
                uid: currentUser.uid,
              });
            });
          }
        } catch (error) {
          console.error("Error getting documents:", error);
        }
      } else {
        setUser({
          email: null,
          uid: null,
          firstname: null,
          lastname: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // wrapping the children with the context provider
  return (
    <AuthContext.Provider
      value={{ user, signUp, logIn, logOut, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
