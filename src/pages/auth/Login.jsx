import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Auth.css";
import {
  FaGithub,
  FaGoogle,
  FaXTwitter,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";

// for the google oauth
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../../functions/api";

const URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//github client id
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(URL, { email, password });
      if (response.data.success) {
        setSuccess("Login successful!");
        localStorage.setItem("authToken", response.data.authtoken);
        window.location.href = "/";
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  const navigate = useNavigate();
  //oauth handlers

  // login with google
  
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        const { email, name } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, token };
        localStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/");
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  useEffect(() => {
    //to get the github authentication code from the url
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    const code = urlParams.get("code");

    if (code && !localStorage.getItem("gh_access_token")) {
      async function getGithubAccessToken() {
        const res = await axios.get(
          `${BACKEND_URL}/api/auth/github?code=` + code
        );
        const resD = await res.data;
        const token = new URLSearchParams(resD).get("access_token");
        if (token) {
          localStorage.setItem("gh_access_token", token);
        }
      }
      getGithubAccessToken();
      navigate("/");
    }
  }, []);

  //login with github
  const LoginWithGh = async () => {
    try {
      window.location.assign(
        `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  // login with X twitter

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== `${BACKEND_URL}`) return;

      const { token, user } = event.data;

      if (token) {
        if (localStorage.getItem("gh-access-token")) {
          localStorage.removeItem("gh-access-token");
        }

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            name: user.name,
            email:user.email,
            x_username: user.x_username,
            token: token,
          })
        );
        navigate("/");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const LoginWithX = async () => {
    try {
      window.open(
        `${BACKEND_URL}/api/auth/x_twitter`,
        "_blank",
        "width=600,height=700"
      );
    } catch (error) {
      console.log(error);
    }
  };

  //

  return (
    <div className="form-container mb-4">
      <p className="title">Login</p>

      <form className="form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter you email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter you password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="forgot">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>

        <button type="submit" className="sign">
          Sign in
        </button>
      </form>

      <div className="social-message">
        <div className="line"></div>
        <p className="message">Login with social accounts</p>
        <div className="line"></div>
      </div>

      <div className="social-icons">
        <button
          aria-label="Log in with Google"
          className="icon"
          onClick={googleLogin}
        >
          <FaGoogle />
        </button>
        <button
          aria-label="Log in with Twitter"
          className="icon"
          onClick={LoginWithX}
        >
          <FaXTwitter />
        </button>
        <button
          aria-label="Log in with GitHub"
          className="icon"
          onClick={LoginWithGh}
        >
          <FaGithub />
        </button>
      </div>

      <p className="signup">
        Don't have an account?
        <a rel="noopener noreferrer" href="/auth/signup">
          {" "}
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
