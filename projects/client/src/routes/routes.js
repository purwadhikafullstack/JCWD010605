import BookingList from '../components/bookinglist';
import LandingPage from '../components/landingpage';
import PropertyDetail from '../components/propertyDetail';

const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },

  {
    path: '/propertydetail/:id',
    element: <PropertyDetail />,
  },
  {
    path: '/bookinglist',
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
