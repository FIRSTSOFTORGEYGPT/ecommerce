import type { Data } from "@measured/puck";
import fs from "fs";
import path from "path";

const databasePath = path.resolve(process.cwd(), "database.json");

type DatabaseEntry = {
    path: string;
    data: Data;
};

type Database = {
    pages: DatabaseEntry[];
};

/**
 * Get page data from the database by path
 * This function is used both server-side and client-side
 */
export function getPage(pagePath: string): Data | null {
    try {
        // Check if we're on the server
        if (typeof window === "undefined") {
            if (!fs.existsSync(databasePath)) {
                return null;
            }
            const content = fs.readFileSync(databasePath, "utf-8");
            const database: Database = JSON.parse(content);
            const page = database.pages.find((p) => p.path === pagePath);
            return page?.data || null;
        }
        return null;
    } catch (error) {
        console.error("Error reading page:", error);
        return null;
    }
}
