import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGuestRegistrationContext } from "../../../context";
import { additionalGuestSchema } from "../../utils/Schemas";
import DatePicker from "react-datepicker";
import { SlCalender } from "react-icons/sl";

const AdditionalGuest = ({ guest }) => {
  const { t } = useTranslation();
  const { setReservationData } = useGuestRegistrationContext();

  const {
    register,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(additionalGuestSchema),
    defaultValues: guest,
    mode: "onBlur",
  });

  useEffect(() => {
    Object.keys(guest).forEach((key) => setValue(key, guest[key]));
  }, [guest, setValue]);

  const handleInputChange = (name, value) => {
    setReservationData((prev) => {
      const updatedGuests = prev.additional_guests.map((g) => (g.id === guest.id ? { ...g, [name]: value } : g));
      return { ...prev, additional_guests: updatedGuests };
    });
  };

  const removeAdditionalGuest = (id) => {
    setReservationData((prev) => {
      const updatedAdditionalGuests = prev.additional_guests.filter((guest) => guest.id !== id);
      return { ...prev, additional_guests: updatedAdditionalGuests };
    });
  };

  return (
    <div className="mx-5 mb-2 flex flex-row">
      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <input
          className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.first_name ? "border-red-500" : ""}`}
          placeholder={t("first_name")}
          {...register("first_name", {
            onChange: (e) => handleInputChange("first_name", e.target.value),
          })}
        />
        <div className="h-5">{errors.first_name && <p className="text-xs italic text-red-500">{errors.first_name.message}</p>}</div>
      </div>
      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <input
          className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.last_name ? "border-red-500" : ""}`}
          placeholder={t("last_name")}
          {...register("last_name", {
            onChange: (e) => handleInputChange("last_name", e.target.value),
          })}
        />
        <div className="h-5">{errors.last_name && <p className="text-xs italic text-red-500">{errors.last_name.message}</p>}</div>
      </div>
      <div className="relative mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <span className="pointer-events-none absolute left-6 top-2.5 z-10 text-sm text-gray-400">
          <p>{t("dob")}</p>
        </span>
        <Controller
          control={control}
          name="date_of_birth"
          rules={{ required: "Date of Birth is required" }}
          render={({ field }) => (
            <DatePicker
              className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 pl-12 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:outline-none dark:bg-neutral-700 ${errors.date_of_birth ? "border-red-500" : ""}`}
              selected={field.value}
              placeholderText="mm/dd/yyyy"
              onChange={(date) => {
                field.onChange(date);
                handleInputChange("date_of_birth", date);
              }}
              onBlur={() => {
                trigger("date_of_birth");
              }}
            />
          )}
        />
        <span className="pointer-events-none absolute right-5 top-2 text-gray-400">
          <SlCalender size={20} />
        </span>
        <div className="h-5">{errors.date_of_birth && <p className="text-xs italic text-red-500">{errors.date_of_birth.message}</p>}</div>
      </div>
      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <input
          className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.nationality ? "border-red-500" : ""}`}
          placeholder={t("nationality")}
          {...register("nationality", {
            onChange: (e) => handleInputChange("nationality", e.target.value),
          })}
        />
        <div className="h-5">{errors.nationality && <p className="text-xs italic text-red-500">{errors.nationality.message}</p>}</div>
      </div>
      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <input
          className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.identification_number ? "border-red-500" : ""}`}
          placeholder={t("identification_number")}
          {...register("identification_number", {
            onChange: (e) => handleInputChange("identification_number", e.target.value),
          })}
        />
        <div className="h-5">{errors.identification_number && <p className="text-xs italic text-red-500">{errors.identification_number.message}</p>}</div>
      </div>
      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <input
          className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.email ? "border-red-500" : ""}`}
          type="email"
          placeholder={t("email")}
          {...register("email", {
            onChange: (e) => handleInputChange("email", e.target.value),
          })}
        />
        <div className="h-5">{errors.email && <p className="text-xs italic text-red-500">{errors.email.message}</p>}</div>
      </div>
      <div className="relative mb-7 flex flex-row items-center justify-center">
        <button title="Remove Guest" type="button" onClick={() => removeAdditionalGuest(guest.id)} className="rounded-lg p-1 text-red-500 dark:hover:bg-neutral-600">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdditionalGuest;
