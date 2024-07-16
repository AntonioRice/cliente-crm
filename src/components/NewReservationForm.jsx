import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { useGuestContext } from "../context";
import { MultiSelectDropdown, AddGuestToParty, Pill } from "../components";
import { CgMathPlus } from "react-icons/cg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewReservationForm = ({ newReservationData, setNewReservationData, handleBlur, isFieldInvalid, setTouched }) => {
  const { t } = useTranslation();
  const { additionalGuests } = useGuestContext();

  useEffect(() => {
    setNewReservationData((prevData) => ({
      ...prevData,
      additional_guests: [
        ...prevData.additional_guests,
        ...additionalGuests.filter((g) => !prevData.additional_guests.some((pg) => pg.id === g.id)),
      ],
    }));
  }, [additionalGuests]);

  const handleInputChange = (e) => {
    const { dataset, value } = e.target;
    const { group, field } = dataset;

    setNewReservationData((prev) => {
      if (group) {
        return {
          ...prev,
          [group]: {
            ...prev[group],
            [field]: value,
          },
        };
      } else {
        return {
          ...prev,
          [field]: value,
        };
      }
    });
  };

  const addGuestToParty = () => {
    setNewReservationData((prevState) => {
      const newGuest = {
        id: uuidv4(),
        first_name: "",
        last_name: "",
        date_of_birth: "",
        nationality: "",
        email: "",
        identification_number: "",
      };
      return {
        ...prevState,
        additional_guests: [...prevState.additional_guests, newGuest],
      };
    });
  };

  const removeGuestFromParty = (id) => {
    setNewReservationData((prevState) => {
      const updatedGuests = prevState.additional_guests.filter((guest) => guest.id !== id);
      return {
        ...prevState,
        additional_guests: updatedGuests,
      };
    });
  };

  const updateGuest = (updatedGuest) => {
    setNewReservationData((prevState) => ({
      ...prevState,
      additional_guests: prevState.additional_guests.map((guest) =>
        guest.id === updatedGuest.id ? updatedGuest : guest
      ),
    }));
  };

  const handleRoomsChange = (rooms) => {
    setNewReservationData((prevData) => ({
      ...prevData,
      room_numbers: rooms,
    }));
    setTouched((prev) => ({
      ...prev,
      room_numbers: true,
    }));
  };

  const handleDateChange = (field, date) => {
    setNewReservationData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };

  return (
    <>
      <h1 className="pt-4 text-green-400">
        <span className="text-green-400"> - </span>
        {t("room_information")}
      </h1>
      <div className="flex flex-wrap mb-6 -mx-3">
        <div className="flex flex-col justify-center w-full px-3 py-2 mb-6 md:w-1/4 md:mb-0">
          <MultiSelectDropdown onRoomSelectionChange={handleRoomsChange} />
        </div>
        <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
          <label className="block uppercase tracking-wide text-[10px] font-light mb-1">{t("rooms")}</label>
          <div
            className={`border rounded-lg p-2 min-h-12 items-center flex-wrap bg-gray-200  ${
              !newReservationData.room_numbers.length > 0 ? "border-red-500" : "border-gray-600"
            }`}
          >
            {newReservationData.room_numbers?.map((room, i) => (
              <Pill key={i} text={room} />
            ))}
          </div>
          {!newReservationData.room_numbers.length > 0 && (
            <p className="pt-1 text-xs italic text-red-500">{t("room_warning")}</p>
          )}
        </div>
        <div className="flex flex-col w-full px-3 mb-6 md:w-1/4 md:mb-0">
          <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("check_in")}</label>
          <DatePicker
            className="flex items-center w-full px-4 py-2 -mt-1 text-sm font-medium leading-tight text-black bg-gray-200 border border-gray-200 rounded-lg appearance-none min-h-12 focus:outline-none hover:bg-gray-100 focus:bg-white"
            id="check_in"
            selected={newReservationData.check_in}
            onChange={(date) => handleDateChange("check_in", date)}
          />
        </div>
        <div className="flex flex-col w-full px-3 mb-6 md:w-1/4 md:mb-0">
          <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("check_out")}</label>
          <DatePicker
            className="flex items-center w-full px-4 py-2 -mt-1 text-sm font-medium leading-tight text-black bg-gray-200 border border-gray-200 rounded-lg appearance-none min-h-12 focus:outline-none hover:bg-gray-100 focus:bg-white"
            id="check_out"
            startDate={new Date()}
            selected={newReservationData.check_out}
            onChange={(date) => handleDateChange("check_out", date)}
          />
        </div>
      </div>

      {newReservationData.additional_guests.map((guest, i) => (
        <div key={guest.id}>
          <h2 className="pb-2 mx-8 text-white">
            {t("guest")} {i + 1}
          </h2>
          <AddGuestToParty guest={guest} updateGuest={updateGuest} removeGuestFromParty={removeGuestFromParty} />
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={addGuestToParty}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <CgMathPlus className="-ml-1 mr-1.5 size-4 text-green-400" />
          {t("add_guest")}
        </button>
      </div>
      <h1 className="pb-2 text-green-400">
        <span className="text-green-400"> - </span>
        {t("payment_information")}
      </h1>
      <div className="flex flex-wrap mb-6 -mx-3">
        <div className="relative w-full px-3 mb-6 md:w-1/4 md:mb-0">
          <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("payment_method")}</label>
          <select
            className={`appearance-none block w-full bg-gray-200 border text-black ${
              isFieldInvalid("payment_method") ? "border-red-500" : "border-gray-200"
            } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            data-field="payment_method"
            value={newReservationData.payment_method}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          >
            <option
              value=""
              disabled
              className="leading-tight text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white"
            >
              {t("payment_selection")}
            </option>
            {["cash", "credit", "transfer"].map((method, i) => (
              <option key={i}>{method}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 flex items-center px-2 text-gray-700 pointer-events-none right-3">
            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
          <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("total")}</label>
          <input
            className={`appearance-none block w-full bg-gray-200 border text-black ${
              isFieldInvalid("total_amount") ? "border-red-500" : "border-gray-200"
            } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            data-field="total_amount"
            type="number"
            placeholder={t("total")}
            value={newReservationData.total_amount}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {isFieldInvalid("total_amount") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
        </div>
        <div className="relative w-full px-3 mb-6 md:w-1/4 md:mb-0">
          <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("payment_status")}</label>
          <select
            className={`appearance-none block w-full bg-gray-200 border text-black ${
              isFieldInvalid("payment_status") ? "border-red-500" : "border-gray-200"
            } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            data-field="payment_status"
            value={newReservationData.payment_status}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          >
            <option
              value=""
              disabled
              className="leading-tight text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white"
            >
              {t("payment_status")}
            </option>
            {["pending", "completed", "failed"].map((status, i) => (
              <option key={i}>{status}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 flex items-center px-2 text-gray-700 pointer-events-none right-3">
            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReservationForm;
