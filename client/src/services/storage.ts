import { IUserPayload } from './auth';

interface IStorage {
  setUser: (user: IUserPayload) => void;
  getUser: () => IUserPayload | null;
  removeUser: () => void;
}

const setUser = (user: IUserPayload) =>
  localStorage.setItem('CUD', JSON.stringify(user));

const getUser = (): IUserPayload | null => {
  const user = localStorage.getItem('CUD');
  return user ? JSON.parse(user) : null;
};

const removeUser = () => localStorage.removeItem('CUD');

const storage: IStorage = { setUser, getUser, removeUser };

export default storage;
