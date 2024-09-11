import { useAuth } from '../../context/authContext';
import Page from '../page';
import { UserForm } from '../form';

const Registration = () => {
  const { register } = useAuth();

  return (
    <Page>
      <UserForm operation={register} button='Register' />
    </Page>
  );
};

export default Registration;
