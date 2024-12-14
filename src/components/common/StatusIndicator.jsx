const StatusIndicator = ({ status }) => {
  const statusColor = status?.toLowerCase() === "active" ? "bg-green-500" : "bg-red-500";
  return <div className={`size-3 ${statusColor} rounded-full`} />;
};

export default StatusIndicator;
