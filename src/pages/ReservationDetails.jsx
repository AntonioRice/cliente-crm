import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReservationsContext } from "../context";
import { AnimatedPage, LoadingComponent, StatusIndicator } from "../components";
import { formatDateTime } from "../utils/standardMethods";

const ReservationDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { selectedReservation, setSelectedReservation } = useReservationsContext();
  const [loading, setLoading] = useState(false);
  const [additionalGuests, setAdditionalGuests] = useState(selectedReservation?.additional_guests || []);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3015/api/v1/reservations/${id}`);
        if (response.data.data) {
          setSelectedReservation(response.data.data);
        }
        if (response.data.data.additional_guests) {
          setAdditionalGuests(response.data.data.additional_guests);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
        setLoading(false);
      }
    };

    if (!selectedReservation) {
      fetchReservation();
    }
  }, [id, setSelectedReservation, selectedReservation]);

  // const handleDeleteReservation = async () => {
  //   try {
  //     setLoading(true);
  //     await axios.delete(`http://localhost:3015/api/v1/reservation/${id}`);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("Error deleting reservation:", error);
  //   }
  // };

  if (loading) return <LoadingComponent />;

  if (!selectedReservation) {
    return <div>Reservation Not Found</div>;
  }

  return (
    <AnimatedPage>
      <div className="py-4">
        <div className="flex items-center pb-4">
          <h1 className="text-2xl font-semibold">{t("reservation_details")}</h1>
          <span className="ml-2 inline-flex items-center">
            <StatusIndicator status={selectedReservation.guest_status} />
          </span>
        </div>
      </div>
      <h1 className="pb-4">
        <span className="text-green-400"> - {t("primary_guest")}: </span>
        {selectedReservation.primary_guest.first_name} {selectedReservation.primary_guest.last_name}
      </h1>
      <div className="rounded-lg bg-gray-700 p-4 pt-8">
        <div className="grid md:grid-cols-7 md:gap-6">
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("reservation_id")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedReservation.reservation_id || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("room_numbers")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedReservation.room_numbers?.join(", ") || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("check_in")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{formatDateTime(selectedReservation.check_in) || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("check_out")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{formatDateTime(selectedReservation.check_out) || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("total")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedReservation.total_amount || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("payment_method")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedReservation.payment_method || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("payment_status")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedReservation.payment_status || "N/A"}</p>
          </div>
        </div>
      </div>
      <h1 className="p-4">
        <span className="text-green-400"> - {t("additional_guests")}</span>
      </h1>
      {additionalGuests && additionalGuests.length > 0 ? (
        <div className="rounded-lg bg-gray-700 p-4 pt-8">
          {additionalGuests.map((guest, index) => (
            <div key={index}>
              <div className="grid md:grid-cols-6 md:gap-6">
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("first_name")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{guest.first_name || "N/A"}</p>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("last_name")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{guest.last_name || "N/A"}</p>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("date_of_birth")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{guest.date_of_birth || "N/A"}</p>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("nationality")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{guest.nationality || "N/A"}</p>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("identification_number")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{guest.identification_number || "N/A"}</p>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("email")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{guest.email || "N/A"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-sm">No Additional Guests</div>
      )}

      {/* <div className="flex justify-end pt-20">
        <button
          type="button"
          onClick={handleDeleteReservation}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <CgMathMinus className="-ml-1 mr-1.5 size-4 text-red-400" />
          Delete Reservation
        </button>
      </div> */}
    </AnimatedPage>
  );
};

export default ReservationDetails;
