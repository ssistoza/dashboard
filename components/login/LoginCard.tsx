import CardStack from '../CardStack';
import LoginWithFirebase from './LoginWithFirebase';

export default function LoginCard() {
  return (
    <CardStack>
      <div className="divide-y divide-gray-200">
        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <h1 className="tracking-widest text-3xl">Hi 👋🏽!</h1>
          <LoginWithFirebase />
        </div>
        <div className="text-sm leading-6 font-base sm:leading-7">
          <span className="opacity-60">@ssistoza</span>
        </div>
      </div>
    </CardStack>
  );
}
