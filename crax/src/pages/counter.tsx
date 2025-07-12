import { CounterDisplay } from '@/components/CounterDisplay';
import { CounterControls } from '@/components/CounterControls';

const CounterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="space-y-8">
        <CounterDisplay />
        <CounterControls />
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Second Component</h2>
          <CounterDisplay />
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
        <p>Powered by CRAX</p>
      </div>
    </div>
  );
};

export default CounterPage;
