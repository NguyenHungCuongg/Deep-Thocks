import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(...registerables);
const greenColor = getComputedStyle(document.documentElement).getPropertyValue("--green-color").trim();
const darkGreenColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-green-color").trim();
const blueColor = getComputedStyle(document.documentElement).getPropertyValue("--blue-color").trim();
const darkBlueColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-blue-color").trim();
const purpleColor = getComputedStyle(document.documentElement).getPropertyValue("--purple-color").trim();
const darkPurpleColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-purple-color").trim();

function BarChart({ revenueData }) {
  // Tạo mảng 12 tháng, nếu thiếu dữ liệu thì điền 0
  const incomeArr = Array(12).fill(0);
  const outcomeArr = Array(12).fill(0);
  revenueData.forEach((item) => {
    if (item.revenueMonth >= 1 && item.revenueMonth <= 12) {
      incomeArr[item.revenueMonth - 1] = item.income;
      outcomeArr[item.revenueMonth - 1] = item.outcome;
    }
  });
  const profitArr = incomeArr.map((income, idx) => income - outcomeArr[idx]);
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

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: incomeArr,
        backgroundColor: purpleColor,
        borderColor: darkPurpleColor,
        borderWidth: 1,
      },
      {
        label: "Chi phí",
        data: outcomeArr,
        backgroundColor: blueColor,
        borderColor: darkBlueColor,
        borderWidth: 1,
      },
      {
        label: "Lợi nhuận",
        data: profitArr,
        backgroundColor: greenColor,
        borderColor: darkGreenColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "So sánh doanh thu, chi phí, lợi nhuận năm 2025" },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 35000000,
        ticks: {
          stepSize: 5000000,
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
