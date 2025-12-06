/**
 * This file implements a *magic* catch-all route that renders the Puck editor.
 *
 * This route exposes /puck/[...puckPath], but is disabled by middleware.ts. The middleware
 * then rewrites all URL requests ending in `/edit` to this route, allowing you to visit any
 * page in your application and add /edit to the end to spin up a Puck editor.
 *
 * This approach enables public pages to be statically rendered whilst the /puck route can
 * remain dynamic.
 *
 * NB this route is public, and you will need to add authentication
 */

import "@measured/puck/puck.css";
import { Client } from "../../puck/client";
import { getPage } from "../../lib/get-page";
import { GetServerSideProps } from "next";
import type { Data } from "@measured/puck";
import Head from "next/head";

interface PuckEditorProps {
  path: string;
  data: Partial<Data>;
}

export default function PuckEditor({ path, data }: PuckEditorProps) {
  return (
    <>
      <Head>
        <title>Puck Editor: {path}</title>
      </Head>
      <Client path={path} data={data || {}} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PuckEditorProps> = async (
  context
) => {
  const { puckPath = [] } = context.params as { puckPath?: string[] };
  const path = `/${puckPath.join("/")}`;
  const data = getPage(path);

  return {
    props: {
      path,
      data: data || {},
    },
  };
};
