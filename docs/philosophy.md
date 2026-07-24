# Bridge Philosophy

This document captures the principles that guide how Bridge
is structured and maintained. It exists for future contributors who
want to understand why things are the way they are.

---

## Principles

### Bridge exists to make native capabilities feel like part of the web application

It should expose small, stable, and well-documented interfaces, while hiding
platform-specific complexity. Every plugin should solve a real problem shared
by multiple projects before it is added.

---

### Prefer simple abstractions over generic frameworks

Every abstraction should earn its keep. A plugin exists because there is a
real native capability that multiple web applications need. A generic
"PluginFactory" meta-framework does not exist because it would add indirection
without solving a concrete problem.

Build for what you have, not for what you imagine you might one day need.

---

### Build platform capabilities only after two products need them

Bridge exists because future Palmshed products would each need native
capabilities like secure storage, biometrics, and file access. Extracting
those capabilities once for Bridge avoids rebuilding them three more times.

A capability that only one product will ever use does not belong in Bridge.
It belongs in the product.

---

### Public APIs evolve conservatively

Every exported symbol is a commitment. Changing it requires a major version
bump, deprecation warnings, and a migration window.

It is better to leave a symbol internal for an extra release than to
expose it and immediately regret the shape.

---

### Verification is required before every release

Lint, typecheck, and tests must pass before any release is cut.
If CI cannot verify the code, the release does not ship.

---

### Documentation and tests are part of the implementation

A plugin is not complete until it has:

- Tests that cover the public API
- Platform-specific tests for Android and iOS
- A README that documents configuration and usage
- A short example showing basic usage

Documentation is not a separate task. It is the same task.

---

### Favor the standard web platform where practical

Use the Web APIs that are available across browsers and platforms.
Reach for native bridges only when the web platform cannot solve the problem.

This is not a universal rule. When a native capability dramatically improves
the user experience, use it. But default to web first and justify every
native bridge.

---

### A healthy project says no

The most important architectural skill is knowing when a capability
is not yet needed. Bridge will grow. It should grow because multiple
products need it, not because there is another abstract service waiting
to be extracted.

---

### Keep one plugin per directory

Each plugin should be self-contained with its own:

- TypeScript source
- Android implementation (Kotlin)
- iOS implementation (Swift)
- Tests
- Documentation

---

### Version plugins independently where practical

If one plugin has a breaking change, it should not force a major version
bump on every other plugin.

---

### Maintain API compatibility whenever possible

Prefer additive changes over breaking changes. When a breaking change
is unavoidable, provide a clear migration path.

---

## What This Does Not Mean

These principles do not prohibit good engineering. They are not an
excuse to cut corners or defer necessary work. They exist to prevent
the kind of over-engineering that produces elegant infrastructure
and a mediocre product.

The goal is a repository that is easy to understand, easy to change,
and easy to operate, not one that is maximally abstract or
theoretically pure.

---

## Related Documents

- `docs/palmshed-design.md`. The Palmshed design language
- `docs/palmshed-tokens.md`. Shared design tokens
- `CONTRIBUTING.md`. How to contribute
- `README.md`. Getting started
