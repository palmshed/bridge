import { describe, it, expect, beforeEach, vi } from "vitest";
import { secureStorage, StorageError, UnsupportedPlatformError } from "./index";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
    getStore: () => store,
    reset: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
});

describe("secureStorage", () => {
  beforeEach(() => {
    localStorageMock.reset();
    vi.clearAllMocks();
  });

  describe("set and get", () => {
    it("stores and retrieves a value", async () => {
      await secureStorage.set("token", "abc123");
      const result = await secureStorage.get("token");
      expect(result).toBe("abc123");
    });

    it("returns null for non-existent key", async () => {
      const result = await secureStorage.get("nonexistent");
      expect(result).toBeNull();
    });

    it("overwrites existing value", async () => {
      await secureStorage.set("key", "value1");
      await secureStorage.set("key", "value2");
      const result = await secureStorage.get("key");
      expect(result).toBe("value2");
    });
  });

  describe("remove", () => {
    it("removes a stored value", async () => {
      await secureStorage.set("token", "abc123");
      await secureStorage.remove("token");
      const result = await secureStorage.get("token");
      expect(result).toBeNull();
    });

    it("does not throw when removing non-existent key", async () => {
      await expect(secureStorage.remove("nonexistent")).resolves.not.toThrow();
    });
  });

  describe("clear", () => {
    it("removes all stored values", async () => {
      await secureStorage.set("key1", "value1");
      await secureStorage.set("key2", "value2");
      await secureStorage.clear();
      const result1 = await secureStorage.get("key1");
      const result2 = await secureStorage.get("key2");
      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });
  });

  describe("keys", () => {
    it("returns all stored keys", async () => {
      await secureStorage.set("token", "abc");
      await secureStorage.set("refresh", "def");
      const keys = await secureStorage.keys();
      expect(keys).toContain("token");
      expect(keys).toContain("refresh");
    });

    it("returns empty array when no keys exist", async () => {
      const keys = await secureStorage.keys();
      expect(keys).toEqual([]);
    });
  });

  describe("error handling", () => {
    it("StorageError has correct name", () => {
      const error = new StorageError("test message", "TEST_CODE");
      expect(error.name).toBe("StorageError");
      expect(error.message).toBe("test message");
      expect(error.code).toBe("TEST_CODE");
    });

    it("UnsupportedPlatformError has correct name", () => {
      const error = new UnsupportedPlatformError("web", "biometrics");
      expect(error.name).toBe("UnsupportedPlatformError");
      expect(error.message).toBe("biometrics is not supported on web");
    });
  });
});
