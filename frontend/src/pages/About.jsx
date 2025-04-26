import React from "react";
import AboutBanner from "../components/AboutBanner";
import AboutMissionSection from "../components/AboutMissionSection";
import AboutWhySection from "../components/AboutWhySection";

function About() {
  return (
    <div className="bg-white flex flex-col">
      <AboutBanner />
      <AboutMissionSection />
      <AboutWhySection />
    </div>
  );
}

export default About;
