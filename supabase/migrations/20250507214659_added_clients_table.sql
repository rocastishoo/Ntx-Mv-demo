-- Create the clients table
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    client_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view only their own clients
CREATE POLICY "Users can view their own clients" 
    ON public.clients 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own clients
CREATE POLICY "Users can create clients" 
    ON public.clients 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own clients
CREATE POLICY "Users can update their own clients" 
    ON public.clients 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own clients
CREATE POLICY "Users can delete their own clients" 
    ON public.clients 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Add an index to improve query performance
CREATE INDEX clients_user_id_idx ON public.clients(user_id);
