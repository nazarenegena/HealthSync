// // "use client";

// // import React, { useState } from "react";
// // import { useAuth } from "@/contexts/AuthenticationContext";
// // import { db } from "@/config/firebase.config";
// // import { doc, setDoc } from "firebase/firestore";

// // export interface IUserProfile {
// //   age: number;
// //   height: number;
// //   weight: number;
// // }

// // const AnthropometricsView = () => {
// //   const { user } = useAuth();
// //   const [age, setAge] = useState<number>(0);
// //   const [height, setHeight] = useState<number>(0);
// //   const [weight, setWeight] = useState<number>(0);
// //   const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     setUserProfiles([...userProfiles, { age, height, weight }]);

// //     const docRef = doc(db, "users", user.uid);

// //     try {
// //       setDoc(
// //         docRef,
// //         { isNewUser: false, age: age, height: height, weight: weight },
// //         { merge: true }
// //       );

// //       console.log("Updated isNewUser to false for UID:", user.uid);
// //     } catch (error) {
// //       console.error("Error updating user document:", error);
// //     }

// //     setAge(0);
// //     setHeight(0);
// //     setWeight(0);
// //   };

// //   console.log(userProfiles, "the profile");
// //   return (
// //     <div>
// //       <h2>AnthropometricsView</h2>
// //       <form onSubmit={handleSubmit}>
// //         {" "}
// //         {/* Handle form submission */}
// //         <label>Age</label>
// //         <input
// //           type="number"
// //           placeholder="age"
// //           value={age}
// //           onChange={(e) => setAge(e.target.value)}
// //         />
// //         <label>Height</label>
// //         <input
// //           type="number"
// //           placeholder="height"
// //           value={height}
// //           onChange={(e) => setHeight(e.target.value)}
// //         />
// //         <label>Weight</label>
// //         <input
// //           type="number"
// //           placeholder="weight"
// //           value={weight}
// //           onChange={(e) => setWeight(e.target.value)}
// //         />
// //         <button type="submit">Add</button> {/* Submits the form */}
// //       </form>
// //     </div>
// //   );
// // };

// // export default AnthropometricsView;

// "use client";

// import React, { useState } from "react";
// import { useAuth } from "@/contexts/AuthenticationContext";
// import { db } from "@/config/firebase.config";
// import { doc, setDoc } from "firebase/firestore";

// export interface IUserProfile {
//   age: number;
//   weight: {
//     value: number;
//     unit: "kg" | "lbs";
//   };
//   height: {
//     value: number;
//     unit: "cm" | "feet";
//   };
// }

// const AnthropometricsView = () => {
//   const { user } = useAuth();
//   const [age, setAge] = useState<number>(0);
//   const [height, setHeight] = useState<number>(0);
//   const [weight, setWeight] = useState<number>(0);
//   const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Ensure user is authenticated
//     if (!user?.uid) {
//       console.error("User is not authenticated");
//       return;
//     }

//     setUserProfiles([...userProfiles, { age, height, weight }]);

//     const docRef = doc(db, "users", user.uid);

//     try {
//       await setDoc(
//         docRef,
//         { isNewUser: false, age: age, height: height, weight: weight },
//         { merge: true }
//       );

//       console.log("Updated isNewUser to false for UID:", user.uid);
//     } catch (error) {
//       console.error("Error updating user document:", error);
//     }

//     // Reset the form
//     setAge(0);
//     setHeight(0);
//     setWeight(0);
//   };

//   console.log(userProfiles, "the profile");

//   return (
//     <div>
//       <h2>AnthropometricsView</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Age</label>
//         <input
//           type="number"
//           placeholder="age"
//           value={age}
//           onChange={(e) => setAge(Number(e.target.value))} // Convert input value to a number
//         />
//         <label>Height</label>
//         <input
//           type="number"
//           placeholder="height"
//           value={height}
//           onChange={(e) => setHeight(Number(e.target.value))} // Convert input value to a number
//         />
//         <label>Weight</label>
//         <input
//           type="number"
//           placeholder="weight"
//           value={weight}
//           onChange={(e) => setWeight(Number(e.target.value))} // Convert input value to a number
//         />
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// };

// export default AnthropometricsView;

"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthenticationContext";
import { db } from "@/config/firebase.config";
import { doc, setDoc } from "firebase/firestore";

export interface IUserProfile {
  age?: number;
  weight: {
    value: number;
    unit: "kg" | "lbs";
  };
  height: {
    value: number;
    unit: "cm" | "feet";
  };
}

const AnthropometricsView = () => {
  const { user } = useAuth();
  const [age, setAge] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [heightUnit, setHeightUnit] = useState<"cm" | "feet">("cm"); // To track the height unit
  const [weight, setWeight] = useState<number>(0);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg"); // To track the weight unit
  const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure user is authenticated
    if (!user?.uid) {
      console.error("User is not authenticated");
      return;
    }

    const updatedProfile: IUserProfile = {
      age,
      weight: {
        value: weight,
        unit: weightUnit,
      },
      height: {
        value: height,
        unit: heightUnit,
      },
    };

    setUserProfiles([...userProfiles, updatedProfile]);

    const docRef = doc(db, "users", user.uid);

    try {
      await setDoc(
        docRef,
        {
          isNewUser: false,
          age,
          height: updatedProfile.height,
          weight: updatedProfile.weight,
        },
        { merge: true }
      );

      console.log("Updated isNewUser to false for UID:", user.uid);
    } catch (error) {
      console.error("Error updating user document:", error);
    }

    // Reset the form
    setAge(0);
    setHeight(0);
    setWeight(0);
  };

  console.log(userProfiles, "the profile");

  return (
    <div>
      <h2>AnthropometricsView</h2>
      <form onSubmit={handleSubmit}>
        <label>Age</label>
        <input
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))} // Convert input value to a number
        />
        <label>Height</label>
        <input
          type="number"
          placeholder="height"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))} // Convert input value to a number
        />
        {/* Optional: Add unit selection for height */}
        <select
          value={heightUnit}
          onChange={(e) => setHeightUnit(e.target.value as "cm" | "feet")}
        >
          <option value="cm">cm</option>
          <option value="feet">feet</option>
        </select>

        <label>Weight</label>
        <input
          type="number"
          placeholder="weight"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))} // Convert input value to a number
        />
        {/* Optional: Add unit selection for weight */}
        <select
          value={weightUnit}
          onChange={(e) => setWeightUnit(e.target.value as "kg" | "lbs")}
        >
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AnthropometricsView;
