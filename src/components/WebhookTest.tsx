import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function WebhookTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleTestWebhook = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('test-webhook', {
        body: {}
      });

      if (error) {
        throw error;
      }

      setResult(data);
      
      if (data.success) {
        toast({
          title: "Teste enviado com sucesso!",
          description: "O webhook recebeu os dados de teste.",
        });
      } else {
        toast({
          title: "Erro no teste",
          description: data.error || "Falha ao enviar teste para o webhook.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error testing webhook:', error);
      toast({
        title: "Erro",
        description: "Erro ao testar o webhook",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Teste do Webhook</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleTestWebhook} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Enviando teste...' : 'Enviar Teste para Webhook'}
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Resultado do Teste:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}