# Bridge

Reusable native integrations for web applications.

## Purpose

Bridge is Palmshed's foundation for native capabilities shared across our web-based applications. It provides a stable bridge between web applications and platform-specific features, regardless of the underlying implementation.

## Principles

- **Reusable**. Built for multiple applications, not a single project.
- **Minimal**. Small, well-documented APIs with few dependencies.
- **Platform-agnostic**. Focused on the interface, not the implementation.
- **Consistent**. Follows the same design philosophy as [Base](https://github.com/palmshed/base).

## Structure

```
bridge/
├── packages/
│   ├── bridge-core/        # Shared utilities
│   ├── secure-storage/     # Secure key-value storage
│   └── example-app/        # Development playground
├── docs/                   # Design language and philosophy
├── .github/
│   ├── workflows/          # CI and release automation
│   └── website/            # Landing page
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## Getting Started

```bash
git clone https://github.com/palmshed/bridge.git
cd bridge
npm install
npm run dev
```

The example app runs at `http://localhost:3000/bridge/`.

## Development

### Commands

```bash
npm run dev          # Start example app
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
npm run test         # Run tests
npm run build        # Build example app
```

### Capacitor

These commands run from the `packages/example-app/` directory:

```bash
npm run build:app    # Build for mobile
npm run cap:sync     # Sync with native platforms
npm run cap:open:ios # Open in Xcode
npm run cap:open:android # Open in Android Studio
```

## Adding a Plugin

1. Create a new directory under `packages/`:

```
packages/
├── my-plugin/
│   ├── src/
│   │   ├── index.ts          # Web interface
│   │   ├── index.test.ts     # TypeScript tests
│   │   ├── android/          # Kotlin implementation
│   │   └── ios/              # Swift implementation
│   ├── README.md
│   ├── package.json
│   └── tsconfig.json
└── example-app/
```

2. Define the TypeScript interface in `src/types.ts` and export it from `src/index.ts`.
3. Implement platform code in `android/` (Kotlin) and `ios/` (Swift).
4. Add tests for all three platforms.
5. Write a README with examples and platform notes.

See `docs/plugin-api.md` for the full interface guide.

## Plugins

### Current

- **@palmshed/secure-storage**. Secure storage for sensitive application data.

### Possible Future Plugins

- Share
- File Access
- Document Picker
- Biometrics
- Local Notifications
- Reader helpers

## Versioning

Plugins version independently. Each plugin has its own version in its `package.json`.

When publishing to npm, use the `@palmshed/` scope:

```
@palmshed/bridge-core
@palmshed/secure-storage
```

Releases are triggered by Git tags:

```bash
git tag v0.1.0
git push origin v0.1.0
```

This creates a GitHub Release with auto-generated release notes.

## License

MIT
