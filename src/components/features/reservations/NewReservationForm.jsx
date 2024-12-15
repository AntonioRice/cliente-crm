import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgMathPlus } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa6";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { useGuestRegistrationContext } from "../../../context";
import { AdditionalGuest, MultiSelectDropdown, Pill } from "../../../components";
import { SlCalender } from "react-icons/sl";
import { reservationSchema } from "../../utils/Schemas";

const NewReservationForm = () => {
  const { t } = useTranslation();
  const { reservationData, setReservationData } = useGuestRegistrationContext();
  const paymentMethods = ["Cash", "Credit", "Transfer"];
  const paymentStatus = ["Pending", "Completed", "Failed"];

  const {
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: reservationData,
    mode: "onBlur",
  });

  useEffect(() => {
    Object.keys(reservationData).forEach((key) => setValue(key, reservationData[key]));
  }, [reservationData, setValue]);

  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;
    const { group, field } = dataset;

    setReservationData((prev) => {
      if (group) {
        return {
          ...prev,
          [group]: {
            ...prev[group],
            [field]: value,
          },
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const handleDateChange = (field, date) => {
    setReservationData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleRoomsChange = (number) => {
    const updatedRooms = reservationData.room_numbers.includes(number) ? reservationData.room_numbers.filter((r) => r !== number) : [...reservationData.room_numbers, number];
    setReservationData((prev) => ({
      ...prev,
      room_numbers: updatedRooms,
    }));
  };

  const handleAddGuestToParty = () => {
    const newAdditionalGuest = { id: uuidv4() };
    setReservationData((prev) => {
      return {
        ...prev,
        additional_guests: [...prev.additional_guests, newAdditionalGuest],
      };
    });
  };

  return (
    <form className="rounded-xl p-4 pb-20 text-white dark:bg-[#282828]">
      <h1 className="pb-6 text-green-400">{t("room_information")}</h1>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4 ">
          <MultiSelectDropdown handleRoomsChange={handleRoomsChange} />
        </div>
        <div className="relative mb-6 w-full px-3 md:mb-0 md:w-1/4">
          {!reservationData.room_numbers.length > 0 && <label className="absolute left-6 top-3 text-xs uppercase leading-tight tracking-wide text-gray-400">{t("rooms")}</label>}
          <div className={`mb-1 flex h-[38px] w-full flex-wrap items-center rounded border dark:bg-neutral-700 ${!reservationData.room_numbers.length > 0 ? "border-red-500" : "border-gray-400"}`}>
            {reservationData.room_numbers.map((room, i) => (
              <Pill key={i} text={room} handleRoomsChange={handleRoomsChange} />
            ))}
          </div>
          <div className="h-5">{!reservationData.room_numbers.length > 0 && <p className="absolute text-xs italic text-red-500">{t("room_warning")}</p>}</div>
        </div>
        <div className="relative mb-6 flex w-full flex-col px-3 md:mb-0 md:w-1/4">
          <span className="pointer-events-none absolute left-6 top-3 z-10 text-sm text-gray-400">
            <LuLogIn />
          </span>
          <Controller
            control={control}
            name="check_in"
            render={({ field }) => (
              <DatePicker
                className="mb-1 block w-full appearance-none rounded border border-gray-400 px-4 py-2 pl-8 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:outline-none dark:bg-neutral-700"
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  handleDateChange("check_in", date);
                }}
              />
            )}
          />
          <span className="pointer-events-none absolute right-5 top-2 text-gray-400">
            <SlCalender size={20} />
          </span>
        </div>
        <div className="relative mb-6 flex w-full flex-col px-3 md:mb-0 md:w-1/4">
          <span className="pointer-events-none absolute left-6 top-3 z-10 text-sm text-gray-400">
            <LuLogOut />
          </span>
          <Controller
            control={control}
            name="check_out"
            render={({ field }) => (
              <DatePicker
                className="mb-1 block w-full appearance-none rounded border border-gray-400 px-4 py-2 pl-8 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:outline-none dark:bg-neutral-700"
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  handleDateChange("check_out", date);
                }}
              />
            )}
          />
          <span className="pointer-events-none absolute right-5 top-2 text-gray-400">
            <SlCalender size={20} />
          </span>
        </div>
      </div>
      {reservationData.additional_guests.map((guest, i) => (
        <div key={guest.id}>
          <h2 className="mx-8 pb-2 text-white">
            {t("guest")} {i + 1}
          </h2>
          <AdditionalGuest guest={guest} />
        </div>
      ))}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleAddGuestToParty}
          className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white p-4 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-black dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 md:w-auto"
        >
          <CgMathPlus className="-ml-1 mr-1.5 size-4 text-green-400" />
          {t("add_guest")}
        </button>
      </div>
      <h1 className="pb-2 text-green-400">{t("payment_information")}</h1>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="relative mb-6 w-full px-3 md:mb-0 md:w-1/4">
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
          <span className="pointer-events-none absolute right-5 top-2.5 text-gray-400">
            <IoIosArrowDown />
          </span>
          <div className="h-5">{errors.payment_method && <p className="absolute text-xs italic text-red-500">{errors.payment_method.message}</p>}</div>
        </div>
        <div className="relative mb-6 w-full px-3 text-white md:mb-0 md:w-1/4">
          <input
            className={`mb-1 block w-full appearance-none rounded border border-gray-400 px-6 py-2 leading-tight 
              placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.total_amount ? "border-red-500" : ""}`}
            type="number"
            placeholder={t("total")}
            {...register("total_amount", {
              onChange: (e) => handleInputChange(e),
            })}
          />
          <span className="pointer-events-none absolute left-5 top-2.5 text-gray-400">
            <FaDollarSign />
          </span>
          <div className="h-5">{errors.total_amount && <p className="absolute text-xs italic text-red-500">{errors.total_amount.message}</p>}</div>
        </div>
        <div className="relative mb-6 w-full px-3 md:mb-0 md:w-1/4">
          <select
            className={`mb-1 block w-full appearance-none rounded border border-gray-400 px-4 py-2
              leading-tight text-white placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.payment_status ? "border-red-500" : ""}`}
            {...register("payment_status", {
              onChange: (e) => handleInputChange(e),
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
      </div>
    </form>
  );
};

export default NewReservationForm;
