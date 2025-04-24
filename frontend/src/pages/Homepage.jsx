import React from "react";
import Herobanner from "../components/Herobanner";
import KeyboardIntroduction from "../components/KeyboardIntroduction";

function Homepage() {
  return (
    <div className="bg-white flex flex-col">
      <Herobanner />
      <KeyboardIntroduction />
    </div>
  );
}

export default Homepage;
