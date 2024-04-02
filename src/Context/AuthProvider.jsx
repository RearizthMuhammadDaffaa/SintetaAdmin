import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || null);
  const navigate = useNavigate();


  useEffect(() => {
    // Set default axios headers on initial load
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const loginAction = async (data) => {
    try {
      const response = await fetch("https://api.bimbel-sinteta.id/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        // console.log(res.data);
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("site", res.data.token);
        
   
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("site");

    delete axios.defaults.headers.common['Authorization'];
    navigate("/");
  };


  const ForgetPassword = async (email) =>{
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axios.post(
        "https://api.bimbel-sinteta.id/api/v1/auth/forgot-password",
        formData
      );
      // const res = await response.json();
      if (res.data) {
        // console.log(res.data);
        setUser(res.data.user);
        setToken(res.data.token);
       
        
   
        navigate("/confirm-password");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider value={{ ForgetPassword,token,setToken, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};