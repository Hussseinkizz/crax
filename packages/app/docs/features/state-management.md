# State Management

CRAX includes a simple and powerful global state management solution built on top of React's `useSyncExternalStore` hook.

## Creating a Store

Define a store by calling `createStore` with an initial value.

```typescript
// src/stores/theme.ts
import { createStore } from '@crax/store';

export const themeStore = createStore<'light' | 'dark'>('light');
```

## Using a Store

The `useStore` hook returns a tuple `[state, setState]`, similar to React's `useState`.

```tsx
// src/components/ThemeToggle.tsx
import { useStore } from '@crax/store';
import { themeStore } from '@/stores/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useStore(themeStore);

  const toggle = () => {
    setTheme(current => (current === 'light' ? 'dark' : 'light'));
  };

  return <button onClick={toggle}>Switch Theme</button>;
}
```

## Advanced Usage

### `useStoreEffect`

Perform side effects when a store's value changes. This is useful for things like persisting state to `localStorage`.

```tsx
// src/components/ThemePersister.tsx
import { useStoreEffect } from '@crax/store';
import { themeStore } from '@/stores/theme';

export default function ThemePersister() {
  useStoreEffect(() => {
    localStorage.setItem('theme', themeStore.value);
    document.body.className = themeStore.value;
  }, [themeStore]);

  return null; // This component does not render anything
}
```

### Store History

Access a store's history for debugging or undo/redo functionality.

```typescript
console.log(themeStore.history); // ['light', 'dark', 'light']
```

### Locking Stores

Prevent a store from being modified during critical operations.

```typescript
const lockId = themeStore.lock();
try {
  // ... perform critical operations
} finally {
  themeStore.unlock(lockId);
}
```