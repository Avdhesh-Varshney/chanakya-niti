import { ThemeContext } from '../../App';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {FaSun,FaMoon} from 'react-icons/fa6'
const Navbar = () => {
  let {theme,toggleTheme}=useContext(ThemeContext)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-2 rounded">
      <div className="container-fluid">
        {/* Attach logo of website */}
        <Link className="navbar-brand" to="/">चाणक्य नीति</Link>

        <button
          className="navbar-toggler"
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
            <li className="nav-item"><Link className="nav-link" aria-current="page" to="/">Home</Link></li>
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
            
            <li className="nav-item">
              <Link className="nav-link" to="/auth/SignIn">
                <button type='button' className='btn btn-outline-light'>Sign In</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth/SignUp">
                <button type='button' className='btn btn-light'>Sign Up</button>
              </Link>
            </li>
            <li onClick={toggleTheme} className='mode'>
              {theme == 'dark' ?<FaSun style={{color:"white"}}/>:<FaMoon style={{color:"white"}}/> }</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
