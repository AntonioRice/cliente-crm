const Notes = ({ title, description, week }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-800 p-5 shadow-lg dark:border-gray-700">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-xs">Week: {week}</p>
      <div className="flex h-full items-center justify-center">{description}</div>
    </div>
  );
};

export default Notes;
