const Pill = ({ text, handleRoomsChange }) => {
  return (
    <div className="inline-flex p-1">
      <span className="items-center rounded bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-700 dark:text-green-400 ">
        {text}
        <button
          type="button"
          className="ms-3 inline-flex items-center rounded-sm bg-transparent p-1 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 disabled:pointer-events-none dark:hover:bg-gray-600 dark:hover:text-gray-300"
          aria-label="Remove Room"
          onClick={() => handleRoomsChange(text)}
          disabled
        >
          <svg className="size-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </span>
    </div>
  );
};

export default Pill;
