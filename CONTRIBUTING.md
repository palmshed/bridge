# Contributing to Bridge

Thank you for considering contributing to Bridge.

## Guidelines

- Keep it small. Every plugin should solve a real problem shared by at least two projects.
- Document everything. If it is not documented, it does not exist.
- Test everything. If it is not tested, it is not ready.
- Follow existing patterns. Consistency matters more than cleverness.

## Development Setup

```bash
git clone https://github.com/palmshed/bridge.git
cd bridge
npm install
npm run dev
```

The example app runs at `http://localhost:3000/bridge/`.

## Commands

```bash
npm run dev          # Start example app
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
npm run test         # Run tests
npm run build        # Build example app
```

## Adding a Plugin

See `docs/plugin-api.md` for the full guide.

1. Create a directory under `packages/<plugin-name>/`.
2. Define the TypeScript interface in `src/types.ts` and export it from `src/index.ts`.
3. Implement platform code in `src/android/` (Kotlin) and `src/ios/` (Swift).
4. Add tests for all three platforms.
5. Write a README with examples and platform notes.

## Code Style

- TypeScript with strict mode.
- ESLint with the shared configuration.
- No comments unless the logic is genuinely complex.
- Prefer promises over callbacks.
- Prefer explicit types over `any`.

## Pull Requests

- Keep PRs small and focused.
- Describe what changed and why.
- Include tests for new functionality.
- Update documentation if the API changed.

## Questions?

Open an issue at [github.com/palmshed/bridge/issues](https://github.com/palmshed/bridge/issues).
