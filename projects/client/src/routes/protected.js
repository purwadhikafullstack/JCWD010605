import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedPage({
  children,
  needLogin = false,
  guestOnly = false,
  authRoles = ["User", "Admin"],
}) {
  let navigate = useNavigate();
  const userSelector = useSelector((state) => state.auth);
  console.log(userSelector.id);

  useEffect(() => {
    if (needLogin && !userSelector?.id) {
      return navigate("/notfound", { replace: true });
    }

    if (guestOnly && userSelector.id) {
      return navigate("/", { replace: true });
    }
  }, []);
  return children;
}

export default ProtectedPage;