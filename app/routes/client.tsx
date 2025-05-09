import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node"; // Removed redirect as it's not used now
import Header from "~/components/Header"; // Assuming Header.tsx is in app/components/

// Define a type for our loader data
interface ClientLayoutLoaderData {
  userInitial: string;
  clients: Array<{ id: string; client_name: string }>;
  currentClientName: string;
}

// Mock data for clients, similar to dashboard
const mockAvailableClients = [
  { id: "1", client_name: "Elisa Garcia" },
  { id: "2", client_name: "Bad Bunny" },
  { id: "3", client_name: "John Doe" }, // Added another for variety
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const clientNameFromUrl = params.clientId; // This will be the client's name
  let currentClientName = "Client Details"; // Default

  if (
    typeof clientNameFromUrl === "string" &&
    clientNameFromUrl.trim() !== ""
  ) {
    currentClientName = decodeURIComponent(clientNameFromUrl.trim());
  } else {
    // If no client name in URL (e.g. navigating to /client directly, though not typical for this page)
    // you might redirect or select a default. For now, stick with a generic title or first client.
    // currentClientName = mockAvailableClients.length > 0 ? mockAvailableClients[0].client_name : "Select Client";
  }

  // For the demo, userInitial is hardcoded.
  const userInitial = "R"; // Example initial

  // The clients list for the header dropdown
  const clientsForHeader = mockAvailableClients;

  return json<ClientLayoutLoaderData>({
    userInitial,
    clients: clientsForHeader,
    currentClientName,
  });
};

export default function ClientLayout() {
  const { userInitial, clients, currentClientName } =
    useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <Header
        userInitial={userInitial}
        clients={clients}
        currentClientName={currentClientName}
        className="flex-shrink-0" // Ensures header doesn't grow
      />
      <main className="flex flex-1 overflow-hidden">
        {" "}
        {/* Ensures main content takes remaining space and handles overflow */}
        <Outlet />
      </main>
    </div>
  );
}
