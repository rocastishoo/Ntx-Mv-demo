import { useEffect, useState } from "react";
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  // useRevalidator, // Might not be needed if auth state changes are removed
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import tailwindStyles from "./tailwind.css?url";
// import { createSupabaseServerClient, supabase } from "./supabaseClient"; // Removed
// import type { SupabaseClient, User } from "@supabase/supabase-js"; // Removed

// export type OutletContextType = { // Removed or simplify if no context needed
//   supabase: SupabaseClient<any, "public", any>;
// };
export type OutletContextType = {}; // Simplified context

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
    // Keep these if your UI might still reference them, otherwise remove
    // SUPABASE_URL: process.env.VITE_PUBLIC_SUPABASE_URL!,
    // SUPABASE_ANON_KEY: process.env.VITE_PUBLIC_SUPABASE_ANON_KEY!,
  };

  // const { supabase, headers } = createSupabaseServerClient(request); // Removed
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser(); // Removed

  return json(
    {
      env,
      user: null, // No user data anymore
    }
    // { // Headers might not be needed if no Supabase client involved
    //   headers,
    // }
  );
};

export default function App() {
  const { env, user } = useLoaderData<typeof loader>(); // User will be null
  // const { revalidate } = useRevalidator(); // Removed if not used

  // const [supabaseClient] = useState(() => supabase); // Removed

  // const serverUserId = user?.id; // User is null, so this will be undefined

  // useEffect(() => { // Removed Supabase auth state listener
  //   const {
  //     data: { subscription },
  //   } = supabaseClient.auth.onAuthStateChange((event, session) => {
  //     if (session?.user?.id !== serverUserId) {
  //       revalidate();
  //     }
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [serverUserId, revalidate, supabaseClient]);

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
          context={
            {
              /* supabase: supabaseClient */
            } satisfies OutletContextType
          } // Removed supabase from context
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
