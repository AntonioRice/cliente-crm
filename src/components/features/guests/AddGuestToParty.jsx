import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const AddGuestToParty = ({ guest, updateGuest, removeGuestFromParty }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(guest);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setFormData(guest);
  }, [guest]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      updateGuest(updatedData);
      return updatedData;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isFieldInvalid = (fieldName) => {
    return touched[fieldName] && !formData[fieldName];
  };

  return (
    <div className="flex flex-row mx-5 mb-6">
      <div className="w-full px-3 mb-6 md:w-1/6 md:mb-0">
        <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("first_name")}</label>
        <input
          className={`appearance-none block w-full bg-gray-200 border text-black ${
            isFieldInvalid("first_name") ? "border-red-500" : "border-gray-200"
          } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id={`guests_${guest.id}_first_name`}
          name="first_name"
          type="text"
          placeholder="Jane"
          value={formData.first_name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
        />
        {isFieldInvalid("first_name") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
      </div>
      <div className="w-full px-3 mb-6 md:w-1/6 md:mb-0">
        <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("last_name")}</label>
        <input
          className={`appearance-none block w-full bg-gray-200 border text-black ${
            isFieldInvalid("last_name") ? "border-red-500" : "border-gray-200"
          } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id={`guests_${guest.id}_last_name`}
          name="last_name"
          type="text"
          placeholder="Doe"
          value={formData.last_name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
        />
        {isFieldInvalid("last_name") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
      </div>
      <div className="w-full px-3 mb-6 md:w-1/6 md:mb-0">
        <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("dob")}</label>
        <input
          className={`appearance-none block w-full bg-gray-200 border text-black ${
            isFieldInvalid("date_of_birth") ? "border-red-500" : "border-gray-200"
          } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id={`guests_${guest.id}_date_of_birth`}
          name="date_of_birth"
          type="date"
          placeholder="DOB"
          value={formData.date_of_birth}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
        />
        {isFieldInvalid("date_of_birth") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
      </div>
      <div className="w-full px-3 mb-6 md:w-1/6 md:mb-0">
        <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("nationality")}</label>
        <input
          className={`appearance-none block w-full bg-gray-200 border text-black ${
            isFieldInvalid("nationality") ? "border-red-500" : "border-gray-200"
          } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id={`guests_${guest.id}_nationality`}
          name="nationality"
          type="text"
          placeholder="Nationality"
          value={formData.nationality}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
        />
        {isFieldInvalid("nationality") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
      </div>
      <div className="w-full px-3 mb-6 md:w-1/6 md:mb-0">
        <label className="block uppercase tracking-wide text-[10px] font-light mb-2">
          {t("identification_number")}
        </label>
        <input
          className={`appearance-none block w-full bg-gray-200 border text-black ${
            isFieldInvalid("identification_number") ? "border-red-500" : "border-gray-200"
          } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id={`guests_${guest.id}_identification_number`}
          name="identification_number"
          type="text"
          placeholder="#"
          value={formData.identification_number}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
        />
        {isFieldInvalid("identification_number") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
      </div>
      <div className="w-full px-3 mb-6 md:w-1/6 md:mb-0">
        <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("email")}</label>
        <input
          className={`appearance-none block w-full bg-gray-200 border text-black ${
            isFieldInvalid("email") ? "border-red-500" : "border-gray-200"
          } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id={`guests_${guest.id}_email`}
          name="email"
          type="email"
          placeholder="---@---.com"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
        />
        {isFieldInvalid("email") && <p className="text-xs italic text-red-500">{t("entry_warning")}</p>}
      </div>
      <div className="relative flex flex-row items-center justify-center">
        <button
          title="Remove Guest"
          type="button"
          onClick={() => removeGuestFromParty(guest.id)}
          className="text-red-500 rounded-lg p-1.5 dark:hover:bg-gray-600 dark:hover:text-red-600"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddGuestToParty;
