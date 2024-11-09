import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useXTwitterOauth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== `${BACKEND_URL}`) return;

      const { token, user } = event.data;

      if (token) {
        if(localStorage.getItem("gh-access-token")!==null){localStorage.removeItem("gh-access-token");}; // Remove GitHub token if present
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            name: user.name,
            email: user.email,
            x_username: user.x_username,
            token: token,
          })
        );
        navigate("/");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate]);

  const xTwitterLoginSignup = () => {
    window.open(
      `${BACKEND_URL}/api/auth/x_twitter`,
      "_blank",
      "width=600,height=700"
    );
  };

  return { xTwitterLoginSignup };
};

export default useXTwitterOauth;