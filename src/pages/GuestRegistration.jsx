import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGuestRegistrationContext, useGuestContext, useAlertContext } from "../context";
import { AnimatedPage, NewGuestForm, NewReservationForm, SearchBar, LoadingComponent } from "../components";
import { CgMathMinus } from "react-icons/cg";
import { useState } from "react";

const GuestRegistration = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { clearGuests } = useGuestContext();
  const { showAlert } = useAlertContext();
  const { guestData, resetGuestData, reservationData, resetReservationData, showReservationForm, setShowReservationForm } = useGuestRegistrationContext();
  const [loading, setLoading] = useState(false);

  const isFormValid = () => {
    const guestFields = ["first_name", "last_name", "date_of_birth", "nationality", "identification_number", "email", "phone_number"];
    const addressFields = ["city", "state", "postal_code", "country"];
    const reservationFields = ["payment_method", "total_amount", "payment_status", "room_numbers", "check_in", "check_out"];
    const guestValid = guestFields.every((field) => guestData[field].toString().trim() !== "");
    const addressValid = addressFields.every((field) => guestData.address[field].toString().trim() !== "");

    if (!guestValid || !addressValid) {
      return false;
    }

    if (setShowReservationForm) {
      const reservationValid = reservationFields.every((field) => reservationData[field].toString().trim() !== "");
      const additionalGuestsValid = reservationData.additional_guests.every((guest) => Object.values(guest).every((field) => field.toString().trim() !== ""));
      return reservationValid && additionalGuestsValid && reservationData.room_numbers.length > 0;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        setLoading(true);

        const guestResponse = await axios.post(`http://localhost:3015/api/v1/guests`, guestData);

        if (setShowReservationForm) {
          const reservationDetails = {
            ...reservationData,
            primary_guest_id: guestResponse.data.data.guest_id,
          };

          await axios.post(`http://localhost:3015/api/v1/reservations`, reservationDetails);
        }

        showAlert("Guest reservation successfully completed");
        setLoading(false);
        resetForm();
        navigate("/guests");
      } catch (error) {
        showAlert("Error saving guest reservation");
        setLoading(false);
      }
    } else {
      showAlert("All required fields must be filled in before submitting.", "warning");
    }
  };

  const resetForm = () => {
    clearGuests();
    resetGuestData();
    resetReservationData();
    setShowReservationForm(false);
  };

  const handleCancel = () => {
    resetForm();
    navigate(-1);
  };

  if (loading) return <LoadingComponent />;

  return (
    <AnimatedPage>
      <div className="flex flex-grow flex-col pb-20 pt-4">
        <div className="mb-4 inline-flex justify-between">
          <h1 className="text-2xl font-semibold">{t("guest_registration")}</h1>
          <div className="w-full md:w-1/2">
            <SearchBar />
          </div>
          <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
            <div className="flex w-full items-center space-x-3 md:w-auto">
              <button
                type="button"
                onClick={() => resetForm()}
                className="hover:text-primary-700 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
              >
                <CgMathMinus className="-ml-1 mr-1.5 size-4 text-red-500" />
                {t("clear_form")}
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4 flex-grow px-4">
          <NewGuestForm />
          {showReservationForm && <NewReservationForm />}
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-end space-x-2 border-t border-gray-200 bg-[#111827] p-4 dark:border-gray-600">
          <button
            onClick={handleCancel}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-700"
          >
            {t("cancel")}
          </button>
          <button onClick={handleSubmit} className="rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {t("submit")}
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default GuestRegistration;
