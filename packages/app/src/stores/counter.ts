import { createStore } from '@crax/store';

export const counterStore = createStore(0);

counterStore.subscribe(() => {
  console.log('Counter updated:', counterStore.value);
});
