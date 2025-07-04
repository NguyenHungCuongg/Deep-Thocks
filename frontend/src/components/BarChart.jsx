import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(...registerables);
const blueColor = getComputedStyle(document.documentElement).getPropertyValue("--blue-color").trim();
const darkBlueColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-blue-color").trim();
const purpleColor = getComputedStyle(document.documentElement).getPropertyValue("--purple-color").trim();
const darkPurpleColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-purple-color").trim();

// Dữ liệu doanh thu và chi phí giống LineChart
const revenueData = [
  650000, 590000, 800000, 810000, 560000, 550000, 400000, 650000, 800000, 780000, 850000, 920000, 1000000,
];
const costData = [
  280000, 480000, 400000, 190000, 860000, 270000, 900000, 650000, 700000, 750000, 800000, 900000, 1000000,
];
const profitData = revenueData.map((revenue, idx) => revenue - costData[idx]);
const labels = [
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
];

function BarChart() {
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: revenueData,
        backgroundColor: purpleColor,
        borderColor: darkPurpleColor,
        borderWidth: 1,
      },
      {
        label: "Chi phí",
        data: costData,
        backgroundColor: blueColor,
        borderColor: darkBlueColor,
        borderWidth: 1,
      },
      {
        label: "Lợi nhuận",
        data: profitData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "So sánh Doanh thu, Chi phí, Lợi nhuận theo tháng" },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 3500000,
        ticks: {
          stepSize: 500000,
          callback: function (value) {
            return value.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            });
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;
