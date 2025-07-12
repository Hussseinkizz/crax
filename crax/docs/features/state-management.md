# Global State Management in CRAX

CRAX provides a simple, lightweight, and highly efficient global state management solution. It allows you to share data across your entire application without the complexities of prop drilling or heavy boilerplate. This system is built to integrate seamlessly with React's component lifecycle using modern hooks.

## Core Concepts

CRAX's state management revolves around two main primitives:

1.  **`createStore`**: A function to define and initialize a new global store.
2.  **`useStore`**: A React Hook to access and update the state from any functional component.

## How it Works

### Step 1: Create a Store

Define your global stores in a dedicated location, typically within the `src/stores` directory. A store is created by calling `createStore` with an initial state value.

```ts
// src/stores/theme.ts
import { createStore } from '@crax/store';

// A store can hold any type of data: primitives, objects, arrays, etc.
export const themeStore = createStore<'light' | 'dark'>('light');

// You can also add a subscriber to log changes (optional)
themeStore.subscribe(() => {
  console.log('Theme updated:', themeStore.value);
});
```

### Step 2: Use the Store in a Component

To access and update the state from any React functional component, use the `useStore` hook. It returns a tuple similar to React's `useState`: the current state value and a function to update it.

```tsx
// src/components/ThemeSwitcher.tsx
import { useStore } from '@crax/store';
import { themeStore } from '@/stores/theme';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

export function ThemeSwitcher() {
  // useStore returns [currentState, setStateFunction]
  const [theme, setTheme] = useStore(themeStore);

  const toggleTheme = () => {
    // The setState function can take a new value or an updater function
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}
```

Any component that uses `useStore(themeStore)` will automatically re-render whenever the `themeStore`'s value changes, ensuring your UI stays synchronized with your global state.

### Updating State

You can update the state in two ways:

1.  **Directly with a new value:**
    ```typescript
    setTheme('dark');
    ```
2.  **With an updater function (recommended for complex state or when depending on previous state):**
    ```typescript
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    ```

## Advanced Usage

### `useStoreEffect`

CRAX also provides `useStoreEffect` for performing side effects when a store's state changes, similar to React's `useEffect` but specifically for stores.

```tsx
// src/components/Logger.tsx
import { useStoreEffect } from '@crax/store';
import { themeStore } from '@/stores/theme';
import { counterStore } from '@/stores/counter'; // Assuming another store

export function StoreLogger() {
  useStoreEffect(() => {
    console.log('Theme or Counter store changed!');
    console.log('Current Theme:', themeStore.value);
    console.log('Current Counter:', counterStore.value);

    // Optional cleanup function
    return () => {
      console.log('Cleanup for store effect.');
    };
  }, [themeStore, counterStore]); // Pass an array of stores to watch

  return null; // This component doesn't render anything visible
}
```

### Store History

Each store maintains a history of its previous states, which can be useful for debugging or implementing undo/redo functionality. You can access it via `store.history`.

```ts
// After some updates to themeStore
console.log(themeStore.history); // An array of previous theme states
```

### Locking Stores

Stores can be temporarily locked to prevent modifications, which can be useful in scenarios where you want to ensure data integrity during critical operations.

```ts
const lockId = themeStore.lock();
// themeStore.value = 'new-value'; // This will log an error and not change the state
themeStore.unlock(lockId);
// themeStore.value = 'new-value'; // Now it works
```

## Under the Hood

CRAX's state management is built upon React's `useSyncExternalStore` hook. This hook is designed for subscribing to external data sources (like our `createStore` instances) and ensures that React components re-render efficiently only when the subscribed part of the state actually changes. The `createStore` function manages a list of subscribers and notifies them when its `value` is updated. It also performs a deep equality check using `fast-deep-equal` (via `getChanges` utility) to prevent unnecessary re-renders if the new state is deeply identical to the old one.
