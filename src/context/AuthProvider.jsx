import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AnimatePresence } from "framer-motion";
import { LoadingComponent } from "../components";
import { useStateContext } from "../context";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setMode, setLanguage } = useStateContext();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchedUserData(token).then((userData) => {
        setUser(userData);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const fetchedUserData = async (token) => {
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      if (!userId) {
        console.error("Error: No user id");
        return null;
      }

      const response = await axios.get(`http://localhost:3015/api/v1/users/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3015/api/v1/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userData = await fetchedUserData(token);
      setUser(userData);
      setMode(userData.preferences.display_mode);
      setLanguage(userData.preferences.language);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const completeRegistration = async (updatedData, token) => {
    try {
      const response = await axios.put(`http://localhost:3015/api/v1/complete-registration/${token}`, {
        ...updatedData,
      });
      const userData = response.data.data;
      setUser(userData);
      setMode(userData.preferences.display_mode);
      setLanguage(userData.preferences.language);
    } catch (error) {
      alert("Unable to complete new user registration");
      console.error("New user registration error:", error);
    }
  };

  const resetPassword = async (email, token, newPassword) => {
    try {
      if (token && newPassword) {
        await axios.put(`http://localhost:3015/api/v1/password/reset/${token}`, {
          password: newPassword,
        });
      } else {
        await axios.post("http://localhost:3015/api/v1/password/forgot", {
          email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, completeRegistration, resetPassword, loading }}>
      <AnimatePresence>{loading ? <LoadingComponent key="loading" /> : children}</AnimatePresence>
    </AuthContext.Provider>
  );
};
