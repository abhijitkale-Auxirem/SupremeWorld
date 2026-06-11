const PREFIX = "sw_";

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(`${PREFIX}${key}`);
      return item ? (JSON.parse(item) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
    } catch (err) {
      console.error(`[Storage] Failed to set "${key}":`, err);
    }
  },
  remove(key: string): void {
    localStorage.removeItem(`${PREFIX}${key}`);
  },
  clear(): void {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};
