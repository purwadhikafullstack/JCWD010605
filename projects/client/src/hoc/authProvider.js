import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../components/loading";
import { axiosInstance } from "../config/config";
import user_types from "../redux/auth/types";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const fetchData = () => {
    const savedDataUser = localStorage.getItem("user_data");
    if (savedDataUser) {
      const parseDataUser = JSON.parse(savedDataUser);

      dispatch({
        type: user_types.USER_LOGIN,
        payload: parseDataUser,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return children;
};

export default AuthProvider;
