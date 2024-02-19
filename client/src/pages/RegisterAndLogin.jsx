import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../styles/register.css";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function RegisterAndLogin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  const [isLoginOrRegister, setIsloginOrRegister] = useState("login");

  const handlSubmit = async (e) => {
    e.preventDefault();
    const url = isLoginOrRegister === 'register' ? '/register' : '/login'
    const payload = isLoginOrRegister === 'register' ? { username, email, password } : { username, password };
    const { data } = await axios.post(url, payload);
    setLoggedInUsername(username);
    setId(data.id);
  };
  return (
    <>
      {isLoginOrRegister === "register" ? (
        <div className="container">
          <section className="form-section">
            <form onSubmit={handlSubmit}>
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
              <button type="submit">
                {isLoginOrRegister === "register" ? "Register" : "Login"}
              </button>

              <p>
                Already have an account?&nbsp;&nbsp;
                <button
                  className="switch"
                  onClick={(e) => setIsloginOrRegister("login")}
                >
                  Login
                </button>
              </p>
            </form>
          </section>
        </div>
      ) : (
        <div className="container">
          <section className="form-section">
            <form onSubmit={handlSubmit}>
              <h1>M-Chat Login</h1>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <button type="submit">
                {isLoginOrRegister === "login" ? "Login" : "Register"}
              </button>

              <p>
                Don't have an account?&nbsp;&nbsp;
                <button
                  className="switch"
                  onClick={() => setIsloginOrRegister("register")}
                >
                  Register
                </button>
              </p>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default RegisterAndLogin;
