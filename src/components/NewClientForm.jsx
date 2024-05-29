import React, { useState } from "react";
import AddGuestToParty from "./AddGuestToParty";

const NewClientForm = () => {
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    nationality: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    identificationNumber: "",
    email: "",
    phoneNumber: "",
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyPhoneNumber: "",
    guests: [],
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // submitCallback(formData);
      // navigateTo("organization");
    } else {
      setTouched({
        firstName: true,
        lastName: true,
        dob: true,
        nationality: true,
        city: true,
        state: true,
        postalCode: true,
        country: true,
        identificationNumber: true,
        email: true,
        phoneNumber: true,
        emergencyFirstName: true,
        emergencyLastName: true,
        emergencyPhoneNumber: true,
      });
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  const isFieldInvalid = (fieldName) => {
    return touched[fieldName] && !formData[fieldName];
  };

  const addGuestToParty = () => {
    setFormData((prevState) => {
      const newGuest = {
        id: prevState.guests.length + 1,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      };
      return {
        ...prevState,
        guests: [...prevState.guests, newGuest],
      };
    });
  };

  const removeGuestFromParty = (id) => {
    setFormData((prevState) => {
      const updatedGuests = prevState.guests
        .filter((guest) => guest.id !== id)
        .map((guest, index) => ({ ...guest, id: index + 1 }));
      return {
        ...prevState,
        guests: updatedGuests,
      };
    });
  };

  const handleGuestInputChange = (id, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      guests: prevState.guests.map((guest) => (guest.id === id ? { ...guest, [name]: value } : guest)),
    }));
  };

  return (
    <div className="text-base leading-relaxed text-[#111827]">
      <div className="px-4 mb-4">
        <form className="w-full" onSubmit={handleSubmit}>
          <h1 className="pb-2 text-white">Primary Guest</h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">First Name</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("firstName") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("firstName") && (
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
              )}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">Last Name</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("lastName") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("lastName") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">
                Date of Birth
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("dob") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="dob"
                type="text"
                placeholder="DOB"
                value={formData.dob}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("dob") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">Nationality</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("nationality") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="nationality"
                type="text"
                placeholder="Ecuadorian"
                value={formData.nationality}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("nationality") && (
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">City</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("city") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("city") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">State</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("state") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="state"
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("state") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>
            <div className="w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">Postal Code</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("postalCode") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="postalCode"
                type="text"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("postalCode") && (
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
              )}
            </div>
            <div className="w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">Country</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("country") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="country"
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">
                Passport / I.D.
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("email") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="identificationNumber"
                type="text"
                placeholder="Passport or I.D. #"
                value={formData.identificationNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("email") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">Email</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("email") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("email") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">
                Phone Number
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("phoneNumber") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="phoneNumber"
                type="tel"
                placeholder="(---) --- ----"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("phoneNumber") && (
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
              )}
            </div>
          </div>
          <h1 className="pb-2 text-white">Emergency Contact</h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">First Name</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("emergencyFirstName") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="emergencyFirstName"
                type="text"
                placeholder="Jane"
                value={formData.emergencyFirstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("emergencyFirstName") && (
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
              )}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">Last Name</label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("emergencyLastName") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="emergencyLastName"
                type="text"
                placeholder="Doe"
                value={formData.emergencyLastName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("emergencyLastName") && (
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
              )}
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">
                Phone Number
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 border ${
                  isFieldInvalid("emergencyPhoneNumber") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="emergencyPhoneNumber"
                type="tel"
                placeholder="(---) --- ----"
                value={formData.emergencyPhoneNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("emergencyPhoneNumber") && (
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
              )}
            </div>
          </div>
          <div className="border-t dark:border-gray-600 pt-4 px-4  ">
            {formData.guests.map((guest, i) => (
              <AddGuestToParty
                key={guest.id}
                guest={guest}
                handleGuestInputChange={handleGuestInputChange}
                removeGuestFromParty={removeGuestFromParty}
                isFieldInvalid={isFieldInvalid}
                handleBlur={handleBlur}
              />
            ))}
          </div>
        </form>
        <div className="flex justify-end">
          <button
            onClick={addGuestToParty}
            className="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded text-sm"
          >
            + Guest to Party
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewClientForm;
