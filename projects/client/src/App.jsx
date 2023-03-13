// import axios from "axios";
// import logo from "./logo.svg";
// import "./App.css";
// import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import routes from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();j
  // }, []);
  return (

    <div>
      <Routes key={'route'}>
        {routes.map((val, key) => {
          return <Route exact path={val.path} element={val.element} key={key} />;
        })}
      </Routes>

    </div>
  );
}

export default App;
