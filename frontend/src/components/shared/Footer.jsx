import { NavLink } from "react-router-dom";
import Visitors from "./Visitors";
import {
  FaGithub,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
} from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import "../../css/Footer.css";

const Footer = () => {
  return (
    <footer
      className="footer font-small pt-4"
      style={{
        backgroundColor: `${
          "rgba(223, 223, 176, 0.4)"
        }`,
      }}
    >
      <div className="container pt-2">
        <div className="row">
          <div className="col-md-6 d-lg-flex">
            <figure className="figure d-flex flex-column align-items-center">
              <Tilt>
                <img src="logo.webp" height="200" alt="Chanakya Image" />
              </Tilt>
              <figcaption
                className="figure-caption text-center mt-2"
                style={{ color: "black" }}
              >
                चाणक्य नीति
              </figcaption>
            </figure>

            <div className="my-auto star-btn d-flex flex-column align-items-center">
              <a
                href="https://github.com/Avdhesh-Varshney/chanakya-niti"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-dark p-2 rounded text-decoration-none d-inline-block"
              >
                <FaGithub className="me-2" /> Star Us ⭐
              </a>
              <Visitors />
            </div>
          </div>

          <div className="col">
            <h3
              className="text-uppercase fw-bold"
              style={{ color: "black" }}
            >
              चाणक्य नीति
            </h3>
            <ul className="list-unstyled">
              <li>
                <NavLink
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "black" }}
                >
                  <FaHome className="me-2" /> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth/login"
                  className="text-decoration-none"
                  style={{ color: "black" }}
                >
                  <FaSignInAlt className="me-2" /> Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Feedback"
                  className="text-decoration-none"
                  style={{ color: "black" }}
                >
                  <FaInfoCircle className="me-2" /> Feedback
                </NavLink>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div
        className="text-center"
        style={{ color: "black" }}
      >
        <p>
          &copy; {new Date().getFullYear()} Chanakya Niti. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
