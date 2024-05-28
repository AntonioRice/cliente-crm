import React, { useState } from "react";

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
    passportID: "",
    email: "",
    phoneNumber: "",
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyPhoneNumber: "",
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
        passportID: true,
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

  const addWGuestToParty = () => {
    // Add guest logic here
  };

  return (
    <div className="text-base leading-relaxed text-black">
      <div className="px-4 pb-4 mb-4">
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
                onChange={(e) => handleInputChange(e, "College/University")}
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
                id="passportID"
                type="text"
                placeholder="Passport or I.D. # "
                // value={formData.email.answer || ""}
                onChange={(e) => handleInputChange(e, "Email")}
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
                // value={formData.email.answer || ""}
                onChange={(e) => handleInputChange(e, "Email")}
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
                // value={formData.phoneNumber.answer || ""}
                onChange={(e) => handleInputChange(e, "Phone Number")}
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
                  isFieldInvalid("email") ? "border-red-500" : "border-gray-200"
                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="passportID"
                type="text"
                placeholder="Jane"
                // value={formData.email.answer || ""}
                onChange={(e) => handleInputChange(e, "Email")}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("email") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
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
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                // value={formData.phoneNumber.answer || ""}
                onChange={(e) => handleInputChange(e, "Phone Number")}
                onBlur={handleBlur}
                required
              />
              {isFieldInvalid("phoneNumber") && (
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
              )}
            </div>
          </div>

          <div className="w-full flex justify-end">
            <button
              onClick={addWGuestToParty}
              className="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded text-sm"
            >
              + Guest to Party
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewClientForm;
