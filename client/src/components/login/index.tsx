import { useAuth } from '../../context/authContext';
import { UserForm } from '../form';
import Page from '../page';

const Login = () => {
  const { login } = useAuth();

  return (
    <Page>
      <UserForm operation={login} button='Log in' />
    </Page>
  );
};

export default Login;
