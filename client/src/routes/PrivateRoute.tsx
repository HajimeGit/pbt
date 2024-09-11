import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }

  return currentUser ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
