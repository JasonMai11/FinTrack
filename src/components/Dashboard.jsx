import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const Dashboard = () => {
    const [firstName, setFirstName] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();

    const fetchUserFirstName = async (uid) => {
        const db = getFirestore();
        const userRef = doc(db, "users", uid);
        try {
          const userDoc = await getDoc(userRef);
    
          if (userDoc.exists()) {
            setFirstName(userDoc.data().firstName);
          } else {
            console.log("No user data found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
        }
      };

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(user.uid);
            fetchUserFirstName(user.uid);
            setUsername(user.displayName);
            
          } else {
            navigate("/login");
          }
        });
    
        return () => {
          unsubscribe();
        };
      }, [auth, navigate]);

    return (
        <>
            <h2>Welcome {firstName || username}</h2>
        </>
    );

};


export default Dashboard;