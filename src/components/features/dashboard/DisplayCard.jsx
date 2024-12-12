const DisplayCard = ({ title, description, data }) => {
  return (
    <div className="rounded-xl bg-gray-800 p-4 shadow-lg dark:bg-[#282828]">
      <h1 className="text-md py-2 text-white">{title}</h1>
      <p className="text-lg">{data}</p>
      <div className="flex h-full items-center justify-center">{description}</div>
    </div>
  );
};

export default DisplayCard;
