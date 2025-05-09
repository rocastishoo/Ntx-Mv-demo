import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { createSupabaseServerClient } from "~/supabaseClient";

// The loader function for the dashboard segment (layout and its children)
export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log(
    "Dashboard.tsx LOADER EXECUTED - Checking authentication for segment"
  );
  // Create a Supabase client instance for this request
  const { supabase, headers } = createSupabaseServerClient(request);

  // Get the user session
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error(
      "Authentication error or no user in dashboard layout loader:",
      authError
    );
    // If no user or an error, redirect to the login page.
    // Pass the request headers for Supabase to manage cookies correctly.
    return redirect("/login", { headers });
  }

  // Fetch the clients for this user
  const { data: clients, error: clientsError } = await supabase
    .from("clients")
    .select("id, client_name")
    .eq("user_id", user.id);

  if (clientsError) {
    console.error("Error fetching clients:", clientsError);
    // Return an empty array if there was an error
    return json({ clients: [] }, { headers });
  }

  // Return the clients data
  return json({ clients }, { headers });
};

// Action function to handle client creation and deletion
export const action = async ({ request }: ActionFunctionArgs) => {
  // Create a Supabase client instance for this request
  const { supabase, headers } = createSupabaseServerClient(request);

  // Verify authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error(
      "Authentication error or no user in dashboard action:",
      authError
    );
    return redirect("/login", { headers });
  }

  // Get form data
  const formData = await request.formData();
  const actionType = formData.get("_action");

  // Handle client deletion
  if (actionType === "delete") {
    const clientId = formData.get("clientId");

    // Validate client ID
    if (!clientId || typeof clientId !== "string") {
      return json({ error: "Missing client ID" }, { status: 400, headers });
    }

    // Authorization check - verify the client belongs to the user
    const { data: clientData, error: authCheckError } = await supabase
      .from("clients")
      .select("id")
      .eq("id", clientId)
      .eq("user_id", user.id)
      .single();

    if (authCheckError || !clientData) {
      return json(
        {
          error: "Client not found or you do not have permission to delete it",
        },
        { status: 404, headers }
      );
    }

    // Delete the client
    const { error: deleteError } = await supabase
      .from("clients")
      .delete()
      .eq("id", clientId);

    if (deleteError) {
      console.error("Error deleting client:", deleteError);
      return json({ error: deleteError.message }, { status: 500, headers });
    }

    // Redirect back to dashboard after successful deletion
    return redirect("/dashboard", { headers });
  }
  // Handle client update
  else if (actionType === "update") {
    const clientId = formData.get("clientId");
    const clientName = formData.get("clientName");

    // Validate inputs
    if (!clientId || typeof clientId !== "string") {
      return json({ error: "Missing client ID" }, { status: 400, headers });
    }

    if (
      !clientName ||
      typeof clientName !== "string" ||
      clientName.trim() === ""
    ) {
      return json(
        { error: "Client name is required" },
        { status: 400, headers }
      );
    }

    // Authorization check - verify the client belongs to the user
    const { data: clientData, error: authCheckError } = await supabase
      .from("clients")
      .select("id")
      .eq("id", clientId)
      .eq("user_id", user.id)
      .single();

    if (authCheckError || !clientData) {
      return json(
        {
          error: "Client not found or you do not have permission to update it",
        },
        { status: 404, headers }
      );
    }

    // Update the client name
    const { error: updateError } = await supabase
      .from("clients")
      .update({ client_name: clientName.trim() })
      .eq("id", clientId);

    if (updateError) {
      console.error("Error updating client:", updateError);
      return json({ error: updateError.message }, { status: 500, headers });
    }

    // Redirect back to dashboard after successful update
    return redirect("/dashboard", { headers });
  }
  // Handle client creation (existing functionality)
  else {
    const clientName = formData.get("clientName");

    // Validate client name
    if (
      !clientName ||
      typeof clientName !== "string" ||
      clientName.trim() === ""
    ) {
      return json(
        { error: "Client name is required" },
        { status: 400, headers }
      );
    }

    // Insert new client into database
    const { data: newClient, error: insertError } = await supabase
      .from("clients")
      .insert({ user_id: user.id, client_name: clientName.trim() })
      .select("id")
      .single();

    if (insertError) {
      console.error("Error creating client:", insertError);
      return json(
        { error: "Failed to create client" },
        { status: 500, headers }
      );
    }

    // Redirect to the new client page
    return redirect(`/client/${newClient.id}`, { headers });
  }
};

// The default component for the layout route
// It renders an <Outlet /> where the matching child route will be displayed
export default function DashboardLayout() {
  const { clients } = useLoaderData<typeof loader>();

  return <Outlet context={{ clients }} />;
}
