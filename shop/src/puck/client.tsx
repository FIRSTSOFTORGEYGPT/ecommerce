"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "./puck.config";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
    return (
        <Puck
            config={config}
            data={data}
            onPublish={async (data) => {
                await fetch("/api/puck", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ data, path }),
                });

                // Show success message
                alert(`Page published successfully! Visit ${path} to see your changes.`);
            }}
        />
    );
}
