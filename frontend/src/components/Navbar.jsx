import { Link } from "react-router-dom";

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
      <nav className="navbar bg-[#dfdfb0]" id="navbarSupportedContent">
        <div className="p-0">
          <div className="flex flex-col justify-content-between align-items-center w-100">

            <Link to="/">
              <img src="logo.webp" alt="Chanakya Image" className="me-2 w-[30px] h-[30px]" />
              <span className="text-[1.2rem] font-bold">
                चाणक्य नीति
              </span>
            </Link>

          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
