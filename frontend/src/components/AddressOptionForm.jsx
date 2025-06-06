import React from "react";

function AddressOptionForm(props) {
  return (
    <form class="mx-auto">
      <label for="adress" class="block mb-2 text-sm font-medium text-gray-500">
        {props.label}
      </label>
      <select
        class="bg-gray-50 border border-gray-300 text-[var-(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
        value={props.value || ""}
        onChange={props.onChange}
        disabled={props.disabled}
      >
        <option selected>Chọn...</option>
        {props.options ? (
          props.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))
        ) : (
          <option disabled>Không có dữ liệu</option>
        )}
      </select>
    </form>
  );
}

export default AddressOptionForm;
