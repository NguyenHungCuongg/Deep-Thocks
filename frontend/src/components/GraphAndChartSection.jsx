import React from "react";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";

function GraphAndChartSection() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-8 rounded-2xlborder border-gray-300 py-5 h-full">
        <LineChart />
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-4 rounded-2xl border border-gray-300 py-5 h-full">
        <DoughnutChart />
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-12 rounded-2xl border border-gray-300 py-5 h-full">
        <BarChart />
      </div>
    </div>
  );
}

export default GraphAndChartSection;
