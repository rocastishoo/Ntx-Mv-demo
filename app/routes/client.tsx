import { Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/supabaseClient";
import Header from "~/components/Header";

// Define a type for our loader data for better type safety in the component
interface ClientLayoutLoaderData {
  userInitial: string;
  clients: Array<{ id: string; client_name: string }>;
  currentClientName: string;
}

// Updated loader return type for simplicity with json helper
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  console.log(
    "Client.tsx LOADER EXECUTED - Using getUser() and fetching profile"
  );
  const { supabase, headers } = createSupabaseServerClient(request);

  // Use supabase.auth.getUser() for server-side authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    // Check for error or no user
    console.error(
      "Authentication error or no user in client.tsx using getUser():",
      authError
    );
    // It's important to pass original headers for Supabase to manage cookies correctly, especially on redirect
    return redirect("/login", { headers });
  }

  // User is authenticated and user object is fresh
  let userInitial = "?"; // Default initial

  // Fetch from profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("first_name") // Select only the first_name column
    .eq("id", user.id) // Assuming the column linking to auth.users.id is named 'id'
    .single(); // Expecting a single row or null

  if (profileError) {
    console.error("Error fetching profile:", profileError.message);
    // Decide if this error should redirect or just use fallback initial. For now, fallback.
  }

  if (profile && profile.first_name && typeof profile.first_name === "string") {
    userInitial = profile.first_name.charAt(0).toUpperCase();
  } else if (user.email) {
    // Fallback to email if profile/first_name not found
    userInitial = user.email.charAt(0).toUpperCase();
  }

  // Fetch the client list for this user
  const { data: clients, error: clientsError } = await supabase
    .from("clients")
    .select("id, client_name")
    .eq("user_id", user.id);

  if (clientsError) {
    console.error("Error fetching clients:", clientsError.message);
  }

  // Get the client ID from the URL
  const clientId = params.clientId;
  let currentClientName = "Select Client";

  // If we have a client ID in the URL, find the corresponding client name
  if (clientId && clients && clients.length > 0) {
    const currentClient = clients.find((client) => client.id === clientId);
    if (currentClient) {
      currentClientName = currentClient.client_name;
    }
  }

  // It's important to pass original headers for Supabase to manage cookies correctly
  return json<ClientLayoutLoaderData>(
    {
      userInitial,
      clients: clients || [],
      currentClientName,
    },
    { headers }
  );
};

// This component serves as the layout for /client and its children
export default function ClientLayout() {
  // useLoaderData will infer the type from the loader's return if json is typed, or we can assert
  const { userInitial, clients, currentClientName } =
    useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <Header
        userInitial={userInitial}
        clients={clients}
        currentClientName={currentClientName}
        className="flex-shrink-0"
      />
      {/* This main area will render child routes */}
      <main className="flex flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
