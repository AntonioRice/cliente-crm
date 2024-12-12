import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useTeamContext } from "../context";
import { AnimatedPage, LoadingComponent } from "../components";

const TenantDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedEmployee, setSelectedEmployee } = useTeamContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3015/api/v1/users/${id}`);
        setSelectedEmployee(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching employee data:", error);
      }
    };

    if (!selectedEmployee) {
      fetchEmployee();
    } else {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedEmployee((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3015/api/v1/users/${selectedEmployee.user_id}`, selectedEmployee);
      setSelectedEmployee(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3015/api/v1/users/${selectedEmployee.user_id}`);
      navigate(-1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleToggleChange = (e) => {
    const { id } = e.target;
    const newValue = selectedEmployee[id] === "Active" ? "Inactive" : "Active";

    setSelectedEmployee((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
  };

  if (loading) return <LoadingComponent />;

  return (
    <AnimatedPage>
      <div className="col flex flex-col py-4">
        <h1 className="text-2xl font-semibold">
          {t("tenant.tenant")}: {selectedEmployee?.tenant_id}
        </h1>
      </div>
      <div className="mb-10 grid grid-cols-1 gap-4 border-b-[.5px] border-gray-700 md:grid-cols-3">
        <div className="md:col-span-1">
          <h1>{t("general.title")}</h1>
          <p className="text-xs text-gray-500">{t("general.description")}</p>
        </div>
        <div className="flex flex-col gap-6 md:col-span-2">
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <div className="mb-6 w-full md:w-1/2">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("tenant.tenant_id")}</label>
              <input className="mb-3 block w-full appearance-none rounded-lg border border-gray-400 px-4 py-3 text-sm text-neutral-400 hover:cursor-not-allowed dark:bg-neutral-800" id="user_id" type="text" value={selectedEmployee?.user_id} disabled />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <div className="mb-6 w-full items-center md:w-1/2">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("tenant.tenant_name")}</label>
              <input
                className="mb-3 block w-full appearance-none rounded-lg border border-gray-400 px-4 py-3 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700"
                id="first_name"
                type="text"
                value={selectedEmployee?.first_name}
                placeholder={selectedEmployee?.first_name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 md:flex-row">
            <div className="mb-6 w-full items-center md:w-1/2">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("email")}</label>
              <input
                className="mb-3 block w-full appearance-none rounded-lg border border-gray-400 px-4 py-3 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700"
                id="email"
                type="text"
                value={selectedEmployee?.email}
                placeholder={selectedEmployee?.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6 w-full md:w-1/2">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("phone_number")}</label>
              <input
                className="mb-3 block w-full appearance-none rounded-lg border border-gray-400 px-4 py-3 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700"
                id="phone_number"
                type="text"
                value={selectedEmployee?.phone_number}
                placeholder={selectedEmployee?.phone_number}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 border-b-[.5px] border-gray-700 md:grid-cols-3">
        <div className="md:col-span-1">
          <h1>{t("tenant.tenant_status.title")}</h1>
          <p className="text-xs text-gray-500">{t("tenant.tenant_status.description")}</p>
        </div>
        <div className="flex flex-col md:col-span-2">
          <div className="flex flex-col gap-10 md:flex-row">
            <div className="mb-6 w-full md:w-1/2">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("membership")}</label>
              <input
                className="mb-3 block w-full appearance-none rounded-lg border border-gray-400 px-4 py-3 leading-tight placeholder:text-xs placeholder:uppercase placeholder:tracking-wide focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-neutral-700"
                id="membership"
                type="text"
                value={selectedEmployee?.role}
                placeholder={selectedEmployee?.role}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6 items-center">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("tenant.status")}</label>
              <label className="inline-flex cursor-pointer items-center">
                <input id="status" type="checkbox" className="peer sr-only" checked={selectedEmployee?.status === "Active"} onChange={handleToggleChange} />
                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-green-800 rtl:peer-checked:after:-translate-x-full"></div>
                <span className="ms-3 text-xs font-medium text-gray-900 dark:text-gray-400">Inactive / Active</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button onClick={handleDelete} className="rounded-lg border border-gray-200 bg-gray-50 p-1 px-4 py-2 text-red-500 dark:border-gray-700 dark:bg-[#282828] dark:hover:bg-gray-600">
          {t("delete")}
        </button>
        <button onClick={handleSave} className="rounded-lg border border-gray-200 bg-gray-50 p-1 px-4 py-2 text-white dark:border-gray-700 dark:bg-[#282828] dark:hover:bg-gray-600">
          {t("update")}
        </button>
      </div>
    </AnimatedPage>
  );
};

export default TenantDetails;
