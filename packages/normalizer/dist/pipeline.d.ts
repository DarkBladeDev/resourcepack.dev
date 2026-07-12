export declare function runPipeline(): Promise<{
    type: "Asset" | "Concept" | "Tutorial" | "Collection";
    description: string;
    id: string;
    title: string;
    introducedIn: string;
    tags: string[];
    namespaces: string[];
    relations: {
        type: "depends_on" | "uses" | "extends" | "parent_of" | "child_of" | "implements" | "related";
        from: string;
        to: string;
    }[];
    changes: {
        version: string;
        type: "added" | "modified" | "deprecated" | "removed";
        description: string;
    }[];
    deprecatedIn?: string | undefined;
    removedIn?: string | undefined;
    difficulty?: "Beginner" | "Intermediate" | "Advanced" | undefined;
    verification?: {
        level: "official" | "inferred" | "community";
        confidence: number;
    } | undefined;
}[]>;
