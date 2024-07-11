import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useGuestContext } from "../context";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectGuest } = useGuestContext();

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3015/api/v1/guests/search`, {
            params: { searchQuery: query },
          });
          setResults(response.data.data);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      } else {
        setResults([]);
      }
    };

    const debounceFetchData = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceFetchData);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectGuest = (guest) => {
    selectGuest(guest);
    setQuery("");
  };

  return (
    <div className="relative">
      <label className="sr-only">{t("search")}</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IoIosSearch className="text-gray-500 size-5 dark:text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder={t("search_placeholder_existing")}
        />
      </div>
      {query && (
        <div className="absolute z-50 w-full mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {loading ? (
              <li className="block p-2 px-4">
                <svg
                  aria-hidden="true"
                  className="text-gray-200 size-4 animate-spin dark:text-gray-600 fill-green-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </li>
            ) : results.length === 0 ? (
              <li className="block px-4 py-2">{t("search_not_found")}</li>
            ) : (
              results.map((result) => (
                <li key={result.guest_id} onClick={() => handleSelectGuest(result)}>
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {result.first_name} {result.last_name}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
