import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CheckCircle, Heart, Users, Shield, Clock, Star, ChevronDown } from "lucide-react";

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

  const benefits = [
    {
      icon: Shield,
      title: "Segurança no Processo",
      description: "Evite erros custosos que podem resultar em negação"
    },
    {
      icon: Clock,
      title: "Economia de Tempo",
      description: "Processo organizado e eficiente, sem perder tempo com informações erradas"
    },
    {
      icon: Heart,
      title: "Tranquilidade",
      description: "Durma em paz sabendo que está no caminho certo"
    }
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
      {/* HERO SECTION */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  <span>+100 pessoas já conquistaram seus Green Cards</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Para a mulher brasileira que se sente 
                  <span className="text-primary"> perdida e sobrecarregada</span> 
                  no processo do Green Card
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Descubra em <strong>30 minutos</strong> o plano exato para transformar a confusão em clareza e o medo em confiança
                </p>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 bg-primary/20 rounded-full border-2 border-background flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="font-medium">Mais de 100 mulheres já conquistaram seus sonhos</span>
                </div>
              </div>
            </div>
            
            {/* Form Card */}
            <Card className="relative p-8 shadow-2xl border-0 bg-background/95 backdrop-blur">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold">
                  CONSULTORIA GRATUITA
                </div>
              </div>
              
              <CardContent className="space-y-6 pt-4">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    Sessão de Clareza de 30 Minutos
                  </h3>
                  <p className="text-muted-foreground">
                    Totalmente gratuita • Sem compromisso
                  </p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Nome completo</Label>
                    <Input 
                      id="name"
                      placeholder="Digite seu nome completo"
                      {...register("name", { required: "Nome é obrigatório" })}
                      className="h-12 border-2 border-border focus:border-primary bg-background"
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Seu melhor e-mail</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="exemplo@email.com"
                      {...register("email", { 
                        required: "E-mail é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "E-mail inválido"
                        }
                      })}
                      className="h-12 border-2 border-border focus:border-primary bg-background"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">WhatsApp</Label>
                    <Input 
                      id="phone"
                      placeholder="(11) 99999-9999"
                      {...register("phone", { required: "WhatsApp é obrigatório" })}
                      className="h-12 border-2 border-border focus:border-primary bg-background"
                    />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg transform transition-all duration-200 hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "🎯 QUERO MINHA CONSULTORIA GRATUITA"}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    ✅ 100% Gratuito • ✅ Sem spam • ✅ Seus dados estão seguros
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PAIN POINTS SECTION */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              Você se sente assim?
            </h2>
            <p className="text-xl text-muted-foreground">
              Se você se identificou com pelo menos 3 itens abaixo, essa consultoria é para você
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {painPoints.map((point, index) => (
              <Card key={index} className="p-6 border-l-4 border-l-primary bg-background hover:shadow-lg transition-all duration-300">
                <CardContent className="flex items-start space-x-4 p-0">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-foreground font-medium">
                    {point}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT GLEICE SECTION */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur"></div>
              <img 
                src="/lovable-uploads/eea35aa1-010e-415d-a589-673fe11473c3.png" 
                alt="Gleice Oliveira - Especialista em Green Card"
                className="relative w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Stats Overlay */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold">+100</div>
                  <div className="text-sm opacity-90">Green Cards Aprovados</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  <span>De imigrante para imigrante</span>
                </div>
                
                <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
                  Eu sei <span className="text-primary">exatamente</span> como você se sente
                </h2>
              </div>
              
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p className="text-xl font-medium text-foreground">
                  "Olá, meu nome é Gleice. E eu <strong>não sou advogada</strong>."
                </p>
                <p>
                  Eu sou uma <strong>imigrante como você</strong>. Eu conheço o nó na garganta, as noites sem dormir e a ansiedade de querer construir uma vida digna ao lado de quem a gente ama.
                </p>
                <p>
                  Depois de passar por tudo isso, eu fiz uma missão da minha vida: <strong>garantir que nenhuma outra mulher precise se sentir sozinha</strong> nessa jornada.
                </p>
                <p>
                  Hoje, já ajudei <strong>mais de 100 casais</strong> a conquistarem seus Green Cards através do casamento, transformando esse processo complexo em algo simples, claro e menos estressante.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 gap-4 pt-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
                    <div className="flex-shrink-0">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-6 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Sessão de Clareza para o Green Card
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Esta não é uma consulta jurídica cheia de termos técnicos. É uma <strong>conversa de 30 minutos, de mulher para mulher</strong>, onde vamos:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "01",
                title: "Diagnosticar seu caso",
                description: "Entender exatamente em que ponto do processo você está e quais os seus maiores bloqueios.",
                icon: Shield
              },
              {
                step: "02", 
                title: "Mapear próximos passos",
                description: "Você sairá com uma lista clara e simples de 2 a 3 ações imediatas para destravar o seu processo.",
                icon: CheckCircle
              },
              {
                step: "03",
                title: "Trazer paz de espírito",
                description: "Acabar com a confusão e te dar a confiança necessária para seguir em frente sem medo.",
                icon: Heart
              }
            ].map((item, index) => (
              <Card key={index} className="relative p-8 bg-background border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="space-y-6 p-0">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="space-y-6">
            <Button 
              size="lg" 
              className="px-12 py-6 text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl transform transition-all duration-200 hover:scale-105"
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🚀 QUERO AGENDAR MINHA CONSULTORIA AGORA
            </Button>
            
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm font-medium text-destructive">
                ⚠️ <strong>ATENÇÃO:</strong> Para garantir um atendimento próximo e humano, as vagas para a Sessão de Clareza são limitadas por semana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              Suas dúvidas, respondidas
            </h2>
            <p className="text-xl text-muted-foreground">
              As perguntas mais frequentes sobre a consultoria
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 border border-border hover:border-primary/50 transition-colors">
                <CardContent className="space-y-4 p-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <ChevronDown className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground leading-tight">{faq.question}</h3>
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary/90 to-primary text-primary-foreground relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiPgogICAgICA8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K')]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
              Pare de sofrer sozinha.<br />
              <span className="text-primary-foreground/90">Sua jornada para o Green Card começa hoje.</span>
            </h2>
            
            <p className="text-xl lg:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              Você não precisa passar por isso sozinha. Clique no botão abaixo e agende sua Sessão de Clareza agora mesmo.
            </p>
            
            <div className="space-y-6">
              <Button 
                size="lg" 
                variant="secondary"
                className="px-12 py-6 text-xl font-bold bg-background text-primary hover:bg-background/90 shadow-2xl transform transition-all duration-200 hover:scale-105"
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                💫 SIM, QUERO MINHA CONSULTORIA GRATUITA
              </Button>
              
              <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>100% Gratuito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>30 Minutos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Sem Compromisso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GreenCardLanding;