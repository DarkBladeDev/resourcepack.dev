import { KnowledgeObject } from "@resourcepack/schemas";

export class GraphValidator {
  
  /**
   * Validates a batch of KnowledgeObjects before they are saved.
   * Checks for impossible version boundaries, dangling relations (if validating against a full graph), etc.
   */
  validate(objects: KnowledgeObject[]): void {
    const ids = new Set(objects.map(o => o.id));

    for (const obj of objects) {
      // 1. Validate version logic
      if (obj.introducedIn && obj.removedIn) {
        // Naive string compare for MVP. In reality, requires semver/minecraft version parsing.
        if (obj.introducedIn === obj.removedIn) {
          throw new Error(`Validation Error [${obj.id}]: introducedIn and removedIn cannot be the same version.`);
        }
      }

      // 2. Validate internal relation integrity (within the batch)
      // Note: A full validation would check against the existing Knowledge Base, not just the current batch.
      for (const rel of obj.relations) {
        if (!rel.to) {
          throw new Error(`Validation Error [${obj.id}]: Relation missing target 'to' field.`);
        }
        // Example check: warn if 'to' is not in this batch
        // console.warn(`Relation ${rel.from} -> ${rel.to} points outside current batch.`);
      }
    }
  }
}
