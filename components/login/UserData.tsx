import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

export default function UserData() {
  const authUser = useAuthUser();
  return (
    <>
      <p>Welcome {authUser.displayName}, You are currently signed in!</p>
    </>
  );
}
