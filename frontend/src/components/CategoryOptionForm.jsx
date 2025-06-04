import React from "react";

function CategoryOptionForm(props) {
  return (
    <form class="mx-auto">
      <label for="categories" class="block mb-2 text-sm font-medium text-gray-900">
        {props.label}
      </label>
      <select
        class="bg-gray-50 border border-gray-300 text-[var-(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      >
        <option selected>Chọn thể loại...</option>
        {props.options ? (
          props.options.map((option, index) => (
            <option key={index} value={option.categoryId}>
              {option.categoryName}
            </option>
          ))
        ) : (
          <option disabled>Không có dữ liệu</option>
        )}
      </select>
    </form>
  );
}

export default CategoryOptionForm;
