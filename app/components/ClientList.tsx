import { Link, Form } from "@remix-run/react";
import { useState } from "react";

// Define the client type
type Client = {
  id: string;
  client_name: string;
};

// Define the props for ClientList
interface ClientListProps {
  clients: Client[];
}

export default function ClientList({ clients = [] }: ClientListProps) {
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");

  const startEditing = (client: Client) => {
    setEditingClientId(client.id);
    setEditedName(client.client_name);
  };

  const cancelEditing = () => {
    setEditingClientId(null);
    setEditedName("");
  };

  return (
    <div className="mt-8">
      <h3 className="font-semibold text-xl mb-4">Your Clients</h3>

      {clients.length === 0 ? (
        <p className="text-gray-500">No clients found. Create one above!</p>
      ) : (
        <ul className="w-full space-y-2">
          {clients.map((client) => (
            <li
              key={client.id}
              className="flex flex-row items-center justify-between px-4 py-3 rounded-lg bg-base-100 shadow"
            >
              {editingClientId === client.id ? (
                <div className="flex-grow flex gap-2 items-center">
                  <input type="hidden" name="_action" value="update" />
                  <input type="hidden" name="clientId" value={client.id} />
                  <input
                    type="text"
                    name="clientName"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="input input-bordered input-sm flex-grow"
                    autoFocus
                    // For the demo, let's keep it readOnly to prevent actual edits
                    // that aren't implemented.
                    readOnly
                  />
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      aria-label="Save changes"
                      onClick={() =>
                        alert("Edit functionality disabled for demo")
                      }
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-ghost"
                      aria-label="Cancel editing"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Client name as a link */}
                  <Link
                    to={`/client/${encodeURIComponent(client.client_name)}`}
                    className="flex-grow text-gray-700 hover:text-primary transition-colors"
                  >
                    {client.client_name}
                  </Link>

                  {/* Actions container */}
                  <div className="flex items-center gap-3 ml-2">
                    {/* Edit button */}
                    <button
                      type="button"
                      className="btn btn-sm btn-ghost text-gray-500 hover:text-gray-700"
                      aria-label={`Edit ${client.client_name}`}
                      onClick={() => startEditing(client)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"
                        />
                      </svg>
                    </button>

                    {/* Delete button */}
                    {/* The Form part is removed for demo as actions are alerts */}
                    <button
                      type="button"
                      className="btn btn-sm btn-ghost text-red-500 hover:text-red-700 hover:bg-red-100"
                      aria-label={`Delete ${client.client_name}`}
                      onClick={() => {
                        alert("Delete functionality disabled for demo");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
