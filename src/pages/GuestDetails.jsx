import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CgMathMinus } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { useGuestContext, useReservationsContext } from "../context";
import { AnimatedPage, LoadingComponent, StatusIndicator } from "../components";
import { formatDateTime } from "../utils/standardMethods";

const GuestDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedGuest, setSelectedGuest } = useGuestContext();
  const { selectedReservation, setSelectedReservation, clearReservation } = useReservationsContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        setLoading(true);
        const guestResponse = await axios.get(`http://localhost:3015/api/v1/guests/${id}`);
        if (guestResponse.data.data) {
          setSelectedGuest(guestResponse.data.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching guest data:", error);
      }
    };

    if (!selectedGuest) {
      fetchGuest();
    } else {
      setLoading(false);
    }
  }, [id, selectedGuest, setSelectedGuest]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const reservationsResponse = await axios.get(`http://localhost:3015/api/v1/guests/${id}/reservations`);
        if (reservationsResponse.data.data) {
          setSelectedReservation(reservationsResponse.data.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching reservation data:", error);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    return () => {
      clearReservation();
    };
  }, []);

  // const handleDeleteGuest = async () => {
  //   try {
  //     setLoading(true);
  //     await axios.delete(`http://localhost:3015/api/v1/guests/${id}`);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("Error deleting guest:", error);
  //   }
  // };

  const handleNavigation = (id) => {
    navigate(`/reservations/details/${id}`);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (!selectedGuest) {
    return <div>Guest Not Found</div>;
  }

  return (
    <AnimatedPage>
      <div className="pb-8">
        <h1 className="inline-flex items-center text-2xl font-semibold">
          {t("guest_details")}
          <span className="inline-flex items-center ml-2">
            <StatusIndicator status={selectedGuest.guest_status} />
          </span>
        </h1>
      </div>
      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("first_name")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer">
            {selectedGuest.first_name || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("last_name")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer">
            {selectedGuest.last_name || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("dob")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer">
            {formatDateTime(selectedGuest.date_of_birth) || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("nationality")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0  peer">
            {selectedGuest.nationality || "N/A"}
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("city")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer">
            {selectedGuest.address?.city || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("state")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.address?.state || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("postal_code")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.address?.postal_code || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("country")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.address?.country || "N/A"}
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("identification_number")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.identification_number || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("phone_number")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.phone_number || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("email")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0  peer">
            {selectedGuest.email || "N/A"}
          </p>
        </div>
      </div>
      <div className="py-5">
        <h1>
          <span className="text-green-400"> - </span>
          {t("emergency_contact")}
        </h1>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("first_name")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.emergency_contact?.first_name || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("last_name")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.emergency_contact?.last_name || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("phone_number")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.emergency_contact?.phone_number || "N/A"}
          </p>
        </div>
      </div>
      <div className="py-5">
        <h1>
          <span className="text-green-400"> - </span>
          {t("vehicle_information")}
        </h1>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("make")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.vehicle?.make || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("model")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.vehicle?.model || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("plate_number")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.vehicle?.plate_number || "N/A"}
          </p>
        </div>
      </div>

      {selectedReservation && (
        <div>
          <div className="py-5">
            <h1>
              <span className="text-green-400"> - </span>
              {t("latest_reservation")}
            </h1>
          </div>
          <div
            className="p-4 pt-8 bg-gray-700 bg-opacity-50 rounded-lg hover:cursor-pointer hover:bg-opacity-100"
            onClick={() => handleNavigation(selectedReservation.reservation_id)}
          >
            <div className="grid items-center md:grid-cols-6 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
                  {t("room_numbers")}
                </label>
                <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
                  {selectedReservation.room_numbers || "N/A"}
                </p>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
                  {t("check_in")}
                </label>
                <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
                  {formatDateTime(selectedReservation.check_in) || "N/A"}
                </p>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
                  {t("check_out")}
                </label>
                <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
                  {formatDateTime(selectedReservation.check_out) || "N/A"}
                </p>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
                  {t("total")}
                </label>
                <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
                  {selectedReservation.total_amount || "N/A"}
                </p>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
                  {t("payment_method")}
                </label>
                <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
                  {selectedReservation.payment_method || "N/A"}
                </p>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
                  {t("payment_status")}
                </label>
                <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
                  {selectedReservation.payment_status || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className="flex justify-end pt-20">
        <button
          type="button"
          onClick={handleDeleteGuest}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <CgMathMinus className="-ml-1 mr-1.5 size-4 text-red-400" />
          Delete Guest
        </button>
      </div> */}
    </AnimatedPage>
  );
};

export default GuestDetails;
