import { useEffect, useState } from "react";

export function useLocalStorageState<T>(
  initialState: T | (() => T),
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  }) as [T, React.Dispatch<React.SetStateAction<T>>];

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
