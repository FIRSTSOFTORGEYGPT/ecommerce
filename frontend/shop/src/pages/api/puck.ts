import type { NextApiRequest, NextApiResponse } from "next";
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

// Helper to read database
function readDatabase(): Database {
    try {
        if (!fs.existsSync(databasePath)) {
            return { pages: [] };
        }
        const content = fs.readFileSync(databasePath, "utf-8");
        return JSON.parse(content);
    } catch (error) {
        console.error("Error reading database:", error);
        return { pages: [] };
    }
}

// Helper to write database
function writeDatabase(database: Database): void {
    try {
        fs.writeFileSync(databasePath, JSON.stringify(database, null, 2), "utf-8");
    } catch (error) {
        console.error("Error writing database:", error);
        throw error;
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { data, path: pagePath } = req.body as {
            data: Data;
            path: string;
        };

        if (!data || !pagePath) {
            return res.status(400).json({ error: "Missing data or path" });
        }

        const database = readDatabase();

        // Find existing page or create new entry
        const existingPageIndex = database.pages.findIndex(
            (page) => page.path === pagePath
        );

        if (existingPageIndex >= 0) {
            // Update existing page
            database.pages[existingPageIndex].data = data;
        } else {
            // Add new page
            database.pages.push({ path: pagePath, data });
        }

        writeDatabase(database);

        // Revalidate the page if using ISR (optional for Pages Router)
        // Note: This requires the page to be set up with getStaticProps and revalidate
        try {
            await res.revalidate(pagePath);
        } catch (revalidateError) {
            console.warn("Revalidation not available or failed:", revalidateError);
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error saving page:", error);
        return res.status(500).json({ error: "Failed to save page" });
    }
}
