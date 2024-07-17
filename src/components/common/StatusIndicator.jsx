const StatusIndicator = ({ status }) => {
  const statusColor = status?.toLowerCase() === "active" ? "bg-green-400" : "bg-red-400";
  return <div className={`size-3 ${statusColor} rounded-full`} />;
};

export default StatusIndicator;
