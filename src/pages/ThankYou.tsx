import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Star, Play } from "lucide-react";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative py-8 sm:py-12 lg:py-20 px-3 sm:px-4 bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Success Badge */}
          <div className="inline-flex items-center space-x-2 bg-green-500/10 text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium mb-6 sm:mb-8">
            <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>Formulário enviado com sucesso!</span>
          </div>
          
          {/* Headlines */}
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Parabéns! Mas ainda 
              <span className="text-primary"> não acabou...</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Abaixo você verá um vídeo introdutório sobre a consultoria. 
              <strong> Veja antes de agendar sua consultoria.</strong>
            </p>
          </div>

          {/* Video Section */}
          <Card className="relative p-4 sm:p-6 lg:p-8 shadow-2xl border-0 bg-background/95 backdrop-blur max-w-4xl mx-auto mb-8 sm:mb-12">
            <CardContent className="space-y-6 p-0">
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                  <Play className="w-3 sm:w-4 h-3 sm:h-4" />
                  <span>Vídeo Introdutório</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                  Conheça mais sobre a consultoria
                </h3>
              </div>
              
              {/* YouTube Video Embed */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/RfgC5cNBZZo"
                  title="Vídeo Introdutório - Consultoria Green Card"
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="space-y-4 sm:space-y-6">
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8 text-lg sm:text-xl lg:text-2xl font-bold bg-primary hover:bg-primary/90 shadow-xl transform transition-all duration-200 hover:scale-105 touch-manipulation"
              onClick={() => {
                window.open('https://calendly.com/gleiceoliveira/freecall', '_blank');
              }}
            >
              🗓️ AGENDAR CONSULTORIA AGORA!
            </Button>
            
            <p className="text-sm sm:text-base text-muted-foreground">
              ✅ Totalmente gratuita • ✅ 30 minutos • ✅ Sem compromisso
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 pt-8 sm:pt-12 mt-8 sm:mt-12 border-t border-border/20">
            <div className="flex -space-x-2 sm:-space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/20 rounded-full border-2 border-background flex items-center justify-center">
                  <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                </div>
              ))}
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-1 mb-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-medium text-sm sm:text-base text-muted-foreground">
                Mais de 100 mulheres já conquistaram seus sonhos
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThankYou;