import { useState } from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import {
  json,
  redirect,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { signInWithEmail } from "../auth"; // Assuming auth.ts is in the app directory
import { createSupabaseServerClient } from "../supabaseClient"; // Import server client creator

// Loader function to check if user is already logged in
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase, headers } = createSupabaseServerClient(request);
  const { data } = await supabase.auth.getUser();
  console.log("User data from login loader:", data);

  // If user is already authenticated, redirect them to the dashboard
  if (data.user) {
    return redirect("/dashboard", { headers });
  }

  // If user is not logged in, allow rendering the login page
  // We must return the headers for the set-cookie to happen
  return json({}, { headers });
};

// Action function to handle form submission
export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createSupabaseServerClient(request);
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;

  if (!email || !firstName) {
    return json(
      { error: "Email and First Name are required." },
      { status: 400, headers }
    );
  }

  try {
    await signInWithEmail(supabase, email, firstName);
    return json(
      { success: "Check your email for the magic link!" },
      { headers }
    );
  } catch (error: any) {
    console.error("Sign in error:", error);
    return json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500, headers }
    );
  }
};

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          {/* Placeholder for logo */}
          <div className="text-2xl font-bold">Next Move</div>
        </figure>
        <div className="card-body items-center text-center">
          <Form method="post" className="w-full space-y-4">
            {/* First Name input */}
            <div>
              <label htmlFor="firstName" className="label justify-start">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            {/* Last Name input */}
            <div>
              <label htmlFor="lastName" className="label justify-start">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Cena"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            {/* Email input */}
            <div>
              <label htmlFor="email" className="label justify-start">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Use type guards to safely access properties */}
            {actionData && "error" in actionData && actionData.error && (
              <p className="text-error text-sm">{actionData.error}</p>
            )}
            {actionData && "success" in actionData && actionData.success && (
              <p className="text-success text-sm">{actionData.success}</p>
            )}

            <div className="card-actions justify-center w-full">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign in with Email"
                )}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
