import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Context } from '../../context/Context';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(Context);
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) setIsSticky(true);
    else setIsSticky(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${isSticky ? 'mt-2 fixed-top' : ''} ${isDarkMode ? 'navbar-dark' : 'navbar-light'}`} style={{ backgroundColor: `${isDarkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(223, 223, 176, 0.4)'}` }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="logo.webp" alt="Chanakya Image" className="me-2" style={{ width: '30px', height: '30px' }} />
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>चाणक्य नीति</span>
        </Link>

        <button className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Resources
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/resources/audio">Audios</Link></li>
                <li><Link className="dropdown-item" to="/resources/video">Videos</Link></li>
                <li><Link className="dropdown-item" to="/resources/book">Books</Link></li>
                <li><Link className="dropdown-item" to="/resources/news">News</Link></li>
                <li><Link className="dropdown-item" to="/resources/quiz">Quiz</Link></li>
              </ul>
            </li>

            <li className="nav-item"><Link className="nav-link" to="/contributor">Contributors</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/auth/login">Login</Link></li>

            <li className='nav-item nav-link' onClick={toggleTheme} style={{ cursor: 'pointer' }}>
              {isDarkMode ? (
                <MdOutlineLightMode style={{ fontSize: '1.5rem', color: 'white' }} />
              ) : (
                <MdOutlineDarkMode style={{ fontSize: '1.5rem', color: 'black' }} />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
