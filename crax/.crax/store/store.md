# Crax State Management

Crax provides a minimal yet powerful state management solution based on a publish-subscribe pattern, designed to be intuitive and efficient for React applications.

## Core Concepts

### Store

A `Store` is a container for your application's state. It allows you to read, update, and subscribe to changes in that state. Each store is an independent unit of state.

### History

Stores can maintain a history of their previous states, allowing for features like undo/redo or debugging. The history size is configurable.

### Locking

Stores can be locked to prevent accidental or unauthorized modifications to their state, providing a mechanism for controlled state updates.

## Available Primitives

### `createStore(initialState, config?)`

This function creates a new store instance. It takes an `initialState` and an optional `config` object.

**Parameters:**

*   `initialState`: The initial value of the store's state. Can be of any type (e.g., object, number, string).
*   `config` (optional): An object with the following properties:
    *   `maxHistorySize` (number): The maximum number of previous states to keep in the history. Defaults to `10`.

**Returns:**

An object representing the created store with the following properties and methods:

*   `value`: (getter/setter) The current state of the store. Setting this property updates the state and notifies subscribers.
*   `history`: (getter) An array containing the previous states of the store, up to `maxHistorySize`.
*   `subscribe(callback)`: Subscribes a callback function to state changes. Returns a cleanup function to unsubscribe.
*   `lock()`: Locks the store, preventing further modifications. Returns a `Symbol` (the `lockId`) that must be used to unlock the store.
*   `unlock(lockId)`: Unlocks the store, allowing modifications again. Requires the `lockId` returned by `lock()`.

**Example:**

```typescript
import { createStore } from './index';

const userStore = createStore({
  name: 'John Doe',
  age: 30,
});

console.log(userStore.value); // { name: 'John Doe', age: 30 }

userStore.value = { ...userStore.value, age: 31 };
console.log(userStore.value); // { name: 'John Doe', age: 31 }

const counterStore = createStore(0);
console.log(counterStore.value); // 0

counterStore.value = 1;
console.log(counterStore.value); // 1

const unsubscribe = counterStore.subscribe(() => {
  console.log('Counter store changed:', counterStore.value);
});

counterStore.value = 2;
// Console output: Counter store changed: 2

unsubscribe(); // Stop listening for changes

const lockId = userStore.lock();
userStore.value = { ...userStore.value, age: 32 }; // This will not update the store
console.log(userStore.value); // { name: 'Jane Doe', age: 31 }

userStore.unlock(lockId);
userStore.value = { ...userStore.value, age: 32 };
console.log(userStore.value); // { name: 'Jane Doe', age: 32 }

const historyStore = createStore(0, { maxHistorySize: 5 });
historyStore.value = 1;
historyStore.value = 2;
console.log(historyStore.history); // [0, 1]
```

### `useStore(store)`

A React Hook that allows you to consume a store's state within a functional component. It provides the current state and a setter function, similar to React's `useState`.

**Parameters:**

*   `store`: The store instance created with `createStore`.

**Returns:**

A tuple `[state, setState]`:

*   `state`: The current value of the store.
*   `setState`: A function to update the store's value.

**Example:**

```typescript
import React from 'react';
import { createStore, useStore } from './index';

const countStore = createStore(0);

function Counter() {
  const [count, setCount] = useStore(countStore);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// In your App component:
// <Counter />
```

### `useStoreEffect(effect, stores?)`

A React Hook that allows you to perform side effects when the state of one or more specified stores changes. It behaves similarly to React's `useEffect`.

**Parameters:**

*   `effect`: A function that contains the side effect logic. It can optionally return a cleanup function.
*   `stores` (optional): An array of store instances to track. The `effect` will re-run whenever the value of any of these stores changes. If no stores are provided, the `effect` will run once on component mount and clean up on unmount.

**Example:**

```typescript
import React from 'react';
import { createStore, useStoreEffect } from './index';

const dataStore = createStore('initial');
const statusStore = createStore('idle');

function DataFetcher() {
  useStoreEffect(() => {
    console.log('Data or status changed!');
    // Perform data fetching or other side effects here
    return () => {
      console.log('Cleanup for data/status effect.');
    };
  }, [dataStore, statusStore]);

  useStoreEffect(() => {
    console.log('This effect runs only once on mount.');
    return () => {
      console.log('Cleanup for one-time effect.');
    };
  });

  return (
    <div>
      <p>Data: {dataStore.value}</p>
      <p>Status: {statusStore.value}</p>
    </div>
  );
}

// In your App component:
// <DataFetcher />
```