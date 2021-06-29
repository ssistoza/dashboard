export interface ICardStackProps {
  children: React.ReactNode;
}

export default function CardStack(props: ICardStackProps) {
  return (
    <div className="min-h-screen bg-gray-200 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-yellow-500 shadow-lg transform skew-y-6 sm:-skew-y-3 rotate-45 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 -rotate-12 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 shadow-lg transform skew-y-6 sm:skew-y-0 rotate-12 rounded-3xl"></div>

        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
