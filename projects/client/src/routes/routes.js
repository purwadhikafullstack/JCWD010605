import Registerscreen from '../components/Registerscreen';
import ListUser from '../components/listUser';


const routes = [
  {
    path: '/register',
    element: <Registerscreen />,
  },

  {
    path: '/listuser',
    element: <ListUser />,
  },
];

export default routes;