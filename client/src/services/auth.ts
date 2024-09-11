import { axiosClient } from './axios';
import storage from './storage';

export interface IUser {
  id: number;
  name: string;
}

export interface IUserPayload {
  access_token: string;
  user: IUser;
}

const login = async (name: string, password: string) => {
  try {
    const response = await axiosClient<IUserPayload>('post', 'auth/login', {
      name,
      password,
    });

    if (response) {
      storage.setUser(response);
    }

    return response;
  } catch (err) {
    return null;
  }
};

const register = async (name: string, password: string) => {
  try {
    const response = await axiosClient<IUserPayload>('post', 'auth/register', {
      name,
      password,
    });

    if (response) {
      storage.setUser(response);
    }

    return response;
  } catch (err) {
    console.error(err);

    return null;
  }
};

const logout = () => storage.removeUser();

const authService = { login, register, logout };
export default authService;
