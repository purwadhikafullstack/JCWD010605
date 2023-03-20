import Registerscreen from '../components/Registerscreen';
import Loginscreen from '../components/Loginscreen';
import ListUser from '../components/listUser';
import Landingpage from '../components/landingpage';

const routes = [
  {
    path: '/register',
    element: <Registerscreen />,
  },

  {
    path: '/listuser',
    element: <ListUser />,
  },

  {
    path: '/login',
    element: <Loginscreen />,
  },

  {
    path: '/',
    element: <Landingpage />,
  },

  
];

export default routes;