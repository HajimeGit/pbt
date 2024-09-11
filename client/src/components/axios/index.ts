import { ReactNode, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import router from '../../routes/Router';
import { axiosInstance } from '../../services/axios';
import { toast } from 'react-toastify';

interface IAxiosErrorHandlerProps {
  children: ReactNode;
}

const AxiosErrorHandler: React.FC<IAxiosErrorHandlerProps> = ({ children }) => {
  const { logout } = useAuth();

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          const response = error.response;
          const status = response.status;
          const message = response?.data?.message;

          if (message) {
            toast.error(message);
          }

          if (status === 401) {
            logout();
            router.navigate('/login');
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return children;
};

export { AxiosErrorHandler };
