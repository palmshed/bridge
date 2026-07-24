# @palmshed/secure-storage

Secure storage for sensitive application data.

## Purpose

Provide a simple, consistent API for securely storing small pieces of sensitive data. This is not a database. This is not a file store.

It is for things like:

- Authentication tokens
- API keys
- Refresh tokens
- Encrypted preferences
- Session data

## Installation

```bash
npm install @palmshed/secure-storage
```

## Usage

```typescript
import { secureStorage } from "@palmshed/secure-storage";

// Store a value
await secureStorage.set("token", "abc123");

// Retrieve a value
const token = await secureStorage.get("token");

// Remove a value
await secureStorage.remove("token");

// Clear all values
await secureStorage.clear();

// List all keys
const keys = await secureStorage.keys();
```

## API

### `secureStorage.get(key: string): Promise<string | null>`

Retrieves a value by key. Returns `null` if the key does not exist.

### `secureStorage.set(key: string, value: string): Promise<void>`

Stores a value. Overwrites any existing value for the key.

### `secureStorage.remove(key: string): Promise<void>`

Removes a value by key. Does not throw if the key does not exist.

### `secureStorage.clear(): Promise<void>`

Removes all stored values.

### `secureStorage.keys(): Promise<string[]>`

Returns all stored keys.

## Platform Notes

### Android

Uses `EncryptedSharedPreferences` with AES-256-GCM encryption. The encryption key is managed by the Android Keystore system and is protected by the user's screen lock credential when set.

Requires:

- `androidx.security:security-crypto` dependency
- Minimum API level 23

### iOS

Uses Keychain Services with `kSecAttrAccessibleAfterFirstUnlock`. Items are available after the device is first unlocked following a restart. Data is encrypted with the device's passcode-derived key when available.

Requires:

- Keychain entitlement
- iOS 12 or later

### Web

This implementation is a **development fallback** for use in browsers during local development. Values are stored in `localStorage` with a `secure_` prefix. This does not provide encryption and should not be relied upon for protecting sensitive information. Use the native implementations for production.

## Error Handling

All methods return Promises. If an operation fails, the Promise rejects with an error.

```typescript
import { secureStorage } from "@palmshed/secure-storage";

try {
  await secureStorage.set("key", "value");
} catch (error) {
  console.error("Storage failed:", error.message);
}
```

## Limitations

- Values must be strings. Serialize objects before storing.
- Storage size is limited by the platform (typically 4MB on Android, varies on iOS).
- Not suitable for large files or binary data.
- Web fallback is a development tool only. It does not provide encryption.

## Development

```bash
npm run typecheck
npm run test
```

## License

MIT
