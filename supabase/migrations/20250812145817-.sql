-- Remove the overly permissive policy that allows any authenticated user to view all leads
DROP POLICY "Allow authenticated users to view all leads" ON public.gleice_leads;

-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'staff', 'user');

-- Create user_roles table for role-based access control
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(check_role user_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = check_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create secure policy for gleice_leads that only allows admin and staff access
CREATE POLICY "Allow admins and staff to view leads" 
ON public.gleice_leads 
FOR SELECT 
TO authenticated
USING (
  public.has_role('admin'::user_role) OR 
  public.has_role('staff'::user_role)
);

-- Create policy for admins to manage leads
CREATE POLICY "Allow admins to manage leads" 
ON public.gleice_leads 
FOR ALL 
TO authenticated
USING (public.has_role('admin'::user_role))
WITH CHECK (public.has_role('admin'::user_role));

-- Note: After deployment, you'll need to assign admin role to your user:
-- INSERT INTO public.user_roles (user_id, role) 
-- VALUES ('your-actual-user-id'::uuid, 'admin'::user_role);