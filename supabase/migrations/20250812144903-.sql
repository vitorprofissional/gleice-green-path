-- Remove the overly permissive policy that allows any authenticated user to view all leads
DROP POLICY "Allow authenticated users to view all leads" ON public.gleice_leads;

-- Create a more secure policy that only allows specific authorized users to view leads
-- For now, we'll create a policy that can be updated with specific user IDs
-- You should replace 'your-admin-user-id-here' with actual admin user IDs
CREATE POLICY "Allow only authorized users to view leads" 
ON public.gleice_leads 
FOR SELECT 
TO authenticated
USING (
  -- Only allow specific admin users to view leads
  -- Replace these UUIDs with actual admin user IDs from auth.users
  auth.uid() IN (
    -- Add your admin user IDs here
    -- Example: '123e4567-e89b-12d3-a456-426614174000'::uuid
  )
);

-- Alternative: Create a function to check if user is admin (commented out for now)
-- This approach would require a user_roles table or admin flag
/*
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  -- This function should check if the current user is an admin
  -- Implementation depends on your user management system
  RETURN false; -- Placeholder - implement your admin check logic
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Allow only admins to view leads" 
ON public.gleice_leads 
FOR SELECT 
TO authenticated
USING (public.is_admin_user());
*/