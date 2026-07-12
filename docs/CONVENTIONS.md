# ResourcePack.dev - Conventions

This document outlines the strict naming and structural conventions for the Knowledge Base. By standardizing our vocabulary and identifiers, we ensure seamless programmatic parsing, automation, and API integration.

## 1. Identifiers (IDs)

Every entity in the system must have a unique, permanent, and predictable ID.

- **Format:** `kebab-case` and strictly namespaced.
- **Delimiters:** Use dots `.` to denote hierarchy and namespaces.

**Knowledge Objects (Assets, Concepts):**
- **Pattern:** `[namespace].[domain].[category].[subcategory].[item]`
- **Examples:**
  - `minecraft.resourcepack.model.item.generated`
  - `minecraft.resourcepack.texture.block.dirt`
  - `minecraft.resourcepack.font.provider.bitmap`
  - `oraxen.item.custom_mechanic`

**Relations:**
Relations are strictly typed strings denoting directional graphs between entities.
- `depends_on` (Entity A cannot function without Entity B)
- `uses` (Entity A utilizes Entity B, but might not strictly depend on it to load)
- `extends` (Entity A inherits properties from Entity B, e.g., parent models)
- `parent_of` / `child_of` (Hierarchical structure)
- `implements` (Entity A satisfies a Concept B)
- `related` (Soft link for suggested reading)

**Sources:**
- **Pattern:** `source.[creator].[name]`
- **Examples:**
  - `source.mojang.tech_notes`
  - `source.community.minecraft_wiki`
  - `source.code.fabric_api`

## 2. Naming Conventions in Code (Monorepo)

- **Packages:** `kebab-case` (e.g., `@resourcepack/schemas`, `@resourcepack/ui`)
- **TypeScript Types & Interfaces:** `PascalCase` (e.g., `KnowledgeObject`, `MinecraftAsset`)
- **Zod Schemas:** `camelCase` ending in `Schema` (e.g., `knowledgeObjectSchema`)
- **React Components:** `PascalCase` (e.g., `<VersionBadge />`, `<JsonSchema />`)
- **Utility Functions:** `camelCase` (e.g., `parseFrontmatter`, `buildGraph`)
- **Files/Directories (Non-React):** `kebab-case` (e.g., `parse-asset.ts`)
- **Files (React Components):** `PascalCase.tsx` (e.g., `VersionBadge.tsx`)

## 3. MDX Content Files

All MDX content must reside inside `packages/knowledge/src/` and map roughly to their ID hierarchy, though the ID in the frontmatter is the ultimate source of truth, not the file path.
- **Filenames:** `kebab-case.mdx` (e.g., `generated.mdx`, `bitmap.mdx`)

## 4. General Terminology

- **Knowledge Base:** The entire collection of data and relations (the platform itself).
- **Explorer:** The Astro frontend (`apps/docs`) that visualizes the Knowledge Base.
- **Knowledge Object:** Any entity that has documentation, relations, and versions.
- **Domain Model:** The structural definition of how Knowledge Objects connect (defined in Zod).
- **Normalizer:** The system responsible for converting external terms (e.g., `JsonUnbakedModel`) into our canonical IDs (`minecraft.resourcepack.model`).
