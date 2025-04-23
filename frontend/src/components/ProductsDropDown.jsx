import React from "react";

function ProductDropDown() {
  return (
    <div>
      <div
        id="mega-menu-full-dropdown"
        class="mt-1 shadow-xs bg-[var(--dark-black)] md:bg-[var(--dark-black)] border-y"
      >
        <div class="grid max-w-screen-xl px-4 py-5 mx-auto text-[var(--primary-color)] sm:grid-cols-4 md:px-6">
          <ul id="kit-menu-header">
            <a href="#" class="cursor-pointer">
              <h3 className="font-bold font-title pr-3 border-b-2 inline py-1">KIT</h3>
            </a>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Layout 60%-65%</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Layout 75%</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Layout TKL</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Layout Fullsize</div>
              </a>
            </li>
          </ul>
          <ul id="switch-menu-header">
            <a href="#" class="cursor-pointer">
              <h3 className="font-bold font-title pr-3 border-b-2 inline py-1">SWITCH</h3>
            </a>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Clacky Switch</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Tackle Switch</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Linear Switch</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Slient Switch</div>
              </a>
            </li>
          </ul>
          <ul id="keycap-menu-header">
            <a href="#" class="cursor-pointer">
              <h3 className="font-bold font-title pr-3 border-b-2 inline py-1">KEYCAP</h3>
            </a>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Profile Cherry Keycap</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Profile SA Keycap</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Profile OEM Keycap</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Profile XDA Keycap</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Các Profile Khác</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">GMK/WS Keycap</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Artisan Keycap</div>
              </a>
            </li>
          </ul>
          <ul id="others-menu-header">
            <a href="#" class="cursor-pointer">
              <h3 className="font-bold font-title pr-3 border-b-2 inline py-1">SẢN PHẨM KHÁC</h3>
            </a>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Phụ Kiện Bàn Phím</div>
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 rounded-lg hover:bg-[var(--light-black)]">
                <div class="text-[var(--grey)]">Bàn Phím Prebuilt</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDropDown;
