import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import "../styles/RequiredInformation.scss";


const RequiredInformation = () => {
    const [firstName, setFirstName] = useState("");
    const [username, setUsername] = useState("");
    const [salaryAmount, setSalaryAmount] = useState("");
    const [salaryFrequency, setSalaryFrequency] = useState("");
    const [currentBalance, setCurrentBalance] = useState("");
    const [financialGoal, setFinancialGoal] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (user && salaryAmount && salaryFrequency && currentBalance && financialGoal) {
      const db = getFirestore();
      const userRef = doc(collection(db, "users"), user.uid);

      try {
        await setDoc(
          userRef,
          {
            salaryAmount,
            salaryFrequency,
            currentBalance,
            financialGoal,
          },
          { merge: true }
        );

        console.log("Data saved to Firestore.");
      } catch (error) {
        console.error("Error saving data to Firestore:", error);
      }

      navigate("/dashboard");
    }
  };

  return (
    <div className="required-info-container">
      <h2>Welcome {firstName || username}</h2>
      <h3>Required Information</h3>
      <form onSubmit={handleSubmit} className="required-info-form">
        <div className="salary-container">
          <input
            type="number"
            placeholder="Salary Amount"
            value={salaryAmount}
            onChange={(e) => setSalaryAmount(e.target.value)}
            className="required-info-input salary-input"
          />
          <select
            value={salaryFrequency}
            onChange={(e) => setSalaryFrequency(e.target.value)}
            className="required-info-input salary-frequency"
          >
            <option value="">Select Salary Frequency</option>
            <option value="Hourly">Hourly</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
        <input
          type="number"
          placeholder="Current Balance"
          value={currentBalance}
          onChange={(e) => setCurrentBalance(e.target.value)}
          className="required-info-input"
        />
        <select
          value={financialGoal}
          onChange={(e) => setFinancialGoal(e.target.value)}
          className="required-info-input"
        >
          <option value="">Select Financial Goal</option>
          <option value="Save">Save</option>
          <option value="Maintain">Maintain</option>
          <option value="Unsure">Unsure</option>
        </select>
        <button type="submit" className="required-info-button">
          Submit
        </button>
      </form>
    </div>
  );
  
};


export default RequiredInformation;
