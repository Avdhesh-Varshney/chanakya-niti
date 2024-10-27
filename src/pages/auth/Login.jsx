// src/pages/auth/Login.jsx (or equivalent file)

import { useContext } from "react";
import { Context } from "../../context/Context"; // Adjust import path if needed

const Login = () => {
  const { isDarkMode } = useContext(Context);

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="card-container">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn-signin">Sign In</button>
        </form>
        <div className="forgot-password mt-4">
          <span>Forgot Password?</span>
          <span>Sign up</span>
        </div>
        <div className="login-options mt-6">
          <i className="fab fa-google"></i> {/* Google Icon */}
          <i className="fab fa-x-twitter"></i> {/* Twitter Icon */}
          <i className="fab fa-github"></i> {/* GitHub Icon */}
        </div>
      </div>
    </div>
  );
};

export default Login;
