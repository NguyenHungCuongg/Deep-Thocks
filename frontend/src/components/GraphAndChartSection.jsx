import React from "react";

function GraphAndChartSection() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-8 rounded-2xl bg-blue-200 border border-gray-300 py-5 h-100">
        Line Chart
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-4 rounded-2xl bg-red-200 border border-gray-300 py-5 h-100">
        Doughnut Chart
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-12 rounded-2xl bg-green-200 border border-gray-300 py-5 h-100">
        Bar Chart
      </div>
    </div>
  );
}

export default GraphAndChartSection;
