"use client";
import { useState, useEffect } from "react";

interface UseLocalStorageOptions<T> {
  key: string;
  initialValue: T;
}

export function useLocalStorage<T>({
  key,
  initialValue,
}: UseLocalStorageOptions<T>) {
  // Get initial value
  const readValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage", error);
      return initialValue;
    }
  };

  // State initialized from localStorage
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Update localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error setting localStorage", error);
    }
  }, [key, storedValue]);

  // Clear

  const clearStorage = () => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return [storedValue, setStoredValue, clearStorage] as const;
}
