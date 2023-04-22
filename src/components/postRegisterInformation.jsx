import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { collection, doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const PostRegisterInformation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  const db = getDatabase();

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setEmail(user.email);
      } else {
        setLoggedIn(false);
        navigate("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (firstName && lastName && dateOfBirth) {
      console.log("All fields have values.");
  
      const user = auth.currentUser;
  
      if (user) {
        console.log("User is logged in:", user);
  
        // Save the user's information to the Firestore Database
        const db = getFirestore();
        const userRef = doc(collection(db, "users"), user.uid);
        
        try {
          await setDoc(userRef, {
            firstName,
            lastName,
            dob: dateOfBirth,
          }, { merge: true });
  
          console.log("Data saved to Firestore.");
        } catch (error) {
          console.error("Error saving data to Firestore:", error);
        }
  
        // Redirect to the main page or the user's dashboard
        console.log("Navigating to /dashboard");
        navigate("/dashboard");
      } else {
        console.log("User is not logged in.");
      }
    } else {
      console.log("Not all fields have values.");
    }
  };
  

  

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      {loggedIn && (
        <>
          <h2>Post Registration Information</h2>
          <p>Logged in as: {email}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <button
              type="submit"
              disabled={!firstName || !lastName || !dateOfBirth}
            >
              Continue
            </button>
          </form>
          <button onClick={handleSkip}>Skip</button>
        </>
      )}
    </div>
  );
};

export default PostRegisterInformation;
