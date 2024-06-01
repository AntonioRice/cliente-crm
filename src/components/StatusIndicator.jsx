import React from "react";

const StatusIndicator = ({ status }) => {
  const statusColor = status === "Active" ? "bg-green-400" : "bg-red-400";
  return <div className={`size-3 ${statusColor} rounded-full`} />;
};

export default StatusIndicator;
