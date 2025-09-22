import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  name: string;
  email: string;
  phone: string;
}

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);


serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      });
    }

    const leadData: LeadData = await req.json();
    
    // Validate required fields
    if (!leadData.name || !leadData.email || !leadData.phone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, phone' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Processing lead submission:', leadData);

    // Insert into Supabase (primary storage)
    const { data: supabaseData, error: supabaseError } = await supabase
      .from('gleice_leads')
      .insert([leadData])
      .select();

    if (supabaseError) {
      console.error('Supabase insertion error:', supabaseError);
      return new Response(
        JSON.stringify({ error: 'Failed to save lead data', details: supabaseError.message }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Successfully inserted to Supabase:', supabaseData);

    // Trigger webhook after successful database insertion
    try {
      console.log('Triggering webhook for lead:', leadData);
      const webhookResponse = await fetch('https://autovmd-n8n.7hn4wr.easypanel.host/webhook/cadastro-lp-gleice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...leadData,
          timestamp: new Date().toISOString(),
          source: 'green-card-landing'
        }),
      });

      if (webhookResponse.ok) {
        console.log('Webhook triggered successfully');
      } else {
        console.error('Webhook failed with status:', webhookResponse.status);
      }
    } catch (webhookError) {
      console.error('Webhook call failed (non-critical):', webhookError);
      // Don't fail the entire request if webhook fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: supabaseData
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error in submit-lead function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});