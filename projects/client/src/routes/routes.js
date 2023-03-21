import RegisterPage from '../components/registersPage';
import LoginPage from '../components/loginPage';
import ListUser from '../components/listUser';
import Landingpage from '../components/landingpage';
import ProtectedPage from './protected';

const routes = [
  {
    path: '/register',
    element: <RegisterPage />,
  },

  {
    path: '/listuser',
    element: <ListUser />,
  },

  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    path: '/',
    element: 
      // <ProtectedPage needLogin={true}>
        <Landingpage />
      // {/* </ProtectedPage> */}
    
  },

  
];

export default routes;