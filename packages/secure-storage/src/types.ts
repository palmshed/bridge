export interface SecureStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
}

export class StorageError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = "StorageError";
  }
}

export class UnsupportedPlatformError extends Error {
  constructor(platform: string, feature: string) {
    super(`${feature} is not supported on ${platform}`);
    this.name = "UnsupportedPlatformError";
  }
}
