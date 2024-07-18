import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useTeamContext } from "../context";
import { AnimatedPage, LoadingComponent } from "../components";

const TeamMemberDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { selectedTeamMember, setSelectedTeamMember } = useTeamContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3015/api/v1/users/${id}`);
        setSelectedTeamMember(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching team member data:", error);
      }
    };

    if (!selectedTeamMember) {
      fetchTeamMember();
    } else {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedTeamMember((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3015/api/v1/users/${selectedTeamMember.user_id}`,
        selectedTeamMember
      );
      setSelectedTeamMember(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleToggleChange = (e) => {
    const { id } = e.target;
    const newValue = selectedTeamMember[id] === "Active" ? "Inactive" : "Active";

    console.log(newValue);

    setSelectedTeamMember((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
  };

  return (
    <AnimatedPage>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="flex flex-col pb-10 col">
            <h1 className="text-2xl font-semibold">Team Member Details</h1>
            <p className="text-xs text-gray-500">
              Business ID: <span>{selectedTeamMember?.tenant_id}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 border-b-[.5px] border-gray-700">
            <div className="md:col-span-1">
              <h1>{t("general.title")}</h1>
              <p className="text-xs text-gray-500">{t("general.description")}</p>
            </div>
            <div className="flex flex-col gap-6 md:col-span-2">
              <div className="flex flex-col w-full gap-3 md:flex-row">
                <div className="w-full mb-6 md:w-1/2">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("user_id")}</label>
                  <input
                    className="hover:cursor-not-allowed appearance-none block w-full bg-[#111827] border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight text-sm text-gray-600"
                    id="user_id"
                    type="text"
                    value={selectedTeamMember?.user_id}
                    disabled
                  />
                </div>
                <div className="items-center w-full mb-6 md:w-1/2">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("user_name")}</label>
                  <input
                    className="hover:cursor-not-allowed  appearance-none block w-full bg-[#111827] border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight text-sm text-gray-600"
                    id="user_name"
                    type="text"
                    value={selectedTeamMember?.user_name}
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-3 md:flex-row">
                <div className="items-center w-full mb-6 md:w-1/2">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("first_name")}</label>
                  <input
                    className="appearance-none block w-full bg-[#111827] border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight text-sm focus:outline-none focus:bg-[#141d2f]"
                    id="first_name"
                    type="text"
                    value={selectedTeamMember?.first_name}
                    placeholder={selectedTeamMember?.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full mb-6 md:w-1/2">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("last_name")}</label>
                  <input
                    className="appearance-none block w-full bg-[#111827] border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight text-sm focus:outline-none focus:bg-[#141d2f]"
                    id="last_name"
                    type="text"
                    value={selectedTeamMember?.last_name}
                    placeholder={selectedTeamMember?.last_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-3 md:flex-row">
                <div className="items-center w-full mb-6 md:w-1/2">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("email")}</label>
                  <input
                    className="appearance-none block w-full bg-[#111827] border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight text-sm focus:outline-none focus:bg-[#141d2f]"
                    id="email"
                    type="text"
                    value={selectedTeamMember?.email}
                    placeholder={selectedTeamMember?.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full mb-6 md:w-1/2">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">
                    {t("phone_number")}
                  </label>
                  <input
                    className="appearance-none block w-full bg-[#111827] border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight text-sm focus:outline-none focus:bg-[#141d2f]"
                    id="phone_number"
                    type="text"
                    value={selectedTeamMember?.phone_number}
                    placeholder={selectedTeamMember?.phone_number}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 border-b-[.5px] border-gray-700">
            <div className="md:col-span-1">
              <h1>{t("employment_status")}</h1>
              <p className="text-xs text-gray-500">{t("preferences.description")}</p>
            </div>
            <div className="flex flex-col md:col-span-2">
              <div className="flex flex-col gap-10 md:flex-row">
                <div className="w-full mb-6 md:w-1/2">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("role")}</label>
                  <input
                    className="appearance-none block w-full bg-[#111827] border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight text-sm focus:outline-none focus:bg-[#141d2f]"
                    id="role"
                    type="text"
                    value={selectedTeamMember?.role}
                    placeholder={selectedTeamMember?.role}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="items-center mb-6">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">{t("status")}</label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="status"
                      type="checkbox"
                      className="sr-only peer"
                      checked={selectedTeamMember?.status === "Active"}
                      onChange={handleToggleChange}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="text-xs font-medium text-gray-900 ms-3 dark:text-gray-400">Inactive / Active</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="p-1 px-4 py-2 text-white border border-gray-200 rounded-lg dark:hover:bg-gray-600 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white"
            >
              {t("save")}
            </button>
          </div>
        </>
      )}
    </AnimatedPage>
  );
};

export default TeamMemberDetails;
