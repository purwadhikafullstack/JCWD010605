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
    //wajib login
    if (needLogin && !userSelector?.id) {
      return navigate("/notfound", { replace: true });
    }

    //guest only, ga boleh login
    if (guestOnly && userSelector.id) {
      return navigate("/", { replace: true });
    }

    //hanya yang punya role ini
    // if (authRoles.length && !authRoles.includes(userSelector.role)) {
    //   return navigate("/login", { replace: true });
    // }
  }, []);
  return children;
}

export default ProtectedPage;

// <> parent
// //children
// <navbar></navbar> //children
// </>
// component frontend /ui return sebuah tampilan
