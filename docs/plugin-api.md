# Plugin API Guide

This document defines the interface every Bridge plugin should follow.

## Interface Contract

Every plugin must export a TypeScript interface that defines the web-facing API. Platform-specific implementations (Kotlin, Swift) are hidden behind this interface.

### Naming

- Plugin directory: `packages/<plugin-name>/`
- Package name: `@palmshed/<plugin-name>`
- Main export: `src/index.ts`
- Tests: `src/index.test.ts`
- Android code: `src/android/`
- iOS code: `src/ios/`

### Directory Structure

```
packages/
├── <plugin-name>/
│   ├── src/
│   │   ├── index.ts          # Public API
│   │   ├── index.test.ts     # Tests
│   │   ├── types.ts          # Shared types (optional)
│   │   ├── android/
│   │   │   └── index.ts      # Android implementation
│   │   └── ios/
│   │       └── index.ts      # iOS implementation
│   ├── README.md
│   ├── package.json
│   └── tsconfig.json
```

### TypeScript Interface

Every plugin must define a clear, minimal interface. Prefer promises over callbacks. Prefer explicit types over `any`.

```typescript
// Example: secure-storage plugin
export interface SecureStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

export declare const secureStorage: SecureStorage;
```

### Error Handling

Plugins should throw typed errors, not return error strings. Let the calling code decide how to handle failures.

```typescript
export class StorageError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = "StorageError";
  }
}
```

### Platform Detection

Plugins should work across platforms. If a feature is unavailable on one platform, throw a clear error rather than silently failing.

```typescript
export class UnsupportedPlatformError extends Error {
  constructor(platform: string, feature: string) {
    super(`${feature} is not supported on ${platform}`);
    this.name = "UnsupportedPlatformError";
  }
}
```

## package.json

Every plugin must have a `package.json` with:

```json
{
  "name": "@palmshed/<plugin-name>",
  "version": "0.1.0",
  "description": "Brief description of the plugin.",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "devDependencies": {
    "typescript": "^5.7",
    "vitest": "^3.2"
  },
  "license": "MIT"
}
```

## README Format

Every plugin must include a README with:

1. **Purpose**. What the plugin does.
2. **Installation**. How to install it.
3. **Usage**. Code examples.
4. **API**. Interface documentation.
5. **Platform notes**. Any platform-specific behavior.
6. **Limitations**. What the plugin does not do.

### Template

```markdown
# @palmshed/<plugin-name>

Brief description.

## Installation

\`\`\`bash
npm install @palmshed/<plugin-name>
\`\`\`

## Usage

\`\`\`typescript
import { example } from "@palmshed/<plugin-name>";

const result = await example.doSomething();
\`\`\`

## API

### `example.doSomething(): Promise<Result>`

Description of the method.

## Platform Notes

- **Android**: Any Android-specific behavior.
- **iOS**: Any iOS-specific behavior.

## Limitations

- What the plugin does not do.
```

## Testing

Every plugin must have tests for:

1. **TypeScript**. Unit tests for the web interface.
2. **Android**. Instrumented tests for Kotlin code.
3. **iOS**. XCTest for Swift code.

TypeScript tests use Vitest. Android and iOS tests use their native test frameworks.

## Adding a Plugin

1. Copy the structure from an existing plugin or the template above.
2. Implement the TypeScript interface.
3. Implement platform code.
4. Add tests.
5. Write the README.
6. Update the root `package.json` if needed.
