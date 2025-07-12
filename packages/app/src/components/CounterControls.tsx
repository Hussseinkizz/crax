import { useStore } from '@crax/store';
import { counterStore } from '@/stores/counter';
import { Button } from '@/components/ui/button';

export function CounterControls() {
  const [count, setCount] = useStore(counterStore);

  return (
    <div className="flex justify-center space-x-4">
      <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
      <Button onClick={() => setCount((c) => c - 1)} variant="outline">
        Decrement
      </Button>
      <Button onClick={() => setCount(0)} variant="destructive">
        Reset
      </Button>
    </div>
  );
}
