import Tableaja from "../components/tntTablelocation";
import ItemCards from "../components/hotelCards";
import BookingList from '../components/bookinglist';
import LandingPage from '../components/landingpage';
import PropertyDetail from '../components/propertyDetail';
import Tableproperty from "../components/tntTablepropertydata";

const routes = [

  {
    path: '/Location',
    element: <Tableaja />
  },
  {
    path: '/card',
    element: <ItemCards />
  },
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/propertydetail/:id',
    element: <PropertyDetail />,
  },
  {
    path: '/bookinglist/:id',
    element: <BookingList />,
  },
  {
    path: '/propertydata',
    element: <Tableproperty />
  },
];

export default routes;