import './App.css';
import { Routes, Route } from 'react-router-dom';
import routes from './routes/routes';

function App() {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(${process.env.REACT_APP_API_BASE_URL}/greetings);
  //     setMessage(data?.message || '');
  //   })();
  // }, []);
  return (
    <Routes key={'route'}>
      {routes.map((val, key) => {
        return <Route exact path={val.path} element={val.element} key={key} />;
      })}
    </Routes>
  );
}

export default App;