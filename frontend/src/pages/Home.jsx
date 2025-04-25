import React from "react";
import HeroBanner from "../components/HeroBanner";
import KeyboardIntroduction from "../components/KeyboardIntroduction";
import TopCategories from "../components/TopCategories";

function Home() {
  return (
    <div className="bg-white flex flex-col">
      <HeroBanner />
      <KeyboardIntroduction />
      <TopCategories />
    </div>
  );
}

export default Home;
