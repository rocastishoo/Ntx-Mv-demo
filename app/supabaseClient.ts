import {
  createBrowserClient,
  createServerClient,
  parse,
  serialize,
} from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL and Anon Key environment variables are not set. Check your .env file."
  );
}

/**
 * Creates a Supabase client for server-side operations.
 * Handles cookie getting/setting and returns headers to be merged into the Remix response.
 */
export const createSupabaseServerClient = (request: Request) => {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = new Headers();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(key) {
        return cookies[key];
      },
      set(key, value, options) {
        headers.append("Set-Cookie", serialize(key, value, options));
      },
      remove(key, options) {
        headers.append("Set-Cookie", serialize(key, "", options));
      },
    },
  });

  // Return both the client and the headers
  // The headers must be merged into the Response object returned by the loader/action
  return { supabase, headers };
};

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Type helper for loader/action return values
export type SupabaseOutletContext = {
  supabase: SupabaseClient;
};
