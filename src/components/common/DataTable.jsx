import { IoIosArrowForward, IoIosArrowBack, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";

const DataTable = ({
  data,
  columns,
  title,
  currentPage,
  totalPages,
  totalItems,
  handlePrevPage,
  handleNextPage,
  handleSort,
  sortConfig,
  showSearch = true,
  onSearch,
  renderRow,
  editAction,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col mb-4 border border-gray-200 rounded-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="inline-flex justify-between p-5">
        <div>
          <h1 className="text-sm">{title}</h1>
          <p className="text-xs text-gray-500">Total: {totalItems}</p>
        </div>
        {showSearch && (
          <div className="w-full md:w-1/2">
            <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="simple-search" className="sr-only">
                {t("search")}
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={t("search")}
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="overflow-x-hidden rounded-b-xl">
        <table className="min-w-full text-xs text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-2 cursor-pointer" onClick={() => handleSort(col.key)}>
                  {col.header}
                  {sortConfig.key === col.key &&
                    (sortConfig.direction === "asc" ? (
                      <IoIosArrowUp className="inline mb-1 ml-1 text-green-400" />
                    ) : (
                      <IoIosArrowDown className="inline mb-1 ml-1 text-green-400" />
                    ))}
                </th>
              ))}
              <th className="px-6 py-3">
                <span className="sr-only">edit</span>
              </th>
            </tr>
          </thead>
          <tbody>{data.map((item, index) => renderRow(item, index, editAction))}</tbody>
        </table>
        <nav className="flex flex-col flex-wrap items-center justify-between p-4 pt-4 md:flex-row">
          <span className="block w-full mb-4 text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto">
            {t("page")} <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> of
            <span className="font-semibold text-gray-900 dark:text-white"> {totalPages}</span>
          </span>
          <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
            <li>
              <button
                onClick={handlePrevPage}
                className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-green-500"
              >
                <IoIosArrowBack />
              </button>
            </li>
            <li>
              <button
                onClick={handleNextPage}
                className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-green-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-green-500 dark:hover:bg-gray-700"
              >
                <IoIosArrowForward />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DataTable;
