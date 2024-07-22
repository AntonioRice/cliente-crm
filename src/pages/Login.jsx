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
      <div className="page-wrapper h-screen">
        <div className="w-full max-w-lg">{registrationStatus === "Inactive" ? <NewUserRegistrationForm onComplete={handleRegistrationCompletion} /> : <LoginForm onSubmit={onSubmit} />}</div>
      </div>
    </AnimatedPage>
  );
};

export default Login;
