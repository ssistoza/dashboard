import FirebaseAuth from './FirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthUser } from 'next-firebase-auth';
import UserData from './UserData';

const firebaseAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export default function LoginWithFirebase() {
  const [renderAuth, setRenderAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
    }
  }, []);

  return (
    <div className="py-4">
      {renderAuth ? (
        <FirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : (
        <UserData />
      )}
    </div>
  );
}
