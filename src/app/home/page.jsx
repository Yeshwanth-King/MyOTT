import React from "react";
import Navbar from "../components/NavBar";
import TopMovie from "../components/TopMovie";
import RecentlyAdded from "../components/RecentlyAdded";

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <div className="p-6 lg:p-0">
        <TopMovie />
        <h1 className="text-3xl font-bold text-white">Recently Added</h1>
        <RecentlyAdded />
      </div>
    </div>
  );
};

export default Home;
