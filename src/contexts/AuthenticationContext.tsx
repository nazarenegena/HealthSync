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
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// user data interface
interface IUser {
  firstname?: string | null;
  lastname?: string | null;
  name?: string | null;
  email: string | null;
  uid: string | null;
}

// user details interface

// create auth context
const AuthContext = createContext({});

// export AuthContext to make it available
export const useAuth = () => useContext<any>(AuthContext);

// create the auth context provider
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
  });
  const [loading, setLoading] = useState<Boolean>(true);
  // login the user
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
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
    await addDoc(collection(db, "users"), {
      uid: newUser.uid,
      name: userDetails.firstname,
      authProvider: "local",
      email,
    });
  };

  // logout the user
  const logOut = async () => {
    setUser({ email: null, uid: null, firstname: null, lastname: null });
    return await signOut(auth);
  };

  // update the state depending on the auth
  // adding the user to the user object before setting it to the state
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
              console.log(userData, "the user data");
              setUser({
                ...currentUser,
                name: userData.name,
                email: currentUser.email,
                uid: currentUser.uid,
              });
            });
          }
        } catch (error) {
          console.error("Error getting documents:", error);
        }
      } else {
        setUser({ email: null, uid: null, firstname: null, lastname: null });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // wrapping the children with the context provider
  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the UserContext
// export const useUserContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within a UserContextProvider");
//   }
//   return context;
// };
