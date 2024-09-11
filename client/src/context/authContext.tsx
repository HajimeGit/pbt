import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import authService, { IUserPayload } from '../services/auth';
import storage from '../services/storage';

interface IAuthContext {
  currentUser: IUserPayload | null;
  login: (name: string, password: string) => Promise<boolean>;
  register: (name: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const defaultAuthContext = {
  currentUser: null,
  login: async () => true,
  logout: () => {},
  register: async () => true,
  loading: false,
};

const AuthContext = createContext<IAuthContext>(defaultAuthContext);

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUserPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = storage.getUser();

    if (user) {
      setCurrentUser(user);
    }

    setLoading(false);
  }, []);

  const login = async (name: string, password: string) => {
    const user = await authService.login(name, password);

    if (user) {
      setCurrentUser(user);
      return true;
    }

    return false;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const register = async (name: string, password: string) => {
    const user = await authService.register(name, password);

    if (user) {
      setCurrentUser(user);
      return true;
    }

    return false;
  };

  const value = useMemo(
    () => ({
      currentUser,
      login,
      logout,
      register,
      loading,
    }),
    [currentUser, login, logout, register, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
