import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserDetails from "./component/UserDetails";
import Review from "./component/Review";
import { getValueFromLocalStorage } from "./utilities/localStorage";

function App() {
  const initialDetails = {
    FirstName: getValueFromLocalStorage("FirstName", ""),
    LastName: getValueFromLocalStorage("LastName", ""),
    PhoneNumber: getValueFromLocalStorage("PhoneNumber", ""),
    Address: getValueFromLocalStorage("Address", ""),
    Pokemon: getValueFromLocalStorage("Pokemon", ""),
  };

  const [userDetails, setUserDetails] = useState(initialDetails);

  const handleUserInputs = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    localStorage.setItem(name, value);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UserDetails
              users={userDetails}
              handleUserInputs={handleUserInputs}
            />
          }
        ></Route>
        <Route path="review" element={<Review users={userDetails} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
