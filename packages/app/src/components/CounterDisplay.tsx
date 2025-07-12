import { useStore, useStoreEffect } from '@crax/store';
import { counterStore } from '@/stores/counter';

export function CounterDisplay() {
  const [count] = useStore(counterStore);

  useStoreEffect(() => {
    console.log('CounterDisplay mounted or count changed:', count);
    return () => {
      console.log('CounterDisplay unmounted or count changed:', count);
    };
  }, [counterStore]);

  return (
    <div className="text-center">
      <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
        Current count
      </p>
      <p className="text-5xl font-bold text-gray-900 dark:text-gray-50">
        {count}
      </p>
    </div>
  );
}
