import React from "react";
import { FooterBar, Sidebar, VideoList } from "../components";
import "../styles/home.css";
export const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <VideoList />
      <FooterBar />
    </div>
  );
};
