import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PublicRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to='/profile' /> : <Outlet />;
};

export default PublicRoute;
