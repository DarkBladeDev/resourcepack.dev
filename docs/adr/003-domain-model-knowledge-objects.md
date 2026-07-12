# ADR-003: Agnostic Domain Model - Knowledge Objects

## Status
Accepted

## Context
Initially, the project focuses on Minecraft Java Edition Resource Packs (Models, Textures, Blockstates). However, documenting Minecraft assets is inherently complex because the underlying formats often change, are influenced by mods (e.g., Fabric, Paper, Oraxen), and exist in various contexts (Datapacks, Plugins). Hardcoding entities like `ItemModel` or `BlockTexture` as the root of the application would make expanding the platform to these other domains nearly impossible without a rewrite.

## Decision
We will base the entire architecture on an abstract **Knowledge Object** entity. 
Rather than creating documentation "pages," we are defining nodes in a Knowledge Graph. 
A `KnowledgeObject` will act as the root type for all information, extended into specific domains like `MinecraftAsset`. 
Relationships between these objects will be defined via strict `Relation` entities (e.g., `depends_on`, `uses`), and sources via `Source` entities.

## Consequences
**Positive:**
- **Extreme Extensibility:** We can document a Datapack, a server plugin, or a new Minecraft feature simply by creating new types that extend `KnowledgeObject`, without touching the core routing or parsing logic.
- **Graph Generation:** Decoupling relations into entities allows us to programmatically generate Knowledge Graphs, breadcrumbs, and dependency trees.
- **Multi-Output:** The model can be rendered as a website, exposed via REST API, or fed into a RAG AI system with zero structural changes.

**Negative:**
- Requires writing and maintaining complex parsing, normalization, and validation logic before any "content" is actually visible on the frontend.
