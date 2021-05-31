import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
export const Navbar = () => {
  const [searchHeader, setSearchHeader] = useState(false);
  return (
    <>
      {!searchHeader && (
        <nav className="navbar">
          <Link to="/">
            <div className="nav__brand">
              <h3 className="navbrand__head">SportTube</h3>
            </div>
          </Link>
          <div className="input nav__search">
            <i className="fas fa-search"></i>
            <input type="text" className="inputT" placeholder="search" />
          </div>
          <div className="navItems">
            <div className="search_icon" onClick={() => setSearchHeader(true)}>
              <i className="fas fa-search search"></i>
            </div>
            <Link to="/user">
              <i className="far fa-user-circle"></i>
            </Link>
          </div>
        </nav>
      )}
      {searchHeader && (
        <nav className="navbar">
          <div className="backToHome" onClick={() => setSearchHeader(false)}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="input nav__search mobile">
            <i className="fas fa-search"></i>
            <input type="text" className="inputT" placeholder="search" />
          </div>
        </nav>
      )}
    </>
  );
};
