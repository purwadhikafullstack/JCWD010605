import RegisterPage from '../components/registersPage';
import LoginPage from '../components/loginPage';
import ListUser from '../components/listUser';
import Landingpage from '../components/landingpage';
import BookingList from '../components/bookinglist';
import PropertyDetail from '../components/propertyDetail';
import ProtectedPage from './protected';

const routes = [
  {
    path: '/register',
    element: (
      <ProtectedPage guestOnly={true}>
        <RegisterPage />,
      </ProtectedPage>
    ),
  },

  {
    path: '/listuser',
    element: <ListUser />,
  },

  {
    path: '/login',
    element: (
      <ProtectedPage guestOnly={true}>
        <LoginPage />,
      </ProtectedPage>
    ),
  },

  {
    path: '/',
    element: 
      // <ProtectedPage needLogin={true}>
        <Landingpage />
      // {/* </ProtectedPage> */}
    
  },
  {
    path: '/propertydetail/:id',
    element: <PropertyDetail />,
  },
  {
    path: '/bookinglist',
    element: (
      <ProtectedPage needLogin={true}>
        <BookingList />,
      </ProtectedPage>
    )
  },

  
];

export default routes;