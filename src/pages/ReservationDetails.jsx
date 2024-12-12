import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReservationsContext } from "../context";
import { AnimatedPage, DisplayCard, LoadingComponent, StatusIndicator } from "../components";
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
      <div className="py-2">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">{t("reservation_status")}</h1>
          <span className="ml-2 inline-flex items-center">
            <StatusIndicator status={selectedReservation.guest_status} />
          </span>
        </div>

        <div className="grid min-h-[85vh] sm:grid-cols-1 md:gap-3 lg:grid-cols-2">
          <div className="flex flex-col border-neutral-700 py-4 pr-4 dark:border-neutral-600 sm:border-b lg:border-r">
            <div className="rounded-xl p-4 pt-8 dark:bg-[#282828]">
              <div className="grid md:grid-cols-2 md:gap-3">
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("reservation_id")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-neutral-600 dark:text-white">{selectedReservation.reservation_id || "N/A"}</p>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("room_numbers")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-neutral-600 dark:text-white">{selectedReservation.room_numbers?.join(", ") || "N/A"}</p>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("check_in")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-neutral-600 dark:text-white">{formatDateTime(selectedReservation.check_in) || "N/A"}</p>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("check_out")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-neutral-600 dark:text-white">{formatDateTime(selectedReservation.check_out) || "N/A"}</p>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("total")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-neutral-600 dark:text-white">{selectedReservation.total_amount || "N/A"}</p>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("payment_method")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-neutral-600 dark:text-white">{selectedReservation.payment_method || "N/A"}</p>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("payment_status")}</label>
                  <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-neutral-600 dark:text-white">{selectedReservation.payment_status || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-2">
            <div className="grid gap-4 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <DisplayCard title="Primary Guest" data={selectedReservation.primary_guest.first_name + " " + selectedReservation.primary_guest.last_name} path={`/guests/${selectedReservation.primary_guest_id}`} />
            </div>
            <div className="grid gap-4 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {additionalGuests.map((guest, index) => (
                <div key={index}>
                  <DisplayCard title={`Additional Guest: ${index + 1}`} data={guest.first_name + " " + guest.last_name} path={`/guests/${guest.guest_id}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ReservationDetails;
