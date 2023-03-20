import BookingList from '../components/bookinglist';
import LandingPage from '../components/landingpage';
import PropertyDetail from '../components/propertyDetail';
import Registerscreen from '../components/Registerscreen';
// import PropertyList from '../components/test';
// import PropertyDetails from '../components/testdetail';

const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/register',
    element: <Registerscreen />,
  },
  {
    path: '/propertydetail/:id',
    element: <PropertyDetail />,
  },
  {
    path: '/bookinglist/:id',
    element: <BookingList />,
  },
  // {
  //   path: '/propertylist',
  //   element: <PropertyList />,
  // },
  // {
  //   path: '/propertydetaillist/:id',
  //   element: <PropertyDetails />,
  // },
];

export default routes;
