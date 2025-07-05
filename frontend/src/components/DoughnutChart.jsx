import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

// Lấy màu từ CSS variables
const getColor = (variable) => getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

const colorVars = [
  "--red-color",
  "--orange-color",
  "--yellow-color",
  "--lime-color",
  "--teal-color",
  "--cyan-color",
  "--indigo-color",
  "--pink-color",
  "--brown-color",
  "--grey-color",
  "--amber-color",
  "--deep-orange-color",
  "--dark-red-color",
];

const borderColorVars = [
  "--dark-red-color",
  "--dark-orange-color",
  "--dark-yellow-color",
  "--dark-lime-color",
  "--dark-teal-color",
  "--dark-cyan-color",
  "--dark-indigo-color",
  "--dark-pink-color",
  "--dark-brown-color",
  "--dark-grey-color",
  "--dark-amber-color",
  "--dark-deep-orange-color",
  "--red-color",
];

const backgroundColors = colorVars.map(getColor);
const borderColors = borderColorVars.map(getColor);

function DoughnutChart({ revenueData }) {
  // Tạo mảng 12 tháng, nếu thiếu dữ liệu thì điền 0
  const incomeArr = Array(12).fill(0);
  revenueData.forEach((item) => {
    if (item.revenueMonth >= 1 && item.revenueMonth <= 12) {
      incomeArr[item.revenueMonth - 1] = item.income;
    }
  });

  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Tỉ lệ doanh thu từng tháng",
        data: incomeArr,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Tỉ lệ doanh thu theo tháng trong năm 2025" },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percent = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value.toLocaleString("vi-VN")} VND (${percent}%)`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;
