import 'tailwindcss/tailwind.css';
import initAuth from '../lib/initAuth';

initAuth();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
