import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGuestContext, useGuestRegistrationContext } from "../../../context";
import { AnimatedPage } from "../../../components";
import { formatDateTime } from "../../../utils/standardMethods";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { guestSchema } from "../../utils/Schemas";
import { SlCalender } from "react-icons/sl";
import DatePicker from "react-datepicker";

const NewGuestForm = () => {
  const { t } = useTranslation();
  const { selectedGuest } = useGuestContext();
  const { guestData, setGuestData, showReservationForm, setShowReservationForm } = useGuestRegistrationContext();
  const {
    register,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(guestSchema),
    defaultValues: guestData,
    mode: "onBlur",
  });

  useEffect(() => {
    const data = selectedGuest || guestData;
    Object.keys(guestData).forEach((key) => {
      if (key === "date_of_birth") {
        data[key] = formatDateTime(data[key], true);
      }
      setValue(key, data[key]);
    });

    if (selectedGuest) {
      setGuestData(selectedGuest);
    }
  }, [selectedGuest, setValue, guestData]);

  const toggleNewGuestForm = () => {
    setShowReservationForm(!showReservationForm);
  };

  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;
    const { group, field } = dataset;

    setGuestData((prev) => {
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
    setGuestData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  return (
    <AnimatedPage>
      <form className="rounded-xl p-4 dark:bg-[#282828]">
        <h1 className="pb-6 text-green-400">{t("primary_guest")}</h1>
        <div className="-mx-3 mb-6 flex flex-wrap text-white">
          <div className="w-full px-3 md:mb-0 md:w-1/4">
            <input
              className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.first_name ? "border-red-500" : ""}`}
              placeholder={t("first_name")}
              {...register("first_name")}
              onChange={handleInputChange}
            />
            <div className="h-5">{errors.first_name && <p className="text-xs italic text-red-500">{errors.first_name.message}</p>}</div>
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <input
              className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.last_name ? "border-red-500" : ""}`}
              placeholder={t("last_name")}
              {...register("last_name")}
              onChange={handleInputChange}
            />
            <div className="h-5">{errors.last_name && <p className="text-xs italic text-red-500">{errors.last_name.message}</p>}</div>
          </div>
          <div className="relative mb-6 flex w-full flex-col px-3 md:mb-0 md:w-1/4">
            <span className="pointer-events-none absolute left-6 top-2.5 z-10 text-sm text-gray-400">
              <p>{t("dob")}</p>
            </span>
            <Controller
              control={control}
              name="date_of_birth"
              rules={{ required: "Date of Birth is required" }}
              render={({ field }) => (
                <DatePicker
                  className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 pl-12 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.date_of_birth ? "border-red-500" : ""}`}
                  selected={field.value}
                  placeholderText="mm/dd/yyyy"
                  onChange={(date) => {
                    field.onChange(date);
                    handleDateChange("date_of_birth", date);
                    trigger("date_of_birth");
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
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <input
              className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.nationality ? "border-red-500" : ""}`}
              placeholder={t("nationality")}
              {...register("nationality")}
              onChange={handleInputChange}
            />
            <div className="h-5">{errors.nationality && <p className="text-xs italic text-red-500">{errors.nationality.message}</p>}</div>
          </div>
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap text-white">
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <Controller
              control={control}
              name="address.city"
              render={({ field }) => (
                <input
                  className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.address?.city ? "border-red-500" : ""}`}
                  placeholder={t("city")}
                  {...field}
                  data-group="address"
                  data-field="city"
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              )}
            />
            <div className="h-5">{errors.address?.city && <p className="text-xs italic text-red-500">{errors.address.city.message}</p>}</div>
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <Controller
              control={control}
              name="address.state"
              render={({ field }) => (
                <input
                  className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.address?.state ? "border-red-500" : ""}`}
                  placeholder={t("state")}
                  {...field}
                  data-group="address"
                  data-field="state"
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              )}
            />
            <div className="h-5">{errors.address?.state && <p className="text-xs italic text-red-500">{errors.address.state.message}</p>}</div>
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <Controller
              control={control}
              name="address.postal_code"
              render={({ field }) => (
                <input
                  className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.address?.postal_code ? "border-red-500" : ""}`}
                  placeholder={t("postal_code")}
                  {...field}
                  data-group="address"
                  data-field="postal_code"
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              )}
            />
            <div className="h-5">{errors.address?.postal_code && <p className="text-xs italic text-red-500">{errors.address.postal_code.message}</p>}</div>
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <Controller
              control={control}
              name="address.country"
              render={({ field }) => (
                <input
                  className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.address?.country ? "border-red-500" : ""}`}
                  placeholder={t("country")}
                  {...field}
                  data-group="address"
                  data-field="country"
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              )}
            />
            <div className="h-5">{errors.address?.country && <p className="text-xs italic text-red-500">{errors.address.country.message}</p>}</div>
          </div>
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap text-white">
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
            <input
              className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.identification_number ? "border-red-500" : ""}`}
              placeholder={t("identification_number")}
              {...register("identification_number")}
              onChange={handleInputChange}
            />
            <div className="h-5">{errors.identification_number && <p className="text-xs italic text-red-500">{errors.identification_number.message}</p>}</div>
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <input
              className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.email ? "border-red-500" : ""}`}
              type="email"
              placeholder={t("email")}
              {...register("email")}
              onChange={handleInputChange}
            />
            <div className="h-5">{errors.email && <p className="text-xs italic text-red-500">{errors.email.message}</p>}</div>
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <input
              className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${errors.phone_number ? "border-red-500" : ""}`}
              type="tel"
              placeholder={t("phone_number")}
              {...register("phone_number")}
              onChange={handleInputChange}
            />
            {errors.phone_number && <p className="text-xs italic text-red-500">{errors.phone_number.message}</p>}
          </div>
        </div>
        <h1 className="pb-6 text-green-400">{t("emergency_contact")}</h1>
        <div className="-mx-3 mb-6 flex flex-wrap text-white">
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <Controller
              control={control}
              name="emergency_contact.first_name"
              render={({ field }) => (
                <input
                  className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${
                    errors.emergency_contact?.first_name ? "border-red-500" : ""
                  }`}
                  placeholder={t("first_name")}
                  {...field}
                  data-group="emergency_contact"
                  data-field="first_name"
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              )}
            />
            <div className="h-5">{errors.emergency_contact?.first_name && <p className="text-xs italic text-red-500">{errors.emergency_contact.first_name.message}</p>}</div>
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <Controller
              control={control}
              name="emergency_contact.last_name"
              render={({ field }) => (
                <input
                  className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${
                    errors.emergency_contact?.last_name ? "border-red-500" : ""
                  }`}
                  placeholder={t("last_name")}
                  {...field}
                  data-group="emergency_contact"
                  data-field="last_name"
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              )}
            />
            <div className="h-5">{errors.emergency_contact?.last_name && <p className="text-xs italic text-red-500">{errors.emergency_contact.last_name.message}</p>}</div>
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <Controller
              control={control}
              name="emergency_contact.phone_number"
              render={({ field }) => (
                <input
                  className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 ${
                    errors.emergency_contact?.phone_number ? "border-red-500" : ""
                  }`}
                  type="tel"
                  placeholder={t("phone_number")}
                  {...field}
                  data-group="emergency_contact"
                  data-field="phone_number"
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              )}
            />
            <div className="h-5">{errors.emergency_contact?.phone_number && <p className="text-xs italic text-red-500">{errors.emergency_contact.phone_number.message}</p>}</div>
          </div>
        </div>
        <h1 className="pb-6 text-green-400">{t("vehicle_information")}</h1>
        <div className="-mx-3 mb-6 flex flex-wrap text-white">
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <Controller
              control={control}
              name="vehicle.make"
              render={({ field }) => (
                <input
                  className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700`}
                  placeholder={t("make")}
                  {...field}
                  data-group="vehicle"
                  data-field="make"
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              )}
            />
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <Controller
              control={control}
              name="vehicle.model"
              render={({ field }) => (
                <input
                  className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700 `}
                  placeholder={t("model")}
                  {...field}
                  data-group="vehicle"
                  data-field="model"
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              )}
            />
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
            <Controller
              control={control}
              name="vehicle.plate_number"
              render={({ field }) => (
                <input
                  className={`mb-3 block w-full appearance-none rounded border border-gray-400 px-4 py-2 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700`}
                  placeholder={t("plate_number")}
                  {...field}
                  data-group="vehicle"
                  data-field="plate_number"
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              )}
            />
          </div>
        </div>
      </form>
      <div className="my-4 flex items-center justify-between space-x-3">
        <h1 className="text-2xl font-semibold">{showReservationForm ? t("new_reservation") : ""}</h1>
        <button
          type="button"
          onClick={toggleNewGuestForm}
          className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white p-4 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-black dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 md:w-auto"
        >
          {showReservationForm ? (
            <>
              <CgMathMinus className="-ml-1 mr-1.5 size-4 text-red-500" />
              {t("remove_reservation")}
            </>
          ) : (
            <>
              <CgMathPlus className="-ml-1 mr-1.5 size-4 text-green-400" />
              {t("new_reservation")}
            </>
          )}
        </button>
      </div>
    </AnimatedPage>
  );
};

export default NewGuestForm;
