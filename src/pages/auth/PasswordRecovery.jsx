import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FORGOT_PASSWORD_URL = `${
  import.meta.env.VITE_BACKEND_URL
}/api/auth/forgot-password`;

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(FORGOT_PASSWORD_URL, { email });
      if (response.data.success) {
        setSuccess("Password reset link sent to your email!");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className='form-container mb-4'>
      <p className='title'>Password Recovery</p>
      <form className='form' onSubmit={handleForgotPassword}>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}
        <div className='input-group'>
          <label htmlFor='forgot-email'>Email</label>
          <input
            type='email'
            name='forgot-email'
            id='forgot-email'
            placeholder='Enter your email'
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "1rem" }} // Add margin-bottom for spacing
          />
        </div>
        <button type='submit' className='sign'>
          Reset Password
        </button>
      </form>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        <Link
          to='/auth/login'
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          Back to Login
        </Link>
      </p>
    </div>
  );
};

export default PasswordRecovery;
