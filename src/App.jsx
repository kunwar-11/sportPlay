import React from "react";
import {
  Home,
  Player,
  WatchLater,
  LikedVideos,
  Playlists,
  PlaylistDetails,
  User,
  Login,
  Signup,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { PrivateRoute } from "./util";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos/:videoId" element={<Player />} />
        <PrivateRoute path="/watchLater" element={<WatchLater />} />
        <PrivateRoute path="/likedvideos" element={<LikedVideos />} />
        <PrivateRoute path="/playlists" element={<Playlists />} />
        <PrivateRoute
          path="/playlists/:playlistId"
          element={<PlaylistDetails />}
        />
        <PrivateRoute path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
