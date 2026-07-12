# ADR-004: Frontmatter Versioning vs Folder Versioning

## Status
Accepted

## Context
Minecraft is highly versioned. When a new version is released, many assets remain entirely unchanged, some receive minor tweaks, and a few are completely rewritten. If we were to use a traditional folder-based versioning approach (e.g., duplicating the entire documentation folder into `1.20/`, `1.21/`), it would lead to massive duplication of content, making maintenance a nightmare. Updating a typo in a legacy article would require changing it across 15 duplicate files.

## Decision
We will use a **Single Source of Truth** for each `KnowledgeObject` and handle versioning via **Frontmatter Metadata**.
Each document will represent the entity's complete lifecycle and include metadata such as:
- `introducedIn`: e.g., "1.8"
- `removedIn`: e.g., "1.21.2"
- `changes`: Inline array of versions and specific property modifications.

The frontend "Version Switcher" will act as an intelligent filter against this metadata, displaying contextual notices (e.g., "This feature was removed in 1.20") rather than simple 404 pages.

## Consequences
**Positive:**
- **Zero Content Duplication:** A single file manages the entire history of an asset.
- **Easier Maintenance:** Fixing a typo or clarifying a description applies to all versions simultaneously.
- **Rich Context:** The API and frontend can easily build a "Changelog" for a specific asset by reading its metadata history.

**Negative:**
- Requires custom routing and filtering logic in Astro, as standard documentation generators expect folder-based versioning.
