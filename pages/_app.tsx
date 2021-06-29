import 'tailwindcss/tailwind.css';
import initAuth from '../lib/initAuth';
import 'firebaseui/dist/firebaseui.css';

initAuth();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
