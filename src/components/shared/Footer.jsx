import React from "react";
import "../../css/Footer.css";
import { NavLink } from "react-router-dom";
import Visitors from "./Visitors";

const Footer = () => (
  <footer className="page-footer font-small blue pt-4 mb-4">
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-4 mt-md-0 mt-3 d-flex flex-row niti">
          <img
            src="/logo.webp"
            height="220"
            alt="footer logo"
            className="pt-4"
          />
          <div>
            <h5 className="pt-5 m-0 mt-2 fw-bolder fs-1 mb-3">चाणक्य नीति</h5>
            <a href="https://github.com/Avdhesh-Varshney/chanakya-niti" target="_blank" className="text-white bg-dark p-2 rounded text-decoration-none">Star Us ⭐</a>
            <Visitors />
          </div>
        </div>

        <div className="col-md-4 mt-md-0 mt-3 size">
          <div className="socials">
            <h5 className="text-uppercase fw-bold mb-3 hd">SOCIALS</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://github.com/Avdhesh-Varshney" target="_blank" className="text-black text-decoration-none">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/avdhesh-varshney" target="_blank" className="text-black text-decoration-none">LinkedIn</a>
              </li>
              <li>
                <a href="https://twitter.com/AvdheshVarshney" target="_blank" className="text-black text-decoration-none">Twitter</a>
              </li>
              <li>
                <a href="#" target="_blank" className="text-black text-decoration-none">Facebook</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-4 mb-md-0 mb-3 pt-4 d-flex">
          <ul className="list-unstyled ml-4">
            <h5 className="text-uppercase fw-bold mb-3">चाणक्य नीति</h5>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contributor">Contributors</NavLink>
            </li>
            <li>
              <NavLink to="/auth/SignIn">Sign-In</NavLink>
            </li>
          </ul>
        </div>

        <div className="col-md-4 mb-md-0 mb-3 pt-3 pos">
          <h5 className="text-uppercase fw-bold">Resources</h5>
          <ul className="list-unstyled">
            <li>
              <NavLink to="/resources/audio">Audio</NavLink>
            </li>
            <li>
              <NavLink to="/resources/video">Video</NavLink>
            </li>
            <li>
              <NavLink to="/resources/book">Books</NavLink>
            </li>
            <li>
              <NavLink to="/resources/news">News</NavLink>
            </li>
            <li>
              <NavLink to="/resources/quiz">Quiz</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="text-center pt-2">
      <p>&copy; 2024 Chanakya Niti. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
