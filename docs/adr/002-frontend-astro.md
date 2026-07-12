# ADR-002: Frontend Explorer Framework - Astro

## Status
Accepted

## Context
The primary initial consumer of the Knowledge Base is a web-based "Explorer" that needs to render highly complex, heavily interconnected Markdown/MDX content with interactive components (React). The site must be extremely performant, SEO-friendly, and capable of handling thousands of static pages without shipping massive JavaScript bundles to the client.

## Decision
We will use **Astro** (with the Starlight template as a baseline, heavily customized) to build `apps/docs`.

## Consequences
**Positive:**
- **Zero JS by Default / Islands Architecture:** Astro excels at shipping zero JavaScript for static content (the vast majority of the Knowledge Base) while allowing interactive React components (like the Knowledge Graph visualizers) to run only where needed.
- **Native MDX Support:** First-class support for MDX allows us to seamlessly embed complex React components inside our content.
- **Content Collections:** Built-in Zod validation for content frontmatter aligns perfectly with our Domain Model strategy.

**Negative:**
- Transitioning to a fully dynamic, heavily client-routed application (SPA) in the future would be more difficult than if we had chosen Next.js. However, a Knowledge Base is inherently document-centric, mitigating this risk.
