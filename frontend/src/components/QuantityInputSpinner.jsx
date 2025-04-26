import React, { useState } from "react";

function QuantityInputSpinner() {
  const [quantity, setQuantity] = useState(0);
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <form class="max-w-xs mx-auto">
      <div class="relative flex items-center">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="counter-input"
          class="shrink-0 bg-gray-100  hover:bg-[var(--primary-color)] inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
          onClick={handleDecrement}
        >
          <svg
            class="w-2.5 h-2.5 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
          </svg>
        </button>
        <input
          type="text"
          id="counter-input"
          data-input-counter
          class="shrink-0 text-gray-900  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
          placeholder=""
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          required
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="counter-input"
          class="shrink-0 bg-gray-100 hover:bg-[var(--primary-color)] inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
          onClick={handleIncrement}
        >
          <svg
            class="w-2.5 h-2.5 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default QuantityInputSpinner;
