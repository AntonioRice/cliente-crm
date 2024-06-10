import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGuestContext } from "../context/GuestProvider";
import axios from "axios";
import AnimatedPage from "../components/AnimatedPage";
import LoadingComponent from "../components/LoadingComponent";
import StatusIndicator from "../components/StatusIndicator";
import { formatDateTime } from "../utils/standardMethods";

const GuestDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { selectedGuest, setSelectedGuest } = useGuestContext();
  const [guest, setGuest] = useState(selectedGuest);

  useEffect(() => {
    if (!selectedGuest) {
      const fetchGuest = async () => {
        try {
          const response = await axios.get(`http://localhost:3015/api/v1/guests/${id}`);
          setGuest(response.data.data);
          setSelectedGuest(response.data.data);
        } catch (error) {
          console.error("Error fetching guest data:", error);
        }
      };
      fetchGuest();
    }
  }, [id, selectedGuest, setSelectedGuest]);

  if (!guest) {
    return <LoadingComponent />;
  }

  return (
    <AnimatedPage>
      <div className="pb-8">
        <h1 className="inline-flex items-center">
          <span className="text-green-400 pr-1"> - </span>
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
            {selectedGuest.address.city || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("state")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.address.state || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("postal_code")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.address.postal_code || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("country")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.address.country || "N/A"}
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
      <div className="py-5">
        <h1>
          <span className="text-green-400"> - </span>
          {t("current_reservation")}
        </h1>
      </div>
      <div className="grid md:grid-cols-6 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("rooms")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.room_numbers || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("check_in")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {formatDateTime(selectedGuest.check_in) || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("check_out")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {formatDateTime(selectedGuest.check_out) || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("total")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.total_amount || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("payment_method")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.payment_method || "N/A"}
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:-translate-y-6">
            {t("payment_status")}
          </label>
          <p className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer">
            {selectedGuest.payment_status || "N/A"}
          </p>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default GuestDetails;
