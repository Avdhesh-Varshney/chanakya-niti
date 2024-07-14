import React, { useState } from 'react';
import '../../css/signin.css';
import { FaGithub, FaGoogle, FaTwitter, FaEye, FaEyeSlash } from 'react-icons/fa6';

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div class="form-container">
        <p class="title">Sign Up</p>
        <form class="form">
          <div class="input-group">
            <label for="username">Username</label>
            <input type="text" name="username" id="username" placeholder="" />
          </div>
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="" />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <div class="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder=""
              />
              <button
                type="button"
                class="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div class="forgot">
              <a rel="noopener noreferrer" href="#">Forgot Password?</a>
            </div>
          </div>
          <button class="sign">Sign Up</button>
        </form>
        <div class="social-message">
          <div class="line"></div>
          <p class="message">Sign Up with social accounts</p>
          <div class="line"></div>
        </div>
        <div class="social-icons">
          <button aria-label="Sign Up with Google" class="icon">
            <FaGoogle />
          </button>
          <button aria-label="Sign Up with Twitter" class="icon">
            <FaGithub />
          </button>
          <button aria-label="Sign Up with GitHub" class="icon">
            <FaTwitter />
          </button>
        </div>
        <p class="signup">Already have an account?
          <a rel="noopener noreferrer" href="/auth/Signin" class="">Sign in</a>
        </p>
      </div>
    </>
  );
}

export default SignUp;

