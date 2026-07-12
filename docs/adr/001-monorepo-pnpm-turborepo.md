# ADR-001: Monorepo Architecture with pnpm + Turborepo

## Status
Accepted

## Context
The ResourcePack.dev platform aims to be an enterprise-grade Knowledge Base containing a frontend explorer (Astro), a future backend API (Django), a parser pipeline for vanilla assets, and multiple isolated logical domains (schemas, UI components, indices). Managing these as separate repositories would create significant friction in synchronization, sharing types, and continuous integration. Alternatively, an unstructured single repository would quickly become difficult to maintain and build.

## Decision
We will use a **Monorepo** architecture managed by **pnpm workspaces** and **Turborepo**.

The structure will explicitly separate applications and packages:
```
apps/
  docs/         (Astro - Explorer)
  api/          (Django - Backend)
packages/
  knowledge/    (Content)
  schemas/      (Domain Model)
  ui/           (React Components)
  indexer/      (Search Indexing)
  parser/       (Asset Parsing)
  normalizer/   (Vocabulary Translation)
```

## Consequences
**Positive:**
- Seamless sharing of the Domain Model (`packages/schemas`) across the frontend, backend, and parsers.
- Fast, cached, parallel builds thanks to Turborepo.
- Strict dependency boundaries prevent spaghetti code (e.g., `apps/docs` must explicitly depend on `packages/knowledge`).
- Single source of truth for the entire platform's lifecycle.

**Negative:**
- Higher initial setup complexity compared to a standard single-app repository.
- Potential learning curve for new contributors unfamiliar with monorepos.
