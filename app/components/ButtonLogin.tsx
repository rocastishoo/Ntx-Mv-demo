import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "@remix-run/react";
import type { SupabaseClient, Session } from "@supabase/supabase-js";
import type { OutletContextType } from "../root"; // Import context type from root

interface ButtonLoginProps {
  className?: string;
}

const ButtonLogin: React.FC<ButtonLoginProps> = ({ className = "" }) => {
  // Use state to hold the current session, starts as null
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  // Get the Supabase client from the context provided by root.tsx
  const { supabase } = useOutletContext<OutletContextType>();

  useEffect(() => {
    // Only get the initial session state on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false); // Set loading to false after fetching
    });
  }, [supabase]); // Dependency array includes supabase

  // Optionally, handle the loading state (e.g., show nothing or a spinner)
  if (isLoading) {
    return null; // Or return a placeholder/spinner
  }

  // Decide text based on the initial session state
  const buttonText = session ? "Log In" : "Sign Up/In";
  const linkTo = "/login"; // Always link to the login page which handles sign-up too

  return (
    <Link to={linkTo} className={`btn btn-primary ${className}`}>
      {buttonText}
    </Link>
  );
};

export default ButtonLogin;
