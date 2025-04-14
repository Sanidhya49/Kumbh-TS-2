import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import logo from '../assets/umbh-ts.png';

const Navbar = ({ theme, toggleTheme, scrolled }) => {
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} sticky-top`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} width="150" alt="Logo" />
        </Link>

        <ul className="navbar-nav ms-auto mb-2 mb-lg-2 d-flex flex-row align-items-center">
          <li><Link className="nav-link" to="/signup">Sign Up</Link></li>
          <li><Link className="nav-link" to="/login">Log In</Link></li>
          {/* <li className="nav-item mx-2"><Link className="nav-link" to="/journey">Plan Journey</Link></li>
          <li className="nav-item mx-2"><Link className="nav-link" to="/profile">Edit Profile</Link></li> */}
          <li>
            <button className="btn btn-svg" onClick={toggleTheme}>
              {theme === 'day' ? <IoMdMoon /> : <IoSunny />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;