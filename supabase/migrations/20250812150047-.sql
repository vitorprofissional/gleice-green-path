-- Fix function search path security issue
-- Update the has_role function to set a secure search_path
CREATE OR REPLACE FUNCTION public.has_role(check_role user_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = check_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = '';