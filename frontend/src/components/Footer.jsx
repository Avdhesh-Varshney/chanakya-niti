const Footer = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-700">
        <div className="flex gap-4 text-gray-500">
          <img
            src="logo.webp"
            alt=""
            className="w-10 h-10 transition-transform duration-500 ease-in-out group-hover:rotate-[15deg] group-hover:translate-z-[20px]"
          />

          <span
            className="text-2xl font-bold transition-all duration-500 group-hover:text-[#f39c12] group-hover:scale-110"
          >
            चाणक्य नीति
          </span>
        </div>

        <div className="text-center sm:text-left">
          &copy; 2024–{new Date().getFullYear()} <span className="font-semibold">Chanakya Niti</span>. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
