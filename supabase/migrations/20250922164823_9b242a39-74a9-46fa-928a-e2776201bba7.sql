-- Create table for storing Green Card consultation leads
CREATE TABLE public.gleice_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gleice_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to insert leads (for the form submission)
CREATE POLICY "Allow anonymous inserts for lead capture" 
ON public.gleice_leads 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Create policy to allow authenticated admins to view all leads
CREATE POLICY "Admins can view all leads" 
ON public.gleice_leads 
FOR SELECT 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gleice_leads_updated_at
BEFORE UPDATE ON public.gleice_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for better performance on email lookups
CREATE INDEX idx_gleice_leads_email ON public.gleice_leads(email);
CREATE INDEX idx_gleice_leads_created_at ON public.gleice_leads(created_at DESC);