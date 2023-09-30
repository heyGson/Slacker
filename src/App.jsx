import { useState, useEffect } from "react";
import Login from "./components/Login/Login-component";
import Register from "./components/Register/Register-component";
import Workspace from "./components/Dashboard/Workspace/Workspace-component";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [userEmail, setUserEmail] = useState(""); // State to store the user's email

  // Function to set the user's email when they log in
  const handleLogin = (email) => {
    setUserEmail(email);
  };

  // Use useEffect to retrieve the email from localStorage on component initialization
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/workspace"
          element={<Workspace userEmail={userEmail} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
