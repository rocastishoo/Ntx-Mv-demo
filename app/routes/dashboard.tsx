import { Outlet } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
// ClientList import might not be needed here anymore if not used directly
// import ClientList from "~/components/ClientList";
// import { createSupabaseServerClient } from "~/supabaseClient"; // Removed
// import { getUser } from "~/auth"; // Removed
// import CreateClientForm from "~/components/CreateClientForm"; // Removed for now

// Removed loader function

export async function action({ request }: ActionFunctionArgs) {
  console.log("Dashboard layout action triggered"); // Updated log message
  const formData = await request.formData();
  const clientName = formData.get("clientName");

  console.log("Received clientName:", clientName);
  console.log("Type of clientName:", typeof clientName);

  if (typeof clientName === "string" && clientName.trim() !== "") {
    const trimmedName = clientName.trim();
    console.log(
      "Redirecting to:",
      `/client/${encodeURIComponent(trimmedName)}`
    );
    return redirect(`/client/${encodeURIComponent(trimmedName)}`);
  }

  console.log("Condition for redirect not met. clientName:", clientName);
  return null; // Or handle error appropriately
}

export default function DashboardSegment() {
  // const { user, clients, error } = useLoaderData<typeof loader>(); // Removed
  // const clients = mockClients; // This instance of clients is no longer directly used here
  const user = null; // Provide null or mock user
  const error = null; // Provide null or mock error

  // if (error) {
  //   return (
  //     <div className="text-red-500 p-4">
  //       <p>Error loading dashboard data: {error}</p>
  //     </div>
  //   );
  // }

  // console.log("User in DashboardSegment:", user);
  // console.log("Clients in DashboardSegment:", clients);

  return (
    <div className="p-4 md:p-6">
      {/* <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Client Dashboard
      </h1> */}
      {/* Display welcome message or user info if available */}
      {/* {user && (
        <p className="text-gray-600 mb-4">
          Welcome, {user.email || "User"}!
        </p>
      )} */}
      {/* The form and ClientList are removed from here */}
      {/* They will be rendered by dashboard._index.tsx via the Outlet */}
      <Outlet /> {/* Important: This renders nested routes */}
    </div>
  );
}
