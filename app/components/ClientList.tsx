import { Link, useOutletContext, Form } from "@remix-run/react";
import { useState, useEffect } from "react";

// Define the client type
type Client = {
  id: string;
  client_name: string;
};

// Define the context type
type ClientListContextType = {
  clients: Client[];
};

export default function ClientList() {
  // Get clients from the outlet context
  const { clients } = useOutletContext<ClientListContextType>();
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");

  // Reset editing state when clients data changes (after form submission)
  useEffect(() => {
    setEditingClientId(null);
    setEditedName("");
  }, [clients]);

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
      <h3 className="font-medium text-lg mb-2">Your Clients</h3>

      {clients.length === 0 ? (
        <p className="text-gray-500">No clients found. Create one above!</p>
      ) : (
        <ul className="w-full">
          {clients.map((client) => (
            <li
              key={client.id}
              className="flex flex-row items-center px-4 py-2 rounded-box bg-base-100 mb-2"
            >
              <div className="flex w-full justify-between items-center">
                {editingClientId === client.id ? (
                  <Form
                    method="post"
                    action="/dashboard"
                    className="flex-grow flex gap-2 items-center"
                  >
                    <input type="hidden" name="_action" value="update" />
                    <input type="hidden" name="clientId" value={client.id} />
                    <input
                      type="text"
                      name="clientName"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="input input-bordered input-sm flex-grow"
                      autoFocus
                      required
                    />
                    <div className="flex gap-1">
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary"
                        aria-label="Save changes"
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
                  </Form>
                ) : (
                  <>
                    {/* Client name as a link with its own hover effect */}
                    <Link
                      to={`/client/${client.id}`}
                      className="flex-grow hover:bg-base-200 px-3 py-2 rounded-md transition-colors"
                    >
                      {client.client_name}
                    </Link>

                    {/* Actions container */}
                    <div className="flex gap-2 ml-2">
                      {/* Edit button with its own hover effect */}
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost"
                        aria-label={`Edit ${client.client_name}`}
                        onClick={() => startEditing(client)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"
                          />
                        </svg>
                      </button>

                      {/* Delete button with its own hover effect */}
                      <Form method="post" action="/dashboard">
                        <input type="hidden" name="_action" value="delete" />
                        <input
                          type="hidden"
                          name="clientId"
                          value={client.id}
                        />
                        <button
                          type="submit"
                          className="btn btn-sm btn-error btn-outline"
                          aria-label={`Delete ${client.client_name}`}
                          onClick={(e) => {
                            if (
                              !confirm(
                                `Are you sure you want to delete ${client.client_name}?`
                              )
                            ) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Delete
                        </button>
                      </Form>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
