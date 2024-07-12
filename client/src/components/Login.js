import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm.js";
import "../css/Login.css";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="full-page-container">
      <div className="login-container">
        <h1 className="login-header">{showLogin ? "Login" : "Sign Up"}</h1>
        {showLogin ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <RegisterForm onLogin={onLogin} />
        )}
        <button className='login-button' onClick={() => setShowLogin((show) => !show)}>
          {showLogin ? "Sign Up" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;