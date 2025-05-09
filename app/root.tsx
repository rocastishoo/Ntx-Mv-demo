import { useEffect, useState } from "react";
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import tailwindStyles from "./tailwind.css?url";
import { createSupabaseServerClient, supabase } from "./supabaseClient";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export type OutletContextType = {
  supabase: SupabaseClient<any, "public", any>;
};

export const meta: MetaFunction = () => {
  return [
    { title: "NextMove - Your Business Growth Partner" },
    {
      name: "description",
      content: "Turn visitors into customers with our powerful platform",
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: tailwindStyles },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const env = {
    SUPABASE_URL: process.env.VITE_PUBLIC_SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.VITE_PUBLIC_SUPABASE_ANON_KEY!,
  };

  const { supabase, headers } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return json(
    {
      env,
      user,
    },
    {
      headers,
    }
  );
};

export default function App() {
  const { env, user } = useLoaderData<typeof loader>();
  const { revalidate } = useRevalidator();

  const [supabaseClient] = useState(() => supabase);

  const serverUserId = user?.id;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session?.user?.id !== serverUserId) {
        revalidate();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverUserId, revalidate, supabaseClient]);

  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet
          context={{ supabase: supabaseClient } satisfies OutletContextType}
        />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
