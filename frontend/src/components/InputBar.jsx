import React from "react";

function InputBar(props) {
  return (
    <div>
      <label class="text-sm text-slate-800 font-medium mb-2 block">{props.label}</label>
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        required
        class="bg-[var(--dark-white)] w-full text-sm px-4 py-3 rounded-md outline-none border focus:border-[var(--primary-color)] focus:bg-transparent"
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default InputBar;
