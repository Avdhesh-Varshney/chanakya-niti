import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Context } from "../../context/Context";
import "../shared/Navbar.css";

import ProgressBar from "./Progressbar";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(Context);
  const [isSticky, setIsSticky] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 50);
  };

   useEffect(() => {
     window.addEventListener("scroll", handleScroll);
     window.addEventListener("load", handleScroll);
     return () => {
       window.removeEventListener("scroll", handleScroll);
       window.removeEventListener("load", handleScroll);
     };
   }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = () => {
    setIsCollapsed(true);
  };

  // Background and text color based on collapse state
  const bgColor = isCollapsed
    ? isDarkMode
      ? "rgba(223, 223, 176)"
      : "rgba(223, 223, 176)"
    : isDarkMode
    ? "rgba(223, 223, 176)"
    : "rgba(223, 223, 176)";
  const textColor = isCollapsed
    ? isDarkMode
      ? "#000000a6"
      : "#000000a6"
    : isDarkMode
    ? "#000000a6"
    : "#000000a6";

  return (
    <>
      <ProgressBar />
      <nav
        className={`navbar navbar-expand-lg ${isSticky ? "fixed-top" : ""} ${
          isDarkMode ? "navbar-dark" : "navbar-light"
        }`}
        id="navbarSupportedContent"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="container p-0">
          <div className="d-flex justify-content-between align-items-center w-100">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img
                src="logo.webp"
                alt="Chanakya Image"
                className="me-2"
                style={{ width: "30px", height: "30px" }}
              />
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: textColor,
                }}
                onClick={handleLinkClick}
              >
                चाणक्य नीति
              </span>
            </Link>

            <div className="d-flex align-items-center">
              <li
                className="nav-item nav-link"
                onClick={toggleTheme}
                style={{
                  cursor: "pointer",
                  marginRight: "1rem",
                  color: textColor,
                }}
              >
                {isDarkMode ? (
                  <MdOutlineLightMode
                    style={{ fontSize: "1.5rem", color: textColor }}
                  />
                ) : (
                  <MdOutlineDarkMode
                    style={{ fontSize: "1.5rem", color: textColor }}
                  />
                )}
              </li>

              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleCollapse}
                aria-controls="navbarSupportedContent"
                aria-expanded={!isCollapsed}
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>

          <div
            className={`collapse navbar-collapse pt-3 ${
              !isCollapsed ? "show" : ""
            }`}
            id="navbarSupportedContent"
          >
            <ul
              className="navbar-nav mb-2 mb-lg-0 px-4 pb-3"
              style={{
                backgroundColor: !isCollapsed
                  ? isDarkMode
                    ? "rgba(223, 223, 176)"
                    : "rgba(223, 223, 176)"
                  : "transparent",
              }}
            >
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/about"
                  style={{ color: textColor }}
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/help"
                  style={{ color: textColor }}
                  onClick={handleLinkClick}
                >
                  Help
                </Link>
              </li>

              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => console.log("Dropdown clicked")}
                  style={{ color: textColor }}
                >
                  Resources
                </button>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/resources/chanakyagpt"
                      style={{ color: textColor }}
                      onClick={handleLinkClick}
                    >
                      ChanakyaGpt
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/resources/audio"
                      style={{ color: textColor }}
                      onClick={handleLinkClick}
                    >
                      Audios
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/resources/book"
                      style={{ color: textColor }}
                      onClick={handleLinkClick}
                    >
                      Books
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/resources/news"
                      style={{ color: textColor }}
                      onClick={handleLinkClick}
                    >
                      News
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/resources/quiz"
                      style={{ color: textColor }}
                      onClick={handleLinkClick}
                    >
                      Quiz
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/resources/video"
                      style={{ color: textColor }}
                      onClick={handleLinkClick}
                    >
                      Videos
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/successstories"
                  style={{ color: textColor }}
                  onClick={handleLinkClick}
                >
                  Success Stories
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/contributor"
                  style={{ color: textColor }}
                  onClick={handleLinkClick}
                >
                  Contributors
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/auth/login"
                  style={{ color: textColor }}
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
