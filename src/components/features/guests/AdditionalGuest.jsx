import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGuestRegistrationContext } from "../../../context";

const guestSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  identification_number: z.string().min(1, "Identification number is required"),
});

const AdditionalGuest = ({ guest }) => {
  const { t } = useTranslation();
  const { setReservationData } = useGuestRegistrationContext();

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(guestSchema),
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
    <form className="mx-5 mb-6 flex flex-row">
      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <input
          className={`mb-3 block w-full appearance-none rounded border border-gray-400 bg-[#111827] px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:bg-[#192338] focus:outline-none ${errors.first_name ? "border-red-500" : ""}`}
          placeholder={t("first_name")}
          {...register("first_name", {
            onChange: (e) => handleInputChange("first_name", e.target.value),
          })}
        />
        {errors.first_name && <p className="text-xs italic text-red-500">{errors.first_name.message}</p>}
      </div>
      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <input
          className={`mb-3 block w-full appearance-none rounded border border-gray-400 bg-[#111827] px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:bg-[#192338] focus:outline-none ${errors.last_name ? "border-red-500" : ""}`}
          placeholder={t("last_name")}
          {...register("last_name", {
            onChange: (e) => handleInputChange("last_name", e.target.value),
          })}
        />
        {errors.last_name && <p className="text-xs italic text-red-500">{errors.last_name.message}</p>}
      </div>
      <div className="relative mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <span className="pointer-events-none absolute left-6 top-2 z-10 text-sm text-gray-400">
          {/* <p>{t("dob")}</p> */}
          <p>DOB</p>
        </span>
        <input
          className={`mb-3 block w-full appearance-none rounded border border-gray-400 bg-[#111827] px-4 py-2 pl-12 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:bg-[#192338] focus:outline-none ${errors.date_of_birth ? "border-red-500" : ""}`}
          type="date"
          placeholder={t("dob")}
          {...register("date_of_birth", {
            onChange: (e) => handleInputChange("date_of_birth", e.target.value),
          })}
        />
        {errors.date_of_birth && <p className="text-xs italic text-red-500">{errors.date_of_birth.message}</p>}
      </div>
      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <input
          className={`mb-3 block w-full appearance-none rounded border border-gray-400 bg-[#111827] px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:bg-[#192338] focus:outline-none ${errors.nationality ? "border-red-500" : ""}`}
          placeholder={t("nationality")}
          {...register("nationality", {
            onChange: (e) => handleInputChange("nationality", e.target.value),
          })}
        />
        {errors.nationality && <p className="text-xs italic text-red-500">{errors.nationality.message}</p>}
      </div>
      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <input
          className={`mb-3 block w-full appearance-none rounded border border-gray-400 bg-[#111827] px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:bg-[#192338] focus:outline-none ${errors.identification_number ? "border-red-500" : ""}`}
          placeholder={t("identification_number")}
          {...register("identification_number", {
            onChange: (e) => handleInputChange("identification_number", e.target.value),
          })}
        />
        {errors.identification_number && <p className="text-xs italic text-red-500">{errors.identification_number.message}</p>}
      </div>
      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
        <input
          className={`mb-3 block w-full appearance-none rounded border border-gray-400 bg-[#111827] px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:bg-[#192338] focus:outline-none ${errors.email ? "border-red-500" : ""}`}
          type="email"
          placeholder={t("email")}
          {...register("email", {
            onChange: (e) => handleInputChange("email", e.target.value),
          })}
        />
        {errors.email && <p className="text-xs italic text-red-500">{errors.email.message}</p>}
      </div>
      <div className="relative flex flex-row items-center justify-center">
        <button title="Remove Guest" type="button" onClick={() => removeAdditionalGuest(guest.id)} className="rounded-lg p-1.5 text-red-500 dark:hover:bg-gray-600 dark:hover:text-red-600">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default AdditionalGuest;
