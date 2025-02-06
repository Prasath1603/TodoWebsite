import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      console.log(response.data);
      navigate("/home");  // Navigate only after successful login
    } catch (err) {
      setError("Invalid username or password");  // Better error message
    }
  };

  const handleSignup = async () =>{
    try{
        const response = await axios.post("http://localhost:5000/signup", {
            username , password
        });

        console.log("New user added");
        navigate("/home");
    }
    catch(err){
        setError("Unable to add new user");
    }
  }
  return (
    <div>
      <header>Welcome to ToDo</header>
      <p>Login to Continue!</p>
      <div className="login-form">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <button className="signup-btn" onClick={handleSignup} >Signup</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
