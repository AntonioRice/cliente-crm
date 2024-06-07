import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { CgMathPlus } from "react-icons/cg";
import { formatDateTime } from "../utils/standardMethods";
import { useGuestContext } from "../context/GuestProvider";
import { useTranslation } from "react-i18next";
import AddGuestToParty from "./AddGuestToParty";
import MultiSelectDropdown from "./MultiSelectDropdown";
import Pill from "../components/Pill";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewGuestForm = ({ submitRef }) => {
  const { t } = useTranslation();
  const { primaryGuest, additionalGuests } = useGuestContext();
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [registrationData, setRegistrationData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    nationality: "",
    identification_number: "",
    email: "",
    phone_number: "",
    address: {
      city: "",
      state: "",
      postal_code: "",
      country: "",
    },
    emergency_contact: {
      first_name: "",
      last_name: "",
      phone_number: "",
    },
    vehicle: {
      make: "",
      model: "",
      plate_number: "",
    },
    payment_method: "",
    total_amount: "",
    payment_status: "",
    guests: [],
    room_numbers: [],
    check_in: "",
    check_out: "",
  });

  useEffect(() => {
    if (primaryGuest) {
      setRegistrationData((prevData) => ({
        ...prevData,
        ...primaryGuest,
        address: primaryGuest.address || {
          city: "",
          state: "",
          postal_code: "",
          country: "",
        },
        emergency_contact: primaryGuest.emergency_contact || {
          first_name: "",
          last_name: "",
          phone_number: "",
        },
      }));
    }
  }, [primaryGuest]);

  useEffect(() => {
    setRegistrationData((prevData) => ({
      ...prevData,
      guests: [...prevData.guests, ...additionalGuests.filter((g) => !prevData.guests.some((pg) => pg.id === g.id))],
    }));
  }, [additionalGuests]);

  const handleInputChange = (e) => {
    const { dataset, value } = e.target;
    const { group, field } = dataset;

    setRegistrationData((prev) => {
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

  const handleRoomsChange = (rooms) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      room_numbers: rooms,
    }));
    setTouched((prev) => ({
      ...prev,
      room_numbers: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        setLoading(true);
        await axios.post(`http://localhost:3015/api/v1/guests`, registrationData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    } else {
      setTouched({
        first_name: true,
        last_name: true,
        date_of_birth: true,
        nationality: true,
        address_city: true,
        address_state: true,
        address_postal_code: true,
        address_country: true,
        identification_number: true,
        email: true,
        phone_number: true,
        emergency_contact_first_name: true,
        emergency_contact_last_name: true,
        emergency_contact_phone_number: true,
        vehicle_make: true,
        vehicle_model: true,
        vehicle_plate_number: true,
      });
    }
  };

  const handleBlur = (e) => {
    const { dataset } = e.target;
    const { group, field } = dataset;

    setTouched((prev) => ({
      ...prev,
      [`${group}_${field}`]: true,
    }));
  };

  const isFormValid = () => {
    // Check primary guest fields
    const primaryGuestValid = Object.values(registrationData).every((field) => {
      if (typeof field === "object") {
        return Object.values(field).every((subField) => subField.toString().trim() !== "");
      }
      return field.toString().trim() !== "";
    });

    // Check additional guests fields
    const guestsValid = registrationData.guests.every((guest) =>
      Object.values(guest).every((field) => field.toString().trim() !== "")
    );

    return primaryGuestValid && guestsValid && registrationData.room_numbers.length > 0;
  };

  const isFieldInvalid = (fieldName) => {
    const [group, field] = fieldName.split("_");
    if (touched[fieldName]) {
      if (group === "guest") {
        const guestId = field.split("_")[0];
        const guestField = field.split("_")[1];
        const guest = registrationData.guests.find((g) => g.id === guestId);
        return guest && !guest[guestField];
      }
      return !registrationData[group][field];
    }
    return false;
  };

  const addGuestToParty = () => {
    setRegistrationData((prevState) => {
      const newGuest = {
        id: uuidv4(),
        first_name: "",
        last_name: "",
        date_of_birth: "",
        email: "",
        identification_number: "",
      };
      return {
        ...prevState,
        guests: [...prevState.guests, newGuest],
      };
    });
  };

  const removeGuestFromParty = (id) => {
    setRegistrationData((prevState) => {
      const updatedGuests = prevState.guests.filter((guest) => guest.id !== id);
      return {
        ...prevState,
        guests: updatedGuests,
      };
    });
  };

  const updateGuest = (updatedGuest) => {
    setRegistrationData((prevState) => ({
      ...prevState,
      guests: prevState.guests.map((guest) => (guest.id === updatedGuest.id ? updatedGuest : guest)),
    }));
  };

  return (
    <div className="text-base leading-relaxed pb-28">
      <div className="px-4 mb-4">
        <form className="w-full" onSubmit={handleSubmit}>
          <h1 className="pb-2 text-green-400">
            <span className="text-green-400"> - </span>
            {t("primary_guest")}
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("first_name")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("first_name") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="first_name"
                type="text"
                placeholder="John"
                value={registrationData.first_name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("first_name") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("last_name")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("last_name") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="last_name"
                type="text"
                placeholder="Doe"
                value={registrationData.last_name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("last_name") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("dob")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("date_of_birth") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="date_of_birth"
                type="text"
                placeholder={t("dob")}
                value={formatDateTime(registrationData.date_of_birth)}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("date_of_birth") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("nationality")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("nationality") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="nationality"
                type="text"
                placeholder={t("nationality")}
                value={registrationData.nationality}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("nationality") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("city")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("address_city") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="address"
                data-field="city"
                type="text"
                placeholder={t("city")}
                value={registrationData.address.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("address_city") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("state")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("address_state") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="address"
                data-field="state"
                type="text"
                placeholder={t("state")}
                value={registrationData.address.state}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("address_state") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("postal_code")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("address_postal_code") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="address"
                data-field="postal_code"
                type="text"
                placeholder="Postal Code"
                value={registrationData.address.postal_code}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("address_postal_code") && (
                <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>
              )}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("country")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("address_country") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="address"
                data-field="country"
                type="text"
                placeholder={t("country")}
                value={registrationData.address.country}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("address_country") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">
                {t("identification_number")}
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("identification_number") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="identification_number"
                type="text"
                placeholder="#"
                value={registrationData.identification_number}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("identification_number") && (
                <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>
              )}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("email")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("email") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="email"
                type="email"
                placeholder="---@---.com"
                value={registrationData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("email") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("phone_number")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("phone_number") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="phone_number"
                type="tel"
                placeholder="+--- (---) --- ----"
                value={registrationData.phone_number}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("phone_number") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
          </div>
          <h1 className="pb-2 text-green-400">
            <span className="text-green-400"> - </span>
            {t("emergency_contact")}
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("first_name")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("emergency_first_name") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="emergency_contact"
                data-field="first_name"
                type="text"
                placeholder="Jane"
                value={registrationData.emergency_contact.first_name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("emergency_first_name") && (
                <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>
              )}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("last_name")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("emergency_last_name") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="emergency_contact"
                data-field="last_name"
                type="text"
                placeholder="Doe"
                value={registrationData.emergency_contact.last_name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("emergency_last_name") && (
                <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>
              )}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("phone_number")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("emergency_phone_number") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="emergency_contact"
                data-field="phone_number"
                type="tel"
                placeholder="+--- (---) --- ----"
                value={registrationData.emergency_contact.phone_number}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("emergency_phone_number") && (
                <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>
              )}
            </div>
          </div>
          <div className="border-t dark:border-gray-600 pt-4 px-4">
            {registrationData.guests.map((guest, i) => (
              <div key={guest.id}>
                <h2 className="pb-2 text-white">
                  {t("guest")} {i + 1}
                </h2>
                <AddGuestToParty guest={guest} updateGuest={updateGuest} removeGuestFromParty={removeGuestFromParty} />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={addGuestToParty}
              className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <CgMathPlus className="-ml-1 mr-1.5 size-4 text-green-400" />
              {t("add_guest")}
            </button>
          </div>

          <h1 className="pb-2 text-green-400">
            <span className="text-green-400"> - </span>
            {t("vehicle_information")}
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("make")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="vehicle"
                data-field="make"
                type="text"
                placeholder={t("make")}
                value={registrationData.vehicle.make}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("model")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="vehicle"
                data-field="model"
                type="text"
                placeholder={t("model")}
                value={registrationData.vehicle.model}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("plate_number")}</label>
              <input
                className="appearance-none block w-full bg-gray-200 border text-black border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                data-group="vehicle"
                data-field="plate_number"
                type="text"
                placeholder="#"
                value={registrationData.vehicle.plate_number}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <h1 className="pb-2 text-green-400">
            <span className="text-green-400"> - </span>
            {t("room_information")}
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 flex flex-col justify-center">
              <MultiSelectDropdown onRoomSelectionChange={handleRoomsChange} />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-1">{t("rooms")}</label>
              <div
                className={`border rounded-lg p-2 min-h-[2.5rem] items-center flex-wrap ${
                  !registrationData.room_numbers.length > 0 ? "border-red-500" : "border-gray-600"
                }`}
              >
                {registrationData.room_numbers?.map((room, i) => (
                  <Pill key={i} text={room} />
                ))}
              </div>
              {!registrationData.room_numbers.length > 0 && (
                <p className="text-red-500 text-xs italic pt-1">{t("room_warning")}</p>
              )}
            </div>

            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("check_in")}</label>
              <DatePicker className="z-50" selected={startDate} onChange={(date) => setStartDate(date)} />
              {isFieldInvalid("vehicle_make") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("check_out")}</label>
              <DatePicker className="z-50" selected={startDate} onChange={(date) => setStartDate(date)} />
              {isFieldInvalid("vehicle_make") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
          </div>

          <h1 className="pb-2 text-green-400">
            <span className="text-green-400"> - </span>
            {t("payment_information")}
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 relative">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("payment_method")}</label>
              <select
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("payment_method") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="payment_method"
                value={registrationData.payment_method}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              >
                <option
                  value=""
                  disabled
                  className="text-gray-700 border-gray-200 rounded leading-tight focus:outline-none focus:bg-white"
                >
                  {t("payment_selection")}
                </option>
                {["Cash", "Credit", "Transfer"].map((method, i) => (
                  <option key={i}>{method}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("total")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("total_amount") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="total_amount"
                type="number"
                placeholder={t("total")}
                value={registrationData.total_amount}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("total_amount") && <p className="text-red-500 text-xs italic">{t("entry_warning")}</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 relative">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("payment_status")}</label>
              <select
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("payment_status") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="payment_status"
                value={registrationData.payment_status}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              >
                <option
                  value=""
                  disabled
                  className="text-gray-700 border-gray-200 rounded leading-tight focus:outline-none focus:bg-white"
                >
                  {t("payment_status_selection")}
                </option>
                {["Pending", "Completed", "Failed"].map((status, i) => (
                  <option key={i}>{status}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <button ref={submitRef} type="submit" className="hidden" />
        </form>
      </div>
    </div>
  );
};

export default NewGuestForm;
