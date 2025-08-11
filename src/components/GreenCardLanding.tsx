import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const GreenCardLanding = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simular envio do formulário
    setTimeout(() => {
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Entraremos em contato em breve para agendar sua consultoria.",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const painPoints = [
    "Perdida em uma pilha de formulários e documentos que parecem não ter fim?",
    "Com medo de cometer um erro que possa levar à negação do seu sonho?",
    "Cansada de informações contraditórias que te deixam andando em círculos?",
    "Sozinha e sobrecarregada, sentindo que ninguém entende o peso que você carrega?",
    "Insegura até para conversar com seu noivo ou marido sobre os próximos passos?"
  ];

  const faqs = [
    {
      question: "Por que eu deveria fazer uma consultoria com você e não com um advogado?",
      answer: "Porque oferecemos um atendimento humano e acolhedor, focado em organizar seus passos de forma clara e simples, sem a frieza e os altos custos de um escritório tradicional. Nosso foco é te dar confiança e direcionamento prático."
    },
    {
      question: "O que exatamente acontece nessa sessão?",
      answer: "Em 30 minutos de conversa, vamos diagnosticar seu caso atual, identificar seus maiores bloqueios e criar um plano claro com 2-3 ações imediatas que você pode executar para destravar seu processo."
    },
    {
      question: "Essa sessão serve para mim se eu ainda não casei no civil?",
      answer: "Sim! Na verdade, é ainda melhor começar o planejamento antes do casamento civil. Assim você se prepara adequadamente e evita erros que podem custar tempo e dinheiro no futuro."
    },
    {
      question: "Qual o valor do investimento?",
      answer: "O investimento para a Sessão de Clareza é de apenas $70 - muito menos do que você gastaria em uma consulta jurídica tradicional, mas com um atendimento muito mais próximo e humanizado."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* SEÇÃO 1: Hook */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Para a mulher brasileira que se sente perdida, sobrecarregada e sozinha no processo do Green Card por casamento...
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Descubra em uma sessão de 30 minutos o plano exato para transformar a confusão em clareza e o medo em confiança, com alguém que já ajudou +100 pessoas como você.
              </p>
            </div>
            
            <Card className="p-8 border-2 border-primary/20">
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-bold text-center text-primary">
                  Agende sua Consultoria Gratuita
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input 
                      id="name"
                      {...register("name", { required: "Nome é obrigatório" })}
                      className="border-primary/30 focus:border-primary"
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email"
                      type="email"
                      {...register("email", { 
                        required: "E-mail é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "E-mail inválido"
                        }
                      })}
                      className="border-primary/30 focus:border-primary"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone/WhatsApp</Label>
                    <Input 
                      id="phone"
                      {...register("phone", { required: "Telefone é obrigatório" })}
                      className="border-primary/30 focus:border-primary"
                    />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Quero a consultoria!"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: A DOR */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-foreground">
            Você se sente assim?
          </h2>
          <div className="space-y-6 text-left max-w-3xl mx-auto">
            {painPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-4 bg-background p-6 rounded-lg shadow-sm">
                <Checkbox id={`pain-${index}`} className="mt-1 border-primary data-[state=checked]:bg-primary" />
                <label htmlFor={`pain-${index}`} className="text-lg leading-relaxed cursor-pointer">
                  {point}
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: A HISTÓRIA */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="/lovable-uploads/eea35aa1-010e-415d-a589-673fe11473c3.png" 
                alt="Gleice Oliveira - Especialista em Green Card"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Eu sei EXATAMENTE como você se sente... porque eu já estive aí.
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  "Olá, meu nome é Gleice. E eu não sou advogada.
                </p>
                <p>
                  Eu sou uma imigrante como você. Eu conheço o nó na garganta, as noites sem dormir e a ansiedade de querer construir uma vida digna ao lado de quem a gente ama.
                </p>
                <p>
                  Depois de passar por tudo isso, eu fiz uma missão da minha vida: garantir que nenhuma outra mulher precise se sentir sozinha nessa jornada. Hoje, já ajudei mais de 100 casais a conquistarem seus Green Cards através do casamento.
                </p>
                <p>
                  Minha missão é transformar esse processo complexo em algo simples, claro e menos estressante. Porque eu acredito que toda pessoa merece ter sua história de amor reconhecida pelo governo americano, e se sentir guiada, acolhida e confiante nessa jornada."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: A SOLUÇÃO */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-foreground">
            Apresentando a "Sessão de Clareza para o Green Card"
          </h2>
          <p className="text-xl leading-relaxed text-muted-foreground mb-12">
            Esta não é uma consulta jurídica cheia de termos técnicos. É uma conversa de 30 minutos, de mulher para mulher, onde vamos:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">1</span>
                </div>
                <h3 className="text-xl font-semibold">Diagnosticar seu caso</h3>
                <p className="text-muted-foreground">
                  Entender exatamente em que ponto do processo você está e quais os seus maiores bloqueios.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">2</span>
                </div>
                <h3 className="text-xl font-semibold">Mapear seus próximos passos</h3>
                <p className="text-muted-foreground">
                  Você sairá com uma lista clara e simples de 2 a 3 ações imediatas para destravar o seu processo.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">3</span>
                </div>
                <h3 className="text-xl font-semibold">Trazer paz para sua mente</h3>
                <p className="text-muted-foreground">
                  Acabar com a confusão e te dar a confiança necessária para seguir em frente sem medo.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Button 
            size="lg" 
            className="px-12 py-6 text-xl font-semibold bg-primary hover:bg-primary/90"
            onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            QUERO AGENDAR MINHA CONSULTORIA AGORA!
          </Button>
          
          <p className="mt-6 text-sm text-muted-foreground">
            <strong>Atenção:</strong> Para garantir um atendimento próximo e humano, as vagas para a Sessão de Clareza são limitadas por semana.
          </p>
        </div>
      </section>

      {/* SEÇÃO 5: FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-foreground">
            Suas dúvidas, respondidas:
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pare de sofrer sozinha. Sua jornada para o Green Card começa hoje.
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Clique no botão abaixo e agende sua Sessão de Clareza agora mesmo.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="px-12 py-6 text-xl font-semibold"
            onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            QUERO MINHA CONSULTORIA AGORA
          </Button>
        </div>
      </section>
    </div>
  );
};

export default GreenCardLanding;