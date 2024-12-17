import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReservationsContext } from "../context";
import { AnimatedPage, DisplayCard, LoadingComponent, MultiSelectDropdown, StatusIndicator } from "../components";
import { formatDateTime } from "../utils/standardMethods";
import { reservationSchema } from "../components/utils/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa6";

const ReservationDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { selectedReservation, setSelectedReservation } = useReservationsContext();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [tempReservation, setTempReservation] = useState(null);
  const [additionalGuests, setAdditionalGuests] = useState(selectedReservation?.additional_guests || []);

  const paymentMethods = ["Cash", "Credit", "Transfer"];
  const paymentStatus = ["Pending", "Completed", "Failed"];

  const {
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: selectedReservation,
    mode: "onBlur",
  });

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3015/api/v1/reservations/${id}`);
        if (response.data.data) {
          setSelectedReservation(response.data.data);
          setFormData({
            reservation_id: response.data.data.reservation_id,
            room_numbers: response.data.data.room_numbers.join(", "),
            check_in: formatDateTime(response.data.data.check_in),
            check_out: formatDateTime(response.data.data.check_out),
            total_amount: response.data.data.total_amount,
            payment_method: response.data.data.payment_method,
            payment_status: response.data.data.payment_status,
          });

          if (response.data.data.additional_guests) {
            setAdditionalGuests(response.data.data.additional_guests);
          }
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

  const handleEditToggle = () => {
    if (!isEditing) {
      setTempReservation({ ...selectedReservation });
    } else {
      setTempReservation(null);
    }
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3015/api/v1/reservations/${id}`, formData);
      setSelectedReservation((prev) => ({
        ...prev,
        ...formData,
        room_numbers: formData.room_numbers.split(", ").map((num) => parseInt(num, 10)),
      }));
      setTempReservation(null);
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error("Error saving reservation data:", error);
      setTempReservation({ ...selectedReservation });
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData(tempReservation);
    setTempReservation(null);
    setIsEditing(false);
  };

  const handleRoomsChange = (number) => {
    const updatedRooms = selectedReservation.room_numbers.includes(number) ? selectedReservation.room_numbers.filter((r) => r !== number) : [...selectedReservation.room_numbers, number];
    setSelectedReservation((prev) => ({
      ...prev,
      room_numbers: updatedRooms,
    }));
  };

  if (loading || !formData) return <LoadingComponent />;

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
                <div className="group relative  mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("reservation_id")}</label>
                  <p className="peer block w-full cursor-not-allowed border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm dark:border-neutral-600 dark:text-neutral-400">{formData.reservation_id || "N/A"}</p>
                </div>
                <div className="group relative  mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("room_numbers")}</label>
                  {isEditing ? (
                    <div className="mt-2">
                      <MultiSelectDropdown handleRoomsChange={handleRoomsChange} />
                    </div>
                  ) : (
                    <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-neutral-600 dark:text-white">{formData.room_numbers || "N/A"}</p>
                  )}
                </div>
                <div className="group relative  mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("check_in")}</label>
                  {isEditing ? (
                    <input className="peer block w-full border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-neutral-600 dark:text-white" value={formData.check_in} onChange={(e) => handleInputChange("check_in", e.target.value)} />
                  ) : (
                    <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-neutral-600 dark:text-white">{formData.check_in || "N/A"}</p>
                  )}
                </div>
                <div className="group relative mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("check_out")}</label>
                  {isEditing ? (
                    <input className="peer block w-full border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-neutral-600 dark:text-white" value={formData.check_out} onChange={(e) => handleInputChange("check_out", e.target.value)} />
                  ) : (
                    <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-neutral-600 dark:text-white">{formData.check_out || "N/A"}</p>
                  )}
                </div>
                <div className="group relative mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("total")}</label>
                  {isEditing ? (
                    <div className="mt-2">
                      <input
                        className={`mb-1 block w-full appearance-none rounded border border-gray-400 px-6 py-2 leading-tight 
                            placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.total_amount ? "border-red-500" : ""}`}
                        type="number"
                        placeholder={t("total")}
                        {...register("total_amount", {
                          onChange: (e) => handleInputChange("total_amount", e.target.value),
                        })}
                      />
                      <span className="pointer-events-none absolute left-1 top-5 text-gray-400">
                        <FaDollarSign />
                      </span>
                      <div className="h-5">{errors.total_amount && <p className="absolute text-xs italic text-red-500">{errors.total_amount.message}</p>}</div>
                    </div>
                  ) : (
                    <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-neutral-600 dark:text-white">{formData.total_amount || "N/A"}</p>
                  )}
                </div>
                <div className="group relative mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 dark:text-gray-400">{t("payment_method")}</label>
                  {isEditing ? (
                    <div className="mt-2">
                      <select
                        className={`mb-1 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight text-white placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.payment_method ? "border-red-500" : ""}`}
                        {...register("payment_method", {
                          onChange: (e) => handleInputChange(e),
                        })}
                      >
                        <option value="" disabled>
                          {t("payment_selection")}
                        </option>
                        {paymentMethods.map((method, i) => (
                          <option key={i} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-2 top-5 text-gray-400">
                        <IoIosArrowDown />
                      </span>
                      <div className="h-5">{errors.payment_method && <p className="absolute text-xs italic text-red-500">{errors.payment_method.message}</p>}</div>
                    </div>
                  ) : (
                    <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-neutral-600 dark:text-white">{formData.payment_method || "N/A"}</p>
                  )}
                </div>
                <div className="group relative mb-5 w-full">
                  <label className="absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 peer-focus:-translate-y-6 peer-focus:font-medium dark:text-gray-400">{t("payment_status")}</label>
                  {isEditing ? (
                    <div className="mt-2">
                      <select
                        className={`mb-1 block w-full appearance-none rounded border border-gray-400 px-4 py-2
                         leading-tight text-white placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.payment_status ? "border-red-500" : ""}`}
                        {...register("payment_status", {
                          onChange: (e) => handleInputChange("payment_status", e.target.value),
                        })}
                      >
                        <option value="" disabled>
                          {t("payment_status_selection")}
                        </option>
                        {paymentStatus.map((status, i) => (
                          <option key={i} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-5 top-2.5 text-gray-400">
                        <IoIosArrowDown />
                      </span>
                      <div className="h-5">{errors.payment_status && <p className="absolute text-xs italic text-red-500">{errors.payment_status.message}</p>}</div>
                    </div>
                  ) : (
                    <p className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-neutral-600 dark:text-white">{formData.payment_status || "N/A"}</p>
                  )}
                </div>
              </div>
              <div className="mb-2 flex w-full justify-end space-x-2">
                {isEditing ? (
                  <>
                    <button onClick={handleCancelEdit} className="rounded-lg border border-gray-300 bg-white p-1 px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-red-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-gray-400 dark:hover:bg-neutral-600 dark:hover:text-white">
                      {t("cancel")}
                    </button>
                    <button onClick={handleSave} className="rounded-lg border border-gray-300 bg-white p-1 px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-green-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-gray-400 dark:hover:bg-neutral-600 dark:hover:text-white">
                      {t("save")}
                    </button>
                  </>
                ) : (
                  <button onClick={handleEditToggle} className="rounded-lg border border-gray-300 bg-white p-1 px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-green-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-gray-400 dark:hover:bg-neutral-600 dark:hover:text-white">
                    {t("edit")}
                  </button>
                )}
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
