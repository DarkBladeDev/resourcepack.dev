# ADR-005: Domain Model Validation - Zod

## Status
Accepted

## Context
Since the Knowledge Base relies heavily on metadata, relations, and strict typing (Knowledge Objects, Sources, Collections), we must enforce that all content adheres to this model. A typo in a relation ID (`relates_to: "model.aple"` instead of `"model.apple"`) would break the Knowledge Graph.

## Decision
We will use **Zod** in `packages/schemas` to define the runtime validation schemas for our Domain Model.
All MDX frontmatter will be strictly parsed and validated against these Zod schemas during the build process (and eventually, at runtime in the API/Normalizer).

## Consequences
**Positive:**
- Complete type safety across the monorepo (Zod infers TypeScript types).
- Fails the build immediately if content authors make a mistake in their metadata, ensuring 100% data integrity for the Knowledge Graph.
- Easily shareable between the Astro frontend, Django backend, and Node-based parser.

**Negative:**
- Imposes a strict learning curve on contributors writing MDX files, as they must conform exactly to the Zod schema.
