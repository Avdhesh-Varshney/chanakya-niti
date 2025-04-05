import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  // Background and text color based on collapse state
  // const bgColor = isCollapsed
  //   ? isDarkMode
  //     ? "rgba(223, 223, 176)"
  //     : "rgba(223, 223, 176)"
  //   : isDarkMode
  //     ? "rgba(223, 223, 176)"
  //     : "rgba(223, 223, 176)";
  // const textColor = isCollapsed
  //   ? isDarkMode
  //     ? "#000000a6"
  //     : "#000000a6"
  //   : isDarkMode
  //     ? "#000000a6"
  //     : "#000000a6";

  return (
    <>
      <nav className="navbar bg-[#dfdfb0]">
        <Link to="/" className="flex items-center gap-2">
          <img src="logo.webp" alt="Chanakya Image" className="me-2 w-12 h-12" />
          <span className="text-2xl font-bold">
            चाणक्य नीति
          </span>
        </Link>

      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
