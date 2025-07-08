/** @typedef {import('./types/config.types.ts').CraxConfig} CraxConfig */

import defaults from './default.config.mjs';
import overrides from '../crax.config.mjs';

if (!overrides) {
  throw new Error(
    'No config found, expected crax.config.mjs at root. Please ensure it exists and is properly configured.'
  );
}

if (typeof overrides !== 'object' || Array.isArray(overrides)) {
  throw new Error(
    'Invalid config format, expected an object. Please check your crax.config.mjs file.'
  );
}

/**
 * @template T
 * @param {T} base
 * @param {Partial<T>} overrides
 * @returns {T}
 */
function mergeDeep(base, overrides) {
  const result = structuredClone(base);

  for (const key in overrides) {
    const val = overrides[key];

    if (val && typeof val === 'object' && !Array.isArray(val) && key in base) {
      result[key] = mergeDeep(base[key], val);
    } else {
      result[key] = val;
    }
  }

  return result;
}

/** @type {CraxConfig} */
const config = mergeDeep(defaults, overrides);

export default config;
