import React from "react";
import Herobanner from "../components/Herobanner";
import KeyboardIntroduction from "../components/KeyboardIntroduction";
import TopCategories from "../components/TopCategories";

function Homepage() {
  return (
    <div className="bg-white flex flex-col">
      <Herobanner />
      <KeyboardIntroduction />
      <TopCategories />
    </div>
  );
}

export default Homepage;
