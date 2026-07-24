# Contributing to Bridge

Thank you for considering contributing to Bridge.

## Guidelines

- Keep it small. Every plugin should solve a real problem shared by at least two projects.
- Document everything. If it's not documented, it doesn't exist.
- Test everything. If it's not tested, it's not ready.
- Follow existing patterns. Consistency matters more than cleverness.

## Development Setup

```bash
git clone https://github.com/palmshed/bridge.git
cd bridge
npm install
npm run dev
```

## Adding a Plugin

1. Create a directory under `packages/`.
2. Define the TypeScript interface.
3. Implement platform code in Kotlin and Swift.
4. Add tests.
5. Update this document.

## Code Style

- TypeScript with strict mode.
- ESLint with the shared configuration.
- No comments unless the logic is genuinely complex.

## Pull Requests

- Keep PRs small and focused.
- Describe what changed and why.
- Include tests for new functionality.

## Questions?

Open an issue at [github.com/palmshed/bridge](https://github.com/palmshed/bridge/issues).
