import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatedPage, NewGuestForm, NewReservationForm, SearchBar, LoadingComponent } from "../components";
import { CgMathMinus } from "react-icons/cg";

const defaultCheckInDate = new Date().toISOString().split("T")[0];
const defaultCheckOutDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
const initialNewGuestData = {
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
};
const initialNewReservationData = {
  payment_method: "",
  total_amount: "",
  payment_status: "",
  guests: [],
  room_numbers: [],
  check_in: defaultCheckInDate,
  check_out: defaultCheckOutDate,
};

const RegisterGuest = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showNewReservationForm, setShowNewReservationForm] = useState(false);
  const [newGuestData, setNewGuestData] = useState(initialNewGuestData);
  const [newReservationData, setNewReservationData] = useState(initialNewReservationData);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        setLoading(true);

        const guestResponse = await axios.post(`http://localhost:3015/api/v1/guests`, newGuestData);

        if (showNewReservationForm) {
          const reservationData = {
            ...newReservationData,
            primary_guest_id: guestResponse.data.data.guest_id,
          };
          await axios.post(`http://localhost:3015/api/v1/reservations`, reservationData);
        }

        setLoading(false);
        navigate("/guests");
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      setTouched({
        first_name: true,
        last_name: true,
        date_of_birth: true,
        nationality: true,
        identification_number: true,
        email: true,
        phone_number: true,
        address_city: true,
        address_state: true,
        address_postal_code: true,
        address_country: true,
      });

      if (showNewReservationForm) {
        setTouched((prev) => ({
          ...prev,
          payment_method: true,
          total_amount: true,
          payment_status: true,
          room_numbers: true,
          check_in: true,
          check_out: true,
          guests: true,
        }));
      }
    }
  };

  const resetForm = () => {
    setNewGuestData(initialNewGuestData);
  };

  const toggleNewReservationForm = () => {
    setShowNewReservationForm(!showNewReservationForm);
  };

  const handleBlur = (e) => {
    const { dataset } = e.target;
    const { group, field } = dataset;

    if (group && field) {
      setTouched((prev) => ({
        ...prev,
        [`${group}_${field}`]: true,
      }));
    } else {
      const fieldName = field || group;
      setTouched((prev) => ({
        ...prev,
        [fieldName]: true,
      }));
    }
  };

  const isFormValid = () => {
    const guestFields = [
      "first_name",
      "last_name",
      "date_of_birth",
      "nationality",
      "identification_number",
      "email",
      "phone_number",
    ];
    const addressFields = ["city", "state", "postal_code", "country"];
    const reservationFields = [
      "payment_method",
      "total_amount",
      "payment_status",
      "room_numbers",
      "check_in",
      "check_out",
    ];
    const guestValid = guestFields.every((field) => newGuestData[field].toString().trim() !== "");
    const addressValid = addressFields.every((field) => newGuestData.address[field].toString().trim() !== "");

    if (!guestValid || !addressValid) {
      return false;
    }

    if (showNewReservationForm) {
      const reservationValid = reservationFields.every((field) => newReservationData[field].toString().trim() !== "");
      const guestsValid = newReservationData.guests.every((guest) =>
        Object.values(guest).every((field) => field.toString().trim() !== "")
      );
      return reservationValid && guestsValid && newReservationData.room_numbers.length > 0;
    }

    return true;
  };

  const isFieldInvalid = (fieldName, group = null) => {
    const field = fieldName;

    if (group) {
      return touched[`${group}_${field}`] && (!newGuestData[group] || !newGuestData[group][field]);
    } else {
      return touched[fieldName] && !newGuestData[fieldName];
    }
  };

  return (
    <AnimatedPage>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="flex flex-col pb-10">
          <div className="inline-flex justify-between p-5">
            <div>
              <h1 className="text-2xl font-semibold">{t("guest_registration")}</h1>
            </div>
            <div className="w-full md:w-1/2">
              <SearchBar />
            </div>
            <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
              <div className="flex items-center w-full space-x-3 md:w-auto">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <CgMathMinus className="-ml-1 mr-1.5 size-4 text-red-500" />
                  {t("clear_form")}
                </button>
              </div>
            </div>
          </div>
          <div className="flex-grow px-4 mb-4">
            <NewGuestForm
              newGuestData={newGuestData}
              setNewGuestData={setNewGuestData}
              toggleReservationForm={toggleNewReservationForm}
              showNewReservationForm={showNewReservationForm}
              handleBlur={handleBlur}
              isFormValid={isFormValid}
              isFieldInvalid={isFieldInvalid}
              setTouched={setTouched}
            />
            {showNewReservationForm && (
              <NewReservationForm
                newReservationData={newReservationData}
                setNewReservationData={setNewReservationData}
                handleBlur={handleBlur}
                isFieldInvalid={isFieldInvalid}
                setTouched={setTouched}
              />
            )}
          </div>
          <div className="fixed bottom-0 left-0 right-0 flex justify-end p-4 border-t border-gray-200 dark:border-gray-600 space-x-2 bg-[#111827] z-40">
            <button
              onClick={() => navigate("/guests")}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleSubmit}
              className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {t("submit")}
            </button>
          </div>
        </div>
      )}
    </AnimatedPage>
  );
};

export default RegisterGuest;
