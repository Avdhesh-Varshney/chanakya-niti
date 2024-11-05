
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

const useGitHubOauth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    const code = urlParams.get("code");

    if (code) {
      const getGithubUser = async () => {
        try {
          const res = await axios.get(
            `${BACKEND_URL}/api/auth/github?code=${code}`
          );
          const resData =await res.data;
          const token = new URLSearchParams(resData).get("access_token");

           const response = await axios.get(
             `${BACKEND_URL}/api/auth/github/getUser`,
             {
               headers: {
                 Authorization:
                   "Bearer " + token,
               },
             }
           );
           const { name, email } = await response.data.user;
           localStorage.setItem(
             "user-info",
             JSON.stringify({
               name: name,
               email: email,
             })
            );
         
      
        } catch (error) {
          console.log("GitHub Authentication Error:", error);
        }
      };
      getGithubUser();
         navigate("/");
    }
  }, [navigate]);

  const githubLoginSignup = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
    );
  };

  return { githubLoginSignup };
};

export default useGitHubOauth;
