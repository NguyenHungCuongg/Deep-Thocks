import React, { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";

function GraphAndChartSection() {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${backendURL}/api/revenue`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRevenueData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải dữ liệu doanh thu: " + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-8 rounded-2xl border border-gray-300 py-5 px-2 h-full">
        <LineChart revenueData={revenueData} />
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-4 rounded-2xl border border-gray-300 py-5 px-2 h-full">
        <DoughnutChart revenueData={revenueData} />
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-12 rounded-2xl border border-gray-300 py-5 px-2 h-full">
        <BarChart revenueData={revenueData} />
      </div>
    </div>
  );
}

export default GraphAndChartSection;
