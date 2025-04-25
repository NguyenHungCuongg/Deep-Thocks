import React from "react";

function CategoryCard(props) {
  return (
    <div className="lg:w-80 md:w-50 w-40">
      <a className="cursor-pointer" href={`/categories/${props.categoryName.toLowerCase()}/products`}>
        <figure className="px-10 pt-10">
          <img
            src={props.categoryCardImage}
            alt={props.categoryName}
            className="rounded-full hover:scale-105 transition duration-200 ease-in-out"
          />
        </figure>
        <div className="items-center text-center py-8">
          <h2 className="text-gray-700 hover:text-[var(--dark-black)]">{props.categoryName}</h2>
        </div>
      </a>
    </div>
  );
}

export default CategoryCard;
