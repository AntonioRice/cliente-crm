import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const EmailConfirmationForm = ({ userEmail, handleForgotPassword }) => {
  const [showResendButton, setShowResendButton] = useState(false);
  const [counter, setCounter] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResendButton(true);
    }
  }, [counter]);

  const emailProviderLinks = {
    "gmail.com": "https://mail.google.com/",
    "yahoo.com": "https://mail.yahoo.com/",
    "outlook.com": "https://outlook.live.com/",
    "icloud.com": "https://www.icloud.com/mail",
  };

  const extractDomainFromEmail = (email) => {
    const domain = email.split("@")[1];
    return domain.toLowerCase();
  };

  const getEmailProviderLink = (domain) => {
    return emailProviderLinks[domain] || null;
  };

  const handleOpenEmail = () => {
    const emailDomain = extractDomainFromEmail(userEmail);
    const emailLink = getEmailProviderLink(emailDomain);

    if (emailLink) {
      window.open(emailLink, "_blank");
    } else {
      alert("Email provider not supported. Please check your inbox manually.");
    }
  };

  const handleResend = () => {
    handleForgotPassword("ricex407@gmail.com");
    setCounter(10);
    setShowResendButton(false);
  };

  return (
    <form className="mx-auto max-w-md flex-grow rounded-xl border border-gray-700 bg-gray-800 p-10 shadow-lg dark:border-gray-700">
      <div className="flex flex-col items-center ">
        <h1 className="text-2xl">{t("password.email_sent_header")}</h1>
        <p className="mb-2 text-sm">{userEmail}</p>
      </div>
      <div className="pb-4 pt-5 text-xs">
        <p className="mb-2">{t("password.email_sent_text")}</p>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={handleOpenEmail}
          className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-400 disabled:cursor-not-allowed dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
        >
          Open Email
        </button>
        <div className="py-2 text-xs">
          {!showResendButton ? (
            <p>{`You can resend the email in ${counter} seconds...`}</p>
          ) : (
            <div className="inline-flex gap-1">
              <p>Didn't receive an email?</p>
              <button onClick={handleResend} className="hover:text-white">
                Click to resend
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="pt-4">
        <button onClick={() => navigate("/")} className="flex w-full justify-center pt-4 text-xs font-thin text-[#cccccc] underline hover:text-white disabled:cursor-not-allowed">
          {t("password.back_to_login")}
        </button>
      </div>
    </form>
  );
};

export default EmailConfirmationForm;
