import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from '../components/login';
import Logout from '../components/logout';
import Profile from '../components/profile';
import Registration from '../components/registration';
import { TransactionList } from '../components/transaction';

const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/chat',
        element: '<div>Chat</div>',
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/transactions',
        element: <TransactionList />,
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Registration />,
      },
    ],
  },
  {
    path: '*',
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
