import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Context } from "../../context/Context";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(Context);
  const [isCollapsed, setIsCollapsed] = useState(true);

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
      <nav className="navbar bg-[#dfdfb0]" id="navbarSupportedContent">
        <div className="p-0">
          <div className="flex flex-col justify-content-between align-items-center w-100">

            <Link to="/">
              <img src="logo.webp" alt="Chanakya Image" className="me-2 w-[30px] h-[30px]" />
              <span className="text-[1.2rem] font-bold" onClick={handleLinkClick}>
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

        </div>
      </nav>
    </>
  );
};

export default Navbar;
