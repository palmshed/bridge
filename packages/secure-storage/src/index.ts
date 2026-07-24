import type { SecureStorage } from "./types";

declare global {
  interface Window {
    SecureStorage?: {
      get(key: string): Promise<string | null>;
      set(key: string, value: string): Promise<void>;
      remove(key: string): Promise<void>;
      clear(): Promise<void>;
      keys(): Promise<string[]>;
    };
  }
}

class WebSecureStorage implements SecureStorage {
  private prefix = "secure_";

  async get(key: string): Promise<string | null> {
    try {
      const value = localStorage.getItem(this.prefix + key);
      return value;
    } catch {
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(this.prefix + key, value);
    } catch (error) {
      throw new Error(`Failed to store value for key "${key}": ${error}`);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      throw new Error(`Failed to remove key "${key}": ${error}`);
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await this.keys();
      for (const key of keys) {
        localStorage.removeItem(this.prefix + key);
      }
    } catch (error) {
      throw new Error(`Failed to clear storage: ${error}`);
    }
  }

  async keys(): Promise<string[]> {
    try {
      const result: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          result.push(key.slice(this.prefix.length));
        }
      }
      return result;
    } catch {
      return [];
    }
  }
}

class NativeSecureStorage implements SecureStorage {
  async get(key: string): Promise<string | null> {
    if (window.SecureStorage) {
      return window.SecureStorage.get(key);
    }
    throw new Error("SecureStorage not available");
  }

  async set(key: string, value: string): Promise<void> {
    if (window.SecureStorage) {
      return window.SecureStorage.set(key, value);
    }
    throw new Error("SecureStorage not available");
  }

  async remove(key: string): Promise<void> {
    if (window.SecureStorage) {
      return window.SecureStorage.remove(key);
    }
    throw new Error("SecureStorage not available");
  }

  async clear(): Promise<void> {
    if (window.SecureStorage) {
      return window.SecureStorage.clear();
    }
    throw new Error("SecureStorage not available");
  }

  async keys(): Promise<string[]> {
    if (window.SecureStorage) {
      return window.SecureStorage.keys();
    }
    throw new Error("SecureStorage not available");
  }
}

function isNative(): boolean {
  return typeof window !== "undefined" && !!window.SecureStorage;
}

export const secureStorage: SecureStorage = isNative()
  ? new NativeSecureStorage()
  : new WebSecureStorage();

export type { SecureStorage, StorageError, UnsupportedPlatformError } from "./types";
export { StorageError, UnsupportedPlatformError } from "./types";
