import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../styles/register.css";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);

  const register = async (e) =>{
    e.preventDefault();
    const {data} = await axios.post('/register', {username, email, password});
    setLoggedInUsername(username);
    setId(data.id);
  }
  return (
    <div className="container">
      <section className="form-section">
        <form onSubmit={register}>
          <h1>M-Chat SignUp</h1>
          <input
            type="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            name="username"
            id="username"
            placeholder="Username"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            id="email"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            id="password"
            placeholder="Password"
          />
          <input type="submit" value="Register" />

          <p>
            Already have an account?&nbsp;&nbsp;<a href="#">Login</a>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Register;
