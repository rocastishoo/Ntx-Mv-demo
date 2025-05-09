import { SupabaseClient } from "@supabase/supabase-js";

export async function signInWithEmail(
  supabase: SupabaseClient,
  email: string,
  firstName: string
) {
  // Added email parameter
  // Determine the base URL based on NODE_ENV and the domain from the environment variable
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? `http://${import.meta.env.VITE_PUBLIC_MY_DOMAIN}` //  local
      : `https://${import.meta.env.VITE_PUBLIC_MY_DOMAIN}`; //  production

  const redirectPath = "/dashboard";

  const redirectUrl = `${baseUrl}${redirectPath}`;

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email, // Use the email passed to the function
    options: {
      shouldCreateUser: true, // Set to true if you want new users to sign up
      emailRedirectTo: redirectUrl, // Use the dynamically determined URL
      data: {
        full_name: firstName, // Use 'full_name' for Display Name
      },
    },
  });

  if (error) {
    console.error("Error sending magic link:", error.message);
    // Re-throw or handle appropriately for the action function
    throw error;
  } else {
    console.log("Magic link sent. Check your email.");
    // Return data or success indication if needed
    return data;
  }
}
