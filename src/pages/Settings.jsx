import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useAuthContext, useStateContext, useAlertContext } from "../context";
import { AnimatedPage, LoadingComponent } from "../components";
import { compressImage } from "../utils/standardMethods";
import FileUpload from "../components/utils/FileUpload";

const Settings = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAuthContext();
  const { setMode, setLanguage } = useStateContext();
  const { showAlert } = useAlertContext();
  const [newUserData, setNewUserData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isDataChanged = JSON.stringify(newUserData) !== JSON.stringify(user);
    setDisabled(!isDataChanged);
  }, [newUserData, user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleToggleChange = (e) => {
    const { id } = e.target;
    const newValue = id === "language" ? (newUserData.preferences[id] === "en" ? "es" : "en") : newUserData.preferences[id] === "light" ? "dark" : "light";

    setNewUserData((prevData) => ({
      ...prevData,
      preferences: {
        ...prevData.preferences,
        [id]: newValue,
      },
    }));

    if (id === "display_mode") {
      setMode(newValue);
    }

    if (id === "language") {
      setLanguage(newValue);
    }
  };

  const handleSelectedImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressedFile = await compressImage(file);
      setProfilePicture(compressedFile);
      setDisabled(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3015/api/v1/users/${newUserData.user_id}`, newUserData);
      setUser(response.data.data);
      showAlert("Successfully saved updated user information", "success");

      if (profilePicture) {
        const resp = await uploadProfilePicture();
        setUser(resp.data.data);
        showAlert("Successfully saved updated profile picture", "success");
      }

      setLoading(false);
      setDisabled(true);
    } catch (error) {
      showAlert("Error saving updated user information", "error");
      setLoading(false);
      setDisabled(true);
      console.error(error);
    }
  };

  const uploadProfilePicture = async () => {
    if (!profilePicture) {
      console.error("No profile picture selected");
      return;
    }

    try {
      const compressedImage = await compressImage(profilePicture);
      const formData = new FormData();
      formData.append("profile_picture", compressedImage, compressedImage.name);

      const response = await axios.put(`http://localhost:3015/api/v1/users/profile-picture/${newUserData.user_id}`, formData);
      return response;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  if (loading) return <LoadingComponent />;

  return (
    <AnimatedPage>
      <div className="col flex flex-col py-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-xs text-gray-500">
          Business ID: <span>{user?.tenant_id}</span>
        </p>
      </div>
      <div className="mb-10 grid grid-cols-1 gap-4 border-b-[.5px] border-gray-700 md:grid-cols-3">
        <div className="md:col-span-1">
          <h1>{t("general.title")}</h1>
          <p className="text-xs text-gray-500">{t("general.description")}</p>
        </div>
        <div className="flex flex-col gap-6 md:col-span-2">
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <div className="mb-6 w-full items-center md:w-1/2">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("first_name")}</label>
              <input
                className="mb-3 block w-full appearance-none rounded-lg border border-gray-400 bg-[#111827] px-4 py-3 text-sm leading-tight focus:bg-[#192338] focus:outline-none"
                id="first_name"
                type="text"
                value={newUserData.first_name}
                placeholder={user.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6 w-full md:w-1/2">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("last_name")}</label>
              <input
                className="mb-3 block w-full appearance-none rounded-lg border border-gray-400 bg-[#111827] px-4 py-3 text-sm leading-tight focus:bg-[#192338] focus:outline-none"
                id="last_name"
                type="text"
                value={newUserData.last_name}
                placeholder={user.last_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <div className="mb-6 w-full items-center md:w-1/2">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("email")}</label>
              <input className="mb-3 block w-full appearance-none rounded-lg border border-gray-400 bg-[#111827] px-4 py-3 text-sm leading-tight focus:bg-[#192338] focus:outline-none" id="email" type="text" value={newUserData.email} placeholder={user.email} onChange={handleInputChange} />
            </div>
            <div className="mb-6 w-full md:w-1/2">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("phone_number")}</label>
              <input
                className="mb-3 block w-full appearance-none rounded-lg border border-gray-400 bg-[#111827] px-4 py-3 text-sm leading-tight focus:bg-[#192338] focus:outline-none"
                id="phone_number"
                type="text"
                value={newUserData.phone_number}
                placeholder={user.phone_number}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 grid grid-cols-1 gap-4 border-b-[.5px] border-gray-700 md:grid-cols-3">
        <div className="md:col-span-1">
          <h1>{t("preferences.title")}</h1>
          <p className="text-xs text-gray-500">{t("preferences.description")}</p>
        </div>
        <div className="flex flex-col md:col-span-2">
          <div className="flex flex-col gap-10 md:flex-row">
            <div className="mb-6 items-center">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("language")}</label>
              <label className="inline-flex cursor-pointer items-center">
                <input id="language" type="checkbox" className="peer sr-only" checked={newUserData?.preferences?.language?.toLowerCase() === "es"} onChange={handleToggleChange} />
                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                <span className="ms-3 text-xs font-medium text-gray-900 dark:text-gray-400">EN / ES</span>
              </label>
            </div>
            <div className="mb-6 items-center">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("display_mode")}</label>
              <label className="inline-flex cursor-pointer items-center">
                <input id="display_mode" type="checkbox" className="peer sr-only" checked={newUserData.preferences.display_mode?.toLowerCase() === "dark"} onChange={handleToggleChange} />
                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                <span className="ms-3 text-xs font-medium text-gray-900 dark:text-gray-400">
                  {t("light")} / {t("dark")}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 grid grid-cols-1 gap-4 border-b-[.5px] border-gray-700 md:grid-cols-3">
        <div className="md:col-span-1">
          <h1>{t("Profile")}</h1>
          <p className="text-xs text-gray-500">{t("general.description")}</p>
        </div>
        <div className="flex flex-col gap-6 md:col-span-2">
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <div className="mb-6 w-full items-center md:w-1/2">
              <label className="mb-2 block text-[10px] font-light uppercase tracking-wide">{t("profile_picture")}</label>
              <FileUpload handleSelectedImage={handleSelectedImage} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} disabled={disabled} className="rounded-lg border border-gray-200 bg-gray-50 p-1 px-4 py-2 text-white disabled:pointer-events-none disabled:opacity-20 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white">
          {t("save")}
        </button>
      </div>
    </AnimatedPage>
  );
};

export default Settings;
