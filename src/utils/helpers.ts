/**
 * Returns typed array of object keys.
 *
 * Usage:
 *
 * ```ts
 * const arr = getObjectKeys({ a: 1, b: 2 })
 * console.log(arr) // ['a', 'b'] with type ('a' | 'b')[]
 * ```
 */
export function getObjectKeys<T extends Record<string, any>>(target: T): (keyof T)[] {
  return Object.keys(target) as (keyof T)[];
}

/**
 * Returns array of object entries. If you usage rules entries will be filtered by rules
 * 
 * Usage:
 * 
 * ```ts
 * const obj = { a: 1, b: 2 };
 * 
 * const entries1 = getObjectEntries(obj)
 * console.log(entries1) // [1, 2] with type number[]
 * 
 * const entries2 = getObjectEntries(obj, { a: true })
 * console.log(entries2) // [1] with type number[]
})
 */
export function getObjectEntries<T extends Record<string, any>>(
  target: T,
  rules?: { [K in keyof T]?: boolean },
): T[keyof T][] {
  const entries = Object.entries(target).filter(([key]) => (rules ? !!rules[key] : true));
  return entries.map(([, value]) => value);
}
