import React from "react";
import Navbar from "../components/NavBar";
import TopMovie from "../components/TopMovie";

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <TopMovie />
    </div>
  );
};

export default Home;
