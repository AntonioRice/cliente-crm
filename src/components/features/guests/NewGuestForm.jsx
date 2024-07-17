import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGuestContext } from "../../../context";
import { AnimatedPage } from "../../../components";
import { formatDateTime } from "../../../utils/standardMethods";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

const NewGuestForm = ({
  newGuestData,
  setNewGuestData,
  toggleReservationForm,
  showNewReservationForm,
  handleBlur,
  isFieldInvalid,
}) => {
  const { t } = useTranslation();
  const { primaryGuest } = useGuestContext();

  useEffect(() => {
    if (primaryGuest) {
      primaryGuest.date_of_birth = formatDateTime(primaryGuest.date_of_birth, true);
      setNewGuestData((prevData) => ({
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

  const handleInputChange = (e) => {
    const { dataset, value } = e.target;
    const { group, field } = dataset;

    setNewGuestData((prev) => {
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

  return (
    <AnimatedPage>
      <div className="text-base leading-relaxed">
        <form className="w-full border-b dark:border-gray-600">
          <h1 className="pb-2 text-green-400">
            <span className="text-green-400"> - </span>
            {t("primary_guest")}
          </h1>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("first_name")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("first_name") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="first_name"
                type="text"
                placeholder="John"
                value={newGuestData.first_name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("first_name") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("last_name")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("last_name") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="last_name"
                type="text"
                placeholder="Doe"
                value={newGuestData.last_name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("last_name") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("dob")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("date_of_birth") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="date_of_birth"
                type="date"
                placeholder={t("dob")}
                value={newGuestData.date_of_birth}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("date_of_birth") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("nationality")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("nationality") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="nationality"
                type="text"
                placeholder={t("nationality")}
                value={newGuestData.nationality}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("nationality") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("city")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("city", "address") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="address"
                data-field="city"
                type="text"
                placeholder={t("city")}
                value={newGuestData.address.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("city", "address") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("state")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("state", "address") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="address"
                data-field="state"
                type="text"
                placeholder={t("state")}
                value={newGuestData.address.state}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("state", "address") && (
                <p className="text-xs italic text-red-500">{t("entry_warning")}</p>
              )}
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("postal_code")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("postal_code", "address") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="address"
                data-field="postal_code"
                type="text"
                placeholder="Postal Code"
                value={newGuestData.address.postal_code}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("postal_code", "address") && (
                <p className="text-xs italic text-red-500">{t("entry_warning")}</p>
              )}
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("country")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("country", "address") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="address"
                data-field="country"
                type="text"
                placeholder={t("country")}
                value={newGuestData.address.country}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("country", "address") && (
                <p className="text-xs italic text-red-500">{t("entry_warning")}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
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
                value={newGuestData.identification_number}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("identification_number") && (
                <p className="text-xs italic text-red-500">{t("entry_warning")}</p>
              )}
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("email")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("email") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="email"
                type="email"
                placeholder="---@---.com"
                value={newGuestData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("email") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("phone_number")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black ${
                  isFieldInvalid("phone_number") ? "border-red-500" : "border-gray-200"
                } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-field="phone_number"
                type="tel"
                placeholder="+--- (---) --- ----"
                value={newGuestData.phone_number}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("phone_number") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
            </div>
          </div>
          <h1 className="pb-2 text-green-400">
            <span className="text-green-400"> - </span>
            {t("emergency_contact")}
          </h1>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("first_name")}</label>
              <input
                className="block w-full px-4 py-2 mb-3 leading-tight text-black bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                data-group="emergency_contact"
                data-field="first_name"
                type="text"
                placeholder="Jane"
                value={newGuestData.emergency_contact.first_name}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("last_name")}</label>
              <input
                className="block w-full px-4 py-2 mb-3 leading-tight text-black bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                data-group="emergency_contact"
                data-field="last_name"
                type="text"
                placeholder="Doe"
                value={newGuestData.emergency_contact.last_name}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("phone_number")}</label>
              <input
                className="block w-full px-4 py-2 mb-3 leading-tight text-black bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                data-group="emergency_contact"
                data-field="phone_number"
                type="tel"
                placeholder="+--- (---) --- ----"
                value={newGuestData.emergency_contact.phone_number}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <h1 className="pb-2 text-green-400">
            <span className="text-green-400"> - </span>
            {t("vehicle_information")}
          </h1>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("make")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="vehicle"
                data-field="make"
                type="text"
                placeholder={t("make")}
                value={newGuestData.vehicle.make}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("model")}</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border text-black border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                data-group="vehicle"
                data-field="model"
                type="text"
                placeholder={t("model")}
                value={newGuestData.vehicle.model}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full px-3 mb-6 md:w-1/4 md:mb-0">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("plate_number")}</label>
              <input
                className="block w-full px-4 py-2 mb-3 leading-tight text-black bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                data-group="vehicle"
                data-field="plate_number"
                type="text"
                placeholder="#"
                value={newGuestData.vehicle.plate_number}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        <div className="flex items-center justify-between mt-5 space-x-3">
          <h1 className="text-2xl font-semibold">{showNewReservationForm ? t("new_reservation") : ""}</h1>
          <button
            type="button"
            onClick={toggleReservationForm}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {showNewReservationForm ? (
              <>
                <CgMathMinus className="-ml-1 mr-1.5 size-4 text-red-500" />
                {t("remove_reservation")}
              </>
            ) : (
              <>
                <CgMathPlus className="-ml-1 mr-1.5 size-4 text-green-400" />
                {t("new_reservation")}
              </>
            )}
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default NewGuestForm;
