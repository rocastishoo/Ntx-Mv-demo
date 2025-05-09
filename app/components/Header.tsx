import React from "react";
import { Link } from "@remix-run/react";

// Define client type
interface Client {
  id: string;
  client_name: string;
}

interface HeaderProps {
  userInitial?: string;
  className?: string;
  clients?: Client[];
  // Added prop for the currently viewed client's name
  currentClientName?: string;
}

const Header: React.FC<HeaderProps> = ({
  //default value
  userInitial = "A",
  className = "",
  clients = [],
  // Accept the new prop with a default value
  currentClientName = "Select Client",
}) => (
  <header
    className={`flex items-center justify-between px-6 py-2 bg-base-100 border-b border-base-200 ${className}`}
  >
    {/* Left side: App Icon and Client Name/Switcher */}
    <div className="flex items-center gap-3">
      <div className="rounded-full bg-black w-8 h-8 flex items-center justify-center">
        {/* Your SVG Icon */}
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white"
        >
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path
            d="M8 12c1.5-2 6.5-2 8 0"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {/* Client Name and Switcher Button */}
      {/* The dropdown structure remains, but displays the current client name */}
      <div className="dropdown dropdown-bottom">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-sm m-1 flex items-center gap-1"
        >
          {/* Display the current client name here */}
          <span className="text-lg font-medium">{currentClientName}</span>
          {/* Chevron icon */}
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
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        {/* Dropdown content: Client List */}
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-0"
        >
          {/* Map over the clients prop to display the list */}
          {clients.length > 0 ? (
            clients.map((client) => (
              <li key={client.id}>
                {/* Link to the specific client page */}
                <Link to={`/client/${client.id}`}>{client.client_name}</Link>
              </li>
            ))
          ) : (
            // Message when no clients are found
            <li>
              <span className="text-gray-500">No clients found</span>
            </li>
          )}
          {/* Link to create a new client */}
          <li className="menu-title pt-2">
            <Link to="/dashboard" className="text-primary font-medium">
              Create new client
            </Link>
          </li>
        </ul>
      </div>
    </div>

    {/* Right side: Home, Settings, User */}
    <div className="flex items-center gap-3">
      {/* Modified Share button to Home Link */}
      <Link to="/dashboard" className="btn btn-ghost btn-xs">
        Home
      </Link>
      <button className="btn btn-ghost btn-xs">Settings</button>
      {/* Avatar for User Initial */}
      <div className="rounded-full bg-neutral text-neutral-content w-8 h-8 flex items-center justify-center">
        <span className="text-md">{userInitial}</span>
      </div>
    </div>
  </header>
);

export default Header;
