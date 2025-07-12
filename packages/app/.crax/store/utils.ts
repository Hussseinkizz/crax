
import { diff } from 'just-diff';

/**
 * Returns an object containing only the properties (including nested) whose values are different or newly added in obj2 compared to obj1.
 * Uses just-diff to compute changes and reconstructs a nested diff object.
 *
 * @template T - The type of the base object.
 * @template U - The type of the object to compare to.
 * @param {T} obj1 - The base object to compare from.
 * @param {U} obj2 - The object to compare to.
 * @returns {Partial<T & U>} An object containing only the changed or new properties from obj2, preserving nesting.
 *
 * @example
 * // returns { b: { y: 3 } }
 * getChanges({ a: 1, b: { x: 1, y: 2 } }, { a: 1, b: { x: 1, y: 3 } });
 */
export function getChanges<T extends object, U extends object>(
  obj1: T,
  obj2: U
): Partial<T & U> {
  const changes = diff(obj1, obj2);
  const result: Partial<T & U> = {};

  for (const change of changes) {
    if (change.op === 'replace' || change.op === 'add') {
      // Build nested object for the path
      let curr = result;
      for (let i = 0; i < change.path.length - 1; i++) {
        const key = change.path[i];
        if (!(key in curr)) curr[key] = {};
        curr = curr[key];
      }
      curr[change.path.at(-1)!] = change.value;
    }
  }

  return result;
}
