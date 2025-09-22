import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    console.log('Sending test to webhook...');

    // Test data
    const testData = {
      name: "Teste Webhook",
      email: "teste@example.com",
      phone: "+55 11 99999-9999",
      timestamp: new Date().toISOString(),
      source: 'webhook-test'
    };

    // Send to webhook
    const webhookResponse = await fetch('https://autovmd-n8n.7hn4wr.easypanel.host/webhook/cadastro-lp-gleice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('Webhook response status:', webhookResponse.status);
    
    let webhookResult;
    try {
      const responseText = await webhookResponse.text();
      console.log('Webhook response text:', responseText);
      
      if (responseText) {
        webhookResult = JSON.parse(responseText);
      } else {
        webhookResult = { status: 'no_content' };
      }
    } catch (parseError) {
      console.log('Could not parse webhook response as JSON:', parseError);
      webhookResult = { status: 'non_json_response' };
    }

    if (webhookResponse.ok) {
      console.log('Webhook test successful!');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Webhook test sent successfully',
          webhookStatus: webhookResponse.status,
          webhookResponse: webhookResult,
          testData: testData
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    } else {
      console.error('Webhook test failed with status:', webhookResponse.status);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Webhook test failed',
          webhookStatus: webhookResponse.status,
          webhookResponse: webhookResult,
          testData: testData
        }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

  } catch (error) {
    console.error('Error in test-webhook function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error', 
        details: error.message 
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});