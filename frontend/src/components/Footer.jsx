import React from "react";

function Footer() {
  return (
    <footer class="w-full">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div class="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <a
              href="/"
              class="flex justify-center lg:justify-start rtl:space-x-reverse text-2xl md:text-3xl font-bold whitespace-nowrap text-[var(--primary-color)] font-title"
            >
              DEEP THOCKS
            </a>
            <p class="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">
              Khách hàng hài lòng là niềm tự hào của chúng tôi – Hãy cùng kiến tạo chiếc bàn phím mơ ước của bạn!
            </p>
            <a
              href="/contact"
              class="py-2.5 px-5 h-9 block w-fit bg-[var(--primary-color)] rounded-full shadow-sm text-xs text-white mx-auto transition-all  duration-500 hover:bg-[var(--light-primary-color)] lg:mx-0"
            >
              Liên hệ
            </a>
          </div>

          <div class="lg:mx-auto text-left ">
            <h4 class="text-lg text-gray-900 font-medium mb-7">Deep Thocks</h4>
            <ul class="text-sm  transition-all duration-500">
              <li class="mb-6">
                <a href="/" class="text-gray-600 hover:text-gray-900">
                  Trang chủ
                </a>
              </li>
              <li class="mb-6">
                <a href="/about" class=" text-gray-600 hover:text-gray-900">
                  Chi tiết
                </a>
              </li>
              <li class="mb-6">
                <a href="/products" class=" text-gray-600 hover:text-gray-900">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="/contact" class=" text-gray-600 hover:text-gray-900">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div class="lg:mx-auto text-left ">
            <h4 class="text-lg text-gray-900 font-medium mb-7">Disclaimer</h4>
            <ul class="text-sm  transition-all duration-500">
              <li class="mb-6">
                <a href="javascript:;" class="text-gray-600 hover:text-gray-900">
                  Deep Thocks là dự án cá nhân
                </a>
              </li>
              <li class="mb-6">
                <a href="javascript:;" class=" text-gray-600 hover:text-gray-900">
                  Các sản phẩm không có sẵn để mua
                </a>
              </li>
            </ul>
          </div>

          <div class="lg:mx-auto text-left">
            <h4 class="text-lg text-gray-900 font-medium mb-7">Resources</h4>
            <ul class="text-sm  transition-all duration-500">
              <li class="mb-6">
                <a href="javascript:;" class="text-gray-600 hover:text-gray-900">
                  FAQs
                </a>
              </li>
              <li class="mb-6">
                <a href="javascript:;" class=" text-gray-600 hover:text-gray-900">
                  Bắt đầu
                </a>
              </li>
              <li class="mb-6">
                <a href="javascript:;" class=" text-gray-600 hover:text-gray-900">
                  Tài liệu
                </a>
              </li>
              <li>
                <a href="javascript:;" class=" text-gray-600 hover:text-gray-900">
                  Hướng dẫn
                </a>
              </li>
            </ul>
          </div>

          <div class="lg:mx-auto text-left">
            <h4 class="text-lg text-gray-900 font-medium mb-7">Credit</h4>
            <ul class="text-sm  transition-all duration-500">
              <li class="mb-6">
                <a href="javascript:;" class="text-gray-600 hover:text-gray-900">
                  Thiết kế và phát triển bởi Nguyễn Hùng Cường
                </a>
              </li>
              <li class="mb-6">
                <a href="javascript:;" class=" text-gray-600 hover:text-gray-900">
                  Tailwind & ReactJS
                </a>
              </li>
              <li class="mb-6">
                <a href="javascript:;" class=" text-gray-600 hover:text-gray-900">
                  Spring Boot
                </a>
              </li>
              <li>
                <a href="javascript:;" class=" text-gray-600 hover:text-gray-900">
                  Lấy cảm hứng từ: dribbble.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="py-7 border-t border-gray-200">
          <div class="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span class="text-sm text-gray-500 ">
              ©<a href="/">Deep Thocks</a> 2025, All rights reserved.
            </span>
            <div id="social-media-footer-section" class="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
              <a
                id="x-icon"
                href="https://x.com/Whisper30554598"
                target="_blank"
                class="w-9 h-9 rounded-full bg-[var(--light-black)] flex justify-center items-center hover:bg-[var(--primary-color)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g id="Social Media">
                    <path
                      id="Vector"
                      d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </a>
              <a
                id="facebook-icon"
                href="https://www.facebook.com/cuong.nguyen.813584/"
                target="_blank"
                class="w-9 h-9 rounded-full bg-[var(--light-black)] flex justify-center items-center hover:bg-[var(--primary-color)]"
              >
                <svg
                  class="w-[1.25rem] h-[1.125rem] text-white"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0.5C3.63401 0.5 0.5 3.63401 0.5 7.5C0.5 11.366 3.63401 14.5 7.5 14.5C11.366 14.5 14.5 11.366 14.5 7.5C14.5 3.63401 11.366 0.5 7.5 0.5ZM9.375 4.625H8.4375C8.15625 4.625 7.9375 4.84375 7.9375 5.125V6.0625H9.375V7.9375H7.9375V12.375H6.0625V7.9375H4.625V6.0625H6.0625V5.125C6.0625 3.98047 6.98047 3.0625 8.125 3.0625H9.375V4.625Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                id="linkedin-icon"
                href="https://www.linkedin.com/in/c%C6%B0%E1%BB%9Dng-nguy%E1%BB%85n-76153a333/"
                target="_blank"
                class="w-9 h-9 rounded-full bg-[var(--light-black)] flex justify-center items-center hover:bg-[var(--primary-color)]"
              >
                <svg
                  class="w-[1rem] h-[1rem] text-white"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.8794 11.5527V3.86835H0.318893V11.5527H2.87967H2.8794ZM1.59968 2.81936C2.4924 2.81936 3.04817 2.2293 3.04817 1.49188C3.03146 0.737661 2.4924 0.164062 1.61666 0.164062C0.74032 0.164062 0.167969 0.737661 0.167969 1.49181C0.167969 2.22923 0.723543 2.8193 1.5829 2.8193H1.59948L1.59968 2.81936ZM4.29668 11.5527H6.85698V7.26187C6.85698 7.03251 6.87369 6.80255 6.94134 6.63873C7.12635 6.17968 7.54764 5.70449 8.25514 5.70449C9.18141 5.70449 9.55217 6.4091 9.55217 7.44222V11.5527H12.1124V7.14672C12.1124 4.78652 10.8494 3.68819 9.16483 3.68819C7.78372 3.68819 7.17715 4.45822 6.84014 4.98267H6.85718V3.86862H4.29681C4.33023 4.5895 4.29661 11.553 4.29661 11.553L4.29668 11.5527Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                id="youtube-icon"
                href="https://www.youtube.com/@cuongnguyen38535"
                target="_blank"
                class="w-9 h-9 rounded-full bg-[var(--light-black)] flex justify-center items-center hover:bg-[var(--primary-color)]"
              >
                <svg
                  class="w-[1.25rem] h-[0.875rem] text-white"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.9346 1.13529C14.5684 1.30645 15.0665 1.80588 15.2349 2.43896C15.5413 3.58788 15.5413 5.98654 15.5413 5.98654C15.5413 5.98654 15.5413 8.3852 15.2349 9.53412C15.0642 10.1695 14.5661 10.669 13.9346 10.8378C12.7886 11.1449 8.19058 11.1449 8.19058 11.1449C8.19058 11.1449 3.59491 11.1449 2.44657 10.8378C1.81277 10.6666 1.31461 10.1672 1.14622 9.53412C0.839844 8.3852 0.839844 5.98654 0.839844 5.98654C0.839844 5.98654 0.839844 3.58788 1.14622 2.43896C1.31695 1.80353 1.81511 1.30411 2.44657 1.13529C3.59491 0.828125 8.19058 0.828125 8.19058 0.828125C8.19058 0.828125 12.7886 0.828125 13.9346 1.13529ZM10.541 5.98654L6.72178 8.19762V3.77545L10.541 5.98654Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
