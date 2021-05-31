import React from "react";
import {
  Home,
  WatchLater,
  PlaylistAdd,
  ThumbUp,
  Person,
} from "@material-ui/icons";
import "../styles/footerbar.css";
import { NavLink } from "react-router-dom";
export const FooterBar = () => {
  return (
    <div className="footerBar">
      <NavLink to="/" activeClassName="activePill" end>
        <Home />
      </NavLink>
      <NavLink to="/watchlater" activeClassName="activePill">
        <WatchLater />
      </NavLink>
      <NavLink to="/user" activeClassName="activePill">
        <Person />
      </NavLink>
      <NavLink to="/playlists" activeClassName="activePill">
        <PlaylistAdd />
      </NavLink>
      <NavLink to="/likedvideos" activeClassName="activePill">
        <ThumbUp />
      </NavLink>
    </div>
  );
};
