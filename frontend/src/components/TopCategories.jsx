import React from "react";
import { assets } from "../assets/assets";
import CategoryCard from "./CategoryCard";

function TopCategories() {
  const kit_image = assets.category_card_image_kit;
  const keycaps_image = assets.category_card_image_keycaps;
  const switches_image = assets.category_card_image_switches;
  const accessories_image = assets.category_card_image_accessories;

  return (
    <div className="px-12 py-12 flex flex-col items-center">
      <div id="top-categories-header" className="flex flex-col py-12 items-center">
        <div className="text-3xl font-bold font-title text-[var(--dark-black)] flex justify-center">Top Categories</div>
      </div>
      <div className="grid grid-cols-2 gap-8 pb-[10%] md:grid md:grid-cols-4">
        <CategoryCard categoryCardImage={kit_image} categoryName="Kits" />
        <CategoryCard categoryCardImage={keycaps_image} categoryName="Keycaps" />
        <CategoryCard categoryCardImage={switches_image} categoryName="Switches" />
        <CategoryCard categoryCardImage={accessories_image} categoryName="Others" />
      </div>
    </div>
  );
}

export default TopCategories;
