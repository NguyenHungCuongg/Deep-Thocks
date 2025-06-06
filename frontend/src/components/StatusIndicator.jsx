import React, { useEffect, useState } from "react";

function StatusIndicator(props) {
  const [textColor, setTextColor] = useState("text-green-800");
  const [bgColor, setBgColor] = useState("bg-green-100");
  const [pointColor, setPointColor] = useState("bg-green-500");

  useEffect(() => {
    switch (props.type) {
      case "success":
        setTextColor("text-green-800");
        setBgColor("bg-green-100");
        setPointColor("bg-green-500");
        break;
      case "warning":
        setTextColor("text-yellow-800");
        setBgColor("bg-yellow-100");
        setPointColor("bg-yellow-500");
        break;
      case "error":
        setTextColor("text-red-800");
        setBgColor("bg-red-100");
        setPointColor("bg-red-500");
        break;
      default:
        setTextColor("text-gray-800");
        setBgColor("bg-gray-100");
        setPointColor("bg-gray-500");
    }
  }, [props.type]);

  return (
    <span class={`inline-flex items-center ${bgColor} ${textColor} text-xs font-medium px-2.5 py-0.5 rounded-full `}>
      <span class={`w-2 h-2 me-1 ${pointColor} rounded-full`}></span>
      {props.content === "pending" ? "Chưa thanh toán" : "Đã thanh toán" /* Adjust content based on status */}
    </span>
  );
}

export default StatusIndicator;
