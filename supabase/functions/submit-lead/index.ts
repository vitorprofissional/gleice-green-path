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

async function insertToGoogleSheets(leadData: LeadData): Promise<any> {
  try {
    const sheetId = Deno.env.get('GOOGLE_SHEET_ID');
    const webAppUrl = Deno.env.get('GOOGLE_APPS_SCRIPT_URL'); // Optional: Google Apps Script Web App URL
    
    if (!sheetId) {
      throw new Error('Missing GOOGLE_SHEET_ID');
    }

    // Prepare data for Google Sheets
    const currentDate = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo'
    });

    console.log('Attempting to add to Google Sheets:', {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      date: currentDate,
      sheetId: sheetId
    });

    // Method 1: Use Google Apps Script Web App (if configured)
    if (webAppUrl) {
      console.log('Using Google Apps Script Web App method');
      
      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'addLead',
          data: {
            name: leadData.name,
            email: leadData.email,
            phone: leadData.phone,
            date: currentDate
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Google Apps Script error:', errorText);
        throw new Error(`Google Apps Script error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Successfully added via Google Apps Script:', result);
      return result;
    }

    // Method 2: Use direct API approach (requires proper credentials setup)
    console.log('Google Apps Script URL not configured, skipping Google Sheets integration');
    return { status: 'skipped', reason: 'No Google Apps Script URL configured' };
    
  } catch (error) {
    console.error('Error inserting to Google Sheets:', error);
    throw error;
  }
}

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

    // Try to insert into Google Sheets (secondary storage)
    let googleSheetsResult = null;
    try {
      console.log('Attempting Google Sheets integration for:', leadData);
      googleSheetsResult = await insertToGoogleSheets(leadData);
      console.log('Google Sheets integration result:', googleSheetsResult);
    } catch (googleError) {
      console.error('Google Sheets insertion failed (non-critical):', googleError);
      // Don't fail the entire request if Google Sheets fails
      googleSheetsResult = { status: 'error', message: googleError.message };
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: supabaseData,
        googleSheets: googleSheetsResult ? 'success' : 'pending_setup'
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