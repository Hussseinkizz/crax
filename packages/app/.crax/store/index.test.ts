import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { createStore, useStore, useStoreEffect } from './index';

describe('createStore', () => {
  it('should initialize with the correct initial state (object)', () => {
    const store = createStore({ count: 0 });
    expect(store.value).toEqual({ count: 0 });
  });

  it('should initialize with the correct initial state (number)', () => {
    const store = createStore(0);
    expect(store.value).toBe(0);
  });

  it('should initialize with the correct initial state (string)', () => {
    const store = createStore('hello');
    expect(store.value).toBe('hello');
  });

  it('should initialize with the correct initial state (null)', () => {
    const store = createStore(null);
    expect(store.value).toBeNull();
  });

  it('should update the state correctly (object)', () => {
    const store = createStore({ count: 0 });
    store.value = { count: 1 };
    expect(store.value).toEqual({ count: 1 });
  });

  it('should update the state correctly (number)', () => {
    const store = createStore(0);
    store.value = 1;
    expect(store.value).toBe(1);
  });

  it('should update the state correctly (string)', () => {
    const store = createStore('hello');
    store.value = 'world';
    expect(store.value).toBe('world');
  });

  it('should update the state using an updater function (object)', () => {
    const store = createStore({ count: 0 });
    store.update((prevState) => ({ count: prevState.count + 1 }));
    expect(store.value).toEqual({ count: 1 });
  });

  it('should update the state using an updater function (number)', () => {
    const store = createStore(0);
    store.update((prevState) => prevState + 1);
    expect(store.value).toBe(1);
  });

  it('should not update if the new state is deep equal to the old state', () => {
    const store = createStore({ count: 0, data: { a: 1 } });
    const spy = vi.fn();
    store.subscribe(spy);

    store.value = { count: 0, data: { a: 1 } };
    expect(store.value).toEqual({ count: 0, data: { a: 1 } });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not update if the new state is the same as the old state (primitive)', () => {
    const store = createStore(0);
    const spy = vi.fn();
    store.subscribe(spy);

    store.value = 0;
    expect(store.value).toBe(0);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should maintain history up to maxHistorySize', () => {
    const store = createStore({ count: 0 }, { maxHistorySize: 3 });
    store.value = { count: 1 };
    store.value = { count: 2 };
    store.value = { count: 3 };
    store.value = { count: 4 };

    expect(store.history.length).toBe(3);
    expect(store.history).toEqual([{ count: 1 }, { count: 2 }, { count: 3 }]);
  });

  it('should call subscribers on state change', () => {
    const store = createStore({ count: 0 });
    const subscriber1 = vi.fn();
    const subscriber2 = vi.fn();

    store.subscribe(subscriber1);
    store.subscribe(subscriber2);

    store.value = { count: 1 };

    expect(subscriber1).toHaveBeenCalledTimes(1);
    expect(subscriber2).toHaveBeenCalledTimes(1);
  });

  it('should not call unsubscribed subscribers', () => {
    const store = createStore({ count: 0 });
    const subscriber = vi.fn();
    const unsubscribe = store.subscribe(subscriber);

    unsubscribe();
    store.value = { count: 1 };

    expect(subscriber).not.toHaveBeenCalled();
  });

  it('should lock and prevent state modifications', () => {
    const store = createStore({ count: 0 });
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    store.lock();
    store.value = { count: 1 };
    expect(store.value).toEqual({ count: 0 });
    spy.mockRestore();
  });

  it('should unlock and allow state modifications', () => {
    const store = createStore({ count: 0 });
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const lockId = store.lock();
    store.value = { count: 1 };
    expect(store.value).toEqual({ count: 0 });
    spy.mockRestore();

    store.unlock(lockId);
    store.value = { count: 1 };
    expect(store.value).toEqual({ count: 1 });
  });
});

describe('useStore', () => {
  it('should return the current state and a setter (object)', () => {
    const store = createStore({ text: 'hello' });
    const { result } = renderHook(() => useStore(store));

    expect(result.current[0]).toEqual({ text: 'hello' });

    act(() => {
      result.current[1]({ text: 'world' });
    });

    expect(result.current[0]).toEqual({ text: 'world' });
    expect(store.value).toEqual({ text: 'world' });
  });

  it('should return the current state and a setter (number)', () => {
    const store = createStore(0);
    const { result } = renderHook(() => useStore(store));

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
    expect(store.value).toBe(1);
  });

  it('should update the state using an updater function (object)', () => {
    const store = createStore({ count: 0 });
    const { result } = renderHook(() => useStore(store));

    expect(result.current[0]).toEqual({ count: 0 });

    act(() => {
      result.current[1]((prevState) => ({ count: prevState.count + 1 }));
    });

    expect(result.current[0]).toEqual({ count: 1 });
    expect(store.value).toEqual({ count: 1 });
  });

  it('should update the state using an updater function (number)', () => {
    const store = createStore(0);
    const { result } = renderHook(() => useStore(store));

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1]((prevState) => prevState + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(store.value).toBe(1);
  });

  it('should re-render component on store change', () => {
    const store = createStore({ count: 0 });
    const { result } = renderHook(() => useStore(store));

    expect(result.current[0]).toEqual({ count: 0 });

    act(() => {
      store.value = { count: 1 };
    });

    expect(result.current[0]).toEqual({ count: 1 });
  });
});

describe('useStoreEffect', () => {
  let store1: ReturnType<typeof createStore>;
  let store2: ReturnType<typeof createStore>;
  let effectFn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    store1 = createStore(0);
    store2 = createStore('a');
    effectFn = vi.fn();
  });

  it('should run the effect once if no stores are provided', () => {
    renderHook(() => useStoreEffect(effectFn));
    expect(effectFn).toHaveBeenCalledTimes(1);
  });

  it('should run the effect when a tracked store changes', () => {
    renderHook(() => useStoreEffect(effectFn, [store1]));
    effectFn.mockClear(); // Clear initial call

    act(() => {
      store1.value = 1;
    });

    expect(effectFn).toHaveBeenCalledTimes(1);
  });

  it('should run the effect when multiple tracked stores change', () => {
    renderHook(() => useStoreEffect(effectFn, [store1, store2]));
    effectFn.mockClear(); // Clear initial call

    act(() => {
      store1.value = 1;
    });
    act(() => {
      store2.value = 'b';
    });

    expect(effectFn).toHaveBeenCalledTimes(2);
  });

  it('should not run the effect if tracked store value is deep equal', () => {
    const store = createStore({ value: 0 });
    renderHook(() => useStoreEffect(effectFn, [store]));
    effectFn.mockClear(); // Clear initial call

    act(() => {
      store.value = { value: 0 }; // Deep equal, should not trigger
    });

    expect(effectFn).not.toHaveBeenCalled();
  });

  it('should run cleanup function when effect re-runs or component unmounts', () => {
    const cleanupFn = vi.fn();
    const effectWithCleanup = vi.fn(() => cleanupFn);

    const { unmount } = renderHook(() => useStoreEffect(effectWithCleanup, [store1]));
    expect(effectWithCleanup).toHaveBeenCalledTimes(1);
    expect(cleanupFn).not.toHaveBeenCalled();

    act(() => {
      store1.value = 1;
    });
    expect(effectWithCleanup).toHaveBeenCalledTimes(2);
    expect(cleanupFn).toHaveBeenCalledTimes(1); // Cleanup from first run

    unmount();
    expect(cleanupFn).toHaveBeenCalledTimes(2); // Cleanup from last run on unmount
  });
});