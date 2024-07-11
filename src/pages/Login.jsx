import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../context";
import { AnimatedPage, NewUserRegistrationForm, LoginForm } from "../components";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { t } = useTranslation();

  const onSubmit = async (username, password) => {
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatedPage>
      <div className="h-screen page-wrapper">
        <div className="w-full max-w-lg">
          {/* <LoginForm onSubmit={onSubmit} /> */}
          <NewUserRegistrationForm />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Login;
