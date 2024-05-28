import React from "react";

const AddGuestToParty = ({ guest, handleGuestInputChange, removeGuestFromParty, isFieldInvalid, handleBlur }) => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="pb-2 text-white">Guest: {guest.id}</h1>
        <button
          title="Remove Guest"
          type="button"
          onClick={() => removeGuestFromParty(guest.id)}
          className="text-gray-400 rounded-lg p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

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
            value={guest.firstName}
            onChange={(e) => handleGuestInputChange(guest.id, e)}
            onBlur={handleBlur}
            required
          />
          {isFieldInvalid("firstName") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
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
            value={guest.lastName}
            onChange={(e) => handleGuestInputChange(guest.id, e)}
            onBlur={handleBlur}
            required
          />
          {isFieldInvalid("lastName") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
        </div>
        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-400 text-xs font-light mb-2">Date of Birth</label>
          <input
            className={`appearance-none block w-full bg-gray-200 border ${
              isFieldInvalid("dob") ? "border-red-500" : "border-gray-200"
            } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="dob"
            type="text"
            placeholder="DOB"
            value={guest.dob}
            onChange={(e) => handleGuestInputChange(guest.id, e)}
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
            value={guest.nationality}
            onChange={(e) => handleGuestInputChange(guest.id, e)}
            onBlur={handleBlur}
            required
          />
          {isFieldInvalid("nationality") && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
        </div>
      </div>
    </>
  );
};

export default AddGuestToParty;
