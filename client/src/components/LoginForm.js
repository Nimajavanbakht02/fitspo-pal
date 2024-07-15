import React, { useState } from "react";
import "../styles/LoginForm.css";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else if (r.status === 401) {
        r.json().then((err) => setErrors(err.errors));
      } else {
        alert("Something went wrong. Please try again.");
        }
    });
  }

  function toggleShowPassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="username">Username</label>
        <input
          className="form-input"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">Password</label>
        <input
          className="form-input"
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="button" className="toggle-password-button" onClick={toggleShowPassword}>
          {showPassword ? "Hide" : "Show"} Password
        </button>
      </div>
      <div className="form-group">
        <button className="form-button" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
