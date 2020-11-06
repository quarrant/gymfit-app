import { createContext, useContext } from 'react';

export function useStore<T>(target: { new (...args: any): T }): T {
  const context = createContext(new target());
  return useContext(context);
}
