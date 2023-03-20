import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../components/loading";
import { axiosInstance } from "../config/config";
import user_types from "../redux/auth/types";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    await axiosInstance
      .post("/auth/keep", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data.result);
        dispatch({
          type: user_types.USER_LOGIN,
          payload: res.data.result,
        });
      })
      .catch((err) => {
        if (err) {
          if (token) localStorage.removeItem("token");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    // console.log(savedDataUser);
    // if (savedDataUser) {
    //   // const parseDataUser = JSON.parse(savedDataUser);
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? <Loading /> : children;
};

export default AuthProvider;
