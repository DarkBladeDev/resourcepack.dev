import { KnowledgeObject } from "@resourcepack/schemas";
export declare class GraphValidator {
    /**
     * Validates a batch of KnowledgeObjects before they are saved.
     * Checks for impossible version boundaries, dangling relations (if validating against a full graph), etc.
     */
    validate(objects: KnowledgeObject[]): void;
}
