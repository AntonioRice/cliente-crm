import React, { useState, useEffect } from "react";
import { formatDateTime } from "../utils/standardMethods";

const AddGuestToParty = ({ guest, updateGuest, removeGuestFromParty }) => {
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
    <>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-[10px] font-light mb-2">First Name</label>
          <input
            className={`appearance-none block w-full bg-gray-200 border text-black ${
              isFieldInvalid("first_name") ? "border-red-500" : "border-gray-200"
            } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id={`guests_${guest.id}_first_name`}
            name="first_name"
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {isFieldInvalid("first_name") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
        </div>
        <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Last Name</label>
          <input
            className={`appearance-none block w-full bg-gray-200 border text-black ${
              isFieldInvalid("last_name") ? "border-red-500" : "border-gray-200"
            } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id={`guests_${guest.id}_last_name`}
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {isFieldInvalid("last_name") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Date of Birth</label>
          <input
            className={`appearance-none block w-full bg-gray-200 border text-black ${
              isFieldInvalid("date_of_birth") ? "border-red-500" : "border-gray-200"
            } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id={`guests_${guest.id}_date_of_birth`}
            name="date_of_birth"
            type="text"
            placeholder="DOB"
            value={formatDateTime(formData.date_of_birth)}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {isFieldInvalid("date_of_birth") && (
            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
          )}
        </div>
        <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Email</label>
          <input
            className={`appearance-none block w-full bg-gray-200 border text-black ${
              isFieldInvalid("email") ? "border-red-500" : "border-gray-200"
            } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id={`guests_${guest.id}_email`}
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {isFieldInvalid("email") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
        </div>
        <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Identification Number</label>
          <input
            className={`appearance-none block w-full bg-gray-200 border text-black ${
              isFieldInvalid("identification_number") ? "border-red-500" : "border-gray-200"
            } rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id={`guests_${guest.id}_identification_number`}
            name="identification_number"
            type="text"
            placeholder="ID Number"
            value={formData.identification_number}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {isFieldInvalid("identification_number") && (
            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
          )}
        </div>
        <div className="flex flex-row justify-center items-center">
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
    </>
  );
};

export default AddGuestToParty;
