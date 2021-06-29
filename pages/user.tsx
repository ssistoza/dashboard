import {
  withAuthUserTokenSSR,
  AuthAction,
  withAuthUser,
} from 'next-firebase-auth';
import UserData from '../components/login/UserData';

function UserPage() {
  return <UserData />;
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(UserPage);
