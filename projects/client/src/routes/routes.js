import RegisterPage from '../components/registersPage';
import LoginPage from '../components/loginPage';
import ListUser from '../components/listUser';
import Landingpage from '../components/landingpage';
import BookingList from '../components/bookinglist';
import PropertyDetail from '../components/propertyDetail';
import ProtectedPage from './protected';
import ChangePassword from '../components/changePassword';
import Notfound from '../components/notFound';
import RegisterTenantForm from '../components/registerTenant';

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
    path: '/registertenant',
    element : <RegisterTenantForm />
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
        <Landingpage />
      
    
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
  {
    path: '/change',
    element: <ChangePassword />,
  },

  {
    path: '/notfound',
    element: <Notfound/>,
  },

  
];

export default routes;
