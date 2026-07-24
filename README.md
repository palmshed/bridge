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
│   └── example-app/     # Development playground
├── .github/workflows/   # CI and release automation
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
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
└── example-app/
```

2. Define the plugin interface in TypeScript.
3. Implement platform-specific code in Kotlin (Android) and Swift (iOS).
4. Add tests.
5. Document the API.

## Plugins

No plugins are implemented yet. Plugins will be added when at least two projects can benefit from them.

### Possible Future Plugins

- Secure Storage
- Share
- File Access
- Document Picker
- Biometrics
- Local Notifications
- Reader helpers

## Release

Releases are triggered by Git tags:

```bash
git tag v0.1.0
git push origin v0.1.0
```

This creates a GitHub Release with auto-generated release notes.

## License

MIT
