import React from "react";
import {
  Home,
  Player,
  WatchLater,
  LikedVideos,
  Playlists,
  PlaylistDetails,
  User,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos/:videoId" element={<Player />} />
        <Route path="/watchLater" element={<WatchLater />} />
        <Route path="/likedvideos" element={<LikedVideos />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:playlistId" element={<PlaylistDetails />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
