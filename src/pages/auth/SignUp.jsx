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

const URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//github client id
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

const SignUp = () => {
  const [name, setName] = useState("");
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
      const response = await axios.post(URL, { name, email, password });
      if (response.data.success) {
        setSuccess("User created successfully!");
        window.location.href = "/auth/login";
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  const navigate = useNavigate();
  //oauth handlers
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
  const googleSignUp = useGoogleLogin({
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
          `${BACKEND_URL}api/auth/github?code=` + code
        );
        const resD = await res.data;
        const token = new URLSearchParams(resD).get("access_token");
        if (token) {
          localStorage.setItem("gh_access_token", token);
        }
      }
      getGithubAccessToken();
    } else if (code && localStorage.getItem("gh_access_token")) {
      const getGhUser = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}api/auth/github/getUser`,
            {
              headers: {
                Authorization:
                  "Bearer " + localStorage.getItem("gh_access_token"),
              },
            }
          );
          const user = await response.data.user;
          localStorage.setItem("user-info", JSON.stringify(user));
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };
      getGhUser();
    }
  }, []);

  const SignUpWithGh = async () => {
    try {
      window.location.assign(
        `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  //

  return (
    <div className="form-container mb-4">
      <p className="title">Sign Up</p>

      <form className="form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="input-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
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
              placeholder="Enter your password"
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
        </div>

        <button type="submit" className="sign mt-3">
          Sign Up
        </button>
      </form>

      <div className="social-message">
        <div className="line"></div>
        <p className="message">Sign up with social accounts</p>
        <div className="line"></div>
      </div>

      <div className="social-icons">
        <button
          aria-label="Sign up with Google"
          className="icon"
          onClick={googleSignUp}
        >
          <FaGoogle />
        </button>
        <button aria-label="Sign up with Twitter" className="icon">
          <FaXTwitter />
        </button>
        <button
          aria-label="Sign up with GitHub"
          className="icon"
          onClick={SignUpWithGh}
        >
          <FaGithub />
        </button>
      </div>
    </div>
  );
};

export default SignUp;
