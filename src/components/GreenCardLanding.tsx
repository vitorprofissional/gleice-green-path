import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Heart, Users, Shield, Clock, Star, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
interface FormData {
  name: string;
  email: string;
  phone: string;
}
const GreenCardLanding = () => {
  // SEO Optimization for homepage
  document.title = "Consultoria Green Card - Realize seu Sonho Americano com Gleice Oliveira";
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Consultoria especializada em Green Card para mulheres. Agende sua consultoria gratuita e descubra como conquistar seu visto americano com a especialista Gleice Oliveira.');
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm<FormData>();
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Call the Edge Function instead of directly inserting into Supabase
      const response = await supabase.functions.invoke('submit-lead', {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
      });

      if (response.error) {
        console.error('Error submitting lead:', response.error);
        toast({
          title: "Erro ao enviar cadastro",
          description: "Houve um problema ao processar seu cadastro. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      console.log('Lead submitted successfully:', response.data);

      // Show success message with Google Sheets integration info
      const message = response.data?.googleSheets === 'success' 
        ? "Cadastro salvo no sistema e planilha!" 
        : "Cadastro realizado com sucesso!";

      toast({
        title: message,
        description: "Você receberá em breve mais informações sobre sua consulta gratuita.",
      });

      // Reset form
      reset();

      // Navigate to thank you page after a brief delay
      setTimeout(() => {
        navigate('/obrigada');
      }, 1000);
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Erro ao enviar cadastro",
        description: "Houve um problema inesperado. Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const painPoints = ["Perdida em uma pilha de formulários e documentos que parecem não ter fim?", "Com medo de cometer um erro que possa levar à negação do seu sonho?", "Cansada de informações contraditórias que te deixam andando em círculos?", "Sozinha e sobrecarregada, sentindo que ninguém entende o peso que você carrega?", "Insegura até para conversar com seu noivo ou marido sobre os próximos passos?"];
  const benefits = [{
    icon: Shield,
    title: "Segurança no Processo",
    description: "Evite erros custosos que podem resultar em negação"
  }, {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Processo organizado e eficiente, sem perder tempo com informações erradas"
  }, {
    icon: Heart,
    title: "Tranquilidade",
    description: "Durma em paz sabendo que está no caminho certo"
  }];
  const faqs = [{
    question: "Por que eu deveria fazer uma consultoria com você e não com um advogado?",
    answer: "Porque oferecemos um atendimento humano e acolhedor, focado em organizar seus passos de forma clara e simples, sem a frieza e os altos custos de um escritório tradicional. Nosso foco é te dar confiança e direcionamento prático."
  }, {
    question: "O que exatamente acontece nessa sessão?",
    answer: "Em 30 minutos de conversa, vamos diagnosticar seu caso atual, identificar seus maiores bloqueios e criar um plano claro com 2-3 ações imediatas que você pode executar para destravar seu processo."
  }, {
    question: "Essa sessão serve para mim se eu ainda não casei no civil?",
    answer: "Sim! Na verdade, é ainda melhor começar o planejamento antes do casamento civil. Assim você se prepara adequadamente e evita erros que podem custar tempo e dinheiro no futuro."
  }, {
    question: "Qual o valor do investimento?",
    answer: "Esta consultoria custaria $70, mas agora está gratuita por tempo limitado - muito menos do que você gastaria em uma consulta jurídica tradicional, mas com um atendimento muito mais próximo e humanizado."
  }];
  return <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <main>
        <section className="relative py-8 sm:py-12 lg:py-20 px-3 sm:px-4 bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                  <Star className="w-3 sm:w-4 h-3 sm:h-4" />
                  <span className="text-xs sm:text-sm">+100 pessoas já conquistaram seus Green Cards</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold text-foreground leading-tight">
                  Para a mulher brasileira que se sente 
                  <span className="text-primary"> perdida e sobrecarregada </span> 
                  no processo do Green Card
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed">
                  Descubra em <strong>30 minutos</strong> o plano exato para transformar a confusão em clareza e o medo em confiança
                </p>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 pt-2 sm:pt-4">
                <div className="flex -space-x-2 sm:-space-x-3">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-primary/20 rounded-full border-2 border-background flex items-center justify-center">
                      <Users className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-primary" />
                    </div>)}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1 mb-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-primary text-primary" />)}
                  </div>
                  <span className="font-medium text-xs sm:text-sm">Mais de 100 mulheres já conquistaram seus sonhos</span>
                </div>
              </div>
            </div>
            
            {/* Form Card */}
            <div className="order-2 lg:order-2 w-full">
              <Card className="relative p-4 sm:p-6 lg:p-8 shadow-2xl border-0 bg-background/95 backdrop-blur w-full max-w-md mx-auto lg:max-w-none">
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  
                </div>
                
                <CardContent className="space-y-4 sm:space-y-6 pt-3 sm:pt-4 p-0">
                  <div className="text-center space-y-1 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                      Consultoria de 30 Minutos
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Totalmente gratuita • Sem compromisso
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="name" className="text-xs sm:text-sm font-medium">Nome completo</Label>
                      <Input id="name" placeholder="Digite seu nome completo" {...register("name", {
                      required: "Nome é obrigatório"
                    })} className="h-10 sm:h-12 border-2 border-border focus:border-primary bg-background text-sm sm:text-base" />
                      {errors.name && <p className="text-xs sm:text-sm text-destructive">{errors.name.message}</p>}
                    </div>
                    
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Seu melhor e-mail</Label>
                      <Input id="email" type="email" placeholder="exemplo@email.com" {...register("email", {
                      required: "E-mail é obrigatório",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "E-mail inválido"
                      }
                    })} className="h-10 sm:h-12 border-2 border-border focus:border-primary bg-background text-sm sm:text-base" />
                      {errors.email && <p className="text-xs sm:text-sm text-destructive">{errors.email.message}</p>}
                    </div>
                    
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="phone" className="text-xs sm:text-sm font-medium">WhatsApp</Label>
                      <Input 
                        id="phone" 
                        placeholder="+55 (11) 99999-9999" 
                        {...register("phone", {
                          required: "WhatsApp é obrigatório",
                          pattern: {
                            value: /^\+55\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                            message: "WhatsApp deve conter código do país +55, DDD e número (ex: +55 11 99999-9999)"
                          }
                        })} 
                        className="h-10 sm:h-12 border-2 border-border focus:border-primary bg-background text-sm sm:text-base" 
                      />
                      {errors.phone && <p className="text-xs sm:text-sm text-destructive">{errors.phone.message}</p>}
                    </div>
                    
                    <Button type="submit" disabled={isSubmitting} className="w-full h-12 sm:h-14 text-sm sm:text-base lg:text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg transform transition-all duration-200 hover:scale-105 touch-manipulation mx-0 px-0">
                      {isSubmitting ? "Enviando..." : "🎯 QUERO MINHA CONSULTORIA GRATUITA"}
                    </Button>
                    
                    <p className="text-[10px] sm:text-xs text-center text-muted-foreground leading-relaxed">
                      ✅ 100% Gratuito • ✅ Sem spam • ✅ Seus dados estão seguros
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS SECTION */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
              Você se sente assim?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-2">
              Se você se identificou com pelo menos 3 itens abaixo, essa consultoria é para você
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {painPoints.map((point, index) => <Card key={index} className="p-4 sm:p-6 border-l-4 border-l-primary bg-background hover:shadow-lg transition-all duration-300">
                <CardContent className="flex items-start space-x-3 sm:space-x-4 p-0">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 sm:w-6 h-5 sm:h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-foreground font-medium">
                    {point}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* ABOUT GLEICE SECTION */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="relative w-full max-w-md mx-auto lg:max-w-none order-1 lg:order-1">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl sm:rounded-3xl blur"></div>
              <img src="/lovable-uploads/eea35aa1-010e-415d-a589-673fe11473c3.png" alt="Gleice Oliveira, especialista em consultoria Green Card para mulheres brasileiras, ajudando mais de 100 pessoas a conquistarem o visto americano" className="relative w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl" />
              
              {/* Stats Overlay */}
              <div className="absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 bg-primary text-primary-foreground p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold">+100</div>
                  <div className="text-xs sm:text-sm opacity-90">Green Cards Aprovados</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-2">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                  <Heart className="w-3 sm:w-4 h-3 sm:h-4" />
                  <span>De imigrante para imigrante</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground">
                  Eu sei <span className="text-primary">exatamente</span> como você se sente
                </h2>
              </div>
              
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground">
                <p className="text-base sm:text-lg lg:text-xl font-medium text-foreground">
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
              <div className="grid grid-cols-1 gap-3 sm:gap-4 pt-2 sm:pt-4">
                {benefits.map((benefit, index) => <div key={index} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-primary/5 rounded-lg">
                    <div className="flex-shrink-0">
                      <benefit.icon className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">{benefit.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground px-2">
              Consultoria para o Green Card
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Esta não é uma consulta jurídica cheia de termos técnicos. É uma <strong>conversa de 30 minutos, de mulher para mulher</strong>, onde vamos:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-16">
            {[{
            step: "01",
            title: "Diagnosticar seu caso",
            description: "Entender exatamente em que ponto do processo você está e quais os seus maiores bloqueios.",
            icon: Shield
          }, {
            step: "02",
            title: "Mapear próximos passos",
            description: "Você sairá com uma lista clara e simples de 2 a 3 ações imediatas para destravar o seu processo.",
            icon: CheckCircle
          }, {
            step: "03",
            title: "Trazer paz de espírito",
            description: "Acabar com a confusão e te dar a confiança necessária para seguir em frente sem medo.",
            icon: Heart
          }].map((item, index) => <Card key={index} className="relative p-4 sm:p-6 lg:p-8 bg-background border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2">
                <CardContent className="space-y-4 sm:space-y-6 p-0">
                  <div className="relative">
                    <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <item.icon className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-primary/10 text-primary text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>)}
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl transform transition-all duration-200 hover:scale-105 touch-manipulation" onClick={() => document.querySelector('form')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              🚀 QUERO AGENDAR MINHA CONSULTORIA AGORA
            </Button>
            
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 sm:p-4 max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm font-medium text-destructive">
                ⚠️ <strong>ATENÇÃO:</strong> Para garantir um atendimento próximo e humano, as vagas para a Consultoria são limitadas por semana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
              Suas dúvidas, respondidas
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-2">
              As perguntas mais frequentes sobre a consultoria
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => <Card key={index} className="p-4 sm:p-6 border border-border hover:border-primary/50 transition-colors">
                <CardContent className="space-y-3 sm:space-y-4 p-0">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 bg-primary rounded-full flex items-center justify-center mt-0.5">
                      <ChevronDown className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 text-primary-foreground" />
                    </div>
                    <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-foreground leading-tight">{faq.question}</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 bg-gradient-to-br from-primary via-primary/90 to-primary text-primary-foreground relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiPgogICAgICA8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K')]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight px-2">
              Pare de sofrer sozinha.<br />
              <span className="text-primary-foreground/90">Sua jornada para o Green Card começa hoje.</span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto px-4">
              Você não precisa passar por isso sozinha. Clique no botão abaixo e agende sua Consultoria agora mesmo.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-xl font-bold bg-background text-primary hover:bg-background/90 shadow-2xl transform transition-all duration-200 hover:scale-105 touch-manipulation" onClick={() => document.querySelector('form')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                💫 SIM, QUERO MINHA CONSULTORIA GRATUITA
              </Button>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-8 text-xs sm:text-sm opacity-80">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>100% Gratuito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>30 Minutos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>Sem Compromisso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>;
};
export default GreenCardLanding;