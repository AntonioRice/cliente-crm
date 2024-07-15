import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CgMathMinus } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { useReservationsContext } from "../context";
import { AnimatedPage, LoadingComponent, StatusIndicator } from "../components";
import { formatDateTime } from "../utils/standardMethods";

const ReservationDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { selectedReservation, setSelectedReservation, clearReservation } = useReservationsContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3015/api/v1/reservations/${id}`);
        if (response.data.data) {
          setSelectedReservation(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id, setSelectedReservation]);

  useEffect(() => {
    return () => {
      clearReservation();
    };
  }, []);

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

  if (loading) {
    return <LoadingComponent />;
  }

  if (!selectedReservation) {
    return <div>Reservation Not Found</div>;
  }

  return (
    <AnimatedPage>
      <div className="pb-8">
        <h1 className="inline-flex items-center">
          <span className="pr-1 text-green-400"> - </span>
          {t("reservation_details")}
          <span className="inline-flex items-center ml-2">
            <StatusIndicator status={selectedReservation.guest_status} />
          </span>
        </h1>
      </div>
      <div className="grid md:grid-cols-6 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("rooms")}
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
