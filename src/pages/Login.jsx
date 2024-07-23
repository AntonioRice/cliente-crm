import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context";
import { AnimatedPage, NewUserRegistrationForm, LoginForm } from "../components";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuthContext();
  const [registrationStatus, setRegistrationStatus] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.status === "Active") {
        navigate("/dashboard");
      } else if (user.status === "Inactive") {
        setRegistrationStatus("Inactive");
      }
    }
  }, [user, navigate]);

  const onSubmit = async (username, password) => {
    try {
      await login(username, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegistrationCompletion = () => {
    navigate("/dashboard");
  };

  return (
    <AnimatedPage>
      <div className="grid h-screen w-full dark:bg-gray-900">
        <div className="grid w-full md:grid-cols-2">
          <div className="flex w-full grid-cols-1 items-center justify-center">{registrationStatus === "Inactive" ? <NewUserRegistrationForm onComplete={handleRegistrationCompletion} /> : <LoginForm onSubmit={onSubmit} />}</div>
          <div className="flex w-full items-center justify-end border-l border-gray-700 bg-gray-800 pr-10 md:flex-1">
            <div className="w-full max-w-2xl text-right">
              <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
                Welcome to <span className="ms-1 font-medium text-green-500">Cliente.io</span>
              </h1>
              <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">Your complete hotel guest management system </p>
              <a href="#" className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 mr-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-[#cccccc]">
                Get started
                <svg className="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="inline-flex items-center justify-center rounded-lg border border-gray-700 bg-green-600 px-5 py-3 text-center text-base font-medium text-white hover:bg-green-500 dark:border-gray-700 dark:text-white dark:hover:bg-green-600">
                Speak to Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Login;
