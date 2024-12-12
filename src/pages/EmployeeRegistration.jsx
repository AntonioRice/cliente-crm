import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatedPage, LoadingComponent } from "../components";
import { useAuthContext } from "../context";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { employeeSchema } from "../components/utils/Schemas";

const generateUsername = (firstName, lastName) => {
  const lastNamePart = lastName.slice(0, 4).toLowerCase();
  const firstNamePart = firstName.slice(0, 3).toLowerCase();
  return lastNamePart + firstNamePart;
};

const EmployeeRegistration = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(employeeSchema), mode: "onBlur" });

  const firstName = watch("first_name");
  const lastName = watch("last_name");

  useEffect(() => {
    if (firstName && lastName) {
      const username = generateUsername(firstName, lastName);
      setValue("user_name", username);
    }
  }, [firstName, lastName, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.tenant_id = user?.tenant_id;
      await axios.post("http://localhost:3015/api/v1/users", data);
      setLoading(false);
      navigate("/employee");
    } catch (error) {
      setLoading(false);
      console.error("Error creating employee:", error);
    }
  };

  if (loading) return <LoadingComponent />;

  return (
    <AnimatedPage>
      <div className="col flex flex-col py-4">
        <h1 className="text-2xl font-semibold">{t("employee_registration")}</h1>
        <p className="text-xs text-gray-500">
          Business ID: <span>{user?.tenant_id}</span>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 grid grid-cols-1 gap-4 border-b-[.5px] border-gray-700 md:grid-cols-3">
          <div className="md:col-span-1">
            <h1>{t("general.title")}</h1>
            <p className="text-xs text-gray-500">{t("general.description")}</p>
          </div>
          <div className="flex flex-col gap-6 md:col-span-2">
            <div className="flex w-full flex-col gap-3 md:flex-row">
              <div className="mb-6 w-full md:w-1/2">
                <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("user_id")}</label>
                <input className="mb-3 block w-full appearance-none rounded-lg border border-gray-600 bg-[#111827] px-4 py-3 text-sm leading-tight text-gray-600 hover:cursor-not-allowed" id="user_id" type="text" placeholder="TBD" disabled />
              </div>
              <div className="mb-6 w-full items-center md:w-1/2">
                <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("user_name")}</label>
                <input className={`mb-3 block w-full appearance-none rounded-lg border ${errors.user_name ? "border-red-500" : "border-gray-600"} bg-[#111827] px-4 py-3 text-sm leading-tight text-gray-600`} id="user_name" type="text" {...register("user_name")} disabled />
                {errors.user_name && <p className="text-xs italic text-red-500">{errors.user_name.message}</p>}
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 md:flex-row">
              <div className="mb-6 w-full items-center md:w-1/2">
                <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("first_name")}</label>
                <input
                  className={`mb-3 block w-full appearance-none rounded-lg border ${errors.first_name ? "border-red-500" : "border-gray-400"} bg-[#111827] px-4 py-3 text-sm leading-tight focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200`}
                  id="first_name"
                  type="text"
                  {...register("first_name")}
                />
                {errors.first_name && <p className="text-xs italic text-red-500">{errors.first_name.message}</p>}
              </div>
              <div className="mb-6 w-full md:w-1/2">
                <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("last_name")}</label>
                <input
                  className={`mb-3 block w-full appearance-none rounded-lg border ${errors.last_name ? "border-red-500" : "border-gray-400"} bg-[#111827] px-4 py-3 text-sm leading-tight focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200`}
                  id="last_name"
                  type="text"
                  {...register("last_name")}
                />
                {errors.last_name && <p className="text-xs italic text-red-500">{errors.last_name.message}</p>}
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 md:flex-row">
              <div className="mb-6 w-full items-center md:w-1/2">
                <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("email")}</label>
                <input className={`mb-3 block w-full appearance-none rounded-lg border ${errors.email ? "border-red-500" : "border-gray-400"} bg-[#111827] px-4 py-3 text-sm leading-tight focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200`} id="email" type="text" {...register("email")} />
                {errors.email && <p className="text-xs italic text-red-500">{errors.email.message}</p>}
              </div>
              <div className="mb-6 w-full md:w-1/2">
                <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("phone_number")}</label>
                <input
                  className={`mb-3 block w-full appearance-none rounded-lg border ${errors.phone_number ? "border-red-500" : "border-gray-400"} bg-[#111827] px-4 py-3 text-sm leading-tight focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200`}
                  id="phone_number"
                  type="text"
                  {...register("phone_number")}
                />
                {errors.phone_number && <p className="text-xs italic text-red-500">{errors.phone_number.message}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10 grid grid-cols-1 gap-4 border-b-[.5px] border-gray-700 md:grid-cols-3">
          <div className="md:col-span-1">
            <h1>{t("employment_status.title")}</h1>
            <p className="text-xs text-gray-500">{t("employment_status.description")}</p>
          </div>
          <div className="flex flex-col md:col-span-2">
            <div className="flex flex-col gap-10 md:flex-row">
              <div className="mb-6 w-full md:w-1/2">
                <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("role")}</label>
                <select className={`mb-3 block w-full appearance-none rounded-lg border ${errors.role ? "border-red-500" : "border-gray-400"} bg-[#111827] px-4 py-3 text-sm leading-tight focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200`} id="role" {...register("role")}>
                  <option value="Admin">{t("Admin")}</option>
                  <option value="Employee">{t("Employee")}</option>
                </select>
                {errors.role && <p className="text-xs italic text-red-500">{errors.role.message}</p>}
              </div>
              <div className="mb-6 items-center">
                <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("status")}</label>
                <label className="inline-flex cursor-pointer items-center">
                  <input id="status" type="checkbox" className="peer sr-only" disabled />
                  <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                  <div className="ms-3 text-xs font-medium text-gray-900 dark:text-gray-400">Inactive / Active</div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="rounded-lg border border-gray-200 bg-gray-50 p-1 px-4 py-2 text-white dark:border-gray-700 dark:bg-[#282828] dark:hover:bg-gray-600 dark:hover:text-white" type="submit">
            {t("save")}
          </button>
        </div>
      </form>
    </AnimatedPage>
  );
};

export default EmployeeRegistration;
