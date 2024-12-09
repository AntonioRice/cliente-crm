import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
    navigate(`/reservations/${id}`);
  };

  if (loading) return <LoadingComponent />;

  if (!selectedGuest) {
    return <div>Guest Not Found</div>;
  }

  return (
    <AnimatedPage>
      <div className="py-4">
        <h1 className="inline-flex items-center text-2xl font-semibold">
          {t("guest_details")}
          <span className="ml-2 inline-flex items-center">
            <StatusIndicator status={selectedGuest?.guest_status || selectedReservation?.guest_status} />
          </span>
        </h1>
      </div>
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-8 dark:border-gray-700 dark:bg-gray-800">
        <div className="py-5">
          <h1 className="text-green-400">{t("contact_information")}</h1>
        </div>
        <div className="grid md:grid-cols-4 md:gap-6">
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("first_name")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white">{selectedGuest.first_name || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("last_name")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white">{selectedGuest.last_name || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("dob")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white">{formatDateTime(selectedGuest.date_of_birth) || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("nationality")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.nationality || "N/A"}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-4 md:gap-6">
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("city")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white">{selectedGuest.address?.city || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("state")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.address?.state || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("postal_code")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.address?.postal_code || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("country")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.address?.country || "N/A"}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("identification_number")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.identification_number || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("phone_number")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.phone_number || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("email")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.email || "N/A"}</p>
          </div>
        </div>
        <div className="py-5">
          <h1 className="text-green-400">{t("emergency_contact")}</h1>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("first_name")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.emergency_contact?.first_name || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("last_name")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.emergency_contact?.last_name || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("phone_number")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.emergency_contact?.phone_number || "N/A"}</p>
          </div>
        </div>
        <div className="py-5">
          <h1 className="text-green-400">{t("vehicle_information")}</h1>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("make")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.vehicle?.make || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("model")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.vehicle?.model || "N/A"}</p>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("plate_number")}</label>
            <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-600  dark:text-white">{selectedGuest.vehicle?.plate_number || "N/A"}</p>
          </div>
        </div>

        {selectedReservation && (
          <>
            <div className="py-5">
              <h1 className="text-green-400">{t("latest_reservation")}</h1>
            </div>
            <div className="rounded-xl bg-gray-700 bg-opacity-50 p-4 pt-8 hover:cursor-pointer hover:bg-opacity-100" onClick={() => handleNavigation(selectedReservation.reservation_id)}>
              <div className="grid items-center md:grid-cols-7 md:gap-6">
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
          </>
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
      </div>
    </AnimatedPage>
  );
};

export default GuestDetails;
