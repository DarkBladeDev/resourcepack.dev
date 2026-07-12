# Contributing to ResourcePack.dev Knowledge Base

Thank you for contributing! This project is not a standard wiki; it is a highly structured, machine-readable Knowledge Base. Every contribution must adhere to strict schemas to maintain the integrity of our Knowledge Graph.

## 1. Adding or Editing a Knowledge Object (MDX)

All content lives in `packages/knowledge/src/`. To create or edit documentation:

### Step 1: Create the MDX File
Locate the correct directory based on the namespace and domain (e.g., `packages/knowledge/src/minecraft/resourcepack/models/item/generated.mdx`).

### Step 2: Define the Frontmatter
You must include strict YAML frontmatter at the top of the file. This will be validated against our Zod schemas (`packages/schemas`).

```yaml
---
id: "minecraft.resourcepack.model.item.generated"
type: "Asset"
title: "Item Model (Generated)"
description: "The default procedural model used for flat 2D items."
introducedIn: "1.8"
difficulty: "Beginner"
tags: ["model", "item", "procedural"]
namespaces: ["minecraft"]
---
```

### Step 3: Define Relations
Do not just write "This uses a texture" in the text. Explicitly define relations using the `<Relation />` or `<DependsOn />` components (which will be parsed into the Knowledge Graph).

*(Note: The exact syntax for declaring relations in MDX vs Frontmatter will be finalized in the schema design phase. Prefer strict structured data).*

### Step 4: Use Reusable Components
Do not write flat Markdown tables for complex data like JSON schemas. Use our React components:

```mdx
import { JsonSchema, ApiProperty, Example, Warning } from '@resourcepack/ui';

<Warning>
This feature was significantly altered in 1.21.4.
</Warning>

<JsonSchema>
  <ApiProperty name="parent" type="string" required>
    Must point to `builtin/generated`.
  </ApiProperty>
</JsonSchema>
```

## 2. Citing Sources
Every technical claim must be verifiable. Do not paste random URLs.
Define the source in `packages/knowledge/src/sources/` or reference an existing source ID.

```mdx
import { Citation } from '@resourcepack/ui';

The generated model dynamically extrudes the texture based on transparency <Citation sourceId="source.mojang.tech_notes" />.
```

## 3. Updating Versions (Changelogs)
When Minecraft updates, do not duplicate the file. Add a change entry to the frontmatter or use the `<Change />` component inline.

```yaml
changes:
  - version: "1.21.4"
    type: "modified"
    description: "Added support for tinted layers."
```

## 4. Local Development

To test your changes locally:
1. Ensure you have `pnpm` installed.
2. Run `pnpm install` from the monorepo root.
3. Run `pnpm dev` to start the Explorer (`apps/docs`).
4. The console will immediately warn you if your frontmatter violates the Zod schema.
