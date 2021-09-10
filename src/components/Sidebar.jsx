import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar__list list__stack">
        <NavLink to="/" activeClassName="activePill" end>
          <li className="list__stack__item">Home</li>
        </NavLink>
        <NavLink to="/watchlater" activeClassName="activePill">
          <li className="list__stack__item">Watch Later</li>
        </NavLink>
        <NavLink to="/likedvideos" activeClassName="activePill">
          <li className="list__stack__item">Liked Videos</li>
        </NavLink>
        <NavLink to="/playlists" activeClassName="activePill">
          <li className="list__stack__item">Your Playlists</li>
        </NavLink>
      </ul>
    </div>
  );
};
