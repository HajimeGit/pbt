import { useAuth } from '../../context/authContext';
import Page from '../page';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <Page>
      <div>
        Hello, dear <b>{currentUser?.user?.name}</b>! Welcome to our site.
      </div>
      <br />
    </Page>
  );
};

export default Profile;
