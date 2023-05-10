import './App.css';
import { Routes, Route } from 'react-router-dom';
import routes from './routes/routes';
import { useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from './config/config';
import user_types from './redux/auth/types';
import { useDispatch } from 'react-redux';
// import user_types from "../redux/auth/types";
// import { keeplogin } from '../../server/src/controllers/auth'

function App() {
  // const [message, setMessage] = useState('');
  const dispatch = useDispatch()
  const keeplogin = async() => {
    try {
      const token = localStorage.getItem('token')
      const user = await axiosInstance.get('/auth/keeplogin', {
        headers: { Authorization: `Bearer ${token}` }
          
      })
      const userData = user.data.result
      if(userData) 
      //memilih state dengan user_types USER_LOGIN
      
     { dispatch({
      
          type: user_types.USER_LOGIN,
          // data yg dikirim
          payload: userData
      })}
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    keeplogin()
  }, [])

  
  return (
    <Routes key={'route'}>
      {routes.map((val, key) => {
        return <Route exact path={val.path} element={val.element} key={key} />;
      })}
    </Routes>
  );
}

export default App;