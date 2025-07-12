import { useSyncExternalStore, useCallback, useEffect, useRef } from 'react';
import { getChanges } from './utils';
import equal from 'fast-deep-equal/react';

// #region Types

/**
 * Configuration for creating a new store.
 * @template T The type of the state.
 */
export type StoreConfig = {
  /** The maximum number of previous states to keep in history. */
  maxHistorySize?: number;
};

/**
 * Represents a created store.
 * @template T The type of the state.
 */
export type Store<T> = {
  /**
   * Gets the current value of the store.
   * @returns {T} The current state.
   */
  get value(): T;

  /**
   * Sets the new value of the store.
   * @param {T} newValue The new state.
   */
  set value(newValue: T);

  /**
   * Updates the store's value using an updater function.
   * @param {(prevState: T) => T} updater The function to update the state.
   */
  update: (updater: (prevState: T) => T) => void;

  /**
   * The history of the store's states.
   * @returns {T[]} An array of previous states.
   */
  get history(): T[];

  /**
   * Subscribes to changes in the store.
   * @param {() => void} callback The function to call on change.
   * @returns {() => void} A cleanup function to unsubscribe.
   */
  subscribe: (callback: () => void) => () => void;

  /**
   * Locks the store to prevent modifications.
   * @returns {symbol} A symbol to use for unlocking the store.
   */
  lock: () => symbol;

  /**
   * Unlocks the store to allow modifications.
   * @param {symbol} id The symbol returned from lock.
   */
  unlock: (id: symbol) => void;
};

// #endregion

/**
 * Creates a new store.
 * @template T The type of the state.
 * @param {T} initialState The initial state of the store.
 * @param {StoreConfig<T>} [config] Optional configuration for the store.
 * @returns {Store<T>} The created store.
 */
export function createStore<T>(
  initialState: T,

  config?: StoreConfig
): Store<T> {
  let state: T = initialState;
  const subscribers = new Map<symbol, () => void>();
  const history: T[] = [];
  const maxHistorySize = config?.maxHistorySize ?? 10;
  let locked = false;
  let lockId: symbol | null = null;

  const updateHistory = (newState: T) => {
    if (history.length >= maxHistorySize) {
      history.shift();
    }
    history.push(newState);
  };

  const store: Store<T> = {
    get value() {
      return state;
    },

    set value(newValue: T) {
      if (locked) {
        console.error('Cannot modify a locked store.');
        return;
      }

      const changes =
        typeof state === 'object' && state !== null && typeof newValue === 'object' && newValue !== null
          ? getChanges(state, newValue)
          : state === newValue
          ? {}
          : { value: newValue };
      if (Object.keys(changes).length > 0) {
        updateHistory(state);
        state = newValue;
        for (const callback of subscribers.values()) {
          callback();
        }
      }
    },

    update: (updater: (prevState: T) => T) => {
      if (locked) {
        console.error('Cannot modify a locked store.');
        return;
      }
      const newValue = updater(state);
      const changes =
        typeof state === 'object' && state !== null && typeof newValue === 'object' && newValue !== null
          ? getChanges(state, newValue)
          : state === newValue
          ? {}
          : { value: newValue };
      if (Object.keys(changes).length > 0) {
        updateHistory(state);
        state = newValue;
        for (const callback of subscribers.values()) {
          callback();
        }
      }
    },

    get history() {
      return [...history];
    },

    subscribe: (callback: () => void) => {
      if (typeof callback !== 'function') {
        throw new Error('Subscriber callback must be a function.');
      }
      const id = Symbol();
      subscribers.set(id, callback);
      return () => {
        subscribers.delete(id);
      };
    },

    lock: () => {
      if (locked) {
        console.warn('Store is already locked.');
        return lockId as symbol;
      }
      locked = true;
      lockId = Symbol('lock');
      return lockId;
    },

    unlock: (id: symbol) => {
      if (!locked) {
        console.warn('Store is not locked.');
        return;
      }
      if (id === lockId) {
        locked = false;
        lockId = null;
      } else {
        console.error('Invalid id to unlock the store.');
      }
    },
  };

  return store;
}

/**
 * A hook to use a store within a React component.
 * @template T The type of the state.
 * @param {Store<T>} store The store to use.
 * @returns {[T, (newValue: T) => void]} A tuple with the current state and a function to update it.
 */
export function useStore<T>(store: Store<T>): [T, (newValue: T | ((prevState: T) => T)) => void] {
  const state = useSyncExternalStore(
    store.subscribe,
    () => store.value,
    () => store.value
  );

  const setState = useCallback(
    (newValue: T | ((prevState: T) => T)) => {
      if (typeof newValue === 'function') {
        store.update(newValue as (prevState: T) => T);
      } else {
        store.value = newValue;
      }
    },
    [store]
  );

  return [state, setState];
}

/**
 * A hook to perform side effects when a store's state changes.
 * @param {() => void | (() => void)} effect The effect to run. Can return a cleanup function.
 * @param {Store<unknown>[]} [stores] The stores to track. If not provided, the effect runs only once.
 */
export function useStoreEffect<T>(
  effect: () => void | (() => void),
  stores?: Store<T>[]
) {
  const memoizedEffect = useCallback(effect, [effect]);

  const storeValuesRef = useRef<unknown[]>([]);

  const getSnapshot = useCallback(() => {
    if (!stores) return [];
    const newValues = stores.map((store) => store.value);
    if (!equal(storeValuesRef.current, newValues)) {
      storeValuesRef.current = newValues;
    }
    return storeValuesRef.current;
  }, [stores]);

  const subscribe = useCallback(
    (callback: () => void) => {
      if (!stores || stores.length === 0) {
        return () => {}; // No-op for empty stores array
      }

      const unsubscribers = stores.map((store) => {
        return store.subscribe(callback);
      });

      return () => {
        unsubscribers.forEach((unsubscribe) => unsubscribe());
      };
    },
    [stores]
  );

  // Use a dummy snapshot and subscribe for the case where no stores are provided
  const dummySnapshot = useRef<unknown[]>([]);
  const dummySubscribe = useCallback(() => {
    // This will only be called once on mount if no stores are provided
    // and will not trigger further updates from useSyncExternalStore
    return () => {};
  }, []);

  const currentSnapshot = useSyncExternalStore(
    stores && stores.length > 0 ? subscribe : dummySubscribe,
    stores && stores.length > 0 ? getSnapshot : () => dummySnapshot.current,
    stores && stores.length > 0 ? getSnapshot : () => dummySnapshot.current
  );

  useEffect(() => {
    // If no stores are provided, run the effect once on mount and clean up on unmount
    if (!stores || stores.length === 0) {
      const cleanup = memoizedEffect();
      return () => {
        if (typeof cleanup === 'function') {
          cleanup();
        }
      };
    } else {
      // If stores are provided, run the effect when the snapshot changes
      const cleanup = memoizedEffect();
      return () => {
        if (typeof cleanup === 'function') {
          cleanup();
        }
      };
    }
  }, [currentSnapshot, memoizedEffect, stores]);
}


