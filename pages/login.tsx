import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import Head from 'next/head';
import LoginCard from '../components/login/LoginCard';

function LoginPage() {
  return (
    <div>
      <Head>
        <title>Dashboard | Please Login!</title>
      </Head>
      <LoginCard />
    </div>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  appPageURL: '/user',
})();

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  appPageURL: '/user',
})(LoginPage);
