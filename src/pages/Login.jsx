import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Login.css";

const Login = ({ setUsername }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        setError("Please enter both email and password.");
        return;
    }

    try {
        const response = await Axios.post("https://backend-server-e651.onrender.com/login", { email, password });

        if (response.data.username && response.data.userId) {  // ✅ Ensure userId is received
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("userId", response.data.userId);  // ✅ Store userId in localStorage

            setUsername(response.data.username); // Update state
            navigate("/"); // Redirect to homepage
        } else {
            setError("Login failed. User ID missing.");
        }
    } catch (error) {
        setError("Invalid credentials. Please try again.");
    }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
