import { useState, useEffect } from "react";
import { VALIDATION_RULES } from "@/constants/validationRules";

export function useDebounce<T>(value: T, delay: number = VALIDATION_RULES.SEARCH_DEBOUNCE_MS): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
