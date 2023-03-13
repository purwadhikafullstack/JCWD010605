import LandingPage from '../components/landingpage';
import Registerscreen from '../components/Registerscreen';

const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/register',
    element: <Registerscreen />,
  },
];

export default routes;
