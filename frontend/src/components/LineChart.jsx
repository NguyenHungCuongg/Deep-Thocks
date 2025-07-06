import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables, Ticks } from "chart.js";

ChartJS.register(...registerables);
const blueColor = getComputedStyle(document.documentElement).getPropertyValue("--blue-color").trim();
const darkBlueColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-blue-color").trim();
const purpleColor = getComputedStyle(document.documentElement).getPropertyValue("--purple-color").trim();
const darkPurpleColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-purple-color").trim();

function LineChart({ revenueData }) {
  // Tạo mảng 12 tháng, nếu thiếu dữ liệu thì điền 0
  const incomeArr = Array(12).fill(0);
  const outcomeArr = Array(12).fill(0);
  revenueData.forEach((item) => {
    if (item.revenueMonth >= 1 && item.revenueMonth <= 12) {
      incomeArr[item.revenueMonth - 1] = item.income;
      outcomeArr[item.revenueMonth - 1] = item.outcome;
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
        label: "Doanh thu",
        data: incomeArr,
        fill: false,
        backgroundColor: purpleColor,
        borderColor: darkPurpleColor,
        borderWidth: 1,
      },
      {
        label: "Chi phí",
        data: outcomeArr,
        fill: false,
        backgroundColor: blueColor,
        borderColor: darkBlueColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Thêm dòng này
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Xu hướng doanh thu và chi phí năm 2025" },
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

  return (
    <div style={{ height: 400 }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
