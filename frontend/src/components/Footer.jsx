import { NavLink } from "react-router-dom";
import Visitors from "./shared/Visitors";
import {
  FaGithub,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
} from "react-icons/fa";
import Tilt from "react-parallax-tilt";

const Footer = () => {
  return (
    <footer className="bg-[#dfdfb060] pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo + GitHub + Visitors */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Tilt>
              <img src="logo.webp" height="200" alt="Chanakya Image" className="w-40" />
            </Tilt>
            <figcaption className="text-center text-black font-semibold text-xl">
              चाणक्य नीति
            </figcaption>

            <a
              href="https://github.com/Avdhesh-Varshney/chanakya-niti"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:scale-105 transform transition duration-300"
            >
              <FaGithub /> Star Us ⭐
            </a>

            <Visitors />
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-bold text-black mb-3">चाणक्य नीति</h3>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/"
                  className="flex items-center gap-2 text-black hover:text-yellow-600 transition-transform transform hover:scale-105"
                >
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth/login"
                  className="flex items-center gap-2 text-black hover:text-yellow-600 transition-transform transform hover:scale-105"
                >
                  <FaSignInAlt /> Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Feedback"
                  className="flex items-center gap-2 text-black hover:text-yellow-600 transition-transform transform hover:scale-105"
                >
                  <FaInfoCircle /> Feedback
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8 text-center text-black text-sm">
          &copy; {new Date().getFullYear()} Chanakya Niti. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
