import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../App";

const Navbar = () => {

  const { userAuth: { access_token } } = useContext(UserContext);

  return (
    <>
      <Link to="/" className="flex items-center space-x-2 group">
        <img
          src="logo.webp"
          alt=""
          className="w-10 h-10 transition-transform duration-500 ease-in-out group-hover:rotate-[15deg] group-hover:translate-z-[20px]"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        />

        <span
          className="text-2xl font-bold transition-all duration-500 group-hover:text-[#f39c12] group-hover:scale-110"
          style={{
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.textShadow = "2px 2px 5px rgba(243, 156, 18, 0.8)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.textShadow = "1px 1px 3px rgba(0, 0, 0, 0.3)")
          }
        >
          चाणक्य नीति
        </span>
      </Link>

      {
        !access_token ?
          <div className="flex items-center gap-3 md:gap-6 ml-auto">
            <Link to={'/login'} className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link hidden md:block">
              Register
            </Link>
          </div>
          : ""
      }


    </>
  );
};

export default Navbar;
